import React, { useState } from 'react';
import { Award, ArrowRight, ShieldCheck, FileSpreadsheet, Lock, Eye, BookOpen, AlertCircle, X, Sparkles } from 'lucide-react';
import { User, ActivityProgress, UserAchievement, Language, ThemeVisibilityMap } from '../types';
import { translations } from '../i18n/translations';
import { ALL_THEMES } from '../data/allThemesData';
import { BADGES } from '../data/badgesData';
import { ThemeIllustration } from './illustrations/ThemeIllustrations';
import { getThemeImage } from '../data/themeImages';
import { isUserAdmin, DEFAULT_THEME_VISIBILITY } from '../services/api';
import { HeroTICBanner } from './HeroTICBanner';
import { DailyTipWidget } from './DailyTipWidget';

interface DashboardProps {
  user: User | null;
  progressList: ActivityProgress[];
  achievements: UserAchievement[];
  language: Language;
  themeVisibility?: ThemeVisibilityMap;
  onNavigateTheme: (themeId: string, moduleId?: string, challengeId?: string) => void;
  onNavigateProgress: () => void;
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  onOpenAdminWithTab?: (tab: 'students' | 'turmas' | 'themes' | 'danger') => void;
  onToggleThemeVisibility?: (themeId: string) => void;
  onOpenLeaderboard?: () => void;
  onPointsAwarded?: (user: User | null, points: number, achievements: UserAchievement[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  progressList,
  achievements,
  language,
  themeVisibility = DEFAULT_THEME_VISIBILITY,
  onNavigateTheme,
  onNavigateProgress,
  onOpenAuth,
  onOpenAdmin,
  onOpenAdminWithTab,
  onToggleThemeVisibility,
  onOpenLeaderboard,
  onPointsAwarded,
}) => {
  const t = translations[language];
  const isAdmin = user ? isUserAdmin(user.email, user.role) : false;
  const [lockedNoticeModal, setLockedNoticeModal] = useState<string | null>(null);

  // Calculate statistics across all themes
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
          bgBadge: 'bg-rose-100 text-rose-800 border-rose-200',
          bar: 'bg-rose-600',
          hoverBorder: 'hover:border-rose-400',
        };
      case 6:
        return {
          bgBadge: 'bg-amber-100 text-amber-800 border-amber-200',
          bar: 'bg-amber-600',
          hoverBorder: 'hover:border-amber-400',
        };
      case 7:
        return {
          bgBadge: 'bg-teal-100 text-teal-800 border-teal-200',
          bar: 'bg-teal-600',
          hoverBorder: 'hover:border-teal-400',
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
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'pt' ? 'Olá' : 'Hello'}, {user ? user.name : (language === 'pt' ? 'Estudante' : 'Student')}! 👋
          </h1>
        </div>
      </header>

