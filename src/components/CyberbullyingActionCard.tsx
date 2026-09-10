import React, { useState } from 'react';
import { PhoneCall, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { AudioSpeakButton } from './AudioSpeakButton';

interface CyberbullyingActionCardProps {
  language?: Language;
}

const STEPS = [
  { num: 1, title: { pt: 'PARAR', en: 'STOP' }, icon: '🛑', desc: { pt: 'Não respondas com insultos nem alimentes discussões.', en: 'Do not reply with insults or escalate.' } },
  { num: 2, title: { pt: 'GUARDAR', en: 'SAVE' }, icon: '📸', desc: { pt: 'Tira capturas de ecrã ou fotos das mensagens como prova.', en: 'Take screenshots of messages as evidence.' } },
  { num: 3, title: { pt: 'BLOQUEAR', en: 'BLOCK' }, icon: '🚫', desc: { pt: 'Bloqueia o contacto para não receberes mais notificações.', en: 'Block the sender to stop receiving messages.' } },
  { num: 4, title: { pt: 'DENUNCIAR', en: 'REPORT' }, icon: '🚩', desc: { pt: 'Usa a opção de denúncia dentro do jogo ou rede social.', en: 'Use in-app reporting tools.' } },
  { num: 5, title: { pt: 'PEDIR AJUDA', en: 'ASK HELP' }, icon: '🧑‍🏫', desc: { pt: 'Fala com os pais, professores ou liga para a Linha 800 21 90 90.', en: 'Talk to parents, teachers, or call 800 21 90 90.' } },
];

export const CyberbullyingActionCard: React.FC<CyberbullyingActionCardProps> = ({ language = 'pt' }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [testAnswer, setTestAnswer] = useState<number | null>(null);

  const cardTitle = language === 'pt' ? 'Escudo de Cidadania: A Regra dos 5 Passos' : 'Citizenship Shield: The 5 Steps Rule';
  const cardDesc = language === 'pt' ? 'Clica em cada passo para saber exatamente o que fazer perante ofensas online!' : 'Click each step to master anti-cyberbullying actions!';
  const scenarioQuestion = language === 'pt'
    ? 'Um jogador desconhecido envia uma mensagem maldosa no chat de um jogo. O que deves fazer em primeiro lugar?'
    : 'An unknown player sends an unkind message in game chat. What is your first step?';

  return (
    <div className="w-full bg-gradient-to-br from-rose-50/80 via-white to-amber-50/80 rounded-3xl border-2 border-rose-200/90 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl shadow-xs">
            🛡️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {cardTitle}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {cardDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AudioSpeakButton
            id="cyberbullying-card-intro"
            text={`${cardTitle}. ${cardDesc}. ${STEPS.map((s) => `Passo ${s.num}: ${s.title[language]}, ${s.desc[language]}`).join('. ')}`}
            language={language}
            label={language === 'pt' ? 'Ouvir 5 Passos' : 'Listen 5 Steps'}
            variant="pill"
            size="xs"
          />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold shrink-0">
            <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
            <span>800 21 90 90 (Linha Grátis)</span>
          </div>
        </div>
      </div>

      {/* 5 Steps Interactive Selector */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {STEPS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              activeStep === idx
                ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
            }`}
          >
            <span className="text-lg">{s.icon}</span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight">{s.title[language]}</span>
          </button>
        ))}
      </div>

      {/* Active Step Details */}
      <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{STEPS[activeStep].icon}</span>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-rose-950">
              {language === 'pt' ? `Passo ${activeStep + 1}: ` : `Step ${activeStep + 1}: `}
              {STEPS[activeStep].title[language]}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
              {STEPS[activeStep].desc[language]}
            </p>
          </div>
        </div>
        <AudioSpeakButton
          id={`cyberbullying-step-${activeStep}`}
          text={`${STEPS[activeStep].title[language]}. ${STEPS[activeStep].desc[language]}`}
          language={language}
          variant="icon"
          size="xs"
        />
      </div>

      {/* Interactive Quick Decision Scenario */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs sm:text-sm">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{language === 'pt' ? 'Situação Prática: O que farias?' : 'Practical Scenario: What would you do?'}</span>
          </div>
          <AudioSpeakButton
            id="cyberbullying-scenario"
            text={`${scenarioQuestion}. Opção A: Responder com outra ofensa no chat. Opção B: Não responder, guardar captura de ecrã e bloquear.`}
            language={language}
            variant="icon"
            size="xs"
          />
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {scenarioQuestion}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={() => setTestAnswer(0)}
            className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
              testAnswer === 0 ? 'bg-amber-100 border-amber-400 text-amber-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            A) Responder com outra ofensa no chat
          </button>

          <button
            onClick={() => setTestAnswer(1)}
            className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
              testAnswer === 1 ? 'bg-emerald-100 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            B) Não responder, guardar captura de ecrã e bloquear
          </button>
        </div>

        {testAnswer !== null && (
          <div className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between gap-2 ${testAnswer === 1 ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}`}>
            <p className="leading-relaxed">
              {testAnswer === 1
                ? '🎉 Muito bem! Esta é a atitude correta: não alimentar discussões, registar prova e cortar o contacto.'
                : '⚠️ Cuidado: responder com insultos só piora a situação. A regra de ouro é PARAR e BLOQUEAR!'}
            </p>
            <AudioSpeakButton
              id="cyberbullying-answer-feedback"
              text={testAnswer === 1
                ? 'Muito bem! Esta é a atitude correta: não alimentar discussões, registar prova e cortar o contacto.'
                : 'Cuidado: responder com insultos só piora a situação. A regra de ouro é PARAR e BLOQUEAR!'}
              language={language}
              variant="icon"
              size="xs"
            />
          </div>
        )}
      </div>

      {/* Ponto Eletrão Quick Info */}
      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs font-semibold">
          <span className="text-xl">♻️</span>
          <span>{language === 'pt' ? 'Equipamentos e pilhas velhas vão para o Ponto Eletrão, nunca para o lixo comum!' : 'E-waste goes to recycling points, never ordinary bins!'}</span>
        </div>
      </div>
    </div>
  );
};
