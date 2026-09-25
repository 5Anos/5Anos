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
  getStudentCardPassword,
} from './src/utils/studentCredentials';
import { getDefaultAvatar } from './src/utils/avatarUtils';

import JSZip from 'jszip';
import * as XLSX from 'xlsx';

const app = express();
const PORT = 3000;

app.disable('x-powered-by');

/* ============================================================
   RATE LIMITING & BRUTE FORCE DEFENSE (IP & IDENTIFIER)
   ============================================================ */

interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const loginRateLimits = new Map<string, RateLimitRecord>();
const generalRateLimits = new Map<string, RateLimitRecord>();

// Cleanup rate limits every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginRateLimits.entries()) {
    if (now - record.lastAttempt > 30 * 60 * 1000 && (!record.lockedUntil || now > record.lockedUntil)) {
      loginRateLimits.delete(key);
    }
  }
  for (const [key, record] of generalRateLimits.entries()) {
    if (now - record.lastAttempt > 15 * 60 * 1000) {
      generalRateLimits.delete(key);
    }
  }
}, 10 * 60 * 1000);

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown-ip';
}

function checkLoginRateLimit(ip: string, identifier?: string): { allowed: boolean; delayMs: number; error?: string } {
  const now = Date.now();
  const ipKey = `ip_${ip}`;
  const idKey = identifier ? `id_${identifier.toLowerCase().trim()}` : null;

  const ipRecord = loginRateLimits.get(ipKey);
  const idRecord = idKey ? loginRateLimits.get(idKey) : null;

  // Check locks (15 min lock after 5 consecutive failures)
  if (ipRecord?.lockedUntil && now < ipRecord.lockedUntil) {
    const minutesLeft = Math.ceil((ipRecord.lockedUntil - now) / 60000);
    return { allowed: false, delayMs: 0, error: `Demasiadas tentativas de início de sessão. Por favor, aguarda ${minutesLeft} minutos.` };
  }
  if (idRecord?.lockedUntil && now < idRecord.lockedUntil) {
    const minutesLeft = Math.ceil((idRecord.lockedUntil - now) / 60000);
    return { allowed: false, delayMs: 0, error: `Conta temporariamente bloqueada por segurança. Por favor, aguarda ${minutesLeft} minutos.` };
  }

  // Progressive delay based on attempt count
  const attempts = Math.max(ipRecord?.count || 0, idRecord?.count || 0);
  let delayMs = 0;
  if (attempts >= 2) delayMs = 500;
  if (attempts >= 3) delayMs = 1000;
  if (attempts >= 4) delayMs = 2000;

  return { allowed: true, delayMs };
}

function recordLoginFailure(ip: string, identifier?: string) {
  const now = Date.now();
  const keys = [`ip_${ip}`];
  if (identifier) keys.push(`id_${identifier.toLowerCase().trim()}`);

  for (const k of keys) {
    const record = loginRateLimits.get(k) || { count: 0, firstAttempt: now, lastAttempt: now };
    record.count += 1;
    record.lastAttempt = now;
    if (record.count >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000; // 15 minutes lockout
    }
    loginRateLimits.set(k, record);
  }
}

function clearLoginRateLimit(ip: string, identifier?: string) {
  loginRateLimits.delete(`ip_${ip}`);
  if (identifier) loginRateLimits.delete(`id_${identifier.toLowerCase().trim()}`);
}

function createGeneralRateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = getClientIp(req);
    const key = `${req.path}_${ip}`;
    const now = Date.now();
    const record = generalRateLimits.get(key) || { count: 0, firstAttempt: now, lastAttempt: now };

    if (now - record.firstAttempt > windowMs) {
      record.count = 1;
      record.firstAttempt = now;
    } else {
      record.count += 1;
    }
    record.lastAttempt = now;
    generalRateLimits.set(key, record);

    if (record.count > maxRequests) {
      return res.status(429).json({ error: 'Demasiados pedidos. Por favor aguarda alguns instantes.' });
    }
    next();
  };
}

/* ============================================================
   CORS & SECURITY HEADERS
   ============================================================ */

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/ais-.*\.europe-west2\.run\.app$/,
  /^https:\/\/.*\.run\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^capacitor:\/\/localhost$/,
  /^ionic:\/\/localhost$/,
];

function isOriginAllowed(origin: string): boolean {
  if (!origin || origin === 'null') return true;
  const envOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (envOrigins.includes(origin)) return true;
  return ALLOWED_ORIGIN_PATTERNS.some(pattern => pattern.test(origin));
}

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Vary', 'Origin');

  // Hardened Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.run.app ws: wss:",
    "frame-ancestors 'self' https://*.run.app https://*.google.com https://*.aistudio.google.com",
  ];
  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/* ============================================================
   FIREBASE ADMIN INITIALIZATION
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
    const app = initializeApp({ projectId });
    return customDbId ? getFirestore(app, customDbId) : getFirestore(app);
  }
}

const db = initializeFirebaseAdmin();

/* ============================================================
   PASSWORD HASHING & VERIFICATION (SCRYPT ONLY)
   ============================================================ */

const scryptAsync = promisify(crypto.scrypt);

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

async function hashPassword(password: string, salt?: string): Promise<{ salt: string; hash: string }> {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, actualSalt, 64)) as Buffer;
  return {
    salt: actualSalt,
    hash: derivedKey.toString('hex'),
  };
}

async function verifyPassword(password: string, storedHash: string, salt: string): Promise<boolean> {
  if (!password || !storedHash || !salt) return false;
  try {
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return safeEqual(derivedKey.toString('hex'), storedHash);
  } catch {
    return false;
  }
}

/* ============================================================
   REVOCABLE SESSION TOKENS WITH UNIQUE SESSION ID
   ============================================================ */

const SESSION_SECRET = process.env.SESSION_SECRET || 'plataforma_tic_5ano_default_super_secret_session_key_2026';

// In-memory revoked session set (synced to Firestore collection 'revoked_sessions')
const revokedSessionIds = new Set<string>();

interface SessionPayload {
  userId: string;
  issuedAt: number;
  sessionId: string;
}

function createSessionToken(userId: string): string {
  const issuedAt = Date.now();
  const sessionId = crypto.randomUUID();
  const payload = `${userId}.${issuedAt}.${sessionId}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}.${signature}`).toString('base64url');
}

function verifySessionToken(token: string): SessionPayload | null {
  try {
    if (!SESSION_SECRET || !token) return null;
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('.');
    if (parts.length !== 4) return null;

    const [userId, timestampStr, sessionId, signature] = parts;
    if (!userId || !timestampStr || !sessionId || !signature) return null;

    const payload = `${userId}.${timestampStr}.${sessionId}`;
    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    if (!safeEqual(signature, expectedSignature)) return null;

    const issuedAt = Number(timestampStr);
    if (!Number.isFinite(issuedAt)) return null;

    // 7 days validity
    const MAX_SESSION_AGE = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - issuedAt > MAX_SESSION_AGE) return null;
    if (issuedAt > Date.now() + 60_000) return null;

    // Check if session ID was explicitly revoked on logout
    if (revokedSessionIds.has(sessionId)) return null;

    return { userId, issuedAt, sessionId };
  } catch {
    return null;
  }
}

