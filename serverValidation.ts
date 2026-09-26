import {
  isValidActivityId,
  getActivityDefinition,
  evaluateQuizSubmission,
  getQuizQuestionsForActivity,
  evaluateDailyTipSubmission,
  evaluateBadgesEarned,
} from './src/data/activityCatalog';
import { ALL_THEMES, THEMES_BY_ID } from './src/data/allThemesData';

export interface ProgressEvaluationRequest {
  activityId: string;
  activityType?: 'module' | 'quiz' | 'challenge';
  quizAnswers?: Record<string, string | number> | (string | number)[];
  submissionData?: any;
  answers?: any;
  puzzleOrder?: number[];
  completedSteps?: number[];
  claimedPercentage?: number;
  score?: number;
  percentage?: number;
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
 * Server-authoritative evaluators for specific challenges in the 5th Grade Curriculum
 */
const challengeEvaluators: Record<string, (req: ProgressEvaluationRequest) => { percentage: number; valid: boolean; error?: string }> = {
  // 1. Citation Simulator APA 7 Detective
  'challenge-apa7-simulator-detective': (req) => {
    const order = req.puzzleOrder || req.submissionData?.puzzleOrder || req.answers?.puzzleOrder;
    if (!Array.isArray(order) || order.length !== 5) {
      return { valid: false, percentage: 0, error: 'Submissão incompleta do desafio APA 7: ordem das 5 peças é obrigatória.' };
    }
    const expected = [1, 2, 3, 4, 5];
    const isCorrect = order.every((val, idx) => Number(val) === expected[idx]);
    return { valid: true, percentage: isCorrect ? 100 : 0 };
  },

  // 2. Safe or Dangerous Dilemmas (Tema 4 / Tema 3)
  'desafio-seguro-perigoso': (req) => {
    const answers = req.answers || req.submissionData?.answers || req.quizAnswers;
    if (!answers || typeof answers !== 'object') {
      return { valid: false, percentage: 0, error: 'Respostas das situações de segurança necessárias para avaliação.' };
    }
    // 6 Scenarios: correct choices
    const correctMap: Record<number | string, string> = {
      1: 'opt1_safe',
      2: 'opt2_safe',
      3: 'opt3_safe',
      4: 'opt4_safe',
      5: 'opt5_safe',
      6: 'opt6_safe',
    };
    let correct = 0;
    const total = 6;
    for (let i = 1; i <= total; i++) {
      const ans = (answers as any)[i] ?? (answers as any)[`scenario_${i}`] ?? (answers as any)[String(i)];
      if (ans === correctMap[i] || ans === true || ans === 0) correct++;
    }
    const pct = Math.round((correct / total) * 100);
    return { valid: true, percentage: pct };
  },

  'jogo-ergo-seguro-incorreto': (req) => {
    return challengeEvaluators['desafio-seguro-perigoso'](req);
  },

  // 3. Password Lab & Sharing Dilemmas (Tema 5)
  'desafio-palavra-passe': (req) => {
    const sub = req.submissionData || req.answers || {};
    const words = sub.selectedWords || sub.words || [];
    const dilemmas = sub.dilemmaAnswers || sub.dilemmas || sub.answers || [];
    
    // Check passphrase creation (>=3 word bricks or >= 12 length)
    const hasValidPassphrase = Array.isArray(words) && (words.length >= 3 || words.join('-').length >= 10);
    
    // Check 4 dilemmas (index 0 is correct for all 4 in Dilemmas)
    let correctDilemmas = 0;
    const totalDilemmas = 4;
    if (Array.isArray(dilemmas)) {
      dilemmas.forEach((ans: any) => {
        if (ans === 0 || ans === true) correctDilemmas++;
      });
    } else if (typeof dilemmas === 'object') {
      Object.values(dilemmas).forEach((ans: any) => {
        if (ans === 0 || ans === true) correctDilemmas++;
      });
    }

    if (!hasValidPassphrase && correctDilemmas === 0) {
      return { valid: false, percentage: 0, error: 'Dados de construção de palavra-passe ou respostas dos dilemas inválidos.' };
    }

    const passScore = hasValidPassphrase ? 1 : 0;
    const pct = Math.round(((passScore + correctDilemmas) / (1 + totalDilemmas)) * 100);
    return { valid: true, percentage: Math.min(100, Math.max(0, pct)) };
  },

  'desafio-cofre-forte': (req) => {
    return challengeEvaluators['desafio-palavra-passe'](req);
  },

  // 4. Phishing Detective (Tema 4)
  'desafio-detetive-phishing': (req) => {
    const sub = req.submissionData || req.answers || {};
    const clues = sub.revealedClues || sub.clues || [];
    const radar = sub.radarScores || sub.radarAnswers || sub.radar || [];
    
    const cluesCount = Array.isArray(clues) ? Math.min(4, clues.length) : 0;
    let radarCorrect = 0;
    const radarTotal = 5; // 5 radar items
    if (Array.isArray(radar)) {
      radar.forEach((r: any) => { if (r === true || r === 1) radarCorrect++; });
    }

    if (cluesCount === 0 && radarCorrect === 0) {
      if (req.percentage !== undefined || req.score !== undefined) {
        const safePct = Math.min(100, Math.max(0, Math.round(Number(req.percentage ?? req.score ?? 0))));
        return { valid: true, percentage: safePct };
      }
      return { valid: false, percentage: 0, error: 'Pistas e radar de phishing em falta ou inválidos.' };
    }

    const cluesPct = (cluesCount / 4) * 50;
    const radarPct = (radarCorrect / radarTotal) * 50;
    const totalPct = Math.round(cluesPct + radarPct);
    return { valid: true, percentage: Math.min(100, Math.max(0, totalPct)) };
  },

  // 5. What Would You Do (Tema 4)
  'desafio-o-que-farias': (req) => {
    const answers = req.answers || req.submissionData?.answers || req.quizAnswers;
    if (!answers) {
      return { valid: false, percentage: 0, error: 'Respostas dos dilemas de cidadania digital necessárias.' };
    }
    const total = 5;
    let correct = 0;
    if (Array.isArray(answers)) {
      answers.forEach((ans) => { if (ans === 0 || ans === true || ans === 'safe') correct++; });
    } else if (typeof answers === 'object') {
      Object.values(answers).forEach((ans) => { if (ans === 0 || ans === true || ans === 'safe') correct++; });
    }
    const pct = Math.round((correct / total) * 100);
    return { valid: true, percentage: pct };
  },

  // 6. Email Construction Lab (Tema 1)
  'desafio-escrever-email': (req) => {
    const sub = req.submissionData || req.answers || {};
    if (sub.percentage !== undefined || sub.score !== undefined) {
      const pct = Math.min(100, Math.max(0, Math.round(Number(sub.percentage ?? sub.score ?? 0))));
      return { valid: true, percentage: pct };
    }
    const parts = sub.emailParts || sub.orderedParts || sub.answers;
    if (Array.isArray(parts) && parts.length > 0) {
      const validSlots = ['to', 'cc', 'subject', 'body', 'attachment'];
      const correctParts = parts.filter((p: any) => validSlots.includes(p) || p?.isCorrect).length;
      const pct = Math.round((correctParts / validSlots.length) * 100);
      return { valid: true, percentage: pct };
    }
    return { valid: false, percentage: 0, error: 'Dados da construção do email em falta ou incompletos.' };
  },
  'desafio-email': (req) => challengeEvaluators['desafio-escrever-email'](req),
  'jogo-email-order': (req) => challengeEvaluators['desafio-escrever-email'](req),

  // 7. Mailbox Organizer (Tema 1)
  'desafio-organizar-inbox': (req) => {
    const sub = req.submissionData || req.answers || {};
    const sorted = Number(sub.sortedCount ?? (Array.isArray(sub.classified) ? sub.classified.length : 0));
    const total = 6;
    const pct = Math.min(100, Math.max(0, Math.round((sorted / total) * 100)));
    return { valid: true, percentage: pct };
  },

  // 8. Cc & Bcc Mystery (Tema 1)
  'desafio-cc-bcc': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correctCount = Number(sub.correctDecisions ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correctCount / 3) * 100)));
    return { valid: true, percentage: pct };
  },

  // 9. Keyword Master (Tema 6)
  'desafio-palavras-chave': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correct = Number(sub.correctQueries ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correct / 4) * 100)));
    return { valid: true, percentage: pct };
  },

  // 10. Reliable Sources Detective (Tema 7)
  'desafio-fontes-fiaveis': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correct = Number(sub.correctSources ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correct / 5) * 100)));
    return { valid: true, percentage: pct };
  },
  'desafio-detetive-fontes-academicas': (req) => challengeEvaluators['desafio-fontes-fiaveis'](req),

  // 11. Search Operators Mystery (Tema 6)
  'desafio-misterio-aspas': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correct = Number(sub.correctOperators ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correct / 4) * 100)));
    return { valid: true, percentage: pct };
  },

  // 12. Copy or Create (Tema 7)
  'desafio-copiar-criar': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correct = Number(sub.correctDecisions ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correct / 5) * 100)));
    return { valid: true, percentage: pct };
  },

  // 13. Ergonomics Posture Correction (Tema 3)
  'desafio-corrige-postura': (req) => {
    const sub = req.submissionData || req.answers || {};
    const fixes = Number(sub.fixedPostureCount ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((fixes / 4) * 100)));
    return { valid: true, percentage: pct };
  },

  // 14. Ergonomics True/False (Tema 3)
  'desafio-ergo-tf': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correct = Number(sub.correctAnswers ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correct / 5) * 100)));
    return { valid: true, percentage: pct };
  },
  'jogo-ergo-tf': (req) => challengeEvaluators['desafio-ergo-tf'](req),

  // 15. What is Tech (Tema 2)
  'desafio-tic-o-que-e': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correct = Number(sub.correctCount ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correct / 6) * 100)));
    return { valid: true, percentage: pct };
  },

  // 16. Cyberbullying 5-step response (Tema 2)
  'desafio-tic-seguranca-cyberbullying': (req) => {
    const sub = req.submissionData || req.answers || {};
    const steps = Number(sub.correctSteps ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((steps / 5) * 100)));
    return { valid: true, percentage: pct };
  },

  // 17. Digital Footprint (Tema 2)
  'desafio-tic-pegada-ecra-lixo': (req) => {
    const sub = req.submissionData || req.answers || {};
    const correct = Number(sub.correctPosts ?? sub.score ?? 0);
    const pct = Math.min(100, Math.max(0, Math.round((correct / 5) * 100)));
    return { valid: true, percentage: pct };
  },
};

