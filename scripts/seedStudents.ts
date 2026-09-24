import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { promisify } from 'util';
import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { INITIAL_STUDENTS_LIST } from '../src/data/initialStudentsData';
import {
  generateKidUsername,
  generateKidPassword,
  parseStudentName,
  normalizeTurmaName,
} from '../src/utils/studentCredentials';
import { getDefaultAvatar } from '../src/utils/avatarUtils';

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password: string, salt?: string) {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, actualSalt, 64)) as Buffer;
  return {
    salt: actualSalt,
    hash: derivedKey.toString('hex'),
  };
}

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
    const app = initializeApp({ projectId });
    return customDbId ? getFirestore(app, customDbId) : getFirestore(app);
  }
}

const db = initializeFirebaseAdmin();

export async function runStudentSeeding() {
  console.log(`Starting student seeding for ${INITIAL_STUDENTS_LIST.length} students...`);

  // 1. Fetch existing users to avoid duplicates and collect existing usernames/passwords
  const existingUsersSnap = await db.collection('users').limit(1000).get();
  const existingUsernames = new Set<string>();
  const existingPasswords = new Set<string>();
  const existingStudentsMap = new Map<string, any>(); // key: `${turma}__${name.toLowerCase()}`

  for (const doc of existingUsersSnap.docs) {
    const data = doc.data();
    if (data.username) existingUsernames.add(String(data.username).toLowerCase());
    if (data.initialPassword) existingPasswords.add(String(data.initialPassword));
    if (data.password) existingPasswords.add(String(data.password));
    if (data.turma && data.name) {
      const key = `${normalizeTurmaName(data.turma)}__${String(data.name).trim().toLowerCase()}`;
      existingStudentsMap.set(key, { id: doc.id, ...data });
    }
  }

  console.log(`Found ${existingUsersSnap.docs.length} existing users in Firestore.`);

  let createdCount = 0;
  let skippedCount = 0;

  // Process in chunks of 20 for Firestore batch limits (batch max 500 ops)
  const chunkSize = 20;
  for (let i = 0; i < INITIAL_STUDENTS_LIST.length; i += chunkSize) {
    const chunk = INITIAL_STUDENTS_LIST.slice(i, i + chunkSize);
    const batch = db.batch();
    let batchHasOperations = false;

    for (const student of chunk) {
      const normalizedTurma = normalizeTurmaName(student.turma);
      const studentKey = `${normalizedTurma}__${student.name.trim().toLowerCase()}`;

      if (existingStudentsMap.has(studentKey)) {
        skippedCount++;
        continue;
      }

      const { fullName, firstName, lastName, greetingName } = parseStudentName(student.name);
      const username = generateKidUsername(fullName, normalizedTurma, existingUsernames);
      const password = generateKidPassword(existingPasswords);
      const userId = crypto.randomUUID();
      const now = new Date().toISOString();

      const hashed = await hashPassword(password);

      const userRef = db.collection('users').doc(userId);
      const credRef = db.collection('credentials').doc(userId);
      const publicRef = db.collection('publicProfiles').doc(userId);
      const pointsTxRef = userRef.collection('pointsHistory').doc(`pt-welcome-${Date.now()}-${Math.floor(Math.random()*1000)}`);

      // Safe public ID for leaderboard (avoids showing real surname to peers)
      const publicId = username.toUpperCase();

      const userData = {
        id: userId,
        name: fullName,
        fullName: fullName,
        firstName: firstName,
        lastName: lastName,
        greetingName: greetingName,
        username: username,
        initialPassword: password, // For teacher credential sheet printout
        turma: normalizedTurma,
        email: `${username}@aluno.tic`,
        publicId: publicId,
        role: 'student',
        language: 'pt',
        points: 100,
        xp: 100,
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
        points: 100,
        role: 'student',
      };

      const welcomeTx = {
        id: pointsTxRef.id,
        userId: userId,
        amount: 100,
        reason: 'Bónus de Boas-vindas (+100 XP)',
        timestamp: now,
      };

      batch.set(userRef, userData);
      batch.set(credRef, credData);
      batch.set(publicRef, publicData);
      batch.set(pointsTxRef, welcomeTx);

      batchHasOperations = true;
      createdCount++;
      existingStudentsMap.set(studentKey, userData);
    }

    if (batchHasOperations) {
      await batch.commit();
      console.log(`Committed chunk ${i / chunkSize + 1} (${createdCount} created so far)...`);
    }
  }

  console.log(`Seeding completed! Created: ${createdCount}, Already existed: ${skippedCount}, Total: ${INITIAL_STUDENTS_LIST.length}`);
  return { createdCount, skippedCount, total: INITIAL_STUDENTS_LIST.length };
}

// If run directly via CLI
if (process.argv[1]?.endsWith('seedStudents.ts')) {
  runStudentSeeding()
    .then((res) => {
      console.log('Finished successfully:', res);
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
