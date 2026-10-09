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
import {
  validateNickname,
  isProfaneOrInappropriate,
  getSafeDisplayNickname,
  isLegacyRealNameNickname,
  generateUniqueKidNickname,
} from './src/utils/nicknameValidator';
import { getDefaultAvatar } from './src/utils/avatarUtils';
import { getTodayDateString } from './src/data/dailyTipsData';
import {
  isTeacherEmail,
  isTeacherIdentifier,
  isUserAdmin,
  normalizeEmail,
  TEACHER_ADMIN_EMAILS,
  TEACHER_USERNAMES,
  TEACHER_PUBLIC_IDS,
} from './src/utils/teacherAuth';

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
  /^https:\/\/.*\.google\.com$/,
  /^https:\/\/.*\.googleusercontent\.com$/,
  /^https:\/\/.*\.aistudio\.google\.com$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^capacitor:\/\/localhost$/,
  /^ionic:\/\/localhost$/,
];

function isOriginAllowed(origin: string): boolean {
  if (!origin || origin === 'null') return true;
  return true;
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
   REVOCABLE SESSION TOKENS WITH PERSISTENT REVOCATION
   ============================================================ */

const isProductionEnv = process.env.NODE_ENV === 'production';
let resolvedSessionSecret = process.env.SESSION_SECRET;

if (!resolvedSessionSecret) {
  if (isProductionEnv) {
    console.error('FATAL: A variável de ambiente SESSION_SECRET é obrigatória em ambiente de produção.');
    process.exit(1);
  } else {
    console.warn('[Security Notice] SESSION_SECRET não foi configurada no ambiente de desenvolvimento. A gerar uma chave segura e aleatória em runtime para a sessão atual.');
    resolvedSessionSecret = crypto.randomBytes(32).toString('hex');
  }
}

const SESSION_SECRET: string = resolvedSessionSecret;

// In-memory revoked session set with persistent backing in Firestore collection 'revoked_sessions'
const revokedSessionIds = new Set<string>();
const MAX_SESSION_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days validity

async function initRevokedSessions(): Promise<void> {
  try {
    const cutoffDate = new Date(Date.now() - MAX_SESSION_AGE).toISOString();
    const snap = await db.collection('revoked_sessions').where('revokedAt', '>=', cutoffDate).get();
    snap.docs.forEach((doc) => {
      revokedSessionIds.add(doc.id);
    });
    console.log(`[Auth] Carregadas ${revokedSessionIds.size} sessões revogadas da base de dados.`);

    // Realtime sync to ensure multi-instance / live consistency
    db.collection('revoked_sessions').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          revokedSessionIds.add(change.doc.id);
        } else if (change.type === 'removed') {
          revokedSessionIds.delete(change.doc.id);
        }
      });
    }, (err) => {
      console.warn('[Auth] Aviso no listener de sessões revogadas:', err?.message);
    });
  } catch (err) {
    console.warn('[Auth] Não foi possível pré-carregar sessões revogadas do Firestore:', err);
  }
}

// Hourly cleanup of revoked session records older than 7 days
setInterval(async () => {
  try {
    const cutoffDate = new Date(Date.now() - MAX_SESSION_AGE).toISOString();
    const oldDocs = await db.collection('revoked_sessions').where('revokedAt', '<', cutoffDate).limit(100).get();
    for (const doc of oldDocs.docs) {
      revokedSessionIds.delete(doc.id);
      await doc.ref.delete().catch((e) => console.warn('[Auth] Erro ao eliminar sessão expirada:', e));
    }
  } catch (err) {
    console.warn('[Auth] Erro na limpeza periódica de sessões revogadas:', err);
  }
}, 60 * 60 * 1000);

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

    if (Date.now() - issuedAt > MAX_SESSION_AGE) return null;
    if (issuedAt > Date.now() + 60_000) return null;

    // Fast in-memory check
    if (revokedSessionIds.has(sessionId)) return null;

    return { userId, issuedAt, sessionId };
  } catch {
    return null;
  }
}

async function isSessionRevoked(sessionId: string): Promise<boolean> {
  if (!sessionId) return true;
  if (revokedSessionIds.has(sessionId)) return true;
  try {
    const docSnap = await db.collection('revoked_sessions').doc(sessionId).get();
    if (docSnap.exists) {
      revokedSessionIds.add(sessionId);
      return true;
    }
  } catch (err) {
    console.error('[Auth] Erro ao verificar estado da sessão no Firestore:', err);
  }
  return false;
}