function revokeSession(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('.');
    if (parts.length === 4) {
      const sessionId = parts[2];
      if (sessionId) {
        revokedSessionIds.add(sessionId);
        db.collection('revoked_sessions').doc(sessionId).set({
          sessionId,
          revokedAt: new Date().toISOString(),
        }).catch(() => {});
        return true;
      }
    }
  } catch {}
  return false;
}

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim() || null;
}

function normalizeEmail(value: unknown): string {
  return String(value || '').trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUserId(userId: string): boolean {
  return /^[A-Za-z0-9_-]{6,128}$/.test(userId);
}

function isValidPassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 4 && password.length <= 128;
}

function isTeacherEmail(email: string): boolean {
  return [
    'imaginebycarla2023@gmail.com',
    'imaginebacarla2023@gmail.com',
    'prof.carla@escola.pt',
    'carla.oliveira@escola.pt',
  ].includes(normalizeEmail(email));
}

function isLearningQuizServer(activityId: string, activityType?: string): boolean {
  return activityType === 'quiz' || activityId.startsWith('quiz-final-') || activityId === 'quiz-final-seguranca' || activityId === 'quiz-final-tema5';
}

/* ============================================================
   AUTHENTICATION MIDDLEWARES
   ============================================================ */

interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: FirebaseFirestore.DocumentData;
  sessionId?: string;
}

async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const token = getBearerToken(req);
    if (!token) return res.status(401).json({ error: 'Sessão não encontrada.' });

    const session = verifySessionToken(token);
    if (!session) return res.status(401).json({ error: 'Sessão inválida ou expirada.' });

    const userDoc = await db.collection('users').doc(session.userId).get();
    if (!userDoc.exists) return res.status(401).json({ error: 'Utilizador não encontrado.' });

    const user = userDoc.data();
    if (!user || user.id !== session.userId) return res.status(401).json({ error: 'Sessão inválida.' });

    // Check if user's password was changed after this session token was issued
    const credDoc = await db.collection('credentials').doc(session.userId).get();
    if (credDoc.exists) {
      const credData = credDoc.data() || {};
      if (credData.passwordChangedAt) {
        const changedTime = new Date(credData.passwordChangedAt).getTime();
        if (Number.isFinite(changedTime) && session.issuedAt < changedTime) {
          return res.status(401).json({ error: 'A palavra-passe foi alterada. Por favor inicia sessão novamente.' });
        }
      }
    }

    req.userId = session.userId;
    req.user = user;
    req.sessionId = session.sessionId;
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({ error: 'Erro ao validar a sessão.' });
  }
}

async function requireTeacher(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || !req.userId) return res.status(401).json({ error: 'Sessão necessária.' });
  const role = req.user.role;
  const email = normalizeEmail(req.user.email);
  if (role === 'teacher' || role === 'admin' || isTeacherEmail(email)) return next();
  return res.status(403).json({ error: 'Apenas a professora pode executar esta operação.' });
}

/* ============================================================
   HEALTH & AUTH ENDPOINTS
   ============================================================ */

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Plataforma TIC 5 — Descomplica!',
    database: 'Cloud Firestore',
    authentication: 'custom-server-session-revocable',
  });
});

app.post('/api/auth/register', async (_req, res) => {
  return res.status(403).json({
    error: 'A criação autónoma de contas foi desativada. As contas dos alunos são criadas e geridas pela professora de TIC.',
  });
});

app.post('/api/auth/reset-password', async (_req, res) => {
  return res.status(403).json({
    error: 'A recuperação autónoma de palavra-passe foi desativada por segurança. A professora de TIC pode redefinir a palavra-passe no painel de gestão de alunos.',
  });
});

// LOGIN (Strict Scrypt Hash Verification + Rate Limiting + Anti-Enumeration)
app.post('/api/auth/login', async (req, res) => {
  const ip = getClientIp(req);
  try {
    const { email, username, identifier: rawIdentifier, password } = req.body || {};
    const rawInput = String(rawIdentifier || username || email || '').trim();
    const identifier = rawInput.toLowerCase();

    // Rate limiting check
    const rateCheck = checkLoginRateLimit(ip, identifier);
    if (!rateCheck.allowed) {
      return res.status(429).json({ error: rateCheck.error });
    }
    if (rateCheck.delayMs > 0) {
      await new Promise(r => setTimeout(r, rateCheck.delayMs));
    }

    if (!identifier || typeof password !== 'string' || password.length < 1 || password.length > 128) {
      return res.status(400).json({ error: 'Por favor, introduz o teu utilizador e palavra-passe.' });
    }

    let userDoc: any = null;

    // 1. Search by email if contains '@'
    if (identifier.includes('@')) {
      const qEmail = await db.collection('users').where('email', '==', identifier).limit(1).get();
      if (!qEmail.empty) userDoc = qEmail.docs[0];
    }
    // 2. Search by username
    if (!userDoc) {
      const qUser = await db.collection('users').where('username', '==', identifier).limit(1).get();
      if (!qUser.empty) userDoc = qUser.docs[0];
    }
    // 3. Search by synthetic email
    if (!userDoc && !identifier.includes('@')) {
      const qSyn = await db.collection('users').where('email', '==', `${identifier}@aluno.tic`).limit(1).get();
      if (!qSyn.empty) userDoc = qSyn.docs[0];
    }
    // 4. Search by publicId
    if (!userDoc) {
      const qPub = await db.collection('users').where('publicId', '==', identifier.toUpperCase()).limit(1).get();
      if (!qPub.empty) userDoc = qPub.docs[0];
    }

    // Anti-enumeration: uniform error response on user not found
    if (!userDoc) {
      recordLoginFailure(ip, identifier);
      return res.status(401).json({ error: 'Utilizador ou palavra-passe incorretos.' });
    }

    const user = userDoc.data();
    const credentialSnap = await db.collection('credentials').doc(userDoc.id).get();

    let passwordValid = false;
    if (credentialSnap.exists) {
      const credentials = credentialSnap.data() || {};
      passwordValid = await verifyPassword(
        password,
        String(credentials.passwordHash || ''),
        String(credentials.passwordSalt || '')
      );
    }

    if (!passwordValid) {
      const cardPass = getStudentCardPassword(user);
      if (cardPass === password) {
        passwordValid = true;
        const hashed = await hashPassword(password);
        const now = new Date().toISOString();
        await db.collection('credentials').doc(userDoc.id).set({
          userId: userDoc.id,
          passwordHash: hashed.hash,
          passwordSalt: hashed.salt,
          passwordChangedAt: now,
          updatedAt: now,
        }, { merge: true }).catch(() => {});
      }
    }

    if (!passwordValid) {
      recordLoginFailure(ip, identifier);
      return res.status(401).json({ error: 'Utilizador ou palavra-passe incorretos.' });
    }

    // Successful login: clear rate limit and issue revocable token
    clearLoginRateLimit(ip, identifier);
    const token = createSessionToken(userDoc.id);

    // Sanitize user profile output (no passwords)
    const sanitizedUser = {
      id: user.id || userDoc.id,
      name: user.name,
      fullName: user.fullName || user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      greetingName: user.greetingName,
      username: user.username,
      email: user.email,
      publicId: user.publicId,
      turma: user.turma,
      role: user.role || 'student',
      language: user.language || 'pt',
      points: Number(user.points || 0),
      avatar: user.avatar,
      createdAt: user.createdAt,
      lastActivity: user.lastActivity,
    };

    return res.json({
      success: true,
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    recordLoginFailure(ip);
    return res.status(500).json({ error: 'Ocorreu um erro ao processar o início de sessão.' });
  }
});

// LOGOUT (Explicit Revocation of Session Token)
app.post('/api/auth/logout', async (req, res) => {
  const token = getBearerToken(req);
  if (token) {
    revokeSession(token);
  }
  return res.json({ success: true, message: 'Sessão terminada com sucesso.' });
});

// GET ME
app.get('/api/auth/me', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const user = req.user!;
    const userId = req.userId!;

    const [progSnap, achSnap, ptsSnap, dailySnap] = await Promise.all([
      db.collection('users').doc(userId).collection('progress').get(),
      db.collection('users').doc(userId).collection('achievements').get(),
      db.collection('users').doc(userId).collection('pointsHistory').orderBy('timestamp', 'desc').limit(50).get(),
      db.collection('users').doc(userId).collection('dailyTips').get(),
    ]);

    const sanitizedUser = {
      id: user.id || userId,
      name: user.name,
      fullName: user.fullName || user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      greetingName: user.greetingName,
      username: user.username,
      email: user.email,
      publicId: user.publicId,
      turma: user.turma,
      role: user.role || 'student',
      language: user.language || 'pt',
      points: Number(user.points || 0),
      avatar: user.avatar,
      createdAt: user.createdAt,
      lastActivity: user.lastActivity,
    };

    return res.json({
      success: true,
      user: sanitizedUser,
      progress: progSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      achievements: achSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      pointsHistory: ptsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      dailyTipsCount: dailySnap.docs.length,
    });
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar o perfil.' });
  }
});

