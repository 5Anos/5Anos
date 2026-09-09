import { ThemeDefinition } from '../types';

export const themeTicSociedadeData: ThemeDefinition = {
  id: 'tic-sociedade',
  number: 1,
  title: {
    pt: 'TIC na Sociedade',
    en: 'ICT in Society',
  },
  tagline: {
    pt: 'Impacto e aplicações das TIC nos setores e no dia a dia.',
    en: 'Impact and applications of ICT across industries and daily life.',
  },
  intro: {
    pt: 'As Tecnologias da Informação e Comunicação estão em todo o lado: na escola, no hospital, nas lojas, nos transportes e até nas nossas casas. Descobre como a tecnologia nos ajuda a resolver problemas, a comunicar e a aprender melhor!',
    en: 'Information and Communication Technologies are everywhere: in schools, hospitals, stores, transport, and our homes. Discover how tech helps us solve problems, communicate, and learn!',
  },
  icon: '🌍',
  illustrationKey: 'tic-sociedade',
  accentColor: 'indigo',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'O que são as TIC?', en: 'What is ICT?' },
      body: {
        pt: 'As TIC — Tecnologias da Informação e Comunicação — são o conjunto de ferramentas que usamos para criar, guardar, partilhar e encontrar informação: computadores, tablets, telemóveis, a Internet e todos os programas e aplicações que usamos com eles.<br><br>Nasceste num mundo onde as TIC já fazem parte de quase tudo: da escola aos transportes, da saúde ao entretenimento.',
        en: 'ICT — Information and Communication Technologies — is the set of tools we use to create, store, share, and find information: computers, tablets, smartphones, the Internet, and all software and apps we use with them.<br><br>You were born in a world where ICT is already part of almost everything: from school to transport, healthcare to entertainment.',
      },
      icon: '💡',
    },
    {
      eyebrow: { pt: 'Na vida real', en: 'In real life' },
      h: { pt: 'As TIC em vários setores', en: 'ICT across different sectors' },
      body: {
        pt: 'As TIC mudaram a forma como trabalhamos e vivemos em quase todas as áreas:<ul><li><strong>Educação</strong> — plataformas de estudo, aulas online, manuais digitais.</li><li><strong>Saúde</strong> — marcação de consultas online, processos clínicos digitais, telemedicina.</li><li><strong>Comércio</strong> — compras online, pagamentos com telemóvel, lojas virtuais.</li><li><strong>Transportes</strong> — aplicações de trânsito, bilhetes digitais, GPS.</li><li><strong>Agricultura</strong> — sensores que medem a humidade do solo, drones que vigiam plantações.</li><li><strong>Indústria</strong> — robôs e máquinas controladas por computador nas fábricas.</li></ul>',
        en: 'ICT has changed how we work and live across almost every field:<ul><li><strong>Education</strong> — study platforms, online classes, digital textbooks.</li><li><strong>Healthcare</strong> — online appointment booking, digital health records, telemedicine.</li><li><strong>Commerce</strong> — online shopping, mobile payments, virtual stores.</li><li><strong>Transport</strong> — traffic apps, digital tickets, GPS.</li><li><strong>Agriculture</strong> — soil moisture sensors, drones monitoring crops.</li><li><strong>Industry</strong> — robots and computer-controlled machines in factories.</li></ul>',
      },
      icon: '🏥',
    },
    {
      eyebrow: { pt: 'Sabias que...?', en: 'Did you know...?' },
      h: { pt: 'A comunicação mudou por completo', en: 'Communication has changed completely' },
      body: {
        pt: 'Há poucas décadas, para enviar uma mensagem a alguém noutro país era preciso escrever uma carta que demorava semanas a chegar. Hoje, com as TIC, conseguimos falar em vídeo com alguém do outro lado do mundo em segundos.<br><br>Isto aproximou pessoas, famílias e escolas — mas também exige que aprendamos a usar essa comunicação de forma responsável.',
        en: 'A few decades ago, sending a message to someone in another country required writing a letter that took weeks to arrive. Today, with ICT, we can video chat with someone across the globe in seconds.<br><br>This brought people, families, and schools closer — but also demands that we learn to communicate responsibly.',
      },
      icon: '🌐',
    },
    {
      eyebrow: { pt: 'Exemplo', en: 'Example' },
      h: { pt: 'Comércio eletrónico', en: 'E-Commerce' },
      body: {
        pt: 'O comércio eletrónico é a compra e venda de produtos ou serviços através da Internet. Por exemplo, uma pessoa pode escolher um produto num site, pagar através da Internet e recebê-lo em casa.<br><br>É um bom exemplo de como várias TIC trabalham em conjunto: o site onde fazemos a compra, o sistema de pagamento digital e o acompanhamento da entrega.',
        en: 'E-commerce is the buying and selling of goods or services through the Internet. For example, a person can choose a product on a website, pay online, and receive it at home.<br><br>It is a great example of how multiple ICT tools work together: the website where we make the purchase, the digital payment system, and delivery tracking.',
      },
      icon: '🛒',
    },
    {
      eyebrow: { pt: 'Vamos pensar', en: "Let's think" },
      h: { pt: 'Um dia sem TIC', en: 'A day without ICT' },
      body: {
        pt: 'Imagina um dia inteiro sem computador, sem telemóvel e sem Internet. Como seria ir à escola? Como marcarias uma consulta? Como saberias as notícias?<br><br>Esta reflexão ajuda-nos a perceber o quanto as TIC já fazem parte do nosso quotidiano — e por isso é tão importante aprender a usá-las bem.',
        en: 'Imagine an entire day without a computer, smartphone, or Internet. How would going to school be? How would you book a doctor appointment? How would you check the news?<br><br>This reflection helps us realize how deeply ICT is woven into daily life — and why learning to use it well is so vital.',
      },
      icon: '🤔',
    },
  ],
  modules: [
    {
      id: 'tic-soc-o-que-sao',
      themeId: 'tic-sociedade',
      number: 1,
      title: {
        pt: 'O que são as TIC e para que servem?',
        en: 'What is ICT and what is it used for?',
      },
      shortDesc: {
        pt: 'Entende a união entre computadores, redes e comunicação.',
        en: 'Understand the union between computers, networks, and communication.',
      },
      icon: '💡',
      explanation: {
        pt: [
          'As TIC — Tecnologias da Informação e Comunicação — são o conjunto de ferramentas que usamos para criar, guardar, partilhar e encontrar informação: computadores, tablets, telemóveis, a Internet e todos os programas e aplicações que usamos com eles.',
          'Nasceste num mundo onde as TIC já fazem parte de quase tudo: da escola aos transportes, da saúde ao entretenimento.',
        ],
        en: [
          'ICT — Information and Communication Technologies — is the set of tools we use to create, store, share, and find information: computers, tablets, smartphones, the Internet, and all software and apps we use with them.',
          'You were born in a world where ICT is already part of almost everything: from school to transport, healthcare to entertainment.',
        ],
      },
      example: {
        title: {
          pt: 'Uma chamada de vídeo com a avó',
          en: 'A video call with grandmother',
        },
        scenario: {
          pt: 'O Tiago quer mostrar o seu trabalho de ciências à avó, que vive noutra cidade. Utiliza o computador portátil da escola e uma aplicação de videochamada ligada à Internet.',
          en: 'Tiago wants to show his science project to his grandmother who lives in another town. He uses his school laptop and a video call app connected to the Internet.',
        },
        tip: {
          pt: 'Isto é TIC em ação: equipamento (computador), ligação em rede (Internet) e comunicação direta de informação em tempo real.',
          en: 'This is ICT in action: hardware (laptop), networking (Internet), and real-time information exchange.',
        },
      },
      funFact: {
        pt: 'Sabias que computadores antigos como o ENIAC (em 1946) pesavam cerca de 30 toneladas e ocupavam uma sala inteira de 167 m²? Hoje, um pequeno smartphone no teu bolso é milhares de vezes mais rápido!',
        en: 'Did you know early computers like the ENIAC (in 1946) weighed about 30 tons and occupied an entire 167 m² room? Today, the smartphone in your pocket is thousands of times faster!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Imagina que ficavas um dia inteiro sem eletricidade nem redes de comunicação. Que tarefas da tua rotina ficariam diferentes?',
          en: 'Imagine spending a whole day without electricity or networks. Which parts of your daily routine would change?',
        },
        clue: {
          pt: 'Pensa em como acordas, como chegas à escola, como fazes compras e como falas com os teus amigos.',
          en: 'Think about how you wake up, travel to school, buy groceries, and talk to your friends.',
        },
        reflection: {
          pt: 'Ficariam diferentes tarefas como pesquisar para a escola, ver as horas num despertador digital, pagar compras no supermercado com cartão e até apanhar o autocarro que avisa no ecrã quantos minutos faltam!',
          en: 'Tasks like studying online, reading time on digital alarms, paying with cards, or checking bus arrival boards would all be affected!',
        },
      },
      quizQuestions: [
        {
          id: 'q-tic-1',
          question: {
            pt: 'O que significa a sigla TIC?',
            en: 'What does the acronym ICT stand for?',
          },
          options: {
            pt: [
              'Tecnologias da Informação e Comunicação',
              'Telemóveis e Internet no Computador',
              'Técnicas de Instalação de Cabos',
              'Transmissão Instantânea de Computação',
            ],
            en: [
              'Information and Communication Technologies',
              'Phones and Internet on Computers',
              'Cable Installation Techniques',
              'Instant Transmission Computing',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! TIC significa Tecnologias da Informação e Comunicação.',
            en: 'Correct! ICT stands for Information and Communication Technologies.',
          },
        },
        {
          id: 'q-tic-2',
          question: {
            pt: 'Qual dos seguintes é um exemplo claro da utilização das TIC na educação?',
            en: 'Which is a clear example of ICT usage in education?',
          },
          options: {
            pt: [
              'Plataformas digitais escolares para enviar trabalhos e manuais digitais interativos',
              'O arquivo físico de testes em dossiers de papel na secretaria',
              'A campainha elétrica que assinala o início do toque de entrada',
              'O quadro tradicional de ardósia com giz',
            ],
            en: [
              'School digital portals for submitting homework and interactive e-textbooks',
              'Physical filing cabinets storing paper exam dossiers in the office',
              'An electric bell signalling the start of classes',
              'A traditional slate blackboard with chalk',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! As plataformas escolares e os manuais digitais utilizam redes e computadores para apoiar a aprendizagem.',
            en: 'Exactly! School portals and digital textbooks use networks and computers to support learning.',
          },
        },
      ],
    },
    {
      id: 'tic-soc-setores',
      themeId: 'tic-sociedade',
      number: 2,
      title: {
        pt: 'As TIC nos Diferentes Setores de Atividade',
        en: 'ICT across Different Sectors of Society',
      },
      shortDesc: {
        pt: 'Descobre o papel da tecnologia na saúde, transportes, comércio e ambiente.',
        en: 'Discover how technology transforms healthcare, transport, commerce, and the environment.',
      },
      icon: '🏥',
      explanation: {
        pt: [
          'Na Saúde: os médicos usam robôs cirúrgicos de precisão, computadores para analisar exames como radiografias e teleconsultas para ajudar doentes à distância.',
          'Nos Transportes: os sistemas de navegação GPS indicam o caminho mais rápido, os aviões voam com piloto automático e os metros urbanos circulam de forma cronometrada.',
          'No Comércio e Serviços: podemos comprar livros ou bilhetes de comboio online, pagar com cartão contactless e consultar a conta bancária sem sair de casa.',
          'No Ambiente: sensores medem a qualidade do ar, satélites vigiam florestas contra incêndios e previsões meteorológicas avisam sobre tempestades.',
        ],
        en: [
          'Healthcare: doctors use robotic surgery, computers for scans, and telemedicine.',
          'Transport: GPS systems guide vehicles, planes use autopilots, and trains run safely on computerized schedules.',
          'Commerce: online shopping, contactless payments, and online banking.',
          'Environment: sensors monitor air pollution, satellites watch forests, and forecasts predict storms.',
        ],
      },
      example: {
        title: {
          pt: 'Uma consulta no centro de saúde',
          en: 'A medical appointment',
        },
        scenario: {
          pt: 'A médica da Maria acede ao historial de vacinas num computador seguro. A médica prescreve a receita eletronicamente e o utente pode receber por SMS a informação necessária para a utilizar.',
          en: 'Maria’s doctor opens vaccination records on a secure computer. The doctor prescribes the medication electronically and the patient can receive the necessary details by SMS to use it.',
        },
        tip: {
          pt: 'Graças às TIC na saúde, não se perdem papéis e os médicos conhecem todo o historial do doente num clique.',
          en: 'Thanks to healthcare ICT, papers are never lost and doctors access vital patient history in a click.',
        },
      },
      funFact: {
        pt: 'Sabias que existem colmeias de abelhas equipadas com pequenos sensores de TIC que medem a temperatura e avisam os apicultores quando a rainha precisa de ajuda?',
        en: 'Did you know there are beehives equipped with tiny ICT sensors that monitor temperatures and alert beekeepers when the queen needs assistance?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que os hospitais e os bombeiros precisam de sistemas informáticos que nunca falhem?',
          en: 'Why do hospitals and firefighters need computing systems that never fail?',
        },
        clue: {
          pt: 'Pensa no que aconteceria se a chamada de emergência do 112 fosse interrompida.',
          en: 'Think about what would happen if emergency 112 calls were interrupted.',
        },
        reflection: {
          pt: 'Como lidam com situações importantes, estes serviços precisam de sistemas preparados para continuar a funcionar mesmo quando surgem problemas.',
          en: 'Because they deal with critical situations, these services need systems prepared to keep working even when problems arise.',
        },
      },
      quizQuestions: [
        {
          id: 'q-setores-1',
          question: {
            pt: 'Qual é uma aplicação típica das TIC no setor dos transportes?',
            en: 'What is a typical application of ICT in transportation?',
          },
          options: {
            pt: [
              'O sistema de navegação por GPS e a bilhética eletrónica',
              'O sistema mecânico de travagem por fricção das rodas',
              'A verificação manual de bilhetes em papel à entrada do veículo',
              'A pintura estática com setas indicativas no chão da paragem',
            ],
            en: [
              'GPS navigation systems and contactless ticketing',
              'Mechanical wheel friction braking mechanisms',
              'Manual paper ticket validation upon boarding',
              'Static directional arrows painted on stop pavement',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! Os GPS e os bilhetes eletrónicos são exemplos claros de TIC nos transportes.',
            en: 'Correct! GPS and electronic ticketing are standard examples of transport ICT.',
          },
        },
      ],
    },
    {
      id: 'tic-soc-impacto-vantagens',
      themeId: 'tic-sociedade',
      number: 3,
      title: {
        pt: 'Cidadania Digital, Tempo de Ecrã e Prevenção do Cyberbullying',
        en: 'Digital Citizenship, Screen Time and Cyberbullying Prevention',
      },
      shortDesc: {
        pt: 'Equilíbrio digital, respeito pelos colegas online e o que fazer perante o ciberbullying.',
        en: 'Digital balance, online respect, and how to counter cyberbullying.',
      },
      icon: '⚖️',
      explanation: {
        pt: [
          'Vantagens das TIC: comunicação instantânea, acesso fácil ao conhecimento escolar, criatividade e novas formas de colaboração.',
          'Equilíbrio e Tempo de Ecrã: passar demasiado tempo em ecrãs pode prejudicar o sono, a visão e a concentração. É essencial fazer pausas regulares e manter tempo para desporto, família e amigos presenciais.',
          'Cyberbullying é inaceitável: usar a Internet para gozar, insultar, espalhar boatos, excluir de grupos ou partilhar fotos de colegas sem autorização é grave e magoa profundamente.',
          'Como agir perante o Cyberbullying (Regra dos 5 Passos): 1. Parar; 2. Não responder ao agressor; 3. Guardar provas (tirar printscreen); 4. Bloquear o contacto; 5. Pedir ajuda imediatamente a um adulto de confiança (pais, professores ou Linha Internet Segura: 800 21 90 90).',
          'Empatia Digital: antes de publicar ou enviar uma mensagem, pensa sempre: "Eu gostaria que dissessem isto sobre mim?".',
        ],
        en: [
          'ICT Benefits: instant communication, easy access to knowledge, creativity, and collaborative learning.',
          'Screen Time Balance: excessive screen use affects sleep, vision, and concentration. Take regular breaks and balance tech with outdoor exercise, family, and hobbies.',
          'Cyberbullying is never okay: using devices to mock, insult, spread rumors, exclude others, or share photos without consent is harmful and wrong.',
          'How to react to Cyberbullying (5-Step Rule): 1. Stop; 2. Do not reply; 3. Save evidence (take screenshots); 4. Block the sender; 5. Tell a trusted adult (parents, teachers, or call the toll-free helpline).',
          'Digital Empathy: before posting or commenting, always ask yourself: "Would I like someone to say this to me?".',
        ],
      },
      example: {
        title: {
          pt: 'A atitude correta no grupo da turma',
          en: 'The right attitude in a class group chat',
        },
        scenario: {
          pt: 'Num grupo de chat, alguém publicou uma foto embaraçosa de um colega com comentários a gozar. A Inês não partilhou nem se riu: tirou printscreen, apoiou o colega e mostrou a mensagem à Professora no dia seguinte.',
          en: 'In a group chat, someone posted an embarrassing picture of a classmate with mocking words. Inês did not forward or laugh: she took a screenshot, supported her classmate, and told her teacher the next day.',
        },
        tip: {
          pt: 'Não ser cúmplice do bullying e avisar um adulto faz de ti um verdadeiro guardião digital!',
          en: 'Refusing to forward mean messages and telling an adult makes you a true digital guardian!',
        },
      },
      funFact: {
        pt: 'Em Portugal, a Linha Internet Segura (800 21 90 90) é um número de telefone 100% gratuito e confidencial onde qualquer aluno, pai ou professor pode tirar dúvidas e pedir apoio sobre problemas na Internet.',
        en: 'In Portugal, the Internet Segura Helpline (800 21 90 90) is a 100% free and confidential number providing guidance on online safety and cyberbullying.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se vires alguém a ser gozado ou ameaçado num jogo online ou num grupo de mensagens, qual deve ser a tua atitude?',
          en: 'If you see someone being harassed or mocked in an online game or chat, what should you do?',
        },
        clue: {
          pt: 'Nunca reencaminhes nem te juntes às provocações. Apoia quem precisa e pede ajuda.',
          en: 'Never forward or join in the teasing. Support the peer and seek adult help.',
        },
        reflection: {
          pt: 'Ignorar ou rir incentiva o agressor. A melhor atitude é demonstrar apoio ao colega, guardar provas e falar com um professor ou com os pais.',
          en: 'Laughing or forwarding encourages the bully. Supporting the victim and notifying a trusted adult stops the harm.',
        },
      },
      quizQuestions: [
        {
          id: 'q-cuidados-1',
          question: {
            pt: 'Se receberes mensagens ofensivas ou presenciares ciberbullying num grupo, qual é o procedimento correto?',
            en: 'If you receive abusive messages or witness cyberbullying in a group, what is the right procedure?',
          },
          options: {
            pt: [
              'Não responder, guardar provas (captura de ecrã), bloquear o utilizador e contar a um adulto de confiança',
              'Responder com insultos ainda piores para tentar assustar a outra pessoa',
              'Partilhar as mensagens com toda a gente na escola para gozarem todos juntos',
              'Apagar tudo a correr e esconder o telemóvel dos pais sem dizer nada',
            ],
            en: [
              'Do not reply, save evidence (screenshots), block the sender, and tell a trusted adult',
              'Reply with worse insults to intimidate the other person',
              'Share the mean messages with the whole school so everyone laughs',
              'Delete everything in panic and hide your phone without telling anyone',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! Guardar provas, bloquear e avisar um adulto é a forma mais eficaz e segura de resolver o ciberbullying.',
            en: 'Spot on! Saving evidence, blocking the user, and notifying a trusted adult effectively resolves cyberbullying.',
          },
        },
        {
          id: 'q-cuidados-2',
          question: {
            pt: 'Como deves gerir o tempo de ecrã para proteger a tua saúde física e o teu sono?',
            en: 'How should you manage screen time to protect your physical health and sleep?',
          },
          options: {
            pt: [
              'Fazer pausas regulares, equilibrar com desporto e desligar os ecrãs pelo menos 1 hora antes de dormir',
              'Manter o brilho do ecrã no nível máximo durante a noite para compensar a escuridão',
              'Utilizar o ecrã continuamente desde que se beba água regularmente',
              'Desligar o computador apenas no momento exato em que se fecha os olhos para dormir',
            ],
            en: [
              'Take regular breaks, balance with sports, and turn off screens at least 1 hour before bedtime',
              'Keep screen brightness at maximum at night to compensate for darkness',
              'Use screens continuously as long as water is consumed regularly',
              'Power off the computer only at the exact moment of closing eyes to sleep',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! O equilíbrio entre o tempo passado com tecnologia e outras atividades pode ajudar a descansar melhor e a manter a energia para aprender.',
            en: 'Excellent! Balancing screen time with other activities can help you rest better and maintain energy to learn.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-tic-setor-match',
      themeId: 'tic-sociedade',
      number: 1,
      title: { pt: '🔗 Tecnologia ou Setor?', en: '🔗 Match Tech to Industry' },
      shortDesc: { pt: 'Associa cada setor da sociedade à sua ferramenta tecnológica.', en: 'Match each sector to its technological tool.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 100,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Tecnologia ou Setor?',
        icon: '🔗',
        xp: 100,
        desc: 'Associa corretamente cada setor de atividade à respetiva aplicação TIC.',
        data: {
          pairs: [
            { left: 'Educação', right: 'Plataformas de estudo e manuais digitais' },
            { left: 'Saúde', right: 'Telemedicina e processos clínicos digitais' },
            { left: 'Comércio', right: 'Lojas online e pagamentos com telemóvel' },
            { left: 'Transportes', right: 'Aplicações de trânsito e bilhetes digitais' }
          ]
        }
      }
    },
    {
      id: 'jogo-tic-tf',
      themeId: 'tic-sociedade',
      number: 2,
      title: { pt: '⚡ Verdadeiro ou Falso: TIC', en: '⚡ True or False: ICT' },
      shortDesc: { pt: 'Testa os teus conhecimentos sobre o impacto das TIC.', en: 'Test your knowledge about ICT impact.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Verdadeiro ou Falso: TIC no dia a dia',
        icon: '⚡',
        xp: 100,
        desc: 'Classifica cada afirmação sobre o papel das tecnologias na sociedade.',
        data: {
          items: [
            { s: 'As TIC apenas servem para jogar videojogos nos tempos livres.', a: false, e: 'As TIC são usadas na saúde, transportes, educação, comércio e muito mais!' },
            { s: 'O comércio eletrónico permite comprar produtos pela Internet com entrega em casa.', a: true, e: 'Correto! É a compra e venda de bens através de redes digitais.' },
            { s: 'A Linha Internet Segura é um serviço gratuito para apoiar em casos de ciberbullying.', a: true, e: 'Correto! O número 800 21 90 90 é confidencial e gratuito em Portugal.' }
          ]
        }
      }
    },
    {
      id: 'jogo-tic-mc',
      themeId: 'tic-sociedade',
      number: 3,
      title: { pt: '🎯 Onde se usam as TIC?', en: '🎯 Where is ICT Used?' },
      shortDesc: { pt: 'Escolhe a opção correta sobre o uso das tecnologias.', en: 'Choose the correct option about technology usage.' },
      icon: '🎯',
      durationMinutes: 4,
      points: 100,
      type: 'what_would_you_do',
      gameData: {
        type: 'mc',
        title: 'Onde se usam as TIC?',
        icon: '🎯',
        xp: 100,
        desc: 'Responde às perguntas de escolha múltipla sobre o quotidiano digital.',
        data: {
          questions: [
            {
              q: 'Qual é a principal vantagem das TIC na medicina atual?',
              opts: [
                'Permitir robôs cirúrgicos de precisão e acesso imediato a exames clínicos',
                'Substituir totalmente a necessidade de consultas com profissionais de saúde',
                'Garantir a cura imediata de qualquer doença através de algoritmos',
                'Eliminar a necessidade de registos clínicos detalhados'
              ],
              c: 0,
              e: 'Os computadores e robôs ajudam os médicos a diagnosticar e operar com enorme precisão.'
            },
            {
              q: 'Como é que as TIC ajudam uma pessoa que precisa de falar com a família noutro país?',
              opts: [
                'Através de videochamadas e mensagens instantâneas pela Internet em tempo real',
                'Apenas através de cartas escritas à mão enviadas por barco',
                'As TIC não permitem qualquer tipo de comunicação internacional',
                'Obrigando a viajar fisicamente para poder ver ou ouvir a outra pessoa'
              ],
              c: 0,
              e: 'As TIC aproximam as pessoas! Com videochamadas e mensagens, podemos comunicar instantaneamente com qualquer parte do mundo.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-tic-order',
      themeId: 'tic-sociedade',
      number: 4,
      title: { pt: '📦 Como chega uma compra online?', en: '📦 How does an online purchase arrive?' },
      shortDesc: { pt: 'Ordena os passos desde a encomenda até à entrega em casa.', en: 'Order the steps from order to home delivery.' },
      icon: '📦',
      durationMinutes: 4,
      points: 100,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Como chega uma compra online?',
        icon: '📦',
        xp: 100,
        desc: 'Coloca os passos do comércio eletrónico pela ordem correta.',
        data: {
          items: [
            'Escolher o produto num site de comércio eletrónico',
            'Efetuar o pagamento digital seguro',
            'O armazém prepara e embala a encomenda',
            'A transportadora entrega o pacote em casa'
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema1',
      themeId: 'tic-sociedade',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: TIC na Sociedade', en: '🏆 Learning Quiz: ICT in Society' },
      shortDesc: { pt: 'Avaliação final abrangente sobre o Tema 1.', en: 'Comprehensive final assessment on Topic 1.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 100,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'soc-q1',
      question: {
        pt: 'As TIC englobam três elementos fundamentais no nosso dia a dia. Quais são?',
        en: 'What three core elements do ICT combine in our daily lives?',
      },
      options: {
        pt: [
          'A informação, as redes de comunicação e as tecnologias (como computadores e telemóveis)',
          'Apenas os comandos e os discos dos videojogos',
          'Exclusivamente a eletricidade e os cabos de uma sala de aula',
          'Apenas o papel e as canetas usados no escritório',
        ],
        en: [
          'Information, communication networks, and technologies (such as computers and phones)',
          'Only controllers and video game disks',
          'Exclusively electrical power and classroom cables',
          'Only paper and pens used in office environments',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As TIC reúnem a informação, a capacidade de comunicar e os dispositivos tecnológicos para resolver tarefas do dia a dia.',
        en: 'ICT brings together information, communication capacity, and digital devices to solve daily challenges.',
      },
    },
    {
      id: 'soc-q2',
      question: {
        pt: 'Qual destas ferramentas faz parte do setor das TIC na Saúde?',
        en: 'Which tool belongs to ICT in Healthcare?',
      },
      options: {
        pt: [
          'O processo clínico eletrónico e o envio de receitas médicas por SMS',
          'O registo manual de consultas em fichas de papel arquivadas em pastas',
          'A medição tradicional da temperatura com termómetro analógico sem registo de dados',
          'A esterilização em autoclave mecânico sem ligação a redes informáticas',
        ],
        en: [
          'Electronic health records and SMS e-prescriptions',
          'Manual consultation filing using paper records in binders',
          'Traditional temperature measurement with analogue thermometers lacking data logging',
          'Mechanical autoclave sterilisation without network connectivity',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As receitas eletrónicas e os registos clínicos digitais são exemplos da utilização das TIC na saúde.',
        en: 'Electronic prescriptions and digital health records are examples of ICT use in healthcare.',
      },
    },
    {
      id: 'soc-q3',
      question: {
        pt: 'Nos transportes públicos, como se manifestam as TIC no dia a dia?',
        en: 'In public transport, how does ICT appear daily?',
      },
      options: {
        pt: [
          'Nos ecrãs que indicam os minutos até chegar o próximo autocarro e nos passes contactless',
          'Nos horários em papel impressos e afixados na paragem',
          'Na pintura exterior dos veículos de transporte público',
          'No bilhete de cartão picado manualmente pelo revisor à entrada',
        ],
        en: [
          'On digital screens showing arrival countdowns and contactless transit cards',
          'On paper timetables printed and posted at the bus stop',
          'On the exterior paint of public transport vehicles',
          'On cardboard tickets manually hole-punched upon boarding',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os sensores e ecrãs informativos transmitem dados em tempo real através de redes TIC.',
        en: 'Sensors and digital boards transmit real-time arrival data via ICT networks.',
      },
    },
    {
      id: 'soc-q4',
      question: {
        pt: 'Qual das seguintes é uma grande vantagem das TIC na Escola?',
        en: 'Which is a major advantage of ICT in School?',
      },
      options: {
        pt: [
          'Acesso a bibliotecas digitais, simulações interativas e manuais escolares atualizados',
          'Substituição total da necessidade de ler ou refletir sobre as matérias',
          'Dispensa automática de realizar exercícios práticos de avaliação',
          'Obrigatoriedade de usar computadores sem qualquer intervenção dos professores',
        ],
        en: [
          'Access to digital libraries, interactive simulations, and updated e-textbooks',
          'Eliminating the need to read or reflect on educational subjects',
          'Automatic exemption from practical evaluation assignments',
          'Mandatory computer usage without any teacher guidance',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As TIC enriquecem a aprendizagem com recursos interativos, tornando os conteúdos mais visuais e acessíveis.',
        en: 'ICT enriches learning through interactive media, making content more visual and engaging.',
      },
    },
    {
      id: 'soc-q5',
      question: {
        pt: 'O que é um sistema de navegação por satélite (GPS)?',
        en: 'What is a satellite navigation system (GPS)?',
      },
      options: {
        pt: [
          'Um sistema que calcula a nossa localização e orienta rotas através de sinais de satélite',
          'Um mapa desdobrável em papel guardado no porta-luvas',
          'Uma estação meteorológica analógica na berma da estrada',
          'Um contador mecânico de quilómetros acoplado à roda',
        ],
        en: [
          'A system that calculates location and navigates routes via satellite signals',
          'A fold-out paper road map stored in the glove compartment',
          'An analogue roadside weather station',
          'A mechanical wheel odometer tracking rotations',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O GPS utiliza sinais de satélites para ajudar a determinar a localização de um dispositivo.',
        en: 'GPS uses satellite signals to help determine a device’s location.',
      },
    },
    {
      id: 'soc-q6',
      question: {
        pt: 'Como é que as TIC ajudam na proteção do meio ambiente?',
        en: 'How does ICT help protect the environment?',
      },
      options: {
        pt: [
          'Através de sensores meteorológicos e satélites que detetam focos de incêndio e poluição',
          'Consumindo eletricidade sem critério durante todo o dia',
          'Aumentando o descarte frequente de aparelhos funcionais',
          'Reduzindo a eficiência energética dos centros de processamento de dados',
        ],
        en: [
          'Through meteorological sensors and satellites detecting wildfires and pollution',
          'By consuming uncontrolled power all day',
          'By accelerating the turnover of functioning devices',
          'By lowering energy efficiency in data centres',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A monitorização por satélite e sensores IoT permite prevenir desastres naturais e monitorizar florestas.',
        en: 'Satellite monitoring and environmental IoT sensors help prevent disasters and protect forests.',
      },
    },
    {
      id: 'soc-q7',
      question: {
        pt: 'O que deves fazer a um aparelho eletrónico velho que já não funciona (lixo eletrónico)?',
        en: 'What should you do with an old broken electronic device (e-waste)?',
      },
      options: {
        pt: [
          'Entregá-lo num ponto de recolha específico (Eletrão/Ecoponto) para reciclagem segura',
          'Colocá-lo no ecoponto amarelo juntamente com embalagens de plástico normais',
          'Guardá-lo numa gaveta comum indefinidamente sem qualquer tratamento',
          'Deitá-lo no contentor de lixo indiferenciado doméstico',
        ],
        en: [
          'Take it to an authorized e-waste collection point for recycling',
          'Place it in the yellow recycling bin with normal plastic packaging',
          'Store it in a regular drawer indefinitely without handling',
          'Dispose of it in the regular household mixed waste bin',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os aparelhos eletrónicos contêm materiais que podem ser tóxicos se não forem reciclados em pontos próprios.',
        en: 'Electronics contain precious and potentially toxic materials that require dedicated e-waste recycling.',
      },
    },
    {
      id: 'soc-q8',
      question: {
        pt: 'Para manteres um estilo de vida saudável e equilibrado com a tecnologia, o que deves fazer?',
        en: 'To maintain a healthy, balanced lifestyle with technology, what should you do?',
      },
      options: {
        pt: [
          'Equilibrar o tempo de ecrã com desporto, brincadeiras ao ar livre, estudo e sono descansado',
          'Usar o telemóvel na cama até de madrugada porque ajuda a adormecer mais depressa',
          'Comer sempre com o telemóvel ou tablet à frente para não perder tempo',
          'Passar todo o fim de semana a jogar online sem conversar com a família',
        ],
        en: [
          'Balance screen time with sports, outdoor play, school study, and restful sleep',
          'Use smartphones late in bed because it supposedly induces faster sleep',
          'Always eat meals watching screens to save time',
          'Spend all weekend gaming online without talking to family',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O equilíbrio saudável entre a tecnologia e outras atividades diárias (sono, desporto e família) é fundamental para o bem-estar.',
        en: 'Healthy balance between digital devices and offline activities is vital for physical and mental well-being.',
      },
    },
    {
      id: 'soc-q9',
      question: {
        pt: 'No comércio moderno, o que significa fazer um pagamento contactless?',
        en: 'In modern retail, what does a contactless payment mean?',
      },
      options: {
        pt: [
          'Aproximar o cartão ou smartphone do terminal de pagamento sem ser necessário inseri-lo',
          'Inserir o cartão bancário na ranhura do leitor e digitar sempre o código PIN',
          'Ditar verbalmente o número do cartão ao operador da caixa registadora',
          'Efetuar a transferência bancária através de impresso em papel assinado no balcão',
        ],
        en: [
          'Tapping a bank card or phone near the terminal without inserting it',
          'Inserting the bank card into the terminal slot and always entering the PIN',
          'Dictating the card number verbally to the checkout cashier',
          'Performing a bank transfer via signed paper form at a bank counter',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A tecnologia contactless utiliza ondas de rádio de curto alcance (NFC) para pagar de forma rápida e segura.',
        en: 'Contactless payments utilize Near Field Communication (NFC) for swift, encrypted transactions.',
      },
    },
    {
      id: 'soc-q10',
      question: {
        pt: 'Que profissional utiliza as TIC de forma indispensável no seu trabalho diário?',
        en: 'Which professional relies critically on ICT in daily work?',
      },
      options: {
        pt: [
          'Médicos, professores, arquitetos, controladores aéreos e meteorologistas',
          'Exclusivamente técnicos de informática e programadores de software',
          'Apenas colaboradores de empresas de telecomunicações móveis',
          'Trabalhadores de escritórios que não lidem com atendimento ao público',
        ],
        en: [
          'Doctors, teachers, architects, air traffic controllers, and meteorologists',
          'Exclusively IT technicians and software developers',
          'Only employees of mobile telecommunication companies',
          'Office workers who do not interact with the general public',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Praticamente todas as profissões atuais utilizam ferramentas de TIC para organizar, comunicar e trabalhar melhor.',
        en: 'Virtually every contemporary field uses ICT tools to organize, communicate, and innovate.',
      },
    },
    {
      id: 'soc-q11',
      question: {
        pt: 'O que pode provocar o excesso de tempo passado em frente aos ecrãs sem pausas?',
        en: 'What can excessive uninterrupted screen time cause?',
      },
      options: {
        pt: [
          'Cansaço visual, dores de cabeça, postura incorreta e dificuldades no sono',
          'Aumento automático das notas da escola em todas as disciplinas',
          'Maior força muscular nas pernas',
          'Melhoria do sono profundo',
        ],
        en: [
          'Eye fatigue, headaches, poor posture, and sleep disturbances',
          'Automatic improvement in school grades across all subjects',
          'Increased leg muscle strength',
          'Better deep sleep',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O uso excessivo e sem pausas causa cansaço visual e problemas posturais.',
        en: 'Prolonged uninterrupted screen usage leads to digital fatigue and musculoskeletal strain.',
      },
    },
    {
      id: 'soc-q12',
      question: {
        pt: 'Na meteorologia, de que forma as TIC são usadas para prever a chuva de amanhã?',
        en: 'In meteorology, how does ICT forecast tomorrow’s rain?',
      },
      options: {
        pt: [
          'Supercomputadores processam dados de satélites e estações meteorológicas em segundos',
          'Estimativas baseadas apenas na observação direta do céu matinal',
          'Barómetros mecânicos manuais sem ligação a redes informáticas',
          'Tabelas históricas impressas em papel sem dados recolhidos em tempo real',
        ],
        en: [
          'Supercomputers calculate data from satellites and weather stations in seconds',
          'Estimates based purely on visual observation of the morning sky',
          'Manual mechanical barometers without network connection',
          'Historic paper lookup tables without real-time data input',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os supercomputadores meteorológicos resolvem equações complexas com dados globais para prever o clima.',
        en: 'Meteorological supercomputers compute complex atmospheric equations using global data.',
      },
    },
    {
      id: 'soc-q13',
      question: {
        pt: 'O que é a "Pegada Digital" que cada pessoa vai deixando na Internet?',
        en: 'What is the "Digital Footprint" that people leave on the Internet?',
      },
      options: {
        pt: [
          'O rasto de informações, fotografias, pesquisas e mensagens que partilhamos online',
          'O registo biométrico da impressão digital gravado no leitor do telemóvel',
          'O histórico de consumo de bateria registado pelo sistema operativo',
          'A lista de aplicações desinstaladas do dispositivo',
        ],
        en: [
          'The trail of data, photos, searches, and messages we leave online',
          'The biometric fingerprint record stored in the phone reader',
          'The battery consumption history logged by the operating system',
          'The list of uninstalled applications on the device',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Tudo o que publicamos ou pesquisamos fica gravado em servidores e compõe a nossa pegada digital.',
        en: 'Everything posted, searched, or shared leaves traces on servers, forming our digital footprint.',
      },
    },
    {
      id: 'soc-q14',
      question: {
        pt: 'Numa biblioteca escolar moderna com TIC, o que podemos fazer no catálogo digital?',
        en: 'In a modern school library with ICT, what can we do in the digital catalog?',
      },
      options: {
        pt: [
          'Pesquisar livros por autor ou tema, verificar se estão disponíveis e requisitar online',
          'Apenas olhar para as capas de livros sem autorização',
          'Substituir os livros por jogos de tabuleiro exclusivamente',
          'Impedir os alunos de lerem livros em papel',
        ],
        en: [
          'Search books by author or topic, check availability, and reserve online',
          'Only browse covers without borrowing privileges',
          'Replace all books exclusively with board games',
          'Prevent students from reading paper books',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O catálogo digital da biblioteca permite encontrar rapidamente qualquer obra através do computador ou telemóvel.',
        en: 'Digital library catalogs enable swift searches and reservation directly from any device.',
      },
    },
    {
      id: 'soc-q15',
      question: {
        pt: 'O que é a Cidadania Digital?',
        en: 'What is Digital Citizenship?',
      },
      options: {
        pt: [
          'Utilizar as tecnologias com respeito pelos outros, segurança, responsabilidade e sentido crítico',
          'Ter o direito de publicar qualquer conteúdo na rede sem regras ou moderação',
          'Limitar o uso da Internet a serviços estatais e governamentais',
          'Saber configurar routers de rede e cabos de fibra ótica de forma autónoma',
        ],
        en: [
          'Using technology with respect, safety, responsibility, and critical thinking',
          'Having the right to post any content online without moderation or rules',
          'Restricting Internet usage solely to official governmental services',
          'Knowing how to configure network routers and fibre cables independently',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Ser um bom cidadão digital é aplicar os valores de respeito, segurança e responsabilidade no mundo virtual.',
        en: 'Being a good digital citizen means applying empathy, safety, and responsibility across virtual spaces.',
      },
    },
    {
      id: 'soc-q16',
      question: {
        pt: 'Qual é a melhor forma de proteger os nossos dados num computador público da escola?',
        en: 'What is the best way to safeguard our data on a public school computer?',
      },
      options: {
        pt: [
          'Terminar a sessão (Logout) em todas as contas e fechar o navegador antes de sair',
          'Deixar a palavra-passe guardada no navegador para facilitar a próxima pessoa',
          'Desligar o monitor deixando a conta aberta em segundo plano',
          'Minimizar as janelas do navegador para o ambiente de trabalho',
        ],
        en: [
          'Logging out of all accounts and closing the browser before leaving',
          'Saving passwords in the public browser to help the next person',
          'Turning off the screen while leaving accounts active in background',
          'Minimizing browser windows to the desktop',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Terminar sempre a sessão (Logout) impede que outras pessoas acedam aos teus trabalhos e contas!',
        en: 'Always logging out ensures that subsequent computer users cannot access your accounts or private files.',
      },
    },
  ],
};
