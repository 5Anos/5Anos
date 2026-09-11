import React, { useState } from 'react';
import {
  Mail,
  Send,
  Paperclip,
  Trash2,
  Bold,
  Italic,
  Underline,
  Smile,
  Link as LinkIcon,
  HardDrive,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Check,
  User,
  Users,
  FileText,
  MessageSquare,
  PenTool,
  BookmarkCheck
} from 'lucide-react';

export interface EmailElementInfo {
  id: string;
  name: string;
  badge: string;
  category: string;
  icon: React.ReactNode;
  whatIs: string;
  whatFor: string;
  example?: string;
}

export const EMAIL_ELEMENTS: EmailElementInfo[] = [
  {
    id: 'remetente',
    name: 'Remetente (De:)',
    badge: 'De:',
    category: 'Cabeçalho',
    icon: <User className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É o endereço de correio eletrónico da pessoa que está a enviar o email.',
    whatFor: 'Identifica quem escreveu a mensagem para que o destinatário saiba quem é e possa responder diretamente.',
    example: 'maria.santos@escola.pt',
  },
  {
    id: 'destinatario',
    name: 'Destinatário (Para:)',
    badge: 'Para:',
    category: 'Cabeçalho',
    icon: <Users className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É o endereço eletrónico da pessoa (ou pessoas) que vai receber a mensagem.',
    whatFor: 'Garante que a mensagem chega à caixa de correio certa. Se o endereço tiver erros, a mensagem não é entregue!',
    example: 'professor.silva@escola.pt',
  },
  {
    id: 'assunto',
    name: 'Assunto (Subject)',
    badge: 'Assunto',
    category: 'Cabeçalho',
    icon: <FileText className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É o título ou tema principal do email. Deve ser curto e claro.',
    whatFor: 'Permite ao destinatário saber de imediato sobre o que trata a mensagem antes mesmo de a abrir.',
    example: 'Trabalho de TIC - 5.º A',
  },
  {
    id: 'saudacao',
    name: 'Saudação',
    badge: 'Saudação',
    category: 'Corpo do Email',
    icon: <MessageSquare className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É a fórmula educada com que se inicia a mensagem para cumprimentar o destinatário.',
    whatFor: 'Demonstra respeito e cortesia. Deve ser formal com professores (ex: Caro Professor) e informal com amigos.',
    example: 'Caro Professor Silva,',
  },
  {
    id: 'corpo',
    name: 'Corpo da Mensagem',
    badge: 'Texto Principal',
    category: 'Corpo do Email',
    icon: <FileText className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É o texto principal com o conteúdo que se quer comunicar.',
    whatFor: 'Apresenta a mensagem, dúvida ou pedido de forma clara, organizada em parágrafos e com boa pontuação.',
    example: 'Gostaria de saber se o trabalho sobre segurança na Internet pode incluir ilustrações desenhadas por nós.',
  },
  {
    id: 'despedida',
    name: 'Despedida',
    badge: 'Despedida',
    category: 'Corpo do Email',
    icon: <Smile className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É a expressão de cortesia utilizada para terminar o email.',
    whatFor: 'Conclui a mensagem de forma simpática e respeitosa antes de indicar o nome.',
    example: 'Com os melhores cumprimentos,',
  },
  {
    id: 'assinatura',
    name: 'Assinatura',
    badge: 'Identificação',
    category: 'Corpo do Email',
    icon: <PenTool className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É a identificação no final da mensagem com o teu nome completo.',
    whatFor: 'Permite ao professor ou destinatário saber exatamente quem és (nome, ano, turma e número de aluno).',
    example: 'Maria Santos, 5.º A — N.º 14',
  },
  {
    id: 'enviar',
    name: 'Botão Enviar',
    badge: 'Ação Principal',
    category: 'Comandos',
    icon: <Send className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É o botão que aciona o envio definitivo da mensagem através da Internet.',
    whatFor: 'Transmite o email para a caixa de correio do destinatário. Deves reler tudo com atenção antes de clicar!',
    example: 'Botão azul "Enviar" com o ícone de envio.',
  },
  {
    id: 'anexar',
    name: 'Anexar Ficheiros',
    badge: 'Anexo 📎',
    category: 'Ferramentas',
    icon: <Paperclip className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É a opção (ícone de clipe) que permite juntar ficheiros ao email.',
    whatFor: 'Permite enviar documentos, fotografias, apresentações ou ficheiros PDF juntamente com o texto.',
    example: 'Juntar o ficheiro "Trabalho_TIC_Maria_5A.pdf".',
  },
  {
    id: 'formatacao',
    name: 'Barra de Formatação',
    badge: 'Formatação',
    category: 'Ferramentas',
    icon: <Bold className="w-5 h-5 text-indigo-600" />,
    whatIs: 'Conjunto de ferramentas para editar o estilo visual do texto (negrito, itálico, cores, listas).',
    whatFor: 'Ajuda a destacar palavras importantes e a organizar o texto para uma leitura mais agradável.',
    example: 'Usar Negrito (B) para destacar datas de entrega.',
  },
  {
    id: 'opcoes',
    name: 'Outras Opções',
    badge: 'Extras 🔗 😊',
    category: 'Ferramentas',
    icon: <LinkIcon className="w-5 h-5 text-indigo-600" />,
    whatIs: 'Botões para adicionar links, emojis, imagens ou ficheiros da nuvem (Google Drive / OneDrive).',
    whatFor: 'Enriquece o email com ligações úteis para páginas web ou materiais guardados na nuvem.',
    example: 'Inserir um link para um artigo educativo de pesquisa.',
  },
  {
    id: 'eliminar',
    name: 'Eliminar Rascunho',
    badge: 'Eliminar 🗑️',
    category: 'Comandos',
    icon: <Trash2 className="w-5 h-5 text-indigo-600" />,
    whatIs: 'É o botão (ícone de caixote do lixo) para cancelar e apagar o rascunho.',
    whatFor: 'Permite descartar um email que estavas a escrever e já não queres enviar, sem enviar nada a ninguém.',
    example: 'Apagar a mensagem para começar uma nova do zero.',
  },
];

