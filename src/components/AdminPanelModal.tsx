import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  FileSpreadsheet,
  Download,
  RefreshCw,
  Search,
  Filter,
  ShieldCheck,
  Users,
  Award,
  TrendingUp,
  GraduationCap,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { User, Language } from '../types';
import { api, isUserAdmin } from '../services/api';
import { getTurmasList } from '../data/turmasData';
import { exportStudentsToExcel, exportStudentsToCSV } from '../utils/exportUtils';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  language: Language;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  language,
}) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const turmasList = useMemo(() => getTurmasList(), []);

  // Fetch student data whenever modal opens
  useEffect(() => {
    if (isOpen) {
      loadStudents();
    }
  }, [isOpen]);

  // Keyboard shortcut to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await api.getAllStudentsForAdmin();
      setStudents(data);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter students by turma and search query
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesTurma = selectedTurma === 'all' || (s.turma || '').trim() === selectedTurma.trim();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (s.name || '').toLowerCase().includes(query) ||
        (s.email || '').toLowerCase().includes(query) ||
        (s.publicId || '').toLowerCase().includes(query) ||
        (s.turma || '').toLowerCase().includes(query);

      return matchesTurma && matchesSearch;
    });
  }, [students, selectedTurma, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const targetStudents = selectedTurma === 'all' 
      ? students 
      : students.filter(s => (s.turma || '').trim() === selectedTurma.trim());

    const total = targetStudents.length;
    const totalPoints = targetStudents.reduce((acc, curr) => acc + (curr.points || 0), 0);
    const avgPoints = total > 0 ? Math.round(totalPoints / total) : 0;
    const maxPoints = total > 0 ? Math.max(...targetStudents.map(s => s.points || 0)) : 0;
    
    // Count active turmas
    const activeTurmasCount = new Set(students.map(s => s.turma).filter(Boolean)).size;

    return { total, avgPoints, maxPoints, activeTurmasCount };
  }, [students, selectedTurma]);

  if (!isOpen) return null;

  const isAdmin = currentUser && isUserAdmin(currentUser.email, currentUser.role);

  const handleExportXLS = () => {
    if (filteredStudents.length === 0) return;
    exportStudentsToExcel(filteredStudents, selectedTurma);
    setExportSuccessMsg('Ficheiro Excel (.xlsx) transferido com sucesso!');
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;
    exportStudentsToCSV(filteredStudents, selectedTurma);
    setExportSuccessMsg('Ficheiro CSV transferido com sucesso!');
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="admin-panel-modal-card"
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-linear-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/60">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-inner text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {language === 'pt' ? 'Área Reservada da Professora / Administrador' : 'Teacher / Admin Portal'}
                </span>
                <span className="text-xs text-indigo-300">
                  {currentUser?.email}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {language === 'pt' ? 'Pautas de Avaliação & Registo de Turmas' : 'Class Assessment & Records'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Access check notice if not admin */}
        {!isAdmin && (
          <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center gap-3 text-amber-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
            <p>
              Acesso exclusivo para administradores e professores registados. Inicia sessão com a tua conta de professor para descarregar as pautas de avaliação.
            </p>
          </div>
        )}

        {/* Notification Toast */}
        {exportSuccessMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between animate-in slide-in-from-top duration-150">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{exportSuccessMsg}</span>
            </div>
            <button
              onClick={() => setExportSuccessMsg(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
            >
              OK
            </button>
          </div>
        )}

        {/* Control Bar: Turma filter, Search, Export buttons */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
            {/* Filter by Turma */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider shrink-0">
                <Filter className="w-3.5 h-3.5 text-indigo-600" />
                <span>{language === 'pt' ? 'Filtrar Turma:' : 'Filter Class:'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedTurma('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedTurma === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {language === 'pt' ? 'Todas as Turmas' : 'All Classes'}
                </button>
                {turmasList.map((turma) => (
                  <button
                    key={turma}
                    onClick={() => setSelectedTurma(turma)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTurma === turma
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {turma}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'pt' ? 'Pesquisar aluno ou email...' : 'Search student or email...'}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Refresh button */}
              <button
                onClick={loadStudents}
                disabled={loading}
                title="Atualizar lista a partir da Base de Dados"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
              </button>

              {/* Export to Excel (.xlsx) */}
              <button
                onClick={handleExportXLS}
                disabled={filteredStudents.length === 0}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                title="Descarregar ficheiro Excel formatado (.xlsx)"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{language === 'pt' ? 'Exportar XLS (.xlsx)' : 'Export Excel (.xlsx)'}</span>
              </button>

              {/* Export to CSV */}
              <button
                onClick={handleExportCSV}
                disabled={filteredStudents.length === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                title="Descarregar ficheiro CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {selectedTurma === 'all' ? 'Total Alunos' : `Alunos ${selectedTurma}`}
                </span>
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xl font-black text-slate-900">{stats.total}</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {language === 'pt' ? 'Média Pontos (XP)' : 'Average Score'}
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xl font-black text-emerald-700">{stats.avgPoints} XP</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {language === 'pt' ? 'Pontuação Máxima' : 'Top Score'}
                </span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl font-black text-amber-600">{stats.maxPoints} XP</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {language === 'pt' ? 'Turmas com Alunos' : 'Active Classes'}
                </span>
                <GraduationCap className="w-4 h-4 text-indigo-500" />
              </div>
              <p className="text-xl font-black text-indigo-900">{stats.activeTurmasCount} / {turmasList.length}</p>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6 min-h-[300px]">
          {loading ? (
            <div className="py-20 text-center">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600">
                A carregar os registos dos alunos da Base de Dados Cloud Firestore...
              </p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-16 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-300">
              <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-base font-bold text-slate-700">
                Nenhum aluno encontrado {selectedTurma !== 'all' ? `na turma ${selectedTurma}` : ''}
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Assim que os alunos criarem a sua conta com o nome, email e turma, os registos aparecerão aqui e poderão ser descarregados em Excel.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-3.5 w-12 text-center">N.º</th>
                    <th className="py-3 px-3.5">Turma</th>
                    <th className="py-3 px-3.5">Nome do Aluno</th>
                    <th className="py-3 px-3.5">Email</th>
                    <th className="py-3 px-3.5">ID Público (Nickname)</th>
                    <th className="py-3 px-3.5 text-right">Pontos (XP)</th>
                    <th className="py-3 px-3.5">Data Registo</th>
                    <th className="py-3 px-3.5">Última Atividade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredStudents.map((student, idx) => (
                    <tr key={student.id || student.email} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {student.turma || '5.º A'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap font-bold text-slate-900">
                        {student.name || 'Estudante'}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 font-mono text-xs">
                        {student.email}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-500 font-mono text-xs">
                        {student.publicId}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-right font-black text-indigo-700">
                        {student.points ?? 0} XP
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-500 text-xs">
                        {student.createdAt ? new Date(student.createdAt).toLocaleDateString('pt-PT') : '—'}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 text-xs">
                        {student.lastActivity?.title || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info and export shortcut */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {language === 'pt'
                ? `Total de ${filteredStudents.length} aluno(s) listados. Os nomes reais e emails são confidenciais e visíveis apenas nesta área do professor.`
                : `${filteredStudents.length} student(s) listed. Real names and emails are confidential and visible only in this teacher portal.`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportXLS}
              disabled={filteredStudents.length === 0}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{language === 'pt' ? 'Descarregar Ficheiro XLS' : 'Download XLS File'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
            >
              {language === 'pt' ? 'Fechar' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
