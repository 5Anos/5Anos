import React, { useState } from 'react';
import {
  Search,
  Award,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ShieldCheck,
  Brain,
  Clock,
  HeartHandshake,
  Smartphone,
  BookOpen,
  ArrowLeft,
  ThumbsUp,
} from 'lucide-react';

interface DigitalDetectivesGameProps {
  language: 'pt' | 'en';
  onBack: () => void;
  onFinish?: (score: number, maxScore: number, percentage: number) => void;
}

interface DetectiveCase {
  id: number;
  badge: { pt: string; en: string };
  title: { pt: string; en: string };
  avatar: string;
  character: { pt: string; en: string };
  sceneText: { pt: string; en: string };
  question: { pt: string; en: string };
  options: {
    pt: string[];
    en: string[];
  };
  correctIndex: number;
  feedback: {
    pt: string;
    en: string;
  };
  categoryIcon: React.ReactNode;
}

const CASES_DATA: DetectiveCase[] = [
  {
    id: 1,
    badge: { pt: 'Caso 1: Aprendizagem', en: 'Case 1: Learning' },
    title: { pt: 'Rita e os Planetas do Espaço', en: 'Rita and the Space Planets' },
    avatar: '👧',
    character: { pt: 'Rita (10 anos)', en: 'Rita (10 years old)' },
    sceneText: {
      pt: 'A Rita está a fazer um trabalho escolar sobre os planetas. Encontra um site educativo com fotografias espaciais, simulações e textos claros sobre o Sistema Solar.',
      en: 'Rita is doing a school project about planets. She finds an educational website with space photos, simulations, and clear texts about the Solar System.',
    },
    question: {
      pt: 'Como pode a tecnologia ajudar a Rita neste caso?',
      en: 'How can technology help Rita in this case?',
    },
    options: {
      pt: [
        'Ajuda-a a pesquisar informação de qualidade e a aprender de forma mais rica.',
        'Faz o trabalho todo sozinha sem a Rita precisar de ler ou pensar.',
        'Obriga-a a comprar telescópios caros na Internet.',
      ],
      en: [
        'It helps her research quality information and learn more richly.',
        'It does the whole assignment on its own without Rita reading or thinking.',
        'It forces her to purchase expensive telescopes online.',
      ],
    },
    correctIndex: 0,
    feedback: {
      pt: 'Excelente dedução! As TIC podem ajudar muito na aprendizagem porque permitem aceder a informação fiável, vídeos e recursos educativos em qualquer momento.',
      en: 'Great deduction! ICT helps learning significantly by providing access to reliable information, videos, and educational resources anytime.',
    },
    categoryIcon: <BookOpen className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: 2,
    badge: { pt: 'Caso 2: Excesso de Ecrã', en: 'Case 2: Screen Time Excess' },
    title: { pt: 'A Maratona de Jogos do Miguel', en: 'Miguel’s Gaming Marathon' },
    avatar: '👦',
    character: { pt: 'Miguel (10 anos)', en: 'Miguel (10 years old)' },
    sceneText: {
      pt: 'O Miguel esteve a jogar no tablet durante várias horas seguidas, sem fazer nenhuma pausa para descansar a vista, lanchar ou esticar as pernas.',
      en: 'Miguel has been playing games on his tablet for several consecutive hours without any breaks to rest his eyes, have a snack, or stretch his legs.',
    },
    question: {
      pt: 'Como detetive digital, como classificas esta situação?',
      en: 'As a digital detective, how do you classify this situation?',
    },
    options: {
      pt: [
        '🟢 BOA ESCOLHA — Jogar horas seguidas sem parar é ótimo para treinar.',
        '🟡 CUIDADO! — É divertido jogar, mas o excesso sem pausas prejudica a saúde e o bem-estar.',
        '🔴 PERIGO EXTREMO — O tablet vai avariar e queimar os circuitos.',
      ],
      en: [
        '🟢 GOOD CHOICE — Gaming for hours without stopping is great for training.',
        '🟡 WATCH OUT! — Playing is fun, but excess without breaks harms health and well-being.',
        '🔴 EXTREME DANGER — The tablet will overheat and burn circuits.',
      ],
    },
    correctIndex: 1,
    feedback: {
      pt: 'Muito bem! Usar tecnologia pode ser muito divertido, mas é fundamental fazer pausas regulares e equilibrar o tempo de ecrã com outras atividades saudáveis, como desporto e convívio.',
      en: 'Well done! Using technology is fun, but it is essential to take regular breaks and balance screen time with healthy activities like sports and social time.',
    },
    categoryIcon: <Clock className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 3,
    badge: { pt: 'Caso 3: Informação Falsa', en: 'Case 3: False Information' },
    title: { pt: 'A Mensagem Misteriosa da Leonor', en: 'Leonor’s Mysterious Message' },
    avatar: '👧',
    character: { pt: 'Leonor (10 anos)', en: 'Leonor (10 years old)' },
    sceneText: {
      pt: 'A Leonor recebe uma mensagem anónima que diz: "Amanhã não há escola! Partilha esta mensagem com todos os teus colegas!". Ela não sabe quem a enviou.',
      en: 'Leonor receives an anonymous message saying: "No school tomorrow! Share this message with everyone!". She has no idea who sent it.',
    },
    question: {
      pt: 'O que deve a Leonor fazer antes de partilhar a mensagem?',
      en: 'What should Leonor do before sharing the message?',
    },
    options: {
      pt: [
        'Partilhar imediatamente com toda a turma e grupos de amigos.',
        'Verificar primeiro com a escola, professores ou pais se a informação é verdadeira.',
        'Alterar a mensagem para ficar mais assustadora e depois partilhar.',
      ],
      en: [
        'Share immediately with the entire class and friend groups.',
        'First verify with the school, teachers, or parents if the info is genuine.',
        'Change the message to make it scarier and then share it.',
      ],
    },
    correctIndex: 1,
    feedback: {
      pt: 'Boa decisão! Na Internet podemos encontrar informação incorreta ou falsa. Antes de partilhar qualquer notícia, devemos sempre verificar se é verdadeira.',
      en: 'Great decision! We often encounter inaccurate or fake info online. Before sharing anything, we must always verify whether it is factual.',
    },
    categoryIcon: <Brain className="w-5 h-5 text-rose-500" />,
  },
  {
    id: 4,
    badge: { pt: 'Caso 4: Comunicação', en: 'Case 4: Communication' },
    title: { pt: 'O Tomás e os Amigos Distantes', en: 'Tomás and Distant Friends' },
    avatar: '👦',
    character: { pt: 'Tomás (10 anos)', en: 'Tomás (10 years old)' },
    sceneText: {
      pt: 'O Tomás mudou recentemente de cidade e quer matar saudades e conversar com os antigos colegas da escola.',
      en: 'Tomás recently moved to another city and wants to catch up and talk with his former schoolmates.',
    },
    question: {
      pt: 'Qual é a grande vantagem das TIC nesta situação do Tomás?',
      en: 'What is a major advantage of ICT in Tomás’s situation?',
    },
    options: {
      pt: [
        'Permitir comunicar por videochamada e mensagens em direto com pessoas que estão longe.',
        'Fazer com que o Tomás nunca mais precise de ir às aulas presenciais.',
        'Impedir que os antigos colegas façam novos amigos na escola.',
      ],
      en: [
        'Allowing instant video calls and direct messages with people far away.',
        'Making sure Tomás never needs to attend in-person classes again.',
        'Preventing former classmates from making new friends at school.',
      ],
    },
    correctIndex: 0,
    feedback: {
      pt: 'Brilhante! As TIC aproximam as pessoas e permitem comunicar facilmente através de vídeo e mensagens, mesmo quando vivemos em cidades ou países diferentes.',
      en: 'Brilliant! ICT brings people closer and enables effortless communication through video and chats, even across long distances.',
    },
    categoryIcon: <Smartphone className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: 5,
    badge: { pt: 'Caso 5: Equilíbrio e Rotina', en: 'Case 5: Balance and Routine' },
    title: { pt: 'A Tarde de Vídeos da Sofia', en: 'Sofia’s Video Afternoon' },
    avatar: '👧',
    character: { pt: 'Sofia (10 anos)', en: 'Sofia (10 years old)' },
    sceneText: {
      pt: 'A Sofia tem um trabalho escolar importante para fazer, mas passa toda a tarde a ver vídeos e só começa o trabalho tarde à noite, já cheia de sono.',
      en: 'Sofia has an important school assignment, but spends the entire afternoon watching short videos and only starts working late at night, feeling exhausted.',
    },
    question: {
      pt: 'Qual seria uma escolha mais responsável e equilibrada para a Sofia?',
      en: 'What would be a more responsible and balanced choice for Sofia?',
    },
    options: {
      pt: [
        'Continuar a ver vídeos até à hora de dormir e esquecer o trabalho.',
        'Organizar o tempo: fazer primeiro o estudo e reservar momentos para descanso e lazer digital.',
        'Deixar de fazer trabalhos escolares para sempre.',
      ],
      en: [
        'Keep watching videos until bedtime and forget the homework.',
        'Organize time: finish schoolwork first and allocate dedicated moments for rest and digital fun.',
        'Stop doing school assignments permanently.',
      ],
    },
    correctIndex: 1,
    feedback: {
      pt: 'Excelente! O segredo é a organização: quando dividimos bem o tempo entre deveres, lazer, família e descanso, aproveitamos a tecnologia sem prejudicar a escola e a saúde.',
      en: 'Excellent! The secret is organization: when we balance duties, recreation, family, and sleep, we enjoy technology without hurting health or school.',
    },
    categoryIcon: <ShieldCheck className="w-5 h-5 text-sky-500" />,
  },
  {
    id: 6,
    badge: { pt: 'Caso 6: Respeito e Cidadania', en: 'Case 6: Respect & Citizenship' },
    title: { pt: 'A Fotografia Enviada ao João', en: 'The Photo Sent to João' },
    avatar: '👦',
    character: { pt: 'João (10 anos)', en: 'João (10 years old)' },
    sceneText: {
      pt: 'Um colega envia ao João uma fotografia embaraçosa de outra pessoa e pede-lhe: "Partilha isto no grupo da turma para todos se rirem!".',
      en: 'A friend sends João an embarrassing photo of someone else and says: "Share this in the class group so everyone can laugh!".',
    },
    question: {
      pt: 'Antes de partilhar, o que deve o João pensar e fazer?',
      en: 'Before sharing, what should João consider and do?',
    },
    options: {
      pt: [
        'Pensar no respeito e privacidade do colega, não partilhar a foto e avisar que isso não é correto.',
        'Partilhar imediatamente no grupo para ganhar popularidade e risos.',
        'Reenviar a foto em segredo para outros colegas.',
      ],
      en: [
        'Think of the classmate’s respect and privacy, refuse to share the photo, and state it is improper.',
        'Share it right away in the group to gain popularity and laughs.',
        'Forward the photo secretly to other peers.',
      ],
    },
    correctIndex: 0,
    feedback: {
      pt: 'Super Detetive! Respeitar a privacidade e os sentimentos dos outros é essencial. Nunca devemos partilhar fotografias ou dados de alguém sem a sua autorização!',
      en: 'Super Detective! Respecting others’ privacy and feelings is vital. We must never share someone’s photos or information without their permission!',
    },
    categoryIcon: <HeartHandshake className="w-5 h-5 text-purple-500" />,
  },
];

