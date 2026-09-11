import React, { useState } from 'react';
import { Trash2, RefreshCw, AlertOctagon, HeartHandshake, Leaf, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface TicGreenTechExplorerProps {
  language: Language;
}

export const TicGreenTechExplorer: React.FC<TicGreenTechExplorerProps> = ({ language }) => {
  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [quizItemIndex, setQuizItemIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [isCorrectChoice, setIsCorrectChoice] = useState<boolean | null>(null);

  const stations = [
    {
      id: 0,
      badge: { pt: 'Conceito', en: 'Concept' },
      title: { pt: 'O que é o Lixo Eletrónico (E-Waste)?', en: 'What is E-Waste?' },
      icon: '🗑️',
      color: 'border-red-200 bg-red-50/70',
      tagColor: 'bg-red-600 text-white',
      desc: {
        pt: 'São todos os computadores, tablets, telemóveis, televisores, consolas, cabos e pilhas que deixam de funcionar e são deitados fora. Como as pessoas trocam de aparelhos muito rápido, o lixo eletrónico é o que mais cresce em todo o planeta!',
        en: 'Any computer, tablet, phone, console, cable, or battery that breaks down or gets discarded. Because people replace gadgets quickly, e-waste is growing faster than any other trash on Earth!',
      },
      childTip: {
        pt: '💡 Sabias? Todos os anos são produzidos mais de 50 milhões de toneladas de lixo eletrónico no mundo!',
        en: '💡 Did you know? Over 50 million metric tons of e-waste are produced globally every year!',
      },
    },
    {
      id: 1,
      badge: { pt: 'Perigo!', en: 'Danger!' },
      title: { pt: 'Porque NUNCA deitar no lixo comum?', en: 'Why NEVER regular trash?' },
      icon: '⛔',
      color: 'border-rose-200 bg-rose-50/70',
      tagColor: 'bg-rose-600 text-white',
      desc: {
        pt: 'Dentro dos circuitos e baterias existem substâncias tóxicas como mercúrio, chumbo e lítio. Se forem para o caixote de lixo normal, acabam em aterros onde a chuva pode arrastar esses venenos para o solo, poços de água e rios, envenenando peixes, animais e plantas!',
        en: 'Circuits and batteries contain toxic heavy metals like lead, mercury, and lithium. If thrown into regular trash, rain carries poisons into soils and rivers, harming wildlife and our drinking water!',
      },
      childTip: {
        pt: '⚠️ Perigo: Baterias furadas ou esmagadas no camião do lixo comum podem causar incêndios graves!',
        en: '⚠️ Danger: Crushed batteries in ordinary garbage trucks can cause dangerous fires!',
      },
    },
    {
      id: 2,
      badge: { pt: 'Solução Verde', en: 'Green Solution' },
      title: { pt: 'Reutilizar e Reciclar Equipamentos', en: 'Reuse & Recycle Equipment' },
      icon: '🔄',
      color: 'border-sky-200 bg-sky-50/70',
      tagColor: 'bg-sky-600 text-white',
      desc: {
        pt: '1.º Reutilizar: Se o computador ou tablet ainda funciona, oferece a um primo, amigo ou doa a uma escola! 2.º Reparar: Trocar uma tecla ou bateria custa menos e poupa o planeta. 3.º Reciclar: Se não der para arranjar, leva ao Ponto Eletrão, Ecocentro ou loja de retoma!',
        en: '1st Reuse: If it still turns on, give it to a younger sibling or donate to school! 2nd Repair: Fixing a key or battery saves money and resources. 3rd Recycle: Drop it into a Ponto Eletrão bin or municipal eco-center!',
      },
      childTip: {
        pt: '🔋 No Ponto Eletrão recuperam-se metais preciosos como ouro e cobre para fazer novos aparelhos!',
        en: '🔋 Specialized recyclers extract gold and copper from old circuits to build new devices!',
      },
    },
    {
      id: 3,
      badge: { pt: 'No Teu Dia a Dia', en: 'Everyday Life' },
      title: { pt: 'Consumo Responsável de Tecnologia', en: 'Responsible Tech Consumption' },
      icon: '🌍',
      color: 'border-emerald-200 bg-emerald-50/70',
      tagColor: 'bg-emerald-600 text-white',
      desc: {
        pt: 'Não precisas de comprar um telemóvel novo só porque saiu um modelo novo ou com outra cor! Cuida com carinho dos teus aparelhos: usa capa protetora, não comas nem bebas perto do computador, e desliga os carregadores da tomada quando a bateria chegar a 100%.',
        en: 'You do not need a new gadget just for fashion. Care for your gear: use protective bumpers, keep liquids away from keyboards, and unplug chargers once batteries hit 100%!',
      },
      childTip: {
        pt: '🌱 Desligar o computador quando não o estás a usar poupa muita energia e ajuda a salvar o planeta!',
        en: '🌱 Shutting down your computer when not in use saves electricity and preserves our climate!',
      },
    },
  ];

  const quizItems = [
    {
      item: {
        pt: '📱 Um telemóvel antigo avariado e uma pilha descarregada.',
        en: '📱 A broken old smartphone and a depleted battery.',
      },
      correctTarget: 'eletrao',
      explanation: {
        pt: '✅ Exato! Pilhas e equipamentos avariados vão para o Ponto Eletrão ou Ecocentro!',
        en: '✅ Exactly! Dead batteries and broken gear belong in Ponto Eletrão bins!',
      },
    },
    {
      item: {
        pt: '💻 Um tablet com alguns anos que ainda funciona perfeitamente.',
        en: '💻 An older tablet that still functions perfectly.',
      },
      correctTarget: 'doar',
      explanation: {
        pt: '✅ Muito bem! Reutilizar e doar a quem precisa é a melhor escolha ecológica!',
        en: '✅ Great job! Reusing or donating to someone who needs it is the greenest choice!',
      },
    },
    {
      item: {
        pt: '🗑️ O caixote do lixo indiferenciado da cozinha de casa.',
        en: '🗑️ The ordinary domestic kitchen trash bin.',
      },
      correctTarget: 'nunca',
      explanation: {
        pt: '✅ Certíssimo! NUNCA deitar nenhum aparelho eletrónico nem pilhas no lixo comum!',
        en: '✅ Correct! NEVER toss electronics or batteries into common household trash!',
      },
    },
  ];

  const handleQuizChoice = (target: string) => {
    const current = quizItems[quizItemIndex];
    if (target === current.correctTarget) {
      setIsCorrectChoice(true);
      setQuizFeedback(current.explanation[language]);
    } else {
      setIsCorrectChoice(false);
      setQuizFeedback(
        language === 'pt'
          ? '❌ Ops! Pensa melhor no impacto ambiental e tenta outra opção.'
          : '❌ Oops! Think about the ecological impact and try again.'
      );
    }
  };

  const nextQuizItem = () => {
    setQuizFeedback(null);
    setIsCorrectChoice(null);
    setQuizItemIndex((prev) => (prev + 1) % quizItems.length);
  };

  return (
    <div className="mt-4 p-5 sm:p-6 bg-linear-to-br from-emerald-50/80 via-white to-teal-50/80 rounded-2xl border border-emerald-200/90 shadow-xs space-y-6">
      {/* Header Banner */}
      <div className="border-b border-emerald-100 pb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white tracking-wide uppercase">
          🌱 {language === 'pt' ? 'Planeta & Tecnologia Verde' : 'Green Planet & Tech'}
        </span>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">
          {language === 'pt'
            ? '5. Tecnologia e Ambiente: O Guia do Guardião Digital'
            : '5. Technology & Environment: The Digital Guardian Guide'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          {language === 'pt'
            ? 'Clica em cada uma das 4 estações para aprender como proteger o ambiente enquanto usas a tecnologia!'
            : 'Click each of the 4 stations to learn how to safeguard our planet while using technology!'}
        </p>
      </div>

      {/* 4 Interactive Stations Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {stations.map((s, idx) => {
          const isSelected = selectedStation === idx;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedStation(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'border-emerald-500 bg-white ring-2 ring-emerald-300 shadow-sm scale-[1.02]'
                  : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${s.tagColor}`}>
                  {s.badge[language]}
                </span>
              </div>
              <span className="text-xs font-black text-slate-900 line-clamp-2 leading-tight">
                {s.title[language]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Station Details Card */}
      <div
        className={`p-5 rounded-2xl border-2 transition-all ${stations[selectedStation].color}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{stations[selectedStation].icon}</span>
          <h4 className="text-base sm:text-lg font-black text-slate-900">
            {stations[selectedStation].title[language]}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {stations[selectedStation].desc[language]}
        </p>
        <div className="mt-3 pt-3 border-t border-slate-200/70 flex items-center gap-2 text-xs font-bold text-slate-800">
          <span>{stations[selectedStation].childTip[language]}</span>
        </div>
      </div>

      {/* Interactive Sorter Quiz for 10-Year-Olds */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-emerald-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
              🎯
            </span>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              {language === 'pt' ? 'Missão: O que farias com este equipamento?' : 'Mission: What would you do with this?'}
            </h4>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {language === 'pt'
              ? `Cenário ${quizItemIndex + 1} de ${quizItems.length}`
              : `Scenario ${quizItemIndex + 1} of ${quizItems.length}`}
          </span>
        </div>

        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <p className="text-sm sm:text-base font-extrabold text-slate-900">
            {quizItems[quizItemIndex].item[language]}
          </p>
        </div>

        {/* 3 Choice Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => handleQuizChoice('doar')}
            className="p-3 rounded-xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <span>🤝</span>
            <span>{language === 'pt' ? 'Reutilizar / Doar a alguém' : 'Reuse / Donate to someone'}</span>
          </button>

          <button
            onClick={() => handleQuizChoice('eletrao')}
            className="p-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <span>🔋</span>
            <span>{language === 'pt' ? 'Ponto Eletrão / Ecocentro' : 'Ponto Eletrão / Eco-Center'}</span>
          </button>

          <button
            onClick={() => handleQuizChoice('nunca')}
            className="p-3 rounded-xl border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <span>🚫</span>
            <span>{language === 'pt' ? '❌ NUNCA no Lixo Comum' : '❌ NEVER in Regular Trash'}</span>
          </button>
        </div>

        {/* Feedback Area */}
        {quizFeedback && (
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 animate-in fade-in duration-150 ${
              isCorrectChoice
                ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950'
                : 'bg-rose-100/80 border-rose-300 text-rose-950'
            }`}
          >
            <p className="text-xs sm:text-sm font-extrabold">{quizFeedback}</p>
            {isCorrectChoice && (
              <button
                onClick={nextQuizItem}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-black bg-emerald-700 text-white hover:bg-emerald-800 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'pt' ? 'Próximo' : 'Next'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