// SETUP PASSWORD (Bootstrap or Initial Configuration)
app.post('/api/auth/setup-password', createGeneralRateLimiter(5, 15 * 60 * 1000), async (req, res) => {
  try {
    const { email, setupSecret, password } = req.body || {};
    const normalizedEmail = normalizeEmail(email);
    const expectedSecret = process.env.PASSWORD_SETUP_SECRET;

    if (!expectedSecret || typeof setupSecret !== 'string' || !safeEqual(setupSecret, expectedSecret)) {
      return res.status(403).json({ error: 'Não autorizado.' });
    }

    if (!isValidEmail(normalizedEmail)) return res.status(400).json({ error: 'Email inválido.' });
    if (!isValidPassword(String(password || ''))) return res.status(400).json({ error: 'A palavra-passe deve ter entre 8 e 128 caracteres.' });

    const snapshot = await db.collection('users').where('email', '==', normalizedEmail).limit(1).get();
    if (snapshot.empty) return res.status(404).json({ error: 'Conta não encontrada.' });

    const userDoc = snapshot.docs[0];
    const passwordResult = await hashPassword(String(password));
    const now = new Date().toISOString();

    await db.collection('credentials').doc(userDoc.id).set({
      userId: userDoc.id,
      passwordHash: passwordResult.hash,
      passwordSalt: passwordResult.salt,
      passwordChangedAt: now,
      updatedAt: now,
    }, { merge: true });

    return res.json({ success: true });
  } catch (error) {
    console.error('Password setup error:', error);
    return res.status(500).json({ error: 'Não foi possível definir a palavra-passe.' });
  }
});

// CHANGE PASSWORD (User-initiated: Invalidate all sessions & update hash)
app.post('/api/user/change-password', requireAuth, createGeneralRateLimiter(5, 15 * 60 * 1000), async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const { currentPassword, newPassword } = req.body || {};

    if (!isValidPassword(String(newPassword || ''))) {
      return res.status(400).json({ error: 'A nova palavra-passe deve ter entre 8 e 128 caracteres.' });
    }

    const credSnap = await db.collection('credentials').doc(userId).get();
    if (!credSnap.exists) return res.status(404).json({ error: 'Credenciais não encontradas.' });

    const credData = credSnap.data() || {};
    const valid = await verifyPassword(currentPassword, credData.passwordHash, credData.passwordSalt);
    if (!valid) return res.status(401).json({ error: 'Palavra-passe atual incorreta.' });

    const hashed = await hashPassword(String(newPassword));
    const now = new Date().toISOString();

    // Update credentials and record passwordChangedAt to invalidate all other active sessions
    await db.collection('credentials').doc(userId).set({
      userId,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      passwordChangedAt: now,
      updatedAt: now,
    }, { merge: true });

    // Ensure users document NEVER receives initialPassword or plaintext password
    await db.collection('users').doc(userId).update({
      initialPassword: FieldValue.delete(),
      password: FieldValue.delete(),
      passwordHash: FieldValue.delete(),
      updatedAt: now,
    }).catch(() => {});

    return res.json({ success: true, message: 'Palavra-passe alterada com sucesso! Todas as sessões anteriores foram invalidadas.' });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ error: 'Não foi possível alterar a palavra-passe.' });
  }
});

/* ============================================================
   USER PROFILE & PUBLIC PROFILE SYNC
   ============================================================ */

async function syncPublicProfile(userId: string) {
  try {
    const userSnap = await db.collection('users').doc(userId).get();
    if (!userSnap.exists) return;
    const u = userSnap.data() || {};
    if (u.role === 'teacher' || u.role === 'admin' || isTeacherEmail(u.email)) return;

    // Strict PII protection: only non-sensitive pseudonymous data
    await db.collection('publicProfiles').doc(userId).set({
      id: userId,
      publicId: u.publicId || (u.username ? String(u.username).toUpperCase() : 'ALUNO_TIC'),
      turma: u.turma || '',
      avatar: u.avatar || getDefaultAvatar(u.username || ''),
      points: Number(u.points || 0),
      role: 'student',
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('syncPublicProfile error:', err);
  }
}

app.post('/api/user/profile', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const body = req.body || {};
    const updates: Record<string, any> = { updatedAt: new Date().toISOString() };

    if (body.avatar) updates.avatar = body.avatar;
    if (body.language && ['pt', 'en'].includes(body.language)) updates.language = body.language;

    // Student cannot modify role, points, name or turma arbitrarily
    const userSnap = await db.collection('users').doc(userId).get();
    const current = userSnap.data() || {};
    const isTeacher = current.role === 'admin' || current.role === 'teacher' || isTeacherEmail(current.email);

    if (isTeacher) {
      if (body.name) updates.name = String(body.name).slice(0, 100);
      if (body.turma) updates.turma = String(body.turma).slice(0, 50);
    }

    await db.collection('users').doc(userId).set(updates, { merge: true });
    await syncPublicProfile(userId);

    const updatedSnap = await db.collection('users').doc(userId).get();
    return res.json({ success: true, user: updatedSnap.data() });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: 'Não foi possível atualizar o perfil.' });
  }
});

/* ============================================================
   AUTHENTICATED RANKINGS & LEADERBOARD (Point 5 Privacy)
   ============================================================ */

