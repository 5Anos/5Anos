import { ThemeDefinition } from '../types';

export const themeCorreioEletronicoData: ThemeDefinition = {
  id: 'correio-eletronico',
  number: 5,
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
        pt: 'O correio eletrónico (email) é um serviço que permite enviar e receber mensagens através da Internet, usando um endereço próprio — por exemplo, <strong>nome@exemplo.com</strong>.<br><br>É muito usado na escola, no trabalho e para comunicar de forma mais formal do que numa rede social.<br><br><strong>História e Origem:</strong><br>• Em 1971, <strong>Ray Tomlinson</strong> desenvolveu um sistema que permitia enviar mensagens entre computadores numa rede e utilizou o símbolo <strong>@</strong> nos endereços de email.',
        en: 'Email is an online service that allows sending and receiving messages over the Internet using a unique address — for instance, <strong>name@example.com</strong>.<br><br>It is widely used in school, work, and for more formal communication than social media.<br><br><strong>History and Origins:</strong><br>• In 1971, <strong>Ray Tomlinson</strong> developed a system allowing messages between networked computers and introduced the <strong>@</strong> symbol in email addresses.',
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
      eyebrow: { pt: 'Exemplo', en: 'Example' },
      h: { pt: 'Exemplo prático de uma mensagem', en: 'Practical email message example' },
      body: {
        pt: 'Vê como todos os elementos se organizam num email bem estruturado:<br><br><div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono space-y-1.5 text-slate-800 shadow-2xs"><div><strong class="text-indigo-900">Para:</strong> professor.silva@escola.pt</div><div><strong class="text-indigo-900">Assunto:</strong> Dúvida sobre o trabalho de TIC - 5.º A</div><div class="pt-2 text-slate-700 font-sans">Caro Professor Silva,</div><div class="text-slate-700 font-sans leading-relaxed">Gostaria de saber se o trabalho sobre segurança na Internet pode incluir imagens desenhadas por nós.<br>Obrigado pela sua ajuda.</div><div class="pt-2 text-slate-700 font-sans">Com os melhores cumprimentos,</div><div class="font-bold text-slate-900 font-sans">Maria Santos, 5.º A — N.º 14</div></div>',
        en: 'See how all elements are organized in a well-structured email:<br><br><div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono space-y-1.5 text-slate-800 shadow-2xs"><div><strong class="text-indigo-900">To:</strong> teacher.silva@school.edu</div><div><strong class="text-indigo-900">Subject:</strong> Question about ICT Project - Class 5A</div><div class="pt-2 text-slate-700 font-sans">Dear Mr. Silva,</div><div class="text-slate-700 font-sans leading-relaxed">I would like to ask if our project on Internet safety can include our own hand-drawn illustrations.<br>Thank you for your guidance.</div><div class="pt-2 text-slate-700 font-sans">Best regards,</div><div class="font-bold text-slate-900 font-sans">Maria Santos, Class 5A — No. 14</div></div>',
      },
      icon: '✉️',
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
        pt: 'Em 1971, Ray Tomlinson desenvolveu um sistema que permitia enviar mensagens entre computadores numa rede e utilizou o símbolo @ nos endereços de email.',
        en: 'In 1971, Ray Tomlinson developed a system allowing messages between networked computers and introduced the @ symbol in email addresses.',
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
          'Alerta Phishing: emails a oferecer prémios falsos, a pedir palavras-passe ou com links estranhos.',
          'Não abras anexos inesperados ou suspeitos, sobretudo quando vêm de remetentes desconhecidos.',
          'Um ficheiro .EXE é executável, ou seja, pode iniciar um programa. Um ficheiro deste tipo que chegue inesperadamente deve ser tratado com especial cuidado.',
          'Um ficheiro .ZIP é um arquivo comprimido que pode conter vários ficheiros. Se vier de uma origem desconhecida, deve ser tratado com cuidado.',
        ],
        en: [
          'Email Netiquette: polite greeting, respectful tone, avoiding all caps, and signing your name.',
          'To vs Cc vs Bcc: use Bcc to safeguard the privacy of recipients in group emails.',
          'Phishing awareness: fake prize notifications, urgent credential requests, and suspicious links.',
          'Do not open unexpected or suspicious attachments, especially when they come from unknown senders.',
          'An .EXE file is executable, meaning it can launch a program. Such a file arriving unexpectedly must be treated with special care.',
          'A .ZIP file is a compressed archive that can contain multiple files. If it comes from an unknown source, it must be handled with caution.',
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
      id: 'jogo-email-order',
      themeId: 'correio-eletronico',
      number: 1,
      title: { pt: '✉️ Constrói um email', en: '✉️ Draft an Email' },
      shortDesc: { pt: 'Ordena os elementos fundamentais para enviar uma mensagem correta.', en: 'Order the key elements to send a proper message.' },
      icon: '✉️',
      durationMinutes: 4,
      points: 100,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Constrói um email',
        icon: '✉️',
        xp: 100,
        desc: 'Coloca os campos de uma mensagem de email pela ordem correta de envio.',
        data: {
          items: [
            'Inserir o endereço de email do destinatário (Para)',
            'Escrever um assunto claro e direto',
            'Adicionar a saudação inicial e a mensagem principal',
            'Colocar a assinatura e verificar os anexos antes de enviar'
          ]
        }
      }
    },
    {
      id: 'jogo-email-mc',
      themeId: 'correio-eletronico',
      number: 2,
      title: { pt: '🎣 Isto é spam ou mensagem suspeita?', en: '🎣 Is this Spam or Phishing?' },
      shortDesc: { pt: 'Identifica sinais de correio fraudulento e tentativas de roubo de dados.', en: 'Identify signs of fraudulent emails and data theft attempts.' },
      icon: '🎣',
      durationMinutes: 4,
      points: 100,
      type: 'detect_phishing',
      gameData: {
        type: 'mc',
        title: 'Isto é spam ou mensagem suspeita?',
        icon: '🎣',
        xp: 100,
        desc: 'Responde às perguntas sobre a identificação de emails maliciosos.',
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
            { s: 'O assunto do email deve resumir claramente o conteúdo da mensagem.', a: true, e: 'Correto! Ajuda o destinatário a perceber do que se trata antes de abrir.' }
          ]
        }
      }
    },
    {
      id: 'jogo-email-match',
      themeId: 'correio-eletronico',
      number: 4,
      title: { pt: '🔗 Parte do Email', en: '🔗 Parts of an Email Match' },
      shortDesc: { pt: 'Associa cada componente do email à sua respetiva função.', en: 'Match each email component to its purpose.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 100,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Parte do Email',
        icon: '🔗',
        xp: 100,
        desc: 'Associa corretamente cada elemento do cabeçalho de email.',
        data: {
          pairs: [
            { left: 'Para (To)', right: 'Destinatário principal da mensagem' },
            { left: 'Assunto (Subject)', right: 'Resumo rápido do tema tratado' },
            { left: 'Cc (Cópia)', right: 'Destinatários secundários visíveis por todos' },
            { left: 'Anexo (Attachment)', right: 'Ficheiro (documento ou foto) enviado em conjunto' }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema4',
      themeId: 'correio-eletronico',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Correio Eletrónico', en: '🏆 Learning Quiz: Email' },
      shortDesc: { pt: 'Avaliação final abrangente sobre o Tema 4.', en: 'Comprehensive final assessment on Topic 4.' },
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
        pt: 'O que é o correio eletrónico (email)?',
        en: 'What is electronic mail (email)?',
      },
      options: {
        pt: [
          'Um serviço que permite enviar e receber mensagens através da Internet',
          'Um protocolo exclusivo para transferir ficheiros de áudio e vídeo em direto',
          'Um navegador Web utilizado para consultar páginas multimédia',
          'Um sistema de armazenamento que guarda apenas ficheiros comprimidos',
        ],
        en: [
          'A service for sending and receiving messages across the Internet',
          'A protocol dedicated strictly to live streaming audio and video',
          'A web browser used to display multimedia web pages',
          'A cloud storage system holding exclusively compressed files',
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
          'Assunto claro, saudação educada (ex.: Bom dia, Professor), anexo correto e despedida com nome e turma',
          'Enviar sem assunto e com apenas emojis soltos no corpo da mensagem',
          'Escrever apenas "Segue o trabalho" sem te identificares nem saudar o professor',
          'Escrever tudo em maiúsculas sem colocar nenhum ficheiro em anexo',
        ],
        en: [
          'Clear subject line, polite greeting, correct attachment, and sign-off with your full name and class',
          'Send without a subject line and only loose emojis in the body',
          'Type only "Here is the work" without identifying yourself or greeting the teacher',
          'Type everything in uppercase letters without adding any attachment',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Um email para um professor deve ser bem estruturado: assunto com o tema do trabalho, saudação cortês, ficheiro anexado e a tua identificação.',
        en: 'An email to a teacher requires proper structure: a clear subject, respectful greeting, attached file, and student identification.',
      },
    },
  ],
};
