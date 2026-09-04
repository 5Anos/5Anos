import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Dashboard } from './components/Dashboard';
import { ThemeView } from './components/ThemeView';
import { ModuleReader } from './components/ModuleReader';
import { ProgressView } from './components/ProgressView';
import { SafeOrDangerousGame } from './components/games/SafeOrDangerousGame';
import { PasswordBuilderGame } from './components/games/PasswordBuilderGame';
import { PhishingDetectorGame } from './components/games/PhishingDetectorGame';
import { WhatWouldYouDoGame } from './components/games/WhatWouldYouDoGame';
import { EmailLabGame } from './components/games/EmailLabGame';
import { InboxSortingGame } from './components/games/InboxSortingGame';
import { CcBccSimulatorGame } from './components/games/CcBccSimulatorGame';
import { FinalQuizView } from './components/games/FinalQuizView';
import { KeywordMasterGame } from './components/games/KeywordMasterGame';
import { ReliableSourcesGame } from './components/games/ReliableSourcesGame';
import { SearchOperatorsGame } from './components/games/SearchOperatorsGame';
import { CopyOrCreditGame } from './components/games/CopyOrCreditGame';
import { GenericChallengeGame } from './components/games/GenericChallengeGame';

import { api } from './services/api';
import { User, ActivityProgress, UserAchievement, PointTransaction, Language } from './types';
import { ALL_THEMES } from './data/allThemesData';
import { translations } from './i18n/translations';
import { Sparkles } from 'lucide-react';

