import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, UserCheck, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export const PhishingMessageSimulator: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'danger' | 'success' | 'warning'; msg: string } | null>(null);

  const handleAction = (action: 'click' | 'reply' | 'report') => {
    setSelectedAction(action);
    if (action === 'click') {
      setFeedback({
        type: 'danger',
        msg: '⛔ PERIGO! Nunca abras links de desconhecidos! Podes instalar um vírus ou ter as tuas palavras-passe roubadas.',
      });
    } else if (action === 'reply') {
      setFeedback({
        type: 'warning',
        msg: '⚠️ ATENÇÃO! Nunca respondas nem partilhes o teu nome, idade, escola ou palavras-passe com quem não conheces!',
      });
    } else {
      setFeedback({
        type: 'success',
        msg: '🏆 EXCELENTE DECISÃO! É a regra de ouro: Não clicar, bloquear/apagar e avisar logo um adulto de confiança!',
      });
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-amber-50/70 to-slate-50 rounded-2xl border-2 border-amber-200 shadow-md p-3.5 sm:p-4 font-sans select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-500 text-white rounded-lg shadow-sm">
            <ShieldAlert className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wide">
            Simulador de Decisão em Tempo Real
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full border border-amber-300">
          Cenário Prático
        </span>
      </div>

      {/* Simulated Smartphone Chat Message */}
      <div className="bg-slate-900 rounded-2xl p-3 sm:p-4 text-white shadow-lg border border-slate-800 mb-3.5">
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-300">Mensagem de Número Desconhecido</span>
          </div>
          <span className="text-[10px] bg-red-950/80 text-red-300 px-2 py-0.5 rounded-full border border-red-800 font-bold">
            ⚠️ Não Verificado
          </span>
        </div>

        {/* Chat Bubble */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl rounded-tl-none p-3 max-w-[95%]">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Remetente: +351 91X XXX XXX (Desconhecido)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            "Olá! Parabéns! 🎉 Ganhaste um telemóvel novo e 1000 Moedas no teu jogo favorito! 
            Clica já no link para reclamar o prémio antes que expire:"
          </p>
          <div className="mt-2 p-2 bg-slate-900/90 rounded-xl border border-red-500/40 text-xs font-mono text-cyan-300 flex items-center justify-between">
            <span className="truncate">👉 http://premio-gratis-jogos-xyz.click/ganhar</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold shrink-0 ml-1">
              FALSO
            </span>
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="mb-2 text-center">
        <p className="text-xs sm:text-sm font-bold text-slate-800">
          O que deves fazer imediatamente? Clica numa opção para agir:
        </p>
      </div>

      {/* Interactive Action Decision Buttons (Imperative) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => handleAction('click')}
          className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 text-center shadow-sm ${
            selectedAction === 'click'
              ? 'bg-red-600 text-white border-red-700 scale-[0.98] ring-2 ring-red-400'
              : 'bg-white hover:bg-red-50 text-red-700 border-red-200'
          }`}
        >
          <span className="text-base">🖱️</span>
          <span>1. Clicar no link</span>
          <span className="text-[10px] font-normal opacity-80">(Curiosidade)</span>
        </button>

        <button
          onClick={() => handleAction('reply')}
          className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 text-center shadow-sm ${
            selectedAction === 'reply'
              ? 'bg-amber-600 text-white border-amber-700 scale-[0.98] ring-2 ring-amber-400'
              : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-200'
          }`}
        >
          <span className="text-base">💬</span>
          <span>2. Responder a perguntar</span>
          <span className="text-[10px] font-normal opacity-80">(Pedir detalhes)</span>
        </button>

        <button
          onClick={() => handleAction('report')}
          className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 text-center shadow-sm ${
            selectedAction === 'report'
              ? 'bg-emerald-600 text-white border-emerald-700 scale-[0.98] ring-2 ring-emerald-400'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
          }`}
        >
          <span className="text-base">🛡️</span>
          <span>3. NÃO clicar e avisar adulto</span>
          <span className="text-[10px] font-semibold text-emerald-700">(Regra de Ouro)</span>
        </button>
      </div>

      {/* Immediate Interactive Feedback */}
      {feedback && (
        <div
          className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-1 ${
            feedback.type === 'danger'
              ? 'bg-red-100 border-red-300 text-red-950'
              : feedback.type === 'warning'
              ? 'bg-amber-100 border-amber-300 text-amber-950'
              : 'bg-emerald-100 border-emerald-300 text-emerald-950'
          }`}
        >
          {feedback.msg}
        </div>
      )}
    </div>
  );
};
