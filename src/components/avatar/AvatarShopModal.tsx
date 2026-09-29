import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Check,
  Lock,
  X,
  Palette,
  Eye,
  Crown,
  Headphones,
  Glasses,
  Backpack,
  Rocket
} from 'lucide-react';
import { User, Language, AvatarConfig } from '../../types';
import { CartoonAvatar } from './CartoonAvatar';
import { soundEffects } from '../../utils/soundEffects';
import { ticoFeedback } from '../../utils/ticoEvents';

export interface ShopItem {
  id: string;
  name: { pt: string; en: string };
  category: 'glasses' | 'hat' | 'themeBackground';
  icon: string;
  requiredXp: number;
  configPatch: Partial<AvatarConfig>;
  bgClass?: string;
  description: { pt: string; en: string };
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'scientist-glasses',
    name: { pt: 'Óculos de Cientista Digital', en: 'Digital Scientist Glasses' },
    category: 'glasses',
    icon: '🔬',
    requiredXp: 50,
    configPatch: { glasses: 'round', glassesColor: '#0284C7' },
    description: {
      pt: 'Para os alunos que analisam cada detalhe de cibersegurança e hardware!',
      en: 'For students who analyze cybersecurity and hardware details!',
    },
  },
  {
    id: 'cool-shades',
    name: { pt: 'Óculos Escuros Cyber', en: 'Cyber Sunglasses' },
    category: 'glasses',
    icon: '🕶️',
    requiredXp: 75,
    configPatch: { glasses: 'cool-shades', glassesColor: '#0F172A' },
    description: {
      pt: 'Proteção contra reflexos e estilo digital 100%!',
      en: 'Glare protection and 100% digital style!',
    },
  },
  {
    id: 'vr-headset',
    name: { pt: 'Óculos VR de Realidade Virtual', en: 'VR Virtual Reality Headset' },
    category: 'glasses',
    icon: '🥽',
    requiredXp: 120,
    configPatch: { glasses: 'vr-headset', glassesColor: '#4F46E5' },
    description: {
      pt: 'Acesso às tecnologias do futuro e metaverso educativo!',
      en: 'Access to future technologies and educational metaverse!',
    },
  },
  {
    id: 'gamer-headset',
    name: { pt: 'Auriculares Gamer com Micro', en: 'Gamer Headset with Mic' },
    category: 'hat',
    icon: '🎧',
    requiredXp: 100,
    configPatch: { hat: 'headphones', hatColor: '#10B981' },
    description: {
      pt: 'Comunicação limpa e foco nos desafios pedagógicos!',
      en: 'Clear communication and focus on educational challenges!',
    },
  },
  {
    id: 'golden-crown',
    name: { pt: 'Coroa Dourada de Mestre TIC', en: 'Golden ICT Master Crown' },
    category: 'hat',
    icon: '👑',
    requiredXp: 200,
    configPatch: { hat: 'crown', hatColor: '#F59E0B' },
    description: {
      pt: 'A insígnia máxima reservada aos líderes de pontos da turma!',
      en: 'The ultimate insignia reserved for top class achievers!',
    },
  },
  {
    id: 'space-wizard',
    name: { pt: 'Capacete Mágico Espacial', en: 'Cosmic Wizard Hat' },
    category: 'hat',
    icon: '🧙‍♂️',
    requiredXp: 150,
    configPatch: { hat: 'wizard', hatColor: '#8B5CF6' },
    description: {
      pt: 'Mestre da programação e exploração digital!',
      en: 'Master of coding and digital exploration!',
    },
  },
  {
    id: 'bg-matrix',
    name: { pt: 'Fundo Verde Matrix', en: 'Green Matrix Background' },
    category: 'themeBackground',
    icon: '💻',
    requiredXp: 80,
    configPatch: { bgColor: '#052E16' },
    bgClass: 'from-emerald-950 via-slate-900 to-black',
    description: {
      pt: 'Estilo código binário de hacker ético!',
      en: 'Binary code style of ethical hacker!',
    },
  },
  {
    id: 'bg-galaxy',
    name: { pt: 'Fundo Galáxia Cósmica', en: 'Cosmic Galaxy Background' },
    category: 'themeBackground',
    icon: '🌌',
    requiredXp: 130,
    configPatch: { bgColor: '#1E1B4B' },
    bgClass: 'from-indigo-950 via-purple-950 to-slate-950',
    description: {
      pt: 'Navega pelas estrelas do conhecimento digital!',
      en: 'Sail across the stars of digital knowledge!',
    },
  },
  {
    id: 'bg-gold',
    name: { pt: 'Fundo Ouro Real', en: 'Royal Gold Background' },
    category: 'themeBackground',
    icon: '✨',
    requiredXp: 250,
    configPatch: { bgColor: '#78350F' },
    bgClass: 'from-amber-950 via-yellow-950 to-amber-900',
    description: {
      pt: 'Cartão de Aluno dourado de distinção escolar!',
      en: 'Golden student ID card of school honors!',
    },
  },
];

interface AvatarShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  language?: Language;
  onSaveAvatar: (newAvatar: AvatarConfig) => void;
}

