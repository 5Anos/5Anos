import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface PasswordVaultIntroProps {
  language?: Language;
}

export const PasswordVaultIntro: React.FC<PasswordVaultIntroProps> = ({ language = 'pt' }) => {
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [hasMasterKey, setHasMasterKey] = useState<boolean>(false);

  const toggleUnlock = (id: string) => {
    if (!hasMasterKey) return;
    setUnlockedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const VAULT_ITEMS = [
    { id: 'email', name: { pt: 'Email Escolar', en: 'School Email' }, icon: '✉️', desc: { pt: 'Mensagens dos professores e trabalhos de grupo.', en: 'Teacher messages and group assignments.' } },
    { id: 'games', name: { pt: 'Conta de Jogos', en: 'Gaming Account' }, icon: '🎮', desc: { pt: 'Progresso, níveis conquistados e amigos.', en: 'Game progress, unlocked levels, and friends.' } },
    { id: 'photos', name: { pt: 'Fotos & Memórias', en: 'Photos & Memories' }, icon: '📸', desc: { pt: 'Fotografias com a família e passeios escolares.', en: 'Family and school memories.' } },
    { id: 'classroom', name: { pt: 'Caderneta Escolar', en: 'School Portal' }, icon: '🎒', desc: { pt: 'Notas, faltas e recados dos diretores de turma.', en: 'Grades, attendance, and school reports.' } },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/80 rounded-3xl border-2 border-purple-200/90 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl shadow-xs">
            🔐
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'O Teu Cofre Digital: Para Que Serve uma Palavra-Passe?' : 'Your Digital Vault: What Does a Password Protect?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Uma palavra-passe é a chave mestra que tranca e protege as tuas contas pessoais.'
                : 'A password is the master key securing your personal digital accounts.'}
            </p>
          </div>
        </div>

        {/* Master Key Toggle */}
        <button
          onClick={() => {
            setHasMasterKey(!hasMasterKey);
            if (hasMasterKey) setUnlockedItems([]);
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
            hasMasterKey
              ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
              : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>{hasMasterKey ? (language === 'pt' ? 'Chave Inserida (Abrir Cofre)' : 'Key Inserted (Open)') : (language === 'pt' ? 'Inserir Palavra-passe' : 'Insert Password')}</span>
        </button>
      </div>

      {!hasMasterKey && (
        <div className="p-3 rounded-2xl bg-purple-100/60 border border-purple-200 text-purple-950 text-xs font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
          <span>{language === 'pt' ? 'Clica no botão "Inserir Palavra-passe" acima para experimentar abrir os compartimentos do teu cofre!' : 'Click "Insert Password" above to test opening your vault doors!'}</span>
        </div>
      )}

      {/* Grid of protected vaults */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {VAULT_ITEMS.map((item) => {
          const isOpen = unlockedItems.includes(item.id);

          return (
            <button
              key={item.id}
              disabled={!hasMasterKey}
              onClick={() => toggleUnlock(item.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between min-h-[140px] cursor-pointer ${
                !hasMasterKey
                  ? 'bg-slate-50/70 border-slate-200 opacity-80'
                  : isOpen
                  ? 'bg-emerald-50/80 border-emerald-400 shadow-sm'
                  : 'bg-white border-purple-200 hover:border-purple-400 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  {isOpen ? (
                    <Unlock className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.name[language]}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{item.desc[language]}</p>
              </div>

              <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${
                isOpen ? 'text-emerald-700' : 'text-slate-400'
              }`}>
                {isOpen ? '🟢 Acesso Autorizado' : '🔒 Trancado e Seguro'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1.5 font-medium">
        <p className="font-bold text-purple-900">
          💡 {language === 'pt' ? 'Conceito Essencial:' : 'Core Insight:'}
        </p>
        <p>
          {language === 'pt'
            ? 'Se alguém descobrir a tua palavra-passe, ganha acesso imediato a todas as tuas mensagens, fotos e contas de jogos. Por isso, a palavra-passe é estritamente pessoal e nunca deve ser partilhada!'
            : 'If someone discovers your password, they gain access to your private messages, photos, and game accounts. Keep it strictly private!'}
        </p>
      </div>
    </div>
  );
};
