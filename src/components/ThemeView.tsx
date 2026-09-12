import React, { useState } from 'react';
import { BookOpen, Gamepad2, ArrowLeft, CheckCircle2, Circle, Clock, Play, ChevronRight, ChevronLeft, Sparkles, Zap, Lock, Eye } from 'lucide-react';
import { ThemeDefinition, ActivityProgress, Language } from '../types';
import { translations } from '../i18n/translations';
import { getThemeImage, getThemeStepImage, getChallengeImage } from '../data/themeImages';
import { DosDontsPostureInfographicPT } from './DosDontsPostureInfographicPT';
import { PostureCorrectionSimulator } from './PostureCorrectionSimulator';
import { MonitorLightingLab } from './MonitorLightingLab';
import { PhishingMessageSimulator } from './PhishingMessageSimulator';
import { PasswordStrengthTester } from './PasswordStrengthTester';
import { PasswordBattleCard } from './PasswordBattleCard';
import { PasswordSharingDilemmas } from './PasswordSharingDilemmas';
import { PersonalDataClassifier } from './PersonalDataClassifier';
import { SocialMediaPrivacyLab } from './SocialMediaPrivacyLab';
import { UrlAnatomyExplorer } from './UrlAnatomyExplorer';
import { FakeNewsDetectorLab } from './FakeNewsDetectorLab';
import { DownloadTrapsExplorer } from './DownloadTrapsExplorer';
import { EmailAddressAnatomy } from './EmailAddressAnatomy';
import { InteractiveEmailExplorer } from './InteractiveEmailExplorer';
import { NetiquetteFixerLab } from './NetiquetteFixerLab';
import { EmailAttachmentScanner } from './EmailAttachmentScanner';
import { IntellectualPropertyExplorer } from './IntellectualPropertyExplorer';
import { PlagiarismVsEthicsLab } from './PlagiarismVsEthicsLab';
import { DigitalFootprintSimulator } from './DigitalFootprintSimulator';
import { CitationSimulator } from './CitationSimulator';
import { LicensesVisualCard } from './LicensesVisualCard';
import { TicApplicationsExplorer } from './TicApplicationsExplorer';
import { TicEvolutionExplorer } from './TicEvolutionExplorer';
import { TicProsConsExplorer } from './TicProsConsExplorer';
import { TicGreenTechExplorer } from './TicGreenTechExplorer';
import { CyberbullyingActionCard } from './CyberbullyingActionCard';
import { getQuizMention, getQuizMentionBadgeStyle } from '../utils/exportUtils';
import { AudioSpeakButton } from './AudioSpeakButton';

interface ThemeViewProps {
  theme: ThemeDefinition;
  progressList: ActivityProgress[];
  language: Language;
  isAdmin?: boolean;
  isLockedForStudents?: boolean;
  quizVisibility?: Record<string, boolean>;
  onToggleVisibility?: (themeId: string) => void;
  onToggleQuizVisibility?: (themeId: string) => void;
  onBack: () => void;
  onOpenModule: (moduleId: string) => void;
  onOpenChallenge: (challengeId: string) => void;
  initialTab?: 'content' | 'games';
}

