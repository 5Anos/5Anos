import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent database file storage in ./data/db.json
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  language: 'pt' | 'en';
  createdAt: string;
  points: number;
  lastActivity?: {
    themeId: string;
    moduleId?: string;
    challengeId?: string;
    title: string;
    timestamp: string;
  };
}

interface ActivityProgress {
  userId: string;
  activityId: string;
  activityType: 'module' | 'quiz' | 'challenge';
  themeId: string;
  status: 'completed' | 'in_progress';
  score?: number;
  maxScore?: number;
  percentage?: number;
  attempts: number;
  bestScore?: number;
  bestPercentage?: number;
  lastUpdated: string;
}

interface UserAchievement {
  userId: string;
  badgeId: string;
  unlockedAt: string;
}

interface PointTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  timestamp: string;
}

interface DB {
  users: User[];
  tokens: { token: string; userId: string; expiresAt: number }[];
  progress: ActivityProgress[];
  achievements: UserAchievement[];
  pointsHistory: PointTransaction[];
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function readDB(): DB {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialDB: DB = {
        users: [],
        tokens: [],
        progress: [],
        achievements: [],
        pointsHistory: [],
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2));
      return initialDB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { users: [], tokens: [], progress: [], achievements: [], pointsHistory: [] };
  }
}

function writeDB(db: DB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// Auth Helper
function getAuthUser(req: express.Request, db: DB): User | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '').trim();
  const foundToken = db.tokens.find((t) => t.token === token && t.expiresAt > Date.now());
  if (!foundToken) return null;
  return db.users.find((u) => u.id === foundToken.userId) || null;
}

// Check and award badges
function evaluateAchievements(userId: string, db: DB) {
  const userProgress = db.progress.filter((p) => p.userId === userId);
  const userAchievements = db.achievements.filter((a) => a.userId === userId);
  const user = db.users.find((u) => u.id === userId);
  if (!user) return;

  const currentBadgeIds = new Set(userAchievements.map((a) => a.badgeId));
  const newBadges: string[] = [];

  // Badge 1: Primeiros passos (Account created or 1 activity completed)
  if (!currentBadgeIds.has('primeiros-passos') && userProgress.length >= 1) {
    newBadges.push('primeiros-passos');
  }

  // Theme 1 modules (5 modules)
  const theme1Modules = ['seguranca-digital-intro', 'utilizacao-segura-internet', 'dados-pessoais-privacidade', 'responsabilidade-respeito', 'direitos-autor'];
  const theme1CompletedModules = theme1Modules.filter((mId) =>
    userProgress.some((p) => p.activityId === mId && p.status === 'completed')
  );

  // Badge 2: Guardião Digital (Terminou os módulos de Segurança Digital)
  if (theme1CompletedModules.length >= 5 && !currentBadgeIds.has('guardiao-digital')) {
    newBadges.push('guardiao-digital');
  }

  // Badge 3: Especialista em Segurança (Obteve pelo menos 90% num quiz de Segurança Digital)
  const theme1QuizHighScore = userProgress.some(
    (p) => p.themeId === 'seguranca-digital' && (p.activityType === 'quiz' || p.activityId.includes('quiz')) && (p.bestPercentage || 0) >= 90
  );
  if (theme1QuizHighScore && !currentBadgeIds.has('especialista-seguranca')) {
    newBadges.push('especialista-seguranca');
  }

  // Theme 2 challenges
  const theme2Challenges = ['desafio-escrever-email', 'desafio-organizar-inbox', 'desafio-cc-bcc', 'quiz-final-tema2'];
  const theme2CompletedChallenges = theme2Challenges.filter((cId) =>
    userProgress.some((p) => p.activityId === cId && p.status === 'completed')
  );

  // Badge 4: Mestre do Email (Completou todos os desafios de Correio Eletrónico)
  if (theme2CompletedChallenges.length >= 4 && !currentBadgeIds.has('mestre-email')) {
    newBadges.push('mestre-email');
  }

  // Badge 5: Detetive Cibernético (Completou desafio de Phishing com sucesso)
  const phishingChallengeDone = userProgress.some(
    (p) => (p.activityId === 'desafio-detetive-phishing' || p.activityId === 'desafio-phishing') && p.status === 'completed'
  );
  if (phishingChallengeDone && !currentBadgeIds.has('detetive-cibernetico')) {
    newBadges.push('detetive-cibernetico');
  }

  // Theme 3 modules (7 modules)
  const theme3Modules = [
    'pesquisa-o-que-e',
    'pesquisa-motores-busca',
    'pesquisa-boa-pesquisa',
    'pesquisa-operadores',
    'pesquisa-avaliar-fontes',
    'pesquisa-direitos-plagio',
    'pesquisa-organizar-informacao',
  ];
  const theme3CompletedModules = theme3Modules.filter((mId) =>
    userProgress.some((p) => p.activityId === mId && p.status === 'completed')
  );

  // Badge: Detetive da Informação (Completou todos os módulos de Pesquisa)
  if (theme3CompletedModules.length >= 7 && !currentBadgeIds.has('detetive-informacao')) {
    newBadges.push('detetive-informacao');
  }

  // Badge: Mestre da Pesquisa (Obteve 90% ou mais no quiz final de Pesquisa de Informação)
  const theme3QuizHighScore = userProgress.some(
    (p) => p.activityId === 'quiz-final-tema3' && (p.bestPercentage || 0) >= 90
  );
  if (theme3QuizHighScore && !currentBadgeIds.has('mestre-pesquisa')) {
    newBadges.push('mestre-pesquisa');
  }

  // Theme 2 modules (5 modules)
  const theme2Modules = [
    'correio-o-que-e',
    'correio-estrutura-endereco',
    'correio-regras-ouro',
    'correio-seguranca-anexos',
    'correio-organizacao-limpeza',
  ];
  const theme2CompletedModules = theme2Modules.filter((mId) =>
    userProgress.some((p) => p.activityId === mId && p.status === 'completed')
  );

  // Badge 6: TIC Explorer (Completou todos os módulos dos 3 temas do 5.º ano)
  if (
    theme1CompletedModules.length >= 5 &&
    theme2CompletedModules.length >= 5 &&
    theme3CompletedModules.length >= 7 &&
    !currentBadgeIds.has('tic-explorer')
  ) {
    newBadges.push('tic-explorer');
  }

  // Badge 7: Centurião (Mais de 500 pontos)
  if (user.points >= 500 && !currentBadgeIds.has('centuriao-pontos')) {
    newBadges.push('centuriao-pontos');
  }

  for (const badgeId of newBadges) {
    db.achievements.push({
      userId,
      badgeId,
      unlockedAt: new Date().toISOString(),
    });
    // Extra points for badge unlock
    user.points += 50;
    db.pointsHistory.push({
      id: crypto.randomUUID(),
      userId,
      amount: 50,
      reason: `Desbloqueio de Conquista: ${badgeId}`,
      timestamp: new Date().toISOString(),
    });
  }
}

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Plataforma TIC 5.º Ano' });
});

