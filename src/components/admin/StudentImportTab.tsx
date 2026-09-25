import React, { useState, useMemo } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Users,
  KeyRound,
  ArrowRight,
  RefreshCw,
  ClipboardPaste,
  Sparkles,
  FileText,
  FileArchive,
  Trash2,
  ShieldAlert,
  Edit2,
  Check,
  X,
  Layers,
  Download,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { User, Language } from '../../types';
import { api } from '../../services/api';
import { exportStudentCredentialsToExcel, exportCreatedCredentialsToExcel } from '../../utils/exportUtils';

interface StudentImportTabProps {
  turmasList: string[];
  existingStudents: User[];
  language: Language;
  onImportSuccess: () => void;
  onNavigateToCredentials: () => void;
  onNavigateToStudents?: () => void;
}

interface ParsedStudentRow {
  id?: string;
  number: number;
  name: string;
  turma: string;
  source?: string;
}

function detectTurmaFromString(input: string): string | null {
  if (!input) return null;
  const mSpecific = input.match(/(?:5|5\.|5º|5\.º)\s*[-_ ]*([a-zA-Z])\b/i);
  if (mSpecific && mSpecific[1]) {
    return `5.º ${mSpecific[1].toUpperCase()}`;
  }
  const mTurma = input.match(/\b(?:turma|turma_)\s*[:\-–]?\s*([a-zA-Z])\b/i);
  if (mTurma && mTurma[1]) {
    return `5.º ${mTurma[1].toUpperCase()}`;
  }
  if (/^[a-zA-Z]$/.test(input.trim())) {
    return `5.º ${input.trim().toUpperCase()}`;
  }
  return null;
}

