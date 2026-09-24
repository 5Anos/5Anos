import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  ChevronDown,
  Printer,
  Sliders,
  Scissors,
  HelpCircle,
} from 'lucide-react';
import { User, Language, ThemeVisibilityMap, QuizVisibilityMap, ActivityProgress } from '../types';
import { api, isUserAdmin, DEFAULT_THEME_VISIBILITY, DEFAULT_QUIZ_VISIBILITY } from '../services/api';
import { getTurmasList } from '../data/turmasData';
import {
  exportStudentsToExcel,
  exportStudentsToCSV,
  exportThemeScoresToExcel,
  exportThemeScoresToCSV,
  exportDailyTipsScoresToExcel,
  getStudentThemeBreakdown,
  getQualitativeLevel,
  getGlobalActivityStats,
  exportStudentCredentialsToExcel,
} from '../utils/exportUtils';
import { ALL_THEMES, THEMES_BY_ID } from '../data/allThemesData';
import { CartoonAvatar } from './avatar/CartoonAvatar';
import { getDefaultAvatar } from '../utils/avatarUtils';
import { StudentCredentialsTab } from './admin/StudentCredentialsTab';
import { StudentImportTab } from './admin/StudentImportTab';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  language: Language;
  initialTab?: 'students' | 'credentials' | 'import' | 'scores' | 'turmas' | 'themes' | 'danger' | 'settings';
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
  // Navigation: 4 main tabs
  const [activeTab, setActiveTab] = useState<'students' | 'import' | 'credentials' | 'settings'>('students');

  // Sub-modes for Alunos & Pautas
  const [assessmentMode, setAssessmentMode] = useState<'global' | 'theme'>('global');

  // Sub-sections for Configurações & Turmas
  const [settingsSection, setSettingsSection] = useState<'themes' | 'quizzes' | 'turmas' | 'danger'>('themes');

  // Students & Turmas
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  // Export dropdown state
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  // Scores by Theme & Activity Progress State
  const [selectedThemeForScores, setSelectedThemeForScores] = useState<string>('tic-sociedade');
  const [progressMap, setProgressMap] = useState<Record<string, ActivityProgress[]>>({});
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [detailStudent, setDetailStudent] = useState<User | null>(null);

  // Theme Visibility State
  const [themeVisibility, setThemeVisibility] = useState<ThemeVisibilityMap>(DEFAULT_THEME_VISIBILITY);
  const [togglingThemeId, setTogglingThemeId] = useState<string | null>(null);

  // Quiz Visibility State
  const [quizVisibility, setQuizVisibility] = useState<QuizVisibilityMap>(DEFAULT_QUIZ_VISIBILITY);
  const [togglingQuizId, setTogglingQuizId] = useState<string | null>(null);

  // Turmas list state
  const [turmasList, setTurmasList] = useState<string[]>([]);
  const [newTurmaName, setNewTurmaName] = useState('');
  const [creatingTurma, setCreatingTurma] = useState(false);

  // Multi-selection of students
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());

  // Student Edit State
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editTurma, setEditTurma] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Confirmation Modal State
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isRecalibratingXP, setIsRecalibratingXP] = useState(false);

  // Route initialTab to the correct tab and sub-section
  useEffect(() => {
    if (isOpen) {
      if (initialTab === 'credentials') {
        setActiveTab('credentials');
      } else if (initialTab === 'import') {
        setActiveTab('import');
      } else if (initialTab === 'scores') {
        setActiveTab('students');
        setAssessmentMode('theme');
      } else if (initialTab === 'turmas') {
        setActiveTab('settings');
        setSettingsSection('turmas');
      } else if (initialTab === 'themes') {
        setActiveTab('settings');
        setSettingsSection('themes');
      } else if (initialTab === 'danger') {
        setActiveTab('settings');
        setSettingsSection('danger');
      } else if (initialTab === 'settings') {
        setActiveTab('settings');
      } else {
        setActiveTab('students');
        setAssessmentMode('global');
      }

      setTurmasList(getTurmasList());
      loadStudents();
      loadThemeVisibility();
      setSelectedStudentIds(new Set());
      setFeedbackMsg(null);
    }
  }, [isOpen, initialTab]);

  // Click outside listener for export dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setExportDropdownOpen(false);
      }
    };
    if (exportDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [exportDropdownOpen]);

  // Keyboard shortcut to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !editingStudent && !confirmDialog && !detailStudent) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, editingStudent, confirmDialog, detailStudent]);

  const showToast = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => {
      setFeedbackMsg((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const studentsList = await api.getAllStudentsForAdmin();
      setStudents(studentsList || []);
      const registeredTurmas = Array.from(
        new Set(
          (studentsList || [])
            .map((s: User) => (s.turma || '').trim())
            .filter(Boolean)
        )
      ) as string[];

      const staticList = getTurmasList();
      const merged = Array.from(new Set([...staticList, ...registeredTurmas])).sort();
      setTurmasList(merged);
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao carregar lista de alunos.');
    } finally {
      setLoading(false);
    }
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

  const loadThemeVisibility = async () => {
    try {
      const map = await api.getThemeVisibility();
      setThemeVisibility(map);
      const qMap = await api.getQuizVisibility();
      setQuizVisibility(qMap);
    } catch (err) {
      console.error('Error fetching visibility:', err);
    }
  };

  // Toggle Quiz Visibility
  const handleToggleQuiz = async (themeId: string, currentVal: boolean) => {
    setTogglingQuizId(themeId);
    const nextVal = !currentVal;
    const nextMap: QuizVisibilityMap = { ...quizVisibility, [themeId]: nextVal };
    setQuizVisibility(nextMap);

    const themeObj = ALL_THEMES.find((t) => t.id === themeId);
    const themeName = themeObj ? `Tema ${themeObj.number}: ${themeObj.title.pt}` : themeId;

    try {
      await api.saveQuizVisibility(nextMap);
      showToast(
        'success',
        nextVal
          ? (language === 'pt' ? `🏆 Quiz do ${themeName} agora VISÍVEL para os alunos!` : `🏆 Quiz of ${themeName} is visible!`)
          : (language === 'pt' ? `🔒 Quiz do ${themeName} agora OCULTO aos alunos.` : `🔒 Quiz of ${themeName} hidden.`)
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao atualizar quiz.');
      setQuizVisibility(quizVisibility);
    } finally {
      setTogglingQuizId(null);
    }
  };

  const handleSetAllQuizzes = async (visible: boolean) => {
    const nextMap: QuizVisibilityMap = {};
    ALL_THEMES.forEach((t) => {
      nextMap[t.id] = visible;
    });
    setQuizVisibility(nextMap);

    try {
      await api.saveQuizVisibility(nextMap);
      showToast(
        'success',
        visible
          ? '🌟 Quizzes de Aprendizagem de TODOS os temas tornados VISÍVEIS!'
          : '🔒 Quizzes de todos os temas OCULTADOS aos alunos.'
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao atualizar visibilidade dos quizzes.');
    }
  };

  // Toggle Theme Visibility
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
          ? `✅ ${themeName} agora VISÍVEL e desbloqueado para os alunos!`
          : `🔒 ${themeName} agora BLOQUEADO / OCULTO aos alunos.`
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao atualizar visibilidade do tema.');
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
          ? '🌟 Todos os 7 temas foram DESBLOQUEADOS para os alunos!'
          : '🔒 Todos os temas foram OCULTADOS aos alunos.'
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
        `🎯 Temas do 1 ao ${themeNumber} agora DESBLOQUEADOS (Temas ${themeNumber + 1 > 7 ? 'Nenhum' : `${themeNumber + 1} a 7`} bloqueados).`
      );
    } catch (err: any) {
      showToast('error', err?.message || 'Erro ao atualizar temas.');
    }
  };

  const visibleThemesCount = useMemo(() => {
    return ALL_THEMES.filter((t) => themeVisibility[t.id] !== false).length;
  }, [themeVisibility]);

  // Edit single student modal
  const openEditModal = (student: User) => {
    setEditingStudent(student);
    setEditName(student.fullName || student.name || '');
    setEditTurma(student.turma || turmasList[0] || '5.º A');
    setEditError('');
    setEditSuccess('');
  };

  const closeEditModal = () => {
    setEditingStudent(null);
    setEditError('');
    setEditSuccess('');
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setEditError('');
    setEditSuccess('');

    setEditLoading(true);
    try {
      const currentFullName = (editingStudent.fullName || editingStudent.name || '').trim();
      await api.adminUpdateStudent(editingStudent.id, editingStudent.email, {
        newName: editName.trim() !== currentFullName ? editName.trim() : undefined,
        newTurma: editTurma !== editingStudent.turma ? editTurma : undefined,
      });

      setEditSuccess(language === 'pt' ? 'Dados do aluno atualizados com sucesso!' : 'Student updated successfully!');
      await loadStudents();
      setTimeout(() => {
        closeEditModal();
      }, 900);
    } catch (err: any) {
      setEditError(err?.message || 'Erro ao atualizar dados do aluno.');
    } finally {
      setEditLoading(false);
    }
  };

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesTurma = selectedTurma === 'all' || (s.turma || '').trim() === selectedTurma.trim();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (s.name || '').toLowerCase().includes(query) ||
        (s.fullName || '').toLowerCase().includes(query) ||
        (s.email || '').toLowerCase().includes(query) ||
        (s.username || '').toLowerCase().includes(query) ||
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
      title: language === 'pt' ? 'Eliminar Conta do Aluno' : 'Delete Student Account',
      description: language === 'pt'
        ? `Tens a certeza de que pretendes eliminar a conta de ${student.fullName || student.name} (${student.turma || 'Sem turma'})?`
        : `Are you sure you want to delete ${student.name}?`,
      warningText: language === 'pt'
        ? 'Todas as pontuações XP, atividades e pautas deste aluno serão permanentemente removidas.'
        : 'All XP scores and activity progress for this student will be wiped.',
      confirmLabel: language === 'pt' ? 'Eliminar Aluno' : 'Delete Student',
      isDanger: true,
      action: async () => {
        const res = await api.adminDeleteStudent(student.id, student.email);
        setSelectedStudentIds((prev) => {
          const next = new Set(prev);
          next.delete(student.id);
          next.delete(student.email);
          return next;
        });
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

  // Action: Delete Selected Students
  const promptDeleteSelectedStudents = () => {
    const count = selectedStudentIds.size;
    if (count === 0) return;

    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? `Eliminar ${count} Alunos Selecionados` : `Delete ${count} Selected Students`,
      description: language === 'pt'
        ? `Pretendes eliminar permanentemente as ${count} contas de alunos selecionadas?`
        : `Permanently delete the ${count} selected student accounts?`,
      warningText: language === 'pt'
        ? 'Esta ação é irreversível. As contas, credenciais e histórico de quizzes dos alunos selecionados serão apagados.'
        : 'This action cannot be undone.',
      confirmLabel: language === 'pt' ? `Eliminar (${count}) Alunos` : `Delete (${count}) Students`,
      isDanger: true,
      action: async () => {
        const studentsToDelete = students.filter((s) => selectedStudentIds.has(s.id || s.email));
        const res = await api.adminDeleteStudents(
          studentsToDelete.map((s) => s.id || s.email)
        );
        setSelectedStudentIds(new Set());
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

  // Action: Delete Students of a Turma
  const promptDeleteStudentsByTurma = (turma: string) => {
    const inTurmaCount = students.filter((s) => (s.turma || '').trim() === turma.trim()).length;
    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? `Limpar Alunos da Turma ${turma}` : `Purge Students of ${turma}`,
      description: language === 'pt'
        ? `Esta ação irá eliminar todos os ${inTurmaCount} alunos inscritos na turma ${turma}. A turma em si continuará registada.`
        : `Delete all ${inTurmaCount} students in class ${turma}.`,
      warningText: language === 'pt'
        ? `Apenas os alunos da turma ${turma} serão eliminados. As restantes turmas não serão afetadas.`
        : 'Only students of this class will be affected.',
      confirmLabel: language === 'pt' ? `Limpar Alunos (${inTurmaCount})` : 'Clear Students',
      isDanger: true,
      action: async () => {
        const res = await api.adminDeleteStudentsByTurmas([turma]);
        setSelectedStudentIds(new Set());
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

  // Action: Delete Turma
  const promptDeleteTurma = (turma: string) => {
    const inTurmaCount = students.filter((s) => (s.turma || '').trim() === turma.trim()).length;
    setConfirmDialog({
      isOpen: true,
      title: language === 'pt' ? `Eliminar Turma ${turma}` : `Delete Class ${turma}`,
      description: language === 'pt'
        ? `Pretendes eliminar a turma "${turma}" e remover o respetivo registo?${
            inTurmaCount > 0 ? ` Atenção: Existem ${inTurmaCount} aluno(s) nesta turma que também serão removidos.` : ''
          }`
        : `Delete class ${turma}?`,
      warningText: inTurmaCount > 0
        ? language === 'pt'
          ? `⚠️ Serão também eliminados os ${inTurmaCount} alunos desta turma.`
          : `⚠️ All ${inTurmaCount} students of this class will be deleted.`
        : undefined,
      confirmLabel: language === 'pt' ? 'Eliminar Turma' : 'Delete Class',
      isDanger: true,
      action: async () => {
        const res = await api.adminDeleteTurmas([turma], true);
        setTurmasList(res.turmas);
        if (selectedTurma === turma) {
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
      title: language === 'pt' ? '🚨 Eliminar TODOS os Alunos e Limpar BD' : '🚨 Delete ALL Students & Purge DB',
      description: language === 'pt'
        ? `Esta ação irá eliminar permanentemente todas as contas de alunos (${totalCount} registados) e limpar registos residuais na base de dados para um novo ano letivo.`
        : `This action will permanently delete all student accounts (${totalCount} registered).`,
      warningText: language === 'pt'
        ? '⚠️ ATENÇÃO: Todas as contas de alunos, pontuações XP, atividades e histórico de quizzes serão 100% eliminados. A conta de professora (imaginebycarla2023@gmail.com) e as turmas serão 100% PRESERVADAS.'
        : '⚠️ WARNING: All student accounts and XP scores will be completely wiped. Teacher account and classes are preserved.',
      confirmLabel: language === 'pt' ? 'CONFIRMAR LIMPEZA TOTAL DA BD' : 'CONFIRM PURGE',
      isDanger: true,
      action: async () => {
        const res = await api.adminDeleteAllStudents();
        setSelectedStudentIds(new Set());
        await loadStudents();
        showToast('success', res.message);
      },
    });
  };

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
  if (!isAdmin) return null;

  // Export handlers
  const handleExportXLS = () => {
    if (filteredStudents.length === 0) return;
    exportStudentsToExcel(filteredStudents, selectedTurma);
    showToast('success', 'Pauta Geral Excel (.xlsx) transferida com sucesso!');
    setExportDropdownOpen(false);
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
    showToast('success', 'Pauta de desafios e quizzes exportada com sucesso em XLS!');
    setExportDropdownOpen(false);
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
    showToast('success', 'Caderno Completo de Avaliação (7 Temas com Resumo Geral) exportado em XLS!');
    setExportDropdownOpen(false);
  };

  const handleExportDailyTipsXLS = async () => {
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
    exportDailyTipsScoresToExcel(filteredStudents, currentMap, selectedTurma);
    showToast('success', 'Pauta de Dicas Diárias TIC e Bónus exportada em XLS!');
    setExportDropdownOpen(false);
  };

  const handleExportCredentialsXLS = () => {
    if (filteredStudents.length === 0) return;
    exportStudentCredentialsToExcel(filteredStudents, selectedTurma);
    showToast('success', 'Folha de credenciais dos alunos exportada em XLS!');
    setExportDropdownOpen(false);
  };

  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;
    exportStudentsToCSV(filteredStudents, selectedTurma);
    showToast('success', 'Ficheiro CSV transferido com sucesso!');
    setExportDropdownOpen(false);
  };

  const handleRecalibrateXP = async () => {
    try {
      setIsRecalibratingXP(true);
      const res = await api.recalibratePoints();
      showToast('success', res.message || 'Pontuações dos alunos sincronizadas.');
      await loadStudents();
    } catch (err: any) {
      showToast('error', err.message || 'Erro ao sincronizar pontuações.');
    } finally {
      setIsRecalibratingXP(false);
      setExportDropdownOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        id="admin-panel-modal-card"
        className="relative w-full max-w-6xl h-[92vh] max-h-[95vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-linear-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-inner text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Área Reservada da Professora Carla Oliveira
                </span>
                <span className="text-xs text-indigo-300 font-mono hidden sm:inline">
                  {currentUser?.email}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-0.5">
                {language === 'pt' ? 'Gestão de Turmas & Pautas de Avaliação TIC' : 'Class Assessment & Management'}
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

        {/* 4 PRIMARY NAVIGATION TABS */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 py-2">
            {/* Tab 1: Alunos & Pautas */}
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
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

            {/* Tab 2: Importar Alunos */}
            <button
              onClick={() => setActiveTab('import')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'import'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
              <span>{language === 'pt' ? 'Importar Alunos (XLS)' : 'Import (XLS)'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-black">
                +
              </span>
            </button>

            {/* Tab 3: Cartões & Credenciais */}
            <button
              onClick={() => setActiveTab('credentials')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'credentials'
                  ? 'bg-white text-amber-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>{language === 'pt' ? 'Cartões & Impressão' : 'Cards & Print'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-black">
                A4
              </span>
            </button>

            {/* Tab 4: Configurações & Turmas */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>{language === 'pt' ? 'Configurações & Turmas' : 'Settings & Classes'}</span>
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
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-50">
            {/* Control Bar: Class Filter, Search, Mode Switch, Unified Export */}
            <div className="p-4 bg-white border-b border-slate-200 space-y-3 shrink-0 shadow-2xs">
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
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            selectedTurma === turma ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {countInTurma}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right controls: View Mode toggle & Unified Export Menu */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Mode switcher */}
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 shrink-0">
                    <button
                      onClick={() => setAssessmentMode('global')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        assessmentMode === 'global'
                          ? 'bg-white text-indigo-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      📊 Pauta Geral
                    </button>
                    <button
                      onClick={() => {
                        setAssessmentMode('theme');
                        if (Object.keys(progressMap).length === 0 && students.length > 0) {
                          loadProgressForStudents(students);
                        }
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        assessmentMode === 'theme'
                          ? 'bg-white text-emerald-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🏆 Desafios & Quizzes
                    </button>
                  </div>

                  {/* UNIFIED EXPORT DROPDOWN MENU */}
                  <div className="relative" ref={exportDropdownRef}>
                    <button
                      onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>{language === 'pt' ? 'Exportar Pauta' : 'Export'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exportDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {exportDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                          Exportações em Excel & Pautas
                        </div>

                        <button
                          onClick={handleExportXLS}
                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 cursor-pointer"
                        >
                          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                          <div>
                            <div className="font-bold">Pauta Geral de Alunos (.xlsx)</div>
                            <div className="text-[10px] text-slate-400">XP, nível qualitativo e turmas</div>
                          </div>
                        </button>

                        <button
                          onClick={handleExportFull7ThemesXLS}
                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Award className="w-4 h-4 text-indigo-600" />
                          <div>
                            <div className="font-bold">Caderno Completo dos 7 Temas (.xlsx)</div>
                            <div className="text-[10px] text-slate-400">Todos os desafios, quizzes e pauta final</div>
                          </div>
                        </button>

                        <button
                          onClick={handleExportDailyTipsXLS}
                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <div>
                            <div className="font-bold">Pauta de Dicas Diárias TIC (.xlsx)</div>
                            <div className="text-[10px] text-slate-400">Participação diária e bónus XP</div>
                          </div>
                        </button>

                        <button
                          onClick={handleExportCredentialsXLS}
                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 cursor-pointer"
                        >
                          <KeyRound className="w-4 h-4 text-amber-600" />
                          <div>
                            <div className="font-bold">Folha de Credenciais (.xlsx)</div>
                            <div className="text-[10px] text-slate-400">Utilizadores e palavras-passe para o professor</div>
                          </div>
                        </button>

                        <div className="my-1 border-t border-slate-100" />

                        <button
                          onClick={handleExportCSV}
                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="font-bold">Exportar CSV</div>
                            <div className="text-[10px] text-slate-400">Formato universal delimitado</div>
                          </div>
                        </button>

                        <button
                          onClick={handleRecalibrateXP}
                          disabled={isRecalibratingXP || students.length === 0}
                          className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
                        >
                          <RefreshCw className={`w-4 h-4 text-slate-400 ${isRecalibratingXP ? 'animate-spin text-indigo-600' : ''}`} />
                          <div>
                            <div className="font-bold">Sincronizar Pontuações XP</div>
                            <div className="text-[10px] text-slate-400">Recalibra XP com atividades reais</div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 2: Search and selection info */}
              <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'pt' ? 'Pesquisar por nome, turma ou utilizador...' : 'Search student...'}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {/* Batch Delete button if selected */}
                  {selectedStudentIds.size > 0 && (
                    <button
                      onClick={promptDeleteSelectedStudents}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer animate-in fade-in"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'pt' ? `Eliminar Selecionados (${selectedStudentIds.size})` : `Delete (${selectedStudentIds.size})`}</span>
                    </button>
                  )}

                  {/* Summary Metric Badges */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>
                      Total: <strong className="text-slate-900 font-bold">{stats.total}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Média: <strong className="text-indigo-700 font-bold">{stats.avgPoints} XP</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VIEW MODE A: PAUTA GERAL (XP, NÍVEIS, CREDENCIAIS) */}
            {assessmentMode === 'global' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {language === 'pt' ? 'Nenhum aluno registado nesta turma' : 'No students found'}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      {language === 'pt'
                        ? 'Carrega o teu ficheiro Excel (.xls / .xlsx) na aba "Importar Alunos" para criar os utilizadores.'
                        : 'Import students via Excel (.xls / .xlsx) in the Import tab.'}
                    </p>
                    <button
                      onClick={() => setActiveTab('import')}
                      className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Importar Alunos por Excel
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black border-b border-slate-200 sticky top-0 z-10">
                          <tr>
                            <th className="py-3 px-3 w-10 text-center">
                              <button
                                onClick={toggleSelectAllFiltered}
                                className="cursor-pointer text-slate-500 hover:text-indigo-600"
                                title="Selecionar todos"
                              >
                                {allFilteredSelected ? (
                                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                                ) : (
                                  <Square className="w-4 h-4" />
                                )}
                              </button>
                            </th>
                            <th className="py-3 px-2 w-12 text-center">N.º</th>
                            <th className="py-3 px-4">Nome Completo do Aluno</th>
                            <th className="py-3 px-3 w-24">Turma</th>
                            <th className="py-3 px-3 w-32">Utilizador</th>
                            <th className="py-3 px-3 w-36">Palavra-passe</th>
                            <th className="py-3 px-3 w-24 text-right">XP</th>
                            <th className="py-3 px-3 w-28 text-center">Nível</th>
                            <th className="py-3 px-3 w-36 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredStudents.map((student, idx) => {
                            const isSelected = selectedStudentIds.has(student.id || student.email);
                            const isPasswordVisible = !!visiblePasswords[student.id];

                            return (
                              <tr
                                key={student.id || idx}
                                className={`hover:bg-slate-50/80 transition-colors ${
                                  isSelected ? 'bg-indigo-50/40' : ''
                                }`}
                              >
                                <td className="py-2.5 px-3 text-center">
                                  <button
                                    onClick={() => toggleSelectStudent(student.id || student.email)}
                                    className="cursor-pointer text-slate-400 hover:text-indigo-600"
                                  >
                                    {isSelected ? (
                                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                                    ) : (
                                      <Square className="w-4 h-4" />
                                    )}
                                  </button>
                                </td>
                                <td className="py-2.5 px-2 text-center font-bold text-slate-400">
                                  {idx + 1}
                                </td>
                                <td className="py-2.5 px-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-slate-200 shrink-0 bg-slate-100">
                                      <CartoonAvatar
                                        config={student.avatar || getDefaultAvatar(student.publicId || student.name)}
                                        size={32}
                                      />
                                    </div>
                                    <div>
                                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                                        {student.fullName || student.name}
                                      </div>
                                      <div className="text-[10px] text-slate-400 font-mono">
                                        {student.publicId || student.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-black text-[11px] border border-indigo-100">
                                    {student.turma || '5.º A'}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 font-mono text-slate-600 text-xs">
                                  {student.username || student.email?.split('@')[0] || '—'}
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                      {isPasswordVisible
                                        ? student.initialPassword || '******'
                                        : '••••••••'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setVisiblePasswords((prev) => ({
                                          ...prev,
                                          [student.id]: !prev[student.id],
                                        }))
                                      }
                                      className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                                      title={isPasswordVisible ? 'Ocultar' : 'Mostrar'}
                                    >
                                      {isPasswordVisible ? (
                                        <EyeOff className="w-3.5 h-3.5" />
                                      ) : (
                                        <Eye className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-right font-black text-indigo-700 text-xs">
                                  {student.points || 0} XP
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    {getQualitativeLevel(Math.min(100, Math.round(((student.points || 0) / 1000) * 100)))}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {/* View Activity Breakdown */}
                                    <button
                                      onClick={() => {
                                        setDetailStudent(student);
                                        if (!progressMap[student.id]) {
                                          loadProgressForStudents([student]);
                                        }
                                      }}
                                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                      title="Ver pauta de desafios e quizzes do aluno"
                                    >
                                      <FileSpreadsheet className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Reset Password */}
                                    <button
                                      onClick={async () => {
                                        if (!window.confirm(`Pretendes redefinir a palavra-passe de ${student.name}?`)) return;
                                        try {
                                          const res = await api.resetStudentPassword(student.id);
                                          showToast('success', `Nova palavra-passe de ${student.name}: ${res.newPassword}`);
                                          setVisiblePasswords((prev) => ({ ...prev, [student.id]: true }));
                                          await loadStudents();
                                        } catch (err: any) {
                                          showToast('error', err.message || 'Erro ao redefinir.');
                                        }
                                      }}
                                      className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 border border-amber-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                      title="Redefinir palavra-passe"
                                    >
                                      <KeyRound className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Edit Student */}
                                    <button
                                      onClick={() => openEditModal(student)}
                                      className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                      title="Editar aluno"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Delete Student */}
                                    <button
                                      onClick={() => promptDeleteSingleStudent(student)}
                                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 border border-rose-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                      title="Eliminar aluno"
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
                  </div>
                )}
              </div>
            )}

            {/* VIEW MODE B: PAUTA POR TEMA (DESAFIOS & QUIZZES) */}
            {assessmentMode === 'theme' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Theme Selector Pills */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-1.5 overflow-x-auto shadow-2xs">
                  {ALL_THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedThemeForScores(t.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedThemeForScores === t.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                        {t.number}
                      </span>
                      <span>{t.title.pt}</span>
                    </button>
                  ))}
                </div>

                {/* Theme Table */}
                {(() => {
                  const currentTheme = ALL_THEMES.find((t) => t.id === selectedThemeForScores) || ALL_THEMES[0];

                  return (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                      <div className="p-4 bg-linear-to-r from-emerald-50 to-indigo-50 border-b border-slate-200 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-600" />
                            <span>Tema {currentTheme.number}: {currentTheme.title.pt}</span>
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Pauta de desafios e quizzes oficiais com 1.ª tentativa e melhor resultado.
                          </p>
                        </div>

                        <button
                          onClick={handleExportThemeXLS}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Exportar XLS deste Tema</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-700">
                          <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black border-b border-slate-200 sticky top-0">
                            <tr>
                              <th className="py-2.5 px-3 w-12 text-center">N.º</th>
                              <th className="py-2.5 px-4">Nome do Aluno</th>
                              <th className="py-2.5 px-3 w-24">Turma</th>
                              <th className="py-2.5 px-3 text-center">Desafio 1</th>
                              <th className="py-2.5 px-3 text-center">Desafio 2</th>
                              <th className="py-2.5 px-3 text-center">Desafio 3</th>
                              <th className="py-2.5 px-3 text-center">Desafio 4</th>
                              <th className="py-2.5 px-3 text-center">Quiz (Oficial)</th>
                              <th className="py-2.5 px-3 text-center">Nível</th>
                              <th className="py-2.5 px-3 text-right">XP Tema</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student, idx) => {
                              const sProgress = progressMap[student.id] || progressMap[student.email] || [];
                              const breakdown = getStudentThemeBreakdown(student, sProgress, currentTheme);

                              return (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="py-2 px-3 text-center font-bold text-slate-400">
                                    {idx + 1}
                                  </td>
                                  <td className="py-2 px-4 font-bold text-slate-900">
                                    {student.fullName || student.name}
                                  </td>
                                  <td className="py-2 px-3">
                                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                                      {student.turma}
                                    </span>
                                  </td>
                                  {breakdown.challenges.map((ch, chIdx) => (
                                    <td key={chIdx} className="py-2 px-3 text-center">
                                      <span
                                        className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                                          ch.completed ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400'
                                        }`}
                                      >
                                        {ch.score}
                                      </span>
                                    </td>
                                  ))}
                                  {/* Pad if fewer than 4 challenges */}
                                  {Array.from({ length: Math.max(0, 4 - breakdown.challenges.length) }).map((_, padIdx) => (
                                    <td key={`pad-${padIdx}`} className="py-2 px-3 text-center text-slate-300">
                                      —
                                    </td>
                                  ))}
                                  <td className="py-2 px-3 text-center">
                                    <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold">
                                      {breakdown.quiz.officialScore}%
                                    </span>
                                  </td>
                                  <td className="py-2 px-3 text-center font-bold">
                                    <span className="text-emerald-700">
                                      {getQualitativeLevel(breakdown.quiz.officialScore)}
                                    </span>
                                  </td>
                                  <td className="py-2 px-3 text-right font-black text-emerald-700">
                                    {breakdown.totalPoints} XP
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: IMPORTAR ALUNOS (XLS / XLSX / PDF / ZIP / PASTE) */}
        {activeTab === 'import' && (
          <StudentImportTab
            turmasList={turmasList}
            existingStudents={students}
            language={language}
            onImportSuccess={loadStudents}
            onNavigateToCredentials={() => setActiveTab('credentials')}
            onNavigateToStudents={() => {
              setActiveTab('students');
              setAssessmentMode('global');
            }}
          />
        )}

        {/* TAB 3: CARTÕES & CREDENCIAIS (A4 PRINT READY) */}
        {activeTab === 'credentials' && (
          <StudentCredentialsTab
            students={students}
            turmasList={turmasList}
            language={language}
            onStudentUpdated={loadStudents}
          />
        )}

        {/* TAB 4: CONFIGURAÇÕES & TURMAS (CENTRALIZADAS) */}
        {activeTab === 'settings' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50 overflow-hidden">
            {/* Sub-navigation bar */}
            <div className="p-3 sm:p-4 bg-white border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0 shadow-2xs">
              <button
                onClick={() => setSettingsSection('themes')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  settingsSection === 'themes'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{language === 'pt' ? 'Visibilidade dos Temas' : 'Theme Visibility'}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-black">
                  {visibleThemesCount}/7
                </span>
              </button>

              <button
                onClick={() => setSettingsSection('quizzes')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  settingsSection === 'quizzes'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{language === 'pt' ? 'Quizzes de Aprendizagem' : 'Quizzes'}</span>
              </button>

              <button
                onClick={() => setSettingsSection('turmas')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  settingsSection === 'turmas'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{language === 'pt' ? 'Gestão de Turmas' : 'Classes'}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-black">
                  {turmasList.length}
                </span>
              </button>

              <button
                onClick={() => setSettingsSection('danger')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  settingsSection === 'danger'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-600 hover:bg-rose-50'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>{language === 'pt' ? 'Zona de Segurança / Novo Ano' : 'Reset Zone'}</span>
              </button>
            </div>

            {/* Sub-section Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* SECTION A: THEME VISIBILITY */}
              {settingsSection === 'themes' && (
                <div className="space-y-5 max-w-5xl mx-auto">
                  {/* Explanatory banner */}
                  <div className="p-5 rounded-3xl bg-linear-to-r from-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 text-xl">
                        📚
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {language === 'pt' ? 'Controlo Pedagógico do Ritmo de Aprendizagem' : 'Pacing Control'}
                        </h3>
                        <p className="text-xs text-indigo-200 mt-1 max-w-xl">
                          Controla quais os temas visíveis para os alunos. Podes desbloquear tema a tema à medida que avanças nas aulas de TIC.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleSetAllThemes(true)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                      >
                        Desbloquear Todos (7)
                      </button>
                      <button
                        onClick={() => handleSetAllThemes(false)}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Bloquear Todos
                      </button>
                    </div>
                  </div>

                  {/* Themes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {ALL_THEMES.map((theme) => {
                      const isVisible = themeVisibility[theme.id] !== false;
                      const isToggling = togglingThemeId === theme.id;

                      return (
                        <div
                          key={theme.id}
                          className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            isVisible
                              ? 'bg-white border-slate-200 shadow-2xs'
                              : 'bg-slate-100/70 border-slate-200 opacity-75'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                                isVisible ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-600'
                              }`}
                            >
                              {theme.number}
                            </span>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">
                                {theme.title.pt}
                              </h4>
                              <span className="text-[11px] text-slate-500">
                                {isVisible ? '🟢 Visível e acessível aos alunos' : '🔒 Bloqueado / Oculto'}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleTheme(theme.id, isVisible)}
                            disabled={isToggling}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isVisible
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {isToggling ? 'A guardar...' : isVisible ? 'Ativo' : 'Bloqueado'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION B: QUIZZES VISIBILITY */}
              {settingsSection === 'quizzes' && (
                <div className="space-y-5 max-w-5xl mx-auto">
                  <div className="p-5 rounded-3xl bg-linear-to-r from-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 text-xl">
                        🏆
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {language === 'pt' ? 'Visibilidade dos Quizzes de Avaliação' : 'Quizzes Visibility'}
                        </h3>
                        <p className="text-xs text-indigo-200 mt-1 max-w-xl">
                          Ativa ou desativa os quizzes oficiais. Podes mantê-los ocultos até ao momento do teste em sala de aula.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleSetAllQuizzes(true)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                      >
                        Tornar Todos Visíveis
                      </button>
                      <button
                        onClick={() => handleSetAllQuizzes(false)}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Ocultar Todos
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {ALL_THEMES.map((theme) => {
                      const isVisible = quizVisibility[theme.id] !== false;
                      const isToggling = togglingQuizId === theme.id;

                      return (
                        <div
                          key={theme.id}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                              Q{theme.number}
                            </span>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">
                                Quiz Tema {theme.number}: {theme.title.pt}
                              </h4>
                              <span className="text-[11px] text-slate-500">
                                {isVisible ? '🟢 Visível na plataforma' : '🔒 Oculto aos alunos'}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleQuiz(theme.id, isVisible)}
                            disabled={isToggling}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isVisible
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {isToggling ? '...' : isVisible ? 'Visível' : 'Oculto'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION C: GESTÃO DE TURMAS */}
              {settingsSection === 'turmas' && (
                <div className="space-y-5 max-w-5xl mx-auto">
                  {/* Create Turma Form */}
                  <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                        <FolderPlus className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {language === 'pt' ? 'Criar Nova Turma' : 'Create Class'}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Adiciona novas turmas para registo de alunos e organização das pautas.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleCreateTurmaSubmit} className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={newTurmaName}
                        onChange={(e) => setNewTurmaName(e.target.value)}
                        placeholder="Ex: 5.º G, 5.º H, 6.º A..."
                        className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        disabled={creatingTurma || !newTurmaName.trim()}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                      >
                        {creatingTurma ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <PlusCircle className="w-3.5 h-3.5" />
                        )}
                        <span>Criar Turma</span>
                      </button>
                    </form>
                  </div>

                  {/* Active Turmas Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {turmasList.map((turma) => {
                      const count = students.filter((s) => (s.turma || '').trim() === turma.trim()).length;
                      const inTurmaStudents = students.filter((s) => (s.turma || '').trim() === turma.trim());
                      const totalXP = inTurmaStudents.reduce((sum, s) => sum + (s.points || 0), 0);
                      const avgXP = count > 0 ? Math.round(totalXP / count) : 0;

                      return (
                        <div
                          key={turma}
                          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between gap-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-black text-sm shadow-xs">
                                {turma}
                              </span>
                              <div className="mt-2 text-xs text-slate-600 space-y-0.5">
                                <p><strong>{count}</strong> alunos inscritos</p>
                                <p>Média: <strong className="text-emerald-700">{avgXP} XP</strong></p>
                              </div>
                            </div>

                            <button
                              onClick={() => promptDeleteTurma(turma)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                              title={`Eliminar turma ${turma}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <button
                              onClick={() => {
                                setSelectedTurma(turma);
                                setActiveTab('students');
                              }}
                              className="text-indigo-600 hover:underline font-bold cursor-pointer"
                            >
                              Ver Alunos →
                            </button>
                            {count > 0 && (
                              <button
                                onClick={() => promptDeleteStudentsByTurma(turma)}
                                className="text-rose-600 hover:underline font-medium text-[11px] cursor-pointer"
                              >
                                Limpar Alunos
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION D: ZONA DE SEGURANÇA & TRANSIÇÃO DE ANO LETIVO */}
              {settingsSection === 'danger' && (
                <div className="space-y-5 max-w-4xl mx-auto">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Zona de Segurança Pedagógica</strong>
                      <p className="mt-0.5 text-amber-800">
                        Estas operações servem para transição de ano letivo ou reiniciar as pautas escolares. A conta da professora Carla Oliveira (imaginebycarla2023@gmail.com) está permanentemente protegida contra eliminação.
                      </p>
                    </div>
                  </div>

                  {/* Action 1: Delete Students of Specific Class */}
                  <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span>1. Limpar Alunos por Turma Específica</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Elimina todos os alunos de uma turma em particular, mantendo intactas as outras turmas.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {turmasList.map((turma) => {
                        const count = students.filter((s) => (s.turma || '').trim() === turma.trim()).length;
                        return (
                          <button
                            key={turma}
                            onClick={() => promptDeleteStudentsByTurma(turma)}
                            disabled={count === 0}
                            className="p-3 rounded-xl border border-rose-200 bg-rose-50/40 hover:bg-rose-600 hover:text-white text-rose-800 text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <span>{turma}</span>
                            <span className="text-[10px] opacity-75">({count} alunos)</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action 2: Purge ALL Students */}
                  <div className="p-6 bg-rose-50/70 rounded-3xl border-2 border-rose-200 shadow-2xs space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-rose-950">
                          2. Limpeza Total da Base de Dados (Novo Ano Letivo)
                        </h4>
                        <p className="text-xs sm:text-sm text-rose-800 mt-1">
                          Elimina todas as contas de alunos ({students.length} registados) e pontuações na base de dados para começar um novo ano letivo.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-rose-200/60">
                      <span className="text-xs text-rose-700 font-semibold">
                        🔒 A conta de professora continua 100% ativa.
                      </span>
                      <button
                        onClick={promptDeleteAllStudents}
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Eliminar Todos os Alunos e Limpar BD</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {students.length} alunos registados em {turmasList.length} turmas.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
          >
            {language === 'pt' ? 'Fechar' : 'Close'}
          </button>
        </div>

        {/* SUB-MODAL: Edit Student Details */}
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
                      Editar Dados do Aluno
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
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Mudar Turma
                  </label>
                  <select
                    value={editTurma}
                    onChange={(e) => setEditTurma(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {turmasList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancelar
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
                        <span>Guardar Alterações</span>
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
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
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
                    Cancelar
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
              <div className="p-4 sm:p-5 bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between border-b border-indigo-700 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-indigo-400/40 shadow-inner shrink-0 bg-white">
                    <CartoonAvatar
                      config={detailStudent.avatar || getDefaultAvatar(detailStudent.publicId || detailStudent.name)}
                      size={44}
                    />
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
                    <h3 className="text-lg font-black text-white mt-0.5">
                      {detailStudent.fullName || detailStudent.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setDetailStudent(null)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
                {ALL_THEMES.map((theme) => {
                  const sProgress = progressMap[detailStudent.id] || progressMap[detailStudent.email] || [];
                  const breakdown = getStudentThemeBreakdown(detailStudent, sProgress, theme);

                  return (
                    <div key={theme.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                            {theme.number}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {theme.title.pt}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-xs">
                            {breakdown.totalPoints} / {breakdown.maxPoints} XP
                          </span>
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
                            {breakdown.percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {breakdown.challenges.map((ch, chIdx) => (
                          <div
                            key={ch.id}
                            className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between gap-1 ${
                              ch.completed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}
                          >
                            <span className="font-bold text-slate-800 truncate">{ch.title}</span>
                            <span className="font-bold text-emerald-700">{ch.score} / 100 XP</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                        <span className="font-bold text-slate-700">Quiz Oficial (1.ª Tentativa):</span>
                        <span className="font-black text-indigo-700">{breakdown.quiz.officialScore}% ({getQualitativeLevel(breakdown.quiz.officialScore)})</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setDetailStudent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
