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
      eyebrow: { pt: 'Iluminação', en: 'Lighting' },
      h: { pt: 'A iluminação também conta', en: 'Lighting matters too' },
      body: {
        pt: 'Uma sala com boa iluminação, sem reflexos fortes no ecrã, ajuda a proteger os olhos e evita dores de cabeça. Evita trabalhar num quarto totalmente escuro apenas com a luz do ecrã.',
        en: 'A well-lit room without harsh glare on your screen protects your eyesight and prevents headaches. Avoid working in a pitch-black room illuminated only by the display screen.',
      },
      icon: '💡',
    },
    {
      eyebrow: { pt: 'As Pausas', en: 'The Breaks' },
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
            pt: 'Como podes verificar rapidamente se estás à distância correta do monitor?',
            en: 'How can you quickly check if you are at the correct distance from the monitor?',
          },
          options: {
            pt: [
              'Esticar o braço para a frente: o ecrã deve ficar à distância de um braço esticado',
              'Encostar a cabeça à secretária e olhar para cima',
              'Aproximar o rosto até tocar com o queixo no ecrã',
              'Afastar a cadeira até não conseguir ler o texto',
            ],
            en: [
              'Stretch your arm forward: the screen should be about an arm’s length away',
              'Rest your head on the desk and look upward',
              'Bring your face forward until your chin touches the screen',
              'Push your chair back until you cannot read the text',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! A distância de um braço esticado (cerca de 50 a 70 cm) é a forma mais simples de verificar se estás bem posicionado.',
            en: 'Excellent! An arm’s length (about 50 to 70 cm) is the easiest way to ensure proper viewing distance.',
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
          'O corpo precisa de movimento e de pausas, por isso não é aconselhável permanecer sentado na mesma posição durante muito tempo.',
          'Pausas Periódicas: a cada 45 a 60 minutos, levanta-te da cadeira durante 5 minutos para esticar as pernas, beber um copo de água e mover os braços.',
          'Exercício do Pescoço: roda suavemente a cabeça para a esquerda e para a direita, e inclina a orelha em direção ao ombro devagar.',
          'Exercício dos Pulsos: estica os braços para a frente e movimenta suavemente os pulsos para cima e para baixo, sem forçar.',
          'Regra 20-20-20: é uma estratégia para fazer pausas e reduzir o esforço visual durante períodos prolongados diante de um ecrã (olhar para longe durante 20 segundos a cada 20 minutos).',
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
              'Apenas quando os olhos ou o pescoço começarem a doer intensamente',
              'De 15 em 15 segundos para mudar a janela do navegador',
              'Apenas no final do dia depois de terminar todas as tarefas',
            ],
            en: [
              'Every 45 to 60 minutes, stand up for 5 minutes to stretch',
              'Only when your eyes or neck begin to hurt intensely',
              'Every 15 seconds to switch browser windows',
              'Only at the end of the day after completing all tasks',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! Fazer pausas regulares ajuda a descansar o corpo e a manter a concentração.',
            en: 'Correct! Taking regular breaks helps rest the body and maintain focus.',
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
      title: { pt: '🪑 Postura e Hábitos: Verdadeiro ou Falso?', en: '🪑 Posture and Habits: True or False?' },
      shortDesc: { pt: 'Avalia afirmações práticas sobre a organização do espaço, postura e hábitos saudáveis ao computador.', en: 'Evaluate practical statements about workspace organization, posture, and healthy habits.' },
      icon: '🪑',
      durationMinutes: 4,
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Postura e Hábitos: Verdadeiro ou Falso?',
        icon: '🪑',
        xp: 100,
        desc: 'Analisa cada situação do dia a dia e decide se a atitude é ergonómica e saudável.',
        data: {
          items: [
            {
              s: 'Se os pés não chegarem ao chão quando a cadeira está ajustada à mesa, é melhor deixá-los pendurados no ar durante todo o tempo de estudo.',
              a: false,
              e: 'Pés sem apoio aumentam o cansaço nas pernas e na zona lombar. Deves usar um apoio de pés ou regular a cadeira.'
            },
            {
              s: 'Quando estás a trabalhar ao computador durante muito tempo, fazer pequenas pausas para levantar, esticar o corpo e descansar os olhos ajuda a manter a concentração.',
              a: true,
              e: 'Boa escolha! Pausas regulares de 3 a 5 minutos relaxam os músculos e previnem o cansaço visual e mental.'
            },
            {
              s: 'Se o monitor estiver demasiado baixo e tiveres de inclinar o pescoço para baixo, deves elevar o ecrã com um suporte firme até o topo ficar ao nível dos olhos.',
              a: true,
              e: 'Excelente! O topo do monitor ao nível dos olhos permite que o pescoço e a cabeça fiquem numa posição natural e confortável.'
            },
            {
              s: 'Trabalhar num quarto completamente às escuras, com apenas o brilho do monitor aceso, é uma boa ideia porque evita distrações.',
              a: false,
              e: 'O contraste excessivo entre o ecrã muito brilhante e o ambiente escuro força os olhos e pode provocar fadiga e dores de cabeça.'
            },
            {
              s: 'Ao escrever no teclado e utilizar o rato, os pulsos devem ficar direitos e alinhados numa linha contínua com os antebraços.',
              a: true,
              e: 'Correto! Manter os pulsos numa posição neutra e alinhada evita dobrar as articulações e reduz o esforço nos tendões.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-ergo-mc',
      themeId: 'ergonomia',
      number: 2,
      title: { pt: '🎯 Detetive da Ergonomia: O que Farias?', en: '🎯 Ergonomics Detective: What Would You Do?' },
      shortDesc: { pt: 'Resolve situações reais do dia a dia e escolhe a melhor decisão ergonómica para cada estudante.', en: 'Solve real everyday situations and pick the best ergonomic choice for each student.' },
      icon: '🎯',
      durationMinutes: 5,
      points: 100,
      type: 'what_would_you_do',
      gameData: {
        type: 'mc',
        title: 'Detetive da Ergonomia: O que Farias?',
        icon: '🎯',
        xp: 100,
        desc: 'Observa o problema de cada aluno e escolhe a solução mais adequada para melhorar o seu conforto.',
        data: {
          questions: [
            {
              q: 'O Miguel está sentado na secretária a fazer um trabalho de TIC. Como a cadeira foi subida para alcançar a mesa, os pés dele ficam pendurados no ar sem tocar no chão. O que deveria fazer?',
              opts: [
                'Colocar um apoio de pés (ou uma caixa firme) para manter os pés bem assentes e estáveis',
                'Cruzar as pernas por baixo da cadeira e continuar a trabalhar sem apoio',
                'Baixar a cadeira até ao chão, mesmo que os braços fiquem muito abaixo da mesa',
                'Sentar-se na ponta da cadeira com o corpo inclinado para a frente'
              ],
              c: 0,
              e: 'Excelente! Um apoio de pés permite manter os joelhos num ângulo confortável e a coluna bem apoiada no encosto.'
            },
            {
              q: 'A Ana está a usar o computador, mas o monitor está muito baixo. Para conseguir ler, ela passa o tempo todo com o queixo encostado ao peito e o pescoço inclinado. O que pode fazer?',
              opts: [
                'Elevar o monitor com um suporte até que o topo do ecrã fique ao nível dos olhos',
                'Baixar a cadeira até o queixo encostar à secretária',
                'Inclinar todo o tronco para a frente e aproximar a cara do ecrã',
                'Continuar na mesma posição e apenas aumentar o brilho do ecrã'
              ],
              c: 0,
              e: 'Muito bem! Elevar o monitor alinha o olhar na horizontal e evita forçar o pescoço para baixo.'
            },
            {
              q: 'O Tomás senta-se tão perto do monitor que quase consegue tocar-lhe com o nariz enquanto estuda e joga. Qual é a recomendação mais adequada?',
              opts: [
                'Afastar o ecrã para cerca de um braço esticado de distância (cerca de 50 a 70 cm)',
                'Aproximar-se ainda mais e usar óculos de sol dentro de casa',
                'Manter o monitor encostado ao teclado e inclinar a cabeça para trás',
                'Tocar no ecrã continuamente para medir a temperatura do vidro'
              ],
              c: 0,
              e: 'Boa escolha! A distância aproximada de um braço esticado protege a vista do cansaço e permite ver todo o conteúdo com nitidez.'
            },
            {
              q: 'Ao escrever no teclado, a Inês apoia a base das palmas no bordo afiado da mesa e dobra os pulsos muito para cima. O que pode fazer para melhorar?',
              opts: [
                'Manter os pulsos direitos e alinhados com os antebraços, com espaço livre na secretária',
                'Escrever apenas com uma mão e manter a outra dobrada atrás das costas',
                'Dobrar os pulsos ainda mais para cima para pressionar as teclas com mais força',
                'Apoiar todo o peso do peito sobre o teclado enquanto escreve'
              ],
              c: 0,
              e: 'Exato! Pulsos direitos e alinhados numa linha reta reduzem a tensão nas articulações ao digitar.'
            },
            {
              q: 'O sol da tarde está a bater na janela atrás das costas do Pedro, criando um reflexo muito brilhante no monitor que não o deixa ler. O que deve fazer?',
              opts: [
                'Ajustar a cortina ou mudar a orientação do monitor para que a luz venha de lado',
                'Apagar todas as luzes da sala e trabalhar no escuro total',
                'Aumentar o brilho do monitor no máximo e colar a cara ao vidro',
                'Trabalhar de olhos semicerrados forçando a visão'
              ],
              c: 0,
              e: 'Boa decisão! A luz natural deve vir de lado para iluminar o espaço sem provocar reflexos diretos no monitor.'
            },
            {
              q: 'A Leonor costuma estudar horas seguidas com o computador portátil deitado na cama de barriga para baixo. O que poderia fazer para um estudo mais confortável e saudável?',
              opts: [
                'Trabalhar numa secretária com cadeira adequada, mantendo o portátil elevado e com bom apoio',
                'Continuar na cama de barriga para baixo mas colocar uma almofada alta no queixo',
                'Pousar o portátil no tapete do chão e olhar para ele de pé',
                'Estudar deitada de lado a segurar o portátil com uma mão no ar'
              ],
              c: 0,
              e: 'Excelente! Estudar numa secretária com cadeira e mesa adequadas protege a coluna, pescoço e braços durante o estudo prolongado.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-ergo-match',
      themeId: 'ergonomia',
      number: 3,
      title: { pt: '🔗 Problema e Solução Ergonómica', en: '🔗 Ergonomic Problem and Solution' },
      shortDesc: { pt: 'Associa cada situação desconfortável à solução prática recomendada.', en: 'Match each uncomfortable situation to its recommended practical solution.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 100,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Problema e Solução Ergonómica',
        icon: '🔗',
        xp: 100,
        desc: 'Associa cada problema postural à sua melhor solução prática.',
        data: {
          pairs: [
            { left: 'Pés ficam pendurados sem apoio', right: 'Usar um apoio de pés ou regular a cadeira' },
            { left: 'Ecrã demasiado baixo a forçar o pescoço', right: 'Elevar o monitor até ao nível dos olhos' },
            { left: 'Sol no monitor a criar reflexos fortes', right: 'Ajustar a cortina e orientar a luz de lado' },
            { left: 'Pulsos muito dobrados a escrever no teclado', right: 'Manter mãos e pulsos alinhados com os braços' },
            { left: 'Mais de 40 minutos seguidos ao computador', right: 'Fazer uma pausa de 3 a 5 min para esticar o corpo' }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema2',
      themeId: 'ergonomia',
      number: 4,
      title: { pt: '🏆 Quiz de Aprendizagem: Ergonomia', en: '🏆 Learning Quiz: Ergonomics' },
      shortDesc: { pt: 'Avaliação final abrangente com 15 perguntas sobre o Tema 2.', en: 'Comprehensive final assessment with 15 questions on Topic 2.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 100,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'ergo-q1',
      question: {
        pt: 'O que estuda a Ergonomia no contexto da utilização dos computadores e tecnologias?',
        en: 'What does Ergonomics study in the context of computer and technology use?',
      },
      options: {
        pt: [
          'A organização do espaço, dos equipamentos e da nossa posição para trabalhar com conforto e saúde',
          'A velocidade com que os computadores conseguem descarregar ficheiros da Internet',
          'O preço dos monitores e teclados nas lojas de informática',
          'A programação de jogos digitais e aplicações para telemóvel',
        ],
        en: [
          'The organization of space, equipment, and our body posture to work comfortably and healthily',
          'The speed at which computers download files from the Internet',
          'The cost of monitors and keyboards in electronics stores',
          'The programming of digital games and mobile applications',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A ergonomia estuda a melhor relação entre o nosso corpo e as ferramentas de trabalho para evitar desconforto e cansaço.',
        en: 'Ergonomics studies the optimal relationship between our body and workspace tools to prevent fatigue and strain.',
      },
    },
    {
      id: 'ergo-q2',
      question: {
        pt: 'Qual é a postura corporal mais adequada quando estás sentado a estudar ao computador?',
        en: 'What is the most appropriate body posture when seated studying at a computer?',
      },
      options: {
        pt: [
          'Costas direitas bem apoiadas no encosto da cadeira, ombros descontraídos e pés assentes',
          'Corpo inclinado para a frente com o peito encostado à borda da mesa',
          'Tronco escorregado na cadeira com a cabeça muito abaixo do nível da mesa',
          'Sentar em cima de uma perna dobrada com a coluna inclinada para o lado',
        ],
        en: [
          'Back straight and firmly supported by the chair backrest, relaxed shoulders, and feet flat',
          'Body leaning forward with chest pressed against the desk edge',
          'Torso sliding down the chair with head well below desk level',
          'Sitting on one folded leg with spine tilted sideways',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter as costas direitas e apoiadas, os ombros relaxados e os pés assentes garante uma posição estável e confortável.',
        en: 'Keeping back supported, shoulders relaxed, and feet flat ensures a stable and comfortable posture.',
      },
    },
    {
      id: 'ergo-q3',
      question: {
        pt: 'Que posição de referência devem manter os braços e cotovelos em relação à mesa de trabalho?',
        en: 'What reference position should arms and elbows maintain relative to the study desk?',
      },
      options: {
        pt: [
          'Cotovelos dobrados num ângulo confortável próximo de 90 graus, com os antebraços nivelados com a mesa',
          'Braços totalmente esticados para cima com os ombros levantados até às orelhas',
          'Cotovelos muito abaixo do nível da secretária tendo de puxar as mãos para cima',
          'Braços cruzados sobre o teclado enquanto tentas escrever com os dedos',
        ],
        en: [
          'Elbows bent at a comfortable angle close to 90 degrees, with forearms level with the desk',
          'Arms fully stretched upwards with shoulders raised up to the ears',
          'Elbows far below desk height forcing hands to reach upward',
          'Arms crossed over the keyboard while attempting to type with fingers',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter os cotovelos num ângulo próximo dos 90 graus permite apoiar os antebraços sem forçar os ombros.',
        en: 'Keeping elbows close to a 90-degree angle allows forearms to rest naturally without tensing shoulders.',
      },
    },
    {
      id: 'ergo-q4',
      question: {
        pt: 'O Miguel ajustou a cadeira para ficar à altura da mesa, mas os pés ficaram pendurados no ar. O que deve fazer?',
        en: 'Miguel adjusted his chair to desk height, but his feet are dangling in the air. What should he do?',
      },
      options: {
        pt: [
          'Utilizar um apoio de pés estável para que a planta dos pés fique bem apoiada',
          'Deixar os pés a balançar no ar durante as horas de trabalho',
          'Enrolar os pés à volta das rodas da cadeira para prender as pernas',
          'Baixar a cadeira até ao chão, mesmo que os braços fiquem numa posição desconfortável',
        ],
        en: [
          'Use a stable footrest so the soles of his feet rest firmly supported',
          'Leave feet swinging in the air throughout study hours',
          'Wrap feet around the chair wheels to lock the legs',
          'Lower the chair to the floor, even if arms end up in an uncomfortable position',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Um apoio de pés permite que os pés fiquem assentes, melhorando a estabilidade e o conforto das pernas e da zona lombar.',
        en: 'A footrest ensures feet remain supported, improving stability and comfort for legs and lumbar region.',
      },
    },
    {
      id: 'ergo-q5',
      question: {
        pt: 'Quais são as características mais importantes de uma cadeira adequada para estudar ao computador?',
        en: 'What are the most important features of a good study chair for computer work?',
      },
      options: {
        pt: [
          'Ter altura regulável, encosto com apoio para as costas e estabilidade no assento',
          'Ser um banco rígido sem encosto para obrigar o corpo a não descansar',
          'Ser um sofá tão mole que o corpo afunde completamente para dentro',
          'Ter um assento inclinado para a frente que faça o aluno escorregar',
        ],
        en: [
          'Adjustable height, supportive backrest for the spine, and a stable seat base',
          'A rigid backless stool forcing the body to stay unsupported',
          'A deep soft couch where the body sinks completely',
          'A forward-sloping seat causing the student to slide off',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Uma cadeira com altura regulável e apoio para as costas permite adaptar a posição à altura da mesa e do utilizador.',
        en: 'A chair with adjustable height and backrest adapts to the desk height and the student size.',
      },
    },
    {
      id: 'ergo-q6',
      question: {
        pt: 'A Ana reparou que o monitor está muito baixo e passa o tempo a dobrar o pescoço para baixo. Onde deve ficar o topo do ecrã?',
        en: 'Ana noticed her monitor is too low and she keeps bending her neck down. Where should the top of the screen be?',
      },
      options: {
        pt: [
          'Aproximadamente ao nível dos olhos (ou ligeiramente abaixo), para olhar em frente sem dobrar o pescoço',
          'Muito acima da linha da cabeça, obrigando a olhar sempre para o teto',
          'Pousado diretamente no tampo da mesa sem qualquer suporte',
          'Ao nível dos joelhos para ler enquanto olha para o chão',
        ],
        en: [
          'Approximately at eye level (or slightly below), allowing forward gaze without bending the neck',
          'Far above head level, forcing the user to constantly look up at the ceiling',
          'Resting directly flat on the desk with no elevation',
          'At knee level for reading while looking down at the floor',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O topo do ecrã ao nível dos olhos mantém o pescoço e a cabeça numa linha natural e confortável.',
        en: 'Positioning the top of the monitor at eye level keeps head and neck in a natural, neutral alignment.',
      },
    },
    {
      id: 'ergo-q7',
      question: {
        pt: 'Qual é a distância recomendada entre os teus olhos e o ecrã do monitor?',
        en: 'What is the recommended viewing distance between your eyes and the monitor?',
      },
      options: {
        pt: [
          'A distância aproximada de um braço esticado (cerca de 45 a 70 centímetros)',
          'Menos de 15 centímetros, quase a tocar com o nariz no vidro',
          'Mais de 2 metros de distância em qualquer tamanho de monitor',
          'A distância não tem qualquer importância para a saúde dos olhos',
        ],
        en: [
          'Approximately an arm’s length away (about 45 to 70 centimeters)',
          'Less than 15 centimeters, almost touching the glass with your nose',
          'More than 2 meters away regardless of monitor size',
          'Distance has no importance for eye health',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter a distância de um braço esticado (45 a 70 cm) permite ler sem esforço e protege a vista do cansaço excessivo.',
        en: 'Maintaining an arm’s length distance (45 to 70 cm) ensures effortless reading while protecting eyes from strain.',
      },
    },
    {
      id: 'ergo-q8',
      question: {
        pt: 'Como devem estar os pulsos e as mãos enquanto estás a escrever no teclado e a usar o rato?',
        en: 'How should wrists and hands be positioned while typing on the keyboard and using the mouse?',
      },
      options: {
        pt: [
          'Direitos e alinhados numa linha contínua com os antebraços, sem dobras forçadas',
          'Muito dobrados para trás em ângulo agudo contra a secretária',
          'Torcidos para os lados ao clicar nos botões do rato',
          'Apoiados no bordo afiado da mesa com os dedos a apontar para baixo',
        ],
        en: [
          'Straight and aligned in a continuous line with forearms, without forced bends',
          'Bent backward sharply against the desk surface',
          'Twisted sideways while clicking mouse buttons',
          'Resting on the sharp table edge with fingers pointing downwards',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter os pulsos direitos e alinhados com os braços previne a tensão muscular e protege as articulações.',
        en: 'Keeping wrists straight and aligned with arms prevents muscle strain and protects joints.',
      },
    },
    {
      id: 'ergo-q9',
      question: {
        pt: 'Qual destas afirmações sobre a organização da secretária de estudo é a mais adequada?',
        en: 'Which statement about study desk organization is the most appropriate?',
      },
      options: {
        pt: [
          'A secretária deve ter espaço livre para os cadernos e antebraços, e espaço desimpedido por baixo para as pernas',
          'A secretária deve estar cheia de caixas por baixo para não conseguires esticar as pernas',
          'O teclado deve ficar encostado à borda sem qualquer espaço de apoio para as mãos',
          'O monitor deve ficar colocado num canto distante onde seja preciso torcer o pescoço para ver',
        ],
        en: [
          'The desk should have clear space for notebooks and forearms, and open space underneath for legs',
          'The area under the desk should be packed with boxes so legs cannot move',
          'The keyboard should sit on the very edge leaving zero hand support space',
          'The monitor should sit in a far corner forcing the neck to twist sideways',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Uma secretária organizada e desimpedida permite movimentar os braços e as pernas com liberdade e conforto.',
        en: 'An organized, clutter-free desk allows arms and legs to move freely and comfortably.',
      },
    },
    {
      id: 'ergo-q10',
      question: {
        pt: 'O sol está a provocar um reflexo forte no ecrã do computador do Pedro. Qual é a melhor solução?',
        en: 'Sunlight is causing harsh glare on Pedro’s computer screen. What is the best solution?',
      },
      options: {
        pt: [
          'Ajustar a cortina da janela ou orientar o ecrã para que a luz natural venha de lado',
          'Apagar todas as lâmpadas e continuar a trabalhar no escuro absoluto',
          'Aumentar o brilho do monitor no máximo e colar o rosto ao ecrã',
          'Continuar a estudar sem fazer nada mesmo sem conseguir ler',
        ],
        en: [
          'Adjust the window curtain or reposition the screen so natural light comes from the side',
          'Turn off all lamps and continue working in total darkness',
          'Turn monitor brightness to maximum and glue face to the screen',
          'Continue studying without doing anything despite unreadable text',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A luz deve vir preferencialmente de lado, evitando reflexos diretos no monitor e protegendo a visão de encandeamentos.',
        en: 'Light should ideally come from the side, avoiding direct screen reflections and shielding eyes from glare.',
      },
    },
    {
      id: 'ergo-q11',
      question: {
        pt: 'Porque é que não devemos utilizar o computador num quarto totalmente às escuras apenas com o brilho do ecrã?',
        en: 'Why should we avoid using a computer in total darkness with only the screen light?',
      },
      options: {
        pt: [
          'Porque a diferença de luminosidade entre o ecrã brilhante e o quarto escuro causa grande cansaço visual',
          'Porque a bateria do computador descarrega duas vezes mais rápido no escuro',
          'Porque a câmara do computador desliga-se automaticamente sem luz ambiente',
          'Porque o teclado perde a cor das letras quando não há iluminação',
        ],
        en: [
          'Because the extreme contrast between the bright screen and the dark room causes intense visual strain',
          'Because the computer battery drains twice as fast in the dark',
          'Because the computer webcam automatically shuts off without ambient light',
          'Because key lettering fades away when there is no lighting',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O contraste excessivo entre o ecrã e o quarto escuro obriga os olhos a um esforço contínuo, podendo provocar cansaço e dores de cabeça.',
        en: 'High contrast between screen and dark surroundings strains the eyes continually, often causing fatigue and headaches.',
      },
    },
    {
      id: 'ergo-q12',
      question: {
        pt: 'Durante uma sessão prolongada de estudo ao computador, o que é recomendado fazer a cada 30 a 40 minutos?',
        en: 'During a prolonged study session on the computer, what is recommended every 30 to 40 minutes?',
      },
      options: {
        pt: [
          'Fazer uma pequena pausa de 3 a 5 minutos, levantar, esticar o corpo e olhar para longe para descansar os olhos',
          'Continuar a olhar fixamente para o ecrã sem pestanejar para terminar mais rápido',
          'Apenas trocar de mão no rato sem levantar da cadeira durante várias horas',
          'Reiniciar o computador para forçar o corpo a esperar sentado',
        ],
        en: [
          'Take a short 3 to 5 minute break, stand up, stretch the body, and look at a distant point to rest eyes',
          'Keep staring fixedly at the screen without blinking to finish faster',
          'Just switch hands on the mouse without leaving the chair for hours',
          'Reboot the computer to force yourself to wait seated',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Levantar e mexer o corpo estimula a circulação, relaxa os músculos e descansar os olhos olhando para longe previne a fadiga visual.',
        en: 'Standing up stimulates blood flow, relaxes muscles, and looking into the distance prevents ocular fatigue.',
      },
    },
    {
      id: 'ergo-q13',
      question: {
        pt: 'A Leonor precisa de usar o computador portátil durante várias horas para fazer um projeto escolar. O que pode ajudá-la?',
        en: 'Leonor needs to use her laptop for several hours on a school project. What can help her?',
      },
      options: {
        pt: [
          'Usar um suporte para elevar o ecrã à altura dos olhos e, se possível, ligar um teclado e rato externos',
          'Trabalhar deitada na cama de barriga para baixo com o portátil no chão',
          'Pousar o portátil nas pernas e dobrar a cabeça até encostar ao queixo',
          'Segurar o portátil no ar com uma só mão enquanto digita com a outra',
        ],
        en: [
          'Use a stand to raise the screen to eye level and, if possible, connect an external keyboard and mouse',
          'Work lying face down on the bed with the laptop on the floor',
          'Rest the laptop on her lap and bend her head until her chin touches her chest',
          'Hold the laptop in the air with one hand while typing with the other',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Elevar o portátil com um suporte e utilizar teclado e rato externos permite manter uma postura tão confortável como num computador de secretária.',
        en: 'Raising the laptop with a stand and using external peripherals maintains comfortable desk posture.',
      },
    },
    {
      id: 'ergo-q14',
      question: {
        pt: 'O Diogo passa muito tempo a olhar para o telemóvel com a cabeça inclinada para baixo ("Pescoço de Texto"). O que deve fazer?',
        en: 'Diogo spends a lot of time looking down at his smartphone ("Text Neck"). What should he do?',
      },
      options: {
        pt: [
          'Elevar o telemóvel até próximo do nível dos olhos para manter a cabeça e o pescoço direitos',
          'Inclinar ainda mais o pescoço para a frente para ficar mais perto do ecrã',
          'Pousar o telemóvel nos joelhos e dobrar as costas completamente',
          'Apertar o telemóvel entre o ombro e a orelha enquanto envia mensagens',
        ],
        en: [
          'Bring the phone up closer to eye level to keep head and neck straight',
          'Tilt the neck even further forward to get closer to the display',
          'Rest the phone on his knees and bend his back completely',
          'Clamp the phone between shoulder and ear while sending messages',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Trazer o telemóvel até à altura dos olhos evita que o peso da cabeça sobrecarregue os músculos do pescoço.',
        en: 'Bringing the phone up to eye level prevents head weight from straining neck muscles.',
      },
    },
    {
      id: 'ergo-q15',
      question: {
        pt: 'O Pedro tem a cadeira muito alta com os pés pendurados, o ecrã pousado muito baixo e está há 2 horas sem se levantar. Qual é o plano de correção ergonómica mais completo?',
        en: 'Pedro has his chair too high with dangling feet, the monitor placed too low, and has sat for 2 hours without moving. What is the most complete ergonomic fix plan?',
      },
      options: {
        pt: [
          'Colocar um apoio de pés, elevar o monitor com um suporte e fazer uma pausa para levantar e esticar o corpo',
          'Desligar o computador imediatamente e nunca mais fazer trabalhos escolares',
          'Apenas trocar de cadeira sem alterar a altura do ecrã nem apoiar os pés',
          'Continuar na mesma posição até terminar o trabalho e só descansar no dia seguinte',
        ],
        en: [
          'Place a footrest, raise the monitor with a stand, and take an active break to stand and stretch',
          'Shut down the computer permanently and never do schoolwork again',
          'Just swap chairs without adjusting screen height or supporting feet',
          'Stay in the same posture until work is finished and only rest the next day',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Excelente! Resolver em conjunto o apoio dos pés, a altura do ecrã e realizar pausas ativas garante um ambiente de estudo verdadeiramente saudável e ergonómico.',
        en: 'Excellent! Addressing foot support, screen height, and taking active breaks together creates a truly healthy and ergonomic study environment.',
      },
    },
  ],
};
