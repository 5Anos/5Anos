import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  Award,
  BookOpen,
  GraduationCap,
  Calendar,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw
} from 'lucide-react';
import { User, Language, UserAchievement } from '../types';
import {
  getTodayDailyTip,
  getTodayDateString,
  getDailyTipByDayOfYear,
  TOTAL_366_TIPS_COUNT,
  DailyTicTip
} from '../data/dailyTipsData';
import { api } from '../services/api';

interface DailyTipWidgetProps {
  user: User | null;
  language: Language;
  forceOpen?: boolean;
  hideCard?: boolean;
  onClose?: () => void;
  onPointsAwarded?: (user: User | null, points: number, achievements: UserAchievement[]) => void;
  onOpenAuth?: () => void;
  onNavigateTheme?: (themeId: string, moduleId?: string, challengeId?: string) => void;
}

interface StoredDailyAnswer {
  answered: boolean;
  selectedOptionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  timestamp: string;
}

export const DailyTipWidget: React.FC<DailyTipWidgetProps> = ({
  user,
  language,
  forceOpen,
  hideCard = false,
  onClose,
  onPointsAwarded,
  onOpenAuth: _onOpenAuth,
  onNavigateTheme,
}) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  
  // Today's official tip (366 days, exactly 1 for today's calendar date)
  const todayDateStr = useMemo(() => getTodayDateString(), []);
  const todayTip: DailyTicTip = useMemo(() => getTodayDailyTip(), []);

  // Currently viewed tip (defaults to today's tip)
  const [viewedDayOfYear, setViewedDayOfYear] = useState<number>(todayTip.dayOfYear);

  const activeTip: DailyTicTip = useMemo(() => {
    if (viewedDayOfYear === todayTip.dayOfYear) {
      return todayTip;
    }
    return getDailyTipByDayOfYear(viewedDayOfYear);
  }, [viewedDayOfYear, todayTip]);

  const isTodayTip = activeTip.dayOfYear === todayTip.dayOfYear;

  // Storage key for today's official tip
  const todayStorageKey = `tic_daily_tip_${todayDateStr}_${user?.id || 'guest'}`;

  const [savedAnswer, setSavedAnswer] = useState<StoredDailyAnswer | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Practice state for browsing other days
  const [practiceAnswer, setPracticeAnswer] = useState<{ selectedOptionId: string; isSubmitted: boolean } | null>(null);

  // Sync modal state with forceOpen prop if provided
  useEffect(() => {
    if (forceOpen !== undefined) {
      setInternalModalOpen(forceOpen);
    }
  }, [forceOpen]);

  const isModalOpen = forceOpen !== undefined ? forceOpen : internalModalOpen;

  const handleCloseModal = () => {
    setInternalModalOpen(false);
    onClose?.();
  };

  // Load status of today's tip from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(todayStorageKey);
      if (raw) {
        const parsed: StoredDailyAnswer = JSON.parse(raw);
        setSavedAnswer(parsed);
        if (isTodayTip) {
          setSelectedOptionId(parsed.selectedOptionId);
        }
      } else {
        setSavedAnswer(null);
        if (isTodayTip) {
          setSelectedOptionId(null);
        }
      }
    } catch {
      setSavedAnswer(null);
      if (isTodayTip) {
        setSelectedOptionId(null);
      }
    }
  }, [todayStorageKey, isTodayTip]);

  // Reset practice selection when changing viewed tip
  useEffect(() => {
    if (!isTodayTip) {
      setPracticeAnswer(null);
      setSelectedOptionId(null);
    } else if (savedAnswer) {
      setSelectedOptionId(savedAnswer.selectedOptionId);
    } else {
      setSelectedOptionId(null);
    }
  }, [viewedDayOfYear, isTodayTip, savedAnswer]);

  const hasAnsweredToday = !!savedAnswer?.answered;

  const handleSelectOption = (optionId: string) => {
    if (isTodayTip) {
      if (hasAnsweredToday || submitting) return;
      setSelectedOptionId(optionId);
    } else {
      if (practiceAnswer?.isSubmitted) return;
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOptionId) return;

    if (!isTodayTip) {
      // Practice answer for browsed days
      setPracticeAnswer({
        selectedOptionId,
        isSubmitted: true,
      });
      return;
    }

    // Official submission for today's tip
    if (hasAnsweredToday || submitting) return;

    setSubmitting(true);
    const isCorrect = selectedOptionId === todayTip.correctOptionId;
    const awardedPoints = isCorrect ? 50 : 25;

    const answerRecord: StoredDailyAnswer = {
      answered: true,
      selectedOptionId,
      isCorrect,
      pointsEarned: awardedPoints,
      timestamp: new Date().toISOString(),
    };

    try {
      if (user) {
        const res = await api.recordDailyTipBonus(
          `${todayTip.title[language]} (${isCorrect ? 'Acertou' : 'Participou'})`,
          awardedPoints
        );
        if (res.success && onPointsAwarded) {
          onPointsAwarded(res.user, res.userPoints, res.achievements);
        }
      } else {
        // Guest mode
        if (onPointsAwarded) {
          onPointsAwarded(null, awardedPoints, []);
        }
      }

      localStorage.setItem(todayStorageKey, JSON.stringify(answerRecord));
      setSavedAnswer(answerRecord);
      setJustSubmitted(true);
    } catch (err) {
      console.error('Error recording daily tip points:', err);
      localStorage.setItem(todayStorageKey, JSON.stringify(answerRecord));
      setSavedAnswer(answerRecord);
      setJustSubmitted(true);
      if (onPointsAwarded) {
        onPointsAwarded(user, awardedPoints, []);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoToTheme = (themeId: string) => {
    handleCloseModal();
    if (onNavigateTheme) {
      onNavigateTheme(themeId);
    }
  };

  const handlePrevDay = () => {
    setViewedDayOfYear((prev) => (prev > 1 ? prev - 1 : TOTAL_366_TIPS_COUNT));
  };

  const handleNextDay = () => {
    setViewedDayOfYear((prev) => (prev < TOTAL_366_TIPS_COUNT ? prev + 1 : 1));
  };

  const handleRandomDay = () => {
    const randomDay = Math.floor(Math.random() * TOTAL_366_TIPS_COUNT) + 1;
    setViewedDayOfYear(randomDay);
  };

  const handleResetToToday = () => {
    setViewedDayOfYear(todayTip.dayOfYear);
  };

  return (
    <>
      {/* Dashboard Card Widget (Single Daily Tip) */}
      {!hideCard && (
        <div
          onClick={() => {
            setViewedDayOfYear(todayTip.dayOfYear);
            setInternalModalOpen(true);
          }}
          className="group relative overflow-hidden bg-linear-to-br from-indigo-50 via-sky-50/70 to-blue-100/50 p-5 sm:p-6 rounded-[2rem] border border-indigo-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-indigo-300"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-indigo-300/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform" />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-600 to-sky-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
              {todayTip.themeIcon || '💡'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  {language === 'pt' ? '💡 Dica do Dia TIC' : '💡 Daily ICT Tip'}
                </span>

                {hasAnsweredToday ? (
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${
                      savedAnswer?.isCorrect
                        ? 'text-emerald-900 bg-emerald-200/80'
                        : 'text-amber-900 bg-amber-200/80'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {savedAnswer?.isCorrect
                      ? language === 'pt'
                        ? 'Acertaste (+50 pts)'
                        : 'Correct (+50 pts)'
                      : language === 'pt'
                      ? 'Participaste (+25 pts)'
                      : 'Participated (+25 pts)'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-950 bg-amber-200/90 px-2.5 py-0.5 rounded-full animate-bounce shadow-2xs">
                    🎁 {language === 'pt' ? 'Até +50 Pontos' : 'Up to +50 Pts'}
                  </span>
                )}
              </div>

              {/* Date & Curricular Theme Badges */}
              <div className="mb-1.5 flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-indigo-900 border border-indigo-200 shadow-2xs">
                  <Calendar className="w-3 h-3 text-indigo-600" />
                  <span>{todayTip.dateLabel[language]}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 border border-slate-200 shadow-2xs">
                  <span>{todayTip.themeIcon}</span>
                  <span>
                    {language === 'pt'
                      ? `Tema ${todayTip.themeNumber}: ${todayTip.themeTitle.pt}`
                      : `Topic ${todayTip.themeNumber}: ${todayTip.themeTitle.en}`}
                  </span>
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-indigo-950 transition-colors line-clamp-2">
                {todayTip.title[language]}
              </h4>

              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 group-hover:underline flex items-center gap-1">
                  {hasAnsweredToday
                    ? language === 'pt'
                      ? 'Ver explicação e resultado'
                      : 'View explanation and score'
                    : language === 'pt'
                    ? 'Lê a dica e responde (+50 pts)'
                    : 'Read tip and answer (+50 pts)'}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>

                <span className="text-[10px] font-semibold text-slate-500">
                  {hasAnsweredToday
                    ? language === 'pt'
                      ? '✅ Concluída hoje'
                      : '✅ Done today'
                    : language === 'pt'
                    ? '50 pts acerto / 25 pts erro'
                    : '50 pts right / 25 pts wrong'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Daily Tip with Reading, Question, and Calendar Explorer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-xl my-4 sm:my-6 rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-6 pt-5 pb-4 bg-linear-to-r from-indigo-800 via-blue-800 to-indigo-950 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-2xl font-bold border border-white/20 shadow-inner">
                    {activeTip.themeIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-sky-300">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        {language === 'pt'
                          ? `Dica de TIC • Dia ${activeTip.dayOfYear} de 366`
                          : `ICT Tip • Day ${activeTip.dayOfYear} of 366`}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mt-0.5 text-white flex items-center gap-2">
                      <span>💡</span>
                      <span>
                        {isTodayTip
                          ? language === 'pt' ? 'Dica de Hoje' : "Today's Tip"
                          : language === 'pt' ? `Dica de ${activeTip.dateLabel.pt}` : `Tip for ${activeTip.dateLabel.en}`}
                      </span>
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Day Explorer & Calendar Navigation Controls */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-sky-100 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevDay}
                    title={language === 'pt' ? 'Dica Anterior' : 'Previous Tip'}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-0.5 text-[11px] font-bold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'Anterior' : 'Prev'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextDay}
                    title={language === 'pt' ? 'Dica Seguinte' : 'Next Tip'}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-0.5 text-[11px] font-bold"
                  >
                    <span>{language === 'pt' ? 'Seguinte' : 'Next'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRandomDay}
                    title={language === 'pt' ? 'Dica Aleatória do Ano' : 'Random Tip'}
                    className="p-1 px-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sky-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                  >
                    <Shuffle className="w-3 h-3 text-amber-300" />
                    <span>{language === 'pt' ? 'Aleatória' : 'Random'}</span>
                  </button>
                </div>

                {!isTodayTip ? (
                  <button
                    type="button"
                    onClick={handleResetToToday}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-400 text-amber-950 hover:bg-amber-300 transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'pt' ? 'Voltar à Dica de Hoje' : "Back to Today's Tip"}</span>
                  </button>
                ) : (
                  <div className="text-[11px] font-black bg-white/15 px-2.5 py-0.5 rounded-full text-amber-300">
                    {hasAnsweredToday
                      ? language === 'pt' ? '✅ Dica de Hoje Concluída' : "✅ Today's Tip Completed"
                      : language === 'pt' ? '⭐ Dica de Hoje: +50 / +25 pts' : "⭐ Today's Tip: +50 / +25 pts"}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Explorer / Mode Banner if not today */}
              {!isTodayTip && (
                <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs text-sky-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>
                      {language === 'pt'
                        ? `📅 A explorar a Dica de ${activeTip.dateLabel.pt} (Modo Treino)`
                        : `📅 Exploring Tip for ${activeTip.dateLabel.en} (Practice Mode)`}
                    </span>
                  </div>
                  <button
                    onClick={handleResetToToday}
                    className="text-[11px] font-black text-indigo-700 underline hover:text-indigo-900 cursor-pointer"
                  >
                    {language === 'pt' ? 'Ir para Hoje' : 'Go to Today'}
                  </button>
                </div>
              )}

              {/* Theme Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs">
                  <span>{activeTip.themeIcon}</span>
                  <span>
                    {language === 'pt'
                      ? `Tema ${activeTip.themeNumber}: ${activeTip.themeTitle.pt}`
                      : `Topic ${activeTip.themeNumber}: ${activeTip.themeTitle.en}`}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  {activeTip.dateLabel[language]}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                  🏷️ {activeTip.category[language]}
                </span>
              </div>

              {/* Title & Teaser */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80">
                <h4 className="text-base sm:text-lg font-black text-indigo-950 leading-snug">
                  {activeTip.title[language]}
                </h4>
                {activeTip.teaser && (
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-indigo-800">
                    {activeTip.teaser[language]}
                  </p>
                )}
              </div>

              {/* Reading Section: Description */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'pt' ? 'A Curiosidade Explicada' : 'The Curiosity Explained'}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                  {activeTip.description[language]}
                </p>
              </div>

              {/* Curricular Connection */}
              <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>
                    {language === 'pt'
                      ? 'O que aprendes nas aulas de TIC sobre isto?'
                      : 'What you learn in ICT class about this:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeTip.whyItMatters[language]}
                </p>
              </div>

              {/* Fun Fact Extra */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
                  <span>✨</span>
                  <span>{language === 'pt' ? 'Curiosidade Extra / Sabias que?' : 'Fun Fact / Did You Know?'}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {activeTip.funFact[language]}
                </p>
              </div>

              {/* QUESTION & INTERACTIVE CHALLENGE */}
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-900">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>
                      {isTodayTip
                        ? language === 'pt' ? 'Pergunta de Hoje' : "Today's Question"
                        : language === 'pt' ? `Pergunta de ${activeTip.dateLabel.pt}` : `Question for ${activeTip.dateLabel.en}`}
                    </span>
                  </div>
                  {isTodayTip && (
                    <span className="text-[11px] font-black text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                      {language === 'pt' ? '50 pts se acertares • 25 pts se errares' : '50 pts correct • 25 pts wrong'}
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">
                    {activeTip.question[language]}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {activeTip.options.map((opt) => {
                    const isTodayAnswered = isTodayTip && hasAnsweredToday;
                    const isPracticeSubmitted = !isTodayTip && !!practiceAnswer?.isSubmitted;
                    const isRevealed = isTodayAnswered || isPracticeSubmitted;

                    const activeSelected = isTodayTip
                      ? (hasAnsweredToday ? savedAnswer?.selectedOptionId : selectedOptionId)
                      : (isPracticeSubmitted ? practiceAnswer?.selectedOptionId : selectedOptionId);

                    const isSelected = activeSelected === opt.id;
                    const isCorrectAnswer = opt.id === activeTip.correctOptionId;

                    let optionStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 bg-white text-slate-800';

                    if (isRevealed) {
                      if (isCorrectAnswer) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400/30';
                      } else {
                        optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-indigo-600 bg-indigo-50/90 text-indigo-950 font-bold ring-2 ring-indigo-600/30 shadow-xs';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isRevealed || submitting}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle} ${
                          isRevealed ? 'cursor-default' : 'active:scale-[0.99]'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                            isRevealed
                              ? isCorrectAnswer
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : isSelected
                                ? 'bg-rose-500 text-white border-rose-500'
                                : 'bg-slate-200 text-slate-600 border-slate-300'
                              : isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white text-slate-600 border-slate-300'
                          }`}
                        >
                          {opt.id.toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0 text-xs sm:text-sm">
                          {opt[language]}
                        </div>

                        {isRevealed && isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {isRevealed && isSelected && !isCorrectAnswer && (
                          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Action */}
                {((isTodayTip && !hasAnsweredToday) || (!isTodayTip && !practiceAnswer?.isSubmitted)) && (
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={!selectedOptionId || submitting}
                      onClick={handleSubmitAnswer}
                      className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                        selectedOptionId && !submitting
                          ? 'bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-800 text-white shadow-indigo-600/30 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                          : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                      }`}
                    >
                      <Award className="w-5 h-5 text-amber-300" />
                      <span>
                        {submitting
                          ? language === 'pt'
                            ? 'A validar resposta...'
                            : 'Validating answer...'
                          : selectedOptionId
                          ? isTodayTip
                            ? language === 'pt'
                              ? 'Confirmar Resposta e Ganhar Pontos!'
                              : 'Submit Answer & Earn Points!'
                            : language === 'pt'
                            ? 'Verificar Resposta (Modo Treino)'
                            : 'Check Answer (Practice Mode)'
                          : language === 'pt'
                          ? 'Escolhe uma opção para responder'
                          : 'Select an option to answer'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Result Feedback Banner */}
                {((isTodayTip && hasAnsweredToday) || (!isTodayTip && practiceAnswer?.isSubmitted)) && (
                  <div className="pt-2 space-y-3">
                    {(() => {
                      const isCorrect = isTodayTip
                        ? savedAnswer?.isCorrect
                        : practiceAnswer?.selectedOptionId === activeTip.correctOptionId;

                      return (
                        <div
                          className={`p-4 rounded-2xl border flex items-start gap-3 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-amber-50 border-amber-300 text-amber-950'
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                          )}

                          <div className="space-y-1">
                            <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                              <span>
                                {isCorrect
                                  ? language === 'pt'
                                    ? '🎉 Resposta Certa! Parabéns!'
                                    : '🎉 Correct Answer! Well done!'
                                  : language === 'pt'
                                  ? '👍 Boa tentativa!'
                                  : '👍 Good effort!'}
                              </span>
                              {isTodayTip && (
                                <span
                                  className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                                    isCorrect
                                      ? 'bg-emerald-200 text-emerald-900'
                                      : 'bg-amber-200 text-amber-900'
                                  }`}
                                >
                                  +{savedAnswer?.pointsEarned} {language === 'pt' ? 'Pontos' : 'Points'}
                                </span>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm">
                              {isTodayTip ? (
                                isCorrect
                                  ? language === 'pt'
                                    ? 'Leste com atenção e acertaste em cheio! Ganhaste 50 pontos!'
                                    : 'You read carefully and got it right! You earned 50 points!'
                                  : language === 'pt'
                                  ? 'Erraste a pergunta, mas pelo teu esforço e por leres a dica ganhaste 25 pontos de participação!'
                                  : 'You missed the question, but earned 25 participation points for reading the tip!'
                              ) : (
                                isCorrect
                                  ? language === 'pt'
                                    ? 'Excelente raciocínio! Acertaste nesta curiosidade do calendário!'
                                    : 'Excellent thinking! You got this calendar fact right!'
                                  : language === 'pt'
                                  ? 'Não foi desta, mas aprendeste um facto muito engraçado de TIC!'
                                  : 'Not this time, but you learned a very fun ICT fact!'
                              )}
                            </p>

                            {/* Explanation */}
                            <div className="mt-2 pt-2 border-t border-black/10 text-xs">
                              <span className="font-bold">
                                {language === 'pt' ? '💡 Explicação: ' : '💡 Explanation: '}
                              </span>
                              <span>{activeTip.explanation[language]}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {justSubmitted && isTodayTip && (
                      <p className="text-xs font-bold text-center text-emerald-600 animate-fade-in">
                        {language === 'pt'
                          ? '🌟 Pontos creditados no teu perfil com sucesso!'
                          : '🌟 Points credited to your profile successfully!'}
                      </p>
                    )}

                    {isTodayTip && (
                      <div className="p-3 bg-slate-100 rounded-xl text-center text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        {language === 'pt'
                          ? 'Esta é a tua dica de hoje. Podes navegar nas setas acima para explorar outras curiosidades do ano!'
                          : 'This is your tip for today. You can use the arrows above to explore other year curiosities!'}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Direct Jump to ICT Theme */}
              {onNavigateTheme && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-3 mt-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl">{activeTip.themeIcon}</span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                        {language === 'pt' ? 'Aulas de TIC' : 'ICT Class'}
                      </div>
                      <div className="text-xs font-extrabold text-indigo-950 truncate">
                        {activeTip.themeTitle[language]}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGoToTheme(activeTip.themeId)}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <span>{language === 'pt' ? 'Ir para o Tema' : 'Go to Topic'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span className="text-[11px] text-slate-400">
                {language === 'pt'
                  ? `${activeTip.dateLabel.pt} • TIC 5.º Ano (${activeTip.dayOfYear}/366)`
                  : `${activeTip.dateLabel.en} • 5th Grade ICT (${activeTip.dayOfYear}/366)`}
              </span>

              <button
                onClick={handleCloseModal}
                className="px-4 py-1.5 rounded-xl font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {language === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
