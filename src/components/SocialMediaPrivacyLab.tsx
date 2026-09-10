import React, { useState } from 'react';
import { UserX, ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react';
import { Language } from '../types';
import { AudioSpeakButton } from './AudioSpeakButton';

interface SocialMediaPrivacyLabProps {
  language?: Language;
}

export const SocialMediaPrivacyLab: React.FC<SocialMediaPrivacyLabProps> = ({ language = 'pt' }) => {
  const [decision, setDecision] = useState<'accept' | 'reject' | null>(null);

  const labTitle = language === 'pt' ? 'Laboratório de Redes Sociais: Pedido de Amizade Suspeito' : 'Social Lab: Suspicious Friend Request';
  const labDesc = language === 'pt'
    ? 'Analisa o perfil antes de decidir aceitar ou rejeitar contactos desconhecidos.'
    : 'Analyze profile indicators before accepting unknown friend requests.';

  const messageText = language === 'pt'
    ? 'SuperGamer 2026, contacto desconhecido, zero amigos em comum, criado há dois dias. Mensagem: Olá! Vi que jogas Roblox e Fortnite. Sou teu amigo da escola, mas não digo qual. Aceita-me e diz-me a tua morada para jogarmos juntos!'
    : 'SuperGamer 2026, unknown contact, 0 mutual friends. Message: Hello! I see you play Roblox. I am your school friend. Accept me and tell me your home address!';

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-indigo-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
            👥
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {labTitle}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {labDesc}
            </p>
          </div>
        </div>

        <AudioSpeakButton
          id="social-lab-intro"
          text={`${labTitle}. ${labDesc}`}
          language={language}
          label={language === 'pt' ? 'Ouvir Desafio' : 'Listen Challenge'}
          variant="pill"
          size="xs"
        />
      </div>

      {/* Simulated Friend Request Card */}
      <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-indigo-300 flex items-center justify-center text-xl">
              👤❓
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span>"SuperGamer_2026"</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">Desconhecido</span>
              </h4>
              <p className="text-xs text-slate-500 font-medium">0 amigos em comum • Criado há 2 dias</p>
            </div>
          </div>

          <AudioSpeakButton
            id="social-lab-message"
            text={messageText}
            language={language}
            label={language === 'pt' ? 'Ouvir Mensagem' : 'Listen Message'}
            variant="pill"
            size="xs"
          />
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
          💬 "Olá! Vi que jogas Roblox e Fortnite. Sou teu amigo da escola (mas não digo qual). Aceita-me e diz-me a tua morada para jogarmos juntos!"
        </div>

        {decision === null ? (
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDecision('reject')}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserX className="w-4 h-4" />
                <span>Rejeitar & Bloquear</span>
              </button>
              <button
                onClick={() => setDecision('accept')}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Aceitar Amizade</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-3.5 rounded-xl text-xs font-medium space-y-1 ${
            decision === 'reject' ? 'bg-emerald-50 text-emerald-950 border border-emerald-300' : 'bg-rose-50 text-rose-950 border border-rose-300'
          }`}>
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold flex items-center gap-1.5">
                {decision === 'reject' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ShieldAlert className="w-4 h-4 text-rose-600" />}
                <span>{decision === 'reject' ? '🏆 Decisão Excelente!' : '⛔ Risco Elevado!'}</span>
              </p>
              <AudioSpeakButton
                id="social-lab-feedback"
                text={`${decision === 'reject' ? 'Decisão Excelente!' : 'Risco Elevado!'} ${
                  decision === 'reject'
                    ? 'Perfis desconhecidos com zero amigos em comum que pedem dados pessoais são potenciais contas falsas. Rejeitar, bloquear e avisar os pais é a melhor atitude!'
                    : 'Nunca aceites contactos desconhecidos nem reveles a tua morada! Podes expor a tua vida privada a pessoas mal-intencionadas.'
                }`}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>
            <p className="leading-relaxed">
              {decision === 'reject'
                ? 'Perfis desconhecidos com zero amigos em comum que pedem dados pessoais são potenciais contas falsas. Rejeitar, bloquear e avisar os pais é a melhor atitude!'
                : 'Nunca aceites contactos desconhecidos nem reveles a tua morada! Podes expor a tua vida privada a pessoas mal-intencionadas.'}
            </p>
            <button
              onClick={() => setDecision(null)}
              className="text-[11px] underline font-bold mt-1 text-slate-600 hover:text-slate-900 cursor-pointer block"
            >
              Tentar outra vez
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
