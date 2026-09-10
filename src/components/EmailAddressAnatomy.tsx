import React, { useState } from 'react';
import { Mail, AtSign, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface EmailAddressAnatomyProps {
  language?: Language;
}

export const EmailAddressAnatomy: React.FC<EmailAddressAnatomyProps> = ({ language = 'pt' }) => {
  const [activePart, setActivePart] = useState<'user' | 'at' | 'domain' | 'tld'>('user');

  const PARTS = {
    user: {
      name: 'Nome do Utilizador (mariana.silva)',
      icon: '👤',
      color: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      desc: 'Identifica a pessoa dona da caixa de correio. Em emails escolares costuma ser o primeiro e último nome ou o número de aluno.',
    },
    at: {
      name: 'O Símbolo da Arroba (@)',
      icon: '📧',
      color: 'bg-blue-100 text-blue-950 border-blue-300',
      desc: 'Significa "em" ou "no" (em inglês "at"). Liga o nome do utilizador ao servidor que aloja o email.',
    },
    domain: {
      name: 'Nome da Organização / Escola (escola-secundaria)',
      icon: '🏫',
      color: 'bg-purple-100 text-purple-950 border-purple-300',
      desc: 'Identifica a escola, empresa ou fornecedor do serviço de email (como gmail, outlook ou a rede escolar).',
    },
    tld: {
      name: 'Domínio de Topo (.pt)',
      icon: '🇵🇹',
      color: 'bg-amber-100 text-amber-950 border-amber-300',
      desc: '.pt é o domínio de topo associado a Portugal (ou outros tipos como .edu, .org, .com).',
    },
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 rounded-3xl border-2 border-blue-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-xs">
            ✉️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Anatomia de um Endereço de Email' : 'Anatomy of an Email Address'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Clica nas 4 partes do endereço para descobrir o que significa cada elemento!'
                : 'Click the 4 parts of the email address to explore their meaning!'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Email Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-md border border-slate-700 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Mail className="w-4 h-4 text-blue-400" />
          <span>Endereço Eletrónico Oficial</span>
        </div>

        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 font-mono text-xs sm:text-base flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActivePart('user')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'user' ? 'bg-emerald-500 text-slate-950 border-emerald-300 ring-2 ring-emerald-400' : 'bg-slate-700 text-emerald-400 border-slate-600'
            }`}
          >
            mariana.silva
          </button>

          <button
            onClick={() => setActivePart('at')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'at' ? 'bg-blue-500 text-white border-blue-300 ring-2 ring-blue-400' : 'bg-slate-700 text-blue-400 border-slate-600'
            }`}
          >
            @
          </button>

          <button
            onClick={() => setActivePart('domain')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'domain' ? 'bg-purple-500 text-white border-purple-300 ring-2 ring-purple-400' : 'bg-slate-700 text-purple-300 border-slate-600'
            }`}
          >
            escola-secundaria
          </button>

          <button
            onClick={() => setActivePart('tld')}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'tld' ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400' : 'bg-slate-700 text-amber-300 border-slate-600'
            }`}
          >
            .pt
          </button>
        </div>
      </div>

      {/* Active Part Card */}
      <div className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${PARTS[activePart].color}`}>
        <span className="text-3xl p-1 bg-white/70 rounded-xl shrink-0">{PARTS[activePart].icon}</span>
        <div>
          <h4 className="font-black text-sm sm:text-base mb-1">{PARTS[activePart].name}</h4>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">{PARTS[activePart].desc}</p>
        </div>
      </div>

      {/* Interactive Email Missions */}
      <div className="pt-2 p-4 rounded-2xl bg-white border-2 border-blue-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="text-xs sm:text-sm font-black text-slate-900">
              {language === 'pt' ? 'Missão: Localiza os elementos no endereço acima!' : 'Mission: Locate elements in the address above!'}
            </span>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {language === 'pt' ? 'Prática' : 'Practice'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setActivePart('user')}
            className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
              activePart === 'user'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            👤 {language === 'pt' ? 'Quem envia / Dono' : 'Mailbox Owner'}
          </button>
          <button
            onClick={() => setActivePart('at')}
            className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
              activePart === 'at'
                ? 'bg-blue-50 border-blue-400 text-blue-950 ring-2 ring-blue-300'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            📧 {language === 'pt' ? 'Separador @ ("em")' : '@ Symbol ("at")'}
          </button>
          <button
            onClick={() => setActivePart('domain')}
            className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
              activePart === 'domain'
                ? 'bg-purple-50 border-purple-400 text-purple-950 ring-2 ring-purple-300'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            🏫 {language === 'pt' ? 'Escola / Servidor' : 'School / Server'}
          </button>
          <button
            onClick={() => setActivePart('tld')}
            className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
              activePart === 'tld'
                ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-300'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            🇵🇹 {language === 'pt' ? 'País (.pt)' : 'Country (.pt)'}
          </button>
        </div>
      </div>
    </div>
  );
};
