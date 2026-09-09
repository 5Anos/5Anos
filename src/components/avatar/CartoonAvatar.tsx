import React from 'react';
import { AvatarConfig } from '../../types';
import { getDefaultAvatar } from '../../utils/avatarUtils';

interface CartoonAvatarProps {
  avatar?: AvatarConfig;
  config?: AvatarConfig;
  size?: number | string;
  className?: string;
  seed?: string;
  showBorder?: boolean;
}

export const CartoonAvatar: React.FC<CartoonAvatarProps> = ({
  avatar: propAvatar,
  config: propConfig,
  size = 64,
  className = '',
  seed = 'TIC5',
  showBorder = true,
}) => {
  const avatar = propAvatar || propConfig || getDefaultAvatar(seed);

  const {
    skinColor = '#FDDFBA',
    hairStyle = 'short',
    hairColor = '#18181B',
    expression = 'smile',
    glasses = 'none',
    glassesColor = '#1E293B',
    hat = 'none',
    hatColor = '#4F46E5',
    clothing = 'tshirt',
    clothingColor = '#4F46E5',
    bgColor = '#6366F1',
  } = avatar;

  // Darker shade for neck shadow
  const neckColor = skinColor === '#BAE6FD' ? '#7DD3FC' : '#D97706';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none overflow-hidden ${
        showBorder ? 'ring-2 ring-white shadow-xs' : ''
      } ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="avatar-circle-clip">
            <circle cx="60" cy="60" r="59" />
          </clipPath>
          <linearGradient id="vr-screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="shades-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Global Circle Clip to prevent any element from bleeding outside */}
        <g clipPath="url(#avatar-circle-clip)">
          {/* Background Circle */}
          <rect width="120" height="120" fill={bgColor} />

          {/* Subtle background glow circle */}
          <circle cx="60" cy="50" r="45" fill="#FFFFFF" opacity="0.12" />

          {/* BACK HAIR (For long hair, afro, ponytail) */}
          {hairStyle === 'long' && (
            <path
              d="M 28 42 C 20 60 22 95 32 105 C 38 100 40 85 40 75 L 80 75 C 80 85 82 100 88 105 C 98 95 100 60 92 42 Z"
              fill={hairColor}
            />
          )}

          {hairStyle === 'ponytail' && (
            <g>
              {/* Ponytail puff high on the right side */}
              <ellipse cx="88" cy="32" rx="14" ry="18" fill={hairColor} transform="rotate(25 88 32)" />
              {/* Hair tie band */}
              <circle cx="78" cy="36" r="4" fill={clothingColor} />
            </g>
          )}

          {hairStyle === 'afro' && (
            <circle cx="60" cy="48" r="38" fill={hairColor} />
          )}

          {hairStyle === 'braids' && (
            <g fill={hairColor}>
              <path d="M 28 50 C 24 70 26 95 30 108 C 34 100 36 80 35 60 Z" />
              <path d="M 92 50 C 96 70 94 95 90 108 C 86 100 84 80 85 60 Z" />
              {/* Colored braid bands */}
              <circle cx="30" cy="100" r="3" fill="#F59E0B" />
              <circle cx="90" cy="100" r="3" fill="#F59E0B" />
            </g>
          )}

          {/* NECK & SHADOW */}
          <rect x="52" y="70" width="16" height="18" rx="4" fill={neckColor} opacity="0.25" />
          <rect x="53" y="72" width="14" height="15" rx="3" fill={skinColor} />

          {/* SHOULDERS & CLOTHING */}
          <path
            d="M 16 120 C 16 90 36 82 60 82 C 84 82 104 90 104 120 Z"
            fill={clothingColor}
          />

          {/* Clothing Specific Details */}
          {clothing === 'tshirt' && (
            <g>
              {/* Collar curve */}
              <path
                d="M 48 83 C 54 90 66 90 72 83"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                fill="none"
                opacity="0.8"
                strokeLinecap="round"
              />
              {/* Tech chest badge: </> */}
              <text
                x="60"
                y="104"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fill="#FFFFFF"
                opacity="0.85"
                fontFamily="monospace"
              >
                &lt;/&gt;
              </text>
            </g>
          )}

          {clothing === 'hoodie' && (
            <g>
              {/* Hoodie V-neck seam */}
              <path
                d="M 44 83 L 60 96 L 76 83"
                stroke="#0F172A"
                strokeWidth="2.5"
                fill="none"
                opacity="0.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Drawstrings */}
              <line x1="56" y1="94" x2="56" y2="108" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
              <line x1="64" y1="94" x2="64" y2="108" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
              <circle cx="56" cy="108" r="1.5" fill="#FFFFFF" />
              <circle cx="64" cy="108" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {clothing === 'sweater' && (
            <g>
              {/* Polo Collar */}
              <path d="M 48 83 L 60 92 L 53 92 Z" fill="#FFFFFF" opacity="0.9" />
              <path d="M 72 83 L 60 92 L 67 92 Z" fill="#FFFFFF" opacity="0.9" />
              <circle cx="60" cy="98" r="1.5" fill="#FFFFFF" opacity="0.7" />
              <circle cx="60" cy="104" r="1.5" fill="#FFFFFF" opacity="0.7" />
            </g>
          )}

          {clothing === 'superhero' && (
            <g>
              {/* Cape peaks behind shoulders */}
              <path d="M 22 88 L 30 115 L 18 115 Z" fill="#EF4444" />
              <path d="M 98 88 L 90 115 L 102 115 Z" fill="#EF4444" />
              {/* Superhero Diamond Emblem */}
              <polygon points="60,91 69,99 60,108 51,99" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Bolt inside */}
              <path d="M 60 94 L 57 100 L 61 100 L 59 105 L 63 99 L 59 99 Z" fill="#EF4444" />
            </g>
          )}

          {/* EARS */}
          <circle cx="34" cy="56" r="6" fill={skinColor} />
          <circle cx="34" cy="56" r="3" fill={neckColor} opacity="0.3" />
          <circle cx="86" cy="56" r="6" fill={skinColor} />
          <circle cx="86" cy="56" r="3" fill={neckColor} opacity="0.3" />

          {/* HEAD / FACE OVAL */}
          <ellipse cx="60" cy="55" rx="26" ry="28" fill={skinColor} />

          {/* CHEEK BLUSH */}
          <ellipse cx="44" cy="62" rx="4" ry="2.2" fill="#F43F5E" opacity="0.28" />
          <ellipse cx="76" cy="62" rx="4" ry="2.2" fill="#F43F5E" opacity="0.28" />

          {/* CUTE NOSE */}
          <path
            d="M 58 56 Q 60 58.5 62 56"
            stroke="#9A3412"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* EYES & BROWS (Customized per expression) */}
          {expression === 'smile' && (
            <g>
              {/* Eyebrows */}
              <path d="M 44 45 Q 49 43 54 45" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              <path d="M 66 45 Q 71 43 76 45" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              {/* Eyes */}
              <ellipse cx="49" cy="52" rx="3.5" ry="4.5" fill="#18181B" />
              <circle cx="48" cy="50.5" r="1.5" fill="#FFFFFF" />
              <ellipse cx="71" cy="52" rx="3.5" ry="4.5" fill="#18181B" />
              <circle cx="70" cy="50.5" r="1.5" fill="#FFFFFF" />
              {/* Mouth: cute sweet smile */}
              <path d="M 52 65 Q 60 72 68 65" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {expression === 'laugh' && (
            <g>
              {/* Eyebrows up */}
              <path d="M 44 43 Q 49 40 54 43" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              <path d="M 66 43 Q 71 40 76 43" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              {/* Happy closed eyes ^ ^ */}
              <path d="M 45 52 Q 49 47 53 52" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 67 52 Q 71 47 75 52" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Big Laughing Open Mouth */}
              <path d="M 51 63 Q 60 63 69 63 C 69 72 51 72 51 63 Z" fill="#991B1B" />
              <path d="M 53 63 Q 60 66 67 63" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          )}

          {expression === 'cool' && (
            <g>
              {/* One raised cool eyebrow */}
              <path d="M 44 46 Q 49 46 54 47" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              <path d="M 66 43 Q 71 39 76 43" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85" />
              {/* Half-lidded confident eyes */}
              <ellipse cx="49" cy="53" rx="3.5" ry="3.5" fill="#18181B" />
              <circle cx="48" cy="52" r="1.2" fill="#FFFFFF" />
              <line x1="44" y1="50" x2="54" y2="50" stroke={skinColor} strokeWidth="2.5" />
              <ellipse cx="71" cy="52" rx="3.5" ry="4" fill="#18181B" />
              <circle cx="70" cy="51" r="1.4" fill="#FFFFFF" />
              {/* Smirk smile */}
              <path d="M 54 66 Q 62 67 68 63" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {expression === 'wink' && (
            <g>
              {/* Eyebrows */}
              <path d="M 44 44 Q 49 42 54 44" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              <path d="M 66 45 Q 71 44 76 47" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              {/* Left eye open, Right eye winking ~ */}
              <ellipse cx="49" cy="52" rx="3.5" ry="4.5" fill="#18181B" />
              <circle cx="48" cy="50.5" r="1.5" fill="#FFFFFF" />
              <path d="M 67 53 Q 71 49 75 53" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Playful open smile */}
              <path d="M 52 64 Q 60 71 68 64" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {expression === 'star' && (
            <g>
              {/* Joyful raised eyebrows */}
              <path d="M 44 43 Q 49 40 54 43" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              <path d="M 66 43 Q 71 40 76 43" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
              {/* Star Eyes! */}
              <polygon points="49,46 51,51 56,51 52,54 54,59 49,56 44,59 46,54 42,51 47,51" fill="#F59E0B" />
              <polygon points="71,46 73,51 78,51 74,54 76,59 71,56 66,59 68,54 64,51 69,51" fill="#F59E0B" />
              {/* Open excited smile */}
              <path d="M 52 64 Q 60 72 68 64 C 68 70 52 70 52 64 Z" fill="#991B1B" />
              <path d="M 54 64 Q 60 66 66 64" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          )}

          {expression === 'gamer' && (
            <g>
              {/* Intense focused eyebrows */}
              <path d="M 44 45 L 54 47" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 76 45 L 66 47" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" />
              {/* Focused eyes with cyan monitor reflection */}
              <ellipse cx="49" cy="53" rx="3.5" ry="4" fill="#18181B" />
              <circle cx="48" cy="51.5" r="1.3" fill="#06B6D4" />
              <ellipse cx="71" cy="53" rx="3.5" ry="4" fill="#18181B" />
              <circle cx="70" cy="51.5" r="1.3" fill="#06B6D4" />
              {/* Confident gamer smile */}
              <path d="M 53 66 Q 60 69 67 66" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* FRONT HAIR (Rendered over face) */}
          {hairStyle === 'short' && (
            <path
              d="M 34 50 C 33 34 44 26 60 26 C 76 26 87 34 86 50 C 83 45 78 40 70 41 C 60 42 56 46 48 41 C 42 38 37 44 34 50 Z"
              fill={hairColor}
            />
          )}

          {hairStyle === 'spiky' && (
            <g fill={hairColor}>
              {/* Base cap hair */}
              <path d="M 33 48 C 34 32 46 25 60 25 C 74 25 86 32 87 48 C 82 43 78 38 72 40 C 64 43 60 41 53 38 C 45 42 40 40 33 48 Z" />
              {/* Energetic gamer spikes */}
              <polygon points="40,29 45,15 50,27" />
              <polygon points="50,26 58,11 64,25" />
              <polygon points="63,25 72,13 77,28" />
              <polygon points="76,28 85,18 86,33" />
            </g>
          )}

          {hairStyle === 'curly' && (
            <g fill={hairColor}>
              {/* Bouncy curls along forehead and top */}
              <circle cx="36" cy="40" r="10" />
              <circle cx="48" cy="31" r="11" />
              <circle cx="60" cy="27" r="12" />
              <circle cx="72" cy="31" r="11" />
              <circle cx="84" cy="40" r="10" />
              <circle cx="42" cy="45" r="7" />
              <circle cx="78" cy="45" r="7" />
            </g>
          )}

          {hairStyle === 'long' && (
            <g fill={hairColor}>
              {/* Front bangs parted */}
              <path d="M 34 46 C 35 32 46 26 60 26 C 74 26 85 32 86 46 C 81 41 74 37 66 38 C 60 39 56 43 50 38 C 43 36 38 41 34 46 Z" />
            </g>
          )}

          {hairStyle === 'ponytail' && (
            <g fill={hairColor}>
              {/* Sleek pulled-back hair */}
              <path d="M 34 48 C 35 32 45 26 60 26 C 75 26 85 32 86 48 C 82 42 75 39 67 40 C 58 41 53 43 46 39 C 40 39 36 44 34 48 Z" />
            </g>
          )}

          {hairStyle === 'afro' && (
            <g fill={hairColor}>
              {/* Extra puffy frontal volume */}
              <circle cx="40" cy="38" r="9" />
              <circle cx="50" cy="30" r="10" />
              <circle cx="60" cy="27" r="11" />
              <circle cx="70" cy="30" r="10" />
              <circle cx="80" cy="38" r="9" />
            </g>
          )}

          {hairStyle === 'braids' && (
            <g fill={hairColor}>
              {/* Sleek braided top lines */}
              <path d="M 34 46 C 36 32 46 26 60 26 C 74 26 84 32 86 46 C 80 40 72 38 60 38 C 48 38 40 40 34 46 Z" />
              <line x1="48" y1="28" x2="44" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
              <line x1="60" y1="26" x2="60" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
              <line x1="72" y1="28" x2="76" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
            </g>
          )}

          {hairStyle === 'bald' && (
            <g>
              {/* Very fine shaved hair outline */}
              <path
                d="M 34 48 C 35 32 45 26 60 26 C 75 26 85 32 86 48"
                stroke={hairColor}
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
            </g>
          )}

          {/* GLASSES (Layered right on eye level) */}
          {glasses === 'round' && (
            <g stroke={glassesColor} strokeWidth="2.4" fill="none">
              {/* Round Frames */}
              <circle cx="48" cy="52" r="9" fill="#FFFFFF" fillOpacity="0.15" />
              <circle cx="72" cy="52" r="9" fill="#FFFFFF" fillOpacity="0.15" />
              {/* Bridge */}
              <path d="M 57 51 Q 60 48 63 51" strokeLinecap="round" />
              {/* Side arms */}
              <line x1="39" y1="51" x2="34" y2="53" strokeLinecap="round" />
              <line x1="81" y1="51" x2="86" y2="53" strokeLinecap="round" />
            </g>
          )}

          {glasses === 'square' && (
            <g stroke={glassesColor} strokeWidth="2.4" fill="none">
              {/* Square Frames */}
              <rect x="39" y="44" width="18" height="15" rx="3" fill="#FFFFFF" fillOpacity="0.15" />
              <rect x="63" y="44" width="18" height="15" rx="3" fill="#FFFFFF" fillOpacity="0.15" />
              {/* Bridge */}
              <line x1="57" y1="50" x2="63" y2="50" strokeLinecap="round" />
              {/* Side arms */}
              <line x1="39" y1="50" x2="34" y2="52" strokeLinecap="round" />
              <line x1="81" y1="50" x2="86" y2="52" strokeLinecap="round" />
            </g>
          )}

          {glasses === 'cool-shades' && (
            <g fill="url(#shades-grad)" stroke={glassesColor} strokeWidth="1.5">
              {/* Dark Cool Sunglasses */}
              <polygon points="37,45 58,45 56,58 41,58" />
              <polygon points="62,45 83,45 79,58 64,58" />
              {/* Bridge */}
              <line x1="58" y1="46" x2="62" y2="46" stroke={glassesColor} strokeWidth="2.5" />
              {/* White reflection glares */}
              <line x1="42" y1="48" x2="52" y2="55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
              <line x1="66" y1="48" x2="76" y2="55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            </g>
          )}

          {glasses === 'vr-headset' && (
            <g>
              {/* Side strap */}
              <line x1="30" y1="51" x2="90" y2="51" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
              {/* High-tech VR Visor */}
              <rect x="36" y="42" width="48" height="18" rx="6" fill="#0F172A" stroke={glassesColor} strokeWidth="2" />
              {/* Glowing Visor Screen */}
              <rect x="40" y="45" width="40" height="12" rx="3" fill="url(#vr-screen-grad)" />
              {/* VR Sensor dots */}
              <circle cx="43" cy="48" r="1.5" fill="#FFFFFF" />
              <circle cx="77" cy="48" r="1.5" fill="#FFFFFF" />
              {/* Cyan laser highlight */}
              <line x1="46" y1="51" x2="74" y2="51" stroke="#E0F2FE" strokeWidth="1.5" opacity="0.75" />
            </g>
          )}

          {/* HATS & HEADWEAR */}
          {hat === 'cap' && (
            <g fill={hatColor}>
              {/* Cap dome */}
              <path d="M 33 42 C 34 22 46 16 60 16 C 74 16 86 22 87 42 Z" />
              {/* Cap visor / bill facing forward */}
              <path
                d="M 28 41 C 28 41 45 44 60 44 C 75 44 92 41 92 41 C 94 45 84 48 60 48 C 36 48 26 45 28 41 Z"
                fill={hatColor}
                stroke="#0F172A"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
              {/* Cap button on top */}
              <circle cx="60" cy="16" r="3" fill="#FFFFFF" opacity="0.8" />
            </g>
          )}

          {hat === 'beanie' && (
            <g fill={hatColor}>
              {/* Ribbed beanie dome */}
              <path d="M 32 44 C 33 20 45 14 60 14 C 75 14 87 20 88 44 Z" />
              {/* Folded rim */}
              <rect x="30" y="38" width="60" height="9" rx="4" fill={hatColor} stroke="#0F172A" strokeWidth="1" strokeOpacity="0.2" />
              {/* Pompom on top */}
              <circle cx="60" cy="12" r="5" fill="#FFFFFF" opacity="0.9" />
            </g>
          )}

          {hat === 'headphones' && (
            <g>
              {/* Headband arch */}
              <path
                d="M 30 52 C 28 20 92 20 90 52"
                stroke={hatColor}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Top comfort cushion */}
              <path
                d="M 44 26 C 50 24 70 24 76 26"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              {/* Left Earcup */}
              <rect x="25" y="44" width="10" height="20" rx="5" fill={hatColor} stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="30" cy="54" r="3" fill="#06B6D4" />
              {/* Right Earcup */}
              <rect x="85" y="44" width="10" height="20" rx="5" fill={hatColor} stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="90" cy="54" r="3" fill="#06B6D4" />
              {/* Gamer Boom Microphone */}
              <path
                d="M 29 58 Q 36 70 48 68"
                stroke="#1E293B"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="48" cy="68" r="2.5" fill="#EF4444" />
            </g>
          )}

          {hat === 'crown' && (
            <g>
              {/* Golden Champion Crown */}
              <polygon
                points="34,42 36,24 48,34 60,18 72,34 84,24 86,42"
                fill="#F59E0B"
                stroke="#D97706"
                strokeWidth="1.5"
              />
              {/* Crown Base Rim */}
              <rect x="34" y="38" width="52" height="5" rx="2.5" fill="#D97706" />
              {/* Sparkling Gems */}
              <circle cx="60" cy="26" r="2.5" fill="#EF4444" />
              <circle cx="48" cy="36" r="2" fill="#3B82F6" />
              <circle cx="72" cy="36" r="2" fill="#10B981" />
              <circle cx="38" cy="30" r="1.8" fill="#EC4899" />
              <circle cx="82" cy="30" r="1.8" fill="#EC4899" />
            </g>
          )}

          {hat === 'wizard' && (
            <g fill={hatColor}>
              {/* Pointy wizard cone */}
              <polygon points="60,8 34,42 86,42" stroke="#0F172A" strokeWidth="1" strokeOpacity="0.2" />
              {/* Wide brim */}
              <ellipse cx="60" cy="42" rx="30" ry="6" fill={hatColor} stroke="#0F172A" strokeWidth="1" strokeOpacity="0.2" />
              {/* Golden star on wizard hat */}
              <polygon points="60,20 62,24 66,24 63,27 64,31 60,28 56,31 57,27 54,24 58,24" fill="#F59E0B" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
