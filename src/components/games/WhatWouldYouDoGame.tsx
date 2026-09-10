import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, RefreshCw, ArrowRight, Award, HelpCircle, HeartHandshake, Eye, MessageSquare, Lock } from 'lucide-react';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface WhatWouldYouDoGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface DilemmaOption {
  id: string;
  text: { pt: string; en: string };
  verdict: 'safe' | 'danger' | 'caution';
  isBest: boolean;
  feedback: { pt: string; en: string };
  ruleBadge: { pt: string; en: string };
}

interface Dilemma {
  id: number;
  student: string;
  avatar: string;
  icon: string;
  tag: { pt: string; en: string };
  title: { pt: string; en: string };
  scenario: { pt: string; en: string };
  question: { pt: string; en: string };
  options: DilemmaOption[];
}

const DILEMMAS: Dilemma[] = [
  {
    id: 1,
    student: 'Gonçalo & Vasco',
    avatar: '👦',
    icon: '📸',
    tag: { pt: 'Respeito & Cyberbullying', en: 'Respect & Cyberbullying' },
    title: { pt: 'A Foto Embaraçosa no Chat', en: 'The Embarrassing Chat Photo' },
    scenario: {
      pt: 'No intervalo, um colega tropeçou na mochila e caiu de forma aparatosa. Outro aluno tirou logo uma fotografia com o telemóvel e partilhou-a no grupo de conversação da turma com emojis de gargalhadas a gozar com a queda.',
      en: 'During break, a student tripped over a backpack and fell awkwardly. Another student immediately took a photo and posted it to the class group chat with laughing emojis to mock the fall.',
    },
    question: {
      pt: 'Como deves agir perante esta publicação para proteger o teu colega?',
      en: 'How should you react to this post to protect your classmate?',
    },
    options: [
      {
        id: 'opt1_best',
        text: {
          pt: 'Não partilhar, dizer com calma no grupo que isso magoa o colega e apoiar o aluno afetado.',
          en: 'Do not forward it, calmly state in the chat that this is hurtful, and support the victim.',
        },
        verdict: 'safe',
        isBest: true,
        feedback: {
          pt: '✅ Atitude exemplar! Não ser cúmplice e defender quem precisa demonstra verdadeira cidadania, empatia digital e respeito pelos direitos de imagem dos colegas.',
          en: '✅ Exemplary attitude! Standing up against humiliation demonstrates true digital citizenship, empathy, and respect for privacy rights.',
        },
        ruleBadge: { pt: 'Cidadania: Não sejas cúmplice de humilhações', en: 'Citizenship: Never be a bystander to cruelty' },
      },
      {
        id: 'opt1_forward',
        text: {
          pt: 'Reencaminhar a foto para outros grupos de amigos para que todos se riam também.',
          en: 'Forward the picture to other friends so everyone can laugh too.',
        },
        verdict: 'danger',
        isBest: false,
        feedback: {
          pt: '❌ Muito prejudicial! Partilhar conteúdos humilhantes multiplica a dor da vítima e torna-te responsável por alimentar uma situação de cyberbullying.',
          en: '❌ Very harmful! Sharing humiliating media multiplies the victim pain and makes you an active accomplice in cyberbullying.',
        },
        ruleBadge: { pt: 'Atenção: Partilhar é perpetuar o cyberbullying', en: 'Warning: Sharing amplifies cyberbullying' },
      },
      {
        id: 'opt1_revenge',
        text: {
          pt: 'Tirar uma foto ao colega que publicou a imagem para te vingares e colocares no grupo.',
          en: 'Snap an embarrassing picture of the bully to seek revenge in the chat.',
        },
        verdict: 'danger',
        isBest: false,
        feedback: {
          pt: '❌ Errado! Responder à violência com vingança gera uma espiral de conflito tóxico na turma e não resolve o sofrimento de ninguém.',
          en: '❌ Wrong! Retaliating with revenge escalates a toxic conflict spiral without helping anyone.',
        },
        ruleBadge: { pt: 'Regra: A vingança agrava o problema', en: 'Rule: Revenge always escalates the issue' },
      },
    ],
  },
  {
    id: 2,
    student: 'Rodrigo & Tiago',
    avatar: '🧑',
    icon: '🔑',
    tag: { pt: 'Segurança & Credenciais', en: 'Security & Credentials' },
    title: { pt: 'Empréstimo da Palavra-Passe Pessoal', en: 'Lending Personal Passwords' },
    scenario: {
      pt: 'O Tiago esqueceu-se da sua palavra-passe da plataforma escolar e a aula de TIC está prestes a começar. Em pânico com a entrega do trabalho, pede ao seu melhor amigo Rodrigo: "Empresta-me a tua palavra-passe só por 10 minutos para eu entregar o trabalho!".',
      en: 'Tiago forgot his school portal password and ICT class is about to start. Panicking over submission, he asks Rodrigo: "Lend me your password just for 10 minutes so I can submit my work!".',
    },
    question: {
      pt: 'Qual é a resposta mais segura e responsável que o Rodrigo deve dar?',
      en: 'What is the safest, most responsible reply Rodrigo should give?',
    },
    options: [
      {
        id: 'opt2_best',
        text: {
          pt: 'Explicar com simpatia que a senha é estritamente pessoal e ajudar o amigo a falar com o professor ou técnico.',
          en: 'Kindly explain that passwords are strictly personal and help his friend contact the teacher or IT support.',
        },
        verdict: 'safe',
        isBest: true,
        feedback: {
          pt: '✅ Resposta perfeita! Ajudas o amigo pelo caminho correto e institucional, sem nunca comprometer a segurança e a integridade da tua conta pessoal.',
          en: '✅ Perfect answer! You help your friend through the proper school channel without compromising your account security.',
        },
        ruleBadge: { pt: 'Regra de Ouro: Palavras-passe são intransmissíveis', en: 'Golden Rule: Passwords are non-transferable' },
      },
      {
        id: 'opt2_lend',
        text: {
          pt: 'Dar a palavra-passe ao amigo, afinal são melhores amigos de infância e confiam um no outro.',
          en: 'Give him the password, since they are childhood best friends with complete trust.',
        },
        verdict: 'danger',
        isBest: false,
        feedback: {
          pt: '❌ Não deves! A tua palavra-passe é a tua identidade digital. Qualquer ação realizada com ela fica associada ao teu nome na escola, podendo trazer problemas graves.',
          en: '❌ You shouldn\'t! Your password represents your digital identity. Any action done through it is recorded under your name.',
        },
        ruleBadge: { pt: 'Aviso: A tua conta é a tua responsabilidade', en: 'Warning: You are accountable for your account' },
      },
      {
        id: 'opt2_trade',
        text: {
          pt: 'Cobrar-lhe dinheiro, lanches ou cartas de jogo em troca de partilhar a senha.',
          en: 'Charge him money, snacks, or trading cards in exchange for the password.',
        },
        verdict: 'danger',
        isBest: false,
        feedback: {
          pt: '❌ Desonesto e perigoso! A segurança digital e a proteção de dados nunca devem ser moedas de troca.',
          en: '❌ Dishonest and dangerous! Digital security and privacy must never be bargained away.',
        },
        ruleBadge: { pt: 'Ética Digital: Nunca negociar segurança', en: 'Digital Ethics: Never bargain security' },
      },
    ],
  },
  {
    id: 3,
    student: 'Marta',
    avatar: '👧',
    icon: '⚡',
    tag: { pt: 'Boatos & Correntes Digitais', en: 'Hoaxes & Digital Chains' },
    title: { pt: 'A Ameaça da Corrente de Mensagens', en: 'The Chain Message Threat' },
    scenario: {
      pt: 'A Marta recebeu uma notificação urgente no chat: "⚠️ AVISO MÁXIMO: Envia esta mensagem a 15 contactos nos próximos 10 minutos ou o teu telemóvel será bloqueado para sempre e perderás todas as tuas fotografias!".',
      en: 'Marta received an urgent popup in chat: "⚠️ MAXIMUM WARNING: Forward this message to 15 contacts in 10 minutes or your phone will be permanently locked and all your photos deleted!".',
    },
    question: {
      pt: 'O que deve a Marta fazer para lidar com esta situação com calma?',
      en: 'What should Marta do to handle this calmly?',
    },
    options: [
      {
        id: 'opt3_best',
        text: {
          pt: 'Apagar a mensagem com calma, não reencaminhar para ninguém e avisar os pais/professores se tiver dúvidas.',
          en: 'Calmly delete the message, do not forward it to anyone, and check with parents/teachers if in doubt.',
        },
        verdict: 'safe',
        isBest: true,
        feedback: {
          pt: '✅ Brilhante! As correntes de mensagens são boatos (hoaxes) criados para gerar medo, espalhar spam e saturar redes. Ao não partilhar, quebras o ciclo!',
          en: '✅ Brilliant! Chain messages are hoaxes designed to induce panic and spread spam. By ignoring them, you stop the misinformation chain!',
        },
        ruleBadge: { pt: 'Segurança: Quebra sempre as correntes de boatos', en: 'Security: Always break the hoax chain' },
      },
      {
        id: 'opt3_forward',
        text: {
          pt: 'Reencaminhar rapidamente para 15 colegas com receio de que o telemóvel avarie de verdade.',
          en: 'Quickly forward to 15 classmates out of fear that the phone will really crash.',
        },
        verdict: 'danger',
        isBest: false,
        feedback: {
          pt: '❌ Incorreto! Nenhuma mensagem de texto tem o poder de avariar o telemóvel por não ser reencaminhada. Apenas vais assustar os teus colegas.',
          en: '❌ Incorrect! No text message can harm hardware simply because it was not forwarded. You will only cause panic among friends.',
        },
        ruleBadge: { pt: 'Alerta: Não cedas ao medo irracional', en: 'Alert: Do not yield to fabricated panic' },
      },
    ],
  },
  {
    id: 4,
    student: 'Beatriz',
    avatar: '👩',
    icon: '📝',
    tag: { pt: 'Honestidade & Direitos de Autor', en: 'Integrity & Copyright' },
    title: { pt: 'O Trabalho Escolar e o Copiar-Colar', en: 'The School Report & Copy-Paste' },
    scenario: {
      pt: 'A Beatriz está a preparar um trabalho de TIC sobre "A História da Internet". Ao pesquisar, encontra uma página da Wikipédia com resumos fantásticos que respondem a todas as perguntas do guião do professor.',
      en: 'Beatriz is preparing an ICT report on "The History of the Internet". During research, she finds a Wikipedia article with great summaries answering all the teacher prompt questions.',
    },
    question: {
      pt: 'Qual é o procedimento ético e académico correto que a Beatriz deve seguir?',
      en: 'What is the ethical, correct academic procedure Beatriz must follow?',
    },
    options: [
      {
        id: 'opt4_best',
        text: {
          pt: 'Ler e compreender a matéria, redigir com as suas próprias palavras e citar a fonte no final do trabalho.',
          en: 'Read and comprehend the subject, write in her own words, and cite the source at the end.',
        },
        verdict: 'safe',
        isBest: true,
        feedback: {
          pt: '✅ Perfeito! A investigação escolar serve para aprenderes. Sintetizar ideias por palavras próprias e referenciar a origem é a marca da honestidade académica.',
          en: '✅ Perfect! Research is about learning. Summarizing ideas in your own words while citing sources is the core of academic integrity.',
        },
        ruleBadge: { pt: 'Rigor: Sintetiza e identifica sempre as fontes', en: 'Rigor: Summarize and always cite sources' },
      },
      {
        id: 'opt4_copy',
        text: {
          pt: 'Copiar e colar o texto completo diretamente para o documento sem dizer onde o foi buscar.',
          en: 'Copy and paste the entire text directly into the document without crediting where it came from.',
        },
        verdict: 'danger',
        isBest: false,
        feedback: {
          pt: '❌ Isso é plágio! Apresentar textos de outros autores como se fossem teus é desonesto, desrespeita os direitos de autor e resulta em má nota.',
          en: '❌ That is plagiarism! Claiming another author words as your own violates academic honesty and copyright rules.',
        },
        ruleBadge: { pt: 'Cuidado: Plágio desonra o teu trabalho', en: 'Warning: Plagiarism undermines your integrity' },
      },
    ],
  },
  {
    id: 5,
    student: 'André',
    avatar: '👦',
    icon: '🎮',
    tag: { pt: 'Privacidade em Jogos Online', en: 'Gaming Privacy' },
    title: { pt: 'O Estranho Amigável no Servidor do Jogo', en: 'The Friendly Stranger on Game Server' },
    scenario: {
      pt: 'O André está a jogar online e outro jogador elogia a sua jogabilidade: "És muito bom! Adorava enviar-te uma skin lendária de prenda. Diz-me a tua morada, a tua escola e o teu número de telemóvel para combinarmos!".',
      en: 'André is playing online when a stranger chats: "You are amazing! I want to gift you a legendary skin. Tell me your home address, school, and phone number to arrange it!".',
    },
    question: {
      pt: 'Qual é a resposta defensiva e correta para o André?',
      en: 'What is the safe and correct response for André?',
    },
    options: [
      {
        id: 'opt5_best',
        text: {
          pt: 'Nunca partilhar dados pessoais (morada, escola, telefone) com desconhecidos na rede e avisar um adulto.',
          en: 'Never share personal details (address, school, phone) with online strangers and alert a trusted adult.',
        },
        verdict: 'safe',
        isBest: true,
        feedback: {
          pt: '✅ Decisão corretíssima! Na Internet, pessoas com más intenções fingem ser amigos e prometem brindes para obter contactos e moradas de crianças. Mantém sempre a tua privacidade protegida.',
          en: '✅ Correct decision! Online strangers may offer prizes to harvest personal info from children. Always keep your private data safe.',
        },
        ruleBadge: { pt: 'Privacidade: Guarda os teus dados reais protegidos', en: 'Privacy: Keep real-world data private' },
      },
      {
        id: 'opt5_give',
        text: {
          pt: 'Dar a morada e o número de telemóvel rapidamente para não perder a oportunidade de ter a skin grátis.',
          en: 'Give the address and phone number quickly to not miss out on the free skin.',
        },
        verdict: 'danger',
        isBest: false,
        feedback: {
          pt: '❌ Extremamente perigoso! Partilhar dados da tua vida real (escola, casa, telefone) com desconhecidos põe em risco a tua segurança física e familiar.',
          en: '❌ Extremely dangerous! Sharing real-life data (home, school, phone) with strangers puts your personal safety at serious risk.',
        },
        ruleBadge: { pt: 'Perigo Máximo: Nunca dês morada a desconhecidos', en: 'Maximum Danger: Never share address with strangers' },
      },
    ],
  },
];

