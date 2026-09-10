import * as XLSX from 'xlsx';
import { User, ActivityProgress, ThemeDefinition } from '../types';
import { ALL_THEMES, THEMES_BY_ID } from '../data/allThemesData';

export interface ChallengeScoreDetail {
  id: string;
  title: string;
  score: number;
  completed: boolean;
  attempts: number;
}

export interface QuizScoreDetail {
  id: string;
  title: string;
  officialScore: number; // 1.ª tentativa oficial
  bestScore: number;
  attempts: number;
  completed: boolean;
}

export interface StudentThemeBreakdown {
  theme: ThemeDefinition;
  challenges: ChallengeScoreDetail[];
  quiz: QuizScoreDetail;
  totalPoints: number;
  maxPoints: number;
  percentage: number;
  completedActivitiesCount: number;
  totalActivitiesCount: number;
}

/**
 * Resolves a student's detailed breakdown of challenges and quiz for a given theme
 */
export function getStudentThemeBreakdown(
  student: User,
  studentProgress: ActivityProgress[],
  theme: ThemeDefinition
): StudentThemeBreakdown {
  const regularChallenges = theme.challenges.filter((c) => c.type !== 'final_quiz');
  const quizChallenge = theme.challenges.find((c) => c.type === 'final_quiz');

  const challenges: ChallengeScoreDetail[] = regularChallenges.map((c) => {
    // Look up by exact activityId or potential variant/aliases
    const record = studentProgress.find(
      (p) =>
        p.activityId === c.id ||
        p.activityId === c.id.replace('desafio-', 'jogo-') ||
        p.activityId === c.id.replace('jogo-', 'desafio-')
    );

    const score = record ? Math.max(0, Math.min(100, record.score ?? record.bestScore ?? (record.percentage !== undefined ? record.percentage : 0))) : 0;
    const completed = record?.status === 'completed' || score > 0;
    const attempts = record?.attempts ?? (completed ? 1 : 0);

    return {
      id: c.id,
      title: c.title.pt,
      score,
      completed,
      attempts,
    };
  });

  // Quiz lookup
  const expectedQuizId = quizChallenge?.id || `quiz-final-tema${theme.number}`;
  const quizRecord = studentProgress.find(
    (p) =>
      p.activityId === expectedQuizId ||
      (p.activityType === 'quiz' && (p.themeId === theme.id || p.themeId === String(theme.number))) ||
      p.activityId.startsWith(`quiz-final-tema${theme.number}`)
  );

  const officialScore = quizRecord
    ? Math.max(
        0,
        Math.min(
          100,
          quizRecord.firstAttemptScore ??
            quizRecord.score ??
            quizRecord.bestScore ??
            (quizRecord.firstAttemptPercentage !== undefined ? quizRecord.firstAttemptPercentage : quizRecord.bestPercentage ?? 0)
        )
      )
    : 0;

  const bestScore = quizRecord
    ? Math.max(0, Math.min(100, quizRecord.bestScore ?? quizRecord.score ?? officialScore))
    : 0;

  const quizAttempts = quizRecord?.attempts ?? (officialScore > 0 ? 1 : 0);
  const quizCompleted = (quizRecord?.status === 'completed') || quizAttempts > 0 || officialScore > 0;

  const quiz: QuizScoreDetail = {
    id: expectedQuizId,
    title: quizChallenge?.title?.pt || `Quiz Final: ${theme.title.pt}`,
    officialScore,
    bestScore,
    attempts: quizAttempts,
    completed: quizCompleted,
  };

  const challengePointsSum = challenges.reduce((acc, curr) => acc + curr.score, 0);
  const totalPoints = challengePointsSum + officialScore;
  const maxPoints = (challenges.length + 1) * 100; // e.g. 5 * 100 = 500 XP
  const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  const completedActivitiesCount =
    challenges.filter((c) => c.completed).length + (quiz.completed ? 1 : 0);
  const totalActivitiesCount = challenges.length + 1;

  return {
    theme,
    challenges,
    quiz,
    totalPoints,
    maxPoints,
    percentage,
    completedActivitiesCount,
    totalActivitiesCount,
  };
}