export const DigitalDetectivesGame: React.FC<DigitalDetectivesGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answeredCases, setAnsweredCases] = useState<{ id: number; correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const totalCases = CASES_DATA.length;
  const currentCase = CASES_DATA[currentStep];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentCase.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }
    setAnsweredCases((prev) => [...prev, { id: currentCase.id, correct: isCorrect }]);
  };

  const handleNextCase = () => {
    if (currentStep < totalCases - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === currentCase.correctIndex ? 0 : 0);
      const maxScore = totalCases * 10;
      const percentage = Math.round((finalScore / maxScore) * 100);
      if (onFinish) {
        onFinish(finalScore, maxScore, percentage);
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnsweredCases([]);
    setIsFinished(false);
  };

  const getRankBadge = (pts: number) => {
    if (pts >= 50) {
      return {
        title: language === 'pt' ? 'Super Detetive Digital 🕵️' : 'Super Digital Detective 🕵️',
        desc:
          language === 'pt'
            ? 'Incrível! Revelaste um faro aguçado para identificar boas escolhas e evitar perigos tecnológicos!'
            : 'Incredible! You showed sharp skills in identifying smart tech choices and avoiding pitfalls!',
        color: 'from-amber-400 to-amber-600 text-amber-950',
      };
    }
    if (pts >= 30) {
      return {
        title: language === 'pt' ? 'Bom Detetive Digital ⭐' : 'Good Digital Detective ⭐',
        desc:
          language === 'pt'
            ? 'Muito bem! Estás no caminho certo para usar a tecnologia de forma inteligente e segura.'
            : 'Well done! You are on the right track to using technology wisely and securely.',
        color: 'from-sky-400 to-blue-600 text-blue-950',
      };
    }
    return {
      title: language === 'pt' ? 'Detetive em treino 🔎' : 'Detective in Training 🔎',
      desc:
        language === 'pt'
          ? 'Bom esforço! Com a prática e a atenção aos detalhes, vais tornar-te num mestre das escolhas digitais.'
          : 'Good effort! With practice and attention to detail, you will master smart digital choices.',
      color: 'from-emerald-400 to-teal-600 text-teal-950',
    };
  };

  const rank = getRankBadge(score);

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-xl border-4 border-amber-300 p-6 md:p-8 text-center relative overflow-hidden">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-bold text-sm mb-4">
            <Sparkles className="w-4 h-4 text-amber-600" />
            {language === 'pt' ? 'MISSÃO CONCLUÍDA!' : 'MISSION ACCOMPLISHED!'}
          </div>

          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-white">
            🕵️
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {rank.title}
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-6 max-w-lg mx-auto">
            {rank.desc}
          </p>

          {/* Score Box */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
              <span className="block text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                {language === 'pt' ? 'Pontos de Detetive' : 'Detective Points'}
              </span>
              <span className="text-3xl font-black text-amber-800">{score} / 60</span>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4">
              <span className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                {language === 'pt' ? 'Casos Resolvidos' : 'Cases Solved'}
              </span>
              <span className="text-3xl font-black text-emerald-800">
                {answeredCases.filter((c) => c.correct).length} / {totalCases}
              </span>
            </div>
          </div>

          {/* 3 Coisas que Aprendeste */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 text-left mb-8">
            <h3 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              {language === 'pt' ? '3 Coisas que Aprendeste:' : '3 Things You Learned:'}
            </h3>
            <ul className="space-y-2.5 text-sm md:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-lg">💡</span>
                <span>
                  {language === 'pt'
                    ? 'As TIC são ferramentas fantásticas para aprender, pesquisar e comunicar com quem está longe.'
                    : 'ICT tools are fantastic for learning, researching, and communicating with distant people.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-lg">⏳</span>
                <span>
                  {language === 'pt'
                    ? 'Fazer pausas regulares e equilibrar o tempo de ecrã com sono, desporto e família é essencial para a saúde.'
                    : 'Taking regular breaks and balancing screen time with sleep, exercise, and family is vital for health.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-lg">🛡️</span>
                <span>
                  {language === 'pt'
                    ? 'Devemos sempre verificar se a informação é verdadeira antes de partilhar e respeitar a privacidade dos colegas.'
                    : 'We must always verify if information is true before sharing and strictly respect others’ privacy.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              {language === 'pt' ? 'Jogar Novamente' : 'Play Again'}
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-2xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              {language === 'pt' ? 'Voltar ao Menu' : 'Back to Menu'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Bar with Back, Progress and Score */}
      <div className="flex items-center justify-between mb-4 bg-white/80 backdrop-blur rounded-2xl p-3 border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'pt' ? 'Sair' : 'Exit'}
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-black text-xs md:text-sm border border-indigo-200">
            <Search className="w-4 h-4" />
            {language === 'pt'
              ? `Caso ${currentStep + 1} de ${totalCases}`
              : `Case ${currentStep + 1} of ${totalCases}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-black text-xs md:text-sm border border-amber-200">
          <Award className="w-4 h-4 text-amber-500" />
          <span>{score} pts</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalCases) * 100}%` }}
        />
      </div>

      {/* Main Detective Case Card */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-indigo-100 p-6 md:p-8 relative">
        {/* Case Badge Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50">
              {currentCase.categoryIcon}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">
                {currentCase.badge[language]}
              </span>
              <h2 className="text-lg md:text-xl font-black text-slate-900">
                {currentCase.title[language]}
              </h2>
            </div>
          </div>
          <span className="text-3xl" role="img" aria-label="avatar">
            {currentCase.avatar}
          </span>
        </div>

        {/* Scene Box */}
        <div className="bg-slate-50 border-2 border-slate-200/80 rounded-2xl p-4 md:p-5 mb-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Search className="w-4 h-4 text-slate-400" />
            {language === 'pt' ? 'Relatório do Caso:' : 'Case Report:'}
          </div>
          <p className="text-slate-800 text-base md:text-lg leading-relaxed font-medium">
            "{currentCase.sceneText[language]}"
          </p>
        </div>

        {/* Question */}
        <h3 className="text-base md:text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
            ?
          </span>
          {currentCase.question[language]}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentCase.options[language].map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentCase.correctIndex;

            let buttonStyle =
              'bg-white border-2 border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40';

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle =
                  'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-sm';
              } else if (isSelected && !isCorrect) {
                buttonStyle =
                  'bg-rose-50 border-2 border-rose-500 text-rose-900 shadow-sm';
              } else {
                buttonStyle = 'bg-slate-50/50 border border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3.5 font-semibold text-sm md:text-base cursor-pointer ${buttonStyle}`}
              >
                <span
                  className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {isAnswered ? (
                    isCorrect ? (
                      '✓'
                    ) : isSelected ? (
                      '✕'
                    ) : (
                      String.fromCharCode(65 + idx)
                    )
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box */}
        {isAnswered && (
          <div
            className={`rounded-2xl p-4 md:p-5 mb-6 animate-fadeIn border-2 ${
              selectedOption === currentCase.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedOption === currentCase.correctIndex ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-black text-base mb-1">
                  {selectedOption === currentCase.correctIndex
                    ? language === 'pt'
                      ? '🎯 Resposta Correta (+10 pontos)!'
                      : '🎯 Correct Choice (+10 points)!'
                    : language === 'pt'
                    ? '💡 Ponto de Aprendizagem:'
                    : '💡 Learning Insight:'}
                </h4>
                <p className="text-sm md:text-base leading-relaxed">
                  {currentCase.feedback[language]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="flex justify-end">
            <button
              onClick={handleNextCase}
              className="px-6 py-3 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 text-base cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              <span>
                {currentStep < totalCases - 1
                  ? language === 'pt'
                    ? 'Próximo Caso'
                    : 'Next Case'
                  : language === 'pt'
                  ? 'Ver Relatório Final'
                  : 'View Final Report'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default DigitalDetectivesGame;
