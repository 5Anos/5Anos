import { ALL_THEMES, THEMES_BY_ID } from './allThemesData';
import { BADGES } from './badgesData';
import { ALL_366_DAILY_TIPS, getTodayDailyTip } from './dailyTipsData';
import { QuizQuestion } from '../types';

export interface ValidatedActivity {
  id: string;
  themeId: string;
  title: string | { pt: string; en: string };
  type: 'module' | 'quiz' | 'challenge';
  maxPoints: number; // Always 100 max in 5th grade curriculum
  questionsCount?: number;
  questions?: QuizQuestion[];
}

// Build map of all legitimate activities from curriculum
const activitiesMap = new Map<string, ValidatedActivity>();
const quizQuestionsMap = new Map<string, QuizQuestion[]>();

for (const theme of ALL_THEMES) {
  // 1. Modules
  for (const mod of theme.modules || []) {
    activitiesMap.set(mod.id, {
      id: mod.id,
      themeId: theme.id,
      title: mod.title,
      type: 'module',
      maxPoints: 100,
    });
  }

  // 2. Challenges
  for (const chal of theme.challenges || []) {
    activitiesMap.set(chal.id, {
      id: chal.id,
      themeId: theme.id,
      title: chal.title,
      type: chal.type === 'final_quiz' || chal.id.startsWith('quiz-') ? 'quiz' : 'challenge',
      maxPoints: 100,
    });
  }

  // 3. Theme Final Quizzes
  if (theme.finalQuiz && theme.finalQuiz.length > 0) {
    const quizId = `quiz-final-${theme.id}`;
    activitiesMap.set(quizId, {
      id: quizId,
      themeId: theme.id,
      title: `Quiz de Aprendizagem - ${theme.title}`,
      type: 'quiz',
      maxPoints: 100,
      questionsCount: theme.finalQuiz.length,
      questions: theme.finalQuiz,
    });
    quizQuestionsMap.set(quizId, theme.finalQuiz);

    // Some theme challenges share quiz IDs (e.g. quiz-final-tema5, quiz-final-seguranca)
    for (const chal of theme.challenges || []) {
      if (chal.type === 'final_quiz' || chal.id.startsWith('quiz-')) {
        quizQuestionsMap.set(chal.id, theme.finalQuiz);
      }
    }
  }
}

// 4. Aliases & Specialized Challenge IDs used throughout the app
const challengeAliases: { id: string; themeId: string; title: string; type: 'challenge' | 'quiz' }[] = [
  { id: 'desafio-seguro-perigoso', themeId: 'seguranca', title: 'Seguro ou Perigoso?', type: 'challenge' },
  { id: 'jogo-ergo-seguro-incorreto', themeId: 'ergonomia', title: 'Ergonomia: Seguro ou Incorreto?', type: 'challenge' },
  { id: 'desafio-palavra-passe', themeId: 'palavras-passe', title: 'Laboratório da Palavra-passe', type: 'challenge' },
  { id: 'desafio-cofre-forte', themeId: 'palavras-passe', title: 'O Cofre-Forte Digital', type: 'challenge' },
  { id: 'desafio-detetive-phishing', themeId: 'seguranca', title: 'O Detetive de Phishing', type: 'challenge' },
  { id: 'desafio-o-que-farias', themeId: 'seguranca', title: 'O que farias?', type: 'challenge' },
  { id: 'desafio-escrever-email', themeId: 'correio-eletronico', title: 'Constrói um Email', type: 'challenge' },
  { id: 'desafio-email', themeId: 'correio-eletronico', title: 'Desafio do Email', type: 'challenge' },
  { id: 'desafio-organizar-inbox', themeId: 'correio-eletronico', title: 'O Organizador de Correio', type: 'challenge' },
  { id: 'desafio-cc-bcc', themeId: 'correio-eletronico', title: 'O Enigma do Cc e Bcc', type: 'challenge' },
  { id: 'desafio-palavras-chave', themeId: 'navegar-internet', title: 'O Mestre das Palavras-Chave', type: 'challenge' },
  { id: 'desafio-fontes-fiaveis', themeId: 'direitos-autor', title: 'O Detetive de Fontes Fiáveis', type: 'challenge' },
  { id: 'desafio-detetive-fontes-academicas', themeId: 'direitos-autor', title: 'Fontes Académicas e Fiáveis', type: 'challenge' },
  { id: 'desafio-misterio-aspas', themeId: 'navegar-internet', title: 'O Mistério das Aspas e Operadores', type: 'challenge' },
  { id: 'desafio-copiar-criar', themeId: 'direitos-autor', title: 'Copiar ou Criar? Direitos e Plágio', type: 'challenge' },
  { id: 'desafio-corrige-postura', themeId: 'ergonomia', title: 'Corrige a Postura do Aluno', type: 'challenge' },
  { id: 'desafio-ergo-tf', themeId: 'ergonomia', title: 'Postura e Hábitos: V ou F?', type: 'challenge' },
  { id: 'challenge-apa7-simulator-detective', themeId: 'direitos-autor', title: 'Desafio do Detetive APA 7', type: 'challenge' },
];

