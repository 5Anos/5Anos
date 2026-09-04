import React, { useState } from 'react';
import { BarChart3, User as UserIcon, LogOut, Menu, X, Sparkles, Compass, Trophy, Cloud, Check } from 'lucide-react';
import { User, Language } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface HeaderProps {
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
  onOpenLeaderboard: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  language,
  onLanguageChange,
  activeView,
  onNavigate,
  onOpenAuth,
  onOpenLeaderboard,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean | null>(null);

  const handleSyncCloud = async () => {
    if (!user) return;
    setSyncing(true);
    setSyncSuccess(null);
    try {
      const ok = await api.syncUserToFirestore(user);
      setSyncSuccess(ok);
      setTimeout(() => setSyncSuccess(null), 3000);
    } catch {
      setSyncSuccess(false);
    } finally {
      setSyncing(false);
    }
  };

  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shrink-0 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand logo & Platform Name: Mundo TIC */}
          <div className="flex items-center gap-6 lg:gap-8">
            <div
              className="flex items-center gap-3 cursor-pointer select-none group"
              onClick={() => onNavigate('dashboard')}
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                🌐
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Mundo TIC
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  5.º Ano
                </span>
              </div>
            </div>

            <div className="hidden lg:block h-6 w-px bg-slate-200" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5">
              {/* Home */}
              <button
                onClick={() => onNavigate('dashboard')}
                className={`py-5 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeView === 'dashboard'
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 border-transparent'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>{t.navHome}</span>
              </button>

              {/* Progress & Badges */}
              <button
                onClick={() => onNavigate('progress')}
                className={`py-5 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeView === 'progress'
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 border-transparent'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-amber-500" />
                <span>{t.navProgress}</span>
              </button>

              {/* Ranking das Turmas */}
              <button
                onClick={onOpenLeaderboard}
                className="py-5 text-sm font-extrabold text-amber-700 hover:text-amber-900 transition-colors border-b-2 border-transparent flex items-center gap-2 cursor-pointer bg-amber-50/60 hover:bg-amber-100/80 px-3 my-2.5 rounded-xl border border-amber-200/80"
              >
                <Trophy className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>{language === 'pt' ? '🏆 Ranking Turmas' : '🏆 Class Ranking'}</span>
              </button>
            </nav>
          </div>

          {/* Right Controls: Points, Language, User Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Student Points Pill */}
            {user && (
              <div
                onClick={() => onNavigate('progress')}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-bold shadow-2xs hover:bg-amber-100/80 transition-colors"
                title={t.pointsEarned}
              >
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{user.points}</span>
                <span className="hidden sm:inline font-semibold text-amber-700/80">pts</span>
              </div>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer border border-slate-200 hover:bg-slate-200/60 transition-colors"
                aria-label="Selecionar Idioma"
              >
                <span>{language === 'pt' ? '🇵🇹' : '🇬🇧'}</span>
                <span className="text-slate-700">{language === 'pt' ? 'PT-PT' : 'EN'}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      onLanguageChange('pt');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center gap-2.5 hover:bg-slate-50 transition-colors ${
                      language === 'pt' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>🇵🇹</span>
                    <span>Português (PT-PT)</span>
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center gap-2.5 hover:bg-slate-50 transition-colors ${
                      language === 'en' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth / Profile Area */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                      {language === 'pt' ? 'Estudante' : 'Student'}
                    </p>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[120px]">
                      {user.name}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.studentAccount}</span>
                        {user.turma && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {user.turma}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      {user.publicId && (
                        <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{language === 'pt' ? 'ID Público Anónimo' : 'Public ID'}</p>
                          <p className="text-xs font-bold text-indigo-900 font-mono">{user.publicId}</p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('progress');
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <BarChart3 className="w-4 h-4 text-indigo-600" />
                      <span>{t.navProgress}</span>
                    </button>

                    <button
                      onClick={handleSyncCloud}
                      disabled={syncing}
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center gap-2 font-medium cursor-pointer transition-colors ${
                        syncSuccess
                          ? 'text-emerald-700 bg-emerald-50'
                          : 'text-indigo-700 hover:bg-indigo-50'
                      }`}
                    >
                      {syncSuccess ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Cloud className={`w-4 h-4 text-indigo-600 ${syncing ? 'animate-bounce' : ''}`} />
                      )}
                      <span>
                        {syncing
                          ? (language === 'pt' ? 'A guardar na Base de Dados...' : 'Saving to Database...')
                          : syncSuccess
                          ? (language === 'pt' ? 'Guardado no Firestore!' : 'Saved to Firestore!')
                          : (language === 'pt' ? 'Sincronizar com Firestore' : 'Sync to Firestore')}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>{t.navLogout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span>{t.navLogin}</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 shadow-md animate-in slide-in-from-top duration-150 max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 ${
              activeView === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-5 h-5 text-indigo-600" />
            <span>{t.navHome}</span>
          </button>

          <button
            onClick={() => {
              onNavigate('progress');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 ${
              activeView === 'progress' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-5 h-5 text-amber-500" />
            <span>{t.navProgress}</span>
          </button>

          <button
            onClick={() => {
              onOpenLeaderboard();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-extrabold text-amber-900 bg-amber-50 border border-amber-200 flex items-center gap-3"
          >
            <Trophy className="w-5 h-5 text-amber-500 animate-pulse" />
            <span>{language === 'pt' ? '🏆 Ranking das Turmas' : '🏆 Class Ranking'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
