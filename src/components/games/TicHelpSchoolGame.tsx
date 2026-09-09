import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, Lightbulb, Compass, Award, School, Cpu, Send, RotateCcw, ThumbsUp } from 'lucide-react';
import { Language } from '../../types';

interface TicHelpSchoolGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface PresetProblem {
  id: string;
  icon: string;
  title: { pt: string; en: string };
  desc: { pt: string; en: string };
  suggestedTechs: string[];
}

const PRESET_PROBLEMS: PresetProblem[] = [
  {
    id: 'homework_loss',
    icon: '🎒',
    title: {
      pt: 'Alunos esquecem-se de trabalhos de casa ou materiais escolares',
      en: 'Students forget homework deadlines or school supplies',
    },
    desc: {
      pt: 'Muitos alunos chegam à aula sem o caderno certo ou esquecem-se do dia de entrega de um trabalho.',
      en: 'Many students forget specific notebooks or assignment submission dates.',
    },
    suggestedTechs: ['app_notificacoes', 'plataforma_digital', 'quadro_interativo'],
  },
  {
    id: 'library_books',
    icon: '📚',
    title: {
      pt: 'Dificuldade em encontrar livros e saber se estão disponíveis na biblioteca',
      en: 'Difficulty finding books and checking availability in the school library',
    },
    desc: {
      pt: 'Os alunos perdem muito tempo à procura de livros nas estantes ou não sabem se o livro que querem já foi requisitado.',
      en: 'Students spend too much time searching shelves without knowing if a book is checked out.',
    },
    suggestedTechs: ['catalogo_online', 'qr_code_rfid', 'quiosque_touch'],
  },
  {
    id: 'school_navigation',
    icon: '🗺️',
    title: {
      pt: 'Novos alunos e visitantes perdem-se à procura de salas e laboratórios',
      en: 'New students and visitors get lost looking for classrooms and labs',
    },
    desc: {
      pt: 'No início do ano, os alunos do 5.º ano e os pais têm dificuldade em encontrar as salas de aula.',
      en: 'At the start of the year, 5th graders and parents struggle to locate specific classrooms.',
    },
    suggestedTechs: ['mapa_interativo', 'qr_code_rfid', 'quiosque_touch'],
  },
  {
    id: 'energy_waste',
    icon: '💡',
    title: {
      pt: 'Luzes e projetores esquecidos ligados em salas de aula vazias',
      en: 'Lights and projectors left on in empty classrooms wasting power',
    },
    desc: {
      pt: 'Nos intervalos e no final do dia, várias salas ficam com luzes acesas sem ninguém, desperdiçando energia.',
      en: 'During breaks and after school, empty classrooms waste electrical energy.',
    },
    suggestedTechs: ['sensores_iot', 'sistema_automacao', 'app_notificacoes'],
  },
  {
    id: 'canteen_menu',
    icon: '🍲',
    title: {
      pt: 'Avisos da escola e ementa da cantina chegam tarde aos alunos',
      en: 'School notices and canteen lunch menus reach students late',
    },
    desc: {
      pt: 'Os avisos em papel afixados nos corredores rasgam-se ou nem todos os alunos os conseguem ler a tempo.',
      en: 'Paper corridor posters tear or go unread by students before deadlines.',
    },
    suggestedTechs: ['ecras_informativos', 'app_notificacoes', 'plataforma_digital'],
  },
];

interface AvailableTech {
  id: string;
  name: { pt: string; en: string };
  icon: string;
  desc: { pt: string; en: string };
}

