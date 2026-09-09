import React, { useState } from 'react';
import { ArrowLeft, Trophy, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { PostureCorrectionSimulator } from '../PostureCorrectionSimulator';
import { Language } from '../../types';

interface Props {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const ErgonomicsPostureGame: React.FC<Props> = ({ language, onBack, onFinish }) => {
  const [completed, setCompleted] = useState<boolean>(false);

  const handleComplete = () => {
    setCompleted(true);
    onFinish(25, 25, 100);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar aos Desafios' : 'Back to Challenges'}</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-amber-900 font-extrabold text-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>+25 XP</span>
          </div>
          {completed && (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-3.5 py-1.5 rounded-2xl text-emerald-800 font-extrabold text-sm animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'pt' ? 'Completado!' : 'Completed!'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Simulator Component */}
      <PostureCorrectionSimulator language={language} onComplete={handleComplete} />
    </div>
  );
};