function parseExcelClient(
  buffer: ArrayBuffer,
  defaultTurma: string,
  fileName: string
): { sheets: string[]; students: ParsedStudentRow[] } {
  const data = new Uint8Array(buffer);
  const wb = XLSX.read(data, { type: 'array' });
  const students: ParsedStudentRow[] = [];
  const sheets: string[] = [];

  const fileTurma = detectTurmaFromString(fileName) || defaultTurma;

  for (const sheetName of wb.SheetNames) {
    const lowerSheet = sheetName.toLowerCase().trim();
    if (wb.SheetNames.length > 1 && (lowerSheet.includes('instru') || lowerSheet === 'capa' || lowerSheet === 'menu')) {
      continue;
    }

    const sheet = wb.Sheets[sheetName];
    if (!sheet) continue;

    const rawMatrix: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    if (!rawMatrix || rawMatrix.length === 0) continue;

    sheets.push(sheetName);
    const sheetTurma = detectTurmaFromString(sheetName) || fileTurma;

    // Scan top 15 rows for header row
    let headerRowIdx = -1;
    let nameCol = -1;
    let firstNameCol = -1;
    let lastNameCol = -1;
    let numCol = -1;
    let turmaCol = -1;

    for (let r = 0; r < Math.min(rawMatrix.length, 15); r++) {
      const row = rawMatrix[r];
      if (!Array.isArray(row)) continue;

      for (let c = 0; c < row.length; c++) {
        const val = String(row[c] || '').toLowerCase().trim();
        if (nameCol === -1 && (
          val === 'nome' ||
          val === 'nome do aluno' ||
          val === 'nome completo' ||
          val === 'nome do estudante' ||
          val === 'aluno' ||
          val === 'estudante' ||
          val === 'student' ||
          val === 'name' ||
          val === 'designação' ||
          val === 'designacao' ||
          val === 'nome_aluno'
        )) {
          nameCol = c;
          headerRowIdx = r;
        }

        if (firstNameCol === -1 && (val === 'nome próprio' || val === 'nome proprio' || val === 'primeiro nome')) {
          firstNameCol = c;
          headerRowIdx = r;
        }

        if (lastNameCol === -1 && (val === 'apelido' || val === 'sobrenome' || val === 'último nome' || val === 'ultimo nome')) {
          lastNameCol = c;
          headerRowIdx = r;
        }

        if (numCol === -1 && (
          val === 'n.º' ||
          val === 'nº' ||
          val === 'numero' ||
          val === 'número' ||
          val === 'num' ||
          val === 'no.' ||
          val === 'n' ||
          val === '#'
        )) {
          numCol = c;
          headerRowIdx = r;
        }

        if (turmaCol === -1 && (val === 'turma' || val === 'classe' || val === 'ano/turma' || val === 'class')) {
          turmaCol = c;
        }
      }

      if (nameCol !== -1 || (firstNameCol !== -1 && lastNameCol !== -1)) break;
    }

    // Heuristic fallback if header not found
    if (nameCol === -1 && (firstNameCol === -1 || lastNameCol === -1)) {
      let bestCol = -1;
      let maxHits = 0;

      for (let c = 0; c < 15; c++) {
        let hits = 0;
        for (let r = 0; r < Math.min(rawMatrix.length, 35); r++) {
          const val = String(rawMatrix[r]?.[c] || '').trim();
          if (
            val.length >= 6 &&
            val.includes(' ') &&
            !val.includes('@') &&
            !/^\d+$/.test(val) &&
            /[a-zA-ZÀ-ÿ]/.test(val)
          ) {
            hits++;
          }
        }
        if (hits > maxHits) {
          maxHits = hits;
          bestCol = c;
        }
      }

      if (maxHits >= 2) {
        nameCol = bestCol;
        headerRowIdx = 0;
      }
    }

    if (nameCol === -1 && (firstNameCol === -1 || lastNameCol === -1)) continue;

    const startRow = headerRowIdx >= 0 ? headerRowIdx + 1 : 0;
    let autoNum = 1;

    for (let r = startRow; r < rawMatrix.length; r++) {
      const row = rawMatrix[r];
      if (!row || !Array.isArray(row)) continue;

      let rawName = '';
      if (nameCol !== -1 && row[nameCol] !== undefined) {
        rawName = String(row[nameCol] || '').trim();
      } else if (firstNameCol !== -1 && lastNameCol !== -1) {
        const fn = String(row[firstNameCol] || '').trim();
        const ln = String(row[lastNameCol] || '').trim();
        rawName = `${fn} ${ln}`.trim();
      }

      if (!rawName) continue;

      const lower = rawName.toLowerCase();
      if (
        lower.includes('total de alunos') ||
        lower.includes('total alunos') ||
        lower.includes('página ') ||
        lower.includes('pagina ') ||
        lower.includes('ano letivo') ||
        lower.includes('agrupamento') ||
        lower.includes('diretor de turma') ||
        lower.includes('diretora de turma') ||
        lower.includes('estabelecimento')
      ) {
        continue;
      }

      let num = autoNum;
      if (numCol !== -1 && row[numCol] !== undefined && row[numCol] !== '') {
        const parsed = parseInt(String(row[numCol]).trim(), 10);
        if (!isNaN(parsed) && parsed > 0 && parsed <= 60) {
          num = parsed;
        }
      }

      // Check if leading number in name
      const matchNumInName = rawName.match(/^(\d{1,2})[\s\.\-\)]+(.+)$/);
      if (matchNumInName) {
        num = parseInt(matchNumInName[1], 10);
        rawName = matchNumInName[2].trim();
      }

      // Remove trailing status tags or dates
      rawName = rawName.replace(/\s+\(?(?:ativo|matriculado|ordin[aá]rio|transferido|retido)\)?/gi, '').trim();
      rawName = rawName.replace(/\s+\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/g, '').trim();
      rawName = rawName.replace(/\s+/g, ' ');

      if (rawName.length < 3 || !/[a-zA-ZÀ-ÿ]/.test(rawName)) continue;
      if (/^(sim|não|nao|m|f|masculino|feminino)$/i.test(rawName)) continue;

      let rowTurma = sheetTurma;
      if (turmaCol !== -1 && row[turmaCol]) {
        rowTurma = detectTurmaFromString(String(row[turmaCol])) || rowTurma;
      }

      students.push({
        number: num,
        name: rawName,
        turma: rowTurma,
        source: `${fileName} [${sheetName}]`,
      });
      autoNum = num + 1;
    }
  }

  return { sheets, students };
}

