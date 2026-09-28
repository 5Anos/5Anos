/**
 * Nickname Validation, Profanity/Hate-Speech Filter & Unique Generator
 * Ensures all student nicknames are respectful, safe for school, and globally unique.
 */

// Comprehensive dictionary of banned terms: vulgarities, obscenities, slurs, racist terms, insults
const BANNED_ROOTS = [
  // Portuguese profanity & obscenities
  'puta', 'puto', 'caralho', 'foda', 'foder', 'fode', 'fodasse', 'fodase', 'merda', 'cabrao',
  'cabrão', 'paneleiro', 'maricas', 'bicha', 'cona', 'pila', 'pissa', 'piroca', 'caralhe',
  'fudilhao', 'fodeu', 'fudido', 'fudida', 'fodedor', 'putaria', 'porra', 'esporra', 'caralha',
  'chupa', 'mamar', 'boiola', 'bostinha', 'bosta', 'cagalhao', 'cagar', 'caguei', 'facho',
  // Racist, xenophobic & hate speech terms
  'preto', 'preta', 'negro', 'negra', 'macaco', 'macaca', 'crioulo', 'crioula', 'monhes',
  'monhe', 'monhé', 'cigano', 'cigana', 'chunga', 'retornado', 'nazi', 'nazista', 'hitler',
  'fascista', 'ku-klux', 'kkk', 'ariano', 'supremacista', 'judeu', 'espanholada', 'escravo',
  // Offensive slurs & harassment
  'otario', 'otário', 'estupido', 'estúpido', 'idiota', 'parvo', 'parva', 'burro', 'burra',
  'retardado', 'retardada', 'debil', 'débil', 'deficiente', 'aleijado', 'autista', 'suicida',
  'morre', 'mata-te', 'matate', 'assassino', 'terrorista', 'bomba', 'pedofilo', 'pedófilo',
  'estupro', 'violador', 'violacao', 'violação', 'tarado', 'prostituta', 'vadia', 'vagabunda',
  // English common profanity & slurs
  'fuck', 'fucker', 'fucking', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'cock',
  'pussy', 'nigger', 'nigga', 'faggot', 'whore', 'slut', 'penis', 'vagina', 'porn', 'sex',
  'sexy', 'boobs', 'tits', 'anal', 'dildo', 'killer', 'murder', 'die', 'kill',
];

/**
 * Normalizes string removing accents, numbers mimicking letters (leetspeak), and special chars
 */
export function normalizeForProfanityCheck(str: string): string {
  if (!str) return '';
  let clean = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove accents

  // Replace common leetspeak substitutions
  clean = clean
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/@/g, 'a')
    .replace(/5/g, 's')
    .replace(/\$/g, 's')
    .replace(/7/g, 't')
    .replace(/8/g, 'b')
    .replace(/9/g, 'g')
    .replace(/[._\-+*#]/g, '');

  // Collapse 3+ consecutive duplicate letters (e.g., "puuuuta" -> "puta")
  clean = clean.replace(/(.)\1{2,}/g, '$1$1');

  return clean;
}

/**
 * Checks if a nickname contains any banned roots or inappropriate language
 */
export function isProfaneOrInappropriate(rawNickname: string): boolean {
  if (!rawNickname || typeof rawNickname !== 'string') return false;

  const normalized = normalizeForProfanityCheck(rawNickname);
  const plainLower = rawNickname.toLowerCase();

  for (const root of BANNED_ROOTS) {
    const normRoot = normalizeForProfanityCheck(root);
    if (normalized.includes(normRoot) || plainLower.includes(root)) {
      return true;
    }
  }

  return false;
}

export interface NicknameValidationResult {
  isValid: boolean;
  sanitized: string;
  error?: string;
  errorPt?: string;
  errorEn?: string;
}

/**
 * Comprehensive Nickname Validator (Length, Character whitelist, Profanity check)
 */
export function validateNickname(nickname: string): NicknameValidationResult {
  const sanitized = (nickname || '').trim();

  // 1. Check Length
  if (!sanitized || sanitized.length < 3) {
    return {
      isValid: false,
      sanitized,
      error: 'TOO_SHORT',
      errorPt: 'O teu nickname deve ter pelo menos 3 caracteres.',
      errorEn: 'Your nickname must have at least 3 characters.',
    };
  }

  if (sanitized.length > 18) {
    return {
      isValid: false,
      sanitized,
      error: 'TOO_LONG',
      errorPt: 'O teu nickname pode ter no máximo 18 caracteres.',
      errorEn: 'Your nickname cannot exceed 18 characters.',
    };
  }

  // 2. Check Allowed Characters (Letters, numbers, underscores and hyphens)
  const validCharsRegex = /^[a-zA-Z0-9_-]+$/;
  if (!validCharsRegex.test(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'INVALID_CHARACTERS',
      errorPt: 'Usa apenas letras, números, hífen (-) ou sublinhado (_). Sem espaços nem símbolos.',
      errorEn: 'Use only letters, numbers, hyphens (-) or underscores (_). No spaces or special symbols.',
    };
  }

  // 3. Check Profanity / Hate Speech / Obscenities
  if (isProfaneOrInappropriate(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'INAPPROPRIATE_LANGUAGE',
      errorPt: '⚠️ Este nickname contém termos inapropriados ou não permitidos na escola. Escolhe outro!',
      errorEn: '⚠️ This nickname contains inappropriate words not allowed at school. Choose another!',
    };
  }

  return {
    isValid: true,
    sanitized,
  };
}

const NICK_PREFIXES = [
  'Cyber',
  'Astro',
  'Tecno',
  'Gamer',
  'Byte',
  'Pixel',
  'Code',
  'Super',
  'Mega',
  'Ninja',
  'Hero',
  'Star',
  'Rocket',
  'Robot',
];

/**
 * Generates an initial unique, kid-friendly nickname for a student based on their name & class
 */
export function generateUniqueKidNickname(
  baseName: string,
  turma: string,
  existingNicknames: Set<string> | string[]
): string {
  const existingSet = new Set(
    Array.isArray(existingNicknames)
      ? existingNicknames.map((n) => (n || '').toLowerCase().trim())
      : Array.from(existingNicknames).map((n) => (n || '').toLowerCase().trim())
  );

  // Clean name and take first name
  const cleanName = (baseName || 'Aluno')
    .trim()
    .split(/\s+/)[0]
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');

  const capitalizedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
  const cleanTurma = (turma || '5A').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // Try different attractive candidates
  const candidates: string[] = [
    `Cyber${capitalizedName}`,
    `Astro${capitalizedName}`,
    `Tecno${capitalizedName}`,
    `${capitalizedName}${cleanTurma}`,
    `Gamer${capitalizedName}`,
    `Pixel${capitalizedName}`,
    `Ninja${capitalizedName}`,
    `Byte${capitalizedName}`,
    `Super${capitalizedName}`,
    `${capitalizedName}TIC`,
  ];

  for (const candidate of candidates) {
    if (!existingSet.has(candidate.toLowerCase()) && !isProfaneOrInappropriate(candidate)) {
      return candidate;
    }
  }

  // If all are taken, append random numbers
  const prefix = NICK_PREFIXES[Math.floor(Math.random() * NICK_PREFIXES.length)];
  for (let i = 1; i <= 999; i++) {
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const candidate = `${prefix}${capitalizedName}${randomSuffix}`;
    if (!existingSet.has(candidate.toLowerCase()) && !isProfaneOrInappropriate(candidate)) {
      return candidate;
    }
  }

  return `Heroi${Date.now().toString().slice(-4)}`;
}