const AVAILABLE_TECHS: AvailableTech[] = [
  {
    id: 'app_notificacoes',
    name: { pt: 'Aplicação Escolar com Alertas e Calendário', en: 'School App with Alerts & Calendar' },
    icon: '📱',
    desc: {
      pt: 'Envia avisos automáticos e lembretes para o telemóvel ou tablet dos alunos e encarregados de educação.',
      en: 'Sends automated notices and reminders to student and parent devices.',
    },
  },
  {
    id: 'plataforma_digital',
    name: { pt: 'Portal Digital da Escola na Web', en: 'School Web Portal' },
    icon: '💻',
    desc: {
      pt: 'Permite aceder a materiais, entregar trabalhos online e consultar horários a partir de qualquer computador.',
      en: 'Allows accessing materials, submitting homework, and viewing schedules from any computer.',
    },
  },
  {
    id: 'catalogo_online',
    name: { pt: 'Catálogo de Pesquisa Digital com Base de Dados', en: 'Digital Catalog with Database' },
    icon: '🔍',
    desc: {
      pt: 'Pesquisa rápida por título, autor ou tema e mostra em tempo real se o livro está disponível.',
      en: 'Instant search by title, author, or topic showing real-time shelf status.',
    },
  },
  {
    id: 'qr_code_rfid',
    name: { pt: 'Etiquetas com Códigos QR ou Sensores RFID', en: 'QR Code Tags & RFID Sensors' },
    icon: '🏷️',
    desc: {
      pt: 'Ao apontar a câmara ou aproximar o leitor, dá acesso instantâneo a informações, mapas ou registos.',
      en: 'Scanning opens instant information, maps, or item inventory checks.',
    },
  },
  {
    id: 'sensores_iot',
    name: { pt: 'Sensores de Movimento e Luz Inteligentes (IoT)', en: 'Smart IoT Motion & Light Sensors' },
    icon: '⚡',
    desc: {
      pt: 'Detetam quando não há pessoas na sala e desligam as luzes e equipamentos automaticamente.',
      en: 'Detect when rooms are empty and turn off lights and gear automatically.',
    },
  },
  {
    id: 'ecras_informativos',
    name: { pt: 'Painéis e Ecrãs Digitais nos Corredores', en: 'Digital Display Panels in Corridors' },
    icon: '📺',
    desc: {
      pt: 'Mostram a ementa do dia, avisos importantes e atividades da escola em formato visual dinâmico.',
      en: 'Display daily menus, urgent news, and school activities dynamically.',
    },
  },
  {
    id: 'quiosque_touch',
    name: { pt: 'Quiosque Interativo com Ecrã Tátil', en: 'Interactive Touchscreen Kiosk' },
    icon: '🖥️',
    desc: {
      pt: 'Instalado na entrada da escola, permite a qualquer aluno ou visitante pesquisar salas e itinerários.',
      en: 'Installed at the school entrance, allowing anyone to search rooms and paths.',
    },
  },
];

