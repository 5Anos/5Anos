import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, Search, Trophy, Sparkles, RefreshCw, ArrowRight, Filter, HelpCircle } from 'lucide-react';
import { Language } from '../../types';

interface SearchOperatorsGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface OperatorRiddle {
  id: number;
  missionTitle: { pt: string; en: string };
  problemDescription: { pt: string; en: string };
  choices: {
    query: string;
    operatorUsed: string;
    isCorrect: boolean;
    explanation: { pt: string; en: string };
    searchResultPreview: string;
  }[];
}

const RIDDLES: OperatorRiddle[] = [
  {
    id: 1,
    missionTitle: {
      pt: 'Enigma 1: Encontrar o poema exato de Fernando Pessoa',
      en: 'Riddle 1: Find the exact poem by Fernando Pessoa',
    },
    problemDescription: {
      pt: 'Precisas de encontrar o poema que tem exatamente as palavras contínuas "O poeta é um fingidor". Se pesquisares sem aspas, aparecem páginas soltas sobre poetas e peças de teatro de fingir.',
      en: 'You need to find the poem that contains the exact sequence "O poeta é um fingidor". Searching without quotes returns scattered pages about poets and acting.',
    },
    choices: [
      {
        query: '"O poeta é um fingidor"',
        operatorUsed: 'Aspas "" (Termo exato)',
        isCorrect: true,
        explanation: {
          pt: '🎯 Excelente! As aspas (" ") forçam o motor de busca a encontrar exatamente a frase completa na mesma ordem, levando diretamente à Autopsicografia de Fernando Pessoa.',
          en: '🎯 Excellent! Quotes (" ") force the search engine to match the full phrase in exact order, targeting Fernando Pessoa’s Autopsicografia.',
        },
        searchResultPreview: 'Fernando Pessoa — Autopsicografia ("O poeta é um fingidor. Finge tão completamente...")',
      },
      {
        query: 'o poeta e fingidor finge muito',
        operatorUsed: 'Sem aspas',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Sem aspas, o motor procura as palavras espalhadas pela página em sítios diferentes.',
          en: '⚠️ Without quotes, the engine searches for words scattered across unrelated parts of pages.',
        },
        searchResultPreview: 'Teatro moderno: Como atores aprendem a fingir emoções...',
      },
      {
        query: '-poeta fingidor',
        operatorUsed: 'Menos incorreto',
        isCorrect: false,
        explanation: {
          pt: '⚠️ O sinal de menos (-) vai apagar a palavra "poeta" da pesquisa, que é exatamente o que procuravas!',
          en: '⚠️ The minus sign (-) excludes the word "poeta", which is what you needed!',
        },
        searchResultPreview: 'Fingidores famosos na história medieval...',
      },
    ],
  },
  {
    id: 2,
    missionTitle: {
      pt: 'Enigma 2: Pesquisar o animal "Jaguar" sem ver anúncios de carros',
      en: 'Riddle 2: Research the wild feline "Jaguar" without car ads',
    },
    problemDescription: {
      pt: 'Queres descobrir os hábitos do felino carnívoro jaguar na floresta, mas a página de pesquisa só mostra concessionários e fotografias do carro de luxo britânico Jaguar.',
      en: 'You want to study the feline carnivore jaguar in the rainforest, but search results keep showing dealerships and photos of the luxury British car brand Jaguar.',
    },
    choices: [
      {
        query: 'jaguar +carro +preco',
        operatorUsed: 'Sinal de mais',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Isto vai fazer com que apareçam AINDA MAIS carros e stands de venda!',
          en: '⚠️ This will show EVEN MORE car listings and auto showrooms!',
        },
        searchResultPreview: 'Compre Jaguar F-Pace novo ou usado em Lisboa com garantia...',
      },
      {
        query: 'jaguar -carro -automovel -veiculo',
        operatorUsed: 'Sinal de menos (-) para exclusão',
        isCorrect: true,
        explanation: {
          pt: '🎯 Perfeito! O sinal de menos (-) colado às palavras indesejadas elimina tudo o que seja veículos, deixando apenas o animal selvagem!',
          en: '🎯 Perfect! The minus sign (-) attached to unwanted terms eliminates vehicle sites, isolating the wild animal!',
        },
        searchResultPreview: 'Panthera onca: O jaguar e a sua distribuição nas florestas tropicais — Biologia',
      },
      {
        query: 'jaguar / animal / floresta',
        operatorUsed: 'Barras',
        isCorrect: false,
        explanation: {
          pt: '⚠️ As barras não são um operador de exclusão nos motores de busca.',
          en: '⚠️ Slashes are not an exclusion operator in modern search engines.',
        },
        searchResultPreview: 'História do símbolo do felino na marca automóvel Jaguar...',
      },
    ],
  },
  {
    id: 3,
    missionTitle: {
      pt: 'Enigma 3: Pesquisar apenas em domínios de topo de Portugal (.pt)',
      en: 'Riddle 3: Search within Portuguese top-level domains (.pt)',
    },
    problemDescription: {
      pt: 'O teu professor pediu para pesquisares os parques naturais protegidos em Portugal, filtrando a pesquisa para mostrar apenas páginas terminadas no domínio .pt.',
      en: 'Your teacher asked you to research protected nature parks in Portugal, filtering results to show only pages with the .pt top-level domain.',
    },
    choices: [
      {
        query: 'parques naturais portugal site:.pt',
        operatorUsed: 'Operador site:.pt',
        isCorrect: true,
        explanation: {
          pt: '🎯 Truque de mestre! O operador "site:.pt" restringe a pesquisa a endereços que utilizam o domínio .pt. Lembra-te: .pt identifica o domínio geográfico de Portugal, mas não garante por si só que a informação seja verdadeira — avalia sempre o autor, a data e a instituição!',
          en: '🎯 Master trick! The "site:.pt" operator restricts search results to addresses using the .pt domain. Remember: .pt identifies Portugal’s geographic top-level domain, but does not guarantee on its own that the content is accurate — always check the author, date, and institution!',
        },
        searchResultPreview: 'Rede Nacional de Áreas Protegidas — ICNF (icnf.gov.pt)',
      },
      {
        query: 'portugal verde parque em todo o lado',
        operatorUsed: 'Texto livre',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Pesquisa vaga que trará blogs de viagens do mundo inteiro.',
          en: '⚠️ Vague query returning travel blogs from around the globe.',
        },
        searchResultPreview: 'Férias de campismo na Europa e América do Sul...',
      },
      {
        query: '"parques" -portugal',
        operatorUsed: 'Menos em Portugal',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Ao colocares -portugal, estás a proibir o motor de mostrar resultados sobre o nosso país!',
          en: '⚠️ By typing -portugal, you forbid the engine from showing results about our country!',
        },
        searchResultPreview: 'National Parks in California and Yellowstone (USA)...',
      },
    ],
  },
  {
    id: 4,
    missionTitle: {
      pt: 'Enigma 4: Procurar uma canção tradicional com título exato',
      en: 'Riddle 4: Search for a traditional folk song with exact title',
    },
    problemDescription: {
      pt: 'Na aula de Educação Musical, precisas de encontrar a pauta da cantiga tradicional "Laurindinha, vem à janela". Se escreveres sem aspas, aparecem janelas de alumínio e pessoas chamadas Laura.',
      en: 'In Music class, you need the sheet music for the traditional song "Laurindinha, vem à janela". Without quotes, you get aluminum windows and people named Laura.',
    },
    choices: [
      {
        query: 'laurindinha janelas comprar vidro',
        operatorUsed: 'Texto confuso',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Vai parar a lojas de vidros e caixilharias de janelas!',
          en: '⚠️ You will end up on window glass and hardware store websites!',
        },
        searchResultPreview: 'Janelas em PVC e alumínio com corte térmico...',
      },
      {
        query: '"Laurindinha vem à janela" pauta tradicional',
        operatorUsed: 'Aspas "" + termo pauta',
        isCorrect: true,
        explanation: {
          pt: '🎯 Brilhante! As aspas prendem a frase da cantiga e a palavra "pauta" traz o documento musical pretendido.',
          en: '🎯 Brilliant! The quotes bind the folk lyrics and the word "pauta" delivers the musical notation needed.',
        },
        searchResultPreview: 'Cancioneiro Popular Português: "Laurindinha, vem à janela" (Partitura e Letra)',
      },
      {
        query: 'musica',
        operatorUsed: 'Uma palavra',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Demasiado genérico: aparecem plataformas de streaming e concertos pop.',
          en: '⚠️ Too generic: brings up streaming platforms and pop concerts.',
        },
        searchResultPreview: 'Top 50 músicas mais ouvidas esta semana no Spotify...',
      },
    ],
  },
  {
    id: 5,
    missionTitle: {
      pt: 'Enigma 5: Descobrir o Tratado de Tordesilhas sem artigos de futebol',
      en: 'Riddle 5: Discover the Treaty of Tordesilhas without soccer news',
    },
    problemDescription: {
      pt: 'Estás a pesquisar o histórico tratado de 1494 entre Portugal e Espanha sobre a divisão do mundo, mas um clube de futebol da cidade espanhola de Tordesillas está a encher os resultados de notícias desportivas.',
      en: 'You are researching the 1494 treaty between Portugal and Spain dividing the new world, but a soccer team from Tordesillas is cluttering results with match scores.',
    },
    choices: [
      {
        query: '"Tratado de Tordesilhas" 1494 -futebol -jogo',
        operatorUsed: 'Aspas + Exclusão (-)',
        isCorrect: true,
        explanation: {
          pt: '🎯 Perfeição absoluta! Combinaste as aspas (" ") para a expressão exata histórica com a exclusão (-) do futebol.',
          en: '🎯 Absolute perfection! You combined quotes (" ") for the historical treaty and minus (-) to discard soccer news.',
        },
        searchResultPreview: 'O Tratado de Tordesilhas (1494): A partilha do Novo Mundo — Arquivo Nacional da Torre do Tombo',
      },
      {
        query: 'tordesilhas golos bola',
        operatorUsed: 'Futebol',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Isto foca a pesquisa no futebol e esquece os Descobrimentos e a História!',
          en: '⚠️ This focuses on sports matches and forgets the historical Portuguese discoveries!',
        },
        searchResultPreview: 'Campeonato Regional: Atlético Tordesillas empata no último minuto...',
      },
      {
        query: 'tratados',
        operatorUsed: 'Muito amplo',
        isCorrect: false,
        explanation: {
          pt: '⚠️ Devolve centenas de acordos internacionais da União Europeia e da ONU.',
          en: '⚠️ Returns hundreds of modern European Union and UN treaties.',
        },
        searchResultPreview: 'Tratado de Lisboa de 2007 da União Europeia...',
      },
    ],
  },
];

