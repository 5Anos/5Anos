import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert, Search, Trophy, ArrowRight, RotateCcw, Sparkles, Smartphone, Mail, MessageSquare, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface PhishingDetectorGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface MessageRadarItem {
  id: number;
  type: 'sms' | 'chat' | 'social';
  sender: string;
  preview: { pt: string; en: string };
  isPhishing: boolean;
  question: { pt: string; en: string };
  explanation: { pt: string; en: string };
}

const RADAR_ITEMS: MessageRadarItem[] = [
  {
    id: 1,
    type: 'sms',
    sender: '+351 912 345 678 (Aviso Encomenda)',
    preview: {
      pt: 'A sua encomenda CTT #84920 foi retida na alfândega. Pague 1.99€ em http://ctt-pagamento-urgente.xyz em 24h ou será devolvida!',
      en: 'Your package #84920 is held at customs. Pay €1.99 at http://ctt-pagamento-urgente.xyz within 24h or it will be returned!',
    },
    isPhishing: true,
    question: {
      pt: 'Como deves reagir a esta mensagem de SMS?',
      en: 'How should you react to this SMS message?',
    },
    explanation: {
      pt: '🚨 Smishing (Phishing por SMS)! O domínio "ctt-pagamento-urgente.xyz" é falso e tenta roubar dados do cartão. Nunca cliques no link; apaga e avisa os teus pais.',
      en: '🚨 Smishing (SMS Phishing)! The domain "ctt-pagamento-urgente.xyz" is fake to steal card details. Never click links; delete and report to parents.',
    },
  },
  {
    id: 2,
    type: 'chat',
    sender: 'RobloxBot_Oficial99 (Discord)',
    preview: {
      pt: 'Parabéns! Foste sorteado para receber 5.000 Robux grátis! Clica em http://free-robux-claim.site e introduz o teu nome e palavra-passe para receber.',
      en: 'Congrats! You were selected to receive 5,000 free Robux! Click http://free-robux-claim.site and enter your username and password to claim.',
    },
    isPhishing: true,
    question: {
      pt: 'Será uma oferta genuína do jogo?',
      en: 'Is this a genuine gaming promotion?',
    },
    explanation: {
      pt: '🚨 Golpe clássico de jogos! Moedas virtuais grátis em troca de palavras-passe nunca são verdadeiras. O objetivo é roubar a tua conta de jogo.',
      en: '🚨 Classic gaming scam! Free in-game currency promises requiring your credentials are always malicious traps to hijack accounts.',
    },
  },
  {
    id: 3,
    type: 'social',
    sender: 'Escola Básica D. Dinis (Secretaria)',
    preview: {
      pt: 'Aviso aos Encarregados de Educação: A reunião de avaliação decorrerá na próxima quinta-feira às 18h no auditório da escola.',
      en: 'Notice to Parents: The trimester evaluation meeting will take place next Thursday at 6 PM in the school auditorium.',
    },
    isPhishing: false,
    question: {
      pt: 'Esta mensagem é legítima ou suspeita?',
      en: 'Is this message legitimate or suspicious?',
    },
    explanation: {
      pt: '✅ Mensagem informativa legítima! Não pede palavras-passe, não tem links duvidosos nem ameaças de bloqueio urgente.',
      en: '✅ Legitimate informational notice! No credential requests, suspicious links, or artificial panic urgency.',
    },
  },
];

