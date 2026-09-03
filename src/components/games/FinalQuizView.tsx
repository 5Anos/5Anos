import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Award, Sparkles } from 'lucide-react';
import { QuizQuestion, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface FinalQuizViewProps {
  themeTitle: string;
  themeNumber: number;
  questions: QuizQuestion[];
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const FinalQuizView: React.FC<FinalQuizViewProps> = ({
  themeTitle,
  themeNumber,
  questions,
  language,
  onBack,
  onFinish,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const t = translations[language];

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    const maxScore = questions.length;
    const percentage = Math.round((score / maxScore) * 100);
    return { score, maxScore, percentage };
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const { score, maxScore, percentage } = calculateScore();
    onFinish(score * 5, maxScore * 5, percentage);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
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
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
            <Award className="w-4 h-4" />
            <span>Tema {themeNumber} — {language === 'pt' ? 'Avaliação Global' : 'Global Evaluation'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {language === 'pt' ? `🏆 Quiz Global: ${themeTitle}` : `🏆 Global Quiz: ${themeTitle}`}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-indigo-200 max-w-2xl leading-relaxed">
            {language === 'pt'
              ? 'Testa todos os conhecimentos adquiridos ao longo dos conteúdos e desafios deste tema.'
              : 'Test all knowledge acquired throughout the learning topics and challenges of this theme.'}
          </p>
        </div>

        {/* Ambient geometric blur */}
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Results banner if submitted */}
      {submitted && (
        <div className="rounded-[2rem] bg-white border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 text-center space-y-3 animate-in zoom-in-95">
          <div className="text-5xl mb-2">{result.percentage >= 80 ? '🌟' : '📚'}</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {result.score} de {result.maxScore} Corretas ({result.percentage}%)
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {result.percentage === 100
              ? (language === 'pt' ? 'Espetacular! Nota máxima alcançada sem qualquer erro!' : 'Spectacular! Perfect score achieved!')
              : result.percentage >= 70
              ? (language === 'pt' ? 'Muito bom resultado! Quase tudo perfeito.' : 'Very good score! Almost perfect.')
              : (language === 'pt' ? 'Bom esforço! Podes rever as explicações abaixo e tentar de novo.' : 'Good effort! Review explanations below and retry.')}
          </p>

          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={handleRetry}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
            >
              {t.backToTheme}
            </button>
          </div>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div key={q.id} className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200/60">
                  {idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {q.question[language]}
                </h3>
              </div>

              <div className="space-y-2.5 pl-10">
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
                <div className={`mt-3 p-4 rounded-xl text-xs sm:text-sm pl-10 ${
                  isCorrect ? 'bg-emerald-100/70 text-emerald-950' : 'bg-amber-100/70 text-amber-950'
                }`}>
                  <p className="font-bold mb-0.5">{isCorrect ? t.correctAnswer : t.wrongAnswer}</p>
                  <p className="leading-relaxed">{q.explanation[language]}</p>
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
