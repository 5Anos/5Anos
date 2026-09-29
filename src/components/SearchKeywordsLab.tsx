import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Lightbulb, Compass, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { AudioSpeakButton } from './AudioSpeakButton';

interface SearchKeywordsLabProps {
  language?: Language;
}

interface ResearchMission {
  id: number;
  badge: { pt: string; en: string };
  title: { pt: string; en: string };
  scenario: { pt: string; en: string };
  options: {
    query: string;
    type: 'best' | 'too_long' | 'too_vague';
    label: { pt: string; en: string };
    feedback: { pt: string; en: string };
    simulatedResult: {
      siteName: string;
      url: string;
      title: string;
      snippet: string;
      isVerified: boolean;
    };
  }[];
}

const MISSIONS: ResearchMission[] = [
  {
    id: 1,
    badge: { pt: '🌿 Ciências da Natureza', en: '🌿 Natural Sciences' },
    title: {
      pt: 'Alimentação e peso do Lince-Ibérico',
      en: 'Diet and weight of the Iberian Lynx',
    },
    scenario: {
      pt: 'Precisas de descobrir para o teu trabalho de Ciências qual é o peso médio e o prato favorito do lince-ibérico em Portugal.',
      en: 'For your Science project, find the average weight and main prey of the Iberian lynx in Portugal.',
    },
    options: [
      {
        query: 'olá senhor google podes dizer-me por favor o que come o animal selvagem lince e quanto pesa ele obrigado',
        type: 'too_long',
        label: { pt: 'Conversa comprida (Erro Comum)', en: 'Chatty sentence (Common mistake)' },
        feedback: {
          pt: '⚠️ Os motores de busca não são pessoas! Palavras como "olá", "senhor", "por favor", "obrigado" só baralham o computador.',
          en: '⚠️ Search engines are algorithms, not people! Filler words like "hello", "please", "thanks" confuse the search index.',
        },
        simulatedResult: {
          siteName: 'Fórum Curiosidades',
          url: 'https://forum-geral.exemplo.com/duvidas',
          title: 'Como falar educadamente com assistentes virtuais',
          snippet: 'Muitos utilizadores usam saudações como olá e obrigado ao pesquisar na Internet...',
          isVerified: false,
        },
      },
      {
        query: 'lince',
        type: 'too_vague',
        label: { pt: 'Uma só palavra (Demasiado vago)', en: 'Single word (Too vague)' },
        feedback: {
          pt: '⚠️ Muito vago! Vais receber milhões de páginas sobre marcas de carros, desenhos animados e linces do Canadá.',
          en: '⚠️ Too broad! You will get millions of pages about cars, cartoons, and Canadian lynxes.',
        },
        simulatedResult: {
          siteName: 'Dicionário Online',
          url: 'https://dicionario.exemplo.pt/lince',
          title: 'Significado de lince — Dicionário da Língua',
          snippet: 'Substantivo masculino: mamífero carnívoro felídeo de orelhas pontiagudas...',
          isVerified: false,
        },
      },
      {
        query: 'lince iberico alimentacao peso portugal',
        type: 'best',
        label: { pt: '🎯 Palavras-chave Ninja (A Escolha Certa!)', en: '🎯 Ninja Keywords (The Right Pick!)' },
        feedback: {
          pt: '⭐ Excelente! Usaste as 4 palavras-chave essenciais sem desperdício. O motor de busca leva-te direto ao ICNF e a enciclopédias oficiais!',
          en: '⭐ Perfect! You used the essential keywords directly. The engine targets official biological institutes!',
        },
        simulatedResult: {
          siteName: 'ICNF — Instituto da Conservação da Natureza',
          url: 'https://icnf.pt/biodiversidade/lince-iberico',
          title: 'Lince-ibérico (Lynx pardinus) — Biologia e Conservação',
          snippet: 'O lince-ibérico adulto pesa entre 9 e 13 kg. A sua dieta é composta em cerca de 80% a 90% por coelho-bravo selvagem no território português...',
          isVerified: true,
        },
      },
    ],
  },
  {
    id: 2,
    badge: { pt: '🏰 História de Portugal', en: '🏰 History of Portugal' },
    title: {
      pt: 'D. Afonso Henriques e a Fundação de Portugal',
      en: 'D. Afonso Henriques and Portugal’s Birth',
    },
    scenario: {
      pt: 'O professor de História pediu o ano da Batalha de São Mamede e a cidade onde nasceu o primeiro Rei de Portugal.',
      en: 'Your History teacher asked for the Battle of São Mamede year and the birth city of Portugal’s first King.',
    },
    options: [
      {
        query: 'Afonso Henriques Batalha Sao Mamede ano nascimento Guimaraes',
        type: 'best',
        label: { pt: '🎯 Palavras-chave Ninja (A Escolha Certa!)', en: '🎯 Ninja Keywords (The Right Pick!)' },
        feedback: {
          pt: '⭐ Perfeito! Juntaste o nome histórico e os factos principais. Encontras logo a resposta: 1128 em Guimarães!',
          en: '⭐ Perfect! Targeted the historical name and key events. Found right away: 1128 in Guimarães!',
        },
        simulatedResult: {
          siteName: 'Ensina RTP — História',
          url: 'https://ensina.rtp.pt/artigo/d-afonso-henriques-e-sao-mamede',
          title: 'D. Afonso Henriques: Da Batalha de 1128 à Fundação',
          snippet: 'A 24 de junho de 1128 ocorreu a histórica Batalha de São Mamede, perto do Castelo de Guimarães, marco fundador da independência de Portugal...',
          isVerified: true,
        },
      },
      {
        query: 'rei',
        type: 'too_vague',
        label: { pt: 'Uma só palavra (Demasiado vago)', en: 'Single word (Too vague)' },
        feedback: {
          pt: '⚠️ Existem centenas de reis em todo o mundo e na ficção! Vais receber páginas sobre o Rei Leão e reis de Inglaterra.',
          en: '⚠️ Thousands of kings in history and fiction! You will get Lion King and British monarchs.',
        },
        simulatedResult: {
          siteName: 'Cinema & Filmes',
          url: 'https://cinema.exemplo.com/o-rei-leao',
          title: 'O Rei Leão — Sinopse e Horários de Cinema',
          snippet: 'O pequeno leão Simba prepara-se para suceder ao seu pai no reino dos animais...',
          isVerified: false,
        },
      },
      {
        query: 'como e que foi a historia toda do nosso primeiro rei de portugal que bateu na mae',
        type: 'too_long',
        label: { pt: 'Frase longa e informal (Erro Comum)', en: 'Long informal sentence (Common mistake)' },
        feedback: {
          pt: '⚠️ Evita linguagem informal e perguntas compridas. Usa nomes próprios e termos históricos exatos.',
          en: '⚠️ Avoid long informal slang. Use exact historical names and key terms.',
        },
        simulatedResult: {
          siteName: 'Blog de Opinião',
          url: 'https://blog-curiosidades.exemplo.com/lendas',
          title: 'Mitos e lendas populares sobre reis de antigamente',
          snippet: 'Diz a lenda popular que Afonso Henriques terá zangado com a mãe Teresa...',
          isVerified: false,
        },
      },
    ],
  },
  {
    id: 3,
    badge: { pt: '🪐 Estudo do Espaço', en: '🪐 Space Exploration' },
    title: {
      pt: 'Saturno e os seus Anéis de Gelo',
      en: 'Saturn and its Ice Rings',
    },
    scenario: {
      pt: 'Queres saber de que são feitos os anéis de Saturno e quantas luas principais o planeta possui.',
      en: 'Find out what Saturn’s rings are made of and how many major moons it has.',
    },
    options: [
      {
        query: 'aneis',
        type: 'too_vague',
        label: { pt: 'Uma só palavra (Demasiado vago)', en: 'Single word (Too vague)' },
        feedback: {
          pt: '⚠️ Vais encontrar joalharias a vender anéis de ouro e casamento!',
          en: '⚠️ You will get jewelry shops selling gold and wedding rings!',
        },
        simulatedResult: {
          siteName: 'Joalharia do Ouro',
          url: 'https://joias.exemplo.pt/aneis-prata',
          title: 'Catálogo de Anéis de Prata e Ouro — Promoções',
          snippet: 'Compre os melhores anéis para ofertas especiais com desconto de 20%...',
          isVerified: false,
        },
      },
      {
        query: 'Saturno aneis composicao gelo luas',
        type: 'best',
        label: { pt: '🎯 Palavras-chave Ninja (A Escolha Certa!)', en: '🎯 Ninja Keywords (The Right Pick!)' },
        feedback: {
          pt: '⭐ Brilhante! Palavras científicas e diretas. Mostra artigos da Agência Espacial sobre partículas de gelo e rocha!',
          en: '⭐ Brilliant! Scientific, direct keywords. Retrieves Space Agency articles about ice and rock particles!',
        },
        simulatedResult: {
          siteName: 'Ciência Viva / Observatório Astronómico',
          url: 'https://cienciaviva.pt/espaco/saturno-aneis',
          title: 'Saturno: O Gigante Gasoso e os Seus Anéis de Gelo',
          snippet: 'Os anéis de Saturno são formados por milhares de milhões de pedaços de gelo de água e poeira rochosa, variando entre pequenos grãos e blocos do tamanho de montanhas...',
          isVerified: true,
        },
      },
      {
        query: 'qual e o planeta mais bonito com aneis no ceu a noite',
        type: 'too_long',
        label: { pt: 'Pergunta de opinião longa (Erro Comum)', en: 'Opinion question (Common mistake)' },
        feedback: {
          pt: '⚠️ Motores de busca não sabem qual é o planeta "mais bonito", porque isso é uma opinião pessoal!',
          en: '⚠️ Search engines cannot evaluate "most beautiful" because beauty is an opinion!',
        },
        simulatedResult: {
          siteName: 'Poesia & Estrelas',
          url: 'https://astrologia-signos.exemplo.com',
          title: 'Os signos e os planetas mais bonitos do céu',
          snippet: 'Vénus e Júpiter brilham intensamente no céu noturno para os amantes...',
          isVerified: false,
        },
      },
    ],
  },
];