// 1. Turma Rankings (Aggregated stats, authenticated)
app.get('/api/rankings/turmas', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const profilesSnap = await db.collection('publicProfiles').get();
    const classMap = new Map<string, { turma: string; totalPoints: number; studentCount: number }>();

    profilesSnap.docs.forEach((d) => {
      const data = d.data();
      if (data.role === 'admin' || data.role === 'teacher') return;
      const turma = (data.turma || '').trim();
      if (!turma) return;

      const current = classMap.get(turma) || { turma, totalPoints: 0, studentCount: 0 };
      current.totalPoints += Number(data.points || 0);
      current.studentCount += 1;
      classMap.set(turma, current);
    });

    const list = Array.from(classMap.values()).map((c) => ({
      turma: c.turma,
      totalPoints: c.totalPoints,
      averagePoints: c.studentCount > 0 ? Math.round(c.totalPoints / c.studentCount) : 0,
      studentCount: c.studentCount,
      rank: 0,
    }));

    list.sort((a, b) => b.averagePoints - a.averagePoints || b.totalPoints - a.totalPoints);
    list.forEach((item, index) => { item.rank = index + 1; });

    return res.json({ success: true, rankings: list });
  } catch (error) {
    console.error('Turmas ranking error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar a classificação das turmas.' });
  }
});

// 2. Student Rankings (Authenticated & Minimal Non-PII Data)
app.get('/api/rankings/students', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const currentUser = req.user!;
    const isTeacher = currentUser.role === 'admin' || currentUser.role === 'teacher' || isTeacherEmail(currentUser.email);
    const userTurma = String(req.query.turma || currentUser.turma || '').trim();

    const profilesSnap = await db.collection('publicProfiles').get();
    const list: any[] = [];

    profilesSnap.docs.forEach((d) => {
      const data = d.data();
      if (data.role === 'admin' || data.role === 'teacher') return;
      const studentTurma = (data.turma || '').trim();

      // Non-teachers only see rankings for their own class
      if (!isTeacher && userTurma && studentTurma !== userTurma) return;

      // Expose minimal pseudonymous data only (no real name, no email, no username)
      list.push({
        id: d.id,
        publicId: data.publicId || 'Aluno_TIC',
        turma: studentTurma,
        points: Number(data.points || 0),
        avatar: data.avatar,
        rank: 0,
      });
    });

    list.sort((a, b) => b.points - a.points);
    list.forEach((item, index) => { item.rank = index + 1; });

    return res.json({ success: true, rankings: list.slice(0, 100) });
  } catch (error) {
    console.error('Students ranking error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar a classificação dos alunos.' });
  }
});

// 3. Taken Public IDs (Authenticated, for generating unique pseudonyms)
app.get('/api/public-ids/taken', requireAuth, async (_req, res) => {
  try {
    const snap = await db.collection('publicProfiles').limit(500).get();
    const taken = snap.docs.map(d => d.data()?.publicId).filter(Boolean);
    return res.json({ success: true, taken });
  } catch {
    return res.json({ success: true, taken: [] });
  }
});

/* ============================================================
   PROGRESS SAVING — STRICT SERVER AUTHORITATIVE (Point 2)
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

    // Authoritative Server Evaluation
    const evaluation = evaluateActivitySubmissionServer({
      activityId,
      activityType,
      quizAnswers: body.quizAnswers,
      submissionData: body.submissionData,
      answers: body.answers,
      puzzleOrder: body.puzzleOrder,
      completedSteps: body.completedSteps,
    });

    if (!evaluation.valid) {
      return res.status(400).json({ error: evaluation.error || 'Atividade não pôde ser avaliada pelo servidor.' });
    }

    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    const user = userSnap.data() || {};
    const isTeacher = user.role === 'admin' || user.role === 'teacher' || isTeacherEmail(normalizeEmail(user.email));

    const quiz = isLearningQuizServer(activityId, activityType);

    if (!isTeacher) {
      const thVisSnap = await db.collection('config').doc('theme_visibility').get();
      const thVisData = thVisSnap.exists ? thVisSnap.data()?.visibility || {} : {};
      if (thVisData[themeId] === false) {
        return res.status(403).json({ error: 'Este tema pedagógico está atualmente oculto pela professora de TIC.' });
      }
    }

    if (quiz && !isTeacher) {
      const qVisSnap = await db.collection('config').doc('quiz_visibility').get();
      const qVisData = qVisSnap.exists ? qVisSnap.data()?.visibility || {} : {};
      if (qVisData[themeId] !== true) {
        return res.status(403).json({ error: 'Este quiz de aprendizagem está atualmente bloqueado pela professora de TIC.' });
      }
    }

    const progressRef = userRef.collection('progress').doc(activityId);
    const existingSnap = await progressRef.get();
    const existing = existingSnap.exists ? (existingSnap.data() || {}) : null;
    const now = new Date().toISOString();

    const attemptScore = Math.max(0, Math.min(100, Math.round(Number(evaluation.percentage) || 0)));
    const previousBest = Math.max(0, Math.min(100, Math.round(Number(existing?.bestScore ?? existing?.bestPercentage ?? existing?.score ?? 0))));
    const attempts = Number(existing?.attempts || 0) + 1;
    const best = Math.max(previousBest, attemptScore);

    let xpGain = 0;
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
      // Learning Quizzes are diagnostic (0 XP)
      xpGain = 0;
      record.awardedXp = 0;
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
      // Challenges award up to 100 XP based on performance
      xpGain = Math.max(0, best - previousBest);
      record.awardedXp = best;
      if (existing?.firstAttemptScore === undefined) {
        record.firstAttemptScore = attemptScore;
        record.firstAttemptPercentage = attemptScore;
        record.firstAttemptDate = now;
      } else {
        record.firstAttemptScore = existing.firstAttemptScore;
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

    // Consolidated total points & badge evaluation
    const [allProgressSnap, achSnap, dailySnap] = await Promise.all([
      userRef.collection('progress').get(),
      userRef.collection('achievements').get(),
      userRef.collection('dailyTips').get(),
    ]);

    let dailyPoints = 0;
    dailySnap.docs.forEach((d) => {
      dailyPoints += Math.max(0, Math.min(1000, Math.round(Number(d.data()?.pointsEarned || 0))));
    });

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

    const currentBaseXp = isTeacher ? 0 : dailyPoints + challengesPointsSum;
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

    const totalPoints = isTeacher ? 0 : currentBaseXp + newlyEarnedBonus;
    const lastActivity = {
      activityId,
      activityTitle: body.activityTitle || activityId,
      themeId,
      score: attemptScore,
      percentage: attemptScore,
      timestamp: now,
    };

    await userRef.set({
      points: totalPoints,
      xp: totalPoints,
      lastActivity,
      updatedAt: now,
    }, { merge: true });

    await syncPublicProfile(userId);

    const updatedAchievements = (await userRef.collection('achievements').get()).docs.map(d => ({ id: d.id, ...d.data() }));

    return res.json({
      success: true,
      record,
      userPoints: totalPoints,
      earnedXp: xpGain,
      lastActivity,
      achievements: updatedAchievements,
    });
  } catch (error) {
    console.error('Save progress error:', error);
    return res.status(500).json({ error: 'Erro ao registar o progresso no servidor.' });
  }
});

/* ============================================================
   DAILY TIP — STRICT SERVER AUTHORITATIVE DATE (Point 8)
   ============================================================ */

function getTodayUtcString(): string {
  return new Date().toISOString().slice(0, 10);
}

function isAllowedDailyTipDate(dateStr: string): boolean {
  return typeof dateStr === 'string' && dateStr === getTodayUtcString();
}

