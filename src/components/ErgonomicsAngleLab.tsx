import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface ErgonomicsAngleLabProps {
  language?: Language;
}

export const ErgonomicsAngleLab: React.FC<ErgonomicsAngleLabProps> = ({ language = 'pt' }) => {
  const [backAngle, setBackAngle] = useState<'slouched' | 'straight'>('straight');
  const [armAngle, setArmAngle] = useState<'extended' | 'right90'>('right90');
  const [footPos, setFootPos] = useState<'dangling' | 'supported'>('supported');

  const isIdeal = backAngle === 'straight' && armAngle === 'right90' && footPos === 'supported';

  return (
    <div className="w-full bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/70 rounded-3xl border-2 border-emerald-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-xs">
            📐
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Laboratório dos 90°: Braços, Costas e Pés' : '90° Angle Lab: Arms, Back & Feet'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Experimenta alterar as posições e descobre como alinhar o corpo com conforto e estabilidade!'
                : 'Experiment with posture adjustments to achieve comfort and stability!'}
            </p>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
          isIdeal
            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
            : 'bg-amber-100 text-amber-900 border-amber-300'
        }`}>
          {isIdeal ? '✅ Postura Ideal Alinhada' : '⚠️ Precisa de Ajustes'}
        </div>
      </div>

      {/* Interactive 3-part Control Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* 1. Costas */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wide text-slate-700">1. Costas na Cadeira</span>
            <span className="text-base">🪑</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setBackAngle('straight')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                backAngle === 'straight'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Costas Apoiadas
            </button>
            <button
              onClick={() => setBackAngle('slouched')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                backAngle === 'slouched'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Curvado à Frente
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {backAngle === 'straight'
              ? '✨ Apoio lombar mantém a coluna alinhada sem sobrecarga.'
              : '⚠️ Curvar a coluna aumenta a tensão no pescoço e costas.'}
          </p>
        </div>

        {/* 2. Braços e Cotovelos */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wide text-slate-700">2. Cotovelos & Pulsos</span>
            <span className="text-base">💪</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setArmAngle('right90')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                armAngle === 'right90'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Ângulo ~90°
            </button>
            <button
              onClick={() => setArmAngle('extended')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                armAngle === 'extended'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Braços Esticados
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {armAngle === 'right90'
              ? '✨ Antebraços paralelos à mesa evitam cansaço nos ombros.'
              : '⚠️ Braços muito esticados forçam pulsos e ombros.'}
          </p>
        </div>

        {/* 3. Pés */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wide text-slate-700">3. Posição dos Pés</span>
            <span className="text-base">🦶</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setFootPos('supported')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                footPos === 'supported'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Pés Apoiados
            </button>
            <button
              onClick={() => setFootPos('dangling')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                footPos === 'dangling'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Pés Pendurados
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {footPos === 'supported'
              ? '✨ Pés no chão ou em apoio dão estabilidade total às pernas.'
              : '⚠️ Pés no ar prendem a circulação e forçam as coxas.'}
          </p>
        </div>
      </div>

      {/* Dynamic Diagnostic Feedback Box */}
      <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium flex items-start gap-3 transition-colors ${
        isIdeal
          ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950'
          : 'bg-amber-100/70 border-amber-300 text-amber-950'
      }`}>
        <span className="text-xl shrink-0">{isIdeal ? '🏆' : '💡'}</span>
        <div>
          <p className="font-bold mb-0.5">
            {isIdeal
              ? 'Parabéns! Posição ergonómica perfeita.'
              : 'Dica de Ergonomia:'}
          </p>
          <p className="leading-relaxed">
            {isIdeal
              ? 'Com as costas apoiadas, os braços a 90° e os pés bem assentes no chão ou num apoio de pés, garantes uma postura confortável durante o estudo.'
              : 'Ajusta todos os três comandos para a opção verde para obteres a postura correta e evitar desconfortos!'}
          </p>
        </div>
      </div>
    </div>
  );
};
