import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Repeat,
  Recycle,
  Trash2,
  TreePine,
  Sun,
  Leaf,
  Award,
  Check,
} from 'lucide-react';

interface PlanetDigitalMissionGameProps {
  language: 'pt' | 'en';
  onBack: () => void;
  onFinish?: (score: number, maxScore: number, percentage: number) => void;
}

type DestinationZone = 'repair' | 'reuse' | 'recycle' | 'trash';

interface WasteItem {
  id: number;
  name: { pt: string; en: string };
  icon: string;
  description: { pt: string; en: string };
  correctZone: DestinationZone;
  feedback: { pt: string; en: string };
}

const ITEMS_DATA: WasteItem[] = [
  {
    id: 1,
    name: { pt: 'Tablet Funcional', en: 'Working Tablet' },
    icon: '📱',
    description: {
      pt: 'Tablet antigo que ainda funciona perfeitamente, mas a família já tem um novo e este ficou guardado numa gaveta.',
      en: 'Older tablet that still works perfectly, but the family got a new one and it was stored in a drawer.',
    },
    correctZone: 'reuse',
    feedback: {
      pt: 'Boa escolha! 🔄 Este tablet ainda funciona. Em vez de o deitar fora, pode ser reutilizado por outra pessoa ou doado à escola.',
      en: 'Great choice! 🔄 This tablet still works. Instead of tossing it, it can be reused by someone else or donated to school.',
    },
  },
  {
    id: 2,
    name: { pt: 'Telemóvel Avariado', en: 'Broken Phone' },
    icon: '📴',
    description: {
      pt: 'Telemóvel antigo com a placa queimada que já não liga nem tem conserto.',
      en: 'Old phone with burnt motherboard that no longer turns on and cannot be repaired.',
    },
    correctZone: 'recycle',
    feedback: {
      pt: 'Excelente! ♻️ Telemóveis avariados contêm materiais preciosos e metais pesados. Devem ser entregues num Ponto Eletrão ou ecocentro para reciclagem.',
      en: 'Excellent! ♻️ Broken phones contain valuable metals and hazardous substances. They should be recycled at dedicated e-waste points.',
    },
  },
  {
    id: 3,
    name: { pt: 'Computador com Tecla Solta', en: 'Laptop with Broken Key' },
    icon: '💻',
    description: {
      pt: 'Portátil rápido com um pequeno problema mecânico numa tecla e no cabo de alimentação que um técnico consegue arranjar.',
      en: 'Fast laptop with a minor mechanical fault in a key and power jack that a technician can easily fix.',
    },
    correctZone: 'repair',
    feedback: {
      pt: 'Brilhante! 🔧 Reparar pequenos problemas prolonga a vida útil do computador e poupa matérias-primas e recursos do planeta!',
      en: 'Brilliant! 🔧 Repairing small issues extends the computer’s lifetime and saves natural resources!',
    },
  },
  {
    id: 4,
    name: { pt: 'Pilhas Gastas', en: 'Spent Batteries' },
    icon: '🔋',
    description: {
      pt: 'Pilhas e baterias que já gastaram toda a carga num comando de consola.',
      en: 'Batteries that have completely run out of power inside a game controller.',
    },
    correctZone: 'recycle',
    feedback: {
      pt: 'Certíssimo! 🔋 As pilhas contêm metais pesados e nunca devem ir para o lixo comum. Devem ser sempre colocadas no Pilhão para reciclagem segura!',
      en: 'Spot on! 🔋 Batteries contain toxic heavy metals and must NEVER go into normal trash. Always dispose of them in dedicated battery bins!',
    },
  },
  {
    id: 5,
    name: { pt: 'Carregador Avariado', en: 'Damaged Charger' },
    icon: '🔌',
    description: {
      pt: 'Carregador antigo com os fios partidos e queimados que já não transmite eletricidade.',
      en: 'Old charger with frayed broken wires that no longer conducts electricity.',
    },
    correctZone: 'recycle',
    feedback: {
      pt: 'Muito bem! ♻️ Carregadores e fios avariados são resíduos eletrónicos (REEE) e devem ser entregues num local apropriado para reciclagem.',
      en: 'Well done! ♻️ Damaged cables and chargers are e-waste (WEEE) and must be delivered to an appropriate recycling drop-off.',
    },
  },
  {
    id: 6,
    name: { pt: 'Computador Antigo Operacional', en: 'Working Desktop PC' },
    icon: '🖥️',
    description: {
      pt: 'Computador antigo que ainda funciona muito bem para escrever textos e fazer pesquisas escolares.',
      en: 'Old desktop computer that still works great for word processing and school research.',
    },
    correctZone: 'reuse',
    feedback: {
      pt: 'Fantástico! 🔄 Se ainda funciona, pode ser doado a um colega, biblioteca ou associação que precise dele, evitando novo lixo!',
      en: 'Fantastic! 🔄 If it still works, it can be donated to a student, library, or charity, preventing unnecessary waste!',
    },
  },
  {
    id: 7,
    name: { pt: 'Caixa de Cartão de Embalagem', en: 'Cardboard Box Packaging' },
    icon: '📦',
    description: {
      pt: 'Caixa de cartão limpa e vazia que protegia um teclado novo na loja.',
      en: 'Clean, empty cardboard box that protected a new keyboard from the store.',
    },
    correctZone: 'recycle',
    feedback: {
      pt: 'Correto! 📦 A embalagem de cartão deve ser espalmada e colocada no Ecoponto Azul para ser reciclada em novas folhas e caixas.',
      en: 'Correct! 📦 Clean cardboard packaging should be flattened and placed in the Blue Recycling Bin to produce recycled paper.',
    },
  },
  {
    id: 8,
    name: { pt: 'Auscultadores Sem Conserto', en: 'Unrepairable Headphones' },
    icon: '🎧',
    description: {
      pt: 'Auscultadores partidos ao meio, sem som e sem qualquer hipótese de reparação.',
      en: 'Headphones snapped in half, producing no sound and completely unfixable.',
    },
    correctZone: 'recycle',
    feedback: {
      pt: 'Boa decisão! ♻️ Equipamentos eletrónicos estragados e sem arranjo devem ser entregues em pontos de recolha de REEE / Ponto Eletrão.',
      en: 'Good decision! ♻️ Broken electronics with no repair options must go to dedicated e-waste collection points.',
    },
  },
];

