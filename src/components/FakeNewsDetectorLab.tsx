import React, { useState } from 'react';
import { Newspaper, CheckCircle2, AlertTriangle, HelpCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface FakeNewsDetectorLabProps {
  language?: Language;
}

interface NewsCard {
  id: string;
  headline: string;
  source: string;
  date: string;
  isReliable: boolean;
  clues: string;
  verdict: string;
}

const NEWS: NewsCard[] = [
  {
    id: 'n1',
    headline: '🚨 URGENTE: Cientistas descobrem que comer 10 chocolates por dia dá notas 5 a matemática!',
    source: 'noticias-bombasticas-gratis.xyz (Sem autor)',
    date: 'Sem data de publicação',
    isReliable: false,
    clues: 'Título sensacionalista, promessa milagrosa, site desconhecido e sem nome de jornalista ou autor.',
    verdict: 'Falso / Boato (Fake News)! Notícias verdadeiras citam universidades e estudos reais.',
  },
  {
    id: 'n2',
    headline: '🔬 Rover da Agência Espacial encontra novas pistas sobre água congelada no subsolo de Marte.',
    source: 'Portal Ciência & Espaço / Agência Espacial Europeia (ESA)',
    date: 'Publicado ontem por Dr.ª Marta Silva',
    isReliable: true,
    clues: 'Fonte oficial e científica, nome da investigadora responsável e data recente confirmada.',
    verdict: 'Fonte Fiável e Confiável! A informação é baseada em dados e pode ser confirmada noutros jornais.',
  },
];

export const FakeNewsDetectorLab: React.FC<FakeNewsDetectorLabProps> = ({ language = 'pt' }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [choice, setChoice] = useState<boolean | null>(null);

  const card = NEWS[currentIdx];

  return (
    <div className="w-full bg-gradient-to-br from-amber-50/70 via-white to-sky-50/70 rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
            🕵️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Detetive da Informação: Notícia Fiável ou Boato?' : 'Information Detective: Reliable News or Hoax?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Analisa as pistas do artigo e decide se deves confiar ou desconfiar!'
                : 'Analyze article clues and decide whether to trust or investigate!'}
            </p>
          </div>
        </div>

        <div className="flex gap-1.5 bg-amber-100 p-1 rounded-xl">
          {NEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIdx(idx);
                setChoice(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentIdx === idx ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-900 hover:text-amber-950'
              }`}
            >
              Caso {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated News Headline Snippet */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span className="font-semibold flex items-center gap-1.5">
            <Newspaper className="w-4 h-4 text-slate-400" />
            <span>{card.source}</span>
          </span>
          <span className="text-[11px] font-mono">{card.date}</span>
        </div>

        <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
          {card.headline}
        </h4>

        {choice === null ? (
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => setChoice(true)}
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              ✅ É Notícia Fiável
            </button>
            <button
              onClick={() => setChoice(false)}
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-rose-600 hover:text-white text-slate-800 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              🚩 É Boato / Fake News
            </button>
          </div>
        ) : (
          <div className={`p-4 rounded-xl text-xs font-medium space-y-2 ${
            choice === card.isReliable ? 'bg-emerald-50 text-emerald-950 border border-emerald-300' : 'bg-rose-50 text-rose-950 border border-rose-300'
          }`}>
            <p className="font-bold flex items-center gap-1.5 text-sm">
              {choice === card.isReliable ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
              <span>{choice === card.isReliable ? '🎯 Análise Correta!' : '⚠️ Atenção aos Sinais!'}</span>
            </p>
            <p><strong>Pistas:</strong> {card.clues}</p>
            <p><strong>Veredito:</strong> {card.verdict}</p>
          </div>
        )}
      </div>

      <div className="p-3.5 rounded-2xl bg-sky-100/60 border border-sky-200 text-xs text-sky-950 font-medium flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
        <span>Dica de Ouro: Confirma sempre a informação em pelo menos 2 fontes oficiais antes de partilhares!</span>
      </div>
    </div>
  );
};
