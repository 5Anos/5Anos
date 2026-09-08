import { ThemeDefinition } from '../types';

export const themeNavegarInternetData: ThemeDefinition = {
  id: 'navegar-internet',
  number: 6,
  title: {
    pt: 'Navegar na Internet',
    en: 'Internet Browsing',
  },
  tagline: {
    pt: 'Descobre como navegar, pesquisar e utilizar a Internet de forma segura.',
    en: 'Discover how to browse, search, and use the Internet safely.',
  },
  intro: {
    pt: 'A Internet é como uma biblioteca mundial gigantesca com milhares de milhões de páginas! Mas tal como numa grande cidade, é preciso saber caminhar pelas ruas certas, reconhecer os sinais de trânsito digital (como o protocolo HTTPS para ligações cifradas) e desviar-se de perigos e armadilhas online.',
    en: 'The Internet is like a colossal global library with billions of pages! But just like in a big city, you must know which streets to take, recognize digital signs (like HTTPS for encrypted links), and avoid traps.',
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
        pt: 'A Internet é uma grande rede que liga computadores e outros dispositivos. A Web é um dos serviços que funciona através da Internet. O navegador é o programa que usamos para aceder a essas páginas e sites.',
        en: 'The Internet is a large network connecting computers and other devices. The Web is one of the services that operates over the Internet. The browser is the application we use to access those web pages.',
      },
      icon: '🌐',
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
          'A Internet é uma grande rede que liga computadores e outros dispositivos. A Web é um dos serviços que funciona através da Internet.',
          'Navegador Web (Browser): é o programa que utilizamos para abrir e visualizar páginas da Internet (exemplos: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).',
          'Endereço URL: é o caminho exato de um site na Internet (exemplo: https://www.seguranet.pt). Funciona como a morada postal de uma casa!',
          'O protocolo HTTPS (sinalizado por um ícone de cadeado ou de definições de segurança) indica que a ligação entre o teu computador e o site é cifrada, protegendo os dados em trânsito contra escutas na rede.',
        ],
        en: [
          'The Internet is a large network connecting computers and other devices. The Web is one of the services that operates over the Internet.',
          'Web Browser: the application used to view websites (e.g., Chrome, Firefox, Edge, Safari).',
          'URL Address: the exact web address (e.g., https://www.seguranet.pt), just like a physical street address!',
          'HTTPS (often indicated by a padlock or site settings icon) ensures encrypted communication between your browser and the server.',
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
        pt: 'Sabias que a primeira página da World Wide Web foi criada por Tim Berners-Lee em 1991 no CERN (Suíça) e ainda hoje continua ativa e acessível online?',
        en: 'Did you know the very first website on the World Wide Web was created by Tim Berners-Lee in 1991 at CERN (Switzerland) and is still live today?',
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
            pt: 'O que indica a presença de "https://" no início do endereço de um site?',
            en: 'What does "https://" at the beginning of a website address indicate?',
          },
          options: {
            pt: [
              'A comunicação entre o teu navegador e o site viaja cifrada e protegida contra escutas',
              'O site está bloqueado pelo antivírus do computador',
              'O site tem permissão automática para descarregar ficheiros',
              'O site nunca tem erros e toda a informação é obrigatoriamente verdadeira',
            ],
            en: [
              'Communication between your browser and the site is encrypted against interception',
              'The website is blocked by the computer antivirus',
              'The website has automated permission to download files',
              'The website never has errors and all its content is verified fact',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! O HTTPS garante que os dados viajam cifrados. Atenção: isto protege o envio dos dados, mas não garante por si só que o conteúdo do site seja confiável.',
            en: 'Exactly! HTTPS ensures data in transit is encrypted, but does not guarantee the content is factual.',
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
        pt: 'Sabias que são realizadas milhares de milhões de pesquisas todos os dias nos motores de busca em todo o mundo para encontrar informação?',
        en: 'Did you know that billions of searches are conducted every day on search engines worldwide to find information?',
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
          pt: 'O Martim viu um anúncio com letras a piscar: "Clica aqui para descarregar o jogo novo grátis!". Quando ia clicar, reparou que o endereço do site era uma sequência estranha cheia de números e terminava em ".ru.xyz".',
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
              'Clicar no anúncio para verificar se a mensagem é verdadeira',
            ],
            en: [
              'Close the tab immediately without clicking or submitting any personal data',
              'Fill in all your personal details and parents’ credit card',
              'Share it with classmates so they can win too',
              'Click the ad to verify if the message is true',
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
      id: 'jogo-net-mc',
      themeId: 'navegar-internet',
      number: 1,
      title: { pt: '🔎 Escolhe as melhores palavras-chave', en: '🔎 Choose the Best Keywords' },
      shortDesc: { pt: 'Seleciona os termos ideais para encontrar informação rápida e precisa.', en: 'Select ideal terms to find swift and accurate information.' },
      icon: '🔎',
      durationMinutes: 4,
      points: 20,
      type: 'keywords_master',
      gameData: {
        type: 'mc',
        title: 'Escolhe as melhores palavras-chave',
        icon: '🔎',
        xp: 20,
        desc: 'Identifica a melhor estratégia de pesquisa na Internet para trabalhos escolares.',
        data: {
          questions: [
            {
              q: 'Se precisas de pesquisar sobre os vulcões em Portugal para um trabalho, qual é a melhor pesquisa?',
              opts: [
                'vulcões em Portugal características',
                'quero saber tudo sobre vulcões quentes perto de mim',
                'como fazer bolo de chocolate no forno',
                'onde comprar sapatos'
              ],
              c: 0,
              e: 'Usar palavras-chave diretas e específicas ajuda o motor de busca a encontrar exatamente o que precisas.'
            },
            {
              q: 'O que indica a presença de HTTPS num endereço web?',
              opts: [
                'Que a ligação entre o teu computador e o site é cifrada e protegida em trânsito',
                'Que o site tem jogos grátis garantidos',
                'Que ganhaste um prémio por visitar a página',
                'Que o computador está bloqueado'
              ],
              c: 0,
              e: 'O protocolo HTTPS cifra os dados transmitidos. Não garante, no entanto, que todas as informações do site sejam verdadeiras.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-net-tf',
      themeId: 'navegar-internet',
      number: 2,
      title: { pt: '⚡ Verdadeiro ou Falso: Navegar', en: '⚡ True or False: Browsing' },
      shortDesc: { pt: 'Distingue factos de mitos na navegação web.', en: 'Distinguish facts from myths in web browsing.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 15,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Verdadeiro ou Falso: navegar na Internet',
        icon: '⚡',
        xp: 15,
        desc: 'Classifica as afirmações sobre a segurança e pesquisa online.',
        data: {
          items: [
            { s: 'Tudo o que está publicado na Internet é sempre 100% verdadeiro.', a: false, e: 'Incorreto! Existem muitas notícias falsas (fake news) e informações erradas.' },
            { s: 'Os motores de busca ajudam-nos a encontrar páginas através de palavras-chave.', a: true, e: 'Correto! Google, Bing ou DuckDuckGo indexam milhares de milhões de páginas web.' },
            { s: 'Deves pedir autorização aos pais antes de descarregar ficheiros ou aplicações desconhecidas.', a: true, e: 'Correto! Previne a instalação de vírus e software malicioso.' }
          ]
        }
      }
    },
    {
      id: 'jogo-net-match',
      themeId: 'navegar-internet',
      number: 3,
      title: { pt: '🔗 Sinal de site suspeito?', en: '🔗 Suspicious Website Sign Match' },
      shortDesc: { pt: 'Associa cada indício à sua avaliação de segurança.', en: 'Match each indicator to its safety rating.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 20,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Sinal de site suspeito?',
        icon: '🔗',
        xp: 20,
        desc: 'Associa cada pista visual ao respetivo nível de risco online.',
        data: {
          pairs: [
            { left: 'Endereço com erros ortográficos no nome do banco', right: 'Site de phishing / burla' },
            { left: 'Ligação HTTPS com domínio oficial .gov.pt', right: 'Endereço institucional com ligação cifrada' },
            { left: 'Janela pop-up a gritar "Ganhou um telemóvel!"', right: 'Anúncio falso e enganador' },
            { left: 'Pedir palavra-passe para ver um vídeo engraçado', right: 'Tentativa de roubo de conta' }
          ]
        }
      }
    },
    {
      id: 'jogo-net-order',
      themeId: 'navegar-internet',
      number: 4,
      title: { pt: '📦 Desafio de pesquisa', en: '📦 Search Challenge Order' },
      shortDesc: { pt: 'Ordena os passos para realizar uma boa investigação escolar na web.', en: 'Order the steps for a thorough school web research.' },
      icon: '📦',
      durationMinutes: 4,
      points: 20,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Desafio de pesquisa',
        icon: '📦',
        xp: 20,
        desc: 'Coloca os passos de investigação digital pela ordem recomendada.',
        data: {
          items: [
            'Definir claramente o tema e o objetivo da pesquisa',
            'Escolher palavras-chave precisas no motor de busca',
            'Comparar a informação encontrada em pelo menos dois sites oficiais',
            'Registar as fontes e o autor para colocar na bibliografia'
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema5',
      themeId: 'navegar-internet',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Navegar na Internet', en: '🏆 Learning Quiz: Internet Browsing' },
      shortDesc: { pt: 'Avaliação final abrangente sobre o Tema 5.', en: 'Comprehensive final assessment on Topic 5.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 50,
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
          'Um motor de busca que organiza e indexa informação na rede',
          'O sistema operativo responsável pelo arranque do computador',
          'Uma aplicação antivírus concebida para eliminar ficheiros infetados',
        ],
        en: [
          'A program used to access, view, and navigate web pages (e.g., Chrome, Firefox, Edge)',
          'A search engine that indexes and organizes web content',
          'The operating system responsible for booting the computer',
          'An antivirus utility designed to delete infected files',
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
          'Excluir essas palavras de todos os resultados da pesquisa',
          'Traduzir automaticamente as palavras encontradas para outra língua',
          'Limitar os resultados a ficheiros multimédia do tipo vídeo',
        ],
        en: [
          'Search for the exact phrase with words in that precise order',
          'Exclude those words from all search results',
          'Automatically translate discovered terms into another language',
          'Restrict search results strictly to video files',
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
          'Uma fraude em que criminosos criam páginas ou mensagens falsas para roubar dados e palavras-passe',
          'Um programa para comprimir ficheiros pesados e poupar espaço',
          'Uma atualização do sistema operativo para melhorar o desempenho',
          'Uma ferramenta do navegador para guardar marcadores e histórico',
        ],
        en: [
          'A cyber scam where fake pages or messages attempt to steal passwords and personal info',
          'A program used to compress heavy files to save disk space',
          'An operating system update designed to enhance performance',
          'A browser tool used to store bookmarks and browsing history',
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
          'Clicando com o botão direito e escolhendo a opção de imprimir a página',
          'Abrindo o painel de controlo de som do sistema operativo',
          'Escrevendo o nome da ligação num documento de texto em branco',
        ],
        en: [
          'Hovering the mouse cursor over the link to preview the URL in the bottom status bar',
          'Right-clicking and choosing the print page option',
          'Opening the operating system sound control panel',
          'Writing down the link label in a blank text document',
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
          'Partilhar o link com todos os contactos para ter mais hipóteses',
        ],
        en: [
          'Close the tab immediately without clicking anything or entering info',
          'Type in your full name, phone number, and home address',
          'Ask parents for their credit card number to collect the award',
          'Share the link with all contacts to increase your odds',
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
          'Alterar a extensão do ficheiro para contornar os direitos de autor',
        ],
        en: [
          'Verify license terms (Creative Commons / public domain) and save source details for attribution',
          'Download any picture and claim you drew it',
          'Copy watermarked images without crediting creators',
          'Rename the file extension to bypass copyright',
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
          'Guardar permanentemente os ficheiros descarregados no disco rígido',
          'Impedir que o computador aceda a redes Wi-Fi públicas',
          'Enviar relatórios de navegação automáticos para o fabricante do computador',
        ],
        en: [
          'Keep a record of visited pages so you can rediscover them later',
          'Permanently save downloaded files onto the local hard drive',
          'Block the computer from connecting to public Wi-Fi networks',
          'Send automated usage diagnostics to the computer manufacturer',
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
          'Um filtro que impede que o navegador abra ficheiros de texto',
          'Um programa antivírus que analisa o código de cada página visitada',
          'Um registo temporário de palavras-passe guardadas no navegador',
        ],
        en: [
          'Saved shortcuts to quickly open favorite websites with a single click',
          'A browser filter preventing text documents from opening',
          'An antivirus component analyzing the code of visited pages',
          'A temporary storage table for passwords saved in the browser',
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
          'Um modo que limita o armazenamento local do histórico e de cookies da sessão naquele dispositivo',
          'Um modo que impede totalmente que os sites identifiquem a tua ligação à rede',
          'Uma funcionalidade que elimina automaticamente vírus do computador',
          'Uma opção que desativa permanentemente as ligações de rede do dispositivo',
        ],
        en: [
          'A mode that restricts local saving of browsing history and session cookies on that device',
          'A mode that prevents websites entirely from recognizing your network connection',
          'A feature that automatically removes viruses from the computer',
          'An option that permanently disables the device network connections',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A navegação privada limita o armazenamento local do histórico e de dados da sessão no dispositivo, embora os sites visitados continuem a identificar a ligação e não proporcione anonimato total.',
        en: 'Incognito mode restricts local storage of history and session data on the device, but does not provide complete anonymity on the Internet.',
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
          'Fazer pagamentos bancários e partilhar códigos ou palavras-passe confidenciais',
          'Desativar as definições de segurança do navegador para a página abrir mais depressa',
          'Partilhar a palavra-passe do teu correio com utilizadores da mesma rede',
        ],
        en: [
          'Avoid accessing bank accounts or typing sensitive credentials',
          'Execute bank transfers and share payment PINs',
          'Disable browser security warnings so web pages load faster',
          'Share your email password with other users on the network',
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
          'Um operador que exclui todos os resultados com domínios portugueses',
          'Um comando para medir a velocidade de descarregamento da ligação',
          'Uma instrução para guardar uma cópia do site no disco do computador',
        ],
        en: [
          'A filter that limits results strictly to websites from Portugal',
          'An operator excluding all Portuguese domain results',
          'A command to test network download speeds',
          'An instruction to save a local mirror of the website on disk',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O comando site: limita a pesquisa exclusivamente aos sites pertencentes àquele domínio ou extensão. Lembra-te: .pt identifica o domínio de topo de Portugal, mas não garante por si só que a informação seja verdadeira. Deves avaliar sempre a instituição, o autor, a data e o conteúdo.',
        en: 'The site: operator restricts results exclusively to the specified top-level or specific domain. Remember: .pt identifies Portugal’s country code domain, but does not guarantee on its own that the content is accurate. Always verify author, date, and institution.',
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
          'Um fornecedor comercial de serviços de acesso à Internet por cabo e fibra',
          'Uma aplicação de mensagens instantâneas para redes sociais',
          'Uma marca de computadores portáteis distribuídos pelas escolas',
        ],
        en: [
          'An official Ministry of Education project promoting safe and aware Internet use in schools',
          'A commercial Internet service provider for fiber and cable',
          'An instant messaging mobile application for social networks',
          'A commercial laptop brand distributed to schools',
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
