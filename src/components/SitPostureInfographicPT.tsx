import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';

export const SitPostureInfographicPT: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const renderSvgContent = () => (
    <svg viewBox="0 0 540 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradients */}
        <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="displayGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
        <linearGradient id="pantsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="chairGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Filter shadow */}
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Floor Line */}
      <line x1="20" y1="365" x2="520" y2="365" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="6 4" />

      {/* 1. DESK */}
      <rect x="220" y="215" width="165" height="15" rx="3" fill="url(#deskGrad)" />
      <rect x="365" y="230" width="12" height="135" fill="#475569" rx="1" />
      <rect x="245" y="210" width="48" height="5" rx="2" fill="#334155" />
      <rect x="300" y="211" width="14" height="4" rx="2" fill="#475569" />

      {/* 2. COMPUTER MONITOR */}
      <rect x="340" y="210" width="32" height="5" rx="2" fill="#475569" />
      <rect x="353" y="170" width="6" height="40" fill="#64748b" />
      <rect x="336" y="90" width="22" height="96" rx="3" fill="url(#screenGrad)" />
      <rect x="338" y="93" width="16" height="90" rx="2" fill="url(#displayGrad)" />
      <line x1="341" y1="104" x2="351" y2="104" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <line x1="341" y1="112" x2="349" y2="112" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="341" y1="120" x2="351" y2="120" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

      {/* 3. CHAIR */}
      <rect x="185" y="300" width="9" height="60" fill="#334155" rx="2" />
      <circle cx="162" cy="360" r="5.5" fill="#1e293b" />
      <circle cx="218" cy="360" r="5.5" fill="#1e293b" />
      <path d="M 162 360 L 189 352 L 218 360" stroke="#334155" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <rect x="145" y="250" width="70" height="15" rx="6" fill="url(#chairGrad)" />
      <rect x="135" y="185" width="15" height="70" rx="6" fill="url(#chairGrad)" />
      <path d="M 142 250 L 142 268 L 185 268" stroke="#334155" strokeWidth="5.5" fill="none" />

      {/* 4. FOOTREST & FEET */}
      <polygon points="265,365 328,365 328,335 265,357" fill="#1e293b" />
      <path d="M 275 353 L 308 341 C 313 339, 318 343, 316 348 L 280 358 Z" fill="#8b5cf6" />
      <circle cx="292" cy="348" r="2.5" fill="#ffffff" />

      {/* 5. STUDENT CHARACTER */}
      <path d="M 168 245 L 245 245 C 252 245, 255 251, 254 257 L 280 345" stroke="url(#pantsGrad)" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 172 243 L 176 170" stroke="url(#shirtGrad)" strokeWidth="24" strokeLinecap="round" fill="none" />
      <path d="M 178 168 L 202 214" stroke="#fed7aa" strokeWidth="9.5" strokeLinecap="round" fill="none" />
      <path d="M 202 214 L 255 212" stroke="#fed7aa" strokeWidth="8.5" strokeLinecap="round" fill="none" />
      <path d="M 178 168 L 191 192" stroke="url(#shirtGrad)" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M 162 118 C 146 128, 138 160, 142 176 C 148 166, 156 150, 162 144 Z" fill="#78350f" />
      <circle cx="182" cy="130" r="17" fill="#fed7aa" />
      <path d="M 165 128 C 165 110, 184 106, 197 115 C 201 119, 199 128, 195 132 C 186 121, 174 121, 165 128 Z" fill="#78350f" />
      <circle cx="191" cy="129" r="1.7" fill="#1e293b" />
      <path d="M 188 136 Q 191 139 194 136" stroke="#9a3412" strokeWidth="1.2" fill="none" />
      <circle cx="177" cy="131" r="2.8" fill="#fca5a5" />

      {/* 6. ERGONOMIC GUIDELINES & DISTANCE */}
      <line x1="193" y1="129" x2="336" y2="105" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="4 3" />
      <circle cx="336" cy="105" r="4" fill="#0284c7" />

      {/* Distance Indicator Arrow (45-70 cm) */}
      <g>
        <rect x="228" y="52" width="105" height="32" rx="16" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" filter="url(#badgeShadow)" />
        <text x="280" y="66" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#14532d">45–70 cm</text>
        <text x="280" y="78" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#15803d">(distância ao ecrã)</text>
        
        <line x1="205" y1="88" x2="330" y2="88" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2" />
        <polygon points="205,88 212,84 212,92" fill="#16a34a" />
        <polygon points="330,88 323,84 323,92" fill="#16a34a" />
      </g>

      {/* --- HIGH-CONTRAST, LARGER PT LABELS --- */}

      {/* 1. Ombros relaxados */}
      <g>
        <line x1="176" y1="168" x2="120" y2="115" stroke="#e11d48" strokeWidth="2" />
        <circle cx="176" cy="168" r="4" fill="#e11d48" />
        <rect x="8" y="98" width="128" height="30" rx="9" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" filter="url(#badgeShadow)" />
        <text x="72" y="118" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#881337">Ombros relaxados</text>
      </g>

      {/* 2. Cotovelos e mãos a 90° */}
      <g>
        <line x1="202" y1="214" x2="120" y2="175" stroke="#059669" strokeWidth="2" />
        <circle cx="202" cy="214" r="4" fill="#059669" />
        <rect x="6" y="158" width="136" height="34" rx="9" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" filter="url(#badgeShadow)" />
        <text x="74" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">Cotovelos e mãos</text>
        <text x="74" y="185" textAnchor="middle" fontSize="10" fontWeight="600" fill="#047857">alinhados a ~90°</text>
      </g>

      {/* 3. Costas direitas */}
      <g>
        <line x1="165" y1="220" x2="115" y2="242" stroke="#2563eb" strokeWidth="2" />
        <circle cx="165" cy="220" r="4" fill="#2563eb" />
        <rect x="6" y="226" width="135" height="34" rx="9" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" filter="url(#badgeShadow)" />
        <text x="73" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">Costas direitas</text>
        <text x="73" y="253" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1d4ed8">e bem apoiadas</text>
      </g>

      {/* 4. Topo do ecrã ao nível dos olhos */}
      <g>
        <line x1="336" y1="100" x2="395" y2="82" stroke="#0284c7" strokeWidth="2" />
        <circle cx="336" cy="100" r="4" fill="#0284c7" />
        <rect x="375" y="66" width="155" height="35" rx="9" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" filter="url(#badgeShadow)" />
        <text x="452" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#075985">Topo do ecrã</text>
        <text x="452" y="94" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">ao nível dos olhos</text>
      </g>

      {/* 5. Ecrã sem reflexos */}
      <g>
        <line x1="346" y1="145" x2="400" y2="145" stroke="#e11d48" strokeWidth="2" />
        <circle cx="346" cy="145" r="4" fill="#e11d48" />
        <rect x="382" y="130" width="148" height="34" rx="9" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" filter="url(#badgeShadow)" />
        <text x="456" y="144" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#881337">Ecrã posicionado</text>
        <text x="456" y="157" textAnchor="middle" fontSize="10" fontWeight="600" fill="#be123c">para evitar reflexos</text>
      </g>

      {/* 6. Espaço livre por baixo da mesa */}
      <g>
        <line x1="290" y1="270" x2="385" y2="248" stroke="#d97706" strokeWidth="2" />
        <circle cx="290" cy="270" r="4" fill="#d97706" />
        <rect x="368" y="233" width="162" height="34" rx="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#badgeShadow)" />
        <text x="449" y="247" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">Espaço livre</text>
        <text x="449" y="260" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b45309">por baixo da mesa</text>
      </g>

      {/* 7. Pés no chão ou num apoio */}
      <g>
        <line x1="298" y1="348" x2="378" y2="325" stroke="#059669" strokeWidth="2" />
        <circle cx="298" cy="348" r="4" fill="#059669" />
        <rect x="360" y="310" width="170" height="35" rx="9" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" filter="url(#badgeShadow)" />
        <text x="445" y="324" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">Pés apoiados</text>
        <text x="445" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#047857">no chão ou descanso</text>
      </g>
    </svg>
  );

  return (
    <div className="w-full bg-gradient-to-b from-indigo-50/70 to-slate-50 rounded-2xl border-2 border-indigo-100 shadow-md p-3 sm:p-4 flex flex-col font-sans select-none overflow-hidden relative">
      {/* Header & Zoom Controls Bar */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-indigo-100/80">
        <h3 className="text-sm sm:text-base font-black text-indigo-950 tracking-tight">
          Como te deves sentar ao computador?
        </h3>

        {/* Zoom & Fullscreen Action Buttons */}
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
            title="Repor Zoom normal (100%)"
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
            title="Ver em Ecrã Grande / Modal"
            className="p-1.5 rounded-lg text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Diagram Container with Smooth Interactive Zoom & Pan */}
      <div className="relative w-full aspect-[4/3] bg-white/90 rounded-xl border border-indigo-100/90 shadow-inner overflow-auto max-h-[380px] p-2 flex items-center justify-center">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out',
            width: '100%',
            height: '100%',
          }}
          className="flex items-center justify-center"
        >
          {renderSvgContent()}
        </div>
      </div>

      {/* Fullscreen Lightbox / Modal for Maximum Clarity */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border-2 border-indigo-200 flex flex-col max-h-[92vh] overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg sm:text-xl font-black text-indigo-950">
                Guia Visual: Como te deves sentar ao computador
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center">
              <div className="w-full max-w-2xl aspect-[4/3]">
                {renderSvgContent()}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Clica no ✕ ou no fundo para fechar
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
