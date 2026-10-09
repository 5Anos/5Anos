import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  X,
  Sparkles,
  Check,
  Copy,
  Printer,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  GraduationCap,
  ShieldCheck,
  User,
  Hash,
} from 'lucide-react';
import { User as UserType, Language } from '../../types';
import { api } from '../../services/api';
import {
  generateKidUsername,
  generateKidPassword,
  parseStudentName,
  normalizeTurmaName,
} from '../../utils/studentCredentials';

interface CreateSingleStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  turmasList: string[];
  defaultTurma?: string;
  language: Language;
  onStudentCreated: (newStudent: UserType & { password?: string }) => void;
}

export const CreateSingleStudentModal: React.FC<CreateSingleStudentModalProps> = ({
  isOpen,
  onClose,
  turmasList,
  defaultTurma = '5.º A',
  language,
  onStudentCreated,
}) => {
  const [fullName, setFullName] = useState('');
  const [turma, setTurma] = useState(defaultTurma);
  const [customTurma, setCustomTurma] = useState('');
  const [isCustomTurma, setIsCustomTurma] = useState(false);
  const [studentNumber, setStudentNumber] = useState<string>('');
  const [username, setUsername] = useState('');
  const [isUsernameCustom, setIsUsernameCustom] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Success state with created student details
  const [createdStudent, setCreatedStudent] = useState<(UserType & { password?: string }) | null>(null);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, defaultTurma]);

  const resetForm = () => {
    setFullName('');
    setTurma(defaultTurma || (turmasList[0] || '5.º A'));
    setCustomTurma('');
    setIsCustomTurma(false);
    setStudentNumber('');
    setUsername('');
    setIsUsernameCustom(false);
    setPassword(generateKidPassword(new Set()));
    setShowPassword(false);
    setErrorMsg(null);
    setCreatedStudent(null);
    setCopied(false);
  };

  // Auto-generate username when name or turma changes (if not manually edited)
  useEffect(() => {
    if (!isUsernameCustom && fullName.trim().length >= 2) {
      const activeTurma = isCustomTurma ? customTurma : turma;
      const parsed = parseStudentName(fullName.trim());
      const generated = generateKidUsername(parsed.fullName, activeTurma, new Set());
      setUsername(generated);
    }
  }, [fullName, turma, customTurma, isCustomTurma, isUsernameCustom]);

  if (!isOpen) return null;

  const handleRegeneratePassword = () => {
    setPassword(generateKidPassword(new Set()));
  };

  const handleRegenerateUsername = () => {
    const activeTurma = isCustomTurma ? customTurma : turma;
    const parsed = parseStudentName(fullName.trim() || 'Aluno Novo');
    const gen = generateKidUsername(parsed.fullName, activeTurma, new Set());
    setUsername(gen);
    setIsUsernameCustom(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = fullName.trim();
    if (cleanName.length < 2) {
      setErrorMsg(language === 'pt' ? 'O nome do aluno deve ter pelo menos 2 caracteres.' : 'Student name must have at least 2 characters.');
      return;
    }

    const resolvedTurma = normalizeTurmaName(isCustomTurma ? customTurma : turma);
    if (!resolvedTurma) {
      setErrorMsg(language === 'pt' ? 'Por favor seleciona ou indica uma turma válida.' : 'Please select or specify a valid class.');
      return;
    }

    const parsedNum = studentNumber.trim() ? parseInt(studentNumber.trim(), 10) : undefined;
    if (parsedNum !== undefined && (isNaN(parsedNum) || parsedNum <= 0 || parsedNum > 99)) {
      setErrorMsg(language === 'pt' ? 'O número do aluno deve ser entre 1 e 99.' : 'Student number must be between 1 and 99.');
      return;
    }

    const cleanUsername = username.trim().toLowerCase() || generateKidUsername(cleanName, resolvedTurma, new Set());
    const cleanPassword = password.trim() || generateKidPassword(new Set());

    setLoading(true);
    try {
      const res = await api.adminCreateSingleStudent({
        name: cleanName,
        turma: resolvedTurma,
        number: parsedNum,
        username: cleanUsername,
        password: cleanPassword,
      });

      if (res.success && res.student) {
        setCreatedStudent(res.student);
        onStudentCreated(res.student);
      } else {
        throw new Error(res.message || 'Erro ao criar o aluno.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || (language === 'pt' ? 'Ocorreu um erro ao criar a conta do aluno.' : 'An error occurred while creating the student.'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!createdStudent) return;
    const textToCopy = `Plataforma TIC 5 — Descomplica!
Aluno: ${createdStudent.fullName || createdStudent.name}
Turma: ${createdStudent.turma}${createdStudent.number ? ` (N.º ${createdStudent.number})` : ''}
Utilizador: ${createdStudent.username}
Palavra-passe: ${createdStudent.password || password}
Website: ${window.location.origin}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        {/* Modal Header */}
        <div className="p-5 bg-linear-to-r from-indigo-700 via-indigo-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-200">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {language === 'pt' ? 'Área da Professora' : 'Teacher Area'}
              </div>
              <h3 className="text-lg font-black text-white mt-0.5">
                {language === 'pt' ? 'Criar Aluno Individual' : 'Create Individual Student'}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[80vh]">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold">{errorMsg}</div>
            </div>
          )}

          {/* SUCCESS VIEW (Card Created) */}
          {createdStudent ? (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black">
                    {language === 'pt' ? 'Aluno Criado com Sucesso!' : 'Student Created Successfully!'}
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    {language === 'pt'
                      ? 'A conta está pronta e ativa. Entrega as credenciais abaixo ao aluno.'
                      : 'The account is ready and active. Hand the credentials to the student.'}
                  </p>
                </div>
              </div>

              {/* Printable Student Credential Card */}
              <div
                id="single-student-card-printable"
                className="p-5 bg-gradient-to-br from-indigo-50 via-white to-amber-50/40 rounded-2xl border-2 border-indigo-200 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center">
                      TIC
                    </span>
                    <span className="text-xs font-black text-indigo-950 uppercase tracking-wider">
                      Plataforma TIC 5 — Descomplica!
                    </span>
                  </div>
                  <span className="text-xs font-black text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                    {createdStudent.turma}
                  </span>
                </div>

                <div className="pt-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === 'pt' ? 'Nome do Aluno' : 'Student Name'}
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {createdStudent.fullName || createdStudent.name}
                      {createdStudent.number && (
                        <span className="text-xs font-bold text-indigo-600 ml-2">
                          (N.º {createdStudent.number})
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        {language === 'pt' ? 'Utilizador' : 'Username'}
                      </span>
                      <p className="text-xs sm:text-sm font-black font-mono text-indigo-700 mt-0.5 break-all select-all">
                        {createdStudent.username}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        {language === 'pt' ? 'Palavra-passe' : 'Password'}
                      </span>
                      <p className="text-xs sm:text-sm font-black font-mono text-emerald-700 mt-0.5 break-all select-all">
                        {createdStudent.password || password}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-center gap-2 text-[11px] text-amber-900">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      {language === 'pt'
                        ? 'O aluno pode entrar imediatamente com este utilizador e palavra-passe!'
                        : 'The student can log in right away with this username and password!'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions on created card */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyCredentials}
                  className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (language === 'pt' ? 'Copiado!' : 'Copied!') : (language === 'pt' ? 'Copiar Credenciais' : 'Copy Credentials')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintCard}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>{language === 'pt' ? 'Imprimir Cartão' : 'Print Card'}</span>
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{language === 'pt' ? '+ Criar Outro Aluno' : '+ Create Another'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'pt' ? 'Concluir' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            /* CREATION FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome Completo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'pt' ? 'Nome Completo do Aluno *' : 'Student Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ex.: Mariana Santos Silva"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {language === 'pt' ? 'Insere o nome completo tal como consta na pauta da escola.' : 'Enter student full name.'}
                </p>
              </div>

              {/* Turma & Número */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Turma */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{language === 'pt' ? 'Turma *' : 'Class *'}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCustomTurma(!isCustomTurma)}
                      className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      {isCustomTurma ? (language === 'pt' ? 'Escolher da lista' : 'Pick from list') : (language === 'pt' ? '+ Nova turma' : '+ Custom')}
                    </button>
                  </div>

                  {isCustomTurma ? (
                    <input
                      type="text"
                      value={customTurma}
                      onChange={(e) => setCustomTurma(e.target.value)}
                      placeholder="ex.: 5.º G"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  ) : (
                    <select
                      value={turma}
                      onChange={(e) => setTurma(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer"
                    >
                      {turmasList.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Número do Aluno na Turma */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    <span className="flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-slate-400" />
                      {language === 'pt' ? 'Número na Turma' : 'Class Number'}
                      <span className="text-slate-400 font-normal">({language === 'pt' ? 'opcional' : 'optional'})</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    placeholder="ex.: 14"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Utilizador (Username) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'pt' ? 'Nome de Utilizador (Login) *' : 'Username *'}
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateUsername}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    title="Regenerar sugestão automática"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{language === 'pt' ? 'Sugerir' : 'Suggest'}</span>
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs pointer-events-none">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''));
                      setIsUsernameCustom(true);
                    }}
                    placeholder="ex.: mariana.s.5a"
                    className="w-full pl-8 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {language === 'pt' ? 'O utilizador é gerado automaticamente mas pode ser personalizado.' : 'Generated automatically, can be customized.'}
                </p>
              </div>

              {/* Palavra-passe (Password) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'pt' ? 'Palavra-passe Inicial *' : 'Initial Password *'}
                  </label>
                  <button
                    type="button"
                    onClick={handleRegeneratePassword}
                    className="text-[10px] font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3 text-amber-600" />
                    <span>{language === 'pt' ? 'Gerar Outra' : 'Generate New'}</span>
                  </button>
                </div>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {language === 'pt'
                    ? 'Palavra-passe amiga de crianças de 5.º ano (fácil de memorizar e segura).'
                    : 'Kid-friendly password format (easy to remember and secure).'}
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {language === 'pt' ? 'Cancelar' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={loading || !fullName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{language === 'pt' ? 'A criar aluno...' : 'Creating student...'}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>{language === 'pt' ? 'Criar e Ativar Aluno' : 'Create & Activate'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
