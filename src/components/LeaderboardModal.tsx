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
} from 'lucide-react';
import { User, Language, TurmaRanking, StudentRanking } from '../types';
import { api } from '../services/api';

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

  // Student filter & search
  const [selectedTurmaFilter, setSelectedTurmaFilter] = useState<string>('all');
  const [searchNickname, setSearchNickname] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadRankings();
    }
  }, [isOpen]);

  const loadRankings = async () => {
    setLoading(true);
    try {
      const [turmas, students] = await Promise.all([
        api.getTurmaRankings(),
        api.getStudentRankings(currentUser?.id),
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

  // Filter students by turma and search query
  const filteredStudents = studentRankings.filter((s) => {
    const matchesTurma =
      selectedTurmaFilter === 'all' || s.turma.toLowerCase().trim() === selectedTurmaFilter.toLowerCase().trim();
    const matchesSearch =
      !searchNickname.trim() ||
      s.publicId.toLowerCase().includes(searchNickname.toLowerCase().trim());
    return matchesTurma && matchesSearch;
  });

  const handleToggleTurma = (turmaName: string) => {
    setExpandedTurma((prev) => (prev === turmaName ? null : turmaName));
  };

  const handleViewClassStudents = (turmaName: string) => {
    setSelectedTurmaFilter(turmaName);
    setActiveTab('students');
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
              <span>{language === 'pt' ? '🎭 Ranking de Alunos (Nicknames)' : '🎭 Student Leaderboard'}</span>
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
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-200/80 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    {language === 'pt' ? '⚡ Como funciona o Ranking da tua Turma?' : '⚡ How Class Ranking works'}
                  </span>
                  {language === 'pt'
                    ? 'Cada atividade concluída, jogo ganho ou questionário superado por qualquer aluno soma pontos para a turma! Clica em qualquer turma abaixo para ver todos os alunos e detalhes.'
                    : 'Every activity completed, game won, or quiz passed by any student adds points to the class! Click any class below to see all students and details.'}
                </div>
              </div>

              {/* PODIUM TOP 3 TURMAS */}
              {top3Turmas.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-500" />
                    {language === 'pt' ? 'Pódio das Melhores Turmas de 5.º Ano' : '5th Grade Podium'}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-4 pb-2">
                    {/* 2nd Place */}
                    {top3Turmas[1] && (
                      <button
                        type="button"
                        onClick={() => handleToggleTurma(top3Turmas[1].turma)}
                        className="flex flex-col items-center group text-left cursor-pointer transition-transform hover:-translate-y-1"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center border-2 border-white shadow-md text-sm mb-1.5">
                          🥈
                        </div>
                        <div className="w-full bg-gradient-to-t from-slate-200 to-slate-100 rounded-2xl p-3 sm:p-4 border border-slate-300 text-center shadow-xs relative">
                          {currentUser?.turma?.toLowerCase() === top3Turmas[1].turma.toLowerCase() && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase bg-indigo-600 text-white px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                              A tua turma!
                            </span>
                          )}
                          <span className="text-xs font-bold text-slate-500">2.º Lugar</span>
                          <h4 className="text-base sm:text-xl font-black text-slate-800 tracking-tight my-0.5">
                            {top3Turmas[1].turma}
                          </h4>
                          <p className="text-xs font-extrabold text-indigo-600 font-mono">
                            {top3Turmas[1].totalPoints} XP
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">
                            {top3Turmas[1].studentCount} alunos • {top3Turmas[1].avgPoints} XP/aluno
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 mt-2 bg-white/80 px-2 py-0.5 rounded-md">
                            Ver alunos <ChevronDown className="w-3 h-3" />
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
                        <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center border-2 border-white shadow-lg text-lg mb-1.5 animate-bounce">
                          👑
                        </div>
                        <div className="w-full bg-gradient-to-t from-amber-400 to-amber-300 rounded-2xl p-4 sm:p-5 border-2 border-amber-400 text-center shadow-md relative">
                          {currentUser?.turma?.toLowerCase() === top3Turmas[0].turma.toLowerCase() && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase bg-indigo-700 text-white px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                              🌟 A tua turma é #1!
                            </span>
                          )}
                          <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                            🏆 1.º Lugar
                          </span>
                          <h4 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight my-0.5">
                            {top3Turmas[0].turma}
                          </h4>
                          <p className="text-sm font-black text-indigo-950 font-mono">
                            {top3Turmas[0].totalPoints} XP Total
                          </p>
                          <p className="text-[11px] font-bold text-amber-900 mt-1">
                            {top3Turmas[0].studentCount} alunos • {top3Turmas[0].avgPoints} XP/aluno
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-950 mt-2 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
                            Ver alunos <ChevronDown className="w-3 h-3" />
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
                        <div className="w-10 h-10 rounded-full bg-amber-700 text-amber-100 font-extrabold flex items-center justify-center border-2 border-white shadow-md text-sm mb-1.5">
                          🥉
                        </div>
                        <div className="w-full bg-gradient-to-t from-amber-100 to-amber-50 rounded-2xl p-3 sm:p-4 border border-amber-200 text-center shadow-xs relative">
                          {currentUser?.turma?.toLowerCase() === top3Turmas[2].turma.toLowerCase() && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase bg-indigo-600 text-white px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                              A tua turma!
                            </span>
                          )}
                          <span className="text-xs font-bold text-amber-800">3.º Lugar</span>
                          <h4 className="text-base sm:text-xl font-black text-amber-950 tracking-tight my-0.5">
                            {top3Turmas[2].turma}
                          </h4>
                          <p className="text-xs font-extrabold text-indigo-600 font-mono">
                            {top3Turmas[2].totalPoints} XP
                          </p>
                          <p className="text-[10px] text-amber-800 mt-1">
                            {top3Turmas[2].studentCount} alunos • {top3Turmas[2].avgPoints} XP/aluno
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 mt-2 bg-white/80 px-2 py-0.5 rounded-md">
                            Ver alunos <ChevronDown className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* LIST OF ALL CLASSES (CLICKABLE TO SEE EVERYTHING) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    {language === 'pt' ? 'Tabela Completa por Turma (Clica para ver tudo)' : 'All Classes (Click to expand)'}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {turmaRankings.length} turmas registadas
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
                  {turmaRankings.map((tr, idx) => {
                    const isUserTurma = currentUser?.turma?.toLowerCase() === tr.turma.toLowerCase();
                    const isExpanded = expandedTurma === tr.turma;
                    const studentsInTurma = tr.allStudents || [];

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
                                  {tr.studentCount} alunos
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>Média: <strong className="text-slate-700">{tr.avgPoints} XP</strong>/aluno</span>
                                <span className="text-slate-300">•</span>
                                <span>{tr.completedActivities} desafios concluídos</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <p className="text-lg font-black text-indigo-600 font-mono">
                                {tr.totalPoints} XP
                              </p>
                              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                Total Turma
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

                        {/* Expanded Drawer: All Students in this class */}
                        {isExpanded && (
                          <div className="bg-slate-50 p-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                                <GraduationCap className="w-4 h-4 text-indigo-600" />
                                Alunos da turma {tr.turma} ({studentsInTurma.length})
                              </span>

                              <button
                                type="button"
                                onClick={() => handleViewClassStudents(tr.turma)}
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition-colors cursor-pointer"
                              >
                                Ver no Ranking Geral →
                              </button>
                            </div>

                            {studentsInTurma.length === 0 ? (
                              <div className="py-6 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-200 p-4">
                                <Users className="w-6 h-6 mx-auto mb-1.5 text-slate-300" />
                                <p className="text-xs font-medium">
                                  Ainda não há alunos com pontos registados nesta turma.
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  Sê o primeiro a criar conta no 5.º {tr.turma.replace('5.º', '').trim()} e ganha pontos!
                                </p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {studentsInTurma.map((stu, sIdx) => {
                                  return (
                                    <div
                                      key={stu.publicId + sIdx}
                                      className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                                          #{sIdx + 1}
                                        </span>
                                        <span className="text-sm">🎭</span>
                                        <div>
                                          <p className="text-xs font-extrabold text-slate-800 font-mono">
                                            {stu.publicId}
                                          </p>
                                          <p className="text-[10px] text-slate-400">
                                            {stu.activitiesCount} atividades
                                          </p>
                                        </div>
                                      </div>
                                      <span className="text-xs font-extrabold text-indigo-600 font-mono">
                                        {stu.points} XP
                                      </span>
                                    </div>
                                  );
                                })}
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
            /* TAB 2: 🎭 RANKING INDIVIDUAL DE ALUNOS */
            <div className="space-y-4">
              {/* Privacy Notice */}
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  {language === 'pt'
                    ? '🔒 Proteção de Privacidade: O ranking mostra apenas o Nickname para garantir o anonimato e segurança de todos os alunos.'
                    : '🔒 Privacy Shield: The ranking displays only Nicknames to guarantee anonymity and safety for every student.'}
                </span>
              </div>

              {/* Filters Bar: Turma & Search */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Search by Nickname */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchNickname}
                    onChange={(e) => setSearchNickname(e.target.value)}
                    placeholder={language === 'pt' ? 'Procurar por Nickname...' : 'Search by Nickname...'}
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

                {/* Filter by Turma */}
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
              </div>

              {/* Student Rankings List */}
              {filteredStudents.length === 0 ? (
                <div className="py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 p-6">
                  <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-bold text-slate-600">
                    {language === 'pt' ? 'Nenhum aluno encontrado' : 'No students found'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedTurmaFilter !== 'all'
                      ? `Não existem alunos registados na turma ${selectedTurmaFilter}.`
                      : 'Ainda não há registos para mostrar.'}
                  </p>
                  {selectedTurmaFilter !== 'all' && (
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

                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-base shrink-0">
                          🎭
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-extrabold text-slate-900 font-mono">
                              {student.publicId}
                            </p>
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
                            {student.activitiesCount} atividades completas • {student.badgeCount} medalhas
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
