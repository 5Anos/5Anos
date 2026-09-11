import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, RotateCcw, Lightbulb, Compass, Award } from 'lucide-react';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';

interface TicWhatIsTechGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface ItemCheck {
  id: string;
  name: { pt: string; en: string };
  icon: string;
  isTic: boolean;
  why: { pt: string; en: string };
  category: { pt: string; en: string };
}

interface ProblemSolution {
  id: string;
  problem: { pt: string; en: string };
  icon: string;
  options: {
    id: string;
    text: { pt: string; en: string };
    why: { pt: string; en: string };
    isBest: boolean;
  }[];
}

const ITEMS_DATA: ItemCheck[] = [
  {
    id: 'phone',
    name: { pt: 'Smartphone / Telemóvel', en: 'Smartphone / Mobile Phone' },
    icon: '📱',
    isTic: true,
    why: {
      pt: 'É uma TIC porque permite processar dados, aceder à Internet e comunicar com outras pessoas através de chamadas, mensagens e vídeo.',
      en: 'It is ICT because it processes data, accesses the Internet, and communicates via calls, messages, and video.',
    },
    category: { pt: 'Equipamento e Comunicação', en: 'Hardware and Communication' },
  },
  {
    id: 'book',
    name: { pt: 'Livro impresso em papel', en: 'Printed Paper Book' },
    icon: '📖',
    isTic: false,
    why: {
      pt: 'Contém informação valiosa, mas é um suporte físico tradicional não eletrónico, sem redes ou processamento digital.',
      en: 'It contains valuable information, but is a traditional non-electronic physical medium without networks or digital processing.',
    },
    category: { pt: 'Suporte Tradicional', en: 'Traditional Medium' },
  },
  {
    id: 'gps',
    name: { pt: 'Sistema de Navegação GPS', en: 'GPS Navigation System' },
    icon: '🛰️',
    isTic: true,
    why: {
      pt: 'É uma TIC porque recebe sinais de satélites no espaço, calcula a nossa posição e comunica o melhor caminho no mapa.',
      en: 'It is ICT because it receives satellite signals, calculates position, and communicates optimal routes.',
    },
    category: { pt: 'Localização e Redes', en: 'Location and Networks' },
  },
  {
    id: 'pencil',
    name: { pt: 'Lápis de grafite e borracha', en: 'Graphite Pencil and Eraser' },
    icon: '✏️',
    isTic: false,
    why: {
      pt: 'São ferramentas analógicas de escrita manual úteis, mas não utilizam circuitos, eletricidade, programas ou redes.',
      en: 'They are useful manual writing tools, but do not use circuits, software, or digital networks.',
    },
    category: { pt: 'Material Escolar Tradicional', en: 'Traditional School Stationery' },
  },
  {
    id: 'school_platform',
    name: { pt: 'Plataforma Escolar Online', en: 'Online School Portal' },
    icon: '🏫',
    isTic: true,
    why: {
      pt: 'É uma TIC porque é um serviço digital em rede que permite aos professores e alunos partilhar trabalhos, notas e mensagens.',
      en: 'It is ICT because it is a networked digital platform enabling teachers and students to share tasks, grades, and messages.',
    },
    category: { pt: 'Plataforma Digital', en: 'Digital Platform' },
  },
  {
    id: 'videocall',
    name: { pt: 'Videochamada pela Internet', en: 'Internet Video Call' },
    icon: '💻',
    isTic: true,
    why: {
      pt: 'É uma TIC porque transmite som, imagem e dados em tempo real entre dois pontos distantes através de redes informáticas.',
      en: 'It is ICT because it transmits real-time audio, video, and data across computer networks.',
    },
    category: { pt: 'Comunicação Digital', en: 'Digital Communication' },
  },
  {
    id: 'blackboard',
    name: { pt: 'Quadro tradicional de ardósia com giz', en: 'Chalkboard with Chalk' },
    icon: '⬛',
    isTic: false,
    why: {
      pt: 'É um recurso visual importante na sala de aula, mas não processa dados nem está ligado a redes digitais.',
      en: 'It is an important visual teaching tool, but does not process data or connect to digital networks.',
    },
    category: { pt: 'Recurso Tradicional', en: 'Traditional Resource' },
  },
  {
    id: 'maps_app',
    name: { pt: 'Aplicação de Trânsito e Mapas', en: 'Traffic & Maps App' },
    icon: '🗺️',
    isTic: true,
    why: {
      pt: 'É uma TIC porque recolhe dados de trânsito em tempo real, atualiza o mapa e ajuda os condutores a poupar tempo.',
      en: 'It is ICT because it gathers live traffic data, updates maps, and helps drivers navigate safely.',
    },
    category: { pt: 'Aplicação e Dados', en: 'App and Live Data' },
  },
];

