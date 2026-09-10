import { ThemeDefinition } from '../types';

export const themePalavrasPasseData: ThemeDefinition = {
  id: 'palavras-passe',
  number: 5,
  title: {
    pt: 'Palavras-passe Seguras',
    en: 'Secure Passwords',
  },
  tagline: {
    pt: 'Aprende a criar e proteger palavras-passe.',
    en: 'Learn how to create and safeguard strong passwords.',
  },
  intro: {
    pt: 'A tua palavra-passe é a chave que protege a tua vida digital: mensagens, fotografias, trabalhos da escola e jogos! Aprende a criar palavras-passe longas e difíceis de adivinhar e descobre por que motivo não deves partilhar as tuas palavras-passe com colegas ou amigos.',
    en: 'Your password is the key to your digital identity: messages, photos, school work, and games! Learn how to create long and hard-to-guess passwords, and why passwords should stay private and not be shared with peers.',
  },
  icon: '🔐',
  illustrationKey: 'palavras-passe',
  accentColor: 'purple',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'O que é uma palavra-passe?', en: 'What is a password?' },
      body: {
        pt: 'Uma palavra-passe é um código secreto que usamos para provar que somos nós a aceder a uma conta — como o email ou uma plataforma escolar. Funciona como uma chave que só tu deves conhecer.',
        en: 'A password is a secret passcode used to verify your identity when logging into accounts—such as your student email or school platform. It functions as a personal digital key that only you should possess.',
      },
      icon: '🔐',
    },
    {
      eyebrow: { pt: 'Regras', en: 'Rules' },
      h: { pt: 'Características de uma palavra-passe segura', en: 'Traits of a strong password' },
      body: {
        pt: 'Uma boa palavra-passe deve ser longa e difícil de adivinhar:<ul><li>Ter um bom comprimento.</li><li>Pode misturar letras maiúsculas, minúsculas, números e símbolos, ou formar uma frase difícil de adivinhar.</li><li>Não conter o teu nome, data de nascimento ou dados pessoais óbvios.</li><li>Não ser uma sequência simples, como "123456" ou "abcdef".</li><li>Ser diferente para cada conta que uses.</li></ul>',
        en: 'A strong password should be long and hard to guess:<ul><li>Have good length.</li><li>Can mix uppercase, lowercase letters, numbers, and symbols, or form a phrase that is hard to guess.</li><li>Not contain your name, birthdate, or obvious personal information.</li><li>Not be a simple sequence, like "123456" or "abcdef".</li><li>Be different for each account you use.</li></ul>',
      },
      icon: '🛡️',
    },
    {
      eyebrow: { pt: 'Sabias que...?', en: 'Did you know...?' },
      h: { pt: 'Cuidados essenciais com as palavras-passe', en: 'Essential password care' },
      body: {
        pt: '<strong>Não partilhes as tuas palavras-passe:</strong> Não partilhes as tuas palavras-passe com amigos ou colegas. Se precisares de ajuda com uma conta ou se te esqueceres do acesso, fala com os teus pais ou com o teu professor.<br><br><strong>Uma conta, uma palavra-passe:</strong> Se usares a mesma palavra-passe em todas as contas e alguém a descobrir num sítio menos seguro, pode aceder a todas as tuas contas. Por isso, o ideal é ter palavras-passe diferentes para cada serviço.',
        en: '<strong>Do not share your passwords:</strong> Do not share your passwords with friends or classmates. If you need help with an account or forget your access, speak with your parents or your teacher.<br><br><strong>One account, one password:</strong> If you use the same password across all accounts and someone discovers it in a less secure place, they can access all your accounts. Therefore, it is best to have different passwords for each service.',
      },
      icon: '⚠️',
    },
    {
      eyebrow: { pt: 'Truques', en: 'Tricks & Tips' },
      h: { pt: 'Como criar palavras-passe seguras', en: 'How to create secure passwords' },
      body: {
        pt: 'Uma palavra-passe deve ser longa, difícil de adivinhar e única para cada serviço.<br><br>Podes usar a técnica da <strong>frase-passe</strong> (juntar palavras que façam sentido para ti mas sejam imprevisíveis para os outros) ou combinar letras, números e símbolos sem padrões óbvios.<br><br><hr class="border-purple-200 my-3"><br><strong>REGRAS DE OURO:</strong><ul><li><strong>O comprimento é fundamental:</strong> palavras-passe longas oferecem muito maior resistência a tentativas de adivinhação.</li><li><strong>Sem informação pessoal previsível:</strong> nunca uses nomes de familiares, alcunhas, nomes de animais, datas de aniversário ou anos.</li><li><strong>Não reutilizar:</strong> usa uma palavra-passe diferente para cada conta e serviço.</li><li><strong>Segredo absoluto:</strong> não partilhes a palavra-passe com colegas nem a deixes visível em notas coladas ao ecrã.</li><li><strong>Autenticação multifator (2FA):</strong> ativa esta camada adicional de segurança sempre que o serviço a disponibilizar.</li></ul>',
        en: 'A password should be long, hard to guess, and unique to each service.<br><br>You can use the <strong>passphrase</strong> method (combining words meaningful to you but unpredictable to others) or combine letters, numbers, and symbols without obvious patterns.<br><br><hr class="border-purple-200 my-3"><br><strong>GOLDEN RULES:</strong><ul><li><strong>Length is essential:</strong> longer passwords provide significantly greater resistance against guessing.</li><li><strong>No predictable personal data:</strong> never use family names, nicknames, pet names, birthdates, or years.</li><li><strong>Do not reuse:</strong> use a different password for every account and service.</li><li><strong>Keep it secret:</strong> do not share passwords with peers or stick them on notes near screens.</li><li><strong>Multi-factor authentication (2FA):</strong> enable this extra layer of security whenever available.</li></ul>',
      },
      icon: '🔑',
    },
  ],
  modules: [
    {
      id: 'pass-anatomia-forte',
      themeId: 'palavras-passe',
      number: 1,
      title: {
        pt: 'A Anatomia de uma Palavra-passe Forte',
        en: 'The Anatomy of a Strong Password',
      },
      shortDesc: {
        pt: 'Quanto mais longa e difícil de adivinhar for uma palavra-passe, melhor.',
        en: 'The longer and harder to guess a password is, the better.',
      },
      icon: '🛡️',
      explanation: {
        pt: [
          'Uma palavra-passe fraca é como deixar a porta de casa aberta: programas automáticos ou terceiros conseguem adivinhá-la com facilidade.',
          'Regra 1 — Comprimento: Quanto mais longa e difícil de adivinhar for uma palavra-passe, melhor.',
          'Regra 2 — Variedade e Criatividade: Não existe uma combinação obrigatória de letras, números e símbolos. O mais importante é que a palavra-passe seja longa e difícil de adivinhar.',
          'O que NUNCA usar: Evita palavras-passe curtas, previsíveis ou baseadas em informações pessoais (como o teu nome, a tua data de nascimento, sequências óbvias "123456" ou palavras simples do dicionário).',
        ],
        en: [
          'A weak password is like leaving your front door unlocked: automated tools can easily guess it.',
          'Rule 1 — Length: The longer and harder to guess a password is, the better.',
          'Rule 2 — Creativity: There is no mandatory combination of letters, numbers, and symbols. The most important thing is that the password is long and hard to guess.',
          'What NEVER to use: Avoid short, predictable passwords or passwords based on personal information (such as your name, birthdate, obvious sequences like "123456", or simple dictionary words).',
        ],
      },
      example: {
        title: {
          pt: 'A técnica da frase-passe da Mariana',
          en: 'Mariana’s passphrase technique',
        },
        scenario: {
          pt: 'A Mariana quer criar uma palavra-passe fácil de memorizar mas difícil de adivinhar. Pensou numa frase pessoal: "O vento forte soprava nuvens azuis".',
          en: 'Mariana wants a memorable yet hard-to-guess password. She thought of a personal sentence: "O vento forte soprava nuvens azuis".',
        },
        tip: {
          pt: 'A Mariana optou por uma frase-passe longa ("vento-soprava-nuvens-azuis"), fácil de memorizar para ela e muito difícil de ser adivinhada por terceiros. Evita palavras-passe curtas, previsíveis ou baseadas em informações pessoais.',
          en: 'Mariana opted for a long passphrase ("vento-soprava-nuvens-azuis"), memorable to her and very hard for anyone else to guess. Avoid short, predictable passwords or passwords based on personal information.',
        },
      },
      funFact: {
        pt: 'Sabias que sequências simples ou palavras do dicionário são testadas muito rapidamente por computadores, enquanto uma palavra-passe longa e difícil de adivinhar oferece uma proteção muito superior?',
        en: 'Did you know simple sequences or dictionary words are tested very quickly by computers, whereas a long, hard-to-guess password offers far superior protection?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que a palavra-passe "joao2015" é arriscada se o aluno se chamar João e tiver nascido em 2015?',
          en: 'Why is the password "joao2015" risky if the student is named João and was born in 2015?',
        },
        clue: {
          pt: 'Qualquer colega ou pessoa que veja o teu cartão escolar sabe essa informação.',
          en: 'Anyone seeing your student ID card knows that exact info.',
        },
        reflection: {
          pt: 'Porque é das primeiras coisas que qualquer pessoa tenta adivinhar! Informações pessoais públicas como nomes e anos de nascimento nunca devem fazer parte de palavras-passe.',
          en: 'Because it is among the first guesses anyone or automated tool attempts! Public personal facts should never be passwords.',
        },
      },
      quizQuestions: [
        {
          id: 'q-pass-1',
          question: {
            pt: 'Qual destas opções representa a palavra-passe mais segura e difícil de adivinhar?',
            en: 'Which option represents the safest and hardest to guess password?',
          },
          options: {
            pt: [
              'vento-soprava-nuvens-azuis',
              '12345678',
              'joao2015',
              'palavrapasse',
            ],
            en: [
              'vento-soprava-nuvens-azuis',
              '12345678',
              'joao2015',
              'palavrapasse',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Uma frase-passe longa e difícil de adivinhar é muito mais segura do que sequências previsíveis, palavras comuns ou dados pessoais.',
            en: 'Correct! A long, hard-to-guess passphrase is far more secure than predictable sequences, common words, or personal information.',
          },
        },
      ],
    },
    {
      id: 'pass-guardar-proteger',
      themeId: 'palavras-passe',
      number: 2,
      title: {
        pt: 'Como Guardar e Proteger as Palavras-passe',
        en: 'How to Store and Protect Your Passwords',
      },
      shortDesc: {
        pt: 'Privacidade, autenticação de dois fatores e cuidados na partilha.',
        en: 'Privacy, two-factor authentication, and sharing precautions.',
      },
      icon: '🔐',
      explanation: {
        pt: [
          'A regra fundamental: não partilhes as tuas palavras-passe com amigos ou colegas. Se precisares de ajuda com uma conta, pede apoio aos teus pais ou encarregados de educação ou ao teu professor!',
          'Nunca apontar em papéis colados no monitor (post-its): qualquer pessoa que passe pela tua secretária pode ver a tua palavra-passe.',
          'Palavras-passe diferentes para contas diferentes: se usares a mesma palavra-passe no jogo e no teu email escolar, se o jogo sofrer um ataque, o invasor poderá aceder a outras contas.',
          'Autenticação de Dois Fatores (2FA) ou Confirmação Suplementar: funciona como uma fechadura dupla! Além de saberes a tua palavra-passe normal, precisas de uma confirmação extra ou "suplementar" (como um código secreto temporário enviado para o telemóvel ou gerado por uma aplicação segura). Assim, mesmo que alguém descubra a tua palavra-passe, não consegue entrar na tua conta porque não tem essa segunda confirmação extra.',
        ],
        en: [
          'The golden rule: do not share passwords with classmates or friends. If you need help with an account, ask your parents or your teacher!',
          'Never write passwords on sticky notes attached to screens: anyone walking by can view them.',
          'Unique passwords for unique accounts: using the same password everywhere means one breach compromises other accounts.',
          'Two-Factor Authentication (2FA): an extra security layer requesting a temporary code in addition to your password.',
        ],
      },
      example: {
        title: {
          pt: 'O amigo que pediu a conta de jogo',
          en: 'The friend asking for game credentials',
        },
        scenario: {
          pt: 'Um amigo do Tomás pediu-lhe a palavra-passe do jogo para experimentar uma personagem rara durante a noite. O Tomás explicou gentilmente que a palavra-passe é pessoal, mas convidou-o para jogarem juntos em sua casa.',
          en: 'Tomás’s friend asked for his game password to test a rare skin overnight. Tomás politely explained passwords are strictly private, inviting him over to play together in person instead.',
        },
        tip: {
          pt: 'Recusar partilhar a palavra-passe não é falta de amizade; é proteger a segurança da conta e evitar mal-entendidos!',
          en: 'Refusing to share passwords isn’t unfriendly; it protects your account and preserves your friendship from misunderstandings!',
        },
      },
      funFact: {
        pt: 'Não partilhes a tua palavra-passe por email, telefone ou mensagem. Se alguém te pedir a palavra-passe, confirma a situação com um adulto ou através do contacto oficial do serviço.',
        en: 'Do not share your password via email, phone, or message. If someone asks for your password, verify the situation with an adult or through the official contact of the service.',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que deves fazer se suspeitares que alguém descobriu a tua palavra-passe?',
          en: 'What should you do if you suspect someone found out your password?',
        },
        clue: {
          pt: 'Não esperes que aconteça algo de indesejado na tua conta.',
          en: 'Don’t wait for unauthorized activity on your account.',
        },
        reflection: {
          pt: 'Deves alterar a palavra-passe o quanto antes nas definições de segurança e pedir ajuda aos teus pais ou ao professor para verificar a situação.',
          en: 'Change your password right away in security settings and inform your parents or teacher to check recent activity.',
        },
      },
      quizQuestions: [
        {
          id: 'q-pass-2',
          question: {
            pt: 'Com quem deves partilhar as tuas palavras-passe?',
            en: 'Who should you share your passwords with?',
          },
          options: {
            pt: [
              'Apenas com pais, encarregados de educação ou professores se precisares de ajuda com a conta',
              'Com os teus colegas da escola no recreio',
              'Com jogadores desconhecidos que conheceste num chat online',
              'Com qualquer pessoa que te envie uma mensagem a pedir',
            ],
            en: [
              'Only with your parents, guardians, or teachers if you need help with your account',
              'With your classmates at school recess',
              'With unknown players encountered in game lobbies',
              'With anyone sending a direct message asking for it',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'As palavras-passe são privadas e não devem ser partilhadas com colegas. Se precisares de ajuda, fala com os teus pais ou professor.',
            en: 'Correct! Passwords are private and should not be shared with peers. Seek help from parents or teachers if needed.',
          },
        },
      ],
    },
    {
      id: 'pass-gestao-troca',
      themeId: 'palavras-passe',
      number: 3,
      title: {
        pt: 'Gestores de Palavras-passe e Boas Práticas',
        en: 'Password Managers and Best Practices',
      },
      shortDesc: {
        pt: 'Como organizar palavras-passe com segurança através de um cofre digital.',
        en: 'How to manage credentials securely using a digital vault.',
      },
      icon: '🔑',
      explanation: {
        pt: [
          'Hoje em dia temos contas na escola, em plataformas de leitura, em emails e em jogos. Como gerir tantas palavras-passe diferentes sem usar sempre a mesma?',
          'Gestor de Palavras-passe: é uma aplicação que funciona como um cofre digital protegido. Num gestor de palavras-passe, a palavra-passe principal deve ser protegida e nunca deve ser partilhada. Se utilizares um gestor, segue as regras definidas pelos teus pais, encarregados de educação ou escola.',
          'Num computador partilhado, termina sempre a sessão. Se te esqueceres e suspeitares que alguém teve acesso à tua conta, pede ajuda e altera a palavra-passe.',
          'Bloqueio de Ecrã: sempre que te levantares do computador, bloqueia a sessão (tecla Windows + L ou no menu Iniciar) para que ninguém mexa na tua conta.',
        ],
        en: [
          'Students have accounts for school portals, e-learning, emails, and games. How can one remember distinct passwords without repeating?',
          'Password Manager: a digital encrypted vault that stores credentials; you only need to remember one strong Master Password.',
          'Updates when needed: update passwords whenever security alerts occur or after using shared devices.',
          'Screen Lock: whenever you leave a desk, lock your machine (Windows + L) so nobody can tamper with your session.',
        ],
      },
      example: {
        title: {
          pt: 'O computador da biblioteca que ficou aberto',
          en: 'The library computer left open',
        },
        scenario: {
          pt: 'O Simão foi à casa de banho e deixou o computador da biblioteca escolar desbloqueado com o email aberto. Um colega por brincadeira podia ter enviado mensagens em seu nome.',
          en: 'Simão went to the restroom leaving a library PC unlocked with his webmail open. Another student could have sent prank emails under his name.',
        },
        tip: {
          pt: 'Bloquear sempre a sessão (ou terminar sessão) demora apenas alguns segundos e garante tranquilidade!',
          en: 'Locking your session or logging out takes only a few seconds and guarantees peace of mind!',
        },
      },
      funFact: {
        pt: 'Sabias que a sequência "123456" continua a ser uma das mais usadas no mundo? Por ser tão óbvia, ferramentas automáticas conseguem testá-la e adivinhá-la de forma quase imediata.',
        en: 'Did you know the sequence "123456" remains one of the most widely used? Being so obvious, automated tools test and guess it almost instantly.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é uma má ideia guardar as palavras-passe num ficheiro de texto sem proteção no Ambiente de Trabalho?',
          en: 'Why is it a bad idea to save passwords in an unprotected text file on the Desktop?',
        },
        clue: {
          pt: 'Pensa em quem consegue abrir esse ficheiro sem qualquer palavra-passe.',
          en: 'Think about who can open that file without any authorization.',
        },
        reflection: {
          pt: 'Qualquer pessoa que use o computador ou qualquer programa malicioso que infete o sistema pode ler esse ficheiro sem qualquer barreira e ter acesso às tuas contas!',
          en: 'Anyone sitting at the PC or malicious software can open that plain text file easily and see your credentials!',
        },
      },
      quizQuestions: [
        {
          id: 'q-pass-3',
          question: {
            pt: 'O que deves fazer sempre que te afastas do teu computador na sala de aula?',
            en: 'What should you always do when stepping away from your computer in class?',
          },
          options: {
            pt: [
              'Bloquear o ecrã ou terminar a sessão para ninguém ter acesso à tua conta',
              'Apenas minimizar as janelas para o ambiente de trabalho',
              'Desligar apenas o monitor sem terminar a sessão',
              'Deixar a conta aberta sem proteção',
            ],
            en: [
              'Lock the screen or log out to prevent unauthorized access',
              'Only minimize windows to the desktop',
              'Turn off only the monitor without logging out',
              'Leave the session open without protection',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Bloquear a sessão impede que alguém utilize a tua conta indevidamente.',
            en: 'Excellent! Locking prevents anyone from misusing your identity or files.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-pass-mc',
      themeId: 'palavras-passe',
      number: 1,
      title: { pt: '🔑 Qual é a mais segura?', en: '🔑 Which is the Strongest?' },
      shortDesc: { pt: 'Identifica a palavra-passe mais robusta e resistente a ataques.', en: 'Identify the most robust and secure password.' },
      icon: '🔑',
      durationMinutes: 4,
      points: 100,
      type: 'what_would_you_do',
      gameData: {
        type: 'mc',
        title: 'Qual é a mais segura?',
        icon: '🔑',
        xp: 100,
        desc: 'Escolhe a palavra-passe mais difícil de adivinhar.',
        data: {
          questions: [
            {
              q: 'Qual destas palavras-passe é a mais difícil de adivinhar por um pirata informático?',
              opts: [
                'vento-soprava-nuvens-azuis',
                '12345678',
                'maria2014',
                'palavrapasse'
              ],
              c: 0,
              e: 'Uma frase-passe longa e imprevisível é muito mais segura e difícil de adivinhar do que sequências simples ou informações pessoais.'
            },
            {
              q: 'Porque é que não deves usar a tua data de nascimento ou o nome do teu animal de estimação como palavra-passe?',
              opts: [
                'Porque são fáceis de descobrir por quem te conhece ou nas redes sociais',
                'Porque os sistemas escolares rejeitam qualquer palavra do dicionário',
                'Porque aumentam o risco de bloqueio definitivo da conta escolar',
                'Porque tornam o envio de mensagens de email mais demorado'
              ],
              c: 0,
              e: 'Informações pessoais são fáceis de adivinhar por conhecidos ou pesquisando perfis online.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-pass-tf',
      themeId: 'palavras-passe',
      number: 2,
      title: { pt: '⚡ Verdadeiro ou Falso: Palavras-passe', en: '⚡ True or False: Passwords' },
      shortDesc: { pt: 'Testa regras fundamentais de segurança de contas.', en: 'Test fundamental account security rules.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Verdadeiro ou Falso: palavras-passe',
        icon: '⚡',
        xp: 100,
        desc: 'Classifica as afirmações sobre a proteção de palavras-passe.',
        data: {
          items: [
            { s: 'Deves emprestar a tua palavra-passe ao teu melhor amigo para demonstrar confiança.', a: false, e: 'Não partilhes palavras-passe com colegas ou amigos. Se precisares de ajuda, fala com um adulto responsável ou com o professor!' },
            { s: 'Usar a mesma palavra-passe em vários sites diferentes é um risco.', a: true, e: 'Se um serviço for comprometido, todas as outras contas podem ficar em perigo.' },
            { s: 'Ativar a autenticação de dois fatores (2FA) adiciona uma barreira extra de proteção.', a: true, e: 'Mesmo que descubram a palavra-passe, é necessária uma confirmação adicional.' }
          ]
        }
      }
    },
    {
      id: 'jogo-pass-builder-interactive',
      themeId: 'palavras-passe',
      number: 3,
      title: { pt: '🧩 Constrói uma Palavra-passe Segura', en: '🧩 Build a Secure Password' },
      shortDesc: { pt: 'Escolhe carateres e experimenta criar uma palavra-passe que cumpra todas as regras de segurança.', en: 'Choose characters and build a password meeting all safety rules through experimentation.' },
      icon: '🧩',
      durationMinutes: 4,
      points: 100,
      type: 'password_builder',
      gameData: {
        type: 'password_builder',
        title: 'Constrói uma Palavra-passe Segura',
        icon: '🧩',
        xp: 100,
        desc: 'Seleciona os carateres para construir uma palavra-passe segura que cumpra todas as regras de proteção.',
        data: {
          lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          numbers: ['1', '2', '3', '4', '5', '6', '7', '8'],
          symbols: ['@', '#', '$', '%', '&', '*', '!']
        }
      }
    },
    {
      id: 'jogo-pass-match',
      themeId: 'palavras-passe',
      number: 4,
      title: { pt: '🔗 Segura ou Insegura?', en: '🔗 Safe or Insecure Match' },
      shortDesc: { pt: 'Associa cada exemplo de palavra-passe à sua avaliação correta.', en: 'Match each password example to its security rating.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 100,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Segura ou Insegura?',
        icon: '🔗',
        xp: 100,
        desc: 'Associa corretamente cada palavra-passe à respetiva classificação.',
        data: {
          pairs: [
            { left: 'password123', right: 'Extremamente previsível e vulnerável' },
            { left: 'vento-soprava-nuvens-azuis', right: 'Longa e difícil de adivinhar' },
            { left: 'futebol2024', right: 'Curta, previsível e baseada em dados comuns' },
            { left: 'Usar gestor de palavras-passe', right: 'Prática recomendada para guardar chaves' }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema3',
      themeId: 'palavras-passe',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Palavras-passe (10 Questões)', en: '🏆 Learning Quiz: Passwords (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas sobre o Tema 3.', en: 'Comprehensive final assessment with 10 questions on Topic 3.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 100,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'pass-q1',
      question: {
        pt: 'O João vai criar uma palavra-passe para a sua conta do portal escolar. Qual destas opções é a mais segura e difícil de descobrir por estranhos?',
        en: 'João is creating a password for his school portal account. Which of these options is the safest and hardest for strangers to guess?',
      },
      options: {
        pt: [
          'joao123',
          '12345678',
          'O_meu_cao_Bob_corre_muito_2024!',
          'escola',
        ],
        en: [
          'joao123',
          '12345678',
          'O_meu_cao_Bob_corre_muito_2024!',
          'school',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Uma frase-passe longa com palavras, números e símbolos é fácil de memorizar para o João e extremamente segura contra programas automáticos.',
        en: 'A long passphrase combining words, numbers, and symbols is easy for João to remember and extremely secure against automated programs.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. "joao123" combina o nome com números óbvios e é descoberta em segundos.',
          'Esta opção está errada. "12345678" é uma sequência numérica muito comum testada em primeiro lugar por atacantes.',
          'Esta é a resposta correta! É uma frase-passe longa, com maiúsculas, números e símbolos que garante alta segurança.',
          'Esta opção está errada. A palavra "escola" é demasiado curta e fácil de adivinhar.',
        ],
        en: [
          'Incorrect. "joao123" uses a name with obvious numbers and is guessed in seconds.',
          'Incorrect. "12345678" is a standard sequence tested first by attackers.',
          'Correct answer! It is a long passphrase with uppercase, numbers, and symbols providing high security.',
          'Incorrect. The word "school" is too short and simple to guess.',
        ],
      },
    },
    {
      id: 'pass-q2',
      question: {
        pt: 'A melhor amiga da Maria pediu-lhe a palavra-passe do seu jogo online para a ajudar a passar de nível no fim de semana. Como deve a Maria reagir?',
        en: 'Maria’s best friend asked for her online game password to help her level up over the weekend. How should Maria react?',
      },
      options: {
        pt: [
          'Recusar educadamente, explicando que as palavras-passe são secretas e pessoais, e propor jogarem juntas presencialmente',
          'Dar a palavra-passe imediatamente porque os melhores amigos partilham tudo',
          'Escrever a palavra-passe num papel e dar-lhe no intervalo da escola',
          'Dar a palavra-passe na condição de o amigo dar a dele em troca',
        ],
        en: [
          'Politely decline, explaining that passwords are secret and personal, and offer to play together in person',
          'Give the password immediately because best friends share everything',
          'Write the password on paper and hand it over at recess',
          'Give the password provided the friend shares theirs in return',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As palavras-passe são pessoais e intransmissíveis. Não partilhar palavras-passe evita perda de contas e desentendimentos entre amigos.',
        en: 'Passwords are personal and non-transferable. Not sharing credentials prevents account loss and friction between friends.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Recusar educadamente protege a tua conta e mantém a amizade sem riscos.',
          'Esta opção está errada. Mesmo entre amigos, partilhar credenciais (os teus dados de acesso, como o nome de utilizador e a palavra-passe) pode originar perdas acidentais de conta.',
          'Esta opção está errada. Escrever a chave em papel expõe a palavra-passe a outras pessoas.',
          'Esta opção está errada. Trocar palavras-passe multiplica o risco de invasão de ambas as contas.',
        ],
        en: [
          'Correct answer! Politely declining protects your account and maintains friendship without risks.',
          'Incorrect. Even among friends, sharing credentials can cause accidental account losses.',
          'Incorrect. Writing keys on paper exposes them to others.',
          'Incorrect. Swapping passwords doubles the security risk for both accounts.',
        ],
      },
    },
    {
      id: 'pass-q3',
      question: {
        pt: 'O Rodrigo terminou o seu trabalho escolar no computador da biblioteca e precisa de ir para a aula. O que deve fazer antes de se levantar da mesa?',
        en: 'Rodrigo finished his assignment on a library computer and needs to head to class. What should he do before leaving his desk?',
      },
      options: {
        pt: [
          'Desligar apenas o monitor sem terminar a sessão na conta',
          'Encerrar a sessão (fazer logout) das suas contas e fechar o navegador',
          'Deixar a janela aberta para o colega seguinte ver o trabalho',
          'Ativar o protetor de ecrã e ir embora',
        ],
        en: [
          'Turn off only the monitor without logging out of his account',
          'Log out of all accounts and close the browser',
          'Leave the browser window open for the next student to see',
          'Enable screen saver and leave',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Terminar a sessão (logout) garante que mais ninguém conseguirá aceder ao teu email, trabalhos ou dados pessoais no computador partilhado.',
        en: 'Logging out ensures nobody else can access your email, files, or personal data on a shared computer.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Desligar o ecrã não encerra a sessão; quem ligar o ecrã tem acesso total.',
          'Esta é a resposta correta! Fazer logout fecha o acesso à tua conta em computadores públicos ou partilhados.',
          'Esta opção está errada. Deixar a sessão aberta expõe a tua conta a quem usar o computador a seguir.',
          'Esta opção está errada. O protetor de ecrã pode ser desativado com um toque no rato.',
        ],
        en: [
          'Incorrect. Turning off the screen does not log out; anyone turning it back on gets access.',
          'Correct answer! Logging out secures your account on public or shared computers.',
          'Incorrect. Leaving sessions open exposes your account to the next user.',
          'Incorrect. Screen savers are easily dismissed with a mouse movement.',
        ],
      },
    },
    {
      id: 'pass-q4',
      question: {
        pt: 'A Leonor utiliza vários jogos online e o portal da escola. Porque é que ela NUNCA deve utilizar a mesma palavra-passe em todas essas contas?',
        en: 'Leonor uses several online games and the school portal. Why should she NEVER use the same password for all these accounts?',
      },
      options: {
        pt: [
          'Porque se um dos jogos tiver uma fuga de dados (quando invasores entram no site do jogo e roubam as palavras-passe dos utilizadores), o intruso tentará usar a mesma palavra-passe para entrar em todas as outras contas da Leonor',
          'Porque os navegadores bloqueiam automaticamente contas com palavras-passe repetidas',
          'Porque a ligação de fibra ótica fica mais lenta',
          'Porque o computador apaga o histórico de navegação ao fim do dia',
        ],
        en: [
          'Because if one game suffers a data breach, an attacker will try that same password to breach all of Leonor’s other accounts',
          'Because browsers automatically block accounts with reused passwords',
          'Because fiber optic internet connection gets slower',
          'Because the computer erases browsing history at the end of the day',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Reutilizar a mesma palavra-passe cria um efeito dominó: se um site for atacado, todas as tuas outras contas ficam vulneráveis.',
        en: 'Reusing passwords creates a domino effect: if one site is breached, all your other accounts become vulnerable.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Ter palavras-passe diferentes para cada conta impede que um ataque a um site comprometa os restantes.',
          'Esta opção está errada. Os navegadores não bloqueiam logins por repetição de palavra-passe.',
          'Esta opção está errada. A velocidade da Internet não depende das palavras-passe usadas.',
          'Esta opção está errada. O histórico de navegação não tem relação com a segurança da palavra-passe.',
        ],
        en: [
          'Correct answer! Using distinct passwords prevents a breach on one site from endangering the rest.',
          'Incorrect. Browsers do not block logins for password reuse.',
          'Incorrect. Internet speed does not depend on passwords used.',
          'Incorrect. Browsing history is unrelated to password security.',
        ],
      },
    },
    {
      id: 'pass-q5',
      question: {
        pt: 'A conta de email da escola do Tiago ativou a Autenticação de Dois Fatores (2FA). Quando o Tiago tenta entrar na conta, o que lhe é solicitado além da palavra-passe?',
        en: 'Tiago’s school email account enabled Two-Factor Authentication (2FA). When Tiago logs in, what is required in addition to his password?',
      },
      options: {
        pt: [
          'Um código de segurança temporário enviado para o telemóvel dos pais ou gerado numa aplicação',
          'O pagamento de uma taxa em dinheiro',
          'A resposta a um teste de Matemática de 10 perguntas',
          'A alteração obrigatória da palavra-passe em cada acesso',
        ],
        en: [
          'A temporary security code sent to his parent’s mobile phone or generated in an app',
          'Payment of a cash fee',
          'Answering a 10-question Math quiz',
          'A mandatory password change on every login',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A 2FA junta algo que tu sabes (a palavra-passe) a algo que tu tens (o código no telemóvel), tornando a conta quase impossível de invadir.',
        en: '2FA combines something you know (password) with something you have (phone code), making the account nearly impossible to breach.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! O código temporário é o segundo fator que confirma a tua identidade.',
          'Esta opção está errada. A autenticação de dois fatores é uma medida de segurança e não um serviço pago.',
          'Esta opção está errada. Não existem testes de disciplinas na autenticação de contas.',
          'Esta opção está errada. A 2FA solicita um código temporário e não exige mudar a palavra-passe.',
        ],
        en: [
          'Correct answer! The temporary code is the second factor verifying your identity.',
          'Incorrect. Two-factor authentication is a security feature, not a paid charge.',
          'Incorrect. Account authentication does not involve academic quizzes.',
          'Incorrect. 2FA asks for a temporary verification code, not a password change.',
        ],
      },
    },
    {
      id: 'pass-q6',
      question: {
        pt: 'O irmão do Pedro colou um papelinho (post-it) com a sua palavra-passe na borda do monitor do computador de casa. Porque é que esta atitude é insegura?',
        en: 'Pedro’s brother taped a paper sticky note with his password to the edge of the home computer monitor. Why is this action insecure?',
      },
      options: {
        pt: [
          'Porque qualquer pessoa que passe perto do computador pode ver a palavra-passe e entrar na conta',
          'Porque a cola do papelinho avaria os pixéis do monitor',
          'Porque o computador desliga-se automaticamente ao detetar papel',
          'Porque gasta a bateria do teclado',
        ],
        en: [
          'Because anyone walking past the computer can read the password and access the account',
          'Because paper glue damages monitor pixels',
          'Because the computer shuts down automatically when detecting paper',
          'Because it drains the keyboard battery',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Anotar palavras-passe em papéis visíveis expõe o teu acesso a qualquer pessoa que visite a sala ou passe por perto.',
        en: 'Writing passwords on visible notes exposes account access to anyone walking nearby.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Deixar a chave visível permite que qualquer pessoa a veja e utilize sem permissão.',
          'Esta opção está errada. A cola do papel não avaria pixéis, o problema é a falta de privacidade.',
          'Esta opção está errada. Os computadores não detetam nem desligam com papéis.',
          'Esta opção está errada. Não há qualquer relação entre papeis colados e baterias.',
        ],
        en: [
          'Correct answer! Leaving keys visible allows anyone to view and use them without permission.',
          'Incorrect. Paper glue does not damage pixels; the real hazard is lack of privacy.',
          'Incorrect. Computers do not detect or shut down due to paper notes.',
          'Incorrect. Sticky notes have no bearing on battery life.',
        ],
      },
    },
    {
      id: 'pass-q7',
      question: {
        pt: 'A Sofia recebeu uma mensagem a dizer: "Urgente! Envia-nos a tua palavra-passe nas próximas 2 horas ou a tua conta do jogo será apagada!". Como deve a Sofia classificar esta mensagem?',
        en: 'Sofia received a message saying: "Urgent! Send us your password in the next 2 hours or your game account will be deleted!". How should Sofia classify this message?',
      },
      options: {
        pt: [
          'Uma tentativa de roubo de conta (phishing) e nunca deve revelar a palavra-passe',
          'Uma mensagem oficial de apoio ao cliente que deve ser respondida rapidamente',
          'Um aviso importante da escola para atualizar os dados',
          'Uma prenda de aniversário antecipada',
        ],
        en: [
          'A phishing attempt to steal her account and she must never reveal her password',
          'An official customer support message that must be answered quickly',
          'An important school notice to update student records',
          'An early birthday gift',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Nenhum serviço legítimo ou escola pede a tua palavra-passe por email ou mensagem. Trata-se sempre de uma tentativa de burla/phishing.',
        en: 'No legitimate service or school ever asks for your password via email or message. It is always a phishing scam.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Mensagens urgentes a pedir palavras-passe são falsas e visam roubar contas.',
          'Esta opção está errada. O apoio ao cliente verdadeiro nunca pede a tua palavra-passe secreta.',
          'Esta opção está errada. As escolas usam canais oficiais e nunca pedem chaves por mensagens alarmistas.',
          'Esta opção está errada. Trata-se de um ataque informático e não de uma prenda.',
        ],
        en: [
          'Correct answer! Urgent messages demanding passwords are fake attempts to hijack accounts.',
          'Incorrect. Real customer support never requests your secret password.',
          'Incorrect. Schools use official channels and never request account keys via alarmist messages.',
          'Incorrect. It is a cyber threat, not a gift.',
        ],
      },
    },
    {
      id: 'pass-q8',
      question: {
        pt: 'O Gabriel quer utilizar uma aplicação para guardar todas as suas palavras-passe complexas de forma encriptada num cofre digital seguro. Que ferramenta é esta?',
        en: 'Gabriel wants to use an application to store all his complex passwords encrypted in a secure digital vault. What tool is this?',
      },
      options: {
        pt: [
          'Um Gestor de Palavras-passe (Password Manager)',
          'Um ficheiro de texto aberto guardado na área de trabalho',
          'Uma calculadora científica',
          'Um programa de edição de vídeo',
        ],
        en: [
          'A Password Manager',
          'An open plain text file saved on the desktop',
          'A scientific calculator',
          'A video editing software',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Um Gestor de Palavras-passe guarda e protege todas as tuas palavras-passe sob uma única chave-mestra forte.',
        en: 'A Password Manager encrypts and protects all your passwords under a single strong master key.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! O gestor de palavras-passe cria e guarda chaves seguras num cofre encriptado.',
          'Esta opção está errada. Um ficheiro de texto aberto na área de trabalho não tem qualquer encriptação.',
          'Esta opção está errada. A calculadora faz operações matemáticas e não guarda as tuas credenciais (as tuas palavras-passe ou dados de acesso).',
          'Esta opção está errada. O editor de vídeo serve para criar filmes e não para gerir palavras-passe.',
        ],
        en: [
          'Correct answer! A password manager generates and stores strong keys in an encrypted vault.',
          'Incorrect. A plain text file on the desktop lacks encryption.',
          'Incorrect. A calculator performs mathematical operations, not password management.',
          'Incorrect. Video editors produce movies, not security credential vaults.',
        ],
      },
    },
    {
      id: 'pass-q9',
      question: {
        pt: 'A Carolina reparou que um colega escolheu a palavra-passe "123456" para a sua conta. Porque é que sequências como "123456" ou "qwerty" são extremamente perigosas?',
        en: 'Carolina noticed a classmate chose the password "123456" for his account. Why are sequences like "123456" or "qwerty" extremely dangerous?',
      },
      options: {
        pt: [
          'Porque são os primeiros padrões de teclado testados por programas automáticos de hackers em milissegundos',
          'Porque gastam mais memória do computador',
          'Porque bloqueiam o ecrã do monitor após 10 minutos',
          'Porque apagam o sistema operativo',
        ],
        en: [
          'Because they are standard keyboard patterns tested in milliseconds by automated hacking scripts',
          'Because they consume more computer memory',
          'Because they lock the monitor screen after 10 minutes',
          'Because they erase the operating system',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Sequências de teclas adjacentes (como 123456 ou qwerty) constam do topo de todas as listas de passwords vulneráveis.',
        en: 'Sequential adjacent keys (like 123456 or qwerty) rank at the top of all vulnerable password lists.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! Programas automáticos adivinham sequências óbvias instantaneamente.',
          'Esta opção está errada. O tamanho e tipo da palavra-passe não alteram a memória RAM do computador.',
          'Esta opção está errada. Palavras-passe fracas não bloqueiam o monitor por temporizador.',
          'Esta opção está errada. Uma palavra-passe fraca expõe a conta mas não apaga o sistema operativo.',
        ],
        en: [
          'Correct answer! Automated scripts crack obvious sequences instantly.',
          'Incorrect. Password choice has no effect on RAM consumption.',
          'Incorrect. Weak passwords do not trigger screen lock timers.',
          'Incorrect. A weak password exposes account data, but does not erase the OS.',
        ],
      },
    },
    {
      id: 'pass-q10',
      question: {
        pt: 'O Martim recebeu uma SMS com um código de confirmação de segurança que ele NÃO pediu. Qual é a atitude correta do Martim?',
        en: 'Martim received an SMS with a security confirmation code that he DID NOT request. What is Martim’s correct response?',
      },
      options: {
        pt: [
          'Não partilhar o código com ninguém, avisar os pais ou professor e verificar se alguém está a tentar aceder à sua conta',
          'Enviar o código para o primeiro contacto desconhecido que pedir',
          'Publicar o código nas histórias das redes sociais',
          'Responder à SMS a enviar a palavra-passe',
        ],
        en: [
          'Do not share the code with anyone, inform parents or teacher, and check if someone is trying to access his account',
          'Forward the code to the first unknown contact asking for it',
          'Post the code on social media stories',
          'Reply to the SMS providing his password',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Receber um código não solicitado indica que alguém pode estar a tentar recuperar ou invadir a tua conta. Nunca partilhes códigos de verificação!',
        en: 'Receiving an unsolicited code means someone may be trying to recover or breach your account. Never share verification codes!',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! O código é a tua proteção; partilhá-lo permitiria ao invasor entrar na tua conta.',
          'Esta opção está errada. Dar o código ao invasor permite-lhe concluir o roubo da tua conta.',
          'Esta opção está errada. Publicar o código expõe a tua verificação a todos na Internet.',
          'Esta opção está errada. Revelar a palavra-passe dá acesso total ao atacante.',
        ],
        en: [
          'Correct answer! The code is your defense; sharing it allows the attacker to complete the breach.',
          'Incorrect. Handing the code to an attacker lets them complete the account hijack.',
          'Incorrect. Posting codes online exposes verification data publicly.',
          'Incorrect. Revealing your password grants full control to the attacker.',
        ],
      },
    },
  ],
};
