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
  KeyRound,
  Mail,
  ShieldAlert,
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
  // Mode: 'login' | 'teacher_set_password'
  const [mode, setMode] = useState<'login' | 'teacher_set_password'>('login');

  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Teacher set password state
  const [teacherEmail, setTeacherEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const getFriendlyErrorMessage = (err: unknown, defaultMsg: string): string => {
    if (err instanceof Error) {
      if (err.message.includes('incorret') || err.message.includes('inválid') || err.message.includes('não encontrado')) {
        return language === 'pt'
          ? 'Email, utilizador ou palavra-passe incorretos. A Professora Carla pode utilizar o botão "Definir ou alterar palavra-passe" abaixo para escolher uma nova palavra-passe imediatamente.'
          : 'Incorrect credentials. Teachers can use the "Set/Change password" button below to set a new password.';
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
          ? 'Por favor, introduz o teu email/utilizador e a palavra-passe.'
          : 'Please enter your email/username and password.'
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

  const handleTeacherSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = teacherEmail.trim().toLowerCase();
    const cleanNewPass = newPassword.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg(language === 'pt' ? 'Por favor, introduz um endereço de email válido.' : 'Please enter a valid email.');
      return;
    }
    if (cleanNewPass.length < 6) {
      setErrorMsg(language === 'pt' ? 'A nova palavra-passe deve ter pelo menos 6 caracteres.' : 'Password must be at least 6 characters.');
      return;
    }
    if (cleanNewPass !== confirmPassword.trim()) {
      setErrorMsg(language === 'pt' ? 'A confirmação da palavra-passe não coincide.' : 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.teacherSetPassword(cleanEmail, cleanNewPass);
      setSuccessMsg(
        language === 'pt'
          ? 'Palavra-passe definida com sucesso! A entrar na conta de Professora...'
          : 'Password updated successfully! Signing in...'
      );
      setTimeout(() => {
        onSuccess(res.user);
        onClose();
      }, 700);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : language === 'pt'
          ? 'Erro ao definir a nova palavra-passe.'
          : 'Error setting new password.'
      );
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
                {mode === 'login'
                  ? (language === 'pt' ? '🔐 Iniciar Sessão' : '🔐 Sign In')
                  : (language === 'pt' ? '🔑 Definir Palavra-passe' : '🔑 Set Password')}
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

        {/* Security Reassurance Banner */}
        <div className="bg-emerald-50/80 border-b border-emerald-100 px-5 py-3 text-xs text-emerald-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <p className="font-semibold text-emerald-900">
              {language === 'pt' ? 'Ambiente Seguro & Palavra-passe Protegida' : 'Secure Environment'}
            </p>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              {language === 'pt'
                ? 'A sua palavra-passe NUNCA está visível na página para ninguém. Todos os dados são cifrados.'
                : 'Your password is NEVER visible on the page. All credentials are encrypted.'}
            </p>
          </div>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-snug">{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {mode === 'login' ? (
            <>
              {/* PRIMARY: Email / Username + Password Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {language === 'pt' ? 'Email ou Nome de Utilizador' : 'Email or Username'}
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      autoFocus
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={language === 'pt' ? 'Email ou utilizador...' : 'Email or username...'}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {language === 'pt'
                      ? 'Professora: utilize o seu email ou utilizador. Alunos: utilizem o utilizador do cartão.'
                      : 'Teachers: use your email or username. Students: use your username.'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {language === 'pt' ? 'Palavra-passe' : 'Password'}
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {language === 'pt' ? 'Oculta por defeito' : 'Masked'}
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Direct link for Teacher password setup / change */}
                <div className="pt-1 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setSuccessMsg('');
                      setMode('teacher_set_password');
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'Professora: Definir ou alterar a minha palavra-passe' : 'Teacher: Set or change password'}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {loading ? (
                    <span className="animate-pulse">{language === 'pt' ? 'A verificar credenciais...' : 'Checking...'}</span>
                  ) : (
                    <>
                      <span>{language === 'pt' ? 'Entrar com Email e Palavra-passe' : 'Sign In with Email & Password'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Secondary alternative: Google Login (discreet, not dominant) */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {language === 'pt' ? 'Ou se preferir' : 'Or optionally'}
                </p>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
                  <span>{language === 'pt' ? 'Entrar com Conta Google (Opcional)' : 'Sign In with Google (Optional)'}</span>
                </button>
              </div>
            </>
          ) : (
            /* TEACHER SET / CHANGE PASSWORD FORM */
            <form onSubmit={handleTeacherSetPassword} className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                <p className="font-bold mb-1">
                  {language === 'pt' ? 'Definição Direta da Palavra-passe da Professora Carla' : 'Teacher Password Configuration'}
                </p>
                <p>
                  {language === 'pt'
                    ? 'Escolha a palavra-passe que pretende utilizar para entrar na plataforma com o seu email. Fica imediatamente ativa e guardada de forma segura.'
                    : 'Choose your desired password to access the platform with your email. It takes effect immediately.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {language === 'pt' ? 'Email de Professora Autorizado' : 'Authorized Teacher Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder={language === 'pt' ? 'O seu email de professora...' : 'Your teacher email...'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {language === 'pt' ? 'Nova Palavra-passe' : 'New Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Ex: a sua palavra-passe pretendida"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {language === 'pt' ? 'Mínimo de 6 caracteres.' : 'At least 6 characters.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {language === 'pt' ? 'Confirmar Nova Palavra-passe' : 'Confirm New Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a palavra-passe"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {loading ? (
                    <span className="animate-pulse">{language === 'pt' ? 'A guardar palavra-passe...' : 'Saving...'}</span>
                  ) : (
                    <>
                      <span>{language === 'pt' ? 'Guardar Palavra-passe e Entrar' : 'Save Password & Sign In'}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setSuccessMsg('');
                    setMode('login');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-all cursor-pointer"
                >
                  {language === 'pt' ? 'Voltar ao Início de Sessão' : 'Back to Sign In'}
                </button>
              </div>
            </form>
          )}

          {/* Footer student help note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              {language === 'pt'
                ? 'Alunos do 5.º Ano: consultem o vosso cartão individual impresso com o vosso utilizador e palavra-passe.'
                : '5th Grade Students: check your printed credentials card.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
