import React from 'react';
import { Language } from '../types';

interface SabiasQueBadgeProps {
  language: Language;
  hasAnswered: boolean;
  onClick: () => void;
}

export const SabiasQueBadge: React.FC<SabiasQueBadgeProps> = ({
  language,
  hasAnswered,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        hasAnswered
          ? language === 'pt'
            ? 'Sabias Que? Desafio diário concluído. Clica para rever a dica e a pergunta.'
            : 'Did you know? Daily challenge completed. Click to review tip and question.'
          : language === 'pt'
          ? 'Sabias Que? Clica e ganha pontos! Descobre a dica do dia e responde à pergunta.'
          : 'Did you know? Click and earn points! Discover today\'s tip and answer the question.'
      }
      className="group relative w-full flex flex-col items-center justify-center p-2 rounded-[2.5rem] bg-linear-to-b from-indigo-50/60 via-purple-50/40 to-sky-50/50 border-2 border-indigo-100/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-indigo-400/40"
    >
      {/* Decorative ambient background glow */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-tr from-purple-400/15 via-amber-300/20 to-sky-400/15 blur-xl pointer-events-none group-hover:opacity-100 opacity-70 transition-opacity" />

      {/* The Main Illustration Sticker */}
      <div className="relative z-10 w-full max-w-[320px] aspect-square flex items-center justify-center filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Die-cut Sticker Outline Gradient */}
            <linearGradient id="stickerBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f3e8ff" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>

            {/* Main Outer Purple Ring */}
            <linearGradient id="purpleRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7e22ce" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>

            {/* Inner Sky Gradient */}
            <radialGradient id="innerSky" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="75%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </radialGradient>

            {/* Golden Elements Gradient */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* Coin Inner Rim */}
            <linearGradient id="coinRim" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Lightbulb Glow */}
            <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="40%" stopColor="#facc15" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>

            {/* Button Gradient */}
            <linearGradient id="btnBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            {/* Text Gradients */}
            <linearGradient id="cyanText" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#e0f2fe" />
              <stop offset="65%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="yellowText" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            {/* Drop Shadows */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="stickerShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#312e81" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* 1. STICKER WHITE DIE-CUT BASE */}
          <g filter="url(#stickerShadow)">
            <circle cx="250" cy="250" r="235" fill="url(#stickerBorder)" />
          </g>

          {/* 2. OUTER PURPLE & BLUE CIRCULAR RING */}
          <circle cx="250" cy="250" r="222" fill="url(#purpleRing)" />
          <circle cx="250" cy="250" r="215" fill="#4338ca" stroke="#c084fc" strokeWidth="4" />

          {/* 3. INNER SKY BLUE CIRCLE */}
          <circle cx="250" cy="250" r="206" fill="url(#innerSky)" />

          {/* Sunburst Rays (Behind Characters) */}
          <g opacity="0.22" fill="#ffffff">
            <polygon points="250,250 220,44 280,44" />
            <polygon points="250,250 140,65 190,48" />
            <polygon points="250,250 310,48 360,65" />
            <polygon points="250,250 70,120 110,85" />
            <polygon points="250,250 390,85 430,120" />
            <polygon points="250,250 44,190 60,140" />
            <polygon points="250,250 440,140 456,190" />
            <polygon points="250,250 44,280 44,220" />
            <polygon points="250,250 456,220 456,280" />
            <polygon points="250,250 60,340 75,390" />
            <polygon points="250,250 425,390 440,340" />
          </g>

          {/* 4. FLOATING GOLDEN COINS WITH STARS */}
          {/* Top-Left Coin */}
          <g transform="translate(68, 145) rotate(-18)">
            <circle cx="0" cy="0" r="28" fill="#ca8a04" />
            <circle cx="0" cy="0" r="25" fill="url(#goldGradient)" stroke="#fef08a" strokeWidth="2.5" />
            <polygon points="0,-14 4,-4 14,-3 6,5 8,15 0,9 -8,15 -6,5 -14,-3 -4,-4" fill="#ca8a04" />
            <polygon points="0,-12 3.5,-3 12,-2 5,4 7,13 0,8 -7,13 -5,4 -12,-2 -3.5,-3" fill="#ffffff" opacity="0.6" />
            {/* Sparkle lines */}
            <line x1="-34" y1="0" x2="-28" y2="0" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="-34" x2="0" y2="-28" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Top-Right Coin */}
          <g transform="translate(425, 135) rotate(15)">
            <circle cx="0" cy="0" r="24" fill="#ca8a04" />
            <circle cx="0" cy="0" r="21" fill="url(#goldGradient)" stroke="#fef08a" strokeWidth="2" />
            <polygon points="0,-11 3,-3 11,-2 5,4 6,12 0,7 -6,12 -5,4 -11,-2 -3,-3" fill="#ca8a04" />
            <polygon points="0,-9 2.5,-2 9,-1.5 4,3 5,10 0,6 -5,10 -4,3 -9,-1.5 -2.5,-2" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Bottom-Left Coin */}
          <g transform="translate(85, 385) rotate(12)">
            <circle cx="0" cy="0" r="26" fill="#ca8a04" />
            <circle cx="0" cy="0" r="23" fill="url(#goldGradient)" stroke="#fef08a" strokeWidth="2" />
            <polygon points="0,-12 3.5,-3 12,-2 5,4 7,13 0,8 -7,13 -5,4 -12,-2 -3.5,-3" fill="#ca8a04" />
          </g>

          {/* Bottom-Right Coin */}
          <g transform="translate(420, 360) rotate(-15)">
            <circle cx="0" cy="0" r="24" fill="#ca8a04" />
            <circle cx="0" cy="0" r="21" fill="url(#goldGradient)" stroke="#fef08a" strokeWidth="2" />
            <polygon points="0,-11 3,-3 11,-2 5,4 6,12 0,7 -6,12 -5,4 -11,-2 -3,-3" fill="#ca8a04" />
          </g>

          {/* 5. CHARACTERS (Girl & Boy) */}
          {/* GIRL (Left side) */}
          <g id="girlCharacter">
            {/* Girl Hair Back */}
            <path
              d="M 120 220 C 100 240 80 290 85 340 C 90 380 130 400 155 400 C 175 400 190 370 190 350 Z"
              fill="#5c2d12"
            />
            {/* Girl Torso/Shoulders (Pink Hoodie) */}
            <path
              d="M 115 360 C 120 320 180 320 220 340 C 235 347 245 370 245 400 L 95 400 C 95 385 105 370 115 360 Z"
              fill="#ec4899"
            />
            {/* Hoodie Collar & Strings */}
            <path d="M 160 345 Q 185 365 210 345 Q 185 375 160 345 Z" fill="#db2777" />
            <circle cx="178" cy="370" r="3" fill="#ffffff" />
            <circle cx="192" cy="370" r="3" fill="#ffffff" />

            {/* Girl Neck */}
            <path d="M 168 310 L 196 310 L 192 345 L 172 345 Z" fill="#fed7aa" />

            {/* Girl Face */}
            <ellipse cx="182" cy="275" rx="55" ry="50" fill="#fde68a" />
            <ellipse cx="182" cy="275" rx="53" ry="48" fill="#ffedd5" />

            {/* Cheeks Blush */}
            <ellipse cx="148" cy="285" rx="13" ry="8" fill="#f472b6" opacity="0.45" />
            <ellipse cx="216" cy="285" rx="13" ry="8" fill="#f472b6" opacity="0.45" />

            {/* Girl Right Eye (Open, Big & Twinkling) */}
            <g transform="translate(206, 268)">
              <ellipse cx="0" cy="0" rx="10" ry="14" fill="#ffffff" />
              <ellipse cx="0" cy="1" rx="8" ry="11" fill="#451a03" />
              <ellipse cx="1" cy="2" rx="5" ry="7" fill="#1c1917" />
              <circle cx="-2" cy="-3" r="3.5" fill="#ffffff" />
              <circle cx="3" cy="4" r="1.5" fill="#ffffff" />
              {/* Eyelashes */}
              <path d="M -8 -11 Q 0 -16 8 -11" stroke="#292524" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 6 -13 L 11 -17" stroke="#292524" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Girl Left Eye (Playful Wink 😉) */}
            <path
              d="M 145 272 Q 157 260 169 272"
              stroke="#292524"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M 167 268 L 173 263" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" />

            {/* Girl Eyebrows */}
            <path d="M 146 254 Q 158 248 170 254" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 196 252 Q 208 246 220 252" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Cute Little Nose */}
            <path d="M 180 278 Q 183 283 186 278" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Girl Joyful Open Smile */}
            <path
              d="M 162 292 Q 182 320 202 292 Q 182 298 162 292 Z"
              fill="#991b1b"
            />
            {/* White Teeth */}
            <path d="M 167 294 Q 182 302 197 294 Q 182 296 167 294 Z" fill="#ffffff" />
            {/* Pink Tongue */}
            <path d="M 174 308 Q 182 312 190 308 Q 182 302 174 308 Z" fill="#fb7185" />

            {/* Girl Front Hair & Wavy Strands */}
            <path
              d="M 125 240 C 130 190 220 180 240 230 C 225 215 170 215 140 235 Z"
              fill="#78350f"
            />
            <path
              d="M 122 235 C 110 260 115 310 135 325 C 130 305 130 270 140 245 Z"
              fill="#78350f"
            />
            {/* Cute Pink Hair Clip on Left */}
            <g transform="translate(136, 218) rotate(-25)">
              <rect x="-8" y="-4" width="18" height="8" rx="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            </g>

            {/* Girl Hands Resting on Cheeks */}
            <g>
              <ellipse cx="138" cy="318" rx="14" ry="11" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
              <ellipse cx="228" cy="318" rx="14" ry="11" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
            </g>
          </g>

          {/* BOY (Right side) */}
          <g id="boyCharacter">
            {/* Boy Torso (Blue Hoodie) */}
            <path
              d="M 260 340 C 290 320 355 320 375 355 C 385 368 395 385 395 400 L 245 400 C 245 375 252 352 260 340 Z"
              fill="#2563eb"
            />
            {/* Hoodie Collar */}
            <path d="M 290 345 Q 315 365 340 345 Q 315 372 290 345 Z" fill="#1d4ed8" />
            <path d="M 312 360 L 312 385" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 322 360 L 322 385" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

            {/* Boy Neck */}
            <path d="M 302 312 L 328 312 L 325 345 L 305 345 Z" fill="#fed7aa" />

            {/* Boy Face */}
            <ellipse cx="316" cy="275" rx="54" ry="50" fill="#fde68a" />
            <ellipse cx="316" cy="275" rx="52" ry="48" fill="#ffedd5" />

            {/* Boy Cheeks Blush */}
            <ellipse cx="282" cy="286" rx="13" ry="8" fill="#fb923c" opacity="0.45" />
            <ellipse cx="350" cy="286" rx="13" ry="8" fill="#fb923c" opacity="0.45" />

            {/* Boy Left Eye (Looking Forward) */}
            <g transform="translate(294, 268)">
              <ellipse cx="0" cy="0" rx="10" ry="14" fill="#ffffff" />
              <ellipse cx="0" cy="1" rx="8" ry="11" fill="#451a03" />
              <ellipse cx="1" cy="2" rx="5" ry="7" fill="#1c1917" />
              <circle cx="-2" cy="-3" r="3.5" fill="#ffffff" />
              <circle cx="3" cy="4" r="1.5" fill="#ffffff" />
              <path d="M -8 -11 Q 0 -16 8 -11" stroke="#292524" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Boy Right Eye */}
            <g transform="translate(338, 268)">
              <ellipse cx="0" cy="0" rx="10" ry="14" fill="#ffffff" />
              <ellipse cx="0" cy="1" rx="8" ry="11" fill="#451a03" />
              <ellipse cx="1" cy="2" rx="5" ry="7" fill="#1c1917" />
              <circle cx="-2" cy="-3" r="3.5" fill="#ffffff" />
              <circle cx="3" cy="4" r="1.5" fill="#ffffff" />
              <path d="M -8 -11 Q 0 -16 8 -11" stroke="#292524" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Boy Eyebrows */}
            <path d="M 284 252 Q 296 244 308 252" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 326 252 Q 338 244 350 252" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Cute Nose */}
            <path d="M 314 278 Q 317 283 320 278" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Boy Big Enthusiastic Smile */}
            <path
              d="M 294 292 Q 316 324 340 292 Q 316 298 294 292 Z"
              fill="#991b1b"
            />
            {/* White Teeth */}
            <path d="M 299 294 Q 316 304 335 294 Q 316 296 299 294 Z" fill="#ffffff" />
            {/* Tongue */}
            <path d="M 308 310 Q 316 315 326 310 Q 316 304 308 310 Z" fill="#fb7185" />

            {/* Boy Curly Messy Brown Hair */}
            <path
              d="M 265 240 C 260 195 305 180 340 185 C 375 190 380 230 375 250 C 370 230 355 220 340 225 C 320 215 290 220 275 240 Z"
              fill="#78350f"
            />
            <circle cx="272" cy="210" r="14" fill="#78350f" />
            <circle cx="295" cy="195" r="16" fill="#78350f" />
            <circle cx="325" cy="190" r="18" fill="#78350f" />
            <circle cx="355" cy="198" r="16" fill="#78350f" />
            <circle cx="372" cy="220" r="14" fill="#78350f" />

            {/* Boy Thumbs Up Hand (Right) */}
            <g transform="translate(382, 330)">
              {/* Arm/cuff */}
              <ellipse cx="0" cy="10" rx="12" ry="8" fill="#1d4ed8" />
              {/* Fist */}
              <ellipse cx="0" cy="0" rx="11" ry="9" fill="#fed7aa" />
              {/* Thumb sticking up 👍 */}
              <path d="M -3 0 L -3 -15 Q -3 -22 3 -22 Q 8 -22 8 -15 L 6 0 Z" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
            </g>

            {/* Boy Pointing Down Hand (Left - pointing at button) */}
            <g transform="translate(268, 355)">
              <ellipse cx="0" cy="0" rx="11" ry="8" fill="#fed7aa" />
              {/* Index finger pointing down 👇 */}
              <path d="M -3 3 L -3 18 Q 1 24 5 18 L 5 3 Z" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
            </g>
          </g>

          {/* 6. GLOWING LIGHTBULB (Idea / Sabias Que symbol in center) */}
          <g transform="translate(250, 160)">
            {/* Glow Aura */}
            <circle cx="0" cy="0" r="48" fill="url(#bulbGlow)" />

            {/* Radiating Idea Rays */}
            <g stroke="#fef08a" strokeWidth="3" strokeLinecap="round">
              <line x1="0" y1="-44" x2="0" y2="-56" />
              <line x1="-32" y1="-32" x2="-42" y2="-42" />
              <line x1="32" y1="-32" x2="42" y2="-42" />
              <line x1="-44" y1="0" x2="-56" y2="0" />
              <line x1="44" y1="0" x2="56" y2="0" />
            </g>

            {/* Glass Bulb Body */}
            <path
              d="M -22 -10 C -24 -32 24 -32 22 -10 C 20 2 12 10 12 18 L -12 18 C -12 10 -20 2 -22 -10 Z"
              fill="url(#goldGradient)"
              stroke="#ca8a04"
              strokeWidth="2"
            />
            {/* White Shine reflection */}
            <path d="M -14 -16 C -15 -24 0 -26 8 -24" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Inner Filament */}
            <path d="M -7 6 L -3 -6 L 0 4 L 3 -6 L 7 6" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Screw Base */}
            <rect x="-10" y="19" width="20" height="4" rx="2" fill="#475569" />
            <rect x="-8" y="24" width="16" height="4" rx="2" fill="#334155" />
            <path d="M -5 29 L 5 29 L 2 33 L -2 33 Z" fill="#1e293b" />
          </g>

          {/* 7. TOP 3D BUBBLE BANNER: "SABIAS QUE?" */}
          <g transform="translate(250, 85)">
            {/* Background comic bursts around title */}
            <g fill="#fde047" opacity="0.95">
              <polygon points="-210,-10 -185,-35 -170,-15" />
              <polygon points="-160,-30 -140,-50 -130,-25" />
              <polygon points="210,-10 185,-35 170,-15" />
              <polygon points="160,-30 140,-50 130,-25" />
            </g>

            {/* Extrusion / 3D Shadow Layers */}
            {/* "SABIAS" (Left part) */}
            <text
              x="-90"
              y="22"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="56"
              fill="#1e1b4b"
              stroke="#1e1b4b"
              strokeWidth="16"
              strokeLinejoin="round"
              letterSpacing="2"
            >
              SABIAS
            </text>
            <text
              x="-90"
              y="18"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="56"
              fill="#0369a1"
              stroke="#0369a1"
              strokeWidth="8"
              strokeLinejoin="round"
              letterSpacing="2"
            >
              SABIAS
            </text>
            <text
              x="-90"
              y="14"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="56"
              fill="url(#cyanText)"
              letterSpacing="2"
            >
              SABIAS
            </text>

            {/* "QUE?" (Right part) */}
            <text
              x="115"
              y="22"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="60"
              fill="#7c2d12"
              stroke="#7c2d12"
              strokeWidth="16"
              strokeLinejoin="round"
              letterSpacing="2"
            >
              QUE?
            </text>
            <text
              x="115"
              y="18"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="60"
              fill="#d97706"
              stroke="#d97706"
              strokeWidth="8"
              strokeLinejoin="round"
              letterSpacing="2"
            >
              QUE?
            </text>
            <text
              x="115"
              y="14"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="60"
              fill="url(#yellowText)"
              letterSpacing="2"
            >
              QUE?
            </text>
          </g>

          {/* 8. BOTTOM PILL BUTTON: "Clica e Ganha Pontos" */}
          <g transform="translate(250, 420)">
            {/* Outer Golden Border & Glow */}
            <ellipse cx="0" cy="0" rx="175" ry="52" fill="#ca8a04" />
            <ellipse cx="0" cy="-2" rx="172" ry="49" fill="url(#goldGradient)" />
            <ellipse cx="0" cy="-4" rx="164" ry="43" fill="#ca8a04" />

            {/* Purple Button Face */}
            <ellipse cx="0" cy="-6" rx="160" ry="40" fill="url(#btnBg)" />
            {/* Glossy top shine */}
            <path
              d="M -145 -14 C -130 -34 130 -34 145 -14 C 90 -24 -90 -24 -145 -14 Z"
              fill="#ffffff"
              opacity="0.3"
            />

            {/* Text Line 1: "Clica e Ganha" */}
            <text
              x="0"
              y="-12"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="25"
              fill="#3b0764"
              stroke="#3b0764"
              strokeWidth="6"
              strokeLinejoin="round"
              letterSpacing="1"
            >
              {language === 'pt' ? 'Clica e Ganha' : 'Click & Win'}
            </text>
            <text
              x="0"
              y="-14"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="25"
              fill="#ffffff"
              letterSpacing="1"
            >
              {language === 'pt' ? 'Clica e Ganha' : 'Click & Win'}
            </text>

            {/* Text Line 2: "Pontos" */}
            <text
              x="0"
              y="22"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="34"
              fill="#7c2d12"
              stroke="#7c2d12"
              strokeWidth="8"
              strokeLinejoin="round"
              letterSpacing="1.5"
            >
              {language === 'pt' ? 'Pontos' : 'Points'}
            </text>
            <text
              x="0"
              y="18"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="34"
              fill="url(#yellowText)"
              letterSpacing="1.5"
            >
              {language === 'pt' ? 'Pontos' : 'Points'}
            </text>

            {/* 9. CARTOON POINTING HAND CURSOR */}
            <g transform="translate(18, 28) rotate(-15)">
              {/* Yellow Click Impact Sparks */}
              <g stroke="#fde047" strokeWidth="3" strokeLinecap="round">
                <line x1="-12" y1="-8" x2="-22" y2="-16" />
                <line x1="0" y1="-14" x2="0" y2="-25" />
                <line x1="12" y1="-8" x2="22" y2="-16" />
              </g>

              {/* Hand Outline & 3D Shadow */}
              <g filter="url(#softGlow)">
                <ellipse cx="0" cy="12" rx="14" ry="12" fill="#1e1b4b" opacity="0.4" />
              </g>
              {/* White Cartoon Glove/Hand */}
              {/* Palm */}
              <ellipse cx="2" cy="18" rx="15" ry="14" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
              {/* Folded fingers */}
              <ellipse cx="14" cy="14" rx="5" ry="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="2.5" />
              <ellipse cx="12" cy="22" rx="5" ry="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="2.5" />
              <ellipse cx="6" cy="26" rx="5" ry="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="2.5" />
              {/* Pointing Index Finger */}
              <path
                d="M -3 16 L -4 -10 C -4 -16 4 -16 4 -10 L 5 16 Z"
                fill="#ffffff"
                stroke="#1e293b"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Thumb */}
              <ellipse cx="-10" cy="16" rx="6" ry="8" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
            </g>
          </g>
        </svg>
      </div>
    </button>
  );
};