// Demo accounts list (disabled for production)
app.get('/api/auth/demo-accounts', (req, res) => {
  res.json({
    accounts: [],
  });
});

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, language = 'pt' } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Nome inválido. Deve ter pelo menos 2 caracteres.' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Endereço de email inválido.' });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'A palavra-passe deve ter pelo menos 6 caracteres.' });
  }

  const db = readDB();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return res.status(409).json({ error: 'Já existe uma conta associada a este email.' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const newUser: User = {
    id: 'user-' + crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    salt,
    language: language === 'en' ? 'en' : 'pt',
    createdAt: new Date().toISOString(),
    points: 50, // Welcome bonus
  };

  db.users.push(newUser);

  // Welcome badge & points
  db.achievements.push({
    userId: newUser.id,
    badgeId: 'primeiros-passos',
    unlockedAt: new Date().toISOString(),
  });

  db.pointsHistory.push({
    id: crypto.randomUUID(),
    userId: newUser.id,
    amount: 50,
    reason: 'Boas-vindas à plataforma',
    timestamp: new Date().toISOString(),
  });

  const token = crypto.randomBytes(32).toString('hex');
  db.tokens.push({
    token,
    userId: newUser.id,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  writeDB(db);

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      language: newUser.language,
      points: newUser.points,
    },
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, indica o email e a palavra-passe.' });
  }

  const db = readDB();
  const normalizedEmail = email.trim().toLowerCase();

  const user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return res.status(401).json({ error: 'Email ou palavra-passe incorretos.' });
  }

  const computedHash = hashPassword(password, user.salt);
  if (computedHash !== user.passwordHash) {
    return res.status(401).json({ error: 'Email ou palavra-passe incorretos.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  db.tokens.push({
    token,
    userId: user.id,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });

  writeDB(db);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      language: user.language,
      points: user.points,
      lastActivity: user.lastActivity,
    },
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '').trim();
    const db = readDB();
    db.tokens = db.tokens.filter((t) => t.token !== token);
    writeDB(db);
  }
  res.json({ success: true });
});