export const StudentImportTab: React.FC<StudentImportTabProps> = ({
  turmasList,
  existingStudents,
  language,
  onImportSuccess,
  onNavigateToCredentials,
  onNavigateToStudents,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'paste'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [defaultTurma, setDefaultTurma] = useState<string>(turmasList[0] || '5.º A');
  const [pastedText, setPastedText] = useState<string>('');
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [processedSheets, setProcessedSheets] = useState<string[]>([]);
  const [previewFilterTurma, setPreviewFilterTurma] = useState<string>('all');
  const [searchPreview, setSearchPreview] = useState<string>('');

  // Editing single row in preview
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editRowName, setEditRowName] = useState('');
  const [editRowTurma, setEditRowTurma] = useState('');

  // Wipe database before creating: disabled by default to keep all classes cumulative
  const [wipeFirst, setWipeFirst] = useState<boolean>(false);

  // Parsed students list
  const [parsedRows, setParsedRows] = useState<ParsedStudentRow[]>([]);

  // Result state
  const [importResult, setImportResult] = useState<{
    success: boolean;
    wipedBefore?: boolean;
    wipedStats?: { deletedCount: number; purgedResidualsCount: number };
    summary: { totalInFile: number; createdCount: number; updatedCount?: number; existedCount: number; errorsCount: number };
    created: Array<{ id: string; name: string; turma: string; username: string; password?: string }>;
    updated?: Array<{ id: string; oldName?: string; name: string; turma: string; username: string }>;
    errors: Array<{ name?: string; turma?: string; error: string }>;
  } | null>(null);

  // Process pasted text
  const handleParsePastedText = () => {
    if (!pastedText.trim()) {
      setParseError('Cola a lista de alunos na caixa de texto antes de continuar.');
      return;
    }
    setParseError(null);
    setParsing(true);

    try {
      const lines = pastedText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
      const rows: ParsedStudentRow[] = [];
      let currentTurma = defaultTurma;
      let autoNum = 1;

      for (const line of lines) {
        const detected = detectTurmaFromString(line);
        if (detected && (line.toLowerCase().includes('turma') || line.toLowerCase().includes('5º') || line.toLowerCase().includes('5.º'))) {
          currentTurma = detected;
          autoNum = 1;
          continue;
        }

        let cleanLine = line.replace(/^\d+[\s\.\-\)\t:]+\s*/, '').trim();
        if (!cleanLine || /^(n[º\.]|nome|turma|aluno|estudante|ano letivo)/i.test(cleanLine)) continue;

        let num = autoNum;
        const matchNum = line.match(/^(\d{1,2})[\s\.\-\)\t:]+(.+)$/);
        if (matchNum) {
          const parsed = parseInt(matchNum[1], 10);
          if (parsed > 0 && parsed <= 60) {
            num = parsed;
            cleanLine = matchNum[2].trim();
          }
        }

        cleanLine = cleanLine.replace(/\s+\(?(?:ativo|matriculado|ordin[aá]rio)\)?/gi, '').trim();
        cleanLine = cleanLine.replace(/\s+/g, ' ');

        if (cleanLine.length >= 3 && /[a-zA-ZÀ-ÿ]/.test(cleanLine)) {
          rows.push({
            number: num,
            name: cleanLine,
            turma: currentTurma,
            source: 'Texto colado',
          });
          autoNum = num + 1;
        }
      }

      if (rows.length === 0) {
        throw new Error('Não foram encontrados nomes de alunos válidos no texto colado. Verifica o formato e tenta novamente.');
      }

      setParsedRows(rows);
      setProcessedSheets(['Texto colado']);
    } catch (err: any) {
      setParseError(err.message || 'Erro ao processar texto.');
    } finally {
      setParsing(false);
    }
  };

  // Process uploaded file (XLS, XLSX, CSV, PDF, ZIP)
  const processFile = async (file: File) => {
    setSelectedFile(file);
    setParseError(null);
    setImportResult(null);
    setParsing(true);
    setProcessedSheets([]);

    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    // 1. If PDF or ZIP: parse via server engine
    if (ext === '.pdf' || ext === '.zip') {
      try {
        const reader = new FileReader();
        reader.onload = async (evt) => {
          try {
            const dataUrl = (evt.target?.result as string) || '';
            const res = await api.parseStudentsFile(dataUrl, file.name, defaultTurma);

            if (!res.students || res.students.length === 0) {
              throw new Error(
                `Não foi possível detetar alunos no ficheiro ${file.name}. Certifica-te de que contém nomes legíveis de alunos.`
              );
            }

            setProcessedSheets(res.filesProcessed || []);
            setParsedRows(res.students.map((s, idx) => ({
              number: s.number || idx + 1,
              name: s.name.trim(),
              turma: s.turma || defaultTurma,
              source: s.sourceFile || file.name,
            })));
          } catch (err: any) {
            console.error('File parse error:', err);
            setParseError(err.message || 'Erro ao processar ficheiro PDF / ZIP.');
          } finally {
            setParsing(false);
          }
        };

        reader.onerror = () => {
          setParseError('Erro ao ler o ficheiro no navegador.');
          setParsing(false);
        };

        reader.readAsDataURL(file);
      } catch (err: any) {
        setParseError(err.message || 'Erro ao ler o ficheiro.');
        setParsing(false);
      }
      return;
    }

    // 2. If Excel (.xlsx, .xls) or CSV: parse with ArrayBuffer client-side, with server fallback
    try {
      const buffer = await file.arrayBuffer();
      const clientResult = parseExcelClient(buffer, defaultTurma, file.name);

      if (clientResult.students.length > 0) {
        setProcessedSheets(clientResult.sheets);
        setParsedRows(clientResult.students);
        setParsing(false);
        return;
      }

      // Fallback: send to server endpoint
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const dataUrl = (evt.target?.result as string) || '';
          const res = await api.parseStudentsFile(dataUrl, file.name, defaultTurma);
          if (!res.students || res.students.length === 0) {
            throw new Error(
              `Não foi possível detetar nomes de alunos no ficheiro ${file.name}. Verifica se contém uma coluna com o nome dos alunos.`
            );
          }
          setProcessedSheets(res.filesProcessed || []);
          setParsedRows(res.students.map((s, idx) => ({
            number: s.number || idx + 1,
            name: s.name.trim(),
            turma: s.turma || defaultTurma,
            source: s.sourceFile || file.name,
          })));
        } catch (serverErr: any) {
          setParseError(serverErr.message || 'Erro ao processar ficheiro Excel.');
        } finally {
          setParsing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error('Excel parse error:', err);
      setParseError(err.message || 'Erro ao ler ficheiro Excel.');
      setParsing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Start Batch Creation / Import
  const handleStartImport = async () => {
    if (parsedRows.length === 0) return;
    setImporting(true);
    setParseError(null);

    try {
      const res = await api.importStudentsBatch(
        parsedRows.map((r) => ({ name: r.name, turma: r.turma })),
        defaultTurma,
        wipeFirst
      );

      setImportResult({
        success: true,
        wipedBefore: res.wipedBefore,
        wipedStats: res.wipedStats,
        summary: {
          totalInFile: parsedRows.length,
          createdCount: res.createdCount ?? (res.created?.length || 0),
          existedCount: res.existedCount ?? (res.existed?.length || 0),
          updatedCount: res.updated?.length || 0,
          errorsCount: res.errors?.length || 0,
        },
        created: res.created || [],
        updated: res.updated || [],
        errors: res.errors || [],
      });

      onImportSuccess();
    } catch (err: any) {
      console.error('Batch import error:', err);
      setParseError(err.message || 'Erro ao criar contas de alunos na base de dados.');
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPastedText('');
    setParsedRows([]);
    setProcessedSheets([]);
    setImportResult(null);
    setParseError(null);
    setWipeFirst(false);
  };

  const handleDeleteRow = (index: number) => {
    setParsedRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const startEditRow = (index: number, row: ParsedStudentRow) => {
    setEditingRowIndex(index);
    setEditRowName(row.name);
    setEditRowTurma(row.turma);
  };

  const saveEditRow = (index: number) => {
    if (!editRowName.trim()) return;
    setParsedRows((prev) =>
      prev.map((r, idx) =>
        idx === index ? { ...r, name: editRowName.trim(), turma: editRowTurma.trim() || r.turma } : r
      )
    );
    setEditingRowIndex(null);
  };

  // Group summary by turma
  const byTurmaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of parsedRows) {
      counts[r.turma] = (counts[r.turma] || 0) + 1;
    }
    return counts;
  }, [parsedRows]);

  const uniqueTurmas = useMemo(() => Object.keys(byTurmaCounts).sort(), [byTurmaCounts]);

  const filteredPreviewRows = useMemo(() => {
    return parsedRows.filter((r) => {
      const matchTurma = previewFilterTurma === 'all' || r.turma === previewFilterTurma;
      const matchSearch =
        !searchPreview.trim() ||
        r.name.toLowerCase().includes(searchPreview.toLowerCase().trim()) ||
        String(r.number).includes(searchPreview.trim());
      return matchTurma && matchSearch;
    });
  }, [parsedRows, previewFilterTurma, searchPreview]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-5xl mx-auto w-full space-y-5">
        {/* Header Banner */}
        <div className="bg-linear-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Assistente de Criação & Importação
                </span>
                <span className="text-xs text-indigo-300">5.º Ano TIC</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                {language === 'pt' ? 'Importar Alunos por Excel (.xls / .xlsx), PDF ou Colar' : 'Import Students via Excel (.xls / .xlsx), PDF or Paste'}
              </h2>
            </div>
          </div>

          <div className="text-xs text-indigo-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
            {language === 'pt' ? 'Seguro & Sem Nomes Truncados' : 'GDPR Compliant & Full Names'}
          </div>
        </div>

        {/* POST-IMPORT SUCCESS RESULT CARD */}
        {importResult && (
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-md space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'pt'
                    ? `🎉 ${importResult.summary.createdCount} Alunos Criados com Sucesso na Base de Dados!`
                    : `🎉 ${importResult.summary.createdCount} Students Successfully Created!`}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {importResult.wipedBefore && (
                    <span className="text-emerald-700 font-semibold mr-2">
                      🧹 A base de dados foi limpa antes da criação.
                    </span>
                  )}
                  Todas as contas, utilizadores e palavras-passe amigáveis foram gerados com nomes completos e sem erros.
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToCredentials}
                className="p-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-5 h-5" />
                <span>{language === 'pt' ? 'Ver Cartões de Acesso (Imprimir A4)' : 'View Printable Cards (A4)'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (importResult.created.length > 0) {
                    exportCreatedCredentialsToExcel(importResult.created, 'Recentes');
                  }
                }}
                className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>{language === 'pt' ? 'Descarregar Excel de Credenciais' : 'Download Credentials XLS'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onNavigateToStudents) onNavigateToStudents();
                  handleReset();
                }}
                className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Users className="w-5 h-5" />
                <span>{language === 'pt' ? 'Ver Pauta de Alunos' : 'View Students Roster'}</span>
              </button>
            </div>

            {/* Summary details */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
              <div>
                <strong>Total de Alunos:</strong> {importResult.summary.createdCount} novos criados
                {importResult.summary.updatedCount ? `, ${importResult.summary.updatedCount} atualizados` : ''}
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
              >
                Importar outro ficheiro
              </button>
            </div>
          </div>
        )}

        {/* INPUT AND PREVIEW SECTION (Visible when not showing results) */}
        {!importResult && (
          <div className="space-y-5">
            {/* Step 1: Input controls */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
              {/* Mode switch */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMode('upload');
                      setParseError(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeMode === 'upload'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Carregar Ficheiro (Excel .xls / .xlsx, PDF, ZIP)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMode('paste');
                      setParseError(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeMode === 'paste'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <ClipboardPaste className="w-4 h-4" />
                    <span>Colar Lista de Alunos (Texto / PDF)</span>
                  </button>
                </div>

                {/* Default Turma Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">
                    Turma padrão:
                  </span>
                  <select
                    value={defaultTurma}
                    onChange={(e) => setDefaultTurma(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    {turmasList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mode A: Upload File */}
              {activeMode === 'upload' && (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('admin-student-file-input')?.click()}
                  className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/20 hover:bg-indigo-50/50 rounded-2xl p-6 sm:p-10 text-center transition-all flex flex-col items-center justify-center cursor-pointer group"
                >
                  <input
                    id="admin-student-file-input"
                    type="file"
                    accept=".xls,.xlsx,.csv,.pdf,.zip"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors shadow-xs">
                    {parsing ? (
                      <RefreshCw className="w-8 h-8 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8" />
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-black text-slate-900">
                    {parsing
                      ? 'A ler e a extrair alunos do ficheiro Excel / PDF...'
                      : selectedFile
                      ? `Ficheiro carregado: ${selectedFile.name}`
                      : 'Arrasta o teu ficheiro Excel (.xls / .xlsx), PDF ou ZIP para aqui'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-md">
                    Suporta ficheiros de agrupamento com múltiplas turmas (ex: 5.º A, 5.º B, 5.º C...), cabeçalhos personalizados e listas de alunos oficiais.
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 flex-wrap justify-center">
                    {['.XLSX', '.XLS', '.CSV', '.PDF', '.ZIP'].map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] font-black"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode B: Paste Text */}
              {activeMode === 'paste' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Copia os nomes do ficheiro da escola e cola aqui:
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Suporta números no início (ex: "1. Afonso Henriques")
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder={`1 Afonso Henriques Silva\n2 Beatriz Maria Santos\n3 Carlos Eduardo Ferreira\n...`}
                    className="w-full p-3 font-mono text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleParsePastedText}
                      disabled={!pastedText.trim() || parsing}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Processar Texto</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Import Strategy: Preserve Other Classes vs Wipe */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Modo de Importação & Gestão de Turmas:
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Múltiplas Turmas Ativo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Option 1: Cumulative / Add without wiping (DEFAULT) */}
                  <label
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      !wipeFirst
                        ? 'bg-emerald-50/60 border-emerald-500 text-emerald-950 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="import-mode-strategy"
                      checked={!wipeFirst}
                      onChange={() => setWipeFirst(false)}
                      className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="text-xs space-y-1">
                      <strong className="block font-black text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Acumular & Manter Outras Turmas (Padrão)</span>
                      </strong>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Preserva todos os alunos já importados das outras turmas (ex: 5.º A, 5.º B, 5.º C...). Adiciona os novos alunos e atualiza sem apagar ninguém.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Full wipe */}
                  <label
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      wipeFirst
                        ? 'bg-rose-50/60 border-rose-500 text-rose-950 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="import-mode-strategy"
                      checked={wipeFirst}
                      onChange={() => setWipeFirst(true)}
                      className="mt-1 w-4 h-4 text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <div className="text-xs space-y-1">
                      <strong className="block font-black text-rose-900 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Substituir Toda a Base de Alunos</span>
                      </strong>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Apaga todos os alunos anteriores para iniciar um ano letivo do zero. <em>(A conta da professora Carla permanece sempre ativa).</em>
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error display */}
              {parseError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Atenção ao processar ficheiro:</strong>
                    <p className="mt-0.5">{parseError}</p>
                  </div>
                </div>
              )}

              {/* Sheets detected info */}
              {processedSheets.length > 0 && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong>Folhas / Turmas identificadas:</strong> {processedSheets.join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* PREVIEW AND CREATION CARD */}
            {parsedRows.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4 animate-in fade-in">
                {/* Header of preview */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <span>{parsedRows.length} Alunos Detetados para Criação</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Revê a lista antes de avançar. Podes corrigir nomes, alterar turmas ou remover linhas.
                    </p>
                  </div>

                  {/* Primary Import Button */}
                  <button
                    type="button"
                    onClick={handleStartImport}
                    disabled={importing || parsedRows.length === 0}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {importing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>A criar contas na base de dados...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Criar {parsedRows.length} Alunos na Base de Dados</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Turmas Pills Summary */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                    Filtrar pré-visualização:
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewFilterTurma('all')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      previewFilterTurma === 'all'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Todas as Turmas ({parsedRows.length})
                  </button>
                  {uniqueTurmas.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPreviewFilterTurma(t)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        previewFilterTurma === t
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{t}</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/30 text-current font-black">
                        {byTurmaCounts[t]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Table search */}
                <div className="pt-2">
                  <input
                    type="text"
                    value={searchPreview}
                    onChange={(e) => setSearchPreview(e.target.value)}
                    placeholder="Pesquisar na lista pré-visualizada..."
                    className="w-full max-w-xs px-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto max-h-96 rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-black sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3 w-12 text-center">N.º</th>
                        <th className="py-2.5 px-4">Nome Completo do Aluno</th>
                        <th className="py-2.5 px-3 w-28">Turma</th>
                        <th className="py-2.5 px-3 w-28 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPreviewRows.map((row, idx) => {
                        const originalIndex = parsedRows.indexOf(row);
                        const isEditing = editingRowIndex === originalIndex;

                        return (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2 px-3 text-center font-bold text-slate-400">
                              {row.number}
                            </td>
                            <td className="py-2 px-4">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editRowName}
                                  onChange={(e) => setEditRowName(e.target.value)}
                                  className="w-full px-2 py-1 rounded-md border border-indigo-400 bg-white text-xs font-bold text-slate-800"
                                />
                              ) : (
                                <span className="font-bold text-slate-900">{row.name}</span>
                              )}
                            </td>
                            <td className="py-2 px-3">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editRowTurma}
                                  onChange={(e) => setEditRowTurma(e.target.value)}
                                  className="w-full px-2 py-1 rounded-md border border-indigo-400 bg-white text-xs font-bold text-slate-800"
                                />
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-black text-[11px] border border-indigo-100">
                                  {row.turma}
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-right">
                              {isEditing ? (
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => saveEditRow(originalIndex)}
                                    className="p-1 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 cursor-pointer"
                                    title="Guardar"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingRowIndex(null)}
                                    className="p-1 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                                    title="Cancelar"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => startEditRow(originalIndex, row)}
                                    className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                                    title="Editar nome ou turma"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteRow(originalIndex)}
                                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                                    title="Remover linha"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
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
      </div>
    </div>
  );
};
