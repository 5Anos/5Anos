import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, EyeOff, Users, User } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface CcBccSimulatorGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface Scenario {
  id: number;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  correctField: 'para' | 'cc' | 'bcc';
  explanation: { pt: string; en: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: {
      pt: 'Convocatória para Todos os 26 Alunos da Turma',
      en: 'Meeting notice for all 26 classmates',
    },
    description: {
      pt: 'O delegado de turma quer enviar um convite para o piquenique do final do ano a todos os colegas, mas deve proteger a privacidade dos emails de toda a gente para que ninguém veja os endereços pessoais dos outros.',
      en: 'The class representative wants to send a picnic invitation to all 26 students, but must safeguard everyone email privacy so addresses remain private.',
    },
    correctField: 'bcc',
    explanation: {
      pt: 'Bcc / Cco (Cópia Oculta)! Protege os dados pessoais dos colegas. Nenhum destinatário consegue ver o email dos restantes.',
      en: 'Bcc (Blind Carbon Copy)! Protects everyone personal privacy so recipients cannot see each other emails.',
    },
  },
  {
    id: 2,
    title: {
      pt: 'Dúvida Direta ao Professor',
      en: 'Direct question to the Teacher',
    },
    description: {
      pt: 'Estás a fazer um trabalho individual e precisas de perguntar ao professor Ricardo se a entrega pode ser em formato PDF.',
      en: 'You are doing individual homework and need to ask Teacher Ricardo if submission can be in PDF format.',
    },
    correctField: 'para',
    explanation: {
      pt: 'Para (To)! É o destinatário principal a quem a mensagem e a pergunta são dirigidas diretamente.',
      en: 'To! This is the primary recipient whom the message and direct inquiry address.',
    },
  },
  {
    id: 3,
    title: {
      pt: 'Trabalho de Grupo com o Professor a Acompanhar',
      en: 'Group project with Teacher kept informed',
    },
    description: {
      pt: 'Estás a enviar a versão final do diapositivo para o teu colega de grupo editar, mas queres que o professor saiba que o trabalho já está a avançar.',
      en: 'You are emailing the draft slides to your project teammate to edit, while keeping your teacher in the loop.',
    },
    correctField: 'cc',
    explanation: {
      pt: 'Cc (Com Conhecimento)! O colega é o destinatário principal ("Para") e o professor fica em Cc apenas para acompanhar.',
      en: 'Cc (Carbon Copy)! Teammate is in "To" and the teacher is in "Cc" purely for informational oversight.',
    },
  },
];

export const CcBccSimulatorGame: React.FC<CcBccSimulatorGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedField, setSelectedField] = useState<'para' | 'cc' | 'bcc' | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const t = translations[language];
  const currentScenario = SCENARIOS[currentIdx];

  const handleChoose = (field: 'para' | 'cc' | 'bcc') => {
    if (selectedField !== null) return;
    setSelectedField(field);
    if (field === currentScenario.correctField) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedField(null);
    if (currentIdx + 1 < SCENARIOS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setFinished(true);
      const isLastCorrect = selectedField === currentScenario.correctField;
      const finalScore = score + (isLastCorrect ? 1 : 0);
      const pct = Math.round((finalScore / SCENARIOS.length) * 100);
      onFinish(finalScore * 5, SCENARIOS.length * 5, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedField(null);
    setScore(0);
    setFinished(false);
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
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 3' : 'Challenge 3'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {language === 'pt' ? '🎭 O Enigma do Cc e Bcc' : '🎭 The Mystery of Cc & Bcc'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {language === 'pt'
            ? 'Descobre quando usar Para, Cc (Com conhecimento) ou Bcc/Cco (Cópia oculta para proteger a privacidade).'
            : 'Learn when to use To, Cc, or Bcc (Blind Carbon Copy to safeguard personal data).'}
        </p>
      </div>

      {!finished ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
            <span>
              {language === 'pt' ? `Situação ${currentIdx + 1} de ${SCENARIOS.length}` : `Scenario ${currentIdx + 1} of ${SCENARIOS.length}`}
            </span>
            <span>
              {language === 'pt' ? `Acertos: ${score}` : `Score: ${score}`}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-blue-950">
              {currentScenario.title[language]}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentScenario.description[language]}
            </p>
          </div>

          {/* Three Choice Cards */}
          {selectedField === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleChoose('para')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex flex-col items-center gap-2 cursor-pointer transition-all"
              >
                <User className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-bold text-slate-900">Para (To)</span>
                <span className="text-[11px] text-slate-500 text-center">
                  {language === 'pt' ? 'Destinatário principal' : 'Main recipient'}
                </span>
              </button>

              <button
                onClick={() => handleChoose('cc')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 flex flex-col items-center gap-2 cursor-pointer transition-all"
              >
                <Users className="w-6 h-6 text-indigo-600" />
                <span className="text-sm font-bold text-slate-900">Cc</span>
                <span className="text-[11px] text-slate-500 text-center">
                  {language === 'pt' ? 'Com conhecimento (visível)' : 'Carbon copy (visible)'}
                </span>
              </button>

              <button
                onClick={() => handleChoose('bcc')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex flex-col items-center gap-2 cursor-pointer transition-all"
              >
                <EyeOff className="w-6 h-6 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900">Bcc / Cco</span>
                <span className="text-[11px] text-slate-500 text-center">
                  {language === 'pt' ? 'Cópia oculta (privacidade)' : 'Blind copy (private)'}
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className={`p-4 rounded-2xl ${
                selectedField === currentScenario.correctField ? 'bg-emerald-100/80 text-emerald-950' : 'bg-rose-100/80 text-rose-950'
              }`}>
                <p className="font-bold text-sm">
                  {selectedField === currentScenario.correctField
                    ? (language === 'pt' ? '🎉 Resposta Perfeita!' : '🎉 Perfect Choice!')
                    : (language === 'pt' ? '⚠️ Opção diferente da recomendada.' : '⚠️ Different field recommended.')}
                </p>
                <p className="text-xs sm:text-sm mt-1">{currentScenario.explanation[language]}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                {currentIdx + 1 < SCENARIOS.length
                  ? (language === 'pt' ? 'Próxima Situação →' : 'Next Scenario →')
                  : (language === 'pt' ? 'Ver Resultado 🏆' : 'View Result 🏆')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm text-center space-y-4 animate-in zoom-in-95">
          <div className="text-5xl">🏆</div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {language === 'pt' ? 'Enigma Resolvido!' : 'Enigma Solved!'}
          </h2>
          <p className="text-base text-slate-600">
            {language === 'pt'
              ? `Acertaste em ${score} de ${SCENARIOS.length} cenários de correio eletrónico.`
              : `You scored ${score} out of ${SCENARIOS.length} email scenarios.`}
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
