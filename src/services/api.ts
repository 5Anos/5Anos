import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  writeBatch,
  onSnapshot,
} from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { db } from '../firebase';
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
import { getTurmasList, saveTurmasList } from '../data/turmasData';
import { getDefaultAvatar } from '../utils/avatarUtils';
import { hashPasswordClient, verifyPasswordClient } from '../utils/cryptoUtils';
import {
  generateKidUsername,
  generateKidPassword,
  parseStudentName,
  normalizeTurmaName,
  getStudentCardPassword,
} from '../utils/studentCredentials';
import {
  isTeacherEmail,
  isTeacherIdentifier,
  isUserAdmin,
  TEACHER_ADMIN_EMAILS,
} from '../utils/teacherAuth';

export function isFallbackToken(token?: string | null): boolean {
  if (!token) return false;
  return token.startsWith('teacher_') || token.startsWith('std_') || token.startsWith('fallback_');
}

export function isServerSessionToken(token?: string | null): boolean {
  if (!token) return false;
  return !isFallbackToken(token) && token.length > 20;
}

export { isTeacherEmail, isTeacherIdentifier, isUserAdmin, TEACHER_ADMIN_EMAILS };

const TOKEN_KEY = 'tic_5ano_auth_token';
const CURRENT_USER_KEY = 'tic_5ano_current_user';
const PROGRESS_STORAGE_KEY = 'tic_5ano_progress_';
const ACHIEVEMENTS_STORAGE_KEY = 'tic_5ano_achievements_';
const POINTS_STORAGE_KEY = 'tic_5ano_points_';
const THEME_VISIBILITY_KEY = 'tic_5ano_theme_visibility';
const QUIZ_VISIBILITY_KEY = 'tic_5ano_quiz_visibility';

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
  'correio-eletronico': true,
  'tic-sociedade': true,
  'ergonomia': true,
  'seguranca': true,
  'palavras-passe': true,
  'navegar-internet': true,
  'direitos-autor': true,
};

function resolveApiBaseUrl(): string {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/$/, '');
  }
  return '';
}

const API_BASE_URL = resolveApiBaseUrl();

class ServerUnavailableError extends Error {
  constructor(message = 'Server unavailable') {
    super(message);
    this.name = 'ServerUnavailableError';
  }
}

