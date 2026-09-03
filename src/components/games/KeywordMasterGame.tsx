import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, Key, Search, Sparkles, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface KeywordMasterGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface Mission {
  id: number;
  topic: { pt: string; en: string };
  badQuery: { pt: string; en: string };
  options: {
    text: string;
    isBest: boolean;
    explanation: { pt: string; en: string };
    simulatedSnippet: {
      title: string;
      url: string;
      desc: string;
    };
  }[];
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    topic: {
      pt: 'Trabalho de Ciências: Descobrir a alimentação e peso médio do lince-ibérico',
      en: 'Science Project: Discover the diet and average weight of the Iberian lynx',
    },
    badQuery: {
      pt: 'olá senhor motor de busca podes dizer-me tudo sobre o que come o animal selvagem lince ibérico e quanto pesa ele obrigado',
      en: 'hello mr search engine can you tell me all about what the wild animal iberian lynx eats and how much it weighs thanks',
    },
    options: [
      {
        text: 'lince iberico peso alimentacao',
        isBest: true,
        explanation: {
          pt: '🎯 Perfeito! Palavras-chave exatas, sem artigos nem saudações desnecessárias. Vai direto à biologia da espécie.',
          en: '🎯 Perfect! Exact keywords without filler words or greetings. Goes straight to the species biology.',
        },
        simulatedSnippet: {
          title: 'Lince-ibérico (Lynx pardinus) — ICNF Portugal',
          url: 'https://icnf.pt/biodiversidade/lince-iberico',
          desc: 'O lince-ibérico adulto pesa entre 9 e 13 kg. A sua dieta é composta em cerca de 80% a 90% por coelho-bravo...',
        },
      },
      {
        text: 'animais comem muito',
        isBest: false,
        explanation: {
          pt: '⚠️ Demasiado vago! Vais receber páginas aleatórias sobre cães, ursos e dietas de animais domésticos.',
          en: '⚠️ Too vague! You will get random pages about dogs, bears, and pet food diets.',
        },
        simulatedSnippet: {
          title: 'Curiosidades: Os animais mais comilões do mundo',
          url: 'https://blog-animais-divertidos.exemplo.com',
          desc: 'Descobre quanto come uma baleia-azul por dia e como os ursos se preparam para o inverno...',
        },
      },
      {
        text: 'lince',
        isBest: false,
        explanation: {
          pt: '⚠️ Demasiado amplo! Existem 4 espécies de lince no mundo (canadiano, euroasiático, pardo e ibérico) e não inclui a alimentação.',
          en: '⚠️ Too broad! There are 4 lynx species in the world and it does not specify weight or diet.',
        },
        simulatedSnippet: {
          title: 'Lince — Género de mamíferos carnívoros',
          url: 'https://pt.wikipedia.org/wiki/Lince',
          desc: 'Lince é um género de felídeos que habitam as florestas boreais da América do Norte, Europa e Ásia...',
        },
      },
    ],
  },
  {
    id: 2,
    topic: {
      pt: 'Trabalho de História: Saber o ano da Batalha de Aljubarrota e quem foi a Padeira',
      en: 'History Project: Find the year of the Battle of Aljubarrota and the Baker of Aljubarrota',
    },
    badQuery: {
      pt: 'queria saber por favor em que ano foi a batalha famosa de portugal onde esteve a padeira com a pá obrigado',
      en: 'i wanted to know please what year was the famous battle of portugal where the baker woman fought with a shovel thanks',
    },
    options: [
      {
        text: 'portugal batalhas',
        isBest: false,
        explanation: {
          pt: '⚠️ Muito genérico! Portugal travou dezenas de batalhas ao longo de 900 anos de história.',
          en: '⚠️ Very generic! Portugal fought dozens of battles over 900 years of history.',
        },
        simulatedSnippet: {
          title: 'Lista de batalhas de Portugal ao longo dos séculos',
          url: 'https://historiadeportugal.exemplo.pt',
          desc: 'Cronologia militar portuguesa desde a fundação da nacionalidade em 1143 até ao século XX...',
        },
      },
      {
        text: 'batalha aljubarrota 1385 padeira brites almeida',
        isBest: true,
        explanation: {
          pt: '🎯 Excelente! Inclui o nome do acontecimento histórico e as personagens centrais de forma precisa.',
          en: '🎯 Excellent! Includes the historical event name and central figures with high precision.',
        },
        simulatedSnippet: {
          title: 'A Batalha de Aljubarrota (14 de agosto de 1385) — Fundação Aljubarrota',
          url: 'https://fundacao-aljubarrota.pt/historia',
          desc: 'A Batalha de Aljubarrota decorreu a 14 de agosto de 1385. Destacou-se a lenda heroica de Brites de Almeida...',
        },
      },
      {
        text: 'padeira de pa',
        isBest: false,
        explanation: {
          pt: '⚠️ Termos pouco científicos! Pode mostrar receitas de pão e utensílios de padaria.',
          en: '⚠️ Non-academic keywords! Might return baking recipes and bakery kitchenware.',
        },
        simulatedSnippet: {
          title: 'Pá de forno para padeiro profissional',
          url: 'https://loja-equipamentos-padaria.com',
          desc: 'Compre pás de madeira para forno tradicional de pão com cabo de 1,5 metros ao melhor preço...',
        },
      },
    ],
  },
  {
    id: 3,
    topic: {
      pt: 'Trabalho de Ciências Naturais: Descobrir como as plantas transformam a luz em alimento',
      en: 'Science Project: Discover how plants transform sunlight into food',
    },
    badQuery: {
      pt: 'como é que as plantas conseguem fazer comidinha com a luz do sol na terra das florestas',
      en: 'how do plants manage to make food with sunlight in the soil of the forests',
    },
    options: [
      {
        text: 'fotossintese plantas luz solar clorofila',
        isBest: true,
        explanation: {
          pt: '🎯 Brilhante! Usa o termo científico exato ("fotossíntese") e os conceitos essenciais ("clorofila", "luz solar").',
          en: '🎯 Brilliant! Uses the exact scientific concept ("photosynthesis") and essential terms ("chlorophyll", "sunlight").',
        },
        simulatedSnippet: {
          title: 'O que é a Fotossíntese? — Ciência Viva nas Escolas',
          url: 'https://cienciaviva.pt/recursos/fotossintese',
          desc: 'A fotossíntese é o processo biológico pelo qual as plantas usam a luz solar, água e dióxido de carbono...',
        },
      },
      {
        text: 'plantas verdes bonitas',
        isBest: false,
        explanation: {
          pt: '⚠️ Palavras decorativas que não explicam o fenómeno científico.',
          en: '⚠️ Decorative words that do not explain the scientific biological process.',
        },
        simulatedSnippet: {
          title: '10 plantas bonitas para decorar a sua sala de estar',
          url: 'https://decoracao-jardins.exemplo.pt',
          desc: 'Veja as plantas de interior mais resistentes e que precisam de pouca rega...',
        },
      },
      {
        text: 'comida',
        isBest: false,
        explanation: {
          pt: '⚠️ Uma única palavra vaga trará restaurantes e receitas de culinária humana!',
          en: '⚠️ A single vague word will return restaurants and human cooking recipes!',
        },
        simulatedSnippet: {
          title: 'Receitas rápidas de almoço para toda a família',
          url: 'https://culinaria-facil.exemplo.pt',
          desc: 'Pratos saborosos prontos em menos de 20 minutos com ingredientes simples...',
        },
      },
    ],
  },
  {
    id: 4,
    topic: {
      pt: 'Trabalho de Geografia: Qual é o rio que nasce na serra da Estrela e desagua no Atlântico perto da Figueira da Foz?',
      en: 'Geography Project: Which river originates in Serra da Estrela and reaches the Atlantic near Figueira da Foz?',
    },
    badQuery: {
      pt: 'qual é o nome daquele rio muito giro que começa na serra mais alta de portugal e vai para o mar na figueira',
      en: 'what is the name of that very nice river that starts in the highest mountain of portugal and goes to the sea in figueira',
    },
    options: [
      {
        text: 'rios de agua',
        isBest: false,
        explanation: {
          pt: '⚠️ "De água" é redundante (todos os rios têm água) e não indica a localização geográfica.',
          en: '⚠️ Redundant words (all rivers carry water) and does not specify geography.',
        },
        simulatedSnippet: {
          title: 'A importância da água no planeta Terra',
          url: 'https://planeta-azul.exemplo.org',
          desc: 'Ciclo hidrológico e conservação dos recursos hídricos globais...',
        },
      },
      {
        text: 'rio nascente serra da estrela figueira da foz foz',
        isBest: true,
        explanation: {
          pt: '🎯 Excelente! Aponta a nascente (Serra da Estrela) e a foz (Figueira da Foz) para identificar de imediato o Rio Mondego.',
          en: '🎯 Excellent! Identifies the source (Serra da Estrela) and the river mouth (Figueira da Foz) to pinpoint Rio Mondego.',
        },
        simulatedSnippet: {
          title: 'Rio Mondego: O maior rio inteiramente português',
          url: 'https://geografia-portugal.edu.pt/mondego',
          desc: 'O Mondego nasce a 1425 m na Serra da Estrela (Mondeguinho) e desagua na Figueira da Foz após 258 km...',
        },
      },
      {
        text: 'passeios figueira da foz praia',
        isBest: false,
        explanation: {
          pt: '⚠️ Foco no turismo de praia em vez da bacia hidrográfica.',
          en: '⚠️ Beach tourism focus rather than the hydrographic river basin.',
        },
        simulatedSnippet: {
          title: 'Hotéis e praias na Figueira da Foz para férias',
          url: 'https://turismo-centro.exemplo.pt',
          desc: 'Praia da Claridade, casino e restaurantes de marisco à beira-mar...',
        },
      },
    ],
  },
  {
    id: 5,
    topic: {
      pt: 'Trabalho de TIC: Descobrir o primeiro satélite português lançado para o espaço',
      en: 'ICT Project: Discover the first Portuguese satellite launched into space',
    },
    badQuery: {
      pt: 'será que portugal alguma vez mandou uma coisa para o espaço com foguetão se sim quando foi isso e qual o nome',
      en: 'did portugal ever send something to outer space with a rocket if so when was that and what name',
    },
    options: [
      {
        text: 'coisas no espaco',
        isBest: false,
        explanation: {
          pt: '⚠️ Demasiado vago e sem relação direta com Portugal.',
          en: '⚠️ Far too vague and without connection to Portugal.',
        },
        simulatedSnippet: {
          title: 'Astronomia para curiosos: O que flutua no cosmos?',
          url: 'https://espaco-curioso.exemplo.org',
          desc: 'Asteroides, cometas, poeira cósmica e telescópios em órbita...',
        },
      },
      {
        text: 'primeiro satelite portugues lancamento ano posat',
        isBest: true,
        explanation: {
          pt: '🎯 Extraordinário! Vai direto ao PoSAT-1 lançado em 1993 com precisão de investigador.',
          en: '🎯 Outstanding! Directly targets PoSAT-1 launched in 1993 with research precision.',
        },
        simulatedSnippet: {
          title: 'PoSAT-1: A História do Primeiro Satélite Português (1993)',
          url: 'https://portugalspace.pt/historia/posat-1',
          desc: 'Lançado a 26 de setembro de 1993 na base de Kourou, o PoSAT-1 marcou a entrada de Portugal na era espacial...',
        },
      },
      {
        text: 'portugal astronautas voar',
        isBest: false,
        explanation: {
          pt: '⚠️ Confunde astronautas humanos com satélites em órbita.',
          en: '⚠️ Confuses human astronauts with satellites in orbit.',
        },
        simulatedSnippet: {
          title: 'Como ser astronauta na Agência Espacial Europeia',
          url: 'https://carreiras-espaciais.exemplo.eu',
          desc: 'Requisitos físicos e académicos para participar no concurso de seleção da ESA...',
        },
      },
    ],
  },
];

