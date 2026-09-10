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

const INITIAL_OPTIONS: DraggableOption[] = [
  {
    id: 'opt-recipient',
    type: 'recipient',
    content: 'amigo@escola.pt',
    iconType: 'mail',
    colorBg: 'bg-purple-50 hover:bg-purple-100/80',
    colorBorder: 'border-purple-200',
    colorText: 'text-purple-900',
    iconColor: 'text-purple-600 bg-purple-100',
    correctSlot: 'to',
  },
  {
    id: 'opt-subject',
    type: 'subject',
    content: 'Trabalho de TIC',
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
    content: 'Olá,\nSegue em anexo o meu trabalho de TIC.\nCumprimentos,\nJoão Silva',
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
    content: 'trabalho_tic.docx',
    iconType: 'clip',
    colorBg: 'bg-amber-50 hover:bg-amber-100/80',
    colorBorder: 'border-amber-200',
    colorText: 'text-amber-950',
    iconColor: 'text-amber-600 bg-amber-100',
    correctSlot: 'attachment',
  },
  {
    id: 'opt-cc',
    type: 'cc',
    content: 'turma@escola.pt',
    iconType: 'users',
    colorBg: 'bg-rose-50 hover:bg-rose-100/80',
    colorBorder: 'border-rose-200',
    colorText: 'text-rose-950',
    iconColor: 'text-rose-600 bg-rose-100',
    correctSlot: 'cc',
  },
  {
    id: 'opt-sender',
    type: 'sender',
    content: 'João Silva',
    iconType: 'user',
    colorBg: 'bg-slate-50 hover:bg-slate-100/80',
    colorBorder: 'border-slate-200',
    colorText: 'text-slate-800',
    iconColor: 'text-slate-600 bg-slate-100',
  },
];

type SlotKey = 'to' | 'cc' | 'subject' | 'body' | 'attachment';