export const AvatarShopModal: React.FC<AvatarShopModalProps> = ({
  isOpen,
  onClose,
  user,
  language = 'pt',
  onSaveAvatar,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'glasses' | 'hat' | 'themeBackground'>('all');
  const [previewAvatar, setPreviewAvatar] = useState<AvatarConfig>(
    user?.avatar || {
      skinColor: '#FDDFBA',
      hairStyle: 'short',
      hairColor: '#18181B',
      expression: 'smile',
      glasses: 'none',
      glassesColor: '#1E293B',
      hat: 'none',
      hatColor: '#4F46E5',
      clothing: 'tshirt',
      clothingColor: '#4F46E5',
      bgColor: '#6366F1',
    }
  );

  if (!isOpen) return null;

  const userXp = user?.points || 0;
  const filteredItems = SHOP_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const handleEquipItem = (item: ShopItem) => {
    if (userXp < item.requiredXp) {
      soundEffects.playClick();
      ticoFeedback.triggerWrong(
        language === 'pt'
          ? `Precisas de ${item.requiredXp} XP para desbloquear este item! Continua a estudar!`
          : `You need ${item.requiredXp} XP to unlock this item! Keep studying!`
      );
      return;
    }

    soundEffects.playSuccess();
    const updated = { ...previewAvatar, ...item.configPatch };
    setPreviewAvatar(updated);
    onSaveAvatar(updated);
    ticoFeedback.triggerCorrect();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-[2.5rem] shadow-2xl border-2 border-indigo-500/40 text-white overflow-hidden my-auto animate-in zoom-in-95 flex flex-col md:flex-row">
        {/* Left Side: Avatar Live Preview & Profile Card */}
        <div className="w-full md:w-80 bg-linear-to-b from-indigo-950 to-slate-950 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-white/10 text-center">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
              {language === 'pt' ? 'Provador Virtual' : 'Virtual Dressing Room'}
            </span>
            <h3 className="text-lg font-black text-white">
              {user?.name || (language === 'pt' ? 'O teu Avatar' : 'Your Avatar')}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'pt' ? 'Vê os teus novos itens equipados em tempo real!' : 'Preview your equipped items in real time!'}
            </p>
          </div>

          {/* Large Live Avatar Preview */}
          <div className="my-6 relative">
            <div className="w-36 h-36 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/30 flex items-center justify-center">
              <CartoonAvatar avatar={previewAvatar} size={128} />
            </div>
            <span className="absolute -bottom-2 -right-1 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{userXp} XP</span>
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 w-full text-xs text-slate-300">
            <p className="font-bold text-amber-300 mb-0.5">
              💡 {language === 'pt' ? 'XP Vitalício' : 'Lifetime XP'}
            </p>
            <p className="text-[11px] leading-snug">
              {language === 'pt'
                ? 'Os itens desbloqueiam permanentemente à medida que ganhas XP, sem gastares o teu lugar no ranking!'
                : 'Items unlock permanently without losing your leaderboard score!'}
            </p>
          </div>
        </div>

        {/* Right Side: Store Catalog */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl shadow-inner border border-amber-300/30">
                🛍️
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {language === 'pt' ? 'Loja Educativa TIC' : 'ICT Educational Shop'}
                </h2>
                <p className="text-xs text-slate-400">
                  {language === 'pt' ? 'Desbloqueia acessórios e fundos exclusivos' : 'Unlock exclusive accessories and cards'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              {language === 'pt' ? 'Todos os Itens' : 'All Items'}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('glasses')}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                activeCategory === 'glasses' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              👓 {language === 'pt' ? 'Óculos' : 'Glasses'}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('hat')}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                activeCategory === 'hat' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              👑 {language === 'pt' ? 'Capacetes & Coroas' : 'Hats & Crowns'}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('themeBackground')}
              className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                activeCategory === 'themeBackground' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              🎨 {language === 'pt' ? 'Fundos de Cartão' : 'Card Backgrounds'}
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isUnlocked = userXp >= item.requiredXp;
              const isEquipped =
                (item.category === 'glasses' && previewAvatar.glasses === item.configPatch.glasses) ||
                (item.category === 'hat' && previewAvatar.hat === item.configPatch.hat) ||
                (item.category === 'themeBackground' && previewAvatar.bgColor === item.configPatch.bgColor);

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    isEquipped
                      ? 'bg-indigo-950/70 border-indigo-400 ring-2 ring-indigo-400/40'
                      : isUnlocked
                      ? 'bg-white/10 hover:bg-white/15 border-white/20'
                      : 'bg-white/5 border-white/10 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-1.5 rounded-xl bg-white/10">{item.icon}</span>
                      <div>
                        <h4 className="font-black text-xs sm:text-sm text-white leading-tight">
                          {item.name[language]}
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 mt-0.5">
                          {item.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span
                      className={`text-xs font-black ${
                        isUnlocked ? 'text-amber-300' : 'text-slate-400 flex items-center gap-1'
                      }`}
                    >
                      {!isUnlocked && <Lock className="w-3 h-3" />}
                      <span>{item.requiredXp} XP</span>
                    </span>

                    <button
                      type="button"
                      disabled={!isUnlocked}
                      onClick={() => handleEquipItem(item)}
                      className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                        isEquipped
                          ? 'bg-emerald-500 text-white cursor-default'
                          : isUnlocked
                          ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-md hover:scale-105'
                          : 'bg-white/10 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {isEquipped
                        ? (language === 'pt' ? '✓ Equipado' : '✓ Equipped')
                        : isUnlocked
                        ? (language === 'pt' ? 'Equipar' : 'Equip')
                        : (language === 'pt' ? 'Bloqueado' : 'Locked')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Close button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              {language === 'pt' ? 'Guardar & Fechar' : 'Save & Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
