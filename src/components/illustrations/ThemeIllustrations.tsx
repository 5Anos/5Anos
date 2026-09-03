import React from 'react';

interface IllustrationProps {
  className?: string;
}

// 1. TIC na Sociedade Illustration
export const Theme1SocietyIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="socSky" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EEF2FF" />
        <stop offset="1" stopColor="#E0E7FF" />
      </linearGradient>
      <linearGradient id="socBuilding" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4338CA" />
        <stop offset="1" stopColor="#312E81" />
      </linearGradient>
      <linearGradient id="socHospital" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="socSchool" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
    {/* Background Base */}
    <rect width="400" height="200" rx="16" fill="url(#socSky)" />
    
    {/* Digital Grid Horizon Lines */}
    <path d="M0 160H400M20 175H380M50 190H350" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 4" />
    
    {/* Buildings: School, Hospital, Smart City */}
    {/* Left Building: School */}
    <rect x="35" y="80" width="70" height="85" rx="6" fill="url(#socSchool)" />
    <polygon points="70,55 25,80 115,80" fill="#059669" />
    <rect x="50" y="95" width="14" height="18" rx="2" fill="#D1FAE5" />
    <rect x="75" y="95" width="14" height="18" rx="2" fill="#D1FAE5" />
    <rect x="60" y="130" width="20" height="35" rx="2" fill="#065F46" />
    {/* School Tech Flag */}
    <circle cx="70" cy="42" r="8" fill="#10B981" />
    <text x="70" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">🎓</text>

    {/* Center High-Tech Smart City Hub */}
    <rect x="130" y="50" width="110" height="115" rx="8" fill="url(#socBuilding)" />
    <rect x="145" y="65" width="20" height="16" rx="3" fill="#A5B4FC" />
    <rect x="175" y="65" width="20" height="16" rx="3" fill="#A5B4FC" />
    <rect x="205" y="65" width="20" height="16" rx="3" fill="#A5B4FC" />
    <rect x="145" y="92" width="20" height="16" rx="3" fill="#A5B4FC" />
    <rect x="175" y="92" width="20" height="16" rx="3" fill="#A5B4FC" />
    <rect x="205" y="92" width="20" height="16" rx="3" fill="#A5B4FC" />
    {/* Antenna with digital pulses */}
    <line x1="185" y1="50" x2="185" y2="28" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
    <circle cx="185" cy="24" r="5" fill="#F59E0B" />
    <circle cx="185" cy="24" r="12" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
    <circle cx="185" cy="24" r="20" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />

    {/* Right Building: Smart Hospital / Health */}
    <rect x="265" y="70" width="85" height="95" rx="6" fill="url(#socHospital)" />
    <rect x="280" y="85" width="16" height="16" rx="2" fill="#E0F2FE" />
    <rect x="315" y="85" width="16" height="16" rx="2" fill="#E0F2FE" />
    <rect x="280" y="112" width="16" height="16" rx="2" fill="#E0F2FE" />
    <rect x="315" y="112" width="16" height="16" rx="2" fill="#E0F2FE" />
    {/* Health Cross icon */}
    <rect x="303" y="52" width="9" height="18" rx="2" fill="#EF4444" />
    <rect x="298" y="57" width="19" height="8" rx="2" fill="#EF4444" />

    {/* Electric Connected Transport / Car */}
    <rect x="150" y="165" width="55" height="18" rx="7" fill="#3B82F6" />
    <circle cx="163" cy="183" r="6" fill="#1E293B" />
    <circle cx="192" cy="183" r="6" fill="#1E293B" />
    <rect x="160" y="157" width="30" height="12" rx="4" fill="#93C5FD" />
    {/* WiFi pulse from car */}
    <path d="M171 150 Q175 146 179 150" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />

    {/* Digital Network Connection Lines */}
    <path d="M70 75 Q130 35 185 24" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M307 70 Q240 30 185 24" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M175 148 L185 50" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
  </svg>
);

