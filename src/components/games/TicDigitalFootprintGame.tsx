import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, Shield, Trash2, Clock, Globe, ArrowRight, RotateCcw, Award, ThumbsUp, AlertTriangle } from 'lucide-react';
import { Language } from '../../types';

interface TicDigitalFootprintGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface ItemToClassify {
  id: string;
  icon: string;
  title: { pt: string; en: string };
  desc: { pt: string; en: string };
  correctCategory: 'safe' | 'caution' | 'danger';
  feedback: { pt: string; en: string };
}

const ITEMS_LIST: ItemToClassify[] = [
  {
    id: 'f1',
    icon: '🎨',
    title: { pt: 'Fotografia de um desenho ou trabalho escolar que criaste', en: 'Photo of a drawing or school project you made' },
    desc: {
      pt: 'Queres mostrar à família ou na plataforma escolar um cartaz que desenhaste na aula de TIC.',
      en: 'You want to share a poster you made in ICT class with your family or school platform.',
    },
    correctCategory: 'safe',
    feedback: {
      pt: '✅ Adequado! Partilhar trabalhos escolares e criações artísticas próprias em ambientes escolares é seguro e encorajador.',
      en: '✅ Safe! Sharing your schoolwork and art projects in educational settings is great.',
    },
  },
  {
    id: 'f2',
    icon: '🏠',
    title: { pt: 'A tua morada de casa e o teu número de telemóvel', en: 'Your home address and mobile phone number' },
    desc: {
      pt: 'Num perfil público de um jogo ou rede social, pedem para escreveres a rua onde vives.',
      en: 'On a public game or social profile, you are asked for your street address.',
    },
    correctCategory: 'danger',
    feedback: {
      pt: '❌ Não partilhar! A tua morada e telefone são dados pessoais confidenciais. Nunca os deves divulgar em páginas públicas!',
      en: '❌ Do not share! Your home address and phone are private data. Never publish them publicly!',
    },
  },
  {
    id: 'f3',
    icon: '📸',
    title: { pt: 'Fotografia embaraçosa de um colega da turma sem a autorização dele', en: 'Embarrassing photo of a classmate without their consent' },
    desc: {
      pt: 'Tiraste uma foto a um colega no recreio a tropeçar e queres publicar no grupo da turma.',
      en: 'You photographed a classmate tripping in the playground and want to post it to a group.',
    },
    correctCategory: 'danger',
    feedback: {
      pt: '❌ Não partilhar! Devemos respeitar a privacidade e os sentimentos dos outros. Nunca publiques imagens de colegas sem autorização.',
      en: '❌ Do not share! Always respect the privacy and feelings of others. Never post photos of peers without permission.',
    },
  },
  {
    id: 'f4',
    icon: '🔑',
    title: { pt: 'A palavra-passe secreta da tua conta escolar', en: 'The secret password to your school account' },
    desc: {
      pt: 'Um amigo pede a tua palavra-passe para te ajudar a subir de nível ou ver um trabalho.',
      en: 'A friend asks for your password to help you level up or see an assignment.',
    },
    correctCategory: 'danger',
    feedback: {
      pt: '❌ Não partilhar! A palavra-passe é estritamente pessoal e intransmissível. Nem aos melhores amigos se deve dar a senha.',
      en: '❌ Do not share! Passwords are strictly personal. Never reveal them even to best friends.',
    },
  },
  {
    id: 'f5',
    icon: '🎮',
    title: { pt: 'Jogar 6 horas seguidas até às 2h da manhã na véspera de um teste', en: 'Playing 6 hours straight until 2 AM before a test' },
    desc: {
      pt: 'O Pedro quer ficar a jogar a noite toda no telemóvel na véspera da aula.',
      en: 'Pedro wants to play mobile games all night before school next day.',
    },
    correctCategory: 'caution',
    feedback: {
      pt: '⚠️ Cuidado / Não recomendado! O descanso, o sono de 9-10h e o estudo são essenciais. Os ecrãs antes de dormir prejudicam a saúde e a concentração.',
      en: '⚠️ Caution / Unhealthy! Sleep (9-10 hrs) and homework come first. Screens right before sleep harm brain recovery.',
    },
  },
  {
    id: 'f6',
    icon: '📱',
    title: { pt: 'Um telemóvel antigo e cabos estragados que já não funcionam', en: 'An old broken smartphone and cables' },
    desc: {
      pt: 'A Sofia encontrou aparelhos elétricos avariados na gaveta e quer saber onde os deitar.',
      en: 'Sofia found broken electrical gear in a drawer and wants to dispose of it safely.',
    },
    correctCategory: 'caution',
    feedback: {
      pt: '♻️ Entregar no Ponto Eletrão! Nunca deitar no lixo comum de casa nem no ecoponto do papel. O lixo eletrónico deve ser reciclado em contentores específicos (Eletrão).',
      en: '♻️ Deliver to E-Waste recycling points (Ponto Eletrão)! Never put in general trash or paper bins.',
    },
  },
  {
    id: 'f7',
    icon: '🗣️',
    title: { pt: 'Conversar diretamente com o colega de mesa na sala de aula', en: 'Talking directly to your desk classmate in class' },
    desc: {
      pt: 'Precisas de uma borracha e o teu colega está sentado mesmo ao teu lado.',
      en: 'You need an eraser and your classmate sits right next to you.',
    },
    correctCategory: 'safe',
    feedback: {
      pt: '✅ Comunicação Presencial! Nem tudo precisa de ecrãs ou telemóveis. Conversar cara a cara é a melhor forma quando estamos juntos.',
      en: '✅ Direct conversation! Not everything needs digital tech. Face-to-face chat is the best choice when seated together.',
    },
  },
];

