import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface PasswordBattleCardProps {
  language?: Language;
}

interface PasswordPair {
  id: string;
  context: { pt: string; en: string };
  passA: { text: string; strong: boolean; reason: { pt: string; en: string } };
  passB: { text: string; strong: boolean; reason: { pt: string; en: string } };
}

const PAIRS: PasswordPair[] = [
  {
    id: '1',
    context: { pt: 'Conta de Email Escolar', en: 'School Email Account' },
    passA: {
      text: 'joao2014',
      strong: false,
      reason: { pt: 'Fraca: Usa nome pessoal e ano de nascimento, muito fácil de adivinhar!', en: 'Weak: Uses personal name and birth year!' },
    },
    passB: {
      text: 'Mochila-Azul-2026-Forte!',
      strong: true,
      reason: { pt: 'Forte: Longa, combina palavras fáceis de lembrar com pontuação e número!', en: 'Strong: Long passphrase with words, punctuation and numbers!' },
    },
  },
  {
    id: '2',
    context: { pt: 'Plataforma de Jogos Online', en: 'Online Gaming Account' },
    passA: {
      text: 'O-dragao-verde-salta-longe#9',
      strong: true,
      reason: { pt: 'Excelente: Frase-passe com mais de 25 caracteres, memorável e quase impossível de quebrar.', en: 'Excellent: Long memorable passphrase with special symbols.' },
    },
    passB: {
      text: '12345678',
      strong: false,
      reason: { pt: 'Perigosa: Sequência numérica óbvia que robôs adivinham em menos de um segundo!', en: 'Dangerous: Simple number sequence cracked in less than a second!' },
    },
  },
];

export const PasswordBattleCard: React.FC<PasswordBattleCardProps> = ({ language = 'pt' }) => {
  const [activePair, setActivePair] = useState<number>(0);
  const [selectedPass, setSelectedPass] = useState<'A' | 'B' | null>(null);

  const pair = PAIRS[activePair];

  return (
    <div className="w-full bg-gradient-to-br from-purple-50/70 via-white to-pink-50/70 rounded-3xl border-2 border-purple-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl shadow-xs">
            ⚔️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Batalha das Palavras-passe: Qual é a Mais Segura?' : 'Password Duel: Which One is Stronger?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Analisa as opções e clica na que oferece verdadeira proteção!'
                : 'Analyze options and choose the one offering real security!'}
            </p>
          </div>
        </div>

        <div className="flex rounded-xl bg-purple-100 p-1">
          {PAIRS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActivePair(idx);
                setSelectedPass(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePair === idx ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-800 hover:text-purple-950'
              }`}
            >
              {language === 'pt' ? `Duelo ${idx + 1}` : `Duel ${idx + 1}`}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
          {pair.context[language]}
        </span>
      </div>

      {/* 2 Options Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option A */}
        <button
          onClick={() => setSelectedPass('A')}
          className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            selectedPass === 'A'
              ? pair.passA.strong
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                : 'bg-rose-50 border-rose-400 ring-2 ring-rose-300'
              : 'bg-white border-slate-200 hover:border-purple-300 shadow-2xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-500 uppercase">Opção A</span>
              {selectedPass === 'A' && (
                pair.passA.strong ? <ShieldCheck className="w-5 h-5 text-emerald-600" /> : <ShieldAlert className="w-5 h-5 text-rose-600" />
              )}
            </div>
            <p className="font-mono text-base sm:text-lg font-bold text-slate-900 bg-slate-100 p-2.5 rounded-xl text-center mb-2">
              "{pair.passA.text}"
            </p>
          </div>

          {selectedPass === 'A' && (
            <p className={`text-xs font-medium mt-2 leading-relaxed ${pair.passA.strong ? 'text-emerald-900' : 'text-rose-900'}`}>
              {pair.passA.reason[language]}
            </p>
          )}
        </button>

        {/* Option B */}
        <button
          onClick={() => setSelectedPass('B')}
          className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            selectedPass === 'B'
              ? pair.passB.strong
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                : 'bg-rose-50 border-rose-400 ring-2 ring-rose-300'
              : 'bg-white border-slate-200 hover:border-purple-300 shadow-2xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-500 uppercase">Opção B</span>
              {selectedPass === 'B' && (
                pair.passB.strong ? <ShieldCheck className="w-5 h-5 text-emerald-600" /> : <ShieldAlert className="w-5 h-5 text-rose-600" />
              )}
            </div>
            <p className="font-mono text-base sm:text-lg font-bold text-slate-900 bg-slate-100 p-2.5 rounded-xl text-center mb-2">
              "{pair.passB.text}"
            </p>
          </div>

          {selectedPass === 'B' && (
            <p className={`text-xs font-medium mt-2 leading-relaxed ${pair.passB.strong ? 'text-emerald-900' : 'text-rose-900'}`}>
              {pair.passB.reason[language]}
            </p>
          )}
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-purple-100/50 border border-purple-200 text-xs text-purple-950 font-medium flex items-center justify-between">
        <span>💡 <strong>Regra de Ouro:</strong> O segredo está no comprimento e em evitar dados previsíveis!</span>
      </div>
    </div>
  );
};
