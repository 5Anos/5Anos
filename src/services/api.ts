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
import { getTurmasList } from '../data/turmasData';

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
      // Purge any legacy demo accounts and ensure admin/teacher accounts never hold a student turma
      let hasChanges = false;
      const cleaned = parsed
        .filter(
          (u: any) =>
            !u?.id?.startsWith('demo-') &&
            u?.email !== 'joao.silva@escola.pt' &&
            u?.email !== 'leonor.martins@escola.pt'
        )
        .map((u: any) => {
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
            this.setToken(fbUser.uid);
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
  async syncUserToFirestore(user: User, password?: string): Promise<boolean> {
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

      if (password) {
        payload.password = password;
      }

      await setDoc(doc(db, 'users', user.id), payload, { merge: true });

      // In public rankings: ONLY students appear in publicProfiles
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
            id: user.id,
            publicId: user.publicId,
            turma: user.turma || '5.º A',
            role: finalRole,
            points: user.points ?? 20,
            createdAt: user.createdAt || new Date().toISOString(),
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
      turma: finalTurma,
      role: isAdmin ? 'admin' : 'student',
      language,
      points: 20, // initial welcome bonus
      createdAt: new Date().toISOString(),
    };

    // 2. Save private and public profile to Cloud Firestore with password for cross-device authentication
    await this.syncUserToFirestore(newUser, password);

    users.push({ ...newUser, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    this.setToken(userId);
    return { user: newUser, token: userId };
  },

  /**
   * Login with Firebase Authentication or Cloud Firestore database
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Try Firebase Authentication
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
            turma: data.turma || '5.º A',
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
          turma: '5.º A',
          role: isAdmin ? 'admin' : 'student',
          language: 'pt',
          points: 20,
          createdAt: new Date().toISOString(),
        };
      }

      await this.syncUserToFirestore(user, password);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      this.setToken(fbUser.uid);
      return { user, token: fbUser.uid };
    } catch (fbError: any) {
      console.warn('Firebase Auth login notice, checking Cloud Firestore directly:', fbError?.code);
    }

    // 2. Query Cloud Firestore 'users' collection directly
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', normalizedEmail));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docSnap = snap.docs[0];
        const docData = docSnap.data();
        if (docData.password === password) {
          const isAdmin = isUserAdmin(docData.email || normalizedEmail, docData.role);
          const user: User = {
            id: docSnap.id,
            name: docData.name || 'Estudante',
            email: docData.email,
            publicId: docData.publicId || generateSecurePublicId(),
            turma: docData.turma || '5.º A',
            role: isAdmin ? 'admin' : (docData.role || 'student'),
            language: docData.language || 'pt',
            points: docData.points ?? 20,
            createdAt: docData.createdAt || new Date().toISOString(),
            lastActivity: docData.lastActivity,
          };

          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
          const token = `token-${user.id}`;
          this.setToken(token);
          return { user, token };
        } else {
          throw new Error('Palavra-passe incorreta para este email.');
        }
      }
    } catch (err: any) {
      if (err?.message && err.message.includes('Palavra-passe incorreta')) {
        throw err;
      }
      console.warn('Firestore query notice:', err);
    }

    // 3. Check local storage accounts
    const users = getStoredUsers();
    const found = users.find(
      (u: any) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (found) {
      const isAdmin = isUserAdmin(found.email, found.role);
      const user: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        publicId: found.publicId || 'Panda_Feliz_701',
        turma: found.turma || '5.º A',
        role: isAdmin ? 'admin' : (found.role || 'student'),
        language: found.language || 'pt',
        points: found.points || 0,
        createdAt: found.createdAt || new Date().toISOString(),
        lastActivity: found.lastActivity,
      };

      await this.syncUserToFirestore(user, password);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      const token = `local-token-${user.id}`;
      this.setToken(token);
      return { user, token };
    }

    throw new Error('Email ou palavra-passe incorretos.');
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
        throw new Error('Ocorreu um erro ao enviar o email de recuperação pelo Firebase. Por favor, tenta novamente dentro de instantes.');
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

    // 3. Update in Cloud Firestore
    if (userDocId) {
      try {
        await updateDoc(doc(db, 'users', userDocId), {
          password: newPassword,
          updatedAt: new Date().toISOString(),
        });
        console.log('✅ Updated password in Cloud Firestore for user:', userDocId);
      } catch (updateErr) {
        // If doc doesn't exist yet, merge
        try {
          await setDoc(
            doc(db, 'users', userDocId),
            { password: newPassword, updatedAt: new Date().toISOString() },
            { merge: true }
          );
        } catch (setErr) {
          console.warn('Failed to update Firestore doc:', setErr);
        }
      }
    }

    // 4. Update in local storage
    if (localUserIndex !== -1) {
      users[localUserIndex].password = newPassword;
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } else if (foundUserData) {
      users.push({ ...foundUserData, password: newPassword });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }

    // 5. Update in server.ts DB
    try {
      await fetch('/api/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, newPassword }),
      });
    } catch {
      // ignore
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

    const sortedUsers = Array.from(userMap.values()).sort((a, b) => (b.points || 0) - (a.points || 0));

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
   * For the Administrator / Teacher reserved area with real names, emails, and points
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
          const u: User = {
            id: docSnap.id,
            name: data.name || 'Estudante',
            email: data.email,
            publicId: data.publicId || 'Estudante',
            turma: data.turma || '5.º A',
            role: isAdmin ? 'admin' : (data.role || 'student'),
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
        const existing = studentMap.get(emailNorm);
        if (!existing) {
          studentMap.set(emailNorm, {
            id: data.id || `local-${emailNorm}`,
            name: data.name || 'Estudante',
            email: data.email,
            publicId: data.publicId || 'Estudante',
            turma: data.turma || '5.º A',
            role: isAdmin ? 'admin' : (data.role || 'student'),
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
      if (a.turma !== b.turma) {
        return a.turma.localeCompare(b.turma);
      }
      return (b.points || 0) - (a.points || 0);
    });
  },
};