// Get Current User Profile & Full Stats
app.get('/api/user/me', (req, res) => {
  const db = readDB();
  const user = getAuthUser(req, db);

  if (!user) {
    return res.status(401).json({ error: 'Sessão expirada ou não autenticado.' });
  }

  const userProgress = db.progress.filter((p) => p.userId === user.id);
  const userAchievements = db.achievements.filter((a) => a.userId === user.id);
  const userPointsHistory = db.pointsHistory.filter((p) => p.userId === user.id);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      language: user.language,
      points: user.points,
      lastActivity: user.lastActivity,
      createdAt: user.createdAt,
    },
    progress: userProgress,
    achievements: userAchievements,
    pointsHistory: userPointsHistory.slice(-20).reverse(),
  });
});

// Update language preference (persists across devices)
app.patch('/api/user/language', (req, res) => {
  const { language } = req.body;
  if (language !== 'pt' && language !== 'en') {
    return res.status(400).json({ error: 'Idioma inválido (apenas "pt" ou "en").' });
  }

  const db = readDB();
  const user = getAuthUser(req, db);

  if (!user) {
    return res.status(401).json({ error: 'Não autenticado.' });
  }

  user.language = language;
  writeDB(db);

  res.json({ success: true, language: user.language });
});

// Save / Update Activity Progress (Modules, Quizzes, Challenges)
app.post('/api/progress/save', (req, res) => {
  const {
    activityId,
    activityType,
    themeId,
    status = 'completed',
    score,
    maxScore,
    percentage,
    activityTitle,
  } = req.body;

  if (!activityId || !themeId) {
    return res.status(400).json({ error: 'Dados de atividade em falta.' });
  }

  const db = readDB();
  const user = getAuthUser(req, db);

  if (!user) {
    return res.status(401).json({ error: 'Não autenticado.' });
  }

  let record = db.progress.find((p) => p.userId === user.id && p.activityId === activityId);

  const calcPercentage = percentage !== undefined ? percentage : (score !== undefined && maxScore ? Math.round((score / maxScore) * 100) : 100);

  if (!record) {
    record = {
      userId: user.id,
      activityId,
      activityType: activityType || 'module',
      themeId,
      status,
      attempts: 1,
      score,
      maxScore,
      percentage: calcPercentage,
      bestScore: score,
      bestPercentage: calcPercentage,
      lastUpdated: new Date().toISOString(),
    };
    db.progress.push(record);

    // Award initial points for first completion
    let pointsAwarded = 20;
    if (activityType === 'quiz') pointsAwarded = Math.max(15, Math.round(calcPercentage / 2));
    if (activityType === 'challenge') pointsAwarded = 35;

    user.points += pointsAwarded;
    db.pointsHistory.push({
      id: crypto.randomUUID(),
      userId: user.id,
      amount: pointsAwarded,
      reason: `Conclusão: ${activityTitle || activityId}`,
      timestamp: new Date().toISOString(),
    });
  } else {
    record.attempts += 1;
    record.status = status;
    record.score = score;
    record.maxScore = maxScore;
    record.percentage = calcPercentage;
    if (calcPercentage > (record.bestPercentage || 0)) {
      record.bestPercentage = calcPercentage;
      record.bestScore = score;
      // Bonus points for improvement
      const bonus = 10;
      user.points += bonus;
      db.pointsHistory.push({
        id: crypto.randomUUID(),
        userId: user.id,
        amount: bonus,
        reason: `Melhoria de pontuação: ${activityTitle || activityId}`,
        timestamp: new Date().toISOString(),
      });
    }
    record.lastUpdated = new Date().toISOString();
  }

  // Update student's "last activity" spot to seamlessly continue anywhere
  user.lastActivity = {
    themeId,
    moduleId: activityType === 'module' ? activityId : undefined,
    challengeId: activityType === 'challenge' ? activityId : undefined,
    title: activityTitle || activityId,
    timestamp: new Date().toISOString(),
  };

  // Re-evaluate achievements
  evaluateAchievements(user.id, db);

  writeDB(db);

  res.json({
    success: true,
    record,
    userPoints: user.points,
    lastActivity: user.lastActivity,
    achievements: db.achievements.filter((a) => a.userId === user.id),
  });
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
    console.log(`Plataforma TIC 5.º Ano running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
