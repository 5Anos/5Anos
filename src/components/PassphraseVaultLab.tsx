import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Shield,
  ShieldAlert,
  Sparkles,
  Key,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Info,
  Clock,
  Volume2
} from 'lucide-react';
import { Language, User } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { speechService } from '../utils/speech';
import { ticoFeedback } from '../utils/ticoEvents';

interface PassphraseVaultLabProps {
  language?: Language;
  currentUser?: User | null;
  onFinish?: (pointsEarned: number) => void;
}

const WORD_BANK = [
  { word: 'Sol', emoji: '☀️' },
  { word: 'Gato', emoji: '🐱' },
  { word: 'Azul', emoji: '💙' },
  { word: 'Livro', emoji: '📚' },
  { word: 'Nuvem', emoji: '☁️' },
  { word: 'Robot', emoji: '🤖' },
  { word: 'Estrela', emoji: '⭐' },
  { word: 'Laranja', emoji: '🍊' },
  { word: 'Foguetão', emoji: '🚀' },
  { word: 'Castelo', emoji: '🏰' },
];

const SEPARATORS = ['!', '#', '@', '$', '*', '-', '_'];

export const PassphraseVaultLab: React.FC<PassphraseVaultLabProps> = ({
  language = 'pt',
  currentUser,
  onFinish,
}) => {
  const [selectedWords, setSelectedWords] = useState<string[]>(['Sol', 'Gato', 'Azul']);
  const [separator, setSeparator] = useState<string>('!');
  const [addNumber, setAddNumber] = useState<boolean>(true);
  const [numberSuffix, setNumberSuffix] = useState<string>('89');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [testedWeakPassword, setTestedWeakPassword] = useState<string>('12052014');

  const generatedPassphrase = `${selectedWords.join(separator)}${addNumber ? numberSuffix : ''}`;

  const handleToggleWord = (w: string) => {
    soundEffects.playClick();
    if (selectedWords.includes(w)) {
      if (selectedWords.length > 2) {
        setSelectedWords(selectedWords.filter((item) => item !== w));
      }
    } else {
      if (selectedWords.length < 5) {
        setSelectedWords([...selectedWords, w]);
      }
    }
  };

  const handleUnlockVault = () => {
    if (selectedWords.length >= 3 && separator) {
      soundEffects.playVictory();
      setIsUnlocked(true);
      ticoFeedback.triggerQuizPerfect();
      if (onFinish) {
        onFinish(50);
      }
    } else {
      soundEffects.playClick();
      ticoFeedback.triggerWrong(
        language === 'pt'
          ? 'Escolhe pelo menos 3 palavras e um símbolo para trancar o cofre com segurança total!'
          : 'Choose at least 3 words and a symbol for ultimate vault security!'
      );
    }
  };

  return (
    <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-2xl border-2 border-indigo-400/40 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl shadow-inner">
            🔐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
                {language === 'pt' ? 'Laboratório do Cofre' : 'Vault Lab'}
              </span>
              <span className="text-xs text-amber-300 font-bold">+50 XP</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              {language === 'pt' ? 'O Cofre Seguro & A Técnica da Passphrase' : 'The Secure Vault & Passphrase Method'}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            speechService.speak(
              'passphrase-intro',
              language === 'pt'
                ? 'Aprende a técnica da frase-passe. Juntar 3 ou 4 palavras simples e um símbolo é mais fácil de memorizar e leva milhões de anos a ser quebrado por piratas informáticos.'
                : 'Learn the passphrase method. Combining 3 or 4 simple words and a symbol is easy to remember and takes millions of years to crack.',
              language
            )
          }
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span>{language === 'pt' ? 'Ouvir Guia' : 'Listen Guide'}</span>
        </button>
      </div>

      {/* Comparison: Weak vs Passphrase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Palavra-passe Fraca Comum */}
        <div className="p-5 rounded-3xl bg-rose-950/40 border border-rose-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40">
              ❌ {language === 'pt' ? 'Fraca (O que NÃO fazer)' : 'Weak (Avoid this)'}
            </span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <p className="text-xs text-slate-300">
              {language === 'pt' ? 'Data de nascimento ou nome do cão:' : 'Birthday or pet name:'}
            </p>
            <div className="mt-1 font-mono font-black text-lg text-rose-300 bg-black/40 px-3 py-1.5 rounded-xl border border-rose-500/30 inline-block">
              {testedWeakPassword}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-900/40 border border-rose-700/50 text-xs text-rose-200 space-y-1">
            <p className="font-extrabold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>{language === 'pt' ? 'Tempo de quebra: 2 SEGUNDOS!' : 'Crack time: 2 SECONDS!'}</span>
            </p>
            <p className="text-[11px] opacity-90">
              {language === 'pt'
                ? 'Robôs de hackers tentam todas as datas de calendário em milésimos de segundo.'
                : 'Hacker bots try all calendar dates in milliseconds.'}
            </p>
          </div>
        </div>

        {/* Card 2: Passphrase Robusta */}
        <div className="p-5 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
              ✅ {language === 'pt' ? 'Super Segura (Passphrase)' : 'Super Secure (Passphrase)'}
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-300">
              {language === 'pt' ? 'A tua Passphrase construída:' : 'Your built Passphrase:'}
            </p>
            <div className="mt-1 font-mono font-black text-lg text-emerald-300 bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 inline-block tracking-wide">
              {generatedPassphrase}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-xs text-emerald-200 space-y-1">
            <p className="font-extrabold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'pt' ? 'Tempo de quebra: +450 MILHÕES DE ANOS!' : 'Crack time: +450 MILLION YEARS!'}</span>
            </p>
            <p className="text-[11px] opacity-90">
              {language === 'pt'
                ? 'Fácil de memorizar para crianças, mas impossível de adivinhar por supercomputadores!'
                : 'Easy for kids to memorize, but impossible for supercomputers to guess!'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Passphrase Builder */}
      <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 space-y-5">
        <div>
          <h3 className="text-sm font-black uppercase text-amber-300 tracking-wider">
            {language === 'pt' ? '1. Escolhe 3 ou 4 Palavras Secretas:' : '1. Choose 3 or 4 Secret Words:'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'pt' ? 'Clica para adicionar ou retirar palavras da tua frase-chave:' : 'Click to add or remove words:'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {WORD_BANK.map((item) => {
            const isSelected = selectedWords.includes(item.word);
            return (
              <button
                key={item.word}
                type="button"
                onClick={() => handleToggleWord(item.word)}
                className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.word}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        {/* Separator & Suffix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
          <div>
            <p className="text-xs font-bold text-slate-300 mb-2">
              {language === 'pt' ? '2. Escolhe um Símbolo Mágico:' : '2. Choose a Special Symbol:'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SEPARATORS.map((sep) => (
                <button
                  key={sep}
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setSeparator(sep);
                  }}
                  className={`w-9 h-9 rounded-xl font-mono text-sm font-black flex items-center justify-center border transition-all cursor-pointer ${
                    separator === sep
                      ? 'bg-indigo-500 text-white border-indigo-300 shadow-md scale-110'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/15'
                  }`}
                >
                  {sep}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-300 mb-2">
              {language === 'pt' ? '3. Adicionar Número Fácil (ex: 89):' : '3. Add an easy number (e.g. 89):'}
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                maxLength={4}
                value={numberSuffix}
                onChange={(e) => setNumberSuffix(e.target.value.replace(/\D/g, ''))}
                className="w-24 px-3 py-1.5 rounded-xl bg-black/40 border border-white/20 text-white font-mono font-bold text-sm text-center focus:outline-hidden focus:border-amber-400"
              />
              <span className="text-xs text-slate-400">
                {language === 'pt' ? '(Evita o teu ano de nascimento!)' : '(Never use your birth year!)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The Vault Screen */}
      <div className="p-6 rounded-3xl bg-black/40 border-2 border-amber-400/40 text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-2xl transition-all duration-500 ${
              isUnlocked
                ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 scale-110'
                : 'bg-amber-500/20 text-amber-400 border-2 border-amber-400/60'
            }`}
          >
            {isUnlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-black text-white">
            {isUnlocked
              ? (language === 'pt' ? '🎉 COFRE DESBLOQUEADO COM SUCESSO!' : '🎉 VAULT UNLOCKED SUCCESSFULLY!')
              : (language === 'pt' ? 'Cofre Trancado com Escudo Criptográfico' : 'Vault Locked with Cryptographic Shield')}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
            {isUnlocked
              ? (language === 'pt'
                ? `Excelente! A tua Passphrase «${generatedPassphrase}» tem entropia militar e protege todos os teus dados na perfeição!`
                : `Awesome! Your Passphrase "${generatedPassphrase}" has military-grade strength!`)
              : (language === 'pt'
                ? 'Testa a tua Passphrase para verificar a segurança do cofre e ganhar os teus pontos de cibersegurança!'
                : 'Test your Passphrase to verify the vault security and earn your cybersecurity XP!')}
          </p>
        </div>

        <div className="pt-2">
          {!isUnlocked ? (
            <button
              type="button"
              onClick={handleUnlockVault}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-black text-sm flex items-center gap-2 mx-auto cursor-pointer shadow-xl shadow-amber-400/20 hover:scale-105 transition-all"
            >
              <Key className="w-4 h-4" />
              <span>{language === 'pt' ? 'Trancar & Testar Cofre' : 'Lock & Test Vault'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black">
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'pt' ? 'Concluído com Honra! +50 XP Adicionados' : 'Completed! +50 XP Added'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
