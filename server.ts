import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { promisify } from 'util';
import { createServer as createViteServer } from 'vite';
import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

import {
  evaluateActivitySubmissionServer,
  evaluateDailyTipSubmission,
  evaluateBadgesEarned,
  isValidActivityId,
  getActivityDefinition,
  BADGES,
} from './serverValidation';
import {
  generateKidUsername,
  generateKidPassword,
  parseStudentName,
  normalizeTurmaName,
} from './src/utils/studentCredentials';
import { getDefaultAvatar } from './src/utils/avatarUtils';

const app = express();
const PORT = 3000;

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json({ limit: '256kb' }));

/* ============================================================
   FIREBASE ADMIN
   ============================================================ */

let firebaseAppletConfig: Record<string, any> = {};
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseAppletConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (err) {
  console.warn('Could not load firebase-applet-config.json:', err);
}

function initializeFirebaseAdmin() {
  const customDbId =
    process.env.FIRESTORE_DATABASE_ID ||
    (firebaseAppletConfig.firestoreDatabaseId && firebaseAppletConfig.firestoreDatabaseId !== '(default)'
      ? firebaseAppletConfig.firestoreDatabaseId
      : undefined);

  if (getApps().length > 0) {
    const defaultApp = getApps()[0];
    return customDbId ? getFirestore(defaultApp, customDbId) : getFirestore(defaultApp);
  }

  let rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (rawPrivateKey) {
    rawPrivateKey = rawPrivateKey.trim();
    if (
      (rawPrivateKey.startsWith('"') && rawPrivateKey.endsWith('"')) ||
      (rawPrivateKey.startsWith("'") && rawPrivateKey.endsWith("'"))
    ) {
      rawPrivateKey = rawPrivateKey.slice(1, -1);
    }
    rawPrivateKey = rawPrivateKey.replace(/\\n/g, '\n').replace(/\n/g, '\n');
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || firebaseAppletConfig.projectId;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (clientEmail && rawPrivateKey) {
    const app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: rawPrivateKey,
      }),
    });
    return customDbId ? getFirestore(app, customDbId) : getFirestore(app);
  }

  try {
    const app = initializeApp({
      credential: applicationDefault(),
      projectId,
    });
    return customDbId ? getFirestore(app, customDbId) : getFirestore(app);
  } catch (err) {
    console.error('Firebase Admin applicationDefault error:', err);
    const app = initializeApp({
      projectId,
    });
    return customDbId ? getFirestore(app, customDbId) : getFirestore(app);
  }
}

const db = initializeFirebaseAdmin();

/* ============================================================
   SESSION SECURITY
   ============================================================ */

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
  console.warn(
    'WARNING: SESSION_SECRET não está definido ou é demasiado curto. ' +
    'Em produção deve ter pelo menos 32 caracteres aleatórios.'
  );
}

const scryptAsync = promisify(crypto.scrypt);

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

async function hashPassword(password: string, salt?: string) {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');

  const derivedKey = (await scryptAsync(
    password,
    actualSalt,
    64
  )) as Buffer;

  return {
    salt: actualSalt,
    hash: derivedKey.toString('hex'),
  };
}

async function verifyPassword(
  password: string,
  storedHash: string,
  salt: string
): Promise<boolean> {
  const derivedKey = (await scryptAsync(
    password,
    salt,
    64
  )) as Buffer;

  return safeEqual(
    derivedKey.toString('hex'),
    storedHash
  );
}

/*
 * Sessão:
 *
 * base64url(userId.timestamp.randomSignature)
 *
 * A assinatura é HMAC-SHA256.
 */
function createSessionToken(userId: string): string {
  if (!SESSION_SECRET) {
    throw new Error('SESSION_SECRET não configurado.');
  }

  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString('hex');

  const payload = `${userId}.${timestamp}.${nonce}`;

  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');

  return Buffer.from(
    `${payload}.${signature}`
  ).toString('base64url');
}

function verifySessionToken(
  token: string
): { userId: string; issuedAt: number } | null {
  try {
    if (!SESSION_SECRET) {
      return null;
    }

    const decoded = Buffer
      .from(token, 'base64url')
      .toString('utf8');

    const parts = decoded.split('.');

    if (parts.length !== 4) {
      return null;
    }

    const [userId, timestamp, nonce, signature] = parts;

    if (!userId || !timestamp || !nonce || !signature) {
      return null;
    }

    const payload = `${userId}.${timestamp}.${nonce}`;

    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payload)
      .digest('hex');

    if (!safeEqual(signature, expectedSignature)) {
      return null;
    }

    const issuedAt = Number(timestamp);

    if (!Number.isFinite(issuedAt)) {
      return null;
    }

    /*
     * Sessões com 7 dias de validade.
     */
    const MAX_SESSION_AGE = 7 * 24 * 60 * 60 * 1000;

    if (Date.now() - issuedAt > MAX_SESSION_AGE) {
      return null;
    }

    if (issuedAt > Date.now() + 60_000) {
      return null;
    }

    return {
      userId,
      issuedAt,
    };
  } catch {
    return null;
  }
}

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;

  if (!header) {
    return null;
  }

  if (!header.startsWith('Bearer ')) {
    return null;
  }

  return header.slice('Bearer '.length).trim() || null;
}

/* ============================================================
   VALIDATION HELPERS
   ============================================================ */

function normalizeEmail(value: unknown): string {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUserId(userId: string): boolean {
  return /^[A-Za-z0-9_-]{6,128}$/.test(userId);
}

function isValidPublicId(publicId: string): boolean {
  return /^[A-Za-z0-9À-ÿ _-]{3,30}$/.test(publicId);
}

function isValidPassword(password: string): boolean {
  /*
   * Não guardar a password.
   *
   * O servidor apenas recebe a password para calcular
   * o hash e verificar a credencial.
   */
  return password.length >= 8 && password.length <= 128;
}

function isTeacherEmail(email: string): boolean {
  return [
    'imaginebycarla2023@gmail.com',
    'imaginebacarla2023@gmail.com',
    'prof.carla@escola.pt',
    'carla.oliveira@escola.pt',
  ].includes(email);
}

/* ============================================================
   AUTHENTICATION MIDDLEWARE
   ============================================================ */

interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: FirebaseFirestore.DocumentData;
}

async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = getBearerToken(req);

    if (!token) {
      return res.status(401).json({
        error: 'Sessão não encontrada.',
      });
    }

    const session = verifySessionToken(token);

    if (!session) {
      return res.status(401).json({
        error: 'Sessão inválida ou expirada.',
      });
    }

    const userRef = db.collection('users').doc(session.userId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return res.status(401).json({
        error: 'Utilizador não encontrado.',
      });
    }

    const user = userSnap.data();

    if (!user) {
      return res.status(401).json({
        error: 'Dados do utilizador inválidos.',
      });
    }

    if (user.id !== session.userId) {
      return res.status(401).json({
        error: 'Sessão inválida.',
      });
    }

    req.userId = session.userId;
    req.user = user;

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);

    return res.status(500).json({
      error: 'Erro ao validar a sessão.',
    });
  }
}

async function requireTeacher(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user || !req.userId) {
    return res.status(401).json({
      error: 'Sessão necessária.',
    });
  }

  const role = req.user.role;
  const email = normalizeEmail(req.user.email);

  if (
    role === 'teacher' ||
    role === 'admin' ||
    isTeacherEmail(email)
  ) {
    return next();
  }

  return res.status(403).json({
    error: 'Apenas a professora pode executar esta operação.',
  });
}

/* ============================================================
   HEALTH
   ============================================================ */

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Plataforma TIC 5 — Descomplica!',
    database: 'Cloud Firestore',
    authentication: 'custom-server-session',
  });
});

/* ============================================================
   AUTH — REGISTER
   ============================================================ */

app.post('/api/auth/register', async (_req, res) => {
  return res.status(403).json({
    error: 'A criação autónoma de contas foi desativada. As contas dos alunos são criadas e geridas pela professora de TIC.',
  });
});

/* ============================================================
   AUTH — LOGIN
   ============================================================ */

