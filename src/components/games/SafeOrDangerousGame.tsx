import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, RefreshCw, ArrowRight, Award, Lock, Eye, AlertCircle, HelpCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface SafeOrDangerousGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface InteractiveScenario {
  id: number;
  student: string;
  avatar: string;
  icon: string;
  tag: { pt: string; en: string };
  title: { pt: string; en: string };
  context: { pt: string; en: string };
  question: { pt: string; en: string };
  options: {
    id: string;
    text: { pt: string; en: string };
    verdict: 'safe' | 'danger' | 'caution';
    isCorrect: boolean;
    explanation: { pt: string; en: string };
    ruleBadge: { pt: string; en: string };
  }[];
}

const SCENARIOS: InteractiveScenario[] = [
  {
    id: 1,
    student: 'João',
    avatar: '👦',
    icon: '🎁',
    tag: { pt: 'Mensagens Estranhas & Phishing', en: 'Suspicious Messages & Phishing' },
    title: { pt: 'O Prémio Inesperado no Telemóvel', en: 'The Unexpected Phone Prize' },
    context: {
      pt: 'O João estava a jogar no telemóvel e apareceu uma janela a piscar com confetes: "PARABÉNS! Foste o visitante 1.000.000! Ganhaste um iPhone 16. Clica aqui nos próximos 2 minutos e escreve o teu número de telemóvel para receber em casa!".',
      en: 'João was playing a mobile game when a flashy banner popped up: "CONGRATULATIONS! You are visitor 1,000,000! You won an iPhone 16. Click within 2 minutes and enter your phone number to receive it!".',
    },
    question: {
      pt: 'Como deve o João agir para se proteger?',
      en: 'How should João act to stay safe?',
    },
    options: [
      {
        id: 'opt1_safe',
        text: {
          pt: 'Fechar imediatamente a janela sem clicar em links e avisar os pais/professores.',
          en: 'Close the popup immediately without clicking any link and tell parents/teachers.',
        },
        verdict: 'safe',
        isCorrect: true,
        explanation: {
          pt: 'Excelente! Prémios fáceis e urgentes na Internet são quase sempre tentativas de fraude (phishing) para roubar dados ou subscrever serviços pagos sem autorização.',
          en: 'Excellent! Urgent prizes on the web are almost always scams (phishing) designed to steal data or trigger paid subscriptions.',
        },
        ruleBadge: { pt: 'Regra de Ouro: Desconfia de ofertas milagrosas', en: 'Golden Rule: Distrust miraculous offers' },
      },
      {
        id: 'opt1_danger',
        text: {
          pt: 'Clicar rápido antes que o tempo de 2 minutos termine para não perder o telemóvel.',
          en: 'Click fast before the 2-minute timer expires so as not to miss the phone.',
        },
        verdict: 'danger',
        isCorrect: false,
        explanation: {
          pt: 'Perigoso! Os burlões usam contadores de tempo falsos para criar pânico e fazer as pessoas clicar sem pensar.',
          en: 'Dangerous! Scammers use fake countdowns to create urgency so victims click without thinking.',
        },
        ruleBadge: { pt: 'Cuidado: Contadores falsos de urgência', en: 'Warning: Fake urgency countdowns' },
      },
      {
        id: 'opt1_caution',
        text: {
          pt: 'Enviar o link para todos os amigos da turma para ver se algum deles também ganha.',
          en: 'Forward the link to all classmates to see if they can win too.',
        },
        verdict: 'danger',
        isCorrect: false,
        explanation: {
          pt: 'Muito perigoso! Ao partilhar links fraudulentos, estás a colocar em risco os teus amigos e a espalhar esquemas na escola.',
          en: 'Very dangerous! Forwarding scam links puts your peers at risk and spreads fraud in school.',
        },
        ruleBadge: { pt: 'Não espalhes correntes suspeitas', en: 'Do not spread suspicious chains' },
      },
    ],
  },
  {
    id: 2,
    student: 'Leonor',
    avatar: '👧',
    icon: '🔑',
    tag: { pt: 'Palavras-Passe & Acessos', en: 'Passwords & Account Access' },
    title: { pt: 'A Mesma Chave para Todas as Portas', en: 'The Same Key for Every Door' },
    context: {
      pt: 'A Leonor adora simplificar e inventou a palavra-passe "leonor2014". Para não se esquecer de nada, usa exatamente a mesma senha no email da escola, no jogo Roblox, no TikTok e na plataforma de mensagens.',
      en: 'Leonor likes simplicity and came up with "leonor2014". To never forget, she uses this exact same password on school email, Roblox, TikTok, and chat.',
    },
    question: {
      pt: 'Qual é o risco desta prática e o que deve a Leonor mudar?',
      en: 'What is the risk of this habit and what should Leonor change?',
    },
    options: [
      {
        id: 'opt2_safe',
        text: {
          pt: 'Criar senhas diferentes para cada serviço importante (com letras, números e símbolos) e usar frases-passe.',
          en: 'Create unique passwords for each service (using letters, numbers, symbols) or strong passphrases.',
        },
        verdict: 'safe',
        isCorrect: true,
        explanation: {
          pt: 'Muito bem! Se um site sofrer um ataque ou fuga de dados, as outras contas da Leonor continuam 100% seguras porque têm senhas diferentes.',
          en: 'Well done! If one platform suffers a data breach, Leonor’s other accounts remain fully protected with unique passwords.',
        },
        ruleBadge: { pt: 'Regra: Senhas únicas e complexas', en: 'Rule: Unique complex passwords' },
      },
      {
        id: 'opt2_danger',
        text: {
          pt: 'Manter a mesma senha porque mudar de palavras-passe dá muito trabalho e não tem perigo.',
          en: 'Keep the same password because changing is tedious and poses no real danger.',
        },
        verdict: 'danger',
        isCorrect: false,
        explanation: {
          pt: 'Comportamento de risco! Se alguém descobrir a senha num jogo inseguro, ganha acesso imediato ao email escolar e às restantes contas.',
          en: 'Risky behavior! If someone discovers the password in an insecure game, they gain full access to school email and private accounts.',
        },
        ruleBadge: { pt: 'Efeito dominó em fugas de dados', en: 'Domino effect in security leaks' },
      },
    ],
  },
  {
    id: 3,
    student: 'Maria',
    avatar: '👧',
    icon: '👥',
    tag: { pt: 'Privacidade & Redes Sociais', en: 'Privacy & Social Networks' },
    title: { pt: 'O Pedido de Amizade de um Desconhecido', en: 'Stranger Friend Request' },
    context: {
      pt: 'A Maria recebeu um pedido de amizade no chat de um utilizador chamado "MegaGamer_Pro_2024", com foto de um desenho animado, a dizer: "Olá! Adiciona-me para jogarmos juntos. De que escola és e onde moras?".',
      en: 'Maria received a friend request from "MegaGamer_Pro_2024" with a cartoon profile photo: "Hi! Add me to play together. What school do you go to and where do you live?".',
    },
    question: {
      pt: 'Qual é a melhor decisão ética e de segurança para a Maria?',
      en: 'What is the best safety decision for Maria?',
    },
    options: [
      {
        id: 'opt3_safe',
        text: {
          pt: 'Recusar o pedido, não responder a perguntas pessoais e bloquear utilizadores desconhecidos.',
          en: 'Decline the request, do not disclose personal information, and block unknown users.',
        },
        verdict: 'safe',
        isCorrect: true,
        explanation: {
          pt: 'Decisão exemplar! Na Internet não sabemos quem está realmente do outro lado. Nunca deves partilhar o teu nome completo, escola ou morada com desconhecidos.',
          en: 'Exemplary decision! On the Internet we cannot verify who is behind an avatar. Never share school, address, or full name with strangers.',
        },
        ruleBadge: { pt: 'Privacidade: Protege os teus dados pessoais', en: 'Privacy: Protect your personal data' },
      },
      {
        id: 'opt3_danger',
        text: {
          pt: 'Dar o nome da escola e a rua de casa para ele ser simpático e oferecer itens no jogo.',
          en: 'Give school name and street address so he acts friendly and gives in-game items.',
        },
        verdict: 'danger',
        isCorrect: false,
        explanation: {
          pt: 'Extremamente perigoso! Desconhecidos podem usar dados de localização para colocar crianças em risco físico e digital.',
          en: 'Extremely dangerous! Strangers can use location details to put children at physical and online risk.',
        },
        ruleBadge: { pt: 'Perigo: Partilha de localização e morada', en: 'Danger: Sharing location and address' },
      },
    ],
  },
  {
    id: 4,
    student: 'Pedro',
    avatar: '👦',
    icon: '🔄',
    tag: { pt: 'Manutenção & Antivírus', en: 'Maintenance & Antivirus' },
    title: { pt: 'A Notificação de Atualização do Sistema', en: 'System Update Notification' },
    context: {
      pt: 'O computador do Pedro avisou: "Atualização de segurança disponível para o sistema operativo e navegador". O Pedro tem o hábito de reiniciar o computador e instalar sempre as correções oficiais.',
      en: 'Pedro’s computer notified: "Security patch available for operating system and browser". Pedro routinely restarts his device and applies official updates.',
    },
    question: {
      pt: 'Este hábito do Pedro é seguro ou perigoso?',
      en: 'Is Pedro’s routine safe or dangerous?',
    },
    options: [
      {
        id: 'opt4_safe',
        text: {
          pt: 'Prática 100% Segura e Recomendada! As atualizações corrigem falhas de segurança e protegem contra novos vírus.',
          en: '100% Safe and Recommended Practice! Updates seal security holes and protect against new malware.',
        },
        verdict: 'safe',
        isCorrect: true,
        explanation: {
          pt: 'Exato! Os criadores de sistemas descobrem falhas e criam "vacinas" (patches). Manter os programas atualizados é a primeira barreira contra vírus.',
          en: 'Exactly! Software developers discover vulnerabilities and issue patches. Keeping devices updated is the first defense against malware.',
        },
        ruleBadge: { pt: 'Boa Prática: Dispositivos sempre atualizados', en: 'Good Practice: Always update devices' },
      },
      {
        id: 'opt4_danger',
        text: {
          pt: 'Prática Perigosa! Devemos adiar as atualizações para sempre porque só servem para gastar espaço.',
          en: 'Dangerous Practice! We should postpone updates forever because they just take disk space.',
        },
        verdict: 'danger',
        isCorrect: false,
        explanation: {
          pt: 'Incorreto! Sistemas desatualizados ficam vulneráveis a ataques automáticos conhecidos.',
          en: 'Incorrect! Outdated systems stay vulnerable to known automated cyberattacks.',
        },
        ruleBadge: { pt: 'Atenção: Não ignores atualizações', en: 'Caution: Do not ignore updates' },
      },
    ],
  },
  {
    id: 5,
    student: 'Rita',
    avatar: '👧',
    icon: '💾',
    tag: { pt: 'Downloads & Software Malicioso', en: 'Downloads & Malware' },
    title: { pt: 'O Jogo Pago que Estava "Grátis" num Site Desconhecido', en: 'The Paid Game Found "Free" on a Shady Site' },
    context: {
      pt: 'A Rita queria muito um jogo de computador que custa 20€. Encontrou um site cheio de anúncios a dizer: "Descarrega aqui a versão completa grátis! Clica em DOWNLOAD_AGORA.exe".',
      en: 'Rita really wanted a €20 PC game. She found an ad-heavy site claiming: "Download full version for free! Click DOWNLOAD_NOW.exe".',
    },
    question: {
      pt: 'Qual é o perigo real ao descarregar este ficheiro?',
      en: 'What is the real hazard when downloading this file?',
    },
    options: [
      {
        id: 'opt5_safe',
        text: {
          pt: 'É um ficheiro muito perigoso: pode conter vírus, cavalos de troia ou ransomware que bloqueia o computador e rouba ficheiros.',
          en: 'It is a dangerous file: it could contain trojans, spyware, or ransomware that locks the PC and steals data.',
        },
        verdict: 'safe',
        isCorrect: true,
        explanation: {
          pt: 'Correto! Ficheiros .exe de origens não oficiais muitas vezes disfarçam vírus perigosos. Deves utilizar apenas lojas oficiais e autorizadas pelos teus pais.',
          en: 'Correct! Unofficial .exe files frequently conceal destructive malware. Use only verified stores authorized by parents.',
        },
        ruleBadge: { pt: 'Segurança: Descarrega apenas de fontes oficiais', en: 'Safety: Download only from official stores' },
      },
      {
        id: 'opt5_danger',
        text: {
          pt: 'Não há qualquer perigo se o antivírus não apitar logo no primeiro segundo.',
          en: 'There is zero danger as long as the antivirus does not immediately beep.',
        },
        verdict: 'danger',
        isCorrect: false,
        explanation: {
          pt: 'Falso! Muitos programas maliciosos novos conseguem passar despercebidos aos antivírus gratuitos nos primeiros dias.',
          en: 'False! New malware variants can bypass basic antivirus detection initially.',
        },
        ruleBadge: { pt: 'Cuidado com pirataria e ficheiros executáveis', en: 'Beware of pirated executable files' },
      },
    ],
  },
  {
    id: 6,
    student: 'Tiago',
    avatar: '👦',
    icon: '🛡️',
    tag: { pt: 'Cibersegurança & Engenharia Social', en: 'Cybersecurity & Social Engineering' },
    title: { pt: 'O Código de Verificação por SMS', en: 'The SMS Verification Code' },
    context: {
      pt: 'O Tiago recebeu um SMS com um código de 6 dígitos: "O teu código de segurança é 492015". Segundos depois, um amigo virtual no WhatsApp disse: "Enganei-me a meter o número e o meu código foi para o teu telemóvel! Diz-me rápido o código sff!".',
      en: 'Tiago received an SMS with a 6-digit code: "Your security code is 492015". Seconds later, an online gaming buddy messaged: "I misstyped my number and my code went to your phone! Send me the code quick please!".',
    },
    question: {
      pt: 'O que está a acontecer e o que deve o Tiago fazer?',
      en: 'What is happening and what should Tiago do?',
    },
    options: [
      {
        id: 'opt6_safe',
        text: {
          pt: 'Nunca partilhar o código! Estão a tentar roubar a conta do Tiago (autenticação de 2 fatores).',
          en: 'Never share the code! Someone is attempting to hijack Tiago’s account (two-factor authentication).',
        },
        verdict: 'safe',
        isCorrect: true,
        explanation: {
          pt: 'Brilhante! Os códigos SMS de verificação são pessoais e confidenciais. Alguém estava a tentar aceder à conta do Tiago e precisava daquele código para concluir o roubo!',
          en: 'Brilliant! Verification SMS codes are strictly confidential. Someone was attempting to log into Tiago’s account and needed that code to finalize the takeover!',
        },
        ruleBadge: { pt: 'Regra Máxima: Códigos de SMS nunca se partilham', en: 'Top Rule: Never share SMS security codes' },
      },
      {
        id: 'opt6_danger',
        text: {
          pt: 'Enviar o código imediatamente para ajudar o amigo simpático no jogo.',
          en: 'Send the code immediately to help the friendly gaming buddy.',
        },
        verdict: 'danger',
        isCorrect: false,
        explanation: {
          pt: 'Erro grave! Ao dar o código, entregas o controlo total da tua conta e serás expulso dela imediatamente.',
          en: 'Severe mistake! Giving that code hands over complete ownership of your account and locks you out.',
        },
        ruleBadge: { pt: 'Perigo de roubo de conta', en: 'Account takeover risk' },
      },
    ],
  },
];

