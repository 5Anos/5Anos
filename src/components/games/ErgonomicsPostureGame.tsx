import React, { useState } from 'react';
import { ArrowLeft, Trophy, Sparkles, CheckCircle2, RotateCcw, AlertTriangle, Eye, Sun, Armchair, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { PostureCorrectionSimulator } from '../PostureCorrectionSimulator';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';

interface Props {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface HabitScenario {
  id: number;
  title: { pt: string; en: string };
  student: string;
  situation: { pt: string; en: string };
  question: { pt: string; en: string };
  options: {
    text: { pt: string; en: string };
    isBest: boolean;
    feedback: { pt: string; en: string };
  }[];
}

const HABIT_SCENARIOS: HabitScenario[] = [
  {
    id: 1,
    title: { pt: 'O Sol a Bater no Ecrã', en: 'Sunlight Glare on Screen' },
    student: 'Pedro (10 anos)',
    situation: {
      pt: 'O Pedro está a estudar às 15h. A janela está mesmo atrás das costas dele e a luz solar direta cria um reflexo brilhante no monitor que o impede de ler.',
      en: 'Pedro is studying at 3 PM. The window is directly behind his back and strong sunlight causes harsh glare on his screen.',
    },
    question: {
      pt: 'O que deve o Pedro fazer para proteger a visão?',
      en: 'What should Pedro do to protect his eyesight?',
    },
    options: [
      {
        text: {
          pt: 'Ajustar a cortina ou orientar a secretária para a luz vir de lado, sem bater de frente nem por trás do ecrã',
          en: 'Adjust the blinds or reposition the desk so natural light comes from the side without direct reflections',
        },
        isBest: true,
        feedback: {
          pt: '✅ Excelente decisão! A luz natural lateral ilumina o caderno e o teclado sem provocar reflexos encandeantes no monitor.',
          en: '✅ Excellent choice! Side lighting illuminates the room without creating blinding reflections on the monitor.',
        },
      },
      {
        text: {
          pt: 'Apagar todas as luzes da sala, fechar tudo e estudar no escuro total apenas com a luz do monitor',
          en: 'Turn off all room lights, close everything, and study in pitch black with only the monitor on',
        },
        isBest: false,
        feedback: {
          pt: '❌ Cuidado! O contraste excessivo entre o ecrã muito brilhante e uma sala completamente escura cansa imenso os olhos e causa dores de cabeça.',
          en: '❌ Careful! Excessive contrast between a bright monitor and total darkness heavily strains eyes and causes headaches.',
        },
      },
      {
        text: {
          pt: 'Colar os olhos a 5 cm do monitor para conseguir ver através do reflexo',
          en: 'Stick eyes 5 cm from the screen to peer through the glare',
        },
        isBest: false,
        feedback: {
          pt: '❌ Incorreto! Ficar demasiado perto do monitor força os músculos oculares. Mantém sempre cerca de 50 a 70 cm (um braço esticado).',
          en: '❌ Incorrect! Sitting too close strains eye focus muscles. Always maintain a full arm distance (50-70 cm).',
        },
      },
    ],
  },
  {
    id: 2,
    title: { pt: 'A Regra do 20-20-20 e as Pausas Ativas', en: 'The 20-20-20 Rule & Active Breaks' },
    student: 'Leonor (11 anos)',
    situation: {
      pt: 'A Leonor está a fazer um trabalho de pesquisa e já passaram 45 minutos seguidos a olhar para o monitor sem pestanejar nem se levantar.',
      en: 'Leonor has been researching for 45 continuous minutes without blinking or getting up from her chair.',
    },
    question: {
      pt: 'Qual é o hábito ergonómico mais saudável que a Leonor deve adotar agora?',
      en: 'Which healthy ergonomic habit should Leonor adopt right now?',
    },
    options: [
      {
        text: {
          pt: 'Fazer uma pausa ativa (levanta-se, mexe o corpo, estica suavemente os braços e as pernas e bebe água) e aplicar a regra 20-20-20 para olhar para longe (pelo menos 6 metros) durante 20 segundos para descansar a visão',
          en: 'Take an active break (stand up, move your body, gently stretch arms and legs, drink water) and apply the 20-20-20 rule to look into the distance (at least 6m) for 20s to rest eyes',
        },
        isBest: true,
        feedback: {
          pt: '✅ Muito bem! As pausas ativas relaxam os músculos e a circulação, enquanto a regra 20-20-20 descansa especificamente os olhos.',
          en: '✅ Well done! Active breaks relax muscles and circulation, while the 20-20-20 rule specifically rests eye focus.',
        },
      },
      {
        text: {
          pt: 'Continuar mais duas horas sem parar para acabar o trabalho o mais depressa possível',
          en: 'Keep pushing for two more hours non-stop to finish as fast as possible',
        },
        isBest: false,
        feedback: {
          pt: '❌ Não é recomendado! Estudar horas seguidas sem pausas diminui a concentração e provoca contraturas nos ombros e cansaço visual.',
          en: '❌ Not recommended! Long continuous screen sessions reduce concentration and cause muscular tension and eye strain.',
        },
      },
      {
        text: {
          pt: 'Mudar de cadeira e continuar a trabalhar sem esticar as pernas nem os braços',
          en: 'Switch chairs and keep typing without stretching legs or arms',
        },
        isBest: false,
        feedback: {
          pt: '❌ Incompleto! O corpo precisa de se movimentar e os olhos precisam de focar o horizonte para relaxar.',
          en: '❌ Incomplete! The body needs physical movement and eyes need distant focus to rest.',
        },
      },
    ],
  },
  {
    id: 3,
    title: { pt: 'Estudo no Portátil e na Cama', en: 'Studying on Laptop in Bed' },
    student: 'Tomás (10 anos)',
    situation: {
      pt: 'O Tomás deita-se na cama de barriga para baixo com os cotovelos apoiados no colchão a segurar o portátil durante horas.',
      en: 'Tomás lies on his stomach in bed with elbows propped on the mattress holding his laptop for hours.',
    },
    question: {
      pt: 'Porque é que este hábito é prejudicial e como deve ser corrigido?',
      en: 'Why is this posture harmful and how should it be fixed?',
    },
    options: [
      {
        text: {
          pt: 'Força a curvatura do pescoço e a zona lombar; deve estudar numa secretária com cadeira ajustada e portátil com suporte',
          en: 'It hyperextends neck and lower back; he should work at a proper desk with an adjustable chair and laptop stand',
        },
        isBest: true,
        feedback: {
          pt: '✅ Perfeito! Trabalhar deitado na cama sobrecarrega o pescoço, ombros e coluna. Uma secretária adequada é o local ideal de estudo.',
          en: '✅ Perfect! Working lying down strains neck and spine. A dedicated desk and chair provide proper ergonomic support.',
        },
      },
      {
        text: {
          pt: 'Não faz mal nenhum desde que use duas almofadas debaixo do queixo',
          en: 'It does not matter as long as he stacks two pillows under his chin',
        },
        isBest: false,
        feedback: {
          pt: '❌ Incorreto! As almofadas não eliminam a pressão anormal na cervical e nos ombros.',
          en: '❌ Incorrect! Pillows do not relieve cervical spine compression and shoulder strain.',
        },
      },
    ],
  },
  {
    id: 4,
    title: { pt: 'Digitação e Posição dos Pulsos', en: 'Typing and Wrist Alignment' },
    student: 'Inês (11 anos)',
    situation: {
      pt: 'A Inês escreve no teclado com as palmas dobradas para cima e os pulsos apoiados no bordo afiado da secretária.',
      en: 'Inês types on the keyboard with hands bent sharply upward and wrists pressed against the sharp desk edge.',
    },
    question: {
      pt: 'Qual é a posição neutra e correta dos pulsos ao escrever e usar o rato?',
      en: 'What is the correct neutral wrist alignment when typing and mousing?',
    },
    options: [
      {
        text: {
          pt: 'Pulsos direitos e alinhados em linha reta com os antebraços, sem dobras forçadas',
          en: 'Wrists straight and aligned in a continuous straight line with forearms, avoiding forced angles',
        },
        isBest: true,
        feedback: {
          pt: '✅ Exato! Pulsos direitos numa linha neutra reduzem a tensão nos tendões e previnem dores articulares.',
          en: '✅ Exactly! Straight, neutral wrists minimize tendon strain and prevent repetitive joint soreness.',
        },
      },
      {
        text: {
          pt: 'Dobrar os pulsos ao máximo para tocar nas teclas com mais força',
          en: 'Bend wrists as far as possible to strike keys with maximum force',
        },
        isBest: false,
        feedback: {
          pt: '❌ Perigoso! Dobrar os pulsos para cima ou para baixo aumenta o atrito nos tendões das mãos.',
          en: '❌ Dangerous! Bending wrists up or down compresses wrist nerves and tendons.',
        },
      },
    ],
  },
];

export const ErgonomicsPostureGame: React.FC<Props> = ({ language, onBack, onFinish }) => {
  const [activeStage, setActiveStage] = useState<'simulator' | 'scenarios' | 'completed'>('simulator');
  const [simulatorDone, setSimulatorDone] = useState(false);
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scenarioScores, setScenarioScores] = useState<boolean[]>([]);

  const handleSimulatorComplete = () => {
    setSimulatorDone(true);
  };

  const handleChooseScenarioOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
  };

  const handleNextScenario = () => {
    if (selectedOption === null) return;
    const isCorrect = HABIT_SCENARIOS[currentScenarioIdx].options[selectedOption].isBest;
    const nextScores = [...scenarioScores, isCorrect];
    setScenarioScores(nextScores);
    setSelectedOption(null);

    if (currentScenarioIdx + 1 < HABIT_SCENARIOS.length) {
      setCurrentScenarioIdx((prev) => prev + 1);
    } else {
      setActiveStage('completed');
      const correctCount = nextScores.filter(Boolean).length;
      const totalPoints = 50 + Math.round((correctCount / HABIT_SCENARIOS.length) * 50);
      onFinish(totalPoints, 100, Math.round((totalPoints / 100) * 100));
    }
  };

  const currentScenario = HABIT_SCENARIOS[currentScenarioIdx];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar aos Desafios' : 'Back to Challenges'}</span>
        </button>

        {/* Stage Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStage('simulator')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              activeStage === 'simulator'
                ? 'bg-indigo-600 text-white shadow-xs'
                : simulatorDone
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {language === 'pt' ? '1. Simulador de Postura' : '1. Posture Simulator'}
          </button>
          <button
            onClick={() => simulatorDone && setActiveStage('scenarios')}
            disabled={!simulatorDone}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              activeStage === 'scenarios'
                ? 'bg-indigo-600 text-white shadow-xs'
                : !simulatorDone
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'pt' ? '2. Inspetor de Hábitos' : '2. Habit Inspector'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-amber-900 font-extrabold text-xs sm:text-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>100 XP</span>
          </div>
        </div>
      </div>

      {/* Stage 1: Interactive Posture Simulator */}
      {activeStage === 'simulator' && (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500 text-white">
                {language === 'pt' ? 'Fase 1: Diagnóstico e Correção' : 'Phase 1: Diagnosis & Correction'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {language === 'pt' ? '🪑 Corrige a Postura do Aluno!' : '🪑 Fix the Student Posture!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl">
                {language === 'pt'
                  ? 'Observa o estudante na secretária. Clica nas zonas vermelhas de alerta (Cabeça, Costas, Braços e Pés) para descobrir os erros e aplicar a solução correta!'
                  : 'Examine the student. Click on red alert zones to fix posture flaws and align joints to 90 degrees!'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AudioSpeakButton
                id="ergo-stage1-audio"
                text={language === 'pt'
                  ? 'Corrige a Postura do Aluno. Observa o estudante na secretária. Clica nas zonas vermelhas de alerta para descobrir os erros e aplicar a solução correta!'
                  : 'Fix the Student Posture. Examine the student at the desk. Click on red alert zones to fix posture flaws!'}
                language={language}
                label={language === 'pt' ? 'Ouvir Instruções' : 'Listen Instructions'}
                variant="pill"
                size="sm"
              />
              {simulatorDone && (
                <button
                  onClick={() => setActiveStage('scenarios')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md flex items-center gap-2 shrink-0 cursor-pointer transition-all hover:scale-102"
                >
                  <span>{language === 'pt' ? 'Avançar para o Inspetor' : 'Next to Habit Inspector'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <PostureCorrectionSimulator language={language} onComplete={handleSimulatorComplete} />

          {simulatorDone && (
            <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in zoom-in-95">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-inner shrink-0">
                  🎉
                </div>
                <div>
                  <h3 className="text-base font-black text-emerald-950">
                    {language === 'pt' ? 'Postura Perfeita a 100%!' : 'Perfect Posture 100%!'}
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    {language === 'pt'
                      ? 'Excelente! Agora testa os teus conhecimentos como Inspetor de Hábitos e Iluminação.'
                      : 'Great job! Now test your knowledge as a Habit & Lighting Inspector.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStage('scenarios')}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
              >
                <span>{language === 'pt' ? 'Ir para a Fase 2: Inspetor de Hábitos' : 'Go to Phase 2: Habit Inspector'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Stage 2: Real-World Habit Inspector Scenarios */}
      {activeStage === 'scenarios' && (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500 text-white">
                {language === 'pt' ? `Cenário ${currentScenarioIdx + 1} de ${HABIT_SCENARIOS.length}` : `Scenario ${currentScenarioIdx + 1} of ${HABIT_SCENARIOS.length}`}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {currentScenario.title[language]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                {language === 'pt' ? `Estudante: ${currentScenario.student}` : `Student: ${currentScenario.student}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AudioSpeakButton
                id={`ergo-scenario-${currentScenario.id}`}
                text={`${currentScenario.title[language]}. Estudante: ${currentScenario.student}. ${currentScenario.situation[language]}. Pergunta: ${currentScenario.question[language]}`}
                language={language}
                label={language === 'pt' ? 'Ouvir Cenário' : 'Listen Scenario'}
                variant="pill"
                size="sm"
              />
              <div className="w-24 sm:w-36 bg-white/20 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentScenarioIdx + 1) / HABIT_SCENARIOS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-indigo-100 shadow-md space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-sm text-slate-800 leading-relaxed font-medium flex items-start justify-between gap-3">
              <p className="flex-1">{currentScenario.situation[language]}</p>
              <AudioSpeakButton
                id={`ergo-sit-${currentScenario.id}`}
                text={currentScenario.situation[language]}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex-1">
                  {currentScenario.question[language]}
                </h3>
                <AudioSpeakButton
                  id={`ergo-q-${currentScenario.id}`}
                  text={`${currentScenario.question[language]}. ${currentScenario.options.map((opt, i) => `Opção ${String.fromCharCode(65 + i)}: ${opt.text[language]}`).join('. ')}`}
                  language={language}
                  variant="icon"
                  size="xs"
                />
              </div>

              <div className="space-y-3">
                {currentScenario.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isDone = selectedOption !== null;

                  let cardStyle = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50';
                  if (isDone) {
                    if (opt.isBest) {
                      cardStyle = 'border-emerald-400 bg-emerald-50/80 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      cardStyle = 'border-rose-400 bg-rose-50/80 text-rose-950 font-bold';
                    } else {
                      cardStyle = 'border-slate-200 opacity-50 bg-slate-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isDone}
                      onClick={() => handleChooseScenarioOption(idx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${cardStyle}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                          isDone && opt.isBest
                            ? 'bg-emerald-500 text-white'
                            : isDone && isSelected
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold">{opt.text[language]}</p>
                        {isDone && isSelected && (
                          <div className="mt-3 pt-3 border-t border-current/20 text-xs leading-relaxed animate-in fade-in">
                            {opt.feedback[language]}
                          </div>
                        )}
                        {isDone && !isSelected && opt.isBest && (
                          <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-800 font-medium leading-relaxed animate-in fade-in">
                            {opt.feedback[language]}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedOption !== null && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextScenario}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                >
                  <span>
                    {currentScenarioIdx + 1 < HABIT_SCENARIOS.length
                      ? language === 'pt'
                        ? 'Próximo Cenário'
                        : 'Next Scenario'
                      : language === 'pt'
                      ? 'Ver Resultado Final'
                      : 'See Final Result'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completed Final Screen */}
      {activeStage === 'completed' && (
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white text-center space-y-6 shadow-2xl border-2 border-indigo-400/30 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-950 text-4xl flex items-center justify-center mx-auto shadow-xl">
            🏆
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30">
              {language === 'pt' ? 'Desafio Concluído com Sucesso!' : 'Challenge Completed!'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              {language === 'pt' ? 'Mestre da Ergonomia e Bem-Estar!' : 'Master of Ergonomics & Well-Being!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Aprendeste a ajustar a postura na secretária, a regular a luz lateral e a combinar as pausas ativas corporais com o descanso visual da regra 20-20-20.'
                : 'You mastered ergonomic desk posture, glare-free lighting, and combining active body breaks with the 20-20-20 visual rest rule.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 font-black text-lg">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>+100 XP Ganho!</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveStage('simulator');
                setCurrentScenarioIdx(0);
                setSelectedOption(null);
                setScenarioScores([]);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Jogar Novamente' : 'Play Again'}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md transition-all cursor-pointer"
            >
              <span>{language === 'pt' ? 'Concluir e Voltar aos Desafios' : 'Finish & Return'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

