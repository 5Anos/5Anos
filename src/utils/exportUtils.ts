import * as XLSX from 'xlsx';
import { User, ActivityProgress, ThemeDefinition, Language } from '../types';
import { ALL_THEMES, THEMES_BY_ID } from '../data/allThemesData';
import {
  getStudentThemeBreakdown,
  getGlobalActivityStats,
  getThemeMaxPoints,
  getThemeActivityCount,
  getTotalActivitiesCount,
  getTotalChallengesCount,
  getTotalQuizzesCount,
  getGlobalCurricularMaxPoints,
  ChallengeScoreDetail,
  QuizScoreDetail,
  StudentThemeBreakdown,
  GlobalActivityStats,
} from './progressCalculator';

export {
  getStudentThemeBreakdown,
  getGlobalActivityStats,
  getThemeMaxPoints,
  getThemeActivityCount,
  getTotalActivitiesCount,
  getTotalChallengesCount,
  getTotalQuizzesCount,
  getGlobalCurricularMaxPoints,
};

export type {
  ChallengeScoreDetail,
  QuizScoreDetail,
  StudentThemeBreakdown,
  GlobalActivityStats,
};

/**
 * Retorna a menção qualitativa oficial para os Quizzes de Aprendizagem e Avaliações
 * Escala Oficial:
 * (0 a 19%) Não Satisfaz (Muito Fraco)
 * (20% a 49%) Não Satisfaz
 * (50% a 69%) Satisfaz
 * (70% a 89%) Bom
 * (90% a 100%) Muito Bom
 */
export function getQualitativeLevel(percentage: number, lang: Language = 'pt'): string {
  const p = Math.round(percentage);
  if (p >= 90) return lang === 'pt' ? 'Muito Bom' : 'Very Good';
  if (p >= 70) return lang === 'pt' ? 'Bom' : 'Good';
  if (p >= 50) return lang === 'pt' ? 'Satisfaz' : 'Satisfactory';
  if (p >= 20) return lang === 'pt' ? 'Não Satisfaz' : 'Unsatisfactory';
  return lang === 'pt' ? 'Não Satisfaz (Muito Fraco)' : 'Needs Improvement';
}

export function getQualitativeLevelWithRange(percentage: number, lang: Language = 'pt'): string {
  const p = Math.round(percentage);
  if (p >= 90) return lang === 'pt' ? 'Muito Bom (90% a 100%)' : 'Very Good (90% to 100%)';
  if (p >= 70) return lang === 'pt' ? 'Bom (70% a 89%)' : 'Good (70% to 89%)';
  if (p >= 50) return lang === 'pt' ? 'Satisfaz (50% a 69%)' : 'Satisfactory (50% to 69%)';
  if (p >= 20) return lang === 'pt' ? 'Não Satisfaz (20% a 49%)' : 'Unsatisfactory (20% to 49%)';
  return lang === 'pt' ? 'Não Satisfaz (Muito Fraco) (0 a 19%)' : 'Needs Improvement (0 to 19%)';
}

export const getQuizMention = getQualitativeLevel;
export const getQuizMentionWithRange = getQualitativeLevelWithRange;