export const SafeOrDangerousGame: React.FC<SafeOrDangerousGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answersRecord, setAnswersRecord] = useState<Record<number, boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const t = translations[language];
  const currentScenario = SCENARIOS[currentIndex];
  const selectedOpt = currentScenario.options.find((o) => o.id === selectedOptionId);

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    const opt = currentScenario.options.find((o) => o.id === optionId);
    if (!opt) return;

    setSelectedOptionId(optionId);
    setAnswersRecord((prev) => ({ ...prev, [currentScenario.id]: opt.isCorrect }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOptionId(null);

    if (currentIndex + 1 < SCENARIOS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
      const correctCount = Object.values(answersRecord).filter(Boolean).length;
      const percentage = Math.round((correctCount / SCENARIOS.length) * 100);
      const score = correctCount * 15;
      const maxScore = SCENARIOS.length * 15;
      onFinish(score, maxScore, percentage);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswersRecord({});
    setShowFeedback(false);
    setGameOver(false);
  };

  const correctCount = Object.values(answersRecord).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      {/* Header with Game Character & Theme */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-[2rem] text-white p-6 sm:p-8 shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-emerald-300 backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>{language === 'pt' ? 'Laboratório de Cibersegurança • Tema 2' : 'Cybersecurity Lab • Topic 2'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            🛡️ {language === 'pt' ? 'Seguro ou Perigoso? — Diagnóstico de Riscos' : 'Safe or Dangerous? — Risk Diagnosis'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl font-medium leading-relaxed">
            {language === 'pt'
              ? 'Analisa 6 situações reais enfrentadas por alunos do 5.º ano. Descobre as armadilhas digitais e aprende a tomar decisões seguras no dia a dia!'
              : 'Evaluate 6 real dilemmas faced by 5th graders. Uncover digital traps and learn to make safe choices in daily online life!'}
          </p>
        </div>
      </div>

      {!gameOver ? (
        <div className="bg-white rounded-[2rem] border-2 border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between text-xs font-black text-slate-500 pb-3 border-b border-slate-100">
            <span className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                {language === 'pt' ? `Caso ${currentIndex + 1} de ${SCENARIOS.length}` : `Case ${currentIndex + 1} of ${SCENARIOS.length}`}
              </span>
              <span className="hidden sm:inline text-slate-400 font-semibold">• {currentScenario.tag[language]}</span>
            </span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{correctCount} {language === 'pt' ? 'Acertos' : 'Correct'}</span>
            </span>
          </div>

          {/* Scenario Case Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border-2 border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-xl shrink-0">
                  {currentScenario.avatar}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {language === 'pt' ? 'Situação de' : 'Scenario of'} {currentScenario.student}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                    {currentScenario.title[language]}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentScenario.icon}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed pt-1">
              "{currentScenario.context[language]}"
            </p>
          </div>

          {/* Question Banner */}
          <div className="flex items-center justify-between gap-2.5 text-slate-900 font-black text-sm sm:text-base">
            <div className="flex items-start gap-2.5 flex-1">
              <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <span>{currentScenario.question[language]}</span>
            </div>
          </div>

          {/* Action Options */}
          <div className="space-y-3">
            {currentScenario.options.map((opt, optIndex) => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-800';

              if (showFeedback) {
                if (opt.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (isSelected) {
                  btnClass = 'border-rose-400 bg-rose-50/90 text-rose-950 font-bold ring-2 ring-rose-300';
                } else {
                  btnClass = 'border-slate-200 bg-slate-100/60 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={showFeedback}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 cursor-pointer shadow-2xs ${btnClass}`}
                >
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-semibold block leading-relaxed">
                      {opt.text[language]}
                    </span>
                    {showFeedback && (
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-slate-200 text-slate-600">
                        {opt.ruleBadge[language]}
                      </span>
                    )}
                  </div>

                  {showFeedback && (
                    opt.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    ) : null
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation & Next */}
          {showFeedback && selectedOpt && (
            <div className="space-y-4 pt-2 animate-in fade-in">
              <div
                className={`p-4 sm:p-5 rounded-2xl border-2 ${
                  selectedOpt.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 font-black text-sm">
                    {selectedOpt.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>{language === 'pt' ? 'Decisão Exemplar!' : 'Exemplary Choice!'}</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                        <span>{language === 'pt' ? 'Atenção ao Risco:' : 'Caution - Potential Risk:'}</span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed font-medium">
                  {selectedOpt.explanation[language]}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>
                  {currentIndex + 1 < SCENARIOS.length
                    ? (language === 'pt' ? 'Próximo Caso de Estudo →' : 'Next Case Study →')
                    : (language === 'pt' ? 'Concluir Laboratório de Segurança 🏆' : 'Finish Security Lab 🏆')}
                </span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-[2.5rem] bg-white border-2 border-emerald-200 p-8 shadow-xl text-center space-y-5 animate-in zoom-in-95">
          <div className="text-6xl animate-bounce">🛡️</div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'pt' ? 'Laboratório de Segurança Concluído!' : 'Security Lab Completed!'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              {language === 'pt'
                ? `Analisaste todos os 6 casos e tomaste ${correctCount} decisões de segurança perfeitas (${Math.round((correctCount / SCENARIOS.length) * 100)}%).`
                : `You evaluated all 6 cases and made ${correctCount} perfect safety decisions (${Math.round((correctCount / SCENARIOS.length) * 100)}%).`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 inline-block text-left text-xs text-emerald-900 space-y-1">
            <p className="font-bold">🔑 {language === 'pt' ? 'Resumo de Cibersegurança do 5.º Ano:' : '5th Grade Cybersecurity Summary:'}</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>{language === 'pt' ? 'Nunca partilhar dados pessoais ou palavras-passe com desconhecidos.' : 'Never disclose personal info or passwords.'}</li>
              <li>{language === 'pt' ? 'Desconfiar sempre de prémios fáceis e códigos de verificação por SMS.' : 'Distrust free gifts and SMS codes.'}</li>
              <li>{language === 'pt' ? 'Manter os aparelhos atualizados e descarregar apenas de fontes oficiais.' : 'Keep systems updated and use verified stores.'}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm cursor-pointer shadow-md"
            >
              {t.backToTheme}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

