import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, ShoppingBag, CreditCard, Truck, PackageCheck, ArrowRight, RotateCcw, Award, Lightbulb, HelpCircle, Wifi } from 'lucide-react';
import { Language } from '../../types';

interface TicEcommerceGameProps {
  language: Language;
  onBack: () => void;
  onFinish: (score: number, maxScore: number, percentage: number) => void;
}

interface StepItem {
  id: string;
  order: number;
  icon: string;
  title: { pt: string; en: string };
  desc: { pt: string; en: string };
  ictRole: { pt: string; en: string };
}

const ORDER_STEPS: StepItem[] = [
  {
    id: 's1',
    order: 1,
    icon: '🛒',
    title: { pt: '1. Escolher o Produto', en: '1. Choose Product' },
    desc: {
      pt: 'O cliente pesquisa no catálogo online, compara preços, fotos e opiniões de outros compradores.',
      en: 'Customer browses the digital catalog, comparing prices, photos, and customer reviews.',
    },
    ictRole: {
      pt: 'TIC: Plataforma Web, base de dados e filtros de pesquisa inteligentes.',
      en: 'ICT: Web platform, product database, and search filters.',
    },
  },
  {
    id: 's2',
    order: 2,
    icon: '📝',
    title: { pt: '2. Fazer a Encomenda', en: '2. Place Order' },
    desc: {
      pt: 'O cliente adiciona os artigos ao carrinho virtual e preenche os dados de entrega.',
      en: 'Customer adds items to virtual basket and inputs delivery details.',
    },
    ictRole: {
      pt: 'TIC: Sistema de carrinho de compras e formulários online seguros.',
      en: 'ICT: Shopping cart systems and encrypted web forms.',
    },
  },
  {
    id: 's3',
    order: 3,
    icon: '💳',
    title: { pt: '3. Efetuar o Pagamento Seguro', en: '3. Secure Payment' },
    desc: {
      pt: 'O pagamento é feito por cartão, referência bancária, MB Way ou contactless (NFC) em lojas físicas.',
      en: 'Payment is completed via card, bank reference, mobile app, or contactless NFC in physical stores.',
    },
    ictRole: {
      pt: 'TIC: Redes bancárias encriptadas e comunicação sem fios NFC de curta distância.',
      en: 'ICT: Encrypted banking gateways and Near Field Communication (NFC).',
    },
  },
  {
    id: 's4',
    order: 4,
    icon: '📦',
    title: { pt: '4. Preparação no Armazém', en: '4. Warehouse Preparation' },
    desc: {
      pt: 'O sistema informático do armazém localiza o produto e os operadores (ou robôs) embalam a encomenda.',
      en: 'Warehouse software locates the item and operators (or robots) pack the parcel.',
    },
    ictRole: {
      pt: 'TIC: Leitores de código de barras, robótica de armazém e gestão de stock automática.',
      en: 'ICT: Barcode scanners, warehouse robotics, and inventory databases.',
    },
  },
  {
    id: 's5',
    order: 5,
    icon: '🚚',
    title: { pt: '5. Transporte e Rastreio', en: '5. Transport & Live Tracking' },
    desc: {
      pt: 'A carrinha da transportadora leva a encomenda pelo caminho mais rápido calculado por GPS.',
      en: 'Courier vehicle transports parcel along fastest route calculated via GPS navigation.',
    },
    ictRole: {
      pt: 'TIC: GPS, aplicações de trânsito em tempo real e código de rastreio online.',
      en: 'ICT: GPS navigation, live route optimization, and tracking codes.',
    },
  },
  {
    id: 's6',
    order: 6,
    icon: '🏠',
    title: { pt: '6. Entrega ao Cliente', en: '6. Customer Delivery' },
    desc: {
      pt: 'A encomenda chega a casa do cliente ou a um cacifo digital seguro com código de recolha.',
      en: 'Parcel reaches customer home or an automated smart parcel locker.',
    },
    ictRole: {
      pt: 'TIC: Assinatura digital no terminal móvel, SMS com código de confirmação ou cacifos IoT.',
      en: 'ICT: Digital signature on handheld terminals, SMS confirmation codes, or IoT smart lockers.',
    },
  },
];

