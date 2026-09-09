import { AvatarConfig } from '../types';

export const SKIN_COLORS = [
  { id: '#FEE2D5', label: 'Porcelana', color: '#FEE2D5' },
  { id: '#FDDFBA', label: 'Pêssego', color: '#FDDFBA' },
  { id: '#E5A073', label: 'Dourado', color: '#E5A073' },
  { id: '#BB774A', label: 'Moreno', color: '#BB774A' },
  { id: '#834925', label: 'Bronze', color: '#834925' },
  { id: '#4A2C1D', label: 'Ébano', color: '#4A2C1D' },
  { id: '#BAE6FD', label: 'Cyber Robô', color: '#BAE6FD' },
];

export const HAIR_STYLES: { id: AvatarConfig['hairStyle']; labelPt: string; labelEn: string; icon: string }[] = [
  { id: 'short', labelPt: 'Curto', labelEn: 'Short', icon: '👦' },
  { id: 'spiky', labelPt: 'Espetado / Gamer', labelEn: 'Spiky', icon: '⚡' },
  { id: 'curly', labelPt: 'Caracóis', labelEn: 'Curly', icon: '🌀' },
  { id: 'long', labelPt: 'Comprido', labelEn: 'Long', icon: '👧' },
  { id: 'ponytail', labelPt: 'Rabo de Cavalo', labelEn: 'Ponytail', icon: '👱‍♀️' },
  { id: 'afro', labelPt: 'Afro Estiloso', labelEn: 'Afro', icon: '🧑‍🦱' },
  { id: 'braids', labelPt: 'Tranças', labelEn: 'Braids', icon: '✨' },
  { id: 'bald', labelPt: 'Rapado', labelEn: 'Shaved', icon: '🧑' },
];

export const HAIR_COLORS = [
  { id: '#18181B', label: 'Preto Noite', color: '#18181B' },
  { id: '#451A03', label: 'Castanho Escuro', color: '#451A03' },
  { id: '#78350F', label: 'Castanho Avelã', color: '#78350F' },
  { id: '#F59E0B', label: 'Louro Solar', color: '#F59E0B' },
  { id: '#EA580C', label: 'Ruivo Cobre', color: '#EA580C' },
  { id: '#06B6D4', label: 'Ciano Gamer', color: '#06B6D4' },
  { id: '#8B5CF6', label: 'Roxo Elétrico', color: '#8B5CF6' },
  { id: '#10B981', label: 'Verde Neon', color: '#10B981' },
  { id: '#E2E8F0', label: 'Platina / Branco', color: '#E2E8F0' },
];

export const EXPRESSIONS: { id: AvatarConfig['expression']; labelPt: string; labelEn: string; icon: string }[] = [
  { id: 'smile', labelPt: 'Sorriso Amigo', labelEn: 'Friendly Smile', icon: '🙂' },
  { id: 'laugh', labelPt: 'Riso Feliz', labelEn: 'Laughing', icon: '😄' },
  { id: 'cool', labelPt: 'Confiante / Cool', labelEn: 'Cool', icon: '😏' },
  { id: 'wink', labelPt: 'Piscar Olho', labelEn: 'Wink', icon: '😉' },
  { id: 'star', labelPt: 'Estrela / Wow', labelEn: 'Star Eyes', icon: '🤩' },
  { id: 'gamer', labelPt: 'Focado / Gamer', labelEn: 'Focused Gamer', icon: '🧐' },
];

export const GLASSES_OPTIONS: { id: AvatarConfig['glasses']; labelPt: string; labelEn: string; icon: string }[] = [
  { id: 'none', labelPt: 'Sem Óculos', labelEn: 'None', icon: '❌' },
  { id: 'round', labelPt: 'Óculos Redondos', labelEn: 'Round Glasses', icon: '👓' },
  { id: 'square', labelPt: 'Óculos Modernos', labelEn: 'Square Frames', icon: '🕶️' },
  { id: 'cool-shades', labelPt: 'Óculos de Sol VIP', labelEn: 'Sun Shades', icon: '😎' },
  { id: 'vr-headset', labelPt: 'Óculos VR de TIC', labelEn: 'VR Headset', icon: '🥽' },
];