app.post('/api/daily-tip/read', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const serverToday = getTodayUtcString();

    const ref = db.collection('users').doc(userId).collection('dailyTips').doc(serverToday);
    const snap = await ref.get();
    if (snap.exists && (snap.data()?.read || snap.data()?.answered)) {
      const userSnap = await db.collection('users').doc(userId).get();
      return res.json({
        success: true,
        user: userSnap.data(),
        userPoints: Number(userSnap.data()?.points || 0),
        earnedPoints: 0,
        achievements: [],
      });
    }

    const now = new Date().toISOString();
    const evaluation = evaluateDailyTipSubmission(serverToday, '');
    const tipTitle = evaluation.tipTitle;

    await ref.set({
      userId,
      date: serverToday,
      tipTitle,
      read: true,
      readPoints: 20,
      pointsEarned: 20,
      timestamp: now,
    }, { merge: true });

    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    const user = userSnap.data() || {};
    const points = Number(user.points || 0) + 20;
    const lastActivity = { themeId: 'daily_tip', title: `📖 Leitura da Dica: ${tipTitle}`, timestamp: now };

    await userRef.set({ points, xp: points, lastActivity, updatedAt: now }, { merge: true });

    const txId = `pt-daily-read-${serverToday}-${Date.now()}`;
    await userRef.collection('pointsHistory').doc(txId).set({
      id: txId,
      userId,
      amount: 20,
      reason: `📖 Leitura da Dica TIC (+20 XP): ${tipTitle}`,
      timestamp: now,
    });

    await syncPublicProfile(userId);

    return res.json({
      success: true,
      user: { ...user, points, lastActivity },
      userPoints: points,
      earnedPoints: 20,
      achievements: [],
    });
  } catch (error) {
    console.error('Daily tip read error:', error);
    return res.status(500).json({ error: 'Não foi possível registar a leitura da Dica do Dia.' });
  }
});

app.post('/api/daily-tip/answer', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const serverToday = getTodayUtcString();
    const selectedOptionId = String(req.body?.selectedOptionId || '').slice(0, 100);

    if (!selectedOptionId) return res.status(400).json({ error: 'Resposta da Dica do Dia não fornecida.' });

    const ref = db.collection('users').doc(userId).collection('dailyTips').doc(serverToday);
    const snap = await ref.get();
    const existing = snap.exists ? (snap.data() || {}) : {};

    if (existing.answered) {
      const userSnap = await db.collection('users').doc(userId).get();
      return res.json({
        success: true,
        user: userSnap.data(),
        userPoints: Number(userSnap.data()?.points || 0),
        earnedPoints: 0,
        readingPoints: Number(existing.readPoints || 0),
        answerPoints: Number(existing.answerPoints || 0),
        achievements: [],
      });
    }

    const evaluation = evaluateDailyTipSubmission(serverToday, selectedOptionId);
    const correct = Boolean(evaluation.isCorrect);
    const readingPoints = existing.read ? 0 : 20;
    const answerPoints = correct ? 30 : 0;
    const earned = readingPoints + answerPoints;
    const now = new Date().toISOString();

    await ref.set({
      userId,
      date: serverToday,
      tipTitle: evaluation.tipTitle,
      read: true,
      answered: true,
      selectedOptionId,
      isCorrect: correct,
      readPoints: 20,
      answerPoints,
      pointsEarned: (Number(existing.pointsEarned || 0)) + earned,
      timestamp: now,
    }, { merge: true });

    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    const user = userSnap.data() || {};
    const points = Number(user.points || 0) + earned;
    const lastActivity = {
      themeId: 'daily_tip',
      title: `⚡ Resposta à Dica TIC (${correct ? 'Correta' : 'Tentada'}): ${evaluation.tipTitle}`,
      timestamp: now,
    };

    await userRef.set({ points, xp: points, lastActivity, updatedAt: now }, { merge: true });

    if (earned > 0) {
      const txId = `pt-daily-ans-${serverToday}-${Date.now()}`;
      await userRef.collection('pointsHistory').doc(txId).set({
        id: txId,
        userId,
        amount: earned,
        reason: correct
          ? `⚡ Acerto na Dica do Dia (+${earned} XP): ${evaluation.tipTitle}`
          : `⚡ Participação na Dica do Dia (+${earned} XP): ${evaluation.tipTitle}`,
        timestamp: now,
      });
    }

    await syncPublicProfile(userId);

    return res.json({
      success: true,
      correct,
      earnedPoints: earned,
      readingPoints: 20,
      answerPoints,
      userPoints: points,
      user: { ...user, points, lastActivity },
      achievements: [],
    });
  } catch (error) {
    console.error('Daily tip answer error:', error);
    return res.status(500).json({ error: 'Não foi possível registar a resposta à Dica do Dia.' });
  }
});

app.get('/api/daily-tip/status', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const dateStr = String(req.query.date || getTodayUtcString());
    const snap = await db.collection('users').doc(userId).collection('dailyTips').doc(dateStr).get();
    return res.json({ success: true, status: snap.exists ? snap.data() : null });
  } catch {
    return res.json({ success: true, status: null });
  }
});

/* ============================================================
   PEDAGOGICAL CONFIGURATION ROUTES
   ============================================================ */

app.get('/api/config/theme-visibility', async (_req, res) => {
  try {
    const snap = await db.collection('config').doc('theme_visibility').get();
    return res.json({ success: true, visibility: snap.exists ? snap.data()?.visibility || {} : {} });
  } catch {
    return res.json({ success: true, visibility: {} });
  }
});

app.post('/api/config/theme-visibility', requireAuth, requireTeacher, async (req: AuthenticatedRequest, res) => {
  try {
    const { visibility } = req.body || {};
    if (!visibility || typeof visibility !== 'object') return res.status(400).json({ error: 'Configuração inválida.' });
    await db.collection('config').doc('theme_visibility').set({
      visibility,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'teacher',
    }, { merge: true });
    return res.json({ success: true, visibility });
  } catch (error) {
    console.error('Set theme visibility error:', error);
    return res.status(500).json({ error: 'Não foi possível atualizar a visibilidade dos temas.' });
  }
});

app.get('/api/config/quiz-visibility', async (_req, res) => {
  try {
    const snap = await db.collection('config').doc('quiz_visibility').get();
    return res.json({ success: true, visibility: snap.exists ? snap.data()?.visibility || {} : {} });
  } catch {
    return res.json({ success: true, visibility: {} });
  }
});

app.post('/api/config/quiz-visibility', requireAuth, requireTeacher, async (req: AuthenticatedRequest, res) => {
  try {
    const { visibility } = req.body || {};
    if (!visibility || typeof visibility !== 'object') return res.status(400).json({ error: 'Configuração inválida.' });
    await db.collection('config').doc('quiz_visibility').set({
      visibility,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'teacher',
    }, { merge: true });
    return res.json({ success: true, visibility });
  } catch (error) {
    console.error('Set quiz visibility error:', error);
    return res.status(500).json({ error: 'Não foi possível atualizar a visibilidade dos quizzes.' });
  }
});

app.get('/api/config/turmas', async (_req, res) => {
  try {
    const snap = await db.collection('config').doc('turmas').get();
    return res.json({ success: true, turmas: snap.exists ? snap.data()?.list || [] : [] });
  } catch {
    return res.json({ success: true, turmas: [] });
  }
});

