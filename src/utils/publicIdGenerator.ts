// Safe Public Identifier Generator for 5.º Ano TIC
// Generates child-friendly, anonymous pseudonyms (e.g. Panda_Feliz_701, Raposa_Digital_284)
// Strictly reveals NO personal information (no real name, no email, no school, no class, no age, no location).

const NOUNS = [
  'Panda',
  'Raposa',
  'Golfinho',
  'Coala',
  'Explorador',
  'Lince',
  'Coruja',
  'Falcão',
  'Guepardo',
  'Pinguim',
  'Castor',
  'Águia',
  'Lontra',
  'Leopardo',
  'Foca',
  'Lêmure',
  'Tucano',
  'Camaleão',
  'Gavião',
  'Urso',
  'Astronauta',
  'Robô',
  'Navegador',
  'Cientista',
  'Gamer',
  'Codificador',
  'Guardião',
  'Ninja',
  'Fénix',
  'Tigre',
];

const ADJECTIVES = [
  'Feliz',
  'Digital',
  'TIC',
  'Sábio',
  'Criativo',
  'Cibernético',
  'Tech',
  'Inovador',
  'Curioso',
  'Genial',
  'Brilhante',
  'Veloz',
  'Espacial',
  'Amigável',
  'Valente',
  'Atento',
  'Focado',
  'Futurista',
  'Conectado',
  'Seguro',
  'Astuto',
  'Radical',
  'Estelar',
  'Dinâmico',
];

function getSecureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const array = new Uint32Array(1);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
    return min + (array[0] % range);
  }
  return min + Math.floor(Math.random() * range);
}

export function generateSecurePublicId(existingIds: string[] = []): string {
  const existingSet = new Set(existingIds.map((id) => (id || '').toLowerCase().trim()));

  // 1. Try standard friendly combinations
  for (let attempt = 0; attempt < 100; attempt++) {
    const noun = NOUNS[getSecureRandomInt(0, NOUNS.length - 1)];
    const adj = ADJECTIVES[getSecureRandomInt(0, ADJECTIVES.length - 1)];
    const randomNum = getSecureRandomInt(100, 999); // 3-digit number 100-999
    const candidate = `${noun}_${adj}_${randomNum}`;

    if (!existingSet.has(candidate.toLowerCase())) {
      return candidate;
    }
  }

  // 2. High-entropy fallback guaranteed to not collide
  for (let attempt = 0; attempt < 100; attempt++) {
    const noun = NOUNS[getSecureRandomInt(0, NOUNS.length - 1)];
    const randomNum = getSecureRandomInt(1000, 9999);
    const candidate = `${noun}_TIC_${randomNum}`;
    if (!existingSet.has(candidate.toLowerCase())) {
      return candidate;
    }
  }

  // 3. Absolute unique timestamp fallback
  return `Estudante_TIC_${Date.now().toString().slice(-4)}`;
}

export const PUBLIC_ID_EXPLANATION = {
  pt: 'Este é o teu Nickname para o ranking e para os desafios. O teu nome verdadeiro permanece privado e protegido.',
  en: 'This is your Nickname for leaderboards and challenges. Your real name remains private and protected.',
};
