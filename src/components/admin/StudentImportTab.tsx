import React, { useState } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Users,
  KeyRound,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  FolderPlus,
  Check,
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
  isDuplicateInDB: boolean;
}

export const StudentImportTab: React.FC<StudentImportTabProps> = ({
  turmasList,
  existingStudents,
  language,
  onImportSuccess,
  onNavigateToCredentials,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [defaultTurma, setDefaultTurma] = useState<string>(turmasList[0] || '5.º A');
  const [parsedRows, setParsedRows] = useState<ParsedStudentRow[]>([]);
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Result state
  const [importResult, setImportResult] = useState<{
    summary: { totalInFile: number; createdCount: number; existedCount: number; errorsCount: number };
    created: Array<{ id: string; name: string; turma: string; username: string; password: string }>;
    existed: Array<{ name: string; turma: string; username: string }>;
    errors: Array<{ name?: string; turma?: string; error: string }>;
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setParseError(null);
    setImportResult(null);
    setParsing(true);

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

        const existingMap = new Set(
          existingStudents.map((s) => `${(s.turma || '').trim().toLowerCase()}__${(s.name || '').trim().toLowerCase()}`)
        );

        const rows: ParsedStudentRow[] = [];

        for (const item of data) {
          // Identify name column
          let rawName =
            item.Nome ||
            item.nome ||
            item['Nome do Aluno'] ||
            item['Nome Completo'] ||
            item.Aluno ||
            item.aluno ||
            item.Name ||
            item.name ||
            item.Student ||
            '';

          // If no specific header matched, check if any column value looks like a name
          if (!rawName) {
            const values = Object.values(item).map((v) => String(v).trim());
            const candidate = values.find((v) => v.length > 2 && !v.includes('@') && !/^\d+$/.test(v));
            if (candidate) rawName = candidate;
          }

          rawName = String(rawName).trim();
          if (!rawName) continue;

          // Identify turma column
          let rawTurma =
            item.Turma ||
            item.turma ||
            item['Ano/Turma'] ||
            item.Ano ||
            item.Class ||
            defaultTurma;

          rawTurma = String(rawTurma).trim() || defaultTurma;

          const key = `${rawTurma.toLowerCase()}__${rawName.toLowerCase()}`;
          const isDuplicate = existingMap.has(key);

          rows.push({
            name: rawName,
            turma: rawTurma,
            isDuplicateInDB: isDuplicate,
          });
        }

        if (rows.length === 0) {
          throw new Error('Não foi possível identificar nomes de alunos nas colunas do ficheiro.');
        }

        setParsedRows(rows);
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

  const handleStartImport = async () => {
    if (parsedRows.length === 0) return;
    setImporting(true);
    setParseError(null);

    try {
      const res = await api.importStudentsBatch(
        parsedRows.map((r) => ({ name: r.name, turma: r.turma })),
        defaultTurma
      );

      setImportResult({
        summary: res.summary,
        created: res.created || [],
        existed: res.existed || [],
        errors: res.errors || [],
      });

      onImportSuccess();
    } catch (err: any) {
      console.error('Batch import error:', err);
      setParseError(err.message || 'Erro ao criar contas dos alunos.');
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setParsedRows([]);
    setImportResult(null);
    setParseError(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Banner Explanatório */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'pt' ? 'Importação Automática de Turmas e Alunos (XLS / XLSX)' : 'Import Students from Excel'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Carrega o ficheiro Excel com os nomes dos teus alunos. O sistema analisa a folha, cria as contas com nomes de utilizador únicos e gera palavras-passe simples (fáceis de digitar por alunos de 10 anos). Se carregares o ficheiro novamente, não haverá duplicações.
            </p>
          </div>
        </div>

        {/* Step 1: Upload File & Settings (shown if no import result yet) */}
        {!importResult && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              {/* Default Turma */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Turma predefinida (se o ficheiro não tiver coluna 'Turma'):
                </label>
                <select
                  value={defaultTurma}
                  onChange={(e) => setDefaultTurma(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  {turmasList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Selecionar Ficheiro Excel (.xlsx, .xls, .csv):
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    className="block w-full text-xs sm:text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Parsing error */}
            {parseError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{parseError}</span>
              </div>
            )}

            {/* Preview of rows detected */}
            {parsedRows.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Alunos detetados no ficheiro ({parsedRows.length})
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {parsedRows.filter((r) => !r.isDuplicateInDB).length} novos
                    </span>
                    <span className="text-slate-500 font-medium">
                      {parsedRows.filter((r) => r.isDuplicateInDB).length} já na base de dados
                    </span>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                  {parsedRows.map((row, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 flex items-center justify-between ${
                        row.isDuplicateInDB ? 'bg-slate-50 text-slate-500' : 'bg-white text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 w-6">{idx + 1}.</span>
                        <span className="font-semibold">{row.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[11px]">
                          {row.turma}
                        </span>
                        {row.isDuplicateInDB ? (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Já existente
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Novo aluno
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Import Action Button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={importing}
                    onClick={handleStartImport}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {importing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>A criar contas...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Confirmar e Criar {parsedRows.filter((r) => !r.isDuplicateInDB).length} Contas</span>
                      </>
                    )}
                  </button>
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
                  Importação Concluída com Sucesso!
                </h3>
                <p className="text-xs text-slate-500">
                  O ficheiro foi processado e as credenciais foram geradas de forma segura.
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xs text-slate-500 font-semibold uppercase">Total no Ficheiro</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{importResult.summary.totalInFile}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <p className="text-xs text-emerald-700 font-semibold uppercase">Contas Criadas</p>
                <p className="text-2xl font-black text-emerald-800 mt-1">{importResult.summary.createdCount}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <p className="text-xs text-amber-700 font-semibold uppercase">Já Existiam</p>
                <p className="text-2xl font-black text-amber-800 mt-1">{importResult.summary.existedCount}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xs text-slate-500 font-semibold uppercase">Erros / Ignorados</p>
                <p className="text-2xl font-black text-slate-700 mt-1">{importResult.summary.errorsCount}</p>
              </div>
            </div>

            {/* Table of newly created accounts */}
            {importResult.created.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Novas contas criadas ({importResult.created.length}):
                </h4>
                <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                  {importResult.created.map((c) => (
                    <div key={c.id} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <span className="font-bold text-slate-900">{c.name}</span>
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                          {c.turma}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-slate-600">Utilizador: <strong>{c.username}</strong></span>
                        <span className="text-indigo-700">Senha: <strong>{c.password}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps CTA */}
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-indigo-950">
                  Pronto para entregar as credenciais aos alunos?
                </p>
                <p className="text-xs text-indigo-800">
                  Clica abaixo para aceder à folha de cartões com linhas tracejadas prontas a recortar e imprimir.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Importar Outro Ficheiro
                </button>
                <button
                  type="button"
                  onClick={onNavigateToCredentials}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Ver e Imprimir Credenciais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