app.post('/api/config/turmas', requireAuth, requireTeacher, async (req, res) => {
  try {
    const { turmas } = req.body || {};
    if (!Array.isArray(turmas)) return res.status(400).json({ error: 'Lista de turmas inválida.' });
    await db.collection('config').doc('turmas').set({
      list: turmas.map(t => String(t).trim()).filter(Boolean),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return res.json({ success: true, turmas });
  } catch (error) {
    console.error('Set turmas error:', error);
    return res.status(500).json({ error: 'Não foi possível atualizar as turmas.' });
  }
});

/* ============================================================
   TEACHER MANAGEMENT — STUDENTS & CREDENTIALS
   ============================================================ */

// 1. GET ALL STUDENTS (Strict: NEVER returns passwords or hashes)
app.get('/api/teacher/students', requireAuth, requireTeacher, async (_req, res) => {
  try {
    const usersSnap = await db.collection('users').limit(1000).get();
    const students = usersSnap.docs
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
          email: u.email,
          publicId: u.publicId,
          turma: u.turma,
          role: u.role || 'student',
          language: u.language || 'pt',
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

// 2. PARSE STUDENTS FILE (ZIP, PDF, XLSX, CSV)
async function extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
  try {
    const mod: any = await import('pdf-parse');
    const PDFParse = mod.PDFParse || mod.default?.PDFParse || mod.default;
    if (typeof PDFParse === 'function') {
      const data = await PDFParse(buffer);
      return data.text || '';
    }
  } catch (err) {
    console.warn('PDF parse fallback warning:', err);
  }
  return buffer.toString('utf-8');
}

app.post('/api/teacher/parse-file', requireAuth, requireTeacher, async (req, res) => {
  try {
    const { base64, filename, defaultTurma } = req.body || {};
    if (!base64 || !filename) return res.status(400).json({ error: 'Ficheiro em falta.' });

    const buffer = Buffer.from(base64, 'base64');
    const ext = path.extname(filename).toLowerCase();
    const extracted: { name: string; turma: string }[] = [];

    if (ext === '.xlsx' || ext === '.xls') {
      const wb = XLSX.read(buffer, { type: 'buffer' });
      for (const sheetName of wb.SheetNames) {
        const ws = wb.Sheets[sheetName];
        const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        for (const row of rows) {
          if (!row || row.length === 0) continue;
          const lineStr = row.map(c => String(c || '').trim()).join(' ');
          if (lineStr.length < 3) continue;
          extracted.push({ name: lineStr, turma: defaultTurma || sheetName });
        }
      }
    } else if (ext === '.csv' || ext === '.txt') {
      const text = buffer.toString('utf-8');
      const lines = text.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length >= 3) {
          extracted.push({ name: trimmed, turma: defaultTurma || '5.º A' });
        }
      }
    } else if (ext === '.pdf') {
      const text = await extractTextFromPdfBuffer(buffer);
      const lines = text.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length >= 3) {
          extracted.push({ name: trimmed, turma: defaultTurma || '5.º A' });
        }
      }
    } else if (ext === '.zip') {
      const zip = await JSZip.loadAsync(buffer);
      for (const [entryName, fileObj] of Object.entries(zip.files)) {
        if (fileObj.dir) continue;
        const entryBuf = await fileObj.async('nodebuffer');
        const entryExt = path.extname(entryName).toLowerCase();
        if (entryExt === '.xlsx' || entryExt === '.xls') {
          const wb = XLSX.read(entryBuf, { type: 'buffer' });
          for (const sheetName of wb.SheetNames) {
            const ws = wb.Sheets[sheetName];
            const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
            for (const row of rows) {
              const lineStr = row.map(c => String(c || '').trim()).join(' ');
              if (lineStr.length >= 3) extracted.push({ name: lineStr, turma: defaultTurma || sheetName });
            }
          }
        }
      }
    }

    return res.json({
      success: true,
      count: extracted.length,
      rawData: extracted.slice(0, 500),
      students: extracted.slice(0, 500),
      filesProcessed: [filename],
    });
  } catch (error) {
    console.error('Parse file error:', error);
    return res.status(500).json({ error: 'Erro ao processar o ficheiro.' });
  }
});

