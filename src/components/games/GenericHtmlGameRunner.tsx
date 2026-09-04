import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { Language } from '../../types';

interface GenericHtmlGameRunnerProps {
  gameData: {
    type: 'tf' | 'mc' | 'match' | 'order';
    title: string;
    icon: string;
    xp: number;
    desc: string;
    data: any;
  };
  language: Language;
  onBack: () => void;
  onReturnToGames?: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const GenericHtmlGameRunner: React.FC<GenericHtmlGameRunnerProps> = ({
  gameData,
  language,
  onBack,
  onReturnToGames,
  onFinish,
}) => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [mcIndex, setMcIndex] = useState(0);
  const [mcAnswers, setMcAnswers] = useState<number[]>([]);
  const [shuffledQuestions] = useState(() => {
    if (gameData.type === 'mc' && gameData.data?.questions) {
      return gameData.data.questions.map((q: any) => {
        const indices = q.opts.map((_: any, idx: number) => idx);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        const newOpts = indices.map((idx: number) => q.opts[idx]);
        const newC = indices.indexOf(q.c);
        return {
          ...q,
          opts: newOpts,
          c: newC,
        };
      });
    }
    return gameData.data?.questions || [];
  });
  const [matched, setMatched] = useState<number[]>([]);
  const [picked, setPicked] = useState<[number?, number?]>([]);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);
  const [orderChosen, setOrderChosen] = useState<number[]>([]);
  const [orderPool, setOrderPool] = useState<number[]>(() => {
    if (gameData.type === 'order') {
      return gameData.data.items.map((_: any, i: number) => i).sort(() => Math.random() - 0.5);
    }
    return [];
  });
  const [orderChecked, setOrderChecked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const type = gameData.type;
  const data = gameData.data;

  // TF Handler
  const handleTfSelect = (idx: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const handleTfFinish = () => {
    const items = data.items;
    let correct = 0;
    items.forEach((it: any, i: number) => {
      if (answers[i] === it.a) correct++;
    });
    const pct = Math.round((correct / items.length) * 100);
    setCompleted(true);
    onFinish(correct, items.length, pct);
  };

  // MC Handler
  const handleMcSelect = (optIdx: number) => {
    const nextAnswers = [...mcAnswers, optIdx];
    setMcAnswers(nextAnswers);
  };

  const handleMcNext = () => {
    const qs = shuffledQuestions;
    if (mcIndex + 1 < qs.length) {
      setMcIndex(mcIndex + 1);
    } else {
      let correct = 0;
      qs.forEach((q: any, i: number) => {
        if (mcAnswers[i] === q.c) correct++;
      });
      const pct = Math.round((correct / qs.length) * 100);
      setCompleted(true);
      onFinish(correct, qs.length, pct);
    }
  };

  // Match Handler
  const [rightOrder] = useState<number[]>(() => {
    if (type === 'match') {
      return data.pairs.map((_: any, i: number) => i).sort(() => Math.random() - 0.5);
    }
    return [];
  });

  const handleMatchLeft = (idx: number) => {
    setPicked([idx, picked[1]]);
  };

  const handleMatchRight = (ri: number) => {
    if (picked[0] === undefined) return;
    const li = picked[0];
    if (li === ri) {
      const nextMatched = [...matched, li];
      setMatched(nextMatched);
      setPicked([]);
      if (nextMatched.length === data.pairs.length) {
        setCompleted(true);
        onFinish(data.pairs.length, data.pairs.length, 100);
      }
    } else {
      setShakeIdx(ri);
      setPicked([]);
      setTimeout(() => setShakeIdx(null), 500);
    }
  };

  // Order Handler
  const handleOrderPick = (itemIdx: number) => {
    setOrderChosen([...orderChosen, itemIdx]);
  };

  const handleOrderReset = () => {
    setOrderChosen([]);
    setOrderChecked(false);
  };

  const handleOrderCheck = () => {
    setOrderChecked(true);
    const items = data.items;
    const isCorrect = orderChosen.every((v, idx) => v === idx);
    if (isCorrect) {
      setCompleted(true);
      onFinish(items.length, items.length, 100);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'pt' ? 'Voltar ao Tema' : 'Back to Theme'}</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            {gameData.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                ⭐ +{gameData.xp} XP
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {gameData.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{gameData.desc}</p>
          </div>
        </div>

        {/* 1. TRUE / FALSE */}
        {type === 'tf' && (
          <div className="space-y-4">
            {data.items.map((it: any, i: number) => {
              const ans = answers[i];
              const revealed = ans !== undefined;
              let statusCls = 'border-slate-200 bg-white';
              if (revealed) {
                statusCls = ans === it.a ? 'border-emerald-300 bg-emerald-50/50' : 'border-rose-300 bg-rose-50/50';
              }
              return (
                <div key={i} className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${statusCls}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-sm font-bold text-slate-900 flex-1">{it.s}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleTfSelect(i, true)}
                        disabled={revealed || completed}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          ans === true
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Verdadeiro
                      </button>
                      <button
                        onClick={() => handleTfSelect(i, false)}
                        disabled={revealed || completed}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          ans === false
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Falso
                      </button>
                    </div>
                  </div>
                  {revealed && (
                    <div className={`text-xs p-2.5 rounded-xl font-medium ${ans === it.a ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
                      {ans === it.a ? '✅ Correto! ' : '❌ Incorreto. '}{it.e}
                    </div>
                  )}
                </div>
              );
            })}

            {!completed && (
              <button
                onClick={handleTfFinish}
                disabled={Object.keys(answers).length < data.items.length}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 mt-4"
              >
                Concluir Desafio e Receber XP
              </button>
            )}
          </div>
        )}

        {/* 2. MULTIPLE CHOICE */}
        {type === 'mc' && !completed && (() => {
          const qs = shuffledQuestions;
          const q = qs[mcIndex];
          const chosen = mcAnswers[mcIndex];
          return (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Pergunta {mcIndex + 1} de {qs.length}</span>
                <span className="text-indigo-600">Progressão: {Math.round((mcIndex / qs.length) * 100)}%</span>
              </div>

              <div className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {q.q}
              </div>

              <div className="space-y-2.5">
                {q.opts.map((o: string, oi: number) => {
                  let btnCls = 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-800';
                  if (chosen !== undefined) {
                    if (oi === q.c) {
                      btnCls = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (oi === chosen) {
                      btnCls = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                    } else {
                      btnCls = 'border-slate-200 opacity-50 bg-white text-slate-500';
                    }
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => chosen === undefined && handleMcSelect(oi)}
                      disabled={chosen !== undefined}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-sm font-semibold cursor-pointer ${btnCls}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>

              {chosen !== undefined && (
                <div className="space-y-4 pt-2 animate-in fade-in">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium ${chosen === q.c ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'}`}>
                    <strong>{chosen === q.c ? '✅ Correto!' : '❌ Não é bem assim.'}</strong> {q.e}
                  </div>
                  <button
                    onClick={handleMcNext}
                    className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    {mcIndex + 1 < qs.length ? 'Próxima Pergunta →' : 'Ver Resultado Final 🏆'}
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* 3. MATCHING PAIRS */}
        {type === 'match' && !completed && (
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-slate-600">
              Clica num item da coluna da esquerda e, em seguida, no item correspondente da coluna da direita.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Conceitos</h4>
                {data.pairs.map((p: any, i: number) => {
                  const isMatched = matched.includes(i);
                  const isSel = picked[0] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => !isMatched && handleMatchLeft(i)}
                      disabled={isMatched}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isMatched
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80 cursor-default'
                          : isSel
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-800'
                      }`}
                    >
                      {p.left}
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Respostas</h4>
                {rightOrder.map((ri) => {
                  const p = data.pairs[ri];
                  const isMatched = matched.includes(ri);
                  const isShake = shakeIdx === ri;
                  return (
                    <button
                      key={ri}
                      onClick={() => !isMatched && handleMatchRight(ri)}
                      disabled={isMatched}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isMatched
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80 cursor-default'
                          : isShake
                          ? 'border-rose-500 bg-rose-100 text-rose-900 animate-bounce'
                          : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-800'
                      }`}
                    >
                      {p.right}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4. ORDER SEQUENCE */}
        {type === 'order' && !completed && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Passos ordenados ({orderChosen.length} / {data.items.length})</h4>
              <div className="space-y-2 min-h-[90px] p-3 rounded-2xl bg-slate-50 border border-slate-200">
                {orderChosen.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">Clica nos passos em baixo pela ordem correta...</p>
                ) : (
                  orderChosen.map((itemIdx, pos) => (
                    <div key={pos} className="p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-3 shadow-2xs">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0">{pos + 1}</span>
                      <span>{data.items[itemIdx]}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {orderChosen.length < data.items.length ? (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Passos disponíveis</h4>
                <div className="flex flex-wrap gap-2">
                  {orderPool.filter((i) => !orderChosen.includes(i)).map((i) => (
                    <button
                      key={i}
                      onClick={() => handleOrderPick(i)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs transition-all cursor-pointer"
                    >
                      + {data.items[i]}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {orderChecked && !completed && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold text-center">
                    A ordem selecionada não está correta. Tenta novamente!
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleOrderCheck}
                    className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    Verificar Ordem
                  </button>
                  <button
                    onClick={handleOrderReset}
                    className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reiniciar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Completed state message */}
        {completed && (
          <div className="p-8 text-center bg-emerald-50 rounded-3xl border-2 border-emerald-200 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
              🎉
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
              Desafio Concluído com Sucesso!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800">
              Parabéns! Ganhaste <strong>+{gameData.xp} XP</strong> e avançaste no teu progresso.
            </p>
            <button
              onClick={onReturnToGames || onBack}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{language === 'pt' ? 'Continuar a Jogar →' : 'Continue Playing →'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
