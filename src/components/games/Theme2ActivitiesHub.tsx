import React, { useState } from 'react';
import {
  Search,
  Globe,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shield,
  Leaf,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';
import DigitalDetectivesGame from './DigitalDetectivesGame';
import PlanetDigitalMissionGame from './PlanetDigitalMissionGame';

interface Theme2ActivitiesHubProps {
  language: 'pt' | 'en';
  onBack: () => void;
  initialActivity?: 'detectives' | 'planet' | 'menu';
  onFinishActivity?: (
    activityId: string,
    score: number,
    maxScore: number,
    percentage: number
  ) => void;
}

export const Theme2ActivitiesHub: React.FC<Theme2ActivitiesHubProps> = ({
  language,
  onBack,
  initialActivity = 'menu',
  onFinishActivity,
}) => {
  const [currentView, setCurrentView] = useState<'menu' | 'detectives' | 'planet'>(
    initialActivity
  );

  if (currentView === 'detectives') {
    return (
      <DigitalDetectivesGame
        language={language}
        onBack={() => setCurrentView('menu')}
        onFinish={(score, maxScore, percentage) => {
          if (onFinishActivity) {
            onFinishActivity('desafio-detetives-digitais', score, maxScore, percentage);
          }
        }}
      />
    );
  }

  if (currentView === 'planet') {
    return (
      <PlanetDigitalMissionGame
        language={language}
        onBack={() => setCurrentView('menu')}
        onFinish={(score, maxScore, percentage) => {
          if (onFinishActivity) {
            onFinishActivity('desafio-missao-planeta-digital', score, maxScore, percentage);
          }
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'pt' ? 'Voltar ao Tema 2' : 'Back to Theme 2'}
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-black">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          {language === 'pt' ? 'Jogos Educativos • 5.º Ano' : 'Educational Games • 5th Grade'}
        </span>
      </div>

      {/* Hero Header */}
      <div className="text-center mb-8">
        <span className="px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs uppercase tracking-wider inline-block mb-3">
          {language === 'pt' ? 'Tema 2 — TIC na Sociedade' : 'Theme 2 — ICT in Society'}
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
          {language === 'pt'
            ? 'Laboratório Interativo de Jogos'
            : 'Interactive Game Laboratory'}
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-medium">
          {language === 'pt'
            ? 'Escolhe um dos desafios interativos abaixo para aprenderes a fazer escolhas inteligentes no mundo digital e a proteger o nosso planeta!'
            : 'Choose one of the interactive challenges below to learn smart digital choices and protect our planet!'}
        </p>
      </div>

      {/* Two Big Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* CARD 1: DETETIVES DIGITAIS */}
        <div
          onClick={() => setCurrentView('detectives')}
          className="group bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-100 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden border-2 border-indigo-400"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                {language === 'pt' ? 'Conteúdo 4' : 'Content 4'}
              </span>
              <span className="text-3xl">🕵️</span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl mb-4 border border-white/30 shadow-inner group-hover:rotate-6 transition-transform">
              <Search className="w-7 h-7 text-amber-300" />
            </div>

            <h2 className="text-2xl font-black mb-2 tracking-tight">
              {language === 'pt' ? '🔎 Detetives Digitais' : '🔎 Digital Detectives'}
            </h2>
            <p className="text-indigo-100 text-sm md:text-base font-medium mb-6 leading-relaxed">
              {language === 'pt'
                ? 'Descobre como usar a tecnologia de forma inteligente, resolver 6 casos misteriosos e evitar armadilhas digitais.'
                : 'Discover how to use technology wisely, solve 6 mysterious cases, and avoid digital traps.'}
            </p>

            {/* Bullets */}
            <div className="space-y-2 mb-6 text-xs md:text-sm text-indigo-50 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{language === 'pt' ? 'Vantagens e aprendizagem' : 'Advantages & learning'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{language === 'pt' ? 'Equilíbrio de ecrã e pausas' : 'Screen balance & breaks'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{language === 'pt' ? 'Verificação de notícias e respeito' : 'Fact-checking & respect'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-indigo-400/40 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> ~6 min • 60 pts
            </span>
            <span className="px-4 py-2 rounded-xl bg-amber-400 text-slate-900 font-black text-sm flex items-center gap-2 group-hover:bg-amber-300 transition-colors shadow">
              <span>{language === 'pt' ? 'Jogar Agora' : 'Play Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* CARD 2: MISSÃO PLANETA DIGITAL */}
        <div
          onClick={() => setCurrentView('planet')}
          className="group bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-emerald-100 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden border-2 border-emerald-400"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                {language === 'pt' ? 'Conteúdo 5' : 'Content 5'}
              </span>
              <span className="text-3xl">🌍</span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl mb-4 border border-white/30 shadow-inner group-hover:rotate-6 transition-transform">
              <Globe className="w-7 h-7 text-emerald-200" />
            </div>

            <h2 className="text-2xl font-black mb-2 tracking-tight">
              {language === 'pt' ? '🌍 Missão Planeta Digital' : '🌍 Planet Digital Mission'}
            </h2>
            <p className="text-emerald-100 text-sm md:text-base font-medium mb-6 leading-relaxed">
              {language === 'pt'
                ? 'Aprende a cuidar dos equipamentos e do planeta: reparar, reutilizar, reciclar no Ponto Eletrão e cultivar uma escola verde!'
                : 'Learn to care for equipment and the planet: repair, reuse, recycle at e-waste bins, and cultivate a green school!'}
            </p>

            {/* Bullets */}
            <div className="space-y-2 mb-6 text-xs md:text-sm text-emerald-50 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>{language === 'pt' ? 'Triagem de 8 aparelhos eletrónicos' : 'Sorting 8 electronic devices'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>{language === 'pt' ? 'O grande dilema ecológico da escola' : 'The big school eco-dilemma'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>{language === 'pt' ? 'Jardim virtual e 100 Pontos Planeta' : 'Virtual garden & 100 Planet pts'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-400/40 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> ~8 min • 100 pts
            </span>
            <span className="px-4 py-2 rounded-xl bg-white text-emerald-950 font-black text-sm flex items-center gap-2 group-hover:bg-emerald-50 transition-colors shadow">
              <span>{language === 'pt' ? 'Jogar Agora' : 'Play Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Helpful tip box */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 md:p-5 flex items-center gap-3 text-slate-700 text-sm font-medium">
        <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <p>
          {language === 'pt'
            ? 'Podes jogar cada atividade individualmente quantas vezes quiseres. Os teus pontos e distintivos ficam guardados no teu progresso!'
            : 'You can play each activity individually as many times as you like. Your points and badges are saved in your progress!'}
        </p>
      </div>
    </div>
  );
};
export default Theme2ActivitiesHub;