      {/* Admin / Teacher Welcome Banner */}
      {isAdmin && (
        <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white shadow-lg border border-amber-400/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {language === 'pt' ? 'Área da Professora / Administrador' : 'Teacher / Administrator'}
                </span>
                <span className="text-xs text-indigo-300 font-mono">{user?.email}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {language === 'pt' ? 'Gestão de Aulas, Pautas & Controlo de Temas' : 'Class Records & Curriculum Controls'}
              </h3>
              <p className="text-xs text-indigo-200 mt-0.5 max-w-2xl">
                {language === 'pt'
                  ? 'Consulte os alunos registados por turma com nome real, notas e pontuação (XP), e controle a visibilidade dos 7 temas de acordo com o ritmo das aulas.'
                  : 'View registered students by class and control theme visibility for the students.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {onOpenAdminWithTab && (
              <button
                type="button"
                onClick={() => onOpenAdminWithTab('themes')}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                <span>{language === 'pt' ? 'Gerir Visibilidade dos Temas' : 'Manage Themes'}</span>
              </button>
            )}

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-slate-950" />
                <span>{language === 'pt' ? 'Abrir Pautas XLS' : 'Open Records XLS'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Welcome & Introduction Presentation - Exact Visual from User Design */}
      <HeroTICBanner
        user={user}
        language={language}
        onOpenAuth={onOpenAuth}
        onOpenLeaderboard={onOpenLeaderboard}
        onNavigateProgress={onNavigateProgress}
        onNavigateTheme={onNavigateTheme}
      />

      {/* Main 12-Column Grid for Themes & Sidebar */}
      <div id="curriculum-themes-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start scroll-mt-6">
        {/* Left Column (Span 8): 7 Main Theme Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'pt' ? 'Temas de Aprendizagem' : 'Learning Themes'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'pt' ? '7 Temas Curriculares de Tecnologias de Informação e Comunicação' : '7 Curriculum Topics'}
              </p>
            </div>
            {isAdmin && (
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Modo Professora Ativo' : 'Teacher Mode'}</span>
              </span>
            )}
          </div>

          {/* 7 Theme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ALL_THEMES.map((theme) => {
              const isVisibleForStudents = themeVisibility[theme.id] !== false;
              const themeActivitiesCount = theme.modules.length + theme.challenges.length;
              const themeCompletedCount = progressList.filter(
                (p) => (p.themeId === theme.id || (theme.id === 'tic-sociedade' && p.themeId === 'seguranca-digital')) && p.status === 'completed'
              ).length;
              const themePct = themeActivitiesCount > 0 ? Math.min(100, Math.round((themeCompletedCount / themeActivitiesCount) * 100)) : 0;
              const colorInfo = getThemeColor(theme.number);

              // Click handler
              const handleCardClick = () => {
                if (isAdmin || isVisibleForStudents) {
                  onNavigateTheme(theme.id);
                } else {
                  setLockedNoticeModal(theme.title[language] || `Tema ${theme.number}`);
                }
              };

              return (
                <div
                  key={theme.id}
                  onClick={handleCardClick}
                  className={`bg-white rounded-[2rem] border transition-all duration-200 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                    !isVisibleForStudents && !isAdmin
                      ? 'border-slate-300 shadow-xs bg-slate-50/70 hover:border-slate-400'
                      : `border-slate-200 shadow-xs hover:shadow-md ${colorInfo.hoverBorder}`
                  } p-5 sm:p-6`}
                >
                  <div>
                    {/* Theme Illustration Header */}
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300 relative shadow-inner">
                      <img
                        src={getThemeImage(theme.id)}
                        alt={theme.title[language]}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          !isVisibleForStudents && !isAdmin ? 'grayscale-[60%] blur-[0.5px] opacity-75' : 'group-hover:scale-105'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                      {/* Locked Overlay Badge for Students */}
                      {!isVisibleForStudents && !isAdmin && (
                        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4">
                          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg mb-2">
                            <Lock className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-black text-white px-2.5 py-1 rounded-lg bg-black/60 border border-white/20">
                            {language === 'pt' ? 'Bloqueado pela Professora' : 'Locked by Teacher'}
                          </span>
                          <span className="text-[10px] text-amber-200 font-medium mt-1">
                            {language === 'pt' ? 'Disponível em breve nas aulas' : 'Coming soon in class'}
                          </span>
                        </div>
                      )}

                      {/* Admin Theme Toggle Ribbon */}
                      {isAdmin && (
                        <div className="absolute top-2.5 right-2.5 z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onToggleThemeVisibility) {
                                onToggleThemeVisibility(theme.id);
                              }
                            }}
                            title={language === 'pt' ? 'Alterar visibilidade para alunos' : 'Toggle student visibility'}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer border ${
                              isVisibleForStudents
                                ? 'bg-emerald-600/90 hover:bg-emerald-600 text-white border-emerald-400/40'
                                : 'bg-slate-900/90 hover:bg-slate-900 text-amber-300 border-amber-400/40'
                            }`}
                          >
                            {isVisibleForStudents ? (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>{language === 'pt' ? 'Visível' : 'Visible'}</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3 h-3 text-amber-400" />
                                <span>{language === 'pt' ? 'Oculto' : 'Hidden'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Theme Badge & Number */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${colorInfo.bgBadge}`}>
                          Tema {theme.number}
                        </span>
                        {!isVisibleForStudents && isAdmin && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            {language === 'pt' ? 'Oculto a Alunos' : 'Hidden'}
                          </span>
                        )}
                      </div>
                      <span className="text-xl">{theme.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-base sm:text-lg font-bold leading-snug ${
                      !isVisibleForStudents && !isAdmin
                        ? 'text-slate-600'
                        : 'text-slate-900 group-hover:text-indigo-600 transition-colors'
                    }`}>
                      {theme.title[language]}
                    </h3>

                    {/* Tagline */}
                    <p className="text-slate-500 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                      {theme.tagline[language]}
                    </p>
                  </div>

                  {/* Progress & Action Button */}
                  <div className="pt-3 border-t border-slate-100 mt-4">
                    {isVisibleForStudents || isAdmin ? (
                      <>
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
                          <span>
                            {isAdmin && !isVisibleForStudents
                              ? (language === 'pt' ? 'Pré-visualizar Tema (Professora)' : 'Preview Topic')
                              : (language === 'pt' ? 'Explorar o Tema' : 'Explore Topic')}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </>
                    ) : (
                      <div className="py-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5 text-amber-500" />
                            {language === 'pt' ? 'Em Espera para as Próximas Aulas' : 'Waiting for upcoming classes'}
                          </span>
                          <span className="text-[11px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
                            {language === 'pt' ? 'Em Breve' : 'Soon'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Locked Notice Dialog for Students */}
          {lockedNoticeModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-inner text-2xl">
                  🔒
                </div>

                <div className="space-y-1.5">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">
                    {language === 'pt' ? 'Conteúdo em Espera' : 'Locked Content'}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-2">
                    {lockedNoticeModal}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {language === 'pt'
                      ? 'Este tema ainda não foi disponibilizado pela Professora Carla. Fica atento às próximas aulas de TIC para desbloquear este conteúdo e realizar as atividades!'
                      : 'This theme is not yet available. Stay tuned for upcoming classes!'}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setLockedNoticeModal(null)}
                    className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                  >
                    {language === 'pt' ? 'Entendido, voltar aos Temas' : 'Got it, back to Themes'}
                  </button>
                </div>
              </div>
            </div>
          )}

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
          {/* Daily TIC Tip & Fun Fact Widget (Sabias que...?) with points reward */}
          <DailyTipWidget
            user={user}
            language={language}
            onPointsAwarded={onPointsAwarded}
            onOpenAuth={onOpenAuth}
          />

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
        </div>
      </div>
    </div>
  );
};