export const TicEcommerceGame: React.FC<TicEcommerceGameProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const [activeStepTab, setActiveStepTab] = useState(1);
  const [phase, setPhase] = useState<'flow' | 'quiz' | 'finished'>('flow');

  // Mini quiz on Contactless & Critical Thinking
  const [q1Choice, setQ1Choice] = useState<number | null>(null);
  const [q2Choice, setQ2Choice] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const curStep = ORDER_STEPS.find((s) => s.order === activeStepTab)!;

  const handleFinish = () => {
    setSubmittedQuiz(true);
    let correct = 0;
    if (q1Choice === 0) correct += 1;
    if (q2Choice === 0) correct += 1;
    const pct = Math.round((correct / 2) * 100);
    setPhase('finished');
    onFinish(pct, 100, pct);
  };

  const handleRestart = () => {
    setActiveStepTab(1);
    setPhase('flow');
    setQ1Choice(null);
    setQ2Choice(null);
    setSubmittedQuiz(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'pt' ? 'Voltar aos Desafios' : 'Back to Challenges'}</span>
      </button>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-700 via-orange-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider text-amber-200">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'pt' ? 'Comércio Eletrónico & Pagamentos' : 'E-Commerce & Payments'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">
            📦 {language === 'pt' ? 'Como Chega uma Compra Online & Pagamentos Contactless' : 'How Online Shopping Works & Contactless Payments'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl font-medium">
            {language === 'pt'
              ? 'Explora as 6 fases de uma compra online, descobre o papel das TIC em cada etapa e como a tecnologia contactless (NFC) funciona em pagamentos rápidos!'
              : 'Explore the 6 stages of e-commerce, see ICT in action at every step, and understand contactless NFC payments!'}
          </p>
        </div>
      </div>

      {phase === 'flow' && (
        <div className="space-y-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in">
          {/* Contactless / NFC Highlight Card */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center text-2xl shrink-0">
                <Wifi className="w-6 h-6 rotate-90 text-amber-900" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                  {language === 'pt' ? 'Conceito Chave: Contactless & NFC' : 'Key Concept: Contactless & NFC'}
                </span>
                <h3 className="text-sm sm:text-base font-black text-amber-950 mt-0.5">
                  {language === 'pt' ? 'Como funciona pagar por Contactless?' : 'How does Contactless payment work?'}
                </h3>
              </div>
            </div>
            <p className="text-xs text-amber-900 font-medium max-w-md leading-relaxed">
              {language === 'pt'
                ? 'Quando aproximamos o cartão ou telemóvel do terminal de pagamento (TPA), eles comunicam através de ondas de rádio de curto alcance (NFC - Near Field Communication), sem ser preciso inserir o cartão na ranhura!'
                : 'Near Field Communication (NFC) allows contactless cards and phones to exchange encrypted payment signals just by hovering near the terminal!'}
            </p>
          </div>

          {/* 6 Steps Interactive Horizontal Pipeline */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {language === 'pt' ? 'O Circuito de 6 Fases da Compra Online' : 'The 6-Step Online Shopping Pipeline'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
              {ORDER_STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStepTab(s.order)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    activeStepTab === s.order
                      ? 'border-amber-600 bg-amber-50 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-xs font-black text-slate-900 leading-tight">
                    {s.title[language]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Active Step Info */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-white border-2 border-amber-200 space-y-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-100 flex items-center justify-center text-3xl">
                {curStep.icon}
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                  {language === 'pt' ? `Fase ${curStep.order} de 6` : `Stage ${curStep.order} of 6`}
                </span>
                <h3 className="text-lg font-black text-slate-900">{curStep.title[language]}</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {curStep.desc[language]}
            </p>

            <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300 text-xs sm:text-sm text-amber-950 font-bold leading-relaxed">
              💡 {curStep.ictRole[language]}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setPhase('quiz')}
              className="px-6 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>{language === 'pt' ? 'Responder às Perguntas do Desafio' : 'Answer Challenge Questions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {phase === 'quiz' && (
        <div className="space-y-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {language === 'pt' ? 'Pensamento Crítico & Compreensão' : 'Critical Thinking & Comprehension'}
          </h2>

          {/* Question 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
              {language === 'pt' ? 'Questão 1: Pagamento Contactless' : 'Question 1: Contactless Payment'}
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900">
              {language === 'pt'
                ? 'Como é que a tecnologia contactless permite pagar sem inserir o cartão no terminal?'
                : 'How does contactless technology enable payment without inserting the card into the terminal?'}
            </p>
            <div className="space-y-2">
              {[
                {
                  text: {
                    pt: 'Comunica através de ondas de rádio de curta distância (tecnologia NFC).',
                    en: 'Communicates via short-range radio signals (NFC technology).',
                  },
                  isCorrect: true,
                },
                {
                  text: {
                    pt: 'Tira uma fotografia ao cartão através de uma câmara de satélite no espaço.',
                    en: 'Photographs the card using space satellite cameras.',
                  },
                  isCorrect: false,
                },
              ].map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQ1Choice(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    q1Choice === idx
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {opt.text[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Critical analysis */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
              {language === 'pt' ? 'Questão 2: Pensamento Crítico' : 'Question 2: Critical Thinking'}
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900">
              {language === 'pt'
                ? 'Comprar online é sempre melhor do que comprar numa loja física local?'
                : 'Is online shopping always superior to shopping at local physical stores?'}
            </p>
            <div className="space-y-2">
              {[
                {
                  text: {
                    pt: 'Não necessariamente. Comprar no comércio local apoia a comunidade, permite ver o produto na mão e evita custos de transporte e embalagens.',
                    en: 'Not necessarily. Local shops support local economy, allow touching items directly, and reduce courier packaging waste.',
                  },
                  isCorrect: true,
                },
                {
                  text: {
                    pt: 'Sim, as lojas físicas vão desaparecer todas e nunca mais ninguém deve ir às compras a pé.',
                    en: 'Yes, physical shops will vanish completely and no one should shop in person.',
                  },
                  isCorrect: false,
                },
              ].map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQ2Choice(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    q2Choice === idx
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {opt.text[language]}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              disabled={q1Choice === null || q2Choice === null}
              onClick={handleFinish}
              className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md transition-all ${
                q1Choice !== null && q2Choice !== null
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer hover:scale-102 active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{language === 'pt' ? 'Concluir Desafio' : 'Finish Challenge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {phase === 'finished' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-4xl mx-auto shadow-inner border border-amber-200 animate-bounce">
            🛍️
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {language === 'pt' ? 'Mestre do Comércio Digital!' : 'E-Commerce Master!'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'pt' ? 'Conheces todo o circuito do Comércio e Pagamentos!' : 'You Mastered E-Commerce & Payments!'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {language === 'pt'
                ? 'Compreendeste como as TIC suportam desde o clique inicial na loja online até à entrega por GPS, e como o contactless (NFC) torna os pagamentos rápidos e seguros!'
                : 'You learned how ICT powers everything from catalog clicks to GPS delivery and contactless NFC payment!'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'pt' ? 'Repetir Desafio' : 'Play Again'}</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{language === 'pt' ? 'Concluir (+100 XP)' : 'Finish (+100 XP)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
