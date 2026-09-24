import React from 'react';
import {
  Trophy,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  Zap,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { User, ActivityProgress, Language, Theme } from '../types';
import { BADGES } from '../data/badgesData';

interface GlobalProgressBarProps {
  user: User | null;
  progressList: ActivityProgress[];
  themes: Theme[];
  language: Language;
  onNavigateTheme?: (themeId: string, moduleId?: string, challengeId?: string) => void;
  onNavigateProgress?: () => void;
  onOpenAuth?: () => void;
}

export const GlobalProgressBar: React.FC<GlobalProgressBarProps> = ({
  user,
  progressList,
  themes,
  language,
  onNavigateTheme,
  onNavigateProgress,
  onOpenAuth,
}) => {
  const isPt = language === 'pt';

  // Calculate statistics across curricular activities
  const allCurricularChallenges = themes.flatMap((theme) => theme.challenges);
  const totalActivities = allCurricularChallenges.length;

  const completedActivities = allCurricularChallenges.filter((challenge) =>
    progressList.some((p) => p.activityId === challenge.id && p.status === 'completed')
  );
  const completedCount = completedActivities.length;

  const overallPercentage =
    totalActivities > 0
      ? Math.max(0, Math.min(100, Math.round((completedCount / totalActivities) * 100)))
      : 0;

  // Calculate completed themes (where all challenges in the theme are completed)
  const fullyCompletedThemes = themes.filter((t) =>
    t.challenges.length > 0 &&
    t.challenges.every((c) =>
      progressList.some((p) => p.activityId === c.id && p.status === 'completed')
    )
  );

  // Find next recommended incomplete theme
  const nextIncompleteTheme = themes.find((t) =>
    t.challenges.some(
      (c) => !progressList.some((p) => p.activityId === c.id && p.status === 'completed')
    )
  ) || themes[0];

  // Motivational message and color scheme based on overall progress
  const getMotivationalContent = () => {
    if (!user) {
      return {
        icon: '💡',
        title: isPt ? 'Acompanha a tua evolução' : 'Track your progress',
        message: isPt
          ? 'Entra com as tuas credenciais de turma para guardar as tuas respostas, ganhar pontos XP e desbloquear medalhas!'
          : 'Log in with your class credentials to save your progress, earn XP points, and unlock badges!',
        accent: 'from-indigo-600 via-sky-600 to-purple-600',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      };
    }

    if (overallPercentage === 100) {
      return {
        icon: '🏆',
        title: isPt ? '100% Concluído — Mestre Digital!' : '100% Completed — Digital Master!',
        message: isPt
          ? 'Parabéns! Concluíste todos os temas curriculares de TIC 5.º Ano com sucesso absoluto!'
          : 'Congratulations! You have completed all 5th Grade ICT curriculum modules with flying colors!',
        accent: 'from-amber-500 via-emerald-500 to-teal-500',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      };
    }

    if (overallPercentage >= 75) {
      return {
        icon: '🔥',
        title: isPt ? 'Quase no topo!' : 'Almost at the top!',
        message: isPt
          ? `Estás a ${100 - overallPercentage}% de completar todo o programa de TIC! Explora os módulos que faltam.`
          : `Only ${100 - overallPercentage}% left to finish the entire ICT curriculum! Explore the remaining modules.`,
        accent: 'from-indigo-600 via-purple-600 to-emerald-600',
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    }

    if (overallPercentage >= 40) {
      return {
        icon: '⚡',
        title: isPt ? 'Excelente ritmo!' : 'Great pace!',
        message: isPt
          ? 'Já percorreste uma grande parte dos módulos de TIC. Continua o bom trabalho nos temas restantes!'
          : 'You have covered a major part of the ICT modules. Keep up the great work on remaining topics!',
        accent: 'from-indigo-600 via-sky-600 to-teal-600',
        badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      };
    }

    if (overallPercentage > 0) {
      return {
        icon: '🌱',
        title: isPt ? 'Bom começo!' : 'Good start!',
        message: isPt
          ? 'Continua a explorar os temas de TIC para aprender mais sobre segurança, algoritmos e ferramentas digitais!'
          : 'Keep exploring ICT themes to learn about digital safety, algorithms, and digital tools!',
        accent: 'from-blue-600 via-indigo-600 to-purple-600',
        badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      };
    }

    return {
      icon: '🚀',
      title: isPt ? 'Inicia a tua jornada nas TIC' : 'Start your ICT journey',
      message: isPt
        ? 'Explora o primeiro tema abaixo para realizar os desafios práticos, responder a quizzes e ganhar pontos XP!'
        : 'Explore the first module below to complete hands-on activities, quizzes, and earn XP points!',
      accent: 'from-indigo-600 via-indigo-500 to-purple-600',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    };
  };

  const motivation = getMotivationalContent();

  const handleActionClick = () => {
    if (!user) {
      onOpenAuth?.();
    } else if (nextIncompleteTheme && onNavigateTheme) {
      onNavigateTheme(nextIncompleteTheme.id);
    } else if (onNavigateProgress) {
      onNavigateProgress();
    }
  };

  return (
    <section
      aria-label={isPt ? 'Progresso Global dos Temas' : 'Global Curriculum Progress'}
      className="relative w-full rounded-3xl bg-gradient-to-br from-white via-indigo-50/40 to-slate-50 border-2 border-indigo-100/90 shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6 md:p-7 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-indigo-200/30 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-sky-200/25 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
        {/* Top Header Row: Title, Percentage Badge & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center text-xl shadow-md shrink-0">
              {motivation.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {isPt ? 'Progresso Global dos Temas TIC 5' : 'Global ICT 5 Curriculum Progress'}
                </h2>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${motivation.badgeColor}`}>
                  {motivation.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                {motivation.message}
              </p>
            </div>
          </div>

          {/* Large Percentage Indicator & CTA */}
          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black text-indigo-900 leading-none">
                {overallPercentage}%
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                {isPt ? 'Concluído' : 'Completed'}
              </div>
            </div>

            <button
              onClick={handleActionClick}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              <span>
                {!user
                  ? isPt
                    ? 'Entrar na Conta'
                    : 'Log In'
                  : overallPercentage === 100
                  ? isPt
                    ? 'Ver Minhas Medalhas'
                    : 'View Badges'
                  : isPt
                  ? 'Explorar Próximo Módulo'
                  : 'Continue Next Module'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Animated Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3.5 sm:h-4 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/60 shadow-inner">
            <div
              role="progressbar"
              aria-valuenow={overallPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              className={`h-full rounded-full bg-gradient-to-r ${motivation.accent} transition-all duration-700 shadow-sm relative`}
              style={{ width: `${Math.max(overallPercentage, overallPercentage > 0 ? 3 : 0)}%` }}
            >
              {overallPercentage > 12 && (
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              )}
            </div>
          </div>

          {/* Bottom Statistics Counters */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-600 pt-1">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {completedCount} / {totalActivities}{' '}
                  <span className="font-medium text-slate-500">
                    {isPt ? 'desafios concluídos' : 'challenges completed'}
                  </span>
                </span>
              </span>

              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>
                  {fullyCompletedThemes.length} / {themes.length}{' '}
                  <span className="font-medium text-slate-500">
                    {isPt ? 'temas 100% dominados' : 'mastered themes'}
                  </span>
                </span>
              </span>
            </div>

            {user && (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>{user.points || 0} XP</span>
                </span>

                {onNavigateProgress && (
                  <button
                    onClick={onNavigateProgress}
                    className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>{isPt ? 'Ver Caderneta Completa' : 'View Full Report'}</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
