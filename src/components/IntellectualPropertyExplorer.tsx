import React, { useState } from 'react';
import { Copyright, Sparkles, CheckCircle2, Shield, Heart, HelpCircle, XCircle } from 'lucide-react';
import { Language } from '../types';

interface IntellectualPropertyExplorerProps {
  language?: Language;
}

export const IntellectualPropertyExplorer: React.FC<IntellectualPropertyExplorerProps> = ({ language = 'pt' }) => {
  const [activeCategory, setActiveCategory] = useState<'books' | 'music' | 'code' | 'art'>('art');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});

  const CATEGORIES = {
    art: {
      name: 'Desenhos e Fotografias',
      icon: '🎨',
      example: 'Um desenho que fizeste na aula de Educação Visual.',
      rule: 'O direito de autor nasce no momento da criação! Ninguém pode usar o teu desenho sem o teu consentimento.',
    },
    books: {
      name: 'Textos e Histórias',
      icon: '📖',
      example: 'Um conto escrito por um escritor português.',
      rule: 'Não podes copiar capítulos inteiros e dizer que foste tu que escreveste. Deves sempre citar o autor!',
    },
    music: {
      name: 'Música e Sons',
      icon: '🎵',
      example: 'Uma canção composta por uma banda.',
      rule: 'Para usar música de fundo num vídeo no YouTube, precisas de autorização ou de usar faixas com licença aberta (Creative Commons).',
    },
    code: {
      name: 'Jogos e Programas',
      icon: '💻',
      example: 'O código de um jogo em Scratch ou Python.',
      rule: 'Os criadores de jogos investem anos de trabalho. Respeitar o software original valoriza a profissão dos criadores.',
    },
  };

  const MINI_CHALLENGES = [
    {
      id: 'mc1',
      scenario: {
        pt: 'Fizeste uma pintura bonita na aula de Educação Visual. Um colega tirou foto e publicou no blog dele sem o teu nome.',
        en: 'You painted a drawing in art class. A classmate took a photo and published it on his blog without giving you credit.',
      },
      question: {
        pt: 'O teu desenho está protegido por direitos de autor?',
        en: 'Is your artwork protected by copyright?',
      },
      correctIsYes: true,
      explanation: {
        pt: 'Sim! O direito de autor pertence a quem cria a obra desde o primeiro momento. O teu colega tinha de pedir autorização e identificar-te como autor!',
        en: 'Yes! Copyright belongs to the creator from the moment of creation. Your classmate needed permission and proper attribution!',
      },
    },
    {
      id: 'mc2',
      scenario: {
        pt: 'Encontraste uma imagem no Google Imagens sem nenhuma menção explícita a direitos de autor.',
        en: 'You found an image on Google Images with no explicit mention of copyright.',
      },
      question: {
        pt: 'Significa que a imagem é livre e podes usá-la como se fosse tua?',
        en: 'Does this mean the image is completely free and you can claim it as yours?',
      },
      correctIsYes: false,
      explanation: {
        pt: 'Não! Na Internet, quase todas as obras têm direitos de autor por defeito, mesmo que não tenham o símbolo © visível. Deves sempre verificar a licença e dar o devido crédito!',
        en: 'No! Almost all works online are copyrighted by default, even without a visible © symbol. Always check licenses and give credit!',
      },
    },
  ];

  const active = CATEGORIES[activeCategory];

  const handleAnswerQuiz = (id: string, choiceYes: boolean) => {
    setQuizAnswers((prev) => ({ ...prev, [id]: choiceYes }));
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
            ©️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'O que Protegem os Direitos de Autor?' : 'What do Copyright Laws Protect?'}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'pt'
                ? 'Qualquer trabalho criativo original é protegido por lei assim que é criado!'
                : 'Any original creative work is protected by law from creation!'}
            </p>
          </div>
        </div>
      </div>

      {/* Category selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key as any)}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              activeCategory === key
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 font-bold'
            }`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-xs">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Category card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <span className="text-2xl">{active.icon}</span>
          <span>{active.name}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 font-medium">
          <strong>Exemplo Prático:</strong> {active.example}
        </p>
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
          💡 <strong>Regra de Direitos de Autor:</strong> {active.rule}
        </div>
      </div>

      {/* Interactive Micro-Challenges within the content */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{language === 'pt' ? 'Desafio Rápido: Testa o teu Conhecimento' : 'Quick Challenge: Test Your Knowledge'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MINI_CHALLENGES.map((mc) => {
            const userChoice = quizAnswers[mc.id];
            const hasAnswered = userChoice !== undefined;
            const isCorrect = userChoice === mc.correctIsYes;

            return (
              <div
                key={mc.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 ${
                  hasAnswered
                    ? isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-rose-50/70 border-rose-300'
                    : 'bg-white border-slate-200 hover:border-amber-300 shadow-2xs'
                }`}
              >
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {mc.scenario[language as 'pt' | 'en']}
                  </p>
                  <p className="text-xs sm:text-sm font-black text-slate-900">
                    {mc.question[language as 'pt' | 'en']}
                  </p>
                </div>

                {!hasAnswered ? (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleAnswerQuiz(mc.id, true)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-200"
                    >
                      {language === 'pt' ? 'Sim, está protegido' : 'Yes, protected'}
                    </button>
                    <button
                      onClick={() => handleAnswerQuiz(mc.id, false)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-200"
                    >
                      {language === 'pt' ? 'Não está protegido' : 'Not protected'}
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-black">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-800">{language === 'pt' ? 'Resposta Correta!' : 'Correct!'}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span className="text-rose-800">{language === 'pt' ? 'Não é bem assim...' : 'Not quite...'}</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {mc.explanation[language as 'pt' | 'en']}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
