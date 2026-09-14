import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  limit,
  onSnapshot,
  where,
  deleteField,
} from 'firebase/firestore';
import { auth, db, OperationType, handleFirestoreError } from '../firebase';
import {
  User,
  ActivityProgress,
  UserAchievement,
  PointTransaction,
  Language,
  TurmaRanking,
  StudentRanking,
  ThemeVisibilityMap,
  QuizVisibilityMap,
  AvatarConfig,
} from '../types';
import { BADGES } from '../data/badgesData';
import { generateSecurePublicId } from '../utils/publicIdGenerator';
import { getTurmasList, addTurma, removeTurmas } from '../data/turmasData';
import { getDefaultAvatar } from '../utils/avatarUtils';
import { isValidActivityId, evaluateQuizSubmission, evaluateDailyTipSubmission } from '../data/activityCatalog';

const TOKEN_KEY = 'tic_5ano_auth_token';
const CURRENT_USER_KEY = 'tic_5ano_current_user';
const PROGRESS_STORAGE_KEY = 'tic_5ano_progress_';
const ACHIEVEMENTS_STORAGE_KEY = 'tic_5ano_achievements_';
const POINTS_STORAGE_KEY = 'tic_5ano_points_';
const THEME_VISIBILITY_KEY = 'tic_5ano_theme_visibility';
const QUIZ_VISIBILITY_KEY = 'tic_5ano_quiz_visibility';

// Safe storage fallback for SSR and preview environments
if (typeof globalThis.localStorage === 'undefined') {
  const memoryStore = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (k: string) => memoryStore.get(k) ?? null,
    setItem: (k: string, v: string) => memoryStore.set(k, String(v)),
    removeItem: (k: string) => memoryStore.delete(k),
    clear: () => memoryStore.clear(),
  };
}

export const DEFAULT_THEME_VISIBILITY: ThemeVisibilityMap = {
  'correio-eletronico': true,
  'tic-sociedade': true,
  'ergonomia': true,
  'seguranca': true,
  'palavras-passe': true,
  'navegar-internet': true,
  'direitos-autor': true,
};

export const DEFAULT_QUIZ_VISIBILITY: QuizVisibilityMap = {
  'correio-eletronico': false,
  'tic-sociedade': false,
  'ergonomia': false,
  'seguranca': false,
  'palavras-passe': false,
  'navegar-internet': false,
  'direitos-autor': false,
  // Backward compatibility aliases
  'seguranca-digital': false,
  'pesquisa-informacao': false,
  'ergonomia-saude': false,
  'modelagem-3d': false,
  'algoritmos-programacao': false,
};

// Designated Teacher / Administrator accounts (Carla Oliveira)
export const ADMIN_EMAILS = [
  'imaginebycarla2023@gmail.com',
  'imaginebacarla2023@gmail.com',
  'prof.carla@escola.pt',
  'carla.oliveira@escola.pt',
];

export function isUserAdmin(email?: string, role?: string): boolean {
  if (role === 'admin' || role === 'teacher') return true;
  if (!email) return false;
  const norm = email.toLowerCase().trim();
  return ADMIN_EMAILS.includes(norm);
}

/**
 * Identifies if an activity is a "Quiz de Aprendizagem" (Final Comprehensive Quiz for each theme)
 * which follows the strict rule:
 * - Unlimited attempts allowed for practice and learning.
 * - The official registered score is ALWAYS and permanently the score from the FIRST attempt.
 */
export function isLearningQuiz(activityId: string, activityType?: string): boolean {
  if (activityType === 'quiz') return true;
  const idLower = (activityId || '').toLowerCase();
  return idLower.startsWith('quiz-final') || idLower.includes('final_quiz') || idLower.includes('quiz-final-tema');
}

/**
 * Evaluates which badges from BADGES should be unlocked based on progress and points.
 * Returns array of badges that should be unlocked.
 */
export function evaluateEligibleBadges(
  progressList: ActivityProgress[],
  userPoints: number,
  existingAchievementIds: Set<string>
): { badgeId: string; bonus: number; name: string }[] {
  const toUnlock: { badgeId: string; bonus: number; name: string }[] = [];
  const completedList = progressList.filter((p) => p.status === 'completed');

  // 1. Primeiros Passos: completed at least 1 activity
  if (!existingAchievementIds.has('primeiros-passos') && completedList.length >= 1) {
    toUnlock.push({ badgeId: 'primeiros-passos', bonus: 0, name: 'Primeiros Passos' });
  }

  // 2. Guardião Digital: completed digital safety/security activities (Theme 3 or Theme 1/4)
  const safetyActivitiesDone = completedList.filter(
    (p) =>
      p.themeId === 'seguranca' ||
      p.themeId === 'seguranca-digital' ||
      p.themeId === 'palavras-passe' ||
      p.activityId.startsWith('seg-') ||
      p.activityId.startsWith('pass-') ||
      p.activityId.startsWith('desafio-tic-seguranca') ||
      p.activityId.startsWith('desafio-tic-pegada')
  );
  if (!existingAchievementIds.has('guardiao-digital') && safetyActivitiesDone.length >= 4) {
    toUnlock.push({ badgeId: 'guardiao-digital', bonus: 0, name: 'Guardião Digital' });
  }

  // 3. Especialista em Segurança: scored >= 90% in any security/safety quiz or challenge
  const safetyQuiz90 = progressList.some(
    (p) =>
      (p.themeId === 'seguranca' || p.themeId === 'seguranca-digital' || p.themeId === 'palavras-passe' || p.activityId.includes('seguranca') || p.activityId.includes('pass')) &&
      (p.activityType === 'quiz' || p.activityId.includes('quiz') || p.activityType === 'challenge') &&
      (p.bestPercentage ?? p.percentage ?? p.score ?? 0) >= 90
  );
  if (!existingAchievementIds.has('especialista-seguranca') && safetyQuiz90) {
    toUnlock.push({ badgeId: 'especialista-seguranca', bonus: 0, name: 'Especialista em Segurança' });
  }

  // 4. Detetive Cibernético: completed phishing or cyber danger challenge
  const phishingDone = completedList.some(
    (p) =>
      p.activityId === 'desafio-detetive-phishing' ||
      p.activityId === 'desafio-seguro-perigoso' ||
      p.activityId === 'jogo-seguranca-tf' ||
      p.activityId === 'jogo-seguranca-mc'
  );
  if (!existingAchievementIds.has('detetive-cibernetico') && phishingDone) {
    toUnlock.push({ badgeId: 'detetive-cibernetico', bonus: 0, name: 'Detetive Cibernético' });
  }

  // 5. Mestre do Email: completed Theme 5 (Correio Eletrónico) challenges/modules
  const emailActivitiesDone = completedList.filter(
    (p) => p.themeId === 'correio-eletronico' || p.activityId.startsWith('email-') || p.activityId.startsWith('jogo-email')
  );
  if (!existingAchievementIds.has('mestre-email') && emailActivitiesDone.length >= 3) {
    toUnlock.push({ badgeId: 'mestre-email', bonus: 0, name: 'Mestre do Email' });
  }

  // 6. Detetive da Informação: completed Theme 6 (Navegar na Internet) or Theme 7 (Direitos de Autor) activities
  const searchActivitiesDone = completedList.filter(
    (p) =>
      p.themeId === 'navegar-internet' ||
      p.themeId === 'direitos-autor' ||
      p.activityId.startsWith('net-') ||
      p.activityId.startsWith('copy-')
  );
  if (!existingAchievementIds.has('detetive-informacao') && searchActivitiesDone.length >= 4) {
    toUnlock.push({ badgeId: 'detetive-informacao', bonus: 0, name: 'Detetive da Informação' });
  }

  // 7. Mestre da Pesquisa: scored >= 90% in Internet Navigation or Research quiz
  const searchQuiz90 = progressList.some(
    (p) =>
      (p.themeId === 'navegar-internet' || p.themeId === 'direitos-autor' || p.activityId.includes('net') || p.activityId.includes('copy')) &&
      (p.activityType === 'quiz' || p.activityId.includes('quiz')) &&
      (p.bestPercentage ?? p.percentage ?? p.score ?? 0) >= 90
  );
  if (!existingAchievementIds.has('mestre-pesquisa') && searchQuiz90) {
    toUnlock.push({ badgeId: 'mestre-pesquisa', bonus: 0, name: 'Mestre da Pesquisa' });
  }

  // 8. TIC Explorer: completed activities across at least 4 different themes
  const distinctThemesDone = new Set(completedList.map((p) => p.themeId).filter(Boolean));
  if (!existingAchievementIds.has('tic-explorer') && distinctThemesDone.size >= 4) {
    toUnlock.push({ badgeId: 'tic-explorer', bonus: 0, name: 'TIC Explorer' });
  }

  // 9. Centurião de Pontos: reached 500+ total points
  if (!existingAchievementIds.has('centuriao-pontos') && userPoints >= 500) {
    toUnlock.push({ badgeId: 'centuriao-pontos', bonus: 0, name: 'Centurião Digital' });
  }

  return toUnlock;
}

let isRegisteringInProgress = false;

/**
 * Computa de forma autoritativa e segura todos os pontos ganhos através de Dicas Diárias / da Semana,
 * agregando os registos multi-dispositivo da coleção dailyTips e da pointsHistory.
 */
export function calculateAuthoritativeDailyTipPoints(
  dailyTipsList: Array<{ pointsEarned?: number; readPoints?: number; answerPoints?: number; date?: string; id?: string }>,
  pointsHistoryList: PointTransaction[]
): number {
  const pointsByDate = new Map<string, number>();

  if (Array.isArray(dailyTipsList)) {
    for (const dt of dailyTipsList) {
      const dateKey = dt.date || dt.id || 'unknown';
      const pts = typeof dt.pointsEarned === 'number'
        ? dt.pointsEarned
        : ((dt.readPoints || 0) + (dt.answerPoints || 0));
      if (pts > 0) {
        pointsByDate.set(dateKey, Math.min(50, Math.max(0, pts)));
      }
    }
  }

  if (Array.isArray(pointsHistoryList)) {
    for (const tx of pointsHistoryList) {
      if (tx.id?.startsWith('pt-daily-') || tx.reason?.includes('Curiosidade') || tx.reason?.includes('Dica')) {
        const dateKey = tx.timestamp ? tx.timestamp.split('T')[0] : (tx.id?.replace(/^pt-daily-(?:read|ans)-/, '').split('-')[0] || tx.id || 'unknown');
        const currentSum = pointsByDate.get(dateKey) || 0;
        pointsByDate.set(dateKey, Math.min(50, currentSum + Math.max(0, tx.amount || 0)));
      }
    }
  }

  let total = 0;
  pointsByDate.forEach((pts) => {
    total += pts;
  });
  return total;
}

