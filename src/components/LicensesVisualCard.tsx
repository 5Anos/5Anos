import React, { useState } from 'react';
import {
  Lock,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Check,
  Search,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { FreeMediaBanks } from './FreeMediaBanks';

interface Props {
  language: 'pt' | 'en';
}

export const LicensesVisualCard: React.FC<Props> = ({ language }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="w-full space-y-5 select-none">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white p-5 sm:p-6 shadow-md border border-blue-700/40">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-2xl shadow-sm shrink-0 hidden sm:flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-1.5">
                <span className="text-amber-400 text-base">✨</span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {language === 'pt' ? 'Licenças: O que podes fazer?' : 'Licenses: What Can You Do?'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-blue-200 font-medium mt-0.5">
                {language === 'pt'
                  ? 'Nem tudo o que está na Internet pode ser usado livremente. Olha para o símbolo antes de escolher!'
                  : 'Not everything online can be used freely. Check the symbol before using!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-2xl shadow-sm font-black text-xs shrink-0">
            <Search className="w-4 h-4 text-slate-900 shrink-0" />
            <span>{language === 'pt' ? 'Verifica sempre a licença!' : 'Always check the license!'}</span>
          </div>
        </div>
      </div>

      {/* 4 License Columns / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 1. Copyright (©) */}
        <div
          onClick={() => setActiveCard(activeCard === 'copyright' ? null : 'copyright')}
          className={`flex flex-col justify-between rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-sm cursor-pointer ${
            activeCard === 'copyright'
              ? 'ring-2 ring-amber-500 scale-[1.01] shadow-md border-amber-400 bg-amber-50'
              : 'border-amber-200 bg-[#fffaf2] hover:border-amber-300 hover:shadow-md'
          }`}
        >
          <div>
            {/* Header */}
            <div className="bg-[#fed7aa] px-4 py-2.5 border-b border-amber-200 text-center">
              <h3 className="text-base font-black text-slate-900">
                Copyright (©)
              </h3>
            </div>

            <div className="p-4 space-y-3">
              {/* Official Symbol */}
              <div className="flex justify-center pt-1">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-900 flex items-center justify-center shadow-2xs">
                  <span className="text-3xl font-black text-slate-900 select-none pb-0.5">©</span>
                </div>
              </div>

              {/* Subtitle Pill */}
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-[#ffedd5] border border-amber-200 text-amber-950 text-xs font-bold">
                  {language === 'pt' ? 'Protegido pelo autor' : 'Protected by author'}
                </span>
              </div>

              {/* Simple Description for 10-year-olds */}
              <p className="text-xs text-slate-700 leading-relaxed text-center bg-white/90 p-2.5 rounded-xl border border-amber-100 font-medium">
                {language === 'pt'
                  ? 'Tem dono! Não podes copiar nem usar sem pedir autorização a quem criou.'
                  : 'It has an owner! You cannot copy or use it without asking permission.'}
              </p>

              {/* Example Symbol */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                  <span>Ex.: © 2024</span>
                </span>
              </div>

              {/* Rule Box */}
              <div className="bg-[#ffedd5]/70 rounded-xl p-2.5 border border-amber-200 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="text-[11px] font-black text-amber-950">
                    {language === 'pt' ? 'Regra para a escola:' : 'School rule:'}
                  </span>
                </div>
                <p className="text-[11px] text-amber-950 leading-snug font-medium pl-5">
                  {language === 'pt'
                    ? 'Não uses no teu trabalho sem ter a certeza de que é permitido.'
                    : 'Do not use without making sure it is permitted.'}
                </p>
              </div>
            </div>
          </div>

          {/* Verdict Banner */}
          <div className="p-2.5 bg-red-600 text-white text-center font-black text-xs flex items-center justify-center gap-1.5">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>{language === 'pt' ? 'Não podes usar livremente' : 'Cannot use freely'}</span>
          </div>
        </div>

        {/* 2. Copyleft (🄯) */}
        <div
          onClick={() => setActiveCard(activeCard === 'copyleft' ? null : 'copyleft')}
          className={`flex flex-col justify-between rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-sm cursor-pointer ${
            activeCard === 'copyleft'
              ? 'ring-2 ring-blue-500 scale-[1.01] shadow-md border-blue-400 bg-blue-50'
              : 'border-blue-200 bg-[#f0f7ff] hover:border-blue-300 hover:shadow-md'
          }`}
        >
          <div>
            {/* Header */}
            <div className="bg-[#bfdbfe] px-4 py-2.5 border-b border-blue-200 text-center">
              <h3 className="text-base font-black text-slate-900">
                Copyleft (🄯)
              </h3>
            </div>

            <div className="p-4 space-y-3">
              {/* Official Symbol */}
              <div className="flex justify-center pt-1">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-900 flex items-center justify-center shadow-2xs">
                  <svg viewBox="0 0 100 100" className="w-10 h-10">
                    <path
                      d="M 36 36 C 40 29 48 27 55 29 C 64 32 70 40 70 50 C 70 60 64 68 55 71 C 48 73 40 71 36 64"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Subtitle Pill */}
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-[#dbeafe] border border-blue-200 text-blue-950 text-xs font-bold">
                  {language === 'pt' ? 'Partilha com a mesma regra' : 'Share with same rule'}
                </span>
              </div>

              {/* Simple Description */}
              <p className="text-xs text-slate-700 leading-relaxed text-center bg-white/90 p-2.5 rounded-xl border border-blue-100 font-medium">
                {language === 'pt'
                  ? 'Podes usar e até alterar este conteúdo, mas tens de partilhar o teu trabalho com a mesma licença.'
                  : 'You can use and edit this content, but you must share your work with the same license.'}
              </p>

              {/* Example Symbol */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                  <span>Ex.: 🄯 GNU FDL</span>
                </span>
              </div>

              {/* Rule Box */}
              <div className="bg-[#dbeafe]/70 rounded-xl p-2.5 border border-blue-200 space-y-1">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span className="text-[11px] font-black text-blue-950">
                    {language === 'pt' ? 'Regra para a escola:' : 'School rule:'}
                  </span>
                </div>
                <p className="text-[11px] text-blue-950 leading-snug font-medium pl-5">
                  {language === 'pt'
                    ? 'Podes usar no trabalho, cumprindo as condições da licença.'
                    : 'You can use it by respecting the license rules.'}
                </p>
              </div>
            </div>
          </div>

          {/* Verdict Banner */}
          <div className="p-2.5 bg-emerald-600 text-white text-center font-black text-xs flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4 shrink-0" />
            <span>{language === 'pt' ? 'Podes usar, com regras' : 'Can use, with rules'}</span>
          </div>
        </div>

        {/* 3. Royalty Free */}
        <div
          onClick={() => setActiveCard(activeCard === 'royalty_free' ? null : 'royalty_free')}
          className={`flex flex-col justify-between rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-sm cursor-pointer ${
            activeCard === 'royalty_free'
              ? 'ring-2 ring-emerald-500 scale-[1.01] shadow-md border-emerald-400 bg-emerald-50'
              : 'border-emerald-200 bg-[#f4fbf7] hover:border-emerald-300 hover:shadow-md'
          }`}
        >
          <div>
            {/* Header */}
            <div className="bg-[#bbf7d0] px-4 py-2.5 border-b border-emerald-200 text-center">
              <h3 className="text-base font-black text-slate-900">
                Royalty Free
              </h3>
            </div>

            <div className="p-4 space-y-3">
              {/* Official Symbol */}
              <div className="flex justify-center pt-1">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-900 flex flex-col items-center justify-center shadow-2xs">
                  <span className="text-[11px] font-black uppercase text-slate-900 leading-none">
                    Royalty
                  </span>
                  <span className="text-[11px] font-black uppercase text-slate-900 leading-none mt-0.5">
                    Free
                  </span>
                </div>
              </div>

              {/* Subtitle Pill */}
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-[#dcfce7] border border-emerald-200 text-emerald-950 text-xs font-bold">
                  {language === 'pt' ? 'Sem pagar por cada uso' : 'No per-use fee'}
                </span>
              </div>

              {/* Simple Description */}
              <p className="text-xs text-slate-700 leading-relaxed text-center bg-white/90 p-2.5 rounded-xl border border-emerald-100 font-medium">
                {language === 'pt'
                  ? 'Não pagas de cada vez que usas, mas atenção: nem sempre é grátis e pode ter regras!'
                  : 'You do not pay per use, but beware: it is not always free and may have conditions!'}
              </p>

              {/* Example Symbol */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                  <span>Ex.: Royalty Free</span>
                </span>
              </div>

              {/* Rule Box */}
              <div className="bg-[#dcfce7]/70 rounded-xl p-2.5 border border-emerald-200 space-y-1">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="text-[11px] font-black text-emerald-950">
                    {language === 'pt' ? 'Regra para a escola:' : 'School rule:'}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-950 leading-snug font-medium pl-5">
                  {language === 'pt'
                    ? 'Lê sempre as regras do site para saber se podes usar no teu trabalho.'
                    : 'Always read website terms to check if you can use it.'}
                </p>
              </div>
            </div>
          </div>

          {/* Verdict Banner */}
          <div className="p-2.5 bg-amber-500 text-slate-950 text-center font-black text-xs flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-slate-950" />
            <span>{language === 'pt' ? 'Verifica sempre as condições' : 'Always check conditions'}</span>
          </div>
        </div>

        {/* 4. Utilização Totalmente Gratuita (CC0) */}
        <div
          onClick={() => setActiveCard(activeCard === 'cc0' ? null : 'cc0')}
          className={`flex flex-col justify-between rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-sm cursor-pointer ${
            activeCard === 'cc0'
              ? 'ring-2 ring-purple-500 scale-[1.01] shadow-md border-purple-400 bg-purple-50'
              : 'border-purple-200 bg-[#faf5ff] hover:border-purple-300 hover:shadow-md'
          }`}
        >
          <div>
            {/* Header */}
            <div className="bg-[#e9d5ff] px-4 py-2.5 border-b border-purple-200 text-center">
              <h3 className="text-base font-black text-slate-900">
                {language === 'pt' ? 'Totalmente Grátis (CC0)' : 'Totally Free (CC0)'}
              </h3>
            </div>

            <div className="p-4 space-y-3">
              {/* Official Symbol */}
              <div className="flex justify-center pt-1">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-900 flex items-center justify-center shadow-2xs">
                  <span className="text-2xl font-black text-slate-900 tracking-tight select-none">
                    CC0
                  </span>
                </div>
              </div>

              {/* Subtitle Pill */}
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-[#f3e8ff] border border-purple-200 text-purple-950 text-xs font-bold">
                  {language === 'pt' ? 'Livre para todos' : 'Free for everyone'}
                </span>
              </div>

              {/* Simple Description */}
              <p className="text-xs text-slate-700 leading-relaxed text-center bg-white/90 p-2.5 rounded-xl border border-purple-100 font-medium">
                {language === 'pt'
                  ? 'É 100% livre! Podes copiar, alterar e usar à vontade. É a opção mais segura para a escola.'
                  : 'It is 100% free! You can copy, change, and use it freely. Safest choice for school.'}
              </p>

              {/* Example Symbol */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-bold">
                  <span>Ex.: CC0 (Zero)</span>
                </span>
              </div>

              {/* Rule Box */}
              <div className="bg-[#f3e8ff]/70 rounded-xl p-2.5 border border-purple-200 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span className="text-[11px] font-black text-purple-950">
                    {language === 'pt' ? 'Regra para a escola:' : 'School rule:'}
                  </span>
                </div>
                <p className="text-[11px] text-purple-950 leading-snug font-medium pl-5">
                  {language === 'pt'
                    ? 'Podes utilizar e partilhar sem pedir autorização por direitos de autor! É uma boa ideia indicar de onde retiraste a fonte.'
                    : 'Use and share without asking for copyright permission! It is still nice to mention where you found it.'}
                </p>
              </div>
            </div>
          </div>

          {/* Verdict Banner */}
          <div className="p-2.5 bg-emerald-600 text-white text-center font-black text-xs flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4 shrink-0" />
            <span>{language === 'pt' ? 'Podes utilizar sem pedir autorização!' : 'Can use without asking for permission!'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Advice & Reminder Banners */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1">
        {/* Left Card: Tips */}
        <div className="md:col-span-7 bg-[#f0f9ff] border border-sky-200 rounded-3xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 shadow-2xs shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="text-sm sm:text-base font-black text-slate-900">
              {language === 'pt'
                ? 'Dicas rápidas para o teu trabalho:'
                : 'Quick tips for your school project:'}
            </h4>
          </div>

          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              <span>{language === 'pt' ? 'Procura sempre o símbolo da licença no conteúdo ou site.' : 'Always look for the license symbol.'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              <span>{language === 'pt' ? 'Lê o que podes ou não podes fazer com ele.' : 'Read what you can and cannot do.'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              <span>{language === 'pt' ? 'Escreve o nome do autor se a licença pedir.' : 'Credit the author if required.'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
              <span>{language === 'pt' ? 'Na dúvida, escolhe conteúdos gratuitos (como CC0).' : 'When in doubt, pick free content (like CC0).'}</span>
            </li>
          </ul>
        </div>

        {/* Right Card: Reminder */}
        <div className="md:col-span-5 bg-[#fff1f2] border border-rose-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 rounded-xl bg-rose-500 text-white shadow-2xs shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-black text-rose-950">
                {language === 'pt' ? 'Lembra-te!' : 'Remember!'}
              </h4>
            </div>

            <p className="text-xs text-rose-900 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Estar na Internet não quer dizer que seja grátis. Respeita sempre o trabalho de quem criou o conteúdo!'
                : 'Being on the Internet does not mean it is free. Always respect content creators!'}
            </p>
          </div>
        </div>
      </div>

      {/* Free & Safe Media Resource Banks for School Work */}
      <FreeMediaBanks language={language} />
    </div>
  );
};
