import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Award, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { QuizQuestion, Language, ActivityProgress } from '../../types';
import { translations } from '../../i18n/translations';
import { getQuizMention, getQuizMentionBadgeStyle } from '../../utils/exportUtils';
import { AudioSpeakButton } from '../AudioSpeakButton';

interface FinalQuizViewProps {
  themeTitle: string;
  themeNumber: number;
  questions: QuizQuestion[];
  language: Language;
  existingProgress?: ActivityProgress;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const FinalQuizView: React.FC<FinalQuizViewProps> = ({
  themeTitle,
  themeNumber,
  questions,
  language,
  existingProgress,
  onBack,
  onFinish,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isRetrying, setIsRetrying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = translations[language];

  const hasFirstAttempt = Boolean(
    existingProgress &&
    (existingProgress.firstAttemptScore !== undefined || (existingProgress.attempts && existingProgress.attempts > 0))
  );

  const officialFirstScore = existingProgress?.firstAttemptScore ?? existingProgress?.score;
  const [shuffledQuestions, setShuffledQuestions] = useState(() => {
    return questions.map((q) => {
      const optsPt = q.options.pt;
      const optsEn = q.options.en;
      const indices = optsPt.map((_, idx) => idx);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const newOptsPt = indices.map((idx) => optsPt[idx]);
      const newOptsEn = indices.map((idx) => optsEn[idx]);
      const newCorrectIndex = indices.indexOf(q.correctIndex);
      return {
        ...q,
        options: {
          pt: newOptsPt,
          en: newOptsEn,
        },
        correctIndex: newCorrectIndex,
      };
    });
  });

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    shuffledQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    const maxScore = shuffledQuestions.length;
    const percentage = Math.round((score / maxScore) * 100);
    return { score, maxScore, percentage };
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const { score, maxScore, percentage } = calculateScore();
    // Rule 1: Every challenge and quiz is worth exactly 100 points maximum.
    onFinish(percentage, 100, percentage);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setIsRetrying(true);
    setShuffledQuestions(
      questions.map((q) => {
        const optsPt = q.options.pt;
        const optsEn = q.options.en;
        const indices = optsPt.map((_, idx) => idx);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        const newOptsPt = indices.map((idx) => optsPt[idx]);
        const newOptsEn = indices.map((idx) => optsEn[idx]);
        const newCorrectIndex = indices.indexOf(q.correctIndex);
        return {
          ...q,
          options: {
            pt: newOptsPt,
            en: newOptsEn,
          },
          correctIndex: newCorrectIndex,
        };
      })
    );
  };

  const allAnswered = Object.keys(selectedAnswers).length === shuffledQuestions.length;
  const result = calculateScore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      {/* Header */}
      <div className="rounded-[2rem] bg-indigo-950 text-white p-6 sm:p-8 md:p-10 shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
            <span className="inline-flex items-center gap-1 bg-indigo-900/80 border border-indigo-700/60 px-2.5 py-1 rounded-full text-indigo-200">
              <Award className="w-3.5 h-3.5" />
              <span>Tema {themeNumber} • {language === 'pt' ? 'Quiz de Aprendizagem' : 'Learning Quiz'}</span>
            </span>

            {/* Rule 3 indicator pill */}
            {hasFirstAttempt ? (
              <span className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-400/40 text-amber-200 px-2.5 py-1 rounded-full">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'pt'
                    ? `Treino Livre (Tentativa ${(existingProgress?.attempts || 1) + 1})`
                    : `Free Practice (Attempt ${(existingProgress?.attempts || 1) + 1})`}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'pt' ? '1.ª Tentativa Oficial' : '1st Official Attempt'}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              🏆 {language === 'pt' ? `Quiz de Aprendizagem: ${themeTitle}` : `Learning Quiz: ${themeTitle}`}
            </h1>
            <AudioSpeakButton
              id={`quiz-${themeNumber}-intro`}
              text={`${language === 'pt' ? `Quiz de Aprendizagem do Tema ${themeNumber}: ${themeTitle}` : `Learning Quiz: ${themeTitle}`}. ${
                language === 'pt'
                  ? 'Avalia todos os conhecimentos deste tema. Podes repetir quantas vezes quiseres para treinar!'
                  : 'Assess all knowledge from this theme.'
              }`}
              language={language}
              label={language === 'pt' ? 'Ouvir Quiz' : 'Listen Quiz'}
              variant="pill"
              size="sm"
            />
          </div>

          <p className="text-sm sm:text-base text-indigo-200 max-w-2xl leading-relaxed">
            {language === 'pt'
              ? 'Avalia todos os conhecimentos deste tema. Podes repetir quantas vezes quiseres para treinar!'
              : 'Assess all knowledge from this theme. You can retry as many times as you like for practice!'}
          </p>

          {/* Explicit reminder about first attempt evaluation rule */}
          <div className="pt-2">
            {hasFirstAttempt ? (
              <div className="inline-flex flex-wrap items-center gap-2 bg-indigo-900/60 border border-indigo-700/60 rounded-xl px-3.5 py-2 text-xs text-indigo-200">
                <span className="font-semibold text-amber-300">
                  {language === 'pt' ? 'Avaliação Oficial (1.ª tentativa):' : 'Official Evaluation (1st attempt):'}
                </span>
                <span className="font-black text-white bg-indigo-800/90 px-2.5 py-1 rounded-md">
                  {officialFirstScore !== undefined ? getQuizMention(officialFirstScore) : '—'}
                </span>
                <span className="text-indigo-300/80">
                  {language === 'pt'
                    ? '• As tentativas seguintes são para treino livre e não alteram a menção oficial.'
                    : '• Further attempts are for practice and do not alter the official evaluation.'}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-3.5 py-2 text-xs text-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'pt'
                    ? 'Nota importante: A avaliação obtida agora fica registada como a tua menção oficial permanente deste Quiz de Aprendizagem.'
                    : 'Important note: The evaluation obtained now will be registered permanently as your official score for this Learning Quiz.'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ambient geometric blur */}
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Results banner if submitted */}
      {submitted && (() => {
        const currentMention = getQuizMention(result.percentage);
        const badgeStyle = getQuizMentionBadgeStyle(result.percentage);
        const officialScoreToUse = officialFirstScore !== undefined ? officialFirstScore : result.percentage;
        const officialMention = getQuizMention(officialScoreToUse);

        return (
        <div className="rounded-[2rem] bg-white border-2 border-indigo-100 p-6 sm:p-8 shadow-md mb-8 text-center space-y-4 animate-in zoom-in-95">
          <div className="text-5xl">{badgeStyle.emoji}</div>

          {/* Distinguish 1st attempt result vs practice attempt */}
          {hasFirstAttempt ? (
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                {language === 'pt' ? 'Tentativa de Treino Concluída' : 'Practice Attempt Completed'}
              </span>

              <div>
                <div className={`inline-block px-4 py-1.5 rounded-2xl text-xl sm:text-2xl font-black border shadow-2xs mb-1.5 ${badgeStyle.pillClass}`}>
                  {currentMention}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {result.score} de {result.maxScore} Respostas Corretas
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-lg mx-auto text-xs sm:text-sm text-amber-950 space-y-1">
                <p className="font-bold flex items-center justify-center gap-1 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>
                    {language === 'pt'
                      ? `Avaliação Oficial Registada (1.ª tentativa): ${officialMention}`
                      : `Official Registered Evaluation (1st attempt): ${officialMention}`}
                  </span>
                </p>
                <p className="text-amber-800/90 leading-relaxed text-[11px] sm:text-xs">
                  {language === 'pt'
                    ? 'Esta tentativa serviu para treino e aprendizagem. As tentativas seguintes não alteram a tua menção oficial da 1.ª tentativa.'
                    : 'This attempt served for learning and practice. Subsequent attempts do not modify your official evaluation from the 1st attempt.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'pt' ? '1.ª Tentativa Oficial Concluída' : '1st Official Attempt Completed'}
              </span>

              <div>
                <div className={`inline-block px-5 py-2 rounded-2xl text-2xl sm:text-3xl font-black border shadow-xs mb-1.5 ${badgeStyle.pillClass}`}>
                  {currentMention}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {result.score} de {result.maxScore} Respostas Corretas
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-lg mx-auto text-xs sm:text-sm text-emerald-950 space-y-1">
                <p className="font-bold flex items-center justify-center gap-1 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'pt'
                      ? `Avaliação Oficial Registada: ${currentMention}`
                      : `Official Registered Evaluation: ${currentMention}`}
                  </span>
                </p>
                <p className="text-emerald-800/90 leading-relaxed text-[11px] sm:text-xs">
                  {language === 'pt'
                    ? 'A menção desta 1.ª tentativa ficou guardada permanentemente como a tua avaliação oficial. Podes repetir este quiz quantas vezes quiseres para continuar a treinar!'
                    : 'The evaluation of this 1st attempt is permanently saved as your official score. You may repeat this quiz as many times as you like to practice!'}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetry}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Treinar Novamente' : t.tryAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
            >
              {t.backToTheme}
            </button>
          </div>
        </div>
        );
      })()}

      {/* Questions list */}
      <div className="space-y-6">
        {shuffledQuestions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div key={q.id} className="rounded-2xl sm:rounded-[2rem] bg-white border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200/60">
                    {idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {q.question[language]}
                  </h3>
                </div>
                <AudioSpeakButton
                  id={`finalquiz-q-${q.id}`}
                  text={`${q.question[language]}. ${q.options[language].map((opt, i) => `Opção ${i + 1}: ${opt}`).join('. ')}`}
                  language={language}
                  variant="icon"
                  size="xs"
                />
              </div>

              <div className="space-y-2.5 sm:pl-10">
                {q.options[language].map((opt, optIdx) => {
                  let style = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (userChoice === optIdx) {
                      style = 'border-rose-500 bg-rose-50 text-rose-950 font-semibold';
                    } else {
                      style = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (userChoice === optIdx) {
                    style = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {submitted && userChoice === optIdx && optIdx !== q.correctIndex && (
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-3 p-4 rounded-xl text-xs sm:text-sm sm:ml-10 space-y-2 ${
                  isCorrect ? 'bg-emerald-100/70 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <p className="font-extrabold text-sm flex items-center gap-1.5">
                        <span>{isCorrect ? '✅' : '❌'}</span>
                        <span>{isCorrect ? t.correctAnswer : t.wrongAnswer}</span>
                      </p>

                      {!isCorrect && userChoice !== undefined && (
                        <div className="p-3 rounded-lg bg-rose-100/80 border border-rose-300 text-rose-950 font-medium space-y-1">
                          <p className="font-bold text-xs uppercase tracking-wide text-rose-900">
                            {language === 'pt' ? `A tua escolha: «${q.options[language][userChoice]}»` : `Your choice: "${q.options[language][userChoice]}"`}
                          </p>
                          <p className="text-xs sm:text-sm">
                            {q.optionExplanations?.[language]?.[userChoice] ||
                              (language === 'pt'
                                ? `Esta opção está incorreta porque não responde adequadamente à situação do problema. A resposta correta é «${q.options[language][q.correctIndex]}».`
                                : `This option is incorrect as it does not solve the scenario appropriately. The correct answer is "${q.options[language][q.correctIndex]}".`)}
                          </p>
                        </div>
                      )}

                      <div className="pt-1">
                        <p className="font-bold text-xs text-slate-700 mb-0.5">
                          {language === 'pt' ? '💡 Resposta Correta e Explicação do Conceito:' : '💡 Correct Answer & Concept Explanation:'}
                        </p>
                        <p className="leading-relaxed">{q.explanation[language]}</p>
                      </div>
                    </div>

                    <AudioSpeakButton
                      id={`finalquiz-expl-${q.id}`}
                      text={`${isCorrect ? t.correctAnswer : t.wrongAnswer}. ${
                        !isCorrect && userChoice !== undefined && q.optionExplanations?.[language]?.[userChoice]
                          ? q.optionExplanations[language][userChoice] + '. '
                          : ''
                      } ${q.explanation[language]}`}
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

      {/* Submit Button */}
      {!submitted && (
        <div className="mt-8 pt-4 border-t border-slate-200">
          <button
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{language === 'pt' ? 'Submeter Respostas e Avaliar' : 'Submit Answers & Evaluate'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
