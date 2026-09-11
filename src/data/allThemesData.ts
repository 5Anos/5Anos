import { ThemeDefinition } from '../types';
import { themeCorreioEletronicoData } from './themeCorreioEletronicoData';
import { themeTicSociedadeData } from './themeTicSociedadeData';
import { themeErgonomiaData } from './themeErgonomiaData';
import { themeSegurancaData } from './themeSegurancaData';
import { themePalavrasPasseData } from './themePalavrasPasseData';
import { themeNavegarInternetData } from './themeNavegarInternetData';
import { themeDireitosAutorData } from './themeDireitosAutorData';

export const ALL_THEMES: ThemeDefinition[] = [
  themeCorreioEletronicoData,
  themeTicSociedadeData,
  themeErgonomiaData,
  themeSegurancaData,
  themePalavrasPasseData,
  themeNavegarInternetData,
  themeDireitosAutorData,
];

export const THEMES_BY_ID: Record<string, ThemeDefinition> = {
  'correio-eletronico': themeCorreioEletronicoData,
  'tic-sociedade': themeTicSociedadeData,
  'ergonomia': themeErgonomiaData,
  'seguranca': themeSegurancaData,
  'palavras-passe': themePalavrasPasseData,
  'navegar-internet': themeNavegarInternetData,
  'direitos-autor': themeDireitosAutorData,
  // Backward compatibility aliases
  'referencias-fontes': themeDireitosAutorData,
  'seguranca-digital': themeSegurancaData,
  'pesquisa-informacao': themeNavegarInternetData,
};

export {
  themeCorreioEletronicoData,
  themeTicSociedadeData,
  themeErgonomiaData,
  themeSegurancaData,
  themePalavrasPasseData,
  themeNavegarInternetData,
  themeDireitosAutorData,
};
