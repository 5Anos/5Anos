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

export function generateSecurePublicId(): string {
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit number 100-999

  return `${noun}_${adj}_${randomNum}`;
}

export const PUBLIC_ID_EXPLANATION = {
  pt: 'Este é o nome que os outros alunos verão no ranking. O teu nome verdadeiro permanece privado.',
  en: 'This is the name other students will see on the leaderboard. Your real name remains private.',
};