export const HATS_OPTIONS: { id: AvatarConfig['hat']; labelPt: string; labelEn: string; icon: string }[] = [
  { id: 'none', labelPt: 'Sem Acessório', labelEn: 'None', icon: '❌' },
  { id: 'cap', labelPt: 'Boné Desportivo', labelEn: 'Baseball Cap', icon: '🧢' },
  { id: 'beanie', labelPt: 'Gorro Urbano', labelEn: 'Beanie', icon: '🧶' },
  { id: 'headphones', labelPt: 'Fones de Gamer / DJ', labelEn: 'Gaming Headset', icon: '🎧' },
  { id: 'crown', labelPt: 'Coroa de Campeão', labelEn: 'Champion Crown', icon: '👑' },
  { id: 'wizard', labelPt: 'Chapéu de Feiticeiro', labelEn: 'Magic Hat', icon: '🧙' },
];

export const CLOTHING_OPTIONS: { id: AvatarConfig['clothing']; labelPt: string; labelEn: string; icon: string }[] = [
  { id: 'tshirt', labelPt: 'T-shirt Tecnológica', labelEn: 'Tech T-Shirt', icon: '👕' },
  { id: 'hoodie', labelPt: 'Casaco Hoodie Gamer', labelEn: 'Gamer Hoodie', icon: '🧥' },
  { id: 'sweater', labelPt: 'Polo de Estudante', labelEn: 'School Polo', icon: '👔' },
  { id: 'superhero', labelPt: 'Fato Super-Herói TIC', labelEn: 'Superhero Suit', icon: '🦸' },
];

export const ACCESSORY_COLORS = [
  { id: '#1E293B', label: 'Grafite', color: '#1E293B' },
  { id: '#4F46E5', label: 'Índigo', color: '#4F46E5' },
  { id: '#0284C7', label: 'Azul Celeste', color: '#0284C7' },
  { id: '#10B981', label: 'Esmeralda', color: '#10B981' },
  { id: '#F59E0B', label: 'Dourado', color: '#F59E0B' },
  { id: '#EF4444', label: 'Vermelho Fogo', color: '#EF4444' },
  { id: '#EC4899', label: 'Rosa Shock', color: '#EC4899' },
  { id: '#8B5CF6', label: 'Roxo Neon', color: '#8B5CF6' },
  { id: '#FFFFFF', label: 'Branco', color: '#FFFFFF' },
];

export const BG_COLORS = [
  { id: '#6366F1', label: 'Roxo Cósmico', color: '#6366F1' },
  { id: '#0EA5E9', label: 'Azul TIC', color: '#0EA5E9' },
  { id: '#10B981', label: 'Verde Hacker', color: '#10B981' },
  { id: '#F59E0B', label: 'Âmbar Dourado', color: '#F59E0B' },
  { id: '#EC4899', label: 'Rosa Futurista', color: '#EC4899' },
  { id: '#8B5CF6', label: 'Ultra Violeta', color: '#8B5CF6' },
  { id: '#14B8A6', label: 'Turquesa Mar', color: '#14B8A6' },
  { id: '#334155', label: 'Cinzento Espacial', color: '#334155' },
];

export const PRESET_AVATARS: { namePt: string; nameEn: string; icon: string; config: AvatarConfig }[] = [
  {
    namePt: 'Gamer de TIC 🎧',
    nameEn: 'ICT Gamer',
    icon: '🎮',
    config: {
      skinColor: '#FDDFBA',
      hairStyle: 'spiky',
      hairColor: '#06B6D4',
      expression: 'cool',
      glasses: 'none',
      glassesColor: '#1E293B',
      hat: 'headphones',
      hatColor: '#8B5CF6',
      clothing: 'hoodie',
      clothingColor: '#4F46E5',
      bgColor: '#6366F1',
    },
  },
  {
    namePt: 'Campeão(ã) 👑',
    nameEn: 'Champion',
    icon: '👑',
    config: {
      skinColor: '#BB774A',
      hairStyle: 'curly',
      hairColor: '#18181B',
      expression: 'star',
      glasses: 'none',
      hat: 'crown',
      hatColor: '#F59E0B',
      clothing: 'superhero',
      clothingColor: '#EF4444',
      bgColor: '#F59E0B',
    },
  },
  {
    namePt: 'Detetive da Net 🕵️',
    nameEn: 'Net Detective',
    icon: '🕵️',
    config: {
      skinColor: '#E5A073',
      hairStyle: 'short',
      hairColor: '#451A03',
      expression: 'smile',
      glasses: 'round',
      glassesColor: '#1E293B',
      hat: 'cap',
      hatColor: '#1E293B',
      clothing: 'sweater',
      clothingColor: '#0284C7',
      bgColor: '#0EA5E9',
    },
  },
  {
    namePt: 'Super Aluno(a) ⚡',
    nameEn: 'Super Student',
    icon: '⚡',
    config: {
      skinColor: '#FEE2D5',
      hairStyle: 'ponytail',
      hairColor: '#EA580C',
      expression: 'laugh',
      glasses: 'none',
      hat: 'none',
      clothing: 'superhero',
      clothingColor: '#10B981',
      bgColor: '#10B981',
    },
  },
  {
    namePt: 'Explorador(a) VR 🥽',
    nameEn: 'VR Explorer',
    icon: '🥽',
    config: {
      skinColor: '#FDDFBA',
      hairStyle: 'short',
      hairColor: '#78350F',
      expression: 'gamer',
      glasses: 'vr-headset',
      glassesColor: '#6366F1',
      hat: 'none',
      clothing: 'tshirt',
      clothingColor: '#14B8A6',
      bgColor: '#14B8A6',
    },
  },
  {
    namePt: 'Criativo(a) Pop 🎨',
    nameEn: 'Creative Pop',
    icon: '🎨',
    config: {
      skinColor: '#834925',
      hairStyle: 'afro',
      hairColor: '#18181B',
      expression: 'wink',
      glasses: 'cool-shades',
      glassesColor: '#18181B',
      hat: 'beanie',
      hatColor: '#EC4899',
      clothing: 'tshirt',
      clothingColor: '#F59E0B',
      bgColor: '#EC4899',
    },
  },
];

