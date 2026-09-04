import React from 'react';
import { ArrowRight, Sparkles, Lightbulb, Trophy, Gamepad2, Brain, BarChart3, Rocket } from 'lucide-react';
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
      <div className="relative z-10 mt-8 mb-6 p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-indigo-100/90 shadow-2xs flex items-start sm:items-center gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <p className="text-slate-700 text-xs sm:text-sm md:text-base font-semibold leading-relaxed">
          {isPt
            ? 'Ao longo da tua aprendizagem, vais encontrar conteúdos, atividades, jogos, desafios e quizzes que te vão ajudar a compreender melhor o mundo digital e a desenvolver novas competências.'
            : 'Throughout your journey, you will find interactive modules, games, challenges, and quizzes that help you understand the digital world and develop real tech skills.'}
        </p>
      </div>

      {/* ================= 5 INTERACTIVE 3D FEATURE CARDS ================= */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 my-6">
        {/* CARD 1: Gamepad / Jogos */}
        <div
          onClick={() => {
            if (onNavigateTheme) {
              onNavigateTheme('correio-eletronico', 'desafio-escrever-email');
            } else {
              scrollToThemes();
            }
          }}
          className="group relative flex flex-col items-center justify-between p-5 rounded-3xl bg-[#EEF2FF] hover:bg-[#E0E7FF] border-2 border-[#C7D2FE] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center min-h-[170px]"
        >
          {/* 3D Gamepad SVG Illustration */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="controllerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
                <linearGradient id="gripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
              </defs>
              {/* Controller Main Body */}
              <path
                d="M 22 35 C 32 30, 68 30, 78 35 C 92 42, 92 75, 78 82 C 70 85, 62 76, 56 68 C 52 64, 48 64, 44 68 C 38 76, 30 85, 22 82 C 8 75, 8 42, 22 35 Z"
                fill="url(#controllerGrad)"
                stroke="#94A3B8"
                strokeWidth="2.5"
              />
              {/* Directional Pad (Black) */}
              <path
                d="M 28 48 L 34 48 L 34 42 L 38 42 L 38 48 L 44 48 L 44 52 L 38 52 L 38 58 L 34 58 L 34 52 L 28 52 Z"
                fill="#334155"
              />
              {/* Colorful Action Buttons */}
              <circle cx="70" cy="45" r="3.5" fill="#EF4444" /> {/* Red */}
              <circle cx="65" cy="50" r="3.5" fill="#3B82F6" /> {/* Blue */}
              <circle cx="75" cy="50" r="3.5" fill="#10B981" /> {/* Green */}
              <circle cx="70" cy="55" r="3.5" fill="#F59E0B" /> {/* Yellow */}
              {/* Analog Stick accents */}
              <circle cx="42" cy="58" r="5" fill="#64748B" />
              <circle cx="42" cy="58" r="3" fill="#94A3B8" />
              <circle cx="58" cy="58" r="5" fill="#64748B" />
              <circle cx="58" cy="58" r="3" fill="#94A3B8" />
            </svg>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 leading-tight">
            {isPt ? 'Aprende enquanto jogas' : 'Learn while playing'}
          </h3>

          {/* Accent Bottom Pill */}
          <div className="w-12 h-1.5 rounded-full bg-[#818CF8] mt-3 group-hover:w-16 transition-all" />
        </div>

        {/* CARD 2: Brain / Conhecimentos */}
        <div
          onClick={() => {
            if (onNavigateTheme) {
              onNavigateTheme('seguranca-digital', 'quiz-seguranca-1');
            } else {
              scrollToThemes();
            }
          }}
          className="group relative flex flex-col items-center justify-between p-5 rounded-3xl bg-[#FEFCE8] hover:bg-[#FEF9C3] border-2 border-[#FEF08A] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center min-h-[170px]"
        >
          {/* 3D Brain SVG Illustration */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
              </defs>
              {/* Brain Lobes */}
              <path
                d="M 50 25 C 38 25, 26 32, 26 46 C 24 50, 24 60, 30 66 C 28 72, 34 80, 44 78 C 48 80, 50 78, 50 78 C 50 78, 52 80, 56 78 C 66 80, 72 72, 70 66 C 76 60, 76 50, 74 46 C 74 32, 62 25, 50 25 Z"
                fill="url(#brainGrad)"
              />
              {/* Brain Sulci (Folds) */}
              <path
                d="M 50 28 L 50 76 M 38 38 C 42 42, 45 46, 38 52 C 34 56, 40 64, 45 68 M 62 38 C 58 42, 55 46, 62 52 C 66 56, 60 64, 55 68"
                stroke="#FDF2F8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sparkle energy */}
              <circle cx="22" cy="35" r="2" fill="#FBBF24" />
              <circle cx="78" cy="38" r="2.5" fill="#FBBF24" />
            </svg>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 leading-tight">
            {isPt ? 'Testa os teus conhecimentos' : 'Test your knowledge'}
          </h3>

          {/* Accent Bottom Pill */}
          <div className="w-12 h-1.5 rounded-full bg-[#FACC15] mt-3 group-hover:w-16 transition-all" />
        </div>

        {/* CARD 3: Trophy / XP & Conquistas */}
        <div
          onClick={() => {
            if (user && onOpenLeaderboard) {
              onOpenLeaderboard();
            } else if (!user) {
              onOpenAuth();
            } else {
              scrollToThemes();
            }
          }}
          className="group relative flex flex-col items-center justify-between p-5 rounded-3xl bg-[#ECFDF5] hover:bg-[#D1FAE5] border-2 border-[#A7F3D0] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center min-h-[170px]"
        >
          {/* 3D Gold Trophy SVG Illustration */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="goldCup" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
              {/* Handles */}
              <path
                d="M 30 35 C 18 35, 18 55, 32 55 M 70 35 C 82 35, 82 55, 68 55"
                stroke="#D97706"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              {/* Cup body */}
              <path
                d="M 30 25 L 70 25 L 65 55 C 62 65, 38 65, 35 55 Z"
                fill="url(#goldCup)"
              />
              {/* Star on Cup */}
              <polygon
                points="50,33 52,39 58,40 54,44 55,50 50,47 45,50 46,44 42,40 48,39"
                fill="#FFFBEB"
              />
              {/* Stem & Base */}
              <rect x="47" y="58" width="6" height="12" fill="#D97706" />
              <rect x="36" y="70" width="28" height="8" rx="3" fill="#B45309" />
              <rect x="40" y="68" width="20" height="4" rx="1" fill="#F59E0B" />
            </svg>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 leading-tight">
            {isPt ? 'Ganha XP e conquistas' : 'Earn XP & badges'}
          </h3>

          {/* Accent Bottom Pill */}
          <div className="w-12 h-1.5 rounded-full bg-[#34D399] mt-3 group-hover:w-16 transition-all" />
        </div>

        {/* CARD 4: Rising Chart / Progresso */}
        <div
          onClick={() => {
            if (onNavigateProgress) {
              onNavigateProgress();
            } else {
              scrollToThemes();
            }
          }}
          className="group relative flex flex-col items-center justify-between p-5 rounded-3xl bg-[#F0F9FF] hover:bg-[#E0F2FE] border-2 border-[#BAE6FD] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center min-h-[170px]"
        >
          {/* 3D Growth Chart SVG Illustration */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <linearGradient id="bar2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="bar3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
              {/* 3 Ascending Columns */}
              <rect x="24" y="52" width="12" height="24" rx="3" fill="url(#bar1)" />
              <rect x="44" y="38" width="12" height="38" rx="3" fill="url(#bar2)" />
              <rect x="64" y="24" width="12" height="52" rx="3" fill="url(#bar3)" />
              {/* Rising Arrow */}
              <path
                d="M 22 55 Q 46 40, 72 20"
                fill="none"
                stroke="#0284C7"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <polyline
                points="62,18 74,19 73,30"
                fill="none"
                stroke="#0284C7"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 leading-tight">
            {isPt ? 'Acompanha o teu progresso' : 'Track your progress'}
          </h3>

          {/* Accent Bottom Pill */}
          <div className="w-12 h-1.5 rounded-full bg-[#38BDF8] mt-3 group-hover:w-16 transition-all" />
        </div>

        {/* CARD 5: Rocket / Desafios */}
        <div
          onClick={() => {
            scrollToThemes();
          }}
          className="group relative flex flex-col items-center justify-between p-5 rounded-3xl bg-[#FFF1F2] hover:bg-[#FFE4E6] border-2 border-[#FECDD3] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center min-h-[170px]"
        >
          {/* 3D Rocket SVG Illustration */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
              </defs>
              {/* Exhaust Flame */}
              <path
                d="M 38 68 C 30 76, 25 88, 25 88 C 25 88, 38 84, 46 76 Z"
                fill="#F59E0B"
              />
              <path
                d="M 35 72 C 28 80, 26 86, 26 86 C 26 86, 33 84, 40 78 Z"
                fill="#EF4444"
              />
              {/* Rocket Fins */}
              <path d="M 38 52 L 28 64 L 40 68 Z" fill="#E11D48" />
              <path d="M 58 32 L 70 44 L 66 56 Z" fill="#E11D48" />
              {/* Rocket Fuselage */}
              <ellipse
                cx="52"
                cy="48"
                rx="14"
                ry="24"
                transform="rotate(-45 52 48)"
                fill="url(#rocketBody)"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />
              {/* Nose Cone */}
              <path
                d="M 62 24 C 68 20, 76 18, 76 18 C 76 18, 74 26, 70 32 Z"
                fill="#E11D48"
              />
              {/* Porthole */}
              <circle cx="53" cy="45" r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            </svg>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 leading-tight">
            {isPt ? 'Supera novos desafios' : 'Conquer new challenges'}
          </h3>

          {/* Accent Bottom Pill */}
          <div className="w-12 h-1.5 rounded-full bg-[#FB7185] mt-3 group-hover:w-16 transition-all" />
        </div>
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
