import { ThemeDefinition } from '../types';

export const theme2Data: ThemeDefinition = {
  id: 'correio-eletronico',
  number: 2,
  title: {
    pt: 'Correio eletrónico',
    en: 'Electronic mail (Email)',
  },
  tagline: {
    pt: 'Aprende a utilizar o correio eletrónico para comunicar de forma segura, correta e responsável.',
    en: 'Learn to use email to communicate safely, correctly, and responsibly.',
  },
  intro: {
    pt: 'O correio eletrónico (email) é uma das ferramentas de comunicação mais importantes no estudo e no trabalho. Neste tema, vais aprender como funciona um endereço de email, como redigir mensagens com cortesia, gerir a tua caixa de correio e evitar armadilhas de spam e phishing.',
    en: 'Electronic mail (email) is one of the most vital communication tools in academics and work. In this theme, you will learn how an email address works, how to compose polite messages, manage your inbox folders, and steer clear of spam and phishing tricks.',
  },
  icon: 'Mail',
  accentColor: 'blue',
  badgeCount: 3,
  modules: [
    {
      id: 'email-intro',
      themeId: 'correio-eletronico',
      number: 1,
      icon: 'MailCheck',
      title: {
        pt: 'O que é o correio eletrónico e como funciona?',
        en: 'What is electronic mail and how does it work?',
      },
      shortDesc: {
        pt: 'Descobre como as mensagens digitais viajam pelo mundo em segundos e como é composto um endereço de email.',
        en: 'Discover how digital messages travel across the globe in seconds and how an email address is structured.',
      },
      whatYouWillLearn: {
        pt: [
          'O que é o correio eletrónico (email) e para que serve;',
          'A diferença entre uma carta tradicional e um email;',
          'Como funciona a entrega de mensagens através da Internet;',
          'As três partes de um endereço de email: nome @ domínio . extensão.',
        ],
        en: [
          'What electronic mail (email) is and what it is used for;',
          'The difference between a traditional letter and an email;',
          'How messages travel and get delivered across the Internet;',
          'The three components of an email address: username @ domain . extension.',
        ],
      },
      explanation: {
        pt: [
          'O correio eletrónico, habitualmente conhecido por email, é um serviço da Internet que permite enviar e receber mensagens escritas e ficheiros entre pessoas em qualquer parte do mundo em poucos segundos.',
          'Um endereço de email é único em todo o planeta e tem três partes fundamentais: o nome do utilizador (ex: joao.silva), o símbolo especial arroba (@) que significa "em" ou "pertencente a", e o nome do servidor/domínio (ex: escola.pt ou gmail.com).',
          'Ao contrário de uma carta de papel, um email não precisa de selo postal e chega quase instantaneamente à caixa de correio do destinatário.',
          'Para teres um email escolar, a tua escola costuma fornecer-te uma conta segura dedicada a trabalhos, recados dos professores e atividades letivas.',
        ],
        en: [
          'Electronic mail, commonly known as email, is an Internet service allowing people across the world to exchange text messages and computer files within seconds.',
          'An email address is unique worldwide and consists of three key parts: the username (e.g., joao.silva), the "at" symbol (@) signifying "at" or "hosted by", and the server/domain name (e.g., school.pt or gmail.com).',
          'Unlike a paper letter, an email requires no postage stamp and arrives almost instantaneously in the recipient’s digital mailbox.',
          'For schoolwork, your school typically provides a protected school account dedicated to assignments, notices from teachers, and class activities.',
        ],
      },
      example: {
        title: {
          pt: 'A anatomia de um endereço de email escolar',
          en: 'Anatomy of a student school email',
        },
        scenario: {
          pt: 'Observa o endereço: "leonor.martins@escola-central.pt". O "leonor.martins" é o nome da aluna, o "@" junta as duas partes, e "escola-central.pt" é o domínio da escola em Portugal (.pt).',
          en: 'Examine the address: "leonor.martins@central-school.pt". "leonor.martins" identifies the student, "@" connects the two parts, and "central-school.pt" is the school domain in Portugal (.pt).',
        },
        tip: {
          pt: 'Nunca coloques espaços nem acentos no teu endereço de email!',
          en: 'Never put spaces or accent marks inside an email address!',
        },
      },
      funFact: {
        pt: 'O primeiro email da história foi enviado em 1971 por um engenheiro chamado Ray Tomlinson. Foi ele quem escolheu o símbolo "@" no teclado porque quase ninguém o utilizava na altura!',
        en: 'The very first email was sent in 1971 by engineer Ray Tomlinson. He chose the "@" symbol on the keyboard because almost nobody was using it back then!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se enviares um email para um colega que tem o computador desligado, a mensagem perde-se para sempre?',
          en: 'If you send an email to a friend whose computer is turned off, is the message lost forever?',
        },
        clue: {
          pt: 'Pensa no que acontece quando o carteiro deixa uma carta na caixa de correio da tua casa enquanto estás na praia.',
          en: 'Think what happens when the mail carrier drops a letter into your home mailbox while you are at the beach.',
        },
        reflection: {
          pt: 'Não se perde! A mensagem fica guardada em segurança no servidor de correio do destinatário. Assim que ele ligar o computador ou tablet e abrir o email, a mensagem estará lá à espera dele na Caixa de Entrada.',
          en: 'It is not lost! The message stays securely stored on the recipient’s email server. As soon as they turn on their computer or tablet and open their inbox, the message will be waiting there.',
        },
      },
      quizQuestions: [
        {
          id: 'e1-q1',
          question: {
            pt: 'Qual é o símbolo obrigatório que separa o nome do utilizador do domínio num endereço de email?',
            en: 'Which mandatory symbol separates the username from the domain in an email address?',
          },
          options: {
            pt: ['# (Cardinal)', '@ (Arroba)', '& (E comercial)', '$ (Cifrão)'],
            en: ['# (Hash)', '@ (At sign)', '& (Ampersand)', '$ (Dollar)'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! O símbolo @ (arroba) é indispensável em qualquer endereço de correio eletrónico.',
            en: 'Correct! The @ (at symbol) is indispensable in any email address.',
          },
        },
        {
          id: 'e1-q2',
          question: {
            pt: 'Qual dos seguintes endereços de email está escrito corretamente segundo as normas técnicas?',
            en: 'Which of the following email addresses is written properly according to technical standards?',
          },
          options: {
            pt: ['joao silva@escola pt', 'joao.silva@escola.pt', 'joao@silva@escola.pt', 'joão.silva#escola.pt'],
            en: ['joao silva@school pt', 'joao.silva@school.pt', 'joao@silva@school.pt', 'joão.silva#school.pt'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! "joao.silva@escola.pt" não tem espaços, tem apenas uma arroba e tem o ponto antes da terminação.',
            en: 'Well done! "joao.silva@school.pt" has no spaces, only one @ symbol, and a dot before the domain extension.',
          },
        },
        {
          id: 'e1-q3',
          question: {
            pt: 'Uma das grandes vantagens do correio eletrónico em relação à carta tradicional é:',
            en: 'A major advantage of email compared to traditional paper letters is:',
          },
          options: {
            pt: ['Chegar quase instantaneamente a qualquer parte do mundo', 'Ser obrigatório imprimir em papel', 'Precisar sempre de selos dos correios', 'Só funcionar de manhã'],
            en: ['Arriving almost instantaneously anywhere across the globe', 'Being mandatory to print on paper', 'Always requiring physical postage stamps', 'Only working in the morning'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! O envio e receção são praticamente imediatos e digitais.',
            en: 'Exactly! Delivery and receipt are virtually immediate and digital.',
          },
        },
      ],
    },
    {
      id: 'email-inbox',
      themeId: 'correio-eletronico',
      number: 2,
      icon: 'Inbox',
      title: {
        pt: 'A caixa de entrada e as pastas de correio',
        en: 'The inbox and email folders',
      },
      shortDesc: {
        pt: 'Aprende a navegar pelas diferentes pastas: Entrada, Enviados, Rascunhos, Spam e Lixo eletrónico.',
        en: 'Learn how to navigate the different folders: Inbox, Sent, Drafts, Spam, and Trash.',
      },
      whatYouWillLearn: {
        pt: [
          'A função da Caixa de Entrada (Inbox);',
          'Para que serve a pasta de Enviados e a pasta de Rascunhos;',
          'O que é a pasta de Spam / Lixo Eletrónico e porque existem emails lá;',
          'Como manter a tua caixa de correio organizada e limpa.',
        ],
        en: [
          'The role of the primary Inbox;',
          'What the Sent folder and Drafts folder are used for;',
          'What Spam / Junk mail is and why certain emails end up there;',
          'How to keep your digital mailbox neat and organized.',
        ],
      },
      explanation: {
        pt: [
          'A tua aplicação de email organiza as mensagens em várias pastas especializadas para que encontres tudo facilmente.',
          'A Caixa de Entrada (Inbox) é onde chegam todos os emails novos que te foram enviados por professores, colegas ou plataformas escolares.',
          'A pasta de "Enviados" guarda uma cópia exata de todas as mensagens que tu próprio escreveste e enviaste.',
          'A pasta de "Rascunhos" guarda automaticamente mensagens que começaste a escrever mas que ainda não enviaste, para não perderes o texto se a bateria acabar.',
          'A pasta de "Spam" ou "Lixo Eletrónico" contém mensagens publicitárias não solicitadas ou emails suspeitos detetados pelos filtros automáticos de segurança.',
        ],
        en: [
          'Your email application sorts messages into specialized folders so you can locate everything promptly.',
          'The Inbox is where all incoming messages sent by teachers, peers, or learning platforms arrive.',
          'The Sent folder preserves an exact record of all the emails you composed and sent.',
          'The Drafts folder automatically saves messages you started writing but have not yet dispatched, ensuring no work is lost.',
          'The Spam or Junk folder catches unsolicited advertising or suspicious messages caught by automated security filters.',
        ],
      },
      example: {
        title: {
          pt: 'O trabalho inacabado no intervalo',
          en: 'The unfinished message before recess',
        },
        scenario: {
          pt: 'O Gonçalo estava a escrever uma mensagem à professora de Ciências, mas tocou a campainha para o intervalo. Fechou o computador sem enviar. Quando voltou à tarde, abriu a pasta "Rascunhos" e o texto estava exatamente lá pronto para ser terminado!',
          en: 'Gonçalo was drafting an email to his Science teacher when the recess bell rang. He closed his laptop without sending. Later, he opened the "Drafts" folder and his text was intact, ready to finish!',
        },
        tip: {
          pt: 'A pasta de rascunhos é a tua aliada para rever com calma antes de carregar em "Enviar"!',
          en: 'The drafts folder is your ally to review carefully before hitting "Send"!',
        },
      },
      funFact: {
        pt: 'A palavra "Spam" veio de um antigo sketch cómico dos Monty Python sobre uma lata de carne picada com esse nome que era repetida sem parar até fartar toda a gente!',
        en: 'The word "Spam" originated from an old Monty Python comedy sketch about canned meat that was repeated incessantly until everyone grew tired of it!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se a tua professora disser que te enviou a ficha de TIC mas não a vês na Caixa de Entrada, que outra pasta deves espreitar?',
          en: 'If your teacher says she emailed the ICT worksheet but it is not in your Inbox, what other folder should you inspect?',
        },
        clue: {
          pt: 'Às vezes os filtros de segurança automáticos colocam por engano um email legítimo numa pasta de proteção.',
          en: 'Sometimes automated filters mistakenly direct a legitimate message into a protective folder.',
        },
        reflection: {
          pt: 'Deves espreitar a pasta de Spam ou Lixo Eletrónico! Por vezes, emails com anexos ou vindos de novos contactos são desviados pelo filtro. Se estiver lá, podes marcá-lo como "Não é Spam" para voltar à Caixa de Entrada.',
          en: 'You should check the Spam or Junk folder! Occasionally, emails with attachments or new addresses are diverted by the filter. If you find it, mark it as "Not Spam" to move it back to your Inbox.',
        },
      },
      quizQuestions: [
        {
          id: 'e2-q1',
          question: {
            pt: 'Em que pasta ficam guardadas as mensagens que começaste a redigir mas ainda não enviaste?',
            en: 'In which folder are messages saved if you started typing them but have not sent them yet?',
          },
          options: {
            pt: ['Lixo', 'Rascunhos (Drafts)', 'Caixa de Entrada', 'Enviados'],
            en: ['Trash', 'Drafts', 'Inbox', 'Sent'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! A pasta de Rascunhos salva o teu progresso para poderes continuar mais tarde.',
            en: 'Correct! The Drafts folder preserves your unfinished text so you can finish later.',
          },
        },
        {
          id: 'e2-q2',
          question: {
            pt: 'O que deves fazer se encontrares um email estranho com promoções na pasta de Spam?',
            en: 'What should you do if you encounter a weird promotional email in your Spam folder?',
          },
          options: {
            pt: ['Abrir e clicar em todos os links', 'Apagar a mensagem e não abrir nenhum anexo suspeito', 'Reenviar para a turma toda', 'Responder a pedir mais informações'],
            en: ['Open and click all embedded links', 'Delete the message and avoid opening any suspicious attachments', 'Forward it to the entire class', 'Reply asking for more details'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Mensagens de spam devem ser apagadas sem clicar nos links para proteger o teu computador.',
            en: 'Well done! Spam messages should be discarded without clicking links to keep your system safe.',
          },
        },
        {
          id: 'e2-q3',
          question: {
            pt: 'Onde podes confirmar se um trabalho que enviaste ao professor foi realmente despachado?',
            en: 'Where can you verify if an assignment you submitted to your teacher was truly dispatched?',
          },
          options: {
            pt: ['Na pasta "Enviados"', 'Na reciclagem do computador', 'Nas fotografias', 'No histórico do YouTube'],
            en: ['In the "Sent" folder', 'In the computer recycling bin', 'In the photo album', 'In the YouTube history'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! Se a mensagem estiver na pasta de Enviados, significa que foi expedida com sucesso pelo servidor.',
            en: 'Perfect! If the message is in the Sent folder, it was successfully dispatched by the server.',
          },
        },
      ],
    },
    {
      id: 'email-write',
      themeId: 'correio-eletronico',
      number: 3,
      icon: 'Send',
      title: {
        pt: 'Como escrever um email: estrutura e cortesia',
        en: 'How to write an email: structure and etiquette',
      },
      shortDesc: {
        pt: 'Domina os 6 elementos essenciais de um email: destinatário, assunto, saudação, corpo, despedida e assinatura.',
        en: 'Master the 6 essential components of an email: recipient, subject line, greeting, body, sign-off, and signature.',
      },
      whatYouWillLearn: {
        pt: [
          'Os 6 elementos obrigatórios de um email formal ou escolar;',
          'Como escolher um Assunto claro, curto e informativo;',
          'Saudações adequadas para professores e colegas;',
          'Como redigir a despedida e criar a tua assinatura de aluno.',
        ],
        en: [
          'The 6 required parts of a formal or school email;',
          'How to write a clear, concise, and informative Subject line;',
          'Polite greetings for teachers and schoolmates;',
          'How to craft a polite sign-off and student signature.',
        ],
      },
      explanation: {
        pt: [
          'Um email bem escrito demonstra respeito, maturidade e facilita a compreensão rápida da mensagem.',
          '1. Destinatário (Para/To): O endereço de quem vai receber a mensagem.',
          '2. Assunto (Subject): Um resumo de 3 a 6 palavras sobre o tema. Exemplo correto: "Dúvida no trabalho de TIC — 5.º B". Nunca deixes o assunto em branco!',
          '3. Saudação inicial: Começa com respeito. Exemplo para o professor: "Estimado Professor Silva," ou "Bom dia, Professora Ana,".',
          '4. Corpo da mensagem: O texto principal onde explicas a tua dúvida ou pedido com frases claras e pontuação correta.',
          '5. Despedida formal: Finaliza com cortesia: "Com os melhores cumprimentos," ou "Atentamente,".',
          '6. Assinatura: O teu nome completo, número de aluno e turma (ex: "Tomás Costa, n.º 14, 5.º A").',
        ],
        en: [
          'A well-composed email reflects respect, maturity, and ensures the recipient comprehends your intent swiftly.',
          '1. Recipient (To): The email address of the person who will receive the note.',
          '2. Subject: A brief summary of 3 to 6 words. Proper example: "ICT Homework Question — 5th Grade". Never leave the subject blank!',
          '3. Greeting: Begin respectfully. For a teacher: "Dear Mr. Silva," or "Good morning, Mrs. Ana,".',
          '4. Message Body: The core paragraph explaining your inquiry or assignment clearly with proper punctuation.',
          '5. Sign-off: Conclude courteously: "Best regards," or "Sincerely,".',
          '6. Signature: Your full name, student number, and class (e.g., "Tomás Costa, No. 14, 5th Grade A").',
        ],
      },
      example: {
        title: {
          pt: 'Exemplo real de email exemplar de um aluno de 5.º ano',
          en: 'Real example of an exemplary 5th grade student email',
        },
        scenario: {
          pt: 'Para: professor.manuel@escola.pt\nAssunto: Trabalho de TIC — Dúvida sobre o Tema 2\n\nCaro Professor Manuel,\nEspero que se encontre bem.\nGostaria de perguntar se o trabalho sobre segurança na Internet pode ter imagens ilustrativas nos diapositivos.\nObrigado pela sua ajuda.\n\nCom os melhores cumprimentos,\nMariana Ferreira, n.º 18, 5.º C',
          en: 'To: teacher.manuel@school.pt\nSubject: ICT Assignment — Question regarding Topic 2\n\nDear Mr. Manuel,\nI hope you are doing well.\nI would like to ask whether our Internet safety project may include illustrative pictures on the slides.\nThank you for your assistance.\n\nBest regards,\nMariana Ferreira, No. 18, 5th Grade C',
        },
        tip: {
          pt: 'Repara como a mensagem é curta, educada, fácil de ler e tem todos os dados necessários para o professor saber logo quem enviou!',
          en: 'Notice how the note is polite, neat, quick to digest, and gives the teacher all details right away!',
        },
      },
      funFact: {
        pt: 'Deixar o campo do "Assunto" vazio é um dos erros mais frequentes dos utilizadores, e faz com que muitos emails sejam automaticamente rejeitados ou confundidos com vírus!',
        en: 'Leaving the "Subject" line empty is one of the most common mistakes, often causing messages to be filtered out or suspected of being spam!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se enviares um email a um professor apenas com o texto "Olha enviei o trabalho", o que está a faltar?',
          en: 'If you email your teacher saying only "Hey I sent the homework", what is missing?',
        },
        clue: {
          pt: 'Pensa se o professor sabe de que disciplina, turma ou trabalho estás a falar.',
          en: 'Think if the teacher knows which subject, class, or assignment you are referring to.',
        },
        reflection: {
          pt: 'Falta tudo o que é essencial! Falta uma saudação respeitosa, o teu nome e turma, o assunto explicativo e uma despedida educada. O professor ensina centenas de alunos e precisa de saber quem tu és.',
          en: 'Almost every crucial element is missing! It lacks a polite greeting, your name and class, a descriptive subject line, and a courteous sign-off. Teachers work with hundreds of students and need clarity.',
        },
      },
      quizQuestions: [
        {
          id: 'e3-q1',
          question: {
            pt: 'Qual destas opções é o melhor exemplo de um "Assunto" para entregar um trabalho escolar?',
            en: 'Which of these is the best example of a "Subject" line when submitting schoolwork?',
          },
          options: {
            pt: ['Olá', 'Trabalho de TIC — Entrega Ficha 1 — João Silva 5.º A', 'coisas', 'Urgente!!!!!'],
            en: ['Hello', 'ICT Homework — Submission Sheet 1 — João Silva 5th A', 'stuff', 'Urgent!!!!!'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Excelente! Indica a disciplina, o tipo de trabalho e identifica o aluno e a turma com clareza.',
            en: 'Excellent! It specifies the subject, the assignment title, and identifies the student and class clearly.',
          },
        },
        {
          id: 'e3-q2',
          question: {
            pt: 'O que deve constar na assinatura de um email enviado por um aluno?',
            en: 'What should appear in the signature block of an email sent by a student?',
          },
          options: {
            pt: ['O nome de um super-herói', 'O nome completo do aluno, número e turma', 'Apenas emojis engraçados', 'A lista dos amigos'],
            en: ['A superhero nickname', 'The student full name, number, and class', 'Just funny emojis', 'A list of best friends'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! A assinatura identifica quem és de forma inequívoca para o destinatário.',
            en: 'Correct! The signature unmistakably identifies who you are to the recipient.',
          },
        },
        {
          id: 'e3-q3',
          question: {
            pt: 'Qual é a saudação mais recomendada ao escrever um email formal para um professor?',
            en: 'Which greeting is most recommended when writing a formal email to a teacher?',
          },
          options: {
            pt: ['E aí mano', 'Estimado(a) Professor(a), ou Bom dia, Professor(a),', 'Responde rápido', 'Ei você'],
            en: ['Sup bro', 'Dear Teacher, or Good morning, Teacher,', 'Answer fast', 'Hey you'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Expressa educação, consideração e o respeito próprio do ambiente escolar.',
            en: 'Very good! It conveys courtesy, consideration, and the decorum expected in school settings.',
          },
        },
      ],
    },
    {
      id: 'email-attachments',
      themeId: 'correio-eletronico',
      number: 4,
      icon: 'Paperclip',
      title: {
        pt: 'Ficheiros anexos: como partilhar e cuidados a ter',
        en: 'File attachments: sharing and safety precautions',
      },
      shortDesc: {
        pt: 'Aprende a anexar trabalhos com o símbolo do clipe (📎), reconhecer formatos comuns (PDF, DOCX) e detetar anexos perigosos.',
        en: 'Learn how to attach schoolwork using the paperclip icon (📎), identify standard formats (PDF, DOCX), and spot dangerous files.',
      },
      whatYouWillLearn: {
        pt: [
          'O que é um ficheiro anexo (Attachment);',
          'O ícone universal do clipe de papel (📎) para anexar ficheiros;',
          'Formatos comuns para trabalhos da escola (PDF, DOCX, PNG, PPTX);',
          'Perigos de ficheiros executáveis (.exe, .scr) e regras de segurança.',
        ],
        en: [
          'What a file attachment is;',
          'The universal paperclip icon (📎) used to attach files;',
          'Standard file extensions for schoolwork (PDF, DOCX, PNG, PPTX);',
          'Risks of executable files (.exe, .scr) and essential safety rules.',
        ],
      },
      explanation: {
        pt: [
          'Um anexo é qualquer documento, imagem, apresentação ou folha de cálculo do teu computador que juntas à mensagem de correio eletrónico para enviar a outra pessoa.',
          'Para anexares um ficheiro, procuras quase sempre o botão com a imagem de um clipe metálico (📎). Ao clicares, abre-se uma janela para escolheres o ficheiro guardado no teu computador.',
          'Formatos habituais de estudo incluem: documentos de texto (.docx, .odt), apresentações (.pptx), imagens (.png, .jpg) e documentos finais protegidos (.pdf).',
          'Regra de ouro de cibersegurança: NUNCA abras anexos terminados em ".exe", ".bat", ".scr" ou ".vbs" vindos por email, especialmente de remetentes desconhecidos! Esses ficheiros podem conter programas maliciosos que danificam o teu sistema.',
        ],
        en: [
          'An attachment is any document, image, presentation, or spreadsheet on your computer that you link to an email to send to someone else.',
          'To attach a file, you typically click the universal paperclip icon (📎). This opens a dialog to select the file stored on your device.',
          'Common study formats include text documents (.docx, .odt), slide decks (.pptx), graphics (.png, .jpg), and portable read-only documents (.pdf).',
          'Cybersecurity golden rule: NEVER open attachments ending in ".exe", ".bat", ".scr", or ".vbs" received via email, especially from unknown senders! These files can execute code that harms your device.',
        ],
      },
      example: {
        title: {
          pt: 'O trabalho de grupo da Inês',
          en: 'Inês’s group presentation file',
        },
        scenario: {
          pt: 'A Inês terminou a apresentação sobre a História dos Computadores. Gravou o ficheiro com o nome claro "TIC_Apresentacao_Ines_5B.pdf", abriu o email, clicou no clipe (📎), selecionou o ficheiro e esperou que a barra de carregamento terminasse antes de carregar em "Enviar".',
          en: 'Inês finished her presentation on the History of Computing. She saved the file with a clear filename "ICT_Presentation_Ines_5B.pdf", opened her email, clicked the paperclip (📎), chose the file, and waited for the upload bar to finish before clicking "Send".',
        },
        tip: {
          pt: 'Dar um nome claro e organizado aos teus ficheiros antes de os anexar poupa imenso tempo aos teus professores!',
          en: 'Giving clear, tidy names to your files before attaching them saves teachers immense time!',
        },
      },
      funFact: {
        pt: 'A maioria dos serviços de correio eletrónico tem um limite de tamanho para anexos (habitualmente entre 20 a 25 Megabytes). Para ficheiros muito grandes, como vídeos longos, utilizam-se ligações seguras na nuvem (Cloud)!',
        en: 'Most email providers place a size cap on attachments (typically 20 to 25 Megabytes). For larger files like long videos, secure cloud drive links are used instead!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Recebeste um email de um remetente estranho a dizer: "Vê a tua prenda no anexo fotos_segredo.zip.exe". Deves dar duplo clique no anexo?',
          en: 'You received an email from an unknown sender stating: "Check your secret gift in photos_secret.zip.exe". Should you double-click it?',
        },
        clue: {
          pt: 'Repara na última extensão do ficheiro (.exe).',
          en: 'Notice the final file extension (.exe).',
        },
        reflection: {
          pt: 'Absolutamente não! A terminação ".exe" revela que se trata de um ficheiro executável disfarçado para tentar instalar um vírus no teu computador. Apaga o email de imediato.',
          en: 'Absolutely not! The ".exe" extension indicates an executable application disguised to infect your computer with malware. Delete the email immediately.',
        },
      },
      quizQuestions: [
        {
          id: 'e4-q1',
          question: {
            pt: 'Qual é o ícone universal utilizado na maioria dos programas para anexar um ficheiro a um email?',
            en: 'Which universal icon is used in most email programs to attach a file?',
          },
          options: {
            pt: ['Um clipe de papel (📎)', 'Uma tesoura (✂️)', 'Uma borracha', 'Um carro'],
            en: ['A paperclip (📎)', 'Scissors (✂️)', 'An eraser', 'A car'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! O clipe de papel simboliza prender um documento a uma carta.',
            en: 'Correct! The paperclip symbolizes clipping a document onto a letter.',
          },
        },
        {
          id: 'e4-q2',
          question: {
            pt: 'Qual destes tipos de ficheiro é seguro e muito comum para enviar trabalhos escritos ao professor?',
            en: 'Which of these file types is safe and widely used for sending written schoolwork to a teacher?',
          },
          options: {
            pt: ['.PDF ou .DOCX', '.EXE', '.BAT', '.SCR'],
            en: ['.PDF or .DOCX', '.EXE', '.BAT', '.SCR'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Muito bem! Ficheiros .PDF e .DOCX são formatos padronizados para leitura e edição de textos.',
            en: 'Well done! .PDF and .DOCX are standard formats for text reading and editing.',
          },
        },
        {
          id: 'e4-q3',
          question: {
            pt: 'O que deves fazer se receberes um anexo inesperado de um endereço que não conheces?',
            en: 'What should you do if you receive an unexpected attachment from an unrecognized address?',
          },
          options: {
            pt: ['Não abrir o anexo, apagar o email e pedir ajuda a um adulto', 'Abrir imediatamente para ver o que tem dentro', 'Descarregar para todos os computadores da escola', 'Mudar a tua palavra-passe para o nome do ficheiro'],
            en: ['Do not open the attachment, delete the email, and seek guidance from an adult', 'Open it immediately to check the contents', 'Download it to all computers at school', 'Change your password to the filename'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! Nunca se abrem anexos inesperados ou suspeitos por precaução de segurança.',
            en: 'Perfect! Never open unexpected or suspicious attachments as a matter of basic hygiene.',
          },
        },
      ],
    },
    {
      id: 'email-security',
      themeId: 'correio-eletronico',
      number: 5,
      icon: 'ShieldAlert',
      title: {
        pt: 'Segurança no correio eletrónico e defesa contra fraudes',
        en: 'Email security and defense against fraud',
      },
      shortDesc: {
        pt: 'Aprende a identificar emails falsos, sinais de phishing, links enganadores e a nunca fornecer palavras-passe.',
        en: 'Learn how to spot deceptive emails, phishing cues, scam links, and why passwords must never be disclosed.',
      },
      whatYouWillLearn: {
        pt: [
          'Como os burlões utilizam o email para tentar enganar as pessoas;',
          'Os 4 principais sinais de um email de Phishing;',
          'O perigo de clicar em hiperligações falsas;',
          'A regra absoluta: nenhuma entidade séria te pede a palavra-passe por email.',
        ],
        en: [
          'How scammers use email to deceive people;',
          'The 4 main indicators of a Phishing email;',
          'The hazards of clicking deceitful hyperlinks;',
          'The absolute rule: no legitimate organization will ever request your password via email.',
        ],
      },
      explanation: {
        pt: [
          'O correio eletrónico é seguro quando usado com atenção, mas é a porta de entrada preferida de mensagens fraudulentas.',
          'Um email de Phishing costuma apresentar 4 sinais de alarme:\n1. Sensação de urgência ("A tua conta vai ser apagada em 2 horas!");\n2. Erros de ortografia e gramática estranhos;\n3. Endereço do remetente esquisito (ex: suporte@google-servico-falso123.com em vez do domínio oficial);\n4. Pedido para clicares num link e introduzires a tua palavra-passe.',
          'Nunca forneças a tua palavra-passe, morada ou dados bancários em resposta a um email, mesmo que a mensagem diga que é do teu banco ou da direção da escola.',
          'Se tiveres dúvidas sobre a autenticidade de uma mensagem, fala sempre pessoalmente com o teu professor ou com os teus pais antes de tomares qualquer atitude.',
        ],
        en: [
          'Email is safe when used with attentiveness, but it remains a favored channel for fraudulent schemes.',
          'A Phishing email typically carries 4 red flags:\n1. Artificial sense of urgency ("Your account will be terminated in 2 hours!");\n2. Odd spelling and grammatical mistakes;\n3. Suspicious sender address (e.g., support@google-fake-service123.com rather than official domains);\n4. Request to click a link and re-enter your private password.',
          'Never provide your password, address, or banking credentials in response to an email, even if the message purports to be from a bank or school administration.',
          'Whenever in doubt regarding message authenticity, consult your teacher or parents in person before taking action.',
        ],
      },
      example: {
        title: {
          pt: 'O falso email da plataforma de jogos',
          en: 'The counterfeit gaming platform email',
        },
        scenario: {
          pt: 'O Bernardo recebeu um email com o logótipo da Sony PlayStation a dizer: "Alerta de segurança! Alguém tentou entrar na tua conta. Clica no link e escreve a tua palavra-passe para confirmar que és o dono". O Bernardo olhou para o remetente e viu que era "seguranca@playstation-suporte-urgente.xyz". Desconfiou e apagou logo!',
          en: 'Bernardo received an email displaying a Sony PlayStation logo saying: "Security Alert! Someone attempted to access your account. Click the link and enter your password to confirm ownership". Bernardo checked the sender and noticed "security@playstation-support-urgent.xyz". He identified the scam and deleted it!',
        },
        tip: {
          pt: 'Verificar o endereço real do remetente com muita atenção é a melhor arma contra o phishing!',
          en: 'Checking the sender’s actual email address carefully is your sharpest shield against phishing!',
        },
      },
      funFact: {
        pt: 'Mais de 3 mil milhões de mensagens de phishing são enviadas na Internet todos os dias em todo o mundo. Felizmente, os filtros inteligentes conseguem bloquear a grande maioria antes de chegarem ao utilizador!',
        en: 'Over 3 billion phishing emails are dispatched across the Internet daily worldwide. Fortunately, smart filters neutralize the vast majority before they reach inboxes!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se a tua escola te enviar um email a pedir para responderes indicando a tua palavra-passe para renovar a matrícula, deves responder?',
          en: 'If your school emails you asking for your password to renew your annual enrollment, should you reply?',
        },
        clue: {
          pt: 'Lembra-te da regra de ouro: quem administra o sistema já tem as ferramentas e nunca precisa da tua palavra-passe.',
          en: 'Remember the golden rule: system administrators have system tools and never ask for student passwords.',
        },
        reflection: {
          pt: 'Não deves responder! Nem a direção da escola, nem os professores, nem empresas como a Google ou a Microsoft pedem palavras-passe por email. Trata-se de uma tentativa de burla.',
          en: 'You must not reply! Neither school principals, nor teachers, nor tech companies like Google or Microsoft ask for passwords via email. It is a scam.',
        },
      },
      quizQuestions: [
        {
          id: 'e5-q1',
          question: {
            pt: 'Qual destas frases é um sinal típico de uma mensagem de phishing?',
            en: 'Which of these statements is a classic hallmark of a phishing email?',
          },
          options: {
            pt: ['"URGENTE: Tens 15 minutos para carregar aqui ou a tua conta será eliminada!"', '"Boa tarde, aqui está a ficha de leitura recomendada para a aula de amanhã."', '"A reunião de pais realiza-se na próxima quinta-feira."', '"Boas férias a todos os alunos."'],
            en: ['"URGENT: You have 15 minutes to click here or your account will be deleted!"', '"Good afternoon, here is the recommended reading sheet for tomorrow’s class."', '"Parent-teacher conference is scheduled for next Thursday."', '"Have a wonderful break everyone."'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! Criar pânico e pressa artificial é a tática mais usada para fazer as pessoas agirem sem pensar.',
            en: 'Correct! Inducing panic and artificial urgency is the primary tactic used to make victims act without thinking.',
          },
        },
        {
          id: 'e5-q2',
          question: {
            pt: 'O que deves fazer se receberes um email a pedir para clicares num link e confirmares a tua palavra-passe?',
            en: 'What should you do if an email asks you to click a link and re-enter your password?',
          },
          options: {
            pt: ['Introduzir a palavra-passe depressa', 'Nunca introduzir a palavra-passe, desconfiar e alertar um adulto', 'Enviar a palavra-passe do teu colega', 'Reencaminhar para as redes sociais'],
            en: ['Enter the password quickly', 'Never enter your password, be suspicious, and tell an adult', 'Send your friend’s password', 'Forward to social media'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Nenhuma instituição legítima solicita palavras-passe por correio eletrónico.',
            en: 'Very well! No legitimate organization requests passwords over email.',
          },
        },
        {
          id: 'e5-q3',
          question: {
            pt: 'Como podes inspecionar para onde vai realmente um link num email antes de clicares nele?',
            en: 'How can you preview where a link in an email truly leads before clicking it?',
          },
          options: {
            pt: ['Passar o cursor do rato por cima do link (sem clicar) para ver o endereço no canto inferior do ecrã', 'Carregar várias vezes seguidas com força', 'Desligar o monitor', 'Tirar uma fotografia'],
            en: ['Hover the mouse cursor over the link (without clicking) to preview the destination URL at the bottom', 'Click it repeatedly with force', 'Turn off the screen', 'Take a snapshot'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente técnica! Passar o rato por cima permite ver o destino real da hiperligação.',
            en: 'Superb technique! Hovering allows you to inspect the true web destination before clicking.',
          },
        },
      ],
    },
    {
      id: 'email-etiquette',
      themeId: 'correio-eletronico',
      number: 6,
      icon: 'Smile',
      title: {
        pt: 'Regras de utilização e netiqueta no correio eletrónico',
        en: 'Rules of usage and netiquette in email',
      },
      shortDesc: {
        pt: 'Aprende as boas maneiras digitais: por que não deves escrever tudo em maiúsculas, evitar correntes e respeitar a privacidade.',
        en: 'Learn digital manners: why writing in all caps equals shouting, avoiding chain letters, and respecting privacy.',
      },
      whatYouWillLearn: {
        pt: [
          'O significado do termo "Netiqueta" (etiqueta na rede);',
          'Porque é que ESCREVER EM MAIÚSCULAS significa GRITAR;',
          'A importância de rever a ortografia antes de clicar em enviar;',
          'Porque nunca deves reencaminhar mensagens em cadeia nem spam aos teus amigos.',
        ],
        en: [
          'The definition of "Netiquette" (network etiquette);',
          'Why WRITING IN ALL CAPS EQUALS SHOUTING;',
          'The importance of proofreading spelling before dispatching;',
          'Why you should never forward chain letters or spam to peers.',
        ],
      },
      explanation: {
        pt: [
          'A Netiqueta é o conjunto de regras de boa educação, respeito e bom senso que devemos praticar sempre que comunicamos na Internet.',
          'Regra fundamental: Na comunicação digital, escrever uma frase inteira com LETRAS MAIÚSCULAS equivale a GRITAR com a outra pessoa! Usa maiúsculas apenas no início das frases e nos nomes próprios.',
          'Antes de enviares qualquer email escolar, lê a mensagem com atenção de início ao fim para corrigir erros de escrita ou palavras em falta.',
          'Evita correntes de mensagens do género "Reenvia este email a 10 amigos ou terás azar". Isso entope os servidores, espalha spam e incomoda os colegas.',
          'Respeita a privacidade: nunca partilhes o endereço de email de um colega com pessoas desconhecidas sem a autorização dele.',
        ],
        en: [
          'Netiquette is the collection of good manners, respect, and common sense rules that we must follow whenever communicating online.',
          'Fundamental rule: In digital writing, typing an entire sentence in ALL CAPS is considered the equivalent of SHOUTING at the other person! Use capital letters only at the start of sentences and for proper nouns.',
          'Before dispatching any school email, proofread the note from start to finish to catch typos, punctuation slips, or missing words.',
          'Avoid forwarding chain mail like "Send this to 10 friends or you will have bad luck". It clutters mailboxes, spreads junk, and annoys friends.',
          'Respect privacy: never share a classmate’s email address with strangers without their consent.',
        ],
      },
      example: {
        title: {
          pt: 'A mensagem em maiúsculas do Pedro',
          en: 'Pedro’s all-caps message',
        },
        scenario: {
          pt: 'O Pedro escreveu um email ao professor: "PROFESSOR NÃO CONSIGO ENVIAR O TRABALHO AJUDE-ME". O professor respondeu educadamente, mas explicou-lhe que parecia que o Pedro estava zangado e a gritar. O Pedro percebeu e reescreveu calmamente: "Caro Professor, peço desculpa. Estou com uma dúvida no envio do trabalho. Pode ajudar-me, por favor?".',
          en: 'Pedro emailed his teacher: "TEACHER I CANNOT SUBMIT MY HOMEWORK HELP ME". The teacher answered kindly, but explained that writing in all caps looked angry and aggressive. Pedro understood and rewrote: "Dear Teacher, I apologize. I have a question regarding submitting the file. Could you please assist me?".',
        },
        tip: {
          pt: 'A gentileza e as palavras mágicas ("por favor", "obrigado") abrem todas as portas!',
          en: 'Politeness and magic words ("please", "thank you") open every doorway!',
        },
      },
      funFact: {
        pt: 'A palavra "Netiqueta" é a fusão de duas palavras: "Network" (rede em inglês) e "Etiqueta" (código de boas maneiras). Surgiu logo nos primeiros anos da criação da Internet!',
        en: 'The word "Netiquette" blends "Network" and "Etiquette". It was coined during the early dawn of the Internet to foster mutual goodwill!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se receberes um email de um colega com uma piada maldosa sobre outro rapaz da turma, deves reencaminhar aos outros?',
          en: 'If you receive an email from a classmate containing a mean joke about another boy in class, should you forward it?',
        },
        clue: {
          pt: 'Lembra-te do conteúdo sobre responsabilidade e cyberbullying.',
          en: 'Recall the lesson on responsibility and cyberbullying.',
        },
        reflection: {
          pt: 'Não deves reencaminhar. Reencaminhar mensagens tóxicas faz de ti cúmplice do bullying. Podes responder ao remetente que não concordas com esse tipo de atitude e apagar a mensagem.',
          en: 'Do not forward it. Forwarding toxic messages makes you complicit in bullying. You can reply saying that you disagree with such behavior and delete the email.',
        },
      },
      quizQuestions: [
        {
          id: 'e6-q1',
          question: {
            pt: 'Na linguagem da Internet, o que significa escrever uma mensagem inteira em LETRAS MAIÚSCULAS?',
            en: 'In Internet language, what does writing an entire sentence in CAPITAL LETTERS signify?',
          },
          options: {
            pt: ['Que estás a sussurrar', 'Que estás a gritar com o interlocutor', 'Que a bateria do computador está cheia', 'Que a mensagem é secreta'],
            en: ['That you are whispering', 'That you are shouting at the recipient', 'That your battery is full', 'That the message is top secret'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! Em ambientes digitais, escrever em maiúsculas transmite tom agressivo ou grito.',
            en: 'Correct! In digital communication, typing in all caps conveys shouting or aggressive demeanor.',
          },
        },
        {
          id: 'e6-q2',
          question: {
            pt: 'O que deves fazer com as chamadas "mensagens em cadeia" que pedem para reenviares a 10 pessoas?',
            en: 'What should you do with "chain letters" prompting you to forward them to 10 friends?',
          },
          options: {
            pt: ['Reenviar logo a toda a escola', 'Apagar a mensagem e não dar seguimento', 'Imprimir em papel', 'Publicar no jornal'],
            en: ['Forward them to the entire school', 'Delete the message and do not forward it', 'Print them on paper', 'Publish in the paper'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Correntes de mensagens são lixo eletrónico e não trazem nenhum benefício.',
            en: 'Well done! Chain messages are digital junk and provide zero value.',
          },
        },
        {
          id: 'e6-q3',
          question: {
            pt: 'Antes de carregar no botão "Enviar", qual é a boa prática recomendada na netiqueta?',
            en: 'Before clicking the "Send" button, what is the best practice advised by netiquette?',
          },
          options: {
            pt: ['Reler o texto com calma, verificar o destinatário e certificar que o tom é educado', 'Fechar os olhos e carregar depressa', 'Desligar o cabo de rede', 'Mudar o tipo de letra cinco vezes'],
            en: ['Reread the text calmly, verify the recipient, and ensure the tone is polite', 'Close your eyes and click hurriedly', 'Unplug the network cord', 'Change the font five times'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! A revisão evita mal-entendidos, erros ortográficos e envios para a pessoa errada.',
            en: 'Perfect! Reviewing prevents misunderstandings, spelling errors, and misdirected delivery.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'email-build',
      themeId: 'correio-eletronico',
      number: 1,
      type: 'build_email',
      title: {
        pt: 'Desafio 1 — Constrói um Email',
        en: 'Challenge 1 — Build an Email',
      },
      shortDesc: {
        pt: 'Ordena corretamente os blocos de um email formal: Destinatário, Assunto, Saudação, Mensagem, Despedida e Assinatura.',
        en: 'Correctly arrange the puzzle blocks of a formal email: Recipient, Subject, Greeting, Body, Sign-off, and Signature.',
      },
      icon: 'Layers',
      durationMinutes: 5,
    },
    {
      id: 'email-inspect',
      themeId: 'correio-eletronico',
      number: 2,
      type: 'inspect_email',
      title: {
        pt: 'Desafio 2 — Email Seguro ou Suspeito?',
        en: 'Challenge 2 — Safe or Suspicious Email?',
      },
      shortDesc: {
        pt: 'Inspeciona 4 emails na tua caixa de correio virtual e descobre quais são legítimos e quais escondem perigos.',
        en: 'Inspect 4 emails in your inbox and uncover which are authentic and which conceal hazards.',
      },
      icon: 'Eye',
      durationMinutes: 6,
    },
    {
      id: 'email-compose',
      themeId: 'correio-eletronico',
      number: 3,
      type: 'compose_email',
      title: {
        pt: 'Desafio 3 — Escreve o Email ao Professor',
        en: 'Challenge 3 — Write the Email to Teacher',
      },
      shortDesc: {
        pt: 'Simula a redação de um email para entregar o trabalho de TIC com feedback pedagógico inteligente.',
        en: 'Simulate drafting an email submitting an ICT assignment with smart pedagogical guidance.',
      },
      icon: 'PenTool',
      durationMinutes: 6,
    },
    {
      id: 'email-folders',
      themeId: 'correio-eletronico',
      number: 4,
      type: 'folder_sorting',
      title: {
        pt: 'Desafio 4 — Onde Pertence?',
        en: 'Challenge 4 — Where Does It Belong?',
      },
      shortDesc: {
        pt: 'Classifica 6 mensagens para as suas pastas certas: Caixa de Entrada, Rascunhos, Enviados, Spam ou Anexos.',
        en: 'Classify 6 messages into their correct destination folders: Inbox, Drafts, Sent, Spam, or Attachments.',
      },
      icon: 'FolderKanban',
      durationMinutes: 5,
    },
    {
      id: 'quiz-final-tema2',
      themeId: 'correio-eletronico',
      number: 5,
      type: 'final_quiz',
      title: {
        pt: 'Quiz Final — Mestre do Correio Eletrónico',
        en: 'Final Quiz — Email Master',
      },
      shortDesc: {
        pt: 'Mostra o teu domínio sobre emails seguros, netiqueta e pastas, ganha a insígnia Mestre do Email e soma pontos!',
        en: 'Showcase your mastery of email safety, netiquette, and folders, earn the Email Master badge, and gain points!',
      },
      icon: 'Award',
      durationMinutes: 8,
    },
  ],
  finalQuiz: [
    {
      id: 'fq2-1',
      question: {
        pt: 'Qual das seguintes partes NÃO pode faltar num endereço de email válido?',
        en: 'Which of the following components cannot be omitted in a valid email address?',
      },
      options: {
        pt: ['O símbolo arroba (@)', 'O número de telemóvel', 'A palavra "secreto"', 'Um emoji'],
        en: ['The at symbol (@)', 'The mobile phone number', 'The word "secret"', 'An emoji'],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Correto! O símbolo @ é a peça fulcral que separa o utilizador do domínio do servidor.',
        en: 'Correct! The @ symbol is the cornerstone dividing username from server domain.',
      },
    },
    {
      id: 'fq2-2',
      question: {
        pt: 'Para que serve a pasta "Rascunhos" (Drafts)?',
        en: 'What is the purpose of the "Drafts" folder?',
      },
      options: {
        pt: ['Para guardar mensagens que foram apagadas', 'Para guardar automaticamente mensagens iniciadas mas ainda não expedidas', 'Para guardar ficheiros de música', 'Para guardar fotografias de perfil'],
        en: ['To hold discarded messages', 'To automatically preserve messages started but not yet dispatched', 'To store music files', 'To hold profile photos'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Muito bem! Permite salvar o texto inacabado para rever e enviar quando quiseres.',
        en: 'Well done! It allows you to save unfinished writing and send when ready.',
      },
    },
    {
      id: 'fq2-3',
      question: {
        pt: 'Porque nunca deves escrever um email completo com todas as letras em maiúsculas?',
        en: 'Why should you never draft an entire email in all capital letters?',
      },
      options: {
        pt: ['Porque as letras maiúsculas gastam a tinta do ecrã', 'Porque na etiqueta da Internet equivale a gritar com a outra pessoa', 'Porque o computador bloqueia de imediato', 'Porque os professores não sabem ler maiúsculas'],
        en: ['Because capital letters drain screen ink', 'Because in netiquette it is interpreted as shouting at the recipient', 'Because the computer crashes immediately', 'Because teachers cannot read capitals'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Exato! Transmite agressividade e falta de cortesia na comunicação online.',
        en: 'Exactly! It conveys aggressiveness and a lack of online courtesy.',
      },
    },
    {
      id: 'fq2-4',
      question: {
        pt: 'Qual das seguintes extensões de anexo representa o maior perigo de conter um vírus?',
        en: 'Which of the following attachment extensions presents the greatest hazard of harboring a virus?',
      },
      options: {
        pt: ['.PDF', '.PNG', '.EXE', '.DOCX'],
        en: ['.PDF', '.PNG', '.EXE', '.DOCX'],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Certíssimo! Ficheiros executáveis (.EXE) podem correr programas maliciosos no teu sistema operacional.',
        en: 'Spot on! Executable files (.EXE) can launch harmful scripts directly on your operating system.',
      },
    },
    {
      id: 'fq2-5',
      question: {
        pt: 'O que deves fazer se receberes um email que parece do teu banco ou da escola a pedir a tua palavra-passe?',
        en: 'What should you do if you receive an email purporting to be from your bank or school requesting your password?',
      },
      options: {
        pt: ['Responder com a palavra-passe para não ter problemas', 'Reconhecer que é phishing, não partilhar nada e avisar um adulto responsável', 'Enviar uma fotografia do teu cartão de estudante', 'Inscrever o teu amigo'],
        en: ['Reply with the password to avoid trouble', 'Recognize it as phishing, share nothing, and tell a responsible adult', 'Send a snapshot of your student ID', 'Sign up your friend'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Parabéns! Entidades sérias nunca solicitam palavras-passe por correio eletrónico.',
        en: 'Congratulations! Legitimate entities never solicit passwords via email.',
      },
    },
  ],
};