/**
 * Returns qualitative evaluation descriptor based on Portuguese curriculum standards
 */
export function getQualitativeLevel(percentage: number): string {
  if (percentage >= 90) return 'Excelente (90-100%)';
  if (percentage >= 70) return 'Muito Bom (70-89%)';
  if (percentage >= 50) return 'Suficiente (50-69%)';
  if (percentage > 0) return 'A Desenvolver (<50%)';
  return 'Não Iniciado (0%)';
}

/**
 * Exports detailed challenges and quizzes scores by theme to an Excel (.xlsx) spreadsheet
 */
export function exportThemeScoresToExcel(
  students: User[],
  progressMap: Record<string, ActivityProgress[]>,
  selectedThemeId: string = 'all',
  selectedTurma: string = 'all'
): void {
  const filteredStudents = selectedTurma && selectedTurma !== 'all'
    ? students.filter((s) => (s.turma || '').trim() === selectedTurma.trim())
    : students;

  if (filteredStudents.length === 0) return;

  const todayStr = new Date().toISOString().slice(0, 10);
  const turmaSlug = selectedTurma && selectedTurma !== 'all'
    ? selectedTurma.replace(/[^a-zA-Z0-9]/g, '_')
    : 'Todas_Turmas';

  const workbook = XLSX.utils.book_new();

  // If a single theme is requested
  if (selectedThemeId !== 'all') {
    const theme = THEMES_BY_ID[selectedThemeId] || ALL_THEMES.find((t) => t.id === selectedThemeId) || ALL_THEMES[0];
    const regularChallenges = theme.challenges.filter((c) => c.type !== 'final_quiz');
    const quizChallenge = theme.challenges.find((c) => c.type === 'final_quiz');

    const rows = filteredStudents.map((student, idx) => {
      const studentProgress = progressMap[student.id] || progressMap[student.email] || [];
      const breakdown = getStudentThemeBreakdown(student, studentProgress, theme);

      const rowObj: Record<string, any> = {
        'N.º': idx + 1,
        'Turma': student.turma || '5.º A',
        'Nome do Aluno': student.name || 'Sem Nome',
        'Email': student.email || '',
        'ID Público': student.publicId || '',
      };

      // Challenge columns (0-100 pts)
      breakdown.challenges.forEach((ch, chIdx) => {
        rowObj[`Desafio ${chIdx + 1}: ${ch.title} (0-100)`] = ch.score;
      });

      // Quiz column (1.ª tentativa oficial)
      const quizName = quizChallenge?.title?.pt || `Quiz Final Tema ${theme.number}`;
      rowObj[`Quiz Final (1.ª Tentativa - Oficial) (0-100)`] = breakdown.quiz.officialScore;
      rowObj['Tentativas do Quiz'] = breakdown.quiz.attempts;
      rowObj['Pontuação Total Tema (0-500 XP)'] = breakdown.totalPoints;
      rowObj['Aproveitamento (%)'] = `${breakdown.percentage}%`;
      rowObj['Classificação Qualitativa'] = getQualitativeLevel(breakdown.percentage);

      return rowObj;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Column widths
    worksheet['!cols'] = [
      { wch: 6 },  // N.º
      { wch: 10 }, // Turma
      { wch: 28 }, // Nome
      { wch: 32 }, // Email
      { wch: 18 }, // ID Público
      ...regularChallenges.map(() => ({ wch: 24 })), // Challenges
      { wch: 34 }, // Quiz
      { wch: 18 }, // Tentativas
      { wch: 28 }, // Total Tema
      { wch: 18 }, // %
      { wch: 26 }, // Classificação
    ];

    const safeSheetName = `Tema ${theme.number} - Pauta`.substring(0, 31);
    XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);

    const fileName = `MundoTIC_Pauta_Tema_${theme.number}_Turma_${turmaSlug}_${todayStr}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    return;
  }

  // If ALL themes requested: Build a comprehensive master workbook with a Summary Sheet + 7 Theme Sheets
  // 1. Summary Sheet (Resumo Global)
  const summaryRows = filteredStudents.map((student, idx) => {
    const studentProgress = progressMap[student.id] || progressMap[student.email] || [];

    let totalThemeSum = 0;
    let totalCompletedChallenges = 0;
    let totalCompletedQuizzes = 0;

    const rowObj: Record<string, any> = {
      'N.º': idx + 1,
      'Turma': student.turma || '5.º A',
      'Nome do Aluno': student.name || 'Sem Nome',
      'Email': student.email || '',
      'ID Público': student.publicId || '',
      'Pontuação Global (XP)': student.points ?? 0,
    };

    ALL_THEMES.forEach((theme) => {
      const breakdown = getStudentThemeBreakdown(student, studentProgress, theme);
      rowObj[`T${theme.number}: ${theme.title.pt.substring(0, 20)} (0-500)`] = breakdown.totalPoints;
      totalThemeSum += breakdown.totalPoints;
      totalCompletedChallenges += breakdown.challenges.filter((c) => c.completed).length;
      if (breakdown.quiz.completed) totalCompletedQuizzes++;
    });

    const maxAllThemes = ALL_THEMES.length * 500; // 3500
    const globalPercent = maxAllThemes > 0 ? Math.round((totalThemeSum / maxAllThemes) * 100) : 0;
    const tipsAndBonusXP = Math.max(0, (student.points ?? 0) - totalThemeSum);

    rowObj['Pontos Temas Curriculares (0-3500 XP)'] = totalThemeSum;
    rowObj['Pontos Dicas & Bónus (XP)'] = tipsAndBonusXP;
    rowObj['Desafios Concluídos (/28)'] = totalCompletedChallenges;
    rowObj['Quizzes Concluídos (/7)'] = totalCompletedQuizzes;
    rowObj['Média de Aproveitamento (%)'] = `${globalPercent}%`;
    rowObj['Classificação Global'] = getQualitativeLevel(globalPercent);

    return rowObj;
  });

  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  summarySheet['!cols'] = [
    { wch: 6 },  // N.º
    { wch: 10 }, // Turma
    { wch: 28 }, // Nome
    { wch: 32 }, // Email
    { wch: 18 }, // ID Público
    { wch: 20 }, // Pontos Globais
    ...ALL_THEMES.map(() => ({ wch: 22 })),
    { wch: 26 }, // Pontos Curriculares
    { wch: 24 }, // Pontos Dicas & Bónus
    { wch: 22 }, // Desafios Concluídos
    { wch: 20 }, // Quizzes Concluídos
    { wch: 24 }, // Média Aproveitamento
    { wch: 26 }, // Classificação
  ];
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumo Geral');

  // 2. Individual Theme Sheets (Tema 1 to 7)
  ALL_THEMES.forEach((theme) => {
    const regularChallenges = theme.challenges.filter((c) => c.type !== 'final_quiz');

    const themeRows = filteredStudents.map((student, idx) => {
      const studentProgress = progressMap[student.id] || progressMap[student.email] || [];
      const breakdown = getStudentThemeBreakdown(student, studentProgress, theme);

      const rowObj: Record<string, any> = {
        'N.º': idx + 1,
        'Turma': student.turma || '5.º A',
        'Nome do Aluno': student.name || 'Sem Nome',
        'Email': student.email || '',
      };

      breakdown.challenges.forEach((ch, chIdx) => {
        rowObj[`Desafio ${chIdx + 1}: ${ch.title} (0-100)`] = ch.score;
      });

      rowObj[`Quiz Final (1.ª Tentativa - Oficial) (0-100)`] = breakdown.quiz.officialScore;
      rowObj['Tentativas Quiz'] = breakdown.quiz.attempts;
      rowObj['Total Tema (0-500 XP)'] = breakdown.totalPoints;
      rowObj['Aproveitamento (%)'] = `${breakdown.percentage}%`;
      rowObj['Avaliação'] = getQualitativeLevel(breakdown.percentage);

      return rowObj;
    });

    const themeSheet = XLSX.utils.json_to_sheet(themeRows);
    themeSheet['!cols'] = [
      { wch: 6 },
      { wch: 10 },
      { wch: 28 },
      { wch: 32 },
      ...regularChallenges.map(() => ({ wch: 24 })),
      { wch: 34 },
      { wch: 16 },
      { wch: 22 },
      { wch: 18 },
      { wch: 24 },
    ];

    const safeSheetTitle = `T${theme.number} - ${theme.id.slice(0, 15)}`.replace(/[\/\?\*\\\[\]:]/g, '');
    XLSX.utils.book_append_sheet(workbook, themeSheet, safeSheetTitle.substring(0, 31));
  });

  // 3. Dicas Diárias & Bónus Sheet
  const tipsRows = filteredStudents.map((student, idx) => {
    const studentProgress = progressMap[student.id] || progressMap[student.email] || [];
    let totalCurricularSum = 0;
    ALL_THEMES.forEach((theme) => {
      const breakdown = getStudentThemeBreakdown(student, studentProgress, theme);
      totalCurricularSum += breakdown.totalPoints;
    });

    const tipsAndBonusXP = Math.max(0, (student.points ?? 0) - totalCurricularSum);
    // Estimativa de dicas lidas/respondidas (25 a 50 pts por dia)
    const estimatedTipsCount = tipsAndBonusXP > 0 ? Math.round(tipsAndBonusXP / 40) : 0;

    return {
      'N.º': idx + 1,
      'Turma': student.turma || '5.º A',
      'Nome do Aluno': student.name || 'Sem Nome',
      'Email': student.email || '',
      'ID Público': student.publicId || '',
      'Pontos Ganhos em Dicas Diárias & Bónus (XP)': tipsAndBonusXP,
      'Estimativa de Dicas Respondidas': estimatedTipsCount > 0 ? `~${estimatedTipsCount} dicas` : '0 dicas',
      'Pontos Temas Curriculares (0-3500 XP)': totalCurricularSum,
      'Pontuação Global Acumulada (XP)': student.points ?? 0,
      'Última Atividade Realizada': student.lastActivity?.title || '—',
      'Data da Última Atividade': student.lastActivity?.timestamp ? new Date(student.lastActivity.timestamp).toLocaleString('pt-PT') : '—',
    };
  });

  const tipsSheet = XLSX.utils.json_to_sheet(tipsRows);
  tipsSheet['!cols'] = [
    { wch: 6 },
    { wch: 10 },
    { wch: 28 },
    { wch: 32 },
    { wch: 18 },
    { wch: 38 },
    { wch: 30 },
    { wch: 32 },
    { wch: 30 },
    { wch: 34 },
    { wch: 22 },
  ];
  XLSX.utils.book_append_sheet(workbook, tipsSheet, 'Dicas Diárias & Bónus');

  const fileName = `MundoTIC_Caderno_Avaliacao_7Temas_Turma_${turmaSlug}_${todayStr}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

/**
 * Dedicated export for Dicas Diárias (Daily Tips) and bonus points per student
 */
export function exportDailyTipsScoresToExcel(
  filteredStudents: User[],
  progressMap: Record<string, any[]>,
  selectedTurma?: string
): void {
  const todayStr = new Date().toISOString().slice(0, 10);
  const turmaSlug = selectedTurma && selectedTurma !== 'all'
    ? selectedTurma.replace(/[^a-zA-Z0-9]/g, '_')
    : 'Todas_Turmas';

  const rows = filteredStudents.map((student, idx) => {
    const studentProgress = progressMap[student.id] || progressMap[student.email] || [];
    let totalCurricularSum = 0;
    ALL_THEMES.forEach((theme) => {
      const breakdown = getStudentThemeBreakdown(student, studentProgress, theme);
      totalCurricularSum += breakdown.totalPoints;
    });

    const tipsAndBonusXP = Math.max(0, (student.points ?? 0) - totalCurricularSum);
    const estimatedTipsCount = tipsAndBonusXP > 0 ? Math.round(tipsAndBonusXP / 40) : 0;

    return {
      'N.º': idx + 1,
      'Turma': student.turma || '5.º A',
      'Nome do Aluno': student.name || 'Sem Nome',
      'Email Institucional': student.email || '',
      'ID Público (Nickname)': student.publicId || '',
      'Pontos Dicas Diárias & Bónus (XP)': tipsAndBonusXP,
      'Dicas Realizadas (Estimativa)': estimatedTipsCount > 0 ? `~${estimatedTipsCount} dicas` : '0',
      'Pontos Temas Curriculares (0-3500 XP)': totalCurricularSum,
      'Pontuação Global Total (XP)': student.points ?? 0,
      'Nível de Envolvimento': tipsAndBonusXP >= 200 ? 'Excelente (Muito Ativo)' : tipsAndBonusXP >= 50 ? 'Regular' : tipsAndBonusXP > 0 ? 'Iniciante' : 'Sem Participação',
      'Última Atividade Registada': student.lastActivity?.title || 'Sem registo',
      'Data da Atividade': student.lastActivity?.timestamp ? new Date(student.lastActivity.timestamp).toLocaleString('pt-PT') : '—',
    };
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet['!cols'] = [
    { wch: 6 },  // N.º
    { wch: 10 }, // Turma
    { wch: 28 }, // Nome
    { wch: 32 }, // Email
    { wch: 20 }, // ID
    { wch: 32 }, // Dicas XP
    { wch: 28 }, // Estimativa
    { wch: 34 }, // Temas
    { wch: 28 }, // Global XP
    { wch: 26 }, // Nivel
    { wch: 36 }, // Ultima atividade
    { wch: 22 }, // Data
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pauta Dicas Diárias');
  const fileName = `MundoTIC_Pauta_Dicas_Diarias_Turma_${turmaSlug}_${todayStr}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}


/**
 * Exports basic students list to Excel (.xlsx) file, optionally filtered by class (turma)
 */
export function exportStudentsToExcel(students: User[], selectedTurma?: string): void {
  const filtered = selectedTurma && selectedTurma !== 'all'
    ? students.filter((s) => (s.turma || '').trim() === selectedTurma.trim())
    : students;

  // Prepare clean rows with school context
  const rows = filtered.map((s, idx) => ({
    'N.º': idx + 1,
    'Turma': s.turma || '5.º A',
    'Nome Completo': s.name || 'Sem Nome',
    'Email Institucional': s.email || '',
    'ID Público (Nickname)': s.publicId || '',
    'Pontuação Total (XP)': s.points ?? 0,
    'Data de Registo': s.createdAt ? new Date(s.createdAt).toLocaleDateString('pt-PT') : '',
    'Última Atividade Realizada': s.lastActivity?.title || 'Sem registo',
    'Data da Atividade': s.lastActivity?.timestamp ? new Date(s.lastActivity.timestamp).toLocaleString('pt-PT') : '',
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto column widths
  worksheet['!cols'] = [
    { wch: 6 },  // N.º
    { wch: 10 }, // Turma
    { wch: 28 }, // Nome Completo
    { wch: 32 }, // Email
    { wch: 22 }, // ID Público
    { wch: 18 }, // Pontuação Total
    { wch: 16 }, // Data Registo
    { wch: 32 }, // Última Atividade
    { wch: 22 }, // Data Atividade
  ];

  const workbook = XLSX.utils.book_new();
  const safeSheetName = selectedTurma && selectedTurma !== 'all'
    ? `Turma ${selectedTurma}`.replace(/[\/\?\*\\\[\]:]/g, '')
    : 'Todas as Turmas';
  XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName.substring(0, 31));

  const todayStr = new Date().toISOString().slice(0, 10);
  const fileName = selectedTurma && selectedTurma !== 'all'
    ? `MundoTIC_5Ano_Turma_${selectedTurma.replace(/[^a-zA-Z0-9]/g, '_')}_${todayStr}.xlsx`
    : `MundoTIC_5Ano_Todas_Turmas_${todayStr}.xlsx`;

  XLSX.writeFile(workbook, fileName);
}

/**
 * Neutralizes potential CSV injection vectors (=, +, -, @, tabs)
 */
function sanitizeCsvCell(val: any): string {
  if (val === null || val === undefined) return '""';
  let str = String(val).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

/**
 * Fallback / Direct CSV exporter with UTF-8 BOM for Microsoft Excel compatibility
 */
export function exportStudentsToCSV(students: User[], selectedTurma?: string): void {
  const filtered = selectedTurma && selectedTurma !== 'all'
    ? students.filter((s) => (s.turma || '').trim() === selectedTurma.trim())
    : students;

  const headers = [
    'N.º',
    'Turma',
    'Nome Completo',
    'Email',
    'ID Público',
    'Pontuação (XP)',
    'Data de Registo',
    'Última Atividade',
  ];

  const csvRows = filtered.map((s, idx) => [
    idx + 1,
    sanitizeCsvCell(s.turma || '5.º A'),
    sanitizeCsvCell(s.name || 'Sem Nome'),
    sanitizeCsvCell(s.email || ''),
    sanitizeCsvCell(s.publicId || ''),
    s.points ?? 0,
    sanitizeCsvCell(s.createdAt ? new Date(s.createdAt).toLocaleDateString('pt-PT') : ''),
    sanitizeCsvCell(s.lastActivity?.title || 'Sem registo'),
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...csvRows.map((r) => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);

  const todayStr = new Date().toISOString().slice(0, 10);
  const fileName = selectedTurma && selectedTurma !== 'all'
    ? `MundoTIC_5Ano_Turma_${selectedTurma.replace(/[^a-zA-Z0-9]/g, '_')}_${todayStr}.csv`
    : `MundoTIC_5Ano_Todas_Turmas_${todayStr}.csv`;

  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports theme scores to CSV format with UTF-8 BOM
 */
export function exportThemeScoresToCSV(
  students: User[],
  progressMap: Record<string, ActivityProgress[]>,
  theme: ThemeDefinition,
  selectedTurma: string = 'all'
): void {
  const filtered = selectedTurma && selectedTurma !== 'all'
    ? students.filter((s) => (s.turma || '').trim() === selectedTurma.trim())
    : students;

  const regularChallenges = theme.challenges.filter((c) => c.type !== 'final_quiz');

  const headers = [
    'N.º',
    'Turma',
    'Nome Completo',
    'Email',
    'ID Público',
    ...regularChallenges.map((c, i) => `Desafio ${i + 1}: ${c.title.pt}`),
    'Quiz Final (1.ª Tentativa Oficial)',
    'Tentativas Quiz',
    'Total Tema (XP)',
    'Aproveitamento (%)',
    'Classificação',
  ];

  const csvRows = filtered.map((student, idx) => {
    const studentProgress = progressMap[student.id] || progressMap[student.email] || [];
    const breakdown = getStudentThemeBreakdown(student, studentProgress, theme);

    return [
      idx + 1,
      sanitizeCsvCell(student.turma || '5.º A'),
      sanitizeCsvCell(student.name || 'Sem Nome'),
      sanitizeCsvCell(student.email || ''),
      sanitizeCsvCell(student.publicId || ''),
      ...breakdown.challenges.map((c) => c.score),
      breakdown.quiz.officialScore,
      breakdown.quiz.attempts,
      breakdown.totalPoints,
      sanitizeCsvCell(`${breakdown.percentage}%`),
      sanitizeCsvCell(getQualitativeLevel(breakdown.percentage)),
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(';'), ...csvRows.map((r) => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);

  const todayStr = new Date().toISOString().slice(0, 10);
  const turmaSlug = selectedTurma && selectedTurma !== 'all'
    ? selectedTurma.replace(/[^a-zA-Z0-9]/g, '_')
    : 'Todas_Turmas';
  const fileName = `MundoTIC_Pauta_Tema_${theme.number}_Turma_${turmaSlug}_${todayStr}.csv`;

  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
