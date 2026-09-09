/**
 * 52 Curated Weekly Tips for 5th Grade ICT (TIC 5.º Ano)
 * Strictly ONE tip per week of the year (Weeks 1 to 52).
 * Each tip includes an interactive reading comprehension question:
 * - Read and answer correctly: +50 Points
 * - Read and answer incorrectly: +25 Points (participation reward)
 */

export interface WeeklyTipOption {
  id: string; // 'a' | 'b' | 'c' | 'd'
  pt: string;
  en: string;
}

export interface WeeklyTicTip {
  week: number; // 1 to 52
  themeId: string;
  themeNumber: number;
  themeTitle: {
    pt: string;
    en: string;
  };
  themeIcon: string;
  badgeColor: string;
  title: {
    pt: string;
    en: string;
  };
  teaser: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  whyItMatters: {
    pt: string;
    en: string;
  };
  funFact: {
    pt: string;
    en: string;
  };
  question: {
    pt: string;
    en: string;
  };
  options: WeeklyTipOption[];
  correctOptionId: string;
  explanation: {
    pt: string;
    en: string;
  };
}

export const ALL_52_WEEKLY_TIPS: WeeklyTicTip[] = [
  {
    "week": 1,
    "title": {
      "pt": "O que é o Hardware e o Software?",
      "en": "What is Hardware and Software?"
    },
    "teaser": {
      "pt": "A parte física que podes tocar vs as instruções que fazem a magia acontecer!",
      "en": "The physical parts vs the code that runs them!"
    },
    "description": {
      "pt": "O computador é composto por duas partes fundamentais: o Hardware (todas as peças físicas que podes tocar, como o teclado, o rato, o monitor e a motherboard) e o Software (os programas, jogos e aplicações que dão ordens ao hardware para funcionar). Sem software, o hardware é apenas uma caixa inerte!",
      "en": "A computer consists of two main parts: Hardware (physical components like keyboard, mouse, and screen) and Software (programs and apps that instruct the hardware)."
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC aprendes a distinguir componentes físicos de aplicações digitais para saberes identificar o que está a funcionar na tua máquina.",
      "en": "In 5th grade ICT you learn to distinguish physical equipment from software programs."
    },
    "funFact": {
      "pt": "Uma piada clássica da informática diz: \"Hardware é aquilo a que dás um pontapé quando o Software bloqueia!\"",
      "en": "A classic IT joke says: \"Hardware is what you kick when the software crashes!\""
    },
    "question": {
      "pt": "Qual dos seguintes elementos é um exemplo de SOFTWARE?",
      "en": "Which of the following is an example of SOFTWARE?"
    },
    "options": [
      {
        "id": "a",
        "pt": "O rato do computador",
        "en": "The computer mouse"
      },
      {
        "id": "b",
        "pt": "O processador (CPU)",
        "en": "The processor (CPU)"
      },
      {
        "id": "c",
        "pt": "O navegador de internet (Google Chrome ou Firefox)",
        "en": "The web browser (Chrome or Firefox)"
      },
      {
        "id": "d",
        "pt": "O teclado mecânico",
        "en": "The mechanical keyboard"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "O navegador de internet é um programa (software). O rato, o processador e o teclado são componentes físicos (hardware).",
      "en": "The web browser is a program (software), while the mouse, CPU, and keyboard are physical hardware."
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo"
  },
  {
    "week": 2,
    "title": {
      "pt": "A Regra dos 90 Graus na Cadeira",
      "en": "The 90-Degree Ergonomic Posture"
    },
    "teaser": {
      "pt": "Como deves sentar-te para proteger as tuas costas durante as aulas de TIC.",
      "en": "How to sit properly to protect your back during screen time."
    },
    "description": {
      "pt": "Ergonomia é a ciência que adapta o ambiente de trabalho ao corpo humano. Ao sentares-te à secretária, deves manter as costas direitas apoiadas nas costas da cadeira, os joelhos fletidos a cerca de 90 graus com os pés totalmente assentes no chão, e os cotovelos também a 90 graus perto do corpo ao escrever no teclado.",
      "en": "Ergonomics adapts equipment to your body. Keep feet flat on the floor, back supported, and elbows/knees at roughly 90-degree angles."
    },
    "whyItMatters": {
      "pt": "Manter uma boa postura evita dores na coluna, fadiga muscular e lesões posturais graves enquanto estudas ou jogas.",
      "en": "Good posture prevents back pain and muscle strain during schoolwork and gaming."
    },
    "funFact": {
      "pt": "Quando inclinas a cabeça 60 graus para a frente para olhar para o telemóvel, a tua coluna cervical suporta o peso equivalente a 27 kg — como levar um cão grande ao colo!",
      "en": "Tilting your neck 60 degrees forward to look at a phone puts 27 kg of pressure on your spine!"
    },
    "question": {
      "pt": "Segundo as regras de ergonomia, como devem ficar os pés ao utilizar o computador?",
      "en": "According to ergonomics, how should your feet be positioned at a computer desk?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Cruzados no ar em cima de uma perna",
        "en": "Crossed in the air on top of one leg"
      },
      {
        "id": "b",
        "pt": "Totalmente assentes e apoiados no chão ou num apoio de pés",
        "en": "Flat and fully supported on the floor or footrest"
      },
      {
        "id": "c",
        "pt": "Pendurados sem tocar no chão",
        "en": "Dangling without touching the floor"
      },
      {
        "id": "d",
        "pt": "Apoiados em cima da torre do computador",
        "en": "Resting on top of the computer case"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Os pés devem estar bem assentes no chão ou num apoio de pés para distribuir o peso do corpo e manter a circulação sanguínea saudável.",
      "en": "Feet should be flat on the floor or footrest to distribute body weight and maintain healthy circulation."
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald"
  },
  {
    "week": 3,
    "title": {
      "pt": "A Tua Pegada Digital é Permanente!",
      "en": "Your Digital Footprint is Forever!"
    },
    "teaser": {
      "pt": "Cada clique, foto, comentário ou pesquisa deixa um rasto que pode nunca desaparecer.",
      "en": "Every post, photo, and search leaves a trace on the web."
    },
    "description": {
      "pt": "Tudo o que publicas, comentas, pesquisas ou partilhas na internet cria a tua \"Pegada Digital\". Mesmo que apagues uma foto ou uma mensagem segundos depois, outra pessoa pode ter guardado uma captura de ecrã (screenshot) ou os servidores podem mantê-la em arquivo.",
      "en": "Everything you share or search builds your Digital Footprint. Even deleted posts might be screenshotted or archived forever."
    },
    "whyItMatters": {
      "pt": "A tua reputação digital de hoje poderá ser vista por amigos, professores e no teu futuro profissional. Pensa sempre antes de publicar!",
      "en": "Your digital reputation today matters for your future school and career."
    },
    "funFact": {
      "pt": "Existe uma biblioteca digital mundial chamada \"Wayback Machine\" que guarda cópias históricas de quase todas as páginas web desde 1996!",
      "en": "The Wayback Machine library has archived billions of web pages since 1996!"
    },
    "question": {
      "pt": "O que deves fazer ANTES de publicar uma fotografia ou comentário na internet?",
      "en": "What should you do BEFORE posting a picture or comment on the internet?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Publicar o mais depressa possível para ter muitos gostos",
        "en": "Post immediately to get quick likes"
      },
      {
        "id": "b",
        "pt": "Pensar se aquela imagem pode magoar alguém ou envergonhar-te no futuro",
        "en": "Think if it could hurt someone or embarrass you in the future"
      },
      {
        "id": "c",
        "pt": "Desligar o Wi-Fi imediatamente",
        "en": "Turn off the Wi-Fi immediately"
      },
      {
        "id": "d",
        "pt": "Colocar a foto como pública para estranhos verem",
        "en": "Set the photo to public for strangers"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A regra de ouro da cidadania digital é pensar nas consequências a longo prazo antes de partilhar qualquer conteúdo.",
      "en": "The golden rule of digital citizenship is thinking through long-term consequences before posting."
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose"
  },
  {
    "week": 4,
    "title": {
      "pt": "O Segredo da Frase-passe Inquebrável",
      "en": "The Secret to an Unbreakable Passphrase"
    },
    "teaser": {
      "pt": "Porque é que 4 palavras aleatórias são milhares de vezes mais seguras do que uma senha curta.",
      "en": "Why 4 random words are thousands of times safer than a short password."
    },
    "description": {
      "pt": "Os computadores dos piratas informáticos usam programas de força bruta que tentam milhões de combinações por segundo. Uma senha curta como \"porta12\" é descoberta em menos de 1 segundo! Em vez disso, cria uma FRASE-PASSE combinando palavras fáceis de lembrar para ti, mas sem ligação entre si, como \"Laranja*Voadora#79Salto\".",
      "en": "Hackers use brute-force programs trying millions of guesses per second. A passphrase of 4 random words takes centuries to crack."
    },
    "whyItMatters": {
      "pt": "Proteger a tua conta escolar e de jogos impede que roubem os teus trabalhos, informações pessoais ou a tua identidade.",
      "en": "Strong passwords protect your school files, personal data, and game accounts."
    },
    "funFact": {
      "pt": "A palavra-passe mais utilizada no mundo continua a ser \"123456\", que demora menos de 0,0001 segundos a ser adivinhada por um computador!",
      "en": "\"123456\" remains the most common password worldwide, taking under 0.0001 seconds to crack!"
    },
    "question": {
      "pt": "Qual destas opções é a palavra-passe mais segura para proteger uma conta?",
      "en": "Which of these is the most secure password to protect an account?"
    },
    "options": [
      {
        "id": "a",
        "pt": "12345678",
        "en": "12345678"
      },
      {
        "id": "b",
        "pt": "oTeuPrimeiroNome2015",
        "en": "YourFirstName2015"
      },
      {
        "id": "c",
        "pt": "Cavalo*Montanha#89Azul!",
        "en": "Horse*Mountain#89Blue!"
      },
      {
        "id": "d",
        "pt": "benfica ou porto",
        "en": "football club name"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "\"Cavalo*Montanha#89Azul!\" é uma frase-passe longa, combina maiúsculas, minúsculas, números e símbolos especiais, tornando-a praticamente inquebrável.",
      "en": "\"Horse*Mountain#89Blue!\" is long, complex, and combines words, symbols, and numbers."
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe e Autenticação",
      "en": "Passwords & Authentication"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber"
  },
  {
    "week": 5,
    "title": {
      "pt": "A Importância do Campo \"Assunto\" no Email",
      "en": "The Importance of the Email Subject Field"
    },
    "teaser": {
      "pt": "Como garantir que o teu professor ou colega abre e lê a tua mensagem.",
      "en": "How to make sure your teacher or classmate opens your message."
    },
    "description": {
      "pt": "O campo \"Assunto\" (Subject) é a primeira coisa que o destinatário vê na caixa de entrada. Deve resumir claramente o motivo da mensagem em poucas palavras. Enviar um email com o assunto em branco ou apenas com \"Olá\" faz com que pareça correio publicitário ou vírus!",
      "en": "The Subject field is the first thing a recipient sees. A clear subject like \"TIC - Trabalho de Grupo - 5ºA\" ensures it gets read promptly."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendes a comunicar formalmente com a comunidade escolar, preparando-te para a vida académica e profissional.",
      "en": "Writing clear emails is a core ICT communication competence for school and life."
    },
    "funFact": {
      "pt": "O primeiro email da história foi enviado por Ray Tomlinson em 1971 para ele próprio, e o texto era apenas algo como \"QWERTYUIOP\" (a primeira linha do teclado)!",
      "en": "Ray Tomlinson sent the first email in 1971 to himself, typing something like \"QWERTYUIOP\"!"
    },
    "question": {
      "pt": "Qual é o melhor exemplo de um \"Assunto\" ao enviar um trabalho de TIC para o professor?",
      "en": "What is the best Subject line when sending an ICT assignment to your teacher?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Deixar o campo do assunto em branco",
        "en": "Leave the subject blank"
      },
      {
        "id": "b",
        "pt": "Socorro stor veja isto urgente!!!!!",
        "en": "Help teacher look at this now!!!!!"
      },
      {
        "id": "c",
        "pt": "TIC 5.º A - Trabalho de Hardware - Grupo 2",
        "en": "ICT 5th A - Hardware Project - Group 2"
      },
      {
        "id": "d",
        "pt": "Olá",
        "en": "Hello"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "O assunto \"TIC 5.º A - Trabalho de Hardware - Grupo 2\" identifica imediatamente a disciplina, a turma, o tema e os alunos que enviaram.",
      "en": "It clearly states the class, topic, and sender group so the teacher can easily identify it."
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email Communication"
    },
    "themeIcon": "📧",
    "badgeColor": "sky"
  },
  {
    "week": 6,
    "title": {
      "pt": "Navegador vs Motor de Busca: Qual a Diferença?",
      "en": "Browser vs Search Engine: The Difference"
    },
    "teaser": {
      "pt": "Muitas pessoas confundem o Google com o Google Chrome, mas não são a mesma coisa!",
      "en": "People often confuse the Chrome browser with the Google search engine!"
    },
    "description": {
      "pt": "O Navegador (Browser) é o software instalado no teu computador que te permite abrir e ver páginas da web (exemplos: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari). O Motor de Busca (Search Engine) é um serviço dentro da web que procura páginas quando escreves palavras-chave (exemplos: Google, Bing, DuckDuckGo). O navegador é o carro; o motor de busca é o mapa!",
      "en": "The browser is the program that loads websites (Chrome, Firefox). The search engine is a service that indexes the web (Google, DuckDuckGo)."
    },
    "whyItMatters": {
      "pt": "Compreender as ferramentas da internet permite-te pesquisar com maior eficácia e escolher as melhores aplicações para estudar.",
      "en": "Knowing how browsers and search engines work makes your online research faster and smarter."
    },
    "funFact": {
      "pt": "O primeiro navegador com interface gráfica chamava-se \"Mosaic\" e foi criado em 1993, transformando a internet numa rede acessível a todos!",
      "en": "The first graphical web browser, Mosaic, was created in 1993, making the web visual!"
    },
    "question": {
      "pt": "Qual dos seguintes é um NAVEGADOR (Browser) e não um motor de busca?",
      "en": "Which of the following is a BROWSER and not a search engine?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Mozilla Firefox",
        "en": "Mozilla Firefox"
      },
      {
        "id": "b",
        "pt": "DuckDuckGo",
        "en": "DuckDuckGo"
      },
      {
        "id": "c",
        "pt": "Bing",
        "en": "Bing"
      },
      {
        "id": "d",
        "pt": "Yahoo Search",
        "en": "Yahoo Search"
      }
    ],
    "correctOptionId": "a",
    "explanation": {
      "pt": "O Mozilla Firefox é o programa navegador que abre a web. DuckDuckGo, Bing e Yahoo são motores de busca.",
      "en": "Mozilla Firefox is a browser application. DuckDuckGo, Bing, and Yahoo are search engines."
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegação e Pesquisa Crítica",
      "en": "Internet Browsing & Critical Research"
    },
    "themeIcon": "🌐",
    "badgeColor": "purple"
  },
  {
    "week": 7,
    "title": {
      "pt": "As Imagens no Google Não São Públicas nem Gratuitas!",
      "en": "Google Images are Not Public Domain!"
    },
    "teaser": {
      "pt": "Copiar e colar imagens da internet num trabalho pode violar a lei dos direitos de autor.",
      "en": "Copying images from search results can violate copyright laws."
    },
    "description": {
      "pt": "Muitos estudantes pensam que qualquer foto que aparece no Google Imagens pode ser copiada livremente. Na realidade, quase todas as fotos pertencem ao fotógrafo ou ilustrador que as criou! Se usares sem permissão nem citação, estás a cometer plágio. Deves usar imagens com licença Creative Commons ou de bancos de imagens livres (como Pixabay ou Unsplash) e indicar sempre o autor.",
      "en": "Most web images are protected by copyright. For school work, use Creative Commons images or free repositories, and always cite the source."
    },
    "whyItMatters": {
      "pt": "Respeitar a autoria e a propriedade intelectual é uma obrigação ética de cidadania e de honestidade académica nas aulas de TIC.",
      "en": "Academic integrity and respecting intellectual property are fundamental ICT skills."
    },
    "funFact": {
      "pt": "Em Portugal, os direitos de autor duram durante toda a vida do criador e mais 70 anos após a sua morte antes da obra passar a Domínio Público!",
      "en": "In Portugal and the EU, copyright lasts for the creators lifetime plus 70 years after their death!"
    },
    "question": {
      "pt": "O que deves fazer quando usas uma imagem da internet num trabalho de TIC?",
      "en": "What should you do when using an internet image in an ICT school project?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Dizer que foste tu que desenhaste a imagem",
        "en": "Claim you drew it yourself"
      },
      {
        "id": "b",
        "pt": "Verificar se tem licença livre (ex: Creative Commons) e citar a fonte/autor",
        "en": "Check for free license (like CC) and cite author/source"
      },
      {
        "id": "c",
        "pt": "Apagar a assinatura do autor com o Paint",
        "en": "Erase the author signature in Paint"
      },
      {
        "id": "d",
        "pt": "Não dizer nada a ninguém para o professor não notar",
        "en": "Say nothing so the teacher does not notice"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Deves sempre verificar se a imagem pode ser reutilizada e dar os créditos ao autor na tua webgrafia/bibliografia.",
      "en": "Always verify usage rights and credit the creator in your bibliography."
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "teal"
  },
  {
    "week": 8,
    "title": {
      "pt": "A CPU: O Cérebro do Computador",
      "en": "The CPU: Brain of the Computer"
    },
    "teaser": {
      "pt": "Como um minúsculo pedaço de silício consegue fazer milhares de milhões de cálculos por segundo.",
      "en": "How a tiny chip performs billions of calculations per second."
    },
    "description": {
      "pt": "A CPU (Unidade Central de Processamento ou Processador) é o cérebro de qualquer dispositivo digital. Ela recebe as tuas instruções (cliques, toques, teclas), interpreta-as e executa os cálculos necessários. A sua velocidade é medida em Gigahertz (GHz), significando milhares de milhões de ciclos por segundo!",
      "en": "The CPU (Central Processing Unit) processes all instructions. Measured in GHz, it calculates billions of steps every second."
    },
    "whyItMatters": {
      "pt": "Saber o que faz a CPU ajuda-te a compreender por que razão alguns programas precisam de processadores mais rápidos para correr sem lentidão.",
      "en": "Understanding CPU capabilities explains how computers run programs smoothly."
    },
    "funFact": {
      "pt": "O primeiro microprocessador comercial, o Intel 4004 de 1971, tinha apenas 2.300 transístores. Um processador moderno tem mais de 50 MIL MILHÕES de transístores!",
      "en": "The 1971 Intel 4004 had 2,300 transistors; today CPUs have over 50 billion!"
    },
    "question": {
      "pt": "Qual é a principal função da Unidade Central de Processamento (CPU)?",
      "en": "What is the main function of the Central Processing Unit (CPU)?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Guardar ficheiros quando o computador está desligado",
        "en": "Store files when the computer is off"
      },
      {
        "id": "b",
        "pt": "Executar instruções e realizar os cálculos lógicos do computador",
        "en": "Execute instructions and perform logical calculations"
      },
      {
        "id": "c",
        "pt": "Imprimir folhas de papel a cores",
        "en": "Print colored sheets of paper"
      },
      {
        "id": "d",
        "pt": "Limpar o pó do teclado",
        "en": "Clean dust off the keyboard"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A CPU é responsável por processar dados, executar os programas e coordenar todos os outros componentes.",
      "en": "The CPU processes data, executes software code, and coordinates computer components."
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo"
  },
  {
    "week": 9,
    "title": {
      "pt": "A Regra 20-20-20 para Proteger os Teus Olhos",
      "en": "The 20-20-20 Rule to Protect Your Eyes"
    },
    "teaser": {
      "pt": "O método simples para evitar a fadiga ocular, olhos secos e dores de cabeça.",
      "en": "A simple technique to prevent digital eye strain and dry eyes."
    },
    "description": {
      "pt": "Quando olhamos para ecrãs, pestanejamos metade das vezes normais, fazendo os olhos ficarem vermelhos e secos. Os oftalmologistas recomendam a regra 20-20-20: a cada 20 minutos a olhar para o ecrã, faz uma pausa de 20 segundos e olha para um objeto situado a cerca de 20 pés (cerca de 6 metros de distância, como pela janela).",
      "en": "Every 20 minutes looking at a screen, pause for 20 seconds and look at an object at least 20 feet (6 meters) away to relax eye muscles."
    },
    "whyItMatters": {
      "pt": "Preservar a saúde da tua visão é essencial num mundo onde usamos ecrãs para estudar, comunicar e jogar.",
      "en": "Caring for your eyesight is vital in an increasingly digital learning environment."
    },
    "funFact": {
      "pt": "Normalmente pestanejamos cerca de 15 a 20 vezes por minuto, mas em frente a um jogo ou ecrã esse número cai para apenas 5 vezes!",
      "en": "We normally blink 15-20 times per minute, but in front of a screen it drops to just 5 times!"
    },
    "question": {
      "pt": "Segundo a regra 20-20-20 de ergonomia visual, o que deves fazer a cada 20 minutos de ecrã?",
      "en": "According to the 20-20-20 rule, what should you do every 20 minutes?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Aumentar o brilho do ecrã para o máximo",
        "en": "Turn screen brightness to maximum"
      },
      {
        "id": "b",
        "pt": "Descansar 20 segundos a olhar para um ponto distante (a cerca de 6 metros)",
        "en": "Rest for 20 seconds looking at a distant object (about 6 meters away)"
      },
      {
        "id": "c",
        "pt": "Comer 20 gomas ou chocolates",
        "en": "Eat 20 candies"
      },
      {
        "id": "d",
        "pt": "Desligar o monitor e não voltar mais a estudar",
        "en": "Shut down and never study again"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Olhar para longe a cada 20 minutos relaxa os músculos do foco ocular e lubrifica os olhos.",
      "en": "Looking into the distance relaxes the eye focusing muscles and restores natural blinking."
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald"
  },
  {
    "week": 10,
    "title": {
      "pt": "Ciberbullying: O Que Fazer se For Contigo ou com um Colega",
      "en": "Cyberbullying: How to Respond"
    },
    "teaser": {
      "pt": "As 4 regras de ouro: Não responder, Guardar provas, Bloquear e Contar a um adulto.",
      "en": "The 4 golden rules: Do not retaliate, Save evidence, Block, and Tell an adult."
    },
    "description": {
      "pt": "Ciberbullying é o uso das tecnologias digitais para intimidar, envergonhar, humilhar ou assustar outra pessoa de forma repetida. Ao contrário do bullying na escola, o ciberbullying pode acontecer 24 horas por dia. Se presenciares ou sofreres isto: 1) Não respondas com insultos; 2) Guarda provas (faz printscreens); 3) Bloqueia o agressor; 4) Pede ajuda a um professor, pais ou à Linha Internet Segura (800 21 90 90).",
      "en": "Cyberbullying is harassment via digital platforms. Remember: Never retaliate, save screenshots as evidence, block the sender, and report to an adult."
    },
    "whyItMatters": {
      "pt": "A empatia e a solidariedade online criam um ambiente escolar saudável onde todos se sentem seguros.",
      "en": "Empathy and safety online ensure respectful collaboration for all students."
    },
    "funFact": {
      "pt": "Em Portugal, a Linha Internet Segura (800 21 90 90) é gratuita, confidencial e ajuda qualquer aluno, pai ou professor com problemas online.",
      "en": "In Portugal, the Safe Internet Helpline 800 21 90 90 is free, anonymous, and supports students and teachers."
    },
    "question": {
      "pt": "Qual é a atitude correta se receberes mensagens ofensivas num grupo de chat da turma?",
      "en": "What is the correct action if you receive offensive messages in a class chat group?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Responder com insultos ainda piores para te vingares",
        "en": "Insult back with worse words"
      },
      {
        "id": "b",
        "pt": "Guardar capturas de ecrã como prova e avisar pais ou professores",
        "en": "Save screenshots as evidence and inform parents or teachers"
      },
      {
        "id": "c",
        "pt": "Partilhar a mensagem com desconhecidos na internet",
        "en": "Share it with strangers online"
      },
      {
        "id": "d",
        "pt": "Ficar em silêncio e sofrer sozinho sem contar a ninguém",
        "en": "Stay silent and suffer alone"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Guardar as provas em captura de ecrã e reportar a um adulto de confiança é a forma mais eficaz e segura de resolver a situação.",
      "en": "Saving screenshots and reporting to a trusted adult resolves the problem safely."
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose"
  },
  {
    "week": 11,
    "title": {
      "pt": "O Perigo de Partilhar a Senha com o \"Melhor Amigo\"",
      "en": "Never Share Passwords, Even with Best Friends"
    },
    "teaser": {
      "pt": "Uma palavra-passe é como uma escova de dentes: é estritamente pessoal!",
      "en": "A password is like a toothbrush: strictly personal!"
    },
    "description": {
      "pt": "Muitos alunos partilham as senhas da conta Google da escola ou de jogos online com amigos como prova de confiança. No entanto, zangas entre amigos acontecem, e a outra pessoa pode acidentalmente deixar a conta aberta num computador partilhado ou mudar a tua senha. Uma palavra-passe nunca se partilha com ninguém, exceto com os teus pais ou encarregados de educação.",
      "en": "Never share your password with friends or classmates. If a friendship hits a rough patch or their device is compromised, your account is at risk."
    },
    "whyItMatters": {
      "pt": "A tua conta é pessoal e intransmissível. Qualquer ação feita com o teu utilizador é registada como tendo sido feita por ti.",
      "en": "You are accountable for any activity logged under your school account credentials."
    },
    "funFact": {
      "pt": "O atalho de teclado \"Tecla Windows + L\" (ou Ctrl+Cmd+Q no Mac) bloqueia instantaneamente o ecrã para ninguém mexer quando te levantas!",
      "en": "Pressing Windows Key + L instantly locks your workstation when you leave your desk!"
    },
    "question": {
      "pt": "Com quem podes partilhar as tuas palavras-passe de segurança?",
      "en": "Who is it safe to share your personal passwords with?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Com o melhor amigo da escola ou vizinho",
        "en": "With your best friend or neighbor"
      },
      {
        "id": "b",
        "pt": "Apenas com os teus pais ou encarregados de educação",
        "en": "Only with your parents or legal guardians"
      },
      {
        "id": "c",
        "pt": "Com jogadores que conheceste num jogo online",
        "en": "With players you met online"
      },
      {
        "id": "d",
        "pt": "Com qualquer pessoa que te prometa moedas grátis num jogo",
        "en": "With anyone offering free game currency"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "As senhas só devem ser conhecidas por ti e pelos teus pais. Amigos ou desconhecidos nunca devem ter acesso.",
      "en": "Passwords should only be shared with parents or guardians to protect account integrity."
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe e Autenticação",
      "en": "Passwords & Authentication"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber"
  },
  {
    "week": 12,
    "title": {
      "pt": "O Poder Secreto do Campo \"Cco\" (Bcc)",
      "en": "The Secret Power of the Bcc Field"
    },
    "teaser": {
      "pt": "Como enviar um email para 30 colegas sem revelar o endereço privado de nenhum deles.",
      "en": "How to send an email to 30 people without exposing their private addresses."
    },
    "description": {
      "pt": "Num email, \"Para\" destina-se aos destinatários principais; \"Cc\" (Com Cópia) para quem precisa de ver a conversa. Mas o mais importante para a privacidade é o \"Cco\" (Com Cópia Oculta / Bcc)! Quando colocas endereços em Cco, nenhum destinatário consegue ver o email dos outros. Isto impede o roubo de contactos e protege a privacidade da turma.",
      "en": "Bcc (Blind Carbon Copy) hides email addresses from other recipients, protecting their privacy when emailing groups."
    },
    "whyItMatters": {
      "pt": "O Regulamento Geral sobre a Proteção de Dados (RGPD) exige que os endereços de email pessoais sejam protegidos e não expostos sem consentimento.",
      "en": "GDPR privacy laws require protecting personal email addresses from public exposure."
    },
    "funFact": {
      "pt": "As siglas \"Cc\" e \"Cco\" vêm dos antigos tempos das máquinas de escrever, quando se usava \"papel químico de carbono\" para duplicar cartas!",
      "en": "Cc stands for \"Carbon Copy\", originating from typewriter carbon paper used to duplicate letters!"
    },
    "question": {
      "pt": "Para que serve colocar os emails dos colegas no campo \"Cco\" (Cópia Oculta)?",
      "en": "What is the purpose of putting recipients in the \"Bcc\" (Blind Carbon Copy) field?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Para o email ser enviado mais depressa",
        "en": "To send the email faster"
      },
      {
        "id": "b",
        "pt": "Para esconder os endereços e proteger a privacidade dos destinatários",
        "en": "To hide email addresses and protect recipient privacy"
      },
      {
        "id": "c",
        "pt": "Para transformar o texto em código secreto",
        "en": "To encrypt the body text"
      },
      {
        "id": "d",
        "pt": "Para que ninguém consiga ler a mensagem",
        "en": "So no one can read the message"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "O campo Cco oculta os endereços de todos os destinatários entre si, evitando que fiquem visíveis para terceiros.",
      "en": "Bcc conceals addresses from each other, safeguarding personal contact details."
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email Communication"
    },
    "themeIcon": "📧",
    "badgeColor": "sky"
  },
  {
    "week": 13,
    "title": {
      "pt": "O Truque das Aspas \"\" na Pesquisa Google",
      "en": "The Quotation Marks \"\" Search Trick"
    },
    "teaser": {
      "pt": "Como encontrar exatamente o que precisas em vez de milhões de resultados inúteis.",
      "en": "How to find exact phrases instead of millions of irrelevant pages."
    },
    "description": {
      "pt": "Se pesquisares no Google \"Rei D. Dinis\", o motor de busca procura páginas que tenham qualquer uma dessas palavras. Mas se colocares entre aspas: \"Rei D. Dinis\", o motor de busca é obrigado a encontrar exatamente essa expressão com as palavras nessa ordem precisa! Outro truque é o sinal de menos (ex: jaguares -carros) para excluir páginas indesejadas.",
      "en": "Enclosing search terms in quotes like \"Vasco da Gama\" forces the search engine to match that exact phrase in order."
    },
    "whyItMatters": {
      "pt": "Usar operadores de pesquisa poupa horas de trabalho na recolha de informação para os teus trabalhos escolares de TIC e História.",
      "en": "Search operators make academic research accurate and time-efficient."
    },
    "funFact": {
      "pt": "O Google processa mais de 8,5 mil milhões de pesquisas todos os dias, e cerca de 15% delas são perguntas que nunca ninguém tinha feito antes!",
      "en": "Google handles over 8.5 billion searches daily, and 15% are questions never asked before!"
    },
    "question": {
      "pt": "O que acontece quando colocas uma expressão entre aspas \"\" num motor de busca?",
      "en": "What happens when you enclose words in quotation marks \"\" in a search engine?"
    },
    "options": [
      {
        "id": "a",
        "pt": "O computador bloqueia a pesquisa",
        "en": "The computer halts the search"
      },
      {
        "id": "b",
        "pt": "O motor de busca procura apenas páginas que contenham a frase exata",
        "en": "It searches only for pages containing that exact phrase"
      },
      {
        "id": "c",
        "pt": "Os resultados aparecem todos em inglês",
        "en": "All results switch to English"
      },
      {
        "id": "d",
        "pt": "A pesquisa custa dinheiro",
        "en": "The search charges a fee"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "As aspas delimitam uma expressão exata, eliminando páginas que tenham as palavras soltas ou separadas.",
      "en": "Quotes search for the precise phrasing in the specified order."
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegação e Pesquisa Crítica",
      "en": "Internet Browsing & Critical Research"
    },
    "themeIcon": "🌐",
    "badgeColor": "purple"
  },
  {
    "week": 14,
    "title": {
      "pt": "O Que é Plágio Escolar e Como Evitá-lo",
      "en": "What is School Plagiarism and How to Avoid It"
    },
    "teaser": {
      "pt": "Copiar texto da Wikipédia sem dizer de onde veio é batota intelectual!",
      "en": "Copying Wikipedia without citation is academic dishonesty!"
    },
    "description": {
      "pt": "Plágio é o ato de copiar ideias, textos, imagens ou trabalhos de outra pessoa e apresentá-los como se fossem da tua própria autoria. Para evitar o plágio: 1) Lê a informação e escreve pelas tuas próprias palavras (parafrasear); 2) Se quiseres usar uma frase tal como está, coloca-a entre aspas e identifica o autor; 3) Cria sempre uma secção de \"Fontes/Webgrafia\" no final.",
      "en": "Plagiarism is copying someone elses work without attribution. Rephrase in your own words or use quotes with a source citation."
    },
    "whyItMatters": {
      "pt": "A honestidade académica desenvolve o teu pensamento crítico e a tua capacidade de aprender verdadeiramente.",
      "en": "Avoiding plagiarism trains your critical thinking and original voice."
    },
    "funFact": {
      "pt": "Os professores têm programas de computador especiais que conseguem detetar frases copiadas de qualquer página da internet em apenas 2 segundos!",
      "en": "Teachers use anti-plagiarism tools that can spot copied web sentences in just 2 seconds!"
    },
    "question": {
      "pt": "Como deves agir quando utilizas uma frase de um site num trabalho de TIC?",
      "en": "How should you treat a quote from a website in your ICT assignment?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Mudar a cor da letra para o professor não notar",
        "en": "Change font color so teacher does not notice"
      },
      {
        "id": "b",
        "pt": "Colocar a frase entre aspas e citar o autor e o site de onde foi retirada",
        "en": "Put the sentence in quotes and cite author and website"
      },
      {
        "id": "c",
        "pt": "Dizer que sonhaste com aquela frase ontem à noite",
        "en": "Claim you dreamed it last night"
      },
      {
        "id": "d",
        "pt": "Apagar o trabalho todo",
        "en": "Delete the entire project"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Citar entre aspas e referenciar a fonte na webgrafia demonstra rigor científico e respeito pelo autor original.",
      "en": "Quoting and citing references demonstrates academic integrity."
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "teal"
  },
  {
    "week": 15,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 15: A Memória RAM vs o Disco SSD",
      "en": "Week 15: RAM Memory vs SSD Storage"
    },
    "teaser": {
      "pt": "A secretária de trabalho temporária vs a estante de arquivo permanente.",
      "en": "Temporary workspace vs permanent filing cabinet."
    },
    "description": {
      "pt": "A memória RAM (Random Access Memory) é a memória de trabalho ultrarrápida do computador. Quando estás a usar um programa, ele fica na RAM. Mas quando desligas o computador, tudo o que está na RAM desaparece! Para guardar ficheiros de forma permanente (como fotos e documentos), usamos o disco SSD ou HDD.",
      "en": "RAM is fast temporary memory lost when powered down. SSD/HDD storage keeps files permanently."
    },
    "whyItMatters": {
      "pt": "Compreender a RAM explica porque deves sempre guardar (Ctrl+S) os teus trabalhos antes de fechar o computador!",
      "en": "Understanding RAM shows why you must always save your files."
    },
    "funFact": {
      "pt": "A sigla RAM significa \"Memória de Acesso Aleatório\", porque o processador consegue ler qualquer posição com a mesma velocidade instantânea!",
      "en": "RAM allows identical ultra-fast access speed to any byte regardless of location."
    },
    "question": {
      "pt": "O que acontece aos dados guardados na memória RAM quando desligas o computador?",
      "en": "What happens to RAM data on shutdown?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ficam gravados para sempre na nuvem",
        "en": "Saved permanently in the cloud"
      },
      {
        "id": "b",
        "pt": "Apagam-se completamente porque a RAM é uma memória volátil",
        "en": "They are erased because RAM is volatile"
      },
      {
        "id": "c",
        "pt": "São impressos numa folha de papel",
        "en": "Printed on paper"
      },
      {
        "id": "d",
        "pt": "Transformam-se num vírus",
        "en": "Turn into a virus"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A memória RAM necessita de corrente elétrica contínua. Sem eletricidade, os seus dados esvaziam-se de imediato.",
      "en": "RAM requires electric power; without power it clears instantly."
    }
  },
  {
    "week": 16,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 16: Periféricos de Entrada, Saída e Mistos",
      "en": "Week 16: Input, Output, and Hybrid Peripherals"
    },
    "teaser": {
      "pt": "Como a informação entra e sai da caixa do computador.",
      "en": "How data travels in and out of the computer."
    },
    "description": {
      "pt": "Periféricos de Entrada enviam informação para dentro do computador (teclado, rato, microfone, webcam). Periféricos de Saída recebem a informação processada e mostram-na ao utilizador (monitor, colunas de som, impressora). E há Periféricos Mistos que fazem as duas coisas, como os ecrãs táteis (touchscreens) e os auscultadores com microfone!",
      "en": "Input peripherals bring data in (mouse, mic); Output send data out (screen, speakers); Hybrid do both (touchscreen)."
    },
    "whyItMatters": {
      "pt": "Conhecer a tipologia dos periféricos permite-te configurar a tua estação de trabalho nas aulas de TIC.",
      "en": "Knowing peripherals helps you configure your workspace in ICT classes."
    },
    "funFact": {
      "pt": "O primeiro rato inventado por Douglas Engelbart em 1964 era feito de madeira e tinha duas rodas de metal por baixo!",
      "en": "The first mouse built in 1964 was carved from wood with two rolling metal wheels!"
    },
    "question": {
      "pt": "Qual dos seguintes dispositivos é um periférico de SAÍDA?",
      "en": "Which device is an OUTPUT peripheral?"
    },
    "options": [
      {
        "id": "a",
        "pt": "O microfone",
        "en": "Microphone"
      },
      {
        "id": "b",
        "pt": "O scanner de documentos",
        "en": "Document scanner"
      },
      {
        "id": "c",
        "pt": "As colunas de som",
        "en": "Audio speakers"
      },
      {
        "id": "d",
        "pt": "O teclado",
        "en": "Keyboard"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "As colunas de som transmitem o áudio de dentro do computador para o exterior, sendo um periférico de saída.",
      "en": "Speakers output sound generated by the computer."
    }
  },
  {
    "week": 17,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 17: A Altura Correta do Monitor e a Coluna Cervical",
      "en": "Week 17: Monitor Height and Neck Health"
    },
    "teaser": {
      "pt": "O topo do ecrã deve ficar exatamente ao nível dos teus olhos.",
      "en": "The top of the monitor should align with eye level."
    },
    "description": {
      "pt": "Quando o monitor está demasiado baixo, inclinas o pescoço para a frente durante horas, causando o chamado \"pescoço de texto\" (síndrome da cabeça descaída). A regra ergonómica recomenda que o topo do monitor fique exatamente na linha horizontal dos teus olhos, a uma distância de um braço esticado (cerca de 50 a 70 cm).",
      "en": "Keep the top edge of your monitor at eye level at an arm length distance to prevent neck pain."
    },
    "whyItMatters": {
      "pt": "Evita dores crónicas de cabeça e pescoço causadas por posturas incorretas em frente ao computador.",
      "en": "Prevents chronic headaches and neck strain during computer use."
    },
    "funFact": {
      "pt": "A cabeça humana de uma criança de 10 anos pesa cerca de 4 a 5 kg. Mas inclinada a 45 graus, o esforço no pescoço equivale a 22 kg!",
      "en": "Tilting your neck 45 degrees increases neck load to 22 kg!"
    },
    "question": {
      "pt": "Onde deve ficar o topo do monitor do computador segundo a ergonomia?",
      "en": "Where should the top of your monitor be?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ao nível dos teus olhos para não inclinares a cabeça",
        "en": "At eye level so you do not bend your neck"
      },
      {
        "id": "b",
        "pt": "No chão encostado aos pés",
        "en": "On the floor by your feet"
      },
      {
        "id": "c",
        "pt": "Tão alto que tenhas de olhar para o teto",
        "en": "Near the ceiling"
      },
      {
        "id": "d",
        "pt": "Colado diretamente ao teu nariz",
        "en": "Touching your nose"
      }
    ],
    "correctOptionId": "a",
    "explanation": {
      "pt": "O topo do ecrã ao nível dos olhos mantém o pescoço reto e a postura da coluna equilibrada.",
      "en": "Aligning top of screen with eyes keeps the cervical spine aligned."
    }
  },
  {
    "week": 18,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 18: O Volume dos Auscultadores e a Audição",
      "en": "Week 18: Headphone Volume and Hearing Safety"
    },
    "teaser": {
      "pt": "A regra dos 60/60 para não danificares os teus ouvidos para sempre.",
      "en": "The 60/60 rule to prevent irreversible hearing loss."
    },
    "description": {
      "pt": "Ouvir música ou jogos em auscultadores com o volume no máximo pode destruir permanentemente as células ciliadas do ouvido interno. Os médicos recomendam a regra dos 60/60: nunca exceder 60% do volume máximo do dispositivo e não usar auscultadores por mais de 60 minutos seguidos sem uma pausa de descanso.",
      "en": "Follow the 60/60 rule: keep volume under 60% and limit sessions to 60 minutes before taking a break."
    },
    "whyItMatters": {
      "pt": "As lesões auditivas causadas pelo ruído excessivo são irreversíveis. Proteger os teus ouvidos agora garante boa audição para toda a vida.",
      "en": "Hearing loss from loud volumes cannot be reversed; prevention is key."
    },
    "funFact": {
      "pt": "Se a pessoa sentada ao teu lado consegue ouvir o som dos teus auscultadores, significa que o volume está perigosamente alto!",
      "en": "If someone next to you hears your headphones, the volume is dangerously high!"
    },
    "question": {
      "pt": "Qual é a recomendação da regra dos 60/60 ao utilizar auscultadores?",
      "en": "What does the 60/60 rule advise for headphones?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Usar 60 auscultadores ao mesmo tempo",
        "en": "Wear 60 headphones at once"
      },
      {
        "id": "b",
        "pt": "Máximo de 60% do volume e pausas a cada 60 minutos",
        "en": "Max 60% volume and take a break every 60 minutes"
      },
      {
        "id": "c",
        "pt": "Ouvir 60 músicas seguidas sem parar",
        "en": "Listen to 60 songs without stopping"
      },
      {
        "id": "d",
        "pt": "Comprar auscultadores de 60 euros",
        "en": "Buy 60 euro headphones"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A regra 60/60 estabelece limite de 60% no som e descanso ao fim de 60 minutos de utilização contínua.",
      "en": "60/60 limits volume to 60% and duration to 60 minutes."
    }
  },
  {
    "week": 19,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 19: Cuidado com os Dados Pessoais em Jogos Online",
      "en": "Week 19: Personal Data in Online Gaming"
    },
    "teaser": {
      "pt": "Nunca reveles a tua morada, escola ou idade real a desconhecidos nos chats de jogos.",
      "en": "Never disclose real address, school, or age in online game chats."
    },
    "description": {
      "pt": "Jogar online com outras pessoas é muito divertido, mas os chats de jogos (Roblox, Minecraft, Fortnite, Discord) estão cheios de estranhos. Nunca partilhes o teu nome completo, idade, número de telemóvel, fotografia da tua cara ou o nome da tua escola. Se alguém insistir para falar contigo em privado ou pedir fotos, bloqueia e avisa um adulto.",
      "en": "Gaming chats are public spaces. Keep your full name, location, school, and face private. Report any suspicious requests."
    },
    "whyItMatters": {
      "pt": "Manter a tua privacidade online protege-te contra burlas, chantagens e pessoas mal-intencionadas.",
      "en": "Guarding personal data shields you from scams and predators."
    },
    "funFact": {
      "pt": "Criar um \"Nickname\" (pseudónimo criativo) que não use o teu nome verdadeiro é a melhor forma de te divertires mantendo o anonimato seguro!",
      "en": "Using a creative gaming nickname instead of your real name keeps you safely anonymous!"
    },
    "question": {
      "pt": "Que informação podes partilhar com segurança num chat público de um jogo online?",
      "en": "What can you safely share in a public game chat?"
    },
    "options": [
      {
        "id": "a",
        "pt": "A morada da tua casa e o número da porta",
        "en": "Your home address"
      },
      {
        "id": "b",
        "pt": "O nome da tua escola e a tua turma",
        "en": "Your school name and class"
      },
      {
        "id": "c",
        "pt": "Apenas dicas e estratégias sobre o jogo com o teu Nickname",
        "en": "Game strategies using your nickname"
      },
      {
        "id": "d",
        "pt": "O número de telefone dos teus pais",
        "en": "Your parents phone number"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "Apenas deves partilhar conteúdos relacionados com o jogo, mantendo todos os dados da tua vida real confidenciais.",
      "en": "Only share gameplay tips; never personal real-world information."
    }
  },
  {
    "week": 20,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 20: O Perigo da Geolocalização e Fotos EXIF",
      "en": "Week 20: Geolocation Risks in Photos"
    },
    "teaser": {
      "pt": "As fotografias que tiras com o telemóvel guardam as coordenadas GPS exatas de onde estás!",
      "en": "Smartphone photos often store exact GPS coordinates inside the file!"
    },
    "description": {
      "pt": "Quando tiras uma fotografia com o telemóvel com a localização ativada, o ficheiro guarda dados escondidos chamados \"Metadados EXIF\". Estes dados incluem o modelo do aparelho, a hora e até as coordenadas de GPS exatas de onde estavas (por exemplo, dentro do teu quarto ou na porta da tua escola). Desativa a geolocalização da câmara para proteger a tua privacidade!",
      "en": "EXIF metadata in photos can store exact GPS coordinates. Turn off camera geolocation before sharing pictures."
    },
    "whyItMatters": {
      "pt": "Evita que estranhos saibam onde vives ou onde passas os teus dias através de fotos que publicas nas redes.",
      "en": "Prevents strangers from locating your home or school through shared photos."
    },
    "funFact": {
      "pt": "Muitos gatos famosos na internet foram localizados por fãs curiosos que leram os metadados das fotos tiradas pelos seus donos!",
      "en": "Famous internet pets have had their homes located by fans reading EXIF data on photos!"
    },
    "question": {
      "pt": "O que são os metadados EXIF guardados numa fotografia digital?",
      "en": "What are EXIF metadata in photos?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Um filtro de beleza que muda as cores",
        "en": "A beauty filter"
      },
      {
        "id": "b",
        "pt": "Informações ocultas sobre a câmara, data e até as coordenadas GPS de onde a foto foi tirada",
        "en": "Hidden info about camera, time, and GPS coordinates"
      },
      {
        "id": "c",
        "pt": "Uma música de fundo",
        "en": "Background music"
      },
      {
        "id": "d",
        "pt": "Um jogo secreto",
        "en": "A secret game"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Os dados EXIF contêm detalhes técnicos e geográficos da fotografia, revelando onde e quando foi captada.",
      "en": "EXIF data records device parameters and GPS location."
    }
  },
  {
    "week": 21,
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe e Autenticação",
      "en": "Passwords & Authentication"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "title": {
      "pt": "Semana 21: Autenticação de Dois Fatores (2FA): O Guarda-costas Digital",
      "en": "Week 21: Two-Factor Authentication (2FA)"
    },
    "teaser": {
      "pt": "Mesmo que descubram a tua senha, não conseguem entrar sem o segundo código.",
      "en": "Even if hackers guess your password, they cannot log in without the second code."
    },
    "description": {
      "pt": "A Autenticação de Dois Fatores (2FA) adiciona uma segunda camada de proteção à tua conta. Para entrar, precisas de: 1) Algo que sabes (a tua palavra-passe); 2) Algo que tens (um código de 6 dígitos enviado para o telemóvel ou gerado numa aplicação). Assim, mesmo que um pirata descubra a tua senha, fica impedido de entrar!",
      "en": "2FA requires two things: something you know (password) and something you have (phone code)."
    },
    "whyItMatters": {
      "pt": "Ativar a 2FA nas contas escolares e de jogos bloqueia 99% dos ataques informáticos automáticos.",
      "en": "Enabling 2FA blocks 99% of automated account takeovers."
    },
    "funFact": {
      "pt": "A 2FA é usada pelos bancos e exércitos mundiais há décadas, e hoje está disponível gratuitamente para qualquer aluno!",
      "en": "Banks and security agencies have relied on 2FA for decades to secure high-value systems."
    },
    "question": {
      "pt": "Porque é que a Autenticação de Dois Fatores (2FA) é tão recomendada?",
      "en": "Why is Two-Factor Authentication strongly recommended?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Porque obriga a comprar um computador novo",
        "en": "It forces buying a new computer"
      },
      {
        "id": "b",
        "pt": "Porque impede o acesso mesmo que alguém descubra a tua palavra-passe",
        "en": "It prevents access even if someone steals your password"
      },
      {
        "id": "c",
        "pt": "Porque apaga a tua conta todos os dias",
        "en": "It deletes your account daily"
      },
      {
        "id": "d",
        "pt": "Porque faz a internet ficar mais lenta",
        "en": "It slows down internet"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Sem o segundo fator de confirmação, ninguém consegue aceder à tua conta, tornando o roubo de senhas inútil.",
      "en": "Without the second code, stolen passwords cannot be used to break in."
    }
  },
  {
    "week": 22,
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email Communication"
    },
    "themeIcon": "📧",
    "badgeColor": "sky",
    "title": {
      "pt": "Semana 22: Como Detetar um Email de Phishing (Pescador de Dados)",
      "en": "Week 22: How to Spot a Phishing Email"
    },
    "teaser": {
      "pt": "Emails com ofertas milagrosas ou ameaças de bloqueio urgente são quase sempre armadilhas.",
      "en": "Emails offering free gifts or urgent threats are almost always traps."
    },
    "description": {
      "pt": "Phishing é uma técnica de burla em que criminosos enviam emails falsos fingindo ser marcas conhecidas (como Google, Roblox, PlayStation ou bancos). Usam truques como criar urgência (\"A tua conta vai ser apagada em 2 horas!\") ou prometer prémios (\"Ganhaste um iPhone grátis!\"). Verifica sempre o endereço real de quem enviou e nunca cliques em links suspeitos!",
      "en": "Phishing mimics trusted companies to steal credentials through fake urgency or prize promises. Always verify sender address."
    },
    "whyItMatters": {
      "pt": "O phishing é a porta de entrada para 90% dos vírus e roubos de contas no mundo digital.",
      "en": "Phishing is the root vector for 90% of cyber attacks and credential thefts."
    },
    "funFact": {
      "pt": "A palavra \"Phishing\" escreve-se com \"Ph\" em homenagem aos primeiros piratas telefónicos dos anos 70, conhecidos como \"Phreaks\"!",
      "en": "The word phishing honors early phone hackers from the 1970s known as phreaks!"
    },
    "question": {
      "pt": "Qual dos seguintes sinais indica que um email é provavelmente uma tentativa de PHISHING?",
      "en": "Which sign indicates a likely phishing email?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Vem de um colega da turma com o assunto da aula de TIC",
        "en": "From a classmate about ICT homework"
      },
      {
        "id": "b",
        "pt": "Pede com urgência que cliques num link para não perderes a conta ou promete prémios fabulosos",
        "en": "Urges clicking a link or promises free gifts"
      },
      {
        "id": "c",
        "pt": "Tem o logotipo da escola e fala da reunião de pais",
        "en": "School logo about parents meeting"
      },
      {
        "id": "d",
        "pt": "Não tem anexos nem links nenhuns",
        "en": "No links or attachments"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Urgência extrema e promessas inacreditáveis são as marcas registadas dos ataques de phishing para te enganar.",
      "en": "Manufactured panic and unbelievable offers are hallmarks of phishing."
    }
  },
  {
    "week": 23,
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegação e Pesquisa Crítica",
      "en": "Internet Browsing & Critical Research"
    },
    "themeIcon": "🌐",
    "badgeColor": "purple",
    "title": {
      "pt": "Semana 23: O Cadeado e o Protocolo HTTPS Seguro",
      "en": "Week 23: The Padlock and HTTPS Security"
    },
    "teaser": {
      "pt": "Porque deves verificar se o endereço do site começa por \"https://\" antes de escrever dados.",
      "en": "Why you must verify https:// before typing any sensitive information."
    },
    "description": {
      "pt": "Quando visitas um site seguro, o seu endereço começa por \"https://\" e o navegador exibe um pequeno cadeado. O \"S\" no final significa \"Seguro\" (SSL/TLS). Isto garante que toda a informação trocada entre o teu computador e o site viaja encriptada (em código secreto), impedindo que espiões na mesma rede Wi-Fi leiam o que estás a escrever.",
      "en": "HTTPS encrypts data between your browser and the website, preventing Wi-Fi snoopers from reading your input."
    },
    "whyItMatters": {
      "pt": "Nunca deves colocar palavras-passe ou dados pessoais em sites que usem apenas \"http://\" sem o \"S\" de segurança.",
      "en": "Never submit passwords on plain HTTP pages without encryption."
    },
    "funFact": {
      "pt": "A encriptação usada no HTTPS moderno é tão forte que nem o supercomputador mais rápido do mundo conseguiria quebrá-la num milhão de anos!",
      "en": "Modern HTTPS encryption would take supercomputers millions of years to crack by brute force!"
    },
    "question": {
      "pt": "O que significa a letra \"S\" no início do endereço \"https://\"?",
      "en": "What does the \"S\" stand for in \"https://\"?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Super-rápido",
        "en": "Super-fast"
      },
      {
        "id": "b",
        "pt": "Seguro (a comunicação é encriptada)",
        "en": "Secure (encrypted traffic)"
      },
      {
        "id": "c",
        "pt": "Sem imagens",
        "en": "No pictures"
      },
      {
        "id": "d",
        "pt": "Site escolar",
        "en": "School site"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A letra \"S\" significa \"Secure\", indicando que a ligação está protegida por um certificado digital de cifra.",
      "en": "S means Secure, confirming data is encrypted in transit."
    }
  },
  {
    "week": 24,
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "teal",
    "title": {
      "pt": "Semana 24: O Que São as Licenças Creative Commons (CC)?",
      "en": "Week 24: What are Creative Commons (CC) Licenses?"
    },
    "teaser": {
      "pt": "A forma moderna como os autores autorizam a partilha legal dos seus trabalhos.",
      "en": "How creators grant legal permission to share and reuse their work."
    },
    "description": {
      "pt": "O símbolo \"CC\" (Creative Commons) indica que o autor permite que outras pessoas usem a sua obra gratuitamente, desde que cumpram certas condições. A condição mais comum é a \"Atribuição\" (BY): podes usar a imagem, música ou texto, desde que menciones o nome do autor original e coloques o link para a sua página.",
      "en": "Creative Commons licenses let creators specify how their work can be legally used, usually requiring author attribution (BY)."
    },
    "whyItMatters": {
      "pt": "Saber identificar símbolos Creative Commons permite-te enriquecer os teus trabalhos escolares de TIC com recursos legais e de qualidade.",
      "en": "CC licenses empower students to legally source multimedia for projects."
    },
    "funFact": {
      "pt": "A Wikipédia inteira está licenciada sob Creative Commons, o que permite a milhões de estudantes consultar e aprender livremente todos os dias!",
      "en": "All of Wikipedia is licensed under Creative Commons, enabling free knowledge sharing!"
    },
    "question": {
      "pt": "O que deves fazer quando usas uma fotografia com licença Creative Commons \"BY\" num trabalho?",
      "en": "What must you do when using a Creative Commons \"BY\" photo?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Pagar 50 euros ao autor",
        "en": "Pay 50 euros"
      },
      {
        "id": "b",
        "pt": "Dar os créditos e indicar o nome do autor da fotografia",
        "en": "Give credit and mention the authors name"
      },
      {
        "id": "c",
        "pt": "Apagar a foto do computador",
        "en": "Delete photo"
      },
      {
        "id": "d",
        "pt": "Não podes usar de maneira nenhuma",
        "en": "You cannot use it at all"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A condição \"BY\" (Atribuição) obriga apenas a dar o devido crédito ao autor original da obra.",
      "en": "BY means Attribution: you must credit the creator."
    }
  },
  {
    "week": 25,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 25: A Memória RAM vs o Disco SSD",
      "en": "Week 25: RAM Memory vs SSD Storage"
    },
    "teaser": {
      "pt": "A secretária de trabalho temporária vs a estante de arquivo permanente.",
      "en": "Temporary workspace vs permanent filing cabinet."
    },
    "description": {
      "pt": "A memória RAM (Random Access Memory) é a memória de trabalho ultrarrápida do computador. Quando estás a usar um programa, ele fica na RAM. Mas quando desligas o computador, tudo o que está na RAM desaparece! Para guardar ficheiros de forma permanente (como fotos e documentos), usamos o disco SSD ou HDD.",
      "en": "RAM is fast temporary memory lost when powered down. SSD/HDD storage keeps files permanently."
    },
    "whyItMatters": {
      "pt": "Compreender a RAM explica porque deves sempre guardar (Ctrl+S) os teus trabalhos antes de fechar o computador!",
      "en": "Understanding RAM shows why you must always save your files."
    },
    "funFact": {
      "pt": "A sigla RAM significa \"Memória de Acesso Aleatório\", porque o processador consegue ler qualquer posição com a mesma velocidade instantânea!",
      "en": "RAM allows identical ultra-fast access speed to any byte regardless of location."
    },
    "question": {
      "pt": "O que acontece aos dados guardados na memória RAM quando desligas o computador?",
      "en": "What happens to RAM data on shutdown?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ficam gravados para sempre na nuvem",
        "en": "Saved permanently in the cloud"
      },
      {
        "id": "b",
        "pt": "Apagam-se completamente porque a RAM é uma memória volátil",
        "en": "They are erased because RAM is volatile"
      },
      {
        "id": "c",
        "pt": "São impressos numa folha de papel",
        "en": "Printed on paper"
      },
      {
        "id": "d",
        "pt": "Transformam-se num vírus",
        "en": "Turn into a virus"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A memória RAM necessita de corrente elétrica contínua. Sem eletricidade, os seus dados esvaziam-se de imediato.",
      "en": "RAM requires electric power; without power it clears instantly."
    }
  },
  {
    "week": 26,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 26: Periféricos de Entrada, Saída e Mistos",
      "en": "Week 26: Input, Output, and Hybrid Peripherals"
    },
    "teaser": {
      "pt": "Como a informação entra e sai da caixa do computador.",
      "en": "How data travels in and out of the computer."
    },
    "description": {
      "pt": "Periféricos de Entrada enviam informação para dentro do computador (teclado, rato, microfone, webcam). Periféricos de Saída recebem a informação processada e mostram-na ao utilizador (monitor, colunas de som, impressora). E há Periféricos Mistos que fazem as duas coisas, como os ecrãs táteis (touchscreens) e os auscultadores com microfone!",
      "en": "Input peripherals bring data in (mouse, mic); Output send data out (screen, speakers); Hybrid do both (touchscreen)."
    },
    "whyItMatters": {
      "pt": "Conhecer a tipologia dos periféricos permite-te configurar a tua estação de trabalho nas aulas de TIC.",
      "en": "Knowing peripherals helps you configure your workspace in ICT classes."
    },
    "funFact": {
      "pt": "O primeiro rato inventado por Douglas Engelbart em 1964 era feito de madeira e tinha duas rodas de metal por baixo!",
      "en": "The first mouse built in 1964 was carved from wood with two rolling metal wheels!"
    },
    "question": {
      "pt": "Qual dos seguintes dispositivos é um periférico de SAÍDA?",
      "en": "Which device is an OUTPUT peripheral?"
    },
    "options": [
      {
        "id": "a",
        "pt": "O microfone",
        "en": "Microphone"
      },
      {
        "id": "b",
        "pt": "O scanner de documentos",
        "en": "Document scanner"
      },
      {
        "id": "c",
        "pt": "As colunas de som",
        "en": "Audio speakers"
      },
      {
        "id": "d",
        "pt": "O teclado",
        "en": "Keyboard"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "As colunas de som transmitem o áudio de dentro do computador para o exterior, sendo um periférico de saída.",
      "en": "Speakers output sound generated by the computer."
    }
  },
  {
    "week": 27,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 27: A Altura Correta do Monitor e a Coluna Cervical",
      "en": "Week 27: Monitor Height and Neck Health"
    },
    "teaser": {
      "pt": "O topo do ecrã deve ficar exatamente ao nível dos teus olhos.",
      "en": "The top of the monitor should align with eye level."
    },
    "description": {
      "pt": "Quando o monitor está demasiado baixo, inclinas o pescoço para a frente durante horas, causando o chamado \"pescoço de texto\" (síndrome da cabeça descaída). A regra ergonómica recomenda que o topo do monitor fique exatamente na linha horizontal dos teus olhos, a uma distância de um braço esticado (cerca de 50 a 70 cm).",
      "en": "Keep the top edge of your monitor at eye level at an arm length distance to prevent neck pain."
    },
    "whyItMatters": {
      "pt": "Evita dores crónicas de cabeça e pescoço causadas por posturas incorretas em frente ao computador.",
      "en": "Prevents chronic headaches and neck strain during computer use."
    },
    "funFact": {
      "pt": "A cabeça humana de uma criança de 10 anos pesa cerca de 4 a 5 kg. Mas inclinada a 45 graus, o esforço no pescoço equivale a 22 kg!",
      "en": "Tilting your neck 45 degrees increases neck load to 22 kg!"
    },
    "question": {
      "pt": "Onde deve ficar o topo do monitor do computador segundo a ergonomia?",
      "en": "Where should the top of your monitor be?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ao nível dos teus olhos para não inclinares a cabeça",
        "en": "At eye level so you do not bend your neck"
      },
      {
        "id": "b",
        "pt": "No chão encostado aos pés",
        "en": "On the floor by your feet"
      },
      {
        "id": "c",
        "pt": "Tão alto que tenhas de olhar para o teto",
        "en": "Near the ceiling"
      },
      {
        "id": "d",
        "pt": "Colado diretamente ao teu nariz",
        "en": "Touching your nose"
      }
    ],
    "correctOptionId": "a",
    "explanation": {
      "pt": "O topo do ecrã ao nível dos olhos mantém o pescoço reto e a postura da coluna equilibrada.",
      "en": "Aligning top of screen with eyes keeps the cervical spine aligned."
    }
  },
  {
    "week": 28,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 28: O Volume dos Auscultadores e a Audição",
      "en": "Week 28: Headphone Volume and Hearing Safety"
    },
    "teaser": {
      "pt": "A regra dos 60/60 para não danificares os teus ouvidos para sempre.",
      "en": "The 60/60 rule to prevent irreversible hearing loss."
    },
    "description": {
      "pt": "Ouvir música ou jogos em auscultadores com o volume no máximo pode destruir permanentemente as células ciliadas do ouvido interno. Os médicos recomendam a regra dos 60/60: nunca exceder 60% do volume máximo do dispositivo e não usar auscultadores por mais de 60 minutos seguidos sem uma pausa de descanso.",
      "en": "Follow the 60/60 rule: keep volume under 60% and limit sessions to 60 minutes before taking a break."
    },
    "whyItMatters": {
      "pt": "As lesões auditivas causadas pelo ruído excessivo são irreversíveis. Proteger os teus ouvidos agora garante boa audição para toda a vida.",
      "en": "Hearing loss from loud volumes cannot be reversed; prevention is key."
    },
    "funFact": {
      "pt": "Se a pessoa sentada ao teu lado consegue ouvir o som dos teus auscultadores, significa que o volume está perigosamente alto!",
      "en": "If someone next to you hears your headphones, the volume is dangerously high!"
    },
    "question": {
      "pt": "Qual é a recomendação da regra dos 60/60 ao utilizar auscultadores?",
      "en": "What does the 60/60 rule advise for headphones?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Usar 60 auscultadores ao mesmo tempo",
        "en": "Wear 60 headphones at once"
      },
      {
        "id": "b",
        "pt": "Máximo de 60% do volume e pausas a cada 60 minutos",
        "en": "Max 60% volume and take a break every 60 minutes"
      },
      {
        "id": "c",
        "pt": "Ouvir 60 músicas seguidas sem parar",
        "en": "Listen to 60 songs without stopping"
      },
      {
        "id": "d",
        "pt": "Comprar auscultadores de 60 euros",
        "en": "Buy 60 euro headphones"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A regra 60/60 estabelece limite de 60% no som e descanso ao fim de 60 minutos de utilização contínua.",
      "en": "60/60 limits volume to 60% and duration to 60 minutes."
    }
  },
  {
    "week": 29,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 29: Cuidado com os Dados Pessoais em Jogos Online",
      "en": "Week 29: Personal Data in Online Gaming"
    },
    "teaser": {
      "pt": "Nunca reveles a tua morada, escola ou idade real a desconhecidos nos chats de jogos.",
      "en": "Never disclose real address, school, or age in online game chats."
    },
    "description": {
      "pt": "Jogar online com outras pessoas é muito divertido, mas os chats de jogos (Roblox, Minecraft, Fortnite, Discord) estão cheios de estranhos. Nunca partilhes o teu nome completo, idade, número de telemóvel, fotografia da tua cara ou o nome da tua escola. Se alguém insistir para falar contigo em privado ou pedir fotos, bloqueia e avisa um adulto.",
      "en": "Gaming chats are public spaces. Keep your full name, location, school, and face private. Report any suspicious requests."
    },
    "whyItMatters": {
      "pt": "Manter a tua privacidade online protege-te contra burlas, chantagens e pessoas mal-intencionadas.",
      "en": "Guarding personal data shields you from scams and predators."
    },
    "funFact": {
      "pt": "Criar um \"Nickname\" (pseudónimo criativo) que não use o teu nome verdadeiro é a melhor forma de te divertires mantendo o anonimato seguro!",
      "en": "Using a creative gaming nickname instead of your real name keeps you safely anonymous!"
    },
    "question": {
      "pt": "Que informação podes partilhar com segurança num chat público de um jogo online?",
      "en": "What can you safely share in a public game chat?"
    },
    "options": [
      {
        "id": "a",
        "pt": "A morada da tua casa e o número da porta",
        "en": "Your home address"
      },
      {
        "id": "b",
        "pt": "O nome da tua escola e a tua turma",
        "en": "Your school name and class"
      },
      {
        "id": "c",
        "pt": "Apenas dicas e estratégias sobre o jogo com o teu Nickname",
        "en": "Game strategies using your nickname"
      },
      {
        "id": "d",
        "pt": "O número de telefone dos teus pais",
        "en": "Your parents phone number"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "Apenas deves partilhar conteúdos relacionados com o jogo, mantendo todos os dados da tua vida real confidenciais.",
      "en": "Only share gameplay tips; never personal real-world information."
    }
  },
  {
    "week": 30,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 30: O Perigo da Geolocalização e Fotos EXIF",
      "en": "Week 30: Geolocation Risks in Photos"
    },
    "teaser": {
      "pt": "As fotografias que tiras com o telemóvel guardam as coordenadas GPS exatas de onde estás!",
      "en": "Smartphone photos often store exact GPS coordinates inside the file!"
    },
    "description": {
      "pt": "Quando tiras uma fotografia com o telemóvel com a localização ativada, o ficheiro guarda dados escondidos chamados \"Metadados EXIF\". Estes dados incluem o modelo do aparelho, a hora e até as coordenadas de GPS exatas de onde estavas (por exemplo, dentro do teu quarto ou na porta da tua escola). Desativa a geolocalização da câmara para proteger a tua privacidade!",
      "en": "EXIF metadata in photos can store exact GPS coordinates. Turn off camera geolocation before sharing pictures."
    },
    "whyItMatters": {
      "pt": "Evita que estranhos saibam onde vives ou onde passas os teus dias através de fotos que publicas nas redes.",
      "en": "Prevents strangers from locating your home or school through shared photos."
    },
    "funFact": {
      "pt": "Muitos gatos famosos na internet foram localizados por fãs curiosos que leram os metadados das fotos tiradas pelos seus donos!",
      "en": "Famous internet pets have had their homes located by fans reading EXIF data on photos!"
    },
    "question": {
      "pt": "O que são os metadados EXIF guardados numa fotografia digital?",
      "en": "What are EXIF metadata in photos?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Um filtro de beleza que muda as cores",
        "en": "A beauty filter"
      },
      {
        "id": "b",
        "pt": "Informações ocultas sobre a câmara, data e até as coordenadas GPS de onde a foto foi tirada",
        "en": "Hidden info about camera, time, and GPS coordinates"
      },
      {
        "id": "c",
        "pt": "Uma música de fundo",
        "en": "Background music"
      },
      {
        "id": "d",
        "pt": "Um jogo secreto",
        "en": "A secret game"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Os dados EXIF contêm detalhes técnicos e geográficos da fotografia, revelando onde e quando foi captada.",
      "en": "EXIF data records device parameters and GPS location."
    }
  },
  {
    "week": 31,
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe e Autenticação",
      "en": "Passwords & Authentication"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "title": {
      "pt": "Semana 31: Autenticação de Dois Fatores (2FA): O Guarda-costas Digital",
      "en": "Week 31: Two-Factor Authentication (2FA)"
    },
    "teaser": {
      "pt": "Mesmo que descubram a tua senha, não conseguem entrar sem o segundo código.",
      "en": "Even if hackers guess your password, they cannot log in without the second code."
    },
    "description": {
      "pt": "A Autenticação de Dois Fatores (2FA) adiciona uma segunda camada de proteção à tua conta. Para entrar, precisas de: 1) Algo que sabes (a tua palavra-passe); 2) Algo que tens (um código de 6 dígitos enviado para o telemóvel ou gerado numa aplicação). Assim, mesmo que um pirata descubra a tua senha, fica impedido de entrar!",
      "en": "2FA requires two things: something you know (password) and something you have (phone code)."
    },
    "whyItMatters": {
      "pt": "Ativar a 2FA nas contas escolares e de jogos bloqueia 99% dos ataques informáticos automáticos.",
      "en": "Enabling 2FA blocks 99% of automated account takeovers."
    },
    "funFact": {
      "pt": "A 2FA é usada pelos bancos e exércitos mundiais há décadas, e hoje está disponível gratuitamente para qualquer aluno!",
      "en": "Banks and security agencies have relied on 2FA for decades to secure high-value systems."
    },
    "question": {
      "pt": "Porque é que a Autenticação de Dois Fatores (2FA) é tão recomendada?",
      "en": "Why is Two-Factor Authentication strongly recommended?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Porque obriga a comprar um computador novo",
        "en": "It forces buying a new computer"
      },
      {
        "id": "b",
        "pt": "Porque impede o acesso mesmo que alguém descubra a tua palavra-passe",
        "en": "It prevents access even if someone steals your password"
      },
      {
        "id": "c",
        "pt": "Porque apaga a tua conta todos os dias",
        "en": "It deletes your account daily"
      },
      {
        "id": "d",
        "pt": "Porque faz a internet ficar mais lenta",
        "en": "It slows down internet"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Sem o segundo fator de confirmação, ninguém consegue aceder à tua conta, tornando o roubo de senhas inútil.",
      "en": "Without the second code, stolen passwords cannot be used to break in."
    }
  },
  {
    "week": 32,
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email Communication"
    },
    "themeIcon": "📧",
    "badgeColor": "sky",
    "title": {
      "pt": "Semana 32: Como Detetar um Email de Phishing (Pescador de Dados)",
      "en": "Week 32: How to Spot a Phishing Email"
    },
    "teaser": {
      "pt": "Emails com ofertas milagrosas ou ameaças de bloqueio urgente são quase sempre armadilhas.",
      "en": "Emails offering free gifts or urgent threats are almost always traps."
    },
    "description": {
      "pt": "Phishing é uma técnica de burla em que criminosos enviam emails falsos fingindo ser marcas conhecidas (como Google, Roblox, PlayStation ou bancos). Usam truques como criar urgência (\"A tua conta vai ser apagada em 2 horas!\") ou prometer prémios (\"Ganhaste um iPhone grátis!\"). Verifica sempre o endereço real de quem enviou e nunca cliques em links suspeitos!",
      "en": "Phishing mimics trusted companies to steal credentials through fake urgency or prize promises. Always verify sender address."
    },
    "whyItMatters": {
      "pt": "O phishing é a porta de entrada para 90% dos vírus e roubos de contas no mundo digital.",
      "en": "Phishing is the root vector for 90% of cyber attacks and credential thefts."
    },
    "funFact": {
      "pt": "A palavra \"Phishing\" escreve-se com \"Ph\" em homenagem aos primeiros piratas telefónicos dos anos 70, conhecidos como \"Phreaks\"!",
      "en": "The word phishing honors early phone hackers from the 1970s known as phreaks!"
    },
    "question": {
      "pt": "Qual dos seguintes sinais indica que um email é provavelmente uma tentativa de PHISHING?",
      "en": "Which sign indicates a likely phishing email?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Vem de um colega da turma com o assunto da aula de TIC",
        "en": "From a classmate about ICT homework"
      },
      {
        "id": "b",
        "pt": "Pede com urgência que cliques num link para não perderes a conta ou promete prémios fabulosos",
        "en": "Urges clicking a link or promises free gifts"
      },
      {
        "id": "c",
        "pt": "Tem o logotipo da escola e fala da reunião de pais",
        "en": "School logo about parents meeting"
      },
      {
        "id": "d",
        "pt": "Não tem anexos nem links nenhuns",
        "en": "No links or attachments"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Urgência extrema e promessas inacreditáveis são as marcas registadas dos ataques de phishing para te enganar.",
      "en": "Manufactured panic and unbelievable offers are hallmarks of phishing."
    }
  },
  {
    "week": 33,
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegação e Pesquisa Crítica",
      "en": "Internet Browsing & Critical Research"
    },
    "themeIcon": "🌐",
    "badgeColor": "purple",
    "title": {
      "pt": "Semana 33: O Cadeado e o Protocolo HTTPS Seguro",
      "en": "Week 33: The Padlock and HTTPS Security"
    },
    "teaser": {
      "pt": "Porque deves verificar se o endereço do site começa por \"https://\" antes de escrever dados.",
      "en": "Why you must verify https:// before typing any sensitive information."
    },
    "description": {
      "pt": "Quando visitas um site seguro, o seu endereço começa por \"https://\" e o navegador exibe um pequeno cadeado. O \"S\" no final significa \"Seguro\" (SSL/TLS). Isto garante que toda a informação trocada entre o teu computador e o site viaja encriptada (em código secreto), impedindo que espiões na mesma rede Wi-Fi leiam o que estás a escrever.",
      "en": "HTTPS encrypts data between your browser and the website, preventing Wi-Fi snoopers from reading your input."
    },
    "whyItMatters": {
      "pt": "Nunca deves colocar palavras-passe ou dados pessoais em sites que usem apenas \"http://\" sem o \"S\" de segurança.",
      "en": "Never submit passwords on plain HTTP pages without encryption."
    },
    "funFact": {
      "pt": "A encriptação usada no HTTPS moderno é tão forte que nem o supercomputador mais rápido do mundo conseguiria quebrá-la num milhão de anos!",
      "en": "Modern HTTPS encryption would take supercomputers millions of years to crack by brute force!"
    },
    "question": {
      "pt": "O que significa a letra \"S\" no início do endereço \"https://\"?",
      "en": "What does the \"S\" stand for in \"https://\"?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Super-rápido",
        "en": "Super-fast"
      },
      {
        "id": "b",
        "pt": "Seguro (a comunicação é encriptada)",
        "en": "Secure (encrypted traffic)"
      },
      {
        "id": "c",
        "pt": "Sem imagens",
        "en": "No pictures"
      },
      {
        "id": "d",
        "pt": "Site escolar",
        "en": "School site"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A letra \"S\" significa \"Secure\", indicando que a ligação está protegida por um certificado digital de cifra.",
      "en": "S means Secure, confirming data is encrypted in transit."
    }
  },
  {
    "week": 34,
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "teal",
    "title": {
      "pt": "Semana 34: O Que São as Licenças Creative Commons (CC)?",
      "en": "Week 34: What are Creative Commons (CC) Licenses?"
    },
    "teaser": {
      "pt": "A forma moderna como os autores autorizam a partilha legal dos seus trabalhos.",
      "en": "How creators grant legal permission to share and reuse their work."
    },
    "description": {
      "pt": "O símbolo \"CC\" (Creative Commons) indica que o autor permite que outras pessoas usem a sua obra gratuitamente, desde que cumpram certas condições. A condição mais comum é a \"Atribuição\" (BY): podes usar a imagem, música ou texto, desde que menciones o nome do autor original e coloques o link para a sua página.",
      "en": "Creative Commons licenses let creators specify how their work can be legally used, usually requiring author attribution (BY)."
    },
    "whyItMatters": {
      "pt": "Saber identificar símbolos Creative Commons permite-te enriquecer os teus trabalhos escolares de TIC com recursos legais e de qualidade.",
      "en": "CC licenses empower students to legally source multimedia for projects."
    },
    "funFact": {
      "pt": "A Wikipédia inteira está licenciada sob Creative Commons, o que permite a milhões de estudantes consultar e aprender livremente todos os dias!",
      "en": "All of Wikipedia is licensed under Creative Commons, enabling free knowledge sharing!"
    },
    "question": {
      "pt": "O que deves fazer quando usas uma fotografia com licença Creative Commons \"BY\" num trabalho?",
      "en": "What must you do when using a Creative Commons \"BY\" photo?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Pagar 50 euros ao autor",
        "en": "Pay 50 euros"
      },
      {
        "id": "b",
        "pt": "Dar os créditos e indicar o nome do autor da fotografia",
        "en": "Give credit and mention the authors name"
      },
      {
        "id": "c",
        "pt": "Apagar a foto do computador",
        "en": "Delete photo"
      },
      {
        "id": "d",
        "pt": "Não podes usar de maneira nenhuma",
        "en": "You cannot use it at all"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A condição \"BY\" (Atribuição) obriga apenas a dar o devido crédito ao autor original da obra.",
      "en": "BY means Attribution: you must credit the creator."
    }
  },
  {
    "week": 35,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 35: A Memória RAM vs o Disco SSD",
      "en": "Week 35: RAM Memory vs SSD Storage"
    },
    "teaser": {
      "pt": "A secretária de trabalho temporária vs a estante de arquivo permanente.",
      "en": "Temporary workspace vs permanent filing cabinet."
    },
    "description": {
      "pt": "A memória RAM (Random Access Memory) é a memória de trabalho ultrarrápida do computador. Quando estás a usar um programa, ele fica na RAM. Mas quando desligas o computador, tudo o que está na RAM desaparece! Para guardar ficheiros de forma permanente (como fotos e documentos), usamos o disco SSD ou HDD.",
      "en": "RAM is fast temporary memory lost when powered down. SSD/HDD storage keeps files permanently."
    },
    "whyItMatters": {
      "pt": "Compreender a RAM explica porque deves sempre guardar (Ctrl+S) os teus trabalhos antes de fechar o computador!",
      "en": "Understanding RAM shows why you must always save your files."
    },
    "funFact": {
      "pt": "A sigla RAM significa \"Memória de Acesso Aleatório\", porque o processador consegue ler qualquer posição com a mesma velocidade instantânea!",
      "en": "RAM allows identical ultra-fast access speed to any byte regardless of location."
    },
    "question": {
      "pt": "O que acontece aos dados guardados na memória RAM quando desligas o computador?",
      "en": "What happens to RAM data on shutdown?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ficam gravados para sempre na nuvem",
        "en": "Saved permanently in the cloud"
      },
      {
        "id": "b",
        "pt": "Apagam-se completamente porque a RAM é uma memória volátil",
        "en": "They are erased because RAM is volatile"
      },
      {
        "id": "c",
        "pt": "São impressos numa folha de papel",
        "en": "Printed on paper"
      },
      {
        "id": "d",
        "pt": "Transformam-se num vírus",
        "en": "Turn into a virus"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A memória RAM necessita de corrente elétrica contínua. Sem eletricidade, os seus dados esvaziam-se de imediato.",
      "en": "RAM requires electric power; without power it clears instantly."
    }
  },
  {
    "week": 36,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 36: Periféricos de Entrada, Saída e Mistos",
      "en": "Week 36: Input, Output, and Hybrid Peripherals"
    },
    "teaser": {
      "pt": "Como a informação entra e sai da caixa do computador.",
      "en": "How data travels in and out of the computer."
    },
    "description": {
      "pt": "Periféricos de Entrada enviam informação para dentro do computador (teclado, rato, microfone, webcam). Periféricos de Saída recebem a informação processada e mostram-na ao utilizador (monitor, colunas de som, impressora). E há Periféricos Mistos que fazem as duas coisas, como os ecrãs táteis (touchscreens) e os auscultadores com microfone!",
      "en": "Input peripherals bring data in (mouse, mic); Output send data out (screen, speakers); Hybrid do both (touchscreen)."
    },
    "whyItMatters": {
      "pt": "Conhecer a tipologia dos periféricos permite-te configurar a tua estação de trabalho nas aulas de TIC.",
      "en": "Knowing peripherals helps you configure your workspace in ICT classes."
    },
    "funFact": {
      "pt": "O primeiro rato inventado por Douglas Engelbart em 1964 era feito de madeira e tinha duas rodas de metal por baixo!",
      "en": "The first mouse built in 1964 was carved from wood with two rolling metal wheels!"
    },
    "question": {
      "pt": "Qual dos seguintes dispositivos é um periférico de SAÍDA?",
      "en": "Which device is an OUTPUT peripheral?"
    },
    "options": [
      {
        "id": "a",
        "pt": "O microfone",
        "en": "Microphone"
      },
      {
        "id": "b",
        "pt": "O scanner de documentos",
        "en": "Document scanner"
      },
      {
        "id": "c",
        "pt": "As colunas de som",
        "en": "Audio speakers"
      },
      {
        "id": "d",
        "pt": "O teclado",
        "en": "Keyboard"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "As colunas de som transmitem o áudio de dentro do computador para o exterior, sendo um periférico de saída.",
      "en": "Speakers output sound generated by the computer."
    }
  },
  {
    "week": 37,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 37: A Altura Correta do Monitor e a Coluna Cervical",
      "en": "Week 37: Monitor Height and Neck Health"
    },
    "teaser": {
      "pt": "O topo do ecrã deve ficar exatamente ao nível dos teus olhos.",
      "en": "The top of the monitor should align with eye level."
    },
    "description": {
      "pt": "Quando o monitor está demasiado baixo, inclinas o pescoço para a frente durante horas, causando o chamado \"pescoço de texto\" (síndrome da cabeça descaída). A regra ergonómica recomenda que o topo do monitor fique exatamente na linha horizontal dos teus olhos, a uma distância de um braço esticado (cerca de 50 a 70 cm).",
      "en": "Keep the top edge of your monitor at eye level at an arm length distance to prevent neck pain."
    },
    "whyItMatters": {
      "pt": "Evita dores crónicas de cabeça e pescoço causadas por posturas incorretas em frente ao computador.",
      "en": "Prevents chronic headaches and neck strain during computer use."
    },
    "funFact": {
      "pt": "A cabeça humana de uma criança de 10 anos pesa cerca de 4 a 5 kg. Mas inclinada a 45 graus, o esforço no pescoço equivale a 22 kg!",
      "en": "Tilting your neck 45 degrees increases neck load to 22 kg!"
    },
    "question": {
      "pt": "Onde deve ficar o topo do monitor do computador segundo a ergonomia?",
      "en": "Where should the top of your monitor be?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ao nível dos teus olhos para não inclinares a cabeça",
        "en": "At eye level so you do not bend your neck"
      },
      {
        "id": "b",
        "pt": "No chão encostado aos pés",
        "en": "On the floor by your feet"
      },
      {
        "id": "c",
        "pt": "Tão alto que tenhas de olhar para o teto",
        "en": "Near the ceiling"
      },
      {
        "id": "d",
        "pt": "Colado diretamente ao teu nariz",
        "en": "Touching your nose"
      }
    ],
    "correctOptionId": "a",
    "explanation": {
      "pt": "O topo do ecrã ao nível dos olhos mantém o pescoço reto e a postura da coluna equilibrada.",
      "en": "Aligning top of screen with eyes keeps the cervical spine aligned."
    }
  },
  {
    "week": 38,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 38: O Volume dos Auscultadores e a Audição",
      "en": "Week 38: Headphone Volume and Hearing Safety"
    },
    "teaser": {
      "pt": "A regra dos 60/60 para não danificares os teus ouvidos para sempre.",
      "en": "The 60/60 rule to prevent irreversible hearing loss."
    },
    "description": {
      "pt": "Ouvir música ou jogos em auscultadores com o volume no máximo pode destruir permanentemente as células ciliadas do ouvido interno. Os médicos recomendam a regra dos 60/60: nunca exceder 60% do volume máximo do dispositivo e não usar auscultadores por mais de 60 minutos seguidos sem uma pausa de descanso.",
      "en": "Follow the 60/60 rule: keep volume under 60% and limit sessions to 60 minutes before taking a break."
    },
    "whyItMatters": {
      "pt": "As lesões auditivas causadas pelo ruído excessivo são irreversíveis. Proteger os teus ouvidos agora garante boa audição para toda a vida.",
      "en": "Hearing loss from loud volumes cannot be reversed; prevention is key."
    },
    "funFact": {
      "pt": "Se a pessoa sentada ao teu lado consegue ouvir o som dos teus auscultadores, significa que o volume está perigosamente alto!",
      "en": "If someone next to you hears your headphones, the volume is dangerously high!"
    },
    "question": {
      "pt": "Qual é a recomendação da regra dos 60/60 ao utilizar auscultadores?",
      "en": "What does the 60/60 rule advise for headphones?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Usar 60 auscultadores ao mesmo tempo",
        "en": "Wear 60 headphones at once"
      },
      {
        "id": "b",
        "pt": "Máximo de 60% do volume e pausas a cada 60 minutos",
        "en": "Max 60% volume and take a break every 60 minutes"
      },
      {
        "id": "c",
        "pt": "Ouvir 60 músicas seguidas sem parar",
        "en": "Listen to 60 songs without stopping"
      },
      {
        "id": "d",
        "pt": "Comprar auscultadores de 60 euros",
        "en": "Buy 60 euro headphones"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A regra 60/60 estabelece limite de 60% no som e descanso ao fim de 60 minutos de utilização contínua.",
      "en": "60/60 limits volume to 60% and duration to 60 minutes."
    }
  },
  {
    "week": 39,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 39: Cuidado com os Dados Pessoais em Jogos Online",
      "en": "Week 39: Personal Data in Online Gaming"
    },
    "teaser": {
      "pt": "Nunca reveles a tua morada, escola ou idade real a desconhecidos nos chats de jogos.",
      "en": "Never disclose real address, school, or age in online game chats."
    },
    "description": {
      "pt": "Jogar online com outras pessoas é muito divertido, mas os chats de jogos (Roblox, Minecraft, Fortnite, Discord) estão cheios de estranhos. Nunca partilhes o teu nome completo, idade, número de telemóvel, fotografia da tua cara ou o nome da tua escola. Se alguém insistir para falar contigo em privado ou pedir fotos, bloqueia e avisa um adulto.",
      "en": "Gaming chats are public spaces. Keep your full name, location, school, and face private. Report any suspicious requests."
    },
    "whyItMatters": {
      "pt": "Manter a tua privacidade online protege-te contra burlas, chantagens e pessoas mal-intencionadas.",
      "en": "Guarding personal data shields you from scams and predators."
    },
    "funFact": {
      "pt": "Criar um \"Nickname\" (pseudónimo criativo) que não use o teu nome verdadeiro é a melhor forma de te divertires mantendo o anonimato seguro!",
      "en": "Using a creative gaming nickname instead of your real name keeps you safely anonymous!"
    },
    "question": {
      "pt": "Que informação podes partilhar com segurança num chat público de um jogo online?",
      "en": "What can you safely share in a public game chat?"
    },
    "options": [
      {
        "id": "a",
        "pt": "A morada da tua casa e o número da porta",
        "en": "Your home address"
      },
      {
        "id": "b",
        "pt": "O nome da tua escola e a tua turma",
        "en": "Your school name and class"
      },
      {
        "id": "c",
        "pt": "Apenas dicas e estratégias sobre o jogo com o teu Nickname",
        "en": "Game strategies using your nickname"
      },
      {
        "id": "d",
        "pt": "O número de telefone dos teus pais",
        "en": "Your parents phone number"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "Apenas deves partilhar conteúdos relacionados com o jogo, mantendo todos os dados da tua vida real confidenciais.",
      "en": "Only share gameplay tips; never personal real-world information."
    }
  },
  {
    "week": 40,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 40: O Perigo da Geolocalização e Fotos EXIF",
      "en": "Week 40: Geolocation Risks in Photos"
    },
    "teaser": {
      "pt": "As fotografias que tiras com o telemóvel guardam as coordenadas GPS exatas de onde estás!",
      "en": "Smartphone photos often store exact GPS coordinates inside the file!"
    },
    "description": {
      "pt": "Quando tiras uma fotografia com o telemóvel com a localização ativada, o ficheiro guarda dados escondidos chamados \"Metadados EXIF\". Estes dados incluem o modelo do aparelho, a hora e até as coordenadas de GPS exatas de onde estavas (por exemplo, dentro do teu quarto ou na porta da tua escola). Desativa a geolocalização da câmara para proteger a tua privacidade!",
      "en": "EXIF metadata in photos can store exact GPS coordinates. Turn off camera geolocation before sharing pictures."
    },
    "whyItMatters": {
      "pt": "Evita que estranhos saibam onde vives ou onde passas os teus dias através de fotos que publicas nas redes.",
      "en": "Prevents strangers from locating your home or school through shared photos."
    },
    "funFact": {
      "pt": "Muitos gatos famosos na internet foram localizados por fãs curiosos que leram os metadados das fotos tiradas pelos seus donos!",
      "en": "Famous internet pets have had their homes located by fans reading EXIF data on photos!"
    },
    "question": {
      "pt": "O que são os metadados EXIF guardados numa fotografia digital?",
      "en": "What are EXIF metadata in photos?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Um filtro de beleza que muda as cores",
        "en": "A beauty filter"
      },
      {
        "id": "b",
        "pt": "Informações ocultas sobre a câmara, data e até as coordenadas GPS de onde a foto foi tirada",
        "en": "Hidden info about camera, time, and GPS coordinates"
      },
      {
        "id": "c",
        "pt": "Uma música de fundo",
        "en": "Background music"
      },
      {
        "id": "d",
        "pt": "Um jogo secreto",
        "en": "A secret game"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Os dados EXIF contêm detalhes técnicos e geográficos da fotografia, revelando onde e quando foi captada.",
      "en": "EXIF data records device parameters and GPS location."
    }
  },
  {
    "week": 41,
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe e Autenticação",
      "en": "Passwords & Authentication"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "title": {
      "pt": "Semana 41: Autenticação de Dois Fatores (2FA): O Guarda-costas Digital",
      "en": "Week 41: Two-Factor Authentication (2FA)"
    },
    "teaser": {
      "pt": "Mesmo que descubram a tua senha, não conseguem entrar sem o segundo código.",
      "en": "Even if hackers guess your password, they cannot log in without the second code."
    },
    "description": {
      "pt": "A Autenticação de Dois Fatores (2FA) adiciona uma segunda camada de proteção à tua conta. Para entrar, precisas de: 1) Algo que sabes (a tua palavra-passe); 2) Algo que tens (um código de 6 dígitos enviado para o telemóvel ou gerado numa aplicação). Assim, mesmo que um pirata descubra a tua senha, fica impedido de entrar!",
      "en": "2FA requires two things: something you know (password) and something you have (phone code)."
    },
    "whyItMatters": {
      "pt": "Ativar a 2FA nas contas escolares e de jogos bloqueia 99% dos ataques informáticos automáticos.",
      "en": "Enabling 2FA blocks 99% of automated account takeovers."
    },
    "funFact": {
      "pt": "A 2FA é usada pelos bancos e exércitos mundiais há décadas, e hoje está disponível gratuitamente para qualquer aluno!",
      "en": "Banks and security agencies have relied on 2FA for decades to secure high-value systems."
    },
    "question": {
      "pt": "Porque é que a Autenticação de Dois Fatores (2FA) é tão recomendada?",
      "en": "Why is Two-Factor Authentication strongly recommended?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Porque obriga a comprar um computador novo",
        "en": "It forces buying a new computer"
      },
      {
        "id": "b",
        "pt": "Porque impede o acesso mesmo que alguém descubra a tua palavra-passe",
        "en": "It prevents access even if someone steals your password"
      },
      {
        "id": "c",
        "pt": "Porque apaga a tua conta todos os dias",
        "en": "It deletes your account daily"
      },
      {
        "id": "d",
        "pt": "Porque faz a internet ficar mais lenta",
        "en": "It slows down internet"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Sem o segundo fator de confirmação, ninguém consegue aceder à tua conta, tornando o roubo de senhas inútil.",
      "en": "Without the second code, stolen passwords cannot be used to break in."
    }
  },
  {
    "week": 42,
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email Communication"
    },
    "themeIcon": "📧",
    "badgeColor": "sky",
    "title": {
      "pt": "Semana 42: Como Detetar um Email de Phishing (Pescador de Dados)",
      "en": "Week 42: How to Spot a Phishing Email"
    },
    "teaser": {
      "pt": "Emails com ofertas milagrosas ou ameaças de bloqueio urgente são quase sempre armadilhas.",
      "en": "Emails offering free gifts or urgent threats are almost always traps."
    },
    "description": {
      "pt": "Phishing é uma técnica de burla em que criminosos enviam emails falsos fingindo ser marcas conhecidas (como Google, Roblox, PlayStation ou bancos). Usam truques como criar urgência (\"A tua conta vai ser apagada em 2 horas!\") ou prometer prémios (\"Ganhaste um iPhone grátis!\"). Verifica sempre o endereço real de quem enviou e nunca cliques em links suspeitos!",
      "en": "Phishing mimics trusted companies to steal credentials through fake urgency or prize promises. Always verify sender address."
    },
    "whyItMatters": {
      "pt": "O phishing é a porta de entrada para 90% dos vírus e roubos de contas no mundo digital.",
      "en": "Phishing is the root vector for 90% of cyber attacks and credential thefts."
    },
    "funFact": {
      "pt": "A palavra \"Phishing\" escreve-se com \"Ph\" em homenagem aos primeiros piratas telefónicos dos anos 70, conhecidos como \"Phreaks\"!",
      "en": "The word phishing honors early phone hackers from the 1970s known as phreaks!"
    },
    "question": {
      "pt": "Qual dos seguintes sinais indica que um email é provavelmente uma tentativa de PHISHING?",
      "en": "Which sign indicates a likely phishing email?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Vem de um colega da turma com o assunto da aula de TIC",
        "en": "From a classmate about ICT homework"
      },
      {
        "id": "b",
        "pt": "Pede com urgência que cliques num link para não perderes a conta ou promete prémios fabulosos",
        "en": "Urges clicking a link or promises free gifts"
      },
      {
        "id": "c",
        "pt": "Tem o logotipo da escola e fala da reunião de pais",
        "en": "School logo about parents meeting"
      },
      {
        "id": "d",
        "pt": "Não tem anexos nem links nenhuns",
        "en": "No links or attachments"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Urgência extrema e promessas inacreditáveis são as marcas registadas dos ataques de phishing para te enganar.",
      "en": "Manufactured panic and unbelievable offers are hallmarks of phishing."
    }
  },
  {
    "week": 43,
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegação e Pesquisa Crítica",
      "en": "Internet Browsing & Critical Research"
    },
    "themeIcon": "🌐",
    "badgeColor": "purple",
    "title": {
      "pt": "Semana 43: O Cadeado e o Protocolo HTTPS Seguro",
      "en": "Week 43: The Padlock and HTTPS Security"
    },
    "teaser": {
      "pt": "Porque deves verificar se o endereço do site começa por \"https://\" antes de escrever dados.",
      "en": "Why you must verify https:// before typing any sensitive information."
    },
    "description": {
      "pt": "Quando visitas um site seguro, o seu endereço começa por \"https://\" e o navegador exibe um pequeno cadeado. O \"S\" no final significa \"Seguro\" (SSL/TLS). Isto garante que toda a informação trocada entre o teu computador e o site viaja encriptada (em código secreto), impedindo que espiões na mesma rede Wi-Fi leiam o que estás a escrever.",
      "en": "HTTPS encrypts data between your browser and the website, preventing Wi-Fi snoopers from reading your input."
    },
    "whyItMatters": {
      "pt": "Nunca deves colocar palavras-passe ou dados pessoais em sites que usem apenas \"http://\" sem o \"S\" de segurança.",
      "en": "Never submit passwords on plain HTTP pages without encryption."
    },
    "funFact": {
      "pt": "A encriptação usada no HTTPS moderno é tão forte que nem o supercomputador mais rápido do mundo conseguiria quebrá-la num milhão de anos!",
      "en": "Modern HTTPS encryption would take supercomputers millions of years to crack by brute force!"
    },
    "question": {
      "pt": "O que significa a letra \"S\" no início do endereço \"https://\"?",
      "en": "What does the \"S\" stand for in \"https://\"?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Super-rápido",
        "en": "Super-fast"
      },
      {
        "id": "b",
        "pt": "Seguro (a comunicação é encriptada)",
        "en": "Secure (encrypted traffic)"
      },
      {
        "id": "c",
        "pt": "Sem imagens",
        "en": "No pictures"
      },
      {
        "id": "d",
        "pt": "Site escolar",
        "en": "School site"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A letra \"S\" significa \"Secure\", indicando que a ligação está protegida por um certificado digital de cifra.",
      "en": "S means Secure, confirming data is encrypted in transit."
    }
  },
  {
    "week": 44,
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "teal",
    "title": {
      "pt": "Semana 44: O Que São as Licenças Creative Commons (CC)?",
      "en": "Week 44: What are Creative Commons (CC) Licenses?"
    },
    "teaser": {
      "pt": "A forma moderna como os autores autorizam a partilha legal dos seus trabalhos.",
      "en": "How creators grant legal permission to share and reuse their work."
    },
    "description": {
      "pt": "O símbolo \"CC\" (Creative Commons) indica que o autor permite que outras pessoas usem a sua obra gratuitamente, desde que cumpram certas condições. A condição mais comum é a \"Atribuição\" (BY): podes usar a imagem, música ou texto, desde que menciones o nome do autor original e coloques o link para a sua página.",
      "en": "Creative Commons licenses let creators specify how their work can be legally used, usually requiring author attribution (BY)."
    },
    "whyItMatters": {
      "pt": "Saber identificar símbolos Creative Commons permite-te enriquecer os teus trabalhos escolares de TIC com recursos legais e de qualidade.",
      "en": "CC licenses empower students to legally source multimedia for projects."
    },
    "funFact": {
      "pt": "A Wikipédia inteira está licenciada sob Creative Commons, o que permite a milhões de estudantes consultar e aprender livremente todos os dias!",
      "en": "All of Wikipedia is licensed under Creative Commons, enabling free knowledge sharing!"
    },
    "question": {
      "pt": "O que deves fazer quando usas uma fotografia com licença Creative Commons \"BY\" num trabalho?",
      "en": "What must you do when using a Creative Commons \"BY\" photo?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Pagar 50 euros ao autor",
        "en": "Pay 50 euros"
      },
      {
        "id": "b",
        "pt": "Dar os créditos e indicar o nome do autor da fotografia",
        "en": "Give credit and mention the authors name"
      },
      {
        "id": "c",
        "pt": "Apagar a foto do computador",
        "en": "Delete photo"
      },
      {
        "id": "d",
        "pt": "Não podes usar de maneira nenhuma",
        "en": "You cannot use it at all"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A condição \"BY\" (Atribuição) obriga apenas a dar o devido crédito ao autor original da obra.",
      "en": "BY means Attribution: you must credit the creator."
    }
  },
  {
    "week": 45,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 45: A Memória RAM vs o Disco SSD",
      "en": "Week 45: RAM Memory vs SSD Storage"
    },
    "teaser": {
      "pt": "A secretária de trabalho temporária vs a estante de arquivo permanente.",
      "en": "Temporary workspace vs permanent filing cabinet."
    },
    "description": {
      "pt": "A memória RAM (Random Access Memory) é a memória de trabalho ultrarrápida do computador. Quando estás a usar um programa, ele fica na RAM. Mas quando desligas o computador, tudo o que está na RAM desaparece! Para guardar ficheiros de forma permanente (como fotos e documentos), usamos o disco SSD ou HDD.",
      "en": "RAM is fast temporary memory lost when powered down. SSD/HDD storage keeps files permanently."
    },
    "whyItMatters": {
      "pt": "Compreender a RAM explica porque deves sempre guardar (Ctrl+S) os teus trabalhos antes de fechar o computador!",
      "en": "Understanding RAM shows why you must always save your files."
    },
    "funFact": {
      "pt": "A sigla RAM significa \"Memória de Acesso Aleatório\", porque o processador consegue ler qualquer posição com a mesma velocidade instantânea!",
      "en": "RAM allows identical ultra-fast access speed to any byte regardless of location."
    },
    "question": {
      "pt": "O que acontece aos dados guardados na memória RAM quando desligas o computador?",
      "en": "What happens to RAM data on shutdown?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ficam gravados para sempre na nuvem",
        "en": "Saved permanently in the cloud"
      },
      {
        "id": "b",
        "pt": "Apagam-se completamente porque a RAM é uma memória volátil",
        "en": "They are erased because RAM is volatile"
      },
      {
        "id": "c",
        "pt": "São impressos numa folha de papel",
        "en": "Printed on paper"
      },
      {
        "id": "d",
        "pt": "Transformam-se num vírus",
        "en": "Turn into a virus"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A memória RAM necessita de corrente elétrica contínua. Sem eletricidade, os seus dados esvaziam-se de imediato.",
      "en": "RAM requires electric power; without power it clears instantly."
    }
  },
  {
    "week": 46,
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "title": {
      "pt": "Semana 46: Periféricos de Entrada, Saída e Mistos",
      "en": "Week 46: Input, Output, and Hybrid Peripherals"
    },
    "teaser": {
      "pt": "Como a informação entra e sai da caixa do computador.",
      "en": "How data travels in and out of the computer."
    },
    "description": {
      "pt": "Periféricos de Entrada enviam informação para dentro do computador (teclado, rato, microfone, webcam). Periféricos de Saída recebem a informação processada e mostram-na ao utilizador (monitor, colunas de som, impressora). E há Periféricos Mistos que fazem as duas coisas, como os ecrãs táteis (touchscreens) e os auscultadores com microfone!",
      "en": "Input peripherals bring data in (mouse, mic); Output send data out (screen, speakers); Hybrid do both (touchscreen)."
    },
    "whyItMatters": {
      "pt": "Conhecer a tipologia dos periféricos permite-te configurar a tua estação de trabalho nas aulas de TIC.",
      "en": "Knowing peripherals helps you configure your workspace in ICT classes."
    },
    "funFact": {
      "pt": "O primeiro rato inventado por Douglas Engelbart em 1964 era feito de madeira e tinha duas rodas de metal por baixo!",
      "en": "The first mouse built in 1964 was carved from wood with two rolling metal wheels!"
    },
    "question": {
      "pt": "Qual dos seguintes dispositivos é um periférico de SAÍDA?",
      "en": "Which device is an OUTPUT peripheral?"
    },
    "options": [
      {
        "id": "a",
        "pt": "O microfone",
        "en": "Microphone"
      },
      {
        "id": "b",
        "pt": "O scanner de documentos",
        "en": "Document scanner"
      },
      {
        "id": "c",
        "pt": "As colunas de som",
        "en": "Audio speakers"
      },
      {
        "id": "d",
        "pt": "O teclado",
        "en": "Keyboard"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "As colunas de som transmitem o áudio de dentro do computador para o exterior, sendo um periférico de saída.",
      "en": "Speakers output sound generated by the computer."
    }
  },
  {
    "week": 47,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 47: A Altura Correta do Monitor e a Coluna Cervical",
      "en": "Week 47: Monitor Height and Neck Health"
    },
    "teaser": {
      "pt": "O topo do ecrã deve ficar exatamente ao nível dos teus olhos.",
      "en": "The top of the monitor should align with eye level."
    },
    "description": {
      "pt": "Quando o monitor está demasiado baixo, inclinas o pescoço para a frente durante horas, causando o chamado \"pescoço de texto\" (síndrome da cabeça descaída). A regra ergonómica recomenda que o topo do monitor fique exatamente na linha horizontal dos teus olhos, a uma distância de um braço esticado (cerca de 50 a 70 cm).",
      "en": "Keep the top edge of your monitor at eye level at an arm length distance to prevent neck pain."
    },
    "whyItMatters": {
      "pt": "Evita dores crónicas de cabeça e pescoço causadas por posturas incorretas em frente ao computador.",
      "en": "Prevents chronic headaches and neck strain during computer use."
    },
    "funFact": {
      "pt": "A cabeça humana de uma criança de 10 anos pesa cerca de 4 a 5 kg. Mas inclinada a 45 graus, o esforço no pescoço equivale a 22 kg!",
      "en": "Tilting your neck 45 degrees increases neck load to 22 kg!"
    },
    "question": {
      "pt": "Onde deve ficar o topo do monitor do computador segundo a ergonomia?",
      "en": "Where should the top of your monitor be?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Ao nível dos teus olhos para não inclinares a cabeça",
        "en": "At eye level so you do not bend your neck"
      },
      {
        "id": "b",
        "pt": "No chão encostado aos pés",
        "en": "On the floor by your feet"
      },
      {
        "id": "c",
        "pt": "Tão alto que tenhas de olhar para o teto",
        "en": "Near the ceiling"
      },
      {
        "id": "d",
        "pt": "Colado diretamente ao teu nariz",
        "en": "Touching your nose"
      }
    ],
    "correctOptionId": "a",
    "explanation": {
      "pt": "O topo do ecrã ao nível dos olhos mantém o pescoço reto e a postura da coluna equilibrada.",
      "en": "Aligning top of screen with eyes keeps the cervical spine aligned."
    }
  },
  {
    "week": 48,
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘",
    "badgeColor": "emerald",
    "title": {
      "pt": "Semana 48: O Volume dos Auscultadores e a Audição",
      "en": "Week 48: Headphone Volume and Hearing Safety"
    },
    "teaser": {
      "pt": "A regra dos 60/60 para não danificares os teus ouvidos para sempre.",
      "en": "The 60/60 rule to prevent irreversible hearing loss."
    },
    "description": {
      "pt": "Ouvir música ou jogos em auscultadores com o volume no máximo pode destruir permanentemente as células ciliadas do ouvido interno. Os médicos recomendam a regra dos 60/60: nunca exceder 60% do volume máximo do dispositivo e não usar auscultadores por mais de 60 minutos seguidos sem uma pausa de descanso.",
      "en": "Follow the 60/60 rule: keep volume under 60% and limit sessions to 60 minutes before taking a break."
    },
    "whyItMatters": {
      "pt": "As lesões auditivas causadas pelo ruído excessivo são irreversíveis. Proteger os teus ouvidos agora garante boa audição para toda a vida.",
      "en": "Hearing loss from loud volumes cannot be reversed; prevention is key."
    },
    "funFact": {
      "pt": "Se a pessoa sentada ao teu lado consegue ouvir o som dos teus auscultadores, significa que o volume está perigosamente alto!",
      "en": "If someone next to you hears your headphones, the volume is dangerously high!"
    },
    "question": {
      "pt": "Qual é a recomendação da regra dos 60/60 ao utilizar auscultadores?",
      "en": "What does the 60/60 rule advise for headphones?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Usar 60 auscultadores ao mesmo tempo",
        "en": "Wear 60 headphones at once"
      },
      {
        "id": "b",
        "pt": "Máximo de 60% do volume e pausas a cada 60 minutos",
        "en": "Max 60% volume and take a break every 60 minutes"
      },
      {
        "id": "c",
        "pt": "Ouvir 60 músicas seguidas sem parar",
        "en": "Listen to 60 songs without stopping"
      },
      {
        "id": "d",
        "pt": "Comprar auscultadores de 60 euros",
        "en": "Buy 60 euro headphones"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "A regra 60/60 estabelece limite de 60% no som e descanso ao fim de 60 minutos de utilização contínua.",
      "en": "60/60 limits volume to 60% and duration to 60 minutes."
    }
  },
  {
    "week": 49,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 49: Cuidado com os Dados Pessoais em Jogos Online",
      "en": "Week 49: Personal Data in Online Gaming"
    },
    "teaser": {
      "pt": "Nunca reveles a tua morada, escola ou idade real a desconhecidos nos chats de jogos.",
      "en": "Never disclose real address, school, or age in online game chats."
    },
    "description": {
      "pt": "Jogar online com outras pessoas é muito divertido, mas os chats de jogos (Roblox, Minecraft, Fortnite, Discord) estão cheios de estranhos. Nunca partilhes o teu nome completo, idade, número de telemóvel, fotografia da tua cara ou o nome da tua escola. Se alguém insistir para falar contigo em privado ou pedir fotos, bloqueia e avisa um adulto.",
      "en": "Gaming chats are public spaces. Keep your full name, location, school, and face private. Report any suspicious requests."
    },
    "whyItMatters": {
      "pt": "Manter a tua privacidade online protege-te contra burlas, chantagens e pessoas mal-intencionadas.",
      "en": "Guarding personal data shields you from scams and predators."
    },
    "funFact": {
      "pt": "Criar um \"Nickname\" (pseudónimo criativo) que não use o teu nome verdadeiro é a melhor forma de te divertires mantendo o anonimato seguro!",
      "en": "Using a creative gaming nickname instead of your real name keeps you safely anonymous!"
    },
    "question": {
      "pt": "Que informação podes partilhar com segurança num chat público de um jogo online?",
      "en": "What can you safely share in a public game chat?"
    },
    "options": [
      {
        "id": "a",
        "pt": "A morada da tua casa e o número da porta",
        "en": "Your home address"
      },
      {
        "id": "b",
        "pt": "O nome da tua escola e a tua turma",
        "en": "Your school name and class"
      },
      {
        "id": "c",
        "pt": "Apenas dicas e estratégias sobre o jogo com o teu Nickname",
        "en": "Game strategies using your nickname"
      },
      {
        "id": "d",
        "pt": "O número de telefone dos teus pais",
        "en": "Your parents phone number"
      }
    ],
    "correctOptionId": "c",
    "explanation": {
      "pt": "Apenas deves partilhar conteúdos relacionados com o jogo, mantendo todos os dados da tua vida real confidenciais.",
      "en": "Only share gameplay tips; never personal real-world information."
    }
  },
  {
    "week": 50,
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Online Safety & Digital Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "title": {
      "pt": "Semana 50: O Perigo da Geolocalização e Fotos EXIF",
      "en": "Week 50: Geolocation Risks in Photos"
    },
    "teaser": {
      "pt": "As fotografias que tiras com o telemóvel guardam as coordenadas GPS exatas de onde estás!",
      "en": "Smartphone photos often store exact GPS coordinates inside the file!"
    },
    "description": {
      "pt": "Quando tiras uma fotografia com o telemóvel com a localização ativada, o ficheiro guarda dados escondidos chamados \"Metadados EXIF\". Estes dados incluem o modelo do aparelho, a hora e até as coordenadas de GPS exatas de onde estavas (por exemplo, dentro do teu quarto ou na porta da tua escola). Desativa a geolocalização da câmara para proteger a tua privacidade!",
      "en": "EXIF metadata in photos can store exact GPS coordinates. Turn off camera geolocation before sharing pictures."
    },
    "whyItMatters": {
      "pt": "Evita que estranhos saibam onde vives ou onde passas os teus dias através de fotos que publicas nas redes.",
      "en": "Prevents strangers from locating your home or school through shared photos."
    },
    "funFact": {
      "pt": "Muitos gatos famosos na internet foram localizados por fãs curiosos que leram os metadados das fotos tiradas pelos seus donos!",
      "en": "Famous internet pets have had their homes located by fans reading EXIF data on photos!"
    },
    "question": {
      "pt": "O que são os metadados EXIF guardados numa fotografia digital?",
      "en": "What are EXIF metadata in photos?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Um filtro de beleza que muda as cores",
        "en": "A beauty filter"
      },
      {
        "id": "b",
        "pt": "Informações ocultas sobre a câmara, data e até as coordenadas GPS de onde a foto foi tirada",
        "en": "Hidden info about camera, time, and GPS coordinates"
      },
      {
        "id": "c",
        "pt": "Uma música de fundo",
        "en": "Background music"
      },
      {
        "id": "d",
        "pt": "Um jogo secreto",
        "en": "A secret game"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Os dados EXIF contêm detalhes técnicos e geográficos da fotografia, revelando onde e quando foi captada.",
      "en": "EXIF data records device parameters and GPS location."
    }
  },
  {
    "week": 51,
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe e Autenticação",
      "en": "Passwords & Authentication"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "title": {
      "pt": "Semana 51: Autenticação de Dois Fatores (2FA): O Guarda-costas Digital",
      "en": "Week 51: Two-Factor Authentication (2FA)"
    },
    "teaser": {
      "pt": "Mesmo que descubram a tua senha, não conseguem entrar sem o segundo código.",
      "en": "Even if hackers guess your password, they cannot log in without the second code."
    },
    "description": {
      "pt": "A Autenticação de Dois Fatores (2FA) adiciona uma segunda camada de proteção à tua conta. Para entrar, precisas de: 1) Algo que sabes (a tua palavra-passe); 2) Algo que tens (um código de 6 dígitos enviado para o telemóvel ou gerado numa aplicação). Assim, mesmo que um pirata descubra a tua senha, fica impedido de entrar!",
      "en": "2FA requires two things: something you know (password) and something you have (phone code)."
    },
    "whyItMatters": {
      "pt": "Ativar a 2FA nas contas escolares e de jogos bloqueia 99% dos ataques informáticos automáticos.",
      "en": "Enabling 2FA blocks 99% of automated account takeovers."
    },
    "funFact": {
      "pt": "A 2FA é usada pelos bancos e exércitos mundiais há décadas, e hoje está disponível gratuitamente para qualquer aluno!",
      "en": "Banks and security agencies have relied on 2FA for decades to secure high-value systems."
    },
    "question": {
      "pt": "Porque é que a Autenticação de Dois Fatores (2FA) é tão recomendada?",
      "en": "Why is Two-Factor Authentication strongly recommended?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Porque obriga a comprar um computador novo",
        "en": "It forces buying a new computer"
      },
      {
        "id": "b",
        "pt": "Porque impede o acesso mesmo que alguém descubra a tua palavra-passe",
        "en": "It prevents access even if someone steals your password"
      },
      {
        "id": "c",
        "pt": "Porque apaga a tua conta todos os dias",
        "en": "It deletes your account daily"
      },
      {
        "id": "d",
        "pt": "Porque faz a internet ficar mais lenta",
        "en": "It slows down internet"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Sem o segundo fator de confirmação, ninguém consegue aceder à tua conta, tornando o roubo de senhas inútil.",
      "en": "Without the second code, stolen passwords cannot be used to break in."
    }
  },
  {
    "week": 52,
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email Communication"
    },
    "themeIcon": "📧",
    "badgeColor": "sky",
    "title": {
      "pt": "Semana 52: Como Detetar um Email de Phishing (Pescador de Dados)",
      "en": "Week 52: How to Spot a Phishing Email"
    },
    "teaser": {
      "pt": "Emails com ofertas milagrosas ou ameaças de bloqueio urgente são quase sempre armadilhas.",
      "en": "Emails offering free gifts or urgent threats are almost always traps."
    },
    "description": {
      "pt": "Phishing é uma técnica de burla em que criminosos enviam emails falsos fingindo ser marcas conhecidas (como Google, Roblox, PlayStation ou bancos). Usam truques como criar urgência (\"A tua conta vai ser apagada em 2 horas!\") ou prometer prémios (\"Ganhaste um iPhone grátis!\"). Verifica sempre o endereço real de quem enviou e nunca cliques em links suspeitos!",
      "en": "Phishing mimics trusted companies to steal credentials through fake urgency or prize promises. Always verify sender address."
    },
    "whyItMatters": {
      "pt": "O phishing é a porta de entrada para 90% dos vírus e roubos de contas no mundo digital.",
      "en": "Phishing is the root vector for 90% of cyber attacks and credential thefts."
    },
    "funFact": {
      "pt": "A palavra \"Phishing\" escreve-se com \"Ph\" em homenagem aos primeiros piratas telefónicos dos anos 70, conhecidos como \"Phreaks\"!",
      "en": "The word phishing honors early phone hackers from the 1970s known as phreaks!"
    },
    "question": {
      "pt": "Qual dos seguintes sinais indica que um email é provavelmente uma tentativa de PHISHING?",
      "en": "Which sign indicates a likely phishing email?"
    },
    "options": [
      {
        "id": "a",
        "pt": "Vem de um colega da turma com o assunto da aula de TIC",
        "en": "From a classmate about ICT homework"
      },
      {
        "id": "b",
        "pt": "Pede com urgência que cliques num link para não perderes a conta ou promete prémios fabulosos",
        "en": "Urges clicking a link or promises free gifts"
      },
      {
        "id": "c",
        "pt": "Tem o logotipo da escola e fala da reunião de pais",
        "en": "School logo about parents meeting"
      },
      {
        "id": "d",
        "pt": "Não tem anexos nem links nenhuns",
        "en": "No links or attachments"
      }
    ],
    "correctOptionId": "b",
    "explanation": {
      "pt": "Urgência extrema e promessas inacreditáveis são as marcas registadas dos ataques de phishing para te enganar.",
      "en": "Manufactured panic and unbelievable offers are hallmarks of phishing."
    }
  }
];

/**
 * Calculates current ISO week number (1 to 52)
 */
export function getCurrentWeekNumber(date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return Math.min(52, Math.max(1, weekNo));
}

/**
 * Get the single weekly tip for the given week or current week
 */
export function getWeeklyTip(weekNumber?: number): WeeklyTicTip {
  const week = weekNumber ?? getCurrentWeekNumber();
  const clamped = Math.min(52, Math.max(1, week));
  return ALL_52_WEEKLY_TIPS.find((t) => t.week === clamped) || ALL_52_WEEKLY_TIPS[0];
}
