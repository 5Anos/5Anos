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
          pt: 'Pensa na circulação do sangue e no alinhamento da bacia e da coluna.',
          en: 'Think about blood circulation and pelvis alignment.',
        },
        reflection: {
          pt: 'Cruzar as pernas ou sentar sobre um pé durante muito tempo pode deixar o corpo numa posição assimétrica e causar desconforto. É preferível manter os pés apoiados e mudar de posição regularmente.',
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
              e: 'O contraste excessivo entre o ecrã muito brilhante e o ambiente escuro força os olhos e pode provocar fadiga e dores de cabeça.'
            },
            {
              s: 'Ao escrever no teclado e utilizar o rato, os pulsos devem ficar direitos e alinhados numa linha contínua com os antebraços.',
              a: true,
              e: 'Manter os pulsos numa posição neutra e alinhada evita dobrar as articulações e reduz o esforço nos tendões.'
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
            { left: 'Mais de 40 minutos seguidos ao computador', right: 'Fazer uma pausa de 3 a 5 min para esticar o corpo' }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema2',
      themeId: 'ergonomia',
      number: 4,
      title: { pt: '🏆 Quiz de Aprendizagem: Ergonomia (10 Questões)', en: '🏆 Learning Quiz: Ergonomics (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas sobre o Tema 2.', en: 'Comprehensive final assessment with 10 questions on Topic 2.' },
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
        pt: 'A professora de TIC perguntou à turma qual é o principal objetivo de praticar a Ergonomia quando estudamos ao computador. Qual foi a melhor resposta do Rodrigo?',
        en: 'The ICT teacher asked the class about the main goal of practicing Ergonomics when studying on a computer. What was Rodrigo’s best answer?',
      },
      options: {
        pt: [
          'Organizar o espaço de trabalho, a cadeira e a posição do corpo para estudar com conforto e proteger a saúde',
          'Aumentar a velocidade do processador do computador para descarregar jogos mais rapidamente',
          'Comprar os acessórios mais caros e coloridos das lojas de informática',
          'Programar aplicações e jogos digitais sem necessitar de fazer pausas',
        ],
        en: [
          'Organize the workspace, chair, and body posture to study comfortably and protect health',
          'Increase computer processor speed to download games faster',
          'Buy the most expensive and colorful accessories from tech stores',
          'Program digital aplicações and games without needing to take breaks',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A ergonomia ajuda-nos a adaptar o espaço, os equipamentos e a posição do corpo para trabalhar com mais conforto e reduzir o risco de desconforto e lesões.',
        en: 'Ergonomics helps adapt equipment and body posture to prevent pain, fatigue, and injury.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! A Ergonomia foca-se no bem-estar do corpo e na adaptação correta do espaço de estudo.',
          'Esta opção está errada. A velocidade do computador é um aspeto técnico e não tem a ver com a Ergonomia do corpo.',
          'Esta opção está errada. Ter acessórios caros não garante boa postura se não forem ajustados ao teu corpo.',
          'Esta opção está errada. Programar sem pausas prejudica a saúde e contraria os princípios da Ergonomia.',
        ],
        en: [
          'Correct answer! Ergonomics focuses on bodily well-being and adjusting the study environment.',
          'Incorrect. Computer speed is technical performance, not physical ergonomics.',
          'Incorrect. Expensive accessories do not guarantee good posture if not properly adjusted.',
          'Incorrect. Programming without breaks harms health and violates ergonomics principles.',
        ],
      },
    },
    {
      id: 'ergo-q2',
      question: {
        pt: 'A Beatriz está a escrever um resumo de História na secretária do seu quarto. Como deve posicionar o corpo enquanto estuda?',
        en: 'Beatriz is typing a History summary at her bedroom desk. How should she position her body while studying?',
      },
      options: {
        pt: [
          'Costas direitas bem apoiadas no encosto da cadeira, ombros descontraídos e pés assentes no chão',
          'Corpo inclinado para a frente com o peito encostado com força à borda da mesa',
          'Tronco escorregado na cadeira com a cabeça muito abaixo da altura do teclado',
          'Sentar-se sobre uma perna dobrada com a coluna completamente inclinada para o lado',
        ],
        en: [
          'Back straight and firmly supported by the chair backrest, relaxed shoulders, and feet flat on the floor',
          'Body leaning forward with chest pressed tightly against the desk edge',
          'Slouching down the chair with head well below keyboard height',
          'Sitting on one folded leg with spine completely tilted sideways',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter a coluna apoiada, os ombros relaxados e os pés assentes garante estabilidade e evita dores nas costas e no pescoço.',
        en: 'Keeping back supported, shoulders relaxed, and feet flat ensures stability and prevents back and neck pain.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Esta posição neutra mantém a coluna protegida e evita a fadiga muscular.',
          'Esta opção está errada. Encostar o peito à mesa comprime a respiração e curva a coluna vertebral.',
          'Esta opção está errada. Escorregar na cadeira sobrecarrega a zona lombar e provoca dores no pescoço.',
          'Esta opção está errada. Dobrar uma perna por baixo do corpo desalinha a bacia e a coluna vertebral.',
        ],
        en: [
          'Correct answer! A neutral position protects the spine and avoids muscle fatigue.',
          'Incorrect. Pressing the chest against the desk restricts breathing and curves the spine.',
          'Incorrect. Slouching overburdens the lumbar area and strains the neck.',
          'Incorrect. Sitting on a leg misaligns the pelvis and spine.',
        ],
      },
    },
    {
      id: 'ergo-q3',
      question: {
        pt: 'O Lucas nota que fica com os ombros muito tensos porque a sua mesa é alta e os braços ficam esticados para cima. Como deveriam estar os cotovelos de forma ergonómica?',
        en: 'Lucas notices his shoulders get tense because his desk is high and his arms reach upward. How should his elbows be positioned ergonomically?',
      },
      options: {
        pt: [
          'Cotovelos dobrados num ângulo confortável próximo de 90 graus, com os antebraços nivelados com a mesa',
          'Braços totalmente esticados para cima com os ombros levantados até às orelhas',
          'Cotovelos muito abaixo da secretária tendo de puxar as mãos para cima',
          'Braços cruzados sobre o teclado enquanto tenta escrever só com uma mão',
        ],
        en: [
          'Elbows bent at a comfortable angle close to 90 degrees, with forearms level with the desk surface',
          'Arms fully stretched upward with shoulders raised to the ears',
          'Elbows far below desk level requiring hands to pull upward',
          'Arms crossed over the keyboard while attempting to type with one hand',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os cotovelos num ângulo de 90 graus permitem que os antebraços pousem na mesa sem esforço nos ombros e no pescoço.',
        en: 'Elbows at a 90-degree angle allow forearms to rest naturally without straining shoulders and neck.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! O ângulo de 90 graus nos cotovelos relaxa os ombros e os braços.',
          'Esta opção está errada. Levantar os ombros até às orelhas provoca contraturas musculares dolorosas.',
          'Esta opção está errada. Ter os cotovelos demasiado baixos obriga os pulsos a dobrar forçadamente.',
          'Esta opção está errada. Cruzar os braços dificulta a escrita e cria uma postura instável.',
        ],
        en: [
          'Correct answer! A 90-degree elbow bend relaxes the shoulders and arms.',
          'Incorrect. Raising shoulders creates painful muscle contractures.',
          'Incorrect. Elbows too low force wrists to bend awkwardly.',
          'Incorrect. Crossing arms hinders typing and creates an unstable posture.',
        ],
      },
    },
    {
      id: 'ergo-q4',
      question: {
        pt: 'O Miguel ajustou a cadeira da biblioteca escolar para a altura da mesa, mas os seus pés ficaram pendurados no ar. Como deve resolver o problema?',
        en: 'Miguel adjusted his school library chair to match the desk, but his feet are dangling in the air. How should he solve this problem?',
      },
      options: {
        pt: [
          'Colocar um apoio de pés estável (ou caixa firme) para que a planta dos pés fique assente',
          'Deixar os pés a balançar no ar durante as 2 horas em que vai estudar',
          'Enrolar os pés nas rodas da cadeira para prender o corpo à força',
          'Baixar a cadeira até ao chão, mesmo que os braços fiquem numa posição desconfortável',
        ],
        en: [
          'Use a stable footrest (or firm box) so the soles of his feet rest flat',
          'Leave feet swinging in the air during his 2 study hours',
          'Wrap feet around the chair wheels to lock his body in place',
          'Lower the chair to the floor, even if his arms end up in an uncomfortable position',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Um apoio de pés garante a circulação sanguínea adequada nas pernas e mantém a bacia e a zona lombar bem apoiadas.',
        en: 'A footrest ensures proper blood circulation in the legs and keeps the pelvis and lumbar back supported.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! O apoio de pés corrige a altura e garante que as pernas e a coluna fiquem estáveis.',
          'Esta opção está errada. Pés pendurados prejudicam a circulação e provocam cansaço nas pernas.',
          'Esta opção está errada. Prender as pernas nas rodas causa pressão e tensão nas articulações.',
          'Esta opção está errada. Baixar a cadeira cria um novo problema nos braços e nos ombros.',
        ],
        en: [
          'Correct answer! A footrest corrects height and ensures legs and spine remain stable.',
          'Incorrect. Dangling feet impair circulation and cause leg fatigue.',
          'Incorrect. Wrapping legs around chair wheels puts pressure on joints.',
          'Incorrect. Lowering the chair creates a new problem for arms and shoulders.',
        ],
      },
    },
    {
      id: 'ergo-q5',
      question: {
        pt: 'A mãe da Sofia quer comprar uma nova cadeira de estudo para o quarto. Que características ergonómicas são essenciais?',
        en: 'Sofia’s mother wants to buy a new study chair for her room. What ergonomic features are essential?',
      },
      options: {
        pt: [
          'Cadeira com altura regulável, encosto com apoio para a coluna e base estável',
          'Banco de madeira rígido sem encosto para obrigatoriamente não encostar',
          'Puf ou sofá demasiado mole onde o corpo afunde completamente',
          'Cadeira com assento inclinado para a frente que faça o corpo escorregar',
        ],
        en: [
          'Chair with adjustable height, supportive backrest for the spine, and a stable base',
          'Rigid wooden stool with no backrest forcing no back support',
          'Beanbag or soft couch where the body sinks in completely',
          'Chair with a forward-sloping seat causing the body to slide off',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A altura regulável permite adaptar a cadeira à altura da mesa, e o encosto protege a curvatura natural da coluna.',
        en: 'Adjustable height matches the chair to desk level, and the backrest protects the natural spine curvature.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! A regulação e o apoio de costas são os pilares de uma cadeira ergonómica.',
          'Esta opção está errada. Um banco sem encosto obriga os músculos da coluna a ficar em esforço contínuo.',
          'Esta opção está errada. Assentos muito moles curvam a coluna e criam más posturas.',
          'Esta opção está errada. Um assento inclinado obriga as pernas a fazer força constante para não cair.',
        ],
        en: [
          'Correct answer! Adjustability and back support are the foundation of an ergonomic chair.',
          'Incorrect. A backless stool forces spine muscles into continuous tension.',
          'Incorrect. Overly soft seats curve the spine and cause poor posture.',
          'Incorrect. A forward-sloping seat forces legs to push continuously to prevent sliding.',
        ],
      },
    },
    {
      id: 'ergo-q6',
      question: {
        pt: 'A Ana reparou que passa o tempo a dobrar o pescoço para baixo porque o ecrã está muito baixo na mesa. Onde deve ficar a linha superior do monitor?',
        en: 'Ana noticed she constantly bends her neck down because her screen is too low on the desk. Where should the top line of the monitor be?',
      },
      options: {
        pt: [
          'Aproximadamente ao nível dos olhos (ou ligeiramente abaixo), para olhar em frente sem dobrar a cabeça',
          'Muito acima da cabeça, obrigando a olhar sempre para o teto',
          'Pousado diretamente no tampo da mesa sem qualquer suporte de elevação',
          'Ao nível do chão para conseguir ler enquanto olha para os pés',
        ],
        en: [
          'Approximately at eye level (or slightly below), allowing looking straight ahead without bending the head',
          'Far above head height, forcing eyes to look up at the ceiling',
          'Resting directly flat on the desk without any elevation stand',
          'At floor level to read while looking down at feet',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O topo do ecrã ao nível dos olhos mantém a cabeça equilibrada sobre o pescoço, evitando dores cervicais.',
        en: 'The top of the screen at eye level keeps the head balanced over the neck, preventing cervical strain.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Esta altura alinha o pescoço de forma neutra e previne dores cervicais.',
          'Esta opção está errada. Olhar para cima força os músculos da nuca e cansa a visão.',
          'Esta opção está errada. Ter o monitor demasiado baixo obriga a inclinar a cabeça e curva os ombros.',
          'Esta opção está errada. Olhar para o chão cria uma grande sobrecarga no pescoço.',
        ],
        en: [
          'Correct answer! This height aligns the neck neutrally and prevents cervical pain.',
          'Incorrect. Looking up strains neck muscles and fatigues eyes.',
          'Incorrect. Having the monitor too low forces the head down and rounds shoulders.',
          'Incorrect. Looking down toward the floor causes heavy cervical strain.',
        ],
      },
    },
    {
      id: 'ergo-q7',
      question: {
        pt: 'O Martim está a ler um artigo na Internet e aproximou-se tanto que a sua cara ficou a 10 cm do monitor. Qual é a distância recomendada entre os olhos e o ecrã?',
        en: 'Martim is reading an article online and leaned so close that his face is 10 cm from the monitor. What is the recommended distance between eyes and screen?',
      },
      options: {
        pt: [
          'A distância de um braço esticado (cerca de 45 a 70 centímetros)',
          'Menos de 15 centímetros, quase a encostar o nariz ao ecrã',
          'Mais de 3 metros de distância em qualquer tipo de ecrã',
          'A distância não tem qualquer importância para a visão dos estudantes',
        ],
        en: [
          'An arm’s length distance (about 45 to 70 centimeters)',
          'Less than 15 centimeters, almost touching the nose to the screen',
          'More than 3 meters away on any type of monitor',
          'Distance has no importance for students’ eyesight',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Manter a distância de um braço esticado permite focar o ecrã sem esforçar os músculos dos olhos e reduz a fadiga visual.',
        en: 'Maintaining an arm’s length allows focusing without straining eye muscles and reduces visual fatigue.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! A distância do braço esticado é o ponto de equilíbrio perfeito para a visão.',
          'Esta opção está errada. Ficar a 10 cm do ecrã provoca esforço visual intenso e cansaço nos olhos.',
          'Esta opção está errada. 3 metros é uma distância excessiva para um monitor normal de computador.',
          'Esta opção está errada. A distância afeta diretamente a saúde e o cansaço dos olhos.',
        ],
        en: [
          'Correct answer! Arm’s length is the ideal balance for healthy eyesight.',
          'Incorrect. Being 10 cm away causes severe eye strain and visual fatigue.',
          'Incorrect. 3 meters is far too distant for a standard computer monitor.',
          'Incorrect. Distance directly impacts eye health and fatigue.',
        ],
      },
    },
    {
      id: 'ergo-q8',
      question: {
        pt: 'A Carolina está a escrever um trabalho no computador e a usar o rato. Como devem estar posicionados os seus pulsos em relação ao teclado?',
        en: 'Carolina is typing a assignment on the computer and using the mouse. How should her wrists be positioned relative to the keyboard?',
      },
      options: {
        pt: [
          'Direitos e alinhados numa linha contínua com os antebraços, sem dobras forçadas',
          'Muito dobrados para trás em ângulo agudo contra a borda da mesa',
          'Torcidos para os lados sempre que clica no rato',
          'Pressionados contra a aresta afiada da secretária a apontar para o chão',
        ],
        en: [
          'Straight and aligned in a continuous line with forearms, without forced bends',
          'Bent backward sharply against the desk edge',
          'Twisted sideways whenever clicking the mouse',
          'Pressed against the sharp desk edge pointing down toward the floor',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Pulsos alinhados e direitos evitam a compressão dos tendões e nervos nas mãos ao escrever e usar o rato.',
        en: 'Aligned, straight wrists prevent compression of tendons and nerves in the hands when typing and mousing.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Manter os pulsos numa posição neutra evita lesões por esforço repetitivo.',
          'Esta opção está errada. Dobrar os pulsos para trás comprime os nervos e causa dores nas articulações.',
          'Esta opção está errada. Torcer os pulsos força os tendões da mão.',
          'Esta opção está errada. Pressionar os pulsos em arestas afiadas corta a circulação do sangue.',
        ],
        en: [
          'Correct answer! Keeping wrists in a neutral position prevents repetitive strain injuries.',
          'Incorrect. Bending wrists backward compresses nerves and causes joint pain.',
          'Incorrect. Twisting wrists strains hand tendons.',
          'Incorrect. Pressing wrists against sharp edges restricts blood flow.',
        ],
      },
    },
    {
      id: 'ergo-q9',
      question: {
        pt: 'Durante a tarde, a luz do sol entra pela janela e incide diretamente no ecrã do computador do Pedro, criando reflexos fortes. O que deve fazer?',
        en: 'In the afternoon, sunlight enters through the window and shines directly on Pedro’s computer screen, creating harsh glare. What should he do?',
      },
      options: {
        pt: [
          'Ajustar a cortina da janela ou mudar a orientação da mesa para que a luz venha de lado',
          'Apagar todas as lâmpadas e continuar a estudar no escuro total',
          'Aumentar o brilho do monitor no máximo e colar o rosto ao ecrã',
          'Continuar a estudar sem fazer nada, forçando a vista mesmo sem conseguir ler',
        ],
        en: [
          'Adjust the window curtain or change desk orientation so light comes from the side',
          'Turn off all room lights and continue studying in total darkness',
          'Turn monitor brightness to maximum and glue face to screen',
          'Continue studying doing nothing, straining eyes even when unable to read',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A luz natural deve vir preferencialmente de lado em relação ao monitor para evitar encandeamentos e reflexos diretos no vidro.',
        en: 'Natural light should ideally enter from the side of the monitor to avoid glare and direct reflections on the glass.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! A iluminação lateral ilumina a sala sem criar reflexos no ecrã.',
          'Esta opção está errada. Estudar no escuro total apenas com a luz do ecrã cansa terrivelmente os olhos.',
          'Esta opção está errada. Aumentar o brilho e colar a cara piora o cansaço visual e a dor de cabeça.',
          'Esta opção está errada. Forçar a vista com reflexos provoca fadiga e dor nos olhos.',
        ],
        en: [
          'Correct answer! Side lighting illuminates the room without causing screen glare.',
          'Incorrect. Studying in total darkness with only screen light causes severe eye strain.',
          'Incorrect. Maximizing brightness and leaning closer worsens eye fatigue and headaches.',
          'Incorrect. Straining eyes through glare leads to ocular fatigue and soreness.',
        ],
      },
    },
    {
      id: 'ergo-q10',
      question: {
        pt: 'O Gabriel esteve 40 minutos concentrado a fazer pesquisa ao computador para o seu trabalho de Ciências. Qual é o hábito ergonómico recomendado agora?',
        en: 'Gabriel has been focused on computer research for 40 minutes for his Science project. What ergonomic habit is recommended now?',
      },
      options: {
        pt: [
          'Fazer uma pausa de 3 a 5 minutos, levantar-se, esticar o corpo e olhar para um ponto distante para descansar os olhos',
          'Continuar a olhar fixamente para o ecrã durante mais 3 horas sem pestanejar',
          'Trocar apenas de mão no rato mas continuar sentado sem se mover',
          'Reiniciar o computador para ser obrigado a esperar sentado em frente ao ecrã',
        ],
        en: [
          'Take a 3 to 5 minute break, stand up, stretch the body, and look at a distant point to rest eyes',
          'Keep staring fixedly at the screen for another 3 hours without blinking',
          'Just switch hands on the mouse while staying seated motionless',
          'Reboot the computer to force waiting seated in front of the screen',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Fazer pequenas pausas ativas a cada 30-40 minutos reativa a circulação, relaxa os músculos da coluna e descansar o olhar ao longe relaxa os olhos.',
        en: 'Taking short active breaks every 30-40 minutes boosts blood flow, relaxes spine muscles, and looking far away rests eyes.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! As pausas ativas mantêm o corpo saudável e a mente alerta.',
          'Esta opção está errada. Estar horas sem pestanejar nem mover causa dores e secura nos olhos.',
          'Esta opção está errada. Trocar de mão no rato não resolve o cansaço do corpo nem dos olhos.',
          'Esta opção está errada. Esperar sentado continua a manter a coluna estática sem descanso.',
        ],
        en: [
          'Correct answer! Active breaks keep the body healthy and the mind sharp.',
          'Incorrect. Hours without blinking or moving cause sore, dry eyes.',
          'Incorrect. Switching hands does not relieve body or eye fatigue.',
          'Incorrect. Waiting seated keeps the spine static without proper rest.',
        ],
      },
    },
  ],
};