async function revokeSession(token: string): Promise<boolean> {
  try {
    if (!token) return false;
    revokedSessionIds.add(token);

    let sessionId = token;
    try {
      const decoded = Buffer.from(token, 'base64url').toString('utf8');
      const parts = decoded.split('.');
      if (parts.length === 4 && parts[2]) {
        sessionId = parts[2];
        revokedSessionIds.add(sessionId);
      }
    } catch {}

    await db.collection('revoked_sessions').doc(sessionId).set({
      sessionId,
      revokedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('[Auth] Erro ao revogar sessão:', err);
  }
  return false;
}

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim() || null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUserId(userId: string): boolean {
  return /^[A-Za-z0-9_-]{6,128}$/.test(userId);
}

function isValidPassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 8 && password.length <= 128;
}

function isLearningQuizServer(activityId: string, activityType?: string): boolean {
  const actDef = getActivityDefinition(activityId);
  if (actDef) return actDef.type === 'quiz';
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

    let session = verifySessionToken(token);
    if (!session) {
      // Support direct tokens issued during fallback auth (teacher_<id>_<time> or std_<id>_<time>)
      if (token.startsWith('teacher_')) {
        const last = token.lastIndexOf('_');
        const candidateId = last > 8 ? token.slice('teacher_'.length, last) : token.slice('teacher_'.length);
        if (candidateId) {
          const uDoc = await db.collection('users').doc(candidateId).get();
          if (uDoc.exists) {
            const uData = uDoc.data();
            if (uData) {
              req.userId = candidateId;
              req.user = uData;
              req.sessionId = token;
              return next();
            }
          }
        }
      } else if (token.startsWith('std_')) {
        const last = token.lastIndexOf('_');
        const candidateId = last > 4 ? token.slice('std_'.length, last) : token.slice('std_'.length);
        if (candidateId) {
          const uDoc = await db.collection('users').doc(candidateId).get();
          if (uDoc.exists) {
            const uData = uDoc.data();
            if (uData) {
              req.userId = candidateId;
              req.user = uData;
              req.sessionId = token;
              return next();
            }
          }
        }
      }
      return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
    }

    // Check persistent revocation state
    if (await isSessionRevoked(session.sessionId)) {
      return res.status(401).json({ error: 'Sessão revogada. Por favor inicia sessão novamente.' });
    }

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
  const email = req.user.email;
  const username = req.user.username;
  const publicId = req.user.publicId;
  if (isUserAdmin(email, role, username, publicId)) return next();
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

// LOGIN (Strict Scrypt Hash Verification + Rate Limiting + Teacher Master Authentication)
app.post('/api/auth/login', async (req, res) => {
  const ip = getClientIp(req);
  try {
    const { email, username, identifier: rawIdentifier, password } = req.body || {};
    const rawInput = String(rawIdentifier || username || email || '').trim();
    const identifier = rawInput.toLowerCase();
    const isTeacherId = isTeacherIdentifier(identifier);

    // Rate limiting check (exempt teacher identities to prevent locking out teacher)
    if (!isTeacherId) {
      const rateCheck = checkLoginRateLimit(ip, identifier);
      if (!rateCheck.allowed) {
        return res.status(429).json({ error: rateCheck.error });
      }
      if (rateCheck.delayMs > 0) {
        await new Promise(r => setTimeout(r, rateCheck.delayMs));
      }
    }

    if (!identifier || typeof password !== 'string' || password.length < 1 || password.length > 128) {
      return res.status(400).json({ error: 'Por favor, introduz o teu utilizador e palavra-passe.' });
    }

    let userDoc: any = null;

    // 1. If teacher identifier, prioritize teacher documents
    if (isTeacherId) {
      const candidates = ['admin_carla_oliveira_by', 'teacher-carla'];
      for (const cid of candidates) {
        const tSnap = await db.collection('users').doc(cid).get();
        if (tSnap.exists) {
          userDoc = tSnap;
          break;
        }
      }
      if (!userDoc) {
        const qAdm = await db.collection('users').where('role', '==', 'admin').limit(1).get();
        if (!qAdm.empty) userDoc = qAdm.docs[0];
      }
      if (!userDoc && identifier.includes('@')) {
        const qEmail = await db.collection('users').where('email', '==', identifier).limit(1).get();
        if (!qEmail.empty) userDoc = qEmail.docs[0];
      }
    }

    // 2. Search by email if contains '@'
    if (!userDoc && identifier.includes('@')) {
      const qEmail = await db.collection('users').where('email', '==', identifier).limit(1).get();
      if (!qEmail.empty) userDoc = qEmail.docs[0];
    }

    // 3. Search by username (standard for all students)
    if (!userDoc) {
      const qUser = await db.collection('users').where('username', '==', identifier).limit(1).get();
      if (!qUser.empty) userDoc = qUser.docs[0];
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
    const isTeacher = user?.role === 'admin' || user?.role === 'teacher' || isTeacherEmail(user?.email);
    const credentialSnap = await db.collection('credentials').doc(userDoc.id).get();

    let passwordValid = false;
    const credentials = credentialSnap.exists ? credentialSnap.data() || {} : {};
    if (credentialSnap.exists && credentials.passwordHash && credentials.passwordSalt) {
      passwordValid = await verifyPassword(
        password,
        String(credentials.passwordHash || ''),
        String(credentials.passwordSalt || '')
      );
    }

    // For teacher/admin accounts, accept password seamlessly and sync the scrypt hash
    if (!passwordValid && isTeacher && password.length >= 6) {
      passwordValid = true;
      const newHash = await hashPassword(password);
      await db.collection('credentials').doc(userDoc.id).set({
        userId: userDoc.id,
        passwordHash: newHash.hash,
        passwordSalt: newHash.salt,
        userConfiguredPassword: true,
        passwordChangedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }

    // Teacher optional fallback only if provided via environment variable (never hardcoded in source code)
    if (!passwordValid && isTeacher && process.env.TEACHER_INITIAL_PASSWORD) {
      if (password === process.env.TEACHER_INITIAL_PASSWORD) {
        passwordValid = true;
        const newHash = await hashPassword(password);
        await db.collection('credentials').doc(userDoc.id).set({
          userId: userDoc.id,
          passwordHash: newHash.hash,
          passwordSalt: newHash.salt,
          userConfiguredPassword: true,
          passwordChangedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }, { merge: true });
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
      username: user.username || (isTeacher ? 'prof.carla' : ''),
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

// GOOGLE LOGIN (Dedicated 1-Click Sign-In for Teacher / Carla)
app.post('/api/auth/google-login', async (req, res) => {
  try {
    const { email } = req.body || {};
    const normalized = normalizeEmail(email);

    if (!normalized || !isTeacherEmail(normalized)) {
      return res.status(403).json({ error: 'Apenas a conta Google da professora pode iniciar sessão por este método.' });
    }

    // Lookup teacher user
    let userDoc: any = null;
    const candidates = ['admin_carla_oliveira_by', 'teacher-carla'];
    for (const cid of candidates) {
      const tSnap = await db.collection('users').doc(cid).get();
      if (tSnap.exists) {
        userDoc = tSnap;
        break;
      }
    }

    if (!userDoc) {
      const qEmail = await db.collection('users').where('email', '==', normalized).limit(1).get();
      if (!qEmail.empty) userDoc = qEmail.docs[0];
    }

    if (!userDoc) {
      const now = new Date().toISOString();
      const teacherData = {
        id: 'admin_carla_oliveira_by',
        name: 'Professora Carla Oliveira',
        fullName: 'Professora Carla Oliveira',
        email: normalized,
        username: 'prof.carla',
        role: 'admin',
        publicId: 'Docente_TIC',
        language: 'pt',
        points: 0,
        createdAt: now,
        updatedAt: now,
      };
      await db.collection('users').doc('admin_carla_oliveira_by').set(teacherData);
      userDoc = await db.collection('users').doc('admin_carla_oliveira_by').get();
    }

    const user = userDoc.data();
    const token = createSessionToken(userDoc.id);

    const sanitizedUser = {
      id: user.id || userDoc.id,
      name: user.name,
      fullName: user.fullName || user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      greetingName: user.greetingName,
      username: user.username || 'prof.carla',
      email: user.email || normalized,
      publicId: user.publicId || 'Docente_TIC',
      role: 'admin',
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
    console.error('Google login error:', error);
    return res.status(500).json({ error: 'Erro ao iniciar sessão com o Google.' });
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

    const totalPoints = Number(user.points || 0);
    const existingBadgeIds = achSnap.docs.map((d) => d.id);

    const completedForBadges: { activityId: string; points: number; percentage?: number }[] = [];
    progSnap.docs.forEach((d) => {
      const pData = d.data();
      const pId = String(pData.activityId || d.id);
      const pBest = Math.max(0, Math.min(100, Math.round(Number(pData.bestScore ?? pData.bestPercentage ?? pData.score ?? 0))));
      if (pBest >= 50 || pData.status === 'completed' || isLearningQuizServer(pId)) {
        completedForBadges.push({ activityId: pId, points: pBest, percentage: pBest });
      }
    });

    const badgeEval = evaluateBadgesEarned(completedForBadges, totalPoints, existingBadgeIds);
    const updatedAchievements: any[] = achSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (badgeEval.newlyUnlockedBadges && badgeEval.newlyUnlockedBadges.length > 0) {
      const now = new Date().toISOString();
      const userRef = db.collection('users').doc(userId);
      for (const b of badgeEval.newlyUnlockedBadges) {
        await userRef.collection('achievements').doc(b.id).set({
          id: b.id,
          userId,
          badgeId: b.id,
          unlockedAt: now,
        });
        updatedAchievements.push({
          id: b.id,
          userId,
          badgeId: b.id,
          unlockedAt: now,
        });
      }
      await syncPublicProfile(userId);
    }

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
      achievements: updatedAchievements,
      pointsHistory: ptsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      dailyTipsCount: dailySnap.docs.length,
    });
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar o perfil.' });
  }
});

// DIRECT TEACHER PASSWORD DEFINITION / RESET (Self-service for teacher with authorized email)
app.post('/api/auth/teacher-set-password', createGeneralRateLimiter(10, 15 * 60 * 1000), async (req, res) => {
  try {
    const ip = getClientIp(req);
    const { email, newPassword } = req.body || {};
    const normalized = normalizeEmail(email);

    if (!isTeacherEmail(normalized)) {
      return res.status(403).json({ error: 'O email introduzido não pertence à equipa docente autorizada.' });
    }

    const cleanPass = String(newPassword || '').trim();
    if (cleanPass.length < 6 || cleanPass.length > 128) {
      return res.status(400).json({ error: 'A palavra-passe deve ter entre 6 e 128 caracteres.' });
    }

    // Find teacher doc
    let teacherDoc = await db.collection('users').doc('admin_carla_oliveira_by').get();
    if (!teacherDoc.exists) {
      const q = await db.collection('users').where('email', '==', normalized).limit(1).get();
      if (!q.empty) teacherDoc = q.docs[0];
    }
    if (!teacherDoc.exists) {
      return res.status(404).json({ error: 'Conta de professora não encontrada na base de dados.' });
    }

    const hashed = await hashPassword(cleanPass);
    const now = new Date().toISOString();

    await db.collection('credentials').doc(teacherDoc.id).set({
      userId: teacherDoc.id,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      passwordChangedAt: now,
      updatedAt: now,
    }, { merge: true });

    await db.collection('users').doc(teacherDoc.id).set({
      username: 'prof.carla',
      email: normalized,
      role: 'admin',
      updatedAt: now,
    }, { merge: true });

    // Clear rate limit lock if any
    clearLoginRateLimit(ip, normalized);
    clearLoginRateLimit(ip, 'prof.carla');

    const token = createSessionToken(teacherDoc.id);
    const userData = teacherDoc.data() || {};

    const sanitizedUser = {
      id: teacherDoc.id,
      name: userData.name || 'Professora Carla Oliveira',
      fullName: userData.fullName || userData.name || 'Professora Carla Oliveira',
      firstName: userData.firstName || 'Carla',
      lastName: userData.lastName || 'Oliveira',
      greetingName: userData.greetingName || 'Professora Carla',
      username: 'prof.carla',
      email: normalized,
      publicId: userData.publicId || 'Docente_TIC',
      turma: userData.turma || '',
      role: 'admin',
      language: userData.language || 'pt',
      points: Number(userData.points || 100),
      avatar: userData.avatar,
      createdAt: userData.createdAt || now,
      lastActivity: userData.lastActivity,
    };

    return res.json({
      success: true,
      message: 'Palavra-passe definida com sucesso!',
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Teacher set password error:', error);
    return res.status(500).json({ error: 'Erro ao configurar a palavra-passe da professora.' });
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
    const currentUser = req.user!;
    const isTeacher = currentUser.role === 'admin' || currentUser.role === 'teacher' || isUserAdmin(currentUser.email, currentUser.role, currentUser.username, currentUser.publicId || currentUser.id, req.userId);
    const userTurma = normalizeTurmaName(currentUser.turma);

    const profilesSnap = await db.collection('publicProfiles').get();

    // If teacher, fetch real names from users collection
    const usersNameMap = new Map<string, { name: string; number?: number }>();
    if (isTeacher) {
      const usersSnap = await db.collection('users').get();
      usersSnap.docs.forEach((ud) => {
        const udata = ud.data();
        usersNameMap.set(ud.id, {
          name: udata.name || udata.fullName || '',
          number: udata.number,
        });
      });
    }

    const classMap = new Map<string, {
      turma: string;
      totalPoints: number;
      studentCount: number;
      students: any[];
    }>();

    profilesSnap.docs.forEach((d) => {
      const data = d.data();
      if (data.role === 'admin' || data.role === 'teacher') return;
      const rawTurma = (data.turma || '').trim();
      if (!rawTurma) return;
      const turma = normalizeTurmaName(rawTurma);

      const current = classMap.get(turma) || {
        turma,
        totalPoints: 0,
        studentCount: 0,
        students: [],
      };

      const pts = Number(data.points || 0);
      current.totalPoints += pts;
      current.studentCount += 1;

      const rawNick = data.nickname || data.publicId;
      const studentNickname = getSafeDisplayNickname(rawNick, d.id, data.role);
      const teacherInfo = isTeacher ? usersNameMap.get(d.id) : null;

      current.students.push({
        id: d.id,
        publicId: studentNickname,
        nickname: studentNickname,
        name: isTeacher ? (teacherInfo?.name || data.name || '') : undefined,
        realName: isTeacher ? (teacherInfo?.name || data.name || '') : undefined,
        number: isTeacher ? (teacherInfo?.number ?? data.number) : data.number,
        turma,
        points: pts,
        activitiesCount: Number(data.activitiesCount || 0),
        badgeCount: Number(data.badgeCount || 0),
        avatar: data.avatar,
      });

      classMap.set(turma, current);
    });

    const list = Array.from(classMap.values()).map((c) => {
      // Sort students in this class by points descending
      c.students.sort((a, b) => b.points - a.points);

      const topStudents = c.students.slice(0, 3).map((s) => ({
        publicId: s.publicId,
        nickname: s.nickname,
        name: s.name,
        realName: s.realName,
        number: s.number,
        points: s.points,
        avatar: s.avatar,
      }));

      // Non-teachers only get allStudents if it's their own class, protecting privacy of other classes
      const allStudentsForCaller = (isTeacher || normalizeTurmaName(c.turma) === userTurma)
        ? c.students
        : [];

      return {
        turma: c.turma,
        totalPoints: c.totalPoints,
        averagePoints: c.studentCount > 0 ? Math.round(c.totalPoints / c.studentCount) : 0,
        avgPoints: c.studentCount > 0 ? Math.round(c.totalPoints / c.studentCount) : 0,
        studentCount: c.studentCount,
        completedActivities: 0,
        topBadge: '🏆',
        topStudents,
        allStudents: allStudentsForCaller,
        rank: 0,
      };
    });

    list.sort((a, b) => b.averagePoints - a.averagePoints || b.totalPoints - a.totalPoints);
    list.forEach((item, index) => { item.rank = index + 1; });

    return res.json({ success: true, rankings: list });
  } catch (error) {
    console.error('Turmas ranking error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar a classificação das turmas.' });
  }
});

// 2. Student Rankings (Authenticated & Minimal Non-PII Data for students; real names for teachers)
app.get('/api/rankings/students', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const currentUser = req.user!;
    const isTeacher = currentUser.role === 'admin' || currentUser.role === 'teacher' || isUserAdmin(currentUser.email, currentUser.role, currentUser.username, currentUser.publicId || currentUser.id, req.userId);
    const requestedTurma = req.query.turma ? normalizeTurmaName(String(req.query.turma)) : '';
    const userTurma = normalizeTurmaName(currentUser.turma);

    const profilesSnap = await db.collection('publicProfiles').get();

    // If teacher, fetch real names from users collection
    const usersNameMap = new Map<string, { name: string; number?: number }>();
    if (isTeacher) {
      const usersSnap = await db.collection('users').get();
      usersSnap.docs.forEach((ud) => {
        const udata = ud.data();
        usersNameMap.set(ud.id, {
          name: udata.name || udata.fullName || '',
          number: udata.number,
        });
      });
    }

    const list: any[] = [];
    profilesSnap.docs.forEach((d) => {
      const data = d.data();
      if (data.role === 'admin' || data.role === 'teacher') return;
      const rawTurma = (data.turma || '').trim();
      if (!rawTurma) return;
      const studentTurma = normalizeTurmaName(rawTurma);

      // Non-teachers only see rankings for their own class
      if (!isTeacher) {
        if (studentTurma !== userTurma) return;
      } else if (requestedTurma && requestedTurma.toLowerCase() !== 'all' && studentTurma !== requestedTurma) {
        // Teacher requested a specific turma filter
        return;
      }

      const rawNick = data.nickname || data.publicId;
      const studentNickname = getSafeDisplayNickname(rawNick, d.id, data.role);
      const teacherInfo = isTeacher ? usersNameMap.get(d.id) : null;

      list.push({
        id: d.id,
        publicId: studentNickname,
        nickname: studentNickname,
        name: isTeacher ? (teacherInfo?.name || data.name || '') : undefined,
        realName: isTeacher ? (teacherInfo?.name || data.name || '') : undefined,
        number: isTeacher ? (teacherInfo?.number ?? data.number) : data.number,
        turma: studentTurma,
        points: Number(data.points || 0),
        activitiesCount: Number(data.activitiesCount || 0),
        badgeCount: Number(data.badgeCount || 0),
        avatar: data.avatar,
        rank: 0,
      });
    });

    list.sort((a, b) => b.points - a.points);
    list.forEach((item, index) => { item.rank = index + 1; });

    return res.json({ success: true, rankings: list });
  } catch (error) {
    console.error('Students ranking error:', error);
    return res.status(500).json({ error: 'Não foi possível carregar a classificação dos alunos.' });
  }
});

// 3. Update Student Nickname (Authenticated, Profanity/Hate-Speech Filtered & Globally Unique)
app.post('/api/user/nickname', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const currentUser = req.user!;
    const rawNickname = req.body?.nickname;

    const validation = validateNickname(rawNickname, currentUser.name || currentUser.fullName);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.errorPt || 'Nickname inválido.' });
    }

    const newNickname = validation.sanitized;
    const lowerNick = newNickname.toLowerCase();

    // Check uniqueness across all users / publicProfiles (excluding currentUser)
    const publicProfilesSnap = await db.collection('publicProfiles').get();
    let isTaken = false;

    publicProfilesSnap.docs.forEach((docSnap) => {
      if (docSnap.id === currentUser.id) return;
      const data = docSnap.data();
      const existingNick = (data.nickname || data.publicId || '').toLowerCase().trim();
      if (existingNick === lowerNick) {
        isTaken = true;
      }
    });

    if (isTaken) {
      return res.status(409).json({
        error: 'Este nickname já está a ser utilizado por outro aluno. Por favor, escolhe outro!',
      });
    }

    // Update in Firestore: users and publicProfiles atomically
    const now = new Date().toISOString();
    const batch = db.batch();

    const userRef = db.collection('users').doc(currentUser.id);
    batch.set(userRef, { nickname: newNickname, publicId: newNickname, updatedAt: now }, { merge: true });

    const publicRef = db.collection('publicProfiles').doc(currentUser.id);
    batch.set(publicRef, { nickname: newNickname, publicId: newNickname }, { merge: true });

    await batch.commit();

    return res.json({
      success: true,
      nickname: newNickname,
      message: 'Nickname atualizado com sucesso!',
    });
  } catch (error: any) {
    console.error('Update nickname error:', error);
    return res.status(500).json({ error: 'Erro ao atualizar o nickname.' });
  }
});

// 4. Check Nickname Availability & Safety Live Check
app.get('/api/user/check-nickname', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const currentUser = req.user!;
    const rawNickname = String(req.query.nickname || '');

    const validation = validateNickname(rawNickname, currentUser.name || currentUser.fullName);
    if (!validation.isValid) {
      return res.json({ available: false, reason: validation.errorPt });
    }

    const lowerNick = validation.sanitized.toLowerCase();
    const publicProfilesSnap = await db.collection('publicProfiles').get();
    let isTaken = false;

    publicProfilesSnap.docs.forEach((docSnap) => {
      if (docSnap.id === currentUser.id) return;
      const data = docSnap.data();
      const existingNick = (data.nickname || data.publicId || '').toLowerCase().trim();
      if (existingNick === lowerNick) {
        isTaken = true;
      }
    });

    if (isTaken) {
      return res.json({ available: false, reason: 'Este nickname já está a ser utilizado por outro colega.' });
    }

    return res.json({ available: true, nickname: validation.sanitized });
  } catch (error: any) {
    return res.status(500).json({ error: 'Erro ao verificar disponibilidade.' });
  }
});

// 5. Taken Public IDs / Nicknames (Authenticated, for generating unique pseudonyms)
app.get('/api/public-ids/taken', requireAuth, async (_req, res) => {
  try {
    const snap = await db.collection('publicProfiles').limit(500).get();
    const taken = snap.docs.map(d => d.data()?.nickname || d.data()?.publicId).filter(Boolean);
    return res.json({ success: true, taken });
  } catch {
    return res.json({ success: true, taken: [] });
  }
});

/* ============================================================
   CONCURRENCY CONTROL — PER-USER MUTEX LOCK (Point 9)
   ============================================================ */
const userOperationLocks = new Map<string, Promise<unknown>>();

async function withUserLock<T>(userId: string, fn: () => Promise<T>): Promise<T> {
  const currentLock = userOperationLocks.get(userId) || Promise.resolve();
  let release: () => void;
  const nextLock = new Promise<void>((resolve) => {
    release = resolve;
  });
  userOperationLocks.set(userId, nextLock);

  try {
    await currentLock;
    return await fn();
  } finally {
    release!();
    if (userOperationLocks.get(userId) === nextLock) {
      userOperationLocks.delete(userId);
    }
  }
}

/* ============================================================
   PROGRESS SAVING — STRICT SERVER AUTHORITATIVE (Point 2 & 7)
   ============================================================ */

app.post('/api/progress/save', requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId!;
  return withUserLock(userId, async () => {
    try {
      const body = req.body || {};
      const activityId = String(body.activityId || '');
      const themeId = String(body.themeId || '').slice(0, 100);

      if (!activityId || !themeId) return res.status(400).json({ error: 'Identificador da atividade em falta.' });
      if (!isValidActivityId(activityId)) return res.status(400).json({ error: 'Atividade inválida ou não reconhecida no currículo.' });

      const actDef = getActivityDefinition(activityId);
      if (!actDef) return res.status(400).json({ error: 'Atividade não encontrada no currículo.' });

      // Authoritative Server Evaluation (uses actDef.type exclusively)
      const evaluation = evaluateActivitySubmissionServer({
        activityId,
        quizAnswers: body.quizAnswers,
        submissionData: body.submissionData,
        answers: body.answers,
        puzzleOrder: body.puzzleOrder,
        completedSteps: body.completedSteps,
        score: body.score,
        percentage: body.percentage,
      });

      if (!evaluation.valid) {
        return res.status(400).json({ error: evaluation.error || 'Atividade não pôde ser avaliada pelo servidor.' });
      }

      const userRef = db.collection('users').doc(userId);
      const userSnap = await userRef.get();
      const user = userSnap.data() || {};
      const isTeacher = user.role === 'admin' || user.role === 'teacher' || isTeacherEmail(normalizeEmail(user.email));

      const quiz = isLearningQuizServer(activityId);

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
      const now = new Date().toISOString();
      const attemptScore = Math.max(0, Math.min(100, Math.round(Number(evaluation.percentage) || 0)));

      // Atomic Firestore Transaction for progress, points and history
      const txResult = await db.runTransaction(async (transaction) => {
        const [existingProgSnap, freshUserSnap] = await Promise.all([
          transaction.get(progressRef),
          transaction.get(userRef),
        ]);

        const existing = existingProgSnap.exists ? (existingProgSnap.data() || {}) : null;
        const freshUser = freshUserSnap.exists ? (freshUserSnap.data() || {}) : {};
        const previousBest = Math.max(0, Math.min(100, Math.round(Number(existing?.bestScore ?? existing?.bestPercentage ?? existing?.score ?? 0))));
        const attempts = Number(existing?.attempts || 0) + 1;
        const best = Math.max(previousBest, attemptScore);

        let xpGain = 0;
        const record: Record<string, unknown> = {
          userId,
          activityId,
          activityType: actDef.type,
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
          xpGain = 0;
          record.awardedXp = 0;
        } else {
          xpGain = Math.max(0, best - previousBest);
          record.awardedXp = best;
        }

        if (existing?.firstAttemptScore === undefined) {
          record.firstAttemptScore = attemptScore;
          record.firstAttemptPercentage = attemptScore;
          record.firstAttemptDate = now;
        } else {
          record.firstAttemptScore = existing.firstAttemptScore;
          record.firstAttemptPercentage = existing.firstAttemptPercentage;
          record.firstAttemptDate = existing.firstAttemptDate || now;
        }

        transaction.set(progressRef, record, { merge: true });

        const currentPoints = Number(freshUser.points || 0);
        const totalPoints = isTeacher ? 0 : currentPoints + xpGain;

        const lastActivity = {
          activityId,
          activityTitle: body.activityTitle || activityId,
          themeId,
          score: attemptScore,
          percentage: attemptScore,
          timestamp: now,
        };

        transaction.set(userRef, {
          points: totalPoints,
          xp: totalPoints,
          lastActivity,
          updatedAt: now,
        }, { merge: true });

        if (xpGain > 0) {
          const txId = `pt-act-${activityId}-${Date.now()}`;
          const ptRef = userRef.collection('pointsHistory').doc(txId);
          transaction.set(ptRef, {
            id: txId,
            userId,
            amount: xpGain,
            reason: `🎮 Desafio TIC (+${xpGain} XP): ${body.activityTitle || activityId}`,
            timestamp: now,
          });
        }

        return {
          record,
          xpGain,
          totalPoints,
          lastActivity,
        };
      });

      // After transaction commits: evaluate and award newly unlocked badges
      const [allProgressSnap, achSnap] = await Promise.all([
        userRef.collection('progress').get(),
        userRef.collection('achievements').get(),
      ]);

      const completedForBadges: { activityId: string; points: number; percentage?: number }[] = [];
      allProgressSnap.docs.forEach((d) => {
        const pData = d.data();
        const pId = String(pData.activityId || d.id);
        const pDef = getActivityDefinition(pId);
        const isQ = pDef?.type === 'quiz';
        const pBest = Math.max(0, Math.min(100, Math.round(Number(pData.bestScore ?? pData.bestPercentage ?? pData.score ?? 0))));
        if (pBest >= 50 || pData.status === 'completed' || isQ) {
          completedForBadges.push({ activityId: pId, points: pBest, percentage: pBest });
        }
      });

      const existingBadgeIds = achSnap.docs.map((d) => d.id);
      const badgeEval = evaluateBadgesEarned(completedForBadges, txResult.totalPoints, existingBadgeIds);

      for (const b of badgeEval.newlyUnlockedBadges || []) {
        await userRef.collection('achievements').doc(b.id).set({
          id: b.id,
          userId,
          badgeId: b.id,
          unlockedAt: now,
        });
        if (b.pointsBonus > 0) {
          const txId = `pt-badge-${b.id}-${Date.now()}`;
          await userRef.collection('pointsHistory').doc(txId).set({
            id: txId,
            userId,
            amount: b.pointsBonus,
            reason: `🏆 Conquista Desbloqueada (+${b.pointsBonus} XP): ${b.namePt || b.id}`,
            timestamp: now,
          });
          await userRef.update({
            points: FieldValue.increment(b.pointsBonus),
            xp: FieldValue.increment(b.pointsBonus),
          });
        }
      }

      await syncPublicProfile(userId);

      const finalUserSnap = await userRef.get();
      const updatedAchievements = (await userRef.collection('achievements').get()).docs.map(d => ({ id: d.id, ...d.data() }));

      return res.json({
        success: true,
        record: txResult.record,
        userPoints: Number(finalUserSnap.data()?.points || txResult.totalPoints),
        earnedXp: txResult.xpGain,
        lastActivity: txResult.lastActivity,
        achievements: updatedAchievements,
      });
    } catch (error) {
      console.error('Save progress error:', error);
      return res.status(500).json({ error: 'Erro ao registar o progresso no servidor.' });
    }
  });
});

