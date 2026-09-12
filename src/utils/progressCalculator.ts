import { User, ActivityProgress, ThemeDefinition, ChallengeItem } from '../types';
import { ALL_THEMES } from '../data/allThemesData';

export interface ChallengeScoreDetail {
  id: string;
  title: string;
  score: number; // 0 to 100
  completed: boolean;
  attempts: number;
}

export interface QuizScoreDetail {
  id: string;
  title: string;
  officialScore: number; // 1.ª tentativa oficial (0 to 100)
  bestScore: number; // melhor nota para treino/exibição (0 to 100)
  attempts: number;
  completed: boolean;
}

export interface StudentThemeBreakdown {
  theme: ThemeDefinition;
  challenges: ChallengeScoreDetail[];
  quiz: QuizScoreDetail;
  completedChallengesCount: number;
  totalChallengesCount: number;
  quizCompleted: boolean;
  completedActivitiesCount: number;
  totalActivitiesCount: number;
  totalPoints: number; // Soma dos desafios + nota oficial do quiz
  maxPoints: number; // totalActivitiesCount * 100
  percentage: number; // Math.round((totalPoints / maxPoints) * 100)
  isFullyCompleted: boolean;
}

export interface GlobalActivityStats {
  totalActivities: number;
  totalChallenges: number;
  totalQuizzes: number;
  globalMaxPoints: number;
  completedActivities: number;
  completedChallenges: number;
  completedQuizzes: number;
  totalCurricularPoints: number;
  globalPercentage: number;
  activityCompletionPercentage: number;
  bonusPoints: number;
  totalPoints: number;
  themeBreakdowns: StudentThemeBreakdown[];
}

/**
 * Retorna os desafios regulares de um tema (exclui o quiz final)
 */
export function getThemeRegularChallenges(theme: ThemeDefinition): ChallengeItem[] {
  if (!theme || !theme.challenges) return [];
  return theme.challenges.filter((c) => c.type !== 'final_quiz');
}

/**
 * Retorna o Quiz Final de um tema, se existir
 */
export function getThemeQuiz(theme: ThemeDefinition): ChallengeItem | undefined {
  if (!theme || !theme.challenges) return undefined;
  return theme.challenges.find((c) => c.type === 'final_quiz');
}

/**
 * Retorna todas as atividades avaliáveis do tema (desafios regulares + quiz)
 */
export function getThemeActivities(theme: ThemeDefinition): ChallengeItem[] {
  if (!theme || !theme.challenges) return [];
  return theme.challenges;
}

/**
 * Contagem total dinâmica de atividades de um tema (desafios regulares + quiz)
 */
export function getThemeActivityCount(theme: ThemeDefinition): number {
  if (!theme || !theme.challenges) return 0;
  const regular = getThemeRegularChallenges(theme);
  const quiz = getThemeQuiz(theme);
  return regular.length + (quiz ? 1 : 0);
}

/**
 * Pontuação máxima curricular de um tema (cada atividade vale 100 XP)
 */
export function getThemeMaxPoints(theme: ThemeDefinition): number {
  return getThemeActivityCount(theme) * 100;
}

/**
 * Contagem total dinâmica de desafios regulares em todos os temas
 */
export function getTotalChallengesCount(themes: ThemeDefinition[] = ALL_THEMES): number {
  return themes.reduce((acc, t) => acc + getThemeRegularChallenges(t).length, 0);
}

/**
 * Contagem total dinâmica de quizzes em todos os temas
 */
export function getTotalQuizzesCount(themes: ThemeDefinition[] = ALL_THEMES): number {
  return themes.reduce((acc, t) => acc + (getThemeQuiz(t) ? 1 : 0), 0);
}

/**
 * Contagem total dinâmica de todas as atividades avaliáveis da plataforma
 */
export function getTotalActivitiesCount(themes: ThemeDefinition[] = ALL_THEMES): number {
  return themes.reduce((acc, t) => acc + getThemeActivityCount(t), 0);
}

/**
 * Pontuação máxima curricular global dinâmica (total de atividades * 100 XP)
 */
export function getGlobalCurricularMaxPoints(themes: ThemeDefinition[] = ALL_THEMES): number {
  return getTotalActivitiesCount(themes) * 100;
}

/**
 * Determina se um registo de progresso é um Quiz
 */
export function isQuizRecord(record: ActivityProgress, theme?: ThemeDefinition): boolean {
  if (!record) return false;
  if (record.activityType === 'quiz') return true;

  const actId = (record.activityId || '').toLowerCase();
  if (actId.startsWith('quiz-final') || actId.includes('final_quiz') || actId.includes('quiz-final-tema')) {
    return true;
  }

  if (theme) {
    const themeQuiz = getThemeQuiz(theme);
    if (themeQuiz && record.activityId === themeQuiz.id) return true;
  }

  return false;
}

