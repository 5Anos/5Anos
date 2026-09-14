import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Award, Sparkles, BookOpen, ShieldCheck, Zap } from 'lucide-react';
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
  onFinish: (
    score: number,
    maxScore: number,
    percentage: number,
    answersPayload?: Record<string, string | number>
  ) => void;
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
  const [submitted, setSubmitted] = useState(false);

  // Determinar se já existe uma 1.ª tentativa registada como avaliação oficial
  const officialEvaluationScore = existingProgress?.firstAttemptScore ??
    existingProgress?.firstAttemptPercentage ??
    (existingProgress?.attempts && existingProgress.attempts > 0
      ? (existingProgress.score ?? existingProgress.percentage ?? existingProgress.bestScore)
      : undefined);

  const isInitialFirstAttempt = officialEvaluationScore === undefined &&
    (!existingProgress?.attempts || existingProgress.attempts === 0);

  const [wasFirstAttemptOnStart] = useState(isInitialFirstAttempt);
  const [recordedOfficialScore, setRecordedOfficialScore] = useState<number | undefined>(officialEvaluationScore);
  const [attemptCount, setAttemptCount] = useState(existingProgress?.attempts || 0);

  const t = translations[language];
  const hasPreviousAttempt = !wasFirstAttemptOnStart || attemptCount > 0;

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

    // Collect student selected answers with explicit option text for server grading
    const answersPayload: Record<string, string | number> = {};
    shuffledQuestions.forEach((q) => {
      const selectedIdx = selectedAnswers[q.id];
      if (selectedIdx !== undefined && q.options?.pt && q.options.pt[selectedIdx]) {
        answersPayload[q.id] = q.options.pt[selectedIdx];
      } else if (selectedIdx !== undefined) {
        answersPayload[q.id] = selectedIdx;
      }
    });

    if (wasFirstAttemptOnStart && recordedOfficialScore === undefined) {
      setRecordedOfficialScore(percentage);
    }
    setAttemptCount((prev) => prev + 1);

    // Guardar progresso: 1.ª tentativa = avaliação; tentativas seguintes = treino. Sem XP atribuídos.
    onFinish(percentage, 100, percentage, answersPayload);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
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

            {/* Score and Attempt indicator pill */}
            {hasPreviousAttempt && recordedOfficialScore !== undefined ? (
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {language === 'pt'
                    ? `Avaliação Oficial: ${recordedOfficialScore}% (${getQuizMention(recordedOfficialScore, language)}) • Tentativa ${attemptCount + 1} (Treino)`
                    : `Official Assessment: ${recordedOfficialScore}% (${getQuizMention(recordedOfficialScore, language)}) • Attempt ${attemptCount + 1} (Practice)`}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-400/40 text-amber-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'pt' ? '1.ª Tentativa • Atividade de Avaliação' : '1st Attempt • Assessment Activity'}</span>
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
                  ? 'Avalia os teus conhecimentos neste tema. A primeira tentativa corresponde à tua avaliação oficial. As tentativas seguintes servem para treinar e rever.'
                  : 'Assess your knowledge in this theme. The first attempt corresponds to your official assessment. Subsequent attempts serve for practice and review.'
              }`}
              language={language}
              label={language === 'pt' ? 'Ouvir Quiz' : 'Listen Quiz'}
              variant="pill"
              size="sm"
            />
          </div>

          <p className="text-sm sm:text-base text-indigo-200 max-w-2xl leading-relaxed">
            {language === 'pt'
              ? 'Avalia os teus conhecimentos neste tema. A primeira tentativa é a que conta para a avaliação; as tentativas seguintes servem para treinar e rever.'
              : 'Assess your knowledge in this theme. The first attempt is the one that counts for assessment; subsequent attempts serve for practice and review.'}
          </p>
        </div>

        {/* Ambient geometric blur */}
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Results banner if submitted */}
      {submitted && (() => {
        const currentMention = getQuizMention(result.percentage, language);
        const badgeStyle = getQuizMentionBadgeStyle(result.percentage);
        const officialScoreToDisplay = wasFirstAttemptOnStart ? result.percentage : (recordedOfficialScore ?? result.percentage);
        const officialMention = getQuizMention(officialScoreToDisplay, language);

        return (
          <div className="rounded-[2rem] bg-white border-2 border-indigo-100 p-6 sm:p-8 shadow-md mb-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="text-5xl">{badgeStyle.emoji}</div>

            <div className="space-y-4 py-1">
              <div>
                <div className={`inline-block px-5 py-2 rounded-2xl text-xl sm:text-2xl font-black border shadow-2xs mb-2 ${badgeStyle.pillClass}`}>
                  {currentMention} ({result.percentage}%)
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 border border-indigo-200 text-indigo-900 mx-auto">
                  <span>{result.score} de {result.maxScore} Respostas Corretas nesta tentativa</span>
                  <span>•</span>
                  <span>{result.percentage}%</span>
                </div>
              </div>

              <div className="text-sm sm:text-base max-w-xl mx-auto text-slate-700 font-medium leading-relaxed space-y-2">
                {wasFirstAttemptOnStart ? (
                  language === 'pt' ? (
                    <>
                      <p>
                        📝 A tua 1.ª tentativa foi registada como o teu resultado de avaliação:{' '}
                        <strong className="text-indigo-900 font-bold">{result.percentage}% ({currentMention})</strong>.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal">
                        Podes voltar a fazer o quiz para rever o que aprendeste e tentar melhorar o teu resultado. As novas tentativas servem apenas para treinar.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        📝 Your 1st attempt has been recorded as your evaluation result:{' '}
                        <strong className="text-indigo-900 font-bold">{result.percentage}% ({currentMention})</strong>.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal">
                        You can retake the quiz to review what you learned and try to improve your score. New attempts serve purely for practice.
                      </p>
                    </>
                  )
                ) : (
                  language === 'pt' ? (
                    <>
                      <p>
                        Obtiveste <strong className="text-indigo-900 font-bold">{result.percentage}% ({currentMention})</strong> nesta tentativa de treino.
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                        A tua avaliação registada para a professora mantém-se em:{' '}
                        <strong>{officialScoreToDisplay}% ({officialMention})</strong>.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal">
                        Podes voltar a fazer o quiz para rever o que aprendeste e tentar melhorar o teu resultado. As novas tentativas servem apenas para treinar.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        You scored <strong className="text-indigo-900 font-bold">{result.percentage}% ({currentMention})</strong> on this practice attempt.
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                        Your recorded evaluation score for the teacher remains:{' '}
                        <strong>{officialScoreToDisplay}% ({officialMention})</strong>.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal">
                        You can retake the quiz to review what you learned and try to improve your score. New attempts serve purely for practice.
                      </p>
                    </>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-2xs transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-indigo-600" />
                <span>{language === 'pt' ? 'Repetir o Quiz (Treino)' : 'Retake Quiz (Practice)'}</span>
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
