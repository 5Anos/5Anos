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
  CheckCircle2,
  AlertCircle,
  Edit,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  Trash2,
  PlusCircle,
  AlertTriangle,
  FolderPlus,
  Layers,
  CheckSquare,
  Square,
  ShieldAlert,
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

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  warningText?: string;
  confirmLabel: string;
  isDanger?: boolean;
  action: () => Promise<void>;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'turmas' | 'danger'>('students');
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Turmas local list state (for reactive updates upon creation/deletion)
  const [turmasList, setTurmasList] = useState<string[]>([]);
  const [newTurmaName, setNewTurmaName] = useState('');
  const [creatingTurma, setCreatingTurma] = useState(false);

  // Multi-selection of students
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());

  // Student Edit State
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editTurma, setEditTurma] = useState('');
  const [editNewPassword, setEditNewPassword] = useState('');
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Confirmation Modal State
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Load Turmas and Students whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTurmasList(getTurmasList());
      loadStudents();
      setSelectedStudentIds(new Set());
      setFeedbackMsg(null);
    }
  }, [isOpen]);

  // Keyboard shortcut to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !editingStudent && !confirmDialog) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, editingStudent, confirmDialog]);

  const showToast = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => {
      setFeedbackMsg((prev) => (prev?.text === text ? null : prev));
    }, 5000);
  };

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

  const refreshTurmas = () => {
    setTurmasList(getTurmasList());
  };

  // Edit single student
  const openEditModal = (student: User) => {
    setEditingStudent(student);
    setEditName(student.name || '');
    setEditTurma(student.turma || turmasList[0] || '5.º A');
    setEditNewPassword('');
    setShowEditPassword(false);
    setEditError('');
    setEditSuccess('');
  };

  const closeEditModal = () => {
    setEditingStudent(null);
    setEditNewPassword('');
    setEditError('');
    setEditSuccess('');
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setEditError('');
    setEditSuccess('');

    if (editNewPassword && editNewPassword.length < 6) {
      setEditError(language === 'pt' ? 'A nova palavra-passe deve ter pelo menos 6 caracteres.' : 'Password must have at least 6 characters.');
      return;
    }

    setEditLoading(true);
    try {
      await api.adminUpdateStudent(editingStudent.id, editingStudent.email, {
        newName: editName.trim() !== editingStudent.name ? editName.trim() : undefined,
        newTurma: editTurma !== editingStudent.turma ? editTurma : undefined,
        newPassword: editNewPassword ? editNewPassword : undefined,
      });

      setEditSuccess(language === 'pt' ? 'Dados do aluno atualizados com sucesso!' : 'Student updated successfully!');
      await loadStudents();
      setTimeout(() => {
        closeEditModal();
      }, 1000);
    } catch (err: any) {
      setEditError(err?.message || (language === 'pt' ? 'Erro ao atualizar dados do aluno.' : 'Error updating student.'));
    } finally {
      setEditLoading(false);
    }
  };

  // Selection helpers
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

  const allFilteredSelected = useMemo(() => {
    if (filteredStudents.length === 0) return false;
    return filteredStudents.every((s) => selectedStudentIds.has(s.id || s.email));
  }, [filteredStudents, selectedStudentIds]);

  const toggleSelectAllFiltered = () => {
    const next = new Set(selectedStudentIds);
    if (allFilteredSelected) {
      filteredStudents.forEach((s) => next.delete(s.id || s.email));
    } else {
      filteredStudents.forEach((s) => next.add(s.id || s.email));
    }
    setSelectedStudentIds(next);
  };

  const toggleSelectStudent = (idOrEmail: string) => {
    const next = new Set(selectedStudentIds);
    if (next.has(idOrEmail)) {
      next.delete(idOrEmail);
    } else {
      next.add(idOrEmail);
    }
    setSelectedStudentIds(next);
  };

  // Action: Create Turma
  const handleCreateTurmaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newTurmaName.trim();
    if (!cleanName) return;

    setCreatingTurma(true);
    try {
      const res = await api.adminCreateTurma(cleanName);
      setTurmasList(res.turmas);
      setNewTurmaName('');
      showToast('success', res.message);
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao criar turma.');
    } finally {
      setCreatingTurma(false);
    }
  };

  // Action: Delete Single Student
  const promptDeleteSingleStudent = (student: User) => {
    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? 'Eliminar Aluno' : 'Delete Student',
      description: language === 'pt'
        ? `Tens a certeza que desejas eliminar o aluno "${student.name}" (${student.email}) da turma ${student.turma || '5.º A'}?`
        : `Are you sure you want to delete student "${student.name}" (${student.email})?`,
      warningText: language === 'pt'
        ? 'Esta ação é irreversível e removerá todo o progresso, pontos (XP) e medalhas deste aluno da base de dados.'
        : 'This action cannot be undone and will delete all progress and XP for this student.',
      confirmLabel: language === 'pt' ? 'Sim, Eliminar Aluno' : 'Yes, Delete Student',
      isDanger: true,
      action: async () => {
        await api.adminDeleteStudent(student.id, student.email);
        setSelectedStudentIds((prev) => {
          const next = new Set(prev);
          next.delete(student.id);
          next.delete(student.email);
          return next;
        });
        await loadStudents();
        showToast('success', language === 'pt' ? `Aluno "${student.name}" eliminado com sucesso.` : 'Student deleted successfully.');
      },
    });
  };

  // Action: Delete Selected Students
  const promptDeleteSelectedStudents = () => {
    if (selectedStudentIds.size === 0) return;
    const count = selectedStudentIds.size;
    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? `Eliminar ${count} Aluno(s) Selecionado(s)` : `Delete ${count} Selected Student(s)`,
      description: language === 'pt'
        ? `Tens a certeza que pretendes eliminar os ${count} alunos selecionados da plataforma?`
        : `Are you sure you want to delete the ${count} selected students?`,
      warningText: language === 'pt'
        ? 'Todos os registos e pontuações destes alunos serão apagados permanentemente.'
        : 'All records and scores for these students will be permanently deleted.',
      confirmLabel: language === 'pt' ? `Eliminar ${count} Alunos` : `Delete ${count} Students`,
      isDanger: true,
      action: async () => {
        const ids = Array.from(selectedStudentIds);
        const res = await api.adminDeleteStudents(ids);
        setSelectedStudentIds(new Set());
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

  // Action: Delete all students of a specific Turma
  const promptDeleteStudentsByTurma = (turmaName: string) => {
    const studentsInTurma = students.filter((s) => (s.turma || '').trim() === turmaName.trim());
    const count = studentsInTurma.length;
    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? `Eliminar Alunos da Turma ${turmaName}` : `Delete Students in Class ${turmaName}`,
      description: language === 'pt'
        ? `Vais eliminar todos os ${count} alunos pertencentes à turma ${turmaName}.`
        : `You will delete all ${count} students belonging to class ${turmaName}.`,
      warningText: language === 'pt'
        ? `Atenção: Todos os registos de pauta e pontuações da turma ${turmaName} serão apagados. A turma continuará disponível na lista de turmas.`
        : `Warning: All records and scores for class ${turmaName} will be cleared.`,
      confirmLabel: language === 'pt' ? `Eliminar ${count} Alunos da ${turmaName}` : `Delete ${count} Students`,
      isDanger: true,
      action: async () => {
        const res = await api.adminDeleteStudentsByTurmas([turmaName]);
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

  // Action: Delete Turma (Class)
  const promptDeleteTurma = (turmaName: string) => {
    const studentsInTurma = students.filter((s) => (s.turma || '').trim() === turmaName.trim());
    const count = studentsInTurma.length;

    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? `Eliminar Turma ${turmaName}` : `Delete Class ${turmaName}`,
      description: language === 'pt'
        ? `Pretendes remover a turma "${turmaName}" da plataforma?`
        : `Do you want to remove class "${turmaName}" from the platform?`,
      warningText: count > 0
        ? language === 'pt'
          ? `Existem atualmente ${count} aluno(s) inscritos nesta turma. Ao confirmar, a turma será removida e todos os seus ${count} alunos serão igualmente eliminados da base de dados.`
          : `There are currently ${count} student(s) in this class. They will also be removed.`
        : language === 'pt'
          ? `Esta turma não tem alunos inscritos. Apenas será removida da lista de turmas.`
          : `This class has no students and will be removed from the list.`,
      confirmLabel: language === 'pt' ? `Sim, Eliminar Turma ${turmaName}` : `Yes, Delete Class ${turmaName}`,
      isDanger: true,
      action: async () => {
        const res = await api.adminDeleteTurmas([turmaName], true);
        setTurmasList(res.turmas);
        if (selectedTurma === turmaName) {
          setSelectedTurma('all');
        }
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

  // Action: Delete ALL Students (Novo Ano Letivo)
  const promptDeleteAllStudents = () => {
    const totalCount = students.length;
    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? '🚨 Eliminar TODOS os Alunos (Novo Ano Letivo)' : '🚨 Delete ALL Students (School Year Reset)',
      description: language === 'pt'
        ? `Esta ação irá eliminar permanentemente todos os ${totalCount} alunos registados em todas as turmas da plataforma.`
        : `This action will permanently delete all ${totalCount} registered students across all classes.`,
      warningText: language === 'pt'
        ? '⚠️ ATENÇÃO: Todas as contas de alunos, pontuações XP, histórico de atividades e pautas serão apagados. A conta da Professora Carla (imaginebycarla2023@gmail.com) e a configuração de turmas permanecerão 100% seguras e intactas.'
        : '⚠️ WARNING: All student accounts and grades will be cleared. The teacher account remains safe.',
      confirmLabel: language === 'pt' ? 'CONFIRMAR ELIMINAÇÃO TOTAL DE ALUNOS' : 'CONFIRM PURGE OF ALL STUDENTS',
      isDanger: true,
      action: async () => {
        const res = await api.adminDeleteAllStudents();
        setSelectedStudentIds(new Set());
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

  // Execute confirm dialog action
  const handleExecuteConfirm = async () => {
    if (!confirmDialog) return;
    setActionLoading(true);
    try {
      await confirmDialog.action();
      setConfirmDialog(null);
    } catch (err: any) {
      showToast('error', err?.message || 'Ocorreu um erro ao executar a operação.');
    } finally {
      setActionLoading(false);
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const targetStudents = selectedTurma === 'all'
      ? students
      : students.filter((s) => (s.turma || '').trim() === selectedTurma.trim());

    const total = targetStudents.length;
    const totalPoints = targetStudents.reduce((acc, curr) => acc + (curr.points || 0), 0);
    const avgPoints = total > 0 ? Math.round(totalPoints / total) : 0;
    const maxPoints = total > 0 ? Math.max(0, ...targetStudents.map((s) => s.points || 0)) : 0;
    const activeTurmasCount = new Set(students.map((s) => s.turma).filter(Boolean)).size;

    return { total, avgPoints, maxPoints, activeTurmasCount };
  }, [students, selectedTurma]);

  if (!isOpen) return null;

  const isAdmin = currentUser && isUserAdmin(currentUser.email, currentUser.role);

  const handleExportXLS = () => {
    if (filteredStudents.length === 0) return;
    exportStudentsToExcel(filteredStudents, selectedTurma);
    showToast('success', 'Ficheiro Excel (.xlsx) transferido com sucesso!');
  };

  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;
    exportStudentsToCSV(filteredStudents, selectedTurma);
    showToast('success', 'Ficheiro CSV transferido com sucesso!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        id="admin-panel-modal-card"
        className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-linear-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-inner text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {language === 'pt' ? 'Área Reservada da Professora / Administrador' : 'Teacher / Admin Portal'}
                </span>
                <span className="text-xs text-indigo-300 font-mono">
                  {currentUser?.email}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
                {language === 'pt' ? 'Pautas de Avaliação & Gestão de Turmas' : 'Class Assessment & Class Management'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Access check notice if not admin */}
        {!isAdmin && (
          <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center gap-3 text-amber-800 text-sm shrink-0">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
            <p>
              Acesso exclusivo para administradores e professores registados. Inicia sessão com a tua conta de professor para gerir turmas e pautas.
            </p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 py-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{language === 'pt' ? 'Alunos & Pautas' : 'Students & Records'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-black">
                {students.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('turmas')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'turmas'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>{language === 'pt' ? 'Gestão de Turmas' : 'Class Management'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-black">
                {turmasList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('danger')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'danger'
                  ? 'bg-rose-50 text-rose-700 shadow-xs border border-rose-200'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
              }`}
            >
              <Trash2 className="w-4 h-4 text-rose-500" />
              <span>{language === 'pt' ? 'Limpeza & Eliminações' : 'Purge & Resets'}</span>
            </button>
          </div>

          <button
            onClick={loadStudents}
            disabled={loading}
            title="Atualizar dados da base de dados"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer shrink-0 text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
            <span className="hidden sm:inline">{language === 'pt' ? 'Atualizar' : 'Refresh'}</span>
          </button>
        </div>

        {/* Feedback Toast Notification */}
        {feedbackMsg && (
          <div
            className={`mx-4 sm:mx-6 mt-3 p-3 rounded-2xl border text-xs sm:text-sm flex items-center justify-between animate-in slide-in-from-top duration-150 shrink-0 ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              {feedbackMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-xs font-bold underline hover:opacity-75 cursor-pointer ml-3 shrink-0"
            >
              OK
            </button>
          </div>
        )}

        {/* TAB 1: ALUNOS & PAUTAS */}
        {activeTab === 'students' && (
          <>
            {/* Control Bar: Turma filter, Search, Batch Delete, Exports */}
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
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
                        <span className={`text-[10px] px-1 py-0.2 rounded-full ${selectedTurma === turma ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {countInTurma}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search & Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <div className="relative flex-1 sm:w-60">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={language === 'pt' ? 'Pesquisar aluno ou email...' : 'Search student...'}
                      className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Batch Delete button if students are checked */}
                  {selectedStudentIds.size > 0 && (
                    <button
                      onClick={promptDeleteSelectedStudents}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 animate-in fade-in"
                      title="Eliminar os alunos selecionados"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'pt' ? `Eliminar (${selectedStudentIds.size})` : `Delete (${selectedStudentIds.size})`}</span>
                    </button>
                  )}

                  {/* Export XLS */}
                  <button
                    onClick={handleExportXLS}
                    disabled={filteredStudents.length === 0}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                    title="Descarregar ficheiro Excel (.xlsx)"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>XLS</span>
                  </button>

                  {/* Export CSV */}
                  <button
                    onClick={handleExportCSV}
                    disabled={filteredStudents.length === 0}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 shrink-0"
                    title="Descarregar ficheiro CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {selectedTurma === 'all' ? 'Total Alunos' : `Alunos ${selectedTurma}`}
                    </span>
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <p className="text-lg font-black text-slate-900">{stats.total}</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {language === 'pt' ? 'Média Pontos' : 'Average Score'}
                    </span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-lg font-black text-emerald-700">{stats.avgPoints} XP</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {language === 'pt' ? 'Pontuação Máxima' : 'Top Score'}
                    </span>
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <p className="text-lg font-black text-amber-600">{stats.maxPoints} XP</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {language === 'pt' ? 'Turmas c/ Alunos' : 'Active Classes'}
                    </span>
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <p className="text-lg font-black text-indigo-900">{stats.activeTurmasCount} / {turmasList.length}</p>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6 min-h-[260px]">
              {loading ? (
                <div className="py-20 text-center">
                  <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-600">
                    A carregar os registos dos alunos da Base de Dados Cloud Firestore...
                  </p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="py-14 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-300">
                  <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-base font-bold text-slate-700">
                    Nenhum aluno encontrado {selectedTurma !== 'all' ? `na turma ${selectedTurma}` : ''}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Os alunos inscritos aparecerão aqui e poderás gerir as respetivas notas, palavras-passe, turmas ou efetuar a sua eliminação quando necessário.
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-3 w-10 text-center">
                          <button
                            type="button"
                            onClick={toggleSelectAllFiltered}
                            className="p-1 rounded text-slate-500 hover:text-indigo-600 cursor-pointer"
                            title={allFilteredSelected ? 'Desmarcar todos' : 'Selecionar todos'}
                          >
                            {allFilteredSelected ? (
                              <CheckSquare className="w-4 h-4 text-indigo-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </th>
                        <th className="py-3 px-3">Turma</th>
                        <th className="py-3 px-3">Nome do Aluno</th>
                        <th className="py-3 px-3">Email</th>
                        <th className="py-3 px-3">ID Público</th>
                        <th className="py-3 px-3 text-right">Pontos (XP)</th>
                        <th className="py-3 px-3">Data Registo</th>
                        <th className="py-3 px-3 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredStudents.map((student) => {
                        const isChecked = selectedStudentIds.has(student.id || student.email);
                        return (
                          <tr
                            key={student.id || student.email}
                            className={`hover:bg-indigo-50/40 transition-colors ${isChecked ? 'bg-indigo-50/60' : ''}`}
                          >
                            <td className="py-2.5 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => toggleSelectStudent(student.id || student.email)}
                                className="p-1 rounded text-slate-400 hover:text-indigo-600 cursor-pointer"
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                                ) : (
                                  <Square className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                                {student.turma || '5.º A'}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap font-bold text-slate-900">
                              {student.name || 'Estudante'}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 font-mono text-xs">
                              {student.email}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 font-mono text-xs">
                              {student.publicId}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap text-right font-black text-indigo-700">
                              {student.points ?? 0} XP
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 text-xs">
                              {student.createdAt ? new Date(student.createdAt).toLocaleDateString('pt-PT') : '—'}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => openEditModal(student)}
                                  className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                  title="Editar nome, turma ou palavra-passe"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => promptDeleteSingleStudent(student)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 border border-rose-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                  title="Eliminar este aluno permanentemente"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB 2: GESTÃO DE TURMAS (CRIAR E ELIMINAR TURMAS) */}
        {activeTab === 'turmas' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Create Turma Card */}
            <div className="p-5 sm:p-6 bg-linear-to-br from-indigo-50/70 to-slate-50 rounded-2xl border border-indigo-100 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <FolderPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'pt' ? 'Criar Nova Turma' : 'Create New Class'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'pt'
                      ? 'Adiciona novas turmas para que os alunos possam selecioná-las no registo e nas pautas.'
                      : 'Add new classes to let students select them during sign-up.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateTurmaSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    value={newTurmaName}
                    onChange={(e) => setNewTurmaName(e.target.value)}
                    placeholder={language === 'pt' ? 'Ex: 5.º G, 5.º H, 6.º A, Turma TIC...' : 'Ex: 5.º G, 6.º A...'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={creatingTurma || !newTurmaName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {creatingTurma ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>{language === 'pt' ? 'Criar Turma' : 'Add Class'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap mt-3 text-xs text-slate-500">
                <span className="font-semibold">{language === 'pt' ? 'Sugestões rápidas:' : 'Quick suggestions:'}</span>
                {['5.º G', '5.º H', '5.º I', '6.º A', '6.º B'].map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setNewTurmaName(sug)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 text-[11px] font-bold cursor-pointer"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Active Turmas */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'pt' ? 'Turmas Ativas na Escola' : 'Active Classes'} ({turmasList.length})</span>
                </h4>
                <span className="text-xs text-slate-500">
                  {language === 'pt' ? 'Podes eliminar turmas individualmente ou os seus alunos' : 'Manage each class'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {turmasList.map((turma) => {
                  const turmaStudents = students.filter((s) => (s.turma || '').trim() === turma.trim());
                  const count = turmaStudents.length;
                  const totalXP = turmaStudents.reduce((sum, s) => sum + (s.points || 0), 0);
                  const avgXP = count > 0 ? Math.round(totalXP / count) : 0;

                  return (
                    <div
                      key={turma}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-black text-sm shadow-xs">
                              {turma}
                            </span>
                            <span className="text-xs font-bold text-slate-600">
                              {count} {count === 1 ? 'aluno' : 'alunos'}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-slate-500 space-y-0.5">
                            <p>XP Total: <strong className="text-indigo-700 font-bold">{totalXP} XP</strong></p>
                            <p>Média: <strong className="text-emerald-700 font-bold">{avgXP} XP/aluno</strong></p>
                          </div>
                        </div>

                        <button
                          onClick={() => promptDeleteTurma(turma)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 border border-rose-200 transition-colors cursor-pointer shrink-0"
                          title={`Eliminar turma ${turma}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => {
                            setSelectedTurma(turma);
                            setActiveTab('students');
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer hover:underline"
                        >
                          {language === 'pt' ? 'Ver Alunos →' : 'View Students →'}
                        </button>

                        {count > 0 && (
                          <button
                            onClick={() => promptDeleteStudentsByTurma(turma)}
                            className="text-rose-600 hover:text-rose-800 font-medium text-[11px] cursor-pointer hover:underline"
                          >
                            {language === 'pt' ? 'Limpar Alunos' : 'Clear Students'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIMPEZA & REDEFINIÇÃO GLOBAL (ZONA DE PERIGO) */}
        {activeTab === 'danger' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">{language === 'pt' ? 'Zona de Limpeza e Transição de Ano Letivo' : 'Reset and Transition Zone'}</strong>
                <p className="mt-0.5 text-amber-800">
                  {language === 'pt'
                    ? 'Usa estas opções para apagar alunos de turmas específicas ou reiniciar as pautas para um novo ano letivo. A conta de professora (imaginebycarla2023@gmail.com) nunca é apagada por estas operações.'
                    : 'Use these controls to purge classes or reset for a new school year. Teacher accounts are preserved.'}
                </p>
              </div>
            </div>

            {/* Option 1: Delete Students of Specific Classes */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'pt' ? '1. Eliminar Alunos por Turma Específica' : '1. Delete Students by Class'}
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                {language === 'pt'
                  ? 'Escolhe uma turma para eliminar todos os respetivos alunos, mantendo as outras turmas intactas.'
                  : 'Choose a class to delete all its students while preserving other classes.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
                {turmasList.map((turma) => {
                  const count = students.filter((s) => (s.turma || '').trim() === turma.trim()).length;
                  return (
                    <button
                      key={turma}
                      onClick={() => promptDeleteStudentsByTurma(turma)}
                      disabled={count === 0}
                      className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-600 hover:text-white text-rose-800 text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{turma}</span>
                      <span className="text-[10px] opacity-80">({count} alunos)</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option 2: Full Reset / Delete ALL Students */}
            <div className="p-5 sm:p-6 bg-rose-50/60 rounded-2xl border-2 border-rose-200 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-rose-950">
                    {language === 'pt' ? '2. Eliminar TODOS os Alunos da Plataforma' : '2. Delete ALL Students Across All Classes'}
                  </h4>
                  <p className="text-xs sm:text-sm text-rose-800 mt-1">
                    {language === 'pt'
                      ? `Elimina permanentemente todas as contas dos ${students.length} alunos atualmente registados, respetivas pontuações XP, pautas e histórico de quizzes.`
                      : `Permanently deletes all ${students.length} student accounts and records across all classes.`}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-rose-700 font-medium">
                  🔒 {language === 'pt' ? 'Apenas a conta de professor(a) será mantida.' : 'Only the teacher account will be kept.'}
                </div>
                <button
                  onClick={promptDeleteAllStudents}
                  disabled={students.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Eliminar Todos os Alunos' : 'Purge All Students'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {language === 'pt'
                ? `Total de ${students.length} aluno(s) registado(s) em ${turmasList.length} turma(s).`
                : `${students.length} student(s) registered in ${turmasList.length} class(es).`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportXLS}
              disabled={filteredStudents.length === 0}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{language === 'pt' ? 'Descarregar XLS' : 'Download XLS'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
            >
              {language === 'pt' ? 'Fechar' : 'Close'}
            </button>
          </div>
        </div>

        {/* SUB-MODAL: Edit Student Details (Password & Turma) */}
        {editingStudent && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="p-5 bg-linear-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-300">
                    <Edit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {language === 'pt' ? 'Gerir Registo do Aluno' : 'Manage Student Record'}
                    </h3>
                    <p className="text-xs text-indigo-200 font-mono">
                      {editingStudent.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="p-1.5 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {editError && (
                <div className="mx-5 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{editError}</span>
                </div>
              )}
              {editSuccess && (
                <div className="mx-5 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{editSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSaveStudent} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    {language === 'pt' ? 'Nome do Aluno' : 'Student Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                    <span>{language === 'pt' ? 'Mudar Turma do Aluno' : 'Change Class'}</span>
                    <span className="text-[11px] text-indigo-600 font-semibold">
                      {language === 'pt' ? 'Atual:' : 'Current:'} {editingStudent.turma || '5.º A'}
                    </span>
                  </label>
                  <select
                    value={editTurma}
                    onChange={(e) => setEditTurma(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {turmasList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{language === 'pt' ? 'Alterar Palavra-passe' : 'Change Password'}</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {language === 'pt' ? '(Deixar vazio para manter)' : '(Leave blank to keep)'}
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type={showEditPassword ? 'text' : 'password'}
                      value={editNewPassword}
                      onChange={(e) => setEditNewPassword(e.target.value)}
                      placeholder={language === 'pt' ? 'Nova palavra-passe (mín. 6 carateres)' : 'New password (min 6 chars)'}
                      className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEditPassword(!showEditPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showEditPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {language === 'pt'
                      ? 'Permite redefinir a palavra-passe do aluno caso se tenha esquecido.'
                      : 'Allows resetting forgotten student password.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {language === 'pt' ? 'Cancelar' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    {editLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>{language === 'pt' ? 'Guardar Alterações' : 'Save Changes'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* GENERAL CONFIRMATION DIALOG */}
        {confirmDialog && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
              <div className={`p-5 ${confirmDialog.isDanger ? 'bg-rose-600' : 'bg-indigo-700'} text-white flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {confirmDialog.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => !actionLoading && setConfirmDialog(null)}
                  disabled={actionLoading}
                  className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-sm font-medium text-slate-800">
                  {confirmDialog.description}
                </p>

                {confirmDialog.warningText && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                    {confirmDialog.warningText}
                  </div>
                )}

                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setConfirmDialog(null)}
                    disabled={actionLoading}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {language === 'pt' ? 'Cancelar' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteConfirm}
                    disabled={actionLoading}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md ${
                      confirmDialog.isDanger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {actionLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>{confirmDialog.confirmLabel}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
