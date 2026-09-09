import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, EyeOff, Users, User, Trophy, Sparkles, ArrowRight, ShieldCheck, Mail, Send, HelpCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface CcBccSimulatorGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface Scenario {
  id: number;
  badge: { pt: string; en: string };
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  toField: string;
  correctField: 'para' | 'cc' | 'bcc';
  correctFieldName: { pt: string; en: string };
  explanation: { pt: string; en: string };
  privacyEffect: { pt: string; en: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    badge: { pt: 'Privacidade da Turma', en: 'Classroom Privacy' },
    title: {
      pt: 'Convite para o Piquenique de Final de Ano (28 Colegas)',
      en: 'Invitation to Year-End Picnic (28 Classmates)',
    },
    description: {
      pt: 'O delegado de turma quer enviar a todos os colegas as informações do piquenique. No entanto, muitos pais e alunos não querem que os seus endereços de email pessoais fiquem visíveis para todos os outros.',
      en: 'The class representative wants to email picnic details to all classmates without exposing everyone personal private email addresses to each other.',
    },
    toField: 'Delegado de Turma <delegado@escola.pt>',
    correctField: 'bcc',
    correctFieldName: { pt: 'Bcc / Cco (Cópia Oculta)', en: 'Bcc (Blind Carbon Copy)' },
    explanation: {
      pt: '🔒 Excelente! O campo Bcc / Cco (Cópia Oculta) esconde os endereços de todos os destinatários. Cada colega recebe o email sem saber o endereço dos restantes, cumprindo as regras de proteção de dados!',
      en: '🔒 Excellent! Bcc hides all recipient addresses. Each student receives the message without exposing others emails, protecting personal privacy!',
    },
    privacyEffect: {
      pt: 'Nenhum colega consegue ver o endereço dos outros 27 colegas.',
      en: 'No classmate can see the addresses of the other 27 recipients.',
    },
  },
  {
    id: 2,
    badge: { pt: 'Comunicação Direta', en: 'Direct Inquiry' },
    title: {
      pt: 'Dúvida Pessoal ao Professor de TIC',
      en: 'Personal Question to the ICT Teacher',
    },
    description: {
      pt: 'Estás a fazer um trabalho individual e precisas de perguntar ao professor se o ficheiro pode ser entregue em formato PDF ou em formato de apresentação.',
      en: 'You are doing individual homework and need to ask the teacher whether the file should be in PDF or slide format.',
    },
    toField: 'Professor Ricardo <ricardo.tic@escola.pt>',
    correctField: 'para',
    correctFieldName: { pt: 'Para (To)', en: 'To (Primary Recipient)' },
    explanation: {
      pt: '✉️ Correto! O campo "Para" destina-se ao destinatário principal a quem a mensagem e a pergunta são diretamente dirigidas e de quem se espera resposta.',
      en: '✉️ Correct! The "To" field is designed for the primary recipient who needs to act or answer your inquiry directly.',
    },
    privacyEffect: {
      pt: 'O professor é o destinatário direto exclusivo da mensagem.',
      en: 'The teacher is the direct and sole recipient of the message.',
    },
  },
  {
    id: 3,
    badge: { pt: 'Trabalho de Grupo', en: 'Group Collaboration' },
    title: {
      pt: 'Envio de Diapositivos ao Colega com Professor a Acompanhar',
      en: 'Sending Slides to Teammate with Teacher Informed',
    },
    description: {
      pt: 'Estás a enviar a tua parte do trabalho à tua colega de grupo (a Beatriz) para ela juntar ao ficheiro final, mas queres que o professor saiba que a tua parte já foi feita a tempo.',
      en: 'You are emailing your slide contribution to your project teammate (Beatriz) to merge, but want the teacher to observe that you delivered on time.',
    },
    toField: 'Beatriz <beatriz.aluna@escola.pt>',
    correctField: 'cc',
    correctFieldName: { pt: 'Cc (Com Conhecimento)', en: 'Cc (Carbon Copy)' },
    explanation: {
      pt: '👥 Perfeito! A Beatriz é quem tem de mexer no ficheiro ("Para"), e o professor fica em "Cc" apenas para tomar conhecimento de que o trabalho está a avançar.',
      en: '👥 Perfect! Beatriz is the action owner ("To"), and the teacher is in "Cc" to be kept in the loop without having to reply.',
    },
    privacyEffect: {
      pt: 'Tanto a Beatriz como o professor sabem que a mensagem foi enviada aos dois.',
      en: 'Both Beatriz and the teacher see each other transparently in the email.',
    },
  },
  {
    id: 4,
    badge: { pt: 'Clube Escolar', en: 'School Club' },
    title: {
      pt: 'Questionário a 60 Pais sobre o Clube de Robótica',
      en: 'Survey sent to 60 Parents about Robotics Club',
    },
    description: {
      pt: 'O clube de robótica vai enviar um formulário a 60 encarregados de educação de várias turmas diferentes para saber quem quer participar na visita de estudo.',
      en: 'The robotics club is sending an outing survey to 60 parents from multiple different classes.',
    },
    toField: 'Clube de Robótica <robotica@escola.pt>',
    correctField: 'bcc',
    correctFieldName: { pt: 'Bcc / Cco (Cópia Oculta)', en: 'Bcc (Blind Carbon Copy)' },
    explanation: {
      pt: '🛡️ Certíssimo! Nunca se devem expor listas de emails de encarregados de educação em "Para" ou "Cc", pois muitos não se conhecem. O Bcc protege a privacidade de todas as famílias.',
      en: '🛡️ Correct! Never expose mass mailing lists of parents in To or Cc. Bcc preserves family privacy!',
    },
    privacyEffect: {
      pt: 'Nenhum encarregado de educação tem acesso ao email das outras famílias.',
      en: 'No parent gains access to the private emails of other families.',
    },
  },
];