async function serverApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  // If running on static host like GitHub Pages without external backend, fall back immediately
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io') && !API_BASE_URL) {
    throw new ServerUnavailableError('Static host GitHub Pages: direct Firestore client');
  }

  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');

  // Only attach Authorization header if the client holds a cryptographically signed server HMAC session token
  if (token && isServerSessionToken(token)) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, { ...init, headers });
    if (response.status === 405 || response.status === 404 || response.status === 502) {
      throw new ServerUnavailableError(`HTTP ${response.status}`);
    }

    let body: any = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        body = await response.json();
      } catch {}
    }

    if (!response.ok) {
      const errorMsg = body?.error || `Erro de servidor (${response.status})`;
      // Only trigger session expiration if a real server HMAC session was rejected by the backend
      if (response.status === 401 && token && isServerSessionToken(token)) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
        window.dispatchEvent(new CustomEvent('tic_session_expired'));
      }
      throw new Error(errorMsg);
    }

    return body as T;
  } catch (err: any) {
    if (err instanceof ServerUnavailableError) throw err;
    if (err?.message?.includes('Failed to fetch') || err?.message?.includes('NetworkError')) {
      throw new ServerUnavailableError('Network error');
    }
    throw err;
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

  async logout(): Promise<void> {
    try {
      await serverApi('/api/auth/logout', { method: 'POST' });
    } catch {
      // offline / static host ignore
    } finally {
      this.removeToken();
      window.dispatchEvent(new CustomEvent('tic_user_logged_out'));
    }
  },

  async login(identifier: string, password: string): Promise<{ success: boolean; user: User; token: string }> {
    const cleanId = identifier.trim();
    const cleanPass = password.trim();

    // 1. Try server endpoint if backend is active
    try {
      const res = await serverApi<{ success: boolean; user: User; token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier: cleanId, password: cleanPass }),
      });
      if (res?.token) this.setToken(res.token);
      if (res?.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.user));
      return res;
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError) && !err?.message?.includes('405') && !err?.message?.includes('404')) {
        throw err;
      }
    }

    // 2. Direct Firestore fallback (for GitHub Pages / Standalone environments)
    const lowerId = cleanId.toLowerCase();

    try {
      const usersRef = collection(db, 'users');
      let foundDoc: any = null;

      // Search by username
      const qUser = query(usersRef, where('username', '==', lowerId));
      const snapUser = await getDocs(qUser);
      if (!snapUser.empty) {
        foundDoc = snapUser.docs[0];
      }

      // Search by email
      if (!foundDoc && lowerId.includes('@')) {
        const qEmail = query(usersRef, where('email', '==', lowerId));
        const snapEmail = await getDocs(qEmail);
        if (!snapEmail.empty) {
          foundDoc = snapEmail.docs[0];
        }
      }

      // Search by publicId
      if (!foundDoc) {
        const qPublic = query(usersRef, where('publicId', '==', cleanId.toUpperCase()));
        const snapPublic = await getDocs(qPublic);
        if (!snapPublic.empty) {
          foundDoc = snapPublic.docs[0];
        }
      }

      // Check teacher-carla document explicitly if identifier belongs to teacher
      if (!foundDoc && isTeacherIdentifier(lowerId)) {
        const teacherDocSnap = await getDoc(doc(db, 'users', 'teacher-carla'));
        if (teacherDocSnap.exists()) {
          foundDoc = teacherDocSnap;
        }
      }

      if (!foundDoc) {
        throw new Error('Utilizador ou palavra-passe incorretos.');
      }

      const userData = foundDoc.data() as User;
      userData.id = foundDoc.id;

      // Check credentials document for PBKDF2 / Scrypt hash & salt
      const credSnap = await getDoc(doc(db, 'credentials', foundDoc.id));
      let isPasswordValid = false;

      if (credSnap.exists()) {
        const credData = credSnap.data();
        if (credData?.passwordHash && credData?.passwordSalt) {
          isPasswordValid = await verifyPasswordClient(cleanPass, credData.passwordHash, credData.passwordSalt);
        }
      }

      // Student transitional migration (only for non-teacher students)
      const isTeacher = isUserAdmin(userData.email, userData.role, userData.username, userData.publicId);
      if (!isTeacher) {
        // Legacy fallback support for transitional students if not yet hashed
        if (!isPasswordValid && (userData as any).initialPassword) {
          if ((userData as any).initialPassword === cleanPass) {
            isPasswordValid = true;
            const hashed = await hashPasswordClient(cleanPass);
            await setDoc(doc(db, 'credentials', foundDoc.id), {
              userId: foundDoc.id,
              passwordHash: hashed.hash,
              passwordSalt: hashed.salt,
              passwordChangedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }, { merge: true }).catch((e) => console.warn('[Auth] Migração de credencial falhou:', e));
          }
        }

        // Card password fallback support (deterministic password from card)
        if (!isPasswordValid) {
          const cardPass = getStudentCardPassword(userData);
          if (cardPass === cleanPass) {
            isPasswordValid = true;
            const hashed = await hashPasswordClient(cleanPass);
            await setDoc(doc(db, 'credentials', foundDoc.id), {
              userId: foundDoc.id,
              passwordHash: hashed.hash,
              passwordSalt: hashed.salt,
              passwordChangedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }, { merge: true }).catch((e) => console.warn('[Auth] Registo de palavra-passe do cartão falhou:', e));
          }
        }
      }

      if (!isPasswordValid) {
        throw new Error('Utilizador ou palavra-passe incorretos.');
      }

      const token = isTeacher
        ? `teacher_${foundDoc.id}_${Date.now()}`
        : `std_${foundDoc.id}_${Date.now()}`;
      this.setToken(token);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      return { success: true, user: userData, token };
    } catch (err: any) {
      if (err.message?.includes('incorretos') || err.message?.includes('inválidas') || err.message?.includes('não encontrado')) throw err;
      console.error('Firestore login error:', err);
      throw new Error('Erro ao iniciar sessão na base de dados. Verifica os teus dados.');
    }
  },

  async setupPassword(identifier: string, initialPassword: string, newPassword: string): Promise<{ success: boolean; user: User; token: string; message: string }> {
    const cleanNew = String(newPassword || '').trim();
    if (cleanNew.length < 8 || cleanNew.length > 128) {
      throw new Error('A palavra-passe deve ter entre 8 e 128 caracteres.');
    }

    try {
      const res = await serverApi<{ success: boolean; user: User; token: string; message: string }>('/api/auth/setup-password', {
        method: 'POST',
        body: JSON.stringify({ identifier, initialPassword, newPassword: cleanNew }),
      });
      if (res.token) this.setToken(res.token);
      if (res.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.user));
      return res;
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) throw err;
    }

    // Direct Firestore password setup
    const loginRes = await this.login(identifier, initialPassword);
    const hashed = await hashPasswordClient(cleanNew);
    const now = new Date().toISOString();

    await setDoc(doc(db, 'credentials', loginRes.user.id), {
      userId: loginRes.user.id,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      passwordChangedAt: now,
      updatedAt: now,
    }, { merge: true });

    return {
      success: true,
      user: loginRes.user,
      token: loginRes.token,
      message: 'Palavra-passe definida com sucesso!',
    };
  },

  hasValidSession(userId?: string): boolean {
    const token = this.getToken();
    const rawUser = typeof localStorage !== 'undefined' ? localStorage.getItem(CURRENT_USER_KEY) : null;
    if (!token || !rawUser) return false;
    try {
      const user = JSON.parse(rawUser);
      if (!user || !user.id) return false;
      if (userId) {
        return user.id === userId || isUserAdmin(user.email, user.role);
      }
      return !!user.id;
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

  async fetchTakenPublicIds(): Promise<string[]> {
    try {
      const snap = await getDocs(collection(db, 'publicProfiles'));
      return snap.docs.map(d => String(d.data()?.publicId || '')).filter(Boolean);
    } catch {
      return [];
    }
  },

  async generateUniquePublicId(): Promise<string> {
    const taken = await this.fetchTakenPublicIds();
    return generateSecurePublicId(taken);
  },

  onAuthChange(callback: (user: User | null) => void) {
    const token = this.getToken();
    if (!token) {
      callback(null);
      return () => {};
    }
    const current = this.getCurrentSessionUser();
    callback(current);
    return () => {};
  },

  async getMe(): Promise<{
    user: User;
    progress: ActivityProgress[];
    achievements: UserAchievement[];
    pointsHistory: PointTransaction[];
    dailyTipsCount: number;
  }> {
    const current = this.getCurrentSessionUser();
    if (!current) throw new Error('Utilizador não autenticado.');

    const token = this.getToken();

    // 1. If an active HMAC server session token is present, sync with the server API
    if (token && isServerSessionToken(token)) {
      try {
        const res = await serverApi<any>('/api/auth/me');
        if (res?.user) {
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.user));
          return res;
        }
      } catch (err: any) {
        if (!(err instanceof ServerUnavailableError)) {
          // If transient error, fall through to direct Firestore fetch
        }
      }
    }

    // 2. Direct Firestore fallback (for standalone/offline fallback sessions)
    try {
      const userDoc = await getDoc(doc(db, 'users', current.id));
      const freshUser = userDoc.exists() ? ({ id: userDoc.id, ...userDoc.data() } as User) : current;
      const progSnap = await getDocs(collection(db, 'users', current.id, 'progress'));
      const achSnap = await getDocs(collection(db, 'users', current.id, 'achievements'));
      const dailySnap = await getDocs(collection(db, 'users', current.id, 'dailyTips'));

      const progress = progSnap.docs.map(d => ({ id: d.id, ...d.data() })) as unknown as ActivityProgress[];
      const achievements = achSnap.docs.map(d => ({ id: d.id, ...d.data() })) as unknown as UserAchievement[];

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(freshUser));
      return {
        user: freshUser,
        progress,
        achievements,
        pointsHistory: [],
        dailyTipsCount: dailySnap.size,
      };
    } catch {
      return {
        user: current,
        progress: [],
        achievements: [],
        pointsHistory: [],
        dailyTipsCount: 0,
      };
    }
  },

  async updateAvatar(newAvatar: AvatarConfig): Promise<void> {
    const current = this.getCurrentSessionUser();
    if (!current) return;
    const updatedUser = { ...current, avatar: newAvatar };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    try {
      await serverApi('/api/user/profile', {
        method: 'POST',
        body: JSON.stringify({ avatar: newAvatar }),
      });
      return;
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Avatar] Servidor indisponível, a gravar diretamente no Firestore:', err?.message);
      }
    }

    try {
      const now = new Date().toISOString();
      await setDoc(doc(db, 'users', current.id), { avatar: newAvatar, updatedAt: now }, { merge: true });
      await setDoc(doc(db, 'publicProfiles', current.id), { avatar: newAvatar }, { merge: true });
    } catch (err) {
      console.error('[Avatar] Erro ao gravar avatar no Firestore:', err);
      throw new Error('Não foi possível guardar o novo avatar na base de dados.');
    }
  },

  async updateUserAvatar(userIdOrAvatar: any, maybeAvatar?: any): Promise<void> {
    const avatar = maybeAvatar || userIdOrAvatar;
    return this.updateAvatar(avatar);
  },

  async updateLanguage(newLang: Language): Promise<void> {
    const current = this.getCurrentSessionUser();
    if (!current) return;
    const updatedUser = { ...current, language: newLang };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    try {
      await serverApi('/api/user/profile', {
        method: 'POST',
        body: JSON.stringify({ language: newLang }),
      });
      return;
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Language] Servidor indisponível, a gravar diretamente no Firestore:', err?.message);
      }
    }

    try {
      await setDoc(doc(db, 'users', current.id), { language: newLang, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.error('[Language] Erro ao atualizar idioma no Firestore:', err);
      throw new Error('Não foi possível atualizar o idioma na base de dados.');
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const current = this.getCurrentSessionUser();
    if (!current) throw new Error('Inicia sessão primeiro.');

    const cleanNew = String(newPassword || '').trim();
    if (cleanNew.length < 8 || cleanNew.length > 128) {
      throw new Error('A palavra-passe deve ter entre 8 e 128 caracteres.');
    }

    try {
      return await serverApi('/api/user/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword: cleanNew }),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) throw err;
    }

    const hashed = await hashPasswordClient(cleanNew);
    const now = new Date().toISOString();
    await setDoc(doc(db, 'credentials', current.id), {
      userId: current.id,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      passwordChangedAt: now,
      updatedAt: now,
    }, { merge: true });

    return { success: true, message: 'Palavra-passe atualizada com sucesso!' };
  },

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
    submissionData?: any;
    answers?: any;
    puzzleOrder?: number[];
    completedSteps?: number[];
  }): Promise<{
    success: boolean;
    record: ActivityProgress;
    userPoints: number;
    lastActivity: User['lastActivity'];
    achievements: UserAchievement[];
    earnedPoints?: number;
  }> {
    const current = this.getCurrentSessionUser();
    if (!current) throw new Error('Inicia sessão para guardar o progresso.');
    if (!payload.activityId || !payload.themeId) throw new Error('Identificador da atividade em falta.');

    try {
      const result = await serverApi<any>('/api/progress/save', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (result?.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      return {
        success: true,
        record: result.record,
        userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0),
        lastActivity: result.lastActivity ?? result.user?.lastActivity,
        achievements: result.achievements || [],
        earnedPoints: result.earnedXp ?? result.earnedPoints ?? 0,
      };
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) throw err;
    }

    // Direct Firestore progress persistence
    const calcPercentage = Math.min(100, Math.max(0, Math.round(Number(payload.percentage ?? payload.score ?? 100))));
    const now = new Date().toISOString();
    const progressDocRef = doc(db, 'users', current.id, 'progress', payload.activityId);
    
    let existingData: any = null;
    try {
      const existingSnap = await getDoc(progressDocRef);
      existingData = existingSnap.exists() ? existingSnap.data() : null;
    } catch (e) {
      console.warn('[Progress] Aviso ao ler progresso existente:', e);
    }

    const prevBest = Number(existingData?.bestPercentage || existingData?.bestScore || existingData?.score || 0);
    const newBest = Math.max(prevBest, calcPercentage);
    const earnedXp = Math.max(0, newBest - prevBest);

    const record: ActivityProgress = {
      userId: current.id,
      activityId: payload.activityId,
      activityType: payload.activityType,
      themeId: payload.themeId,
      status: calcPercentage >= 50 ? 'completed' : 'in_progress',
      score: calcPercentage,
      bestScore: newBest,
      bestPercentage: newBest,
      percentage: calcPercentage,
      awardedXp: newBest,
      attempts: (Number(existingData?.attempts) || 0) + 1,
      lastUpdated: now,
    };

    try {
      await setDoc(progressDocRef, record, { merge: true });
    } catch (err) {
      console.error('[Progress] Erro ao gravar registo de progresso no Firestore:', err);
      throw new Error('Não foi possível guardar o progresso da atividade na base de dados.');
    }

    const newPoints = (current.points || 0) + earnedXp;
    const updatedUser: User = {
      ...current,
      points: newPoints,
      lastActivity: {
        themeId: payload.themeId,
        title: payload.activityTitle || payload.activityId,
        timestamp: now,
      },
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    try {
      await setDoc(doc(db, 'users', current.id), {
        points: newPoints,
        lastActivity: updatedUser.lastActivity,
      }, { merge: true });

      await setDoc(doc(db, 'publicProfiles', current.id), {
        points: newPoints,
        turma: current.turma || '',
        avatar: current.avatar,
        role: 'student',
        publicId: current.publicId || current.username?.toUpperCase() || 'ALUNO',
      }, { merge: true });
    } catch (syncErr) {
      console.warn('[Progress] Aviso ao sincronizar perfil público:', syncErr);
    }

    return {
      success: true,
      record,
      userPoints: newPoints,
      lastActivity: updatedUser.lastActivity,
      achievements: [],
      earnedPoints: earnedXp,
    };
  },

  async recordDailyTipRead(tipTitle?: string, dateStr?: string): Promise<{ success: boolean; user: User | null; userPoints: number; earnedPoints: number; achievements: UserAchievement[] }> {
    const current = this.getCurrentSessionUser();
    if (!current) return { success: true, user: null, userPoints: 0, earnedPoints: 0, achievements: [] };

    try {
      const result = await serverApi<any>('/api/daily-tip/read', {
        method: 'POST',
        body: JSON.stringify({ tipTitle, dateStr }),
      });
      if (result?.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      return {
        success: true,
        user: result.user || current,
        userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0),
        earnedPoints: Number(result.earnedPoints || 0),
        achievements: result.achievements || [],
      };
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) throw err;
    }

    const todayStr = dateStr || new Date().toISOString().split('T')[0];
    const tipRef = doc(db, 'users', current.id, 'dailyTips', todayStr);
    let snap: any = null;
    try {
      snap = await getDoc(tipRef);
    } catch (e) {
      console.warn('[DailyTip] Erro ao ler estado da dica diária:', e);
    }
    let earned = 0;

    if (!snap?.exists() || !snap.data()?.read) {
      earned = 20;
      try {
        await setDoc(tipRef, {
          read: true,
          readPoints: 20,
          pointsEarned: 20,
          tipTitle: tipTitle || 'Dica do Dia',
          timestamp: new Date().toISOString(),
        }, { merge: true });

        const newPts = (current.points || 0) + earned;
        const updatedUser = { ...current, points: newPts };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
        await setDoc(doc(db, 'users', current.id), { points: newPts }, { merge: true });
        await setDoc(doc(db, 'publicProfiles', current.id), { points: newPts }, { merge: true });
        return { success: true, user: updatedUser, userPoints: newPts, earnedPoints: earned, achievements: [] };
      } catch (saveErr) {
        console.error('[DailyTip] Erro ao gravar leitura da dica:', saveErr);
        throw new Error('Não foi possível registar os pontos da dica do dia.');
      }
    }

    return { success: true, user: current, userPoints: current.points || 0, earnedPoints: 0, achievements: [] };
  },

  async recordDailyTipBonus(tipTitle: string, bonusPoints = 30, dateStr?: string, answerDetails?: { selectedOptionId: string; isCorrect: boolean }): Promise<{ success: boolean; user: User | null; userPoints: number; earnedPoints: number; readingPoints: number; answerPoints: number; achievements: UserAchievement[] }> {
    const current = this.getCurrentSessionUser();
    if (!current) return { success: true, user: null, userPoints: 0, earnedPoints: 0, readingPoints: 0, answerPoints: 0, achievements: [] };

    try {
      const result = await serverApi<any>('/api/daily-tip/answer', {
        method: 'POST',
        body: JSON.stringify({ tipTitle, bonusPoints, dateStr, selectedOptionId: answerDetails?.selectedOptionId }),
      });
      if (result?.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      return {
        success: true,
        user: result.user || current,
        userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0),
        earnedPoints: Number(result.earnedPoints || 0),
        readingPoints: Number(result.readingPoints || 0),
        answerPoints: Number(result.answerPoints || 0),
        achievements: result.achievements || [],
      };
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) throw err;
    }

    const todayStr = dateStr || new Date().toISOString().split('T')[0];
    const tipRef = doc(db, 'users', current.id, 'dailyTips', todayStr);
    let snap: any = null;
    try {
      snap = await getDoc(tipRef);
    } catch (e) {
      console.warn('[DailyTip] Erro ao ler resposta da dica:', e);
    }
    const isCorrect = answerDetails?.isCorrect ?? true;
    const ansPoints = isCorrect ? Math.min(30, bonusPoints) : 0;

    if (!snap?.exists() || !snap.data()?.answered) {
      try {
        await setDoc(tipRef, {
          answered: true,
          selectedOptionId: answerDetails?.selectedOptionId || '',
          isCorrect,
          answerPoints: ansPoints,
          pointsEarned: (snap?.data()?.readPoints || 20) + ansPoints,
          timestamp: new Date().toISOString(),
        }, { merge: true });

        const newPts = (current.points || 0) + ansPoints;
        const updatedUser = { ...current, points: newPts };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
        await setDoc(doc(db, 'users', current.id), { points: newPts }, { merge: true });
        await setDoc(doc(db, 'publicProfiles', current.id), { points: newPts }, { merge: true });
        return {
          success: true,
          user: updatedUser,
          userPoints: newPts,
          earnedPoints: ansPoints,
          readingPoints: 20,
          answerPoints: ansPoints,
          achievements: [],
        };
      } catch (ansErr) {
        console.error('[DailyTip] Erro ao registar resposta da dica:', ansErr);
        throw new Error('Não foi possível registar o desafio da dica.');
      }
    }

    return {
      success: true,
      user: current,
      userPoints: current.points || 0,
      earnedPoints: 0,
      readingPoints: 20,
      answerPoints: 0,
      achievements: [],
    };
  },

  async getDailyTipStatus(userId: string, dateStr: string): Promise<{ read: boolean; answered: boolean; selectedOptionId: string; isCorrect: boolean; pointsEarned: number; readPoints: number; answerPoints: number; timestamp: string } | null> {
    if (!userId || !dateStr) return null;
    try {
      const res = await serverApi<any>(`/api/daily-tip/status?date=${encodeURIComponent(dateStr)}`);
      return res?.status || null;
    } catch {
      try {
        const snap = await getDoc(doc(db, 'users', userId, 'dailyTips', dateStr));
        if (snap.exists()) {
          const d = snap.data();
          return {
            read: !!d.read,
            answered: !!d.answered,
            selectedOptionId: d.selectedOptionId || '',
            isCorrect: !!d.isCorrect,
            pointsEarned: d.pointsEarned || 0,
            readPoints: d.readPoints || 0,
            answerPoints: d.answerPoints || 0,
            timestamp: d.timestamp || '',
          };
        }
      } catch {}
      return null;
    }
  },

  async getTurmaRankings(_userTurma?: string, _isAdminUser = false): Promise<TurmaRanking[]> {
    try {
      const res = await serverApi<{ rankings: TurmaRanking[] }>('/api/rankings/turmas');
      if (res?.rankings && Array.isArray(res.rankings)) return res.rankings;
    } catch {}

    try {
      const snap = await getDocs(collection(db, 'publicProfiles'));
      const map = new Map<string, { totalPoints: number; studentCount: number }>();
      const defaultList = getTurmasList();
      defaultList.forEach(t => map.set(t, { totalPoints: 0, studentCount: 0 }));

      snap.docs.forEach((d) => {
        const data = d.data();
        if (data.role === 'student' && data.turma) {
          const t = normalizeTurmaName(data.turma);
          const current = map.get(t) || { totalPoints: 0, studentCount: 0 };
          map.set(t, {
            totalPoints: current.totalPoints + (Number(data.points) || 0),
            studentCount: current.studentCount + 1,
          });
        }
      });

      const list: TurmaRanking[] = [];
      map.forEach((val, key) => {
        list.push({
          turma: key,
          totalPoints: val.totalPoints,
          avgPoints: val.studentCount > 0 ? Math.round(val.totalPoints / val.studentCount) : 0,
          studentCount: val.studentCount,
          completedActivities: 0,
          topBadge: '🏆',
          topStudents: [],
        });
      });

      list.sort((a, b) => b.totalPoints - a.totalPoints);
      return list;
    } catch {
      return [];
    }
  },

  async getStudentRankings(
    currentUserId?: string,
    userTurma?: string,
    _isAdminUser = false
  ): Promise<StudentRanking[]> {
    try {
      const queryParam = userTurma ? `?turma=${encodeURIComponent(userTurma)}` : '';
      const res = await serverApi<{ rankings: StudentRanking[] }>(`/api/rankings/students${queryParam}`);
      if (res?.rankings && Array.isArray(res.rankings)) {
        return res.rankings.map((r, idx) => ({
          ...r,
          position: idx + 1,
          isCurrentUser: r.id === currentUserId,
        }));
      }
    } catch {}

    try {
      const snap = await getDocs(collection(db, 'publicProfiles'));
      const list: StudentRanking[] = [];
      snap.docs.forEach((d) => {
        const data = d.data();
        if (data.role === 'student') {
          if (!userTurma || normalizeTurmaName(data.turma) === normalizeTurmaName(userTurma)) {
            list.push({
              id: d.id,
              publicId: data.publicId || 'ALUNO',
              turma: data.turma || '',
              avatar: data.avatar || getDefaultAvatar(data.publicId || 'aluno'),
              points: Number(data.points) || 0,
              position: 1,
              activitiesCount: Number(data.activitiesCount) || 0,
              badgeCount: Number(data.badgeCount) || 0,
              isCurrentUser: d.id === currentUserId,
            });
          }
        }
      });

      list.sort((a, b) => b.points - a.points);
      list.forEach((r, idx) => {
        r.position = idx + 1;
      });
      return list;
    } catch {
      return [];
    }
  },

  async getStudentProgress(studentId: string): Promise<ActivityProgress[]> {
    if (!studentId) return [];
    try {
      const result = await serverApi<{ progress: ActivityProgress[] }>(`/api/teacher/students/${encodeURIComponent(studentId)}/progress`);
      return result?.progress || [];
    } catch {}

    try {
      const snap = await getDocs(collection(db, 'users', studentId, 'progress'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() })) as unknown as ActivityProgress[];
    } catch {
      return [];
    }
  },

  async getStudentsProgressBatch(studentIds: string[]): Promise<Record<string, ActivityProgress[]>> {
    const result: Record<string, ActivityProgress[]> = {};
    if (!studentIds || studentIds.length === 0) return result;

    try {
      const serverRes = await serverApi<{ progressMap: Record<string, ActivityProgress[]> }>('/api/teacher/students/progress-batch', {
        method: 'POST',
        body: JSON.stringify({ studentIds }),
      });
      return serverRes?.progressMap || {};
    } catch {}

    await Promise.allSettled(
      studentIds.map(async (sid) => {
        try {
          const snap = await getDocs(collection(db, 'users', sid, 'progress'));
          result[sid] = snap.docs.map(d => ({ id: d.id, ...d.data() })) as unknown as ActivityProgress[];
        } catch {
          result[sid] = [];
        }
      })
    );
    return result;
  },

  async getAllStudentsForAdmin(): Promise<User[]> {
    try {
      const result = await serverApi<{ students: User[] }>('/api/teacher/students');
      if (result?.students && Array.isArray(result.students)) {
        return result.students.sort((a, b) => (a.turma || '5.º A').localeCompare(b.turma || '5.º A') || (b.points || 0) - (a.points || 0));
      }
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        // Continue to fallback
      }
    }

    try {
      const snap = await getDocs(collection(db, 'users'));
      const students: User[] = [];
      snap.docs.forEach((d) => {
        const u = d.data() as User;
        u.id = d.id;
        if (u.role !== 'teacher' && !isUserAdmin(u.email, u.role)) {
          students.push(u);
        }
      });
      return students.sort((a, b) => (a.turma || '5.º A').localeCompare(b.turma || '5.º A') || (b.points || 0) - (a.points || 0));
    } catch (err) {
      console.error('Firestore students load error:', err);
      return [];
    }
  },

  async adminUpdateStudent(
    studentId: string,
    emailOrUpdates: any,
    maybeUpdates?: any
  ): Promise<{ success: boolean; message: string }> {
    if (!studentId) throw new Error('Identificador do aluno não fornecido.');
    const updates = maybeUpdates !== undefined ? maybeUpdates : emailOrUpdates;

    try {
      return await serverApi(`/api/teacher/students/${encodeURIComponent(studentId)}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) throw err;
    }

    const now = new Date().toISOString();
    const userUpdates: any = {};

    if (updates?.newName) {
      const parsed = parseStudentName(updates.newName);
      userUpdates.name = parsed.fullName;
      userUpdates.fullName = parsed.fullName;
      userUpdates.firstName = parsed.firstName;
      userUpdates.lastName = parsed.lastName;
      userUpdates.greetingName = parsed.greetingName;
    }

    if (updates?.newTurma) {
      userUpdates.turma = normalizeTurmaName(updates.newTurma);
    }

    await setDoc(doc(db, 'users', studentId), userUpdates, { merge: true });

    if (updates?.newPassword) {
      const hashed = await hashPasswordClient(updates.newPassword);
      await setDoc(doc(db, 'credentials', studentId), {
        userId: studentId,
        passwordHash: hashed.hash,
        passwordSalt: hashed.salt,
        passwordChangedAt: now,
        updatedAt: now,
      }, { merge: true });
    }

    if (userUpdates.turma) {
      await setDoc(doc(db, 'publicProfiles', studentId), { turma: userUpdates.turma }, { merge: true }).catch(() => {});
    }

    return { success: true, message: 'Dados do aluno atualizados com sucesso.' };
  },

  async parseStudentsFile(
    fileBase64: string,
    fileName: string,
    defaultTurma = '5.º A'
  ): Promise<{
    success: boolean;
    count: number;
    rawData: Array<{ name: string; turma: string }>;
    students: Array<{ number?: number; name: string; turma?: string; sourceFile?: string }>;
    filesProcessed?: string[];
  }> {
    const commaIdx = fileBase64.indexOf(',');
    const cleanBase64 = commaIdx >= 0 ? fileBase64.substring(commaIdx + 1) : fileBase64;
    const lowerName = fileName.toLowerCase();
    const isPdfOrZip = lowerName.endsWith('.pdf') || lowerName.endsWith('.zip');

    // 1. PDF and ZIP files must be parsed by the authoritative server engine
    if (isPdfOrZip) {
      try {
        const sRes = await serverApi<any>('/api/teacher/parse-file', {
          method: 'POST',
          body: JSON.stringify({ base64: cleanBase64, filename: fileName, defaultTurma }),
        });
        if (sRes && Array.isArray(sRes.students)) {
          return {
            success: true,
            count: sRes.count ?? sRes.students.length,
            rawData: sRes.rawData ?? sRes.students,
            students: sRes.students.map((s: any, idx: number) => ({
              number: s.number ?? idx + 1,
              name: String(s.name || '').trim(),
              turma: normalizeTurmaName(s.turma) || defaultTurma,
              sourceFile: s.sourceFile || fileName,
            })),
            filesProcessed: sRes.filesProcessed || [fileName],
          };
        }
      } catch (srvErr) {
        console.warn('Server parse-file error for PDF/ZIP:', srvErr);
        throw srvErr;
      }
    }

    // 2. Client-side Excel / CSV parser with SheetJS
    try {
      const binaryString = atob(cleanBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const wb = XLSX.read(bytes, { type: 'array' });
      const extracted: Array<{ number: number; name: string; turma: string; sourceFile: string }> = [];

      wb.SheetNames.forEach((sheetName) => {
        const ws = wb.Sheets[sheetName];
        if (!ws) return;
        const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        let rowNum = 1;
        rows.forEach((row) => {
          if (!row || row.length === 0) return;
          const lineStr = row.map(c => String(c || '').trim()).filter(Boolean).join(' ');
          if (lineStr.length >= 3 && !lineStr.toLowerCase().includes('número') && !lineStr.toLowerCase().includes('nome do aluno')) {
            extracted.push({
              number: rowNum++,
              name: lineStr,
              turma: normalizeTurmaName(sheetName) || defaultTurma,
              sourceFile: fileName,
            });
          }
        });
      });

      if (extracted.length > 0) {
        return {
          success: true,
          count: extracted.length,
          rawData: extracted.map(e => ({ name: e.name, turma: e.turma })),
          students: extracted,
          filesProcessed: [fileName],
        };
      }
    } catch (err: any) {
      console.warn('Direct client parse warning, falling back to server:', err);
    }

    // 3. Fallback to server engine if client parsing returned no rows
    try {
      const sRes = await serverApi<any>('/api/teacher/parse-file', {
        method: 'POST',
        body: JSON.stringify({ base64: cleanBase64, filename: fileName, defaultTurma }),
      });
      if (sRes && Array.isArray(sRes.students)) {
        return {
          success: true,
          count: sRes.count ?? sRes.students.length,
          rawData: sRes.rawData ?? sRes.students,
          students: sRes.students.map((s: any, idx: number) => ({
            number: s.number ?? idx + 1,
            name: String(s.name || '').trim(),
            turma: normalizeTurmaName(s.turma) || defaultTurma,
            sourceFile: s.sourceFile || fileName,
          })),
          filesProcessed: sRes.filesProcessed || [fileName],
        };
      }
    } catch (fallbackErr) {
      console.warn('Server fallback parse error:', fallbackErr);
    }

    return {
      success: true,
      count: 0,
      rawData: [],
      students: [],
      filesProcessed: [fileName],
    };
  },

  async importStudentsBatch(
    students: Array<{ name: string; turma?: string }>,
    defaultTurma = '5.º A',
    wipeFirst = false
  ): Promise<{
    success: boolean;
    createdCount: number;
    existedCount: number;
    created: Array<{ id: string; name: string; turma: string; username: string; password: string }>;
    existed: Array<{ id: string; name: string; turma: string; username: string }>;
    updated?: Array<any>;
    errors: Array<{ name?: string; turma?: string; error: string }>;
    summary?: { created: number; existed: number; errors: number };
    wipedBefore?: boolean;
    wipedStats?: any;
  }> {
    try {
      const res = await serverApi<any>('/api/teacher/import-students', {
        method: 'POST',
        body: JSON.stringify({ students, defaultTurma, wipeFirst }),
      });
      return {
        success: true,
        createdCount: res.createdCount ?? (res.created?.length || 0),
        existedCount: res.existedCount ?? (res.existed?.length || 0),
        created: res.created || [],
        existed: res.existed || [],
        updated: res.updated || [],
        errors: res.errors || [],
        summary: res.summary || {
          created: res.created?.length || 0,
          existed: res.existed?.length || 0,
          errors: res.errors?.length || 0,
        },
        wipedBefore: res.wipedBefore,
        wipedStats: res.wipedStats,
      };
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        // Fallback to client
      }
    }

    // Direct Firestore Batch Creation (No plain text passwords stored in DB!)
    const created: Array<{ id: string; name: string; turma: string; username: string; password: string }> = [];
    const existed: Array<{ id: string; name: string; turma: string; username: string }> = [];
    const errors: Array<{ name?: string; turma?: string; error: string }> = [];

    try {
      if (wipeFirst) {
        const snap = await getDocs(collection(db, 'users'));
        for (const d of snap.docs) {
          const u = d.data();
          if (u.role !== 'teacher' && !isUserAdmin(u.email, u.role)) {
            await deleteDoc(doc(db, 'users', d.id)).catch(() => {});
            await deleteDoc(doc(db, 'credentials', d.id)).catch(() => {});
            await deleteDoc(doc(db, 'publicProfiles', d.id)).catch(() => {});
          }
        }
      }

      const existingUsersSnap = await getDocs(collection(db, 'users'));
      const existingUsernames = new Set<string>();
      const existingList: any[] = [];

      existingUsersSnap.docs.forEach((d) => {
        const data = d.data();
        if (data.username) existingUsernames.add(String(data.username).toLowerCase());
        existingList.push({ id: d.id, ...data });
      });

      for (const item of students) {
        const cleanName = (item.name || '').trim();
        const cleanTurma = normalizeTurmaName(item.turma || defaultTurma);
        if (!cleanName || cleanName.length < 2) continue;

        const matched = existingList.find(s => {
          const sTurma = normalizeTurmaName(s.turma || '');
          if (sTurma !== cleanTurma) return false;
          const sName = String(s.fullName || s.name || '').trim().toLowerCase();
          return sName === cleanName.toLowerCase();
        });

        if (matched) {
          existed.push({
            id: matched.id,
            name: cleanName,
            turma: cleanTurma,
            username: matched.username || '',
          });
          continue;
        }

        try {
          const { fullName, firstName, lastName, greetingName } = parseStudentName(cleanName);
          const username = generateKidUsername(fullName, cleanTurma, existingUsernames);
          const password = generateKidPassword(new Set());
          const userId = `std_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          const now = new Date().toISOString();
          const publicId = username.toUpperCase();

          const hashed = await hashPasswordClient(password);

          // 1. users document (STRICT: NO PASSWORDS)
          const userData: User = {
            id: userId,
            name: fullName,
            fullName,
            firstName,
            lastName,
            greetingName,
            username,
            turma: cleanTurma,
            email: `${username}@aluno.tic`,
            publicId,
            role: 'student',
            language: 'pt',
            points: 0,
            avatar: getDefaultAvatar(username),
            createdAt: now,
          };

          // 2. credentials document (Hash & Salt only)
          const credData = {
            userId,
            passwordHash: hashed.hash,
            passwordSalt: hashed.salt,
            passwordChangedAt: now,
            createdAt: now,
            updatedAt: now,
          };

          // 3. publicProfiles document
          const publicData = {
            id: userId,
            publicId,
            turma: cleanTurma,
            avatar: getDefaultAvatar(username),
            points: 0,
            role: 'student',
          };

          await setDoc(doc(db, 'users', userId), userData);
          await setDoc(doc(db, 'credentials', userId), credData);
          await setDoc(doc(db, 'publicProfiles', userId), publicData);

          existingUsernames.add(username.toLowerCase());
          existingList.push(userData);

          created.push({
            id: userId,
            name: fullName,
            turma: cleanTurma,
            username,
            password, // Delivered once to the teacher for printing
          });
        } catch (subErr: any) {
          errors.push({ name: cleanName, turma: cleanTurma, error: subErr.message || 'Erro ao criar aluno' });
        }
      }

      return {
        success: true,
        createdCount: created.length,
        existedCount: existed.length,
        created,
        existed,
        updated: [],
        errors,
        summary: {
          created: created.length,
          existed: existed.length,
          errors: errors.length,
        },
        wipedBefore: wipeFirst,
      };
    } catch (err: any) {
      console.error('Firestore batch import error:', err);
      throw new Error(err.message || 'Erro ao importar alunos na base de dados.');
    }
  },

  async resetStudentPassword(userId: string): Promise<{ success: boolean; newPassword: string; message: string }> {
    try {
      return await serverApi(`/api/teacher/students/${encodeURIComponent(userId)}/reset-password`, {
        method: 'POST',
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) throw err;
    }

    const newPassword = generateKidPassword(new Set());
    const hashed = await hashPasswordClient(newPassword);
    const now = new Date().toISOString();

    await setDoc(doc(db, 'credentials', userId), {
      userId,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      passwordChangedAt: now,
      updatedAt: now,
    }, { merge: true });

    return {
      success: true,
      newPassword,
      message: 'Palavra-passe redefinida com sucesso!',
    };
  },

  async adminDeleteStudent(studentId: string, _email?: string): Promise<{ success: boolean; message: string }> {
    if (!studentId) throw new Error('Identificador do aluno não fornecido.');

    try {
      const result = await serverApi<{ success: boolean; message: string }>(`/api/teacher/students/${encodeURIComponent(studentId)}`, {
        method: 'DELETE',
      });
      localStorage.removeItem(PROGRESS_STORAGE_KEY + studentId);
      localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + studentId);
      localStorage.removeItem(POINTS_STORAGE_KEY + studentId);
      return result;
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Admin] Servidor indisponível, a eliminar diretamente no Firestore:', err?.message);
      }
    }

    try {
      await deleteDoc(doc(db, 'users', studentId));
      await deleteDoc(doc(db, 'credentials', studentId)).catch((e) => console.warn('[Admin] Credencial já inexistente:', e));
      await deleteDoc(doc(db, 'publicProfiles', studentId)).catch((e) => console.warn('[Admin] Perfil público já inexistente:', e));

      localStorage.removeItem(PROGRESS_STORAGE_KEY + studentId);
      localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + studentId);
      localStorage.removeItem(POINTS_STORAGE_KEY + studentId);
      return { success: true, message: 'Aluno eliminado com sucesso.' };
    } catch (err: any) {
      console.error('[Admin] Erro ao eliminar aluno no Firestore:', err);
      throw new Error('Não foi possível eliminar o aluno da base de dados.');
    }
  },

  async adminDeleteStudents(studentIds: string[]): Promise<{ success: boolean; message: string }> {
    if (!studentIds?.length) return { success: true, message: 'Nenhum aluno selecionado.' };

    try {
      return await serverApi('/api/teacher/students-bulk', {
        method: 'DELETE',
        body: JSON.stringify({ studentIds }),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Admin] Servidor indisponível, a eliminar lote no Firestore:', err?.message);
      }
    }

    try {
      for (const sid of studentIds) {
        await deleteDoc(doc(db, 'users', sid)).catch((e) => console.warn('[Admin] Erro ao eliminar user:', sid, e));
        await deleteDoc(doc(db, 'credentials', sid)).catch((e) => console.warn('[Admin] Erro ao eliminar cred:', sid, e));
        await deleteDoc(doc(db, 'publicProfiles', sid)).catch((e) => console.warn('[Admin] Erro ao eliminar publicProfile:', sid, e));
      }
      return { success: true, message: `${studentIds.length} alunos eliminados com sucesso.` };
    } catch (err: any) {
      console.error('[Admin] Erro na eliminação em lote no Firestore:', err);
      throw new Error('Não foi possível concluir a eliminação de todos os alunos.');
    }
  },

  async adminCreateTurma(turmaName: string): Promise<{ success: boolean; message: string; turmas: string[] }> {
    const clean = turmaName.trim();
    if (!clean) throw new Error('Nome de turma inválido.');

    const current = getTurmasList();
    const updated = Array.from(new Set([...current, clean]));
    saveTurmasList(updated);

    try {
      await setDoc(doc(db, 'config', 'turmas'), { list: updated, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.warn('[Admin] Aviso ao guardar turmas no Firestore:', err);
    }

    try {
      await serverApi('/api/teacher/turmas', {
        method: 'POST',
        body: JSON.stringify({ name: clean }),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Admin] Erro ao sincronizar nova turma com o servidor:', err?.message);
      }
    }

    return { success: true, message: `Turma ${clean} criada com sucesso.`, turmas: updated };
  },

  async adminDeleteStudentsByTurmas(turmas: string[]): Promise<{ success: boolean; message: string }> {
    const normalizedSet = new Set(turmas.map(t => normalizeTurmaName(t)));
    try {
      const snap = await getDocs(collection(db, 'users'));

      for (const d of snap.docs) {
        const u = d.data();
        if (u.role !== 'teacher' && !isUserAdmin(u.email, u.role) && normalizedSet.has(normalizeTurmaName(u.turma || ''))) {
          await deleteDoc(doc(db, 'users', d.id)).catch((e) => console.warn('[Admin] Erro ao apagar utilizador de turma:', e));
          await deleteDoc(doc(db, 'credentials', d.id)).catch((e) => console.warn('[Admin] Erro ao apagar credenciais de turma:', e));
          await deleteDoc(doc(db, 'publicProfiles', d.id)).catch((e) => console.warn('[Admin] Erro ao apagar perfil público de turma:', e));
        }
      }
    } catch (err) {
      console.error('[Admin] Erro ao eliminar alunos por turma no Firestore:', err);
    }

    try {
      await serverApi('/api/teacher/students-by-turmas', {
        method: 'DELETE',
        body: JSON.stringify({ turmas }),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Admin] Erro ao contactar endpoint de eliminação por turmas:', err?.message);
      }
    }

    return { success: true, message: 'Alunos da turma eliminados com sucesso.' };
  },

  async adminDeleteTurmas(turmas: string[], deleteStudents = true): Promise<{ success: boolean; message: string; turmas: string[] }> {
    if (deleteStudents) {
      await this.adminDeleteStudentsByTurmas(turmas);
    }

    const normalizedToRemove = new Set(turmas.map(t => normalizeTurmaName(t)));
    const current = getTurmasList();
    const updated = current.filter(t => !normalizedToRemove.has(normalizeTurmaName(t)));
    saveTurmasList(updated);

    try {
      await setDoc(doc(db, 'config', 'turmas'), { list: updated, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.warn('[Admin] Aviso ao atualizar turmas no Firestore:', err);
    }

    try {
      await serverApi('/api/teacher/turmas', {
        method: 'DELETE',
        body: JSON.stringify({ turmas, deleteStudents }),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Admin] Erro ao contactar endpoint de remoção de turmas:', err?.message);
      }
    }

    return { success: true, message: 'Turmas eliminadas com sucesso.', turmas: updated };
  },

  async adminDeleteAllStudents(): Promise<{ success: boolean; message: string }> {
    return this.adminPurgeAllData();
  },

  async adminPurgeAllData(): Promise<{ success: boolean; message: string }> {
    try {
      const snap = await getDocs(collection(db, 'users'));
      for (const d of snap.docs) {
        const u = d.data();
        if (u.role !== 'teacher' && !isUserAdmin(u.email, u.role)) {
          await deleteDoc(doc(db, 'users', d.id)).catch((e) => console.warn('[Purge] Erro user:', e));
          await deleteDoc(doc(db, 'credentials', d.id)).catch((e) => console.warn('[Purge] Erro cred:', e));
          await deleteDoc(doc(db, 'publicProfiles', d.id)).catch((e) => console.warn('[Purge] Erro profile:', e));
        }
      }
    } catch (err) {
      console.error('[Purge] Erro ao apagar alunos do Firestore:', err);
    }

    try {
      await serverApi('/api/teacher/purge-all-data', { method: 'DELETE' });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[Purge] Erro no endpoint purge-all-data:', err?.message);
      }
    }

    return { success: true, message: 'Todos os alunos e registos foram eliminados de raiz.' };
  },

  async getThemeVisibility(): Promise<ThemeVisibilityMap> {
    try {
      const res = await serverApi<{ visibility: ThemeVisibilityMap }>('/api/config/theme-visibility');
      if (res?.visibility) {
        localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(res.visibility));
        return { ...DEFAULT_THEME_VISIBILITY, ...res.visibility };
      }
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[ThemeVisibility] Erro ao consultar servidor:', err?.message);
      }
    }
    try {
      const snap = await getDoc(doc(db, 'config', 'theme_visibility'));
      if (snap.exists() && snap.data()?.visibility) {
        return { ...DEFAULT_THEME_VISIBILITY, ...snap.data()?.visibility };
      }
    } catch (err) {
      console.warn('[ThemeVisibility] Erro ao consultar Firestore:', err);
    }
    const local = localStorage.getItem(THEME_VISIBILITY_KEY);
    if (local) {
      try { return { ...DEFAULT_THEME_VISIBILITY, ...JSON.parse(local) }; } catch {}
    }
    return { ...DEFAULT_THEME_VISIBILITY };
  },

  async saveThemeVisibility(newVisibility: ThemeVisibilityMap): Promise<{ success: boolean; visibility: ThemeVisibilityMap }> {
    const merged = { ...DEFAULT_THEME_VISIBILITY, ...newVisibility };
    localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent('tic_theme_visibility_updated', { detail: merged }));

    try {
      await setDoc(doc(db, 'config', 'theme_visibility'), { visibility: merged, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.warn('[ThemeVisibility] Erro ao gravar no Firestore:', err);
    }

    try {
      await serverApi('/api/config/theme-visibility', {
        method: 'POST',
        body: JSON.stringify({ visibility: merged }),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[ThemeVisibility] Erro ao sincronizar com servidor:', err?.message);
      }
    }
    return { success: true, visibility: merged };
  },

  async toggleThemeVisibility(themeId: string, forcedState?: boolean): Promise<{ success: boolean; visibility: ThemeVisibilityMap }> {
    const current = await this.getThemeVisibility();
    const nextState = forcedState !== undefined ? forcedState : !(current[themeId] !== false);
    const updated = { ...current, [themeId]: nextState };
    await this.saveThemeVisibility(updated);
    return { success: true, visibility: updated };
  },

  onThemeVisibilityChange(callback: (visibility: ThemeVisibilityMap) => void): () => void {
    const handleLocalUpdate = (e: any) => { if (e?.detail) callback(e.detail); };
    window.addEventListener('tic_theme_visibility_updated', handleLocalUpdate);
    let unsubscribeFirestore = () => {};
    try {
      unsubscribeFirestore = onSnapshot(doc(db, 'config', 'theme_visibility'), (snapshot) => {
        if (snapshot.exists() && snapshot.data()?.visibility) {
          const merged = { ...DEFAULT_THEME_VISIBILITY, ...snapshot.data()?.visibility };
          localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(merged));
          callback(merged);
        }
      }, (err) => console.warn('[ThemeVisibility] Snapshot listener warning:', err?.message));
    } catch {}
    return () => {
      window.removeEventListener('tic_theme_visibility_updated', handleLocalUpdate);
      unsubscribeFirestore();
    };
  },

  async getQuizVisibility(): Promise<QuizVisibilityMap> {
    try {
      const res = await serverApi<{ visibility: QuizVisibilityMap }>('/api/config/quiz-visibility');
      if (res?.visibility) {
        localStorage.setItem(QUIZ_VISIBILITY_KEY, JSON.stringify(res.visibility));
        return { ...DEFAULT_QUIZ_VISIBILITY, ...res.visibility };
      }
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[QuizVisibility] Erro ao consultar servidor:', err?.message);
      }
    }
    try {
      const snap = await getDoc(doc(db, 'config', 'quiz_visibility'));
      if (snap.exists() && snap.data()?.visibility) {
        return { ...DEFAULT_QUIZ_VISIBILITY, ...snap.data()?.visibility };
      }
    } catch (err) {
      console.warn('[QuizVisibility] Erro ao consultar Firestore:', err);
    }
    const local = localStorage.getItem(QUIZ_VISIBILITY_KEY);
    if (local) {
      try { return { ...DEFAULT_QUIZ_VISIBILITY, ...JSON.parse(local) }; } catch {}
    }
    return { ...DEFAULT_QUIZ_VISIBILITY };
  },

  async saveQuizVisibility(newVisibility: QuizVisibilityMap): Promise<{ success: boolean; visibility: QuizVisibilityMap }> {
    const merged = { ...DEFAULT_QUIZ_VISIBILITY, ...newVisibility };
    localStorage.setItem(QUIZ_VISIBILITY_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent('tic_quiz_visibility_updated', { detail: merged }));

    try {
      await setDoc(doc(db, 'config', 'quiz_visibility'), { visibility: merged, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.warn('[QuizVisibility] Erro ao gravar no Firestore:', err);
    }

    try {
      await serverApi('/api/config/quiz-visibility', {
        method: 'POST',
        body: JSON.stringify({ visibility: merged }),
      });
    } catch (err: any) {
      if (!(err instanceof ServerUnavailableError)) {
        console.warn('[QuizVisibility] Erro ao sincronizar com servidor:', err?.message);
      }
    }
    return { success: true, visibility: merged };
  },

  async toggleQuizVisibility(themeId: string, forcedState?: boolean): Promise<{ success: boolean; visibility: QuizVisibilityMap }> {
    const current = await this.getQuizVisibility();
    const nextState = forcedState !== undefined ? forcedState : !(current[themeId] === true);
    const updated = { ...current, [themeId]: nextState };
    await this.saveQuizVisibility(updated);
    return { success: true, visibility: updated };
  },

  onQuizVisibilityChange(callback: (visibility: QuizVisibilityMap) => void): () => void {
    const handleLocalUpdate = (e: any) => { if (e?.detail) callback(e.detail); };
    window.addEventListener('tic_quiz_visibility_updated', handleLocalUpdate);
    let unsubscribeFirestore = () => {};
    try {
      unsubscribeFirestore = onSnapshot(doc(db, 'config', 'quiz_visibility'), (snapshot) => {
        if (snapshot.exists() && snapshot.data()?.visibility) {
          const merged = { ...DEFAULT_QUIZ_VISIBILITY, ...snapshot.data()?.visibility };
          localStorage.setItem(QUIZ_VISIBILITY_KEY, JSON.stringify(merged));
          callback(merged);
        }
      }, (err) => console.warn('[QuizVisibility] Snapshot listener warning:', err?.message));
    } catch {}
    return () => {
      window.removeEventListener('tic_quiz_visibility_updated', handleLocalUpdate);
      unsubscribeFirestore();
    };
  },

  async recalibratePoints(): Promise<{ success: boolean; message: string; count: number }> {
    const snap = await getDocs(collection(db, 'users'));
    let count = 0;
    for (const d of snap.docs) {
      const u = d.data();
      if (u.role === 'student') {
        const progSnap = await getDocs(collection(db, 'users', d.id, 'progress'));
        let total = 0;
        progSnap.docs.forEach((pDoc) => {
          const p = pDoc.data();
          const best = Number(p.bestPercentage || p.bestScore || p.score || 0);
          total += Math.min(100, Math.max(0, best));
        });
        const dailySnap = await getDocs(collection(db, 'users', d.id, 'dailyTips'));
        dailySnap.docs.forEach((dtDoc) => {
          total += Number(dtDoc.data()?.pointsEarned || 0);
        });

        await updateDoc(d.ref, { points: total, updatedAt: new Date().toISOString() });
        await setDoc(doc(db, 'publicProfiles', d.id), { points: total }, { merge: true });
        count++;
      }
    }
    return { success: true, message: `Pontuações de ${count} alunos recalibradas com sucesso.`, count };
  },
};
