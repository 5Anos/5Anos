import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Shield, AlertTriangle, PhoneCall, HeartHandshake, Eye, MessageSquare, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';

interface TicCyberbullyingGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface StepInfo {
  num: number;
  icon: string;
  title: { pt: string; en: string };
  action: { pt: string; en: string };
  why: { pt: string; en: string };
}

const FIVE_STEPS: StepInfo[] = [
  {
    num: 1,
    icon: '🛑',
    title: { pt: '1. PARAR', en: '1. STOP' },
    action: {
      pt: 'Não responder ao agressor nem entrar em discussões que aumentam a violência.',
      en: 'Do not reply to the aggressor or engage in provocative arguments.',
    },
    why: {
      pt: 'Responder com raiva ou insultos apenas dá força ao agressor e piora a situação.',
      en: 'Responding with anger fuels the aggressor and escalates conflict.',
    },
  },
  {
    num: 2,
    icon: '📸',
    title: { pt: '2. GUARDAR PROVAS', en: '2. SAVE EVIDENCE' },
    action: {
      pt: 'Fazer capturas de ecrã (printscreens) e guardar as mensagens, fotografias e datas como prova antes de qualquer outra ação.',
      en: 'Take screenshots and save messages, photos, usernames, and dates as evidence before taking any other action.',
    },
    why: {
      pt: 'Nunca apagues as mensagens nem bloqueies o agressor sem guardar provas primeiro! Se apagares de imediato, perdes as provas necessárias para os adultos e autoridades poderem intervir.',
      en: 'Never delete messages or block the bully without saving evidence first! Deleting immediately destroys evidence needed by parents, teachers, and authorities.',
    },
  },
  {
    num: 3,
    icon: '🚫',
    title: { pt: '3. BLOQUEAR', en: '3. BLOCK' },
    action: {
      pt: 'Depois de guardar as provas, bloquear o contacto nas redes sociais, jogos ou aplicações de mensagens.',
      en: 'After saving evidence, block the sender on social platforms, games, or chat aplicações.',
    },
    why: {
      pt: 'Impede que o agressor continue a enviar novas mensagens ou a contactar-te.',
      en: 'Stops the bully from sending new harassment or contacting you.',
    },
  },
  {
    num: 4,
    icon: '🚩',
    title: { pt: '4. DENUNCIAR', en: '4. REPORT' },
    action: {
      pt: 'Utilizar as ferramentas oficiais de denúncia dentro da plataforma ou jogo.',
      en: 'Use official report buttons built into aplicações and games.',
    },
    why: {
      pt: 'Os moderadores das plataformas podem suspender a conta do agressor e remover os conteúdos ofensivos.',
      en: 'Platform moderators can suspend toxic accounts and remove abusive content.',
    },
  },
  {
    num: 5,
    icon: '🧑‍🏫',
    title: { pt: '5. PEDIR AJUDA', en: '5. SEEK HELP' },
    action: {
      pt: 'Falar imediatamente com pais, professores, psicólogos da escola ou ligar para a Linha Internet Segura (800 21 90 90).',
      en: 'Talk immediately to parents, teachers, school counselors, or call the Safe Internet Helpline (800 21 90 90).',
    },
    why: {
      pt: 'Uma criança nunca tem de resolver uma situação de cyberbullying sozinha! Pedir ajuda é o passo mais corajoso.',
      en: 'A child never has to face cyberbullying alone! Asking for support is the smartest and bravest step.',
    },
  },
];

interface StoryScenario {
  id: string;
  story: { pt: string; en: string };
  question: { pt: string; en: string };
  options: {
    text: { pt: string; en: string };
    isCorrect: boolean;
    feedback: { pt: string; en: string };
  }[];
}

