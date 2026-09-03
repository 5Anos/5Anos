import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Search, Trophy, Sparkles, RefreshCw, ArrowRight, ExternalLink } from 'lucide-react';
import { Language } from '../../types';

interface ReliableSourcesGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

type SourceVerdict = 'reliable' | 'doubtful' | 'fake';

interface SourceCase {
  id: number;
  title: string;
  url: string;
  author: string;
  date: string;
  snippet: { pt: string; en: string };
  correctVerdict: SourceVerdict;
  detectiveTip: { pt: string; en: string };
  explanation: { pt: string; en: string };
}

const CASES: SourceCase[] = [
  {
    id: 1,
    title: 'Lince-ibérico: Recuperação e Conservação da Espécie em Portugal',
    url: 'https://icnf.gov.pt/biodiversidade/lince-iberico-2024',
    author: 'Instituto da Conservação da Natureza e das Florestas (ICNF)',
    date: '14 de março de 2024',
    snippet: {
      pt: 'O censo ibérico confirmou mais de 2.000 linces na Península Ibérica, com novos núcleos populacionais no Vale do Guadiana. Dados monitorizados por equipas científicas e biólogos em campo.',
      en: 'The Iberian census confirmed over 2,000 lynxes on the Iberian Peninsula, with new population cores in the Guadiana Valley. Data monitored by field biologists and scientific teams.',
    },
    correctVerdict: 'reliable',
    detectiveTip: {
      pt: 'Repara no domínio oficial (.gov.pt), no autor institucional responsável e na data recente.',
      en: 'Notice the official government domain (.gov.pt), the responsible public agency, and recent date.',
    },
    explanation: {
      pt: '🟢 Fonte 100% Fiável! É o organismo público oficial português responsável pela conservação da natureza, com estudos científicos comprovados.',
      en: '🟢 100% Reliable Source! Official Portuguese public agency responsible for nature conservation with verified scientific data.',
    },
  },
  {
    id: 2,
    title: 'CHOCANTE: Dinossauros voadores vistos a sobrevoar a torre de Belém ontem à noite!!!',
    url: 'http://noticias-secretas-inacreditaveis.xyz/dinossauros-belem',
    author: 'Utilizador Anónimo "Misterio_Total"',
    date: 'Sem data indicada',
    snippet: {
      pt: 'Cientistas mundiais estão a esconder a verdade do povo! Pterodáctilos gigantes foram filmados em Lisboa. Clica aqui rápido e ganha um smartphone antes que o governo apague o vídeo!!!',
      en: 'Global scientists are hiding the truth from the public! Giant pterodactyls filmed in Lisbon. Click here now to win a free smartphone before the government deletes the video!!!',
    },
    correctVerdict: 'fake',
    detectiveTip: {
      pt: 'Títulos em maiúsculas alarmistas, pontuação excessiva (!!!), autor anónimo, promessa de prémios e domínio estranho (.xyz).',
      en: 'All-caps sensationalist headline, excessive exclamation marks (!!!), anonymous author, prize bait, and weird domain (.xyz).',
    },
    explanation: {
      pt: '🔴 Falsa e Perigosa! Notícia falsa evidente (fake news) com táticas de clickbait para roubar dados com anúncios enganosos.',
      en: '🔴 Fake and Dangerous! Clear fake news with clickbait tactics aimed at phishing and deceptive advertising.',
    },
  },
  {
    id: 3,
    title: 'Porque é que a pizza é a única comida boa do universo e os legumes não prestam',
    url: 'https://opinioes-do-joaozinho.blog-gratis.com/artigo-42',
    author: 'Joãozinho (11 anos, estudante)',
    date: '2 de maio de 2023',
    snippet: {
      pt: 'Na minha opinião sincera, devíamos proibir a sopa nas escolas e comer pizza quatro vezes por dia. Toda a gente com bom senso concorda comigo e quem discordar não percebe nada de comida!',
      en: 'In my honest opinion, schools should ban vegetable soup and serve pizza four times a day. Anyone with common sense agrees with me!',
    },
    correctVerdict: 'doubtful',
    detectiveTip: {
      pt: 'É um blogue pessoal que apresenta apenas uma OPINIÃO ou gosto pessoal, sem rigor nem dados científicos de nutrição.',
      en: 'Personal blog reflecting pure OPINION and personal taste, without scientific nutrition backing.',
    },
    explanation: {
      pt: '🟡 Duvidosa / Mera Opinião! Para um trabalho escolar de Ciências sobre a roda dos alimentos e saúde, este blogue não tem valor científico.',
      en: '🟡 Doubtful / Pure Opinion! For a Science project on healthy nutrition, this personal blog lacks academic and scientific validity.',
    },
  },
  {
    id: 4,
    title: 'A Batalha de São Mamede e as origens da nacionalidade portuguesa',
    url: 'https://ensina.rtp.pt/artigo/batalha-de-sao-mamede-guimaraes',
    author: 'RTP Ensina — Arquivo Histórico e Educativo',
    date: 'Revisão pedagógica de 2023',
    snippet: {
      pt: 'A 24 de junho de 1128, nas imediações do Castelo de Guimarães, confrontaram-se as forças de Afonso Henriques e os partidários de D. Teresa e Fernão Peres de Trava, marcando o nascimento de Portugal.',
      en: 'On June 24, 1128, near Guimarães Castle, forces led by Afonso Henriques fought partisans of Queen Teresa and Fernão Peres de Trava, marking the birth of Portugal.',
    },
    correctVerdict: 'reliable',
    detectiveTip: {
      pt: 'RTP Ensina é uma plataforma educativa pública de prestígio, com consultoria de professores de História e linguagem rigorosa.',
      en: 'RTP Ensina is a recognized public educational portal supported by history teachers with rigorous facts.',
    },
    explanation: {
      pt: '🟢 Fonte Muito Fiável! Plataforma educativa pública recomendada pelas escolas para estudo da História de Portugal.',
      en: '🟢 Highly Reliable Source! Public educational platform recommended across Portuguese schools for history studies.',
    },
  },
  {
    id: 5,
    title: 'Fórum dos Gamers: O truque secreto para ter bateria infinita no telemóvel',
    url: 'https://forum-jogos-rapidos.net/topico-7819',
    author: 'Gamer_Power_99 (comentário de utilizador sem perfil verificado)',
    date: 'Há 5 anos atrás (2019)',
    snippet: {
      pt: 'Para a bateria nunca mais acabar, basta colocar o telemóvel no congelador durante 3 horas todas as noites. Eu fiz isto uma vez e acho que durou mais 10 minutos.',
      en: 'To make your battery last forever, just put your phone in the freezer for 3 hours every night. I tried this once and I think it lasted 10 more minutes.',
    },
    correctVerdict: 'doubtful',
    detectiveTip: {
      pt: 'Comentário informal num fórum de discussão de jogos, sem autor qualificado. Congelar baterias pode até danificar o aparelho!',
      en: 'Casual comment in a gaming forum with no credentials. Freezing lithium batteries can actually cause severe damage!',
    },
    explanation: {
      pt: '🟡 Duvidosa / Falsa! Dicas sem base técnica em fóruns podem danificar aparelhos e não devem ser usadas em investigações de TIC.',
      en: '🟡 Dubious / False! Unverified forum advice can destroy hardware and has no place in ICT school research.',
    },
  },
  {
    id: 6,
    title: 'O Ciclo Hidrológico e a Distribuição da Água na Terra',
    url: 'https://snirh.apambiente.pt/educativo/ciclo-agua',
    author: 'Agência Portuguesa do Ambiente (APA)',
    date: 'Atualizado em 2024',
    snippet: {
      pt: 'Evaporação, condensação, precipitação e infiltração: dados sobre os recursos hídricos superficiais e subterrâneos em Portugal, com esquemas técnicos para o ensino básico.',
      en: 'Evaporation, condensation, precipitation, and infiltration: verified data on water resources in Portugal, with illustrated diagrams for primary education.',
    },
    correctVerdict: 'reliable',
    detectiveTip: {
      pt: 'Organismo público oficial de ambiente (.pt), autoria técnica comprovada e conceitos científicos rigorosos.',
      en: 'Official public environment agency, established technical authorship, and solid scientific concepts.',
    },
    explanation: {
      pt: '🟢 Fonte 100% Fiável! Informação direta do Sistema Nacional de Recursos Hídricos e da Agência do Ambiente.',
      en: '🟢 100% Reliable Source! Direct information from the National Water Resources System and Portuguese Environment Agency.',
    },
  },
];

