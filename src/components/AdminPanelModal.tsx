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
  Unlock,
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
  BookOpen,
  Sparkles,
  Check,
  ToggleLeft,
  ToggleRight,
  ListOrdered,
  ExternalLink,
} from 'lucide-react';
import { User, Language, ThemeVisibilityMap, ActivityProgress } from '../types';
import { api, isUserAdmin, DEFAULT_THEME_VISIBILITY } from '../services/api';
import { getTurmasList } from '../data/turmasData';
import {
  exportStudentsToExcel,
  exportStudentsToCSV,
  exportThemeScoresToExcel,
  exportThemeScoresToCSV,
  getStudentThemeBreakdown,
  getQualitativeLevel,
} from '../utils/exportUtils';
import { ALL_THEMES, THEMES_BY_ID } from '../data/allThemesData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  language: Language;
  initialTab?: 'students' | 'scores' | 'turmas' | 'themes' | 'danger';
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
  initialTab = 'students',
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'scores' | 'turmas' | 'themes' | 'danger'>('students');
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Scores by Theme & Activity Progress State
  const [selectedThemeForScores, setSelectedThemeForScores] = useState<string>('tic-sociedade');
  const [progressMap, setProgressMap] = useState<Record<string, ActivityProgress[]>>({});
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [detailStudent, setDetailStudent] = useState<User | null>(null);

  // Theme Visibility State
  const [themeVisibility, setThemeVisibility] = useState<ThemeVisibilityMap>(DEFAULT_THEME_VISIBILITY);
  const [togglingThemeId, setTogglingThemeId] = useState<string | null>(null);

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

  // Load Turmas, Students and Theme Visibility whenever modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      setTurmasList(getTurmasList());
      loadStudents();
      loadThemeVisibility();
      setSelectedStudentIds(new Set());
      setFeedbackMsg(null);
    }
  }, [isOpen, initialTab]);

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

  const loadProgressForStudents = async (studentList: User[]) => {
    if (!studentList || studentList.length === 0) return;
    setLoadingProgress(true);
    try {
      const map = await api.getStudentsProgressBatch(studentList.map((s) => s.id));
      setProgressMap((prev) => ({ ...prev, ...map }));
    } catch (err) {
      console.error('Failed to load student progress batch:', err);
    } finally {
      setLoadingProgress(false);
    }
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await api.getAllStudentsForAdmin();
      setStudents(data);
      // Asynchronously fetch progress records for challenges and quizzes
      loadProgressForStudents(data);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshTurmas = () => {
    setTurmasList(getTurmasList());
  };

  const loadThemeVisibility = async () => {
    try {
      const map = await api.getThemeVisibility();
      setThemeVisibility(map);
    } catch (err) {
      console.error('Failed to load theme visibility:', err);
    }
  };

  const handleToggleTheme = async (themeId: string, currentVal: boolean) => {
    setTogglingThemeId(themeId);
    const nextVal = !currentVal;
    const nextMap: ThemeVisibilityMap = { ...themeVisibility, [themeId]: nextVal };
    setThemeVisibility(nextMap);

    const themeObj = ALL_THEMES.find((t) => t.id === themeId);
    const themeName = themeObj ? `Tema ${themeObj.number}: ${themeObj.title.pt}` : themeId;

    try {
      await api.saveThemeVisibility(nextMap);
      showToast(
        'success',
        nextVal
          ? (language === 'pt' ? `✅ ${themeName} agora VISÍVEL e desbloqueado para os alunos!` : `✅ ${themeName} is now VISIBLE to students!`)
          : (language === 'pt' ? `🔒 ${themeName} agora OCULTO / BLOQUEADO para os alunos.` : `🔒 ${themeName} is now HIDDEN for students.`)
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao atualizar visibilidade do tema.');
      // Revert on error
      setThemeVisibility(themeVisibility);
    } finally {
      setTogglingThemeId(null);
    }
  };

  const handleSetAllThemes = async (visible: boolean) => {
    const nextMap: ThemeVisibilityMap = {};
    ALL_THEMES.forEach((t) => {
      nextMap[t.id] = visible;
    });
    setThemeVisibility(nextMap);

    try {
      await api.saveThemeVisibility(nextMap);
      showToast(
        'success',
        visible
          ? (language === 'pt' ? '🌟 Todos os 7 temas foram DESBLOQUEADOS e estão visíveis para os alunos!' : '🌟 All 7 themes unlocked!')
          : (language === 'pt' ? '🔒 Todos os temas foram OCULTADOS aos alunos.' : '🔒 All themes hidden.')
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao atualizar temas.');
    }
  };

  const handleSetThemesUpTo = async (themeNumber: number) => {
    const nextMap: ThemeVisibilityMap = {};
    ALL_THEMES.forEach((t) => {
      nextMap[t.id] = t.number <= themeNumber;
    });
    setThemeVisibility(nextMap);

    try {
      await api.saveThemeVisibility(nextMap);
      showToast(
        'success',
        language === 'pt'
          ? `🎯 Temas do 1 ao ${themeNumber} agora DESBLOQUEADOS para os alunos (Temas ${themeNumber + 1 > 7 ? 'Nenhum' : `${themeNumber + 1} a 7`} bloqueados).`
          : `🎯 Themes 1 to ${themeNumber} are now visible!`
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao atualizar temas.');
    }
  };

  const visibleThemesCount = useMemo(() => {
    return ALL_THEMES.filter((t) => themeVisibility[t.id] !== false).length;
  }, [themeVisibility]);

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

  const handleExportThemeXLS = async () => {
    if (filteredStudents.length === 0) return;
    let currentMap = progressMap;
    if (Object.keys(currentMap).length === 0 && students.length > 0) {
      setLoadingProgress(true);
      try {
        currentMap = await api.getStudentsProgressBatch(students.map((s) => s.id));
        setProgressMap(currentMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProgress(false);
      }
    }
    exportThemeScoresToExcel(filteredStudents, currentMap, selectedThemeForScores, selectedTurma);
    showToast(
      'success',
      selectedThemeForScores === 'all'
        ? (language === 'pt' ? 'Caderno Completo (7 Temas em XLS) exportado com sucesso!' : 'All 7 themes workbook exported successfully!')
        : (language === 'pt' ? 'Pauta de desafios e quizzes do tema exportada com sucesso em XLS!' : 'Theme scores exported to XLS!')
    );
  };

  const handleExportFull7ThemesXLS = async () => {
    if (filteredStudents.length === 0) return;
    let currentMap = progressMap;
    if (Object.keys(currentMap).length === 0 && students.length > 0) {
      setLoadingProgress(true);
      try {
        currentMap = await api.getStudentsProgressBatch(students.map((s) => s.id));
        setProgressMap(currentMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProgress(false);
      }
    }
    exportThemeScoresToExcel(filteredStudents, currentMap, 'all', selectedTurma);
    showToast(
      'success',
      language === 'pt'
        ? 'Caderno Completo de Avaliação (7 Temas com Resumo Geral) exportado com sucesso em XLS!'
        : 'All 7 themes complete assessment workbook exported to XLS!'
    );
  };

  const handleExportThemeCSV = () => {
    if (filteredStudents.length === 0) return;
    if (selectedThemeForScores === 'all') {
      handleExportFull7ThemesXLS();
    } else {
      const theme = THEMES_BY_ID[selectedThemeForScores] || ALL_THEMES.find((t) => t.id === selectedThemeForScores) || ALL_THEMES[0];
      exportThemeScoresToCSV(filteredStudents, progressMap, theme, selectedTurma);
      showToast('success', language === 'pt' ? 'Ficheiro CSV do tema exportado com sucesso!' : 'Theme CSV exported!');
    }
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
              onClick={() => {
                setActiveTab('scores');
                if (Object.keys(progressMap).length === 0 && students.length > 0) {
                  loadProgressForStudents(students);
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'scores'
                  ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>{language === 'pt' ? 'Desafios & Quizzes (Pauta XLS)' : 'Challenges & Quizzes (XLS)'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-black">
                XLS
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
              onClick={() => setActiveTab('themes')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'themes'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>{language === 'pt' ? 'Visibilidade dos Temas' : 'Theme Visibility'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                visibleThemesCount === 7
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {visibleThemesCount}/7
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

                  {/* Shortcut to Theme Scores XLS */}
                  <button
                    onClick={() => {
                      setActiveTab('scores');
                      if (Object.keys(progressMap).length === 0 && students.length > 0) {
                        loadProgressForStudents(students);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs sm:text-sm font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    title="Aceder à pauta de desafios e quizzes por tema"
                  >
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span className="hidden md:inline">{language === 'pt' ? 'Pauta por Tema' : 'Scores by Theme'}</span>
                  </button>

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
                                  onClick={() => {
                                    setDetailStudent(student);
                                    if (!progressMap[student.id]) {
                                      loadProgressForStudents([student]);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                  title="Ver pauta de desafios e quizzes deste aluno"
                                >
                                  <FileSpreadsheet className="w-3.5 h-3.5" />
                                </button>
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

        {/* TAB: PAUTA DE DESAFIOS E QUIZZES POR TEMA (EXPORTAÇÃO XLS) */}
        {activeTab === 'scores' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-50">
            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 bg-white border-b border-slate-200 shadow-2xs shrink-0 space-y-3.5">
              {/* Row 1: Turmas Pills & Export Buttons */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Turma:' : 'Class:'}
                  </span>
                  <button
                    onClick={() => setSelectedTurma('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTurma === 'all'
                        ? 'bg-emerald-600 text-white shadow-xs'
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
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{turma}</span>
                        <span
                          className={`text-[10px] px-1 py-0.2 rounded-full ${
                            selectedTurma === turma ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {countInTurma}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Export Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleExportThemeXLS}
                    disabled={filteredStudents.length === 0}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                    title="Exportar pauta detalhada do tema em Excel (.xlsx)"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>
                      {selectedThemeForScores === 'all'
                        ? (language === 'pt' ? 'Exportar Todos os Temas (XLS)' : 'Export All Themes (XLS)')
                        : (language === 'pt' ? 'Exportar Pauta do Tema (XLS)' : 'Export Theme Scores (XLS)')}
                    </span>
                  </button>

                  <button
                    onClick={handleExportFull7ThemesXLS}
                    disabled={filteredStudents.length === 0}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                    title="Exportar caderno completo de avaliação com resumo global e 7 folhas temáticas (.xlsx)"
                  >
                    <Award className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {language === 'pt' ? 'Caderno Completo (7 Temas XLS)' : 'Master Workbook (7 Themes)'}
                    </span>
                  </button>

                  <button
                    onClick={handleExportThemeCSV}
                    disabled={filteredStudents.length === 0}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 shrink-0"
                    title="Exportar dados em formato CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={() => loadProgressForStudents(students)}
                    disabled={loadingProgress}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
                    title="Recarregar progresso dos alunos da base de dados"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingProgress ? 'animate-spin text-emerald-600' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Row 2: Theme Selector & Search */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1 shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Tema:' : 'Theme:'}
                  </span>
                  <button
                    onClick={() => setSelectedThemeForScores('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedThemeForScores === 'all'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {language === 'pt' ? '🌐 Visão Global (7 Temas)' : '🌐 All Themes Overview'}
                  </button>
                  {ALL_THEMES.map((theme) => {
                    const isSelected = selectedThemeForScores === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedThemeForScores(theme.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                        title={theme.title.pt}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                            isSelected ? 'bg-white text-emerald-700' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {theme.number}
                        </span>
                        <span>{theme.title.pt.split(':')[0] || `Tema ${theme.number}`}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full lg:w-72 shrink-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'pt' ? 'Filtrar por aluno, email ou ID...' : 'Filter by student or email...'}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Informative Evaluation Criteria Banner */}
              <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'pt'
                      ? 'Critério de Avaliação: Cada desafio e quiz vale até 100 pontos (0 a 100). No Quiz de Aprendizagem, a nota oficial é a 1.ª tentativa, ficando registadas as tentativas seguintes para histórico.'
                      : 'Evaluation Criteria: Each challenge and quiz has up to 100 points. Learning Quiz grade is from 1st attempt.'}
                  </span>
                </div>
                <span className="font-bold text-[11px] bg-emerald-200/70 text-emerald-900 px-2.5 py-0.5 rounded-md">
                  {selectedThemeForScores === 'all' ? '7 Temas × 500 = 3500 XP' : '4 Desafios + 1 Quiz = 500 XP'}
                </span>
              </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {loadingProgress && Object.keys(progressMap).length === 0 ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
                  <p className="font-semibold text-sm">
                    {language === 'pt'
                      ? 'A carregar pautas e registos de atividades da base de dados...'
                      : 'Loading activity records...'}
                  </p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-30 text-slate-500" />
                  <p className="text-base font-bold text-slate-600">
                    {language === 'pt' ? 'Nenhum aluno encontrado' : 'No students found'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {language === 'pt'
                      ? 'Verifica os filtros de turma e pesquisa selecionados.'
                      : 'Check the class and search filters.'}
                  </p>
                </div>
              ) : selectedThemeForScores !== 'all' ? (
                // SPECIFIC THEME TABLE
                (() => {
                  const currentTheme =
                    THEMES_BY_ID[selectedThemeForScores] ||
                    ALL_THEMES.find((t) => t.id === selectedThemeForScores) ||
                    ALL_THEMES[0];
                  const regularChallenges = currentTheme.challenges.filter((c) => c.type !== 'final_quiz');

                  return (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                            {currentTheme.number}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm">
                            {currentTheme.title.pt}
                          </h4>
                        </div>
                        <div className="text-xs text-slate-500">
                          {language === 'pt'
                            ? `A mostrar ${filteredStudents.length} aluno(s) • ${selectedTurma === 'all' ? 'Todas as Turmas' : selectedTurma}`
                            : `Showing ${filteredStudents.length} student(s)`}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                          <thead className="bg-slate-100/90 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                              <th className="py-3 px-3 w-12 text-center">N.º</th>
                              <th className="py-3 px-3 w-20">Turma</th>
                              <th className="py-3 px-3 min-w-[160px]">Aluno</th>
                              <th className="py-3 px-3 min-w-[190px]">Email Institucional</th>
                              {regularChallenges.map((ch, idx) => (
                                <th key={ch.id} className="py-3 px-3 text-center min-w-[130px]" title={ch.title.pt}>
                                  <div className="font-bold">Desafio {idx + 1}</div>
                                  <div className="text-[10px] text-slate-500 font-normal truncate max-w-[130px]">
                                    {ch.title.pt}
                                  </div>
                                </th>
                              ))}
                              <th className="py-3 px-3 text-center min-w-[150px]">
                                <div className="font-bold text-emerald-800">Quiz de Aprendizagem</div>
                                <div className="text-[10px] text-emerald-600 font-normal">1.ª Tent. (Oficial)</div>
                              </th>
                              <th className="py-3 px-3 text-right min-w-[120px]">
                                <div className="font-bold">Total Tema</div>
                                <div className="text-[10px] text-slate-500 font-normal">Máx: 500 XP</div>
                              </th>
                              <th className="py-3 px-3 text-center min-w-[110px]">Aproveitamento</th>
                              <th className="py-3 px-3 text-center w-24">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student, idx) => {
                              const sProgress = progressMap[student.id] || progressMap[student.email] || [];
                              const breakdown = getStudentThemeBreakdown(student, sProgress, currentTheme);

                              return (
                                <tr
                                  key={student.id || student.email}
                                  className="hover:bg-slate-50/80 transition-colors"
                                >
                                  <td className="py-2.5 px-3 text-center text-xs font-semibold text-slate-400">
                                    {idx + 1}
                                  </td>
                                  <td className="py-2.5 px-3 whitespace-nowrap">
                                    <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                                      {student.turma || '5.º A'}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 whitespace-nowrap">
                                    <div className="font-bold text-slate-900">{student.name || 'Estudante'}</div>
                                    <div className="text-[11px] text-slate-400 font-mono">{student.publicId}</div>
                                  </td>
                                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 font-mono text-xs">
                                    {student.email}
                                  </td>

                                  {/* Regular Challenges */}
                                  {breakdown.challenges.map((ch) => (
                                    <td key={ch.id} className="py-2.5 px-3 text-center whitespace-nowrap">
                                      {ch.completed || ch.score > 0 ? (
                                        <span
                                          className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs ${
                                            ch.score >= 90
                                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                              : ch.score >= 50
                                              ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                                          }`}
                                          title={`Pontuação: ${ch.score}/100`}
                                        >
                                          {ch.score} / 100
                                        </span>
                                      ) : (
                                        <span className="text-slate-300 font-bold">—</span>
                                      )}
                                    </td>
                                  ))}

                                  {/* Quiz Final */}
                                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                    {breakdown.quiz.completed || breakdown.quiz.attempts > 0 ? (
                                      <div className="inline-flex flex-col items-center">
                                        <span
                                          className={`px-2.5 py-1 rounded-lg text-xs font-black shadow-2xs ${
                                            breakdown.quiz.officialScore >= 90
                                              ? 'bg-emerald-600 text-white'
                                              : breakdown.quiz.officialScore >= 50
                                              ? 'bg-indigo-600 text-white'
                                              : 'bg-amber-500 text-white'
                                          }`}
                                          title={`1.ª Tentativa (Oficial): ${breakdown.quiz.officialScore} pts | Melhor: ${breakdown.quiz.bestScore} pts`}
                                        >
                                          {breakdown.quiz.officialScore} / 100
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                                          {breakdown.quiz.attempts} {breakdown.quiz.attempts === 1 ? 'tentativa' : 'tentativas'}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-slate-300 font-bold">—</span>
                                    )}
                                  </td>

                                  {/* Total Points */}
                                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                                    <span className="font-black text-indigo-700 text-sm">
                                      {breakdown.totalPoints} XP
                                    </span>
                                    <span className="text-[10px] text-slate-400 block font-semibold">/ 500 XP</span>
                                  </td>

                                  {/* Percentage / Evaluation */}
                                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                    <div className="inline-flex flex-col items-center">
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                          breakdown.percentage >= 90
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : breakdown.percentage >= 70
                                            ? 'bg-blue-100 text-blue-800'
                                            : breakdown.percentage >= 50
                                            ? 'bg-indigo-100 text-indigo-800'
                                            : breakdown.percentage > 0
                                            ? 'bg-amber-100 text-amber-800'
                                            : 'bg-slate-100 text-slate-500'
                                        }`}
                                      >
                                        {breakdown.percentage}%
                                      </span>
                                      <span className="text-[9px] text-slate-400 font-medium mt-0.5">
                                        {getQualitativeLevel(breakdown.percentage).split(' ')[0]}
                                      </span>
                                    </div>
                                  </td>

                                  {/* Action */}
                                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                    <button
                                      onClick={() => setDetailStudent(student)}
                                      className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                      title="Ver pauta completa dos 7 temas deste aluno"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()
              ) : (
                // ALL THEMES OVERVIEW TABLE
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                        🌐
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {language === 'pt'
                          ? 'Pauta Global: Pontuação Consolidada dos 7 Temas'
                          : 'Consolidated Scores across all 7 Themes'}
                      </h4>
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">
                      {language === 'pt' ? 'Total Máximo: 3500 XP' : 'Maximum XP: 3500 XP'}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead className="bg-slate-100/90 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200 sticky top-0 z-10">
                        <tr>
                          <th className="py-3 px-3 w-12 text-center">N.º</th>
                          <th className="py-3 px-3 w-20">Turma</th>
                          <th className="py-3 px-3 min-w-[160px]">Aluno</th>
                          <th className="py-3 px-3 min-w-[190px]">Email Institucional</th>
                          {ALL_THEMES.map((t) => (
                            <th key={t.id} className="py-3 px-2 text-center min-w-[95px]" title={t.title.pt}>
                              <div className="font-bold text-[11px]">Tema {t.number}</div>
                              <div className="text-[9px] text-slate-400 font-normal">/ 500</div>
                            </th>
                          ))}
                          <th className="py-3 px-3 text-right min-w-[120px]">
                            <div className="font-bold">Total Geral</div>
                            <div className="text-[10px] text-slate-500 font-normal">/ 3500 XP</div>
                          </th>
                          <th className="py-3 px-3 text-center min-w-[100px]">Média</th>
                          <th className="py-3 px-3 text-center w-24">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((student, idx) => {
                          const sProgress = progressMap[student.id] || progressMap[student.email] || [];
                          let totalSum = 0;

                          return (
                            <tr key={student.id || student.email} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-2.5 px-3 text-center text-xs font-semibold text-slate-400">
                                {idx + 1}
                              </td>
                              <td className="py-2.5 px-3 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                                  {student.turma || '5.º A'}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 whitespace-nowrap">
                                <div className="font-bold text-slate-900">{student.name || 'Estudante'}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{student.publicId}</div>
                              </td>
                              <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 font-mono text-xs">
                                {student.email}
                              </td>

                              {/* Themes 1 to 7 */}
                              {ALL_THEMES.map((theme) => {
                                const b = getStudentThemeBreakdown(student, sProgress, theme);
                                totalSum += b.totalPoints;
                                return (
                                  <td key={theme.id} className="py-2.5 px-2 text-center whitespace-nowrap">
                                    <span
                                      className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold ${
                                        b.totalPoints >= 450
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : b.totalPoints >= 250
                                          ? 'bg-indigo-50 text-indigo-800'
                                          : b.totalPoints > 0
                                          ? 'bg-amber-50 text-amber-800'
                                          : 'text-slate-300'
                                      }`}
                                    >
                                      {b.totalPoints > 0 ? `${b.totalPoints}` : '—'}
                                    </span>
                                  </td>
                                );
                              })}

                              {/* Total Geral */}
                              <td className="py-2.5 px-3 text-right whitespace-nowrap">
                                <span className="font-black text-indigo-700 text-sm">
                                  {totalSum} XP
                                </span>
                              </td>

                              {/* Average % */}
                              <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                {(() => {
                                  const avgPct = Math.round((totalSum / 3500) * 100);
                                  return (
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                        avgPct >= 90
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : avgPct >= 50
                                          ? 'bg-indigo-100 text-indigo-800'
                                          : avgPct > 0
                                          ? 'bg-amber-100 text-amber-800'
                                          : 'bg-slate-100 text-slate-500'
                                      }`}
                                    >
                                      {avgPct}%
                                    </span>
                                  );
                                })()}
                              </td>

                              {/* Actions */}
                              <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                <button
                                  onClick={() => setDetailStudent(student)}
                                  className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                  title="Ver detalhe individual dos 7 temas"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
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

        {/* TAB: VISIBILIDADE DOS TEMAS (Controlo de Ritmo de Aprendizagem) */}
        {activeTab === 'themes' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Guide & Notice Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-md border border-indigo-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 text-xl shadow-inner">
                  📚
                </div>
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {language === 'pt' ? 'Controlo Pedagógico & Ritmo de Aulas' : 'Pedagogical Pacing Control'}
                    </span>
                    <span className="text-xs text-indigo-300 font-mono">
                      {currentUser?.email}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {language === 'pt'
                      ? 'Ocultar ou Mostrar Temas aos Alunos'
                      : 'Show or Hide Themes for Students'}
                  </h3>
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    {language === 'pt'
                      ? 'Como Administradora/Professora, podes controlar o ritmo de aprendizagem libertando cada tema à medida que avanças nas aulas. Os temas marcados como Ocultos ficam bloqueados aos alunos com a indicação "Em breve nas próximas aulas!".'
                      : 'Control learning pacing by unlocking each theme as you progress in classes. Hidden themes appear locked to students.'}
                  </p>
                </div>
              </div>

              {/* Status Pill */}
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-3 rounded-2xl text-center shrink-0 w-full md:w-auto">
                <div className="text-2xl font-black text-amber-300">
                  {visibleThemesCount} <span className="text-xs text-white/70 font-normal">/ {ALL_THEMES.length} visíveis</span>
                </div>
                <div className="text-[11px] text-indigo-200 font-semibold mt-0.5">
                  {visibleThemesCount === ALL_THEMES.length
                    ? (language === 'pt' ? 'Todos Desbloqueados' : 'All Unlocked')
                    : (language === 'pt' ? `${ALL_THEMES.length - visibleThemesCount} tema(s) em espera` : `${ALL_THEMES.length - visibleThemesCount} locked`)}
                </div>
              </div>
            </div>

            {/* Quick Action Presets */}
            <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{language === 'pt' ? 'Ações Rápidas de Configuração' : 'Quick Presets'}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSetAllThemes(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{language === 'pt' ? '🌟 Desbloquear Todos (7 Temas)' : 'Unlock All (7 Themes)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSetThemesUpTo(1)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'pt' ? '🔒 Apenas Tema 1 (Início de Ano)' : 'Only Theme 1 (Start of Year)'}</span>
                </button>

                <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1" />

                <span className="text-xs text-slate-500 font-medium">
                  {language === 'pt' ? 'Desbloquear até ao:' : 'Unlock up to:'}
                </span>

                {[2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleSetThemesUpTo(num)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-900 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Tema {num}
                  </button>
                ))}
              </div>
            </div>

            {/* 7 Themes List with Interactive Toggles */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'pt' ? 'Lista de Temas Curriculares (7 Temas)' : 'Curriculum Themes (7 Themes)'}</span>
                </h4>
                <span className="text-xs text-slate-500">
                  {language === 'pt' ? 'Clique no interruptor para alterar a visibilidade em tempo real' : 'Click toggle to change in real-time'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {ALL_THEMES.map((theme) => {
                  const isVisible = themeVisibility[theme.id] !== false;
                  const isToggling = togglingThemeId === theme.id;
                  const totalActivities = theme.modules.length + theme.challenges.length;

                  return (
                    <div
                      key={theme.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                        isVisible
                          ? 'bg-white border-emerald-300 shadow-xs hover:border-emerald-400'
                          : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 opacity-90'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Theme Info */}
                        <div className="flex items-start gap-3.5 max-w-xl">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 ${
                            isVisible
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                              : 'bg-slate-200 border border-slate-300 text-slate-500'
                          }`}>
                            {theme.icon}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                                isVisible
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : 'bg-slate-200 text-slate-700 border-slate-300'
                              }`}>
                                Tema {theme.number}
                              </span>

                              {isVisible ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <Eye className="w-3 h-3 text-emerald-600" />
                                  <span>{language === 'pt' ? 'Visível para Alunos' : 'Visible to Students'}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                  <Lock className="w-3 h-3 text-amber-600" />
                                  <span>{language === 'pt' ? 'Oculto / Bloqueado' : 'Hidden / Locked'}</span>
                                </span>
                              )}
                            </div>

                            <h5 className={`text-base font-bold leading-tight ${
                              isVisible ? 'text-slate-900' : 'text-slate-700'
                            }`}>
                              {theme.title[language]}
                            </h5>

                            <p className="text-xs text-slate-500 line-clamp-1">
                              {theme.tagline[language]}
                            </p>

                            <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                              <span>📖 {theme.lessons?.length || 0} lições</span>
                              <span>•</span>
                              <span>🎮 {theme.challenges.length} jogos & desafios</span>
                              <span>•</span>
                              <span>🎯 Quiz final ({theme.finalQuiz?.length || 15} perguntas)</span>
                            </div>
                          </div>
                        </div>

                        {/* Toggle Action Control */}
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200 shrink-0">
                          <div className="text-right hidden sm:block">
                            <div className={`text-xs font-bold ${isVisible ? 'text-emerald-700' : 'text-slate-500'}`}>
                              {isVisible
                                ? (language === 'pt' ? 'Tema Ativo' : 'Active Theme')
                                : (language === 'pt' ? 'Tema Bloqueado' : 'Locked Theme')}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {isVisible
                                ? (language === 'pt' ? 'Alunos acedem livremente' : 'Students have access')
                                : (language === 'pt' ? 'Alunos veem "Em breve"' : 'Shows "Coming soon"')}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleTheme(theme.id, isVisible)}
                            disabled={isToggling}
                            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 ${
                              isVisible
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-slate-800 hover:bg-slate-900 text-white'
                            }`}
                          >
                            {isToggling ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : isVisible ? (
                              <>
                                <Eye className="w-4 h-4" />
                                <span>{language === 'pt' ? 'Visível (Desbloqueado)' : 'Visible'}</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 text-amber-400" />
                                <span>{language === 'pt' ? 'Ocultar aos Alunos' : 'Hidden'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LIMPEZA & REDEFINIÇÃO GLOBAL (ZONA DE PERIGO) */}
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

        {/* MODAL: FICHA DETALHADA DO ALUNO (7 TEMAS, DESAFIOS E QUIZZES) */}
        {detailStudent && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="p-4 sm:p-6 bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between border-b border-indigo-700 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-400 font-black text-lg shadow-inner">
                    {detailStudent.name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                        {detailStudent.turma || '5.º A'}
                      </span>
                      <span className="text-xs text-indigo-300 font-mono">
                        {detailStudent.publicId}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                      {detailStudent.name || 'Estudante'}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono">
                      {detailStudent.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDetailStudent(null)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Student Themes Breakdown Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
                {ALL_THEMES.map((theme) => {
                  const sProgress = progressMap[detailStudent.id] || progressMap[detailStudent.email] || [];
                  const breakdown = getStudentThemeBreakdown(detailStudent, sProgress, theme);

                  return (
                    <div
                      key={theme.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                            {theme.number}
                          </span>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">
                              {theme.title.pt}
                            </h4>
                            <span className="text-[11px] text-slate-400">
                              {breakdown.completedActivitiesCount} de {breakdown.totalActivitiesCount} atividades concluídas
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-xs">
                            {breakdown.totalPoints} / 500 XP
                          </span>
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
                            {breakdown.percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Challenges Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {breakdown.challenges.map((ch, chIdx) => (
                          <div
                            key={ch.id}
                            className={`p-3 rounded-xl border text-xs flex flex-col justify-between gap-1.5 ${
                              ch.completed
                                ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Desafio {chIdx + 1}
                              </div>
                              <div className="font-semibold text-slate-800 line-clamp-2 mt-0.5">
                                {ch.title}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 font-bold">
                              <span>Pontos:</span>
                              <span className={ch.score > 0 ? 'text-emerald-700' : 'text-slate-400'}>
                                {ch.score} / 100
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quiz Card */}
                      <div className="p-3 bg-linear-to-r from-emerald-50 to-indigo-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div>
                            <div className="font-bold text-slate-800">
                              {breakdown.quiz.title}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Nota Oficial (1.ª Tentativa): <strong className="text-emerald-700 font-bold">{breakdown.quiz.officialScore} pts</strong>
                              {breakdown.quiz.attempts > 1 && (
                                <span className="ml-2 text-indigo-700">
                                  (Melhor nota em {breakdown.quiz.attempts} tentativas: {breakdown.quiz.bestScore} pts)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 font-bold">
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-xs">
                            {breakdown.quiz.officialScore} / 100
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
                <button
                  onClick={() => {
                    exportThemeScoresToExcel([detailStudent], progressMap, 'all', detailStudent.turma);
                    showToast('success', 'Caderno individual exportado com sucesso em XLS!');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exportar Pauta deste Aluno em XLS</span>
                </button>
                <button
                  onClick={() => setDetailStudent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'pt' ? 'Fechar' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
