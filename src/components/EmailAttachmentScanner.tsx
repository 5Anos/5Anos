import React, { useState } from 'react';
import { Paperclip, ShieldAlert, CheckCircle2, Trash2, FileText, AlertTriangle, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface EmailAttachmentScannerProps {
  language?: Language;
}

interface AttachmentItem {
  id: string;
  sender: string;
  filename: string;
  size: string;
  isSafe: boolean;
  explanation: string;
}

const ATTACHMENTS: AttachmentItem[] = [
  {
    id: 'a1',
    sender: 'prof.martins@escola.pt (Professor de História)',
    filename: 'Ficha_Revisao_Modulo1.pdf',
    size: '340 KB',
    isSafe: true,
    explanation: 'Ficheiro Seguro (.pdf) vindo do email institucional do professor da escola.',
  },
  {
    id: 'a2',
    sender: 'premio-sorteio-2026@desconhecido.xyz',
    filename: 'Instalar_Robux_Gratis.exe',
    size: '12.4 MB',
    isSafe: false,
    explanation: 'Muito Perigoso (.exe)! Ficheiros executáveis vindos de desconhecidos instalam vírus e roubam palavras-passe.',
  },
  {
    id: 'a3',
    sender: 'ana.pereira@alunos.escola.pt (Colega de Turma)',
    filename: 'Apresentacao_Ciencias_Vulcões.pptx',
    size: '2.1 MB',
    isSafe: true,
    explanation: 'Ficheiro de Apresentação (.pptx) de colega com quem estás a fazer o trabalho de grupo.',
  },
];

export const EmailAttachmentScanner: React.FC<EmailAttachmentScannerProps> = ({ language = 'pt' }) => {
  const [decisions, setDecisions] = useState<Record<string, 'open' | 'delete'>>({});

  const handleAction = (id: string, action: 'open' | 'delete') => {
    setDecisions((prev) => ({ ...prev, [id]: action }));
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-50/70 via-white to-blue-50/70 rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
            📎
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Scanner de Anexos: Abrir ou Enviar para o Lixo?' : 'Attachment Scanner: Open or Delete?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Analisa a extensão (.pdf, .exe, .pptx) e o remetente antes de abrir qualquer anexo!'
                : 'Check file extensions (.pdf, .exe, .pptx) and senders before opening attachments!'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {ATTACHMENTS.map((item) => {
          const userAction = decisions[item.id];
          const hasDecided = userAction !== undefined;
          const isCorrect = (item.isSafe && userAction === 'open') || (!item.isSafe && userAction === 'delete');

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                hasDecided
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold block">De: {item.sender}</span>
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-slate-500" />
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">{item.filename}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({item.size})</span>
                  </div>
                </div>

                {!hasDecided ? (
                  <div className="flex gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleAction(item.id, 'open')}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-emerald-600 hover:text-white text-indigo-700 text-xs font-bold transition-colors cursor-pointer border border-indigo-200 flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Abrir Anexo</span>
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'delete')}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-600 hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-medium space-y-0.5">
                    <p className={`font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
                      <span>{isCorrect ? 'Decisão Perfeita!' : 'Atenção ao Formato!'}</span>
                    </p>
                    <p className="text-slate-700 text-[11px]">{item.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
