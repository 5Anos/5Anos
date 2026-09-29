import React, { useState } from 'react';
import { Search, Sparkles, Filter, CheckCircle2, ShieldCheck, Zap, RotateCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { AudioSpeakButton } from './AudioSpeakButton';

interface SearchOperatorsLabProps {
  language?: Language;
}

interface OperatorExperiment {
  id: string;
  name: { pt: string; en: string };
  operatorIcon: string;
  operatorSymbol: string;
  ruleExplanation: { pt: string; en: string };
  initialQuery: string;
  badResultsCount: number;
  badResultsPreview: { title: string; type: 'unwanted' | 'good'; desc: string }[];
  operatorAppliedQuery: string;
  goodResultsCount: number;
  goodResultsPreview: { title: string; type: 'unwanted' | 'good'; desc: string }[];
}

const EXPERIMENTS: OperatorExperiment[] = [
  {
    id: 'aspas',
    name: { pt: 'Aspas "" (Expressão Exata)', en: 'Quotation Marks "" (Exact Match)' },
    operatorIcon: '💬',
    operatorSymbol: '" "',
    ruleExplanation: {
      pt: 'As aspas forçam o motor de busca a encontrar exatamente aquelas palavras juntas e pela mesma ordem. Muito útil para nomes de reis, poemas ou títulos de livros!',
      en: 'Quotation marks force the engine to match words together in that exact sequence. Essential for names, poems, or book titles!',
    },
    initialQuery: 'D. Afonso Henriques primeiro rei',
    badResultsCount: 4200000,
    badResultsPreview: [
      { title: 'Restaurante D. Afonso — Menus de Almoço', type: 'unwanted', desc: 'Pratos do dia no centro da cidade perto do largo...' },
      { title: 'Henriques & Filhos — Oficina de Automóveis', type: 'unwanted', desc: 'Reparação de travões e mudanças de óleo com desconto...' },
      { title: 'História do Primeiro Rei de Portugal', type: 'good', desc: 'Nascido em Guimarães, fundador da nacionalidade...' },
    ],
    operatorAppliedQuery: '"D. Afonso Henriques" primeiro rei',
    goodResultsCount: 145000,
    goodResultsPreview: [
      { title: 'D. Afonso Henriques — O Conquistador (Ensina RTP)', type: 'good', desc: 'Biografia completa do fundador e primeiro rei oficial de Portugal desde a Batalha de 1128...' },
      { title: 'Castelo de Guimarães e D. Afonso Henriques', type: 'good', desc: 'Monumento nacional ligado à infância do rei fundador...' },
      { title: 'Tratado de Zamora e o Reconhecimento do Reino', type: 'good', desc: 'Em 1143 o reino de Leão reconhece D. Afonso Henriques como monarca independente...' },
    ],
  },
  {
    id: 'menos',
    name: { pt: 'Sinal Menos - (Excluir Palavras)', en: 'Minus Sign - (Exclude Words)' },
    operatorIcon: '➖',
    operatorSymbol: '-',
    ruleExplanation: {
      pt: 'Colocar o sinal de menos colado a uma palavra (ex: -carro) manda o motor de busca apagar todos os resultados que falem sobre esse assunto indesejado!',
      en: 'Placing a minus sign right before a word (e.g. -car) tells the engine to strip away any results mentioning that topic!',
    },
    initialQuery: 'jaguar animal',
    badResultsCount: 8900000,
    badResultsPreview: [
      { title: 'Jaguar Portugal — Carros Novos e SUV Elétricos', type: 'unwanted', desc: 'Conheça a gama de veículos de luxo e marque o seu test-drive oficial...' },
      { title: 'Peças Usadas para Automóveis Jaguar', type: 'unwanted', desc: 'Faróis, jantes de liga leve e filtros para motores desportivos...' },
      { title: 'O Jaguar: O Maior Felino da América do Sul', type: 'good', desc: 'Mamífero carnívoro com pelagem manchada que vive na selva amazónica...' },
    ],
    operatorAppliedQuery: 'jaguar animal -carro -veiculo',
    goodResultsCount: 320000,
    goodResultsPreview: [
      { title: 'Jaguar (Panthera onca) — Enciclopédia dos Animais', type: 'good', desc: 'Grande predador felino com mordedura poderosa capaz de caçar jacarés e capivaras...' },
      { title: 'Habitat e Conservação do Jaguar na Amazónia', type: 'good', desc: 'Projetos de proteção na floresta tropical e reservas biológicas...' },
      { title: 'Diferença entre Leopardo, Chita e Jaguar', type: 'good', desc: 'Como distinguir as rosetas da pele e o tamanho do crânio...' },
    ],
  },
  {
    id: 'site_pt',
    name: { pt: 'Operador site:.pt (Apenas Sites Oficiais)', en: 'Operator site:.pt (Only Local Domains)' },
    operatorIcon: '🇵🇹',
    operatorSymbol: 'site:.pt',
    ruleExplanation: {
      pt: 'Escrever site:.pt faz o motor mostrar apenas páginas registadas em Portugal (escolas, universidades, museus e jornais nacionais), evitando sites de outros países com linguagem diferente!',
      en: 'Typing site:.pt filters results exclusively to Portuguese verified domains (schools, museums, official science portals)!',
    },
    initialQuery: 'golfinhos sado observacao',
    badResultsCount: 1200000,
    badResultsPreview: [
      { title: 'Passeios de barco no Caribe e México', type: 'unwanted', desc: 'Reserve o seu resort com tudo incluído nas praias de Cancún...' },
      { title: 'Roatán Dolphin Encounter — International Resort', type: 'unwanted', desc: 'Experience swimming with captive dolphins in tourist pools...' },
      { title: 'Comunidade de Roazes do Estuário do Sado', type: 'good', desc: 'A única colónia residente de golfinhos em estuário em Portugal...' },
    ],
    operatorAppliedQuery: 'golfinhos sado observacao site:.pt',
    goodResultsCount: 45000,
    goodResultsPreview: [
      { title: 'Golfinhos do Rio Sado — ICNF Reserva Natural (.pt)', type: 'good', desc: 'Proteção oficial da população sedentária de roazes-corvineiros na Baía de Setúbal...' },
      { title: 'Centro Ciência Viva de Setúbal — Rota dos Golfinhos', type: 'good', desc: 'Atividades educativas para turmas do 5.º e 6.º ano sobre a fauna marinha...' },
      { title: 'Observação Responsável na Reserva Natural do Sado', type: 'good', desc: 'Regras de conduta para embarcações turísticas sem perturbar as crias...' },
    ],
  },
];

export const SearchOperatorsLab: React.FC<SearchOperatorsLabProps> = ({ language = 'pt' }) => {
  const [activeExpId, setActiveExpId] = useState<string>('aspas');
  const [isOperatorActive, setIsOperatorActive] = useState<boolean>(false);
  const [completedExps, setCompletedExps] = useState<Record<string, boolean>>({});

  const curExp = EXPERIMENTS.find((e) => e.id === activeExpId) || EXPERIMENTS[0];

  const handleToggleOperator = () => {
    const nextState = !isOperatorActive;
    setIsOperatorActive(nextState);

    if (nextState) {
      setCompletedExps((prev) => ({ ...prev, [curExp.id]: true }));
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#3b82f6', '#8b5cf6'],
        });
      } catch {
        // safe fallback
      }
    }
  };

  const handleSelectExp = (id: string) => {
    setActiveExpId(id);
    setIsOperatorActive(false);
  };

  const totalDone = Object.values(completedExps).filter(Boolean).length;

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 rounded-3xl border-2 border-indigo-200/90 p-4 sm:p-6 shadow-sm space-y-5 animate-in fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {language === 'pt' ? 'Laboratório dos Superpoderes: Aspas e Sinal Menos' : 'Search Superpowers Lab'}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                {language === 'pt' ? 'Filtros Secretos' : 'Secret Filters'}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Ativa os superpoderes dos motores de busca para filtrar lixo e encontrar exatamente o que precisas!'
                : 'Turn on search superpowers to filter noise and hit exact information!'}
            </p>
          </div>
        </div>

        {/* Live Score Pill */}
        <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-2xl text-xs shadow-xs">
          <span className="text-indigo-300 font-bold">
            {language === 'pt' ? 'Poderes Testados:' : 'Powers Mastered:'}
          </span>
          <span className="font-black px-2 py-0.5 rounded-xl bg-indigo-500 text-white">
            {totalDone} / {EXPERIMENTS.length}
          </span>
        </div>
      </div>

      {/* Operator Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {EXPERIMENTS.map((exp) => {
          const isSelected = exp.id === activeExpId;
          const isDone = completedExps[exp.id];

          return (
            <button
              key={exp.id}
              type="button"
              onClick={() => handleSelectExp(exp.id)}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.01]'
                  : isDone
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{exp.operatorIcon}</span>
                <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-900'
                }`}>
                  {exp.operatorSymbol}
                </span>
              </div>
              <h4 className={`text-xs font-black truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {exp.name[language]}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Interactive Testing Box */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-indigo-200 shadow-sm p-4 sm:p-6 space-y-4">
        {/* Rule Explanation */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex items-start gap-3">
          <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 block">
              {language === 'pt' ? 'Como funciona este superpoder:' : 'How this superpower works:'}
            </span>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {curExp.ruleExplanation[language]}
            </p>
          </div>
          <AudioSpeakButton
            id={`operator-rule-${curExp.id}`}
            text={`${curExp.name[language]}. ${curExp.ruleExplanation[language]}`}
            language={language}
            variant="icon"
            size="xs"
          />
        </div>

        {/* Live Search Console Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span>{language === 'pt' ? 'Barra de Pesquisa do Motor de Busca:' : 'Search Engine Input Bar:'}</span>
            <span className="text-indigo-600 font-mono text-[11px]">
              {isOperatorActive ? `~${curExp.goodResultsCount.toLocaleString('pt-PT')} resultados úteis` : `~${curExp.badResultsCount.toLocaleString('pt-PT')} resultados misturados`}
            </span>
          </div>

          <div className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 shadow-inner transition-all ${
            isOperatorActive
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              : 'bg-slate-900 border-slate-700 text-white'
          }`}>
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <Search className={`w-4 h-4 shrink-0 ${isOperatorActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="font-mono text-xs sm:text-sm font-bold truncate">
                {isOperatorActive ? curExp.operatorAppliedQuery : curExp.initialQuery}
              </span>
            </div>

            {/* Toggle Button */}
            <button
              type="button"
              onClick={handleToggleOperator}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5 ${
                isOperatorActive
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-300'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-102'
              }`}
            >
              <span>{isOperatorActive ? '✓ Filtro Ativo!' : `Ativar ${curExp.operatorSymbol}`}</span>
            </button>
          </div>
        </div>

        {/* Live Results Stream */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-700">
            <span>
              {isOperatorActive
                ? language === 'pt' ? 'Resultados Filtrados com Sucesso (100% Úteis):' : 'Clean Filtered Results:'
                : language === 'pt' ? 'Resultados sem Filtro (Cheios de Lixo e Confusão):' : 'Unfiltered Results (Full of noise):'}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              isOperatorActive ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
            }`}>
              {isOperatorActive ? '🎯 Focado no Tema' : '⚠️ Misturado'}
            </span>
          </div>

          <div className="space-y-2">
            {(isOperatorActive ? curExp.goodResultsPreview : curExp.badResultsPreview).map((res, rIdx) => (
              <div
                key={rIdx}
                className={`p-3 rounded-2xl border transition-all animate-in fade-in flex items-start gap-2.5 ${
                  res.type === 'good'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950 opacity-80'
                }`}
              >
                <span className="text-base shrink-0 mt-0.5">
                  {res.type === 'good' ? '✅' : '❌'}
                </span>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {res.title}
                  </h5>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                    {res.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Lesson Hint */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium flex items-center justify-between gap-2">
            <span>
              💡 {isOperatorActive
                ? language === 'pt' ? 'Repara como o operador eliminou as páginas erradas e poupou imenso tempo!' : 'Notice how the operator stripped out irrelevant noise!'
                : language === 'pt' ? 'Clica no botão azul acima para ativar o superpoder e ver a diferença!' : 'Click the button above to turn on this superpower and see the difference!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
