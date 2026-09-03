import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Trophy, Sparkles, RefreshCw, ArrowRight, FileCheck, XCircle } from 'lucide-react';
import { Language } from '../../types';

interface CopyOrCreditGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface Scenario {
  id: number;
  studentName: string;
  situation: { pt: string; en: string };
  isCorrectBehavior: boolean;
  explanation: { pt: string; en: string };
  bestPracticeTip: { pt: string; en: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    studentName: 'Afonso (11 anos)',
    situation: {
      pt: 'Copiar dois parágrafos inteiros da Wikipédia sobre o Castelo de São Jorge, mudar apenas duas palavras e colar no trabalho de História como se fosse um texto escrito por ele.',
      en: 'Copying two entire paragraphs from Wikipedia about Saint George’s Castle, changing only two words, and pasting it into the History report as if he wrote it himself.',
    },
    isCorrectBehavior: false,
    explanation: {
      pt: '❌ Plágio! Copiar texto de outra pessoa e apresentar como criação própria é plágio, mesmo mudando uma ou duas palavras avulsas.',
      en: '❌ Plagiarism! Copying someone else’s text and claiming it as your own is plagiarism, even if you swap a couple of random words.',
    },
    bestPracticeTip: {
      pt: 'O Afonso deve ler a Wikipédia, compreender a história do castelo e escrever um resumo com as suas próprias palavras, indicando no fim: "Fonte: Wikipédia".',
      en: 'Afonso should read Wikipedia, understand the history, and summarize in his own words with: "Source: Wikipedia".',
    },
  },
  {
    id: 2,
    studentName: 'Carolina (10 anos)',
    situation: {
      pt: 'Ler um artigo sobre as alterações climáticas no site da Ciência Viva, explicar por palavras próprias o que é o efeito de estufa e colocar no final do documento uma secção de "Webgrafia" com o link do artigo.',
      en: 'Reading an article on climate change from Ciência Viva, explaining in her own words what the greenhouse effect is, and adding a "Web references" section with the URL at the end.',
    },
    isCorrectBehavior: true,
    explanation: {
      pt: '✅ Atitude Exemplar! A Carolina parafraseou a matéria (mostrando que compreendeu) e deu o devido crédito à instituição científica.',
      en: '✅ Exemplary Conduct! Carolina paraphrased the material (proving understanding) and properly credited the scientific institution.',
    },
    bestPracticeTip: {
      pt: 'Parafrasear e citar as fontes de consulta é a regra de ouro dos bons trabalhos escolares!',
      en: 'Paraphrasing and citing source links is the golden rule of great schoolwork!',
    },
  },
  {
    id: 3,
    studentName: 'Diogo (11 anos)',
    situation: {
      pt: 'Fazer uma captura de ecrã (screenshot) de uma fotografia artística de um fotógrafo famoso no Instagram e colocá-la na capa do trabalho de TIC sem pedir autorização nem escrever de quem é a foto.',
      en: 'Taking a screenshot of an artistic photograph by a famous Instagram photographer and using it as the ICT cover image without permission or attribution.',
    },
    isCorrectBehavior: false,
    explanation: {
      pt: '❌ Violação de Direitos de Autor! Fotografias têm direitos de autor reservados. Não se pode usar a imagem de outrem sem autorização ou sem licença que o permita.',
      en: '❌ Copyright Infringement! Photographs have reserved copyrights. You cannot use someone’s picture without permission or a suitable license.',
    },
    bestPracticeTip: {
      pt: 'O Diogo devia procurar imagens em bancos de licença livre (Creative Commons, Unsplash, Wikimedia) e indicar sempre: "Foto por: Nome do Autor".',
      en: 'Diogo should search open-license repositories (Creative Commons, Unsplash, Wikimedia) and state: "Photo by: Author Name".',
    },
  },
  {
    id: 4,
    studentName: 'Matilde (10 anos)',
    situation: {
      pt: 'Colocar uma frase célebre do poeta Luís de Camões entre aspas no início do seu trabalho e escrever logo a seguir: "— Luís de Camões, Os Lusíadas, Canto I".',
      en: 'Placing a famous line by poet Luís de Camões inside quotation marks at the start of her report, writing right after: "— Luís de Camões, The Lusiads, Canto I".',
    },
    isCorrectBehavior: true,
    explanation: {
      pt: '✅ Perfeito! Trata-se de uma citação direta devidamente identificada com aspas e atribuição do autor.',
      en: '✅ Perfect! This is a direct quotation properly demarcated with quotation marks and author attribution.',
    },
    bestPracticeTip: {
      pt: 'Citações curtas entre aspas valorizam o trabalho e demonstram grande respeito pelo autor original.',
      en: 'Short quotes inside quotation marks elevate your report and show great respect for the original creator.',
    },
  },
  {
    id: 5,
    studentName: 'Tomás (11 anos)',
    situation: {
      pt: 'Encontrar um trabalho de TIC completo de um aluno do ano anterior na Internet, apagar o nome do aluno original, colocar o seu próprio nome e turma e enviar ao professor por email.',
      en: 'Finding a completed ICT presentation by a past student online, erasing the original student’s name, putting his own name and class, and emailing it to the teacher.',
    },
    isCorrectBehavior: false,
    explanation: {
      pt: '❌ Fraude e Plágio Grave! Apagar o nome do autor real de um trabalho escolar para fingir autoria é uma falta grave de ética.',
      en: '❌ Severe Fraud and Plagiarism! Erasing the real creator’s name on a school assignment to claim authorship is a serious ethical violation.',
    },
    bestPracticeTip: {
      pt: 'Um trabalho feito com as tuas próprias mãos e ideias, mesmo simples, tem mil vezes mais valor do que copiar o trabalho de outros.',
      en: 'Work done with your own hands and thoughts, however humble, holds a thousand times more value than stealing other people’s efforts.',
    },
  },
  {
    id: 6,
    studentName: 'Inês (10 anos)',
    situation: {
      pt: 'Utilizar um gráfico da Direção-Geral da Saúde sobre alimentação saudável, mantendo o logótipo da DGS visível e acrescentando a legenda: "Fonte: DGS / Ministério da Saúde (consultado em 2024)".',
      en: 'Using a chart from the Directorate-General of Health on nutrition, preserving the visible DGS logo and adding the caption: "Source: DGS / Ministry of Health (accessed in 2024)".',
    },
    isCorrectBehavior: true,
    explanation: {
      pt: '✅ Atitude Excelente! Utilizou dados públicos educativos mantendo a identidade da fonte e acrescentou a data de consulta.',
      en: '✅ Excellent Conduct! Used educational public data preserving source identity and noting the access date.',
    },
    bestPracticeTip: {
      pt: 'Identificar a instituição e a data de consulta nos gráficos confere rigor profissional ao trabalho.',
      en: 'Identifying the institution and access date on charts lends professional polish to your project.',
    },
  },
];