app.post('/api/auth/login', async (req, res) => {
  try {
    const {
      email,
      username,
      identifier: rawIdentifier,
      password,
    } = req.body || {};

    const rawInput = String(rawIdentifier || username || email || '').trim();
    const identifier = rawInput.toLowerCase();

    if (!identifier) {
      return res.status(400).json({
        error: 'Por favor, introduz o teu nome de utilizador ou email.',
      });
    }

    if (
      typeof password !== 'string' ||
      password.length < 1 ||
      password.length > 128
    ) {
      return res.status(400).json({
        error: 'Palavra-passe inválida.',
      });
    }

    let userDoc: any = null;

    // 1. If identifier has '@', search by email
    if (identifier.includes('@')) {
      const qEmail = await db
        .collection('users')
        .where('email', '==', identifier)
        .limit(1)
        .get();
      if (!qEmail.empty) userDoc = qEmail.docs[0];
    }

    // 2. If not found or no '@', search by username
    if (!userDoc) {
      const qUser = await db
        .collection('users')
        .where('username', '==', identifier)
        .limit(1)
        .get();
      if (!qUser.empty) userDoc = qUser.docs[0];
    }

    // 3. Fallback: search by synthetic email `${identifier}@aluno.tic`
    if (!userDoc && !identifier.includes('@')) {
      const qSyn = await db
        .collection('users')
        .where('email', '==', `${identifier}@aluno.tic`)
        .limit(1)
        .get();
      if (!qSyn.empty) userDoc = qSyn.docs[0];
    }

    // 4. Fallback: search by publicId
    if (!userDoc) {
      const qPub = await db
        .collection('users')
        .where('publicId', '==', identifier.toUpperCase())
        .limit(1)
        .get();
      if (!qPub.empty) userDoc = qPub.docs[0];
    }

    if (!userDoc) {
      return res.status(401).json({
        error: 'Utilizador ou palavra-passe incorretos.',
      });
    }

    const user = userDoc.data();

    const credentialSnap = await db
      .collection('credentials')
      .doc(userDoc.id)
      .get();

    let passwordValid = false;

    if (credentialSnap.exists) {
      const credentials = credentialSnap.data() || {};
      if (
        typeof credentials.passwordHash === 'string' &&
        typeof credentials.passwordSalt === 'string' &&
        credentials.passwordSalt.length > 0
      ) {
        passwordValid = await verifyPassword(
          password,
          credentials.passwordHash,
          credentials.passwordSalt
        );
      }

      if (!passwordValid) {
        if (
          credentials.passwordHash === password ||
          credentials.password === password
        ) {
          passwordValid = true;
          const upgraded = await hashPassword(password);
          await db.collection('credentials').doc(userDoc.id).set(
            {
              userId: userDoc.id,
              passwordHash: upgraded.hash,
              passwordSalt: upgraded.salt,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
      }
    }

    if (!passwordValid) {
      const userPlainPassword = user.initialPassword || user.password || user.passwordHash;
      if (
        typeof userPlainPassword === 'string' &&
        userPlainPassword === password
      ) {
        passwordValid = true;
        const upgraded = await hashPassword(password);
        await db.collection('credentials').doc(userDoc.id).set(
          {
            userId: userDoc.id,
            passwordHash: upgraded.hash,
            passwordSalt: upgraded.salt,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    }

    if (!passwordValid) {
      if (!credentialSnap.exists && !user.password && !user.passwordHash && !user.initialPassword) {
        return res.status(401).json({
          error:
            'Esta conta precisa de definir novamente a palavra-passe antes de poder iniciar sessão.',
          code: 'PASSWORD_SETUP_REQUIRED',
        });
      }

      return res.status(401).json({
        error: 'Utilizador ou palavra-passe incorretos.',
      });
    }

    const token = createSessionToken(userDoc.id);

    const isTeacher = user.role === 'admin' || user.role === 'teacher' || isTeacherEmail(normalizeEmail(user.email));
    if (!isTeacher && Number(user.points || 0) < 100) {
      user.points = 100;
      await userDoc.ref.set({ points: 100, xp: 100, updatedAt: new Date().toISOString() }, { merge: true });
      await syncPublicProfile(userDoc.id);
    }

    return res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      error: 'Não foi possível iniciar sessão.',
    });
  }
});

/* ============================================================
   AUTH — CURRENT USER
   ============================================================ */

app.get(
  '/api/auth/me',
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    return res.json({
      success: true,
      user: req.user,
    });
  }
);

/* ============================================================
   AUTH — LOGOUT
   ============================================================ */

app.post(
  '/api/auth/logout',
  requireAuth,
  async (_req: AuthenticatedRequest, res) => {
    /*
     * As sessões são stateless.
     *
     * O cliente elimina o token.
     * Para invalidar sessões individualmente no futuro,
     * podemos adicionar uma sessionVersion ao utilizador.
     */
    return res.json({
      success: true,
    });
  }
);

/* ============================================================
   AUTH — REDEFINIR OU DEFINIR NOVA PALAVRA-PASSE
   ============================================================ */

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        error: 'Email inválido.',
      });
    }

    if (!isValidPassword(String(password || ''))) {
      return res.status(400).json({
        error: 'A palavra-passe deve ter entre 8 e 128 caracteres.',
      });
    }

    const snapshot = await db
      .collection('users')
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        error: 'Não foi encontrada nenhuma conta com este email.',
      });
    }

    const userDoc = snapshot.docs[0];
    const passwordResult = await hashPassword(String(password));

    await db.collection('credentials').doc(userDoc.id).set(
      {
        userId: userDoc.id,
        passwordHash: passwordResult.hash,
        passwordSalt: passwordResult.salt,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // Atualiza timestamp e sincroniza
    await userDoc.ref.set(
      {
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    const token = createSessionToken(userDoc.id);

    return res.json({
      success: true,
      token,
      user: userDoc.data(),
      message: 'Palavra-passe definida e atualizada com sucesso!',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      error: 'Erro ao definir a nova palavra-passe.',
    });
  }
});

/* ============================================================
   AUTH — DEFINIR PASSWORD DE CONTA EXISTENTE
   ============================================================ */

app.post('/api/auth/setup-password', async (req, res) => {
  try {
    const {
      email,
      setupSecret,
      password,
    } = req.body || {};

    const normalizedEmail = normalizeEmail(email);

    /*
     * Esta operação é deliberadamente protegida por uma
     * variável de ambiente. Não deve existir uma rota pública
     * que permita definir passwords arbitrariamente.
     */
    const expectedSecret =
      process.env.PASSWORD_SETUP_SECRET;

    if (
      !expectedSecret ||
      typeof setupSecret !== 'string' ||
      !safeEqual(setupSecret, expectedSecret)
    ) {
      return res.status(403).json({
        error: 'Não autorizado.',
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        error: 'Email inválido.',
      });
    }

    if (!isValidPassword(String(password || ''))) {
      return res.status(400).json({
        error: 'A palavra-passe deve ter entre 8 e 128 caracteres.',
      });
    }

    const snapshot = await db
      .collection('users')
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        error: 'Conta não encontrada.',
      });
    }

    const userDoc = snapshot.docs[0];
    const existingCredential = await db.collection('credentials').doc(userDoc.id).get();
    if (existingCredential.exists) {
      return res.status(409).json({ error: 'Esta conta já tem uma palavra-passe definida.' });
    }

    const passwordResult = await hashPassword(
      String(password)
    );

    await db
      .collection('credentials')
      .doc(userDoc.id)
      .set(
        {
          userId: userDoc.id,
          passwordHash: passwordResult.hash,
          passwordSalt: passwordResult.salt,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

    return res.json({
      success: true,
    });
  } catch (error) {
    console.error('Password setup error:', error);

    return res.status(500).json({
      error: 'Não foi possível definir a palavra-passe.',
    });
  }
});

/* ============================================================
   PRIVATE USER PROFILE
   ============================================================ */

function cleanAvatar(value: unknown) {
  if (!value || typeof value !== 'object') return undefined;
  const v = value as Record<string, unknown>;
  return {
    skinColor: typeof v.skinColor === 'string' ? v.skinColor.slice(0, 50) : undefined,
    hairColor: typeof v.hairColor === 'string' ? v.hairColor.slice(0, 50) : undefined,
    hairStyle: typeof v.hairStyle === 'string' ? v.hairStyle.slice(0, 50) : undefined,
    shirtColor: typeof v.shirtColor === 'string' ? v.shirtColor.slice(0, 50) : undefined,
    accessory: typeof v.accessory === 'string' ? v.accessory.slice(0, 50) : undefined,
  };
}