const PROBLEMS_DATA: ProblemSolution[] = [
  {
    id: 'prob1',
    icon: '👵',
    problem: {
      pt: 'Quero falar com um familiar que vive noutro país e ver o seu rosto em direto.',
      en: 'I want to talk to a relative living abroad and see their face in real-time.',
    },
    options: [
      {
        id: 'opt1_a',
        text: { pt: 'Enviar uma carta pelos correios', en: 'Send a physical letter by post' },
        why: {
          pt: 'Uma carta é bonita, mas demora dias ou semanas a chegar e não permite ver o rosto nem conversar em direto.',
          en: 'A letter is nice, but takes weeks and does not allow seeing faces or live interaction.',
        },
        isBest: false,
      },
      {
        id: 'opt1_b',
        text: { pt: 'Videochamada através da Internet', en: 'Internet Video Call' },
        why: {
          pt: 'A videochamada combina imagem e voz instantânea através da rede, aproximando pessoas mesmo a milhares de quilómetros.',
          en: 'Excellent! Video calls combine real-time voice and video over the network, connecting people thousands of miles apart.',
        },
        isBest: true,
      },
      {
        id: 'opt1_c',
        text: { pt: 'Usar uma folha de cálculo', en: 'Use a spreadsheet program' },
        why: {
          pt: 'Uma folha de cálculo serve para fazer contas e tabelas, não para conversar por vídeo.',
          en: 'Spreadsheets are for calculation and tables, not live video communication.',
        },
        isBest: false,
      },
    ],
  },
  {
    id: 'prob2',
    icon: '📍',
    problem: {
      pt: 'Estás numa cidade que não conheces e precisas de saber o caminho para o museu.',
      en: 'You are in an unfamiliar city and need directions to the local museum.',
    },
    options: [
      {
        id: 'opt2_a',
        text: { pt: 'Sensor de humidade do solo', en: 'Soil moisture sensor' },
        why: {
          pt: 'Um sensor de humidade mede a água na terra das plantas, não serve para navegação de trânsito.',
          en: 'Soil sensors measure moisture in agriculture, not street navigation.',
        },
        isBest: false,
      },
      {
        id: 'opt2_b',
        text: { pt: 'Caminhar à toa até encontrar o museu', en: 'Walk randomly until finding it' },
        why: {
          pt: 'Podes perder-te ou demorar muito tempo. A tecnologia de mapas com GPS resolve este problema com rapidez e segurança.',
          en: 'You might get lost. GPS maps solve this safely and efficiently.',
        },
        isBest: false,
      },
      {
        id: 'opt2_c',
        text: { pt: 'Aplicação de mapas com GPS no telemóvel', en: 'Maps app with GPS on smartphone' },
        why: {
          pt: 'O GPS recebe sinais de satélites e calcula a rota exata passo a passo com indicação do tempo de chegada.',
          en: 'Perfect! GPS receives satellite signals and calculates turn-by-turn directions with estimated arrival times.',
        },
        isBest: true,
      },
    ],
  },
  {
    id: 'prob3',
    icon: '📚',
    problem: {
      pt: 'Precisas de encontrar informação fiável sobre os oceanos para um trabalho de Ciências Naturais.',
      en: 'You need reliable information on oceans for a school Science assignment.',
    },
    options: [
      {
        id: 'opt3_a',
        text: { pt: 'Pesquisa num motor de busca em fontes e enciclopédias educativas seguras', en: 'Search engine on reliable educational encyclopedias' },
        why: {
          pt: 'Um motor de pesquisa permite aceder a bibliotecas e artigos científicos educativos de forma organizada.',
          en: 'Well done! A search engine accesses educational libraries and articles systematically.',
        },
        isBest: true,
      },
      {
        id: 'opt3_b',
        text: { pt: 'Copiar o primeiro comentário de uma rede social', en: 'Copy the first social media comment' },
        why: {
          pt: 'As redes sociais contêm opiniões e por vezes informações falsas. É essencial usar fontes educativas fiáveis.',
          en: 'Social media comments may have misinformation. Educational sources are needed.',
        },
        isBest: false,
      },
      {
        id: 'opt3_c',
        text: { pt: 'Desligar o computador e inventar factos ao calhas', en: 'Turn off the computer and guess facts randomly' },
        why: {
          pt: 'Trabalhos escolares exigem dados científicos comprovados e rigorosos, não adivinhação.',
          en: 'School projects require validated, factual sources rather than guesswork.',
        },
        isBest: false,
      },
    ],
  },
  {
    id: 'prob4',
    icon: '🌾',
    problem: {
      pt: 'Um agricultor quer poupar água e saber exatamente que zonas do campo precisam de rega.',
      en: 'A farmer wants to save water and identify which field zones need irrigation.',
    },
    options: [
      {
        id: 'opt4_a',
        text: { pt: 'Regar o campo inteiro dia e noite sem parar', en: 'Water the entire field constantly day and night' },
        why: {
          pt: 'Isso desperdiça muita água e pode afogar as plantas. A tecnologia ajuda a tomar decisões sustentáveis.',
          en: 'This wastes water and harms crops. ICT enables sustainable precision farming.',
        },
        isBest: false,
      },
      {
        id: 'opt4_b',
        text: { pt: 'Sensores de humidade no solo ligados em rede (IoT / Internet das Coisas)', en: 'Connected soil moisture sensors (IoT)' },
        why: {
          pt: 'Exatamente! Os sensores medem a água no solo e enviam alertas para o agricultor regar apenas onde é necessário, poupando água.',
          en: 'Exactly! Soil sensors report moisture levels to irrigate only when necessary, conserving water.',
        },
        isBest: true,
      },
      {
        id: 'opt4_c',
        text: { pt: 'Pintar a relva com tinta verde', en: 'Paint the grass with green paint' },
        why: {
          pt: 'Pintar plantas não resolve a necessidade biológica de água nem traz sustentabilidade.',
          en: 'Painting does not solve irrigation needs or sustainability.',
        },
        isBest: false,
      },
    ],
  },
  {
    id: 'prob5',
    icon: '👥',
    problem: {
      pt: 'Precisas de fazer um trabalho de grupo com três colegas ao mesmo tempo, mas cada um está em sua casa.',
      en: 'You need to work on a group project with three classmates simultaneously from your homes.',
    },
    options: [
      {
        id: 'opt5_a',
        text: { pt: 'Esperar pela próxima aula e tentar fazer tudo em 5 minutos', en: 'Wait for next class and rush in 5 minutes' },
        why: {
          pt: 'Fazer tudo à pressa resulta num trabalho incompleto e com fraca qualidade.',
          en: 'Rushing in the last minutes leads to poor, incomplete school work.',
        },
        isBest: false,
      },
      {
        id: 'opt5_b',
        text: { pt: 'Enviar mensagens em papel com pombos-correio', en: 'Send paper notes with carrier pigeons' },
        why: {
          pt: 'Método histórico lento que não permite edição conjunta e rápida de documentos.',
          en: 'Ancient method that does not enable real-time joint document editing.',
        },
        isBest: false,
      },
      {
        id: 'opt5_c',
        text: { pt: 'Documento colaborativo na nuvem (Cloud) com edição em tempo real', en: 'Collaborative cloud document with real-time editing' },
        why: {
          pt: 'As ferramentas na nuvem permitem que vários alunos escrevam e revejam o mesmo documento ao mesmo tempo.',
          en: 'Perfect! Cloud tools allow multiple students to write and review the same project simultaneously.',
        },
        isBest: true,
      },
    ],
  },
  {
    id: 'prob6',
    icon: '📊',
    problem: {
      pt: 'A professora pediu para apresentares um resumo com fotografias, esquemas e texto perante toda a turma.',
      en: 'The teacher asked you to present a summary with images, diagrams, and text to the class.',
    },
    options: [
      {
        id: 'opt6_a',
        text: { pt: 'Programa de apresentação digital de diapositivos (slides)', en: 'Digital slide presentation software' },
        why: {
          pt: 'Fantástico! Os programas de apresentação combinam imagens, texto e animações de forma clara e profissional num projetor.',
          en: 'Fantastic! Presentation software combines graphics, text, and visuals clearly on a projector.',
        },
        isBest: true,
      },
      {
        id: 'opt6_b',
        text: { pt: 'Calculadora de bolso simples', en: 'Basic pocket calculator' },
        why: {
          pt: 'A calculadora só faz operações matemáticas básicas, não exibe apresentações multimédia.',
          en: 'Calculators only compute math equations, they do not show multimedia slides.',
        },
        isBest: false,
      },
      {
        id: 'opt6_c',
        text: { pt: 'Leitor ótico de códigos de barras', en: 'Barcode scanner' },
        why: {
          pt: 'O leitor ótico serve para identificar produtos em lojas, não para apresentar trabalhos escolares.',
          en: 'Barcode scanners identify store products, not school presentations.',
        },
        isBest: false,
      },
    ],
  },
];