export const InteractiveEmailExplorer: React.FC = () => {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>('assunto');

  const selectedElement = EMAIL_ELEMENTS.find((el) => el.id === selectedElementId) || EMAIL_ELEMENTS[0];

  const handleElementClick = (id: string) => {
    setSelectedElementId(id);
    if (!discoveredIds.includes(id)) {
      setDiscoveredIds((prev) => [...prev, id]);
    }
  };

  const handleReset = () => {
    setDiscoveredIds([]);
    setSelectedElementId('assunto');
  };

  const isDiscovered = (id: string) => discoveredIds.includes(id);
  const isSelected = (id: string) => selectedElementId === id;

  const totalElements = EMAIL_ELEMENTS.length;
  const discoveredCount = discoveredIds.length;
  const allDiscovered = discoveredCount === totalElements;
  const progressPercent = Math.round((discoveredCount / totalElements) * 100);

  const currentIndex = EMAIL_ELEMENTS.findIndex((el) => el.id === selectedElementId);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + totalElements) % totalElements;
    handleElementClick(EMAIL_ELEMENTS[prevIndex].id);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % totalElements;
    handleElementClick(EMAIL_ELEMENTS[nextIndex].id);
  };

  // Helper for interactive item button wrapper
  const getItemClass = (id: string, customBorder = 'rounded-lg') => {
    const selected = isSelected(id);
    const discovered = isDiscovered(id);

    return `transition-all duration-200 cursor-pointer relative group text-left ${customBorder} ${
      selected
        ? 'ring-2 ring-indigo-500 bg-indigo-50/80 shadow-xs'
        : discovered
        ? 'hover:bg-emerald-50/50 hover:border-emerald-300 border border-transparent'
        : 'hover:bg-indigo-50/40 hover:border-indigo-300 border border-transparent animate-pulse-subtle'
    }`;
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Header & Learning Mechanics */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Atividade Interativa
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Explora os elementos de um email
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Clica nos diferentes elementos do email para descobrir para que servem.
            </p>
          </div>

          {/* Counter Badge */}
          <div className="shrink-0 flex items-center gap-3 self-start sm:self-center">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span className="text-[11px] font-semibold text-indigo-200 block uppercase tracking-wider">
                Elementos descobertos
              </span>
              <span className="text-lg sm:text-xl font-black text-white">
                <span className="text-emerald-300">{discoveredCount}</span> / {totalElements}
              </span>
            </div>
            {discoveredCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                title="Reiniciar exploração"
                aria-label="Reiniciar exploração"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] font-bold text-indigo-200">
            <span>Progresso da Exploração</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400 transition-all duration-500 shadow-sm"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Celebration Banner when all 12 are discovered */}
        {allDiscovered && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-100 flex items-center gap-3 animate-in zoom-in-95">
            <span className="text-2xl sm:text-3xl">🎉</span>
            <div className="flex-1">
              <p className="font-black text-white text-sm sm:text-base">
                Parabéns! Descobriste todos os elementos de um email!
              </p>
              <p className="text-xs text-emerald-200">
                Agora já conheces todas as partes essenciais para redigir e enviar mensagens com segurança e respeito.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Interactive Email Composer UI & Explanation Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Main Column: The Interactive Email Client (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-indigo-100 shadow-md overflow-hidden">
          {/* Email Window Top Bar */}
          <div className="bg-slate-900 px-4 py-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">Nova Mensagem</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            </div>
          </div>

          {/* Email Fields Area */}
          <div className="p-4 sm:p-5 space-y-3.5 bg-slate-50/50 border-b border-slate-100">
            {/* 1. Remetente (De:) */}
            <button
              type="button"
              onClick={() => handleElementClick('remetente')}
              aria-pressed={isSelected('remetente')}
              className={`w-full p-2.5 ${getItemClass('remetente')} flex items-center gap-2 text-xs sm:text-sm`}
            >
              <span className="font-bold text-slate-500 w-16 shrink-0 flex items-center gap-1">
                De:
                {isDiscovered('remetente') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </span>
              <span className="font-mono text-slate-800 font-semibold bg-white/80 px-2 py-1 rounded-md border border-slate-200">
                maria.santos@escola.pt
              </span>
              <span className="ml-auto text-[10px] font-bold text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full hidden sm:inline">
                {isSelected('remetente') ? 'A Ver' : 'Remetente'}
              </span>
            </button>

            {/* 2. Destinatário (Para:) */}
            <button
              type="button"
              onClick={() => handleElementClick('destinatario')}
              aria-pressed={isSelected('destinatario')}
              className={`w-full p-2.5 ${getItemClass('destinatario')} flex items-center gap-2 text-xs sm:text-sm`}
            >
              <span className="font-bold text-slate-500 w-16 shrink-0 flex items-center gap-1">
                Para:
                {isDiscovered('destinatario') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </span>
              <span className="font-mono text-slate-800 font-semibold bg-white/80 px-2 py-1 rounded-md border border-slate-200">
                professor.silva@escola.pt
              </span>
              <span className="ml-auto text-[10px] font-bold text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full hidden sm:inline">
                {isSelected('destinatario') ? 'A Ver' : 'Destinatário'}
              </span>
            </button>

            {/* 3. Assunto */}
            <button
              type="button"
              onClick={() => handleElementClick('assunto')}
              aria-pressed={isSelected('assunto')}
              className={`w-full p-2.5 ${getItemClass('assunto')} flex items-center gap-2 text-xs sm:text-sm`}
            >
              <span className="font-bold text-slate-500 w-16 shrink-0 flex items-center gap-1">
                Assunto:
                {isDiscovered('assunto') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </span>
              <span className="font-sans font-bold text-slate-900 bg-white/80 px-2 py-1 rounded-md border border-slate-200 flex-1">
                Trabalho de TIC - 5.º A
              </span>
              <span className="ml-auto text-[10px] font-bold text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full hidden sm:inline">
                {isSelected('assunto') ? 'A Ver' : 'Assunto'}
              </span>
            </button>
          </div>

          {/* Email Body & Composition Structure */}
          <div className="p-4 sm:p-5 space-y-3 bg-white min-h-[220px]">
            {/* 4. Saudação */}
            <button
              type="button"
              onClick={() => handleElementClick('saudacao')}
              aria-pressed={isSelected('saudacao')}
              className={`w-full p-2.5 ${getItemClass('saudacao')} text-xs sm:text-sm font-sans font-semibold text-indigo-950 flex items-center justify-between`}
            >
              <span>Caro Professor Silva,</span>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                {isDiscovered('saudacao') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                [Saudação]
              </span>
            </button>

            {/* 5. Corpo da Mensagem */}
            <button
              type="button"
              onClick={() => handleElementClick('corpo')}
              aria-pressed={isSelected('corpo')}
              className={`w-full p-3 ${getItemClass('corpo')} text-xs sm:text-sm font-sans text-slate-800 leading-relaxed space-y-2`}
            >
              <p>
                Gostaria de saber se o nosso trabalho sobre segurança na Internet pode incluir ilustrações desenhadas por nós e exemplos de palavras-passe fortes.
              </p>
              <p>
                Obrigada pela sua ajuda e disponibilidade.
              </p>
              <div className="flex justify-end pt-1">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                  {isDiscovered('corpo') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  [Corpo da Mensagem]
                </span>
              </div>
            </button>

            {/* 6. Despedida */}
            <button
              type="button"
              onClick={() => handleElementClick('despedida')}
              aria-pressed={isSelected('despedida')}
              className={`w-full p-2.5 ${getItemClass('despedida')} text-xs sm:text-sm font-sans text-slate-700 font-medium flex items-center justify-between`}
            >
              <span>Com os melhores cumprimentos,</span>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                {isDiscovered('despedida') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                [Despedida]
              </span>
            </button>

            {/* 7. Assinatura */}
            <button
              type="button"
              onClick={() => handleElementClick('assinatura')}
              aria-pressed={isSelected('assinatura')}
              className={`w-full p-2.5 ${getItemClass('assinatura')} text-xs sm:text-sm font-sans font-bold text-slate-900 flex items-center justify-between`}
            >
              <div>
                <span className="block">Maria Santos</span>
                <span className="text-xs text-slate-500 font-normal">5.º A — N.º 14</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                {isDiscovered('assinatura') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                [Assinatura]
              </span>
            </button>
          </div>

          {/* Email Bottom Action & Tool Bar */}
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            {/* Left Tools Group: Send + Format + Attach + Options */}
            <div className="flex flex-wrap items-center gap-2">
              {/* 8. Botão Enviar */}
              <button
                type="button"
                onClick={() => handleElementClick('enviar')}
                aria-pressed={isSelected('enviar')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-sm transition-all cursor-pointer ${
                  isSelected('enviar')
                    ? 'ring-2 ring-indigo-500 bg-indigo-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Enviar</span>
                {isDiscovered('enviar') && <Check className="w-3.5 h-3.5 text-emerald-300" />}
              </button>

              {/* 10. Barra de Formatação */}
              <button
                type="button"
                onClick={() => handleElementClick('formatacao')}
                aria-pressed={isSelected('formatacao')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border ${
                  isSelected('formatacao')
                    ? 'ring-2 ring-indigo-500 bg-indigo-50 border-indigo-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                } cursor-pointer transition-all`}
                title="Barra de Formatação"
              >
                <Bold className="w-3.5 h-3.5 text-slate-700" />
                <Italic className="w-3.5 h-3.5 text-slate-700" />
                <Underline className="w-3.5 h-3.5 text-slate-700" />
                <span className="text-[10px] font-bold text-slate-500 hidden sm:inline ml-1">
                  {isDiscovered('formatacao') ? '✓ Formatação' : 'Formatação'}
                </span>
              </button>

              {/* 9. Anexar Ficheiros */}
              <button
                type="button"
                onClick={() => handleElementClick('anexar')}
                aria-pressed={isSelected('anexar')}
                className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold text-slate-700 ${
                  isSelected('anexar')
                    ? 'ring-2 ring-indigo-500 bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                } cursor-pointer transition-all`}
                title="Anexar Ficheiros"
              >
                <Paperclip className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">
                  {isDiscovered('anexar') ? '✓ Anexo' : 'Anexar'}
                </span>
              </button>

              {/* 11. Outras Opções */}
              <button
                type="button"
                onClick={() => handleElementClick('opcoes')}
                aria-pressed={isSelected('opcoes')}
                className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold text-slate-700 ${
                  isSelected('opcoes')
                    ? 'ring-2 ring-indigo-500 bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                } cursor-pointer transition-all`}
                title="Outras Opções (Links, Emojis, Nuvem)"
              >
                <LinkIcon className="w-3.5 h-3.5 text-slate-600" />
                <Smile className="w-3.5 h-3.5 text-slate-600" />
                <HardDrive className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden md:inline text-[10px]">
                  {isDiscovered('opcoes') ? '✓ Opções' : 'Opções'}
                </span>
              </button>
            </div>

            {/* Right Tools: 12. Eliminar Rascunho */}
            <div>
              <button
                type="button"
                onClick={() => handleElementClick('eliminar')}
                aria-pressed={isSelected('eliminar')}
                className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold text-rose-600 ${
                  isSelected('eliminar')
                    ? 'ring-2 ring-rose-500 bg-rose-50 border-rose-300'
                    : 'bg-white border-slate-200 hover:border-rose-200 hover:bg-rose-50/50'
                } cursor-pointer transition-all`}
                title="Eliminar Rascunho"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span className="hidden sm:inline">
                  {isDiscovered('eliminar') ? '✓ Eliminar' : 'Eliminar'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Explanation Card for Selected Element (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-indigo-100 shadow-md space-y-5 animate-in fade-in">
            {/* Element Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                  {selectedElement.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {selectedElement.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
                    {selectedElement.name}
                  </h4>
                </div>
              </div>

              {isDiscovered(selectedElement.id) ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Descoberto
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Novo
                </span>
              )}
            </div>

            {/* Explanation Content */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              {/* O que é */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider block">
                  📖 O que é:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedElement.whatIs}
                </p>
              </div>

              {/* Para que serve */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1">
                <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider block">
                  🎯 Para que serve:
                </span>
                <p className="text-indigo-950 leading-relaxed">
                  {selectedElement.whatFor}
                </p>
              </div>

              {/* Exemplo */}
              {selectedElement.example && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                  <span className="text-[11px] font-black text-emerald-900 uppercase tracking-wider block">
                    💡 Exemplo:
                  </span>
                  <p className="text-emerald-950 font-mono text-xs font-semibold">
                    {selectedElement.example}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation between elements */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
              <span className="text-[11px] font-bold text-slate-400">
                {currentIndex + 1} de {totalElements}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span>Seguinte</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Checklist / Discovery Grid for the 12 Elements */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <BookmarkCheck className="w-4 h-4 text-indigo-600" />
            Elementos a Explorar ({discoveredCount}/{totalElements})
          </h4>
          <span className="text-[11px] font-bold text-slate-500">
            Clica em qualquer item para ver a explicação
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {EMAIL_ELEMENTS.map((el) => {
            const discovered = isDiscovered(el.id);
            const selected = isSelected(el.id);

            return (
              <button
                type="button"
                key={el.id}
                onClick={() => handleElementClick(el.id)}
                aria-pressed={selected}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  selected
                    ? 'ring-2 ring-indigo-500 bg-indigo-50 border-indigo-300'
                    : discovered
                    ? 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300 text-slate-800'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-600'
                }`}
              >
                <div className="truncate">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {el.badge}
                  </span>
                  <span className="text-xs font-bold truncate block">
                    {el.name.split(' (')[0]}
                  </span>
                </div>
                {discovered ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
