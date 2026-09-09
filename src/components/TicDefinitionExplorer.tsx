import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, HelpCircle, Lightbulb } from 'lucide-react';
import { Language } from '../types';

interface TicDefinitionExplorerProps {
  language?: Language;
}

interface Item {
  id: string;
  name: { pt: string; en: string };
  icon: string;
  isTic: boolean;
  why: { pt: string; en: string };
}

const ITEMS: Item[] = [
  {
    id: 'email',
    name: { pt: 'Correio Eletrónico (Email)', en: 'Email' },
    icon: '📧',
    isTic: true,
    why: {
      pt: 'Sim! Permite criar, enviar e guardar informação e comunicar digitalmente com pessoas em qualquer parte do mundo.',
      en: 'Yes! It allows creating, sending, and storing information to communicate digitally worldwide.',
    },
  },
  {
    id: 'lapis',
    name: { pt: 'Lápis de Grafite', en: 'Graphite Pencil' },
    icon: '✏️',
    isTic: false,
    why: {
      pt: 'Não é TIC. É um objeto escolar tradicional muito útil, mas não envolve tecnologia digital, redes nem processamento automático.',
      en: 'Not ICT. It is a traditional writing tool, without digital processing or networks.',
    },
  },
  {
    id: 'gps',
    name: { pt: 'Navegador GPS do Carro', en: 'Car GPS Navigation' },
    icon: '🛰️',
    isTic: true,
    why: {
      pt: 'Sim! Recebe sinais de satélites no espaço, processa dados de trânsito e comunica o melhor caminho em tempo real.',
      en: 'Yes! It receives satellite signals, calculates routes, and communicates live traffic data.',
    },
  },
  {
    id: 'caderno',
    name: { pt: 'Caderno de Linhas', en: 'Lined Notebook' },
    icon: '📓',
    isTic: false,
    why: {
      pt: 'Não é TIC. Guarda informação em papel físico, mas não comunica à distância nem automatiza tarefas digitais.',
      en: 'Not ICT. Stores physical writing on paper, without digital networks or processing.',
    },
  },
  {
    id: 'catalogo',
    name: { pt: 'Catálogo Digital da Biblioteca', en: 'Digital Library Catalog' },
    icon: '📚💻',
    isTic: true,
    why: {
      pt: 'Sim! É uma base de dados digital que organiza e permite pesquisar milhares de livros em segundos.',
      en: 'Yes! It is a digital database organizing thousands of books for instant search.',
    },
  },
  {
    id: 'sensor',
    name: { pt: 'Sensor de Humidade do Solo (IoT)', en: 'Soil Moisture Sensor (IoT)' },
    icon: '🌱📡',
    isTic: true,
    why: {
      pt: 'Sim! Mede a água na terra, envia os dados pela Internet e liga a rega de forma automática e sustentável.',
      en: 'Yes! Measures soil water, sends digital data over the internet, and triggers smart irrigation.',
    },
  },
];

export const TicDefinitionExplorer: React.FC<TicDefinitionExplorerProps> = ({ language = 'pt' }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const handleVote = (itemId: string, choiceIsTic: boolean) => {
    setAnswers((prev) => ({ ...prev, [itemId]: choiceIsTic }));
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 rounded-3xl border-2 border-indigo-200/80 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-indigo-100">
        <div className="flex items-center gap-2.5">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
            💡
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'Laboratório Interativo: É TIC ou Não É?' : 'Interactive Lab: Is it ICT or Not?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Testa se compreendes a diferença entre objetos tradicionais e ferramentas TIC digitais!'
                : 'Test if you understand the difference between traditional objects and digital ICT tools!'}
            </p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold shrink-0">
          {answeredCount} / {ITEMS.length} {language === 'pt' ? 'resolvidos' : 'solved'}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ITEMS.map((item) => {
          const userChoice = answers[item.id];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = userChoice === item.isTic;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-amber-50/70 border-amber-300'
                  : 'bg-white border-slate-200/90 hover:border-indigo-300 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl p-2 bg-slate-100 rounded-xl">{item.icon}</span>
                  <p className="font-bold text-sm text-slate-900 leading-snug">{item.name[language]}</p>
                </div>

                {!hasAnswered ? (
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {language === 'pt' ? 'Este elemento é uma tecnologia TIC?' : 'Is this item an ICT technology?'}
                  </p>
                ) : (
                  <div className="mt-2 text-xs font-medium space-y-1">
                    <p className={`font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-800' : 'text-amber-800'}`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{language === 'pt' ? 'Exato!' : 'Correct!'}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{language === 'pt' ? 'Ainda não...' : 'Not quite...'}</span>
                        </>
                      )}
                    </p>
                    <p className="text-slate-700 leading-relaxed">{item.why[language]}</p>
                  </div>
                )}
              </div>

              {!hasAnswered ? (
                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleVote(item.id, true)}
                    className="py-1.5 px-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-bold transition-colors cursor-pointer border border-indigo-200"
                  >
                    {language === 'pt' ? '✅ É TIC' : '✅ Is ICT'}
                  </button>
                  <button
                    onClick={() => handleVote(item.id, false)}
                    className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-700 hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                  >
                    {language === 'pt' ? '❌ Não é TIC' : '❌ Not ICT'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAnswers((prev) => {
                      const next = { ...prev };
                      delete next[item.id];
                      return next;
                    });
                  }}
                  className="mt-3 text-[11px] text-slate-500 hover:text-slate-800 font-semibold underline self-end cursor-pointer"
                >
                  {language === 'pt' ? 'Tentar de novo' : 'Try again'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