export const ReliableSourcesGame: React.FC<ReliableSourcesGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVerdict, setSelectedVerdict] = useState<SourceVerdict | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const currentCase = CASES[currentIdx];

  const handleSelect = (verdict: SourceVerdict) => {
    if (confirmed) return;
    setSelectedVerdict(verdict);
  };

  const handleConfirm = () => {
    if (!selectedVerdict) return;
    setConfirmed(true);
    if (selectedVerdict === currentCase.correctVerdict) {
      setScore((prev) => prev + 15);
    }
  };

  const handleNext = () => {
    if (currentIdx < CASES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedVerdict(null);
      setConfirmed(false);
    } else {
      setGameOver(true);
      const totalScore = score;
      const maxScore = CASES.length * 15; // 90 pts max
      const pct = Math.round((totalScore / maxScore) * 100);
      onFinish(totalScore, maxScore, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedVerdict(null);
    setConfirmed(false);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar ao Tema' : 'Back to Theme'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {language === 'pt' ? 'Caso' : 'Case'} {currentIdx + 1} / {CASES.length}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{score} pts</span>
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Desafio 2: Detetive de Fontes Fiáveis' : 'Challenge 2: Reliable Sources Detective'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'pt' ? 'Analisa a página encontrada:' : 'Analyze the web page found:'}
            </h2>
          </div>

          {/* Web page inspection card */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 shadow-2xs">
            {/* Fake browser bar */}
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="flex-1 bg-white px-3 py-1 rounded-lg border border-slate-200 font-mono text-slate-600 text-[11px] truncate flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{currentCase.url}</span>
              </div>
            </div>

            {/* Page content */}
            <div className="p-5 space-y-3 bg-white">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentCase.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pb-2 border-b border-slate-100">
                <span>✍️ <strong>{language === 'pt' ? 'Autor:' : 'Author:'}</strong> {currentCase.author}</span>
                <span>📅 <strong>{language === 'pt' ? 'Data:' : 'Date:'}</strong> {currentCase.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-normal">
                "{currentCase.snippet[language]}"
              </p>

              {/* Detective Hint */}
              <div className="flex items-start gap-2 text-xs text-indigo-700 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                <Search className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                <div>
                  <strong>{language === 'pt' ? 'Pista do Detetive:' : 'Detective Clue:'}</strong>{' '}
                  <span>{currentCase.detectiveTip[language]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Buttons */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {language === 'pt' ? 'Qual é o teu veredito sobre esta fonte?' : 'What is your verdict on this source?'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Reliable */}
              <button
                type="button"
                onClick={() => handleSelect('reliable')}
                disabled={confirmed}
                className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  selectedVerdict === 'reliable'
                    ? 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-100'
                    : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-700 hover:border-emerald-300'
                } ${confirmed && currentCase.correctVerdict === 'reliable' ? 'ring-4 ring-emerald-300' : ''}`}
              >
                <CheckCircle2 className={`w-5 h-5 ${selectedVerdict === 'reliable' ? 'text-white' : 'text-emerald-500'}`} />
                <span>{language === 'pt' ? '🟢 Fonte Fiável' : '🟢 Reliable Source'}</span>
                <span className="text-[10px] font-normal opacity-80">
                  {language === 'pt' ? 'Institucional / Rigorosa' : 'Official / Rigorous'}
                </span>
              </button>

              {/* Doubtful */}
              <button
                type="button"
                onClick={() => handleSelect('doubtful')}
                disabled={confirmed}
                className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  selectedVerdict === 'doubtful'
                    ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-100'
                    : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-700 hover:border-amber-300'
                } ${confirmed && currentCase.correctVerdict === 'doubtful' ? 'ring-4 ring-amber-300' : ''}`}
              >
                <AlertTriangle className={`w-5 h-5 ${selectedVerdict === 'doubtful' ? 'text-white' : 'text-amber-500'}`} />
                <span>{language === 'pt' ? '🟡 Duvidosa / Opinião' : '🟡 Doubtful / Opinion'}</span>
                <span className="text-[10px] font-normal opacity-80">
                  {language === 'pt' ? 'Blogue ou fórum sem provas' : 'Unverified blog / forum'}
                </span>
              </button>

              {/* Fake */}
              <button
                type="button"
                onClick={() => handleSelect('fake')}
                disabled={confirmed}
                className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  selectedVerdict === 'fake'
                    ? 'bg-rose-600 text-white border-rose-700 ring-4 ring-rose-100'
                    : 'bg-white hover:bg-rose-50 border-slate-200 text-slate-700 hover:border-rose-300'
                } ${confirmed && currentCase.correctVerdict === 'fake' ? 'ring-4 ring-rose-300' : ''}`}
              >
                <XCircle className={`w-5 h-5 ${selectedVerdict === 'fake' ? 'text-white' : 'text-rose-500'}`} />
                <span>{language === 'pt' ? '🔴 Falsa ou Perigosa' : '🔴 Fake or Dangerous'}</span>
                <span className="text-[10px] font-normal opacity-80">
                  {language === 'pt' ? 'Fake news / Clickbait' : 'Fake news / Clickbait'}
                </span>
              </button>
            </div>
          </div>

          {/* Feedback section when confirmed */}
          {confirmed && selectedVerdict && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 ${
                selectedVerdict === currentCase.correctVerdict
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <p className="font-bold mb-1">
                {selectedVerdict === currentCase.correctVerdict
                  ? (language === 'pt' ? '🎯 Veredito Correto, Detetive!' : '🎯 Correct Verdict, Detective!')
                  : (language === 'pt' ? '⚠️ Atenção aos pormenores!' : '⚠️ Watch the details closely!')}
              </p>
              <p>{currentCase.explanation[language]}</p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!confirmed ? (
              <button
                disabled={!selectedVerdict}
                onClick={handleConfirm}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors ml-auto ${
                  selectedVerdict
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {language === 'pt' ? 'Confirmar Veredito' : 'Confirm Verdict'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs transition-colors ml-auto"
              >
                <span>
                  {currentIdx < CASES.length - 1
                    ? (language === 'pt' ? 'Próximo Caso' : 'Next Case')
                    : (language === 'pt' ? 'Ver Classificação Final' : 'View Final Ranking')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Game Over */
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 text-center space-y-6 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-xs">
            <Trophy className="w-10 h-10 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {language === 'pt' ? 'Investigação de Fontes Concluída!' : 'Source Investigation Completed!'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {language === 'pt'
                ? 'Agora sabes analisar autores, domínios e separar factos de opiniões com precisão de detetive!'
                : 'You now know how to inspect authors, domains, and separate facts from opinions like a true detective!'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>{score} de 90 pontos possíveis</span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Repetir Desafio' : 'Play Again'}</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              {language === 'pt' ? 'Concluir e Voltar ao Tema' : 'Finish & Back to Theme'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
