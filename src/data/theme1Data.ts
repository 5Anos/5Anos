import { ThemeDefinition } from '../types';

export const theme1Data: ThemeDefinition = {
  id: 'seguranca-digital',
  number: 1,
  title: {
    pt: 'Segurança, responsabilidade e respeito em ambientes digitais',
    en: 'Safety, responsibility, and respect in digital environments',
  },
  tagline: {
    pt: 'Aprende a utilizar a Internet e os dispositivos digitais de forma segura, responsável e respeitosa.',
    en: 'Learn to use the Internet and digital devices safely, responsibly, and respectfully.',
  },
  intro: {
    pt: 'Neste tema do 5.º ano, vais descobrir como proteger a tua identidade, defender os teus dispositivos contra perigos online, respeitar os outros colegas na rede e criar trabalhos escolares respeitando os direitos de autor.',
    en: 'In this 5th grade theme, you will discover how to protect your identity, safeguard your devices from online threats, respect fellow peers online, and create school projects that honor copyright laws.',
  },
  icon: 'ShieldCheck',
  accentColor: 'emerald',
  badgeCount: 3,
  modules: [
    {
      id: 'seguranca-digital-intro',
      themeId: 'seguranca-digital',
      number: 1,
      icon: 'Lock',
      title: {
        pt: 'Segurança digital e proteção de dispositivos',
        en: 'Digital safety and device protection',
      },
      shortDesc: {
        pt: 'Aprende o que é a segurança digital, como proteger computadores e telemóveis e criar palavras-passe fortes.',
        en: 'Learn what digital safety is, how to protect computers and phones, and how to create strong passwords.',
      },
      whatYouWillLearn: {
        pt: [
          'O significado de segurança no mundo digital;',
          'Como proteger os teus dispositivos (computador, tablet e telemóvel);',
          'A importância de palavras-passe fortes e não partilháveis;',
          'O que é a autenticação e privacidade básica.',
        ],
        en: [
          'What safety means in the digital world;',
          'How to protect your devices (computer, tablet, and phone);',
          'The importance of strong, private passwords;',
          'What authentication and basic privacy mean.',
        ],
      },
      explanation: {
        pt: [
          'Estar seguro no mundo digital significa saber utilizar a tecnologia sem colocar em risco as tuas informações pessoais, os teus aparelhos ou o teu bem-estar.',
          'Um dispositivo seguro precisa de três cuidados essenciais: um código ou padrão de bloqueio de ecrã, um sistema operativo sempre atualizado e um antivírus ativo para evitar programas prejudiciais (malware).',
          'A tua palavra-passe é a chave digital da tua vida online. Nunca deves utilizar palavras óbvias como "123456" ou o teu nome próprio. Uma palavra-passe forte junta letras maiúsculas, minúsculas, números e símbolos especiais.',
          'Lembra-te: a tua palavra-passe é secreta e pessoal. Apenas os teus pais ou encarregados de educação podem conhecê-la para te ajudar a estar seguro!',
        ],
        en: [
          'Being safe in the digital world means knowing how to use technology without putting your personal information, devices, or wellbeing at risk.',
          'A secure device requires three essential safeguards: a screen lock PIN or pattern, an up-to-date operating system, and an active antivirus to prevent malicious software (malware).',
          'Your password is the digital key to your online life. Never use obvious words like "123456" or your first name. A strong password combines uppercase and lowercase letters, numbers, and special symbols.',
          'Remember: your password is private. Only your parents or guardians may know it to help keep you safe!',
        ],
      },
      example: {
        title: {
          pt: 'O cacifo da escola e a palavra-passe',
          en: 'The school locker and passwords',
        },
        scenario: {
          pt: 'Imagina o cacifo onde guardas os teus cadernos na escola. Se deixares a chave na fechadura ou se a chave for tão simples que qualquer pessoa consiga abrir, as tuas coisas podem desaparecer. Uma palavra-passe forte é como um cadeado robusto de combinação secreta que só tu consegues abrir.',
          en: 'Imagine your school locker where you store your notebooks. If you leave the key in the lock or if the lock is so easy anyone can pick it, your belongings might go missing. A strong password is like a sturdy combination lock that only you can open.',
        },
        tip: {
          pt: 'Dica de ouro: Usa uma frase engraçada como base! Exemplo: "O_Meu_Gato_Salta_7_Vezes!" é muito mais fácil de memorizar e quase impossível de adivinhar.',
          en: 'Golden tip: Use a fun phrase! Example: "My_Cat_Jumps_7_Times!" is easy to remember and almost impossible to guess.',
        },
      },
      funFact: {
        pt: 'Sabias que um computador moderno demora menos de 1 segundo a descobrir uma palavra-passe com 6 letras vulgares (como "escola"), mas pode demorar mais de 300 anos se tiver 12 caracteres misturando maiúsculas, números e símbolos?',
        en: 'Did you know that a modern computer takes less than 1 second to crack a common 6-letter password (like "school"), but could take over 300 years if it has 12 characters mixing uppercase, numbers, and symbols?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se o teu melhor amigo da turma te pedir a tua palavra-passe para te ajudar a passar de nível num jogo, deves emprestar-lha?',
          en: 'If your best classmate asks for your password to help you beat a game level, should you lend it to them?',
        },
        clue: {
          pt: 'Pensa se partilharias a tua chave de casa com um colega sem autorização dos teus pais.',
          en: 'Think if you would lend your front door house key to a classmate without your parents’ permission.',
        },
        reflection: {
          pt: 'Não deves partilhar. Mesmo que confies muito no teu amigo, ele pode esquecer-se da sessão aberta num computador partilhado da biblioteca ou outra pessoa pode ver. A verdadeira amizade respeita a privacidade de cada um!',
          en: 'You should not share it. Even if you trust your friend deeply, they might leave the session logged in on a shared library computer or someone else might peek. True friendship respects personal privacy!',
        },
      },
      quizQuestions: [
        {
          id: 'm1-q1',
          question: {
            pt: 'Qual das seguintes palavras-passe é a mais segura para proteger uma conta?',
            en: 'Which of the following passwords is the most secure to protect an account?',
          },
          options: {
            pt: ['12345678', 'mariasilva2014', 'Sol#Brilhante_98', 'password'],
            en: ['12345678', 'mariasilva2014', 'Bright#Sun_98', 'password'],
          },
          correctIndex: 2,
          explanation: {
            pt: 'Muito bem! "Sol#Brilhante_98" mistura letras maiúsculas, minúsculas, número e símbolos especiais como "#" e "_".',
            en: 'Well done! "Bright#Sun_98" combines uppercase, lowercase, numbers, and special symbols like "#" and "_".',
          },
        },
        {
          id: 'm1-q2',
          question: {
            pt: 'O que deves fazer quando terminas de usar o computador da sala de TIC da escola?',
            en: 'What should you do when you finish using the computer in the school computer lab?',
          },
          options: {
            pt: ['Desligar apenas o monitor', 'Terminar a sessão (Logout) da tua conta', 'Deixar tudo aberto para o próximo colega', 'Não fazer nada'],
            en: ['Just turn off the screen', 'Sign out (Logout) of your account', 'Leave everything open for the next classmate', 'Do nothing'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! Terminar a sessão impede que outro utilizador aceda aos teus trabalhos, mensagens ou dados pessoais.',
            en: 'Correct! Signing out prevents another user from accessing your schoolwork, messages, or personal data.',
          },
        },
        {
          id: 'm1-q3',
          question: {
            pt: 'Para que serve um programa antivírus num dispositivo?',
            en: 'What is the purpose of an antivirus program on a device?',
          },
          options: {
            pt: ['Para limpar o pó do ecrã', 'Para acelerar a ligação à Internet', 'Para detetar e bloquear programas maliciosos que possam danificar o sistema', 'Para desenhar imagens'],
            en: ['To clean dust off the screen', 'To speed up the internet connection', 'To detect and block malicious software that could harm the system', 'To draw pictures'],
          },
          correctIndex: 2,
          explanation: {
            pt: 'Exato! O antivírus funciona como um escudo de proteção contra ameaças e vírus informáticos.',
            en: 'Exactly! Antivirus software works like a protective shield against cyber threats and viruses.',
          },
        },
      ],
    },
    {
      id: 'utilizacao-segura-internet',
      themeId: 'seguranca-digital',
      number: 2,
      icon: 'Globe',
      title: {
        pt: 'Utilização segura da Internet e navegação',
        en: 'Safe Internet browsing and online safety',
      },
      shortDesc: {
        pt: 'Aprende a reconhecer sites seguros (HTTPS), detetar links perigosos e ter cuidado com redes Wi-Fi públicas.',
        en: 'Learn to identify secure websites (HTTPS), spot suspicious links, and stay safe on public Wi-Fi networks.',
      },
      whatYouWillLearn: {
        pt: [
          'Identificar ligações cifradas e o protocolo HTTPS;',
          'Cuidados a ter ao clicar em links e anúncios suspeitos;',
          'O que é o Phishing e como funciona a tentativa de engano;',
          'Regras de segurança ao descarregar ficheiros e usar Wi-Fi público.',
        ],
        en: [
          'Identify encrypted connections and the HTTPS protocol;',
          'Precautions when clicking suspicious links and advertisements;',
          'What Phishing is and how scam attempts work;',
          'Safety rules when downloading files and using public Wi-Fi.',
        ],
      },
      explanation: {
        pt: [
          'Quando navegas na Internet, repara na barra de endereço do navegador. Um endereço que começa por "https://" indica que a comunicação entre o teu aparelho e o site está cifrada (protegida contra interceção na rede). Lembra-te: isto protege os dados em trânsito, mas não significa que o site seja necessariamente honesto ou confiável!',
          'Muitos sites maliciosos tentam atrair crianças com anúncios falsos do género "Ganhaste um telemóvel novo!" ou "Clica aqui para moedas grátis no jogo". Isso são quase sempre armadilhas.',
          'O "Phishing" é uma técnica em que pessoas mal-intencionadas se fazem passar por empresas conhecidas ou escolas para tentar roubar os teus dados ou palavras-passe.',
          'Em redes Wi-Fi públicas (em cafés, centros comerciais ou parques), qualquer pessoa pode tentar intercetar os dados. Por isso, nunca deves aceder a contas importantes nem fornecer informações confidenciais numa rede aberta.',
        ],
        en: [
          'When browsing the Internet, check the browser address bar. An address starting with "https://" means communication is encrypted. Keep in mind that encryption secures data in transit, but does not guarantee the site itself is genuine or honest!',
          'Malicious websites often trick young people with fake banners like "You won a new phone!" or "Click here for free game coins!". These are almost always scams.',
          '"Phishing" is a technique where scammers pose as legitimate companies or schools to steal your personal credentials.',
          'On open public Wi-Fi networks (in cafes, malls, or parks), someone could try to intercept unencrypted data. Never access sensitive accounts or enter private info on an open network.',
        ],
      },
      example: {
        title: {
          pt: 'O anúncio das moedas grátis no jogo',
          en: 'The free game coins popup',
        },
        scenario: {
          pt: 'O André estava a jogar quando apareceu uma janela a dizer: "Urgente! Tens 2 minutos para carregar no botão e receber 1000 moedas no Roblox". O André desconfiou porque havia erros ortográficos e pedia para instalar um programa desconhecido.',
          en: 'André was playing a game when a popup said: "Urgent! You have 2 minutes to click this button and get 1,000 free Roblox coins". André was suspicious because of spelling mistakes and a prompt to install an unknown file.',
        },
        tip: {
          pt: 'Quando uma oferta na Internet parece boa demais para ser verdade, quase de certeza é uma fraude! Chama sempre um adulto de confiança.',
          en: 'When an online offer seems too good to be true, it is almost certainly a trick! Always ask a trusted adult.',
        },
      },
      funFact: {
        pt: 'A palavra "Phishing" vem da palavra inglesa "Fishing" (pescar), porque os cibercriminosos lançam um "isco" (como uma mensagem falsa) à espera que alguém "morda o anzol"!',
        en: 'The word "Phishing" comes from "fishing", because cybercriminals cast a fake "bait" (like a deceptive link) hoping someone will bite the hook!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Um site desconhecido pede para descarregares um ficheiro com o nome "jogo_gratis.exe" para poderes ver um filme. O que deves fazer?',
          en: 'An unknown website asks you to download a file named "free_game.exe" to watch a movie. What should you do?',
        },
        clue: {
          pt: 'Um ficheiro que termina em ".exe" é um programa que vai correr no teu computador.',
          en: 'A file ending in ".exe" is an executable program that will run on your computer.',
        },
        reflection: {
          pt: 'Não deves descarregar! Ficheiros executáveis (.exe) de fontes desconhecidas podem conter vírus que danificam o computador ou roubam informação pessoal. Fecha a janela e avisa um adulto.',
          en: 'You must not download it! Executable files (.exe) from unknown sources can contain viruses that damage the computer or steal personal data. Close the tab and inform an adult.',
        },
      },
      quizQuestions: [
        {
          id: 'm2-q1',
          question: {
            pt: 'O que indica a letra "S" no protocolo HTTPS (https://)?',
            en: 'What does the letter "S" stand for in HTTPS (https://)?',
          },
          options: {
            pt: ['Segurança (Secure)', 'Sem fios', 'Super rápido', 'Simples'],
            en: ['Secure', 'Subtle', 'Superfast', 'Simple'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! O "S" significa Seguro (Secure), indicando que os dados transmitidos estão cifrados.',
            en: 'Excellent! The "S" stands for Secure, indicating that transmitted data is encrypted.',
          },
        },
        {
          id: 'm2-q2',
          question: {
            pt: 'O que deves fazer se receberes uma mensagem a dizer que ganhaste um prémio num concurso em que nunca participaste?',
            en: 'What should you do if you receive a message saying you won a prize in a contest you never entered?',
          },
          options: {
            pt: ['Enviar logo a tua morada e nome', 'Ignorar ou apagar a mensagem e avisar um adulto', 'Partilhar com todos os amigos da turma', 'Carregar em todos os links da mensagem'],
            en: ['Immediately send your address and name', 'Ignore or delete the message and tell an adult', 'Share it with all classmates', 'Click all the links in the message'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Prémios milagrosos de concursos onde nunca participaste são tentativas comuns de burla ou phishing.',
            en: 'Very good! Unexpected prize claims from contests you never entered are typical scam attempts.',
          },
        },
        {
          id: 'm2-q3',
          question: {
            pt: 'Qual é o cuidado principal ao ligar o telemóvel a uma rede Wi-Fi pública e gratuita?',
            en: 'What is the main precaution when connecting a phone to a free public Wi-Fi network?',
          },
          options: {
            pt: ['Não ver vídeos', 'Não introduzir palavras-passe importantes nem dados pessoais', 'Desligar o som do telemóvel', 'Usar sempre auscultadores'],
            en: ['Do not watch videos', 'Do not enter sensitive passwords or personal data', 'Turn off the phone ringtone', 'Always wear headphones'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! Em redes abertas a segurança é menor, por isso não se devem fazer operações confidenciais.',
            en: 'Correct! On open networks security is lower, so sensitive activities should be avoided.',
          },
        },
      ],
    },
    {
      id: 'dados-pessoais-privacidade',
      themeId: 'seguranca-digital',
      number: 3,
      icon: 'UserCheck',
      title: {
        pt: 'Dados pessoais e privacidade online',
        en: 'Personal data and online privacy',
      },
      shortDesc: {
        pt: 'Descobre o que são dados pessoais, que informações nunca deves partilhar na Internet e como proteger as tuas fotografias.',
        en: 'Discover what personal data is, what information you should never share online, and how to protect your photos.',
      },
      whatYouWillLearn: {
        pt: [
          'Definição de dados pessoais (o que te identifica no mundo real);',
          'Que dados nunca deves partilhar com desconhecidos na Internet;',
          'Cuidados especiais com fotografias, vídeos e símbolos escolares;',
          'A importância de desligar a partilha da localização geográfica.',
        ],
        en: [
          'Definition of personal data (what identifies you in the real world);',
          'Which details you should never share with strangers online;',
          'Special precautions with photos, videos, and school logos;',
          'The importance of disabling real-time location sharing.',
        ],
      },
      explanation: {
        pt: [
          'Dados pessoais são todas as informações que permitem identificar uma pessoa concreta: o teu nome completo, data de nascimento, morada, número de telemóvel, fotografia da tua cara e o nome da tua escola.',
          'No mundo digital, uma vez publicada uma fotografia ou informação, é quase impossível apagá-la completamente, pois qualquer pessoa pode guardar uma cópia no seu computador.',
          'Muitos jogos e aplicações pedem acesso à tua localização em tempo real (GPS). Deves recusar sempre que não seja estritamente necessário para proteger onde vives e onde estás.',
          'Nunca partilhes fotografias onde apareça o símbolo da tua escola, a matrícula do carro dos teus pais ou a chave de tua casa.',
        ],
        en: [
          'Personal data is any information that can identify a specific person: full name, birth date, home address, phone number, facial photos, and your school name.',
          'In the digital world, once a photo or detail is published, it is nearly impossible to delete it completely since anyone could save a local copy.',
          'Many games and apps ask for real-time GPS location. You should deny location access whenever not strictly needed to protect where you live and study.',
          'Never post photos that show your school badge/uniform, family car license plate, or house keys.',
        ],
      },
      example: {
        title: {
          pt: 'A fotografia no primeiro dia de aulas',
          en: 'The first day of school photo',
        },
        scenario: {
          pt: 'A Beatriz tirou uma foto muito contente no portão da escola com a sua mochila nova. Antes de publicar, reparou que na foto se via o nome da rua e o logótipo da escola. Decidiu não publicar publicamente e mostrou apenas aos avós em privado.',
          en: 'Beatriz took a picture by the school gate with her new backpack. Before posting it, she noticed the street name and school badge were visible. She decided not to post it publicly, showing it only to her grandparents privately.',
        },
        tip: {
          pt: 'Excelente atitude! Pensa duas vezes antes de publicar qualquer imagem na Internet.',
          en: 'Great decision! Think twice before posting any image on the Internet.',
        },
      },
      funFact: {
        pt: 'Em Portugal e na União Europeia, existe uma lei muito importante chamada RGPD (Regulamento Geral sobre a Proteção de Dados) que defende o direito de todas as crianças e cidadãos à privacidade digital!',
        en: 'In Portugal and the European Union, a landmark regulation called GDPR protects the right to digital privacy for all children and citizens!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Num jogo online de tabuleiro, um jogador com quem estás a jogar há 10 minutos pergunta: "Onde vives e quantos anos tens?". Como deves responder?',
          en: 'In an online board game, an opponent you have played with for 10 minutes asks: "Where do you live and how old are you?". How should you respond?',
        },
        clue: {
          pt: 'Recorda a regra de ouro sobre falar com pessoas que não conheces no mundo real.',
          en: 'Remember the golden rule about talking to people you do not know in real life.',
        },
        reflection: {
          pt: 'Não deves responder com informações reais. Na Internet, as pessoas podem fingir ter uma idade diferente da verdadeira. Podes responder que não partilhas dados pessoais e, se a pessoa insistir, bloqueia o utilizador e avisa um adulto.',
          en: 'You should not provide real details. Online, people can pretend to be a different age. You can say you do not share personal details, and if they insist, block them and tell an adult.',
        },
      },
      quizQuestions: [
        {
          id: 'm3-q1',
          question: {
            pt: 'Qual destas informações é considerada um dado pessoal que NÃO deves partilhar publicamente?',
            en: 'Which of the following is considered personal data that you should NOT share publicly?',
          },
          options: {
            pt: ['A tua cor preferida', 'A tua morada de casa', 'O teu clube de futebol favorito', 'O título de um livro que leste'],
            en: ['Your favorite color', 'Your home street address', 'Your favorite sports club', 'The title of a book you read'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Certíssimo! A morada de casa permite localizar-te no mundo real e nunca deve ser partilhada publicamente.',
            en: 'Spot on! Your home address allows someone to locate you in the real world and must remain private.',
          },
        },
        {
          id: 'm3-q2',
          question: {
            pt: 'O que deves verificar antes de colocar uma fotografia tua nas redes sociais ou na Internet?',
            en: 'What should you check before posting a photo of yourself online or on social media?',
          },
          options: {
            pt: ['Se tem muitos filtros bonitos', 'Se não revela a tua escola, morada ou detalhes privados teus ou de outros', 'Se tens mais de 100 seguidores', 'Se foi tirada com luz do sol'],
            en: ['If it has many pretty filters', 'That it does not reveal your school, address, or private details of you or others', 'If you have over 100 followers', 'If it was taken in sunlight'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Perfeito! É essencial garantir que a imagem não expõe a tua privacidade nem a dos teus colegas.',
            en: 'Perfect! It is crucial to ensure the picture does not expose your privacy or that of your peers.',
          },
        },
        {
          id: 'm3-q3',
          question: {
            pt: 'Porque é perigoso ter a localização do telemóvel sempre ligada em modo público?',
            en: 'Why is it risky to leave phone location sharing always turned on publicly?',
          },
          options: {
            pt: ['Porque gasta um bocadinho de bateria', 'Porque pessoas desconhecidas podem saber exatamente onde estás a cada momento', 'Porque deixa as fotografias a preto e branco', 'Não tem perigo nenhum'],
            en: ['Because it consumes battery', 'Because strangers could track exactly where you are in real time', 'Because it turns photos black and white', 'There is no danger at all'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! A tua segurança física é o mais importante e desconhecidos não devem saber a tua rotina.',
            en: 'Great job! Your physical safety comes first, and strangers should never track your daily whereabouts.',
          },
        },
      ],
    },
    {
      id: 'responsabilidade-respeito',
      themeId: 'seguranca-digital',
      number: 4,
      icon: 'HeartHandshake',
      title: {
        pt: 'Responsabilidade, respeito e pegada digital',
        en: 'Responsibility, respect, and digital footprint',
      },
      shortDesc: {
        pt: 'Aprende a combater o cyberbullying, a tratar todos com gentileza na rede e a construir uma pegada digital positiva.',
        en: 'Learn how to counter cyberbullying, treat everyone with kindness online, and build a positive digital footprint.',
      },
      whatYouWillLearn: {
        pt: [
          'O que é o respeito e a empatia na comunicação digital;',
          'O que é o cyberbullying e como agir se fores vítima ou testemunha;',
          'A importância de não publicar insultos nem partilhar boatos;',
          'O conceito de "pegada digital" e o seu impacto no futuro.',
        ],
        en: [
          'What respect and empathy mean in digital communication;',
          'What cyberbullying is and how to react if you experience or witness it;',
          'The importance of never posting insults or spreading rumors;',
          'The concept of a "digital footprint" and its lasting impact.',
        ],
      },
      explanation: {
        pt: [
          'Atrás de cada ecrã, avatar ou fotografia de perfil está uma pessoa real com sentimentos. A regra de ouro é simples: se não dirias algo na cara de um colega na sala de aula, nunca o escrevas numa mensagem ou comentário na Internet.',
          'Cyberbullying é quando alguém utiliza as tecnologias para gozar, ameaçar, humilhar ou excluir repetidamente outra pessoa. Isso é inaceitável e pode magoar profundamente.',
          'Se presenciares cyberbullying num grupo de chat da turma, não te rias nem reenvies as mensagens. Apoia a vítima e avisa imediatamente um adulto (como o teu professor de TIC ou os teus pais).',
          'A "pegada digital" é o rasto que deixas na Internet: tudo o que pesquisas, comentas, publicas e partilhas. Constrói uma pegada digital da qual te possas orgulhar no futuro!',
        ],
        en: [
          'Behind every screen, avatar, or profile picture is a real human being with feelings. The golden rule is simple: if you would not say it to a classmate’s face in school, never write it in a message or online comment.',
          'Cyberbullying occurs when someone repeatedly uses technology to tease, threaten, humiliate, or exclude someone else. It is harmful and never acceptable.',
          'If you witness cyberbullying in a class group chat, do not laugh or forward mean messages. Support the targeted person and inform a trusted adult immediately (such as your ICT teacher or parents).',
          'Your "digital footprint" is the trail you leave online: everything you search, comment, post, and share. Build a positive digital footprint you can be proud of!',
        ],
      },
      example: {
        title: {
          pt: 'O grupo de mensagens da turma',
          en: 'The class chat group',
        },
        scenario: {
          pt: 'No grupo de WhatsApp da turma, alguém partilhou uma foto de um colega que tropeçou no recreio a fazer troça. O Tiago não se riu: enviou uma mensagem a dizer "Pessoal, isso não tem piada, vamos apagar isso" e foi falar com o professor.',
          en: 'In the class chat group, someone shared a picture of a classmate who tripped on the playground to make fun of them. Tiago did not laugh: he texted "Guys, that is not funny, let’s delete it" and spoke to the teacher.',
        },
        tip: {
          pt: 'O Tiago foi um verdadeiro defensor digital! Quem intervém para ajudar faz toda a diferença.',
          en: 'Tiago was a true digital upstander! Speaking up to help makes a world of difference.',
        },
      },
      funFact: {
        pt: 'Em Portugal, existe uma linha telefónica gratuita chamada Linha Internet Segura (800 21 90 90) onde qualquer criança, jovem ou família pode pedir ajuda anónima sobre cyberbullying e segurança online!',
        en: 'In Portugal, there is a toll-free helpline called Internet Segura (800 21 90 90) where any child or family can seek anonymous guidance about cyberbullying and online safety!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se alguém publicar um comentário maldoso sobre ti num jogo, deves responder com outro insulto ainda pior?',
          en: 'If someone posts a mean comment about you in a game, should you reply with an even worse insult?',
        },
        clue: {
          pt: 'Pensa se apagar o fogo com gasolina costuma resolver o problema.',
          en: 'Think whether throwing fuel on a fire usually puts it out.',
        },
        reflection: {
          pt: 'Não deves responder na mesma moeda. Responder com insultos só aumenta a discussão e coloca-te também em falta. A melhor reação é guardar a prova (tirar uma captura de ecrã/screenshot), bloquear o utilizador e reportar o caso a um adulto responsável.',
          en: 'Do not retaliate in kind. Responding with insults only escalates hostility and puts you at fault too. The best reaction is to keep proof (take a screenshot), block the user, and report it to a responsible adult.',
        },
      },
      quizQuestions: [
        {
          id: 'm4-q1',
          question: {
            pt: 'O que deves fazer se vires um colega a ser insultado num grupo de conversação online?',
            en: 'What should you do if you see a classmate being bullied in an online group chat?',
          },
          options: {
            pt: ['Reencaminhar a mensagem para outros amigos para todos se rirem', 'Apoiar o colega e falar com o professor ou com os pais', 'Fazer de conta que não viste nada', 'Adicionar mais piadas de mau gosto'],
            en: ['Forward the message to other friends so everyone laughs', 'Support your classmate and talk to a teacher or parents', 'Pretend you saw nothing', 'Add more mean jokes'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! Apoiar quem precisa e alertar um adulto ajuda a travar o cyberbullying.',
            en: 'Correct! Supporting those in need and alerting an adult helps stop cyberbullying.',
          },
        },
        {
          id: 'm4-q2',
          question: {
            pt: 'O que representa a tua "pegada digital"?',
            en: 'What does your "digital footprint" represent?',
          },
          options: {
            pt: ['O tamanho dos teus sapatos nos jogos', 'O rasto e histórico de publicações, comentários e ações que deixas na Internet', 'A marca do teu dedo no ecrã do tablet', 'A velocidade do computador'],
            en: ['Your shoe size in video games', 'The trail and history of posts, comments, and actions you leave on the Internet', 'The fingerprint smudge on a tablet screen', 'The computer speed'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Tudo o que fazemos online deixa um registo duradouro que compõe a nossa pegada digital.',
            en: 'Very well! Everything we do online leaves a lasting record that makes up our digital footprint.',
          },
        },
        {
          id: 'm4-q3',
          question: {
            pt: 'Qual é a melhor atitude para comunicar com educação na Internet?',
            en: 'What is the best mindset for polite online communication?',
          },
          options: {
            pt: ['Tratar os outros com o mesmo respeito com que gostamos de ser tratados', 'Escrever tudo com letras maiúsculas para chamar a atenção', 'Interromper todas as conversas', 'Usar palavras agressivas'],
            en: ['Treat others with the same respect you would like to receive', 'Write everything in ALL CAPS to grab attention', 'Interrupt every conversation', 'Use aggressive words'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! A empatia e o respeito mútuo são as bases de uma comunidade digital saudável.',
            en: 'Excellent! Empathy and mutual respect form the foundation of a healthy digital community.',
          },
        },
      ],
    },
    {
      id: 'direitos-autor',
      themeId: 'seguranca-digital',
      number: 5,
      icon: 'BookOpenCheck',
      title: {
        pt: 'Direitos de autor, plágio e fontes de informação',
        en: 'Copyright, plagiarism, and information sources',
      },
      shortDesc: {
        pt: 'Aprende a utilizar imagens e textos de forma responsável nos trabalhos da escola e a citar sempre as tuas fontes.',
        en: 'Learn to use pictures and text responsibly in school projects and always credit your sources.',
      },
      whatYouWillLearn: {
        pt: [
          'O que são direitos de autor e propriedade intelectual;',
          'O que é o plágio e porque é incorreto copiar sem citar o autor;',
          'Como encontrar imagens gratuitas de utilização livre (Creative Commons);',
          'Como referenciar e citar fontes nos trabalhos de TIC.',
        ],
        en: [
          'What copyright and intellectual property mean;',
          'What plagiarism is and why copying without attribution is wrong;',
          'How to find free-to-use images (Creative Commons and Public Domain);',
          'How to cite sources properly in school projects.',
        ],
      },
      explanation: {
        pt: [
          'Quando um escritor escreve um livro, um músico compõe uma canção ou um fotógrafo tira uma fotografia, essa criação pertence-lhes por lei. Isso chama-se "Direitos de Autor".',
          'Fazer plágio significa copiar o texto, a imagem ou a ideia de outra pessoa e apresentá-la como se fosse tua. Na escola e na vida real, o plágio é desonesto e não é permitido.',
          'Podes usar informações e imagens da Internet para os teus trabalhos escolares, desde que indiques sempre o nome do autor e o site de onde retiraste a informação (a "Fonte").',
          'Existem bancos de imagens gratuitos e licenças abertas (como o Creative Commons) onde os autores dão autorização expressa para utilizar as suas criações em trabalhos de estudo!',
        ],
        en: [
          'When an author writes a book, a musician composes a melody, or a photographer takes a photo, that creation legally belongs to them. This is called "Copyright".',
          'Plagiarism means copying someone else’s text, image, or idea and pretending it is your own work. In school and throughout life, plagiarism is dishonest and prohibited.',
          'You may use information and photos from the web for your school assignments, provided you clearly cite the author’s name and website where you found it (the "Source").',
          'There are free image repositories and open licenses (such as Creative Commons) where creators grant permission to use their work for educational study!',
        ],
      },
      example: {
        title: {
          pt: 'O trabalho sobre o Sistema Solar',
          en: 'The Solar System project',
        },
        scenario: {
          pt: 'A Sofia fez um trabalho de TIC sobre o planeta Marte. Encontrou uma foto fantástica no site da NASA e um texto interessante. No final do seu diapositivo, a Sofia escreveu: "Imagem: NASA (Domínio Público) | Informação consultada na Enciclopédia Escolar Online em 12/03/2026".',
          en: 'Sofia made an ICT presentation about Mars. She found a photo on NASA’s website and an interesting paragraph. At the bottom of her slide, Sofia wrote: "Photo credit: NASA (Public Domain) | Information sourced from Online Student Encyclopedia on 12/03/2026".',
        },
        tip: {
          pt: 'A professora de TIC deu-lhe nota máxima pelo rigor e honestidade intelectual!',
          en: 'Her ICT teacher gave her full marks for thoroughness and intellectual honesty!',
        },
      },
      funFact: {
        pt: 'O símbolo internacional dos direitos de autor é a letra C dentro de um círculo: ©. Quando vês este símbolo num site ou documento, significa que os conteúdos estão protegidos por lei!',
        en: 'The universal copyright symbol is the letter C inside a circle: ©. When you see this symbol on a website or document, it means the content is protected by law!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se fizeres "copiar e colar" (Ctrl+C e Ctrl+V) de um parágrafo inteiro da Wikipédia para o teu trabalho sem colocar aspas nem dizer de onde veio, estás a fazer plágio?',
          en: 'If you copy and paste (Ctrl+C and Ctrl+V) a whole paragraph from Wikipedia into your assignment without quotation marks or citation, is that plagiarism?',
        },
        clue: {
          pt: 'Pensa se estás a fingir que as palavras foram escritas por ti.',
          en: 'Think if you are implying that those exact words were written by you.',
        },
        reflection: {
          pt: 'Sim, isso é plágio! O correto é ler a informação, explicá-la pelas tuas próprias palavras (fazer um resumo) e indicar sempre no final a ligação da página consultada.',
          en: 'Yes, that is plagiarism! The proper approach is to read the info, express it in your own words (summarize), and cite the source link at the end.',
        },
      },
      quizQuestions: [
        {
          id: 'm5-q1',
          question: {
            pt: 'O que significa cometer "plágio" num trabalho escolar?',
            en: 'What does committing "plagiarism" mean in a school assignment?',
          },
          options: {
            pt: ['Escrever com letra feia', 'Copiar ideias ou textos de outra pessoa apresentando-os como sendo seus', 'Esquecer-se do estojo na escola', 'Fazer perguntas ao professor'],
            en: ['Messy handwriting', 'Copying someone else’s ideas or texts and presenting them as your own', 'Forgetting your pencil case at school', 'Asking questions to the teacher'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! Plágio é a apropriação indevida do trabalho intelectual de outro autor.',
            en: 'Correct! Plagiarism is taking credit for someone else’s creative or intellectual work.',
          },
        },
        {
          id: 'm5-q2',
          question: {
            pt: 'O que deves colocar no final de um trabalho de investigação quando usas artigos e imagens da Internet?',
            en: 'What should you include at the end of a research project when using web articles and images?',
          },
          options: {
            pt: ['Uma lista de fontes e referências bibliográficas com os autores e sites consultados', 'Apenas a palavra "Fim"', 'A lista dos teus videojogos preferidos', 'Nada'],
            en: ['A list of sources and references crediting the authors and websites consulted', 'Just the word "The End"', 'A list of your favorite video games', 'Nothing'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Muito bem! Indicar as fontes dá credibilidade ao trabalho e respeita o trabalho dos autores originais.',
            en: 'Great! Citing your sources gives credibility to your project and credits the original creators.',
          },
        },
        {
          id: 'm5-q3',
          question: {
            pt: 'As imagens com licença "Creative Commons" podem ser usadas em trabalhos escolares?',
            en: 'Can images with a "Creative Commons" license be used in school assignments?',
          },
          options: {
            pt: ['Nunca, são proibidas na escola', 'Sim, desde que respeites as regras da licença (como dar crédito ao autor)', 'Apenas se pagares 50 euros', 'Apenas em computadores antigos'],
            en: ['Never, they are banned in school', 'Yes, as long as you follow the license rules (such as crediting the author)', 'Only if you pay 50 euros', 'Only on old computers'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Exato! As licenças Creative Commons permitem a partilha legal de obras para fins educativos.',
            en: 'Exactly! Creative Commons licenses allow legal sharing of creative works for education.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'desafio-seguro-perigoso',
      themeId: 'seguranca-digital',
      number: 1,
      type: 'safe_dangerous',
      title: {
        pt: 'Desafio 1 — Seguro ou Perigoso?',
        en: 'Challenge 1 — Safe or Dangerous?',
      },
      shortDesc: {
        pt: 'Analisa 6 situações do dia a dia e decide rapidamente se cada uma é segura ou perigosa.',
        en: 'Analyze 6 everyday scenarios and quickly decide whether each is safe or dangerous.',
      },
      icon: 'AlertTriangle',
      durationMinutes: 5,
    },
    {
      id: 'desafio-password-segura',
      themeId: 'seguranca-digital',
      number: 2,
      type: 'password_builder',
      title: {
        pt: 'Desafio 2 — Cria uma Palavra-passe Segura',
        en: 'Challenge 2 — Create a Strong Password',
      },
      shortDesc: {
        pt: 'Compara opções fictícias e descobre os ingredientes secretos para criar uma palavra-passe invencível.',
        en: 'Compare fictional options and discover the secret ingredients to build an unbreakable password.',
      },
      icon: 'KeyRound',
      durationMinutes: 5,
    },
    {
      id: 'desafio-phishing',
      themeId: 'seguranca-digital',
      number: 3,
      type: 'detect_phishing',
      title: {
        pt: 'Desafio 3 — Deteta o Phishing',
        en: 'Challenge 3 — Spot the Phishing',
      },
      shortDesc: {
        pt: 'Analisa mensagens e janelas suspeitas com a tua lupa de detetive e assinala os sinais de perigo.',
        en: 'Examine suspicious messages and popups with your detective magnifying glass and mark danger signs.',
      },
      icon: 'Search',
      durationMinutes: 6,
    },
    {
      id: 'desafio-o-que-farias',
      themeId: 'seguranca-digital',
      number: 4,
      type: 'what_would_you_do',
      title: {
        pt: 'Desafio 4 — O que Farias?',
        en: 'Challenge 4 — What Would You Do?',
      },
      shortDesc: {
        pt: 'Enfrenta dilemas reais: desconhecidos a pedir fotos, links estranhos e insultos na turma. Toma a melhor decisão!',
        en: 'Face real dilemmas: strangers asking for photos, weird links, and chat insults. Make the right call!',
      },
      icon: 'HelpCircle',
      durationMinutes: 6,
    },
    {
      id: 'quiz-final-tema1',
      themeId: 'seguranca-digital',
      number: 5,
      type: 'final_quiz',
      title: {
        pt: 'Quiz Final — Mestre da Segurança Digital',
        en: 'Final Quiz — Digital Safety Master',
      },
      shortDesc: {
        pt: 'Avalia tudo o que aprendeste no Tema 1, ganha a insígnia de Guardião Digital e acumula pontos!',
        en: 'Test everything you learned in Theme 1, earn the Digital Guardian badge, and gain points!',
      },
      icon: 'Award',
      durationMinutes: 8,
    },
  ],
  finalQuiz: [
    {
      id: 'fq1-1',
      question: {
        pt: 'Qual destas ações ajuda a manter o teu telemóvel ou tablet protegido contra vírus?',
        en: 'Which of these actions helps keep your phone or tablet safe from malware?',
      },
      options: {
        pt: ['Instalar jogos a partir de sites desconhecidos', 'Manter o sistema operativo e as aplicações sempre atualizados', 'Nunca desligar o aparelho', 'Partilhar a palavra-passe com toda a gente'],
        en: ['Installing games from unverified websites', 'Keeping the operating system and apps updated', 'Never powering off the device', 'Sharing your password with everyone'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Excelente! As atualizações corrigem falhas de segurança conhecidas pelos técnicos.',
        en: 'Great! Software updates patch known security loopholes identified by engineers.',
      },
    },
    {
      id: 'fq1-2',
      question: {
        pt: 'Se um desconhecido num jogo online te pedir uma fotografia tua ou a tua morada, o que deves fazer?',
        en: 'If a stranger in an online game asks for a picture of you or your address, what should you do?',
      },
      options: {
        pt: ['Enviar logo para fazer um novo amigo', 'Recusar, não partilhar nada, bloquear e avisar um adulto de confiança', 'Pedir-lhe primeiro uma fotografia a ele', 'Dar a morada da escola'],
        en: ['Send it right away to make a new friend', 'Refuse, share nothing, block them, and alert a trusted adult', 'Ask for a picture of them first', 'Give your school address'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Muito bem! A tua segurança física é sagrada e nunca se partilham fotos nem moradas com estranhos.',
        en: 'Very good! Your physical safety is sacred; never send photos or addresses to strangers.',
      },
    },
    {
      id: 'fq1-3',
      question: {
        pt: 'Como reconheces um site protegido com ligação cifrada na barra do navegador?',
        en: 'How do you recognize a website with an encrypted connection in your browser bar?',
      },
      options: {
        pt: ['Tem o endereço a piscar a vermelho', 'Começa por "https://" e tem o ícone de um cadeado fechado', 'Tem muitas fotografias coloridas', 'O ecrã fica mais brilhante'],
        en: ['The address flashes red', 'It begins with "https://" and shows a closed padlock icon', 'It has many colorful images', 'The screen becomes brighter'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Perfeito! Começar por "https://" indica que a ligação ao site é cifrada (a informação viaja protegida).',
        en: 'Perfect! Beginning with "https://" indicates the connection to the site is encrypted.',
      },
    },
    {
      id: 'fq1-4',
      question: {
        pt: 'O que deves fazer quando usas uma fotografia da Internet num trabalho escolar de TIC?',
        en: 'What should you do when using an image from the Internet in an ICT school presentation?',
      },
      options: {
        pt: ['Dizer que foste tu que a desenhaste', 'Dar o devido crédito ao autor e indicar a fonte de onde a retiraste', 'Mudar a cor da foto para ninguém notar', 'Não fazer nada'],
        en: ['Claim you drew it yourself', 'Properly credit the author and cite the source where you found it', 'Change the photo color so no one notices', 'Do nothing'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Exato! Citar a fonte respeita a autoria original e evita o plágio.',
        en: 'Exactly! Citing your source respects authorship and avoids plagiarism.',
      },
    },
    {
      id: 'fq1-5',
      question: {
        pt: 'Qual é o número de telefone gratuito em Portugal para pedir ajuda confidencial sobre segurança na Internet?',
        en: 'What is the toll-free phone number in Portugal for confidential advice on online safety?',
      },
      options: {
        pt: ['112', 'Linha Internet Segura (800 21 90 90)', '118', 'Não existe nenhuma linha'],
        en: ['112', 'Linha Internet Segura (800 21 90 90)', '118', 'There is no helpline'],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Parabéns! A Linha Internet Segura (800 21 90 90) é o serviço de apoio oficial em Portugal para crianças e jovens.',
        en: 'Congratulations! Linha Internet Segura (800 21 90 90) is Portugal’s official support service for youth.',
      },
    },
  ],
};
