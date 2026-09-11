import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import ticHeroImg from '../assets/images/tic_society_hero_1788476514973.jpg';

interface TicProsConsExplorerProps {
  language: Language;
}

export const TicProsConsExplorer: React.FC<TicProsConsExplorerProps> = ({ language }) => {
  const [gameIndex, setGameIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'pro' | 'con' | null>(null);
  const [gameScore, setGameScore] = useState(0);

  const gameQuestions = [
    {
      text: {
        pt: 'Fazer uma videochamada com os avós que moram longe.',
        en: 'Video calling grandparents who live far away.',
      },
      type: 'pro',
      icon: '💬',
      reason: {
        pt: '🌟 Vantagem: Comunicação fácil e rápida!',
        en: '🌟 Advantage: Fast and easy communication!',
      },
    },
    {
      text: {
        pt: 'Jogar no telemóvel até tarde e não conseguir dormir.',
        en: 'Playing phone games late and having trouble sleeping.',
      },
      type: 'con',
      icon: '⏳',
      reason: {
        pt: '⚠️ Desafio: Demasiado tempo de ecrã faz mal à saúde!',
        en: '⚠️ Challenge: Too much screen time harms your health!',
      },
    },
    {
      text: {
        pt: 'Ver um vídeo de Ciências para aprender sobre vulcões.',
        en: 'Watching a science video to learn about volcanoes.',
      },
      type: 'pro',
      icon: '📚',
      reason: {
        pt: '🌟 Vantagem: Ajuda a aprender matérias da escola!',
        en: '🌟 Advantage: Helps you learn school subjects!',
      },
    },
    {
      text: {
        pt: 'Acreditar numa notícia falsa sem perguntar ao professor.',
        en: 'Believing a fake online rumor without asking a teacher.',
      },
      type: 'con',
      icon: '🔍',
      reason: {
        pt: '⚠️ Desafio: Nem tudo na Internet é verdade; confirma sempre!',
        en: '⚠️ Challenge: Not all online info is true; always verify!',
      },
    },
  ];

  const currentQ = gameQuestions[gameIndex];

  const handleAnswer = (ans: 'pro' | 'con') => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(ans);
    if (ans === currentQ.type) {
      setGameScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (gameIndex < gameQuestions.length - 1) {
      setGameIndex((prev) => prev + 1);
    } else {
      setGameIndex(0);
      setGameScore(0);
    }
  };

  return (
    <div className="mt-4 p-4 sm:p-5 bg-linear-to-br from-indigo-50/70 via-white to-sky-50/70 rounded-3xl border border-indigo-100 shadow-sm space-y-4">
      {/* Visual Header with Image */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/90 p-3.5 sm:p-4 rounded-2xl border border-indigo-100/80">
        <img
          src={ticHeroImg}
          alt="TIC: Crianças a aprender"
          className="w-full sm:w-28 h-24 sm:h-20 object-cover rounded-xl border border-indigo-100 shrink-0"
        />
        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
            🎮 {language === 'pt' ? 'Mini-Desafio Rápido' : 'Quick Mini-Game'}
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {language === 'pt' ? 'É uma Vantagem ou um Desafio?' : 'Is it an Advantage or a Challenge?'}
          </h3>
          <p className="text-xs text-slate-600">
            {language === 'pt'
              ? 'Lê a frase e clica no botão certo. Só precisas de 1 minuto!'
              : 'Read the sentence and pick the right button in just 1 minute!'}
          </p>
        </div>
      </div>

      {/* Mini-Game Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
        {/* Question Counter & Score */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            {language === 'pt'
              ? `Pergunta ${gameIndex + 1} de ${gameQuestions.length}`
              : `Question ${gameIndex + 1} of ${gameQuestions.length}`}
          </span>
          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-black">
            ⭐ {language === 'pt' ? `Pontos: ${gameScore}` : `Score: ${gameScore}`}
          </span>
        </div>

        {/* Question Item */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
          <span className="text-3xl block">{currentQ.icon}</span>
          <p className="text-sm sm:text-base font-black text-slate-900">
            "{currentQ.text[language]}"
          </p>
        </div>

        {/* Answer Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleAnswer('pro')}
            disabled={selectedAnswer !== null}
            className={`p-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
              selectedAnswer === null
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                : selectedAnswer === 'pro'
                ? currentQ.type === 'pro'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-red-500 text-white border-red-500'
                : currentQ.type === 'pro'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'opacity-40 border-slate-200 text-slate-400'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{language === 'pt' ? '🌟 VANTAGEM' : '🌟 ADVANTAGE'}</span>
          </button>

          <button
            onClick={() => handleAnswer('con')}
            disabled={selectedAnswer !== null}
            className={`p-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
              selectedAnswer === null
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-600 hover:text-white hover:border-amber-600'
                : selectedAnswer === 'con'
                ? currentQ.type === 'con'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-red-500 text-white border-red-500'
                : currentQ.type === 'con'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'opacity-40 border-slate-200 text-slate-400'
            }`}
          >
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{language === 'pt' ? '⚠️ DESAFIO' : '⚠️ CHALLENGE'}</span>
          </button>
        </div>

        {/* Feedback Banner */}
        {selectedAnswer !== null && (
          <div
            className={`p-3.5 rounded-xl border-2 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200 ${
              selectedAnswer === currentQ.type
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-950 border-amber-300'
            }`}
          >
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>{selectedAnswer === currentQ.type ? '🎉 Boa!' : '💡 Atenção:'}</span>
              <span>{currentQ.reason[language]}</span>
            </div>

            <button
              onClick={nextQuestion}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-xs shrink-0 cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>
                {gameIndex < gameQuestions.length - 1
                  ? language === 'pt'
                    ? 'Seguinte'
                    : 'Next'
                  : language === 'pt'
                  ? 'Recomeçar'
                  : 'Restart'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
