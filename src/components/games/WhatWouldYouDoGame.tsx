import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface WhatWouldYouDoGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface Dilemma {
  id: number;
  scenario: { pt: string; en: string };
  options: {
    text: { pt: string; en: string };
    isBest: boolean;
    feedback: { pt: string; en: string };
  }[];
}

const DILEMMAS: Dilemma[] = [
  {
    id: 1,
    scenario: {
      pt: 'No intervalo, um colega tirou uma fotografia embaraçosa de outro aluno a tropeçar e partilhou-a num grupo de chat da turma a rir-se.',
      en: 'During break time, a classmate snapped an embarrassing photo of a student tripping and posted it in the class chat group to mock him.',
    },
    options: [
      {
        text: {
          pt: 'Reencaminhar a foto para outros amigos para que todos se riam também.',
          en: 'Forward the picture to other friends so everyone can laugh too.',
        },
        isBest: false,
        feedback: {
          pt: '❌ Errado! Partilhar conteúdos humilhantes é uma forma de cyberbullying e fere a dignidade do colega.',
          en: '❌ Wrong! Sharing humiliating media fuels cyberbullying and harms your peer dignity.',
        },
      },
      {
        text: {
          pt: 'Não partilhar, dizer com calma no grupo que isso magoa o colega e apoiar o aluno afetado.',
          en: 'Do not forward it, calmly state in the chat that this is hurtful, and support the victim.',
        },
        isBest: true,
        feedback: {
          pt: '✅ Atitude exemplar! Não ser cúmplice e defender quem precisa demonstra verdadeira cidadania e empatia digital.',
          en: '✅ Exemplary attitude! Standing up against humiliation demonstrates digital citizenship and empathy.',
        },
      },
      {
        text: {
          pt: 'Tirar uma foto ao colega que gozou para te vingares.',
          en: 'Snap an embarrassing picture of the bully to seek revenge.',
        },
        isBest: false,
        feedback: {
          pt: '❌ Errado! Responder com a mesma moeda cria uma espiral tóxica de conflito na turma.',
          en: '❌ Wrong! Retaliating in kind accelerates a toxic conflict spiral.',
        },
      },
    ],
  },
  {
    id: 2,
    scenario: {
      pt: 'O teu melhor amigo esqueceu-se da palavra-passe dele e pede-te a tua emprestada "só para entregar um trabalho na plataforma escolar".',
      en: 'Your best friend forgot his password and asks to borrow yours "just to submit homework on the school portal".',
    },
    options: [
      {
        text: {
          pt: 'Dar-lhe a palavra-passe, afinal são melhores amigos.',
          en: 'Give him your password, since you are best friends.',
        },
        isBest: false,
        feedback: {
          pt: '❌ Não deves! Uma palavra-passe é estritamente pessoal e intransmissível. Se ele fizer algo indevido na tua conta, a responsabilidade será tua.',
          en: '❌ Never! Passwords are strictly personal. Anything done on your account is attributed to you.',
        },
      },
      {
        text: {
          pt: 'Explicar com simpatia que a palavra-passe é pessoal e ajudá-lo a pedir ao professor ou usar o botão de recuperação.',
          en: 'Kindly explain that passwords cannot be shared and help him ask the teacher or click password recovery.',
        },
        isBest: true,
        feedback: {
          pt: '✅ Resposta perfeita! Ajudas o teu amigo pelo caminho correto sem comprometer a segurança da tua conta.',
          en: '✅ Perfect answer! You assist your friend legitimately without breaching your own account security.',
        },
      },
      {
        text: {
          pt: 'Cobrar-lhe dinheiro ou um lanche para lhe dizeres a palavra-passe.',
          en: 'Charge him money or a snack in exchange for your password.',
        },
        isBest: false,
        feedback: {
          pt: '❌ Errado e desonesto! A segurança digital nunca deve ser moeda de troca.',
          en: '❌ Wrong and dishonest! Digital security must never be bargained away.',
        },
      },
    ],
  },
  {
    id: 3,
    scenario: {
      pt: 'Recebeste uma mensagem no chat a dizer: "Urgente! Passa esta mensagem a 15 pessoas ou o teu telemóvel apaga tudo e terás azar durante 5 anos".',
      en: 'You received a chain message saying: "Urgent! Forward this to 15 people or your phone will erase everything and you will have bad luck for 5 years".',
    },
    options: [
      {
        text: {
          pt: 'Enviar imediatamente a todos os teus contactos da turma com medo que aconteça.',
          en: 'Send it immediately to all classmates out of fear.',
        },
        isBest: false,
        feedback: {
          pt: '❌ Errado! Estas correntes são boatos falsos concebidos para espalhar spam e assustar as pessoas.',
          en: '❌ Wrong! These chains are fake hoaxes designed to spread panic and spam.',
        },
      },
      {
        text: {
          pt: 'Apagar a mensagem com calma e não reencaminhar para ninguém.',
          en: 'Calmly delete the message and do not forward it to anyone.',
        },
        isBest: true,
        feedback: {
          pt: '✅ Exatamente! Quebrar as correntes de boatos impede a desinformação e o pânico desnecessário.',
          en: '✅ Exactly! Breaking the hoax chain stops misinformation and unnecessary spam.',
        },
      },
    ],
  },
  {
    id: 4,
    scenario: {
      pt: 'Estás a fazer um trabalho escolar de TIC e encontraste um texto perfeito na Wikipédia sobre a história dos computadores.',
      en: 'You are writing an ICT school report and found an excellent Wikipedia text describing computer history.',
    },
    options: [
      {
        text: {
          pt: 'Copiar e colar tudo diretamente para o trabalho e dizer que foste tu que escreveste.',
          en: 'Copy and paste everything directly into your report and claim you wrote it.',
        },
        isBest: false,
        feedback: {
          pt: '❌ Isso é plágio! Apresentar o trabalho dos outros como se fosse teu é desonesto.',
          en: '❌ That is plagiarism! Claiming someone else work as your own violates academic integrity.',
        },
      },
      {
        text: {
          pt: 'Ler a informação, escrever com as tuas próprias palavras e colocar a fonte de onde retiraste a informação.',
          en: 'Read the information, rephrase in your own words, and cite the reference source clearly.',
        },
        isBest: true,
        feedback: {
          pt: '✅ Brilhante! É exatamente assim que se realiza uma pesquisa académica honesta e de qualidade.',
          en: '✅ Brilliant! This is the hallmark of honest, high-quality scholarly research.',
        },
      },
    ],
  },
];

