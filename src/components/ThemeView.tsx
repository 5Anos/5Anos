import React, { useState } from 'react';
import { BookOpen, Gamepad2, ArrowLeft, CheckCircle2, Circle, Clock, Play, ChevronRight, ChevronLeft, Sparkles, Trophy, Award, Zap } from 'lucide-react';
import { ThemeDefinition, ActivityProgress, Language } from '../types';
import { translations } from '../i18n/translations';
import { ThemeIllustration } from './illustrations/ThemeIllustrations';
import { getThemeImage, getThemeStepImage, getChallengeImage } from '../data/themeImages';
import { SitPostureInfographicPT } from './SitPostureInfographicPT';
import { DosDontsPostureInfographicPT } from './DosDontsPostureInfographicPT';
import { PhishingMessageSimulator } from './PhishingMessageSimulator';

interface ThemeViewProps {
  theme: ThemeDefinition;
  progressList: ActivityProgress[];
  language: Language;
  onBack: () => void;
  onOpenModule: (moduleId: string) => void;
  onOpenChallenge: (challengeId: string) => void;
  initialTab?: 'content' | 'games';
}

export const ThemeView: React.FC<ThemeViewProps> = ({
  theme,
  progressList,
  language,
  onBack,
  onOpenModule,
  onOpenChallenge,
  initialTab = 'content',
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'games'>(initialTab);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const t = translations[language];

  const lessons = theme.lessons || [];
  const currentLesson = lessons[currentStepIndex] || lessons[0];
  const themeImg = getThemeImage(theme.id);
  const currentStepImg = getThemeStepImage(theme.id, currentStepIndex);

  // Accent gradient based on theme
  const getBannerGradient = (themeNumber: number) => {
    switch (themeNumber) {
      case 1:
        return 'from-blue-900 via-indigo-900 to-slate-900';
      case 2:
        return 'from-emerald-900 via-teal-900 to-slate-900';
      case 3:
        return 'from-sky-900 via-blue-900 to-indigo-950';
      case 4:
        return 'from-purple-900 via-violet-900 to-indigo-950';
      case 5:
        return 'from-indigo-900 via-purple-900 to-slate-900';
      case 6:
        return 'from-amber-900 via-orange-950 to-slate-900';
      case 7:
        return 'from-teal-900 via-cyan-950 to-slate-900';
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
          className={`p-6 sm:p-8 md:p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden bg-gradient-to-br ${getBannerGradient(
            theme.number
          )} flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-white/10`}
        >
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-amber-300 border border-white/20 shadow-xs">
              <span className="text-base">{theme.icon}</span>
              <span>Tema {theme.number}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {theme.title[language]}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {theme.intro[language]}
            </p>
          </div>

          {/* Theme custom 3D illustration graphic */}
          <div className="relative z-10 w-full md:w-80 max-w-xs shrink-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 p-1.5 group hover:scale-[1.02] transition-transform duration-300">
            <img
              src={themeImg}
              alt={theme.title[language]}
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-inner"
            />
          </div>

          {/* Geometric blur accents */}
          <div className="absolute right-[-30px] top-[-30px] w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-[-20px] bottom-[-20px] w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* Tabs Selector: Conteúdos vs Jogos e Desafios */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-4 px-6 text-sm sm:text-base font-black flex items-center gap-2.5 border-b-3 transition-all cursor-pointer ${
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
          className={`pb-4 px-6 text-sm sm:text-base font-black flex items-center gap-2.5 border-b-3 transition-all cursor-pointer ${
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

                {/* Layout: Full width vertical stacking for rich comparative infographics, or 2-column layout for standard illustrations */}
                {theme.id === 'ergonomia' && currentStepIndex === 4 ? (
                  <div className="space-y-6">
                    {/* Content Body */}
                    <div
                      className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-slate-700 [&_strong]:text-slate-900 [&_em]:text-indigo-900 [&_em]:font-medium [&_em]:not-italic [&_em]:bg-indigo-50/70 [&_em]:px-1.5 [&_em]:py-0.5 [&_em]:rounded-md"
                      dangerouslySetInnerHTML={{ __html: currentLesson.body[language] }}
                    />

                    {/* Infographic placed below text across full width with no scroll */}
                    <div className="w-full">
                      <DosDontsPostureInfographicPT />
                    </div>
                  </div>
                ) : theme.id === 'ergonomia' && currentStepIndex === 1 ? (
                  <div className="space-y-6">
                    {/* Content Body */}
                    <div
                      className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-slate-700 [&_strong]:text-slate-900 [&_em]:text-indigo-900 [&_em]:font-medium [&_em]:not-italic [&_em]:bg-indigo-50/70 [&_em]:px-1.5 [&_em]:py-0.5 [&_em]:rounded-md"
                      dangerouslySetInnerHTML={{ __html: currentLesson.body[language] }}
                    />

                    {/* Infographic placed below text */}
                    <div className="w-full max-w-3xl mx-auto">
                      <SitPostureInfographicPT />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      {/* Content Body */}
                      <div
                        className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-slate-700 [&_strong]:text-slate-900 [&_em]:text-indigo-900 [&_em]:font-medium [&_em]:not-italic [&_em]:bg-indigo-50/70 [&_em]:px-1.5 [&_em]:py-0.5 [&_em]:rounded-md"
                        dangerouslySetInnerHTML={{ __html: currentLesson.body[language] }}
                      />
                    </div>

                    {/* Visual Infographic / Illustration Card per step */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                      {theme.id === 'seguranca' && currentStepIndex === 3 ? (
                        <PhishingMessageSimulator />
                      ) : (
                        <div className="w-full rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-md bg-slate-50 relative group">
                          <img
                            key={`${theme.id}-step-${currentStepIndex}`}
                            src={currentStepImg}
                            alt={currentLesson.h[language]}
                            referrerPolicy="no-referrer"
                            className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300 animate-in fade-in"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                            <p className="text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              <span>{currentLesson.eyebrow[language]}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

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
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Fun Games Header Banner */}
          <div className="p-6 rounded-[2rem] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30 shrink-0">
                🎮
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  {language === 'pt' ? 'Zona de Jogos & Desafios TIC' : 'ICT Games & Challenge Zone'}
                </h2>
                <p className="text-xs sm:text-sm text-amber-100 font-medium mt-0.5">
                  {language === 'pt'
                    ? 'Ganha pontos XP, desbloqueia insígnias e testa as tuas habilidades neste tema!'
                    : 'Earn XP points, unlock badges, and test your skills in this topic!'}
                </p>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold text-xs sm:text-sm shrink-0 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{theme.challenges.length} {language === 'pt' ? 'Atividades Disponíveis' : 'Activities Available'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theme.challenges.map((chal) => {
              const record = progressList.find((p) => p.activityId === chal.id);
              const isDone = record?.status === 'completed';
              const isFinalQuiz = chal.type === 'final_quiz';
              const chalImg = getChallengeImage(chal.type);

              return (
                <div
                  key={chal.id}
                  onClick={() => onOpenChallenge(chal.id)}
                  className={`rounded-[2rem] border-2 p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isFinalQuiz
                      ? 'border-amber-300 bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-white hover:border-amber-400'
                      : isDone
                      ? 'border-emerald-200 bg-gradient-to-b from-emerald-50/30 to-white hover:border-emerald-300'
                      : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div>
                    {/* Card Top Pill Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                          isFinalQuiz
                            ? 'bg-amber-200/90 text-amber-950 shadow-2xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isFinalQuiz ? '🏆 Quiz de Aprendizagem' : `Desafio ${chal.number}`}
                      </span>

                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
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

                    {/* Fun icon header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center text-2xl transition-colors shadow-inner border border-indigo-100">
                        {chal.icon || (isFinalQuiz ? '🏆' : '🕹️')}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                          {chal.title[language]}
                        </h3>
                        <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1 mt-0.5">
                          <Zap className="w-3 h-3 fill-current" />
                          <span>+25 XP por completar</span>
                        </span>
                      </div>
                    </div>

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
                      className={`text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                        isFinalQuiz
                          ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs'
                          : isDone
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
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

