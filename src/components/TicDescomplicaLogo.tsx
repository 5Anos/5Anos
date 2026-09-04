import React from 'react';

interface TicDescomplicaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  showSubtitle?: boolean;
}

export const TicDescomplicaLogo: React.FC<TicDescomplicaLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Dimension settings based on size
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    responsive: 'w-9 h-9 sm:w-11 sm:h-11',
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
    responsive: 'text-lg sm:text-2xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 1. App Icon with Laptop & Glowing Lightbulb */}
      <div
        className={`${iconDimensions} shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 p-1.5 shadow-md flex items-center justify-center relative overflow-hidden border border-blue-400/40`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Laptop Base */}
          <path
            d="M6 38H42C43.1 38 44 37.1 44 36C44 34.9 43.1 34 42 34H6C4.9 34 4 34.9 4 36C4 37.1 4.9 38 6 38Z"
            fill="white"
          />
          <path
            d="M20 34H28V36H20V34Z"
            fill="#93C5FD"
          />
          {/* Laptop Screen Frame */}
          <rect
            x="8"
            y="14"
            width="32"
            height="20"
            rx="3"
            stroke="white"
            strokeWidth="3"
            fill="#1E40AF"
          />
          {/* Lightbulb in Screen */}
          <circle cx="24" cy="22" r="5" fill="#FBBF24" />
          <path
            d="M22 25H26L25.5 28H22.5L22 25Z"
            fill="#F3F4F6"
          />
          {/* Bulb Eyes / Sparkle */}
          <circle cx="22.5" cy="21.5" r="0.8" fill="white" />
          <circle cx="25.5" cy="21.5" r="0.8" fill="white" />
          {/* Shine Rays */}
          <line x1="24" y1="13" x2="24" y2="15" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="15" x2="19.5" y2="16.5" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="15" x2="28.5" y2="16.5" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. Text Brand: TIC 5 — Descomplica! */}
      <div className="flex items-center">
        {/* TIC in dark bold navy */}
        <span
          className={`font-black tracking-tight text-[#0B1E48] ${textSize}`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
        >
          TIC
        </span>

        {/* 5 in Emerald / Teal with sunburst rays */}
        <div className="relative inline-flex items-center ml-0.5 mr-1.5">
          <span
            className={`font-black ${textSize} text-[#00C49F] drop-shadow-[0_1.5px_0_#007A65]`}
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
          >
            5
          </span>

          {/* Yellow Sparkle / Sunburst Rays around 5 */}
          <svg
            className="absolute -top-1.5 -right-3 w-4 h-5 pointer-events-none"
            viewBox="0 0 16 20"
            fill="none"
          >
            {/* Top Ray */}
            <path d="M4 7L12 2" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Middle Ray */}
            <path d="M4 11L14 11" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Bottom Ray */}
            <path d="M4 15L11 18" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Dash */}
        <span className={`font-black text-[#0B1E48] mx-1 sm:mx-1.5 ${textSize}`}>
          —
        </span>

        {/* Descomplica! in dynamic styling with yellow curved underline */}
        <div className="relative inline-flex flex-col">
          <span
            className={`font-black italic tracking-tight text-[#0B1E48] ${textSize}`}
            style={{
              fontFamily: "'Fredoka', 'Comfortaa', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Descomplica!
          </span>
          {/* Hand-drawn yellow curved underline */}
          <svg
            viewBox="0 0 120 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-2 sm:h-2.5 -mt-0.5"
            preserveAspectRatio="none"
          >
            <path
              d="M2 3C30 9 90 9 118 4"
              stroke="#F59E0B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
