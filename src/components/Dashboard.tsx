import React from 'react';
import { Award, ArrowRight, BookOpen, Gamepad2, Sparkles, CheckCircle2 } from 'lucide-react';
import { User, ActivityProgress, UserAchievement, Language } from '../types';
import { translations } from '../i18n/translations';
import { ALL_THEMES } from '../data/allThemesData';
import { BADGES } from '../data/badgesData';
import { ThemeIllustration } from './illustrations/ThemeIllustrations';

interface DashboardProps {
  user: User | null;
  progressList: ActivityProgress[];
  achievements: UserAchievement[];
  language: Language;
  onNavigateTheme: (themeId: string, moduleId?: string, challengeId?: string) => void;
  onNavigateProgress: () => void;
  onOpenAuth: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  progressList,
  achievements,
  language,
  onNavigateTheme,
  onNavigateProgress,
  onOpenAuth,
}) => {
  const t = translations[language];

  // Calculate statistics across all 6 themes
  const totalActivities = ALL_THEMES.reduce(
    (acc, theme) => acc + theme.modules.length + theme.challenges.length,
    0
  );

  const completedCount = progressList.filter((p) => p.status === 'completed').length;
  const overallPercentage = totalActivities > 0 ? Math.min(100, Math.round((completedCount / totalActivities) * 100)) : 0;

  // Best score among all quizzes
  const quizScores = progressList
    .filter((p) => p.bestPercentage !== undefined)
    .map((p) => p.bestPercentage as number);
  const bestScore = quizScores.length > 0 ? Math.max(...quizScores) : 0;

  // Last activity recommendation
  const lastAct = user?.lastActivity;

  // Color mappings per theme number
  const getThemeColor = (num: number) => {
    switch (num) {
      case 1:
        return {
          bgBadge: 'bg-blue-100 text-blue-800 border-blue-200',
          bar: 'bg-blue-600',
          hoverBorder: 'hover:border-blue-400',
        };
      case 2:
        return {
          bgBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          bar: 'bg-emerald-600',
          hoverBorder: 'hover:border-emerald-400',
        };
      case 3:
        return {
          bgBadge: 'bg-sky-100 text-sky-800 border-sky-200',
          bar: 'bg-sky-600',
          hoverBorder: 'hover:border-sky-400',
        };
      case 4:
        return {
          bgBadge: 'bg-purple-100 text-purple-800 border-purple-200',
          bar: 'bg-purple-600',
          hoverBorder: 'hover:border-purple-400',
        };
      case 5:
        return {
          bgBadge: 'bg-amber-100 text-amber-800 border-amber-200',
          bar: 'bg-amber-600',
          hoverBorder: 'hover:border-amber-400',
        };
      case 6:
        return {
          bgBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          bar: 'bg-indigo-600',
          hoverBorder: 'hover:border-indigo-400',
        };
      default:
        return {
          bgBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          bar: 'bg-indigo-600',
          hoverBorder: 'hover:border-indigo-400',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header with Geometric Balance Alignment */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-bold text-indigo-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Mundo TIC • 5.º Ano</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {language === 'pt' ? 'Olá' : 'Hello'}, {user ? user.name : (language === 'pt' ? 'Estudante' : 'Student')}! 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            {language === 'pt'
              ? 'Explora os 6 temas principais de Tecnologias de Informação e Comunicação.'
              : 'Explore the 6 main topics of Information and Communication Technologies.'}
          </p>
        </div>

        {/* Circular General Progress Badge */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.overallProgress}</p>
            <p className="text-lg font-bold text-indigo-600">{overallPercentage}%</p>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={163.36}
                strokeDashoffset={163.36 * (1 - overallPercentage / 100)}
                strokeLinecap="round"
                className="text-indigo-600 transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
              {completedCount}/{totalActivities}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Recommendation Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-[2rem] p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden shadow-xl gap-6">
        <div className="relative z-10 space-y-3 sm:space-y-4 max-w-lg">
          <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-100 border border-white/15">
            {t.continueLearning}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-snug">
            {lastAct
              ? lastAct.title
              : (language === 'pt' ? 'As TIC e a Sociedade: Como a tecnologia transforma o nosso dia a dia' : 'ICT and Society: How tech shapes our daily lives')}
          </h2>
          <p className="text-indigo-100/90 text-xs sm:text-sm leading-relaxed">
            {lastAct
              ? t.continueFromWhereYouLeft
              : (language === 'pt'
                  ? 'Aprende como os computadores e a internet funcionam na escola, hospitais, transportes e na comunicação responsável.'
                  : 'Discover how computers and networks power schools, hospitals, transport, and responsible communication.')}
          </p>
          <button
            onClick={() => {
              if (lastAct) {
                onNavigateTheme(lastAct.themeId, lastAct.moduleId, lastAct.challengeId);
              } else {
                onNavigateTheme('tic-sociedade');
              }
            }}
            className="bg-white text-indigo-950 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-colors shadow-sm cursor-pointer"
          >
            <span>
              {lastAct
                ? (language === 'pt' ? 'Continuar 🚀' : 'Resume 🚀')
                : (language === 'pt' ? 'Explorar o Tema 🚀' : 'Explore Topic 🚀')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative z-10 w-44 h-40 sm:w-56 sm:h-44 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-3 shrink-0 self-center md:self-auto overflow-hidden">
          <ThemeIllustration
            themeId={lastAct ? lastAct.themeId : 'tic-sociedade'}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute right-[-20px] top-[-20px] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main 12-Column Grid for Themes & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Span 8): 6 Main Theme Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>{language === 'pt' ? 'Temas de Aprendizagem' : 'Learning Themes'}</span>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                6 {language === 'pt' ? 'Temas' : 'Themes'}
              </span>
            </h2>
          </div>

          {/* 6 Theme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ALL_THEMES.map((theme) => {
              const themeActivitiesCount = theme.modules.length + theme.challenges.length;
              const themeCompletedCount = progressList.filter(
                (p) => (p.themeId === theme.id || (theme.id === 'tic-sociedade' && p.themeId === 'seguranca-digital')) && p.status === 'completed'
              ).length;
              const themePct = themeActivitiesCount > 0 ? Math.min(100, Math.round((themeCompletedCount / themeActivitiesCount) * 100)) : 0;
              const colorInfo = getThemeColor(theme.number);

              return (
                <div
                  key={theme.id}
                  onClick={() => onNavigateTheme(theme.id)}
                  className={`bg-white rounded-[2rem] border border-slate-200 shadow-xs p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between cursor-pointer hover:shadow-md ${colorInfo.hoverBorder} group`}
                >
                  <div>
                    {/* Theme Illustration Header */}
                    <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 bg-slate-50 border border-slate-100 group-hover:scale-[1.02] transition-transform duration-200">
                      <ThemeIllustration themeId={theme.id} className="w-full h-full object-contain" />
                    </div>

                    {/* Theme Badge & Number */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${colorInfo.bgBadge}`}>
                        Tema {theme.number}
                      </span>
                      <span className="text-xl">{theme.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {theme.title[language]}
                    </h3>

                    {/* Tagline */}
                    <p className="text-slate-500 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                      {theme.tagline[language]}
                    </p>

                    {/* Contents & Challenges badges */}
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 my-3.5">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-slate-500" />
                        <span>{theme.modules.length} {language === 'pt' ? 'Conteúdos' : 'Topics'}</span>
                      </span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Gamepad2 className="w-3 h-3 text-slate-500" />
                        <span>{theme.challenges.length} {language === 'pt' ? 'Desafios' : 'Challenges'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Progress & Action Button */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-slate-500">
                      <span>{language === 'pt' ? 'Progresso' : 'Progress'}</span>
                      <span className="font-bold text-slate-700">{themePct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorInfo.bar}`}
                        style={{ width: `${themePct}%` }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                      <span>{language === 'pt' ? 'Explorar o Tema' : 'Explore Topic'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guest Notice */}
          {!user && (
            <div className="bg-white p-5 rounded-[2rem] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">
                  💡
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {t.guestNotice}
                </p>
              </div>
              <button
                onClick={onOpenAuth}
                className="shrink-0 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
              >
                {t.navLogin}
              </button>
            </div>
          )}
        </div>

        {/* Right Column (Span 4): Gamification & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Accumulated Points Card */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-4xl mb-3 border-4 border-white shadow-inner">
              ⭐
            </div>
            <div className="text-3xl font-black text-slate-900">{user?.points || 0}</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {language === 'pt' ? 'Pontos Acumulados' : 'Accumulated Points'}
            </p>
            <button
              onClick={onNavigateProgress}
              className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-wider transition-colors cursor-pointer"
            >
              {language === 'pt' ? 'Ver Progresso & Conquistas' : 'View Progress & Badges'}
            </button>
          </div>

          {/* Achievements Card */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xs flex flex-col">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
              <span>{language === 'pt' ? 'Conquistas' : 'Achievements'}</span>
              <span className="text-indigo-600 normal-case font-bold">
                {achievements.length}/{BADGES.length}
              </span>
            </h3>
            <div className="flex flex-col gap-3">
              {BADGES.slice(0, 4).map((badge) => {
                const isUnlocked = achievements.some((a) => a.badgeId === badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                      isUnlocked
                        ? 'bg-slate-50/80 border-slate-200/80'
                        : 'bg-white border-slate-100 opacity-60'
                    }`}
                  >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-xs border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {language === 'pt' ? badge.namePt : badge.nameEn}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {language === 'pt' ? badge.descPt : badge.descEn}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isUnlocked ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isUnlocked ? (language === 'pt' ? 'Ganho' : 'Earned') : (language === 'pt' ? 'Pendente' : 'Locked')}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={onNavigateProgress}
              className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 text-center cursor-pointer transition-colors"
            >
              {language === 'pt' ? 'Ver todas as insígnias →' : 'View all badges →'}
            </button>
          </div>

          {/* Performance Card */}
          <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-xl shrink-0 shadow-xs">
              🎯
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                {language === 'pt' ? 'Melhor Desempenho' : 'Best Performance'}
              </p>
              <p className="text-sm font-bold text-emerald-900">
                {bestScore > 0
                  ? (language === 'pt' ? `Quiz: Melhor Nota (${bestScore}%)` : `Quiz: Top Score (${bestScore}%)`)
                  : (language === 'pt' ? 'Pronto para o 1.º Quiz!' : 'Ready for Quiz 1!')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Carousel at Bottom */}
      <div className="bg-white p-6 sm:p-7 rounded-[2rem] border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{t.recentBadgesTitle}</h3>
          </div>
          <button
            onClick={onNavigateProgress}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
          >
            {t.viewAllProgress} →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-9 gap-3">
          {BADGES.map((badge) => {
            const isUnlocked = achievements.some((a) => a.badgeId === badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                  isUnlocked
                    ? 'bg-amber-50/60 border-amber-200 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200/70 opacity-55 grayscale'
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-1">{badge.icon}</div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight truncate w-full">
                  {language === 'pt' ? badge.namePt : badge.nameEn}
                </p>
                <span
                  className={`text-[10px] font-semibold mt-1 px-1.5 py-0.5 rounded-md ${
                    isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isUnlocked ? (language === 'pt' ? 'Ganho' : 'Earned') : (language === 'pt' ? 'Bloqueado' : 'Locked')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
