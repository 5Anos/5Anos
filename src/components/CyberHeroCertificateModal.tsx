import React, { useRef } from 'react';
import {
  Award,
  Download,
  Printer,
  X,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Calendar,
  UserCheck
} from 'lucide-react';
import { Language, User } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface CyberHeroCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  language?: Language;
}

export const CyberHeroCertificateModal: React.FC<CyberHeroCertificateModalProps> = ({
  isOpen,
  onClose,
  user,
  language = 'pt',
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const studentName = user?.name || user?.nickname || (language === 'pt' ? 'Aluno(a) do 5.º Ano' : '5th Grade Student');
  const studentTurma = user?.turma || '5.º A';
  const currentDate = new Date().toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const certId = `TIC5-HERO-${user?.id?.slice(0, 6)?.toUpperCase() || '2026'}`;

  const handlePrint = () => {
    soundEffects.playVictory();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden my-auto animate-in zoom-in-95">
        {/* Modal Toolbar (hidden on print) */}
        <div className="print:hidden flex items-center justify-between p-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-black text-sm text-amber-300">
              {language === 'pt' ? 'Diploma Oficial de Ciber-Herói Digital' : 'Official Cyber-Hero Diploma'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-105"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Imprimir / PDF' : 'Print / PDF'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DIPLOMA CANVAS */}
        <div
          ref={certificateRef}
          className="p-4 sm:p-10 bg-[#FFFDF8] text-slate-900 relative selection:bg-amber-100"
          style={{ minHeight: '520px' }}
        >
          {/* Decorative Certificate Borders */}
          <div className="absolute inset-3 border-2 border-amber-600/30 rounded-2xl pointer-events-none" />
          <div className="absolute inset-4 border border-dashed border-amber-500/40 rounded-xl pointer-events-none" />

          {/* Watermark Logo Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none text-9xl font-black">
            TIC 5
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 relative z-10 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-black uppercase tracking-wider">
              <span>⭐</span>
              <span>{language === 'pt' ? 'República Digital das TIC — 5.º Ano' : 'Digital Republic of ICT — 5th Grade'}</span>
              <span>⭐</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 font-serif pt-1">
              DIPLOMA OFICIAL
            </h1>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-700">
              {language === 'pt' ? 'Mestre em Cibersegurança & Cidadania Digital' : 'Master in Cybersecurity & Digital Citizenship'}
            </p>
          </div>

          {/* Award Text */}
          <div className="my-6 text-center space-y-3 relative z-10">
            <p className="text-xs sm:text-sm text-slate-600 font-serif italic">
              {language === 'pt'
                ? 'Certifica-se com distinção e mérito que o(a) aluno(a):'
                : 'This is to certify with honors and merit that:'}
            </p>

            <div className="inline-block border-b-2 border-amber-500 px-8 py-1">
              <h2 className="text-xl sm:text-3xl font-black text-indigo-950 font-serif">
                {studentName}
              </h2>
            </div>

            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              {language === 'pt' ? `Turma: ${studentTurma} • Ano Letivo 2025/2026` : `Class: ${studentTurma} • School Year 2025/2026`}
            </p>

            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
              {language === 'pt'
                ? 'Concluiu com sucesso a formação em Segurança e Pegada Digital, Proteção de Palavras-passe e Navegação Segura na Internet. Demonstrou postura ética exemplar, respeito pela privacidade dos colegas e domínio das boas práticas de netiqueta.'
                : 'Successfully completed training in Security, Passwords Protection, and Safe Web Browsing with exemplary digital ethics.'}
            </p>
          </div>

          {/* Official Signatures & Gold Seal */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 items-end text-center relative z-10 gap-2 sm:gap-4">
            {/* Left: Date & Code */}
            <div className="space-y-1">
              <p className="text-[11px] text-slate-500 font-semibold">{currentDate}</p>
              <div className="w-16 sm:w-36 max-w-full h-0.5 bg-slate-300 mx-auto" />
              <p className="text-[10px] uppercase font-bold text-slate-400">
                {language === 'pt' ? 'Data de Emissão' : 'Issue Date'}
              </p>
              <p className="text-[9px] font-mono text-slate-400">{certId}</p>
            </div>

            {/* Center: Golden Seal Badge */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-amber-950 flex flex-col items-center justify-center shadow-lg border-2 border-white ring-2 ring-amber-400/50">
                <span className="text-base sm:text-xl">🛡️</span>
                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-tighter">Ciber-Herói</span>
                <span className="text-[6px] sm:text-[7px] font-extrabold opacity-80">5.º ANO</span>
              </div>
            </div>

            {/* Right: Teacher Signature */}
            <div className="space-y-1">
              <p className="text-[11px] sm:text-xs font-serif italic text-indigo-950 font-bold">
                Carla Oliveira
              </p>
              <div className="w-16 sm:w-36 max-w-full h-0.5 bg-slate-300 mx-auto" />
              <p className="text-[10px] uppercase font-bold text-slate-400">
                {language === 'pt' ? 'Professora de TIC' : 'ICT Teacher'}
              </p>
              <p className="text-[9px] text-emerald-600 font-bold flex items-center justify-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>{language === 'pt' ? 'Validado' : 'Verified'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions for screen */}
        <div className="print:hidden p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              {language === 'pt'
                ? 'Leva este diploma para casa e partilha o teu orgulho com a família!'
                : 'Take this certificate home and share with your family!'}
            </span>
          </p>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 cursor-pointer transition-colors"
          >
            {language === 'pt' ? 'Fechar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