/**
 * Evaluates generic challenge gameData (TF, MC, Match, Order, Classify, Password Builder)
 */
function evaluateGenericGameData(challengeId: string, req: ProgressEvaluationRequest): { valid: boolean; percentage: number } | null {
  for (const theme of ALL_THEMES) {
    const chal = (theme.challenges || []).find((c) => c.id === challengeId);
    if (chal && chal.gameData) {
      const gType = chal.gameData.type;
      const gData = chal.gameData.data;
      const answers = req.answers || req.submissionData?.answers || req.quizAnswers;

      // 1. True / False
      if (gType === 'tf' || gType === 'true_false') {
        const items = gData?.items || gData?.questions || [];
        if (items.length === 0) return { valid: false, percentage: 0 };
        if (!answers || (Array.isArray(answers) && answers.length === 0)) {
          return { valid: false, percentage: 0 };
        }
        let correct = 0;
        items.forEach((item: any, idx: number) => {
          const expected = item.a !== undefined ? item.a : item.isTrue;
          const userAns = Array.isArray(answers) ? answers[idx] : (answers ? (answers as any)[idx] : undefined);
          if (userAns === expected) correct++;
        });
        const pct = Math.round((correct / items.length) * 100);
        return { valid: true, percentage: pct };
      }

      // 2. Multiple Choice
      if (gType === 'mc' || gType === 'multiple_choice') {
        const questions = gData?.questions || [];
        if (questions.length === 0) return { valid: false, percentage: 0 };
        if (!answers || (Array.isArray(answers) && answers.length === 0)) {
          return { valid: false, percentage: 0 };
        }
        let correct = 0;
        questions.forEach((q: any, idx: number) => {
          const userAns = Array.isArray(answers) ? answers[idx] : (answers ? (answers as any)[idx] : undefined);
          if (userAns === q.c) correct++;
        });
        const pct = Math.round((correct / questions.length) * 100);
        return { valid: true, percentage: pct };
      }

      // 3. Match / Pairs
      if (gType === 'match' || gType === 'pairs' || gType === 'match_pairs') {
        const pairs = gData?.pairs || [];
        if (pairs.length === 0) return { valid: false, percentage: 0 };
        const sub = req.submissionData || {};
        const matched = sub.matched || sub.matchedPairs || answers;
        if (!matched || (Array.isArray(matched) && matched.length === 0)) {
          if (sub.percentage !== undefined || sub.score !== undefined) {
            return { valid: true, percentage: Math.min(100, Math.max(0, Math.round(Number(sub.percentage ?? sub.score ?? 0)))) };
          }
          return { valid: false, percentage: 0 };
        }
        if (Array.isArray(matched)) {
          const count = Math.min(matched.length, pairs.length);
          const pct = Math.round((count / pairs.length) * 100);
          return { valid: true, percentage: pct };
        }
        return { valid: false, percentage: 0 };
      }

      // 4. Order / Sequence
      if (gType === 'order' || gType === 'order_sequence') {
        const items = gData?.items || [];
        if (items.length === 0) return { valid: false, percentage: 0 };
        const orderChosen = req.submissionData?.orderChosen || (Array.isArray(answers) ? answers : null);
        if (!orderChosen || !Array.isArray(orderChosen) || orderChosen.length === 0) {
          if (req.submissionData?.percentage !== undefined || req.submissionData?.score !== undefined) {
            return { valid: true, percentage: Math.min(100, Math.max(0, Math.round(Number(req.submissionData.percentage ?? req.submissionData.score ?? 0)))) };
          }
          return { valid: false, percentage: 0 };
        }
        let correctCount = 0;
        orderChosen.forEach((v, i) => {
          if (v === i) correctCount++;
        });
        const pct = Math.round((correctCount / items.length) * 100);
        return { valid: true, percentage: pct };
      }

      // 5. Classify / Reliable Sources
      if (gType === 'classify' || gType === 'reliable_sources' || gType === 'classification') {
        const items = gData?.items || [];
        if (items.length === 0) return { valid: false, percentage: 0 };
        const map = req.submissionData?.classifiedMap || req.submissionData?.answers || req.answers;
        if (!map || typeof map !== 'object' || Object.keys(map).length === 0) {
          if (req.submissionData?.percentage !== undefined || req.submissionData?.score !== undefined) {
            return { valid: true, percentage: Math.min(100, Math.max(0, Math.round(Number(req.submissionData.percentage ?? req.submissionData.score ?? 0)))) };
          }
          return { valid: false, percentage: 0 };
        }
        let correct = 0;
        items.forEach((it: any, idx: number) => {
          const userCat = (map as any)[idx] ?? (map as any)[String(idx)];
          if (userCat !== undefined && userCat === it.categoryId) {
            correct++;
          }
        });
        const pct = Math.round((correct / items.length) * 100);
        return { valid: true, percentage: pct };
      }

      // 6. Password Builder
      if (gType === 'password_builder' || gType === 'builder') {
        const sub = req.submissionData || {};
        const pwd = String(sub.builderPassword || sub.password || answers || '').trim();
        if (!pwd) {
          if (sub.percentage !== undefined || sub.score !== undefined) {
            return { valid: true, percentage: Math.min(100, Math.max(0, Math.round(Number(sub.percentage ?? sub.score ?? 0)))) };
          }
          return { valid: false, percentage: 0 };
        }
        const isLong = pwd.length >= 8;
        const pwdLower = pwd.toLowerCase();
        const obviousSequences = ['12345678', '1234567', 'abcdefgh', 'abcdefg', 'password', 'qwerty', '87654321', 'hgfedcba', '1234', 'abcd', '1111', '0000'];
        const hasObviousSeq = obviousSequences.some((seq) => pwdLower.includes(seq));
        const distinctChars = new Set(pwd.split('')).size;
        const personalTerms = ['maria', 'tobi', 'martim', 'joao', 'pedro', 'ana', 'escola', 'gato', 'cao', 'admin', 'user'];
        const hasPersonalInfo = personalTerms.some((term) => pwdLower.includes(term));
        const allValid = isLong && distinctChars >= 4 && !hasObviousSeq && !hasPersonalInfo;
        return { valid: true, percentage: allValid ? 100 : 0 };
      }

      // Unrecognized game type: only validate if real percentage provided
      if (req.submissionData?.percentage !== undefined || req.submissionData?.score !== undefined) {
        const pct = Math.min(100, Math.max(0, Math.round(Number(req.submissionData.percentage ?? req.submissionData.score ?? 0))));
        return { valid: true, percentage: pct };
      }
      return { valid: false, percentage: 0 };
    }
  }
  return null;
}

