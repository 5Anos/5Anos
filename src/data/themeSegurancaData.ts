import { ThemeDefinition } from '../types';

export const themeSegurancaData: ThemeDefinition = {
  id: 'seguranca',
  number: 4,
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
          'Sinais de alerta: pedidos urgentes de palavras-passe ou dados pessoais, links estranhos ou promessas de prémios. Uma mensagem pode parecer vir de alguém que conheces (como uma empresa, professor ou amigo) e, mesmo assim, ser falsa.',
        ],
        en: [
          'Phishing is a technique used to trick people and steal data via fake messages or sites that look authentic.',
          'Warning signs: urgent password or personal data requests, strange links, or prize promises. A message may look like it comes from someone you know (like a company, teacher, or friend) and still be fake.',
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
          'Algumas das nossas atividades online deixam registos. Publicações, comentários e conteúdos que partilhamos podem fazer parte da nossa pegada digital.',
          'Aquilo que publicas pode ser copiado, guardado ou partilhado por outras pessoas e pode permanecer acessível durante muito tempo.',
        ],
        en: [
          'Some of our online activities leave records. Posts, comments, and shared content can form part of our digital footprint.',
          'What you publish can be copied, saved, or shared by others and may remain accessible for a long time.',
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
        pt: 'O phishing é uma técnica usada para enganar pessoas e roubar dados através de mensagens ou sites falsos que parecem verdadeiros.<br><br>Sinais de alerta:<ul><li>Pedidos urgentes de dados pessoais ou palavras-passe.</li><li>Mensagens que personificam entidades ou conhecidos (uma mensagem pode parecer vir de alguém que conheces e, mesmo assim, ser falsa).</li><li>Links estranhos ou encurtados.</li><li>Promessas de prémios.</li><li>Nunca deves clicar em links suspeitos nem partilhar dados sensíveis.</li></ul>',
        en: 'Phishing is a technique used to trick people and steal data via fake messages or sites that look authentic.<br><br>Warning signs:<ul><li>Urgent requests for personal data or passwords.</li><li>Messages impersonating organizations or acquaintances (a message can look like it comes from someone you know and still be fake).</li><li>Strange or shortened links.</li><li>Promises of prizes.</li><li>You should never click suspicious links or share sensitive data.</li></ul>',
      },
      icon: '🎣',
    },
    {
      eyebrow: { pt: 'Ciberbullying', en: 'Cyberbullying' },
      h: { pt: 'Ciberbullying e a Regra dos 5 Passos', en: 'Cyberbullying and the 5-Step Rule' },
      body: {
        pt: 'Ciberbullying é o uso de meios digitais para intimidar, insultar, humilhar, ameaçar ou magoar outra pessoa.<br><br>Se fores vítima ou testemunha de Ciberbullying, aplica a <strong>Regra dos 5 Passos</strong>:<ul><li><strong>1. PARAR:</strong> Não responder nem reagir com insultos.</li><li><strong>2. GUARDAR PROVAS:</strong> Tirar capturas de ecrã das mensagens, fotos e datas. ⚠️ <em>Nunca apagues as mensagens antes de as guardar como prova!</em></li><li><strong>3. BLOQUEAR:</strong> Bloquear o contacto do agressor para impedir novas mensagens.</li><li><strong>4. DENUNCIAR:</strong> Utilizar a opção de denúncia na plataforma ou aplicação.</li><li><strong>5. PEDIR AJUDA:</strong> Falar imediatamente com pais, professores ou ligar para a Linha Internet Segura (800 21 90 90).</li></ul>',
        en: 'Cyberbullying is using digital tools to intimidate, insult, humiliate, or harm others.<br><br>If you experience or witness Cyberbullying, follow the <strong>5-Step Rule</strong>:<ul><li><strong>1. STOP:</strong> Do not reply or retaliate with insults.</li><li><strong>2. SAVE EVIDENCE:</strong> Take screenshots of messages, photos, and timestamps. ⚠️ <em>Never delete messages before saving evidence!</em></li><li><strong>3. BLOCK:</strong> Block the bully to prevent new messages.</li><li><strong>4. REPORT:</strong> Use in-app reporting tools on the platform.</li><li><strong>5. SEEK HELP:</strong> Speak immediately with parents, teachers, or call the Safe Internet Helpline (800 21 90 90).</li></ul>',
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
        pt: 'Algumas das nossas atividades online deixam registos. Publicações, comentários e conteúdos que partilhamos podem fazer parte da nossa pegada digital. Aquilo que publicas pode ser copiado, guardado ou partilhado por outras pessoas e pode permanecer acessível durante muito tempo. Por isso, é importante pensar antes de publicar ou partilhar.',
        en: 'Some of our online activities leave records. Posts, comments, and shared content can form part of our digital footprint. What you publish can be copied, saved, or shared by others and may remain accessible for a long time. Therefore, it is important to think before posting or sharing.',
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
            { s: 'Uma rede Wi-Fi pública ou desconhecida pode apresentar riscos.', a: true, e: 'Uma rede Wi-Fi pública ou desconhecida pode apresentar riscos. Evita introduzir dados sensíveis em redes em que não confias.' },
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
              opts: [
                'Reencaminho a mensagem a todos os amigos',
                'Envio a palavra-passe imediatamente',
                'Clico no link para confirmar',
                'Não respondo e aviso logo um adulto de confiança'
              ],
              c: 3,
              e: 'Nunca partilhes palavras-passe! Pedidos de palavras-passe são sempre uma tentativa de burla.',
              tip: 'Pequenas escolhas, grandes seguranças!'
            },
            {
              q: 'Porque é importante manter o antivírus e as atualizações do computador em dia?',
              opts: [
                'Para o computador gastar a bateria mais depressa',
                'Apenas para mudar a imagem de fundo do ecrã',
                'Para proteger o computador contra novos vírus e falhas de segurança',
                'Não tem qualquer utilidade prática'
              ],
              c: 2,
              e: 'As atualizações corrigem falhas de segurança e garantem que o antivírus reconhece novas ameaças.',
              tip: 'Escudo e antivírus sempre atualizados!'
            },
            {
              q: 'Qual destes é um sinal típico de uma tentativa de burla ou fraude digital?',
              opts: [
                'Mensagens com pedidos urgentes de dados pessoais ou dinheiro sob ameaça',
                'Um aviso do professor no Teams ou Classroom sobre um trabalho',
                'Um email da biblioteca a avisar do prazo de devolução de um livro',
                'Uma mensagem da família a combinar a hora de jantar'
              ],
              c: 0,
              e: 'O sentido de urgência e o pedido de dados confidenciais são os sinais mais comuns de fraude digital.',
              tip: 'Urgência excessiva? Suspeita sempre!'
            },
            {
              q: 'Se uma pessoa desconhecida na Internet te pedir para ligares a câmara ou enviares fotos tuas, como deves reagir?',
              opts: [
                'Ligar a câmara para mostrar o teu quarto e ser simpático',
                'Enviar uma fotografia com a camisola da tua escola',
                'Pedir à pessoa que envie primeiro uma fotografia dela',
                'Recusar de imediato, fechar a conversa e avisar logo os pais ou um professor'
              ],
              c: 3,
              e: 'Nunca partilhes imagens nem ligues a câmara a desconhecidos! Avisa logo um adulto de confiança.',
              tip: 'A tua privacidade é o teu maior tesouro!'
            },
            {
              q: 'O que deves fazer se não tens a certeza se uma mensagem ou ficheiro recebido é seguro?',
              opts: [
                'Abrir imediatamente para ver se acontece alguma coisa',
                'Pedir ajuda a um adulto de confiança antes de abrir',
                'Reencaminhar para todos os contactos da turma',
                'Ignorar e continuar a navegar sem verificar'
              ],
              c: 1,
              e: 'Pedir ajuda a um adulto de confiança é sempre a atitude mais segura!',
              tip: 'Na dúvida, para e fala com um adulto!'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-seguranca-mc2',
      themeId: 'seguranca',
      number: 3,
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
              opts: ['Partilhar também a fotografia', 'Dizer-lhe que isso não é correto e sugerir que remova a foto', 'Fazer o mesmo com outra pessoa', 'Ignorar completamente'],
              c: 1,
              e: 'Devemos sempre respeitar a privacidade e imagem dos outros.'
            },
            {
              q: 'Vês um colega a receber mensagens ofensivas repetidamente. O que deves fazer?',
              opts: ['Participar também nas mensagens', 'Ignorar por completo a situação', 'Apoiar o colega e falar com um adulto', 'Partilhar a conversa publicamente'],
              c: 2,
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
              opts: ['Apenas se vai ter muitos gostos', 'Se é engraçado, nada mais importa', 'Não é preciso pensar antes de publicar', 'Se essa publicação respeita os outros e a mim próprio'],
              c: 3,
              e: 'Refletir antes de publicar evita problemas e mostra respeito.'
            },
            {
              q: 'Recebeste um ficheiro de um remetente desconhecido. O que deves fazer?',
              opts: ['Abrir imediatamente por curiosidade', 'Não abrir e avisar um adulto', 'Reencaminhar a todos os amigos', 'Guardar sem verificar'],
              c: 1,
              e: 'Ficheiros de origem desconhecida podem ser perigosos.'
            }
          ]
        }
      }
    },
    {
      id: 'quiz-final-seguranca',
      themeId: 'seguranca',
      number: 4,
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
      question: {
        pt: 'A Maria recebe um email que parece do seu banco, pedindo com urgência para clicar num link e introduzir a sua palavra-passe. O que é esta situação e como deve reagir?',
        en: 'Maria receives an email that looks like it is from her bank, urgently asking her to click a link and enter her password. What is this situation and how should she react?',
      },
      options: {
        pt: [
          'É um envio normal do sistema para atualizar a conta e a Maria deve introduzir os dados rapidamente.',
          'É uma tentativa de phishing; a Maria não deve clicar no link nem facultar dados, devendo avisar um adulto.',
          'É uma mensagem automática de teste do navegador e a Maria pode reencaminhá-la a colegas.',
          'É um serviço gratuito de apoio ao cliente e a Maria deve responder com a sua palavra-passe.',
        ],
        en: [
          'It is a normal system update and Maria should enter her details immediately.',
          'It is a phishing attempt; Maria should not click the link or provide data, and should inform an adult.',
          'It is an automatic browser test message and Maria can forward it to classmates.',
          'It is a free customer support service and Maria should reply with her password.',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'O phishing é uma tentativa de fraude que usa mensagens falsas para enganar as pessoas e roubar dados pessoais e palavras-passe.',
        en: 'Phishing is a fraudulent attempt using fake messages to trick people into revealing personal credentials.',
      },
    },
    {
      id: 'seg-q2',
      question: { pt: 'O que deves fazer ao receber uma mensagem de um desconhecido com um link?', en: 'What should you do when receiving a message from a stranger with a link?' },
      options: {
        pt: ['Clicar imediatamente', 'Reencaminhar a todos', 'Não clicar e avisar um adulto', 'Responder com os teus dados'],
        en: ['Click immediately', 'Forward to everyone', 'Do not click and warn an adult', 'Reply with your data']
      },
      correctIndex: 2,
      explanation: { pt: 'Nunca deves clicar em links de origem desconhecida.', en: 'You should never click links from unknown origins.' }
    },
    {
      id: 'seg-q3',
      question: {
        pt: 'O Bernardo reparou que um colega de turma está a receber mensagens insultuosas e montagens de fotos num grupo da escola. Que situação é esta e qual é o procedimento correto?',
        en: 'Bernardo noticed a classmate is receiving insulting messages and photo montages in a class chat group. What situation is this and what is the correct action?',
      },
      options: {
        pt: [
          'É ciberbullying; o Bernardo deve apoiar o colega, incentivar a guardar provas e pedir ajuda a um professor ou encarregado de educação.',
          'É uma brincadeira habitual e o Bernardo deve continuar a partilhar as imagens no grupo.',
          'É um problema técnico de ligação à Internet e o Bernardo deve reiniciar o router de casa.',
          'É um jogo de equipa e o Bernardo deve responder com insultos ainda mais graves.',
        ],
        en: [
          'It is cyberbullying; Bernardo should support his classmate, encourage saving evidence, and ask a teacher or guardian for help.',
          'It is a normal joke and Bernardo should keep sharing the images in the group.',
          'It is an internet connection technical issue and Bernardo should restart the home router.',
          'It is a team game and Bernardo should reply with even worse insults.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O ciberbullying causa dano real. Apoiar a vítima, guardar provas e envolver um adulto é a atitude correta de cidadania digital.',
        en: 'Cyberbullying causes real harm. Supporting the victim, keeping evidence, and involving an adult is responsible digital citizenship.',
      },
    },
    {
      id: 'seg-q4',
      question: { pt: 'Antes de publicares uma foto de outra pessoa deves:', en: 'Before publishing someone else\'s photo you should:' },
      options: {
        pt: ['Publicar sem perguntar', 'Alterar a foto sem avisar', 'Enviar apenas a amigos, sem autorização', 'Pedir autorização'],
        en: ['Publish without asking', 'Change the photo without warning', 'Send only to friends without permission', 'Ask permission']
      },
      correctIndex: 3,
      explanation: { pt: 'É preciso respeitar a privacidade e imagem dos outros.', en: 'It is necessary to respect the privacy and image of others.' }
    },
    {
      id: 'seg-q5',
      question: {
        pt: 'A Sofia publicou uma fotografia de um passeio escolar e comentou um artigo num blogue de Ciência. Como é que estas ações afetam a sua pegada digital?',
        en: 'Sofia posted a photo from a school field trip and commented on a Science blog article. How do these actions affect her digital footprint?',
      },
      options: {
        pt: [
          'Apenas alteram a capacidade do disco rígido do computador da escola.',
          'Fazem parte da sua pegada digital, pois são registos e conteúdos partilhados que podem permanecer acessíveis.',
          'Apagam automaticamente todo o histórico de navegação anterior.',
          'Aumentam a velocidade da ligação de fibra ótica de sua casa.',
        ],
        en: [
          'They only change the hard drive capacity of the school computer.',
          'They become part of her digital footprint, as shared posts and comments can remain accessible over time.',
          'They automatically erase all previous web browsing history.',
          'They increase the home fiber optic connection speed.',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Publicações, comentários e conteúdos partilhados na Internet fazem parte da pegada digital e podem permanecer acessíveis durante muito tempo.',
        en: 'Posts, comments, and shared content online form part of a digital footprint and can remain accessible over time.',
      },
    },
    {
      id: 'seg-q6',
      question: { pt: 'Quais destas informações NUNCA deves partilhar com desconhecidos na Internet ou em jogos online?', en: 'Which of these information should you NEVER share with strangers on the Internet or in online games?' },
      options: {
        pt: ['A tua cor favorita e o teu desporto preferido', 'O nome do teu herói ou personagem de banda desenhada', 'A tua morada de casa, número de telemóvel e o nome da tua escola', 'O título de um livro que estás a ler na escola'],
        en: ['Your favorite color and preferred sport', 'The name of your comic book hero', 'Your home address, phone number, and school name', 'The title of a book you are reading in school']
      },
      correctIndex: 2,
      explanation: { pt: 'A morada, os contactos e a escola são dados pessoais privados que te identificam e nunca devem ser partilhados.', en: 'Address, contacts, and school are private identifiers that must never be revealed to strangers.' }
    },
    {
      id: 'seg-q7',
      question: { pt: 'Sobre redes Wi-Fi públicas ou desconhecidas, qual é a atitude correta?', en: 'Regarding public or unknown Wi-Fi networks, what is the correct attitude?' },
      options: {
        pt: ['Uma rede Wi-Fi pública ou desconhecida pode apresentar riscos; evita introduzir dados sensíveis em redes em que não confias', 'São sempre totalmente seguras sem qualquer tipo de risco', 'Permitem enviar dados de cartão de crédito sem qualquer preocupação', 'Não apresentam qualquer risco de segurança'],
        en: ['A public or unknown Wi-Fi network can present risks; avoid entering sensitive data on networks you do not trust', 'They are always fully safe without any risk', 'They allow credit card data to be sent without concern', 'They present no security risks']
      },
      correctIndex: 0,
      explanation: { pt: 'Uma rede Wi-Fi pública ou desconhecida pode apresentar riscos. Evita introduzir dados sensíveis em redes em que não confias.', en: 'A public or unknown Wi-Fi network can present risks. Avoid entering sensitive data on networks you do not trust.' }
    },
    {
      id: 'seg-q8',
      question: { pt: 'Se um colega for vítima de ciberbullying, deves:', en: 'If a peer is a victim of cyberbullying, you should:' },
      options: {
        pt: ['ignorar a situação', 'apoiá-lo e avisar um adulto', 'juntar-te às mensagens ofensivas', 'partilhar a conversa para toda a escola'],
        en: ['ignore the situation', 'support them and warn an adult', 'join the offensive messages', 'share the conversation with the whole school']
      },
      correctIndex: 1,
      explanation: { pt: 'Apoiar a vítima e envolver um adulto ajuda a resolver a situação.', en: 'Supporting the victim and involving an adult helps resolve the situation.' }
    },
    {
      id: 'seg-q9',
      question: { pt: 'Um ficheiro enviado por um desconhecido deve ser:', en: 'A file sent by a stranger should be:' },
      options: {
        pt: ['aberto imediatamente', 'reencaminhado a amigos', 'ignorado e reportado a um adulto', 'guardado sem verificação'],
        en: ['opened immediately', 'forwarded to friends', 'ignored and reported to an adult', 'saved without verification']
      },
      correctIndex: 2,
      explanation: { pt: 'Ficheiros desconhecidos podem conter riscos.', en: 'Unknown files may contain risks.' }
    },
    {
      id: 'seg-q10',
      question: { pt: 'Se alguém que conheceste online te pedir para manter a conversa em segredo dos teus pais, o que deves fazer?', en: 'If someone you met online asks you to keep the conversation secret from your parents, what should you do?' },
      options: {
        pt: ['Guardar o segredo para não estragar a amizade no jogo', 'Pedir à pessoa que envie primeiro a morada dela', 'Desligar o ecrã mas continuar a falar às escondidas', 'Desconfiar de imediato e pedir ajuda aos teus pais ou a outro adulto de confiança'],
        en: ['Keep the secret so you do not harm the gaming friendship', 'Ask the person to send their address first', 'Turn off the screen but keep talking in secret', 'Be suspicious immediately and ask your parents or another trusted adult for help']
      },
      correctIndex: 3,
      explanation: { pt: 'Se uma pessoa que conheceste online te pedir para esconder a conversa dos teus pais ou de outro adulto de confiança, deves desconfiar e pedir ajuda.', en: 'If someone you met online asks you to hide the conversation from your parents or another trusted adult, you should be suspicious and ask for help.' }
    }
  ]
};
