import React, { useState } from 'react';
import {
  Search,
  Lock,
  Star,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Home,
  Plus,
  X,
  ShieldCheck,
  Globe,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Share2,
  ExternalLink,
  BookOpen,
  School,
  Compass,
  Trophy,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { AudioSpeakButton } from './AudioSpeakButton';

interface GoogleChromeSimulatorProps {
  language?: Language;
}

type TabId = 'google' | 'escola' | 'ciencia' | 'rtp';

interface SearchResultItem {
  id: string;
  isAd?: boolean;
  siteName: string;
  url: string;
  title: string;
  snippet: string;
  badge?: string;
  verified?: boolean;
}

export const GoogleChromeSimulator: React.FC<GoogleChromeSimulatorProps> = ({ language = 'pt' }) => {
  // Simulator View Mode: 'browser' | 'anatomy' | 'missions'
  const [viewMode, setViewMode] = useState<'browser' | 'anatomy' | 'missions'>('browser');

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabId>('google');
  const [openTabs, setOpenTabs] = useState<TabId[]>(['google', 'ciencia']);

  // URL / Search Bar state
  const [urlInput, setUrlInput] = useState<string>('https://www.google.pt');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  // Browser state
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userBookmarks, setUserBookmarks] = useState<Array<{ name: string; url: string; icon: string }>>([
    { name: 'Portal da Escola', url: 'https://area.escola.pt', icon: '🏫' },
    { name: 'Ciência Viva Kids', url: 'https://www.cienciaviva.pt', icon: '🌍' },
    { name: 'RTP Ensina', url: 'https://ensina.rtp.pt', icon: '🦉' },
  ]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showLockInfo, setShowLockInfo] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>(['https://www.google.pt']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Hotspot selection in Anatomy mode
  const [activeHotspot, setActiveHotspot] = useState<string>('tabs');

  // Missions State
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});

  const markMissionComplete = (missionId: string) => {
    if (!completedMissions[missionId]) {
      setCompletedMissions((prev) => {
        const updated = { ...prev, [missionId]: true };
        try {
          confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
        } catch {
          // ignore
        }
        return updated;
      });
    }
  };

  // Pre-configured educational search scenarios
  const QUICK_SEARCH_CHIPS = [
    {
      label: '🐆 "lince ibérico" habitat',
      query: '"lince ibérico" habitat',
      tip: 'Usa aspas (" ") para procurar a expressão exata contínua!',
      missionKey: 'quotes',
    },
    {
      label: '🦇 morcego -batman',
      query: 'morcego -batman',
      tip: 'O sinal de menos (-) elimina filmes e super-heróis da pesquisa!',
      missionKey: 'minus',
    },
    {
      label: '🐬 golfinho sado site:.pt',
      query: 'golfinho sado site:.pt',
      tip: 'O operador site:.pt restringe a pesquisa apenas a páginas de Portugal!',
      missionKey: 'site',
    },
    {
      label: '🪐 planetas sistema solar',
      query: 'planetas sistema solar',
      tip: 'Palavras-chave diretas e sem enrolação ("olá", "por favor")!',
      missionKey: 'keywords',
    },
  ];

  // Execute Search
  const handleExecuteSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    setSubmittedQuery(trimmed);
    setIsSearching(true);
    setShowSearchResults(true);
    setUrlInput(`https://www.google.pt/search?q=${encodeURIComponent(trimmed)}`);

    // Track missions
    if (trimmed.includes('"')) markMissionComplete('m_quotes');
    if (trimmed.includes('-')) markMissionComplete('m_minus');
    if (trimmed.toLowerCase().includes('site:')) markMissionComplete('m_site');
    markMissionComplete('m_search');

    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  // Navigation handlers
  const handleNavigateUrl = (targetUrl: string, tabName?: TabId) => {
    setUrlInput(targetUrl);
    setShowSearchResults(false);
    if (tabName) setActiveTab(tabName);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), targetUrl]);
    setHistoryIndex((prev) => prev + 1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleToggleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    if (next) {
      markMissionComplete('m_star');
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      // Add current page to bookmarks if not present
      if (!userBookmarks.some((b) => b.url === urlInput)) {
        setUserBookmarks((prev) => [
          ...prev,
          {
            name: activeTab === 'google' ? 'Google Pesquisa' : activeTab.toUpperCase(),
            url: urlInput,
            icon: '⭐',
          },
        ]);
      }
    }
  };

  const handleOpenNewTab = () => {
    markMissionComplete('m_tab');
    if (!openTabs.includes('escola')) {
      setOpenTabs((prev) => [...prev, 'escola']);
      setActiveTab('escola');
      setUrlInput('https://area.escola.pt');
    } else if (!openTabs.includes('rtp')) {
      setOpenTabs((prev) => [...prev, 'rtp']);
      setActiveTab('rtp');
      setUrlInput('https://ensina.rtp.pt');
    } else {
      setActiveTab('google');
      setUrlInput('https://www.google.pt');
      setShowSearchResults(false);
    }
  };

  const handleCloseTab = (t: TabId, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openTabs.length <= 1) return;
    const remaining = openTabs.filter((tab) => tab !== t);
    setOpenTabs(remaining);
    if (activeTab === t) {
      setActiveTab(remaining[0]);
    }
  };

  // Generate simulated search results based on query
  const getSimulatedResults = (): SearchResultItem[] => {
    const q = submittedQuery.toLowerCase();

    const results: SearchResultItem[] = [];

    // Ad result (educational illustration)
    results.push({
      id: 'ad-1',
      isAd: true,
      siteName: 'LojaMundialOnline.pt',
      url: 'https://www.lojamundialonline.pt/promo/brinquedos',
      title: 'Comprar Brinquedos e Peluches Online — Entrega Imediata',
      snippet:
        'Grande desconto em artigos diversos! ⚠️ ATENÇÃO ALUNO: Isto é um ANÚNCIO PATROCINADO. A loja pagou para aparecer em 1.º lugar. Como detetive escolar, procura fontes educativas reais abaixo!',
      badge: 'Anúncio Patrocinado',
    });

    if (q.includes('lince')) {
      results.push({
        id: 'res-lince-icnf',
        siteName: 'ICNF — Instituto da Conservação da Natureza',
        url: 'https://icnf.pt/biodiversidade/lince-iberico',
        title: 'Lince-ibérico (Lynx pardinus) — Biologia, Habitat e Alimentação',
        snippet:
          'O lince-ibérico é o felino mais ameaçado da Europa. Pesa entre 9 e 13 kg e a sua alimentação em Portugal é quase exclusivamente coelho-bravo selvagem.',
        badge: 'Fonte Oficial .pt',
        verified: true,
      });
      results.push({
        id: 'res-lince-ciencia',
        siteName: 'Ciência Viva Kids',
        url: 'https://www.cienciaviva.pt/fauna/lince',
        title: 'Como salvar o Lince em Portugal — Guia do Jovem Cientista',
        snippet:
          'Descobre os centros de reprodução em cativeiro em Silves e como os biólogos portugueses libertam linces no Vale do Guadiana.',
        verified: true,
      });
    } else if (q.includes('morcego')) {
      if (q.includes('-batman')) {
        results.push({
          id: 'res-morcego-eco',
          siteName: 'Naturlink & ICNF Portugal',
          url: 'https://naturlink.pt/fauna/morcegos-portugal',
          title: 'Morcegos em Portugal: Mamíferos Voadores Benéficos',
          snippet:
            '🎯 FILTRO ATIVO (-batman): Resultados de filmes e banda desenhada eliminados! Os morcegos alimentam-se de toneladas de insetos pragas por noite.',
          badge: 'Filtro Menos Ativo (-)',
          verified: true,
        });
      } else {
        results.push({
          id: 'res-morcego-geral',
          siteName: 'Cinema & Heróis Wiki',
          url: 'https://cinema-filmes.pt/batman-morcego',
          title: 'Batman: O Cavaleiro das Trevas e o símbolo do Morcego',
          snippet:
            'Página sobre filmes de Hollywood. Dica: Se querias pesquisar o animal biológico, usa o operador: morcego -batman para eliminar os filmes!',
        });
      }
    } else if (q.includes('golfinho')) {
      results.push({
        id: 'res-golfinho-sado',
        siteName: 'Reserva Natural do Estuário do Sado (ICNF)',
        url: 'https://icnf.pt/areas-protegidas/golfinhos-sado',
        title: 'A Comunidade Residente de Roazes-corvineiros do Rio Sado',
        snippet:
          'O estuário do Sado em Setúbal acolhe uma das únicas colónias residentes de golfinhos em estuários na Europa.',
        badge: 'site:.pt Filtrado',
        verified: true,
      });
    } else {
      // Generic school query result
      results.push({
        id: 'res-generic-1',
        siteName: 'RTP Ensina — Estudo do Meio 5.º Ano',
        url: 'https://ensina.rtp.pt/artigos/pesquisa-escolar',
        title: `Informação Escolar Verificada sobre: ${submittedQuery || 'A Tua Pesquisa'}`,
        snippet:
          'Conteúdo didático estruturado para o 2.º Ciclo do Ensino Básico com factos verificados por professores e cientistas.',
        badge: 'Recurso Educativo Oficial',
        verified: true,
      });
      results.push({
        id: 'res-generic-2',
        siteName: 'Dicionário Priberam da Língua Portuguesa',
        url: 'https://dicionario.priberam.pt',
        title: `Significado e Definições de Termos — Língua Portuguesa`,
        snippet:
          'Consulte definições gramaticais, sinónimos e contexto ortográfico segundo o Acordo Ortográfico.',
        verified: true,
      });
    }

    return results;
  };

  return (
    <div className="w-full bg-slate-900/95 text-slate-100 rounded-3xl border-2 border-indigo-400/40 shadow-2xl overflow-hidden font-sans">
      {/* Top Simulator Banner with Mode Selectors */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-900/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-emerald-500 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg">
              🌐
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-wide">
                Simulador do Navegador Google Chrome
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                5.º Ano TIC
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Aprende a navegar, pesquisar e usar o navegador como um detetive digital!
            </p>
          </div>
        </div>

        {/* View Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-2xl border border-slate-700">
          <button
            onClick={() => setViewMode('browser')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'browser'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Navegar no Chrome</span>
          </button>

          <button
            onClick={() => setViewMode('anatomy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'anatomy'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Anatomia da Janela</span>
          </button>

          <button
            onClick={() => setViewMode('missions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'missions'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Missões ({Object.keys(completedMissions).length}/4)</span>
          </button>
        </div>
      </div>

      {/* ANATOMY EXPLAINER (if in anatomy mode) */}
      {viewMode === 'anatomy' && (
        <div className="p-4 sm:p-6 bg-slate-900 border-b border-indigo-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-black text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Guia Visual: As Partes Principais do Navegador Google Chrome
            </h4>
            <span className="text-xs text-slate-400">Clica em cada elemento para aprender a função:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'tabs', label: '1. Separadores', icon: '📑', color: 'border-blue-500 bg-blue-950/40 text-blue-300' },
              { id: 'nav', label: '2. Voltar/Avançar', icon: '⬅️', color: 'border-purple-500 bg-purple-950/40 text-purple-300' },
              { id: 'omnibox', label: '3. Barra Endereço', icon: '🌐', color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300' },
              { id: 'lock', label: '4. Cadeado HTTPS', icon: '🔒', color: 'border-amber-500 bg-amber-950/40 text-amber-300' },
              { id: 'star', label: '5. Marcadores ⭐', icon: '⭐', color: 'border-yellow-500 bg-yellow-950/40 text-yellow-300' },
              { id: 'search', label: '6. Motor de Busca', icon: '🔎', color: 'border-rose-500 bg-rose-950/40 text-rose-300' },
            ].map((part) => (
              <button
                key={part.id}
                onClick={() => setActiveHotspot(part.id)}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex flex-col gap-1 ${
                  activeHotspot === part.id ? `${part.color} ring-2 ring-white/30 scale-102` : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{part.icon}</span>
                <span>{part.label}</span>
              </button>
            ))}
          </div>

          {/* Active Hotspot Explainer Card */}
          <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-slate-200 text-xs sm:text-sm space-y-2">
            {activeHotspot === 'tabs' && (
              <div>
                <p className="font-bold text-white text-base">📑 Separadores (Tabs):</p>
                <p className="text-slate-300 mt-1">
                  Permitem ter <strong>várias páginas da Internet abertas ao mesmo tempo</strong> na mesma janela! Podes ter o portal da escola num separador, a pesquisa do lince no outro e o dicionário no terceiro sem perderes nada. Usa o botão <strong>+</strong> para abrir um novo separador.
                </p>
              </div>
            )}
            {activeHotspot === 'nav' && (
              <div>
                <p className="font-bold text-white text-base">⬅️ Botões Voltar, Avançar e Recarregar (🔄):</p>
                <p className="text-slate-300 mt-1">
                  Se clicares num link e quiseres <strong>voltar atrás</strong>, clica na seta para a esquerda. O botão circular (🔄) serve para <strong>atualizar a página</strong> se a internet falhar ou para ver novidades.
                </p>
              </div>
            )}
            {activeHotspot === 'omnibox' && (
              <div>
                <p className="font-bold text-white text-base">🌐 Barra de Endereço (Omnibox):</p>
                <p className="text-slate-300 mt-1">
                  É a barra no topo onde escreves a <strong>morada exata (URL)</strong> de um site que já conheces (ex.: <code>https://area.escola.pt</code>). No Google Chrome, se não souberes a morada exata, podes escrever lá palavras-chave e ele pesquisa logo no Google!
                </p>
              </div>
            )}
            {activeHotspot === 'lock' && (
              <div>
                <p className="font-bold text-white text-base">🔒 Cadeado de Segurança (HTTPS):</p>
                <p className="text-slate-300 mt-1">
                  Indica que a ligação entre o teu computador e o servidor está <strong>cifrada e protegida contra espiões</strong>. <em>Atenção de detetive:</em> o cadeado protege a transmissão de senhas e dados, mas não garante que as notícias escritas no site sejam verdadeiras!
                </p>
              </div>
            )}
            {activeHotspot === 'star' && (
              <div>
                <p className="font-bold text-white text-base">⭐ Estrela de Marcadores (Favoritos):</p>
                <p className="text-slate-300 mt-1">
                  Clica na <strong>estrela ⭐</strong> para guardar atalhos para os teus sites favoritos na Barra de Marcadores. Assim nunca mais precisas de decorar a morada da escola nem de a pesquisar todos os dias!
                </p>
              </div>
            )}
            {activeHotspot === 'search' && (
              <div>
                <p className="font-bold text-white text-base">🔎 Motor de Busca vs Navegador:</p>
                <p className="text-slate-300 mt-1">
                  <strong>Não confundas!</strong> O <em>Google Chrome</em> é o <strong>Navegador</strong> (o carro que viaja na estrada). O <em>Google</em> é o <strong>Motor de Busca</strong> (o bibliotecário inteligente que procura nos milhões de páginas da Web).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MISSIONS PANEL (if in missions mode) */}
      {viewMode === 'missions' && (
        <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-indigo-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-black text-emerald-400 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              Missões do Detetive Chrome (Aprender a Navegar)
            </h4>
            <span className="text-xs text-emerald-300 font-bold">
              {Object.keys(completedMissions).length} de 4 Concluídas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_star']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-xl">{completedMissions['m_star'] ? '✅' : '⭐'}</span>
                <div>
                  <p className="font-bold text-white">Missão 1: Guardar nos Favoritos</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Clica na estrela ⭐ no topo do navegador para guardar a página na barra de marcadores.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_quotes']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-xl">{completedMissions['m_quotes'] ? '✅' : '🐆'}</span>
                <div>
                  <p className="font-bold text-white">Missão 2: Superpoder das Aspas</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pesquisa usando aspas exatas, por exemplo: <code>"lince ibérico" habitat</code>.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_minus']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-xl">{completedMissions['m_minus'] ? '✅' : '🦇'}</span>
                <div>
                  <p className="font-bold text-white">Missão 3: Eliminar Termos com Menos (-)</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pesquisa sobre o mamífero voador sem filmes de super-heróis: <code>morcego -batman</code>.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_lock']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-xl">{completedMissions['m_lock'] ? '✅' : '🔒'}</span>
                <div>
                  <p className="font-bold text-white">Missão 4: Inspecionar o Cadeado HTTPS</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Clica no cadeado 🔒 na barra de endereços para ver os detalhes da ligação segura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REALISTIC GOOGLE CHROME BROWSER WINDOW SHELL */}
      <div className="p-2 sm:p-4 bg-slate-950">
        <div className="rounded-2xl border-2 border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden">
          {/* Chrome Top Header Bar: Window controls & Tabs */}
          <div className="bg-slate-800/90 pt-2 px-3 flex items-center gap-2 border-b border-slate-700 select-none">
            {/* Window Dots (mac/pc style) */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>

            {/* Chrome Tabs Strip */}
            <div className="flex items-end gap-1 flex-1 overflow-x-auto no-scrollbar">
              {openTabs.map((tab) => {
                const isActive = activeTab === tab;
                const tabTitles: Record<TabId, { title: string; icon: string }> = {
                  google: { title: 'Google — Nova Pesquisa', icon: '🔍' },
                  escola: { title: 'Portal da Escola (.pt)', icon: '🏫' },
                  ciencia: { title: 'Ciência Viva Kids', icon: '🌍' },
                  rtp: { title: 'RTP Ensina 5.º Ano', icon: '🦉' },
                };
                const info = tabTitles[tab];

                return (
                  <div
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === 'google') setUrlInput('https://www.google.pt');
                      if (tab === 'escola') setUrlInput('https://area.escola.pt');
                      if (tab === 'ciencia') setUrlInput('https://www.cienciaviva.pt');
                      if (tab === 'rtp') setUrlInput('https://ensina.rtp.pt');
                    }}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-xl text-xs font-semibold cursor-pointer max-w-[200px] transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs border-t-2 border-indigo-400'
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    <span>{info.icon}</span>
                    <span className="truncate">{info.title}</span>
                    {openTabs.length > 1 && (
                      <button
                        onClick={(e) => handleCloseTab(tab, e)}
                        className="ml-auto opacity-40 group-hover:opacity-100 hover:bg-slate-700/80 p-0.5 rounded text-slate-300"
                        title="Fechar separador"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* New Tab Button (+) */}
              <button
                onClick={handleOpenNewTab}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors cursor-pointer mb-1"
                title="Abrir novo separador (+)"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chrome Toolbar: Navigation, Omnibox, Star, Tools */}
          <div className="bg-slate-900 p-2 sm:px-3 sm:py-2 flex items-center gap-2 border-b border-slate-800">
            {/* Navigation buttons */}
            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={() => {
                  if (showSearchResults) {
                    setShowSearchResults(false);
                    setUrlInput('https://www.google.pt');
                  }
                }}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Voltar atrás"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                className="p-1.5 rounded-lg text-slate-600 cursor-not-allowed"
                title="Avançar"
                disabled
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleRefresh}
                className={`p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ${
                  isRefreshing ? 'animate-spin text-indigo-400' : ''
                }`}
                title="Recarregar página (🔄)"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('google');
                  setUrlInput('https://www.google.pt');
                  setShowSearchResults(false);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Página Inicial (Google)"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>

            {/* Omnibox (Address & Search Bar) */}
            <div className="relative flex-1 flex items-center bg-slate-950 rounded-full border border-slate-700 px-3 py-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 transition-all">
              {/* Security Lock Icon */}
              <button
                onClick={() => {
                  setShowLockInfo((prev) => !prev);
                  markMissionComplete('m_lock');
                }}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 mr-2 cursor-pointer transition-colors text-xs font-mono font-bold"
                title="Clica para inspecionar a segurança HTTPS"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-[11px]">https://</span>
              </button>

              {/* URL Text Input */}
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (urlInput.includes('.') && !urlInput.includes(' ')) {
                      // Navigate directly
                      setShowSearchResults(false);
                    } else {
                      handleExecuteSearch(urlInput);
                    }
                  }
                }}
                className="w-full bg-transparent text-xs font-mono text-slate-200 outline-hidden tracking-tight"
                placeholder="Escreve uma morada URL ou pesquisa no Google..."
              />

              {/* Star Bookmark Button */}
              <button
                onClick={handleToggleBookmark}
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isBookmarked
                    ? 'text-amber-400 scale-110 drop-shadow-sm'
                    : 'text-slate-500 hover:text-amber-300'
                }`}
                title={isBookmarked ? 'Guardado nos Marcadores ⭐' : 'Guardar nos Marcadores ⭐'}
              >
                <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            {/* Profile Avatar & Menu dots */}
            <div className="flex items-center gap-1.5 text-slate-400 pl-1">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                5º
              </div>
              <span className="text-slate-600 text-sm font-bold">⋮</span>
            </div>
          </div>

          {/* HTTPS Lock Info Popover */}
          {showLockInfo && (
            <div className="p-3 bg-emerald-950/90 border-b border-emerald-500/40 text-xs text-emerald-200 flex items-start justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">🔒 A Ligação ao Site é Segura (HTTPS)</p>
                  <p className="text-slate-300 mt-0.5">
                    As informações que envias (como palavras-passe ou mensagens) são cifradas e privadas.{' '}
                    <strong className="text-amber-300">
                      Atenção: o cadeado protege a viagem dos dados, mas não garante que as notícias escritas sejam verdadeiras!
                    </strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLockInfo(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bookmarks Bar */}
          <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] font-medium text-slate-300 no-scrollbar">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider shrink-0">
              Marcadores:
            </span>
            {userBookmarks.map((bm, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUrlInput(bm.url);
                  if (bm.url.includes('escola')) setActiveTab('escola');
                  else if (bm.url.includes('ciencia')) setActiveTab('ciencia');
                  else if (bm.url.includes('ensina')) setActiveTab('rtp');
                  setShowSearchResults(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-950/80 hover:text-white hover:border-indigo-400/50 border border-slate-700/60 transition-all shrink-0 cursor-pointer"
              >
                <span>{bm.icon}</span>
                <span>{bm.name}</span>
              </button>
            ))}
          </div>

          {/* SIMULATED PAGE CONTENT CANVAS */}
          <div className="min-h-[420px] bg-slate-950 p-4 sm:p-6 text-slate-100">
            {/* TAB 1: GOOGLE SEARCH ENGINE */}
            {activeTab === 'google' && (
              <div className="max-w-2xl mx-auto space-y-6">
                {!showSearchResults ? (
                  // Google Homepage
                  <div className="py-6 sm:py-10 text-center space-y-6 animate-fadeIn">
                    {/* Google Brand Logo (authentic colors) */}
                    <div className="flex items-center justify-center gap-1 select-none">
                      <span className="text-4xl sm:text-5xl font-black text-blue-500">G</span>
                      <span className="text-4xl sm:text-5xl font-black text-rose-500">o</span>
                      <span className="text-4xl sm:text-5xl font-black text-amber-500">o</span>
                      <span className="text-4xl sm:text-5xl font-black text-blue-500">g</span>
                      <span className="text-4xl sm:text-5xl font-black text-emerald-500">l</span>
                      <span className="text-4xl sm:text-5xl font-black text-rose-500">e</span>
                      <span className="ml-2 px-2 py-0.5 rounded-lg bg-indigo-900/60 border border-indigo-400/30 text-indigo-300 text-xs font-black self-end">
                        Portugal 🇵🇹
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                      O motor de busca mais utilizado na Web. Pesquisa milhões de páginas em milésimos de segundo!
                    </p>

                    {/* Google Search Input Box */}
                    <div className="relative max-w-xl mx-auto">
                      <div className="flex items-center bg-slate-900 rounded-full border-2 border-slate-700 hover:border-slate-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 px-4 py-2.5 shadow-lg transition-all">
                        <Search className="w-5 h-5 text-slate-400 mr-3" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleExecuteSearch(searchQuery);
                          }}
                          className="w-full bg-transparent text-sm text-white outline-hidden placeholder:text-slate-500"
                          placeholder="Pesquisa no Google ou escreve palavras-chave..."
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="text-slate-400 hover:text-white p-1 mr-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <span className="text-sm cursor-pointer" title="Pesquisa por voz">
                          🎙️
                        </span>
                      </div>
                    </div>

                    {/* Search action buttons */}
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <button
                        onClick={() => handleExecuteSearch(searchQuery || 'lince iberico')}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700 shadow-xs"
                      >
                        Pesquisa Google
                      </button>
                      <button
                        onClick={() => handleExecuteSearch('"lince ibérico" habitat')}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700 shadow-xs"
                      >
                        Sinto-me com Sorte! ⭐
                      </button>
                    </div>

                    {/* Quick Search Chips for 5th Graders */}
                    <div className="pt-4 border-t border-slate-800/80 space-y-2 text-left">
                      <p className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Experimenta os Superpoderes de Pesquisa do 5.º Ano:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_SEARCH_CHIPS.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleExecuteSearch(chip.query)}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-950/80 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{chip.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Google Search Results Page
                  <div className="space-y-4 animate-fadeIn">
                    {/* Results Header bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                      <div>
                        Pesquisa: <strong className="text-white font-mono">"{submittedQuery}"</strong>
                      </div>
                      <button
                        onClick={() => setShowSearchResults(false)}
                        className="text-indigo-400 hover:underline font-bold cursor-pointer"
                      >
                        ← Nova Pesquisa
                      </button>
                    </div>

                    {/* Results list */}
                    <div className="space-y-4">
                      {getSimulatedResults().map((res) => (
                        <div
                          key={res.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            res.isAd
                              ? 'bg-amber-950/20 border-amber-500/30'
                              : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/40'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                            {res.isAd ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black text-[10px] border border-amber-500/30">
                                Anúncio
                              </span>
                            ) : (
                              <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center">
                                🌐
                              </span>
                            )}
                            <span className="font-medium text-slate-300">{res.siteName}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-[11px] font-mono text-emerald-400 truncate max-w-[200px]">
                              {res.url}
                            </span>
                            {res.badge && !res.isAd && (
                              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                                {res.badge}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-blue-400 hover:underline cursor-pointer">
                            {res.title}
                          </h4>

                          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                            {res.snippet}
                          </p>

                          {res.isAd && (
                            <div className="mt-2.5 p-2 rounded-xl bg-amber-900/30 border border-amber-600/30 text-[11px] text-amber-200 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                              <span>
                                Dica do Detetive: Os alunos do 5.º ano devem sempre descer a página para passar os anúncios patrocinados!
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PORTAL DA ESCOLA */}
            {activeTab === 'escola' && (
              <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="text-3xl">🏫</span>
                  <div>
                    <h3 className="text-base font-bold text-white">Portal da Escola Básica 2,3</h3>
                    <p className="text-xs text-emerald-400 font-mono">https://area.escola.pt</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    Domínio .pt Oficial
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-2 text-xs sm:text-sm text-slate-300">
                  <p className="font-bold text-white">Área Pessoal do Aluno — 5.º Ano A</p>
                  <p>
                    Quando tens de aceder à página da escola todos os dias, a melhor prática é{' '}
                    <strong>adicioná-la aos Marcadores (Favoritos ⭐)</strong> no navegador. Assim não precisas de pesquisar no Google sempre que quiseres ver os trabalhos de casa!
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: CIÊNCIA VIVA */}
            {activeTab === 'ciencia' && (
              <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <h3 className="text-base font-bold text-white">Ciência Viva — Rede Nacional de Ciência</h3>
                    <p className="text-xs text-emerald-400 font-mono">https://www.cienciaviva.pt</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                    Fonte Fiável
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 space-y-2 text-xs sm:text-sm text-slate-300">
                  <p className="font-bold text-white">Exemplo de Fonte Fiável para Trabalhos Escolares</p>
                  <p>
                    A <strong>Ciência Viva</strong> e as universidades têm autores identificados, cientistas e dados atualizados. São as fontes ideais para os <strong>3 C's do Detetive</strong> (Criador conhecido, Calma com a Data e Confirmar).
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: RTP ENSINA */}
            {activeTab === 'rtp' && (
              <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="text-3xl">🦉</span>
                  <div>
                    <h3 className="text-base font-bold text-white">RTP Ensina — Recursos Educativos</h3>
                    <p className="text-xs text-emerald-400 font-mono">https://ensina.rtp.pt</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                    Canal Educativo
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 space-y-2 text-xs sm:text-sm text-slate-300">
                  <p className="font-bold text-white">Vídeos e Textos Didáticos para o 5.º Ano</p>
                  <p>
                    Artigos preparados para o currículo de TIC, História e Geografia de Portugal e Ciências Naturais.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
