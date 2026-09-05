import React from 'react';

export const SitPostureInfographicPT: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-indigo-50/60 to-slate-50 rounded-2xl border-2 border-indigo-100 shadow-md p-4 sm:p-5 flex flex-col font-sans select-none overflow-hidden">
      {/* Title */}
      <div className="text-center mb-3">
        <h3 className="text-base sm:text-lg font-black text-indigo-950 tracking-tight">
          Como te deves sentar ao computador?
        </h3>
      </div>

      {/* SVG Diagram with precise PT labels */}
      <div className="relative w-full aspect-[4/3] max-w-[480px] mx-auto bg-white/80 rounded-xl border border-indigo-100/80 p-2 shadow-inner">
        <svg viewBox="0 0 500 380" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
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
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Floor Line */}
          <line x1="20" y1="355" x2="480" y2="355" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />

          {/* 1. DESK */}
          {/* Desk Top */}
          <rect x="210" y="210" width="165" height="14" rx="3" fill="url(#deskGrad)" />
          {/* Desk Legs */}
          <rect x="355" y="224" width="10" height="131" fill="#475569" rx="1" />
          {/* Keyboard & Mouse */}
          <rect x="235" y="205" width="45" height="5" rx="2" fill="#334155" />
          <rect x="290" y="206" width="12" height="4" rx="2" fill="#475569" />

          {/* 2. COMPUTER MONITOR */}
          {/* Monitor Base */}
          <rect x="330" y="205" width="30" height="5" rx="2" fill="#475569" />
          <rect x="342" y="170" width="6" height="35" fill="#64748b" />
          {/* Monitor Frame & Screen */}
          <rect x="325" y="95" width="22" height="90" rx="3" fill="url(#screenGrad)" />
          <rect x="327" y="98" width="16" height="84" rx="2" fill="url(#displayGrad)" />
          {/* Webpage mock in screen */}
          <line x1="330" y1="108" x2="340" y2="108" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="330" y1="115" x2="338" y2="115" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="330" y1="122" x2="340" y2="122" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

          {/* 3. CHAIR */}
          {/* Chair Base & Wheels */}
          <rect x="180" y="295" width="8" height="55" fill="#334155" rx="2" />
          <circle cx="160" cy="350" r="5" fill="#1e293b" />
          <circle cx="210" cy="350" r="5" fill="#1e293b" />
          <path d="M 160 350 L 184 345 L 208 350" stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Chair Seat */}
          <rect x="145" y="245" width="65" height="14" rx="6" fill="url(#chairGrad)" />
          {/* Chair Backrest */}
          <rect x="135" y="185" width="14" height="65" rx="6" fill="url(#chairGrad)" />
          {/* Connector */}
          <path d="M 142 245 L 142 260 L 175 260" stroke="#334155" strokeWidth="5" fill="none" />

          {/* 4. FOOTREST & FEET */}
          {/* Ergonomic Wedge Footrest */}
          <polygon points="255,355 315,355 315,328 255,348" fill="#1e293b" />
          {/* Shoes on footrest */}
          <path d="M 265 344 L 295 334 C 300 332, 305 336, 303 340 L 270 348 Z" fill="#8b5cf6" />
          <circle cx="280" cy="340" r="2" fill="#ffffff" />

          {/* 5. STUDENT CHARACTER (Girl sitting with correct posture) */}
          {/* Legs */}
          <path d="M 165 240 L 235 240 C 242 240, 245 246, 244 252 L 270 335" stroke="url(#pantsGrad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          {/* Torso (Straight Back) */}
          <path d="M 168 238 L 172 170" stroke="url(#shirtGrad)" strokeWidth="22" strokeLinecap="round" fill="none" />

          {/* Arms & Hands (90 degree elbow at keyboard level) */}
          {/* Upper arm */}
          <path d="M 175 168 L 195 210" stroke="#fbcfe8" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Forearm and hand to keyboard */}
          <path d="M 195 210 L 245 208" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Sleeve */}
          <path d="M 175 168 L 186 190" stroke="url(#shirtGrad)" strokeWidth="12" strokeLinecap="round" fill="none" />

          {/* Head & Face */}
          {/* Ponytail Hair */}
          <path d="M 160 120 C 145 130, 138 160, 142 175 C 147 165, 155 150, 160 145 Z" fill="#78350f" />
          {/* Head Base */}
          <circle cx="178" cy="132" r="16" fill="#fed7aa" />
          {/* Hair top & bangs */}
          <path d="M 162 130 C 162 114, 180 110, 192 118 C 196 122, 194 130, 190 134 C 182 124, 170 124, 162 130 Z" fill="#78350f" />
          {/* Eye and Smile */}
          <circle cx="186" cy="131" r="1.5" fill="#1e293b" />
          <path d="M 183 138 Q 186 141 189 138" stroke="#9a3412" strokeWidth="1" fill="none" />
          {/* Ear */}
          <circle cx="173" cy="133" r="2.5" fill="#fca5a5" />

          {/* 6. ERGONOMIC GUIDELINE ARROWS & DISTANCE */}
          {/* Eye-level line */}
          <line x1="188" y1="131" x2="325" y2="110" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="325" cy="110" r="3.5" fill="#0284c7" />

          {/* Distance Indicator Arrow (45-70 cm) */}
          <g>
            <rect x="228" y="58" width="80" height="26" rx="13" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" filter="url(#badgeShadow)" />
            <text x="268" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534">45–70 cm</text>
            <text x="268" y="80" textAnchor="middle" fontSize="8" fill="#15803d">(distância ideal)</text>
            
            {/* Arrow line */}
            <line x1="200" y1="88" x2="315" y2="88" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
            <polygon points="200,88 206,85 206,91" fill="#16a34a" />
            <polygon points="315,88 309,85 309,91" fill="#16a34a" />
          </g>

          {/* --- LABELS & POINTERS (100% PORTUGUESE) --- */}

          {/* Label: Ombros relaxados */}
          <g>
            <line x1="172" y1="168" x2="110" y2="120" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="172" cy="168" r="3" fill="#f43f5e" />
            <rect x="15" y="105" width="105" height="24" rx="8" fill="#ffe4e6" stroke="#fecdd3" strokeWidth="1" filter="url(#badgeShadow)" />
            <text x="67" y="121" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#9f1239">Ombros relaxados</text>
          </g>

          {/* Label: Cotovelos e pulsos */}
          <g>
            <line x1="195" y1="210" x2="115" y2="175" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="195" cy="210" r="3" fill="#10b981" />
            <rect x="8" y="160" width="125" height="25" rx="8" fill="#d1fae5" stroke="#a7f3d0" strokeWidth="1" filter="url(#badgeShadow)" />
            <text x="70" y="172" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">Cotovelos e mãos</text>
            <text x="70" y="181" textAnchor="middle" fontSize="8" fill="#047857">alinhados a ~90°</text>
          </g>

          {/* Label: Costas apoiadas */}
          <g>
            <line x1="160" y1="215" x2="110" y2="235" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="160" cy="215" r="3" fill="#3b82f6" />
            <rect x="10" y="222" width="120" height="25" rx="8" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" filter="url(#badgeShadow)" />
            <text x="70" y="234" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Costas direitas</text>
            <text x="70" y="243" textAnchor="middle" fontSize="8" fill="#1d4ed8">e bem apoiadas</text>
          </g>

          {/* Label: Topo do ecrã ao nível dos olhos */}
          <g>
            <line x1="325" y1="105" x2="385" y2="90" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="325" cy="105" r="3" fill="#0284c7" />
            <rect x="365" y="75" width="125" height="28" rx="8" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1" filter="url(#badgeShadow)" />
            <text x="427" y="87" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">Topo do ecrã</text>
            <text x="427" y="97" textAnchor="middle" fontSize="8" fill="#0284c7">ao nível dos olhos</text>
          </g>

          {/* Label: Ecrã sem reflexos */}
          <g>
            <line x1="335" y1="150" x2="385" y2="150" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="335" cy="150" r="3" fill="#e11d48" />
            <rect x="375" y="137" width="115" height="25" rx="8" fill="#ffe4e6" stroke="#fecdd3" strokeWidth="1" filter="url(#badgeShadow)" />
            <text x="432" y="149" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9f1239">Ecrã posicionado</text>
            <text x="432" y="158" textAnchor="middle" fontSize="8" fill="#be123c">para evitar reflexos</text>
          </g>

          {/* Label: Espaço desobstruído */}
          <g>
            <line x1="280" y1="265" x2="370" y2="245" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="280" cy="265" r="3" fill="#d97706" />
            <rect x="355" y="232" width="135" height="26" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" filter="url(#badgeShadow)" />
            <text x="422" y="244" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">Espaço livre</text>
            <text x="422" y="254" textAnchor="middle" fontSize="8" fill="#b45309">por baixo da mesa</text>
          </g>

          {/* Label: Pés no chão ou descanso */}
          <g>
            <line x1="285" y1="340" x2="365" y2="320" stroke="#059669" strokeWidth="1.5" />
            <circle cx="285" cy="340" r="3" fill="#059669" />
            <rect x="350" y="307" width="140" height="26" rx="8" fill="#d1fae5" stroke="#a7f3d0" strokeWidth="1" filter="url(#badgeShadow)" />
            <text x="420" y="319" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">Pés no chão</text>
            <text x="420" y="329" textAnchor="middle" fontSize="8" fill="#047857">ou num apoio/descanso</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
