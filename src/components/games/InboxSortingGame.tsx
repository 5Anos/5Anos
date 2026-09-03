import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Folder, Trash2, Mail, GraduationCap } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface InboxSortingGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface EmailItem {
  id: number;
  sender: string;
  subject: { pt: string; en: string };
  preview: { pt: string; en: string };
  correctFolder: 'school' | 'spam' | 'inbox';
  explanation: { pt: string; en: string };
}

const EMAILS: EmailItem[] = [
  {
    id: 1,
    sender: 'direcao@escola.pt',
    subject: { pt: 'Calendário de Avaliações do 2.º Período', en: '2nd Term Exam Calendar' },
    preview: { pt: 'Estimados alunos e encarregados de educação, enviamos o calendário...', en: 'Dear students and families, please find attached the exam calendar...' },
    correctFolder: 'school',
    explanation: {
      pt: 'Mensagem oficial da escola: deve ser arquivada na pasta Escola / Turma para consulta rápida.',
      en: 'Official school announcement: best stored in School / Class folder for easy reference.',
    },
  },
  {
    id: 2,
    sender: 'premio-sorteio-55@ganha-dinheiro.xyz',
    subject: { pt: '🎉 Parabéns! Ganhaste um iPhone 16!', en: '🎉 Congratulations! You won an iPhone 16!' },
    preview: { pt: 'Clica aqui nas próximas 2 horas para levantares o teu prémio grátis...', en: 'Click here within 2 hours to claim your free reward...' },
    correctFolder: 'spam',
    explanation: {
      pt: 'Spam e tentativa de burla! Nunca abras links e move logo para a pasta Spam / Lixo.',
      en: 'Spam and scam attempt! Never click links; move directly to Spam / Trash.',
    },
  },
  {
    id: 3,
    sender: 'rita.martins.5a@escola.pt',
    subject: { pt: 'Dúvida sobre a apresentação de Ciências', en: 'Question about Science presentation' },
    preview: { pt: 'Olá! Já dividiste os diapositivos para a apresentação de amanhã?', en: 'Hi! Have you divided the slides for tomorrow presentation?' },
    correctFolder: 'inbox',
    explanation: {
      pt: 'Mensagem direta de uma colega de trabalho de grupo: pertence à Caixa de Entrada Principal.',
      en: 'Direct collaboration message from a group peer: belongs in Main Inbox.',
    },
  },
  {
    id: 4,
    sender: 'suporte-urgente@seguranca-online-banco.ru',
    subject: { pt: 'Bloqueio de segurança da tua conta', en: 'Security lock on your account' },
    preview: { pt: 'A tua palavra-passe expirou. Clica aqui para reativar...', en: 'Your password expired. Click here to reactivate...' },
    correctFolder: 'spam',
    explanation: {
      pt: 'Phishing evidente! Mensagem alarmista com domínio falso. Destino: Spam.',
      en: 'Blatant phishing! Alarmist subject with fake domain. Destination: Spam.',
    },
  },
  {
    id: 5,
    sender: 'biblioteca@escola.pt',
    subject: { pt: 'Devolução de livro requisitado', en: 'Library book return reminder' },
    preview: { pt: 'Lembramos que o livro requisitado tem data limite na próxima sexta-feira...', en: 'Friendly reminder that your borrowed book is due next Friday...' },
    correctFolder: 'school',
    explanation: {
      pt: 'Comunicação do serviço da biblioteca escolar: pasta Escola / Turma.',
      en: 'School library notification: store in School / Class folder.',
    },
  },
];

export const InboxSortingGame: React.FC<InboxSortingGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const t = translations[language];
  const currentEmail = EMAILS[currentIdx];

  const handleClassify = (folder: 'school' | 'spam' | 'inbox') => {
    if (feedback !== null) return;
    const isCorrect = folder === currentEmail.correctFolder;
    setAnswers((prev) => ({ ...prev, [currentEmail.id]: isCorrect }));
    setFeedback(isCorrect);
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentIdx + 1 < EMAILS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setDone(true);
      const correctCount = Object.values(answers).filter(Boolean).length;
      const pct = Math.round((correctCount / EMAILS.length) * 100);
      onFinish(correctCount * 2, EMAILS.length * 2, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setFeedback(null);
    setDone(false);
  };

  const correctCount = Object.values(answers).filter(Boolean).length;

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
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 2' : 'Challenge 2'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {language === 'pt' ? '🗂️ O Organizador de Correio' : '🗂️ The Mailbox Organizer'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {language === 'pt'
            ? 'Classifica cada mensagem na pasta correta: Principal, Escola ou Spam/Lixo.'
            : 'Sort each incoming email into the right folder: Inbox, School, or Spam.'}
        </p>
      </div>

      {!done ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
            <span>
              {language === 'pt' ? `Email ${currentIdx + 1} de ${EMAILS.length}` : `Email ${currentIdx + 1} of ${EMAILS.length}`}
            </span>
            <span>
              {language === 'pt' ? `Acertos: ${correctCount}` : `Correct: ${correctCount}`}
            </span>
          </div>

          {/* Email Preview card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500">{currentEmail.sender}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {currentEmail.subject[language]}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {currentEmail.preview[language]}
            </p>
          </div>

          {/* Destination Folder Buttons */}
          {feedback === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleClassify('inbox')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex flex-col items-center gap-2 cursor-pointer transition-all"
              >
                <Mail className="w-6 h-6 text-blue-600" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {language === 'pt' ? 'Caixa Principal' : 'Main Inbox'}
                </span>
              </button>

              <button
                onClick={() => handleClassify('school')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex flex-col items-center gap-2 cursor-pointer transition-all"
              >
                <GraduationCap className="w-6 h-6 text-emerald-600" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {language === 'pt' ? 'Escola / Turma' : 'School / Class'}
                </span>
              </button>

              <button
                onClick={() => handleClassify('spam')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/50 flex flex-col items-center gap-2 cursor-pointer transition-all"
              >
                <Trash2 className="w-6 h-6 text-rose-600" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {language === 'pt' ? 'Spam / Lixo' : 'Spam / Trash'}
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className={`p-4 rounded-2xl ${
                feedback ? 'bg-emerald-100/80 text-emerald-950' : 'bg-rose-100/80 text-rose-950'
              }`}>
                <p className="font-bold text-sm">
                  {feedback
                    ? (language === 'pt' ? '🎉 Pasta correta!' : '🎉 Correct folder!')
                    : (language === 'pt' ? '⚠️ Pasta incorreta.' : '⚠️ Incorrect folder.')}
                </p>
                <p className="text-xs sm:text-sm mt-1">{currentEmail.explanation[language]}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                {currentIdx + 1 < EMAILS.length
                  ? (language === 'pt' ? 'Próximo Email →' : 'Next Email →')
                  : (language === 'pt' ? 'Ver Resultado 🏆' : 'View Result 🏆')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm text-center space-y-4 animate-in zoom-in-95">
          <div className="text-5xl">🏆</div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {language === 'pt' ? 'Caixa de Correio Impecável!' : 'Mailbox Organized!'}
          </h2>
          <p className="text-base text-slate-600">
            {language === 'pt'
              ? `Organizaste corretamente ${correctCount} de ${EMAILS.length} mensagens.`
              : `You sorted ${correctCount} out of ${EMAILS.length} messages correctly.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm cursor-pointer"
            >
              {t.backToTheme}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