/**
 * Procura o registo de Quiz correspondente a um determinado tema com resolução de aliases
 */
export function findThemeQuizRecord(
  progressList: ActivityProgress[],
  theme: ThemeDefinition
): ActivityProgress | undefined {
  if (!progressList || progressList.length === 0) return undefined;

  const catalogQuiz = getThemeQuiz(theme);
  const expectedQuizId = catalogQuiz?.id;

  // 1. Procura por correspondência exata de ID de catálogo
  if (expectedQuizId) {
    const directMatch = progressList.find((p) => p.activityId === expectedQuizId);
    if (directMatch) return directMatch;
  }

  // 2. Procura por registo com activityType === 'quiz' associado ao tema
  const typeMatch = progressList.find(
    (p) =>
      p.activityType === 'quiz' &&
      (p.themeId === theme.id || p.themeId === String(theme.number))
  );
  if (typeMatch) return typeMatch;

  // 3. Procura por aliases históricos comuns
  const aliasCandidates: string[] = [];
  aliasCandidates.push(`quiz-final-tema${theme.number}`);

  if (theme.id === 'correio-eletronico') {
    aliasCandidates.push('quiz-final-tema5', 'quiz-final-correio');
  } else if (theme.id === 'tic-sociedade') {
    aliasCandidates.push('quiz-final-tema1', 'quiz-final-tic');
  } else if (theme.id === 'ergonomia') {
    aliasCandidates.push('quiz-final-tema2', 'quiz-final-ergo');
  } else if (theme.id === 'seguranca') {
    aliasCandidates.push('quiz-final-seguranca', 'quiz-final-tema3');
  } else if (theme.id === 'palavras-passe') {
    aliasCandidates.push('quiz-final-tema3', 'quiz-final-tema4', 'quiz-final-passe');
  } else if (theme.id === 'navegar-internet') {
    aliasCandidates.push('quiz-final-tema6', 'quiz-final-net');
  } else if (theme.id === 'direitos-autor') {
    aliasCandidates.push('quiz-final-tema7', 'quiz-final-copy');
  }

  for (const alias of aliasCandidates) {
    const matched = progressList.find((p) => {
      if (p.activityId !== alias) return false;
      // Se houver themeId no registo, validar se não pertence a outro tema
      if (p.themeId && p.themeId !== theme.id && p.themeId !== String(theme.number)) {
        // Se o registo tiver explicitamente outro themeId, ignorar
        const belongsToOther = ALL_THEMES.some(
          (other) => other.id !== theme.id && (p.themeId === other.id || p.themeId === String(other.number))
        );
        if (belongsToOther) return false;
      }
      return true;
    });
    if (matched) return matched;
  }

  return undefined;
}

/**
 * Calcula o detalhe estruturado e métricas de um aluno para um determinado tema
 * FONTE ÚNICA DE VERDADE para aluno, professora, pautas, XLSX, CSV e gráficos
 */
