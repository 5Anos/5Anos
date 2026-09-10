import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, Shield, Trash2, Clock, Globe, ArrowRight, RotateCcw, Award, ThumbsUp, AlertTriangle } from 'lucide-react';
import { AudioSpeakButton } from '../AudioSpeakButton';
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
  correctCategory: 'safe' | 'danger';
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
];

export const TicDigitalFootprintGame: React.FC<TicDigitalFootprintGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'safe' | 'danger'>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const curItem = ITEMS_LIST[currentIdx];
  const userChoice = answers[curItem?.id];
  const isCorrect = userChoice === curItem?.correctCategory;

  const handleClassify = (cat: 'safe' | 'danger') => {
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
      <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-teal-300">
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'pt' ? 'Pegada Digital & Privacidade' : 'Digital Footprint & Privacy'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">
            🌍 {language === 'pt' ? 'Publicarias Isto?' : 'Would You Post This?'}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 max-w-2xl font-medium">
            {language === 'pt'
              ? 'Tudo o que partilhamos online constrói a nossa pegada digital. Avalia cada situação e decide se é seguro publicar ou se deve ficar privado!'
              : 'Everything we share online shapes our digital footprint. Evaluate each situation and decide if it is safe to post or should stay private!'}
          </p>
        </div>
        <AudioSpeakButton
          id="digitalfootprint-header"
          text={`${language === 'pt' ? 'Publicarias Isto?' : 'Would You Post This?'}. ${
            language === 'pt'
              ? 'Tudo o que partilhamos online constrói a nossa pegada digital. Avalia cada situação e decide se é seguro publicar ou se deve ficar privado!'
              : 'Everything we share online shapes our digital footprint. Evaluate each situation and decide if it is safe to post or should stay private!'
          }`}
          language={language}
          label={language === 'pt' ? 'Ouvir Introdução' : 'Listen Intro'}
          variant="pill"
          size="sm"
        />
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
            <div className="flex items-start justify-between gap-4">
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
              <AudioSpeakButton
                id={`footprint-item-${curItem.id}`}
                text={`${curItem.title[language]}. ${curItem.desc[language]}. Pergunta: ${language === 'pt' ? 'Qual é a atitude correta?' : 'What is the correct action?'}`}
                language={language}
                variant="icon"
                size="sm"
              />
            </div>
          </div>

          {/* Classification Options */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === 'pt' ? 'Qual é a atitude correta?' : 'What is the correct action?'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Safe / Adequado */}
              <button
                type="button"
                disabled={showFeedback}
                onClick={() => handleClassify('safe')}
                className={`p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  showFeedback && curItem.correctCategory === 'safe'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30'
                    : showFeedback && userChoice === 'safe' && curItem.correctCategory !== 'safe'
                    ? 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/30'
                    : 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 bg-white text-slate-800'
                }`}
              >
                <span className="text-3xl">✅</span>
                <span className="text-sm font-black">
                  {language === 'pt' ? 'Adequado / Seguro' : 'Safe / Appropriate'}
                </span>
              </button>

              {/* Option 2: Danger / Não Partilhar */}
              <button
                type="button"
                disabled={showFeedback}
                onClick={() => handleClassify('danger')}
                className={`p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  showFeedback && curItem.correctCategory === 'danger'
                    ? 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/30'
                    : showFeedback && userChoice === 'danger' && curItem.correctCategory !== 'danger'
                    ? 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/30'
                    : 'border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 bg-white text-slate-800'
                }`}
              >
                <span className="text-3xl">❌</span>
                <span className="text-sm font-black">
                  {language === 'pt' ? 'Não Partilhar / Privado' : 'Do Not Share / Private'}
                </span>
              </button>
            </div>
          </div>

          {/* Feedback Box */}
          {showFeedback && (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-teal-800">{language === 'pt' ? 'Explicação:' : 'Explanation:'}</span>
                <AudioSpeakButton
                  id={`footprint-feedback-${curItem.id}`}
                  text={curItem.feedback[language]}
                  language={language}
                  variant="icon"
                  size="xs"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-teal-950 leading-relaxed">
                {curItem.feedback[language]}
              </p>
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
                ? 'Pensar sempre antes de publicar e proteger os teus dados e fotos privadas são as marcas de um verdadeiro cidadão digital!'
                : 'Thinking before posting and protecting your private data and photos are the hallmarks of a great digital citizen!'}
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
