import {
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
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
import { getTurmasList } from '../data/turmasData';
import { getDefaultAvatar } from '../utils/avatarUtils';
import { isValidActivityId } from '../data/activityCatalog';

const TOKEN_KEY = 'tic_5ano_auth_token';
const CURRENT_USER_KEY = 'tic_5ano_current_user';
const PROGRESS_STORAGE_KEY = 'tic_5ano_progress_';
const ACHIEVEMENTS_STORAGE_KEY = 'tic_5ano_achievements_';
const POINTS_STORAGE_KEY = 'tic_5ano_points_';
const THEME_VISIBILITY_KEY = 'tic_5ano_theme_visibility';
const QUIZ_VISIBILITY_KEY = 'tic_5ano_quiz_visibility';

function resolveApiBaseUrl(): string {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/$/, '');
  }
  // In browser development or web hosting on same domain, relative URL is used
  if (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    return '';
  }
  // In native Android APK / Capacitor (file:// protocol) where VITE_API_URL was not injected
  return '';
}

const API_BASE_URL = resolveApiBaseUrl();

async function serverApi<T>(path: string, init: RequestInit = {}, retryCount = 1): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let url = `${API_BASE_URL}${path}`;

  // If in mobile environment or file:// protocol and base URL is missing
  if (typeof window !== 'undefined' && window.location.protocol === 'file:' && !API_BASE_URL) {
    throw new Error('O URL do backend de produção não está configurado. Por favor define a variável de ambiente VITE_API_URL no build da aplicação.');
  }

  try {
    let response = await fetch(url, {
      ...init,
      headers,
    });

    let body: any = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        body = await response.json();
      } catch {
        /* invalid json body */
      }
    } else if ((response.status >= 500 || response.status === 404 || response.status === 405 || response.status === 0) && retryCount > 0) {
      // Server cold-start returning non-JSON: wait 1.5s and retry once
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return serverApi<T>(path, init, retryCount - 1);
    }

    if (!response.ok) {
      const errorMsg = body?.error || `Erro de servidor (${response.status})`;
      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
        window.dispatchEvent(new CustomEvent('tic_session_expired'));
      }
      throw new Error(errorMsg);
    }

    return body as T;
  } catch (err: any) {
    if (err?.message?.includes('Failed to fetch') || err?.message?.includes('NetworkError')) {
      if (retryCount > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return serverApi<T>(path, init, retryCount - 1);
      }
      throw new Error('Não foi possível comunicar com o servidor. Verifica a tua ligação à Internet.');
    }
    throw err;
  }
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
  'correio-eletronico': true,
  'tic-sociedade': true,
  'ergonomia': true,
  'seguranca': true,
  'palavras-passe': true,
  'navegar-internet': true,
  'direitos-autor': true,
};

