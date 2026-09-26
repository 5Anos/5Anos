import React, { useState } from 'react';
import {
  X,
  Lock,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../services/api';
import { User, Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, language }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const getFriendlyErrorMessage = (err: unknown, defaultMsg: string): string => {
    if (err instanceof Error) {
      if (err.message.includes('incorret') || err.message.includes('inválid') || err.message.includes('não encontrado')) {
        return language === 'pt'
          ? 'Nome de utilizador ou palavra-passe incorretos. Verifica as tuas credenciais com a professora.'
          : 'Incorrect username or password. Check with your teacher.';
      }
      return err.message;
    }
    return defaultMsg;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();

    if (!cleanIdentifier || !cleanPassword) {
      setErrorMsg(
        language === 'pt'
          ? 'Por favor, preenche o utilizador e a palavra-passe.'
          : 'Please enter your username and password.'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await api.login(cleanIdentifier, cleanPassword);
      setSuccessMsg(language === 'pt' ? 'Sessão iniciada com sucesso! A entrar...' : 'Signed in successfully! Loading...');
      setTimeout(() => {
        onSuccess(res.user);
        onClose();
      }, 500);
    } catch (err: unknown) {
      setErrorMsg(getFriendlyErrorMessage(err, language === 'pt' ? 'Erro ao iniciar sessão.' : 'Sign in error.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const email = result.user?.email;
      if (!email) {
        throw new Error('Não foi possível obter o email da conta Google.');
      }
      const res = await api.loginWithGoogle(email);
      setSuccessMsg(language === 'pt' ? 'Sessão iniciada com sucesso! Bem-vinda, Professora!' : 'Signed in successfully! Welcome!');
      setTimeout(() => {
        onSuccess(res.user);
        onClose();
      }, 500);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg(language === 'pt' ? 'Início de sessão com o Google cancelado.' : 'Google sign in cancelled.');
      } else {
        setErrorMsg(err.message || (language === 'pt' ? 'Erro ao iniciar sessão com o Google.' : 'Error signing in with Google.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md my-auto sm:my-8 rounded-2xl sm:rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold border border-white/15">
              💡
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                <Sparkles className="w-3 h-3 text-amber-300" />
                TIC 5 — Descomplica!
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-0.5">
                {language === 'pt' ? '🔐 Iniciar Sessão' : '🔐 Sign In'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Banner */}
        <div className="bg-indigo-50/70 border-b border-indigo-100 px-5 py-3 text-xs text-indigo-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'pt' ? (
              <>
                <strong className="font-bold">Alunos do 5.º Ano:</strong> Insiram o vosso <strong>nome de utilizador</strong> e <strong>palavra-passe</strong> do vosso cartão de credenciais. A Professora Carla pode entrar com a sua <strong>Conta Google</strong> ou com o utilizador <code className="bg-indigo-100 text-indigo-900 px-1 py-0.5 rounded font-mono font-bold">prof.carla</code>.
              </>
            ) : (
              <>
                <strong className="font-bold">5th Grade Students:</strong> Enter your student <strong>username</strong> and <strong>password</strong>. Teachers can sign in with their <strong>Google Account</strong> or username <code className="bg-indigo-100 text-indigo-900 px-1 py-0.5 rounded font-mono font-bold">prof.carla</code>.
              </>
            )}
          </p>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Quick Google Sign-In for Teacher */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-indigo-400 bg-white hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-950 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{language === 'pt' ? 'Entrar com Conta Google (Professora)' : 'Sign In with Google (Teacher)'}</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="shrink mx-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {language === 'pt' ? 'Ou com Utilizador / Palavra-passe' : 'Or with Username / Password'}
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {language === 'pt' ? 'Nome de Utilizador' : 'Username'}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={language === 'pt' ? 'Ex: anderson.o ou prof.carla' : 'e.g., anderson.o or prof.carla'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {language === 'pt' ? 'Palavra-passe' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              {loading ? (
                <span className="animate-pulse">{language === 'pt' ? 'A verificar...' : 'Signing in...'}</span>
              ) : (
                <>
                  <span>{language === 'pt' ? 'Entrar na Plataforma' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer help note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              {language === 'pt'
                ? 'Esqueceste-te da tua palavra-passe ou precisas de um novo cartão? Pede à professora de TIC para a consultar ou redefinir.'
                : 'Forgot your password? Ask your teacher to check or reset your credentials.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