export const KeywordMasterGame: React.FC<KeywordMasterGameProps> = ({ language, onBack, onFinish }) => {
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const t = translations[language];
  const mission = MISSIONS[currentMissionIdx];

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelectedOptionIdx(idx);
  };

  const handleConfirm = () => {
    if (selectedOptionIdx === null) return;
    setConfirmed(true);
    const isCorrect = mission.options[selectedOptionIdx].isBest;
    if (isCorrect) {
      setScore((prev) => prev + 20);
    }
  };

  const handleNext = () => {
    if (currentMissionIdx < MISSIONS.length - 1) {
      setCurrentMissionIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setConfirmed(false);
    } else {
      setGameOver(true);
      const totalScore = score;
      const maxScore = MISSIONS.length * 20;
      const pct = Math.round((totalScore / maxScore) * 100);
      onFinish(totalScore, maxScore, pct);
    }
  };

  const handleRestart = () => {
    setCurrentMissionIdx(0);
    setSelectedOptionIdx(null);
    setConfirmed(false);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar ao Tema' : 'Back to Theme'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {language === 'pt' ? 'Missão' : 'Mission'} {currentMissionIdx + 1} / {MISSIONS.length}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{score} pts</span>
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Mission Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200/60">
              <Key className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Desafio 1: O Mestre das Palavras-Chave' : 'Challenge 1: The Keyword Master'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {mission.topic[language]}
            </h2>
          </div>

          {/* Student's bad query illustration */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <span>🤦‍♂️</span>
              <span>{language === 'pt' ? 'O que um aluno inexperiente escreveu na caixa de pesquisa:' : 'What an inexperienced student typed:'}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs sm:text-sm text-slate-700 break-words flex items-center gap-2 shadow-2xs">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="italic line-through decoration-rose-500 decoration-2">"{mission.badQuery[language]}"</span>
            </div>
            <p className="text-xs text-amber-900 font-medium">
              {language === 'pt'
                ? 'Qual das seguintes opções transforma esta pesquisa numa fórmula cirúrgica e perfeita?'
                : 'Which of the following options transforms this into a surgical, high-precision search?'}
            </p>
          </div>

          {/* Keyword Options */}
          <div className="space-y-3">
            {mission.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              let btnClass = 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800';

              if (confirmed) {
                if (opt.isBest) {
                  btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && !opt.isBest) {
                  btnClass = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnClass = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-200';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shadow-2xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-mono text-sm sm:text-base font-semibold">
                      {opt.text}
                    </span>
                  </div>

                  {confirmed && opt.isBest && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'pt' ? 'Melhor Escolha' : 'Best Choice'}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation & Simulated Search Engine Preview when confirmed */}
          {confirmed && selectedOptionIdx !== null && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  mission.options[selectedOptionIdx].isBest
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50/80 border-rose-300 text-rose-900'
                }`}
              >
                <p className="font-bold mb-1">
                  {mission.options[selectedOptionIdx].isBest
                    ? (language === 'pt' ? '🎉 Parabéns! Acertaste em cheio!' : '🎉 Great job! Spot on!')
                    : (language === 'pt' ? '⚠️ Quase! Analisa a diferença:' : '⚠️ Almost! Look at the difference:')}
                </p>
                <p>{mission.options[selectedOptionIdx].explanation[language]}</p>
              </div>

              {/* Simulated Search Result Preview */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Search className="w-3 h-3 text-indigo-400" />
                  <span>{language === 'pt' ? 'Resultado gerado pelo motor de busca:' : 'Search engine result snippet:'}</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-mono truncate">
                  {mission.options[selectedOptionIdx].simulatedSnippet.url}
                </p>
                <h4 className="text-sm font-bold text-blue-300 hover:underline cursor-pointer">
                  {mission.options[selectedOptionIdx].simulatedSnippet.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {mission.options[selectedOptionIdx].simulatedSnippet.desc}
                </p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!confirmed ? (
              <button
                disabled={selectedOptionIdx === null}
                onClick={handleConfirm}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors ml-auto ${
                  selectedOptionIdx !== null
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {language === 'pt' ? 'Testar Palavras-Chave' : 'Test Keywords'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs transition-colors ml-auto"
              >
                <span>
                  {currentMissionIdx < MISSIONS.length - 1
                    ? (language === 'pt' ? 'Próxima Missão' : 'Next Mission')
                    : (language === 'pt' ? 'Ver Resultados' : 'View Results')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Game Over Screen */
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 text-center space-y-6 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-4xl shadow-xs">
            <Trophy className="w-10 h-10 text-amber-500" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {language === 'pt' ? 'Missões de Palavras-Chave Concluídas!' : 'Keyword Missions Completed!'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {language === 'pt'
                ? 'Aprendeste a transformar pesquisas longas em termos cirúrgicos e eficazes.'
                : 'You mastered converting lengthy queries into surgical, effective search terms.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>{score} de 100 pontos possíveis</span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Repetir Desafio' : 'Play Again'}</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              {language === 'pt' ? 'Concluir e Voltar ao Tema' : 'Finish & Back to Theme'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
