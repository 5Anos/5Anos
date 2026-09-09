import React, { useState } from 'react';
import { Download, AlertOctagon, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface DownloadTrapsExplorerProps {
  language?: Language;
}

export const DownloadTrapsExplorer: React.FC<DownloadTrapsExplorerProps> = ({ language = 'pt' }) => {
  const [clickedBtn, setClickedBtn] = useState<'trap1' | 'trap2' | 'real' | null>(null);

  return (
    <div className="w-full bg-gradient-to-br from-rose-50/70 via-white to-sky-50/70 rounded-3xl border-2 border-rose-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl shadow-xs">
            🪤
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Laboratório de Armadilhas: Qual é o Botão Verdadeiro?' : 'Trap Lab: Which Download Button is Real?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Muitos sites colocam anúncios disfarçados de botões de download. Consegues identificar o botão genuíno?'
                : 'Many sites place ads disguised as download buttons. Spot the real one!'}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Tricky Download Area */}
      <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-4">
        <div className="text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ficha de Trabalho de Ciências (PDF)</span>
          <h4 className="text-base font-black text-slate-900 mt-0.5">Descarregar Resumo: "O Ciclo da Água.pdf" (1.2 MB)</h4>
        </div>

        {/* 3 Buttons: 2 Traps, 1 Real */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Trap 1 */}
          <button
            onClick={() => setClickedBtn('trap1')}
            className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              clickedBtn === 'trap1' ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-400' : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-green-700 shadow-md animate-bounce'
            }`}
          >
            <span className="text-lg">⚡ DOWNLOAD NOW FREE! ⚡</span>
            <span className="text-[10px] opacity-80">(Anúncio com letras garrafais)</span>
          </button>

          {/* Genuine Button */}
          <button
            onClick={() => setClickedBtn('real')}
            className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              clickedBtn === 'real' ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400' : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900">
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Descarregar Ficha (.pdf)</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Ficheiro limpo verificado</span>
          </button>

          {/* Trap 2 */}
          <button
            onClick={() => setClickedBtn('trap2')}
            className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              clickedBtn === 'trap2' ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-400' : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black border-amber-600 shadow-md'
            }`}
          >
            <span className="text-sm">⚠️ ATUALIZAR SISTEMA AQUI</span>
            <span className="text-[10px] opacity-90">(Pop-up falso de antivírus)</span>
          </button>
        </div>

        {/* Diagnostic Feedback */}
        {clickedBtn && (
          <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium space-y-1 ${
            clickedBtn === 'real' ? 'bg-emerald-50 text-emerald-950 border border-emerald-300' : 'bg-rose-50 text-rose-950 border border-rose-300'
          }`}>
            <p className="font-bold flex items-center gap-1.5">
              {clickedBtn === 'real' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ShieldAlert className="w-4 h-4 text-rose-600" />}
              <span>{clickedBtn === 'real' ? '🎉 Botão Correto Escolhido!' : '⛔ Cuidado com a Armadilha!'}</span>
            </p>
            <p className="leading-relaxed">
              {clickedBtn === 'real'
                ? 'Excelente observação! O botão genuíno é discreto, indica o formato real do documento (.pdf) e não usa cores berrantes nem promessas milagrosas.'
                : 'Esse botão é um anúncio enganador! Clicar nele pode instalar programas indesejados (malware) ou abrir dezenas de janelas pop-up.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
