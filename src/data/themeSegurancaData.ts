import { ThemeDefinition } from '../types';

export const themeSegurancaData: ThemeDefinition = {
  id: 'seguranca',
  number: 3,
  title: {
    pt: 'Segurança, responsabilidade e respeito em ambientes digitais',
    en: 'Security, responsibility and respect in digital environments',
  },
  tagline: {
    pt: 'Como navegar, comunicar e agir com segurança e respeito online.',
    en: 'How to navigate, communicate and act safely and respectfully online.',
  },
  intro: {
    pt: 'Usar a Internet e os dispositivos de forma segura significa proteger os teus dados pessoais, evitar situações de risco e agir com responsabilidade nas tuas ações online.',
    en: 'Using the Internet and devices safely means protecting personal data, avoiding risks, and acting responsibly online.',
  },
  icon: '🛡️',
  illustrationKey: 'seguranca',
  accentColor: 'indigo',
  badgeCount: 2,
  modules: [
    {
      id: 'seg-mod-1',
      themeId: 'seguranca',
      number: 1,
      title: { pt: 'O que é a segurança digital?', en: 'What is digital security?' },
      shortDesc: { pt: 'Proteger dados e agir com responsabilidade online.', en: 'Protecting data and acting responsibly online.' },
      icon: '🛡️',
      explanation: {
        pt: [
          'Usar a Internet e os dispositivos de forma segura significa proteger os teus dados pessoais, evitar situações de risco e agir com responsabilidade nas tuas ações online.',
          'Tal como no mundo real, também no mundo digital existem regras de segurança que devemos seguir para nos protegermos a nós e aos outros.',
        ],
        en: [
          'Using the Internet and devices safely means protecting your personal data, avoiding risk situations, and acting responsibly in your online actions.',
          'Just like in the real world, there are security rules in the digital world that we must follow to protect ourselves and others.',
        ],
      },
      example: {
        title: { pt: 'Regras no mundo digital', en: 'Rules in the digital world' },
        scenario: { pt: 'Antes de partilhar dados ou aceitar contactos, verificamos se a fonte é segura.', en: 'Before sharing data or accepting contacts, we verify if the source is secure.' },
        tip: { pt: 'A prudência é a melhor aliada na Internet.', en: 'Caution is your best ally on the Internet.' },
      },
      funFact: {
        pt: 'A segurança digital protege não só os teus computadores, mas também a tua privacidade e bem-estar.',
        en: 'Digital security protects not only your computers, but also your privacy and well-being.',
      },
      thinkAboutIt: {
        question: { pt: 'Porque é que as regras de segurança digital são parecidas com as da rua?', en: 'Why are digital security rules similar to street rules?' },
        clue: { pt: 'Pensa em quem deixas aproximar-se e no que partilhas com desconhecidos.', en: 'Think about who you let close and what you share with strangers.' },
        reflection: { pt: 'Em ambos os casos, protegemos a nossa privacidade e segurança física/digital.', en: 'In both cases, we protect our privacy and physical/digital safety.' },
      },
      quizQuestions: []
    },
    {
      id: 'seg-mod-2',
      themeId: 'seguranca',
      number: 2,
      title: { pt: 'Links e mensagens suspeitas', en: 'Suspicious links and messages' },
      shortDesc: { pt: 'Reconhecer phishing e tentativas de burla.', en: 'Recognizing phishing and scam attempts.' },
      icon: '🎣',
      explanation: {
        pt: [
          'O phishing é uma técnica usada para enganar pessoas e roubar dados através de mensagens ou sites falsos que parecem verdadeiros.',
          'Sinais de alerta: mensagens de desconhecidos, pedidos urgentes de palavras-passe, links estranhos ou promessas de prémios exagerados.',
        ],
        en: [
          'Phishing is a technique used to trick people and steal data via fake messages or sites that look authentic.',
          'Warning signs: messages from strangers, urgent password requests, strange links, or exaggerated prize promises.',
        ],
      },
      example: {
        title: { pt: 'Mensagem de prémio', en: 'Prize message' },
        scenario: { pt: 'Receber um email a dizer que ganhaste um telemóvel mas tens de clicar num link.', en: 'Receiving an email saying you won a phone but must click a link.' },
        tip: { pt: 'Nunca cliques em links de origem duvidosa.', en: 'Never click links from questionable sources.' },
      },
      funFact: {
        pt: 'O termo phishing vem de "fishing" (pescar), porque os burlões "pescam" vítimas com iscos falsos.',
        en: 'The term phishing comes from fishing, because scammers "fish" victims with fake baits.',
      },
      thinkAboutIt: {
        question: { pt: 'O que farias se recebesses uma mensagem a dizer que ganhaste um prémio sem participar?', en: 'What would you do if you received a message saying you won a prize without entering?' },
        clue: { pt: 'Ninguém oferece prémios milionários ao acaso.', en: 'Nobody gives away million-dollar prizes randomly.' },
        reflection: { pt: 'É sempre uma tentativa de burla; deves ignorar e avisar um adulto.', en: 'It is always a scam attempt; you should ignore it and warn an adult.' },
      },
      quizQuestions: []
    },
    {
      id: 'seg-mod-3',
      themeId: 'seguranca',
      number: 3,
      title: { pt: 'Mensagens de desconhecidos', en: 'Messages from strangers' },
      shortDesc: { pt: 'Como agir perante contactos desconhecidos.', en: 'How to act regarding unknown contacts.' },
      icon: '✉️',
      explanation: {
        pt: [
          'Se receberes uma mensagem de alguém que não conheces com um link ou pedidos de informação, não deves clicar nem responder com dados pessoais.',
          'Deves sempre falar com um adulto de confiança sobre a situação.',
        ],
        en: [
          'If you receive a message from someone you don\'t know with a link or info requests, do not click or reply with personal data.',
          'You should always talk to a trusted adult about the situation.',
        ],
      },
      example: {
        title: { pt: 'Contacto inesperado', en: 'Unexpected contact' },
        scenario: { pt: 'Um perfil falso adiciona-te e tenta saber onde moras ou qual a tua escola.', en: 'A fake profile adds you and tries to find out where you live or study.' },
        tip: { pt: 'Nunca reveles dados pessoais a desconhecidos online.', en: 'Never reveal personal data to strangers online.' },
      },
      funFact: {
        pt: 'Nem todos os perfis online pertencem a quem dizem ser.',
        en: 'Not all online profiles belong to who they claim to be.',
      },
      thinkAboutIt: {
        question: { pt: 'Porque é importante não partilhar dados com desconhecidos na Internet?', en: 'Why is it important not to share data with strangers on the Internet?' },
        clue: { pt: 'Pensa em quem está do outro lado do ecrã.', en: 'Think about who is on the other side of the screen.' },
        reflection: { pt: 'Não sabes quem realmente está a falar contigo; proteger dados é proteger a tua segurança.', en: 'You don\'t know who is really talking to you; protecting data protects your safety.' },
      },
      quizQuestions: []
    },
    {
      id: 'seg-mod-4',
      themeId: 'seguranca',
      number: 4,
      title: { pt: 'Ciberbullying e respeito', en: 'Cyberbullying and respect' },
      shortDesc: { pt: 'Prevenir a violência online e promover o respeito.', en: 'Preventing online violence and promoting respect.' },
      icon: '🤝',
      explanation: {
        pt: [
          'Ciberbullying é o uso de meios digitais para intimidar, insultar, humilhar, ameaçar ou magoar outra pessoa.',
          'Antes de publicar algo, pensa: "Diria isto à pessoa olhos nos olhos?" O respeito online é fundamental.',
        ],
        en: [
          'Cyberbullying is the use of digital media to intimidate, insult, humiliate, threaten, or hurt another person.',
          'Before posting something, think: "Would I say this face to face?" Online respect is essential.',
        ],
      },
      example: {
        title: { pt: 'Foto sem autorização', en: 'Photo without permission' },
        scenario: { pt: 'Publicar uma fotografia embaraçosa de um colega sem o seu consentimento.', en: 'Publishing an embarrassing photo of a peer without consent.' },
        tip: { pt: 'Pede sempre autorização antes de partilhar imagens de outras pessoas.', en: 'Always ask permission before sharing images of others.' },
      },
      funFact: {
        pt: 'As palavras escritas online magoam tanto como as ditas pessoalmente.',
        en: 'Written words online hurt just as much as those spoken in person.',
      },
      thinkAboutIt: {
        question: { pt: 'O que deves fazer se assistires a ciberbullying?', en: 'What should you do if you witness cyberbullying?' },
        clue: { pt: 'Ficar em silêncio pode incentivar quem pratica.', en: 'Remaining silent can encourage the perpetrator.' },
        reflection: { pt: 'Apoia a vítima, não partilhes conteúdos ofensivos e avisa um adulto de confiança.', en: 'Support the victim, do not share offensive content, and warn a trusted adult.' },
      },
      quizQuestions: []
    },
    {
      id: 'seg-mod-5',
      themeId: 'seguranca',
      number: 5,
      title: { pt: 'A tua pegada digital', en: 'Your digital footprint' },
      shortDesc: { pt: 'O rasto que deixamos na Internet.', en: 'The trail we leave on the Internet.' },
      icon: '👣',
      explanation: {
        pt: [
          'Tudo o que publicas, comentas ou partilhas online deixa um rasto chamado pegada digital.',
          'Mesmo depois de apagares algo, pode já ter sido guardado por outros. Pensa bem antes de publicar!',
        ],
        en: [
          'Everything you post, comment, or share online leaves a trail called a digital footprint.',
          'Even after deleting something, it may have already been saved by others. Think before you post!',
        ],
      },
      example: {
        title: { pt: 'Publicação impulsiva', en: 'Impulsive post' },
        scenario: { pt: 'Publicar um desabafo zangado que mais tarde poderás lamentar.', en: 'Posting an angry rant that you might later regret.' },
        tip: { pt: 'Se tens dúvidas sobre uma publicação, é melhor não publicar.', en: 'If in doubt about a post, it\'s better not to post.' },
      },
      funFact: {
        pt: 'Algumas informações podem permanecer disponíveis durante muito tempo, por isso devemos pensar antes de publicar ou partilhar.',
        en: 'Some information can remain available for a long time, so we should always think before posting or sharing.',
      },
      thinkAboutIt: {
        question: { pt: 'Como gostarias que fosse a tua pegada digital no futuro?', en: 'How would you like your digital footprint to look in the future?' },
        clue: { pt: 'Imagina que futuras escolas ou amigos viam o teu histórico.', en: 'Imagine future schools or friends viewing your history.' },
        reflection: { pt: 'Devemos construir uma pegada positiva, baseada no respeito, partilha útil e segurança.', en: 'We should build a positive footprint based on respect and useful sharing.' },
      },
      quizQuestions: []
    }
  ],
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'O que é a segurança digital?', en: 'What is digital security?' },
      body: {
        pt: 'Usar a Internet e os dispositivos de forma segura significa proteger os teus dados pessoais, evitar situações de risco e agir com responsabilidade nas tuas ações online.<br><br>Tal como no mundo real, também no mundo digital existem regras de segurança que devemos seguir.',
        en: 'Using the Internet and devices safely means protecting your personal data, avoiding risk situations, and acting responsibly in your online actions.<br><br>Just like in the real world, there are security rules in the digital world that we must follow.',
      },
      icon: '🛡️',
    },
    {
      eyebrow: { pt: 'Phishing', en: 'Phishing' },
      h: { pt: 'Links e mensagens suspeitas', en: 'Suspicious links and messages' },
      body: {
        pt: 'O phishing é uma técnica usada para enganar pessoas e roubar dados através de mensagens ou sites falsos que parecem verdadeiros.<br><br>Sinais de alerta:<ul><li>Mensagens de pessoas ou empresas que não conheces.</li><li>Pedidos urgentes de dados pessoais ou palavras-passe.</li><li>Links estranhos ou encurtados.</li><li>Promessas de prémios que pareçam boas demais para ser verdade.</li><li>Nunca deves clicar em links suspeitos nem partilhar dados pessoais com desconhecidos.</li></ul>',
        en: 'Phishing is a technique used to trick people and steal data via fake messages or sites that look authentic.<br><br>Warning signs:<ul><li>Messages from people or companies you do not know.</li><li>Urgent requests for personal data or passwords.</li><li>Strange or shortened links.</li><li>Promises of prizes that sound too good to be true.</li><li>You should never click suspicious links or share personal data with strangers.</li></ul>',
      },
      icon: '🎣',
    },
    {
      eyebrow: { pt: 'Ciberbullying', en: 'Cyberbullying' },
      h: { pt: 'Ciberbullying e respeito', en: 'Cyberbullying and respect' },
      body: {
        pt: 'Ciberbullying é o uso de meios digitais para intimidar, insultar, humilhar, ameaçar ou magoar outra pessoa.<br><br>Antes de publicar um comentário, uma fotografia ou uma mensagem, pensa: "Diria isto à pessoa olhos nos olhos?" Se a resposta for não, talvez não devas publicar.<br><br><em>"Um colega publicou uma fotografia de outra pessoa sem autorização."</em> Isto não é correto — devemos sempre pedir autorização antes de partilhar imagens de outras pessoas.',
        en: 'Cyberbullying is the use of digital media to intimidate, insult, humiliate, threaten, or hurt another person.<br><br>Before posting a comment, photo, or message, think: "Would I say this to the person face to face?" If the answer is no, maybe you shouldn\'t post it.',
      },
      icon: '🤝',
    },
    {
      eyebrow: { pt: 'Na vida real', en: 'In real life' },
      h: { pt: 'Como reagir a uma mensagem desconhecida?', en: 'How to react to an unknown message?' },
      body: {
        pt: 'Imagina que recebes uma mensagem com prémios falsos ou um link suspeito no teu telemóvel.<br><br><strong>Aplica imediatamente o protocolo de segurança digital:</strong><ul><li><strong>1. PARA e não cliques:</strong> Nunca abras links nem descarregues ficheiros de remetentes desconhecidos.</li><li><strong>2. NÃO respondas:</strong> Nunca envies o teu nome, idade, morada, escola ou palavras-passe.</li><li><strong>3. AVISA logo um adulto:</strong> Mostra a mensagem aos teus pais ou ao professor para verificarem a segurança.</li><li><strong>4. BLOQUEIA e apaga:</strong> Remove a mensagem e bloqueia o número para tua proteção.</li></ul>',
        en: 'Imagine you receive a message with fake prizes or a suspicious link on your phone.<br><br><strong>Immediately apply the digital safety protocol:</strong><ul><li><strong>1. STOP and do not click:</strong> Never open links or download files from unknown senders.</li><li><strong>2. DO NOT reply:</strong> Never send your name, age, address, school, or passwords.</li><li><strong>3. REPORT to a trusted adult:</strong> Show the message to your parents or teacher to verify safety.</li><li><strong>4. BLOCK and delete:</strong> Remove the message and block the sender for your protection.</li></ul>',
      },
      icon: '✉️',
    },
    {
      eyebrow: { pt: 'Sabias que...?', en: 'Did you know...?' },
      h: { pt: 'A tua pegada digital', en: 'Your digital footprint' },
      body: {
        pt: 'A nossa atividade na Internet pode deixar uma pegada digital. Mesmo depois de apagares algo, pode já ter sido visto ou guardado por outras pessoas. Por isso, é importante pensar antes de publicar ou partilhar.',
        en: 'Our activity on the Internet can leave a digital footprint. Even after deleting something, it may have already been seen or saved by others. Therefore, it is important to think before posting or sharing.',
      },
      icon: '👣',
    },
  ],
  challenges: [
    {
      id: 'jogo-seguranca-tf',
      themeId: 'seguranca',
      number: 1,
      title: { pt: '✅ Seguro ou perigoso?', en: '✅ Safe or Dangerous?' },
      shortDesc: { pt: 'Avalia se cada comportamento online é seguro.', en: 'Evaluate if each online behavior is safe.' },
      icon: '✅',
      durationMinutes: 4,
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Seguro ou perigoso?',
        icon: '✅',
        xp: 100,
        desc: 'Avalia se cada comportamento online é seguro.',
        data: {
          items: [
            { s: 'Devo clicar em qualquer link que recebo, mesmo de desconhecidos.', a: false, e: 'Nunca deves clicar em links de origem desconhecida.' },
            { s: 'Ligar-me a redes Wi-Fi públicas sem cuidado pode ser arriscado.', a: true, e: 'Redes públicas podem não ser seguras para dados pessoais.' },
            { s: 'Publicar uma foto de um colega sem autorização é correto.', a: false, e: 'Devemos sempre pedir autorização antes de partilhar imagens de outras pessoas.' },
            { s: 'Devo falar com um adulto de confiança se receber uma mensagem estranha.', a: true, e: 'Pedir ajuda a um adulto é sempre uma boa atitude nestas situações.' },
            { s: 'O ciberbullying é apenas uma brincadeira sem consequências.', a: false, e: 'O ciberbullying pode magoar seriamente outras pessoas e tem consequências reais.' }
          ]
        }
      }
    },
    {
      id: 'jogo-seguranca-mc',
      themeId: 'seguranca',
      number: 2,
      title: { pt: '🕵️ Identifica o phishing', en: '🕵️ Identify Phishing' },
      shortDesc: { pt: 'Reconhece sinais de mensagens ou sites fraudulentos.', en: 'Recognize signs of fraudulent messages or websites.' },
      icon: '🕵️',
      durationMinutes: 4,
      points: 100,
      type: 'what_would_you_do',
      gameData: {
        type: 'mc',
        title: 'Identifica o phishing',
        icon: '🕵️',
        xp: 100,
        desc: 'Reconhece sinais de mensagens ou sites fraudulentos.',
        data: {
          questions: [
            {
              q: 'Recebes uma mensagem a dizer que ganhaste um prémio e pedem a tua palavra-passe. O que fazes?',
              opts: ['Não respondo e aviso logo um adulto de confiança', 'Envio a palavra-passe imediatamente', 'Reencaminho a mensagem a todos os amigos', 'Clico no link para confirmar'],
              c: 0,
              e: 'Nunca partilhes palavras-passe! Pedidos de palavras-passe são sempre uma tentativa de burla.'
            },
            {
              q: 'Porque é importante manter o antivírus e as atualizações do computador em dia?',
              opts: ['Para proteger o computador contra novos vírus e falhas de segurança', 'Para o computador gastar a bateria mais depressa', 'Apenas para mudar a imagem de fundo do ecrã', 'Não tem qualquer utilidade prática'],
              c: 0,
              e: 'As atualizações corrigem falhas de segurança e garantem que o antivírus reconhece novas ameaças.'
            },
            {
              q: 'Qual destes é um sinal típico de uma tentativa de burla ou fraude digital?',
              opts: ['Mensagens com pedidos urgentes de dados pessoais ou dinheiro sob ameaça', 'Um aviso do professor no Teams ou Classroom sobre um trabalho', 'Um email da biblioteca a avisar do prazo de devolução de um livro', 'Uma mensagem da família a combinar a hora de jantar'],
              c: 0,
              e: 'O sentido de urgência e o pedido de dados confidenciais são os sinais mais comuns de fraude digital.'
            },
            {
              q: 'Se uma pessoa desconhecida na Internet te pedir para ligares a câmara ou enviares fotos tuas, como deves reagir?',
              opts: ['Recusar de imediato, fechar a conversa e avisar logo os pais ou um professor', 'Ligar a câmara para mostrar o teu quarto e ser simpático', 'Enviar uma fotografia com a camisola da tua escola', 'Pedir à pessoa que envie primeiro uma fotografia dela'],
              c: 0,
              e: 'Nunca partilhes imagens nem ligues a câmara a desconhecidos! Avisa logo um adulto de confiança.'
            },
            {
              q: 'O que deves fazer se não tens a certeza se uma mensagem ou ficheiro recebido é seguro?',
              opts: ['Pedir ajuda a um adulto de confiança antes de abrir', 'Abrir imediatamente para ver se acontece alguma coisa', 'Reencaminhar para todos os contactos da turma', 'Ignorar e continuar a navegar sem verificar'],
              c: 0,
              e: 'Pedir ajuda a um adulto de confiança é sempre a atitude mais segura!'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-seguranca-match',
      themeId: 'seguranca',
      number: 3,
      title: { pt: '🧩 Situação e Atitude Correta', en: '🧩 Situation and Correct Attitude' },
      shortDesc: { pt: 'Associa cada situação à atitude mais correta.', en: 'Match each situation to the correct attitude.' },
      icon: '🧩',
      durationMinutes: 4,
      points: 100,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Situação e Atitude Correta',
        icon: '🧩',
        xp: 100,
        desc: 'Associa cada situação à atitude mais correta.',
        data: {
          pairs: [
            { left: 'Link desconhecido numa mensagem', right: 'Não clicar' },
            { left: 'Pedido de palavra-passe por mensagem', right: 'Nunca partilhar' },
            { left: 'Colega a ser insultado online', right: 'Apoiar e avisar um adulto' },
            { left: 'Foto de alguém sem autorização', right: 'Não publicar' },
            { left: 'Mensagem suspeita e estranha', right: 'Falar com um adulto de confiança' }
          ]
        }
      }
    },
    {
      id: 'jogo-seguranca-mc2',
      themeId: 'seguranca',
      number: 4,
      title: { pt: '💡 O que deves fazer?', en: '💡 What should you do?' },
      shortDesc: { pt: 'Situações reais de segurança e respeito digital.', en: 'Real situations of digital safety and respect.' },
      icon: '💡',
      durationMinutes: 4,
      points: 100,
      type: 'what_would_you_do',
      gameData: {
        type: 'mc',
        title: 'O que deves fazer?',
        icon: '💡',
        xp: 100,
        desc: 'Situações reais de segurança e respeito digital.',
        data: {
          questions: [
            {
              q: 'Um colega publicou uma fotografia de outra pessoa sem autorização. Como deves agir?',
              opts: ['Dizer-lhe que isso não é correto e sugerir que remova a foto', 'Partilhar também a fotografia', 'Fazer o mesmo com outra pessoa', 'Ignorar completamente'],
              c: 0,
              e: 'Devemos sempre respeitar a privacidade e imagem dos outros.'
            },
            {
              q: 'Vês um colega a receber mensagens ofensivas repetidamente. O que deves fazer?',
              opts: ['Apoiar o colega e falar com um adulto', 'Participar também nas mensagens', 'Ignorar por completo a situação', 'Partilhar a conversa publicamente'],
              c: 0,
              e: 'Apoiar a vítima e pedir ajuda a um adulto é a atitude correta.'
            },
            {
              q: 'Estás numa rede Wi-Fi pública e pedem-te para introduzires dados pessoais num site. Deves:',
              opts: ['Evitar introduzir dados pessoais nessa rede', 'Introduzir sem qualquer preocupação', 'Partilhar a rede com desconhecidos', 'Desligar o antivírus'],
              c: 0,
              e: 'Redes públicas podem não proteger bem os teus dados.'
            },
            {
              q: 'Antes de publicares algo online, deves pensar:',
              opts: ['Se essa publicação respeita os outros e a mim próprio', 'Apenas se vai ter muitos gostos', 'Se é engraçado, nada mais importa', 'Não é preciso pensar antes de publicar'],
              c: 0,
              e: 'Refletir antes de publicar evita problemas e mostra respeito.'
            },
            {
              q: 'Recebeste um ficheiro de um remetente desconhecido. O que deves fazer?',
              opts: ['Não abrir e avisar um adulto', 'Abrir imediatamente por curiosidade', 'Reencaminhar a todos os amigos', 'Guardar sem verificar'],
              c: 0,
              e: 'Ficheiros de origem desconhecida podem ser perigosos.'
            }
          ]
        }
      }
    },
    {
      id: 'quiz-final-seguranca',
      themeId: 'seguranca',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Segurança e Respeito (10 Questões)', en: '🏆 Learning Quiz: Security and Respect (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas sobre o Tema de Segurança.', en: 'Comprehensive final assessment with 10 questions on Security.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 100,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'seg-q1',
      question: { pt: 'O que é o phishing?', en: 'What is phishing?' },
      options: {
        pt: ['Uma técnica para enganar pessoas e roubar dados e credenciais', 'Um protocolo para acelerar descargas na Web', 'Um serviço de cópias de segurança na nuvem', 'Um formato de ficheiro de compressão de dados'],
        en: ['A technique to trick people and steal data and credentials', 'A protocol to accelerate web downloads', 'A cloud-based backup service', 'A compressed data file format']
      },
      correctIndex: 0,
      explanation: { pt: 'O phishing tenta enganar as pessoas para obter dados pessoais.', en: 'Phishing attempts to trick people to obtain personal data.' }
    },
    {
      id: 'seg-q2',
      question: { pt: 'O que deves fazer ao receber uma mensagem de um desconhecido com um link?', en: 'What should you do when receiving a message from a stranger with a link?' },
      options: {
        pt: ['Não clicar e avisar um adulto', 'Clicar imediatamente', 'Reencaminhar a todos', 'Responder com os teus dados'],
        en: ['Do not click and warn an adult', 'Click immediately', 'Forward to everyone', 'Reply with your data']
      },
      correctIndex: 0,
      explanation: { pt: 'Nunca deves clicar em links de origem desconhecida.', en: 'You should never click links from unknown origins.' }
    },
    {
      id: 'seg-q3',
      question: { pt: 'O que é o ciberbullying?', en: 'What is cyberbullying?' },
      options: {
        pt: ['O uso de meios digitais para intimidar, insultar, humilhar, ameaçar ou magoar outra pessoa', 'Uma discussão construtiva num fórum de turma', 'Um teste de velocidade de ligação à rede', 'Um filtro de proteção de conteúdos impróprios'],
        en: ['Using digital media to intimidate, insult, humiliate, threaten, or hurt someone', 'A constructive discussion in a class forum', 'A network speed measurement test', 'A protection filter against inappropriate content']
      },
      correctIndex: 0,
      explanation: { pt: 'O ciberbullying causa dano real a outras pessoas.', en: 'Cyberbullying causes real harm to other people.' }
    },
    {
      id: 'seg-q4',
      question: { pt: 'Antes de publicares uma foto de outra pessoa deves:', en: 'Before publishing someone else\'s photo you should:' },
      options: {
        pt: ['Pedir autorização', 'Publicar sem perguntar', 'Alterar a foto sem avisar', 'Enviar apenas a amigos, sem autorização'],
        en: ['Ask permission', 'Publish without asking', 'Change the photo without warning', 'Send only to friends without permission']
      },
      correctIndex: 0,
      explanation: { pt: 'É preciso respeitar a privacidade e imagem dos outros.', en: 'It is necessary to respect the privacy and image of others.' }
    },
    {
      id: 'seg-q5',
      question: { pt: 'O que é a pegada digital?', en: 'What is the digital footprint?' },
      options: {
        pt: ['O rasto que deixamos das nossas ações, pesquisas e publicações online', 'O espaço em disco ocupado pelo sistema operativo', 'O histórico de comandos introduzidos na consola', 'A capacidade máxima de transferência do router'],
        en: ['The trail we leave of our online actions, searches, and posts', 'The disk space occupied by the operating system', 'The command history recorded in the terminal', 'The maximum transfer capacity of the router']
      },
      correctIndex: 0,
      explanation: { pt: 'Tudo o que publicamos ou partilhamos deixa um rasto digital.', en: 'Everything we publish or share leaves a digital trail.' }
    },
    {
      id: 'seg-q6',
      question: { pt: 'Quais destas informações NUNCA deves partilhar com desconhecidos na Internet ou em jogos online?', en: 'Which of these information should you NEVER share with strangers on the Internet or in online games?' },
      options: {
        pt: ['A tua morada de casa, número de telemóvel e o nome da tua escola', 'A tua cor favorita e o teu desporto preferido', 'O nome do teu herói ou personagem de banda desenhada', 'O título de um livro que estás a ler na escola'],
        en: ['Your home address, phone number, and school name', 'Your favorite color and preferred sport', 'The name of your comic book hero', 'The title of a book you are reading in school']
      },
      correctIndex: 0,
      explanation: { pt: 'A morada, os contactos e a escola são dados pessoais privados que te identificam e nunca devem ser partilhados.', en: 'Address, contacts, and school are private identifiers that must never be revealed to strangers.' }
    },
    {
      id: 'seg-q7',
      question: { pt: 'Redes Wi-Fi públicas podem ser:', en: 'Public Wi-Fi networks can be:' },
      options: {
        pt: ['menos seguras para o tráfego de dados e informações pessoais', 'sempre totalmente seguras em qualquer circunstância', 'protegidas automaticamente por cifra militar', 'iguais às redes privadas de casa em nível de segurança'],
        en: ['less secure for data traffic and personal information', 'always fully secure under all circumstances', 'automatically protected by military-grade encryption', 'identical to private home networks in security level']
      },
      correctIndex: 0,
      explanation: { pt: 'É preciso ter mais cuidado com dados pessoais em redes públicas.', en: 'You need to be extra careful with personal data on public networks.' }
    },
    {
      id: 'seg-q8',
      question: { pt: 'Se um colega for vítima de ciberbullying, deves:', en: 'If a peer is a victim of cyberbullying, you should:' },
      options: {
        pt: ['apoiá-lo e avisar um adulto', 'ignorar a situação', 'juntar-te às mensagens ofensivas', 'partilhar a conversa para toda a escola'],
        en: ['support them and warn an adult', 'ignore the situation', 'join the offensive messages', 'share the conversation with the whole school']
      },
      correctIndex: 0,
      explanation: { pt: 'Apoiar a vítima e envolver um adulto ajuda a resolver a situação.', en: 'Supporting the victim and involving an adult helps resolve the situation.' }
    },
    {
      id: 'seg-q9',
      question: { pt: 'Um ficheiro enviado por um desconhecido deve ser:', en: 'A file sent by a stranger should be:' },
      options: {
        pt: ['ignorado e reportado a um adulto', 'aberto imediatamente', 'reencaminhado a amigos', 'guardado sem verificação'],
        en: ['ignored and reported to an adult', 'opened immediately', 'forwarded to friends', 'saved without verification']
      },
      correctIndex: 0,
      explanation: { pt: 'Ficheiros desconhecidos podem conter riscos.', en: 'Unknown files may contain risks.' }
    },
    {
      id: 'seg-q10',
      question: { pt: 'Se alguém que conheceste online te pedir para manter a conversa em segredo dos teus pais, o que deves fazer?', en: 'If someone you met online asks you to keep the conversation secret from your parents, what should you do?' },
      options: {
        pt: ['Desconfiar de imediato e contar logo aos teus pais ou a um professor', 'Guardar o segredo para não estragar a amizade no jogo', 'Pedir à pessoa que envie primeiro a morada dela', 'Desligar o ecrã mas continuar a falar às escondidas'],
        en: ['Be suspicious immediately and tell your parents or a teacher right away', 'Keep the secret so you do not harm the gaming friendship', 'Ask the person to send their address first', 'Turn off the screen but keep talking in secret']
      },
      correctIndex: 0,
      explanation: { pt: 'Ninguém com boas intenções pede a uma criança para guardar segredos dos pais. Se isso acontecer, avisa sempre um adulto!', en: 'Nobody with good intentions asks a child to keep secrets from their parents. Always notify a trusted adult!' }
    }
  ]
};
