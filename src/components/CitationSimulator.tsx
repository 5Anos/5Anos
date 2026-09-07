import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Globe,
  Video,
  Image as ImageIcon,
  AlertCircle,
  HelpCircle,
  Award,
  ArrowRight,
} from 'lucide-react';
import { api } from '../services/api';
import { Language } from '../types';
import citationBlocksImg from '../assets/images/citation_blocks_art_1788807180640.jpg';

interface CitationSimulatorProps {
  language?: Language;
  onPointsEarned?: (points: number) => void;
}

type SourceType = 'website' | 'book' | 'video' | 'image';

export const CitationSimulator: React.FC<CitationSimulatorProps> = ({
  language = 'pt',
  onPointsEarned,
}) => {
  const [sourceType, setSourceType] = useState<SourceType>('website');

  // Form Fields
  const [authorLastName, setAuthorLastName] = useState('Soares');
  const [authorFirstName, setAuthorFirstName] = useState('R.');
  const [isOrganization, setIsOrganization] = useState(false);
  const [orgName, setOrgName] = useState('');

  const [year, setYear] = useState('2021');
  const [monthDay, setMonthDay] = useState('dezembro 6');

  const [title, setTitle] = useState(
    'Portugal volta a ter duas escolas no top 30 europeu do Financial Times'
  );
  const [sourceName, setSourceName] = useState('Público');
  const [edition, setEdition] = useState('');
  const [url, setUrl] = useState(
    'https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488'
  );

  const [copied, setCopied] = useState(false);

  // Detective Mini-Game State
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [gameError, setGameError] = useState(false);

  // Preset Examples
  const loadExample = (type: SourceType) => {
    setSourceType(type);
    setIsOrganization(false);
    setCopied(false);

    if (type === 'website') {
      // Exemplo real: Soares, R. no jornal Público
      setAuthorLastName('Soares');
      setAuthorFirstName('R.');
      setYear('2021');
      setMonthDay('dezembro 6');
      setTitle('Portugal volta a ter duas escolas no top 30 europeu do Financial Times');
      setSourceName('Público');
      setEdition('');
      setUrl('https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488');
    } else if (type === 'book') {
      // Exemplo de Livro do programa
      setAuthorLastName('Ribeiro');
      setAuthorFirstName('N.');
      setYear('2007');
      setMonthDay('');
      setTitle('Multimédia e Tecnologias Interactivas');
      setSourceName('FCA - Editora de Informática');
      setEdition('4.ª ed.');
      setUrl('');
    } else if (type === 'video') {
      // Exemplo de Vídeo YouTube
      setIsOrganization(true);
      setOrgName('Aceleração Digital com Fernando Tannure');
      setAuthorLastName('');
      setAuthorFirstName('');
      setYear('2017');
      setMonthDay('abril 14');
      setTitle('Primeiros Passos Canva | Tutorial Canva em Português #01');
      setSourceName('YouTube');
      setEdition('');
      setUrl('https://www.youtube.com/watch?v=3LVBzoaM2f8');
    } else if (type === 'image') {
      // Exemplo de Fotografia / Imagem
      setAuthorLastName('Coelho');
      setAuthorFirstName('J.');
      setYear('2021');
      setMonthDay('');
      setTitle('Gerações');
      setSourceName('Olhares');
      setEdition('');
      setUrl('https://olhares.com/geracoes-foto10344803.html');
    }
  };

  // Build the Author String
  const getAuthorString = (): string => {
    if (isOrganization) {
      return orgName.trim() ? `${orgName.trim()}.` : 'Nome da Organização/Canal.';
    }
    const last = authorLastName.trim();
    const first = authorFirstName.trim();
    if (last && first) {
      const formattedFirst = first.endsWith('.') ? first : `${first}.`;
      return `${last}, ${formattedFirst}`;
    }
    if (last) return `${last}.`;
    if (first) return `${first}.`;
    return 'Apelido, Nome.';
  };

  // Build the Date String
  const getDateString = (): string => {
    const y = year.trim() || 's.d.'; // sem data
    const md = monthDay.trim();
    if (sourceType === 'website' || sourceType === 'video') {
      if (md) return `(${y}, ${md}).`;
    }
    return `(${y}).`;
  };

  // Build the Title String
  const getTitleString = (): string => {
    return title.trim() || 'Título da Obra ou Notícia';
  };

  // Build the Source String
  const getSourceString = (): string => {
    const s = sourceName.trim() || 'Nome do Site, Jornal ou Editora';
    if (sourceType === 'book' && edition.trim()) {
      return `(${edition.trim()}). ${s}.`;
    }
    if (sourceType === 'video') {
      return `[Vídeo]. ${s}.`;
    }
    if (sourceType === 'image') {
      return `[Fotografia]. ${s}.`;
    }
    return `${s}.`;
  };

  // Clean URL string (strictly no "Consultado em")
  const getCleanUrl = (): string => {
    return url.trim();
  };

  // Full citation as plain text for copying
  const getFullCitationText = (): string => {
    const author = getAuthorString();
    const date = getDateString();
    const tit = getTitleString();
    const src = getSourceString();
    const cleanUrl = getCleanUrl();

    if (sourceType === 'book') {
      // Livro: título em itálico
      return `${author} ${date} ${tit}. ${src}`;
    }

    if (sourceType === 'website') {
      // Artigo web: fonte/jornal em itálico ou regular, link no fim sem 'Consultado em'
      return cleanUrl
        ? `${author} ${date} ${tit}. ${src} ${cleanUrl}`
        : `${author} ${date} ${tit}. ${src}`;
    }

    if (sourceType === 'video' || sourceType === 'image') {
      return cleanUrl
        ? `${author} ${date} ${tit} ${src} ${cleanUrl}`
        : `${author} ${date} ${tit} ${src}`;
    }

    return `${author} ${date} ${tit}. ${src} ${cleanUrl}`;
  };

  const handleCopy = () => {
    const text = getFullCitationText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Detective game items
  const puzzlePieces = [
    { id: 1, label: '1.º Quem fez? (Autor: Apelido, Nome)', color: 'bg-blue-500 text-white' },
    { id: 2, label: '2.º Quando? (Data entre parênteses)', color: 'bg-emerald-500 text-white' },
    { id: 3, label: '3.º O quê? (Título da obra)', color: 'bg-purple-500 text-white' },
    { id: 4, label: '4.º Onde? (Jornal, Site ou Editora)', color: 'bg-amber-500 text-white' },
    { id: 5, label: '5.º Link direto (URL sem "Consultado em")', color: 'bg-cyan-600 text-white' },
  ];

  const handlePuzzleClick = (id: number) => {
    if (selectedOrder.includes(id) || gameCompleted) return;

    const nextExpected = selectedOrder.length + 1;
    if (id === nextExpected) {
      const newOrder = [...selectedOrder, id];
      setSelectedOrder(newOrder);
      setGameError(false);

      if (newOrder.length === 5) {
        setGameCompleted(true);
        // Save reward points for student!
        api
          .saveProgress({
            activityId: 'challenge-apa7-simulator-detective',
            activityType: 'challenge',
            themeId: 'direitos-autor',
            score: 25,
            maxScore: 25,
            percentage: 100,
            activityTitle: 'Desafio do Detetive APA 7',
          })
          .then((res) => {
            if (onPointsEarned) onPointsEarned(25);
          })
          .catch(() => {});
      }
    } else {
      setGameError(true);
      setTimeout(() => setGameError(false), 1200);
    }
  };

  const resetGame = () => {
    setSelectedOrder([]);
    setGameCompleted(false);
    setGameError(false);
  };

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-amber-200 shadow-lg overflow-hidden my-6">
      {/* Top Banner with Image and Kid-Friendly Greeting */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-8 text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-amber-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Simulador Interativo • 5.º Ano</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            O Meu Criador de Referências APA 7! 📚✨
          </h3>
          <p className="text-xs sm:text-sm text-amber-50 font-medium leading-relaxed">
            Monta referências bibliográficas perfeitas como se fossem peças de Lego. Preenche os campos abaixo ou escolhe um exemplo real para ver a magia acontecer!
          </p>
        </div>

        <div className="relative z-10 shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white/40 bg-white/10 hidden sm:block">
          <img
            src={citationBlocksImg}
            alt="Blocos de citação"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CRITICAL RULE HIGHLIGHT: NO "Consultado em" */}
      <div className="mx-4 sm:mx-6 mt-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shrink-0 mt-0.5">
          💡
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <span className="font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
            <span>Regra de Ouro da Norma APA (7.ª edição):</span>
          </span>
          <p className="text-amber-900 leading-relaxed font-medium">
            Nas páginas da Internet, <strong>JÁ NÃO SE ESCREVE</strong> &quot;Consultado em...&quot; nem a data de consulta! Coloca-se diretamente o endereço web (URL) no final da referência.
          </p>
        </div>
      </div>

      {/* Tabs: Escolhe o tipo de fonte */}
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
            1. Escolhe o que queres citar no teu trabalho escolar:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => loadExample('website')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                sourceType === 'website'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>🌐 Notícia / Página Web</span>
            </button>

            <button
              type="button"
              onClick={() => loadExample('book')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                sourceType === 'book'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>📖 Livro ou Manual</span>
            </button>

            <button
              type="button"
              onClick={() => loadExample('video')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                sourceType === 'video'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <Video className="w-5 h-5 text-rose-600" />
              <span>🎥 Vídeo YouTube</span>
            </button>

            <button
              type="button"
              onClick={() => loadExample('image')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                sourceType === 'image'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              <span>🖼️ Foto ou Imagem</span>
            </button>
          </div>
        </div>

        {/* Guided Form Fields for 10-year-olds */}
        <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>✍️ 2. Informação da Fonte (Podes alterar ou escrever os teus dados)</span>
            </span>
            <button
              type="button"
              onClick={() => loadExample(sourceType)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Exemplo</span>
            </button>
          </div>

          {/* Author fields */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {!isOrganization ? (
              <>
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    👤 Apelido do Autor (Ex: Soares, Ribeiro, Saramago)
                  </label>
                  <input
                    type="text"
                    value={authorLastName}
                    onChange={(e) => setAuthorLastName(e.target.value)}
                    placeholder="Soares"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Inicial do Autor (Ex: R., N.)
                  </label>
                  <input
                    type="text"
                    value={authorFirstName}
                    onChange={(e) => setAuthorFirstName(e.target.value)}
                    placeholder="R."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <div className="sm:col-span-12">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  🏛️ Nome do Canal, Organização ou Entidade
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Ex: Aceleração Digital com Fernando Tannure"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isOrgCheck"
              checked={isOrganization}
              onChange={(e) => setIsOrganization(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
            />
            <label htmlFor="isOrgCheck" className="text-xs text-slate-600 cursor-pointer">
              O autor é uma instituição, jornal ou canal (ex: Público, NASA, Canal YouTube)?
            </label>
          </div>

          {/* Date and Title */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                📅 Ano de publicação (Ex: 2021)
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2021"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {(sourceType === 'website' || sourceType === 'video') && (
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Mês e Dia (Ex: dezembro 6)
                </label>
                <input
                  type="text"
                  value={monthDay}
                  onChange={(e) => setMonthDay(e.target.value)}
                  placeholder="dezembro 6"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )}

            <div className={sourceType === 'website' || sourceType === 'video' ? 'sm:col-span-4' : 'sm:col-span-8'}>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                🏷️ Onde foi publicado? (Site, Jornal ou Editora)
              </label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="Público, YouTube, FCA..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Title of work */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              📰 Título da Notícia, Artigo ou Livro
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da obra"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Book Edition (only if book) */}
          {sourceType === 'book' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Edição (Apenas a partir da 2.ª edição! Ex: 4.ª ed.)
              </label>
              <input
                type="text"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                placeholder="4.ª ed. (deixar em branco se for a 1.ª edição)"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {/* Web URL (if website, video or image) */}
          {sourceType !== 'book' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                🔗 Link Web direto (URL com https:// - Repara que NÃO leva &quot;Consultado em&quot;!)
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm font-mono text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-700"
              />
            </div>
          )}
        </div>

        {/* Real-Time Visual Lego Blocks Preview */}
        <div>
          <span className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
            🧩 3. Vê como os blocos se unem na norma APA (7.ª edição):
          </span>

          <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-100 rounded-2xl border border-slate-200">
            <span className="px-3 py-1.5 rounded-xl bg-blue-100 border border-blue-300 text-blue-900 font-bold text-xs sm:text-sm flex items-center gap-1 shadow-2xs">
              <span>👤</span>
              <span>{getAuthorString()}</span>
            </span>

            <span className="text-slate-400 font-bold">+</span>

            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs sm:text-sm flex items-center gap-1 shadow-2xs">
              <span>📅</span>
              <span>{getDateString()}</span>
            </span>

            <span className="text-slate-400 font-bold">+</span>

            <span className="px-3 py-1.5 rounded-xl bg-purple-100 border border-purple-300 text-purple-900 font-bold text-xs sm:text-sm flex items-center gap-1 shadow-2xs">
              <span>🏷️</span>
              <span className={sourceType === 'book' ? 'italic' : ''}>{getTitleString()}.</span>
            </span>

            <span className="text-slate-400 font-bold">+</span>

            <span className="px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-1 shadow-2xs">
              <span>🏛️</span>
              <span className={sourceType === 'website' ? 'italic' : ''}>{getSourceString()}</span>
            </span>

            {getCleanUrl() && (
              <>
                <span className="text-slate-400 font-bold">+</span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-100 border border-cyan-300 text-cyan-950 font-bold text-xs sm:text-sm flex items-center gap-1 shadow-2xs">
                  <span>🔗</span>
                  <span className="truncate max-w-[200px] sm:max-w-xs">{getCleanUrl()}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Final Formatted Reference Card (Ready to Copy for School Homework!) */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>✨</span>
              <span>Referência Pronta para o Teu Trabalho Escolar</span>
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Referência</span>
                </>
              )}
            </button>
          </div>

          {/* Formatted Text Preview with Italic where appropriate according to APA 7 */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 font-sans text-sm sm:text-base leading-relaxed text-slate-100 selection:bg-amber-400 selection:text-slate-950">
            <span>{getAuthorString()} </span>
            <span>{getDateString()} </span>
            {sourceType === 'book' ? (
              <em className="italic font-serif">{getTitleString()}. </em>
            ) : (
              <span>{getTitleString()}. </span>
            )}
            {sourceType === 'website' ? (
              <em className="italic font-serif">{getSourceString()} </em>
            ) : (
              <span>{getSourceString()} </span>
            )}
            {getCleanUrl() && (
              <span className="text-cyan-300 underline underline-offset-2 break-all">
                {getCleanUrl()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>📋</span>
            <span>
              Podes colar esta linha na secção &quot;Referências Bibliográficas&quot; do teu trabalho de TIC, Português ou História!
            </span>
          </div>
        </div>

        {/* Detective Mini-Game: Build the APA 7 puzzle (+25 Points) */}
        <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h4 className="text-sm sm:text-base font-black text-amber-950">
                Desafio do Pequeno Detetive: Ordena a Citação (+25 Pontos!) 🕵️‍♂️
              </h4>
            </div>
            {gameCompleted && (
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full animate-bounce">
                🎉 Desafio Concluído! +25 Pontos
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-amber-900 font-medium">
            Clica nas peças pela ordem correta da norma APA (7.ª edição) para ganhares a medalha de Mestre das Referências:
          </p>

          {gameError && (
            <div className="p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Ups! Essa não é a peça seguinte. Lembra-te: Autor ➔ Data ➔ Título ➔ Fonte ➔ Link. Tenta de novo!</span>
            </div>
          )}

          {/* Available pieces to click */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {puzzlePieces.map((piece) => {
              const isSelected = selectedOrder.includes(piece.id);
              const orderIndex = selectedOrder.indexOf(piece.id) + 1;
              return (
                <button
                  key={piece.id}
                  type="button"
                  onClick={() => handlePuzzleClick(piece.id)}
                  disabled={isSelected || gameCompleted}
                  className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs opacity-90'
                      : 'bg-white border-amber-200 text-slate-800 hover:border-amber-400 hover:bg-amber-100/50 shadow-2xs'
                  }`}
                >
                  <span>{piece.label}</span>
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-white text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                      ✓ {orderIndex}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {gameCompleted && (
            <div className="pt-2 flex items-center justify-between">
              <p className="text-xs sm:text-sm font-black text-emerald-900">
                Parabéns! Aprendeste a ordem correta da APA 7. Os teus trabalhos nunca mais terão plágio!
              </p>
              <button
                type="button"
                onClick={resetGame}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
              >
                Jogar Novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
