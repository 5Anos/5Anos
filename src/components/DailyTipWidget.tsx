import React, { useState, useEffect } from 'react';
import { Sparkles, X, Lightbulb, CheckCircle2, Award, ChevronRight, BookOpen, HeartHandshake } from 'lucide-react';
import { User, Language, UserAchievement } from '../types';
import { getDailyTicFact, getTodayDateString, DailyTicFact } from '../data/dailyFacts';
import { api } from '../services/api';

interface DailyTipWidgetProps {
  user: User | null;
  language: Language;
  onPointsAwarded?: (user: User | null, points: number, achievements: UserAchievement[]) => void;
  onOpenAuth?: () => void;
}

export const DailyTipWidget: React.FC<DailyTipWidgetProps> = ({
  user,
  language,
  onPointsAwarded,
  onOpenAuth,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fact, setFact] = useState<DailyTicFact>(getDailyTicFact());
  const [claimedToday, setClaimedToday] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [justClaimed, setJustClaimed] = useState(false);

  const todayKey = `tic_daily_fact_${getTodayDateString()}_${user?.id || 'guest'}`;

  useEffect(() => {
    setFact(getDailyTicFact());
    const isClaimed = localStorage.getItem(todayKey) === 'true';
    setClaimedToday(isClaimed);
  }, [todayKey]);

  const handleClaimPoints = async () => {
    if (claimedToday || claiming) return;

    setClaiming(true);
    try {
      if (user) {
        const res = await api.recordDailyTipBonus(fact.title[language], 15);
        if (res.success) {
          localStorage.setItem(todayKey, 'true');
          setClaimedToday(true);
          setJustClaimed(true);
          if (onPointsAwarded) {
            onPointsAwarded(res.user, res.userPoints, res.achievements);
          }
        }
      } else {
        // Guest mode
        localStorage.setItem(todayKey, 'true');
        setClaimedToday(true);
        setJustClaimed(true);
        if (onPointsAwarded) {
          onPointsAwarded(null, 15, []);
        }
      }
    } catch (err) {
      console.error('Error claiming daily tip points:', err);
    } finally {
      setClaiming(false);
    }
  };

  return (
    <>
      {/* Dashboard Card Widget */}
      <div
        onClick={() => setModalOpen(true)}
        className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/50 p-5 sm:p-6 rounded-[2rem] border border-emerald-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-300"
      >
        {/* Glow effect on hover */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-300/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
            {fact.icon || '💡'}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                {language === 'pt' ? '💡 Sabias que...? • Dica do Dia' : '💡 Did You Know? • Daily Tip'}
              </span>

              {claimedToday ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {language === 'pt' ? '+15 pts' : '+15 pts'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full animate-bounce shadow-2xs">
                  🎁 {language === 'pt' ? '+15 Pontos' : '+15 Pts'}
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-extrabold text-emerald-950 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
              {fact.title[language]}
            </h4>

            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 group-hover:underline flex items-center gap-1">
                {claimedToday
                  ? language === 'pt'
                    ? 'Ler novamente a curiosidade'
                    : 'Read fun fact again'
                  : language === 'pt'
                  ? 'Clica para ler e ganhar pontos'
                  : 'Click to read & earn points'}
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>

              <span className="text-[10px] font-semibold text-emerald-700/80">
                {fact.category[language]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal with Full Fact & Points Claim */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-2xl font-bold border border-white/20 shadow-inner">
                  {fact.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-200">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {language === 'pt' ? 'Curiosidade Diária de TIC' : 'Daily ICT Trivia'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-white">
                      {fact.category[language]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mt-0.5 text-white">
                    {language === 'pt' ? '💡 Sabias que...?' : '💡 Did You Know...?'}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Fact Headline */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="text-base sm:text-lg font-black text-emerald-950 leading-tight">
                  {fact.title[language]}
                </h4>
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'pt' ? 'A História Real' : 'The Real Story'}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {fact.description[language]}
                </p>
              </div>

              {/* Why It Matters */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="text-base">🎯</span>
                  <span>{language === 'pt' ? 'Porque é importante nas aulas de TIC?' : 'Why is this important in ICT?'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {fact.whyItMatters[language]}
                </p>
              </div>

              {/* Fun Fact Extra */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
                  <span>✨</span>
                  <span>{language === 'pt' ? 'Curiosidade Extra:' : 'Extra Fun Fact:'}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium">
                  {fact.funFact[language]}
                </p>
              </div>

              {/* Reward Section / Claim Action */}
              <div className="pt-2">
                {!claimedToday ? (
                  <button
                    onClick={handleClaimPoints}
                    disabled={claiming}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Award className="w-5 h-5 text-amber-300" />
                    <span>
                      {claiming
                        ? language === 'pt'
                          ? 'A guardar pontos...'
                          : 'Saving points...'
                        : language === 'pt'
                        ? '🎉 Li a curiosidade! Ganhar +15 Pontos'
                        : '🎉 I read it! Earn +15 Points'}
                    </span>
                  </button>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-100/80 border border-emerald-300 flex items-center justify-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span>
                      {justClaimed
                        ? language === 'pt'
                          ? 'Parabéns! Ganhaste +15 Pontos hoje! 🌟'
                          : 'Congrats! You earned +15 Points today! 🌟'
                        : language === 'pt'
                        ? '✅ Já ganhaste os teus 15 pontos de hoje nesta curiosidade!'
                        : '✅ You have already claimed today’s 15 points!'}
                    </span>
                  </div>
                )}

                {!user && (
                  <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                    {language === 'pt'
                      ? 'Dica: Inicia sessão para guardar os teus pontos permanentemente na tua conta de turma!'
                      : 'Tip: Sign in to save your points permanently on your class profile!'}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">
                {language === 'pt' ? 'Nova curiosidade amanhã! ⏰' : 'New fact tomorrow! ⏰'}
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 rounded-xl font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {language === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
