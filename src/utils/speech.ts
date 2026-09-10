// Text-to-Speech utility using native Web Speech API for classroom accessibility

type SpeechCallback = () => void;

class SpeechManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentId: string | null = null;
  private listeners: Set<(speakingId: string | null) => void> = new Set();
  private globalAudioListeners: Set<(enabled: boolean) => void> = new Set();
  private keepAliveInterval: any = null;
  private globalAudioEnabled: boolean = true; // Enabled by default so students immediately have audio ready

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tic_audio_mode_enabled');
      if (stored !== null) {
        this.globalAudioEnabled = stored === 'true';
      }
    }
  }

  public subscribe(listener: (speakingId: string | null) => void): () => void {
    this.listeners.add(listener);
    listener(this.currentId);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public subscribeGlobalAudio(listener: (enabled: boolean) => void): () => void {
    this.globalAudioListeners.add(listener);
    listener(this.globalAudioEnabled);
    return () => {
      this.globalAudioListeners.delete(listener);
    };
  }

  public isGlobalAudio(): boolean {
    return this.globalAudioEnabled;
  }

  public toggleGlobalAudio(): boolean {
    this.globalAudioEnabled = !this.globalAudioEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('tic_audio_mode_enabled', String(this.globalAudioEnabled));
    }
    this.globalAudioListeners.forEach((fn) => fn(this.globalAudioEnabled));
    if (!this.globalAudioEnabled) {
      this.stop();
    }
    return this.globalAudioEnabled;
  }

  public setGlobalAudio(enabled: boolean) {
    this.globalAudioEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('tic_audio_mode_enabled', String(enabled));
    }
    this.globalAudioListeners.forEach((fn) => fn(this.globalAudioEnabled));
    if (!enabled) {
      this.stop();
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.currentId));
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  public getSpeakingId(): string | null {
    return this.currentId;
  }

  public stop() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
    this.currentId = null;
    this.notify();
  }

  public speak(
    id: string,
    rawText: string,
    lang: 'pt' | 'en' = 'pt',
    onEnd?: SpeechCallback
  ) {
    if (!this.isSupported()) return;

    // If already speaking this item, toggle stop
    if (this.currentId === id) {
      this.stop();
      return;
    }

    // Stop any ongoing speech
    this.stop();

    if (!this.globalAudioEnabled) {
      this.setGlobalAudio(true);
    }

    const cleanText = this.sanitizeText(rawText);
    if (!cleanText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetLang = lang === 'pt' ? 'pt-PT' : 'en-US';
    utterance.lang = targetLang;
    utterance.rate = 0.95; // Slightly slower and clearer for primary school students
    utterance.pitch = 1.0;

    // Try finding the best voice for the language
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      if (lang === 'pt') {
        // Prioritize pt-PT, then any Portuguese voice
        const ptPtVoice = voices.find((v) => v.lang === 'pt-PT' || v.lang === 'pt_PT');
        const ptVoice = ptPtVoice || voices.find((v) => v.lang.toLowerCase().startsWith('pt'));
        if (ptVoice) utterance.voice = ptVoice;
      } else {
        const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
      }
    }

    this.currentId = id;
    this.currentUtterance = utterance;
    this.notify();

    utterance.onend = () => {
      if (this.currentId === id) {
        this.currentId = null;
        this.currentUtterance = null;
        this.notify();
        if (onEnd) onEnd();
      }
      if (this.keepAliveInterval) {
        clearInterval(this.keepAliveInterval);
        this.keepAliveInterval = null;
      }
    };

    utterance.onerror = (e) => {
      // Ignore 'interrupted' errors caused by user stopping or switching
      if (this.currentId === id) {
        this.currentId = null;
        this.currentUtterance = null;
        this.notify();
      }
      if (this.keepAliveInterval) {
        clearInterval(this.keepAliveInterval);
        this.keepAliveInterval = null;
      }
    };

    // Chromium speech synthesis bug workaround: resume every 10s if long
    this.keepAliveInterval = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(this.keepAliveInterval);
        this.keepAliveInterval = null;
      }
    }, 10000);

    window.speechSynthesis.speak(utterance);
  }

  private sanitizeText(text: string): string {
    return text
      .replace(/[*#_~`>]/g, ' ') // Strip markdown symbols
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract link text
      .replace(/\s+/g, ' ')
      .trim();
  }
}

export const speechService = new SpeechManager();
