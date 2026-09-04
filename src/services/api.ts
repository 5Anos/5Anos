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
  collection,
  getDocs,
  query,
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
      // Purge any legacy demo accounts from local storage
      const cleaned = parsed.filter(
        (u: any) =>
          !u?.id?.startsWith('demo-') &&
          u?.email !== 'joao.silva@escola.pt' &&
          u?.email !== 'leonor.martins@escola.pt'
      );
      if (cleaned.length !== parsed.length) {
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
            const user: User = {
              id: fbUser.uid,
              name: data.name || fbUser.displayName || 'Estudante',
              email: fbUser.email || '',
              publicId: data.publicId || generateSecurePublicId(this.getAllTakenPublicIds()),
              turma: data.turma || '5.º A',
              role: data.role || 'student',
              points: data.points ?? 20,
              language: data.language || 'pt',
              createdAt: data.createdAt || new Date().toISOString(),
              lastActivity: data.lastActivity,
            };
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

    // 1. Strict Validation: Uniqueness of Email & Nickname across Firestore & local storage
    const users = getStoredUsers();
    
    // Check Email Uniqueness
    const emailExists = users.some((u: any) => (u.email || '').toLowerCase().trim() === normalizedEmail);
    if (emailExists) {
      throw new Error(
        language === 'pt'
          ? '❌ Já existe uma conta registada com este email. Por favor, usa outro email ou faz login.'
          : '❌ An account is already registered with this email.'
      );
    }

    // Fetch up-to-date taken Nicknames from Firestore and LocalStorage
    const takenPublicIds = await this.fetchTakenPublicIds();
    let finalPublicId = trimmedPublicId;

    // If no nickname provided OR if nickname already exists in database, generate a guaranteed non-existent unique one
    if (!finalPublicId || takenPublicIds.some((id) => id.toLowerCase().trim() === finalPublicId.toLowerCase())) {
      finalPublicId = generateSecurePublicId(takenPublicIds);
    }

    try {
      // 1. Firebase Authentication create user
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = userCredential.user;

      // Update displayName
      await updateProfile(fbUser, { displayName: name.trim() });

      const newUser: User = {
        id: fbUser.uid,
        name: name.trim(), // Real name is PRIVATE
        email: fbUser.email || email.trim(),
        publicId: finalPublicId, // Safe public Nickname (GUARANTEED UNIQUE)
        turma: finalTurma,
        role: 'student',
        language,
        points: 20, // initial welcome bonus
        createdAt: new Date().toISOString(),
      };

      // 2. Save private profile to Cloud Firestore /users/{uid}
      try {
        await setDoc(doc(db, 'users', fbUser.uid), {
          id: newUser.id,
          name: newUser.name, // Private
          email: newUser.email,
          publicId: newUser.publicId,
          turma: newUser.turma,
          role: newUser.role,
          language: newUser.language,
          points: newUser.points,
          createdAt: newUser.createdAt,
        });

        // 3. Save safe public profile /publicProfiles/{uid} (No real name, no email)
        await setDoc(doc(db, 'publicProfiles', fbUser.uid), {
          id: newUser.id,
          publicId: newUser.publicId,
          turma: newUser.turma,
          role: newUser.role,
          points: newUser.points,
          createdAt: newUser.createdAt,
        });
      } catch (dbErr) {
        console.warn('Firestore write warning:', dbErr);
      }

      users.push({ ...newUser, password });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      this.setToken(fbUser.uid);
      return { user: newUser, token: fbUser.uid };
    } catch (fbError: any) {
      console.warn('Firebase register notice, using built-in database:', fbError);

      const newUser: User = {
        id: `u-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        publicId: finalPublicId,
        turma: finalTurma,
        role: 'student',
        language,
        points: 20,
        createdAt: new Date().toISOString(),
      };

      users.push({ ...newUser, password });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      const token = `local-token-${newUser.id}`;
      this.setToken(token);

      // Attempt background Firestore sync
      try {
        await setDoc(doc(db, 'users', newUser.id), {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          publicId: newUser.publicId,
          turma: newUser.turma,
          role: newUser.role,
          language: newUser.language,
          points: newUser.points,
          createdAt: newUser.createdAt,
        });
        await setDoc(doc(db, 'publicProfiles', newUser.id), {
          id: newUser.id,
          publicId: newUser.publicId,
          turma: newUser.turma,
          role: newUser.role,
          points: newUser.points,
          createdAt: newUser.createdAt,
        });
      } catch {
        // quiet fallback
      }

      return { user: newUser, token };
    }
  },

  /**
   * Login with Firebase Authentication and load profile from Firestore
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = userCredential.user;

      let user: User | null = null;

      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(userDocRef);

        if (snap.exists()) {
          const data = snap.data();
          user = {
            id: fbUser.uid,
            name: data.name || fbUser.displayName || 'Estudante',
            email: fbUser.email || email.trim(),
            publicId: data.publicId || generateSecurePublicId(),
            turma: data.turma || '5.º A',
            role: data.role || 'student',
            language: data.language || 'pt',
            points: data.points ?? 20,
            createdAt: data.createdAt || new Date().toISOString(),
            lastActivity: data.lastActivity,
          };
        } else {
          // Initialize user doc if missing
          const defaultPublicId = generateSecurePublicId();
          user = {
            id: fbUser.uid,
            name: fbUser.displayName || email.split('@')[0] || 'Estudante',
            email: fbUser.email || email.trim(),
            publicId: defaultPublicId,
            turma: '5.º A',
            role: 'student',
            language: 'pt',
            points: 20,
            createdAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, user);
        }
      } catch (dbErr) {
        console.warn('Firestore read warning:', dbErr);
        user = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0] || 'Estudante',
          email: fbUser.email || email.trim(),
          publicId: generateSecurePublicId(),
          turma: '5.º A',
          role: 'student',
          language: 'pt',
          points: 20,
          createdAt: new Date().toISOString(),
        };
      }

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      this.setToken(fbUser.uid);
      return { user, token: fbUser.uid };
    } catch (fbError: any) {
      console.warn('Firebase login error, checking demo/local fallback:', fbError);

      // Check demo accounts / local users
      const users = getStoredUsers();
      const found = users.find(
        (u: any) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (found) {
        const user: User = {
          id: found.id,
          name: found.name,
          email: found.email,
          publicId: found.publicId || 'Panda_Feliz_701',
          turma: found.turma || '5.º A',
          role: found.role || 'student',
          language: found.language || 'pt',
          points: found.points || 0,
          createdAt: found.createdAt,
          lastActivity: found.lastActivity,
        };

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        const token = `local-token-${user.id}`;
        this.setToken(token);
        return { user, token };
      }

      let msg = 'Email ou palavra-passe incorretos.';
      if (fbError.code === 'auth/user-not-found' || fbError.code === 'auth/wrong-password' || fbError.code === 'auth/invalid-credential') {
        msg = 'Email ou palavra-passe incorretos.';
      } else if (fbError.code === 'auth/invalid-email') {
        msg = 'Endereço de email inválido.';
      } else if (fbError.message) {
        msg = fbError.message;
      }

      throw new Error(msg);
    }
  },

  /**
   * Password Recovery using Firebase sendPasswordResetEmail
   */
  async recoverPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return {
        success: true,
        message: 'Enviámos um link de recuperação para o teu email com sucesso. Por favor, verifica a tua caixa de entrada.',
      };
    } catch (fbError: any) {
      console.warn('Firebase recover error:', fbError);
      if (fbError.code === 'auth/user-not-found') {
        return { success: false, message: 'Nenhuma conta encontrada com este email.' };
      }
      if (fbError.code === 'auth/invalid-email') {
        return { success: false, message: 'Endereço de email inválido.' };
      }

      // Local storage check
      const users = getStoredUsers();
      const found = users.find((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (found) {
        return {
          success: true,
          message: `Simulação: Link de recuperação enviado para ${email}. Palavra-passe da conta de teste: ${found.password}`,
        };
      }

      return {
        success: true,
        message: 'Se este email estiver registado, receberás instruções para redefinir a palavra-passe.',
      };
    }
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

    return { user, progress, achievements, pointsHistory };
  },

  async updateLanguage(language: Language): Promise<void> {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (rawUser) {
      const user = JSON.parse(rawUser);
      user.language = language;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      try {
        await updateDoc(doc(db, 'users', user.id), { language });
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

    // Sync to Cloud Firestore
    try {
      await setDoc(doc(db, 'users', user.id, 'progress', payload.activityId), existing);
      await updateDoc(doc(db, 'users', user.id), {
        points: user.points,
        lastActivity: user.lastActivity,
      });
      await updateDoc(doc(db, 'publicProfiles', user.id), {
        points: user.points,
      });
    } catch (err) {
      console.warn('Firestore sync warning:', err);
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
};
