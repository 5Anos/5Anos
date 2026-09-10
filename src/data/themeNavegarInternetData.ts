import { ThemeDefinition } from '../types';

export const themeNavegarInternetData: ThemeDefinition = {
  id: 'navegar-internet',
  number: 6,
  title: {
    pt: 'Navegar na Internet',
    en: 'Internet Browsing',
  },
  tagline: {
    pt: 'Aprende a explorar a Web, a fazer boas pesquisas e a evitar armadilhas.',
    en: 'Learn how to explore the Web, conduct great searches, and avoid traps.',
  },
  intro: {
    pt: 'A Internet é como uma biblioteca mundial com milhões de páginas! Mas tal como numa cidade, é preciso saber andar pelas ruas certas, reconhecer moradas seguras e evitar armadilhas online.',
    en: 'The Internet is like a global library with millions of pages! But just like in a city, you need to know the right paths, recognize safe addresses, and avoid online traps.',
  },
  icon: '🌐',
  illustrationKey: 'navegar-internet',
  accentColor: 'sky',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'Navegador & URL', en: 'Browser & URL' },
      h: { pt: 'A Internet, a Web e o Navegador', en: 'Internet, Web and Browser' },
      body: {
        pt: 'A Internet é uma rede que liga computadores no mundo inteiro. A Web é o conjunto de páginas que visitamos. O Navegador (ou Browser) é o programa que usamos para viajar na Web (como o Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari). Cada site tem uma morada única chamada URL (como https://www.seguranet.pt). O ".pt" no final indica que o site é de Portugal! Quando tem "https://" e o símbolo do Cadeado 🔒, a ligação é segura e os dados viajam protegidos.',
        en: 'The Internet is a global network connecting computers. The Web is the collection of pages we visit. The Web Browser is the app we use to explore the Web (like Chrome, Firefox, Edge, or Safari). Each website has a unique address called a URL (like https://www.seguranet.pt). The ".pt" at the end means it is from Portugal! When it has "https://" and a Padlock 🔒, the connection is safe and encrypted.',
      },
      icon: '🌐',
    },
    {
      eyebrow: { pt: 'Endereços & Favoritos', en: 'Address & Bookmarks' },
      h: { pt: 'Barra de Endereços, Marcadores e Histórico', en: 'Address Bar, Bookmarks and History' },
      body: {
        pt: 'Se já sabes a morada de um site, escreve-a na Barra de Endereços no topo do navegador para ir direto. Se quiseres procurar informação, escreves palavras na Caixa de Pesquisa. Podes usar os Marcadores (ou Favoritos ⭐️) para guardar os teus sites preferidos (como a página da escola) e abri-los com um só clique! E se precisares de rever um site que viste antes, podes encontrá-lo no Histórico 🕒 de navegação.',
        en: 'If you already know the web address, type it in the top Address Bar to go directly there. If you want to search for info, type keywords in the Search Box. You can use Bookmarks (or Favorites ⭐️) to save your favorite school sites with one click! And if you want to find a page you visited earlier, look inside the browser History 🕒.',
      },
      icon: '🧭',
    },
    {
      eyebrow: { pt: 'Pesquisas & Fontes', en: 'Searches & Sources' },
      h: { pt: 'Como Fazer Boas Pesquisas e Avaliar a Informação', en: 'Smart Searches and Evaluating Information' },
      body: {
        pt: 'Para fazer um bom trabalho da escola: 1. Escolhe o tema; 2. Usa palavras-chave simples e diretas (ex.: vulcões Portugal); 3. Se procuras um nome ou frase exata, usa aspas (ex.: "D. Afonso Henriques"); 4. Compara a informação em mais do que um site de confiança e anota as fontes. Lembra-te: nem tudo na Internet é verdade! Confirma sempre quem é o autor, a data do artigo e se os dados batem certo com livros escolares.',
        en: 'For great school research: 1. Choose your topic; 2. Use simple and direct keywords (e.g. volcanoes Portugal); 3. Use quotation marks for exact names or phrases (e.g. "D. Afonso Henriques"); 4. Compare facts across multiple trusted sources and write down references. Remember: not everything online is true! Always check the author, publishing date, and verify with school books.',
      },
      icon: '🔎',
    },
    {
      eyebrow: { pt: 'Armadilhas & Segurança', en: 'Traps & Safety' },
      h: { pt: 'Cuidado com Armadilhas, Anúncios e Falsos Prémios', en: 'Beware of Traps, Ads and Fake Prizes' },
      body: {
        pt: 'Cuidado com janelas a piscar a dizer "Ganhaste um telemóvel!" ou "Ganhaste um prémio!" — são falsas (scams) para tentar roubar dados! Antes de clicares num link, passa o cursor do rato por cima para ver o endereço verdadeiro no fundo do ecrã. Nunca descarregues ficheiros estranhos (.exe) nem forneças palavras-passe. E se vires algo feio ou desconfortável, fecha logo a janela e conta de imediato a um adulto (pais ou professor)!',
        en: 'Be careful with flashing pop-ups saying "You won a phone!" or "You won a prize!" — they are fake scams trying to steal info! Before clicking a link, hover your mouse over it to preview the real URL at the bottom. Never download strange executable files (.exe) or share passwords. If you see something upsetting, close the page and tell a trusted adult (parents or teacher) right away!',
      },
      icon: '🛡️',
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
        pt: 'Como funcionam o Chrome, Firefox, Edge, o cadeado HTTPS e o domínio .pt.',
        en: 'How Chrome, Firefox, Edge, HTTPS padlocks, and .pt domains work.',
      },
      icon: '🧭',
      explanation: {
        pt: [
          'A Internet é a rede mundial que liga computadores. A Web é a coleção de páginas que podemos visitar.',
          'Navegador Web (Browser): é o programa que usas para abrir páginas na Internet (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).',
          'Barra de Endereços vs. Caixa de Pesquisa: na barra de endereços escreves a morada exata (URL) para ir direto ao site. Na caixa de pesquisa escreves palavras quando queres procurar.',
          'Endereço URL e terminação .pt: o URL é a morada de uma página (ex.: https://www.seguranet.pt). O ".pt" indica que é um site de Portugal!',
          'HTTPS e o Cadeado 🔒: significa que a ligação entre o teu computador e o site é segura e os dados viajam protegidos.',
          'Marcadores (Favoritos ⭐️) e Histórico 🕒: os marcadores guardam atalhos para os teus sites favoritos num clique; o histórico lista as páginas que visitaste.',
        ],
        en: [
          'The Internet is the global network of computers. The Web is the collection of pages we explore.',
          'Web Browser: the app you use to view websites (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).',
          'Address Bar vs. Search Box: type the exact address (URL) in the address bar to go straight there. Type keywords in the search box to search.',
          'URL Address and .pt domain: URL is the web address (e.g. https://www.seguranet.pt). The ".pt" indicates a website from Portugal!',
          'HTTPS and the Padlock 🔒: indicates an encrypted, secure connection keeping your data protected.',
          'Bookmarks (Favorites ⭐️) and History 🕒: bookmarks save shortcuts to your favorite sites with one click; history logs previously visited pages.',
        ],
      },
      example: {
        title: {
          pt: 'A morada da escola na Internet',
          en: 'School web address',
        },
        scenario: {
          pt: 'O professor pediu aos alunos para abrirem a página "https://area.escola.pt". O Diogo escreveu o endereço diretamente na Barra de Endereços no topo do navegador e guardou-o nos Marcadores (Favoritos) com a estrela para abrir sempre com um clique.',
          en: 'The teacher asked students to open "https://area.escola.pt". Diogo typed the URL straight into the top Address Bar and saved it to Bookmarks with a star to access it with a single click.',
        },
        tip: {
          pt: 'Escrever o endereço direto na barra de navegação é mais rápido e seguro do que pesquisar em motores de busca.',
          en: 'Typing the direct address into the browser bar is faster and avoids misleading search links.',
        },
      },
      funFact: {
        pt: 'Sabias que o primeiro website da história foi criado em 1991 por Tim Berners-Lee e ainda hoje pode ser visitado na Internet?',
        en: 'Did you know the world’s first website was built in 1991 by Tim Berners-Lee and can still be visited today?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Qual é a diferença entre a barra de endereços do navegador e a caixa de pesquisa do Google?',
          en: 'What is the difference between the browser address bar and the Google search box?',
        },
        clue: {
          pt: 'Uma serve para moradas completas que já conheces, a outra serve para procurar ideias e palavras-chave.',
          en: 'One is for complete addresses you already know, the other searches ideas and keywords.',
        },
        reflection: {
          pt: 'Na barra de endereços colocas a morada exata (URL) para ir logo ao site. Na caixa de pesquisa escreves dúvidas ou palavras para o motor de busca te mostrar várias páginas.',
          en: 'In the address bar you type the exact URL to go straight to a site. In the search box you type words to find relevant pages.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-1',
          question: {
            pt: 'O que indica a presença de "https://" e do símbolo de um cadeado no endereço de um site?',
            en: 'What does "https://" and a padlock icon indicate in a web address?',
          },
          options: {
            pt: [
              'A ligação entre o teu navegador e o site é segura e os dados viajam protegidos',
              'O site está avariado e não pode ser aberto',
              'O site pertence obrigatoriamente a um jogo de computador',
              'O computador vai desligar-se dentro de 5 minutos',
            ],
            en: [
              'The connection between your browser and the website is secure and data travels protected',
              'The website is broken and cannot be opened',
              'The website must belong to a computer game',
              'The computer will shut down in 5 minutes',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! O HTTPS e o cadeado indicam que a ligação é cifrada e segura.',
            en: 'Correct! HTTPS and the padlock mean the link is encrypted and secure.',
          },
        },
      ],
    },
    {
      id: 'net-pesquisa-eficaz',
      themeId: 'navegar-internet',
      number: 2,
      title: {
        pt: 'Como Fazer Boas Pesquisas e Avaliar a Informação',
        en: 'Smart Searches and Evaluating Information',
      },
      shortDesc: {
        pt: 'Palavras-chave, o truque das aspas (" ") e como detetar notícias falsas.',
        en: 'Keywords, quotation marks (" "), and spotting fake news.',
      },
      icon: '🔎',
      explanation: {
        pt: [
          'Os motores de pesquisa (como o Google) ajudam a encontrar páginas na Web através de palavras-chave.',
          'Escolhe palavras-chave curtas e diretas em vez de frases compridas (ex.: "vulcões Portugal características").',
          'O truque das aspas (" "): quando procuras uma frase ou nome exato, coloca entre aspas: "D. Afonso Henriques". O motor de busca procura as palavras exatamente juntas nessa ordem!',
          'Passos para uma boa pesquisa escolar: 1. Definir o tema; 2. Escolher palavras-chave; 3. Comparar em mais do que um site de confiança; 4. Anotar as fontes utilizadas.',
          'Nem tudo na Internet é verdade: notícias falsas (fake news) espalham boatos. Verifica sempre o autor, a data e confirma a informação em livros ou sites oficiais.',
        ],
        en: [
          'Search engines (like Google) help locate web pages using keywords.',
          'Use short and specific keywords instead of long phrases (e.g. "volcanoes Portugal features").',
          'Quotation marks (" ") trick: wrap exact phrases in quotes ("D. Afonso Henriques") to find words together in that exact order!',
          'Steps for great school research: 1. Define topic; 2. Pick keywords; 3. Compare multiple trusted sources; 4. Record references used.',
          'Not everything on the Internet is true: fake news spreads hoaxes. Always verify the author, publishing date, and confirm with school books or official portals.',
        ],
      },
      example: {
        title: {
          pt: 'A pesquisa de História da Leonor',
          en: 'Leonor’s History research',
        },
        scenario: {
          pt: 'A Leonor queria pesquisar sobre o primeiro rei de Portugal. Em vez de escrever uma frase longa, escreveu no motor de busca: "D. Afonso Henriques" nascimento. Encontrou rapidamente a página oficial de um museu e confirmou a data noutro livro da biblioteca.',
          en: 'Leonor wanted to research the first king of Portugal. Instead of typing a long sentence, she searched: "D. Afonso Henriques" nascimento. She quickly found an official museum page and verified it in a library book.',
        },
        tip: {
          pt: 'Usar aspas (" ") em nomes próprios ajuda a encontrar exatamente a pessoa ou assunto certo!',
          en: 'Using quotes (" ") on proper names helps find exactly the right person or topic!',
        },
      },
      funFact: {
        pt: 'Sabias que são feitas mais de 8 mil milhões de pesquisas todos os dias nos motores de busca de todo o mundo?',
        en: 'Did you know over 8 billion searches are made every day on search engines worldwide?',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que deves fazer se encontrares uma notícia na Internet a dizer que amanhã não há aulas em todo o país?',
          en: 'What should you do if you read an online article claiming school is cancelled nationwide tomorrow?',
        },
        clue: {
          pt: 'Lembra-te de verificar a fonte e perguntar a um adulto.',
          en: 'Remember to check the source and ask an adult.',
        },
        reflection: {
          pt: 'Nunca deves acreditar logo! Deves confirmar no site oficial da escola ou perguntar aos teus pais ou professores para ver se é uma notícia verdadeira ou um boato.',
          en: 'Never trust it right away! Verify on the school official website or ask parents/teachers to see if it is real or a hoax.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-2',
          question: {
            pt: 'Para que serve colocar uma expressão entre aspas (" ") numa pesquisa no motor de busca?',
            en: 'What is the purpose of placing a phrase in quotes (" ") in a search engine query?',
          },
          options: {
            pt: [
              'Para procurar exatamente aquelas palavras juntas e por essa ordem',
              'Para apagar o histórico do navegador',
              'Para traduzir as palavras para francês',
              'Para desligar o motor de busca',
            ],
            en: [
              'To search for those exact words together in that specific order',
              'To delete browser history',
              'To translate terms into French',
              'To turn off the search engine',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Muito bem! As aspas dizem ao motor de busca para encontrar a frase exata.',
            en: 'Well done! Quotes tell the search engine to match the exact phrase.',
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
        pt: 'Anúncios de falsos prémios, passar o rato nos links e ficheiros executáveis perigosos.',
        en: 'Fake prize pop-ups, link hovering, and dangerous executable files.',
      },
      icon: '🚦',
      explanation: {
        pt: [
          'Anúncios de Falsos Prémios: janelas a dizer "Ganhaste um telemóvel!" ou "Ganhaste 1000 euros!" são 100% falsas (scams). Fecha logo a janela e nunca dês dados.',
          'Passar o rato por cima do link: antes de clicares num link, passa o cursor por cima sem carregar. No canto inferior do ecrã podes ver a morada verdadeira para onde ele vai!',
          'Downloads e Ficheiros Executáveis (.exe): nunca faças download de ficheiros executáveis enviados por desconhecidos, pois podem instalar vírus.',
          'Phishing: mensagens ou páginas falsas que tentam enganar-te para roubar palavras-passe ou informações pessoais.',
          'Se vires algo desagradável ou assustador: fecha a página imediatamente e conta logo a um adulto de confiança (pais ou professor).',
        ],
        en: [
          'Fake Prize Ads: banners screaming "You won a smartphone!" or "You won money!" are 100% scams. Close them immediately and never enter details.',
          'Hover over links: before clicking, hover your cursor over the link to preview the real destination address at the bottom of the screen!',
          'Downloads and Executables (.exe): never download executable files from untrusted sources as they may carry malware.',
          'Phishing: fake websites trying to trick you into revealing passwords or personal data.',
          'If you see upsetting content: close the tab immediately and tell a trusted adult (parents or teacher) right away.',
        ],
      },
      example: {
        title: {
          pt: 'O falso prémio do Martim',
          en: 'Martim’s fake prize',
        },
        scenario: {
          pt: 'Ao abrir um site de jogos, apareceu uma janela vermelha a piscar a dizer: "Parabéns! Foste o visitante n.º 1 000 000 e ganhaste um telemóvel novo! Insere a tua morada e o cartão dos teus pais." O Martim reconheceu que era uma armadilha, não clicou em nada e fechou logo a janela.',
          en: 'While visiting a gaming site, a red flashing pop-up popped up: "Congratulations! You are visitor #1,000,000 and won a phone! Enter your address and credit card." Martim recognized it was a scam, clicked nothing, and closed the window right away.',
        },
        tip: {
          pt: 'Ninguém oferece telemóveis ou dinheiro de graça na Internet! Fecha sempre essas janelas.',
          en: 'No one gives away free phones or cash online! Always close these pop-ups.',
        },
      },
      funFact: {
        pt: 'Sabias que a palavra "Phishing" vem da palavra inglesa "pesca" (fishing), porque os burlões lançam um isco falso à espera que alguém morda o anzol?',
        en: 'Did you know "Phishing" comes from the word "fishing", because scammers cast a fake lure hoping someone bites?',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que deves fazer se um amigo te enviar um link estranho com um ficheiro chamado "jogo-secreto.exe"?',
          en: 'What should you do if a friend sends a weird link with a file called "secret-game.exe"?',
        },
        clue: {
          pt: 'Lembra-te do perigo dos ficheiros com extensão .exe e pergunta ao teu amigo se foi mesmo ele quem enviou.',
          en: 'Remember the danger of .exe files and ask your friend if they really sent it.',
        },
        reflection: {
          pt: 'Nunca deves abrir ficheiros .exe sem autorização de um adulto, porque a conta do teu amigo pode ter sido pirateada ou ter um vírus.',
          en: 'Never open .exe files without adult approval, as your friend’s account could be hacked or infected.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-3',
          question: {
            pt: 'O que deves fazer se surgir uma janela a dizer que ganhaste um prémio e a pedir a tua morada?',
            en: 'What should you do if a pop-up claims you won a prize and asks for your address?',
          },
          options: {
            pt: [
              'Fechar imediatamente a janela sem clicar em botões nem fornecer qualquer dado',
              'Preencher logo todos os teus dados e o número de telefone dos pais',
              'Enviar o link para todos os teus colegas de turma',
              'Ligar para o número que aparece no ecrã a pedir o prémio',
            ],
            en: [
              'Close the window immediately without clicking buttons or entering personal data',
              'Fill in all your details and parents’ phone number right away',
              'Send the link to all your classmates',
              'Call the phone number on screen to claim the prize',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! É um anúncio falso e perigoso. Fechar logo é a atitude mais segura.',
            en: 'Spot on! It is a fake and dangerous pop-up. Closing it right away is the safest choice.',
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
      title: { pt: '🔎 Escolhe as Melhores Palavras-chave', en: '🔎 Choose the Best Keywords' },
      shortDesc: { pt: 'Seleciona os termos ideais e o uso de aspas para pesquisar na Web.', en: 'Select ideal terms and quotes to search the Web.' },
      icon: '🔎',
      durationMinutes: 4,
      points: 100,
      type: 'keywords_master',
      gameData: {
        type: 'mc',
        title: 'Escolhe as melhores palavras-chave',
        icon: '🔎',
        xp: 100,
        desc: 'Identifica a melhor estratégia de pesquisa na Internet para trabalhos escolares.',
        data: {
          questions: [
            {
              q: 'Se precisas de pesquisar sobre os vulcões em Portugal para um trabalho de Ciências, qual é a melhor pesquisa?',
              opts: [
                'olá computador mostra-me coisas bonitas da terra',
                'vulcões Portugal características',
                'vulcão',
                'quero saber tudo sobre vulcões quentes perto de mim por favor'
              ],
              c: 1,
              e: 'Palavras-chave curtas, diretas e específicas ajudam o motor de busca a encontrar exatamente o que precisas.'
            },
            {
              q: 'Se quiseres procurar a expressão exata "D. Afonso Henriques" com as palavras juntas por essa ordem, o que deves usar?',
              opts: [
                'D. Afonso Henriques!!! (com pontos de exclamação)',
                'Escrever tudo em letras maiúsculas',
                '"D. Afonso Henriques" (entre aspas)',
                'Apagar o espaço entre as palavras'
              ],
              c: 2,
              e: 'Colocar uma expressão entre aspas ("exemplo") faz com que o motor de busca encontre exatamente as palavras juntas por essa ordem!'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-net-tf',
      themeId: 'navegar-internet',
      number: 2,
      title: { pt: '⚡ Verdadeiro ou Falso: Navegar na Internet', en: '⚡ True or False: Browsing the Web' },
      shortDesc: { pt: 'Testa os teus conhecimentos sobre segurança e navegação na Web.', en: 'Test your knowledge on web security and browsing.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Verdadeiro ou Falso: Navegar na Internet',
        icon: '⚡',
        xp: 100,
        desc: 'Classifica cada afirmação sobre a navegação e segurança online.',
        data: {
          items: [
            { s: 'Tudo o que está publicado na Internet é sempre 100% verdadeiro.', a: false, e: 'Falso! Na Internet existem muitas notícias falsas e boatos. Devemos sempre confirmar em fontes confiáveis.' },
            { s: 'O ".pt" no final de um endereço web indica que o site é de Portugal.', a: true, e: 'Verdadeiro! O .pt é o domínio geográfico oficial de Portugal.' },
            { s: 'Se aparecer uma janela a dizer que ganhaste um prémio, deves preencher logo com a tua morada.', a: false, e: 'Falso! Janelas de falsos prémios são burlas (scams). Deves fechar a janela imediatamente.' },
            { s: 'Os Marcadores (Favoritos) servem para guardar as tuas páginas preferidas e abri-las com um só clique.', a: true, e: 'Verdadeiro! Os marcadores guardam atalhos úteis como o site da escola.' }
          ]
        }
      }
    },
    {
      id: 'jogo-net-match',
      themeId: 'navegar-internet',
      number: 3,
      title: { pt: '🔗 Sinais de Segurança e Navegação', en: '🔗 Web Safety & Browsing Signs' },
      shortDesc: { pt: 'Liga cada elemento da navegação à sua função ou significado.', en: 'Match each browsing element to its role or meaning.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 100,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Sinais de Segurança e Navegação',
        icon: '🔗',
        xp: 100,
        desc: 'Associa cada conceito digital ao seu significado correto.',
        data: {
          pairs: [
            { left: 'HTTPS e o Cadeado 🔒', right: 'Ligação segura e protegida' },
            { left: 'Janela a dizer "Ganhaste um telemóvel!"', right: 'Anúncio falso e perigoso (burla)' },
            { left: 'Ficheiro executável com extensão .exe', right: 'Pode conter vírus, não abrir sem adulto' },
            { left: 'Histórico de navegação 🕒', right: 'Lista das páginas visitadas' }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema6',
      themeId: 'navegar-internet',
      number: 4,
      title: { pt: '🏆 Quiz de Aprendizagem: Navegar na Internet (10 Questões)', en: '🏆 Learning Quiz: Internet Browsing (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas claras sobre o Tema 6.', en: 'Comprehensive final assessment with 10 clear questions on Topic 6.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 100,
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
          'O botão que desliga o monitor do computador',
          'Um programa utilizado para abrir e ver páginas na Internet (ex.: Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari)',
          'Um vírus perigoso que apaga trabalhos escolares',
          'O cabo que liga o computador à tomada elétrica',
        ],
        en: [
          'The physical power button on the computer monitor',
          'A program used to open and view web pages (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari)',
          'A dangerous virus that erases homework',
          'The electrical power cord of the computer',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'O navegador web é o programa que usamos para explorar e abrir os sites na Internet.',
        en: 'A web browser is the application we use to explore and display web pages.',
      },
    },
    {
      id: 'net-q2',
      question: {
        pt: 'O que é o endereço URL de um site?',
        en: 'What is a website URL address?',
      },
      options: {
        pt: [
          'A palavra-passe secreta do teu computador',
          'A marca do teclado do computador',
          'A morada única de uma página na Internet (exemplo: https://www.seguranet.pt)',
          'O número de jogos instalados no telemóvel',
        ],
        en: [
          'The secret password of your computer',
          'The brand name of the keyboard',
          'The unique address of a web page on the Internet (e.g. https://www.seguranet.pt)',
          'The number of games installed on the phone',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'O URL é a morada que identifica exatamente onde fica uma página na Web.',
        en: 'A URL is the unique address identifying a web page location on the Internet.',
      },
    },
    {
      id: 'net-q3',
      question: {
        pt: 'O que indica a presença de "https://" e do símbolo de um Cadeado 🔒 no endereço de um site?',
        en: 'What does "https://" and a Padlock 🔒 symbol mean in a website address?',
      },
      options: {
        pt: [
          'O site está bloqueado e ninguém pode ver nada',
          'O computador precisa de ser formatado',
          'A ligação à Internet foi desligada',
          'A ligação entre o teu computador e o site é segura e os dados viajam protegidos',
        ],
        en: [
          'The site is locked and no one can see anything',
          'The computer must be wiped and formatted',
          'The Internet connection has been shut down',
          'The connection between your computer and the site is secure and data is protected',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'O HTTPS e o cadeado indicam uma ligação segura e cifrada.',
        en: 'HTTPS and the padlock represent a secure, encrypted connection.',
      },
    },
    {
      id: 'net-q4',
      question: {
        pt: 'O que significa a terminação ".pt" no final do endereço de um site?',
        en: 'What does the ".pt" ending mean at the end of a web address?',
      },
      options: {
        pt: [
          'Indica que o site é apenas para telemóveis',
          'Indica que o site é de Portugal',
          'Significa que o site é proibido para menores',
          'Significa que a página está em construção',
        ],
        en: [
          'It means the website is only for mobile phones',
          'It indicates that the website is from Portugal',
          'It means the website is forbidden for minors',
          'It means the page is under construction',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'O .pt é o domínio oficial de topo de Portugal.',
        en: '.pt is the official top-level country domain for Portugal.',
      },
    },
    {
      id: 'net-q5',
      question: {
        pt: 'Para que servem os "Marcadores" ou "Favoritos" (Bookmarks ⭐️) num navegador?',
        en: 'What are "Bookmarks" or "Favorites" (⭐️) used for in a browser?',
      },
      options: {
        pt: [
          'Mudar a cor de fundo do ecrã',
          'Apagar todos os trabalhos da escola',
          'Guardar atalhos para os teus sites favoritos (como a página da escola) e abri-los com um só clique',
          'Aumentar o volume das colunas de som',
        ],
        en: [
          'Change screen wallpaper color',
          'Erase all school assignments',
          'Save shortcuts to favorite websites (like the school portal) to open them in one click',
          'Turn up speaker volume',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Os marcadores guardam atalhos para acederes rapidamente às páginas que mais usas.',
        en: 'Bookmarks store shortcuts so you can quickly open your most-used websites.',
      },
    },
    {
      id: 'net-q6',
      question: {
        pt: 'Para que serve colocar uma frase entre aspas (" ") numa pesquisa no Google?',
        en: 'Why place a phrase in quotes (" ") when searching on Google?',
      },
      options: {
        pt: [
          'Para traduzir a frase para inglês',
          'Para eliminar os resultados que tenham essas palavras',
          'Para desligar o computador',
          'Para encontrar páginas que tenham exatamente essa expressão com as palavras juntas por essa ordem',
        ],
        en: [
          'To translate the phrase into English',
          'To remove search results containing those words',
          'To shut down the computer',
          'To find pages containing that exact phrase with words together in that precise order',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'As aspas (" ") fazem o motor de busca procurar a frase exata, palavra por palavra.',
        en: 'Quotation marks force search engines to match the exact phrase word for word.',
      },
    },
    {
      id: 'net-q7',
      question: {
        pt: 'Como podes saber se uma informação que encontraste na Internet para um trabalho escolar é de confiança?',
        en: 'How do you check if online information for a school project is trustworthy?',
      },
      options: {
        pt: [
          'Acreditar logo no primeiro resultado que aparecer no topo sem ler',
          'Verificar quem escreveu, a data do artigo e comparar a informação com outras fontes confiáveis e livros',
          'Acreditar apenas se o site tiver muitas cores e animações a piscar',
          'Copiar tudo sem pensar porque tudo na Internet é sempre 100% verdade',
        ],
        en: [
          'Trust the very first top link without reading',
          'Check the author, article date, and compare information across trusted sources and books',
          'Only trust pages with flashing colors and animations',
          'Copy everything blindly because everything online is always 100% true',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Deves ter espírito crítico: verificar a autoria, a data e comparar em vários sítios credíveis.',
        en: 'Use critical thinking: check the author, date, and cross-reference with credible sources.',
      },
    },
    {
      id: 'net-q8',
      question: {
        pt: 'Como podes verificar para onde vai um link ANTES de clicares nele?',
        en: 'How can you verify where a link leads BEFORE clicking it?',
      },
      options: {
        pt: [
          'Desligando o monitor e voltando a ligar',
          'Carregando na tecla de espaço 10 vezes',
          'Passando o cursor do rato por cima do link e olhando para o endereço real que surge no fundo do ecrã',
          'Escrevendo o link num papel em branco',
        ],
        en: [
          'Turning the monitor off and on again',
          'Pressing the spacebar 10 times',
          'Hovering the mouse cursor over the link and checking the real URL at the bottom of the screen',
          'Writing the link on a blank paper',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Passar o rato por cima do link mostra a morada verdadeira no canto inferior do navegador.',
        en: 'Hovering over a link displays the actual destination URL in the browser preview.',
      },
    },
    {
      id: 'net-q9',
      question: {
        pt: 'O que deves fazer se aparecer uma janela a dizer "Ganhaste um telemóvel novo! Clica aqui e insere a tua morada"?',
        en: 'What should you do if a pop-up claims "You won a new smartphone! Click here and enter your address"?',
      },
      options: {
        pt: [
          'Escrever logo a tua morada, nome completo e número de telefone',
          'Pedir o cartão de crédito aos pais para receber o prémio',
          'Enviar o anúncio para todos os teus colegas',
          'Fechar a janela imediatamente sem clicar nem dar qualquer dado pessoal',
        ],
        en: [
          'Type in your address, full name, and phone number right away',
          'Ask parents for their credit card to claim the prize',
          'Forward the ad to all your classmates',
          'Close the window immediately without clicking or giving any personal data',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'Estes falsos prémios são armadilhas para enganar as pessoas. Nunca deves clicar nem partilhar dados.',
        en: 'Fake prize pop-ups are malicious scams. Never click them or give personal information.',
      },
    },
    {
      id: 'net-q10',
      question: {
        pt: 'O que deves fazer se encontrares na Internet um conteúdo feio, assustador ou que te faça sentir desconfortável?',
        en: 'What should you do if you encounter upsetting or uncomfortable content online?',
      },
      options: {
        pt: [
          'Guardar segredo e ficar assustado sozinho',
          'Fechar imediatamente a página e contar logo a um adulto de confiança (pais ou professor)',
          'Partilhar com todos os amigos nas redes sociais',
          'Responder com mensagens insultuosas',
        ],
        en: [
          'Keep it a secret and stay scared alone',
          'Close the page immediately and inform a trusted adult (parents or teacher) right away',
          'Share it with all friends on social networks',
          'Reply with insulting messages',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Contar a um adulto de confiança garante apoio imediato e ajuda a manter a tua segurança na Internet.',
        en: 'Informing a trusted adult ensures immediate support and protects your online safety.',
      },
    },
  ],
};
