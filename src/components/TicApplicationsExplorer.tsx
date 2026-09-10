import React, { useState } from 'react';
import { School, HeartPulse, Navigation, ShoppingBag, Leaf, Factory, Sparkles, CheckCircle2, HelpCircle, ArrowRight, Lightbulb, Wifi, AlertTriangle } from 'lucide-react';
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
        'Circuito de 6 Fases da Compra Online: 1. Escolher ➔ 2. Encomendar ➔ 3. Pagar ➔ 4. Armazém ➔ 5. GPS ➔ 6. Entrega.',
        'Cacifos Digitais & Rastreio: acompanhar onde vai a encomenda minuto a minuto através de um código.',
      ],
      en: [
        'Contactless NFC: short-range radio waves enable instant payment by hovering near the terminal.',
        'Online 24/7 Catalogs: product search with reviews, pricing, and high-resolution photos.',
        '6 E-Commerce Stages: 1. Choose ➔ 2. Order ➔ 3. Pay ➔ 4. Pack ➔ 5. GPS Transit ➔ 6. Delivery.',
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

  const activeArea = AREAS.find((a) => a.id === selectedAreaId) || AREAS[0];

  return (
    <div className="space-y-6 w-full animate-in fade-in">
      {/* Intro Header Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-indigo-400/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 text-amber-300 flex items-center justify-center text-2xl shrink-0 backdrop-blur-xs border border-white/20">
            🌐
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-2 py-0.5 rounded-md">
              {language === 'pt' ? 'Visão Geral das Áreas de Aplicação' : 'Overview of Application Sectors'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
              {language === 'pt' ? 'As TIC no Mundo Real: Onde e Como são Utilizadas?' : 'Real-World ICT: Where and How is it Used?'}
            </h3>
          </div>
        </div>
        <p className="text-xs text-indigo-100 max-w-md font-medium leading-relaxed">
          {language === 'pt'
            ? 'Clica nas 4 áreas abaixo para explorar como as tecnologias transformam a escola, a saúde, os transportes, as compras e o ambiente!'
            : 'Click the 4 sectors below to explore how technology powers education, health, transport, commerce, and sustainability!'}
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
            {language === 'pt' ? 'Tema 1: Aplicação das TIC' : 'Theme 1: ICT Applications'}
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
            <span>{language === 'pt' ? 'Como é que as TIC atuam nesta área?' : 'Key ICT Features in this Sector'}</span>
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