const STORY_SCENARIOS: StoryScenario[] = [
  {
    id: 'ana_story_1',
    story: {
      pt: 'A Ana, aluna do 5.º ano, abriu o grupo de conversação da turma e viu que dois colegas publicaram piadas cruéis e fotos editadas para a ridicularizar.',
      en: 'Ana, a 5th grader, opened her class group chat and saw two classmates posting cruel mockery and edited photos of her.',
    },
    question: {
      pt: 'Qual deve ser a primeira atitude da Ana perante esta provocação?',
      en: 'What should Ana’s first reaction be?',
    },
    options: [
      {
        text: {
          pt: 'Responder com insultos ainda mais graves para se vingar publicamente.',
          en: 'Reply with even worse insults to take revenge publicly.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! Responder com violência verbal alimenta a provocação e agrava o conflito.',
          en: 'Incorrect! Escalating insult fights worsens the situation and creates more toxicity.',
        },
      },
      {
        text: {
          pt: 'Parar (não responder aos insultos) e tirar imediatamente printscreens das mensagens como prova.',
          en: 'Stop (do not reply to insults) and immediately take screenshots as evidence.',
        },
        isCorrect: true,
        feedback: {
          pt: 'Responder no grupo só alimentaria a discussão. Guardar as provas é fundamental para mostrar aos adultos.',
          en: 'Correct! Replying only feeds the trolls. Saving evidence is essential for adults to intervene.',
        },
      },
      {
        text: {
          pt: 'Apagar tudo do telemóvel de imediato, calar-se e fingir que não se importa.',
          en: 'Delete everything immediately, stay silent, and pretend you don’t care.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! Se apagares as mensagens sem tirar printscreens, perdes as provas necessárias para os adultos e autoridades intervir. Nunca apagues as mensagens antes de guardar as provas!',
          en: 'Incorrect! Deleting messages without taking screenshots destroys the evidence needed by adults and authorities. Never delete messages before saving evidence!',
        },
      },
    ],
  },
  {
    id: 'ana_story_2',
    story: {
      pt: 'Depois de guardar as provas, a Ana sente-se com receio e não sabe como contar aos pais.',
      en: 'After saving evidence, Ana feels anxious and is unsure how to tell her parents.',
    },
    question: {
      pt: 'O que pode a Ana fazer para obter apoio gratuito e confidencial em Portugal?',
      en: 'What can Ana do for free, confidential support in Portugal?',
    },
    options: [
      {
        text: {
          pt: 'Publicar a palavra-passe do colega agressor na Internet.',
          en: 'Post the aggressor’s password publicly on social media.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! Isso é ilegal e viola as regras de segurança e privacidade.',
          en: 'Incorrect! Hacking or retaliating is unlawful and unsafe.',
        },
      },
      {
        text: {
          pt: 'Deixar de ir às aulas e fechar-se no quarto sem falar com ninguém.',
          en: 'Skip school and isolate in her bedroom without talking to anyone.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! A escola e a família estão lá para proteger os alunos.',
          en: 'Incorrect! School and family exist to keep students safe.',
        },
      },
      {
        text: {
          pt: 'Ligar para a Linha Internet Segura (800 21 90 90) e conversar com os pais ou o seu professor.',
          en: 'Call the Safe Internet Helpline (800 21 90 90) and speak with parents or teachers.',
        },
        isCorrect: true,
        feedback: {
          pt: 'A Linha Internet Segura (800 21 90 90) é gratuita, confidencial e tem especialistas prontos a ouvir e ajudar!',
          en: 'Well done! The Safe Internet Helpline (800 21 90 90) is free, anonymous, and staffed by caring experts.',
        },
      },
    ],
  },
  {
    id: 'tomas_story_3',
    story: {
      pt: 'O Tomás vê no chat de um jogo online que vários jogadores estão a insultar em coro um colega novo até ele chorar.',
      en: 'Tomás sees players repeatedly insulting a new gamer in chat until he cries.',
    },
    question: {
      pt: 'Como testemunha (espetador), qual é a atitude correta e solidária do Tomás?',
      en: 'As a bystander, what is the empathetic and correct action?',
    },
    options: [
      {
        text: {
          pt: 'Apoiar o colega em privado, não rir nem partilhar os insultos, e denunciar os agressores no jogo.',
          en: 'Support the peer privately, do not laugh or share, and report the bullies in the game.',
        },
        isCorrect: true,
        feedback: {
          pt: 'Os espetadores têm um papel crucial: não incentivar o agressor e apoiar a vítima faz toda a diferença.',
          en: 'Perfect! Bystanders play a huge role: refusing to amplify bullying and reporting makes gaming safe for all.',
        },
      },
      {
        text: {
          pt: 'Juntar-se aos outros e insultar também para ser popular no grupo.',
          en: 'Join the crowd and insult too to look cool.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! Fazer coro com os agressores torna-te cúmplice de cyberbullying.',
          en: 'Incorrect! Joining bullies makes you an active participant in harassment.',
        },
      },
      {
        text: {
          pt: 'Gravar um vídeo e enviar para todos os amigos para se rirem.',
          en: 'Record a video and send to everyone to mock the victim.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! Partilhar conteúdos humilhantes propaga o dano psicológico.',
          en: 'Incorrect! Spreading humiliating content compounds the harm.',
        },
      },
    ],
  },
  {
    id: 'bloquear_story_4',
    story: {
      pt: 'Uma conta anónima continua a enviar mensagens insistentes e desconfortáveis através de uma rede social.',
      en: 'An anonymous account keeps sending uncomfortable messages on social media.',
    },
    question: {
      pt: 'Qual a funcionalidade técnica da aplicação que deves utilizar de imediato?',
      en: 'Which built-in app feature should you use immediately?',
    },
    options: [
      {
        text: {
          pt: 'Enviar a tua morada de casa para tirarem as dúvidas.',
          en: 'Send your home address to clear up doubts.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! Nunca partilhes dados pessoais privados com desconhecidos.',
          en: 'Incorrect! Never share private personal info with strangers.',
        },
      },
      {
        text: {
          pt: 'Primeiro tirar printscreens para Guardar Provas, e depois Bloquear o perfil e Denunciar à moderação da rede social.',
          en: 'First take screenshots to Save Evidence, and then Block the profile and Report to platform moderators.',
        },
        isCorrect: true,
        feedback: {
          pt: 'Guardar provas em primeiro lugar é essencial antes de bloquear ou denunciar, garantindo que as evidências não se perdem.',
          en: 'Excellent! Saving evidence first is essential before blocking or reporting, ensuring evidence is preserved.',
        },
      },
      {
        text: {
          pt: 'Mudar o teu nome para o nome da pessoa anónima.',
          en: 'Change your display name to the anonymous user’s name.',
        },
        isCorrect: false,
        feedback: {
          pt: 'Incorreto! Isso não resolve a segurança da tua conta.',
          en: 'Incorrect! That does not secure your digital space.',
        },
      },
    ],
  },
];

