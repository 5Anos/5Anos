import { ThemeDefinition } from '../types';

export const themePalavrasPasseData: ThemeDefinition = {
  id: 'palavras-passe',
  number: 3,
  title: {
    pt: 'Palavras-passe Seguras',
    en: 'Secure Passwords',
  },
  tagline: {
    pt: 'Aprende a criar e proteger palavras-passe.',
    en: 'Learn how to create and safeguard strong passwords.',
  },
  intro: {
    pt: 'A tua palavra-passe é a chave mestra que protege a tua vida digital: mensagens, fotografias, trabalhos da escola e jogos! Aprende a construir chaves digitais inquebráveis combinando letras, números e símbolos, e descobre por que motivo uma palavra-passe é como uma escova de dentes: nunca se deve partilhar com ninguém!',
    en: 'Your password is the master key to your digital identity: messages, photos, school work, and games! Learn how to forge unbreakable keys with letters, numbers, and symbols, and why passwords must never be shared!',
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
        pt: 'Uma boa palavra-passe deve:<ul><li>Ter pelo menos 8 caracteres.</li><li>Misturar letras maiúsculas, minúsculas, números e símbolos.</li><li>Não conter o teu nome, data de nascimento ou dados pessoais.</li><li>Não ser uma sequência óbvia, como "123456" ou "abcdef".</li><li>Ser diferente para cada conta que uses.</li></ul>',
        en: 'A robust password must:<ul><li>Be at least 8 characters long.</li><li>Mix uppercase letters, lowercase letters, numbers, and symbols.</li><li>Avoid including your name, birthdate, or obvious personal details.</li><li>Never use predictable patterns like "123456" or "abcdef".</li><li>Be unique across different online services.</li></ul>',
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
      h: { pt: 'Nunca partilhes a tua palavra-passe', en: 'Never share your password' },
      body: {
        pt: 'Mesmo com amigos próximos, a palavra-passe deve permanecer secreta. Se alguém souber a tua palavra-passe, pode aceder à tua conta e usar informação em teu nome sem que percebas.',
        en: 'Even with your best friends, passwords must stay strictly private. If someone acquires your key, they can enter your profile and act on your behalf without your consent.',
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
        pt: 'Comprimento (10+ carateres), maiúsculas, minúsculas, números e símbolos.',
        en: 'Length (10+ characters), uppercase, lowercase, numbers, and symbols.',
      },
      icon: '🛡️',
      explanation: {
        pt: [
          'Uma palavra-passe fraca é como deixar a porta de casa aberta: qualquer pessoa ou programa malicioso consegue adivinhar em poucos segundos.',
          'Regra 1 — Comprimento Mínimo: deve ter pelo menos 10 a 12 carateres. Quanto mais comprida, exponencialmente mais difícil é de ser decifrada.',
          'Regra 2 — Variedade de Carateres: deve juntar letras MAIÚSCULAS (A-Z), letras minúsculas (a-z), algarismos (0-9) e símbolos especiais (!, #, $, %, @, *).',
          'O que NUNCA usar: palavras do dicionário simples (como "chocolate" ou "amor"), sequências óbvias ("123456" ou "qwerty") ou informações pessoais (como o teu nome, a tua data de nascimento ou o nome do teu cão).',
        ],
        en: [
          'A weak password is like leaving your front door unlocked: easily cracked in seconds.',
          'Rule 1 — Length: at least 10 to 12 characters. Longer means exponentially harder to crack.',
          'Rule 2 — Character Variety: combine UPPERCASE (A-Z), lowercase (a-z), numbers (0-9), and symbols (!, #, $, %, @, *).',
          'What NEVER to use: common dictionary words, obvious keyboard patterns ("123456", "qwerty"), or personal info (birthday, pet name).',
        ],
      },
      example: {
        title: {
          pt: 'A técnica da frase-passe da Mariana',
          en: 'Mariana’s passphrase technique',
        },
        scenario: {
          pt: 'A Mariana quer criar uma palavra-passe inesquecível mas muito forte. Escolheu a frase: "O meu gato Tobias adora peixe em 2026!".',
          en: 'Mariana wants an unforgettable yet rock-solid password. She picked the sentence: "O meu gato Tobias adora peixe em 2026!".',
        },
        tip: {
          pt: 'Pegou nas iniciais de cada palavra e juntou os números e o ponto de exclamação: "OmgTa!pe26". Tem 10 carateres, maiúsculas, minúsculas, número e símbolo!',
          en: 'She took the first letter of each word plus numbers and exclamation: "OmgTa!pe26". 10 chars with varied cases, numbers, and symbols!',
        },
      },
      funFact: {
        pt: 'Sabias que um computador especializado consegue adivinhar uma palavra-passe de 6 letras simples em menos de 1 segundo, mas demora mais de 34 000 ANOS para adivinhar uma combinação de 12 carateres com símbolos e números?',
        en: 'Did you know a hacking computer can crack a 6-letter lowercase password in under 1 second, but would take over 34,000 YEARS to crack a 12-character mixed combination?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que a palavra-passe "joao2015" é muito perigosa se o aluno se chamar João e tiver nascido em 2015?',
          en: 'Why is the password "joao2015" dangerous if the student is named João and was born in 2015?',
        },
        clue: {
          pt: 'Qualquer colega ou estranho que veja o teu cartão escolar sabe essa informação.',
          en: 'Anyone seeing your student ID card knows that exact info.',
        },
        reflection: {
          pt: 'Porque é a primeira coisa que qualquer pessoa tenta adivinhar! Informações públicas como nomes e anos de nascimento nunca devem fazer parte de senhas.',
          en: 'Because it is the very first guess anyone or automated tool attempts! Public personal facts should never be passwords.',
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
        pt: 'Segredo absoluto, autenticação de dois fatores e nunca partilhar.',
        en: 'Absolute secrecy, two-factor authentication, and never sharing.',
      },
      icon: '🔐',
      explanation: {
        pt: [
          'A regra de ouro: uma palavra-passe NUNCA se partilha com amigos, colegas de turma ou pessoas em jogos online. Os únicos que podem ajudar-te são os teus pais ou encarregados de educação!',
          'Nunca apontar em papéis colados no monitor (post-its): qualquer pessoa que passe pela tua secretária pode ver a tua senha.',
          'Palavras-passe diferentes para contas diferentes: se usares a mesma palavra-passe no jogo e no teu email escolar, se o jogo sofrer um ataque, o invasor terá acesso a tudo!',
          'Autenticação de Dois Fatores (2FA): é uma camada extra que pede um código temporário no telemóvel além da palavra-passe. Mesmo que alguém descubra a tua senha, não consegue entrar!',
        ],
        en: [
          'The Golden Rule: NEVER share passwords with friends, peers, or online gamers. Only parents should guide you!',
          'Never write passwords on sticky notes attached to screens: anyone walking by can view them.',
          'Unique passwords for unique accounts: using the same password everywhere means one breach compromises all accounts.',
          'Two-Factor Authentication (2FA): an extra security layer requesting a temporary phone code in addition to your password.',
        ],
      },
      example: {
        title: {
          pt: 'O melhor amigo que pediu a conta de jogo',
          en: 'The best friend asking for game credentials',
        },
        scenario: {
          pt: 'O melhor amigo do Tomás pediu-lhe a palavra-passe do jogo para experimentar uma personagem rara durante a noite. O Tomás explicou gentilmente que a palavra-passe é pessoal, mas convidou-o para jogar juntos em sua casa.',
          en: 'Tomás’s best friend asked for his game password to test a rare skin overnight. Tomás politely explained passwords are strictly private, inviting him over to play together in person instead.',
        },
        tip: {
          pt: 'Recusar partilhar a palavra-passe não é falta de amizade; é proteger a segurança da conta e a amizade de mal-entendidos!',
          en: 'Refusing to share passwords isn’t unfriendly; it protects your account and preserves your friendship from misunderstandings!',
        },
      },
      funFact: {
        pt: 'Sabias que as empresas de tecnologia como a Google e a Microsoft NUNCA pedem a tua palavra-passe por email, telefone ou mensagem? Se alguém te pedir, é garantia de fraude!',
        en: 'Did you know tech companies like Google and Microsoft NEVER ask for your password via email, phone, or message? Anyone requesting it is a fraudster!',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que deves fazer imediatamente se suspeitares que alguém descobriu a tua palavra-passe?',
          en: 'What should you do immediately if you suspect someone found out your password?',
        },
        clue: {
          pt: 'Não esperes que aconteça algo de mau na tua conta.',
          en: 'Don’t wait for something bad to happen to your account.',
        },
        reflection: {
          pt: 'Deves alterar a palavra-passe de imediato nas definições de segurança e avisar os teus pais ou professor para verificar as atividades recentes.',
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
              'Apenas com os teus pais ou encarregados de educação para salvaguarda',
              'Com os teus melhores amigos da escola no recreio',
              'Com jogadores desconhecidos que conheceste num chat online',
              'Com qualquer pessoa que te envie uma mensagem a pedir',
            ],
            en: [
              'Only with your parents or legal guardians for safety',
              'With your best friends at school recess',
              'With unknown players encountered in game lobbies',
              'With anyone sending a direct message asking for it',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! As senhas são estritamente privadas, exceto para os teus pais ou encarregados de educação.',
            en: 'Correct! Passwords are strictly private, except for parents or guardians.',
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
        pt: 'Como memorizar dezenas de senhas com segurança através de um cofre digital.',
        en: 'How to manage dozens of credentials securely using a digital vault.',
      },
      icon: '🔑',
      explanation: {
        pt: [
          'Hoje em dia temos contas na escola, em plataformas de leitura, em emails e em jogos. Como memorizar tantas palavras-passe diferentes sem usar sempre a mesma?',
          'Gestor de Palavras-passe: é uma aplicação que funciona como um cofre digital blindado. Guarda todas as tuas palavras-passe encriptadas e só precisas de memorizar uma única "Chave-Mestra" super segura.',
          'Troca Periódica: se receberes um alerta de segurança ou se usares um computador partilhado e te esqueceres de sair, altera logo a tua senha.',
          'Bloqueio de Ecrã: sempre que te levantares do computador, bloqueia a sessão (tecla Windows + L ou no menu Iniciar) para que ninguém mexa na tua conta.',
        ],
        en: [
          'Students have accounts for school portals, e-learning, emails, and games. How can one remember distinct passwords without repeating?',
          'Password Manager: a digital encrypted vault that stores credentials; you only need to remember one super-strong Master Password.',
          'Periodic Updates: update passwords whenever security breaches occur or after accidental public device logins.',
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
          pt: 'Bloquear sempre a sessão (ou terminar sessão) demora apenas 2 segundos e garante tranquilidade total!',
          en: 'Locking your session or logging out takes only 2 seconds and guarantees total peace of mind!',
        },
      },
      funFact: {
        pt: 'Sabias que a palavra-passe mais comum e mais atacada do mundo em 2025 continuava a ser "123456"? Os criminosos conseguem adivinhá-la em 0,0001 segundos!',
        en: 'Did you know the most common breached password worldwide remains "123456"? Attack tools crack it in 0.0001 seconds!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é uma péssima ideia guardar as palavras-passe num ficheiro de texto chamado "senhas.txt" no Ambiente de Trabalho?',
          en: 'Why is it a terrible idea to save passwords in a plain text file named "passwords.txt" on the Desktop?',
        },
        clue: {
          pt: 'Pensa em quem consegue abrir esse ficheiro sem qualquer palavra-passe.',
          en: 'Think about who can open that file without any authorization.',
        },
        reflection: {
          pt: 'Qualquer pessoa que use o computador ou qualquer vírus que infete o sistema pode ler esse ficheiro sem qualquer barreira e roubar todas as tuas contas de uma só vez!',
          en: 'Anyone sitting at the PC or malicious software can open that plain text file instantly and steal all your credentials at once!',
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
      id: 'jogo-pass-qual-mais-segura',
      themeId: 'palavras-passe',
      number: 1,
      title: { pt: '🔑 Qual é a mais segura?', en: '🔑 Which is the Strongest?' },
      shortDesc: { pt: 'Compara palavras-passe e identifica a mais robusta.', en: 'Compare passwords and pick the strongest combination.' },
      icon: '🔑',
      durationMinutes: 4,
      points: 20,
      type: 'safe_dangerous',
    },
    {
      id: 'jogo-pass-deteta-erros',
      themeId: 'palavras-passe',
      number: 2,
      title: { pt: '🕵️ Deteta os erros na senha', en: '🕵️ Spot Password Flaws' },
      shortDesc: { pt: 'Descobre o que está errado com palavras-passe fracas.', en: 'Discover flaws in weak, vulnerable passwords.' },
      icon: '🕵️',
      durationMinutes: 4,
      points: 20,
      type: 'find_error',
    },
    {
      id: 'jogo-pass-constroi-segura',
      themeId: 'palavras-passe',
      number: 3,
      title: { pt: '🧩 Constrói uma palavra-passe', en: '🧩 Build a Strong Password' },
      shortDesc: { pt: 'Combina blocos de letras, números e símbolos até atingir 100%.', en: 'Combine building blocks until you achieve 100% security.' },
      icon: '🧩',
      durationMinutes: 5,
      points: 20,
      type: 'password_builder',
    },
    {
      id: 'jogo-pass-verdadeiro-falso',
      themeId: 'palavras-passe',
      number: 4,
      title: { pt: '⚡ Verdadeiro ou Falso: Senhas', en: '⚡ True or False: Passwords' },
      shortDesc: { pt: 'Testa mitos e regras sobre a segurança das tuas contas.', en: 'Test myths and rules about account security.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 15,
      type: 'true_false',
    },
    {
      id: 'jogo-pass-o-que-farias',
      themeId: 'palavras-passe',
      number: 5,
      title: { pt: '🚨 O que farias?', en: '🚨 What Would You Do?' },
      shortDesc: { pt: 'Resolve dilemas de amigos que pedem a tua palavra-passe.', en: 'Solve peer dilemmas when friends ask for credentials.' },
      icon: '🚨',
      durationMinutes: 5,
      points: 20,
      type: 'what_would_you_do',
    },
    {
      id: 'quiz-final-tema4',
      themeId: 'palavras-passe',
      number: 6,
      title: { pt: '🎯 Quiz de Segurança', en: '🎯 Password Security Master Quiz' },
      shortDesc: { pt: '16 perguntas completas com feedback instantâneo para seres um verdadeiro perito!', en: '16 complete questions with instant feedback to test password mastery!' },
      icon: '🎯',
      durationMinutes: 10,
      points: 80,
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
        pt: 'Palavras-passe com 10 ou mais carateres oferecem resistência exponencial contra ataques de força bruta.',
        en: 'Passwords of 10+ characters provide exponential resistance against automated brute-force attacks.',
      },
    },
    {
      id: 'pass-q2',
      question: {
        pt: 'Quais os 4 tipos de carateres que devem ser misturados numa senha forte?',
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
        pt: 'A diversidade entre maiúsculas, minúsculas, números e símbolos torna a decifração quase impossível.',
        en: 'Combining distinct character classes dramatically expands the cryptographic search space.',
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
        pt: 'Reutilizar senhas significa que uma única fuga de dados compromete todas as tuas contas digitais.',
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
          'Recusar educadamente, explicando que as senhas são privadas, e combinar jogar juntos presencialmente',
          'Dar a palavra-passe imediatamente porque os melhores amigos sabem tudo',
          'Escrever a senha no quadro da sala de aula',
          'Dar a senha e pedir a dele em troca',
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
        pt: 'As senhas nunca se partilham com colegas ou amigos, prevenindo roubos e mal-entendidos.',
        en: 'Passwords must never be shared, avoiding accidental loss or friendship friction.',
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
        pt: 'Colar papéis com senhas na secretária deixa as tuas contas à mercê de qualquer pessoa que passe por perto.',
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
          'Uma aplicação segura que guarda todas as tuas senhas cifradas num cofre digital',
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
        pt: 'Um gestor de senhas gera e guarda chaves complexas com criptografia forte.',
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
        pt: 'Se não pediste o código, alguém tem a tua senha! O código impediu o acesso. Altera a tua senha já.',
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
          'É fácil de memorizar para ti, mas muito comprida e quase impossível de adivinhar para um computador',
          'Ocupa menos espaço no disco do computador',
          'Permite que todas as pessoas adivinhem a tua senha',
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
        pt: 'Se o teu professor de TIC te pedir para demonstrares um trabalho no computador da sala, o que deves fazer com a tua senha?',
        en: 'If your ICT teacher asks you to present work on the classroom projector, what should you do with your password?',
      },
      options: {
        pt: [
          'Escrevê-la com cuidado sem a dizer em voz alta, verificando que o projetor não a mostra a toda a turma',
          'Gritar a palavra-passe bem alto para a turma toda ouvir',
          'Escrever a palavra-passe no quadro com marcador permanente',
          'Pedir a um colega para adivinhar a tua senha',
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
        pt: 'Nunca deves verbalizar nem projetar senhas para a sala de aula.',
        en: 'Never verbalize or project private credentials in public spaces.',
      },
    },
    {
      id: 'pass-q16',
      question: {
        pt: 'Qual é o resumo perfeito da segurança de palavras-passe?',
        en: 'What is the ideal summary of password safety?',
      },
      options: {
        pt: [
          'Comprida, complexa, diferente para cada conta e NUNCA partilhada!',
          'Curta, fácil, igual em tudo e partilhada com todos os amigos',
          '1234 em todas as contas da escola',
          'Não ter palavras-passe nenhumas',
        ],
        en: [
          'Long, complex, unique for every service, and NEVER shared!',
          'Short, simple, reused everywhere, and shared with friends',
          '1234 across every school account',
          'Using zero passwords anywhere',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Comprimento, complexidade, unicidade e segredo absoluto formam o escudo perfeito!',
        en: 'Length, complexity, uniqueness, and secrecy constitute the ultimate protection shield!',
      },
    },
  ],
};
