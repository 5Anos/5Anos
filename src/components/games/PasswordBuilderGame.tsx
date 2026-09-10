import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Check, X, Sparkles, RefreshCw, KeyRound, AlertCircle, Trophy, ArrowRight, ShieldAlert, Lock, Zap } from 'lucide-react';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface PasswordBuilderGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface SharingDilemma {
  id: number;
  title: { pt: string; en: string };
  situation: { pt: string; en: string };
  question: { pt: string; en: string };
  options: {
    text: { pt: string; en: string };
    isCorrect: boolean;
    feedback: { pt: string; en: string };
  }[];
}

const DILEMMAS: SharingDilemma[] = [
  {
    id: 1,
    title: { pt: 'O Pedido do Melhor Amigo', en: 'Best Friend Request' },
    situation: {
      pt: 'O teu melhor amigo da escola pede-te a palavra-passe do teu jogo favorito para jogar com a tua personagem rara durante o fim de semana.',
      en: 'Your best friend at school asks for your favorite gaming account password to play with your rare character over the weekend.',
    },
    question: {
      pt: 'Qual é a melhor resposta a dar ao teu amigo?',
      en: 'What is the best way to handle this with your friend?',
    },
    options: [
      {
        text: {
          pt: 'Explicar com calma que as palavras-passe são estritamente pessoais e secretas e jogar com ele em equipa na mesma sala',
          en: 'Calmly explain that passwords are strictly personal and secret, and play together as a team in person',
        },
        isCorrect: true,
        feedback: {
          pt: '✅ Resposta exemplar! Amizade não significa partilhar senhas. Uma palavra-passe emprestada pode ser alterada sem querer ou partilhada com outras pessoas.',
          en: '✅ Exemplary! True friendship does not require sharing credentials. Shared passwords risk accidental loss or leakage.',
        },
      },
      {
        text: {
          pt: 'Dar-lhe a senha, mas pedir-lhe em segredo que não conte a mais ninguém',
          en: 'Give him the password but secretly ask him not to tell anyone else',
        },
        isCorrect: false,
        feedback: {
          pt: '❌ Perigoso! Assim que partilhas a tua palavra-passe com alguém, perdes o controlo da tua conta e da tua privacidade.',
          en: '❌ Risky! Once you share credentials, you lose control of your account security and private data.',
        },
      },
    ],
  },
  {
    id: 2,
    title: { pt: 'Mensagem com Código de Confirmação (2FA)', en: 'Two-Factor Confirmation Code Message' },
    situation: {
      pt: 'Recebes uma mensagem privada no chat de um jogo de alguém que diz ser "Suporte Técnico Oficial" a pedir o código de 6 números que recebeste por SMS.',
      en: 'You receive a private chat message in a game claiming to be "Official Game Support" asking for the 6-digit SMS verification code you just received.',
    },
    question: {
      pt: 'O que deves fazer imediatamente?',
      en: 'What should you do immediately?',
    },
    options: [
      {
        text: {
          pt: 'Nunca partilhar o código com ninguém! As equipas legítimas de suporte nunca pedem códigos de autenticação ou palavras-passe',
          en: 'Never share the code! Legitimate support teams never ask for authentication codes or passwords',
        },
        isCorrect: true,
        feedback: {
          pt: '✅ Excelente proteção! Esse código SMS é o segundo fator de segurança (2FA). Se o entregares, alguém conseguirá entrar na tua conta.',
          en: '✅ Superb defense! That SMS code is your Two-Factor key (2FA). Handing it over allows impostors to hijack your account.',
        },
      },
      {
        text: {
          pt: 'Enviar o código depressa antes que o "suporte" bloqueie a conta',
          en: 'Send the code quickly before "support" bans the account',
        },
        isCorrect: false,
        feedback: {
          pt: '❌ Armadilha de Phishing! Os impostores usam ameaças e urgência falsa para roubar contas.',
          en: '❌ Phishing trap! Scammers use threats and fake urgency to trick students into surrendering credentials.',
        },
      },
    ],
  },
  {
    id: 3,
    title: { pt: 'A Mesma Palavra-passe em Todo o Lado', en: 'Same Password Everywhere' },
    situation: {
      pt: 'A Maria tem uma palavra-passe que adora e usa exatamente a mesma no email escolar, no jogo online, no telemóvel e na plataforma de vídeos.',
      en: 'Maria has a password she loves and uses the exact same one for her school email, online gaming, phone, and video app.',
    },
    question: {
      pt: 'Qual é o risco de ter a mesma palavra-passe em múltiplos serviços?',
      en: 'What is the risk of using one single password across multiple accounts?',
    },
    options: [
      {
        text: {
          pt: 'Efeito dominó: se um site menos seguro for atacado, todas as outras contas da Maria ficam em perigo imediato',
          en: 'Domino effect: if one less secure site is breached, all other accounts become instantly compromised',
        },
        isCorrect: true,
        feedback: {
          pt: '✅ Exato! Deves ter palavras-passe diferentes para contas importantes (especialmente o teu email principal).',
          en: '✅ Exactly! Always use distinct passphrases for important accounts (especially your primary email).',
        },
      },
      {
        text: {
          pt: 'Não há problema nenhum porque a palavra-passe é muito bonita',
          en: 'No issue at all because the password is nice and easy to remember',
        },
        isCorrect: false,
        feedback: {
          pt: '❌ Errado! Repetir palavras-passe é uma das maiores causas de invasão de contas.',
          en: '❌ Incorrect! Password reuse is one of the most common causes of account takeovers.',
        },
      },
    ],
  },
];

