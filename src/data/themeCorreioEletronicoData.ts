import { ThemeDefinition } from '../types';

export const themeCorreioEletronicoData: ThemeDefinition = {
  id: 'correio-eletronico',
  number: 4,
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
        pt: 'O correio eletrónico (email) é um serviço que permite enviar e receber mensagens através da Internet, usando um endereço próprio — por exemplo, <strong>nome@exemplo.com</strong>.<br><br>É muito usado na escola, no trabalho e para comunicar de forma mais formal do que numa rede social.',
        en: 'Email is an online service that allows sending and receiving messages over the Internet using a unique address — for instance, <strong>name@example.com</strong>.<br><br>It is widely used in school, work, and for more formal communication than social media.',
      },
      icon: '✉️',
    },
    {
      eyebrow: { pt: 'Como funciona?', en: 'How it works' },
      h: { pt: 'A caixa de correio', en: 'The mailbox structure' },
      body: {
        pt: 'Uma conta de email tem normalmente:<ul><li><strong>Caixa de entrada</strong> — mensagens recebidas.</li><li><strong>Enviadas</strong> — mensagens que já enviaste.</li><li><strong>Rascunhos</strong> — mensagens que ainda estás a escrever.</li><li><strong>Spam</strong> — mensagens indesejadas ou suspeitas.</li><li><strong>Anexos</strong> — ficheiros que envias ou recebes junto com a mensagem.</li></ul>',
        en: 'An email account typically features:<ul><li><strong>Inbox</strong> — received messages.</li><li><strong>Sent</strong> — messages you have sent.</li><li><strong>Drafts</strong> — unfinished messages in progress.</li><li><strong>Spam / Junk</strong> — unwanted or suspicious messages.</li><li><strong>Attachments</strong> — files sent or received alongside the message.</li></ul>',
      },
      icon: '📥',
    },
    {
      eyebrow: { pt: 'Exemplo', en: 'Example' },
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
      eyebrow: { pt: 'Vamos pensar', en: "Let's think" },
      h: { pt: 'Escrever com respeito', en: 'Writing with respect and clarity' },
      body: {
        pt: 'Ao escreveres um email — a um professor, colega ou familiar — usa linguagem clara, educada e evita mensagens ofensivas.<br><br>Evita escrever com TODAS AS LETRAS MAIÚSCULAS (na Internet, equivale a gritar!) e relê sempre a mensagem antes de clicar em "Enviar". Um bom email transmite respeito por quem o vai ler.',
        en: 'When writing an email to a teacher, classmate, or family member, use clear, polite phrasing and avoid offensive wording.<br><br>Avoid typing in ALL CAPS (which represents shouting online) and always proofread before hitting "Send". A respectful email leaves a positive impression.',
      },
      icon: '🤝',
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
        pt: 'Sabias que o primeiro email foi enviado em 1971 por Ray Tomlinson? Foi ele quem escolheu o símbolo "@" para separar o utilizador do computador!',
        en: 'Did you know the first email was sent in 1971 by Ray Tomlinson? He picked the "@" symbol to separate the user from the machine!',
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
              'Guardar mensagens indesejadas, suspeitas ou de publicidade não solicitada',
              'Guardar as mensagens mais importantes da escola',
              'Guardar os rascunhos que ainda estás a escrever',
              'Guardar as palavras-passe da tua conta',
            ],
            en: [
              'Store unwanted, suspicious, or unsolicited advertising messages',
              'Store the most important school messages',
              'Store drafts you are still writing',
              'Store your account passwords',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'A pasta Spam filtra automaticamente mensagens suspeitas, perigosas ou lixo publicitário.',
            en: 'The Spam folder automatically filters suspicious, hazardous, or junk emails.',
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
          'Diferença entre Para, Cc (Com conhecimento) e Bcc (Cópia oculta): use Bcc para proteger a privacidade dos contactos de várias pessoas.',
          'Alerta Phishing: emails a oferecer prémios falsos, a pedir senhas ou com links estranhos.',
          'Nunca abrir anexos de remetentes desconhecidos com extensões executáveis (.exe, .zip suspeitos).',
        ],
        en: [
          'Email Netiquette: polite greeting, respectful tone, avoiding all caps, and signing your name.',
          'To vs Cc vs Bcc: use Bcc to safeguard the privacy of recipients in group emails.',
          'Phishing awareness: fake prize notifications, urgent credential requests, and suspicious links.',
          'Never open untrusted attachments with executable extensions (.exe, strange archives).',
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
          pt: 'Nenhuma empresa séria oferece prémios do nada nem pede palavras-passe por email!',
          en: 'Reputable institutions never give random prizes or ask for passwords over email!',
        },
      },
      funFact: {
        pt: 'O termo "Spam" para correio indesejado inspirou-se num famoso sketch de comédia dos Monty Python onde a palavra "spam" era repetida sem parar!',
        en: 'The term "Spam" for junk mail originated from a classic Monty Python comedy sketch where the word was repeated incessantly!',
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
      id: 'desafio-laboratorio-email',
      themeId: 'correio-eletronico',
      number: 1,
      title: { pt: '✉️ Laboratório de Redação de Email', en: '✉️ Email Writing Lab' },
      shortDesc: { pt: 'Escreve um email escolar com destinatário, assunto, saudação e assinatura.', en: 'Draft a proper school email with recipient, subject, greeting, and signature.' },
      icon: '✉️',
      durationMinutes: 4,
      points: 20,
      type: 'build_email',
    },
    {
      id: 'desafio-organizar-inbox',
      themeId: 'correio-eletronico',
      number: 2,
      title: { pt: '📥 O Organizador da Caixa de Correio', en: '📥 Mailbox Sorting Master' },
      shortDesc: { pt: 'Organiza mensagens em Entrada, Spam, Enviados e Lixo.', en: 'Sort emails into Inbox, Spam, Sent, and Trash.' },
      icon: '📥',
      durationMinutes: 4,
      points: 20,
      type: 'folder_sorting',
    },
    {
      id: 'desafio-cc-bcc',
      themeId: 'correio-eletronico',
      number: 3,
      title: { pt: '📬 O Enigma do Para, Cc e Bcc', en: '📬 Mystery of To, Cc & Bcc' },
      shortDesc: { pt: 'Aprende quando usar destinatário direto, cópia ou cópia oculta.', en: 'Learn when to use Direct, Cc (carbon copy), or Bcc (blind copy).' },
      icon: '📬',
      durationMinutes: 4,
      points: 20,
      type: 'inspect_email',
    },
    {
      id: 'desafio-phishing',
      themeId: 'correio-eletronico',
      number: 4,
      title: { pt: '🎣 Detetor de Phishing e Mensagens Suspeitas', en: '🎣 Phishing & Scam Radar' },
      shortDesc: { pt: 'Identifica emails fraudulentos com links perigosos.', en: 'Spot fraudulent emails and dangerous malicious links.' },
      icon: '🎣',
      durationMinutes: 5,
      points: 20,
      type: 'detect_phishing',
    },
    {
      id: 'quiz-final-tema4',
      themeId: 'correio-eletronico',
      number: 5,
      title: { pt: '🎯 Quiz de Correio Eletrónico', en: '🎯 Email Mastery Quiz' },
      shortDesc: { pt: 'Testa todos os teus conhecimentos sobre email, anexos e segurança!', en: 'Test your knowledge on email, attachments, and communication safety!' },
      icon: '🎯',
      durationMinutes: 8,
      points: 60,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'email-q1',
      question: {
        pt: 'O que é o correio eletrónico (email)?',
        en: 'What is electronic mail (email)?',
      },
      options: {
        pt: [
          'Um serviço que permite enviar e receber mensagens através da Internet',
          'Um jogo online de cartas colecionáveis',
          'Um vírus de computador que apaga ficheiros',
          'Um programa para desenhar ilustrações 3D',
        ],
        en: [
          'A service for sending and receiving messages across the Internet',
          'An online collectible card game',
          'A computer virus that deletes files',
          'A software for rendering 3D illustrations',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O correio eletrónico permite a troca rápida de mensagens e documentos pela Internet.',
        en: 'Email facilitates rapid exchange of messages and files across the Internet.',
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
          'aluno.tic@escola.pt',
          'www.escola.pt/aluno',
          'Aluno TIC Escola Portugal',
          'https://email.escola.pt',
        ],
        en: [
          'student.ict@school.edu',
          'www.school.edu/student',
          'Student ICT School',
          'https://email.school.edu',
        ],
      },
      correctIndex: 0,
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
          'Ficheiros (como PDFs, imagens ou trabalhos) enviados juntamente com a mensagem',
          'O nome do remetente escrito no final',
          'A pasta onde ficam os emails apagados',
          'A palavra-passe da conta de email',
        ],
        en: [
          'Files (such as PDFs, photos, or assignments) sent along with the message',
          'The author name typed at the bottom',
          'The folder where deleted emails are kept',
          'The email account passcode',
        ],
      },
      correctIndex: 0,
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
          'Porque o computador desliga-se automaticamente',
          'Porque a mensagem não é entregue ao destinatário',
          'Porque gasta mais bateria no telemóvel',
        ],
        en: [
          'Because in online etiquette typing in ALL CAPS is equivalent to shouting',
          'Because the computer will automatically shut down',
          'Because the message cannot be delivered',
          'Because it drains phone battery faster',
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
        pt: 'O que deves fazer se receberes um email estranho a pedir dados pessoais ou a tua senha?',
        en: 'What should you do upon receiving a suspicious email asking for credentials?',
      },
      options: {
        pt: [
          'Não clicar em nenhum link, não responder e avisar um professor ou encarregado de educação',
          'Preencher todos os dados solicitados de imediato',
          'Enviar o email para os teus amigos para eles tentarem a sorte',
          'Responder com a tua palavra-passe da escola',
        ],
        en: [
          'Never click links, do not reply, and notify a teacher or guardian',
          'Submit the requested details immediately',
          'Forward the email to friends so they test it',
          'Reply with your student password',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'É uma tentativa de phishing (fraude). Nunca deves facultar informações pessoais ou senhas.',
        en: 'It is a phishing attempt. Never provide personal data or passwords.',
      },
    },
  ],
};
