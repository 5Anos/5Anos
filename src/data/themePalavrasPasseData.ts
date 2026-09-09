import { ThemeDefinition } from '../types';

export const themePalavrasPasseData: ThemeDefinition = {
  id: 'palavras-passe',
  number: 4,
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
            pt: 'Correto! Uma frase-passe longa e difícil de adivinhar é muito mais segura do que sequências previsíveis, palavras comuns ou dados pessoais.',
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
          'Autenticação de Dois Fatores (2FA): acrescenta uma camada adicional de segurança, pedindo uma confirmação suplementar (como um código enviado para o telemóvel ou gerado por uma aplicação) além da palavra-passe.',
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
            pt: 'Correto! As palavras-passe são privadas e não devem ser partilhadas com colegas. Se precisares de ajuda, fala com os teus pais ou professor.',
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
          'Gestor de Palavras-passe: é uma aplicação que funciona como um cofre digital protegido. Guarda todas as tuas palavras-passe cifradas e só precisas de memorizar uma única chave-mestra segura.',
          'Troca quando necessário: se receberes um alerta de segurança ou se usares um computador partilhado e te esqueceres de terminar a sessão, altera a tua palavra-passe.',
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
            pt: 'Excelente! Bloquear a sessão impede que alguém utilize a tua conta indevidamente.',
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
      points: 20,
      type: 'what_would_you_do',
      gameData: {
        type: 'mc',
        title: 'Qual é a mais segura?',
        icon: '🔑',
        xp: 20,
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
      points: 15,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Verdadeiro ou Falso: palavras-passe',
        icon: '⚡',
        xp: 15,
        desc: 'Classifica as afirmações sobre a proteção de palavras-passe.',
        data: {
          items: [
            { s: 'Deves emprestar a tua palavra-passe ao teu melhor amigo para demonstrar confiança.', a: false, e: 'Não partilhes palavras-passe com colegas ou amigos. Se precisares de ajuda, fala com um adulto responsável ou com o professor!' },
            { s: 'Usar a mesma palavra-passe em vários sites diferentes é um risco.', a: true, e: 'Correto! Se um serviço for comprometido, todas as outras contas podem ficar em perigo.' },
            { s: 'Ativar a autenticação de dois fatores (2FA) adiciona uma barreira extra de proteção.', a: true, e: 'Correto! Mesmo que descubram a palavra-passe, é necessária uma confirmação adicional.' }
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
      points: 20,
      type: 'password_builder',
      gameData: {
        type: 'password_builder',
        title: 'Constrói uma Palavra-passe Segura',
        icon: '🧩',
        xp: 20,
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
      points: 20,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Segura ou Insegura?',
        icon: '🔗',
        xp: 20,
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
      title: { pt: '🏆 Quiz de Aprendizagem: Palavras-passe', en: '🏆 Learning Quiz: Passwords' },
      shortDesc: { pt: 'Avaliação final abrangente sobre o Tema 3.', en: 'Comprehensive final assessment on Topic 3.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 50,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'pass-q3',
      question: {
        pt: 'Porque é que não deves usar a mesma palavra-passe em todos os teus jogos e contas?',
        en: 'Why shouldn’t you use the same password across all your accounts and games?',
      },
      options: {
        pt: [
          'Porque se uma conta for descoberta, o invasor terá acesso a todas as tuas outras contas',
          'Porque os navegadores impedem o início de sessão se a chave for repetida',
          'Porque aumenta o consumo de tráfego de rede nas contas associadas',
          'Porque a encriptação de ficheiros só funciona com palavras-passe renovadas em cada acesso',
        ],
        en: [
          'Because if one service is breached, the attacker gains entry to all your other accounts',
          'Because web browsers prevent login if credentials are reused',
          'Because network traffic consumption increases across accounts',
          'Because file encryption only works when resetting passwords per login',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Reutilizar palavras-passe significa que uma única fuga de dados compromete todas as tuas contas digitais.',
        en: 'Credential stuffing relies on repeated passwords across different platforms.',
      },
    },
    {
      id: 'pass-q4',
      question: {
        pt: 'O que deves responder se o teu melhor amigo te pedir a tua palavra-passe para te passar de nível num jogo?',
        en: 'What should you reply if your best friend asks for your password to level up in a game?',
      },
      options: {
        pt: [
          'Recusar educadamente, explicando que as palavras-passe são privadas, e combinar jogar juntos presencialmente',
          'Dar a palavra-passe imediatamente porque os melhores amigos sabem tudo',
          'Escrever a palavra-passe no quadro da sala de aula',
          'Dar a palavra-passe e pedir a dele em troca',
        ],
        en: [
          'Politely decline, explaining credentials are strictly private, and offer to play in person',
          'Hand it over immediately because friends share everything',
          'Write it on the classroom chalkboard',
          'Give it and demand theirs in return',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As palavras-passe não se partilham com colegas ou amigos, prevenindo roubos de conta e mal-entendidos.',
        en: 'Passwords must not be shared with peers, avoiding accidental loss or friendship friction.',
      },
    },
    {
      id: 'pass-q5',
      question: {
        pt: 'O que é a Autenticação de Dois Fatores (2FA)?',
        en: 'What is Two-Factor Authentication (2FA)?',
      },
      options: {
        pt: [
          'Uma segurança adicional que exige a palavra-passe mais um código temporário (ex.: enviado por SMS ou app)',
          'Uma ferramenta para recuperar ficheiros apagados da reciclagem',
          'A obrigatoriedade de alterar a palavra-passe todos os dias ao ligar o computador',
          'Um protocolo que permite entrar na conta sem qualquer palavra-passe',
        ],
        en: [
          'An extra security layer requiring your password plus a temporary secondary verification code',
          'A tool to recover deleted files from the recycling bin',
          'A mandatory requirement to change passwords daily on startup',
          'A protocol enabling account login with no password at all',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A 2FA combina algo que sabes (palavra-passe) com algo que tens (como um telemóvel ou código de verificação), acrescentando uma camada adicional de segurança.',
        en: '2FA combines something you know (password) with something you possess (device code), adding an extra layer of security.',
      },
    },
    {
      id: 'pass-q6',
      question: {
        pt: 'Qual das seguintes informações NUNCA deves incluir na tua palavra-passe?',
        en: 'Which of the following should NEVER be part of your password?',
      },
      options: {
        pt: [
          'O teu nome, data de nascimento, número de telefone ou nome da tua escola',
          'Símbolos como ! ou #',
          'Letras maiúsculas variadas',
          'Algarismos aleatórios intercalados',
        ],
        en: [
          'Your name, date of birth, phone number, or school name',
          'Special symbols like ! or #',
          'Varied uppercase letters',
          'Random interspersed digits',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Informações pessoais são facilmente descobertas através de redes sociais ou conversa.',
        en: 'Personal details are predictable and easily scraped from social channels.',
      },
    },
    {
      id: 'pass-q7',
      question: {
        pt: 'Onde NUNCA deves apontar as tuas palavras-passe?',
        en: 'Where should you NEVER write down your passwords?',
      },
      options: {
        pt: [
          'Num post-it de papel colado no monitor ou debaixo do teclado',
          'Num gestor de palavras-passe encriptado e protegido por chave-mestra',
          'Na tua própria memória',
          'Num caderno guardado a sete chaves pelos teus pais',
        ],
        en: [
          'On a paper sticky note glued to your screen bezel or under the keyboard',
          'Inside an encrypted password manager protected by master key',
          'In your own memory',
          'In a secure family notebook managed by parents',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Colar papéis com palavras-passe na secretária deixa as tuas contas à mercê de qualquer pessoa que passe por perto.',
        en: 'Visible sticky notes leave accounts vulnerable to shoulder surfing and casual physical theft.',
      },
    },
    {
      id: 'pass-q8',
      question: {
        pt: 'O que é um "Gestor de Palavras-passe"?',
        en: 'What is a "Password Manager"?',
      },
      options: {
        pt: [
          'Uma aplicação segura que guarda todas as tuas palavras-passe cifradas num cofre digital',
          'Um ficheiro de texto partilhado na nuvem acessível a todos os contactos',
          'Um programa que desativa a necessidade de palavras-passe nos sites',
          'Uma extensão de navegador para descarregar jogos protegidos',
        ],
        en: [
          'A secure application storing encrypted passwords in a protected digital vault',
          'A shared cloud text document accessible to all contacts',
          'A software that removes the requirement for passwords on websites',
          'A browser extension used to download protected games',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Um gestor de palavras-passe gera e guarda chaves complexas com criptografia forte.',
        en: 'Password managers generate, store, and autofill encrypted credentials securely.',
      },
    },
    {
      id: 'pass-q9',
      question: {
        pt: 'Porque é que sequências como "123456", "qwerty" ou "abcde" são péssimas palavras-passe?',
        en: 'Why are sequences like "123456", "qwerty", or "abcde" terrible passwords?',
      },
      options: {
        pt: [
          'Porque são padrões de teclado universais que programas automáticos testam em milissegundos',
          'Porque os sistemas operativos bloqueiam essas combinações ao fim de 2 dias',
          'Porque geram erros de compatibilidade entre diferentes sistemas operativos',
          'Porque desativam o funcionamento da placa de rede',
        ],
        en: [
          'Because they are standard keyboard patterns tested in milliseconds by cracking scripts',
          'Because operating systems block those combinations after 2 days',
          'Because they trigger compatibility errors between operating systems',
          'Because they disable the network card interface',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Estas sequências constam no topo de todos os dicionários de ataque informático.',
        en: 'Standard keyboard walks are among the first tested by automated breach algorithms.',
      },
    },
    {
      id: 'pass-q10',
      question: {
        pt: 'O que deves fazer se receberes uma mensagem no telemóvel com um código de segurança que tu NÃO pediste?',
        en: 'What should you do if you receive a security SMS code that you DID NOT request?',
      },
      options: {
        pt: [
          'Não partilhar o código com ninguém e verificar a segurança da conta (alguém pode estar a tentar entrar)',
          'Enviar o código para o primeiro desconhecido que pedir',
          'Publicar o código nas redes sociais',
          'Apagar o número dos teus pais do telemóvel',
        ],
        en: [
          'Never share the code and verify account security (someone might be trying to breach it)',
          'Forward the code to strangers requesting it',
          'Publish the code on social media stories',
          'Delete your parents’ contacts from your phone',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Se não pediste o código, alguém pode ter descoberto a tua palavra-passe! O código impediu o acesso. Altera a tua palavra-passe com a ajuda de um adulto.',
        en: 'An unsolicited code indicates your password was entered. Change credentials immediately.',
      },
    },
    {
      id: 'pass-q11',
      question: {
        pt: 'Como deves reagir se um jogo online prometer "moedas grátis se introduzires o teu email e palavra-passe"?',
        en: 'How should you react if a website promises "free in-game currency if you enter your email and password"?',
      },
      options: {
        pt: [
          'Reconhecer que é uma fraude (scam de roubo de conta) e fechar o site de imediato',
          'Colocar a palavra-passe para ficar rico no jogo',
          'Dar também a palavra-passe do email da escola',
          'Convidar toda a turma para pôr os dados também',
        ],
        en: [
          'Recognize it as an account-stealing scam and close the site immediately',
          'Enter credentials to gain free in-game riches',
          'Provide school email credentials as well',
          'Invite the whole class to enter credentials',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Promessas de moedas ou vantagens gratuitas em troca de palavras-passe são sempre armadilhas de roubo de conta.',
        en: 'Offers of free in-game currency in exchange for credentials are cyber scams.',
      },
    },
    {
      id: 'pass-q12',
      question: {
        pt: 'Qual é o benefício de usar uma "frase-passe" (passphrase)?',
        en: 'What is the advantage of using a passphrase?',
      },
      options: {
        pt: [
          'É fácil de memorizar para ti, mas muito comprida e muito difícil de adivinhar para terceiros',
          'Dispensa a necessidade de proteger o acesso aos dispositivos',
          'Permite recuperar ficheiros perdidos no sistema operativo',
          'Garante ligação à Internet a velocidade superior',
        ],
        en: [
          'It is easy for you to remember, yet long and computationally hard to crack',
          'Removes the need to protect device access',
          'Enables recovery of lost operating system files',
          'Ensures higher speed Internet connections',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Uma frase como "O_meu_gato_tem_99_vidas!" é simples de lembrar e tem altíssima segurança.',
        en: 'Passphrases provide high entropy with superior human memorability.',
      },
    },
    {
      id: 'pass-q13',
      question: {
        pt: 'O que deves fazer se usares o computador de um colega ou da biblioteca escolar?',
        en: 'What should you do when using a classmate’s PC or school library computer?',
      },
      options: {
        pt: [
          'Não selecionar a opção "Lembrar palavra-passe" e terminar a sessão (Logout) ao terminar',
          'Guardar a palavra-passe no navegador para facilitar o próximo utilizador',
          'Deixar a janela aberta e ir embora a correr',
          'Mudar o fundo do ambiente de trabalho para uma fotografia tua',
        ],
        en: [
          'Uncheck "Remember password" and always log out when done',
          'Save the password in the public browser for the next person',
          'Leave tabs wide open and walk away',
          'Change the desktop wallpaper to your selfie',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Terminar sessão impede que quem use o computador a seguir tenha acesso aos teus dados.',
        en: 'Logging out and declining browser credential storage prevents unauthorized session hijacking.',
      },
    },
    {
      id: 'pass-q14',
      question: {
        pt: 'Se te esqueceres da palavra-passe da tua conta escolar, o que deves fazer?',
        en: 'If you forget the password for your school account, what should you do?',
      },
      options: {
        pt: [
          'Pedir ajuda ao teu professor de TIC ou ao responsável pelo sistema da escola para a redefinir',
          'Tentar adivinhar 500 vezes seguidas até bloquear o computador',
          'Criar uma conta nova com um nome falso para não teres de admitir que te esqueceste',
          'Pedir a palavra-passe emprestada a um colega e usar a conta dele durante as aulas',
        ],
        en: [
          'Ask your ICT teacher or the school IT administrator to reset it safely',
          'Try guessing 500 times in a row until the machine locks up',
          'Create a fake-named new account to avoid admitting you forgot it',
          'Borrow a classmate’s password and use their account during class',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Quando te esqueces da palavra-passe da escola, o procedimento seguro e correto é falar com o professor para pedir a sua recuperação.',
        en: 'When you forget your school password, the safe procedure is contacting your teacher to request a secure reset.',
      },
    },
    {
      id: 'pass-q15',
      question: {
        pt: 'Se o teu professor de TIC te pedir para demonstrares um trabalho no computador da sala, o que deves fazer com a tua palavra-passe?',
        en: 'If your ICT teacher asks you to present work on the classroom projector, what should you do with your password?',
      },
      options: {
        pt: [
          'Escrevê-la com cuidado sem a dizer em voz alta, verificando que o ecrã não a revela em texto legível',
          'Ditar a palavra-passe em voz alta para o colega ao lado a escrever',
          'Partilhar temporariamente a palavra-passe no chat da turma',
          'Desativar a proteção por palavra-passe da tua conta escolar',
        ],
        en: [
          'Type it quietly without reciting aloud, ensuring the screen does not display plain text',
          'Dictate the password aloud for a peer to type it in',
          'Share the password temporarily in the class chat',
          'Disable password protection on your school account',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Nunca deves verbalizar nem projetar palavras-passe para a sala de aula.',
        en: 'Never verbalize or project private credentials in public spaces.',
      },
    },
    {
      id: 'pass-q16',
      question: {
        pt: 'Qual é o resumo fundamental da segurança de palavras-passe?',
        en: 'What is the ideal summary of password safety?',
      },
      options: {
        pt: [
          'Comprida, difícil de adivinhar, diferente para cada conta e não partilhada com colegas!',
          'Curta, fácil, igual em tudo e partilhada com todos os amigos',
          '1234 em todas as contas da escola',
          'Não ter palavras-passe nenhumas',
        ],
        en: [
          'Long, hard to guess, unique for every service, and not shared with peers!',
          'Short, simple, reused everywhere, and shared with friends',
          '1234 across every school account',
          'Using zero passwords anywhere',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Uma palavra-passe longa e difícil de adivinhar, diferente das utilizadas noutras contas, ajuda a proteger melhor as tuas contas.',
        en: 'A long and hard-to-guess password, different from those used in other accounts, helps better protect your accounts.',
      },
    },
  ],
};
