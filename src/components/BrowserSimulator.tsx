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
  Check,
  Folder,
  Layers,
  MousePointerClick,
  Info,
  ChevronDown,
  History,
  Clock,
  Trash2,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface BrowserSimulatorProps {
  language?: Language;
}

type WebRoute =
  | 'google'
  | 'google_results'
  | 'escola'
  | 'escola_tarefas'
  | 'escola_ementa'
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

interface BookmarkItem {
  id: string;
  name: string;
  route: WebRoute;
  url: string;
  icon: string;
  folder: string;
}

interface VisitedUrlItem {
  id: string;
  url: string;
  title: string;
  icon: string;
  timestamp: string;
  route: WebRoute;
  trackerNote: string;
}

export const BrowserSimulator: React.FC<BrowserSimulatorProps> = ({ language = 'pt' }) => {
  // Main Navigation Tabs: 'browser' | 'favorites_tutorial' | 'url_anatomy' | 'missions'
  const [activeMainTab, setActiveMainTab] = useState<'browser' | 'favorites_tutorial' | 'url_anatomy' | 'missions'>('browser');

  // Navigation History
  const [history, setHistory] = useState<WebRoute[]>(['google']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const currentRoute = history[historyIndex] || 'google';

  // Address Bar Input
  const [addressInput, setAddressInput] = useState<string>('https://www.google.pt');

  // Search Engine Query
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState<string>('lince iberico');

  // Browser Tabs
  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: 'tab-google',
      route: 'google',
      title: 'Google Júnior 🇵🇹',
      icon: '🔍',
      url: 'https://www.google.pt',
    },
    {
      id: 'tab-escola',
      route: 'escola',
      title: 'Portal da Escola 5.º Ano',
      icon: '🏫',
      url: 'https://escola.pt/5ano',
    },
    {
      id: 'tab-ciencia',
      route: 'vidaselvagem_lince',
      title: 'Lince-Ibérico .pt',
      icon: '🐾',
      url: 'https://vidaselvagem.pt/lince',
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-google');

  // Bookmarks List
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([
    { id: 'bm-1', name: 'Portal da Escola', route: 'escola', url: 'https://escola.pt/5ano', icon: '🏫', folder: 'Barra de Marcadores' },
    { id: 'bm-2', name: 'Lince-Ibérico', route: 'vidaselvagem_lince', url: 'https://vidaselvagem.pt/lince', icon: '🐾', folder: 'Barra de Marcadores' },
    { id: 'bm-3', name: 'Golfinhos do Sado', route: 'oceanos', url: 'https://oceanos.pt/sado', icon: '🐬', folder: 'Barra de Marcadores' },
  ]);

  // Chrome Bookmark Popup State (dialog shown when star ⭐ is clicked)
  const [showBookmarkDialog, setShowBookmarkDialog] = useState<boolean>(false);
  const [bookmarkNameInput, setBookmarkNameInput] = useState<string>('');
  const [highlightBookmarksBar, setHighlightBookmarksBar] = useState<boolean>(false);

  // Visited URLs History (for Browser Tracking demonstration)
  const [visitedHistory, setVisitedHistory] = useState<VisitedUrlItem[]>([
    {
      id: 'vh-init-1',
      url: 'https://www.google.pt',
      title: 'Google Júnior 🇵🇹',
      icon: '🔍',
      timestamp: 'Agora mesmo',
      route: 'google',
      trackerNote: 'Motor de busca — regista termos de pesquisa, cliques e preferências publicitárias',
    },
  ]);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [historyClearedFeedback, setHistoryClearedFeedback] = useState<string | null>(null);

  // HTTPS Modal
  const [showHttpsModal, setShowHttpsModal] = useState<boolean>(false);

  // Refreshing animation
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // URL Anatomy State
  const [selectedUrlSegment, setSelectedUrlSegment] = useState<'protocol' | 'subdomain' | 'domain' | 'tld' | 'path'>('tld');

  // Missions Checklist
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

  // Route URL dictionary
  const ROUTE_DATA: Record<WebRoute, { url: string; title: string; icon: string }> = {
    google: { url: 'https://www.google.pt', title: 'Google Júnior 🇵🇹', icon: '🔍' },
    google_results: {
      url: `https://www.google.pt/search?q=${encodeURIComponent(searchQuery || 'lince iberico')}`,
      title: `Google: ${searchQuery || 'lince'}`,
      icon: '🔎',
    },
    escola: { url: 'https://escola.pt/5ano', title: 'Portal da Escola Básica 2,3', icon: '🏫' },
    escola_tarefas: { url: 'https://escola.pt/5ano/tarefas-tic', title: 'Tarefas de TIC — 5.º Ano', icon: '📋' },
    escola_ementa: { url: 'https://escola.pt/5ano/ementa', title: 'Ementa da Cantina Escolar', icon: '🍎' },
    vidaselvagem: { url: 'https://vidaselvagem.pt', title: 'Júnior Vida Selvagem .pt', icon: '🐾' },
    vidaselvagem_lince: {
      url: 'https://vidaselvagem.pt/lince',
      title: 'O Lince-Ibérico em Portugal',
      icon: '🐆',
    },
    oceanos: { url: 'https://oceanos.pt/sado', title: 'Golfinhos do Rio Sado — Oceanos Vivos', icon: '🐬' },
    detetives: { url: 'https://detetives-web.pt', title: 'Academia dos Detetives da Web', icon: '🕵️' },
  };

  // Check if current page is bookmarked
  const currentUrl = ROUTE_DATA[currentRoute].url;
  const isCurrentPageBookmarked = bookmarks.some((b) => b.url === addressInput || b.url === currentUrl);

  // Record a visited URL into tracking history log
  const recordVisitedUrl = (route: WebRoute, targetUrl: string, title: string, icon: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    let trackerNote = 'Cookies e histórico de visita registados pelo navegador';
    if (route.startsWith('google')) {
      trackerNote = 'Motor de busca — regista palavras pesquisadas e cliques para personalizar anúncios';
    } else if (route.startsWith('escola')) {
      trackerNote = 'Portal Escolar Seguro — ambiente de estudo sem cookies de publicidade comercial';
    } else if (route.startsWith('vidaselvagem') || route === 'oceanos') {
      trackerNote = 'Portal Científico — regista páginas lidas e duração da sessão de leitura';
    } else if (route === 'detetives') {
      trackerNote = 'Laboratório TIC — deteta rastreadores e pegada digital';
    }

    const newEntry: VisitedUrlItem = {
      id: `vh-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      url: targetUrl,
      title,
      icon,
      timestamp: timeStr,
      route,
      trackerNote,
    };

    setVisitedHistory((prev) => [newEntry, ...prev]);
  };

  const handleClearHistory = () => {
    setVisitedHistory([]);
    setHistoryClearedFeedback(
      language === 'pt'
        ? '🧹 Histórico e rastreadores limpos com sucesso! Nenhum rasto ficou guardado neste navegador.'
        : '🧹 History and trackers cleared successfully! No traces left in the browser.'
    );
    setTimeout(() => setHistoryClearedFeedback(null), 3500);
  };

  // Navigate to route
  const navigateTo = (route: WebRoute, customQuery?: string) => {
    setShowBookmarkDialog(false);
    const data = ROUTE_DATA[route];
    let nextUrl = data.url;

    if (route === 'google_results') {
      const q = customQuery !== undefined ? customQuery : searchQuery;
      nextUrl = `https://www.google.pt/search?q=${encodeURIComponent(q)}`;
      setSearchQuery(q);
      setLastSearchedQuery(q);
      checkMission('m_search');
      if (q.includes('"')) checkMission('m_quotes');
      if (q.includes('-')) checkMission('m_minus');
    }

    if (route === 'escola') checkMission('m_escola');
    if (route === 'vidaselvagem_lince') checkMission('m_lince');

    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(route);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);

    setAddressInput(nextUrl);

    // Update active tab
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, route, url: nextUrl, title: data.title, icon: data.icon } : t))
    );

    recordVisitedUrl(route, nextUrl, data.title, data.icon);
  };

  const handleBack = () => {
    setShowBookmarkDialog(false);
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevRoute = history[prevIndex];
      setHistoryIndex(prevIndex);
      const prevUrl = ROUTE_DATA[prevRoute].url;
      setAddressInput(prevUrl);
      checkMission('m_back');
      recordVisitedUrl(prevRoute, prevUrl, ROUTE_DATA[prevRoute].title, ROUTE_DATA[prevRoute].icon);
    }
  };

  const handleForward = () => {
    setShowBookmarkDialog(false);
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextRoute = history[nextIndex];
      setHistoryIndex(nextIndex);
      const nextUrl = ROUTE_DATA[nextRoute].url;
      setAddressInput(nextUrl);
      recordVisitedUrl(nextRoute, nextUrl, ROUTE_DATA[nextRoute].title, ROUTE_DATA[nextRoute].icon);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = addressInput.trim().toLowerCase();

    if (clean.includes('escola')) navigateTo('escola');
    else if (clean.includes('lince') || clean.includes('vida') || clean.includes('fauna')) navigateTo('vidaselvagem_lince');
    else if (clean.includes('oceano') || clean.includes('golfinho')) navigateTo('oceanos');
    else if (clean.includes('detetive')) navigateTo('detetives');
    else if (clean.includes('.') && !clean.includes(' ')) navigateTo('google_results', clean);
    else navigateTo('google_results', addressInput);
  };

  // Open Star / Bookmark Dialog
  const handleStarClick = () => {
    const data = ROUTE_DATA[currentRoute];
    setBookmarkNameInput(data.title.split('—')[0].trim());
    setShowBookmarkDialog((prev) => !prev);
  };

  // Confirm Save Bookmark
  const handleConfirmBookmark = () => {
    const data = ROUTE_DATA[currentRoute];
    const nameToSave = bookmarkNameInput.trim() || data.title;

    if (!bookmarks.some((b) => b.url === addressInput)) {
      setBookmarks((prev) => [
        ...prev,
        {
          id: `bm-${Date.now()}`,
          name: nameToSave,
          route: currentRoute,
          url: addressInput,
          icon: data.icon,
          folder: 'Barra de Marcadores',
        },
      ]);
    }

    setShowBookmarkDialog(false);
    checkMission('m_star');

    // Trigger visual pulse on bookmarks bar below
    setHighlightBookmarksBar(true);
    setTimeout(() => setHighlightBookmarksBar(false), 2500);

    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  // Remove Bookmark
  const handleRemoveBookmark = () => {
    setBookmarks((prev) => prev.filter((b) => b.url !== addressInput && b.url !== currentUrl));
    setShowBookmarkDialog(false);
  };

  // Add new tab
  const handleAddTab = () => {
    checkMission('m_tab');
    const newId = `tab-${Date.now()}`;
    const newTab: BrowserTab = {
      id: newId,
      route: 'google',
      title: 'Novo Separador',
      icon: '🔍',
      url: 'https://www.google.pt',
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    navigateTo('google');
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
    <div className="w-full space-y-4 font-sans text-slate-800">
      {/* 1. TOP SELECTOR: 4 INTUITIVE STUDY AREAS (Simples e Didático) */}
      <div className="bg-white p-2.5 rounded-2xl border-2 border-indigo-200/90 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center text-lg font-black shadow-xs">
            🌐
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              {language === 'pt' ? 'Laboratório do Navegador & Marcadores' : 'Browser & Bookmarks Lab'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'pt'
                ? 'Aprende a navegar, pesquisar e a guardar os teus sites favoritos no Chrome!'
                : 'Learn to browse, search, and save your favorite websites in Chrome!'}
            </p>
          </div>
        </div>

        {/* Segmented Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveMainTab('browser')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'browser'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <span>🖥️</span>
            <span>{language === 'pt' ? '1. Navegador Chrome' : '1. Chrome Browser'}</span>
          </button>

          <button
            onClick={() => setActiveMainTab('favorites_tutorial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'favorites_tutorial'
                ? 'bg-amber-500 text-slate-950 shadow-xs ring-1 ring-amber-600'
                : 'text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200'
            }`}
          >
            <span>⭐</span>
            <span className="font-extrabold sm:hidden">{language === 'pt' ? 'Favoritos' : 'Bookmarks'}</span>
            <span className="font-extrabold hidden sm:inline">{language === 'pt' ? 'Como Guardar nos Favoritos?' : 'How to Bookmark?'}</span>
          </button>

          <button
            onClick={() => setActiveMainTab('url_anatomy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'url_anatomy'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <span>🧩</span>
            <span>{language === 'pt' ? 'Partes do URL (.pt)' : 'URL Parts'}</span>
          </button>

          <button
            onClick={() => setActiveMainTab('missions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'missions'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{language === 'pt' ? `Missões (${Object.keys(completedMissions).length}/5)` : 'Missions'}</span>
          </button>
        </div>
      </div>

      {/* 2. DEDICATED FAVORITES / BOOKMARKS TUTORIAL AREA (Quando a criança quer saber onde se guarda) */}
      {activeMainTab === 'favorites_tutorial' && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/40 rounded-2xl border-2 border-amber-300 p-5 sm:p-6 shadow-md space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-xs">
                ⭐
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-amber-950">
                  {language === 'pt' ? 'Onde e Como se Coloca uma Página nos Favoritos?' : 'Where and How to Bookmark a Webpage?'}
                </h3>
                <p className="text-xs text-amber-800">
                  {language === 'pt'
                    ? 'Aprende o segredo em 2 passos simples para nunca mais perderes um site da escola!'
                    : 'Master bookmarking in 2 simple steps so you never lose school links!'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveMainTab('browser')}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 cursor-pointer flex items-center gap-1"
            >
              <span>Testar no Simulador</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Step-by-Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1: Click the Star */}
            <div className="p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-xs">1</span>
                <span>Passo 1: Clicar na Estrela ⭐ na Barra de Endereços</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Olha para a <strong>barra de endereços</strong> no topo do navegador (onde está escrito o URL do site). No canto direito dessa barra existe o ícone de uma <strong>Estrela ⭐</strong>.
              </p>
              {/* Illustration of address bar with star highlight */}
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-1 text-slate-600 truncate">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">https://escola.pt/5ano</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <span className="text-[10px] font-sans font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-md animate-pulse">
                    👈 Clica Aqui!
                  </span>
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-xs">
                    <Star className="w-4 h-4 text-amber-950 fill-amber-950" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                💡 No teclado também podes carregar nas teclas <strong>Ctrl + D</strong> (ou <strong>Cmd + D</strong> no Mac).
              </p>
            </div>

            {/* Step 2: The Bookmarks Bar */}
            <div className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">2</span>
                <span>Passo 2: Onde Fica Guardada? Na Barra de Marcadores!</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Assim que clicas na estrela, abre uma janela para confirmares o nome e o site vai logo para a <strong>Barra de Marcadores</strong> (a barra cinzenta que fica logo abaixo dos endereços).
              </p>
              {/* Illustration of Bookmarks Bar */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-300 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Barra de Marcadores (Atalhos num clique):
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="px-2 py-1 rounded bg-white border border-slate-200 shadow-2xs flex items-center gap-1">
                    🏫 Portal da Escola
                  </span>
                  <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs flex items-center gap-1">
                    ⭐ Novo Favorito!
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-800 font-bold">
                🎯 Resultado: Nos dias seguintes, basta clicares no atalho da barra para abrires o site num só segundo!
              </p>
            </div>
          </div>

          {/* Interactive Try-it-Now Button */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-indigo-950">Queres experimentar na prática?</p>
                <p className="text-[11px] text-indigo-700">
                  Abre o simulador e clica na estrela ⭐ no topo do navegador para guardares o Portal da Escola!
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveMainTab('browser');
                setShowBookmarkDialog(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-slate-950" />
              <span>Experimentar Agora no Chrome!</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. URL ANATOMY AREA */}
      {activeMainTab === 'url_anatomy' && (
        <div className="bg-white rounded-2xl border-2 border-indigo-200 p-5 sm:p-6 shadow-sm space-y-5 animate-fadeIn text-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl shadow-xs">
                🧩
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {language === 'pt' ? 'Como se Lê uma Morada Web (URL)?' : 'How to Read a Web Address (URL)?'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'pt'
                    ? 'Clica nas 5 partes da morada para descobrires a função de cada uma!'
                    : 'Click each part to learn what it means!'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive URL Segments */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 space-y-2.5">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {language === 'pt' ? 'Barra de Endereços do Navegador:' : 'Browser Address Bar:'}
            </p>

            <div className="p-3 bg-white rounded-xl border border-slate-300 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-1.5 shadow-2xs">
              <button
                onClick={() => setSelectedUrlSegment('protocol')}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedUrlSegment === 'protocol'
                    ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>https://</span>
              </button>

              <button
                onClick={() => setSelectedUrlSegment('subdomain')}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlSegment === 'subdomain'
                    ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300'
                    : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                }`}
              >
                www.
              </button>

              <button
                onClick={() => setSelectedUrlSegment('domain')}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlSegment === 'domain'
                    ? 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-300'
                    : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                }`}
              >
                escola
              </button>

              <button
                onClick={() => setSelectedUrlSegment('tld')}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlSegment === 'tld'
                    ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                .pt
              </button>

              <button
                onClick={() => setSelectedUrlSegment('path')}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedUrlSegment === 'path'
                    ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300'
                    : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                }`}
              >
                /5ano
              </button>
            </div>
          </div>

          {/* Explanation Card */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1 text-xs sm:text-sm">
            {selectedUrlSegment === 'protocol' && (
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
            {selectedUrlSegment === 'subdomain' && (
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
            {selectedUrlSegment === 'domain' && (
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
            {selectedUrlSegment === 'tld' && (
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
            {selectedUrlSegment === 'path' && (
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

      {/* 4. MISSIONS AREA */}
      {activeMainTab === 'missions' && (
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-5 sm:p-6 shadow-sm space-y-4 animate-fadeIn text-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shadow-xs">
                🏆
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Missões do Navegador Digital (5.º Ano)
                </h3>
                <p className="text-xs text-slate-500">
                  {Object.keys(completedMissions).length} de 5 Missões Concluídas!
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveMainTab('browser')}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 cursor-pointer flex items-center gap-1"
            >
              <span>Ir para o Simulador</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className={`p-3.5 rounded-xl border ${completedMissions['m_star'] ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_star'] ? '✅' : '⭐'}</span>
                <span className="text-slate-900">Missão 1: Guardar nos Favoritos</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Clica na estrela ⭐ no canto direito da barra de endereços para guardares uma página na barra de marcadores.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${completedMissions['m_search'] ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_search'] ? '✅' : '🔎'}</span>
                <span className="text-slate-900">Missão 2: Fazer uma Pesquisa</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Usa a caixa de pesquisa do Google Júnior para pesquisar por <code>"lince ibérico"</code>.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${completedMissions['m_quotes'] ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_quotes'] ? '✅' : '🐆'}</span>
                <span className="text-slate-900">Missão 3: Usar Aspas Exatas</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Testa o superpoder das aspas: pesquisa por <code>"lince ibérico" habitat</code>.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${completedMissions['m_back'] ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_back'] ? '✅' : '⬅️'}</span>
                <span className="text-slate-900">Missão 4: Voltar Atrás no Histórico</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Depois de clicares num link, usa a seta para a esquerda (⬅️) para regressares à página anterior.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${completedMissions['m_history'] ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                <span>{completedMissions['m_history'] ? '✅' : '🕒'}</span>
                <span className="text-slate-900">Missão 5: Inspecionar o Histórico & Rastreio</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Clica no botão <strong>Histórico</strong> na barra de navegação para veres os últimos 5 URLs visitados e como os sites nos rastreiam!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. THE REALISTIC GOOGLE CHROME SIMULATOR (LIGHT THEME, CRISP & COMPLETE)   */}
      {/* ========================================================================= */}
      {activeMainTab === 'browser' && (
        <div className="rounded-2xl border-2 border-slate-300 bg-white shadow-xl overflow-hidden animate-fadeIn">
          {/* A. Chrome Tab Strip (Light Slate-200 Header) */}
          <div className="bg-slate-200/90 pt-2 px-3 flex items-center gap-2 border-b border-slate-300 select-none">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block border border-rose-600/30 shadow-2xs" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-amber-600/30 shadow-2xs" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-emerald-600/30 shadow-2xs" />
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
                    className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-t-xl text-xs font-bold cursor-pointer max-w-[210px] transition-all ${
                      isActive
                        ? 'bg-white text-slate-800 shadow-xs border-t-2 border-blue-600'
                        : 'bg-slate-300/60 text-slate-600 hover:bg-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="truncate">{tab.title}</span>
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => handleCloseTab(tab.id, e)}
                        className="ml-auto opacity-40 group-hover:opacity-100 hover:bg-slate-200 p-0.5 rounded text-slate-600 cursor-pointer"
                        title="Fechar separador"
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
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-300/80 transition-colors cursor-pointer mb-0.5"
                title="Abrir novo separador (+)"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* B. Chrome Toolbar: Navigation, Omnibox, Star & Tools */}
          <div className="bg-white px-3 py-2 flex items-center gap-2 border-b border-slate-200 relative">
            {/* Nav buttons */}
            <div className="flex items-center gap-1 text-slate-700">
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
                title="Recarregar página (🔄)"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('google')}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                title="Página Inicial (Google Júnior)"
              >
                <Home className="w-4 h-4" />
              </button>

              {/* History Button (Histórico de Navegação & Rastreio) */}
              <button
                type="button"
                onClick={() => {
                  setShowHistoryModal(true);
                  checkMission('m_history');
                }}
                className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 hover:border-indigo-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs group shrink-0 min-h-[36px]"
                title={language === 'pt' ? 'Histórico de Navegação e Rastreio (Ver últimos 5 URLs)' : 'Browser History & Tracking (View last 5 URLs)'}
              >
                <History className="w-4 h-4 text-indigo-600 group-hover:rotate-[-20deg] transition-transform" />
                <span className="hidden sm:inline text-xs font-bold">{language === 'pt' ? 'Histórico' : 'History'}</span>
                <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-black flex items-center justify-center">
                  {Math.min(5, visitedHistory.length)}
                </span>
              </button>
            </div>

            {/* Omnibox / Address Bar */}
            <form
              onSubmit={handleAddressSubmit}
              className="relative flex-1 flex items-center bg-slate-100/90 hover:bg-slate-100 rounded-full border border-slate-300 px-3.5 py-1.5 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
            >
              {/* HTTPS Lock Icon */}
              <button
                type="button"
                onClick={() => setShowHttpsModal((prev) => !prev)}
                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 mr-2 cursor-pointer transition-colors text-xs font-mono font-bold shrink-0"
                title="Clica para inspecionar a segurança HTTPS"
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

              {/* STAR / BOOKMARK BUTTON WITH EDUCATIONAL CALLOUT */}
              <div className="relative shrink-0 flex items-center">
                <button
                  type="button"
                  onClick={handleStarClick}
                  className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                    isCurrentPageBookmarked
                      ? 'text-amber-500 bg-amber-100 hover:bg-amber-200 ring-2 ring-amber-400 scale-110 shadow-xs'
                      : 'text-slate-400 hover:text-amber-500 hover:bg-slate-200'
                  }`}
                  title={isCurrentPageBookmarked ? 'Guardado nos Favoritos! Clica para editar ⭐' : 'Guardar nos Favoritos ⭐'}
                >
                  <Star className={`w-4 h-4 ${isCurrentPageBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
                </button>
              </div>
            </form>

            {/* Profile Avatar */}
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-xs shrink-0">
              5º
            </div>

            {/* GOOGLE CHROME AUTHENTIC BOOKMARK POPUP DIALOG */}
            {showBookmarkDialog && (
              <div className="absolute right-12 top-13 z-50 w-72 bg-white rounded-2xl border-2 border-slate-300 shadow-2xl p-4 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{isCurrentPageBookmarked ? 'Editar Marcador' : '⭐ Marcador Adicionado!'}</span>
                  </div>
                  <button
                    onClick={() => setShowBookmarkDialog(false)}
                    className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Nome do Marcador:
                    </label>
                    <input
                      type="text"
                      value={bookmarkNameInput}
                      onChange={(e) => setBookmarkNameInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-hidden font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Pasta de Destino:
                    </label>
                    <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 flex items-center justify-between text-xs font-medium">
                      <span className="flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5 text-amber-500" />
                        Barra de Marcadores (Favoritos)
                      </span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-snug">
                  ⭐ <strong>Onde vai parar?</strong> Fica guardado na barra cinzenta logo abaixo para abrires num só clique!
                </div>

                <div className="flex items-center justify-between pt-1">
                  {isCurrentPageBookmarked ? (
                    <button
                      onClick={handleRemoveBookmark}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Remover
                    </button>
                  ) : <span />}

                  <button
                    onClick={handleConfirmBookmark}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Concluído
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* C. HTTPS Lock Details (Caixa Verde Didática) */}
          {showHttpsModal && (
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
                onClick={() => setShowHttpsModal(false)}
                className="text-emerald-700 hover:text-emerald-950 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* D. Chrome Bookmarks Bar (Barra de Favoritos com destaque interativo) */}
          <div
            className={`px-3 py-1.5 border-b transition-all flex items-center gap-2 overflow-x-auto text-[11px] font-semibold text-slate-700 no-scrollbar ${
              highlightBookmarksBar
                ? 'bg-amber-100 border-amber-300 ring-2 ring-amber-400'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider shrink-0 flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-amber-500" />
              Barra de Favoritos:
            </span>

            {bookmarks.map((bm) => (
              <button
                key={bm.id}
                onClick={() => navigateTo(bm.route)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 shadow-2xs transition-all shrink-0 cursor-pointer"
              >
                <span>{bm.icon}</span>
                <span>{bm.name}</span>
              </button>
            ))}

            <button
              onClick={() => setActiveMainTab('favorites_tutorial')}
              className="ml-auto text-[10px] text-amber-800 font-bold bg-amber-200/80 hover:bg-amber-200 px-2 py-0.5 rounded-full shrink-0 cursor-pointer flex items-center gap-1"
            >
              <span>Como funciona?</span>
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>

          {/* E. WEB VIEWPORT (LIGHT THEME, COLORFUL, SAFE FICTIONAL SITES) */}
          <div className="min-h-[400px] bg-slate-50/40 p-4 sm:p-6 text-slate-800">
            {/* 1. GOOGLE JÚNIOR HOMEPAGE */}
            {currentRoute === 'google' && (
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

                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  O teu motor de busca seguro para pesquisas escolares do 5.º Ano!
                </p>

                {/* Big Search Input Box */}
                <div className="flex items-center bg-white rounded-full border-2 border-slate-300 hover:border-slate-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 px-4 py-2.5 shadow-sm transition-all">
                  <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigateTo('google_results', searchQuery);
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

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2.5">
                  <button
                    onClick={() => navigateTo('google_results', searchQuery || 'lince iberico')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-300 shadow-2xs"
                  >
                    Pesquisa Google
                  </button>
                  <button
                    onClick={() => navigateTo('google_results', '"lince ibérico" habitat')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-300 shadow-2xs"
                  >
                    Estou com Sorte! ⭐
                  </button>
                </div>

                {/* Quick Search Chips */}
                <div className="pt-4 border-t border-slate-200 text-left space-y-2">
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Chips de Pesquisa Rápida do 5.º Ano:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => navigateTo('google_results', '"lince ibérico" habitat')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-blue-700 cursor-pointer shadow-2xs"
                    >
                      🐆 "lince ibérico" habitat (Aspas)
                    </button>
                    <button
                      onClick={() => navigateTo('google_results', 'morcego -batman')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-rose-700 cursor-pointer shadow-2xs"
                    >
                      🦇 morcego -batman (Menos)
                    </button>
                    <button
                      onClick={() => navigateTo('google_results', 'golfinho sado site:.pt')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-emerald-700 cursor-pointer shadow-2xs"
                    >
                      🐬 golfinho sado site:.pt
                    </button>
                  </div>
                </div>

                {/* Safe Educational Sites Quick Links */}
                <div className="pt-3 border-t border-slate-200 text-left space-y-2">
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    Portais Educativos Seguros para Visitares:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => navigateTo('escola')}
                      className="p-2.5 rounded-xl bg-white hover:bg-blue-50/70 border border-slate-200 text-left transition-all cursor-pointer shadow-2xs flex items-center gap-2"
                    >
                      <span className="text-xl">🏫</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">Portal da Escola</div>
                        <div className="text-[10px] text-slate-500 font-mono">escola.pt/5ano</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('vidaselvagem_lince')}
                      className="p-2.5 rounded-xl bg-white hover:bg-emerald-50/70 border border-slate-200 text-left transition-all cursor-pointer shadow-2xs flex items-center gap-2"
                    >
                      <span className="text-xl">🐾</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">Vida Selvagem</div>
                        <div className="text-[10px] text-slate-500 font-mono">vidaselvagem.pt</div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('oceanos')}
                      className="p-2.5 rounded-xl bg-white hover:bg-sky-50/70 border border-slate-200 text-left transition-all cursor-pointer shadow-2xs flex items-center gap-2"
                    >
                      <span className="text-xl">🐬</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">Oceanos Vivos</div>
                        <div className="text-[10px] text-slate-500 font-mono">oceanos.pt</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. GOOGLE SEARCH RESULTS */}
            {currentRoute === 'google_results' && (
              <div className="max-w-xl mx-auto space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs text-slate-500">
                  <div>
                    Resultados de pesquisa para: <strong className="text-slate-900 font-mono">"{lastSearchedQuery}"</strong>
                  </div>
                  <button
                    onClick={() => navigateTo('google')}
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
                    <span className="text-slate-600">LojaMundialBrinquedos.pt</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] font-mono text-emerald-700">https://loja.pt</span>
                  </div>
                  <p className="text-xs font-bold text-blue-700">Comprar Brinquedos e Peluches Online</p>
                  <p className="text-[11px] text-slate-600">
                    ⚠️ <em>Dica do 5.º Ano: Este link pagou para aparecer aqui! Para trabalhos escolares deves sempre descer e escolher fontes oficiais e educativas.</em>
                  </p>
                </div>

                {/* Educational Result: Lince */}
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
                    Artigo científico escolar completo com biólogos portugueses. Descobre o peso médio (9 a 13 kg) e o seu prato preferido no território nacional.
                  </p>
                </div>

                {/* Educational Result: Oceanos */}
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

            {/* 3. PORTAL DA ESCOLA (WITH PROMINENT FAVORITES BANNER) */}
            {(currentRoute === 'escola' || currentRoute === 'escola_tarefas' || currentRoute === 'escola_ementa') && (
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-xs animate-fadeIn">
                {/* Header */}
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

                {/* TEACHER'S TIP CALLOUT ON HOW TO ADD TO FAVORITES */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-amber-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0" />
                    <span>
                      <strong>Queres abrir a escola num só clique todos os dias?</strong> Clica na estrela ⭐ no topo para guardar nos Favoritos!
                    </span>
                  </div>
                  <button
                    onClick={handleStarClick}
                    className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shrink-0 cursor-pointer shadow-2xs"
                  >
                    Guardar ⭐
                  </button>
                </div>

                {/* Subpage Nav */}
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
                    onClick={() => navigateTo('escola_tarefas')}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                      currentRoute === 'escola_tarefas' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Tarefas de TIC
                  </button>
                  <button
                    onClick={() => navigateTo('escola_ementa')}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                      currentRoute === 'escola_ementa' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Ementa da Cantina
                  </button>
                </div>

                {currentRoute === 'escola' && (
                  <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                      <p className="font-bold text-blue-950">Área Pessoal — Turma do 5.º Ano A</p>
                      <p>Bem-vindo ao teu portal escolar digital. Aqui encontras horários e recados dos professores.</p>
                    </div>
                  </div>
                )}

                {currentRoute === 'escola_tarefas' && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                    <p className="font-bold text-slate-900">📋 Tarefas de TIC — 5.º Ano:</p>
                    <p>Encontra 3 factos sobre o lince-ibérico e anota o autor e a data do artigo.</p>
                    <button
                      onClick={() => navigateTo('vidaselvagem_lince')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer text-xs flex items-center gap-1.5"
                    >
                      <span>Abrir Artigo do Lince</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {currentRoute === 'escola_ementa' && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 space-y-2">
                    <p className="font-bold text-emerald-950">🍎 Ementa Saudável da Semana:</p>
                    <p>• Sopa de legumes da horta escolar</p>
                    <p>• Pescada fresca no forno com arroz e salada</p>
                    <p>• Sobremesa: Maçã de Alcobaça</p>
                  </div>
                )}
              </div>
            )}

            {/* 4. JÚNIOR VIDA SELVAGEM (LINCE-IBÉRICO) */}
            {(currentRoute === 'vidaselvagem' || currentRoute === 'vidaselvagem_lince') && (
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-xs animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🐾</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Júnior Vida Selvagem .pt</h4>
                      <p className="text-xs text-emerald-700 font-mono">https://vidaselvagem.pt/lince</p>
                    </div>
                  </div>
                  <button
                    onClick={handleStarClick}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>Favoritos</span>
                  </button>
                </div>

                {/* 3 C's of Detective badge */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-[11px] p-3 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
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
                    <p>• Peso médio de um adulto: entre <strong>9 e 13 kg</strong>.</p>
                    <p>• Alimentação: cerca de 85% a 90% é <strong>coelho-bravo selvagem</strong>.</p>
                    <p>• Orelhas pontiagudas com pelos pretos em forma de pincel.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. OCEANOS VIVOS */}
            {currentRoute === 'oceanos' && (
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-xs animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🐬</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Oceanos Vivos & Rio Sado</h4>
                      <p className="text-xs text-emerald-700 font-mono">https://oceanos.pt/sado</p>
                    </div>
                  </div>
                  <button
                    onClick={handleStarClick}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>Favoritos</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h5 className="font-bold text-slate-900">A Família de Golfinhos Roazes em Setúbal</h5>
                  <p>
                    O estuário do rio Sado acolhe uma das únicas colónias residentes de golfinhos em estuários em toda a Europa.
                  </p>
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-950">
                    💡 <strong>Como pesquisar isto:</strong> Usa no Google <code>golfinhos sado site:.pt</code> para ver apenas centros de ciência oficiais de Portugal!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. BROWSER HISTORY & TRACKING MODAL (Últimos 5 URLs & Pegada Digital)     */}
      {/* ========================================================================= */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-5 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-xs">
                  <History className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{language === 'pt' ? 'Histórico de Navegação & Rastreio' : 'Browser History & Web Tracking'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                      {language === 'pt' ? '5.º Ano TIC' : 'Grade 5 ICT'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'pt'
                      ? 'Descobre a pegada digital que deixas ao navegar e como os sites te seguem!'
                      : 'Discover the digital footprint you leave while browsing and how websites track you!'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Educational Explainer on Browser Tracking for 10-year-olds */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50/50 border border-indigo-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-xs sm:text-sm">
                <Eye className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{language === 'pt' ? 'Como Funciona o Rastreio do Navegador (Browser Tracking)?' : 'How Does Browser Tracking Work?'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>👣</span>
                    <span>1. Pegada Digital</span>
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Cada clique fica registado com a <strong>hora</strong> e o <strong>endereço URL exato</strong> da página visitada.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>🍪</span>
                    <span>2. Cookies & Anúncios</span>
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Os sites comerciais colocam pequenos ficheiros (cookies) para saber que temas pesquisaste e mostrar <strong>publicidade direcionada</strong>.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>🛡️</span>
                    <span>3. Regra de Segurança</span>
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Em computadores partilhados (escola ou biblioteca), <strong>limpa sempre o histórico</strong> para proteger a tua privacidade!
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback message when history is cleared */}
            {historyClearedFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{historyClearedFeedback}</span>
              </div>
            )}

            {/* List of the Last 5 URLs Visited */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    {language === 'pt'
                      ? 'Últimos 5 URLs Visitados na Simulação:'
                      : 'Last 5 URLs Visited in Simulation:'}
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  {language === 'pt' ? `Total de registos: ${visitedHistory.length}` : `Total entries: ${visitedHistory.length}`}
                </span>
              </div>

              {visitedHistory.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 space-y-2">
                  <span className="text-3xl">🧹</span>
                  <p className="text-xs font-bold text-slate-800">
                    {language === 'pt' ? 'O teu histórico está limpo!' : 'Your history is clean!'}
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    {language === 'pt'
                      ? 'Nenhum rasto de navegação está gravado. Clica em links ou faz pesquisas no simulador para veres os novos URLs a aparecer aqui em tempo real!'
                      : 'No browsing traces are saved. Click links or search in the simulator to see new URLs appear here in real time!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {visitedHistory.slice(0, 5).map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs group"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          idx === 0
                            ? 'bg-emerald-500 text-white shadow-2xs ring-2 ring-emerald-200'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          #{idx + 1}
                        </span>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base">{item.icon}</span>
                            <span className="font-bold text-xs text-slate-900 truncate">{item.title}</span>
                            {idx === 0 && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                                {language === 'pt' ? 'Mais Recente' : 'Latest'}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 font-mono">🕒 {item.timestamp}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200 w-fit max-w-full truncate">
                            <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{item.url}</span>
                          </div>

                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <span className="text-amber-500">👁️</span>
                            <span>{item.trackerNote}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigateTo(item.route);
                          setShowHistoryModal(false);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-xs transition-colors cursor-pointer shrink-0 self-end sm:self-center flex items-center gap-1 shadow-2xs"
                        title="Revisitar este site"
                      >
                        <span>{language === 'pt' ? 'Revisitar' : 'Revisit'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-3 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                onClick={handleClearHistory}
                disabled={visitedHistory.length === 0}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px] ${
                  visitedHistory.length > 0
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
                title="Apagar todos os registos do histórico"
              >
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>{language === 'pt' ? 'Limpar Histórico de Navegação' : 'Clear Browsing History'}</span>
              </button>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                {language === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