export const WhatWouldYouDoGame: React.FC<WhatWouldYouDoGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const t = translations[language];
  const dilemma = DILEMMAS[currentIndex];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (dilemma.options[idx].isBest) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < DILEMMAS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
      const totalScore = score + (dilemma.options[selectedOption || 0]?.isBest ? 1 : 0);
      const pct = Math.round((totalScore / DILEMMAS.length) * 100);
      onFinish(totalScore * 2, DILEMMAS.length * 2, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      {/* Header */}
      <div className="text-center mb-6 flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 4' : 'Challenge 4'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 flex items-center justify-center gap-2">
          <span>⚖️</span>
          <span>{language === 'pt' ? 'O que farias? — Dilemas de Cidadania Digital' : 'What would you do? — Digital Citizenship Dilemmas'}</span>
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto mb-3">
          {language === 'pt'
            ? 'Enfrenta situações reais do quotidiano escolar e online. Decide com ética, empatia e segurança!'
            : 'Confront real-life school and digital scenarios. Make ethical, empathetic, and safe decisions!'}
        </p>
        <AudioSpeakButton
          id="whatwouldyoudo-header"
          text={`${language === 'pt' ? 'O que farias? Dilemas de Cidadania Digital' : 'What would you do? Digital Citizenship Dilemmas'}. ${
            language === 'pt'
              ? 'Enfrenta situações reais do quotidiano escolar e online. Decide com ética, empatia e segurança!'
              : 'Confront real-life school and digital scenarios. Make ethical, empathetic, and safe decisions!'
          }`}
          language={language}
          label={language === 'pt' ? 'Ouvir Introdução' : 'Listen Intro'}
          variant="pill"
          size="sm"
        />
      </div>

      {!finished ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header tracker */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                {language === 'pt' ? `Cenário ${currentIndex + 1} de ${DILEMMAS.length}` : `Scenario ${currentIndex + 1} of ${DILEMMAS.length}`}
              </span>
            </span>
            <span className="text-emerald-700">
              {language === 'pt' ? `Decisões exemplares: ${score}` : `Exemplary choices: ${score}`}
            </span>
          </div>

          {/* Scenario Card */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-blue-50/40 p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{dilemma.avatar}</span>
                <div>
                  <span className="text-xs font-extrabold text-indigo-900 uppercase tracking-wide">
                    {dilemma.student}
                  </span>
                  <div className="text-[11px] font-semibold text-indigo-600">
                    {dilemma.tag[language]}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{dilemma.icon}</span>
                <AudioSpeakButton
                  id={`dilemma-card-${dilemma.id}`}
                  text={`${dilemma.title[language]}. ${dilemma.scenario[language]}. ${dilemma.question[language]}`}
                  language={language}
                  variant="icon"
                  size="sm"
                />
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 pt-1">
              {dilemma.title[language]}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/80 rounded-xl p-3.5 border border-indigo-100/70">
              {dilemma.scenario[language]}
            </p>

            <div className="pt-2 flex items-center justify-between gap-2 text-xs font-bold text-indigo-950">
              <div className="flex items-center gap-2 flex-1">
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{dilemma.question[language]}</span>
              </div>
              <AudioSpeakButton
                id={`dilemma-q-${dilemma.id}`}
                text={`${dilemma.question[language]}. ${dilemma.options.map((opt, i) => `Opção ${i + 1}: ${opt.text[language]}`).join('. ')}`}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {dilemma.options.map((opt, idx) => {
              let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 hover:border-slate-300';

              if (selectedOption !== null) {
                if (opt.isBest) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (selectedOption === idx) {
                  btnClass = 'border-rose-500 bg-rose-50 text-rose-950 font-semibold';
                } else {
                  btnClass = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <div className="space-y-1">
                    <span className="font-medium">{opt.text[language]}</span>
                  </div>
                  {selectedOption !== null && opt.isBest && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {selectedOption === idx && !opt.isBest && (
                    <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Pedagogical Justification */}
          {selectedOption !== null && (
            <div className="space-y-4 pt-2 animate-in fade-in">
              <div className={`p-4 rounded-2xl border ${
                dilemma.options[selectedOption].isBest 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    {dilemma.options[selectedOption].isBest ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'pt' ? 'Decisão Exemplar!' : 'Exemplary Choice!'}</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>{language === 'pt' ? 'Decisão Arriscada / Incorreta' : 'Risky / Incorrect Choice'}</span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {dilemma.options[selectedOption].feedback[language]}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{dilemma.options[selectedOption].ruleBadge[language]}</span>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {currentIndex + 1 < DILEMMAS.length
                    ? (language === 'pt' ? 'Próximo Dilema' : 'Next Dilemma')
                    : (language === 'pt' ? 'Concluir Desafio 🏆' : 'Finish Challenge 🏆')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm text-center space-y-4 animate-in zoom-in-95">
          <div className="text-5xl">🎖️</div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {language === 'pt' ? 'Dilemas de Cidadania Concluídos!' : 'Citizenship Dilemmas Completed!'}
          </h2>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            {language === 'pt'
              ? `Tomaste ${score} de ${DILEMMAS.length} decisões exemplares e éticas. Estás preparado para ser um cidadão digital consciente!`
              : `You made ${score} out of ${DILEMMAS.length} exemplary choices. You are ready to be a conscious digital citizen!`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm cursor-pointer"
            >
              {t.backToTheme}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

