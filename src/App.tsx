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
import { ErgonomicsPostureGame } from './components/games/ErgonomicsPostureGame';
import { ErgonomicsTrueFalseGame } from './components/games/ErgonomicsTrueFalseGame';
import { TicWhatIsTechGame } from './components/games/TicWhatIsTechGame';
import { TicCyberbullyingGame } from './components/games/TicCyberbullyingGame';
import { TicDigitalFootprintGame } from './components/games/TicDigitalFootprintGame';
import { DigitalDetectivesGame } from './components/games/DigitalDetectivesGame';
import { PlanetDigitalMissionGame } from './components/games/PlanetDigitalMissionGame';
import { GenericChallengeGame } from './components/games/GenericChallengeGame';
import { GenericHtmlGameRunner } from './components/games/GenericHtmlGameRunner';

import { api, isUserAdmin, DEFAULT_THEME_VISIBILITY, DEFAULT_QUIZ_VISIBILITY } from './services/api';
import { User, ActivityProgress, UserAchievement, PointTransaction, Language, ThemeVisibilityMap, QuizVisibilityMap } from './types';
import { ALL_THEMES } from './data/allThemesData';
import { translations } from './i18n/translations';
import { Sparkles, Lock, ArrowLeft } from 'lucide-react';

type ViewMode = 'dashboard' | 'theme' | 'module' | 'challenge' | 'progress';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [progressList, setProgressList] = useState<ActivityProgress[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointTransaction[]>([]);
  const [language, setLanguage] = useState<Language>('pt');

  // Theme & Quiz Visibility State
  const [themeVisibility, setThemeVisibility] = useState<ThemeVisibilityMap>(DEFAULT_THEME_VISIBILITY);
  const [quizVisibility, setQuizVisibility] = useState<QuizVisibilityMap>(DEFAULT_QUIZ_VISIBILITY);

  // Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [activeThemeId, setActiveThemeId] = useState<string>('tic-sociedade');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const [activeThemeTab, setActiveThemeTab] = useState<'content' | 'games'>('content');

  const returnToGames = () => {
    setActiveThemeTab('games');
    setCurrentView('theme');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals & Notifications
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'students' | 'turmas' | 'themes' | 'danger'>('students');
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle?: string } | null>(null);

  const t = translations[language];
  const isAdmin = user ? isUserAdmin(user.email, user.role) : false;

  // Helper to resolve theme by id or legacy name
  const resolveTheme = (idOrAlias: string) => {
    if (idOrAlias === 'theme1' || idOrAlias === 'correio-eletronico') {
      return ALL_THEMES.find((th) => th.id === 'correio-eletronico') || ALL_THEMES[0];
    }
    if (idOrAlias === 'theme2' || idOrAlias === 'tic-sociedade') {
      return ALL_THEMES.find((th) => th.id === 'tic-sociedade') || ALL_THEMES[1];
    }
    if (idOrAlias === 'theme3' || idOrAlias === 'ergonomia') {
      return ALL_THEMES.find((th) => th.id === 'ergonomia') || ALL_THEMES[2];
    }
    if (idOrAlias === 'theme4' || idOrAlias === 'seguranca' || idOrAlias === 'seguranca-digital') {
      return ALL_THEMES.find((th) => th.id === 'seguranca') || ALL_THEMES[3];
    }
    if (idOrAlias === 'theme5' || idOrAlias === 'palavras-passe') {
      return ALL_THEMES.find((th) => th.id === 'palavras-passe') || ALL_THEMES[4];
    }
    if (idOrAlias === 'theme6' || idOrAlias === 'navegar-internet' || idOrAlias === 'pesquisa-informacao') {
      return ALL_THEMES.find((th) => th.id === 'navegar-internet') || ALL_THEMES[5];
    }
    if (idOrAlias === 'theme7' || idOrAlias === 'direitos-autor' || idOrAlias === 'referencias-fontes' || idOrAlias === 'referencias-bibliograficas') {
      return ALL_THEMES.find((th) => th.id === 'direitos-autor') || ALL_THEMES[6];
    }
    const found = ALL_THEMES.find((th) => th.id === idOrAlias);
    return found || ALL_THEMES[0];
  };

  const currentTheme = resolveTheme(activeThemeId);

  // All modules across all themes
  const allModules = ALL_THEMES.flatMap((th) => th.modules);
  const currentModule = activeModuleId ? allModules.find((m) => m.id === activeModuleId) : null;

  // Auto-load session and theme visibility on mount, and listen to real-time changes
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

    // Load initial theme & quiz visibility
    async function loadVisibility() {
      try {
        const map = await api.getThemeVisibility();
        setThemeVisibility(map);
      } catch {
        // fallback to default
      }

      try {
        const qMap = await api.getQuizVisibility();
        setQuizVisibility(qMap);
      } catch {
        // fallback to default
      }
    }
    loadVisibility();

    // Real-time theme & quiz visibility sync listener across all connected devices
    const unsubVisibility = api.onThemeVisibilityChange((newMap) => {
      setThemeVisibility(newMap);
    });

    const unsubQuizVisibility = api.onQuizVisibilityChange((newMap) => {
      setQuizVisibility(newMap);
    });

    // Firebase Auth listener
    const unsubscribeAuth = api.onAuthChange(async (firebaseLoggedUser) => {
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
      } else {
        setUser(null);
        setProgressList([]);
        setAchievements([]);
        setPointsHistory([]);
      }
    });

    return () => {
      if (typeof unsubVisibility === 'function') unsubVisibility();
      if (typeof unsubQuizVisibility === 'function') unsubQuizVisibility();
      if (typeof unsubscribeAuth === 'function') unsubscribeAuth();
    };
  }, []);

  // If active theme is locked and user is a student, automatically return to dashboard
  useEffect(() => {
    if (!isAdmin && currentView === 'theme' && themeVisibility[currentTheme.id] === false) {
      setCurrentView('dashboard');
    }
  }, [isAdmin, currentView, currentTheme.id, themeVisibility]);

  const handleToggleThemeVisibility = async (themeId: string) => {
    try {
      const res = await api.toggleThemeVisibility(themeId);
      const nextMap = res.visibility;
      setThemeVisibility(nextMap);
      const isNowVisible = nextMap[themeId] !== false;
      const th = ALL_THEMES.find((t) => t.id === themeId);
      const thTitle = th ? `Tema ${th.number}: ${th.title[language]}` : themeId;
      showToast(
        isNowVisible
          ? (language === 'pt' ? `✅ ${thTitle} agora VISÍVEL para alunos!` : `✅ ${thTitle} is now visible to students!`)
          : (language === 'pt' ? `🔒 ${thTitle} agora OCULTO / BLOQUEADO para alunos.` : `🔒 ${thTitle} is now hidden for students.`)
      );
    } catch (err: any) {
      showToast('Erro', err?.message || 'Erro ao alterar visibilidade.');
    }
  };

  const handleToggleQuizVisibility = async (themeId: string) => {
    try {
      const res = await api.toggleQuizVisibility(themeId);
      const nextMap = res.visibility;
      setQuizVisibility(nextMap);
      const isNowVisible = nextMap[themeId] === true;
      const th = ALL_THEMES.find((t) => t.id === themeId);
      const thTitle = th ? `Tema ${th.number}: ${th.title[language]}` : themeId;
      showToast(
        isNowVisible
          ? (language === 'pt' ? `🏆 Quiz do ${thTitle} agora VISÍVEL para alunos!` : `🏆 Quiz of ${thTitle} is now visible to students!`)
          : (language === 'pt' ? `🔒 Quiz do ${thTitle} agora OCULTO para alunos.` : `🔒 Quiz of ${thTitle} is now hidden for students.`)
      );
    } catch (err: any) {
      showToast('Erro', err?.message || 'Erro ao alterar visibilidade do quiz.');
    }
  };

  const handleOpenAdminWithTab = (tab: 'students' | 'turmas' | 'themes' | 'danger') => {
    setAdminInitialTab(tab);
    setAdminModalOpen(true);
  };

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
              ? `Ganhaste ${newBadgesCount} nova(s) medalha(s). Consulta no teu progresso!`
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
    setActiveThemeTab('content');
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
      const existingQuizProgress = progressList.find((p) => p.activityId === activeChallengeId);
      return (
        <FinalQuizView
          themeTitle={currentTheme.title[language]}
          themeNumber={currentTheme.number}
          questions={currentTheme.finalQuiz}
          language={language}
          existingProgress={existingQuizProgress}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'quiz',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore: 100,
              percentage,
              activityTitle: `${language === 'pt' ? 'Quiz de Aprendizagem:' : 'Learning Quiz:'} ${currentTheme.title[language]}`,
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
          onBack={returnToGames}
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
          onBack={returnToGames}
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
          onBack={returnToGames}
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
          onBack={returnToGames}
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

    if (
      activeChallengeId === 'desafio-escrever-email' ||
      activeChallengeId === 'jogo-email-order' ||
      activeChallengeId === 'desafio-email'
    ) {
      return (
        <EmailLabGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Constrói um email' : 'Build an Email',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-organizar-inbox') {
      return (
        <InboxSortingGame
          language={language}
          onBack={returnToGames}
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
          onBack={returnToGames}
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
          onBack={returnToGames}
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
          onBack={returnToGames}
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
          onBack={returnToGames}
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
          onBack={returnToGames}
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

    if (activeChallengeId === 'desafio-corrige-postura') {
      return (
        <ErgonomicsPostureGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-corrige-postura',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Simulador: Corrige a Postura do Aluno!' : 'Simulator: Fix the Student Posture!',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'jogo-ergo-tf' || activeChallengeId === 'desafio-ergo-tf') {
      return (
        <ErgonomicsTrueFalseGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Postura e Hábitos: Verdadeiro ou Falso?' : 'Posture and Habits: True or False?',
            });
          }}
        />
      );
    }

    // Theme 1 Specific Games
    if (activeChallengeId === 'desafio-tic-o-que-e') {
      return (
        <TicWhatIsTechGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-tic-o-que-e',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'É uma TIC? & Que Tecnologia Ajuda?' : 'Is it ICT? & Which Tech Helps?',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-detetives-digitais') {
      return (
        <DigitalDetectivesGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-detetives-digitais',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? '🔎 Detetives Digitais (Vantagens e Desafios)' : '🔎 Digital Detectives (Advantages & Challenges)',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-missao-planeta-digital') {
      return (
        <PlanetDigitalMissionGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-missao-planeta-digital',
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? '🌍 Missão Planeta Digital (Tecnologia e Ambiente)' : '🌍 Planet Digital Mission (Tech & Environment)',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-tic-seguranca-cyberbullying') {
      return (
        <TicCyberbullyingGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-tic-seguranca-cyberbullying',
              activityType: 'challenge',
              themeId: currentTheme?.id || 'seguranca',
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Guardião Digital: Cyberbullying (5 Passos)' : 'Digital Guardian: Cyberbullying (5 Steps)',
            });
          }}
        />
      );
    }

    if (activeChallengeId === 'desafio-tic-pegada-ecra-lixo') {
      return (
        <TicDigitalFootprintGame
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: 'desafio-tic-pegada-ecra-lixo',
              activityType: 'challenge',
              themeId: currentTheme?.id || 'seguranca',
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: language === 'pt' ? 'Publicarias Isto?' : 'Would You Post This?',
            });
          }}
        />
      );
    }

    // If challenge has structured gameData (TF, MC, Match, Order, etc.)
    const activeChallengeItem = currentTheme.challenges.find((c) => c.id === activeChallengeId);
    if (activeChallengeItem?.gameData) {
      return (
        <GenericHtmlGameRunner
          gameData={activeChallengeItem.gameData}
          language={language}
          onBack={returnToGames}
          onFinish={(score, maxScore, percentage) => {
            handleSaveProgress({
              activityId: activeChallengeId,
              activityType: 'challenge',
              themeId: currentTheme.id,
              status: 'completed',
              score,
              maxScore,
              percentage,
              activityTitle: activeChallengeItem.title[language],
            });
          }}
        />
      );
    }

    // Default Interactive Generic Game for any other challenge across the 7 themes
    return (
      <GenericChallengeGame
        challengeId={activeChallengeId}
        language={language}
        onBack={returnToGames}
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

  const handleOpenLeaderboard = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      setLeaderboardModalOpen(true);
    }
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
        onOpenLeaderboard={handleOpenLeaderboard}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onLogout={handleLogout}
        onUpdateUser={(updatedUser) => setUser(updatedUser)}
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
            themeVisibility={themeVisibility}
            onNavigateTheme={navigateToTheme}
            onNavigateProgress={() => {
              setCurrentView('progress');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenAdmin={() => handleOpenAdminWithTab('students')}
            onOpenAdminWithTab={handleOpenAdminWithTab}
            onToggleThemeVisibility={handleToggleThemeVisibility}
            onOpenLeaderboard={handleOpenLeaderboard}
            onPointsAwarded={(updatedUser, _updatedPoints, updatedAchievements) => {
              if (updatedUser) {
                setUser(updatedUser);
              }
              if (updatedAchievements && updatedAchievements.length > 0) {
                setAchievements(updatedAchievements);
              }
              setToastMessage({
                title: language === 'pt' ? '🎉 Dica do Dia Concluída!' : '🎉 Daily Tip Completed!',
                subtitle:
                  language === 'pt'
                    ? 'Pontos creditados com sucesso no teu perfil!'
                    : 'Points credited successfully to your profile!',
              });
              setTimeout(() => setToastMessage(null), 4000);
            }}
          />
        )}

        {/* VIEW 2: Dynamic Theme Overview for all 7 Themes */}
        {currentView === 'theme' && (
          !isAdmin && themeVisibility[currentTheme.id] === false ? null : (
            <ThemeView
              theme={currentTheme}
              progressList={progressList}
              language={language}
              initialTab={activeThemeTab}
              isAdmin={isAdmin}
              isLockedForStudents={themeVisibility[currentTheme.id] === false}
              quizVisibility={quizVisibility}
              onToggleVisibility={handleToggleThemeVisibility}
              onToggleQuizVisibility={handleToggleQuizVisibility}
              onBack={() => {
                setCurrentView('dashboard');
                setActiveThemeTab('content');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenModule={(modId) => {
                setActiveModuleId(modId);
                setCurrentView('module');
                setActiveThemeTab('content');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenChallenge={(chalId) => {
                const isFinalQuiz = chalId.startsWith('quiz-final') || currentTheme.finalQuiz.some((q) => q.id.includes(chalId));
                if (isFinalQuiz && !isAdmin && quizVisibility[currentTheme.id] !== true) {
                  showToast(
                    language === 'pt' ? '🔒 Quiz Oculto' : '🔒 Quiz Hidden',
                    language === 'pt' ? 'Este quiz de aprendizagem está temporariamente oculto pela professora.' : 'This quiz is currently hidden by the teacher.'
                  );
                  return;
                }
                setActiveChallengeId(chalId);
                setCurrentView('challenge');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
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

      {/* Footer - strictly matching screenshot layout */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Left Block */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              TIC 5 — Descomplica!
            </span>
            <span className="text-xs text-slate-500 mt-0.5">
              {t.footerAiDisclaimer}
            </span>
          </div>

          {/* Right Block */}
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
            <span className="text-xs text-slate-600">
              {t.footerReviewedBy}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
              {t.footerCopyright}
            </span>
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

      {/* Class & Student Leaderboard Modal - only when logged in */}
      {user && (
        <LeaderboardModal
          isOpen={leaderboardModalOpen}
          onClose={() => setLeaderboardModalOpen(false)}
          currentUser={user}
          language={language}
        />
      )}

      {/* Teacher / Admin Reserved Area Modal */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        currentUser={user}
        language={language}
        initialTab={adminInitialTab}
      />
    </div>
  );
}
