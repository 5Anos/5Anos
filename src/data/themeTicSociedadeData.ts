import { ThemeDefinition } from '../types';

export const themeTicSociedadeData: ThemeDefinition = {
  id: 'tic-sociedade',
  number: 1,
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
        pt: 'A sigla <strong>TIC</strong> significa <em>Tecnologias da Informação e Comunicação</em>.<br><br>As TIC não são apenas computadores ou telemóveis físicos. São todas as ferramentas, redes e programas que nos permitem <strong>procurar, criar, guardar, organizar e comunicar informação</strong>.<br><br>💡 <strong>A Regra de Ouro:</strong> A tecnologia existe para nos ajudar a resolver problemas reais do dia a dia!',
        en: 'The acronym <strong>ICT</strong> stands for <em>Information and Communication Technologies</em>.<br><br>ICT is not just physical computers or phones. It encompasses all tools, software, and networks used to <strong>search, create, store, organize, and communicate information</strong>.<br><br>💡 <strong>Core Rule:</strong> Technology exists to help solve real-world problems!',
      },
      icon: '💡',
    },
    {
      eyebrow: { pt: 'TIC na Escola', en: 'ICT at School' },
      h: { pt: 'Como a tecnologia ajuda a aprender?', en: 'How does tech aid learning?' },
      body: {
        pt: 'Na escola, as TIC estão presentes em muitos momentos:<br><ul><li><strong>Plataformas digitais:</strong> para aceder a trabalhos e avisos dos professores.</li><li><strong>Catálogo da biblioteca:</strong> para pesquisar livros disponíveis em segundos.</li><li><strong>Quadros interativos:</strong> para ver vídeos, simulações científicas e mapas.</li><li><strong>Caderneta digital:</strong> para as famílias acompanharem as presenças e notas.</li></ul><br>🤔 <em>Pensamento Crítico:</em> Se queres pedir uma borracha ao colega sentado ao teu lado, não precisas de tecnologia — falar cara a cara é sempre melhor!',
        en: 'At school, ICT assists in many daily workflows:<br><ul><li><strong>Digital platforms:</strong> access assignments and teacher notices.</li><li><strong>Library catalog:</strong> find available books in seconds.</li><li><strong>Interactive whiteboards:</strong> watch educational simulations and maps.</li><li><strong>Digital student portal:</strong> track attendance and grades.</li></ul><br>🤔 <em>Critical Insight:</em> If you need an eraser from your desk classmate, speak face-to-face — tech is only needed when useful!',
      },
      icon: '🏫',
    },
    {
      eyebrow: { pt: 'Saúde e Transportes', en: 'Health & Transport' },
      h: { pt: 'Salvar vidas e orientar caminhos com GPS', en: 'Saving lives & GPS navigation' },
      body: {
        pt: 'As TIC revolucionaram áreas fundamentais da sociedade:<br><ul><li><strong>Saúde e Telemedicina:</strong> Médicos consultam pacientes à distância e utilizam processos clínicos eletrónicos. Os robôs cirúrgicos apoiam operações com máxima precisão (como ferramentas de auxílio, nunca substituindo os médicos humanos).</li><li><strong>Transportes e GPS:</strong> O <em>GPS</em> recebe sinais de satélites no espaço para calcular caminhos e evitar engarrafamentos.</li></ul>',
        en: 'ICT revolutionized vital sectors of our society:<br><ul><li><strong>Healthcare & Telemedicine:</strong> Doctors provide remote consultations and use electronic records. Surgical robots assist precision operations as surgeon-guided tools.</li><li><strong>Transport & GPS:</strong> <em>GPS</em> receives satellite signals to guide routes and avoid traffic.</li></ul>',
      },
      icon: '🩺',
    },
    {
      eyebrow: { pt: 'Comércio e Contactless', en: 'Commerce & Contactless' },
      h: { pt: 'Pagamentos rápidos por aproximação (NFC) e compras online', en: 'Tap-to-pay (NFC) & online shopping' },
      body: {
        pt: 'Quando pagamos algo aproximando o cartão ou o telemóvel do terminal de pagamento (TPA), estamos a usar a tecnologia <strong>Contactless (NFC - Near Field Communication)</strong>, que comunica por ondas de rádio de curto alcance sem inserir o cartão.<br><br>📦 <strong>As 6 Fases da Compra Online:</strong><br>1. Escolher o produto ➔ 2. Fazer encomenda ➔ 3. Pagamento seguro ➔ 4. Preparação no armazém ➔ 5. Transporte por GPS ➔ 6. Entrega ao cliente.<br><br>💡 <em>Lembra-te:</em> Comprar nas lojas tradicionais do teu bairro ajuda a economia local e poupa embalagens!',
        en: 'Tapping a card or phone on a payment terminal uses <strong>Contactless (NFC - Near Field Communication)</strong> radio waves.<br><br>📦 <strong>The 6 Online Shopping Stages:</strong><br>1. Browse ➔ 2. Place order ➔ 3. Secure payment ➔ 4. Warehouse packing ➔ 5. GPS delivery ➔ 6. Customer delivery.<br><br>💡 <em>Tip:</em> Shopping at local neighborhood stores supports the community and cuts packaging waste!',
      },
      icon: '💳',
    },
    {
      eyebrow: { pt: 'Ambiente e Indústria', en: 'Environment & Industry' },
      h: { pt: 'Sensores inteligentes e a Internet das Coisas (IoT)', en: 'Smart sensors & Internet of Things (IoT)' },
      body: {
        pt: '• <strong>Sensores de solo:</strong> Na agricultura, medem a humidade da terra e só ligam a rega quando necessário, poupando milhares de litros de água.<br>• <strong>IoT (Internet das Coisas):</strong> Aparelhos do dia a dia ligados em rede a comunicar dados.<br>• <strong>Satélites e Ambiente:</strong> Ajudam a prever tempestades, monitorizar florestas e combater a poluição.',
        en: '• <strong>Soil sensors:</strong> Trigger precision irrigation only when moisture drops, conserving water.<br>• <strong>IoT (Internet of Things):</strong> Everyday devices networked to share data.<br>• <strong>Satellites & Climate:</strong> Track storms, monitor forests, and fight environmental pollution.',
      },
      icon: '🌾',
    },
    {
      eyebrow: { pt: 'História e Evolução', en: 'History & Evolution' },
      h: { pt: 'Do ENIAC de 1946 aos supercomputadores e profissões digitais', en: 'From 1946 ENIAC to supercomputers & ICT careers' },
      body: {
        pt: '• <strong>ENIAC (1946):</strong> Um dos primeiros computadores do mundo, ocupava uma sala inteira de 160 metros quadrados!<br>• <strong>Supercomputadores:</strong> Máquinas gigantes que realizam biliões de cálculos por segundo para a investigação e meteorologia.<br>• <strong>Profissões TIC:</strong> Programadores de apps, especialistas em cibersegurança, designers web e engenheiros de robótica.',
        en: '• <strong>ENIAC (1946):</strong> One of the first computers, occupying an entire 160 m² room!<br>• <strong>Supercomputers:</strong> Processing trillions of calculations per second for science.<br>• <strong>ICT Careers:</strong> App developers, cybersecurity defenders, web designers, and robotics engineers.',
      },
      icon: '⚡',
    },
    {
      eyebrow: { pt: 'Cidadania e Segurança', en: 'Citizenship & Safety' },
      h: { pt: 'Cyberbullying, Linha 800 21 90 90 e Ponto Eletrão', en: 'Cyberbullying, Helpline 800 21 90 90 & E-Waste' },
      body: {
        pt: '🛡️ <strong>Regra dos 5 Passos contra o Cyberbullying:</strong><br>1. 🛑 <strong>PARAR</strong> (não responder com insultos)<br>2. 📸 <strong>GUARDAR</strong> (fazer printscreens como prova)<br>3. 🚫 <strong>BLOQUEAR</strong> o contacto<br>4. 🚩 <strong>DENUNCIAR</strong> na plataforma<br>5. 🧑‍🏫 <strong>PEDIR AJUDA</strong> a pais, professores ou ligar para a <em>Linha Internet Segura (800 21 90 90 - Gratuita e Confidencial)</em>.<br><br>♻️ <strong>Lixo Eletrónico:</strong> Aparelhos avariados e pilhas devem ser colocados no <em>Ponto Eletrão</em>, nunca no lixo comum!',
        en: '🛡️ <strong>5-Step Rule Against Cyberbullying:</strong><br>1. 🛑 <strong>STOP</strong><br>2. 📸 <strong>SAVE</strong> evidence<br>3. 🚫 <strong>BLOCK</strong> sender<br>4. 🚩 <strong>REPORT</strong><br>5. 🧑‍🏫 <strong>SEEK HELP</strong> from trusted adults or call the <em>Safe Internet Helpline (800 21 90 90 - Free & Confidential)</em>.<br><br>♻️ <strong>E-Waste:</strong> Deliver broken electronics to <em>Ponto Eletrão</em> recycling points!',
      },
      icon: '🛡️',
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
          'As TIC (Tecnologias da Informação e Comunicação) são o conjunto de tecnologias, equipamentos, programas e redes que nos permitem criar, guardar, organizar, procurar e comunicar informação.',
          'Dizemos que as TIC não são apenas computadores ou telemóveis porque o mais importante é a sua utilidade: comunicar com pessoas distantes, aprender novos conteúdos e automatizar tarefas do quotidiano.',
        ],
        en: [
          'ICT encompasses the tools, software, and networks used to create, store, organize, search, and communicate digital information.',
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
          pt: 'A tecnologia serve para resolver problemas reais!',
          en: 'Technology exists to solve real problems!',
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
              'Tecnologias da Informação e Comunicação',
              'Técnicas de Informática e Cabos',
              'Telemóveis e Internet em Casa',
              'Transmissão Instantânea de Computadores',
            ],
            en: [
              'Information and Communication Technologies',
              'Techniques of Informatics and Cables',
              'Telephones and Internet at Home',
              'Instant Computer Transmission',
            ],
          },
          correctIndex: 0,
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
        pt: 'As TIC na Saúde, Transportes, Comércio e Ambiente',
        en: 'ICT in Healthcare, Transport, Commerce & Environment',
      },
      shortDesc: {
        pt: 'Compreende como o GPS, a telemedicina, os pagamentos contactless (NFC) e os sensores IoT transformam a sociedade.',
        en: 'Explore how GPS, telemedicine, contactless NFC payments, and IoT sensors reshape society.',
      },
      icon: '🏥',
      explanation: {
        pt: [
          'Na saúde, as TIC permitem teleconsultas à distância e auxiliam cirurgiões com robôs de alta precisão.',
          'Nos transportes, o GPS recebe sinais de satélite para orientar veículos e calcular trajetos.',
          'No comércio, a tecnologia contactless utiliza ondas NFC para pagamentos rápidos sem inserir o cartão.',
          'Na agricultura e ambiente, sensores de humidade e IoT permitem regar apenas o necessário e poupar água.',
        ],
        en: [
          'In healthcare, ICT enables remote telemedicine and precision surgical robots.',
          'In transport, GPS satellite signals provide turn-by-turn navigation.',
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
        pt: 'A tecnologia Contactless funciona a uma distância máxima de cerca de 4 centímetros para garantir que não fazes pagamentos por engano!',
        en: 'Contactless NFC operates within ~4 cm to prevent accidental payments!',
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
              'NFC (Near Field Communication / Contactless)',
              'Bluetooth de longo alcance',
              'Sensor de humidade do solo',
              'Impressão a laser',
            ],
            en: [
              'NFC (Near Field Communication / Contactless)',
              'Long-range Bluetooth',
              'Soil moisture sensor',
              'Laser printing',
            ],
          },
          correctIndex: 0,
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
              'Processar biliões de cálculos complexos para ciência e previsões climáticas',
              'Servir apenas para ver vídeos infantis na Internet',
              'Imprimir folhas em papel mais depressa',
              'Substituir os cadernos escolares na mochila',
            ],
            en: [
              'Process billions of complex calculations for climate models and science',
              'Only play video games',
              'Print paper faster',
              'Replace school backpack notebooks',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Supercomputadores realizam cálculos gigantescos para investigação científica e previsões meteorológicas.',
            en: 'Supercomputers process massive computational models for science and weather forecasting.',
          },
        },
      ],
    },
    {
      id: 'tic-soc-cidadania-seguranca',
      themeId: 'tic-sociedade',
      number: 4,
      title: {
        pt: 'Cidadania Digital, Cyberbullying e Linha Internet Segura',
        en: 'Digital Citizenship, Cyberbullying & Safe Helpline',
      },
      shortDesc: {
        pt: 'Domina a Regra dos 5 Passos contra o cyberbullying, sabe quando ligar para a Linha 800 21 90 90 e protege a tua pegada digital.',
        en: 'Master the 5-step rule against cyberbullying, use the 800 21 90 90 helpline, and protect your digital footprint.',
      },
      icon: '🛡️',
      explanation: {
        pt: [
          'O cyberbullying é a agressão ou humilhação intencional repetida através de meios digitais. A regra dos 5 passos (Parar, Guardar, Bloquear, Denunciar, Pedir Ajuda) garante segurança.',
          'A Linha Internet Segura (800 21 90 90) é um serviço telefónico gratuito e confidencial em Portugal para apoiar crianças, pais e professores.',
          'A pegada digital é o registo do que publicamos online. Dados pessoais e palavras-passe nunca devem ser partilhados publicamente.',
        ],
        en: [
          'Cyberbullying is repeated digital harassment. The 5 steps (Stop, Save, Block, Report, Seek Help) provide clear safety guidelines.',
          'The Safe Internet Helpline (800 21 90 90) is a free and confidential support line in Portugal.',
          'Digital footprints represent online activity records. Never share personal addresses or passwords.',
        ],
      },
      example: {
        title: {
          pt: 'Exemplo: Pedir Ajuda',
          en: 'Example: Asking for Help',
        },
        scenario: {
          pt: 'A Ana recebe mensagens desagradáveis. Ela guarda as mensagens como prova, bloqueia o contacto e fala imediatamente com os pais e professores.',
          en: 'Ana receives mean messages. She captures screenshots as proof, blocks the sender, and tells trusted adults immediately.',
        },
        tip: {
          pt: 'Pedir ajuda é o passo mais inteligente e corajoso!',
          en: 'Seeking help is the smartest and bravest move!',
        },
      },
      funFact: {
        pt: 'Tudo o que publicas na Internet pode ficar guardado para sempre, mesmo que apagues a mensagem logo a seguir!',
        en: 'Everything posted online can leave a lasting digital footprint even if deleted quickly!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se um colega estiver a sofrer ofensas num chat de grupo, o que deves fazer?',
          en: 'If a peer is facing harassment in a group chat, what should you do?',
        },
        clue: {
          pt: 'Lembra-te de não ficar calado nem rir da situação.',
          en: 'Remember not to stay silent or laugh along.',
        },
        reflection: {
          pt: 'Apoia o colega, guarda provas e avisa um professor ou adulto de confiança.',
          en: 'Support your classmate, save evidence, and notify a trusted teacher or parent.',
        },
      },
      quizQuestions: [
        {
          id: 'q-mod4-1',
          question: {
            pt: 'Qual é o número gratuito da Linha Internet Segura em Portugal?',
            en: 'What is the toll-free Safe Internet Helpline number in Portugal?',
          },
          options: {
            pt: [
              '800 21 90 90',
              '112',
              '808 24 24 24',
              '118',
            ],
            en: [
              '800 21 90 90',
              '112',
              '808 24 24 24',
              '118',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'A Linha Internet Segura atende gratuitamente no 800 21 90 90.',
            en: 'The Safe Internet Helpline operates toll-free at 800 21 90 90.',
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
        pt: 'Classifica objetos entre TIC e não-TIC, compreende o porquê de cada resposta e escolhe a tecnologia ideal para resolver problemas reais.',
        en: 'Classify tools between ICT and non-ICT, understand the reasons, and choose tech solutions for everyday problems.',
      },
      durationMinutes: 5,
      type: 'true_false',
      icon: '💡',
    },
    {
      id: 'desafio-tic-ajuda-escola',
      themeId: 'tic-sociedade',
      number: 2,
      title: {
        pt: '🏫 Atividade de Criação: Ajuda a Escola a Resolver um Problema!',
        en: '🏫 Creative Activity: Help the School Solve a Problem!',
      },
      shortDesc: {
        pt: 'Escolhe um desafio real da tua escola, desenha a tua solução inovadora, seleciona as TIC certas e recebe o teu Diploma de Inventor TIC!',
        en: 'Pick a school challenge, design your tech idea, select ICT tools, and earn your ICT Innovator Diploma!',
      },
      durationMinutes: 7,
      type: 'copy_or_create',
      icon: '🏫',
    },
    {
      id: 'desafio-tic-seguranca-cyberbullying',
      themeId: 'tic-sociedade',
      number: 3,
      title: {
        pt: '🛡️ Guardião Digital: Cyberbullying (5 Passos) & Linha 800 21 90 90',
        en: '🛡️ Digital Guardian: Cyberbullying (5 Steps) & Helpline',
      },
      shortDesc: {
        pt: 'Aprende a agir perante situações desconfortáveis na Internet, explora o caso da Ana e memoriza os 5 passos essenciais de segurança.',
        en: 'Learn how to act against online harassment, explore Ana’s case, and master the 5 key safety steps.',
      },
      durationMinutes: 6,
      type: 'what_would_you_do',
      icon: '🛡️',
    },
    {
      id: 'desafio-tic-pegada-ecra-lixo',
      themeId: 'tic-sociedade',
      number: 4,
      title: {
        pt: '🌍 Publicarias Isto? Pegada Digital, Tempo de Ecrã & Lixo Eletrónico',
        en: '🌍 Would You Post This? Footprint, Screen Time & E-Waste',
      },
      shortDesc: {
        pt: 'Avalia situações do dia a dia: fotos, palavras-passe, horas de sono, reciclagem no Ponto Eletrão e conversa cara a cara.',
        en: 'Evaluate scenarios: photos, passwords, sleep balance, e-waste recycling, and face-to-face communication.',
      },
      durationMinutes: 6,
      type: 'safe_dangerous',
      icon: '🌍',
    },
    {
      id: 'desafio-tic-compra-online',
      themeId: 'tic-sociedade',
      number: 5,
      title: {
        pt: '📦 Como Chega uma Compra Online & Pagamentos Contactless (NFC)',
        en: '📦 How Online Orders Work & Contactless NFC Payments',
      },
      shortDesc: {
        pt: 'Explora o circuito de 6 passos de uma compra online, descobre como o contactless (NFC) funciona e reflete sobre o comércio local.',
        en: 'Explore the 6-step e-commerce pipeline, understand contactless NFC payments, and reflect on local commerce.',
      },
      durationMinutes: 6,
      type: 'order_sequence',
      icon: '📦',
    },
    {
      id: 'quiz-final-tema1',
      themeId: 'tic-sociedade',
      number: 6,
      title: {
        pt: '🏆 Avaliação Final: TIC na Sociedade (15 Questões)',
        en: '🏆 Final Quiz: ICT in Society (15 Questions)',
      },
      shortDesc: {
        pt: 'Testa todos os teus conhecimentos com 15 perguntas rigorosas e educativas sobre as TIC na Sociedade. Vale 100 XP!',
        en: 'Test your mastery with 15 pedagogical questions covering all Theme 1 concepts. Worth 100 XP!',
      },
      durationMinutes: 12,
      type: 'final_quiz',
      icon: '🏆',
    },
  ],
  finalQuiz: [
    // EXACTLY 15 COMPREHENSIVE PEDAGOGICAL QUESTIONS (PT & EN)
    {
      id: 'fq-tic-1',
      question: {
        pt: 'O que significa a sigla TIC e qual é a sua função principal?',
        en: 'What does the acronym ICT stand for and what is its primary purpose?',
      },
      options: {
        pt: [
          'Tecnologias da Informação e Comunicação: ferramentas que nos ajudam a trabalhar com informação e a comunicar.',
          'Técnicas de Informática e Cabos: aparelhos elétricos que apenas servem para ligar computadores à corrente.',
          'Transmissão Instantânea de Computadores: programas exclusivos para criar videojogos em computadores de secretária.',
          'Telefones e Internet em Casa: um serviço que serve apenas para fazer chamadas telefónicas fixas.',
        ],
        en: [
          'Information and Communication Technologies: tools that help us process information and communicate.',
          'Informatics and Cables: electrical accessories used only to plug computers into power sockets.',
          'Instant Computer Transmission: programs exclusively designed for desktop video games.',
          'Home Internet & Phones: a service used solely for landline phone calls.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As TIC (Tecnologias da Informação e Comunicação) são tecnologias que nos ajudam a criar, guardar, organizar, procurar e comunicar informação.',
        en: 'ICT stands for Information and Communication Technologies, enabling us to create, store, organize, search, and communicate data.',
      },
    },
    {
      id: 'fq-tic-2',
      question: {
        pt: 'Porque é que dizemos que as TIC não são apenas os aparelhos físicos (como computadores e telemóveis)?',
        en: 'Why do we say ICT is more than just physical devices (like computers and smartphones)?',
      },
      options: {
        pt: [
          'Porque o mais importante é o que fazemos com eles: os programas, a Internet e a forma como comunicamos e resolvemos problemas.',
          'Porque os aparelhos eletrónicos não funcionam sem pilhas ou baterias recarregáveis.',
          'Porque os livros em papel e os cadernos escolares também são considerados aparelhos eletrónicos digitais.',
          'Porque qualquer objeto de plástico utilizado na sala de aula é considerado uma TIC.',
        ],
        en: [
          'Because what matters most is what we accomplish with them: software, networks, communication, and problem-solving.',
          'Because electronic devices require rechargeable batteries to operate.',
          'Because paper textbooks and notebooks are also classified as digital electronic devices.',
          'Because every plastic object used in the classroom is considered ICT.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As TIC englobam os equipamentos, as aplicações, as redes e, acima de tudo, as tarefas e problemas que conseguimos resolver através delas.',
        en: 'ICT encompasses hardware, software, networks, and above all, our capacity to solve real-world problems through them.',
      },
    },
    {
      id: 'fq-tic-3',
      question: {
        pt: 'O Tiago quer mostrar o seu trabalho de Ciências à avó que vive noutra cidade distante. Qual é a melhor utilização das TIC?',
        en: 'Tiago wants to show his Science project to his grandmother living far away. What is the best use of ICT?',
      },
      options: {
        pt: [
          'Fazer uma videochamada pela Internet através de um computador ou tablet para conversar e mostrar o trabalho em direto.',
          'Desenhar o trabalho num cartaz de cartolina e guardá-lo na pasta da escola sem o fotografar.',
          'Telefonar através de dois copos de iogurte ligados por um cordel esticado até à outra cidade.',
          'Escrever o trabalho numa folha e esperar pelas próximas férias para lhe mostrar pessoalmente.',
        ],
        en: [
          'Make an Internet video call on a computer or tablet to talk and show the assignment live.',
          'Draw the project on cardboard and store it inside a school backpack without photographing it.',
          'Use two paper cups connected by string across the distant town.',
          'Write the work on paper and wait months for holidays to visit in person.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A videochamada transmite áudio, vídeo e imagem em direto através de redes digitais, aproximando pessoas que estão longe.',
        en: 'Video calls transmit live audio and video over digital networks, connecting people instantly across distance.',
      },
    },
    {
      id: 'fq-tic-4',
      question: {
        pt: 'Estás com a tua família numa cidade que não conheces e precisam de encontrar o caminho mais rápido até ao museu. Que tecnologia vos pode orientar?',
        en: 'You are with your family in an unfamiliar city and need the fastest route to the museum. What technology guides you?',
      },
      options: {
        pt: [
          'O GPS (Sistema de Posicionamento Global) através de uma aplicação de mapas no telemóvel.',
          'Um sensor de humidade colocado no solo do jardim da rua.',
          'Uma impressora multifunções ligada por cabo USB ao computador.',
          'Um leitor de código de barras instalado numa caixa de supermercado.',
        ],
        en: [
          'GPS (Global Positioning System) via a mobile map application.',
          'A soil moisture sensor placed in a sidewalk flowerbed.',
          'A multifunction printer plugged into a computer via USB.',
          'A barcode scanner installed at a supermarket checkout.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O GPS recebe sinais de satélites no espaço para calcular a localização exata e indicar o melhor caminho no mapa.',
        en: 'GPS calculates coordinates from space satellite signals to deliver turn-by-turn navigation.',
      },
    },
    {
      id: 'fq-tic-5',
      question: {
        pt: 'Como é que as TIC ajudam os médicos e os doentes num hospital moderno?',
        en: 'How does ICT assist doctors and patients in modern healthcare?',
      },
      options: {
        pt: [
          'Permitem consultar exames no computador, fazer teleconsultas à distância e usar robôs como ferramentas de apoio em cirurgias.',
          'Substituem totalmente os médicos e enfermeiros, que deixam de ser necessários no hospital.',
          'Servem apenas para os doentes jogarem videojogos nas salas de espera.',
          'Fazem o diagnóstico automático de todas as doenças sem qualquer intervenção ou decisão humana.',
        ],
        en: [
          'They allow digital medical record access, remote telemedicine, and high-precision robot assistance for surgeons.',
          'They completely replace human doctors and nurses who are no longer needed.',
          'They are used solely for patients to play video games in waiting rooms.',
          'They diagnose all medical conditions automatically without human physician oversight.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As TIC facilitam processos clínicos, permitem telemedicina e disponibilizam robôs de apoio com grande precisão aos cirurgiões.',
        en: 'ICT enables electronic patient records, telemedicine, and provides surgical robotic assistance to doctors.',
      },
    },
    {
      id: 'fq-tic-6',
      question: {
        pt: 'Um agricultor quer saber se a sua plantação precisa de rega sem desperdiçar água. Como pode a tecnologia ajudar?',
        en: 'A farmer wants to check if crops need irrigation without wasting water. How does ICT help?',
      },
      options: {
        pt: [
          'Instalando sensores de humidade no solo ligados em rede (IoT / Internet das Coisas) que avisam quando o solo está seco.',
          'Regando todo o campo continuamente dia e noite com a mesma quantidade de água, mesmo quando chove.',
          'Substituindo todas as plantas naturais por fotografias digitais projetadas num ecrã.',
          'Colocando um microfone no campo para ouvir as folhas a crescer.',
        ],
        en: [
          'Installing networked soil moisture sensors (IoT) that signal when the soil is genuinely dry.',
          'Watering the entire field non-stop day and night, even during heavy rain.',
          'Replacing natural crops with digital photos projected on a screen.',
          'Placing a microphone in the field to listen to leaves growing.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os sensores detetam a humidade do solo e comunicam através da IoT para regar apenas quando é necessário, poupando água.',
        en: 'Sensors detect soil moisture and communicate via IoT to irrigate only when necessary, conserving water.',
      },
    },
    {
      id: 'fq-tic-7',
      question: {
        pt: 'A Maria paga um livro aproximando o cartão do terminal de pagamento (TPA), sem o inserir na ranhura. O que caracteriza este pagamento contactless?',
        en: 'Maria pays for a book by tapping her card near the terminal without inserting it. What characterizes contactless payment?',
      },
      options: {
        pt: [
          'O cartão comunica com o terminal através de tecnologia sem fios de curto alcance (NFC).',
          'O cliente tem de deixar o cartão dentro do terminal durante várias horas para concluir a compra.',
          'O cliente é obrigado a tirar uma fotografia ao cartão e enviá-la por correio eletrónico à loja.',
          'O terminal de pagamento fotografa as moedas no bolso do cliente através de uma câmara de raio-X.',
        ],
        en: [
          'The card communicates with the terminal using short-range wireless radio technology (NFC).',
          'The customer must leave the card inside the terminal for several hours.',
          'The customer must photograph the card and email it to the merchant.',
          'The terminal scans coins inside the customer’s pocket using X-ray cameras.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O pagamento contactless utiliza a tecnologia NFC (Near Field Communication) para transmitir dados encriptados a curta distância.',
        en: 'Contactless payment relies on Near Field Communication (NFC) for encrypted data exchange within a few centimeters.',
      },
    },
    {
      id: 'fq-tic-8',
      question: {
        pt: 'Qual é a sequência correta das etapas de uma compra no comércio eletrónico?',
        en: 'What is the correct sequence of stages in an e-commerce online purchase?',
      },
      options: {
        pt: [
          'Escolher o produto ➔ Fazer encomenda ➔ Efetuar pagamento ➔ Preparação no armazém ➔ Transporte por GPS ➔ Entrega ao cliente.',
          'Entrega em casa ➔ Escolher produto na loja física ➔ Devolver embalagem ➔ Pagar em dinheiro.',
          'Transporte de carrinha ➔ Pagar na fábrica ➔ Escolher o produto depois de receber ➔ Criar o site.',
          'Embalar em casa ➔ Enviar para a loja online ➔ Escolher produto num catálogo de papel.',
        ],
        en: [
          'Choose product ➔ Place order ➔ Complete payment ➔ Warehouse packing ➔ GPS transport ➔ Customer delivery.',
          'Home delivery ➔ Choose item in physical store ➔ Return box ➔ Pay with coins.',
          'Courier transport ➔ Factory payment ➔ Choose item after delivery ➔ Build website.',
          'Pack at home ➔ Send to online shop ➔ Pick item from paper catalog.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O comércio eletrónico segue um circuito organizado onde as TIC apoiam a pesquisa, o pagamento seguro, a gestão de stock e o rastreio por GPS.',
        en: 'E-commerce follows a structured pipeline where ICT supports searching, encrypted checkout, warehouse management, and GPS parcel tracking.',
      },
    },
    {
      id: 'fq-tic-9',
      question: {
        pt: 'O computador ENIAC (em 1946) ocupava uma sala inteira. Hoje existem supercomputadores na ciência. O que é um supercomputador?',
        en: 'The ENIAC computer (1946) occupied an entire hall. Today supercomputers exist in science. What is a supercomputer?',
      },
      options: {
        pt: [
          'É um computador ultra-poderoso capaz de realizar biliões de cálculos por segundo para previsões meteorológicas e investigação científica.',
          'É um telemóvel comum com uma capa protetora de plástico muito resistente.',
          'É um computador portátil antigo que apenas tem jogos de cartas instalados.',
          'É uma impressora gigante capaz de imprimir jornais em poucos segundos.',
        ],
        en: [
          'An ultra-powerful machine capable of trillions of calculations per second for climate and scientific research.',
          'A standard mobile phone inside a heavy-duty protective plastic case.',
          'An obsolete laptop used solely for card games.',
          'A giant industrial printer printing newspapers in seconds.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Supercomputadores processam quantidades gigantescas de dados climáticos e científicos que computadores comuns levariam anos a calcular.',
        en: 'Supercomputers process massive computational models for climate forecasting and scientific discovery.',
      },
    },
    {
      id: 'fq-tic-10',
      question: {
        pt: 'A Ana recebe mensagens repetidas e desagradáveis num grupo de conversação. O que deve fazer perante esta situação de cyberbullying?',
        en: 'Ana receives repeated hurtful messages in a group chat. What should she do regarding this cyberbullying situation?',
      },
      options: {
        pt: [
          'Parar a conversa, não responder, guardar provas (printscreens), bloquear o contacto e pedir ajuda a um adulto de confiança.',
          'Responder imediatamente com insultos mais graves para demonstrar força.',
          'Partilhar as mensagens em todas as redes sociais públicas para criar uma discussão geral.',
          'Apagar tudo rapidamente, esconder o telemóvel e não contar a ninguém por vergonha.',
        ],
        en: [
          'Stop talking, do not reply, save screenshot evidence, block the sender, and ask a trusted adult for help.',
          'Reply with worse insults to prove strength.',
          'Broadcast the messages on all public social channels to start a dispute.',
          'Delete everything, hide the phone, and stay silent out of shame.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A regra dos 5 passos (Parar, Guardar, Bloquear, Denunciar e Pedir Ajuda) garante segurança e permite a intervenção de adultos.',
        en: 'The 5-step rule (Stop, Save, Block, Report, Seek Help) protects victims and allows adults to intervene effectively.',
      },
    },
    {
      id: 'fq-tic-11',
      question: {
        pt: 'Como pode a Linha Internet Segura (800 21 90 90) ajudar uma criança ou jovem em Portugal?',
        en: 'How can the Safe Internet Helpline (800 21 90 90) help a child or youth in Portugal?',
      },
      options: {
        pt: [
          'É um serviço telefónico gratuito e confidencial que aconselha e apoia em dúvidas, problemas ou ofensas online.',
          'É uma loja que vende peças de computador e repara telemóveis avariados.',
          'É uma linha telefónica exclusiva para marcar faltas às aulas de TIC na escola.',
          'É um programa de rádio sobre videojogos infantis e desenhos animados.',
        ],
        en: [
          'It is a free and confidential helpline providing guidance and support for online safety issues, doubts, and cyberbullying.',
          'It is a commercial store that sells computer parts and repairs broken phones.',
          'It is a hotline for registering student school absences.',
          'It is a radio show broadcasting cartoons and video game reviews.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A Linha Internet Segura (800 21 90 90) oferece atendimento confidencial e gratuito para esclarecer dúvidas e apoiar em situações de risco na Internet.',
        en: 'The Safe Internet Helpline (800 21 90 90) offers free, anonymous counseling for digital safety concerns.',
      },
    },
    {
      id: 'fq-tic-12',
      question: {
        pt: 'O que é a "pegada digital" de uma pessoa na Internet?',
        en: 'What is a person’s "digital footprint" on the Internet?',
      },
      options: {
        pt: [
          'O conjunto de informações, publicações, registos e pesquisas que ficam associados à nossa atividade online.',
          'A marca deixada pelo dedo no ecrã tátil do telemóvel quando este está sujo.',
          'O número de passos que damos enquanto caminhamos a olhar para o telemóvel.',
          'A marca do sapato que deixamos no chão da sala de aula de TIC.',
        ],
        en: [
          'The trail of data, posts, searches, and activity records linked to our digital identity online.',
          'The fingerprint mark left on a dirty smartphone touchscreen.',
          'The number of physical steps taken while looking at a phone.',
          'The shoeprint left on the floor of the computer lab.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A pegada digital é o rasto permanente que deixamos com as nossas ações online, pelo que devemos ser responsáveis com a nossa privacidade.',
        en: 'Your digital footprint is the lasting trail created by online activity, making privacy protection crucial.',
      },
    },
    {
      id: 'fq-tic-13',
      question: {
        pt: 'O Pedro jogou no telemóvel até às 2h da manhã e acordou cansado. Qual é a melhor recomendação para um uso saudável das TIC?',
        en: 'Pedro played mobile games until 2 AM and woke up exhausted. What is the healthiest recommendation for ICT usage?',
      },
      options: {
        pt: [
          'Fazer pausas, desligar ecrãs antes de dormir e equilibrar com sono (9-10h), estudo, desporto e família.',
          'Jogar durante a noite toda porque a luz do ecrã ajuda a descansar a mente.',
          'Deixar de estudar para ter mais horas livres para subir de nível nos jogos.',
          'Nunca mais tocar em nenhum computador ou telemóvel durante toda a vida.',
        ],
        en: [
          'Take regular breaks, avoid screens before bed, and balance digital time with sleep (9-10 hrs), study, sports, and family.',
          'Play games all night because screen light relaxes brain activity.',
          'Stop doing homework to maximize gaming leveling hours.',
          'Never touch a computer or smartphone ever again for life.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O uso saudável das TIC exige equilíbrio entre as atividades digitais, o sono reparador, o desporto e o convívio presencial.',
        en: 'Healthy ICT usage requires balancing digital screen time with restful sleep, physical exercise, and family time.',
      },
    },
    {
      id: 'fq-tic-14',
      question: {
        pt: 'O Guilherme está na sala de aula ao lado do seu colega de mesa e quer pedir-lhe uma borracha. O que deve fazer?',
        en: 'Guilherme is seated beside his desk classmate and needs an eraser. What should he do?',
      },
      options: {
        pt: [
          'Falar diretamente com o colega cara a cara, porque a tecnologia só deve ser usada quando é realmente necessária.',
          'Enviar uma mensagem por chat com um vídeo explicativo sobre o formato da borracha.',
          'Criar uma página Web com um formulário de requisição de materiais.',
          'Enviar um email formal com aviso de receção para o colega que está ao seu lado.',
        ],
        en: [
          'Talk directly to the classmate face-to-face, because technology should be used when genuinely needed.',
          'Send a chat message with an explanatory video about the eraser.',
          'Build a website with an online supply requisition form.',
          'Send a formal certified email to the peer seated right next to him.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A conversa presencial direta é a melhor escolha quando estamos juntos. A tecnologia deve ser usada com critério e inteligência.',
        en: 'Direct face-to-face communication is best when seated together. Tech should be used thoughtfully.',
      },
    },
    {
      id: 'fq-tic-15',
      question: {
        pt: 'Em casa da Sofia há um telemóvel antigo e cabos avariados que já ninguém usa. O que se deve fazer a este lixo eletrónico?',
        en: 'Sofia has an old broken phone and cables in a drawer. What should be done with this electronic waste (e-waste)?',
      },
      options: {
        pt: [
          'Entregá-los num ponto de recolha próprio (Ponto Eletrão) para reciclagem segura dos materiais.',
          'Deitá-los no contentor do lixo comum da cozinha juntamente com restos de comida.',
          'Deitá-los no ecoponto azul do papel e cartão para serem triturados.',
          'Queimá-los no quintal para libertar espaço nas gavetas.',
        ],
        en: [
          'Deliver them to a dedicated e-waste collection bin (Ponto Eletrão) for safe material recycling.',
          'Toss them into household kitchen food waste bins.',
          'Throw them into the blue paper and cardboard recycling bin.',
          'Burn them in the backyard to free up drawer space.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Equipamentos elétricos e eletrónicos têm componentes perigosos e metais recicláveis; devem ser sempre colocados no Ponto Eletrão.',
        en: 'Electronics contain both hazardous chemicals and recoverable metals; they must be disposed of at dedicated e-waste recycling points.',
      },
    },
  ],
};
