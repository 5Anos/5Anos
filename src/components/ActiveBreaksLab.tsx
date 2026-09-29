import React, { useState, useEffect } from 'react';
import { Clock, Eye, Activity, Play, RotateCcw, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import activeBreaksImg from '../assets/images/active_breaks_posture_3d_1788539976910.jpg';
import confetti from 'canvas-confetti';

interface Props {
  language?: 'pt' | 'en';
}

export const ActiveBreaksLab: React.FC<Props> = ({ language = 'pt' }) => {
  // Timer state for the 20-20-20 rule
  const [secondsLeft, setSecondsLeft] = useState<number>(20);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedTimer, setCompletedTimer] = useState<boolean>(false);

  // Completed stretches tracker
  const [completedStretches, setCompletedStretches] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setCompletedTimer(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // safe fallback
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  const toggleStretch = (id: string) => {
    setCompletedStretches((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const stretchesList = [
    {
      id: 'pescoco',
      icon: '🧘',
      title: language === 'pt' ? 'Alongamento do Pescoço' : 'Neck Stretch',
      desc: language === 'pt'
        ? 'Roda suavemente a cabeça para a esquerda e para a direita, sem movimentos bruscos.'
        : 'Gently turn your head left and right, avoiding sudden movements.',
    },
    {
      id: 'ombros',
      icon: '🔄',
      title: language === 'pt' ? 'Rotação dos Ombros' : 'Shoulder Rolls',
      desc: language === 'pt'
        ? 'Roda os ombros para trás 5 vezes e para a frente 5 vezes para aliviar a tensão.'
        : 'Roll shoulders back 5 times and forward 5 times to release tension.',
    },
    {
      id: 'pulsos',
      icon: '✋',
      title: language === 'pt' ? 'Descanso dos Pulsos' : 'Wrist Stretch',
      desc: language === 'pt'
        ? 'Estica os braços e movimenta os pulsos suavemente para cima e para baixo.'
        : 'Extend arms and gently bend wrists up and down.',
    },
    {
      id: 'levantar',
      icon: '🚶',
      title: language === 'pt' ? 'Levantar e Beber Água' : 'Stand Up & Hydrate',
      desc: language === 'pt'
        ? 'Levanta-te da cadeira, dá alguns passos pela sala e bebe um copo de água fresca.'
        : 'Stand up from your chair, walk around the room, and drink a glass of fresh water.',
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-indigo-200/90 shadow-lg overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-xl shrink-0">
            ⏱️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                {language === 'pt' ? 'Laboratório: Pausas Ativas e Regra 20-20-20' : 'Active Breaks & 20-20-20 Lab'}
              </h3>
              <span className="bg-indigo-400/30 text-indigo-100 text-xs px-2.5 py-0.5 rounded-full font-bold border border-indigo-300/40">
                {language === 'pt' ? 'Descanso Físico & Visual' : 'Physical & Visual Rest'}
              </span>
            </div>
            <p className="text-xs text-indigo-100/90 font-medium">
              {language === 'pt'
                ? 'Aprende a descansar o corpo e os olhos para estudar com mais foco e energia!'
                : 'Learn how to rest your body and eyes to study with more focus and energy!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-indigo-950/40 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-indigo-400/30 text-xs font-bold text-indigo-200">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>{language === 'pt' ? 'Saúde & Bem-Estar' : 'Health & Wellbeing'}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Distinction Cards: Pausa Ativa vs Regra 20-20-20 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Pausas Ativas Corporais */}
          <div className="bg-gradient-to-br from-indigo-50/90 to-slate-50 rounded-2xl p-4 sm:p-5 border-2 border-indigo-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{language === 'pt' ? 'A cada 45 a 60 minutos' : 'Every 45 to 60 minutes'}</span>
                </span>
                <span className="text-xl">🏃</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'pt' ? 'Pausas Ativas (Corpo & Músculos)' : 'Active Breaks (Body & Muscles)'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {language === 'pt'
                  ? 'Ficar sentado muito tempo deixa os músculos tensos e reduz a circulação. Uma pausa ativa de 3 a 5 minutos relaxa a coluna e devolve a energia.'
                  : 'Sitting too long causes muscle stiffness. An active break of 3 to 5 minutes relieves back strain and restores energy.'}
              </p>
            </div>

            {/* Poster thumbnail */}
            <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-indigo-200 shadow-inner group relative">
              <img
                src={activeBreaksImg}
                alt="Pausas Ativas e Alongamentos"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-2 text-white text-[11px] font-bold">
                🏃 Alongar braços, rodar ombros e caminhar
              </div>
            </div>
          </div>

          {/* Card 2: Descanso Visual - Regra 20-20-20 */}
          <div className="bg-gradient-to-br from-purple-50/90 to-slate-50 rounded-2xl p-4 sm:p-5 border-2 border-purple-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-extrabold text-xs flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-purple-600" />
                  <span>{language === 'pt' ? 'A cada 20 minutos' : 'Every 20 minutes'}</span>
                </span>
                <span className="text-xl">👀</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'pt' ? 'Descanso Visual (Regra 20-20-20)' : 'Visual Rest (20-20-20 Rule)'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {language === 'pt'
                  ? 'A cada 20 minutos de ecrã, desvia o olhar e foca um objeto a cerca de 6 metros (20 pés) de distância durante 20 segundos.'
                  : 'Every 20 minutes of screen time, look away at an object about 6 meters (20 feet) away for 20 seconds.'}
              </p>
            </div>

            {/* Interactive Timer Box */}
            <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-inner flex flex-col items-center justify-center space-y-3 text-center">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900">
                {language === 'pt' ? 'Experimenta Agora a Regra 20-20-20' : 'Try the 20-20-20 Rule Now'}
              </span>

              <div className="flex items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black transition-all ${
                  isTimerRunning ? 'bg-purple-600 text-white animate-pulse shadow-md' : completedTimer ? 'bg-emerald-500 text-white' : 'bg-purple-100 text-purple-900'
                }`}>
                  {secondsLeft}s
                </div>
                <div className="text-left space-y-1">
                  <p className="text-xs font-bold text-slate-800">
                    {isTimerRunning
                      ? (language === 'pt' ? '👀 Olha pela janela ou para longe!' : '👀 Look out a window or far away!')
                      : completedTimer
                      ? (language === 'pt' ? '✓ Visão relaxada com sucesso!' : '✓ Eyes rested successfully!')
                      : (language === 'pt' ? 'Carrega em Iniciar para 20s de descanso' : 'Press Start for 20s rest')}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {language === 'pt' ? 'Relaxa os músculos do foco ocular.' : 'Relaxes the eye focusing muscles.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {!isTimerRunning ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSecondsLeft(20);
                      setCompletedTimer(false);
                      setIsTimerRunning(true);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'Iniciar 20 Segundos' : 'Start 20 Seconds'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
                  >
                    {language === 'pt' ? 'Pausar' : 'Pause'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setSecondsLeft(20);
                    setCompletedTimer(false);
                  }}
                  className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Guided Quick Stretches Checklist */}
        <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === 'pt' ? '4 Exercícios Simples de Pausa Ativa (Faz Agora!)' : '4 Easy Active Break Exercises'}</span>
            </h4>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              {Object.values(completedStretches).filter(Boolean).length}/4 {language === 'pt' ? 'Feitos' : 'Done'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stretchesList.map((s) => {
              const isDone = !!completedStretches[s.id];
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleStretch(s.id)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1 bg-slate-50 rounded-lg">{s.icon}</span>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{s.title}</span>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              {language === 'pt'
                ? 'Dica de ouro: Mudar de posição regularmente e beber água mantém o teu cérebro ativo e hidratado!'
                : 'Golden tip: Changing posture often and drinking water keeps your brain sharp and hydrated!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
