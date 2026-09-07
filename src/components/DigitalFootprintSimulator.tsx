import React, { useState } from 'react';
import { Sparkles, Check, AlertTriangle, Eye, ShieldCheck, RefreshCw } from 'lucide-react';

interface PostAction {
  id: string;
  action: string;
  category: string;
  isGood: boolean;
  impact: string;
}

export const DigitalFootprintSimulator: React.FC = () => {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const actions: PostAction[] = [
    {
      id: 'a1',
      action: 'Publicar foto com a morada da casa e nome da escola',
      category: 'Privacidade',
      isGood: false,
      impact: '🔴 Risco Elevado: Revela a tua localização e rotina a pessoas desconhecidas.',
    },
    {
      id: 'a2',
      action: 'Partilhar um trabalho de ciências ou desenho feito por ti',
      category: 'Criatividade',
      isGood: true,
      impact: '🟢 Pegada Positiva: Demonstra as tuas capacidades e interesses saudáveis.',
    },
    {
      id: 'a3',
      action: 'Comentar com respeito e elogiar o projeto de um colega',
      category: 'Cidadania',
      isGood: true,
      impact: '🟢 Pegada Positiva: Mostra empatia, amizade e bom relacionamento online.',
    },
    {
      id: 'a4',
      action: 'Partilhar uma foto embaraçosa de um colega sem autorização',
      category: 'Ciberbullying',
      isGood: false,
      impact: '🔴 Grave: Fere a privacidade do colega e cria um rasto negativo sobre ti.',
    },
  ];

  const toggleAction = (id: string) => {
    if (selectedActions.includes(id)) {
      setSelectedActions(selectedActions.filter((a) => a !== id));
    } else {
      setSelectedActions([...selectedActions, id]);
    }
  };

  const goodCount = selectedActions.filter((id) => actions.find((a) => a.id === id)?.isGood).length;
  const badCount = selectedActions.filter((id) => !actions.find((a) => a.id === id)?.isGood).length;

  return (
    <div className="w-full bg-gradient-to-b from-purple-50/80 to-slate-50 rounded-2xl border-2 border-purple-200 shadow-md p-3.5 sm:p-4 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-purple-200">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-purple-600 text-white rounded-lg shadow-sm">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-black text-purple-950 uppercase tracking-wide">
            Simulador de Pegada Digital
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full border border-purple-300">
          Laboratório Prático
        </span>
      </div>

      <p className="text-[11px] font-bold text-slate-700 mb-2">
        Seleciona ações para ver que tipo de rasto digital constróis:
      </p>

      {/* Action Options */}
      <div className="space-y-1.5 mb-3">
        {actions.map((act) => {
          const isSelected = selectedActions.includes(act.id);
          return (
            <div
              key={act.id}
              onClick={() => toggleAction(act.id)}
              className={`p-2 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                isSelected
                  ? act.isGood
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-300'
                    : 'bg-red-50 border-red-400 text-red-950 font-bold ring-1 ring-red-300'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{act.isGood ? '🌱' : '⚠️'}</span>
                <span>{act.action}</span>
              </div>
              <div
                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                  isSelected
                    ? act.isGood
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-red-600 border-red-600 text-white'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footprint Live Report */}
      <div className="bg-white rounded-xl p-3 border border-purple-100 shadow-xs text-xs space-y-2">
        <div className="flex items-center justify-between font-bold">
          <span className="text-slate-700">Estado da Tua Reputação Digital:</span>
          {selectedActions.length === 0 ? (
            <span className="text-slate-400 font-normal">Nenhuma ação selecionada</span>
          ) : badCount > 0 ? (
            <span className="text-red-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Pegada com Riscos!
            </span>
          ) : (
            <span className="text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Pegada Brilhante e Positiva! 🌟
            </span>
          )}
        </div>

        {selectedActions.length > 0 && (
          <div className="space-y-1 pt-1 border-t border-slate-100">
            {selectedActions.map((id) => {
              const item = actions.find((a) => a.id === id);
              if (!item) return null;
              return (
                <p key={id} className="text-[11px] font-medium leading-tight">
                  {item.impact}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
