import { ThemeDefinition } from '../types';

export const themeErgonomiaData: ThemeDefinition = {
  id: 'ergonomia',
  number: 3,
  title: {
    pt: 'Ergonomia',
    en: 'Ergonomics',
  },
  tagline: {
    pt: 'Aprende a utilizar dispositivos eletrónicos de forma correta, confortável e segura.',
    en: 'Learn to use electronic devices correctly, comfortably, and safely.',
  },
  intro: {
    pt: 'Passar tempo ao computador ou com o telemóvel não tem de causar desconforto nas costas ou nos olhos! A ergonomia estuda a melhor forma de adaptar a secretária, a cadeira, o ecrã e a postura ao nosso corpo, ajudando a manter o conforto e o bem-estar.',
    en: 'Working on a computer or phone shouldn’t cause back or eye strain! Ergonomics explores how to adapt your desk, chair, screen, and posture to your body for comfort and well-being.',
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
        pt: 'Para manter o corpo saudável e sem cansaço enquanto estudas ao computador:<ul><li><strong>Ombros:</strong> relaxados e descontraídos.</li><li><strong>Costas:</strong> direitas, com a parte inferior bem apoiada na cadeira.</li><li><strong>Cotovelos e pulsos:</strong> Os cotovelos devem ficar aproximadamente a 90°. Os pulsos devem permanecer direitos e alinhados com os antebraços.</li><li><strong>Ecrã:</strong> topo do ecrã ao nível dos olhos (ou ligeiramente abaixo) e a 45–70 cm de distância.</li><li><strong>Pernas e joelhos:</strong> As pernas e os joelhos devem ficar, aproximadamente, num ângulo de 90°, numa posição confortável, com os pés bem assentes no chão ou num apoio de pés.</li><li><strong>Espaço:</strong> área por baixo da secretária desobstruída para esticar confortavelmente as pernas.</li></ul>',
        en: 'To keep your body healthy and strain-free while working at the computer:<ul><li><strong>Shoulders:</strong> relaxed and dropped.</li><li><strong>Back:</strong> straight, with lower back firmly supported by the chair.</li><li><strong>Elbows & wrists:</strong> Elbows should be bent at approximately 90°. Wrists should remain straight and aligned with the forearms.</li><li><strong>Screen:</strong> top of monitor at eye level (or slightly below) and 45–70 cm away.</li><li><strong>Legs & knees:</strong> Legs and knees should be bent at approximately a 90° angle, in a comfortable position with feet flat on the floor or footrest.</li><li><strong>Space:</strong> clear space under the desk to move your legs comfortably.</li></ul>',
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
      h: { pt: 'Pausas Ativas e Descanso Visual', en: 'Active Breaks and Visual Rest' },
      body: {
        pt: 'Ficar sentado e imóvel durante muito tempo prejudica o corpo e a visão. É importante separar dois conceitos: as <strong>Pausas Ativas</strong> (a cada 45–60 minutos, levantar, mexer o corpo, esticar suavemente os braços e as pernas e bebe água) e a <strong>Regra 20-20-20</strong> (a cada 20 minutos de ecrã, olhar durante 20 segundos para algo distante a cerca de 6 metros para descansar a visão).',
        en: 'Sitting motionless for long periods harms your body and eyesight. It is important to separate two concepts: <strong>Active Breaks</strong> (every 45–60 minutes, stand up, move your body, gently stretch arms and legs, and drink water) and the <strong>20-20-20 Rule</strong> (every 20 minutes on screen, look for 20 seconds at a distant object about 20 feet/6 meters away to rest your eyes).',
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
        pt: 'Ângulos aproximados de 90° para cotovelos e joelhos numa posição confortável, costas direitas e pés no chão.',
        en: 'Approximate 90° angles for elbows and knees in a comfortable position, straight spine, and flat feet.',
      },
      icon: '🧘',
      explanation: {
        pt: [
          'A postura corporal enquanto estudamos no computador é essencial para evitar o cansaço muscular e desconforto na coluna.',
          'Costas: devem estar direitas e bem encostadas ao encosto da cadeira, com apoio para a zona lombar (fundo das costas).',
          'Cotovelos e Pulsos: Os cotovelos devem ficar aproximadamente a 90°. Os pulsos devem permanecer direitos e alinhados com os antebraços.',
          'Pernas e Joelhos: As pernas e os joelhos devem ficar, aproximadamente, num ângulo de 90°, numa posição confortável, com os pés bem assentes no chão ou num apoio de pés.',
        ],
        en: [
          'Proper posture when studying at a computer helps prevent muscle strain and back discomfort.',
          'Back: straight and resting firmly against the chair backrest, with lower back lumbar support.',
          'Elbows & Wrists: Elbows should be bent at approximately 90°. Wrists should remain straight and aligned with the forearms.',
          'Legs & Knees: Legs and knees should be at approximately a 90° angle, in a comfortable position, with both feet flat on the floor or footrest.',
        ],
      },
      example: {
        title: {
          pt: 'O caso da Rita e o desconforto no pescoço',
          en: 'Rita and neck discomfort',
        },
        scenario: {
          pt: 'A Rita sentava-se na ponta da cadeira com as costas curvadas como um caracol para olhar para o computador portátil. Ao fim de meia hora, ficava com dores no pescoço.',
          en: 'Rita used to slouch on the edge of her chair like a snail to look down at her laptop. After 30 minutes, her neck was hurting.',
        },
        tip: {
          pt: 'A Rita ajustou a cadeira para encostar bem as costas e elevou o portátil com um suporte de livros para o topo do ecrã ficar à altura dos seus olhos. A posição ficou mais confortável e pode ajudar a reduzir o desconforto.',
          en: 'Rita adjusted her chair to support her back and elevated her laptop with a stand so the top edge aligned with her eyes. The position became more comfortable and can help reduce discomfort.',
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
          pt: 'Pensa no alinhamento do corpo e numa posição confortável para as pernas e as costas.',
          en: 'Think about body alignment and maintaining a comfortable posture for legs and back.',
        },
        reflection: {
          pt: 'Cruzar as pernas ou sentar sobre um pé durante muito tempo pode deixar o corpo numa posição assimétrica e causar desconforto. É preferível manter os pés apoiados e mudar de posição regularmente.',
          en: 'Crossing legs twists the pelvis and spine while causing discomfort. It is best to keep feet flat and change positions regularly.',
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
            pt: 'A distância de um braço esticado (cerca de 50 a 70 cm) é a forma mais simples de verificar se estás bem posicionado.',
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
        pt: 'Pausas Ativas e Descanso Visual (Regra 20-20-20)',
        en: 'Active Breaks and Visual Rest (20-20-20 Rule)',
      },
      shortDesc: {
        pt: 'Diferença entre pausas corporais ativas e descanso visual.',
        en: 'Difference between active physical breaks and eye rest.',
      },
      icon: '⏱️',
      explanation: {
        pt: [
          'O estudo ao computador exige dois tipos de cuidados diferentes: as pausas corporais ativas e o descanso da visão.',
          'Pausas Ativas (Corporais): a cada 45 a 60 minutos, faz uma pausa ativa: levanta-te, mexe o corpo, estica suavemente os braços e as pernas e bebe água.',
          'Regra 20-20-20 (Descanso Visual): durante o trabalho com ecrãs, a cada 20 minutos, olha para algo distante (a cerca de 6 metros / 20 pés) durante 20 segundos para relaxar a visão.',
          'Exercício do Pescoço: roda suavemente a cabeça para a esquerda e para a direita, e inclina a orelha em direção ao ombro devagar.',
          'Exercício dos Pulsos: estica os braços para a frente e movimenta suavemente os pulsos para cima e para baixo, sem forçar.',
        ],
        en: [
          'Studying at a computer requires two distinct habits: active body breaks and eye rest.',
          'Active Breaks (Physical): every 45–60 minutes, take an active break: stand up, move your body, gently stretch arms and legs, and drink water.',
          '20-20-20 Rule (Visual Rest): during screen work, every 20 minutes look at something distant (about 20 feet / 6 meters away) for 20 seconds to relax your eyes.',
          'Neck Stretches: gently turn your head left and right, tilting ears toward shoulders.',
          'Wrist Stretches: extend arms and gently bend wrists up and down.',
        ],
      },
      example: {
        title: {
          pt: 'O alarme de pausas do Diogo',
          en: 'Diogo’s break timer',
        },
        scenario: {
          pt: 'O Diogo colocou um alarme no relógio para tocar a cada 50 minutos enquanto estuda. Quando o alarme toca, levanta-se, mexe o corpo, estica suavemente os braços e as pernas e bebe água.',
          en: 'Diogo set a 50-minute timer while studying. When it rings, he stands up, moves his body, gently stretches his arms and legs, and drinks water.',
        },
        tip: {
          pt: 'As pausas ativas relaxam os músculos e a regra 20-20-20 descansa a visão. Praticar ambas ajuda a estudar com conforto!',
          en: 'Active breaks relax your muscles and the 20-20-20 rule rests your eyesight. Practicing both keeps study sessions comfortable!',
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
          pt: 'Os polegares (pelo movimento repetitivo), os pulsos e a nuca vão ficar doridos e tensos. Fazer pausas regulares pode ajudar a reduzir o desconforto e a fadiga.',
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
            pt: 'Fazer pausas regulares ajuda a descansar o corpo e a manter a concentração.',
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
              e: 'O topo do monitor ao nível dos olhos permite que o pescoço e a cabeça fiquem numa posição natural e confortável.'
            },
            {
              s: 'Trabalhar num quarto completamente às escuras, com apenas o brilho do monitor aceso, é uma boa ideia porque evita distrações.',
              a: false,
              e: 'O contraste excessivo entre o ecrã muito brilhante e o ambiente escuro cansa a visão e pode causar desconforto.'
            },
            {
              s: 'Ao escrever no teclado e utilizar o rato, os pulsos devem ficar direitos e alinhados numa linha contínua com os antebraços.',
              a: true,
              e: 'Manter os pulsos direitos e alinhados ajuda a escrever com conforto e reduz o esforço nos pulsos e nas mãos.'
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
              e: 'Um apoio de pés permite manter os joelhos num ângulo confortável e a coluna bem apoiada no encosto.'
            },
            {
              q: 'O Tomás senta-se tão perto do monitor que quase consegue tocar-lhe com o nariz enquanto estuda e joga. Qual é a recomendação mais adequada?',
              opts: [
                'Aproximar-se ainda mais e usar óculos de sol dentro de casa',
                'Afastar o ecrã para cerca de um braço esticado de distância (cerca de 50 a 70 cm)',
                'Manter o monitor encostado ao teclado e inclinar a cabeça para trás',
                'Tocar no ecrã continuamente para medir a temperatura do vidro'
              ],
              c: 1,
              e: 'Boa escolha! A distância aproximada de um braço esticado protege a vista do cansaço e permite ver todo o conteúdo com nitidez.'
            },
            {
              q: 'Ao escrever no teclado, a Inês apoia a base das palmas no bordo afiado da mesa e dobra os pulsos muito para cima. O que pode fazer para melhorar?',
              opts: [
                'Escrever apenas com uma mão e manter a outra dobrada atrás das costas',
                'Dobrar os pulsos ainda mais para cima para pressionar as teclas com mais força',
                'Manter os pulsos direitos e alinhados com os antebraços, com espaço livre na secretária',
                'Apoiar todo o peso do peito sobre o teclado enquanto escreve'
              ],
              c: 2,
              e: 'Exato! Pulsos direitos e alinhados numa linha reta reduzem a tensão nas articulações ao digitar.'
            },
            {
              q: 'O sol da tarde está a bater na janela atrás das costas do Pedro, criando um reflexo muito brilhante no monitor que não o deixa ler. O que deve fazer?',
              opts: [
                'Apagar todas as luzes da sala e trabalhar no escuro total',
                'Ajustar a cortina ou mudar a orientação do monitor para que a luz venha de lado',
                'Aumentar o brilho do monitor no máximo e colar a cara ao vidro',
                'Trabalhar de olhos semicerrados forçando a visão'
              ],
              c: 1,
              e: 'Boa decisão! A luz natural deve vir de lado para iluminar o espaço sem provocar reflexos diretos no monitor.'
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
            { left: 'Mais de 45 a 60 minutos seguidos ao computador', right: 'Fazer uma pausa ativa de 3 a 5 min para esticar o corpo' }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema2',
      themeId: 'ergonomia',
      number: 4,
      title: { pt: '🏆 Quiz de Aprendizagem: Ergonomia (10 Questões)', en: '🏆 Learning Quiz: Ergonomics (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas sobre o Tema 3 (Ergonomia).', en: 'Comprehensive final assessment with 10 questions on Topic 3 (Ergonomics).' },
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
        pt: 'Para que serve a ergonomia?',
        en: 'What is ergonomics for?',
      },
      options: {
        pt: [
          'Para tornar os computadores mais rápidos',
          'Para utilizar o computador de forma confortável e proteger a nossa saúde',
          'Para aprender a criar jogos',
          'Para aumentar o espaço de armazenamento',
        ],
        en: [
          'To make computers faster',
          'To use the computer comfortably and protect our health',
          'To learn how to create games',
          'To increase storage space',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'A ergonomia estuda a adaptação do ambiente e dos equipamentos ao nosso corpo, garantindo conforto e protegendo a nossa saúde.',
        en: 'Ergonomics studies how to adapt the environment and tools to our body, ensuring comfort and protecting our health.',
      },
    },
    {
      id: 'ergo-q2',
      question: {
        pt: 'Qual destas posições é mais adequada para trabalhar ao computador?',
        en: 'Which of these positions is most suitable for working at the computer?',
      },
      options: {
        pt: [
          'Costas apoiadas, ombros descontraídos e pés assentes no chão',
          'Costas inclinadas para a frente e cabeça muito próxima do ecrã',
          'Corpo inclinado para um dos lados',
          'Costas afastadas do encosto e pernas cruzadas',
        ],
        en: [
          'Back supported, relaxed shoulders, and feet flat on the floor',
          'Back leaning forward and head very close to the screen',
          'Body tilted to one side',
          'Back away from the backrest and legs crossed',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter a coluna bem apoiada no encosto, os ombros relaxados e os pés assentes no chão garante uma postura correta e saudável.',
        en: 'Keeping the back supported by the backrest, shoulders relaxed, and feet flat on the floor ensures a correct and healthy posture.',
      },
    },
    {
      id: 'ergo-q3',
      question: {
        pt: 'Ao utilizar o teclado, os cotovelos devem ficar, aproximadamente:',
        en: 'When using the keyboard, elbows should be positioned approximately:',
      },
      options: {
        pt: [
          'Completamente esticados',
          'Muito acima da mesa',
          'Dobrados num ângulo próximo dos 90°',
          'Encostados ao peito',
        ],
        en: [
          'Completely straight',
          'Far above the desk',
          'Bent at an angle close to 90°',
          'Pressed against the chest',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Os cotovelos fletidos num ângulo próximo de 90° mantêm os braços e os ombros relaxados durante a escrita.',
        en: 'Elbows bent at an angle close to 90° keep arms and shoulders relaxed while typing.',
      },
    },
    {
      id: 'ergo-q4',
      question: {
        pt: 'Qual é a melhor solução quando os pés não chegam ao chão depois de ajustar a cadeira à altura da mesa?',
        en: 'What is the best solution when your feet do not reach the floor after adjusting the chair to the desk height?',
      },
      options: {
        pt: [
          'Cruzar as pernas',
          'Utilizar um apoio de pés estável',
          'Sentar-se mais para a frente da cadeira',
          'Deixar os pés suspensos',
        ],
        en: [
          'Crossing legs',
          'Using a stable footrest',
          'Sitting further forward on the chair',
          'Leaving feet suspended',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Um apoio de pés estável permite manter os pés bem assentes e a bacia e coluna devidamente alinhadas.',
        en: 'A stable footrest allows feet to rest firmly and keeps pelvis and spine properly aligned.',
      },
    },
    {
      id: 'ergo-q5',
      question: {
        pt: 'Qual destas características é importante numa cadeira de estudo?',
        en: 'Which of these features is important in a study chair?',
      },
      options: {
        pt: [
          'Ter altura regulável e um bom apoio para as costas',
          'Ser muito baixa e não ter encosto',
          'Ser o mais macia possível, mesmo que não tenha apoio',
          'Ter rodas que permitam deslizar facilmente pela sala',
        ],
        en: [
          'Having adjustable height and good back support',
          'Being very low and having no backrest',
          'Being as soft as possible, even without support',
          'Having wheels to slide easily across the room',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A cadeira de estudo deve permitir ajustar a altura ao utilizador e oferecer um apoio firme e confortável para as costas.',
        en: 'A study chair must allow adjusting height to the user and offer firm, comfortable back support.',
      },
    },
    {
      id: 'ergo-q6',
      question: {
        pt: 'Para evitar inclinar demasiado a cabeça, o monitor deve ficar:',
        en: 'To avoid tilting the head too much, the monitor should be positioned:',
      },
      options: {
        pt: [
          'Muito abaixo da altura dos olhos',
          'Aproximadamente ao nível dos olhos ou ligeiramente abaixo',
          'Ao nível dos joelhos',
          'Muito acima da cabeça',
        ],
        en: [
          'Far below eye level',
          'Approximately at eye level or slightly below',
          'At knee level',
          'Far above head level',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Colocar o monitor ao nível dos olhos ou ligeiramente abaixo permite olhar em frente de forma natural sem sobrecarregar o pescoço.',
        en: 'Positioning the monitor at eye level or slightly below allows looking forward naturally without straining the neck.',
      },
    },
    {
      id: 'ergo-q7',
      question: {
        pt: 'Qual destas distâncias é mais adequada entre os olhos e o monitor?',
        en: 'Which of these distances is most suitable between eyes and monitor?',
      },
      options: {
        pt: [
          'Cerca de 10 cm',
          'Cerca de 20 cm',
          'Aproximadamente a distância de um braço esticado',
          'Mais de 2 metros',
        ],
        en: [
          'About 10 cm',
          'About 20 cm',
          'Approximately an arm’s length distance',
          'More than 2 meters',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'A distância de um braço esticado (cerca de 50 a 70 cm) é a ideal para ler confortavelmente sem forçar a visão.',
        en: 'An arm’s length distance (about 50 to 70 cm) is ideal for comfortable reading without eye strain.',
      },
    },
    {
      id: 'ergo-q8',
      question: {
        pt: 'Os pulsos devem estar, de preferência:',
        en: 'Wrists should preferably be:',
      },
      options: {
        pt: [
          'Dobrados para trás enquanto se escreve',
          'Alinhados com os antebraços',
          'Inclinados para os lados',
          'Levantados acima do teclado',
        ],
        en: [
          'Bent backward while typing',
          'Aligned with the forearms',
          'Tilted sideways',
          'Raised high above the keyboard',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Manter os pulsos direitos e alinhados com os antebraços evita posições forçadas e protege as articulações das mãos.',
        en: 'Keeping wrists straight and aligned with forearms prevents forced postures and protects hand joints.',
      },
    },
    {
      id: 'ergo-q9',
      question: {
        pt: 'Se houver reflexos da janela no ecrã, qual é a melhor solução?',
        en: 'If there is window glare on the screen, what is the best solution?',
      },
      options: {
        pt: [
          'Aumentar o brilho do monitor para o máximo',
          'Aproximar os olhos do ecrã',
          'Ajustar a posição do monitor ou da mesa e controlar a entrada de luz',
          'Estudar no escuro',
        ],
        en: [
          'Turn monitor brightness to maximum',
          'Bring eyes closer to the screen',
          'Adjust the monitor or desk position and control light entry',
          'Study in the dark',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Ajustar a orientação do monitor/mesa e controlar a entrada de luz com persianas ou cortinas evita encandeamentos e reflexos.',
        en: 'Adjusting screen/desk position and managing light with curtains or blinds eliminates glare and reflections.',
      },
    },
    {
      id: 'ergo-q10',
      question: {
        pt: 'Depois de estar bastante tempo ao computador, o que é importante fazer?',
        en: 'After spending a long time at the computer, what is important to do?',
      },
      options: {
        pt: [
          'Continuar sem parar enquanto houver trabalho para fazer',
          'Fazer pausas, levantar-se, mexer o corpo e descansar os olhos',
          'Aumentar o brilho do ecrã',
          'Aproximar a cadeira do computador',
        ],
        en: [
          'Keep going without stopping as long as there is work to do',
          'Take breaks, stand up, move your body, and rest your eyes',
          'Increase screen brightness',
          'Move the chair closer to the computer',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Fazer pausas ativas, levantar-se, esticar os músculos e descansar os olhos olhando para longe é fundamental para a saúde.',
        en: 'Taking active breaks, standing up, stretching muscles, and resting eyes by looking into the distance is essential for health.',
      },
    },
  ],
};