for (const alias of challengeAliases) {
  if (!activitiesMap.has(alias.id)) {
    activitiesMap.set(alias.id, {
      id: alias.id,
      themeId: alias.themeId,
      title: alias.title,
      type: alias.type,
      maxPoints: 100,
    });
  }
}

export function isValidActivityId(activityId: string): boolean {
  if (!activityId) return false;
  return activitiesMap.has(activityId);
}

export function getActivityDefinition(activityId: string): ValidatedActivity | undefined {
  return activitiesMap.get(activityId);
}

export function getQuizQuestionsForActivity(activityId: string): QuizQuestion[] | undefined {
  return quizQuestionsMap.get(activityId);
}

/**
 * Server-authoritative Quiz Grade calculation
 * Evaluates student submitted answer indices/IDs against the true answer keys stored in curriculum.
 * Returns exact score (0 - 100), correct count, and total questions.
 */
export function evaluateQuizSubmission(
  activityId: string,
  userAnswers: Record<string, string | number> | (string | number)[]
): {
  score: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
} | null {
  const questions = getQuizQuestionsForActivity(activityId);
  if (!questions || questions.length === 0) {
    return null;
  }

  let correctCount = 0;
  const total = questions.length;

  questions.forEach((q, idx) => {
    let studentAns: any;
    if (Array.isArray(userAnswers)) {
      studentAns = userAnswers[idx];
    } else {
      studentAns = userAnswers[q.id] ?? userAnswers[String(idx)];
    }

    if (studentAns === undefined || studentAns === null) return;

    // Check match against q.correctIndex or option text
    const correctIdx = typeof q.correctIndex === 'number' ? q.correctIndex : -1;
    const correctOptionPt = (q.options?.pt && correctIdx >= 0) ? q.options.pt[correctIdx] : '';

    let isMatch = false;

    // If client sent option text
    if (typeof studentAns === 'string' && correctOptionPt && studentAns.trim() === correctOptionPt.trim()) {
      isMatch = true;
    }
    // If client sent original index (when not shuffled or direct index)
    else if (typeof studentAns === 'number' && studentAns === correctIdx) {
      isMatch = true;
    }
    // If client sent option id / value
    else if ((q as any).correctOptionId && String(studentAns).trim() === String((q as any).correctOptionId).trim()) {
      isMatch = true;
    }

    if (isMatch) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / total) * 100);
  const score = percentage;

  return {
    score,
    percentage,
    correctAnswers: correctCount,
    totalQuestions: total,
    passed: percentage >= 50,
  };
}

/**
 * Server-authoritative Daily Tip Validation
 * Validates date and selected answer against official tip database
 */
