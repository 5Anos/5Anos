import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Send,
  Paperclip,
  Link as LinkIcon,
  Smile,
  MoreHorizontal,
  Search,
  Settings,
  HelpCircle,
  User,
  Inbox,
  SendHorizontal,
  FileEdit,
  Trash2,
  FileText,
  MessageSquare,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  RotateCcw,
  XCircle,
  AlertTriangle,
  Star,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface EmailLabGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface DraggableOption {
  id: string;
  type: 'recipient' | 'subject' | 'body' | 'attachment' | 'cc' | 'sender';
  content: string;
  iconType: 'mail' | 'file' | 'message' | 'clip' | 'users' | 'user';
  colorBg: string;
  colorBorder: string;
  colorText: string;
  iconColor: string;
  correctSlot?: 'to' | 'subject' | 'body' | 'attachment' | 'cc';
}

interface EvaluationDetail {
  id: string;
  fieldLabel: string;
  expectedLabel: string;
  userPlacedContent: string | null;
  score: number;
  maxScore: number;
  isCorrect: boolean;
  status: 'correct' | 'incorrect' | 'missing';
  feedback: string;
}

interface EvaluationResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  details: EvaluationDetail[];
  overallTitle: string;
  overallDescription: string;
  stars: number;
}

const getInitialOptions = (lang: Language): DraggableOption[] => [
  {
    id: 'opt-recipient',
    type: 'recipient',
    content: 'professor@escola.pt',
    iconType: 'mail',
    colorBg: 'bg-purple-50 hover:bg-purple-100/80',
    colorBorder: 'border-purple-200',
    colorText: 'text-purple-900',
    iconColor: 'text-purple-600 bg-purple-100',
    correctSlot: 'to',
  },
  {
    id: 'opt-cc',
    type: 'cc',
    content: 'colegas_grupo@escola.pt',
    iconType: 'users',
    colorBg: 'bg-rose-50 hover:bg-rose-100/80',
    colorBorder: 'border-rose-200',
    colorText: 'text-rose-950',
    iconColor: 'text-rose-600 bg-rose-100',
    correctSlot: 'cc',
  },
  {
    id: 'opt-subject',
    type: 'subject',
    content: lang === 'pt' ? 'Trabalho de TIC' : 'ICT Assignment',
    iconType: 'file',
    colorBg: 'bg-emerald-50 hover:bg-emerald-100/80',
    colorBorder: 'border-emerald-200',
    colorText: 'text-emerald-900',
    iconColor: 'text-emerald-600 bg-emerald-100',
    correctSlot: 'subject',
  },
  {
    id: 'opt-body',
    type: 'body',
    content:
      lang === 'pt'
        ? 'Caro Professor,\nSegue em anexo o trabalho de TIC realizado pelo nosso grupo.\nCom os melhores cumprimentos,\nJoão Silva'
        : 'Dear Teacher,\nPlease find attached our group ICT assignment.\nBest regards,\nJohn Smith',
    iconType: 'message',
    colorBg: 'bg-sky-50 hover:bg-sky-100/80',
    colorBorder: 'border-sky-200',
    colorText: 'text-sky-900',
    iconColor: 'text-sky-600 bg-sky-100',
    correctSlot: 'body',
  },
  {
    id: 'opt-attachment',
    type: 'attachment',
    content: lang === 'pt' ? 'trabalho_tic.docx' : 'ict_assignment.docx',
    iconType: 'clip',
    colorBg: 'bg-amber-50 hover:bg-amber-100/80',
    colorBorder: 'border-amber-200',
    colorText: 'text-amber-950',
    iconColor: 'text-amber-600 bg-amber-100',
    correctSlot: 'attachment',
  },
  {
    id: 'opt-distractor',
    type: 'recipient',
    content: 'amigo@escola.pt',
    iconType: 'mail',
    colorBg: 'bg-slate-50 hover:bg-slate-100/80',
    colorBorder: 'border-slate-200',
    colorText: 'text-slate-700',
    iconColor: 'text-slate-600 bg-slate-100',
  },
];

type SlotKey = 'to' | 'cc' | 'subject' | 'body' | 'attachment';

