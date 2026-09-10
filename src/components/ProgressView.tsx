import React, { useState, useMemo } from 'react';
import { Award, Sparkles, CheckCircle2, Circle, Clock, Printer, Shield, Mail, TrendingUp, Calendar, Trophy, Star, Zap, Layers, Filter, LayoutGrid, List } from 'lucide-react';
import { User, ActivityProgress, UserAchievement, PointTransaction, Language } from '../types';
import { translations } from '../i18n/translations';
import { BADGES } from '../data/badgesData';
import { ALL_THEMES } from '../data/allThemesData';
import { quizGameTrophy, boyAvatarImg, girlAvatarImg } from '../data/themeImages';
import { resolveActivityInfo, ResolvedActivityInfo } from '../utils/activityMetadata';
import { getQuizMention, getQuizMentionBadgeStyle } from '../utils/exportUtils';

interface ProgressViewProps {
  user: User | null;
  progressList: ActivityProgress[];
  achievements: UserAchievement[];
  pointsHistory: PointTransaction[];
  language: Language;
  onOpenAuth: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  progressList,
  achievements,
  pointsHistory,
  language,
  onOpenAuth,
}) => {
  const t = translations[language];

  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');

  const totalActivities = ALL_THEMES.reduce(
    (acc, theme) => acc + theme.challenges.length,
    0
  );

  const completedCount = progressList.filter((p) => p.status === 'completed').length;
  const overallPercentage = totalActivities > 0 ? Math.min(100, Math.round((completedCount / totalActivities) * 100)) : 0;

  const quizRecords = progressList.filter((p) => p.bestPercentage !== undefined);
  const avgQuiz = quizRecords.length > 0
    ? Math.round(quizRecords.reduce((acc, curr) => acc + (curr.bestPercentage || 0), 0) / quizRecords.length)
    : 0;

  // Enrich each activity record with clean human-readable name, icon, and theme metadata
  const enrichedProgress = useMemo(() => {
    return progressList.map((item) => {
      const meta = resolveActivityInfo(item.activityId, item.themeId, item.activityType, language);
      return {
        ...item,
        meta,
      };
    });
  }, [progressList, language]);

  // Group activities by theme
  const themesWithProgress = useMemo(() => {
    return ALL_THEMES.map((theme) => {
      const themeChallengeIds = new Set(theme.challenges.map((c) => c.id));
      const items = enrichedProgress.filter(
        (p) =>
          themeChallengeIds.has(p.activityId) ||
          p.meta.themeId === theme.id ||
          p.themeId === theme.id ||
          p.themeId === String(theme.number) ||
          (theme.id === 'tic-sociedade' && (p.themeId === 'seguranca-digital' || p.activityId.includes('tic')))
      );
      const completed = items.filter((p) => p.status === 'completed').length;
      const totalThemeActivities = theme.challenges.length;
      return {
        theme,
        items,
        completed,
        totalThemeActivities,
      };
    });
  }, [enrichedProgress]);

  // Orphan/other activities (if any)
  const orphanItems = useMemo(() => {
    const allKnownThemeIds = new Set(ALL_THEMES.map((t) => t.id));
    return enrichedProgress.filter(
      (p) => !allKnownThemeIds.has(p.meta.themeId) && !allKnownThemeIds.has(p.themeId)
    );
  }, [enrichedProgress]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60 w-fit mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{language === 'pt' ? 'Relatório & Conquistas' : 'Report & Achievements'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.navProgress}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {user ? (
              <>
                <span className="font-bold text-slate-800">{user.name}</span>
                {user.turma && (
                  <span className="px-2.5 py-0.5 rounded-full font-black bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs">
                    Turma {user.turma}
                  </span>
                )}
                {user.publicId && (
                  <span className="px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
                    ID: {user.publicId}
                  </span>
                )}
              </>
            ) : (
              <span>{t.guestNotice}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{language === 'pt' ? 'Imprimir Certificado' : 'Print Certificate'}</span>
          </button>
        </div>
      </div>

      {/* Colorful Student Hero Banner with 3D Trophy */}
      <div className="rounded-[2.5rem] p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-amber-900 text-white shadow-xl relative overflow-hidden border-2 border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 backdrop-blur-md text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'pt' ? 'Quadro de Conquistas TIC' : 'ICT Achievement Board'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {user
              ? language === 'pt'
                ? `Parabéns pela tua dedicação, ${user.name}!`
                : `Great job on your progress, ${user.name}!`
              : language === 'pt'
              ? 'Explora, joga e ganha medalhas digitais!'
              : 'Explore, play and earn digital badges!'}
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
            {language === 'pt'
              ? 'Continua a responder aos quizzes e a completar desafios para encher o teu troféu de pontos e desbloquear todas as medalhas!'
              : 'Keep answering quizzes and completing challenges to fill your trophy with points and unlock all badges!'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{user?.points || 0} XP Acumulados</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-extrabold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-300" />
              <span>{achievements.length} Medalhas Desbloqueadas</span>
            </div>
          </div>
        </div>

        {/* 3D Trophy Illustration */}
        <div className="relative z-10 w-44 sm:w-52 h-44 sm:h-52 shrink-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/40 bg-white/10 p-1.5 group hover:scale-105 transition-transform duration-300">
          <img
            src={quizGameTrophy}
            alt="Troféu TIC 3D"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-0 w-60 h-60 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {!user && (
        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 text-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs sm:text-sm space-y-1">
            <p className="font-bold text-slate-900 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>{t.guestNotice}</span>
            </p>
            <p className="text-slate-500">
              {language === 'pt'
                ? 'Cria ou acede à tua conta para que o teu progresso fique gravado na nuvem para sempre.'
                : 'Create or log into your account so progress persists in the cloud forever.'}
            </p>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shrink-0 cursor-pointer shadow-xs transition-colors"
          >
            {t.navLogin}
          </button>
        </div>
      )}

      {/* Main KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.overallProgress}</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-indigo-600">{overallPercentage}%</div>
          <p className="mt-1 text-xs text-slate-500 font-medium">{completedCount} de {totalActivities} concluídas</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.pointsEarned}</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1">
            <Sparkles className="w-6 h-6" />
            <span>{user?.points || 0}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">{pointsHistory.length} recompensas ganhas</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.unlockedBadges}</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-purple-600 flex items-center gap-1">
            <Award className="w-6 h-6" />
            <span>{achievements.length}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">de {BADGES.length} medalhas totais</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language === 'pt' ? 'Média Quizzes' : 'Average Quiz'}</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-600">
            {avgQuiz > 0 ? `${avgQuiz}%` : '—'}
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">{quizRecords.length} testes realizados</p>
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="rounded-[2rem] bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{t.unlockedBadges}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'pt'
                ? 'Conquistas pedagógicas desbloqueadas com o teu esforço e acertos.'
                : 'Pedagogical achievements unlocked by your effort and achievements.'}
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
            {achievements.length} / {BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {BADGES.map((b) => {
            const ach = achievements.find((a) => a.badgeId === b.id);
            const isUnlocked = !!ach;

            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-amber-50/40 border-amber-200 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/70 opacity-60 grayscale'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{b.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isUnlocked ? (language === 'pt' ? 'Desbloqueado' : 'Unlocked') : (language === 'pt' ? 'Bloqueado' : 'Locked')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {language === 'pt' ? b.namePt : b.nameEn}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === 'pt' ? b.descPt : b.descEn}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100/80 text-[11px] text-slate-500 font-medium">
                  {isUnlocked && ach ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{new Date(ach.unlockedAt).toLocaleDateString()}</span>
                    </span>
                  ) : (
                    <span>{language === 'pt' ? `Bónus: +${b.pointsBonus} pts` : `Bonus: +${b.pointsBonus} pts`}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Records Organized by Themes */}
      <div className="rounded-[2rem] bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {language === 'pt' ? 'Histórico de Atividades por Tema' : 'Activity Progress by Theme'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'pt'
                ? 'Consulta as atividades realizadas, notas obtidas e tentativas em cada tema pedagógico.'
                : 'Review completed activities, scores and attempts across each learning theme.'}
            </p>
          </div>

          {/* View mode toggle (Grouped vs Flat List) */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grouped'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Por Temas' : 'By Themes'}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Lista Geral' : 'All Activities'}</span>
            </button>
          </div>
        </div>

        {/* Theme Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedThemeFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedThemeFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'pt' ? 'Todos os Temas (7)' : 'All Themes (7)'}
          </button>
          {ALL_THEMES.map((th) => {
            const isSelected = selectedThemeFilter === th.id;
            const themeRecords = enrichedProgress.filter(
              (p) => p.meta.themeId === th.id || p.themeId === th.id
            );
            return (
              <button
                key={th.id}
                onClick={() => setSelectedThemeFilter(th.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{th.icon}</span>
                <span>
                  {language === 'pt' ? `Tema ${th.number}` : `Theme ${th.number}`}
                </span>
                {themeRecords.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {themeRecords.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {progressList.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
            <span className="text-3xl">🚀</span>
            <p className="font-bold text-slate-700 text-sm">
              {language === 'pt' ? 'Ainda não realizaste nenhuma atividade!' : 'No activities completed yet!'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'pt'
                ? 'Explora os conteúdos pedagógicos, completa os desafios e responde aos quizzes para veres o teu histórico aqui.'
                : 'Explore learning modules, complete challenges and take quizzes to build your progress history.'}
            </p>
          </div>
        ) : viewMode === 'grouped' ? (
          /* View Mode 1: Grouped by Theme */
          <div className="space-y-6">
            {themesWithProgress
              .filter(({ theme }) => selectedThemeFilter === 'all' || selectedThemeFilter === theme.id)
              .map(({ theme, items, completed, totalThemeActivities }) => (
                <div
                  key={theme.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs"
                >
                  {/* Theme Header Banner */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-purple-50/20 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xl shrink-0">
                        {theme.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                            {language === 'pt' ? `Tema ${theme.number}` : `Theme ${theme.number}`}
                          </span>
                          <h3 className="text-sm sm:text-base font-black text-slate-900">
                            {theme.title[language]}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {theme.tagline[language]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200/80">
                        {language === 'pt'
                          ? `${completed} de ${totalThemeActivities} concluídas`
                          : `${completed} of ${totalThemeActivities} completed`}
                      </span>
                    </div>
                  </div>

                  {/* Theme Activities Table / Content */}
                  {items.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 italic">
                      {language === 'pt'
                        ? 'Nenhuma atividade registada neste tema ainda.'
                        : 'No activities recorded in this theme yet.'}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
                            <th className="py-2.5 px-4 sm:px-6">{language === 'pt' ? 'Nome da Atividade' : 'Activity Name'}</th>
                            <th className="py-2.5 px-3">{language === 'pt' ? 'Tipo' : 'Type'}</th>
                            <th className="py-2.5 px-3">{language === 'pt' ? 'Estado' : 'Status'}</th>
                            <th className="py-2.5 px-3">{language === 'pt' ? 'Pontuação Registada' : 'Recorded Score'}</th>
                            <th className="py-2.5 px-3">{language === 'pt' ? 'Tentativas' : 'Attempts'}</th>
                            <th className="py-2.5 px-4 sm:px-6">{language === 'pt' ? 'Data' : 'Date'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {items.map((item) => {
                            const isFinalQuiz = item.activityType === 'quiz' || (item.meta as any).type === 'final_quiz' || item.activityId.startsWith('quiz-final');
                            const officialQuizScore = item.firstAttemptScore ?? item.score ?? item.bestScore ?? (item.firstAttemptPercentage !== undefined ? item.firstAttemptPercentage : item.bestPercentage ?? 0);

                            return (
                            <tr
                              key={item.activityId}
                              className="hover:bg-indigo-50/40 transition-colors"
                            >
                              {/* Readable Name & Icon */}
                              <td className="py-3 px-4 sm:px-6">
                                <div className="flex items-center gap-2.5">
                                  <span className="text-lg shrink-0">{item.meta.icon}</span>
                                  <div>
                                    <p className="font-bold text-slate-800 leading-snug">
                                      {item.meta.title}
                                    </p>
                                    {item.meta.shortDesc && (
                                      <p className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                                        {item.meta.shortDesc}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Activity Type */}
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span
                                  className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                    item.meta.type === 'module'
                                      ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                                      : isFinalQuiz
                                      ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                      : 'bg-purple-50 text-purple-700 border border-purple-200/60'
                                  }`}
                                >
                                  {isFinalQuiz ? (language === 'pt' ? 'Quiz de Aprendizagem' : 'Learning Quiz') : item.meta.typeLabel}
                                </span>
                              </td>

                              {/* Status */}
                              <td className="py-3 px-3 whitespace-nowrap">
                                {item.status === 'completed' ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full font-bold text-xs">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>{t.completedStatus}</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full font-semibold text-xs">
                                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                                    <span>{t.inProgressStatus}</span>
                                  </span>
                                )}
                              </td>

                              {/* Score */}
                              <td className="py-3 px-3 whitespace-nowrap font-black">
                                {isFinalQuiz ? (
                                  <div>
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black border ${getQuizMentionBadgeStyle(officialQuizScore).pillClass}`}>
                                      {getQuizMention(officialQuizScore)}
                                    </span>
                                    <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">
                                      {language === 'pt' ? 'Menção Oficial (1.ª tentativa)' : 'Official Mention (1st attempt)'}
                                    </span>
                                    {item.attempts > 1 && (
                                      <span className="block text-[10px] text-slate-500 font-medium">
                                        {language === 'pt' ? `${item.attempts} treinos realizados` : `${item.attempts} practice runs`}
                                      </span>
                                    )}
                                  </div>
                                ) : item.bestPercentage !== undefined || item.bestScore !== undefined ? (
                                  <div>
                                    <span
                                      className={
                                        (item.bestPercentage ?? 0) >= 70
                                          ? 'text-emerald-600 text-sm'
                                          : (item.bestPercentage ?? 0) >= 40
                                          ? 'text-amber-600 text-sm'
                                          : 'text-rose-600 text-sm'
                                      }
                                    >
                                      {item.bestScore ?? item.score ?? item.bestPercentage}% (100 XP máx.)
                                    </span>
                                    {item.bestPercentage !== undefined && (
                                      <span className="block text-[10px] text-slate-400 font-normal">
                                        {item.bestPercentage}% de precisão
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-slate-400 font-normal">—</span>
                                )}
                              </td>

                              {/* Attempts */}
                              <td className="py-3 px-3 whitespace-nowrap text-slate-500 font-mono text-xs">
                                {item.attempts}{' '}
                                <span className="font-sans text-[11px] text-slate-400">
                                  {item.attempts === 1
                                    ? language === 'pt'
                                      ? 'tentativa'
                                      : 'attempt'
                                    : language === 'pt'
                                    ? 'tentativas'
                                    : 'attempts'}
                                </span>
                              </td>

                              {/* Date */}
                              <td className="py-3 px-4 sm:px-6 whitespace-nowrap text-slate-500 text-xs">
                                {item.lastUpdated
                                  ? new Date(item.lastUpdated).toLocaleDateString()
                                  : '—'}
                              </td>
                            </tr>
                          );
                        })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}

            {/* Orphan Items (if any) */}
            {orphanItems.length > 0 && selectedThemeFilter === 'all' && (
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-700">
                    {language === 'pt' ? 'Outras Atividades' : 'Other Activities'}
                  </h3>
                  <span className="text-xs text-slate-500">{orphanItems.length}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-slate-100">
                      {orphanItems.map((item) => (
                        <tr key={item.activityId} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-800">
                            {item.meta.title}
                          </td>
                          <td className="py-3 px-3 text-slate-500">{item.meta.typeLabel}</td>
                          <td className="py-3 px-3">
                            <span className="text-emerald-700 font-bold text-xs">
                              {item.status === 'completed' ? t.completedStatus : t.inProgressStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-bold">
                            {item.bestPercentage !== undefined ? `${item.bestPercentage}%` : '—'}
                          </td>
                          <td className="py-3 px-3 text-slate-500">{item.attempts}</td>
                          <td className="py-3 px-4 text-slate-500">
                            {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* View Mode 2: Flat Chronological List */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">{language === 'pt' ? 'Tema' : 'Theme'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Atividade' : 'Activity'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Tipo' : 'Type'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Estado' : 'Status'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Pontuação Registada' : 'Recorded Score'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Tentativas' : 'Attempts'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Data' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrichedProgress
                  .filter(
                    (item) =>
                      selectedThemeFilter === 'all' ||
                      item.meta.themeId === selectedThemeFilter ||
                      item.themeId === selectedThemeFilter
                  )
                  .map((item) => {
                    const isFinalQuiz = item.activityType === 'quiz' || (item.meta as any).type === 'final_quiz' || item.activityId.startsWith('quiz-final');
                    const officialQuizScore = item.firstAttemptScore ?? item.score ?? item.bestScore ?? (item.firstAttemptPercentage !== undefined ? item.firstAttemptPercentage : item.bestPercentage ?? 0);

                    return (
                    <tr
                      key={item.activityId}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Theme Pill */}
                      <td className="py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          <span>{item.meta.themeIcon}</span>
                          <span>Tema {item.meta.themeNumber}</span>
                        </span>
                      </td>

                      {/* Readable Name */}
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.meta.icon}</span>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">
                              {item.meta.title}
                            </p>
                            {item.meta.shortDesc && (
                              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                                {item.meta.shortDesc}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3 whitespace-nowrap">
                        <span className="text-xs font-semibold text-slate-600">
                          {isFinalQuiz ? (language === 'pt' ? 'Quiz de Aprendizagem' : 'Learning Quiz') : item.meta.typeLabel}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 whitespace-nowrap">
                        {item.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-xs border border-emerald-200/60">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t.completedStatus}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold text-xs border border-amber-200/60">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{t.inProgressStatus}</span>
                          </span>
                        )}
                      </td>

                      {/* Score */}
                      <td className="py-3 whitespace-nowrap font-black">
                        {isFinalQuiz ? (
                          <div>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black border ${getQuizMentionBadgeStyle(officialQuizScore).pillClass}`}>
                              {getQuizMention(officialQuizScore)}
                            </span>
                            <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">
                              {language === 'pt' ? 'Menção (1.ª tentativa)' : 'Mention (1st att.)'}
                            </span>
                            {item.attempts > 1 && (
                              <span className="block text-[10px] text-slate-500 font-medium">
                                {language === 'pt' ? `${item.attempts} treinos` : `${item.attempts} practices`}
                              </span>
                            )}
                          </div>
                        ) : item.bestPercentage !== undefined || item.bestScore !== undefined ? (
                          <div>
                            <span
                              className={
                                (item.bestPercentage ?? 0) >= 70
                                  ? 'text-emerald-600'
                                  : (item.bestPercentage ?? 0) >= 40
                                  ? 'text-amber-600'
                                  : 'text-rose-600'
                              }
                            >
                              {item.bestScore ?? item.score ?? item.bestPercentage}% (100 XP máx.)
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-normal">—</span>
                        )}
                      </td>

                      {/* Attempts */}
                      <td className="py-3 whitespace-nowrap text-slate-500 font-mono">
                        {item.attempts}
                      </td>

                      {/* Date */}
                      <td className="py-3 whitespace-nowrap text-slate-500">
                        {item.lastUpdated
                          ? new Date(item.lastUpdated).toLocaleDateString()
                          : '—'}
                      </td>
                    </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Points History */}
      {pointsHistory.length > 0 && (
        <div className="rounded-[2rem] bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>{language === 'pt' ? 'Registo de Pontos Ganhos' : 'Points Earned Log'}</span>
          </h2>

          <div className="space-y-2">
            {pointsHistory.slice(-8).reverse().map((tx) => (
              <div key={tx.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-slate-800">{tx.reason}</p>
                  <p className="text-[11px] text-slate-400">
                    {tx.timestamp ? `${new Date(tx.timestamp).toLocaleTimeString()} — ${new Date(tx.timestamp).toLocaleDateString()}` : '—'}
                  </p>
                </div>
                <span className="font-black text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-lg text-xs">
                  +{tx.amount} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
