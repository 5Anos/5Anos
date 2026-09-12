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
  tipTitle: string;
} {
  const dateObj = new Date(dateStr);
  const isValidDate = !isNaN(dateObj.getTime());
  const tip = isValidDate ? getTodayDailyTip(dateObj) : ALL_366_DAILY_TIPS[0];

  const isCorrect = String(selectedOptionId).trim().toLowerCase() === String(tip.correctOptionId).trim().toLowerCase();
  // 50 points for correct answer, 25 points for participation
  const pointsToAward = isCorrect ? 50 : 25;

  return {
    isValidDate,
    isCorrect,
    pointsToAward,
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
