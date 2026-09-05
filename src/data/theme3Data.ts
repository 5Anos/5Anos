import { ThemeDefinition } from '../types';

export const theme3Data: ThemeDefinition = {
  id: 'pesquisa-informacao',
  number: 3,
  title: {
    pt: 'Pesquisa de Informação',
    en: 'Information Search',
  },
  tagline: {
    pt: 'Aprende a pesquisar na Internet com eficácia, a avaliar fontes e a utilizar a informação com responsabilidade.',
    en: 'Learn to search the web effectively, evaluate sources, and use information responsibly.',
  },
  intro: {
    pt: 'Neste tema do 5.º ano, vais tornar-te um verdadeiro detetive da informação digital: saber usar motores de busca, escolher as melhores palavras-chave, usar aspas e filtros, avaliar se um site é fiável e respeitar sempre os direitos de autor nos teus trabalhos escolares.',
    en: 'In this 5th grade theme, you will become a true digital information detective: learn to use search engines, choose the best keywords, use quotation marks and filters, verify whether a site is reliable, and always respect copyright in your school projects.',
  },
  icon: 'Search',
  accentColor: 'blue',
  badgeCount: 2,
  modules: [
    // CONTEÚDO 1
    {
      id: 'pesquisa-o-que-e',
      themeId: 'pesquisa-informacao',
      number: 1,
      icon: 'Compass',
      title: {
        pt: 'O que é pesquisar informação?',
        en: 'What is searching for information?',
      },
      shortDesc: {
        pt: 'Descobre a diferença entre navegar e pesquisar com um objetivo claro, e por que razão isso é essencial para a escola.',
        en: 'Discover the difference between browsing and searching with a clear objective, and why it is vital for school.',
      },
      whatYouWillLearn: {
        pt: [
          'A diferença entre navegar sem rumo e pesquisar com um propósito;',
          'O que significa ter uma pergunta ou objetivo claro de pesquisa;',
          'A importância de encontrar respostas fiáveis para os trabalhos escolares;',
          'Como poupar tempo e esforço com uma estratégia inicial.',
        ],
        en: [
          'The difference between aimless browsing and purposeful searching;',
          'What it means to have a clear research question or objective;',
          'The importance of finding trustworthy answers for school projects;',
          'How to save time and effort with an initial plan.',
        ],
      },
      explanation: {
        pt: [
          'Navegar na Internet é como dar um passeio pelas ruas da cidade: vais vendo montras, vídeos e páginas por curiosidade ou entretenimento, sem um destino fixo.',
          'Pesquisar informação é muito diferente: é como ter uma missão ou um mapa do tesouro! Tens uma dúvida concreta ou um tema de trabalho escolar e vais à procura de respostas exatas, verdadeiras e úteis.',
          'Quando um professor de TIC, História ou Ciências pede uma investigação sobre, por exemplo, "os castelos de Portugal" ou "a energia solar", precisas de definir primeiro o que queres descobrir: Quem? Quando? Onde? Como? e Porquê?',
          'Ter um objetivo claro antes de começar evita perderes horas em páginas sem interesse e garante que a informação que recolhes é rigorosa e valiosa para a tua aprendizagem.',
        ],
        en: [
          'Surfing the Internet is like walking through city streets: you look at shop windows, videos, and pages out of curiosity, with no fixed destination.',
          'Searching for information is very different: it is like having a mission or a treasure map! You have a specific question or a school assignment topic and set out to find exact, true, and useful answers.',
          'When a teacher in ICT, History, or Science asks for research on topics like "castles of Portugal" or "solar energy", you must first define what you need: Who? When? Where? How? and Why?',
          'Having a clear goal before starting prevents wasting hours on irrelevant websites and ensures the information you gather is accurate and valuable for your learning.',
        ],
      },
      example: {
        title: {
          pt: 'A biblioteca gigante sem estantes ordenadas',
          en: 'The giant library without tidy shelves',
        },
        scenario: {
          pt: 'Imagina que entras numa biblioteca com milhões de livros espalhados pelo chão. Se entrares apenas para espreitar capas coloridas, estás a navegar. Mas se precisares de encontrar a receita de pão de ló tradicional para um trabalho e fores diretamente ao índice de culinária tradicional portuguesa, estás a fazer uma pesquisa focada e eficaz!',
          en: 'Imagine walking into a library with millions of books scattered on the floor. If you just stroll around admiring colorful covers, you are browsing. But if you need the traditional sponge cake recipe for a project and head straight for the index of traditional Portuguese baking, you are conducting a focused and efficient search!',
        },
        tip: {
          pt: 'Antes de tocar no teclado, escreve a pergunta a que queres responder numa folha: por exemplo, "Quando foi fundado o Reino de Portugal?". Isso mantém o teu foco.',
          en: 'Before typing, write the question you want answered on paper: for example, "When was the Kingdom of Portugal founded?". That keeps you focused.',
        },
      },
      funFact: {
        pt: 'Sabias que existem mais de 1,9 mil milhões de websites no mundo? Se tentasses ver um website por minuto sem parar, demorarias mais de 3.600 anos!',
        en: 'Did you know that there are over 1.9 billion websites in the world? If you tried viewing one website per minute non-stop, it would take over 3,600 years!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se precisares de saber a que temperatura a água congela para a aula de Ciências Naturais, é melhor abrir as redes sociais e perguntar a desconhecidos ou fazer uma pesquisa orientada num site científico?',
          en: 'If you need to know at what temperature water freezes for Science class, is it better to open social media and ask strangers or do a targeted search on a scientific website?',
        },
        clue: {
          pt: 'Pensa em qual das opções te garante uma resposta cientificamente comprovada e rápida.',
          en: 'Think about which option guarantees a scientifically proven, fast answer.',
        },
        reflection: {
          pt: 'Uma pesquisa orientada num site educacional ou enciclopédia garante um facto científico comprovado (0 °C ao nível do mar). Nas redes sociais, qualquer pessoa pode responder com piadas ou erros!',
          en: 'A targeted search on an educational site or encyclopedia guarantees a proven scientific fact (0 °C at sea level). On social media, anyone could answer with jokes or mistakes!',
        },
      },
      quizQuestions: [
        {
          id: 'p1-q1',
          question: {
            pt: 'Qual é a principal diferença entre navegar na Internet e pesquisar informação?',
            en: 'What is the main difference between browsing the Internet and searching for information?',
          },
          options: {
            pt: [
              'Navegar é pago e pesquisar é sempre gratuito',
              'Navegar é passear sem objetivo fixo; pesquisar tem um propósito ou dúvida concreta',
              'Navegar só se faz no telemóvel e pesquisar só no computador',
              'Não existe qualquer diferença entre as duas coisas',
            ],
            en: [
              'Browsing costs money and searching is always free',
              'Browsing is casual with no fixed goal; searching has a specific purpose or question',
              'Browsing is only on mobile and searching is only on desktop',
              'There is no difference between the two',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! Pesquisar implica ter uma intenção, uma dúvida ou um objetivo de trabalho bem definido.',
            en: 'Correct! Searching implies having a clear intention, question, or school project goal.',
          },
        },
        {
          id: 'p1-q2',
          question: {
            pt: 'O que deves fazer antes de começar a pesquisar na Internet para um trabalho de TIC?',
            en: 'What should you do before starting to search the Internet for an ICT project?',
          },
          options: {
            pt: [
              'Definir com clareza o que precisas de descobrir ou responder',
              'Clicar logo em todos os anúncios coloridos que aparecerem',
              'Copiar o primeiro texto que encontrares sem ler',
              'Desligar o monitor do computador',
            ],
            en: [
              'Clearly define what you need to discover or answer',
              'Immediately click all colorful ads that appear',
              'Copy the first text you find without reading it',
              'Turn off the computer monitor',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! Ter uma pergunta de partida orienta a pesquisa e poupa imenso tempo.',
            en: 'Great! Having a starting question guides your search and saves lots of time.',
          },
        },
        {
          id: 'p1-q3',
          question: {
            pt: 'Por que razão a pesquisa de informação é fundamental no 5.º ano?',
            en: 'Why is information searching essential in the 5th grade?',
          },
          options: {
            pt: [
              'Apenas para jogar jogos mais depressa',
              'Para aprender a encontrar dados verdadeiros, aprender matérias novas e criar trabalhos de qualidade',
              'Para substituir as aulas do professor',
              'Para imprimir centenas de páginas sem ler nada',
            ],
            en: [
              'Only to play games faster',
              'To learn how to find truthful facts, master new subjects, and create quality school projects',
              'To replace the teacher’s lessons',
              'To print hundreds of pages without reading anything',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Saber pesquisar desenvolve o pensamento crítico e a autonomia dos estudantes.',
            en: 'Very well! Knowing how to search fosters critical thinking and student autonomy.',
          },
        },
      ],
    },

    // CONTEÚDO 2
    {
      id: 'pesquisa-motores-busca',
      themeId: 'pesquisa-informacao',
      number: 2,
      icon: 'Globe',
      title: {
        pt: 'Motores de busca',
        en: 'Search engines',
      },
      shortDesc: {
        pt: 'Compreende como funcionam os motores de busca, os robôs rastreadores e exemplos conhecidos como Google e Kiddle.',
        en: 'Understand how search engines work, web crawlers, and well-known examples like Google and Kiddle.',
      },
      whatYouWillLearn: {
        pt: [
          'O que é um motor de busca na Internet;',
          'Como funcionam em três passos simples: rastreio, indexação e classificação;',
          'Exemplos populares (Google, Microsoft Bing, DuckDuckGo);',
          'Motores de busca seguros e adaptados a crianças e jovens (como o Kiddle).',
        ],
        en: [
          'What an Internet search engine is;',
          'How they work in three simple steps: crawling, indexing, and ranking;',
          'Popular examples (Google, Microsoft Bing, DuckDuckGo);',
          'Kid-safe search engines designed for young learners (like Kiddle).',
        ],
      },
      explanation: {
        pt: [
          'Um motor de busca (ou motor de pesquisa) é um programa informático sofisticado criado para encontrar páginas da Web relacionadas com as palavras que o utilizador escreve.',
          'Como funciona nos bastidores? Primeiro, programas automáticos chamados "aranhas" ou robôs rastreadores (crawlers) percorrem constantemente a Web a ler milhões de páginas. Em seguida, organizam tudo num gigantesco índice (como um catálogo da biblioteca). Quando fazes uma pesquisa, o motor consulta o índice e apresenta os resultados mais relevantes numa fração de segundo!',
          'Entre os motores mais utilizados estão o Google, o Microsoft Bing e o DuckDuckGo (conhecido por valorizar a privacidade do utilizador).',
          'Para alunos do 5.º ano, existem também motores educativos concebidos especialmente para crianças, como o Kiddle, que filtram conteúdos impróprios e apresentam explicações com imagens claras e letras maiores.',
        ],
        en: [
          'A search engine is a sophisticated computer software designed to locate web pages matching the words a user types.',
          'How does it work behind the scenes? First, automated programs called "spiders" or web crawlers constantly traverse the web reading millions of pages. Next, they store and organize everything in a massive index (like a library catalog). When you search, the engine queries this index and ranks the most relevant results in a fraction of a second!',
          'Among the most popular engines are Google, Microsoft Bing, and DuckDuckGo (known for prioritizing privacy).',
          'For 5th-grade students, there are also kid-friendly educational search engines, like Kiddle, which filter out inappropriate content and present results with clear illustrations and larger text.',
        ],
      },
      example: {
        title: {
          pt: 'O arquivista relâmpago',
          en: 'The lightning-fast archivist',
        },
        scenario: {
          pt: 'Pensa no motor de busca como um arquivista super-rápido que já leu todos os livros do mundo antes de tu lá chegares. Quando perguntas "Onde vive o lince-ibérico?", ele não vai correr a floresta naquele segundo: ele abre a gaveta certa do seu catálogo e mostra-te as páginas já catalogadas!',
          en: 'Think of a search engine as a lightning-fast librarian who read every book in the world before you even arrived. When you ask "Where does the Iberian lynx live?", it does not run into the woods that second: it opens the right drawer in its catalog and shows you pre-indexed pages!',
        },
        tip: {
          pt: 'Se estiveres a pesquisar na escola ou em casa para um trabalho escolar, experimenta o Kiddle (kiddle.co) para encontrar explicações seguras e ilustradas.',
          en: 'If researching at school or at home for school projects, try Kiddle (kiddle.co) to find safe and illustrated explanations.',
        },
      },
      funFact: {
        pt: 'O Google realiza mais de 99.000 pesquisas por cada segundo que passa! Num único dia, são mais de 8,5 mil milhões de pesquisas em todo o planeta.',
        en: 'Google processes over 99,000 searches every single second! In a single day, that is over 8.5 billion searches across the globe.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Os resultados que aparecem em primeiro lugar num motor de busca são sempre os mais verdadeiros?',
          en: 'Are the top results shown by a search engine always the most truthful?',
        },
        clue: {
          pt: 'Tem em atenção que alguns resultados no topo têm a etiqueta "Anúncio" ou "Patrocinado".',
          en: 'Keep in mind that some top results carry the label "Ad" or "Sponsored".',
        },
        reflection: {
          pt: 'Nem sempre! Muitas vezes os primeiros resultados são anúncios pagos por empresas. Além disso, o motor de busca mede a popularidade e as palavras-chave, mas cabe a ti avaliar se a fonte é séria e confiável.',
          en: 'Not always! Often the very first results are paid advertisements. Furthermore, search engines measure popularity and keywords, but it is up to you to evaluate if the source is reputable.',
        },
      },
      quizQuestions: [
        {
          id: 'p2-q1',
          question: {
            pt: 'Como se chamam os programas que percorrem a Web a recolher páginas para os motores de busca?',
            en: 'What are the programs that crawl the Web collecting pages for search engines called?',
          },
          options: {
            pt: ['Vírus e troianos', 'Aranhas ou robôs rastreadores (crawlers)', 'Antivírus escolares', 'Ratos sem fios'],
            en: ['Viruses and trojans', 'Spiders or web crawlers', 'School antiviruses', 'Wireless mice'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Os crawlers (ou aranhas) navegam de ligação em ligação para criar o índice do motor de busca.',
            en: 'Very good! Crawlers (or spiders) follow hyperlinks across the web to build the search engine index.',
          },
        },
        {
          id: 'p2-q2',
          question: {
            pt: 'Qual destes é um exemplo de motor de busca adaptado especialmente para crianças e estudantes jovens?',
            en: 'Which of these is an example of a search engine specifically adapted for children and young students?',
          },
          options: {
            pt: ['Kiddle', 'Instagram', 'TikTok', 'WhatsApp'],
            en: ['Kiddle', 'Instagram', 'TikTok', 'WhatsApp'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! O Kiddle é um motor de busca visual e seguro concebido para crianças em idade escolar.',
            en: 'Correct! Kiddle is a safe, visual search engine designed specifically for school-aged children.',
          },
        },
        {
          id: 'p2-q3',
          question: {
            pt: 'Quando fazes uma pesquisa, onde é que o motor de busca vai procurar as respostas?',
            en: 'When you perform a search, where does the search engine look for answers?',
          },
          options: {
            pt: [
              'No disco rígido do teu telemóvel',
              'No seu índice gigante previamente catalogado',
              'Numa folha de papel arquivada na biblioteca',
              'Apenas nas mensagens do teu correio eletrónico',
            ],
            en: [
              'On your phone hard drive',
              'In its huge pre-cataloged web index',
              'On a sheet of paper in the school library',
              'Only inside your email inbox',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Exato! O motor consulta a sua gigantesca base de dados de páginas indexadas.',
            en: 'Exactly! The engine queries its massive database of pre-indexed web pages.',
          },
        },
      ],
    },

    // CONTEÚDO 3
    {
      id: 'pesquisa-boa-pesquisa',
      themeId: 'pesquisa-informacao',
      number: 3,
      icon: 'Key',
      title: {
        pt: 'Como fazer uma boa pesquisa',
        en: 'How to conduct a great search',
      },
      shortDesc: {
        pt: 'Aprende a escolher palavras-chave precisas, evitar frases confusas e ser específico na tua investigação.',
        en: 'Learn to choose precise keywords, avoid convoluted phrases, and be specific in your research.',
      },
      whatYouWillLearn: {
        pt: [
          'O que são palavras-chave e como identificá-las no teu tema;',
          'Por que deves ser específico e evitar termos vagos;',
          'Como evitar frases compridas ou conversas com a caixa de pesquisa;',
          'O papel das maiúsculas, acentos e termos técnicos.',
        ],
        en: [
          'What keywords are and how to identify them in your topic;',
          'Why you should be specific and avoid vague terms;',
          'How to avoid overly long sentences or chatting with the search box;',
          'The role of capitalization, accents, and specialized terms.',
        ],
      },
      explanation: {
        pt: [
          'As palavras-chave são as palavras mais importantes, informativas e com significado do teu tema. São elas que dizem ao motor de busca o que realmente procuras.',
          'Um dos erros mais comuns no 5.º ano é escrever como se estivéssemos a conversar com uma pessoa: "Olá senhor computador pode dizer-me o que comem os golfinhos?". O motor de busca pode ficar confuso com palavras de ligação desnecessárias (artigos, saudações, pronomes). Em vez disso, deves escrever apenas os conceitos-chave: "alimentação golfinhos sado" ou "dieta golfinho roaz".',
          'Sê específico! Se pesquisares apenas "animais", vais receber biliões de resultados sobre cães, gatos, dinossauros e zoológicos. Se pesquisares "lince ibérico habitat serra da malcata", vais encontrar exatamente o que precisas para a tua apresentação.',
          'Para a maioria dos motores de busca modernos, escrever com letras MAIÚSCULAS ou minúsculas não altera os resultados. O segredo está na escolha dos substantivos e termos concretos!',
        ],
        en: [
          'Keywords are the most meaningful, informative, and essential words representing your topic. They tell the search engine what you truly seek.',
          'A very common mistake among 5th graders is typing as if chatting with a human: "Hello Mr Computer please tell me what dolphins eat?". Words like greetings, prepositions, and polite fillers clutter the query. Instead, use pure key concepts: "dolphin diet sado river".',
          'Be specific! If you simply search "animals", you will get billions of results about dogs, cats, dinosaurs, and zoos. If you search "Iberian lynx habitat Serra da Malcata", you will immediately get what you need.',
          'For most modern search engines, capital letters or lowercase letters make no difference. The secret lies in choosing strong, concrete nouns and concepts!',
        ],
      },
      example: {
        title: {
          pt: 'Da conversa longa à palavra-chave cirúrgica',
          en: 'From rambling sentences to surgical keywords',
        },
        scenario: {
          pt: 'O Pedro escreveu na caixa de pesquisa: "Quero saber por favor qual foi o ano em que o homem chegou à lua pela primeira vez na história obrigado". Demorou imenso tempo a ler páginas genéricas. A Maria escreveu: "primeira chegada lua ano missão apollo 11". A Maria encontrou a resposta (1969, Neil Armstrong) no primeiro segundo!',
          en: 'Pedro typed: "I want to know please what was the year that man landed on the moon for the first time in history thank you". He wasted time sifting through rambling pages. Maria typed: "first moon landing year apollo 11". Maria found the exact answer (1969, Neil Armstrong) in one second!',
        },
        tip: {
          pt: 'Regra de ouro: Identifica os 2 a 4 substantivos principais do teu trabalho escolar e escreve apenas esses.',
          en: 'Golden rule: Identify the 2 to 4 primary nouns of your school project and type only those.',
        },
      },
      funFact: {
        pt: 'Sabias que cerca de 15% das pesquisas feitas todos os dias no Google são pesquisas completamente novas, que nunca ninguém no mundo tinha feito antes?',
        en: 'Did you know that about 15% of searches performed every day on Google are completely brand new searches that nobody in the world had ever typed before?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se precisares de saber como funciona o sistema digestivo das vacas para a aula de Ciências, qual das seguintes pesquisas é a mais eficaz?',
          en: 'If you need to know how cow digestive systems work for Science class, which of these searches is the most effective?',
        },
        clue: {
          pt: 'Evita palavras como "queria saber", "será que me podes dizer" e foca-te nos órgãos e no animal.',
          en: 'Avoid filler words like "I wanted to know" and focus on the biological organ and animal.',
        },
        reflection: {
          pt: 'A pesquisa ideal é "sistema digestivo vaca ruminante" ou "estômago vaca digestão". É curta, focada e vai direta aos livros de biologia e páginas educativas!',
          en: 'The ideal query is "cow digestive system ruminant" or "cow stomach digestion". It is concise, focused, and targets biology portals directly!',
        },
      },
      quizQuestions: [
        {
          id: 'p3-q1',
          question: {
            pt: 'Qual destas opções representa a melhor pesquisa para saber quando nasceu D. Afonso Henriques?',
            en: 'Which of these options represents the best search to find out when D. Afonso Henriques was born?',
          },
          options: {
            pt: [
              'Olá computador podes dizer-me quando nasceu o rei de portugal por favor',
              'afonso henriques ano nascimento',
              'reis',
              'historia de todas as coisas antigas',
            ],
            en: [
              'Hello computer can you please tell me when the king of portugal was born',
              'afonso henriques birth year',
              'kings',
              'history of all ancient things',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Perfeito! "afonso henriques ano nascimento" tem as palavras-chave essenciais sem palavras a mais.',
            en: 'Perfect! "afonso henriques birth year" has the essential keywords with zero clutter.',
          },
        },
        {
          id: 'p3-q2',
          question: {
            pt: 'O que acontece se escreveres uma pesquisa em LETRAS MAIÚSCULAS no motor de busca?',
            en: 'What happens if you type a search query in ALL CAPS in a search engine?',
          },
          options: {
            pt: [
              'O motor de busca bloqueia o computador',
              'O motor de busca trata as maiúsculas e minúsculas da mesma forma',
              'O motor de busca só procura livros muito caros',
              'Aparecem apenas páginas em língua inglesa',
            ],
            en: [
              'The search engine crashes your computer',
              'The search engine treats uppercase and lowercase words the same way',
              'The search engine only finds very expensive books',
              'Only English-language pages are displayed',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Exato! Os motores de busca não são sensíveis a maiúsculas na maioria das pesquisas normais.',
            en: 'Exactly! Search engines are not case-sensitive for typical search queries.',
          },
        },
        {
          id: 'p3-q3',
          question: {
            pt: 'Qual é o problema de fazer uma pesquisa usando apenas uma palavra vaga como "plantas"?',
            en: 'What is the problem with conducting a search using only a vague word like "plants"?',
          },
          options: {
            pt: [
              'O computador desliga-se',
              'Vais obter milhões de resultados genéricos que não respondem à tua dúvida concreta',
              'A Internet fica sem sinal',
              'Não existe nenhum problema',
            ],
            en: [
              'The computer shuts down',
              'You will receive millions of generic results that do not answer your specific question',
              'The Internet connection drops',
              'There is no problem at all',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! Termos demasiado amplos trazem páginas que não te interessam. Deve-se especificar sempre.',
            en: 'Correct! Overly broad terms return unrelated pages. You should always be specific.',
          },
        },
      ],
    },

    // CONTEÚDO 4
    {
      id: 'pesquisa-operadores',
      themeId: 'pesquisa-informacao',
      number: 4,
      icon: 'Filter',
      title: {
        pt: 'Dicas e operadores de pesquisa simples',
        en: 'Tips and simple search operators',
      },
      shortDesc: {
        pt: 'Usa truques de mestre: aspas "" para termos exatos, o sinal de menos - para excluir palavras indesejadas e filtros.',
        en: 'Master pro tips: quotation marks "" for exact phrases, minus sign - to exclude unwanted terms, and filters.',
      },
      whatYouWillLearn: {
        pt: [
          'Como usar aspas "" para pesquisar uma expressão exata;',
          'Como usar o sinal de menos (-) para retirar palavras que atrapalham;',
          'A importância de filtrar por imagens, notícias ou datas;',
          'Como encontrar informação rápida e precisa como um profissional de TIC.',
        ],
        en: [
          'How to use quotation marks "" to search for an exact phrase;',
          'How to use the minus sign (-) to remove distracting words;',
          'The importance of filtering by images, news, or dates;',
          'How to locate fast, pinpoint information like an ICT pro.',
        ],
      },
      explanation: {
        pt: [
          'Os motores de busca têm "superpoderes" secretos chamados operadores de pesquisa. São símbolos simples que dão ordens diretas ao motor!',
          'O operador mais famoso são as aspas duplas (" "). Quando colocas palavras entre aspas, como "ciclo da água" ou "D. Afonso Henriques", estás a dizer: "Encontra páginas onde estas palavras aparecem exatamente juntas, nesta mesma ordem!". Sem aspas, o motor pode mostrar páginas que falam de água num parágrafo e de ciclo de bicicleta noutro.',
          'Outro operador fantástico é o sinal de menos (-), que serve para excluir palavras. Imagina que queres pesquisar sobre o animal selvagem "jaguar", mas só te aparecem fotografias do carro da marca Jaguar. Se pesquisares: jaguar -carro -automovel, o motor elimina todas as páginas sobre veículos e mostra apenas o felino!',
          'Também podes usar os separadores do motor (Imagens, Notícias, Vídeos) e as Ferramentas para escolher resultados em português ou publicados no último ano.',
        ],
        en: [
          'Search engines have secret superpowers called search operators. These are simple punctuation symbols that give direct instructions to the engine!',
          'The most famous operator is quotation marks (" "). When you put words inside quotes, like "water cycle" or "Afonso Henriques", you tell the engine: "Only return pages where these words appear together in this exact sequence!". Without quotes, it might return pages talking about water in one paragraph and a bicycle cycle in another.',
          'Another fantastic operator is the minus sign (-), which excludes unwanted words. If you want to research the wild feline "jaguar", but results keep showing the luxury car brand, type: jaguar -car -auto. The engine filters out vehicle sites and keeps only the wild cat!',
          'You can also use the engine tabs (Images, News, Videos) and Search Tools to filter by language (Portuguese) or publication date.',
        ],
      },
      example: {
        title: {
          pt: 'O enigma do morcego e do super-herói',
          en: 'The riddle of the bat and the superhero',
        },
        scenario: {
          pt: 'O Gonçalo tinha de fazer um trabalho de Ciências sobre os morcegos que vivem em cavernas em Portugal. Mas quando pesquisava, só apareciam trailers do Batman (o homem-morcego) e lojas de brinquedos! O professor ensinou-lhe a técnica: morcego mamífero caverna -batman -filme. De imediato, surgiram artigos do Instituto de Conservação da Natureza!',
          en: 'Gonçalo had to do a Science project about cave bats in Portugal. But when he searched, trailers for Batman and toy stores clogged the screen! His teacher showed him the technique: bat mammal cave -batman -movie. Immediately, official wildlife conservation studies appeared!',
        },
        tip: {
          pt: 'Nota importante sobre o sinal de menos: não deve haver espaço entre o traço e a palavra que queres excluir! Escreve -carro (correto) e não - carro (incorreto).',
          en: 'Important note on the minus operator: there must be no space between the minus sign and the excluded word! Write -car (correct), not - car (incorrect).',
        },
      },
      funFact: {
        pt: 'Se escreveres uma conta de matemática na barra de pesquisa (como 125 * 8 ou 500 / 4), o motor de busca funciona instantaneamente como uma calculadora científica!',
        en: 'If you type a math equation in the search bar (like 125 * 8 or 500 / 4), the search engine instantly acts as a scientific calculator!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se estás à procura da letra de um poema que começa por "O poeta é um fingidor", como deves pesquisar para encontrar logo o autor?',
          en: 'If you are looking for the author of a poem that starts with "O poeta é um fingidor", how should you search to find the author immediately?',
        },
        clue: {
          pt: 'Lembra-te do operador que procura palavras exatamente na mesma sequência.',
          en: 'Remember the operator that searches for words in that exact order.',
        },
        reflection: {
          pt: 'Deves colocar a frase exata entre aspas: "O poeta é um fingidor". Vais descobrir logo que foi escrita pelo famoso poeta português Fernando Pessoa!',
          en: 'You should put the exact line inside quotes: "O poeta é um fingidor". You will immediately discover it was written by the famous Portuguese poet Fernando Pessoa!',
        },
      },
      quizQuestions: [
        {
          id: 'p4-q1',
          question: {
            pt: 'Para que serve colocar uma expressão entre aspas (" ") num motor de busca?',
            en: 'What is the purpose of placing a phrase inside quotation marks (" ") in a search engine?',
          },
          options: {
            pt: [
              'Para traduzir as palavras para espanhol',
              'Para procurar as palavras exatamente juntas e na mesma ordem',
              'Para apagar o histórico de navegação',
              'Para aumentar o tamanho das letras no ecrã',
            ],
            en: [
              'To translate words into Spanish',
              'To search for words together in that exact sequence',
              'To clear browsing history',
              'To increase font size on screen',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Exato! As aspas obrigam o motor a encontrar a frase exata, sem palavras soltas pelo meio.',
            en: 'Exactly! Quotes force the engine to match the exact phrase without scattered words.',
          },
        },
        {
          id: 'p4-q2',
          question: {
            pt: 'Como deves escrever para pesquisar sobre o animal "golfinho", excluindo resultados sobre brinquedos?',
            en: 'How should you format a search for the animal "dolphin" while excluding results about toys?',
          },
          options: {
            pt: ['golfinho +brinquedo', 'golfinho -brinquedo', 'golfinho / brinquedo', 'golfinho sem brinquedo por favor'],
            en: ['dolphin +toy', 'dolphin -toy', 'dolphin / toy', 'dolphin without toys please'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! O sinal de menos (-) colado à palavra retira esse termo dos resultados.',
            en: 'Very well! The minus sign (-) right before the word removes that term from results.',
          },
        },
        {
          id: 'p4-q3',
          question: {
            pt: 'Se quiseres apenas fotografias e esquemas visuais sobre o relevo de Portugal, que separador deves escolher?',
            en: 'If you only want photos and visual diagrams about Portugal’s terrain, which search tab should you select?',
          },
          options: {
            pt: ['Notícias', 'Imagens', 'Voos', 'Finanças'],
            en: ['News', 'Images', 'Flights', 'Finance'],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! O separador Imagens filtra especificamente fotografias, diagramas e mapas.',
            en: 'Correct! The Images tab specifically filters photographs, diagrams, and maps.',
          },
        },
      ],
    },

    // CONTEÚDO 5
    {
      id: 'pesquisa-avaliar-fontes',
      themeId: 'pesquisa-informacao',
      number: 5,
      icon: 'ShieldCheck',
      title: {
        pt: 'Avaliar a informação encontrada',
        en: 'Evaluating information found online',
      },
      shortDesc: {
        pt: 'Aprende a verificar quem escreveu, a data da publicação, a reputação da fonte e a distinguir facto de opinião.',
        en: 'Learn to verify author identity, publication date, source credibility, and distinguish fact from opinion.',
      },
      whatYouWillLearn: {
        pt: [
          'Por que razão não se deve acreditar em tudo o que aparece na Internet;',
          'Os 4 pilares de verificação: Autor, Data, Fonte e Evidências;',
          'A diferença essencial entre um facto científico e uma opinião pessoal;',
          'Identificar sinais de notícias falsas (fake news) e páginas duvidosas.',
        ],
        en: [
          'Why you must never blindly trust everything found on the Internet;',
          'The 4 verification pillars: Author, Date, Source, and Evidence;',
          'The essential difference between a scientific fact and a personal opinion;',
          'Recognizing warning signs of fake news and dubious websites.',
        ],
      },
      explanation: {
        pt: [
          'Qualquer pessoa no mundo pode criar um website, um blogue ou um vídeo a dizer o que quiser — mesmo que seja uma mentira completa ou uma brincadeira sem fundamento.',
          'Por isso, um bom aluno de TIC é um verdadeiro detetive da informação. Sempre que encontras uma página para um trabalho escolar, deves fazer quatro perguntas essenciais: 1. Quem é o autor? (É um especialista, um museu, um professor ou alguém anónimo?); 2. Quando foi publicado? (Uma notícia de 2005 sobre tecnologia pode estar completamente desatualizada!); 3. Onde está publicado? (Sites de escolas (.edu), do governo (.gov) ou de enciclopédias reconhecidas oferecem mais garantias); 4. Existem fontes e provas?',
          'Também é fundamental distinguir FACTO de OPINIÃO. Um facto é algo comprovado objetivamente (ex: "O monte do Pico é o ponto mais alto de Portugal"). Uma opinião é um gosto ou ponto de vista pessoal (ex: "A serra do Gerês é o sítio mais bonito do mundo"). No teu trabalho escolar, precisas de factos!',
          'Se um site tiver erros graves de português, títulos alarmistas com muitos pontos de exclamação ("NÃO ACREDITES NISTO!!!") ou promessas de prémios milagrosos, desconfia de imediato!',
        ],
        en: [
          'Anyone in the world can set up a website, blog, or video claiming whatever they want — even if it is completely false or an invented prank.',
          'That is why a skilled ICT student acts as an information detective. Whenever you open a web page for school research, ask four key questions: 1. Who is the author? (Is it an expert, a museum, a teacher, or someone anonymous?); 2. When was it published? (A 2005 tech article might be completely obsolete!); 3. Where is it hosted? (Educational (.edu), government (.gov), or recognized encyclopedias provide higher credibility); 4. Are there facts and references?',
          'It is also vital to tell FACT from OPINION. A fact is objectively provable (e.g. "Mount Pico is the highest point in Portugal"). An opinion is a personal perspective or taste (e.g. "Gerês is the most gorgeous place on Earth"). In school research, you need verifiable facts!',
          'If a website displays glaring spelling mistakes, sensationalist all-caps headlines ("YOU WON’T BELIEVE THIS!!!"), or promises of miraculous prizes, be immediately skeptical!',
        ],
      },
      example: {
        title: {
          pt: 'A árvore do polvo e as notícias falsas',
          en: 'The tree octopus and fake news',
        },
        scenario: {
          pt: 'Há alguns anos, um autor criou um site muito bem desenhado a falar do "Polvo Arborícola do Noroeste", um polvo fictício que supostamente vivia nas copas das árvores na América! Muitos estudantes copiaram o texto sem verificar noutras fontes e tiveram nota negativa no trabalho de Ciências. Se tivessem procurado no site de um museu de História Natural ou numa enciclopédia séria, saberiam logo que polvos não vivem em árvores!',
          en: 'A few years ago, someone created an elaborate, believable website about the "Pacific Northwest Tree Octopus", a fake octopus supposed to live in tree canopies! Many students copied the text without cross-checking other sources and failed their Science presentation. If they had checked a Natural History Museum or a reputable encyclopedia, they would have known octopuses do not live in trees!',
        },
        tip: {
          pt: 'Dica de investigação: Nunca fiques com a primeira página que leres. Compara sempre o que encontraste com fontes fidedignas e independentes (como enciclopédias, museus ou livros). Vários sites podem simplesmente copiar boatos uns dos outros!',
          en: 'Research tip: Never settle for the first page you read. Cross-check facts with reputable independent sources (like encyclopedias, museums, or books). Multiple websites can copy unverified rumors from each other!',
        },
      },
      funFact: {
        pt: 'Em Portugal, os serviços e organismos oficiais do Estado utilizam frequentemente o domínio .gov.pt, e muitas escolas e universidades utilizam .pt ou .edu.pt. Embora os endereços oficiais ofereçam maior fiabilidade institucional, devemos sempre analisar o conteúdo com espírito crítico.',
        en: 'In Portugal, official government bodies frequently use the .gov.pt domain, and educational institutions often use .pt or .edu.pt. While institutional addresses provide official credibility, content should always be analyzed with critical thinking.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se encontrares um artigo de um cientista renomado de 2024 e um comentário anónimo num fórum de jogos a dizer o contrário, em qual deves confiar para o teu trabalho de TIC?',
          en: 'If you find an article by a renowned scientist from 2024 and an anonymous comment in a gaming forum saying the opposite, which should you trust for your ICT project?',
        },
        clue: {
          pt: 'Pensa em qual das pessoas estudou o assunto e assinou o seu próprio nome com responsabilidade.',
          en: 'Think about which person studied the subject and attached their own name and credentials.',
        },
        reflection: {
          pt: 'Deves confiar no artigo do cientista! Tem autor identificado, instituição responsável, data recente e métodos científicos comprovados.',
          en: 'You should trust the scientist’s article! It has an identified author, responsible institution, recent date, and proven scientific methods.',
        },
      },
      quizQuestions: [
        {
          id: 'p5-q1',
          question: {
            pt: 'Qual dos seguintes elementos NÃO ajuda a confirmar se um site é fiável?',
            en: 'Which of the following elements does NOT help confirm if a website is reliable?',
          },
          options: {
            pt: [
              'O autor ser um especialista ou instituição reconhecida',
              'A data da informação ser recente ou indicada com clareza',
              'O site ter muitas luzes a piscar a dizer "Ganhaste um telemóvel!"',
              'A existência de fontes e referências bibliográficas',
            ],
            en: [
              'The author being a recognized expert or educational institution',
              'The publication date being recent and clearly stated',
              'The site flashing popups claiming "You won a free phone!"',
              'The presence of references and factual sources',
            ],
          },
          correctIndex: 2,
          explanation: {
            pt: 'Muito bem! Anúncios piscantes e prémios falsos são sinais de sites duvidosos ou perigosos.',
            en: 'Very well! Flashing popups and fake prizes are red flags of untrustworthy or unsafe sites.',
          },
        },
        {
          id: 'p5-q2',
          question: {
            pt: 'Qual das seguintes frases é um FACTO e não uma simples opinião?',
            en: 'Which of the following statements is a FACT and not just an opinion?',
          },
          options: {
            pt: [
              'O rio Tejo é o rio mais extenso da Península Ibérica',
              'O rio Tejo é o rio mais bonito do mundo inteiro',
              'Nadar no Tejo é a melhor sensação que existe',
              'Toda a gente devia preferir o rio Tejo aos outros rios',
            ],
            en: [
              'The Tagus is the longest river on the Iberian Peninsula',
              'The Tagus is the most gorgeous river in the whole world',
              'Swimming in the Tagus is the best feeling in the world',
              'Everyone should prefer the Tagus river over all others',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! A extensão do rio Tejo (1007 km) é um facto geográfico mensurável e comprovado.',
            en: 'Exactly! The Tagus river’s length (1,007 km) is a measurable, proven geographic fact.',
          },
        },
        {
          id: 'p5-q3',
          question: {
            pt: 'O que deves fazer se encontrares uma informação impressionante num site que nunca ouviste falar?',
            en: 'What should you do if you encounter a shocking piece of news on a website you have never heard of?',
          },
          options: {
            pt: [
              'Partilhar logo nas redes e acreditar sem hesitar',
              'Cruzar a informação com fontes independentes e conceituadas (como enciclopédias ou manuais) para verificar se é verdade',
              'Apagar o computador',
              'Inscrever o teu número de telemóvel no site',
            ],
            en: [
              'Instantly share it and believe it without hesitation',
              'Cross-check the information with independent, reputable sources (like encyclopedias or textbooks) to verify if it is true',
              'Delete your computer',
              'Submit your phone number into the website',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Excelente! Comparar várias fontes conceituadas é o método de ouro da investigação.',
            en: 'Excellent! Comparing multiple reliable sources is the golden rule of investigation.',
          },
        },
      ],
    },

    // CONTEÚDO 6
    {
      id: 'pesquisa-direitos-plagio',
      themeId: 'pesquisa-informacao',
      number: 6,
      icon: 'FileText',
      title: {
        pt: 'Direitos de autor e plágio na pesquisa',
        en: 'Copyright and plagiarism in research',
      },
      shortDesc: {
        pt: 'Compreende a diferença entre copiar e criar, como citar fontes, respeitar os autores e usar imagens livres.',
        en: 'Understand the difference between copying and creating, how to cite sources, respect creators, and use free images.',
      },
      whatYouWillLearn: {
        pt: [
          'O que é o plágio e por que razão é inaceitável na escola;',
          'A diferença entre "copiar e colar" e parafrasear com as tuas palavras;',
          'Como citar a fonte de um texto ou website de forma simples;',
          'O que são direitos de autor e imagens com licenças livres (Creative Commons).',
        ],
        en: [
          'What plagiarism is and why it is unacceptable in school;',
          'The difference between "copy-pasting" and paraphrasing in your own words;',
          'How to cite text and website sources simply;',
          'What copyright is and how to find free-license media (Creative Commons).',
        ],
      },
      explanation: {
        pt: [
          'Quando um autor escreve um livro, tira uma fotografia ou cria um artigo, esse trabalho pertence-lhe. A lei protege essas criações através dos Direitos de Autor.',
          'Plágio é copiar o trabalho de outra pessoa e apresentá-lo como se tivesse sido feito por ti. Fazer "copiar e colar" (copy-paste) da Wikipédia ou de um site e entregar ao professor como se fossem as tuas palavras não é apenas feio: é uma falta grave de honestidade académica!',
          'Aprender a sério significa Parafrasear: lês a informação na Internet, fechas a janela do navegador, compreendes a matéria e escreves com as tuas próprias frases e raciocínio. Mostras que aprendeste!',
          'Além disso, deves sempre Citar a Fonte: no final do trabalho, cria uma secção chamada "Bibliografia" ou "Webgrafia" onde indicas o título da página, o autor e a ligação (link). E para as fotografias, prefere bancos de imagens gratuitas e de licença livre (como Wikimedia Commons ou Unsplash) e indica sempre quem tirou a foto.',
        ],
        en: [
          'When an author writes a book, snaps a photo, or drafts an article, that work belongs to them. The law protects these creations under Copyright.',
          'Plagiarism means copying someone else’s work and presenting it as your own creation. Doing "copy-paste" from Wikipedia or a website and turning it in as your words is a major breach of academic integrity!',
          'True learning involves Paraphrasing: read the information online, understand the concepts, and then write in your own words and thoughts. This proves you learned!',
          'Furthermore, always Cite your Sources: at the end of your project, include a section called "Bibliography" or "Web sources" listing the page title, author, and link. For photos, choose open-license image repositories (like Wikimedia Commons or Unsplash) and always credit the photographer.',
        ],
      },
      example: {
        title: {
          pt: 'O trabalho do robot e as palavras do aluno',
          en: 'The robot project and the student’s own voice',
        },
        scenario: {
          pt: 'A Beatriz e o Tiago tinham de fazer um trabalho sobre "A invenção da roda". O Tiago copiou três parágrafos inteiros de um blogue que tinham palavras difíceis que ele nem sabia o que significavam. Quando o professor perguntou o que queria dizer "locomoção arcaica", o Tiago não soube responder! A Beatriz leu o texto, explicou por palavras simples como os troncos de árvores rolaram e colocou no fim: "Fonte: Museu Nacional de Arqueologia". A Beatriz tirou Excelente!',
          en: 'Beatriz and Tiago had a presentation on "The invention of the wheel". Tiago copied three entire paragraphs from a blog containing difficult words he did not even understand. When the teacher asked what "archaic locomotion" meant, Tiago froze! Beatriz read the text, explained in simple words how tree logs rolled, and wrote at the bottom: "Source: National Archaeology Museum". Beatriz earned top marks!',
        },
        tip: {
          pt: 'Truque da explicação: Depois de ler um parágrafo na Internet, tenta explicá-lo em voz alta a ti próprio como se estivesses a explicar a um colega. As palavras que usares serão o teu próprio texto!',
          en: 'Explaining trick: After reading a paragraph online, explain it out loud to yourself as if teaching a friend. The words you use will become your own writing!',
        },
      },
      funFact: {
        pt: 'Sabias que existem licenças chamadas Creative Commons (CC) criadas para que fotógrafos e cientistas possam partilhar as suas imagens e textos livremente com estudantes, desde que seja dado o devido crédito ao criador?',
        en: 'Did you know that Creative Commons (CC) licenses exist so photographers and scientists can share images and articles freely with students, provided credit is given?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se colocares uma frase exatamente igual à do livro do autor no teu trabalho, podes fazê-lo desde que uses aspas e digas de quem é a frase?',
          en: 'If you include a phrase word-for-word from an author’s book in your project, is that allowed as long as you put quotation marks and state the author’s name?',
        },
        clue: {
          pt: 'Isto chama-se fazer uma citação direta.',
          en: 'This is called making a direct citation.',
        },
        reflection: {
          pt: 'Sim! Isso é uma citação direta e é perfeitamente correto. Ao colocares entre aspas e indicares o nome do autor, estás a honrar quem teve a ideia original.',
          en: 'Yes! That is a direct quotation and is perfectly acceptable. By using quotes and naming the author, you honor who originated the idea.',
        },
      },
      quizQuestions: [
        {
          id: 'p6-q1',
          question: {
            pt: 'O que é o plágio num trabalho escolar de TIC?',
            en: 'What is plagiarism in an ICT school project?',
          },
          options: {
            pt: [
              'Guardar o trabalho numa pen USB',
              'Copiar textos ou ideias de outrem e fingir que foram criados por ti',
              'Pedir ajuda ao professor para corrigir a ortografia',
              'Desenhar uma capa original e colorida',
            ],
            en: [
              'Saving your work onto a USB drive',
              'Copying someone else’s text or ideas and pretending you created them',
              'Asking the teacher for help with spelling',
              'Designing an original, colorful cover',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Exato! Plágio é a apropriação indevida do trabalho de outra pessoa sem dar o crédito.',
            en: 'Exactly! Plagiarism is taking someone else’s work and claiming it as your own without credit.',
          },
        },
        {
          id: 'p6-q2',
          question: {
            pt: 'O que significa parafrasear uma informação encontrada na Web?',
            en: 'What does it mean to paraphrase information found on the Web?',
          },
          options: {
            pt: [
              'Fazer Ctrl+C e Ctrl+V sem mudar nada',
              'Compreender a ideia e explicá-la com as tuas próprias palavras e raciocínio',
              'Apagar todas as vogais do texto',
              'Imprimir o texto em papel brilhante',
            ],
            en: [
              'Pressing Ctrl+C and Ctrl+V without changing anything',
              'Understanding the concept and explaining it in your own words and reasoning',
              'Deleting all vowels from the text',
              'Printing the text on glossy paper',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Parafrasear mostra que compreendeste o tema e estimula a tua criatividade.',
            en: 'Very well! Paraphrasing shows you grasped the subject and builds your creativity.',
          },
        },
        {
          id: 'p6-q3',
          question: {
            pt: 'Onde se deve indicar a lista de sites e livros utilizados para realizar um trabalho?',
            en: 'Where should the list of websites and books used in a project be recorded?',
          },
          options: {
            pt: [
              'Na reciclagem',
              'Numa secção final de Bibliografia ou Webgrafia / Fontes consultadas',
              'Em lado nenhum, deve manter-se em segredo',
              'Na barra de favoritos do colega do lado',
            ],
            en: [
              'In the recycling bin',
              'In a final Bibliography or Web sources / References section',
              'Nowhere, it should remain a secret',
              'In your classmate’s browser bookmarks',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Correto! A bibliografia ou webgrafia no final do documento valoriza o rigor do teu trabalho.',
            en: 'Correct! The bibliography or web sources at the end highlights your project’s academic rigor.',
          },
        },
      ],
    },

    // CONTEÚDO 7
    {
      id: 'pesquisa-organizar-informacao',
      themeId: 'pesquisa-informacao',
      number: 7,
      icon: 'FolderTree',
      title: {
        pt: 'Organizar a informação recolhida',
        en: 'Organizing gathered information',
      },
      shortDesc: {
        pt: 'Aprende a guardar links nos marcadores, criar pastas de trabalho, tirar notas úteis e selecionar o que interessa.',
        en: 'Learn to save links in bookmarks, create project folders, take useful notes, and curate key points.',
      },
      whatYouWillLearn: {
        pt: [
          'Como usar os Marcadores (Favoritos) do navegador de forma organizada;',
          'A importância de tirar notas em documentos ou cadernos enquanto pesquisas;',
          'Como selecionar apenas o essencial e evitar excesso de dados irrelevantes;',
          'Preparar a informação para a apresentação ou documento final em TIC.',
        ],
        en: [
          'How to organize browser Bookmarks (Favorites) effectively;',
          'The importance of taking notes in text files or notebooks while researching;',
          'How to filter out fluff and focus on essentials;',
          'Preparing gathered data for your final ICT presentation or document.',
        ],
      },
      explanation: {
        pt: [
          'Pesquisar não é apenas encontrar páginas: é saber guardar e organizar o que encontraste para não perderes o rasto à informação!',
          'Todos os navegadores de Internet (Chrome, Edge, Firefox, Safari) têm uma ferramenta preciosa chamada Marcadores (ou Favoritos). Podes clicar na estrela ⭐ junto à barra de endereço para guardar o link. Melhor ainda: cria pastas temáticas, como "TIC - Trabalho de História" ou "Ciências - Plantas", para manter tudo arrumado.',
          'Enquanto pesquisas, tem aberto um processador de texto ou um bloco de notas. Aponta em tópicos curtos: 1. A ideia principal; 2. O endereço do site; 3. A data de consulta. Não tentes guardar páginas inteiras: guarda as respostas à tua pergunta inicial!',
          'No final da pesquisa, faz uma seleção crítica: de todas as notas recolhidas, escolhe os 3 a 5 pontos mais fortes para o teu trabalho. Menos é mais: um trabalho claro, bem estruturado e com palavras tuas vale muito mais do que vinte páginas cheias de confusão.',
        ],
        en: [
          'Researching is not just finding pages: it is knowing how to store and organize what you found so you never lose track of important sources!',
          'All web browsers (Chrome, Edge, Firefox, Safari) provide a valuable feature called Bookmarks (or Favorites). Click the star ⭐ near the address bar to save the link. Even better: create dedicated folders like "ICT - History Project" or "Science - Plants" to keep things tidy.',
          'While searching, keep a word processor or digital notepad open. Jot down bullet points: 1. Main idea; 2. Website URL; 3. Access date. Do not hoard whole pages: save direct answers to your research question!',
          'At the conclusion of your search, curate your findings: from all collected notes, select the 3 to 5 strongest points for your final report. Quality beats quantity: a clear, well-structured presentation in your own words is worth far more than twenty disorganized pages.',
        ],
      },
      example: {
        title: {
          pt: 'A pasta mágica de marcadores da Leonor',
          en: 'Leonor’s organized bookmarks folder',
        },
        scenario: {
          pt: 'A Leonor começou a pesquisar sobre "Energias Renováveis em Portugal". Em vez de deixar 30 separadores abertos no navegador que tornavam o computador lento e acabavam por fechar por engano, criou uma pasta nos marcadores chamada "TIC_Energias". Guardou lá 4 sites excelentes da Direção-Geral de Energia e da Ciência Viva. Quando foi escrever o trabalho com o seu grupo, todos os links estavam arrumados à distância de um clique!',
          en: 'Leonor started researching "Renewable Energies in Portugal". Instead of leaving 30 tabs open that bogged down the computer and risked closing accidentally, she created a bookmark folder called "ICT_Energy". She saved 4 standout sites from official energy agencies. When drafting the presentation with her team, every source was one click away!',
        },
        tip: {
          pt: 'No teclado, o atalho Ctrl + D (no Windows) ou Cmd + D (no Mac) guarda instantaneamente a página atual nos teus Marcadores!',
          en: 'Keyboard shortcut: pressing Ctrl + D (on Windows) or Cmd + D (on Mac) instantly bookmarks the current page!',
        },
      },
      funFact: {
        pt: 'Sabias que o excesso de separadores abertos no navegador gasta muita memória RAM do computador e pode fazer com que a bateria do portátil se esgote duas vezes mais rápido?',
        en: 'Did you know that having dozens of open tabs consumes huge amounts of computer RAM and can drain a laptop battery twice as fast?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se encontrares 15 páginas sobre o teu tema, deves copiar todas as frases para o teu trabalho final?',
          en: 'If you find 15 pages on your topic, should you copy all those sentences into your final project?',
        },
        clue: {
          pt: 'Pensa no colega ou professor que vai ler o teu trabalho: o que é mais agradável e claro?',
          en: 'Think of the classmate or teacher reading your presentation: what is clearest and most engaging?',
        },
        reflection: {
          pt: 'Não! Deves selecionar apenas as ideias principais mais importantes, resumir por palavras tuas e apresentar um trabalho limpo, interessante e fácil de compreender.',
          en: 'No! You should curate only the most important main points, summarize in your own words, and deliver a clean, engaging, easy-to-understand project.',
        },
      },
      quizQuestions: [
        {
          id: 'p7-q1',
          question: {
            pt: 'Qual é a funcionalidade do navegador que permite guardar endereços de páginas para consultar mais tarde?',
            en: 'What browser feature allows you to save web addresses to revisit later?',
          },
          options: {
            pt: [
              'Lixeira ou reciclagem',
              'Marcadores (ou Favoritos)',
              'Modo de avião',
              'Contraste de cores',
            ],
            en: [
              'Recycle bin',
              'Bookmarks (or Favorites)',
              'Airplane mode',
              'Color contrast',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Muito bem! Os Marcadores permitem organizar sites por pastas temáticas sem perder os links.',
            en: 'Very well! Bookmarks let you organize websites into thematic folders without losing links.',
          },
        },
        {
          id: 'p7-q2',
          question: {
            pt: 'Qual é o atalho de teclado habitual para adicionar a página atual aos marcadores?',
            en: 'What is the standard keyboard shortcut to bookmark the current page?',
          },
          options: {
            pt: ['Ctrl + D (ou Cmd + D no Mac)', 'Alt + F4', 'Ctrl + Alt + Del', 'Shift + Esc'],
            en: ['Ctrl + D (or Cmd + D on Mac)', 'Alt + F4', 'Ctrl + Alt + Del', 'Shift + Esc'],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! Ctrl + D é o atalho rápido universal para criar um marcador no navegador.',
            en: 'Perfect! Ctrl + D is the universal shortcut to bookmark a page in your browser.',
          },
        },
        {
          id: 'p7-q3',
          question: {
            pt: 'O que deves fazer quando recolhes muita informação durante uma pesquisa?',
            en: 'What should you do when you have gathered a large amount of information during research?',
          },
          options: {
            pt: [
              'Colocar tudo sem escolher para o trabalho ficar com 50 páginas',
              'Selecionar as ideias essenciais, organizar por tópicos e explicar com as tuas palavras',
              'Apagar tudo e desistir',
              'Copiar e colar sem ler',
            ],
            en: [
              'Include everything indiscriminately so the project is 50 pages long',
              'Filter key points, structure by topics, and explain in your own words',
              'Delete everything and give up',
              'Copy-paste without reading',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Exato! A seleção crítica e a síntese são marcas de um trabalho escolar de grande qualidade.',
            en: 'Exactly! Critical selection and synthesis are hallmarks of high-quality schoolwork.',
          },
        },
      ],
    },
  ],

  // 5 DESAFIOS DO TEMA 3
  challenges: [
    {
      id: 'desafio-palavras-chave',
      themeId: 'pesquisa-informacao',
      number: 1,
      icon: 'Key',
      title: {
        pt: 'O Mestre das Palavras-Chave',
        en: 'The Keyword Master',
      },
      shortDesc: {
        pt: 'Treina a tua capacidade de transformar perguntas confusas em pesquisas cirúrgicas e eficazes.',
        en: 'Train your skill in transforming confusing queries into precise and effective searches.',
      },
      durationMinutes: 5,
      type: 'keywords_master',
    },
    {
      id: 'desafio-fontes-fiaveis',
      themeId: 'pesquisa-informacao',
      number: 2,
      icon: 'ShieldCheck',
      title: {
        pt: 'Detetive de Fontes Fiáveis',
        en: 'Reliable Sources Detective',
      },
      shortDesc: {
        pt: 'Analisa 6 páginas web e resultados de pesquisa para classificar se a fonte é fiável, duvidosa ou falsa.',
        en: 'Analyze 6 web pages and search snippets to classify whether the source is credible, dubious, or fake.',
      },
      durationMinutes: 6,
      type: 'reliable_sources',
    },
    {
      id: 'desafio-misterio-aspas',
      themeId: 'pesquisa-informacao',
      number: 3,
      icon: 'Search',
      title: {
        pt: 'O Mistério das Aspas e Operadores',
        en: 'The Mystery of Quotes & Operators',
      },
      shortDesc: {
        pt: 'Resolve enigmas de pesquisa aplicando aspas "" para termos exatos e o sinal de menos - para filtrar.',
        en: 'Solve research riddles applying quotation marks "" for exact phrases and the minus operator - to filter.',
      },
      durationMinutes: 6,
      type: 'search_operators',
    },
    {
      id: 'desafio-copiar-criar',
      themeId: 'pesquisa-informacao',
      number: 4,
      icon: 'CheckCircle2',
      title: {
        pt: 'Copiar ou Criar? Direitos e Plágio',
        en: 'Copy or Create? Copyright & Plagiarism',
      },
      shortDesc: {
        pt: 'Avalia situações práticas de alunos a fazer trabalhos e descobre o caminho da integridade e autoria.',
        en: 'Evaluate realistic student scenarios and identify the path of integrity, paraphrasing, and credit.',
      },
      durationMinutes: 5,
      type: 'copy_or_create',
    },
    {
      id: 'quiz-final-tema3',
      themeId: 'pesquisa-informacao',
      number: 5,
      icon: 'Award',
      title: {
        pt: 'Quiz Final: Pesquisa de Informação',
        en: 'Final Master Quiz: Information Search',
      },
      shortDesc: {
        pt: 'Testa todos os teus conhecimentos sobre pesquisa, motores de busca, avaliação de fontes e direitos de autor.',
        en: 'Test all your knowledge on web search, engines, source evaluation, and copyright in this 10-question quiz.',
      },
      durationMinutes: 8,
      type: 'final_quiz',
    },
  ],

  // 10 PERGUNTAS DO QUIZ FINAL DO TEMA 3
  finalQuiz: [
    {
      id: 'fq3-1',
      question: {
        pt: 'O que diferencia uma pesquisa de informação eficaz de uma simples navegação na Internet?',
        en: 'What distinguishes an effective information search from casual web browsing?',
      },
      options: {
        pt: [
          'A pesquisa usa obrigatoriamente auscultadores de som',
          'A pesquisa tem um objetivo concreto, uma pergunta clara e procura respostas fiáveis',
          'Navegar é proibido para alunos de 5.º ano',
          'Não há qualquer diferença entre as duas atividades',
        ],
        en: [
          'Searching requires wearing audio headphones',
          'Searching has a concrete goal, a clear question, and seeks reliable answers',
          'Browsing is forbidden for 5th graders',
          'There is no difference between the two activities',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Correto! Pesquisar implica uma intenção clara e focada em resolver uma dúvida ou trabalho.',
        en: 'Correct! Searching implies a clear, focused purpose to answer a question or project topic.',
      },
    },
    {
      id: 'fq3-2',
      question: {
        pt: 'Como funcionam os motores de busca nos bastidores para encontrar páginas na Web?',
        en: 'How do search engines operate behind the scenes to locate web pages?',
      },
      options: {
        pt: [
          'Rastreiam páginas com robôs (crawlers), catalogam tudo num índice e classificam por relevância',
          'Têm pessoas a ler todos os sites à mão em tempo real',
          'Apenas leem os ficheiros guardados no teu telemóvel',
          'Adivinham o que pensas sem usar a rede',
        ],
        en: [
          'They crawl pages using spiders (crawlers), index them into a massive catalog, and rank by relevance',
          'They employ people reading all web pages manually in real time',
          'They only read files stored on your smartphone',
          'They guess your thoughts without using the network',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Excelente! Rastreio, indexação e classificação são os três pilares de qualquer motor de busca.',
        en: 'Great! Crawling, indexing, and ranking are the three foundational pillars of any search engine.',
      },
    },
    {
      id: 'fq3-3',
      question: {
        pt: 'Qual destas pesquisas é a mais recomendada para um trabalho sobre a alimentação do lince-ibérico?',
        en: 'Which of these queries is best recommended for research on the Iberian lynx diet?',
      },
      options: {
        pt: [
          'animais de portugal',
          'queria saber se faz favor o que come o animal selvagem lince obrigado',
          'alimentação lince ibérico coelho bravo',
          'coisas da natureza',
        ],
        en: [
          'animals in portugal',
          'i would like to know please what the wild animal lynx eats thank you',
          'iberian lynx diet wild rabbit',
          'nature stuff',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'Muito bem! Escolhe palavras-chave específicas e informativas, eliminando saudações e conversa.',
        en: 'Very well! It selects specific, informative keywords while removing filler chatter.',
      },
    },
    {
      id: 'fq3-4',
      question: {
        pt: 'Para que serve colocar uma expressão entre aspas (" ") na caixa de pesquisa?',
        en: 'What is the function of putting a phrase inside quotes (" ") in the search box?',
      },
      options: {
        pt: [
          'Para forçar o motor a procurar exatamente aquela expressão contínua e na mesma ordem',
          'Para traduzir o texto automaticamente',
          'Para eliminar os vírus do computador',
          'Para abrir o correio eletrónico',
        ],
        en: [
          'To force the engine to match that exact continuous phrase in that specific order',
          'To translate text automatically',
          'To remove viruses from the computer',
          'To open your email',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Perfeito! As aspas (" ") garantem que o motor procura o termo exato sem dispersão.',
        en: 'Perfect! Quotation marks ensure the engine searches the exact phrase without scattering words.',
      },
    },
    {
      id: 'fq3-5',
      question: {
        pt: 'Se pesquisares: camaleão -réptil, o que estás a pedir ao motor de busca?',
        en: 'If you search: camaleao -reptil, what are you instructing the search engine to do?',
      },
      options: {
        pt: [
          'Para mostrar apenas répteis',
          'Para procurar "camaleão" excluindo páginas que contenham a palavra "réptil"',
          'Para desligar a ligação à Internet',
          'Para juntar as duas palavras com uma linha',
        ],
        en: [
          'To display only reptiles',
          'To search for "camaleao" while excluding pages containing the word "reptil"',
          'To turn off the Internet connection',
          'To hyphenate both words together',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Exato! O operador de subtração (-) exclui as páginas que tenham o termo colado ao traço.',
        en: 'Exactly! The subtraction operator (-) filters out pages containing the term attached to the hyphen.',
      },
    },
    {
      id: 'fq3-6',
      question: {
        pt: 'Qual dos seguintes sites oferece maior garantia de fiabilidade para um trabalho de Ciências sobre o sistema solar?',
        en: 'Which of the following websites offers the greatest reliability for a Science project on the solar system?',
      },
      options: {
        pt: [
          'Um blogue anónimo sem data com o título "Os extraterrestres vivem em Marte"',
          'O portal oficial da Agência Espacial Europeia (ESA) ou da Ciência Viva',
          'Um comentário numa publicação do TikTok',
          'Um site de vendas de brinquedos com muitos anúncios a piscar',
        ],
        en: [
          'An undated anonymous blog titled "Aliens live on Mars"',
          'The official website of the European Space Agency (ESA) or Ciência Viva',
          'A comment on a TikTok video post',
          'A toy commercial store website full of flashing ads',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Correto! Instituições científicas reconhecidas garantem rigor, autoria qualificada e dados comprovados.',
        en: 'Correct! Recognized scientific bodies ensure rigorous, qualified authorship and verified facts.',
      },
    },
    {
      id: 'fq3-7',
      question: {
        pt: 'Qual é a diferença entre um FACTO e uma OPINIÃO na análise de um texto online?',
        en: 'What is the difference between a FACT and an OPINION when evaluating online text?',
      },
      options: {
        pt: [
          'Um facto é comprovável e objetivo; uma opinião reflete um gosto ou ponto de vista pessoal',
          'Não há diferença: tudo o que está escrito na Web é facto',
          'Uma opinião é sempre mais confiável que um facto',
          'Os factos são sempre falsos',
        ],
        en: [
          'A fact is verifiable and objective; an opinion reflects personal taste or viewpoint',
          'There is no difference: everything published on the web is fact',
          'An opinion is always more trustworthy than a fact',
          'Facts are always fake',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Muito bem! Um facto pode ser provado (ex: datas, distâncias); a opinião é pessoal.',
        en: 'Very well! A fact can be proved objectively (e.g. dates, measurements); an opinion is personal.',
      },
    },
    {
      id: 'fq3-8',
      question: {
        pt: 'O que deves fazer quando usas informações e fotografias da Internet num trabalho escolar?',
        en: 'What should you do when incorporating information and photos from the web into a school report?',
      },
      options: {
        pt: [
          'Copiar e colar tudo e dizer que foste tu que inventaste',
          'Parafrasear com as tuas palavras, usar imagens com licenças livres e citar as fontes na bibliografia',
          'Mudar o tamanho da letra para o professor não notar o plágio',
          'Apagar o nome do autor original',
        ],
        en: [
          'Copy-paste everything and pretend you invented it all',
          'Paraphrase in your own words, use open-license images, and cite sources in the bibliography',
          'Change the font size so the teacher doesn’t detect plagiarism',
          'Erase the original author’s name',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Excelente! A honestidade académica e o respeito pelos direitos de autor são regras fundamentais em TIC.',
        en: 'Excellent! Academic integrity and respect for copyright are cornerstone rules in ICT.',
      },
    },
    {
      id: 'fq3-9',
      question: {
        pt: 'Como podes guardar facilmente uma página útil no navegador para a poderes consultar mais tarde em casa?',
        en: 'How can you easily save a useful web page in the browser to view it later at home?',
      },
      options: {
        pt: [
          'Escrever o link com caneta na mão',
          'Adicionar aos Marcadores / Favoritos do navegador (atalho Ctrl + D)',
          'Tirar uma fotografia com o telemóvel ao monitor',
          'Deixar o computador ligado durante a noite toda',
        ],
        en: [
          'Write the link with pen on your palm',
          'Add to browser Bookmarks / Favorites (shortcut Ctrl + D)',
          'Take a phone photo of the monitor',
          'Leave the computer on all night long',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Parabéns! Os marcadores guardam o link exato e permitem organizá-lo em pastas.',
        en: 'Congratulations! Bookmarks save the exact URL and let you organize them into folders.',
      },
    },
    {
      id: 'fq3-10',
      question: {
        pt: 'Qual é a melhor forma de preparar a informação recolhida antes de criar a apresentação final?',
        en: 'What is the best way to prepare gathered research before creating your final presentation?',
      },
      options: {
        pt: [
          'Copiar 20 páginas de texto sem ler nada',
          'Tirar notas dos pontos essenciais, selecionar as 3 a 5 ideias principais e explicar por palavras próprias',
          'Pedir a outra pessoa para fazer o trabalho por ti',
          'Escolher apenas o primeiro resultado que apareceu no motor de busca',
        ],
        en: [
          'Copy 20 pages of unread text',
          'Take notes of essential points, curate the 3 to 5 core ideas, and explain in your own words',
          'Ask someone else to do the project for you',
          'Select only the very first link that showed up in the search engine',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Brilhante! Selecionar criticamente e sintetizar com clareza é o segredo de um verdadeiro detetive da informação!',
        en: 'Brilliant! Critical curation and clear synthesis are the hallmarks of a true digital information detective!',
      },
    },
  ],
};