// 2. Ergonomia Illustration (Postura correta e posto de trabalho saudável)
export const Theme2ErgonomicsIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ergoBg" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ECFDF5" />
        <stop offset="1" stopColor="#D1FAE5" />
      </linearGradient>
      <linearGradient id="chairGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#064E3B" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" rx="16" fill="url(#ergoBg)" />

    {/* Floor line */}
    <line x1="20" y1="180" x2="380" y2="180" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />

    {/* Desk (Secretária com altura correta) */}
    <rect x="220" y="100" width="130" height="12" rx="4" fill="#64748B" />
    <rect x="330" y="112" width="10" height="68" rx="2" fill="#94A3B8" />
    <rect x="240" y="112" width="10" height="68" rx="2" fill="#94A3B8" />

    {/* Monitor (Ao nível dos olhos, 50-70cm) */}
    <rect x="260" y="50" width="65" height="42" rx="4" fill="#0F172A" />
    <rect x="264" y="54" width="57" height="34" rx="2" fill="#38BDF8" />
    {/* Screen stand */}
    <rect x="288" y="92" width="9" height="10" fill="#475569" />
    <rect x="275" y="98" width="35" height="3" rx="1.5" fill="#334155" />
    {/* Eye distance guide (50-70 cm) */}
    <line x1="168" y1="62" x2="260" y2="62" stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
    <circle cx="168" cy="62" r="3" fill="#059669" />
    <text x="214" y="57" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">50-70 cm</text>

    {/* Ergonomic Chair (Cadeira com apoio lombar) */}
    <rect x="115" y="115" width="45" height="10" rx="4" fill="url(#chairGrad)" />
    <rect x="106" y="70" width="10" height="55" rx="5" fill="url(#chairGrad)" />
    {/* Lumbar cushion curve */}
    <path d="M116 95 Q122 100 116 105" stroke="#10B981" strokeWidth="3" fill="none" />
    {/* Chair base and gas cylinder */}
    <rect x="133" y="125" width="8" height="35" fill="#334155" />
    <circle cx="115" cy="175" r="5" fill="#1E293B" />
    <circle cx="160" cy="175" r="5" fill="#1E293B" />
    <line x1="115" y1="160" x2="160" y2="160" stroke="#334155" strokeWidth="4" />

    {/* Student Posture (Costas direitas, pés apoiados no chão, braços a 90°) */}
    {/* Head */}
    <circle cx="150" cy="45" r="14" fill="#FBBF24" />
    {/* Body / Torso (Reto a 90-100 graus) */}
    <path d="M148 59 L143 118" stroke="#1D4ED8" strokeWidth="12" strokeLinecap="round" />
    {/* Arms at 90 degrees */}
    <path d="M146 72 L180 88 L215 100" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* 90° angle marker on elbow */}
    <path d="M174 86 L182 92" stroke="#10B981" strokeWidth="2" />
    {/* Legs at 90 degrees */}
    <path d="M142 118 L185 118 L185 178" stroke="#1E3A8A" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Foot flat on floor */}
    <rect x="178" y="174" width="22" height="6" rx="3" fill="#0F172A" />

    {/* 20-20-20 Rule Badge (Pausas Ativas) */}
    <g transform="translate(20, 20)">
      <rect width="80" height="38" rx="10" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
      <text x="40" y="16" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">REGRA 20-20-20</text>
      <text x="40" y="30" textAnchor="middle" fill="#059669" fontSize="9">Pausas Ativas ⏱️</text>
    </g>

    {/* Natural light window symbol */}
    <g transform="translate(325, 15)">
      <circle cx="20" cy="20" r="14" fill="#FEF08A" />
      <path d="M20 2V8M20 32V38M2 20H8M32 20H38M7 7L12 12M28 28L33 33M7 33L12 28M28 12L33 7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 3. Navegar na Internet Illustration (Navegador seguro, HTTPS, pesquisa e rede)
