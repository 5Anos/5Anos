import React, { useState, useEffect } from 'react';
import { Timer, Eye, RotateCcw, Play, Pause, Sparkles, CheckCircle2 } from 'lucide-react';

export const ErgonomicsBreakTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(20);
  const [isActive, setIsActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      setCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStart = () => {
    setCompleted(false);
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(20);
    setCompleted(false);
  };

  return (
    <div className="w-full bg-gradient-to-b from-emerald-50/80 to-slate-50 rounded-2xl border-2 border-emerald-200 shadow-md p-3.5 sm:p-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-emerald-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-sm">
            <Timer className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wide">
            Regra 20-20-20 & Pausa Ativa
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
          Exercício Prático
        </span>
      </div>

      <div className="bg-white rounded-xl p-3 border border-emerald-100 shadow-xs mb-3 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-900">
          <Eye className="w-4 h-4 text-emerald-600" />
          <span>A cada 20 min, olha para longe a 6 metros durante 20 seg!</span>
        </div>

        {/* Big Circular Counter */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="text-3xl font-black font-mono text-emerald-700">
            {seconds}s
          </div>
        </div>

        <p className="text-[11px] text-slate-600 leading-tight">
          {completed ? (
            <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Excelente pausa! Os teus olhos estão descansados!
            </span>
          ) : isActive ? (
            '👀 Olha agora pela janela ou para o ponto mais distante da sala...'
          ) : (
            'Clica em Iniciar para fazeres a tua pausa ocular de 20 segundos.'
          )}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-transform"
            >
              <Play className="w-3.5 h-3.5" /> Iniciar Pausa
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Pause className="w-3.5 h-3.5" /> Pausar
            </button>
          )}
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            title="Reiniciar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mini Exercises Guide */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-medium text-slate-700 bg-emerald-100/50 p-2.5 rounded-xl border border-emerald-200">
        <div className="flex items-center gap-1.5">
          <span>🔄</span>
          <span>Rolar os ombros para trás 5x</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>🙆</span>
          <span>Esticar os braços e pulsar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>🧘</span>
          <span>Endireitar a coluna na cadeira</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>💧</span>
          <span>Beber um golo de água</span>
        </div>
      </div>
    </div>
  );
};
