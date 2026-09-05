import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Check, X, Sparkles, RefreshCw, KeyRound, AlertCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface PasswordBuilderGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const PasswordBuilderGame: React.FC<PasswordBuilderGameProps> = ({ language, onBack, onFinish }) => {
  const [mockPassword, setMockPassword] = useState('Gato#Verde_2026!');
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const t = translations[language];

  // Analysis of mock password
  const hasMinLength = mockPassword.length >= 10;
  const hasUppercase = /[A-Z]/.test(mockPassword);
  const hasLowercase = /[a-z]/.test(mockPassword);
  const hasNumbers = /[0-9]/.test(mockPassword);
  const hasSymbols = /[^A-Za-z0-9]/.test(mockPassword);

  const criteriaCount = [hasMinLength, hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;

  let strengthLabel = { pt: 'Precisa de melhorar', en: 'Needs improvement' };
  let strengthColor = 'bg-amber-400';
  let strengthScore = 30;

  if (criteriaCount === 5) {
    strengthLabel = { pt: 'Muito boa', en: 'Very good' };
    strengthColor = 'bg-emerald-500';
    strengthScore = 100;
  } else if (criteriaCount >= 3) {
    strengthLabel = { pt: 'Boa', en: 'Good' };
    strengthColor = 'bg-blue-500';
    strengthScore = 70;
  } else {
    strengthLabel = { pt: 'Precisa de melhorar', en: 'Needs improvement' };
    strengthColor = 'bg-amber-400';
    strengthScore = 35;
  }

  // Pre-configured training samples for student to test (strictly avoiding personal info, clubs or birth years)
  const testSamples = [
    { label: '123456', hint: { pt: 'Demasiado curta, previsível e fácil de adivinhar', en: 'Too short, predictable, and easy to guess' } },
    { label: 'qwerty', hint: { pt: 'Sequência de teclas óbvia no teclado', en: 'Obvious keyboard row sequence' } },
    { label: 'castelo99', hint: { pt: 'Faltam símbolos, maiúsculas e maior comprimento', en: 'Lacks symbols, uppercase letters, and length' } },
    { label: 'Sol_Amarelo#58', hint: { pt: 'Frase memorável e variada, sem dados pessoais óbvios', en: 'Memorable varied phrase without obvious personal details' } },
  ];

  const handleFinish = () => {
    onFinish(10, 10, 100);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 2' : 'Challenge 2'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {language === 'pt' ? '🔐 O Laboratório da Palavra-passe' : '🔐 The Password Security Lab'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {language === 'pt'
            ? 'Experimenta combinações seguras e descobre como um computador analisa a robustez.'
            : 'Experiment with secure combinations and discover how computers evaluate password strength.'}
        </p>
      </div>

      {/* Safety pedagogical disclaimer */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">
              {language === 'pt' ? 'Nota Educativa (5.º Ano): ' : 'Educational Note (Grade 5): '}
            </span>
            <span>
              {language === 'pt'
                ? 'A avaliação deste jogo é uma simplificação educativa. Nenhuma fórmula garante que uma palavra-passe seja inquebrável ou 100% segura. Uma boa palavra-passe deve ser longa, difícil de adivinhar e nunca deve usar informação pessoal óbvia (como o teu nome, clube desportivo ou ano de nascimento).'
                : 'This evaluation is an educational simplification. No automated check guarantees a password is 100% unbreakable. A good password should be long, hard to guess, and never use obvious personal details (such as your name, sports club, or birth year).'}
            </span>
          </div>
        </div>
        <div className="text-[11px] text-amber-800/90 pl-6">
          <strong>{language === 'pt' ? 'Regra de Ouro: ' : 'Golden Rule: '}</strong>
          {language === 'pt'
            ? 'Nunca introduzas aqui nem em computadores públicos a tua palavra-passe real!'
            : 'Never enter your real personal password here or on public computers!'}
        </div>
      </div>

      {/* Main Interactive Box */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            {language === 'pt' ? 'Escreve ou testa uma palavra-passe fictícia:' : 'Type or test an invented mock password:'}
          </label>
          <div className="relative">
            <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={mockPassword}
              onChange={(e) => setMockPassword(e.target.value)}
              placeholder="Ex: Frase!Segura_99"
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 text-base font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
            <span className="text-slate-700">{language === 'pt' ? 'Nível de Segurança:' : 'Security Strength:'}</span>
            <span className="text-slate-900 font-extrabold">{strengthLabel[language]}</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full ${strengthColor} transition-all duration-300 rounded-full`}
              style={{ width: `${strengthScore}%` }}
            />
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
            hasMinLength ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            {hasMinLength ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
            <span>{language === 'pt' ? 'Mínimo 10 caracteres' : 'Minimum 10 characters'}</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
            hasUppercase ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            {hasUppercase ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
            <span>{language === 'pt' ? 'Letras maiúsculas (A-Z)' : 'Uppercase letters (A-Z)'}</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
            hasLowercase ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            {hasLowercase ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
            <span>{language === 'pt' ? 'Letras minúsculas (a-z)' : 'Lowercase letters (a-z)'}</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
            hasNumbers ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            {hasNumbers ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
            <span>{language === 'pt' ? 'Números (0-9)' : 'Numbers (0-9)'}</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold sm:col-span-2 ${
            hasSymbols ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            {hasSymbols ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
            <span>{language === 'pt' ? 'Símbolos especiais (! @ # $ % & * _)' : 'Special symbols (! @ # $ % & * _)'}</span>
          </div>
        </div>

        {/* Quick Test Samples */}
        <div className="pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            {language === 'pt' ? 'Clica para carregar exemplos e analisar:' : 'Click to load examples and analyze:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {testSamples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMockPassword(s.label)}
                className="text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-xs transition-colors cursor-pointer"
              >
                <span className="font-mono font-bold text-slate-900 block">{s.label}</span>
                <span className="text-[11px] text-slate-500">{s.hint[language]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Completion button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {criteriaCount === 5
              ? (language === 'pt' ? '🎉 Muito bem! Esta combinação cumpre os 5 critérios educativos.' : '🎉 Well done! This combination meets all 5 educational criteria.')
              : (language === 'pt' ? 'Dica: junta 5 critérios educativos para explorar a classificação máxima.' : 'Tip: combine 5 educational criteria to explore the highest rating.')}
          </span>

          <button
            onClick={handleFinish}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {language === 'pt' ? 'Completar Desafio (+15 pts)' : 'Complete Challenge (+15 pts)'}
          </button>
        </div>
      </div>
    </div>
  );
};