interface QuickChoice {
  prompt: { pt: string; en: string };
  options: {
    pt: string[];
    en: string[];
  };
  correctIndex: number;
  feedback: { pt: string; en: string };
}

const QUICK_CHOICES: QuickChoice[] = [
  {
    prompt: {
      pt: 'Antes de comprar ou pedir um equipamento eletrónico novo, devo...',
      en: 'Before buying or asking for a new electronic device, I should...',
    },
    options: {
      pt: [
        'Pensar se realmente preciso dele e se o meu ainda funciona bem.',
        'Comprar logo o mais caro só porque saiu um modelo novo.',
      ],
      en: [
        'Think if I truly need it and if my current one still works well.',
        'Buy the most expensive one right away just because it is new.',
      ],
    },
    correctIndex: 0,
    feedback: {
      pt: 'Consumo responsável! Evitar compras desnecessárias poupa matérias-primas e energia da Terra.',
      en: 'Responsible consumption! Avoiding needless purchases saves Earth’s raw materials and energy.',
    },
  },
  {
    prompt: {
      pt: 'Quando um equipamento meu ainda funciona mas já não o uso...',
      en: 'When a device of mine still works but I no longer use it...',
    },
    options: {
      pt: [
        'Deitar no contentor do lixo comum da cozinha com os restos.',
        'Posso reutilizá-lo, doá-lo ou emprestá-lo a quem precise.',
      ],
      en: [
        'Toss it into regular kitchen household trash with scraps.',
        'I can reuse it, donate it, or lend it to someone who needs it.',
      ],
    },
    correctIndex: 1,
    feedback: {
      pt: 'A reutilização é uma das formas mais ecológicas de valorizar a tecnologia!',
      en: 'Reusing is one of the most eco-friendly ways to extend tech value!',
    },
  },
  {
    prompt: {
      pt: 'Quando um equipamento eletrónico deixa de funcionar e não tem conserto...',
      en: 'When an electronic device stops working and cannot be repaired...',
    },
    options: {
      pt: [
        'Devo procurar um local adequado de recolha de REEE (Ponto Eletrão/Ecocentro).',
        'Atirar para a berma da estrada ou para um descampado.',
      ],
      en: [
        'I should look for a proper e-waste collection point (E-waste drop-off/Eco-centre).',
        'Throw it on the roadside or in an empty field.',
      ],
    },
    correctIndex: 0,
    feedback: {
      pt: 'A reciclagem adequada impede a contaminação do solo e da água e recupera minerais raros!',
      en: 'Proper recycling prevents ground and water pollution and recovers precious minerals!',
    },
  },
  {
    prompt: {
      pt: 'O lixo eletrónico acumulado no mundo...',
      en: 'The electronic waste accumulated worldwide...',
    },
    options: {
      pt: [
        'Não tem qualquer impacto negativo no meio ambiente.',
        'Deve ser tratado e encaminhado de forma segura por entidades especializadas.',
      ],
      en: [
        'Has zero negative impact on the environment.',
        'Must be safely handled and processed by specialized recycling facilities.',
      ],
    },
    correctIndex: 1,
    feedback: {
      pt: 'Muito bem! Tratar o lixo eletrónico é uma responsabilidade global para proteger o nosso futuro!',
      en: 'Well done! Managing e-waste is a vital global responsibility to protect our future!',
    },
  },
];