function validateDate(value: unknown): string | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : value;
}

function isLearningQuizServer(activityId: string, activityType?: string): boolean {
  if (activityType === 'quiz') return true;
  const def = getActivityDefinition(activityId) as any;
  if (def?.type === 'quiz') return true;
  const idLower = (activityId || '').toLowerCase();
  return idLower.startsWith('quiz-final') || idLower.includes('quiz-final-tema') || idLower.includes('final_quiz');
}

async function syncPublicProfile(userId: string) {
  const userSnap = await db.collection('users').doc(userId).get();
  if (!userSnap.exists) return;
  const user = userSnap.data() || {};
  if (user.role === 'teacher' || user.role === 'admin') return;
  const progressSnap = await db.collection('users').doc(userId).collection('progress').get();
  const achievementsSnap = await db.collection('users').doc(userId).collection('achievements').get();
  await db.collection('publicProfiles').doc(userId).set({
    id: userId,
    publicId: user.publicId || 'Estudante_TIC',
    turma: user.turma || '5.º A',
    avatar: user.avatar,
    points: Number(user.points || 0),
    role: 'student',
    completedActivities: progressSnap.docs.filter(d => d.data()?.status === 'completed').length,
    badgeCount: achievementsSnap.size,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

app.patch('/api/me/profile', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const body = req.body || {};
    const userRef = db.collection('users').doc(userId);
    const currentSnap = await userRef.get();
    if (!currentSnap.exists) return res.status(404).json({ error: 'Utilizador não encontrado.' });
    const current = currentSnap.data() || {};
    const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() };

    const isStudent = current.role === 'student' || (!current.role && !isTeacherEmail(current.email));
    if (isStudent && (body.name !== undefined || body.turma !== undefined || body.publicId !== undefined)) {
      return res.status(403).json({
        error: 'Os dados do aluno (nome, turma e utilizador) são geridos pela professora e não podem ser alterados.',
      });
    }

    if (!isStudent && body.name !== undefined) {
      const name = String(body.name).trim();
      if (!name || name.length > 100) return res.status(400).json({ error: 'Nome inválido.' });
      updates.name = name;
    }
    if (!isStudent && body.turma !== undefined) {
      const turma = String(body.turma).trim();
      if (turma.length > 50) return res.status(400).json({ error: 'Turma inválida.' });
      updates.turma = turma;
    }
    if (body.language !== undefined) {
      const language = String(body.language);
      if (!['pt', 'pt-PT', 'en', 'es', 'fr'].includes(language)) return res.status(400).json({ error: 'Idioma inválido.' });
      updates.language = language;
    }
    if (body.avatar !== undefined) updates.avatar = cleanAvatar(body.avatar);
    if (!isStudent && body.publicId !== undefined) {
      const publicId = String(body.publicId).trim();
      if (!isValidPublicId(publicId)) return res.status(400).json({ error: 'Nome público inválido.' });
      if (publicId.toLowerCase() !== String(current.publicId || '').toLowerCase()) {
        const q = await db.collection('publicProfiles').where('publicId', '==', publicId).limit(1).get();
        if (!q.empty && q.docs[0].id !== userId) return res.status(409).json({ error: 'Esse nome público já está a ser utilizado.' });
      }
      updates.publicId = publicId;
    }

    // Nunca aceitar do cliente: id, email, role, points, xp, createdAt, password ou credenciais.
    await userRef.set(updates, { merge: true });
    await syncPublicProfile(userId);
    const fresh = await userRef.get();
    return res.json({ success: true, user: fresh.data() });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ error: 'Não foi possível atualizar o perfil.' });
  }
});

/* ============================================================
   PRIVATE USER DATA
   ============================================================ */

app.get('/api/me/data', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) return res.status(404).json({ error: 'Utilizador não encontrado.' });
    const user = userSnap.data() || {};
    const isTeacher = user.role === 'admin' || user.role === 'teacher' || isTeacherEmail(normalizeEmail(user.email));

    const [progressSnap, achievementsSnap, pointsHistorySnap, dailyTipsSnap] = await Promise.all([
      userRef.collection('progress').get(),
      userRef.collection('achievements').get(),
      userRef.collection('pointsHistory').get(),
      userRef.collection('dailyTips').get(),
    ]);

    // Recálculo consistente de pontos para estudantes
    if (!isTeacher) {
      let dailyPoints = 0;
      dailyTipsSnap.docs.forEach((d) => {
        dailyPoints += Math.max(0, Math.min(1000, Math.round(Number(d.data()?.pointsEarned || 0))));
      });

      let challengePoints = 0;
      progressSnap.docs.forEach((d) => {
        const p = d.data();
        const pId = String(p.activityId || d.id);
        const isQ = isLearningQuizServer(pId, p.activityType);
        if (!isQ) {
          const best = Math.max(0, Math.min(100, Math.round(Number(p.bestScore ?? p.bestPercentage ?? p.score ?? 0))));
          challengePoints += best;
        }
      });

      let badgeBonus = 0;
      const unlockedIds = new Set(achievementsSnap.docs.map((d) => d.id));
      for (const b of BADGES) {
        if (unlockedIds.has(b.id)) {
          badgeBonus += b.pointsBonus || 0;
        }
      }

      const calculatedPoints = 100 + dailyPoints + challengePoints + badgeBonus;
      if (Number(user.points || 0) < calculatedPoints || Number(user.points || 0) < 100) {
        user.points = calculatedPoints;
        user.xp = calculatedPoints;
        await userRef.set({ points: calculatedPoints, xp: calculatedPoints, updatedAt: new Date().toISOString() }, { merge: true });
        await syncPublicProfile(userId);
      }
    }

    return res.json({
      success: true,
      user,
      progress: progressSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      achievements: achievementsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      pointsHistory: pointsHistorySnap.docs.map(d => ({ id: d.id, ...d.data() })),
      dailyTips: dailyTipsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
    });
  } catch (error) {
    console.error('Private data error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar os dados do utilizador.' });
  }
});

/* ============================================================
   PROGRESS — SERVER AUTHORITATIVE
   ============================================================ */

