import React, { useState } from 'react';
import { CheckSquare, Square, Sparkles, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import sitPostureImg from '../assets/images/sit_posture_guide_1788646722404.jpg';
import confetti from 'canvas-confetti';

interface Props {
  language?: 'pt' | 'en';
}

export const WorkspaceSetupLab: React.FC<Props> = ({ language = 'pt' }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    mesaLivre: false,
    cadeiraAjustada: false,
    cabosSeguros: false,
    espacoPernas: false,
    tecladoRato: false,
  });

  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);

  const toggleItem = (key: string) => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);

    const count = Object.values(updated).filter(Boolean).length;
    if (count === 5 && !hasCelebrated) {
      setHasCelebrated(true);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#6366f1', '#f59e0b', '#06b6d4'],
        });
      } catch {
        // safe fallback
      }
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllComplete = completedCount === 5;

  const checklist = [
    {
      id: 'mesaLivre',
      title: language === 'pt' ? '1. Secretária Desimpedida e Organizada' : '1. Clear and Tidy Desk Surface',
      desc: language === 'pt'
        ? 'Retira objetos desnecessários, cadernos antigos ou copos. Deixa espaço livre para apoiar os antebraços e movimentar o rato com conforto.'
        : 'Clear away clutter and old notebooks. Leave enough room for forearms and mouse movements.',
      icon: '📐',
    },
    {
      id: 'cadeiraAjustada',
      title: language === 'pt' ? '2. Cadeira Regulada à Altura da Mesa' : '2. Chair Adjusted to Desk Height',
      desc: language === 'pt'
        ? 'Ajusta a altura do assento para que os cotovelos fiquem na mesma linha horizontal da mesa, sem levantar os ombros.'
        : 'Adjust seat height so your elbows align with desk height without hunching shoulders.',
      icon: '🪑',
    },
    {
      id: 'cabosSeguros',
      title: language === 'pt' ? '3. Cabos Arrumados e Segurança Elétrica' : '3. Organized Cables & Electrical Safety',
      desc: language === 'pt'
        ? 'Organiza os fios por trás da secretária com fita ou abraçadeiras. Evita cabos soltos no chão para ninguém tropeçar ou puxar a ficha acidentalmente.'
        : 'Keep wires routed behind the desk. Avoid loose floor cords that pose tripping hazards.',
      icon: '🔌',
    },
    {
      id: 'espacoPernas',
      title: language === 'pt' ? '4. Espaço Livre por Baixo da Secretária' : '4. Clear Space Under the Desk',
      desc: language === 'pt'
        ? 'Nunca guardes caixas, mochilas ou tralha debaixo da mesa onde colocas as pernas. Deves conseguir esticar e mover as pernas livremente.'
        : 'Never stash backpacks or boxes in your leg space. You need room to stretch your legs comfortably.',
      icon: '🦵',
    },
    {
      id: 'tecladoRato',
      title: language === 'pt' ? '5. Teclado e Rato Alinhados e Próximos' : '5. Keyboard & Mouse Close Together',
      desc: language === 'pt'
        ? 'Coloca o rato junto ao teclado à mesma distância da margem da mesa (cerca de 10 a 15 cm) para não esticares o braço excessivamente.'
        : 'Keep your mouse right next to your keyboard, about 10-15 cm from the desk edge to prevent overreaching.',
      icon: '🖱️',
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-teal-200/90 shadow-lg overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-xl shrink-0">
            🖥️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                {language === 'pt' ? 'Laboratório: Organização do Espaço de Estudo' : 'Workspace Setup & Organization Lab'}
              </h3>
              <span className="bg-teal-400/30 text-teal-100 text-xs px-2.5 py-0.5 rounded-full font-bold border border-teal-300/40">
                {language === 'pt' ? 'Na Prática' : 'Hands-on'}
              </span>
            </div>
            <p className="text-xs text-teal-100/90 font-medium">
              {language === 'pt'
                ? 'Uma mesa arrumada e segura torna o estudo muito mais agradável e produtivo!'
                : 'A clean and safe desk setup makes studying far more pleasant and productive!'}
            </p>
          </div>
        </div>

        {/* Progress Score */}
        <div className="flex items-center gap-2 bg-teal-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-teal-400/30">
          <span className="text-xs text-teal-200 font-bold uppercase tracking-wider">
            {language === 'pt' ? 'Critérios de Espaço:' : 'Checklist Score:'}
          </span>
          <span className={`text-sm font-black px-2 py-0.5 rounded-xl ${
            isAllComplete ? 'bg-emerald-400 text-emerald-950 font-black' : 'bg-teal-400 text-teal-950'
          }`}>
            {completedCount}/5 {isAllComplete ? '⭐ OK' : ''}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Photo poster of ergonomic workspace setup */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>{language === 'pt' ? 'O Teu Posto de Estudo Ideal' : 'Your Ideal Study Station'}</span>
            </h4>

            <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-teal-200 shadow-inner group relative">
              <img
                src={sitPostureImg}
                alt="Espaço de Trabalho Organizado"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-3 text-white">
                <span className="text-xs font-bold block">
                  ✓ Mesa desimpedida, cadeira regulada e cabos protegidos
                </span>
              </div>
            </div>

            <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 text-xs text-teal-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-teal-900">
                <ShieldAlert className="w-4 h-4 text-teal-700" />
                <span>{language === 'pt' ? 'Dica de Segurança com Cabos:' : 'Cable Safety Tip:'}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {language === 'pt'
                  ? 'Fios espalhados pelo chão são a causa número 1 de quedas de computadores portáteis e tropeções. Mantém-nos sempre encostados ao rodapé ou agrupados com abraçadeiras!'
                  : 'Floor cables are the leading cause of laptop drops and trips. Always keep them secured against baseboards!'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                {language === 'pt' ? 'Checklist de Organização da Secretária' : 'Desk Setup Checklist'}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {language === 'pt' ? 'Clica para validar cada ponto' : 'Click to verify each item'}
              </span>
            </div>

            {checklist.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-teal-50/90 border-teal-300 text-teal-950 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-teal-300 text-slate-800'
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-teal-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <h5 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-teal-950 line-through/10' : 'text-slate-900'}`}>
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Completion Celebration Card */}
          {isAllComplete && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md flex items-center gap-3.5 animate-in zoom-in-95">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <div className="flex-1 text-xs sm:text-sm">
                <span className="font-extrabold block text-white">
                  🎉 {language === 'pt' ? 'Parabéns! Espaço de Estudo 100% Organizado!' : 'Workspace 100% Organized!'}
                </span>
                <span className="text-teal-100 font-medium text-[11px] sm:text-xs">
                  {language === 'pt'
                    ? 'Com este espaço arrumado, confortável e seguro, estás pronto para estudar com saúde e foco máximo.'
                    : 'With this organized, safe space, you are ready to study healthy and focused.'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
