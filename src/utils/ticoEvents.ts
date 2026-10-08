// Event system interface (TICo assistant removed)
export type TICoReactionType = 'correct' | 'wrong' | 'streak3' | 'quiz_perfect' | 'tip' | 'celebrate';

export interface TICoReactionEvent {
  type: TICoReactionType;
  message?: string;
  autoResetMs?: number;
}

class TICoEventManager {
  subscribe(_listener: (event: TICoReactionEvent) => void): () => void {
    return () => {};
  }

  trigger(_event: TICoReactionEvent) {}
  triggerCorrect() {}
  triggerWrong(_hint?: string) {}
  triggerStreak3() {}
  triggerQuizPerfect() {}
}

export const ticoFeedback = new TICoEventManager();
