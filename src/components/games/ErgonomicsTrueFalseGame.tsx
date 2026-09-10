import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, Check, X, Info } from 'lucide-react';
import { Language } from '../../types';
import { AudioSpeakButton } from '../AudioSpeakButton';

interface ErgonomicsTrueFalseGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface ErgonomicsItem {
  id: number;
  title: { pt: string; en: string };
  desc: { pt: string; en: string };
  isCorrectSituation: boolean; // true = Verdadeiro (hábito correto), false = Falso (hábito incorreto)
  explanation: { pt: string; en: string };
  illustration: React.ReactNode;
}

// 1. Pés pendurados no ar sem apoio no chão (Incorreto / Falso)
const DanglingFeetIllustration = () => (
  <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
    <rect width="400" height="130" rx="12" fill="#F0F9FF" />
    
    {/* Floor line */}
    <line x1="20" y1="116" x2="380" y2="116" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="120" y1="122" x2="280" y2="122" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />

    {/* Desk leg & top (right) */}
    <rect x="270" y="15" width="90" height="8" rx="2" fill="#D97706" />
    <rect x="330" y="23" width="10" height="93" rx="2" fill="#F59E0B" />

    {/* Office Swivel Chair */}
    {/* Chair backrest */}
    <rect x="65" y="16" width="14" height="48" rx="7" fill="#0284C7" />
    <rect x="73" y="40" width="8" height="24" rx="3" fill="#0369A1" />
    {/* Seat cushion */}
    <rect x="72" y="58" width="60" height="12" rx="5" fill="#0284C7" />
    {/* Chair pole and base */}
    <rect x="98" y="70" width="8" height="25" fill="#334155" />
    <path d="M70 95 L102 92 L134 95" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    {/* Wheels */}
    <circle cx="70" cy="104" r="5" fill="#0F172A" />
    <circle cx="102" cy="103" r="5" fill="#0F172A" />
    <circle cx="134" cy="104" r="5" fill="#0F172A" />

    {/* Student's legs (thigh + dangling lower legs) */}
    {/* Thigh */}
    <path d="M92 56 L150 56" stroke="#2563EB" strokeWidth="18" strokeLinecap="round" />
    {/* Lower leg angled back, not reaching floor */}
    <path d="M150 56 L180 88" stroke="#1D4ED8" strokeWidth="16" strokeLinecap="round" />
    {/* Sneakers dangling */}
    <path d="M174 86 L205 92 C210 93 214 97 210 102 C205 106 185 104 172 95 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <rect x="174" y="94" width="28" height="4" rx="2" fill="#EF4444" />

    {/* Left foot slightly behind */}
    <path d="M165 82 L196 87 C200 88 204 92 200 96 C196 100 180 98 165 91 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />

    {/* Dangling stress indicators (Orange waves showing lack of floor support) */}
    <path d="M195 108 Q200 114 205 108" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M182 108 Q187 114 192 108" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M208 107 Q213 113 218 107" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />

    {/* Floating gap indicator */}
    <line x1="168" y1="116" x2="225" y2="116" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
  </svg>
);

