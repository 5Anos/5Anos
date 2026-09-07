import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, User, FileText, Paperclip, RefreshCw } from 'lucide-react';

export const EmailComposerSimulator: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [greeting, setGreeting] = useState('');
  const [body, setBody] = useState('');
  const [signoff, setSignoff] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = recipient.includes('@') && recipient.includes('.');
  const hasSubject = subject.trim().length > 3;
  const hasGreeting = greeting.trim().length > 0;
  const hasBody = body.trim().length > 10;
  const hasSignoff = signoff.trim().length > 0;

  const isComplete = isValidEmail && hasSubject && hasGreeting && hasBody && hasSignoff;

  const handleSend = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setRecipient('');
    setSubject('');
    setGreeting('');
    setBody('');
    setSignoff('');
    setSubmitted(false);
  };

  const handleAutoFillExample = () => {
    setRecipient('professor.silva@escola.pt');
    setSubject('Dúvida sobre o trabalho de TIC');
    setGreeting('Caro Professor Silva,');
    setBody('Gostaria de saber se o trabalho de TIC do 5.º ano pode ser entregue até sexta-feira. Obrigado pela ajuda.');
    setSignoff('Com os melhores cumprimentos,\nAna Martins (N.º 4, 5.º A)');
    setSubmitted(false);
  };

  return (
    <div className="w-full bg-gradient-to-b from-blue-50/80 to-slate-50 rounded-2xl border-2 border-blue-200 shadow-md p-3.5 sm:p-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-blue-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-blue-600 text-white rounded-lg shadow-sm">
            <Mail className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-black text-blue-950 uppercase tracking-wide">
            Simulador de Email Escolar
          </span>
        </div>
        <button
          onClick={handleAutoFillExample}
          className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full border border-blue-300 transition-colors cursor-pointer"
        >
          Carregar Exemplo
        </button>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 text-center space-y-3 animate-in fade-in">
          <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-emerald-950 text-sm sm:text-base">Email Enviado com Sucesso! 📬</h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Parabéns! O teu email foi redigido com estrutura impecável: destinatário válido, assunto claro, saudação respeitosa, corpo objetivo e assinatura identificada.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Escrever Outro Email
          </button>
        </div>
      ) : (
        <div className="space-y-2 bg-white rounded-xl p-3 border border-blue-100 shadow-xs text-xs">
          {/* Recipient */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-500 w-16">Para:</span>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="ex: professor.silva@escola.pt"
              className="w-full text-slate-800 outline-none placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Subject */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-500 w-16">Assunto:</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="ex: Dúvida sobre o trabalho de TIC"
              className="w-full text-slate-800 outline-none placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Greeting */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-500 w-16">Saudação:</span>
            <select
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="w-full text-slate-800 outline-none font-medium bg-transparent cursor-pointer"
            >
              <option value="">-- Escolhe uma saudação formal --</option>
              <option value="Caro Professor Silva,">Caro(a) Professor(a),</option>
              <option value="Estimado Professor,">Estimado(a) Professor(a),</option>
              <option value="Bom dia, Professor Silva,">Bom dia, Professor(a),</option>
            </select>
          </div>

          {/* Body */}
          <div className="pt-1">
            <textarea
              rows={2}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escreve a tua mensagem clara e com respeito..."
              className="w-full text-slate-800 outline-none placeholder:text-slate-400 font-medium resize-none"
            />
          </div>

          {/* Signoff */}
          <div className="border-t border-slate-100 pt-1.5">
            <input
              type="text"
              value={signoff}
              onChange={(e) => setSignoff(e.target.value)}
              placeholder="Assinatura (ex: Com os melhores cumprimentos, Maria, 5.º A)"
              className="w-full text-slate-800 outline-none placeholder:text-slate-400 font-medium text-[11px]"
            />
          </div>

          {/* Checklist & Send Button */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className={isValidEmail ? 'text-emerald-600 font-bold' : ''}>● Email</span>
              <span className={hasSubject ? 'text-emerald-600 font-bold' : ''}>● Assunto</span>
              <span className={hasGreeting ? 'text-emerald-600 font-bold' : ''}>● Saudação</span>
              <span className={hasBody ? 'text-emerald-600 font-bold' : ''}>● Corpo</span>
              <span className={hasSignoff ? 'text-emerald-600 font-bold' : ''}>● Assinatura</span>
            </div>

            <button
              onClick={handleSend}
              disabled={!isComplete}
              className={`w-full sm:w-auto px-4 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                isComplete
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" /> Enviar Mensagem
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
