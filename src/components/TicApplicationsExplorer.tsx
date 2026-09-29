import React, { useState } from 'react';
import {
  School,
  HeartPulse,
  Navigation,
  ShoppingBag,
  Leaf,
  Factory,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Lightbulb,
  Wifi,
  AlertTriangle,
  Play,
  RotateCcw,
  CreditCard,
  Radio,
  BookOpen,
  MapPin,
  Clock,
  Droplets,
  Thermometer,
  Video,
  Truck,
  Package,
  Search
} from 'lucide-react';
import { Language } from '../types';

interface TicApplicationsExplorerProps {
  language: Language;
}

interface ApplicationArea {
  id: string;
  icon: string;
  badge: { pt: string; en: string };
  title: { pt: string; en: string };
  summary: { pt: string; en: string };
  keyPoints: { pt: string[]; en: string[] };
  realExample: {
    title: { pt: string; en: string };
    desc: { pt: string; en: string };
  };
  criticalThinking: {
    question: { pt: string; en: string };
    answer: { pt: string; en: string };
  };
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
    badge: { pt: 'Educação & Estudo', en: 'Education & Study' },
    title: { pt: 'TIC na Escola e no Dia a Dia', en: 'ICT at School & Daily Life' },
    summary: {
      pt: 'As TIC transformaram a forma como aprendemos, pesquisamos livros e partilhamos trabalhos escolares com colegas e professores.',
      en: 'ICT transforms how students learn, explore library books, and collaborate on school projects with teachers.',
    },
    keyPoints: {
      pt: [
        'Plataformas Digitais (Classroom/Teams/Moodle): acesso a tarefas, avisos e aulas a partir de casa.',
        'Catálogo Digital da Biblioteca: pesquisa imediata de livros por autor, tema ou disponibilidade.',
        'Quadros Interativos & Projetores: visualização de mapas 3D, vídeos e experiências interativas.',
        'Caderneta Digital: acompanhamento de presenças, horários e notas escolares pelas famílias.',
      ],
      en: [
        'Learning Platforms: access assignments, notices, and class materials from home.',
        'Digital Library Catalog: instant search for book availability, title, and topic.',
        'Interactive Boards & Projectors: dynamic 3D maps, videos, and science models.',
        'Digital Student Portal: transparent attendance, schedules, and grade reports.',
      ],
    },
    realExample: {
      title: { pt: 'O Trabalho de Grupo à Distância', en: 'Remote Group Collaboration' },
      desc: {
        pt: 'O Tiago e a Inês fizeram um trabalho de Ciências em conjunto num documento partilhado na nuvem sem precisarem de sair de casa ao fim da tarde.',
        en: 'Tiago and Inês collaborated on a shared cloud document for their Science project without traveling.',
      },
    },
    criticalThinking: {
      question: {
        pt: 'As tecnologias substituem a atenção e o esforço do aluno nas aulas?',
        en: 'Does technology replace student attention and curiosity in class?',
      },
      answer: {
        pt: 'Não! As TIC são ferramentas que nos ajudam a pesquisar e a aprender melhor, mas o esforço, o raciocínio e a criatividade do aluno continuam a ser essenciais.',
        en: 'No! ICT provides helpful tools to study and research, but student creativity, thinking, and focus remain essential.',
      },
    },
    colorTheme: {
      border: 'border-blue-200',
      bg: 'bg-blue-50/50',
      activeTab: 'bg-blue-600 text-white shadow-md',
      badgeBg: 'bg-blue-100 text-blue-900',
      badgeText: 'text-blue-700',
    },
  },
  {
    id: 'saude-transportes',
    icon: '🩺',
    badge: { pt: 'Saúde & Mobilidade', en: 'Healthcare & Transport' },
    title: { pt: 'TIC na Saúde e nos Transportes (GPS)', en: 'ICT in Healthcare & Transport (GPS)' },
    summary: {
      pt: 'A tecnologia salva vidas na medicina moderna através da telemedicina e apoia cirurgias, enquanto o GPS orienta milhões de viagens todos os dias.',
      en: 'Technology saves lives through telemedicine and surgical support, while satellite GPS guides millions of journeys.',
    },
    keyPoints: {
      pt: [
        'Processos Clínicos Eletrónicos: fichas médicas digitais (como o teu historial de vacinas e análises) que os médicos conseguem consultar com segurança em todo o país.',
        'Telemedicina: consultas por videochamada segura para quem vive em aldeias ou ilhas isoladas.',
        'Robôs Cirúrgicos: ferramentas de altíssima precisão controladas pelo cirurgião humano (apoiam, nunca substituem os médicos!).',
        'GPS & Navegação por Satélite: calcula caminhos rápidos, evita trânsito e mostra horários de autocarros e comboios em tempo real.',
      ],
      en: [
        'Electronic Health Records: secure patient records accessible across clinics nationwide.',
        'Telemedicine: remote video consultations for isolated or rural patients.',
        'Surgical Robots: precision instruments guided by human surgeons (they assist, never replace doctors).',
        'GPS Navigation: satellite signals calculate fastest routes and show live public transit schedules.',
      ],
    },
    realExample: {
      title: { pt: 'Encontrar o Museu numa Cidade Nova', en: 'Finding the Museum in a New City' },
      desc: {
        pt: 'A família da Sofia usou uma aplicação de mapas com GPS no telemóvel para caminhar diretamente até ao museu sem se perder.',
        en: 'Sofia’s family used a GPS mobile map app to navigate directly to the museum without getting lost.',
      },
    },
    criticalThinking: {
      question: {
        pt: 'Os robôs cirúrgicos operam as pessoas sozinhos enquanto os médicos vão tomar café?',
        en: 'Do surgical robots perform operations completely alone without doctors?',
      },
      answer: {
        pt: 'Nunca! Os robôs são instrumentos avançados de auxílio que executam os movimentos milimétricos com as mãos e a inteligência do cirurgião humano.',
        en: 'Never! Robotic tools are surgical aids guided every millisecond by skilled human doctors.',
      },
    },
    colorTheme: {
      border: 'border-purple-200',
      bg: 'bg-purple-50/50',
      activeTab: 'bg-purple-600 text-white shadow-md',
      badgeBg: 'bg-purple-100 text-purple-900',
      badgeText: 'text-purple-700',
    },
  },
  {
    id: 'comercio',
    icon: '💳',
    badge: { pt: 'Comércio & Pagamentos', en: 'Commerce & Payments' },
    title: { pt: 'TIC no Comércio e Pagamentos Contactless (NFC)', en: 'ICT in Commerce & Contactless (NFC)' },
    summary: {
      pt: 'Comprar e pagar tornou-se mais rápido e seguro com o comércio eletrónico e a tecnologia Contactless por aproximação.',
      en: 'Shopping and paying became faster and safer with e-commerce and tap-to-pay NFC technology.',
    },
    keyPoints: {
      pt: [
        'Contactless (NFC): aproximação do cartão ou telemóvel ao terminal (TPA) por ondas de rádio curtas sem inserir o cartão.',
        'Catálogos Online 24h: pesquisa de produtos com fotos, preços e avaliações de outros clientes.',
        'Circuito de 6 Fases da Compra Online: 1. Escolher ➔ 2. Encomendar ➔ 3. Pagar ➔ 4. Preparação em Armazém ➔ 5. Transporte (com rastreio) ➔ 6. Entrega.',
        'Cacifos Digitais & Rastreio: acompanhar onde vai a encomenda minuto a minuto através de um código.',
      ],
      en: [
        'Contactless NFC: short-range radio waves enable instant payment by hovering near the terminal.',
        'Online 24/7 Catalogs: product search with reviews, pricing, and high-resolution photos.',
        '6 E-Commerce Stages: 1. Choose ➔ 2. Order ➔ 3. Pay ➔ 4. Warehouse Preparation ➔ 5. Transport (with tracking) ➔ 6. Delivery.',
        'Smart Lockers & Tracking: follow parcels step-by-step with real-time tracking codes.',
      ],
    },
    realExample: {
      title: { pt: 'Pagar o Pão na Padaria com Contactless', en: 'Paying at Bakery with Contactless' },
      desc: {
        pt: 'A Maria apenas aproximou o cartão do leitor durante 1 segundo, ouviu o "piip" e o pagamento ficou concluído sem moedas.',
        en: 'Maria tapped her card on the counter terminal for 1 second, heard the beep, and paid without coins.',
      },
    },
    criticalThinking: {
      question: {
        pt: 'Comprar na Internet é sempre melhor do que ir à mercearia ou livraria do bairro?',
        en: 'Is buying online always better than shopping at local neighborhood stores?',
      },
      answer: {
        pt: 'Não! As lojas físicas da tua terra apoiam a economia local, permitem ver e tocar nos produtos e evitam custos de transporte e caixas de cartão!',
        en: 'No! Local physical shops support the community, allow touching items, and save courier packaging waste!',
      },
    },
    colorTheme: {
      border: 'border-amber-200',
      bg: 'bg-amber-50/50',
      activeTab: 'bg-amber-600 text-white shadow-md',
      badgeBg: 'bg-amber-100 text-amber-900',
      badgeText: 'text-amber-700',
    },
  },
  {
    id: 'ambiente-industria',
    icon: '🌾',
    badge: { pt: 'Ambiente & Indústria', en: 'Environment & Industry' },
    title: { pt: 'TIC na Agricultura, Indústria e Ambiente (Sensores & IoT)', en: 'ICT in Agriculture, Industry & Environment' },
    summary: {
      pt: 'Sensores inteligentes e a Internet das Coisas (IoT) ajudam a poupar água nos campos, automatizar fábricas e monitorizar a saúde do nosso planeta.',
      en: 'Smart sensors and IoT conserve irrigation water in farming, automate factories, and monitor our planet’s climate.',
    },
    keyPoints: {
      pt: [
        'Sensores de Humidade no Solo: medem a água na terra e só ligam a rega quando o solo está seco, poupando água.',
        'IoT (Internet das Coisas): aparelhos do dia a dia (sensores, regadores, lâmpadas) ligados em rede a comunicar dados.',
        'Robôs Industriais: realizam montagens e trabalhos pesados ou perigosos com precisão milimétrica.',
        'Satélites Ambientais: previsão de tempestades, monitorização de fogos florestais e deteção de poluição dos oceanos.',
      ],
      en: [
        'Soil Moisture Sensors: measure moisture levels to trigger irrigation only when necessary, saving water.',
        'IoT (Internet of Things): everyday objects connected to exchange automated data.',
        'Industrial Robots: perform heavy, repetitive, or dangerous factory tasks with precision.',
        'Environmental Satellites: forecast severe weather, track wildfires, and monitor ocean pollution.',
      ],
    },
    realExample: {
      title: { pt: 'A Estufa Inteligente', en: 'The Smart Greenhouse' },
      desc: {
        pt: 'Uma estufa abre janelas automaticamente quando faz demasiado calor e fecha-as quando chove, tudo controlado por sensores e microcomputadores.',
        en: 'A greenhouse opens roof vents automatically when hot and closes them during rain, managed by IoT sensors.',
      },
    },
    criticalThinking: {
      question: {
        pt: 'Como é que os sensores IoT ajudam a proteger o planeta Terra?',
        en: 'How do IoT sensors help protect planet Earth?',
      },
      answer: {
        pt: 'Ao medirem com exatidão a água, a energia e a poluição, evitam desperdícios e ajudam a tomar decisões ecológicas em tempo real!',
        en: 'By precisely measuring water, energy, and air emissions, they prevent waste and enable eco-friendly decisions!',
      },
    },
    colorTheme: {
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/50',
      activeTab: 'bg-emerald-600 text-white shadow-md',
      badgeBg: 'bg-emerald-100 text-emerald-900',
      badgeText: 'text-emerald-700',
    },
  },
];

