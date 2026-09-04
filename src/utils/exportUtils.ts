import * as XLSX from 'xlsx';
import { User } from '../types';

/**
 * Exports students list to Excel (.xlsx) file, optionally filtered by class (turma)
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
    `"${(s.turma || '').replace(/"/g, '""')}"`,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${(s.email || '').replace(/"/g, '""')}"`,
    `"${(s.publicId || '').replace(/"/g, '""')}"`,
    s.points ?? 0,
    `"${s.createdAt ? new Date(s.createdAt).toLocaleDateString('pt-PT') : ''}"`,
    `"${(s.lastActivity?.title || 'Sem registo').replace(/"/g, '""')}"`,
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
