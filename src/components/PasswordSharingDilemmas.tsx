import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { Language } from '../types';

interface PasswordSharingDilemmasProps {
  language?: Language;
}

interface Scenario {
  id: string;
  situation: { pt: string; en: string };
  icon: string;
  allowShare: boolean;
  explanation: { pt: string; en: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'friend',
    icon: '🤝',
    situation: {
      pt: 'O teu melhor amigo pede-te a palavra-passe do teu jogo para "experimentar um boneco" durante o intervalo na escola.',
      en: 'Your best friend asks for your game password to try a character during recess.',
    },
    allowShare: false,
    explanation: {
      pt: 'Nunca deves partilhar! Amizade não significa partilhar senhas. Se ele perder itens ou a conta for bloqueada, a vossa amizade pode ficar prejudicada.',
      en: 'Never share! Friendship does not mean sharing passwords.',
    },
  },
  {
    id: 'postit',
    icon: '📝',
    situation: {
      pt: 'Escrever a tua palavra-passe num papel autocolante (Post-it) e colá-lo na moldura do ecrã do computador da sala de aula.',
      en: 'Writing your password on a sticky note and pasting it on the classroom monitor.',
    },
    allowShare: false,
    explanation: {
      pt: 'Muito perigoso! Qualquer pessoa que passe na sala consegue ver e usar a tua conta sem autorização.',
      en: 'Very risky! Anyone walking by can see and use your account.',
    },
  },
  {
    id: 'parents',
    icon: '👨‍👩‍👧',
    situation: {
      pt: 'Os teus pais ou encarregados de educação precisam de saber a palavra-passe do teu email escolar para ajudar na configuração.',
      en: 'Your parents need your school email password to assist with account setup.',
    },
    allowShare: true,
    explanation: {
      pt: 'Correto! Os teus pais e professores são os únicos adultos de confiança que te podem ajudar a gerir as contas com segurança.',
      en: 'Correct! Parents and teachers are trusted guides who help manage accounts safely.',
    },
  },
];

export const PasswordSharingDilemmas: React.FC<PasswordSharingDilemmasProps> = ({ language = 'pt' }) => {
  const [decisions, setDecisions] = useState<Record<string, boolean>>({});

  const handleDecision = (id: string, canShare: boolean) => {
    setDecisions((prev) => ({ ...prev, [id]: canShare }));
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
            🤔
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Dilemas do Dia a Dia: Podes Partilhar a Palavra-passe?' : 'Daily Dilemmas: Can You Share Passwords?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Analisa as situações reais e decide se é seguro ou proibido partilhar!'
                : 'Analyze real scenarios and decide whether sharing is safe or forbidden!'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {SCENARIOS.map((scen) => {
          const userChoice = decisions[scen.id];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = userChoice === scen.allowShare;

          return (
            <div
              key={scen.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200/90 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl p-2 bg-slate-100 rounded-xl shrink-0">{scen.icon}</span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {scen.situation[language]}
                  </p>

                  {!hasAnswered ? (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleDecision(scen.id, true)}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                      >
                        {language === 'pt' ? '✅ Pode Partilhar' : '✅ Can Share'}
                      </button>
                      <button
                        onClick={() => handleDecision(scen.id, false)}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-600 hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                      >
                        {language === 'pt' ? '⛔ Segredo Absoluto' : '⛔ Strictly Private'}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2.5 text-xs font-medium space-y-1">
                      <p className={`font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                        <span>{isCorrect ? 'Decisão Correta!' : 'Atenção ao Risco!'}</span>
                      </p>
                      <p className="text-slate-700 leading-relaxed">{scen.explanation[language]}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