export const Theme3InternetIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="netBg" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F0F9FF" />
        <stop offset="1" stopColor="#E0F2FE" />
      </linearGradient>
      <linearGradient id="browserBar" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" rx="16" fill="url(#netBg)" />

    {/* Background Network Nodes */}
    <circle cx="45" cy="45" r="5" fill="#38BDF8" opacity="0.6" />
    <circle cx="360" cy="45" r="6" fill="#38BDF8" opacity="0.6" />
    <circle cx="35" cy="165" r="4" fill="#38BDF8" opacity="0.6" />
    <circle cx="365" cy="160" r="5" fill="#38BDF8" opacity="0.6" />
    <line x1="45" y1="45" x2="100" y2="80" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="360" y1="45" x2="310" y2="80" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Modern Browser Window */}
    <rect x="50" y="25" width="300" height="150" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(2, 132, 199, 0.12))" />

    {/* Browser Tab & Title Bar */}
    <path d="M50 37 Q50 25 62 25 H338 Q350 25 350 37 V58 H50 Z" fill="#F8FAFC" />
    <circle cx="68" cy="42" r="4.5" fill="#EF4444" />
    <circle cx="82" cy="42" r="4.5" fill="#F59E0B" />
    <circle cx="96" cy="42" r="4.5" fill="#10B981" />

    {/* Active Tab */}
    <rect x="115" y="32" width="130" height="26" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="132" y="49" fill="#0369A1" fontSize="10" fontWeight="bold">🌐 Escola Segura .pt</text>

    {/* Address Bar (URL Bar with HTTPS green padlock) */}
    <rect x="65" y="65" width="270" height="28" rx="8" fill="#F1F5F9" stroke="#CBD5E1" />
    {/* Green padlock icon */}
    <g transform="translate(75, 71)">
      <rect x="2" y="6" width="12" height="9" rx="2" fill="#10B981" />
      <path d="M4 6V4A4 4 0 0 1 12 4V6" stroke="#10B981" strokeWidth="2" fill="none" />
    </g>
    <text x="96" y="83" fill="#047857" fontSize="11" fontWeight="bold">https://</text>
    <text x="135" y="83" fill="#1E293B" fontSize="11">www.seguranca-online.pt/pesquisa</text>

    {/* Search Input Simulation inside web page */}
    <rect x="85" y="108" width="230" height="34" rx="17" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5" />
    <circle cx="105" cy="125" r="6" stroke="#0284C7" strokeWidth="2" fill="none" />
    <line x1="110" y1="129" x2="116" y2="135" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
    <text x="125" y="129" fill="#64748B" fontSize="11">"pesquisa inteligente" site:.pt</text>
    {/* Safe Search Button */}
    <rect x="260" y="112" width="50" height="26" rx="13" fill="#0284C7" />
    <text x="285" y="129" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">BUSCA</text>

    {/* Floating Safety Shield */}
    <g transform="translate(315, 125)">
      <circle cx="18" cy="18" r="16" fill="#10B981" />
      <path d="M12 18L16 22L24 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// 4. Palavras-passe Seguras Illustration (Cofre digital, robustez e proteção)
