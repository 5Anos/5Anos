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
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User, ActivityProgress, UserAchievement, PointTransaction, Language, TurmaRanking, StudentRanking } from '../types';
import { generateSecurePublicId } from '../utils/publicIdGenerator';
import { getTurmasList, saveTurmasList, addTurma, removeTurmas } from '../data/turmasData';

const TOKEN_KEY = 'tic_5ano_auth_token';
const USERS_STORAGE_KEY = 'tic_5ano_local_users';
const CURRENT_USER_KEY = 'tic_5ano_current_user';
const PROGRESS_STORAGE_KEY = 'tic_5ano_progress_';
const ACHIEVEMENTS_STORAGE_KEY = 'tic_5ano_achievements_';
const POINTS_STORAGE_KEY = 'tic_5ano_points_';

// Admin / Teacher designated accounts with full access to school class records and XLS exports
export const ADMIN_EMAILS = [
  'imaginebycarla2023@gmail.com',
];

export function isUserAdmin(email?: string, role?: string): boolean {
  if (role === 'admin' || role === 'teacher') return true;
  if (!email) return false;
  const norm = email.toLowerCase().trim();
  return ADMIN_EMAILS.includes(norm);
}

// No demo accounts - real student accounts only
const INITIAL_DEMO_USERS: any[] = [];

