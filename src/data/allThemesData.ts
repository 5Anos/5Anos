import { ThemeDefinition } from '../types';
import { themeTicSociedadeData } from './themeTicSociedadeData';
import { themeErgonomiaData } from './themeErgonomiaData';
import { themeNavegarInternetData } from './themeNavegarInternetData';
import { themePalavrasPasseData } from './themePalavrasPasseData';
import { themeCorreioEletronicoData } from './themeCorreioEletronicoData';
import { themeDireitosAutorData } from './themeDireitosAutorData';
import { themeReferenciasData } from './themeReferenciasData';

export const ALL_THEMES: ThemeDefinition[] = [
  themeTicSociedadeData,
  themeErgonomiaData,
  themePalavrasPasseData,
  themeCorreioEletronicoData,
  themeNavegarInternetData,
  themeDireitosAutorData,
  themeReferenciasData,
];

export const THEMES_BY_ID: Record<string, ThemeDefinition> = {
  'tic-sociedade': themeTicSociedadeData,
  'ergonomia': themeErgonomiaData,
  'navegar-internet': themeNavegarInternetData,
  'palavras-passe': themePalavrasPasseData,
  'correio-eletronico': themeCorreioEletronicoData,
  'direitos-autor': themeDireitosAutorData,
  'referencias-fontes': themeReferenciasData,
  // Backward compatibility aliases if any
  'seguranca-digital': themeTicSociedadeData,
  'pesquisa-informacao': themeNavegarInternetData,
};

export {
  themeTicSociedadeData,
  themeErgonomiaData,
  themeNavegarInternetData,
  themePalavrasPasseData,
  themeCorreioEletronicoData,
  themeDireitosAutorData,
  themeReferenciasData,
};