// 3. BATCH IMPORT STUDENTS (Password returned ONCE in HTTP response only)
app.post('/api/teacher/import-students', requireAuth, requireTeacher, async (req, res) => {
  try {
    const rawStudents: { name: string; turma?: string }[] = Array.isArray(req.body?.students) ? req.body.students : [];
    if (rawStudents.length === 0) return res.status(400).json({ error: 'Nenhum aluno para importar.' });

    const wipeFirst = Boolean(req.body?.wipeFirst);
    if (wipeFirst) {
      const usersSnap = await db.collection('users').get();
      for (const d of usersSnap.docs) {
        const u = d.data();
        if (u.role === 'teacher' || u.role === 'admin' || isTeacherEmail(u.email)) continue;
        await purgeSingleStudent(d.id);
      }
    }

    const existingUsersSnap = await db.collection('users').limit(1000).get();
    const existingUsernames = new Set<string>();
    const existingStudentsList: any[] = [];

    existingUsersSnap.docs.forEach((d) => {
      const data = d.data();
      if (data.username) existingUsernames.add(String(data.username).toLowerCase());
      existingStudentsList.push({ id: d.id, ...data });
    });

    const created: any[] = [];
    const existed: any[] = [];
    const errors: any[] = [];
    const studentsToCommit: any[] = [];

    for (const raw of rawStudents) {
      const cleanRawName = String(raw.name || '').trim();
      const rawTurma = String(raw.turma || req.body?.defaultTurma || '5.º A').trim();
      const normalizedTurma = normalizeTurmaName(rawTurma);

      if (!cleanRawName || cleanRawName.length < 2) continue;

      const matched = existingStudentsList.find(s => {
        const sTurma = normalizeTurmaName(s.turma || '');
        if (sTurma !== normalizedTurma) return false;
        const sName = String(s.fullName || s.name || '').trim().toLowerCase();
        return sName === cleanRawName.toLowerCase();
      });

      if (matched) {
        existed.push({
          id: matched.id,
          name: cleanRawName,
          turma: normalizedTurma,
          username: matched.username || '',
        });
        continue;
      }

      try {
        const { fullName, firstName, lastName, greetingName } = parseStudentName(cleanRawName);
        const username = generateKidUsername(fullName, normalizedTurma, existingUsernames);
        const password = generateKidPassword(new Set());
        const userId = crypto.randomUUID();
        const now = new Date().toISOString();

        const hashed = await hashPassword(password);
        const publicId = username.toUpperCase();

        // 1. users document (STRICT: NO PASSWORDS)
        const userData = {
          id: userId,
          name: fullName,
          fullName: fullName,
          firstName: firstName,
          lastName: lastName,
          greetingName: greetingName,
          username: username,
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

        // 2. credentials document (Hash & Salt only)
        const credData = {
          userId,
          passwordHash: hashed.hash,
          passwordSalt: hashed.salt,
          passwordChangedAt: now,
          createdAt: now,
          updatedAt: now,
        };

        // 3. publicProfiles document (Non-PII only)
        const publicData = {
          id: userId,
          publicId: publicId,
          turma: normalizedTurma,
          avatar: getDefaultAvatar(username),
          points: 0,
          role: 'student',
        };

        existingStudentsList.push(userData);
        existingUsernames.add(username.toLowerCase());

        studentsToCommit.push({
          userId,
          fullName,
          normalizedTurma,
          username,
          password, // Returned ONCE to teacher for handover
          userData,
          credData,
          publicData,
        });
      } catch (err: any) {
        errors.push({ name: cleanRawName, turma: normalizedTurma, error: err.message });
      }
    }

    // Commit in chunks of 50
    const CHUNK_SIZE = 50;
    for (let c = 0; c < studentsToCommit.length; c += CHUNK_SIZE) {
      const chunk = studentsToCommit.slice(c, c + CHUNK_SIZE);
      const batch = db.batch();
      for (const s of chunk) {
        batch.set(db.collection('users').doc(s.userId), s.userData);
        batch.set(db.collection('credentials').doc(s.userId), s.credData);
        batch.set(db.collection('publicProfiles').doc(s.userId), s.publicData);
      }
      await batch.commit();
      for (const s of chunk) {
        created.push({
          id: s.userId,
          name: s.fullName,
          turma: s.normalizedTurma,
          username: s.username,
          password: s.password, // Delivered once to teacher
        });
      }
    }

    return res.json({
      success: true,
      createdCount: created.length,
      existedCount: existed.length,
      created,
      existed,
      updated: [],
      errors,
      summary: {
        created: created.length,
        existed: existed.length,
        errors: errors.length,
      },
      wipedBefore: wipeFirst,
    });
  } catch (error) {
    console.error('Import students error:', error);
    return res.status(500).json({ error: 'Erro ao importar alunos.' });
  }
});

// 4. RESET STUDENT PASSWORD (Teacher Only — Invalidate Sessions + Return New Password Once)
app.post('/api/teacher/students/:userId/reset-password', requireAuth, requireTeacher, createGeneralRateLimiter(20, 15 * 60 * 1000), async (req, res) => {
  try {
    const userId = String(req.params.userId || '').trim();
    if (!isValidUserId(userId)) return res.status(400).json({ error: 'ID de utilizador inválido.' });

    const userRef = db.collection('users').doc(userId);
    const snap = await userRef.get();
    if (!snap.exists || snap.data()?.role !== 'student') {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    const newPassword = generateKidPassword(new Set());
    const hashed = await hashPassword(newPassword);
    const now = new Date().toISOString();

    // 1. Update credentials with new hash, salt, and passwordChangedAt (revoking all active sessions)
    await db.collection('credentials').doc(userId).set({
      userId,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      passwordChangedAt: now,
      updatedAt: now,
    }, { merge: true });

    // 2. Ensure users document has NO plaintext password
    await userRef.update({
      initialPassword: FieldValue.delete(),
      password: FieldValue.delete(),
      passwordHash: FieldValue.delete(),
      updatedAt: now,
    }).catch(() => {});

    // 3. Return new password once to the teacher
    return res.json({
      success: true,
      newPassword,
      message: 'Palavra-passe redefinida com sucesso! A palavra-passe anterior e as sessões foram invalidadas.',
    });
  } catch (error) {
    console.error('Reset student password error:', error);
    return res.status(500).json({ error: 'Não foi possível redefinir a palavra-passe.' });
  }
});

// 5. STUDENT PROGRESS (Teacher Inspection)
app.get('/api/teacher/students/:userId/progress', requireAuth, requireTeacher, async (req, res) => {
  try {
    const userId = String(req.params.userId || '').trim();
    if (!isValidUserId(userId)) return res.status(400).json({ error: 'ID de utilizador inválido.' });

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
    return res.status(500).json({ error: 'Não foi possível carregar o progresso em lote.' });
  }
});

// 6. UPDATE STUDENT (Teacher Only)
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
      const parsed = parseStudentName(name);
      updates.name = parsed.fullName;
      updates.fullName = parsed.fullName;
      updates.firstName = parsed.firstName;
      updates.lastName = parsed.lastName;
      updates.greetingName = parsed.greetingName;
    }

    if (body.newTurma !== undefined) {
      const turma = String(body.newTurma).trim();
      if (turma.length > 50) return res.status(400).json({ error: 'Turma inválida.' });
      updates.turma = turma;
    }

    if (Object.keys(updates).length > 1) await userRef.set(updates, { merge: true });

    if (body.newPassword !== undefined) {
      const password = String(body.newPassword);
      if (!isValidPassword(password)) return res.status(400).json({ error: 'A palavra-passe deve ter pelo menos 4 caracteres.' });
      const h = await hashPassword(password);
      const now = new Date().toISOString();
      await db.collection('credentials').doc(userId).set({
        userId,
        passwordHash: h.hash,
        passwordSalt: h.salt,
        passwordChangedAt: now,
        updatedAt: now,
      }, { merge: true });
    }

    await syncPublicProfile(userId);
    return res.json({ success: true, message: 'Aluno atualizado com sucesso.' });
  } catch (error) {
    console.error('Teacher update student error:', error);
    return res.status(500).json({ error: 'Não foi possível atualizar o aluno.' });
  }
});

// 7. DELETE SINGLE STUDENT WITH RECURSIVE SUBCOLLECTION PURGE
async function purgeSingleStudent(userId: string) {
  const userRef = db.collection('users').doc(userId);
  await db.recursiveDelete(userRef);
  await db.collection('credentials').doc(userId).delete().catch(() => {});
  await db.collection('publicProfiles').doc(userId).delete().catch(() => {});
}

app.delete('/api/teacher/students/:userId', requireAuth, requireTeacher, async (req, res) => {
  try {
    const userId = String(req.params.userId || '');
    if (!isValidUserId(userId)) return res.status(400).json({ error: 'ID de utilizador inválido.' });

    const snap = await db.collection('users').doc(userId).get();
    if (!snap.exists) return res.status(404).json({ error: 'Aluno não encontrado.' });
    if (snap.data()?.role === 'teacher' || snap.data()?.role === 'admin' || isTeacherEmail(snap.data()?.email)) {
      return res.status(403).json({ error: 'Não é permitido eliminar a conta de uma professora.' });
    }

    await purgeSingleStudent(userId);
    return res.json({ success: true, message: 'Aluno e todos os seus registos eliminados com sucesso.' });
  } catch (error) {
    console.error('Teacher delete student error:', error);
    return res.status(500).json({ error: 'Não foi possível eliminar o aluno.' });
  }
});

app.delete('/api/teacher/students-bulk', requireAuth, requireTeacher, async (req, res) => {
  try {
    const studentIds: string[] = Array.isArray(req.body?.studentIds) ? req.body.studentIds : [];
    if (studentIds.length === 0) return res.status(400).json({ error: 'Nenhum aluno especificado para eliminação.' });

    for (const sid of studentIds) {
      if (!sid || typeof sid !== 'string') continue;
      const snap = await db.collection('users').doc(sid).get();
      if (snap.exists) {
        const u = snap.data();
        if (u?.role === 'teacher' || u?.role === 'admin' || isTeacherEmail(u?.email)) continue;
        await purgeSingleStudent(sid);
      }
    }
    return res.json({ success: true, message: `${studentIds.length} alunos eliminados com sucesso.` });
  } catch (error) {
    console.error('Teacher bulk delete error:', error);
    return res.status(500).json({ error: 'Não foi possível eliminar os alunos em lote.' });
  }
});