export const EmailLabGame: React.FC<EmailLabGameProps> = ({ language, onBack, onFinish }) => {
  const t = translations[language];
  const initialOptions = React.useMemo(() => getInitialOptions(language), [language]);

  const [placedSlots, setPlacedSlots] = useState<{ [key in SlotKey]?: DraggableOption | null }>({
    to: null,
    cc: null,
    subject: null,
    body: null,
    attachment: null,
  });

  const [draggedOption, setDraggedOption] = useState<DraggableOption | null>(null);
  const [activeDropTarget, setActiveDropTarget] = useState<SlotKey | null>(null);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'message' | 'insert' | 'format' | 'options'>('message');

  // Available options (not yet placed)
  const placedOptionIds = new Set(
    Object.values(placedSlots)
      .filter((opt): opt is DraggableOption => Boolean(opt))
      .map((opt) => opt.id)
  );

  const availableOptions = initialOptions.filter((opt) => !placedOptionIds.has(opt.id));

  // Pure Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, option: DraggableOption) => {
    setDraggedOption(option);
    e.dataTransfer.setData('text/plain', option.id);
  };

  const handleDragEnd = () => {
    setDraggedOption(null);
    setActiveDropTarget(null);
  };

  const handleDragOver = (e: React.DragEvent, slot: SlotKey) => {
    e.preventDefault();
    setActiveDropTarget(slot);
  };

  const handleDragLeave = () => {
    setActiveDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent, slot: SlotKey) => {
    e.preventDefault();
    setActiveDropTarget(null);
    if (!draggedOption) return;

    // Place into slot
    setPlacedSlots((prev) => ({
      ...prev,
      [slot]: draggedOption,
    }));
    setDraggedOption(null);
    setValidationError(null);
  };

  const handleRemoveFromSlot = (slot: SlotKey, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlacedSlots((prev) => ({
      ...prev,
      [slot]: null,
    }));
    setValidationError(null);
  };

  const handleReset = () => {
    setPlacedSlots({
      to: null,
      cc: null,
      subject: null,
      body: null,
      attachment: null,
    });
    setDraggedOption(null);
    setValidationError(null);
    setIsCompleted(false);
    setEvaluationResult(null);
  };

  const handleTryAgain = () => {
    setIsCompleted(false);
  };

  // Detailed Evaluation Calculation
  const calculateEvaluation = (): EvaluationResult => {
    const details: EvaluationDetail[] = [];

    // 1. Campo "Para" (Destinatário Principal) - 25 pts
    const toOpt = placedSlots.to;
    if (toOpt?.id === 'opt-recipient') {
      details.push({
        id: 'to',
        fieldLabel: language === 'pt' ? 'Destinatário Principal (Para)' : 'Recipient (To)',
        expectedLabel: 'professor@escola.pt',
        userPlacedContent: toOpt.content,
        score: 25,
        maxScore: 25,
        isCorrect: true,
        status: 'correct',
        feedback:
          language === 'pt'
            ? 'Excelente! Colocaste o email do teu professor ("professor@escola.pt") como destinatário principal da mensagem.'
            : 'Excellent! You set the teacher as the main recipient.',
      });
    } else if (toOpt) {
      details.push({
        id: 'to',
        fieldLabel: language === 'pt' ? 'Destinatário Principal (Para)' : 'Recipient (To)',
        expectedLabel: 'professor@escola.pt',
        userPlacedContent: toOpt.content.length > 30 ? toOpt.content.slice(0, 30) + '...' : toOpt.content,
        score: 0,
        maxScore: 25,
        isCorrect: false,
        status: 'incorrect',
        feedback:
          language === 'pt'
            ? `Incorreto. O trabalho deve ser entregue ao professor ("professor@escola.pt") no campo "Para", mas colocaste "${toOpt.content.slice(0, 25)}".`
            : `Incorrect recipient. The work must be sent to the teacher (professor@escola.pt).`,
      });
    } else {
      details.push({
        id: 'to',
        fieldLabel: language === 'pt' ? 'Destinatário Principal (Para)' : 'Recipient (To)',
        expectedLabel: 'professor@escola.pt',
        userPlacedContent: null,
        score: 0,
        maxScore: 25,
        isCorrect: false,
        status: 'missing',
        feedback:
          language === 'pt'
            ? 'Em falta. Não colocaste o endereço do professor ("professor@escola.pt") no campo "Para".'
            : 'Missing. The "To" field is empty.',
      });
    }

    // 2. Campo "Cc" (Com Conhecimento aos Colegas) - 20 pts
    const ccOpt = placedSlots.cc;
    if (ccOpt?.id === 'opt-cc') {
      details.push({
        id: 'cc',
        fieldLabel: language === 'pt' ? 'Com Conhecimento (Cc)' : 'Carbon Copy (Cc)',
        expectedLabel: 'colegas_grupo@escola.pt',
        userPlacedContent: ccOpt.content,
        score: 20,
        maxScore: 20,
        isCorrect: true,
        status: 'correct',
        feedback:
          language === 'pt'
            ? 'Muito bem! Deste conhecimento (Cc) aos colegas do grupo ("colegas_grupo@escola.pt") para que acompanhem a entrega do trabalho.'
            : 'Well done! You included your group teammates ("colegas_grupo@escola.pt") in CC so they can follow the submission.',
      });
    } else if (ccOpt) {
      details.push({
        id: 'cc',
        fieldLabel: language === 'pt' ? 'Com Conhecimento (Cc)' : 'Carbon Copy (Cc)',
        expectedLabel: 'colegas_grupo@escola.pt',
        userPlacedContent: ccOpt.content.length > 30 ? ccOpt.content.slice(0, 30) + '...' : ccOpt.content,
        score: 0,
        maxScore: 20,
        isCorrect: false,
        status: 'incorrect',
        feedback:
          language === 'pt'
            ? 'Incorreto. No campo "Cc" deves colocar o endereço dos colegas de grupo ("colegas_grupo@escola.pt").'
            : 'Incorrect. In the "Cc" field you should place your group teammates address ("colegas_grupo@escola.pt").',
      });
    } else {
      details.push({
        id: 'cc',
        fieldLabel: language === 'pt' ? 'Com Conhecimento (Cc)' : 'Carbon Copy (Cc)',
        expectedLabel: 'colegas_grupo@escola.pt',
        userPlacedContent: null,
        score: 0,
        maxScore: 20,
        isCorrect: false,
        status: 'missing',
        feedback:
          language === 'pt'
            ? 'Em falta. As instruções pediam para dar conhecimento (Cc) aos teus colegas de grupo ("colegas_grupo@escola.pt").'
            : 'Missing. The instructions asked to include your teammates in CC ("colegas_grupo@escola.pt").',
      });
    }

    // 3. Campo "Assunto" - 20 pts
    const subjectOpt = placedSlots.subject;
    const expectedSubject = language === 'pt' ? 'Trabalho de TIC' : 'ICT Assignment';
    if (subjectOpt?.id === 'opt-subject') {
      details.push({
        id: 'subject',
        fieldLabel: language === 'pt' ? 'Assunto' : 'Subject',
        expectedLabel: expectedSubject,
        userPlacedContent: subjectOpt.content,
        score: 20,
        maxScore: 20,
        isCorrect: true,
        status: 'correct',
        feedback:
          language === 'pt'
            ? 'Muito bem! O assunto resume de forma clara e objetiva o tema da mensagem.'
            : 'Well done! The subject clearly and concisely summarizes the message topic.',
      });
    } else if (subjectOpt) {
      details.push({
        id: 'subject',
        fieldLabel: language === 'pt' ? 'Assunto' : 'Subject',
        expectedLabel: expectedSubject,
        userPlacedContent: subjectOpt.content.length > 30 ? subjectOpt.content.slice(0, 30) + '...' : subjectOpt.content,
        score: 0,
        maxScore: 20,
        isCorrect: false,
        status: 'incorrect',
        feedback:
          language === 'pt'
            ? `Incorreto. O assunto deve ser um título conciso ("${expectedSubject}"), e não outro elemento do email.`
            : `Incorrect. The subject should be a concise title ("${expectedSubject}"), not another element.`,
      });
    } else {
      details.push({
        id: 'subject',
        fieldLabel: language === 'pt' ? 'Assunto' : 'Subject',
        expectedLabel: expectedSubject,
        userPlacedContent: null,
        score: 0,
        maxScore: 20,
        isCorrect: false,
        status: 'missing',
        feedback:
          language === 'pt'
            ? 'Em falta. O campo "Assunto" ficou em branco. Um email escolar deve ter sempre um assunto explícito.'
            : 'Missing. The "Subject" field was left empty. A school email must always have an explicit subject.',
      });
    }

    // 4. Campo "Mensagem" (Corpo) - 25 pts
    const bodyOpt = placedSlots.body;
    if (bodyOpt?.id === 'opt-body') {
      details.push({
        id: 'body',
        fieldLabel: language === 'pt' ? 'Corpo da Mensagem' : 'Message Body',
        expectedLabel: language === 'pt' ? 'Saudação ao Professor + Texto + Despedida' : 'Greeting + Body + Sign-off',
        userPlacedContent: bodyOpt.content.length > 35 ? bodyOpt.content.slice(0, 35) + '...' : bodyOpt.content,
        score: 25,
        maxScore: 25,
        isCorrect: true,
        status: 'correct',
        feedback:
          language === 'pt'
            ? 'Excelente! A mensagem tem saudação formal, explica a entrega do trabalho e termina com despedida e identificação.'
            : 'Excellent! The message contains a formal greeting, explains the submission, and ends with a polite sign-off and student name.',
      });
    } else if (bodyOpt) {
      details.push({
        id: 'body',
        fieldLabel: language === 'pt' ? 'Corpo da Mensagem' : 'Message Body',
        expectedLabel: language === 'pt' ? 'Saudação ao Professor + Texto + Despedida' : 'Greeting + Body + Sign-off',
        userPlacedContent: bodyOpt.content.length > 35 ? bodyOpt.content.slice(0, 35) + '...' : bodyOpt.content,
        score: 0,
        maxScore: 25,
        isCorrect: false,
        status: 'incorrect',
        feedback:
          language === 'pt'
            ? 'Incorreto. O campo da mensagem deve conter o texto completo estruturado.'
            : 'Incorrect. The message body must contain the complete structured text.',
      });
    } else {
      details.push({
        id: 'body',
        fieldLabel: language === 'pt' ? 'Corpo da Mensagem' : 'Message Body',
        expectedLabel: language === 'pt' ? 'Saudação ao Professor + Texto + Despedida' : 'Greeting + Body + Sign-off',
        userPlacedContent: null,
        score: 0,
        maxScore: 25,
        isCorrect: false,
        status: 'missing',
        feedback:
          language === 'pt'
            ? 'Em falta. O corpo do email está vazio. Lembra-te de incluir a saudação, a mensagem e a despedida.'
            : 'Missing. The email body is empty. Remember to include greeting, message, and sign-off.',
      });
    }

    // 5. Campo "Anexo" - 10 pts
    const attOpt = placedSlots.attachment;
    const expectedAttachment = language === 'pt' ? 'trabalho_tic.docx' : 'ict_assignment.docx';
    if (attOpt?.id === 'opt-attachment') {
      details.push({
        id: 'attachment',
        fieldLabel: language === 'pt' ? 'Anexo do Ficheiro' : 'Attachment',
        expectedLabel: expectedAttachment,
        userPlacedContent: attOpt.content,
        score: 10,
        maxScore: 10,
        isCorrect: true,
        status: 'correct',
        feedback:
          language === 'pt'
            ? `Perfeito! Anexaste o ficheiro do trabalho ("${expectedAttachment}") ao email.`
            : `Perfect! You attached the assignment file ("${expectedAttachment}") to the email.`,
      });
    } else if (attOpt) {
      details.push({
        id: 'attachment',
        fieldLabel: language === 'pt' ? 'Anexo do Ficheiro' : 'Attachment',
        expectedLabel: expectedAttachment,
        userPlacedContent: attOpt.content,
        score: 0,
        maxScore: 10,
        isCorrect: false,
        status: 'incorrect',
        feedback:
          language === 'pt'
            ? `Incorreto. O anexo deve ser o ficheiro do trabalho ("${expectedAttachment}").`
            : `Incorrect. The attachment should be the assignment file ("${expectedAttachment}").`,
      });
    } else {
      details.push({
        id: 'attachment',
        fieldLabel: language === 'pt' ? 'Anexo do Ficheiro' : 'Attachment',
        expectedLabel: expectedAttachment,
        userPlacedContent: null,
        score: 0,
        maxScore: 10,
        isCorrect: false,
        status: 'missing',
        feedback:
          language === 'pt'
            ? `Atenção: A mensagem refere "Segue em anexo...", mas esqueceste-te de anexar o ficheiro ("${expectedAttachment}").`
            : `Attention: The message mentions "Please find attached...", but you forgot to attach the file ("${expectedAttachment}").`,
      });
    }

    const totalScore = details.reduce((sum, d) => sum + d.score, 0);
    const maxScore = 100;
    const percentage = Math.round((totalScore / maxScore) * 100);

    let stars = 0;
    let overallTitle = '';
    let overallDescription = '';

    if (percentage === 100) {
      stars = 3;
      overallTitle = language === 'pt' ? '🎉 Email Perfeito! 100% de Cotação!' : '🎉 Perfect Email! 100% Score!';
      overallDescription =
        language === 'pt'
          ? 'Estruturaste o email com excelência: destinatário correto, assunto claro, corpo da mensagem bem estruturado e ficheiro devidamente anexado!'
          : 'You structured the email with excellence: recipient, subject line, greeting, polite message, and attachment!';
    } else if (percentage >= 70) {
      stars = 2;
      overallTitle = language === 'pt' ? '👍 Bom Trabalho! Quase Perfeito!' : '👍 Good Job! Almost Perfect!';
      overallDescription =
        language === 'pt'
          ? `Obtiveste ${totalScore} em 100 pontos (${percentage}%). A maioria dos elementos está correta, mas ainda podes afinar os detalhes assinalados para atingires os 100%! `
          : `You scored ${totalScore} out of 100 points (${percentage}%). Review the feedback below to improve.`;
    } else if (percentage >= 30) {
      stars = 1;
      overallTitle = language === 'pt' ? '⚠️ Email Incompleto ou com Erros' : '⚠️ Incomplete Email with Mistakes';
      overallDescription =
        language === 'pt'
          ? `Obtiveste ${totalScore} em 100 pontos (${percentage}%). Vários elementos importantes estão em falta ou em campos incorretos. Consulta o relatório abaixo.`
          : `You scored ${totalScore} out of 100 points (${percentage}%). Several essential elements are missing or misplaced.`;
    } else {
      stars = 0;
      overallTitle = language === 'pt' ? '❌ Email com Falhas Graves' : '❌ Email Missing Key Fields';
      overallDescription =
        language === 'pt'
          ? `Obtiveste ${totalScore} em 100 pontos (${percentage}%). Um email necessita obrigatoriamente de destinatário ("Para"), assunto e corpo da mensagem.`
          : `You scored ${totalScore} out of 100 points (${percentage}%). An email needs at least a recipient, subject and body.`;
    }

    return {
      totalScore,
      maxScore,
      percentage,
      details,
      overallTitle,
      overallDescription,
      stars,
    };
  };

  // Evaluation on "Enviar"
  const handleSend = () => {
    const result = calculateEvaluation();
    setEvaluationResult(result);
    setIsCompleted(true);

    if (result.percentage === 100) {
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  };

  const handleFinish = () => {
    if (evaluationResult) {
      onFinish(evaluationResult.totalScore, evaluationResult.maxScore, evaluationResult.percentage);
    } else {
      onFinish(100, 100, 100);
    }
    onBack();
  };

  const renderCardIcon = (iconType: DraggableOption['iconType']) => {
    switch (iconType) {
      case 'mail':
        return <Mail className="w-4 h-4 shrink-0" />;
      case 'file':
        return <FileText className="w-4 h-4 shrink-0" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 shrink-0" />;
      case 'clip':
        return <Paperclip className="w-4 h-4 shrink-0" />;
      case 'users':
        return <Users className="w-4 h-4 shrink-0" />;
      case 'user':
        return <User className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-in fade-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 mb-4 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      {/* Top Header Card Matching Reference */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0 shadow-2xs border border-purple-200/70">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                <span>+ 100 XP</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'pt' ? 'Constrói um email' : 'Build an Email'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {language === 'pt'
                ? 'Arrasta as opções da direita para os locais corretos do Outlook e clica em Enviar.'
                : 'Drag the options from the right to the correct fields in Outlook and click Send.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto justify-end">
          <AudioSpeakButton
            id="audio-email-challenge-1"
            text={
              language === 'pt'
                ? 'O teu grupo concluiu o trabalho de TIC. Envia um email ao teu professor a entregar o trabalho em anexo, dando também conhecimento aos colegas do teu grupo. Arrasta as opções da direita para os campos correspondentes e clica em Enviar.'
                : 'Your group finished the ICT assignment. Send an email to your teacher submitting the attached work, keeping your teammates in CC. Drag the options into the correct fields and click Send.'
            }
            language={language}
            label={language === 'pt' ? 'Ouvir Instruções' : 'Listen Instructions'}
            variant="pill"
            size="sm"
          />
        </div>
      </div>

      {/* Explicit Mission Instructions Card */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-purple-50 rounded-2xl border border-blue-200/80 p-4 mb-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-200/70 px-2 py-0.5 rounded-md">
                {language === 'pt' ? '📋 Enunciado da Tarefa' : '📋 Task Instructions'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {language === 'pt' ? (
                <>
                  O teu grupo terminou o trabalho de TIC. <strong>Envia um email ao teu professor</strong> a entregar o trabalho em anexo, dando também <strong>conhecimento aos colegas do teu grupo</strong>.
                </>
              ) : (
                <>
                  Your group completed the ICT assignment. Send an email to your teacher delivering the assignment file, also keeping your group teammates informed.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main Email Interface & Options Container */}
      <div className="rounded-2xl border border-slate-300 shadow-sm overflow-hidden bg-white">
        {/* Outlook Header Bar */}
        <div className="bg-[#0078D4] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Left: 9-dots waffle icon & Outlook brand */}
          <div className="flex items-center gap-2.5">
            <div className="grid grid-cols-3 gap-0.5 p-1 rounded-sm hover:bg-white/10 cursor-pointer">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full" />
              ))}
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight">Outlook</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2">
            <div className="bg-white/95 text-slate-700 text-xs rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-inner">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-400 select-none hidden sm:inline">
                {language === 'pt' ? 'Procurar' : 'Search'}
              </span>
              <span className="text-slate-400 select-none sm:hidden">
                {language === 'pt' ? 'Procurar...' : 'Search...'}
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              className="p-1 rounded-md hover:bg-white/10 text-white cursor-pointer"
              title={language === 'pt' ? 'Definições' : 'Settings'}
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              className="p-1 rounded-md hover:bg-white/10 text-white cursor-pointer"
              title={language === 'pt' ? 'Ajuda' : 'Help'}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs font-bold">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Outlook Main Workspace Grid: Left Sidebar + Center Compose + Right Drag Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
          {/* Left Folders Sidebar (Desktop only) */}
          <div className="hidden md:flex md:col-span-3 lg:col-span-2 bg-slate-50 border-r border-slate-200 p-3 flex-col gap-3">
            <button className="w-full py-2 px-3 rounded-xl bg-[#0078D4] hover:bg-[#006cbd] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer">
              <FileEdit className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Novo email' : 'New email'}</span>
            </button>

            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                {language === 'pt' ? 'Pastas' : 'Folders'}
              </div>
              <nav className="space-y-1 text-xs">
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-indigo-50 font-bold text-indigo-700">
                  <div className="flex items-center gap-2">
                    <Inbox className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'Caixa de Entrada' : 'Inbox'}</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#0078D4] text-white font-bold">3</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">
                  <SendHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'pt' ? 'Itens Enviados' : 'Sent Items'}</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'pt' ? 'Rascunhos' : 'Drafts'}</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'pt' ? 'Itens Eliminados' : 'Deleted Items'}</span>
                </div>
              </nav>
            </div>
          </div>

          {/* Center Compose Area */}
          <div className="col-span-1 md:col-span-9 lg:col-span-6 p-4 flex flex-col justify-between border-r border-slate-200">
            <div>
              {/* Tabs Bar */}
              <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-semibold pb-1.5 mb-3 text-slate-500 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('message')}
                  className={`pb-1 px-1 cursor-pointer transition-colors ${
                    activeTab === 'message'
                      ? 'text-[#0078D4] border-b-2 border-[#0078D4] font-bold'
                      : 'hover:text-slate-800'
                  }`}
                >
                  {language === 'pt' ? 'Mensagem' : 'Message'}
                </button>
                <button
                  onClick={() => setActiveTab('insert')}
                  className={`pb-1 px-1 cursor-pointer transition-colors ${
                    activeTab === 'insert'
                      ? 'text-[#0078D4] border-b-2 border-[#0078D4] font-bold'
                      : 'hover:text-slate-800'
                  }`}
                >
                  {language === 'pt' ? 'Inserir' : 'Insert'}
                </button>
                <button
                  onClick={() => setActiveTab('format')}
                  className={`pb-1 px-1 cursor-pointer transition-colors ${
                    activeTab === 'format'
                      ? 'text-[#0078D4] border-b-2 border-[#0078D4] font-bold'
                      : 'hover:text-slate-800'
                  }`}
                >
                  {language === 'pt' ? 'Formatar texto' : 'Format text'}
                </button>
                <button
                  onClick={() => setActiveTab('options')}
                  className={`pb-1 px-1 cursor-pointer transition-colors ${
                    activeTab === 'options'
                      ? 'text-[#0078D4] border-b-2 border-[#0078D4] font-bold'
                      : 'hover:text-slate-800'
                  }`}
                >
                  {language === 'pt' ? 'Opções' : 'Options'}
                </button>
              </div>

              {/* Formatting Ribbon */}
              <div className="bg-slate-50/80 rounded-xl p-1.5 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600 mb-3 overflow-x-auto gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-semibold px-2 py-0.5 rounded-md hover:bg-slate-200/60 cursor-pointer">Aptos ▾</span>
                  <span className="font-semibold px-2 py-0.5 rounded-md hover:bg-slate-200/60 cursor-pointer">12 ▾</span>
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <span className="font-bold px-1.5 py-0.5 rounded hover:bg-slate-200/60 cursor-pointer">B</span>
                  <span className="italic px-1.5 py-0.5 rounded hover:bg-slate-200/60 cursor-pointer font-serif">I</span>
                  <span className="underline px-1.5 py-0.5 rounded hover:bg-slate-200/60 cursor-pointer">U</span>
                  <span className="font-bold text-red-600 px-1.5 py-0.5 rounded hover:bg-slate-200/60 cursor-pointer">A ▾</span>
                  <span className="px-1.5 py-0.5 rounded hover:bg-slate-200/60 cursor-pointer">✏️ ▾</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </div>

              {/* Action Toolbar: Enviar button, Anexar, Link, Emoji */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 flex-wrap">
                <button
                  onClick={handleSend}
                  className="px-4 py-1.5 rounded-lg bg-[#0078D4] hover:bg-[#006cbd] text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'pt' ? 'Enviar' : 'Send'}</span>
                  <span className="border-l border-blue-400 pl-1 text-[10px]">▾</span>
                </button>

                <div
                  onDragOver={(e) => handleDragOver(e, 'attachment')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'attachment')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    placedSlots.attachment
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : activeDropTarget === 'attachment'
                      ? 'bg-amber-100 border-dashed border-amber-500 text-amber-900 scale-105 ring-2 ring-amber-300'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  title={language === 'pt' ? 'Anexar ficheiro' : 'Attach file'}
                >
                  <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {placedSlots.attachment ? placedSlots.attachment.content : language === 'pt' ? 'Anexar' : 'Attach'}
                  </span>
                  {placedSlots.attachment && (
                    <button
                      onClick={(e) => handleRemoveFromSlot('attachment', e)}
                      className="ml-1 p-0.5 hover:bg-amber-200 rounded text-amber-800 cursor-pointer"
                      title={language === 'pt' ? 'Remover anexo' : 'Remove attachment'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-1 hover:bg-slate-50">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Link</span>
                </div>

                <div className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100">
                  <Smile className="w-4 h-4" />
                </div>
              </div>

              {/* Form Fields & Drop Zones */}
              <div className="space-y-2.5">
                {/* Field: Para */}
                <div className="flex items-center gap-2">
                  <div className="w-14 py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 text-center shrink-0">
                    {language === 'pt' ? 'Para' : 'To'}
                  </div>

                  <div
                    onDragOver={(e) => handleDragOver(e, 'to')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'to')}
                    className={`flex-1 min-h-[38px] rounded-lg border p-1 transition-all flex items-center ${
                      placedSlots.to
                        ? 'border-purple-300 bg-purple-50/40'
                        : activeDropTarget === 'to'
                        ? 'border-2 border-dashed border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                        : 'border-slate-200 bg-slate-50/30 hover:border-slate-300'
                    }`}
                  >
                    {placedSlots.to ? (
                      <div className="w-full flex items-center justify-between px-3 py-1 rounded-lg bg-purple-100 text-purple-900 text-xs sm:text-sm font-medium border border-purple-200">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-purple-600" />
                          <span>{placedSlots.to.content}</span>
                        </div>
                        <button
                          onClick={(e) => handleRemoveFromSlot('to', e)}
                          className="p-1 hover:bg-purple-200 rounded text-purple-700 cursor-pointer"
                          title={language === 'pt' ? 'Remover' : 'Remove'}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-6" />
                    )}
                  </div>
                </div>

                {/* Field: Cc */}
                <div className="flex items-center gap-2">
                  <div className="w-14 py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 text-center shrink-0">
                    Cc
                  </div>

                  <div
                    onDragOver={(e) => handleDragOver(e, 'cc')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'cc')}
                    className={`flex-1 min-h-[38px] rounded-lg border p-1 transition-all flex items-center ${
                      placedSlots.cc
                        ? 'border-rose-300 bg-rose-50/40'
                        : activeDropTarget === 'cc'
                        ? 'border-2 border-dashed border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                        : 'border-slate-200 bg-slate-50/30 hover:border-slate-300'
                    }`}
                  >
                    {placedSlots.cc ? (
                      <div className="w-full flex items-center justify-between px-3 py-1 rounded-lg bg-rose-100 text-rose-900 text-xs sm:text-sm font-medium border border-rose-200">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-rose-600" />
                          <span>{placedSlots.cc.content}</span>
                        </div>
                        <button
                          onClick={(e) => handleRemoveFromSlot('cc', e)}
                          className="p-1 hover:bg-rose-200 rounded text-rose-700 cursor-pointer"
                          title={language === 'pt' ? 'Remover' : 'Remove'}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-6" />
                    )}
                  </div>
                </div>

                {/* Field: Assunto */}
                <div className="flex items-center gap-2">
                  <div className="w-36 text-xs font-bold text-slate-700 shrink-0">
                    {language === 'pt' ? 'Adicionar um assunto' : 'Add a subject'}
                  </div>

                  <div
                    onDragOver={(e) => handleDragOver(e, 'subject')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'subject')}
                    className={`flex-1 min-h-[38px] rounded-lg border p-1 transition-all flex items-center ${
                      placedSlots.subject
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : activeDropTarget === 'subject'
                        ? 'border-2 border-dashed border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                        : 'border-slate-200 bg-slate-50/30 hover:border-slate-300'
                    }`}
                  >
                    {placedSlots.subject ? (
                      <div className="w-full flex items-center justify-between px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-medium border border-emerald-200">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{placedSlots.subject.content}</span>
                        </div>
                        <button
                          onClick={(e) => handleRemoveFromSlot('subject', e)}
                          className="p-1 hover:bg-emerald-200 rounded text-emerald-700 cursor-pointer"
                          title={language === 'pt' ? 'Remover' : 'Remove'}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-6" />
                    )}
                  </div>
                </div>

                {/* Mini format toolbar */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <span className="font-bold px-1 rounded hover:bg-slate-100 cursor-pointer">B</span>
                  <span className="italic px-1 rounded hover:bg-slate-100 cursor-pointer">I</span>
                  <span className="underline px-1 rounded hover:bg-slate-100 cursor-pointer">U</span>
                  <span className="px-1 rounded hover:bg-slate-100 cursor-pointer">⋮≡</span>
                  <span className="px-1 rounded hover:bg-slate-100 cursor-pointer">≡</span>
                </div>

                {/* Field: Mensagem (Body) */}
                <div
                  onDragOver={(e) => handleDragOver(e, 'body')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'body')}
                  className={`min-h-[160px] rounded-xl border p-3 transition-all flex items-start ${
                    placedSlots.body
                      ? 'border-sky-300 bg-sky-50/30'
                      : activeDropTarget === 'body'
                      ? 'border-2 border-dashed border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                      : 'border-slate-200 bg-slate-50/20 hover:border-slate-300'
                  }`}
                >
                  {placedSlots.body ? (
                    <div className="w-full relative p-4 rounded-xl bg-sky-100/70 border border-sky-200 text-sky-950 text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <MessageSquare className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <div className="whitespace-pre-line font-normal">{placedSlots.body.content}</div>
                      </div>
                      <button
                        onClick={(e) => handleRemoveFromSlot('body', e)}
                        className="absolute top-2 right-2 p-1 hover:bg-sky-200 rounded text-sky-700 cursor-pointer"
                        title={language === 'pt' ? 'Remover' : 'Remove'}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-32" />
                  )}
                </div>

                {/* Attached file visual feedback */}
                {placedSlots.attachment && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold animate-in fade-in">
                    <Paperclip className="w-4 h-4 text-amber-600" />
                    <span>{language === 'pt' ? 'Ficheiro anexo:' : 'Attached file:'}</span>
                    <span className="underline font-mono">{placedSlots.attachment.content}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Validation Feedback & Reset */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              {validationError ? (
                <div className="flex-1 flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-xl animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 font-medium">
                  {language === 'pt'
                    ? '💡 Arrasta cada bloco da direita para o respetivo campo. Clica no ✕ para remover.'
                    : '💡 Drag each block to the corresponding field. Click ✕ to remove.'}
                </div>
              )}

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                title={language === 'pt' ? 'Limpar todos os campos' : 'Reset all fields'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Limpar' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Opções para arrastar */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-slate-50/70 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div>
                <h2 className="font-bold text-slate-800 text-sm">
                  {language === 'pt' ? 'Opções para arrastar' : 'Options to drag'}
                </h2>
                <p className="text-[10px] text-slate-500">
                  {language === 'pt' ? 'Clica e arrasta para os campos' : 'Click & drag into fields'}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {availableOptions.length} {language === 'pt' ? 'disponíveis' : 'available'}
              </span>
            </div>

            {availableOptions.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs font-medium rounded-xl border border-dashed border-slate-200 bg-white">
                {language === 'pt'
                  ? 'Todas as opções foram colocadas! Clica no botão azul "Enviar" para avaliar o teu email.'
                  : 'All options placed! Click the blue "Send" button to evaluate your email.'}
              </div>
            ) : (
              <div className="space-y-2.5">
                {availableOptions.map((option) => {
                  return (
                    <div
                      key={option.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, option)}
                      onDragEnd={handleDragEnd}
                      className={`rounded-xl border p-3 cursor-grab active:cursor-grabbing transition-all select-none shadow-2xs hover:scale-[1.01] ${option.colorBg} ${option.colorBorder}`}
                      title={language === 'pt' ? 'Arrasta este bloco para o campo correto' : 'Drag this block'}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-lg shrink-0 ${option.iconColor}`}>
                          {renderCardIcon(option.iconType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs sm:text-sm font-medium leading-snug whitespace-pre-line ${option.colorText}`}>
                            {option.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Evaluation & Completion Modal */}
      {isCompleted && evaluationResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-5 sm:p-6 text-center animate-in zoom-in-95 my-auto max-h-[92vh] flex flex-col">
            {/* Header Icon and Badges */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs ${
                  evaluationResult.percentage === 100
                    ? 'bg-emerald-100 border border-emerald-200 text-emerald-600'
                    : evaluationResult.percentage >= 70
                    ? 'bg-blue-100 border border-blue-200 text-blue-600'
                    : evaluationResult.percentage >= 30
                    ? 'bg-amber-100 border border-amber-200 text-amber-600'
                    : 'bg-rose-100 border border-rose-200 text-rose-600'
                }`}
              >
                {evaluationResult.percentage === 100 ? (
                  <Sparkles className="w-7 h-7 fill-emerald-500 text-emerald-600" />
                ) : evaluationResult.percentage >= 70 ? (
                  <Award className="w-7 h-7 text-blue-600" />
                ) : evaluationResult.percentage >= 30 ? (
                  <AlertTriangle className="w-7 h-7 text-amber-600" />
                ) : (
                  <XCircle className="w-7 h-7 text-rose-600" />
                )}
              </div>
            </div>

            {/* Stars & Score Indicator */}
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3].map((starIndex) => (
                <Star
                  key={starIndex}
                  className={`w-5 h-5 ${
                    starIndex <= evaluationResult.stars
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-200 fill-slate-100'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black border ${
                  evaluationResult.percentage === 100
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : evaluationResult.percentage >= 70
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : evaluationResult.percentage >= 30
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {language === 'pt' ? 'Cotação:' : 'Score:'} {evaluationResult.totalScore} / {evaluationResult.maxScore} pts ({evaluationResult.percentage}%)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-200">
                ⭐ +{evaluationResult.totalScore} XP
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {evaluationResult.overallTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3 leading-relaxed">
              {evaluationResult.overallDescription}
            </p>

            {/* Itemized Diagnostic Checklist */}
            <div className="flex-1 overflow-y-auto pr-1 text-left space-y-2 mb-4 max-h-[36vh]">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between pb-1 border-b border-slate-100">
                <span>{language === 'pt' ? 'Correção dos Elementos do Email:' : 'Email Elements Diagnostic:'}</span>
                <span className="text-[11px] font-normal text-slate-500">
                  {evaluationResult.details.filter((d) => d.isCorrect).length}{' '}
                  {language === 'pt' ? 'de' : 'of'}{' '}
                  {evaluationResult.details.length}{' '}
                  {language === 'pt' ? 'corretos' : 'correct'}
                </span>
              </div>

              {evaluationResult.details.map((detail) => (
                <div
                  key={detail.id}
                  className={`p-2.5 rounded-xl border text-xs transition-colors ${
                    detail.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : detail.status === 'missing'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-rose-50/70 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      {detail.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : detail.status === 'missing' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{detail.fieldLabel}</span>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        detail.isCorrect
                          ? 'bg-emerald-200/80 text-emerald-900'
                          : 'bg-rose-200/80 text-rose-900'
                      }`}
                    >
                      {detail.score} / {detail.maxScore} pts
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed mb-1 opacity-90">{detail.feedback}</p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium pt-1 border-t border-black/5 text-slate-600">
                    <div>
                      <span className="text-slate-400 font-normal">
                        {language === 'pt' ? 'O que colocaste: ' : 'Placed: '}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {detail.userPlacedContent ? `"${detail.userPlacedContent}"` : <em>{language === 'pt' ? 'Nenhum' : 'Empty'}</em>}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-normal">
                        {language === 'pt' ? 'Esperado: ' : 'Expected: '}
                      </span>
                      <span className="font-semibold text-emerald-700">"{detail.expectedLabel}"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-100">
              {evaluationResult.percentage < 100 ? (
                <>
                  <button
                    onClick={handleTryAgain}
                    className="w-full sm:w-1/2 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm border border-indigo-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Corrigir e Tentar 100%' : 'Fix & Try 100%'}
                  </button>
                  <button
                    onClick={handleFinish}
                    className="w-full sm:w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{language === 'pt' ? `Concluir (+${evaluationResult.totalScore} XP) →` : `Complete (+${evaluationResult.totalScore} XP) →`}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-1/3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    {language === 'pt' ? 'Tentar de Novo' : 'Try Again'}
                  </button>
                  <button
                    onClick={handleFinish}
                    className="w-full sm:w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-1.5"
                  >
                    <span>{language === 'pt' ? 'Concluir Desafio (+100 XP) →' : 'Complete Challenge (+100 XP) →'}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
