import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface EmailLabGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const EmailLabGame: React.FC<EmailLabGameProps> = ({ language, onBack, onFinish }) => {
  const [to, setTo] = useState('professor.tic@escola.pt');
  const [subject, setSubject] = useState('Dúvida sobre o trabalho de TIC — 5.º A');
  const [greeting, setGreeting] = useState('Caro Professor Ricardo,');
  const [body, setBody] = useState(
    'Estive a rever os apontamentos sobre direitos de autor e gostaria de confirmar se posso utilizar uma fotografia de domínio público no trabalho de grupo.\n\nMuito obrigado pelo seu tempo.'
  );
  const [signoff, setSignoff] = useState('Com os melhores cumprimentos,');
  const [signature, setSignature] = useState('João Silva, n.º 12 do 5.º A');
  const [sentSuccess, setSentSuccess] = useState(false);

  const t = translations[language];

  // Validation rules
  const validTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim());
  const validSubject = subject.trim().length >= 5 && !subject.toUpperCase().includes('URGENTE');
  const validGreeting = greeting.trim().length >= 5;
  const isNotShouting = !body.split('').filter((c) => /[A-Z]/.test(c)).length ||
                        (body.split('').filter((c) => /[A-Z]/.test(c)).length / (body.length || 1)) < 0.35;
  const validSignoffAndSignature = signoff.trim().length >= 4 && signature.trim().length >= 3;

  const validCount = [validTo, validSubject, validGreeting, isNotShouting, validSignoffAndSignature].filter(Boolean).length;

  const handleSend = () => {
    setSentSuccess(true);
    const score = validCount * 2;
    const maxScore = 10;
    const percentage = Math.round((validCount / 5) * 100);
    onFinish(score, maxScore, percentage);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 1' : 'Challenge 1'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {language === 'pt' ? '✉️ Simulador de Escrita de Email' : '✉️ Professional Email Composer'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {language === 'pt'
            ? 'Aprende a estruturar uma mensagem formal e educada dirigida a um professor ou colega.'
            : 'Learn to structure a respectful, formal email addressed to a teacher or classmate.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Client Composer (2 Columns) */}
        <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="bg-slate-50 p-4 border-b border-slate-200 space-y-3">
            {/* Destinatário */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 w-16">
                {language === 'pt' ? 'Para:' : 'To:'}
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="nome@escola.pt"
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>

            {/* Assunto */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 w-16">
                {language === 'pt' ? 'Assunto:' : 'Subject:'}
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Trabalho de TIC — Dúvida sobre pesquisa"
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          {/* Email Body Sections */}
          <div className="p-5 space-y-4 text-xs sm:text-sm">
            {/* Saudação */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                {language === 'pt' ? '1. Saudação Inicial (Respeitosa):' : '1. Opening Salutation:'}
              </label>
              <input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="Ex: Caro Professor Ricardo,"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 font-medium"
              />
            </div>

            {/* Corpo */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                {language === 'pt' ? '2. Mensagem Clara e Educada:' : '2. Body Message:'}
              </label>
              <textarea
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-sans"
              />
            </div>

            {/* Despedida */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  {language === 'pt' ? '3. Despedida:' : '3. Complimentary Close:'}
                </label>
                <input
                  type="text"
                  value={signoff}
                  onChange={(e) => setSignoff(e.target.value)}
                  placeholder="Ex: Com os melhores cumprimentos,"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  {language === 'pt' ? '4. Assinatura (Nome e Turma):' : '4. Signature (Name & Class):'}
                </label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Ex: Leonor Martins, 5.º B"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {validCount === 5
                ? (language === 'pt' ? '✨ Estrutura impecável!' : '✨ Flawless structure!')
                : (language === 'pt' ? 'Completa os 5 critérios de qualidade.' : 'Complete the 5 quality criteria.')}
            </span>

            <button
              onClick={handleSend}
              disabled={sentSuccess}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{sentSuccess ? (language === 'pt' ? 'Email Enviado!' : 'Email Sent!') : (language === 'pt' ? 'Enviar Email' : 'Send Email')}</span>
            </button>
          </div>
        </div>

        {/* Real-time Netiquette & Quality Checklist (1 Column) */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{language === 'pt' ? 'Critérios de Netiqueta:' : 'Netiquette Checklist:'}</span>
            </h3>

            <div className="space-y-2.5">
              <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                validTo ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {validTo ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />}
                <div>
                  <p className="font-bold">{language === 'pt' ? 'Endereço válido' : 'Valid recipient email'}</p>
                  <p className="text-[11px] text-slate-500">{language === 'pt' ? 'Contém nome@dominio.pt' : 'Contains valid format'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                validSubject ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {validSubject ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />}
                <div>
                  <p className="font-bold">{language === 'pt' ? 'Assunto claro e informativo' : 'Clear subject line'}</p>
                  <p className="text-[11px] text-slate-500">{language === 'pt' ? 'Explica o tema sem alarmismo' : 'Summarizes topic calmly'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                validGreeting ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {validGreeting ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />}
                <div>
                  <p className="font-bold">{language === 'pt' ? 'Saudação educada' : 'Polite salutation'}</p>
                  <p className="text-[11px] text-slate-500">{language === 'pt' ? 'Ex: Caro Professor, Bom dia' : 'e.g. Dear Teacher, Good day'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                isNotShouting ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                {isNotShouting ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <div>
                  <p className="font-bold">{language === 'pt' ? 'Tom calmo (sem MAIÚSCULAS)' : 'Calm tone (no shouting CAPS)'}</p>
                  <p className="text-[11px] text-slate-500">{language === 'pt' ? 'Escrever tudo em maiúsculas equivale a gritar' : 'All caps equals shouting online'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                validSignoffAndSignature ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                {validSignoffAndSignature ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />}
                <div>
                  <p className="font-bold">{language === 'pt' ? 'Despedida e identificação' : 'Closing & Identification'}</p>
                  <p className="text-[11px] text-slate-500">{language === 'pt' ? 'Indica o teu nome e turma' : 'Includes your name and class'}</p>
                </div>
              </div>
            </div>

            {sentSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-100/80 text-emerald-950 text-xs space-y-2 animate-in fade-in">
                <p className="font-bold text-sm">🎉 {language === 'pt' ? 'Parabéns!' : 'Congratulations!'}</p>
                <p>{language === 'pt' ? 'Completaste o treino prático de escrita de correio eletrónico com distinção.' : 'You mastered practical email composition with honors.'}</p>
                <button
                  onClick={onBack}
                  className="w-full mt-2 py-2 rounded-xl bg-emerald-700 text-white font-bold cursor-pointer hover:bg-emerald-800"
                >
                  {t.backToTheme}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
