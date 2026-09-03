import ticSocietyHero from '../assets/images/tic_society_hero_1788476514973.jpg';
import ergonomicsGuide from '../assets/images/ergonomics_guide_1788476529797.jpg';
import internetBrowsing from '../assets/images/internet_browsing_1788476543602.jpg';
import passwordsSecurity from '../assets/images/passwords_security_1788476556370.jpg';
import emailCommunication from '../assets/images/email_communication_1788476921823.jpg';
import copyrightAuthors from '../assets/images/copyright_authors_1788476571353.jpg';

export const THEME_IMAGES: Record<string, string> = {
  'tic-sociedade': ticSocietyHero,
  'ergonomia': ergonomicsGuide,
  'navegar-internet': internetBrowsing,
  'palavras-passe': passwordsSecurity,
  'correio-eletronico': emailCommunication,
  'direitos-autor': copyrightAuthors,
  'referencias-fontes': copyrightAuthors,
};

export function getThemeImage(themeId: string): string {
  return THEME_IMAGES[themeId] || ticSocietyHero;
}
