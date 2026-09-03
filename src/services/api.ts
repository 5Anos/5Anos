import { User, ActivityProgress, UserAchievement, PointTransaction, Language } from '../types';

const TOKEN_KEY = 'tic_5ano_auth_token';

export const api = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async getDemoAccounts(): Promise<{ email: string; name: string; defaultPass: string }[]> {
    try {
      const res = await fetch('/api/auth/demo-accounts');
      if (!res.ok) throw new Error('Failed to fetch demo accounts');
      const data = await res.json();
      return data.accounts || [];
    } catch {
      return [
        { email: 'joao.silva@escola.pt', name: 'João Silva (5.º A)', defaultPass: 'Aluno1234!' },
        { email: 'leonor.martins@escola.pt', name: 'Leonor Martins (5.º B)', defaultPass: 'Aluno1234!' },
      ];
    }
  },

  async register(name: string, email: string, password: string, language: Language = 'pt'): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, language }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Erro ao criar conta.');
    }

    this.setToken(data.token);
    return data;
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Email ou palavra-passe incorretos.');
    }

    this.setToken(data.token);
    return data;
  },

  async recoverPassword(email: string, newPassword?: string): Promise<{ success: boolean; message: string; userExists?: boolean; userName?: string }> {
    const res = await fetch('/api/auth/recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Erro na recuperação de palavra-passe.');
    }
    return data;
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignore network error on logout
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

    const res = await fetch('/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      this.removeToken();
      throw new Error('Sessão expirada');
    }

    return await res.json();
  },

  async updateLanguage(language: Language): Promise<void> {
    const token = this.getToken();
    if (!token) return;

    await fetch('/api/user/language', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ language }),
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

    const res = await fetch('/api/progress/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Erro ao guardar progresso.');
    }

    return data;
  },
};