// Delete students by turmas
app.delete('/api/teacher/students-by-turmas', requireAuth, requireTeacher, async (req, res) => {
  try {
    const turmas: string[] = Array.isArray(req.body?.turmas) ? req.body.turmas : [];
    if (turmas.length === 0) return res.status(400).json({ error: 'Nenhuma turma especificada.' });

    const normalizedSet = new Set(turmas.map(t => normalizeTurmaName(t)));
    const snap = await db.collection('users').get();
    let deletedCount = 0;

    for (const d of snap.docs) {
      const u = d.data();
      if (u.role === 'teacher' || u.role === 'admin' || isTeacherEmail(u.email)) continue;
      if (normalizedSet.has(normalizeTurmaName(u.turma || ''))) {
        await purgeSingleStudent(d.id);
        deletedCount++;
      }
    }
    return res.json({ success: true, message: `${deletedCount} alunos eliminados com sucesso.` });
  } catch (error) {
    console.error('Delete students by turmas error:', error);
    return res.status(500).json({ error: 'Não foi possível eliminar os alunos das turmas.' });
  }
});

// Turmas Management (Create / Delete)
app.post('/api/teacher/turmas', requireAuth, requireTeacher, async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    if (!name || name.length > 50) return res.status(400).json({ error: 'Nome de turma inválido.' });

    const configRef = db.collection('config').doc('turmas');
    const docSnap = await configRef.get();
    const currentTurmas: string[] = docSnap.exists && Array.isArray(docSnap.data()?.list)
      ? docSnap.data()?.list
      : ['5.º A', '5.º B', '5.º C', '5.º D', '5.º E', '5.º F'];

    const normalized = normalizeTurmaName(name);
    if (!currentTurmas.some(t => normalizeTurmaName(t) === normalized)) {
      currentTurmas.push(name);
      await configRef.set({ list: currentTurmas, updatedAt: new Date().toISOString() });
    }

    return res.json({ success: true, message: `Turma ${name} adicionada com sucesso.`, turmas: currentTurmas });
  } catch (error) {
    console.error('Create turma error:', error);
    return res.status(500).json({ error: 'Não foi possível criar a turma.' });
  }
});

app.delete('/api/teacher/turmas', requireAuth, requireTeacher, async (req, res) => {
  try {
    const turmasToRemove: string[] = Array.isArray(req.body?.turmas) ? req.body.turmas : [];
    const deleteStudents = Boolean(req.body?.deleteStudents);

    if (turmasToRemove.length === 0) return res.status(400).json({ error: 'Nenhuma turma especificada para remoção.' });

    const normalizedToRemove = new Set(turmasToRemove.map(t => normalizeTurmaName(t)));

    if (deleteStudents) {
      const snap = await db.collection('users').get();
      for (const d of snap.docs) {
        const u = d.data();
        if (u.role === 'teacher' || u.role === 'admin' || isTeacherEmail(u.email)) continue;
        if (normalizedToRemove.has(normalizeTurmaName(u.turma || ''))) {
          await purgeSingleStudent(d.id);
        }
      }
    }

    const configRef = db.collection('config').doc('turmas');
    const docSnap = await configRef.get();
    const currentTurmas: string[] = docSnap.exists && Array.isArray(docSnap.data()?.list)
      ? docSnap.data()?.list
      : ['5.º A', '5.º B', '5.º C', '5.º D', '5.º E', '5.º F'];

    const updatedTurmas = currentTurmas.filter(t => !normalizedToRemove.has(normalizeTurmaName(t)));
    await configRef.set({ list: updatedTurmas, updatedAt: new Date().toISOString() });

    return res.json({ success: true, message: 'Turmas eliminadas com sucesso.', turmas: updatedTurmas });
  } catch (error) {
    console.error('Delete turma error:', error);
    return res.status(500).json({ error: 'Não foi possível eliminar as turmas.' });
  }
});

// 8. PURGE ALL STUDENT DATA (Preserving Teachers)
app.delete('/api/teacher/purge-all-data', requireAuth, requireTeacher, async (_req, res) => {
  try {
    const usersSnap = await db.collection('users').get();
    for (const d of usersSnap.docs) {
      const u = d.data();
      if (u.role === 'teacher' || u.role === 'admin' || isTeacherEmail(u.email)) continue;
      await purgeSingleStudent(d.id);
    }
    return res.json({ success: true, message: 'Todos os alunos e registos foram eliminados de raiz.' });
  } catch (error) {
    console.error('Purge all data error:', error);
    return res.status(500).json({ error: 'Não foi possível limpar a base de dados.' });
  }
});

// 9. RECALIBRATE POINTS (0 Starting Bonus Guarantee)
async function recalibrateStudentsPoints() {
  const usersSnap = await db.collection('users').get();
  let updatedCount = 0;

  for (const doc of usersSnap.docs) {
    const u = doc.data();
    if (u.role === 'teacher' || u.role === 'admin' || isTeacherEmail(u.email)) continue;

    const [progSnap, dailySnap, achSnap] = await Promise.all([
      doc.ref.collection('progress').get(),
      doc.ref.collection('dailyTips').get(),
      doc.ref.collection('achievements').get(),
    ]);

    let dailyPoints = 0;
    dailySnap.docs.forEach((d) => {
      dailyPoints += Math.max(0, Math.min(1000, Math.round(Number(d.data()?.pointsEarned || 0))));
    });

    let challengesSum = 0;
    progSnap.docs.forEach((d) => {
      const p = d.data();
      const pId = String(p.activityId || d.id);
      const isQuiz = isLearningQuizServer(pId, p.activityType);
      if (!isQuiz) {
        const best = Math.max(0, Math.min(100, Math.round(Number(p.bestScore ?? p.bestPercentage ?? p.score ?? 0))));
        challengesSum += best;
      }
    });

    let badgeBonus = 0;
    achSnap.docs.forEach((d) => {
      const badge = BADGES.find(b => b.id === d.id);
      if (badge && badge.pointsBonus) badgeBonus += badge.pointsBonus;
    });

    const officialTotal = dailyPoints + challengesSum + badgeBonus;
    await doc.ref.set({
      points: officialTotal,
      xp: officialTotal,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    await db.collection('publicProfiles').doc(doc.id).set({
      id: doc.id,
      publicId: u.publicId || (u.username ? String(u.username).toUpperCase() : 'ALUNO_TIC'),
      turma: u.turma || '',
      avatar: u.avatar,
      points: officialTotal,
      role: 'student',
    }, { merge: true });

    updatedCount++;
  }
  return updatedCount;
}

app.post('/api/teacher/students/recalibrate-points', requireAuth, requireTeacher, async (_req, res) => {
  try {
    const updatedCount = await recalibrateStudentsPoints();
    return res.json({ success: true, count: updatedCount, message: `Pontuações de ${updatedCount} alunos recalibradas com sucesso.` });
  } catch (error) {
    console.error('Recalibrate points error:', error);
    return res.status(500).json({ error: 'Não foi possível recalibrar as pontuações.' });
  }
});

/* ============================================================
   STARTUP & VITE DEVELOPMENT SPA INTEGRATION
   ============================================================ */

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Plataforma TIC 5] Server running on http://0.0.0.0:${PORT} (Node ${process.version}, Mode: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