export function isUserAdmin(email?: string | null, role?: string): boolean {
  if (role === 'admin' || role === 'teacher') return true;
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  const adminEmails = [
    'imaginebycarla2023@gmail.com',
    'imaginebacarla2023@gmail.com',
    'prof.carla@escola.pt',
    'carla.oliveira@escola.pt',
  ];
  return adminEmails.includes(normalized);
}

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

  async logout(): Promise<void> {
    try {
      await serverApi('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore network errors on logout
    } finally {
      this.removeToken();
      window.dispatchEvent(new CustomEvent('tic_user_logged_out'));
    }
  },

  async login(identifier: string, password: string): Promise<{ success: boolean; user: User; token: string }> {
    const res = await serverApi<{ success: boolean; user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
    if (res.token) {
      this.setToken(res.token);
    }
    if (res.user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.user));
    }
    return res;
  },

  async setupPassword(identifier: string, initialPassword: string, newPassword: string): Promise<{ success: boolean; user: User; token: string; message: string }> {
    const res = await serverApi<{ success: boolean; user: User; token: string; message: string }>('/api/auth/setup-password', {
      method: 'POST',
      body: JSON.stringify({ identifier, initialPassword, newPassword }),
    });
    if (res.token) {
      this.setToken(res.token);
    }
    if (res.user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.user));
    }
    return res;
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
      const res = await serverApi<{ taken: string[] }>('/api/public-ids/taken');
      return res?.taken || [];
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
    if (!token) { callback(null); return () => {}; }
    serverApi<{ user: User }>('/api/auth/me')
      .then(({ user }) => {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        callback(user);
      })
      .catch(() => {
        this.removeToken();
        callback(null);
      });
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
    try {
      const res = await serverApi<{
        user: User;
        progress: ActivityProgress[];
        achievements: UserAchievement[];
        pointsHistory: PointTransaction[];
        dailyTipsCount: number;
      }>('/api/auth/me');

      if (res?.user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.user));
        if (res.progress) localStorage.setItem(PROGRESS_STORAGE_KEY + res.user.id, JSON.stringify(res.progress));
        if (res.achievements) localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + res.user.id, JSON.stringify(res.achievements));
        if (res.pointsHistory) localStorage.setItem(POINTS_STORAGE_KEY + res.user.id, JSON.stringify(res.pointsHistory));
      }
      return res;
    } catch (err) {
      if (current) {
        const cachedProgress = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + current.id) || '[]');
        const cachedAchievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + current.id) || '[]');
        const cachedPoints = JSON.parse(localStorage.getItem(POINTS_STORAGE_KEY + current.id) || '[]');
        return {
          user: current,
          progress: cachedProgress,
          achievements: cachedAchievements,
          pointsHistory: cachedPoints,
          dailyTipsCount: 0,
        };
      }
      throw err;
    }
  },

  async updateAvatar(newAvatar: AvatarConfig): Promise<void> {
    const current = this.getCurrentSessionUser();
    if (!current) return;
    const result = await serverApi<{ user: User }>('/api/user/profile', {
      method: 'POST',
      body: JSON.stringify({ avatar: newAvatar }),
    });
    if (result?.user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    }
  },

  async updateUserAvatar(userIdOrAvatar: any, maybeAvatar?: any): Promise<void> {
    const avatar = maybeAvatar || userIdOrAvatar;
    return this.updateAvatar(avatar);
  },

  async updateLanguage(newLang: Language): Promise<void> {
    const current = this.getCurrentSessionUser();
    if (!current) return;
    const result = await serverApi<{ user: User }>('/api/user/profile', {
      method: 'POST',
      body: JSON.stringify({ language: newLang }),
    });
    if (result?.user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return await serverApi('/api/user/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
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
    if (!isValidActivityId(payload.activityId)) throw new Error(`Atividade inválida ou não reconhecida no currículo: ${payload.activityId}`);

    const result = await serverApi<any>('/api/progress/save', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (result.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    if (result.record) {
      const cached = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + current.id) || '[]') as ActivityProgress[];
      localStorage.setItem(PROGRESS_STORAGE_KEY + current.id, JSON.stringify([...cached.filter(p => p.activityId !== payload.activityId), result.record]));
    }
    if (result.achievements) localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + current.id, JSON.stringify(result.achievements));

    return {
      success: true,
      record: result.record,
      userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0),
      lastActivity: result.lastActivity ?? result.user?.lastActivity,
      achievements: result.achievements || [],
      earnedPoints: result.earnedXp ?? result.earnedPoints ?? 0,
    };
  },

  async recordDailyTipRead(tipTitle?: string, dateStr?: string): Promise<{ success: boolean; user: User | null; userPoints: number; earnedPoints: number; achievements: UserAchievement[] }> {
    const current = this.getCurrentSessionUser();
    if (!current) return { success: true, user: null, userPoints: 0, earnedPoints: 0, achievements: [] };
    const result = await serverApi<any>('/api/daily-tip/read', {
      method: 'POST',
      body: JSON.stringify({ tipTitle, dateStr }),
    });
    if (result.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    if (result.achievements) localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + current.id, JSON.stringify(result.achievements));
    return {
      success: true,
      user: result.user || current,
      userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0),
      earnedPoints: Number(result.earnedPoints || 0),
      achievements: result.achievements || [],
    };
  },

  async recordDailyTipBonus(tipTitle: string, bonusPoints = 30, dateStr?: string, answerDetails?: { selectedOptionId: string; isCorrect: boolean }): Promise<{ success: boolean; user: User | null; userPoints: number; earnedPoints: number; readingPoints: number; answerPoints: number; achievements: UserAchievement[] }> {
    const current = this.getCurrentSessionUser();
    if (!current) return { success: true, user: null, userPoints: 0, earnedPoints: 0, readingPoints: 0, answerPoints: 0, achievements: [] };
    if (!answerDetails?.selectedOptionId) throw new Error('Resposta da Dica do Dia não fornecida.');
    const result = await serverApi<any>('/api/daily-tip/answer', {
      method: 'POST',
      body: JSON.stringify({ tipTitle, bonusPoints, dateStr, selectedOptionId: answerDetails.selectedOptionId }),
    });
    if (result.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    if (result.achievements) localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + current.id, JSON.stringify(result.achievements));
    return {
      success: true,
      user: result.user || current,
      userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0),
      earnedPoints: Number(result.earnedPoints || 0),
      readingPoints: Number(result.readingPoints || 0),
      answerPoints: Number(result.answerPoints || 0),
      achievements: result.achievements || [],
    };
  },

  async getDailyTipStatus(userId: string, dateStr: string): Promise<{ read: boolean; answered: boolean; selectedOptionId: string; isCorrect: boolean; pointsEarned: number; readPoints: number; answerPoints: number; timestamp: string } | null> {
    const current = this.getCurrentSessionUser();
    if (!current || current.id !== userId || !dateStr) return null;
    try {
      const res = await serverApi<any>(`/api/daily-tip/status?date=${encodeURIComponent(dateStr)}`);
      return res?.status || null;
    } catch {
      return null;
    }
  },

  async getTurmaRankings(_userTurma?: string, _isAdminUser = false): Promise<TurmaRanking[]> {
    try {
      const res = await serverApi<{ rankings: TurmaRanking[] }>('/api/rankings/turmas');
      if (res?.rankings && Array.isArray(res.rankings)) {
        return res.rankings;
      }
    } catch (err) {
      console.warn('Could not fetch turma rankings from server:', err);
    }
    return [];
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
    } catch (err) {
      console.warn('Could not fetch student rankings from server:', err);
    }
    return [];
  },

  async getStudentProgress(studentId: string): Promise<ActivityProgress[]> {
    if (!studentId) return [];
    try {
      const result = await serverApi<{ progress: ActivityProgress[] }>(`/api/teacher/students/${encodeURIComponent(studentId)}/progress`);
      return result?.progress || [];
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
    } catch {
      return {};
    }
  },

  async getAllStudentsForAdmin(): Promise<User[]> {
    try {
      const result = await serverApi<{ students: User[] }>('/api/teacher/students');
      if (result?.students && Array.isArray(result.students)) {
        return result.students.sort((a, b) => (a.turma || '5.º A').localeCompare(b.turma || '5.º A') || (b.points || 0) - (a.points || 0));
      }
      return [];
    } catch (err: any) {
      console.error('Teacher students fetch error:', err);
      throw err;
    }
  },

  async adminUpdateStudent(
    studentId: string,
    emailOrUpdates: any,
    maybeUpdates?: any
  ): Promise<{ success: boolean; message: string }> {
    if (!studentId) throw new Error('Identificador do aluno não fornecido.');
    const updates = maybeUpdates !== undefined ? maybeUpdates : emailOrUpdates;
    if (updates?.newPassword && updates.newPassword.length < 8) {
      throw new Error('A palavra-passe deve ter pelo menos 8 caracteres.');
    }
    return await serverApi(`/api/teacher/students/${encodeURIComponent(studentId)}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },

  async parseStudentsFile(
    fileBase64: string,
    fileName: string,
    defaultTurma?: string
  ): Promise<{
    success: boolean;
    count: number;
    rawData: Array<{ name: string; turma: string }>;
    students: Array<{ number?: number; name: string; turma?: string; sourceFile?: string }>;
    filesProcessed?: string[];
  }> {
    const res = await serverApi<any>('/api/teacher/parse-file', {
      method: 'POST',
      body: JSON.stringify({ base64: fileBase64, filename: fileName, defaultTurma }),
    });
    const rawData = res.rawData || res.students || [];
    return {
      success: true,
      count: res.count || rawData.length,
      rawData: rawData,
      students: (res.students || rawData).map((s: any, idx: number) => ({
        number: s.number || idx + 1,
        name: (s.name || '').trim(),
        turma: s.turma || defaultTurma || '5.º A',
        sourceFile: s.sourceFile || fileName,
      })),
      filesProcessed: res.filesProcessed || [fileName],
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
  },

  async resetStudentPassword(userId: string): Promise<{ success: boolean; newPassword: string; message: string }> {
    return await serverApi(`/api/teacher/students/${encodeURIComponent(userId)}/reset-password`, {
      method: 'POST',
    });
  },

  async adminDeleteStudent(studentId: string, _email?: string): Promise<{ success: boolean; message: string }> {
    if (!studentId) throw new Error('Identificador do aluno não fornecido.');
    const result = await serverApi<{ success: boolean; message: string }>(`/api/teacher/students/${encodeURIComponent(studentId)}`, {
      method: 'DELETE',
    });
    localStorage.removeItem(PROGRESS_STORAGE_KEY + studentId);
    localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + studentId);
    localStorage.removeItem(POINTS_STORAGE_KEY + studentId);
    return result;
  },

  async adminDeleteStudents(studentIds: string[]): Promise<{ success: boolean; message: string }> {
    if (!studentIds?.length) return { success: true, message: 'Nenhum aluno selecionado.' };
    return await serverApi('/api/teacher/students-bulk', {
      method: 'DELETE',
      body: JSON.stringify({ studentIds }),
    });
  },

  async adminCreateTurma(turmaName: string): Promise<{ success: boolean; message: string; turmas: string[] }> {
    return await serverApi('/api/teacher/turmas', {
      method: 'POST',
      body: JSON.stringify({ name: turmaName }),
    });
  },

  async adminDeleteStudentsByTurmas(turmas: string[]): Promise<{ success: boolean; message: string }> {
    return await serverApi('/api/teacher/students-by-turmas', {
      method: 'DELETE',
      body: JSON.stringify({ turmas }),
    });
  },

  async adminDeleteTurmas(turmas: string[], deleteStudents = true): Promise<{ success: boolean; message: string; turmas: string[] }> {
    return await serverApi('/api/teacher/turmas', {
      method: 'DELETE',
      body: JSON.stringify({ turmas, deleteStudents }),
    });
  },

  async adminDeleteAllStudents(): Promise<{ success: boolean; message: string }> {
    return this.adminPurgeAllData();
  },

  async adminPurgeAllData(): Promise<{ success: boolean; message: string }> {
    return await serverApi('/api/teacher/purge-all-data', {
      method: 'DELETE',
    });
  },

  async getThemeVisibility(): Promise<ThemeVisibilityMap> {
    try {
      const res = await serverApi<{ visibility: ThemeVisibilityMap }>('/api/config/theme-visibility');
      if (res?.visibility) {
        localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(res.visibility));
        return { ...DEFAULT_THEME_VISIBILITY, ...res.visibility };
      }
    } catch {}
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
    return await serverApi('/api/config/theme-visibility', {
      method: 'POST',
      body: JSON.stringify({ visibility: merged }),
    });
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
      }, () => {});
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
    } catch {}
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
    return await serverApi('/api/config/quiz-visibility', {
      method: 'POST',
      body: JSON.stringify({ visibility: merged }),
    });
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
      }, () => {});
    } catch {}
    return () => {
      window.removeEventListener('tic_quiz_visibility_updated', handleLocalUpdate);
      unsubscribeFirestore();
    };
  },

  async recalibratePoints(): Promise<{ success: boolean; message: string; count: number }> {
    return await serverApi<{ success: boolean; message: string; count: number }>(
      '/api/teacher/students/recalibrate-points',
      { method: 'POST' }
    );
  },
};