type ViewMode = 'dashboard' | 'theme' | 'module' | 'challenge' | 'progress';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [progressList, setProgressList] = useState<ActivityProgress[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointTransaction[]>([]);
  const [language, setLanguage] = useState<Language>('pt');

  // Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [activeThemeId, setActiveThemeId] = useState<string>('tic-sociedade');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);

  // Modals & Notifications
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle?: string } | null>(null);

  const t = translations[language];

  // Helper to resolve theme by id or legacy name
  const resolveTheme = (idOrAlias: string) => {
    if (idOrAlias === 'theme1' || idOrAlias === 'seguranca-digital' || idOrAlias === 'tic-sociedade') {
      return ALL_THEMES.find((th) => th.id === 'tic-sociedade') || ALL_THEMES[0];
    }
    if (idOrAlias === 'theme2' || idOrAlias === 'ergonomia') {
      return ALL_THEMES.find((th) => th.id === 'ergonomia') || ALL_THEMES[1];
    }
    if (idOrAlias === 'theme3' || idOrAlias === 'palavras-passe') {
      return ALL_THEMES.find((th) => th.id === 'palavras-passe') || ALL_THEMES[2];
    }
    if (idOrAlias === 'theme4' || idOrAlias === 'correio-eletronico') {
      return ALL_THEMES.find((th) => th.id === 'correio-eletronico') || ALL_THEMES[3];
    }
    if (idOrAlias === 'theme5' || idOrAlias === 'navegar-internet' || idOrAlias === 'pesquisa-informacao') {
      return ALL_THEMES.find((th) => th.id === 'navegar-internet') || ALL_THEMES[4];
    }
    if (idOrAlias === 'theme6' || idOrAlias === 'direitos-autor') {
      return ALL_THEMES.find((th) => th.id === 'direitos-autor') || ALL_THEMES[5];
    }
    if (idOrAlias === 'theme7' || idOrAlias === 'referencias-fontes' || idOrAlias === 'referencias-bibliograficas') {
      return ALL_THEMES.find((th) => th.id === 'referencias-fontes') || ALL_THEMES[6];
    }
    const found = ALL_THEMES.find((th) => th.id === idOrAlias);
    return found || ALL_THEMES[0];
  };

  const currentTheme = resolveTheme(activeThemeId);

  // All modules across all themes
  const allModules = ALL_THEMES.flatMap((th) => th.modules);
  const currentModule = activeModuleId ? allModules.find((m) => m.id === activeModuleId) : null;

  // Auto-load session on mount and listen to Firebase Auth
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await api.getMe();
        setUser(data.user);
        setProgressList(data.progress);
        setAchievements(data.achievements);
        setPointsHistory(data.pointsHistory);
        if (data.user.language) {
          setLanguage(data.user.language);
        }
      } catch {
        // If not logged in, guest mode
      }
    }
    loadUser();

    // Firebase Auth listener
    const unsubscribe = api.onAuthChange(async (firebaseLoggedUser) => {
      if (firebaseLoggedUser) {
        setUser(firebaseLoggedUser);
        try {
          const data = await api.getMe();
          setProgressList(data.progress);
          setAchievements(data.achievements);
          setPointsHistory(data.pointsHistory);
        } catch {
          // ignore
        }
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (user) {
      api.updateLanguage(newLang).catch(() => {});
    }
  };

  const showToast = (title: string, subtitle?: string) => {
    setToastMessage({ title, subtitle });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    setProgressList([]);
    setAchievements([]);
    setPointsHistory([]);
    setCurrentView('dashboard');
    showToast(language === 'pt' ? 'Sessão terminada.' : 'Signed out successfully.');
  };

  const handleAuthSuccess = async (loggedUser: User) => {
    setUser(loggedUser);
    setLanguage(loggedUser.language || 'pt');
    try {
      const data = await api.getMe();
      setProgressList(data.progress);
      setAchievements(data.achievements);
      setPointsHistory(data.pointsHistory);
    } catch {
      // session fresh
    }
    showToast(
      language === 'pt' ? `Olá, ${loggedUser.name}! 👋` : `Hello, ${loggedUser.name}! 👋`,
      language === 'pt' ? 'O teu progresso está sincronizado.' : 'Your progress is synced.'
    );
  };

  // Central progress saving dispatcher
  const handleSaveProgress = async (payload: {
    activityId: string;
    activityType: 'module' | 'quiz' | 'challenge';
    themeId: string;
    status?: 'completed' | 'in_progress';
    score?: number;
    maxScore?: number;
    percentage?: number;
    activityTitle?: string;
  }) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      const res = await api.saveProgress(payload);
      if (res.success) {
        setUser((prev) => (prev ? { ...prev, points: res.userPoints, lastActivity: res.lastActivity } : null));

        // Update progress list
        setProgressList((prev) => {
          const idx = prev.findIndex((p) => p.activityId === payload.activityId);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = res.record;
            return next;
          }
          return [...prev, res.record];
        });

        // Check for newly unlocked badges
        if (res.achievements && res.achievements.length > achievements.length) {
          const newBadgesCount = res.achievements.length - achievements.length;
          setAchievements(res.achievements);
          showToast(
            language === 'pt' ? '🎖️ Nova Conquista Desbloqueada!' : '🎖️ New Achievement Unlocked!',
            language === 'pt'
              ? `Ganhaste ${newBadgesCount} nova(s) insígnia(s). Consulta no teu progresso!`
              : `You earned ${newBadgesCount} new badge(s). View in your progress tab!`
          );
        } else {
          showToast(
            language === 'pt' ? '✅ Progresso Guardado!' : '✅ Progress Saved!',
            language === 'pt' ? 'Excelente trabalho!' : 'Great effort!'
          );
        }
      }
    } catch (err: unknown) {
      console.error('Failed to save progress', err);
    }
  };

  // Navigation handlers
  const navigateToTheme = (themeId: string, moduleId?: string, challengeId?: string) => {
    setActiveThemeId(themeId);
    if (moduleId) {
      setActiveModuleId(moduleId);
      setCurrentView('module');
    } else if (challengeId) {
      setActiveChallengeId(challengeId);
      setCurrentView('challenge');
    } else {
      setCurrentView('theme');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the appropriate challenge / game
  const renderChallengeComponent = () => {
    if (!activeChallengeId) return null;

    // Check if it's a final quiz
    const isFinalQuiz =
      activeChallengeId.startsWith('quiz-final') ||
      currentTheme.finalQuiz.some((q) => q.id.includes(activeChallengeId));

    if (isFinalQuiz) {
      return (
        <FinalQuizView
          themeTitle={currentTheme.title[language]}
          themeNumber={currentTheme.number}
          questions={currentTheme.finalQuiz}
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'quiz',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: `${language === 'pt' ? 'Quiz Global:' : 'Master Quiz:'} ${currentTheme.title[language]}`,
            });
          }}
        />
      );
    }

    // Specialized Games
    if (activeChallengeId === 'desafio-seguro-perigoso' || activeChallengeId === 'jogo-ergo-seguro-incorreto') {
      return (
        <SafeOrDangerousGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Seguro ou Perigoso?' : 'Safe or Dangerous?',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-palavra-passe' || activeChallengeId === 'desafio-cofre-forte') {
      return (
        <PasswordBuilderGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O Laboratório da Palavra-passe' : 'The Password Lab',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-detetive-phishing') {
      return (
        <PhishingDetectorGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-detetive-phishing',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O Detetive de Phishing' : 'The Phishing Detective',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-o-que-farias') {
      return (
        <WhatWouldYouDoGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-o-que-farias',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O que farias?' : 'What would you do?',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-escrever-email') {
      return (
        <EmailLabGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-escrever-email',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Simulador de Escrita de Email' : 'Email Composer',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-organizar-inbox') {
      return (
        <InboxSortingGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-organizar-inbox',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O Organizador de Correio' : 'Mailbox Organizer',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-cc-bcc') {
      return (
        <CcBccSimulatorGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-cc-bcc',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O Enigma do Cc e Bcc' : 'Mystery of Cc & Bcc',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-palavras-chave') {
      return (
        <KeywordMasterGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-palavras-chave',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O Mestre das Palavras-Chave' : 'Keyword Master',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-fontes-fiaveis' || activeChallengeId === 'desafio-detetive-fontes-academicas') {
      return (
        <ReliableSourcesGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O Detetive de Fontes Fiáveis' : 'Reliable Sources Detective',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-misterio-aspas') {
      return (
        <SearchOperatorsGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-misterio-aspas',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'O Mistério das Aspas e Operadores' : 'Search Operators Mystery',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-copiar-criar') {
      return (
        <CopyOrCreditGame
          language={language}
          onBack={() => setCurrentView('theme')}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-copiar-criar',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Copiar ou Criar? Direitos e Plágio' : 'Copy or Create? Copyright & Plagiarism',
            });
          }}
        />
      );
    }

    // Default Interactive Generic Game for any other challenge across the 6 themes
    return (
      <GenericChallengeGame
        challengeId={activeChallengeId}
        language={language}
        onBack={() => setCurrentView('theme')}
        onFinish={(score, maxScore, percentage) => {
          handleSaveProgress({
            activityId: activeChallengeId,
            activityType: 'challenge',
            themeId: currentTheme.id,
            status: 'completed',
            score,
            maxScore,
            percentage,
            activityTitle: language === 'pt' ? 'Desafio Prático' : 'Practical Challenge',
          });
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-200 selection:text-indigo-900">
      {/* Top Navigation Bar */}
      <Header
        user={user}
        language={language}
        onLanguageChange={handleLanguageChange}
        activeView={currentView === 'theme' ? currentTheme.id : currentView}
        onNavigate={(viewId) => {
          if (viewId === 'dashboard') {
            setCurrentView('dashboard');
            setActiveModuleId(null);
            setActiveChallengeId(null);
          } else if (viewId === 'progress') {
            setCurrentView('progress');
            setActiveModuleId(null);
            setActiveChallengeId(null);
          } else {
            // Theme navigation
            navigateToTheme(viewId);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenLeaderboard={() => setLeaderboardModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* VIEW 1: Dashboard */}
        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            progressList={progressList}
            achievements={achievements}
            language={language}
            onNavigateTheme={navigateToTheme}
            onNavigateProgress={() => {
              setCurrentView('progress');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenAdmin={() => setAdminModalOpen(true)}
            onOpenLeaderboard={() => setLeaderboardModalOpen(true)}
          />
        )}

        {/* VIEW 2: Dynamic Theme Overview for all 6 Themes */}
        {currentView === 'theme' && (
          <ThemeView
            theme={currentTheme}
            progressList={progressList}
            language={language}
            onBack={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenModule={(modId) => {
              setActiveModuleId(modId);
              setCurrentView('module');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenChallenge={(chalId) => {
              setActiveChallengeId(chalId);
              setCurrentView('challenge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 3: Pedagogical Content Reader */}
        {currentView === 'module' && currentModule && (
          <ModuleReader
            module={currentModule}
            language={language}
            onBack={() => {
              setCurrentView('theme');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onFinishModule={(score, maxScore, percentage) => {
              handleSaveProgress({
                activityId: currentModule.id,
                activityType: 'module',
                themeId: currentTheme.id,
                status: 'completed',
                score,
                maxScore,
                percentage,
                activityTitle: currentModule.title[language],
              });
            }}
          />
        )}

        {/* VIEW 4: Games & Interactive Challenges */}
        {currentView === 'challenge' && activeChallengeId && (
          <div>{renderChallengeComponent()}</div>
        )}

        {/* VIEW 5: Student Progress & Portfolio */}
        {currentView === 'progress' && (
          <ProgressView
            user={user}
            progressList={progressList}
            achievements={achievements}
            pointsHistory={pointsHistory}
            language={language}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Footer - strictly respecting user instruction */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-extrabold text-slate-900 tracking-tight">Mundo TIC • 5.º Ano</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-medium text-slate-600">
              Website criado com recurso a Inteligência Artificial | Textos e conteúdos revistos pela professora
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentView('progress');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-600 font-semibold cursor-pointer transition-colors"
            >
              {t.navProgress}
            </button>
            <span>•</span>
            <span>{language === 'pt' ? '6 Temas de Aprendizagem' : '6 Learning Themes'}</span>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-indigo-950 text-white p-4 shadow-2xl border border-indigo-800/80 flex items-start gap-3.5 max-w-sm animate-in slide-in-from-bottom-5">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-white">{toastMessage.title}</p>
            {toastMessage.subtitle && (
              <p className="text-xs text-indigo-200 mt-0.5 leading-snug">{toastMessage.subtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        language={language}
      />

      {/* Class & Student Leaderboard Modal */}
      <LeaderboardModal
        isOpen={leaderboardModalOpen}
        onClose={() => setLeaderboardModalOpen(false)}
        currentUser={user}
        language={language}
      />

      {/* Teacher / Admin Reserved Area Modal */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        currentUser={user}
        language={language}
      />
    </div>
  );
}