export const TicApplicationsExplorer: React.FC<TicApplicationsExplorerProps> = ({ language }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('escola');

  // Simulator States
  // 1. Escola: Library Simulator
  const [selectedBook, setSelectedBook] = useState<'principezinho' | 'ulisses' | 'robo5'>('principezinho');
  const [bookLoaned, setBookLoaned] = useState<boolean>(false);
  const [libraryFeedback, setLibraryFeedback] = useState<string | null>(null);

  // 2. Saúde & Transportes: GPS & Telemedicina Simulator
  const [gpsDest, setGpsDest] = useState<'escola' | 'hospital' | 'biblioteca'>('escola');
  const [gpsTraffic, setGpsTraffic] = useState<'fluido' | 'intenso'>('fluido');
  const [telemedActive, setTelemedActive] = useState<boolean>(false);

  // 3. Comércio: NFC & E-Commerce Pipeline Simulator
  const [nfcSuccess, setNfcSuccess] = useState<boolean>(false);
  const [orderStage, setOrderStage] = useState<number>(1);

  // 4. Ambiente: IoT Smart Greenhouse Simulator
  const [soilMoisture, setSoilMoisture] = useState<number>(25); // Starts dry to demonstrate smart watering
  const [greenhouseTemp, setGreenhouseTemp] = useState<number>(24);

  const activeArea = AREAS.find((a) => a.id === selectedAreaId) || AREAS[0];

  const handleTapNfc = () => {
    setNfcSuccess(true);
    setTimeout(() => setNfcSuccess(false), 3000);
  };

  const booksData = {
    principezinho: {
      title: 'O Principezinho (Antoine de Saint-Exupéry)',
      shelf: 'Estante A-04 • Literatura Infantil',
      code: 'BIB-5A-092',
      available: true,
    },
    ulisses: {
      title: 'Ulisses (Maria Alberta Menéres)',
      shelf: 'Estante B-12 • Mitos e Lendas',
      code: 'BIB-5A-144',
      available: false,
    },
    robo5: {
      title: 'Robôs & O Futuro da Informação',
      shelf: 'Estante C-01 • Ciência e TIC',
      code: 'BIB-5A-881',
      available: true,
    },
  };

  const orderStages = [
    { num: 1, label: language === 'pt' ? '1. Escolher Produto' : '1. Select Item', icon: '🛒' },
    { num: 2, label: language === 'pt' ? '2. Fazer Encomenda' : '2. Place Order', icon: '📝' },
    { num: 3, label: language === 'pt' ? '3. Pagamento Seguro' : '3. Secure Payment', icon: '💳' },
    { num: 4, label: language === 'pt' ? '4. Separação em Armazém' : '4. Warehouse Pack', icon: '📦' },
    { num: 5, label: language === 'pt' ? '5. Transporte & Rastreio' : '5. Shipping Tracker', icon: '🚚' },
    { num: 6, label: language === 'pt' ? '6. Entrega ao Aluno' : '6. Delivered', icon: '🏡' },
  ];

  return (
    <div className="space-y-6 w-full animate-in fade-in">
      {/* Top Banner / Header as in User Design */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-900/50">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
            🌐
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-400 text-slate-950 mb-1">
              {language === 'pt' ? 'VISÃO GERAL DAS ÁREAS DE APLICAÇÃO' : 'OVERVIEW OF APPLICATION AREAS'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {language === 'pt'
                ? 'As TIC no Mundo Real: Onde e Como são Utilizadas?'
                : 'ICT in the Real World: Where and How are they used?'}
            </h3>
          </div>
        </div>
        <p className="text-xs text-indigo-200/90 max-w-md font-medium leading-relaxed">
          {language === 'pt'
            ? 'Clica nas 4 áreas abaixo para explorar como as tecnologias transformam a escola, a saúde, os transportes, as compras e o ambiente!'
            : 'Click on the 4 areas below to explore how technology impacts school, health, transport, commerce and environment!'}
        </p>
      </div>

      {/* 4 Interactive Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {AREAS.map((area) => {
          const isSelected = area.id === selectedAreaId;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setSelectedAreaId(area.id)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
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

      {/* Selected Area Content Detail Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border-2 ${activeArea.colorTheme.border} ${activeArea.colorTheme.bg} bg-white shadow-sm space-y-6 animate-in fade-in duration-200`}
      >
        {/* Header of Active Area */}
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
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs self-start sm:self-auto">
            {language === 'pt' ? 'Tema 2: Aplicação das TIC' : 'Topic 2: ICT Applications'}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
          {activeArea.summary[language]}
        </p>

        {/* Key Points Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{language === 'pt' ? 'COMO É QUE AS TIC ATUAM NESTA ÁREA?' : 'KEY ICT FEATURES IN THIS AREA'}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeArea.keyPoints[language].map((pt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800 leading-snug"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* LIVE INTERACTIVE SIMULATORS SPECIFIC TO EACH SECTOR           */}
        {/* ============================================================ */}

        {/* 1. ESCOLA: Simulador de Catálogo de Biblioteca & Caderneta */}
        {activeArea.id === 'escola' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-blue-900 font-black text-sm sm:text-base">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>{language === 'pt' ? 'Simulador: Catálogo Digital da Biblioteca Escolar' : 'Simulator: School Digital Library'}</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {language === 'pt' ? 'Base de Dados ao Vivo' : 'Live Database'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'pt'
                ? 'Escolhe um livro do catálogo para veres como a base de dados das TIC encontra instantaneamente a sua localização e estado de requisição:'
                : 'Pick a book to see how the school ICT database checks shelf location and availability in real time:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(['principezinho', 'ulisses', 'robo5'] as const).map((key) => {
                const b = booksData[key];
                const isSel = selectedBook === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedBook(key);
                      setBookLoaned(false);
                      setLibraryFeedback(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSel ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-300' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900 truncate">{b.title}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{b.shelf}</p>
                  </button>
                );
              })}
            </div>

            {/* Book Inspection Result */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black text-slate-800">{booksData[selectedBook].title}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  ID: {booksData[selectedBook].code} • {booksData[selectedBook].shelf}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    bookLoaned
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : booksData[selectedBook].available
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {bookLoaned
                      ? (language === 'pt' ? '✓ Requisitado por ti (Prazo: 15 dias)' : '✓ Loaned to you')
                      : booksData[selectedBook].available
                      ? (language === 'pt' ? '🟢 Disponível para Empréstimo' : '🟢 Available')
                      : (language === 'pt' ? '🔴 Emprestado a um colega' : '🔴 Checked out')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {booksData[selectedBook].available && !bookLoaned && (
                  <button
                    type="button"
                    onClick={() => {
                      setBookLoaned(true);
                      setLibraryFeedback(language === 'pt' ? 'Livro requisitado com sucesso! Registado na Caderneta Digital.' : 'Loan successful!');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    {language === 'pt' ? 'Requisitar Livro 📚' : 'Borrow Book 📚'}
                  </button>
                )}
                {bookLoaned && (
                  <button
                    type="button"
                    onClick={() => {
                      setBookLoaned(false);
                      setLibraryFeedback(language === 'pt' ? 'Livro devolvido à biblioteca.' : 'Returned.');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                  >
                    {language === 'pt' ? 'Devolver 🔄' : 'Return'}
                  </button>
                )}
              </div>
            </div>

            {libraryFeedback && (
              <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 animate-in fade-in">
                ✨ {libraryFeedback}
              </p>
            )}
          </div>
        )}

        {/* 2. SAÚDE & TRANSPORTES: Simulador de GPS Satélite & Telemedicina */}
        {activeArea.id === 'saude-transportes' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-purple-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-purple-900 font-black text-sm sm:text-base">
                <Navigation className="w-5 h-5 text-purple-600" />
                <span>{language === 'pt' ? 'Simulador: Navegador GPS por Satélite & Telemedicina' : 'Simulator: Satellite GPS & Telemedicine'}</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                🛰️ {language === 'pt' ? '4 Satélites em Órbita' : '4 GPS Satellites'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'pt'
                ? 'O GPS recebe sinais de satélites para calcular o melhor trajeto. Escolhe um destino e as condições do trânsito para observar o cálculo de rota em tempo real:'
                : 'GPS uses satellite signals to compute routes. Choose a destination and traffic conditions to see real-time route calculations:'}
            </p>

            {/* Destination & Traffic Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{language === 'pt' ? 'Destino da Viagem:' : 'Destination:'}</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['escola', 'hospital', 'biblioteca'] as const).map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setGpsDest(dest)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        gpsDest === dest ? 'bg-purple-600 text-white border-purple-600 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {dest === 'escola' ? '🏫 Escola' : dest === 'hospital' ? '🏥 Hospital' : '🏛️ Biblioteca'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{language === 'pt' ? 'Condições do Trânsito:' : 'Traffic:'}</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setGpsTraffic('fluido')}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      gpsTraffic === 'fluido' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🟢 {language === 'pt' ? 'Trânsito Fluido' : 'Clear Road'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGpsTraffic('intenso')}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      gpsTraffic === 'intenso' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🔴 {language === 'pt' ? 'Hora de Ponta' : 'Rush Hour'}
                  </button>
                </div>
              </div>
            </div>

            {/* GPS Screen Simulation */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <Wifi className="w-3.5 h-3.5" /> GPS Online (Sinais Satélite: 98%)
                </span>
                <span className="font-mono">Velocidade: 45 km/h</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-purple-300 uppercase font-black tracking-wider">
                    {language === 'pt' ? 'Tempo Estimado de Chegada' : 'ETA'}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-white">
                    {gpsTraffic === 'fluido' ? (gpsDest === 'hospital' ? '12 min' : '7 min') : (gpsDest === 'hospital' ? '28 min' : '19 min')}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-300 block">
                    {gpsDest === 'escola' ? 'Destino: Escola Básica 5.º Ano' : gpsDest === 'hospital' ? 'Destino: Hospital Pediátrico' : 'Destino: Biblioteca Municipal'}
                  </span>
                  <span className="text-[11px] text-amber-300">
                    {gpsTraffic === 'intenso' ? '⚠️ Rota recalculada para evitar obras' : '✓ Trajeto mais rápido selecionado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Telemedicina Bonus Demo */}
            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-purple-700 shrink-0" />
                <div className="text-xs">
                  <span className="font-black text-purple-950 block">
                    {language === 'pt' ? 'Consulta por Telemedicina Segura' : 'Secure Telemedicine Call'}
                  </span>
                  <span className="text-purple-800">
                    {telemedActive
                      ? (language === 'pt' ? '🟢 Videochamada médica encriptada em direto com o Centro de Saúde' : '🟢 Call connected')
                      : (language === 'pt' ? 'Acesso a médicos à distância para aldeias ou ilhas isoladas' : 'Remote doctor access')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTelemedActive(!telemedActive)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  telemedActive ? 'bg-rose-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {telemedActive ? (language === 'pt' ? 'Desligar ✕' : 'End') : (language === 'pt' ? 'Simular Chamada 📞' : 'Test Call 📞')}
              </button>
            </div>
          </div>
        )}

        {/* 3. COMÉRCIO: Simulador Contactless (NFC) & Circuito de Compras */}
        {activeArea.id === 'comercio' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base">
                <CreditCard className="w-5 h-5 text-amber-600" />
                <span>{language === 'pt' ? 'Simulador: Pagamento Contactless (NFC) & Rastreio de Compras' : 'Simulator: Contactless (NFC) & Package Tracking'}</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                📲 {language === 'pt' ? 'Rádio de Curto Alcance' : 'Short-Range Radio'}
              </span>
            </div>

            {/* Interactive NFC Terminal Simulator */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-all ${
                  nfcSuccess ? 'bg-emerald-500 text-white scale-110 rotate-6 animate-bounce' : 'bg-white text-amber-700 border border-amber-200'
                }`}>
                  {nfcSuccess ? '✓' : '💳'}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-white/70 px-2 py-0.5 rounded-md">
                    Terminal TPA • Contactless
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

            {/* 6-Stage E-Commerce Pipeline */}
            <div className="space-y-2 pt-2">
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
                    <div
                      key={st.num}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-black scale-105'
                          : isDone
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <span className="text-lg block mb-1">{st.icon}</span>
                      <p className="text-[11px] leading-tight font-bold">{st.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4. AMBIENTE: Simulador de Estufa Inteligente com Sensores IoT */}
        {activeArea.id === 'ambiente-industria' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm sm:text-base">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span>{language === 'pt' ? 'Simulador: Estufa Inteligente & Sensores de Solo (IoT)' : 'Simulator: Smart Greenhouse & Soil IoT Sensors'}</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                🌿 {language === 'pt' ? 'Poupança de Água' : 'Water Conservation'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'pt'
                ? 'Mexe nos controlos de humidade e temperatura abaixo para veres como os sensores inteligentes tomam decisões automáticas para poupar água e proteger as plantas:'
                : 'Adjust moisture and temperature sliders to see how smart IoT sensors automatically trigger irrigation and venting:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Moisture Slider */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-700 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    {language === 'pt' ? 'Humidade do Solo:' : 'Soil Moisture:'}
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
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-700 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-rose-600" />
                    {language === 'pt' ? 'Temperatura do Ar:' : 'Air Temperature:'}
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

            {/* IoT Sensor Automated Decisions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
                soilMoisture < 35
                  ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                <span className="text-2xl">{soilMoisture < 35 ? '💧' : '🌱'}</span>
                <div className="text-xs">
                  <span className="font-black block uppercase tracking-wider">
                    {soilMoisture < 35 ? (language === 'pt' ? 'Rega Inteligente: LIGADA' : 'Irrigation: ON') : (language === 'pt' ? 'Rega Inteligente: DESLIGADA' : 'Irrigation: OFF')}
                  </span>
                  <span className="font-medium">
                    {soilMoisture < 35
                      ? (language === 'pt' ? 'Solo seco. Válvula automática ativada pelos sensores.' : 'Dry soil. Sprinklers active.')
                      : (language === 'pt' ? 'Humidade ideal! Água poupada com sucesso.' : 'Ideal moisture. Saving water.')}
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
                greenhouseTemp > 28
                  ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <span className="text-2xl">{greenhouseTemp > 28 ? '🌬️' : '🔒'}</span>
                <div className="text-xs">
                  <span className="font-black block uppercase tracking-wider">
                    {greenhouseTemp > 28 ? (language === 'pt' ? 'Ventilação: CLARABÓIAS ABERTAS' : 'Venting: OPEN') : (language === 'pt' ? 'Ventilação: FECHADAS' : 'Venting: CLOSED')}
                  </span>
                  <span className="font-medium">
                    {greenhouseTemp > 28
                      ? (language === 'pt' ? 'Calor detetado. Motores abrem o teto para arrefecer.' : 'Hot air. Motors opened roof vents.')
                      : (language === 'pt' ? 'Temperatura estável para as plantas.' : 'Stable climate.')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real Example & Critical Thinking in 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Example Box */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                {language === 'pt' ? 'Exemplo Prático:' : 'Practical Example:'} {activeArea.realExample.title[language]}
              </h5>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {activeArea.realExample.desc[language]}
            </p>
          </div>

          {/* Critical Thinking Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <h5 className="text-xs sm:text-sm font-black text-amber-950">
                {language === 'pt' ? 'Pensamento Crítico:' : 'Critical Thinking:'} {activeArea.criticalThinking.question[language]}
              </h5>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              👉 {activeArea.criticalThinking.answer[language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
