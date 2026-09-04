import { ThemeDefinition } from '../types';

export const themeNavegarInternetData: ThemeDefinition = {
  id: 'navegar-internet',
  number: 5,
  title: {
    pt: 'Navegar na Internet',
    en: 'Internet Browsing',
  },
  tagline: {
    pt: 'Descobre como navegar, pesquisar e utilizar a Internet de forma segura.',
    en: 'Discover how to browse, search, and use the Internet safely.',
  },
  intro: {
    pt: 'A Internet é como uma biblioteca mundial gigantesca com milhares de milhões de páginas! Mas tal como numa grande cidade, é preciso saber caminhar pelas ruas certas, reconhecer os sinais de trânsito digital (HTTPS, cadeado verde) e desviar-se de perigos e armadilhas online.',
    en: 'The Internet is like a colossal global library with billions of pages! But just like in a big city, you must know which streets to take, recognize digital road signs (HTTPS, green lock), and avoid traps.',
  },
  icon: '🌐',
  illustrationKey: 'navegar-internet',
  accentColor: 'sky',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'Internet, Web e navegador', en: 'Internet, Web and browser' },
      body: {
        pt: 'A Internet é a rede mundial que liga milhões de computadores. A Web (ou "www") é o conjunto de páginas e sites que podemos visitar através dela. O navegador é o programa que usamos para aceder a essas páginas, como o endereço/URL de cada site.',
        en: 'The Internet is the global network connecting millions of computers. The Web (or "www") is the universe of pages and websites we visit through it. The browser is the application we use to access these web pages via their unique URL addresses.',
      },
      icon: '🌐',
    },
    {
      eyebrow: { pt: 'Como funciona?', en: 'How it works' },
      h: { pt: 'Fazer uma boa pesquisa', en: 'Conducting effective searches' },
      body: {
        pt: 'Para pesquisar bem na Internet:<ul><li>Usa palavras-chave curtas e específicas, em vez de frases muito longas.</li><li>Compara vários resultados antes de confiar apenas no primeiro.</li><li>Verifica sempre a origem da informação (quem escreveu, que site é).</li><li>Desconfia de títulos muito exagerados ou sensacionalistas.</li></ul>',
        en: 'To research effectively online:<ul><li>Use concise, specific keywords rather than full-length conversational questions.</li><li>Compare multiple search results before trusting the top link.</li><li>Always verify the author and publication source.</li><li>Be cautious of sensationalist or exaggerated headlines.</li></ul>',
      },
      icon: '🔍',
    },
    {
      eyebrow: { pt: 'Atenção!', en: 'Attention!' },
      h: { pt: 'Nem tudo o que está online é verdade', en: 'Not everything online is true' },
      body: {
        pt: 'Qualquer pessoa pode publicar conteúdo na Internet, seja verdadeiro, falso ou incerto. Antes de confiares numa informação, confirma-a em mais do que uma fonte credível — como sites oficiais, notícias verificadas ou livros escolares.',
        en: 'Anyone can publish content on the web—true, misleading, or outright false. Before trusting any piece of information, cross-check it across multiple verified sources like official portals, reputable news outlets, or school textbooks.',
      },
      icon: '⚠️',
    },
    {
      eyebrow: { pt: 'Sabias que...?', en: 'Did you know...?' },
      h: { pt: 'Sinais de um site suspeito', en: 'Signs of a suspicious website' },
      body: {
        pt: 'Desconfia de sites com muitos erros, anúncios excessivos, pedidos estranhos de dados pessoais ou downloads inesperados. Esses são sinais de que o site pode não ser seguro.',
        en: 'Be wary of web pages riddled with spelling errors, aggressive pop-ups, unusual requests for personal data, or automatic downloads. These are classic indicators of potentially unsafe websites.',
      },
      icon: '🛡️',
    },
    {
      eyebrow: { pt: 'Vamos pensar', en: "Let's think" },
      h: { pt: 'Navegar com responsabilidade', en: 'Browsing responsibly' },
      body: {
        pt: 'Durante a navegação, protege os teus dados pessoais, evita clicar em anúncios ou downloads desconhecidos e mantém um comportamento seguro em qualquer site que visites.',
        en: 'While exploring the web, safeguard your personal information, avoid clicking on dubious ads or unrequested downloads, and practice safe digital habits wherever you go.',
      },
      icon: '🧭',
    },
  ],
  modules: [
    {
      id: 'net-o-que-e-navegador',
      themeId: 'navegar-internet',
      number: 1,
      title: {
        pt: 'A Web, o Navegador e os Endereços URL',
        en: 'The Web, Browsers, and URL Web Addresses',
      },
      shortDesc: {
        pt: 'Compreende como funcionam o Chrome, Firefox, Safari e a barra de endereços.',
        en: 'Understand how Chrome, Firefox, Safari, and address bars work.',
      },
      icon: '🧭',
      explanation: {
        pt: [
          'A Internet é a rede mundial de computadores ligados entre si. A World Wide Web (Web ou WWW) é o sistema de páginas e documentos que circulam nessa rede.',
          'Navegador Web (Browser): é o programa que utilizamos para abrir e visualizar páginas da Internet (exemplos: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).',
          'Endereço URL: é o caminho exato de um site na Internet (exemplo: https://www.seguranet.pt). Funciona como a morada postal de uma casa!',
          'O protocolo HTTPS com o símbolo do cadeado indica que a ligação entre o teu computador e aquele site está cifrada (segura contra espiões).',
        ],
        en: [
          'The Internet is the global network of computers. The Web (WWW) is the collection of web pages and media.',
          'Web Browser: the application used to view websites (e.g., Chrome, Firefox, Edge, Safari).',
          'URL Address: the exact web address (e.g., https://www.seguranet.pt), just like a physical street address!',
          'HTTPS with a padlock icon means communication between your computer and the site is encrypted.',
        ],
      },
      example: {
        title: {
          pt: 'A morada da escola na Internet',
          en: 'School web address',
        },
        scenario: {
          pt: 'O professor pediu para acederem a "https://area.escola.pt/ciencias". O João escreveu a morada diretamente na barra superior do navegador em vez de pesquisar no motor de busca.',
          en: 'The teacher asked students to visit "https://area.escola.pt/ciencias". João typed the address straight into the top URL bar.',
        },
        tip: {
          pt: 'Quando já conheces o endereço exato de um site, escrevê-lo na barra de endereços (URL) é mais rápido e evita clicar em links errados ou anúncios.',
          en: 'When you know the exact web address, typing it in the URL bar is faster and avoids misleading ads.',
        },
      },
      funFact: {
        pt: 'Sabias que a primeira página da Internet de sempre foi criada por Tim Berners-Lee em 1991 no CERN (Suíça) e ainda hoje continua ativa e acessível online?',
        en: 'Did you know the very first website ever made was created by Tim Berners-Lee in 1991 at CERN (Switzerland) and is still live today?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Qual é a diferença entre a barra de endereços do navegador e a caixa de pesquisa do Google?',
          en: 'What is the difference between the browser URL bar and the Google search box?',
        },
        clue: {
          pt: 'Uma serve para moradas completas, a outra serve para procurar palavras-chave.',
          en: 'One is for complete web addresses, the other searches keywords.',
        },
        reflection: {
          pt: 'Na barra de endereços colocas a morada direta (URL) para ir direto a um site. Na caixa de pesquisa escreves palavras ou dúvidas para que o motor de busca encontre várias opções de páginas.',
          en: 'The URL bar takes you directly to an exact address. The search box looks for keywords to recommend relevant pages.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-1',
          question: {
            pt: 'O que indica o "https://" e o símbolo de cadeado na barra de endereços de um site?',
            en: 'What does "https://" and the padlock icon in the browser address bar indicate?',
          },
          options: {
            pt: [
              'A comunicação entre o teu navegador e o site é encriptada e segura',
              'O site está bloqueado e é proibido entrar nele',
              'O computador ficou sem bateria',
              'O site foi desativado pela polícia',
            ],
            en: [
              'Communication between your browser and the website is encrypted and secure',
              'The website is blocked and forbidden to enter',
              'The computer has run out of battery',
              'The website was shut down by police',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! O protocolo HTTPS garante que os dados trocados estão cifrados e protegidos.',
            en: 'Exactly! HTTPS ensures data exchanged between browser and server is encrypted.',
          },
        },
      ],
    },
    {
      id: 'net-pesquisa-eficaz',
      themeId: 'navegar-internet',
      number: 2,
      title: {
        pt: 'Como Fazer Boas Pesquisas na Internet',
        en: 'How to Conduct Effective Web Searches',
      },
      shortDesc: {
        pt: 'Palavras-chave precisas, uso de aspas (" ") e evitar termos vagos.',
        en: 'Targeted keywords, quotation marks (" "), and avoiding vague searches.',
      },
      icon: '🔎',
      explanation: {
        pt: [
          'Os motores de busca (como o Google, Bing ou DuckDuckGo) são computadores gigantescos que analisam milhões de páginas para encontrar as melhores respostas.',
          'Escolher boas palavras-chave: em vez de escreveres frases longas como "olá eu queria saber qual é a capital de Portugal se faz favor", deves escrever termos essenciais: capital Portugal.',
          'Uso de aspas (" "): quando procuras uma expressão exata (como o título de um poema ou um nome próprio), coloca entre aspas: "Os Lusíadas" Camões.',
          'Filtros de pesquisa: podes filtrar os resultados por Imagens, Notícias, Vídeos ou limitar a data ao último ano para ter informação recente.',
        ],
        en: [
          'Search engines index billions of pages to retrieve the most relevant information.',
          'Choosing smart keywords: avoid conversational phrases; use core search terms: capital Portugal.',
          'Exact quotes (" "): use quotes around phrases to find exact wording: "Os Lusíadas" Camões.',
          'Search filters: narrow by Images, News, Videos, or date ranges for current findings.',
        ],
      },
      example: {
        title: {
          pt: 'A pesquisa sobre o lince-ibérico',
          en: 'Researching the Iberian Lynx',
        },
        scenario: {
          pt: 'A Leonor queria saber a alimentação do lince-ibérico em Portugal. Em vez de escrever "o que é que o gato selvagem come na floresta", pesquisou: "lince ibérico" alimentação Portugal.',
          en: 'Leonor wanted to study Iberian lynx diet in Portugal. Instead of typing "what does the wild cat eat in the forest", she searched: "lince ibérico" alimentação Portugal.',
        },
        tip: {
          pt: 'Com palavras-chave precisas, os primeiros resultados foram logo de sites oficiais de conservação da natureza com dados exatos!',
          en: 'With precise keywords, top results came straight from official wildlife conservation portals!',
        },
      },
      funFact: {
        pt: 'Sabias que o Google processa mais de 8 mil milhões e meio de pesquisas todos os dias em todo o mundo? Isso equivale a cerca de 99 000 pesquisas a cada segundo!',
        en: 'Did you know Google processes over 8.5 billion searches every day worldwide? That is roughly 99,000 queries every second!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se pesquisares apenas a palavra "banco", que tipo de resultados misturados podes encontrar?',
          en: 'If you search only the word "banco", what mixed results might appear?',
        },
        clue: {
          pt: 'A palavra tem mais do que um significado na língua portuguesa.',
          en: 'The word has multiple meanings in Portuguese.',
        },
        reflection: {
          pt: 'Podes encontrar bancos de jardim de madeira, bancos financeiros para guardar dinheiro e bancos de sangue de hospitais! Por isso deves ser específico: "banco de jardim madeira" ou "banco financeiro".',
          en: 'You might find park benches, monetary financial banks, or hospital blood banks! Always add context.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-2',
          question: {
            pt: 'Qual é a melhor pesquisa para encontrar a rotação da Terra para um trabalho de Ciências?',
            en: 'What is the best search query for a science project on Earth rotation?',
          },
          options: {
            pt: [
              'movimento rotação Terra ciências 5 ano',
              'olá computador podes dizer-me coisas sobre a terra girar muito obrigado',
              'coisas giras sobre o planeta que anda às voltas',
              'terra',
            ],
            en: [
              'movimento rotação Terra ciências 5 ano',
              'hello computer can you tell me stuff about earth spinning thanks a lot',
              'cool stuff about the spinning world',
              'earth',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! Usar palavras-chave concretas e o nível de escolaridade devolve os melhores recursos didáticos.',
            en: 'Spot on! Using specific subject keywords and grade levels retrieves the best educational resources.',
          },
        },
      ],
    },
    {
      id: 'net-seguranca-links',
      themeId: 'navegar-internet',
      number: 3,
      title: {
        pt: 'Reconhecer Links Falsos, Anúncios e Perigos Online',
        en: 'Spotting Fake Links, Malicious Ads, and Online Threats',
      },
      shortDesc: {
        pt: 'Phishing, janelas de prémios falsos ("Ganhaste um iPhone!") e descarregamentos suspeitos.',
        en: 'Phishing, fake prize pop-ups ("You won an iPhone!"), and suspicious downloads.',
      },
      icon: '🚦',
      explanation: {
        pt: [
          'Na Internet, nem tudo o que brilha ou promete prémios é verdade.',
          'Janelas de Aviso e Prémios Falsos: se aparecer um ecrã a dizer "Parabéns, és o visitante número 1 000 000 e ganhaste um telemóvel!", é 100% FRAUDE! Fecha logo a janela.',
          'Phishing: são sites ou mensagens fraudulentas que imitam páginas conhecidas para tentar roubar os teus dados ou a tua palavra-passe.',
          'Links Suspeitos: antes de clicares num link, passa o cursor do rato por cima sem carregar para ver o endereço real no canto inferior do ecrã.',
          'Descarregamentos (Downloads): nunca faças download de ficheiros (.exe, .scr, .zip) enviados por desconhecidos ou vindos de sites ilegais.',
        ],
        en: [
          'On the Internet, flashy prize banners are almost always dangerous scams.',
          'Fake Prize Pop-ups: "Congratulations, you are the 1,000,000th visitor and won a smartphone!" is 100% FRAUD! Close it immediately.',
          'Phishing: fraudulent look-alike pages designed to steal passwords and personal info.',
          'Suspicious Links: hover your mouse over a link before clicking to preview the real URL in the status bar.',
          'Downloads: never download unknown executables (.exe, .zip) from unauthorized portals.',
        ],
      },
      example: {
        title: {
          pt: 'O falso jogo gratuito do Martim',
          en: 'Martim’s fake free game',
        },
        scenario: {
          pt: 'O Martim viu um anúncio com letras a piscar: "Clica aqui para baixar o jogo novo grátis!". Quando ia clicar, reparou que o endereço do site era uma sequência estranha cheia de números e terminava em ".ru.xyz".',
          en: 'Martim saw a flashing banner: "Click here to download the new game free!". Before clicking, he noticed the strange URL full of random numbers ending in ".ru.xyz".',
        },
        tip: {
          pt: 'O Martim fechou a página de imediato e avisou o professor. Era uma tentativa de instalar um vírus (malware)!',
          en: 'Martim immediately closed the tab and told his teacher. It was a virus download attempt!',
        },
      },
      funFact: {
        pt: 'Sabias que o termo "Phishing" vem da palavra inglesa "fishing" (pesca), porque os criminosos digitais lançam um "isco" atrativo para ver quem morde o anzol?',
        en: 'Did you know "Phishing" derives from "fishing", because cybercriminals throw tempting bait hoping someone bites the hook?',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que deves fazer se o ecrã ficar vermelho a dizer "O teu computador está infetado! Liga já para este número de telefone"?',
          en: 'What should you do if a red pop-up screams "Your computer is infected! Call this number now"?',
        },
        clue: {
          pt: 'Isto chama-se "scam de falso suporte técnico" e quer enganar as pessoas.',
          en: 'This is called a tech support scam designed to frighten users.',
        },
        reflection: {
          pt: 'Nunca ligar para o número nem pagar nada! Fecha o navegador ou pede ajuda a um adulto para fechar a janela no Gestor de Tarefas.',
          en: 'Never call the number or pay anything! Close the browser or ask an adult to close the process in Task Manager.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-3',
          question: {
            pt: 'O que deves fazer se surgir uma janela a dizer "Ganhaste um telemóvel topo de gama! Insere aqui a tua morada e telefone"?',
            en: 'What should you do if a pop-up claims "You won a flagship phone! Enter your address and phone number"?',
          },
          options: {
            pt: [
              'Fechar imediatamente a janela sem clicar em nada nem fornecer qualquer dado',
              'Preencher logo com todos os dados pessoais e o cartão bancário dos pais',
              'Partilhar com todos os amigos da turma para eles ganharem também',
              'Telefonar para os correios a perguntar se a encomenda já chegou',
            ],
            en: [
              'Close the tab immediately without clicking or submitting any personal data',
              'Fill in all your personal details and parents’ credit card',
              'Share it with classmates so they can win too',
              'Call the post office to check for a package',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! É uma fraude comum (scam) e nunca deves partilhar dados pessoais.',
            en: 'Spot on! It is a common scam and you must never disclose personal details.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-net-escolhe-pesquisa',
      themeId: 'navegar-internet',
      number: 1,
      title: { pt: '🔎 Escolhe a melhor pesquisa', en: '🔎 Master the Best Search' },
      shortDesc: { pt: 'Seleciona as palavras-chave ideais para encontrar cada informação.', en: 'Select ideal keywords to locate specific facts.' },
      icon: '🔎',
      durationMinutes: 4,
      points: 20,
      type: 'keywords_master',
    },
    {
      id: 'jogo-net-navega-seguro',
      themeId: 'navegar-internet',
      number: 2,
      title: { pt: '🌐 Navega com segurança', en: '🌐 Safe Surfing Challenge' },
      shortDesc: { pt: 'Toma decisões corretas perante situações da web.', en: 'Make the right calls when navigating web pages.' },
      icon: '🌐',
      durationMinutes: 4,
      points: 20,
      type: 'safe_dangerous',
    },
    {
      id: 'jogo-net-seguro-suspeito',
      themeId: 'navegar-internet',
      number: 3,
      title: { pt: '🚦 Seguro ou suspeito?', en: '🚦 Safe or Suspicious?' },
      shortDesc: { pt: 'Inspeciona sites e endereços e deteta se são de confiança.', en: 'Inspect URLs and websites to verify legitimacy.' },
      icon: '🚦',
      durationMinutes: 4,
      points: 15,
      type: 'detect_phishing',
    },
    {
      id: 'jogo-net-deteta-perigo',
      themeId: 'navegar-internet',
      number: 4,
      title: { pt: '🕵️ Deteta o perigo digital', en: '🕵️ Spot the Online Hazard' },
      shortDesc: { pt: 'Descobre as armadilhas escondidas em anúncios falsos.', en: 'Discover hidden traps in deceptive advertisements.' },
      icon: '🕵️',
      durationMinutes: 5,
      points: 20,
      type: 'detect_phishing',
    },
    {
      id: 'jogo-net-link-seguro',
      themeId: 'navegar-internet',
      number: 5,
      title: { pt: '🔗 Link seguro ou suspeito?', en: '🔗 Safe or Fishy Link?' },
      shortDesc: { pt: 'Analisa links encurtados e extensões de domínio.', en: 'Analyze short links and deceptive domain extensions.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 15,
      type: 'detect_phishing',
    },
    {
      id: 'quiz-final-tema5',
      themeId: 'navegar-internet',
      number: 6,
      title: { pt: '🎯 Quiz Navegar na Internet', en: '🎯 Internet Browsing Master Quiz' },
      shortDesc: { pt: '16 perguntas completas com feedback instantâneo sobre navegação e pesquisa!', en: '16 complete questions with instant feedback on search and browsing!' },
      icon: '🎯',
      durationMinutes: 10,
      points: 80,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'net-q1',
      question: {
        pt: 'O que é um navegador web (browser)?',
        en: 'What is a web browser?',
      },
      options: {
        pt: [
          'Um programa utilizado para aceder, abrir e visualizar páginas da Internet (ex.: Chrome, Firefox, Edge)',
          'Uma peça de metal colocada dentro do disco rígido',
          'Um comando remoto de televisão sem fios',
          'Um tipo de cabo de eletricidade',
        ],
        en: [
          'A program used to access, view, and navigate web pages (e.g., Chrome, Firefox, Edge)',
          'A metal gear inside the computer hard drive',
          'A wireless television remote control',
          'A high-voltage electrical cable',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Um navegador web é a aplicação informática que descodifica e apresenta páginas da Web.',
        en: 'A web browser interprets HTML and web protocols to render websites on your screen.',
      },
    },
    {
      id: 'net-q2',
      question: {
        pt: 'O que significa a sigla URL?',
        en: 'What does URL stand for?',
      },
      options: {
        pt: [
          'Uniform Resource Locator — a morada ou endereço único de um recurso na Internet',
          'Unidade Rápida de Leitura de texto',
          'Utilizador Registado Livremente',
          'Upload Rápido de Livros digitais',
        ],
        en: [
          'Uniform Resource Locator — the unique address of a web resource',
          'Universal Reading Line of text',
          'User Registered Legally',
          'Upload Rate of Library books',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O URL é o endereço único que identifica a localização de um ficheiro ou site na rede.',
        en: 'A URL is the standard locator string identifying resources across the Internet.',
      },
    },
    {
      id: 'net-q3',
      question: {
        pt: 'Para que servem as aspas (" ") numa pesquisa num motor de busca?',
        en: 'What is the purpose of quotation marks (" ") in a search engine query?',
      },
      options: {
        pt: [
          'Procurar exatamente a frase ou conjunto de palavras na mesma ordem especificada',
          'Eliminar todos os resultados que tenham letras maiúsculas',
          'Traduzir o texto automaticamente para chinês',
          'Tornar a pesquisa muito mais lenta',
        ],
        en: [
          'Search for the exact phrase with words in that precise order',
          'Delete all uppercase results',
          'Automatically translate text to Chinese',
          'Make the search much slower',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As aspas dizem ao motor de busca para procurar a expressão exata, palavra por palavra.',
        en: 'Quotation marks enforce an exact-phrase match on indexed web pages.',
      },
    },
    {
      id: 'net-q4',
      question: {
        pt: 'Se quiseres procurar informação apenas de Portugal, que domínio de topo deves procurar?',
        en: 'If you want information specifically from Portugal, which top-level domain should you look for?',
      },
      options: {
        pt: [
          '.pt (ex.: dge.mec.pt ou seguranet.pt)',
          '.br',
          '.uk',
          '.es',
        ],
        en: [
          '.pt (e.g., dge.mec.pt or seguranet.pt)',
          '.br',
          '.uk',
          '.es',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O domínio de topo geográfico de Portugal é o .pt.',
        en: 'The country-code top-level domain for Portugal is .pt.',
      },
    },
    {
      id: 'net-q5',
      question: {
        pt: 'O que é o Phishing na Internet?',
        en: 'What is Phishing on the Internet?',
      },
      options: {
        pt: [
          'Uma fraude em que criminosos criam sites falsos para tentar roubar dados pessoais e palavras-passe',
          'Um jogo online onde se apanham peixes virtuais num lago',
          'Um antivírus gratuito fornecido pela escola',
          'Uma forma de acelerar a ligação de fibra ótica',
        ],
        en: [
          'A cyber scam where fake pages attempt to steal passwords and personal info',
          'A multiplayer game where you catch virtual fish in a lake',
          'A free antivirus provided by schools',
          'A way to speed up fiber connections',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Phishing é a tentativa enganosa de obter informações confidenciais fingindo ser uma entidade de confiança.',
        en: 'Phishing is social engineering where scammers impersonate trusted entities to capture credentials.',
      },
    },
    {
      id: 'net-q6',
      question: {
        pt: 'Como podes verificar para onde vai um link ANTES de clicares nele?',
        en: 'How can you check where a link leads BEFORE clicking it?',
      },
      options: {
        pt: [
          'Passando o cursor do rato por cima do link e observando o endereço real que surge no fundo do ecrã',
          'Clicando dez vezes o mais rápido possível',
          'Fechando os olhos e carregando na tecla Enter',
          'Desligando o ecrã do computador',
        ],
        en: [
          'Hovering the mouse cursor over the link to preview the URL in the bottom status bar',
          'Clicking it ten times as fast as possible',
          'Closing your eyes and pressing Enter',
          'Turning off the computer screen',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Passar o rato por cima (hover) mostra o destino verdadeiro do link na barra de estado do navegador.',
        en: 'Hovering reveals the actual destination URL in the browser’s bottom status preview.',
      },
    },
    {
      id: 'net-q7',
      question: {
        pt: 'O que deves fazer quando surge uma janela de anúncio a piscar a dizer "Ganhaste um prémio milionário!"?',
        en: 'What should you do when a blinking ad screams "You won a million dollar prize!"?',
      },
      options: {
        pt: [
          'Fechar a janela imediatamente sem clicar em qualquer botão ou fornecer dados',
          'Escrever o teu nome completo, número de telemóvel e morada de casa',
          'Pedir o número do cartão bancário aos pais para receber o prémio',
          'Acreditar que é verdade porque está escrito na Internet',
        ],
        en: [
          'Close the tab immediately without clicking anything or entering info',
          'Type in your full name, phone number, and home address',
          'Ask parents for their credit card number to collect the award',
          'Believe it because it is written on the web',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Estes falsos anúncios são armadilhas para roubar dados ou dinheiro.',
        en: 'These deceptive pop-ups are malicious scams designed to siphon money or data.',
      },
    },
    {
      id: 'net-q8',
      question: {
        pt: 'Qual destas extensões de ficheiro pode ser um programa executável perigoso se vier de fonte desconhecida?',
        en: 'Which file extension can be a dangerous executable if obtained from an unknown source?',
      },
      options: {
        pt: [
          '.exe ou .bat (ficheiros executáveis que podem correr comandos no computador)',
          '.txt (ficheiro de texto simples)',
          '.png (imagem)',
          '.mp3 (áudio)',
        ],
        en: [
          '.exe or .bat (executable files that run system commands)',
          '.txt (plain text)',
          '.png (image)',
          '.mp3 (audio)',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Ficheiros com extensão .exe executam programas e nunca devem ser abertos se forem de fontes duvidosas.',
        en: 'Executables (.exe, .bat) run code on your OS and can install malware if untrusted.',
      },
    },
    {
      id: 'net-q9',
      question: {
        pt: 'O que deves fazer quando queres fazer o download de uma fotografia para um trabalho escolar?',
        en: 'What should you do when downloading an image for school work?',
      },
      options: {
        pt: [
          'Verificar se a imagem é de uso livre (Creative Commons ou domínio público) e guardar a fonte para citar',
          'Fazer download de qualquer fotografia e dizer que foste tu que a desenhaste',
          'Copiar imagens com marcas de água e assinaturas de fotógrafos sem indicar o autor',
          'Comprar uma impressora nova',
        ],
        en: [
          'Verify license terms (Creative Commons / public domain) and save source details for attribution',
          'Download any picture and claim you drew it',
          'Copy watermarked images without crediting creators',
          'Buy a new printer',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Respeitar as licenças e guardar a fonte para citar é o procedimento ético e correto.',
        en: 'Respecting image licenses and crediting sources is ethical digital citizenship.',
      },
    },
    {
      id: 'net-q10',
      question: {
        pt: 'Qual é a função do histórico de navegação no browser?',
        en: 'What is the purpose of browser browsing history?',
      },
      options: {
        pt: [
          'Registar a lista de páginas web visitadas para que possas voltar a encontrá-las mais tarde',
          'Apagar automaticamente todos os ficheiros do disco rígido',
          'Impedir o computador de ligar à Internet',
          'Calcular a conta da eletricidade do final do mês',
        ],
        en: [
          'Keep a record of visited pages so you can rediscover them later',
          'Automatically wipe all files on disk',
          'Block the computer from accessing the Internet',
          'Calculate electrical power bills',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O histórico regista as páginas acedidas, permitindo rever sites interessantes encontrados anteriormente.',
        en: 'History logs visited URLs so you can find previously visited resources.',
      },
    },
    {
      id: 'net-q11',
      question: {
        pt: 'O que são os "Marcadores" ou "Favoritos" (Bookmarks) num navegador?',
        en: 'What are "Bookmarks" or "Favorites" in a browser?',
      },
      options: {
        pt: [
          'Um atalho guardado para aceder rapidamente às tuas páginas web favoritas com um só clique',
          'Canetas digitais de feltro para pintar o ecrã do monitor',
          'Vírus informáticos que estragam o rato',
          'Pastas com fotografias dos teus amigos da escola',
        ],
        en: [
          'Saved shortcuts to quickly open favorite websites with a single click',
          'Felt-tip pens to paint the glass screen',
          'Computer viruses damaging mouse buttons',
          'Folders with classmates photos',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os marcadores guardam endereços úteis (como o portal da escola) para acesso direto.',
        en: 'Bookmarks save frequently visited links for one-click access.',
      },
    },
    {
      id: 'net-q12',
      question: {
        pt: 'O que deves fazer se encontrares na Internet um conteúdo desagradável, violento ou que te faça sentir desconfortável?',
        en: 'What should you do if you encounter upsetting, violent, or uncomfortable content online?',
      },
      options: {
        pt: [
          'Fechar a página e contar de imediato a um adulto de confiança (pais ou professor)',
          'Partilhar o link com todos os colegas no grupo de mensagens',
          'Guardar em segredo e ficar assustado sozinho sem dizer a ninguém',
          'Responder ao agressor com insultos e ameaças',
        ],
        en: [
          'Close the page and inform a trusted adult (parents or teacher) immediately',
          'Forward the link to all classmates in group chats',
          'Keep it secret and remain frightened alone',
          'Reply with insults and aggressive threats',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Avisar imediatamente um adulto de confiança garante apoio e permite reportar a situação com segurança.',
        en: 'Informing a trusted adult ensures protection and allows proper reporting of harmful content.',
      },
    },
    {
      id: 'net-q13',
      question: {
        pt: 'O que é o modo de navegação anónima ou privada?',
        en: 'What is private / incognito browsing mode?',
      },
      options: {
        pt: [
          'Um modo onde o navegador não guarda o histórico nem os cookies naquele computador',
          'Um fato invisível que te torna invisível para toda a polícia na rua',
          'Um método para nunca pagar a conta da Internet em casa',
          'Um modo que desativa a eletricidade da escola',
        ],
        en: [
          'A mode where the browser does not save local history or cookies on that device',
          'An invisibility cloak hiding you from real-world authorities',
          'A trick to avoid paying for home broadband',
          'A switch that turns off school power',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A navegação privada não grava histórico nem cookies no dispositivo local, embora os sites continuem a ver a ligação.',
        en: 'Incognito mode doesn’t retain browsing history or cookies locally once closed.',
      },
    },
    {
      id: 'net-q14',
      question: {
        pt: 'Qual é a melhor atitude ao usar uma rede Wi-Fi pública e aberta (num café ou praça)?',
        en: 'What is the safest behavior on a public, open Wi-Fi network (at a café or square)?',
      },
      options: {
        pt: [
          'Não aceder a contas bancárias nem inserir dados pessoais sensíveis',
          'Fazer pagamentos bancários e partilhar senhas de cartões',
          'Desativar a palavra-passe do telemóvel para todos poderem ver',
          'Deixar o telemóvel ligado a enviar ficheiros privados para desconhecidos',
        ],
        en: [
          'Avoid accessing bank accounts or typing sensitive credentials',
          'Execute bank transfers and share payment PINs',
          'Remove screen lock PINs for strangers to see',
          'Leave the device sending private files to strangers',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Redes abertas podem ser intercetadas por terceiros, pelo que não deves realizar operações confidenciais nelas.',
        en: 'Unsecured public Wi-Fi traffic can be intercepted, so avoid sensitive transactions.',
      },
    },
    {
      id: 'net-q15',
      question: {
        pt: 'O que é um operador de pesquisa como "site:.pt" no Google?',
        en: 'What is a search operator like "site:.pt" in Google?',
      },
      options: {
        pt: [
          'Um filtro que limita os resultados de pesquisa apenas a sites com domínio de Portugal',
          'Uma ferramenta para apagar todos os sites de Portugal',
          'Um programa para traduzir sites para espanhol',
          'Um jogo online de construção de cidades',
        ],
        en: [
          'A filter that limits results strictly to websites from Portugal',
          'A tool to erase all Portuguese websites',
          'An app to translate sites to Spanish',
          'A city building multiplayer game',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O comando site: limita a pesquisa exclusivamente aos sites pertencentes àquele domínio ou extensão.',
        en: 'The site: operator restricts results exclusively to the specified top-level or specific domain.',
      },
    },
    {
      id: 'net-q16',
      question: {
        pt: 'O que é a linha SeguraNet em Portugal?',
        en: 'What is the SeguraNet initiative in Portugal?',
      },
      options: {
        pt: [
          'Um projeto oficial do Ministério da Educação que promove a utilização segura e informada da Internet nas escolas',
          'Uma loja que vende telemóveis e computadores usados',
          'Um jogo de futebol entre equipas de informática',
          'Uma empresa privada de entrega de encomendas',
        ],
        en: [
          'An official Ministry of Education project promoting safe and aware Internet use in schools',
          'A secondhand smartphone shop',
          'A soccer tournament between IT teams',
          'A private package courier company',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O SeguraNet apoia alunos, professores e famílias na utilização esclarecida e protegida do mundo digital.',
        en: 'SeguraNet supports students, educators, and families in navigating online spaces securely.',
      },
    },
  ],
};
