import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Award, Sparkles, BookOpen, ShieldCheck, Zap, RotateCcw, Trophy, Star } from 'lucide-react';
import { QuizQuestion, Language, ActivityProgress } from '../../types';
import { translations } from '../../i18n/translations';
import { getQuizMention, getQuizMentionBadgeStyle, cleanPedagogicalExplanation } from '../../utils/exportUtils';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { ticoFeedback } from '../../utils/ticoEvents';
import { soundEffects } from '../../utils/soundEffects';

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
  const [showResultModal, setShowResultModal] = useState(false);

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
    setShowResultModal(true);
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

    if (percentage === 100) {
      soundEffects.playVictory();
      ticoFeedback.triggerQuizPerfect();
    } else if (percentage >= 70) {
      soundEffects.playSuccess();
      ticoFeedback.triggerCorrect();
    } else {
      soundEffects.playAlert();
      ticoFeedback.triggerWrong(
        language === 'pt'
          ? 'Não desanimes! Dá uma vista de olhos às pistas pedagógicas abaixo para aprenderes cada conceito! 💡'
          : 'Keep going! Review each pedagogical clue below to master the concepts! 💡'
      );
    }

    // Guardar progresso: 1.ª tentativa = avaliação; tentativas seguintes = treino. Sem XP atribuídos.
    onFinish(percentage, 100, percentage, answersPayload);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setShowResultModal(false);
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
      <div className="rounded-2xl sm:rounded-[2rem] bg-indigo-950 text-white p-5 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 relative overflow-hidden">
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
                    ? `Avaliação Oficial: ${getQuizMention(recordedOfficialScore, language)} • Tentativa ${attemptCount + 1} (Treino)`
                    : `Official Assessment: ${getQuizMention(recordedOfficialScore, language)} • Attempt ${attemptCount + 1} (Practice)`}
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

      {/* 🏆 Quiz de Aprendizagem Completion Pop-Up Modal */}
      {showResultModal && submitted && (() => {
        const currentMention = getQuizMention(result.percentage, language);
        const badgeStyle = getQuizMentionBadgeStyle(result.percentage);
        const officialScoreToDisplay = wasFirstAttemptOnStart ? result.percentage : (recordedOfficialScore ?? result.percentage);
        const officialMention = getQuizMention(officialScoreToDisplay, language);

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border-2 border-indigo-200 shadow-2xl max-w-lg w-full p-5 sm:p-8 text-center animate-in zoom-in-95 my-auto space-y-5">
              <div className="text-6xl animate-bounce">
                {badgeStyle.emoji}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  {language === 'pt' ? `Tema ${themeNumber} • Quiz de Aprendizagem Concluído` : `Theme ${themeNumber} • Learning Quiz Completed`}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                  {result.percentage === 100
                    ? (language === 'pt' ? 'Excelente! Pontuação Máxima!' : 'Excellent! Perfect Score!')
                    : result.percentage >= 90
                    ? (language === 'pt' ? 'Muito Bom Trabalho!' : 'Very Good Work!')
                    : result.percentage >= 70
                    ? (language === 'pt' ? 'Bom Trabalho! Quiz Concluído!' : 'Good Job! Quiz Completed!')
                    : result.percentage >= 50
                    ? (language === 'pt' ? 'Satisfatório! Quiz Concluído!' : 'Satisfactory! Quiz Completed!')
                    : (language === 'pt' ? 'Tentativa Concluída! Vamos Praticar!' : 'Attempt Completed! Keep Practicing!')}
                </h2>
              </div>

              <div>
                <div className={`inline-block px-6 py-2.5 rounded-2xl text-2xl sm:text-3xl font-black border shadow-2xs mb-2 ${badgeStyle.pillClass}`}>
                  {currentMention}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 border border-indigo-200 text-indigo-900 mx-auto flex-wrap justify-center">
                  <span>{result.score} de {result.maxScore} {language === 'pt' ? 'Respostas Corretas' : 'Correct Answers'}</span>
                </div>
              </div>

              {/* Assessment Explanation */}
              <div className="text-left text-xs sm:text-sm">
                {wasFirstAttemptOnStart ? (
                  <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 space-y-1">
                    <div className="flex items-center gap-2 font-black text-indigo-900">
                      <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>
                        {language === 'pt'
                          ? '1.ª Tentativa Registada como Avaliação Oficial'
                          : '1st Attempt Recorded as Official Grade'}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-xs">
                      {language === 'pt' ? (
                        <>
                          A tua primeira tentativa foi gravada como nota oficial com a menção:{' '}
                          <strong className="font-black text-indigo-900">{currentMention}</strong>.
                        </>
                      ) : (
                        <>
                          Your 1st attempt was recorded as official grade with mention:{' '}
                          <strong className="font-black text-indigo-900">{currentMention}</strong>.
                        </>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 space-y-1">
                    <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      <span>{language === 'pt' ? `Tentativa de Treino ${attemptCount}` : `Practice Attempt ${attemptCount}`}</span>
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === 'pt' ? (
                        <>
                          Nota oficial registada da 1.ª tentativa: <strong className="text-indigo-950 font-bold">{officialMention}</strong>.
                        </>
                      ) : (
                        <>
                          Official recorded grade from 1st attempt: <strong className="text-indigo-950 font-bold">{officialMention}</strong>.
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowResultModal(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <span>🔍</span>
                  <span>{language === 'pt' ? 'Rever Respostas com Pistas' : 'Review Answers with Clues'}</span>
                </button>

                <button
                  onClick={handleRetry}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'pt' ? 'Repetir o Quiz (Treino)' : 'Retake Quiz (Practice)'}</span>
                </button>

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
                <div className={`inline-block px-6 py-2.5 rounded-2xl text-2xl sm:text-3xl font-black border shadow-2xs mb-2 ${badgeStyle.pillClass}`}>
                  {currentMention}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 border border-indigo-200 text-indigo-900 mx-auto flex-wrap justify-center">
                  <span>{result.score} de {result.maxScore} {language === 'pt' ? 'Respostas Corretas' : 'Correct Answers'}</span>
                </div>
              </div>

              <div className="text-sm sm:text-base max-w-xl mx-auto text-slate-700 font-medium leading-relaxed space-y-3">
                {wasFirstAttemptOnStart ? (
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 space-y-1.5 text-left">
                    <div className="flex items-center gap-2 font-black text-indigo-900 text-sm sm:text-base">
                      <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                      <span>
                        {language === 'pt'
                          ? '1.ª Tentativa Registada como Avaliação Oficial'
                          : '1st Attempt Recorded as Official Grade'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                      {language === 'pt' ? (
                        <>
                          A tua primeira tentativa foi gravada como a tua nota oficial de avaliação com a menção:{' '}
                          <strong className="font-black text-indigo-900 text-base">{currentMention}</strong>.
                        </>
                      ) : (
                        <>
                          Your first attempt was recorded as your official assessment grade with mention:{' '}
                          <strong className="font-black text-indigo-900 text-base">{currentMention}</strong>.
                        </>
                      )}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-normal pt-1 border-t border-indigo-100/80 mt-1">
                      {language === 'pt'
                        ? '💡 Podes repetir o quiz as vezes que quiseres para treinar e rever a matéria. Podes melhorar o teu resultado de treino, mas a tua nota oficial para a professora será sempre esta 1.ª tentativa.'
                        : '💡 You can retake the quiz as many times as you like to practice and review. You can improve your practice score, but your official grade for the teacher will always be this 1st attempt.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 text-left">
                    {result.percentage > officialScoreToDisplay ? (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1.5">
                        <div className="flex items-center gap-2 font-black text-emerald-900 text-sm sm:text-base">
                          <span className="text-xl">🎉</span>
                          <span>
                            {language === 'pt'
                              ? 'Parabéns! Melhoraste o teu resultado de treino!'
                              : 'Well done! You improved your practice performance!'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                          {language === 'pt'
                            ? `Alcançaste a menção «${currentMention}» nesta tentativa de treino! Bom esforço e dedicação.`
                            : `You achieved the mention "${currentMention}" in this practice attempt! Good effort and dedication.`}
                        </p>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
                        <p className="text-xs sm:text-sm font-semibold text-slate-700">
                          {language === 'pt'
                            ? `Obtiveste a menção «${currentMention}» nesta tentativa de treino.`
                            : `You obtained the mention "${currentMention}" in this practice attempt.`}
                        </p>
                      </div>
                    )}

                    <div className="p-3.5 rounded-2xl bg-indigo-50/90 border border-indigo-200 text-indigo-950 space-y-1">
                      <div className="flex items-center gap-1.5 font-extrabold text-indigo-900 text-xs sm:text-sm">
                        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>
                          {language === 'pt'
                            ? 'Nota Oficial Registada (1.ª Tentativa)'
                            : 'Official Recorded Grade (1st Attempt)'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {language === 'pt' ? (
                          <>
                            A tua nota oficial de avaliação para a professora é a da 1.ª tentativa:{' '}
                            <strong className="text-indigo-950 font-black">{officialMention}</strong>.
                          </>
                        ) : (
                          <>
                            Your official evaluation grade for the teacher is that of the 1st attempt:{' '}
                            <strong className="text-indigo-950 font-black">{officialMention}</strong>.
                          </>
                        )}
                      </p>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-500 font-normal text-center">
                      {language === 'pt'
                        ? 'Podes continuar a treinar para consolidar os teus conhecimentos em TIC.'
                        : 'You can continue practicing to reinforce your ICT knowledge.'}
                    </p>
                  </div>
                )}
              </div>
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
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-2xs transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-indigo-600" />
                <span>{language === 'pt' ? 'Repetir o Quiz (Treino)' : 'Retake Quiz (Practice)'}</span>
              </button>
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
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
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer min-h-[48px] gap-2 ${style}`}
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
                <div className={`mt-3 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm sm:ml-10 space-y-3 ${
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
                                ? `Atenção: esta opção não resolve adequadamente o desafio. A solução correta e recomendada é «${q.options[language][q.correctIndex]}».`
                                : `Note: this choice does not solve the scenario. The correct and recommended choice is "${q.options[language][q.correctIndex]}".`)}
                          </p>
                        </div>
                      )}

                      <div className={`p-3.5 rounded-xl ${isCorrect ? 'bg-white/60 border border-emerald-200' : 'bg-white/80 border border-amber-200'}`}>
                        <p className="font-black text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                          <span>💡</span>
                          <span>{language === 'pt' ? 'Micro-Pista Pedagógica & Conceito-Chave:' : 'Pedagogical Clue & Key Concept:'}</span>
                        </p>
                        <p className="leading-relaxed text-xs sm:text-sm text-slate-700 font-medium">
                          {cleanPedagogicalExplanation(q.explanation[language], isCorrect)}
                        </p>
                      </div>
                    </div>

                    <AudioSpeakButton
                      id={`finalquiz-expl-${q.id}`}
                      text={`${
                        isCorrect
                          ? t.correctAnswer
                          : (language === 'pt' ? 'Resposta incorreta. Atenção à pista pedagógica:' : 'Incorrect answer. Pay attention to the pedagogical clue:')
                      }. ${
                        !isCorrect && userChoice !== undefined && q.optionExplanations?.[language]?.[userChoice]
                          ? q.optionExplanations[language][userChoice] + '. '
                          : ''
                      } ${cleanPedagogicalExplanation(q.explanation[language], isCorrect)}`}
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

      {/* Submit Button or Bottom Review Controls */}
      {!submitted ? (
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
      ) : (
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowResultModal(true)}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>{language === 'pt' ? 'Ver Pop-Up de Resultado 🏆' : 'View Result Modal 🏆'}</span>
          </button>
          <button
            onClick={handleRetry}
            className="px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center gap-2 cursor-pointer shadow-2xs transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-indigo-600" />
            <span>{language === 'pt' ? 'Repetir o Quiz (Treino)' : 'Retake Quiz (Practice)'}</span>
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm cursor-pointer shadow-2xs transition-colors"
          >
            {t.backToTheme}
          </button>
        </div>
      )}
    </div>
  );
};