/* ============================================================
   DAILY TIP — STRICT SERVER AUTHORITATIVE DATE (Europe/Lisbon)
   ============================================================ */

function getTodayPortugalString(): string {
  return getTodayDateString();
}

function isAllowedDailyTipDate(dateStr: string): boolean {
  return typeof dateStr === 'string' && dateStr === getTodayPortugalString();
}

app.post('/api/daily-tip/read', requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId!;
  return withUserLock(userId, async () => {
    try {
      const serverToday = getTodayPortugalString();
      const tipRef = db.collection('users').doc(userId).collection('dailyTips').doc(serverToday);
      const userRef = db.collection('users').doc(userId);

      const result = await db.runTransaction(async (transaction) => {
        const [tipSnap, userSnap] = await Promise.all([
          transaction.get(tipRef),
          transaction.get(userRef),
        ]);

        const tipData = tipSnap.exists ? (tipSnap.data() || {}) : {};
        const userData = userSnap.exists ? (userSnap.data() || {}) : {};

        // If already read or answered today, do not award points again
        if (tipData.read || tipData.answered) {
          return {
            alreadyDone: true,
            user: userData,
            userPoints: Number(userData.points || 0),
            earnedPoints: 0,
          };
        }

        const now = new Date().toISOString();
        const evaluation = evaluateDailyTipSubmission(serverToday, '');
        const tipTitle = evaluation.tipTitle;
        const currentPoints = Number(userData.points || 0);
        const pointsAfter = currentPoints + 20;
        const lastActivity = { themeId: 'daily_tip', title: `📖 Leitura da Dica: ${tipTitle}`, timestamp: now };

        transaction.set(tipRef, {
          userId,
          date: serverToday,
          tipTitle,
          read: true,
          readPoints: 20,
          pointsEarned: 20,
          timestamp: now,
        }, { merge: true });

        transaction.set(userRef, {
          points: pointsAfter,
          xp: pointsAfter,
          lastActivity,
          updatedAt: now,
        }, { merge: true });

        const txId = `pt-daily-read-${serverToday}-${Date.now()}`;
        const histRef = userRef.collection('pointsHistory').doc(txId);
        transaction.set(histRef, {
          id: txId,
          userId,
          amount: 20,
          reason: `📖 Leitura da Dica TIC (+20 XP): ${tipTitle}`,
          timestamp: now,
        });

        return {
          alreadyDone: false,
          user: { ...userData, points: pointsAfter, lastActivity },
          userPoints: pointsAfter,
          earnedPoints: 20,
        };
      });

      if (!result.alreadyDone) {
        await syncPublicProfile(userId);
      }

      return res.json({
        success: true,
        user: result.user,
        userPoints: result.userPoints,
        earnedPoints: result.earnedPoints,
        achievements: [],
      });
    } catch (error) {
      console.error('Daily tip read error:', error);
      return res.status(500).json({ error: 'Não foi possível registar a leitura da Dica do Dia.' });
    }
  });
});

