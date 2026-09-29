import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  MessageSquare,
  Zap,
  Lightbulb,
  Heart,
  Smile,
  Minus
} from 'lucide-react';
import { Language, User } from '../types';
import { speechService } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';
import { ticoFeedback, TICoReactionEvent } from '../utils/ticoEvents';

export type AssistantContext = 'dashboard' | 'module' | 'theme';

interface TICoRobotAssistantProps {
  language?: Language;
  context: AssistantContext;
  user?: User | null;
  moduleTitle?: string;
  themeTitle?: string;
  currentStepIndex?: number;
  totalSteps?: number;
}

export const TICoRobotAssistant: React.FC<TICoRobotAssistantProps> = ({
  language = 'pt',
  context,
  user,
  moduleTitle,
  themeTitle,
  currentStepIndex,
  totalSteps,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [isWinking, setIsWinking] = useState<boolean>(false);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isStreak3, setIsStreak3] = useState<boolean>(false);
  const [isCrown, setIsCrown] = useState<boolean>(false);
  const [dynamicReactionText, setDynamicReactionText] = useState<string | null>(null);
  const [hasNewTip, setHasNewTip] = useState<boolean>(false);

  // Listen to performance events (correct, wrong, streak3, quiz_perfect)
  useEffect(() => {
    const unsubscribe = ticoFeedback.subscribe((evt: TICoReactionEvent) => {
      setIsOpen(true);
      setIsMinimized(false);

      if (evt.type === 'wrong') {
        setIsAnalyzing(true);
        setIsCelebrating(false);
        setIsStreak3(false);
        setIsCrown(false);
        setDynamicReactionText(evt.message || (language === 'pt' ? 'Quase lá! Vamos analisar a pista juntos 🔍' : 'Almost there! Let us analyze the clue together 🔍'));
        soundEffects.playClick();
      } else if (evt.type === 'streak3') {
        setIsStreak3(true);
        setIsCelebrating(true);
        setIsAnalyzing(false);
        setIsCrown(false);
        setDynamicReactionText(evt.message || (language === 'pt' ? '🔥 Fantástico! 3 seguidas! Estás imparável! 🎉' : '🔥 Fantastic! 3 in a row! You are on fire! 🎉'));
        soundEffects.playVictory();
      } else if (evt.type === 'quiz_perfect') {
        setIsCrown(true);
        setIsCelebrating(true);
        setIsAnalyzing(false);
        setIsStreak3(true);
        setDynamicReactionText(evt.message || (language === 'pt' ? '🏆 UAU! Pontuação máxima! És um génio digital! ⭐' : '🏆 WOW! Perfect score! Digital genius! ⭐'));
        soundEffects.playVictory();
      } else if (evt.type === 'correct') {
        setIsCelebrating(true);
        setIsAnalyzing(false);
        setDynamicReactionText(evt.message || (language === 'pt' ? 'Excelente! Resposta certa! ✨' : 'Excellent! Correct answer! ✨'));
        soundEffects.playSuccess();
      }

      // Auto-reset back to normal state after duration
      const duration = evt.autoResetMs || 4500;
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsCelebrating(false);
        setIsStreak3(false);
        setIsCrown(false);
        setDynamicReactionText(null);
      }, duration);
    });

    return unsubscribe;
  }, [language]);

  // Motivational messages categorized by context
  const messagesByContext: Record<AssistantContext, { pt: string; en: string; icon: string }[]> = {
    dashboard: [
      {
        pt: `Olá${user ? ` ${user.name.split(' ')[0]}` : ''}! Sou o TICo, o teu robô assistente! 🚀 Pronto para explorar o mundo da tecnologia hoje?`,
        en: `Hello${user ? ` ${user.name.split(' ')[0]}` : ''}! I am TICo, your tech assistant robot! 🚀 Ready to explore technology today?`,
        icon: '👋',
      },
      {
        pt: 'Dica do TICo: Clica nos temas para completares lições e ganhares pontos XP para o Ranking da Turma! ⭐',
        en: 'TICo tip: Click on topics to complete lessons and earn XP points for the class leaderboard! ⭐',
        icon: '💡',
      },
      {
        pt: 'Sabias que fazer uma pausa de 20 segundos a cada 20 minutos protege os teus olhos? É a famosa Regra 20-20-20! 👀✨',
        en: 'Did you know looking 20 feet away every 20 minutes protects your eyes? The famous 20-20-20 Rule! 👀✨',
        icon: '🪑',
      },
      {
        pt: 'Ajusta a cadeira e mantém o ecrã ao nível dos olhos para estudares com conforto e sem dores! 🪑',
        en: 'Adjust your chair and keep your screen at eye-level to study with comfort and good posture! 🪑',
        icon: '💻',
      },
      {
        pt: 'Regra de Ouro da Internet: Nunca partilhes palavras-passe, morada ou nome da escola com desconhecidos! 🛡️',
        en: 'Golden Rule of the Web: Never share your passwords, address, or school name with strangers! 🛡️',
        icon: '🔐',
      },
    ],
    module: [
      {
        pt: `Estás a avançar muito bem${moduleTitle ? ` em "${moduleTitle}"` : ''}! Lê com atenção cada detalhe! 📖`,
        en: `Great progress${moduleTitle ? ` on "${moduleTitle}"` : ''}! Read each detail with care! 📖`,
        icon: '🌟',
      },
      {
        pt: 'Dica do TICo: Podes clicar no botão com o altifalante 🎧 para ouvir a explicação em voz alta a qualquer momento!',
        en: 'TICo tip: You can click the speaker button 🎧 to listen to the explanation read aloud anytime!',
        icon: '🔊',
      },
      {
        pt: totalSteps && currentStepIndex !== undefined
          ? `Estás no passo ${currentStepIndex + 1} de ${totalSteps}! Cada passo concluído dá-te mais XP no teu portfólio! 🚀`
          : 'Cada passo concluído deixa-te mais perto de dominares as Tecnologias de Informação! 🚀',
        en: totalSteps && currentStepIndex !== undefined
          ? `You are on step ${currentStepIndex + 1} of ${totalSteps}! Each step adds XP to your portfolio! 🚀`
          : 'Each completed step brings you closer to mastering ICT! 🚀',
        icon: '⚡',
      },
      {
        pt: 'Força! Depois da teoria podes experimentar os simuladores práticos para testares o que aprendeste! 🧪',
        en: 'Keep going! After the theory you can launch practical simulators to test what you learned! 🧪',
        icon: '🎮',
      },
    ],
    theme: [
      {
        pt: `Bem-vindo${themeTitle ? ` ao ${themeTitle}` : ''}! Explora os conteúdos teóricos e depois desafia-te nos jogos! 🎮`,
        en: `Welcome${themeTitle ? ` to ${themeTitle}` : ''}! Explore the lessons and challenge yourself with games! 🎮`,
        icon: '🚀',
      },
      {
        pt: 'Dica do TICo: Completa todos os módulos para desbloqueares o Quiz Final e conquistares a medalha dourada! 🏅',
        en: 'TICo tip: Complete all modules to unlock the Final Quiz and win the golden medal! 🏅',
        icon: '🏆',
      },
      {
        pt: 'Se tiveres dúvidas, podes repetir os passos as vezes que quiseres! O importante é aprender! 💡',
        en: 'If you have questions, review the steps as many times as you like! Learning is what matters! 💡',
        icon: '✨',
      },
    ],
  };

  const currentList = messagesByContext[context] || messagesByContext.dashboard;
  const currentMsg = currentList[currentMessageIndex % currentList.length];

  // Rotate messages automatically every 18 seconds if open
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % currentList.length);
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 900);
    }, 18000);
    return () => clearInterval(timer);
  }, [currentList.length]);

  // When context changes, reset message index and animate
  useEffect(() => {
    setCurrentMessageIndex(0);
    setHasNewTip(true);
    setIsCelebrating(true);
    setTimeout(() => {
      setIsCelebrating(false);
      setHasNewTip(false);
    }, 2500);
  }, [context, currentStepIndex]);

  const handleNextMessage = () => {
    soundEffects.playClick();
    setIsWinking(true);
    setCurrentMessageIndex((prev) => (prev + 1) % currentList.length);
    setTimeout(() => setIsWinking(false), 800);
  };

  const handleRobotClick = () => {
    soundEffects.playSuccess();
    setIsCelebrating(true);
    setIsWinking(true);
    setCurrentMessageIndex((prev) => (prev + 1) % currentList.length);
    setTimeout(() => {
      setIsCelebrating(false);
      setIsWinking(false);
    }, 1200);
  };

  const handleSpeak = () => {
    soundEffects.playClick();
    const textToSpeak = currentMsg[language] || currentMsg.pt;
    speechService.speak('tico-message', textToSpeak, language);
  };

  return (
    <aside
      aria-label={language === 'pt' ? 'Assistente TICo' : 'TICo Assistant'}
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end select-none pointer-events-none"
    >
      <div className="flex flex-col items-end space-y-2 pointer-events-auto">
        {/* Speech Bubble */}
        {isOpen && !isMinimized && (
          <div className="relative max-w-xs sm:max-w-sm bg-white rounded-3xl p-4 sm:p-5 border-2 border-indigo-200/90 shadow-2xl shadow-indigo-500/15 mb-1 animate-pop-speech">
            {/* Header of speech bubble */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-50">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                  🤖
                </span>
                <span className="text-xs font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                  <span>TICo</span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100">
                    {language === 'pt' ? 'Assistente' : 'Helper'}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                  title={language === 'pt' ? 'Ouvir mensagem' : 'Listen message'}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title={language === 'pt' ? 'Minimizar TICo' : 'Minimize TICo'}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-3">
              {dynamicReactionText ? (
                <div
                  className={`p-3 rounded-2xl flex items-start gap-2.5 animate-bounce ${
                    isAnalyzing
                      ? 'bg-amber-50 border border-amber-200 text-amber-900'
                      : isStreak3 || isCrown
                      ? 'bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-300 text-amber-950 font-black'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold'
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">
                    {isAnalyzing ? '🔍' : isCrown ? '👑' : isStreak3 ? '🔥' : '✨'}
                  </span>
                  <p className="text-xs sm:text-sm font-bold leading-relaxed">
                    {dynamicReactionText}
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <span className="text-lg shrink-0 mt-0.5">{currentMsg.icon}</span>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                    {currentMsg[language]}
                  </p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleNextMessage}
                  className="text-[11px] font-extrabold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors bg-indigo-50/70 hover:bg-indigo-100/70 px-2.5 py-1 rounded-xl"
                >
                  <span>💡</span>
                  <span>{language === 'pt' ? 'Outra Dica' : 'Next Tip'}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Little speech tail pointing down to TICo */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-indigo-200/90 rotate-45" />
          </div>
        )}

        {/* TICo Robot Animated Avatar Character */}
        <div className="flex items-center gap-3">
          {/* Notification bubble if minimized */}
          {isMinimized && (
            <div
              onClick={() => {
                soundEffects.playClick();
                setIsMinimized(false);
                setIsOpen(true);
              }}
              className="bg-white px-3 py-1.5 rounded-full border border-indigo-200 shadow-md text-xs font-black text-indigo-700 flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform animate-bounce"
            >
              <span>{isAnalyzing ? '🔍' : '🤖'}</span>
              <span>{isAnalyzing ? (language === 'pt' ? 'Vamos analisar!' : 'Let us analyze!') : (language === 'pt' ? 'Dica do TICo!' : 'TICo tip!')}</span>
            </div>
          )}

          <div
            onClick={handleRobotClick}
            title={language === 'pt' ? 'Clica no TICo para ouvires uma dica!' : 'Click TICo for a tip!'}
            className={`relative cursor-pointer group transition-transform duration-300 ${
              isCelebrating || isStreak3 ? 'scale-125 -translate-y-2' : isAnalyzing ? 'scale-110 rotate-3' : 'hover:scale-110 active:scale-95'
            } animate-robot-bob`}
          >
            {/* Sparkles / Confetti effect when celebrating or streak3 */}
            {(isCelebrating || isStreak3) && (
              <div className="absolute -top-4 -left-3 text-amber-400 text-xl animate-ping pointer-events-none">
                {isStreak3 ? '🔥' : '✨'}
              </div>
            )}
            {isStreak3 && (
              <div className="absolute -top-3 -right-3 text-red-500 text-lg animate-bounce pointer-events-none">
                🎉
              </div>
            )}
            {hasNewTip && (
              <span className="absolute -top-1 -right-1 z-20 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-xs animate-pulse" />
            )}

            {/* Pure SVG Animated Robot Character */}
            <svg
              width="68"
              height="76"
              viewBox="0 0 68 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xl overflow-visible"
            >
              <defs>
                <linearGradient id="ticoBody" x1="0" y1="18" x2="64" y2="72" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="0.5" stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#3730A3" />
                </linearGradient>
                <linearGradient id="ticoHead" x1="12" y1="12" x2="52" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818CF8" />
                  <stop offset="1" stopColor="#4F46E5" />
                </linearGradient>
                <linearGradient id="ticoVisor" x1="16" y1="18" x2="48" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0F172A" />
                  <stop offset="1" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="ticoGlow" x1="0" y1="0" x2="0" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38BDF8" />
                  <stop offset="1" stopColor="#0284C7" />
                </linearGradient>
              </defs>

              {/* Golden Crown if perfect */}
              {isCrown && (
                <g className="animate-bounce">
                  <path d="M22 10 L26 2 L32 7 L38 2 L42 10 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
                  <circle cx="26" cy="2" r="1.5" fill="#EF4444" />
                  <circle cx="32" cy="7" r="1.5" fill="#3B82F6" />
                  <circle cx="38" cy="2" r="1.5" fill="#10B981" />
                </g>
              )}

              {/* Antenna with bouncy light (hidden if crown is active) */}
              {!isCrown && (
                <g className="animate-antenna">
                  <line x1="32" y1="12" x2="32" y2="2" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="32" cy="2" r="3.5" fill={isStreak3 ? '#EF4444' : '#F59E0B'} className="animate-pulse" />
                </g>
              )}

              {/* Headphones / Ears */}
              <rect x="8" y="18" width="5" height="12" rx="2.5" fill="#312E81" />
              <rect x="51" y="18" width="5" height="12" rx="2.5" fill="#312E81" />
              <path d="M12 18 C12 8 52 8 52 18" stroke="#312E81" strokeWidth="3" fill="none" />

              {/* Head Box */}
              <rect x="13" y="11" width="38" height="26" rx="8" fill="url(#ticoHead)" stroke="#C7D2FE" strokeWidth="1.5" />

              {/* Visor / Digital Screen Face */}
              <rect x="17" y="15" width="30" height="16" rx="5" fill="url(#ticoVisor)" />

              {/* Digital Eyes */}
              {isAnalyzing ? (
                // Curious analyzing eyes (one wide, one squinting with curiosity)
                <g>
                  <circle cx="25" cy="22" r="3.4" fill="#38BDF8" />
                  <circle cx="39" cy="23" r="1.8" fill="#38BDF8" />
                  <circle cx="26" cy="21" r="1.1" fill="#FFFFFF" />
                </g>
              ) : isWinking ? (
                <g>
                  <circle cx="25" cy="22" r="2.8" fill="#38BDF8" />
                  <path d="M36 22 Q39 20 42 22" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                </g>
              ) : isCelebrating || isStreak3 ? (
                <g>
                  <path d="M22 23 Q25 19 28 23" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M36 23 Q39 19 42 23" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                <g>
                  <circle cx="25" cy="22" r="2.8" fill="#38BDF8" />
                  <circle cx="39" cy="22" r="2.8" fill="#38BDF8" />
                  <circle cx="26" cy="21" r="0.9" fill="#FFFFFF" />
                  <circle cx="40" cy="21" r="0.9" fill="#FFFFFF" />
                </g>
              )}

              {/* Tiny Smile or O-mouth */}
              {isAnalyzing ? (
                <circle cx="32" cy="27" r="1.5" fill="#38BDF8" />
              ) : (
                <path d="M29 27 Q32 29 35 27" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              )}

              {/* Neck Joint */}
              <rect x="28" y="37" width="8" height="4" rx="1.5" fill="#475569" />

              {/* Robot Body */}
              <rect x="14" y="40" width="36" height="23" rx="7" fill="url(#ticoBody)" stroke="#818CF8" strokeWidth="1.5" />

              {/* Belly Tech Badge: TICo text & mini heart meter */}
              <rect x="20" y="44" width="24" height="11" rx="4" fill="#1E1B4B" />
              <text x="25" y="52" fill="#38BDF8" fontSize="7" fontWeight="900" fontFamily="sans-serif">
                TICo
              </text>
              <circle cx="39" cy="49.5" r="2" fill={isStreak3 ? '#EF4444' : '#10B981'} className="animate-pulse" />

              {/* Body Bolt Accents */}
              <circle cx="18" cy="44" r="1" fill="#C7D2FE" />
              <circle cx="46" cy="44" r="1" fill="#C7D2FE" />

              {/* Robot Arms */}
              <rect x="9" y="43" width="5" height="11" rx="2.5" fill="#4338CA" />
              <rect x="50" y="43" width="5" height="11" rx="2.5" fill="#4338CA" />

              {/* Magnifying Glass 🔍 held in hand when analyzing! */}
              {isAnalyzing && (
                <g className="animate-pulse">
                  <circle cx="58" cy="48" r="6" stroke="#F59E0B" strokeWidth="2" fill="#BAE6FD" fillOpacity="0.4" />
                  <line x1="62" y1="52" x2="66" y2="57" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}

              {/* Hover Thrusters / Plasma jets */}
              <ellipse cx="26" cy="64" rx="4" ry="2" fill="#334155" />
              <ellipse cx="38" cy="64" rx="4" ry="2" fill="#334155" />
              <ellipse cx="26" cy="67" rx="2.5" ry="3.5" fill="url(#ticoGlow)" className="animate-pulse" />
              <ellipse cx="38" cy="67" rx="2.5" ry="3.5" fill="url(#ticoGlow)" className="animate-pulse" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};
