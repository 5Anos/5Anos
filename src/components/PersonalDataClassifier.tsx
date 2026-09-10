import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Language } from '../types';
import { AudioSpeakButton } from './AudioSpeakButton';

interface PersonalDataClassifierProps {
  language?: Language;
}

interface DataItem {
  id: string;
  name: { pt: string; en: string };
  icon: string;
  isPrivate: boolean;
  advice: { pt: string; en: string };
}

const DATA_ITEMS: DataItem[] = [
  {
    id: 'morada',
    name: { pt: 'A tua Morada de Casa', en: 'Your Home Address' },
    icon: '🏠',
    isPrivate: true,
    advice: { pt: 'Dados ultra-sensíveis! Nunca partilhes onde moras com desconhecidos online.', en: 'Highly sensitive! Never share your home location with strangers.' },
  },
  {
    id: 'cor',
    name: { pt: 'A tua Cor Favorita', en: 'Your Favorite Color' },
    icon: '🎨',
    isPrivate: false,
    advice: { pt: 'Seguro! Não é um dado pessoal confidencial nem perigoso.', en: 'Safe! Not confidential or risky to share in hobbies.' },
  },
  {
    id: 'telemovel',
    name: { pt: 'Número de Telemóvel', en: 'Phone Number' },
    icon: '📱',
    isPrivate: true,
    advice: { pt: 'Privado! Pode ser usado para burlas por SMS ou chamadas suspeitas.', en: 'Private! Can be used for spam or phishing calls.' },
  },
  {
    id: 'avatar',
    name: { pt: 'Desenho / Avatar de Perfil', en: 'Profile Avatar' },
    icon: '👾',
    isPrivate: false,
    advice: { pt: 'Ótima escolha! Usar avatares em vez da tua cara real protege a tua identidade.', en: 'Great practice! Avatars protect your real face and identity.' },
  },
  {
    id: 'escola',
    name: { pt: 'Nome e Horário da tua Escola', en: 'School Name & Schedule' },
    icon: '🏫',
    isPrivate: true,
    advice: { pt: 'Privado! Revela a tua rotina e localização física diária.', en: 'Private! Discloses your physical location and daily routine.' },
  },
  {
    id: 'musica',
    name: { pt: 'Gosto Musical / Canção Favorita', en: 'Favorite Music Genre' },
    icon: '🎵',
    isPrivate: false,
    advice: { pt: 'Seguro! Partilhar gostos de música e arte é saudável e divertido.', en: 'Safe! Sharing music tastes is safe and enjoyable.' },
  },
];

export const PersonalDataClassifier: React.FC<PersonalDataClassifierProps> = ({ language = 'pt' }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const handleClassify = (id: string, choiceIsPrivate: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: choiceIsPrivate }));
  };

  const title = language === 'pt' ? 'Classificador de Dados: Privado 🛑 vs Partilhável ✅' : 'Data Sorter: Confidential 🛑 vs Shareable ✅';
  const desc = language === 'pt'
    ? 'Identifica o que deves guardar em segredo e o que podes partilhar com segurança!'
    : 'Identify what must remain confidential and what is safe to share!';

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/70 rounded-3xl border-2 border-indigo-200/80 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
            🛡️
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {title}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {desc}
            </p>
          </div>
        </div>

        <AudioSpeakButton
          id="personal-data-classifier-intro"
          text={`${title}. ${desc}`}
          language={language}
          label={language === 'pt' ? 'Ouvir Desafio' : 'Listen'}
          variant="pill"
          size="xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {DATA_ITEMS.map((item) => {
          const userChoice = answers[item.id];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = userChoice === item.isPrivate;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1.5 bg-slate-100 rounded-xl">{item.icon}</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">{item.name[language]}</h4>
                  </div>
                  <AudioSpeakButton
                    id={`personal-data-${item.id}`}
                    text={`${item.name[language]}. ${hasAnswered ? item.advice[language] : (language === 'pt' ? 'Privado ou Partilhável?' : 'Private or Shareable?')}`}
                    language={language}
                    variant="icon"
                    size="xs"
                  />
                </div>

                {!hasAnswered ? (
                  <p className="text-xs text-slate-500 font-medium my-2">
                    {language === 'pt' ? 'Como classificas este dado?' : 'How do you classify this info?'}
                  </p>
                ) : (
                  <div className="mt-2 text-xs font-medium space-y-1">
                    <p className={`font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                      <span>{isCorrect ? 'Classificação Perfeita!' : 'Atenção à Privacidade!'}</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">{item.advice[language]}</p>
                  </div>
                )}
              </div>

              {!hasAnswered && (
                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleClassify(item.id, true)}
                    className="py-1.5 px-2 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-bold transition-colors cursor-pointer border border-rose-200"
                  >
                    🛑 Privado
                  </button>
                  <button
                    onClick={() => handleClassify(item.id, false)}
                    className="py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                  >
                    ✅ Partilhável
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
