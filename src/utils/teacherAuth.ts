// Centralized teacher and administrator identities and authorization rules
// Ensures 100% consistency across client views, administration panels, and security checks.

export const TEACHER_ADMIN_EMAILS = [
  'imaginebycarla2023@gmail.com',
  'imaginebacarla2023@gmail.com',
  'prof.carla@escola.pt',
  'carla.oliveira@escola.pt',
] as const;

export const TEACHER_USERNAMES = [
  'prof.carla',
  'carla.oliveira',
  'professora.carla',
] as const;

export const TEACHER_PUBLIC_IDS = [
  'PROF_CARLA',
  'PROFESSORA_CARLA',
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
  return TEACHER_ADMIN_EMAILS.some((e) => e === normalized);
}

/**
 * Checks if an identifier (email, username, or publicId) belongs to the teacher / administrator
 */
export function isTeacherIdentifier(identifier?: string | null): boolean {
  if (!identifier) return false;
  const clean = String(identifier).trim().toLowerCase();
  if (isTeacherEmail(clean)) return true;
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
  if (isTeacherEmail(email)) return true;
  if (username && isTeacherIdentifier(username)) return true;
  if (publicId && isTeacherIdentifier(publicId)) return true;
  return false;
}