export const TicDigitalFootprintGame: React.FC<TicDigitalFootprintGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'safe' | 'caution' | 'danger'>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const curItem = ITEMS_LIST[currentIdx];
  const userChoice = answers[curItem?.id];
  const isCorrect = userChoice === curItem?.correctCategory;

  const handleClassify = (cat: 'safe' | 'caution' | 'danger') => {
    if (showFeedback) return;
    setAnswers((prev) => ({ ...prev, [curItem.id]: cat }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIdx + 1 < ITEMS_LIST.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      let correct = 0;
      ITEMS_LIST.forEach((item) => {
        if (answers[item.id] === item.correctCategory) correct++;
      });
      const pct = Math.round((correct / ITEMS_LIST.length) * 100);
      setIsDone(true);
      onFinish(pct, 100, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setShowFeedback(false);
    setIsDone(false);
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
      <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-teal-300">
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'pt' ? 'Pegada Digital & Sustentabilidade' : 'Digital Footprint & Sustainability'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">
            🌍 {language === 'pt' ? 'Publicarias Isto? Pegada Digital, Tempo de Ecrã & Lixo Eletrónico' : 'Would You Post This? Footprint & E-Waste'}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 max-w-2xl font-medium">
            {language === 'pt'
              ? 'Tudo o que partilhamos online constrói a nossa pegada digital. Classifica cada situação entre Adequado, Cuidado / Equilíbrio e Não Partilhar!'
              : 'Everything we post shapes our digital footprint. Classify each situation wisely!'}
          </p>
        </div>
      </div>

      {!isDone ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <span className="text-xs font-black text-teal-800 uppercase tracking-wider bg-teal-100 px-3 py-1 rounded-full">
              {language === 'pt'
                ? `Situação ${currentIdx + 1} de ${ITEMS_LIST.length}`
                : `Item ${currentIdx + 1} of ${ITEMS_LIST.length}`}
            </span>
            <div className="flex items-center gap-1">
              {ITEMS_LIST.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIdx
                      ? 'w-6 bg-teal-600'
                      : answers[ITEMS_LIST[idx].id]
                      ? 'w-2 bg-emerald-400'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 border-2 border-slate-200 space-y-4">
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-teal-100 flex items-center justify-center text-3xl shrink-0">
                {curItem.icon}
              </span>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {curItem.title[language]}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {curItem.desc[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Classification Options */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === 'pt' ? 'Qual é a atitude correta?' : 'What is the correct action?'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Safe / Adequado */}
              <button
                type="button"
                disabled={showFeedback}
                onClick={() => handleClassify('safe')}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  showFeedback && curItem.correctCategory === 'safe'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30'
                    : showFeedback && userChoice === 'safe' && curItem.correctCategory !== 'safe'
                    ? 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/30'
                    : 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 bg-white text-slate-800'
                }`}
              >
                <span className="text-2xl">✅</span>
                <span className="text-xs sm:text-sm font-black">
                  {language === 'pt' ? 'Adequado / Seguro' : 'Safe / Appropriate'}
                </span>
              </button>

              {/* Option 2: Caution / Equilíbrio / Reciclagem */}
              <button
                type="button"
                disabled={showFeedback}
                onClick={() => handleClassify('caution')}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  showFeedback && curItem.correctCategory === 'caution'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/30'
                    : showFeedback && userChoice === 'caution' && curItem.correctCategory !== 'caution'
                    ? 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/30'
                    : 'border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 bg-white text-slate-800'
                }`}
              >
                <span className="text-2xl">⚠️</span>
                <span className="text-xs sm:text-sm font-black">
                  {language === 'pt' ? 'Cuidado / Equilíbrio / Reciclar' : 'Caution / Balance / Recycle'}
                </span>
              </button>

              {/* Option 3: Danger / Não Partilhar */}
              <button
                type="button"
                disabled={showFeedback}
                onClick={() => handleClassify('danger')}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  showFeedback && curItem.correctCategory === 'danger'
                    ? 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/30'
                    : showFeedback && userChoice === 'danger' && curItem.correctCategory !== 'danger'
                    ? 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/30'
                    : 'border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 bg-white text-slate-800'
                }`}
              >
                <span className="text-2xl">❌</span>
                <span className="text-xs sm:text-sm font-black">
                  {language === 'pt' ? 'Não Partilhar / Proibido' : 'Do Not Share / Block'}
                </span>
              </button>
            </div>
          </div>

          {/* Feedback Box */}
          {showFeedback && (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs sm:text-sm font-medium text-teal-950 leading-relaxed animate-in fade-in">
              {curItem.feedback[language]}
            </div>
          )}

          {showFeedback && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl font-black text-sm bg-teal-700 hover:bg-teal-800 text-white shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>
                  {currentIdx + 1 < ITEMS_LIST.length
                    ? language === 'pt' ? 'Próxima Situação' : 'Next Situation'
                    : language === 'pt' ? 'Ver Resultado e Pontuação' : 'View Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Celebration */
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-4xl mx-auto shadow-inner border border-teal-200 animate-bounce">
            🌱
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {language === 'pt' ? 'Cidadão Digital Consciente!' : 'Conscious Digital Citizen!'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'pt' ? 'Sabes proteger a tua Pegada Digital!' : 'You Know How to Guard Your Footprint!'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Pensar antes de publicar, equilibrar o tempo de ecrã com o desporto e a família, e reciclar o lixo eletrónico no Ponto Eletrão são as marcas de um verdadeiro cidadão digital!'
                : 'Thinking before posting, balancing screen time with physical activity, and recycling e-waste are the hallmarks of a great digital citizen!'}
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
              <span>{language === 'pt' ? 'Concluir (+100 XP)' : 'Finish (+100 XP)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
