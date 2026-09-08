import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface SafeOrDangerousGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface Scenario {
  id: number;
  text: { pt: string; en: string };
  isSafe: boolean;
  explanation: { pt: string; en: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    text: {
      pt: 'O João recebeu um email a dizer que ganhou um telemóvel e tem de clicar num link.',
      en: 'João received an email claiming he won a smartphone and needs to click a link.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Mensagens que prometem ofertas inesperadas ou prémios fáceis e pedem cliques em ligações são frequentemente tentativas de engano.',
      en: '⚠️ Dangerous! Messages promising unexpected gifts or easy prizes and requesting link clicks are often deceptive attempts.',
    },
  },
  {
    id: 2,
    text: {
      pt: 'A Leonor usa a mesma palavra-passe no email, no jogo e na rede social.',
      en: 'Leonor uses the exact same password across email, gaming, and social media.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Utilizar a mesma palavra-passe em vários serviços aumenta o risco: se uma conta for descoberta, as outras também podem ficar vulneráveis.',
      en: '⚠️ Dangerous! Using the same password across multiple services increases risk: if one account is exposed, others become vulnerable.',
    },
  },
  {
    id: 3,
    text: {
      pt: 'A Maria aceitou um pedido de amizade de alguém que não conhece.',
      en: 'Maria accepted a friend request from someone she does not know.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Adicionar pessoas desconhecidas pode expor as tuas informações pessoais a quem não conheces.',
      en: '⚠️ Dangerous! Adding unknown individuals can expose personal details to people you do not know.',
    },
  },
  {
    id: 4,
    text: {
      pt: 'O Pedro tem o computador sempre atualizado.',
      en: 'Pedro keeps his computer operating system and apps updated.',
    },
    isSafe: true,
    explanation: {
      pt: '✅ Seguro! As atualizações corrigem falhas de segurança conhecidas e ajudam a manter o dispositivo mais protegido.',
      en: '✅ Safe! Updates patch known security flaws and help keep devices protected.',
    },
  },
  {
    id: 5,
    text: {
      pt: 'A Rita descarregou um jogo de um site estranho porque era grátis.',
      en: 'Rita downloaded a game from an unknown strange website because it was free.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Descarregar ficheiros de páginas desconhecidas pode instalar programas prejudiciais no dispositivo.',
      en: '⚠️ Dangerous! Downloading files from unknown pages can install harmful programs on the device.',
    },
  },
  {
    id: 6,
    text: {
      pt: 'O Tiago usa uma palavra-passe com o seu nome e ano de nascimento.',
      en: 'Tiago uses a password containing his own name and birth year.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Informações pessoais conhecidas ou fáceis de adivinhar tornam uma palavra-passe mais fraca.',
      en: '⚠️ Dangerous! Known or easily guessable personal information weakens password security.',
    },
  },
];

export const SafeOrDangerousGame: React.FC<SafeOrDangerousGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const t = translations[language];
  const currentScenario = SCENARIOS[currentIndex];

  const handleChoice = (choiceIsSafe: boolean) => {
    if (feedback !== null) return;

    const isCorrect = choiceIsSafe === currentScenario.isSafe;
    setUserAnswers((prev) => ({ ...prev, [currentScenario.id]: isCorrect }));
    setFeedback(isCorrect);
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex + 1 < SCENARIOS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameOver(true);
      const correctCount = Object.values(userAnswers).filter(Boolean).length;
      const percentage = Math.round((correctCount / SCENARIOS.length) * 100);
      onFinish(correctCount, SCENARIOS.length, percentage);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setFeedback(null);
    setGameOver(false);
  };

  const correctCount = Object.values(userAnswers).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 1' : 'Challenge 1'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {language === 'pt' ? '🎯 Seguro ou Perigoso?' : '🎯 Safe or Dangerous?'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {language === 'pt'
            ? 'Analisa a situação com atenção e decide se é uma prática segura ou um comportamento de risco.'
            : 'Carefully evaluate the scenario and determine whether it is a safe practice or a risky behavior.'}
        </p>
      </div>

      {!gameOver ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
            <span>
              {language === 'pt' ? `Situação ${currentIndex + 1} de ${SCENARIOS.length}` : `Scenario ${currentIndex + 1} of ${SCENARIOS.length}`}
            </span>
            <span>
              {language === 'pt' ? `Acertos: ${correctCount}` : `Correct: ${correctCount}`}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 min-h-[120px] flex items-center justify-center text-center">
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed max-w-xl">
              "{currentScenario.text[language]}"
            </p>
          </div>

          {/* Action Buttons */}
          {feedback === null ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleChoice(true)}
                className="py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{language === 'pt' ? '✅ Seguro' : '✅ Safe'}</span>
              </button>

              <button
                onClick={() => handleChoice(false)}
                className="py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-base transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>{language === 'pt' ? '⚠️ Perigoso' : '⚠️ Dangerous'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className={`p-4 rounded-2xl ${
                feedback ? 'bg-emerald-100/80 text-emerald-900' : 'bg-rose-100/80 text-rose-900'
              }`}>
                <p className="font-extrabold text-sm sm:text-base">
                  {feedback
                    ? (language === 'pt' ? '🎉 Parabéns! Acertaste na previsão.' : '🎉 Great job! Correct decision.')
                    : (language === 'pt' ? '⚠️ Atenção: A resposta correta era diferente.' : '⚠️ Caution: The safe choice was different.')}
                </p>
                <p className="mt-1 text-xs sm:text-sm">{currentScenario.explanation[language]}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                {currentIndex + 1 < SCENARIOS.length
                  ? (language === 'pt' ? 'Próxima Situação →' : 'Next Scenario →')
                  : (language === 'pt' ? 'Ver Resultado Final 🏆' : 'View Final Result 🏆')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm text-center space-y-4 animate-in zoom-in-95">
          <div className="text-5xl">🏆</div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {language === 'pt' ? 'Desafio Concluído!' : 'Challenge Completed!'}
          </h2>
          <p className="text-base text-slate-600">
            {language === 'pt'
              ? `Acertaste em ${correctCount} de ${SCENARIOS.length} situações (${Math.round((correctCount / SCENARIOS.length) * 100)}%).`
              : `You got ${correctCount} out of ${SCENARIOS.length} scenarios right (${Math.round((correctCount / SCENARIOS.length) * 100)}%).`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm cursor-pointer"
            >
              {t.backToTheme}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