export const CopyOrCreditGame: React.FC<CopyOrCreditGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const scenario = SCENARIOS[currentIdx];

  const handleSelect = (choice: boolean) => {
    if (confirmed) return;
    setUserChoice(choice);
  };

  const handleConfirm = () => {
    if (userChoice === null) return;
    setConfirmed(true);
    if (userChoice === scenario.isCorrectBehavior) {
      setScore((prev) => prev + 15);
    }
  };

  const handleNext = () => {
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setUserChoice(null);
      setConfirmed(false);
    } else {
      setGameOver(true);
      const totalScore = score;
      const maxScore = SCENARIOS.length * 15; // 90 pts
      const pct = Math.round((totalScore / maxScore) * 100);
      onFinish(totalScore, maxScore, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setUserChoice(null);
    setConfirmed(false);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Controls */}
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
            {language === 'pt' ? 'Situação' : 'Situation'} {currentIdx + 1} / {SCENARIOS.length}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{score} pts</span>
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2 border border-violet-200/60">
              <FileCheck className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Desafio 4: Copiar ou Criar? Direitos e Plágio' : 'Challenge 4: Copy or Create? Copyright & Plagiarism'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {scenario.studentName}
            </h2>
          </div>

          {/* Situation Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
              {language === 'pt' ? 'Situação a avaliar:' : 'Scenario to evaluate:'}
            </span>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              "{scenario.situation[language]}"
            </p>
          </div>

          {/* Choice Buttons */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {language === 'pt' ? 'Esta atitude é correta ou incorreta?' : 'Is this behavior appropriate or inappropriate?'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Correct behavior button */}
              <button
                type="button"
                onClick={() => handleSelect(true)}
                disabled={confirmed}
                className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  userChoice === true
                    ? 'bg-emerald-600 text-white border-emerald-700 ring-4 ring-emerald-100 shadow-xs'
                    : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-700 hover:border-emerald-300'
                } ${confirmed && scenario.isCorrectBehavior === true ? 'ring-4 ring-emerald-300' : ''}`}
              >
                <CheckCircle2 className={`w-5 h-5 ${userChoice === true ? 'text-white' : 'text-emerald-500'}`} />
                <span>{language === 'pt' ? '✅ Atitude Correta (Criar / Citar)' : '✅ Appropriate (Create / Credit)'}</span>
              </button>

              {/* Plagiarism / Wrong button */}
              <button
                type="button"
                onClick={() => handleSelect(false)}
                disabled={confirmed}
                className={`p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  userChoice === false
                    ? 'bg-rose-600 text-white border-rose-700 ring-4 ring-rose-100 shadow-xs'
                    : 'bg-white hover:bg-rose-50 border-slate-200 text-slate-700 hover:border-rose-300'
                } ${confirmed && scenario.isCorrectBehavior === false ? 'ring-4 ring-rose-300' : ''}`}
              >
                <XCircle className={`w-5 h-5 ${userChoice === false ? 'text-white' : 'text-rose-500'}`} />
                <span>{language === 'pt' ? '❌ Plágio / Infração de Direitos' : '❌ Plagiarism / Copyright Breach'}</span>
              </button>
            </div>
          </div>

          {/* Feedback & Tip when confirmed */}
          {confirmed && userChoice !== null && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  userChoice === scenario.isCorrectBehavior
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <p className="font-bold mb-1">
                  {userChoice === scenario.isCorrectBehavior
                    ? (language === 'pt' ? '🎉 Muito bem! Avaliação correta!' : '🎉 Great job! Correct assessment!')
                    : (language === 'pt' ? '⚠️ Repara na regra:' : '⚠️ Look at the rule:')}
                </p>
                <p>{scenario.explanation[language]}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{language === 'pt' ? 'Dica para o teu trabalho:' : 'Tip for your projects:'}</strong>{' '}
                  <span>{scenario.bestPracticeTip[language]}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {!confirmed ? (
              <button
                disabled={userChoice === null}
                onClick={handleConfirm}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors ml-auto ${
                  userChoice !== null
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {language === 'pt' ? 'Confirmar Avaliação' : 'Confirm Assessment'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs transition-colors ml-auto"
              >
                <span>
                  {currentIdx < SCENARIOS.length - 1
                    ? (language === 'pt' ? 'Próxima Situação' : 'Next Scenario')
                    : (language === 'pt' ? 'Ver Classificação' : 'View Ranking')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Game Over */
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 text-center space-y-6 shadow-xs">
          <div className="w-20 h-20 rounded-full bg-violet-100 text-violet-600 mx-auto flex items-center justify-center text-4xl shadow-xs">
            <Trophy className="w-10 h-10 text-violet-600" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {language === 'pt' ? 'Defensor da Criatividade e Autoria!' : 'Creativity & Authorship Defender!'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {language === 'pt'
                ? 'Aprendeste o valor da honestidade académica: parafrasear com as tuas palavras e citar sempre os autores dos textos e imagens!'
                : 'You mastered academic integrity: paraphrasing with your own words and always crediting authors and photographers!'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-violet-50 border border-violet-200 text-violet-950 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-violet-600" />
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
