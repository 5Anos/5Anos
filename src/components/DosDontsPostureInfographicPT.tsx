import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import postureWrongRed from '../assets/images/posture_wrong_red.jpg';
import postureCorrectGreen from '../assets/images/posture_correct_green.jpg';
import dosDontsPosture from '../assets/images/dos_donts_posture_1788646816497.jpg';

export const DosDontsPostureInfographicPT: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const renderContent = () => (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
      {/* LEFT: ÁREA VERMELHA - O QUE NÃO DEVES FAZER */}
      <div className="bg-red-50/90 border-2 border-red-300 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-200">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
              ✕
            </span>
            <span className="text-base sm:text-lg font-black text-red-700 tracking-tight">
              Área Vermelha: <span className="underline decoration-red-500 decoration-2">NÃO</span> deves fazer
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-red-200/80 text-red-900 font-extrabold text-[10px] uppercase tracking-wider">
            Incorreto
          </span>
        </div>

        {/* Character Illustration Photo Poster (ONLY wrong posture in red) */}
        <div className="w-full bg-red-950/10 rounded-xl border border-red-200 overflow-hidden shadow-inner p-2 relative group flex items-center justify-center min-h-[260px] sm:min-h-[300px]">
          <img
            src={postureWrongRed}
            alt="Postura incorreta na área vermelha"
            referrerPolicy="no-referrer"
            className="w-auto h-auto max-h-72 sm:max-h-80 object-contain rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-sm"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-red-950/80 via-red-950/40 to-transparent p-2.5 rounded-b-xl">
            <span className="text-xs font-bold text-red-100 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>Postura incorreta: coluna curvada, pescoço sob tensão e pés sem apoio</span>
            </span>
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-2 text-xs sm:text-sm text-red-950 font-medium pt-1">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Costas curvadas</strong> sem apoio no encosto da cadeira.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Cabeça muito à frente</strong> e pescoço esticado em esforço.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Ombros tensos</strong> e levantados em direção às orelhas.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Pulsos dobrados</strong> forçando as articulações no teclado.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Pés soltos</strong> pendurados no ar ou sentar sobre um pé.</span>
          </li>
        </ul>

        <div className="mt-2 p-2.5 bg-red-100/90 rounded-xl border border-red-200 text-center text-xs font-bold text-red-800">
          ⚠️ Provoca cansaço precoce, dores na coluna e fadiga muscular!
        </div>
      </div>

      {/* RIGHT: ÁREA VERDE - O QUE DEVES FAZER */}
      <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-200">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
              ✓
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-700 tracking-tight">
              Área Verde: <span className="underline decoration-emerald-500 decoration-2">DEVES</span> fazer
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 font-extrabold text-[10px] uppercase tracking-wider">
            Correto
          </span>
        </div>

        {/* Character Illustration Photo Poster (ONLY correct posture in green) */}
        <div className="w-full bg-emerald-950/10 rounded-xl border border-emerald-200 overflow-hidden shadow-inner p-2 relative group flex items-center justify-center min-h-[260px] sm:min-h-[300px]">
          <img
            src={postureCorrectGreen}
            alt="Postura correta na área verde"
            referrerPolicy="no-referrer"
            className="w-auto h-auto max-h-72 sm:max-h-80 object-contain rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-sm"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/40 to-transparent p-2.5 rounded-b-xl">
            <span className="text-xs font-bold text-emerald-100 flex items-center gap-1.5">
              <span>✓</span>
              <span>Postura correta: ângulos de ~90°, coluna apoiada e ecrã ao nível dos olhos</span>
            </span>
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium pt-1">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Costas direitas</strong> e bem apoiadas no encosto da cadeira.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Cabeça direita</strong> e topo do ecrã ao nível dos olhos.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Ombros relaxados</strong> e braços com cotovelos a cerca de 90°.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Pulsos direitos</strong> e alinhados continuamente com os antebraços.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Pés bem assentes</strong> e apoiados no chão ou num apoio estável.</span>
          </li>
        </ul>

        <div className="mt-2 p-2.5 bg-emerald-100/90 rounded-xl border border-emerald-200 text-center text-xs font-bold text-emerald-800">
          ⭐ Garante máximo conforto, foco no estudo e bem-estar saudável!
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-b from-indigo-50/70 to-slate-50 rounded-2xl border-2 border-indigo-100 shadow-md p-3 sm:p-4 flex flex-col font-sans select-none overflow-hidden relative">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-indigo-100/80">
        <h3 className="text-sm sm:text-base font-black text-indigo-950 tracking-tight">
          Comparação de Posturas: O que Fazer vs. Não Fazer
        </h3>

        {/* Zoom & Fullscreen Controls */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-indigo-200 shadow-sm shrink-0">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            title="Diminuir Zoom (-)"
            className="p-1.5 rounded-lg text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleResetZoom}
            title="Repor Zoom (100%)"
            className="px-2 py-0.5 text-xs font-bold text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            {Math.round(zoomLevel * 100)}%
          </button>

          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2.5}
            title="Aumentar Zoom (+)"
            className="p-1.5 rounded-lg text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-indigo-200 mx-0.5" />

          <button
            onClick={() => setIsModalOpen(true)}
            title="Ver em Ecrã Inteiro / Modal"
            className="p-1.5 rounded-lg text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Responsive Grid with Interactive Zoom */}
      <div className="relative w-full bg-white/90 rounded-xl border border-indigo-100/90 shadow-inner p-2 sm:p-3 flex items-center justify-center">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
            width: '100%',
          }}
        >
          {renderContent()}
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl border-2 border-indigo-200 flex flex-col max-h-[92vh] overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg sm:text-xl font-black text-indigo-950">
                Guia Comparativo: Postura Correta vs. Postura Incorreta
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:p-4">
              {renderContent()}
            </div>

            <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Clica no ✕ para fechar
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
