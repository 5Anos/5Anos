import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import dosDontsPosture from '../assets/images/dos_donts_posture_1788646816497.jpg';
import correctPostureGuide from '../assets/images/correct_posture_guide_1788640792425.jpg';

export const DosDontsPostureInfographicPT: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const renderContent = () => (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 p-1">
      {/* LEFT: O QUE NÃO DEVES FAZER */}
      <div className="bg-red-50/90 border-2 border-red-300 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-200/80 mb-3">
          <span className="text-base sm:text-lg font-black text-red-700 tracking-tight">
            O que <span className="underline decoration-red-500 decoration-2">NÃO</span> deves fazer
          </span>
          <span className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center shadow-md">
            ✕
          </span>
        </div>

        {/* Character Illustration Photo Poster */}
        <div className="w-full h-48 sm:h-56 bg-slate-900 rounded-xl border border-red-200 overflow-hidden shadow-inner mb-3 relative group">
          <img
            src={dosDontsPosture}
            alt="O que não deves fazer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/70 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[11px] font-bold text-red-200">
              ⚠️ Postura incorreta: coluna curva e pescoço em esforço
            </span>
          </div>
        </div>

        {/* Bullet Points with Large Crisp Text */}
        <ul className="space-y-2 text-xs sm:text-sm text-red-950 font-medium">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Costas curvadas</strong> (sem apoio).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Cabeça muito à frente</strong> e pescoço esticado.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Ombros tensos</strong> e levantados.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Cadeira sem bom apoio</strong> nas costas.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">✕</span>
            <span><strong>Pés soltos</strong> sem estarem bem apoiados.</span>
          </li>
        </ul>

        <div className="mt-3 p-2 bg-red-100/90 rounded-xl border border-red-200 text-center text-xs font-bold text-red-800">
          ⚠️ Causa dores, cansaço e lesões a longo prazo!
        </div>
      </div>

      {/* RIGHT: O QUE DEVES FAZER */}
      <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-200/80 mb-3">
          <span className="text-base sm:text-lg font-black text-emerald-700 tracking-tight">
            O que <span className="underline decoration-emerald-500 decoration-2">DEVES</span> fazer
          </span>
          <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
            ✓
          </span>
        </div>

        {/* Character Illustration Photo Poster */}
        <div className="w-full h-48 sm:h-56 bg-slate-900 rounded-xl border border-emerald-200 overflow-hidden shadow-inner mb-3 relative group">
          <img
            src={correctPostureGuide}
            alt="O que deves fazer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[11px] font-bold text-emerald-200">
              ✓ Postura correta: ângulos de 90° e ecrã à altura dos olhos
            </span>
          </div>
        </div>

        {/* Bullet Points with Large Crisp Text */}
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Costas direitas</strong> e bem apoiadas.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Cabeça direita</strong> e alinhada.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Ecrã à altura dos olhos</strong> (nem alto nem baixo).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Ombros relaxados</strong> e braços apoiados confortavelmente.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">✓</span>
            <span><strong>Pés bem apoiados</strong> no chão ou descanso.</span>
          </li>
        </ul>

        <div className="mt-3 p-2 bg-emerald-100/90 rounded-xl border border-emerald-200 text-center text-xs font-bold text-emerald-800">
          ⭐ Garante máximo conforto, foco e saúde!
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
