import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';

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

        {/* Character Illustration SVG */}
        <div className="w-full aspect-[4/3] bg-white rounded-xl border border-red-200 p-2 shadow-inner mb-3 flex items-center justify-center">
          <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="160" x2="230" y2="160" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 3" />
            
            {/* Desk */}
            <rect x="10" y="70" width="80" height="8" rx="2" fill="#991b1b" />
            <rect x="20" y="78" width="6" height="82" fill="#7f1d1d" />
            {/* Screen */}
            <rect x="30" y="25" width="8" height="45" rx="2" fill="#1e293b" />
            <rect x="32" y="28" width="5" height="40" fill="#93c5fd" />
            <rect x="25" y="66" width="18" height="4" rx="1" fill="#475569" />
            <rect x="45" y="66" width="22" height="3" rx="1" fill="#475569" />

            {/* Chair */}
            <rect x="160" y="100" width="8" height="45" rx="2" fill="#334155" />
            <rect x="135" y="145" width="55" height="4" rx="2" fill="#1e293b" />
            <circle cx="140" cy="155" r="4" fill="#0f172a" />
            <circle cx="185" cy="155" r="4" fill="#0f172a" />
            <rect x="110" y="90" width="60" height="10" rx="4" fill="#334155" />
            <rect x="165" y="55" width="8" height="45" rx="3" fill="#334155" />

            {/* Boy Slouching (Hunched Red Line) */}
            {/* Legs & dangling feet */}
            <path d="M 125 90 L 80 90 L 70 145 L 55 145" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="45" y="140" width="18" height="8" rx="3" fill="#dc2626" />

            {/* Slouched Hunched Back */}
            <path d="M 120 90 C 150 70, 140 35, 95 38" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" fill="none" />
            {/* Spine strain curve dash */}
            <path d="M 130 85 C 152 68, 142 42, 105 42" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />

            {/* Arms reaching awkwardly */}
            <path d="M 98 44 L 80 66 L 50 67" stroke="#fca5a5" strokeWidth="6.5" strokeLinecap="round" fill="none" />

            {/* Slumped Head leaning forward */}
            <circle cx="85" cy="28" r="13" fill="#fed7aa" />
            <path d="M 75 22 C 75 14, 92 12, 97 22 C 95 26, 80 28, 75 22 Z" fill="#78350f" />
            <circle cx="80" cy="28" r="1.3" fill="#1e293b" />
            <path d="M 78 33 Q 82 31 84 34" stroke="#991b1b" strokeWidth="1" fill="none" />

            {/* Pain / Tension marks on neck & back */}
            <path d="M 140 40 L 148 35" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <path d="M 144 48 L 153 47" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <path d="M 136 56 L 145 59" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
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

        {/* Character Illustration SVG */}
        <div className="w-full aspect-[4/3] bg-white rounded-xl border border-emerald-200 p-2 shadow-inner mb-3 flex items-center justify-center">
          <svg viewBox="0 0 240 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="160" x2="230" y2="160" stroke="#86efac" strokeWidth="2" strokeDasharray="4 3" />

            {/* Straight spine guideline */}
            <line x1="180" y1="20" x2="180" y2="145" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 3" />

            {/* Desk */}
            <rect x="10" y="70" width="85" height="8" rx="2" fill="#15803d" />
            <rect x="20" y="78" width="6" height="82" fill="#166534" />
            {/* Screen at eye level */}
            <rect x="30" y="18" width="8" height="52" rx="2" fill="#1e293b" />
            <rect x="32" y="21" width="5" height="46" fill="#6ee7b7" />
            <rect x="25" y="66" width="18" height="4" rx="1" fill="#475569" />
            <rect x="50" y="66" width="22" height="3" rx="1" fill="#475569" />

            {/* Chair with backrest */}
            <rect x="150" y="100" width="8" height="45" rx="2" fill="#334155" />
            <rect x="125" y="145" width="55" height="4" rx="2" fill="#1e293b" />
            <circle cx="130" cy="155" r="4" fill="#0f172a" />
            <circle cx="175" cy="155" r="4" fill="#0f172a" />
            <rect x="105" y="90" width="55" height="10" rx="4" fill="#334155" />
            <rect x="150" y="35" width="8" height="65" rx="3" fill="#334155" />

            {/* Footrest with firmly planted feet */}
            <polygon points="60,160 95,160 95,145 60,154" fill="#1e293b" />
            <path d="M 68,150 L 90,143 L 88,154 Z" fill="#16a34a" />

            {/* Student Sitting Upright (Green Torso) */}
            {/* Legs 90 degrees */}
            <path d="M 125 90 L 80 90 L 78 145" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Straight Back against chair */}
            <path d="M 125 90 L 128 38" stroke="#16a34a" strokeWidth="16" strokeLinecap="round" fill="none" />

            {/* Arms at 90 degrees */}
            <path d="M 128 42 L 105 68 L 55 68" stroke="#fed7aa" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 128 42 L 118 56" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" fill="none" />

            {/* Upright Head at Eye Level with Screen */}
            <circle cx="130" cy="24" r="13" fill="#fed7aa" />
            <path d="M 120 18 C 120 10, 137 8, 142 18 C 140 22, 125 24, 120 18 Z" fill="#78350f" />
            <circle cx="125" cy="24" r="1.3" fill="#1e293b" />
            <path d="M 123 29 Q 126 32 129 29" stroke="#15803d" strokeWidth="1" fill="none" />

            {/* Sightline to top of screen */}
            <line x1="124" y1="24" x2="38" y2="24" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="38" cy="24" r="2.5" fill="#059669" />
          </svg>
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
            <span><strong>Ombros relaxados</strong> e cotovelos a ~90°.</span>
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
