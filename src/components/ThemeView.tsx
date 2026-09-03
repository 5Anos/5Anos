import React, { useState } from 'react';
import { BookOpen, Gamepad2, ArrowLeft, CheckCircle2, Circle, Clock, Play, ChevronRight, ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';
import { ThemeDefinition, ActivityProgress, Language } from '../types';
import { translations } from '../i18n/translations';
import { ThemeIllustration } from './illustrations/ThemeIllustrations';
import { getThemeImage } from '../data/themeImages';

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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const t = translations[language];

  const lessons = theme.lessons || [];
  const currentLesson = lessons[currentStepIndex] || lessons[0];
  const themeImg = getThemeImage(theme.id);

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
        return 'from-rose-950 via-indigo-900 to-slate-900';
      case 6:
        return 'from-amber-950 via-orange-900 to-slate-900';
      case 7:
        return 'from-teal-950 via-slate-900 to-cyan-950';
      default:
        return 'from-indigo-950 via-slate-900 to-blue-950';
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < lessons.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setActiveTab('games');
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
        </button>
      </div>

      {/* Tab 1: Conteúdos Pedagógicos */}
      {activeTab === 'content' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {lessons && lessons.length > 0 && currentLesson ? (
            <div className="space-y-6">
              {/* Stepper Navigation Pills with Step Names */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {lessons.map((lesson, idx) => {
                    const isActive = idx === currentStepIndex;
                    const isCompleted = idx < currentStepIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/50'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : isCompleted
                              ? 'bg-emerald-200 text-emerald-800'
                              : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        {lesson.icon && <span className="text-sm">{lesson.icon}</span>}
                        <span className="truncate max-w-[200px] sm:max-w-none">
                          {lesson.eyebrow[language]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm space-y-6 relative overflow-hidden">
                {/* Header of Active Step */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <span>{currentLesson.icon || '📖'}</span>
                      <span>{currentLesson.eyebrow[language]}</span>
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {language === 'pt'
                      ? `Passo ${currentStepIndex + 1} de ${lessons.length}`
                      : `Step ${currentStepIndex + 1} of ${lessons.length}`}
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {currentLesson.h[language]}
                </h2>

                {/* Two-Column Responsive Layout: Content & 3D Visual Illustration */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    {/* Content Body */}
                    <div
                      className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-slate-700 [&_strong]:text-slate-900 [&_em]:text-indigo-900 [&_em]:font-medium [&_em]:not-italic [&_em]:bg-indigo-50/70 [&_em]:px-1.5 [&_em]:py-0.5 [&_em]:rounded-md"
                      dangerouslySetInnerHTML={{ __html: currentLesson.body[language] }}
                    />
                  </div>

                  {/* 3D Illustration Card */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-50 relative group">
                      <img
                        src={themeImg}
                        alt={currentLesson.h[language]}
                        referrerPolicy="no-referrer"
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <p className="text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>{theme.title[language]}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-2 italic text-center">
                      {language === 'pt' ? 'Ilustração 3D interativa do tema' : 'Interactive 3D theme illustration'}
                    </span>
                  </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all w-full sm:w-auto justify-center ${
                      currentStepIndex === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{language === 'pt' ? 'Passo Anterior' : 'Previous Step'}</span>
                  </button>

                  {/* Step dots */}
                  <div className="flex items-center gap-1.5">
                    {lessons.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentStepIndex
                            ? 'w-6 bg-indigo-600'
                            : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        title={`Passo ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all hover:scale-102 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <span>
                      {currentStepIndex === lessons.length - 1
                        ? language === 'pt'
                          ? '🎮 Ir para Jogos e Desafios'
                          : '🎮 Go to Games & Challenges'
                        : language === 'pt'
                        ? 'Próximo Passo'
                        : 'Next Step'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              {language === 'pt' ? 'Sem conteúdos para apresentar.' : 'No topics available.'}
            </div>
          )}
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
