import React, { useState } from 'react';
import { UserX, ShieldAlert, CheckCircle2, UserCheck, AlertTriangle, Sparkles, RotateCcw, Flag, Award } from 'lucide-react';
import { Language } from '../types';
import { AudioSpeakButton } from './AudioSpeakButton';
import confetti from 'canvas-confetti';

interface SocialMediaPrivacyLabProps {
  language?: Language;
}

interface ProfileCase {
  id: string;
  username: string;
  displayName: string;
  badge: { pt: string; en: string };
  badgeColor: string;
  avatarIcon: string;
  avatarBg: string;
  createdTime: { pt: string; en: string };
  mutualFriends: { pt: string; en: string };
  message: { pt: string; en: string };
  clues: { pt: string[]; en: string[] };
  correctAction: 'reject_block' | 'accept' | 'report';
  explanation: {
    correct: { pt: string; en: string };
    incorrect: { pt: string; en: string };
  };
}

export const SocialMediaPrivacyLab: React.FC<SocialMediaPrivacyLabProps> = ({ language = 'pt' }) => {
  const [activeProfileIndex, setActiveProfileIndex] = useState<number>(0);
  const [decisions, setDecisions] = useState<Record<string, 'reject_block' | 'accept' | 'report'>>({});
  const [hasCelebratedAll, setHasCelebratedAll] = useState<boolean>(false);

  const profiles: ProfileCase[] = [
    {
      id: 'supergamer',
      username: 'SuperGamer_2026',
      displayName: 'SuperGamer 2026',
      badge: { pt: '⚠️ Contacto Desconhecido', en: '⚠️ Unknown Contact' },
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      avatarIcon: '👤❓',
      avatarBg: 'bg-slate-200 border-slate-300',
      createdTime: { pt: 'Criado há 2 dias', en: 'Created 2 days ago' },
      mutualFriends: { pt: '0 amigos em comum', en: '0 mutual friends' },
      message: {
        pt: 'Olá! Vi que jogas Roblox e Fortnite. Sou teu amigo da escola (mas não digo qual). Aceita-me e diz-me a tua morada e telefone para jogarmos juntos!',
        en: 'Hello! I saw you play Roblox. I am your school friend (won\'t say which). Accept me and tell me your address and phone number to play together!',
      },
      clues: {
        pt: ['Conta criada há apenas 2 dias', 'Nenhum amigo em comum', 'Recusa identificar-se claramente', 'Pede dados privados (morada e telefone)'],
        en: ['Account only 2 days old', 'Zero mutual friends', 'Refuses to identify clearly', 'Asks for private address and phone'],
      },
      correctAction: 'reject_block',
      explanation: {
        correct: {
          pt: 'Muito bem! Rejeitar e Bloquear é a atitude certa. Nunca reveles a tua morada nem aceites desconhecidos que não conheces na vida real!',
          en: 'Great job! Rejecting and Blocking is right. Never share your home address or accept strangers online!',
        },
        incorrect: {
          pt: 'Perigo elevado! Aceitar um desconhecido que pede a tua morada põe em risco a tua segurança física e privacidade.',
          en: 'High danger! Accepting a stranger asking for your address endangers your safety and privacy.',
        },
      },
    },
    {
      id: 'tia_marta',
      username: 'Tia_Marta_Oficial',
      displayName: 'Marta Ferreira (Tia)',
      badge: { pt: '💚 Familiar Conhecido', en: '💚 Known Family' },
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      avatarIcon: '👩‍🦰',
      avatarBg: 'bg-emerald-100 border-emerald-300',
      createdTime: { pt: 'Criado há 4 anos', en: 'Created 4 years ago' },
      mutualFriends: { pt: '14 amigos em comum (incluindo teus pais e primos)', en: '14 mutual friends (including parents and cousins)' },
      message: {
        pt: 'Olá querido/a! Criei conta nesta rede para ver as fotos das férias em família e as fotos da escola. Dá um beijinho enorme aos teus pais!',
        en: 'Hello dear! Created this account to see our family holiday and school photos. Give a big hug to your parents!',
      },
      clues: {
        pt: ['Familiar real e próximo', '14 amigos em comum (família direta)', 'Conta antiga e autêntica', 'Não pede palavras-passe nem dinheiro'],
        en: ['Real close family relative', '14 mutual family friends', 'Established authentic account', 'Does not ask for passwords or money'],
      },
      correctAction: 'accept',
      explanation: {
        correct: {
          pt: 'Excelente! Familiares e amigos próximos que conheces pessoalmente podem ser aceites com toda a segurança.',
          en: 'Excellent! Family members and close friends you personally know are safe to accept.',
        },
        incorrect: {
          pt: 'Atenção: A tua tia é um familiar direto com muitos amigos em comum na família. Podes aceitar com segurança.',
          en: 'Notice: Your aunt is direct family with many mutual family friends. It is safe to accept.',
        },
      },
    },
    {
      id: 'robux_bot',
      username: 'Robux_Free_Official_Bot',
      displayName: 'Robux & V-Bucks Grátis 2026',
      badge: { pt: '⛔ Bot / Tentativa de Burla', en: '⛔ Scam Bot / Phishing' },
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      avatarIcon: '🤖💎',
      avatarBg: 'bg-rose-100 border-rose-300',
      createdTime: { pt: 'Criado hoje • Segue 4.800 pessoas', en: 'Created today • Follows 4,800 people' },
      mutualFriends: { pt: '0 amigos em comum', en: '0 mutual friends' },
      message: {
        pt: 'PARABÉNS! Foste selecionado para ganhar 10.000 Robux grátis! Clica imediatamente no link "bit.ly/robux-gratis-2026" e coloca o teu login e password para receberes as moedas!',
        en: 'CONGRATULATIONS! You won 10,000 free Robux! Click "bit.ly/robux-free-2026" now and enter your login and password to receive coins!',
      },
      clues: {
        pt: ['Promessa de moedas virtuais grátis', 'Link encurtado e suspeito', 'Pede palavra-passe e login da conta', 'Segue milhares de pessoas aleatórias'],
        en: ['Free virtual currency promise', 'Suspicious shortened link', 'Asks for account login and password', 'Follows thousands of random users'],
      },
      correctAction: 'report',
      explanation: {
        correct: {
          pt: 'Decisão perfeita! Denunciar o perfil protege-te a ti e a outros jovens. Nenhum jogo oficial dá moedas grátis em troca de passwords!',
          en: 'Perfect decision! Reporting the bot protects you and other kids. Official games never give free coins for passwords!',
        },
        incorrect: {
          pt: 'Cuidado crítico! Clicar no link e colocar a tua password resultaria no roubo imediato da tua conta de jogo!',
          en: 'Critical danger! Clicking the link and entering your password would immediately steal your gaming account!',
        },
      },
    },
    {
      id: 'lucas_colega',
      username: 'Lucas_Colega_6B',
      displayName: 'Lucas Silva (Turma B)',
      badge: { pt: '🎒 Colega de Escola', en: '🎒 School Classmate' },
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      avatarIcon: '👦🎒',
      avatarBg: 'bg-blue-100 border-blue-300',
      createdTime: { pt: 'Criado há 1 ano', en: 'Created 1 year ago' },
      mutualFriends: { pt: '8 amigos em comum (colegas da tua escola)', en: '8 mutual friends (school classmates)' },
      message: {
        pt: 'Olá! Sou o Lucas da turma B. Esqueci-me de apontar os exercícios do trabalho de grupo de TIC para amanhã, podes dizer-me quais são as páginas do manual?',
        en: 'Hi! I am Lucas from class 6B. I forgot to write down the ICT homework pages for tomorrow, could you tell me which textbook pages?',
      },
      clues: {
        pt: ['Colega real conhecido na escola', '8 amigos em comum da mesma turma', 'Assunto escolar normal', 'Não pede dados confidenciais'],
        en: ['Real classmate known in school', '8 mutual classmates as friends', 'Normal school homework topic', 'Does not request confidential data'],
      },
      correctAction: 'accept',
      explanation: {
        correct: {
          pt: 'Muito bem! Colegas de turma reais conhecidos presencialmente na escola são contactos normais e seguros para partilha escolar.',
          en: 'Great! Real classmates known in person at school are safe and normal contacts for school discussions.',
        },
        incorrect: {
          pt: 'Não precisas de bloquear um colega real da tua turma que apenas pediu as páginas dos trabalhos de casa.',
          en: 'No need to block a real classmate who just asked for the homework pages.',
        },
      },
    },
    {
      id: 'famoso_impostor',
      username: 'GamerPro_Oficial_VIP',
      displayName: 'GamerPro YouTuber VIP ⭐',
      badge: { pt: '🎭 Perfil Impostor / Falso Famoso', en: '🎭 Impersonator / Fake Celebrity' },
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      avatarIcon: '⭐🎭',
      avatarBg: 'bg-purple-100 border-purple-300',
      createdTime: { pt: 'Criado há 1 semana • Não tem selo de verificação', en: 'Created 1 week ago • No verified badge' },
      mutualFriends: { pt: '1 amigo em comum', en: '1 mutual friend' },
      message: {
        pt: 'Olá meu super fã! Estou a fazer um passatempo secreto exclusivo só para ti. Envia-me uma foto do teu quarto e o número de telemóvel dos teus pais para ganhares um computador de gaming!',
        en: 'Hello my super fan! Secret giveaway just for you. Send me a photo of your bedroom and your parents\' phone numbers to win a gaming PC!',
      },
      clues: {
        pt: ['Não possui o selo azul de verificação oficial', 'Pede fotos íntimas do quarto', 'Pede contactos e dados dos pais', 'Usa a imagem de um famoso para atrair crianças'],
        en: ['Lacks official verified badge', 'Asks for bedroom photos', 'Requests parents\' phone numbers', 'Impersonates celebrity to lure kids'],
      },
      correctAction: 'reject_block',
      explanation: {
        correct: {
          pt: 'Parabéns pela atenção! Falsos perfis de celebridades sem selo oficial que pedem fotos ou dados dos pais são tentativas graves de burla. Bloquear e avisar os pais é o correto!',
          en: 'Well spotted! Fake celebrity accounts without verification badges asking for photos or parent numbers are dangerous scams. Blocking is correct!',
        },
        incorrect: {
          pt: 'Atenção: Os famosos verdadeiros nunca pedem fotos do quarto nem contactos dos pais em mensagens privadas!',
          en: 'Caution: Real celebrities never ask for bedroom photos or parental phone numbers in private DMs!',
        },
      },
    },
    {
      id: 'torneio_escroque',
      username: 'Torneio_Gamer_2026',
      displayName: 'Torneio Gaming PT 🏆',
      badge: { pt: '⚠️ Link Suspeito / Vírus', en: '⚠️ Suspicious Link / Virus' },
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      avatarIcon: '🎮☣️',
      avatarBg: 'bg-rose-100 border-rose-300',
      createdTime: { pt: 'Criado há 3 horas', en: 'Created 3 hours ago' },
      mutualFriends: { pt: '0 amigos em comum', en: '0 mutual friends' },
      message: {
        pt: 'Entra no torneio escolar de Brawl Stars com prémio de 500€! Para te inscreveres descarrega e abre o ficheiro "inscricao_torneio.exe" no teu computador.',
        en: 'Join the school tourney for a 500€ prize! Download and run "inscricao_torneio.exe" on your PC to register.',
      },
      clues: {
        pt: ['Pede para descarregar ficheiro .exe desconhecido', 'Conta criada há poucas horas', 'Zero amigos em comum', 'Promessa exagerada de dinheiro fácil'],
        en: ['Requests downloading unknown .exe file', 'Brand new account created hours ago', 'Zero mutual friends', 'Unrealistic easy money lure'],
      },
      correctAction: 'report',
      explanation: {
        correct: {
          pt: 'Excelente! Descarregar ficheiros executáveis (.exe) de desconhecidos instala vírus ou cavalos de Troia. Denunciar e bloquear é a defesa perfeita!',
          en: 'Superb! Downloading .exe files from strangers installs malware. Reporting and blocking is the right call!',
        },
        incorrect: {
          pt: 'Perigo extremo! Executar um ficheiro .exe de desconhecidos infeta o computador com vírus ou software espião.',
          en: 'Extreme danger! Running an unknown .exe infects your computer with viruses or spyware.',
        },
      },
    },
    {
      id: 'prima_mariana',
      username: 'Mariana_Costa_Prima',
      displayName: 'Mariana Costa (Prima)',
      badge: { pt: '💚 Familiar Conhecido', en: '💚 Known Family' },
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      avatarIcon: '👧🎒',
      avatarBg: 'bg-emerald-100 border-emerald-300',
      createdTime: { pt: 'Criado há 2 anos', en: 'Created 2 years ago' },
      mutualFriends: { pt: '11 amigos em comum (família e tios)', en: '11 mutual friends (family & uncles)' },
      message: {
        pt: 'Olá primo/a! Estou a combinar com os tios o almoço de aniversário de família no próximo domingo. Pede aos teus pais para confirmarem no grupo!',
        en: 'Hi cousin! Organizing Sunday family birthday lunch with our uncles. Ask your parents to confirm in our family chat!',
      },
      clues: {
        pt: ['Prima real que conheces bem', '11 amigos em comum na família', 'Conta autêntica com fotos de família', 'Não pede palavras-passe nem dados privados'],
        en: ['Real cousin you know well', '11 mutual family contacts', 'Authentic account with family history', 'Does not request passwords or secrets'],
      },
      correctAction: 'accept',
      explanation: {
        correct: {
          pt: 'Muito bem! Primos e familiares diretos que conheces no mundo real são contactos seguros para aceitares nas tuas redes!',
          en: 'Great job! Cousins and close family members you know in real life are safe to accept!',
        },
        incorrect: {
          pt: 'A Mariana é a tua prima com vários familiares em comum. Não precisas de rejeitar nem denunciar familiares reais.',
          en: 'Mariana is your cousin with verified family connections. No need to reject real relatives.',
        },
      },
    },
  ];

  const currentProfile = profiles[activeProfileIndex];
  const userDecision = decisions[currentProfile.id];
  const hasDecided = userDecision !== undefined;
  const isCorrect = hasDecided && (
    (currentProfile.correctAction === 'reject_block' && (userDecision === 'reject_block' || userDecision === 'report')) ||
    (currentProfile.correctAction === 'report' && (userDecision === 'report' || userDecision === 'reject_block')) ||
    (currentProfile.correctAction === userDecision)
  );

  const totalCorrect = profiles.filter((p) => {
    const d = decisions[p.id];
    if (!d) return false;
    if (p.correctAction === 'reject_block') return d === 'reject_block' || d === 'report';
    if (p.correctAction === 'report') return d === 'report' || d === 'reject_block';
    return d === p.correctAction;
  }).length;

  const handleDecision = (action: 'reject_block' | 'accept' | 'report') => {
    const nextDecisions = { ...decisions, [currentProfile.id]: action };
    setDecisions(nextDecisions);

    const isMatch = (
      (currentProfile.correctAction === 'reject_block' && (action === 'reject_block' || action === 'report')) ||
      (currentProfile.correctAction === 'report' && (action === 'report' || action === 'reject_block')) ||
      (currentProfile.correctAction === action)
    );

    if (isMatch) {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6'],
        });
      } catch {
        // safe fallback
      }
    }

    // Check if all completed
    const answeredCount = Object.keys(nextDecisions).length;
    if (answeredCount === profiles.length && !hasCelebratedAll) {
      setHasCelebratedAll(true);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // safe fallback
      }
    }
  };

  const resetAll = () => {
    setDecisions({});
    setActiveProfileIndex(0);
    setHasCelebratedAll(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-indigo-200/90 p-4 sm:p-6 shadow-md space-y-5 animate-in fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
            👥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {language === 'pt' ? 'Laboratório de Redes Sociais: Pedidos de Amizade Suspeitos' : 'Social Media Lab: Suspicious Friend Requests'}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                {language === 'pt' ? `${profiles.length} Casos Práticos` : `${profiles.length} Cases`}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Analisa os vários pedidos de amizade abaixo, investiga as pistas e escolhe a atitude mais segura!'
                : 'Inspect the friend requests below, examine the clues, and pick the safest response!'}
            </p>
          </div>
        </div>

        {/* Live Score Pill */}
        <div className="flex items-center gap-2 bg-indigo-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-indigo-300 text-xs text-white">
          <span className="text-indigo-200 font-bold">
            {language === 'pt' ? 'Acertos:' : 'Score:'}
          </span>
          <span className="font-black px-2 py-0.5 rounded-xl bg-indigo-500 text-white">
            {totalCorrect} / {profiles.length}
          </span>
        </div>
      </div>

      {/* Varied Profile Selection Tabs */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-bold">
          <span>{language === 'pt' ? 'Escolhe o pedido de amizade para analisar:' : 'Select a friend request to analyze:'}</span>
          <button
            type="button"
            onClick={resetAll}
            className="text-[11px] text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'pt' ? 'Reiniciar Todos' : 'Reset All'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {profiles.map((p, idx) => {
            const isCurrent = idx === activeProfileIndex;
            const hasAns = decisions[p.id] !== undefined;
            const isAnsCorrect = hasAns && (
              (p.correctAction === 'reject_block' && (decisions[p.id] === 'reject_block' || decisions[p.id] === 'report')) ||
              (p.correctAction === 'report' && (decisions[p.id] === 'report' || decisions[p.id] === 'reject_block')) ||
              (decisions[p.id] === p.correctAction)
            );

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProfileIndex(idx)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.02]'
                    : hasAns
                    ? isAnsCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                      : 'bg-rose-50 border-rose-300 text-rose-950 hover:bg-rose-100'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{p.avatarIcon}</span>
                  {hasAns && (
                    <span className="text-[11px]">
                      {isAnsCorrect ? '✓' : '✕'}
                    </span>
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className={`text-xs font-black truncate ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                    {idx + 1}. {p.displayName}
                  </div>
                  <div className={`text-[10px] truncate ${isCurrent ? 'text-indigo-200' : 'text-slate-500'}`}>
                    @{p.username}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Profile Inspection Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-indigo-200 shadow-sm p-4 sm:p-6 space-y-4">
        {/* Profile Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl ${currentProfile.avatarBg} flex items-center justify-center text-2xl shadow-inner shrink-0`}>
              {currentProfile.avatarIcon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-black text-base sm:text-lg text-slate-900">
                  {currentProfile.displayName}
                </h4>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${currentProfile.badgeColor}`}>
                  {currentProfile.badge[language]}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                @{currentProfile.username} • {currentProfile.createdTime[language]}
              </p>
              <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                👥 {currentProfile.mutualFriends[language]}
              </p>
            </div>
          </div>

          <AudioSpeakButton
            id={`social-profile-${currentProfile.id}`}
            text={`${currentProfile.displayName}. ${currentProfile.message[language]}`}
            language={language}
            label={language === 'pt' ? 'Ouvir Mensagem' : 'Listen Message'}
            variant="pill"
            size="xs"
          />
        </div>

        {/* Message Bubble */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900 block">
            💬 {language === 'pt' ? 'Mensagem do Pedido de Amizade:' : 'Request Message:'}
          </span>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed italic">
            "{currentProfile.message[language]}"
          </p>
        </div>

        {/* Clues to Inspect Box */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'pt' ? 'Pistas Detetive para Analisar:' : 'Clues to Investigate:'}</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentProfile.clues[language].map((clue, cIdx) => (
              <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-indigo-600 font-bold">🔍</span>
                <span>{clue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Decision Buttons */}
        <div className="space-y-3 pt-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 block text-center">
            {language === 'pt' ? 'Qual é a atitude correta para este pedido?' : 'What is the correct action for this request?'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Button 1: Rejeitar & Bloquear */}
            <button
              type="button"
              onClick={() => handleDecision('reject_block')}
              className={`p-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                userDecision === 'reject_block'
                  ? 'bg-rose-600 text-white ring-2 ring-rose-400 shadow-md'
                  : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-300'
              }`}
            >
              <UserX className="w-4 h-4 text-rose-600" />
              <span>{language === 'pt' ? 'Rejeitar & Bloquear' : 'Reject & Block'}</span>
            </button>

            {/* Button 2: Denunciar Perfil */}
            <button
              type="button"
              onClick={() => handleDecision('report')}
              className={`p-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                userDecision === 'report'
                  ? 'bg-amber-600 text-white ring-2 ring-amber-400 shadow-md'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <Flag className="w-4 h-4 text-amber-600" />
              <span>{language === 'pt' ? 'Denunciar Perfil' : 'Report Profile'}</span>
            </button>

            {/* Button 3: Aceitar Amizade */}
            <button
              type="button"
              onClick={() => handleDecision('accept')}
              className={`p-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                userDecision === 'accept'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-md'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'pt' ? 'Aceitar Amizade' : 'Accept Request'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Card */}
        {hasDecided && (
          <div className={`p-4 rounded-2xl border transition-all animate-in zoom-in-95 space-y-2 ${
            isCorrect
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/90 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>🏆 {language === 'pt' ? 'Decisão Perfeita!' : 'Great Decision!'}</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span>⚠️ {language === 'pt' ? 'Decisão Incorreta!' : 'Incorrect Decision!'}</span>
                  </>
                )}
              </div>

              <AudioSpeakButton
                id={`social-feedback-${currentProfile.id}`}
                text={isCorrect ? currentProfile.explanation.correct[language] : currentProfile.explanation.incorrect[language]}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              {isCorrect
                ? currentProfile.explanation.correct[language]
                : currentProfile.explanation.incorrect[language]}
            </p>

            {/* Quick Next Button */}
            {activeProfileIndex < profiles.length - 1 && (
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setActiveProfileIndex((prev) => prev + 1)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-colors cursor-pointer"
                >
                  {language === 'pt' ? 'Próximo Pedido →' : 'Next Request →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Completion Trophy Card */}
      {hasCelebratedAll && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white shadow-lg flex items-center gap-4 animate-in zoom-in-95">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0">
            <Award className="w-7 h-7 text-amber-300" />
          </div>
          <div className="flex-1 space-y-0.5">
            <span className="font-extrabold text-sm sm:text-base block">
              ⭐ {language === 'pt' ? 'Parabéns! Completaste a Análise dos 5 Pedidos!' : 'Awesome! All 5 Profiles Analyzed!'}
            </span>
            <p className="text-xs text-indigo-100 font-medium">
              {language === 'pt'
                ? `Acertaste em ${totalCorrect} de ${profiles.length} situações. Agora já sabes distinguir perfis reais de familiares e colegas de contas falsas e perigosas!`
                : `You scored ${totalCorrect} out of ${profiles.length}. You can now spot fake contacts and protect your privacy!`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
