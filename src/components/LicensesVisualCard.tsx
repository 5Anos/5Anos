import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Share2, FileCheck, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface Props {
  language: 'pt' | 'en';
}

export const LicensesVisualCard: React.FC<Props> = ({ language }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderSymbolSvg = (id: 'copyright' | 'copyleft' | 'royalty_free') => {
    if (id === 'copyright') {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xs">
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="8" />
          <path
            d="M 64 36 C 60 29 52 27 45 29 C 36 32 30 40 30 50 C 30 60 36 68 45 71 C 52 73 60 71 64 64"
            fill="none"
            stroke="#0f172a"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      );
    }
    if (id === 'copyleft') {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xs">
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="8" />
          <path
            d="M 36 36 C 40 29 48 27 55 29 C 64 32 70 40 70 50 C 70 60 64 68 55 71 C 48 73 40 71 36 64"
            fill="none"
            stroke="#0f172a"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xs">
        <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="8" />
        <text
          x="50"
          y="44"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="18"
          textAnchor="middle"
          fill="#0f172a"
        >
          Royalty
        </text>
        <text
          x="50"
          y="68"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="20"
          textAnchor="middle"
          fill="#0f172a"
        >
          Free
        </text>
      </svg>
    );
  };

  const cards = [
    {
      id: 'copyright' as const,
      title: 'Copyright (©)',
      subtitle: language === 'pt' ? 'Todos os direitos reservados' : 'All rights reserved',
      badge: language === 'pt' ? 'Autorização Necessária' : 'Permission Required',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      borderClass: 'border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
      bgGlow: 'from-amber-50/40 to-white',
      accentColor: 'text-amber-600',
      icon: ShieldAlert,
      statusLabel: language === 'pt' ? 'Pedir Autorização' : 'Ask Permission',
      statusClass: 'text-amber-800 font-extrabold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200',
      StatusIcon: AlertCircle,
      desc:
        language === 'pt'
          ? 'Normalmente é necessária autorização para utilizar a imagem.'
          : 'Permission is usually required before you can use the image.',
      rule:
        language === 'pt'
          ? 'Se uma imagem tiver Copyright, pede autorização antes de a utilizares num trabalho escolar ou procura uma alternativa livre.'
          : 'If an image has Copyright, ask for permission before using it in school work or find a free alternative.',
      metafor: language === 'pt' ? 'Porta Fechada 🔑' : 'Locked Door 🔑',
    },
    {
      id: 'copyleft' as const,
      title: 'Copyleft (🄯)',
      subtitle: language === 'pt' ? 'Partilha com a mesma licença' : 'Share under the same license',
      badge: language === 'pt' ? 'Partilha Livre' : 'Free to Share',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      borderClass: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
      bgGlow: 'from-blue-50/40 to-white',
      accentColor: 'text-blue-600',
      icon: Share2,
      statusLabel: language === 'pt' ? 'Permitido c/ Regras' : 'Allowed w/ Terms',
      statusClass: 'text-blue-800 font-extrabold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200',
      StatusIcon: CheckCircle2,
      desc:
        language === 'pt'
          ? 'Permite utilizar, modificar e redistribuir a obra, de acordo com os termos da licença.'
          : 'Allows using, modifying, and sharing the work according to the terms of the license.',
      rule:
        language === 'pt'
          ? 'Podes usar e modificar no teu trabalho da escola, desde que indiques quem é o autor e mantenhas as regras da licença.'
          : 'You can use and modify it in your school work, provided you credit the author and follow the license terms.',
      metafor: language === 'pt' ? 'Porta Aberta 🚪' : 'Open Door 🚪',
    },
    {
      id: 'royalty_free' as const,
      title: 'Royalty Free',
      subtitle: language === 'pt' ? 'Sem pagar por cada utilização' : 'No per-use royalty fees',
      badge: language === 'pt' ? 'Atenção às Condições' : 'Check Conditions',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      borderClass: 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100',
      bgGlow: 'from-emerald-50/40 to-white',
      accentColor: 'text-emerald-600',
      icon: FileCheck,
      statusLabel: language === 'pt' ? 'Ver Condições' : 'Check License Terms',
      statusClass: 'text-emerald-800 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200',
      StatusIcon: Info,
      desc:
        language === 'pt'
          ? 'Permite utilizar a imagem sem pagar royalties por cada utilização, mas pode exigir a aquisição de uma licença e ter condições específicas.'
          : 'Allows using the image without paying royalties for every use, but may require acquiring a license and having specific conditions.',
      rule:
        language === 'pt'
          ? 'Não significa que seja automaticamente grátis. Lê sempre os termos para saberes como a podes usar nos trabalhos escolares.'
          : 'It does not mean completely free of charge. Always read the conditions to know where and how you can use it in school.',
      metafor: language === 'pt' ? 'Licença Específica 📄' : 'Specific License 📄',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Cards 3-Column Grid centered and taking full space */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const isHighlighted = selectedId === card.id;
          const CardIcon = card.icon;
          const StatusIcon = card.StatusIcon;

          return (
            <div
              key={card.id}
              onClick={() => setSelectedId(selectedId === card.id ? null : card.id)}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border-2 bg-gradient-to-b ${card.bgGlow} shadow-md transition-all duration-300 cursor-pointer ${
                card.borderClass
              } ${isHighlighted ? 'ring-3 ring-indigo-500 shadow-xl scale-[1.02]' : 'hover:shadow-lg'}`}
            >
              <div className="space-y-4">
                {/* Header with Symbol & Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-center">
                    {renderSymbolSvg(card.id)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${card.badgeClass}`}
                    >
                      {card.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {card.metafor}
                    </span>
                  </div>
                </div>

                {/* Title and Subtitle */}
                <div className="pt-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                    {card.subtitle}
                  </p>
                </div>

                {/* Clear, simple description for 5th grade students */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal bg-white/80 p-3.5 rounded-2xl border border-slate-200/80">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Rule for School Work */}
              <div className="mt-5 pt-4 border-t border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <CardIcon className={`w-4 h-4 ${card.accentColor}`} />
                    {language === 'pt' ? 'Regra Escolar:' : 'School Rule:'}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] ${card.statusClass}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {card.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.rule}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Important pedagogical note banner requested by user */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-xs shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">
              {language === 'pt'
                ? '⚠️ Nota Importante'
                : '⚠️ Important Note'}
            </h4>
            <p className="text-xs text-amber-900/90 mt-0.5 leading-relaxed">
              {language === 'pt'
                ? 'Copyleft e Royalty Free não são exatamente tipos de licença únicos; são conceitos/modelos de licenciamento. Dentro deles podem existir diferentes licenças e condições.'
                : 'Copyleft and Royalty Free are not single licenses; they are licensing models/concepts. Different licenses and conditions can exist within each.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-white px-3.5 py-2 rounded-xl border border-amber-200 shrink-0">
          <Info className="w-4 h-4 text-amber-600" />
          <span>{language === 'pt' ? 'Lê sempre a licença' : 'Always read terms'}</span>
        </div>
      </div>
    </div>
  );
};
