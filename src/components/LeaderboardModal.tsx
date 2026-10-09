import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Medal,
  Users,
  Sparkles,
  Flame,
  Star,
  X,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  GraduationCap,
  Crown,
  Zap,
  ShieldCheck,
  Search,
  Filter,
  Lock,
  Eye,
} from 'lucide-react';
import { User, Language, TurmaRanking, StudentRanking } from '../types';
import { api, isUserAdmin } from '../services/api';
import { normalizeTurmaName } from '../utils/studentCredentials';
import { CartoonAvatar } from './avatar/CartoonAvatar';
import { getDefaultAvatar } from '../utils/avatarUtils';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  language: Language;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'turmas' | 'students'>('turmas');
  const [turmaRankings, setTurmaRankings] = useState<TurmaRanking[]>([]);
  const [studentRankings, setStudentRankings] = useState<StudentRanking[]>([]);
  const [loading, setLoading] = useState(true);

  // Class detail expansion
  const [expandedTurma, setExpandedTurma] = useState<string | null>(null);

  // Student filter & search (for admin)
  const [selectedTurmaFilter, setSelectedTurmaFilter] = useState<string>('all');
  const [searchNickname, setSearchNickname] = useState<string>('');

  const isAdmin = currentUser
    ? isUserAdmin(currentUser.email, currentUser.role, currentUser.username, currentUser.publicId || currentUser.id)
    : false;
  const userTurma = currentUser?.turma ? String(currentUser.turma).trim() : '5.º A';

  useEffect(() => {
    if (isOpen) {
      loadRankings();
    }
  }, [isOpen]);

  const loadRankings = async () => {
    setLoading(true);
    try {
      const [turmas, students] = await Promise.all([
        api.getTurmaRankings(currentUser?.turma, isAdmin),
        api.getStudentRankings(currentUser?.id, isAdmin ? undefined : currentUser?.turma, isAdmin),
      ]);
      setTurmaRankings(turmas);
      setStudentRankings(students);
    } catch (err) {
      console.warn('Error loading rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const top3Turmas = turmaRankings.slice(0, 3);

  // If user is a student (not admin), restrict student rankings strictly to their own class
  const baseStudentList = isAdmin
    ? studentRankings
    : studentRankings.filter(
        (s) => normalizeTurmaName(s.turma) === normalizeTurmaName(userTurma)
      );

  // Recalculate positions within the visible group
  const positionedStudents = baseStudentList.map((s, idx) => ({
    ...s,
    position: idx + 1,
  }));

  // Filter students by turma (if admin) and search query
  const filteredStudents = positionedStudents.filter((s) => {
    const matchesTurma =
      !isAdmin ||
      selectedTurmaFilter === 'all' ||
      normalizeTurmaName(s.turma) === normalizeTurmaName(selectedTurmaFilter);
    const matchesSearch =
      !searchNickname.trim() ||
      (s.nickname || s.publicId || '').toLowerCase().includes(searchNickname.toLowerCase().trim()) ||
      (isAdmin && (s.name || s.realName || '').toLowerCase().includes(searchNickname.toLowerCase().trim()));
    return matchesTurma && matchesSearch;
  });

  const handleToggleTurma = (turmaName: string) => {
    setExpandedTurma((prev) => (prev === turmaName ? null : turmaName));
  };

  const handleViewClassStudents = (turmaName: string) => {
    if (isAdmin) {
      setSelectedTurmaFilter(turmaName);
      setActiveTab('students');
    } else if (normalizeTurmaName(turmaName) === normalizeTurmaName(userTurma)) {
      setActiveTab('students');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[850px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100">
        {/* Header */}
        <div className="relative shrink-0 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 p-5 sm:p-6 text-white overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute right-20 top-0 w-24 h-24 rounded-full bg-amber-400/20 blur-lg pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 animate-bounce" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-400/30 text-amber-100 border border-amber-300/40">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {language === 'pt' ? 'Gamificação 5.º Ano' : '5th Grade Gamification'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                  {language === 'pt' ? 'Liga & Ranking de TIC' : 'ICT League & Rankings'}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 sm:mt-5 p-1 bg-black/20 backdrop-blur-md rounded-2xl border border-white/15">
            <button
              onClick={() => setActiveTab('turmas')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'turmas'
                  ? 'bg-white text-indigo-950 shadow-md font-extrabold scale-[1.01]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{language === 'pt' ? '🏆 Ranking das Turmas' : '🏆 Class Rankings'}</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-white text-indigo-950 shadow-md font-extrabold scale-[1.01]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>
                {isAdmin
                  ? language === 'pt'
                    ? '🎭 Ranking de Alunos (Todas as Turmas)'
                    : '🎭 Student Leaderboard (All Classes)'
                  : language === 'pt'
                  ? `🎭 Ranking da Minha Turma (${userTurma})`
                  : `🎭 My Class Leaderboard (${userTurma})`}
              </span>
            </button>
          </div>
        </div>

        {/* Content Area with min-h-0 and smooth scrolling */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Trophy className="w-10 h-10 animate-pulse text-indigo-500" />
              <p className="text-sm font-semibold">
                {language === 'pt' ? 'A calcular classificações das turmas...' : 'Calculating rankings...'}
              </p>
            </div>
          ) : activeTab === 'turmas' ? (
            /* TAB 1: 🏆 RANKING DAS TURMAS */
            <div className="space-y-6">
              {/* Gamification Explanation Card */}
              {isAdmin && (
                <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-200/90 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2 text-indigo-950 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      {language === 'pt'
                        ? '👁️ Modo Professor Ativo: Estás a ver os nomes reais dos alunos. Os alunos apenas conseguem ver os nicknames cartoon nos respetivos rankings.'
                        : '👁️ Teacher Mode Active: You are viewing real student names. Students only see cartoon nicknames on their leaderboards.'}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-200/80 text-indigo-950 rounded-full shrink-0">
                    Apenas Professor
                  </span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-200/80 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    {language === 'pt' ? '⚡ Como funciona o Ranking da tua Turma?' : '⚡ How Class Ranking works'}
                  </span>
                  {language === 'pt'
                    ? 'Cada atividade concluída, jogo ganho ou questionário superado por qualquer aluno soma XP para a turma! Podes consultar a posição de todas as turmas de 5.º ano.'
                    : 'Every activity completed, game won, or quiz passed by any student adds XP to the class! You can see the rank of all 5th grade classes.'}
                </div>
              </div>

              {/* PODIUM TOP 3 TURMAS */}
              {top3Turmas.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-500" />
                    {language === 'pt' ? 'Pódio das Melhores Turmas de 5.º Ano' : '5th Grade Podium'}
                  </h3>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-4 items-end pt-4 pb-2">
                    {/* 2nd Place */}
                    {top3Turmas[1] && (
                      <button
                        type="button"
                        onClick={() => handleToggleTurma(top3Turmas[1].turma)}
                        className="flex flex-col items-center group text-left cursor-pointer transition-transform hover:-translate-y-1"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center border-2 border-white shadow-md text-xs sm:text-sm mb-1.5">
                          🥈
                        </div>
                        <div className="w-full bg-gradient-to-t from-slate-200 to-slate-100 rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-slate-300 text-center shadow-xs relative">
                          {normalizeTurmaName(currentUser?.turma) === normalizeTurmaName(top3Turmas[1].turma) && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-black uppercase bg-indigo-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                              A tua turma!
                            </span>
                          )}
                          <span className="text-[10px] sm:text-xs font-bold text-slate-500">2.º Lugar</span>
                          <h4 className="text-sm sm:text-xl font-black text-slate-800 tracking-tight my-0.5 truncate">
                            {top3Turmas[1].turma}
                          </h4>
                          <p className="text-[11px] sm:text-xs font-extrabold text-indigo-600 font-mono">
                            {top3Turmas[1].totalPoints} XP
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-slate-500 mt-1">
                            {top3Turmas[1].studentCount} alunos • {top3Turmas[1].avgPoints} XP/aluno
                          </p>
                          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-indigo-600 mt-1.5 sm:mt-2 bg-white/80 px-1.5 sm:px-2 py-0.5 rounded-md">
                            {isAdmin || normalizeTurmaName(currentUser?.turma) === normalizeTurmaName(top3Turmas[1].turma)
                              ? (language === 'pt' ? 'Ver alunos' : 'View students')
                              : (language === 'pt' ? 'Ver detalhes' : 'View details')}{' '}
                            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </span>
                        </div>
                      </button>
                    )}

                    {/* 1st Place (GOLD) */}
                    {top3Turmas[0] && (
                      <button
                        type="button"
                        onClick={() => handleToggleTurma(top3Turmas[0].turma)}
                        className="flex flex-col items-center -mt-4 group text-left cursor-pointer transition-transform hover:-translate-y-1"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center border-2 border-white shadow-lg text-base sm:text-lg mb-1.5 animate-bounce">
                          👑
                        </div>
                        <div className="w-full bg-gradient-to-t from-amber-400 to-amber-300 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border-2 border-amber-400 text-center shadow-md relative">
                          {normalizeTurmaName(currentUser?.turma) === normalizeTurmaName(top3Turmas[0].turma) && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-black uppercase bg-indigo-700 text-white px-2 sm:px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                              🌟 #1!
                            </span>
                          )}
                          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-900">
                            🏆 1.º Lugar
                          </span>
                          <h4 className="text-base sm:text-2xl font-black text-amber-950 tracking-tight my-0.5 truncate">
                            {top3Turmas[0].turma}
                          </h4>
                          <p className="text-xs sm:text-sm font-black text-indigo-950 font-mono">
                            {top3Turmas[0].totalPoints} XP
                          </p>
                          <p className="text-[9px] sm:text-[11px] font-bold text-amber-900 mt-1">
                            {top3Turmas[0].studentCount} alunos • {top3Turmas[0].avgPoints} XP/aluno
                          </p>
                          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-950 mt-1.5 sm:mt-2 bg-white/90 px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs">
                            {isAdmin || normalizeTurmaName(currentUser?.turma) === normalizeTurmaName(top3Turmas[0].turma)
                              ? (language === 'pt' ? 'Ver alunos' : 'View students')
                              : (language === 'pt' ? 'Ver detalhes' : 'View details')}{' '}
                            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </span>
                        </div>
                      </button>
                    )}

                    {/* 3rd Place */}
                    {top3Turmas[2] && (
                      <button
                        type="button"
                        onClick={() => handleToggleTurma(top3Turmas[2].turma)}
                        className="flex flex-col items-center group text-left cursor-pointer transition-transform hover:-translate-y-1"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-700 text-amber-100 font-extrabold flex items-center justify-center border-2 border-white shadow-md text-xs sm:text-sm mb-1.5">
                          🥉
                        </div>
                        <div className="w-full bg-gradient-to-t from-amber-100 to-amber-50 rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-amber-200 text-center shadow-xs relative">
                          {normalizeTurmaName(currentUser?.turma) === normalizeTurmaName(top3Turmas[2].turma) && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-black uppercase bg-indigo-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                              A tua turma!
                            </span>
                          )}
                          <span className="text-[10px] sm:text-xs font-bold text-amber-800">3.º Lugar</span>
                          <h4 className="text-sm sm:text-xl font-black text-amber-950 tracking-tight my-0.5 truncate">
                            {top3Turmas[2].turma}
                          </h4>
                          <p className="text-[11px] sm:text-xs font-extrabold text-amber-900 font-mono">
                            {top3Turmas[2].totalPoints} XP
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-amber-800 mt-1">
                            {top3Turmas[2].studentCount} alunos • {top3Turmas[2].avgPoints} XP/aluno
                          </p>
                          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-900 mt-1.5 sm:mt-2 bg-white/80 px-1.5 sm:px-2 py-0.5 rounded-md">
                            {isAdmin || normalizeTurmaName(currentUser?.turma) === normalizeTurmaName(top3Turmas[2].turma)
                              ? (language === 'pt' ? 'Ver alunos' : 'View students')
                              : (language === 'pt' ? 'Ver detalhes' : 'View details')}{' '}
                            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* LIST OF ALL CLASSES */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    {language === 'pt' ? 'Tabela Completa por Turma' : 'All Classes'}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {turmaRankings.length} {language === 'pt' ? 'turmas de 5.º ano' : '5th grade classes'}
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
                  {turmaRankings.map((tr, idx) => {
                    const isUserTurma = normalizeTurmaName(currentUser?.turma) === normalizeTurmaName(tr.turma);
                    const isExpanded = expandedTurma === tr.turma;
                    const studentsInTurma = (tr.allStudents && tr.allStudents.length > 0)
                      ? tr.allStudents
                      : studentRankings.filter((s) => normalizeTurmaName(s.turma) === normalizeTurmaName(tr.turma));
                    const canViewStudents = isAdmin || isUserTurma;

                    return (
                      <div key={tr.turma} className="transition-colors">
                        {/* Header Row - Clickable */}
                        <div
                          onClick={() => handleToggleTurma(tr.turma)}
                          className={`p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors ${
                            isUserTurma ? 'bg-indigo-50/60 border-l-4 border-l-indigo-600' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                                idx === 0
                                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                                  : idx === 1
                                  ? 'bg-slate-200 text-slate-700'
                                  : idx === 2
                                  ? 'bg-amber-200 text-amber-900'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              #{idx + 1}
                            </span>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-base font-extrabold text-slate-900">
                                  {tr.turma}
                                </h4>
                                {isUserTurma && (
                                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                                    {language === 'pt' ? 'A tua turma' : 'Your class'}
                                  </span>
                                )}
                                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                  {tr.topBadge}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 flex-wrap">
                                <span className="flex items-center gap-1 font-semibold text-slate-700">
                                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                                  {tr.studentCount} {language === 'pt' ? 'alunos' : 'students'}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>{language === 'pt' ? 'Média:' : 'Avg:'} <strong className="text-slate-700">{tr.avgPoints} XP</strong>/{language === 'pt' ? 'aluno' : 'student'}</span>
                                <span className="text-slate-300">•</span>
                                <span>{tr.completedActivities} {language === 'pt' ? 'desafios concluídos' : 'challenges completed'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <p className="text-lg font-black text-indigo-600 font-mono">
                                {tr.totalPoints} XP
                              </p>
                              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                {language === 'pt' ? 'Total Turma' : 'Class Total'}
                              </p>
                            </div>

                            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-indigo-100 transition-colors">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-indigo-600" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Drawer */}
                        {isExpanded && (
                          <div className="bg-slate-50 p-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                            {canViewStudents ? (
                              <>
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                                      {language === 'pt'
                                        ? `Alunos da turma ${tr.turma} (${studentsInTurma.length})`
                                        : `Students in class ${tr.turma} (${studentsInTurma.length})`}
                                    </span>
                                    {isAdmin && (
                                      <span
                                        className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                                        title="Privacidade garantida: Os alunos veem apenas alcunhas e avatares; apenas a professora visualiza os nomes reais."
                                      >
                                        <Eye className="w-3 h-3 text-emerald-600" />
                                        {language === 'pt' ? 'Nomes reais (apenas professor)' : 'Real names (teacher only)'}
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleViewClassStudents(tr.turma)}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition-colors cursor-pointer"
                                  >
                                    {isAdmin
                                      ? (language === 'pt' ? 'Ver no Ranking Geral →' : 'View in General Ranking →')
                                      : (language === 'pt' ? 'Ver no Ranking da Minha Turma →' : 'View in My Class Ranking →')}
                                  </button>
                                </div>

                                {studentsInTurma.length === 0 ? (
                                  <div className="py-6 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-200 p-4">
                                    <Users className="w-6 h-6 mx-auto mb-1.5 text-slate-300" />
                                    <p className="text-xs font-medium text-slate-700">
                                      {language === 'pt'
                                        ? (tr.totalPoints > 0
                                            ? `Esta turma tem ${tr.totalPoints} XP acumulados por ${tr.studentCount} alunos.`
                                            : 'Ainda não há alunos com XP registado nesta turma.')
                                        : (tr.totalPoints > 0
                                            ? `This class has ${tr.totalPoints} XP earned across ${tr.studentCount} students.`
                                            : 'No students with registered XP in this class yet.')}
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                      {language === 'pt'
                                        ? (tr.totalPoints > 0
                                            ? 'Clica em "Ver no Ranking Geral" acima para filtrar todos os desafios.'
                                            : `Sê o primeiro a criar conta no ${tr.turma} e ganha XP!`)
                                        : (tr.totalPoints > 0
                                            ? 'Click "View in General Ranking" above to filter all challenges.'
                                            : `Be the first to register in ${tr.turma} and earn XP!`)}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {studentsInTurma.map((stu, sIdx) => {
                                      const hasRealName = isAdmin && Boolean(stu.name || stu.realName);
                                      const displayName = hasRealName ? (stu.name || stu.realName) : (stu.nickname || stu.publicId);

                                      return (
                                        <div
                                          key={(stu.id || stu.publicId) + sIdx}
                                          className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
                                        >
                                          <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                                              #{sIdx + 1}
                                            </span>
                                            <div className="w-7 h-7 rounded-lg overflow-hidden shadow-2xs shrink-0 ring-1 ring-slate-200">
                                              <CartoonAvatar config={stu.avatar || getDefaultAvatar(stu.nickname || stu.publicId)} size={28} />
                                            </div>
                                            <div className="min-w-0">
                                              <div className="flex items-center gap-1.5 flex-wrap">
                                                <p
                                                  className={`text-xs truncate ${hasRealName ? 'font-black text-slate-900 font-sans' : 'font-extrabold text-slate-800 font-mono'}`}
                                                  title={displayName}
                                                >
                                                  {displayName}
                                                </p>
                                                {hasRealName && (
                                                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                                                    @{stu.nickname || stu.publicId}
                                                  </span>
                                                )}
                                                {isAdmin && stu.number !== undefined && (
                                                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1 py-0.2 rounded">
                                                    N.º {stu.number}
                                                  </span>
                                                )}
                                              </div>
                                              <p className="text-[10px] text-slate-400">
                                                {stu.activitiesCount ?? 0} {language === 'pt' ? 'atividades' : 'activities'}
                                              </p>
                                            </div>
                                          </div>
                                          <span className="text-xs font-extrabold text-indigo-600 font-mono shrink-0 ml-2">
                                            {stu.points} XP
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </>
                            ) : (
                              /* Privacy protection for other classes when viewed by students */
                              <div className="py-4 px-4 bg-white rounded-xl border border-indigo-100 text-center space-y-1.5 shadow-2xs">
                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 mb-1">
                                  <Lock className="w-4 h-4" />
                                </div>
                                <p className="text-xs font-bold text-slate-800">
                                  {language === 'pt'
                                    ? `Privacidade: Podes consultar o ranking individual de alunos na tua turma (${userTurma}).`
                                    : `Privacy: You can check the individual student leaderboard in your own class (${userTurma}).`}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {language === 'pt'
                                    ? `A turma ${tr.turma} tem ${tr.totalPoints} XP acumulados por ${tr.studentCount} alunos (${tr.avgPoints} XP de média).`
                                    : `Class ${tr.turma} has ${tr.totalPoints} XP earned across ${tr.studentCount} students (${tr.avgPoints} XP average).`}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: 🎭 RANKING INDIVIDUAL DE ALUNOS (DA TURMA DO ALUNO) */
            <div className="space-y-4">
              {/* Privacy Notice / Context Banner */}
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs flex items-center justify-between gap-2.5 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    {isAdmin
                      ? language === 'pt'
                        ? '🔒 Modo Professora: Consulta o ranking geral de alunos ou filtra por turma.'
                        : '🔒 Teacher Mode: Viewing general student rankings or filtering by class.'
                      : language === 'pt'
                      ? `🔒 Ranking da tua turma (${userTurma}): Consulta o XP e medalhas dos teus colegas de turma através de Nicknames anónimos.`
                      : `🔒 Your class leaderboard (${userTurma}): View XP and badges for classmates via anonymous Nicknames.`}
                  </span>
                </div>

                {!isAdmin && (
                  <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-lg bg-indigo-600 text-white tracking-wide">
                    Turma {userTurma}
                  </span>
                )}
              </div>

              {/* Filters Bar: Turma (admin only) & Search */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Search by Nickname */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchNickname}
                    onChange={(e) => setSearchNickname(e.target.value)}
                    placeholder={
                      isAdmin
                        ? language === 'pt'
                          ? 'Procurar por Nickname...'
                          : 'Search by Nickname...'
                        : language === 'pt'
                        ? `Procurar colega no ${userTurma}...`
                        : `Search classmate in ${userTurma}...`
                    }
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {searchNickname && (
                    <button
                      onClick={() => setSearchNickname('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Filter by Turma: ONLY FOR ADMIN */}
                {isAdmin ? (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    <button
                      onClick={() => setSelectedTurmaFilter('all')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        selectedTurmaFilter === 'all'
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {language === 'pt' ? 'Todas as Turmas' : 'All Classes'}
                    </button>

                    {turmaRankings.map((tr) => (
                      <button
                        key={tr.turma}
                        onClick={() => setSelectedTurmaFilter(tr.turma)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                          selectedTurmaFilter.toLowerCase() === tr.turma.toLowerCase()
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {tr.turma}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shrink-0">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{userTurma} ({filteredStudents.length} {language === 'pt' ? 'alunos' : 'students'})</span>
                  </div>
                )}

                {isAdmin && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-900 w-full">
                    <Eye className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {language === 'pt'
                        ? 'Vista Exclusiva de Docente: Os nomes reais dos alunos e números de pauta são visíveis apenas para a professora. Para os alunos, a privacidade é total (apenas alcunhas e avatares).'
                        : 'Teacher Exclusive View: Real student names and numbers are visible only to the teacher.'}
                    </span>
                  </div>
                )}
              </div>

              {/* Student Rankings List */}
              {filteredStudents.length === 0 ? (
                <div className="py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 p-6">
                  <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-bold text-slate-600">
                    {language === 'pt' ? 'Nenhum aluno encontrado' : 'No students found'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {isAdmin && selectedTurmaFilter !== 'all'
                      ? `Não existem alunos registados na turma ${selectedTurmaFilter}.`
                      : language === 'pt'
                      ? `Ainda não existem colegas com XP registado na turma ${userTurma}. Conclui desafios para liderar o ranking!`
                      : `No classmates with XP recorded yet in ${userTurma}. Complete challenges to top the leaderboard!`}
                  </p>
                  {isAdmin && selectedTurmaFilter !== 'all' && (
                    <button
                      onClick={() => setSelectedTurmaFilter('all')}
                      className="mt-3 text-xs font-bold text-indigo-600 underline cursor-pointer"
                    >
                      Ver todas as turmas
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                        student.isCurrentUser ? 'bg-amber-50/80 border-l-4 border-l-amber-500' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                            student.position === 1
                              ? 'bg-amber-400 text-amber-950 shadow-xs'
                              : student.position === 2
                              ? 'bg-slate-200 text-slate-700'
                              : student.position === 3
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          #{student.position}
                        </span>

                        <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-xs ring-2 ring-slate-100 shrink-0">
                          <CartoonAvatar config={student.avatar || getDefaultAvatar(student.nickname || student.publicId)} size={44} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isAdmin && (student.name || student.realName) ? (
                              <>
                                <p className="text-sm font-black text-slate-900 font-sans truncate" title={student.name || student.realName}>
                                  {student.name || student.realName}
                                </p>
                                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                                  @{student.nickname || student.publicId}
                                </span>
                                {student.number !== undefined && (
                                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">
                                    N.º {student.number}
                                  </span>
                                )}
                              </>
                            ) : (
                              <p className="text-sm font-extrabold text-slate-900 font-mono">
                                {student.nickname || student.publicId}
                              </p>
                            )}
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                              {student.turma}
                            </span>
                            {student.isCurrentUser && (
                              <span className="text-[10px] font-black uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                                {language === 'pt' ? 'Tu!' : 'You!'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {student.activitiesCount} {language === 'pt' ? 'atividades completas' : 'completed activities'} • {student.badgeCount} {language === 'pt' ? 'medalhas' : 'badges'}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1 text-sm font-black text-amber-600 font-mono">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          {student.points} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500">
            {language === 'pt'
              ? '💡 Completa questionários e desafios de TIC para levar a tua turma ao topo!'
              : '💡 Complete ICT quizzes and challenges to boost your class!'}
          </p>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            {language === 'pt' ? 'Fechar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

