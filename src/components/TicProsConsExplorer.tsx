import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface TicProsConsExplorerProps {
  language: Language;
}

export const TicProsConsExplorer: React.FC<TicProsConsExplorerProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'pros' | 'cons' | 'game'>('pros');
  const [gameIndex, setGameIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'pro' | 'con' | null>(null);
  const [gameScore, setGameScore] = useState(0);

  const gameQuestions = [
    {
      text: {
        pt: 'Fazer uma videochamada gratuita com os teus avós que vivem longe para lhes mostrar o teu desenho.',
        en: 'Making a free video call to grandparents living far away to show them your drawing.',
      },
      type: 'pro',
      reason: {
        pt: '🌟 Vantagem: Facilita a comunicação instantânea com quem mais gostamos!',
        en: '🌟 Advantage: Makes instant communication easy with loved ones!',
      },
    },
    {
      text: {
        pt: 'Ficar até à 1h da manhã a ver vídeos curtos e acordar sem energia para a aula de Educação Física.',
        en: 'Staying up until 1 AM watching short videos and waking up exhausted for PE class.',
      },
      type: 'con',
      reason: {
        pt: '⚠️ Desafio: Passar demasiado tempo em frente ao ecrã prejudica o sono e a saúde!',
        en: '⚠️ Challenge: Too much screen time hurts sleep quality and health!',
      },
    },
    {
      text: {
        pt: 'Pesquisar na Internet e ver um documentário em vídeo para aprender como funciona o sistema solar.',
        en: 'Searching the web and watching a video documentary to learn how the solar system works.',
      },
      type: 'pro',
      reason: {
        pt: '🌟 Vantagem: Ajuda a aprender conteúdos novos e curiosidades para a escola!',
        en: '🌟 Advantage: Helps you learn new topics and school curiosities!',
      },
    },
    {
      text: {
        pt: 'Acreditar num vídeo no chat que diz que comer chocolate antes do teste dá nota máxima sem estudar.',
        en: 'Believing a random chat video claiming eating chocolate gives top test grades without studying.',
      },
      type: 'con',
      reason: {
        pt: '⚠️ Desafio: Nem toda a informação online é correta! Deves sempre confirmar fontes seguras.',
        en: '⚠️ Challenge: Not all online info is accurate! Always check reliable sources.',
      },
    },
    {
      text: {
        pt: 'Estar a fazer o trabalho de casa e parar de 5 em 5 minutos por causa dos avisos de um jogo.',
        en: 'Doing homework and pausing every 5 minutes because of game notifications.',
      },
      type: 'con',
      reason: {
        pt: '⚠️ Desafio: As notificações podem distrair e fazer-te perder o foco dos estudos!',
        en: '⚠️ Challenge: Notifications can distract and ruin study focus!',
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
    <div className="mt-4 p-5 sm:p-6 bg-linear-to-br from-indigo-50/80 via-white to-sky-50/80 rounded-2xl border border-indigo-200/80 shadow-xs space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white tracking-wide uppercase">
            ⚖️ {language === 'pt' ? 'Laboratório Interativo' : 'Interactive Lab'}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            {language === 'pt'
              ? 'Explorador: Vantagens vs Desafios das TIC'
              : 'Explorer: ICT Advantages vs Challenges'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {language === 'pt'
              ? 'Clica nas abas para explorar cada ponto ou joga o mini-desafio para testares a tua sabedoria!'
              : 'Click tabs to explore each point or play the mini-game to test your knowledge!'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            onClick={() => setActiveTab('pros')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              activeTab === 'pros'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-emerald-700'
            }`}
          >
            🌟 {language === 'pt' ? 'Vantagens' : 'Advantages'}
          </button>
          <button
            onClick={() => setActiveTab('cons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              activeTab === 'cons'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-amber-700'
            }`}
          >
            ⚠️ {language === 'pt' ? 'Desafios' : 'Challenges'}
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              activeTab === 'game'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-indigo-700'
            }`}
          >
            🎮 {language === 'pt' ? 'Mini-Jogo' : 'Mini-Game'}
          </button>
        </div>
      </div>

      {/* Tab Content: PROS */}
      {activeTab === 'pros' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
          <div className="p-4 bg-emerald-50/90 rounded-2xl border-2 border-emerald-200/90 space-y-2 hover:border-emerald-300 transition-all">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
                💬
              </span>
              <div>
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                  {language === 'pt' ? 'Vantagem 1' : 'Advantage 1'}
                </span>
                <h4 className="text-sm sm:text-base font-black text-emerald-950">
                  {language === 'pt' ? 'Facilita a comunicação' : 'Facilitates communication'}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {language === 'pt'
                ? 'Permite falar instantaneamente com familiares e amigos que estão longe por videochamada, enviar mensagens de apoio ou partilhar dúvidas sobre os trabalhos escolares com colegas num segundo!'
                : 'Allows instant video calls and messages with distant friends and family, sharing ideas and asking homework questions in seconds!'}
            </p>
            <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-900">
              <span>💡</span>
              <span>{language === 'pt' ? 'Exemplo: Videochamadas com os avós!' : 'Example: Video calls with grandparents!'}</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/90 rounded-2xl border-2 border-emerald-200/90 space-y-2 hover:border-emerald-300 transition-all">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
                📚
              </span>
              <div>
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                  {language === 'pt' ? 'Vantagem 2' : 'Advantage 2'}
                </span>
                <h4 className="text-sm sm:text-base font-black text-emerald-950">
                  {language === 'pt' ? 'Ajuda a aprender' : 'Helps you learn'}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {language === 'pt'
                ? 'A Internet funciona como uma biblioteca gigante aberta 24h! Podes ver vídeos de experiências de Ciências, simulações do espaço, tutoriais de desenho e praticar matemática e inglês com jogos educativos.'
                : 'The Internet works like a 24/7 giant library! Watch science experiments, space simulations, drawing guides, and practice subjects with learning games.'}
            </p>
            <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-900">
              <span>💡</span>
              <span>{language === 'pt' ? 'Exemplo: Pesquisar para um projeto de História!' : 'Example: Researching a History project!'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: CONS */}
      {activeTab === 'cons' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          <div className="p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-200/90 space-y-2 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
                🎯
              </span>
              <div>
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">
                  {language === 'pt' ? 'Desafio 1' : 'Challenge 1'}
                </span>
                <h4 className="text-sm sm:text-base font-black text-amber-950">
                  {language === 'pt' ? 'Pode distrair' : 'Can distract you'}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {language === 'pt'
                ? 'Notificações a apitar e jogos divertidos podem desviar o teu foco dos estudos, fazendo-te demorar o dobro do tempo nos trabalhos de casa.'
                : 'Beeping notifications and fun games can steal study focus, making homework take twice as long.'}
            </p>
            <div className="pt-2 border-t border-amber-200/60 text-[11px] font-bold text-amber-900">
              🛡️ {language === 'pt' ? 'Dica: Desliga avisos ao estudar!' : 'Tip: Turn off alerts while studying!'}
            </div>
          </div>

          <div className="p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-200/90 space-y-2 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
                ⏳
              </span>
              <div>
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">
                  {language === 'pt' ? 'Desafio 2' : 'Challenge 2'}
                </span>
                <h4 className="text-sm sm:text-base font-black text-amber-950">
                  {language === 'pt' ? 'Demasiado tempo de ecrã' : 'Too much screen time'}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {language === 'pt'
                ? 'Ficar horas a fio em frente ao ecrã cansa a visão, dá dores de cabeça e nas costas, e tira tempo precioso para brincar ao ar livre e conviver.'
                : 'Sitting for hours in front of screens strains eyes, causes posture pain, and reduces outdoor sports and family time.'}
            </p>
            <div className="pt-2 border-t border-amber-200/60 text-[11px] font-bold text-amber-900">
              🏃 {language === 'pt' ? 'Dica: Faz pausas a cada 30 min!' : 'Tip: Take breaks every 30 min!'}
            </div>
          </div>

          <div className="p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-200/90 space-y-2 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
                🔍
              </span>
              <div>
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">
                  {language === 'pt' ? 'Desafio 3' : 'Challenge 3'}
                </span>
                <h4 className="text-sm sm:text-base font-black text-amber-950">
                  {language === 'pt' ? 'Informação incorreta' : 'Inaccurate information'}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {language === 'pt'
                ? 'Nem tudo o que está na Internet é verdade! Existem notícias falsas (fake news) e erros. Deves sempre confirmar com professores ou livros de confiança.'
                : 'Not everything online is true! Fake news and rumors exist. Always verify with teachers, parents, or verified books.'}
            </p>
            <div className="pt-2 border-t border-amber-200/60 text-[11px] font-bold text-amber-900">
              📚 {language === 'pt' ? 'Dica: Compara sempre 2 fontes!' : 'Tip: Always check 2 sources!'}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: GAME */}
      {activeTab === 'game' && (
        <div className="p-5 bg-white rounded-2xl border-2 border-indigo-200 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              {language === 'pt'
                ? `Cenário ${gameIndex + 1} de ${gameQuestions.length}`
                : `Scenario ${gameIndex + 1} of ${gameQuestions.length}`}
            </span>
            <span className="text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              ⭐ {language === 'pt' ? `Pontos: ${gameScore * 20}` : `Score: ${gameScore * 20}`}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              {currentQ.text[language]}
            </p>
          </div>

          {/* Action Choice Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswer('pro')}
              className={`p-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedAnswer === null
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs hover:scale-[1.02] active:scale-95'
                  : currentQ.type === 'pro'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                  : selectedAnswer === 'pro'
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <span>🌟</span>
              <span>{language === 'pt' ? 'É uma Vantagem' : 'It is an Advantage'}</span>
            </button>

            <button
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswer('con')}
              className={`p-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedAnswer === null
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs hover:scale-[1.02] active:scale-95'
                  : currentQ.type === 'con'
                  ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                  : selectedAnswer === 'con'
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <span>⚠️</span>
              <span>{language === 'pt' ? 'É um Desafio' : 'It is a Challenge'}</span>
            </button>
          </div>

          {/* Feedback & Explanation */}
          {selectedAnswer !== null && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 animate-in fade-in duration-150 ${
                selectedAnswer === currentQ.type
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <span className="text-xl">
                {selectedAnswer === currentQ.type ? '🎉' : '💡'}
              </span>
              <div className="flex-1 text-xs sm:text-sm">
                <p className="font-black">
                  {selectedAnswer === currentQ.type
                    ? language === 'pt'
                      ? 'Muito bem! Resposta certíssima!'
                      : 'Great job! Correct answer!'
                    : language === 'pt'
                    ? 'Atenção ao detalhe!'
                    : 'Watch out for details!'}
                </p>
                <p className="mt-0.5">{currentQ.reason[language]}</p>
                <button
                  onClick={nextQuestion}
                  className="mt-2.5 px-3 py-1.5 rounded-lg text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>
                    {gameIndex < gameQuestions.length - 1
                      ? language === 'pt'
                        ? 'Próximo Cenário'
                        : 'Next Scenario'
                      : language === 'pt'
                      ? 'Jogar Novamente'
                      : 'Play Again'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
