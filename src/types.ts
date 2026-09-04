export type Language = 'pt' | 'en';

export interface User {
  id: string;
  name: string; // Real Name (Private to student and teacher)
  email: string;
  publicId: string; // Safe Public Identifier (e.g. Panda_Feliz_701)
  turma?: string; // Class (e.g. 5.º A) - optional/undefined for teachers and administrators
  role?: 'student' | 'teacher' | 'admin';
  language: Language;
  points: number;
  createdAt: string;
  lastActivity?: {
    themeId: string;
    moduleId?: string;
    challengeId?: string;
    title: string;
    timestamp: string;
  };
}

export interface ActivityProgress {
  userId: string;
  activityId: string;
  activityType: 'module' | 'quiz' | 'challenge';
  themeId: string;
  status: 'completed' | 'in_progress';
  score?: number;
  maxScore?: number;
  percentage?: number;
  attempts: number;
  bestScore?: number;
  bestPercentage?: number;
  lastUpdated: string;
}

export interface UserAchievement {
  userId: string;
  badgeId: string;
  unlockedAt: string;
}

export interface BadgeDefinition {
  id: string;
  namePt: string;
  nameEn: string;
  descPt: string;
  descEn: string;
  icon: string;
  color: string;
  pointsBonus: number;
}

export interface PointTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  question: { pt: string; en: string };
  options: { pt: string[]; en: string[] };
  correctIndex: number;
  explanation: { pt: string; en: string };
}

export interface TopicContent {
  id: string;
  themeId: string;
  number: number;
  title: { pt: string; en: string };
  shortDesc: { pt: string; en: string };
  icon: string;
  illustrationKey?: string;
  // Step 1: Explicação direta
  explanation: { pt: string[]; en: string[] };
  // Step 2: Exemplo prático do quotidiano
  example: {
    title: { pt: string; en: string };
    scenario: { pt: string; en: string };
    tip: { pt: string; en: string };
  };
  // Step 3: Sabias que...?
  funFact: { pt: string; en: string };
  // Step 4: Vamos pensar (Reflexão com pista)
  thinkAboutIt: {
    question: { pt: string; en: string };
    clue: { pt: string; en: string };
    reflection: { pt: string; en: string };
  };
  // Step 5: Verifica o que aprendeste (Mini-desafio de verificação com feedback imediato)
  quizQuestions: QuizQuestion[];
  // Optional for legacy compatibility
  whatYouWillLearn?: { pt: string[]; en: string[] };
}

// Backward compatibility alias:
export type PedagogicalModule = TopicContent;

export interface ChallengeItem {
  id: string;
  themeId: string;
  number: number;
  title: { pt: string; en: string };
  shortDesc: { pt: string; en: string };
  icon: string;
  durationMinutes: number;
  points?: number;
  type:
    | 'safe_dangerous'
    | 'password_builder'
    | 'detect_phishing'
    | 'what_would_you_do'
    | 'final_quiz'
    | 'build_email'
    | 'inspect_email'
    | 'compose_email'
    | 'folder_sorting'
    | 'keywords_master'
    | 'reliable_sources'
    | 'search_operators'
    | 'copy_or_create'
    | 'match_pairs'
    | 'true_false'
    | 'find_error'
    | 'escape_room'
    | 'order_sequence';
}

export interface LessonCard {
  eyebrow: { pt: string; en: string };
  h: { pt: string; en: string };
  body: { pt: string; en: string };
  icon?: string;
}

export interface ThemeDefinition {
  id: string;
  number: number;
  title: { pt: string; en: string };
  tagline: { pt: string; en: string };
  intro: { pt: string; en: string };
  icon: string;
  illustrationKey?: string;
  accentColor: string;
  badgeCount: number;
  lessons?: LessonCard[]; // Quick visual theory lessons
  modules: TopicContent[]; // Detailed 5-step learning modules
  challenges: ChallengeItem[]; // Games and challenges
  finalQuiz: QuizQuestion[]; // Comprehensive quiz (15-20 questions)
}

export interface TurmaRanking {
  turma: string;
  totalPoints: number;
  avgPoints: number;
  studentCount: number;
  completedActivities: number;
  topBadge: string;
  topStudents: {
    publicId: string;
    points: number;
  }[];
  allStudents?: {
    publicId: string;
    points: number;
    activitiesCount: number;
    badgeCount: number;
  }[];
}

export interface StudentRanking {
  position: number;
  id: string;
  publicId: string;
  turma: string;
  points: number;
  activitiesCount: number;
  badgeCount: number;
  isCurrentUser?: boolean;
}

