import { User, ActivityProgress, UserAchievement, PointTransaction, Language } from '../types';
import { BADGES } from '../data/badgesData';

const TOKEN_KEY = 'tic_5ano_auth_token';
const USERS_STORAGE_KEY = 'tic_5ano_local_users';
const CURRENT_USER_KEY = 'tic_5ano_current_user';
const PROGRESS_STORAGE_KEY = 'tic_5ano_progress_';
const ACHIEVEMENTS_STORAGE_KEY = 'tic_5ano_achievements_';
const POINTS_STORAGE_KEY = 'tic_5ano_points_';

// Initial demo accounts
const INITIAL_DEMO_USERS = [
  {
    id: 'demo-joao',
    name: 'João Silva (5.º A)',
    email: 'joao.silva@escola.pt',
    password: 'Aluno1234!',
    language: 'pt' as Language,
    points: 120,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-leonor',
    name: 'Leonor Martins (5.º B)',
    email: 'leonor.martins@escola.pt',
    password: 'Aluno1234!',
    language: 'pt' as Language,
    points: 85,
    createdAt: new Date().toISOString(),
  },
];

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_USERS;
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

  async getDemoAccounts(): Promise<{ email: string; name: string; defaultPass: string }[]> {
    try {
      const res = await fetch('/api/auth/demo-accounts');
      if (res.ok) {
        const data = await res.json();
        if (data.accounts?.length) return data.accounts;
      }
    } catch {
      // offline / static fallback
    }
    return [
      { email: 'joao.silva@escola.pt', name: 'João Silva (5.º A)', defaultPass: 'Aluno1234!' },
      { email: 'leonor.martins@escola.pt', name: 'Leonor Martins (5.º B)', defaultPass: 'Aluno1234!' },
    ];
  },

  async register(name: string, email: string, password: string, language: Language = 'pt'): Promise<{ user: User; token: string }> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, language }),
      });

      if (res.ok) {
        const data = await res.json();
        this.setToken(data.token);
        return data;
      }
    } catch {
      // fallback to localStorage
    }

    // Local storage registration fallback
    const users = getStoredUsers();
    const existing = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('Já existe uma conta registada com este email.');
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      language,
      points: 20, // initial bonus
      createdAt: new Date().toISOString(),
    };

    users.push({ ...newUser, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    const token = `local-token-${newUser.id}`;
    this.setToken(token);
    return { user: newUser, token };
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        this.setToken(data.token);
        return data;
      }
    } catch {
      // fallback to localStorage
    }

    // Local storage login fallback
    const users = getStoredUsers();
    const found = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      throw new Error('Email ou palavra-passe incorretos.');
    }

    const user: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      language: found.language || 'pt',
      points: found.points || 0,
      createdAt: found.createdAt,
      lastActivity: found.lastActivity,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    const token = `local-token-${user.id}`;
    this.setToken(token);
    return { user, token };
  },

  async recoverPassword(email: string, newPassword?: string): Promise<{ success: boolean; message: string; userExists?: boolean; userName?: string }> {
    try {
      const res = await fetch('/api/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback to localStorage
    }

    const users = getStoredUsers();
    const found = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, message: 'Nenhuma conta encontrada com este email.' };
    }

    if (newPassword) {
      found.password = newPassword;
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      return { success: true, message: 'Palavra-passe alterada com sucesso!' };
    }

    return {
      success: true,
      message: 'Utilizador validado.',
      userExists: true,
      userName: found.name,
    };
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token && !token.startsWith('local-token-')) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignore
      }
    }
    this.removeToken();
  },

  async getMe(): Promise<{
    user: User;
    progress: ActivityProgress[];
    achievements: UserAchievement[];
    pointsHistory: PointTransaction[];
  }> {
    const token = this.getToken();
    if (!token) throw new Error('Não autenticado');

    if (!token.startsWith('local-token-')) {
      try {
        const res = await fetch('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          return await res.json();
        }
      } catch {
        // fallback to local
      }
    }

    // Local storage retrieval
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
      this.removeToken();
      throw new Error('Sessão expirada');
    }

    const user: User = JSON.parse(rawUser);
    const progress: ActivityProgress[] = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + user.id) || '[]');
    const achievements: UserAchievement[] = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + user.id) || '[]');
    const pointsHistory: PointTransaction[] = JSON.parse(localStorage.getItem(POINTS_STORAGE_KEY + user.id) || '[]');

    return { user, progress, achievements, pointsHistory };
  },

  async updateLanguage(language: Language): Promise<void> {
    const token = this.getToken();
    if (!token) return;

    if (!token.startsWith('local-token-')) {
      try {
        await fetch('/api/user/language', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ language }),
        });
      } catch {
        // fallback
      }
    }

    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (rawUser) {
      const user = JSON.parse(rawUser);
      user.language = language;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
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
  }): Promise<{
    success: boolean;
    record: ActivityProgress;
    userPoints: number;
    lastActivity: User['lastActivity'];
    achievements: UserAchievement[];
  }> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Inicia sessão para guardar o progresso.');
    }

    if (!token.startsWith('local-token-')) {
      try {
        const res = await fetch('/api/progress/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          return await res.json();
        }
      } catch {
        // fallback
      }
    }

    // Local storage progression
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) throw new Error('Utilizador não encontrado');

    const user: User = JSON.parse(rawUser);
    const progressList: ActivityProgress[] = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY + user.id) || '[]');
    let achievements: UserAchievement[] = JSON.parse(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY + user.id) || '[]');
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
      achievements.push({ userId: user.id, badgeId: 'first_step', unlockedAt: new Date().toISOString() });
    }
    if (user.points >= 100 && !achievements.some((a) => a.badgeId === 'point_century')) {
      achievements.push({ userId: user.id, badgeId: 'point_century', unlockedAt: new Date().toISOString() });
    }

    // Save all to localStorage
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
};

