import React, { useState } from 'react';
import { Sun, Monitor, Eye, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface MonitorLightingLabProps {
  language?: Language;
}

export const MonitorLightingLab: React.FC<MonitorLightingLabProps> = ({ language = 'pt' }) => {
  const [screenHeight, setScreenHeight] = useState<'low' | 'eyeLevel' | 'tooHigh'>('eyeLevel');
  const [distance, setDistance] = useState<'tooClose' | 'armLength' | 'tooFar'>('armLength');
  const [lighting, setLighting] = useState<'side' | 'directBehind' | 'darkRoom'>('side');

  const isPerfect = screenHeight === 'eyeLevel' && distance === 'armLength' && lighting === 'side';

  return (
    <div className="w-full bg-gradient-to-br from-teal-50/70 via-white to-sky-50/70 rounded-3xl border-2 border-teal-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-teal-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-xl shadow-xs">
            🖥️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Laboratório do Monitor e Iluminação' : 'Monitor & Lighting Lab'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Regula a altura do ecrã, a distância aos teus olhos e a posição da luz da janela!'
                : 'Adjust screen height, eye distance, and window lighting position!'}
            </p>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
          isPerfect ? 'bg-teal-100 text-teal-900 border-teal-300' : 'bg-amber-100 text-amber-900 border-amber-300'
        }`}>
          {isPerfect ? '✨ Espaço Confortável' : '⚙️ Ajusta o Espaço'}
        </div>
      </div>

      {/* 3 Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* 1. Altura do Ecrã */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
          <span className="text-xs font-black uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-teal-600" />
            <span>1. Altura do Topo do Ecrã</span>
          </span>
          <div className="space-y-1.5">
            <button
              onClick={() => setScreenHeight('eyeLevel')}
              className={`w-full p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                screenHeight === 'eyeLevel' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Ao nível dos olhos (Ideal)
            </button>
            <button
              onClick={() => setScreenHeight('low')}
              className={`w-full p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                screenHeight === 'low' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Muito baixo (Cabeça inclinada)
            </button>
          </div>
        </div>

        {/* 2. Distância dos Olhos */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
          <span className="text-xs font-black uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-teal-600" />
            <span>2. Distância ao Ecrã</span>
          </span>
          <div className="space-y-1.5">
            <button
              onClick={() => setDistance('armLength')}
              className={`w-full p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                distance === 'armLength' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Comprimento do braço (~50–70 cm)
            </button>
            <button
              onClick={() => setDistance('tooClose')}
              className={`w-full p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                distance === 'tooClose' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Colado à cara (Cansaço visual)
            </button>
          </div>
        </div>

        {/* 3. Luz Natural / Janela */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
          <span className="text-xs font-black uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>3. Iluminação & Janela</span>
          </span>
          <div className="space-y-1.5">
            <button
              onClick={() => setLighting('side')}
              className={`w-full p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                lighting === 'side' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Luz de lado (Sem reflexos)
            </button>
            <button
              onClick={() => setLighting('directBehind')}
              className={`w-full p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                lighting === 'directBehind' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Sol direto no ecrã (Reflexos)
            </button>
          </div>
        </div>
      </div>

      {/* Explanatory summary */}
      <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-colors ${
        isPerfect ? 'bg-teal-100/80 border-teal-300 text-teal-950' : 'bg-amber-100/70 border-amber-300 text-amber-950'
      }`}>
        <p className="font-bold mb-1">
          {isPerfect ? '🌟 Visão e Pescoço Protegidos!' : '💡 Regras de Ouro:'}
        </p>
        <p className="leading-relaxed">
          {isPerfect
            ? 'O topo do monitor ao nível dos olhos mantém o pescoço direito, a distância do braço protege a visão do esforço contínuo e a luz lateral evita reflexos que cansam os olhos.'
            : 'Mantém o topo do ecrã à altura dos olhos, estica o braço para medir a distância e posiciona a secretária para a luz entrar de lado!'}
        </p>
      </div>
    </div>
  );
};
