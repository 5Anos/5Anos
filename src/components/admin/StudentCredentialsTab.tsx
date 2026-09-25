import React, { useState } from 'react';
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
} from 'lucide-react';
import { User, Language } from '../../types';
import { api } from '../../services/api';
import { getStudentFirstAndLastName, getStudentFullName, getStudentCardPassword } from '../../utils/studentCredentials';
import { exportStudentCredentialsToExcel } from '../../utils/exportUtils';

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
  const [resettingId, setResettingId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const filteredStudents = students.map((s) => ({
    ...s,
    password: visiblePasswords[s.id] || getStudentCardPassword(s),
  })).filter((s) => {
    const matchTurma = selectedTurma === 'all' || (s.turma || '').trim() === selectedTurma.trim();
    if (!matchTurma) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = (s.name || '').toLowerCase().includes(q) || (s.fullName || '').toLowerCase().includes(q);
    const userMatch = (s.username || '').toLowerCase().includes(q);
    const emailMatch = (s.email || '').toLowerCase().includes(q);
    return nameMatch || userMatch || emailMatch;
  });

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
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
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
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'pt' ? 'Pesquisar por nome ou utilizador...' : 'Search student...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

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
              title="Imprimir folha de credenciais com linhas para recortar"
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
                <strong>Dica de Impressão e Recorte:</strong> Podes filtrar pela turma pretendida (ex: 5.º A) e clicar em <strong>Imprimir Folha de Cartões</strong>. Os cartões são formatados com linhas tracejadas prontas para recortar com a tesoura e entregar a cada aluno. As palavras-passe foram desenhadas para serem fáceis de digitar por crianças de 10 anos.
              </>
            ) : (
              <>
                <strong>Print & Cut:</strong> Filter by class and click <strong>Print Cards</strong> to generate cuttable cards for your students.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-3">
            {filteredStudents.map((student) => {
              const username = student.username || (student.email ? student.email.split('@')[0] : 'aluno');
              const cardPassword = visiblePasswords[student.id] || getStudentCardPassword(student);

              return (
                <div
                  key={student.id}
                  className="relative bg-white rounded-2xl border-2 border-dashed border-slate-300 p-4 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between print:border-slate-800 print:shadow-none print:break-inside-avoid print:p-4 print:my-2"
                >
                  {/* Scissors cut badge - Top Right */}
                  <div className="absolute -top-2.5 right-4 bg-white px-2 py-0.5 rounded-full border border-slate-300 text-[10px] font-black text-slate-500 flex items-center gap-1 print:border-slate-700 print:text-slate-800">
                    <Scissors className="w-3 h-3 text-slate-600 rotate-90" />
                    <span>Recortar</span>
                  </div>

                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3 print:border-slate-300">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 print:text-black">
                          TIC 5 — Descomplica!
                        </span>
                        <h4 className="text-base font-black text-slate-900 leading-tight print:text-lg">
                          {getStudentFirstAndLastName(student)}
                        </h4>
                        {student.fullName && student.fullName.trim() !== getStudentFirstAndLastName(student).trim() && (
                          <p className="text-[10px] text-slate-400 font-medium truncate max-w-[200px] mt-0.5 print:text-slate-600 print:text-[9px]">
                            {student.fullName}
                          </p>
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200 print:border-black print:text-black print:bg-transparent shrink-0">
                        {student.turma || '5.º Ano'}
                      </span>
                    </div>

                    {/* Credentials Box */}
                    <div className="space-y-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 print:bg-transparent print:border-slate-400">
                      {/* Username */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-semibold print:text-slate-700">Utilizador:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs print:border-black print:text-sm">
                            {username}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(username, `user-${student.id}`)}
                            className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer print:hidden"
                            title="Copiar utilizador"
                          >
                            {copiedKey === `user-${student.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-semibold print:text-slate-700">Palavra-passe:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 text-xs print:border-black print:text-black print:text-sm">
                            {cardPassword}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(cardPassword, `pass-${student.id}`)}
                            className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer print:hidden"
                            title="Copiar palavra-passe"
                          >
                            {copiedKey === `pass-${student.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Instructions for Kid + Reset Button for Teacher */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 print:border-slate-300">
                    <span className="italic print:text-slate-600">Guarda este cartão com cuidado!</span>
                    <button
                      type="button"
                      onClick={() => handleResetPassword(student)}
                      disabled={resettingId === student.id}
                      className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer print:hidden disabled:opacity-50"
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
