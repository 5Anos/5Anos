// Lightweight event system for TICo emotional reactions
export type TICoReactionType = 'correct' | 'wrong' | 'streak3' | 'quiz_perfect' | 'tip' | 'celebrate';

export interface TICoReactionEvent {
  type: TICoReactionType;
  message?: string;
  autoResetMs?: number;
}

type TICoListener = (event: TICoReactionEvent) => void;

class TICoEventManager {
  private listeners: Set<TICoListener> = new Set();

  subscribe(listener: TICoListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  trigger(event: TICoReactionEvent) {
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('Error dispatching TICo event:', err);
      }
    });
  }

  triggerCorrect() {
    this.trigger({
      type: 'correct',
      message: 'Boa! Resposta certinha! Continua assim! ✨',
      autoResetMs: 4000,
    });
  }

  triggerWrong(hint?: string) {
    this.trigger({
      type: 'wrong',
      message: hint || 'Quase lá! Não desanimes. Vamos analisar a pista juntos! 🔍',
      autoResetMs: 5000,
    });
  }

  triggerStreak3() {
    this.trigger({
      type: 'streak3',
      message: '🔥 Fantástico! 3 respostas certas seguidas! Estás imparável! 🎉',
      autoResetMs: 5500,
    });
  }

  triggerQuizPerfect() {
    this.trigger({
      type: 'quiz_perfect',
      message: '🏆 UAU! 100% no Quiz! És um verdadeiro Mestre das TIC! ⭐',
      autoResetMs: 6000,
    });
  }
}

export const ticoFeedback = new TICoEventManager();