export function getStudentThemeBreakdown(
  student: User | { id?: string; email?: string; points?: number; turma?: string; name?: string; publicId?: string },
  studentProgress: ActivityProgress[],
  theme: ThemeDefinition
): StudentThemeBreakdown {
  const regularChallenges = getThemeRegularChallenges(theme);
  const quizChallenge = getThemeQuiz(theme);

  // 1. Processar Desafios Regulares
  const challenges: ChallengeScoreDetail[] = regularChallenges.map((c) => {
    // Procura por ID exato ou variantes comuns
    const record = studentProgress.find(
      (p) =>
        p.activityId === c.id ||
        p.activityId === c.id.replace('desafio-', 'jogo-') ||
        p.activityId === c.id.replace('jogo-', 'desafio-')
    );

    const rawScore = record
      ? (record.bestScore ?? record.score ?? (record.percentage !== undefined ? record.percentage : (record.bestPercentage ?? 0)))
      : 0;
    const score = Math.max(0, Math.min(100, Math.round(Number(rawScore) || 0)));
    const completed = record?.status === 'completed' || score > 0;
    const attempts = record?.attempts ?? (completed ? 1 : 0);

    return {
      id: c.id,
      title: c.title.pt,
      score,
      completed,
      attempts,
    };
  });

  // 2. Processar Quiz Final
  const quizRecord = findThemeQuizRecord(studentProgress, theme);
  const expectedQuizId = quizChallenge?.id || `quiz-final-tema${theme.number}`;
  const quizTitle = quizChallenge?.title?.pt || `Quiz Final: ${theme.title.pt}`;

  // REGRA DA NOTA OFICIAL: 1.ª TENTATIVA
  let officialScore = 0;
  let bestScore = 0;
  let quizAttempts = 0;
  let quizCompleted = false;

  if (quizRecord) {
    const rawOfficial =
      quizRecord.firstAttemptScore ??
      quizRecord.score ??
      quizRecord.firstAttemptPercentage ??
      quizRecord.percentage ??
      quizRecord.bestScore ??
      0;
    officialScore = Math.max(0, Math.min(100, Math.round(Number(rawOfficial) || 0)));

    const rawBest =
      quizRecord.bestScore ??
      quizRecord.score ??
      quizRecord.bestPercentage ??
      officialScore;
    bestScore = Math.max(0, Math.min(100, Math.round(Number(rawBest) || 0)));

    quizAttempts = quizRecord.attempts ?? (officialScore > 0 ? 1 : 0);
    quizCompleted = quizRecord.status === 'completed' || quizAttempts > 0 || officialScore > 0;
  }

  const quiz: QuizScoreDetail = {
    id: expectedQuizId,
    title: quizTitle,
    officialScore,
    bestScore,
    attempts: quizAttempts,
    completed: quizCompleted,
  };

  // 3. Cálculos Dinâmicos
  const challengePointsSum = challenges.reduce((acc, curr) => acc + curr.score, 0);
  const totalPoints = challengePointsSum + officialScore;

  const completedChallengesCount = challenges.filter((c) => c.completed).length;
  const totalChallengesCount = challenges.length;

  const completedActivitiesCount = completedChallengesCount + (quiz.completed ? 1 : 0);
  const totalActivitiesCount = challenges.length + (quizChallenge ? 1 : 0);

  const maxPoints = totalActivitiesCount * 100;
  const percentage = maxPoints > 0 ? Math.max(0, Math.min(100, Math.round((totalPoints / maxPoints) * 100))) : 0;
  const isFullyCompleted = totalActivitiesCount > 0 && completedActivitiesCount >= totalActivitiesCount;

  return {
    theme,
    challenges,
    quiz,
    completedChallengesCount,
    totalChallengesCount,
    quizCompleted: quiz.completed,
    completedActivitiesCount,
    totalActivitiesCount,
    totalPoints,
    maxPoints,
    percentage,
    isFullyCompleted,
  };
}

/**
 * Calcula todas as estatísticas globais de um aluno em toda a plataforma
 * FONTE ÚNICA DE VERDADE para painel de progresso, área da professora, rankings e relatórios
 */
export function getGlobalActivityStats(
  student: User | { id?: string; email?: string; points?: number; turma?: string; name?: string; publicId?: string },
  studentProgress: ActivityProgress[],
  themes: ThemeDefinition[] = ALL_THEMES
): GlobalActivityStats {
  const themeBreakdowns = themes.map((theme) => getStudentThemeBreakdown(student, studentProgress, theme));

  const totalActivities = getTotalActivitiesCount(themes);
  const totalChallenges = getTotalChallengesCount(themes);
  const totalQuizzes = getTotalQuizzesCount(themes);
  const globalMaxPoints = getGlobalCurricularMaxPoints(themes);

  const completedChallenges = themeBreakdowns.reduce((sum, b) => sum + b.completedChallengesCount, 0);
  const completedQuizzes = themeBreakdowns.reduce((sum, b) => sum + (b.quizCompleted ? 1 : 0), 0);
  const completedActivities = completedChallenges + completedQuizzes;

  const totalCurricularPoints = themeBreakdowns.reduce((sum, b) => sum + b.totalPoints, 0);
  const globalPercentage = globalMaxPoints > 0
    ? Math.max(0, Math.min(100, Math.round((totalCurricularPoints / globalMaxPoints) * 100)))
    : 0;

  const activityCompletionPercentage = totalActivities > 0
    ? Math.max(0, Math.min(100, Math.round((completedActivities / totalActivities) * 100)))
    : 0;

  const studentTotalPoints = student.points ?? 0;
  const bonusPoints = Math.max(0, studentTotalPoints - totalCurricularPoints);

  return {
    totalActivities,
    totalChallenges,
    totalQuizzes,
    globalMaxPoints,
    completedActivities,
    completedChallenges,
    completedQuizzes,
    totalCurricularPoints,
    globalPercentage,
    activityCompletionPercentage,
    bonusPoints,
    totalPoints: studentTotalPoints,
    themeBreakdowns,
  };
}