export const SearchOperatorsGame: React.FC<SearchOperatorsGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const riddle = RIDDLES[currentIdx];

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelectedIdx(idx);
  };

  const handleConfirm = () => {
    if (selectedIdx === null) return;
    setConfirmed(true);
    if (riddle.choices[selectedIdx].isCorrect) {
      setScore((prev) => prev + 20);
    }
  };

  const handleNext = () => {
    if (currentIdx < RIDDLES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedIdx(null);
      setConfirmed(false);
    } else {
      setGameOver(true);
      const totalScore = score;
      const maxScore = RIDDLES.length * 20; // 100 pts
      const pct = Math.round((totalScore / maxScore) * 100);
      onFinish(totalScore, maxScore, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setConfirmed(false);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
      {/* Navigation Top */}
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
            {language === 'pt' ? 'Enigma' : 'Riddle'} {currentIdx + 1} / {RIDDLES.length}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{score} pts</span>
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200/60">
              <Filter className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Desafio 3: O Mistério das Aspas e Operadores' : 'Challenge 3: Quotes & Operators Mystery'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {riddle.missionTitle[language]}
            </h2>
          </div>

          {/* Mission Problem */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
              <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{language === 'pt' ? 'O Enigma a resolver:' : 'The Riddle to solve:'}</span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
              {riddle.problemDescription[language]}
            </p>
          </div>

          {/* Operator Choices */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {language === 'pt' ? 'Qual a fórmula de pesquisa com operadores que resolve o problema?' : 'Which operator-powered search formula solves this?'}
            </p>

            {riddle.choices.map((choice, idx) => {
              const isSelected = selectedIdx === idx;
              let cardClass = 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800';

              if (confirmed) {
                if (choice.isCorrect) {
                  cardClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && !choice.isCorrect) {
                  cardClass = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  cardClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                cardClass = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-200';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cardClass}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shadow-2xs">
                        {idx + 1}
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-indigo-900 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                        {choice.query}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium pl-8 block">
                      Técnica: {choice.operatorUsed}
                    </span>
                  </div>

                  {confirmed && choice.isCorrect && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'pt' ? 'Fórmula Perfeita' : 'Perfect Formula'}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback & Preview */}
          {confirmed && selectedIdx !== null && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  riddle.choices[selectedIdx].isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <p className="font-bold mb-1">
                  {riddle.choices[selectedIdx].isCorrect
                    ? (language === 'pt' ? '🎉 Resposta Correta!' : '🎉 Correct Answer!')
                    : (language === 'pt' ? '⚠️ Repara no operador:' : '⚠️ Notice the operator:')}
                </p>
                <p>{riddle.choices[selectedIdx].explanation[language]}</p>
              </div>

              {/* Simulated Search Result */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5 border border-slate-800">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Search className="w-3 h-3 text-indigo-400" />
                  <span>{language === 'pt' ? 'Página encontrada com esta fórmula:' : 'Web page retrieved by this formula:'}</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-400 font-medium leading-relaxed">
                  {riddle.choices[selectedIdx].searchResultPreview}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!confirmed ? (
              <button
                disabled={selectedIdx === null}
                onClick={handleConfirm}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors ml-auto ${
                  selectedIdx !== null
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {language === 'pt' ? 'Aplicar Operador' : 'Apply Operator'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs transition-colors ml-auto"
              >
                <span>
                  {currentIdx < RIDDLES.length - 1
                    ? (language === 'pt' ? 'Próximo Enigma' : 'Next Riddle')
                    : (language === 'pt' ? 'Ver Classificação' : 'View Ranking')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Game Over */
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 text-center space-y-6 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center text-4xl shadow-xs">
            <Trophy className="w-10 h-10 text-blue-600" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {language === 'pt' ? 'Mestre dos Operadores de Pesquisa!' : 'Search Operators Master!'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {language === 'pt'
                ? 'Agora dominas as aspas "", o sinal de menos (-) e os operadores de domínio como um verdadeiro perito em TIC!'
                : 'You now command quotation marks "", minus signs (-), and domain filters like a true ICT specialist!'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
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