export const Theme4PasswordsIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="passBg" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDF4FF" />
        <stop offset="1" stopColor="#FAE8FF" />
      </linearGradient>
      <linearGradient id="vaultGrad" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C1D95" />
        <stop offset="1" stopColor="#2E1065" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" rx="16" fill="url(#passBg)" />

    {/* Digital Shield Vault */}
    <path
      d="M200 25 L290 55 V110 Q290 160 200 185 Q110 160 110 110 V55 Z"
      fill="url(#vaultGrad)"
      stroke="#A855F7"
      strokeWidth="3"
      filter="drop-shadow(0 10px 20px rgba(168, 85, 247, 0.25))"
    />

    {/* Vault Rotating Combination Dial */}
    <circle cx="200" cy="105" r="42" fill="#3B0764" stroke="#C084FC" strokeWidth="3" />
    <circle cx="200" cy="105" r="32" fill="#581C87" />
    {/* Keyhole / Biometric core */}
    <circle cx="200" cy="100" r="8" fill="#FACC15" />
    <polygon points="196,104 204,104 207,118 193,118" fill="#FACC15" />
    {/* Dial tick marks */}
    <line x1="200" y1="67" x2="200" y2="73" stroke="#E9D5FF" strokeWidth="2" />
    <line x1="200" y1="137" x2="200" y2="143" stroke="#E9D5FF" strokeWidth="2" />
    <line x1="162" y1="105" x2="168" y2="105" stroke="#E9D5FF" strokeWidth="2" />
    <line x1="232" y1="105" x2="238" y2="105" stroke="#E9D5FF" strokeWidth="2" />

    {/* Interactive Password Strength Chips */}
    {/* Left Chip: Mais de 10 carateres */}
    <g transform="translate(18, 55)">
      <rect width="85" height="34" rx="8" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
      <text x="42" y="16" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">MÍNIMO 10+</text>
      <text x="42" y="28" textAnchor="middle" fill="#059669" fontSize="8">Carateres ✓</text>
    </g>

    {/* Left Chip 2: Letras e Números */}
    <g transform="translate(18, 105)">
      <rect width="85" height="34" rx="8" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
      <text x="42" y="16" textAnchor="middle" fill="#5B21B6" fontSize="9" fontWeight="bold">A-z & 0-9</text>
      <text x="42" y="28" textAnchor="middle" fill="#6D28D9" fontSize="8">Misturados ✓</text>
    </g>

    {/* Right Chip: Símbolos especiais */}
    <g transform="translate(297, 55)">
      <rect width="85" height="34" rx="8" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="42" y="16" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">SÍMBOLOS</text>
      <text x="42" y="28" textAnchor="middle" fill="#D97706" fontSize="8"># ! ? $ % ✓</text>
    </g>

    {/* Right Chip 2: Segredo Absoluto */}
    <g transform="translate(297, 105)">
      <rect width="85" height="34" rx="8" fill="#FFFFFF" stroke="#EF4444" strokeWidth="1.5" />
      <text x="42" y="16" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="bold">NUNCA PARTILHAR</text>
      <text x="42" y="28" textAnchor="middle" fill="#DC2626" fontSize="8">Nem com amigos 🔒</text>
    </g>
  </svg>
);

// 5. Direitos de Autor Illustration (Criação artística, respeito e Creative Commons)
export const Theme5CopyrightIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="copyBg" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFBEB" />
        <stop offset="1" stopColor="#FEF3C7" />
      </linearGradient>
      <linearGradient id="artCanvas" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" rx="16" fill="url(#copyBg)" />

    {/* Artist / Creator Easel Canvas */}
    <rect x="55" y="45" width="105" height="115" rx="8" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
    {/* Artwork inside canvas: Sun and Mountains */}
    <rect x="63" y="53" width="89" height="75" rx="4" fill="#E0F2FE" />
    <circle cx="85" cy="73" r="10" fill="#FBBF24" />
    <polygon points="63,128 95,95 125,128" fill="#10B981" />
    <polygon points="100,128 128,102 152,128" fill="#059669" />
    {/* Author signature stamp */}
    <rect x="65" y="135" width="40" height="15" rx="3" fill="#FEF3C7" />
    <text x="85" y="146" textAnchor="middle" fill="#92400E" fontSize="8" fontWeight="bold">Autor: João 🎨</text>

    {/* Big Glowing Copyright Badge © */}
    <circle cx="205" cy="95" r="36" fill="#D97706" stroke="#FDE68A" strokeWidth="4" filter="drop-shadow(0 6px 12px rgba(217, 119, 6, 0.3))" />
    <text x="205" y="111" textAnchor="middle" fill="#FFFFFF" fontSize="42" fontWeight="bold" fontFamily="sans-serif">©</text>

    {/* Right Card: Creative Commons & Ethical Attribution */}
    <rect x="255" y="45" width="115" height="115" rx="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
    <rect x="265" y="55" width="95" height="26" rx="6" fill="#D1FAE5" />
    <text x="312" y="72" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">USO CORRETO ✓</text>

    <text x="268" y="98" fill="#1E293B" fontSize="9" fontWeight="bold">1. Pedir autorização</text>
    <text x="268" y="114" fill="#1E293B" fontSize="9" fontWeight="bold">2. Citar o autor original</text>
    <text x="268" y="130" fill="#1E293B" fontSize="9" fontWeight="bold">3. Não fazer plágio</text>

    <g transform="translate(330, 130)">
      <circle cx="15" cy="15" r="12" fill="#10B981" />
      <text x="15" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">CC</text>
    </g>
  </svg>
);

