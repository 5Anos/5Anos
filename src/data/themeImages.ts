import ticSocietyHero from '../assets/images/tic_society_hero_1788476514973.jpg';
import hardwarePeripherals from '../assets/images/hardware_peripherals_3d_1788539942831.jpg';
import ergonomicsGuide from '../assets/images/ergonomics_guide_1788476529797.jpg';
import activeBreaksPosture from '../assets/images/active_breaks_posture_3d_1788539976910.jpg';
import passwordsSecurity from '../assets/images/passwords_security_1788476556370.jpg';
import cyberSafetyShield from '../assets/images/cyber_safety_shield_3d_1788539960280.jpg';
import emailCommunication from '../assets/images/email_communication_1788476921823.jpg';
import internetBrowsing from '../assets/images/internet_browsing_1788476543602.jpg';
import copyrightAuthors from '../assets/images/copyright_authors_1788476571353.jpg';
import referenciasFontes from '../assets/images/referencias_fontes_3d_1788539928240.jpg';
import quizGameTrophy from '../assets/images/quiz_game_trophy_3d_1788539991745.jpg';
import boyAvatarImg from '../assets/images/tic_boy_avatar_1788537870929.jpg';
import girlAvatarImg from '../assets/images/tic_girl_avatar_1788537889222.jpg';

export const THEME_IMAGES: Record<string, string> = {
  'tic-sociedade': ticSocietyHero,
  'ergonomia': ergonomicsGuide,
  'palavras-passe': passwordsSecurity,
  'correio-eletronico': emailCommunication,
  'navegar-internet': internetBrowsing,
  'direitos-autor': copyrightAuthors,
  'referencias-fontes': referenciasFontes,
  // Backward compatibility alias
  'seguranca-digital': passwordsSecurity,
};

export const THEME_STEP_IMAGES: Record<string, string[]> = {
  'tic-sociedade': [
    ticSocietyHero,
    hardwarePeripherals,
    boyAvatarImg,
    hardwarePeripherals,
    girlAvatarImg,
    ticSocietyHero,
  ],
  'ergonomia': [
    ergonomicsGuide,
    activeBreaksPosture,
    girlAvatarImg,
    ergonomicsGuide,
    activeBreaksPosture,
  ],
  'palavras-passe': [
    passwordsSecurity,
    cyberSafetyShield,
    boyAvatarImg,
    passwordsSecurity,
    cyberSafetyShield,
  ],
  'correio-eletronico': [
    emailCommunication,
    boyAvatarImg,
    emailCommunication,
    girlAvatarImg,
    emailCommunication,
  ],
  'navegar-internet': [
    internetBrowsing,
    referenciasFontes,
    boyAvatarImg,
    internetBrowsing,
    cyberSafetyShield,
  ],
  'direitos-autor': [
    copyrightAuthors,
    girlAvatarImg,
    referenciasFontes,
    copyrightAuthors,
  ],
  'referencias-fontes': [
    referenciasFontes,
    internetBrowsing,
    boyAvatarImg,
    referenciasFontes,
  ],
};

export function getThemeImage(themeId: string): string {
  return THEME_IMAGES[themeId] || ticSocietyHero;
}

export function getThemeStepImage(themeId: string, stepIndex: number): string {
  const list = THEME_STEP_IMAGES[themeId];
  if (list && list.length > 0) {
    return list[stepIndex % list.length];
  }
  return getThemeImage(themeId);
}

export function getChallengeImage(type?: string): string {
  if (type === 'final_quiz') {
    return quizGameTrophy;
  }
  return quizGameTrophy;
}

export {
  ticSocietyHero,
  hardwarePeripherals,
  ergonomicsGuide,
  activeBreaksPosture,
  passwordsSecurity,
  cyberSafetyShield,
  emailCommunication,
  internetBrowsing,
  copyrightAuthors,
  referenciasFontes,
  quizGameTrophy,
  boyAvatarImg,
  girlAvatarImg,
};

