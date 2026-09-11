import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PostureState {
  head: number;      // 0: bent forward, 1: slightly bent, 2: aligned (correct)
  spine: number;     // 0: hunched/slouched, 1: slightly curved, 2: straight against backrest (correct)
  screen: number;    // 0: too low on desk, 1: mid, 2: elevated at eye level (correct)
  arms: number;      // 0: tense/elevated, 1: hovering, 2: relaxed at 90° on desk (correct)
  feet: number;      // 0: dangling in air, 1: tip-toes, 2: flat on footrest/floor (correct)
}

interface Props {
  language?: 'pt' | 'en';
  onComplete?: () => void;
}

export const PostureCorrectionSimulator: React.FC<Props> = ({ language = 'pt', onComplete }) => {
  // Initial state: hunched/poor posture challenge
  const [posture, setPosture] = useState<PostureState>({
    head: 0,
    spine: 0,
    screen: 0,
    arms: 0,
    feet: 0,
  });

  const [activeTab, setActiveTab] = useState<'interactive' | 'presets' | 'guide'>('interactive');
  const [selectedPart, setSelectedPart] = useState<'head' | 'spine' | 'screen' | 'arms' | 'feet' | null>('head');
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);

  // Calculate score (0 to 100%)
  const totalCorrect = (posture.head === 2 ? 1 : 0) +
                       (posture.spine === 2 ? 1 : 0) +
                       (posture.screen === 2 ? 1 : 0) +
                       (posture.arms === 2 ? 1 : 0) +
                       (posture.feet === 2 ? 1 : 0);

  const score = Math.round((totalCorrect / 5) * 100);
  const isPerfect = totalCorrect === 5;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b', '#8b5cf6'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleUpdate = (part: keyof PostureState, value: number) => {
    const updated = { ...posture, [part]: value };
    setPosture(updated);
    setSelectedPart(part);

    const newTotal = (updated.head === 2 ? 1 : 0) +
                     (updated.spine === 2 ? 1 : 0) +
                     (updated.screen === 2 ? 1 : 0) +
                     (updated.arms === 2 ? 1 : 0) +
                     (updated.feet === 2 ? 1 : 0);

    if (newTotal === 5 && !hasCelebrated) {
      setHasCelebrated(true);
      triggerCelebration();
      if (onComplete) onComplete();
    }
  };

  const setPreset = (type: 'bad' | 'screenLow' | 'feetDangling' | 'perfect') => {
    if (type === 'bad') {
      setPosture({ head: 0, spine: 0, screen: 0, arms: 0, feet: 0 });
      setHasCelebrated(false);
    } else if (type === 'screenLow') {
      setPosture({ head: 0, spine: 1, screen: 0, arms: 2, feet: 2 });
      setHasCelebrated(false);
    } else if (type === 'feetDangling') {
      setPosture({ head: 2, spine: 2, screen: 2, arms: 2, feet: 0 });
      setHasCelebrated(false);
    } else if (type === 'perfect') {
      setPosture({ head: 2, spine: 2, screen: 2, arms: 2, feet: 2 });
      if (!hasCelebrated) {
        setHasCelebrated(true);
        triggerCelebration();
      }
    }
  };

  // SVG dynamic geometric calculations
  // Screen Y and Stand Height
  const screenElevation = posture.screen === 0 ? 30 : posture.screen === 1 ? 15 : 0; // 0 is top/proper
  const monitorY = 90 + screenElevation;
  const standHeight = posture.screen === 2 ? 40 : posture.screen === 1 ? 25 : 12;

  // Head and eye position based on head & spine
  const headX = posture.spine === 0 ? 205 : posture.spine === 1 ? 192 : 182;
  const headY = posture.spine === 0 ? 155 : posture.spine === 1 ? 142 : 130;
  const headRotation = posture.head === 0 ? 25 : posture.head === 1 ? 12 : 0; // forward tilt
  const eyeX = headX + 9;
  const eyeY = headY - 1;

  // Spine path
  const spineStartX = 172;
  const spineStartY = 245;
  const spineControlX = posture.spine === 0 ? 208 : posture.spine === 1 ? 190 : 173;
  const spineControlY = 205;
  const spineEndX = headX - 6;
  const spineEndY = headY + 36;
  const spinePath = `M ${spineStartX} ${spineStartY} Q ${spineControlX} ${spineControlY} ${spineEndX} ${spineEndY}`;
  const spineColor = posture.spine === 2 ? '#10b981' : posture.spine === 1 ? '#f59e0b' : '#ef4444';

  // Arm paths
  const shoulderX = spineEndX;
  const shoulderY = spineEndY;
  const elbowX = posture.arms === 2 ? 198 : posture.arms === 1 ? 208 : 215;
  const elbowY = posture.arms === 2 ? 214 : posture.arms === 1 ? 222 : 190;
  const handX = 250;
  const handY = 212;

  // Legs & Feet
  const hipX = 168;
  const hipY = 245;
  const kneeX = 245;
  const kneeY = posture.feet === 0 ? 235 : 245;
  const footX = posture.feet === 2 ? 285 : posture.feet === 1 ? 275 : 255;
  const footY = posture.feet === 2 ? 346 : posture.feet === 1 ? 335 : 315;

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-emerald-200/80 shadow-xl overflow-hidden transition-all">
      {/* Header Banner inspired by student's infographic */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-xl shrink-0">
            🪑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                {language === 'pt' ? 'Simulador de Postura Ergonómica' : 'Ergonomic Posture Simulator'}
              </h3>
              <span className="bg-emerald-400/30 text-emerald-100 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-300/40">
                {language === 'pt' ? 'Laboratório Interativo' : 'Interactive Lab'}
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">
              {language === 'pt'
                ? 'Pega nas partes do corpo e do equipamento e senta o aluno com a postura correta!'
                : 'Adjust body parts and equipment to sit the student in the proper ergonomic posture!'}
            </p>
          </div>
        </div>

        {/* Live Score Ring / Pill */}
        <div className="flex items-center gap-2 bg-emerald-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-emerald-400/40">
          <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">
            {language === 'pt' ? 'Ergonomia:' : 'Posture Score:'}
          </span>
          <span className={`text-base font-black px-2 py-0.5 rounded-xl ${
            isPerfect ? 'bg-emerald-400 text-emerald-950 animate-pulse' : score >= 60 ? 'bg-amber-400 text-amber-950' : 'bg-rose-500 text-white'
          }`}>
            {score}%
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Visual SVG Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Visual Container Card */}
          <div className="w-full relative bg-gradient-to-b from-slate-50 to-emerald-50/40 rounded-2xl border-2 border-emerald-100 p-2 sm:p-4 overflow-hidden shadow-inner">
            {/* Target Status Header overlay */}
            <div className="flex items-center justify-between mb-1 px-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  {language === 'pt' ? 'O que DEVES fazer' : 'What YOU SHOULD do'}
                </span>
                {isPerfect ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'pt' ? '100% Correto!' : '100% Proper!'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    <Sliders className="w-3.5 h-3.5 text-amber-600" />
                    {language === 'pt' ? 'Em ajuste...' : 'Adjusting...'}
                  </span>
                )}
              </div>

              {/* Reset to bad posture challenge button */}
              <button
                type="button"
                onClick={() => setPreset('bad')}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 transition-colors shadow-2xs"
                title={language === 'pt' ? 'Recomeçar desafio' : 'Reset challenge'}
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>{language === 'pt' ? 'Reiniciar' : 'Reset'}</span>
              </button>
            </div>

            {/* SVG Visual Stage */}
            <div className="w-full aspect-[4/3] max-h-[380px] relative flex items-center justify-center">
              <svg viewBox="0 0 540 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="deskGradSim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f766e" />
                    <stop offset="100%" stopColor="#115e59" />
                  </linearGradient>
                  <linearGradient id="screenGradSim" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="displayGradSim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#bae6fd" />
                  </linearGradient>
                  <linearGradient id="shirtGradSim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="pantsGradSim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="chairGradSim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10b981" floodOpacity="0.6" />
                  </filter>
                  <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.6" />
                  </filter>
                  <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ef4444" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* 1. Floor Line & Boundary */}
                <line x1="20" y1="365" x2="520" y2="365" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" />
                {/* Vertical Reference Wall Line */}
                <line x1="480" y1="80" x2="480" y2="365" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />

                {/* 2. CHAIR (Ergonomic Office Chair with backrest) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'pt' ? 'Cadeira e encosto: ajustar coluna' : 'Chair backrest: adjust spine'}
                  className="cursor-pointer focus:outline-hidden"
                  onClick={() => setSelectedPart('spine')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPart('spine');
                    }
                  }}
                >
                  {/* Base & Casters */}
                  <rect x="185" y="300" width="10" height="60" fill="#334155" rx="2" />
                  <circle cx="160" cy="360" r="5.5" fill="#1e293b" />
                  <circle cx="220" cy="360" r="5.5" fill="#1e293b" />
                  <path d="M 160 360 L 190 352 L 220 360" stroke="#334155" strokeWidth="5" fill="none" strokeLinecap="round" />
                  {/* Seat Cushion */}
                  <rect x="142" y="248" width="76" height="14" rx="5" fill="url(#chairGradSim)" />
                  {/* Chair Backrest */}
                  <rect x="134" y="165" width="14" height="90" rx="6" fill="url(#chairGradSim)" />
                  <path d="M 141 248 L 141 268 L 188 268" stroke="#334155" strokeWidth="5.5" fill="none" />
                </g>

                {/* 3. DESK */}
                <rect x="220" y="215" width="165" height="15" rx="3" fill="url(#deskGradSim)" />
                <rect x="365" y="230" width="12" height="135" fill="#0f766e" rx="1" />
                {/* Keyboard & Mouse */}
                <rect x="240" y="210" width="45" height="5" rx="2" fill="#334155" />
                <rect x="290" y="211" width="12" height="4" rx="2" fill="#475569" />

                {/* 4. COMPUTER MONITOR & STAND (Interactive) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'pt' ? 'Ecrã do computador: ajustar altura' : 'Monitor: adjust height'}
                  className="cursor-pointer transition-all duration-300 focus:outline-hidden"
                  onClick={() => {
                    handleUpdate('screen', (posture.screen + 1) % 3);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleUpdate('screen', (posture.screen + 1) % 3);
                    }
                  }}
                >
                  {/* Stand base & riser */}
                  <rect x="338" y="210" width="34" height="5" rx="2" fill="#475569" />
                  <rect x="352" y={monitorY + 80} width="6" height={standHeight} fill="#64748b" />
                  {/* Monitor Body */}
                  <rect
                    x="336"
                    y={monitorY}
                    width="22"
                    height="85"
                    rx="4"
                    fill="url(#screenGradSim)"
                    filter={posture.screen === 2 ? 'url(#glowGreen)' : 'url(#glowAmber)'}
                  />
                  {/* Screen Display face */}
                  <rect x="338" y={monitorY + 3} width="16" height="79" rx="2" fill="url(#displayGradSim)" />
                  {/* Screen lines/content */}
                  <line x1="341" y1={monitorY + 14} x2="351" y2={monitorY + 14} stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                  <line x1="341" y1={monitorY + 22} x2="349" y2={monitorY + 22} stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="341" y1={monitorY + 30} x2="351" y2={monitorY + 30} stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Top of screen eye-alignment dot */}
                  <circle cx="338" cy={monitorY + 10} r="4.5" fill={posture.screen === 2 ? '#10b981' : '#f59e0b'} />

                  {/* Click hint badge for monitor */}
                  <g transform={`translate(325, ${monitorY - 18})`}>
                    <rect x="0" y="0" width="56" height="16" rx="8" fill={posture.screen === 2 ? '#dcfce7' : '#fef3c7'} stroke={posture.screen === 2 ? '#16a34a' : '#d97706'} strokeWidth="1" />
                    <text x="28" y="11" textAnchor="middle" fontSize="8" fontWeight="bold" fill={posture.screen === 2 ? '#166534' : '#92400e'}>
                      {posture.screen === 2 ? '✓ Ecrã OK' : '↕ Ajustar'}
                    </text>
                  </g>
                </g>

                {/* 5. FOOTREST & LEGS/FEET (Interactive) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'pt' ? 'Pés e apoio: ajustar pés' : 'Feet and footrest: adjust feet'}
                  className="cursor-pointer transition-all duration-300 focus:outline-hidden"
                  onClick={() => {
                    handleUpdate('feet', (posture.feet + 1) % 3);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleUpdate('feet', (posture.feet + 1) % 3);
                    }
                  }}
                >
                  {/* Footrest Wedge */}
                  {posture.feet === 2 && (
                    <polygon points="265,365 330,365 330,335 265,358" fill="#1e293b" />
                  )}

                  {/* Upper leg (thigh) & Lower leg (shin) */}
                  <path
                    d={`M ${hipX} ${hipY} L ${kneeX} ${kneeY} L ${footX} ${footY}`}
                    stroke="url(#pantsGradSim)"
                    strokeWidth="19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter={posture.feet === 2 ? 'url(#glowGreen)' : 'url(#glowAmber)'}
                  />

                  {/* Shoes */}
                  <g transform={`translate(${footX - 10}, ${footY - 8})`}>
                    <path d="M 0 12 L 28 2 C 34 0, 37 4, 34 10 L 4 18 Z" fill="#8b5cf6" />
                    <circle cx="16" cy="8" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Foot status indicator */}
                  <g transform="translate(255, 370)">
                    <text x="0" y="12" fontSize="9" fontWeight="bold" fill={posture.feet === 2 ? '#15803d' : '#b91c1c'}>
                      {posture.feet === 2 ? '✓ Pés bem apoiados' : '⚠️ Pés sem apoio'}
                    </text>
                  </g>
                </g>

                {/* 6. TORSO & SPINE (Interactive) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'pt' ? 'Tronco e coluna: ajustar postura da coluna' : 'Torso and spine: adjust back posture'}
                  className="cursor-pointer transition-all duration-300 focus:outline-hidden"
                  onClick={() => {
                    handleUpdate('spine', (posture.spine + 1) % 3);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleUpdate('spine', (posture.spine + 1) % 3);
                    }
                  }}
                >
                  {/* Spine colored visual curve line */}
                  <path
                    d={spinePath}
                    stroke={spineColor}
                    strokeWidth="7"
                    strokeDasharray={posture.spine === 2 ? 'none' : '4 3'}
                    strokeLinecap="round"
                    fill="none"
                    filter={posture.spine === 2 ? 'url(#glowGreen)' : 'url(#glowRed)'}
                  />

                  {/* Shirt / Torso main volume */}
                  <path
                    d={spinePath}
                    stroke="url(#shirtGradSim)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* 7. ARMS & HANDS (Interactive) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'pt' ? 'Braços e mãos: ajustar apoio dos braços' : 'Arms and hands: adjust arm support'}
                  className="cursor-pointer transition-all duration-300 focus:outline-hidden"
                  onClick={() => {
                    handleUpdate('arms', (posture.arms + 1) % 3);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleUpdate('arms', (posture.arms + 1) % 3);
                    }
                  }}
                >
                  {/* Upper arm & Forearm */}
                  <path
                    d={`M ${shoulderX} ${shoulderY} L ${elbowX} ${elbowY} L ${handX} ${handY}`}
                    stroke="#fed7aa"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter={posture.arms === 2 ? 'url(#glowGreen)' : 'url(#glowAmber)'}
                  />
                  {/* Sleeve */}
                  <path
                    d={`M ${shoulderX} ${shoulderY} L ${elbowX - 2} ${elbowY - 8}`}
                    stroke="url(#shirtGradSim)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Hands resting on keyboard */}
                  <circle cx={handX} cy={handY} r="5" fill="#fed7aa" />
                </g>

                {/* 8. HEAD & EYES (Interactive) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={language === 'pt' ? 'Cabeça e olhos: ajustar alinhamento da cabeça' : 'Head and eyes: adjust head alignment'}
                  className="cursor-pointer transition-all duration-300 focus:outline-hidden"
                  onClick={() => {
                    handleUpdate('head', (posture.head + 1) % 3);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleUpdate('head', (posture.head + 1) % 3);
                    }
                  }}
                >
                  {/* Neck */}
                  <line
                    x1={headX}
                    y1={headY + 12}
                    x2={spineEndX}
                    y2={spineEndY}
                    stroke="#fed7aa"
                    strokeWidth="11"
                    strokeLinecap="round"
                  />

                  {/* Head & Hair */}
                  <g transform={`rotate(${headRotation} ${headX} ${headY})`}>
                    {/* Hair back */}
                    <path
                      d={`M ${headX - 16} ${headY - 10} C ${headX - 28} ${headY}, ${headX - 30} ${headY + 28}, ${headX - 16} ${headY + 36} Z`}
                      fill="#78350f"
                    />
                    {/* Face circle */}
                    <circle
                      cx={headX}
                      cy={headY}
                      r="18"
                      fill="#fed7aa"
                      filter={posture.head === 2 ? 'url(#glowGreen)' : 'url(#glowAmber)'}
                    />
                    {/* Hair cap */}
                    <path
                      d={`M ${headX - 18} ${headY - 2} C ${headX - 18} ${headY - 20}, ${headX + 8} ${headY - 22}, ${headX + 17} ${headY - 8} C ${headX + 12} ${headY - 14}, ${headX - 4} ${headY - 14}, ${headX - 18} ${headY - 2} Z`}
                      fill="#78350f"
                    />
                    {/* Eye */}
                    <circle cx={headX + 9} cy={headY - 1} r="2" fill="#0f172a" />
                    {/* Smile */}
                    <path
                      d={`M ${headX + 6} ${headY + 7} Q ${headX + 10} ${headY + 11} ${headX + 13} ${headY + 7}`}
                      stroke="#9a3412"
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Cheerful blush */}
                    <circle cx={headX + 4} cy={headY + 4} r="2.8" fill="#fca5a5" opacity="0.7" />
                  </g>
                </g>

                {/* 9. LASER EYE-LEVEL LINE (Appears green when aligned with top of monitor) */}
                {posture.head === 2 && posture.screen === 2 && posture.spine === 2 ? (
                  <g>
                    <line
                      x1={eyeX}
                      y1={eyeY}
                      x2={338}
                      y2={monitorY + 10}
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                    <circle cx={338} cy={monitorY + 10} r="4" fill="#10b981" />
                    <circle cx={eyeX} cy={eyeY} r="3" fill="#10b981" />
                    <rect x="210" y={eyeY - 20} width="115" height="17" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                    <text x="267" y={eyeY - 8} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#166534">
                      ✓ Linha de Visão Alinhada
                    </text>
                  </g>
                ) : (
                  <line
                    x1={eyeX}
                    y1={eyeY}
                    x2={338}
                    y2={monitorY + 10}
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}
              </svg>
            </div>

            {/* Quick Interactive Hint Overlay */}
            <div className="text-center mt-1">
              <span className="text-[11px] font-semibold text-slate-500 inline-flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                💡 {language === 'pt' ? 'Dica: Clica na cabeça, costas, ecrã, braços ou pés na imagem para ajustar!' : 'Tip: Click the head, back, screen, arms or feet in the drawing to adjust!'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Checklist & Fine Controls */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Posture Checklist (Matching the User's Image requirements) */}
          <div className="bg-emerald-50/50 rounded-2xl border-2 border-emerald-200/80 p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'pt' ? 'Critérios de Ergonomia' : 'Ergonomic Criteria'}</span>
            </h4>

            <div className="space-y-2 text-xs sm:text-sm">
              {/* 1. Costas */}
              <button
                type="button"
                onClick={() => handleUpdate('spine', posture.spine === 2 ? 0 : 2)}
                aria-pressed={posture.spine === 2}
                className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  posture.spine === 2
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {posture.spine === 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span>
                    <strong>{language === 'pt' ? 'Costas direitas' : 'Straight back'}</strong> {language === 'pt' ? 'e bem apoiadas.' : 'and firmly supported.'}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/70 text-slate-600 border border-slate-200">
                  {posture.spine === 2 ? 'OK' : 'Ajustar'}
                </span>
              </button>

              {/* 2. Cabeça */}
              <button
                type="button"
                onClick={() => handleUpdate('head', posture.head === 2 ? 0 : 2)}
                aria-pressed={posture.head === 2}
                className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  posture.head === 2
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {posture.head === 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span>
                    <strong>{language === 'pt' ? 'Cabeça direita' : 'Straight head'}</strong> {language === 'pt' ? 'e alinhada.' : 'and aligned.'}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/70 text-slate-600 border border-slate-200">
                  {posture.head === 2 ? 'OK' : 'Ajustar'}
                </span>
              </button>

              {/* 3. Ecrã */}
              <button
                type="button"
                onClick={() => handleUpdate('screen', posture.screen === 2 ? 0 : 2)}
                aria-pressed={posture.screen === 2}
                className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  posture.screen === 2
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {posture.screen === 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span>
                    <strong>{language === 'pt' ? 'Ecrã à altura dos olhos' : 'Screen at eye level'}</strong> {language === 'pt' ? '(nem alto nem baixo).' : '(neither high nor low).'}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/70 text-slate-600 border border-slate-200">
                  {posture.screen === 2 ? 'OK' : 'Ajustar'}
                </span>
              </button>

              {/* 4. Ombros e Braços */}
              <button
                type="button"
                onClick={() => handleUpdate('arms', posture.arms === 2 ? 0 : 2)}
                aria-pressed={posture.arms === 2}
                className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  posture.arms === 2
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {posture.arms === 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span>
                    <strong>{language === 'pt' ? 'Ombros relaxados' : 'Relaxed shoulders'}</strong> {language === 'pt' ? 'e braços apoiados.' : 'and supported arms.'}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/70 text-slate-600 border border-slate-200">
                  {posture.arms === 2 ? 'OK' : 'Ajustar'}
                </span>
              </button>

              {/* 5. Pés */}
              <button
                type="button"
                onClick={() => handleUpdate('feet', posture.feet === 2 ? 0 : 2)}
                aria-pressed={posture.feet === 2}
                className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  posture.feet === 2
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {posture.feet === 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span>
                    <strong>{language === 'pt' ? 'Pés bem apoiados' : 'Feet well supported'}</strong> {language === 'pt' ? 'no chão ou descanso.' : 'on the floor or footrest.'}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/70 text-slate-600 border border-slate-200">
                  {posture.feet === 2 ? 'OK' : 'Ajustar'}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Presets / Test scenarios */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
              {language === 'pt' ? '🧪 Testar Cenários Frequentes:' : '🧪 Test Common Scenarios:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPreset('bad')}
                className="text-xs font-semibold p-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 text-left transition-colors"
              >
                🔴 {language === 'pt' ? 'Postura Errada' : 'Bad Posture'}
              </button>
              <button
                type="button"
                onClick={() => setPreset('screenLow')}
                className="text-xs font-semibold p-2 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 text-left transition-colors"
              >
                🟡 {language === 'pt' ? 'Ecrã Muito Baixo' : 'Low Screen'}
              </button>
              <button
                type="button"
                onClick={() => setPreset('feetDangling')}
                className="text-xs font-semibold p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 text-left transition-colors"
              >
                🔵 {language === 'pt' ? 'Pés no Ar' : 'Dangling Feet'}
              </button>
              <button
                type="button"
                onClick={() => setPreset('perfect')}
                className="text-xs font-semibold p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-left transition-colors font-bold"
              >
                🟢 {language === 'pt' ? 'Postura 100% OK' : '100% Proper'}
              </button>
            </div>
          </div>

          {/* Bottom Success Banner */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 text-center ${
            isPerfect
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400 text-white shadow-md animate-in zoom-in-95'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {isPerfect ? (
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-black text-sm sm:text-base">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>⭐ {language === 'pt' ? 'Garante máximo conforto, foco e saúde!' : 'Ensures maximum comfort, focus and health!'}</span>
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  {language === 'pt'
                    ? 'Excelente! Aprendeste todos os segredos de uma postura de trabalho saudável!'
                    : 'Great job! You mastered all ergonomic posture guidelines!'}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
                <span>⚠️</span>
                <span>
                  {language === 'pt'
                    ? `Faltam corrigir ${5 - totalCorrect} ponto(s) para obteres 100% de ergonomia!`
                    : `Correct ${5 - totalCorrect} more point(s) to reach 100% ergonomics!`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
