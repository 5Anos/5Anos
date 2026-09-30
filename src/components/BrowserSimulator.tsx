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
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface BrowserSimulatorProps {
  language?: Language;
}

type WebRoute =
  | 'search'
  | 'search_results'
  | 'escola'
  | 'escola_trabalhos'
  | 'vidaselvagem'
  | 'vidaselvagem_lince'
  | 'oceanos';

interface BrowserTab {
  id: string;
  route: WebRoute;
  title: string;
  icon: string;
  url: string;
}

export const BrowserSimulator: React.FC<BrowserSimulatorProps> = ({ language = 'pt' }) => {
  // Main Area Switcher: 'browser' | 'url_anatomy'
  const [activeArea, setActiveArea] = useState<'browser' | 'url_anatomy'>('browser');

  // Navigation History
  const [history, setHistory] = useState<WebRoute[]>(['search']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const currentRoute = history[historyIndex] || 'search';

  // Address Bar
  const [addressInput, setAddressInput] = useState<string>('https://www.google.pt');

  // Search Engine Query
  const [searchQuery, setSearchQuery] = useState<string>('lince iberico');
  const [lastSearched, setLastSearched] = useState<string>('lince iberico');

  // Tabs
  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: 'tab-google',
      route: 'search',
      title: 'Google Júnior',
      icon: '🔍',
      url: 'https://www.google.pt',
    },
    {
      id: 'tab-escola',
      route: 'escola',
      title: 'Portal da Escola',
      icon: '🏫',
      url: 'https://escola.pt/5ano',
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-google');

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<Array<{ name: string; route: WebRoute; icon: string; url: string }>>([
    { name: 'Portal da Escola', route: 'escola', icon: '🏫', url: 'https://escola.pt/5ano' },
    { name: 'Vida Selvagem .pt', route: 'vidaselvagem_lince', icon: '🐾', url: 'https://vidaselvagem.pt/lince' },
    { name: 'Oceanos Vivos', route: 'oceanos', icon: '🐬', url: 'https://oceanos.pt/sado' },
  ]);
  const [isBookmarkedCurrent, setIsBookmarkedCurrent] = useState<boolean>(false);

  // UI state
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showHttpsInfo, setShowHttpsInfo] = useState<boolean>(false);

  // Anatomy Area State
  const [selectedUrlPart, setSelectedUrlPart] = useState<'protocol' | 'subdomain' | 'domain' | 'tld' | 'path'>('domain');

  // Route URL dictionary
  const ROUTE_DATA: Record<WebRoute, { url: string; title: string; icon: string }> = {
    search: { url: 'https://www.google.pt', title: 'Google Júnior', icon: '🔍' },
    search_results: {
      url: `https://www.google.pt/search?q=${encodeURIComponent(searchQuery || 'lince')}`,
      title: `Resultados: ${searchQuery}`,
      icon: '🔎',
    },
    escola: { url: 'https://escola.pt/5ano', title: 'Portal da Escola Básica 2,3', icon: '🏫' },
    escola_trabalhos: { url: 'https://escola.pt/5ano/trabalhos-tic', title: 'Tarefas de TIC — 5.º Ano', icon: '📋' },
    vidaselvagem: { url: 'https://vidaselvagem.pt', title: 'Júnior Vida Selvagem .pt', icon: '🐾' },
    vidaselvagem_lince: {
      url: 'https://vidaselvagem.pt/lince-iberico',
      title: 'O Lince-Ibérico em Portugal',
      icon: '🐆',
    },
    oceanos: { url: 'https://oceanos.pt/sado', title: 'Golfinhos do Rio Sado — Oceanos Vivos', icon: '🐬' },
  };

  // Navigate to route
  const navigateTo = (route: WebRoute, newQuery?: string) => {
    const data = ROUTE_DATA[route];
    let nextUrl = data.url;

    if (route === 'search_results') {
      const q = newQuery !== undefined ? newQuery : searchQuery;
      nextUrl = `https://www.google.pt/search?q=${encodeURIComponent(q)}`;
      setSearchQuery(q);
      setLastSearched(q);
    }

    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(route);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);

    setAddressInput(nextUrl);

    // Update current tab
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, route, url: nextUrl, title: data.title, icon: data.icon } : t))
    );

    // Check if bookmarked
    const alreadySaved = bookmarks.some((b) => b.url === nextUrl);
    setIsBookmarkedCurrent(alreadySaved);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevRoute = history[prevIndex];
      setHistoryIndex(prevIndex);
      setAddressInput(ROUTE_DATA[prevRoute].url);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextRoute = history[nextIndex];
      setHistoryIndex(nextIndex);
      setAddressInput(ROUTE_DATA[nextRoute].url);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = addressInput.trim().toLowerCase();

    if (clean.includes('escola')) {
      navigateTo('escola');
    } else if (clean.includes('lince') || clean.includes('vida') || clean.includes('fauna')) {
      navigateTo('vidaselvagem_lince');
    } else if (clean.includes('oceano') || clean.includes('golfinho')) {
      navigateTo('oceanos');
    } else if (clean.includes('.') && !clean.includes(' ')) {
      navigateTo('search_results', clean);
    } else {
      navigateTo('search_results', addressInput);
    }
  };

  const handleToggleBookmark = () => {
    const nextSaved = !isBookmarkedCurrent;
    setIsBookmarkedCurrent(nextSaved);

    if (nextSaved) {
      try {
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
      const data = ROUTE_DATA[currentRoute];
      if (!bookmarks.some((b) => b.url === addressInput)) {
        setBookmarks((prev) => [
          ...prev,
          {
            name: data.title.split('—')[0].trim(),
            route: currentRoute,
            icon: data.icon,
            url: addressInput,
          },
        ]);
      }
    }
  };

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: BrowserTab = {
      id: newId,
      route: 'search',
      title: 'Nova Pesquisa',
      icon: '🔍',
      url: 'https://www.google.pt',
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
      const nextTab = remaining[0];
      setActiveTabId(nextTab.id);
      navigateTo(nextTab.route);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 2 CLEAR AREAS SELECTOR TABS (Simples para 10 anos) */}
      <div className="bg-white p-2 rounded-2xl border-2 border-indigo-200/80 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-base font-bold">
            💡
          </span>
          <div>
            <p className="text-xs font-bold text-slate-800">
              {language === 'pt' ? 'Escolhe o que queres explorar:' : 'Choose what you want to explore:'}
            </p>
            <p className="text-[11px] text-slate-500">
              {language === 'pt'
                ? 'Clica numa das duas áreas para aprenderes ao teu ritmo!'
                : 'Click an area to learn step-by-step!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveArea('browser')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeArea === 'browser'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>🖥️</span>
            <span>{language === 'pt' ? '1. Navegador Google Chrome' : '1. Web Browser Chrome'}</span>
          </button>

          <button
            onClick={() => setActiveArea('url_anatomy')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeArea === 'url_anatomy'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>🧩</span>
            <span>{language === 'pt' ? '2. Como Ler o Endereço (URL)' : '2. How to Read a URL'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ÁREA 1: O NAVEGADOR GOOGLE CHROME (DESIGN CLARO / BRANCO) */}
      {/* ========================================================= */}
      {activeArea === 'browser' && (
        <div className="rounded-2xl border-2 border-slate-300 bg-white shadow-lg overflow-hidden animate-fadeIn">
          {/* Chrome Title Bar & Tabs Strip (Cinzento Claro) */}
          <div className="bg-slate-200/90 pt-2 px-3 flex items-center gap-2 border-b border-slate-300 select-none">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-rose-600/30" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-amber-600/30" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-emerald-600/30" />
            </div>

            {/* Tabs List (Estilo Google Chrome Claro) */}
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
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-xl text-xs font-bold cursor-pointer max-w-[200px] transition-all ${
                      isActive
                        ? 'bg-white text-slate-800 shadow-xs border-t-2 border-blue-600'
                        : 'bg-slate-300/60 text-slate-600 hover:bg-slate-300 hover:text-slate-800'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="truncate">{tab.title}</span>
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => handleCloseTab(tab.id, e)}
                        className="ml-auto opacity-40 group-hover:opacity-100 hover:bg-slate-200 p-0.5 rounded text-slate-600 cursor-pointer"
                        title="Fechar este separador"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Add tab button */}
              <button
                onClick={handleAddTab}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-300/80 transition-colors cursor-pointer mb-0.5"
                title="Abrir novo separador (+)"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chrome Navigation Toolbar (Branco Limpo) */}
          <div className="bg-white px-3 py-2 flex items-center gap-2 border-b border-slate-200">
            {/* Buttons: Back, Forward, Refresh, Home */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleBack}
                disabled={historyIndex <= 0}
                className={`p-1.5 rounded-lg transition-colors ${
                  historyIndex > 0
                    ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-950 cursor-pointer'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
                title="Voltar à página anterior (⬅️)"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleForward}
                disabled={historyIndex >= history.length - 1}
                className={`p-1.5 rounded-lg transition-colors ${
                  historyIndex < history.length - 1
                    ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-950 cursor-pointer'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
                title="Avançar à página seguinte (➡️)"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleRefresh}
                className={`p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer ${
                  isRefreshing ? 'animate-spin text-blue-600' : ''
                }`}
                title="Recarregar esta página (🔄)"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('search')}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                title="Página Inicial (Google Júnior)"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>

            {/* Omnibox / Address Bar (Branco com moldura cinzenta suave) */}
            <form
              onSubmit={handleAddressSubmit}
              className="relative flex-1 flex items-center bg-slate-100/90 hover:bg-slate-100 rounded-full border border-slate-300 px-3.5 py-1.5 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
            >
              {/* HTTPS Lock Button */}
              <button
                type="button"
                onClick={() => setShowHttpsInfo((prev) => !prev)}
                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 mr-2 cursor-pointer transition-colors text-xs font-mono font-bold"
                title="Clica para ver o cadeado HTTPS"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-[11px]">https://</span>
              </button>

              {/* Editable URL Input */}
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full bg-transparent text-xs font-mono text-slate-800 outline-hidden tracking-tight"
                placeholder="Escreve uma morada URL (ex.: escola.pt) ou pesquisa..."
              />

              {/* Star Bookmark Button */}
              <button
                type="button"
                onClick={handleToggleBookmark}
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isBookmarkedCurrent
                    ? 'text-amber-500 scale-110 drop-shadow-xs'
                    : 'text-slate-400 hover:text-amber-500'
                }`}
                title={isBookmarkedCurrent ? 'Guardado nos Favoritos ⭐' : 'Guardar nos Favoritos ⭐'}
              >
                <Star className={`w-4 h-4 ${isBookmarkedCurrent ? 'fill-amber-400 text-amber-500' : ''}`} />
              </button>
            </form>

            {/* Student avatar */}
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-xs shrink-0">
              5º
            </div>
          </div>

          {/* HTTPS Lock Explainer (Caixa Verde Didática) */}
          {showHttpsInfo && (
            <div className="p-3.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-start justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-950 text-xs sm:text-sm">
                    🔒 Cadeado HTTPS: A ligação ao site é encriptada e protegida!
                  </p>
                  <p className="text-emerald-800 mt-0.5 leading-relaxed text-xs">
                    Significa que ninguém consegue espiar as senhas ou mensagens que envias para este site.{' '}
                    <strong className="text-emerald-950">
                      Atenção de detetive do 5.º Ano: O cadeado protege a viagem dos dados, mas não garante que as notícias escritas no site sejam verdadeiras!
                    </strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHttpsInfo(false)}
                className="text-emerald-700 hover:text-emerald-950 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bookmarks Bar (Barra de Favoritos Clara) */}
          <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px] font-semibold text-slate-700 no-scrollbar">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider shrink-0 flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-amber-500" />
              Favoritos:
            </span>
            {bookmarks.map((bm, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(bm.route)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 shadow-2xs transition-all shrink-0 cursor-pointer"
              >
                <span>{bm.icon}</span>
                <span>{bm.name}</span>
              </button>
            ))}
          </div>

          {/* Web Viewport (Branco / Fundo Claro e Amigável) */}
          <div className="min-h-[380px] bg-slate-50/50 p-4 sm:p-6 text-slate-800">
            {/* 1. GOOGLE JÚNIOR SEARCH */}
            {currentRoute === 'search' && (
              <div className="max-w-xl mx-auto py-4 sm:py-6 space-y-5 text-center animate-fadeIn">
                {/* Google Logo */}
                <div className="flex items-center justify-center gap-1 select-none">
                  <span className="text-4xl sm:text-5xl font-black text-blue-500">G</span>
                  <span className="text-4xl sm:text-5xl font-black text-rose-500">o</span>
                  <span className="text-4xl sm:text-5xl font-black text-amber-500">o</span>
                  <span className="text-4xl sm:text-5xl font-black text-blue-500">g</span>
                  <span className="text-4xl sm:text-5xl font-black text-emerald-500">l</span>
                  <span className="text-4xl sm:text-5xl font-black text-rose-500">e</span>
                  <span className="ml-2 px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-black self-end">
                    Júnior 🇵🇹
                  </span>
                </div>

                {/* Big Search Input Box */}
                <div className="flex items-center bg-white rounded-full border-2 border-slate-300 hover:border-slate-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 px-4 py-2.5 shadow-sm transition-all">
                  <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigateTo('search_results', searchQuery);
                    }}
                    className="w-full bg-transparent text-sm text-slate-800 outline-hidden placeholder:text-slate-400 font-medium"
                    placeholder="Escreve palavras-chave (ex.: lince iberico)..."
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-slate-600 p-1 mr-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <span className="text-sm">🎙️</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-2.5">
                  <button
                    onClick={() => navigateTo('search_results', searchQuery || 'lince iberico')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-300 shadow-2xs"
                  >
                    Pesquisa Google
                  </button>
                  <button
                    onClick={() => navigateTo('vidaselvagem_lince')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-300 shadow-2xs"
                  >
                    Estou com Sorte! ⭐
                  </button>
                </div>

                {/* Fictional safe websites directory */}
                <div className="pt-4 border-t border-slate-200 text-left space-y-2.5">
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    Sites Educativos Seguros Disponíveis para Navegares:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateTo('escola')}
                      className="p-3 rounded-xl bg-white hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 text-left transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs"
                    >
                      <span className="text-2xl">🏫</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Portal da Escola</div>
                        <div className="text-[11px] text-slate-500">https://escola.pt/5ano</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('vidaselvagem_lince')}
                      className="p-3 rounded-xl bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 text-left transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs"
                    >
                      <span className="text-2xl">🐾</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Júnior Vida Selvagem .pt</div>
                        <div className="text-[11px] text-slate-500">https://vidaselvagem.pt/lince</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('oceanos')}
                      className="p-3 rounded-xl bg-white hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 text-left transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs"
                    >
                      <span className="text-2xl">🐬</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Oceanos Vivos (Sado)</div>
                        <div className="text-[11px] text-slate-500">https://oceanos.pt/sado</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('escola_trabalhos')}
                      className="p-3 rounded-xl bg-white hover:bg-purple-50/70 border border-slate-200 hover:border-purple-300 text-left transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs"
                    >
                      <span className="text-2xl">📋</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Trabalhos de TIC</div>
                        <div className="text-[11px] text-slate-500">https://escola.pt/5ano/trabalhos-tic</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SEARCH RESULTS */}
            {currentRoute === 'search_results' && (
              <div className="max-w-xl mx-auto space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs text-slate-500">
                  <div>
                    Resultados de pesquisa para: <strong className="text-slate-900 font-mono">"{lastSearched}"</strong>
                  </div>
                  <button
                    onClick={() => navigateTo('search')}
                    className="text-blue-600 hover:underline font-bold cursor-pointer"
                  >
                    ← Nova Pesquisa
                  </button>
                </div>

                {/* Simulated Ad */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold text-[10px]">
                      Anúncio
                    </span>
                    <span className="text-slate-600">LojaOnline.pt</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] font-mono text-emerald-700">https://loja.pt</span>
                  </div>
                  <p className="text-xs font-bold text-blue-700">Comprar Brinquedos e Artigos Escolares</p>
                  <p className="text-[11px] text-slate-600">
                    ⚠️ <em>Atenção 5.º Ano: Este link é um anúncio patrocinado! Para trabalhos da escola deves descer e clicar nos artigos científicos reais abaixo.</em>
                  </p>
                </div>

                {/* Educational Result */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 transition-all space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span>🐾</span>
                    <span className="font-bold text-slate-800">Júnior Vida Selvagem</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] font-mono text-emerald-700">https://vidaselvagem.pt/lince</span>
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Fonte Fiável (.pt)
                    </span>
                  </div>
                  <button
                    onClick={() => navigateTo('vidaselvagem_lince')}
                    className="text-sm font-bold text-blue-600 hover:underline text-left block cursor-pointer"
                  >
                    O Lince-Ibérico em Portugal: Habitat e Alimentação
                  </button>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Artigo científico escolar verificado por biólogos. Descobre o peso médio (9 a 13 kg) e o coelho-bravo selvagem no território nacional.
                  </p>
                </div>

                {/* Oceanos Result */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 transition-all space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span>🐬</span>
                    <span className="font-bold text-slate-800">Oceanos Vivos</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] font-mono text-emerald-700">https://oceanos.pt/sado</span>
                  </div>
                  <button
                    onClick={() => navigateTo('oceanos')}
                    className="text-sm font-bold text-blue-600 hover:underline text-left block cursor-pointer"
                  >
                    Golfinhos do Rio Sado (Setúbal): A Família Residente
                  </button>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Conhece os roazes do estuário do Sado e aprende a usar o operador <code>site:.pt</code> para encontrar reservas naturais portuguesas.
                  </p>
                </div>
              </div>
            )}

            {/* 3. PORTAL DA ESCOLA */}
            {(currentRoute === 'escola' || currentRoute === 'escola_trabalhos') && (
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-xs animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🏫</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Portal da Escola Básica 2,3</h4>
                      <p className="text-xs text-emerald-700 font-mono">https://escola.pt/5ano</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    Domínio .pt Oficial
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => navigateTo('escola')}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                      currentRoute === 'escola' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Início
                  </button>
                  <button
                    onClick={() => navigateTo('escola_trabalhos')}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                      currentRoute === 'escola_trabalhos' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Tarefas de TIC
                  </button>
                </div>

                {currentRoute === 'escola' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                      <p className="font-bold text-blue-950">Área Pessoal — Turma do 5.º Ano</p>
                      <p>Aqui tens acesso às notas, horários e trabalhos escolares.</p>
                      <p className="text-[11px] text-blue-900 mt-2 font-medium">
                        ⭐ <strong>Dica do Professor:</strong> Clica na estrela ⭐ no topo para adicionares esta página aos teus Marcadores. Assim entras num só clique todos os dias!
                      </p>
                    </div>
                  </div>
                )}

                {currentRoute === 'escola_trabalhos' && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                    <p className="font-bold text-slate-900">📋 Trabalho de Pesquisa de Ciências e TIC:</p>
                    <p>Encontra factos sobre o lince-ibérico e anota o autor e a data do artigo.</p>
                    <button
                      onClick={() => navigateTo('vidaselvagem_lince')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer text-xs flex items-center gap-1.5"
                    >
                      <span>Abrir Artigo do Lince</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 4. VIDA SELVAGEM (LINCE-IBÉRICO) */}
            {(currentRoute === 'vidaselvagem' || currentRoute === 'vidaselvagem_lince') && (
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-xs animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <span className="text-3xl">🐾</span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Júnior Vida Selvagem .pt</h4>
                    <p className="text-xs text-emerald-700 font-mono">https://vidaselvagem.pt/lince-iberico</p>
                  </div>
                </div>

                {/* 3 C's of Detective badge */}
                <div className="grid grid-cols-3 gap-2 text-[11px] p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">1. Autor:</span>
                    <strong className="text-slate-900">Dr. M. Santos (Biólogo)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">2. Data:</span>
                    <strong className="text-emerald-700">Setembro 2026 ✅</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">3. Validação:</span>
                    <strong className="text-blue-700">ICNF Portugal</strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h5 className="font-bold text-slate-900">O Lince-Ibérico na Natureza Portuguesa</h5>
                  <p>
                    O lince-ibérico (<em>Lynx pardinus</em>) habita na região do Vale do Guadiana, no Alentejo.
                  </p>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 space-y-1">
                    <p className="font-bold">Factos para o Teu Trabalho Escolar:</p>
                    <p>• Peso médio: entre <strong>9 e 13 kg</strong>.</p>
                    <p>• Alimentação: cerca de 85% é <strong>coelho-bravo selvagem</strong>.</p>
                    <p>• Orelhas com pelos pretos em forma de pincel.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. OCEANOS VIVOS */}
            {currentRoute === 'oceanos' && (
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-xs animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <span className="text-3xl">🐬</span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Oceanos Vivos & Rio Sado</h4>
                    <p className="text-xs text-emerald-700 font-mono">https://oceanos.pt/sado</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h5 className="font-bold text-slate-900">A Família de Golfinhos Roazes em Setúbal</h5>
                  <p>
                    O estuário do rio Sado acolhe uma das únicas colónias residentes de golfinhos em estuários em toda a Europa.
                  </p>
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-950">
                    💡 <strong>Como pesquisar isto:</strong> Usa no Google <code>golfinhos sado site:.pt</code> para ver apenas centros de ciência de Portugal!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ÁREA 2: ANATOMIA DO URL (DESENHADO EM MODO CLARO)         */}
      {/* ========================================================= */}
      {activeArea === 'url_anatomy' && (
        <div className="bg-white rounded-2xl border-2 border-indigo-200 p-5 sm:p-6 shadow-md space-y-5 animate-fadeIn text-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl shadow-xs">
                🧩
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {language === 'pt' ? 'Como é Feita uma Morada Web (URL)?' : 'How is a Web Address (URL) Built?'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'pt'
                    ? 'Clica em cada parte da morada para descobrires o que significa!'
                    : 'Click each part of the address to discover what it means!'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive URL Bar in Light Theme */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-100 border border-slate-300 space-y-2.5">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {language === 'pt' ? 'Barra de Endereços do Navegador:' : 'Browser Address Bar:'}
            </p>

            <div className="p-2.5 bg-white rounded-xl border border-slate-300 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-1.5 shadow-2xs">
              <button
                onClick={() => setSelectedUrlPart('protocol')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedUrlPart === 'protocol'
                    ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>https://</span>
              </button>

              <button
                onClick={() => setSelectedUrlPart('subdomain')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlPart === 'subdomain'
                    ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300'
                    : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                }`}
              >
                www.
              </button>

              <button
                onClick={() => setSelectedUrlPart('domain')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlPart === 'domain'
                    ? 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-300'
                    : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                }`}
              >
                escola
              </button>

              <button
                onClick={() => setSelectedUrlPart('tld')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlPart === 'tld'
                    ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                .pt
              </button>

              <button
                onClick={() => setSelectedUrlPart('path')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlPart === 'path'
                    ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300'
                    : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                }`}
              >
                /5ano
              </button>
            </div>
          </div>

          {/* Simple card explaining the clicked segment */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1 text-xs sm:text-sm">
            {selectedUrlPart === 'protocol' && (
              <div>
                <p className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  1. Protocolo Cifrado (https://)
                </p>
                <p className="text-slate-700 mt-1">
                  O <strong>HTTPS</strong> com o cadeado indica que a ligação ao site é secreta e segura. Ninguém consegue intercetar as tuas senhas durante a viagem!
                </p>
              </div>
            )}

            {selectedUrlPart === 'subdomain' && (
              <div>
                <p className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-600" />
                  2. Subdomínio (www.)
                </p>
                <p className="text-slate-700 mt-1">
                  Indica a secção do servidor da escola. Pode ser <em>www</em> (World Wide Web), <em>area</em> ou <em>aluno</em>.
                </p>
              </div>
            )}

            {selectedUrlPart === 'domain' && (
              <div>
                <p className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                  <School className="w-4 h-4 text-purple-600" />
                  3. Nome do Domínio (escola)
                </p>
                <p className="text-slate-700 mt-1">
                  É o <strong>nome próprio da organização</strong>, escola ou museu dono do site. Verifica sempre se o nome está bem escrito sem letras trocadas!
                </p>
              </div>
            )}

            {selectedUrlPart === 'tld' && (
              <div>
                <p className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                  <span>🇵🇹</span>
                  4. Domínio de Topo / Terminação (.pt)
                </p>
                <p className="text-slate-700 mt-1">
                  A terminação <strong>.pt</strong> indica que o site está registado oficialmente em <strong>Portugal</strong>! (Outros exemplos: .org para organizações, .gov para o governo, .es para Espanha).
                </p>
              </div>
            )}

            {selectedUrlPart === 'path' && (
              <div>
                <p className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                  <span>📁</span>
                  5. Caminho / Pasta (/5ano)
                </p>
                <p className="text-slate-700 mt-1">
                  Leva-te diretamente para a pasta ou página do 5.º Ano dentro do site da escola!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
