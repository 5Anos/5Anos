import { ThemeDefinition } from '../types';

export const themeTicSociedadeData: ThemeDefinition = {
  id: 'tic-sociedade',
  number: 2,
  title: {
    pt: 'TIC na Sociedade',
    en: 'ICT in Society',
  },
  tagline: {
    pt: 'Descobre o que são as TIC, o seu impacto no mundo real e aprende a navegar com cidadania e responsabilidade.',
    en: 'Discover what ICT is, its real-world impact, and learn to navigate responsibly and safely.',
  },
  intro: {
    pt: 'As Tecnologias da Informação e Comunicação (TIC) estão em todo o lado: na escola, nos hospitais, no trânsito, no comércio e no ambiente. Descobre como a tecnologia nos ajuda a resolver problemas do dia a dia, como mudou a sociedade ao longo dos anos e como a podes utilizar com equilíbrio e segurança.',
    en: 'Information and Communication Technologies (ICT) are everywhere: school, hospitals, transport, commerce, and the environment. Discover how technology helps solve real-world problems and how to use it safely.',
  },
  icon: '🌐',
  illustrationKey: 'tic-sociedade',
  accentColor: 'indigo',
  badgeCount: 3,
  lessons: [
    {
      eyebrow: { pt: 'O que são as TIC?', en: 'What is ICT?' },
      h: { pt: 'Mais do que aparelhos: a tecnologia resolve problemas!', en: 'More than devices: tech solves problems!' },
      body: {
        pt: 'A sigla <strong>TIC</strong> significa <em>Tecnologias da Informação e Comunicação</em>.<br><br>As TIC não são apenas computadores ou telemóveis físicos. São todas as tecnologias, equipamentos, aplicações e redes usadas para <strong>tratar e comunicar informação</strong>.<br><br>💡 <strong>A Regra de Ouro:</strong> A tecnologia pode ajudar-nos a resolver problemas e a realizar tarefas do dia a dia!',
        en: 'The acronym <strong>ICT</strong> stands for <em>Information and Communication Technologies</em>.<br><br>ICT is not just physical computers or phones. It encompasses all technologies, equipment, applications, and networks used to <strong>process and communicate information</strong>.<br><br>💡 <strong>Core Rule:</strong> Technology can help us solve problems and perform daily tasks!',
      },
      icon: '💡',
    },
    {
      eyebrow: { pt: 'Aplicação das TIC', en: 'ICT Applications' },
      h: { pt: 'As TIC na Escola, Saúde, Transportes, Comércio e Ambiente', en: 'ICT in School, Health, Transport, Commerce & Environment' },
      body: {
        pt: 'As Tecnologias da Informação e Comunicação estão presentes nos momentos mais importantes da sociedade moderna. Em cada setor, cumprem uma missão essencial:<br><br><ul><li><strong>🏫 Escola e Estudo:</strong> Plataformas digitais (trabalhos e avisos), catálogos da biblioteca em segundos, quadros interativos e caderneta digital escolar.</li><li><strong>🩺 Saúde e Medicina:</strong> Processos clínicos eletrónicos (fichas de saúde digitais como o Registo de Saúde Eletrónico, que reúnem com segurança o historial médico, consultas e vacinas para profissionais de saúde autorizados), consultas por telemedicina e robôs cirúrgicos de precisão (que auxiliam os cirurgiões humanos, sem os substituir).</li><li><strong>🚗 Transportes e Mobilidade:</strong> O sistema <em>GPS</em> calcula a localização através de sinais de satélite e, em conjunto com redes de comunicação e aplicações, ajuda a encontrar os melhores trajetos e a acompanhar os transportes em tempo real.</li><li><strong>💳 Comércio e Pagamentos:</strong> Pagamentos <em>Contactless (NFC)</em> por aproximação a muito curta distância e o circuito das compras online (escolha, encomenda, pagamento seguro, separação em armazém, transporte com seguimento e entrega ao destinatário).</li><li><strong>🌾 Agricultura, Indústria e Ambiente:</strong> Sensores de humidade de solo (IoT) que poupam milhares de litros de água, robôs industriais e satélites de previsão meteorológica.</li></ul>',
        en: 'ICT powers the most vital sectors of our society:<br><br><ul><li><strong>🏫 School & Study:</strong> Digital platforms, instant library catalogs, interactive smartboards, and online student records.</li><li><strong>🩺 Healthcare & Medicine:</strong> Electronic health records (such as centralized digital records consolidating medical history, appointments, and vaccines securely for authorized healthcare professionals), remote telemedicine, and precision surgical robotic tools (assisting, never replacing doctors).</li><li><strong>🚗 Transport & Mobility:</strong> The <em>GPS</em> system determines exact location via satellite signals and, combined with communication networks and apps, helps find optimal routes and track public transit in real time.</li><li><strong>💳 Commerce & Payments:</strong> Tap-to-pay Contactless (NFC) via very short-range wireless communication and the e-commerce fulfillment cycle (item selection, ordering, secure checkout, warehouse dispatch, tracked transport, and delivery).</li><li><strong>🌾 Agriculture, Industry & Environment:</strong> IoT soil moisture sensors saving water, industrial robotics, and climate monitoring satellites.</li></ul>',
      },
      icon: '🌐',
    },
    {
      eyebrow: { pt: 'História e Evolução', en: 'History & Evolution' },
      h: { pt: 'Do ENIAC de 1946 aos supercomputadores e profissões digitais', en: 'From 1946 ENIAC to supercomputers & ICT careers' },
      body: {
        pt: '• <strong>ENIAC (1946):</strong> Um dos primeiros computadores do mundo, ocupava uma sala inteira de 160 metros quadrados!<br>• <strong>Supercomputadores:</strong> Máquinas gigantes que realizam biliões de cálculos por segundo para a investigação e meteorologia.<br>• <strong>Profissões TIC:</strong> Programadores de aplicações (aplicações), especialistas em cibersegurança, designers web e engenheiros de robótica.',
        en: '• <strong>ENIAC (1946):</strong> One of the first computers, occupying an entire 160 m² room!<br>• <strong>Supercomputers:</strong> Processing trillions of calculations per second for science.<br>• <strong>ICT Careers:</strong> App developers, cybersecurity defenders, web designers, and robotics engineers.',
      },
      icon: '⚡',
    },
    {
      eyebrow: { pt: 'TIC: vantagens e desafios', en: 'ICT: Advantages & Challenges' },
      h: { pt: 'TIC: vantagens e desafios', en: 'ICT: Advantages & Challenges' },
      body: {
        pt: '<div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-1"><div class="p-4 bg-emerald-50/90 rounded-2xl border-2 border-emerald-200/90 shadow-2xs space-y-2.5"><div class="flex items-center gap-2 text-emerald-900 font-black text-sm sm:text-base"><span class="text-2xl">🌟</span><span>VANTAGENS DAS TIC</span></div><div class="space-y-2 text-xs sm:text-sm text-slate-800 font-medium"><div class="p-2.5 bg-white/80 rounded-xl border border-emerald-100 flex items-start gap-2.5"><span class="text-lg shrink-0">💬</span><div><strong>Facilita a comunicação:</strong> falas com amigos e família num segundo por mensagem ou videochamada.</div></div><div class="p-2.5 bg-white/80 rounded-xl border border-emerald-100 flex items-start gap-2.5"><span class="text-lg shrink-0">📚</span><div><strong>Ajuda a aprender:</strong> pesquisas para a escola, vês vídeos educativos e jogas jogos didáticos.</div></div></div></div><div class="p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-200/90 shadow-2xs space-y-2.5"><div class="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base"><span class="text-2xl">⚠️</span><span>DESAFIOS DAS TIC</span></div><div class="space-y-2 text-xs sm:text-sm text-slate-800 font-medium"><div class="p-2.5 bg-white/80 rounded-xl border border-amber-100 flex items-start gap-2.5"><span class="text-lg shrink-0">🎯</span><div><strong>Pode distrair:</strong> jogos e notificações tiram o foco dos estudos e das aulas.</div></div><div class="p-2.5 bg-white/80 rounded-xl border border-amber-100 flex items-start gap-2.5"><span class="text-lg shrink-0">⏳</span><div><strong>Demasiado tempo de ecrã:</strong> cansa os olhos, prejudica o sono e tira tempo para brincar lá fora.</div></div><div class="p-2.5 bg-white/80 rounded-xl border border-amber-100 flex items-start gap-2.5"><span class="text-lg shrink-0">🔍</span><div><strong>Informação incorreta:</strong> nem tudo na Internet é verdade; confirma sempre com professores!</div></div></div></div></div>',
        en: '<div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-1"><div class="p-4 bg-emerald-50/90 rounded-2xl border-2 border-emerald-200/90 shadow-2xs space-y-2.5"><div class="flex items-center gap-2 text-emerald-900 font-black text-sm sm:text-base"><span class="text-2xl">🌟</span><span>ICT ADVANTAGES</span></div><div class="space-y-2 text-xs sm:text-sm text-slate-800 font-medium"><div class="p-2.5 bg-white/80 rounded-xl border border-emerald-100 flex items-start gap-2.5"><span class="text-lg shrink-0">💬</span><div><strong>Facilitates communication:</strong> instant messages and video calls with friends and family.</div></div><div class="p-2.5 bg-white/80 rounded-xl border border-emerald-100 flex items-start gap-2.5"><span class="text-lg shrink-0">📚</span><div><strong>Helps you learn:</strong> easy school research, educational videos, and learning games.</div></div></div></div><div class="p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-200/90 shadow-2xs space-y-2.5"><div class="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base"><span class="text-2xl">⚠️</span><span>ICT CHALLENGES</span></div><div class="space-y-2 text-xs sm:text-sm text-slate-800 font-medium"><div class="p-2.5 bg-white/80 rounded-xl border border-amber-100 flex items-start gap-2.5"><span class="text-lg shrink-0">🎯</span><div><strong>Can distract you:</strong> games and notifications steal study focus.</div></div><div class="p-2.5 bg-white/80 rounded-xl border border-amber-100 flex items-start gap-2.5"><span class="text-lg shrink-0">⏳</span><div><strong>Excessive screen time:</strong> strains eyes, harms sleep, and reduces outdoor play.</div></div><div class="p-2.5 bg-white/80 rounded-xl border border-amber-100 flex items-start gap-2.5"><span class="text-lg shrink-0">🔍</span><div><strong>Inaccurate info:</strong> not everything online is true; always verify facts!</div></div></div></div></div>',
      },
      icon: '⚖️',
    },
    {
      eyebrow: { pt: 'Tecnologia e ambiente', en: 'Technology and Environment' },
      h: { pt: 'Tecnologia e ambiente', en: 'Technology and Environment' },
      body: {
        pt: '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-1"><div class="p-3.5 bg-red-50/90 rounded-2xl border-2 border-red-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-red-900 font-black text-xs sm:text-sm"><span class="text-xl">🗑️</span><span>LIXO ELETRÓNICO (E-WASTE)</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">São computadores, telemóveis, tablets, consolas e pilhas velhas que já não funcionam.</p></div><div class="p-3.5 bg-rose-50/90 rounded-2xl border-2 border-rose-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-rose-950 font-black text-xs sm:text-sm"><span class="text-xl">⛔</span><span>NUNCA NO LIXO COMUM!</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">Têm baterias e químicos perigosos que poluem o solo e a água que bebemos.</p></div><div class="p-3.5 bg-sky-50/90 rounded-2xl border-2 border-sky-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-sky-950 font-black text-xs sm:text-sm"><span class="text-xl">🔄</span><span>REUTILIZAR E RECICLAR</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">Se funcionar, <strong>doa a alguém</strong>. Se estiver estragado, entrega no <strong>Ponto Eletrão</strong> ou Ecocentro!</p></div><div class="p-3.5 bg-emerald-50/90 rounded-2xl border-2 border-emerald-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-emerald-950 font-black text-xs sm:text-sm"><span class="text-xl">🌍</span><span>CONSUMO RESPONSÁVEL</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">Usa capa protetora, cuida dos aparelhos e desliga da tomada para poupar energia.</p></div></div>',
        en: '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-1"><div class="p-3.5 bg-red-50/90 rounded-2xl border-2 border-red-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-red-900 font-black text-xs sm:text-sm"><span class="text-xl">🗑️</span><span>E-WASTE</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">Old broken phones, tablets, computers, consoles, and dead batteries.</p></div><div class="p-3.5 bg-rose-50/90 rounded-2xl border-2 border-rose-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-rose-950 font-black text-xs sm:text-sm"><span class="text-xl">⛔</span><span>NEVER IN REGULAR TRASH!</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">Contain batteries and toxins that poison soil and drinking water.</p></div><div class="p-3.5 bg-sky-50/90 rounded-2xl border-2 border-sky-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-sky-950 font-black text-xs sm:text-sm"><span class="text-xl">🔄</span><span>REUSE & RECYCLE</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">If working, <strong>donate it</strong>. If broken, drop it at <strong>Ponto Eletrão</strong> or an Eco-center!</p></div><div class="p-3.5 bg-emerald-50/90 rounded-2xl border-2 border-emerald-200/90 shadow-2xs space-y-1.5"><div class="flex items-center gap-2 text-emerald-950 font-black text-xs sm:text-sm"><span class="text-xl">🌍</span><span>RESPONSIBLE USE</span></div><p class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">Use protective cases, treat devices well, and unplug to save electricity.</p></div></div>',
      },
      icon: '🌱',
    },
  ],
  modules: [
    {
      id: 'tic-soc-o-que-sao',
      themeId: 'tic-sociedade',
      number: 1,
      title: {
        pt: 'O que são as TIC e para que servem?',
        en: 'What is ICT and what is its purpose?',
      },
      shortDesc: {
        pt: 'Aprende a definição correta de TIC, como vão além de aparelhos físicos e como resolvem problemas de informação e comunicação.',
        en: 'Learn the true definition of ICT, how it transcends devices, and solves information and communication problems.',
      },
      icon: '💡',
      explanation: {
        pt: [
          'As TIC (Tecnologias da Informação e Comunicação) são todas as tecnologias, equipamentos, aplicações e redes usadas para tratar e comunicar informação.',
          'Dizemos que as TIC não são apenas computadores ou telemóveis porque o mais importante é a sua utilidade: comunicar com pessoas distantes, aprender novos conteúdos e automatizar tarefas do quotidiano.',
        ],
        en: [
          'ICT encompasses all technologies, equipment, applications, and networks used to process and communicate information.',
          'ICT is more than hardware: its true value lies in connecting people, facilitating learning, and solving everyday challenges.',
        ],
      },
      example: {
        title: {
          pt: 'Exemplo: O Trabalho de Ciências',
          en: 'Example: The Science Assignment',
        },
        scenario: {
          pt: 'O Tiago quer partilhar um projeto escolar com a sua avó que vive longe. Ao fazer uma videochamada pela Internet, o Tiago está a usar as TIC para ultrapassar a barreira da distância física.',
          en: 'Tiago shares a school project with his grandma living far away. Using a video call over the Internet, he leverages ICT to bridge geographical distance in real-time.',
        },
        tip: {
          pt: 'A tecnologia pode ajudar-nos a resolver problemas e a realizar tarefas do dia a dia!',
          en: 'Technology can help us solve problems and carry out everyday tasks!',
        },
      },
      funFact: {
        pt: 'Sabias que a palavra "Informática" nasceu da junção de "INFORmação" com autoMÁTICA"?',
        en: 'Did you know the word "Informatics" comes from combining "INFORmation" with "autoMATIC"?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se estás ao lado do teu colega de carteira e precisas de um lápis, deves mandar-lhe uma mensagem ou falar diretamente?',
          en: 'If seated beside your classmate and needing a pencil, should you text them or talk directly?',
        },
        clue: {
          pt: 'Pensa no tempo e na proximidade física das pessoas.',
          en: 'Think about speed and face-to-face connection.',
        },
        reflection: {
          pt: 'Falar diretamente cara a cara é mais rápido, simpático e evita o uso desnecessário de ecrãs!',
          en: 'Speaking face-to-face is warmer, faster, and avoids unnecessary screen use!',
        },
      },
      quizQuestions: [
        {
          id: 'q-mod1-1',
          question: {
            pt: 'O que significa a sigla TIC?',
            en: 'What does the acronym ICT stand for?',
          },
          options: {
            pt: [
              'Técnicas de Informática e Cabos',
              'Tecnologias da Informação e Comunicação',
              'Telemóveis e Internet em Casa',
              'Transmissão Instantânea de Computadores',
            ],
            en: [
              'Techniques of Informatics and Cables',
              'Information and Communication Technologies',
              'Telephones and Internet at Home',
              'Instant Computer Transmission',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'TIC significa Tecnologias da Informação e Comunicação.',
            en: 'ICT stands for Information and Communication Technologies.',
          },
        },
      ],
    },
    {
      id: 'tic-soc-setores',
      themeId: 'tic-sociedade',
      number: 2,
      title: {
        pt: 'Aplicação das TIC na Sociedade',
        en: 'ICT Applications in Society',
      },
      shortDesc: {
        pt: 'Compreende como a escola, a saúde, os transportes (GPS e redes), os pagamentos contactless (NFC) e os sensores IoT transformam o nosso quotidiano.',
        en: 'Explore how school, health, GPS and connected transport, contactless NFC payments, and IoT sensors transform our daily lives.',
      },
      icon: '🌐',
      explanation: {
        pt: [
          'Na saúde, as TIC permitem teleconsultas à distância e auxiliam cirurgiões com robôs de alta precisão.',
          'Nos transportes, o GPS obtém a localização por satélite e, combinado com aplicações e redes móveis, permite orientar condutores e acompanhar autocarros ou comboios.',
          'No comércio, a tecnologia contactless utiliza ondas NFC para pagamentos rápidos sem inserir o cartão.',
          'Na agricultura e ambiente, sensores de humidade e IoT permitem regar apenas o necessário e poupar água.',
        ],
        en: [
          'In healthcare, ICT enables remote telemedicine and precision surgical robots.',
          'In transport, GPS provides satellite location and, paired with apps and mobile networks, guides drivers and tracks public transit.',
          'In commerce, contactless NFC powers fast and secure card tapping.',
          'In agriculture and environment, IoT sensors monitor moisture and save water.',
        ],
      },
      example: {
        title: {
          pt: 'Exemplo: A Rega Inteligente',
          en: 'Example: Smart Irrigation',
        },
        scenario: {
          pt: 'Um agricultor instala sensores IoT na terra. O sistema só abre a água quando o solo está seco, poupando milhares de litros.',
          en: 'A farmer connects IoT soil sensors. The system irrigates only when ground moisture drops, saving thousands of liters.',
        },
        tip: {
          pt: 'Os sensores e a IoT tornam a produção mais sustentável e amiga do ambiente.',
          en: 'Sensors and IoT make agriculture more sustainable.',
        },
      },
      funFact: {
        pt: 'Os pagamentos contactless utilizam NFC, uma tecnologia de comunicação sem fios de muito curto alcance.',
        en: 'Contactless payments use NFC, a very short-range wireless communication technology.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Comprar online é sempre melhor do que comprar numa loja tradicional local?',
          en: 'Is online shopping always superior to shopping locally in person?',
        },
        clue: {
          pt: 'Pensa no apoio ao comércio de bairro, no toque do produto e nas embalagens descartáveis.',
          en: 'Think about neighborhood business, seeing the item, and packaging waste.',
        },
        reflection: {
          pt: 'As lojas locais apoiam a nossa comunidade, permitem ver os produtos na mão e não geram tantas caixas de transporte.',
          en: 'Local stores strengthen community life, let you inspect items, and reduce courier packaging.',
        },
      },
      quizQuestions: [
        {
          id: 'q-mod2-1',
          question: {
            pt: 'Que tecnologia permite pagamentos por aproximação sem inserir o cartão?',
            en: 'Which technology enables tap-to-pay without inserting the card?',
          },
          options: {
            pt: [
              'Bluetooth de longo alcance',
              'Sensor de humidade do solo',
              'NFC (Near Field Communication / Contactless)',
              'Impressão a laser',
            ],
            en: [
              'Long-range Bluetooth',
              'Soil moisture sensor',
              'NFC (Near Field Communication / Contactless)',
              'Laser printing',
            ],
          },
          correctIndex: 2,
          explanation: {
            pt: 'O contactless utiliza ondas de rádio NFC de curto alcance.',
            en: 'Contactless payments utilize short-range NFC radio signals.',
          },
        },
      ],
    },
    {
      id: 'tic-soc-historia-sociedade',
      themeId: 'tic-sociedade',
      number: 3,
      title: {
        pt: 'Evolução Tecnológica, Antes e Agora, e Profissões TIC',
        en: 'Tech Evolution, Then & Now, and ICT Careers',
      },
      shortDesc: {
        pt: 'Do ENIAC de 1946 aos supercomputadores de hoje: vê o que mudou na sociedade e que profissões existem no mundo digital.',
        en: 'From 1946 ENIAC to modern supercomputers: see societal changes and digital careers.',
      },
      icon: '⚡',
      explanation: {
        pt: [
          'Os primeiros computadores, como o ENIAC, ocupavam salões inteiros. Hoje temos computadores compactos e supercomputadores que calculam previsões meteorológicas complexas.',
          'A sociedade mudou tarefas essenciais: a comunicação passou de cartas para mensagens instantâneas e a pesquisa de enciclopédias físicas para motores de busca online.',
        ],
        en: [
          'Early computers like ENIAC occupied entire halls. Today, compact devices and supercomputers handle scientific modeling.',
          'Everyday society evolved from letters to instant messaging, and heavy encyclopedias to online search.',
        ],
      },
      example: {
        title: {
          pt: 'Exemplo: A Previsão do Tempo',
          en: 'Example: Weather Forecasting',
        },
        scenario: {
          pt: 'Os meteorologistas utilizam supercomputadores para processar biliões de dados de satélites e prever tempestades com antecedência.',
          en: 'Meteorologists use supercomputers to calculate complex satellite climate models and predict storms.',
        },
        tip: {
          pt: 'A miniaturização e o aumento de potência tornaram a tecnologia acessível a todos.',
          en: 'Miniaturization brought powerful computing to everyone.',
        },
      },
      funFact: {
        pt: 'O telemóvel que tens no bolso é milhões de vezes mais potente do que o computador que levou os astronautas à Lua em 1969!',
        en: 'Your smartphone is millions of times more powerful than the Apollo guidance computer in 1969!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Como seria a tua vida se para falar com um amigo tivesses de esperar 1 semana por uma carta de correio?',
          en: 'How would life feel if sending a message required waiting 1 week for a postal letter?',
        },
        clue: {
          pt: 'Pensa na velocidade e na facilidade das mensagens instantâneas.',
          en: 'Think about instant messaging convenience.',
        },
        reflection: {
          pt: 'As TIC trouxeram uma rapidez incrível, mas também exigem paciência e equilíbrio nas relações humanas!',
          en: 'ICT brought instant speed, but human relationships still require patience and balance!',
        },
      },
      quizQuestions: [
        {
          id: 'q-mod3-1',
          question: {
            pt: 'Para que serve um supercomputador?',
            en: 'What is the purpose of a supercomputer?',
          },
          options: {
            pt: [
              'Guardar apenas fotografias e documentos de texto simples',
              'Processar grandes volumes de cálculos científicos e meteorológicos',
              'Imprimir folhas em papel com maior velocidade',
              'Substituir a rede de Internet em todas as escolas',
            ],
            en: [
              'Store only photographs and simple text documents',
              'Process massive volumes of scientific and weather calculations',
              'Print paper sheets at higher speeds',
              'Replace the Internet network in all schools',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Supercomputadores realizam cálculos gigantescos para investigação científica e previsões meteorológicas.',
            en: 'Supercomputers process massive computational models for science and weather forecasting.',
          },
        },
      ],
    },
    {
      id: 'tic-soc-vantagens-desafios',
      themeId: 'tic-sociedade',
      number: 4,
      title: {
        pt: 'TIC: vantagens e desafios',
        en: 'ICT: Advantages & Challenges',
      },
      shortDesc: {
        pt: 'Descobre as grandes vantagens da tecnologia para comunicar e aprender, e aprende a lidar com os desafios: distrações, tempo de ecrã e informação incorreta.',
        en: 'Discover the advantages of tech for communicating and learning, and how to tackle challenges: distractions, screen time, and misinformation.',
      },
      icon: '⚖️',
      explanation: {
        pt: [
          'Vantagens das TIC: Facilitam a comunicação com amigos e família em qualquer lugar, e ajudam imenso a aprender através de pesquisas, vídeos educativos e jogos pedagógicos.',
          'Desafios das TIC: Podem distrair dos estudos com notificações, podem levar a passar demasiado tempo em frente ao ecrã (o que prejudica a visão e o sono), e nem toda a informação encontrada online é correta (é preciso confirmar sempre com fontes seguras).',
        ],
        en: [
          'Advantages of ICT: Facilitates instant communication worldwide and helps you learn through research, educational videos, and learning games.',
          'Challenges of ICT: Can cause distractions, may lead to excessive screen time, and not all information found online is accurate (always verify).',
        ],
      },
      example: {
        title: {
          pt: 'Exemplo: O Trabalho de Grupo',
          en: 'Example: The Group Project',
        },
        scenario: {
          pt: 'O Martim usa o computador para pesquisar curiosidades sobre os golfinhos e faz videochamada com o colega de grupo (Vantagens!). Mas desliga as notificações dos jogos para não se distrair nem perder tempo de estudo (Desafio superado!).',
          en: 'Martim uses the computer to research dolphin facts and video calls his project partner (Advantages!). He mutes game notifications so he stays focused (Challenge solved!).',
        },
        tip: {
          pt: 'O equilíbrio é o segredo: usa a tecnologia para aprender e comunicar, mas reserva tempo para brincar ao ar livre e estar com a família!',
          en: 'Balance is key: use tech to learn and connect, but save time for outdoor play and family!',
        },
      },
      funFact: {
        pt: 'Fazer uma pausa de 5 minutos a olhar para longe a cada 30 minutos de ecrã ajuda os teus olhos a descansarem e evita dores de cabeça!',
        en: 'Taking a 5-minute break looking far away every 30 minutes rests your eyes and prevents headaches!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se vires um vídeo na Internet a dizer que amanhã não há aulas em Portugal, deves partilhar logo com toda a turma?',
          en: 'If you see an online video claiming schools are closed tomorrow, should you immediately share it?',
        },
        clue: {
          pt: 'Lembra-te do desafio: nem toda a informação encontrada online é correta.',
          en: 'Remember the challenge: not all information found online is true.',
        },
        reflection: {
          pt: 'Não deves partilhar sem confirmar! Pergunta primeiro aos teus pais ou professores para saber se a notícia é verdadeira ou se é uma brincadeira/fake news.',
          en: 'Do not share without confirming! First ask parents or teachers if it is true or a fake rumor.',
        },
      },
      quizQuestions: [
        {
          id: 'q-mod4-1',
          question: {
            pt: 'Qual destas opções é uma VANTAGEM das Tecnologias da Informação e Comunicação?',
            en: 'Which of these is an ADVANTAGE of ICT?',
          },
          options: {
            pt: [
              'Levar a passar demasiado tempo em frente ao ecrã',
              'Facilitar a comunicação com familiares e amigos distantes',
              'Distrair com notificações durante as aulas',
              'Espalhar informação que nem sempre é correta',
            ],
            en: [
              'Causing excessive screen time',
              'Facilitating communication with distant family and friends',
              'Distracting with notifications during lessons',
              'Spreading inaccurate information',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Facilitar a comunicação e ajudar a aprender são duas grandes vantagens das TIC.',
            en: 'Facilitating communication and helping us learn are two major advantages of ICT.',
          },
        },
        {
          id: 'q-mod4-2',
          question: {
            pt: 'Porque é que encontrar informação na Internet pode ser um desafio?',
            en: 'Why can finding information on the Internet be a challenge?',
          },
          options: {
            pt: [
              'Porque as páginas na Internet nunca são atualizadas',
              'Porque nem toda a informação online é correta ou fiável',
              'Porque os motores de busca mostram apenas artigos de ficção',
              'Porque só quem sabe programar consegue aceder a sites',
            ],
            en: [
              'Because online pages are never updated',
              'Because not all information online is accurate or reliable',
              'Because search engines only show fiction articles',
              'Because only programmers can access websites',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Na Internet qualquer pessoa pode publicar conteúdos, pelo que devemos sempre confirmar fontes seguras.',
            en: 'Anyone can publish online, so we must always check trusted sources.',
          },
        },
      ],
    },
    {
      id: 'tic-soc-tecnologia-ambiente',
      themeId: 'tic-sociedade',
      number: 5,
      title: {
        pt: 'Tecnologia e ambiente',
        en: 'Technology & Environment',
      },
      shortDesc: {
        pt: 'Aprende o que é o lixo eletrónico, porque nunca o deitar no lixo comum, como reutilizar e reciclar no Ponto Eletrão e praticar o consumo responsável.',
        en: 'Learn about e-waste, why never in regular trash, reusing and recycling at Ponto Eletrão, and responsible tech habits.',
      },
      icon: '🌱',
      explanation: {
        pt: [
          'O lixo eletrónico (e-waste) são computadores, telemóveis, tablets, consolas e pilhas velhas que deixam de funcionar.',
          'Nunca devemos deitar equipamentos eletrónicos no lixo comum porque contêm substâncias tóxicas (chumbo, mercúrio, baterias de lítio) que contaminam o solo e a água, além de perderem materiais valiosos que poderiam ser reciclados.',
          'Praticar a reutilização (dar a quem precisa ou reparar), a reciclagem em locais próprios (como o Ponto Eletrão e Ecocentros) e o consumo responsável (cuidar dos aparelhos e poupar energia) protege o nosso planeta!',
        ],
        en: [
          'Electronic waste (e-waste) includes old computers, phones, tablets, consoles, and batteries that no longer work.',
          'Never discard electronics in regular trash because they contain toxic chemicals (lead, mercury, lithium batteries) that contaminate soil and water, and valuable materials are wasted.',
          'Reusing (passing to someone or repairing), recycling at dedicated sites (like Ponto Eletrão and Eco-centers), and responsible consumption protects our planet!',
        ],
      },
      example: {
        title: {
          pt: 'Exemplo: O Telemóvel Antigo da Mãe',
          en: 'Example: Mom’s Old Phone',
        },
        scenario: {
          pt: 'A mãe da Leonor trocou de telemóvel porque a bateria durava pouco. A Leonor e a mãe levaram o aparelho a uma loja para trocar a bateria e ofereceram o telemóvel ao avô para ele poder falar com a família por videochamada!',
          en: 'Leonor’s mom replaced her phone battery and gifted the refreshed device to grandpa so he could video call the family!',
        },
        tip: {
          pt: 'Reutilizar e reparar é a melhor forma de poupar recursos do planeta Terra!',
          en: 'Reusing and repairing is the best way to save planet Earth’s resources!',
        },
      },
      funFact: {
        pt: 'Sabias que uma tonelada de telemóveis velhos pode conter mais ouro e prata do que uma tonelada de pedra de uma mina de ouro?',
        en: 'Did you know a metric ton of old phones can contain more gold and silver than a ton of rock from a gold mine?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se tiveres pilhas gastas do comando da televisão ou de um brinquedo, onde as deves colocar?',
          en: 'If you have depleted batteries from a TV remote or toy, where should you place them?',
        },
        clue: {
          pt: 'Lembra-te do Pilhão e do Ponto Eletrão.',
          en: 'Remember the battery recycling box and Ponto Eletrão.',
        },
        reflection: {
          pt: 'Devem ser colocadas no Pilhão ou Ponto Eletrão mais próximo (no supermercado ou na escola), NUNCA no lixo comum de casa!',
          en: 'They must go into a battery collection bin (Pilhão) or Ponto Eletrão, NEVER in household trash!',
        },
      },
      quizQuestions: [
        {
          id: 'q-mod5-1',
          question: {
            pt: 'Porque é que NUNCA devemos deitar equipamentos eletrónicos no lixo comum?',
            en: 'Why should we NEVER throw electronic equipment into regular trash?',
          },
          options: {
            pt: [
              'Porque contêm substâncias perigosas e materiais que devem ser reciclados',
              'Porque consomem a eletricidade dos contentores de recolha de lixo',
              'Porque o lixo comum é reservado exclusivamente para embalagens de vidro',
              'Porque esses equipamentos devem ficar guardados para sempre em casa',
            ],
            en: [
              'Because they contain hazardous substances and materials to recycle',
              'Because they consume electricity from municipal garbage bins',
              'Because regular trash is reserved exclusively for glass packaging',
              'Because those devices must remain stored at home forever',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Os eletrónicos contêm metais pesados e baterias perigosas que contaminam a natureza se forem para aterros normais.',
            en: 'Electronics contain heavy metals and hazardous batteries that poison nature if thrown into ordinary landfills.',
          },
        },
        {
          id: 'q-mod5-2',
          question: {
            pt: 'Onde deves entregar um computador ou telemóvel velho que já não funciona?',
            en: 'Where should you hand in an old broken computer or phone?',
          },
          options: {
            pt: [
              'No contentor de lixo indiferenciado de casa',
              'No Ponto Eletrão, num Ecocentro municipal ou numa loja de eletrónica',
              'No ecoponto azul juntamente com o papel e o cartão',
              'No ecoponto verde juntamente com as garrafas de vidro',
            ],
            en: [
              'In the domestic household garbage bin',
              'At a Ponto Eletrão bin, municipal Eco-center, or electronics store',
              'In the blue recycling bin along with paper and cardboard',
              'In the green recycling bin along with glass bottles',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'O Ponto Eletrão, os Ecocentros e as lojas autorizadas garantem a recolha e reciclagem segura dos equipamentos.',
            en: 'Ponto Eletrão bins, Eco-centers, and authorized stores ensure safe e-waste collection and recycling.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'desafio-tic-o-que-e',
      themeId: 'tic-sociedade',
      number: 1,
      title: {
        pt: '💡 É uma TIC? & Que Tecnologia Ajuda?',
        en: '💡 Is it ICT? & Which Tech Helps?',
      },
      shortDesc: {
        pt: 'Classifica objetos entre TIC e não-TIC, compreende o porquê de cada resposta e escolhe a tecnologia ideal para ajudar a resolver problemas e realizar tarefas do dia a dia.',
        en: 'Classify tools between ICT and non-ICT, understand the reasons, and choose tech solutions to help solve problems and perform everyday tasks.',
      },
      durationMinutes: 5,
      type: 'true_false',
      icon: '💡',
    },
    {
      id: 'desafio-detetives-digitais',
      themeId: 'tic-sociedade',
      number: 2,
      title: {
        pt: '🔎 Detetives Digitais (Vantagens e Desafios)',
        en: '🔎 Digital Detectives (Advantages & Challenges)',
      },
      shortDesc: {
        pt: 'Resolve 3 casos práticos sobre pausas no tempo de ecrã, notícias falsas e respeito na utilização da tecnologia.',
        en: 'Solve 3 practical cases on screen time breaks, fake news, and respectful technology usage.',
      },
      durationMinutes: 4,
      points: 100,
      type: 'what_would_you_do',
      icon: '🔎',
      gameData: {
        type: 'mc',
        title: 'Detetives Digitais: Vantagens e Desafios',
        icon: '🔎',
        xp: 100,
        desc: 'Analisa 3 casos reais do dia a dia e escolhe a melhor decisão sobre tempo de ecrã, notícias falsas e respeito online.',
        data: {
          questions: [
            {
              q: 'O Miguel esteve a jogar no tablet durante quatro horas seguidas sem fazer qualquer pausa para descansar a vista, lanchar ou esticar as pernas. Como avalias esta situação?',
              opts: [
                'Excelente ideia — jogar muitas horas seguidas sem parar melhora a saúde e a visão',
                'Atenção e cuidado — jogar é divertido, mas o excesso sem pausas prejudica o sono, a visão e a saúde',
                'Perigo extremo — o tablet vai avariar e queimar os circuitos de imediato'
              ],
              c: 1,
              e: 'Muito bem! É essencial fazer pausas regulares e equilibrar o tempo de ecrã com desporto, brincadeiras ao ar livre, convívio com amigos e descanso.'
            },
            {
              q: 'A Leonor recebeu uma mensagem anónima a dizer: "Amanhã não há aulas na escola! Partilha esta mensagem com toda a gente!". O que deve fazer antes de partilhar?',
              opts: [
                'Reencaminhar logo a mensagem para todos os grupos de amigos e turmas da escola',
                'Verificar primeiro com os pais ou professores se a informação é verdadeira antes de espalhar boatos',
                'Alterar a mensagem para ficar mais assustadora e publicá-la nas redes sociais'
              ],
              c: 1,
              e: 'Certíssimo! Na Internet encontramos informação não confirmada ou falsa. Devemos sempre verificar a veracidade das notícias com adultos e fontes oficiais.'
            },
            {
              q: 'Um colega enviou ao João uma fotografia embaraçosa de outro aluno a tropeçar e pediu: "Partilha no grupo da turma para nos rirmos!". O que deve o João fazer?',
              opts: [
                'Não partilhar, proteger a privacidade do colega e explicar com respeito que não devemos gozar com os outros',
                'Partilhar imediatamente em todos os grupos da escola para ganhar mais gostos e seguidores',
                'Reenviar a foto em segredo para outros colegas durante o intervalo'
              ],
              c: 0,
              e: 'Super detetive! Respeitar a privacidade e os sentimentos dos outros é essencial. Nunca devemos divulgar fotografias ou conteúdos que possam magoar ou humilhar alguém.'
            }
          ]
        }
      }
    },
    {
      id: 'desafio-missao-planeta-digital',
      themeId: 'tic-sociedade',
      number: 3,
      title: {
        pt: '🌍 Missão Planeta Digital (Tecnologia e Ambiente)',
        en: '🌍 Planet Digital Mission (Tech & Environment)',
      },
      shortDesc: {
        pt: 'Ajuda a escola a proteger o ambiente: aprende a reparar, reutilizar e reciclar lixo eletrónico no Ponto Eletrão e acumula 100 Pontos Planeta!',
        en: 'Help the school protect the environment: learn to repair, reuse, and recycle e-waste at collection points and earn 100 Planet Points!',
      },
      durationMinutes: 8,
      points: 100,
      type: 'planet_mission',
      icon: '🌍',
      gameData: {
        type: 'mc',
        title: 'Missão Planeta Digital: Tecnologia e Ambiente',
        icon: '🌍',
        xp: 100,
        desc: 'Descobre como prolongar a vida dos equipamentos, poupar energia, combater o lixo eletrónico e proteger o planeta.',
        data: {
          questions: [
            {
              q: 'A família do Martim comprou um computador novo. O computador antigo ainda funciona muito bem para escrever textos e navegar na Internet. Qual é a melhor atitude ecológica?',
              opts: [
                'Reutilizá-lo: doar a um familiar, colega, escola ou associação que precise dele',
                'Deitar no contentor do lixo indiferenciado da cozinha misturado com restos',
                'Guardar numa caixa fechada durante anos até ficar esquecido e estragar-se'
              ],
              c: 0,
              e: 'Fantástico! A reutilização e doação prolongam a vida útil da tecnologia e evitam o desperdício de materiais e a criação de novo lixo.'
            },
            {
              q: 'O portátil da Matilde tem uma tecla solta e o cabo do carregador com mau contacto, mas o ecrã e o processador estão ótimos. O que é mais ecológico e económico fazer?',
              opts: [
                'Levar a um técnico para reparar a tecla e o cabo, prolongando a vida útil do computador',
                'Deitar o portátil para o lixo e pedir logo a compra de um computador novo topo de gama',
                'Guardar o portátil numa gaveta e comprar logo outro sem tentar reparar'
              ],
              c: 0,
              e: 'Brilhante! Reparar pequenos problemas mecânicos ou elétricos poupa matérias-primas preciosas e evita gastos desnecessários.'
            },
            {
              q: 'Um telemóvel antigo com a placa eletrónica queimada avariou definitivamente e não tem qualquer reparação possível. Qual é o destino correto?',
              opts: [
                'Entregar num Ponto Eletrão, loja de eletrodomésticos ou ecocentro para reciclagem de REEE',
                'Atirar para um terreno baldio ou para a berma da estrada',
                'Deitar no lixo indiferenciado com os restantes resíduos domésticos'
              ],
              c: 0,
              e: 'Muito bem! Os equipamentos eletrónicos estragados (REEE) contêm ouro, cobre, lítio e plástico que são recuperados quando entregues no Ponto Eletrão.'
            },
            {
              q: 'Como podemos poupar energia elétrica e proteger o ambiente quando utilizamos o computador e o tablet no dia a dia?',
              opts: [
                'Desligar os aparelhos e não deixar carregadores ligados à tomada quando as baterias já estão a 100%',
                'Deixar o computador ligado a noite inteira com jogos abertos sem ninguém a utilizar',
                'Manter o ecrã ligado sem temporizador de suspensão mesmo quando não estamos no quarto'
              ],
              c: 0,
              e: 'Excelente! Desligar equipamentos quando não estão a ser usados e retirar os carregadores das tomadas evita o consumo de energia "fantasma" e poupa o planeta.'
            }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema1',
      themeId: 'tic-sociedade',
      number: 4,
      title: {
        pt: '🏆 Avaliação Final: TIC na Sociedade (10 Questões)',
        en: '🏆 Final Quiz: ICT in Society (10 Questions)',
      },
      shortDesc: {
        pt: 'Testa todos os teus conhecimentos com 10 perguntas rigorosas e educativas sobre as TIC na Sociedade (Tema 2). Vale 100 XP!',
        en: 'Test your mastery with 10 pedagogical questions covering all Theme 2 concepts. Worth 100 XP!',
      },
      durationMinutes: 10,
      type: 'final_quiz',
      icon: '🏆',
    },
  ],
  finalQuiz: [
    {
      id: 'fq-tic-1',
      question: {
        pt: 'Qual destas opções explica melhor o que são as TIC?',
        en: 'Which of these options best explains what ICT is?',
      },
      options: {
        pt: [
          'Apenas computadores usados para jogar',
          'Tecnologias usadas para criar, guardar e comunicar informação',
          'Apenas aparelhos usados para ouvir música',
          'Objetos que funcionam sempre sem eletricidade',
        ],
        en: [
          'Only computers used for gaming',
          'Technologies used to create, store, and communicate information',
          'Only devices used to listen to music',
          'Objects that always work without electricity',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'As TIC (Tecnologias da Informação e Comunicação) são o conjunto de ferramentas e tecnologias usadas para criar, guardar, processar e comunicar informação.',
        en: 'ICT (Information and Communication Technologies) refers to tools and technologies used to create, store, process, and communicate information.',
      },
    },
    {
      id: 'fq-tic-2',
      question: {
        pt: 'A Maria quer falar com a avó que vive noutra cidade e vê-la enquanto conversam. Qual destas tecnologias é mais adequada?',
        en: 'Maria wants to talk to her grandmother living in another city and see her while talking. Which of these technologies is most suitable?',
      },
      options: {
        pt: [
          'Uma videochamada',
          'Um sensor de temperatura',
          'Um leitor de código de barras',
          'Um sistema GPS',
        ],
        en: [
          'A video call',
          'A temperature sensor',
          'A barcode reader',
          'A GPS system',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A videochamada permite transmitir voz e imagem em direto pela Internet, permitindo conversar e ver pessoas que estão longe.',
        en: 'A video call transmits voice and video in real time over the Internet, allowing you to see and hear people who are far away.',
      },
    },
    {
      id: 'fq-tic-3',
      question: {
        pt: 'Qual foi uma característica importante do ENIAC, um dos primeiros computadores eletrónicos de grande escala?',
        en: 'What was an important characteristic of ENIAC, one of the first large-scale electronic computers?',
      },
      options: {
        pt: [
          'Funcionava apenas como uma máquina fotográfica',
          'Cabia facilmente dentro de um telemóvel',
          'Era um computador portátil com bateria',
          'Era muito grande e ocupava uma sala inteira',
        ],
        en: [
          'It worked only as a camera',
          'It easily fit inside a mobile phone',
          'It was a portable laptop with a battery',
          'It was very large and occupied an entire room',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'O ENIAC foi um dos primeiros computadores eletrónicos, pesava cerca de 30 toneladas e ocupava uma sala inteira.',
        en: 'ENIAC was one of the first electronic computers, weighing around 30 tons and occupying an entire room.',
      },
    },
    {
      id: 'fq-tic-4',
      question: {
        pt: 'Como podemos descrever a evolução dos computadores ao longo do tempo?',
        en: 'How can we describe the evolution of computers over time?',
      },
      options: {
        pt: [
          'Deixaram de conseguir realizar cálculos',
          'Ficaram sempre maiores e mais lentos',
          'Tornaram-se geralmente mais pequenos, rápidos e capazes',
          'Passaram a ser usados apenas por cientistas',
        ],
        en: [
          'They stopped being able to perform calculations',
          'They kept getting larger and slower',
          'They generally became smaller, faster, and more capable',
          'They came to be used exclusively by scientists',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Com o avanço da tecnologia, os computadores tornaram-se muito mais pequenos, mais rápidos, mais potentes e acessíveis a todas as pessoas.',
        en: 'With technological advancement, computers became much smaller, faster, more powerful, and accessible to everyone.',
      },
    },
    {
      id: 'fq-tic-5',
      question: {
        pt: 'Qual destas situações mostra uma vantagem das TIC na aprendizagem?',
        en: 'Which of these situations shows an advantage of ICT in learning?',
      },
      options: {
        pt: [
          'Partilhar uma notícia falsa sem verificar',
          'Pesquisar informação para compreender melhor um assunto',
          'Passar muitas horas seguidas a jogar',
          'Usar um dispositivo sem fazer pausas durante muitas horas',
        ],
        en: [
          'Sharing fake news without checking',
          'Researching information to better understand a topic',
          'Spending many consecutive hours gaming',
          'Using a device without taking breaks for many hours',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'As TIC ajudam na escola e no estudo ao facilitar a pesquisa de informação fiável e o acesso a novos conhecimentos.',
        en: 'ICT supports schooling and studying by facilitating research of reliable information and access to new knowledge.',
      },
    },
    {
      id: 'fq-tic-6',
      question: {
        pt: 'O João encontrou uma informação na Internet que parece muito estranha. O que deve fazer antes de a partilhar com os colegas?',
        en: 'João found information on the Internet that seems very strange. What should he do before sharing it with classmates?',
      },
      options: {
        pt: [
          'Verificar se a informação é verdadeira',
          'Alterar a informação para ficar mais divertida',
          'Partilhá-la imediatamente com toda a turma',
          'Guardar a informação sem nunca a verificar',
        ],
        en: [
          'Check if the information is true',
          'Change the information to make it funnier',
          'Share it immediately with the whole class',
          'Save the information without ever checking it',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Antes de partilhar qualquer notícia ou dado, devemos sempre confirmar se a fonte é fiável e se a informação é verdadeira.',
        en: 'Before sharing any news or data, we must always verify if the source is reliable and if the information is accurate.',
      },
    },
    {
      id: 'fq-tic-7',
      question: {
        pt: 'Porque é importante verificar a informação encontrada na Internet antes de a partilhar?',
        en: 'Why is it important to verify information found on the Internet before sharing it?',
      },
      options: {
        pt: [
          'Porque toda a informação publicada na Internet é verdadeira',
          'Porque uma informação falsa pode levar outras pessoas a acreditar em algo que não é verdade',
          'Porque verificar a informação torna sempre a Internet mais rápida',
          'Porque só podemos utilizar informação encontrada em livros',
        ],
        en: [
          'Because all information published on the Internet is true',
          'Because false information can lead other people to believe something that is not true',
          'Because verifying information always makes the Internet faster',
          'Because we can only use information found in books',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Nem toda a informação na Internet é fiável ou verdadeira. Verificar antes de partilhar evita a propagação de boatos e de notícias falsas.',
        en: 'Not all information on the Internet is reliable or true. Verifying before sharing prevents the spread of rumors and fake news.',
      },
    },
    {
      id: 'fq-tic-8',
      question: {
        pt: 'Qual é uma atitude responsável quando já não precisamos de um equipamento eletrónico?',
        en: 'What is a responsible attitude when we no longer need an electronic device?',
      },
      options: {
        pt: [
          'Guardar em casa até que se estrague por completo',
          'Deitar no lixo indiferenciado com os restantes resíduos',
          'Desmontar as peças para deitar no ecoponto amarelo',
          'Entregá-lo num ponto de recolha próprio para reciclagem',
        ],
        en: [
          'Store it at home until it breaks down completely',
          'Throw it into regular household trash with other waste',
          'Dismantle parts to throw into yellow recycling bin',
          'Take it to a dedicated collection point for recycling',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'Equipamentos elétricos e eletrónicos devem ser entregues no Ponto Eletrão, ecocentro ou lojas aderentes para reciclagem segura.',
        en: 'Electrical and electronic equipment should be delivered to e-waste points, ecocentres, or participating stores for safe recycling.',
      },
    },
    {
      id: 'fq-tic-9',
      question: {
        pt: 'Qual destas opções é um exemplo de tecnologia usada nos transportes?',
        en: 'Which of these options is an example of technology used in transportation?',
      },
      options: {
        pt: [
          'Um leitor de música usado no quarto',
          'GPS para ajudar a encontrar um caminho',
          'Uma câmara usada para tirar fotografias em casa',
          'Uma calculadora usada numa aula',
        ],
        en: [
          'A music player used in a bedroom',
          'GPS to help find a route',
          'A camera used to take photos at home',
          'A calculator used in a lesson',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'O sistema GPS determina a localização por satélite e, em conjunto com mapas e aplicações, é utilizado nos transportes para navegação e apoio aos percursos.',
        en: 'The GPS system determines satellite location and, together with maps and apps, is used in transport for navigation and route planning.',
      },
    },
    {
      id: 'fq-tic-10',
      question: {
        pt: 'Qual destas situações representa uma utilização equilibrada e responsável das tecnologias no dia a dia?',
        en: 'Which of these situations represents a balanced and responsible use of technology in everyday life?',
      },
      options: {
        pt: [
          'Utilizar dispositivos durante muitas horas sem fazer pausas',
          'Usar a tecnologia para estudar, comunicar e realizar outras tarefas, fazendo pausas e mantendo outras atividades',
          'Evitar completamente qualquer contacto com computadores e outros dispositivos',
          'Utilizar a Internet apenas para jogar e ver vídeos',
        ],
        en: [
          'Using devices for many hours without taking breaks',
          'Using technology to study, communicate, and perform other tasks, taking breaks and maintaining other activities',
          'Completely avoiding any contact with computers and other devices',
          'Using the Internet solely for gaming and watching videos',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Uma utilização equilibrada das TIC combina os momentos de estudo, aprendizagem e lazer digital com pausas regulares, convívio familiar, desporto e descanso.',
        en: 'A balanced use of ICT combines study, learning, and digital leisure with regular breaks, family time, sports, and rest.',
      },
    },
  ],
};
