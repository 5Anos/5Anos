import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

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

export async function sanitizeDatabase() {
  console.log('--- Início da Higienização da Base de Dados ---');

  // 1. Limpar campos de palavra-passe na coleção users
  const usersSnap = await db.collection('users').get();
  console.log(`Verificando ${usersSnap.docs.length} utilizadores em 'users'...`);

  let sanitizedUsersCount = 0;
  for (const doc of usersSnap.docs) {
    const data = doc.data();
    const updates: Record<string, any> = {};

    if (data.initialPassword !== undefined) updates.initialPassword = FieldValue.delete();
    if (data.password !== undefined) updates.password = FieldValue.delete();
    if (data.passwordHash !== undefined) updates.passwordHash = FieldValue.delete();

    if (Object.keys(updates).length > 0) {
      await doc.ref.update(updates);
      sanitizedUsersCount++;
    }
  }
  console.log(`Removidas palavras-passe em texto limpo / hashes residuais de ${sanitizedUsersCount} documentos 'users'.`);

  // 2. Limpar dados PII na coleção publicProfiles
  const publicSnap = await db.collection('publicProfiles').get();
  console.log(`Verificando ${publicSnap.docs.length} perfis em 'publicProfiles'...`);
  let sanitizedPublicCount = 0;

  for (const doc of publicSnap.docs) {
    const data = doc.data();
    const updates: Record<string, any> = {};

    if (data.name !== undefined) updates.name = FieldValue.delete();
    if (data.fullName !== undefined) updates.fullName = FieldValue.delete();
    if (data.firstName !== undefined) updates.firstName = FieldValue.delete();
    if (data.lastName !== undefined) updates.lastName = FieldValue.delete();
    if (data.email !== undefined) updates.email = FieldValue.delete();
    if (data.username !== undefined) updates.username = FieldValue.delete();

    if (Object.keys(updates).length > 0) {
      await doc.ref.update(updates);
      sanitizedPublicCount++;
    }
  }
  console.log(`Removidos dados pessoais PII de ${sanitizedPublicCount} documentos 'publicProfiles'.`);

  // 3. Remover transações antigas de 'Bónus de Boas-vindas' (+100 XP) e recalcular XP a começar em 0
  console.log('Removendo bónus de boas-vindas e recalculando pontuações a começar em 0 XP...');
  let recalculatedCount = 0;

  for (const userDoc of usersSnap.docs) {
    const uData = userDoc.data();
    if (uData.role === 'teacher' || uData.role === 'admin') continue;

    const txSnap = await userDoc.ref.collection('pointsHistory').get();
    for (const txDoc of txSnap.docs) {
      const tx = txDoc.data();
      if (
        txDoc.id.startsWith('pt-welcome-') ||
        (typeof tx.reason === 'string' && tx.reason.includes('Bónus de Boas-vindas'))
      ) {
        await txDoc.ref.delete();
      }
    }

    // Recalcular pontuação total real a partir de progresso legítimo + dicas do dia + medalhas
    const [progSnap, dailySnap, achSnap] = await Promise.all([
      userDoc.ref.collection('progress').get(),
      userDoc.ref.collection('dailyTips').get(),
      userDoc.ref.collection('achievements').get(),
    ]);

    let totalPoints = 0;

    dailySnap.docs.forEach((d) => {
      totalPoints += Math.max(0, Math.min(1000, Math.round(Number(d.data()?.pointsEarned || 0))));
    });

    progSnap.docs.forEach((d) => {
      const p = d.data();
      const pId = String(p.activityId || d.id);
      const isQuiz = p.activityType === 'quiz' || pId.startsWith('quiz-');
      if (!isQuiz) {
        const best = Math.max(0, Math.min(100, Math.round(Number(p.bestScore ?? p.bestPercentage ?? p.score ?? 0))));
        totalPoints += best;
      }
    });

    // Atualizar utilizador
    await userDoc.ref.set(
      {
        points: totalPoints,
        xp: totalPoints,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // Atualizar perfil público mínimo
    await db.collection('publicProfiles').doc(userDoc.id).set(
      {
        id: userDoc.id,
        publicId: uData.publicId || (uData.username ? String(uData.username).toUpperCase() : 'ALUNO_TIC'),
        turma: uData.turma || '',
        avatar: uData.avatar,
        points: totalPoints,
        role: 'student',
      },
      { merge: true }
    );

    recalculatedCount++;
  }

  console.log(`Recalibrados ${recalculatedCount} alunos. Bónus inicial de 100 XP removido de raiz.`);
  console.log('--- Higienização Concluída com Sucesso! ---');
}

if (import.meta.url.endsWith(process.argv[1])) {
  sanitizeDatabase().catch((err) => {
    console.error('Erro na higienização:', err);
    process.exit(1);
  });
}