/**
 * Generates a completely randomized AvatarConfig for fun
 */
export function generateRandomAvatar(): AvatarConfig {
  const skin = SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)].id;
  const hairStyle = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)].id;
  const hairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].id;
  const expression = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)].id;
  const glasses = GLASSES_OPTIONS[Math.floor(Math.random() * GLASSES_OPTIONS.length)].id;
  const glassesColor = ACCESSORY_COLORS[Math.floor(Math.random() * ACCESSORY_COLORS.length)].id;
  const hat = HATS_OPTIONS[Math.floor(Math.random() * HATS_OPTIONS.length)].id;
  const hatColor = ACCESSORY_COLORS[Math.floor(Math.random() * ACCESSORY_COLORS.length)].id;
  const clothing = CLOTHING_OPTIONS[Math.floor(Math.random() * CLOTHING_OPTIONS.length)].id;
  const clothingColor = ACCESSORY_COLORS[Math.floor(Math.random() * ACCESSORY_COLORS.length)].id;
  const bgColor = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)].id;

  return {
    skinColor: skin,
    hairStyle,
    hairColor,
    expression,
    glasses,
    glassesColor,
    hat,
    hatColor,
    clothing,
    clothingColor,
    bgColor,
  };
}

/**
 * Returns a deterministic default AvatarConfig based on seed (e.g. name or publicId)
 */
export function getDefaultAvatar(seed = 'TIC5'): AvatarConfig {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const presetIndex = absHash % PRESET_AVATARS.length;
  return { ...PRESET_AVATARS[presetIndex].config };
}

/**
 * Returns a short human-readable summary of the avatar traits in Portuguese or English
 */
export function getAvatarSummary(avatar: AvatarConfig, language: 'pt' | 'en' = 'pt'): string {
  const parts: string[] = [];

  const hair = HAIR_STYLES.find((h) => h.id === avatar.hairStyle);
  if (hair) {
    parts.push(language === 'pt' ? hair.labelPt : hair.labelEn);
  }

  if (avatar.glasses && avatar.glasses !== 'none') {
    const glasses = GLASSES_OPTIONS.find((g) => g.id === avatar.glasses);
    if (glasses) parts.push(language === 'pt' ? glasses.labelPt : glasses.labelEn);
  }

  if (avatar.hat && avatar.hat !== 'none') {
    const hat = HATS_OPTIONS.find((h) => h.id === avatar.hat);
    if (hat) parts.push(language === 'pt' ? hat.labelPt : hat.labelEn);
  }

  const cloth = CLOTHING_OPTIONS.find((c) => c.id === avatar.clothing);
  if (cloth && cloth.id !== 'tshirt') {
    parts.push(language === 'pt' ? cloth.labelPt : cloth.labelEn);
  }

  if (parts.length === 0) {
    return language === 'pt' ? 'Estilo Estiloso' : 'Cool Style';
  }

  return parts.join(' • ');
}
