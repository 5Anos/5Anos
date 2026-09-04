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
  ChevronRight,
  TrendingUp,
  GraduationCap,
  Crown,
  Zap,
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
  const otherTurmas = turmaRankings.slice(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 p-6 text-white overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute right-20 top-0 w-24 h-24 rounded-full bg-amber-400/20 blur-lg pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-amber-300 animate-bounce" />
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
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 p-1 bg-black/20 backdrop-blur-md rounded-2xl border border-white/15">
            <button
              onClick={() => setActiveTab('turmas')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'turmas'
                  ? 'bg-white text-indigo-950 shadow-md font-extrabold scale-[1.02]'
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
                  ? 'bg-white text-indigo-950 shadow-md font-extrabold scale-[1.02]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>{language === 'pt' ? '🎭 Ranking de Alunos' : '🎭 Student Leaderboard'}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Trophy className="w-10 h-10 animate-pulse text-indigo-500" />
              <p className="text-sm font-semibold">{language === 'pt' ? 'A calcular classificações das turmas...' : 'Calculating rankings...'}</p>
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
                    ? 'Cada módulo concluído, jogo ganho ou questionário superado por qualquer aluno adiciona pontos à pontuação total da sua turma! Ajuda a tua turma a subir ao pódio!'
                    : 'Every completed module, game won, or quiz passed by any student adds points to their class total! Help your class reach the podium!'}
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
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center border-2 border-white shadow-md text-sm mb-1.5">
                          🥈
                        </div>
                        <div className="w-full bg-gradient-to-t from-slate-200 to-slate-100 rounded-2xl p-3 sm:p-4 border border-slate-300 text-center shadow-sm relative">
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
                            Média: {top3Turmas[1].avgPoints} XP/aluno
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 1st Place (GOLD) */}
                    {top3Turmas[0] && (
                      <div className="flex flex-col items-center -mt-4">
                        <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center border-2 border-white shadow-lg text-lg mb-1.5 animate-bounce">
                          👑
                        </div>
                        <div className="w-full bg-gradient-to-t from-amber-400 to-amber-300 rounded-2xl p-4 sm:p-5 border-2 border-amber-400 text-center shadow-lg relative">
                          {currentUser?.turma?.toLowerCase() === top3Turmas[0].turma.toLowerCase() && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase bg-indigo-700 text-white px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                              🌟 A tua turma é #1!
                            </span>
                          )}
                          <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                            🏆 1.º Lugar Nacional
                          </span>
                          <h4 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight my-0.5">
                            {top3Turmas[0].turma}
                          </h4>
                          <p className="text-sm font-black text-indigo-950 font-mono">
                            {top3Turmas[0].totalPoints} XP Total
                          </p>
                          <p className="text-[11px] font-bold text-amber-900 mt-1">
                            Média: {top3Turmas[0].avgPoints} XP/aluno
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 3rd Place */}
                    {top3Turmas[2] && (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-700 text-amber-100 font-extrabold flex items-center justify-center border-2 border-white shadow-md text-sm mb-1.5">
                          🥉
                        </div>
                        <div className="w-full bg-gradient-to-t from-amber-100 to-amber-50 rounded-2xl p-3 sm:p-4 border border-amber-200 text-center shadow-sm relative">
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
                            Média: {top3Turmas[2].avgPoints} XP/aluno
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LIST OF ALL CLASSES */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                  {language === 'pt' ? 'Tabela Classificativa por Turma' : 'Class Leaderboard Table'}
                </h3>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
                  {turmaRankings.map((tr, idx) => {
                    const isUserTurma = currentUser?.turma?.toLowerCase() === tr.turma.toLowerCase();

                    return (
                      <div
                        key={tr.turma}
                        className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                          isUserTurma ? 'bg-indigo-50/70 border-l-4 border-l-indigo-600' : 'hover:bg-slate-50'
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
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-extrabold text-slate-900">
                                {tr.turma}
                              </h4>
                              {isUserTurma && (
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                                  {language === 'pt' ? 'A tua turma' : 'Your class'}
                                </span>
                              )}
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                {tr.topBadge}
                              </span>
                            </div>

                            {/* Top 3 students in this class */}
                            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{tr.studentCount} alunos registados</span>
                              <span className="text-slate-300">•</span>
                              <span>Média: <strong className="text-slate-700">{tr.avgPoints} XP</strong>/aluno</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-lg font-black text-indigo-600 font-mono">
                            {tr.totalPoints} XP
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            Total da Turma
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: 🎭 RANKING INDIVIDUAL DE ALUNOS */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  {language === 'pt'
                    ? '🔒 Proteção de Privacidade: O ranking mostra apenas o Identificador Público Seguro para garantir o anonimato de todos os alunos.'
                    : '🔒 Privacy Shield: The ranking displays only Safe Public Identifiers to protect student privacy.'}
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
                {studentRankings.map((student) => (
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
                        <div className="flex items-center gap-2">
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
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
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

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