export const EmailLabGame: React.FC<EmailLabGameProps> = ({ language, onBack, onFinish }) => {
  const t = translations[language];

  const [placedSlots, setPlacedSlots] = useState<{ [key in SlotKey]?: DraggableOption | null }>({
    to: null,
    cc: null,
    subject: null,
    body: null,
    attachment: null,
  });

  const [draggedOption, setDraggedOption] = useState<DraggableOption | null>(null);
  const [selectedOptionForClick, setSelectedOptionForClick] = useState<DraggableOption | null>(null);
  const [activeDropTarget, setActiveDropTarget] = useState<SlotKey | null>(null);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'message' | 'insert' | 'format' | 'options'>('message');

  // Available options (not yet placed)
  const placedOptionIds = new Set(
    Object.values(placedSlots)
      .filter((opt): opt is DraggableOption => Boolean(opt))
      .map((opt) => opt.id)
  );

  const availableOptions = INITIAL_OPTIONS.filter((opt) => !placedOptionIds.has(opt.id));

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, option: DraggableOption) => {
    setDraggedOption(option);
    e.dataTransfer.setData('text/plain', option.id);
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
    setSelectedOptionForClick(null);
    setValidationError(null);
  };

  // Click-to-place handler
  const handleOptionClick = (option: DraggableOption) => {
    if (selectedOptionForClick?.id === option.id) {
      setSelectedOptionForClick(null);
      return;
    }
    setSelectedOptionForClick(option);

    // Auto-place if there is an intuitive empty slot
    if (option.correctSlot && !placedSlots[option.correctSlot]) {
      setPlacedSlots((prev) => ({
        ...prev,
        [option.correctSlot!]: option,
      }));
      setSelectedOptionForClick(null);
      setValidationError(null);
    }
  };

  const handleSlotClick = (slot: SlotKey) => {
    if (selectedOptionForClick) {
      setPlacedSlots((prev) => ({
        ...prev,
        [slot]: selectedOptionForClick,
      }));
      setSelectedOptionForClick(null);
      setValidationError(null);
    }
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
    setSelectedOptionForClick(null);
    setValidationError(null);
    setIsCompleted(false);
  };

  // Validation on "Enviar"
  const handleSend = () => {
    const toFilled = placedSlots.to?.id === 'opt-recipient';
    const subjectFilled = placedSlots.subject?.id === 'opt-subject';
    const bodyFilled = placedSlots.body?.id === 'opt-body';

    if (!toFilled && !placedSlots.to) {
      setValidationError(
        language === 'pt'
          ? '⚠️ Falta indicar o destinatário no campo "Para". Arrasta um endereço de email para lá!'
          : '⚠️ Please add the recipient in the "To" field!'
      );
      return;
    }

    if (placedSlots.to && placedSlots.to.id !== 'opt-recipient') {
      setValidationError(
        language === 'pt'
          ? '⚠️ O campo "Para" deve conter um endereço de email válido (ex.: amigo@escola.pt).'
          : '⚠️ The "To" field must contain an email address!'
      );
      return;
    }

    if (!subjectFilled && !placedSlots.subject) {
      setValidationError(
        language === 'pt'
          ? '⚠️ Falta preencher o "Assunto" do email. Lembra-te que o assunto resume o tema da mensagem!'
          : '⚠️ Subject is missing! The subject must summarize your message.'
      );
      return;
    }

    if (placedSlots.subject && placedSlots.subject.id !== 'opt-subject') {
      setValidationError(
        language === 'pt'
          ? '⚠️ O "Assunto" deve ser um título curto e claro (ex.: Trabalho de TIC), não o corpo da mensagem.'
          : '⚠️ Subject should be a concise summary!'
      );
      return;
    }

    if (!bodyFilled && !placedSlots.body) {
      setValidationError(
        language === 'pt'
          ? '⚠️ Falta a mensagem do email. Arrasta o texto com saudação, conteúdo e despedida para o corpo do email!'
          : '⚠️ Email body is missing!'
      );
      return;
    }

    if (placedSlots.body && placedSlots.body.id !== 'opt-body') {
      setValidationError(
        language === 'pt'
          ? '⚠️ A mensagem principal deve conter a saudação, o pedido e a despedida educada.'
          : '⚠️ The message body is not formatted properly!'
      );
      return;
    }

    // Success!
    setValidationError(null);
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const handleFinish = () => {
    onFinish(100, 100, 100);
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
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
                ? 'Arrasta as opções da direita para os locais corretos, para completares a mensagem de email.'
                : 'Drag the options from the right to the correct spots to complete the email message.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto justify-end">
          <AudioSpeakButton
            id="audio-email-challenge-1"
            text={
              language === 'pt'
                ? 'Desafio Constrói um email. Arrasta as opções da direita para os locais corretos, para completares a mensagem de email. Observa bem a ordem dos elementos: destinatário, assunto, corpo da mensagem e anexos.'
                : 'Build an email challenge. Drag options from the right to the correct spots to complete your message.'
            }
            language={language}
            label={language === 'pt' ? 'Ouvir Desafio' : 'Listen Challenge'}
            variant="pill"
            size="sm"
          />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
            <span className="text-amber-500 text-sm">💡</span>
            <span>
              {language === 'pt'
                ? 'Dica: Observa bem a ordem dos elementos de um email.'
                : 'Tip: Pay attention to the structure of an email.'}
            </span>
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
            <button className="p-1 rounded-md hover:bg-white/10 text-white cursor-pointer" title="Definições">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-md hover:bg-white/10 text-white cursor-pointer" title="Ajuda">
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
                  onClick={() => handleSlotClick('attachment')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                    placedSlots.attachment
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : activeDropTarget === 'attachment'
                      ? 'bg-amber-100 border-dashed border-amber-400 text-amber-900 scale-105'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  title="Anexar ficheiro ao email"
                >
                  <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {placedSlots.attachment ? placedSlots.attachment.content : language === 'pt' ? 'Anexar ▾' : 'Attach ▾'}
                  </span>
                  {placedSlots.attachment && (
                    <button
                      onClick={(e) => handleRemoveFromSlot('attachment', e)}
                      className="ml-1 text-amber-700 hover:text-amber-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-1 hover:bg-slate-50 cursor-pointer">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Link</span>
                </div>

                <div className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer">
                  <Smile className="w-4 h-4" />
                </div>
              </div>

              {/* Form Fields & Drop Zones */}
              <div className="space-y-2.5">
                {/* Field: Para */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-14 py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 text-center shrink-0"
                  >
                    {language === 'pt' ? 'Para' : 'To'}
                  </button>

                  <div
                    onDragOver={(e) => handleDragOver(e, 'to')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'to')}
                    onClick={() => handleSlotClick('to')}
                    className={`flex-1 min-h-[42px] rounded-xl border-2 border-dashed p-1.5 transition-all flex items-center cursor-pointer ${
                      placedSlots.to
                        ? 'border-purple-300 bg-purple-50/40'
                        : activeDropTarget === 'to'
                        ? 'border-purple-500 bg-purple-100/60 ring-2 ring-purple-300'
                        : selectedOptionForClick
                        ? 'border-indigo-400 bg-indigo-50/30'
                        : 'border-sky-300 bg-sky-50/30 hover:bg-sky-50/60'
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
                          title="Remover"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="w-full text-center text-xs sm:text-sm text-sky-600 font-medium select-none">
                        {language === 'pt' ? 'Arrasta aqui o destinatário' : 'Drag recipient here'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Field: Cc */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-14 py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 text-center shrink-0"
                  >
                    Cc
                  </button>

                  <div
                    onDragOver={(e) => handleDragOver(e, 'cc')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'cc')}
                    onClick={() => handleSlotClick('cc')}
                    className={`flex-1 min-h-[42px] rounded-xl border-2 border-dashed p-1.5 transition-all flex items-center cursor-pointer ${
                      placedSlots.cc
                        ? 'border-rose-300 bg-rose-50/40'
                        : activeDropTarget === 'cc'
                        ? 'border-rose-500 bg-rose-100/60 ring-2 ring-rose-300'
                        : 'border-sky-300 bg-sky-50/30 hover:bg-sky-50/60'
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
                          title="Remover"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="w-full text-center text-xs sm:text-sm text-sky-600 font-medium select-none">
                        {language === 'pt' ? 'Arrasta aqui (se necessário)' : 'Drag here (optional)'}
                      </span>
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
                    onClick={() => handleSlotClick('subject')}
                    className={`flex-1 min-h-[42px] rounded-xl border-2 border-dashed p-1.5 transition-all flex items-center cursor-pointer ${
                      placedSlots.subject
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : activeDropTarget === 'subject'
                        ? 'border-emerald-500 bg-emerald-100/60 ring-2 ring-emerald-300'
                        : selectedOptionForClick
                        ? 'border-indigo-400 bg-indigo-50/30'
                        : 'border-sky-300 bg-sky-50/30 hover:bg-sky-50/60'
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
                          title="Remover"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="w-full text-center text-xs sm:text-sm text-sky-600 font-medium select-none">
                        {language === 'pt' ? 'Arrasta aqui o assunto' : 'Drag subject here'}
                      </span>
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
                  onClick={() => handleSlotClick('body')}
                  className={`min-h-[160px] rounded-2xl border-2 border-dashed p-4 transition-all flex items-center justify-center cursor-pointer ${
                    placedSlots.body
                      ? 'border-sky-400 bg-sky-50/30'
                      : activeDropTarget === 'body'
                      ? 'border-sky-500 bg-sky-100/60 ring-2 ring-sky-300'
                      : selectedOptionForClick
                      ? 'border-indigo-400 bg-indigo-50/30'
                      : 'border-sky-300 bg-sky-50/30 hover:bg-sky-50/60'
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
                        title="Remover"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm text-sky-600 font-medium select-none text-center">
                      {language === 'pt' ? 'Arrasta aqui a mensagem do email' : 'Drag email message here'}
                    </span>
                  )}
                </div>

                {/* Attached file visual feedback */}
                {placedSlots.attachment && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
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
                <div className="text-[11px] text-slate-400">
                  {language === 'pt'
                    ? '💡 Podes arrastar as caixas ou clicar numa opção e depois no campo pretendido.'
                    : '💡 Drag options or click to place into fields.'}
                </div>
              )}

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Limpar todos os campos"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Limpar' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Opções para arrastar */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-slate-50/70 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h2 className="font-bold text-slate-800 text-sm">
                {language === 'pt' ? 'Opções para arrastar' : 'Options to drag'}
              </h2>
              <span className="text-[11px] font-semibold text-slate-500">
                {availableOptions.length} {language === 'pt' ? 'disponíveis' : 'available'}
              </span>
            </div>

            {availableOptions.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs font-medium rounded-xl border border-dashed border-slate-200 bg-white">
                {language === 'pt'
                  ? 'Todas as opções foram colocadas! Clica em "Enviar" no topo para testar a tua mensagem.'
                  : 'All options placed! Click "Send" to check your email.'}
              </div>
            ) : (
              <div className="space-y-2.5">
                {availableOptions.map((option) => {
                  const isSelected = selectedOptionForClick?.id === option.id;
                  return (
                    <div
                      key={option.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, option)}
                      onClick={() => handleOptionClick(option)}
                      className={`rounded-xl border p-3 cursor-grab active:cursor-grabbing transition-all select-none shadow-2xs ${
                        option.colorBg
                      } ${option.colorBorder} ${
                        isSelected ? 'ring-2 ring-indigo-500 scale-[1.02] shadow-sm' : 'hover:scale-[1.01]'
                      }`}
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

            <div className="mt-auto p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'pt' ? 'Como resolver:' : 'How to solve:'}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-800">
                {language === 'pt'
                  ? '1. Coloca o endereço do destinatário em "Para".\n2. Escreve um assunto claro em "Assunto".\n3. Coloca a saudação e texto em "Mensagem".\n4. Clica no botão azul "Enviar".'
                  : '1. Put recipient in "To". 2. Add subject. 3. Place message. 4. Hit "Send".'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Victory Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="w-8 h-8 fill-emerald-500 text-emerald-600" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-200 mb-2">
              ⭐ + 100 XP
            </span>

            <h2 className="text-2xl font-black text-slate-900">
              {language === 'pt' ? '🎉 Fantástico! Email Enviado!' : '🎉 Great Job! Email Sent!'}
            </h2>

            <p className="text-sm text-slate-600 mt-2 mb-4 leading-relaxed">
              {language === 'pt'
                ? 'Estruturaste o email com perfeição: destinatário correto, assunto claro, saudação formal, mensagem objetiva e anexo do trabalho de TIC!'
                : 'You assembled the email perfectly: recipient, subject line, respectful greeting, clear message and attachment!'}
            </p>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs font-medium text-left mb-5 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'pt' ? 'Resumo da Aprendizagem:' : 'Learning Summary:'}</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-emerald-800 text-[11px]">
                <li><strong>Para:</strong> {placedSlots.to?.content} (Endereço do destinatário)</li>
                <li><strong>Assunto:</strong> {placedSlots.subject?.content} (Resumo do objetivo)</li>
                <li><strong>Mensagem:</strong> Saudação + corpo + assinatura educada</li>
                {placedSlots.attachment && <li><strong>Anexo:</strong> {placedSlots.attachment.content}</li>}
              </ul>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              {language === 'pt' ? 'Concluir Desafio (+100 XP)' : 'Complete Challenge (+100 XP)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