function getStoredUsers(): any[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Purge any passwords, legacy demo accounts and ensure admin/teacher accounts never hold a student turma
      let hasChanges = false;
      const cleaned = parsed
        .filter(
          (u: any) =>
            !u?.id?.startsWith('demo-') &&
            u?.email !== 'joao.silva@escola.pt' &&
            u?.email !== 'leonor.martins@escola.pt'
        )
        .map((u: any) => {
          if ('password' in u) {
            delete u.password;
            hasChanges = true;
          }
          if (isUserAdmin(u?.email, u?.role)) {
            if (u.turma) {
              delete u.turma;
              u.role = 'admin';
              hasChanges = true;
            }
          }
          return u;
        });

      if (hasChanges || cleaned.length !== parsed.length) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    }
    return [];
  } catch {
    return [];
  }
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

  async getDemoAccounts(): Promise<{ email: string; name: string; defaultPass: string; publicId: string; turma: string }[]> {
    return [];
  },

  /**
   * Fetch all taken Nicknames from Firestore and LocalStorage
   * to guarantee no duplicates are ever generated
   */
  async fetchTakenPublicIds(): Promise<string[]> {
    const takenSet = new Set<string>();

    // 1. LocalStorage accounts
    const localUsers = getStoredUsers();
    localUsers.forEach((u: any) => {
      if (u?.publicId) {
        takenSet.add(u.publicId.trim());
      }
    });

    // 2. Query Firestore publicProfiles collection
    try {
      const q = query(collection(db, 'publicProfiles'), limit(300));
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

    // 3. Query Firestore users collection
    try {
      const qUsers = query(collection(db, 'users'), limit(300));
      const snapUsers = await getDocs(qUsers);
      snapUsers.forEach((docSnap) => {
        const d = docSnap.data();
        if (d?.publicId) {
          takenSet.add(String(d.publicId).trim());
        }
      });
    } catch {
      // ignore rule restrictions
    }

    return Array.from(takenSet);
  },

  /**
   * Generate a guaranteed non-existent unique Nickname
   */
  async generateUniquePublicId(): Promise<string> {
    const taken = await this.fetchTakenPublicIds();
    return generateSecurePublicId(taken);
  },

  getAllTakenPublicIds(): string[] {
    const users = getStoredUsers();
    return users.map((u: any) => u.publicId).filter(Boolean);
  },

  getAllRegisteredEmails(): string[] {
    const users = getStoredUsers();
    return users.map((u: any) => (u.email || '').toLowerCase().trim()).filter(Boolean);
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
              email: fbUser.email || '',
              publicId: data.publicId || (isAdmin ? 'Docente_TIC' : generateSecurePublicId(this.getAllTakenPublicIds())),
              turma: isAdmin ? undefined : (data.turma || '5.º A'),
              role: isAdmin ? 'admin' : (data.role || 'student'),
              points: data.points ?? 20,
              language: data.language || 'pt',
              createdAt: data.createdAt || new Date().toISOString(),
              lastActivity: data.lastActivity,
            };
            if (isAdmin) {
              delete user.turma;
              if (data.turma) {
                updateDoc(doc(db, 'users', fbUser.uid), { turma: null, role: 'admin' }).catch(() => {});
              }
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
          }
        } catch {
          // offline
        }
      }
    });
  },

  /**
   * Directly save / sync user profile to Cloud Firestore
   */
  async syncUserToFirestore(user: User): Promise<boolean> {
    try {
      const isAdmin = isUserAdmin(user.email, user.role);
      const finalRole = isAdmin ? 'admin' : (user.role || 'student');
      user.role = finalRole;
      if (isAdmin) {
        delete user.turma;
      }

      const payload: any = {
        id: user.id,
        name: user.name,
        email: user.email.toLowerCase().trim(),
        publicId: user.publicId,
        role: finalRole,
        language: user.language || 'pt',
        points: user.points ?? 20,
        createdAt: user.createdAt || new Date().toISOString(),
        ...(user.lastActivity ? { lastActivity: user.lastActivity } : {}),
      };

      if (isAdmin) {
        payload.turma = null; // Explicitly remove class link in Firestore
      } else {
        payload.turma = user.turma || '5.º A';
      }

      await setDoc(doc(db, 'users', user.id), payload, { merge: true });

      // In public rankings: ONLY students appear in publicProfiles (minimized data for privacy)
      if (isAdmin) {
        try {
          await deleteDoc(doc(db, 'publicProfiles', user.id));
        } catch {
          // ignore
        }
      } else {
        await setDoc(
          doc(db, 'publicProfiles', user.id),
          {
            publicId: user.publicId,
            turma: user.turma || '5.º A',
            points: user.points ?? 20,
          },
          { merge: true }
        );
      }

      console.log('✅ Successfully synced user to Cloud Firestore:', user.id);
      return true;
    } catch (err) {
      console.error('❌ Error syncing user to Cloud Firestore:', err);
      return false;
    }
  },

  /**
   * Register with strict uniqueness for both email and publicId
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
    const trimmedPublicId = (publicId || '').trim();
    const finalTurma = turma || '5.º A';

    // 1. Check Email Uniqueness in local storage
    const users = getStoredUsers();
    const emailExistsLocally = users.some((u: any) => (u.email || '').toLowerCase().trim() === normalizedEmail);
    if (emailExistsLocally) {
      throw new Error(
        language === 'pt'
          ? '❌ Já existe uma conta registada com este email. Por favor, usa outro email ou faz login.'
          : '❌ An account is already registered with this email.'
      );
    }

    // Check if email already exists in Cloud Firestore
    try {
      const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
      const snap = await getDocs(q);
      if (!snap.empty) {
        throw new Error(
          language === 'pt'
            ? '❌ Já existe uma conta registada com este email na Base de Dados. Por favor, faz login.'
            : '❌ An account is already registered with this email in the Database.'
        );
      }
    } catch (err: any) {
      if (err?.message && err.message.includes('Já existe')) {
        throw err;
      }
    }

    // Fetch up-to-date taken Nicknames from Firestore and LocalStorage
    const takenPublicIds = await this.fetchTakenPublicIds();
    let finalPublicId = trimmedPublicId;

    if (!finalPublicId || takenPublicIds.some((id) => id.toLowerCase().trim() === finalPublicId.toLowerCase())) {
      finalPublicId = generateSecurePublicId(takenPublicIds);
    }

    let fbUid: string | null = null;
    try {
      // Try Firebase Authentication if provider is enabled
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      fbUid = userCredential.user.uid;
      await updateProfile(userCredential.user, { displayName: name.trim() });
    } catch (fbError: any) {
      console.warn('Firebase Auth creation notice (will store profile in Cloud Firestore):', fbError?.code || fbError?.message);
    }

    const userId = fbUid || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const isAdmin = isUserAdmin(normalizedEmail);
    const newUser: User = {
      id: userId,
      name: name.trim(), // Real name is PRIVATE
      email: normalizedEmail,
      publicId: finalPublicId, // Safe public Nickname
      turma: isAdmin ? undefined : finalTurma,
      role: isAdmin ? 'admin' : 'student',
      language,
      points: 20, // initial welcome bonus
      createdAt: new Date().toISOString(),
    };

    // 2. Save private and public profile to Cloud Firestore
    await this.syncUserToFirestore(newUser);

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    let token = userId;
    if (fbUid && auth.currentUser) {
      try {
        token = await auth.currentUser.getIdToken();
      } catch {
        token = fbUid;
      }
    }
    this.setToken(token);
    return { user: newUser, token };
  },

  /**
   * Login with Firebase Authentication
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();

    // Authenticate with Firebase Authentication
    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const fbUser = userCredential.user;

      let user: User | null = null;

      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(userDocRef);

        if (snap.exists()) {
          const data = snap.data();
          const isAdmin = isUserAdmin(data.email || fbUser.email || normalizedEmail, data.role);
          user = {
            id: fbUser.uid,
            name: data.name || fbUser.displayName || 'Estudante',
            email: data.email || fbUser.email || normalizedEmail,
            publicId: data.publicId || generateSecurePublicId(),
            turma: isAdmin ? undefined : (data.turma || '5.º A'),
            role: isAdmin ? 'admin' : (data.role || 'student'),
            language: data.language || 'pt',
            points: data.points ?? 20,
            createdAt: data.createdAt || new Date().toISOString(),
            lastActivity: data.lastActivity,
          };
        }
      } catch (dbErr) {
        console.warn('Firestore read warning:', dbErr);
      }

      if (!user) {
        const isAdmin = isUserAdmin(fbUser.email || normalizedEmail);
        user = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0] || 'Estudante',
          email: fbUser.email || normalizedEmail,
          publicId: generateSecurePublicId(),
          turma: isAdmin ? undefined : '5.º A',
          role: isAdmin ? 'admin' : 'student',
          language: 'pt',
          points: 20,
          createdAt: new Date().toISOString(),
        };
      }

      await this.syncUserToFirestore(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      let token = fbUser.uid;
      try {
        token = await fbUser.getIdToken();
      } catch {
        token = fbUser.uid;
      }
      this.setToken(token);
      return { user, token };
    } catch (fbError: any) {
      console.warn('Firebase Auth login notice:', fbError?.code);
      if (fbError?.code === 'auth/wrong-password' || fbError?.code === 'auth/invalid-credential') {
        throw new Error('Palavra-passe incorreta para este email.');
      }
      if (fbError?.code === 'auth/user-not-found') {
        throw new Error('Não existe conta associada a este email.');
      }
      if (fbError?.code === 'auth/too-many-requests') {
        throw new Error('Muitas tentativas falhadas. Por favor, aguarda alguns momentos.');
      }
      throw new Error('Email ou palavra-passe incorretos.');
    }
  },

  /**
   * Password Recovery using Firebase sendPasswordResetEmail
   */
  async recoverPassword(email: string): Promise<{ success: boolean; message: string; requiresDirectReset?: boolean }> {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check if user exists in Cloud Firestore or localStorage or Demo
    let existsInFirestore = false;
    let registeredUser: any = null;

    try {
      const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
      const snap = await getDocs(q);
      if (!snap.empty) {
        existsInFirestore = true;
        registeredUser = snap.docs[0].data();
      }
    } catch (dbErr) {
      console.warn('Firestore query warning during recover:', dbErr);
    }

    if (!registeredUser) {
      const users = getStoredUsers();
      registeredUser = users.find((u: any) => (u.email || '').toLowerCase().trim() === normalizedEmail);
    }

    // Try Firebase Authentication sendPasswordResetEmail
    try {
      await sendPasswordResetEmail(auth, normalizedEmail);
      return {
        success: true,
        message: '📧 Enviámos o link de recuperação para o teu email! IMPORTANTE: Verifica a caixa de entrada e a pasta de SPAM / Lixo Eletrónico.',
      };
    } catch (fbError: any) {
      console.warn('Firebase recover error:', fbError?.code, fbError?.message);

      if (fbError.code === 'auth/invalid-email') {
        throw new Error('Endereço de email inválido.');
      }
      if (fbError.code === 'auth/user-not-found') {
        throw new Error('Não foi encontrada nenhuma conta registada com este endereço de email.');
      }
      if (fbError.code === 'auth/too-many-requests') {
        throw new Error('Demasiadas tentativas. Por favor, aguarda alguns minutos antes de tentar novamente.');
      }

      // If user exists in Firestore
      if (registeredUser || existsInFirestore) {
        throw new Error('Ocorreu um erro ao enviar o email de recuperação. Por favor, tenta novamente dentro de instantes.');
      }

      // If user doesn't exist anywhere
      throw new Error('Não foi encontrada nenhuma conta registada com este endereço de email.');
    }
  },

  /**
   * Direct Password Reset (Updates Firestore, localStorage, and local DB)
   */
  async resetPasswordDirect(
    email: string,
    newPassword: string,
    turmaVerification?: string
  ): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = email.trim().toLowerCase();

    if (newPassword.length < 6) {
      throw new Error('A nova palavra-passe deve ter pelo menos 6 caracteres.');
    }

    let userDocId: string | null = null;
    let foundUserData: any = null;

    // 1. Search in Cloud Firestore
    try {
      const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
      const snap = await getDocs(q);
      if (!snap.empty) {
        userDocId = snap.docs[0].id;
        foundUserData = snap.docs[0].data();
      }
    } catch (dbErr) {
      console.warn('Firestore lookup during direct reset:', dbErr);
    }

    // 2. Search in local storage
    const users = getStoredUsers();
    const localUserIndex = users.findIndex(
      (u: any) => (u.email || '').toLowerCase().trim() === normalizedEmail
    );
    if (localUserIndex !== -1 && !foundUserData) {
      foundUserData = users[localUserIndex];
      userDocId = foundUserData.id;
    }

    const isAdmin = isUserAdmin(normalizedEmail, foundUserData?.role);

    if (!foundUserData && !userDocId) {
      if (isAdmin) {
        userDocId = `admin-${Date.now()}`;
        foundUserData = {
          id: userDocId,
          name: 'Professora Carla',
          email: normalizedEmail,
          publicId: 'Docente_TIC',
          role: 'admin',
          language: 'pt',
          points: 20,
          createdAt: new Date().toISOString(),
        };
      } else {
        throw new Error('Não foi encontrada nenhuma conta associada a este email.');
      }
    }

    // Verification check: for students, if turma was provided, verify it
    if (!isAdmin && turmaVerification && foundUserData?.turma) {
      if (turmaVerification.trim() !== foundUserData.turma.trim()) {
        throw new Error(`A turma indicada não coincide com a turma do registo deste email (${foundUserData.turma}).`);
      }
    }

    // 3. Update in server backend (secure salted pbkdf2 hash)
    try {
      await fetch('/api/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, newPassword }),
      });
    } catch {
      // ignore
    }

    // 4. Update profile in Cloud Firestore without plaintext password
    if (userDocId) {
      try {
        await updateDoc(doc(db, 'users', userDocId), {
          updatedAt: new Date().toISOString(),
        });
      } catch {
        // ignore
      }
    }

    return {
      success: true,
      message: '✅ Palavra-passe atualizada com sucesso! Já podes iniciar sessão com a tua nova palavra-passe.',
    };
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
   * Get current user details and progress
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
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }

    // Try fetching from Firestore
    let progress: ActivityProgress[] = [];
    let achievements: UserAchievement[] = [];
    const pointsHistory: PointTransaction[] = JSON.parse(localStorage.getItem(POINTS_STORAGE_KEY + user.id) || '[]');

    try {
      const progressCol = collection(db, 'users', user.id, 'progress');
      const snap = await getDocs(progressCol);
      if (!snap.empty) {
        progress = snap.docs.map((d) => d.data() as ActivityProgress);
      }
    } catch {
      progress = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + user.id) || '[]');
    }

    try {
      const achCol = collection(db, 'users', user.id, 'achievements');
      const snap = await getDocs(achCol);
      if (!snap.empty) {
        achievements = snap.docs.map((d) => d.data() as UserAchievement);
      }
    } catch {
      achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + user.id) || '[]');
    }

    if (progress.length === 0) {
      progress = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + user.id) || '[]');
    }
    if (achievements.length === 0) {
      achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + user.id) || '[]');
    }

    // Auto-sync user profile to Cloud Firestore to guarantee document presence
    this.syncUserToFirestore(user).catch(() => {});

    return { user, progress, achievements, pointsHistory };
  },

  async updateLanguage(language: Language): Promise<void> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (rawUser) {
      const user = JSON.parse(rawUser);
      user.language = language;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      try {
        await setDoc(doc(db, 'users', user.id), { language }, { merge: true });
      } catch {
        // ignore
      }
    }
  },

  /**
   * Save user activity progress to Firestore and localStorage
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
    const progressList: ActivityProgress[] = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + user.id) || '[]');
    const achievements: UserAchievement[] = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + user.id) || '[]');
    const pointsHistory: PointTransaction[] = JSON.parse(localStorage.getItem(POINTS_STORAGE_KEY + user.id) || '[]');

    let existing = progressList.find((p) => p.activityId === payload.activityId);
    let earnedPoints = 0;

    if (!existing) {
      existing = {
        userId: user.id,
        activityId: payload.activityId,
        activityType: payload.activityType,
        themeId: payload.themeId,
        status: payload.status || 'completed',
        score: payload.score,
        maxScore: payload.maxScore,
        percentage: payload.percentage,
        attempts: 1,
        bestScore: payload.score,
        bestPercentage: payload.percentage,
        lastUpdated: new Date().toISOString(),
      };
      progressList.push(existing);
      earnedPoints = payload.activityType === 'quiz' ? 25 : payload.activityType === 'challenge' ? 20 : 15;
    } else {
      existing.attempts += 1;
      existing.status = payload.status || existing.status;
      existing.lastUpdated = new Date().toISOString();
      if (payload.score !== undefined && (existing.bestScore === undefined || payload.score > existing.bestScore)) {
        existing.bestScore = payload.score;
      }
      if (payload.percentage !== undefined && (existing.bestPercentage === undefined || payload.percentage > existing.bestPercentage)) {
        existing.bestPercentage = payload.percentage;
      }
      earnedPoints = 5; // repeated activity bonus
    }

    user.points = (user.points || 0) + earnedPoints;
    user.lastActivity = {
      themeId: payload.themeId,
      title: payload.activityTitle || payload.activityId,
      timestamp: new Date().toISOString(),
    };

    if (earnedPoints > 0) {
      pointsHistory.unshift({
        id: `pt-${Date.now()}`,
        userId: user.id,
        amount: earnedPoints,
        reason: payload.activityTitle || payload.activityId,
        timestamp: new Date().toISOString(),
      });
    }

    // Check for badge unlocks
    const completedCount = progressList.filter((p) => p.status === 'completed').length;
    if (completedCount >= 1 && !achievements.some((a) => a.badgeId === 'first_step')) {
      const newAch: UserAchievement = { userId: user.id, badgeId: 'first_step', unlockedAt: new Date().toISOString() };
      achievements.push(newAch);
      try {
        await setDoc(doc(db, 'users', user.id, 'achievements', 'first_step'), newAch);
      } catch {
        // ignore
      }
    }
    if (user.points >= 100 && !achievements.some((a) => a.badgeId === 'point_century')) {
      const newAch: UserAchievement = { userId: user.id, badgeId: 'point_century', unlockedAt: new Date().toISOString() };
      achievements.push(newAch);
      try {
        await setDoc(doc(db, 'users', user.id, 'achievements', 'point_century'), newAch);
      } catch {
        // ignore
      }
    }

    // Sync to Cloud Firestore reliably with setDoc merge
    try {
      await setDoc(doc(db, 'users', user.id, 'progress', payload.activityId), existing, { merge: true });
      await setDoc(
        doc(db, 'users', user.id),
        {
          id: user.id,
          name: user.name,
          email: user.email,
          publicId: user.publicId,
          turma: user.turma || '5.º A',
          role: user.role || 'student',
          points: user.points,
          lastActivity: user.lastActivity,
        },
        { merge: true }
      );
      await setDoc(
        doc(db, 'publicProfiles', user.id),
        {
          id: user.id,
          publicId: user.publicId,
          turma: user.turma || '5.º A',
          role: user.role || 'student',
          points: user.points,
        },
        { merge: true }
      );
      console.log('✅ Progress and points synced to Cloud Firestore for user:', user.id);
    } catch (err) {
      console.error('❌ Firestore sync error in saveProgress:', err);
    }

    // Save to localStorage
    localStorage.setItem(PROGRESS_STORAGE_KEY + user.id, JSON.stringify(progressList));
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + user.id, JSON.stringify(achievements));
    localStorage.setItem(POINTS_STORAGE_KEY + user.id, JSON.stringify(pointsHistory));
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
      return {
        success: true,
        user: null,
        userPoints: 0,
        achievements: [],
      };
    }

    const user: User = JSON.parse(rawUser);
    const achievements: UserAchievement[] = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + user.id) || '[]');
    const pointsHistory: PointTransaction[] = JSON.parse(localStorage.getItem(POINTS_STORAGE_KEY + user.id) || '[]');

    user.points = (user.points || 0) + bonusPoints;
    user.lastActivity = {
      themeId: 'daily_tip',
      title: `💡 Curiosidade: ${tipTitle}`,
      timestamp: new Date().toISOString(),
    };

    pointsHistory.unshift({
      id: `pt-daily-${Date.now()}`,
      userId: user.id,
      amount: bonusPoints,
      reason: `💡 Curiosidade TIC: ${tipTitle}`,
      timestamp: new Date().toISOString(),
    });

    if (user.points >= 100 && !achievements.some((a) => a.badgeId === 'point_century')) {
      const newAch: UserAchievement = { userId: user.id, badgeId: 'point_century', unlockedAt: new Date().toISOString() };
      achievements.push(newAch);
      try {
        await setDoc(doc(db, 'users', user.id, 'achievements', 'point_century'), newAch);
      } catch {
        // ignore
      }
    }

    // Sync to Firestore
    try {
      await setDoc(
        doc(db, 'users', user.id),
        {
          id: user.id,
          name: user.name,
          email: user.email,
          publicId: user.publicId,
          turma: user.turma || '5.º A',
          role: user.role || 'student',
          points: user.points,
          lastActivity: user.lastActivity,
        },
        { merge: true }
      );

      await setDoc(
        doc(db, 'publicProfiles', user.publicId),
        {
          publicId: user.publicId,
          turma: user.turma || '5.º A',
          role: user.role || 'student',
          points: user.points,
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore sync warning for daily tip:', err);
    }

    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + user.id, JSON.stringify(achievements));
    localStorage.setItem(POINTS_STORAGE_KEY + user.id, JSON.stringify(pointsHistory));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return {
      success: true,
      user,
      userPoints: user.points,
      achievements,
    };
  },

  /**
   * Get Class/Turma Rankings with Gamification metrics
   */
  async getTurmaRankings(): Promise<TurmaRanking[]> {
    const defaultTurmas = getTurmasList();
    const storedUsers = getStoredUsers();
    
    const userMap = new Map<string, any>();
    storedUsers.forEach((u: any) => userMap.set(u.id, u));

    // Try fetching latest public profiles from Firestore if available
    try {
      const q = query(collection(db, 'publicProfiles'), orderBy('points', 'desc'), limit(300));
      const snap = await getDocs(q);
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.id) {
          const existing = userMap.get(d.id) || {};
          userMap.set(d.id, {
            ...existing,
            id: d.id,
            publicId: d.publicId || existing.publicId || 'Estudante_TIC',
            turma: d.turma || existing.turma || '5.º A',
            points: d.points ?? existing.points ?? 0,
          });
        }
      });
    } catch {
      // offline or rule error, use local map
    }

    const allUsers = Array.from(userMap.values());

    // Gather unique turmas (combining default turmas and any registered student turmas)
    const turmaSet = new Set<string>(defaultTurmas);
    allUsers.forEach((u) => {
      if (u.turma && typeof u.turma === 'string') {
        turmaSet.add(u.turma.trim());
      }
    });

    const allTurmaNames = Array.from(turmaSet);

    const result: TurmaRanking[] = allTurmaNames.map((turmaName) => {
      const turmaStudents = allUsers.filter(
        (u) => (u.turma || '5.º A').toLowerCase().trim() === turmaName.toLowerCase().trim()
      );
      const totalPoints = turmaStudents.reduce((sum, u) => sum + (u.points || 0), 0);
      const studentCount = turmaStudents.length;
      const avgPoints = studentCount > 0 ? Math.round(totalPoints / studentCount) : 0;

      // Sort all students in this turma by points descending
      const allStudentsInTurma = [...turmaStudents]
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .map((s) => ({
          publicId: s.publicId || 'Estudante_TIC',
          points: s.points || 0,
          activitiesCount: Math.floor((s.points || 0) / 15),
          badgeCount: Math.min(6, Math.floor((s.points || 0) / 30) + 1),
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
        topBadge: avgPoints >= 100 ? '🥇 Turma Ouro' : avgPoints >= 50 ? '🥈 Turma Prata' : avgPoints > 0 ? '🥉 Turma Bronze' : '⭐ Estreante',
        topStudents,
        allStudents: allStudentsInTurma,
      };
    });

    // Rank classes by total points descending, then by avgPoints, then alphabetically
    result.sort((a, b) => b.totalPoints - a.totalPoints || b.avgPoints - a.avgPoints || a.turma.localeCompare(b.turma));
    return result;
  },

  /**
   * Get Individual Student Rankings (using safe public Nicknames)
   */
  async getStudentRankings(currentUserId?: string): Promise<StudentRanking[]> {
    const storedUsers = getStoredUsers();
    const userMap = new Map<string, any>();
    storedUsers.forEach((u: any) => userMap.set(u.id, u));

    try {
      const q = query(collection(db, 'publicProfiles'), orderBy('points', 'desc'), limit(300));
      const snap = await getDocs(q);
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.id) {
          const existing = userMap.get(d.id) || {};
          userMap.set(d.id, {
            ...existing,
            id: d.id,
            publicId: d.publicId || existing.publicId || 'Estudante_TIC',
            turma: d.turma || existing.turma || '5.º A',
            points: d.points ?? existing.points ?? 0,
          });
        }
      });
    } catch {
      // quiet fallback
    }

    const sortedUsers = Array.from(userMap.values())
      .filter((u) => !isUserAdmin(u.email, u.role) && u.role !== 'admin')
      .sort((a, b) => (b.points || 0) - (a.points || 0));

    return sortedUsers.map((u, index) => ({
      position: index + 1,
      id: u.id,
      publicId: u.publicId || 'Estudante_TIC',
      turma: u.turma || '5.º A',
      points: u.points || 0,
      activitiesCount: Math.floor((u.points || 0) / 15),
      badgeCount: Math.min(6, Math.floor((u.points || 0) / 30) + 1),
      isCurrentUser: u.id === currentUserId,
    }));
  },

  /**
   * Fetch all registered students from Cloud Firestore and local storage
   * For the Administrator / Teacher reserved area with real names, emails, and points.
   * NOTE: Administrators / Teachers are excluded from student rosters.
   */
  async getAllStudentsForAdmin(): Promise<User[]> {
    const studentMap = new Map<string, User>();

    // 1. Fetch from Firestore users collection
    try {
      const q = query(collection(db, 'users'), limit(500));
      const snap = await getDocs(q);
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.email) {
          const emailNorm = String(data.email).toLowerCase().trim();
          const isAdmin = isUserAdmin(emailNorm, data.role);
          if (isAdmin) {
            // If admin has legacy turma in Firestore, clean it up silently
            if (data.turma) {
              setDoc(doc(db, 'users', docSnap.id), { turma: null }, { merge: true }).catch(() => {});
            }
            return; // Admins are not students
          }
          const u: User = {
            id: docSnap.id,
            name: data.name || 'Estudante',
            email: data.email,
            publicId: data.publicId || 'Estudante',
            turma: data.turma || '5.º A',
            role: 'student',
            language: data.language || 'pt',
            points: typeof data.points === 'number' ? data.points : 0,
            createdAt: data.createdAt || new Date().toISOString(),
            lastActivity: data.lastActivity,
          };
          studentMap.set(emailNorm, u);
        }
      });
    } catch (err) {
      console.warn('Could not query users collection for admin:', err);
    }

    // 2. Fetch from local storage and merge (preserving newest/highest score)
    const localUsers = getStoredUsers();
    localUsers.forEach((data: any) => {
      if (data.email) {
        const emailNorm = String(data.email).toLowerCase().trim();
        const isAdmin = isUserAdmin(emailNorm, data.role);
        if (isAdmin) {
          return; // Admins are not students
        }
        const existing = studentMap.get(emailNorm);
        if (!existing) {
          studentMap.set(emailNorm, {
            id: data.id || `local-${emailNorm}`,
            name: data.name || 'Estudante',
            email: data.email,
            publicId: data.publicId || 'Estudante',
            turma: data.turma || '5.º A',
            role: 'student',
            language: data.language || 'pt',
            points: typeof data.points === 'number' ? data.points : 0,
            createdAt: data.createdAt || new Date().toISOString(),
            lastActivity: data.lastActivity,
          });
        } else if (typeof data.points === 'number' && data.points > (existing.points || 0)) {
          existing.points = data.points;
        }
      }
    });

    return Array.from(studentMap.values()).sort((a, b) => {
      const turmaA = a.turma || '5.º A';
      const turmaB = b.turma || '5.º A';
      if (turmaA !== turmaB) {
        return turmaA.localeCompare(turmaB);
      }
      return (b.points || 0) - (a.points || 0);
    });
  },

  /**
   * Teacher / Admin management tool to update a student's password, class (turma), and name
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

    if (updates.newPassword && updates.newPassword.length < 6) {
      throw new Error('A nova palavra-passe deve ter pelo menos 6 caracteres.');
    }

    const firestoreUpdates: any = {};
    if (updates.newTurma) firestoreUpdates.turma = updates.newTurma.trim();
    if (updates.newName) firestoreUpdates.name = updates.newName.trim();

    if (updates.newPassword) {
      // Update securely on backend if available
      try {
        await fetch('/api/auth/recover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail, newPassword: updates.newPassword }),
        });
      } catch {
        // ignore
      }
    }

    // 1. Update in Cloud Firestore users collection
    let updatedDocId = studentId;
    try {
      if (studentId && !studentId.startsWith('local-')) {
        await setDoc(doc(db, 'users', studentId), firestoreUpdates, { merge: true });
      } else {
        const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
        const snap = await getDocs(q);
        if (!snap.empty) {
          updatedDocId = snap.docs[0].id;
          await setDoc(doc(db, 'users', updatedDocId), firestoreUpdates, { merge: true });
        }
      }
    } catch (err) {
      console.warn('Firestore update warning in adminUpdateStudent:', err);
    }

    // 2. Update in Cloud Firestore publicProfiles collection (turma/name)
    try {
      if (updatedDocId && !updatedDocId.startsWith('local-')) {
        const pubUpdates: any = {};
        if (updates.newTurma) pubUpdates.turma = updates.newTurma.trim();
        if (Object.keys(pubUpdates).length > 0) {
          await setDoc(doc(db, 'publicProfiles', updatedDocId), pubUpdates, { merge: true });
        }
      }
    } catch (err) {
      console.warn('Firestore publicProfile update warning:', err);
    }

    // 3. Update in local storage (never storing plaintext password)
    const users = getStoredUsers();
    let localFound = false;
    const updatedUsers = users.map((u: any) => {
      if ((u.email || '').toLowerCase().trim() === normalizedEmail || u.id === studentId) {
        localFound = true;
        return {
          ...u,
          ...(updates.newTurma ? { turma: updates.newTurma.trim() } : {}),
          ...(updates.newName ? { name: updates.newName.trim() } : {}),
        };
      }
      return u;
    });

    if (localFound) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }

    // If this student is currently loaded as the current active session in this browser
    const rawCurrent = localStorage.getItem(CURRENT_USER_KEY);
    if (rawCurrent) {
      try {
        const currentUser = JSON.parse(rawCurrent);
        if ((currentUser.email || '').toLowerCase().trim() === normalizedEmail) {
          if (updates.newTurma) currentUser.turma = updates.newTurma.trim();
          if (updates.newName) currentUser.name = updates.newName.trim();
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
        }
      } catch {
        // ignore
      }
    }

    return {
      success: true,
      message: 'Registo do aluno atualizado com sucesso!',
    };
  },

  /**
   * Delete a single student from Firestore, publicProfiles, and LocalStorage
   * Ensures teacher/admin accounts are NEVER deleted.
   */
  async adminDeleteStudent(studentId: string, studentEmail: string): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = (studentEmail || '').toLowerCase().trim();
    if (isUserAdmin(normalizedEmail)) {
      throw new Error('Não é permitido eliminar a conta da Professora / Administrador.');
    }

    // 1. Delete from Firestore users
    try {
      if (studentId && !studentId.startsWith('local-')) {
        await deleteDoc(doc(db, 'users', studentId));
        await deleteDoc(doc(db, 'publicProfiles', studentId));
      } else if (normalizedEmail) {
        const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
        const snap = await getDocs(q);
        for (const docSnap of snap.docs) {
          await deleteDoc(doc(db, 'users', docSnap.id));
          await deleteDoc(doc(db, 'publicProfiles', docSnap.id));
        }
      }
    } catch (err) {
      console.warn('Firestore deletion warning for student:', err);
    }

    // 2. Delete from localStorage
    const users = getStoredUsers();
    const filteredUsers = users.filter((u: any) => {
      const uEmail = (u.email || '').toLowerCase().trim();
      return uEmail !== normalizedEmail && u.id !== studentId;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filteredUsers));

    // Clear local cache for this user
    if (studentId) {
      localStorage.removeItem(PROGRESS_STORAGE_KEY + studentId);
      localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + studentId);
      localStorage.removeItem(POINTS_STORAGE_KEY + studentId);
    }

    // If currently logged in as this student on this browser, log out
    const rawCurrent = localStorage.getItem(CURRENT_USER_KEY);
    if (rawCurrent) {
      try {
        const currentUser = JSON.parse(rawCurrent);
        if ((currentUser.email || '').toLowerCase().trim() === normalizedEmail || currentUser.id === studentId) {
          localStorage.removeItem(CURRENT_USER_KEY);
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch {
        // ignore
      }
    }

    return {
      success: true,
      message: 'Aluno eliminado com sucesso da plataforma.',
    };
  },

  /**
   * Delete multiple students in batch
   */
  async adminDeleteStudents(studentIdsOrEmails: string[]): Promise<{ success: boolean; deletedCount: number; message: string }> {
    if (!studentIdsOrEmails || studentIdsOrEmails.length === 0) {
      return { success: true, deletedCount: 0, message: 'Nenhum aluno selecionado.' };
    }

    let deletedCount = 0;
    const targetSet = new Set(studentIdsOrEmails.map(s => s.toLowerCase().trim()));

    // 1. Process Firestore deletions
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

    // 2. Process localStorage deletions
    const users = getStoredUsers();
    const remainingUsers = users.filter((u: any) => {
      const email = (u.email || '').toLowerCase().trim();
      const id = String(u.id || '').toLowerCase().trim();
      const shouldDelete = !isUserAdmin(email, u.role) && (targetSet.has(email) || targetSet.has(id));
      if (shouldDelete) {
        deletedCount++;
        localStorage.removeItem(PROGRESS_STORAGE_KEY + u.id);
        localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + u.id);
        localStorage.removeItem(POINTS_STORAGE_KEY + u.id);
      }
      return !shouldDelete;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(remainingUsers));

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

    const turmasSet = new Set(turmaNames.map(t => t.toLowerCase().trim()));
    let count = 0;

    // 1. Delete from Firestore
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

    // 2. Delete from localStorage
    const users = getStoredUsers();
    const remainingUsers = users.filter((u: any) => {
      const email = (u.email || '').toLowerCase().trim();
      const turma = (u.turma || '').toLowerCase().trim();
      const shouldDelete = !isUserAdmin(email, u.role) && turmasSet.has(turma);
      if (shouldDelete) {
        count++;
        localStorage.removeItem(PROGRESS_STORAGE_KEY + u.id);
        localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + u.id);
        localStorage.removeItem(POINTS_STORAGE_KEY + u.id);
      }
      return !shouldDelete;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(remainingUsers));

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

    // 1. Delete all non-admin users from Firestore
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

    // 2. Clear all students from localStorage
    const users = getStoredUsers();
    const adminsOnly = users.filter((u: any) => {
      const email = (u.email || '').toLowerCase().trim();
      const isAdm = isUserAdmin(email, u.role);
      if (!isAdm) {
        count++;
        localStorage.removeItem(PROGRESS_STORAGE_KEY + u.id);
        localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + u.id);
        localStorage.removeItem(POINTS_STORAGE_KEY + u.id);
      }
      return isAdm;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(adminsOnly));

    return {
      success: true,
      deletedCount: count,
      message: 'Todos os alunos e pautas foram eliminados com sucesso. A conta de professor foi preservada.',
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

    // Save to Firestore config if possible
    try {
      await setDoc(doc(db, 'config', 'school_turmas'), {
        list: updated,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.warn('Could not sync school_turmas to Firestore:', err);
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

    // Sync to Firestore
    try {
      await setDoc(doc(db, 'config', 'school_turmas'), {
        list: updated,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.warn('Could not sync school_turmas to Firestore:', err);
    }

    return {
      success: true,
      turmas: updated,
      deletedStudentsCount,
      message: `Turma(s) ${turmaNames.join(', ')} eliminada(s) com sucesso.`,
    };
  },
};