export function getQuizMentionBadgeStyle(percentageOrScore: number): {
  bg: string;
  text: string;
  border: string;
  pillClass: string;
  badgeClass: string;
  emoji: string;
} {
  const p = Math.round(percentageOrScore);
  if (p >= 90) {
    return {
      bg: 'bg-emerald-500',
      text: 'text-emerald-950',
      border: 'border-emerald-300',
      pillClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      badgeClass: 'bg-emerald-600 text-white',
      emoji: '🌟',
    };
  }
  if (p >= 70) {
    return {
      bg: 'bg-blue-500',
      text: 'text-blue-950',
      border: 'border-blue-300',
      pillClass: 'bg-blue-100 text-blue-900 border-blue-300',
      badgeClass: 'bg-blue-600 text-white',
      emoji: '👍',
    };
  }
  if (p >= 50) {
    return {
      bg: 'bg-teal-500',
      text: 'text-teal-950',
      border: 'border-teal-300',
      pillClass: 'bg-teal-100 text-teal-900 border-teal-300',
      badgeClass: 'bg-teal-600 text-white',
      emoji: '✨',
    };
  }
  if (p >= 20) {
    return {
      bg: 'bg-amber-500',
      text: 'text-amber-950',
      border: 'border-amber-300',
      pillClass: 'bg-amber-100 text-amber-900 border-amber-300',
      badgeClass: 'bg-amber-500 text-slate-950',
      emoji: '⚠️',
    };
  }
  return {
    bg: 'bg-rose-500',
    text: 'text-rose-950',
    border: 'border-rose-300',
    pillClass: 'bg-rose-100 text-rose-900 border-rose-300',
    badgeClass: 'bg-rose-600 text-white',
    emoji: '💪',
  };
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
    const maxThemePoints = getThemeMaxPoints(theme);

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
      rowObj['Quiz Menção (1.ª Tentativa)'] = getQualitativeLevel(breakdown.quiz.officialScore);
      rowObj['Tentativas do Quiz'] = breakdown.quiz.attempts;
      rowObj[`Pontuação Total Tema (0-${breakdown.maxPoints} XP)`] = breakdown.totalPoints;
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
      { wch: 24 }, // Quiz Menção
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

  // If ALL themes requested: Build a comprehensive master workbook with a Summary Sheet + Theme Sheets
  const totalActivitiesGlobal = getTotalActivitiesCount(ALL_THEMES);
  const totalChallengesGlobal = getTotalChallengesCount(ALL_THEMES);
  const totalQuizzesGlobal = getTotalQuizzesCount(ALL_THEMES);
  const globalMaxPoints = getGlobalCurricularMaxPoints(ALL_THEMES);

  // 1. Summary Sheet (Resumo Global)
  const summaryRows = filteredStudents.map((student, idx) => {
    const studentProgress = progressMap[student.id] || progressMap[student.email] || [];
    const stats = getGlobalActivityStats(student, studentProgress, ALL_THEMES);

    const rowObj: Record<string, any> = {
      'N.º': idx + 1,
      'Turma': student.turma || '5.º A',
      'Nome do Aluno': student.name || 'Sem Nome',
      'Email': student.email || '',
      'ID Público': student.publicId || '',
      'Pontuação Global (XP)': student.points ?? 0,
    };

    stats.themeBreakdowns.forEach((breakdown) => {
      rowObj[`T${breakdown.theme.number}: ${breakdown.theme.title.pt.substring(0, 20)} (0-${breakdown.maxPoints})`] = breakdown.totalPoints;
    });

    rowObj[`Pontos Temas Curriculares (0-${stats.globalMaxPoints} XP)`] = stats.totalCurricularPoints;
    rowObj['Pontos Dicas & Bónus (XP)'] = stats.bonusPoints;
    rowObj[`Desafios Concluídos (/${stats.totalChallenges})`] = stats.completedChallenges;
    rowObj[`Quizzes Concluídos (/${stats.totalQuizzes})`] = stats.completedQuizzes;
    rowObj[`Atividades Concluídas (/${stats.totalActivities})`] = stats.completedActivities;
    rowObj['Média de Aproveitamento (%)'] = `${stats.globalPercentage}%`;
    rowObj['Classificação Global'] = getQualitativeLevel(stats.globalPercentage);

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
    { wch: 22 }, // Atividades Concluídas
    { wch: 24 }, // Média Aproveitamento
    { wch: 26 }, // Classificação
  ];
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumo Geral');

  // 2. Individual Theme Sheets (Tema 1 to 7)
  ALL_THEMES.forEach((theme) => {
    const regularChallenges = theme.challenges.filter((c) => c.type !== 'final_quiz');
    const maxThemePoints = getThemeMaxPoints(theme);

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
      rowObj['Quiz Menção (1.ª Tentativa)'] = getQualitativeLevel(breakdown.quiz.officialScore);
      rowObj['Tentativas Quiz'] = breakdown.quiz.attempts;
      rowObj[`Total Tema (0-${breakdown.maxPoints} XP)`] = breakdown.totalPoints;
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
      { wch: 24 }, // Quiz Menção
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
    const stats = getGlobalActivityStats(student, studentProgress, ALL_THEMES);

    const tipsAndBonusXP = stats.bonusPoints;
    const estimatedTipsCount = tipsAndBonusXP > 0 ? Math.round(tipsAndBonusXP / 40) : 0;

    return {
      'N.º': idx + 1,
      'Turma': student.turma || '5.º A',
      'Nome do Aluno': student.name || 'Sem Nome',
      'Email': student.email || '',
      'ID Público': student.publicId || '',
      'Pontos Ganhos em Dicas Diárias & Bónus (XP)': tipsAndBonusXP,
      'Estimativa de Dicas Respondidas': estimatedTipsCount > 0 ? `~${estimatedTipsCount} dicas` : '0 dicas',
      [`Pontos Temas Curriculares (0-${stats.globalMaxPoints} XP)`]: stats.totalCurricularPoints,
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
    const stats = getGlobalActivityStats(student, studentProgress, ALL_THEMES);

    const tipsAndBonusXP = stats.bonusPoints;
    const estimatedTipsCount = tipsAndBonusXP > 0 ? Math.round(tipsAndBonusXP / 40) : 0;

    return {
      'N.º': idx + 1,
      'Turma': student.turma || '5.º A',
      'Nome do Aluno': student.name || 'Sem Nome',
      'Email Institucional': student.email || '',
      'ID Público (Nickname)': student.publicId || '',
      'Pontos Dicas Diárias & Bónus (XP)': tipsAndBonusXP,
      'Dicas Realizadas (Estimativa)': estimatedTipsCount > 0 ? `~${estimatedTipsCount} dicas` : '0',
      [`Pontos Temas Curriculares (0-${stats.globalMaxPoints} XP)`]: stats.totalCurricularPoints,
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

  const worksheet = XLSX.utils.json_to_sheet(rows);

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
  const maxThemePoints = getThemeMaxPoints(theme);

  const headers = [
    'N.º',
    'Turma',
    'Nome Completo',
    'Email',
    'ID Público',
    ...regularChallenges.map((c, i) => `Desafio ${i + 1}: ${c.title.pt}`),
    'Quiz Final (1.ª Tentativa Oficial)',
    'Tentativas Quiz',
    `Total Tema (0-${maxThemePoints} XP)`,
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