export const api = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  /**
   * Check if current client has a valid active student or admin session
   */
  hasValidSession(userId?: string): boolean {
    const token = this.getToken();
    const rawUser = typeof localStorage !== 'undefined' ? localStorage.getItem(CURRENT_USER_KEY) : null;
    if (!token || !rawUser) return false;
    try {
      const user = JSON.parse(rawUser);
      if (!user || !user.id) return false;
      if (userId) {
        return (user.id === userId && token === user.id) || isUserAdmin(user.email, user.role);
      }
      return token === user.id;
    } catch {
      return false;
    }
  },

  getCurrentSessionUser(): User | null {
    const rawUser = typeof localStorage !== 'undefined' ? localStorage.getItem(CURRENT_USER_KEY) : null;
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  },

  /**
   * Protected user document creation/update
   */
  async createUserDoc(userId: string, data: any): Promise<void> {
    if (!this.hasValidSession(userId)) {
      throw new Error('Tentativa de criação arbitrária sem uma sessão válida bloqueada.');
    }
    await setDoc(doc(db, 'users', userId), data, { merge: true });
  },

  /**
   * Protected public profile document creation/update
   */
  async createPublicProfileDoc(userId: string, data: any): Promise<void> {
    if (!this.hasValidSession(userId)) {
      throw new Error('Tentativa de criação arbitrária sem uma sessão válida bloqueada.');
    }
    await setDoc(doc(db, 'publicProfiles', userId), data, { merge: true });
  },

  getAllTakenPublicIds(): string[] {
    return [];
  },

  getAllRegisteredEmails(): string[] {
    return [];
  },

  /**
   * Fetch all taken Nicknames from Firestore to guarantee no duplicate publicId
   */
  async fetchTakenPublicIds(): Promise<string[]> {
    const takenSet = new Set<string>();

    try {
      const q = query(collection(db, 'publicProfiles'), limit(500));
      const snap = await getDocs(q);
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d?.publicId) {
          takenSet.add(String(d.publicId).trim());
        }
      });
    } catch (err) {
      console.warn('Could not query publicProfiles from Firestore:', err);
    }

    return Array.from(takenSet);
  },

  /**
   * Generate a unique Nickname
   */
  async generateUniquePublicId(): Promise<string> {
    const taken = await this.fetchTakenPublicIds();
    return generateSecurePublicId(taken);
  },

  /**
   * Listen to Firebase Auth state changes
   */
  onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (isRegisteringInProgress) {
        // Defer automatic onAuthChange handling during active registration flow to prevent race conditions
        return;
      }
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            const isAdmin = isUserAdmin(data.email || fbUser.email || '', data.role);
            const user: User = {
              id: fbUser.uid,
              name: data.name || fbUser.displayName || (isAdmin ? 'Professora Carla' : 'Estudante'),
              email: (fbUser.email || data.email || '').toLowerCase().trim(),
              publicId: data.publicId || (isAdmin ? 'Docente_TIC' : generateSecurePublicId()),
              turma: isAdmin ? undefined : (data.turma || '5.º A'),
              role: isAdmin ? 'admin' : (data.role || 'student'),
              points: typeof data.points === 'number' ? data.points : 0,
              avatar: data.avatar || getDefaultAvatar(data.publicId || data.name || fbUser.uid),
              language: data.language || 'pt',
              createdAt: data.createdAt || new Date().toISOString(),
              lastActivity: data.lastActivity,
            };

            if (isAdmin) {
              delete user.turma;
              deleteDoc(doc(db, 'publicProfiles', fbUser.uid)).catch(() => {});
            }

            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
            try {
              const token = await fbUser.getIdToken();
              this.setToken(token);
            } catch {
              this.setToken(fbUser.uid);
            }
            callback(user);
            return;
          } else {
            // User authenticated in Firebase Auth, check local storage first before fallback
            const rawUserStr = localStorage.getItem(CURRENT_USER_KEY);
            let cachedUser: User | null = null;
            if (rawUserStr) {
              try {
                const parsed = JSON.parse(rawUserStr);
                if (parsed && (parsed.id === fbUser.uid || parsed.email === fbUser.email?.toLowerCase().trim())) {
                  cachedUser = parsed;
                }
              } catch {
                // ignore
              }
            }

            const emailNorm = (fbUser.email || '').toLowerCase().trim();
            const isAdmin = isUserAdmin(emailNorm);
            const takenIds = await this.fetchTakenPublicIds();
            const publicId = cachedUser?.publicId || (isAdmin ? 'Docente_TIC' : generateSecurePublicId(takenIds));
            const initialPoints = cachedUser?.points ?? (isAdmin ? 0 : 100);

            const user: User = {
              id: fbUser.uid,
              name: cachedUser?.name || fbUser.displayName || (isAdmin ? 'Professora Carla' : 'Estudante'),
              email: emailNorm,
              publicId,
              turma: isAdmin ? undefined : (cachedUser?.turma || '5.º A'),
              role: isAdmin ? 'admin' : 'student',
              points: initialPoints,
              avatar: cachedUser?.avatar || getDefaultAvatar(publicId),
              language: cachedUser?.language || 'pt',
              createdAt: cachedUser?.createdAt || new Date().toISOString(),
            };

            if (!isAdmin && !cachedUser) {
              const welcomeTx: PointTransaction = {
                id: `pt-welcome-${Date.now()}`,
                userId: fbUser.uid,
                amount: 100,
                reason: '🎉 Boas-vindas à Plataforma Educativa TIC (Primeiro acesso: +100 XP)',
                timestamp: new Date().toISOString(),
              };
              setDoc(doc(db, 'users', fbUser.uid, 'pointsHistory', welcomeTx.id), welcomeTx).catch(() => {});
            }

            try {
              await this.syncUserToFirestore(user);
            } catch (err) {
              console.warn('onAuthChange sync notice:', err);
            }
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
            try {
              const token = await fbUser.getIdToken();
              this.setToken(token);
            } catch {
              this.setToken(fbUser.uid);
            }
            callback(user);
            return;
          }
        } catch (e) {
          console.warn('onAuthChange profile check notice:', e);
        }
      } else {
        const rawUser = localStorage.getItem(CURRENT_USER_KEY);
        if (rawUser) {
          try {
            const user = JSON.parse(rawUser);
            callback(user);
            return;
          } catch {
            // ignore
          }
        }
        localStorage.removeItem(CURRENT_USER_KEY);
        this.removeToken();
        callback(null);
      }
    });
  },

  /**
   * Directly save user profile to Cloud Firestore (NEVER storing passwords)
   */
  async syncUserToFirestore(user: User): Promise<boolean> {
    const targetUserId = user.id;

    // Strictly protect arbitrary creation: verify current active student or admin session
    if (!this.hasValidSession(targetUserId)) {
      throw new Error('Tentativa de criação/sincronização arbitrária sem uma sessão válida bloqueada.');
    }

    try {
      user.id = targetUserId;
      const isAdmin = isUserAdmin(user.email, user.role);
      const finalRole = isAdmin ? 'admin' : (user.role || 'student');
      user.role = finalRole;
      if (isAdmin) {
        delete user.turma;
      }

      // Private User profile in Firestore (No passwords)
      const payload: any = {
        id: targetUserId,
        name: user.name,
        email: (user.email || '').toLowerCase().trim(),
        publicId: user.publicId,
        role: finalRole,
        language: user.language || 'pt',
        points: user.points ?? 0,
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...(user.lastActivity ? { lastActivity: user.lastActivity } : {}),
      };

      if (isAdmin) {
        payload.turma = null;
      } else {
        payload.turma = user.turma || '5.º A';
      }

      await setDoc(doc(db, 'users', targetUserId), payload, { merge: true });

      // Privacy-First Public Profile for Leaderboard (NO name, NO email, NO password)
      if (isAdmin) {
        try {
          await deleteDoc(doc(db, 'publicProfiles', targetUserId));
        } catch {
          // ignore
        }
      } else {
        await setDoc(
          doc(db, 'publicProfiles', targetUserId),
          {
            id: targetUserId,
            publicId: user.publicId,
            turma: user.turma || '5.º A',
            role: 'student',
            points: user.points ?? 0,
            avatar: user.avatar,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }

      return true;
    } catch (err: any) {
      if (err?.message?.includes('sessão válida bloqueada')) {
        throw err;
      }
      console.warn('Cloud Firestore sync notice:', err?.message || err);
      return false;
    }
  },

  /**
   * Register with platform session mechanism and Cloud Firestore
   */
  async register(
    name: string,
    email: string,
    password: string,
    turma: string,
    publicId: string,
    language: Language = 'pt',
    avatar?: AvatarConfig
  ): Promise<{ user: User; token: string }> {
    isRegisteringInProgress = true;
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();
      const trimmedPublicId = (publicId || '').trim();
      const finalTurma = turma || '5.º A';
      const isAdmin = isUserAdmin(normalizedEmail);

      if (cleanPassword.length < 6) {
        throw new Error(
          language === 'pt'
            ? 'A palavra-passe deve ter pelo menos 6 caracteres.'
            : 'Password must have at least 6 characters.'
        );
      }

      // 1. Fetch taken Nicknames from Firestore (public profiles have no PII)
      const takenPublicIds = await this.fetchTakenPublicIds();
      let finalPublicId = trimmedPublicId;

      if (!finalPublicId || takenPublicIds.some((id) => id.toLowerCase().trim() === finalPublicId.toLowerCase())) {
        finalPublicId = generateSecurePublicId(takenPublicIds);
      }

      // 2. Verify email uniqueness in Cloud Firestore users collection
      try {
        const emailQ = query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(1));
        const emailSnap = await getDocs(emailQ);
        if (!emailSnap.empty) {
          throw new Error(
            language === 'pt'
              ? '❌ Já existe uma conta associada a este email. Por favor, faz login.'
              : '❌ An account is already registered with this email. Please log in.'
          );
        }
      } catch (err: any) {
        if (err.message?.includes('Já existe uma conta')) {
          throw err;
        }
        console.warn('Email check in register notice:', err);
      }

      // 3. Tenta registar no Firebase Authentication para permitir login em qualquer dispositivo
      let fbUser: FirebaseUser | null = null;
      let userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, cleanPassword);
        fbUser = userCredential.user;
        userId = fbUser.uid;
        try {
          await updateProfile(fbUser, { displayName: name.trim() });
        } catch {
          // ignora falha na atribuição de display name
        }
      } catch (fbErr: any) {
        console.warn('Firebase Auth user creation notice:', fbErr?.code || fbErr?.message);
        if (fbErr?.code === 'auth/email-already-in-use') {
          throw new Error(
            language === 'pt'
              ? '❌ Já existe uma conta associada a este email. Por favor, faz login.'
              : '❌ An account is already registered with this email. Please log in.'
          );
        }
        // Se Firebase Auth não permitir password/email ou der erro de rede, utiliza o ID local gerado
      }

      // Bónus de primeiro acesso: 100 XP para alunos no registo
      const initialPoints = isAdmin ? 0 : 100;
      const finalAvatar = avatar || getDefaultAvatar(finalPublicId);

      const newUser: User = {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        publicId: finalPublicId,
        turma: isAdmin ? undefined : finalTurma,
        role: isAdmin ? 'admin' : 'student',
        language,
        points: initialPoints,
        avatar: finalAvatar,
        createdAt: new Date().toISOString(),
      };

      // 4. Estabelecer sessão do aluno na plataforma
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      let finalToken = userId;
      if (fbUser) {
        try {
          finalToken = await fbUser.getIdToken();
        } catch {
          finalToken = userId;
        }
      }
      this.setToken(finalToken);

      // 5. Guardar na coleção 'users' do Cloud Firestore (sem guardar palavras-passe)
      const userPayload: any = {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        publicId: finalPublicId,
        turma: isAdmin ? null : finalTurma,
        role: isAdmin ? 'admin' : 'student',
        language,
        points: initialPoints,
        avatar: finalAvatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'users', userId), userPayload, { merge: true });
      } catch (error) {
        console.warn('Firestore user document save notice in register:', error);
        // Retry gracefully without interrupting the student's registration
        try {
          await new Promise((r) => setTimeout(r, 200));
          await setDoc(doc(db, 'users', userId), userPayload, { merge: true });
        } catch (retryErr) {
          console.warn('Firestore user document retry notice in register:', retryErr);
        }
      }

      // 6. Registar transação de boas-vindas para o histórico de pontos
      if (!isAdmin) {
        const welcomeTx: PointTransaction = {
          id: `pt-welcome-${Date.now()}`,
          userId,
          amount: 100,
          reason: '🎉 Boas-vindas à Plataforma Educativa TIC (Registo: +100 XP)',
          timestamp: new Date().toISOString(),
        };
        setDoc(doc(db, 'users', userId, 'pointsHistory', welcomeTx.id), welcomeTx).catch((e) => {
          console.warn('Welcome pointsHistory notice:', e);
        });
      }

      // 7. Registar em publicProfiles para o ranking de alunos
      if (!isAdmin) {
        try {
          await setDoc(
            doc(db, 'publicProfiles', userId),
            {
              id: userId,
              publicId: finalPublicId,
              turma: finalTurma,
              role: 'student',
              points: initialPoints,
              avatar: finalAvatar,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (error) {
          console.warn('publicProfiles notice in register:', error);
        }
      }

      return { user: newUser, token: finalToken };
    } finally {
      setTimeout(() => {
        isRegisteringInProgress = false;
      }, 1000);
    }
  },

  /**
   * Login strictly with Firebase Authentication or Cloud Firestore
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!normalizedEmail || !cleanPassword) {
      throw new Error('Por favor, preenche todos os campos.');
    }

    // 1. Authenticate with Firebase Authentication
    let fbUser: FirebaseUser | null = null;
    let fallbackUserId: string | null = null;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, cleanPassword);
      fbUser = userCredential.user;
    } catch (fbError: any) {
      console.warn('Firebase Auth sign-in notification:', fbError?.code || fbError?.message);

      // Explicit authentication failure: wrong password or unknown user must ALWAYS be rejected
      if (
        fbError?.code === 'auth/wrong-password' ||
        fbError?.code === 'auth/invalid-credential' ||
        fbError?.code === 'auth/user-not-found'
      ) {
        throw new Error('Palavra-passe ou email incorretos.');
      }

      // Provider inactive in Firebase Console: safe development / offline fallback
      if (
        fbError?.code === 'auth/operation-not-allowed' ||
        fbError?.code === 'auth/admin-restricted-operation'
      ) {
        if (isUserAdmin(normalizedEmail)) {
          try {
            const q = query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(1));
            const snap = await getDocs(q);
            if (!snap.empty) {
              fallbackUserId = snap.docs[0].id;
            } else {
              fallbackUserId = 'admin_carla_oliveira_by';
            }
          } catch {
            fallbackUserId = 'admin_carla_oliveira_by';
          }
        } else {
          try {
            const q = query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(1));
            const snap = await getDocs(q);
            if (!snap.empty) {
              fallbackUserId = snap.docs[0].id;
            } else {
              throw new Error('Conta não encontrada com este email. Por favor, cria uma conta primeiro.');
            }
          } catch (e: any) {
            if (e.message?.includes('Conta não encontrada')) throw e;
            throw new Error('Palavra-passe ou email incorretos.');
          }
        }
      } else {
        throw new Error('Palavra-passe ou email incorretos.');
      }
    }

    const userId = fbUser ? fbUser.uid : (fallbackUserId as string);
    let userDocData: any = null;

    try {
      const snap = await getDoc(doc(db, 'users', userId));
      if (snap.exists()) {
        userDocData = snap.data();
      } else {
        // Query by email in case document ID differs
        const emailQ = query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(1));
        const emailSnap = await getDocs(emailQ);
        if (!emailSnap.empty) {
          userDocData = emailSnap.docs[0].data();
        }
      }
    } catch (error) {
      console.warn('Could not read user profile from Firestore:', error);
    }

    const isAdmin = isUserAdmin(normalizedEmail, userDocData?.role);
    let user: User;

    if (userDocData) {
      user = {
        id: userId,
        name: userDocData.name || fbUser?.displayName || (isAdmin ? 'Professora Carla Oliveira' : 'Estudante'),
        email: normalizedEmail,
        publicId: userDocData.publicId || (isAdmin ? 'Docente_TIC' : generateSecurePublicId()),
        turma: isAdmin ? undefined : (userDocData.turma || '5.º A'),
        role: isAdmin ? 'admin' : (userDocData.role || 'student'),
        language: userDocData.language || 'pt',
        points: typeof userDocData.points === 'number' ? userDocData.points : 0,
        avatar: userDocData.avatar || getDefaultAvatar(userDocData.publicId || userDocData.name || userId),
        createdAt: userDocData.createdAt || new Date().toISOString(),
        lastActivity: userDocData.lastActivity,
      };

      if (isAdmin) {
        delete user.turma;
      }
    } else {
      // First-time sign-in profile initialization
      user = {
        id: userId,
        name: fbUser?.displayName || (isAdmin ? 'Professora Carla Oliveira' : 'Estudante'),
        email: normalizedEmail,
        publicId: isAdmin ? 'Docente_TIC' : generateSecurePublicId(),
        turma: isAdmin ? undefined : '5.º A',
        role: isAdmin ? 'admin' : 'student',
        language: 'pt',
        points: 0,
        avatar: getDefaultAvatar(userId),
        createdAt: new Date().toISOString(),
      };
      try {
        await setDoc(
          doc(db, 'users', userId),
          {
            ...user,
            turma: isAdmin ? null : (user.turma || '5.º A'),
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        if (!isAdmin) {
          await setDoc(
            doc(db, 'publicProfiles', userId),
            {
              id: userId,
              publicId: user.publicId,
              turma: user.turma || '5.º A',
              role: 'student',
              points: 0,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
      } catch (error) {
        console.warn('Initial user profile create notice:', error);
      }
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    let token = userId;
    if (fbUser) {
      try {
        token = await fbUser.getIdToken();
      } catch {
        token = userId;
      }
    }
    this.setToken(token);

    return { user, token };
  },

  /**
   * Logout from Firebase
   */
  async logout(): Promise<void> {
    localStorage.removeItem(CURRENT_USER_KEY);
    this.removeToken();
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
  },

  /**
   * Get current user details and progress directly from Cloud Firestore
   */
  async getMe(): Promise<{
    user: User;
    progress: ActivityProgress[];
    achievements: UserAchievement[];
    pointsHistory: PointTransaction[];
  }> {
    // Wait for Firebase Auth state initialization if available
    if (typeof auth.authStateReady === 'function') {
      try {
        await auth.authStateReady();
      } catch {
        // ignore
      }
    }

    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    let user: User;

    if (auth.currentUser) {
      const fbUid = auth.currentUser.uid;
      const fbEmail = (auth.currentUser.email || '').toLowerCase().trim();
      const isAdmin = isUserAdmin(fbEmail);

      if (rawUser) {
        try {
          user = JSON.parse(rawUser);
        } catch {
          user = {
            id: fbUid,
            name: auth.currentUser.displayName || (isAdmin ? 'Professora Carla Oliveira' : 'Estudante'),
            email: fbEmail,
            publicId: isAdmin ? 'Docente_TIC' : 'Estudante',
            role: isAdmin ? 'admin' : 'student',
            language: 'pt',
            points: 0,
            createdAt: new Date().toISOString(),
          };
        }
      } else {
        user = {
          id: fbUid,
          name: auth.currentUser.displayName || (isAdmin ? 'Professora Carla Oliveira' : 'Estudante'),
          email: fbEmail,
          publicId: isAdmin ? 'Docente_TIC' : 'Estudante',
          role: isAdmin ? 'admin' : 'student',
          language: 'pt',
          points: 0,
          createdAt: new Date().toISOString(),
        };
      }
      user.id = fbUid;
      user.email = fbEmail || user.email;
    } else if (rawUser) {
      try {
        user = JSON.parse(rawUser);
      } catch {
        this.removeToken();
        localStorage.removeItem(CURRENT_USER_KEY);
        throw new Error('Não autenticado');
      }
    } else {
      this.removeToken();
      throw new Error('Não autenticado');
    }

    if (isUserAdmin(user.email, user.role)) {
      user.role = 'admin';
      delete user.turma;
    }

    // Refresh profile attributes from Firestore
    try {
      const userDocSnap = await getDoc(doc(db, 'users', user.id));
      if (userDocSnap.exists()) {
        const d = userDocSnap.data();
        user.name = d.name || user.name;
        user.publicId = d.publicId || user.publicId;
        user.role = isUserAdmin(user.email, d.role) ? 'admin' : (d.role || 'student');
        if (typeof d.points === 'number') {
          user.points = d.points;
        }
        if (d.turma && user.role !== 'admin') {
          user.turma = d.turma;
        }
        if (d.avatar) {
          user.avatar = d.avatar;
        } else if (!user.avatar) {
          user.avatar = getDefaultAvatar(user.publicId || user.name || user.id);
        }
      }
    } catch (e) {
      console.warn('Could not refresh user profile in getMe:', e);
    }

    let progress: ActivityProgress[] = [];
    let achievements: UserAchievement[] = [];
    let pointsHistory: PointTransaction[] = [];

    // 1. Fetch live user progress from Firestore
    try {
      const progressCol = collection(db, 'users', user.id, 'progress');
      const snap = await getDocs(progressCol);
      if (!snap.empty) {
        progress = snap.docs.map((d) => d.data() as ActivityProgress);
      }
    } catch (error) {
      console.warn(`Notice fetching progress for ${user.id}:`, error);
    }

    // 2. Fetch live user achievements from Firestore
    try {
      const achCol = collection(db, 'users', user.id, 'achievements');
      const snap = await getDocs(achCol);
      if (!snap.empty) {
        achievements = snap.docs.map((d) => d.data() as UserAchievement);
      }
    } catch {
      // achievements can also be derived from progress
    }

    // 3. Fetch points history and daily tips from Firestore
    let dailyTipsList: any[] = [];
    try {
      const [ptsSnap, dtSnap] = await Promise.allSettled([
        getDocs(collection(db, 'users', user.id, 'pointsHistory')),
        getDocs(collection(db, 'users', user.id, 'dailyTips')),
      ]);
      if (ptsSnap.status === 'fulfilled' && !ptsSnap.value.empty) {
        pointsHistory = ptsSnap.value.docs.map((d) => d.data() as PointTransaction);
        pointsHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      }
      if (dtSnap.status === 'fulfilled' && !dtSnap.value.empty) {
        dailyTipsList = dtSnap.value.docs.map((d) => ({ ...d.data(), id: d.id }));
      }
    } catch {
      // points history and daily tips can be empty
    }

    // 4. Calculate verified points dynamically from progress strictly matching curriculum catalog
    const isAdmin = isUserAdmin(user.email, user.role);

    // Atividades (Desafios e Quizzes): Cada atividade corresponde a um MÁXIMO DE 100 XP (awardedXp).
    // Não são somados XP pelo aluno fazer várias vezes a mesma atividade.
    let calculatedPoints = 0;
    const validatedProgress: ActivityProgress[] = [];

    for (const p of progress) {
      if (!isValidActivityId(p.activityId)) {
        console.warn(`[Integrity] Atividade inválida/desconhecida ignorada no cálculo de pontos: ${p.activityId}`);
        continue;
      }
      validatedProgress.push(p);

      // Quizzes de Aprendizagem são atividades de avaliação e não atribuem XP
      if (isLearningQuiz(p.activityId, p.activityType)) {
        continue;
      }

      // Cada desafio corresponde a um máximo de 100 XP (XP já atribuídos / awardedXp)
      const actXp = typeof p.awardedXp === 'number'
        ? Math.max(0, Math.min(100, Math.round(p.awardedXp)))
        : Math.max(0, Math.min(100, Math.round(Number(p.bestScore ?? p.score ?? p.bestPercentage ?? p.percentage ?? 0))));
      calculatedPoints += actXp;
    }

    // Derive badges dynamically based exclusively on validated curriculum activities
    const eligibleBadges = evaluateEligibleBadges(validatedProgress, calculatedPoints, new Set());

    // Legitimate daily tip points from verified history (20 XP leitura + 30 XP acerto = máx 50 XP por dia)
    const dailyTipPoints = calculateAuthoritativeDailyTipPoints(dailyTipsList, pointsHistory);

    // Preservar qualquer bónus previamente obtido se superior
    const existingBonusInUser = Math.max(0, (user.points || 0) - (100 + calculatedPoints));
    const effectiveDailyTipPoints = Math.max(dailyTipPoints, existingBonusInUser);

    // Bónus de primeiro acesso: 100 XP para alunos no registo
    const welcomeBonus = isAdmin ? 0 : 100;
    const officialVerifiedPoints = welcomeBonus + calculatedPoints + effectiveDailyTipPoints;

    // 5. User points are authoritatively derived from welcome bonus + verified activities + legitimate daily tips
    if (!isAdmin) {
      user.points = officialVerifiedPoints;
      setDoc(doc(db, 'users', user.id), { points: officialVerifiedPoints }, { merge: true }).catch(() => {});
      setDoc(doc(db, 'publicProfiles', user.id), { points: officialVerifiedPoints }, { merge: true }).catch(() => {});
    } else {
      user.points = 0;
    }

    // Combine any stored achievements with derived ones
    const badgeIdSet = new Set(achievements.map((a) => a.badgeId));
    for (const eb of eligibleBadges) {
      if (!badgeIdSet.has(eb.badgeId)) {
        achievements.push({
          userId: user.id,
          badgeId: eb.badgeId,
          unlockedAt: new Date().toISOString(),
        });
        badgeIdSet.add(eb.badgeId);
      }
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return { user, progress, achievements, pointsHistory };
  },

  async updateLanguage(language: Language): Promise<void> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (rawUser) {
      const user = JSON.parse(rawUser);
      user.language = language;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      if (auth.currentUser && auth.currentUser.uid === user.id) {
        try {
          await setDoc(doc(db, 'users', user.id), { language }, { merge: true });
        } catch {
          // ignore
        }
      }
    }
  },

  /**
   * Update student cartoon avatar in Firestore and local storage
   */
  async updateUserAvatar(userId: string, newAvatar: AvatarConfig): Promise<void> {
    const updatedAt = new Date().toISOString();

    // 1. Update users collection
    try {
      await setDoc(
        doc(db, 'users', userId),
        { avatar: newAvatar, updatedAt },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore user avatar update notice:', err);
    }

    // 2. Update publicProfiles collection
    try {
      await setDoc(
        doc(db, 'publicProfiles', userId),
        { avatar: newAvatar, updatedAt },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore publicProfile avatar update notice:', err);
    }

    // 3. Update local user state
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) {
        const u = JSON.parse(raw);
        if (u.id === userId) {
          u.avatar = newAvatar;
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
        }
      }
    } catch {
      // ignore
    }
  },

  /**
   * Save user activity progress to Firestore with server-validated score and anti-cheat checks
   */
  async saveProgress(payload: {
    activityId: string;
    activityType: 'module' | 'quiz' | 'challenge';
    themeId: string;
    status?: 'completed' | 'in_progress';
    score?: number;
    maxScore?: number;
    percentage?: number;
    activityTitle?: string;
    quizAnswers?: Record<string, string | number> | (string | number)[];
  }): Promise<{
    success: boolean;
    record: ActivityProgress;
    userPoints: number;
    lastActivity: User['lastActivity'];
    achievements: UserAchievement[];
    earnedPoints?: number;
    prevBestScore?: number;
    newBestScore?: number;
    awardedXp?: number;
    attemptScore?: number;
  }> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) throw new Error('Inicia sessão para guardar o progresso.');

    const user: User = JSON.parse(rawUser);
    // Enforce identity integrity: prioritize Firebase Auth currentUser UID if available
    const userId = (auth.currentUser?.uid && auth.currentUser.uid === user.id)
      ? auth.currentUser.uid
      : user.id;

    // Validate inputs
    if (!payload.activityId || !payload.themeId) {
      throw new Error('Identificador da atividade em falta.');
    }

    // 0. INTEGRITY CHECK: Reject unknown activity IDs that are not in the official curriculum
    if (!isValidActivityId(payload.activityId)) {
      throw new Error(`Atividade inválida ou não reconhecida no currículo: ${payload.activityId}`);
    }

    // Check if activity is a "Quiz de Aprendizagem"
    const isQuiz = isLearningQuiz(payload.activityId, payload.activityType);

    // Clamp and sanitize percentage (0 to 100)
    let finalPercentage: number | undefined = payload.percentage;

    // If it's a quiz and answers were supplied, evaluate against official answer key
    if (isQuiz && payload.quizAnswers) {
      const serverQuizResult = evaluateQuizSubmission(payload.activityId, payload.quizAnswers);
      if (serverQuizResult) {
        finalPercentage = serverQuizResult.percentage;
      }
    }

    if (finalPercentage === undefined) {
      if (payload.score !== undefined && payload.maxScore && payload.maxScore > 0) {
        const safeScore = Math.max(0, Math.min(payload.score, payload.maxScore));
        finalPercentage = Math.round((safeScore / payload.maxScore) * 100);
      } else {
        finalPercentage = 100;
      }
    } else {
      finalPercentage = Math.max(0, Math.min(100, Math.round(Number(finalPercentage) || 0)));
    }

    // 1. Fetch current progress list, achievements, daily tips, and points history from Firestore
    let progressList: ActivityProgress[] = [];
    let achievements: UserAchievement[] = [];
    let dailyTipsList: any[] = [];
    let pointsHistoryList: PointTransaction[] = [];

    try {
      const [snapP, snapA, snapDT, snapPH] = await Promise.allSettled([
        getDocs(collection(db, 'users', userId, 'progress')),
        getDocs(collection(db, 'users', userId, 'achievements')),
        getDocs(collection(db, 'users', userId, 'dailyTips')),
        getDocs(collection(db, 'users', userId, 'pointsHistory')),
      ]);

      if (snapP.status === 'fulfilled' && !snapP.value.empty) {
        progressList = snapP.value.docs.map((d) => d.data() as ActivityProgress);
      } else {
        progressList = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + userId) || '[]');
      }

      if (snapA.status === 'fulfilled' && !snapA.value.empty) {
        achievements = snapA.value.docs.map((d) => d.data() as UserAchievement);
      } else {
        achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]');
      }

      if (snapDT.status === 'fulfilled' && !snapDT.value.empty) {
        dailyTipsList = snapDT.value.docs.map((d) => ({ ...d.data(), id: d.id }));
      }

      if (snapPH.status === 'fulfilled' && !snapPH.value.empty) {
        pointsHistoryList = snapPH.value.docs.map((d) => d.data() as PointTransaction);
      }
    } catch {
      progressList = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + userId) || '[]');
      achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]');
    }

    let existing = progressList.find((p) => p.activityId === payload.activityId);
    let earnedPoints = 0;

    // =========================================================================
    // REGRA CRÍTICA — QUIZ DE APRENDIZAGEM VS DESAFIOS REGULARES
    // 1. QUIZ DE APRENDIZAGEM (Avaliação):
    //    - A 1.ª TENTATIVA é a única que conta para a avaliação oficial (firstAttemptScore).
    //    - Tentativas seguintes são apenas para treino/revisão (latestScore, attempts).
    //    - NÃO atribui XP (0 XP para sempre).
    // 2. DESAFIOS REGULARES (Jogos):
    //    - Cada atividade vale até 100 XP por melhoria incremental (awardedXp).
    // =========================================================================
    const normalizedMaxScore = 100;
    const novaPontuacao = Math.max(0, Math.min(100, Math.round(finalPercentage ?? 0)));

    const melhorPontuacaoAnterior = existing
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              Number(existing.bestScore ?? existing.score ?? existing.bestPercentage ?? existing.percentage ?? 0)
            )
          )
        )
      : 0;

    const novaMelhorPontuacao = Math.max(melhorPontuacaoAnterior, novaPontuacao);

    let xpAdicional = 0;
    let novoXpAtribuido = 0;

    if (isQuiz) {
      // QUIZ: NÃO ATRIBUI XP (0 XP)
      xpAdicional = 0;
      novoXpAtribuido = 0;
      earnedPoints = 0;

      if (!existing) {
        // 1.ª TENTATIVA = AVALIAÇÃO OFICIAL
        existing = {
          userId,
          activityId: payload.activityId,
          activityType: 'quiz',
          themeId: payload.themeId,
          status: 'completed',
          score: novaPontuacao, // pontuação obtida nesta tentativa
          maxScore: normalizedMaxScore,
          percentage: novaPontuacao,
          attempts: 1,
          bestScore: novaPontuacao,
          bestPercentage: novaPontuacao,
          firstAttemptScore: novaPontuacao, // AVALIAÇÃO OFICIAL INALTERÁVEL
          firstAttemptPercentage: novaPontuacao,
          firstAttemptDate: new Date().toISOString(),
          latestScore: novaPontuacao,
          latestPercentage: novaPontuacao,
          awardedXp: 0, // Quiz não atribui XP
          lastUpdated: new Date().toISOString(),
        };
        progressList.push(existing);
      } else {
        // TENTATIVAS SEGUINTES = APRENDIZAGEM / REVISÃO / TREINO
        existing.attempts = (existing.attempts || 1) + 1;
        existing.lastUpdated = new Date().toISOString();
        existing.latestScore = novaPontuacao;
        existing.latestPercentage = novaPontuacao;
        existing.score = novaPontuacao; // o aluno vê a percentagem desta tentativa
        existing.percentage = novaPontuacao;
        existing.maxScore = normalizedMaxScore;
        existing.awardedXp = 0; // Quiz nunca atribui XP

        // Garantir que a 1.ª tentativa se mantém estritamente preservada como a avaliação oficial
        if (existing.firstAttemptScore === undefined) {
          existing.firstAttemptScore = existing.score ?? novaPontuacao;
        }
        if (existing.firstAttemptPercentage === undefined) {
          existing.firstAttemptPercentage = existing.percentage ?? novaPontuacao;
        }
        if (!existing.firstAttemptDate) {
          existing.firstAttemptDate = existing.lastUpdated;
        }

        // Registar a melhor tentativa apenas para histórico de treino, mantendo a avaliação na 1.ª tentativa
        existing.bestScore = Math.max(Number(existing.bestScore || 0), novaPontuacao);
        existing.bestPercentage = Math.max(Number(existing.bestPercentage || 0), novaPontuacao);
        existing.status = 'completed';
      }
    } else {
      // DESAFIOS REGULARES: XP incremental até ao máximo de 100 XP
      // 1. Ler quanto XP já foi atribuído por este desafio (0 se for 1.ª tentativa)
      const xpJaAtribuidoPelaAtividade = existing
        ? (typeof existing.awardedXp === 'number'
            ? Math.max(0, Math.min(100, Math.round(existing.awardedXp)))
            : melhorPontuacaoAnterior)
        : 0;

      // 2. O XP adicional de uma tentativa deve ser calculado exclusivamente com base na melhoria da melhor pontuação:
      // XP_ADICIONAL = MAX(0, NOVA_PONTUACAO - MELHOR_PONTUACAO_ANTERIOR)
      xpAdicional = Math.max(0, novaPontuacao - melhorPontuacaoAnterior);
      xpAdicional = Math.min(xpAdicional, Math.max(0, 100 - xpJaAtribuidoPelaAtividade));

      if (
        novaPontuacao <= melhorPontuacaoAnterior ||
        melhorPontuacaoAnterior === 100 ||
        xpJaAtribuidoPelaAtividade >= 100
      ) {
        xpAdicional = 0;
      }

      novoXpAtribuido = Math.max(0, Math.min(100, xpJaAtribuidoPelaAtividade + xpAdicional));
      earnedPoints = xpAdicional;

      if (!existing) {
        // 1.ª TENTATIVA DO DESAFIO
        const isCompletedForProgress = novaMelhorPontuacao >= 50;
        existing = {
          userId,
          activityId: payload.activityId,
          activityType: payload.activityType,
          themeId: payload.themeId,
          status: isCompletedForProgress ? 'completed' : 'in_progress',
          score: novaPontuacao,
          maxScore: normalizedMaxScore,
          percentage: novaPontuacao,
          attempts: 1,
          bestScore: novaMelhorPontuacao,
          bestPercentage: novaMelhorPontuacao,
          firstAttemptScore: novaPontuacao,
          firstAttemptPercentage: novaPontuacao,
          firstAttemptDate: new Date().toISOString(),
          latestScore: novaPontuacao,
          latestPercentage: novaPontuacao,
          awardedXp: novoXpAtribuido,
          lastUpdated: new Date().toISOString(),
        };
        progressList.push(existing);
      } else {
        // TENTATIVAS SEGUINTES DO DESAFIO
        existing.attempts = (existing.attempts || 1) + 1;
        existing.lastUpdated = new Date().toISOString();
        existing.latestScore = novaPontuacao;
        existing.latestPercentage = novaPontuacao;
        existing.score = novaPontuacao;
        existing.percentage = novaPontuacao;
        existing.maxScore = normalizedMaxScore;

        if (existing.firstAttemptScore === undefined) {
          existing.firstAttemptScore = existing.score ?? novaPontuacao;
        }
        if (existing.firstAttemptPercentage === undefined) {
          existing.firstAttemptPercentage = existing.percentage ?? novaPontuacao;
        }
        if (!existing.firstAttemptDate) {
          existing.firstAttemptDate = existing.lastUpdated;
        }

        existing.bestScore = novaMelhorPontuacao;
        existing.bestPercentage = novaMelhorPontuacao;
        existing.awardedXp = novoXpAtribuido;

        const isCompletedForProgress = novaMelhorPontuacao >= 50;
        existing.status = isCompletedForProgress ? 'completed' : 'in_progress';
      }
    }

    // CÁLCULO AUTORITATIVO DE PONTOS TOTAIS DO ALUNO:
    // Garante que cada desafio conta no máximo 100 XP (awardedXp) e quizzes contam 0 XP.
    const isAdmin = isUserAdmin(user.email, user.role);

    let curricularPointsSum = 0;
    const validatedProgress: ActivityProgress[] = [];

    for (const p of progressList) {
      if (!isValidActivityId(p.activityId)) {
        continue;
      }
      validatedProgress.push(p);

      // Quizzes não atribuem XP curricular
      if (isLearningQuiz(p.activityId, p.activityType)) {
        continue;
      }

      const actXp = typeof p.awardedXp === 'number'
        ? Math.max(0, Math.min(100, Math.round(p.awardedXp)))
        : Math.max(0, Math.min(100, Math.round(Number(p.bestScore ?? p.score ?? p.bestPercentage ?? p.percentage ?? 0))));
      curricularPointsSum += actXp;
    }

    // 2. Audit log points transaction
    if (earnedPoints > 0) {
      const ptTx: PointTransaction = {
        id: `pt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        userId,
        amount: earnedPoints,
        reason: payload.activityTitle
          ? `${payload.activityTitle} (+${earnedPoints} XP)`
          : `Atividade (+${earnedPoints} XP)`,
        timestamp: new Date().toISOString(),
      };
      setDoc(doc(db, 'users', userId, 'pointsHistory', ptTx.id), ptTx).catch(() => {});
    }

    // 3. Evaluate Badges Unlocking (Strictly once per badge, medals to display)
    const existingBadgeIds = new Set(achievements.map((a) => a.badgeId));
    const newBadges = evaluateEligibleBadges(validatedProgress, curricularPointsSum, existingBadgeIds);

    for (const badge of newBadges) {
      const newAch: UserAchievement = {
        userId,
        badgeId: badge.badgeId,
        unlockedAt: new Date().toISOString(),
      };
      achievements.push(newAch);
      existingBadgeIds.add(badge.badgeId);

      // Persist badge to Cloud Firestore
      setDoc(doc(db, 'users', userId, 'achievements', badge.badgeId), newAch).catch(() => {});
    }

    // CÁLCULO DE PONTOS DA DICA DIÁRIA / DA SEMANA:
    // Garante que os pontos obtidos em Dicas Diárias nunca são apagados ou ignorados.
    const dailyTipPoints = calculateAuthoritativeDailyTipPoints(dailyTipsList, pointsHistoryList);

    // Salvaguarda: preserva qualquer bónus de dicas existente no perfil do aluno caso a leitura de Firestore falhe
    const previousCurricularSum = progressList.reduce((acc, p) => {
      if (isValidActivityId(p.activityId) && !isLearningQuiz(p.activityId, p.activityType)) {
        return acc + (typeof p.awardedXp === 'number' ? Math.max(0, Math.min(100, Math.round(p.awardedXp))) : 0);
      }
      return acc;
    }, 0);
    const existingBonusInUser = Math.max(0, (user.points || 0) - (100 + previousCurricularSum));
    const effectiveDailyTipPoints = Math.max(dailyTipPoints, existingBonusInUser);

    const welcomeBonus = isAdmin ? 0 : 100;
    const authoritativeTotalPoints = isAdmin ? 0 : (welcomeBonus + curricularPointsSum + effectiveDailyTipPoints);
    user.points = authoritativeTotalPoints;
    user.lastActivity = {
      themeId: payload.themeId,
      title: payload.activityTitle || payload.activityId,
      timestamp: new Date().toISOString(),
    };

    // 4. Sync Progress and User Activity to Cloud Firestore
    try {
      await setDoc(doc(db, 'users', userId, 'progress', payload.activityId), existing, { merge: true });

      const userUpdatePayload: any = {
        points: user.points,
        lastActivity: user.lastActivity,
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', userId), userUpdatePayload, { merge: true });

      // Keep public profiles in sync for the student leaderboard (excluding admin accounts)
      if (!isUserAdmin(user.email, user.role)) {
        const completedActivities = progressList.filter((p) => p.status === 'completed').length;
        const badgeCount = achievements.length;
        await setDoc(
          doc(db, 'publicProfiles', userId),
          {
            points: user.points,
            completedActivities,
            badgeCount,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('⚠️ Firestore sync notice in saveProgress:', err);
    }

    // Cache to localStorage
    localStorage.setItem(PROGRESS_STORAGE_KEY + userId, JSON.stringify(progressList));
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + userId, JSON.stringify(achievements));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return {
      success: true,
      record: existing,
      userPoints: user.points,
      lastActivity: user.lastActivity,
      achievements,
      earnedPoints,
      prevBestScore: melhorPontuacaoAnterior,
      newBestScore: novaMelhorPontuacao,
      awardedXp: novoXpAtribuido,
      attemptScore: novaPontuacao,
    };
  },

  /**
   * Record Daily TIC Tip Bonus (50 points for correct answer, 25 points for participation)
   * Persists multi-device daily tip status under /users/{userId}/dailyTips/{dateStr}
   */
  /**
   * Registar leitura da dica diária: atribui 20 XP ao aluno pela leitura
   */
  async recordDailyTipRead(
    tipTitle: string,
    dateStr?: string
  ): Promise<{
    success: boolean;
    user: User | null;
    userPoints: number;
    earnedPoints: number;
    achievements: UserAchievement[];
  }> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
      return { success: true, user: null, userPoints: 0, earnedPoints: 0, achievements: [] };
    }

    const user: User = JSON.parse(rawUser);
    const userId = user.id;
    const effectiveDate = dateStr || new Date().toISOString().split('T')[0];

    // Verificar se o aluno já leu ou respondeu à dica nesta data
    try {
      const existingDoc = await getDoc(doc(db, 'users', userId, 'dailyTips', effectiveDate));
      if (existingDoc.exists() && (existingDoc.data()?.read || existingDoc.data()?.answered)) {
        return {
          success: true,
          user,
          userPoints: user.points || 0,
          earnedPoints: 0,
          achievements: JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]'),
        };
      }
    } catch (e) {
      console.warn('Daily tip read check notice:', e);
    }

    const earnedPoints = 20; // 20 XP pela leitura da dica
    user.points = (user.points || 0) + earnedPoints;
    user.lastActivity = {
      themeId: 'daily_tip',
      title: `📖 Leitura da Dica: ${tipTitle}`,
      timestamp: new Date().toISOString(),
    };

    const tipTx: PointTransaction = {
      id: `pt-daily-read-${effectiveDate}-${Date.now()}`,
      userId,
      amount: earnedPoints,
      reason: `📖 Leitura da Dica TIC (+20 XP): ${tipTitle}`,
      timestamp: new Date().toISOString(),
    };
    setDoc(doc(db, 'users', userId, 'pointsHistory', tipTx.id), tipTx).catch(() => {});

    // Guardar registo em users/{userId}/dailyTips/{effectiveDate}
    const dailyRecord = {
      userId,
      date: effectiveDate,
      read: true,
      readPoints: 20,
      pointsEarned: 20,
      timestamp: new Date().toISOString(),
    };
    setDoc(doc(db, 'users', userId, 'dailyTips', effectiveDate), dailyRecord, { merge: true }).catch(() => {});

    try {
      await setDoc(
        doc(db, 'users', userId),
        {
          points: user.points,
          lastActivity: user.lastActivity,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      if (!isUserAdmin(user.email, user.role)) {
        await setDoc(
          doc(db, 'publicProfiles', userId),
          {
            points: user.points,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('Firestore sync notice for daily tip read:', err);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return {
      success: true,
      user,
      userPoints: user.points,
      earnedPoints,
      achievements: JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]'),
    };
  },

  /**
   * Resposta à pergunta da dica diária:
   * 20 XP se ainda não tiver lido + 30 XP se acertar na resposta.
   */
  async recordDailyTipBonus(
    tipTitle: string,
    bonusPoints = 30,
    dateStr?: string,
    answerDetails?: { selectedOptionId: string; isCorrect: boolean }
  ): Promise<{
    success: boolean;
    user: User | null;
    userPoints: number;
    earnedPoints: number;
    readingPoints: number;
    answerPoints: number;
    achievements: UserAchievement[];
  }> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
      return { success: true, user: null, userPoints: 0, earnedPoints: 0, readingPoints: 0, answerPoints: 0, achievements: [] };
    }

    const user: User = JSON.parse(rawUser);
    const userId = user.id;

    const effectiveDate = dateStr || new Date().toISOString().split('T')[0];
    let alreadyRead = false;
    let alreadyAnswered = false;
    let existingData: any = null;

    try {
      const existingDoc = await getDoc(doc(db, 'users', userId, 'dailyTips', effectiveDate));
      if (existingDoc.exists()) {
        existingData = existingDoc.data();
        alreadyRead = !!existingData?.read;
        alreadyAnswered = !!existingData?.answered;
      }
    } catch (e) {
      console.warn('Daily tip prior existence check notice:', e);
    }

    if (alreadyAnswered) {
      return {
        success: true,
        user,
        userPoints: user.points || 0,
        earnedPoints: 0,
        readingPoints: existingData?.readPoints || 20,
        answerPoints: existingData?.answerPoints || 0,
        achievements: JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]'),
      };
    }

    let isCorrectAnswer = answerDetails?.isCorrect ?? false;
    if (answerDetails?.selectedOptionId && effectiveDate) {
      const serverTipEvaluation = evaluateDailyTipSubmission(effectiveDate, answerDetails.selectedOptionId);
      isCorrectAnswer = serverTipEvaluation.isCorrect;
    }

    // Regras:
    // 20 XP pela leitura (se ainda não tiver sido atribuído hoje)
    // 30 XP pelo acerto na resposta
    const readingPointsToAward = alreadyRead ? 0 : 20;
    const answerPointsToAward = isCorrectAnswer ? 30 : 0;
    const pointsToAward = readingPointsToAward + answerPointsToAward;

    user.points = (user.points || 0) + pointsToAward;
    user.lastActivity = {
      themeId: 'daily_tip',
      title: isCorrectAnswer ? `🎉 Resposta Certa na Dica: ${tipTitle}` : `💡 Dica: ${tipTitle}`,
      timestamp: new Date().toISOString(),
    };

    // Log transaction
    if (pointsToAward > 0) {
      const tipTx: PointTransaction = {
        id: `pt-daily-ans-${effectiveDate}-${Date.now()}`,
        userId,
        amount: pointsToAward,
        reason: isCorrectAnswer
          ? `🎉 Resposta Certa na Dica TIC (+${pointsToAward} XP): ${tipTitle}`
          : `📖 Leitura da Dica TIC (+${pointsToAward} XP): ${tipTitle}`,
        timestamp: new Date().toISOString(),
      };
      setDoc(doc(db, 'users', userId, 'pointsHistory', tipTx.id), tipTx).catch(() => {});
    }

    const totalPointsToday = (existingData?.readPoints || (alreadyRead ? 20 : 0)) + readingPointsToAward + answerPointsToAward;

    // Save daily tip record for multi-device sync
    const dailyRecord = {
      userId,
      date: effectiveDate,
      read: true,
      readPoints: 20,
      answered: true,
      selectedOptionId: answerDetails?.selectedOptionId || '',
      isCorrect: isCorrectAnswer,
      answerPoints: answerPointsToAward,
      pointsEarned: totalPointsToday,
      timestamp: new Date().toISOString(),
    };
    setDoc(doc(db, 'users', userId, 'dailyTips', effectiveDate), dailyRecord, { merge: true }).catch((e) => {
      console.warn('Daily tip answer Firestore sync notice:', e);
    });

    try {
      const userUpdatePayload: any = {
        points: user.points,
        lastActivity: user.lastActivity,
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', userId), userUpdatePayload, { merge: true });

      if (!isUserAdmin(user.email, user.role)) {
        await setDoc(
          doc(db, 'publicProfiles', userId),
          {
            points: user.points,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('Firestore sync notice for daily tip:', err);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return {
      success: true,
      user,
      userPoints: user.points,
      earnedPoints: pointsToAward,
      readingPoints: 20,
      answerPoints: answerPointsToAward,
      achievements: JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]'),
    };
  },

  /**
   * Get daily tip answer record from Cloud Firestore for multi-device synchronization
   */
  async getDailyTipStatus(
    userId: string,
    dateStr: string
  ): Promise<{
    read: boolean;
    answered: boolean;
    selectedOptionId: string;
    isCorrect: boolean;
    pointsEarned: number;
    readPoints: number;
    answerPoints: number;
    timestamp: string;
  } | null> {
    if (!userId || !dateStr) return null;
    try {
      const snap = await getDoc(doc(db, 'users', userId, 'dailyTips', dateStr));
      if (snap.exists()) {
        const d = snap.data();
        return {
          read: !!d.read || !!d.answered,
          answered: !!d.answered,
          selectedOptionId: d.selectedOptionId || '',
          isCorrect: !!d.isCorrect,
          pointsEarned: typeof d.pointsEarned === 'number' ? d.pointsEarned : 0,
          readPoints: typeof d.readPoints === 'number' ? d.readPoints : (d.read ? 20 : 0),
          answerPoints: typeof d.answerPoints === 'number' ? d.answerPoints : (d.isCorrect ? 30 : 0),
          timestamp: d.timestamp || '',
        };
      }
    } catch (err) {
      console.warn('Daily tip status fetch notice:', err);
    }
    return null;
  },

  /**
   * Get Class/Turma Rankings with Gamification metrics
   * Authoritative source is Cloud Firestore publicProfiles and users collections.
   * Admins and Teachers are 100% strictly excluded.
   * For student privacy: non-admin students only see individual student rosters for their own class.
   */
  async getTurmaRankings(userTurma?: string, isAdminUser = false): Promise<TurmaRanking[]> {
    const defaultTurmas = getTurmasList();
    const studentMap = new Map<string, { id: string; publicId: string; turma: string; points: number; activitiesCount: number; badgeCount: number; avatar?: AvatarConfig }>();

    try {
      const q = query(collection(db, 'publicProfiles'), limit(500));
      const snap = await getDocs(q);

      const rawUser = typeof localStorage !== 'undefined' ? localStorage.getItem(CURRENT_USER_KEY) : null;
      let currentUserId: string | null = null;
      let currentUserPoints: number | null = null;
      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser);
          currentUserId = parsed.id;
          currentUserPoints = typeof parsed.points === 'number' ? parsed.points : null;
        } catch {}
      }

      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.role === 'admin' || d.role === 'teacher') return;
        const studentTurma = d.turma ? String(d.turma).trim() : '';
        if (studentTurma) {
          // Strictly enforce official points: clamp points to pedagogical curriculum ceiling (3200 XP)
          // and use authoritatively verified points for current active student session
          let finalPoints = typeof d.points === 'number' ? d.points : (Number(d.points) || 0);
          finalPoints = Math.min(3200, Math.max(0, finalPoints));

          if (docSnap.id === currentUserId && currentUserPoints !== null) {
            finalPoints = currentUserPoints;
          }

          studentMap.set(docSnap.id, {
            id: docSnap.id,
            publicId: d.publicId || 'Estudante_TIC',
            turma: studentTurma,
            points: finalPoints,
            activitiesCount: typeof d.completedActivities === 'number' ? d.completedActivities : (typeof d.activitiesCount === 'number' ? d.activitiesCount : 0),
            badgeCount: typeof d.badgeCount === 'number' ? d.badgeCount : 0,
            avatar: d.avatar,
          });
        }
      });
    } catch (err) {
      console.warn('Firestore notice in getTurmaRankings:', err);
    }

    const allStudents = Array.from(studentMap.values());
    const turmaSet = new Set<string>(defaultTurmas);
    allStudents.forEach((u) => {
      if (u.turma) {
        turmaSet.add(u.turma.trim());
      }
    });

    const allTurmaNames = Array.from(turmaSet);

    const result: TurmaRanking[] = allTurmaNames.map((turmaName) => {
      const turmaStudents = allStudents.filter(
        (u) => u.turma.toLowerCase().trim() === turmaName.toLowerCase().trim()
      );
      const totalPoints = turmaStudents.reduce((sum, u) => sum + (u.points || 0), 0);
      const studentCount = turmaStudents.length;
      const avgPoints = studentCount > 0 ? Math.round(totalPoints / studentCount) : 0;
      const totalCompletedActivities = turmaStudents.reduce((sum, u) => sum + (u.activitiesCount || 0), 0);

      const allStudentsInTurma = [...turmaStudents]
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .map((s) => ({
          publicId: s.publicId || 'Estudante_TIC',
          points: s.points || 0,
          activitiesCount: s.activitiesCount || 0,
          badgeCount: s.badgeCount || 0,
          avatar: s.avatar,
        }));

      const topStudents = allStudentsInTurma.slice(0, 3).map((s) => ({
        publicId: s.publicId,
        points: s.points,
        avatar: s.avatar,
      }));

      // Privacy: Only show individual student breakdowns if user is admin or it is their own turma
      const isAllowedToSeeStudents = isAdminUser || (!!userTurma && turmaName.toLowerCase().trim() === userTurma.toLowerCase().trim());

      return {
        turma: turmaName,
        totalPoints,
        avgPoints,
        studentCount,
        completedActivities: totalCompletedActivities,
        topBadge:
          studentCount === 0
            ? '⭐ Sem Alunos'
            : avgPoints >= 100
            ? '🥇 Turma Ouro'
            : avgPoints >= 50
            ? '🥈 Turma Prata'
            : avgPoints > 0
            ? '🥉 Turma Bronze'
            : '⭐ Estreante',
        topStudents: isAllowedToSeeStudents ? topStudents : [],
        allStudents: isAllowedToSeeStudents ? allStudentsInTurma : [],
      };
    });

    result.sort((a, b) => b.totalPoints - a.totalPoints || b.avgPoints - a.avgPoints || a.turma.localeCompare(b.turma));
    return result;
  },

  /**
   * Get Individual Student Rankings (using safe public Nicknames)
   * Excludes all Admin / Teacher accounts.
   * For students: strictly limits results to students of their own class (userTurma).
   */
  async getStudentRankings(
    currentUserId?: string,
    userTurma?: string,
    isAdminUser = false
  ): Promise<StudentRanking[]> {
    const studentList: { id: string; publicId: string; turma: string; points: number; activitiesCount: number; badgeCount: number; avatar?: AvatarConfig }[] = [];

    try {
      const q = query(collection(db, 'publicProfiles'), limit(500));
      const snap = await getDocs(q);

      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.role === 'admin' || d.role === 'teacher') return;
        const studentTurma = d.turma ? String(d.turma).trim() : '5.º A';

        // Non-admin students only receive rankings of students in their own class
        if (!isAdminUser && userTurma) {
          if (studentTurma.toLowerCase().trim() !== userTurma.toLowerCase().trim()) {
            return;
          }
        }

        studentList.push({
          id: docSnap.id,
          publicId: d.publicId || 'Estudante_TIC',
          turma: studentTurma,
          points: typeof d.points === 'number' ? d.points : (Number(d.points) || 0),
          activitiesCount: typeof d.completedActivities === 'number' ? d.completedActivities : (typeof d.activitiesCount === 'number' ? d.activitiesCount : 0),
          badgeCount: typeof d.badgeCount === 'number' ? d.badgeCount : 0,
          avatar: d.avatar,
        });
      });
    } catch (err) {
      console.warn('Firestore student rankings query notice:', err);
    }

    studentList.sort((a, b) => (b.points || 0) - (a.points || 0));

    return studentList.map((u, index) => ({
      position: index + 1,
      id: u.id,
      publicId: u.publicId || 'Estudante_TIC',
      turma: u.turma || '5.º A',
      points: u.points || 0,
      activitiesCount: u.activitiesCount || 0,
      badgeCount: u.badgeCount || 0,
      isCurrentUser: u.id === currentUserId,
      avatar: u.avatar,
    }));
  },

  /**
   * Fetch progress records for a single student from Cloud Firestore or fallback to localStorage
   */
  async getStudentProgress(studentId: string): Promise<ActivityProgress[]> {
    if (!studentId) return [];
    try {
      const snap = await getDocs(collection(db, 'users', studentId, 'progress'));
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as ActivityProgress);
      }
    } catch (err) {
      // Cloud Firestore read notice, fallback to local storage
    }
    try {
      const local = localStorage.getItem(PROGRESS_STORAGE_KEY + studentId);
      if (local) {
        return JSON.parse(local) as ActivityProgress[];
      }
    } catch {
      // Ignore parse error
    }
    return [];
  },

  /**
   * Batch fetch progress records for multiple students for Teacher Area
   */
  async getStudentsProgressBatch(studentIds: string[]): Promise<Record<string, ActivityProgress[]>> {
    const result: Record<string, ActivityProgress[]> = {};
    if (!studentIds || studentIds.length === 0) return result;

    await Promise.allSettled(
      studentIds.map(async (id) => {
        try {
          const list = await this.getStudentProgress(id);
          result[id] = list;
        } catch {
          result[id] = [];
        }
      })
    );

    return result;
  },

  /**
   * Fetch all registered students from Cloud Firestore for Teacher Area
   */
  async getAllStudentsForAdmin(): Promise<User[]> {
    const studentList: User[] = [];

    try {
      const q = query(collection(db, 'users'), limit(500));
      const snap = await getDocs(q);

      snap.forEach((docSnap) => {
        const data = docSnap.data();
        const rawEmail = data.email || '';
        const emailNorm = String(rawEmail).toLowerCase().trim();
        if (emailNorm && !isUserAdmin(emailNorm, data.role)) {
          studentList.push({
            id: docSnap.id,
            name: data.name || 'Estudante',
            email: emailNorm,
            publicId: data.publicId || 'Estudante',
            turma: data.turma || '5.º A',
            role: 'student',
            language: data.language || 'pt',
            points: typeof data.points === 'number' ? data.points : 0,
            avatar: data.avatar,
            createdAt: data.createdAt || new Date().toISOString(),
            lastActivity: data.lastActivity,
          });
        }
      });
    } catch (err) {
      console.warn('Could not query users collection for admin:', err);
    }

    return studentList.sort((a, b) => {
      const turmaA = a.turma || '5.º A';
      const turmaB = b.turma || '5.º A';
      if (turmaA !== turmaB) {
        return turmaA.localeCompare(turmaB);
      }
      return (b.points || 0) - (a.points || 0);
    });
  },

  /**
   * Teacher / Admin management tool to update a student's class (turma) or name
   * Passwords are managed securely through Firebase Authentication.
   */
  async adminUpdateStudent(
    studentId: string,
    studentEmail: string,
    updates: {
      newPassword?: string;
      newTurma?: string;
      newName?: string;
    }
  ): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = (studentEmail || '').toLowerCase().trim();
    if (!normalizedEmail && !studentId) {
      throw new Error('Identificador do aluno não fornecido.');
    }

    const firestoreUpdates: any = {
      updatedAt: new Date().toISOString(),
    };
    if (updates.newTurma) firestoreUpdates.turma = updates.newTurma.trim();
    if (updates.newName) firestoreUpdates.name = updates.newName.trim();
    if (updates.newPassword) {
      firestoreUpdates.passwordHash = deleteField();
      firestoreUpdates.password = deleteField();
    }

    // 1. Update in Cloud Firestore users collection
    try {
      if (studentId) {
        await setDoc(doc(db, 'users', studentId), firestoreUpdates, { merge: true });
      }
    } catch (err) {
      console.warn('Firestore update warning in adminUpdateStudent:', err);
    }

    // 2. Update in Cloud Firestore publicProfiles collection
    try {
      if (studentId && updates.newTurma) {
        await setDoc(
          doc(db, 'publicProfiles', studentId),
          {
            turma: updates.newTurma.trim(),
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('Firestore publicProfile update warning:', err);
    }

    // 3. If password reset is requested, trigger Firebase Auth password reset email
    if (updates.newPassword && normalizedEmail) {
      try {
        await sendPasswordResetEmail(auth, normalizedEmail);
      } catch {
        // ignore
      }
    }

    return {
      success: true,
      message: updates.newPassword
        ? 'Dados do aluno atualizados! Foi enviado email de redefinição de palavra-passe para o aluno.'
        : 'Registo do aluno atualizado com sucesso!',
    };
  },

  /**
   * Delete a single student from Firestore and local caches
   */
  async adminDeleteStudent(studentId: string, studentEmail: string): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = (studentEmail || '').toLowerCase().trim();
    if (isUserAdmin(normalizedEmail)) {
      throw new Error('Não é permitido eliminar a conta da Professora / Administrador.');
    }

    try {
      if (studentId) {
        // 1. Delete subcollections
        try {
          const progSnap = await getDocs(collection(db, 'users', studentId, 'progress'));
          await Promise.allSettled(progSnap.docs.map((d) => deleteDoc(d.ref)));
        } catch {}
        try {
          const achSnap = await getDocs(collection(db, 'users', studentId, 'achievements'));
          await Promise.allSettled(achSnap.docs.map((d) => deleteDoc(d.ref)));
        } catch {}
        try {
          const dtSnap = await getDocs(collection(db, 'users', studentId, 'dailyTips'));
          await Promise.allSettled(dtSnap.docs.map((d) => deleteDoc(d.ref)));
        } catch {}

        // 2. Delete user and public profile
        await deleteDoc(doc(db, 'users', studentId));
        await deleteDoc(doc(db, 'publicProfiles', studentId));
      }

      // 3. Fallback: match by email in users collection if doc id differed
      if (normalizedEmail) {
        try {
          const eq = query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(5));
          const eqSnap = await getDocs(eq);
          for (const docS of eqSnap.docs) {
            const data = docS.data();
            if (docS.id !== studentId && !isUserAdmin(data.email, data.role)) {
              await deleteDoc(docS.ref);
              await deleteDoc(doc(db, 'publicProfiles', docS.id));
            }
          }
        } catch {}
      }

      // 4. Clean local storage for this student
      if (studentId) {
        localStorage.removeItem(PROGRESS_STORAGE_KEY + studentId);
        localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + studentId);
        localStorage.removeItem(POINTS_STORAGE_KEY + studentId);
      }
    } catch (err) {
      console.warn('Firestore deletion warning for student:', err);
    }

    return {
      success: true,
      message: 'Aluno eliminado com sucesso da plataforma.',
    };
  },

  /**
   * Delete multiple students in batch from Firestore
   */
  async adminDeleteStudents(studentIdsOrEmails: string[]): Promise<{ success: boolean; deletedCount: number; message: string }> {
    if (!studentIdsOrEmails || studentIdsOrEmails.length === 0) {
      return { success: true, deletedCount: 0, message: 'Nenhum aluno selecionado.' };
    }

    let deletedCount = 0;
    const targetSet = new Set(studentIdsOrEmails.map((s) => s.toLowerCase().trim()));

    try {
      const snap = await getDocs(query(collection(db, 'users'), limit(1000)));
      const deleteTasks: Promise<void>[] = [];

      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const email = (data.email || '').toLowerCase().trim();
        const id = docSnap.id;
        const role = data.role;

        if (!isUserAdmin(email, role) && (targetSet.has(id.toLowerCase()) || targetSet.has(email))) {
          deletedCount++;
          deleteTasks.push(
            (async () => {
              try {
                try {
                  const progSnap = await getDocs(collection(db, 'users', id, 'progress'));
                  await Promise.allSettled(progSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const achSnap = await getDocs(collection(db, 'users', id, 'achievements'));
                  await Promise.allSettled(achSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const ptsSnap = await getDocs(collection(db, 'users', id, 'pointsHistory'));
                  await Promise.allSettled(ptsSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const dtSnap = await getDocs(collection(db, 'users', id, 'dailyTips'));
                  await Promise.allSettled(dtSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}

                await deleteDoc(doc(db, 'users', id));
                await deleteDoc(doc(db, 'publicProfiles', id));

                localStorage.removeItem(PROGRESS_STORAGE_KEY + id);
                localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + id);
                localStorage.removeItem(POINTS_STORAGE_KEY + id);
              } catch (e) {
                console.warn(`Error deleting student ${id}:`, e);
              }
            })()
          );
        }
      }

      await Promise.allSettled(deleteTasks);
    } catch (err) {
      console.warn('Firestore batch deletion warning:', err);
    }

    return {
      success: true,
      deletedCount,
      message: `${deletedCount} aluno(s) eliminado(s) com sucesso.`,
    };
  },

  /**
   * Delete all students belonging to one or more specific classes (turmas)
   */
  async adminDeleteStudentsByTurmas(turmaNames: string[]): Promise<{ success: boolean; deletedCount: number; message: string }> {
    if (!turmaNames || turmaNames.length === 0) {
      return { success: true, deletedCount: 0, message: 'Nenhuma turma selecionada.' };
    }

    const turmasSet = new Set(turmaNames.map((t) => t.toLowerCase().trim()));
    let count = 0;

    try {
      const snap = await getDocs(query(collection(db, 'users'), limit(1000)));
      const deleteTasks: Promise<void>[] = [];

      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const email = (data.email || '').toLowerCase().trim();
        const turma = (data.turma || '').toLowerCase().trim();
        const id = docSnap.id;
        const role = data.role;

        if (!isUserAdmin(email, role) && turmasSet.has(turma)) {
          count++;
          deleteTasks.push(
            (async () => {
              try {
                try {
                  const progSnap = await getDocs(collection(db, 'users', id, 'progress'));
                  await Promise.allSettled(progSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const achSnap = await getDocs(collection(db, 'users', id, 'achievements'));
                  await Promise.allSettled(achSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const ptsSnap = await getDocs(collection(db, 'users', id, 'pointsHistory'));
                  await Promise.allSettled(ptsSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const dtSnap = await getDocs(collection(db, 'users', id, 'dailyTips'));
                  await Promise.allSettled(dtSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}

                await deleteDoc(doc(db, 'users', id));
                await deleteDoc(doc(db, 'publicProfiles', id));

                localStorage.removeItem(PROGRESS_STORAGE_KEY + id);
                localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + id);
                localStorage.removeItem(POINTS_STORAGE_KEY + id);
              } catch (e) {
                console.warn(`Error deleting student ${id} in turma ${turma}:`, e);
              }
            })()
          );
        }
      }

      await Promise.allSettled(deleteTasks);
    } catch (err) {
      console.warn('Firestore deletion by turma warning:', err);
    }

    return {
      success: true,
      deletedCount: count,
      message: `Alunos da(s) turma(s) ${turmaNames.join(', ')} eliminados com sucesso.`,
    };
  },

  /**
   * Delete ALL students in the entire platform (for school year reset)
   * GUARANTEES that Teacher/Admin accounts remain 100% untouched and safe.
   */
  async adminDeleteAllStudents(): Promise<{ success: boolean; deletedCount: number; message: string }> {
    let count = 0;

    try {
      // 1. Fetch all users from Firestore
      const snap = await getDocs(query(collection(db, 'users'), limit(1000)));
      const deletePromises: Promise<void>[] = [];

      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const email = (data.email || '').toLowerCase().trim();
        const role = data.role;
        const studentId = docSnap.id;

        if (!isUserAdmin(email, role)) {
          count++;
          deletePromises.push(
            (async () => {
              try {
                // Delete subcollections
                try {
                  const progSnap = await getDocs(collection(db, 'users', studentId, 'progress'));
                  await Promise.allSettled(progSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const achSnap = await getDocs(collection(db, 'users', studentId, 'achievements'));
                  await Promise.allSettled(achSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const ptsSnap = await getDocs(collection(db, 'users', studentId, 'pointsHistory'));
                  await Promise.allSettled(ptsSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}
                try {
                  const dtSnap = await getDocs(collection(db, 'users', studentId, 'dailyTips'));
                  await Promise.allSettled(dtSnap.docs.map((d) => deleteDoc(d.ref)));
                } catch {}

                // Delete primary doc and leaderboard profile
                await deleteDoc(doc(db, 'users', studentId));
                await deleteDoc(doc(db, 'publicProfiles', studentId));

                // Local storage cleanup
                localStorage.removeItem(PROGRESS_STORAGE_KEY + studentId);
                localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + studentId);
                localStorage.removeItem(POINTS_STORAGE_KEY + studentId);
              } catch (e) {
                console.warn(`Error deleting student ${studentId}:`, e);
              }
            })()
          );
        }
      }

      await Promise.allSettled(deletePromises);

      // 2. Also clean any remaining non-admin documents in publicProfiles
      try {
        const publicSnap = await getDocs(query(collection(db, 'publicProfiles'), limit(1000)));
        const publicDeletes: Promise<void>[] = [];
        for (const docSnap of publicSnap.docs) {
          const data = docSnap.data();
          if (data.role !== 'admin' && data.role !== 'teacher') {
            publicDeletes.push(deleteDoc(docSnap.ref).then(() => {}).catch(() => {}));
          }
        }
        await Promise.allSettled(publicDeletes);
      } catch (e) {
        console.warn('Error clearing publicProfiles:', e);
      }

      // 3. Clear all student progress/achievements keys in localStorage
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.startsWith(PROGRESS_STORAGE_KEY) ||
              key.startsWith(ACHIEVEMENTS_STORAGE_KEY) ||
              key.startsWith(POINTS_STORAGE_KEY))
          ) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch {}
    } catch (err) {
      console.warn('Firestore deleteAllStudents warning:', err);
    }

    return {
      success: true,
      deletedCount: count,
      message: 'Todos os alunos e pautas foram eliminados com sucesso. A conta de professora foi preservada.',
    };
  },

  /**
   * Create a new School Class (Turma)
   */
  async adminCreateTurma(turmaName: string): Promise<{ success: boolean; turmas: string[]; message: string }> {
    const trimmed = (turmaName || '').trim();
    if (!trimmed) {
      throw new Error('O nome da turma não pode estar vazio.');
    }
    if (trimmed.length > 20) {
      throw new Error('O nome da turma é demasiado longo (máx. 20 carateres).');
    }

    const updated = addTurma(trimmed);

    try {
      await setDoc(
        doc(db, 'config', 'school_turmas'),
        {
          list: updated,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      await setDoc(
        doc(db, 'config', 'turmas'),
        {
          list: updated,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not sync turmas to Firestore:', err);
    }

    return {
      success: true,
      turmas: updated,
      message: `Turma "${trimmed}" criada com sucesso!`,
    };
  },

  /**
   * Delete one or more School Classes (Turmas) and optionally their students
   */
  async adminDeleteTurmas(
    turmaNames: string[],
    deleteStudentsToo = false
  ): Promise<{ success: boolean; turmas: string[]; deletedStudentsCount: number; message: string }> {
    if (!turmaNames || turmaNames.length === 0) {
      throw new Error('Nenhuma turma selecionada para eliminar.');
    }

    let deletedStudentsCount = 0;
    if (deleteStudentsToo) {
      const res = await this.adminDeleteStudentsByTurmas(turmaNames);
      deletedStudentsCount = res.deletedCount;
    }

    const updated = removeTurmas(turmaNames);

    try {
      await setDoc(
        doc(db, 'config', 'school_turmas'),
        {
          list: updated,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      await setDoc(
        doc(db, 'config', 'turmas'),
        {
          list: updated,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not sync turmas to Firestore:', err);
    }

    return {
      success: true,
      turmas: updated,
      deletedStudentsCount,
      message: `Turma(s) ${turmaNames.join(', ')} eliminada(s) com sucesso.`,
    };
  },

  /**
   * Get current theme visibility map (Firestore + LocalStorage cache)
   */
  async getThemeVisibility(): Promise<ThemeVisibilityMap> {
    let currentMap: ThemeVisibilityMap = { ...DEFAULT_THEME_VISIBILITY };
    try {
      const local = localStorage.getItem(THEME_VISIBILITY_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (typeof parsed === 'object' && parsed !== null) {
          currentMap = { ...DEFAULT_THEME_VISIBILITY, ...parsed };
        }
      }
    } catch {
      // ignore
    }

    try {
      const snap = await getDoc(doc(db, 'config', 'theme_visibility'));
      if (snap.exists()) {
        const data = snap.data();
        if (data?.visibility && typeof data.visibility === 'object') {
          currentMap = { ...DEFAULT_THEME_VISIBILITY, ...data.visibility };
          localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(currentMap));
        }
      }
    } catch (err) {
      console.warn('Could not fetch theme_visibility from Firestore:', err);
    }

    return currentMap;
  },

  /**
   * Save theme visibility map (Admins/Teachers only)
   */
  async saveThemeVisibility(
    newVisibility: ThemeVisibilityMap
  ): Promise<{ success: boolean; visibility: ThemeVisibilityMap; message: string }> {
    const merged: ThemeVisibilityMap = { ...DEFAULT_THEME_VISIBILITY, ...newVisibility };

    try {
      localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('tic_theme_visibility_updated', { detail: merged }));
    } catch (e) {
      console.warn('Could not cache theme visibility in localStorage:', e);
    }

    try {
      await setDoc(
        doc(db, 'config', 'theme_visibility'),
        {
          visibility: merged,
          updatedAt: new Date().toISOString(),
          updatedBy: auth.currentUser?.email || 'admin',
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not sync theme_visibility to Firestore:', err);
    }

    return {
      success: true,
      visibility: merged,
      message: 'Visibilidade dos temas atualizada com sucesso!',
    };
  },

  /**
   * Toggle visibility of a single theme
   */
  async toggleThemeVisibility(
    themeId: string,
    forcedState?: boolean
  ): Promise<{ success: boolean; visibility: ThemeVisibilityMap }> {
    const current = await this.getThemeVisibility();
    const isCurrentlyVisible = current[themeId] !== false;
    const nextState = forcedState !== undefined ? forcedState : !isCurrentlyVisible;
    const updated: ThemeVisibilityMap = {
      ...current,
      [themeId]: nextState,
    };
    await this.saveThemeVisibility(updated);
    return { success: true, visibility: updated };
  },

  /**
   * Subscribe to real-time theme visibility changes from Firestore
   */
  onThemeVisibilityChange(callback: (visibility: ThemeVisibilityMap) => void): () => void {
    try {
      const local = localStorage.getItem(THEME_VISIBILITY_KEY);
      if (local) {
        callback({ ...DEFAULT_THEME_VISIBILITY, ...JSON.parse(local) });
      } else {
        callback({ ...DEFAULT_THEME_VISIBILITY });
      }
    } catch {
      callback({ ...DEFAULT_THEME_VISIBILITY });
    }

    const handleLocalUpdate = (e: any) => {
      if (e?.detail) {
        callback(e.detail);
      }
    };
    window.addEventListener('tic_theme_visibility_updated', handleLocalUpdate);

    let unsubscribeFirestore = () => {};
    try {
      unsubscribeFirestore = onSnapshot(
        doc(db, 'config', 'theme_visibility'),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data?.visibility) {
              const merged = { ...DEFAULT_THEME_VISIBILITY, ...data.visibility };
              try {
                localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(merged));
              } catch {}
              callback(merged);
            }
          }
        },
        (error) => {
          console.warn('Firestore theme_visibility snapshot notice:', error);
        }
      );
    } catch (err) {
      console.warn('Failed to attach theme_visibility snapshot listener:', err);
    }

    return () => {
      window.removeEventListener('tic_theme_visibility_updated', handleLocalUpdate);
      unsubscribeFirestore();
    };
  },

  /**
   * Get current quiz visibility map (Firestore + LocalStorage cache)
   */
  async getQuizVisibility(): Promise<QuizVisibilityMap> {
    let currentMap: QuizVisibilityMap = { ...DEFAULT_QUIZ_VISIBILITY };
    try {
      const local = localStorage.getItem(QUIZ_VISIBILITY_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (typeof parsed === 'object' && parsed !== null) {
          currentMap = { ...DEFAULT_QUIZ_VISIBILITY, ...parsed };
        }
      }
    } catch {
      // ignore
    }

    try {
      const snap = await getDoc(doc(db, 'config', 'quiz_visibility'));
      if (snap.exists()) {
        const data = snap.data();
        if (data?.visibility && typeof data.visibility === 'object') {
          currentMap = { ...DEFAULT_QUIZ_VISIBILITY, ...data.visibility };
          localStorage.setItem(QUIZ_VISIBILITY_KEY, JSON.stringify(currentMap));
        }
      }
    } catch (err) {
      console.warn('Could not fetch quiz_visibility from Firestore:', err);
    }

    return currentMap;
  },

  /**
   * Save quiz visibility map (Admins/Teachers only)
   */
  async saveQuizVisibility(
    newVisibility: QuizVisibilityMap
  ): Promise<{ success: boolean; visibility: QuizVisibilityMap; message: string }> {
    const merged: QuizVisibilityMap = { ...DEFAULT_QUIZ_VISIBILITY, ...newVisibility };

    try {
      localStorage.setItem(QUIZ_VISIBILITY_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('tic_quiz_visibility_updated', { detail: merged }));
    } catch (e) {
      console.warn('Could not cache quiz visibility in localStorage:', e);
    }

    try {
      await setDoc(
        doc(db, 'config', 'quiz_visibility'),
        {
          visibility: merged,
          updatedAt: new Date().toISOString(),
          updatedBy: auth.currentUser?.email || 'admin',
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not sync quiz_visibility to Firestore:', err);
    }

    return {
      success: true,
      visibility: merged,
      message: 'Visibilidade dos quizzes atualizada com sucesso!',
    };
  },

  /**
   * Toggle quiz visibility for a single theme
   */
  async toggleQuizVisibility(
    themeId: string,
    forcedState?: boolean
  ): Promise<{ success: boolean; visibility: QuizVisibilityMap }> {
    const current = await this.getQuizVisibility();
    const isCurrentlyVisible = current[themeId] === true;
    const nextState = forcedState !== undefined ? forcedState : !isCurrentlyVisible;
    const updated: QuizVisibilityMap = {
      ...current,
      [themeId]: nextState,
    };
    await this.saveQuizVisibility(updated);
    return { success: true, visibility: updated };
  },

  /**
   * Subscribe to real-time quiz visibility changes from Firestore
   */
  onQuizVisibilityChange(callback: (visibility: QuizVisibilityMap) => void): () => void {
    try {
      const local = localStorage.getItem(QUIZ_VISIBILITY_KEY);
      if (local) {
        callback({ ...DEFAULT_QUIZ_VISIBILITY, ...JSON.parse(local) });
      } else {
        callback({ ...DEFAULT_QUIZ_VISIBILITY });
      }
    } catch {
      callback({ ...DEFAULT_QUIZ_VISIBILITY });
    }

    const handleLocalUpdate = (e: any) => {
      if (e?.detail) {
        callback(e.detail);
      }
    };
    window.addEventListener('tic_quiz_visibility_updated', handleLocalUpdate);

    let unsubscribeFirestore = () => {};
    try {
      unsubscribeFirestore = onSnapshot(
        doc(db, 'config', 'quiz_visibility'),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data?.visibility) {
              const merged = { ...DEFAULT_QUIZ_VISIBILITY, ...data.visibility };
              try {
                localStorage.setItem(QUIZ_VISIBILITY_KEY, JSON.stringify(merged));
              } catch {}
              callback(merged);
            }
          }
        },
        (error) => {
          console.warn('Firestore quiz_visibility snapshot notice:', error);
        }
      );
    } catch (err) {
      console.warn('Failed to attach quiz_visibility snapshot listener:', err);
    }

    return () => {
      window.removeEventListener('tic_quiz_visibility_updated', handleLocalUpdate);
      unsubscribeFirestore();
    };
  },
};