app.post('/api/progress/save', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const body = req.body || {};
    const activityId = String(body.activityId || '');
    const activityType = String(body.activityType || 'challenge') as 'module' | 'quiz' | 'challenge';
    const themeId = String(body.themeId || '').slice(0, 100);
    if (!activityId || !themeId) return res.status(400).json({ error: 'Identificador da atividade em falta.' });
    if (!isValidActivityId(activityId)) return res.status(400).json({ error: 'Atividade inválida ou não reconhecida no currículo.' });
    if (!['module', 'quiz', 'challenge'].includes(activityType)) return res.status(400).json({ error: 'Tipo de atividade inválido.' });

    const claimedScore = body.percentage !== undefined
      ? body.percentage
      : (body.score !== undefined ? body.score : body.claimedPercentage);
    const evaluation = evaluateActivitySubmissionServer({
      activityId,
      activityType,
      quizAnswers: body.quizAnswers,
      claimedPercentage: claimedScore,
    });
    if (!evaluation.valid) return res.status(400).json({ error: evaluation.error || 'Atividade inválida.' });

    const userRef = db.collection('users').doc(userId);
    const progressRef = userRef.collection('progress').doc(activityId);
    const existingSnap = await progressRef.get();
    const existing = existingSnap.exists ? (existingSnap.data() || {}) : null;
    const now = new Date().toISOString();
    const attemptScore = Math.max(0, Math.min(100, Math.round(Number(evaluation.percentage) || 0)));
    const previousBest = Math.max(0, Math.min(100, Math.round(Number(existing?.bestScore ?? existing?.bestPercentage ?? existing?.score ?? 0))));
    const quiz = isLearningQuizServer(activityId, activityType);
    const attempts = Number(existing?.attempts || 0) + 1;
    const best = Math.max(previousBest, attemptScore);

    let xpGain = 0;
    let awardedXp = 0;

    const record: Record<string, unknown> = {
      userId,
      activityId,
      activityType: quiz ? 'quiz' : evaluation.activityType,
      themeId,
      status: quiz ? 'completed' : (best >= 50 ? 'completed' : 'in_progress'),
      score: attemptScore,
      maxScore: 100,
      percentage: attemptScore,
      attempts,
      bestScore: best,
      bestPercentage: best,
      latestScore: attemptScore,
      latestPercentage: attemptScore,
      lastUpdated: now,
      serverCalculated: true,
    };

    if (quiz) {
      // 📚 QUIZ DE APRENDIZAGEM (1 por tema)
      // O Quiz de Aprendizagem NÃO dá XP (0 XP).
      xpGain = 0;
      awardedXp = 0;
      record.awardedXp = 0;

      // 1.ª tentativa é a avaliação oficial (inalterável)
      if (existing?.firstAttemptScore === undefined) {
        record.firstAttemptScore = attemptScore;
        record.firstAttemptPercentage = attemptScore;
        record.firstAttemptDate = now;
      } else {
        record.firstAttemptScore = existing.firstAttemptScore;
        record.firstAttemptPercentage = existing.firstAttemptPercentage;
        record.firstAttemptDate = existing.firstAttemptDate || now;
      }
    } else {
      // 🎮 DESAFIOS REGULARES / JOGOS
      // Cada desafio pode dar até 100 XP dependendo do desempenho.
      // Se o aluno repete com a mesma pontuação ou inferior, o XP só atualiza uma vez (xpGain = 0).
      // Se superar o melhor resultado anterior (ex: de 80 para 100), ganha a diferença (+20 XP).
      xpGain = Math.max(0, best - previousBest);
      awardedXp = best;
      record.awardedXp = best;

      if (existing?.firstAttemptScore === undefined) {
        record.firstAttemptScore = attemptScore;
        record.firstAttemptPercentage = attemptScore;
        record.firstAttemptDate = now;
      } else {
        record.firstAttemptScore = existing.firstAttemptScore;
        record.firstAttemptPercentage = existing.firstAttemptPercentage;
        record.firstAttemptDate = existing.firstAttemptDate || now;
      }
    }

    await progressRef.set(record, { merge: true });

    if (xpGain > 0) {
      const txId = `pt-act-${activityId}-${Date.now()}`;
      await userRef.collection('pointsHistory').doc(txId).set({
        id: txId,
        userId,
        amount: xpGain,
        reason: `🎮 Desafio TIC (+${xpGain} XP): ${body.activityTitle || activityId}`,
        timestamp: now,
      });
    }

    // Carregar dados para avaliação de conquistas e pontos consolidados
    const [allProgressSnap, achSnap, dailySnap, userSnap] = await Promise.all([
      userRef.collection('progress').get(),
      userRef.collection('achievements').get(),
      userRef.collection('dailyTips').get(),
      userRef.get(),
    ]);

    const user = userSnap.data() || {};
    const isAdmin = user.role === 'admin' || user.role === 'teacher' || isTeacherEmail(normalizeEmail(user.email));

    // Soma das Dicas do Dia
    let dailyPoints = 0;
    dailySnap.docs.forEach((d) => {
      dailyPoints += Math.max(0, Math.min(1000, Math.round(Number(d.data()?.pointsEarned || 0))));
    });

    // Soma dos Desafios Regulares (cada desafio conta com a sua melhor pontuação até 100 XP, quizzes dão 0 XP)
    let challengesPointsSum = 0;
    const completedForBadges: { activityId: string; points: number; percentage?: number }[] = [];
    allProgressSnap.docs.forEach((d) => {
      const pData = d.data();
      const pId = String(pData.activityId || d.id);
      const isQ = isLearningQuizServer(pId, pData.activityType);
      const pBest = Math.max(0, Math.min(100, Math.round(Number(pData.bestScore ?? pData.bestPercentage ?? pData.score ?? 0))));
      if (!isQ) {
        challengesPointsSum += pBest;
      }
      if (pBest >= 50 || pData.status === 'completed' || isQ) {
        completedForBadges.push({ activityId: pId, points: pBest, percentage: pBest });
      }
    });

    // Avaliar medalhas
    const currentBaseXp = isAdmin ? 0 : dailyPoints + challengesPointsSum;
    const existingBadgeIds = achSnap.docs.map((d) => d.id);
    const badgeEval = evaluateBadgesEarned(completedForBadges, currentBaseXp, existingBadgeIds);
    let newlyEarnedBonus = 0;

    for (const b of badgeEval.newlyUnlockedBadges || []) {
      await userRef.collection('achievements').doc(b.id).set({
        id: b.id,
        userId,
        badgeId: b.id,
        unlockedAt: now,
      });
      newlyEarnedBonus += b.pointsBonus || 0;
      if (b.pointsBonus > 0) {
        const txId = `pt-badge-${b.id}-${Date.now()}`;
        await userRef.collection('pointsHistory').doc(txId).set({
          id: txId,
          userId,
          amount: b.pointsBonus,
          reason: `🏆 Conquista Desbloqueada (+${b.pointsBonus} XP): ${b.namePt || b.id}`,
          timestamp: now,
        });
      }
    }

    let badgesBonusSum = 0;
    const allUnlockedBadgeIds = new Set([...existingBadgeIds, ...(badgeEval.newlyUnlockedBadges || []).map((b) => b.id)]);
    for (const badgeDef of BADGES) {
      if (allUnlockedBadgeIds.has(badgeDef.id)) {
        badgesBonusSum += badgeDef.pointsBonus || 0;
      }
    }

    // Pontos totais oficiais do aluno: Dicas do Dia + Desafios TIC (melhor pontuação) + Medalhas (sem bónus inicial artificial)
    const totalPoints = isAdmin ? 0 : (dailyPoints + challengesPointsSum + badgesBonusSum);

    const lastActivity = {
      themeId,
      title: String(body.activityTitle || activityId).slice(0, 200),
      timestamp: now,
    };

    await userRef.set(
      {
        points: totalPoints,
        xp: totalPoints,
        lastActivity,
        updatedAt: now,
      },
      { merge: true }
    );

    await syncPublicProfile(userId);

    const updatedAchSnap = await userRef.collection('achievements').get();
    const achievements = updatedAchSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return res.json({
      success: true,
      record,
      user: { ...user, points: totalPoints, xp: totalPoints, lastActivity },
      userPoints: totalPoints,
      earnedPoints: xpGain + newlyEarnedBonus,
      pointsEarned: xpGain,
      prevBestScore: previousBest,
      newBestScore: best,
      awardedXp: record.awardedXp,
      attemptScore,
      achievements,
    });
  } catch (error) {
    console.error('Progress save error:', error);
    return res.status(500).json({ error: 'Não foi possível guardar o progresso.' });
  }
});

/* ============================================================
   DAILY TIP
   ============================================================ */

app.post('/api/daily-tip/read', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const date = validateDate(req.body?.dateStr) || new Date().toISOString().slice(0, 10);
    const tipTitle = String(req.body?.tipTitle || 'Dica do Dia').slice(0, 200);
    const ref = db.collection('users').doc(userId).collection('dailyTips').doc(date);
    const snap = await ref.get();
    if (snap.exists && (snap.data()?.read || snap.data()?.answered)) {
      const userSnap = await db.collection('users').doc(userId).get();
      return res.json({ success: true, user: userSnap.data(), userPoints: Number(userSnap.data()?.points || 0), earnedPoints: 0, achievements: [] });
    }
    const now = new Date().toISOString();
    await ref.set({ userId, date, tipTitle, read: true, readPoints: 20, pointsEarned: 20, timestamp: now }, { merge: true });
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    const user = userSnap.data() || {};
    const points = Number(user.points || 0) + 20;
    const lastActivity = { themeId: 'daily_tip', title: `📖 Leitura da Dica: ${tipTitle}`, timestamp: now };
    await userRef.set({ points, lastActivity, updatedAt: now }, { merge: true });
    const txId = `pt-daily-read-${date}-${Date.now()}`;
    await userRef.collection('pointsHistory').doc(txId).set({ id: txId, userId, amount: 20, reason: `📖 Leitura da Dica TIC (+20 XP): ${tipTitle}`, timestamp: now });
    await syncPublicProfile(userId);
    return res.json({ success: true, user: { ...user, points, lastActivity }, userPoints: points, earnedPoints: 20, achievements: [] });
  } catch (error) {
    console.error('Daily tip read error:', error);
    return res.status(500).json({ error: 'Não foi possível registar a leitura da Dica do Dia.' });
  }
});

