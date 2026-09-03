import React, { useState } from 'react';
import { BookOpen, Gamepad2, ArrowLeft, CheckCircle2, Circle, Clock, Play, ChevronRight } from 'lucide-react';
import { ThemeDefinition, ActivityProgress, Language } from '../types';
import { translations } from '../i18n/translations';
import { ThemeIllustration } from './illustrations/ThemeIllustrations';

interface ThemeViewProps {
  theme: ThemeDefinition;
  progressList: ActivityProgress[];
  language: Language;
  onBack: () => void;
  onOpenModule: (moduleId: string) => void;
  onOpenChallenge: (challengeId: string) => void;
}

export const ThemeView: React.FC<ThemeViewProps> = ({
  theme,
  progressList,
  language,
  onBack,
  onOpenModule,
  onOpenChallenge,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'games'>('content');
  const t = translations[language];

  // Accent gradient based on theme
  const getBannerGradient = (themeNumber: number) => {
    switch (themeNumber) {
      case 1:
        return 'from-blue-950 via-indigo-900 to-slate-900';
      case 2:
        return 'from-emerald-950 via-teal-900 to-slate-900';
      case 3:
        return 'from-sky-950 via-blue-900 to-slate-900';
      case 4:
        return 'from-purple-950 via-violet-900 to-slate-900';
      case 5:
        return 'from-amber-950 via-yellow-900 to-slate-900';
      case 6:
        return 'from-indigo-950 via-slate-900 to-blue-950';
      default:
        return 'from-indigo-950 via-slate-900 to-blue-950';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-in fade-in duration-200">
      {/* Back Button & Header */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-4 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar ao Início' : 'Back to Home'}</span>
        </button>

        <div
          className={`p-6 sm:p-8 md:p-10 rounded-[2rem] text-white shadow-xl relative overflow-hidden bg-gradient-to-br ${getBannerGradient(
            theme.number
          )} flex flex-col md:flex-row items-center justify-between gap-6`}
        >
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              <span className="text-base">{theme.icon}</span>
              <span>Tema {theme.number}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {theme.title[language]}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {theme.intro[language]}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="bg-white/10 px-3 py-1 rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/10">
                📖 {theme.modules.length} {language === 'pt' ? 'Conteúdos' : 'Topics'}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/10">
                🎮 {theme.challenges.length} {language === 'pt' ? 'Desafios e Jogos' : 'Challenges'}
              </span>
            </div>
          </div>

          {/* Theme custom illustration graphic */}
          <div className="relative z-10 w-full md:w-80 max-w-xs shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-white/10 p-2">
            <ThemeIllustration themeId={theme.id} className="w-full h-auto rounded-xl" />
          </div>

          {/* Geometric blur accents */}
          <div className="absolute right-[-30px] top-[-30px] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>

      {/* Tabs Selector: Conteúdos vs Jogos e Desafios */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-4 px-6 text-sm sm:text-base font-bold flex items-center gap-2.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'content'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>{t.tabContent}</span>
          <span className="ml-1 px-2.5 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 font-bold">
            {theme.modules.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('games')}
          className={`pb-4 px-6 text-sm sm:text-base font-bold flex items-center gap-2.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'games'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          <span>{t.tabGames}</span>
          <span className="ml-1 px-2.5 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 font-bold">
            {theme.challenges.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Conteúdos Pedagógicos */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theme.modules.map((mod) => {
              const record = progressList.find((p) => p.activityId === mod.id);
              const isDone = record?.status === 'completed';

              return (
                <div
                  key={mod.id}
                  onClick={() => onOpenModule(mod.id)}
                  className={`rounded-[2rem] border bg-white p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                    isDone ? 'border-emerald-200 bg-emerald-50/15' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                        {language === 'pt' ? 'Conteúdo' : 'Topic'} {mod.number}
                      </span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.completedStatus}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                          <Circle className="w-3.5 h-3.5" />
                          <span>{t.notStartedStatus}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {mod.title[language]}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {mod.shortDesc[language]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{language === 'pt' ? '5 passos pedagógicos' : '5 learning steps'}</span>
                    </span>

                    <button className="text-xs sm:text-sm font-bold flex items-center gap-1 text-indigo-600 group-hover:text-indigo-700">
                      <span>{isDone ? (language === 'pt' ? 'Rever' : 'Review') : t.startModule}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Jogos e Desafios (Challenges) */}
      {activeTab === 'games' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theme.challenges.map((chal) => {
              const record = progressList.find((p) => p.activityId === chal.id);
              const isDone = record?.status === 'completed';
              const isFinalQuiz = chal.type === 'final_quiz';

              return (
                <div
                  key={chal.id}
                  onClick={() => onOpenChallenge(chal.id)}
                  className={`rounded-[2rem] border p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                    isFinalQuiz
                      ? 'border-amber-300 bg-gradient-to-br from-amber-50/70 to-orange-50/50 hover:border-amber-400'
                      : isDone
                      ? 'border-emerald-200 bg-emerald-50/15'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                          isFinalQuiz ? 'bg-amber-200/80 text-amber-900 font-extrabold' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isFinalQuiz ? '🏆 Quiz de Aprendizagem' : `Desafio ${chal.number}`}
                      </span>

                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{record.bestPercentage ? `${record.bestPercentage}%` : t.completedStatus}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                          <Circle className="w-3.5 h-3.5" />
                          <span>{t.notStartedStatus}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {chal.title[language]}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {chal.shortDesc[language]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>~{chal.durationMinutes} min</span>
                    </span>

                    <button
                      className={`text-xs sm:text-sm font-bold flex items-center gap-1 ${
                        isFinalQuiz ? 'text-amber-900' : 'text-indigo-600'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isDone ? (language === 'pt' ? 'Repetir' : 'Replay') : t.playChallenge}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
