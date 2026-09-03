// Default school classes for 5.º Ano TIC
// Easily expandable / editable by teachers and administrators

export const DEFAULT_TURMAS: string[] = [
  '5.º A',
  '5.º B',
  '5.º C',
  '5.º D',
  '5.º E',
  '5.º F',
];

const TURMAS_STORAGE_KEY = 'tic_5ano_turmas_list';

export function getTurmasList(): string[] {
  try {
    const raw = localStorage.getItem(TURMAS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_TURMAS;
}

export function saveTurmasList(turmas: string[]): void {
  try {
    localStorage.setItem(TURMAS_STORAGE_KEY, JSON.stringify(turmas));
  } catch {
    // ignore
  }
}
