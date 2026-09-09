// Script to generate comprehensive, 100% complete 366-day daily facts database for 5th grade ICT
// Covering all 366 days of the year (Day 1 to Day 366, including leap day Feb 29)
// Balanced systematically across the 7 curricular themes of TIC:
// 1: tic-sociedade (53 facts)
// 2: ergonomia (52 facts)
// 3: seguranca (52 facts)
// 4: palavras-passe (52 facts)
// 5: correio-eletronico (52 facts)
// 6: navegar-internet (52 facts)
// 7: direitos-autor (53 facts)
// Total = 366 facts!

const fs = require('fs');
const path = require('path');

const MONTH_NAMES = {
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

const DAYS_IN_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 366 days (leap year included)

const THEMES = [
  {
    id: 'tic-sociedade',
    number: 1,
    title: { pt: 'TIC na Sociedade', en: 'ICT in Society' },
    icon: '🌍',
    badgeColor: 'indigo'
  },
  {
    id: 'ergonomia',
    number: 2,
    title: { pt: 'Ergonomia e Bem-Estar', en: 'Ergonomics & Well-being' },
    icon: '🧘‍♂️',
    badgeColor: 'emerald'
  },
  {
    id: 'seguranca',
    number: 3,
    title: { pt: 'Segurança e Cidadania Digital', en: 'Digital Safety & Citizenship' },
    icon: '🛡️',
    badgeColor: 'rose'
  },
  {
    id: 'palavras-passe',
    number: 4,
    title: { pt: 'Palavras-passe Fortes', en: 'Strong Passwords' },
    icon: '🔑',
    badgeColor: 'amber'
  },
  {
    id: 'correio-eletronico',
    number: 5,
    title: { pt: 'Correio Eletrónico Seguro', en: 'Safe Email & Communication' },
    icon: '✉️',
    badgeColor: 'sky'
  },
  {
    id: 'navegar-internet',
    number: 6,
    title: { pt: 'Navegar na Internet', en: 'Internet Browsing & Search' },
    icon: '🌐',
    badgeColor: 'blue'
  },
  {
    id: 'direitos-autor',
    number: 7,
    title: { pt: 'Direitos de Autor e Plágio', en: 'Copyright & Plagiarism' },
    icon: '⚖️',
    badgeColor: 'purple'
  }
];

console.log('Script template ready to test');
