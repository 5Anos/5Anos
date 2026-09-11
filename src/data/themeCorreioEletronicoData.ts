import { ThemeDefinition } from '../types';

export const themeCorreioEletronicoData: ThemeDefinition = {
  id: 'correio-eletronico',
  number: 1,
  title: {
    pt: 'Correio Eletrónico',
    en: 'Email Communication',
  },
  tagline: {
    pt: 'Aprende a comunicar por email com segurança e respeito.',
    en: 'Learn how to communicate via email safely and respectfully.',
  },
  intro: {
    pt: 'O correio eletrónico é uma das ferramentas mais importantes de comunicação digital na escola e no trabalho. Descobre como funciona a tua caixa de correio, como escrever mensagens claras e formais, e como proteger-te de mensagens suspeitas e phishing!',
    en: 'Email is one of the most vital communication tools for school and work. Learn how your inbox works, how to craft respectful messages, and how to spot suspicious phishing attempts!',
  },
  icon: '✉️',
  illustrationKey: 'correio-eletronico',
  accentColor: 'indigo',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'O que é o correio eletrónico?', en: 'What is email?' },
      body: {
        pt: 'O correio eletrónico (email) é um serviço que permite enviar e receber mensagens através da Internet, usando um endereço próprio — por exemplo, <strong>nome@exemplo.com</strong>.<br><br>É muito usado na escola, no trabalho e para comunicar de forma mais formal do que numa rede social.<br><br><strong>História e Origem:</strong><br>• Em 1971, <strong>Ray Tomlinson</strong> realizou uma das primeiras experiências de envio de mensagens entre computadores ligados em rede e popularizou o uso do símbolo <strong>@</strong> nos endereços de correio eletrónico.',
        en: 'Email is an online service that allows sending and receiving messages over the Internet using a unique address — for instance, <strong>name@example.com</strong>.<br><br>It is widely used in school, work, and for more formal communication than social media.<br><br><strong>History and Origins:</strong><br>• In 1971, <strong>Ray Tomlinson</strong> carried out one of the earliest experiments sending messages between networked computers and popularized the <strong>@</strong> symbol in email addresses.',
      },
      icon: '✉️',
    },
    {
      eyebrow: { pt: 'Elementos', en: 'Elements' },
      h: { pt: 'As partes de uma mensagem', en: 'Parts of an email message' },
      body: {
        pt: 'Uma mensagem de email bem escrita tem:<ul><li>O <strong>destinatário</strong> (para quem escreves)</li><li>O <strong>assunto</strong> (o tema resumido)</li><li>Uma <strong>saudação</strong> educada (ex.: <em>Caro Professor...</em>)</li><li>O <strong>corpo da mensagem</strong> (o conteúdo claro e objetivo)</li><li>Uma <strong>despedida</strong> (ex.: <em>Com os melhores cumprimentos...</em>)</li><li>A tua <strong>assinatura</strong> (nome e turma).</li></ul>',
        en: 'A well-crafted email message includes:<ul><li>The <strong>recipient</strong> (who you are writing to)</li><li>The <strong>subject line</strong> (a concise summary)</li><li>A polite <strong>greeting</strong> (e.g., <em>Dear Teacher...</em>)</li><li>The <strong>message body</strong> (clear and structured content)</li><li>A courteous <strong>sign-off</strong> (e.g., <em>Best regards...</em>)</li><li>Your <strong>signature</strong> (name and class).</li></ul>',
      },
      icon: '📝',
    },
    {
      eyebrow: { pt: 'Atenção!', en: 'Attention!' },
      h: { pt: 'Cuidado com mensagens suspeitas', en: 'Beware of suspicious messages' },
      body: {
        pt: 'Se receberes uma mensagem de um remetente desconhecido, com um link estranho ou a pedir dados pessoais, não deves clicar nem responder. Estas mensagens podem ser tentativas de <strong>phishing</strong>.<br><br>Se tiveres dúvidas, pede sempre ajuda a um professor ou aos teus pais.',
        en: 'If you receive an email from an unknown sender containing unusual links or asking for personal credentials, do not click or reply. These emails can be dangerous <strong>phishing</strong> attempts.<br><br>When in doubt, always notify a teacher or your parents.',
      },
      icon: '⚠️',
    },
    {
      eyebrow: { pt: 'Não te Esqueças!', en: "Don't Forget!" },
      h: { pt: 'Escrever com respeito', en: 'Writing with respect and clarity' },
      body: {
        pt: 'Ao escreveres um email — a um professor, colega ou familiar — usa linguagem clara, educada e evita mensagens ofensivas.<br><br>Evita escrever com TODAS AS LETRAS MAIÚSCULAS (na Internet, equivale a gritar!) e relê sempre a mensagem antes de clicar em "Enviar". Um bom email transmite respeito por quem o vai ler.',
        en: 'When writing an email to a teacher, classmate, or family member, use clear, polite phrasing and avoid offensive wording.<br><br>Avoid typing in ALL CAPS (which represents shouting online) and always proofread before hitting "Send". A respectful email leaves a positive impression.',
      },
      icon: '💡',
    },
  ],
  modules: [
    {
      id: 'email-fundamentos',
      themeId: 'correio-eletronico',
      number: 1,
      title: {
        pt: 'O que é o Correio Eletrónico e Como Funciona',
        en: 'What is Email and How It Works',
      },
      shortDesc: {
        pt: 'Endereços de email, pastas da caixa de correio e envio de anexos.',
        en: 'Email addresses, mailbox folders, and attachments.',
      },
      icon: '✉️',
      explanation: {
        pt: [
          'O correio eletrónico (email) é uma ferramenta essencial para enviar mensagens e documentos em segundos através da Internet.',
          'Estrutura do Endereço: é composto por um nome de utilizador, o símbolo @ ("arroba") e o domínio do serviço (ex.: joao.silva@escola.pt).',
          'Pastas Essenciais: Caixa de Entrada (recebidos), Enviados, Rascunhos, Lixo/Spam.',
          'Anexos: ficheiros como trabalhos em PDF, apresentações ou imagens que viajam com a mensagem.',
        ],
        en: [
          'Email is an essential digital tool for delivering messages and documents in seconds worldwide.',
          'Address anatomy: includes a username, the @ symbol ("at"), and the domain name (e.g. student@school.edu).',
          'Essential folders: Inbox, Sent, Drafts, and Spam/Junk.',
          'Attachments: files such as school assignments, presentations, or images accompanying your email.',
        ],
      },
      example: {
        title: {
          pt: 'O trabalho de grupo enviado por anexo',
          en: 'Submitting a group assignment as an attachment',
        },
        scenario: {
          pt: 'A Beatriz terminou a apresentação de TIC e enviou-a ao professor com o assunto "Trabalho de TIC - 5.º B - Grupo 3", anexando o ficheiro em PDF e escrevendo uma mensagem educada.',
          en: 'Beatriz finished her ICT presentation and sent it to the teacher with the subject "ICT Project - 5th Grade - Team 3", attaching the PDF with a polite note.',
        },
        tip: {
          pt: 'Coloca sempre um assunto claro e confirma se anexaste o ficheiro antes de carregar em "Enviar"!',
          en: 'Always include a clear subject line and verify attachments before hitting Send!',
        },
      },
      funFact: {
        pt: 'Em 1971, Ray Tomlinson realizou uma das primeiras experiências de envio de mensagens entre computadores ligados em rede e popularizou o uso do símbolo @ nos endereços de correio eletrónico.',
        en: 'In 1971, Ray Tomlinson carried out one of the earliest experiments sending messages between networked computers and popularized the @ symbol in email addresses.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que um assunto claro (ex.: "Dúvida no trabalho n.º 2") ajuda mais o destinatário do que escrever apenas "Olá"?',
          en: 'Why does a clear subject line help the recipient more than just writing "Hello"?',
        },
        clue: {
          pt: 'Pensa em alguém que recebe dezenas de emails por dia.',
          en: 'Think about someone receiving dozens of emails daily.',
        },
        reflection: {
          pt: 'O assunto permite ao destinatário saber imediatamente sobre o que é a mensagem e organizá-la por prioridade.',
          en: 'The subject line lets the recipient instantly know the topic and prioritize reply times.',
        },
      },
      quizQuestions: [
        {
          id: 'q-email-1',
          question: {
            pt: 'Qual é a função da pasta "Spam" numa conta de correio eletrónico?',
            en: 'What is the function of the Spam folder in an email account?',
          },
          options: {
            pt: [
              'Guardar mensagens indesejadas ou de publicidade não solicitada (lixo eletrónico)',
              'Guardar as mensagens mais importantes da escola',
              'Guardar os rascunhos que ainda estás a escrever',
              'Guardar as palavras-passe da tua conta',
            ],
            en: [
              'Store unwanted messages or unsolicited advertising (junk email)',
              'Store the most important school messages',
              'Store drafts you are still writing',
              'Store your account passwords',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'A pasta Spam filtra automaticamente mensagens indesejadas, como publicidade não solicitada ou mensagens em massa.',
            en: 'The Spam folder automatically filters unwanted messages, such as unsolicited advertising or mass mailings.',
          },
        },
      ],
    },
    {
      id: 'email-etiqueta-seguranca',
      themeId: 'correio-eletronico',
      number: 2,
      title: {
        pt: 'Netiqueta e Prevenção de Phishing',
        en: 'Email Etiquette and Phishing Prevention',
      },
      shortDesc: {
        pt: 'Regras de cortesia digital e como identificar mensagens perigosas.',
        en: 'Digital politeness rules and spotting malicious emails.',
      },
      icon: '🛡️',
      explanation: {
        pt: [
          'Netiqueta no Email: saudação cordial, frases respeitosas, evitar CAPS LOCK e incluir assinatura.',
          'Estrutura de destinatários: Para (destinatário principal), Cc (outros destinatários que devem ter conhecimento) e Cco / Bcc (destinatários ocultos entre si). Usa o Cco (ou Bcc) para proteger a privacidade dos contactos de várias pessoas.',
          'Alerta Phishing: emails a oferecer prémios falsos, a pedir palavras-passe ou com links estranhos.',
          'Não abras anexos inesperados ou suspeitos, sobretudo quando vêm de remetentes desconhecidos.',
          'Um ficheiro .EXE pode executar um programa: nunca abras ficheiros executáveis recebidos de fontes desconhecidas sem a ajuda de um adulto.',
          'Um ficheiro .ZIP é um ficheiro comprimido que pode conter vários ficheiros. Se vier de uma origem desconhecida, deve ser tratado com cuidado.',
        ],
        en: [
          'Email Netiquette: polite greeting, respectful tone, avoiding all caps, and signing your name.',
          'Recipient structure: To (main recipient), Cc (carbon copy for info), and Cco / Bcc (blind carbon copy for hidden recipients). Use Cco (or Bcc) to safeguard contact privacy.',
          'Phishing awareness: fake prize notifications, urgent credential requests, and suspicious links.',
          'Do not open unexpected or suspicious attachments, especially when they come from unknown senders.',
          'An .EXE file can execute a program: never open executable files received from unknown sources without help from an adult.',
          'A .ZIP file is a compressed file that can contain multiple files. If it comes from an unknown source, it must be handled with caution.',
        ],
      },
      example: {
        title: {
          pt: 'O email suspeito do prémio milionário',
          en: 'The suspicious lottery winner email',
        },
        scenario: {
          pt: 'O Tiago recebeu um email a dizer que tinha ganho um telemóvel novo e a pedir para clicar num link e escrever a sua morada e palavra-passe. O Tiago desconfiou, não clicou e mostrou ao professor.',
          en: 'Tiago received an email claiming he won a new smartphone, asking him to click a link and provide his address and password. He stayed alert, avoided clicking, and reported it to his teacher.',
        },
        tip: {
          pt: 'Desconfia de mensagens que prometem prémios inesperados e pedem dados pessoais, palavras-passe ou pagamentos.',
          en: 'Be suspicious of messages that promise unexpected prizes and ask for personal data, passwords, or payments.',
        },
      },
      funFact: {
        pt: 'A palavra SPAM era originalmente o nome de uma marca de carne enlatada. Ficou famosa no programa de humor Monty Python, onde a palavra «Spam» era repetida sem parar. Mais tarde, o termo passou a ser usado para descrever mensagens e correio indesejado enviados em massa na Internet.',
        en: 'The word SPAM was originally a brand name for canned meat. It became famous in a Monty Python comedy sketch where the word "Spam" was repeated endlessly. Later, the term was adopted to describe unsolicited bulk emails on the Internet.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque deves usar o campo Bcc (cópia oculta) quando envias um email para toda a turma?',
          en: 'Why should you use the Bcc field when emailing the whole class?',
        },
        clue: {
          pt: 'Pensa na privacidade dos endereços de email dos teus colegas.',
          en: 'Think about protecting the privacy of your classmates’ email addresses.',
        },
        reflection: {
          pt: 'O Bcc impede que todos vejam os emails uns dos outros, protegendo a privacidade dos contactos contra spam.',
          en: 'Bcc hides recipients’ email addresses from one another, guarding contact privacy against unsolicited spam.',
        },
      },
      quizQuestions: [
        {
          id: 'q-email-2',
          question: {
            pt: 'O que deves fazer se receberes um email de alguém desconhecido com um link a pedir a tua palavra-passe?',
            en: 'What should you do if you receive an email from an unknown sender with a link asking for your password?',
          },
          options: {
            pt: [
              'Não clicar no link, não responder e avisar um adulto ou professor',
              'Clicar imediatamente para ver se ganhaste um prémio',
              'Enviar a tua palavra-passe para confirmar a conta',
              'Encaminhar para todos os teus amigos',
            ],
            en: [
              'Do not click the link, do not reply, and notify a parent or teacher',
              'Click right away to see if you won a prize',
              'Reply with your password to confirm identity',
              'Forward it to all your friends',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Nunca deves clicar em links suspeitos nem facultar credenciais por email — trata-se de uma tentativa de phishing.',
            en: 'Never click suspicious links or disclose credentials via email — it is a phishing attack.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-email-order',
      themeId: 'correio-eletronico',
      number: 1,
      title: { pt: '✉️ Constrói um email', en: '✉️ Build an Email' },
      shortDesc: {
        pt: 'Envia um email ao teu professor a entregar o trabalho de TIC, com conhecimento (Cc) dos colegas de grupo.',
        en: 'Send an email to your teacher submitting your ICT project, with CC to your teammates.',
      },
      icon: '✉️',
      durationMinutes: 4,
      points: 100,
      type: 'build_email',
    },
    {
      id: 'jogo-email-mc',
      themeId: 'correio-eletronico',
      number: 2,
      title: { pt: '🎣 Identificar Mensagens Suspeitas e Phishing', en: '🎣 Spotting Suspicious Messages and Phishing' },
      shortDesc: { pt: 'Distingue correio normal, publicidade indesejada e tentativas de phishing.', en: 'Distinguish regular emails, junk mail, and phishing attempts.' },
      icon: '🎣',
      durationMinutes: 4,
      points: 100,
      type: 'detect_phishing',
      gameData: {
        type: 'mc',
        title: 'Identificar Mensagens Suspeitas e Phishing',
        icon: '🎣',
        xp: 100,
        desc: 'Responde às perguntas sobre a identificação de tentativas de phishing e segurança no email.',
        data: {
          questions: [
            {
              q: 'O que deves fazer se receberes um email a dizer que ganhaste um prémio milionário mas tens de clicar num link suspeito?',
              opts: [
                'Apagar imediatamente o email e nunca clicar no link',
                'Clicar a correr para reclamar o prémio',
                'Enviar os teus dados pessoais e palavra-passe',
                'Reencaminhar para toda a escola'
              ],
              c: 0,
              e: 'É uma tentativa clássica de phishing (roubo de dados). Os prémios falsos nunca devem ser abertos!'
            },
            {
              q: 'Para que serve o campo Bcc (Cópia Oculta) ao enviar um email a muitas pessoas?',
              opts: [
                'Para ocultar os endereços de email dos destinatários uns dos outros, protegendo a privacidade',
                'Para enviar o email mais depressa',
                'Para bloquear vírus automaticamente',
                'Para apagar o email após 24 horas'
              ],
              c: 0,
              e: 'O Bcc esconde as listas de endereços, evitando que estranhos vejam os contactos uns dos outros.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-email-tf',
      themeId: 'correio-eletronico',
      number: 3,
      title: { pt: '⚡ Verdadeiro ou Falso: Email', en: '⚡ True or False: Email' },
      shortDesc: { pt: 'Testa regras de boa educação e segurança no correio eletrónico.', en: 'Test etiquette and safety rules for email.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Verdadeiro ou Falso: email',
        icon: '⚡',
        xp: 100,
        desc: 'Classifica as afirmações sobre a utilização do correio eletrónico.',
        data: {
          items: [
            { s: 'Escrever uma mensagem inteira em LETRAS MAIÚSCULAS equivale a estar a gritar.', a: true, e: 'Correto na etiqueta digital! Escrever em maiúsculas transmite agressividade.' },
            { s: 'Devemos abrir sempre qualquer anexo enviado por um endereço desconhecido.', a: false, e: 'Anexos inesperados podem conter ficheiros perigosos. Não os abras sem confirmar com um adulto.' },
            { s: 'O assunto do email deve resumir claramente o conteúdo da mensagem.', a: true, e: 'Ajuda o destinatário a perceber do que se trata antes de abrir.' }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema5',
      themeId: 'correio-eletronico',
      number: 4,
      title: { pt: '🏆 Quiz de Aprendizagem: Correio Eletrónico (10 Questões)', en: '🏆 Learning Quiz: Email (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas sobre Correio Eletrónico.', en: 'Comprehensive final assessment with 10 questions on Email.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 100,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'email-q1',
      question: {
        pt: 'A professora de TIC pediu à turma para enviar um relatório em PDF a partir de casa sem usar uma pen drive. Que serviço digital é o mais adequado para esta tarefa?',
        en: 'The ICT teacher asked the class to submit a PDF report from home without using a USB drive. Which digital service is best suited for this task?',
      },
      options: {
        pt: [
          'O serviço de correio eletrónico (email), anexando o ficheiro PDF à mensagem',
          'Uma aplicação de edição de áudio offline',
          'O leitor de código de barras da biblioteca da escola',
          'Um programa de descompactação de ficheiros sem rede',
        ],
        en: [
          'An electronic mail (email) service, attaching the PDF file to the message',
          'An offline audio editing application',
          'The school library barcode reader',
          'An offline file archiver program',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O correio eletrónico permite enviar mensagens e anexar ficheiros (como PDFs ou imagens) de forma rápida e segura através da Internet.',
        en: 'Email allows sending messages and attaching files (like PDFs or images) quickly and securely across the Internet.',
      },
    },
    {
      id: 'email-q2',
      question: {
        pt: 'Qual das seguintes opções é um exemplo correto de formato de endereço de email?',
        en: 'Which option represents a valid email address structure?',
      },
      options: {
        pt: [
          'www.escola.pt/aluno',
          'Aluno TIC Escola Portugal',
          'aluno.tic@escola.pt',
          'https://email.escola.pt',
        ],
        en: [
          'www.school.edu/student',
          'Student ICT School',
          'student.ict@school.edu',
          'https://email.school.edu',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Um endereço de email é composto por utilizador, o símbolo @ e o domínio do fornecedor.',
        en: 'An email address contains a username, @ symbol, and service provider domain.',
      },
    },
    {
      id: 'email-q3',
      question: {
        pt: 'Numa mensagem de correio eletrónico, o que são os "Anexos"?',
        en: 'In an email, what are "Attachments"?',
      },
      options: {
        pt: [
          'O nome do remetente escrito no final',
          'A pasta onde ficam os emails apagados',
          'A palavra-passe da conta de email',
          'Ficheiros (como PDFs, imagens ou trabalhos) enviados juntamente com a mensagem',
        ],
        en: [
          'The author name typed at the bottom',
          'The folder where deleted emails are kept',
          'The email account passcode',
          'Files (such as PDFs, photos, or assignments) sent along with the message',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'Anexos são documentos ou ficheiros incluídos e transportados na mensagem.',
        en: 'Attachments are digital files enclosed with an email message.',
      },
    },
    {
      id: 'email-q4',
      question: {
        pt: 'Porque não deves escrever um email com todas as letras em MAIÚSCULAS?',
        en: 'Why should you avoid typing emails entirely in UPPERCASE?',
      },
      options: {
        pt: [
          'Porque na comunicação digital isso equivale a gritar e é considerado indelicado',
          'Porque os servidores de correio rejeitam mensagens em maiúsculas',
          'Porque impede o envio de qualquer documento em anexo',
          'Porque torna o tamanho da mensagem demasiado pesado para a rede',
        ],
        en: [
          'Because in online etiquette typing in ALL CAPS is equivalent to shouting',
          'Because mail servers reject all-uppercase messages',
          'Because it prevents any documents from being attached',
          'Because it makes the file size too heavy for the network',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Escrever em maiúsculas transmite a ideia de que estás a gritar com o destinatário.',
        en: 'Writing in uppercase represents shouting and is against digital etiquette.',
      },
    },
    {
      id: 'email-q5',
      question: {
        pt: 'Ao enviar um email com um trabalho para o teu professor, qual é a composição ideal da mensagem?',
        en: 'When sending an email with homework to your teacher, what is the ideal message structure?',
      },
      options: {
        pt: [
          'Enviar sem assunto e com apenas emojis soltos no corpo da mensagem',
          'Assunto claro, saudação educada (ex.: Bom dia, Professor), anexo correto e despedida com nome e turma',
          'Escrever apenas "Segue o trabalho" sem te identificares nem saudar o professor',
          'Escrever tudo em maiúsculas sem colocar nenhum ficheiro em anexo',
        ],
        en: [
          'Send without a subject line and only loose emojis in the body',
          'Clear subject line, polite greeting, correct attachment, and sign-off with your full name and class',
          'Type only "Here is the work" without identifying yourself or greeting the teacher',
          'Type everything in uppercase letters without adding any attachment',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Um email para um professor deve ser bem estruturado: assunto com o tema do trabalho, saudação cortês, ficheiro anexado e a tua identificação.',
        en: 'An email to a teacher requires proper structure: a clear subject, respectful greeting, attached file, and student identification.',
      },
    },
    {
      id: 'email-q6',
      question: {
        pt: 'Para que serve o campo "Assunto" (Subject) numa mensagem de email?',
        en: 'What is the purpose of the "Subject" field in an email message?',
      },
      options: {
        pt: [
          'Para escrever a palavra-passe da tua conta de correio',
          'Para colocar a lista de todos os teus amigos',
          'Para resumir numa frase curta o tema principal da mensagem',
          'Para guardar o histórico de conversas do ano anterior',
        ],
        en: [
          'To type the password of your email account',
          'To insert the full list of all your friends',
          'To summarize the main topic of the message in a short phrase',
          'To store the conversation history of the previous year',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'O assunto ajuda o destinatário a perceber imediatamente sobre o que trata a mensagem.',
        en: 'The subject line helps the recipient immediately understand what the message is about.',
      },
    },
    {
      id: 'email-q7',
      question: {
        pt: 'Porque deves usar o campo Bcc (Cópia Oculta) ao enviar um email para muitas pessoas?',
        en: 'Why should you use the Bcc (Blind Carbon Copy) field when emailing multiple people?',
      },
      options: {
        pt: [
          'Para garantir que o email é entregue mesmo sem ligação à rede',
          'Para permitir que todos os destinatários respondam em conjunto',
          'Para enviar ficheiros em anexo com tamanho superior ao limite',
          'Para manter os endereços de email invisíveis entre os destinatários',
        ],
        en: [
          'To ensure the email is delivered even without network connection',
          'To allow all recipients to reply together in a group thread',
          'To send attached files that exceed normal size limits',
          'To keep recipients’ email addresses hidden from one another',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'O Bcc protege a privacidade de todos os contactos e evita a partilha indesejada de endereços.',
        en: 'Bcc preserves contact privacy and prevents unwanted disclosure of addresses.',
      },
    },
    {
      id: 'email-q8',
      question: {
        pt: 'O que é o Spam no correio eletrónico?',
        en: 'What is Spam in email?',
      },
      options: {
        pt: [
          'Mensagens de publicidade não solicitadas ou lixo eletrónico enviadas em massa',
          'Um email importante enviado pelo teu professor da escola',
          'O ficheiro de imagem que envias em anexo',
          'A pasta onde guardas os teus contactos favoritos',
        ],
        en: [
          'Unsolicited advertising or junk mail sent out in bulk',
          'An important email sent by your school teacher',
          'The image file you send as an attachment',
          'The address book where you store favorite contacts',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O spam é lixo eletrónico enviado para muitas pessoas sem estas terem pedido.',
        en: 'Spam is junk email broadcast to many recipients without consent.',
      },
    },
    {
      id: 'email-q9',
      question: {
        pt: 'O que deves fazer se receberes um email de um desconhecido com um link a pedir a tua palavra-passe?',
        en: 'What should you do if you receive an email from a stranger with a link asking for your password?',
      },
      options: {
        pt: [
          'Clicar logo no link para ver do que se trata',
          'Não clicar, não responder e avisar de imediato os pais ou o professor',
          'Responder ao email a dar a palavra-passe',
          'Reencaminhar a mensagem para todos os teus colegas',
        ],
        en: [
          'Click the link immediately to see what it is',
          'Do not click, do not reply, and inform parents or teacher right away',
          'Reply to the email providing the password',
          'Forward the message to all your classmates',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Nunca deves fornecer palavras-passe por email. Trata-se de phishing (tentativa de roubo de dados).',
        en: 'Never give passwords via email. It is a phishing attack attempting to steal credentials.',
      },
    },
    {
      id: 'email-q10',
      question: {
        pt: 'Qual é a regra mais importante de segurança no uso do email?',
        en: 'What is the most important security rule when using email?',
      },
      options: {
        pt: [
          'Reutilizar a mesma palavra-passe simples em várias plataformas',
          'Abrir rapidamente qualquer anexo para verificar o conteúdo',
          'Guardar o segredo da palavra-passe e verificar links e anexos',
          'Partilhar os dados da conta com amigos para ajudar nos trabalhos',
        ],
        en: [
          'Reuse the same simple password across multiple platforms',
          'Quickly open any attachment to check its content',
          'Keep passwords secret and verify unexpected links and attachments',
          'Share account credentials with friends to assist with schoolwork',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Manter a palavra-passe secreta, desconfiar de estranhos e terminar a sessão protegem a tua conta.',
        en: 'Keeping passwords secret, distrusting strangers, and logging out keep your account secure.',
      },
    },
  ],
};