export const ThemeView: React.FC<ThemeViewProps> = ({
  theme,
  progressList,
  language,
  isAdmin = false,
  isLockedForStudents = false,
  quizVisibility = {},
  onToggleVisibility,
  onToggleQuizVisibility,
  onBack,
  onOpenModule,
  onOpenChallenge,
  initialTab = 'content',
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'games'>(initialTab);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const t = translations[language];

  const lessons = theme.lessons || [];
  const currentLesson = lessons[currentStepIndex] || lessons[0];
  const themeImg = getThemeImage(theme.id);
  const currentStepImg = getThemeStepImage(theme.id, currentStepIndex);

  // Accent gradient based on theme
  const getBannerGradient = (themeNumber: number) => {
    switch (themeNumber) {
      case 1:
        return 'from-blue-900 via-indigo-900 to-slate-900';
      case 2:
        return 'from-emerald-900 via-teal-900 to-slate-900';
      case 3:
        return 'from-sky-900 via-blue-900 to-indigo-950';
      case 4:
        return 'from-purple-900 via-violet-900 to-indigo-950';
      case 5:
        return 'from-indigo-900 via-purple-900 to-slate-900';
      case 6:
        return 'from-sky-900 via-blue-950 to-slate-900';
      case 7:
        return 'from-amber-900 via-orange-950 to-slate-900';
      default:
        return 'from-indigo-950 via-slate-900 to-blue-950';
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < lessons.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setActiveTab('games');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-in fade-in duration-200">
      {/* Back Button & Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'pt' ? 'Voltar ao Início' : 'Back to Home'}</span>
          </button>

          {isAdmin && onToggleVisibility && (
            isLockedForStudents ? (
              <button
                type="button"
                onClick={() => onToggleVisibility(theme.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>{language === 'pt' ? 'Desbloquear para Alunos' : 'Unlock for Students'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onToggleVisibility(theme.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
                title={language === 'pt' ? 'Bloquear / Ocultar este tema aos alunos' : 'Lock / Hide this theme from students'}
              >
                <Lock className="w-4 h-4 text-amber-600" />
                <span>{language === 'pt' ? 'Ocultar aos Alunos' : 'Hide from Students'}</span>
              </button>
            )
          )}
        </div>

        {/* Teacher Preview Banner if Theme is Hidden */}
        {isAdmin && isLockedForStudents && (
          <div className="mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                🔒
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                  {language === 'pt' ? 'Modo de Pré-visualização da Professora' : 'Teacher Preview Mode'}
                </span>
                <p className="text-xs sm:text-sm font-medium text-amber-900 mt-0.5">
                  {language === 'pt'
                    ? 'Este tema está atualmente OCULTO aos alunos. Podes explorar as lições, simulações e jogos livremente.'
                    : 'This theme is currently hidden from students. You can explore and test freely.'}
                </p>
              </div>
            </div>

            {onToggleVisibility && (
              <button
                type="button"
                onClick={() => onToggleVisibility(theme.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Tornar Visível para os Alunos' : 'Make Visible to Students'}</span>
              </button>
            )}
          </div>
        )}

        <div
          className={`p-6 sm:p-8 md:p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden bg-gradient-to-br ${getBannerGradient(
            theme.number
          )} flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-white/10`}
        >
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-amber-300 border border-white/20 shadow-xs">
                <span className="text-base">{theme.icon}</span>
                <span>{language === 'pt' ? 'Tema' : 'Theme'} {theme.number}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {theme.title[language]}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {theme.intro[language]}
            </p>
          </div>

          {/* Theme custom 3D illustration graphic */}
          <div className="relative z-10 w-full md:w-80 max-w-xs shrink-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 p-1.5 group hover:scale-[1.02] transition-transform duration-300">
            <img
              src={themeImg}
              alt={theme.title[language]}
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-inner"
            />
          </div>

          {/* Geometric blur accents */}
          <div className="absolute right-[-30px] top-[-30px] w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-[-20px] bottom-[-20px] w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* Tabs Selector: Conteúdos vs Jogos e Desafios */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-4 px-6 text-sm sm:text-base font-black flex items-center gap-2.5 border-b-3 transition-all cursor-pointer ${
            activeTab === 'content'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>{t.tabContent}</span>
        </button>

        <button
          onClick={() => setActiveTab('games')}
          className={`pb-4 px-6 text-sm sm:text-base font-black flex items-center gap-2.5 border-b-3 transition-all cursor-pointer ${
            activeTab === 'games'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          <span>{t.tabGames}</span>
        </button>
      </div>

      {/* Tab 1: Conteúdos Pedagógicos */}
      {activeTab === 'content' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {lessons && lessons.length > 0 && currentLesson ? (
            <div className="space-y-6">
              {/* Stepper Navigation Pills with Step Names */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {lessons.map((lesson, idx) => {
                    const isActive = idx === currentStepIndex;
                    const isCompleted = idx < currentStepIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/50'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : isCompleted
                              ? 'bg-emerald-200 text-emerald-800'
                              : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        {lesson.icon && <span className="text-sm">{lesson.icon}</span>}
                        <span className="whitespace-nowrap">
                          {lesson.eyebrow[language]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm space-y-6 relative overflow-hidden">
                {/* Header of Active Step */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <span>{currentLesson.icon || '📖'}</span>
                      <span>{currentLesson.eyebrow[language]}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <AudioSpeakButton
                      id={`theme-${theme.id}-step-${currentStepIndex}`}
                      text={`${currentLesson.h[language]}. ${currentLesson.body[language].replace(/<[^>]*>?/gm, ' ')}`}
                      language={language}
                      label={language === 'pt' ? 'Ouvir Conteúdo' : 'Listen Content'}
                      variant="pill"
                      size="sm"
                    />
                    <div className="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                      {language === 'pt'
                        ? `Passo ${currentStepIndex + 1} de ${lessons.length}`
                        : `Step ${currentStepIndex + 1} of ${lessons.length}`}
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {currentLesson.h[language]}
                </h2>

                {/* Pedagogical Step Renderer: Complete natural text */}
                <div className="space-y-6 w-full">
                  <div
                    className="text-base sm:text-lg text-slate-700 leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-slate-700 [&_strong]:text-slate-900 [&_em]:text-indigo-900 [&_em]:font-medium [&_em]:not-italic [&_em]:bg-indigo-50/70 [&_em]:px-1.5 [&_em]:py-0.5 [&_em]:rounded-md"
                    dangerouslySetInnerHTML={{ __html: currentLesson.body[language] }}
                  />

                  {/* Interactive Pedagogical Widget matching the current step */}
                  <div className="w-full pt-2">
                    {/* TEMA 1: As TIC e a Sociedade */}
                    {theme.id === 'tic-sociedade' && currentStepIndex === 1 && (
                      <TicApplicationsExplorer language={language} />
                    )}
                    {theme.id === 'tic-sociedade' && currentStepIndex === 2 && (
                      <TicEvolutionExplorer language={language} />
                    )}
                    {theme.id === 'tic-sociedade' && currentStepIndex === 3 && (
                      <TicProsConsExplorer language={language} />
                    )}
                    {theme.id === 'tic-sociedade' && currentStepIndex === 4 && (
                      <TicGreenTechExplorer language={language} />
                    )}

                    {/* TEMA 2: Ergonomia e Bem-Estar */}
                    {theme.id === 'ergonomia' && currentStepIndex === 1 && (
                      <PostureCorrectionSimulator language={language} />
                    )}
                    {theme.id === 'ergonomia' && currentStepIndex === 2 && (
                      <MonitorLightingLab language={language} />
                    )}
                    {theme.id === 'ergonomia' && currentStepIndex === 4 && (
                      <DosDontsPostureInfographicPT />
                    )}

                    {/* TEMA 3: Palavras-passe e Autenticação */}
                    {theme.id === 'palavras-passe' && currentStepIndex === 1 && (
                      <PasswordBattleCard language={language} />
                    )}
                    {theme.id === 'palavras-passe' && currentStepIndex === 2 && (
                      <PasswordSharingDilemmas language={language} />
                    )}
                    {theme.id === 'palavras-passe' && currentStepIndex === 3 && (
                      <PasswordStrengthTester />
                    )}

                    {/* TEMA 4: Segurança Digital e Privacidade */}
                    {(theme.id === 'seguranca' || theme.id === 'seguranca-digital') && currentStepIndex === 0 && (
                      <PersonalDataClassifier language={language} />
                    )}
                    {(theme.id === 'seguranca' || theme.id === 'seguranca-digital') && currentStepIndex === 1 && (
                      <PhishingMessageSimulator />
                    )}
                    {(theme.id === 'seguranca' || theme.id === 'seguranca-digital') && currentStepIndex === 2 && (
                      <CyberbullyingActionCard language={language} />
                    )}
                    {(theme.id === 'seguranca' || theme.id === 'seguranca-digital') && currentStepIndex === 3 && (
                      <SocialMediaPrivacyLab language={language} />
                    )}
                    {(theme.id === 'seguranca' || theme.id === 'seguranca-digital') && currentStepIndex === 4 && (
                      <DigitalFootprintSimulator />
                    )}

                    {/* TEMA 5: Navegar e Pesquisar na Internet */}
                    {theme.id === 'navegar-internet' && currentStepIndex === 0 && (
                      <UrlAnatomyExplorer language={language} />
                    )}
                    {theme.id === 'navegar-internet' && currentStepIndex === 1 && (
                      <FakeNewsDetectorLab language={language} />
                    )}
                    {theme.id === 'navegar-internet' && currentStepIndex === 2 && (
                      <DownloadTrapsExplorer language={language} />
                    )}

                    {/* TEMA 6: Correio Eletrónico (Email) */}
                    {theme.id === 'correio-eletronico' && currentStepIndex === 0 && (
                      <EmailAddressAnatomy language={language} />
                    )}
                    {theme.id === 'correio-eletronico' && currentStepIndex === 1 && (
                      <InteractiveEmailExplorer />
                    )}
                    {theme.id === 'correio-eletronico' && currentStepIndex === 2 && (
                      <EmailAttachmentScanner language={language} />
                    )}
                    {theme.id === 'correio-eletronico' && currentStepIndex === 3 && (
                      <NetiquetteFixerLab language={language} />
                    )}

                    {/* TEMA 7: Direitos de Autor e Ética Digital */}
                    {theme.id === 'direitos-autor' && currentStepIndex === 0 && (
                      <IntellectualPropertyExplorer language={language} />
                    )}
                    {theme.id === 'direitos-autor' && currentStepIndex === 1 && (
                      <LicensesVisualCard language={language} />
                    )}
                    {theme.id === 'direitos-autor' && currentStepIndex === 2 && (
                      <PlagiarismVsEthicsLab language={language} />
                    )}
                    {theme.id === 'direitos-autor' && currentStepIndex === 4 && (
                      <CitationSimulator language={language} />
                    )}
                  </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all w-full sm:w-auto justify-center ${
                      currentStepIndex === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{language === 'pt' ? 'Passo Anterior' : 'Previous Step'}</span>
                  </button>

                  {/* Step dots */}
                  <div className="flex items-center gap-1.5">
                    {lessons.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentStepIndex
                            ? 'w-6 bg-indigo-600'
                            : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        title={language === 'pt' ? `Passo ${idx + 1}` : `Step ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all hover:scale-102 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <span>
                      {currentStepIndex === lessons.length - 1
                        ? language === 'pt'
                          ? '🎮 Ir para Jogos e Desafios'
                          : '🎮 Go to Games & Challenges'
                        : language === 'pt'
                        ? 'Próximo Passo'
                        : 'Next Step'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              {language === 'pt' ? 'Sem conteúdos para apresentar.' : 'No topics available.'}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Jogos e Desafios (Challenges) */}
      {activeTab === 'games' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Fun Games Header Banner */}
          <div className="p-6 rounded-[2rem] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30 shrink-0">
                🎮
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  {language === 'pt' ? 'Zona de Jogos & Desafios TIC' : 'ICT Games & Challenge Zone'}
                </h2>
                <p className="text-xs sm:text-sm text-amber-100 font-medium mt-0.5">
                  {language === 'pt'
                    ? 'Ganha pontos XP, desbloqueia medalhas e testa as tuas habilidades neste tema!'
                    : 'Earn XP points, unlock badges, and test your skills in this topic!'}
                </p>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold text-xs sm:text-sm shrink-0 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{theme.challenges.length} {language === 'pt' ? 'Atividades Disponíveis' : 'Activities Available'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theme.challenges.map((chal) => {
              const record = progressList.find((p) => p.activityId === chal.id);
              const isDone = record?.status === 'completed';
              const isFinalQuiz = chal.type === 'final_quiz' || chal.id.startsWith('quiz-final');
              const isQuizVisible = quizVisibility[theme.id] === true;
              const chalImg = getChallengeImage(chal.type);

              // If it's a final quiz and hidden for students, show a locked notification card to students
              if (isFinalQuiz && !isAdmin && !isQuizVisible) {
                return (
                  <div
                    key={chal.id}
                    className="rounded-[2rem] border-2 border-slate-200 bg-slate-50/90 p-6 shadow-2xs flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div>
                      {/* Card Top Pill Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider bg-slate-200 text-slate-700 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-600" />
                          <span>🏆 {language === 'pt' ? 'Quiz de Aprendizagem' : 'Learning Quiz'}</span>
                        </span>
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100/90 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-600" />
                          <span>{language === 'pt' ? 'Oculto pela Professora' : 'Hidden by Teacher'}</span>
                        </span>
                      </div>

                      {/* Locked icon header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center text-2xl shadow-inner border border-amber-200">
                          🔒
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                            {chal.title[language]}
                          </h3>
                          <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                            <Zap className="w-3 h-3 fill-current text-amber-500" />
                            <span>{language === 'pt' ? 'Aguardando visibilidade' : 'Waiting for teacher release'}</span>
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {language === 'pt'
                          ? 'Este quiz de aprendizagem está atualmente oculto e será colocado visível pela professora no momento apropriado da aula.'
                          : 'This quiz is currently hidden and will be made visible by the teacher during class.'}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>~{chal.durationMinutes} min</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-slate-200/80 text-slate-600 font-bold text-xs cursor-not-allowed">
                        🔒 {language === 'pt' ? 'Não Disponível' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={chal.id}
                  onClick={() => onOpenChallenge(chal.id)}
                  className={`rounded-[2rem] border-2 p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isFinalQuiz
                      ? isQuizVisible
                        ? 'border-amber-300 bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-white hover:border-amber-400'
                        : 'border-slate-300 bg-slate-50/90 hover:border-amber-400'
                      : isDone
                      ? 'border-emerald-200 bg-gradient-to-b from-emerald-50/30 to-white hover:border-emerald-300'
                      : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div>
                    {/* Card Top Pill Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                            isFinalQuiz
                              ? 'bg-amber-200/90 text-amber-950 shadow-2xs'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isFinalQuiz
                            ? (language === 'pt' ? '🏆 Quiz de Aprendizagem' : '🏆 Learning Quiz')
                            : (language === 'pt' ? `Desafio ${chal.number}` : `Challenge ${chal.number}`)}
                        </span>

                        {isFinalQuiz && isAdmin && (
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                            isQuizVisible
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}>
                            {isQuizVisible ? <Eye className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3 text-rose-600" />}
                            <span>
                              {isQuizVisible
                                ? (language === 'pt' ? 'Visível p/ Alunos' : 'Visible to Students')
                                : (language === 'pt' ? 'Oculto p/ Alunos' : 'Hidden from Students')}
                            </span>
                          </span>
                        )}
                      </div>

                      {isDone ? (
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                          isFinalQuiz
                            ? getQuizMentionBadgeStyle(record.firstAttemptScore ?? record.score ?? 0).pillClass
                            : 'text-emerald-700 bg-emerald-100 border-emerald-200'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {isFinalQuiz
                              ? getQuizMention(record.firstAttemptScore ?? record.score ?? 0, language)
                              : record.bestPercentage ? `${record.bestPercentage}%` : t.completedStatus}
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                          <Circle className="w-3.5 h-3.5" />
                          <span>{t.notStartedStatus}</span>
                        </span>
                      )}
                    </div>

                    {/* Fun icon header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center text-2xl transition-colors shadow-inner border border-indigo-100">
                        {chal.icon || (isFinalQuiz ? '🏆' : '🕹️')}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                          {chal.title[language]}
                        </h3>
                        {isFinalQuiz ? (
                          isDone ? (
                            <div className="mt-0.5">
                              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                                <Zap className="w-3 h-3 fill-current text-amber-500" />
                                <span>
                                  {language === 'pt' ? 'Avaliação Oficial:' : 'Official Evaluation:'} {getQuizMention(record?.firstAttemptScore ?? record?.score ?? 0, language)}
                                </span>
                              </span>
                              {record?.attempts && record.attempts > 1 && (
                                <span className="text-[10px] text-slate-500 font-semibold block">
                                  {record.attempts} {language === 'pt' ? 'tentativas realizadas (treino)' : 'attempts completed (practice)'}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                              <Zap className="w-3 h-3 fill-current text-amber-500" />
                              <span>{language === 'pt' ? 'Avaliação qualitativa na 1.ª tentativa' : 'Qualitative evaluation on 1st attempt'}</span>
                            </span>
                          )
                        ) : isDone ? (
                          <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                            <Zap className="w-3 h-3 fill-current text-emerald-500" />
                            <span>
                              {record?.bestScore ?? record?.score ?? 100} / 100 XP {record?.attempts && record.attempts > 1 ? (language === 'pt' ? `(${record.attempts} tent.)` : `(${record.attempts} att.)`) : ''}
                            </span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-indigo-600 flex items-center gap-1 mt-0.5">
                            <Zap className="w-3 h-3 fill-current text-indigo-500" />
                            <span>{language === 'pt' ? 'Vale 100 XP • Tentativas ilimitadas' : 'Worth 100 XP • Unlimited attempts'}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {chal.shortDesc[language]}
                    </p>

                    {/* Teacher Quick Toggle Button inside Quiz Card */}
                    {isFinalQuiz && isAdmin && onToggleQuizVisibility && (
                      <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[11px] font-semibold text-slate-600">
                          {language === 'pt' ? 'Controlo do Quiz:' : 'Quiz Control:'}
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleQuizVisibility(theme.id)}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                            isQuizVisible
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {isQuizVisible ? (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>{language === 'pt' ? 'Ocultar dos Alunos' : 'Hide from Students'}</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>{language === 'pt' ? 'Tornar Visível para Alunos' : 'Make Visible to Students'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>~{chal.durationMinutes} min</span>
                    </span>

                    <button
                      className={`text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                        isFinalQuiz
                          ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs'
                          : isDone
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>
                        {isDone
                          ? isFinalQuiz
                            ? (language === 'pt' ? 'Treinar de Novo' : 'Practice Again')
                            : (language === 'pt' ? 'Repetir Desafio' : 'Play Again')
                          : isFinalQuiz
                          ? (language === 'pt' ? 'Iniciar Quiz' : 'Start Quiz')
                          : t.playChallenge}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