export const WhatWouldYouDoGame: React.FC<WhatWouldYouDoGameProps> = ({ language, onBack, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const t = translations[language];
  const dilemma = DILEMMAS[currentIndex];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (dilemma.options[idx].isBest) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < DILEMMAS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
      const pct = Math.round(((score + (dilemma.options[selectedOption || 0]?.isBest ? 1 : 0)) / DILEMMAS.length) * 100);
      onFinish(score, DILEMMAS.length, pct);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToTheme}</span>
      </button>

      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
          {language === 'pt' ? 'Desafio 4' : 'Challenge 4'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {language === 'pt' ? '⚖️ O que farias? — Cidadania Digital' : '⚖️ What would you do? — Digital Citizenship'}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {language === 'pt'
            ? 'Enfrenta dilemas reais do quotidiano e descobre qual a decisão ética e segura mais correta.'
            : 'Faced with real-life situations, choose the safest and most ethical course of action.'}
        </p>
      </div>

      {!finished ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
            <span>
              {language === 'pt' ? `Dilema ${currentIndex + 1} de ${DILEMMAS.length}` : `Dilemma ${currentIndex + 1} of ${DILEMMAS.length}`}
            </span>
            <span>
              {language === 'pt' ? `Decisões exemplares: ${score}` : `Exemplary choices: ${score}`}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-base sm:text-lg font-bold text-indigo-950 leading-relaxed">
              "{dilemma.scenario[language]}"
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {dilemma.options.map((opt, idx) => {
              let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

              if (selectedOption !== null) {
                if (opt.isBest) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (selectedOption === idx) {
                  btnClass = 'border-rose-500 bg-rose-50 text-rose-950 font-semibold';
                } else {
                  btnClass = 'border-slate-200 bg-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <span className="font-medium">{opt.text[language]}</span>
                  {selectedOption !== null && opt.isBest && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {selectedOption === idx && !opt.isBest && (
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Continue */}
          {selectedOption !== null && (
            <div className="space-y-4 pt-2 animate-in fade-in">
              <div className={`p-4 rounded-2xl ${
                dilemma.options[selectedOption].isBest ? 'bg-emerald-100/80 text-emerald-900' : 'bg-amber-100/80 text-amber-900'
              }`}>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {dilemma.options[selectedOption].feedback[language]}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                {currentIndex + 1 < DILEMMAS.length
                  ? (language === 'pt' ? 'Próximo Dilema →' : 'Next Dilemma →')
                  : (language === 'pt' ? 'Concluir Desafio 🏆' : 'Finish Challenge 🏆')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm text-center space-y-4 animate-in zoom-in-95">
          <div className="text-5xl">🎖️</div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {language === 'pt' ? 'Dilemas Concluídos!' : 'Dilemmas Completed!'}
          </h2>
          <p className="text-base text-slate-600">
            {language === 'pt'
              ? `Tomaste ${score} de ${DILEMMAS.length} decisões exemplares.`
              : `You made ${score} out of ${DILEMMAS.length} exemplary choices.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm cursor-pointer"
            >
              {t.backToTheme}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