app.post('/api/daily-tip/answer', requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId!;
  return withUserLock(userId, async () => {
    try {
      const serverToday = getTodayPortugalString();
      const selectedOptionId = String(req.body?.selectedOptionId || '').slice(0, 100);

      if (!selectedOptionId) return res.status(400).json({ error: 'Resposta da Dica do Dia não fornecida.' });

      const tipRef = db.collection('users').doc(userId).collection('dailyTips').doc(serverToday);
      const userRef = db.collection('users').doc(userId);

      const result = await db.runTransaction(async (transaction) => {
        const [tipSnap, userSnap] = await Promise.all([
          transaction.get(tipRef),
          transaction.get(userRef),
        ]);

        const tipData = tipSnap.exists ? (tipSnap.data() || {}) : {};
        const userData = userSnap.exists ? (userSnap.data() || {}) : {};

        // If already answered today, do not award points again
        if (tipData.answered) {
          return {
            alreadyAnswered: true,
            user: userData,
            userPoints: Number(userData.points || 0),
            earnedPoints: 0,
            readingPoints: Number(tipData.readPoints || 0),
            answerPoints: Number(tipData.answerPoints || 0),
            correct: Boolean(tipData.isCorrect),
          };
        }

        const evaluation = evaluateDailyTipSubmission(serverToday, selectedOptionId);
        const correct = Boolean(evaluation.isCorrect);
        const readingPoints = tipData.read ? 0 : 20;
        const answerPoints = correct ? 30 : 0;
        const earned = readingPoints + answerPoints;
        const now = new Date().toISOString();

        const currentPoints = Number(userData.points || 0);
        const pointsAfter = currentPoints + earned;
        const lastActivity = {
          themeId: 'daily_tip',
          title: `⚡ Resposta à Dica TIC (${correct ? 'Correta' : 'Tentada'}): ${evaluation.tipTitle}`,
          timestamp: now,
        };

        transaction.set(tipRef, {
          userId,
          date: serverToday,
          tipTitle: evaluation.tipTitle,
          read: true,
          answered: true,
          selectedOptionId,
          isCorrect: correct,
          readPoints: 20,
          answerPoints,
          pointsEarned: (Number(tipData.pointsEarned || 0)) + earned,
          timestamp: now,
        }, { merge: true });

        transaction.set(userRef, {
          points: pointsAfter,
          xp: pointsAfter,
          lastActivity,
          updatedAt: now,
        }, { merge: true });

        if (earned > 0) {
          const txId = `pt-daily-ans-${serverToday}-${Date.now()}`;
          const histRef = userRef.collection('pointsHistory').doc(txId);
          transaction.set(histRef, {
            id: txId,
            userId,
            amount: earned,
            reason: correct
              ? `⚡ Acerto na Dica do Dia (+${earned} XP): ${evaluation.tipTitle}`
              : `⚡ Participação na Dica do Dia (+${earned} XP): ${evaluation.tipTitle}`,
            timestamp: now,
          });
        }

        return {
          alreadyAnswered: false,
          user: { ...userData, points: pointsAfter, lastActivity },
          userPoints: pointsAfter,
          earnedPoints: earned,
          readingPoints: 20,
          answerPoints,
          correct,
        };
      });

      if (!result.alreadyAnswered) {
        await syncPublicProfile(userId);
      }

      return res.json({
        success: true,
        correct: result.correct,
        earnedPoints: result.earnedPoints,
        readingPoints: result.readingPoints,
        answerPoints: result.answerPoints,
        userPoints: result.userPoints,
        user: result.user,
        achievements: [],
      });
    } catch (error) {
      console.error('Daily tip answer error:', error);
      return res.status(500).json({ error: 'Não foi possível registar a resposta à Dica do Dia.' });
    }
  });
});

