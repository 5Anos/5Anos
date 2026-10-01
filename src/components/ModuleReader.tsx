import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Lightbulb,
  Sparkles,
  BookOpen,
  AlertCircle,
  RefreshCw,
  Type,
  Eye,
  Check,
  Zap,
  RotateCcw,
  Trophy,
  Star,
  Award,
} from 'lucide-react';
import { PedagogicalModule, Language } from '../types';
import { translations } from '../i18n/translations';
import { AudioSpeakButton } from './AudioSpeakButton';
import { ticoFeedback } from '../utils/ticoEvents';
import { soundEffects } from '../utils/soundEffects';
import { cleanPedagogicalExplanation } from '../utils/exportUtils';

interface ModuleReaderProps {
  module: PedagogicalModule;
  language: Language;
  onBack: () => void;
  onFinishModule: (score: number, maxScore: number, percentage: number) => void;
}

export const ModuleReader: React.FC<ModuleReaderProps> = ({
  module,
  language,
  onBack,
  onFinishModule,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showReflection, setShowReflection] = useState(false);
  const [studentHypothesis, setStudentHypothesis] = useState<string | null>(null);

  // Micro-steps & Cognitive Load State
  const [interactiveMode, setInteractiveMode] = useState<'cards' | 'text'>('cards');
  const [revealedCards, setRevealedCards] = useState<Record<number, boolean>>({ 0: true });

  // Accessibility & Reading Comfort State
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readingFocus, setReadingFocus] = useState<boolean>(false);

  // Quiz state for step 5
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const t = translations[language];

  // Pedagogical step definitions with visual dual-coding
  const stepConfigs = [
    {
      num: 1,
      shortLabelPt: 'Conceito',
      shortLabelEn: 'Concept',
      fullTitle: t.step1Title,
      icon: <Lightbulb className="w-4 h-4" />,
      color: 'indigo',
    },
    {
      num: 2,
      shortLabelPt: 'Exemplo Real',
      shortLabelEn: 'Real Example',
      fullTitle: t.step2Title,
      icon: <Sparkles className="w-4 h-4" />,
      color: 'amber',
    },
    {
      num: 3,
      shortLabelPt: 'Sabias Que?',
      shortLabelEn: 'Fun Fact',
      fullTitle: t.step3Title,
      icon: <Sparkles className="w-4 h-4" />,
      color: 'purple',
    },
    {
      num: 4,
      shortLabelPt: 'Vamos Pensar',
      shortLabelEn: 'Reflect',
      fullTitle: t.step4Title,
      icon: <HelpCircle className="w-4 h-4" />,
      color: 'indigo',
    },
    {
      num: 5,
      shortLabelPt: 'Mini-Quiz',
      shortLabelEn: 'Mini-Quiz',
      fullTitle: t.step5Title,
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: 'emerald',
    },
  ];

  // Keyboard navigation support for accessibility (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' && currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateQuizScore = () => {
    const questions = module.quizQuestions || [];
    if (questions.length === 0) {
      // Content reading without mini-quiz: successful reading completion (100%)
      return { score: 100, maxScore: 100, percentage: 100, hasQuestions: false };
    }
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    const maxScore = questions.length;
    const percentage = Math.round((score / maxScore) * 100);
    return { score, maxScore, percentage, hasQuestions: true };
  };

  const handleSubmitQuiz = () => {
    setSubmittedQuiz(true);
    setShowResultModal(true);
    const { score, maxScore, percentage, hasQuestions } = calculateQuizScore();
    
    if (!hasQuestions || percentage === 100) {
      soundEffects.playVictory();
      ticoFeedback.triggerQuizPerfect();
    } else if (percentage >= 70) {
      soundEffects.playSuccess();
      ticoFeedback.triggerCorrect();
    } else {
      soundEffects.playAlert();
      ticoFeedback.triggerWrong(
        language === 'pt'
          ? 'Não desanimes! Dá uma vista de olhos às pistas pedagógicas de cada pergunta para aprenderes! 🔍'
          : 'Keep going! Review each clue below to reinforce your understanding! 🔍'
      );
    }
    
    onFinishModule(score, maxScore, percentage);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setShowResultModal(false);
  };

  // Font size class mapper
  const getTextSizeClass = () => {
    if (fontScale === 'large') return 'text-base sm:text-lg leading-relaxed';
    if (fontScale === 'xlarge') return 'text-lg sm:text-xl leading-loose';
    return 'text-sm sm:text-base leading-relaxed';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in duration-200">
      {/* Top Bar: Back button & Reading Comfort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToTheme}</span>
        </button>

        {/* Reading Accessibility & Comfort Tools (Universal Design for Learning) */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700">
          <span className="text-[11px] font-bold text-slate-400 hidden sm:inline mr-1">
            {language === 'pt' ? 'Leitura:' : 'Reading:'}
          </span>

          {/* Font Size Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg" title={language === 'pt' ? 'Ajustar tamanho da letra' : 'Adjust font size'}>
            <button
              type="button"
              onClick={() => setFontScale('normal')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                fontScale === 'normal' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontScale('large')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                fontScale === 'large' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontScale('xlarge')}
              className={`px-2 py-0.5 rounded text-sm font-bold transition-colors cursor-pointer ${
                fontScale === 'xlarge' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              A++
            </button>
          </div>

          {/* Reading Focus Highlighter Toggle */}
          <button
            type="button"
            onClick={() => setReadingFocus(!readingFocus)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              readingFocus
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
            title={language === 'pt' ? 'Ativar guia de foco na leitura' : 'Toggle reading focus line'}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{language === 'pt' ? 'Guia de Foco' : 'Focus Guide'}</span>
          </button>
        </div>
      </div>

      {/* Module Title Header Card */}
      <div className="mb-6 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/70">
            {language === 'pt' ? 'Tópico Curricular' : 'Topic'} {module.number}
          </span>
          <AudioSpeakButton
            id={`module-${module.id}-intro`}
            text={`${module.title[language]}. ${module.shortDesc[language]}`}
            language={language}
            label={language === 'pt' ? 'Ouvir Tópico' : 'Listen Topic'}
            variant="pill"
            size="xs"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5 tracking-tight">
          {module.title[language]}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed font-medium">
          {module.shortDesc[language]}
        </p>

        {/* Visual Reading Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
              <span>{language === 'pt' ? 'Passo a Passo da Aprendizagem' : 'Learning Steps'}</span>
              <span className="text-indigo-600">
                {language === 'pt' ? `Passo ${currentStep} de 5` : `Step ${currentStep} of 5`} ({currentStep * 20}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${currentStep * 20}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Step Tabs with Dual Coding (Icon + Text) */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 mb-6">
        {stepConfigs.map((s) => {
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;

          return (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`p-2 sm:p-2.5 rounded-2xl text-center text-xs font-bold transition-all border cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : isCompleted
                  ? 'bg-indigo-50/80 text-indigo-900 border-indigo-200/80 hover:bg-indigo-100/60'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isCompleted
                    ? 'bg-indigo-200 text-indigo-900'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isCompleted ? <Check className="w-3 h-3 text-indigo-900 stroke-[3]" /> : s.num}
              </div>
              <span className="truncate text-[11px] sm:text-xs">
                {language === 'pt' ? s.shortLabelPt : s.shortLabelEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Reading Container */}
      <div className="rounded-[2rem] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 min-h-[400px] flex flex-col justify-between">
        {/* STEP 1: Explicação direta */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-indigo-700">
                <Lightbulb className="w-6 h-6" />
                <h2 className="text-xl font-bold">{t.step1Title}</h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Cognitive Load Mode Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setInteractiveMode('cards');
                    }}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                      interactiveMode === 'cards'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🃏 {language === 'pt' ? 'Cartas' : 'Cards'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setInteractiveMode('text');
                    }}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                      interactiveMode === 'text'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📄 {language === 'pt' ? 'Texto' : 'Text'}
                  </button>
                </div>

                <AudioSpeakButton
                  id={`module-${module.id}-step1-all`}
                  text={(module.explanation?.[language] || []).join(' ')}
                  language={language}
                  label={language === 'pt' ? 'Ouvir Tudo' : 'Listen All'}
                  variant="pill"
                  size="xs"
                />
              </div>
            </div>

            {interactiveMode === 'cards' ? (
              /* Interactive Micro-Steps / Discover Cards Format (Reduced Cognitive Load) */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                  <span>{language === 'pt' ? 'Clica nas cartas para desbloquear os conceitos-chave:' : 'Click cards to reveal key concepts:'}</span>
                  <span className="text-indigo-600 font-bold">
                    {Object.keys(revealedCards).length} / {(module.explanation?.[language] || []).length} {language === 'pt' ? 'reveladas' : 'revealed'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(module.explanation?.[language] || []).map((paragraph, idx) => {
                    const isRevealed = revealedCards[idx];
                    const cardIcons = ['💡', '🔍', '⚙️', '🚀', '⭐'];
                    const cardIcon = cardIcons[idx % cardIcons.length];

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!isRevealed) {
                            soundEffects.playSuccess();
                            setRevealedCards((prev) => ({ ...prev, [idx]: true }));
                            ticoFeedback.triggerCorrect();
                          }
                        }}
                        className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isRevealed
                            ? 'bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 border-indigo-200 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100/90 border-dashed border-slate-300 hover:border-indigo-400 group text-center py-8'
                        }`}
                      >
                        {isRevealed ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-[11px] flex items-center gap-1.5">
                                <span>{cardIcon}</span>
                                <span>{language === 'pt' ? `Conceito ${idx + 1}` : `Concept ${idx + 1}`}</span>
                              </span>
                              <AudioSpeakButton
                                id={`module-${module.id}-step1-card-${idx}`}
                                text={paragraph}
                                language={language}
                                variant="icon"
                                size="xs"
                              />
                            </div>
                            <p className={`text-slate-800 leading-relaxed font-medium ${getTextSizeClass()}`}>
                              {paragraph}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2 group-hover:scale-105 transition-transform">
                            <span className="text-3xl block">{cardIcon}</span>
                            <p className="font-extrabold text-sm text-indigo-950">
                              {language === 'pt' ? `Carta ${idx + 1} — Clica para Virar!` : `Card ${idx + 1} — Click to Reveal!`}
                            </p>
                            <p className="text-xs text-slate-500">
                              {language === 'pt' ? 'Descobre este conceito essencial' : 'Discover this key concept'}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Traditional continuous text */
              <div className={`space-y-3.5 text-slate-700 ${getTextSizeClass()}`}>
                {(module.explanation?.[language] || []).map((paragraph, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl transition-all flex items-start justify-between gap-3 ${
                      readingFocus
                        ? 'bg-slate-50 hover:bg-indigo-50/70 hover:border-indigo-300 border border-slate-200/70 shadow-2xs'
                        : 'bg-slate-50/80 border border-slate-200/70'
                    }`}
                  >
                    <p className="flex-1 leading-relaxed">{paragraph}</p>
                    <AudioSpeakButton
                      id={`module-${module.id}-step1-p-${idx}`}
                      text={paragraph}
                      language={language}
                      variant="icon"
                      size="xs"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Exemplo do Quotidiano */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-700">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-xl font-bold">{t.step2Title}</h2>
              </div>
              <AudioSpeakButton
                id={`module-${module.id}-step2`}
                text={`${module.example?.title?.[language] || ''}. ${module.example?.scenario?.[language] || ''}. ${module.example?.tip?.[language] || ''}`}
                language={language}
                label={language === 'pt' ? 'Ouvir Exemplo' : 'Listen Example'}
                variant="pill"
                size="xs"
              />
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-amber-900">
                {module.example?.title?.[language]}
              </h3>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line">
                {module.example?.scenario?.[language]}
              </p>
              {module.example?.tip?.[language] && (
                <div className="pt-3 border-t border-amber-200 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-100/60 p-3 rounded-xl">
                  <span>💡 {module.example.tip[language]}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Sabias que...? */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-purple-700">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-xl font-bold">{t.step3Title}</h2>
              </div>
              <AudioSpeakButton
                id={`module-${module.id}-step3`}
                text={module.funFact?.[language] || ''}
                language={language}
                label={language === 'pt' ? 'Ouvir Curiosidade' : 'Listen'}
                variant="pill"
                size="xs"
              />
            </div>

            <div className="p-8 rounded-2xl bg-purple-50/80 border border-purple-200 text-center space-y-4">
              <div className="text-4xl">🌟</div>
              <p className="text-base sm:text-lg font-medium text-slate-800 max-w-xl mx-auto leading-relaxed">
                {module.funFact?.[language]}
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: Vamos pensar (Reflexão) */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-indigo-700">
                <HelpCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold">{t.step4Title}</h2>
              </div>
              <AudioSpeakButton
                id={`module-${module.id}-step4`}
                text={`${module.thinkAboutIt?.question?.[language] || ''}. ${module.thinkAboutIt?.clue?.[language] ? `Pista: ${module.thinkAboutIt.clue[language]}` : ''}`}
                language={language}
                label={language === 'pt' ? 'Ouvir Pergunta' : 'Listen'}
                variant="pill"
                size="xs"
              />
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-indigo-50/70 border border-indigo-200/90 space-y-4">
              <p className="text-base sm:text-lg font-black text-indigo-950 leading-snug">
                {module.thinkAboutIt?.question?.[language]}
              </p>

              {module.thinkAboutIt?.clue?.[language] && (
                <div className="p-3.5 rounded-xl bg-white border border-indigo-100 text-xs sm:text-sm text-slate-700 font-medium shadow-2xs flex items-start gap-2">
                  <span className="text-base shrink-0">🔍</span>
                  <div>
                    <strong className="text-indigo-900">{language === 'pt' ? 'Pista do Professor:' : 'Teacher Clue:'}</strong>{' '}
                    <span>{module.thinkAboutIt.clue[language]}</span>
                  </div>
                </div>
              )}

              {/* Active Thinking / Metacognition Prompt */}
              {!showReflection && (
                <div className="p-4 rounded-xl bg-white/80 border border-indigo-200/80 space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{language === 'pt' ? 'Antes de veres a resposta, pensa um segundo:' : 'Before revealing, think for a second:'}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {language === 'pt'
                      ? 'O que farias tu nesta situação? Ter uma hipótese em mente ajuda a fixar melhor a matéria!'
                      : 'What would you do? Having a hypothesis in mind helps your brain learn better!'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setStudentHypothesis('ready');
                        setShowReflection(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-2xs hover:scale-102 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>💡 {language === 'pt' ? 'Já pensei numa solução! Ver reflexão' : 'I have an idea! Reveal'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStudentHypothesis('curious');
                        setShowReflection(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>🤔 {language === 'pt' ? 'Estou curioso: Revelar reflexão' : 'Curious: Reveal reflection'}</span>
                    </button>
                  </div>
                </div>
              )}

              {showReflection && (
                <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                      <span>{language === 'pt' ? 'Excelente reflexão!' : 'Great thinking!'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowReflection(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer underline"
                    >
                      {t.hideReflection}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-indigo-200 text-slate-800 text-sm sm:text-base leading-relaxed shadow-2xs">
                    <p className="font-extrabold text-indigo-950 mb-1.5 flex items-center gap-1.5">
                      <span>🎓</span>
                      <span>{language === 'pt' ? 'Reflexão Pedagógica:' : 'Educational Insight:'}</span>
                    </p>
                    <p>{module.thinkAboutIt?.reflection?.[language]}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Verifica o que aprendeste (Mini-quiz ou Conclusão de Leitura) */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            {module.quizQuestions && module.quizQuestions.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">{t.step5Title}</h2>
                  </div>
                </div>

                <p className="text-sm text-slate-600">{t.miniQuizPrompt}</p>

                <div className="space-y-6">
                  {module.quizQuestions.map((q, idx) => {
                    const userChoice = selectedAnswers[q.id];
                    const isCorrect = userChoice === q.correctIndex;

                    return (
                      <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="font-bold text-sm sm:text-base text-slate-900">
                              {q.question?.[language]}
                            </p>
                          </div>
                          <AudioSpeakButton
                            id={`module-${module.id}-q-${q.id}`}
                            text={`${q.question?.[language]}. ${q.options?.[language]?.map((opt, i) => `Opção ${i + 1}: ${opt}`).join('. ')}`}
                            language={language}
                            variant="icon"
                            size="xs"
                          />
                        </div>

                        <div className="space-y-2 pl-8">
                          {(q.options?.[language] || []).map((opt, optIdx) => {
                            let btnStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800';

                            if (submittedQuiz) {
                              if (optIdx === q.correctIndex) {
                                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                              } else if (userChoice === optIdx) {
                                btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
                              } else {
                                btnStyle = 'border-slate-200 bg-slate-100 opacity-60 text-slate-500';
                              }
                            } else if (userChoice === optIdx) {
                              btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={submittedQuiz}
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {submittedQuiz && optIdx === q.correctIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {submittedQuiz && userChoice === optIdx && optIdx !== q.correctIndex && (
                                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {submittedQuiz && (
                          <div className={`mt-3 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm space-y-3 ${
                            isCorrect
                              ? 'bg-emerald-100/70 text-emerald-950 border-2 border-emerald-300'
                              : 'bg-gradient-to-br from-amber-50 to-orange-50/80 text-amber-950 border-2 border-amber-300 shadow-xs'
                          }`}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-2.5 flex-1">
                                {isCorrect ? (
                                  <p className="font-extrabold text-sm sm:text-base flex items-center gap-2 text-emerald-900">
                                    <span>✅</span>
                                    <span>{t.correctAnswer}</span>
                                  </p>
                                ) : (
                                  <div className="flex items-center gap-2 text-rose-800 font-black text-sm sm:text-base">
                                    <span className="text-xl">❌</span>
                                    <span>{language === 'pt' ? 'Resposta Incorreta' : 'Incorrect Answer'}</span>
                                  </div>
                                )}

                                {!isCorrect && userChoice !== undefined && (
                                  <div className="p-3.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 font-medium space-y-1">
                                    <p className="font-bold text-xs uppercase tracking-wide text-amber-900 flex items-center gap-1.5">
                                      <span>🔍</span>
                                      <span>{language === 'pt' ? `A tua seleção: «${q.options[language][userChoice]}»` : `Your selection: "${q.options[language][userChoice]}"`}</span>
                                    </p>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                      {q.optionExplanations?.[language]?.[userChoice] ||
                                        (language === 'pt'
                                          ? `Atenção: esta opção não resolve adequadamente a questão. A resposta correta é «${q.options[language][q.correctIndex]}».`
                                          : `Note: this choice does not solve the scenario properly. The correct answer is "${q.options[language][q.correctIndex]}".`)}
                                    </p>
                                  </div>
                                )}

                                <div className={`p-3.5 rounded-xl ${isCorrect ? 'bg-white/60 border border-emerald-200' : 'bg-white/80 border border-amber-200'}`}>
                                  <p className="font-black text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                                    <span>💡</span>
                                    <span>{language === 'pt' ? 'Micro-Pista do Robô TICo & Conceito-Chave:' : 'TICo Robot Clue & Key Concept:'}</span>
                                  </p>
                                  <p className="leading-relaxed text-xs sm:text-sm text-slate-700 font-medium">
                                    {cleanPedagogicalExplanation(q.explanation?.[language] || '', isCorrect)}
                                  </p>
                                </div>
                              </div>

                              <AudioSpeakButton
                                id={`module-${module.id}-q-${q.id}-expl`}
                                text={`${
                                  isCorrect
                                    ? t.correctAnswer
                                    : (language === 'pt' ? 'Resposta incorreta. Atenção à reflexão:' : 'Incorrect answer. Note:')
                                }. ${
                                  !isCorrect && userChoice !== undefined && q.optionExplanations?.[language]?.[userChoice]
                                    ? q.optionExplanations[language][userChoice] + '. '
                                    : ''
                                } ${cleanPedagogicalExplanation(q.explanation?.[language] || '', isCorrect)}`}
                                language={language}
                                variant="icon"
                                size="xs"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quiz Submit button */}
                {!submittedQuiz && (
                  <button
                    disabled={Object.keys(selectedAnswers).length < (module.quizQuestions?.length || 0)}
                    onClick={handleSubmitQuiz}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-40 cursor-pointer"
                  >
                    {t.finishModule}
                  </button>
                )}

                {/* Quiz Result Review Card */}
                {submittedQuiz && (
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4 shadow-xl border border-slate-800">
                    <div className="text-3xl sm:text-4xl animate-bounce">
                      {calculateQuizScore().percentage === 100 ? '🏆' : calculateQuizScore().percentage >= 70 ? '🎉' : '💡'}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider font-bold text-indigo-300">{t.quizResults}</p>
                      <div className="text-3xl sm:text-4xl font-black text-white">
                        {calculateQuizScore().score} / {calculateQuizScore().maxScore} ({calculateQuizScore().percentage}%)
                      </div>
                      <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                        {calculateQuizScore().percentage === 100
                          ? (language === 'pt' ? 'Pontuação máxima atingida! 100 XP' : 'Maximum score reached! 100 XP')
                          : calculateQuizScore().percentage >= 70
                          ? t.perfectScore
                          : t.keepGoing}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => setShowResultModal(true)}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                      >
                        <Trophy className="w-4 h-4 text-amber-300" />
                        <span>{language === 'pt' ? 'Ver Pop-Up de Resultado 🏆' : 'View Result Modal 🏆'}</span>
                      </button>

                      <button
                        onClick={handleResetQuiz}
                        className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-4 h-4 text-indigo-400" />
                        <span>{language === 'pt' ? 'Repetir o Desafio' : 'Retry Challenge'}</span>
                      </button>

                      <button
                        onClick={onBack}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
                      >
                        {t.backToTheme}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Reading completion without mini-quiz questions */
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-6 h-6" />
                  <h2 className="text-xl font-bold">
                    {language === 'pt' ? 'Leitura Concluída!' : 'Reading Completed!'}
                  </h2>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
                  <p className="font-bold text-base">
                    {language === 'pt'
                      ? 'Parabéns! Completaste a exploração de todos os passos deste conteúdo.'
                      : 'Congratulations! You have completed exploring all the steps of this topic.'}
                  </p>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    {language === 'pt'
                      ? 'Clica no botão abaixo para registar a conclusão da leitura e avançar para as atividades e desafios do tema.'
                      : 'Click the button below to register reading completion and proceed to the theme challenges.'}
                  </p>
                </div>

                {!submittedQuiz ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    {t.finishModule}
                  </button>
                ) : (
                  <div className="p-8 rounded-2xl bg-indigo-950 text-white text-center space-y-4 shadow-xl">
                    <p className="text-xs uppercase tracking-wider font-semibold text-indigo-200">
                      {language === 'pt' ? 'Estado da Leitura' : 'Reading Status'}
                    </p>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      🎉 {language === 'pt' ? 'Conteúdo Concluído!' : 'Topic Completed!'}
                    </div>
                    <p className="text-sm text-indigo-200 font-medium">
                      {language === 'pt'
                        ? 'Progresso registado com sucesso (100 XP). Agora podes praticar nos desafios!'
                        : 'Progress recorded successfully (100 XP). You can now practice in the challenges!'}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => setShowResultModal(true)}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                      >
                        <Trophy className="w-4 h-4 text-amber-300" />
                        <span>{language === 'pt' ? 'Ver Pop-Up de Resultado 🏆' : 'View Result Modal 🏆'}</span>
                      </button>
                      <button
                        onClick={onBack}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
                      >
                        {t.backToTheme}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Completion Modal Pop-Up (Equal to other games in the app) */}
            {showResultModal && submittedQuiz && (() => {
              const scoreData = calculateQuizScore();
              return (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 overflow-y-auto">
                  <div className="bg-white rounded-[2.5rem] border-2 border-emerald-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center animate-in zoom-in-95 my-auto space-y-5">
                    {/* Big celebratory animated icon */}
                    <div className="text-6xl animate-bounce">
                      {!scoreData.hasQuestions || scoreData.percentage === 100
                        ? '🏆'
                        : scoreData.percentage >= 70
                        ? '🎉'
                        : '💡'}
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        {scoreData.hasQuestions
                          ? (language === 'pt' ? 'Quiz de Aprendizagem Concluído' : 'Learning Quiz Completed')
                          : (language === 'pt' ? 'Tópico de Leitura Concluído' : 'Reading Topic Completed')}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                        {!scoreData.hasQuestions || scoreData.percentage === 100
                          ? (language === 'pt' ? 'Excelente! 100 XP Ganhos!' : 'Excellent! 100 XP Earned!')
                          : scoreData.percentage >= 90
                          ? (language === 'pt' ? 'Muito Bom! Excelente Trabalho!' : 'Very Good! Great Work!')
                          : scoreData.percentage >= 70
                          ? (language === 'pt' ? 'Bom Trabalho! Tópico Concluído!' : 'Good Job! Topic Completed!')
                          : scoreData.percentage >= 50
                          ? (language === 'pt' ? 'Satisfatório! Tópico Concluído!' : 'Satisfactory! Topic Completed!')
                          : (language === 'pt' ? 'Tentativa Concluída! Vamos Praticar!' : 'Attempt Completed! Keep Practicing!')}
                      </h2>
                    </div>

                    {/* Stars row */}
                    <div className="flex items-center justify-center gap-1.5 py-1">
                      {[1, 2, 3].map((starIdx) => {
                        const isLit =
                          !scoreData.hasQuestions || scoreData.percentage === 100
                            ? true
                            : scoreData.percentage >= 70
                            ? starIdx <= 2
                            : starIdx === 1;
                        return (
                          <Star
                            key={starIdx}
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform ${
                              isLit
                                ? 'text-amber-400 fill-amber-400 drop-shadow-sm scale-110'
                                : 'text-slate-200 fill-slate-100'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Badge Score pill */}
                    <div className={`inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2 rounded-full font-extrabold text-sm sm:text-base border shadow-2xs ${
                      !scoreData.hasQuestions || scoreData.percentage >= 70
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                        : 'bg-amber-100 border-amber-300 text-amber-900'
                    }`}>
                      <span>{scoreData.percentage} XP</span>
                      {scoreData.hasQuestions && (
                        <>
                          <span>•</span>
                          <span>
                            {scoreData.score} {language === 'pt' ? 'de' : 'of'} {scoreData.maxScore} {language === 'pt' ? 'Corretas' : 'Correct'}
                          </span>
                        </>
                      )}
                      <span>•</span>
                      <span className="font-black">
                        {scoreData.percentage}%
                      </span>
                    </div>

                    {/* Pedagogical text description */}
                    <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                      {!scoreData.hasQuestions ? (
                        language === 'pt' ? (
                          <>Parabéns! Completaste a exploração de todos os passos deste conteúdo curricular. O teu progresso foi gravado com sucesso!</>
                        ) : (
                          <>Congratulations! You completed exploring all steps of this curricular topic. Your progress was recorded successfully!</>
                        )
                      ) : scoreData.percentage === 100 ? (
                        language === 'pt' ? (
                          <>Obtiveste <strong>100 XP</strong>! Parabéns, acertaste em todas as perguntas e dominas os conceitos deste tópico.</>
                        ) : (
                          <>You earned <strong>100 XP</strong>! Congratulations, you answered all questions correctly and mastered this topic.</>
                        )
                      ) : scoreData.percentage >= 70 ? (
                        language === 'pt' ? (
                          <>Muito bom trabalho! Obtiveste <strong>{scoreData.percentage} XP</strong>. Clica em "Rever Respostas com Pistas" para analisares as dicas pedagógicas do Robô TICo!</>
                        ) : (
                          <>Great job! You earned <strong>{scoreData.percentage} XP</strong>. Click "Review Answers with Clues" to check TICo Robot's clues!</>
                        )
                      ) : (
                        language === 'pt' ? (
                          <>Obtiveste <strong>{scoreData.percentage} XP</strong>. Clica em "Rever Respostas com Pistas" para aprenderes com as dicas do Robô TICo ou repete o desafio para alcançar os 100 XP.</>
                        ) : (
                          <>You scored <strong>{scoreData.percentage} XP</strong>. Review your answers to learn from TICo Robot's clues or retry to aim for 100 XP.</>
                        )
                      )}
                    </p>

                    {/* Action buttons matching other games */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      {scoreData.hasQuestions && (
                        <button
                          onClick={() => setShowResultModal(false)}
                          className="w-full sm:w-auto px-5 py-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                        >
                          <span>🔍</span>
                          <span>{language === 'pt' ? 'Rever Respostas com Pistas' : 'Review Answers with Clues'}</span>
                        </button>
                      )}

                      {scoreData.hasQuestions && (
                        <button
                          onClick={handleResetQuiz}
                          className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 text-indigo-600" />
                          <span>{language === 'pt' ? 'Repetir o Desafio' : 'Retry Challenge'}</span>
                        </button>
                      )}

                      <button
                        onClick={onBack}
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{t.backToTheme}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Step Navigation Footer (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.previousStep}</span>
              </button>

              <span className="text-xs text-slate-400 font-medium sm:hidden">
                {currentStep} / 5
              </span>

              <button
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <span>{t.nextStep}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <span>{language === 'pt' ? 'Navegação rápida: usa as teclas' : 'Quick navigation: use keys'}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">←</kbd>
              <span>{language === 'pt' ? 'e' : 'and'}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">→</kbd>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
