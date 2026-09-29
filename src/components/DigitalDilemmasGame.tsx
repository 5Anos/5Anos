import React, { useState } from 'react';
import {
  ShieldCheck,
  Heart,
  Users,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { Language, User } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { speechService } from '../utils/speech';
import { ticoFeedback } from '../utils/ticoEvents';

interface DigitalDilemmasGameProps {
  language?: Language;
  currentUser?: User | null;
  onFinish?: (pointsEarned: number) => void;
}

interface Scenario {
  id: string;
  title: { pt: string; en: string };
  badge: { pt: string; en: string };
  icon: string;
  situation: { pt: string; en: string };
  options: {
    text: { pt: string; en: string };
    isBest: boolean;
    feedback: { pt: string; en: string };
    empathyPoints: number;
  }[];
  lesson: { pt: string; en: string };
}

const DILEMMAS: Scenario[] = [
  {
    id: 'dilemma-whatsapp-photo',
    title: {
      pt: 'A Foto Engraçada no Grupo de WhatsApp',
      en: 'The Funny Photo in the WhatsApp Group',
    },
    badge: { pt: 'Privacidade & Respeito', en: 'Privacy & Respect' },
    icon: '📱',
    situation: {
      pt: 'Um colega da tua turma partilhou uma fotografia tua a fazer uma careta num grupo de WhatsApp com 25 pessoas, sem a tua autorização. Outros colegas começaram a rir-se e a criar figurinhas.',
      en: 'A classmate shared a photo of you making a silly face in a WhatsApp group with 25 people without your permission. Other classmates started laughing and making stickers.',
    },
    options: [
      {
        text: {
          pt: 'Publicar imediatamente uma foto embaraçosa desse colega para te vingares no grupo.',
          en: 'Immediately post an embarrassing picture of that classmate in revenge.',
        },
        isBest: false,
        feedback: {
          pt: 'A vingança apenas cria mais conflito e cyberbullying no grupo. Dois erros não fazem um acerto.',
          en: 'Revenge only escalates conflict and cyberbullying. Two wrongs do not make a right.',
        },
        empathyPoints: 0,
      },
      {
        text: {
          pt: 'Falar em privado com o colega com calma, pedir para apagar a foto e, se não resultar, falar com os pais ou o professor.',
          en: 'Talk privately and calmly to the classmate, ask them to delete it, and talk to parents or teacher if needed.',
        },
        isBest: true,
        feedback: {
          pt: 'Excelente decisão! A resolução madura em privado evita discussões públicas e protege a tua privacidade.',
          en: 'Excellent choice! Mature private resolution prevents drama and defends your privacy.',
        },
        empathyPoints: 20,
      },
      {
        text: {
          pt: 'Guardar o segredo, ficar triste em silêncio e não contar a nenhum adulto de confiança.',
          en: 'Keep it secret, stay sad in silence, and not tell any trusted adult.',
        },
        isBest: false,
        feedback: {
          pt: 'Nunca deves sofrer em silêncio! Os teus pais e professores estão cá sempre para te apoiar e resolver a situação.',
          en: 'Never suffer in silence! Your parents and teachers are always here to support and resolve this.',
        },
        empathyPoints: 5,
      },
    ],
    lesson: {
      pt: 'Regra de Ouro: A imagem de cada pessoa é privada. Nunca partilhes fotos de outros sem a sua autorização explícita!',
      en: 'Golden Rule: Everyone has the right to their own image. Never share photos of others without explicit consent!',
    },
  },
  {
    id: 'dilemma-free-game-coins',
    title: {
      pt: 'A Promessa de Moedas Grátis no Jogo',
      en: 'The Free Game Coins Promise',
    },
    badge: { pt: 'Cibersegurança & Dados', en: 'Cybersecurity & Data' },
    icon: '🎮',
    situation: {
      pt: 'Estás a jogar o teu jogo favorito e aparece um anúncio colorido: "Ganha 10.000 moedas grátis! Basta introduzires o email, morada e telemóvel da tua mãe para receber o código".',
      en: 'You are playing your favorite game and a colorful banner pops up: "Get 10,000 free coins! Just type your mothers email, home address, and phone to receive the code".',
    },
    options: [
      {
        text: {
          pt: 'Preencher todos os dados rapidamente para garantir as moedas antes que a oferta acabe.',
          en: 'Quickly fill in all the data to grab the coins before the promo expires.',
        },
        isBest: false,
        feedback: {
          pt: 'Perigo! Isso é uma armadilha clássica para roubar dados da família e enviar faturas ou spam.',
          en: 'Danger! This is a classic scam designed to steal family data and send spam or charges.',
        },
        empathyPoints: 0,
      },
      {
        text: {
          pt: 'Fechar a página imediatamente e avisar os teus pais ou professor sobre o anúncio suspeito.',
          en: 'Close the page immediately and inform your parents or teacher about the suspicious ad.',
        },
        isBest: true,
        feedback: {
          pt: 'Perfeito! Se uma oferta parece boa demais para ser verdade, é quase sempre uma fraude. Proteger os dados da família é prioritário!',
          en: 'Spot on! If an offer sounds too good to be true, it is almost always a scam. Protecting family data comes first!',
        },
        empathyPoints: 20,
      },
      {
        text: {
          pt: 'Inventar um número de telemóvel falso mas colocar a tua morada verdadeira.',
          en: 'Invent a fake phone number but put in your real home address.',
        },
        isBest: false,
        feedback: {
          pt: 'Nunca partilhes a tua morada real na Internet com websites desconhecidos!',
          en: 'Never share your real home address on the internet with unknown websites!',
        },
        empathyPoints: 5,
      },
    ],
    lesson: {
      pt: 'Moedas grátis não existem na Internet: dados pessoais valem ouro para os burlões!',
      en: 'Free coins do not exist on the web: your personal data is gold to scammers!',
    },
  },
  {
    id: 'dilemma-mysterious-friend',
    title: {
      pt: 'O Pedido de Amizade Misterioso',
      en: 'The Mysterious Friend Request',
    },
    badge: { pt: 'Segurança Social', en: 'Social Safety' },
    icon: '👤',
    situation: {
      pt: 'Recebeste um pedido de amizade numa rede ou jogo online de alguém com o perfil "Tiago_5Ano_Escola". Ele diz que anda na tua escola mas não tem foto real, e pede o teu número pessoal de WhatsApp.',
      en: 'You received a friend request online from someone with the handle "Tiago_5thGrade_School". He says he goes to your school but has no photo, and asks for your private WhatsApp.',
    },
    options: [
      {
        text: {
          pt: 'Dar o teu número porque ele diz que é do 5.º ano e estuda na mesma escola.',
          en: 'Give your number because he says he is in the 5th grade and attends the same school.',
        },
        isBest: false,
        feedback: {
          pt: 'Atenção: Na Internet qualquer pessoa pode criar um perfil falso e fingir ser uma criança.',
          en: 'Careful: Anyone online can create a fake profile and pretend to be a child.',
        },
        empathyPoints: 0,
      },
      {
        text: {
          pt: 'Não partilhar o teu contacto, verificar pessoalmente na escola com os teus amigos se o conhecem e recusar o pedido se for desconhecido.',
          en: 'Do not share your number, check in person at school if friends know him, and decline if unknown.',
        },
        isBest: true,
        feedback: {
          pt: 'Excelente prudência digital! Amigos online só devem ser pessoas que conheces verdadeiramente no mundo real.',
          en: 'Outstanding digital prudence! Online friends should only be people you actually know in real life.',
        },
        empathyPoints: 20,
      },
      {
        text: {
          pt: 'Marcar um encontro sozinho no recreio ou à saída do portão sem avisar nenhum professor.',
          en: 'Set up a meetup alone during recess or outside the school gate without telling any teacher.',
        },
        isBest: false,
        feedback: {
          pt: 'Muito perigoso! Nunca combines encontros com pessoas conhecidas na Internet sem a presença e autorização dos teus pais.',
          en: 'Very dangerous! Never arrange meetups with online contacts without parents presence.',
        },
        empathyPoints: 0,
      },
    ],
    lesson: {
      pt: 'Um perfil simpático não garante uma pessoa real. Nunca partilhes contactos privados com estranhos!',
      en: 'A friendly profile does not guarantee a real friend. Keep private contacts strictly private!',
    },
  },
  {
    id: 'dilemma-group-exclusion',
    title: {
      pt: 'A Exclusão de um Colega no Chat',
      en: 'Classmate Exclusion in Chat',
    },
    badge: { pt: 'Netiqueta & Empatia', en: 'Netiquette & Empathy' },
    icon: '🤝',
    situation: {
      pt: 'No grupo da turma, dois colegas começam a gozar com outro que teve negativa no teste de Matemática e criam um grupo à parte excluindo-o de propósito.',
      en: 'In the class group, two classmates start teasing another student who got a bad grade in Math, creating a separate group to intentionally exclude them.',
    },
    options: [
      {
        text: {
          pt: 'Rir-te e enviar emojis a apoiar a brincadeira para seres popular no grupo.',
          en: 'Laugh and send emojis cheering the joke to be popular in the group.',
        },
        isBest: false,
        feedback: {
          pt: 'Isso é cyberbullying e magoa profundamente o colega. Ser cúmplice nunca é uma atitude de líder.',
          en: 'This is cyberbullying and deeply hurts your classmate. Complicity is never leadership.',
        },
        empathyPoints: 0,
      },
      {
        text: {
          pt: 'Não apoiar a troça, defender o colega no grupo dizendo que notas baixas acontecem a todos, e enviar-lhe uma mensagem privada de apoio.',
          en: 'Do not join in, defend your classmate by saying bad grades happen to everyone, and send them a private message of support.',
        },
        isBest: true,
        feedback: {
          pt: 'Verdadeiro Ciber-Herói! Tuviste coragem de defender a justiça e mostrar empatia. É assim que construímos uma turma unida!',
          en: 'True Cyber-Hero! You showed courage to stand for kindness and empathy. That is how we build great classmates!',
        },
        empathyPoints: 20,
      },
      {
        text: {
          pt: 'Sair do grupo sem dizer nada e fingir que nada aconteceu.',
          en: 'Leave the group without saying anything and pretend nothing happened.',
        },
        isBest: false,
        feedback: {
          pt: 'Sair evita a tua participação, mas avisar com respeito ou falar com o professor ajuda a proteger quem está a sofrer.',
          en: 'Leaving stops your participation, but speaking up kindly or alerting a teacher helps protect the victim.',
        },
        empathyPoints: 10,
      },
    ],
    lesson: {
      pt: 'Empatia digital: Trata os teus colegas online exatamente como gostarias de ser tratado no mundo real.',
      en: 'Digital Empathy: Treat classmates online exactly as you want to be treated in real life.',
    },
  },
];

export const DigitalDilemmasGame: React.FC<DigitalDilemmasGameProps> = ({
  language = 'pt',
  currentUser,
  onFinish,
}) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scenario = DILEMMAS[currentScenarioIndex];
  const selectedOption = selectedOptionIndex !== null ? scenario.options[selectedOptionIndex] : null;

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(idx);
    const chosen = scenario.options[idx];

    if (chosen.isBest) {
      soundEffects.playSuccess();
      setTotalScore((prev) => prev + chosen.empathyPoints);
      ticoFeedback.triggerCorrect();
    } else {
      soundEffects.playClick();
      ticoFeedback.triggerWrong(
        language === 'pt'
          ? 'Quase lá! Vamos analisar as consequências desta decisão juntos! 🔍'
          : 'Almost there! Let us analyze the consequences together! 🔍'
      );
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentScenarioIndex < DILEMMAS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsCompleted(true);
      soundEffects.playVictory();
      ticoFeedback.triggerQuizPerfect();
      if (onFinish) {
        onFinish(totalScore);
      }
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentScenarioIndex(0);
    setSelectedOptionIndex(null);
    setTotalScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-[2.5rem] bg-gradient-to-br from-indigo-900/90 via-slate-900 to-purple-950 p-6 sm:p-8 text-white shadow-2xl border-2 border-indigo-400/40 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl shadow-inner">
            ⚖️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
                {language === 'pt' ? 'Decisão Ética 5.º Ano' : 'Ethical Decision'}
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                {currentScenarioIndex + 1} / {DILEMMAS.length}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              {language === 'pt' ? 'Dilemas Digitais do Dia a Dia' : 'Everyday Digital Dilemmas'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/15">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span className="text-xs font-bold text-slate-200">
            {language === 'pt' ? 'Pontos de Empatia:' : 'Empathy Score:'}
          </span>
          <span className="text-sm font-black text-amber-300">{totalScore} XP</span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6 animate-in fade-in">
          {/* Situation Card */}
          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-xl bg-indigo-500/30 text-indigo-200 text-xs font-extrabold border border-indigo-400/30">
                {scenario.badge[language]}
              </span>
              <button
                type="button"
                onClick={() => speechService.speak('dilemma-scenario', `${scenario.title[language]}. ${scenario.situation[language]}`, language)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-indigo-200 cursor-pointer transition-colors"
                title="Ouvir dilema"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2">
              <span>{scenario.icon}</span>
              <span>{scenario.title[language]}</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {scenario.situation[language]}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-wide">
              {language === 'pt' ? 'O que farias nesta situação?' : 'What would you do?'}
            </p>

            {scenario.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              let style = 'bg-white/10 hover:bg-white/15 border-white/15 text-white';

              if (selectedOptionIndex !== null) {
                if (opt.isBest) {
                  style = 'bg-emerald-500/30 border-emerald-400 text-emerald-100 font-bold ring-2 ring-emerald-400/30';
                } else if (isSelected) {
                  style = 'bg-rose-500/30 border-rose-400 text-rose-100';
                } else {
                  style = 'bg-white/5 border-white/10 opacity-50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOptionIndex !== null}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {opt.text[language]}
                    </span>
                  </div>
                  {selectedOptionIndex !== null && opt.isBest && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Pedagogical Reflection */}
          {selectedOption && (
            <div
              className={`p-5 rounded-3xl border animate-in zoom-in-95 space-y-3 ${
                selectedOption.isBest
                  ? 'bg-emerald-950/60 border-emerald-400/50 text-emerald-100'
                  : 'bg-amber-950/60 border-amber-400/50 text-amber-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{selectedOption.isBest ? '🌟' : '💡'}</span>
                <div className="space-y-1 flex-1">
                  <p className="font-black text-sm sm:text-base">
                    {selectedOption.isBest
                      ? (language === 'pt' ? 'Decisão Exemplar!' : 'Exemplary Choice!')
                      : (language === 'pt' ? 'Reflexão Construtiva:' : 'Constructive Reflection:')}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                    {selectedOption.feedback[language]}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/30 border border-white/10 text-xs text-amber-200/90 font-medium">
                <span className="font-bold text-amber-300">💡 {language === 'pt' ? 'Lição Prática:' : 'Practical Takeaway:'} </span>
                {scenario.lesson[language]}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-all"
                >
                  <span>{currentScenarioIndex < DILEMMAS.length - 1 ? (language === 'pt' ? 'Próximo Dilema' : 'Next Dilemma') : (language === 'pt' ? 'Ver Resultado' : 'See Results')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Victory Screen */
        <div className="py-8 text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-linear-to-tr from-amber-400 to-yellow-300 text-amber-950 text-4xl flex items-center justify-center mx-auto shadow-2xl shadow-amber-400/40 animate-bounce">
            🏅
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase border border-amber-300/30">
              {language === 'pt' ? 'Cidadão Digital Consciencioso' : 'Conscientious Digital Citizen'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'pt' ? 'Parabéns pela tua Cidadania Digital!' : 'Congratulations on your Digital Citizenship!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {language === 'pt'
                ? 'Completaste todos os dilemas do 5.º ano! Mostraste saber resolver conflitos com respeito, proteger dados e cuidar dos teus colegas.'
                : 'You completed all 5th-grade dilemmas! You demonstrated respect, data protection, and empathy.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-white">
              {language === 'pt' ? 'Ganhaste +' : 'You earned +'}{totalScore} XP
            </span>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Repetir Dilemas' : 'Replay'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
