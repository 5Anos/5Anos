import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert, Search } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface PhishingDetectorGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const PhishingDetectorGame: React.FC<PhishingDetectorGameProps> = ({ language, onBack, onFinish }) => {
  const [revealedClues, setRevealedClues] = useState<number[]>([]);
  const t = translations[language];

  const clues = [
    {
      id: 1,
      name: { pt: 'Remetente Suspeito', en: 'Suspicious Sender' },
      explanation: {
        pt: 'O endereço é "seguranca@banco-urgente-aviso.xyz" em vez do domínio oficial da instituição.',
        en: 'The address is "seguranca@banco-urgente-aviso.xyz" instead of the institution official verified domain.',
      },
    },
    {
      id: 2,
      name: { pt: 'Urgência Excessiva', en: 'Extreme Urgency' },
      explanation: {
        pt: 'Mensagens que dizem "A tua conta será eliminada em 10 minutos se não clicares!" usam o medo para que ajas sem pensar.',
        en: 'Phrases like "Your account will be terminated in 10 minutes!" create panic to trick you into acting hastily.',
      },
    },
    {
      id: 3,
      name: { pt: 'Link Enganoso', en: 'Deceptive Link' },
      explanation: {
        pt: 'O texto diz "banco.pt", mas ao passar o rato o destino real é "http://roubo-dados.site/login".',
        en: 'The link text says "bank.pt", but hovering reveals the actual URL is "http://stealing-data.site/login".',
      },
    },
    {
      id: 4,
      name: { pt: 'Pedido de Dados Confidenciais', en: 'Request for Sensitive Credentials' },
      explanation: {
        pt: 'Nenhuma entidade legítima ou professor pede a tua palavra-passe por email ou mensagem.',
        en: 'No legitimate organization or teacher will ever ask for your password via email.',
      },
    },
  ];

  const handleToggleClue = (id: number) => {
    if (!revealedClues.includes(id)) {
      setRevealedClues((prev) => [...prev, id]);
    }
  };

  const handleComplete = () => {
    onFinish(4, 4, 100);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 3' : 'Challenge 3'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {language === 'pt' ? '🕵️ O Detetive de Phishing' : '🕵️ The Phishing Detective'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {language === 'pt'
            ? 'Inspeciona este falso email alarmista e descobre os 4 indícios de fraude digital.'
            : 'Inspect this simulated alarmist email and reveal the 4 red flags of phishing fraud.'}
        </p>
      </div>

      {/* Simulated Email Card */}
      <div className="rounded-3xl bg-white border-2 border-rose-200 shadow-md overflow-hidden mb-6">
        {/* Email Header */}
        <div className="bg-rose-50/70 p-5 border-b border-rose-100 space-y-2 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">{language === 'pt' ? 'De:' : 'From:'}</span>
              <button
                onClick={() => handleToggleClue(1)}
                className={`px-2 py-0.5 rounded-md font-mono text-xs cursor-pointer transition-all ${
                  revealedClues.includes(1)
                    ? 'bg-rose-200 text-rose-900 font-bold border border-rose-300 ring-2 ring-rose-400/40'
                    : 'bg-rose-100/80 hover:bg-rose-200 text-rose-800'
                }`}
              >
                Suporte Oficial &lt;aviso-urgente@servico-gratis-123.xyz&gt; 🔍
              </button>
            </div>
            <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
              <ShieldAlert className="w-4 h-4" />
              <span>{language === 'pt' ? 'Email Suspeito' : 'Suspicious Email'}</span>
            </span>
          </div>

          <div>
            <span className="font-bold text-slate-700">{language === 'pt' ? 'Assunto:' : 'Subject:'} </span>
            <button
              onClick={() => handleToggleClue(2)}
              className={`px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                revealedClues.includes(2)
                  ? 'bg-rose-200 text-rose-900 font-bold border border-rose-300 ring-2 ring-rose-400/40'
                  : 'hover:bg-rose-100 font-semibold text-rose-900'
              }`}
            >
              ⚠️ URGENTE: A tua conta será BLOQUEADA em 15 minutos! Confirma agora! 🔍
            </button>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-6 space-y-4 text-sm text-slate-800 leading-relaxed">
          <p>
            {language === 'pt'
              ? 'Caro utilizador, detetámos uma anomalia grave no teu computador e na tua conta escolar.'
              : 'Dear user, we detected a severe malfunction on your computer and school account.'}
          </p>

          <p>
            {language === 'pt'
              ? 'Para evitar a perda permanente de todos os teus ficheiros e jogos, deves clicar no botão abaixo imediatamente:'
              : 'To avoid the permanent loss of all your files and games, you must click the link below immediately:'}
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <button
              onClick={() => handleToggleClue(3)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                revealedClues.includes(3)
                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
              }`}
            >
              {language === 'pt' ? '🔗 CLICA AQUI PARA DESBLOQUEAR A CONTA' : '🔗 CLICK HERE TO UNLOCK ACCOUNT'}
            </button>
            <p className="mt-2 text-[11px] font-mono text-slate-500">
              {language === 'pt' ? 'Destino real: http://site-estranho-roubo.ru/login' : 'Real link: http://strange-data-theft.ru/login'}
            </p>
          </div>

          <div
            onClick={() => handleToggleClue(4)}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              revealedClues.includes(4)
                ? 'bg-amber-100/70 border-amber-300 text-amber-950 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <p className="text-xs">
              ⚠️ <strong>{language === 'pt' ? 'Atenção:' : 'Notice:'}</strong>{' '}
              {language === 'pt'
                ? 'Terás de introduzir a tua palavra-passe e o teu número de telemóvel para validares a identidade.'
                : 'You will be required to type your current password and phone number to verify your identity.'}
            </p>
          </div>
        </div>
      </div>

      {/* Checklist of Found Red Flags */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-600" />
            <span>{language === 'pt' ? 'Indícios Descobertos:' : 'Discovered Red Flags:'}</span>
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
            {revealedClues.length} / {clues.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clues.map((c) => {
            const isFound = revealedClues.includes(c.id);
            return (
              <div
                key={c.id}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isFound ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isFound ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span>{c.name[language]}</span>
                </div>
                {isFound && <p className="text-[11px] text-slate-600 leading-snug">{c.explanation[language]}</p>}
              </div>
            );
          })}
        </div>

        {revealedClues.length === clues.length && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between animate-in fade-in">
            <p className="text-xs text-emerald-700 font-bold">
              {language === 'pt' ? '🎉 Excelente trabalho de detetive!' : '🎉 Outstanding detective work!'}
            </p>
            <button
              onClick={handleComplete}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm"
            >
              {language === 'pt' ? 'Concluir Desafio (+20 pts)' : 'Complete Challenge (+20 pts)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
