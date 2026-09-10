import React, { useState } from 'react';
import { Lock, Globe, Search, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface UrlAnatomyExplorerProps {
  language?: Language;
}

export const UrlAnatomyExplorer: React.FC<UrlAnatomyExplorerProps> = ({ language = 'pt' }) => {
  const [activePart, setActivePart] = useState<'protocol' | 'subdomain' | 'domain' | 'tld' | 'path' | null>('protocol');

  const PARTS = {
    protocol: {
      name: 'Protocolo Cifrado (https://)',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: '🔒',
      desc: 'HTTPS e o cadeado indicam que a ligação ao site está protegida por cifragem. Isso não significa que o site seja verdadeiro ou de confiança.',
    },
    subdomain: {
      name: 'Subdomínio (www)',
      color: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: '🌐',
      desc: 'Indica a secção do servidor. Pode ser "www", "area", "aluno", "mail", etc.',
    },
    domain: {
      name: 'Nome do Domínio (seguranet)',
      color: 'bg-purple-100 text-purple-900 border-purple-300',
      icon: '🏷️',
      desc: 'É o nome oficial da organização, escola ou empresa dona da página. Verifica sempre se está bem escrito sem letras trocadas!',
    },
    tld: {
      name: 'Terminação / Domínio de Topo (.pt)',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: '🇵🇹',
      desc: '.pt é o domínio de topo associado a Portugal (outros exemplos: .es = Espanha, .gov = governo, .edu = educação, .org = organização, .com = comercial).',
    },
    path: {
      name: 'Caminho / Página (/jogos/5ano)',
      color: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: '📁',
      desc: 'É o caminho para a página ou pasta exata dentro do site.',
    },
  };

  return (
    <div className="w-full bg-gradient-to-br from-sky-50/70 via-white to-indigo-50/70 rounded-3xl border-2 border-sky-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-xl shadow-xs">
            🧭
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Anatomia de um Endereço Web (URL) & Navegador' : 'Anatomy of a URL & Web Browser'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Clica nas partes da barra de endereços para perceberes como funciona uma morada digital!'
                : 'Click parts of the URL to discover how digital addresses work!'}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Browser Address Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-900 text-white shadow-md border border-slate-700 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 pb-2 border-b border-slate-800">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[11px] font-mono text-slate-300 ml-2">Navegador Web (Browser)</span>
        </div>

        {/* Interactive Clickable URL Segments */}
        <div className="p-2 sm:p-2.5 bg-slate-800/90 rounded-xl border border-slate-700 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActivePart('protocol')}
            className={`px-2 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 font-bold ${
              activePart === 'protocol' ? 'bg-emerald-500 text-slate-950 border-emerald-300 ring-2 ring-emerald-400' : 'bg-slate-700 text-emerald-400 border-slate-600'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>https://</span>
          </button>

          <button
            onClick={() => setActivePart('subdomain')}
            className={`px-2 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'subdomain' ? 'bg-blue-500 text-white border-blue-300 ring-2 ring-blue-400' : 'bg-slate-700 text-blue-300 border-slate-600'
            }`}
          >
            www.
          </button>

          <button
            onClick={() => setActivePart('domain')}
            className={`px-2 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'domain' ? 'bg-purple-500 text-white border-purple-300 ring-2 ring-purple-400' : 'bg-slate-700 text-purple-300 border-slate-600'
            }`}
          >
            seguranet
          </button>

          <button
            onClick={() => setActivePart('tld')}
            className={`px-2 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'tld' ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400' : 'bg-slate-700 text-amber-300 border-slate-600'
            }`}
          >
            .pt
          </button>

          <button
            onClick={() => setActivePart('path')}
            className={`px-2 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
              activePart === 'path' ? 'bg-rose-500 text-white border-rose-300 ring-2 ring-rose-400' : 'bg-slate-700 text-rose-300 border-slate-600'
            }`}
          >
            /jogos/5ano
          </button>
        </div>
      </div>

      {/* Active Part Explanation */}
      {activePart && (
        <div className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${PARTS[activePart].color}`}>
          <span className="text-3xl p-1 bg-white/70 rounded-xl shrink-0">{PARTS[activePart].icon}</span>
          <div>
            <h4 className="font-black text-sm sm:text-base mb-1">{PARTS[activePart].name}</h4>
            <p className="text-xs sm:text-sm font-medium leading-relaxed">{PARTS[activePart].desc}</p>
          </div>
        </div>
      )}

      {/* Interactive URL Missions */}
      <div className="pt-2 p-4 rounded-2xl bg-white border-2 border-sky-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="text-xs sm:text-sm font-black text-slate-900">
              {language === 'pt' ? 'Missão de Detetive Web: Clica na barra de endereço acima!' : 'Web Detective Mission: Click the address bar above!'}
            </span>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
            {language === 'pt' ? 'Interativo' : 'Interactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => setActivePart('protocol')}
            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
              activePart === 'protocol'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            🔒 {language === 'pt' ? 'Onde está a ligação cifrada segura?' : 'Where is the secure encrypted connection?'}
          </button>
          <button
            onClick={() => setActivePart('domain')}
            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
              activePart === 'domain'
                ? 'bg-purple-50 border-purple-400 text-purple-950 ring-2 ring-purple-300'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            🏷️ {language === 'pt' ? 'Onde está o nome do site/organização?' : 'Where is the website/organization name?'}
          </button>
          <button
            onClick={() => setActivePart('tld')}
            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
              activePart === 'tld'
                ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-300'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            🇵🇹 {language === 'pt' ? 'Onde está o código de país (.pt)?' : 'Where is the country code (.pt)?'}
          </button>
        </div>
      </div>
    </div>
  );
};
