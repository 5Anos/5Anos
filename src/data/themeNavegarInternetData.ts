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
        pt: 'A Internet é uma rede que liga computadores no mundo inteiro. A Web é o conjunto de páginas que visitamos. O Navegador (ou Browser) é o programa que usamos para viajar na Web (como o Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari). Cada site tem uma morada única chamada URL (como https://www.seguranet.pt). .pt é o domínio de topo associado a Portugal. Quando tem "https://" e o símbolo do Cadeado 🔒, indica que a ligação ao site está protegida por cifragem.',
        en: 'The Internet is a global network connecting computers. The Web is the collection of pages we visit. The Web Browser is the app we use to explore the Web (like Chrome, Firefox, Edge, or Safari). Each website has a unique address called a URL (like https://www.seguranet.pt). .pt is the top-level domain associated with Portugal. When it has "https://" and a Padlock 🔒, it indicates that the connection to the site is protected by encryption.',
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
        pt: 'Para fazer um bom trabalho da escola: 1. Escolhe o tema; 2. Escolhe palavras-chave específicas e relacionadas com aquilo que procuras (ex.: vulcões Portugal); 3. As aspas podem ajudar a procurar uma expressão exata (ex.: "D. Afonso Henriques"); 4. Compara a informação em mais do que um site de confiança e anota as fontes. Lembra-te: nem tudo na Internet é verdade! A posição nos resultados de pesquisa (como estar em primeiro lugar) não significa por si só que a informação seja mais verdadeira ou de confiança. Confirma sempre quem é o autor, a data do artigo e se os dados batem certo com livros escolares.',
        en: 'For great school research: 1. Choose your topic; 2. Choose specific keywords related to what you are looking for (e.g. volcanoes Portugal); 3. Quotation marks can help search for an exact expression (e.g. "D. Afonso Henriques"); 4. Compare facts across multiple trusted sources and write down references. Remember: not everything online is true! The ranking in search results (like being in first place) does not by itself mean the information is more truthful or trustworthy. Always check the author, publishing date, and verify with school books.',
      },
      icon: '🔎',
    },
    {
      eyebrow: { pt: 'Armadilhas & Segurança', en: 'Traps & Safety' },
      h: { pt: 'Cuidado com Armadilhas, Anúncios e Falsos Prémios', en: 'Beware of Traps, Ads and Fake Prizes' },
      body: {
        pt: 'Cuidado com janelas a piscar a dizer "Ganhaste um telemóvel!" ou "Ganhaste um prémio!" — desconfia de mensagens que prometem prémios inesperados e pedem dados pessoais! Antes de clicares num link, passa o cursor do rato por cima para ver o endereço verdadeiro no fundo do ecrã. Um ficheiro .exe pode executar um programa: nunca abras ficheiros executáveis recebidos de fontes desconhecidas sem a ajuda de um adulto, nem forneças palavras-passe. E se vires algo feio ou desconfortável, fecha logo a janela e conta de imediato a um adulto (pais ou professor)!',
        en: 'Be careful with flashing pop-ups saying "You won a phone!" or "You won a prize!" — be suspicious of messages promising unexpected prizes! Before clicking a link, hover your mouse over it to preview the real URL. An .exe file can execute a program: never open executable files from unknown sources without help from an adult, or give away passwords. If you see something upsetting, close the page and tell a trusted adult right away!',
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
          'Endereço URL e terminação .pt: o URL é a morada de uma página (ex.: https://www.seguranet.pt). .pt é o domínio de topo associado a Portugal.',
          'HTTPS e o Cadeado 🔒: indicam que a ligação ao site está protegida por cifragem. Isso não significa que o site seja verdadeiro ou de confiança.',
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
          pt: 'Escrever diretamente um endereço que conheces pode ser mais rápido e pode ajudar-te a evitar resultados de pesquisa falsos ou enganadores.',
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
              'A ligação ao site está protegida por cifragem (o que não garante que o site seja verdadeiro ou de confiança)',
              'O site está avariado e não pode ser aberto',
              'O site pertence obrigatoriamente a um jogo de computador',
              'O computador vai desligar-se dentro de 5 minutos',
            ],
            en: [
              'The connection to the website is protected by encryption (which does not guarantee that the site is legitimate or trustworthy)',
              'The website is broken and cannot be opened',
              'The website must belong to a computer game',
              'The computer will shut down in 5 minutes',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'O HTTPS e o cadeado indicam que a ligação ao site está protegida por cifragem. Isso não significa que o site seja verdadeiro ou de confiança.',
            en: 'HTTPS and the padlock indicate that the connection to the site is protected by encryption. It does not mean the site is genuine or trustworthy.',
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
          'Escolhe palavras-chave específicas e relacionadas com aquilo que procuras (ex.: "vulcões Portugal características").',
          'O truque das aspas (" "): as aspas podem ajudar a procurar uma expressão exata (ex.: "D. Afonso Henriques").',
          'Passos para uma boa pesquisa escolar: 1. Definir o tema; 2. Escolher palavras-chave específicas; 3. Comparar em mais do que um site de confiança; 4. Anotar as fontes utilizadas.',
          'Nem tudo na Internet é verdade: notícias falsas (fake news) espalham boatos. A posição nos resultados de pesquisa (como estar em primeiro lugar) não significa por si só que a informação seja mais verdadeira ou de confiança. Confirma sempre quem é o autor, a data do artigo e se os dados batem certo com livros escolares ou sites oficiais.',
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
              'Para ajudar a procurar uma expressão exata',
              'Para apagar o histórico do navegador',
              'Para traduzir as palavras para francês',
              'Para desligar o motor de busca',
            ],
            en: [
              'To help search for an exact expression',
              'To delete browser history',
              'To translate terms into French',
              'To turn off the search engine',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'As aspas podem ajudar a procurar uma expressão exata.',
            en: 'Well done! Quotation marks can help search for an exact expression.',
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
          'Ficheiros Executáveis (.exe): não descarregues nem abras ficheiros executáveis (.exe) recebidos de fontes desconhecidas, porque podem conter software malicioso.',
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
            pt: 'É um anúncio falso e perigoso. Fechar logo é a atitude mais segura.',
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
              e: 'Escolhe palavras-chave específicas e relacionadas com aquilo que procuras para ajudar o motor de busca a encontrar exatamente o que precisas.'
            },
            {
              q: 'Se quiseres procurar a expressão exata "D. Afonso Henriques", o que deves usar?',
              opts: [
                'D. Afonso Henriques!!! (com pontos de exclamação)',
                'Escrever tudo em letras maiúsculas',
                '"D. Afonso Henriques" (entre aspas)',
                'Apagar o espaço entre as palavras'
              ],
              c: 2,
              e: 'As aspas podem ajudar a procurar uma expressão exata!'
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
            { s: 'O ".pt" no final de um endereço web é o domínio de topo associado a Portugal.', a: true, e: 'Verdadeiro! .pt é o domínio de topo associado a Portugal.' },
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
            { left: 'HTTPS e o Cadeado 🔒', right: 'Ligação protegida por cifragem (não garante que o site seja verdadeiro)' },
            { left: 'Janela a dizer "Ganhaste um telemóvel!"', right: 'Anúncio falso e perigoso (burla)' },
            { left: 'Ficheiro executável com extensão .exe', right: 'Pode executar um programa (nunca abrir sem um adulto se for de origem desconhecida)' },
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
        pt: 'O Tiago quer pesquisar informação sobre vulcões na Web para um trabalho de Ciências. De que tipo de programa necessita no computador para abrir e ver as páginas da Internet?',
        en: 'Tiago wants to research volcanoes on the Web for a Science project. What type of application does he need on his computer to open and view web pages?',
      },
      options: {
        pt: [
          'Um processador de texto offline',
          'Um navegador Web (browser), como o Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari',
          'Um editor de fotografia profissional',
          'Um reprodutor de música em formato MP3',
        ],
        en: [
          'An offline word processor software',
          'A web browser, such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari',
          'A professional photo editor',
          'An MP3 audio player',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'O navegador Web (browser) é a aplicação essencial que nos permite aceder, abrir e visualizar páginas e conteúdos na Internet.',
        en: 'A web browser is the essential application that enables us to access, open, and view pages and content on the Internet.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. O processador de texto serve para escrever documentos, não para abrir páginas da Web.',
          'Esta é a resposta correta! O navegador Web é o programa que interpreta o código e mostra os sites.',
          'Esta opção está errada. O editor de fotos serve apenas para editar imagens, não para navegar na Internet.',
          'Esta opção está errada. O reprodutor MP3 reproduz áudio e não acede a páginas Web.',
        ],
        en: [
          'Incorrect. A word processor is for writing documents, not opening web pages.',
          'Correct answer! The web browser is the application that renders and displays websites.',
          'Incorrect. A photo editor is for image manipulation, not web browsing.',
          'Incorrect. An MP3 player plays audio files and does not access websites.',
        ],
      },
    },
    {
      id: 'net-q2',
      question: {
        pt: 'A Leonor encontrou um artigo excelente no site do Museu de História e quer enviar o link ao seu grupo de trabalho. O que é o endereço URL que ela vai copiar da barra do navegador?',
        en: 'Leonor found a great article on the History Museum website and wants to send the link to her study group. What is the URL address she will copy from the browser bar?',
      },
      options: {
        pt: [
          'A chave secreta de encriptação do router Wi-Fi da escola',
          'A velocidade da ligação de fibra ótica da biblioteca',
          'A morada única que identifica exatamente onde fica essa página na Internet (ex.: https://www.museu.pt/historia)',
          'O número de série do monitor do computador',
        ],
        en: [
          'The secret Wi-Fi router encryption key at school',
          'The fiber optic connection speed in the library',
          'The unique address that identifies exactly where that page is located on the Internet (e.g. https://www.museu.pt/historia)',
          'The serial number of the computer monitor',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'O URL é a morada única e exata que permite a qualquer pessoa encontrar a página específica na Web.',
        en: 'A URL is the unique, exact web address allowing anyone to locate a specific page on the Internet.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. A chave Wi-Fi é a palavra-passe da rede e não o endereço de um site.',
          'Esta opção está errada. A velocidade da ligação é medida em Mbps e não tem nada a ver com o link do site.',
          'Esta é a resposta correta! O URL é o endereço único que nos leva diretamente a uma página da Web.',
          'Esta opção está errada. O número de série é um código físico do equipamento e não um endereço da Internet.',
        ],
        en: [
          'Incorrect. The Wi-Fi key is the network password, not a web address.',
          'Incorrect. Connection speed is measured in Mbps and is unrelated to a web link.',
          'Correct answer! The URL is the unique web address leading directly to a page.',
          'Incorrect. A serial number is physical hardware identification, not a web address.',
        ],
      },
    },
    {
      id: 'net-q3',
      question: {
        pt: 'A Maria vai entrar no portal de alunos da escola e repara que o endereço começa por "https://" e tem o ícone de um Cadeado 🔒. O que significa rigorosamente esta informação?',
        en: 'Maria is logging into the school student portal and notices the address starts with "https://" and has a Padlock 🔒 icon. What does this information specifically indicate?',
      },
      options: {
        pt: [
          'Que o site está bloqueado e a Maria não pode escrever dados',
          'Que o computador foi infetado por um vírus que bloqueou a navegação',
          'Que a ligação entre o computador da Maria e o site é encriptada e protegida, mas a Maria deve continuar a avaliar se a informação do site é confiável',
          'Que a página é 100% verdadeira e impossível de ter notícias falsas',
        ],
        en: [
          'That the site is locked and Maria cannot type any data',
          'That the computer has been infected by a virus blocking browsing',
          'That the connection between Maria’s computer and the site is encrypted and protected, but Maria must still evaluate if the site content is trustworthy',
          'That the page is 100% genuine and impossible to contain fake news',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'HTTPS e o cadeado garantem a segurança do transporte dos dados (encriptação), mas não garantem por si só que o conteúdo do site seja verdadeiro.',
        en: 'HTTPS and the padlock ensure data transport security (encryption), but do not guarantee by themselves that the content is genuine.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. O cadeado não significa bloqueio do utilizador, mas sim encriptação dos dados.',
          'Esta opção está errada. O cadeado 🔒 é um indicador de segurança de ligação e não um vírus.',
          'Esta é a resposta correta! O HTTPS encripta a transmissão, mas o utilizador deve continuar crítico em relação ao conteúdo.',
          'Esta opção está errada. Um site com HTTPS pode perfeitamente conter informações falsas ou ser uma burla.',
        ],
        en: [
          'Incorrect. The padlock does not mean user lockout, but data transport encryption.',
          'Incorrect. The 🔒 padlock is a connection security indicator, not a virus.',
          'Correct answer! HTTPS encrypts transmission, but users must still critically evaluate content.',
          'Incorrect. A site with HTTPS can still contain fake news or scams.',
        ],
      },
    },
    {
      id: 'net-q4',
      question: {
        pt: 'O Rodrigo está a pesquisar sobre monumentos nacionais e repara no site `www.monumentos.pt`. O que indica a terminação `.pt` no final do endereço?',
        en: 'Rodrigo is researching national monuments and notices the website `www.monumentos.pt`. What does the `.pt` ending at the end of the address indicate?',
      },
      options: {
        pt: [
          'Que o site só pode ser aberto em telemóveis',
          'Que é o domínio de topo geográfico associado a Portugal',
          'Que a página é de acesso pago obrigatoriamente',
          'Que o site está em fase de testes e vai ser apagado',
        ],
        en: [
          'That the website can only be opened on mobile phones',
          'That it is the geographic top-level domain associated with Portugal',
          'That the page requires mandatory paid access',
          'That the website is under testing and will be deleted',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'O sufixo .pt é o domínio de topo de código de país (ccTLD) reservado para entidades e sites associados a Portugal.',
        en: 'The .pt suffix is the country code top-level domain (ccTLD) assigned to entities and websites associated with Portugal.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. O sufixo .pt não restringe o tipo de dispositivo utilizado.',
          'Esta é a resposta correta! .pt identifica o domínio de topo nacional de Portugal.',
          'Esta opção está errada. A terminação do domínio não tem relação com pagamentos.',
          'Esta opção está errada. Sites em testes não usam .pt por essa razão.',
        ],
        en: [
          'Incorrect. The .pt suffix does not limit the device used.',
          'Correct answer! .pt identifies Portugal’s national top-level domain.',
          'Incorrect. Domain suffixes do not determine payment requirements.',
          'Incorrect. Test sites do not use .pt for that reason.',
        ],
      },
    },
    {
      id: 'net-q5',
      question: {
        pt: 'A Matilde usa o portal da sua escola todos os dias para ver os trabalhos de casa. Como pode guardar a página no navegador para voltar a abri-la com um único clique?',
        en: 'Matilde uses her school portal every day to check homework. How can she save the page in her browser to reopen it with a single click?',
      },
      options: {
        pt: [
          'Gravar uma fotografia da televisão com o telemóvel',
          'Adicionar a página aos Marcadores ou Favoritos (Bookmarks ⭐️) do navegador',
          'Desligar o computador sem fechar a janela para nunca sair da página',
          'Escrever o endereço num papel e colar no teclado',
        ],
        en: [
          'Take a photo of the TV with a mobile phone',
          'Add the page to the browser Bookmarks or Favorites (⭐️)',
          'Leave the computer running without closing the window forever',
          'Write the address on a paper and tape it to the keyboard',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Os Marcadores (Favoritos) criam atalhos práticos na barra do navegador para acederes rapidamente aos teus sites frequentes.',
        en: 'Bookmarks create convenient shortcuts in the browser bar for quick access to frequent sites.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Uma foto não permite clicar para navegar na Internet.',
          'Esta é a resposta correta! Guardar nos Marcadores cria um atalho de um clique na barra de ferramentas.',
          'Esta opção está errada. Deixar o computador sempre ligado gasta energia e não é prático.',
          'Esta opção está errada. Ter de reescrever a morada manualmente no papel faz perder tempo.',
        ],
        en: [
          'Incorrect. A photo is not clickable for web navigation.',
          'Correct answer! Saving to Bookmarks creates a quick one-click shortcut.',
          'Incorrect. Leaving the computer on constantly wastes electricity.',
          'Incorrect. Retyping addresses from paper wastes time.',
        ],
      },
    },
    {
      id: 'net-q6',
      question: {
        pt: 'O Martim precisa de pesquisar no Google o livro de leitura orientada "A Cavaleira da Dinamarca". Como deve escrever no motor de busca para procurar essa sequência exata de palavras?',
        en: 'Martim needs to search Google for his assigned reading book "A Cavaleira da Dinamarca". How should he type it into the search engine to look for that exact phrase?',
      },
      options: {
        pt: [
          'Escrever tudo em maiúsculas sem espaços',
          'Colocar a expressão exata entre aspas: `"A Cavaleira da Dinamarca"`',
          'Escrever a palavra com erros de ortografia para encontrar resultados diferentes',
          'Colocar um ponto de interrogação antes de cada palavra',
        ],
        en: [
          'Type everything in uppercase without spaces',
          'Place the exact phrase in quotation marks: `"A Cavaleira da Dinamarca"`',
          'Type with spelling errors to find different results',
          'Put a question mark before every word',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Utilizar aspas Numa pesquisa força o motor de busca a procurar aquelas palavras exatamente naquela ordem.',
        en: 'Using quotation marks in a search forces the search engine to look for those words in that exact sequence.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Tirar os espaços dificulta a pesquisa do motor de busca.',
          'Esta é a resposta correta! As aspas (" ") pesquisam a frase exata na ordem em que foi escrita.',
          'Esta opção está errada. Erros de ortografia produzem resultados incorretos.',
          'Esta opção está errada. Pontos de interrogação não ativam a pesquisa de frase exata.',
        ],
        en: [
          'Incorrect. Removing spaces hinders the search engine.',
          'Correct answer! Quotation marks (" ") search for the exact phrase sequence.',
          'Incorrect. Spelling mistakes lead to inaccurate results.',
          'Incorrect. Question marks do not trigger exact phrase search.',
        ],
      },
    },
    {
      id: 'net-q7',
      question: {
        pt: 'A Sofia pesquisou no Google e o primeiro site no topo dos resultados afirma que "os crocodilos voam". Estar em 1.º lugar nos resultados do Google garante que a informação é verdadeira?',
        en: 'Sofia searched Google and the top result claims "crocodiles fly". Does being ranked #1 on Google results guarantee the information is true?',
      },
      options: {
        pt: [
          'Sim, porque o Google só mostra sites 100% verdadeiros nos primeiros lugares',
          'Não; a posição nos resultados de pesquisa não garante veracidade e a Sofia deve avaliar a fonte e comparar com outros sites e livros',
          'Sim, porque os motores de busca corrigem automaticamente todas as informações falsas',
          'Não, porque todos os sites no Google são obrigatoriamente falsos',
        ],
        en: [
          'Yes, because Google only ranks 100% true websites at the top',
          'No; search ranking does not guarantee truthfulness, and Sofia should evaluate the source and cross-reference with other trusted sites and books',
          'Yes, because search engines automatically fix all incorrect information',
          'No, because all websites on Google are mandatory fake',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'A ordem dos resultados no Google depende de algoritmos e otimização. Estar no topo não significa que a afirmação seja verdadeira; é preciso pensamento crítico!',
        en: 'Search rankings depend on algorithms and SEO. Being at the top does not prove factuality; critical thinking is required!',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. O Google organiza resultados por algoritmos e não valida a verdade de cada afirmação.',
          'Esta é a resposta correta! A posição na pesquisa não garante veracidade; devemos comparar várias fontes.',
          'Esta opção está errada. Os motores de busca não corrigem o conteúdo dos sites.',
          'Esta opção está errada. Existem inúmeros sites credíveis e verdadeiros na Web.',
        ],
        en: [
          'Incorrect. Google ranks results via algorithms and does not verify the truth of every statement.',
          'Correct answer! Search position does not equal truth; cross-referencing multiple sources is essential.',
          'Incorrect. Search engines do not edit or correct external website content.',
          'Incorrect. There are many credible, accurate websites online.',
        ],
      },
    },
    {
      id: 'net-q8',
      question: {
        pt: 'O Afonso recebeu uma mensagem com um link azul que diz "Ver fotos da visita de estudo". Como pode o Afonso confirmar a morada exata para onde o link o vai levar ANTES de clicar?',
        en: 'Afonso received a message with a blue link saying "See field trip photos". How can Afonso check the exact destination address BEFORE clicking?',
      },
      options: {
        pt: [
          'Carregar na tecla Enter 5 vezes seguidas',
          'Desligar o monitor do computador',
          'Passar o cursor do rato por cima do link e verificar o endereço real que aparece na barra inferior do navegador',
          'Copiar o texto do link para um documento de texto em branco',
        ],
        en: [
          'Press the Enter key 5 times in a row',
          'Turn off the computer monitor',
          'Hover the mouse cursor over the link and inspect the real address appearing in the browser status bar',
          'Copy the link text into a blank text document',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Passar o cursor sobre um link mostra o destino real (URL) no canto inferior da janela, revelando se o link é legítimo ou suspeito.',
        en: 'Hovering the cursor over a link reveals its real destination URL in the lower browser corner, exposing suspicious links.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Premir Enter pode abrir a página sem teres verificado o endereço.',
          'Esta opção está errada. Desligar o ecrã não te mostra a morada do link.',
          'Esta é a resposta correta! Passar o rato por cima (hover) revela o URL verdadeiro antes de qualquer clique.',
          'Esta opção está errada. Copiar o texto do link pode não revelar o destino real por trás da hiperligação.',
        ],
        en: [
          'Incorrect. Pressing Enter might open the link without checking the address.',
          'Incorrect. Turning off the screen does not display the link URL.',
          'Correct answer! Hovering reveals the destination URL before clicking.',
          'Incorrect. Copying link display text may not reveal the underlying hyperlink destination.',
        ],
      },
    },
    {
      id: 'net-q9',
      question: {
        pt: 'Enquanto a Beatriz navegava na Web, surgiu uma janela pop-up a piscar: "PARABÉNS! Foste o visitante 1000 e ganhaste um telemóvel! Clica aqui para receber!". Como deve reagir?',
        en: 'While Beatriz was browsing the Web, a flashing pop-up window appeared: "CONGRATULATIONS! You are visitor 1000 and won a phone! Click here to claim!". How should she react?',
      },
      options: {
        pt: [
          'Preencher imediatamente com a morada da sua casa e número de telemóvel dos pais',
          'Pedir o cartão de crédito aos pais para pagar o envio do prémio',
          'Enviar a ligação para todos os seus colegas de turma',
          'Fechar a janela imediatamente sem clicar em nada nem fornecer dados pessoais, pois trata-se de um anúncio enganoso (scam)',
        ],
        en: [
          'Fill in her home address and parents’ mobile phone number immediately',
          'Ask parents for their credit card to pay for prize shipping',
          'Send the link to all her classmates',
          'Close the window immediately without clicking anything or providing personal data, as it is a scam ad',
        ],
      },
      correctIndex: 3,
      explanation: {
        pt: 'Janelas de prémios fáceis e urgentes são armadilhas para roubar dados ou dinheiro. Deve-se fechar a janela de imediato.',
        en: 'Pop-ups offering easy or urgent prizes are scams to steal data or money. Close the window immediately.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Dar dados pessoais a anúncios falsos expõe a família a riscos de segurança e privacidade.',
          'Esta opção está errada. Inserir dados bancários em janelas suspeitas resulta em perdas de dinheiro.',
          'Esta opção está errada. Partilhar o link espalha a burla pelos colegas da escola.',
          'Esta é a resposta correta! Fechar a janela sem clicar protege o teu computador e os teus dados.',
        ],
        en: [
          'Incorrect. Providing personal info to fake ads compromises family privacy and security.',
          'Incorrect. Entering payment details on suspicious pop-ups leads to financial loss.',
          'Incorrect. Sharing the link spreads the scam to classmates.',
          'Correct answer! Closing the window without clicking protects your device and data.',
        ],
      },
    },
    {
      id: 'net-q10',
      question: {
        pt: 'O Tomás estava a pesquisar imagens para um trabalho da escola e abriu sem querer uma página com imagens assustadoras e impróprias. Qual é o comportamento correto?',
        en: 'Tomás was searching for images for a school report and accidentally opened a page with scary, inappropriate images. What is the correct action?',
      },
      options: {
        pt: [
          'Guardar segredo por vergonha e continuar a olhar sozinho',
          'Fechar imediatamente o site e pedir ajuda a um adulto de confiança (pais ou professor)',
          'Partilhar o link com os colegas nas redes sociais para os assustar',
          'Escrever comentários com insultos na página',
        ],
        en: [
          'Keep it a secret out of shame and keep looking alone',
          'Close the site immediately and ask a trusted adult (parents or teacher) for help',
          'Share the link with classmates on social media to scare them',
          'Write insulting comments on the page',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Encontrar conteúdos inadequados não é culpa do aluno. Fechar a página e avisar um adulto garante apoio e ajuda a reportar a situação.',
        en: 'Encountering inappropriate content is not the student’s fault. Closing the page and telling an adult ensures safety and support.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Guardar segredo causa ansiedade desnecessária.',
          'Esta é a resposta correta! Fechar o site e falar com um adulto garante proteção e tranquilidade.',
          'Esta opção está errada. Partilhar conteúdos perturbadores magoa e assusta os colegas.',
          'Esta opção está errada. Interagir com o site pode expor o computador a riscos.',
        ],
        en: [
          'Incorrect. Keeping secrets causes unnecessary anxiety.',
          'Correct answer! Closing the site and speaking with an adult ensures protection.',
          'Incorrect. Sharing disturbing content upsets and scares peers.',
          'Incorrect. Interacting with bad sites can expose your computer to risks.',
        ],
      },
    },
  ],
};