export function evaluateDailyTipSubmission(
  dateStr: string,
  selectedOptionId: string
): {
  isValidDate: boolean;
  isCorrect: boolean;
  pointsToAward: number;
  readingPoints: number;
  answerPoints: number;
  totalPoints: number;
  tipTitle: string;
} {
  const dateObj = new Date(dateStr);
  const isValidDate = !isNaN(dateObj.getTime());
  const tip = isValidDate ? getTodayDailyTip(dateObj) : ALL_366_DAILY_TIPS[0];

  const isCorrect = String(selectedOptionId).trim().toLowerCase() === String(tip.correctOptionId).trim().toLowerCase();
  // Sistema de pontos: 20 XP pela leitura da dica + 30 XP se acertar na resposta
  const readingPoints = 20;
  const answerPoints = isCorrect ? 30 : 0;
  const totalPoints = readingPoints + answerPoints;

  return {
    isValidDate,
    isCorrect,
    pointsToAward: totalPoints,
    readingPoints,
    answerPoints,
    totalPoints,
    tipTitle: tip.title.pt,
  };
}

/**
 * Server-authoritative Badge evaluation based on validated progress records
 */
export function evaluateBadgesEarned(
  completedActivities: { activityId: string; points: number; percentage?: number }[],
  totalPoints: number,
  existingBadgeIds: string[]
): { newlyUnlockedBadges: typeof BADGES; totalBonusPoints: number } {
  const existingSet = new Set(existingBadgeIds);
  const newlyUnlocked: typeof BADGES = [];
  let totalBonus = 0;

  const completedSet = new Set(completedActivities.map((a) => a.activityId));

  for (const badge of BADGES) {
    if (existingSet.has(badge.id)) continue;

    let eligible = false;
    switch (badge.id) {
      case 'primeiros-passos':
        eligible = completedActivities.length >= 1;
        break;
      case 'guardiao-digital': {
        const segurancaTheme = THEMES_BY_ID['seguranca'];
        if (segurancaTheme) {
          const segChals = (segurancaTheme.challenges || []).map((c) => c.id);
          eligible = segChals.length > 0 && segChals.every((id) => completedSet.has(id));
        }
        break;
      }
      case 'especialista-seguranca': {
        eligible = completedActivities.some(
          (a) => (a.activityId.includes('seguranca') || a.activityId.includes('tema4')) && (a.percentage || a.points) >= 90
        );
        break;
      }
      case 'detetive-cibernetico': {
        eligible = completedSet.has('desafio-phishing') || completedSet.has('desafio-detetives-digitais') || completedSet.has('phishing-detector');
        break;
      }
      case 'mestre-email': {
        const emailTheme = THEMES_BY_ID['correio-eletronico'];
        if (emailTheme) {
          const emailChals = (emailTheme.challenges || []).map((c) => c.id);
          eligible = emailChals.length > 0 && emailChals.every((id) => completedSet.has(id));
        }
        break;
      }
      case 'detetive-informacao': {
        const navTheme = THEMES_BY_ID['navegar-internet'];
        if (navTheme) {
          const navChals = (navTheme.challenges || []).map((c) => c.id);
          eligible = navChals.length > 0 && navChals.every((id) => completedSet.has(id));
        }
        break;
      }
      case 'mestre-pesquisa': {
        eligible = completedActivities.some(
          (a) => (a.activityId.includes('navegar') || a.activityId.includes('pesquisa') || a.activityId.includes('tema6')) && (a.percentage || a.points) >= 90
        );
        break;
      }
      case 'centuriao-pontos':
        eligible = totalPoints >= 500;
        break;
      case 'tic-explorer':
        eligible = completedActivities.length >= 25;
        break;
      default:
        eligible = false;
        break;
    }

    if (eligible) {
      newlyUnlocked.push(badge);
      totalBonus += badge.pointsBonus;
    }
  }

  return { newlyUnlockedBadges: newlyUnlocked, totalBonusPoints: totalBonus };
}
