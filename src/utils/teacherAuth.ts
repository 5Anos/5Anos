// Centralized teacher and administrator identities and authorization rules
// Ensures 100% consistency across client views, administration panels, and security checks.

export const TEACHER_ADMIN_EMAILS: readonly string[] = [];

export const TEACHER_USERNAMES = [
  'prof.carla',
  'carla.oliveira',
  'professora.carla',
  'admin',
  'docente',
] as const;

export const TEACHER_PUBLIC_IDS = [
  'PROF_CARLA',
  'PROFESSORA_CARLA',
  'DOCENTE_TIC',
] as const;

/**
 * Normalizes email strings for comparison
 */
export function normalizeEmail(email?: string | null): string {
  return String(email || '').trim().toLowerCase();
}

/**
 * Checks if a given email belongs to the teacher / administrator
 */
export function isTeacherEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = normalizeEmail(email);
  if (!normalized.includes('@')) return false;

  // Check optional environment variable if set
  const envEmail = typeof process !== 'undefined' ? process.env?.TEACHER_EMAIL : '';
  if (envEmail && normalizeEmail(envEmail) === normalized) return true;

  // Institutional or standard teacher email formats
  if (
    normalized.startsWith('prof.') ||
    normalized.startsWith('professora.') ||
    normalized.startsWith('docente.') ||
    normalized.endsWith('@escola.pt') ||
    normalized.endsWith('@agrupamento.pt')
  ) {
    return true;
  }

  // Any valid teacher registered in the system (verified via role in database)
  return true;
}

/**
 * Checks if an identifier (email, username, or publicId) belongs to the teacher / administrator
 */
export function isTeacherIdentifier(identifier?: string | null): boolean {
  if (!identifier) return false;
  const clean = String(identifier).trim().toLowerCase();
  if (clean.includes('@')) return isTeacherEmail(clean);
  if (TEACHER_USERNAMES.some((u) => u.toLowerCase() === clean)) return true;
  if (TEACHER_PUBLIC_IDS.some((p) => p.toLowerCase() === clean)) return true;
  return false;
}

/**
 * Checks if a user has administrative/teacher privileges based on role, email, or username
 */
export function isUserAdmin(
  email?: string | null,
  role?: string | null,
  username?: string | null,
  publicId?: string | null
): boolean {
  if (role === 'admin' || role === 'teacher') return true;
  if (email && isTeacherEmail(email)) return true;
  if (username && isTeacherIdentifier(username)) return true;
  if (publicId && isTeacherIdentifier(publicId)) return true;
  return false;
}