export const PlanetDigitalMissionGame: React.FC<PlanetDigitalMissionGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  // Game phases: 1 = Sorting Items (8 items), 2 = School Challenge, 3 = Quick Planet Choices (4 items), 4 = Final
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);

  // Phase 1 states
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [selectedZone, setSelectedZone] = useState<DestinationZone | null>(null);
  const [isItemAnswered, setIsItemAnswered] = useState<boolean>(false);
  const [itemsScore, setItemsScore] = useState<number>(0);

  // Phase 2 states
  const [phase2Selected, setPhase2Selected] = useState<number | null>(null);
  const [phase2Answered, setPhase2Answered] = useState<boolean>(false);
  const [phase2Score, setPhase2Score] = useState<number>(0);

  // Phase 3 states
  const [quickIndex, setQuickIndex] = useState<number>(0);
  const [quickSelected, setQuickSelected] = useState<number | null>(null);
  const [quickAnswered, setQuickAnswered] = useState<boolean>(false);
  const [quickScore, setQuickScore] = useState<number>(0);

  // Total planet points: Max 100
  // Phase 1: 8 items * 6 pts = 48 pts (or rounded) -> Let's do Phase 1: 8 * 6 = 48 pts, Phase 2: 12 pts, Phase 3: 4 * 10 = 40 pts. Total = 100 pts!
  const currentTotalPoints = itemsScore + phase2Score + quickScore;

  // Visual Garden indicators
  const treeCount = Math.min(5, Math.floor(currentTotalPoints / 20));
  const flowerCount = Math.min(6, Math.floor(currentTotalPoints / 15));

  // --- Handlers Phase 1 ---
  const currentItem = ITEMS_DATA[itemIndex];

  const handleZoneChoice = (zone: DestinationZone) => {
    if (isItemAnswered) return;
    setSelectedZone(zone);
    setIsItemAnswered(true);

    if (zone === currentItem.correctZone) {
      setItemsScore((prev) => prev + 6);
    }
  };

  const handleNextItem = () => {
    if (itemIndex < ITEMS_DATA.length - 1) {
      setItemIndex((prev) => prev + 1);
      setSelectedZone(null);
      setIsItemAnswered(false);
    } else {
      // Move to Phase 2
      setPhase(2);
    }
  };

  // --- Handlers Phase 2 ---
  const handlePhase2Option = (optIndex: number) => {
    if (phase2Answered) return;
    setPhase2Selected(optIndex);
    setPhase2Answered(true);

    if (optIndex === 1) {
      // Option B is correct (index 1)
      setPhase2Score(12);
    }
  };

  const handleNextPhase2 = () => {
    setPhase(3);
  };

  // --- Handlers Phase 3 ---
  const currentQuick = QUICK_CHOICES[quickIndex];

  const handleQuickChoice = (optIdx: number) => {
    if (quickAnswered) return;
    setQuickSelected(optIdx);
    setQuickAnswered(true);

    if (optIdx === currentQuick.correctIndex) {
      setQuickScore((prev) => prev + 10);
    }
  };

  const handleNextQuick = () => {
    if (quickIndex < QUICK_CHOICES.length - 1) {
      setQuickIndex((prev) => prev + 1);
      setQuickSelected(null);
      setIsItemAnswered(false);
      setQuickAnswered(false);
    } else {
      setPhase(4);
      const finalScore = itemsScore + phase2Score + quickScore + (quickSelected === currentQuick.correctIndex ? 0 : 0);
      const maxScore = 100;
      const percentage = Math.min(100, Math.round((finalScore / maxScore) * 100));
      if (onFinish) {
        onFinish(finalScore, maxScore, percentage);
      }
    }
  };

  const handleRestart = () => {
    setPhase(1);
    setItemIndex(0);
    setSelectedZone(null);
    setIsItemAnswered(false);
    setItemsScore(0);
    setPhase2Selected(null);
    setPhase2Answered(false);
    setPhase2Score(0);
    setQuickIndex(0);
    setQuickSelected(null);
    setQuickAnswered(false);
    setQuickScore(0);
  };

  // --- FINAL SCREEN ---
  if (phase === 4) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-xl border-4 border-emerald-400 p-6 md:p-8 text-center relative overflow-hidden">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm mb-4">
            <Globe className="w-4 h-4 text-emerald-600" />
            {language === 'pt' ? 'MISSÃO CONCLUÍDA! 🌍' : 'MISSION COMPLETED! 🌍'}
          </div>

          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-300 to-teal-500 rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-white animate-bounce">
            🌱
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {language === 'pt'
              ? 'Parabéns, Guardião do Planeta!'
              : 'Congratulations, Planet Guardian!'}
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-6 max-w-lg mx-auto font-medium">
            {language === 'pt'
              ? 'Aprendeste que cuidar da tecnologia também é cuidar do planeta e proteger o nosso futuro ecológico.'
              : 'You learned that caring for technology is also caring for our planet and protecting our ecological future.'}
          </p>

          {/* Score Box */}
          <div className="max-w-xs mx-auto mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 shadow-sm">
            <span className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {language === 'pt' ? 'Pontos Planeta Acumulados' : 'Accumulated Planet Points'}
            </span>
            <span className="text-4xl font-black text-emerald-900">
              {currentTotalPoints} / 100
            </span>
          </div>

          {/* Eco Garden Virtual Visualization */}
          <div className="bg-gradient-to-b from-sky-100 to-emerald-100 border-2 border-emerald-200 rounded-2xl p-5 mb-8 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase mb-3">
              <span className="flex items-center gap-1">
                <Sun className="w-4 h-4 text-amber-500 animate-spin" />
                {language === 'pt' ? 'Escola Virtual Verde e Sustentável' : 'Green & Sustainable School'}
              </span>
              <span>100% Ecológica</span>
            </div>
            <div className="flex items-end justify-center gap-4 py-4 text-3xl md:text-4xl">
              <span>🏫</span>
              <span>🌳</span>
              <span>🌸</span>
              <span>🌍</span>
              <span>🌸</span>
              <span>🌳</span>
              <span>🐦</span>
            </div>
          </div>

          {/* Summary Checklist */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 text-left mb-8">
            <h3 className="text-base md:text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              {language === 'pt' ? 'Regras de Ouro Aprendidas:' : 'Golden Rules Learned:'}
            </h3>
            <ul className="space-y-2.5 text-sm md:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'pt' ? 'Reparar & Reutilizar:' : 'Repair & Reuse:'}</strong>{' '}
                  {language === 'pt'
                    ? 'Aparelhos funcionais devem ser reutilizados ou doados a quem precisa.'
                    : 'Working devices should be reused or donated to those who need them.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'pt' ? 'Reciclagem Especializada:' : 'Specialized Recycling:'}</strong>{' '}
                  {language === 'pt'
                    ? 'Equipamentos estragados e pilhas vão para o Ponto Eletrão, Pilhão ou Ecocentro — nunca para o lixo comum!'
                    : 'Broken electronics and batteries go to e-waste and battery drop-offs — never into common trash!'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'pt' ? 'Consumo Consciente:' : 'Mindful Consumption:'}</strong>{' '}
                  {language === 'pt'
                    ? 'Pensar duas vezes antes de comprar um equipamento novo evita desperdício.'
                    : 'Thinking twice before buying a new device avoids unnecessary waste.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              {language === 'pt' ? 'Jogar Novamente' : 'Play Again'}
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-2xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              {language === 'pt' ? 'Voltar ao Menu' : 'Back to Menu'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Bar with Navigation, Stage Info, and Points */}
      <div className="flex items-center justify-between mb-4 bg-white/90 backdrop-blur rounded-2xl p-3 border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'pt' ? 'Sair' : 'Exit'}
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-black text-xs md:text-sm border border-emerald-200">
            <Leaf className="w-4 h-4 text-emerald-600" />
            {phase === 1 &&
              (language === 'pt'
                ? `Fase 1: Triagem (${itemIndex + 1}/${ITEMS_DATA.length})`
                : `Phase 1: Sorting (${itemIndex + 1}/${ITEMS_DATA.length})`)}
            {phase === 2 &&
              (language === 'pt' ? 'Fase 2: Desafio da Escola' : 'Phase 2: School Challenge')}
            {phase === 3 &&
              (language === 'pt'
                ? `Fase 3: Hábitos (${quickIndex + 1}/${QUICK_CHOICES.length})`
                : `Phase 3: Habits (${quickIndex + 1}/${QUICK_CHOICES.length})`)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs md:text-sm border border-emerald-300">
          🌱 <span>{currentTotalPoints} pts</span>
        </div>
      </div>

      {/* Dynamic Mini Eco-Garden Tracker */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-2.5 mb-5 flex items-center justify-between text-xs font-bold text-emerald-800">
        <div className="flex items-center gap-1.5">
          <span>🌱 {language === 'pt' ? 'Jardim da Escola:' : 'School Garden:'}</span>
          <span className="flex gap-1 text-base">
            {Array.from({ length: treeCount }).map((_, i) => (
              <span key={`tree-${i}`}>🌳</span>
            ))}
            {Array.from({ length: flowerCount }).map((_, i) => (
              <span key={`flw-${i}`}>🌸</span>
            ))}
            {treeCount === 0 && flowerCount === 0 && <span className="text-xs text-slate-500">{language === 'pt' ? 'A plantar...' : 'Planting...'}</span>}
          </span>
        </div>
        <div className="text-xs font-extrabold text-emerald-700">
          {currentTotalPoints} / 100 {language === 'pt' ? 'Pontos Planeta' : 'Planet Points'}
        </div>
      </div>

      {/* ==================== FASE 1: TRIAGEM DE OBJETOS ==================== */}
      {phase === 1 && (
        <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 p-6 md:p-8 animate-fadeIn">
          {/* Object Card */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
              {currentItem.icon}
            </div>
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-100 px-3 py-1 rounded-full">
              {language === 'pt' ? 'Objeto em Análise' : 'Object Under Analysis'}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2 mb-1">
              {currentItem.name[language]}
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto">
              {currentItem.description[language]}
            </p>
          </div>

          <h3 className="text-center font-bold text-slate-700 text-sm md:text-base mb-4">
            {language === 'pt'
              ? 'Qual é o destino correto e mais sustentável?'
              : 'What is the correct and most sustainable destination?'}
          </h3>

          {/* 4 Destination Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Zone 1: REPARAR */}
            <button
              disabled={isItemAnswered}
              onClick={() => handleZoneChoice('repair')}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer text-left font-bold ${
                isItemAnswered
                  ? currentItem.correctZone === 'repair'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-300'
                    : selectedZone === 'repair'
                    ? 'bg-rose-50 border-rose-400 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'
                  : 'bg-white border-sky-200 hover:border-sky-400 hover:bg-sky-50 text-sky-900'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-base">🔧 {language === 'pt' ? 'REPARAR' : 'REPAIR'}</span>
                <span className="text-xs text-slate-500 font-normal">
                  {language === 'pt' ? 'Arranjar pequenos problemas' : 'Fix minor defects'}
                </span>
              </div>
            </button>

            {/* Zone 2: REUTILIZAR */}
            <button
              disabled={isItemAnswered}
              onClick={() => handleZoneChoice('reuse')}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer text-left font-bold ${
                isItemAnswered
                  ? currentItem.correctZone === 'reuse'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-300'
                    : selectedZone === 'reuse'
                    ? 'bg-rose-50 border-rose-400 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'
                  : 'bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-amber-900'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-base">🔄 {language === 'pt' ? 'REUTILIZAR' : 'REUSE'}</span>
                <span className="text-xs text-slate-500 font-normal">
                  {language === 'pt' ? 'Doar ou dar nova utilidade' : 'Donate or give new use'}
                </span>
              </div>
            </button>

            {/* Zone 3: RECICLAR */}
            <button
              disabled={isItemAnswered}
              onClick={() => handleZoneChoice('recycle')}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer text-left font-bold ${
                isItemAnswered
                  ? currentItem.correctZone === 'recycle'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-300'
                    : selectedZone === 'recycle'
                    ? 'bg-rose-50 border-rose-400 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'
                  : 'bg-white border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-900'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-base">♻️ {language === 'pt' ? 'RECICLAR / PONTO ELETRÃO' : 'RECYCLE / E-WASTE'}</span>
                <span className="text-xs text-slate-500 font-normal">
                  {language === 'pt' ? 'Ponto de recolha especializado' : 'Specialized drop-off'}
                </span>
              </div>
            </button>

            {/* Zone 4: LIXO COMUM */}
            <button
              disabled={isItemAnswered}
              onClick={() => handleZoneChoice('trash')}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer text-left font-bold ${
                isItemAnswered
                  ? currentItem.correctZone === 'trash'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md'
                    : selectedZone === 'trash'
                    ? 'bg-rose-50 border-rose-400 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'
                  : 'bg-white border-slate-300 hover:border-rose-300 hover:bg-rose-50/40 text-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-base">🗑️ {language === 'pt' ? 'LIXO COMUM' : 'NORMAL TRASH'}</span>
                <span className="text-xs text-slate-500 font-normal">
                  {language === 'pt' ? 'Contentor indiferenciado' : 'Indiscriminate bin'}
                </span>
              </div>
            </button>
          </div>

          {/* Feedback Box */}
          {isItemAnswered && (
            <div
              className={`rounded-2xl p-4 md:p-5 mb-6 animate-fadeIn border-2 ${
                selectedZone === currentItem.correctZone
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start gap-3">
                {selectedZone === currentItem.correctZone ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-black text-base mb-1">
                    {selectedZone === currentItem.correctZone
                      ? language === 'pt'
                        ? '🌱 Boa Decisão (+6 Pontos Planeta)!'
                        : '🌱 Great Decision (+6 Planet Points)!'
                      : language === 'pt'
                      ? '💡 Quase! Dica Ecológica:'
                      : '💡 Eco Tip:'}
                  </h4>
                  <p className="text-sm md:text-base leading-relaxed">
                    {currentItem.feedback[language]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isItemAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextItem}
                className="px-6 py-3 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 text-base cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>
                  {itemIndex < ITEMS_DATA.length - 1
                    ? language === 'pt'
                      ? 'Próximo Objeto'
                      : 'Next Object'
                    : language === 'pt'
                    ? 'Ir para Fase 2: Desafio da Escola'
                    : 'Go to Phase 2: School Challenge'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================== FASE 2: DESAFIO DA ESCOLA ==================== */}
      {phase === 2 && (
        <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 p-6 md:p-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase mb-3">
            <TreePine className="w-4 h-4" />
            {language === 'pt' ? 'Fase 2: O Grande Dilema da Escola' : 'Phase 2: School Big Dilemma'}
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
            {language === 'pt' ? 'Os 10 Computadores Antigos da Escola' : 'The School’s 10 Old Computers'}
          </h2>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 md:p-5 mb-6 text-slate-800 text-base md:text-lg">
            "{language === 'pt'
              ? 'A escola precisa de comprar novos computadores para a sala de informática. No entanto, ainda tem 10 computadores antigos que funcionam bem para tarefas básicas e escrita de textos.'
              : 'The school needs to upgrade computers in the computer lab. However, it still has 10 older computers that work fine for word processing and basic tasks.'}"
          </div>

          <h3 className="font-black text-slate-900 text-base md:text-lg mb-4">
            {language === 'pt'
              ? 'Qual seria a atitude mais responsável e sustentável por parte da escola?'
              : 'What would be the most responsible and sustainable attitude by the school?'}
          </h3>

          <div className="space-y-3 mb-6">
            {[
              {
                text: {
                  pt: 'A — Deitar todos fora para o contentor do lixo da rua.',
                  en: 'A — Throw them all into the street garbage bin.',
                },
                isCorrect: false,
              },
              {
                text: {
                  pt: 'B — Tentar reutilizá-los na biblioteca ou doá-los a alunos e instituições que precisem.',
                  en: 'B — Try to reuse them in the library or donate them to students/organizations in need.',
                },
                isCorrect: true,
              },
              {
                text: {
                  pt: 'C — Guardá-los para sempre fechados a ganhar pó numa arrecadação.',
                  en: 'C — Keep them locked away forever gathering dust in a storage room.',
                },
                isCorrect: false,
              },
              {
                text: {
                  pt: 'D — Parti-los em pedaços antes de os deitar fora.',
                  en: 'D — Smash them to pieces before throwing them away.',
                },
                isCorrect: false,
              },
            ].map((option, idx) => {
              const isSelected = phase2Selected === idx;
              let style = 'bg-white border-2 border-slate-200 hover:border-emerald-400 text-slate-800';

              if (phase2Answered) {
                if (option.isCorrect) {
                  style = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !option.isCorrect) {
                  style = 'bg-rose-50 border-2 border-rose-400 text-rose-900';
                } else {
                  style = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={phase2Answered}
                  onClick={() => handlePhase2Option(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer text-sm md:text-base ${style}`}
                >
                  {option.text[language]}
                </button>
              );
            })}
          </div>

          {phase2Answered && (
            <div
              className={`rounded-2xl p-4 md:p-5 mb-6 animate-fadeIn border-2 ${
                phase2Selected === 1
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-base mb-1">
                    {language === 'pt' ? '🌱 Resposta Certa: Opção B (+12 Pontos Planeta)!' : '🌱 Correct Choice: Option B (+12 Planet Points)!'}
                  </h4>
                  <p className="text-sm md:text-base leading-relaxed">
                    {language === 'pt'
                      ? 'Sensacional! Dar uma segunda vida a computadores operacionais beneficia a comunidade e evita a produção precoce de lixo eletrónico!'
                      : 'Sensational! Giving a second life to working computers supports the community and avoids premature electronic waste!'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {phase2Answered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextPhase2}
                className="px-6 py-3 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 text-base cursor-pointer hover:scale-[1.02]"
              >
                <span>
                  {language === 'pt' ? 'Ir para Fase 3: Hábitos Tecnológicos' : 'Go to Phase 3: Tech Habits'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================== FASE 3: CONSEGUES SALVAR O PLANETA? ==================== */}
      {phase === 3 && (
        <div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 p-6 md:p-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase mb-3">
            <Globe className="w-4 h-4" />
            {language === 'pt'
              ? `Fase 3: Escolhas Rápidas (${quickIndex + 1}/${QUICK_CHOICES.length})`
              : `Phase 3: Quick Eco-Choices (${quickIndex + 1}/${QUICK_CHOICES.length})`}
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
            {language === 'pt' ? 'Consegues Salvar o Planeta?' : 'Can You Save the Planet?'}
          </h2>

          {/* Prompt */}
          <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-4 md:p-5 mb-6 text-slate-800 text-base md:text-lg font-bold">
            "{currentQuick.prompt[language]}"
          </div>

          <div className="space-y-3 mb-6">
            {currentQuick.options[language].map((option, idx) => {
              const isSelected = quickSelected === idx;
              const isCorrect = idx === currentQuick.correctIndex;

              let style =
                'bg-white border-2 border-slate-200 hover:border-emerald-400 text-slate-800 hover:bg-emerald-50/40';

              if (quickAnswered) {
                if (isCorrect) {
                  style =
                    'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold shadow-sm';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-50 border-2 border-rose-400 text-rose-900';
                } else {
                  style = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={quickAnswered}
                  onClick={() => handleQuickChoice(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer text-sm md:text-base font-semibold flex items-center gap-3 ${style}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                      quickAnswered
                        ? isCorrect
                          ? 'bg-emerald-500 text-white'
                          : isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {quickAnswered ? (isCorrect ? '✓' : isSelected ? '✕' : idx + 1) : idx + 1}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {quickAnswered && (
            <div
              className={`rounded-2xl p-4 md:p-5 mb-6 animate-fadeIn border-2 ${
                quickSelected === currentQuick.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-base mb-1">
                    {quickSelected === currentQuick.correctIndex
                      ? language === 'pt'
                        ? '🌱 Escolha Sustentável (+10 Pontos)!'
                        : '🌱 Sustainable Choice (+10 Points)!'
                      : language === 'pt'
                      ? '💡 Dica Ecológica:'
                      : '💡 Eco Tip:'}
                  </h4>
                  <p className="text-sm md:text-base leading-relaxed">
                    {currentQuick.feedback[language]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {quickAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextQuick}
                className="px-6 py-3 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 text-base cursor-pointer hover:scale-[1.02]"
              >
                <span>
                  {quickIndex < QUICK_CHOICES.length - 1
                    ? language === 'pt'
                      ? 'Próxima Escolha'
                      : 'Next Choice'
                    : language === 'pt'
                    ? 'Concluir Missão'
                    : 'Finish Mission'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default PlanetDigitalMissionGame;
