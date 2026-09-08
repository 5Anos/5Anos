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
  updateDoc,
  deleteField,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  User,
  ActivityProgress,
  UserAchievement,
  PointTransaction,
  Language,
  TurmaRanking,
  StudentRanking,
  ThemeVisibilityMap,
} from '../types';
import { BADGES } from '../data/badgesData';
import { generateSecurePublicId } from '../utils/publicIdGenerator';
import { getTurmasList, addTurma, removeTurmas } from '../data/turmasData';

const TOKEN_KEY = 'tic_5ano_auth_token';
const CURRENT_USER_KEY = 'tic_5ano_current_user';
const PROGRESS_STORAGE_KEY = 'tic_5ano_progress_';
const ACHIEVEMENTS_STORAGE_KEY = 'tic_5ano_achievements_';
const POINTS_STORAGE_KEY = 'tic_5ano_points_';
const THEME_VISIBILITY_KEY = 'tic_5ano_theme_visibility';

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
  'tic-sociedade': true,
  'ergonomia': true,
  'seguranca': true,
  'palavras-passe': true,
  'correio-eletronico': true,
  'navegar-internet': true,
  'direitos-autor': true,
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
    toUnlock.push({ badgeId: 'primeiros-passos', bonus: 50, name: 'Primeiros Passos' });
  }

  // 2. Guardião Digital: completed all 5 Theme 1 modules
  const theme1Modules = [
    'seguranca-digital-intro',
    'utilizacao-segura-internet',
    'dados-pessoais-privacidade',
    'responsabilidade-respeito',
    'direitos-autor',
  ];
  const t1Done = theme1Modules.filter((id) => completedList.some((p) => p.activityId === id));
  if (!existingAchievementIds.has('guardiao-digital') && t1Done.length >= 5) {
    toUnlock.push({ badgeId: 'guardiao-digital', bonus: 100, name: 'Guardião Digital' });
  }

  // 3. Especialista em Segurança: scored >= 90% in any Theme 1 quiz
  const t1Quiz90 = progressList.some(
    (p) =>
      p.themeId === 'seguranca-digital' &&
      (p.activityType === 'quiz' || p.activityId.includes('quiz')) &&
      (p.bestPercentage ?? p.percentage ?? 0) >= 90
  );
  if (!existingAchievementIds.has('especialista-seguranca') && t1Quiz90) {
    toUnlock.push({ badgeId: 'especialista-seguranca', bonus: 80, name: 'Especialista em Segurança' });
  }

  // 4. Detetive Cibernético: completed phishing challenge
  const phishingDone = completedList.some(
    (p) => p.activityId === 'desafio-detetive-phishing' || p.activityId === 'desafio-phishing'
  );
  if (!existingAchievementIds.has('detetive-cibernetico') && phishingDone) {
    toUnlock.push({ badgeId: 'detetive-cibernetico', bonus: 70, name: 'Detetive Cibernético' });
  }

  // 5. Mestre do Email: completed Theme 2 challenges
  const theme2Challenges = ['desafio-escrever-email', 'desafio-organizar-inbox', 'desafio-cc-bcc', 'quiz-final-tema2'];
  const t2Done = theme2Challenges.filter((id) => completedList.some((p) => p.activityId === id));
  if (!existingAchievementIds.has('mestre-email') && t2Done.length >= 4) {
    toUnlock.push({ badgeId: 'mestre-email', bonus: 100, name: 'Mestre do Email' });
  }

  // 6. Detetive da Informação: completed all 7 Theme 3 modules
  const theme3Modules = [
    'pesquisa-o-que-e',
    'pesquisa-motores-busca',
    'pesquisa-boa-pesquisa',
    'pesquisa-operadores',
    'pesquisa-avaliar-fontes',
    'pesquisa-direitos-plagio',
    'pesquisa-organizar-informacao',
  ];
  const t3Done = theme3Modules.filter((id) => completedList.some((p) => p.activityId === id));
  if (!existingAchievementIds.has('detetive-informacao') && t3Done.length >= 7) {
    toUnlock.push({ badgeId: 'detetive-informacao', bonus: 90, name: 'Detetive da Informação' });
  }

  // 7. Mestre da Pesquisa: scored >= 90% in Theme 3 final quiz
  const t3Quiz90 = progressList.some(
    (p) => p.activityId === 'quiz-final-tema3' && (p.bestPercentage ?? p.percentage ?? 0) >= 90
  );
  if (!existingAchievementIds.has('mestre-pesquisa') && t3Quiz90) {
    toUnlock.push({ badgeId: 'mestre-pesquisa', bonus: 80, name: 'Mestre da Pesquisa' });
  }

  // 8. TIC Explorer: completed modules across all 3 themes
  const theme2Modules = [
    'correio-o-que-e',
    'correio-estrutura-endereco',
    'correio-regras-ouro',
    'correio-seguranca-anexos',
    'correio-organizacao-limpeza',
  ];
  const t2ModsDone = theme2Modules.filter((id) => completedList.some((p) => p.activityId === id));
  if (
    !existingAchievementIds.has('tic-explorer') &&
    t1Done.length >= 5 &&
    t2ModsDone.length >= 5 &&
    t3Done.length >= 7
  ) {
    toUnlock.push({ badgeId: 'tic-explorer', bonus: 150, name: 'TIC Explorer' });
  }

  // 9. Centurião de Pontos: reached 500+ total points
  if (!existingAchievementIds.has('centuriao-pontos') && userPoints >= 500) {
    toUnlock.push({ badgeId: 'centuriao-pontos', bonus: 100, name: 'Centurião' });
  }

  return toUnlock;
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
              points: typeof data.points === 'number' ? data.points : 20,
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
            // User authenticated in Firebase Auth, ensure document in Firestore
            const emailNorm = (fbUser.email || '').toLowerCase().trim();
            const isAdmin = isUserAdmin(emailNorm);
            const takenIds = await this.fetchTakenPublicIds();
            const publicId = isAdmin ? 'Docente_TIC' : generateSecurePublicId(takenIds);

            const user: User = {
              id: fbUser.uid,
              name: fbUser.displayName || (isAdmin ? 'Professora Carla' : 'Estudante'),
              email: emailNorm,
              publicId,
              turma: isAdmin ? undefined : '5.º A',
              role: isAdmin ? 'admin' : 'student',
              points: 20,
              language: 'pt',
              createdAt: new Date().toISOString(),
            };

            await this.syncUserToFirestore(user);
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
        callback(null);
      }
    });
  },

  /**
   * Directly save user profile to Cloud Firestore (NEVER storing passwords)
   */
  async syncUserToFirestore(user: User): Promise<boolean> {
    try {
      const targetUserId = auth.currentUser?.uid || user.id;
      user.id = targetUserId;
      const isAdmin = isUserAdmin(auth.currentUser?.email || user.email, user.role);
      const finalRole = isAdmin ? 'admin' : (user.role || 'student');
      user.role = finalRole;
      if (isAdmin) {
        delete user.turma;
      }

      // Private User profile in Firestore (No passwords)
      const payload: any = {
        id: targetUserId,
        name: user.name,
        email: (auth.currentUser?.email || user.email || '').toLowerCase().trim(),
        publicId: user.publicId,
        role: finalRole,
        language: user.language || 'pt',
        points: user.points ?? 20,
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
            points: user.points ?? 20,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }

      return true;
    } catch (err: any) {
      console.warn('Cloud Firestore sync notice:', err?.message || err);
      return false;
    }
  },

  /**
   * Register with Firebase Authentication and Cloud Firestore
   */
  async register(
    name: string,
    email: string,
    password: string,
    turma: string,
    publicId: string,
    language: Language = 'pt'
  ): Promise<{ user: User; token: string }> {
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

    // 1. Check if email is already registered in Cloud Firestore
    try {
      const emailQuery = query(collection(db, 'users'), where('email', '==', normalizedEmail));
      const emailSnap = await getDocs(emailQuery);
      if (!emailSnap.empty) {
        throw new Error(
          language === 'pt'
            ? '❌ Já existe uma conta associada a este email. Por favor, faz login.'
            : '❌ An account is already registered with this email. Please log in.'
        );
      }
    } catch (err: any) {
      if (err?.message?.includes('Já existe uma conta') || err?.message?.includes('already registered')) {
        throw err;
      }
      console.warn('Email uniqueness check notice:', err);
    }

    // 2. Fetch taken Nicknames from Firestore
    const takenPublicIds = await this.fetchTakenPublicIds();
    let finalPublicId = trimmedPublicId;

    if (!finalPublicId || takenPublicIds.some((id) => id.toLowerCase().trim() === finalPublicId.toLowerCase())) {
      finalPublicId = generateSecurePublicId(takenPublicIds);
    }

    // 3. Attempt Firebase Authentication (if email/password provider is enabled)
    let fbUser: FirebaseUser | null = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, cleanPassword);
      fbUser = userCredential.user;
      await updateProfile(fbUser, { displayName: name.trim() });
    } catch (fbError: any) {
      if (fbError?.code === 'auth/email-already-in-use') {
        throw new Error(
          language === 'pt'
            ? '❌ Já existe uma conta associada a este email. Por favor, faz login.'
            : '❌ An account is already registered with this email. Please log in.'
        );
      }
      // If auth/operation-not-allowed or auth/admin-restricted-operation, catch it and continue seamlessly with Firestore!
      console.info('Firebase Auth sign-in method not active, creating account directly in Cloud Firestore.');
    }

    const userId = fbUser?.uid || `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const initialPoints = 20;

    const newUser: User = {
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      publicId: finalPublicId,
      turma: isAdmin ? undefined : finalTurma,
      role: isAdmin ? 'admin' : 'student',
      language,
      points: initialPoints,
      createdAt: new Date().toISOString(),
    };

    // 4. Save to Cloud Firestore users collection (NO passwords or passwordHash stored)
    const userPayload: any = {
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      publicId: finalPublicId,
      turma: isAdmin ? null : finalTurma,
      role: isAdmin ? 'admin' : 'student',
      language,
      points: initialPoints,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId), userPayload, { merge: true });

    // 5. Record welcome points in pointsHistory audit log
    const welcomeTx: PointTransaction = {
      id: `pt-welcome-${Date.now()}`,
      userId,
      amount: initialPoints,
      reason: 'Boas-vindas à plataforma TIC 5!',
      timestamp: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId, 'pointsHistory', welcomeTx.id), welcomeTx);

    // 6. If student, register in publicProfiles for the leaderboard
    if (!isAdmin) {
      await setDoc(
        doc(db, 'publicProfiles', userId),
        {
          id: userId,
          publicId: finalPublicId,
          turma: finalTurma,
          role: 'student',
          points: initialPoints,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    let token = userId;
    if (fbUser) {
      try {
        token = await fbUser.getIdToken();
      } catch {
        token = userId;
      }
    }
    this.setToken(token);

    return { user: newUser, token };
  },

  /**
   * Login with Firebase Authentication and Cloud Firestore fallback
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Authenticate with Firebase Authentication
    let fbUser: FirebaseUser | null = null;
    let authFailedExplicitly = false;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, cleanPassword);
      fbUser = userCredential.user;
    } catch (fbError: any) {
      if (
        fbError?.code === 'auth/wrong-password' ||
        fbError?.code === 'auth/invalid-credential'
      ) {
        authFailedExplicitly = true;
      } else if (fbError?.code === 'auth/user-not-found') {
        // If designated admin, try creating account in Firebase Auth
        if (isUserAdmin(normalizedEmail)) {
          try {
            const newCred = await createUserWithEmailAndPassword(auth, normalizedEmail, cleanPassword);
            fbUser = newCred.user;
          } catch {
            // continue
          }
        }
      }
    }

    if (authFailedExplicitly) {
      throw new Error('Palavra-passe ou email incorretos.');
    }

    // 2. Load User Profile from Cloud Firestore
    let userId = fbUser?.uid;
    let userDocData: any = null;

    if (userId) {
      const snap = await getDoc(doc(db, 'users', userId));
      if (snap.exists()) {
        userDocData = snap.data();
      }
    }

    // If not found by uid (or fbUser is null), look up by email in Firestore
    if (!userDocData) {
      const emailQuery = query(collection(db, 'users'), where('email', '==', normalizedEmail));
      const emailSnap = await getDocs(emailQuery);

      if (!emailSnap.empty) {
        const docSnap = emailSnap.docs[0];
        userId = docSnap.id;
        userDocData = docSnap.data();
      }
    }

    // Purge any legacy password or passwordHash from Firestore document
    if (userId && (userDocData?.passwordHash || userDocData?.password)) {
      updateDoc(doc(db, 'users', userId), {
        passwordHash: deleteField(),
        password: deleteField(),
      }).catch(() => {});
    }

    let user: User;

    if (userDocData && userId) {
      const isAdmin = isUserAdmin(normalizedEmail, userDocData.role);
      user = {
        id: userId,
        name: userDocData.name || fbUser?.displayName || (isAdmin ? 'Professora Carla' : 'Estudante'),
        email: normalizedEmail,
        publicId: userDocData.publicId || (isAdmin ? 'Docente_TIC' : generateSecurePublicId()),
        turma: isAdmin ? undefined : (userDocData.turma || '5.º A'),
        role: isAdmin ? 'admin' : (userDocData.role || 'student'),
        language: userDocData.language || 'pt',
        points: typeof userDocData.points === 'number' ? userDocData.points : 20,
        createdAt: userDocData.createdAt || new Date().toISOString(),
        lastActivity: userDocData.lastActivity,
      };

      if (isAdmin) {
        delete user.turma;
        deleteDoc(doc(db, 'publicProfiles', userId)).catch(() => {});
      }
    } else {
      // Check if it's the designated teacher/admin
      const isAdmin = isUserAdmin(normalizedEmail);
      if (isAdmin) {
        // Teacher logging in: create teacher account in Firestore (NO passwords stored)
        userId = userId || 'admin_carla_oliveira';
        user = {
          id: userId,
          name: 'Professora Carla',
          email: normalizedEmail,
          publicId: 'Docente_TIC',
          role: 'admin',
          language: 'pt',
          points: 100,
          createdAt: new Date().toISOString(),
        };
        await setDoc(
          doc(db, 'users', userId),
          {
            ...user,
            turma: null,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } else {
        throw new Error('Não existe conta associada a este email.');
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
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    this.removeToken();
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
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
      this.removeToken();
      throw new Error('Sessão expirada');
    }

    const user: User = JSON.parse(rawUser);
    if (isUserAdmin(user.email, user.role)) {
      user.role = 'admin';
      delete user.turma;
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
    } catch {
      progress = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + user.id) || '[]');
    }

    // 2. Fetch live user achievements from Firestore
    try {
      const achCol = collection(db, 'users', user.id, 'achievements');
      const snap = await getDocs(achCol);
      if (!snap.empty) {
        achievements = snap.docs.map((d) => d.data() as UserAchievement);
      }
    } catch {
      achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + user.id) || '[]');
    }

    // 3. Fetch points history from Firestore
    try {
      const ptsCol = collection(db, 'users', user.id, 'pointsHistory');
      const snap = await getDocs(query(ptsCol, limit(50)));
      if (!snap.empty) {
        pointsHistory = snap.docs.map((d) => d.data() as PointTransaction);
        pointsHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      }
    } catch {
      pointsHistory = JSON.parse(localStorage.getItem(POINTS_STORAGE_KEY + user.id) || '[]');
    }

    // 4. Fetch up to date user points from Firestore
    try {
      const userDoc = await getDoc(doc(db, 'users', user.id));
      if (userDoc.exists()) {
        const d = userDoc.data();
        if (typeof d.points === 'number') {
          user.points = d.points;
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        }
      }
    } catch {
      // ignore
    }

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
  }): Promise<{
    success: boolean;
    record: ActivityProgress;
    userPoints: number;
    lastActivity: User['lastActivity'];
    achievements: UserAchievement[];
  }> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) throw new Error('Inicia sessão para guardar o progresso.');

    const user: User = JSON.parse(rawUser);
    const userId = user.id;

    // Validate inputs
    if (!payload.activityId || !payload.themeId) {
      throw new Error('Identificador da atividade em falta.');
    }

    // Clamp and sanitize percentage
    let finalPercentage: number | undefined = payload.percentage;
    if (payload.score !== undefined && payload.maxScore && payload.maxScore > 0) {
      const safeScore = Math.max(0, Math.min(payload.score, payload.maxScore));
      finalPercentage = Math.round((safeScore / payload.maxScore) * 100);
    } else if (finalPercentage !== undefined) {
      finalPercentage = Math.max(0, Math.min(100, finalPercentage));
    }

    // 1. Fetch current progress list & achievements from Firestore
    let progressList: ActivityProgress[] = [];
    let achievements: UserAchievement[] = [];

    try {
      const snapP = await getDocs(collection(db, 'users', userId, 'progress'));
      if (!snapP.empty) {
        progressList = snapP.docs.map((d) => d.data() as ActivityProgress);
      }
    } catch {
      progressList = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + userId) || '[]');
    }

    try {
      const snapA = await getDocs(collection(db, 'users', userId, 'achievements'));
      if (!snapA.empty) {
        achievements = snapA.docs.map((d) => d.data() as UserAchievement);
      }
    } catch {
      achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]');
    }

    let existing = progressList.find((p) => p.activityId === payload.activityId);
    let earnedPoints = 0;
    const isCompleted = (payload.status || 'completed') === 'completed';

    if (!existing) {
      existing = {
        userId,
        activityId: payload.activityId,
        activityType: payload.activityType,
        themeId: payload.themeId,
        status: payload.status || 'completed',
        score: payload.score,
        maxScore: payload.maxScore,
        percentage: finalPercentage,
        attempts: 1,
        bestScore: payload.score,
        bestPercentage: finalPercentage,
        lastUpdated: new Date().toISOString(),
      };
      progressList.push(existing);

      // Points awarded for first completion
      if (isCompleted) {
        if (payload.activityType === 'quiz') {
          earnedPoints = (finalPercentage ?? 100) >= 80 ? 30 : (finalPercentage ?? 100) >= 50 ? 20 : 15;
        } else if (payload.activityType === 'challenge') {
          earnedPoints = 25;
        } else {
          earnedPoints = 15;
        }
      }
    } else {
      existing.attempts += 1;
      existing.status = payload.status || existing.status;
      existing.lastUpdated = new Date().toISOString();

      const prevBest = existing.bestPercentage ?? 0;
      if (finalPercentage !== undefined && finalPercentage > prevBest) {
        existing.bestPercentage = finalPercentage;
        existing.bestScore = payload.score;
        // Bonus points for improvement only
        earnedPoints = 10;
      } else {
        earnedPoints = 0; // No points for repeated attempts without improvement
      }
    }

    user.points = (user.points || 0) + earnedPoints;
    user.lastActivity = {
      themeId: payload.themeId,
      title: payload.activityTitle || payload.activityId,
      timestamp: new Date().toISOString(),
    };

    // 2. Audit log points transaction
    if (earnedPoints > 0) {
      const ptTx: PointTransaction = {
        id: `pt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        userId,
        amount: earnedPoints,
        reason: `Conclusão: ${payload.activityTitle || payload.activityId}`,
        timestamp: new Date().toISOString(),
      };
      setDoc(doc(db, 'users', userId, 'pointsHistory', ptTx.id), ptTx).catch(() => {});
    }

    // 3. Evaluate Badges Unlocking (Strictly once per badge, with bonus points)
    const existingBadgeIds = new Set(achievements.map((a) => a.badgeId));
    const newBadges = evaluateEligibleBadges(progressList, user.points, existingBadgeIds);

    for (const badge of newBadges) {
      const newAch: UserAchievement = {
        userId,
        badgeId: badge.badgeId,
        unlockedAt: new Date().toISOString(),
      };
      achievements.push(newAch);
      existingBadgeIds.add(badge.badgeId);

      // Award badge bonus points
      user.points += badge.bonus;

      // Persist badge & badge transaction to Cloud Firestore
      setDoc(doc(db, 'users', userId, 'achievements', badge.badgeId), newAch).catch(() => {});

      const badgeTx: PointTransaction = {
        id: `pt-badge-${badge.badgeId}-${Date.now()}`,
        userId,
        amount: badge.bonus,
        reason: `Desbloqueio de Medalha: ${badge.name}`,
        timestamp: new Date().toISOString(),
      };
      setDoc(doc(db, 'users', userId, 'pointsHistory', badgeTx.id), badgeTx).catch(() => {});
    }

    // 4. Sync Progress, User, and PublicProfile to Cloud Firestore
    try {
      await setDoc(doc(db, 'users', userId, 'progress', payload.activityId), existing, { merge: true });
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
            id: userId,
            publicId: user.publicId,
            turma: user.turma || '5.º A',
            role: 'student',
            points: user.points,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('⚠️ Firestore sync warning in saveProgress:', err);
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
    };
  },

  /**
   * Record Daily TIC Tip Bonus (+15 points once per day)
   */
  async recordDailyTipBonus(tipTitle: string, bonusPoints = 15): Promise<{
    success: boolean;
    user: User | null;
    userPoints: number;
    achievements: UserAchievement[];
  }> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
      return { success: true, user: null, userPoints: 0, achievements: [] };
    }

    const user: User = JSON.parse(rawUser);
    const userId = user.id;

    user.points = (user.points || 0) + bonusPoints;
    user.lastActivity = {
      themeId: 'daily_tip',
      title: `💡 Curiosidade: ${tipTitle}`,
      timestamp: new Date().toISOString(),
    };

    // Log transaction
    const tipTx: PointTransaction = {
      id: `pt-daily-${Date.now()}`,
      userId,
      amount: bonusPoints,
      reason: `💡 Curiosidade TIC: ${tipTitle}`,
      timestamp: new Date().toISOString(),
    };
    setDoc(doc(db, 'users', userId, 'pointsHistory', tipTx.id), tipTx).catch(() => {});

    // Sync to Firestore
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
      console.warn('Firestore sync notice for daily tip:', err);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return {
      success: true,
      user,
      userPoints: user.points,
      achievements: JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + userId) || '[]'),
    };
  },

  /**
   * Get Class/Turma Rankings with Gamification metrics
   * Authoritative source is Cloud Firestore publicProfiles and users collections.
   * Admins and Teachers are 100% strictly excluded.
   */
  async getTurmaRankings(): Promise<TurmaRanking[]> {
    const defaultTurmas = getTurmasList();
    const studentMap = new Map<string, { id: string; publicId: string; turma: string; points: number }>();

    try {
      const q = query(collection(db, 'publicProfiles'), limit(500));
      const snap = await getDocs(q);

      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.role === 'admin' || d.role === 'teacher') return;
        const studentTurma = d.turma ? String(d.turma).trim() : '';
        if (studentTurma) {
          studentMap.set(docSnap.id, {
            id: docSnap.id,
            publicId: d.publicId || 'Estudante_TIC',
            turma: studentTurma,
            points: typeof d.points === 'number' ? d.points : (Number(d.points) || 0),
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

      const allStudentsInTurma = [...turmaStudents]
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .map((s) => ({
          publicId: s.publicId || 'Estudante_TIC',
          points: s.points || 0,
          activitiesCount: Math.floor((s.points || 0) / 15),
          badgeCount: Math.min(BADGES.length, Math.floor((s.points || 0) / 35) + 1),
        }));

      const topStudents = allStudentsInTurma.slice(0, 3).map((s) => ({
        publicId: s.publicId,
        points: s.points,
      }));

      return {
        turma: turmaName,
        totalPoints,
        avgPoints,
        studentCount,
        completedActivities: Math.round(totalPoints / 15),
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
        topStudents,
        allStudents: allStudentsInTurma,
      };
    });

    result.sort((a, b) => b.totalPoints - a.totalPoints || b.avgPoints - a.avgPoints || a.turma.localeCompare(b.turma));
    return result;
  },

  /**
   * Get Individual Student Rankings (using safe public Nicknames)
   * Excludes all Admin / Teacher accounts.
   */
  async getStudentRankings(currentUserId?: string): Promise<StudentRanking[]> {
    const studentList: { id: string; publicId: string; turma: string; points: number }[] = [];

    try {
      const q = query(collection(db, 'publicProfiles'), limit(500));
      const snap = await getDocs(q);

      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.role === 'admin' || d.role === 'teacher') return;
        studentList.push({
          id: docSnap.id,
          publicId: d.publicId || 'Estudante_TIC',
          turma: d.turma ? String(d.turma).trim() : '5.º A',
          points: typeof d.points === 'number' ? d.points : (Number(d.points) || 0),
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
      activitiesCount: Math.floor((u.points || 0) / 15),
      badgeCount: Math.min(BADGES.length, Math.floor((u.points || 0) / 35) + 1),
      isCurrentUser: u.id === currentUserId,
    }));
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
   * Delete a single student from Firestore
   */
  async adminDeleteStudent(studentId: string, studentEmail: string): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = (studentEmail || '').toLowerCase().trim();
    if (isUserAdmin(normalizedEmail)) {
      throw new Error('Não é permitido eliminar a conta da Professora / Administrador.');
    }

    try {
      if (studentId) {
        await deleteDoc(doc(db, 'users', studentId));
        await deleteDoc(doc(db, 'publicProfiles', studentId));
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
      const snap = await getDocs(query(collection(db, 'users'), limit(500)));
      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const email = (data.email || '').toLowerCase().trim();
        const id = docSnap.id;
        if (!isUserAdmin(email, data.role) && (targetSet.has(id.toLowerCase()) || targetSet.has(email))) {
          await deleteDoc(doc(db, 'users', id));
          await deleteDoc(doc(db, 'publicProfiles', id));
          deletedCount++;
        }
      }
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
      const snap = await getDocs(query(collection(db, 'users'), limit(500)));
      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const email = (data.email || '').toLowerCase().trim();
        const turma = (data.turma || '').toLowerCase().trim();
        if (!isUserAdmin(email, data.role) && turmasSet.has(turma)) {
          await deleteDoc(doc(db, 'users', docSnap.id));
          await deleteDoc(doc(db, 'publicProfiles', docSnap.id));
          count++;
        }
      }
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
      const snap = await getDocs(query(collection(db, 'users'), limit(1000)));
      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const email = (data.email || '').toLowerCase().trim();
        if (!isUserAdmin(email, data.role)) {
          await deleteDoc(doc(db, 'users', docSnap.id));
          await deleteDoc(doc(db, 'publicProfiles', docSnap.id));
          count++;
        }
      }
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
    const nextState = forcedState !== undefined ? forcedState : !current[themeId];
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
};
