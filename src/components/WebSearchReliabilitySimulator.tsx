import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, ExternalLink, Globe, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  isAd?: boolean;
  isReliable: boolean;
  explanation: string;
}

export const WebSearchReliabilitySimulator: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const results: SearchResult[] = [
    {
      id: 'r1',
      title: 'ANÚNCIO: Ganha um telemóvel novo clicando aqui!',
      url: 'https://ganha-premios-gratis-123.tk/win',
      domain: 'ganha-premios-gratis-123.tk',
      snippet: 'Parabéns! Foste o visitante número 1.000.000! Clica aqui já para receberes o teu prémio imediato sem pagar nada.',
      isAd: true,
      isReliable: false,
      explanation: '⚠️ PERIGO / BURLA: Anúncio com promessas de prémios milagrosos e domínio suspeito (.tk). Nunca cliques nem partilhes dados!',
    },
    {
      id: 'r2',
      title: 'Direção-Geral da Educação — Segurança Digital nas Escolas',
      url: 'https://www.dge.mec.pt/seguranca-digital',
      domain: 'dge.mec.pt',
      snippet: 'Recursos educativos oficiais, manuais e boas práticas para alunos e professores do 5.º ano sobre TIC e cidadania digital.',
      isReliable: true,
      explanation: '✅ FONTE 100% FIÁVEL: É um portal oficial do Ministério da Educação português (.gov/.pt), com informação verificada e segura.',
    },
    {
      id: 'r3',
      title: 'Blog Pessoal do Zé: "A terra é oca e os robôs mandam no mundo"',
      url: 'https://blogdoze99.wordpress.com/post-34',
      domain: 'blogdoze99.wordpress.com',
      snippet: 'Opinião pessoal sem fontes comprovadas nem bibliografia científica.',
      isReliable: false,
      explanation: '❌ NÃO FIÁVEL PARA TRABALHOS: Blog pessoal sem fact-checking nem revisão científica. Deves sempre cruzar a informação com fontes oficiais.',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-sky-50/80 to-slate-50 rounded-2xl border-2 border-sky-200 shadow-md p-3.5 sm:p-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-sky-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-sky-600 text-white rounded-lg shadow-sm">
            <Search className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-black text-sky-950 uppercase tracking-wide">
            Simulador de Pesquisa & Fontes Fiáveis
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full border border-sky-300">
          Laboratório Prático
        </span>
      </div>

      {/* Search Input Bar Mock */}
      <div className="bg-white rounded-xl border border-sky-300 p-2 shadow-inner flex items-center gap-2 mb-3">
        <Search className="w-4 h-4 text-sky-500" />
        <span className="text-xs font-semibold text-slate-700">como pesquisar com segurança na internet</span>
        <span className="ml-auto text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-mono">3 resultados</span>
      </div>

      <p className="text-[11px] font-bold text-slate-600 mb-2">
        Clica nos resultados para inspecionar a sua segurança e credibilidade:
      </p>

      {/* Results List */}
      <div className="space-y-2 mb-3">
        {results.map((res) => {
          const isSelected = selectedResult?.id === res.id;
          return (
            <div
              key={res.id}
              onClick={() => setSelectedResult(res)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                isSelected
                  ? 'border-sky-500 bg-sky-50/80 shadow-xs ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white hover:border-sky-300'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {res.isAd && (
                  <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded-xs">
                    Anúncio
                  </span>
                )}
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 truncate">
                  <Globe className="w-3 h-3 text-slate-400" /> {res.domain}
                </span>
              </div>
              <h5 className="text-xs font-bold text-sky-900 leading-snug hover:underline">
                {res.title}
              </h5>
              <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                {res.snippet}
              </p>
            </div>
          );
        })}
      </div>

      {/* Inspection Feedback Box */}
      {selectedResult && (
        <div
          className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
            selectedResult.isReliable
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            {selectedResult.isReliable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
            <span>{selectedResult.isReliable ? 'Resultado Seguro e Fiável' : 'Atenção / Risco'}</span>
          </div>
          <p className="text-[11px] font-medium">{selectedResult.explanation}</p>
        </div>
      )}
    </div>
  );
};