export const SearchKeywordsLab: React.FC<SearchKeywordsLabProps> = ({ language = 'pt' }) => {
  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const curMission = MISSIONS[activeMissionIdx];
  const curSelectionIdx = selectedOptions[curMission.id];
  const activeOption = curSelectionIdx !== undefined ? curMission.options[curSelectionIdx] : null;

  const totalBest = Object.entries(selectedOptions).filter(([mId, optIdx]) => {
    const m = MISSIONS.find((item) => item.id === Number(mId));
    return m && m.options[optIdx]?.type === 'best';
  }).length;

  const handleSelectOption = (idx: number) => {
    const updated = { ...selectedOptions, [curMission.id]: idx };
    setSelectedOptions(updated);

    const isBest = curMission.options[idx].type === 'best';
    if (isBest) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#10b981', '#f59e0b'],
        });
      } catch {
        // safe fallback
      }
    }

    const correctCount = Object.entries(updated).filter(([mId, oIdx]) => {
      const m = MISSIONS.find((item) => item.id === Number(mId));
      return m && m.options[oIdx]?.type === 'best';
    }).length;

    if (correctCount === MISSIONS.length && !hasCelebrated) {
      setHasCelebrated(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // safe fallback
      }
    }
  };

  const resetAll = () => {
    setSelectedOptions({});
    setActiveMissionIdx(0);
    setHasCelebrated(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/80 rounded-3xl border-2 border-sky-200/90 p-4 sm:p-6 shadow-sm space-y-5 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            🔍
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {language === 'pt' ? 'Laboratório do Detetive: Palavras-Chave Ninja' : 'Keyword Detective Lab'}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                {language === 'pt' ? 'Simulador de Pesquisa' : 'Search Simulator'}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Aprende a transformar dúvidas escolares em pesquisas exatas e a descartar termos inúteis!'
                : 'Turn school homework questions into exact keywords and skip filler words!'}
            </p>
          </div>
        </div>

        {/* Live Score Pill */}
        <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-2xl text-xs shadow-xs">
          <span className="text-sky-300 font-bold">
            {language === 'pt' ? 'Missões Concluídas:' : 'Missions Solved:'}
          </span>
          <span className="font-black px-2 py-0.5 rounded-xl bg-sky-500 text-white">
            {totalBest} / {MISSIONS.length}
          </span>
        </div>
      </div>

      {/* Mission Selector Tabs */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-bold">
          <span>{language === 'pt' ? 'Escolhe uma missão de trabalho escolar:' : 'Choose a school research mission:'}</span>
          <button
            type="button"
            onClick={resetAll}
            className="text-[11px] text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'pt' ? 'Recomeçar' : 'Reset'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {MISSIONS.map((m, idx) => {
            const isCurrent = idx === activeMissionIdx;
            const selIdx = selectedOptions[m.id];
            const isDone = selIdx !== undefined && m.options[selIdx]?.type === 'best';

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMissionIdx(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isCurrent
                    ? 'bg-sky-600 text-white border-sky-700 shadow-md scale-[1.01]'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {m.badge[language]}
                  </span>
                  {isDone && <span className="text-xs font-black text-emerald-600">✓ Concluído</span>}
                </div>
                <h4 className={`text-xs font-black truncate mt-1 ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                  {idx + 1}. {m.title[language]}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Mission Workspace */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-sky-200 shadow-sm p-4 sm:p-6 space-y-4">
        {/* Mission Briefing Box */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center text-lg shrink-0 mt-0.5">
            📋
          </div>
          <div className="flex-1 space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 block">
              {language === 'pt' ? 'O teu objetivo de pesquisa:' : 'Your research objective:'}
            </span>
            <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed">
              {curMission.scenario[language]}
            </p>
          </div>
          <AudioSpeakButton
            id={`keywords-mission-${curMission.id}`}
            text={`${curMission.title[language]}. ${curMission.scenario[language]}`}
            language={language}
            variant="icon"
            size="xs"
          />
        </div>

        {/* 3 Query Options to Click */}
        <div className="space-y-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 block flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{language === 'pt' ? 'Qual destas pesquisas deves escrever no motor de busca?' : 'Which query should you type?'}</span>
          </span>

          <div className="space-y-2">
            {curMission.options.map((opt, optIdx) => {
              const isSelected = curSelectionIdx === optIdx;
              const isBest = opt.type === 'best';

              let cardStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-300';
              if (isSelected) {
                if (isBest) {
                  cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-400/40 shadow-sm';
                } else {
                  cardStyle = 'bg-amber-50 border-amber-300 text-amber-950 ring-2 ring-amber-300/40';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${cardStyle}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {opt.label[language]}
                    </span>
                    {isSelected && (
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        isBest ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {isBest ? '✓ Excelente' : '⚠️ Analisa'}
                      </span>
                    )}
                  </div>

                  {/* Simulated Search Bar Preview inside button */}
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
                    <Search className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {opt.query}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulated Search Engine Results Page (SERP) Preview */}
        {activeOption && (
          <div className="space-y-3 pt-2 animate-in fade-in">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>{language === 'pt' ? 'O que o Motor de Busca Encontrou:' : 'What the Search Engine Found:'}</span>
              </span>
              <AudioSpeakButton
                id={`keywords-result-${curMission.id}-${curSelectionIdx}`}
                text={`${activeOption.feedback[language]}. Resultado: ${activeOption.simulatedResult.title}. ${activeOption.simulatedResult.snippet}`}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            {/* Explanation Callout */}
            <div className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium border leading-relaxed ${
              activeOption.type === 'best'
                ? 'bg-emerald-50/90 text-emerald-950 border-emerald-300'
                : 'bg-amber-50/90 text-amber-950 border-amber-300'
            }`}>
              {activeOption.feedback[language]}
            </div>

            {/* Simulated Google SERP Snippet Box */}
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs">🌐</span>
                <span className="font-bold text-slate-700 truncate">{activeOption.simulatedResult.siteName}</span>
                <span className="text-slate-400 text-[11px] truncate">{activeOption.simulatedResult.url}</span>
                {activeOption.simulatedResult.isVerified && (
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                    Fonte Fiável
                  </span>
                )}
              </div>
              <h5 className="text-sm sm:text-base font-extrabold text-blue-700 hover:underline cursor-pointer">
                {activeOption.simulatedResult.title}
              </h5>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {activeOption.simulatedResult.snippet}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