export const TicWhatIsTechGame: React.FC<TicWhatIsTechGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [activePhase, setActivePhase] = useState<'phase1' | 'phase2' | 'finished'>('phase1');

  // Phase 1 State (Is it ICT?)
  const [phase1Answers, setPhase1Answers] = useState<Record<string, boolean>>({});
  const [phase1Checked, setPhase1Checked] = useState(false);

  // Phase 2 State (Which Tech Helps?)
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [problemAnswers, setProblemAnswers] = useState<Record<string, string>>({});
  const [showProbFeedback, setShowProbFeedback] = useState(false);

  // Phase 1 Handlers
  const handleToggleItem = (itemId: string, userSaidTic: boolean) => {
    if (phase1Checked) return;
    setPhase1Answers((prev) => ({ ...prev, [itemId]: userSaidTic }));
  };

  const handleCheckPhase1 = () => {
    setPhase1Checked(true);
  };

  const handleAdvanceToPhase2 = () => {
    setActivePhase('phase2');
  };

  // Phase 2 Handlers
  const currentProblem = PROBLEMS_DATA[currentProblemIdx];

  const handleSelectProblemOption = (optId: string) => {
    if (showProbFeedback) return;
    setSelectedOptId(optId);
    setShowProbFeedback(true);
    setProblemAnswers((prev) => ({ ...prev, [currentProblem.id]: optId }));
  };

  const handleNextProblem = () => {
    setShowProbFeedback(false);
    setSelectedOptId(null);
    if (currentProblemIdx + 1 < PROBLEMS_DATA.length) {
      setCurrentProblemIdx((prev) => prev + 1);
    } else {
      // Calculate Total Score
      let score1 = 0;
      ITEMS_DATA.forEach((item) => {
        if (phase1Answers[item.id] === item.isTic) score1 += 1;
      });

      let score2 = 0;
      PROBLEMS_DATA.forEach((prob) => {
        const selectedId = problemAnswers[prob.id];
        const opt = prob.options.find((o) => o.id === selectedId);
        if (opt?.isBest) score2 += 1;
      });

      const totalCorrect = score1 + score2;
      const maxPossible = ITEMS_DATA.length + PROBLEMS_DATA.length;
      const finalPercentage = Math.round((totalCorrect / maxPossible) * 100);

      setActivePhase('finished');
      onFinish(finalPercentage, 100, finalPercentage);
    }
  };

  const handleRestart = () => {
    setPhase1Answers({});
    setPhase1Checked(false);
    setCurrentProblemIdx(0);
    setSelectedOptId(null);
    setProblemAnswers({});
    setShowProbFeedback(false);
    setActivePhase('phase1');
  };

  const phase1AllAnswered = Object.keys(phase1Answers).length === ITEMS_DATA.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'pt' ? 'Voltar aos Desafios' : 'Back to Challenges'}</span>
      </button>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'pt' ? 'Desafio Interativo • Tema 2' : 'Interactive Challenge • Topic 2'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">
            💡 {language === 'pt' ? 'É uma TIC? & Que Tecnologia Ajuda?' : 'Is it ICT? & Which Tech Helps?'}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 max-w-2xl font-medium">
            {language === 'pt'
              ? 'Descobre a função das tecnologias, compreende por que razão são TIC e descobre como a tecnologia ajuda a resolver problemas do dia a dia!'
              : 'Discover what makes a tool ICT and understand how technology solves real everyday problems!'}
          </p>
        </div>
        <AudioSpeakButton
          id="whatistech-header"
          text={`${language === 'pt' ? 'É uma TIC e Que Tecnologia Ajuda?' : 'Is it ICT and Which Tech Helps?'}. ${
            language === 'pt'
              ? 'Descobre a função das tecnologias, compreende por que razão são TIC e descobre como a tecnologia ajuda a resolver problemas do dia a dia!'
              : 'Discover what makes a tool ICT and understand how technology solves real everyday problems!'
          }`}
          language={language}
          label={language === 'pt' ? 'Ouvir Introdução' : 'Listen Intro'}
          variant="pill"
          size="sm"
        />
      </div>

      {/* PHASE 1: É uma TIC? Porquê? */}
      {activePhase === 'phase1' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-black text-indigo-950">
                  {language === 'pt' ? 'Parte 1: É uma TIC? Sim ou Não?' : 'Part 1: Is it ICT? Yes or No?'}
                </h2>
                <p className="text-xs sm:text-sm text-indigo-900 font-medium leading-relaxed">
                  {language === 'pt'
                    ? 'As TIC são tecnologias que nos ajudam a trabalhar com informação e a comunicar. Classifica cada um dos 8 itens abaixo e descobre o porquê de cada resposta!'
                    : 'ICT are tools that help us process information and communicate. Classify each item below and discover the reason!'}
                </p>
              </div>
            </div>
            <AudioSpeakButton
              id="whatistech-p1-instructions"
              text={`${language === 'pt' ? 'Parte 1: É uma TIC? Sim ou Não?' : 'Part 1: Is it ICT? Yes or No?'}. ${
                language === 'pt'
                  ? 'As TIC são tecnologias que nos ajudam a trabalhar com informação e a comunicar. Classifica cada um dos 8 itens abaixo!'
                  : 'ICT are tools that help us process information and communicate. Classify each item below!'
              }`}
              language={language}
              variant="icon"
              size="sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ITEMS_DATA.map((item) => {
              const userAnswer = phase1Answers[item.id];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = phase1Checked && userAnswer === item.isTic;

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all bg-white flex flex-col justify-between ${
                    phase1Checked
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/40'
                        : 'border-rose-400 bg-rose-50/40'
                      : isAnswered
                      ? 'border-indigo-500 bg-indigo-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                            {item.category[language]}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                            {item.name[language]}
                          </h3>
                        </div>
                      </div>
                      <AudioSpeakButton
                        id={`tech-item-${item.id}`}
                        text={`${item.name[language]}. ${phase1Checked ? item.why[language] : ''}`}
                        language={language}
                        variant="icon"
                        size="xs"
                      />
                    </div>

                    {/* Educational feedback if checked */}
                    {phase1Checked && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              {language === 'pt' ? 'Correto!' : 'Correct!'}
                            </span>
                          ) : (
                            <span className="text-rose-700 flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                              {language === 'pt' ? 'Atenção:' : 'Notice:'}
                            </span>
                          )}
                          <span className="text-slate-600 font-semibold">
                            {item.isTic
                              ? language === 'pt' ? 'É uma TIC' : 'Is ICT'
                              : language === 'pt' ? 'Não é uma TIC' : 'Not ICT'}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {item.why[language]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Yes / No buttons */}
                  {!phase1Checked && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleItem(item.id, true)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          userAnswer === true
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        ✅ {language === 'pt' ? 'É TIC' : 'Is ICT'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleItem(item.id, false)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          userAnswer === false
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        ❌ {language === 'pt' ? 'Não é TIC' : 'Not ICT'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="pt-4 flex justify-end">
            {!phase1Checked ? (
              <button
                type="button"
                disabled={!phase1AllAnswered}
                onClick={handleCheckPhase1}
                className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md transition-all ${
                  phase1AllAnswered
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:scale-102 active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{language === 'pt' ? 'Verificar Respostas e Ver Explicações' : 'Check Answers & View Explanations'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAdvanceToPhase2}
                className="px-6 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>{language === 'pt' ? 'Avançar para a Parte 2: Que Tecnologia Poderia Ajudar?' : 'Advance to Part 2: Which Tech Helps?'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* PHASE 2: Que tecnologia poderia ajudar? */}
      {activePhase === 'phase2' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Compass className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-800 uppercase tracking-wider bg-amber-200/80 px-2 py-0.5 rounded-full">
                    {language === 'pt'
                      ? `Situação ${currentProblemIdx + 1} de ${PROBLEMS_DATA.length}`
                      : `Scenario ${currentProblemIdx + 1} of ${PROBLEMS_DATA.length}`}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-amber-950">
                  {language === 'pt' ? 'Parte 2: Que tecnologia poderia ajudar a resolver o problema?' : 'Part 2: Which technology could help solve this problem?'}
                </h2>
              </div>
            </div>
            <AudioSpeakButton
              id={`tech-p2-card-${currentProblem.id}`}
              text={`${language === 'pt' ? 'Problema:' : 'Problem:'} ${currentProblem.problem[language]}. ${language === 'pt' ? 'Qual é a melhor solução tecnológica?' : 'Which is the best tech solution?'}`}
              language={language}
              variant="pill"
              size="sm"
            />
          </div>

          {/* Current Problem Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                  {currentProblem.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {language === 'pt' ? 'Situação / Problema:' : 'Situation / Problem:'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    "{currentProblem.problem[language]}"
                  </h3>
                </div>
              </div>
              <AudioSpeakButton
                id={`tech-prob-${currentProblem.id}`}
                text={currentProblem.problem[language]}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {language === 'pt' ? 'Qual é a melhor solução tecnológica?' : 'Which is the best tech solution?'}
                </p>
                <AudioSpeakButton
                  id={`tech-prob-opts-${currentProblem.id}`}
                  text={currentProblem.options.map((o, idx) => `Opção ${idx + 1}: ${o.text[language]}`).join('. ')}
                  language={language}
                  variant="icon"
                  size="xs"
                />
              </div>

              <div className="space-y-2.5">
                {currentProblem.options.map((opt) => {
                  const isSelected = selectedOptId === opt.id;
                  let optStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 bg-white text-slate-800';

                  if (showProbFeedback) {
                    if (opt.isBest) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                    } else if (isSelected && !opt.isBest) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400/30';
                    } else {
                      optStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-600/30';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={showProbFeedback}
                      onClick={() => handleSelectProblemOption(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 ${optStyle} ${
                        showProbFeedback ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm sm:text-base font-extrabold">
                          {opt.text[language]}
                        </span>
                        {showProbFeedback && opt.isBest && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {showProbFeedback && isSelected && !opt.isBest && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </div>

                      {showProbFeedback && (isSelected || opt.isBest) && (
                        <div className="pt-2 border-t border-black/10 text-xs sm:text-sm font-medium leading-relaxed">
                          <span className="font-bold">
                            {language === 'pt' ? '💡 Porquê? ' : '💡 Why? '}
                          </span>
                          <span>{opt.why[language]}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advance Problem Button */}
            {showProbFeedback && (
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextProblem}
                  className="px-6 py-3 rounded-2xl font-black text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                >
                  <span>
                    {currentProblemIdx + 1 < PROBLEMS_DATA.length
                      ? language === 'pt' ? 'Próxima Situação' : 'Next Scenario'
                      : language === 'pt' ? 'Concluir Desafio e Ver Resultado' : 'Finish Challenge & View Result'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FINISHED CELEBRATION */}
      {activePhase === 'finished' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-inner border border-emerald-200 animate-bounce">
            🎉
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === 'pt' ? 'Desafio Concluído com Sucesso!' : 'Challenge Completed!'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'pt' ? 'Excelente Trabalho de Investigação TIC!' : 'Outstanding ICT Investigation Work!'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Agora já sabes reconhecer que as TIC vão muito além de computadores e telemóveis: são tecnologias fundamentais para resolver problemas e comunicar!'
                : 'Now you understand that ICT goes far beyond mere devices: it empowers us to solve problems and communicate effectively!'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Repetir Desafio' : 'Play Again'}</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{language === 'pt' ? 'Voltar aos Temas (+100 XP)' : 'Back to Topics (+100 XP)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
