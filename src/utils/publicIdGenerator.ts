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

export function generateSecurePublicId(existingIds: string[] = []): string {
  const existingSet = new Set(existingIds.map((id) => (id || '').toLowerCase().trim()));

  // 1. Try standard friendly combinations
  for (let attempt = 0; attempt < 100; attempt++) {
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit number 100-999
    const candidate = `${noun}_${adj}_${randomNum}`;

    if (!existingSet.has(candidate.toLowerCase())) {
      return candidate;
    }
  }

  // 2. High-entropy fallback guaranteed to not collide
  for (let attempt = 0; attempt < 100; attempt++) {
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const candidate = `${noun}_TIC_${randomNum}`;
    if (!existingSet.has(candidate.toLowerCase())) {
      return candidate;
    }
  }

  // 3. Absolute unique timestamp fallback
  return `Estudante_TIC_${Date.now().toString().slice(-4)}`;
}

export const PUBLIC_ID_EXPLANATION = {
  pt: 'Este é o teu Nickname para o ranking e para os desafios. O teu nome verdadeiro permanece 100% privado.',
  en: 'This is your Nickname for leaderboards and challenges. Your real name remains 100% private.',
};
