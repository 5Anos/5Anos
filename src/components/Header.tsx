import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, User as UserIcon, LogOut, Menu, X, Sparkles, BookOpen, ChevronDown, Compass } from 'lucide-react';
import { User, Language } from '../types';
import { translations } from '../i18n/translations';
import { ALL_THEMES } from '../data/allThemesData';

interface HeaderProps {
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  language,
  onLanguageChange,
  activeView,
  onNavigate,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themesDropdownOpen, setThemesDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setThemesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const safeActiveView = activeView || '';
  const isThemeActive = safeActiveView.startsWith('theme-') || ALL_THEMES.some((t) => t.id === safeActiveView);
  const currentActiveTheme = ALL_THEMES.find((th) => th.id === safeActiveView || `theme-${th.number}` === safeActiveView);

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

              {/* Themes Dropdown Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setThemesDropdownOpen(!themesDropdownOpen)}
                  className={`py-5 text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                    isThemeActive
                      ? 'text-indigo-600 border-indigo-600'
                      : 'text-slate-600 hover:text-slate-900 border-transparent'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {currentActiveTheme ? `Tema ${currentActiveTheme.number}: ${currentActiveTheme.title[language]}` : (language === 'pt' ? 'Temas (1 a 6)' : 'Topics (1 to 6)')}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${themesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {themesDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-80 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3.5 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {language === 'pt' ? 'Escolhe um Tema' : 'Select a Theme'}
                    </div>
                    <div className="max-h-96 overflow-y-auto py-1">
                      {ALL_THEMES.map((theme) => {
                        const isCurrent = activeView === theme.id || activeView === `theme-${theme.number}`;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => {
                              onNavigate(theme.id);
                              setThemesDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                              isCurrent ? 'bg-indigo-50/80 text-indigo-700 font-bold' : 'text-slate-700'
                            }`}
                          >
                            <span className="text-xl shrink-0">{theme.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">
                                Tema {theme.number}: {theme.title[language]}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">
                                {theme.modules.length} {language === 'pt' ? 'conteúdos' : 'topics'} • {theme.challenges.length} {language === 'pt' ? 'desafios' : 'challenges'}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

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
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.studentAccount}</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('progress');
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <BarChart3 className="w-4 h-4 text-indigo-600" />
                      <span>{t.navProgress}</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-md animate-in slide-in-from-top duration-150 max-h-[80vh] overflow-y-auto">
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

          <div className="pt-2 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {language === 'pt' ? 'Temas de Estudo (1 a 6)' : 'Study Topics (1 to 6)'}
          </div>

          {ALL_THEMES.map((theme) => {
            const isCurrent = activeView === theme.id || activeView === `theme-${theme.number}`;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onNavigate(theme.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                  isCurrent ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{theme.icon}</span>
                <span className="truncate">Tema {theme.number}: {theme.title[language]}</span>
              </button>
            );
          })}

          <div className="pt-2">
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
          </div>
        </div>
      )}
    </header>
  );
};
