import ticSocietyHero from '../assets/images/tic_society_hero_1788476514973.jpg';
import hardwarePeripherals from '../assets/images/hardware_peripherals_3d_1788539942831.jpg';
import ergonomicsGuide from '../assets/images/ergonomics_guide_1788476529797.jpg';
import activeBreaksPosture from '../assets/images/active_breaks_posture_3d_1788539976910.jpg';
import correctPostureGuide from '../assets/images/correct_posture_guide_1788640792425.jpg';
import sitPostureGuide from '../assets/images/sit_posture_guide_1788646722404.jpg';
import dosDontsPosture from '../assets/images/dos_donts_posture_1788646816497.jpg';
import passwordsSecurity from '../assets/images/passwords_security_1788476556370.jpg';
import cyberSafetyShield from '../assets/images/cyber_safety_shield_3d_1788539960280.jpg';
import emailCommunication from '../assets/images/email_communication_1788476921823.jpg';
import internetBrowsing from '../assets/images/internet_browsing_1788476543602.jpg';
import copyrightAuthors from '../assets/images/copyright_authors_1788476571353.jpg';
import referenciasFontes from '../assets/images/referencias_fontes_3d_1788539928240.jpg';
import quizGameTrophy from '../assets/images/quiz_game_trophy_3d_1788539991745.jpg';
import boyAvatarImg from '../assets/images/tic_boy_avatar_1788537870929.jpg';
import girlAvatarImg from '../assets/images/tic_girl_avatar_1788537889222.jpg';
import copyrightKidsBanner from '../assets/images/copyright_kids_banner_1788807163232.jpg';
import citationBlocksArt from '../assets/images/citation_blocks_art_1788807180640.jpg';
import ccLicensingArt from '../assets/images/cc_licensing_art_1788807200633.jpg';
import plagiarismKidsArt from '../assets/images/plagiarism_kids_art_1788807229222.jpg';

export const THEME_IMAGES: Record<string, string> = {
  'tic-sociedade': ticSocietyHero,
  'ergonomia': ergonomicsGuide,
  'palavras-passe': passwordsSecurity,
  'seguranca': cyberSafetyShield,
  'correio-eletronico': emailCommunication,
  'navegar-internet': internetBrowsing,
  'direitos-autor': copyrightKidsBanner,
  'referencias-fontes': citationBlocksArt,
  // Backward compatibility alias
  'seguranca-digital': cyberSafetyShield,
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
    sitPostureGuide,
    girlAvatarImg,
    activeBreaksPosture,
    dosDontsPosture,
  ],
  'palavras-passe': [
    passwordsSecurity,
    cyberSafetyShield,
    boyAvatarImg,
    passwordsSecurity,
    cyberSafetyShield,
  ],
  'seguranca': [
    cyberSafetyShield,
    passwordsSecurity,
    boyAvatarImg,
    girlAvatarImg,
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
    copyrightKidsBanner,
    ccLicensingArt,
    plagiarismKidsArt,
    citationBlocksArt,
    citationBlocksArt,
  ],
  'referencias-fontes': [
    citationBlocksArt,
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

export function getChallengeImage(challengeId?: string, themeId?: string, type?: string): string {
  if (type === 'final_quiz' || (challengeId && challengeId.includes('quiz-final'))) {
    return quizGameTrophy;
  }
  const cid = challengeId || '';
  const tid = themeId || '';

  if (cid.includes('ergo') || tid === 'ergonomia') {
    if (cid.includes('posture') || cid.includes('tf')) return correctPostureGuide;
    if (cid.includes('detective') || cid.includes('mc')) return sitPostureGuide;
    return activeBreaksPosture;
  }
  if (cid.includes('pass') || tid === 'palavras-passe') {
    return passwordsSecurity;
  }
  if (cid.includes('cyber') || cid.includes('phish') || cid.includes('footprint') || tid === 'seguranca' || tid === 'seguranca-digital') {
    return cyberSafetyShield;
  }
  if (cid.includes('email') || cid.includes('inbox') || cid.includes('bcc') || tid === 'correio-eletronico') {
    return emailCommunication;
  }
  if (cid.includes('search') || cid.includes('keyword') || cid.includes('source') || tid === 'navegar-internet') {
    return internetBrowsing;
  }
  if (cid.includes('copy') || cid.includes('credit') || cid.includes('cite') || tid === 'direitos-autor') {
    if (cid.includes('copy')) return plagiarismKidsArt;
    if (cid.includes('credit') || cid.includes('cite')) return citationBlocksArt;
    return ccLicensingArt;
  }
  if (tid === 'tic-sociedade') {
    return hardwarePeripherals;
  }
  return quizGameTrophy;
}

export {
  ticSocietyHero,
  hardwarePeripherals,
  ergonomicsGuide,
  activeBreaksPosture,
  correctPostureGuide,
  sitPostureGuide,
  dosDontsPosture,
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

