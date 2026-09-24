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
                <strong className="font-bold">Alunos do 5.º Ano:</strong> As vossas contas são criadas previamente pela professora de TIC. Insiram o vosso <strong>nome de utilizador</strong> e <strong>palavra-passe</strong> do vosso cartão de credenciais.
              </>
            ) : (
              <>
                <strong className="font-bold">5th Grade Students:</strong> Your accounts are pre-created by your ICT teacher. Enter your student <strong>username</strong> and <strong>password</strong>.
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {language === 'pt' ? 'Utilizador ou Email' : 'Username or Email'}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={language === 'pt' ? 'Ex: anderson.o ou email da professora' : 'e.g., anderson.o or teacher email'}
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
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
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
