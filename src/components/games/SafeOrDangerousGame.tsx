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
      pt: 'Ligar o telemóvel à rede Wi-Fi gratuita do café para verificar a conta bancária da família ou introduzir palavras-passe importantes.',
      en: 'Connecting your phone to a free cafe Wi-Fi network to check family bank accounts or enter important passwords.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Redes Wi-Fi públicas sem palavra-passe podem ser intercetadas por terceiros. Nunca realizes operações confidenciais numa rede aberta.',
      en: '⚠️ Dangerous! Public open Wi-Fi can be intercepted by hackers. Never perform sensitive activities on an open network.',
    },
  },
  {
    id: 2,
    text: {
      pt: 'Criar uma palavra-passe misturando letras maiúsculas, minúsculas, números e um símbolo (ex: "Gato#Verde_2026!").',
      en: 'Creating a password mixing uppercase, lowercase, numbers, and symbols (e.g. "Green#Cat_2026!").',
    },
    isSafe: true,
    explanation: {
      pt: '✅ Seguro! Uma palavra-passe longa e com tipos de caracteres variados é extremamente difícil de adivinhar ou quebrar.',
      en: '✅ Safe! A long password with diverse character types is exceptionally hard to guess or brute-force.',
    },
  },
  {
    id: 3,
    text: {
      pt: 'Publicar nas redes sociais uma fotografia do teu primeiro dia de aulas onde se vê claramente a morada e o logótipo da tua escola.',
      en: 'Posting a photo of your first day of school showing your home address and school uniform badge clearly.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Esta informação revela onde estás e onde estudas todos os dias. Dados de localização pessoal devem ser mantidos privados.',
      en: '⚠️ Dangerous! This exposes your location and daily routine. Personal location details must always remain private.',
    },
  },
  {
    id: 4,
    text: {
      pt: 'Antes de iniciar sessão na plataforma escolar, verificar o endereço completo (URL), confirmar que é o domínio oficial da escola e verificar a ligação HTTPS protegida.',
      en: 'Before logging into your school platform, verifying the full web address (URL), confirming it is the official school domain, and verifying the secure HTTPS connection.',
    },
    isSafe: true,
    explanation: {
      pt: '✅ Atitude Segura e Prudente! Verificar o endereço completo, o domínio oficial e o HTTPS em conjunto garante que estás no site verdadeiro. Lembra-te: o HTTPS cifra a comunicação, mas não prova por si só que o site é legítimo (sites falsos de phishing também podem ter HTTPS)!',
      en: '✅ Safe and Prudent! Checking the full URL, official domain, and HTTPS together ensures you are on the legitimate site. Remember: HTTPS encrypts data transmission, but does not prove on its own that a site is authentic (phishing sites can also use HTTPS)!',
    },
  },
  {
    id: 5,
    text: {
      pt: 'Um jogador desconhecido num jogo online pede para falar contigo no WhatsApp e oferece 1000 moedas virtuais em troca de uma fotografia tua.',
      en: 'An unknown gamer in an online game asks to chat on WhatsApp and offers 1,000 game coins in exchange for a photo of you.',
    },
    isSafe: false,
    explanation: {
      pt: '⚠️ Perigoso! Nunca partilhes fotografias nem te mudes para aplicações privadas com estranhos. Recusa, bloqueia e avisa um adulto de confiança.',
      en: '⚠️ Dangerous! Never send photos or move to private messaging apps with strangers. Block them and tell an adult immediately.',
    },
  },
  {
    id: 6,
    text: {
      pt: 'Indicar a fonte e o nome do autor de uma imagem que encontraste na Internet ao colocá-la no trabalho escolar de TIC.',
      en: 'Crediting the author and source URL of an image found online when using it in an ICT school project.',
    },
    isSafe: true,
    explanation: {
      pt: '✅ Seguro e exemplar! Respeitas os direitos de autor, evitas o plágio e demonstras honestidade intelectual.',
      en: '✅ Safe and exemplary! You respect copyright, prevent plagiarism, and uphold academic integrity.',
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
