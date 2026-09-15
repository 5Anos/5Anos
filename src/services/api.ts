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
import { db, OperationType, handleFirestoreError } from '../firebase';
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

const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL || '').replace(/\/$/, '');

async function serverApi<T>(path: string, init: RequestInit = {}, retryCount = 1): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const url = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      ...init,
      headers,
      credentials: 'same-origin',
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
      // Proxy/Container cold-start returning non-JSON: wait 1.5s and retry once
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return serverApi<T>(path, init, retryCount - 1);
    }

    if (!response.ok) {
      if (body?.error) {
        throw new Error(body.error);
      }
      if (response.status === 502 || response.status === 503 || response.status === 504) {
        throw new Error('O servidor está a iniciar na nuvem. Por favor, aguarda 5 segundos e tenta novamente.');
      }
      if (response.status === 401) {
        throw new Error('Credenciais inválidas ou sessão expirada.');
      }
      if (response.status === 403) {
        throw new Error('Acesso não autorizado pelo servidor.');
      }
      throw new Error(`Erro de resposta do servidor (${response.status}). Por favor tenta novamente.`);
    }

    return body as T;
  } catch (err: any) {
    if (retryCount > 0 && (err?.name === 'TypeError' || err?.message?.includes('fetch'))) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return serverApi<T>(path, init, retryCount - 1);
    }
    if (err instanceof Error) {
      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        throw new Error('Não foi possível contactar o servidor. Verifica a ligação à internet ou tenta novamente dentro de instantes.');
      }
      throw err;
    }
    throw new Error('Erro de comunicação com o servidor.');
  }
}


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
    const current = this.getCurrentSessionUser();
    if (!current || current.id !== userId) throw new Error('Sessão inválida.');
    await serverApi('/api/me/profile', { method: 'PATCH', body: JSON.stringify(data) });
  },
  async createPublicProfileDoc(userId: string, data: any): Promise<void> {
    const current = this.getCurrentSessionUser();
    if (!current || current.id !== userId) throw new Error('Sessão inválida.');
    await serverApi('/api/me/profile', { method: 'PATCH', body: JSON.stringify(data) });
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
    const token = this.getToken();
    if (!token) { callback(null); return () => {}; }
    serverApi<{ user: User }>('/api/auth/me')
      .then(({ user }) => { localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)); callback(user); })
      .catch(() => { this.removeToken(); callback(null); });
    return () => {};
  },

  /**
   * Directly save user profile to Cloud Firestore (NEVER storing passwords)
   */
  async syncUserToFirestore(user: User): Promise<boolean> {
    const current = this.getCurrentSessionUser();
    if (!current || current.id !== user.id) throw new Error('Sessão inválida.');
    try {
      const result = await serverApi<{ user: User }>('/api/me/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name: user.name, publicId: user.publicId, turma: user.turma, language: user.language, avatar: user.avatar }),
      });
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      return true;
    } catch (err) { console.warn('Server profile sync notice:', err); return false; }
  },
  async register(
    name: string, email: string, password: string, turma: string, publicId: string,
    language: Language = 'pt', avatar?: AvatarConfig
  ): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    if (cleanPassword.length < 8) throw new Error('A palavra-passe deve ter pelo menos 8 caracteres.');
    const takenPublicIds = await this.fetchTakenPublicIds();
    let finalPublicId = (publicId || '').trim();
    if (!finalPublicId || takenPublicIds.some((id) => id.toLowerCase() === finalPublicId.toLowerCase())) {
      finalPublicId = generateSecurePublicId(takenPublicIds);
    }
    const result = await serverApi<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: name.trim(), email: normalizedEmail, password: cleanPassword, turma: turma || '5.º A', publicId: finalPublicId, language, avatar }),
    });
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    this.setToken(result.token);
    return result;
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    if (!normalizedEmail || !cleanPassword) throw new Error('Por favor, preenche todos os campos.');
    const result = await serverApi<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST', body: JSON.stringify({ email: normalizedEmail, password: cleanPassword }),
    });
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    this.setToken(result.token);
    return result;
  },

  async resetPassword(email: string, password: string): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    if (!normalizedEmail || !cleanPassword) throw new Error('Por favor, preenche todos os campos.');
    if (cleanPassword.length < 8) throw new Error('A palavra-passe deve ter pelo menos 8 caracteres.');
    const result = await serverApi<{ user: User; token: string; message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: normalizedEmail, password: cleanPassword }),
    });
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    this.setToken(result.token);
    return result;
  },

  async logout(): Promise<void> {
    try { await serverApi('/api/auth/logout', { method: 'POST' }); } catch { /* local logout */ }
    this.removeToken();
  },

  /**
   * Get current user details and progress directly from Cloud Firestore
   */
  async getMe(): Promise<{ user: User; progress: ActivityProgress[]; achievements: UserAchievement[]; pointsHistory: PointTransaction[]; dailyTips?: any[] }> {
    const result = await serverApi<{ user: User; progress: ActivityProgress[]; achievements: UserAchievement[]; pointsHistory: PointTransaction[]; dailyTips?: any[] }>('/api/me/data');
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    localStorage.setItem(PROGRESS_STORAGE_KEY + result.user.id, JSON.stringify(result.progress || []));
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + result.user.id, JSON.stringify(result.achievements || []));
    return result;
  },
  async updateUserAvatar(userId: string, newAvatar: AvatarConfig): Promise<void> {
    const current = this.getCurrentSessionUser();
    if (!current || current.id !== userId) throw new Error('Sessão inválida.');
    const result = await serverApi<{ user: User }>('/api/me/profile', { method: 'PATCH', body: JSON.stringify({ avatar: newAvatar }) });
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
  },
  async updateLanguage(newLang: Language): Promise<void> {
    const current = this.getCurrentSessionUser();
    if (!current) return;
    try {
      const result = await serverApi<{ user: User }>('/api/me/profile', {
        method: 'PATCH',
        body: JSON.stringify({ language: newLang }),
      });
      if (result?.user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      }
    } catch (err) {
      console.warn('Could not update language on server:', err);
    }
  },
  async saveProgress(payload: {
    activityId: string; activityType: 'module' | 'quiz' | 'challenge'; themeId: string; status?: 'completed' | 'in_progress'; score?: number; maxScore?: number; percentage?: number; activityTitle?: string; quizAnswers?: Record<string, string | number> | (string | number)[];
  }): Promise<{ success: boolean; record: ActivityProgress; userPoints: number; lastActivity: User['lastActivity']; achievements: UserAchievement[]; earnedPoints?: number; prevBestScore?: number; newBestScore?: number; awardedXp?: number; attemptScore?: number }> {
    const current = this.getCurrentSessionUser();
    if (!current) throw new Error('Inicia sessão para guardar o progresso.');
    if (!payload.activityId || !payload.themeId) throw new Error('Identificador da atividade em falta.');
    if (!isValidActivityId(payload.activityId)) throw new Error(`Atividade inválida ou não reconhecida no currículo: ${payload.activityId}`);
    const result = await serverApi<any>('/api/progress/save', { method: 'POST', body: JSON.stringify(payload) });
    if (result.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    if (result.record) {
      const cached = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + current.id) || '[]') as ActivityProgress[];
      localStorage.setItem(PROGRESS_STORAGE_KEY + current.id, JSON.stringify([...cached.filter(p => p.activityId !== payload.activityId), result.record]));
    }
    if (result.achievements) localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + current.id, JSON.stringify(result.achievements));
    return { success: true, record: result.record, userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0), lastActivity: result.lastActivity ?? result.user?.lastActivity, achievements: result.achievements || [], earnedPoints: result.earnedPoints ?? result.pointsEarned ?? 0, prevBestScore: result.prevBestScore, newBestScore: result.newBestScore, awardedXp: result.awardedXp, attemptScore: result.attemptScore };
  },
  async recordDailyTipRead(tipTitle: string, dateStr?: string): Promise<{ success: boolean; user: User | null; userPoints: number; earnedPoints: number; achievements: UserAchievement[] }> {
    const current = this.getCurrentSessionUser();
    if (!current) return { success: true, user: null, userPoints: 0, earnedPoints: 0, achievements: [] };
    const result = await serverApi<any>('/api/daily-tip/read', { method: 'POST', body: JSON.stringify({ tipTitle, dateStr }) });
    if (result.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    if (result.achievements) localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + current.id, JSON.stringify(result.achievements));
    return { success: true, user: result.user || current, userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0), earnedPoints: Number(result.earnedPoints || 0), achievements: result.achievements || [] };
  },
  async recordDailyTipBonus(tipTitle: string, bonusPoints = 30, dateStr?: string, answerDetails?: { selectedOptionId: string; isCorrect: boolean }): Promise<{ success: boolean; user: User | null; userPoints: number; earnedPoints: number; readingPoints: number; answerPoints: number; achievements: UserAchievement[] }> {
    const current = this.getCurrentSessionUser();
    if (!current) return { success: true, user: null, userPoints: 0, earnedPoints: 0, readingPoints: 0, answerPoints: 0, achievements: [] };
    if (!answerDetails?.selectedOptionId) throw new Error('Resposta da Dica do Dia não fornecida.');
    const result = await serverApi<any>('/api/daily-tip/answer', { method: 'POST', body: JSON.stringify({ tipTitle, bonusPoints, dateStr, selectedOptionId: answerDetails.selectedOptionId }) });
    if (result.user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
    if (result.achievements) localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY + current.id, JSON.stringify(result.achievements));
    return { success: true, user: result.user || current, userPoints: Number(result.userPoints ?? result.user?.points ?? current.points ?? 0), earnedPoints: Number(result.earnedPoints || 0), readingPoints: Number(result.readingPoints || 0), answerPoints: Number(result.answerPoints || 0), achievements: result.achievements || [] };
  },
  async getDailyTipStatus(userId: string, dateStr: string): Promise<{ read: boolean; answered: boolean; selectedOptionId: string; isCorrect: boolean; pointsEarned: number; readPoints: number; answerPoints: number; timestamp: string } | null> {
    const current = this.getCurrentSessionUser();
    if (!current || current.id !== userId || !dateStr) return null;
    try { return await serverApi<any>(`/api/daily-tip/status?date=${encodeURIComponent(dateStr)}`); } catch (err) { console.warn('Daily tip status fetch notice:', err); return null; }
  },
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
    try { const result = await serverApi<{ progress: ActivityProgress[] }>(`/api/teacher/students/${encodeURIComponent(studentId)}/progress`); return result.progress || []; } catch (err) { console.warn('Could not fetch student progress from server:', err); return []; }
  },
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
    try { const result = await serverApi<{ students: User[] }>('/api/teacher/students'); return (result.students || []).sort((a,b) => (a.turma || '5.º A').localeCompare(b.turma || '5.º A') || (b.points || 0) - (a.points || 0)); } catch (err) { console.warn('Could not query students from server:', err); return []; }
  },
  async adminUpdateStudent(studentId: string, studentEmail: string, updates: { newPassword?: string; newTurma?: string; newName?: string }): Promise<{ success: boolean; message: string }> {
    if (!studentId) throw new Error('Identificador do aluno não fornecido.');
    if (updates.newPassword && updates.newPassword.length < 8) throw new Error('A palavra-passe deve ter pelo menos 8 caracteres.');
    return await serverApi(`/api/teacher/students/${encodeURIComponent(studentId)}`, { method: 'PATCH', body: JSON.stringify({ email: studentEmail, ...updates }) });
  },
  async adminDeleteStudent(studentId: string, studentEmail: string): Promise<{ success: boolean; message: string }> {
    if (!studentId) throw new Error('Identificador do aluno não fornecido.');
    if (isUserAdmin(studentEmail)) throw new Error('Não é permitido eliminar a conta da Professora / Administrador.');
    const result = await serverApi<{ success: boolean; message: string }>(`/api/teacher/students/${encodeURIComponent(studentId)}`, { method: 'DELETE' });
    localStorage.removeItem(PROGRESS_STORAGE_KEY + studentId); localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY + studentId); localStorage.removeItem(POINTS_STORAGE_KEY + studentId);
    return result;
  },
  async adminDeleteStudents(studentIdsOrEmails: string[]): Promise<{ success: boolean; deletedCount: number; message: string }> {
    if (!studentIdsOrEmails?.length) return { success: true, deletedCount: 0, message: 'Nenhum aluno selecionado.' };
    return await serverApi('/api/teacher/students/bulk-delete', { method: 'POST', body: JSON.stringify({ students: studentIdsOrEmails }) });
  },
  async adminDeleteStudentsByTurmas(turmaNames: string[]): Promise<{ success: boolean; deletedCount: number; message: string }> {
    if (!turmaNames?.length) return { success: true, deletedCount: 0, message: 'Nenhuma turma selecionada.' };
    return await serverApi('/api/teacher/students/delete-by-turmas', { method: 'POST', body: JSON.stringify({ turmas: turmaNames }) });
  },
  async adminDeleteAllStudents(): Promise<{ success: boolean; deletedCount: number; message: string }> {
    return await serverApi('/api/teacher/students/delete-all', { method: 'POST' });
  },
  async adminPurgeResiduals(): Promise<{ success: boolean; deletedCount: number; purgedResidualsCount: number; message: string }> {
    return await serverApi('/api/teacher/students/purge-residuals', { method: 'POST' });
  },
  async adminCreateTurma(turmaName: string): Promise<{ success: boolean; turmas: string[]; message: string }> {
    const trimmed = (turmaName || '').trim(); if (!trimmed) throw new Error('Nome da turma inválido.');
    return await serverApi('/api/teacher/turmas', { method: 'POST', body: JSON.stringify({ turmaName: trimmed }) });
  },
  async adminDeleteTurmas(turmaNames: string[], deleteStudentsToo = false): Promise<{ success: boolean; turmas: string[]; deletedStudentsCount: number; message: string }> {
    if (!turmaNames?.length) throw new Error('Nenhuma turma selecionada para eliminar.');
    return await serverApi('/api/teacher/turmas/delete', { method: 'POST', body: JSON.stringify({ turmas: turmaNames, deleteStudentsToo }) });
  },
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
  async saveThemeVisibility(newVisibility: ThemeVisibilityMap): Promise<{ success: boolean; visibility: ThemeVisibilityMap; message: string }> {
    const merged: ThemeVisibilityMap = { ...DEFAULT_THEME_VISIBILITY, ...newVisibility };
    localStorage.setItem(THEME_VISIBILITY_KEY, JSON.stringify(merged)); window.dispatchEvent(new CustomEvent('tic_theme_visibility_updated', { detail: merged }));
    return await serverApi('/api/teacher/config/theme-visibility', { method: 'PUT', body: JSON.stringify({ visibility: merged }) });
  },
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
  async saveQuizVisibility(newVisibility: QuizVisibilityMap): Promise<{ success: boolean; visibility: QuizVisibilityMap; message: string }> {
    const merged: QuizVisibilityMap = { ...DEFAULT_QUIZ_VISIBILITY, ...newVisibility };
    localStorage.setItem(QUIZ_VISIBILITY_KEY, JSON.stringify(merged)); window.dispatchEvent(new CustomEvent('tic_quiz_visibility_updated', { detail: merged }));
    return await serverApi('/api/teacher/config/quiz-visibility', { method: 'PUT', body: JSON.stringify({ visibility: merged }) });
  },
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