app.post('/api/daily-tip/answer', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const date = validateDate(req.body?.dateStr) || new Date().toISOString().slice(0, 10);
    const tipTitle = String(req.body?.tipTitle || 'Dica do Dia').slice(0, 200);
    const selectedOptionId = String(req.body?.selectedOptionId || '').slice(0, 100);
    if (!selectedOptionId) return res.status(400).json({ error: 'Resposta da Dica do Dia não fornecida.' });
    const ref = db.collection('users').doc(userId).collection('dailyTips').doc(date);
    const snap = await ref.get();
    const existing = snap.exists ? (snap.data() || {}) : {};
    if (existing.answered) {
      const userSnap = await db.collection('users').doc(userId).get();
      return res.json({ success: true, user: userSnap.data(), userPoints: Number(userSnap.data()?.points || 0), earnedPoints: 0, readingPoints: Number(existing.readPoints || 0), answerPoints: Number(existing.answerPoints || 0), achievements: [] });
    }
    const evaluation = evaluateDailyTipSubmission(date, selectedOptionId) as any;
    const correct = Boolean(evaluation?.isCorrect ?? evaluation?.correct);
    const readingPoints = existing.read ? 0 : 20;
    const answerPoints = correct ? 30 : 0;
    const earned = readingPoints + answerPoints;
    const now = new Date().toISOString();
    await ref.set({ userId, date, tipTitle, read: true, readPoints: Number(existing.readPoints || 20), answered: true, selectedOptionId, isCorrect: correct, answerPoints, pointsEarned: Number(existing.pointsEarned || 0) + earned, timestamp: now }, { merge: true });
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    const user = userSnap.data() || {};
    const points = Number(user.points || 0) + earned;
    const lastActivity = { themeId: 'daily_tip', title: correct ? `🎉 Resposta Certa na Dica: ${tipTitle}` : `💡 Dica: ${tipTitle}`, timestamp: now };
    await userRef.set({ points, lastActivity, updatedAt: now }, { merge: true });
    if (earned > 0) {
      const txId = `pt-daily-ans-${date}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
      await userRef.collection('pointsHistory').doc(txId).set({ id: txId, userId, amount: earned, reason: correct ? `🎉 Resposta Certa na Dica TIC (+${earned} XP): ${tipTitle}` : `📖 Leitura da Dica TIC (+${earned} XP): ${tipTitle}`, timestamp: now });
    }
    await syncPublicProfile(userId);
    return res.json({ success: true, user: { ...user, points, lastActivity }, userPoints: points, earnedPoints: earned, readingPoints, answerPoints, achievements: [] });
  } catch (error) {
    console.error('Daily tip answer error:', error);
    return res.status(500).json({ error: 'Não foi possível registar a resposta da Dica do Dia.' });
  }
});

app.get('/api/daily-tip/status', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const date = validateDate(req.query.date) || new Date().toISOString().slice(0, 10);
    const snap = await db.collection('users').doc(req.userId!).collection('dailyTips').doc(date).get();
    if (!snap.exists) return res.json(null);
    const d = snap.data() || {};
    return res.json({ read: !!d.read, answered: !!d.answered, selectedOptionId: d.selectedOptionId || '', isCorrect: !!d.isCorrect, pointsEarned: Number(d.pointsEarned || 0), readPoints: Number(d.readPoints || 0), answerPoints: Number(d.answerPoints || 0), timestamp: d.timestamp || d.createdAt || '' });
  } catch (error) {
    console.error('Daily tip status error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar o estado da Dica do Dia.' });
  }
});

/* ============================================================
   TEACHER — STUDENTS
   ============================================================ */

async function deleteStudentCompletely(userId: string): Promise<boolean> {
  if (!userId) return false;
  const userRef = db.collection('users').doc(userId);
  const userSnap = await userRef.get();
  if (userSnap.exists) {
    const user = userSnap.data() || {};
    if (
      user.role === 'teacher' ||
      user.role === 'admin' ||
      userId === 'admin_carla_oliveira_by' ||
      (user.email && isTeacherEmail(normalizeEmail(user.email)))
    ) {
      throw new Error('Não é permitido eliminar uma conta de professor ou administrador.');
    }
  }

  // 1. Eliminação recursiva no Firestore: elimina o documento e TODAS as subcoleções
  // (pointsHistory, progress, achievements, dailyTips, etc.) sem deixar documentos-fantasma/residuais em itálico
  try {
    await db.recursiveDelete(userRef);
  } catch (err) {
    console.warn(`Aviso ao eliminar recursivamente utilizador ${userId}:`, err);
  }

  // 2. Eliminar credenciais de autenticação na coleção credentials
  try {
    await db.collection('credentials').doc(userId).delete();
  } catch (err) {
    console.warn(`Aviso ao eliminar credencial de ${userId}:`, err);
  }

  // 3. Eliminar perfil público na coleção publicProfiles
  try {
    await db.collection('publicProfiles').doc(userId).delete();
  } catch (err) {
    console.warn(`Aviso ao eliminar perfil público de ${userId}:`, err);
  }

  return true;
}

/**
 * Limpeza profunda e completa de todos os alunos e quaisquer resíduos na base de dados.
 * Garante que:
 * - Apenas as contas de professor/admin permanecem
 * - Todas as subcoleções órfãs (pointsHistory, progress, achievements, dailyTips) são eliminadas
 * - Todas as credenciais de alunos são eliminadas
 * - Todos os perfis públicos de alunos são eliminados
 */
async function purgeAllStudentDataAndResiduals(): Promise<{ deletedCount: number; purgedResidualsCount: number }> {
  // 1. Identificar com segurança absoluta todas as contas de professor / admin
  const teacherSnaps = await db.collection('users').where('role', 'in', ['teacher', 'admin']).get();
  const teacherIds = new Set<string>(teacherSnaps.docs.map(d => d.id));
  teacherIds.add('admin_carla_oliveira_by');

  for (const doc of teacherSnaps.docs) {
    const data = doc.data();
    if (data?.email && isTeacherEmail(normalizeEmail(data.email))) {
      teacherIds.add(doc.id);
    }
  }

  let deletedCount = 0;
  let purgedResidualsCount = 0;

  // 2. Apagar todos os utilizadores que não são professores na coleção 'users'
  const allUsersSnap = await db.collection('users').get();
  for (const doc of allUsersSnap.docs) {
    if (teacherIds.has(doc.id)) continue;
    const data = doc.data();
    if (data.role === 'teacher' || data.role === 'admin' || (data.email && isTeacherEmail(normalizeEmail(data.email)))) {
      teacherIds.add(doc.id);
      continue;
    }
    await deleteStudentCompletely(doc.id);
    deletedCount++;
  }

  // 3. Varrer Collection Groups para apagar qualquer subcoleção órfã residual (os ficheiros residuais em itálico que ficavam no Firestore)
  for (const groupName of ['pointsHistory', 'progress', 'achievements', 'dailyTips']) {
    try {
      const groupSnap = await db.collectionGroup(groupName).get();
      for (const doc of groupSnap.docs) {
        const parts = doc.ref.path.split('/');
        // Formato: users/{userId}/{groupName}/{docId}
        if (parts[0] === 'users' && parts[1]) {
          const uId = parts[1];
          if (!teacherIds.has(uId)) {
            await doc.ref.delete().catch(() => {});
            await db.recursiveDelete(db.collection('users').doc(uId)).catch(() => {});
            purgedResidualsCount++;
          }
        }
      }
    } catch (err) {
      console.warn(`Erro ao limpar collectionGroup ${groupName}:`, err);
    }
  }

  // 4. Limpar coleção 'credentials' (apenas credenciais de alunos/órfãos, mantendo professores)
  try {
    const credsSnap = await db.collection('credentials').get();
    for (const doc of credsSnap.docs) {
      if (!teacherIds.has(doc.id)) {
        await doc.ref.delete().catch(() => {});
        purgedResidualsCount++;
      }
    }
  } catch (err) {
    console.warn('Erro ao limpar credentials residuais:', err);
  }

  // 5. Limpar coleção 'publicProfiles' (apenas perfis de alunos/órfãos, mantendo professores)
  try {
    const profilesSnap = await db.collection('publicProfiles').get();
    for (const doc of profilesSnap.docs) {
      if (!teacherIds.has(doc.id)) {
        await doc.ref.delete().catch(() => {});
        purgedResidualsCount++;
      }
    }
  } catch (err) {
    console.warn('Erro ao limpar publicProfiles residuais:', err);
  }

  return { deletedCount, purgedResidualsCount };
}

app.get('/api/teacher/students', requireAuth, requireTeacher, async (_req, res) => {
  try {
    const snap = await db.collection('users').limit(1000).get();
    const students = snap.docs
      .filter(d => {
        const u = d.data();
        return u.role !== 'teacher' && u.role !== 'admin' && !isTeacherEmail(u.email);
      })
      .map(d => {
        const u = d.data();
        return {
          id: d.id,
          name: u.name,
          fullName: u.fullName || u.name,
          firstName: u.firstName,
          lastName: u.lastName,
          greetingName: u.greetingName,
          username: u.username || (u.email ? u.email.split('@')[0] : ''),
          initialPassword: u.initialPassword || u.password || '',
          email: u.email,
          publicId: u.publicId,
          turma: u.turma,
          role: u.role || 'student',
          language: u.language,
          points: Number(u.points || 0),
          createdAt: u.createdAt,
          avatar: u.avatar,
          lastActivity: u.lastActivity,
        };
      });
    return res.json({ success: true, students });
  } catch (error) {
    console.error('Teacher students error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar os alunos.' });
  }
});

/* ============================================================
   TEACHER — IMPORT STUDENTS BATCH (XLS/XLSX)
   ============================================================ */

app.post('/api/teacher/students/import-batch', requireAuth, requireTeacher, async (req, res) => {
  try {
    const rawStudents = Array.isArray(req.body?.students) ? req.body.students : [];
    const defaultTurma = req.body?.defaultTurma ? normalizeTurmaName(String(req.body.defaultTurma)) : '';

    if (rawStudents.length === 0) {
      return res.status(400).json({ error: 'Nenhum aluno fornecido para importação.' });
    }

    // 1. Fetch existing users to check collisions and avoid duplicates
    const existingSnap = await db.collection('users').limit(1000).get();
    const existingUsernames = new Set<string>();
    const existingPasswords = new Set<string>();
    const existingStudentsMap = new Map<string, any>();

    for (const doc of existingSnap.docs) {
      const data = doc.data();
      if (data.username) existingUsernames.add(String(data.username).toLowerCase());
      if (data.initialPassword) existingPasswords.add(String(data.initialPassword));
      if (data.password) existingPasswords.add(String(data.password));
      if (data.turma && data.name) {
        const key = `${normalizeTurmaName(data.turma)}__${String(data.name).trim().toLowerCase()}`;
        existingStudentsMap.set(key, { id: doc.id, ...data });
      }
    }

    const created: any[] = [];
    const existed: any[] = [];
    const errors: any[] = [];

    // Process students
    for (const item of rawStudents) {
      const rawName = String(item?.name || item?.Nome || item?.nome || item?.aluno || '').trim();
      const rawTurma = String(item?.turma || item?.Turma || defaultTurma || '5.º A').trim();

      if (!rawName) {
        errors.push({ item, error: 'Linha com nome vazio.' });
        continue;
      }

      const normalizedTurma = normalizeTurmaName(rawTurma);
      const studentKey = `${normalizedTurma}__${rawName.toLowerCase()}`;

      if (existingStudentsMap.has(studentKey)) {
        const found = existingStudentsMap.get(studentKey);
        existed.push({
          name: rawName,
          turma: normalizedTurma,
          username: found.username || '',
          initialPassword: found.initialPassword || '',
        });
        continue;
      }

      try {
        const { fullName, firstName, lastName, greetingName } = parseStudentName(rawName);
        const username = generateKidUsername(fullName, normalizedTurma, existingUsernames);
        const password = generateKidPassword(existingPasswords);
        const userId = crypto.randomUUID();
        const now = new Date().toISOString();

        const hashed = await hashPassword(password);
        const publicId = username.toUpperCase();

        const userData = {
          id: userId,
          name: fullName,
          fullName: fullName,
          firstName: firstName,
          lastName: lastName,
          greetingName: greetingName,
          username: username,
          initialPassword: password,
          turma: normalizedTurma,
          email: `${username}@aluno.tic`,
          publicId: publicId,
          role: 'student',
          language: 'pt',
          points: 0,
          xp: 0,
          avatar: getDefaultAvatar(username),
          createdAt: now,
          updatedAt: now,
        };

        const credData = {
          userId,
          passwordHash: hashed.hash,
          passwordSalt: hashed.salt,
          createdAt: now,
          updatedAt: now,
        };

        const publicData = {
          id: userId,
          publicId: publicId,
          turma: normalizedTurma,
          avatar: getDefaultAvatar(username),
          points: 0,
          role: 'student',
        };

        const batch = db.batch();
        batch.set(db.collection('users').doc(userId), userData);
        batch.set(db.collection('credentials').doc(userId), credData);
        batch.set(db.collection('publicProfiles').doc(userId), publicData);

        await batch.commit();

        created.push({
          id: userId,
          name: fullName,
          turma: normalizedTurma,
          username,
          password,
        });

        existingStudentsMap.set(studentKey, userData);
      } catch (err: any) {
        errors.push({ name: rawName, turma: normalizedTurma, error: err.message || 'Erro ao criar conta.' });
      }
    }

    return res.json({
      success: true,
      summary: {
        totalInFile: rawStudents.length,
        createdCount: created.length,
        existedCount: existed.length,
        errorsCount: errors.length,
      },
      created,
      existed,
      errors,
    });
  } catch (error) {
    console.error('Teacher import students error:', error);
    return res.status(500).json({ error: 'Falha ao importar alunos.' });
  }
});

/* ============================================================
   TEACHER — RECALIBRATE STUDENT POINTS (REMOVE ARTIFICIAL 100 XP)
   ============================================================ */

async function recalibrateStudentsPoints() {
  let updatedCount = 0;
  const snap = await db.collection('users').where('role', '==', 'student').limit(500).get();
  for (const doc of snap.docs) {
    const u = doc.data();
    const userRef = doc.ref;

    // Remove pt-welcome docs from pointsHistory
    const phSnap = await userRef.collection('pointsHistory').get();
    let hadWelcome = false;
    for (const phDoc of phSnap.docs) {
      const phData = phDoc.data();
      if (phDoc.id.startsWith('pt-welcome-') || (phData.reason && phData.reason.includes('Boas-vindas'))) {
        hadWelcome = true;
        await phDoc.ref.delete().catch(() => {});
      }
    }

    // Sum real challenges progress
    const progSnap = await userRef.collection('progress').get();
    let challengesSum = 0;
    for (const p of progSnap.docs) {
      const pData = p.data();
      const pId = String(pData.activityId || p.id);
      const isQ = isLearningQuizServer(pId, pData.activityType);
      const pBest = Math.max(0, Math.min(100, Math.round(Number(pData.bestScore ?? pData.bestPercentage ?? pData.score ?? 0))));
      if (!isQ) {
        challengesSum += pBest;
      }
    }

    // Sum daily tips
    const dailySnap = await userRef.collection('dailyTips').get();
    let dailySum = 0;
    for (const d of dailySnap.docs) {
      dailySum += Math.max(0, Math.min(1000, Math.round(Number(d.data()?.pointsEarned || 0))));
    }

    // Sum badges bonus
    const achSnap = await userRef.collection('achievements').get();
    let achBonus = 0;
    const achIds = new Set(achSnap.docs.map((d) => d.id));
    for (const b of BADGES) {
      if (achIds.has(b.id)) {
        achBonus += b.pointsBonus || 0;
      }
    }

    const realEarnedPoints = challengesSum + dailySum + achBonus;
    if (hadWelcome || Number(u.points || 0) !== realEarnedPoints) {
      await userRef.update({
        points: realEarnedPoints,
        xp: realEarnedPoints,
      }).catch(() => {});
      await db.collection('publicProfiles').doc(doc.id).set({
        points: realEarnedPoints,
      }, { merge: true }).catch(() => {});
      updatedCount++;
    }
  }
  return updatedCount;
}

app.post('/api/teacher/students/recalibrate-points', requireAuth, requireTeacher, async (_req, res) => {
  try {
    const updatedCount = await recalibrateStudentsPoints();
    return res.json({
      success: true,
      message: `Pontuações sincronizadas com sucesso. ${updatedCount} alunos ajustados para a pontuação real ganha nas atividades.`,
      updatedCount,
    });
  } catch (error) {
    console.error('Recalibrate points error:', error);
    return res.status(500).json({ error: 'Falha ao sincronizar pontuações.' });
  }
});

/* ============================================================
   TEACHER — RESET STUDENT PASSWORD
   ============================================================ */

app.post('/api/teacher/students/:userId/reset-password', requireAuth, requireTeacher, async (req, res) => {
  try {
    const userId = String(req.params.userId || '').trim();
    if (!isValidUserId(userId)) return res.status(400).json({ error: 'ID de utilizador inválido.' });

    const userRef = db.collection('users').doc(userId);
    const snap = await userRef.get();
    if (!snap.exists || snap.data()?.role !== 'student') {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    // Collect all existing passwords
    const allUsers = await db.collection('users').limit(1000).get();
    const existingPasswords = new Set<string>();
    for (const d of allUsers.docs) {
      const u = d.data();
      if (u.initialPassword) existingPasswords.add(String(u.initialPassword));
    }

    const newPassword = generateKidPassword(existingPasswords);
    const hashed = await hashPassword(newPassword);
    const now = new Date().toISOString();

    await db.collection('credentials').doc(userId).set({
      userId,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      updatedAt: now,
    }, { merge: true });

    await userRef.set({
      initialPassword: newPassword,
      updatedAt: now,
    }, { merge: true });

    return res.json({
      success: true,
      newPassword,
      message: 'Palavra-passe redefinida com sucesso!',
    });
  } catch (error) {
    console.error('Reset student password error:', error);
    return res.status(500).json({ error: 'Não foi possível redefinir a palavra-passe.' });
  }
});

app.get('/api/teacher/students/:userId/progress', requireAuth, requireTeacher, async (req, res) => {
  try {
    const userId = String(req.params.userId || '').trim();
    if (!userId) return res.status(400).json({ error: 'ID de utilizador inválido.' });
    const userSnap = await db.collection('users').doc(userId).get();
    if (!userSnap.exists) return res.status(404).json({ error: 'Aluno não encontrado.' });
    const uData = userSnap.data() || {};
    if (uData.role === 'teacher' || uData.role === 'admin' || isTeacherEmail(uData.email)) {
      return res.status(404).json({ error: 'Utilizador não é um aluno.' });
    }
    const snap = await db.collection('users').doc(userId).collection('progress').get();
    return res.json({ success: true, progress: snap.docs.map(d => ({ id: d.id, ...d.data() })) });
  } catch (error) {
    console.error('Teacher student progress error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar o progresso do aluno.' });
  }
});

app.post('/api/teacher/students/progress-batch', requireAuth, requireTeacher, async (req, res) => {
  try {
    const studentIds: string[] = Array.isArray(req.body?.studentIds) ? req.body.studentIds : [];
    if (studentIds.length === 0) return res.json({ success: true, progressMap: {} });

    const progressMap: Record<string, unknown[]> = {};
    await Promise.allSettled(
      studentIds.map(async (sid) => {
        if (!sid) return;
        try {
          const snap = await db.collection('users').doc(sid).collection('progress').get();
          progressMap[sid] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch {
          progressMap[sid] = [];
        }
      })
    );
    return res.json({ success: true, progressMap });
  } catch (error) {
    console.error('Teacher progress-batch error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar o progresso dos alunos em lote.' });
  }
});

app.patch('/api/teacher/students/:userId', requireAuth, requireTeacher, async (req, res) => {
  try {
    const userId = String(req.params.userId || '');
    if (!isValidUserId(userId)) return res.status(400).json({ error: 'ID de utilizador inválido.' });
    const userRef = db.collection('users').doc(userId);
    const snap = await userRef.get();
    if (!snap.exists || snap.data()?.role !== 'student') return res.status(404).json({ error: 'Aluno não encontrado.' });
    const body = req.body || {};
    const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    if (body.newName !== undefined) {
      const name = String(body.newName).trim();
      if (!name || name.length > 100) return res.status(400).json({ error: 'Nome inválido.' });
      updates.name = name;
    }
    if (body.newTurma !== undefined) {
      const turma = String(body.newTurma).trim();
      if (turma.length > 50) return res.status(400).json({ error: 'Turma inválida.' });
      updates.turma = turma;
    }
    if (Object.keys(updates).length > 1) await userRef.set(updates, { merge: true });
    if (body.newPassword !== undefined) {
      const password = String(body.newPassword);
      if (!isValidPassword(password)) return res.status(400).json({ error: 'A palavra-passe deve ter entre 8 e 128 caracteres.' });
      const h = await hashPassword(password);
      await db.collection('credentials').doc(userId).set({ userId, passwordHash: h.hash, passwordSalt: h.salt, updatedAt: new Date().toISOString() }, { merge: true });
    }
    await syncPublicProfile(userId);
    return res.json({ success: true, message: 'Aluno atualizado com sucesso.' });
  } catch (error) {
    console.error('Teacher update student error:', error);
    return res.status(500).json({ error: 'Não foi possível atualizar o aluno.' });
  }
});

app.delete('/api/teacher/students/:userId', requireAuth, requireTeacher, async (req, res) => {
  try {
    const userId = String(req.params.userId || '');
    if (!isValidUserId(userId)) return res.status(400).json({ error: 'ID de utilizador inválido.' });
    const deleted = await deleteStudentCompletely(userId);
    if (!deleted) return res.status(404).json({ error: 'Aluno não encontrado.' });
    return res.json({ success: true, message: 'Aluno eliminado com sucesso.' });
  } catch (error) {
    console.error('Delete student error:', error);
    return res.status(error instanceof Error && error.message.includes('professor') ? 403 : 500).json({ error: error instanceof Error ? error.message : 'Não foi possível eliminar o aluno.' });
  }
});

async function resolveStudentIds(values: unknown): Promise<string[]> {
  if (!Array.isArray(values)) return [];
  const result = new Set<string>();
  for (const value of values.slice(0, 500)) {
    const s = String(value || '').trim();
    if (!s) continue;
    if (isValidUserId(s)) {
      const snap = await db.collection('users').doc(s).get();
      if (snap.exists && snap.data()?.role === 'student') result.add(s);
      continue;
    }
    const q = await db.collection('users').where('email', '==', normalizeEmail(s)).limit(1).get();
    if (!q.empty && q.docs[0].data()?.role === 'student') result.add(q.docs[0].id);
  }
  return [...result];
}

app.post('/api/teacher/students/bulk-delete', requireAuth, requireTeacher, async (req, res) => {
  try {
    const ids = await resolveStudentIds(req.body?.students);
    let deletedCount = 0;
    for (const id of ids) if (await deleteStudentCompletely(id)) deletedCount++;
    return res.json({ success: true, deletedCount, message: `${deletedCount} aluno(s) eliminado(s).` });
  } catch (error) { console.error(error); return res.status(500).json({ error: 'Não foi possível eliminar os alunos.' }); }
});

app.post('/api/teacher/students/delete-by-turmas', requireAuth, requireTeacher, async (req, res) => {
  try {
    const turmas = Array.isArray(req.body?.turmas) ? req.body.turmas.map((x: unknown) => String(x).trim().toLowerCase()).filter(Boolean).slice(0, 100) : [];
    const snap = await db.collection('users').where('role', '==', 'student').limit(500).get();
    let deletedCount = 0;
    for (const d of snap.docs) if (turmas.includes(String(d.data()?.turma || '').trim().toLowerCase()) && await deleteStudentCompletely(d.id)) deletedCount++;
    return res.json({ success: true, deletedCount, message: `${deletedCount} aluno(s) eliminado(s).` });
  } catch (error) { console.error(error); return res.status(500).json({ error: 'Não foi possível eliminar os alunos das turmas.' }); }
});

app.post('/api/teacher/students/delete-all', requireAuth, requireTeacher, async (_req, res) => {
  try {
    const { deletedCount, purgedResidualsCount } = await purgeAllStudentDataAndResiduals();
    return res.json({
      success: true,
      deletedCount,
      purgedResidualsCount,
      message: `Base de dados limpa com sucesso: ${deletedCount} conta(s) de aluno e todos os dados/resíduos foram totalmente eliminados. Apenas a conta de professor(a) foi mantida intacta.`,
    });
  } catch (error) {
    console.error('Delete-all students error:', error);
    return res.status(500).json({ error: 'Não foi possível eliminar todos os alunos e limpar a base de dados.' });
  }
});

app.post('/api/teacher/students/purge-residuals', requireAuth, requireTeacher, async (_req, res) => {
  try {
    const { deletedCount, purgedResidualsCount } = await purgeAllStudentDataAndResiduals();
    return res.json({
      success: true,
      deletedCount,
      purgedResidualsCount,
      message: `Varredura e limpeza de resíduos concluída: ${purgedResidualsCount} registo(s) residual(is) e ${deletedCount} aluno(s) eliminados com sucesso.`,
    });
  } catch (error) {
    console.error('Purge residuals error:', error);
    return res.status(500).json({ error: 'Não foi possível concluir a limpeza de resíduos da base de dados.' });
  }
});

/* ============================================================
   TEACHER — TURMAS
   ============================================================ */

async function getTurmas(): Promise<string[]> {
  const snap = await db.collection('config').doc('turmas').get();
  const data = snap.exists ? snap.data() || {} : {};
  const values = Array.isArray(data.turmas) ? data.turmas : Array.isArray(data.list) ? data.list : [];
  return [...new Set(values.map((x: unknown) => String(x).trim()).filter(Boolean))].slice(0, 100);
}

async function saveTurmas(turmas: string[]) {
  const clean = [...new Set(turmas.map(x => String(x).trim()).filter(Boolean))].slice(0, 100);
  await db.collection('config').doc('turmas').set({ turmas: clean, updatedAt: new Date().toISOString() }, { merge: true });
  await db.collection('config').doc('school_turmas').set({ turmas: clean, updatedAt: new Date().toISOString() }, { merge: true });
  return clean;
}

app.post('/api/teacher/turmas', requireAuth, requireTeacher, async (req, res) => {
  try {
    const name = String(req.body?.turmaName || '').trim();
    if (!name || name.length > 50) return res.status(400).json({ error: 'Nome da turma inválido.' });
    const turmas = await getTurmas();
    if (!turmas.some(t => t.toLowerCase() === name.toLowerCase())) turmas.push(name);
    const saved = await saveTurmas(turmas);
    return res.json({ success: true, turmas: saved, message: 'Turma criada com sucesso.' });
  } catch (error) { console.error(error); return res.status(500).json({ error: 'Não foi possível criar a turma.' }); }
});

app.post('/api/teacher/turmas/delete', requireAuth, requireTeacher, async (req, res) => {
  try {
    const names = Array.isArray(req.body?.turmas) ? req.body.turmas.map((x: unknown) => String(x).trim()).filter(Boolean) : [];
    const remove = new Set(names.map(x => x.toLowerCase()));
    const current = await getTurmas();
    const saved = await saveTurmas(current.filter(t => !remove.has(t.toLowerCase())));
    let deletedStudentsCount = 0;
    if (req.body?.deleteStudentsToo) {
      const snap = await db.collection('users').where('role', '==', 'student').limit(500).get();
      for (const d of snap.docs) if (remove.has(String(d.data()?.turma || '').trim().toLowerCase()) && await deleteStudentCompletely(d.id)) deletedStudentsCount++;
    }
    return res.json({ success: true, turmas: saved, deletedStudentsCount, message: 'Turmas atualizadas com sucesso.' });
  } catch (error) { console.error(error); return res.status(500).json({ error: 'Não foi possível eliminar as turmas.' }); }
});

/* ============================================================
   TEACHER — CONFIG
   ============================================================ */

async function saveVisibilityConfig(docId: string, visibility: unknown) {
  if (!visibility || typeof visibility !== 'object' || Array.isArray(visibility)) throw new Error('Configuração inválida.');
  const safe: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(visibility as Record<string, unknown>).slice(0, 100)) {
    if (/^[A-Za-z0-9_.-]{1,100}$/.test(key)) safe[key] = Boolean(value);
  }
  await db.collection('config').doc(docId).set({ visibility: safe, updatedAt: new Date().toISOString() }, { merge: true });
  return safe;
}

app.put('/api/teacher/config/theme-visibility', requireAuth, requireTeacher, async (req, res) => {
  try { const visibility = await saveVisibilityConfig('theme_visibility', req.body?.visibility); return res.json({ success: true, visibility, message: 'Visibilidade dos temas guardada.' }); }
  catch (error) { console.error(error); return res.status(400).json({ error: 'Não foi possível guardar a visibilidade dos temas.' }); }
});

app.put('/api/teacher/config/quiz-visibility', requireAuth, requireTeacher, async (req, res) => {
  try { const visibility = await saveVisibilityConfig('quiz_visibility', req.body?.visibility); return res.json({ success: true, visibility, message: 'Visibilidade dos quizzes guardada.' }); }
  catch (error) { console.error(error); return res.status(400).json({ error: 'Não foi possível guardar a visibilidade dos quizzes.' }); }
});

/* ============================================================
   BADGES
   ============================================================ */

app.post('/api/badges/evaluate', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const userRef = db.collection('users').doc(userId);
    const [progressSnap, achievementSnap, userSnap] = await Promise.all([
      userRef.collection('progress').get(), userRef.collection('achievements').get(), userRef.get(),
    ]);
    const activities = progressSnap.docs.map(d => d.data()).filter(p => isValidActivityId(String(p.activityId || ''))).map(p => ({ activityId: p.activityId, activityType: p.activityType, status: p.status, percentage: p.percentage, bestPercentage: p.bestPercentage }));
    const points = Number(userSnap.data()?.points || 0);
    const result = evaluateBadgesEarned(activities as any, points, achievementSnap.docs.map(d => d.id));
    const newBadges = result.newlyUnlockedBadges || [];
    const now = new Date().toISOString();
    for (const badge of newBadges as any[]) await userRef.collection('achievements').doc(badge.badgeId).set({ userId, badgeId: badge.badgeId, unlockedAt: now });
    return res.json({ success: true, newlyUnlockedBadges: newBadges, totalBonusPoints: Number(result.totalBonusPoints || 0) });
  } catch (error) { console.error(error); return res.status(500).json({ error: 'Erro na avaliação das conquistas.' }); }
});
/* ============================================================
   ERROR HANDLER
   ============================================================ */

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', error);
  if (res.headersSent) return;
  return res.status(500).json({ error: 'Erro interno do servidor.' });
});

/* ============================================================
   VITE / STATIC FRONTEND
   ============================================================ */

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath =
      path.join(process.cwd(), 'dist');

    app.use(
      express.static(distPath)
    );

    app.get('*', (_req, res) => {
      res.sendFile(
        path.join(
          distPath,
          'index.html'
        )
      );
    });
  }

  app.listen(
    PORT,
    '0.0.0.0',
    () => {
      console.log(
        `TIC 5 — Descomplica! running on port ${PORT}`
      );
      // Run asynchronous recalibration to ensure no student holds unearned 100 XP
      recalibrateStudentsPoints().then((cnt) => {
        if (cnt > 0) {
          console.log(`[XP Sync] Recalibrated ${cnt} student accounts to exact earned XP.`);
        }
      }).catch((err) => {
        console.warn('[XP Sync] Notice during initial startup recalibration:', err);
      });
    }
  );
}

startServer().catch((error) => {
  console.error(
    'Fatal server startup error:',
    error
  );

  process.exit(1);
});
