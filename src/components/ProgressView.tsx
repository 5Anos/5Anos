import React from 'react';
import { Award, Sparkles, CheckCircle2, Circle, Clock, Printer, Shield, Mail, TrendingUp, Calendar } from 'lucide-react';
import { User, ActivityProgress, UserAchievement, PointTransaction, Language } from '../types';
import { translations } from '../i18n/translations';
import { BADGES } from '../data/badgesData';
import { ALL_THEMES } from '../data/allThemesData';

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

  const totalActivities = ALL_THEMES.reduce(
    (acc, theme) => acc + theme.modules.length + theme.challenges.length,
    0
  );

  const completedCount = progressList.filter((p) => p.status === 'completed').length;
  const overallPercentage = Math.min(100, Math.round((completedCount / totalActivities) * 100));

  const quizRecords = progressList.filter((p) => p.bestPercentage !== undefined);
  const avgQuiz = quizRecords.length > 0
    ? Math.round(quizRecords.reduce((acc, curr) => acc + (curr.bestPercentage || 0), 0) / quizRecords.length)
    : 0;

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
            <span>{language === 'pt' ? 'Relatório de Aprendizagem' : 'Learning Report'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.navProgress}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {user ? (
              <>
                <span className="font-bold text-slate-800">{user.name}</span>
                {user.turma && (
                  <span className="px-2 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs">
                    {user.turma}
                  </span>
                )}
                {user.publicId && (
                  <span className="px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
                    🎭 {user.publicId}
                  </span>
                )}
                <span className="text-slate-400">({user.email})</span>
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
          <p className="mt-1 text-xs text-slate-500 font-medium">de {BADGES.length} insígnias totais</p>
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

      {/* Activity Records Table */}
      <div className="rounded-[2rem] bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {language === 'pt' ? 'Histórico de Atividades Realizadas' : 'Activity Progress Records'}
        </h2>

        {progressList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            {language === 'pt' ? 'Ainda não concluíste nenhuma atividade. Começa pelo Tema 1!' : 'No activities completed yet. Start with Theme 1!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">{language === 'pt' ? 'Atividade' : 'Activity'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Tipo' : 'Type'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Estado' : 'Status'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Melhor Nota' : 'Best Score'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Tentativas' : 'Attempts'}</th>
                  <th className="pb-3">{language === 'pt' ? 'Data' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {progressList.map((item) => (
                  <tr key={item.activityId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 font-semibold text-slate-800">
                      {item.activityId}
                    </td>
                    <td className="py-3 text-slate-500">
                      {item.activityType === 'module'
                        ? (language === 'pt' ? 'Conteúdo' : 'Topic')
                        : item.activityType === 'quiz'
                        ? 'Quiz'
                        : (language === 'pt' ? 'Desafio / Jogo' : 'Challenge')}
                    </td>
                    <td className="py-3">
                      {item.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.completedStatus}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{t.inProgressStatus}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-bold text-slate-900">
                      {item.bestPercentage !== undefined ? `${item.bestPercentage}%` : '—'}
                    </td>
                    <td className="py-3 text-slate-500 font-mono">
                      {item.attempts}
                    </td>
                    <td className="py-3 text-slate-500">
                      {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
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
