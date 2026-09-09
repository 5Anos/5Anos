import React, { useState } from 'react';
import {
  ExternalLink,
  Image as ImageIcon,
  Music,
  Volume2,
  Palette,
  Globe,
  Sparkles,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface MediaBank {
  id: string;
  name: string;
  category: 'images' | 'audio' | 'icons' | 'all';
  typeLabel: { pt: string; en: string };
  licenseBadge: { pt: string; en: string };
  description: { pt: string; en: string };
  tip: { pt: string; en: string };
  url: string;
  badgeColor: string;
}

const MEDIA_BANKS: MediaBank[] = [
  // Images
  {
    id: 'pixabay',
    name: 'Pixabay',
    category: 'images',
    typeLabel: { pt: 'Fotos e Ilustrações', en: 'Photos & Illustrations' },
    licenseBadge: { pt: 'Livre / Gratuito', en: 'Free / Safe' },
    description: {
      pt: 'Milhares de fotos, ilustrações e desenhos gratuitos de alta qualidade para usares nos teus trabalhos.',
      en: 'Thousands of free high quality photos and illustrations for your school projects.',
    },
    tip: {
      pt: 'Podes descarregar sem precisar de registo ou pagamento.',
      en: 'Download freely without registration.',
    },
    url: 'https://pixabay.com',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    category: 'images',
    typeLabel: { pt: 'Fotografia Real', en: 'Real Photography' },
    licenseBadge: { pt: 'Utilização Livre', en: 'Free to Use' },
    description: {
      pt: 'Fotografias reais fantásticas de natureza, cidades, tecnologia e animais criadas por fotógrafos de todo o mundo.',
      en: 'Awesome real photos of nature, cities, tech, and animals from creators worldwide.',
    },
    tip: {
      pt: 'Excelente para fundos de apresentações do PowerPoint ou Canva.',
      en: 'Great for presentation slides in PowerPoint or Canva.',
    },
    url: 'https://unsplash.com',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    id: 'pexels',
    name: 'Pexels',
    category: 'images',
    typeLabel: { pt: 'Fotos e Vídeos Curtos', en: 'Photos & Short Videos' },
    licenseBadge: { pt: '100% Gratuito', en: '100% Free' },
    description: {
      pt: 'Banco de imagens e vídeos gratuitos fáceis de pesquisar por temas escolares (espaço, história, ciências).',
      en: 'Free images and videos easy to search by school topics.',
    },
    tip: {
      pt: 'Todas as fotos podem ser usadas gratuitamente em trabalhos da escola.',
      en: 'All photos can be used freely for school assignments.',
    },
    url: 'https://www.pexels.com',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
  },
  {
    id: 'wikimedia',
    name: 'Wikimedia Commons',
    category: 'images',
    typeLabel: { pt: 'Educação e Ciência', en: 'Education & Science' },
    licenseBadge: { pt: 'Creative Commons / Domínio Público', en: 'Creative Commons / Public Domain' },
    description: {
      pt: 'A maior biblioteca educativa do mundo com mapas históricos, diagramas científicos e fotos de monumentos.',
      en: 'World largest educational library with historical maps, diagrams, and monuments.',
    },
    tip: {
      pt: 'Lembra-te de verificar a licença e citar o autor no fim do trabalho.',
      en: 'Remember to check the license and cite the author.',
    },
    url: 'https://commons.wikimedia.org',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },

  // Audio / Sound
  {
    id: 'freesound',
    name: 'Freesound',
    category: 'audio',
    typeLabel: { pt: 'Efeitos Sonoros', en: 'Sound Effects' },
    licenseBadge: { pt: 'Sons Creative Commons', en: 'Creative Commons Sounds' },
    description: {
      pt: 'Milhares de barulhos e efeitos reais: chuva, passos, campainhas, robôs, animais e cliques para jogos ou vídeos.',
      en: 'Thousands of sound FX: rain, steps, bells, robots, animals, and game noises.',
    },
    tip: {
      pt: 'Ideal para colocar som em projetos de Scratch ou apresentações!',
      en: 'Perfect for Scratch games or video projects!',
    },
    url: 'https://freesound.org',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    id: 'freemusicarchive',
    name: 'Free Music Archive (FMA)',
    category: 'audio',
    typeLabel: { pt: 'Música de Fundo', en: 'Background Music' },
    licenseBadge: { pt: 'Música Livre (CC)', en: 'Free Music (CC)' },
    description: {
      pt: 'Músicas instrumentais completas de vários estilos (calma, alegre, aventura, eletrónica) para vídeos escolares.',
      en: 'Complete instrumental music in various genres for school videos.',
    },
    tip: {
      pt: 'Permite ouvir a faixa completa antes de transferires para o teu computador.',
      en: 'Preview full tracks before downloading to your computer.',
    },
    url: 'https://freemusicarchive.org',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
  },
  {
    id: 'bensound',
    name: 'Bensound',
    category: 'audio',
    typeLabel: { pt: 'Trilhas Sonoras', en: 'Soundtracks' },
    licenseBadge: { pt: 'Gratuito com Crédito', en: 'Free with Credit' },
    description: {
      pt: 'Músicas agradáveis e acústicas prontas a usar em trabalhos e podcasts da escola.',
      en: 'Nice acoustic and happy tunes ready for school podcasts and videos.',
    },
    tip: {
      pt: 'Só precisas de escrever no teu trabalho: "Música: Bensound.com".',
      en: 'Just add credit: "Music: Bensound.com" to your slides or video description.',
    },
    url: 'https://www.bensound.com/free-music-for-videos',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
  },

  // Icons / Graphics
  {
    id: 'flaticon',
    name: 'Flaticon',
    category: 'icons',
    typeLabel: { pt: 'Ícones e Vetores', en: 'Icons & Vectors' },
    licenseBadge: { pt: 'Ícones Gratuitos', en: 'Free Icons' },
    description: {
      pt: 'Milhões de pequenos símbolos e autocolantes coloridos para enfeitar capas de trabalhos, posters e cartazes.',
      en: 'Millions of small colorful symbols and stickers to decorate school posters and slides.',
    },
    tip: {
      pt: 'Podes descarregar em formato PNG com fundo transparente.',
      en: 'Download as transparent PNG ready to paste.',
    },
    url: 'https://www.flaticon.com',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'openverse',
    name: 'Openverse',
    category: 'all',
    typeLabel: { pt: 'Imagens e Áudios Abertos', en: 'Open Images & Audio' },
    licenseBadge: { pt: 'Domínio Público / CC', en: 'Public Domain / CC' },
    description: {
      pt: 'Motor de pesquisa com mais de 700 milhões de imagens e ficheiros de áudio sob licenças abertas e gratuitas.',
      en: 'Search engine with over 700 million open licensed images and audio files.',
    },
    tip: {
      pt: 'Mostra logo como deves copiar a citação correta da licença.',
      en: 'Automatically shows how to copy the exact citation credit.',
    },
    url: 'https://openverse.org',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
];

export const FreeMediaBanks: React.FC<{ language: 'pt' | 'en' }> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'images' | 'audio' | 'icons'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBanks = MEDIA_BANKS.filter((bank) => {
    const matchesCategory =
      selectedCategory === 'all' || bank.category === selectedCategory || (bank.category === 'all' && selectedCategory !== 'all');
    const matchesSearch =
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.typeLabel[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 space-y-5 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs sm:text-sm">
            <Globe className="w-4 h-4" />
            <span>{language === 'pt' ? 'Recursos Seguros para a Escola' : 'Safe Resources for School'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {language === 'pt'
              ? 'Bancos de Imagens, Sons e Músicas Gratuitas'
              : 'Free Image, Sound & Music Libraries'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            {language === 'pt'
              ? 'Sites confiáveis onde podes encontrar materiais legais e gratuitos para os teus trabalhos de TIC:'
              : 'Trusted websites where you can find free and legal media for your school projects:'}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'pt' ? 'Pesquisar banco de dados...' : 'Search resource...'}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'pt' ? 'Todos os Recursos' : 'All Resources'}</span>
          <span className="text-[10px] opacity-75 px-1.5 py-0.2 rounded-full bg-white/20">
            {MEDIA_BANKS.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('images')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            selectedCategory === 'images'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{language === 'pt' ? 'Imagens & Fotos' : 'Images & Photos'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('audio')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            selectedCategory === 'audio'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-800'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>{language === 'pt' ? 'Músicas & Efeitos Sonoros' : 'Music & Sounds'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategory('icons')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            selectedCategory === 'icons'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{language === 'pt' ? 'Ícones & Ilustrações' : 'Icons & Graphics'}</span>
        </button>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBanks.map((bank) => (
          <div
            key={bank.id}
            className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-4 shadow-2xs hover:shadow-md transition-all duration-200 space-y-3"
          >
            <div>
              {/* Header: Name + Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-black text-slate-900 text-base">{bank.name}</h4>
                  <span className="text-[11px] font-bold text-indigo-600 block">
                    {bank.typeLabel[language]}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold shrink-0 ${bank.badgeColor}`}
                >
                  {bank.licenseBadge[language]}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium mt-2.5">
                {bank.description[language]}
              </p>

              {/* Quick tip box */}
              <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-150 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-700 font-medium">
                  {bank.tip[language]}
                </span>
              </div>
            </div>

            {/* Action Link Button */}
            <a
              href={bank.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors group cursor-pointer"
            >
              <span>{language === 'pt' ? 'Abrir' : 'Open'} {bank.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        ))}
      </div>

      {/* Safety Notice Footer */}
      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-2.5 text-xs text-indigo-950 font-medium">
        <span className="text-base">💡</span>
        <span>
          {language === 'pt'
            ? 'Regra de ouro: Mesmo usando estes bancos gratuitos, anota sempre o nome do site ou do autor para colocares na bibliografia do teu trabalho!'
            : 'Golden rule: Even with free libraries, always save the website or author name to include in your bibliography!'}
        </span>
      </div>
    </div>
  );
};
