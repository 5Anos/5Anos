import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Plataforma TIC 5 — Descomplica!',
    database: 'Cloud Firestore',
  });
});

// Import server validation engine
import {
  evaluateActivitySubmissionServer,
  evaluateDailyTipSubmission,
  evaluateBadgesEarned,
  isValidActivityId,
} from './serverValidation';

/**
 * Authoritative Activity Progress Evaluation
 * POST /api/progress/evaluate
 * Evaluates quiz answers or challenge completions against server-side curriculum.
 * Prevents clients from arbitrary points injection.
 */
app.post('/api/progress/evaluate', (req, res) => {
  try {
    const { activityId, activityType, quizAnswers, claimedPercentage } = req.body || {};

    if (!activityId) {
      return res.status(400).json({ error: 'activityId é obrigatório' });
    }

    const evaluation = evaluateActivitySubmissionServer({
      activityId,
      activityType: activityType || 'challenge',
      quizAnswers,
      claimedPercentage,
    });

    if (!evaluation.valid) {
      return res.status(400).json({ error: evaluation.error || 'Atividade inválida' });
    }

    return res.json({
      success: true,
      evaluation,
    });
  } catch (err: any) {
    console.error('Error in /api/progress/evaluate:', err);
    return res.status(500).json({ error: 'Erro na validação da atividade no servidor' });
  }
});

/**
 * Authoritative Daily Tip Evaluation
 * POST /api/daily-tip/evaluate
 * Evaluates submitted answer against official daily tips database.
 */
app.post('/api/daily-tip/evaluate', (req, res) => {
  try {
    const { dateStr, selectedOptionId } = req.body || {};

    if (!dateStr || !selectedOptionId) {
      return res.status(400).json({ error: 'dateStr e selectedOptionId são obrigatórios' });
    }

    const evaluation = evaluateDailyTipSubmission(dateStr, selectedOptionId);

    return res.json({
      success: true,
      evaluation,
    });
  } catch (err: any) {
    console.error('Error in /api/daily-tip/evaluate:', err);
    return res.status(500).json({ error: 'Erro na validação da Dica do Dia' });
  }
});

/**
 * Authoritative Badges Evaluation
 * POST /api/badges/evaluate
 */
app.post('/api/badges/evaluate', (req, res) => {
  try {
    const { completedActivities, totalPoints, existingBadgeIds } = req.body || {};

    const validCompleted = Array.isArray(completedActivities)
      ? completedActivities.filter((a: any) => isValidActivityId(a?.activityId))
      : [];

    const result = evaluateBadgesEarned(
      validCompleted,
      Number(totalPoints) || 0,
      Array.isArray(existingBadgeIds) ? existingBadgeIds : []
    );

    return res.json({
      success: true,
      newlyUnlockedBadges: result.newlyUnlockedBadges,
      totalBonusPoints: result.totalBonusPoints,
    });
  } catch (err: any) {
    console.error('Error in /api/badges/evaluate:', err);
    return res.status(500).json({ error: 'Erro na avaliação de badges' });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TIC 5 — Descomplica! running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
