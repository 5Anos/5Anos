import React, { useState } from 'react';
import { Search, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface SearchOperatorsLabProps {
  language?: Language;
}

export const SearchOperatorsLab: React.FC<SearchOperatorsLabProps> = ({ language = 'pt' }) => {
  const [selectedOperator, setSelectedOperator] = useState<string>('quotes');

  const OPERATORS = [
    {
      id: 'quotes',
      name: 'Aspas "..."',
      query: '"sistema solar em 3d"',
      purpose: 'Pesquisa pela frase exata, na mesma ordem de palavras.',
      result: 'Mostra apenas páginas que contenham exatamente essa expressão completa.',
    },
    {
      id: 'site',
      name: 'site:dominio',
      query: 'robótica site:dge.mec.pt',
      purpose: 'Limita a pesquisa a um site governamental ou escolar de confiança.',
      result: 'Garante que os resultados vêm apenas do portal oficial da Direção-Geral da Educação.',
    },
    {
      id: 'filetype',
      name: 'filetype:pdf',
      query: 'historia de portugal 5ano filetype:pdf',
      purpose: 'Procura apenas ficheiros de documentos em formato PDF para estudo.',
      result: 'Ideal para encontrar resumos, fichas de trabalho e apresentações de estudo.',
    },
    {
      id: 'minus',
      name: 'Menos (-)',
      query: 'jaguar -carro',
      purpose: 'Exclui palavras que não te interessam dos resultados.',
      result: 'Encontra o animal felino da selva e esconde páginas sobre a marca de automóveis.',
    },
  ];

  const active = OPERATORS.find((o) => o.id === selectedOperator) || OPERATORS[0];

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/70 rounded-3xl border-2 border-indigo-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
            🔍
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Laboratório de Pesquisa Avançada: Truques de Busca' : 'Advanced Search Lab: Power Query Tricks'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Aprende a usar operadores no motor de busca para encontrar informação fiável em segundos!'
                : 'Learn search operators to find accurate info in seconds!'}
            </p>
          </div>
        </div>
      </div>

      {/* Operator Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {OPERATORS.map((op) => (
          <button
            key={op.id}
            onClick={() => setSelectedOperator(op.id)}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
              selectedOperator === op.id
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50'
            }`}
          >
            {op.name}
          </button>
        ))}
      </div>

      {/* Simulated Search Box with active Operator */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
          <Search className="w-4 h-4 text-indigo-600" />
          <span>Exemplo de Pesquisa no Google</span>
        </div>

        <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 font-mono text-xs sm:text-sm text-indigo-950 font-bold flex items-center justify-between">
          <span>{active.query}</span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-900 font-sans">Enter ↵</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-1">
            <span className="font-bold text-indigo-950 block">🎯 Como Funciona:</span>
            <p className="text-slate-700 leading-relaxed font-medium">{active.purpose}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
            <span className="font-bold text-emerald-950 block">✨ O que Encontras:</span>
            <p className="text-slate-700 leading-relaxed font-medium">{active.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
