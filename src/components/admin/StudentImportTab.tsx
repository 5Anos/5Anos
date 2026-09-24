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
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { User, Language } from '../../types';
import { api } from '../../services/api';

interface StudentImportTabProps {
  turmasList: string[];
  existingStudents: User[];
  language: Language;
  onImportSuccess: () => void;
  onNavigateToCredentials: () => void;
}

interface ParsedStudentRow {
  name: string;
  turma: string;
  matchedExistingStudent?: User;
  actionType: 'update_name' | 'already_complete' | 'create_new';
}

export const StudentImportTab: React.FC<StudentImportTabProps> = ({
  turmasList,
  existingStudents,
  language,
  onImportSuccess,
  onNavigateToCredentials,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'paste'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [defaultTurma, setDefaultTurma] = useState<string>(turmasList[0] || '5.º A');
  const [pastedText, setPastedText] = useState<string>('');
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [zipFilesProcessed, setZipFilesProcessed] = useState<string[]>([]);

  // Wipe database options
  const [wipeFirst, setWipeFirst] = useState<boolean>(true);
  const [showConfirmWipeModal, setShowConfirmWipeModal] = useState<boolean>(false);
  const [wipingDatabase, setWipingDatabase] = useState<boolean>(false);
  const [wipeMessage, setWipeMessage] = useState<string | null>(null);

  // Result state
  const [importResult, setImportResult] = useState<{
    success: boolean;
    wipedBefore?: boolean;
    wipedStats?: { deletedCount: number; purgedResidualsCount: number };
    summary: { totalInFile: number; createdCount: number; updatedCount?: number; existedCount: number; errorsCount: number };
    created: Array<{ id: string; name: string; turma: string; username: string; password?: string }>;
    updated?: Array<{ id: string; oldName?: string; name: string; turma: string; username: string }>;
    existed: Array<{ name: string; turma: string; username: string }>;
    errors: Array<{ name?: string; turma?: string; error: string }>;
  } | null>(null);

  // Helper to match a raw student name to existing students
  const matchStudent = (rawName: string, turma: string): { matched?: User; actionType: 'update_name' | 'already_complete' | 'create_new' } => {
    if (wipeFirst) {
      return { actionType: 'create_new' };
    }

    const clean = rawName.replace(/^\d+[\s\.\-\)]+\s*/, '').trim().toLowerCase();
    const cleanBase = clean.replace(/\s+[a-z]$/i, '').trim();

    const inTurma = existingStudents.filter(
      (s) => (s.turma || '').trim().toLowerCase() === turma.trim().toLowerCase()
    );

    // Exact match
    const exact = inTurma.find((s) => {
      const fn = (s.fullName || s.name || '').trim().toLowerCase();
      const n = (s.name || '').trim().toLowerCase();
      return fn === clean || n === clean;
    });

    if (exact) {
      const currentFull = (exact.fullName || exact.name || '').trim();
      if (rawName.trim().length > currentFull.length) {
        return { matched: exact, actionType: 'update_name' };
      }
      return { matched: exact, actionType: 'already_complete' };
    }

    // Prefix / truncated match (e.g. existing "José Júlio d" vs pasted "José Júlio de Almeida")
    const prefixMatch = inTurma.find((s) => {
      const existingName = (s.name || s.fullName || '').trim().toLowerCase();
      const exBase = existingName.replace(/\s+[a-z]$/i, '').trim();
      return (
        (exBase.length >= 4 && clean.startsWith(exBase)) ||
        (cleanBase.length >= 4 && existingName.startsWith(cleanBase))
      );
    });

    if (prefixMatch) {
      return { matched: prefixMatch, actionType: 'update_name' };
    }

    return { actionType: 'create_new' };
  };

  // Live parsed rows when in 'paste' mode
  const pasteParsedRows = useMemo<ParsedStudentRow[]>(() => {
    if (activeMode !== 'paste' || !pastedText.trim()) return [];

    const lines = pastedText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const rows: ParsedStudentRow[] = [];

    for (const line of lines) {
      // Clean leading numbers like "1 - ", "1. ", "1\t"
      const cleaned = line.replace(/^\d+[\s\.\-\)\t]+\s*/, '').trim();
      // Skip headers like "Nº Nome Turma"
      if (!cleaned || /^(n[º\.]|nome|turma|aluno|student)/i.test(cleaned)) continue;

      const { matched, actionType } = matchStudent(cleaned, defaultTurma);

      rows.push({
        name: cleaned,
        turma: defaultTurma,
        matchedExistingStudent: matched,
        actionType,
      });
    }

    return rows;
  }, [activeMode, pastedText, defaultTurma, existingStudents, wipeFirst]);

  // File Upload handler (ZIP, PDF, XLSX, XLS, CSV)
  const [fileParsedRows, setFileParsedRows] = useState<ParsedStudentRow[]>([]);

  const processFile = async (file: File) => {
    setSelectedFile(file);
    setParseError(null);
    setImportResult(null);
    setParsing(true);
    setZipFilesProcessed([]);

    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    // 1. If PDF or ZIP: parse via server PDF/ZIP engine!
    if (ext === '.pdf' || ext === '.zip') {
      try {
        const reader = new FileReader();
        reader.onload = async (evt) => {
          try {
            const dataUrl = (evt.target?.result as string) || '';
            const res = await api.parseStudentsFile(dataUrl, file.name, defaultTurma);

            if (!res.students || res.students.length === 0) {
              throw new Error(
                `Não foi possível detetar alunos no ficheiro ${file.name}. Certifica-te de que o ficheiro contém a lista de alunos com nomes legíveis.`
              );
            }

            setZipFilesProcessed(res.filesProcessed || []);

            const rows: ParsedStudentRow[] = res.students.map((s) => {
              const cleanedName = s.name.trim();
              const turma = s.turma || defaultTurma;
              const { matched, actionType } = matchStudent(cleanedName, turma);
              return {
                name: cleanedName,
                turma,
                matchedExistingStudent: matched,
                actionType: wipeFirst ? 'create_new' : actionType,
              };
            });

            setFileParsedRows(rows);
          } catch (err: any) {
            console.error('File parse error:', err);
            setParseError(err.message || 'Erro ao processar ficheiro PDF / ZIP.');
          } finally {
            setParsing(false);
          }
        };

        reader.onerror = () => {
          setParseError('Erro ao ler o ficheiro localmente.');
          setParsing(false);
        };

        reader.readAsDataURL(file);
      } catch (err: any) {
        setParseError(err.message || 'Erro ao ler o ficheiro.');
        setParsing(false);
      }
      return;
    }

    // 2. If Excel / CSV: parse directly or via XLSX
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

        if (!data || data.length === 0) {
          throw new Error('O ficheiro parece estar vazio ou não contém dados legíveis.');
        }

        const rows: ParsedStudentRow[] = [];

        for (const item of data) {
          let rawName =
            item['Nome Completo'] ||
            item['Nome do Aluno'] ||
            item.Nome ||
            item.nome ||
            item.Aluno ||
            item.aluno ||
            item.Name ||
            item.name ||
            item.Student ||
            '';

          if (!rawName) {
            const values = Object.values(item).map((v) => String(v).trim());
            const candidate = values.find((v) => v.length > 2 && !v.includes('@') && !/^\d+$/.test(v));
            if (candidate) rawName = candidate;
          }

          rawName = String(rawName).trim();
          if (!rawName) continue;

          let rawTurma =
            item.Turma ||
            item.turma ||
            item['Ano/Turma'] ||
            item.Ano ||
            item.Class ||
            defaultTurma;

          rawTurma = String(rawTurma).trim() || defaultTurma;

          const cleanedName = rawName.replace(/^\d+[\s\.\-\)]+\s*/, '').trim();
          const { matched, actionType } = matchStudent(cleanedName, rawTurma);

          rows.push({
            name: cleanedName,
            turma: rawTurma,
            matchedExistingStudent: matched,
            actionType: wipeFirst ? 'create_new' : actionType,
          });
        }

        if (rows.length === 0) {
          throw new Error('Não foi possível identificar nomes de alunos nas colunas do ficheiro.');
        }

        setFileParsedRows(rows);
      } catch (err: any) {
        console.error('File parse error:', err);
        setParseError(err.message || 'Erro ao processar ficheiro Excel.');
      } finally {
        setParsing(false);
      }
    };

    reader.onerror = () => {
      setParseError('Erro ao ler o ficheiro.');
      setParsing(false);
    };

    reader.readAsBinaryString(file);
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

  const currentRows = activeMode === 'paste' ? pasteParsedRows : fileParsedRows;

  // Direct wipe of student database
  const handleDirectWipeDatabase = async () => {
    setWipingDatabase(true);
    setWipeMessage(null);
    try {
      const res = await api.adminDeleteAllStudents();
      setWipeMessage(
        `Base de dados limpa com sucesso: ${res.deletedCount} contas de alunos foram eliminadas. A conta de professora continua 100% ativa!`
      );
      setShowConfirmWipeModal(false);
      onImportSuccess();
    } catch (err: any) {
      console.error('Direct wipe error:', err);
      setParseError(err.message || 'Erro ao limpar a base de dados.');
    } finally {
      setWipingDatabase(false);
    }
  };

  // Import Action
  const handleStartImport = async () => {
    if (currentRows.length === 0) return;
    setImporting(true);
    setParseError(null);

    try {
      const res = await api.importStudentsBatch(
        currentRows.map((r) => ({ name: r.name, turma: r.turma })),
        defaultTurma,
        wipeFirst
      );

      setImportResult({
        success: true,
        wipedBefore: res.wipedBefore,
        wipedStats: res.wipedStats,
        summary: res.summary,
        created: res.created || [],
        updated: res.updated || [],
        existed: res.existed || [],
        errors: res.errors || [],
      });

      onImportSuccess();
    } catch (err: any) {
      console.error('Batch import error:', err);
      setParseError(err.message || 'Erro ao atualizar / criar contas dos alunos.');
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPastedText('');
    setFileParsedRows([]);
    setZipFilesProcessed([]);
    setImportResult(null);
    setParseError(null);
    setWipeMessage(null);
  };

  const updateCount = currentRows.filter((r) => r.actionType === 'update_name').length;
  const newCount = currentRows.filter((r) => r.actionType === 'create_new').length;
  const readyCount = currentRows.filter((r) => r.actionType === 'already_complete').length;

  // Group currentRows by Turma for convenient preview
  const byTurmaSummary = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of currentRows) {
      counts[r.turma] = (counts[r.turma] || 0) + 1;
    }
    return counts;
  }, [currentRows]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Banner Explanatório */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'pt'
                  ? 'Importação de Alunos (ZIP, PDF, Excel) & Nomes Completos'
                  : 'Student Import (ZIP, PDF, Excel) & Full Names'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Carrega o teu ficheiro <strong>5TIC_PDFs.zip</strong> (ou ficheiros PDF / Excel individuais) ou cola a lista diretamente do PDF. O sistema extrai automaticamente todas as turmas e nomes completos sem cortes, e permite apagar e recriar os utilizadores de raiz na base de dados com zero erros.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmWipeModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
            title="Apaga todas as contas antigas de alunos da BD"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Limpar BD Alunos</span>
          </button>
        </div>

        {/* Wipe feedback message */}
        {wipeMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Base de Dados Limpa!</p>
              <p className="mt-0.5">{wipeMessage}</p>
            </div>
          </div>
        )}

        {/* Step 1: Input Form (hidden if showing results) */}
        {!importResult && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
            {/* Mode Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
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
                <FileArchive className="w-4 h-4" />
                <span>Carregar Ficheiro (ZIP, PDF, Excel)</span>
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
                <span>Colar Lista do PDF / Texto</span>
              </button>
            </div>

            {/* Turma Selector */}
            <div className="max-w-xs">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Turma Pré-definida (se não detetada no ficheiro):
              </label>
              <select
                value={defaultTurma}
                onChange={(e) => setDefaultTurma(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {turmasList.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode A: Upload File (ZIP, PDF, XLSX, CSV) */}
            {activeMode === 'upload' && (
              <div className="space-y-4">
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 rounded-2xl p-6 sm:p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('student-file-input')?.click()}
                >
                  <input
                    id="student-file-input"
                    type="file"
                    accept=".zip,.pdf,.xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                    {parsing ? (
                      <RefreshCw className="w-8 h-8 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8" />
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {parsing
                      ? 'A descompactar ZIP e a extrair alunos dos ficheiros...'
                      : selectedFile
                      ? `Ficheiro: ${selectedFile.name}`
                      : 'Clica aqui ou arrasta o ficheiro 5TIC_PDFs.zip, PDFs ou Excel'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-md">
                    Formatos suportados: <strong>.ZIP</strong> (contendo vários PDFs de turmas), <strong>.PDF</strong> (pautas/listas de alunos), <strong>.XLSX</strong>, <strong>.XLS</strong> ou <strong>.CSV</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Mode B: Paste Text from PDF */}
            {activeMode === 'paste' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Copia os Nomes Completos do PDF e cola aqui (um por linha):
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Suporta números à frente (ex: "1. José Júlio de Almeida")
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder={`Exemplo (pode colar diretamente da tabela do PDF):\n1 Anderson Oliveira Silva\n2 Artur Pawel Kowalski\n...\n14 José Júlio de Almeida`}
                  className="w-full p-3.5 font-mono text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            )}

            {/* Wipe First Option Toggle */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
              <input
                type="checkbox"
                id="wipe-db-first"
                checked={wipeFirst}
                onChange={(e) => setWipeFirst(e.target.checked)}
                className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="wipe-db-first" className="text-xs sm:text-sm text-amber-900 cursor-pointer">
                <strong className="block text-amber-950 font-bold mb-0.5">
                  🧹 Apagar tudo na BD antes de criar (Recomendado)
                </strong>
                Elimina todas as contas antigas com nomes truncados e cria os novos utilizadores de raiz na base de dados com nomes completos e zero erros. A conta da professora Carla Oliveira fica 100% preservada.
              </label>
            </div>

            {/* Parsing error */}
            {parseError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{parseError}</span>
              </div>
            )}

            {/* Files in ZIP info */}
            {zipFilesProcessed.length > 0 && (
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center gap-2">
                <FileArchive className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>{zipFilesProcessed.length} ficheiros descompactados do ZIP:</strong>{' '}
                  {zipFilesProcessed.join(', ')}
                </span>
              </div>
            )}

            {/* Preview of rows detected */}
            {currentRows.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Alunos Analisados ({currentRows.length})
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    {Object.entries(byTurmaSummary).map(([turma, count]) => (
                      <span
                        key={turma}
                        className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200"
                      >
                        {turma}: {count}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                  {currentRows.map((row, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 flex items-center justify-between ${
                        wipeFirst
                          ? 'bg-white'
                          : row.actionType === 'update_name'
                          ? 'bg-amber-50/50'
                          : row.actionType === 'create_new'
                          ? 'bg-white'
                          : 'bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <span className="font-mono text-slate-400 w-6 shrink-0">{idx + 1}.</span>
                        <div className="truncate">
                          <span className="font-bold text-slate-900">{row.name}</span>
                          {!wipeFirst && row.actionType === 'update_name' && row.matchedExistingStudent && (
                            <span className="ml-2 text-[11px] text-amber-800 italic">
                              (substituirá o nome "{row.matchedExistingStudent.fullName || row.matchedExistingStudent.name}")
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[11px]">
                          {row.turma}
                        </span>
                        {wipeFirst ? (
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                            Novo Utilizador
                          </span>
                        ) : row.actionType === 'update_name' ? (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Atualizar Nome Completo
                          </span>
                        ) : row.actionType === 'create_new' ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Novo Aluno
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">
                            Nome já atualizado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Import Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    {wipeFirst
                      ? '🧹 A base de dados será limpa e todos os alunos serão criados de raiz.'
                      : `A atualizar ${updateCount} nomes e a criar ${newCount} contas novas.`}
                  </p>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Limpar
                    </button>
                    <button
                      type="button"
                      disabled={importing}
                      onClick={handleStartImport}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 text-white ${
                        wipeFirst
                          ? 'bg-rose-600 hover:bg-rose-700'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {importing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>
                            {wipeFirst
                              ? 'A limpar BD e a criar utilizadores...'
                              : 'A processar alunos...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {wipeFirst
                              ? `🧹 Apagar BD e Criar ${currentRows.length} Alunos`
                              : `Gravar (${updateCount} Atualizações, ${newCount} Novos)`}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Import Result Summary */}
        {importResult && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6 animate-in fade-in">
            {/* Success Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {importResult.wipedBefore
                    ? 'Base de Dados Limpa e Utilizadores Criados de Raiz!'
                    : 'Nomes de Alunos Atualizados com Sucesso!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {importResult.wipedBefore
                    ? `Foram eliminados ${importResult.wipedStats?.deletedCount || 0} utilizadores antigos e criados ${importResult.created.length} utilizadores limpos com os nomes completos.`
                    : 'Os nomes completos oficiais foram registados na base de dados. Todos os ficheiros exportados conterão agora o nome integral dos alunos.'}
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xs text-slate-500 font-semibold uppercase">Total Ficheiro</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{importResult.summary.totalInFile}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <p className="text-xs text-emerald-700 font-semibold uppercase">Contas Criadas</p>
                <p className="text-2xl font-black text-emerald-800 mt-1">{importResult.summary.createdCount}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <p className="text-xs text-amber-800 font-semibold uppercase flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Nomes Atualizados
                </p>
                <p className="text-2xl font-black text-amber-900 mt-1">{importResult.summary.updatedCount ?? 0}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xs text-slate-500 font-semibold uppercase">Erros</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{importResult.summary.errorsCount}</p>
              </div>
            </div>

            {/* Table of created accounts with full credentials */}
            {importResult.created && importResult.created.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Utilizadores Criados com Nome Completo ({importResult.created.length}):
                </h4>
                <div className="max-h-56 overflow-y-auto border border-emerald-200 rounded-xl divide-y divide-emerald-100 text-xs bg-emerald-50/20">
                  {importResult.created.map((c) => (
                    <div key={c.id} className="p-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{c.name}</span>
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                          {c.turma}
                        </span>
                        <span className="ml-2 font-mono text-[11px] text-slate-500">
                          @{c.username}
                        </span>
                      </div>
                      {c.password && (
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                          {c.password}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps CTA */}
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-indigo-950">
                  Tudo pronto e configurado sem erros!
                </p>
                <p className="text-xs text-indigo-800">
                  Podes aceder à secção de Credenciais para descarregar o Excel completo com todos os Nomes, Utilizadores e Palavras-passe.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Importar Mais
                </button>
                <button
                  type="button"
                  onClick={onNavigateToCredentials}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Ver e Descarregar Excel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal to Wipe Database */}
        {showConfirmWipeModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-rose-100">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div className="text-center">
                <h3 className="text-base font-black text-slate-900">
                  Apagar Todas as Contas de Alunos da BD?
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Esta ação irá apagar <strong>todas as contas de alunos</strong> e respetivos resíduos na base de dados, permitindo criar a lista limpa com nomes completos sem conflitos.
                </p>
                <p className="text-xs font-bold text-emerald-700 mt-2 bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200">
                  ✓ A tua conta de professora (Carla Oliveira) permanecerá 100% segura e intacta.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowConfirmWipeModal(false)}
                  disabled={wipingDatabase}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDirectWipeDatabase}
                  disabled={wipingDatabase}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {wipingDatabase ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>A apagar alunos...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Sim, Apagar Tudo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