const WORD_BRICKS = [
  { pt: 'tubarao', en: 'shark' },
  { pt: 'amarelo', en: 'yellow' },
  { pt: 'salta', en: 'jumps' },
  { pt: 'nuvem', en: 'cloud' },
  { pt: 'planeta', en: 'planet' },
  { pt: 'rapido', en: 'fast' },
  { pt: 'guitarra', en: 'guitar' },
  { pt: 'castelo', en: 'castle' },
  { pt: '!2026', en: '!2026' },
  { pt: '#Forte', en: '#Strong' },
];

export const PasswordBuilderGame: React.FC<PasswordBuilderGameProps> = ({ language, onBack, onFinish }) => {
  const [activeStage, setActiveStage] = useState<'builder' | 'dilemmas' | 'completed'>('builder');
  const [mockPassword, setMockPassword] = useState('cavalo-amarelo-corre-depressa');
  const [selectedWords, setSelectedWords] = useState<string[]>(['tubarao', 'amarelo', 'salta', 'nuvem']);
  const [currentDilemmaIdx, setCurrentDilemmaIdx] = useState(0);
  const [selectedDilemmaOpt, setSelectedDilemmaOpt] = useState<number | null>(null);
  const [dilemmaScores, setDilemmaScores] = useState<boolean[]>([]);

  const t = translations[language];

  // Modern pass analysis
  const isLong = mockPassword.length >= 12;
  const wordCount = mockPassword.trim().split(/[\s\-_.]+/).filter((w) => w.length >= 2).length;
  const isPassphrase = wordCount >= 3 && mockPassword.length >= 14;
  const distinctChars = new Set(mockPassword.split('')).size;
  
  const hasNoObviousSequences = !/12345|qwerty|abcdef|password|87654|asdfgh/i.test(mockPassword) && !/^(.)\1+$/.test(mockPassword);
  const personalTerms = /maria|martim|joao|pedro|ana|escola|benfica|porto|sporting|2010|2011|2012|2013|2014|2015|2016|2024|2025|2026/i;
  const hasNoPersonalInfo = !personalTerms.test(mockPassword.toLowerCase());
  const isHardToGuess = (isPassphrase || (mockPassword.length >= 10 && distinctChars >= 5)) && hasNoObviousSequences && hasNoPersonalInfo;

  // Hacker crack estimation calculation
  let crackTime = { pt: 'Menos de 0.001 segundos (Quebra instantânea!)', en: 'Under 0.001 seconds (Instant breach!)' };
  let strengthLabel = { pt: 'Fraca / Previsível', en: 'Weak / Predictable' };
  let strengthColor = 'bg-rose-500 text-rose-700';
  let strengthScore = 20;

  const criteriaMetCount = [isLong, isHardToGuess, hasNoPersonalInfo, hasNoObviousSequences].filter(Boolean).length;

  if (isPassphrase && mockPassword.length >= 16 && hasNoPersonalInfo && hasNoObviousSequences) {
    crackTime = { pt: 'Cerca de 400 Milhões de Anos! (Ultra Segura)', en: 'About 400 Million Years! (Ultra Secure)' };
    strengthLabel = { pt: 'Excelente Frase-Passe!', en: 'Excellent Passphrase!' };
    strengthColor = 'bg-emerald-500 text-emerald-700';
    strengthScore = 100;
  } else if (criteriaMetCount >= 3 && mockPassword.length >= 12) {
    crackTime = { pt: 'Vários Anos por um Supercomputador', en: 'Several Years by a Supercomputer' };
    strengthLabel = { pt: 'Boa e Bastante Segura', en: 'Good & Highly Secure' };
    strengthColor = 'bg-emerald-500 text-emerald-700';
    strengthScore = 80;
  } else if (criteriaMetCount >= 2 && mockPassword.length >= 8) {
    crackTime = { pt: 'Algumas horas ou dias', en: 'A few hours or days' };
    strengthLabel = { pt: 'Média (Torna-a mais longa)', en: 'Medium (Make it longer)' };
    strengthColor = 'bg-amber-500 text-amber-700';
    strengthScore = 50;
  }

  const handleAddBrick = (brick: string) => {
    const updated = [...selectedWords, brick];
    setSelectedWords(updated);
    setMockPassword(updated.join('-'));
  };

  const handleRemoveBrick = (index: number) => {
    const updated = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(updated);
    setMockPassword(updated.join('-'));
  };

  const handleDilemmaOption = (idx: number) => {
    if (selectedDilemmaOpt !== null) return;
    setSelectedDilemmaOpt(idx);
  };

  const handleNextDilemma = () => {
    if (selectedDilemmaOpt === null) return;
    const isCorr = DILEMMAS[currentDilemmaIdx].options[selectedDilemmaOpt].isCorrect;
    const nextScores = [...dilemmaScores, isCorr];
    setDilemmaScores(nextScores);
    setSelectedDilemmaOpt(null);

    if (currentDilemmaIdx + 1 < DILEMMAS.length) {
      setCurrentDilemmaIdx((prev) => prev + 1);
    } else {
      setActiveStage('completed');
      const correctDilemmas = nextScores.filter(Boolean).length;
      const totalPoints = 50 + Math.round((correctDilemmas / DILEMMAS.length) * 50);
      onFinish(totalPoints, 100, Math.round((totalPoints / 100) * 100));
    }
  };

  const currentDilemma = DILEMMAS[currentDilemmaIdx];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToTheme}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStage('builder')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              activeStage === 'builder'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800'
            }`}
          >
            {language === 'pt' ? '1. Construtor de Frase-Passe' : '1. Passphrase Builder'}
          </button>
          <button
            onClick={() => setActiveStage('dilemmas')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              activeStage === 'dilemmas'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'pt' ? '2. Dilemas de Partilha' : '2. Sharing Dilemmas'}
          </button>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-amber-900 font-extrabold text-xs sm:text-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>100 XP</span>
        </div>
      </div>

      {/* Stage 1: Interactive Passphrase Builder */}
      {activeStage === 'builder' && (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
                {language === 'pt' ? 'Fase 1: O Laboratório de Senhas' : 'Phase 1: Password Lab'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {language === 'pt' ? '🔐 O Laboratório do Construtor de Frase-Passe' : '🔐 Passphrase Builder Lab'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl font-medium">
                {language === 'pt'
                  ? 'Combina blocos de palavras para criar uma frase-passe longa, fácil de memorizar e praticamente impossível de ser adivinhada por computadores!'
                  : 'Combine word blocks into a memorable, high-entropy passphrase that takes millions of years to crack!'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AudioSpeakButton
                id="pwbuilder-phase1-intro"
                text={language === 'pt'
                  ? 'O Laboratório do Construtor de Frase-Passe. Combina blocos de palavras para criar uma frase-passe longa e segura!'
                  : 'Passphrase Builder Lab. Combine word blocks to build a secure passphrase!'}
                language={language}
                label={language === 'pt' ? 'Ouvir Instruções' : 'Listen Instructions'}
                variant="pill"
                size="sm"
              />
              <button
                onClick={() => setActiveStage('dilemmas')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 shrink-0 cursor-pointer transition-all hover:scale-102"
              >
                <span>{language === 'pt' ? 'Ir para Dilemas' : 'Next to Dilemmas'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Builder Sandbox */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                {language === 'pt' ? 'A Tua Frase-Passe em Construção:' : 'Your Passphrase Under Test:'}
              </label>
              <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-base sm:text-lg flex flex-wrap items-center gap-2 min-h-[64px] border border-slate-800">
                {selectedWords.length === 0 && (
                  <span className="text-slate-500 text-xs sm:text-sm italic">
                    {language === 'pt' ? 'Clica nos blocos abaixo para adicionar palavras...' : 'Click bricks below to add words...'}
                  </span>
                )}
                {selectedWords.map((word, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleRemoveBrick(idx)}
                    className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-sm font-bold flex items-center gap-1.5 cursor-pointer hover:bg-rose-500/30 hover:border-rose-400 hover:text-rose-200 transition-colors"
                    title={language === 'pt' ? 'Clica para remover' : 'Click to remove'}
                  >
                    {word}
                    <X className="w-3.5 h-3.5" />
                  </span>
                ))}
              </div>
            </div>

            {/* Clickable Word Blocks */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                {language === 'pt' ? 'Clica para adicionar blocos à frase-passe:' : 'Click to append word blocks:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {WORD_BRICKS.map((brick, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddBrick(brick[language])}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    + {brick[language]}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWords([]);
                    setMockPassword('');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  {language === 'pt' ? 'Limpar' : 'Clear'}
                </button>
              </div>
            </div>

            {/* Hacker Simulator Radar */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4 shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {language === 'pt' ? 'Tempo Estimado para o Computador Hacker Quebrar:' : 'Hacker Supercomputer Crack Time:'}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  {crackTime[language]}
                </span>
              </div>

              {/* Progress strength bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5">
                <div
                  className={`h-full ${strengthColor.split(' ')[0]} rounded-full transition-all duration-300`}
                  style={{ width: `${strengthScore}%` }}
                />
              </div>
            </div>

            {/* 4 Shield Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
                isLong ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {isLong ? <Check className="w-5 h-5 text-emerald-600 shrink-0" /> : <X className="w-5 h-5 text-slate-400 shrink-0" />}
                <div>
                  <p>{language === 'pt' ? 'Longa (12+ caracteres)' : 'Long (12+ characters)'}</p>
                  <p className="text-[10px] font-normal opacity-75">{language === 'pt' ? 'O tamanho é o escudo mais forte contra ataques.' : 'Length is the strongest barrier.'}</p>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
                isHardToGuess ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {isHardToGuess ? <Check className="w-5 h-5 text-emerald-600 shrink-0" /> : <X className="w-5 h-5 text-slate-400 shrink-0" />}
                <div>
                  <p>{language === 'pt' ? 'Difícil de Adivinhar' : 'Hard to Guess'}</p>
                  <p className="text-[10px] font-normal opacity-75">{language === 'pt' ? 'Várias palavras sem ligação óbvia.' : 'Multiple random unlinked words.'}</p>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
                hasNoPersonalInfo ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {hasNoPersonalInfo ? <Check className="w-5 h-5 text-emerald-600 shrink-0" /> : <X className="w-5 h-5 text-slate-400 shrink-0" />}
                <div>
                  <p>{language === 'pt' ? 'Sem Dados Pessoais' : 'No Personal Data'}</p>
                  <p className="text-[10px] font-normal opacity-75">{language === 'pt' ? 'Sem o teu nome, ano de nascimento ou clube.' : 'No names, birthdays or teams.'}</p>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
                hasNoObviousSequences ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {hasNoObviousSequences ? <Check className="w-5 h-5 text-emerald-600 shrink-0" /> : <X className="w-5 h-5 text-slate-400 shrink-0" />}
                <div>
                  <p>{language === 'pt' ? 'Sem Sequências de Teclado' : 'No Keyboard Patterns'}</p>
                  <p className="text-[10px] font-normal opacity-75">{language === 'pt' ? 'Sem 123456, qwerty ou repetições.' : 'No 123456, qwerty, or repeats.'}</p>
                </div>
              </div>
            </div>

            {/* Advance Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-600 font-medium">
                {criteriaMetCount >= 3
                  ? (language === 'pt' ? '🎉 Excelente! Criaste uma frase-passe com padrão profissional.' : '🎉 Superb! You created a top-tier passphrase.')
                  : (language === 'pt' ? 'Dica: junta pelo menos 3 ou 4 blocos de palavras.' : 'Tip: combine at least 3 or 4 word bricks.')}
              </span>
              <button
                onClick={() => setActiveStage('dilemmas')}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
              >
                <span>{language === 'pt' ? 'Avançar para a Fase 2: Dilemas' : 'Go to Phase 2: Dilemmas'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Sharing Dilemmas */}
      {activeStage === 'dilemmas' && (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
                {language === 'pt' ? `Dilema ${currentDilemmaIdx + 1} de ${DILEMMAS.length}` : `Dilemma ${currentDilemmaIdx + 1} of ${DILEMMAS.length}`}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {currentDilemma.title[language]}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <AudioSpeakButton
                id={`pwbuilder-dilemma-${currentDilemma.id}`}
                text={`${currentDilemma.title[language]}. ${currentDilemma.situation[language]}. Pergunta: ${currentDilemma.question[language]}`}
                language={language}
                label={language === 'pt' ? 'Ouvir Dilema' : 'Listen Dilemma'}
                variant="pill"
                size="sm"
              />
              <div className="w-24 sm:w-36 bg-white/20 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentDilemmaIdx + 1) / DILEMMAS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-md space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-sm text-slate-800 leading-relaxed font-medium flex items-start justify-between gap-3">
              <p className="flex-1">{currentDilemma.situation[language]}</p>
              <AudioSpeakButton
                id={`pwbuilder-sit-${currentDilemma.id}`}
                text={currentDilemma.situation[language]}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex-1">
                  {currentDilemma.question[language]}
                </h3>
                <AudioSpeakButton
                  id={`pwbuilder-q-${currentDilemma.id}`}
                  text={`${currentDilemma.question[language]}. ${currentDilemma.options.map((opt, i) => `Opção ${String.fromCharCode(65 + i)}: ${opt.text[language]}`).join('. ')}`}
                  language={language}
                  variant="icon"
                  size="xs"
                />
              </div>

              <div className="space-y-3">
                {currentDilemma.options.map((opt, idx) => {
                  const isSelected = selectedDilemmaOpt === idx;
                  const isDone = selectedDilemmaOpt !== null;

                  let cardStyle = 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50';
                  if (isDone) {
                    if (opt.isCorrect) {
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
                      onClick={() => handleDilemmaOption(idx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${cardStyle}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                          isDone && opt.isCorrect
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
                        {isDone && !isSelected && opt.isCorrect && (
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

            {selectedDilemmaOpt !== null && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextDilemma}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                >
                  <span>
                    {currentDilemmaIdx + 1 < DILEMMAS.length
                      ? language === 'pt'
                        ? 'Próximo Dilema'
                        : 'Next Dilemma'
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
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white text-center space-y-6 shadow-2xl border-2 border-emerald-400/30 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-950 text-4xl flex items-center justify-center mx-auto shadow-xl">
            🛡️
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30">
              {language === 'pt' ? 'Desafio Concluído!' : 'Challenge Completed!'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              {language === 'pt' ? 'Guardião Digital das Palavras-passe!' : 'Digital Password Guardian!'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Aprendeste a criar frases-passe longas e imprevisíveis, a nunca partilhar códigos SMS / 2FA com terceiros e a proteger a tua conta como um verdadeiro especialista em cibersegurança!'
                : 'You mastered passphrase generation, multi-factor codes defense, and password privacy!'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 font-black text-lg">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>+100 XP Ganho!</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveStage('builder');
                setCurrentDilemmaIdx(0);
                setSelectedDilemmaOpt(null);
                setDilemmaScores([]);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
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

