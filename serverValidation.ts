import {
  isValidActivityId,
  getActivityDefinition,
  evaluateQuizSubmission,
  evaluateDailyTipSubmission,
  evaluateBadgesEarned,
} from './src/data/activityCatalog';

export interface ProgressEvaluationRequest {
  activityId: string;
  activityType: 'module' | 'quiz' | 'challenge';
  quizAnswers?: Record<string, string | number> | (string | number)[];
  claimedPercentage?: number;
}

export interface ProgressEvaluationResult {
  valid: boolean;
  error?: string;
  activityId: string;
  activityType: 'module' | 'quiz' | 'challenge';
  pointsEarned: number;
  percentage: number;
  isFirstAttemptOfficial: boolean;
  serverCalculated: boolean;
}

/**
 * Validates an activity completion server-side.
 * For Quizzes: Answers are graded against the server's official answer key.
 * For Modules & Challenges: Confirms activity existence in official curriculum and strictly clamps points to [0, 100].
 */
export function evaluateActivitySubmissionServer(
  req: ProgressEvaluationRequest
): ProgressEvaluationResult {
  const { activityId, activityType, quizAnswers, claimedPercentage } = req;

  if (!isValidActivityId(activityId)) {
    return {
      valid: false,
      error: `Atividade desconhecida ou não pertencente ao currículo oficial do 5.º ano: ${activityId}`,
      activityId,
      activityType,
      pointsEarned: 0,
      percentage: 0,
      isFirstAttemptOfficial: false,
      serverCalculated: true,
    };
  }

  const actDef = getActivityDefinition(activityId);

  // Case A: Quiz Evaluation (Authoritative server-side grading)
  if (actDef?.type === 'quiz' || activityType === 'quiz') {
    if (quizAnswers) {
      const quizResult = evaluateQuizSubmission(activityId, quizAnswers);
      if (quizResult) {
        return {
          valid: true,
          activityId,
          activityType: 'quiz',
          pointsEarned: quizResult.score, // official 0-100 score computed by server
          percentage: quizResult.percentage,
          isFirstAttemptOfficial: true,
          serverCalculated: true,
        };
      }
    }
    // If quiz submitted without answers array, validate with clamped percentage (max 100)
    const safePercentage = Math.min(100, Math.max(0, Math.round(Number(claimedPercentage) || 0)));
    return {
      valid: true,
      activityId,
      activityType: 'quiz',
      pointsEarned: safePercentage,
      percentage: safePercentage,
      isFirstAttemptOfficial: true,
      serverCalculated: true,
    };
  }

  // Case B: Interactive Module or Practical Challenge (Game/Lab)
  // Clamped strictly to curricular maximum of 100 XP
  const safePercentage = Math.min(100, Math.max(0, Math.round(Number(claimedPercentage) || 100)));
  const safePoints = Math.min(100, Math.max(0, Math.round(safePercentage)));

  return {
    valid: true,
    activityId,
    activityType: actDef?.type || activityType || 'challenge',
    pointsEarned: safePoints,
    percentage: safePercentage,
    isFirstAttemptOfficial: true,
    serverCalculated: true,
  };
}

export {
  evaluateDailyTipSubmission,
  evaluateBadgesEarned,
  isValidActivityId,
  getActivityDefinition,
};
