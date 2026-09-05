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
    pt: 'A tua palavra-passe é a chave que protege a tua vida digital: mensagens, fotografias, trabalhos da escola e jogos! Aprende a construir palavras-passe fortes e difíceis de adivinhar combinando comprimento, letras, números e símbolos, e descobre por que motivo não deves partilhar as tuas palavras-passe com colegas ou amigos.',
    en: 'Your password is the key to your digital identity: messages, photos, school work, and games! Learn how to forge strong and hard-to-guess passwords, and why passwords should stay private and not be shared with peers.',
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
      eyebrow: { pt: 'Atenção!', en: 'Attention!' },
      h: { pt: 'Características de uma palavra-passe segura', en: 'Traits of a strong password' },
      body: {
        pt: 'Uma boa palavra-passe deve ser longa e difícil de adivinhar:<ul><li>Ter um bom comprimento (pelo menos 10 a 12 caracteres).</li><li>Pode misturar letras maiúsculas, minúsculas, números e símbolos, ou formar uma frase difícil de adivinhar.</li><li>Não conter o teu nome, data de nascimento ou dados pessoais óbvios.</li><li>Não ser uma sequência simples, como "123456" ou "abcdef".</li><li>Ser diferente para cada conta que uses.</li></ul>',
        en: 'A robust password should be long and hard to guess:<ul><li>Have good length (at least 10 to 12 characters).</li><li>Mix uppercase and lowercase letters, numbers, and symbols, or use a memorable passphrase.</li><li>Avoid your name, birthdate, or obvious personal details.</li><li>Never use predictable patterns like "123456" or "abcdef".</li><li>Be unique across different online accounts.</li></ul>',
      },
      icon: '🛡️',
    },
    {
      eyebrow: { pt: 'Sabias que...?', en: 'Did you know...?' },
      h: { pt: 'Usar dados pessoais é arriscado', en: 'Using personal data is risky' },
      body: {
        pt: 'Palavras-passe como o teu nome, a tua data de nascimento ou o nome do teu animal de estimação são fáceis de descobrir para quem te conhece um pouco — por isso são consideradas fracas, mesmo que pareçam difíceis de adivinhar.',
        en: 'Passcodes featuring your first name, birthday, or pet’s name are remarkably easy for acquaintances to guess. Consequently, cybersecurity experts classify them as weak, no matter how clever they seem.',
      },
      icon: '⚠️',
    },
    {
      eyebrow: { pt: 'Vamos pensar', en: "Let's think" },
      h: { pt: 'Não partilhes as tuas palavras-passe', en: 'Do not share your passwords' },
      body: {
        pt: 'Não partilhes as tuas palavras-passe com amigos ou colegas. Se precisares de ajuda com uma conta ou se te esqueceres do acesso, fala com os teus pais ou com o teu professor.',
        en: 'Do not share your passwords with classmates or friends. If you need help with an account or forget your access, speak with a responsible adult or your teacher.',
      },
      icon: '🤫',
    },
    {
      eyebrow: { pt: 'Exemplo', en: 'Example' },
      h: { pt: 'Uma conta, uma palavra-passe', en: 'One account, one unique key' },
      body: {
        pt: 'Se usares a mesma palavra-passe em todas as contas e alguém a descobrir num sítio menos seguro, pode aceder a todas as tuas contas. Por isso, o ideal é ter palavras-passe diferentes para cada serviço.',
        en: 'If you reuse the same password everywhere and one service gets compromised, attackers gain instant access to all your accounts. Using unique passcodes safeguards the rest of your digital presence.',
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
        pt: 'Comprimento adequado, variedade de carateres e palavras difíceis de adivinhar.',
        en: 'Good length, character variety, and hard-to-guess combinations.',
      },
      icon: '🛡️',
      explanation: {
        pt: [
          'Uma palavra-passe fraca é como deixar a porta de casa aberta: programas automáticos ou terceiros conseguem adivinhá-la com facilidade.',
          'Regra 1 — Comprimento Adequado: deve ter pelo menos 10 a 12 carateres. Quanto mais comprida, muito mais difícil é de ser adivinhada.',
          'Regra 2 — Variedade e Criatividade: podes juntar letras MAIÚSCULAS (A-Z), letras minúsculas (a-z), algarismos (0-9) e símbolos especiais (!, #, $, %, @, *), ou criar uma frase-passe com várias palavras.',
          'O que NUNCA usar: palavras do dicionário simples (como "chocolate" ou "amor"), sequências óbvias ("123456" ou "qwerty") ou informações pessoais (como o teu nome, a tua data de nascimento ou o nome do teu animal de estimação).',
        ],
        en: [
          'A weak password is like leaving your front door unlocked: automated tools can easily guess it.',
          'Rule 1 — Length: at least 10 to 12 characters. Longer passwords are substantially harder to guess.',
          'Rule 2 — Character Variety: combine UPPERCASE (A-Z), lowercase (a-z), numbers (0-9), and symbols, or use a memorable passphrase.',
          'What NEVER to use: common dictionary words, obvious keyboard patterns ("123456", "qwerty"), or personal info (birthday, pet name).',
        ],
      },
      example: {
        title: {
          pt: 'A técnica da frase-passe da Mariana',
          en: 'Mariana’s passphrase technique',
        },
        scenario: {
          pt: 'A Mariana quer criar uma palavra-passe fácil de memorizar mas muito forte. Escolheu a frase: "O meu gato Tobias adora peixe em 2026!".',
          en: 'Mariana wants a memorable yet strong password. She picked the sentence: "O meu gato Tobias adora peixe em 2026!".',
        },
        tip: {
          pt: 'Pegou nas iniciais de cada palavra e juntou os números e o ponto de exclamação: "OmgTa!pe26". Tem 10 carateres, maiúsculas, minúsculas, número e símbolo!',
          en: 'She took the first letter of each word plus numbers and exclamation: "OmgTa!pe26". 10 chars with varied cases, numbers, and symbols!',
        },
      },
      funFact: {
        pt: 'Sabias que sequências simples ou palavras do dicionário são testadas quase instantaneamente por computadores, enquanto uma palavra-passe longa e com diferentes tipos de carateres é muito mais difícil de adivinhar?',
        en: 'Did you know simple sequences or dictionary words are tested very quickly by computers, whereas long and varied passphrases are much harder to uncover?',
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
            pt: 'Qual destas palavras-passe é a mais ROBUSTA e segura?',
            en: 'Which of the following is the STRONGEST and most secure password?',
          },
          options: {
            pt: [
              'K#9mP!x7$Lq2',
              '12345678',
              'portugal2026',
              'palavrapasse',
            ],
            en: [
              'K#9mP!x7$Lq2',
              '12345678',
              'portugal2026',
              'palavrapasse',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! "K#9mP!x7$Lq2" tem mais de 10 carateres, mistura maiúsculas, minúsculas, números e símbolos sem palavras óbvias.',
            en: 'Exactly! "K#9mP!x7$Lq2" combines uppercase, lowercase, numbers, and special symbols over 10 characters.',
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
          'Autenticação de Dois Fatores (2FA): é uma camada extra que pede uma confirmação adicional (como um código enviado para o telemóvel) além da palavra-passe. Mesmo que alguém descubra a tua palavra-passe, não consegue entrar facilmente!',
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
        pt: 'Sabias que serviços legítimos e plataformas escolares NUNCA te pedem a palavra-passe por email, telefone ou mensagem? Se alguém te pedir, deves desconfiar de imediato.',
        en: 'Did you know legitimate services and school portals NEVER ask for your password via email, phone, or message? Anyone requesting it should be treated with suspicion.',
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
              'Deixar o ecrã aberto e chamar os colegas para verem',
              'Colocar um livro em cima do teclado',
              'Desligar o cabo de eletricidade da tomada da parede',
            ],
            en: [
              'Lock the screen or log out to prevent unauthorized access',
              'Leave it wide open and invite classmates over',
              'Put a textbook on the keyboard',
              'Yank the power cord out of the wall',
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
        desc: 'Escolhe qual das seguintes opções constitui uma palavra-passe verdadeiramente segura.',
        data: {
          questions: [
            {
              q: 'Qual destas palavras-passe é a mais difícil de adivinhar por um pirata informático?',
              opts: [
                'B!9q$L7m#zP2',
                '12345678',
                'maria2014',
                'palavrapasse'
              ],
              c: 0,
              e: 'Misturar bom comprimento com maiúsculas, minúsculas, números e símbolos cria uma combinação muito forte e difícil de adivinhar.'
            },
            {
              q: 'Porque é que não deves usar a tua data de nascimento ou o nome do teu animal de estimação como palavra-passe?',
              opts: [
                'Porque são fáceis de descobrir por quem te conhece ou nas redes sociais',
                'Porque os computadores não aceitam números',
                'Porque consomem mais bateria no telemóvel',
                'Porque a Internet fica mais lenta'
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
      id: 'jogo-pass-order',
      themeId: 'palavras-passe',
      number: 3,
      title: { pt: '🧩 Cria uma palavra-passe segura', en: '🧩 Build a Secure Password' },
      shortDesc: { pt: 'Ordena os passos para criar uma chave forte e segura.', en: 'Order the steps to build a strong password.' },
      icon: '🧩',
      durationMinutes: 4,
      points: 20,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Cria uma palavra-passe segura',
        icon: '🧩',
        xp: 20,
        desc: 'Coloca os critérios de robustez pela ordem ideal.',
        data: {
          items: [
            'Usar um comprimento mínimo de 12 carateres',
            'Misturar letras maiúsculas e minúsculas',
            'Incluir números e símbolos especiais (!, #, $)',
            'Evitar dados pessoais como datas ou nomes'
          ]
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
            { left: 'password123', right: 'Extremamente fraca e vulnerável' },
            { left: 'Aka7#mP9$kL2', right: 'Forte e altamente segura' },
            { left: 'futebol2024', right: 'Fácil de adivinhar por dicionário' },
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
      id: 'pass-q1',
      question: {
        pt: 'Qual é o comprimento mínimo recomendado para uma palavra-passe considerada segura?',
        en: 'What is the recommended minimum length for a secure password?',
      },
      options: {
        pt: [
          'Pelo menos 10 a 12 carateres',
          '3 letras',
          '1 algarismo',
          'Não importa o comprimento, desde que seja uma palavra fácil',
        ],
        en: [
          'At least 10 to 12 characters',
          '3 letters',
          '1 digit',
          'Length does not matter as long as it is memorable',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Palavras-passe com 10 ou mais carateres oferecem grande resistência contra tentativas automáticas de adivinhação.',
        en: 'Passwords of 10+ characters provide strong resistance against automated brute-force attacks.',
      },
    },
    {
      id: 'pass-q2',
      question: {
        pt: 'Quais os 4 tipos de carateres que devem ser misturados numa palavra-passe forte?',
        en: 'What 4 character types should be combined in a strong password?',
      },
      options: {
        pt: [
          'Maiúsculas, minúsculas, números e símbolos especiais (!, #, $, %)',
          'Apenas letras minúsculas do abecedário',
          'Apenas algarismos de 1 a 9',
          'Apenas emojis coloridos',
        ],
        en: [
          'Uppercase, lowercase, numbers, and special symbols (!, #, $, %)',
          'Only lowercase letters',
          'Only numbers 1 through 9',
          'Only colored emojis',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A diversidade entre maiúsculas, minúsculas, números e símbolos torna a palavra-passe muito mais resistente.',
        en: 'Combining distinct character classes dramatically expands password strength.',
      },
    },
    {
      id: 'pass-q3',
      question: {
        pt: 'Porque é que não deves usar a mesma palavra-passe em todos os teus jogos e contas?',
        en: 'Why shouldn’t you use the same password across all your accounts and games?',
      },
      options: {
        pt: [
          'Porque se uma conta for descoberta, o invasor terá acesso a todas as tuas outras contas',
          'Porque o teclado fica gasto nas mesmas teclas',
          'Porque os computadores não permitem usar a mesma letra duas vezes',
          'Porque a ligação à Internet fica mais lenta',
        ],
        en: [
          'Because if one service is breached, the attacker gains entry to all your other accounts',
          'Because the keyboard wears out on the same keys',
          'Because computers disallow using identical letters',
          'Because Internet speeds decrease',
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
          'Ter de escrever a palavra-passe duas vezes seguidas muito depressa',
          'Usar dois teclados ao mesmo tempo com as duas mãos',
          'Pagar o dobro do preço pelo computador',
        ],
        en: [
          'An extra security layer requiring your password plus a temporary secondary verification code',
          'Typing the password twice in rapid succession',
          'Using two keyboards simultaneously with both hands',
          'Paying double the price for hardware',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A 2FA combina algo que sabes (palavra-passe) com algo que tens (telemóvel), garantindo máxima proteção.',
        en: '2FA combines something you know (password) with something you possess (device token).',
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
          'Uma pessoa contratada para vigiar os teus cadernos na escola',
          'Um livro vendido nas bancas de jornais com palavras-passe já feitas',
          'Um vírus que altera as letras no teclado',
        ],
        en: [
          'A secure application storing encrypted passwords in a protected digital vault',
          'A security guard hired to watch your school bags',
          'A bookstore booklet with pre-made passwords',
          'A virus shuffling keyboard keys',
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
          'Porque o teclado avaria se escreveres teclas seguidas',
          'Porque a tecla Q tem pouca tinta',
          'Porque essas teclas não existem em computadores portáteis',
        ],
        en: [
          'Because they are standard keyboard patterns tested in milliseconds by cracking scripts',
          'Because the keyboard breaks when typing sequential keys',
          'Because the letter Q runs out of ink',
          'Because those keys do not exist on laptops',
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
          'Ocupa menos espaço no disco do computador',
          'Permite que todas as pessoas adivinhem a tua palavra-passe',
          'Faz com que o computador trabalhe sem eletricidade',
        ],
        en: [
          'It is easy for you to remember, yet long and computationally hard to crack',
          'Takes less hard drive storage space',
          'Allows everyone to guess it easily',
          'Operates without electrical power',
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
        pt: 'Porque é que nunca deves partilhar a tua palavra-passe num chat de grupo com colegas da turma?',
        en: 'Why should you never share your password in a class group chat?',
      },
      options: {
        pt: [
          'Porque fica gravada no histórico da conversa e qualquer membro do grupo ou intruso pode usá-la',
          'Porque gasta o saldo de dados do telemóvel',
          'Porque as letras ficam invisíveis no chat',
          'Não tem qualquer perigo',
        ],
        en: [
          'Because it remains in the chat log accessible to every group member or phone snooper',
          'Because it drains cellular mobile data plans',
          'Because characters become invisible in chats',
          'It poses zero risk',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As mensagens em grupo podem ser lidas por muitas pessoas e ficam gravadas nos telemóveis de todos.',
        en: 'Chat messages are stored permanently on every participant’s device and can easily leak.',
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
          'Escrevê-la com cuidado sem a dizer em voz alta, verificando que o projetor não a mostra a toda a turma',
          'Gritar a palavra-passe bem alto para a turma toda ouvir',
          'Escrever a palavra-passe no quadro com marcador permanente',
          'Pedir a um colega para adivinhar a tua palavra-passe',
        ],
        en: [
          'Type it quietly without reciting aloud, ensuring the projector isn’t displaying it in plain text',
          'Shout your password so everyone can hear',
          'Write it on the whiteboard with permanent marker',
          'Ask a peer to guess your password aloud',
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
        pt: 'Bom comprimento, carateres variados, contas com chaves únicas e privacidade garantem a melhor proteção!',
        en: 'Good length, variety, unique keys per account, and privacy ensure the best protection!',
      },
    },
  ],
};
