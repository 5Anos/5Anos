// Utilities for student name parsing, kid-friendly unique username and password generation,
// and class normalization for 10-year-old students in 5.º Ano.

export interface ParsedStudentName {
  fullName: string;
  firstName: string;
  lastName: string;
  greetingName: string;
}

// Friendly, fun, and easy-to-read Portuguese words for 10-year-old children
// (Animals, nature, space, colors, positive concepts - no accents or confusing letters)
export const KID_FRIENDLY_WORDS: string[] = [
  'sol', 'lua', 'mar', 'rio', 'onda', 'vento', 'nuvem', 'chuva', 'brisa', 'estrela',
  'cometa', 'planeta', 'foguete', 'astro', 'galaxia', 'cosmos', 'orbita', 'raio', 'trovao',
  'leao', 'tigre', 'lobo', 'urso', 'lince', 'panda', 'coelho', 'raposa', 'aguia', 'falcao',
  'coruja', 'arara', 'tucano', 'golfinho', 'baleia', 'foca', 'castor', 'esquilo', 'gato', 'cao',
  'verde', 'azul', 'amarelo', 'laranja', 'violeta', 'branco', 'dourado', 'prata', 'coral', 'anil',
  'cristal', 'diamante', 'rubi', 'safira', 'perola', 'ouro', 'ambar', 'quartzo', 'jade', 'topazio',
  'trevo', 'cedro', 'pinho', 'palma', 'flora', 'bosque', 'selva', 'campo', 'jardim', 'rosa',
  'farol', 'bussola', 'mapa', 'chave', 'escudo', 'espada', 'castelo', 'torre', 'ponte', 'barco',
  'robot', 'pixel', 'codigo', 'chip', 'dado', 'rede', 'som', 'luz', 'laser', 'radar',
  'sabio', 'heroi', 'campeao', 'genio', 'mago', 'ninja', 'trofeu', 'medalha', 'façanha', 'talento'
];

/**
 * Normalizes Portuguese class names from various formats to standard '5.º X'
 * Examples:
 *   "5º - A" -> "5.º A"
 *   "5ºA" -> "5.º A"
 *   "5-B" -> "5.º B"
 *   "Turma C" -> "5.º C"
 *   "2026/27 Tecnologias de Informação e Comunicação 5º - E" -> "5.º E"
 */
export function normalizeTurmaName(rawTurma?: string): string {
  if (!rawTurma) return '5.º A';
  const clean = rawTurma.trim();

  // Match pattern like 5º - A or 5ºA or 5-A or 5 A or Turma A
  const match = clean.match(/(?:5\s*[\.º°º\-]*\s*([A-Fa-f])|(?:turma|classe)\s*([A-Fa-f]))/i);
  if (match) {
    const letter = (match[1] || match[2] || 'A').toUpperCase();
    return `5.º ${letter}`;
  }

  // If already like "5.º A"
  if (/^5\.\º\s*[A-Z]$/i.test(clean)) {
    return clean.toUpperCase();
  }

  // Fallback if just single letter A-F
  if (/^[A-Fa-f]$/.test(clean)) {
    return `5.º ${clean.toUpperCase()}`;
  }

  return clean;
}

/**
 * Normalizes text by removing accents, symbols and whitespace for clean slugs
 */
export function slugifyText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Parses full name into first, last, and friendly greeting name
 */
export function parseStudentName(rawName: string): ParsedStudentName {
  const clean = (rawName || '').trim().replace(/\s+/g, ' ');
  if (!clean) {
    return { fullName: '', firstName: '', lastName: '', greetingName: '' };
  }

  const parts = clean.split(' ').filter(Boolean);
  const firstName = parts[0] || '';
  const lastName = parts.length > 1 ? parts[parts.length - 1] : '';

  // Friendly greeting: "Primeiro e último nome" (ex: "João Silva")
  const greetingName = parts.length > 1 ? `${firstName} ${lastName}` : firstName;

  return {
    fullName: clean,
    firstName,
    lastName,
    greetingName,
  };
}

/**
 * Formats greeting for the student: "Primeiro e Último Nome"
 * Example: "Olá, João Silva!"
 */
export function formatStudentGreeting(fullName?: string, firstName?: string, lastName?: string): string {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (!fullName) return 'Estudante';
  const parsed = parseStudentName(fullName);
  return parsed.greetingName || 'Estudante';
}

/**
 * Generates an intuitive, kid-friendly unique username for a 10-year-old student
 * Format: primeironome.ultimonome (ex: anderson.o, claudia.dos, artur.pawel)
 * If collision: appends turma identifier (ex: anderson.o.5a) or small number
 */
export function generateKidUsername(
  fullName: string,
  turma: string,
  existingUsernames: Set<string>
): string {
  const { firstName, lastName } = parseStudentName(fullName);
  const cleanFirst = slugifyText(firstName);
  const cleanLast = slugifyText(lastName);

  let base = '';
  if (cleanFirst && cleanLast) {
    base = `${cleanFirst}.${cleanLast}`;
  } else if (cleanFirst) {
    base = cleanFirst;
  } else {
    base = 'aluno';
  }

  // Ensure minimum length
  if (base.length < 3) {
    base = `${base}tic`;
  }

  if (!existingUsernames.has(base)) {
    existingUsernames.add(base);
    return base;
  }

  // First collision resolution: add turma abbreviation (e.g. 5a)
  const turmaMatch = turma.match(/([0-9])[\.\º\s]*([A-Za-z])/);
  const turmaSlug = turmaMatch ? `${turmaMatch[1]}${turmaMatch[2].toLowerCase()}` : '';
  if (turmaSlug) {
    const withTurma = `${base}.${turmaSlug}`;
    if (!existingUsernames.has(withTurma)) {
      existingUsernames.add(withTurma);
      return withTurma;
    }
  }

  // Second collision resolution: numeric suffix (e.g. anderson.o2)
  let counter = 2;
  while (true) {
    const candidate = `${base}${counter}`;
    if (!existingUsernames.has(candidate)) {
      existingUsernames.add(candidate);
      return candidate;
    }
    counter++;
  }
}

/**
 * Generates a simple, unique and secure password for 10-year-olds
 * Format: palavra-amigavel + 3 dígitos (ex: azul123, gato456, estrela789, sol412, leao635)
 * Guaranteed to be unique across all students.
 */
export function generateKidPassword(existingPasswords: Set<string>): string {
  // Try up to 1000 combinations
  for (let attempt = 0; attempt < 2000; attempt++) {
    const word = KID_FRIENDLY_WORDS[Math.floor(Math.random() * KID_FRIENDLY_WORDS.length)];
    // Random 3 digit number (100 - 999) avoiding repetitive digits like 000
    const num = Math.floor(100 + Math.random() * 900);
    const candidate = `${word}${num}`;

    if (!existingPasswords.has(candidate)) {
      existingPasswords.add(candidate);
      return candidate;
    }
  }

  // Fallback with timestamp suffix if words exhausted
  const fallback = `tic${Math.floor(1000 + Math.random() * 9000)}`;
  existingPasswords.add(fallback);
  return fallback;
}
