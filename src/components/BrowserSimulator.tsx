import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  Star,
  Search,
  Plus,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Trophy,
  BookOpen,
  School,
  Compass,
  Zap,
  Globe,
  AlertCircle,
  HelpCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface BrowserSimulatorProps {
  language?: Language;
}

// Available fictional website routes
type WebRoute =
  | 'search'
  | 'search_results'
  | 'escola'
  | 'escola_trabalhos'
  | 'escola_regras'
  | 'vidaselvagem'
  | 'vidaselvagem_lince'
  | 'oceanos'
  | 'detetives';

interface BrowserTab {
  id: string;
  route: WebRoute;
  title: string;
  icon: string;
  url: string;
}

export const BrowserSimulator: React.FC<BrowserSimulatorProps> = ({ language = 'pt' }) => {
  // Navigation & History State
  const [history, setHistory] = useState<WebRoute[]>(['search']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const currentRoute = history[historyIndex] || 'search';

  // Address Bar input
  const [addressInput, setAddressInput] = useState<string>('https://www.pesquisa-escolar.pt');

  // Search Engine query
  const [searchQuery, setSearchQuery] = useState<string>('lince iberico');
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>('');

  // Tabs
  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: 'tab-1',
      route: 'search',
      title: 'Motor de Busca Júnior',
      icon: '🔍',
      url: 'https://www.pesquisa-escolar.pt',
    },
    {
      id: 'tab-2',
      route: 'escola',
      title: 'Portal da Escola 5.º Ano',
      icon: '🏫',
      url: 'https://escola.pt/5ano',
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<Array<{ name: string; route: WebRoute; icon: string; url: string }>>([
    { name: 'Portal da Escola', route: 'escola', icon: '🏫', url: 'https://escola.pt/5ano' },
    { name: 'Vida Selvagem .pt', route: 'vidaselvagem_lince', icon: '🐾', url: 'https://vidaselvagem.pt/lince' },
    { name: 'Oceanos Vivos', route: 'oceanos', icon: '🌊', url: 'https://oceanos.pt/sado' },
    { name: 'Detetives da Web', route: 'detetives', icon: '🕵️', url: 'https://detetives-web.pt' },
  ]);
  const [isBookmarkedCurrent, setIsBookmarkedCurrent] = useState<boolean>(false);

  // UI state
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showHttpsModal, setShowHttpsModal] = useState<boolean>(false);
  const [activeGuideMode, setActiveGuideMode] = useState<'simulator' | 'missions' | 'anatomy'>('simulator');
  const [hotspotInfo, setHotspotInfo] = useState<string>('address');

  // Mission Checklist
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});

  const checkMission = (key: string) => {
    if (!completedMissions[key]) {
      setCompletedMissions((prev) => {
        const next = { ...prev, [key]: true };
        try {
          confetti({ particleCount: 35, spread: 55, origin: { y: 0.65 } });
        } catch {
          // ignore
        }
        return next;
      });
    }
  };

  // Route URL mappings
  const ROUTE_URLS: Record<WebRoute, { url: string; title: string; icon: string }> = {
    search: { url: 'https://www.pesquisa-escolar.pt', title: 'Motor de Busca Júnior', icon: '🔍' },
    search_results: {
      url: `https://www.pesquisa-escolar.pt/busca?q=${encodeURIComponent(searchQuery || 'lince')}`,
      title: `Pesquisa: ${searchQuery}`,
      icon: '🔎',
    },
    escola: { url: 'https://escola.pt/5ano', title: 'Portal da Escola Básica 2,3', icon: '🏫' },
    escola_trabalhos: { url: 'https://escola.pt/5ano/trabalhos-tic', title: 'Trabalhos de TIC — Escola', icon: '📝' },
    escola_regras: { url: 'https://escola.pt/5ano/regras-seguranca', title: 'Regras de Segurança na Web', icon: '🛡️' },
    vidaselvagem: { url: 'https://vidaselvagem.pt', title: 'Júnior Vida Selvagem .pt', icon: '🐾' },
    vidaselvagem_lince: {
      url: 'https://vidaselvagem.pt/lince-iberico',
      title: 'O Lince-Ibérico em Portugal',
      icon: '🐆',
    },
    oceanos: { url: 'https://oceanos.pt/sado-golfinhos', title: 'Golfinhos do Rio Sado — Oceanos Vivos', icon: '🐬' },
    detetives: { url: 'https://detetives-web.pt', title: 'Guia dos Detetives da Web (3 C\'s)', icon: '🕵️' },
  };

  // Navigate to a route
  const navigateTo = (route: WebRoute, customQuery?: string) => {
    const info = ROUTE_URLS[route];
    let targetUrl = info.url;

    if (route === 'search_results') {
      const q = customQuery !== undefined ? customQuery : searchQuery;
      targetUrl = `https://www.pesquisa-escolar.pt/busca?q=${encodeURIComponent(q)}`;
      setSearchQuery(q);
      setActiveSearchTerm(q);
      checkMission('m_search');
      if (q.includes('"')) checkMission('m_quotes');
      if (q.includes('-')) checkMission('m_minus');
    }

    if (route === 'escola' || route === 'escola_trabalhos') checkMission('m_escola');
    if (route === 'vidaselvagem_lince') checkMission('m_lince');

    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(route);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);

    setAddressInput(targetUrl);

    // Update active tab title & url
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, route, url: targetUrl, title: info.title, icon: info.icon } : t))
    );

    // Check if bookmarked
    const alreadySaved = bookmarks.some((b) => b.url === targetUrl);
    setIsBookmarkedCurrent(alreadySaved);
  };

  // Back button
  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevRoute = history[prevIndex];
      setHistoryIndex(prevIndex);
      setAddressInput(ROUTE_URLS[prevRoute].url);
      checkMission('m_back');
    }
  };

  // Forward button
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextRoute = history[nextIndex];
      setHistoryIndex(nextIndex);
      setAddressInput(ROUTE_URLS[nextRoute].url);
    }
  };

  // Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 450);
  };

  // Address Bar Submission
  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = addressInput.trim().toLowerCase();

    if (clean.includes('escola')) {
      navigateTo('escola');
    } else if (clean.includes('lince') || clean.includes('vida') || clean.includes('fauna')) {
      navigateTo('vidaselvagem_lince');
    } else if (clean.includes('oceano') || clean.includes('golfinho')) {
      navigateTo('oceanos');
    } else if (clean.includes('detetive')) {
      navigateTo('detetives');
    } else if (clean.includes('.') && !clean.includes(' ')) {
      // Direct navigation
      navigateTo('search_results', clean);
    } else {
      // Treated as search query
      navigateTo('search_results', addressInput);
    }
  };

  // Bookmark toggle
  const handleToggleBookmark = () => {
    const isNowSaved = !isBookmarkedCurrent;
    setIsBookmarkedCurrent(isNowSaved);

    if (isNowSaved) {
      checkMission('m_bookmark');
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      const curInfo = ROUTE_URLS[currentRoute];
      if (!bookmarks.some((b) => b.url === addressInput)) {
        setBookmarks((prev) => [
          ...prev,
          {
            name: curInfo.title.split('—')[0].trim(),
            route: currentRoute,
            icon: curInfo.icon,
            url: addressInput,
          },
        ]);
      }
    }
  };

  // Add new tab
  const handleAddTab = () => {
    checkMission('m_tab');
    const newId = `tab-${Date.now()}`;
    const newTab: BrowserTab = {
      id: newId,
      route: 'search',
      title: 'Nova Pesquisa',
      icon: '🔍',
      url: 'https://www.pesquisa-escolar.pt',
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    navigateTo('search');
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id) {
      const nextActive = remaining[0];
      setActiveTabId(nextActive.id);
      navigateTo(nextActive.route);
    }
  };

  return (
    <div className="w-full bg-slate-900 rounded-3xl border-2 border-indigo-400/40 shadow-2xl overflow-hidden font-sans text-slate-100">
      {/* Top Banner: Educational Mode Selectors */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-800/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-emerald-500 to-indigo-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg">
              🌐
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white tracking-wide">
                Simulador de Navegador Web (Browser)
              </h3>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/30">
                Google Chrome 5.º Ano
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Experimenta navegar em sites educativos reais e seguros para aprenderes as regras de ouro da Web!
            </p>
          </div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveGuideMode('simulator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeGuideMode === 'simulator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Simulador Livre</span>
          </button>

          <button
            onClick={() => setActiveGuideMode('missions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeGuideMode === 'missions'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Missões ({Object.keys(completedMissions).length}/4)</span>
          </button>

          <button
            onClick={() => setActiveGuideMode('anatomy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeGuideMode === 'anatomy'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Como Funciona?</span>
          </button>
        </div>
      </div>

      {/* MISSIONS PANEL (if active) */}
      {activeGuideMode === 'missions' && (
        <div className="p-4 bg-slate-900 border-b border-indigo-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Missões do Jovem Navegador (Explora e Aprende)
            </h4>
            <span className="text-xs text-slate-400">
              Conclui as 4 missões para ganhares o Distintivo de Detetive da Web!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_bookmark']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_bookmark'] ? '✅' : '⭐'}</span>
                <span>Missão 1: Marcadores</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Clica na estrela ⭐ no topo para guardar a página nos teus Favoritos!
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_search']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_search'] ? '✅' : '🔎'}</span>
                <span>Missão 2: Fazer Pesquisa</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Usa o Motor de Busca para pesquisar por <code>"lince ibérico"</code>.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_https']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_https'] ? '✅' : '🔒'}</span>
                <span>Missão 3: Cadeado HTTPS</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Clica no cadeado 🔒 na barra de endereços para ver o certificado seguro.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                completedMissions['m_back']
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_back'] ? '✅' : '⬅️'}</span>
                <span>Missão 4: Voltar Atrás</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Usa o botão de navegação ⬅️ para regressar à página anterior.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ANATOMY EXPLAINER (if active) */}
      {activeGuideMode === 'anatomy' && (
        <div className="p-4 bg-slate-900 border-b border-indigo-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Guia Prático: O que é cada parte do Google Chrome?
            </h4>
            <span className="text-xs text-slate-400">Clica para ver a explicação simples para o 5.º Ano:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'tabs', label: '📑 Separadores (Tabs)' },
              { id: 'address', label: '🌐 Barra de Endereços (URL)' },
              { id: 'buttons', label: '⬅️ Botões Voltar / Recarregar' },
              { id: 'lock', label: '🔒 Cadeado HTTPS' },
              { id: 'stars', label: '⭐ Marcadores (Favoritos)' },
              { id: 'viewport', label: '🖥️ Janela de Visualização' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setHotspotInfo(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  hotspotInfo === item.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-xs sm:text-sm text-slate-300">
            {hotspotInfo === 'tabs' && (
              <p>
                <strong>Separadores (Tabs):</strong> Permitem ter vários sites abertos ao mesmo tempo sem fechar nada. Clica em <strong>+</strong> para abrir um novo separador para fazeres trabalhos e jogares ao mesmo tempo!
              </p>
            )}
            {hotspotInfo === 'address' && (
              <p>
                <strong>Barra de Endereços (Omnibox):</strong> Onde escreves a morada exata (URL) como <code>https://escola.pt</code>. Se não souberes a morada, podes escrever lá palavras-chave e o navegador pesquisa no Google!
              </p>
            )}
            {hotspotInfo === 'buttons' && (
              <p>
                <strong>Botões Voltar e Recarregar:</strong> O botão ⬅️ leva-te para a página anterior se entrares num link por engano. O botão circular (🔄) atualiza a página se a internet falhar.
              </p>
            )}
            {hotspotInfo === 'lock' && (
              <p>
                <strong>Cadeado HTTPS 🔒:</strong> Mostra que os teus dados viajam cifrados e seguros. <em>Atenção de detetive:</em> o cadeado protege os dados, mas não garante que as notícias escritas no site sejam verdadeiras!
              </p>
            )}
            {hotspotInfo === 'stars' && (
              <p>
                <strong>Marcadores (Favoritos ⭐):</strong> Guardam atalhos para os teus sites diários na barra de marcadores. Poupa tempo para não teres de escrever a morada da escola todos os dias!
              </p>
            )}
            {hotspotInfo === 'viewport' && (
              <p>
                <strong>Janela de Visualização (Viewport):</strong> É o grande ecrã onde o site aparece com texto, fotografias, vídeos e links interativos.
              </p>
            )}
          </div>
        </div>
      )}

      {/* REAL CHROME BROWSER WINDOW CONTAINER */}
      <div className="p-2 sm:p-4 bg-slate-950">
        <div className="rounded-2xl border-2 border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden">
          {/* 1. Chrome Tab Strip */}
          <div className="bg-slate-800/95 pt-2 px-3 flex items-center gap-2 border-b border-slate-700 select-none">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>

            {/* Tabs List */}
            <div className="flex items-end gap-1 flex-1 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => {
                      setActiveTabId(tab.id);
                      navigateTo(tab.route);
                    }}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-xl text-xs font-semibold cursor-pointer max-w-[210px] transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs border-t-2 border-indigo-400'
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="truncate">{tab.title}</span>
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => handleCloseTab(tab.id, e)}
                        className="ml-auto opacity-40 group-hover:opacity-100 hover:bg-slate-700/80 p-0.5 rounded text-slate-300 cursor-pointer"
                        title="Fechar este separador"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Add Tab Button */}
              <button
                onClick={handleAddTab}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors cursor-pointer mb-1"
                title="Abrir novo separador (+)"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Chrome Navigation Toolbar */}
          <div className="bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-slate-800">
            {/* Navigation buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleBack}
                disabled={historyIndex <= 0}
                className={`p-1.5 rounded-lg transition-colors ${
                  historyIndex > 0
                    ? 'hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
                title="Voltar atrás (Página anterior)"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleForward}
                disabled={historyIndex >= history.length - 1}
                className={`p-1.5 rounded-lg transition-colors ${
                  historyIndex < history.length - 1
                    ? 'hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
                title="Avançar (Página seguinte)"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleRefresh}
                className={`p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer ${
                  isRefreshing ? 'animate-spin text-indigo-400' : ''
                }`}
                title="Recarregar página atual"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('search')}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Página Inicial (Motor de Busca)"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Omnibox (Address Bar) */}
            <form
              onSubmit={handleAddressSubmit}
              className="relative flex-1 flex items-center bg-slate-950 rounded-full border border-slate-700 px-3 py-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 transition-all"
            >
              {/* HTTPS Lock */}
              <button
                type="button"
                onClick={() => {
                  setShowHttpsModal((prev) => !prev);
                  checkMission('m_https');
                }}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 mr-2 cursor-pointer transition-colors text-xs font-mono font-bold"
                title="Clica para inspecionar a segurança HTTPS"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-[11px]">https://</span>
              </button>

              {/* Editable URL input */}
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full bg-transparent text-xs font-mono text-slate-200 outline-hidden tracking-tight"
                placeholder="Escreve uma morada URL (ex.: escola.pt) ou pesquisa..."
              />

              {/* Bookmark Star Button */}
              <button
                type="button"
                onClick={handleToggleBookmark}
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isBookmarkedCurrent
                    ? 'text-amber-400 scale-115 drop-shadow-sm'
                    : 'text-slate-500 hover:text-amber-300'
                }`}
                title={isBookmarkedCurrent ? 'Página guardada nos Marcadores ⭐' : 'Guardar nos Marcadores ⭐'}
              >
                <Star className={`w-4 h-4 ${isBookmarkedCurrent ? 'fill-amber-400' : ''}`} />
              </button>
            </form>

            {/* Profile Avatar */}
            <div className="flex items-center gap-1.5 text-slate-400 pl-1">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                5º
              </div>
            </div>
          </div>

          {/* HTTPS Modal/Dropdown */}
          {showHttpsModal && (
            <div className="p-3.5 bg-emerald-950/95 border-b border-emerald-500/40 text-xs text-emerald-200 flex items-start justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">🔒 A Ligação ao Site é Cifrada e Segura (HTTPS)</p>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    O protocolo <strong>HTTPS</strong> garante que ninguém consegue intercetar ou espiar senhas e mensagens transmitidas entre o teu computador e o servidor.{' '}
                    <strong className="text-amber-300">
                      Regra de ouro do 5.º Ano: O cadeado garante a proteção da viagem dos dados, mas não garante que o texto escrito no site seja 100% verdadeiro! Avalia sempre as fontes com os 3 C's.
                    </strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHttpsModal(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 3. Bookmarks Bar */}
          <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] font-medium text-slate-300 no-scrollbar">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider shrink-0 flex items-center gap-1">
              <Bookmark className="w-3 h-3" />
              Favoritos:
            </span>
            {bookmarks.map((bm, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(bm.route)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-950/80 hover:text-white hover:border-indigo-400/50 border border-slate-700/60 transition-all shrink-0 cursor-pointer"
              >
                <span>{bm.icon}</span>
                <span>{bm.name}</span>
              </button>
            ))}
          </div>

          {/* 4. Web Viewport (Content of Fictional Educational Websites) */}
          <div className="min-h-[440px] bg-slate-950 p-4 sm:p-6 text-slate-100">
            {/* A. SEARCH ENGINE HOMEPAGE */}
            {currentRoute === 'search' && (
              <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-6 text-center animate-fadeIn">
                {/* Search Logo */}
                <div className="flex items-center justify-center gap-1 select-none">
                  <span className="text-4xl sm:text-5xl font-black text-blue-500">G</span>
                  <span className="text-4xl sm:text-5xl font-black text-rose-500">o</span>
                  <span className="text-4xl sm:text-5xl font-black text-amber-500">o</span>
                  <span className="text-4xl sm:text-5xl font-black text-blue-500">g</span>
                  <span className="text-4xl sm:text-5xl font-black text-emerald-500">l</span>
                  <span className="text-4xl sm:text-5xl font-black text-rose-500">e</span>
                  <span className="ml-2 px-2 py-0.5 rounded-lg bg-indigo-900/60 border border-indigo-400/30 text-indigo-300 text-xs font-black self-end">
                    Júnior 🇵🇹
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  O teu motor de busca seguro para pesquisas escolares do 5.º Ano!
                </p>

                {/* Big Search Input */}
                <div className="max-w-xl mx-auto flex items-center bg-slate-900 rounded-full border-2 border-slate-700 hover:border-slate-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 px-4 py-2.5 shadow-lg transition-all">
                  <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigateTo('search_results', searchQuery);
                    }}
                    className="w-full bg-transparent text-sm text-white outline-hidden placeholder:text-slate-500"
                    placeholder="Escreve palavras-chave para pesquisar..."
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-white p-1 mr-2 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <span className="text-sm">🎙️</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => navigateTo('search_results', searchQuery || 'lince iberico')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700 shadow-xs"
                  >
                    Pesquisa Google
                  </button>
                  <button
                    onClick={() => navigateTo('vidaselvagem_lince')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700 shadow-xs"
                  >
                    Estou com Sorte! ⭐
                  </button>
                </div>

                {/* Quick Fictional Websites Directory */}
                <div className="pt-6 border-t border-slate-800/80 text-left space-y-3">
                  <p className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    Portais Educativos Seguros Disponíveis para Navegares:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => navigateTo('escola')}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 text-left transition-all cursor-pointer flex items-start gap-2.5"
                    >
                      <span className="text-2xl">🏫</span>
                      <div>
                        <div className="text-xs font-bold text-white">Portal da Escola Básica 2,3</div>
                        <div className="text-[11px] text-slate-400">https://escola.pt/5ano · Horários e trabalhos</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('vidaselvagem_lince')}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 text-left transition-all cursor-pointer flex items-start gap-2.5"
                    >
                      <span className="text-2xl">🐾</span>
                      <div>
                        <div className="text-xs font-bold text-white">Júnior Vida Selvagem .pt</div>
                        <div className="text-[11px] text-slate-400">https://vidaselvagem.pt/lince · Lince-Ibérico</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('oceanos')}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 text-left transition-all cursor-pointer flex items-start gap-2.5"
                    >
                      <span className="text-2xl">🌊</span>
                      <div>
                        <div className="text-xs font-bold text-white">Oceanos Vivos & Golfinhos do Sado</div>
                        <div className="text-[11px] text-slate-400">https://oceanos.pt/sado · Biodiversidade marinha</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('detetives')}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 text-left transition-all cursor-pointer flex items-start gap-2.5"
                    >
                      <span className="text-2xl">🕵️</span>
                      <div>
                        <div className="text-xs font-bold text-white">Academia dos Detetives da Web</div>
                        <div className="text-[11px] text-slate-400">https://detetives-web.pt · Os 3 C's e operadores</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* B. SEARCH RESULTS PAGE */}
            {currentRoute === 'search_results' && (
              <div className="max-w-2xl mx-auto space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                  <div>
                    Resultados para: <strong className="text-white font-mono">"{activeSearchTerm || searchQuery}"</strong>
                  </div>
                  <button
                    onClick={() => navigateTo('search')}
                    className="text-indigo-400 hover:underline font-bold cursor-pointer"
                  >
                    ← Nova Pesquisa
                  </button>
                </div>

                {/* Simulated Results */}
                <div className="space-y-3">
                  {/* Result 1: Ad (Educational lesson) */}
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                        Anúncio
                      </span>
                      <span className="text-slate-300">LojaMundialBrinquedos.pt</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-[11px] font-mono text-emerald-400">https://loja.pt/animais</span>
                    </div>
                    <h4 className="text-sm font-bold text-blue-400">
                      Comprar Peluches e Brinquedos de Animais com Desconto
                    </h4>
                    <p className="text-xs text-slate-300">
                      Entregas em 24 horas! ⚠️ <em>Dica do 5.º Ano: Este link pagou para aparecer aqui! Para o teu trabalho escolar de Ciências, deves sempre descer para encontrar os artigos científicos reais abaixo.</em>
                    </p>
                  </div>

                  {/* Result 2: Educational Match */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-sm">🐾</span>
                      <span className="font-bold text-slate-300">Júnior Vida Selvagem .pt</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-[11px] font-mono text-emerald-400">https://vidaselvagem.pt/lince</span>
                      <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        Fonte Fiável (.pt)
                      </span>
                    </div>
                    <button
                      onClick={() => navigateTo('vidaselvagem_lince')}
                      className="text-sm sm:text-base font-bold text-blue-400 hover:underline text-left block cursor-pointer"
                    >
                      O Lince-Ibérico em Portugal: Habitat, Alimentação e Conservação
                    </button>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Artigo científico escolar completo com biólogos portugueses. Descobre o peso médio (9 a 13 kg) e o seu prato preferido no território nacional.
                    </p>
                  </div>

                  {/* Result 3: Oceanos */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-sm">🌊</span>
                      <span className="font-bold text-slate-300">Oceanos Vivos</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-[11px] font-mono text-emerald-400">https://oceanos.pt/sado</span>
                    </div>
                    <button
                      onClick={() => navigateTo('oceanos')}
                      className="text-sm sm:text-base font-bold text-blue-400 hover:underline text-left block cursor-pointer"
                    >
                      Golfinhos do Estuário do Sado: A Comunidade Marinha de Setúbal
                    </button>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Conhece a família residente de roazes no estuário do rio Sado e como a sua proteção é garantida pelas autoridades nacionais.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* C. FICTIONAL SITE 1: PORTAL DA ESCOLA */}
            {(currentRoute === 'escola' || currentRoute === 'escola_trabalhos' || currentRoute === 'escola_regras') && (
              <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-5 animate-fadeIn">
                {/* Site Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🏫</span>
                    <div>
                      <h3 className="text-base font-black text-white">Escola Básica 2,3 Digital</h3>
                      <p className="text-xs text-emerald-400 font-mono">https://escola.pt/5ano</p>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleBookmark}
                    className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-amber-500/30"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Guardar nos Favoritos ⭐</span>
                  </button>
                </div>

                {/* Subpage Nav */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => navigateTo('escola')}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                      currentRoute === 'escola' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Início
                  </button>
                  <button
                    onClick={() => navigateTo('escola_trabalhos')}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                      currentRoute === 'escola_trabalhos' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Trabalhos de TIC
                  </button>
                  <button
                    onClick={() => navigateTo('escola_regras')}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                      currentRoute === 'escola_regras' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Regras de Segurança
                  </button>
                </div>

                {/* Subpage Content */}
                {currentRoute === 'escola' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-sm text-slate-300 space-y-2">
                      <p className="font-bold text-white text-base">Bem-vindo ao Portal dos Alunos do 5.º Ano!</p>
                      <p>
                        Aqui encontras os teus horários, a ementa da cantina e as tarefas escolares.
                      </p>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 mt-2">
                        <strong className="text-amber-300">💡 Dica Digital:</strong> Repara que o endereço termina em <strong>.pt</strong>. Isto garante que o portal está sediado e registado oficialmente em Portugal!
                      </div>
                    </div>
                  </div>
                )}

                {currentRoute === 'escola_trabalhos' && (
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200 space-y-3">
                    <h4 className="font-bold text-white text-base">📋 Tarefas de TIC — 5.º Ano</h4>
                    <p>
                      <strong>Trabalho de Pesquisa:</strong> Encontra 3 factos científicos sobre o lince-ibérico usando operadores de pesquisa como <code>"lince ibérico"</code>.
                    </p>
                    <button
                      onClick={() => navigateTo('vidaselvagem_lince')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Abrir Artigo da Fauna</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {currentRoute === 'escola_regras' && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs sm:text-sm text-slate-200 space-y-2">
                    <h4 className="font-bold text-white text-base">🛡️ Regras de Ouro ao Navegar na Internet</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                      <li>Nunca partilhes palavras-passe com colegas nem em sites desconhecidos.</li>
                      <li>Verifica o cadeado HTTPS 🔒 antes de iniciares sessão.</li>
                      <li>Desconfia de botões gigantes verdes com a palavra "DOWNLOAD".</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* D. FICTIONAL SITE 2: VIDA SELVAGEM .PT */}
            {(currentRoute === 'vidaselvagem' || currentRoute === 'vidaselvagem_lince') && (
              <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="text-3xl">🐾</span>
                  <div>
                    <h3 className="text-base font-black text-white">Júnior Vida Selvagem .pt</h3>
                    <p className="text-xs text-emerald-400 font-mono">https://vidaselvagem.pt/lince-iberico</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                    Artigo Científico 5.º Ano
                  </span>
                </div>

                {/* 3 C's Fact Card */}
                <div className="grid grid-cols-3 gap-2 text-[11px] p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">1. Autor / Criador:</span>
                    <strong className="text-white">Dr. M. Santos (Biólogo)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">2. Data:</span>
                    <strong className="text-emerald-400">Setembro 2026 ✅</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">3. Validação:</span>
                    <strong className="text-indigo-400">ICNF Portugal</strong>
                  </div>
                </div>

                {/* Article Body */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <h4 className="text-base font-bold text-white">
                    O Regresso do Lince-Ibérico à Natureza Portuguesa
                  </h4>
                  <p>
                    O lince-ibérico (<em>Lynx pardinus</em>) é um dos felinos mais raros do mundo. Em Portugal, habita principalmente na região do Vale do Guadiana, no Alentejo.
                  </p>
                  <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-500/20 space-y-1">
                    <p className="font-bold text-white">Factos Importantes para o Teu Trabalho Escolar:</p>
                    <p>• Peso médio de um adulto: entre <strong>9 e 13 kg</strong>.</p>
                    <p>• Alimentação principal: <strong>coelho-bravo selvagem</strong> (cerca de 85% da dieta).</p>
                    <p>• Características físicas: orelhas em forma de pincel e cauda curta com ponta preta.</p>
                  </div>
                </div>
              </div>
            )}

            {/* E. FICTIONAL SITE 3: OCEANOS */}
            {currentRoute === 'oceanos' && (
              <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="text-3xl">🌊</span>
                  <div>
                    <h3 className="text-base font-black text-white">Oceanos Vivos & Estuário do Sado</h3>
                    <p className="text-xs text-emerald-400 font-mono">https://oceanos.pt/sado-golfinhos</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <h4 className="text-base font-bold text-white">
                    A Colónia Residente de Roazes no Rio Sado (Setúbal)
                  </h4>
                  <p>
                    Sabias que o estuário do rio Sado acolhe uma das únicas comunidades residentes de golfinhos em estuários na Europa? Os roazes vivem aqui todo o ano e são protegidos por leis ambientais rigorosas.
                  </p>
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-emerald-200">
                    💡 <strong>Como pesquisar isto no Google:</strong> Se usares o operador <code>golfinhos sado site:.pt</code>, o motor só te vai mostrar páginas oficiais de Portugal!
                  </div>
                </div>
              </div>
            )}

            {/* F. FICTIONAL SITE 4: DETETIVES DA WEB */}
            {currentRoute === 'detetives' && (
              <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="text-3xl">🕵️</span>
                  <div>
                    <h3 className="text-base font-black text-white">Academia dos Detetives Digitais</h3>
                    <p className="text-xs text-emerald-400 font-mono">https://detetives-web.pt</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-500/30">
                    <span className="text-lg">1️⃣</span>
                    <p className="font-bold text-white mt-1">Criador / Autor</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Verifica sempre quem escreveu o artigo.</p>
                  </div>
                  <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/30">
                    <span className="text-lg">2️⃣</span>
                    <p className="font-bold text-white mt-1">Calma com a Data</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Artigos velhos podem conter factos ultrapassados.</p>
                  </div>
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                    <span className="text-lg">3️⃣</span>
                    <p className="font-bold text-white mt-1">Confirmar Fontes</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Compara com 2 ou 3 sites e com o teu manual.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
