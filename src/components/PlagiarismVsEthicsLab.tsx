import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, FileCheck, Copy, Sparkles, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface PlagiarismVsEthicsLabProps {
  language?: Language;
}

interface Scenario {
  id: string;
  actionText: string;
  isEthical: boolean;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    actionText: 'Copiar e colar 3 parágrafos da Wikipédia para o trabalho de Ciências e assinar como se fossem palavras tuas.',
    isEthical: false,
    explanation: 'Plágio! Copiar texto de outrem sem citar a fonte é desonesto. Deves reescrever por palavras tuas ou colocar entre aspas com a fonte!',
  },
  {
    id: 's3',
    actionText: 'Tirar uma fotografia a um colega a dormir no autocarro da visita de estudo e publicar no Instagram sem autorização dele.',
    isEthical: false,
    explanation: 'Violação do Direito de Imagem e Privacidade! Nunca deves publicar fotos de colegas sem o consentimento deles e dos pais.',
  },
];

export const PlagiarismVsEthicsLab: React.FC<PlagiarismVsEthicsLabProps> = ({ language = 'pt' }) => {
  const [decisions, setDecisions] = useState<Record<string, boolean>>({});

  const handleDecide = (id: string, isEthicalChoice: boolean) => {
    setDecisions((prev) => ({ ...prev, [id]: isEthicalChoice }));
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
            ⚖️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Laboratório de Ética: Plágio ou Trabalho Honesto?' : 'Ethics Lab: Plagiarism or Honest Work?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Analisa as situações escolares e decide o que é ético e o que é proibido!'
                : 'Analyze school situations and decide what is ethical and what is forbidden!'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {SCENARIOS.map((scen) => {
          const userChoice = decisions[scen.id];
          const hasChosen = userChoice !== undefined;
          const isCorrect = userChoice === scen.isEthical;

          return (
            <div
              key={scen.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                hasChosen
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {scen.actionText}
                </p>

                {!hasChosen ? (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleDecide(scen.id, true)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                    >
                      ✅ Trabalho Honesto / Correto
                    </button>
                    <button
                      onClick={() => handleDecide(scen.id, false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-600 hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                    >
                      ⛔ Plágio / Falta de Ética
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-medium space-y-1">
                    <p className={`font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                      <span>{isCorrect ? 'Análise Perfeita!' : 'Atenção às Regras de Ética!'}</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">{scen.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