export const TicHelpSchoolGame: React.FC<TicHelpSchoolGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [customProblem, setCustomProblem] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [howItHelps, setHowItHelps] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPreset = PRESET_PROBLEMS.find((p) => p.id === selectedProblemId);

  const handleToggleTech = (techId: string) => {
    if (isSubmitted) return;
    setSelectedTechs((prev) =>
      prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]
    );
  };

  const handleSelectPreset = (pId: string) => {
    setSelectedProblemId(pId);
    setCustomProblem('');
  };

  const isValid = (selectedProblemId || customProblem.trim().length > 3) &&
    selectedTechs.length > 0 &&
    ideaTitle.trim().length > 2 &&
    howItHelps.trim().length > 5;

  const handleSubmit = () => {
    setIsSubmitted(true);
    onFinish(100, 100, 100);
  };

  const handleReset = () => {
    setSelectedProblemId(null);
    setCustomProblem('');
    setSelectedTechs([]);
    setIdeaTitle('');
    setHowItHelps('');
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'pt' ? 'Voltar aos Desafios' : 'Back to Challenges'}</span>
      </button>

      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-emerald-200">
            <School className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'pt' ? 'Atividade de Criação e Cidadania' : 'Creation & Citizenship Activity'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">
            🏫 {language === 'pt' ? 'Ajuda a Escola: Cria a tua Solução Tecnológica!' : 'Help the School: Design Your Tech Solution!'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl font-medium">
            {language === 'pt'
              ? 'A tecnologia serve para resolver problemas reais. Escolhe um desafio da tua escola, desenha a tua ideia, seleciona as TIC ideais e explica como vais melhorar o dia a dia de todos!'
              : 'Technology exists to solve real problems. Pick a school challenge, sketch your idea, select the best ICT tools, and explain your impact!'}
          </p>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* STEP 1: Escolhe ou escreve o problema */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-xs">
                1
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'pt' ? 'Qual é o problema da escola que queres resolver?' : 'Which school problem do you want to solve?'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_PROBLEMS.map((prob) => {
                const isSelected = selectedProblemId === prob.id;
                return (
                  <button
                    key={prob.id}
                    type="button"
                    onClick={() => handleSelectPreset(prob.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-2 rounded-xl bg-slate-100">{prob.icon}</span>
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        {prob.title[language]}
                      </h3>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {prob.desc[language]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom problem option */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {language === 'pt' ? 'Ou escreve outro problema da tua escola:' : 'Or describe another problem from your school:'}
              </label>
              <input
                type="text"
                value={customProblem}
                onChange={(e) => {
                  setCustomProblem(e.target.value);
                  if (e.target.value.trim().length > 0) setSelectedProblemId(null);
                }}
                placeholder={
                  language === 'pt'
                    ? 'Ex.: Filas compridas no bar da escola...'
                    : 'e.g., Long queues at the school snack bar...'
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* STEP 2: Dá um nome à tua ideia */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-xs">
                2
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'pt' ? 'A Minha Ideia / Nome do Projeto' : 'My Idea / Project Name'}
              </h2>
            </div>

            <input
              type="text"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              placeholder={
                language === 'pt'
                  ? 'Ex.: "EcoLuz Inteligente", "Guia Escolar 5.º Ano", "Avisos na Hora"...'
                  : 'e.g., "Smart EcoLight", "5th Grade Navigator", "Instant Noticeboard"...'
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* STEP 3: Escolhe as Tecnologias que usarias */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-xs">
                3
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'pt' ? 'Que tecnologias (TIC) usarias na tua solução?' : 'Which ICT tools would you use in your solution?'}
              </h2>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {language === 'pt'
                ? 'Podes selecionar uma ou mais tecnologias que façam sentido para o teu projeto:'
                : 'Select one or more technologies that suit your project:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVAILABLE_TECHS.map((tech) => {
                const isSelected = selectedTechs.includes(tech.id);
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => handleToggleTech(tech.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-2xl">{tech.icon}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300" />
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        {tech.name[language]}
                      </h3>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {tech.desc[language]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Como ajudaria a escola? */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-xs">
                4
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'pt' ? 'Como é que esta solução ajudaria a escola e os alunos?' : 'How would this solution help the school and students?'}
              </h2>
            </div>

            <textarea
              rows={3}
              value={howItHelps}
              onChange={(e) => setHowItHelps(e.target.value)}
              placeholder={
                language === 'pt'
                  ? 'Explica de forma simples: quem iria usar, que tarefas ficariam mais fáceis e que problemas seriam evitados...'
                  : 'Explain clearly who would use it, which tasks become easier, and what problems get solved...'
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white leading-relaxed"
            />
          </div>

          {/* Submit button */}
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              disabled={!isValid}
              onClick={handleSubmit}
              className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md transition-all ${
                isValid
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white cursor-pointer hover:scale-102 active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{language === 'pt' ? 'Apresentar Solução e Obter Diploma' : 'Submit Solution & Earn Diploma'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* DIPLOMA AND CELEBRATION VIEW */
        <div className="space-y-6 animate-in zoom-in-95">
          {/* Diploma Card */}
          <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-5xl opacity-20">🏆</div>
            <div className="absolute bottom-4 left-4 text-5xl opacity-20">💡</div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-200/80 text-amber-950 font-black text-xs uppercase tracking-widest border border-amber-300">
              <Award className="w-4 h-4 text-amber-800" />
              <span>{language === 'pt' ? 'Diploma de Inventor(a) TIC da Escola' : 'School ICT Innovator Diploma'}</span>
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {ideaTitle}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wide">
                {language === 'pt' ? 'Projeto Tecnológico de Cidadania Escolar' : 'School Citizenship Tech Project'}
              </p>
            </div>

            {/* Project Summary Box */}
            <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl p-5 border border-amber-200 text-left space-y-3.5 shadow-xs">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'pt' ? 'Problema Identificado:' : 'Problem Identified:'}
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-slate-800">
                  {selectedPreset ? selectedPreset.title[language] : customProblem}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'pt' ? 'Tecnologias (TIC) Selecionadas:' : 'Selected ICT Tools:'}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedTechs.map((tId) => {
                    const tObj = AVAILABLE_TECHS.find((t) => t.id === tId);
                    return (
                      <span
                        key={tId}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center gap-1"
                      >
                        <span>{tObj?.icon}</span>
                        <span>{tObj?.name[language]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'pt' ? 'Como a Solução Melhora a Escola:' : 'How the Solution Improves the School:'}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mt-0.5">
                  "{howItHelps}"
                </p>
              </div>
            </div>

            {/* Teacher / System Feedback */}
            <div className="max-w-xl mx-auto p-4 rounded-2xl bg-emerald-100/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm font-medium flex items-start gap-3 text-left">
              <ThumbsUp className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold block mb-0.5">
                  {language === 'pt' ? 'Parecer Pedagógico TIC:' : 'Educational Feedback:'}
                </span>
                <span>
                  {language === 'pt'
                    ? 'Excelente capacidade de análise e inovação! Demonstraste na prática a ideia central das TIC: a tecnologia serve para resolver problemas reais e tornar o quotidiano mais fácil, seguro e sustentável.'
                    : 'Brilliant problem-solving skills! You demonstrated the core value of ICT: using technology responsibly to solve real challenges!'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'pt' ? 'Criar Outro Projeto' : 'Create Another Project'}</span>
              </button>

              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>{language === 'pt' ? 'Guardar e Voltar (+100 XP)' : 'Save & Finish (+100 XP)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
