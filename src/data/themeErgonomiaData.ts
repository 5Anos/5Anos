import { ThemeDefinition } from '../types';

export const themeErgonomiaData: ThemeDefinition = {
  id: 'ergonomia',
  number: 2,
  title: {
    pt: 'Ergonomia',
    en: 'Ergonomics',
  },
  tagline: {
    pt: 'Aprende a utilizar dispositivos eletrónicos de forma correta, confortável e segura.',
    en: 'Learn to use electronic devices correctly, comfortably, and safely.',
  },
  intro: {
    pt: 'Passar tempo ao computador ou com o telemóvel não tem de causar dores nas costas ou nos olhos! A ergonomia estuda a melhor forma de adaptar a secretária, a cadeira, o ecrã e a postura ao nosso corpo, garantindo saúde e conforto.',
    en: 'Working on a computer or phone shouldn’t hurt your back or eyes! Ergonomics explores how to adapt your desk, chair, screen, and posture to your body for health and comfort.',
  },
  icon: '🪑',
  illustrationKey: 'ergonomia',
  accentColor: 'emerald',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'O que é?', en: 'What is it?' },
      h: { pt: 'O que é a ergonomia?', en: 'What is ergonomics?' },
      body: {
        pt: 'A ergonomia é a forma como organizamos o espaço, os equipamentos e a nossa posição para trabalhar de maneira confortável e saudável.<br><br>Quando usamos computadores, tablets ou telemóveis durante muito tempo, uma postura incorreta pode causar dores nas costas, no pescoço, nos olhos e nos pulsos.',
        en: 'Ergonomics is the way we organize the space, equipment, and our posture to work comfortably and healthily.<br><br>When we use computers, tablets, or smartphones for a long time, improper posture can cause back, neck, eye, and wrist strain.',
      },
      icon: '🪑',
    },
    {
      eyebrow: { pt: 'Postura Correta', en: 'Correct Posture' },
      h: { pt: 'Como te deves sentar ao computador?', en: 'How should you sit at the computer?' },
      body: {
        pt: 'Para manter o corpo saudável e sem cansaço enquanto estudas ao computador:<ul><li><strong>Ombros:</strong> relaxados e descontraídos.</li><li><strong>Costas:</strong> direitas, com a parte inferior bem apoiada na cadeira.</li><li><strong>Cotovelos e pulsos:</strong> alinhados a um ângulo próximo de 90 graus.</li><li><strong>Ecrã:</strong> topo do ecrã ao nível dos olhos (ou ligeiramente abaixo) e a 45–70 cm de distância.</li><li><strong>Pernas e pés:</strong> coxas apoiadas e pés bem assentes no chão ou num descanso de pés.</li><li><strong>Espaço:</strong> área por baixo da secretária desobstruída para esticar confortavelmente as pernas.</li></ul>',
        en: 'To keep your body healthy and strain-free while working at the computer:<ul><li><strong>Shoulders:</strong> relaxed and dropped.</li><li><strong>Back:</strong> straight, with lower back firmly supported by the chair.</li><li><strong>Elbows & wrists:</strong> aligned at approximately a 90-degree angle.</li><li><strong>Screen:</strong> top of monitor at eye level (or slightly below) and 45–70 cm away.</li><li><strong>Legs & feet:</strong> thighs supported and feet flat on the floor or on a footrest.</li><li><strong>Space:</strong> clear space under the desk to move your legs comfortably.</li></ul>',
      },
      icon: '🧍',
    },
    {
      eyebrow: { pt: 'Sabias que...?', en: 'Did you know...?' },
      h: { pt: 'A iluminação também conta', en: 'Lighting matters too' },
      body: {
        pt: 'Uma sala com boa iluminação, sem reflexos fortes no ecrã, ajuda a proteger os olhos e evita dores de cabeça. Evita trabalhar num quarto totalmente escuro apenas com a luz do ecrã.',
        en: 'A well-lit room without harsh glare on your screen protects your eyesight and prevents headaches. Avoid working in a pitch-black room illuminated only by the display screen.',
      },
      icon: '💡',
    },
    {
      eyebrow: { pt: 'Vamos pensar', en: "Let's think" },
      h: { pt: 'A importância das pausas', en: 'The importance of breaks' },
      body: {
        pt: 'Ficar sentado e imóvel durante muito tempo não é saudável. A cada 30 a 40 minutos, é recomendável levantar, esticar as pernas e os braços e descansar os olhos, olhando para longe durante alguns segundos.',
        en: 'Sitting motionless for hours is unhealthy. Every 30 to 40 minutes, stand up, stretch your arms and legs, and rest your eyes by looking at a distant point for several seconds.',
      },
      icon: '⏰',
    },
    {
      eyebrow: { pt: 'Na vida real', en: 'In real life' },
      h: { pt: 'Organizar o espaço de trabalho', en: 'Organizing your workspace' },
      body: {
        pt: 'Uma mesa arrumada, com espaço suficiente para os braços e o teclado, e uma cadeira ajustada à altura do corpo, tornam o estudo muito mais confortável, focado e seguro.<br><br>Consulta no guia visual ao lado a comparação detalhada entre o que <strong>deves fazer</strong> para proteger a tua coluna e o que <strong>não deves fazer</strong> quando estás ao computador.',
        en: 'A tidy desk with ample room for your keyboard and arms, paired with a height-adjusted chair, makes study sessions comfortable, focused, and safe.<br><br>Check the visual guide on the side for a detailed comparison of what you <strong>should do</strong> to protect your spine versus what you <strong>should not do</strong> when working at a computer.',
      },
      icon: '🖥️',
    },
  ],
  modules: [
    {
      id: 'ergo-postura-corpo',
      themeId: 'ergonomia',
      number: 1,
      title: {
        pt: 'A Postura Correta ao Computador',
        en: 'Proper Posture at the Computer',
      },
      shortDesc: {
        pt: 'A regra dos 90 graus para braços e pernas, costas direitas e pés no chão.',
        en: 'The 90-degree rule for arms and legs, straight spine, and flat feet.',
      },
      icon: '🧘',
      explanation: {
        pt: [
          'A postura corporal enquanto estudamos no computador é essencial para evitar dores musculares e problemas na coluna vertebral.',
          'Costas: devem estar direitas e bem encostadas ao encosto da cadeira, com apoio para a zona lombar (fundo das costas).',
          'Braços e Cotovelos: devem formar um ângulo de 90° a 100° graus em relação à mesa, com os ombros descontraídos e sem tensão.',
          'Pernas e Joelhos: os joelhos devem estar fletidos a cerca de 90 graus e os pés devem assentar completamente no chão ou num apoio de pés.',
        ],
        en: [
          'Proper posture when studying at a computer prevents muscle pain and spine disorders.',
          'Back: straight and resting firmly against the chair backrest, with lower back lumbar support.',
          'Arms and Elbows: should form a 90° to 100° angle with relaxed shoulders.',
          'Legs and Knees: knees bent at 90 degrees with both feet flat on the floor or footrest.',
        ],
      },
      example: {
        title: {
          pt: 'O caso da Rita e as dores de pescoço',
          en: 'Rita and neck stiffness',
        },
        scenario: {
          pt: 'A Rita sentava-se na ponta da cadeira com as costas curvadas como um caracol para olhar para o computador portátil. Ao fim de meia hora, ficava com dores no pescoço.',
          en: 'Rita used to slouch on the edge of her chair like a snail to look down at her laptop. After 30 minutes, her neck was hurting.',
        },
        tip: {
          pt: 'A Rita ajustou a cadeira para encostar bem as costas e elevou o portátil com um suporte de livros para o topo do ecrã ficar à altura dos seus olhos. As dores desapareceram!',
          en: 'Rita adjusted her chair to support her back and elevated her laptop with a stand so the top edge aligned with her eyes. The pain was gone!',
        },
      },
      funFact: {
        pt: 'Sabias que inclinar frequentemente a cabeça para a frente aumenta o esforço dos músculos do pescoço e pode contribuir para desconforto e dores musculares?',
        en: 'Did you know that frequently tilting your head forward increases strain on neck muscles and can contribute to discomfort?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que não devemos cruzar as pernas nem sentar-nos em cima de um pé enquanto estamos ao computador?',
          en: 'Why should we avoid crossing legs or sitting on one foot while working at a computer?',
        },
        clue: {
          pt: 'Pensa na circulação do sangue e no alinhamento da bacia e da coluna.',
          en: 'Think about blood circulation and pelvis alignment.',
        },
        reflection: {
          pt: 'Cruzar as pernas ou sentar sobre um pé desvia a coluna para o lado (postura assimétrica) e dificulta a circulação sanguínea, provocando formigueiro e dormência nas pernas.',
          en: 'Crossing legs twists the pelvis and spine while hindering blood flow, causing numbness and tingling in your legs.',
        },
      },
      quizQuestions: [
        {
          id: 'q-ergo-1',
          question: {
            pt: 'Qual é a posição correta para os pés ao trabalhar sentado ao computador?',
            en: 'What is the correct position for your feet when working at a computer?',
          },
          options: {
            pt: [
              'Apoiados totalmente e direitos no chão ou num suporte de pés',
              'Enrolados à volta das pernas da cadeira',
              'Sentar em cima de um pé com a perna dobrada',
              'Com os pés pendurados no ar sem tocar em nada',
            ],
            en: [
              'Firmly and flat on the floor or on a footrest',
              'Wrapped around the chair legs',
              'Sitting on top of one folded leg',
              'Dangling in the air without touching anything',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! Os pés devem estar sempre apoiados no chão ou num suporte para aliviar a pressão nas coxas.',
            en: 'Exactly! Feet must always rest flat on the floor or footrest to relieve thigh pressure.',
          },
        },
      ],
    },
    {
      id: 'ergo-ecra-ambiente',
      themeId: 'ergonomia',
      number: 2,
      title: {
        pt: 'Posicionamento do Ecrã, Iluminação e Secretária',
        en: 'Screen Placement, Lighting, and Workspace Setup',
      },
      shortDesc: {
        pt: 'Distância do monitor (50 a 70 cm), altura dos olhos e iluminação sem reflexos.',
        en: 'Monitor distance (50-70 cm), eye level alignment, and glare-free lighting.',
      },
      icon: '🖥️',
      explanation: {
        pt: [
          'Distância do Ecrã: deve estar a um braço de distância (cerca de 50 a 70 cm) dos teus olhos.',
          'Altura do Monitor: o topo do ecrã deve ficar alinhado ou ligeiramente abaixo da linha horizontal dos teus olhos. Assim, não precisas de inclinar a cabeça nem para cima nem para baixo.',
          'Iluminação: a luz da janela ou do candeeiro deve vir preferencialmente de lado. Nunca deves ter uma janela aberta diretamente atrás do ecrã (provoca encandeamento) nem diretamente atrás de ti (provoca reflexos espelhados no vidro).',
          'Rato e Teclado: devem estar à mesma altura e próximos um do outro para não esticares o braço exageradamente.',
        ],
        en: [
          'Screen Distance: roughly an arm’s length away (about 50 to 70 cm).',
          'Screen Height: the top bezel should be at or slightly below eye level.',
          'Lighting: natural light should come from the side. Avoid bright windows directly behind the monitor or behind your back.',
          'Mouse and Keyboard: close together on the same level so your wrists stay straight.',
        ],
      },
      example: {
        title: {
          pt: 'O candeeiro de secretária do Pedro',
          en: 'Pedro’s desk lamp',
        },
        scenario: {
          pt: 'O Pedro tinha o candeeiro a apontar diretamente para o ecrã do computador, o que criava uma mancha de luz brilhante que não o deixava ler as letras com nitidez.',
          en: 'Pedro had his lamp pointing straight at the computer screen, creating a glaring hotspot that made reading text difficult.',
        },
        tip: {
          pt: 'O Pedro virou o candeeiro para iluminar a mesa e as folhas onde escreve, evitando que a luz batesse no vidro do ecrã. A leitura ficou logo mais confortável!',
          en: 'Pedro directed the lamp downward onto his notebook, keeping glare off the screen glass. Immediate comfort boost!',
        },
      },
      funFact: {
        pt: 'Sabias que quando estamos muito concentrados num ecrã podemos pestanejar menos vezes, o que pode contribuir para olhos secos ou irritados?',
        en: 'Did you know that when we are deeply focused on a screen we may blink less frequently, which can contribute to dry or irritated eyes?',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que deves fazer quando usas um computador portátil durante várias horas seguidas na secretária?',
          en: 'What should you do when using a laptop for several hours at a desk?',
        },
        clue: {
          pt: 'Nos portáteis, o teclado e o ecrã estão colados um ao outro.',
          en: 'On laptops, the keyboard and screen are attached together.',
        },
        reflection: {
          pt: 'O ideal é elevar o portátil com um suporte ou livros e ligar um teclado e rato externos! Assim, o ecrã fica à altura certa e os braços ficam confortáveis.',
          en: 'The best ergonomic setup is elevating the laptop on a stand and plugging in an external mouse and keyboard!',
        },
      },
      quizQuestions: [
        {
          id: 'q-ergo-2',
          question: {
            pt: 'A que distância aproximada deve estar o ecrã dos teus olhos?',
            en: 'Approximately how far should the screen be from your eyes?',
          },
          options: {
            pt: [
              'À distância de um braço esticado (cerca de 50 a 70 cm)',
              'A 10 centímetros, quase encostado ao nariz',
              'A 4 metros de distância no outro canto da sala',
              'Colado à testa para ver melhor os detalhes',
            ],
            en: [
              'About an arm’s length away (roughly 50 to 70 cm)',
              '10 centimeters away, nearly touching your nose',
              '4 meters away across the room',
              'Pressed against your forehead',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! A distância recomendada é o comprimento de um braço, entre 50 e 70 centímetros.',
            en: 'Excellent! The recommended distance is an arm’s length, between 50 and 70 cm.',
          },
        },
      ],
    },
    {
      id: 'ergo-pausas-exercicios',
      themeId: 'ergonomia',
      number: 3,
      title: {
        pt: 'Pausas Ativas e Exercícios de Relaxamento',
        en: 'Active Breaks and Stretching Exercises',
      },
      shortDesc: {
        pt: 'Exercícios para o pescoço, pulsos e olhos para recarregar energias.',
        en: 'Neck, wrist, and eye stretches to recharge your body and mind.',
      },
      icon: '⏱️',
      explanation: {
        pt: [
          'O corpo humano não foi feito para estar sentado e imóvel durante horas a fio.',
          'Pausas Periódicas: a cada 45 a 60 minutos, levanta-te da cadeira durante 5 minutos para esticar as pernas, beber um copo de água e mover os braços.',
          'Exercício do Pescoço: roda suavemente a cabeça para a esquerda e para a direita, e inclina a orelha em direção ao ombro devagar.',
          'Exercício dos Pulsos: estica os braços para a frente e flete os pulsos para cima e para baixo suavemente para prevenir tendinites.',
          'Descanso dos Olhos: pestaneja várias vezes conscientemente e olha para uma árvore ou para o céu pela janela.',
        ],
        en: [
          'The human body is designed for movement, not staying frozen in a chair for hours.',
          'Regular Breaks: every 45–60 minutes, stand up for 5 minutes, stretch, and drink water.',
          'Neck Stretches: gently turn your head left and right, tilting ears toward shoulders.',
          'Wrist Stretches: extend arms and gently bend wrists up and down.',
          'Eye Rest: blink intentionally and gaze out the window at distant greenery.',
        ],
      },
      example: {
        title: {
          pt: 'O despertador de pausas do Diogo',
          en: 'Diogo’s stretch timer',
        },
        scenario: {
          pt: 'O Diogo colocou um alarme no relógio para tocar a cada 50 minutos enquanto estuda. Quando o alarme toca, levanta-se, faz cinco polichinelos e bebe água.',
          en: 'Diogo set a 50-minute timer while doing homework. When it rings, he stands up, does five jumping jacks, and drinks water.',
        },
        tip: {
          pt: 'Pequenas pausas regulares podem ajudar a reduzir o desconforto e a manter a concentração!',
          en: 'Regular short breaks can help reduce discomfort and sustain concentration!',
        },
      },
      funFact: {
        pt: 'Sabias que os astronautas na Estação Espacial Internacional têm de fazer 2 horas e meia de exercício físico diário porque sem gravidade os seus músculos e ossos enfraqueceriam muito rapidamente?',
        en: 'Did you know astronauts on the ISS must exercise 2.5 hours every day because without gravity their bones and muscles lose strength rapidly?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se passares 3 horas seguidas a jogar com o telemóvel na mão na mesma posição, que partes do teu corpo se vão queixar primeiro?',
          en: 'If you play mobile games for 3 straight hours in the same pose, which body parts complain first?',
        },
        clue: {
          pt: 'Pensa nos polegares, nos pulsos e no pescoço inclinado para o ecrã.',
          en: 'Think of thumbs, wrists, and your tilted neck.',
        },
        reflection: {
          pt: 'Os polegares (pelo movimento repetitivo), os pulsos e a nuca vão ficar doridos e tensos. Fazer pausas frequentes previne essas lesões!',
          en: 'Your thumbs, wrists, and neck muscles get fatigued from repetitive strain. Frequent micro-breaks prevent injury!',
        },
      },
      quizQuestions: [
        {
          id: 'q-ergo-3',
          question: {
            pt: 'Qual é o intervalo recomendado para fazer uma pausa ativa enquanto estudas ao computador?',
            en: 'What is the recommended interval for taking an active break while studying at a computer?',
          },
          options: {
            pt: [
              'A cada 45 a 60 minutos, levantar durante 5 minutos para esticar o corpo',
              'Apenas uma vez ao fim de 10 horas seguidas',
              'Nunca fazer pausas até o computador ficar sem bateria',
              'Dormir 3 horas de cada vez em cima do teclado',
            ],
            en: [
              'Every 45 to 60 minutes, stand up for 5 minutes to stretch',
              'Only once after 10 continuous hours',
              'Never take breaks until the battery dies',
              'Sleep on top of the keyboard for 3 hours',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! Fazer uma pequena pausa a cada 45-60 minutos revitaliza o corpo e a mente.',
            en: 'Correct! A small break every 45–60 minutes revitalizes your body and mind.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-ergo-tf',
      themeId: 'ergonomia',
      number: 1,
      title: { pt: '🪑 Postura correta ou incorreta?', en: '🪑 Correct or Incorrect Posture?' },
      shortDesc: { pt: 'Avalia posturas corporais ao utilizar computadores e tablets.', en: 'Evaluate body posture when using computers and tablets.' },
      icon: '🪑',
      durationMinutes: 4,
      points: 15,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Postura correta ou incorreta?',
        icon: '🪑',
        xp: 15,
        desc: 'Classifica as afirmações sobre a saúde postural em frente aos ecrãs.',
        data: {
          items: [
            { s: 'Os pés devem estar bem apoiados no chão ou num apoio, com os joelhos a 90 graus.', a: true, e: 'Correto! Os pés apoiados evitam tensão na zona lombar.' },
            { s: 'Podemos usar o portátil deitado na cama de barriga para baixo durante horas.', a: false, e: 'Incorreto! Causa dores intensas no pescoço, costas e pulsos.' },
            { s: 'O topo do monitor deve ficar ao nível dos olhos ou ligeiramente abaixo.', a: true, e: 'Correto! Previne a fadiga cervical e mantém a cabeça direita.' }
          ]
        }
      }
    },
    {
      id: 'jogo-ergo-mc',
      themeId: 'ergonomia',
      number: 2,
      title: { pt: '🎯 Escolhe a melhor posição', en: '🎯 Choose the Best Position' },
      shortDesc: { pt: 'Seleciona as recomendações ergonómicas para evitar lesões.', en: 'Select ergonomic recommendations to prevent injuries.' },
      icon: '🎯',
      durationMinutes: 4,
      points: 20,
      type: 'what_would_you_do',
      gameData: {
        type: 'mc',
        title: 'Escolhe a melhor posição',
        icon: '🎯',
        xp: 20,
        desc: 'Responde às perguntas de escolha múltipla sobre ergonomia e descanso visual.',
        data: {
          questions: [
            {
              q: 'O que dita a regra 20-20-20 para proteger a visão?',
              opts: [
                'A cada 20 minutos, olhar para algo a 20 pés (6 metros) de distância durante 20 segundos',
                'Jogar videojogos 20 horas por dia com 20 minutos de pausa',
                'Comprar 20 óculos de sol por 20 euros',
                'Piscar os olhos 20 vezes por segundo'
              ],
              c: 0,
              e: 'A regra 20-20-20 relaxa os músculos oculares e previne a secura nos olhos.'
            },
            {
              q: 'Qual é a distância recomendada entre os olhos e o ecrã do computador?',
              opts: [
                'Cerca de 50 a 70 centímetros (um braço estendido)',
                'Colar o nariz a 2 centímetros do vidro',
                'A 5 metros de distância de costas voltadas',
                'Exatamente a 3 centímetros'
              ],
              c: 0,
              e: 'Um braço de distância protege a visão e evita reflexos incómodos.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-ergo-match',
      themeId: 'ergonomia',
      number: 3,
      title: { pt: '🔗 Problema e Solução', en: '🔗 Problem and Solution' },
      shortDesc: { pt: 'Associa cada hábito incorreto à sua solução ergonómica.', en: 'Match each incorrect habit to its ergonomic solution.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 20,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Problema e Solução',
        icon: '🔗',
        xp: 20,
        desc: 'Associa o problema postural à respetiva recomendação de saúde.',
        data: {
          pairs: [
            { left: 'Pescoço dorido a olhar para baixo', right: 'Elevar o ecrã ao nível dos olhos' },
            { left: 'Olhos secos e cansados', right: 'Aplicar a regra 20-20-20 e pestanejar' },
            { left: 'Pulsos doridos no teclado', right: 'Manter os punhos direitos e apoio almofadado' },
            { left: 'Fadiga geral ao fim de horas', right: 'Fazer pausas e caminhar a cada 45 minutos' }
          ]
        }
      }
    },
    {
      id: 'jogo-ergo-order',
      themeId: 'ergonomia',
      number: 4,
      title: { pt: '📦 Organiza a secretária ergonómica', en: '📦 Organize Ergonomic Desk' },
      shortDesc: { pt: 'Ordena os passos para arrumar o teu posto de trabalho.', en: 'Order the steps to set up your workstation.' },
      icon: '📦',
      durationMinutes: 4,
      points: 20,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Organiza a secretária ergonómica',
        icon: '📦',
        xp: 20,
        desc: 'Coloca os passos de arrumação ergonómica na ordem ideal.',
        data: {
          items: [
            'Ajustar a altura da cadeira para os pés assentarem no chão',
            'Posicionar o monitor à distância de um braço',
            'Colocar o teclado e rato perto sem esticar os braços',
            'Ligar a luz ambiente adequada sem reflexos no ecrã'
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema2',
      themeId: 'ergonomia',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Ergonomia', en: '🏆 Learning Quiz: Ergonomics' },
      shortDesc: { pt: 'Avaliação final abrangente sobre o Tema 2.', en: 'Comprehensive final assessment on Topic 2.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 50,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'ergo-q1',
      question: {
        pt: 'O que estuda a Ergonomia no contexto das TIC?',
        en: 'What does Ergonomics study in the context of ICT?',
      },
      options: {
        pt: [
          'A adaptação dos equipamentos e do ambiente de trabalho ao corpo humano com conforto e saúde',
          'A velocidade de ligação dos cabos de fibra ótica da Internet',
          'O preço dos computadores nas lojas comerciais',
          'A programação de jogos de ação em código binário',
        ],
        en: [
          'Adapting equipment and workspace to the human body for health and comfort',
          'Fiber optic Internet speed',
          'Computer pricing in electronics stores',
          'Coding action games in binary code',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A ergonomia estuda a melhor relação entre o corpo humano e as ferramentas de trabalho.',
        en: 'Ergonomics optimizes the relationship between the human body and workspace tools.',
      },
    },
    {
      id: 'ergo-q2',
      question: {
        pt: 'Que ângulo aproximado devem formar os cotovelos e os joelhos ao sentar na secretária?',
        en: 'What approximate angle should elbows and knees form when seated at a desk?',
      },
      options: {
        pt: [
          'Um ângulo de cerca de 90 graus',
          'Um ângulo agudo de 15 graus',
          'Completamente esticados a 180 graus no ar',
          'Qualquer posição serve, mesmo todo torcido',
        ],
        en: [
          'An angle of approximately 90 degrees',
          'A tight 15-degree acute angle',
          'Fully extended at 180 degrees in the air',
          'Any twisted pose is fine',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Uma posição próxima dos 90° pode ajudar a manter uma postura confortável e neutra.',
        en: 'A position close to 90 degrees can help maintain a comfortable and neutral posture.',
      },
    },
    {
      id: 'ergo-q3',
      question: {
        pt: 'Onde deve ficar o topo do ecrã do monitor em relação aos teus olhos?',
        en: 'Where should the top bezel of the monitor be relative to your eyes?',
      },
      options: {
        pt: [
          'Ao nível dos olhos ou ligeiramente abaixo da linha horizontal de visão',
          'Muito acima da cabeça para teres de olhar para o teto',
          'No chão debaixo da secretária',
          'Colado ao queixo',
        ],
        en: [
          'At eye level or slightly below the horizontal line of sight',
          'Far above head height forcing you to look up at the ceiling',
          'On the floor under the desk',
          'Resting on your chin',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O topo ao nível dos olhos permite olhar suavemente para baixo sem forçar o pescoço.',
        en: 'Keeping the top edge at eye level allows a natural downward gaze without neck hyperextension.',
      },
    },
    {
      id: 'ergo-q4',
      question: {
        pt: 'Qual é a distância recomendada entre os teus olhos e o ecrã do computador?',
        en: 'What is the recommended viewing distance from eyes to screen?',
      },
      options: {
        pt: [
          'Entre 50 e 70 centímetros (o comprimento aproximado de um braço esticado)',
          '5 centímetros (a colar o nariz ao vidro)',
          'Mais de 3 metros de distância',
          'Não importa a distância, mesmo que encostes o rosto',
        ],
        en: [
          'Between 50 and 70 centimeters (approx. an arm’s length)',
          '5 centimeters (touching your nose to the glass)',
          'Over 3 meters away',
          'Distance does not matter at all',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter uma distância próxima de um braço esticado (cerca de 50 a 70 cm) ajuda a manter uma leitura confortável sem forçar os olhos.',
        en: 'An approximate arm’s length distance (about 50 to 70 cm) helps maintain comfortable viewing without straining eyes.',
      },
    },
    {
      id: 'ergo-q5',
      question: {
        pt: 'O que deves fazer se os teus pés não chegarem ao chão quando a cadeira está regulada à altura da mesa?',
        en: 'What should you do if your feet do not touch the floor with the chair adjusted to desk height?',
      },
      options: {
        pt: [
          'Utilizar um apoio de pés para que fiquem bem assentes e nivelados',
          'Deixar os pés a baloiçar no ar durante horas',
          'Enrolar os pés nas rodas da cadeira',
          'Tirar a cadeira e estudar de joelhos no chão',
        ],
        en: [
          'Use a footrest so your feet rest firmly and flat',
          'Let your feet dangle in the air for hours',
          'Tangle your ankles in the caster wheels',
          'Remove the chair and study on your knees',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Um apoio de pés (ou uma caixa firme) garante que a parte de trás das coxas não fica comprimida.',
        en: 'A footrest ensures feet are supported, preventing poor circulation in the thighs.',
      },
    },
    {
      id: 'ergo-q6',
      question: {
        pt: 'De onde deve vir preferencialmente a luz natural numa sala de estudo para não encandear?',
        en: 'Where should natural window light ideally come from in a study room?',
      },
      options: {
        pt: [
          'De lado em relação ao posto de trabalho e ao ecrã',
          'Exatamente atrás do ecrã, a bater nos teus olhos',
          'Exatamente atrás das tuas costas, a refletir no ecrã como um espelho',
          'Não deve haver qualquer iluminação, deves estar no escuro total',
        ],
        en: [
          'From the side relative to the desk and monitor',
          'Directly behind the screen, shining right into your eyes',
          'Directly behind your back, reflecting off the monitor glass',
          'No lighting at all, in pitch black darkness',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A luz vinda de lado ilumina o espaço sem criar reflexos diretos nem encandear o utilizador.',
        en: 'Side lighting illuminates the desk without causing direct glare or reflections on the screen.',
      },
    },
    {
      id: 'ergo-q7',
      question: {
        pt: 'Porque é prejudicial estudar ou jogar no computador no escuro absoluto?',
        en: 'Why is it harmful to study or play on a computer in total darkness?',
      },
      options: {
        pt: [
          'Porque o forte contraste entre o ecrã brilhante e o quarto escuro causa grande fadiga visual',
          'Porque o computador desliga-se se não detetar luz',
          'Porque as teclas deixam de funcionar',
          'Não tem qualquer efeito negativo',
        ],
        en: [
          'Because the extreme contrast between bright screen and dark room causes severe eye strain',
          'Because the computer powers off if it does not sense light',
          'Because keyboard keys stop typing',
          'There is no negative effect',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A pupila tem de dilatar e contrair constantemente, provocando cansaço e dores de cabeça.',
        en: 'The pupil struggles with extreme brightness contrast, inducing ocular fatigue and headaches.',
      },
    },
    {
      id: 'ergo-q8',
      question: {
        pt: 'O que deves fazer quando usas um computador portátil durante várias horas seguidas?',
        en: 'What should you do when using a laptop for several consecutive hours?',
      },
      options: {
        pt: [
          'Elevar o portátil com um suporte e utilizar um teclado e rato externos',
          'Pousar o portátil no colo em cima das pernas dobradas na cama',
          'Deitar de barriga para baixo no tapete com o pescoço dobrado para trás',
          'Segurar o portátil com uma só mão no ar',
        ],
        en: [
          'Elevate the laptop with a stand and connect an external mouse and keyboard',
          'Balance the laptop on your lap in bed with folded knees',
          'Lie on your stomach on the rug with your neck hyperextended',
          'Hold the laptop with one hand in the air',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Usar um suporte para elevar o ecrã e ligar rato e teclado externos previne o curvamento da coluna.',
        en: 'Elevating the display to eye level with separate peripherals prevents slouching.',
      },
    },
    {
      id: 'ergo-q9',
      question: {
        pt: 'O que significa o termo "Pescoço de Texto" (Text Neck)?',
        en: 'What does the term "Text Neck" mean?',
      },
      options: {
        pt: [
          'A dor e tensão muscular causada por inclinar a cabeça para a frente e para baixo para o telemóvel',
          'Uma nova gola de camisola com símbolos do teclado',
          'Um acessório para pendurar computadores ao pescoço',
          'Uma massagem relaxante feita por robôs',
        ],
        en: [
          'Pain and muscle strain caused by constantly tilting your head down at a smartphone',
          'A new sweater collar with keyboard keys',
          'A strap for hanging desktop towers around the neck',
          'A relaxing massage given by robots',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Inclinar a cabeça para baixo multiplica a força exercida sobre as vértebras cervicais.',
        en: 'Bending the head downward multiplies the mechanical load on cervical vertebrae.',
      },
    },
    {
      id: 'ergo-q10',
      question: {
        pt: 'Como deves segurar o telemóvel para proteger a tua postura?',
        en: 'How should you hold your phone to protect your posture?',
      },
      options: {
        pt: [
          'Elevar os braços para que o ecrã fique à altura dos olhos, sem baixar a cabeça',
          'Pousá-lo no joelho e dobrar o pescoço a 90 graus',
          'Segurá-lo deitado de lado no chão',
          'Apertá-lo entre a orelha e o ombro enquanto escreves',
        ],
        en: [
          'Bring the device up towards eye level instead of bending your neck down',
          'Rest it on your knee and bend your neck down 90 degrees',
          'Hold it while lying sideways on the floor',
          'Clamp it between your ear and shoulder while typing',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Trazer o telemóvel até aos olhos mantém o pescoço direito e relaxado.',
        en: 'Bringing the phone up to your eyes keeps your cervical spine neutral and relaxed.',
      },
    },
    {
      id: 'ergo-q11',
      question: {
        pt: 'Qual é a posição correta dos pulsos enquanto utilizas o teclado e o rato?',
        en: 'What is the correct wrist position when using keyboard and mouse?',
      },
      options: {
        pt: [
          'Direitos e alinhados com os antebraços, sem dobras forçadas para cima ou para baixo',
          'Derrubados e dobrados para trás em ângulo reto',
          'Torcidos de lado a forçar as articulações',
          'Apertados com elásticos rígidos',
        ],
        en: [
          'Straight and aligned with forearms, without forced upward or downward bends',
          'Bent backward at sharp right angles',
          'Twisted sideways straining joints',
          'Tied with tight elastic bands',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter os pulsos direitos numa linha contínua com os antebraços evita inflamações (tendinites).',
        en: 'Keeping wrists straight aligned with forearms prevents tendon inflammation.',
      },
    },
    {
      id: 'ergo-q12',
      question: {
        pt: 'O que deves fazer com frequência aos teus olhos durante o trabalho ao computador?',
        en: 'What should you do frequently with your eyes while working at a computer?',
      },
      options: {
        pt: [
          'Pestanejar conscientemente e olhar para longe pela janela para lubrificar a vista',
          'Manter os olhos o mais abertos possível durante 10 minutos sem pestanejar',
          'Esfregar com força os olhos com as mãos sujas',
          'Aproximar o rosto a 2 cm do ecrã',
        ],
        en: [
          'Blink intentionally and look into the distance to keep eyes moist',
          'Keep eyes wide open for 10 minutes without blinking',
          'Rub eyes vigorously with unwashed hands',
          'Bring your face 2 cm away from the screen',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Pestanejar espalha a lágrima natural e olhar para longe relaxa o músculo de focagem.',
        en: 'Blinking spreads tear film and looking into the distance relaxes the focusing muscle.',
      },
    },
    {
      id: 'ergo-q13',
      question: {
        pt: 'Como deve ser a cadeira ideal para estudar ao computador?',
        en: 'What should an ideal study chair look like?',
      },
      options: {
        pt: [
          'Com altura regulável, encosto ergonómico com apoio lombar e assento estável',
          'Um banco de madeira rígido sem encosto nem regulação',
          'Um sofá muito mole onde o corpo afunda e fica todo curvado',
          'Um banquinho com apenas duas pernas instáveis',
        ],
        en: [
          'Adjustable height, ergonomic backrest with lumbar support, and stable base',
          'A rigid wooden backless stool',
          'A deep sinking couch where you hunch and sink',
          'An unstable two-legged stool',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Uma cadeira regulável com apoio lombar permite ajustar a altura aos joelhos e proteger as costas.',
        en: 'An adjustable chair with lumbar contour accommodates height and protects the spine.',
      },
    },
    {
      id: 'ergo-q14',
      question: {
        pt: 'O que deves fazer a cada 45 a 60 minutos de estudo ao computador?',
        en: 'What should you do every 45 to 60 minutes of studying on a computer?',
      },
      options: {
        pt: [
          'Fazer uma pausa de 3 a 5 minutos, levantar, esticar o corpo e beber água',
          'Continuar mais 4 horas sem sair do lugar',
          'Aumentar o brilho do monitor para o máximo e comer chocolates',
          'Desligar as luzes todas e ficar no escuro',
        ],
        en: [
          'Take a 3-5 minute break, stand up, stretch your body, and drink water',
          'Keep going for 4 more hours without moving',
          'Turn screen brightness to max and eat chocolates',
          'Turn off all lights and sit in the dark',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Levantar e caminhar durante alguns minutos estimula a circulação e reoxigena o cérebro.',
        en: 'Standing and walking for a few minutes reactivates circulation and reoxygenates the brain.',
      },
    },
    {
      id: 'ergo-q15',
      question: {
        pt: 'Qual destas frases sobre a secretária de estudo é VERDADEIRA?',
        en: 'Which statement about the study desk is TRUE?',
      },
      options: {
        pt: [
          'A mesa deve ter espaço livre suficiente para apoiar confortavelmente os antebraços e os cadernos',
          'A mesa deve estar coberta de pratos de comida e garrafas em cima do teclado',
          'A mesa deve ser tão alta que tenhas de levantar os braços acima dos ombros',
          'O ecrã deve ficar encostado à beira da mesa para bater no teu peito',
        ],
        en: [
          'The desk should have clear space to comfortably rest forearms and notebooks',
          'The desk should be littered with food plates and bottles on top of the keyboard',
          'The desk should be so high that your arms are raised above your shoulders',
          'The monitor should touch the front edge bumping into your chest',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Ter espaço livre permite apoiar os antebraços e utilizar o rato com movimentos naturais.',
        en: 'Adequate desktop clearance allows forearm support and smooth, natural mouse movements.',
      },
    },
    {
      id: 'ergo-q16',
      question: {
        pt: 'Se sentires dores frequentes no pescoço ou nas costas após usar o computador, o que deves fazer?',
        en: 'If you frequently experience neck or back pain after computer use, what should you do?',
      },
      options: {
        pt: [
          'Falar com os teus pais ou professor para rever e corrigir a postura e a regulação da cadeira e ecrã',
          'Ignorar a dor e passar o dobro do tempo a jogar',
          'Tomar comprimidos sem autorização médica e continuar torto',
          'Deixar de fazer os trabalhos da escola para sempre',
        ],
        en: [
          'Talk to parents or teachers to audit posture and adjust chair and screen ergonomics',
          'Ignore the pain and double your gaming time',
          'Take medications without medical guidance and keep slouching',
          'Stop doing homework forever',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A dor é um sinal de alerta do corpo. Conversar com um adulto permite ajustar a secretária e a postura.',
        en: 'Pain is the body’s warning signal. Reviewing workstation setup with an adult prevents chronic issues.',
      },
    },
  ],
};