// 2. Costas curvadas para a frente ao portátil (Incorreto / Falso)
const SlouchingSpineIllustration = () => (
  <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
    <rect width="400" height="130" rx="12" fill="#FFF1F2" />

    {/* Desk table */}
    <rect x="220" y="85" width="165" height="8" rx="2" fill="#CBD5E1" />
    <rect x="360" y="93" width="8" height="27" rx="1" fill="#94A3B8" />

    {/* Laptop on desk */}
    <rect x="235" y="80" width="45" height="5" rx="1.5" fill="#334155" />
    <line x1="275" y1="80" x2="288" y2="48" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <polygon points="275,80 287,50 289,51 277,81" fill="#64748B" />

    {/* Chair back far behind */}
    <rect x="45" y="45" width="12" height="65" rx="6" fill="#1E293B" />

    {/* Student Hunched / Slouching */}
    {/* Body / Torso in blue hoodie curving forward */}
    <path d="M85 88 C100 60 130 55 165 72 L185 85" fill="none" stroke="#2563EB" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />

    {/* Head tilted down towards laptop */}
    <circle cx="195" cy="48" r="20" fill="#FED7AA" />
    {/* Brown hair */}
    <path d="M180 48 C180 30 205 28 214 36 C218 42 216 52 214 54 C205 45 195 48 185 52 Z" fill="#78350F" />
    {/* Eye looking down */}
    <circle cx="205" cy="50" r="2.5" fill="#1E293B" />
    <path d="M205 58 Q209 60 212 57" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

    {/* Arms leaning on desk */}
    <path d="M160 76 L210 84 L240 85" stroke="#1D4ED8" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

    {/* RED DASHED CURVE ON SPINE highlighting bad curved posture */}
    <path d="M80 82 C105 40 145 38 180 52" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="5 4" />

    {/* Red tension stress marks on spine / neck */}
    <path d="M110 32 L115 40" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M125 26 L127 35" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M142 28 L140 37" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3. Pausa ativa de 5 min com alongamento (Correto / Verdadeiro)
const StretchingBreakIllustration = () => (
  <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
    <rect width="400" height="130" rx="12" fill="#ECFDF5" />

    {/* Green Plant on the left */}
    <path d="M20 120 Q35 70 50 120" fill="#22C55E" />
    <path d="M35 120 Q55 50 65 120" fill="#16A34A" />
    <path d="M10 120 Q30 85 40 120" fill="#4ADE80" />

    {/* Cheerful student stretching arms upwards */}
    {/* Body in orange t-shirt */}
    <rect x="110" y="68" width="34" height="45" rx="12" fill="#EA580C" />
    {/* Head */}
    <circle cx="127" cy="46" r="18" fill="#FED7AA" />
    {/* Brown hair */}
    <path d="M112 44 C112 28 140 26 144 38 C144 48 132 46 112 48 Z" fill="#78350F" />
    {/* Happy smiling face */}
    <circle cx="123" cy="44" r="2" fill="#1E293B" />
    <circle cx="133" cy="44" r="2" fill="#1E293B" />
    <path d="M123 52 Q128 58 133 52" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

    {/* Arms stretched up high */}
    <path d="M112 75 Q90 45 78 22" stroke="#EA580C" strokeWidth="12" strokeLinecap="round" />
    <circle cx="78" cy="20" r="6" fill="#FED7AA" />
    <path d="M142 75 Q165 45 178 22" stroke="#EA580C" strokeWidth="12" strokeLinecap="round" />
    <circle cx="178" cy="20" r="6" fill="#FED7AA" />

    {/* Chair back */}
    <rect x="94" y="55" width="8" height="50" rx="4" fill="#0284C7" />

    {/* Big 5-Minute Timer Clock Badge */}
    <g transform="translate(230, 20)">
      <circle cx="36" cy="36" r="32" fill="#FFFFFF" stroke="#0284C7" strokeWidth="4" />
      <circle cx="36" cy="36" r="3" fill="#0369A1" />
      {/* Clock hands showing 5 min */}
      <line x1="36" y1="36" x2="36" y2="16" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="36" x2="52" y2="24" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
      {/* 5 min bold label */}
      <rect x="12" y="74" width="48" height="18" rx="6" fill="#0284C7" />
      <text x="36" y="87" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif">5 min</text>
    </g>

    {/* Laptop closed/resting on desk on the right */}
    <rect x="310" y="85" width="55" height="6" rx="2" fill="#475569" />
    <line x1="345" y1="85" x2="355" y2="58" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 4. Topo do monitor ao nível dos olhos com seta verde (Correto / Verdadeiro)
const EyeLevelMonitorIllustration = () => (
  <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
    <rect width="400" height="130" rx="12" fill="#F0FDF4" />

    {/* Student sitting straight with green hoodie */}
    {/* Straight Torso */}
    <rect x="92" y="75" width="36" height="42" rx="10" fill="#16A34A" />
    {/* Head straight upright */}
    <circle cx="110" cy="50" r="18" fill="#FED7AA" />
    {/* Hair */}
    <path d="M96 48 C96 32 124 30 128 42 C128 52 118 50 96 52 Z" fill="#78350F" />
    {/* Eye looking directly forward */}
    <circle cx="118" cy="49" r="2.5" fill="#1E293B" />
    <path d="M117 57 Q121 60 125 57" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

    {/* Straight Chair Back supporting spine */}
    <rect x="76" y="45" width="10" height="65" rx="5" fill="#0284C7" />

    {/* Desk on right */}
    <rect x="230" y="88" width="145" height="8" rx="2" fill="#94A3B8" />

    {/* Monitor elevated properly at eye level */}
    {/* Screen stand */}
    <rect x="300" y="78" width="10" height="10" fill="#334155" />
    <rect x="285" y="86" width="40" height="3" rx="1.5" fill="#1E293B" />
    {/* Monitor display */}
    <rect x="272" y="32" width="66" height="48" rx="4" fill="#0F172A" />
    <rect x="276" y="36" width="58" height="40" rx="2" fill="#38BDF8" />

    {/* GREEN DASHED ARROW directly from eye to top bezel of monitor */}
    <line x1="126" y1="49" x2="270" y2="49" stroke="#16A34A" strokeWidth="3.5" strokeDasharray="6 4" />
    <polygon points="274,49 264,43 264,55" fill="#16A34A" />
  </svg>
);

// 5. Candeeiro de secretária com sala bem iluminada e sem encandeamento (Correto / Verdadeiro)
const DeskLightingIllustration = () => (
  <svg viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
    {/* Bright, well-lit cheerful room background */}
    <rect width="400" height="130" rx="12" fill="#F8FAFC" />

    {/* Natural Daylight Window on the left */}
    <rect x="20" y="14" width="64" height="68" rx="6" fill="#E0F2FE" stroke="#94A3B8" strokeWidth="2" />
    <line x1="52" y1="14" x2="52" y2="82" stroke="#94A3B8" strokeWidth="2" />
    <line x1="20" y1="48" x2="84" y2="48" stroke="#94A3B8" strokeWidth="2" />
    {/* Sun in window */}
    <circle cx="68" cy="32" r="10" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.5" />
    {/* Soft daylight beams coming from window */}
    <polygon points="84,20 160,88 120,88 84,50" fill="#BAE6FD" opacity="0.35" />

    {/* Floor base line */}
    <line x1="10" y1="118" x2="390" y2="118" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />

    {/* Ambient Ceiling Light at the top */}
    <rect x="185" y="0" width="30" height="6" fill="#64748B" rx="1" />
    <polygon points="190,6 210,6 218,15 182,15" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
    <circle cx="200" cy="17" r="4" fill="#FDE047" />
    {/* Soft ambient ceiling glow rays */}
    <path d="M172 18 Q200 32 228 18" stroke="#FEF08A" strokeWidth="2" strokeDasharray="3 3" />

    {/* Desk table */}
    <rect x="105" y="86" width="270" height="8" rx="2" fill="#D97706" />
    <rect x="120" y="94" width="8" height="24" rx="1" fill="#B45309" />
    <rect x="355" y="94" width="8" height="24" rx="1" fill="#B45309" />

    {/* Potted Plant on desk */}
    <rect x="115" y="74" width="14" height="12" rx="2" fill="#78350F" />
    <circle cx="122" cy="68" r="9" fill="#16A34A" />

    {/* Clean Clear Monitor (No glare, bright display) */}
    <rect x="155" y="38" width="68" height="44" rx="4" fill="#1E293B" />
    <rect x="159" y="42" width="60" height="36" rx="2" fill="#38BDF8" />
    {/* Monitor screen content (clean chart & checkmark) */}
    <rect x="165" y="48" width="24" height="4" rx="1" fill="#FFFFFF" />
    <rect x="165" y="55" width="48" height="3" rx="1" fill="#E0F2FE" />
    <rect x="165" y="61" width="36" height="3" rx="1" fill="#E0F2FE" />
    <circle cx="206" cy="64" r="5" fill="#22C55E" />
    <path d="M204 64 L205.5 66 L208.5 62" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

    {/* Monitor stand */}
    <rect x="185" y="82" width="8" height="4" fill="#334155" />
    <rect x="175" y="85" width="28" height="2" rx="1" fill="#1E293B" />

    {/* Ergonomic Task Desk Lamp on the right */}
    <g transform="translate(285, 26)">
      {/* Lamp base */}
      <ellipse cx="40" cy="60" rx="14" ry="4" fill="#475569" />
      {/* Lamp stand angled forward */}
      <path d="M40 60 L30 30 L10 18" stroke="#64748B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lamp shade head pointing downward onto notebook/desk surface */}
      <path d="M4 26 L18 10 L24 16 L8 32 Z" fill="#2563EB" />
      <polygon points="2,28 14,38 8,42 -2,32" fill="#60A5FA" />
      
      {/* Bright Warm Light Cone illuminating desk surface only (not hitting monitor) */}
      <polygon points="4,34 -48,60 25,60" fill="#FDE047" opacity="0.45" />
      <polygon points="3,34 -25,60 12,60" fill="#F59E0B" opacity="0.3" />
      {/* Light bulb */}
      <circle cx="4" cy="34" r="5" fill="#FEF08A" />

      {/* Desk Notebook being clearly illuminated */}
      <rect x="-35" y="53" width="26" height="7" rx="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="-30" y1="56" x2="-14" y2="56" stroke="#94A3B8" strokeWidth="1" />
    </g>

    {/* Room Lighting Badge */}
    <g transform="translate(240, 10)">
      <rect x="0" y="0" width="88" height="18" rx="9" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1" />
      <text x="44" y="13" textAnchor="middle" fill="#92400E" fontSize="9.5" fontWeight="800" fontFamily="sans-serif">☀️ Sala Bem Iluminada</text>
    </g>
  </svg>
);

export const ErgonomicsTrueFalseGame: React.FC<ErgonomicsTrueFalseGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, boolean | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const ITEMS: ErgonomicsItem[] = [
    {
      id: 1,
      title: {
        pt: 'Pés pendurados no ar sem apoio no chão.',
        en: 'Feet dangling in the air without touching the floor.',
      },
      desc: {
        pt: 'Se os pés não chegarem ao chão, deixá-los pendurados durante as aulas ou estudo.',
        en: 'Leaving feet dangling without support while working at the desk.',
      },
      isCorrectSituation: false, // Falso
      explanation: {
        pt: '❌ Falso! Os pés nunca devem ficar pendurados. Devem assentar totalmente no chão ou num apoio de pés para não comprimir as coxas e a coluna.',
        en: '❌ False! Feet must rest flat on the floor or on a footrest to prevent thigh and lower back strain.',
      },
      illustration: <DanglingFeetIllustration />,
    },
    {
      id: 2,
      title: {
        pt: 'Costas curvadas para a frente ao portátil.',
        en: 'Hunched spine curving forward towards laptop.',
      },
      desc: {
        pt: 'Sentar com a coluna curvada e a cabeça inclinada para a frente a olhar para baixo.',
        en: 'Sitting slouched with spine bent forward looking down at the laptop.',
      },
      isCorrectSituation: false, // Falso
      explanation: {
        pt: '❌ Falso! Curvar as costas como um caracol causa dores no pescoço e na coluna. Deves manter as costas direitas e apoiadas na cadeira.',
        en: '❌ False! Slouching bends the spine and strains the neck. Keep your back straight against the chair backrest.',
      },
      illustration: <SlouchingSpineIllustration />,
    },
    {
      id: 3,
      title: {
        pt: 'Pausas ativas de 5 minutos com alongamentos.',
        en: '5-minute active stretching breaks.',
      },
      desc: {
        pt: 'A cada 45 a 60 minutos, levantar para esticar braços, pernas e descansar os olhos.',
        en: 'Standing up every 45-60 minutes to stretch your arms, legs, and relax your eyes.',
      },
      isCorrectSituation: true, // Verdadeiro
      explanation: {
        pt: '✅ Verdadeiro! Fazer pausas de 3 a 5 minutos relaxa os músculos, melhora a circulação e ajuda a manter a concentração.',
        en: '✅ True! Active 5-minute breaks relieve muscle fatigue and restore focus.',
      },
      illustration: <StretchingBreakIllustration />,
    },
    {
      id: 4,
      title: {
        pt: 'Topo do monitor alinhado ao nível dos olhos.',
        en: 'Top of monitor aligned with horizontal eye level.',
      },
      desc: {
        pt: 'Posicionar o ecrã de forma a que a linha de visão horizontal toque no topo do monitor.',
        en: 'Positioning the screen so horizontal line of sight hits the upper bezel of the display.',
      },
      isCorrectSituation: true, // Verdadeiro
      explanation: {
        pt: '✅ Verdadeiro! O topo do ecrã à altura dos olhos evita que tenhas de dobrar o pescoço para cima ou para baixo.',
        en: '✅ True! Having the top edge at eye level prevents neck strain from looking down or up.',
      },
      illustration: <EyeLevelMonitorIllustration />,
    },
    {
      id: 5,
      title: {
        pt: 'Sala bem iluminada e luz na mesa sem reflexos no ecrã.',
        en: 'Well-lit room and desk lighting without screen glare.',
      },
      desc: {
        pt: 'Estudar num espaço com boa luz natural/ambiente e candeeiro direcionado para a mesa, sem encandear o monitor.',
        en: 'Studying in a well-lit room with natural/ambient light and a task lamp focused on the desk without screen glare.',
      },
      isCorrectSituation: true, // Verdadeiro
      explanation: {
        pt: '✅ Verdadeiro! Um espaço bem iluminado (luz natural e ambiente) e sem reflexos diretos no ecrã protege a visão contra fadiga ocular e dores de cabeça.',
        en: '✅ True! A well-illuminated workspace with natural/ambient light and no direct screen glare protects eyesight and prevents headaches.',
      },
      illustration: <DeskLightingIllustration />,
    },
  ];

  const handleSelect = (itemId: number, value: boolean) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const allAnswered = Object.values(selectedAnswers).every((val) => val !== null);
  const answeredCount = Object.values(selectedAnswers).filter((val) => val !== null).length;

  const calculateScore = () => {
    let correctCount = 0;
    ITEMS.forEach((item) => {
      if (selectedAnswers[item.id] === item.isCorrectSituation) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / ITEMS.length) * 100);
    const score = correctCount * 20; // 20 XP per correct = 100 XP total
    return { correctCount, percentage, score };
  };

  const handleVerify = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    });
    setIsSubmitted(false);
  };

  const handleFinishGame = () => {
    const { score, percentage } = calculateScore();
    onFinish(score, 100, percentage);
    onBack();
  };

  const { correctCount, percentage, score } = calculateScore();

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Top Navigation & Audio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar aos Desafios' : 'Back to Challenges'}</span>
        </button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <AudioSpeakButton
            id="audio-ergo-tf-challenge"
            text={
              language === 'pt'
                ? 'Desafio de Ergonomia: Postura e Hábitos: Verdadeiro ou Falso? Observa as imagens de cada situação e escolhe se o hábito apresentado é correto (Verdadeiro) ou incorreto (Falso). Clica em Verificar Respostas quando terminares.'
                : 'Ergonomics Challenge: Posture and Habits: True or False? Look at the images and decide whether each habit is healthy and correct (True) or improper (False).'
            }
            language={language}
            label={language === 'pt' ? 'Ouvir Instruções' : 'Listen Instructions'}
            variant="pill"
            size="sm"
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-6">
        {/* Challenge Header Card matching screenshot */}
        <div className="flex items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-100/90 text-purple-700 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-2xs">
              🪑
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                {language === 'pt' ? 'Postura e Hábitos: Verdadeiro ou Falso?' : 'Posture and Habits: True or False?'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {language === 'pt'
                  ? 'Observa as imagens e escolhe se a situação é correta (Verdadeiro) ou não (Falso).'
                  : 'Look at the images and choose whether the situation is correct (True) or not (False).'}
              </p>
            </div>
          </div>

          {/* Progress pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold shrink-0">
            <span>{answeredCount}/5</span>
            <span className="hidden sm:inline">{language === 'pt' ? 'respondidas' : 'answered'}</span>
          </div>
        </div>

        {/* 5 Questions List matching exact screenshot layout */}
        <div className="space-y-4 sm:space-y-5 mt-5">
          {ITEMS.map((item) => {
            const currentSelection = selectedAnswers[item.id];
            const isAnswered = currentSelection !== null;
            const isCorrect = isSubmitted && currentSelection === item.isCorrectSituation;
            const isWrong = isSubmitted && currentSelection !== item.isCorrectSituation;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 p-3 sm:p-4 ${
                  isSubmitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                      : 'border-rose-300 bg-rose-50/20 shadow-xs'
                    : isAnswered
                    ? 'border-blue-200 bg-blue-50/10 shadow-2xs'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Left: Number Badge */}
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-100 text-slate-800 font-black text-base sm:text-lg flex items-center justify-center shrink-0 shadow-inner">
                    {item.id}
                  </div>

                  {/* Center: Visual Illustrated Banner */}
                  <div className="flex-1 w-full max-w-lg h-24 sm:h-28 rounded-xl overflow-hidden border border-slate-200/80 shadow-2xs flex items-center justify-center bg-slate-50">
                    {item.illustration}
                  </div>

                  {/* Right: Verdadeiro / Falso Buttons */}
                  <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto justify-center">
                    {/* Verdadeiro Button */}
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id, true)}
                      disabled={isSubmitted}
                      className={`min-w-[120px] sm:min-w-[136px] py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        currentSelection === true
                          ? isSubmitted
                            ? item.isCorrectSituation
                              ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
                              : 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400'
                            : 'bg-emerald-600 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                          : 'bg-emerald-100/80 hover:bg-emerald-200/80 text-emerald-900 border border-emerald-300/80 hover:border-emerald-400'
                      } ${isSubmitted ? 'cursor-default' : 'active:scale-97'}`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          currentSelection === true ? 'text-white' : 'text-emerald-700'
                        }`}
                      />
                      <span>{language === 'pt' ? 'Verdadeiro' : 'True'}</span>
                    </button>

                    {/* Falso Button */}
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id, false)}
                      disabled={isSubmitted}
                      className={`min-w-[120px] sm:min-w-[136px] py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        currentSelection === false
                          ? isSubmitted
                            ? !item.isCorrectSituation
                              ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
                              : 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400'
                            : 'bg-rose-600 text-white shadow-md scale-102 ring-2 ring-rose-300'
                          : 'bg-rose-100/80 hover:bg-rose-200/80 text-rose-900 border border-rose-300/80 hover:border-rose-400'
                      } ${isSubmitted ? 'cursor-default' : 'active:scale-97'}`}
                    >
                      <XCircle
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          currentSelection === false ? 'text-white' : 'text-rose-700'
                        }`}
                      />
                      <span>{language === 'pt' ? 'Falso' : 'False'}</span>
                    </button>
                  </div>
                </div>

                {/* Feedback Explanation Accordion / Card when Submitted */}
                {isSubmitted && (
                  <div
                    className={`mt-3 pt-3 border-t text-xs sm:text-sm font-medium flex items-start gap-2 animate-in fade-in ${
                      isCorrect
                        ? 'border-emerald-200 text-emerald-900'
                        : 'border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isCorrect ? (
                        <Check className="w-4 h-4 text-emerald-600 font-black" />
                      ) : (
                        <X className="w-4 h-4 text-rose-600 font-black" />
                      )}
                    </div>
                    <div>
                      <p className="leading-relaxed">{item.explanation[language]}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Verification and Submission Footer Bar */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {!isSubmitted ? (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
              <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                {answeredCount < 5
                  ? language === 'pt'
                    ? `Faltam ${5 - answeredCount} situações por classificar.`
                    : `${5 - answeredCount} items remaining.`
                  : language === 'pt'
                  ? 'Todas as 5 situações foram classificadas! Clica em Verificar Respostas.'
                  : 'All 5 items answered! Click Verify Answers.'}
              </div>

              <button
                type="button"
                onClick={handleVerify}
                disabled={!allAnswered}
                className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  allAnswered
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'pt' ? 'Verificar Respostas' : 'Verify Answers'}</span>
              </button>
            </div>
          ) : (
            <div className="w-full">
              {/* Score summary banner */}
              <div
                className={`p-5 rounded-2xl border mb-5 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  percentage >= 80
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : percentage >= 50
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs ${
                      percentage >= 80
                        ? 'bg-emerald-600 text-white'
                        : percentage >= 50
                        ? 'bg-amber-500 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {percentage >= 80 ? '🏆' : percentage >= 50 ? '⭐' : '💡'}
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg">
                      {percentage >= 80
                        ? language === 'pt'
                          ? 'Excelente! Dominas a Ergonomia!'
                          : 'Excellent! You mastered Ergonomics!'
                        : percentage >= 50
                        ? language === 'pt'
                          ? 'Bom trabalho! Quase lá!'
                          : 'Good job! Almost there!'
                        : language === 'pt'
                        ? 'Vale a pena rever as boas práticas!'
                        : 'Keep practicing ergonomics!'}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium opacity-90">
                      {language === 'pt'
                        ? `Acertaste em ${correctCount} de 5 situações (${percentage}% de precisão). Ganhaste +${score} XP!`
                        : `You got ${correctCount} out of 5 correct (${percentage}%). Earned +${score} XP!`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black">{percentage}%</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Tentar Novamente' : 'Try Again'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinishGame}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Concluir Desafio' : 'Complete Challenge'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