export const PhishingDetectorGame: React.FC<PhishingDetectorGameProps> = ({ language, onBack, onFinish }) => {
  const [activeStage, setActiveStage] = useState<'emailLab' | 'radar' | 'completed'>('emailLab');
  const [revealedClues, setRevealedClues] = useState<number[]>([]);
  const [currentRadarIdx, setCurrentRadarIdx] = useState(0);
  const [selectedRadarAnswer, setSelectedRadarAnswer] = useState<boolean | null>(null);
  const [radarScores, setRadarScores] = useState<boolean[]>([]);

  const t = translations[language];

  const clues = [
    {
      id: 1,
      name: { pt: '1. Remetente Falso e Estranho', en: '1. Strange Fake Sender' },
      explanation: {
        pt: 'O endereço é "aviso-urgente@servico-gratis-123.xyz" em vez do domínio oficial verificado da escola ou da empresa.',
        en: 'The address is "aviso-urgente@servico-gratis-123.xyz" instead of the official verified organization domain.',
      },
    },
    {
      id: 2,
      name: { pt: '2. Sentido de Pânico & Urgência Falsa', en: '2. Artificial Panic & Urgency' },
      explanation: {
        pt: 'Frases como "A tua conta será BLOQUEADA em 15 minutos!" tentam fazer com que ajas por impulso sem pensar nem pedir ajuda.',
        en: 'Phrases like "Your account will be TERMINATED in 15 minutes!" exploit panic so you click hastily.',
      },
    },
    {
      id: 3,
      name: { pt: '3. Ligação Web (URL) Falsa e Perigosa', en: '3. Deceptive & Malicious Link' },
      explanation: {
        pt: 'O botão diz "Clica aqui", mas o endereço de destino real é "http://site-estranho-roubo.ru/login" (um site malicioso).',
        en: 'The button promises unlocking, but the actual target URL leads to a malicious harvesting page.',
      },
    },
    {
      id: 4,
      name: { pt: '4. Pedido Ilegítimo de Palavra-passe', en: '4. Sensitive Credential Request' },
      explanation: {
        pt: 'Nenhum serviço legítimo te pede para confirmares a tua palavra-passe ou dados pessoais através de um link enviado por email.',
        en: 'Legitimate services never ask you to submit your password or credentials via unsolicited links.',
      },
    },
  ];

  const handleToggleClue = (id: number) => {
    if (!revealedClues.includes(id)) {
      setRevealedClues((prev) => [...prev, id]);
    }
  };

  const handleRadarAnswer = (isPhishingChoice: boolean) => {
    if (selectedRadarAnswer !== null) return;
    setSelectedRadarAnswer(isPhishingChoice);
  };

  const handleNextRadar = () => {
    if (selectedRadarAnswer === null) return;
    const isCorr = selectedRadarAnswer === RADAR_ITEMS[currentRadarIdx].isPhishing;
    const nextScores = [...radarScores, isCorr];
    setRadarScores(nextScores);
    setSelectedRadarAnswer(null);

    if (currentRadarIdx + 1 < RADAR_ITEMS.length) {
      setCurrentRadarIdx((prev) => prev + 1);
    } else {
      setActiveStage('completed');
      const correctCount = nextScores.filter(Boolean).length;
      const totalPoints = 50 + Math.round((correctCount / RADAR_ITEMS.length) * 50);
      onFinish(totalPoints, 100, Math.round((totalPoints / 100) * 100));
    }
  };

  const currentRadar = RADAR_ITEMS[currentRadarIdx];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToTheme}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStage('emailLab')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              activeStage === 'emailLab'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-800'
            }`}
          >
            {language === 'pt' ? '1. Lupa de Detetive' : '1. Detective Magnifier'}
          </button>
          <button
            onClick={() => revealedClues.length >= 4 && setActiveStage('radar')}
            disabled={revealedClues.length < 4}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
              activeStage === 'radar'
                ? 'bg-rose-600 text-white shadow-xs'
                : revealedClues.length < 4
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'pt' ? '2. Radar de Mensagens' : '2. Message Radar'}
          </button>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-amber-900 font-extrabold text-xs sm:text-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>100 XP</span>
        </div>
      </div>

      {/* Stage 1: Email Inspection Detective Lab */}
      {activeStage === 'emailLab' && (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
                {language === 'pt' ? 'Fase 1: Inspecionar Email Falso' : 'Phase 1: Inspect Fake Email'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {language === 'pt' ? '🕵️ O Detetive de Phishing: Encontra as 4 Pistas!' : '🕵️ The Phishing Detective: Find the 4 Clues!'}
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-2xl font-medium">
                {language === 'pt'
                  ? 'Clica nas 4 zonas suspeitas dentro da mensagem (Remetente, Assunto, Botão e Pedido de Dados) com a tua lupa de detetive para as desmascarar!'
                  : 'Click the 4 suspicious zones in this email with your detective magnifier to unmask the scam!'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AudioSpeakButton
                id="phishing-stage1-audio"
                text={`${language === 'pt' ? 'O Detetive de Phishing: Encontra as 4 Pistas' : 'The Phishing Detective: Find the 4 Clues'}. ${
                  language === 'pt'
                    ? 'Clica nas 4 zonas suspeitas dentro da mensagem com a tua lupa de detetive para as desmascarar!'
                    : 'Click the 4 suspicious zones in this email to unmask the scam!'
                }`}
                language={language}
                label={language === 'pt' ? 'Ouvir Instruções' : 'Listen'}
                variant="pill"
                size="sm"
              />
              {revealedClues.length === 4 && (
                <button
                  onClick={() => setActiveStage('radar')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 shrink-0 cursor-pointer transition-all hover:scale-102 animate-in zoom-in-95"
                >
                  <span>{language === 'pt' ? 'Avançar para o Radar' : 'Next to Radar'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Simulated Email Client */}
          <div className="rounded-3xl bg-white border-2 border-rose-200 shadow-md overflow-hidden">
            {/* Window Top Bar */}
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-slate-600 ml-2">
                  {language === 'pt' ? 'Caixa de Entrada: 1 Mensagem Suspeita' : 'Inbox: 1 Suspicious Message'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-rose-200">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{language === 'pt' ? 'Pistas: ' : 'Clues: '} {revealedClues.length} / 4</span>
                </span>
              </div>
            </div>

            {/* Email Header */}
            <div className="bg-rose-50/50 p-5 border-b border-rose-100 space-y-3 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">{language === 'pt' ? 'De:' : 'From:'}</span>
                  <button
                    onClick={() => handleToggleClue(1)}
                    className={`px-3 py-1 rounded-xl font-mono text-xs cursor-pointer transition-all ${
                      revealedClues.includes(1)
                        ? 'bg-rose-200 text-rose-950 font-black border border-rose-400 ring-2 ring-rose-400/40'
                        : 'bg-rose-100/80 hover:bg-rose-200 text-rose-800 font-bold hover:scale-102'
                    }`}
                  >
                    Suporte Oficial &lt;aviso-urgente@servico-gratis-123.xyz&gt; 🔍
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">{language === 'pt' ? 'Assunto:' : 'Subject:'}</span>
                <button
                  onClick={() => handleToggleClue(2)}
                  className={`px-3 py-1 rounded-xl cursor-pointer transition-all text-xs sm:text-sm ${
                    revealedClues.includes(2)
                      ? 'bg-rose-200 text-rose-950 font-black border border-rose-400 ring-2 ring-rose-400/40'
                      : 'hover:bg-rose-100 font-bold text-rose-900 hover:scale-102'
                  }`}
                >
                  ⚠️ URGENTE: A tua conta será BLOQUEADA em 15 minutos se não clicares! 🔍
                </button>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6 space-y-5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              <p>
                {language === 'pt'
                  ? 'Caro utilizador, detetámos uma anomalia grave no teu computador e na tua conta escolar.'
                  : 'Dear user, we detected a severe malfunction on your computer and school account.'}
              </p>

              <p>
                {language === 'pt'
                  ? 'Para evitar a perda permanente de todos os teus ficheiros e jogos, deves clicar no botão abaixo imediatamente:'
                  : 'To avoid the permanent loss of all your files and games, you must click the button below immediately:'}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <button
                  onClick={() => handleToggleClue(3)}
                  className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all shadow-sm ${
                    revealedClues.includes(3)
                      ? 'bg-rose-600 text-white ring-4 ring-rose-300'
                      : 'bg-rose-500 hover:bg-rose-600 text-white hover:scale-102'
                  }`}
                >
                  {language === 'pt' ? '🔗 CLICA AQUI PARA DESBLOQUEAR A CONTA 🔍' : '🔗 CLICK HERE TO UNLOCK ACCOUNT 🔍'}
                </button>
                <p className="text-[11px] font-mono text-rose-700 font-bold">
                  {language === 'pt' ? 'Destino real da ligação: http://site-estranho-roubo.ru/login' : 'Real link: http://strange-data-theft.ru/login'}
                </p>
              </div>

              <div
                onClick={() => handleToggleClue(4)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  revealedClues.includes(4)
                    ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-400/40'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <p className="text-xs">
                  ⚠️ <strong>{language === 'pt' ? 'Atenção do Suporte: ' : 'Support Notice: '}</strong>
                  {language === 'pt'
                    ? 'Terás de introduzir a tua palavra-passe atual e o teu número de telemóvel para validares a identidade. 🔍'
                    : 'You must type your current password and phone number to verify identity. 🔍'}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Clues Progress Grid */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <span>{language === 'pt' ? 'As 4 Pistas Descobertas pelo Detetive:' : 'Discovered Clues:'}</span>
              </h3>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {revealedClues.length} / {clues.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clues.map((c) => {
                const isFound = revealedClues.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={`p-4 rounded-2xl border text-xs transition-all ${
                      isFound ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black mb-1">
                      {isFound ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                      )}
                      <span>{c.name[language]}</span>
                    </div>
                    {isFound && <p className="text-[11px] text-slate-700 leading-relaxed font-medium mt-1">{c.explanation[language]}</p>}
                  </div>
                );
              })}
            </div>

            {revealedClues.length === 4 && (
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>{language === 'pt' ? '🎉 Todas as 4 pistas foram desmascaradas!' : '🎉 All 4 red flags unmasked!'}</span>
                </div>
                <button
                  onClick={() => setActiveStage('radar')}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
                >
                  <span>{language === 'pt' ? 'Avançar para o Radar de Mensagens' : 'Next to Message Radar'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stage 2: Mobile Radar Scenarios */}
      {activeStage === 'radar' && (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
                {language === 'pt' ? `Mensagem ${currentRadarIdx + 1} de ${RADAR_ITEMS.length}` : `Message ${currentRadarIdx + 1} of ${RADAR_ITEMS.length}`}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {language === 'pt' ? '📱 Radar de Mensagens Suspeitas' : '📱 Suspicious Message Radar'}
              </h2>
            </div>
            <div className="w-full sm:w-36 bg-white/20 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-rose-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentRadarIdx + 1) / RADAR_ITEMS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Smartphone Simulator */}
          <div className="max-w-md mx-auto rounded-[2.5rem] bg-slate-900 p-4 shadow-2xl border-4 border-slate-700">
            {/* Phone Screen */}
            <div className="rounded-[2rem] bg-slate-100 overflow-hidden flex flex-col min-h-[380px]">
              {/* Phone Header */}
              {/* Phone Header */}
              <div className="bg-slate-800 text-white p-3.5 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-slate-300" />
                  <span className="truncate max-w-[150px]">{currentRadar.sender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] opacity-75">14:32</span>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="p-4 flex-1 flex flex-col justify-center space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs sm:text-sm text-slate-900 font-medium leading-relaxed flex items-start justify-between gap-2">
                  <span>{currentRadar.preview[language]}</span>
                  <AudioSpeakButton
                    id={`phishing-radar-msg-${currentRadar.id}`}
                    text={`${language === 'pt' ? 'Mensagem recebida de' : 'Message received from'} ${currentRadar.sender}: ${currentRadar.preview[language]}. ${currentRadar.question[language]}`}
                    language={language}
                    variant="icon"
                    size="xs"
                  />
                </div>
              </div>

              {/* Decision Buttons inside Phone */}
              <div className="p-4 bg-slate-200/80 border-t border-slate-300 space-y-2">
                <p className="text-[11px] font-black text-center text-slate-700 uppercase tracking-wider">
                  {currentRadar.question[language]}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={selectedRadarAnswer !== null}
                    onClick={() => handleRadarAnswer(true)}
                    className={`py-3 px-2 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedRadarAnswer !== null
                        ? currentRadar.isPhishing
                          ? 'bg-rose-600 text-white shadow-md'
                          : selectedRadarAnswer === true
                          ? 'bg-rose-300 text-rose-950'
                          : 'opacity-40 bg-slate-100 text-slate-500'
                        : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'É Phishing / Fraude!' : 'It is Phishing!'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedRadarAnswer !== null}
                    onClick={() => handleRadarAnswer(false)}
                    className={`py-3 px-2 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedRadarAnswer !== null
                        ? !currentRadar.isPhishing
                          ? 'bg-emerald-600 text-white shadow-md'
                          : selectedRadarAnswer === false
                          ? 'bg-rose-300 text-rose-950'
                          : 'opacity-40 bg-slate-100 text-slate-500'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'É Legítimo / Seguro' : 'It is Safe'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback & Next Button */}
          {selectedRadarAnswer !== null && (
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-500">{language === 'pt' ? 'Explicação pedagógica:' : 'Explanation:'}</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {currentRadar.explanation[language]}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleNextRadar}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                >
                  <span>
                    {currentRadarIdx + 1 < RADAR_ITEMS.length
                      ? language === 'pt'
                        ? 'Próxima Mensagem'
                        : 'Next Message'
                      : language === 'pt'
                      ? 'Ver Resultado Final'
                      : 'See Final Result'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Completed Screen */}
      {activeStage === 'completed' && (
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-rose-950 via-slate-900 to-red-950 text-white text-center space-y-6 shadow-2xl border-2 border-rose-400/30 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-950 text-4xl flex items-center justify-center mx-auto shadow-xl">
            🕵️
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-300 px-3 py-1 rounded-full bg-rose-400/20 border border-rose-400/30">
              {language === 'pt' ? 'Desafio Superado com Sucesso!' : 'Challenge Completed!'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              {language === 'pt' ? 'Detetive de Phishing Certificado!' : 'Certified Phishing Detective!'}
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Identificaste remetentes falsos, URLs enganosas, pressões de urgência e mensagens fraudulentas de jogos e SMS. Agora estás pronto para navegar em segurança!'
                : 'You mastered phishing detection, fake URLs analysis, and scam message radar!'}
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 font-black text-lg">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>+100 XP Ganho!</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveStage('emailLab');
                setRevealedClues([]);
                setCurrentRadarIdx(0);
                setSelectedRadarAnswer(null);
                setRadarScores([]);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Jogar Novamente' : 'Play Again'}</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md transition-all cursor-pointer"
            >
              <span>{language === 'pt' ? 'Concluir e Voltar aos Desafios' : 'Finish & Return'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

