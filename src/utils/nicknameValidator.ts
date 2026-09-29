/**
 * Nickname Validation, Profanity/Hate-Speech Filter & Anonymous Unique Generator
 * Ensures all student nicknames are respectful, safe for school, 100% anonymous, and globally unique.
 * Strictly prevents real names and obscene, offensive, or racist language.
 */

// Comprehensive dictionary of banned roots: vulgarities, obscenities, slurs, racist terms, hate speech, insults
const BANNED_ROOTS = [
  // Portuguese profanities & obscenities
  'puta', 'puto', 'putedo', 'putaria', 'caralho', 'caralhe', 'caralha', 'foda', 'foder', 'fode',
  'fodeu', 'fudido', 'fudida', 'fudilhao', 'fodedor', 'fodasse', 'fodase', 'merda', 'merdoso',
  'cabrao', 'cabrão', 'cabra', 'paneleiro', 'paneleirice', 'maricas', 'bicha', 'bichona', 'cona',
  'conas', 'pila', 'pissa', 'picha', 'piroca', 'paspalho', 'chupa', 'chupista', 'mamar', 'mamona',
  'boiola', 'bostinha', 'bosta', 'cagalhao', 'cagar', 'caguei', 'facho', 'fascio', 'porra', 'esporra',
  'patego', 'cretino', 'cretina', 'panilas', 'panasga', 'rabeta', 'rabo', 'peido', 'punheta', 'esporro',

  // Racist, xenophobic & hate speech terms (strictly blocked)
  'preto', 'preta', 'pretaiada', 'negro', 'negra', 'negrada', 'macaco', 'macaca', 'macaquinho',
  'crioulo', 'crioula', 'monhes', 'monhe', 'monhé', 'cigano', 'cigana', 'ciganada', 'chunga',
  'retornado', 'nazi', 'nazista', 'nazismo', 'hitler', 'fascista', 'fascismo', 'ku-klux', 'kkk',
  'ariano', 'supremacista', 'espanholada', 'escravo', 'escrava', 'escravatura', 'antissemita',
  'judeu', 'muculmano', 'islamico', 'terrorista', 'jihad', 'homofobico', 'transfobico',

  // Offensive slurs, harassment, bullying & violence
  'otario', 'otário', 'otaria', 'otária', 'estupido', 'estúpido', 'estupida', 'estúpida',
  'idiota', 'parvo', 'parva', 'parvalhao', 'burro', 'burra', 'burrice', 'retardado', 'retardada',
  'debil', 'débil', 'deficiente', 'aleijado', 'aleijada', 'autista', 'suicida', 'suicidio',
  'morre', 'mata-te', 'matate', 'assassino', 'bomba', 'pedofilo', 'pedófilo', 'estupro',
  'violador', 'violacao', 'violação', 'tarado', 'tarada', 'prostituta', 'vadia', 'vagabunda',
  'gordo', 'gorda', 'baleia', 'feio', 'feia', 'nojento', 'nojenta', 'lixo', 'aborto',

  // English profanities, slurs & inappropriate words
  'fuck', 'fucker', 'fucking', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'cock',
  'pussy', 'nigger', 'nigga', 'faggot', 'whore', 'slut', 'penis', 'vagina', 'porn', 'porno',
  'sex', 'sexy', 'boobs', 'tits', 'anal', 'dildo', 'killer', 'murder', 'die', 'kill', 'hate',
  'pedophile', 'rape', 'rapist', 'racist', 'nazi', 'crap', 'bastard', 'loser'
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
    .replace(/[._\-+*#\s]/g, '');

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
  const plainLower = rawNickname.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const root of BANNED_ROOTS) {
    const normRoot = normalizeForProfanityCheck(root);
    if (normalized.includes(normRoot) || plainLower.includes(normRoot)) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if a nickname appears to contain a student's real name (first, last or full name)
 */
export function containsRealName(nickname: string, studentRealName?: string): boolean {
  if (!nickname || !studentRealName) return false;

  const cleanNick = normalizeForProfanityCheck(nickname);

  // Split student's real name into individual words
  const nameParts = studentRealName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[\s._-]+/)
    .filter((part) => part.length >= 3); // check significant name parts (e.g. "antonio", "lopes", "alvaro", "beja", "dinis")

  for (const part of nameParts) {
    // Ignore very generic Portuguese words that could collide with cool words
    if (['dos', 'das', 'com', 'sem', 'mar', 'rio', 'sol'].includes(part)) continue;
    if (cleanNick.includes(part)) {
      return true;
    }
  }

  return false;
}

/**
 * Detects if a legacy string is formatted like "FIRSTNAME . LASTNAME" or contains full real names
 */
export function isLegacyRealNameNickname(nickname?: string): boolean {
  if (!nickname || typeof nickname !== 'string') return true;
  const clean = nickname.trim();
  if (!clean) return true;

  // Pattern like "ANTONIO . LOPES" or "ALVARO . BEJA" or "ALUNA . EXPERIEINCIA"
  if (/\s*\.\s*/.test(clean) || /\s+/.test(clean)) {
    return true;
  }

  // All uppercase with dots or underlines matching names
  if (/^[A-Z\s\._]{4,}$/.test(clean) && clean.includes('.')) {
    return true;
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
 * Comprehensive Nickname Validator (Length, Character whitelist, Profanity check & Real-name protection)
 */
export function validateNickname(nickname: string, studentRealName?: string): NicknameValidationResult {
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

  // 3. Check Profanity / Hate Speech / Obscenities / Racism
  if (isProfaneOrInappropriate(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'INAPPROPRIATE_LANGUAGE',
      errorPt: '⚠️ Este nickname contém termos inapropriados ou não permitidos na escola. Escolhe uma alcunha respeitosa!',
      errorEn: '⚠️ This nickname contains inappropriate words not allowed at school. Choose a respectful nickname!',
    };
  }

  // 4. Check if student is trying to put their real name
  if (studentRealName && containsRealName(sanitized, studentRealName)) {
    return {
      isValid: false,
      sanitized,
      error: 'REAL_NAME_DETECTED',
      errorPt: '🔒 Para tua segurança e privacidade escolar, o teu nickname não deve conter o teu nome real. Escolhe uma alcunha criativa e anónima!',
      errorEn: '🔒 For your privacy and school safety, your nickname should not contain your real name. Choose an anonymous creative nickname!',
    };
  }

  return {
    isValid: true,
    sanitized,
  };
}

// Child-friendly, cool tech and nature mascots for 100% anonymous nickname generation
const COOL_PREFIXES = [
  'Ciber',
  'Astro',
  'Tecno',
  'Pixel',
  'Ninja',
  'Gamer',
  'Byte',
  'Super',
  'Mega',
  'Robo',
  'Fenix',
  'Lince',
  'Panda',
  'Raposa',
  'Falcao',
  'Coruja',
  'Cometa',
  'Laser',
  'Quantum',
  'Cristal',
  'Cosmo',
  'Titan',
  'Turbo',
  'Sonic',
  'Delta',
  'Nexus',
  'Vortex',
  'Vetor',
  'Heroi',
  'Estelar',
  'Alfa',
  'Zeta',
  'Code',
  'Spark',
  'Flash',
  'Matrix',
];

const COOL_SUFFIXES = [
  'Ninja',
  'Panda',
  'Raposa',
  'Hero',
  'Star',
  'Gamer',
  'Bot',
  'Master',
  'Explorer',
  'Pilot',
  'Falcon',
  'Wolf',
  'Tiger',
  'Dragon',
  'Wizard',
  'Champion',
  'Runner',
  'Maker',
  'Spark',
  'Tech',
  'Pro',
  'Flash',
  'Cosmo',
  'Cyber',
  'Sonic',
];

/**
 * Generates an initial unique, 100% ANONYMOUS kid-friendly nickname for a student.
 * STRICT: NEVER USES OR EXPOSES THE STUDENT'S REAL NAME OR SURNAME.
 */
export function generateUniqueKidNickname(
  _ignoredBaseName?: string,
  _ignoredTurma?: string,
  existingNicknames: Set<string> | string[] = []
): string {
  const existingSet = new Set(
    Array.isArray(existingNicknames)
      ? existingNicknames.map((n) => (n || '').toLowerCase().trim())
      : Array.from(existingNicknames).map((n) => (n || '').toLowerCase().trim())
  );

  // Generate 100% anonymous combinations: [Prefix][Suffix]_[Number]
  for (let attempt = 0; attempt < 200; attempt++) {
    const prefix = COOL_PREFIXES[Math.floor(Math.random() * COOL_PREFIXES.length)];
    const suffix = COOL_SUFFIXES[Math.floor(Math.random() * COOL_SUFFIXES.length)];
    const num = Math.floor(10 + Math.random() * 90); // 2-digit number (10-99)

    let candidate = `${prefix}${suffix}_${num}`;
    if (prefix === suffix) {
      candidate = `${prefix}TIC_${num}`;
    }

    if (!existingSet.has(candidate.toLowerCase()) && !isProfaneOrInappropriate(candidate)) {
      return candidate;
    }
  }

  // 3-digit fallback
  for (let attempt = 0; attempt < 100; attempt++) {
    const prefix = COOL_PREFIXES[Math.floor(Math.random() * COOL_PREFIXES.length)];
    const num = Math.floor(100 + Math.random() * 900);
    const candidate = `${prefix}_TIC_${num}`;
    if (!existingSet.has(candidate.toLowerCase()) && !isProfaneOrInappropriate(candidate)) {
      return candidate;
    }
  }

  return `CiberHero_${Math.floor(100 + Math.random() * 900)}`;
}

/**
 * Returns a clean, safe, guaranteed anonymous display nickname for any student.
 * If the student has a legacy name (like "ANTONIO . LOPES" or real name), returns an anonymous pseudonym.
 */
export function getSafeDisplayNickname(
  storedNickname?: string | null,
  studentId?: string,
  userRole?: string
): string {
  if (userRole === 'admin' || userRole === 'teacher') {
    return 'Professora Carla';
  }

  const clean = (storedNickname || '').trim();

  // If valid and not a legacy real-name pattern
  if (clean && !isLegacyRealNameNickname(clean) && !isProfaneOrInappropriate(clean)) {
    return clean;
  }

  // Deterministic anonymous nickname based on ID seed so student sees consistent pseudonym
  const seed = (studentId || clean || 'aluno').toLowerCase();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const prefix = COOL_PREFIXES[absHash % COOL_PREFIXES.length];
  const suffix = COOL_SUFFIXES[(absHash >> 3) % COOL_SUFFIXES.length];
  const num = 10 + (absHash % 90);

  return `${prefix}${suffix === prefix ? 'TIC' : suffix}_${num}`;
}
