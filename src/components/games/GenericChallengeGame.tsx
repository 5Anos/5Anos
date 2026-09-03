import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, Trophy, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Language } from '../../types';

interface ChallengeQuestion {
  id: string;
  situation: { pt: string; en: string };
  question: { pt: string; en: string };
  options: { pt: string[]; en: string[] };
  correctIndex: number;
  explanation: { pt: string; en: string };
}

// Interactive question sets for challenges across the 6 themes
export const CHALLENGE_DATA: Record<string, {
  title: { pt: string; en: string };
  instructions: { pt: string; en: string };
  questions: ChallengeQuestion[];
}> = {
  'jogo-ergo-postura': {
    title: { pt: '🧍 Desafio da Postura Correta', en: '🧍 Ideal Posture Challenge' },
    instructions: {
      pt: 'Analisa cada postura na secretária e escolhe a melhor decisão para proteger a coluna e as articulações.',
      en: 'Examine each workstation posture and make the healthiest choice for spinal alignment.',
    },
    questions: [
      {
        id: 'p1',
        situation: {
          pt: 'A Joana está a estudar há 1 hora com os pés cruzados no ar e o queixo apoiado na mão.',
          en: 'Joana has been studying for 1 hour with feet dangling and chin resting in her hand.',
        },
        question: {
          pt: 'Qual deve ser a primeira correção imediata na postura da Joana?',
          en: 'What is the most immediate correction needed for Joana’s posture?',
        },
        options: {
          pt: [
            'Apoiar os dois pés no chão e encostar a coluna direita no encosto da cadeira',
            'Deitar a cabeça em cima do teclado para descansar',
            'Subir ainda mais a cadeira até os pés não chegarem de todo ao chão',
            'Aproximar o monitor até ficar a 5 centímetros dos olhos',
          ],
          en: [
            'Place both feet flat on the floor and lean spine against the backrest',
            'Rest head on the keyboard to nap',
            'Raise chair even higher so feet dangle completely',
            'Pull the monitor to 5 cm from eyes',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'Apoiar os pés estabiliza a bacia e alivia a pressão lombar na coluna.',
          en: 'Placing feet flat stabilizes the pelvis and relieves lower back tension.',
        },
      },
      {
        id: 'p2',
        situation: {
          pt: 'O Tiago sente os ombros muito tensos e levantados para cima quando usa o rato.',
          en: 'Tiago feels his shoulders hunched upward when using the mouse.',
        },
        question: {
          pt: 'Por que motivo isto está a acontecer?',
          en: 'Why is this tension occurring?',
        },
        options: {
          pt: [
            'A secretária ou os apoios de braço estão demasiado altos para o tamanho dele',
            'O rato tem falta de pilhas novas',
            'A divisão tem luz a mais vinda da janela',
            'O monitor está muito longe',
          ],
          en: [
            'The desk or armrests are too high for his stature',
            'The mouse has low batteries',
            'The room has excessive window glare',
            'The screen is positioned too far',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'Quando a mesa é muito alta, os ombros são forçados a subir para apoiar as mãos, causando contraturas.',
          en: 'When desk surfaces are too high, shoulders stay constantly elevated, causing traps fatigue.',
        },
      },
    ],
  },
  'desafio-ataque-dicionario': {
    title: { pt: '🛡️ Defesa contra Ataques de Dicionário', en: '🛡️ Dictionary Attack Defense' },
    instructions: {
      pt: 'Aprende como os computadores dos piratas testam milhões de palavras comuns e como deves criar senhas indecifráveis.',
      en: 'Learn how automated bots guess common dictionary words and how to build impenetrable passphrases.',
    },
    questions: [
      {
        id: 'd1',
        situation: {
          pt: 'Um software automático de força bruta tenta adivinhar senhas testando palavras do dicionário e nomes conhecidos.',
          en: 'An automated brute-force tool attempts to guess passwords from dictionaries and names.',
        },
        question: {
          pt: 'Qual das seguintes palavras-passe seria decifrada em MENOS de 1 segundo?',
          en: 'Which of the following passwords would be cracked in UNDER 1 second?',
        },
        options: {
          pt: [
            'futebol2024',
            'V!0la#Verd3_942$',
            'X8#mK9!qL2@pZ1$',
            'Sol*Brilhante_45!',
          ],
          en: [
            'football2024',
            'V!0la#Verd3_942$',
            'X8#mK9!qL2@pZ1$',
            'Sun*Shining_45!',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'Palavras de dicionário simples como desportos seguidas de anos atuais estão no topo das listas automáticas de ataque.',
          en: 'Common words combined with years sit right at the top of hacker wordlists.',
        },
      },
    ],
  },
  'desafio-licencas-cc': {
    title: { pt: '⚖️ O Desafio das Licenças Creative Commons', en: '⚖️ Creative Commons License Challenge' },
    instructions: {
      pt: 'Identifica os símbolos CC e descobre como podes usar imagens e músicas nos teus trabalhos da escola.',
      en: 'Recognize CC symbols and understand permissible uses for school projects.',
    },
    questions: [
      {
        id: 'cc1',
        situation: {
          pt: 'Encontraste uma imagem para o teu cartaz escolar com o símbolo CC-BY (Atribuição).',
          en: 'You found an image with a CC-BY (Attribution) icon for your school poster.',
        },
        question: {
          pt: 'O que tens obrigatoriamente de fazer para a usar legalmente?',
          en: 'What is mandatory to use it legally?',
        },
        options: {
          pt: [
            'Indicar o nome do autor original e a fonte da imagem',
            'Pagar uma quantia em dinheiro ao autor pelo correio',
            'Não podes usar em circunstância alguma',
            'Apagar a assinatura do autor com o editor de imagem',
          ],
          en: [
            'Give clear credit to the author and cite the source link',
            'Send money to the creator by post',
            'Never use it under any circumstances',
            'Erase author signatures using image editing software',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'A licença CC-BY permite qualquer uso desde que seja dada atribuição (crédito) ao autor original.',
          en: 'CC-BY grants permission provided the original author is duly credited.',
        },
      },
    ],
  },
  'desafio-montar-referencia': {
    title: { pt: '📚 Construtor de Referências Bibliográficas', en: '📚 Bibliography Citation Builder' },
    instructions: {
      pt: 'Ordena os elementos de uma citação fiável: Autor, Ano, Título e Endereço Web.',
      en: 'Organize the elements of an academic reference: Author, Year, Title, and Source URL.',
    },
    questions: [
      {
        id: 'ref1',
        situation: {
          pt: 'Consultaste o artigo "As Aves de Portugal" escrito por Carlos Antunes em 2023 no site Ciência Hoje.',
          en: 'You referenced "Birds of Portugal" by Carlos Antunes published in 2023 on Science Today.',
        },
        question: {
          pt: 'Qual é a estrutura correta para a bibliografia final do teu trabalho?',
          en: 'What is the correct citation format for your bibliography?',
        },
        options: {
          pt: [
            'ANTUNES, Carlos (2023). As Aves de Portugal. Ciência Hoje. Consultado em [Data]',
            'Pesquisei no Google ontem à tarde',
            'www.google.pt',
            'Um senhor chamado Carlos escreveu numa página da internet',
          ],
          en: [
            'ANTUNES, Carlos (2023). Birds of Portugal. Science Today. Retrieved [Date]',
            'I found it on Google yesterday',
            'www.google.com',
            'Some guy named Carlos wrote a webpage',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'Uma referência completa inclui Autor, Ano, Título da obra, Nome da fonte e Data de consulta.',
          en: 'A valid bibliographic citation requires Author, Year, Title, Source, and Access Date.',
        },
      },
    ],
  },
};

interface GenericChallengeGameProps {
  challengeId: string;
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

export const GenericChallengeGame: React.FC<GenericChallengeGameProps> = ({
  challengeId,
  language,
  onBack,
  onFinish,
}) => {
  const challenge = CHALLENGE_DATA[challengeId] || {
    title: { pt: 'Desafio Prático', en: 'Practical Challenge' },
    instructions: {
      pt: 'Responde às situações com rigor e atenção para ganhares pontos e insígnias!',
      en: 'Answer each scenario with attention to detail to unlock badges and points!',
    },
    questions: [
      {
        id: 'def1',
        situation: {
          pt: 'Estás a realizar um trabalho de pesquisa para a disciplina de TIC no computador.',
          en: 'You are working on an ICT research assignment on your computer.',
        },
        question: {
          pt: 'Qual é a melhor prática recomendada?',
          en: 'What is the recommended best practice?',
        },
        options: {
          pt: [
            'Planear as pesquisas, guardar as fontes e verificar a postura na secretária',
            'Copiar e colar o primeiro parágrafo que aparecer sem ler',
            'Desativar o antivírus e clicar em banners piscantes',
            'Partilhar as palavras-passe com desconhecidos',
          ],
          en: [
            'Plan keywords, record sources, and mind your posture at the desk',
            'Copy and paste the first paragraph without reading',
            'Disable antivirus and click flashy banners',
            'Share passwords with random online strangers',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'A responsabilidade e o rigor garantem trabalhos de qualidade e navegação segura.',
          en: 'Responsible research and digital discipline guarantee academic success.',
        },
      },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentQ = challenge.questions[currentIndex];
  const selected = selectedAnswers[currentIndex];
  const isCorrect = selected === currentQ.correctIndex;

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex + 1 < challenge.questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      let correct = 0;
      challenge.questions.forEach((q, i) => {
        if (selectedAnswers[i] === q.correctIndex) correct++;
      });
      const maxScore = challenge.questions.length * 10;
      const score = correct * 10;
      const percentage = Math.round((correct / challenge.questions.length) * 100);
      onFinish(score, maxScore, percentage);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'pt' ? 'Voltar ao Tema' : 'Back to Theme'}</span>
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-[2rem] text-white p-6 sm:p-8 shadow-xl mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
          {language === 'pt' ? 'Desafio Interativo' : 'Interactive Challenge'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          {challenge.title[language]}
        </h1>
        <p className="text-xs sm:text-sm text-indigo-200 mt-2">
          {challenge.instructions[language]}
        </p>
      </div>

      {!completed ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>PERGUNTA {currentIndex + 1} DE {challenge.questions.length}</span>
            <span>+10 PTS CADA</span>
          </div>

          {/* Scenario box */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Cenário:</p>
            <p className="text-sm font-semibold">{currentQ.situation[language]}</p>
          </div>

          {/* Question */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {currentQ.question[language]}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options[language].map((opt, optIdx) => {
              let btnStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700';

              if (showFeedback) {
                if (optIdx === currentQ.correctIndex) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (selected === optIdx) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 font-bold';
                } else {
                  btnStyle = 'border-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={showFeedback}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {showFeedback && optIdx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showFeedback && selected === optIdx && optIdx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback section */}
          {showFeedback && (
            <div
              className={`p-4 rounded-2xl animate-in fade-in ${
                isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              <p className="font-bold text-sm mb-1">{isCorrect ? '✅ Resposta Exata!' : '💡 Dica Importante:'}</p>
              <p className="text-xs sm:text-sm">{currentQ.explanation[language]}</p>
              <button
                onClick={handleNext}
                className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{currentIndex + 1 < challenge.questions.length ? 'Próxima Pergunta' : 'Ver Resultados'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 text-center space-y-4 shadow-xs animate-in zoom-in-95">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'pt' ? 'Desafio Concluído!' : 'Challenge Completed!'}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {language === 'pt'
              ? 'Excelente empenho! Os teus pontos foram registados no teu portfólio de aprendizagem.'
              : 'Great job! Your points have been recorded in your learning profile.'}
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleRetry}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Repetir' : 'Retry'}</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
            >
              <span>{language === 'pt' ? 'Voltar ao Tema' : 'Back to Theme'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
