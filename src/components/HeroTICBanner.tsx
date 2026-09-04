import React from 'react';
import { ArrowRight, Sparkles, Lightbulb } from 'lucide-react';
import { User, Language } from '../types';
import boyAvatarImg from '../assets/images/tic_boy_avatar_1788537870929.jpg';
import girlAvatarImg from '../assets/images/tic_girl_avatar_1788537889222.jpg';

interface HeroTICBannerProps {
  user: User | null;
  language: Language;
  onOpenAuth: () => void;
  onOpenLeaderboard?: () => void;
  onNavigateProgress?: () => void;
  onNavigateTheme?: (themeId: string, moduleId?: string, challengeId?: string) => void;
}

export const HeroTICBanner: React.FC<HeroTICBannerProps> = ({
  user,
  language,
  onOpenAuth,
  onOpenLeaderboard,
  onNavigateProgress,
  onNavigateTheme,
}) => {
  const isPt = language === 'pt';

  const scrollToThemes = () => {
    const el = document.getElementById('curriculum-themes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    if (!user) {
      onOpenAuth();
    } else {
      scrollToThemes();
    }
  };

  return (
    <div
      id="hero-tic-banner"
      className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-[#E0F2FE]/90 via-[#EFF6FF]/80 to-[#F8FAFC] border-2 border-[#BAE6FD]/60 shadow-xl overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 transition-all"
    >
      {/* Background Soft Glow & Cloud Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-indigo-200/35 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />

      {/* ================= TOP ROW ================= */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Main Titles & Introductory Statement */}
        <div className="lg:col-span-7 space-y-4">
          {/* Greeting Badge with Decorative Rays */}
          <div className="inline-flex items-center gap-2 px-1">
            <div className="relative inline-flex items-center gap-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans">
                Olá!
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl inline-block animate-bounce origin-bottom-right">
                👋
              </span>
              {/* Playful blue bursts around greeting */}
              <div className="absolute -top-3 -left-3 text-sky-500 text-sm font-black select-none">
                ✦
              </div>
              <div className="absolute -bottom-2 right-1 text-amber-500 text-xs font-black select-none">
                ✦
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {isPt ? 'Bem-vindo ao teu espaço de TIC' : 'Welcome to your ICT Space'}
          </h1>

          {/* Subtitle in Vibrant Violet */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#6366F1] tracking-tight">
            {isPt
              ? 'Tecnologias da Informação e Comunicação'
              : 'Information and Communication Technologies'}
          </h2>

          {/* Description */}
          <p className="text-slate-600 font-medium text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            {isPt
              ? 'Aqui vais aprender, experimentar e descobrir novas formas de utilizar a tecnologia de maneira segura, responsável, criativa e inteligente.'
              : 'Here you will learn, experiment, and discover new ways to use technology in a safe, responsible, creative, and intelligent way.'}
          </p>
        </div>

        {/* Right Col: 3D Boy Avatar + Speech Bubble + Hand note */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Golden Speech Bubble */}
          <div className="relative mb-2 self-end sm:mr-4 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-amber-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md border border-amber-300 flex items-center gap-1.5 transform hover:scale-105 transition-transform">
            <span>✨</span>
            <span>
              {isPt
                ? 'Aprender hoje, um mundo melhor amanhã!'
                : 'Learning today, a better world tomorrow!'}
            </span>
            {/* Speech bubble arrow point */}
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-300" />
          </div>

          {/* 3D Boy Avatar Card */}
          <div className="relative group">
            <div className="w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 rounded-[2.5rem] p-2 bg-gradient-to-tr from-indigo-300 via-sky-200 to-amber-100 shadow-xl border-4 border-white overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src={boyAvatarImg}
                alt="Estudante de TIC"
                className="w-full h-full object-cover rounded-[2rem]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Handwritten script with arrow */}
            <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-sky-200 shadow-md text-sky-700 font-extrabold text-[11px] sm:text-xs flex items-center gap-1.5 transform rotate-2">
              <span>{isPt ? 'Tecnologia para grandes ideias!' : 'Tech for big ideas!'}</span>
              <span className="text-sm font-black">↗</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MIDDLE TRANSITION STATEMENT ================= */}
      <div className="relative z-10 mt-8 mb-2 p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-indigo-100/90 shadow-2xs flex items-start sm:items-center gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <p className="text-slate-700 text-xs sm:text-sm md:text-base font-semibold leading-relaxed">
          {isPt
            ? 'Ao longo da tua aprendizagem, vais encontrar conteúdos, atividades, jogos, desafios e quizzes que te vão ajudar a compreender melhor o mundo digital e a desenvolver novas competências.'
            : 'Throughout your journey, you will find interactive modules, games, challenges, and quizzes that help you understand the digital world and develop real tech skills.'}
        </p>
      </div>

      {/* ================= BOTTOM ROW ================= */}
      <div className="relative z-10 mt-8 pt-6 border-t border-sky-200/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: 3D Girl Student Avatar */}
        <div className="md:col-span-3 flex justify-center md:justify-start">
          <div className="relative group">
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-[2rem] p-1.5 bg-gradient-to-tr from-amber-200 via-pink-200 to-indigo-200 shadow-lg border-4 border-white overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src={girlAvatarImg}
                alt="Estudante inspirada"
                className="w-full h-full object-cover rounded-[1.7rem]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Center: Reassuring Pedagogical Advice */}
        <div className="md:col-span-5 space-y-2.5 text-center md:text-left">
          <p className="text-slate-700 font-semibold text-xs sm:text-sm leading-relaxed">
            {isPt
              ? 'Não tens de saber tudo à primeira. Podes explorar, experimentar, errar, aprender e tentar novamente.'
              : "You don't have to know everything at once. You can explore, experiment, make mistakes, learn, and try again."}
          </p>
          <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
            {isPt
              ? 'O mais importante é participares, descobrires coisas novas e aprenderes a utilizar a tecnologia de forma cada vez mais autónoma e consciente.'
              : 'The most important thing is to participate, discover new things, and learn to use technology independently and wisely.'}
          </p>
        </div>

        {/* Right: Call to Action Pill Button + Motivational note */}
        <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-600 font-black text-xs sm:text-sm">
            <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-600 animate-pulse" />
            <span>{isPt ? 'Estás pronto?' : 'Are you ready?'}</span>
          </div>

          <button
            onClick={handleCtaClick}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[#6366F1] via-[#4F46E5] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-indigo-300/60 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>
              {user
                ? isPt
                  ? 'Explorar os Temas de TIC!'
                  : 'Explore ICT Curriculum!'
                : isPt
                ? 'Entra, explora e começa a tua aventura nas TIC!'
                : 'Enter, explore & start your ICT adventure!'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Playful curved note */}
          <div className="relative pt-1 text-slate-500 font-extrabold text-[11px] sm:text-xs tracking-tight flex items-center gap-1">
            <span>{isPt ? 'Pequenas descobertas, grandes futuros!' : 'Small discoveries, big futures!'}</span>
            <span className="text-rose-400">♡</span>
          </div>
        </div>
      </div>
    </div>
  );
};