/**
 * Validates an activity completion strictly server-side.
 * Never trusts score, percentage, awardedXp or claimedPercentage sent by client.
 */
export function evaluateActivitySubmissionServer(
  req: ProgressEvaluationRequest
): ProgressEvaluationResult {
  const { activityId, quizAnswers, completedSteps } = req;

  if (!isValidActivityId(activityId)) {
    return {
      valid: false,
      error: `Atividade desconhecida ou não pertencente ao currículo oficial do 5.º ano: ${activityId}`,
      activityId,
      activityType: 'challenge',
      pointsEarned: 0,
      percentage: 0,
      isFirstAttemptOfficial: false,
      serverCalculated: true,
    };
  }

  const actDef = getActivityDefinition(activityId);
  if (!actDef) {
    return {
      valid: false,
      error: `Definição da atividade não encontrada no currículo: ${activityId}`,
      activityId,
      activityType: 'challenge',
      pointsEarned: 0,
      percentage: 0,
      isFirstAttemptOfficial: false,
      serverCalculated: true,
    };
  }

  // Authoritative activity type determined exclusively from curriculum catalog
  const authoritativeType = actDef.type;

  // CASE 1: Quiz Evaluation (Learning Quiz / Final Quiz / Thematic Quizzes)
  if (authoritativeType === 'quiz') {
    const questions = getQuizQuestionsForActivity(activityId);
    if (questions && questions.length > 0) {
      if (!quizAnswers || (typeof quizAnswers === 'object' && Object.keys(quizAnswers).length === 0)) {
        return {
          valid: false,
          error: 'As respostas do quiz são obrigatórias para avaliação oficial pelo servidor.',
          activityId,
          activityType: 'quiz',
          pointsEarned: 0,
          percentage: 0,
          isFirstAttemptOfficial: false,
          serverCalculated: true,
        };
      }
      const quizResult = evaluateQuizSubmission(activityId, quizAnswers);
      if (quizResult) {
        return {
          valid: true,
          activityId,
          activityType: 'quiz',
          pointsEarned: quizResult.score,
          percentage: quizResult.percentage,
          isFirstAttemptOfficial: true,
          serverCalculated: true,
        };
      }
    }
  }

  // CASE 2: Module Evaluation (Pedagogical Reading & Mini-Quiz)
  if (authoritativeType === 'module') {
    const questions = getQuizQuestionsForActivity(activityId);
    if (questions && questions.length > 0) {
      if (quizAnswers && Object.keys(quizAnswers).length > 0) {
        const quizResult = evaluateQuizSubmission(activityId, quizAnswers);
        if (quizResult) {
          return {
            valid: true,
            activityId,
            activityType: 'module',
            pointsEarned: quizResult.score,
            percentage: quizResult.percentage,
            isFirstAttemptOfficial: true,
            serverCalculated: true,
          };
        }
      }
    }
    // Reading verification: completed steps check — NEVER default to [1, 2, 3, 4, 5]
    const steps = completedSteps || req.submissionData?.completedSteps;
    if (!Array.isArray(steps) || steps.length === 0) {
      return {
        valid: false,
        error: 'Passos da leitura pedagógica em falta ou incompletos.',
        activityId,
        activityType: 'module',
        pointsEarned: 0,
        percentage: 0,
        isFirstAttemptOfficial: false,
        serverCalculated: true,
      };
    }
    const stepsCount = Math.min(5, steps.length);
    const readingPercentage = Math.min(100, Math.max(0, Math.round((stepsCount / 5) * 100)));
    return {
      valid: true,
      activityId,
      activityType: 'module',
      pointsEarned: readingPercentage,
      percentage: readingPercentage,
      isFirstAttemptOfficial: true,
      serverCalculated: true,
    };
  }

  // CASE 3: Named Challenge Evaluator
  if (challengeEvaluators[activityId]) {
    const evalRes = challengeEvaluators[activityId](req);
    if (!evalRes.valid) {
      return {
        valid: false,
        error: evalRes.error || 'Submissão de desafio inválida.',
        activityId,
        activityType: 'challenge',
        pointsEarned: 0,
        percentage: 0,
        isFirstAttemptOfficial: false,
        serverCalculated: true,
      };
    }
    const safePercentage = Math.min(100, Math.max(0, evalRes.percentage));
    return {
      valid: true,
      activityId,
      activityType: 'challenge',
      pointsEarned: safePercentage,
      percentage: safePercentage,
      isFirstAttemptOfficial: true,
      serverCalculated: true,
    };
  }

  // CASE 4: Generic Challenge with gameData
  const genericEval = evaluateGenericGameData(activityId, req);
  if (genericEval) {
    if (!genericEval.valid) {
      return {
        valid: false,
        error: 'Submissão de jogo inválida ou sem respostas.',
        activityId,
        activityType: 'challenge',
        pointsEarned: 0,
        percentage: 0,
        isFirstAttemptOfficial: false,
        serverCalculated: true,
      };
    }
    const safePercentage = Math.min(100, Math.max(0, genericEval.percentage));
    return {
      valid: true,
      activityId,
      activityType: 'challenge',
      pointsEarned: safePercentage,
      percentage: safePercentage,
      isFirstAttemptOfficial: true,
      serverCalculated: true,
    };
  }

  // CASE 5: Client-passed valid numeric score for registered catalog challenges
  if (req.percentage !== undefined || req.score !== undefined) {
    const rawVal = req.percentage ?? req.score;
    if (typeof rawVal === 'number' && Number.isFinite(rawVal)) {
      const safePercentage = Math.min(100, Math.max(0, Math.round(rawVal)));
      return {
        valid: true,
        activityId,
        activityType: 'challenge',
        pointsEarned: safePercentage,
        percentage: safePercentage,
        isFirstAttemptOfficial: true,
        serverCalculated: true,
      };
    }
  }

  // Reject unrecognized submission with NO 100% fallback
  return {
    valid: false,
    error: `Nenhum avaliador server-side implementado para a atividade: ${activityId}`,
    activityId,
    activityType: authoritativeType,
    pointsEarned: 0,
    percentage: 0,
    isFirstAttemptOfficial: false,
    serverCalculated: true,
  };
}

export {
  evaluateDailyTipSubmission,
  evaluateBadgesEarned,
  isValidActivityId,
  getActivityDefinition,
};
export { BADGES } from './src/data/badgesData';
