import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, Lightbulb, Sparkles, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { PedagogicalModule, Language } from '../types';
import { translations } from '../i18n/translations';

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

  // Quiz state for step 6
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const t = translations[language];

  const steps = [
    { num: 1, title: t.step1Title },
    { num: 2, title: t.step2Title },
    { num: 3, title: t.step3Title },
    { num: 4, title: t.step4Title },
    { num: 5, title: t.step5Title },
  ];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    (module.quizQuestions || []).forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    const maxScore = module.quizQuestions?.length || 1;
    const percentage = Math.round((score / maxScore) * 100);
    return { score, maxScore, percentage };
  };

  const handleSubmitQuiz = () => {
    setSubmittedQuiz(true);
    const { score, maxScore, percentage } = calculateQuizScore();
    onFinishModule(score, maxScore, percentage);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-200">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      {/* Module Title Header */}
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
          {language === 'pt' ? 'Conteúdo' : 'Topic'} {module.number}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
          {module.title[language]}
        </h1>
        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
          {module.shortDesc[language]}
        </p>
      </div>

      {/* Progress Step Pills */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-8">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => setCurrentStep(s.num)}
            className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all border cursor-pointer ${
              currentStep === s.num
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : currentStep > s.num
                ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="block sm:hidden">{s.num}</span>
            <span className="hidden sm:block truncate">Passo {s.num}</span>
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div className="rounded-[2rem] bg-white border border-slate-200 shadow-xs p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
        {/* STEP 1: Explicação direta */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-indigo-700">
              <Lightbulb className="w-6 h-6" />
              <h2 className="text-xl font-bold">{t.step1Title}</h2>
            </div>

            <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
              {(module.explanation?.[language] || []).map((paragraph, idx) => (
                <p key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Exemplo do Quotidiano */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-amber-700">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-xl font-bold">{t.step2Title}</h2>
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
                  💡 {module.example.tip[language]}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Sabias que...? */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-purple-700">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-xl font-bold">{t.step3Title}</h2>
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
            <div className="flex items-center gap-2 text-indigo-700">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-xl font-bold">{t.step4Title}</h2>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-4">
              <p className="text-base sm:text-lg font-bold text-indigo-950">
                {module.thinkAboutIt?.question?.[language]}
              </p>

              {module.thinkAboutIt?.clue?.[language] && (
                <div className="p-3 rounded-xl bg-white border border-indigo-100 text-xs sm:text-sm text-slate-600 font-medium">
                  🔍 <strong>{language === 'pt' ? 'Pista:' : 'Clue:'}</strong> {module.thinkAboutIt.clue[language]}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowReflection(!showReflection)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  {showReflection ? t.hideReflection : t.showReflection}
                </button>

                {showReflection && (
                  <div className="mt-3 p-4 rounded-xl bg-white border border-indigo-200 text-slate-800 text-sm leading-relaxed animate-in fade-in">
                    <p className="font-bold text-indigo-900 mb-1">
                      {language === 'pt' ? 'Reflexão Pedagógica:' : 'Educational Insight:'}
                    </p>
                    <p>{module.thinkAboutIt?.reflection?.[language]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Verifica o que aprendeste (Mini-quiz) */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
                <h2 className="text-xl font-bold">{t.step5Title}</h2>
              </div>
              {submittedQuiz && (
                <button
                  onClick={handleResetQuiz}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.tryAgain}</span>
                </button>
              )}
            </div>

            <p className="text-sm text-slate-600">{t.miniQuizPrompt}</p>

            <div className="space-y-6">
              {(module.quizQuestions || []).map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-bold text-sm sm:text-base text-slate-900">
                        {q.question?.[language]}
                      </p>
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
                      <div className={`mt-3 p-3 rounded-xl text-xs sm:text-sm pl-8 ${
                        isCorrect ? 'bg-emerald-100/70 text-emerald-900' : 'bg-amber-100/70 text-amber-900'
                      }`}>
                        <p className="font-bold mb-0.5">{isCorrect ? t.correctAnswer : t.wrongAnswer}</p>
                        <p>{q.explanation?.[language]}</p>
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

            {/* Quiz Result Card */}
            {submittedQuiz && (
              <div className="p-8 rounded-2xl bg-indigo-950 text-white text-center space-y-3">
                <p className="text-xs uppercase tracking-wider font-semibold text-indigo-200">{t.quizResults}</p>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {calculateQuizScore().score} / {calculateQuizScore().maxScore} ({calculateQuizScore().percentage}%)
                </div>
                <p className="text-sm text-indigo-200 font-medium">
                  {calculateQuizScore().percentage >= 80 ? t.perfectScore : t.keepGoing}
                </p>
                <button
                  onClick={onBack}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {t.backToTheme}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step Navigation Footer (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
            >
              {t.previousStep}
            </button>

            <button
              onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>{t.nextStep}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
