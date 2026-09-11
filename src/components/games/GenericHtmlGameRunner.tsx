import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, ShieldCheck, Check, X, KeyRound, Delete, Sparkles } from 'lucide-react';
import { PostureCorrectionSimulator } from '../PostureCorrectionSimulator';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';

interface GenericHtmlGameRunnerProps {
  gameData: {
    type: 'tf' | 'mc' | 'match' | 'order' | 'password_builder' | 'builder' | 'posture_simulator' | string;
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
  const type = gameData?.type || '';
  const data = gameData?.data || {};

  const isTf = type === 'tf' || type === 'true_false';
  const isMc = type === 'mc' || type === 'multiple_choice';
  const isMatch = type === 'match' || type === 'pairs' || type === 'match_pairs';
  const isOrder = type === 'order' || type === 'order_sequence';
  const isClassify = type === 'classify' || type === 'reliable_sources' || type === 'classification';

  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [mcIndex, setMcIndex] = useState(0);
  const [mcAnswers, setMcAnswers] = useState<number[]>([]);
  const [shuffledQuestions] = useState(() => {
    if (isMc && gameData.data?.questions) {
      return gameData.data.questions.map((q: any) => {
        const indices = q.opts ? q.opts.map((_: any, idx: number) => idx) : [];
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
    if (isOrder && gameData.data?.items) {
      return gameData.data.items.map((_: any, i: number) => i).sort(() => Math.random() - 0.5);
    }
    return [];
  });
  const [orderChecked, setOrderChecked] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Classify Game State
  const [classifiedMap, setClassifiedMap] = useState<Record<number, string>>({});
  const [selectedClassifyItem, setSelectedClassifyItem] = useState<number | null>(null);

  // Password Builder State
  const [builderPassword, setBuilderPassword] = useState('');
  const [builderSubmitted, setBuilderSubmitted] = useState(false);

  // Validate rules for password builder
  const validatePasswordRules = (pwd: string) => {
    const isLong = pwd.length >= 8;
    const pwdLower = pwd.toLowerCase();
    const obviousSequences = ['12345678', '1234567', 'abcdefgh', 'abcdefg', 'password', 'qwerty', '87654321', 'hgfedcba', '1234', 'abcd', '1111', '0000'];
    const hasObviousSeq = obviousSequences.some((seq) => pwdLower.includes(seq));

    const distinctChars = new Set(pwd.split('')).size;
    const hasOnlyRepeated = pwd.length >= 6 && distinctChars <= 2;

    const personalTerms = ['maria', 'tobi', 'martim', 'joao', 'pedro', 'ana', 'escola', 'gato', 'cao', 'admin', 'user'];
    const hasPersonalInfo = personalTerms.some((term) => pwdLower.includes(term));
    const isHardToGuess = distinctChars >= 4 && pwd.length >= 8 && !hasObviousSeq;

    const allValid =
      isLong &&
      isHardToGuess &&
      !hasObviousSeq &&
      !hasOnlyRepeated &&
      !hasPersonalInfo;

    return {
      hasMinLen: isLong,
      isHardToGuess,
      noObviousSeq: !hasObviousSeq,
      noRepeated: !hasOnlyRepeated,
      noPersonalInfo: !hasPersonalInfo,
      allValid,
    };
  };

  const builderRules = validatePasswordRules(builderPassword);

  const handleAppendChar = (char: string) => {
    if (builderPassword.length < 24) {
      setBuilderPassword((prev) => prev + char);
      setBuilderSubmitted(false);
    }
  };

  const handleBackspace = () => {
    setBuilderPassword((prev) => prev.slice(0, -1));
    setBuilderSubmitted(false);
  };

  const handleClearBuilder = () => {
    setBuilderPassword('');
    setBuilderSubmitted(false);
  };

  const handleBuilderSubmit = () => {
    setBuilderSubmitted(true);
    if (builderRules.allValid) {
      setCompleted(true);
      onFinish(100, 100, 100);
    }
  };

  // TF Handler
  const handleTfSelect = (idx: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const handleTfFinish = () => {
    const items = data.items || data.questions || [];
    let correct = 0;
    items.forEach((it: any, i: number) => {
      const expected = it.a !== undefined ? it.a : it.isTrue;
      if (answers[i] === expected) correct++;
    });
    const pct = Math.round((correct / items.length) * 100);
    setCompleted(true);
    onFinish(pct, 100, pct);
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
      onFinish(pct, 100, pct);
    }
  };

  // Match Handler
  const [rightOrder] = useState<number[]>(() => {
    if (isMatch && data?.pairs) {
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
        onFinish(100, 100, 100);
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
      onFinish(100, 100, 100);
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
        <div className="flex items-center justify-between gap-3.5 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
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

          <AudioSpeakButton
            id={`challenge-header-${gameData.title.replace(/\s+/g, '-').toLowerCase()}`}
            text={`${gameData.title}. ${gameData.desc}`}
            language={language}
            label={language === 'pt' ? 'Ouvir Desafio' : 'Listen Challenge'}
            variant="pill"
            size="sm"
          />
        </div>

        {/* 1. TRUE / FALSE */}
        {isTf && (
          <div className="space-y-4">
            {(() => {
              const tfItems = data.items || data.questions || [];
              return tfItems.map((it: any, i: number) => {
                const statementText = it.statement || it.s || '';
                const expectedAnswer = it.isTrue !== undefined ? it.isTrue : it.a;
                const explanationText = it.explanation || it.e || '';

                const ans = answers[i];
                const revealed = ans !== undefined;
                let statusCls = 'border-slate-200 bg-white';
                if (revealed) {
                  statusCls = ans === expectedAnswer ? 'border-emerald-300 bg-emerald-50/50' : 'border-rose-300 bg-rose-50/50';
                }
                return (
                  <div key={i} className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${statusCls}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1">
                        <p className="text-sm font-bold text-slate-900 flex-1">{statementText}</p>
                        <AudioSpeakButton
                          id={`tf-item-${i}`}
                          text={statementText}
                          language={language}
                          variant="icon"
                          size="xs"
                        />
                      </div>
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
                          {language === 'pt' ? 'Verdadeiro' : 'True'}
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
                          {language === 'pt' ? 'Falso' : 'False'}
                        </button>
                      </div>
                    </div>
                    {revealed && (
                      <div className={`text-xs p-2.5 rounded-xl font-medium flex items-start justify-between gap-2 ${ans === expectedAnswer ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
                        <div>
                          {ans === expectedAnswer
                            ? (language === 'pt' ? '✅ Correto! ' : '✅ Correct! ')
                            : (language === 'pt' ? '❌ Incorreto. ' : '❌ Incorrect. ')}
                          {explanationText}
                        </div>
                        <AudioSpeakButton
                          id={`tf-feedback-${i}`}
                          text={`${ans === expectedAnswer ? (language === 'pt' ? 'Correto.' : 'Correct.') : (language === 'pt' ? 'Incorreto.' : 'Incorrect.')} ${explanationText}`}
                          language={language}
                          variant="icon"
                          size="xs"
                        />
                      </div>
                    )}
                  </div>
                );
              });
            })()}

            {!completed && (
              <button
                onClick={handleTfFinish}
                disabled={Object.keys(answers).length < (data.items || data.questions || []).length}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 mt-4"
              >
                {language === 'pt' ? 'Concluir Desafio e Receber XP' : 'Complete Challenge and Earn XP'}
              </button>
            )}
          </div>
        )}

        {/* 2. MULTIPLE CHOICE */}
        {isMc && !completed && (() => {
          const qs = shuffledQuestions;
          const q = qs[mcIndex];
          const chosen = mcAnswers[mcIndex];

          const getOptionIconAndStyle = (optionText: string, index: number) => {
            const styles = [
              {
                border: 'border-sky-300/90 bg-sky-50/80 hover:bg-sky-100/90 text-sky-950 hover:border-sky-400',
                iconBg: 'bg-sky-200/90 text-sky-800',
                radioBorder: 'border-sky-400 text-sky-600',
                defaultIcon: '👥',
              },
              {
                border: 'border-emerald-300/90 bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-950 hover:border-emerald-400',
                iconBg: 'bg-emerald-200/90 text-emerald-800',
                radioBorder: 'border-emerald-400 text-emerald-600',
                defaultIcon: '🔒',
              },
              {
                border: 'border-amber-300/90 bg-amber-50/80 hover:bg-amber-100/90 text-amber-950 hover:border-amber-400',
                iconBg: 'bg-amber-200/90 text-amber-800',
                radioBorder: 'border-amber-400 text-amber-600',
                defaultIcon: '🔗',
              },
              {
                border: 'border-rose-300/90 bg-rose-50/80 hover:bg-rose-100/90 text-rose-950 hover:border-rose-400',
                iconBg: 'bg-rose-200/90 text-rose-800',
                radioBorder: 'border-rose-400 text-rose-600',
                defaultIcon: '⚠️',
              },
            ];

            const style = styles[index % styles.length];
            let icon = style.defaultIcon;

            const lower = optionText.toLowerCase();
            if (lower.includes('amigos') || lower.includes('reencaminho') || lower.includes('redes') || lower.includes('partilhar') || lower.includes('colegas')) {
              icon = '👥';
            } else if (lower.includes('palavra-passe') || lower.includes('senha') || lower.includes('proteger') || lower.includes('bloque')) {
              icon = '🔒';
            } else if (lower.includes('link') || lower.includes('clico') || lower.includes('site') || lower.includes('confirmar') || lower.includes('url')) {
              icon = '🔗';
            } else if (lower.includes('adulto') || lower.includes('aviso') || lower.includes('não respondo') || lower.includes('recusar') || lower.includes('denuncia')) {
              icon = '⚠️';
            } else if (lower.includes('antivírus') || lower.includes('computador') || lower.includes('atualiz')) {
              icon = '💻';
            } else if (lower.includes('câmara') || lower.includes('foto') || lower.includes('imagem')) {
              icon = '📷';
            }

            return { ...style, icon };
          };

          return (
            <div className="space-y-6 w-full max-w-4xl mx-auto animate-in fade-in">
              {/* Header Bar */}
              <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black text-indigo-900 uppercase tracking-widest">
                    {language === 'pt' ? 'PERGUNTA' : 'QUESTION'} {mcIndex + 1} {language === 'pt' ? 'DE' : 'OF'} {qs.length}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs sm:text-sm font-black text-indigo-700 shrink-0">
                    {language === 'pt' ? 'PROGRESSÃO:' : 'PROGRESS:'} {Math.round((mcIndex / qs.length) * 100)}%
                  </span>
                  <div className="w-full sm:w-44 h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((mcIndex / qs.length) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Main Question & Colorful Option Cards */}
              <div className="space-y-4">
                {/* Question Title Box */}
                <div className="flex items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border-2 border-indigo-100 shadow-xs">
                  <h3 className="text-base sm:text-xl font-black text-slate-900 leading-snug flex-1">
                    {q.q}
                  </h3>
                  <AudioSpeakButton
                    id={`mc-q-${mcIndex}`}
                    text={`${q.q}. ${q.opts.map((o: string, idx: number) => `${language === 'pt' ? 'Opção' : 'Option'} ${idx + 1}: ${o}`).join('. ')}`}
                    language={language}
                    variant="icon"
                    size="md"
                  />
                </div>

                {/* Options List - Distributed Full Width */}
                <div className="space-y-3 sm:space-y-3.5">
                  {q.opts.map((o: string, oi: number) => {
                    const style = getOptionIconAndStyle(o, oi);
                    let btnCls = `border-2 ${style.border} cursor-pointer hover:shadow-xs`;
                    let radioCls = `border-2 ${style.radioBorder} bg-white`;
                    let showCheckIcon = null;

                    if (chosen !== undefined) {
                      if (oi === q.c) {
                        btnCls = 'border-2 border-emerald-500 bg-emerald-100/90 text-emerald-950 font-black shadow-xs ring-2 ring-emerald-300';
                        radioCls = 'bg-emerald-600 border-emerald-600 text-white';
                        showCheckIcon = <Check className="w-4 h-4 stroke-[3]" />;
                      } else if (oi === chosen) {
                        btnCls = 'border-2 border-rose-500 bg-rose-100/90 text-rose-950 font-black shadow-xs ring-2 ring-rose-300';
                        radioCls = 'bg-rose-600 border-rose-600 text-white';
                        showCheckIcon = <X className="w-4 h-4 stroke-[3]" />;
                      } else {
                        btnCls = 'border-2 border-slate-200 opacity-40 bg-slate-50 text-slate-400';
                        radioCls = 'border-slate-300 bg-slate-100';
                      }
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => chosen === undefined && handleMcSelect(oi)}
                        disabled={chosen !== undefined}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 flex items-center justify-between gap-4 group shadow-2xs ${btnCls}`}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Icon Badge */}
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-2xs ${style.iconBg}`}>
                            {style.icon}
                          </div>
                          <span className="text-sm sm:text-lg font-bold leading-snug">
                            {o}
                          </span>
                        </div>

                        {/* Radio Check Circle */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${radioCls}`}>
                          {showCheckIcon}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback & Next Button Section */}
              {chosen !== undefined && (
                <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className={`p-4 sm:p-5 rounded-2xl border-2 text-sm sm:text-base font-semibold flex items-start justify-between gap-3 shadow-xs ${
                    chosen === q.c
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}>
                    <div className="space-y-1 flex-1">
                      <div className="font-extrabold flex items-center gap-2 text-base">
                        {chosen === q.c ? (
                          <span className="text-emerald-700 flex items-center gap-1.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span>{language === 'pt' ? 'Excelente Decisão!' : 'Excellent Decision!'}</span>
                          </span>
                        ) : (
                          <span className="text-amber-800 flex items-center gap-1.5">
                            <Sparkles className="w-5 h-5 text-amber-600" />
                            <span>{language === 'pt' ? 'Atenção ao Risco:' : 'Pay Attention to Risk:'}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pt-1">
                        {q.e}
                      </p>
                    </div>

                    <AudioSpeakButton
                      id={`mc-expl-${mcIndex}`}
                      text={`${chosen === q.c ? (language === 'pt' ? 'Excelente decisão.' : 'Excellent decision.') : (language === 'pt' ? 'Atenção ao risco.' : 'Pay attention to risk.')} ${q.e}`}
                      language={language}
                      variant="icon"
                      size="sm"
                    />
                  </div>

                  <button
                    onClick={handleMcNext}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>
                      {mcIndex + 1 < qs.length
                        ? (language === 'pt' ? 'Próxima Pergunta' : 'Next Question')
                        : (language === 'pt' ? 'Ver Resultado Final 🏆' : 'View Final Result 🏆')}
                    </span>
                    <span className="text-lg">→</span>
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* 3. MATCHING PAIRS */}
        {isMatch && !completed && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {language === 'pt'
                  ? 'Clica num conceito da coluna da esquerda e, em seguida, na resposta correspondente da coluna da direita.'
                  : 'Click a concept on the left column, then click its corresponding match on the right.'}
              </p>
              <AudioSpeakButton
                id="match-instructions"
                text={language === 'pt'
                  ? 'Clica num conceito da coluna da esquerda e, em seguida, na resposta correspondente da coluna da direita.'
                  : 'Click a concept on the left column, then click its corresponding match on the right.'}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Left Column - CONCEITOS */}
              <div className="space-y-3">
                <div className="bg-[#102a43] text-white font-black text-xs sm:text-sm uppercase tracking-widest py-2.5 px-4 rounded-xl text-center shadow-xs">
                  {language === 'pt' ? 'CONCEITOS' : 'CONCEPTS'}
                </div>
                {data.pairs.map((p: any, i: number) => {
                  const isMatched = matched.includes(i);
                  const isSel = picked[0] === i;

                  const leftText = p.left || '';
                  const image = p.image;
                  const icon = p.icon;
                  const lower = leftText.toLowerCase();

                  let themeStyle = {
                    border: 'border-indigo-200',
                    bg: 'bg-indigo-50/50 hover:bg-indigo-50/90',
                    text: 'text-indigo-950',
                    iconBg: 'bg-indigo-100 border-indigo-300 text-indigo-900',
                  };

                  if (lower.includes('copyright') || lower.includes('©') || p.colorTheme === 'purple') {
                    themeStyle = {
                      border: 'border-purple-200',
                      bg: 'bg-purple-50/70 hover:bg-purple-100/70',
                      text: 'text-purple-950',
                      iconBg: 'bg-purple-200/80 border-purple-300 text-purple-900',
                    };
                  } else if (lower.includes('copyleft') || p.colorTheme === 'green') {
                    themeStyle = {
                      border: 'border-emerald-200',
                      bg: 'bg-emerald-50/70 hover:bg-emerald-100/70',
                      text: 'text-emerald-950',
                      iconBg: 'bg-emerald-200/80 border-emerald-300 text-emerald-900',
                    };
                  } else if (lower.includes('cc-by') || lower.includes('creative commons') || lower.includes('licença cc') || p.colorTheme === 'blue') {
                    themeStyle = {
                      border: 'border-sky-200',
                      bg: 'bg-sky-50/70 hover:bg-sky-100/70',
                      text: 'text-sky-950',
                      iconBg: 'bg-sky-200/80 border-sky-300 text-sky-900',
                    };
                  } else if (lower.includes('royalty') || lower.includes('free') || p.colorTheme === 'amber') {
                    themeStyle = {
                      border: 'border-amber-200',
                      bg: 'bg-amber-50/70 hover:bg-amber-100/70',
                      text: 'text-amber-950',
                      iconBg: 'bg-amber-200/80 border-amber-300 text-amber-900',
                    };
                  }

                  let conceptVisual = null;
                  if (image) {
                    conceptVisual = (
                      <img
                        src={image}
                        alt=""
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200/80 shrink-0 shadow-2xs"
                      />
                    );
                  } else if (icon) {
                    conceptVisual = (
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center font-black text-lg shrink-0 shadow-2xs ${themeStyle.iconBg}`}>
                        {icon === '©' ? (
                          <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-black text-base">C</span>
                        ) : icon === 'CC' || icon === '🅒🅒' ? (
                          <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-black text-xs tracking-tighter">CC</span>
                        ) : icon === '📄' ? (
                          <span className="text-xl">📄</span>
                        ) : icon === '🚫💲' ? (
                          <span className="relative flex items-center justify-center font-black text-base text-rose-600">
                            <span className="w-7 h-7 rounded-full border-2 border-rose-500 flex items-center justify-center text-xs font-black relative">
                              <span className="text-slate-900 font-bold">$</span>
                              <span className="absolute w-full h-[2px] bg-rose-500 rotate-45" />
                            </span>
                          </span>
                        ) : (
                          icon
                        )}
                      </div>
                    );
                  } else {
                    conceptVisual = (
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center font-black text-lg shrink-0 shadow-2xs ${themeStyle.iconBg}`}>
                        📌
                      </div>
                    );
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !isMatched && handleMatchLeft(i)}
                      disabled={isMatched}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-3.5 shadow-2xs ${
                        isMatched
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80 cursor-default'
                          : isSel
                          ? 'border-indigo-600 bg-indigo-100/90 text-indigo-950 shadow-md ring-2 ring-indigo-300'
                          : `${themeStyle.border} ${themeStyle.bg} ${themeStyle.text}`
                      }`}
                    >
                      {conceptVisual}
                      <span className="flex-1 font-extrabold text-sm sm:text-base leading-snug">{leftText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column - RESPOSTAS */}
              <div className="space-y-3">
                <div className="bg-[#102a43] text-white font-black text-xs sm:text-sm uppercase tracking-widest py-2.5 px-4 rounded-xl text-center shadow-xs">
                  {language === 'pt' ? 'RESPOSTAS' : 'ANSWERS'}
                </div>
                {rightOrder.map((ri) => {
                  const p = data.pairs[ri];
                  const isMatched = matched.includes(ri);
                  const isShake = shakeIdx === ri;

                  // Give answers a clean pastel card style
                  const pastelColors = [
                    'bg-amber-50/80 border-amber-200 hover:bg-amber-100/80 text-amber-950',
                    'bg-emerald-50/80 border-emerald-200 hover:bg-emerald-100/80 text-emerald-950',
                    'bg-sky-50/80 border-sky-200 hover:bg-sky-100/80 text-sky-950',
                    'bg-rose-50/80 border-rose-200 hover:bg-rose-100/80 text-rose-950',
                  ];
                  const cardStyle = pastelColors[ri % pastelColors.length];

                  return (
                    <button
                      key={ri}
                      onClick={() => !isMatched && handleMatchRight(ri)}
                      disabled={isMatched}
                      className={`w-full min-h-[64px] text-left p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center ${
                        isMatched
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 opacity-80 cursor-default'
                          : isShake
                          ? 'border-rose-500 bg-rose-100 text-rose-900 animate-bounce'
                          : cardStyle
                      }`}
                    >
                      <span className="leading-relaxed font-semibold">{p.right}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4. ORDER SEQUENCE */}
        {isOrder && !completed && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'pt'
                  ? `Passos ordenados (${orderChosen.length} / ${data.items.length})`
                  : `Ordered steps (${orderChosen.length} / ${data.items.length})`}
              </h4>
              <AudioSpeakButton
                id="order-instructions"
                text={language === 'pt'
                  ? 'Clica nos passos disponíveis pela ordem cronológica correta para completar a sequência.'
                  : 'Click the available steps in correct order to complete the sequence.'}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>
            <div className="space-y-2.5">
              <div className="space-y-2 min-h-[90px] p-3 rounded-2xl bg-slate-50 border border-slate-200">
                {orderChosen.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">
                    {language === 'pt' ? 'Clica nos passos em baixo pela ordem correta...' : 'Click the steps below in the correct order...'}
                  </p>
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {language === 'pt' ? 'Passos disponíveis' : 'Available steps'}
                </h4>
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
                    {language === 'pt' ? 'A ordem selecionada não está correta. Tenta novamente!' : 'The selected order is not correct. Try again!'}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleOrderCheck}
                    className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    {language === 'pt' ? 'Verificar Ordem' : 'Check Order'}
                  </button>
                  <button
                    onClick={handleOrderReset}
                    className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{language === 'pt' ? 'Reiniciar' : 'Reset'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. CLASSIFY / RELIABLE SOURCES */}
        {isClassify && !completed && (() => {
          const categories = data.categories || [];
          const items = data.items || [];

          const handleClassify = (itemIdx: number, categoryId: string) => {
            const nextMap = { ...classifiedMap, [itemIdx]: categoryId };
            setClassifiedMap(nextMap);
            setSelectedClassifyItem(null);

            if (Object.keys(nextMap).length === items.length) {
              let correct = 0;
              items.forEach((it: any, idx: number) => {
                if (nextMap[idx] === it.categoryId) correct++;
              });
              const pct = Math.round((correct / items.length) * 100);
              setCompleted(true);
              onFinish(pct, 100, pct);
            }
          };

          return (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {language === 'pt'
                  ? 'Clica num elemento para o selecionar e depois clica na categoria onde o queres colocar.'
                  : 'Click an item to select it, then click the target category box.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat: any) => {
                  const catItems = items.filter((_: any, idx: number) => classifiedMap[idx] === cat.id);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => selectedClassifyItem !== null && handleClassify(selectedClassifyItem, cat.id)}
                      className={`p-4 rounded-2xl border-2 transition-all space-y-3 min-h-[160px] ${
                        selectedClassifyItem !== null
                          ? 'border-indigo-500 bg-indigo-50/60 cursor-pointer hover:border-indigo-600 shadow-sm ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <h4 className="font-extrabold text-sm sm:text-base text-indigo-950 flex items-center justify-between">
                        <span>{cat.label}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                          {catItems.length}
                        </span>
                      </h4>

                      <div className="space-y-2">
                        {catItems.map((it: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs"
                          >
                            {it.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Items Pool */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {language === 'pt' ? 'Elementos para classificar' : 'Items to classify'}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {items.map((it: any, idx: number) => {
                    if (classifiedMap[idx] !== undefined) return null;
                    const isSelected = selectedClassifyItem === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedClassifyItem(isSelected ? null : idx)}
                        className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer text-left shadow-2xs ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                            : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-800'
                        }`}
                      >
                        {it.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* 5. PASSWORD BUILDER INTERACTIVE GAME */}
        {(type === 'password_builder' || type === 'builder') && !completed && (
          <div className="space-y-6">
            {/* Pedagogical Note / Multiple Answers Banner */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-xs text-indigo-950 flex items-start justify-between gap-2.5 shadow-2xs">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-indigo-900 mb-0.5">
                    {language === 'pt' ? 'Múltiplas Soluções Possíveis!' : 'Multiple Valid Solutions!'}
                  </p>
                  <p className="text-indigo-800 leading-relaxed text-[11.5px]">
                    {language === 'pt'
                      ? 'Não existe uma resposta única pré-definida. Podes construir qualquer combinação com as opções abaixo — desde que cumpra todas as regras de segurança!'
                      : 'There is no single predefined answer. You can create any combination with the options below as long as it satisfies all security rules!'}
                  </p>
                </div>
              </div>
              <AudioSpeakButton
                id="builder-guidelines"
                text={language === 'pt'
                  ? 'Constrói uma palavra-passe com pelo menos 8 carateres, misturando letras maiúsculas, minúsculas, números e símbolos sem dados pessoais!'
                  : 'Build a password with at least 8 characters, combining uppercase, lowercase, numbers and symbols.'}
                language={language}
                variant="icon"
                size="xs"
              />
            </div>

            {/* Password Display / Workspace */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                  {language === 'pt' ? 'A tua palavra-passe em construção:' : 'Your password in construction:'}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {builderPassword.length} {language === 'pt' ? 'carateres' : 'characters'}
                </span>
              </div>

              {/* Password Text Container */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between min-h-[56px] gap-2">
                <div className="font-mono text-lg sm:text-2xl font-black tracking-widest text-emerald-400 break-all select-all">
                  {builderPassword || (
                    <span className="text-slate-600 text-sm font-sans font-normal tracking-normal italic">
                      {language === 'pt' ? 'Clica nos carateres abaixo para adicionar...' : 'Click the characters below to add...'}
                    </span>
                  )}
                </div>
                {builderPassword.length > 0 && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleBackspace}
                      title={language === 'pt' ? 'Apagar último caracter' : 'Delete last character'}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                    >
                      <Delete className="w-4 h-4" />
                      <span className="hidden sm:inline">{language === 'pt' ? 'Apagar' : 'Delete'}</span>
                    </button>
                    <button
                      onClick={handleClearBuilder}
                      title={language === 'pt' ? 'Limpar tudo' : 'Clear all'}
                      className="px-2.5 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/50 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {language === 'pt' ? 'Limpar' : 'Clear'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Character Selection Trays */}
            <div className="space-y-4">
              {/* Lowercase */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    🔤 {language === 'pt' ? 'Letras minúsculas' : 'Lowercase letters'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">a - h</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((char) => (
                    <button
                      key={`lower-${char}`}
                      onClick={() => handleAppendChar(char)}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-500 font-mono font-bold text-base sm:text-lg text-slate-800 hover:text-indigo-600 shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              {/* Uppercase */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    🔠 {language === 'pt' ? 'Letras maiúsculas' : 'Uppercase letters'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">A - H</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((char) => (
                    <button
                      key={`upper-${char}`}
                      onClick={() => handleAppendChar(char)}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-500 font-mono font-black text-base sm:text-lg text-indigo-950 hover:text-indigo-600 shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              {/* Numbers */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    🔢 {language === 'pt' ? 'Números' : 'Numbers'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">1 - 8</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8'].map((char) => (
                    <button
                      key={`num-${char}`}
                      onClick={() => handleAppendChar(char)}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-500 font-mono font-black text-base sm:text-lg text-emerald-900 hover:text-emerald-700 shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symbols */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    ⚡ {language === 'pt' ? 'Símbolos' : 'Symbols'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">@ # $ % & * !</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['@', '#', '$', '%', '&', '*', '!'].map((char) => (
                    <button
                      key={`sym-${char}`}
                      onClick={() => handleAppendChar(char)}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white hover:bg-purple-50 border border-slate-300 hover:border-purple-500 font-mono font-black text-base sm:text-lg text-purple-900 hover:text-purple-700 shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error banner on failed submission without giving away specific checklist answers */}
            {builderSubmitted && !builderRules.allValid && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 font-bold text-center animate-in fade-in">
                {language === 'pt'
                  ? '✗ A palavra-passe construída ainda não cumpre todos os critérios de uma palavra-passe segura. Lembra-te das boas práticas de segurança e tenta novamente!'
                  : '✗ The created password does not meet all security criteria yet. Remember the strong password best practices and try again!'}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                onClick={handleBuilderSubmit}
                disabled={builderPassword.length === 0}
                className={`w-full py-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  builderPassword.length > 0
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg active:scale-[0.99]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <KeyRound className="w-5 h-5" />
                <span>{language === 'pt' ? 'Submeter e Validar Palavra-passe' : 'Submit and Validate Password'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 6. POSTURE SIMULATOR */}
        {type === 'posture_simulator' && (
          <div className="pt-2">
            <PostureCorrectionSimulator
              language={language}
              onComplete={() => {
                setCompleted(true);
                onFinish(100, 100, 100);
              }}
            />
          </div>
        )}

        {/* Completed state message */}
        {completed && (
          <div className="p-8 text-center bg-emerald-50 rounded-3xl border-2 border-emerald-200 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
              🎉
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
              {language === 'pt' ? 'Desafio Concluído com Sucesso!' : 'Challenge Successfully Completed!'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800">
              {language === 'pt' ? (
                <>Parabéns! Ganhaste <strong>+{gameData.xp} XP</strong> e avançaste no teu progresso.</>
              ) : (
                <>Congratulations! You earned <strong>+{gameData.xp} XP</strong> and advanced your progress.</>
              )}
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
