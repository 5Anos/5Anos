import React, { useState } from 'react';
import { Trash2, RefreshCw, HeartHandshake, ArrowRight, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import hardwareImg from '../assets/images/hardware_peripherals_3d_1788539942831.jpg';

interface TicGreenTechExplorerProps {
  language: Language;
}

export const TicGreenTechExplorer: React.FC<TicGreenTechExplorerProps> = ({ language }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const quizItems = [
    {
      name: {
        pt: '📱 Um telemóvel antigo com o ecrã partido que já não liga',
        en: '📱 An old phone with a broken screen that will not turn on',
      },
      correct: 'eletrao',
      reason: {
        pt: '🔋 Ponto Eletrão ou Ecocentro! Tem baterias e metais que devem ser reciclados com segurança.',
        en: '🔋 Ponto Eletrão or Eco-center! Contains batteries and metals to safely recycle.',
      },
    },
    {
      name: {
        pt: '💻 Um tablet de brincar que ainda funciona perfeitamente',
        en: '💻 A working tablet that still functions perfectly',
      },
      correct: 'doar',
      reason: {
        pt: '🤝 Reutilizar e Doar! Dá a um primo, amigo ou escola em vez de deitar fora.',
        en: '🤝 Reuse and Donate! Give to a friend or school instead of throwing away.',
      },
    },
    {
      name: {
        pt: '🔋 Duas pilhas descarregadas do comando da consola',
        en: '🔋 Two dead batteries from a console controller',
      },
      correct: 'eletrao',
      reason: {
        pt: '🔋 Pilhão ou Ponto Eletrão! Nunca no lixo comum porque contêm químicos perigosos.',
        en: '🔋 Battery recycling box! Never in regular trash due to hazardous chemicals.',
      },
    },
  ];

  const currentItem = quizItems[quizIndex];

  const handleChoice = (dest: string) => {
    if (selectedDestination !== null) return;
    setSelectedDestination(dest);
    if (dest === currentItem.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextItem = () => {
    setSelectedDestination(null);
    if (quizIndex < quizItems.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="mt-4 p-4 sm:p-5 bg-linear-to-br from-emerald-50/70 via-white to-sky-50/70 rounded-3xl border border-emerald-200/80 shadow-sm space-y-4">
      {/* Header Banner with Image */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/90 p-3.5 sm:p-4 rounded-2xl border border-emerald-100">
        <img
          src={hardwareImg}
          alt="Reciclagem e Tecnologia"
          className="w-full sm:w-28 h-24 sm:h-20 object-cover rounded-xl border border-emerald-100 shrink-0"
        />
        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
            🌱 {language === 'pt' ? 'Missão Ecológica' : 'Eco Mission'}
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {language === 'pt' ? 'Onde Deves Colocar o Equipamento?' : 'Where Should You Put This Device?'}
          </h3>
          <p className="text-xs text-slate-600">
            {language === 'pt'
              ? 'Ajuda a proteger a natureza escolhendo o destino ecológico certo!'
              : 'Help protect nature by picking the right eco-friendly destination!'}
          </p>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            {language === 'pt'
              ? `Objeto ${quizIndex + 1} de ${quizItems.length}`
              : `Item ${quizIndex + 1} of ${quizItems.length}`}
          </span>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-black">
            ⭐ {language === 'pt' ? `Pontos: ${score}` : `Score: ${score}`}
          </span>
        </div>

        {/* Item to classify */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <p className="text-sm sm:text-base font-black text-slate-900">
            {currentItem.name[language]}
          </p>
        </div>

        {/* Action Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => handleChoice('doar')}
            disabled={selectedDestination !== null}
            className={`p-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
              selectedDestination === null
                ? 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-600 hover:text-white hover:border-sky-600'
                : selectedDestination === 'doar'
                ? currentItem.correct === 'doar'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-red-500 text-white border-red-500'
                : currentItem.correct === 'doar'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'opacity-40 border-slate-200 text-slate-400'
            }`}
          >
            <HeartHandshake className="w-4 h-4 shrink-0" />
            <span>{language === 'pt' ? '🤝 Reutilizar / Doar' : '🤝 Reuse / Donate'}</span>
          </button>

          <button
            onClick={() => handleChoice('eletrao')}
            disabled={selectedDestination !== null}
            className={`p-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
              selectedDestination === null
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                : selectedDestination === 'eletrao'
                ? currentItem.correct === 'eletrao'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-red-500 text-white border-red-500'
                : currentItem.correct === 'eletrao'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'opacity-40 border-slate-200 text-slate-400'
            }`}
          >
            <RefreshCw className="w-4 h-4 shrink-0" />
            <span>{language === 'pt' ? '🔋 Ponto Eletrão' : '🔋 Ponto Eletrão'}</span>
          </button>

          <button
            onClick={() => handleChoice('lixo_comum')}
            disabled={selectedDestination !== null}
            className={`p-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
              selectedDestination === null
                ? 'bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-600 hover:text-white hover:border-rose-600'
                : selectedDestination === 'lixo_comum'
                ? 'bg-red-500 text-white border-red-500'
                : 'opacity-40 border-slate-200 text-slate-400'
            }`}
          >
            <Trash2 className="w-4 h-4 shrink-0" />
            <span>{language === 'pt' ? '❌ Lixo Comum' : '❌ Regular Trash'}</span>
          </button>
        </div>

        {/* Feedback Banner */}
        {selectedDestination !== null && (
          <div
            className={`p-3.5 rounded-xl border-2 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200 ${
              selectedDestination === currentItem.correct
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-rose-50 text-rose-950 border-rose-300'
            }`}
          >
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>{selectedDestination === currentItem.correct ? '🎉 Muito bem!' : '⚠️ Lembra-te:'}</span>
              <span>{currentItem.reason[language]}</span>
            </div>

            <button
              onClick={nextItem}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-black text-xs shrink-0 cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>
                {quizIndex < quizItems.length - 1
                  ? language === 'pt'
                    ? 'Seguinte'
                    : 'Next'
                  : language === 'pt'
                  ? 'Recomeçar'
                  : 'Restart'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
