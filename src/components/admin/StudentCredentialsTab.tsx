import React, { useState, useMemo } from 'react';
import {
  Printer,
  Search,
  Filter,
  KeyRound,
  Copy,
  Check,
  RefreshCw,
  Scissors,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  FileSpreadsheet,
  Globe,
  ExternalLink,
  QrCode,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { User, Language } from '../../types';
import { api } from '../../services/api';
import { getStudentFirstAndLastName, getStudentFullName, getStudentCardPassword } from '../../utils/studentCredentials';
import { exportStudentCredentialsToExcel, sortStudentsByClassAndNumber } from '../../utils/exportUtils';

export const PLATFORM_WEBSITE_URL = 'https://5anos.github.io/5Anos/';

interface StudentCredentialsTabProps {
  students: User[];
  turmasList: string[];
  language: Language;
  onStudentUpdated?: () => void;
}

export const StudentCredentialsTab: React.FC<StudentCredentialsTabProps> = ({
  students,
  turmasList,
  language,
  onStudentUpdated,
}) => {
  const [selectedTurma, setSelectedTurma] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, string>>({});
  const [hidePasswordsOnScreen, setHidePasswordsOnScreen] = useState<boolean>(false);
  const [resettingId, setResettingId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const filteredStudents = useMemo(() => {
    const list = students.map((s) => {
      const plainPass = visiblePasswords[s.id] || getStudentCardPassword(s);
      return {
        ...s,
        plainPass,
      };
    }).filter((s) => {
      const matchTurma = selectedTurma === 'all' || (s.turma || '').trim() === selectedTurma.trim();
      if (!matchTurma) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = (s.name || '').toLowerCase().includes(q) || (s.fullName || '').toLowerCase().includes(q);
      const userMatch = (s.username || '').toLowerCase().includes(q);
      const numMatch = s.number !== undefined && String(s.number).includes(q);
      return nameMatch || userMatch || numMatch;
    });

    return sortStudentsByClassAndNumber(list);
  }, [students, visiblePasswords, selectedTurma, searchQuery]);

  const handleCopy = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleResetPassword = async (student: User) => {
    const confirmMsg =
      language === 'pt'
        ? `Pretendes gerar uma nova palavra-passe para ${student.fullName || student.name}?`
        : `Reset password for ${student.name}?`;
    if (!window.confirm(confirmMsg)) return;

    setResettingId(student.id);
    setActionNotice(null);
    try {
      const res = await api.resetStudentPassword(student.id);
      setActionNotice({
        type: 'success',
        text: `Nova palavra-passe de ${getStudentFirstAndLastName(student)}: ${res.newPassword}`,
      });
      setVisiblePasswords((prev) => ({ ...prev, [student.id]: res.newPassword }));
      onStudentUpdated?.();
    } catch (err: any) {
      setActionNotice({
        type: 'error',
        text: err.message || 'Erro ao redefinir palavra-passe.',
      });
    } finally {
      setResettingId(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadExcel = () => {
    exportStudentCredentialsToExcel(filteredStudents, selectedTurma);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 print:bg-white print:p-0">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .student-card-print {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>

      {/* Top Filter and Actions Bar - hidden in print */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-200 space-y-3 shrink-0 print:hidden">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Turma filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'pt' ? 'Turma:' : 'Class:'}</span>
            </div>
            <button
              onClick={() => setSelectedTurma('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTurma === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {language === 'pt' ? 'Todas as Turmas' : 'All Classes'} ({students.length})
            </button>
            {turmasList.map((turma) => {
              const countInTurma = students.filter((s) => (s.turma || '').trim() === turma.trim()).length;
              return (
                <button
                  key={turma}
                  onClick={() => setSelectedTurma(turma)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedTurma === turma
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{turma}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full ${
                      selectedTurma === turma ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {countInTurma}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Print Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'pt' ? 'Pesquisar por aluno...' : 'Search student...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setHidePasswordsOnScreen(!hidePasswordsOnScreen)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                hidePasswordsOnScreen
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={hidePasswordsOnScreen ? 'Mostrar palavras-passe no ecrã' : 'Ocultar palavras-passe no ecrã (ex: se projetado)'}
            >
              {hidePasswordsOnScreen ? <Eye className="w-3.5 h-3.5 text-amber-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
              <span>{hidePasswordsOnScreen ? 'Palavras-passe: Ocultas no ecrã' : 'Palavras-passe: Visíveis'}</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              disabled={filteredStudents.length === 0}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              title="Descarregar folha de cálculo com todas as credenciais (Nome Completo, Utilizador e Palavra-passe)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'pt' ? 'Descarregar XLS' : 'Export XLS'}</span>
            </button>

            <button
              onClick={handlePrint}
              disabled={filteredStudents.length === 0}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              title="Imprimir folha de credenciais com linhas para recortar e palavras-passe legíveis"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'pt' ? 'Imprimir Folha de Cartões' : 'Print Cards'}</span>
            </button>
          </div>
        </div>

        {/* Notice alert */}
        {actionNotice && (
          <div
            className={`p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 animate-in fade-in ${
              actionNotice.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {actionNotice.type === 'success' ? (
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-semibold">{actionNotice.text}</span>
          </div>
        )}

        {/* Instructions banner for the teacher */}
        <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
          <Scissors className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'pt' ? (
              <>
                <strong>Cartões Individuais de Acesso:</strong> Cada cartão contém o <strong>Nome</strong>, <strong>Turma</strong>, <strong>Nome de Utilizador</strong> e a <strong>Palavra-passe</strong> legível para o aluno. Clica em <strong>Imprimir Folha de Cartões</strong> para imprimir a grelha com linhas tracejadas prontas para recortar e entregar a cada aluno.
              </>
            ) : (
              <>
                <strong>Student Access Cards:</strong> Each card displays the student's <strong>Username</strong> and readable <strong>Password</strong>. Click <strong>Print Cards</strong> to print them with cuttable dashed borders.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Cards List / Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 print:overflow-visible print:p-0">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
            <KeyRound className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-700">
              Nenhum aluno encontrado {selectedTurma !== 'all' ? `na turma ${selectedTurma}` : ''}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Importa a lista de alunos da turma na aba "Importar Alunos (XLS)" para gerar automaticamente as credenciais.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-4 print:w-full print:p-0">
            {filteredStudents.map((student) => {
              const username = student.username || (student.email ? student.email.split('@')[0] : 'aluno');
              const cardPassword = student.plainPass || getStudentCardPassword(student);
              const isMaskedOnScreen = hidePasswordsOnScreen;

              return (
                <div
                  key={student.id}
                  className="student-card-print relative bg-white rounded-2xl border-2 border-dashed border-slate-300 p-3.5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden box-border print:border-2 print:border-dashed print:border-black print:shadow-none print:break-inside-avoid print:p-3 print:my-1.5 print:bg-white"
                >
                  {/* Scissors cut badge - Top Right */}
                  <div className="absolute -top-2.5 right-4 bg-white px-2 py-0.5 rounded-full border border-slate-300 text-[10px] font-black text-slate-500 flex items-center gap-1 print:border-black print:text-black">
                    <Scissors className="w-3 h-3 text-slate-600 rotate-90 print:text-black" />
                    <span>Recortar</span>
                  </div>

                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2.5 print:border-slate-300">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 print:text-black block">
                          TIC 5 — Descomplica!
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight truncate print:text-base">
                          {getStudentFirstAndLastName(student)}
                        </h4>
                        {student.fullName && student.fullName.trim() !== getStudentFirstAndLastName(student).trim() && (
                          <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium truncate mt-0.5 print:text-slate-600 print:text-[9px]">
                            {student.fullName}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {student.number !== undefined && student.number > 0 && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-slate-100 text-slate-700 border border-slate-300 print:border-black print:text-black print:bg-transparent">
                            N.º {student.number}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200 print:border-black print:text-black print:bg-transparent shrink-0">
                          {student.turma || '5.º Ano'}
                        </span>
                      </div>
                    </div>

                    {/* Credentials & QR Code Row */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 print:bg-transparent print:border-slate-800 print:p-2 space-y-2">
                      {/* Website / Hiperligação da Plataforma */}
                      <div className="flex items-center justify-between gap-1 text-xs border-b border-slate-200/80 pb-1.5 print:border-slate-300">
                        <span className="text-slate-600 font-bold print:text-slate-900 text-[11px] flex items-center gap-1 shrink-0">
                          <Globe className="w-3 h-3 text-indigo-600 print:text-black shrink-0" />
                          <span>Website:</span>
                        </span>
                        <div className="flex items-center gap-1 min-w-0">
                          <a
                            href={PLATFORM_WEBSITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono font-bold text-indigo-700 hover:text-indigo-900 hover:underline bg-white px-2 py-0.5 rounded-md border border-indigo-200 text-[10px] sm:text-[11px] tracking-tight truncate print:border-black print:text-black print:bg-transparent print:no-underline"
                            title="Abrir website da plataforma TIC"
                          >
                            5anos.github.io/5Anos
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopy(PLATFORM_WEBSITE_URL, `url-${student.id}`)}
                            className="p-0.5 text-slate-400 hover:text-indigo-600 cursor-pointer print:hidden shrink-0"
                            title="Copiar hiperligação do website"
                          >
                            {copiedKey === `url-${student.id}` ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Credentials + QR Code */}
                      <div className="flex items-center justify-between gap-2">
                        {/* Left: Username + Password */}
                        <div className="flex-1 space-y-1.5 min-w-0">
                          {/* Username */}
                          <div className="flex items-center justify-between gap-1 text-[11px]">
                            <span className="text-slate-600 font-bold print:text-slate-900 shrink-0">Utilizador:</span>
                            <div className="flex items-center gap-1 min-w-0">
                              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-300 text-[11px] sm:text-xs truncate print:border-black print:text-black print:bg-transparent">
                                {username}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(username, `user-${student.id}`)}
                                className="p-0.5 text-slate-400 hover:text-indigo-600 cursor-pointer print:hidden shrink-0"
                                title="Copiar utilizador"
                              >
                                {copiedKey === `user-${student.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Password */}
                          <div className="flex items-center justify-between gap-1 text-[11px]">
                            <span className="text-slate-600 font-bold print:text-slate-900 shrink-0">Palavra-passe:</span>
                            <div className="flex items-center gap-1 min-w-0">
                              {/* Screen presentation */}
                              <span className="font-mono font-black text-indigo-900 bg-indigo-50/90 px-2 py-0.5 rounded-md border border-indigo-200 text-[11px] sm:text-xs tracking-wide truncate print:hidden">
                                {isMaskedOnScreen ? '••••••••' : cardPassword}
                              </span>
                              {/* Print presentation */}
                              <span className="hidden print:inline-block font-mono font-black text-black text-xs px-1.5 py-0.5 border border-black rounded-md tracking-wider">
                                {cardPassword}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleCopy(cardPassword, `pass-${student.id}`)}
                                className="p-0.5 text-slate-400 hover:text-indigo-600 cursor-pointer print:hidden shrink-0"
                                title="Copiar palavra-passe"
                              >
                                {copiedKey === `pass-${student.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right: QR Code */}
                        <div className="flex flex-col items-center justify-center p-1 bg-white rounded-lg border border-slate-200 print:border-black shrink-0 shadow-2xs">
                          <QRCodeSVG
                            value={PLATFORM_WEBSITE_URL}
                            size={48}
                            level="M"
                            includeMargin={false}
                            className="shrink-0"
                          />
                          <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-tighter text-center print:text-black mt-0.5 leading-none">
                            QR Código
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Instructions for Kid + Reset Button for Teacher */}
                  <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 print:border-slate-300">
                    <span className="italic font-medium print:text-slate-700 print:text-[9px]">Guarda este cartão com cuidado!</span>
                    <button
                      type="button"
                      onClick={() => handleResetPassword(student)}
                      disabled={resettingId === student.id}
                      className="text-[10px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer print:hidden disabled:opacity-50"
                      title="Gerar nova palavra-passe aleatória se a criança perdeu"
                    >
                      <RefreshCw className={`w-3 h-3 ${resettingId === student.id ? 'animate-spin' : ''}`} />
                      <span>Redefinir</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
