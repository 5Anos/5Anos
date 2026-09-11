import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, Trophy, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';

interface ChallengeQuestion {
  id: string;
  situation: { pt: string; en: string };
  question: { pt: string; en: string };
  options: { pt: string[]; en: string[] };
  correctIndex: number;
  explanation: { pt: string; en: string };
}

// Interactive question sets for challenges across the 7 themes
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
      pt: 'Aprende como os programas automáticos testam palavras comuns e como deves criar palavras-passe difíceis de adivinhar.',
      en: 'Learn how automated bots guess common dictionary words and how to build strong, hard-to-guess passphrases.',
    },
    questions: [
      {
        id: 'd1',
        situation: {
          pt: 'Um programa automático tenta adivinhar palavras-passe testando palavras do dicionário e combinações conhecidas.',
          en: 'An automated tool attempts to guess passwords from dictionaries and common patterns.',
        },
        question: {
          pt: 'Qual das seguintes palavras-passe seria muito fácil e rápida de adivinhar?',
          en: 'Which of the following passwords would be very easy and quick to guess?',
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
      pt: 'Identifica os símbolos CC (BY, NC, ND, SA) e descobre como podes usar imagens e músicas nos teus trabalhos da escola.',
      en: 'Recognize CC symbols (BY, NC, ND, SA) and understand permissible uses for school projects.',
    },
    questions: [
      {
        id: 'cc1',
        situation: {
          pt: 'Encontraste uma fotografia para o teu cartaz escolar com a licença CC-BY (Atribuição).',
          en: 'You found a photograph with a CC-BY (Attribution) icon for your school poster.',
        },
        question: {
          pt: 'O que tens de fazer para a utilizar legalmente no teu trabalho?',
          en: 'What is required to use it legally in your schoolwork?',
        },
        options: {
          pt: [
            'Indicar o nome do autor original e o link da fonte onde a encontraste',
            'Pagar uma quantia em dinheiro ao autor por correio',
            'Não podes usar de forma alguma na escola',
            'Apagar a assinatura do autor com um editor de imagem',
          ],
          en: [
            'Give clear credit to the author and link to the source',
            'Send money to the author by mail',
            'You cannot use it in school at all',
            'Erase author signatures using image editing software',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'A licença CC-BY permite partilhar e adaptar a obra livremente, desde que se dê sempre o devido crédito ao autor original.',
          en: 'CC-BY allows free sharing and adaptation as long as the original creator is properly credited.',
        },
      },
      {
        id: 'cc2',
        situation: {
          pt: 'Uma música instrumental tem o símbolo CC-NC (Não Comercial). Um aluno quer usar a música como fundo num vídeo para apresentar na aula de TIC.',
          en: 'An instrumental song has the CC-NC (Non-Commercial) icon. A student wants to use it as background music for an in-class presentation.',
        },
        question: {
          pt: 'O trabalho escolar é considerado um uso permitido por esta licença?',
          en: 'Is this school presentation allowed under this license?',
        },
        options: {
          pt: [
            'Sim, porque é para fins educativos na escola e ninguém está a vender ou a lucrar com o vídeo',
            'Não, a música só pode ser ouvida no telemóvel do autor',
            'Só se o aluno vender o vídeo a outras turmas',
            'Não, é proibido usar qualquer música em apresentações escolares',
          ],
          en: [
            'Yes, because it is for educational classroom purposes without any financial profit or commercial sale',
            'No, the music can only be played on the creator’s device',
            'Only if the student sells the video to other classes',
            'No, all music is banned from school presentations',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'O símbolo "NC" (Não Comercial) proíbe a venda ou lucro comercial. A utilização para um trabalho escolar sem fins lucrativos é perfeitamente autorizada com atribuição!',
          en: 'NC prohibits commercial exploitation. Non-profit classroom usage with proper attribution is fully compliant.',
        },
      },
      {
        id: 'cc3',
        situation: {
          pt: 'Encontraste um desenho com a indicação CC-ND (Sem Derivações). Queres recortar apenas uma parte da imagem e mudar a cor de fundo.',
          en: 'You found an illustration marked CC-ND (No Derivatives). You want to crop out a section and alter its background color.',
        },
        question: {
          pt: 'A licença CC-ND permite fazer esta alteração gráfica?',
          en: 'Does the CC-ND license allow this graphical alteration?',
        },
        options: {
          pt: [
            'Não, porque "ND" significa que a imagem deve ser mantida na íntegra, sem alterações ou cortes',
            'Sim, podes mudar tudo desde que não digas a ninguém',
            'Sim, a licença ND obriga a mudar as cores originais',
            'Não, obras com licença ND não podem ser vistas por crianças',
          ],
          en: [
            'No, because "ND" specifies that the artwork must be used in its entirety without modifications or edits',
            'Yes, you can edit anything as long as you keep it secret',
            'Yes, ND mandates changing original colors',
            'No, ND works cannot be viewed by minors',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'O símbolo "ND" (No Derivatives / Sem Derivações) permite partilhar a obra original, mas proíbe que seja modificada, cortada ou remixada.',
          en: 'ND allows sharing of original works, but strictly forbids creating altered versions or remixes.',
        },
      },
    ],
  },
  'desafio-montar-referencia': {
    title: { pt: '📚 Construtor de Referências Bibliográficas', en: '📚 Bibliography Citation Builder' },
    instructions: {
      pt: 'Aprende a estruturar citações e referências fiáveis para os teus trabalhos escolares de TIC e outras disciplinas.',
      en: 'Learn to structure reliable citations and references for your ICT projects and schoolwork.',
    },
    questions: [
      {
        id: 'ref1',
        situation: {
          pt: 'Consultaste o artigo online "As Aves de Portugal" escrito pelo biólogo Carlos Antunes em 2023 no portal Ciência Viva.',
          en: 'You referenced the online article "Birds of Portugal" written by Carlos Antunes in 2023 on Ciência Viva.',
        },
        question: {
          pt: 'Qual é o formato correto e completo para a Webgrafia do teu trabalho?',
          en: 'What is the correct, complete citation for your bibliography?',
        },
        options: {
          pt: [
            'ANTUNES, Carlos (2023). As Aves de Portugal. Ciência Viva. https://cienciaviva.pt/aves',
            'Google Imagens / Internet',
            'Um senhor chamado Carlos escreveu numa página web',
            'www.google.pt',
          ],
          en: [
            'ANTUNES, Carlos (2023). Birds of Portugal. Ciência Viva. https://cienciaviva.pt/aves',
            'Google Images / Internet',
            'Some person named Carlos wrote on a site',
            'www.google.com',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'Uma referência bibliográfica completa contém: Autor (QUEM), Ano (QUANDO), Título (O QUÊ), Fonte/Publicação (ONDE) e o Endereço URL de acesso.',
          en: 'A complete reference includes: Author (WHO), Year (WHEN), Title (WHAT), Publisher (WHERE), and the URL.',
        },
      },
      {
        id: 'ref2',
        situation: {
          pt: 'Utilizaste uma frase exata do livro de Ciências Naturais para apoiar uma explicação no teu documento de texto.',
          en: 'You used an exact sentence from your Natural Sciences textbook in your text report.',
        },
        question: {
          pt: 'Como deves apresentar essa frase no corpo do texto para evitar plágio?',
          en: 'How should you format that exact sentence in your text to prevent plagiarism?',
        },
        options: {
          pt: [
            'Colocar o texto entre aspas ("...") e indicar imediatamente a autoria ou a página do manual',
            'Mudar a cor da letra para amarelo para que ninguém note',
            'Dizer que foste tu que inventaste aquela frase',
            'Apagar o nome do autor do livro',
          ],
          en: [
            'Enclose the text in quotation marks ("...") and identify the author or textbook page',
            'Change font color to yellow so nobody notices',
            'Claim you invented the sentence yourself',
            'Erase the book author’s name',
          ],
        },
        correctIndex: 0,
        explanation: {
          pt: 'As aspas ("...") indicam que se trata de uma citação textual (palavra por palavra). A identificação do autor atribui o devido mérito.',
          en: 'Quotation marks show a direct verbatim excerpt, while attributing the author acknowledges intellectual merit.',
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
      pt: 'Responde às situações com rigor e atenção para ganhares pontos e medalhas!',
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
      const maxScore = 100;
      const score = Math.round((correct / challenge.questions.length) * 100);
      const percentage = score;
      onFinish(score, maxScore, percentage);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setCompleted(false);
  };

  const correctCount = challenge.questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length;
  const finalScore = Math.round((correctCount / challenge.questions.length) * 100);

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
        <div className="flex items-start justify-between gap-3">
          <div>
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

          <AudioSpeakButton
            id={`challenge-header-${challengeId}`}
            text={`${challenge.title[language]}. ${challenge.instructions[language]}`}
            language={language}
            label={language === 'pt' ? 'Ouvir Desafio' : 'Listen Challenge'}
            variant="pill"
            size="sm"
          />
        </div>
      </div>

      {!completed ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>
              {language === 'pt' ? 'PERGUNTA' : 'QUESTION'} {currentIndex + 1} {language === 'pt' ? 'DE' : 'OF'} {challenge.questions.length}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              {language === 'pt' ? '100 XP MÁXIMO' : '100 MAX XP'}
            </span>
          </div>

          {/* Scenario box */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">
                {language === 'pt' ? 'Cenário:' : 'Scenario:'}
              </p>
              <p className="text-sm font-semibold">{currentQ.situation[language]}</p>
            </div>
            <AudioSpeakButton
              id={`challenge-situation-${currentIndex}`}
              text={currentQ.situation[language]}
              language={language}
              variant="icon"
              size="xs"
            />
          </div>

          {/* Question */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex-1">
              {currentQ.question[language]}
            </h2>
            <AudioSpeakButton
              id={`challenge-question-${currentIndex}`}
              text={`${currentQ.question[language]}. ${currentQ.options[language].map((opt, i) => `${language === 'pt' ? 'Opção' : 'Option'} ${i + 1}: ${opt}`).join('. ')}`}
              language={language}
              variant="icon"
              size="xs"
            />
          </div>

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
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-bold text-sm">
                  {isCorrect
                    ? (language === 'pt' ? '✅ Resposta Exata!' : '✅ Correct Answer!')
                    : (language === 'pt' ? '💡 Dica Importante:' : '💡 Important Tip:')}
                </p>
                <AudioSpeakButton
                  id={`challenge-feedback-${currentIndex}`}
                  text={`${isCorrect ? (language === 'pt' ? 'Resposta Exata.' : 'Correct answer.') : (language === 'pt' ? 'Dica importante.' : 'Important tip.')} ${currentQ.explanation[language]}`}
                  language={language}
                  variant="icon"
                  size="xs"
                />
              </div>
              <p className="text-xs sm:text-sm">{currentQ.explanation[language]}</p>
              <button
                onClick={handleNext}
                className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>
                  {currentIndex + 1 < challenge.questions.length
                    ? (language === 'pt' ? 'Próxima Pergunta' : 'Next Question')
                    : (language === 'pt' ? 'Ver Resultados' : 'View Results')}
                </span>
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-sm">
            <span>{finalScore} / 100 {language === 'pt' ? 'Pontos' : 'Points'}</span>
            <span>•</span>
            <span>
              {correctCount} {language === 'pt' ? 'de' : 'of'} {challenge.questions.length} {language === 'pt' ? 'Corretas' : 'Correct'}
            </span>
          </div>
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
