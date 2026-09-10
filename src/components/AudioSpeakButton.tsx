import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { speechService } from '../utils/speech';

interface AudioSpeakButtonProps {
  id: string;
  text: string;
  language?: 'pt' | 'en';
  label?: string;
  stopLabel?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'pill' | 'icon' | 'inline';
  className?: string;
}

export const AudioSpeakButton: React.FC<AudioSpeakButtonProps> = ({
  id,
  text,
  language = 'pt',
  label,
  stopLabel,
  size = 'sm',
  variant = 'pill',
  className = '',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((currentSpeakingId) => {
      setIsSpeaking(currentSpeakingId === id);
    });
    return () => unsubscribe();
  }, [id]);

  if (!speechService.isSupported() || !text || !text.trim()) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.speak(id, text, language);
  };

  const defaultTitle = isSpeaking
    ? language === 'pt' ? 'Parar leitura' : 'Stop reading'
    : language === 'pt' ? 'Ouvir em voz alta' : 'Read aloud';

  // Sizing definitions
  const iconSize = size === 'xs' ? 'w-3.5 h-3.5' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={defaultTitle}
        aria-label={defaultTitle}
        className={`inline-flex items-center justify-center rounded-full transition-all cursor-pointer shrink-0 ${
          size === 'xs' ? 'w-6 h-6' : size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'
        } ${
          isSpeaking
            ? 'bg-rose-500 text-white ring-2 ring-rose-300 animate-pulse shadow-xs'
            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 border border-indigo-200/70'
        } ${className}`}
      >
        {isSpeaking ? <Square className={iconSize} /> : <Volume2 className={iconSize} />}
      </button>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={defaultTitle}
        aria-label={defaultTitle}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-2 py-1 transition-all cursor-pointer shrink-0 ${
          isSpeaking
            ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
        } ${className}`}
      >
        {isSpeaking ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        <span>
          {isSpeaking
            ? stopLabel || (language === 'pt' ? 'A ler...' : 'Reading...')
            : label || (language === 'pt' ? 'Ouvir' : 'Listen')}
        </span>
      </button>
    );
  }

  // Variant === 'pill'
  const padding = size === 'xs' ? 'px-2 py-0.5 text-xs' : size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm';

  return (
    <button
      type="button"
      onClick={handleClick}
      title={defaultTitle}
      aria-label={defaultTitle}
      className={`inline-flex items-center gap-1.5 font-bold rounded-full transition-all cursor-pointer shrink-0 border ${padding} ${
        isSpeaking
          ? 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-300 shadow-xs animate-pulse'
          : 'bg-indigo-50/90 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 border-indigo-200 shadow-2xs'
      } ${className}`}
    >
      {isSpeaking ? <Square className={iconSize} /> : <Volume2 className={iconSize} />}
      <span>
        {isSpeaking
          ? stopLabel || (language === 'pt' ? 'Parar' : 'Stop')
          : label || (language === 'pt' ? 'Ouvir' : 'Listen')}
      </span>
    </button>
  );
};