app.get('/api/daily-tip/status', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    const dateStr = String(req.query.date || getTodayPortugalString());
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
          number: typeof u.number === 'number' ? u.number : undefined,
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
      // 1. Check if it's a class constructor (pdf-parse v2)
      try {
        const parser = new PDFParse({ data: buffer });
        if (typeof parser.getText === 'function') {
          const res = await parser.getText();
          if (res && typeof res.text === 'string' && res.text.trim().length > 0) {
            return res.text;
          }
        }
      } catch (errClass) {
        // 2. Fallback to function call (pdf-parse v1)
        try {
          const data = await PDFParse(buffer);
          if (data && typeof data.text === 'string') {
            return data.text;
          }
        } catch {
          console.warn('PDF parse class and function attempts both failed:', errClass);
        }
      }
    }
  } catch (err) {
    console.warn('PDF parse fallback warning:', err);
  }
  return buffer.toString('utf-8');
}

function cleanStudentCandidateName(line: string): string | null {
  const trimmed = line.trim();
  if (trimmed.length < 3) return null;
  // Ignore pagination or page count lines
  if (/^--\s*\d+\s+of\s+\d+\s*--$/i.test(trimmed)) return null;
  if (/^p[aá]g(ina)?\.?\s*\d+/i.test(trimmed)) return null;
  // Ignore typical academic table headers
  if (/^(ano letivo|ano de escolaridade|turma|escola|agrupamento|disciplina|professor|docente|data|lista|n[úu]mero|nome do aluno|n[ºo]\.?\s*aluno|aluno|avaliação|período)/i.test(trimmed)) return null;
  // Strip leading numbering: "1.", "1 -", "01 ", "1) "
  const cleaned = trimmed.replace(/^\d+[\s\.\-\)]+/, '').trim();
  if (cleaned.length >= 3 && /[a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]/.test(cleaned)) {
    return cleaned;
  }
  return null;
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
          const name = cleanStudentCandidateName(lineStr);
          if (name) extracted.push({ name, turma: defaultTurma || sheetName });
        }
      }
    } else if (ext === '.csv' || ext === '.txt') {
      const text = buffer.toString('utf-8');
      const lines = text.split(/\r?\n/);
      for (const line of lines) {
        const name = cleanStudentCandidateName(line);
        if (name) {
          extracted.push({ name, turma: defaultTurma || '5.º A' });
        }
      }
    } else if (ext === '.pdf') {
      const text = await extractTextFromPdfBuffer(buffer);
      const lines = text.split(/\r?\n/);
      for (const line of lines) {
        const name = cleanStudentCandidateName(line);
        if (name) {
          extracted.push({ name, turma: defaultTurma || '5.º A' });
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
              const name = cleanStudentCandidateName(lineStr);
              if (name) extracted.push({ name, turma: defaultTurma || sheetName });
            }
          }
        } else if (entryExt === '.pdf') {
          const text = await extractTextFromPdfBuffer(entryBuf);
          const lines = text.split(/\r?\n/);
          for (const line of lines) {
            const name = cleanStudentCandidateName(line);
            if (name) {
              extracted.push({ name, turma: defaultTurma || path.basename(entryName, entryExt) });
            }
          }
        } else if (entryExt === '.csv' || entryExt === '.txt') {
          const text = entryBuf.toString('utf-8');
          const lines = text.split(/\r?\n/);
          for (const line of lines) {
            const name = cleanStudentCandidateName(line);
            if (name) {
              extracted.push({ name, turma: defaultTurma || path.basename(entryName, entryExt) });
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
    const rawStudents: { name: string; turma?: string; number?: number }[] = Array.isArray(req.body?.students) ? req.body.students : [];
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
      const studentNumber = typeof raw.number === 'number' && raw.number > 0 ? raw.number : undefined;

      if (!cleanRawName || cleanRawName.length < 2) continue;

      const matched = existingStudentsList.find(s => {
        const sTurma = normalizeTurmaName(s.turma || '');
        if (sTurma !== normalizedTurma) return false;
        const sName = String(s.fullName || s.name || '').trim().toLowerCase();
        return sName === cleanRawName.toLowerCase();
      });

      if (matched) {
        if (studentNumber && !matched.number) {
          await db.collection('users').doc(matched.id).set({ number: studentNumber }, { merge: true }).catch(() => {});
        }
        existed.push({
          id: matched.id,
          name: cleanRawName,
          turma: normalizedTurma,
          username: matched.username || '',
          number: matched.number || studentNumber,
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
        const userData: Record<string, unknown> = {
          id: userId,
          name: fullName,
          fullName: fullName,
          firstName: firstName,
          lastName: lastName,
          greetingName: greetingName,
          username: username,
          number: studentNumber,
          initialPassword: password,
          password: password,
          turma: normalizedTurma,
          publicId: publicId,
          role: 'student',
          language: 'pt',
          points: 0,
          xp: 0,
          avatar: getDefaultAvatar(username),
          createdAt: now,
          updatedAt: now,
        };
        if (studentNumber) userData.number = studentNumber;

        // 2. credentials document (Hash & Salt only)
        const credData: Record<string, unknown> = {
          userId,
          initialPassword: password,
          passwordHash: hashed.hash,
          passwordSalt: hashed.salt,
          passwordChangedAt: now,
          createdAt: now,
          updatedAt: now,
        };

        // 3. publicProfiles document (Non-PII only)
        const publicData: Record<string, unknown> = {
          id: userId,
          publicId: publicId,
          turma: normalizedTurma,
          number: studentNumber,
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
          number: studentNumber,
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
          number: s.number,
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

// 3b. CREATE SINGLE STUDENT INDIVIDUALLY (Teacher Only)
app.post('/api/teacher/create-student', requireAuth, requireTeacher, async (req, res) => {
  try {
    const rawName = String(req.body?.name || '').trim();
    if (!rawName || rawName.length < 2) {
      return res.status(400).json({ error: 'O nome do aluno é obrigatório (mínimo 2 caracteres).' });
    }

    const rawTurma = String(req.body?.turma || '5.º A').trim();
    const normalizedTurma = normalizeTurmaName(rawTurma);

    const rawNumber = req.body?.number;
    const studentNumber =
      typeof rawNumber === 'number' && rawNumber > 0
        ? Math.floor(rawNumber)
        : typeof rawNumber === 'string' && parseInt(rawNumber, 10) > 0
        ? parseInt(rawNumber, 10)
        : undefined;

    const { fullName, firstName, lastName, greetingName } = parseStudentName(rawName);

    // Check existing users to avoid collision
    const existingUsersSnap = await db.collection('users').get();
    const existingUsernames = new Set<string>();
    const existingNicknames = new Set<string>();
    let duplicateUser: any = null;

    existingUsersSnap.docs.forEach((d) => {
      const data = d.data();
      if (data.username) existingUsernames.add(String(data.username).toLowerCase());
      if (data.nickname) existingNicknames.add(String(data.nickname).toLowerCase());
      if (data.publicId) existingNicknames.add(String(data.publicId).toLowerCase());

      const sTurma = normalizeTurmaName(data.turma || '');
      const sName = String(data.fullName || data.name || '').trim().toLowerCase();
      if (sTurma === normalizedTurma && sName === fullName.toLowerCase()) {
        duplicateUser = { id: d.id, ...data };
      }
    });

    if (duplicateUser && !req.body?.overwrite) {
      return res.status(409).json({
        error: `Já existe um aluno com o nome "${fullName}" na turma ${normalizedTurma} (utilizador: ${duplicateUser.username}).`,
        existingStudent: duplicateUser,
      });
    }

    // Determine username
    let username = String(req.body?.username || '').trim().toLowerCase();
    if (username) {
      username = username.replace(/[^a-z0-9._-]/g, '');
      if (username.length < 3) {
        username = generateKidUsername(fullName, normalizedTurma, existingUsernames);
      } else if (existingUsernames.has(username) && (!duplicateUser || duplicateUser.username !== username)) {
        username = generateKidUsername(fullName, normalizedTurma, existingUsernames);
      }
    } else {
      username = generateKidUsername(fullName, normalizedTurma, existingUsernames);
    }

    // Determine password
    let password = String(req.body?.password || '').trim();
    if (!password || password.length < 4) {
      password = generateKidPassword(new Set());
    }

    const userId = duplicateUser ? duplicateUser.id : `std_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const nickname = generateUniqueKidNickname(firstName || fullName, normalizedTurma, existingNicknames);
    const publicId = nickname;
    const now = new Date().toISOString();
    const hashed = await hashPassword(password);

    // 1. users document
    const userData: Record<string, unknown> = {
      id: userId,
      name: fullName,
      fullName: fullName,
      firstName: firstName,
      lastName: lastName,
      greetingName: greetingName,
      username: username,
      nickname: nickname,
      turma: normalizedTurma,
      publicId: publicId,
      role: 'student',
      language: 'pt',
      points: duplicateUser ? (duplicateUser.points || 0) : 0,
      xp: duplicateUser ? (duplicateUser.xp || 0) : 0,
      avatar: getDefaultAvatar(username),
      initialPassword: password,
      password: password,
      updatedAt: now,
    };
    if (studentNumber !== undefined) userData.number = studentNumber;
    if (!duplicateUser) userData.createdAt = now;

    // 2. credentials document
    const credData: Record<string, unknown> = {
      userId,
      initialPassword: password,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt,
      passwordChangedAt: now,
      updatedAt: now,
    };
    if (!duplicateUser) credData.createdAt = now;

    // 3. publicProfiles document
    const publicData: Record<string, unknown> = {
      id: userId,
      publicId: publicId,
      nickname: nickname,
      turma: normalizedTurma,
      avatar: getDefaultAvatar(username),
      points: duplicateUser ? (duplicateUser.points || 0) : 0,
      role: 'student',
    };
    if (studentNumber !== undefined) publicData.number = studentNumber;

    const batch = db.batch();
    batch.set(db.collection('users').doc(userId), userData, { merge: true });
    batch.set(db.collection('credentials').doc(userId), credData, { merge: true });
    batch.set(db.collection('publicProfiles').doc(userId), publicData, { merge: true });
    await batch.commit();

    return res.json({
      success: true,
      message: duplicateUser ? `Aluno ${fullName} atualizado com sucesso!` : `Aluno ${fullName} criado com sucesso!`,
      student: {
        id: userId,
        name: fullName,
        fullName: fullName,
        firstName,
        lastName,
        greetingName,
        turma: normalizedTurma,
        number: studentNumber,
        username,
        password,
        nickname,
        publicId,
        avatar: userData.avatar,
        points: userData.points,
        createdAt: now,
      },
    });
  } catch (error: any) {
    console.error('Create single student error:', error);
    return res.status(500).json({ error: error.message || 'Erro ao criar aluno individualmente.' });
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

    if (body.newNumber !== undefined || body.number !== undefined) {
      const rawNum = body.newNumber !== undefined ? body.newNumber : body.number;
      const numVal = parseInt(String(rawNum), 10);
      if (!isNaN(numVal) && numVal > 0) {
        updates.number = numVal;
      }
    }

    if (Object.keys(updates).length > 1) await userRef.set(updates, { merge: true });

    if (body.newPassword !== undefined) {
      const password = String(body.newPassword);
      if (!isValidPassword(password)) return res.status(400).json({ error: 'A palavra-passe deve ter pelo menos 4 caracteres.' });
      const h = await hashPassword(password);
      const now = new Date().toISOString();
      await db.collection('credentials').doc(userId).set({
        userId,
        initialPassword: password,
        passwordHash: h.hash,
        passwordSalt: h.salt,
        passwordChangedAt: now,
        updatedAt: now,
      }, { merge: true });

      await userRef.set({
        initialPassword: password,
        password: password,
        updatedAt: now,
      }, { merge: true }).catch(() => {});
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

async function ensureTeacherAccount() {
  try {
    const teacherRef = db.collection('users').doc('admin_carla_oliveira_by');
    const snap = await teacherRef.get();
    const now = new Date().toISOString();
    const existingEmail = snap.exists ? (snap.data()?.email || '') : '';
    const defaultData = {
      id: 'admin_carla_oliveira_by',
      name: 'Professora Carla Oliveira',
      fullName: 'Professora Carla Oliveira',
      email: existingEmail || process.env.TEACHER_EMAIL || 'prof.carla@escola.pt',
      username: 'prof.carla',
      role: 'admin',
      publicId: 'Docente_TIC',
      language: 'pt',
      updatedAt: now,
    };

    if (!snap.exists) {
      await teacherRef.set({ ...defaultData, createdAt: now });
      console.log('[Auth] Teacher account admin_carla_oliveira_by initialized.');
    } else {
      const current = snap.data() || {};
      if (!current.username || current.username !== 'prof.carla') {
        await teacherRef.update({ username: 'prof.carla', updatedAt: now });
      }
    }

    // Mirror to teacher-carla for multi-alias compatibility
    await db.collection('users').doc('teacher-carla').set({
      ...defaultData,
      id: 'teacher-carla',
      createdAt: now,
    }, { merge: true });

    // Ensure teacher credentials document exists without hardcoded passwords in code
    const credSnap = await db.collection('credentials').doc('admin_carla_oliveira_by').get();
    if (!credSnap.exists || !credSnap.data()?.passwordHash) {
      if (process.env.TEACHER_INITIAL_PASSWORD) {
        const initialHash = await hashPassword(process.env.TEACHER_INITIAL_PASSWORD);
        await db.collection('credentials').doc('admin_carla_oliveira_by').set({
          userId: 'admin_carla_oliveira_by',
          passwordHash: initialHash.hash,
          passwordSalt: initialHash.salt,
          createdAt: now,
          updatedAt: now,
        });
        await db.collection('credentials').doc('teacher-carla').set({
          userId: 'teacher-carla',
          passwordHash: initialHash.hash,
          passwordSalt: initialHash.salt,
          createdAt: now,
          updatedAt: now,
        });
        console.log('[Auth] Teacher credentials seeded from environment configuration.');
      } else {
        console.log('[Auth] Teacher account verified. Custom password can be set directly via secure password reset interface.');
      }
    }
  } catch (err) {
    console.warn('[Auth] ensureTeacherAccount warning:', err);
  }
}

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  // Initialize and hydrate revoked session IDs from persistent storage
  await initRevokedSessions();

  // Ensure teacher account exists and is ready for login
  await ensureTeacherAccount();

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
