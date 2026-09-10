import React, { useState } from 'react';
import { History, Briefcase, Sparkles, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface TicEvolutionExplorerProps {
  language?: Language;
}

interface Era {
  id: string;
  eraName: { pt: string; en: string };
  year: string;
  icon: string;
  title: { pt: string; en: string };
  desc: { pt: string; en: string };
  comparison: {
    before: { pt: string; en: string };
    now: { pt: string; en: string };
  };
  funFact: { pt: string; en: string };
}

const ERAS: Era[] = [
  {
    id: 'eniac',
    eraName: { pt: 'Os Pioneiros', en: 'The Pioneers' },
    year: '1946',
    icon: '🏛️',
    title: { pt: 'O Gigante ENIAC', en: 'The Giant ENIAC' },
    desc: {
      pt: 'O ENIAC pesava 30 toneladas e ocupava uma sala inteira de 160 m²! Funcionava com válvulas que aqueciam imenso.',
      en: 'ENIAC weighed 30 tons and occupied 160 m²! It ran on glowing vacuum tubes.',
    },
    comparison: {
      before: { pt: 'Cálculos demoravam dias a serem feitos à mão.', en: 'Calculations took days by hand.' },
      now: { pt: 'Um telemóvel no teu bolso é milhões de vezes mais rápido que o ENIAC!', en: 'A smartphone in your pocket is millions of times faster than ENIAC!' },
    },
    funFact: {
      pt: 'Para programar o ENIAC era preciso ligar e desligar cabos elétricos gigantescos à mão!',
      en: 'Programming ENIAC required rewiring massive electric cables manually!',
    },
  },
  {
    id: 'internet',
    eraName: { pt: 'A Revolução da Web', en: 'The Web Revolution' },
    year: '1990s',
    icon: '🌐',
    title: { pt: 'O Nascimento da World Wide Web', en: 'Birth of the World Wide Web' },
    desc: {
      pt: 'A Web permitiu ligar documentos e computadores em todo o mundo através de hiperligações (links).',
      en: 'The Web connected documents and computers worldwide through hyperlinks.',
    },
    comparison: {
      before: { pt: 'Pesquisar exigia consultar dezenas de enciclopédias de papel na biblioteca.', en: 'Research meant reading heavy paper encyclopedias at the library.' },
      now: { pt: 'Procuramos e acedemos a museus e livros mundiais em milissegundos.', en: 'We access world museums and books in milliseconds.' },
    },
    funFact: {
      pt: 'A primeira página web da história ainda está online e explica como criar links!',
      en: 'The very first web page in history is still online and explains how links work!',
    },
  },
  {
    id: 'supercomputadores',
    eraName: { pt: 'A Era Atual', en: 'The Modern Era' },
    year: 'Hoje',
    icon: '⚡',
    title: { pt: 'Supercomputadores, Robótica e IA', en: 'Supercomputers, Robotics & AI' },
    desc: {
      pt: 'Supercomputadores como o Deucalion (em Portugal) realizam biliões de cálculos por segundo para simular o clima e investigar a cura de doenças.',
      en: 'Supercomputers process trillions of operations per second to forecast weather and study medicine.',
    },
    comparison: {
      before: { pt: 'Cirurgias difíceis dependiam apenas de ferramentas manuais.', en: 'Complex surgeries relied only on manual tools.' },
      now: { pt: 'Robôs cirúrgicos de alta precisão auxiliam os médicos a operar com cortes milimétricos.', en: 'Precision surgical robots assist doctors with millimeter accuracy.' },
    },
    funFact: {
      pt: 'Hoje existem mais dispositivos ligados à Internet no planeta do que pessoas!',
      en: 'There are now more internet-connected devices on Earth than humans!',
    },
  },
];

const CAREERS = [
  {
    title: { pt: 'Programador de Aplicações', en: 'App Developer' },
    icon: '💻',
    desc: { pt: 'Cria jogos, programas e plataformas educativas que usamos todos os dias.', en: 'Builds games, aplicações, and learning platforms used every day.' },
  },
  {
    title: { pt: 'Especialista em Cibersegurança', en: 'Cybersecurity Defender' },
    icon: '🛡️',
    desc: { pt: 'Protege hospitais, escolas e pessoas contra ataques digitais e vírus.', en: 'Protects hospitals, schools, and people from cyber attacks and malware.' },
  },
  {
    title: { pt: 'Engenheiro de Robótica & IoT', en: 'Robotics & IoT Engineer' },
    icon: '🤖',
    desc: { pt: 'Desenvolve sensores inteligentes e robôs para agricultura e indústria.', en: 'Builds smart sensors and robots for smart farming and industry.' },
  },
  {
    title: { pt: 'Designer de Experiência Digital (UI/UX)', en: 'Digital UX/UI Designer' },
    icon: '🎨',
    desc: { pt: 'Desenha botões, ecrãs e jogos fáceis e intuitivos para qualquer pessoa usar.', en: 'Designs intuitive buttons, screens, and games for everyone.' },
  },
];

export const TicEvolutionExplorer: React.FC<TicEvolutionExplorerProps> = ({ language = 'pt' }) => {
  const [selectedEra, setSelectedEra] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'evolution' | 'careers'>('evolution');

  const era = ERAS[selectedEra];

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-md border-2 border-indigo-500/30">
      {/* Header with selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-indigo-800/60">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-bold shadow-xs">
            ⏳
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {language === 'pt' ? 'Viagem no Tempo das TIC & Profissões Digitais' : 'ICT Time Machine & Digital Careers'}
            </h3>
            <p className="text-xs text-indigo-200 font-medium">
              {language === 'pt' ? 'Clica nas etapas para ver a incrível evolução e quem constrói o futuro!' : 'Click eras to explore technological evolution and future careers!'}
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-indigo-900/60 p-1 border border-indigo-700/50 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('evolution')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'evolution' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-indigo-200 hover:text-white'
            }`}
          >
            {language === 'pt' ? 'Linha do Tempo' : 'Timeline'}
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'careers' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-indigo-200 hover:text-white'
            }`}
          >
            {language === 'pt' ? 'Profissões TIC' : 'ICT Careers'}
          </button>
        </div>
      </div>

      {activeTab === 'evolution' ? (
        <div className="space-y-4">
          {/* Era Navigation buttons */}
          <div className="grid grid-cols-3 gap-2">
            {ERAS.map((e, idx) => (
              <button
                key={e.id}
                onClick={() => setSelectedEra(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedEra === idx
                    ? 'bg-indigo-600 text-white border-amber-400 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-indigo-900/40 text-indigo-200 border-indigo-800/60 hover:bg-indigo-900/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black text-amber-300 mb-1">
                  <span>{e.year}</span>
                  <span className="text-base">{e.icon}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold truncate">{e.eraName[language]}</p>
              </button>
            ))}
          </div>

          {/* Active Era Details */}
          <div className="bg-indigo-900/50 rounded-2xl p-4 sm:p-5 border border-indigo-700/60 space-y-4">
            <div className="flex items-center gap-2 text-amber-300">
              <span className="text-2xl">{era.icon}</span>
              <h4 className="text-base sm:text-lg font-black">{era.title[language]} ({era.year})</h4>
            </div>

            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
              {era.desc[language]}
            </p>

            {/* Before vs Now Comparison Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                <span className="text-[10px] uppercase font-black tracking-wider text-rose-400 block mb-1">
                  {language === 'pt' ? '📜 Como era antes:' : '📜 How it was:'}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{era.comparison.before[language]}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 block mb-1">
                  {language === 'pt' ? '🚀 Como é agora (Graças às TIC):' : '🚀 How it is now:'}
                </span>
                <p className="text-xs text-emerald-100 leading-relaxed font-medium">{era.comparison.now[language]}</p>
              </div>
            </div>

            {/* Fun Fact Badge */}
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs flex items-center gap-2">
              <span className="text-base">💡</span>
              <p className="font-medium">{era.funFact[language]}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAREERS.map((career, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-indigo-900/50 border border-indigo-700/60 flex items-start gap-3">
              <span className="text-3xl p-2 bg-indigo-950 rounded-xl shrink-0">{career.icon}</span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-amber-300 mb-1">{career.title[language]}</h4>
                <p className="text-xs text-indigo-100 leading-relaxed font-medium">{career.desc[language]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
