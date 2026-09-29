import React, { useState, useEffect, useRef } from 'react';
import {
  School,
  HeartPulse,
  Navigation,
  CreditCard,
  Leaf,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Radio,
  BookOpen,
  MapPin,
  Clock,
  Droplets,
  Thermometer,
  Video,
  Truck,
  Package,
  Search,
  Check,
  Trophy,
  Volume2,
  ExternalLink,
  ShieldCheck,
  Satellite
} from 'lucide-react';
import { Language } from '../types';
import { api } from '../services/api';

interface TicApplicationsExplorerProps {
  language: Language;
  onCompleted?: () => void;
}

interface ApplicationArea {
  id: string;
  icon: string;
  badge: { pt: string; en: string };
  title: { pt: string; en: string };
  colorTheme: {
    border: string;
    bg: string;
    activeTab: string;
    badgeBg: string;
    badgeText: string;
  };
}

const AREAS: ApplicationArea[] = [
  {
    id: 'escola',
    icon: '🏫',
    badge: { pt: 'Escola & Estudo', en: 'School & Study' },
    title: { pt: 'Catálogo de Biblioteca & Caderneta', en: 'Library Catalog & Portal' },
    colorTheme: {
      border: 'border-blue-200',
      bg: 'bg-blue-50/40',
      activeTab: 'bg-blue-600 text-white shadow-md',
      badgeBg: 'bg-blue-100 text-blue-900',
      badgeText: 'text-blue-700',
    },
  },
  {
    id: 'saude-transportes',
    icon: '🚗',
    badge: { pt: 'Saúde & Mobilidade', en: 'Health & Mobility' },
    title: { pt: 'Navegador GPS & Telemedicina', en: 'GPS Navigation & Telemedicine' },
    colorTheme: {
      border: 'border-purple-200',
      bg: 'bg-purple-50/40',
      activeTab: 'bg-purple-600 text-white shadow-md',
      badgeBg: 'bg-purple-100 text-purple-900',
      badgeText: 'text-purple-700',
    },
  },
  {
    id: 'comercio',
    icon: '💳',
    badge: { pt: 'Comércio & Pagamentos', en: 'Commerce & Payments' },
    title: { pt: 'Contactless (NFC) & Rastreio de Compras', en: 'Contactless (NFC) & Tracking' },
    colorTheme: {
      border: 'border-amber-200',
      bg: 'bg-amber-50/40',
      activeTab: 'bg-amber-600 text-white shadow-md',
      badgeBg: 'bg-amber-100 text-amber-900',
      badgeText: 'text-amber-700',
    },
  },
  {
    id: 'ambiente-industria',
    icon: '🌾',
    badge: { pt: 'Ambiente & Indústria', en: 'Environment & Industry' },
    title: { pt: 'Estufa Inteligente & Sensores IoT', en: 'Smart Greenhouse & IoT' },
    colorTheme: {
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/40',
      activeTab: 'bg-emerald-600 text-white shadow-md',
      badgeBg: 'bg-emerald-100 text-emerald-900',
      badgeText: 'text-emerald-700',
    },
  },
];

// Audio helper for interactive sound effects without external files
function playBeepSound(type: 'pos' | 'borrow' | 'alert' | 'success') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'pos') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === 'borrow') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {}
}

