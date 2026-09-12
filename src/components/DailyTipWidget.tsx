import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  Award,
  BookOpen,
  Calendar,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { User, Language, UserAchievement } from '../types';
import {
  getTodayDailyTip,
  getTodayDateString,
  DailyTicTip,
} from '../data/dailyTipsData';
import { api } from '../services/api';
import { AudioSpeakButton } from './AudioSpeakButton';
import { SabiasQueBadge } from './SabiasQueBadge';

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

  // Today's tip: automatically distinct for each day of the year
  const todayDateStr = useMemo(() => getTodayDateString(), []);
  const todayTip: DailyTicTip = useMemo(() => getTodayDailyTip(), []);

  // Storage key strictly for today's tip, including year to prevent annual collisions
  const currentYear = new Date().getFullYear();
  const todayStorageKey = `tic_daily_tip_${currentYear}_${todayDateStr}_${user?.id || 'guest'}`;

  const [savedAnswer, setSavedAnswer] = useState<StoredDailyAnswer | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

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

  // Load status of today's tip from localStorage and Cloud Firestore (multi-device sync)
  useEffect(() => {
    let isCancelled = false;

    // First check local cache for instantaneous UI responsiveness
    try {
      const raw = localStorage.getItem(todayStorageKey);
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

    // Then check Cloud Firestore to ensure multi-device synchronization
    if (user?.id) {
      api.getDailyTipStatus(user.id, todayDateStr).then((cloudStatus) => {
        if (isCancelled || !cloudStatus?.answered) return;
        const answerRecord: StoredDailyAnswer = {
          answered: true,
          selectedOptionId: cloudStatus.selectedOptionId,
          isCorrect: cloudStatus.isCorrect,
          pointsEarned: cloudStatus.pointsEarned,
          timestamp: cloudStatus.timestamp || new Date().toISOString(),
        };
        setSavedAnswer(answerRecord);
        setSelectedOptionId(cloudStatus.selectedOptionId);
        try {
          localStorage.setItem(todayStorageKey, JSON.stringify(answerRecord));
        } catch {
          // ignore
        }
      }).catch((err) => {
        console.warn('Notice loading daily tip status from cloud:', err);
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [todayStorageKey, user?.id, todayDateStr]);

  const hasAnsweredToday = !!savedAnswer?.answered;

  const handleSelectOption = (optionId: string) => {
    if (hasAnsweredToday || submitting) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOptionId || hasAnsweredToday || submitting) return;

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
          awardedPoints,
          todayDateStr,
          { selectedOptionId, isCorrect }
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

      try {
        localStorage.setItem(todayStorageKey, JSON.stringify(answerRecord));
      } catch (storageErr) {
        console.warn('Could not persist daily tip answer to localStorage:', storageErr);
      }
      setSavedAnswer(answerRecord);
      setJustSubmitted(true);
    } catch (err) {
      console.error('Error recording daily tip points:', err);
      try {
        localStorage.setItem(todayStorageKey, JSON.stringify(answerRecord));
      } catch (storageErr) {
        console.warn('Could not persist daily tip answer to localStorage:', storageErr);
      }
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

  return (
    <>
      {/* Dashboard Sticker Entrance (Sabias Que? - Clica e Ganha Pontos) */}
      {!hideCard && (
        <SabiasQueBadge
          language={language}
          hasAnswered={hasAnsweredToday}
          onClick={() => setInternalModalOpen(true)}
        />
      )}

      {/* Modal: Today's Tip */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-xl my-4 sm:my-6 rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-6 pt-5 pb-4 bg-linear-to-r from-indigo-800 via-blue-800 to-indigo-950 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-2xl font-bold border border-white/20 shadow-inner">
                    {todayTip.themeIcon}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white/15 text-white px-3 py-1.5 rounded-full border border-white/20 shadow-xs">
                      <span className="text-xs font-black tracking-wide flex items-center gap-1 text-white uppercase">
                        💡 {language === 'pt' ? 'Sabias que?' : 'Did you know?'}
                      </span>
                    </div>
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
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Theme Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs">
                  <span>{todayTip.themeIcon}</span>
                  <span>
                    {language === 'pt'
                      ? `Tema ${todayTip.themeNumber}: ${todayTip.themeTitle.pt}`
                      : `Topic ${todayTip.themeNumber}: ${todayTip.themeTitle.en}`}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  {todayTip.dateLabel[language]}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                  🏷️ {todayTip.category[language]}
                </span>
              </div>

              {/* Title & Teaser */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80">
                <h4 className="text-base sm:text-lg font-black text-indigo-950 leading-snug">
                  {todayTip.title[language]}
                </h4>
                {todayTip.teaser && (
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-indigo-800">
                    {todayTip.teaser[language]}
                  </p>
                )}
              </div>

              {/* Reading Section: Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{language === 'pt' ? 'A Curiosidade Explicada' : 'The Curiosity Explained'}</span>
                  </div>
                  <AudioSpeakButton
                    id={`daily_tip_audio_${todayTip.title.en.replace(/\s+/g, '_')}`}
                    text={`${todayTip.title[language]}. ${todayTip.teaser ? todayTip.teaser[language] + '.' : ''} ${todayTip.description[language]}. ${todayTip.funFact ? todayTip.funFact[language] : ''}`}
                    language={language}
                    size="sm"
                    variant="inline"
                    label={language === 'pt' ? 'Ouvir Dica' : 'Listen'}
                    stopLabel={language === 'pt' ? 'Parar' : 'Stop'}
                  />
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                  {todayTip.description[language]}
                </p>
              </div>

              {/* Fun Fact Extra */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-amber-900">
                  <div className="flex items-center gap-2">
                    <span>✨</span>
                    <span>{language === 'pt' ? 'Curiosidade Extra / Sabias que?' : 'Fun Fact / Did You Know?'}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {todayTip.funFact[language]}
                </p>
              </div>

              {/* QUESTION & INTERACTIVE CHALLENGE */}
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-900 flex-wrap">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600" />
                      <span>{language === 'pt' ? 'Pergunta de Hoje' : "Today's Question"}</span>
                    </div>
                    <AudioSpeakButton
                      id={`daily_tip_question_${todayTip.title.en.replace(/\s+/g, '_')}`}
                      text={`${todayTip.question[language]}. ${todayTip.options.map(o => `${o.id.toUpperCase()}: ${o[language]}`).join('. ')}`}
                      language={language}
                      size="xs"
                      variant="inline"
                      label={language === 'pt' ? 'Ouvir Pergunta' : 'Listen'}
                      stopLabel={language === 'pt' ? 'Parar' : 'Stop'}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                      {language === 'pt' ? '50 pts se acertares • 25 pts se errares' : '50 pts correct • 25 pts wrong'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">
                    {todayTip.question[language]}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {todayTip.options.map((opt) => {
                    const isRevealed = hasAnsweredToday;
                    const isSelected = (hasAnsweredToday ? savedAnswer?.selectedOptionId : selectedOptionId) === opt.id;
                    const isCorrectAnswer = opt.id === todayTip.correctOptionId;

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
                {!hasAnsweredToday && (
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

                {/* Result Feedback Banner */}
                {hasAnsweredToday && (
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
                              ? 'Leste com atenção e acertaste em cheio na resposta! Ganhaste 50 pontos!'
                              : 'You read carefully and got it right! You earned 50 points!'
                            : language === 'pt'
                            ? 'A tua opção selecionada não estava correta, mas pelo teu esforço e por leres a dica ganhaste 25 pontos de participação!'
                            : 'Your selected option was incorrect, but you earned 25 participation points for reading the tip!'}
                        </p>

                        {/* Detailed Explanation */}
                        <div className="mt-2 pt-2 border-t border-black/10 text-xs space-y-1">
                          {!savedAnswer?.isCorrect && savedAnswer?.selectedOptionId && (
                            <div className="p-2.5 rounded-lg bg-amber-100/90 border border-amber-300 text-amber-950 font-medium">
                              <span className="font-bold">
                                {language === 'pt' ? '❌ Análise da Opção Selecionada: ' : '❌ Selected Option Analysis: '}
                              </span>
                              <span>
                                {language === 'pt'
                                  ? `A opção que escolheste não é a melhor resposta para esta curiosidade. Vê a fundamentação correta abaixo:`
                                  : `The option you picked is not the correct choice for this tip. See the rationale below:`}
                              </span>
                            </div>
                          )}
                          <div className="pt-1">
                            <span className="font-bold">
                              {language === 'pt' ? '💡 Explicação da Resposta Correta: ' : '💡 Correct Answer Explanation: '}
                            </span>
                            <span>{todayTip.explanation[language]}</span>
                          </div>
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
                        ? 'Amanhã terás uma nova dica de TIC diferente para descobrir e responder!'
                        : 'Tomorrow you will have a new, different ICT tip to discover and answer!'}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Jump to ICT Theme */}
              {onNavigateTheme && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-3 mt-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl">{todayTip.themeIcon}</span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                        {language === 'pt' ? 'Aulas de TIC' : 'ICT Class'}
                      </div>
                      <div className="text-xs font-extrabold text-indigo-950 truncate">
                        {todayTip.themeTitle[language]}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGoToTheme(todayTip.themeId)}
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
                  ? `${todayTip.dateLabel.pt} • TIC 5.º Ano`
                  : `${todayTip.dateLabel.en} • 5th Grade ICT`}
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
