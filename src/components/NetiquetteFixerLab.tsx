import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertTriangle, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface NetiquetteFixerLabProps {
  language?: Language;
}

export const NetiquetteFixerLab: React.FC<NetiquetteFixerLabProps> = ({ language = 'pt' }) => {
  const [activeVersion, setActiveVersion] = useState<'bad' | 'good'>('bad');

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 rounded-3xl border-2 border-indigo-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
            ✍️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Oficina de Netiqueta: Transformar um Email Ruim em Excelente' : 'Netiquette Workshop: From Poor to Perfect Email'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Compara um email descuidado com a versão educada e bem estruturada!'
                : 'Compare a careless email with a polite, well-structured message!'}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex rounded-xl bg-indigo-100 p-1">
          <button
            onClick={() => setActiveVersion('bad')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVersion === 'bad' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            ❌ Email Descuidado
          </button>
          <button
            onClick={() => setActiveVersion('good')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVersion === 'good' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            ✅ Email com Netiqueta
          </button>
        </div>
      </div>

      {/* Simulated Email Body Container */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-2xs space-y-3">
        <div className="space-y-1.5 text-xs text-slate-700 border-b border-slate-100 pb-3">
          <div className="flex gap-2">
            <span className="font-bold text-slate-500 w-16">Para:</span>
            <span className="font-mono text-slate-900">professor.silva@escola.pt</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-slate-500 w-16">Assunto:</span>
            <span className={`font-bold ${activeVersion === 'bad' ? 'text-rose-600' : 'text-slate-900'}`}>
              {activeVersion === 'bad' ? 'ENVIEI O TRABALHO!!!!' : 'Trabalho de TIC — Tiago Santos, 5.º B (N.º 14)'}
            </span>
          </div>
        </div>

        {/* Message Content */}
        <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed font-medium space-y-2 ${
          activeVersion === 'bad' ? 'bg-rose-50 text-rose-950 border border-rose-200' : 'bg-emerald-50 text-emerald-950 border border-emerald-200'
        }`}>
          {activeVersion === 'bad' ? (
            <>
              <p>PRECISO QUE VEJA ISTO AGORA SE NAO TIRO ZERO NA NOTA!! ANEXEI O FICHEIRO</p>
            </>
          ) : (
            <>
              <p>Bom dia, Professor Silva,</p>
              <p>Espero que se encontre bem.</p>
              <p>Envio em anexo o trabalho de TIC sobre "Segurança Digital" realizado pelo grupo da turma 5.º B.</p>
              <p>Se faltar alguma informação, por favor avise-me.</p>
              <p>Com os melhores cumprimentos,<br /><strong>Tiago Santos (N.º 14, 5.º B)</strong></p>
            </>
          )}
        </div>

        {/* Educational Diagnostic Highlights */}
        <div className="pt-2">
          {activeVersion === 'bad' ? (
            <div className="space-y-1.5 text-xs text-rose-800">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Erros Graves Identificados:</span>
              </p>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 font-medium">
                <li><strong>MAIÚSCULAS:</strong> Na Internet, escrever em maiúsculas equivale a <em>gritar</em>.</li>
                <li><strong>Sem Saudação nem Despedida:</strong> Falta de cortesia ("Bom dia" / "Cumprimentos").</li>
                <li><strong>Sem Identificação do Aluno:</strong> O professor não sabe quem é o remetente sem nome e turma.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-1.5 text-xs text-emerald-800">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Boas Práticas Cumpridas:</span>
              </p>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 font-medium">
                <li><strong>Assunto Claro:</strong> O professor identifica o tema e o aluno antes de abrir.</li>
                <li><strong>Linguagem Respeitosa:</strong> Saudação formal e tom educado.</li>
                <li><strong>Assinatura Completa:</strong> Nome, número e turma no fim da mensagem.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