export const TicApplicationsExplorer: React.FC<TicApplicationsExplorerProps> = ({ language, onCompleted }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('escola');

  // Simulator States
  // 1. Escola: Library Simulator
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<'principezinho' | 'ulisses' | 'robo5'>('principezinho');
  const [borrowedBooks, setBorrowedBooks] = useState<Record<string, boolean>>({});
  const [libraryFeedback, setLibraryFeedback] = useState<string | null>(null);

  // 2. Saúde & Transportes: GPS Simulator & Telemedicina
  const [gpsDest, setGpsDest] = useState<'escola' | 'hospital' | 'biblioteca'>('escola');
  const [gpsTraffic, setGpsTraffic] = useState<'fluido' | 'intenso'>('fluido');
  const [carProgress, setCarProgress] = useState<number>(35);
  const [telemedActive, setTelemedActive] = useState<boolean>(false);
  const [telemedStep, setTelemedStep] = useState<number>(0);

  // 3. Comércio: NFC & E-Commerce Pipeline Simulator
  const [nfcSuccess, setNfcSuccess] = useState<boolean>(false);
  const [orderStage, setOrderStage] = useState<number>(1);
  const [receiptVisible, setReceiptVisible] = useState<boolean>(false);

  // 4. Ambiente: IoT Smart Greenhouse Simulator
  const [soilMoisture, setSoilMoisture] = useState<number>(24);
  const [greenhouseTemp, setGreenhouseTemp] = useState<number>(26);

  // Global Simulator XP Completion
  const [xpAwarded, setXpAwarded] = useState<boolean>(false);
  const [isSavingXp, setIsSavingXp] = useState<boolean>(false);

  const activeArea = AREAS.find((a) => a.id === selectedAreaId) || AREAS[0];

  // GPS animation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCarProgress((prev) => (prev >= 95 ? 10 : prev + (gpsTraffic === 'fluido' ? 3 : 1.2)));
    }, 400);
    return () => clearInterval(timer);
  }, [gpsTraffic]);

  const booksData = {
    principezinho: {
      title: 'O Principezinho',
      author: 'Antoine de Saint-Exupéry',
      shelf: 'Estante A-04 • Literatura Infantojuvenil',
      code: 'BIB-5A-092',
      defaultAvailable: true,
    },
    ulisses: {
      title: 'Ulisses',
      author: 'Maria Alberta Menéres',
      shelf: 'Estante B-12 • Mitos e Lendas',
      code: 'BIB-5A-144',
      defaultAvailable: false,
    },
    robo5: {
      title: 'Robôs & O Futuro da Informação',
      author: 'Equipa Pedagógica TIC',
      shelf: 'Estante C-01 • Ciência e Tecnologia',
      code: 'BIB-5A-881',
      defaultAvailable: true,
    },
  };

  const isBookAvailable = (key: 'principezinho' | 'ulisses' | 'robo5') => {
    if (borrowedBooks[key]) return false;
    return booksData[key].defaultAvailable;
  };

  const handleBorrowBook = (key: 'principezinho' | 'ulisses' | 'robo5') => {
    playBeepSound('borrow');
    setBorrowedBooks((prev) => ({ ...prev, [key]: true }));
    setLibraryFeedback(
      language === 'pt'
        ? `"${booksData[key].title}" requisitado com sucesso! Registado na tua Caderneta Digital Escolar (Prazo: 15 dias).`
        : `"${booksData[key].title}" borrowed! Registered in your Student Portal (Due: 15 days).`
    );
  };

  const handleReturnBook = (key: 'principezinho' | 'ulisses' | 'robo5') => {
    playBeepSound('borrow');
    setBorrowedBooks((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setLibraryFeedback(
      language === 'pt'
        ? `"${booksData[key].title}" devolvido à biblioteca com sucesso.`
        : `"${booksData[key].title}" returned to the library.`
    );
  };

  const handleTapNfc = () => {
    playBeepSound('pos');
    setNfcSuccess(true);
    setReceiptVisible(true);
    setTimeout(() => {
      setNfcSuccess(false);
    }, 3500);
  };

  const handleSaveSimulatorProgress = async () => {
    setIsSavingXp(true);
    try {
      playBeepSound('success');
      await api.saveProgress({
        activityId: 'desafio-simulador-aplicacao-tic',
        activityType: 'challenge',
        themeId: 'tic-sociedade',
        status: 'completed',
        score: 100,
        percentage: 100,
        activityTitle: language === 'pt' ? 'Simulador Prático: Aplicação das TIC' : 'Practical Simulator: ICT Applications',
      });
      setXpAwarded(true);
      if (onCompleted) onCompleted();
      window.dispatchEvent(new CustomEvent('tic_points_updated'));
    } catch (e) {
      console.warn('Simulador guardado localmente:', e);
      setXpAwarded(true);
    } finally {
      setIsSavingXp(false);
    }
  };

  const orderStages = [
    {
      num: 1,
      title: language === 'pt' ? '1. Escolher Produto' : '1. Choose Item',
      desc: language === 'pt' ? 'Pesquisa num catálogo online 24h e adiciona ao carrinho.' : 'Browse online store and add to cart.',
      icon: '🛒',
    },
    {
      num: 2,
      title: language === 'pt' ? '2. Encomendar' : '2. Place Order',
      desc: language === 'pt' ? 'Preenchimento seguro da morada e confirmação dos artigos.' : 'Confirm items and shipping address.',
      icon: '📝',
    },
    {
      num: 3,
      title: language === 'pt' ? '3. Pagamento Seguro' : '3. Secure Pay',
      desc: language === 'pt' ? 'Pagamento por cartão ou MB WAY com canais encriptados.' : 'Encrypted checkout payment.',
      icon: '💳',
    },
    {
      num: 4,
      title: language === 'pt' ? '4. Armazém Digital' : '4. Warehouse',
      desc: language === 'pt' ? 'Robôs e leitores óticos de código de barras separam a encomenda.' : 'Barcode scanners and robots pack items.',
      icon: '📦',
    },
    {
      num: 5,
      title: language === 'pt' ? '5. Rastreio & GPS' : '5. GPS Transit',
      desc: language === 'pt' ? 'Carrinha de transporte acompanhada ao minuto por GPS.' : 'Delivery vehicle tracked via GPS in real-time.',
      icon: '🚚',
    },
    {
      num: 6,
      title: language === 'pt' ? '6. Entrega ao Aluno' : '6. Delivery',
      desc: language === 'pt' ? 'Entrega em casa ou no cacifo digital escolar.' : 'Delivered home or to smart school locker.',
      icon: '🏡',
    },
  ];

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Selector Tabs: The 4 Sectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {AREAS.map((area) => {
          const isSelected = area.id === selectedAreaId;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setSelectedAreaId(area.id)}
              className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? `${area.colorTheme.activeTab} border-transparent ring-2 ring-indigo-400/30 scale-[1.02]`
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{area.icon}</span>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : area.colorTheme.badgeBg
                  }`}
                >
                  {area.badge[language]}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black leading-tight mt-1">
                {area.title[language]}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Simulator Card */}
      <div
        className={`p-5 sm:p-7 rounded-3xl border-2 ${activeArea.colorTheme.border} ${activeArea.colorTheme.bg} bg-white shadow-sm space-y-6`}
      >
        {/* Simulator Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-3xl">
              {activeArea.icon}
            </span>
            <div>
              <span className={`text-xs font-black uppercase tracking-wider ${activeArea.colorTheme.badgeText}`}>
                {activeArea.badge[language]}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900">
                {activeArea.title[language]}
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs self-start sm:self-auto flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'pt' ? 'Simulador Interativo Ativo' : 'Interactive Lab Active'}</span>
          </span>
        </div>

        {/* ============================================================ */}
        {/* SECTOR 1: ESCOLA - BIBLIOTECA DIGITAL & CADERNETA            */}
        {/* ============================================================ */}
        {activeArea.id === 'escola' && (
          <div className="space-y-4">
            {/* Search Filter Bar */}
            <div className="p-3.5 rounded-2xl bg-white border border-blue-200 shadow-2xs flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'pt'
                    ? 'Pesquisar livro no catálogo digital da biblioteca...'
                    : 'Search school digital library catalog...'
                }
                className="w-full text-xs sm:text-sm bg-transparent outline-hidden font-medium text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Book Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['principezinho', 'ulisses', 'robo5'] as const)
                .filter((key) => {
                  if (!searchQuery) return true;
                  const b = booksData[key];
                  return (
                    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    b.author.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                })
                .map((key) => {
                  const b = booksData[key];
                  const isSel = selectedBook === key;
                  const isAvailable = isBookAvailable(key);
                  const isBorrowedByMe = borrowedBooks[key] === true;

                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedBook(key)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSel
                          ? 'border-blue-600 bg-white ring-2 ring-blue-300 shadow-sm'
                          : 'border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-100">
                          <span className="font-mono text-slate-500 font-bold">{b.code}</span>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                              isBorrowedByMe
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : isAvailable
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-rose-100 text-rose-900 border border-rose-300'
                            }`}
                          >
                            {isBorrowedByMe
                              ? (language === 'pt' ? 'Requisitado por ti' : 'Borrowed')
                              : isAvailable
                              ? (language === 'pt' ? '🟢 Disponível' : 'Available')
                              : (language === 'pt' ? '🔴 Emprestado' : 'Checked out')}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mt-2">{b.title}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{b.author}</p>
                        <p className="text-[11px] text-blue-700 font-medium mt-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{b.shelf}</span>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        {isAvailable && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBorrowBook(key);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{language === 'pt' ? 'Requisitar Livro' : 'Borrow Book'}</span>
                          </button>
                        )}
                        {isBorrowedByMe && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReturnBook(key);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{language === 'pt' ? 'Devolver à Biblioteca' : 'Return Book'}</span>
                          </button>
                        )}
                        {!isAvailable && !isBorrowedByMe && (
                          <span className="text-[11px] font-bold text-slate-400 block text-center py-1">
                            {language === 'pt' ? 'Indisponível de momento' : 'Currently Unavailable'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Notification / Feedback Banner */}
            {libraryFeedback && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-xs flex items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{libraryFeedback}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLibraryFeedback(null)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 cursor-pointer font-black"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTOR 2: SAÚDE & TRANSPORTES - GPS & TELEMEDICINA           */}
        {/* ============================================================ */}
        {activeArea.id === 'saude-transportes' && (
          <div className="space-y-4">
            {/* Destination & Traffic Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs space-y-2">
                <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <span>{language === 'pt' ? 'Escolher Destino da Rota GPS:' : 'Choose GPS Destination:'}</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['escola', 'hospital', 'biblioteca'] as const).map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setGpsDest(dest)}
                      className={`p-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        gpsDest === dest
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {dest === 'escola' ? '🏫 Escola' : dest === 'hospital' ? '🏥 Hospital' : '🏛️ Biblioteca'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs space-y-2">
                <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-purple-600" />
                  <span>{language === 'pt' ? 'Condições do Trânsito em Tempo Real:' : 'Live Traffic Conditions:'}</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setGpsTraffic('fluido')}
                    className={`p-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                      gpsTraffic === 'fluido'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🟢 {language === 'pt' ? 'Trânsito Fluido' : 'Clear Road'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGpsTraffic('intenso')}
                    className={`p-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                      gpsTraffic === 'intenso'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🔴 {language === 'pt' ? 'Obras / Hora de Ponta' : 'Rush Hour / Works'}
                  </button>
                </div>
              </div>
            </div>

            {/* Live GPS Animated Screen */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                  <Satellite className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>GPS Satélite Online (4 Satélites • Precisão: 2m)</span>
                </span>
                <span className="font-mono text-slate-300 font-bold">
                  {gpsTraffic === 'fluido' ? 'Velocidade: 48 km/h' : 'Velocidade: 18 km/h'}
                </span>
              </div>

              {/* Graphical Route Animation Bar */}
              <div className="py-2 space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                  <span>Partida: Casa</span>
                  <span>
                    Destino:{' '}
                    {gpsDest === 'escola'
                      ? 'Escola Básica 5.º Ano'
                      : gpsDest === 'hospital'
                      ? 'Hospital Pediátrico'
                      : 'Biblioteca Municipal'}
                  </span>
                </div>
                <div className="relative h-6 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center px-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      gpsTraffic === 'fluido' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${carProgress}%` }}
                  />
                  <div
                    className="absolute text-lg transition-all duration-300"
                    style={{ left: `calc(${Math.min(92, Math.max(3, carProgress))}% - 12px)` }}
                  >
                    🚗
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-[10px] text-purple-300 uppercase font-black tracking-wider">
                    {language === 'pt' ? 'Tempo Estimado de Chegada (ETA)' : 'ETA (Estimated Time of Arrival)'}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-white">
                    {gpsTraffic === 'fluido'
                      ? gpsDest === 'hospital'
                        ? '12 min'
                        : '7 min'
                      : gpsDest === 'hospital'
                      ? '28 min'
                      : '19 min'}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      gpsTraffic === 'intenso'
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                    }`}
                  >
                    {gpsTraffic === 'intenso'
                      ? '⚠️ Rota recalculada por satélite para evitar fila'
                      : '✓ Trajeto mais rápido em curso'}
                  </span>
                </div>
              </div>
            </div>

            {/* Telemedicina Interactive Call Card */}
            <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                    🩺
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {language === 'pt' ? 'Telemedicina: Consulta Segura' : 'Telemedicine: Secure Call'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {language === 'pt' ? 'Centro de Saúde • Ligação Encriptada' : 'Health Center • Encrypted'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setTelemedActive(!telemedActive);
                    if (!telemedActive) setTelemedStep(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    telemedActive
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{telemedActive ? (language === 'pt' ? 'Terminar Consulta ✕' : 'End Call ✕') : (language === 'pt' ? 'Iniciar Consulta 📞' : 'Start Call 📞')}</span>
                </button>
              </div>

              {telemedActive && (
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>🟢 Dr.ª Mariana Santos em direto: "Olá! Como te sentes hoje?"</span>
                  </div>
                  <div className="flex gap-2 pt-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setTelemedStep(1)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        telemedStep === 1
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      🗣️ "Tenho tosse e dor de garganta"
                    </button>
                    <button
                      type="button"
                      onClick={() => setTelemedStep(2)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        telemedStep === 2
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      📋 "Vim pedir renovação de receita médica"
                    </button>
                  </div>
                  {telemedStep > 0 && (
                    <p className="text-xs text-purple-950 font-medium bg-white p-2.5 rounded-lg border border-purple-200">
                      {telemedStep === 1
                        ? '👩‍⚕️ Médica: "Obrigada pela informação. Vou enviar a receita digital por SMS para os teus encarregados de educação. Bebe bastante água!"'
                        : '👩‍⚕️ Médica: "Receita médica digital confirmada e enviada com assinatura eletrónica qualificada para a farmácia!"'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTOR 3: COMÉRCIO - CONTACTLESS (NFC) & ENCOMENDAS          */}
        {/* ============================================================ */}
        {activeArea.id === 'comercio' && (
          <div className="space-y-4">
            {/* Interactive Terminal */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-all ${
                    nfcSuccess
                      ? 'bg-emerald-500 text-white scale-110 rotate-3 animate-bounce'
                      : 'bg-white text-amber-700 border border-amber-200'
                  }`}
                >
                  {nfcSuccess ? '✓' : '💳'}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-white/70 px-2 py-0.5 rounded-md">
                    Terminal TPA • Contactless (NFC)
                  </span>
                  <p className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    {nfcSuccess
                      ? (language === 'pt' ? '🔊 Bip! Pagamento de 1,20 € Aprovado!' : '🔊 Beep! Approved!')
                      : (language === 'pt' ? 'Valor a Pagar: 1,20 € (Lanche Escolar)' : 'Amount: 1.20 €')}
                  </p>
                  <p className="text-xs text-slate-600">
                    {language === 'pt' ? 'Aproxima o cartão a menos de 4 cm do leitor.' : 'Tap card within 4 cm.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTapNfc}
                className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 group active:scale-95"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>{language === 'pt' ? 'Aproximar Telemóvel / Cartão 📲' : 'Tap Card / Phone 📲'}</span>
              </button>
            </div>

            {/* Printed Receipt */}
            {receiptVisible && (
              <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-2xs flex items-center justify-between text-xs font-mono animate-in fade-in">
                <div className="space-y-0.5 text-slate-700">
                  <span className="font-bold text-amber-900">🧾 TALHÃO DIGITAL CONTACTLESS (NFC)</span>
                  <p>Cantina Escolar 5.º Ano • Aut: #NFC-98421 • Total: 1,20 € (Aprovado)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReceiptVisible(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* 6-Stage E-Commerce Pipeline */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  {language === 'pt' ? 'O Circuito das 6 Fases da Compra Online:' : '6 Stages of Online Shopping:'}
                </h5>
                <button
                  type="button"
                  onClick={() => setOrderStage((prev) => (prev >= 6 ? 1 : prev + 1))}
                  className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-xl transition-colors cursor-pointer"
                >
                  {language === 'pt' ? 'Avançar Etapa ➔' : 'Next Stage ➔'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {orderStages.map((st) => {
                  const isCurrent = orderStage === st.num;
                  const isDone = orderStage > st.num;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => setOrderStage(st.num)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-black scale-105'
                          : isDone
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <span className="text-lg block mb-1">{st.icon}</span>
                      <p className="text-[11px] leading-tight font-bold">{st.title}</p>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-slate-700 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 font-medium">
                👉 <strong>{orderStages[orderStage - 1].title}:</strong> {orderStages[orderStage - 1].desc}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTOR 4: AMBIENTE & INDÚSTRIA - ESTUFA IOT                  */}
        {/* ============================================================ */}
        {activeArea.id === 'ambiente-industria' && (
          <div className="space-y-4">
            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Moisture Slider */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-700 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span>{language === 'pt' ? 'Humidade do Solo (Sensor IoT):' : 'Soil Moisture:'}</span>
                  </span>
                  <span className="font-mono font-black text-blue-700 text-sm">{soilMoisture}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={soilMoisture}
                  onChange={(e) => setSoilMoisture(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>Seco (5%)</span>
                  <span>Ideal (50%)</span>
                  <span>Encharcado (95%)</span>
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-700 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-rose-600" />
                    <span>{language === 'pt' ? 'Temperatura do Ar:' : 'Air Temp:'}</span>
                  </span>
                  <span className="font-mono font-black text-rose-700 text-sm">{greenhouseTemp} °C</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="42"
                  value={greenhouseTemp}
                  onChange={(e) => setGreenhouseTemp(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>Frio (12°C)</span>
                  <span>Ameno (24°C)</span>
                  <span>Muito Quente (42°C)</span>
                </div>
              </div>
            </div>

            {/* Smart Automated Decisions Feedback */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors ${
                  soilMoisture < 35
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}
              >
                <span className="text-3xl">{soilMoisture < 35 ? '💧' : '🌱'}</span>
                <div className="text-xs">
                  <span className="font-black block uppercase tracking-wider">
                    {soilMoisture < 35
                      ? (language === 'pt' ? 'Rega Inteligente: LIGADA 💦' : 'Irrigation: ON 💦')
                      : (language === 'pt' ? 'Rega Inteligente: DESLIGADA 🌱' : 'Irrigation: OFF 🌱')}
                  </span>
                  <span className="font-medium mt-0.5 block">
                    {soilMoisture < 35
                      ? (language === 'pt' ? 'Solo seco (<35%). Sensores ativam a água para proteger a planta.' : 'Dry soil. Automatic valve opened.')
                      : (language === 'pt' ? 'Humidade ideal! Água poupada com sucesso pelos sensores.' : 'Ideal moisture. Saving water.')}
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors ${
                  greenhouseTemp > 28
                    ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-3xl">{greenhouseTemp > 28 ? '🌬️' : '🔒'}</span>
                <div className="text-xs">
                  <span className="font-black block uppercase tracking-wider">
                    {greenhouseTemp > 28
                      ? (language === 'pt' ? 'Ventilação: JANELAS ABERTAS 🌬️' : 'Vents: OPEN 🌬️')
                      : (language === 'pt' ? 'Ventilação: FECHADAS 🔒' : 'Vents: CLOSED 🔒')}
                  </span>
                  <span className="font-medium mt-0.5 block">
                    {greenhouseTemp > 28
                      ? (language === 'pt' ? 'Calor detetado (>28°C). Motores abrem o teto para arrefecer.' : 'High temp. Vents open.')
                      : (language === 'pt' ? 'Temperatura amena e controlada para as plantas.' : 'Normal temperature.')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SIMULATOR COMPLETION & XP REWARD BUTTON                      */}
        {/* ============================================================ */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {language === 'pt'
                ? 'Explora os controlos interativos de cada setor para experimentares a tecnologia.'
                : 'Explore interactive controls in each sector to see tech in action.'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSaveSimulatorProgress}
            disabled={isSavingXp || xpAwarded}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              xpAwarded
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-102 active:scale-95'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>
              {xpAwarded
                ? (language === 'pt' ? '✓ Simulação Concluída (+50 XP Registados)' : '✓ Simulation Completed (+50 XP)')
                : isSavingXp
                ? (language === 'pt' ? 'A registar...' : 'Saving...')
                : (language === 'pt' ? 'Concluir Simulação & Ganhar 50 XP 🏆' : 'Complete Lab & Earn 50 XP 🏆')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
