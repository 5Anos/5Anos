import React, { useState } from 'react';
import {
  Sparkles,
  Shuffle,
  Check,
  X,
  Smile,
  Palette,
  Eye,
  Shirt,
  Headphones,
} from 'lucide-react';
import { AvatarConfig, Language } from '../../types';
import { CartoonAvatar } from './CartoonAvatar';
import {
  SKIN_COLORS,
  HAIR_STYLES,
  HAIR_COLORS,
  EXPRESSIONS,
  GLASSES_OPTIONS,
  HATS_OPTIONS,
  CLOTHING_OPTIONS,
  ACCESSORY_COLORS,
  BG_COLORS,
  PRESET_AVATARS,
  generateRandomAvatar,
  getDefaultAvatar,
} from '../../utils/avatarUtils';

interface AvatarCreatorModalProps {
  isOpen: boolean;
  initialAvatar?: AvatarConfig;
  onSave: (avatar: AvatarConfig) => void;
  onClose: () => void;
  language?: Language;
  title?: string;
}

type TabType = 'face' | 'hair' | 'glasses' | 'hat' | 'clothing' | 'background';

export const AvatarCreatorModal: React.FC<AvatarCreatorModalProps> = ({
  isOpen,
  initialAvatar,
  onSave,
  onClose,
  language = 'pt',
  title,
}) => {
  const [avatar, setAvatar] = useState<AvatarConfig>(() => initialAvatar || getDefaultAvatar());
  const [activeTab, setActiveTab] = useState<TabType>('face');
  const [justRandomized, setJustRandomized] = useState(false);

  React.useEffect(() => {
    if (isOpen && initialAvatar) {
      setAvatar(initialAvatar);
    }
  }, [isOpen, initialAvatar]);

  if (!isOpen) return null;

  const handleRandomize = () => {
    setAvatar(generateRandomAvatar());
    setJustRandomized(true);
    setTimeout(() => setJustRandomized(false), 600);
  };

  const handleApplyPreset = (presetConfig: AvatarConfig) => {
    setAvatar({ ...presetConfig });
  };

  const handleSave = () => {
    onSave(avatar);
    onClose();
  };

  const tabs: { id: TabType; labelPt: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'face', labelPt: 'Rosto & Pele', labelEn: 'Face & Skin', icon: <Smile className="w-4 h-4" /> },
    { id: 'hair', labelPt: 'Cabelo', labelEn: 'Hair', icon: <Eye className="w-4 h-4" /> },
    { id: 'glasses', labelPt: 'Óculos', labelEn: 'Glasses', icon: <span className="text-sm">👓</span> },
    { id: 'hat', labelPt: 'Chapéus & Fones', labelEn: 'Hats & Headset', icon: <Headphones className="w-4 h-4" /> },
    { id: 'clothing', labelPt: 'Roupa TIC', labelEn: 'Clothing', icon: <Shirt className="w-4 h-4" /> },
    { id: 'background', labelPt: 'Fundo', labelEn: 'Background', icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[780px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100">
        {/* Modal Header */}
        <div className="shrink-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-400/30 text-amber-100 border border-amber-300/30">
                {language === 'pt' ? 'Criador de Personagem' : 'Character Creator'}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {title || (language === 'pt' ? 'Estúdio de Avatar Cartoon 🎨' : 'Cartoon Avatar Studio 🎨')}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-slate-50/50">
          {/* LEFT SIDE: Big Avatar Live Stage & Presets */}
          <div className="md:col-span-5 p-4 sm:p-6 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col items-center justify-between overflow-y-auto">
            {/* Live Avatar Preview */}
            <div className="w-full flex flex-col items-center text-center">
              <div className="relative my-2 sm:my-4 group">
                {/* Glow ring */}
                <div
                  className="absolute -inset-3 rounded-full blur-xl opacity-40 transition-all duration-500"
                  style={{ backgroundColor: avatar.bgColor }}
                />

                {/* Animated Cartoon Avatar */}
                <div className={`relative transition-transform duration-300 ${justRandomized ? 'scale-110 rotate-3' : 'hover:scale-105'}`}>
                  <CartoonAvatar avatar={avatar} size={150} showBorder className="shadow-xl" />
                </div>

                <span className="absolute -bottom-2 right-2 bg-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-indigo-700 shadow-md border border-indigo-100">
                  {language === 'pt' ? 'Ao vivo!' : 'Live!'}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-800 mt-2">
                {language === 'pt' ? 'O teu Cartoon TIC' : 'Your ICT Cartoon'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mt-0.5">
                {language === 'pt'
                  ? 'Personaliza a pele, o cabelo, óculos e chapéus. Este avatar vai aparecer no teu perfil e no Ranking!'
                  : 'Customize skin, hair, glasses and hats. This avatar will appear on your profile and Leaderboard!'}
              </p>

              {/* Randomize Button */}
              <button
                type="button"
                onClick={handleRandomize}
                className="mt-3.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer border border-amber-400"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? '🎲 Baralhar (Aleatório)' : '🎲 Surprise Me (Random)'}</span>
              </button>
            </div>

            {/* Quick Presets Section */}
            <div className="w-full mt-4 pt-4 border-t border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2 text-center">
                {language === 'pt' ? '✨ Modelos Rápidos' : '✨ Quick Presets'}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.namePt}
                    type="button"
                    onClick={() => handleApplyPreset(preset.config)}
                    className="p-1.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 bg-white transition-all flex flex-col items-center text-center cursor-pointer shadow-2xs group"
                  >
                    <span className="text-base group-hover:scale-115 transition-transform">{preset.icon}</span>
                    <span className="text-[10px] font-extrabold text-slate-700 leading-tight mt-0.5 truncate w-full">
                      {language === 'pt' ? preset.namePt.split(' ')[0] : preset.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Customization Controls & Tabs */}
          <div className="md:col-span-7 flex flex-col h-full overflow-hidden bg-white">
            {/* Customization Tabs */}
            <div className="shrink-0 p-2 sm:p-3 border-b border-slate-200 bg-slate-50/80 overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-xs font-black scale-102'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {tab.icon}
                    <span>{language === 'pt' ? tab.labelPt : tab.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* TAB 1: FACE & SKIN */}
              {activeTab === 'face' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Skin Tone */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Tom de Pele' : 'Skin Tone'}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {SKIN_COLORS.map((skin) => (
                        <button
                          key={skin.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, skinColor: skin.id })}
                          className={`group relative p-1.5 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            avatar.skinColor === skin.id
                              ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <span
                            className="w-9 h-9 rounded-xl shadow-inner border border-black/10 flex items-center justify-center"
                            style={{ backgroundColor: skin.color }}
                          >
                            {avatar.skinColor === skin.id && (
                              <Check className="w-4 h-4 text-slate-900 drop-shadow-xs" />
                            )}
                          </span>
                          <span className="text-[10px] font-bold text-slate-700 leading-tight">
                            {skin.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expression */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Expressão do Rosto' : 'Facial Expression'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {EXPRESSIONS.map((expr) => (
                        <button
                          key={expr.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, expression: expr.id })}
                          className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all cursor-pointer ${
                            avatar.expression === expr.id
                              ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-black shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold'
                          }`}
                        >
                          <span className="text-2xl">{expr.icon}</span>
                          <span className="text-xs">{language === 'pt' ? expr.labelPt : expr.labelEn}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HAIR */}
              {activeTab === 'hair' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Hair Style */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Estilo de Cabelo' : 'Hair Style'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {HAIR_STYLES.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, hairStyle: style.id })}
                          className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 text-center transition-all cursor-pointer ${
                            avatar.hairStyle === style.id
                              ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-black shadow-xs scale-102'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold'
                          }`}
                        >
                          <span className="text-2xl">{style.icon}</span>
                          <span className="text-xs">{language === 'pt' ? style.labelPt : style.labelEn}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hair Color */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Cor do Cabelo' : 'Hair Color'}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {HAIR_COLORS.map((hColor) => (
                        <button
                          key={hColor.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, hairColor: hColor.id })}
                          className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            avatar.hairColor === hColor.id
                              ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <span
                            className="w-8 h-8 rounded-xl shadow-inner border border-black/15 flex items-center justify-center"
                            style={{ backgroundColor: hColor.color }}
                          >
                            {avatar.hairColor === hColor.id && (
                              <Check className="w-4 h-4 text-white drop-shadow-sm" />
                            )}
                          </span>
                          <span className="text-[10px] font-bold text-slate-700 text-center leading-tight truncate w-full">
                            {hColor.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: GLASSES */}
              {activeTab === 'glasses' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Tipo de Óculos' : 'Glasses Style'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {GLASSES_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, glasses: opt.id })}
                          className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                            avatar.glasses === opt.id
                              ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-black shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold'
                          }`}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="text-xs">{language === 'pt' ? opt.labelPt : opt.labelEn}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {avatar.glasses !== 'none' && (
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                        {language === 'pt' ? 'Cor da Armação / Acessório' : 'Frame Color'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {ACCESSORY_COLORS.map((col) => (
                          <button
                            key={col.id}
                            type="button"
                            onClick={() => setAvatar({ ...avatar, glassesColor: col.id })}
                            className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                              avatar.glassesColor === col.id
                                ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110'
                                : 'border-slate-200 hover:scale-105'
                            }`}
                            style={{ backgroundColor: col.color }}
                            title={col.label}
                          >
                            {avatar.glassesColor === col.id && (
                              <Check className={`w-4 h-4 ${col.id === '#FFFFFF' ? 'text-slate-900' : 'text-white'}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: HATS & HEADPHONES */}
              {activeTab === 'hat' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Acessório de Cabeça' : 'Headwear & Headsets'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {HATS_OPTIONS.map((hatOpt) => (
                        <button
                          key={hatOpt.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, hat: hatOpt.id })}
                          className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all cursor-pointer ${
                            avatar.hat === hatOpt.id
                              ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-black shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold'
                          }`}
                        >
                          <span className="text-2xl">{hatOpt.icon}</span>
                          <span className="text-xs">{language === 'pt' ? hatOpt.labelPt : hatOpt.labelEn}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {avatar.hat !== 'none' && (
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                        {language === 'pt' ? 'Cor do Chapéu / Fones' : 'Headwear Color'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {ACCESSORY_COLORS.map((col) => (
                          <button
                            key={col.id}
                            type="button"
                            onClick={() => setAvatar({ ...avatar, hatColor: col.id })}
                            className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                              avatar.hatColor === col.id
                                ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110'
                                : 'border-slate-200 hover:scale-105'
                            }`}
                            style={{ backgroundColor: col.color }}
                            title={col.label}
                          >
                            {avatar.hatColor === col.id && (
                              <Check className={`w-4 h-4 ${col.id === '#FFFFFF' ? 'text-slate-900' : 'text-white'}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: CLOTHING */}
              {activeTab === 'clothing' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Estilo de Roupa' : 'Clothing Style'}
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {CLOTHING_OPTIONS.map((cOpt) => (
                        <button
                          key={cOpt.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, clothing: cOpt.id })}
                          className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                            avatar.clothing === cOpt.id
                              ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-black shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold'
                          }`}
                        >
                          <span className="text-2xl">{cOpt.icon}</span>
                          <span className="text-xs">{language === 'pt' ? cOpt.labelPt : cOpt.labelEn}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Cor da Roupa' : 'Clothing Color'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ACCESSORY_COLORS.map((col) => (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, clothingColor: col.id })}
                          className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                            avatar.clothingColor === col.id
                              ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110'
                              : 'border-slate-200 hover:scale-105'
                          }`}
                          style={{ backgroundColor: col.color }}
                          title={col.label}
                        >
                          {avatar.clothingColor === col.id && (
                            <Check className={`w-4 h-4 ${col.id === '#FFFFFF' ? 'text-slate-900' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: BACKGROUND */}
              {activeTab === 'background' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 block">
                      {language === 'pt' ? 'Cor do Círculo de Fundo' : 'Background Color'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {BG_COLORS.map((bg) => (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => setAvatar({ ...avatar, bgColor: bg.id })}
                          className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                            avatar.bgColor === bg.id
                              ? 'border-indigo-600 ring-2 ring-indigo-200 scale-102 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-lg shadow-inner flex items-center justify-center shrink-0"
                            style={{ backgroundColor: bg.color }}
                          >
                            {avatar.bgColor === bg.id && <Check className="w-4 h-4 text-white" />}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{bg.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                {language === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'pt' ? 'Guardar Este Avatar ✨' : 'Save This Avatar ✨'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
