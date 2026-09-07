import React, { useState } from 'react';
import { KeyRound, ShieldCheck, ShieldAlert, Sparkles, Wand2, Eye, EyeOff, Check, X, Copy, ArrowDown } from 'lucide-react';

export const PasswordStrengthTester: React.FC = () => {
  // Generator Inputs
  const [favoriteWord, setFavoriteWord] = useState('Robotica');
  const [favoriteNumber, setFavoriteNumber] = useState('2026');
  const [symbolChoice, setSymbolChoice] = useState('@');
  const [useUnderscore, setUseUnderscore] = useState(true);

  // Main test password state
  const [password, setPassword] = useState('R0b0t1ca@_2026');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  // Function to create password from student's inputs
  const handleGenerateFromInputs = () => {
    const word = favoriteWord.trim() || 'Estudo';
    const num = favoriteNumber.trim() || '5';
    const sym = symbolChoice || '@';
    const sep = useUnderscore ? '_' : '';

    // Transform word smartly (leetspeak: o -> 0, a -> 4 or keep cap)
    // E.g. Word with capitalized first letter, leet substitution, symbol, underscore and number
    let transformedWord = word.charAt(0).toUpperCase() + word.slice(1);
    
    // Create password variations
    const generated = `${transformedWord}${sym}${sep}${num}`;
    setPassword(generated);
  };

  // Quick preset suggestions
  const handleApplyPreset = (presetWord: string, presetNum: string, presetSym: string) => {
    setFavoriteWord(presetWord);
    setFavoriteNumber(presetNum);
    setSymbolChoice(presetSym);
    const sep = useUnderscore ? '_' : '';
    const transformedWord = presetWord.charAt(0).toUpperCase() + presetWord.slice(1);
    setPassword(`${transformedWord}${presetSym}${sep}${presetNum}`);
  };

  // Criteria calculations
  const hasLength = password.length >= 10;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[@_!#$%&*+?^~-]/.test(password);

  const criteriaCount = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  let strengthLabel = 'Muito Fraca';
  let strengthColor = 'bg-red-500';
  let crackTime = 'Menos de 1 segundo';
  let scorePercent = 20;

  if (password.length === 0) {
    strengthLabel = 'Escreve ou gera uma palavra-passe...';
    strengthColor = 'bg-slate-300';
    crackTime = '---';
    scorePercent = 0;
  } else if (password.toLowerCase().includes('123456') || password.toLowerCase().includes('password') || password.length < 6) {
    strengthLabel = 'Muito Fraca (Vulnerável)';
    strengthColor = 'bg-red-500';
    crackTime = 'Instantâneo (0.01 seg)';
    scorePercent = 15;
  } else if (criteriaCount <= 2) {
    strengthLabel = 'Fraca';
    strengthColor = 'bg-amber-500';
    crackTime = 'Alguns minutos a horas';
    scorePercent = 40;
  } else if (criteriaCount <= 4) {
    strengthLabel = 'Boa / Média';
    strengthColor = 'bg-blue-500';
    crackTime = 'Meses a anos';
    scorePercent = 75;
  } else {
    strengthLabel = 'Super Segura! 🛡️';
    strengthColor = 'bg-emerald-500';
    crackTime = 'Centenas de anos!';
    scorePercent = 100;
  }

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-gradient-to-b from-indigo-50/70 to-slate-50 rounded-2xl border-2 border-indigo-200 shadow-md p-3.5 sm:p-4 font-sans select-none space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-indigo-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-sm">
            <KeyRound className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-black text-indigo-950 uppercase tracking-wide">
            Cria e Testa Palavras
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-300">
          Laboratório Interativo
        </span>
      </div>

      {/* Step 1: Student Input Creator */}
      <div className="bg-white rounded-xl p-3 border border-indigo-100 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
            1. Insere as tuas pistas para criar uma passe segura:
          </span>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-0.5">
              Palavra ou Tema favorito:
            </label>
            <input
              type="text"
              value={favoriteWord}
              onChange={(e) => setFavoriteWord(e.target.value)}
              placeholder="ex: Astronauta"
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-0.5">
              Número favorito / Ano:
            </label>
            <input
              type="text"
              value={favoriteNumber}
              onChange={(e) => setFavoriteNumber(e.target.value)}
              placeholder="ex: 2026 ou 78"
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-0.5">
              Símbolo Especial:
            </label>
            <select
              value={symbolChoice}
              onChange={(e) => setSymbolChoice(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:border-indigo-500 focus:bg-white outline-none cursor-pointer"
            >
              <option value="@">@ (Arroba)</option>
              <option value="#"># (Cardeal)</option>
              <option value="$">$ (Cifrão)</option>
              <option value="&">& (E comercial)</option>
              <option value="!">! (Exclamação)</option>
              <option value="*">* (Asterisco)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-0.5">
              Separador (_):
            </label>
            <button
              type="button"
              onClick={() => setUseUnderscore(!useUnderscore)}
              className={`w-full px-2.5 py-1.5 rounded-lg font-bold text-[11px] border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                useUnderscore
                  ? 'bg-indigo-50 border-indigo-400 text-indigo-800'
                  : 'bg-slate-50 border-slate-300 text-slate-500'
              }`}
            >
              <span>{useUnderscore ? '✓ Inclui Underscore (_)' : 'Sem Underscore'}</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-slate-500 font-bold">Ideias rápidas:</span>
          <button
            onClick={() => handleApplyPreset('Estrela', '2026', '@')}
            className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 rounded-md font-medium cursor-pointer transition-colors"
          >
            ⭐ Estrela@_2026
          </button>
          <button
            onClick={() => handleApplyPreset('Galaxia', '88', '#')}
            className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 rounded-md font-medium cursor-pointer transition-colors"
          >
            🌌 Galaxia#_88
          </button>
          <button
            onClick={() => handleApplyPreset('Futebol', '10', '!')}
            className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 rounded-md font-medium cursor-pointer transition-colors"
          >
            ⚽ Futebol!_10
          </button>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateFromInputs}
          className="w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          Construir Palavra-Passe Segura com as minhas escolhas
        </button>
      </div>

      {/* Step 2: Live Password Tester & Score */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
            2. Resultado & Testador em Tempo Real (podes editar livremente):
          </span>
        </label>

        <div className="relative flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="A tua palavra-passe gerada..."
            className="w-full px-3 py-2 pr-20 text-sm font-mono font-bold bg-white rounded-xl border-2 border-indigo-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none text-indigo-950 shadow-inner transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              title={showPassword ? 'Ocultar' : 'Mostrar'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md cursor-pointer"
              title="Copiar"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Strength Bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">Nível de Segurança:</span>
          <span className="font-bold text-slate-900">{strengthLabel}</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strengthColor}`}
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>Tempo estimado p/ Hacker:</span>
          <span className="font-bold text-slate-800">{crackTime}</span>
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-medium text-slate-700 bg-white/90 p-2.5 rounded-xl border border-slate-200">
        <div className={`flex items-center gap-1.5 ${hasLength ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
          {hasLength ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
          <span>10+ Caracteres ({password.length})</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
          {hasUpper ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
          <span>Letra Maiúscula (A-Z)</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
          {hasLower ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
          <span>Letra Minúscula (a-z)</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
          {hasNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
          <span>Algarismos (0-9)</span>
        </div>
        <div className={`col-span-2 flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
          {hasSpecial ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
          <span>Símbolos (@, _, #, $, !, *)</span>
        </div>
      </div>
    </div>
  );
};
