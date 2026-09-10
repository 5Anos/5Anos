import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Square, Sparkles, HelpCircle, Radio } from 'lucide-react';
import { speechService } from '../utils/speech';
import { Language } from '../types';

interface AudioAccessibilityBarProps {
  language: Language;
  currentScreenDescription?: string;
}

export const AudioAccessibilityBar: React.FC<AudioAccessibilityBarProps> = ({
  language,
  currentScreenDescription,
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(speechService.isGlobalAudio());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const unsubSpeaking = speechService.subscribe((id) => setSpeakingId(id));
    const unsubGlobal = speechService.subscribeGlobalAudio((enabled) => setIsAudioEnabled(enabled));
    return () => {
      unsubSpeaking();
      unsubGlobal();
    };
  }, []);

  const isSpeaking = speakingId !== null;

  const handleToggleSound = () => {
    const nextState = speechService.toggleGlobalAudio();
    if (nextState) {
      const welcomeText =
        language === 'pt'
          ? 'Som ativado! Podes clicar nos botões de altifalante para ouvir o texto ou clicar em Ouvir Ecrã para te ler o que deves fazer.'
          : 'Sound enabled! Click on speaker buttons or click Listen to Screen to hear what to do.';
      speechService.speak('global-welcome', welcomeText, language);
    } else {
      speechService.stop();
    }
  };

  const handleReadCurrentScreen = () => {
    if (!speechService.isGlobalAudio()) {
      speechService.setGlobalAudio(true);
    }

    const defaultText =
      language === 'pt'
        ? 'Estás na plataforma TIC 5 Descomplica. Escolhe um dos temas disponíveis para aprender e jogar!'
        : 'You are on TIC 5 Descomplica. Choose a theme to learn and play!';

    const textToRead = currentScreenDescription || defaultText;
    speechService.speak('current-screen-speech', textToRead, language);
  };

  const handleStop = () => {
    speechService.stop();
  };

  return (
    <aside
      aria-label={language === 'pt' ? 'Barra de Acessibilidade de Som e Voz' : 'Sound and Voice Accessibility Bar'}
      className="fixed bottom-4 right-4 z-50 select-none animate-in slide-in-from-bottom-5"
    >
      <div
        className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-full shadow-2xl border-2 transition-all duration-300 ${
          isSpeaking
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white border-emerald-300 ring-4 ring-emerald-400/30'
            : isAudioEnabled
            ? 'bg-white text-slate-900 border-indigo-200 ring-4 ring-indigo-500/10 hover:border-indigo-400'
            : 'bg-slate-900 text-white border-slate-700'
        }`}
      >
        {/* Main Sound Activation Button */}
        <button
          type="button"
          id="accessibility-toggle-sound-btn"
          onClick={handleToggleSound}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-black text-xs sm:text-sm cursor-pointer transition-all ${
            isAudioEnabled
              ? isSpeaking
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md animate-pulse'
          }`}
          title={
            isAudioEnabled
              ? language === 'pt'
                ? 'Som Ativado — clica para desativar'
                : 'Sound On — click to disable'
              : language === 'pt'
                ? 'Clica aqui para Ativar o Som para ouvir os textos'
                : 'Click here to Activate Sound'
          }
        >
          {isAudioEnabled ? (
            <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isSpeaking ? 'animate-bounce text-emerald-200' : ''}`} />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
          <span className="whitespace-nowrap">
            {isAudioEnabled
              ? language === 'pt'
                ? '🔊 Som Ativado'
                : '🔊 Sound ON'
              : language === 'pt'
              ? '🔇 Ativar Som'
              : '🔇 Turn ON Sound'}
          </span>
        </button>

        {/* Listen to Screen Button */}
        {isAudioEnabled && (
          <button
            type="button"
            id="accessibility-read-screen-btn"
            onClick={handleReadCurrentScreen}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full font-extrabold text-xs sm:text-sm cursor-pointer transition-all ${
              isSpeaking && speakingId === 'current-screen-speech'
                ? 'bg-emerald-400 text-emerald-950 ring-2 ring-white font-black'
                : isSpeaking
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
            title={language === 'pt' ? 'Ouvir explicação desta página' : 'Listen to current screen'}
          >
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            <span className="whitespace-nowrap">
              {language === 'pt' ? 'Ouvir Ecrã' : 'Listen Screen'}
            </span>
          </button>
        )}

        {/* Stop Button (visible when actively speaking) */}
        {isSpeaking && (
          <button
            type="button"
            id="accessibility-stop-sound-btn"
            onClick={handleStop}
            className="flex items-center gap-1 px-3 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md animate-pulse"
            title={language === 'pt' ? 'Parar leitura por voz' : 'Stop voice reading'}
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">{language === 'pt' ? 'Parar' : 'Stop'}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
