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
  Clock
} from 'lucide-react';
import { User, Language, UserAchievement } from '../types';
import { getTodayDailyTip, getTodayDateString, DailyTicTip } from '../data/dailyTipsData';
import { api } from '../services/api';

interface DailyTipWidgetProps {
  user: User | null;
  language: Language;
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
  onPointsAwarded,
  onOpenAuth: _onOpenAuth,
  onNavigateTheme,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Exactly ONE tip per day (366 days)
  const todayDateStr = useMemo(() => getTodayDateString(), []);
  const dailyTip: DailyTicTip = useMemo(() => getTodayDailyTip(), []);

  // Storage key for this specific day and user
  const storageKey = `tic_daily_tip_${todayDateStr}_${user?.id || 'guest'}`;

  const [savedAnswer, setSavedAnswer] = useState<StoredDailyAnswer | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Load status from localStorage on mount and when key changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed: StoredDailyAnswer = JSON.parse(raw);
        setSavedAnswer(parsed);
        setSelectedOptionId(parsed.selectedOptionId);
      } else {
        setSavedAnswer(null);
        setSelectedOptionId(null);
      }
    } catch {
      setSavedAnswer(null);
      setSelectedOptionId(null);
    }
  }, [storageKey]);

  const hasAnswered = !!savedAnswer?.answered;

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered || submitting) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOptionId || hasAnswered || submitting) return;

    setSubmitting(true);
    const isCorrect = selectedOptionId === dailyTip.correctOptionId;
    // User requested: se ler e acertar tem 50 pontos, se ler e errar tem só 25
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
          `${dailyTip.title[language]} (${isCorrect ? 'Acertou' : 'Participou'})`,
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

      localStorage.setItem(storageKey, JSON.stringify(answerRecord));
      setSavedAnswer(answerRecord);
      setJustSubmitted(true);
    } catch (err) {
      console.error('Error recording daily tip points:', err);
      // Even if network fails, persist locally
      localStorage.setItem(storageKey, JSON.stringify(answerRecord));
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
    setModalOpen(false);
    if (onNavigateTheme) {
      onNavigateTheme(themeId);
    }
  };

  return (
    <>
      {/* Dashboard Card Widget (Single Daily Tip) */}
      <div
        onClick={() => setModalOpen(true)}
        className="group relative overflow-hidden bg-linear-to-br from-indigo-50 via-sky-50/70 to-blue-100/50 p-5 sm:p-6 rounded-[2rem] border border-indigo-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-indigo-300"
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-indigo-300/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-600 to-sky-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
            {dailyTip.themeIcon || '💡'}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                {language === 'pt' ? '💡 Dica do Dia TIC' : '💡 Daily ICT Tip'}
              </span>

              {hasAnswered ? (
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
                <span>{dailyTip.dateLabel[language]}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 border border-slate-200 shadow-2xs">
                <span>{dailyTip.themeIcon}</span>
                <span>
                  {language === 'pt'
                    ? `Tema ${dailyTip.themeNumber}: ${dailyTip.themeTitle.pt}`
                    : `Topic ${dailyTip.themeNumber}: ${dailyTip.themeTitle.en}`}
                </span>
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-indigo-950 transition-colors line-clamp-2">
              {dailyTip.title[language]}
            </h4>

            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 group-hover:underline flex items-center gap-1">
                {hasAnswered
                  ? language === 'pt'
                    ? 'Ver explicação e resultado'
                    : 'View explanation and score'
                  : language === 'pt'
                  ? 'Lê e responde à pergunta (+50 pts)'
                  : 'Read and answer question (+50 pts)'}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>

              <span className="text-[10px] font-semibold text-slate-500">
                {hasAnswered
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

      {/* Modal: Single Daily Tip with Reading and Question */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-xl my-4 sm:my-6 rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-6 pt-5 pb-4 bg-linear-to-r from-indigo-800 via-blue-800 to-indigo-950 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-2xl font-bold border border-white/20 shadow-inner">
                    {dailyTip.themeIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-sky-300">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        {language === 'pt'
                          ? `Dica Diária de TIC • ${dailyTip.dateLabel.pt}`
                          : `Daily ICT Tip • ${dailyTip.dateLabel.en}`}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mt-0.5 text-white">
                      💡 {language === 'pt' ? 'Dica do Dia' : 'Daily Tip'}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Informative Banner */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-sky-100 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {language === 'pt'
                      ? 'Uma dica por dia • Lê e responde à pergunta!'
                      : 'One tip per day • Read and answer the question!'}
                  </span>
                </div>
                <div className="text-[11px] font-black bg-white/15 px-2.5 py-0.5 rounded-full">
                  {language === 'pt' ? 'Acertar: 50 pts | Errar: 25 pts' : 'Correct: 50 pts | Wrong: 25 pts'}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Theme Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs">
                  <span>{dailyTip.themeIcon}</span>
                  <span>
                    {language === 'pt'
                      ? `Tema ${dailyTip.themeNumber}: ${dailyTip.themeTitle.pt}`
                      : `Topic ${dailyTip.themeNumber}: ${dailyTip.themeTitle.en}`}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  {dailyTip.dateLabel[language]}
                </span>
              </div>

              {/* Title & Teaser */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80">
                <h4 className="text-base sm:text-lg font-black text-indigo-950 leading-snug">
                  {dailyTip.title[language]}
                </h4>
                {dailyTip.teaser && (
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-indigo-800">
                    {dailyTip.teaser[language]}
                  </p>
                )}
              </div>

              {/* Reading Section: Description */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'pt' ? 'A Explicação da Dica' : 'Tip Explanation'}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                  {dailyTip.description[language]}
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
                  {dailyTip.whyItMatters[language]}
                </p>
              </div>

              {/* Fun Fact Extra */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
                  <span>✨</span>
                  <span>{language === 'pt' ? 'Curiosidade Extra:' : 'Extra Fact:'}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {dailyTip.funFact[language]}
                </p>
              </div>

              {/* QUESTION & INTERACTIVE CHALLENGE */}
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-900">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>{language === 'pt' ? 'Pergunta de Hoje' : "Today's Question"}</span>
                  </div>
                  <span className="text-[11px] font-black text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                    {language === 'pt' ? '50 pts se acertares • 25 pts se errares' : '50 pts correct • 25 pts wrong'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">
                    {dailyTip.question[language]}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {dailyTip.options.map((opt) => {
                    const isSelected = (hasAnswered ? savedAnswer?.selectedOptionId : selectedOptionId) === opt.id;
                    const isCorrectAnswer = opt.id === dailyTip.correctOptionId;

                    let optionStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 bg-white text-slate-800';

                    if (hasAnswered) {
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
                        disabled={hasAnswered || submitting}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle} ${
                          hasAnswered ? 'cursor-default' : 'active:scale-[0.99]'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                            hasAnswered
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

                        {hasAnswered && isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {hasAnswered && isSelected && !isCorrectAnswer && (
                          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Action (Only if not answered yet) */}
                {!hasAnswered && (
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
                          ? language === 'pt'
                            ? 'Confirmar Resposta e Ganhar Pontos!'
                            : 'Submit Answer & Earn Points!'
                          : language === 'pt'
                          ? 'Escolhe uma opção para responder'
                          : 'Select an option to answer'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Result Feedback Banner (When answered) */}
                {hasAnswered && (
                  <div className="pt-2 space-y-3">
                    <div
                      className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        savedAnswer?.isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-amber-50 border-amber-300 text-amber-950'
                      }`}
                    >
                      {savedAnswer?.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                      )}

                      <div className="space-y-1">
                        <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                          <span>
                            {savedAnswer?.isCorrect
                              ? language === 'pt'
                                ? '🎉 Resposta Certa! Parabéns!'
                                : '🎉 Correct Answer! Well done!'
                              : language === 'pt'
                              ? '👍 Boa tentativa!'
                              : '👍 Good effort!'}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                              savedAnswer?.isCorrect
                                ? 'bg-emerald-200 text-emerald-900'
                                : 'bg-amber-200 text-amber-900'
                            }`}
                          >
                            +{savedAnswer?.pointsEarned} {language === 'pt' ? 'Pontos' : 'Points'}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm">
                          {savedAnswer?.isCorrect
                            ? language === 'pt'
                              ? 'Leste com atenção e acertaste em cheio! Ganhaste 50 pontos!'
                              : 'You read carefully and got it right! You earned 50 points!'
                            : language === 'pt'
                            ? 'Erraste a pergunta, mas pelo teu esforço e por leres a dica ganhaste 25 pontos de participação!'
                            : 'You missed the question, but earned 25 participation points for reading the tip!'}
                        </p>

                        {/* Explanation */}
                        <div className="mt-2 pt-2 border-t border-black/10 text-xs">
                          <span className="font-bold">
                            {language === 'pt' ? '💡 Explicação: ' : '💡 Explanation: '}
                          </span>
                          <span>{dailyTip.explanation[language]}</span>
                        </div>
                      </div>
                    </div>

                    {justSubmitted && (
                      <p className="text-xs font-bold text-center text-emerald-600 animate-fade-in">
                        {language === 'pt'
                          ? '🌟 Pontos creditados no teu perfil com sucesso!'
                          : '🌟 Points credited to your profile successfully!'}
                      </p>
                    )}

                    <div className="p-3 bg-slate-100 rounded-xl text-center text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                      {language === 'pt'
                        ? 'Esta é a tua dica de hoje. Volta amanhã para uma nova dica e mais pontos!'
                        : 'This is your tip for today. Come back tomorrow for a new tip and more points!'}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Jump to ICT Theme */}
              {onNavigateTheme && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-3 mt-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl">{dailyTip.themeIcon}</span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                        {language === 'pt' ? 'Aulas de TIC' : 'ICT Class'}
                      </div>
                      <div className="text-xs font-extrabold text-indigo-950 truncate">
                        {dailyTip.themeTitle[language]}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGoToTheme(dailyTip.themeId)}
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
                  ? `${dailyTip.dateLabel.pt} • TIC 5.º Ano`
                  : `${dailyTip.dateLabel.en} • 5th Grade ICT`}
              </span>

              <button
                onClick={() => setModalOpen(false)}
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
