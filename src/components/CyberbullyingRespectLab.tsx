import React, { useState } from 'react';
import { Heart, MessageSquare, AlertTriangle, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface CyberbullyingRespectLabProps {
  language?: Language;
}

export const CyberbullyingRespectLab: React.FC<CyberbullyingRespectLabProps> = ({ language = 'pt' }) => {
  const [testedPhrases, setTestedPhrases] = useState<Record<string, boolean>>({});

  const PHRASES = [
    {
      id: 'p1',
      text: '"És mesmo fraco a jogar, sai daqui e nunca mais jogues com o grupo."',
      kind: 'toxic',
      feedback: '⛔ Ofensivo e Excludente. Magoa os sentimentos do colega e cria ambiente hostil.',
    },
    {
      id: 'p2',
      text: '"Bom jogo! Na próxima ronda ajudamos-te a passar esse nível difícil!"',
      kind: 'positive',
      feedback: '✨ Empatia e Espírito de Equipa! Incentivar os colegas torna o jogo divertido para todos.',
    },
    {
      id: 'p3',
      text: '"Vou publicar aquela foto em que caíste no chão para todos se rirem."',
      kind: 'toxic',
      feedback: '⛔ Humilhação pública e falta de consentimento. Viola a privacidade e os direitos de imagem.',
    },
  ];

  const handleTest = (id: string) => {
    setTestedPhrases((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full bg-gradient-to-br from-rose-50/70 via-white to-indigo-50/70 rounded-3xl border-2 border-rose-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl shadow-xs">
            🤝
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'O Teste do Espelho: Dirias Isto Olhos nos Olhos?' : 'Mirror Test: Would You Say This Face-to-Face?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Antes de escrever ou comentar na Internet, pensa no impacto das tuas palavras!'
                : 'Before posting or commenting online, reflect on the real impact of your words!'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {PHRASES.map((item) => {
          const isEvaluated = testedPhrases[item.id];

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                isEvaluated
                  ? item.kind === 'positive'
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : 'bg-rose-50/80 border-rose-300'
                  : 'bg-white border-slate-200 hover:border-rose-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-xl mt-0.5">{item.kind === 'positive' ? '💬' : '⚠️'}</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{item.text}</p>
                    {isEvaluated && (
                      <p className={`text-xs font-medium mt-2 ${item.kind === 'positive' ? 'text-emerald-900' : 'text-rose-900'}`}>
                        {item.feedback}
                      </p>
                    )}
                  </div>
                </div>

                {!isEvaluated && (
                  <button
                    onClick={() => handleTest(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Avaliar Mensagem
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-2xl bg-indigo-100/60 border border-indigo-200 text-xs text-indigo-950 font-medium flex items-center gap-2">
        <Heart className="w-4 h-4 text-rose-500 shrink-0" />
        <span>Atrás de cada ecrã está uma pessoa real com sentimentos. A gentileza digital faz a diferença!</span>
      </div>
    </div>
  );
};
