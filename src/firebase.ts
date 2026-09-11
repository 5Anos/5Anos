import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Cloud Firestore (supporting custom databaseId if configured)
const databaseId = firebaseConfigJson.firestoreDatabaseId && firebaseConfigJson.firestoreDatabaseId !== '(default)'
  ? firebaseConfigJson.firestoreDatabaseId
  : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

// Connection test and diagnostic reporting
export interface FirebaseConnectionStatus {
  ok: boolean;
  message: string;
  isOffline?: boolean;
}

export async function checkFirebaseConnectionDetails(): Promise<FirebaseConnectionStatus> {
  try {
    const testPromise = getDocFromServer(doc(db, 'config', 'connection_test'));
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Connection timeout')), 5000)
    );
    await Promise.race([testPromise, timeoutPromise]);
    return { ok: true, message: 'Ligação ao Firestore verificada com sucesso.' };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    const isOffline =
      errMessage.includes('the client is offline') ||
      errMessage.includes('failed-precondition') ||
      errMessage.includes('unavailable');
    const isTimeout = errMessage.includes('Connection timeout');

    if (isOffline) {
      console.warn('Firebase client is offline or initializing:', errMessage);
      return {
        ok: false,
        isOffline: true,
        message: 'O cliente Firebase está offline ou a inicializar.',
      };
    }

    if (isTimeout) {
      console.warn('Firebase connection check timed out.');
      return {
        ok: false,
        message: 'Tempo limite excedido ao ligar ao Firestore.',
      };
    }

    console.warn('Firebase connection check failed:', errMessage);
    return {
      ok: false,
      message: `Falha na ligação ao Firestore: ${errMessage}`,
    };
  }
}

export async function testFirebaseConnection(): Promise<boolean> {
  const result = await checkFirebaseConnectionDetails();
  if (result.ok) {
    console.log('Firebase Firestore connection verified.');
  } else {
    console.warn('Firebase Firestore connection test result:', result.message);
  }
  return result.ok;
}

// Auto-run connection test
testFirebaseConnection().catch(() => {});

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
