import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
import { api } from '../services/api';
import { User, Language } from '../types';
import { generateSecurePublicId, PUBLIC_ID_EXPLANATION } from '../utils/publicIdGenerator';
import { getTurmasList } from '../data/turmasData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, language }) => {
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Register form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [turma, setTurma] = useState('');
  const [publicId, setPublicId] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);

  // Turmas list
  const [turmasList, setTurmasList] = useState<string[]>([]);

  // Recovery states
  const [forgotRecoveryMethod, setForgotRecoveryMethod] = useState<'direct' | 'email'>('direct');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotShowPassword, setForgotShowPassword] = useState(false);
  const [forgotTurma, setForgotTurma] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Initialize public identifier and turmas
  useEffect(() => {
    if (isOpen) {
      const turmas = getTurmasList();
      setTurmasList(turmas);
      if (turmas.length > 0 && !turma) {
        setTurma(turmas[0]);
      }
      if (!publicId) {
        api
          .generateUniquePublicId()
          .then((uniqueId) => {
            setPublicId(uniqueId);
          })
          .catch(() => {
            const taken = api.getAllTakenPublicIds();
            setPublicId(generateSecurePublicId(taken));
          });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShufflePublicId = async () => {
    setIsShuffling(true);
    try {
      const newId = await api.generateUniquePublicId();
      setPublicId(newId);
    } catch {
      const taken = api.getAllTakenPublicIds();
      setPublicId(generateSecurePublicId(taken));
    } finally {
      setTimeout(() => setIsShuffling(false), 200);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await api.login(email, password);
      setSuccessMsg(language === 'pt' ? 'Sessão iniciada com sucesso!' : 'Signed in successfully!');
      setTimeout(() => {
        onSuccess(res.user);
        onClose();
      }, 500);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao iniciar sessão.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg(language === 'pt' ? 'Por favor, insere o teu nome.' : 'Please enter your name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(language === 'pt' ? 'Por favor, insere um email válido.' : 'Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg(
        language === 'pt'
          ? 'A palavra-passe deve ter pelo menos 6 caracteres.'
          : 'Password must be at least 6 characters.'
      );
      return;
    }

    if (!turma) {
      setErrorMsg(language === 'pt' ? 'Por favor, seleciona a tua turma.' : 'Please select your class.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.register(name, email, password, turma, publicId, language);
      setSuccessMsg(
        language === 'pt'
          ? 'Conta criada com sucesso! Bem-vindo ao Mundo TIC!'
          : 'Account created successfully! Welcome to Mundo TIC!'
      );
      setTimeout(() => {
        onSuccess(res.user);
        onClose();
      }, 600);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(language === 'pt' ? 'Por favor, insere o teu email.' : 'Please enter your email.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.recoverPassword(email);
      setSuccessMsg(res.message);
      if (res.requiresDirectReset) {
        setForgotRecoveryMethod('direct');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro na recuperação de palavra-passe.');
    } finally {
      setLoading(false);
    }
  };

  const handleDirectReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(language === 'pt' ? 'Por favor, insere o teu email de registo.' : 'Please enter your email.');
      return;
    }

    if (forgotNewPassword.length < 6) {
      setErrorMsg(language === 'pt' ? 'A nova palavra-passe deve ter pelo menos 6 caracteres.' : 'Password must be at least 6 characters.');
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setErrorMsg(language === 'pt' ? 'As palavras-passe não coincidem. Confirma e tenta de novo.' : 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.resetPasswordDirect(email, forgotNewPassword, forgotTurma);
      setSuccessMsg(res.message);
      setPassword(forgotNewPassword);
      setTimeout(() => {
        setTab('login');
        setForgotNewPassword('');
        setForgotConfirmPassword('');
      }, 1800);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro na redefinição de palavra-passe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold border border-white/15">
              🌐
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                <Sparkles className="w-3 h-3" />
                Mundo TIC • 5.º Ano
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-0.5">
                {tab === 'login' && (language === 'pt' ? '🔐 Entrar na Conta' : '🔐 Sign In')}
                {tab === 'register' && (language === 'pt' ? '📝 Criar Novo Registo' : '📝 Create New Account')}
                {tab === 'forgot' && (language === 'pt' ? '🔑 Recuperar Palavra-passe' : '🔑 Recover Password')}
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

        {/* Primary Tab Navigation */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-sm font-bold text-slate-600">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-3.5 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              tab === 'login'
                ? 'border-indigo-600 text-indigo-600 bg-white font-extrabold shadow-2xs'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>🔐</span>
            <span>{language === 'pt' ? 'Entrar na Conta' : 'Sign In'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTab('register');
              setErrorMsg('');
              setSuccessMsg('');
              if (!publicId) setPublicId(generateSecurePublicId());
            }}
            className={`py-3.5 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              tab === 'register'
                ? 'border-indigo-600 text-indigo-600 bg-white font-extrabold shadow-2xs'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>📝</span>
            <span>{language === 'pt' ? 'Criar Novo Registo' : 'Create Account'}</span>
          </button>
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
        <div className="p-6">
          {/* TAB 1: 🔐 Entrar na Conta */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {language === 'pt' ? 'Email do Estudante' : 'Student Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo: joao.silva@escola.pt"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {language === 'pt' ? 'Palavra-passe' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTab('forgot');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
                  >
                    {language === 'pt' ? 'Esqueceste-te da palavra-passe?' : 'Forgot password?'}
                  </button>
                </div>
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
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-pulse">{language === 'pt' ? 'A verificar...' : 'Signing in...'}</span>
                ) : (
                  <>
                    <span>{language === 'pt' ? 'Entrar na Conta' : 'Sign In'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: 📝 Criar Novo Registo */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* 1. Nome Real (Privado) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {language === 'pt' ? 'Nome Real' : 'Real Name'}
                  </label>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {language === 'pt' ? 'Privado' : 'Private'}
                  </span>
                </div>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="exemplo: Maria Santos"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {language === 'pt'
                    ? '🔒 O teu nome verdadeiro é privado e serve apenas para identificação com os teus professores.'
                    : '🔒 Your real name is private and only visible to you and your teachers.'}
                </p>
              </div>

              {/* 2. Email */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {language === 'pt' ? 'Email' : 'Email'}
                  </label>
                  {email.trim() && (
                    api.getAllRegisteredEmails().includes(email.trim().toLowerCase()) ? (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {language === 'pt' ? '❌ Email já registado' : '❌ Already in use'}
                      </span>
                    ) : email.includes('@') && email.includes('.') ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {language === 'pt' ? '✅ Email disponível' : '✅ Available'}
                      </span>
                    ) : null
                  )}
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria.santos@escola.pt"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* 3. Palavra-passe */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {language === 'pt' ? 'Palavra-passe' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 4. Turma (selecionada de lista) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {language === 'pt' ? 'Turma (5.º Ano)' : 'Class (5th Grade)'}
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    required
                    value={turma}
                    onChange={(e) => setTurma(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer font-semibold text-slate-800"
                  >
                    {turmasList.map((tItem) => (
                      <option key={tItem} value={tItem}>
                        {tItem}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {language === 'pt'
                    ? 'A turma fica associada ao teu perfil e não pode ser alterada livremente após o registo.'
                    : 'Your class is linked to your profile and cannot be freely changed after registration.'}
                </p>
              </div>

              {/* 5. Nickname (Nome Público) */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nickname</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleShufflePublicId}
                    disabled={isShuffling}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
                    <span>{language === 'pt' ? '🔄 Baralhar outro Nickname' : '🔄 Shuffle Nickname'}</span>
                  </button>
                </div>

                {/* Display Nickname Badge */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-200/60 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                    🎭
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400 font-semibold">{language === 'pt' ? 'O teu Nickname no Mundo TIC:' : 'Your Nickname in Mundo TIC:'}</p>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {language === 'pt' ? '✅ 100% Único' : '✅ Unique'}
                      </span>
                    </div>
                    <p className="text-base font-extrabold text-indigo-950 tracking-tight font-mono">
                      {publicId}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
                  {PUBLIC_ID_EXPLANATION[language]}
                </p>
              </div>

              {/* Submit Register */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-pulse">{language === 'pt' ? 'A criar conta no Firebase...' : 'Creating account...'}</span>
                ) : (
                  <>
                    <span>{language === 'pt' ? 'Concluir Registo' : 'Complete Registration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: 🔑 Recuperar Palavra-passe */}
          {tab === 'forgot' && (
            <div className="space-y-4">
              {/* Method Switcher */}
              <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setForgotRecoveryMethod('direct');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                    forgotRecoveryMethod === 'direct'
                      ? 'bg-white text-indigo-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚡ {language === 'pt' ? 'Redefinir Imediatamente' : 'Direct Reset (Instant)'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForgotRecoveryMethod('email');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                    forgotRecoveryMethod === 'email'
                      ? 'bg-white text-indigo-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📧 {language === 'pt' ? 'Enviar Link por Email' : 'Email Reset Link'}
                </button>
              </div>

              {/* DIRECT RESET FORM */}
              {forgotRecoveryMethod === 'direct' ? (
                <form onSubmit={handleDirectReset} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs leading-relaxed">
                    <p className="font-bold mb-1">
                      {language === 'pt'
                        ? '🔐 Redefinição Direta e Segura para a Escola:'
                        : '🔐 Direct & Secure School Reset:'}
                    </p>
                    <p className="text-slate-700">
                      {language === 'pt'
                        ? 'Insere o teu email e define já a tua nova palavra-passe. Não ficas dependente de filtros de spam do servidor escolar.'
                        : 'Enter your email and set your new password immediately without waiting for school mail servers.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      {language === 'pt' ? 'Email da Conta' : 'Account Email'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aluno@escola.pt ou imaginebycarla2023@gmail.com"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      {language === 'pt' ? 'Turma (Confirmação para Alunos)' : 'Class (Student Verification)'}
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <select
                        value={forgotTurma}
                        onChange={(e) => setForgotTurma(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">{language === 'pt' ? '-- Seleciona a tua Turma (ou deixa em branco se for Professora) --' : '-- Select Class --'}</option>
                        {turmasList.map((t) => (
                          <option key={t} value={t}>
                            Turma {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        {language === 'pt' ? 'Nova Palavra-passe' : 'New Password'}
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type={forgotShowPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={forgotNewPassword}
                          onChange={(e) => setForgotNewPassword(e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setForgotShowPassword(!forgotShowPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {forgotShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        {language === 'pt' ? 'Confirmar Nova' : 'Confirm New'}
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type={forgotShowPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={forgotConfirmPassword}
                          onChange={(e) => setForgotConfirmPassword(e.target.value)}
                          placeholder="Repete a palavra-passe"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTab('login');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {language === 'pt' ? 'Voltar ao Login' : 'Back to Login'}
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>
                        {loading
                          ? (language === 'pt' ? 'A guardar...' : 'Saving...')
                          : (language === 'pt' ? 'Atualizar Palavra-passe' : 'Update Password')}
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                /* EMAIL LINK FORM */
                <form onSubmit={handleForgotEmail} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm leading-relaxed">
                    <p className="font-semibold mb-1">
                      {language === 'pt'
                        ? '📨 Envio através do Firebase Authentication:'
                        : '📨 Send via Firebase Authentication:'}
                    </p>
                    <p className="text-slate-700 text-xs">
                      {language === 'pt'
                        ? 'Receberás um email com o link oficial para alterar a palavra-passe. Se o email não chegar em 1 minuto, verifica o SPAM ou usa a opção de Redefinição Imediata acima.'
                        : 'You will receive an official reset link. If not received in 1 minute, check your SPAM folder or use the Direct Reset option above.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {language === 'pt' ? 'Email do Estudante ou Professora' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@escola.pt ou imaginebycarla2023@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTab('login');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {language === 'pt' ? 'Voltar ao Login' : 'Back to Login'}
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Mail className="w-4 h-4" />
                      <span>
                        {loading
                          ? (language === 'pt' ? 'A enviar email...' : 'Sending email...')
                          : (language === 'pt' ? 'Enviar Link por Email' : 'Send Reset Link')}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