export const CcBccSimulatorGame: React.FC<CcBccSimulatorGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedField, setSelectedField] = useState<'para' | 'cc' | 'bcc' | null>(null);
  const [scores, setScores] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const t = translations[language];
  const currentScenario = SCENARIOS[currentIdx];

  const handleChoose = (field: 'para' | 'cc' | 'bcc') => {
    if (selectedField !== null) return;
    setSelectedField(field);
  };

  const handleNext = () => {
    if (selectedField === null) return;
    const isCorrect = selectedField === currentScenario.correctField;
    const nextScores = [...scores, isCorrect];
    setScores(nextScores);
    setSelectedField(null);

    if (currentIdx + 1 < SCENARIOS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setFinished(true);
      const totalCorrect = nextScores.filter(Boolean).length;
      const pct = Math.round((totalCorrect / SCENARIOS.length) * 100);
      onFinish(totalCorrect * 25, 100, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedField(null);
    setScores([]);
    setFinished(false);
  };

  const correctCount = scores.filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToTheme}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            {language === 'pt' ? 'Desafio Interativo: Correio Eletrónico' : 'Interactive Challenge: Email Dispatcher'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-amber-900 font-extrabold text-xs sm:text-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>100 XP</span>
        </div>
      </div>

      {!finished ? (
        <div className="space-y-6">
          {/* Progress & Intro Card */}
          <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500 text-white">
                {currentScenario.badge[language]} • {language === 'pt' ? `Caso ${currentIdx + 1} de ${SCENARIOS.length}` : `Case ${currentIdx + 1} of ${SCENARIOS.length}`}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {language === 'pt' ? '🎭 O Enigma dos Destinatários: Para, Cc ou Bcc?' : '🎭 The Mystery of To, Cc, or Bcc?'}
              </h2>
            </div>
            <div className="w-full sm:w-36 bg-white/20 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-blue-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / SCENARIOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Real simulated email compose window */}
          <div className="rounded-3xl bg-white border-2 border-blue-200 shadow-md overflow-hidden">
            {/* Window header */}
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-slate-700 ml-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  {language === 'pt' ? 'Nova Mensagem de Correio Eletrónico' : 'New Email Message'}
                </span>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {language === 'pt' ? 'Simulador de Envio' : 'Dispatch Simulator'}
              </span>
            </div>

            {/* Email Fields */}
            <div className="p-6 space-y-4">
              {/* Context Description */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
                <h3 className="text-sm font-black text-blue-950">
                  {currentScenario.title[language]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {currentScenario.description[language]}
                </p>
              </div>

              {/* Email Form Visualizer */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-500 w-24 sm:w-28 text-right">
                    {language === 'pt' ? 'Destinatários:' : 'Recipients:'}
                  </span>
                  <div className="flex-1 font-mono text-xs bg-slate-100 px-3 py-1.5 rounded-xl text-slate-800">
                    {currentScenario.toField}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <p className="font-black text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    {language === 'pt'
                      ? 'Onde deves colocar este grupo de pessoas para cumprir as boas práticas?'
                      : 'Where should you place this recipient group to follow best practices?'}
                  </p>

                  {/* 3 Interactive Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <button
                      type="button"
                      disabled={selectedField !== null}
                      onClick={() => handleChoose('para')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                        selectedField === 'para'
                          ? selectedField === currentScenario.correctField
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                            : 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-400'
                          : selectedField !== null
                          ? 'opacity-40 bg-slate-100 border-slate-200'
                          : 'bg-white hover:bg-blue-50 hover:border-blue-400 border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                        <User className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Para (To)</span>
                      </div>
                      <span className="text-[11px] text-slate-600 leading-snug">
                        {language === 'pt' ? 'Destinatário principal que deve responder' : 'Main action recipient'}
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={selectedField !== null}
                      onClick={() => handleChoose('cc')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                        selectedField === 'cc'
                          ? selectedField === currentScenario.correctField
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                            : 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-400'
                          : selectedField !== null
                          ? 'opacity-40 bg-slate-100 border-slate-200'
                          : 'bg-white hover:bg-indigo-50 hover:border-indigo-400 border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                        <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Cc (Com Conhecimento)</span>
                      </div>
                      <span className="text-[11px] text-slate-600 leading-snug">
                        {language === 'pt' ? 'Para ficar informado (visível a todos)' : 'Kept informed (publicly visible)'}
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={selectedField !== null}
                      onClick={() => handleChoose('bcc')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                        selectedField === 'bcc'
                          ? selectedField === currentScenario.correctField
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                            : 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-400'
                          : selectedField !== null
                          ? 'opacity-40 bg-slate-100 border-slate-200'
                          : 'bg-white hover:bg-emerald-50 hover:border-emerald-400 border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                        <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bcc / Cco (Cópia Oculta)</span>
                      </div>
                      <span className="text-[11px] text-slate-600 leading-snug">
                        {language === 'pt' ? 'Protege a privacidade de todos os emails' : 'Hides all addresses for privacy'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Feedback box */}
              {selectedField !== null && (
                <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3 animate-in fade-in">
                  <div className="flex items-start gap-2.5">
                    {selectedField === currentScenario.correctField ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-black text-xs sm:text-sm text-slate-900">
                        {selectedField === currentScenario.correctField
                          ? language === 'pt'
                            ? '🎉 Escolha Pedagógica Perfeita!'
                            : '🎉 Perfect Choice!'
                          : language === 'pt'
                          ? `A opção correta seria: ${currentScenario.correctFieldName[language]}`
                          : `The correct option was: ${currentScenario.correctFieldName[language]}`}
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {currentScenario.explanation[language]}
                      </p>
                      <div className="pt-2 text-[11px] font-bold text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                        💡 {language === 'pt' ? 'Efeito na Privacidade: ' : 'Privacy Effect: '}
                        <span className="font-normal">{currentScenario.privacyEffect[language]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                    >
                      <span>
                        {currentIdx + 1 < SCENARIOS.length
                          ? language === 'pt'
                            ? 'Próximo Caso'
                            : 'Next Case'
                          : language === 'pt'
                          ? 'Ver Resultado Final'
                          : 'See Final Score'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Completed Result Screen */
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white text-center space-y-6 shadow-2xl border-2 border-blue-400/30 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-950 text-4xl flex items-center justify-center mx-auto shadow-xl">
            📧
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-300 px-3 py-1 rounded-full bg-blue-400/20 border border-blue-400/30">
              {language === 'pt' ? 'Desafio Superado com Sucesso!' : 'Challenge Completed!'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              {language === 'pt' ? 'Mestre do Correio Eletrónico e Privacidade!' : 'Master of Email Privacy & Etiquette!'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
              {language === 'pt'
                ? `Acertaste em ${correctCount} de ${SCENARIOS.length} casos de envio. Agora dominas a utilização do Para, Cc e Bcc e sabes como salvaguardar os dados dos teus colegas e professores!`
                : `You mastered ${correctCount} of ${SCENARIOS.length} scenarios!`}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 font-black text-lg">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>+100 XP Ganho!</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Repetir Desafio' : 'Try Again'}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all cursor-pointer"
            >
              <span>{language === 'pt' ? 'Concluir e Voltar aos Desafios' : 'Finish & Return'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