// 6. Referências Bibliográficas Illustration (Fontes fiáveis, livros, web e citação)
export const Theme6ReferencesIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="refBg" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5F3FF" />
        <stop offset="1" stopColor="#EDE9FE" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" rx="16" fill="url(#refBg)" />

    {/* Open Printed Book (Fonte Tradicional) */}
    <g transform="translate(45, 60)">
      <path d="M10 20 C35 12 70 12 85 20 L85 90 C70 82 35 82 10 90 Z" fill="#FFFFFF" stroke="#6D28D9" strokeWidth="2" />
      <path d="M85 20 C100 12 135 12 160 20 L160 90 C135 82 100 82 85 90 Z" fill="#F8FAFC" stroke="#6D28D9" strokeWidth="2" />
      {/* Book spine line */}
      <line x1="85" y1="18" x2="85" y2="92" stroke="#4C1D95" strokeWidth="3" />
      {/* Book text lines */}
      <line x1="22" y1="35" x2="72" y2="35" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="22" y1="48" x2="65" y2="48" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="22" y1="61" x2="70" y2="61" stroke="#CBD5E1" strokeWidth="2" />

      <line x1="98" y1="35" x2="148" y2="35" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="98" y1="48" x2="140" y2="48" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="98" y1="61" x2="145" y2="61" stroke="#CBD5E1" strokeWidth="2" />
      <text x="47" y="78" fill="#7C3AED" fontSize="8" fontWeight="bold">📖 Livro Impresso</text>
    </g>

    {/* Citation Card: A Fórmula Mágica da Referência */}
    <g transform="translate(225, 35)">
      <rect width="145" height="135" rx="10" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(139, 92, 246, 0.15))" />
      <rect x="10" y="10" width="125" height="22" rx="5" fill="#DDD6FE" />
      <text x="72" y="25" textAnchor="middle" fill="#5B21B6" fontSize="9" fontWeight="bold">ELEMENTOS DA CITAÇÃO</text>

      {/* 4 Essential blocks */}
      <rect x="12" y="40" width="121" height="18" rx="4" fill="#EEF2FF" />
      <text x="18" y="53" fill="#4338CA" fontSize="9" fontWeight="bold">1. AUTOR (Quem escreveu?)</text>

      <rect x="12" y="63" width="121" height="18" rx="4" fill="#F0FDF4" />
      <text x="18" y="76" fill="#15803D" fontSize="9" fontWeight="bold">2. ANO (Quando foi publicado?)</text>

      <rect x="12" y="86" width="121" height="18" rx="4" fill="#FFFBEB" />
      <text x="18" y="99" fill="#B45309" fontSize="9" fontWeight="bold">3. TÍTULO (Nome da obra)</text>

      <rect x="12" y="109" width="121" height="18" rx="4" fill="#FAF5FF" />
      <text x="18" y="122" fill="#7E22CE" fontSize="9" fontWeight="bold">4. FONTE (Site ou Editora)</text>
    </g>

    {/* Magnifier inspecting citation */}
    <g transform="translate(195, 115)">
      <circle cx="16" cy="16" r="14" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="3" />
      <line x1="26" y1="26" x2="38" y2="38" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" />
      <text x="16" y="21" textAnchor="middle" fill="#7C3AED" fontSize="12">🔎</text>
    </g>
  </svg>
);

// Map of all theme illustrations
export const ThemeIllustration: React.FC<{ themeId: string; className?: string }> = ({ themeId, className }) => {
  switch (themeId) {
    case 'tic-sociedade':
    case 'seguranca-digital':
      return <Theme1SocietyIllustration className={className} />;
    case 'ergonomia':
    case 'correio-eletronico':
      return <Theme2ErgonomicsIllustration className={className} />;
    case 'navegar-internet':
    case 'pesquisa-informacao':
      return <Theme3InternetIllustration className={className} />;
    case 'palavras-passe':
      return <Theme4PasswordsIllustration className={className} />;
    case 'direitos-autor':
      return <Theme5CopyrightIllustration className={className} />;
    case 'referencias-fontes':
    case 'referencias-bibliograficas':
      return <Theme6ReferencesIllustration className={className} />;
    default:
      return <Theme1SocietyIllustration className={className} />;
  }
};