export const TicCyberbullyingGame: React.FC<TicCyberbullyingGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [currentStage, setCurrentStage] = useState<'steps_learning' | 'scenarios' | 'completed'>('steps_learning');
  const [activeStepTab, setActiveStepTab] = useState(1);

  // Scenarios state
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const curScenario = STORY_SCENARIOS[scenarioIdx];

  const handleSelectOption = (idx: number) => {
    if (showFeedback) return;
    setSelectedOptIdx(idx);
    setShowFeedback(true);
    if (curScenario.options[idx].isCorrect) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNextScenario = () => {
    setShowFeedback(false);
    setSelectedOptIdx(null);
    if (scenarioIdx + 1 < STORY_SCENARIOS.length) {
      setScenarioIdx((prev) => prev + 1);
    } else {
      setCurrentStage('completed');
      onFinish(100, 100, 100);
    }
  };

  const handleRestart = () => {
    setCurrentStage('steps_learning');
    setActiveStepTab(1);
    setScenarioIdx(0);
    setSelectedOptIdx(null);
    setShowFeedback(false);
    setCorrectCount(0);
  };

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
      <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-purple-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-rose-300">
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'pt' ? 'Cidadania & Segurança Digital' : 'Digital Citizenship & Safety'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">
            🛡️ {language === 'pt' ? 'Guardião Digital: Cyberbullying & Linha Internet Segura' : 'Digital Guardian: Cyberbullying & Helpline'}
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 max-w-2xl font-medium">
            {language === 'pt'
              ? 'Aprende a Regra dos 5 Passos contra o cyberbullying e descobre como pedir ajuda de forma segura e gratuita na Linha Internet Segura (800 21 90 90).'
              : 'Master the 5-step rule against cyberbullying and learn how to get support via the Safe Internet Helpline (800 21 90 90).'}
          </p>
        </div>
        <AudioSpeakButton
          id="cyberbullying-header"
          text={`${language === 'pt' ? 'Guardião Digital: Cyberbullying e Linha Internet Segura' : 'Digital Guardian: Cyberbullying and Helpline'}. ${
            language === 'pt'
              ? 'Aprende a Regra dos 5 Passos contra o cyberbullying e descobre como pedir ajuda de forma segura e gratuita na Linha Internet Segura, 800 21 90 90.'
              : 'Master the 5-step rule against cyberbullying and learn how to get support via the Safe Internet Helpline, 800 21 90 90.'
          }`}
          language={language}
          label={language === 'pt' ? 'Ouvir Introdução' : 'Listen Intro'}
          variant="pill"
          size="sm"
        />
      </div>

      {/* STAGE 1: OS 5 PASSOS INTERATIVOS */}
      {currentStage === 'steps_learning' && (
        <div className="space-y-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {language === 'pt' ? 'A Regra dos 5 Passos contra o Cyberbullying' : 'The 5-Step Rule Against Cyberbullying'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'pt' ? 'Clica em cada passo para explorar como deves agir:' : 'Click each step to explore how to react:'}
              </p>
            </div>

            {/* Helpline highlight pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-300 px-3.5 py-2 rounded-2xl shadow-2xs">
              <PhoneCall className="w-4 h-4 text-emerald-600 animate-pulse" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-black text-emerald-700 block">
                  {language === 'pt' ? 'Linha Gratuita & Confidencial' : 'Free & Confidential Line'}
                </span>
                <span className="text-xs sm:text-sm font-black text-emerald-950">800 21 90 90</span>
              </div>
            </div>
          </div>

          {/* 5 Steps Interactive Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {FIVE_STEPS.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStepTab(s.num)}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeStepTab === s.num
                    ? 'border-indigo-600 bg-indigo-50 shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-black text-slate-900">{s.title[language]}</span>
              </button>
            ))}
          </div>

          {/* Active Step Detailed Card */}
          {(() => {
            const step = FIVE_STEPS.find((s) => s.num === activeStepTab)!;
            return (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-white border-2 border-indigo-200 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-indigo-100 flex items-center justify-center text-3xl">
                      {step.icon}
                    </span>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                        {language === 'pt' ? `Passo ${step.num}` : `Step ${step.num}`}
                      </span>
                      <h3 className="text-lg font-black text-slate-900">{step.title[language]}</h3>
                    </div>
                  </div>
                  <AudioSpeakButton
                    id={`cyber-step-${step.num}`}
                    text={`${step.title[language]}. ${step.action[language]}. Porquê? ${step.why[language]}`}
                    language={language}
                    variant="icon"
                    size="sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="p-4 rounded-xl bg-white border border-indigo-100 text-xs sm:text-sm text-slate-800 font-bold leading-relaxed shadow-2xs">
                    👉 {step.action[language]}
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-100/60 text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
                    💡 <span className="font-bold">{language === 'pt' ? 'Porquê? ' : 'Why? '}</span>
                    {step.why[language]}
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStage('scenarios')}
              className="px-6 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>{language === 'pt' ? 'Testar os Conhecimentos no Caso Prático da Ana' : 'Test Knowledge with Ana’s Case'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: CENÁRIOS PRÁTICOS (HISTÓRIA DA ANA) */}
      {currentStage === 'scenarios' && (
        <div className="space-y-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in">
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-black text-rose-800 uppercase tracking-wider bg-rose-200/80 px-2.5 py-0.5 rounded-full">
                  {language === 'pt'
                    ? `Situação ${scenarioIdx + 1} de ${STORY_SCENARIOS.length}`
                    : `Scenario ${scenarioIdx + 1} of ${STORY_SCENARIOS.length}`}
                </span>
                <h2 className="text-base sm:text-lg font-black text-rose-950 mt-1">
                  {language === 'pt' ? 'Caso Prático: O Desafio da Ana' : 'Case Study: Ana’s Challenge'}
                </h2>
              </div>
            </div>
            <AudioSpeakButton
              id={`cyber-scenario-head-${curScenario.id}`}
              text={`${language === 'pt' ? 'Caso Prático: O Desafio da Ana' : 'Case Study: Ana’s Challenge'}. ${curScenario.story[language]}. Pergunta: ${curScenario.question[language]}`}
              language={language}
              label={language === 'pt' ? 'Ouvir Caso' : 'Listen Case'}
              variant="pill"
              size="sm"
            />
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed font-medium flex items-start justify-between gap-3">
            <p className="flex-1">"{curScenario.story[language]}"</p>
            <AudioSpeakButton
              id={`cyber-scenario-story-${curScenario.id}`}
              text={curScenario.story[language]}
              language={language}
              variant="icon"
              size="xs"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex-1">
                {curScenario.question[language]}
              </h3>
              <AudioSpeakButton
                id={`cyber-scenario-q-${curScenario.id}`}
                text={`${curScenario.question[language]}. ${curScenario.options.map((opt, i) => `Opção ${i + 1}: ${opt.text[language]}`).join('. ')}`}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            <div className="space-y-2.5">
              {curScenario.options.map((opt, idx) => {
                const isSelected = selectedOptIdx === idx;
                let optStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 bg-white text-slate-800';

                if (showFeedback) {
                  if (opt.isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400/30';
                  } else {
                    optStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-600/30';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={showFeedback}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 ${optStyle} ${
                      showFeedback ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-extrabold">{opt.text[language]}</span>
                      {showFeedback && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {showFeedback && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </div>

                    {showFeedback && (isSelected || opt.isCorrect) && (
                      <div className="pt-2 border-t border-black/10 text-xs font-medium leading-relaxed">
                        <span>{opt.feedback[language]}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {showFeedback && (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleNextScenario}
                className="px-6 py-3 rounded-2xl font-black text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>
                  {scenarioIdx + 1 < STORY_SCENARIOS.length
                    ? language === 'pt' ? 'Próxima Questão' : 'Next Question'
                    : language === 'pt' ? 'Ver Conclusão e Pontuação' : 'View Summary & Score'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 3: COMPLETED */}
      {currentStage === 'completed' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-4xl mx-auto shadow-inner border border-rose-200 animate-bounce">
            🛡️
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {language === 'pt' ? 'Guardião Digital Certificado!' : 'Certified Digital Guardian!'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'pt' ? 'Sabes como agir em Segurança!' : 'You Know How to Stay Safe!'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Lembra-te sempre: nunca estás sozinho! Guardar provas, bloquear agressores e recorrer à Linha Internet Segura (800 21 90 90) ou aos professores e pais são os passos certos para uma navegação protegida.'
                : 'Remember: you are never alone! Preserving evidence, blocking bullies, and reaching out to the Safe Internet Helpline (800 21 90 90) protect everyone.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Rever os 5 Passos' : 'Review 5 Steps'}</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{language === 'pt' ? 'Concluir (+100 XP)' : 'Finish (+100 XP)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
