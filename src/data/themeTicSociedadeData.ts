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
      eyebrow: { pt: 'Como funciona?', en: 'How it works' },
      h: { pt: 'Comércio eletrónico', en: 'E-Commerce' },
      body: {
        pt: 'O comércio eletrónico é a compra e venda de produtos ou serviços através da Internet. Uma pessoa escolhe um produto num site, paga eletronicamente e o produto é entregue em casa através dos transportes.<br><br>É um bom exemplo de como várias TIC trabalham em conjunto: o site, o pagamento digital e o acompanhamento da entrega.',
        en: 'E-commerce is the buying and selling of goods or services via the Internet. A person selects an item on a website, pays electronically, and the parcel is delivered home through transport networks.<br><br>It is a great example of how multiple ICT tools cooperate: the website, digital payment, and delivery tracking.',
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
          'A sigla TIC significa Tecnologias da Informação e Comunicação.',
          'Consiste no conjunto de ferramentas tecnológicas, computadores, telemóveis, redes e programas que nos permitem criar, guardar, processar e partilhar informação com qualquer pessoa no mundo.',
          'Hoje em dia, quase tudo à nossa volta funciona com recurso às TIC: desde os semáforos inteligentes até aos satélites que prevêem o estado do tempo!',
        ],
        en: [
          'ICT stands for Information and Communication Technologies.',
          'It is the set of tech tools, computers, smartphones, networks, and software that allow us to create, store, process, and share information worldwide.',
          'Nowadays, almost everything around us uses ICT: from smart traffic lights to weather forecasting satellites!',
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
        pt: 'Sabias que o primeiro computador eletrónico da história (o ENIAC, em 1946) pesava cerca de 30 toneladas e ocupava uma sala inteira de 167 m²? Hoje, um pequeno smartphone no teu bolso é milhares de vezes mais rápido!',
        en: 'Did you know the first electronic computer (ENIAC, in 1946) weighed about 30 tons and occupied an entire 167 m² room? Today, the smartphone in your pocket is thousands of times faster!',
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
              'Escrever apenas com lápis de grafite numa folha de papel sem usar eletricidade',
              'Correr no recreio durante o intervalo da escola',
              'Guardar os cadernos na mochila',
            ],
            en: [
              'School digital portals for submitting homework and interactive e-textbooks',
              'Writing solely with a graphite pencil on paper without electricity',
              'Running in the playground during school recess',
              'Keeping notebooks inside the backpack',
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
          pt: 'A médica da Maria acede ao historial de vacinas num computador seguro, prescreve a receita por SMS e envia o pedido de análises diretamente para o laboratório.',
          en: 'Maria’s doctor opens vaccination records on a secure computer, issues an e-prescription by SMS, and transmits lab test requests automatically.',
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
          pt: 'Porque lidam com vidas humanas! Por isso, estes serviços têm sempre geradores de energia de emergência e computadores suplentes de reserva.',
          en: 'Because human lives are at stake! That is why emergency services have backup generators and redundant servers.',
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
              'O fabrico artesanal de rodas de madeira',
              'Pintar faixas no chão com trincha manual',
              'Usar cavalos para transporte de mercadorias',
            ],
            en: [
              'GPS navigation systems and contactless ticketing',
              'Handcrafting wooden wagon wheels',
              'Painting road lines with manual brushes',
              'Using horses for heavy transport',
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
        pt: 'Vantagens e Cuidados no Uso das TIC',
        en: 'Benefits and Safe Habits in ICT Use',
      },
      shortDesc: {
        pt: 'Aprende a equilibrar o tempo de ecrã com a vida real e o bem-estar.',
        en: 'Learn to balance screen time with real-life activities and well-being.',
      },
      icon: '⚖️',
      explanation: {
        pt: [
          'Vantagens das TIC: facilidade de comunicação com quem está longe, acesso rápido à informação para estudar, automatização de tarefas repetitivas e novas formas de arte e lazer.',
          'Cuidados a ter: evitar o uso excessivo de ecrãs, ter atenção à postura corporal para não magoar as costas, proteger os dados pessoais e manter tempo para brincar ao ar livre e conviver com a família.',
          'Um cidadão digital inteligente usa a tecnologia como uma aliada, sabendo quando desligar o ecrã!',
        ],
        en: [
          'Benefits: easy communication over distance, instant knowledge for school, automating repetitive tasks, and creative expression.',
          'Careful habits: avoiding excessive screen time, minding posture, protecting personal data, and enjoying outdoor play and family time.',
          'A smart digital citizen uses technology wisely and knows when to unplug!',
        ],
      },
      example: {
        title: {
          pt: 'Organizar a tarde de estudo e brincadeira',
          en: 'Organizing afternoon study and play',
        },
        scenario: {
          pt: 'O Gonçalo usa o tablet durante 45 minutos para fazer uma pesquisa de História e depois desliga-o para ir jogar à bola no parque com os amigos.',
          en: 'Gonçalo uses his tablet for 45 minutes to research History and then turns it off to play soccer in the park with friends.',
        },
        tip: {
          pt: 'Fazer pausas e praticar exercício físico ajuda o cérebro e os olhos a descansarem.',
          en: 'Taking breaks and exercising helps both your brain and your eyes rest.',
        },
      },
      funFact: {
        pt: 'Existe uma regra médica chamada "Regra 20-20-20": a cada 20 minutos a olhar para um ecrã, deves olhar para algo a 20 pés (cerca de 6 metros) durante pelo menos 20 segundos para descansar os olhos!',
        en: 'There is a medical rule called the "20-20-20 Rule": every 20 minutes of screen time, look at an object 20 feet (6 meters) away for 20 seconds to rest your eyes!',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que pode acontecer se utilizares o telemóvel na cama imediatamente antes de dormir?',
          en: 'What can happen if you use your phone in bed right before falling asleep?',
        },
        clue: {
          pt: 'A luz azul dos ecrãs engana o cérebro sobre ser dia ou noite.',
          en: 'Blue light from screens tricks your brain into thinking it is still daytime.',
        },
        reflection: {
          pt: 'A luz dos ecrãs bloqueia a melatonina (a hormona do sono), fazendo com que demoremos muito mais tempo a adormecer e acordemos cansados no dia seguinte.',
          en: 'Screen light delays melatonin production, making it harder to fall asleep and leaving us tired the next morning.',
        },
      },
      quizQuestions: [
        {
          id: 'q-cuidados-1',
          question: {
            pt: 'Qual é uma atitude saudável de um bom cidadão digital?',
            en: 'What is a healthy habit of a smart digital citizen?',
          },
          options: {
            pt: [
              'Equilibrar o tempo de ecrã com exercício físico e convívio presencial',
              'Estar 8 horas seguidas a jogar computador sem fazer nenhuma pausa',
              'Usar o telemóvel na cama até às duas da madrugada',
              'Nunca desligar o ecrã durante as refeições em família',
            ],
            en: [
              'Balancing screen time with exercise and in-person social life',
              'Gaming for 8 consecutive hours without taking breaks',
              'Using phones in bed until 2 AM',
              'Never putting down devices during family meals',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! O equilíbrio entre tecnologia e vida real é fundamental para a saúde.',
            en: 'Spot on! Balancing tech and real life is essential for well-being.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-tic-onde-usadas',
      themeId: 'tic-sociedade',
      number: 1,
      title: { pt: '🏢 Onde são utilizadas as TIC?', en: '🏢 Where is ICT Used?' },
      shortDesc: { pt: 'Descobre os aparelhos e sistemas tecnológicos em cada local.', en: 'Identify digital devices and systems in each environment.' },
      icon: '🏢',
      durationMinutes: 4,
      points: 20,
      type: 'match_pairs',
    },
    {
      id: 'jogo-tic-liga-setor',
      themeId: 'tic-sociedade',
      number: 2,
      title: { pt: '🔗 Liga a tecnologia ao setor', en: '🔗 Match Tech to Industry' },
      shortDesc: { pt: 'Associa cada inovação (saúde, transporte, escola) ao seu setor.', en: 'Link each innovation to its respective sector.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 15,
      type: 'match_pairs',
    },
    {
      id: 'jogo-tic-dia-a-dia',
      themeId: 'tic-sociedade',
      number: 3,
      title: { pt: '🏠 TIC no dia a dia', en: '🏠 ICT in Daily Life' },
      shortDesc: { pt: 'Avalia situações do quotidiano e escolhe a atitude correta.', en: 'Evaluate real-life scenarios and choose the right approach.' },
      icon: '🏠',
      durationMinutes: 5,
      points: 20,
      type: 'safe_dangerous',
    },
    {
      id: 'jogo-tic-descobre-tech',
      themeId: 'tic-sociedade',
      number: 4,
      title: { pt: '🕵️ Descobre a tecnologia', en: '🕵️ Spot the Technology' },
      shortDesc: { pt: 'Resolve enigmas para descobrir que tecnologia está a ser usada.', en: 'Solve riddles to identify the hidden technology.' },
      icon: '🕵️',
      durationMinutes: 5,
      points: 20,
      type: 'what_would_you_do',
    },
    {
      id: 'jogo-tic-verdadeiro-falso',
      themeId: 'tic-sociedade',
      number: 5,
      title: { pt: '⚡ Verdadeiro ou Falso: TIC', en: '⚡ True or False: ICT' },
      shortDesc: { pt: 'Responde rápido e testa a tua rapidez mental sobre as TIC.', en: 'Answer quickly and test your agility on ICT concepts.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 15,
      type: 'true_false',
    },
    {
      id: 'quiz-final-tema1',
      themeId: 'tic-sociedade',
      number: 6,
      title: { pt: '🎯 Quiz TIC na Sociedade', en: '🎯 ICT in Society Master Quiz' },
      shortDesc: { pt: 'Desafio completo com 16 perguntas e feedback imediato!', en: 'Comprehensive 16-question quiz with instant feedback!' },
      icon: '🎯',
      durationMinutes: 10,
      points: 80,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'soc-q1',
      question: {
        pt: 'O que significa exatamente a sigla TIC?',
        en: 'What does the acronym ICT stand for?',
      },
      options: {
        pt: [
          'Tecnologias da Informação e Comunicação',
          'Telefones da Internet e Computadores',
          'Técnicas de Instalação de Cabos',
          'Tecnologias de Impressão e Cópia',
        ],
        en: [
          'Information and Communication Technologies',
          'Internet Telephones and Computers',
          'Cable Installation Techniques',
          'Printing and Copy Technologies',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'TIC significa Tecnologias da Informação e Comunicação, englobando computadores, redes e comunicações.',
        en: 'ICT stands for Information and Communication Technologies.',
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
          'O bisturi manual de metal sem qualquer componente digital',
          'A marquesa de madeira do consultório',
          'A ligadura de algodão',
        ],
        en: [
          'Electronic health records and SMS e-prescriptions',
          'A traditional metal scalpel without digital components',
          'A wooden exam table',
          'A cotton bandage',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As receitas eletrónicas por SMS e os registos no computador dos hospitais são exemplos claros de TIC.',
        en: 'E-prescriptions via SMS and computerized health records are prime examples of health ICT.',
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
          'Nas rodas de borracha dos veículos',
          'Nos bancos almofadados do metro',
          'No asfalto da estrada',
        ],
        en: [
          'On digital screens showing arrival countdowns and contactless transit cards',
          'On vehicle rubber tires',
          'On metro seat cushions',
          'On street asphalt',
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
          'Poder jogar jogos de ação durante a explicação do professor sem prestar atenção',
          'Deixar de ser necessário pensar ou estudar',
          'Ficar acordado a noite toda a navegar na web',
        ],
        en: [
          'Access to digital libraries, interactive simulations, and updated e-textbooks',
          'Gaming during teacher lectures without paying attention',
          'No longer needing to think or study',
          'Staying awake all night browsing the web',
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
          'Um mapa impresso em papel dobrado dentro do porta-luvas do carro',
          'Um espelho retrovisor do automóvel',
          'Uma bússola magnética antiga',
        ],
        en: [
          'A system that calculates location and navigates routes via satellite signals',
          'A folded paper map inside the glovebox',
          'A car rearview mirror',
          'An ancient magnetic compass',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O GPS recebe sinais de vários satélites em órbita para determinar com exatidão a nossa posição na Terra.',
        en: 'GPS calculates coordinates by timing signals from orbiting satellites.',
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
          'Deitando telemóveis velhos no caixote do lixo comum',
          'Imprimindo centenas de folhas de papel desnecessárias',
        ],
        en: [
          'Through meteorological sensors and satellites detecting wildfires and pollution',
          'By consuming uncontrolled power all day',
          'By discarding old phones into ordinary household trash',
          'By printing hundreds of redundant paper sheets',
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
          'Atirá-lo para o rio ou deixá-lo no chão da floresta',
          'Colocá-lo no caixote do lixo orgânico juntamente com restos de comida',
          'Tentá-lo queimar na lareira',
        ],
        en: [
          'Take it to an authorized e-waste collection point for recycling',
          'Throw it in a river or on a trail',
          'Put it in the organic trash bin with food scraps',
          'Burn it in a fireplace',
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
        pt: 'Qual é a chamada "Regra 20-20-20" recomendada para utilizadores de computadores?',
        en: 'What is the "20-20-20 Rule" recommended for computer users?',
      },
      options: {
        pt: [
          'A cada 20 minutos de ecrã, olhar para longe (6 metros) durante pelo menos 20 segundos',
          'Jogar 20 jogos seguidos com 20 amigos durante 20 horas',
          'Comprar 20 telemóveis e 20 computadores a cada 20 anos',
          'Reiniciar o computador 20 vezes a cada 20 minutos',
        ],
        en: [
          'Every 20 minutes, look at an object 20 feet (6m) away for 20 seconds',
          'Play 20 games with 20 friends for 20 hours',
          'Buy 20 phones and 20 laptops every 20 years',
          'Reboot the machine 20 times every 20 minutes',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A regra 20-20-20 ajuda os músculos oculares a relaxar, prevenindo a fadiga visual provocada pelos ecrãs.',
        en: 'The 20-20-20 rule relaxes ciliary eye muscles, mitigating digital eye strain.',
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
          'Pagar apenas com moedas antigas de cobre',
          'Enviar o dinheiro pelo correio tradicional numa carta selada',
          'Trocar mercadorias como se fazia na Idade Média',
        ],
        en: [
          'Tapping a bank card or phone near the terminal without inserting it',
          'Paying exclusively with old copper coins',
          'Sending banknotes in stamped envelopes',
          'Bartering goods as in medieval times',
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
          'Apenas os criadores de videojogos profissionais',
          'Nenhum profissional precisa de computadores hoje em dia',
          'Apenas os técnicos que vendem cabos elétricos',
        ],
        en: [
          'Doctors, teachers, architects, air traffic controllers, and meteorologists',
          'Only professional video game creators',
          'No professional needs computers today',
          'Only electrical cable vendors',
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
          'Os cientistas adivinham com base no vento sem recorrer a computadores',
          'Olham apenas para uma janela do laboratório',
          'Consultam cartas astronómicas antigas',
        ],
        en: [
          'Supercomputers calculate data from satellites and weather stations in seconds',
          'Scientists guess based on wind without computers',
          'They just peek out a lab window',
          'They read ancient astrological charts',
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
          'A marca dos sapatos quando andamos em cima de um teclado',
          'O desenho da mão desenhado num tablet com caneta digital',
          'A poeira que fica acumulada no ecrã do telemóvel',
        ],
        en: [
          'The trail of data, photos, searches, and messages we leave online',
          'Shoe marks left when walking over a keyboard',
          'A hand outline drawn on a tablet stylus pad',
          'Dust accumulating on a smartphone screen',
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
          'Ter mais de dez telemóveis guardados em casa',
          'Nunca responder a ninguém nas mensagens online',
          'Saber desmontar um computador peça por peça com chave de fendas',
        ],
        en: [
          'Using technology with respect, safety, responsibility, and critical thinking',
          'Owning more than ten smartphones at home',
          'Never replying to anyone online',
          'Disassembling computers with a screwdriver',
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
          'Colocar um papel por cima do ecrã',
        ],
        en: [
          'Logging out of all accounts and closing the browser before leaving',
          'Saving passwords in the public browser to help the next person',
          'Turning off the screen while leaving accounts active in background',
          'Covering the screen with a paper sheet',
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
