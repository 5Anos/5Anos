import { ThemeDefinition } from '../types';

export const themeNavegarInternetData: ThemeDefinition = {
  id: 'navegar-internet',
  number: 6,
  title: {
    pt: 'Navegar e Pesquisar na Internet',
    en: 'Browsing and Searching the Web',
  },
  tagline: {
    pt: 'Aprende os segredos dos motores de busca, as palavras-chave ninja e como pesquisar como um detetive digital!',
    en: 'Master search engine secrets, ninja keywords, and research like a digital detective!',
  },
  intro: {
    pt: 'A Internet é como a maior biblioteca do planeta! Mas para encontrares a informação certa para os teus trabalhos escolares, precisas de saber guiar o navegador, escolher palavras-chave precisas, usar operadores secretos como as aspas e o sinal menos, e reconhecer o que é verdadeiro ou falso.',
    en: 'The Internet is the biggest library on Earth! But to find accurate school project facts, you need to steer your browser, pick precise keywords, use secret operators like quotes and minus signs, and verify what is genuine or fake.',
  },
  icon: '🌐',
  illustrationKey: 'navegar-internet',
  accentColor: 'sky',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: '1. Navegador & URL', en: '1. Browser & URL' },
      h: { pt: 'A Web, o Navegador e os Endereços URL', en: 'The Web, Browsers, and URL Addresses' },
      body: {
        pt: 'A <strong>Internet</strong> é a rede mundial de cabos e antenas que liga todos os computadores. A <strong>Web</strong> é a coleção de páginas com texto, fotos e vídeos que podemos visitar.<br><br>Para viajar na Web precisas de uma "nave": o <strong>Navegador (Browser)</strong>, como o Google Chrome, Microsoft Edge, Mozilla Firefox ou Safari.<br><br><strong>Elementos essenciais do navegador:</strong><ul><li><strong>Barra de Endereços vs. Caixa de Pesquisa:</strong> Na barra de endereços escreves a morada exata (URL) para ir logo ao site (ex.: <em>https://area.escola.pt</em>). Na caixa de pesquisa escreves dúvidas e palavras quando queres procurar.</li><li><strong>O que é o URL:</strong> É a morada única de cada página na Internet. A terminação <strong>.pt</strong> indica que o site está registado em <strong>Portugal</strong> (outros exemplos: .org para organizações, .gov.pt para o governo, .edu para educação).</li><li><strong>Cadeado HTTPS 🔒:</strong> Indica que a ligação entre o teu computador e o site é cifrada e segura. <em>Atenção: o cadeado protege os dados, mas não garante por si só que as notícias do site sejam verdadeiras!</em></li><li><strong>Marcadores (Favoritos ⭐️) e Histórico 🕒:</strong> Os marcadores guardam atalhos para os teus sites favoritos num clique; o histórico lista as páginas que visitaste antes.</li></ul>',
        en: 'The <strong>Internet</strong> is the global network connecting computers. The <strong>Web</strong> is the collection of pages with text, images, and videos we explore.<br><br>To travel the Web you need a vehicle: a <strong>Web Browser</strong>, such as Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.<br><br><strong>Key browser components:</strong><ul><li><strong>Address Bar vs. Search Box:</strong> In the address bar you type the exact URL (e.g. <em>https://area.escola.pt</em>). In the search box you type queries when you want to search.</li><li><strong>What is a URL:</strong> The unique address of a webpage. The <strong>.pt</strong> top-level domain represents <strong>Portugal</strong> (.org for non-profits, .gov for government, .edu for education).</li><li><strong>HTTPS Padlock 🔒:</strong> Indicates encrypted data transmission. <em>Note: encryption protects transmission, but does not guarantee the content is accurate!</em></li><li><strong>Bookmarks (⭐️) and History 🕒:</strong> Bookmarks save single-click shortcuts; history logs past pages.</li></ul>',
      },
      icon: '🧭',
    },
    {
      eyebrow: { pt: '2. Palavras-Chave', en: '2. Keywords' },
      h: { pt: 'O Segredo das Palavras-Chave: Pesquisar como um Pro', en: 'Keyword Secrets: Search Like a Pro' },
      body: {
        pt: 'Um <strong>Motor de Busca</strong> (como o Google, Kiddle ou Bing) usa robôs automáticos que leem milhões de páginas e organizam um índice gigantesco.<br><br><strong>O Grande Erro dos Principiantes:</strong> Escrever frases longas como se estivessem a falar com uma pessoa (ex.: <em>"olá senhor google podes dizer-me por favor o que come o animal lince e quanto pesa ele obrigado"</em>). O computador não precisa de palavras como "olá", "por favor" ou "obrigado".<br><br><strong>A Regra das Palavras-Chave Ninja:</strong><ul><li><strong>Escolhe 3 a 5 palavras essenciais:</strong> Seleciona apenas os nomes próprios, termos científicos e o assunto exato.</li><li><strong>Exemplo Prático:</strong> Em vez de escrever uma frase enorme, escreve apenas: <em>lince iberico alimentacao peso portugal</em>.</li><li><strong>Cuidado com os Resultados:</strong> O primeiro resultado no topo da página de pesquisa muitas vezes é um <strong>Anúncio Patrocinado (Sponsored / Ad)</strong>! Lê sempre o título do site e o pequeno resumo (snippet) antes de clicar.</li></ul>',
        en: 'A <strong>Search Engine</strong> (Google, Kiddle, Bing) uses crawlers to catalog millions of pages into an index.<br><br><strong>Common Beginner Mistake:</strong> Typing long conversational queries (e.g. <em>"hello mr google can you please tell me what lynxes eat and weigh thanks"</em>). Filler words only confuse indexing algorithms.<br><br><strong>Ninja Keyword Rules:</strong><ul><li><strong>Pick 3 to 5 key terms:</strong> Focus strictly on subject nouns and specific descriptors.</li><li><strong>Practical Example:</strong> Instead of a long paragraph, search: <em>iberian lynx diet weight portugal</em>.</li><li><strong>Mind the Results:</strong> The top result is frequently a <strong>Sponsored Ad</strong>! Always scan the title, URL, and snippet before clicking.</li></ul>',
      },
      icon: '🔎',
    },
    {
      eyebrow: { pt: '3. Filtros & Aspas', en: '3. Search Operators' },
      h: { pt: 'Superpoderes da Pesquisa: Aspas " " e Sinal Menos -', en: 'Search Superpowers: Quotes " " and Minus -' },
      body: {
        pt: 'Os detetives digitais usam <strong>operadores de pesquisa</strong> para encontrar agulhas num palheiro e eliminar resultados inúteis!<br><br><strong>Os 3 Superpoderes Mais Importantes:</strong><ul><li><strong>1. Aspas " " (Frase Exata):</strong> Quando colocas termos entre aspas, o motor procura <strong>exatamente aquela sequência de palavras na mesma ordem</strong>.<br>👉 Exemplo: <em>"D. Afonso Henriques"</em> ou <em>"A Cavaleira da Dinamarca"</em>. Sem aspas, ele mostrava páginas com Afonso e páginas com Henriques separadas!</li><li><strong>2. Sinal de Menos - (Excluir Palavras):</strong> Colocar um sinal de menos colado a uma palavra elimina todos os resultados sobre esse tema indesejado.<br>👉 Exemplo: <em>jaguar animal -carro</em> (encontra o felino selvagem e apaga todos os automóveis!).<br>👉 Exemplo: <em>morcego -batman</em> (mostra o mamífero voador sem filmes de super-heróis).</li><li><strong>3. Operador site:.pt (Apenas Sites Nacionais):</strong> Mostra apenas páginas oficiais de Portugal.<br>👉 Exemplo: <em>golfinhos sado site:.pt</em> (mostra reservas e centros de ciência portugueses).</li></ul>',
        en: 'Digital detectives use <strong>search operators</strong> to pinpoint exact facts and filter irrelevant clutter!<br><br><strong>The 3 Most Vital Superpowers:</strong><ul><li><strong>1. Quotes " " (Exact Match):</strong> Finds the <strong>exact sequence of words in order</strong>.<br>👉 Example: <em>"D. Afonso Henriques"</em> or <em>"A Cavaleira da Dinamarca"</em>. Without quotes, words appear scattered!</li><li><strong>2. Minus Sign - (Exclude Terms):</strong> Excludes unwanted concepts.<br>👉 Example: <em>jaguar animal -car</em> (targets the wild feline and drops automobile brands!).<br>👉 Example: <em>bat mammal -batman</em> (shows the winged animal without comics).</li><li><strong>3. Operator site:.pt (Local Domains):</strong> Restricts results to Portuguese domains.<br>👉 Example: <em>dolphins sado site:.pt</em>.</li></ul>',
      },
      icon: '⚡',
    },
    {
      eyebrow: { pt: '4. Detetive de Fontes', en: '4. Source Detective' },
      h: { pt: 'Nem Tudo é Verdade: Como Avaliar Sites e Notícias', en: 'Not Everything is True: Evaluating Online Facts' },
      body: {
        pt: 'Na Internet qualquer pessoa pode criar uma página e escrever mentiras, brincadeiras ou notícias falsas (Fake News). Nunca copies informação para um trabalho escolar sem a verificar!<br><br><strong>A Regra dos 3 C\'s do Detetive:</strong><ul><li><strong>1. Criador / Autor:</strong> Quem escreveu o artigo? É um cientista, museu, enciclopédia escolar reconhecida (.edu, .gov, Ciência Viva, RTP Ensina) ou é um utilizador anónimo num fórum?</li><li><strong>2. Calma com a Data:</strong> O artigo foi publicado recentemente ou tem 15 anos? Em Ciência e Tecnologia as informações desatualizadas podem já estar erradas.</li><li><strong>3. Confirmar em 2 ou 3 Fontes:</strong> Nunca confies na primeira página que abres! Cruza sempre os dados com outro site de confiança e confirma no teu manual escolar antes de entregar o trabalho ao professor.</li></ul>',
        en: 'Anyone can build a website and publish hoaxes, jokes, or fake news. Never paste information into school homework without verifying!<br><br><strong>The 3-C Detective Rule:</strong><ul><li><strong>1. Creator / Author:</strong> Who wrote this? A museum, university, verified science portal, or an anonymous user on an internet forum?</li><li><strong>2. Check Date:</strong> Was it published recently? Outdated science facts might be inaccurate.</li><li><strong>3. Cross-Check 2-3 Sources:</strong> Never trust the first link alone! Compare facts across reliable sources and textbooks before submitting homework.</li></ul>',
      },
      icon: '🕵️',
    },
    {
      eyebrow: { pt: '5. Falsos Downloads', en: '5. Download Traps' },
      h: { pt: 'Cuidado com Falsos Botões de Download e Pop-ups', en: 'Beware of Fake Download Buttons and Pop-ups' },
      body: {
        pt: 'Ao navegar na Web para fazer trabalhos ou jogar, vais encontrar armadilhas que tentam enganar os utilizadores.<br><br><strong>Como Proteger o Teu Computador:</strong><ul><li><strong>A Armadilha do Botão Falso:</strong> Em páginas de transferências ou jogos gratuitos, aparecem botões verdes gigantes a dizer "DOWNLOAD AQUI". Quase sempre são anúncios fraudulentos! O botão de transferência verdadeiro costuma ser mais discreto.</li><li><strong>Pop-ups de Falsos Prémios:</strong> Janelas a piscar com "PARABÉNS! Ganhaste um telemóvel!" são sempre burlas. Nunca cliques nem coloques o teu nome ou telefone. Fecha a janela de imediato!</li><li><strong>Ficheiros Perigosos (.exe):</strong> Ficheiros com extensão <em>.exe</em> executam programas no computador e podem conter vírus. Nunca descarregues nem abras ficheiros executáveis sem a autorização expressa de um adulto.</li><li><strong>Se vires algo assustador ou impróprio:</strong> Fecha o separador imediatamente e avisa os teus pais ou o professor. Não tens culpa nenhuma de abrir um link errado por acidente!</li></ul>',
        en: 'While browsing for research or games, you will encounter misleading traps.<br><br><strong>Defend Your Computer:</strong><ul><li><strong>Fake Download Buttons:</strong> Massive green buttons flashing "DOWNLOAD HERE" are usually third-party ads. The real download link is modest and authentic.</li><li><strong>Fake Prize Pop-ups:</strong> "CONGRATULATIONS! You won a phone!" is always a scam. Never enter phone numbers or home addresses. Close the tab immediately!</li><li><strong>Risky Files (.exe):</strong> Executable files (.exe) run software and might spread malware. Never execute unknown downloads without adult supervision.</li><li><strong>If You Encounter Inappropriate Content:</strong> Close the tab right away and inform a parent or teacher. You are never at fault for stumbling upon bad links!</li></ul>',
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
        pt: 'Como funcionam o Chrome, Edge, Firefox, o cadeado HTTPS e o domínio nacional .pt.',
        en: 'How Chrome, Edge, Firefox, the HTTPS padlock, and national .pt domains work.',
      },
      icon: '🧭',
      explanation: {
        pt: [
          'A Internet é a rede que liga computadores; a Web é a coleção de páginas que visitamos.',
          'Navegador (Browser): aplicação usada para abrir sites (Google Chrome, Microsoft Edge, Safari, Firefox).',
          'Barra de Endereços: morada exata (URL) para ir direto ao site. Caixa de Pesquisa: escrever dúvidas para o motor procurar.',
          'URL e Domínio .pt: endereço único de uma página. O .pt identifica sites associados a Portugal.',
          'Cadeado HTTPS 🔒: ligação cifrada e segura. Não garante que as notícias sejam verdadeiras.',
          'Marcadores ⭐️ e Histórico 🕒: guardar atalhos para páginas favoritas num clique e consultar o que visitaste.',
        ],
        en: [
          'The Internet is the hardware network; the Web is the collection of pages.',
          'Web Browser: app used to open pages (Chrome, Edge, Safari, Firefox).',
          'Address Bar: direct URL address. Search Box: keywords for search engines.',
          'URL and .pt Domain: unique web address. The .pt represents Portugal.',
          'HTTPS Padlock 🔒: encrypted connection. Does not prove information accuracy.',
          'Bookmarks ⭐️ and History 🕒: one-click favorite shortcuts and visited logs.',
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
          pt: 'Escrever diretamente um endereço que conheces é muito mais rápido e evita resultados enganadores de pesquisa.',
          en: 'Typing known addresses directly is faster and bypasses misleading search links.',
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
      id: 'net-palavras-chave-ninja',
      themeId: 'navegar-internet',
      number: 2,
      title: {
        pt: 'Palavras-Chave Ninja e Motores de Busca',
        en: 'Ninja Keywords and Search Engines',
      },
      shortDesc: {
        pt: 'Aprende a transformar perguntas longas em 3 ou 4 termos precisos para trabalhos escolares.',
        en: 'Turn wordy questions into 3-4 precise keywords for school homework.',
      },
      icon: '🔎',
      explanation: {
        pt: [
          'Os motores de busca não são seres humanos; funcionam por correspondência de palavras-chave no seu índice.',
          'Elimina palavras inúteis: saudações (olá, obrigado), pronomes e perguntas informais compridas.',
          'Escolhe termos específicos: junta o nome da espécie/monumento com o tema (ex.: lince iberico alimentacao).',
          'Atenção aos Anúncios: as primeiras posições da página de resultados muitas vezes são anúncios pagos (Patrocinado / Ad).',
          'Lê sempre o resumo (snippet): confirma se o artigo responde ao teu trabalho antes de abrir.',
        ],
        en: [
          'Search engines match keywords against an indexed catalog.',
          'Drop filler words: greetings, conversational phrases, and informal questions.',
          'Use specific terminology: pair proper nouns with scientific or historical topics.',
          'Watch out for Ads: top search spots are frequently paid sponsored listings.',
          'Read snippets: inspect preview text to verify relevance before clicking.',
        ],
      },
      example: {
        title: {
          pt: 'Trabalho sobre o Lince-Ibérico',
          en: 'Iberian lynx school project',
        },
        scenario: {
          pt: 'A Inês escreveu "lince iberico alimentacao peso portugal" no motor de busca e encontrou logo no topo a página oficial do ICNF com todos os dados biológicos de que precisava.',
          en: 'Inês typed "iberian lynx diet weight portugal" and instantly found the official national biodiversity institute page with verified biological facts.',
        },
        tip: {
          pt: 'Palavras precisas trazem respostas precisas! Poupa tempo evitando frases conversacionais longas.',
          en: 'Precise keywords yield precise facts! Avoid conversational paragraphs.',
        },
      },
      funFact: {
        pt: 'Sabias que o Google processa mais de 8,5 mil milhões de pesquisas todos os dias em todo o mundo?',
        en: 'Did you know Google processes over 8.5 billion searches every single day worldwide?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Por que razão escrever "olá google podes dizer-me por favor" é uma má técnica de pesquisa?',
          en: 'Why is typing "hello google can you please tell me" a poor search strategy?',
        },
        clue: {
          pt: 'Pensa no tempo que o robô perde a comparar palavras que não têm nada a ver com o tema do trabalho.',
          en: 'Think about irrelevant words cluttering the algorithmic query.',
        },
        reflection: {
          pt: 'O motor de busca procura todas as palavras escritas. Adicionar saudações e pedidos de favor só baralha os resultados com páginas irrelevantes.',
          en: 'Search engines index every term. Adding pleasantries clutters results with irrelevant forum discussions.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-2',
          question: {
            pt: 'Qual destas pesquisas é a mais eficiente para um trabalho de Ciências sobre vulcões nos Açores?',
            en: 'Which query is the most effective for a Science report about Azores volcanoes?',
          },
          options: {
            pt: [
              'olá motor de busca diz-me tudo sobre vulcões que deitam fumo nas ilhas bonitas dos Açores',
              'vulcoes acores caracteristicas geologia',
              'coisas da terra',
              'quero saber vulcão por favor',
            ],
            en: [
              'hello search engine tell me all about smoking volcanoes in the pretty Azores islands',
              'azores volcanoes geology characteristics',
              'earth stuff',
              'i want to know volcano please',
            ],
          },
          correctIndex: 1,
          explanation: {
            pt: 'Palavras-chave diretas, científicas e geográficas conduzem diretamente a artigos escolares fiáveis.',
            en: 'Direct geographical and scientific keywords guide engines to verified educational articles.',
          },
        },
      ],
    },
    {
      id: 'net-operadores-aspas-menos',
      themeId: 'navegar-internet',
      number: 3,
      title: {
        pt: 'Superpoderes: Aspas "" e o Sinal Menos -',
        en: 'Superpowers: Quotes "" and the Minus - Sign',
      },
      shortDesc: {
        pt: 'Descobre os operadores secretos para encontrar expressões exatas e excluir resultados indesejados.',
        en: 'Discover secret search operators to match exact phrases and exclude irrelevant noise.',
      },
      icon: '⚡',
      explanation: {
        pt: [
          'Aspas " " (Frase Exata): prende as palavras juntas na mesma sequência. Indispensável para nomes de reis, poemas e títulos.',
          'Sinal Menos - (Exclusão): elimina resultados que contenham o termo colado ao sinal (ex.: jaguar animal -carro).',
          'Operador site:.pt: restringe os resultados a domínios de Portugal, útil para dados estatísticos e fontes nacionais.',
          'Operador filetype:pdf: encontra apresentações, relatórios e manuais em formato PDF.',
          'Combinar operadores: podes usar "D. Afonso Henriques" -lenda site:.pt para encontrar história pura!',
        ],
        en: [
          'Quotes " ": locks words together in exact sequence. Crucial for book titles, poems, and historical monarchs.',
          'Minus Sign -: strips results containing the attached term (e.g. jaguar mammal -car).',
          'Operator site:.pt: filters results to Portuguese domains for national statistics.',
          'Operator filetype:pdf: retrieves school guides and PDF documents.',
          'Combining operators: you can use "D. Afonso Henriques" -myth site:.pt for pure historical sources!',
        ],
      },
      example: {
        title: {
          pt: 'Pesquisa do poema de Fernando Pessoa',
          en: 'Searching a Fernando Pessoa poem',
        },
        scenario: {
          pt: 'O Tiago precisava de encontrar a estrofe que diz "O poeta é um fingidor". Ao colocar entre aspas `"O poeta é um fingidor"`, o motor de busca encontrou imediatamente o poema Autopsicografia na primeira tentativa.',
          en: 'Tiago needed to find the verse "O poeta é um fingidor". Enclosing the quote in quotation marks targeted Fernando Pessoa’s Autopsicografia on the very first try.',
        },
        tip: {
          pt: 'Se procurares títulos de livros escolares, usa sempre aspas para não receberes páginas com as palavras todas dispersas.',
          en: 'When searching book titles or exact quotes, always wrap them in quotation marks.',
        },
      },
      funFact: {
        pt: 'Sabias que o sinal de menos tem de estar colado à palavra (ex: -carro) sem espaço para o motor entender que é uma exclusão?',
        en: 'Did you know the minus sign must touch the word without spaces (-car) for the search engine to recognize it as an exclusion operator?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se pesquisares "morcego -batman", o que esperas que o motor de busca te mostre?',
          en: 'If you search "bat -batman", what do you expect the search engine to display?',
        },
        clue: {
          pt: 'O sinal de menos apaga o super-herói dos quadradinhos.',
          en: 'The minus sign removes the comic book superhero.',
        },
        reflection: {
          pt: 'O motor de busca vai mostrar informações biológicas sobre o mamífero voador morcego, excluindo todos os filmes, jogos e brinquedos do Batman.',
          en: 'The engine will display biological facts about the flying mammal, stripping out Batman movies, games, and merchandise.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-3',
          question: {
            pt: 'Para que serve colocar uma expressão entre aspas numa pesquisa na Web (ex.: "A Cavaleira da Dinamarca")?',
            en: 'What is the purpose of enclosing a phrase in quotation marks in a Web search (e.g. "A Cavaleira da Dinamarca")?',
          },
          options: {
            pt: [
              'Para obrigar o motor de busca a encontrar exatamente aquelas palavras juntas e pela mesma ordem',
              'Para apagar o histórico de navegação do computador',
              'Para aumentar o tamanho das letras no ecrã',
              'Para traduzir automaticamente a página para inglês',
            ],
            en: [
              'To force the search engine to match those exact words together in that order',
              'To delete the browser navigation history',
              'To increase screen font size',
              'To automatically translate the page to English',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'As aspas forçam o motor a respeitar a sequência exata de palavras, evitando resultados soltos e dispersos.',
            en: 'Quotes enforce exact phrase matching, eliminating scattered word matches.',
          },
        },
      ],
    },
    {
      id: 'net-avaliar-fontes-detetive',
      themeId: 'navegar-internet',
      number: 4,
      title: {
        pt: 'Detetive da Web: Avaliar Fontes e Fact-Checking',
        en: 'Web Detective: Source Evaluation and Fact-Checking',
      },
      shortDesc: {
        pt: 'Aprende a detetar boatos e notícias falsas aplicando a regra dos 3 C\'s.',
        en: 'Learn how to detect fake news and rumors applying the 3-C evaluation rule.',
      },
      icon: '🕵️',
      explanation: {
        pt: [
          'Nem tudo na Internet é verdade: qualquer pessoa pode criar uma página sem supervisão.',
          'Estar em 1.º lugar no Google não é garantia de verdade; depende de algoritmos e técnicas de posicionamento.',
          'Regra dos 3 C\'s: Criador (quem escreveu?), Calma com a data (está atualizado?), Confirmar (cruzar em 2 ou 3 fontes).',
          'Domínios de confiança: museus, bibliotecas, enciclopédias oficiais, portais governamentais (.gov.pt) e universitários (.edu).',
          'Desconfia de títulos bombásticos ou milagrosos (ex.: "Comer terra cura constipações!").',
        ],
        en: [
          'Not everything online is true: anyone can publish unverified content.',
          'Ranking #1 on Google does not prove factual truth; it depends on indexing algorithms.',
          '3-C Rule: Creator (who wrote it?), Check Date (is it up to date?), Cross-check (verify across 2-3 independent sources).',
          'Trusted domains: museums, verified encyclopedias, government portals (.gov.pt), and university research (.edu).',
          'Distrust sensationalist headlines promising miracles.',
        ],
      },
      example: {
        title: {
          pt: 'A notícia do tubarão no Rio Tejo',
          en: 'The River Tagus shark hoax',
        },
        scenario: {
          pt: 'O Diogo viu num blogue que um tubarão gigante tinha sido avistado na praia de Belém. Antes de contar aos colegas, foi verificar a jornais nacionais e ao site da Polícia Marítima e descobriu que era uma montagem antiga de fotografia!',
          en: 'Diogo read a blog claiming a giant shark was swimming at Belém beach in Lisbon. Before telling classmates, he checked national news and maritime police portals, discovering it was an old photo hoax!',
        },
        tip: {
          pt: 'Pensar antes de partilhar é o superpoder do cidadão digital responsável!',
          en: 'Think before sharing is the superpower of responsible digital citizens!',
        },
      },
      funFact: {
        pt: 'Sabias que notícias falsas e boatos espalham-se 6 vezes mais depressa na Internet do que a verdade, porque apelam ao choque e à surpresa?',
        en: 'Did you know false rumors spread 6 times faster online than truth because they exploit emotional shock and surprise?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se uma notícia não tiver nome de autor nem data de publicação, o que deves fazer?',
          en: 'If a news article has no author name and no publication date, what should you do?',
        },
        clue: {
          pt: 'Pensa se confiarias num bilhete sem assinatura deixado na rua.',
          en: 'Would you trust an unsigned note found on the street?',
        },
        reflection: {
          pt: 'Sem autor nem data, é impossível saber quem se responsabiliza pelo texto. Deves desconfiar de imediato e procurar fontes com autores reconhecidos.',
          en: 'Without an author or date, nobody takes responsibility for the text. Distrust it and look for verified sources.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-4',
          question: {
            pt: 'Estar em primeiro lugar nos resultados do Google significa obrigatoriamente que a informação é verdadeira?',
            en: 'Does ranking first in Google search results mean the information is guaranteed to be true?',
          },
          options: {
            pt: [
              'Não, a ordem depende de algoritmos e anúncios; devemos sempre avaliar a fonte e comparar com outros sites',
              'Sim, porque os computadores do Google só mostram verdades absolutas',
              'Sim, porque todas as mentiras da Internet são apagadas automaticamente',
              'Não, porque o primeiro lugar é sempre uma página de ficção científica',
            ],
            en: [
              'No, ranking depends on algorithms and ads; we must always evaluate the source and compare facts',
              'Yes, because Google computers only display absolute truths',
              'Yes, because all online lies are automatically deleted',
              'No, because the top spot is always science fiction',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'A posição nos resultados depende de relevância algorítmica e otimização. Pensamento crítico e comparação de fontes são indispensáveis!',
            en: 'Search rankings depend on algorithms and SEO. Critical evaluation and cross-referencing are mandatory!',
          },
        },
      ],
    },
    {
      id: 'net-armadilhas-downloads',
      themeId: 'navegar-internet',
      number: 5,
      title: {
        pt: 'Escudo Digital: Falsos Downloads e Anúncios',
        en: 'Digital Shield: Fake Downloads and Scams',
      },
      shortDesc: {
        pt: 'Aprende a reconhecer botões falsos de download, pop-ups de prémios e ficheiros perigosos.',
        en: 'Spot misleading download buttons, prize pop-ups, and hazardous executable files.',
      },
      icon: '🛡️',
      explanation: {
        pt: [
          'Falsos botões de download: anúncios disfarçados de botões verdes grandes em sites de jogos para te fazer clicar em publicidade.',
          'Pop-ups de prémios ("Ganhaste um telemóvel!"): esquemas de burla para roubar números de telefone e dados bancários.',
          'Ficheiros com extensão .exe: executam programas e podem infetar o computador com vírus se vierem de fontes desconhecidas.',
          'Prever o link (Hover): passar o rato por cima de um link mostra o destino real no canto inferior da janela antes de clicares.',
          'Se vires algo desconfortável ou assustador: fecha logo a janela e pede apoio a um adulto de confiança.',
        ],
        en: [
          'Fake download buttons: ads masquerading as giant green buttons on gaming sites to trick clicks.',
          'Prize pop-ups ("You won a phone!"): scams designed to extract phone numbers and financial data.',
          'Files ending in .exe: executable code that can install malware from untrusted origins.',
          'Link Hover preview: hovering reveals the genuine destination URL in the browser corner before clicking.',
          'If you encounter disturbing content: close the tab immediately and notify a trusted adult.',
        ],
      },
      example: {
        title: {
          pt: 'A janela de prémio no jogo online',
          en: 'The gaming website prize pop-up',
        },
        scenario: {
          pt: 'Enquanto o Afonso jogava, apareceu uma janela vermelha a piscar: "Clica para receber 10.000 moedas grátis!". O Afonso lembrou-se da aula de TIC, não clicou no anúncio e fechou logo o separador, mantendo o computador seguro.',
          en: 'While Afonso was gaming, a flashing banner popped up: "Click here for 10,000 free coins!". Remembering his ICT class, Afonso didn’t click and closed the tab, keeping his computer safe.',
        },
        tip: {
          pt: 'Nenhum site oficial dá prémios fabulosos a quem não participou em passatempos reais com autorização dos pais!',
          en: 'No legitimate portal gives free prizes without real parental-approved contests!',
        },
      },
      funFact: {
        pt: 'Sabias que passar o rato por cima de um link sem clicar (hover) é a melhor técnica de segurança para ver a verdadeira morada do site?',
        en: 'Did you know hovering over a link without clicking is the top safety technique to reveal the actual destination address?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que nunca deves descarregar um ficheiro com extensão .exe de um site de jogos desconhecido?',
          en: 'Why should you never download an .exe file from an unknown gaming site?',
        },
        clue: {
          pt: 'A extensão .exe significa "executável" (executa instruções no sistema operativo).',
          en: 'The .exe extension stands for executable code.',
        },
        reflection: {
          pt: 'Ficheiros .exe podem instalar cavalos de Troia, vírus ou programas espiões que roubam palavras-passe e danificam o computador.',
          en: 'Files with .exe extensions can install trojans, viruses, or spyware that capture passwords and damage the operating system.',
        },
      },
      quizQuestions: [
        {
          id: 'q-net-5',
          question: {
            pt: 'O que deves fazer se surgir uma janela pop-up a dizer "Parabéns! Ganhaste um telemóvel novo, clica aqui para receber"?',
            en: 'What should you do if a pop-up window claims "Congratulations! You won a new phone, click here to receive"?',
          },
          options: {
            pt: [
              'Fechar imediatamente a janela sem clicar em botões nem preencher qualquer dado pessoal',
              'Preencher a morada de casa e o número de telefone dos pais',
              'Enviar o link a todos os colegas de turma para também ganharem',
              'Ligar para o número que aparece no ecrã a pedir o prémio',
            ],
            en: [
              'Close the window immediately without clicking buttons or entering personal information',
              'Type your home address and your parents\' phone number',
              'Share the link with all classmates so they win too',
              'Call the phone number on screen to claim the prize',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'É uma burla clássica da Internet para roubar dados. A melhor defesa é fechar a janela de imediato sem interagir.',
            en: 'It is a classic internet scam to steal personal data. The safest action is closing the tab without clicking.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'desafio-palavras-chave',
      themeId: 'navegar-internet',
      number: 1,
      title: { pt: '🔎 O Mestre das Palavras-Chave', en: '🔎 Keyword Master' },
      shortDesc: {
        pt: 'Transforma dúvidas escolares em palavras-chave ninja e descobre os melhores resultados!',
        en: 'Turn school homework questions into ninja keywords and discover the best results!',
      },
      icon: '🔎',
      durationMinutes: 4,
      points: 100,
      type: 'keywords_master',
      gameData: {
        type: 'mc',
        title: 'O Mestre das Palavras-Chave',
        icon: '🔎',
        xp: 100,
        desc: 'Identifica a melhor estratégia de pesquisa na Internet para trabalhos escolares.',
        data: {
          questions: [
            {
              q: 'Se precisas de pesquisar sobre a alimentação e peso do lince-ibérico para Ciências, qual é a melhor pesquisa?',
              opts: [
                'olá computador mostra-me coisas bonitas da terra',
                'lince iberico alimentacao peso portugal',
                'lince',
                'quero saber tudo sobre animais comilões por favor'
              ],
              c: 1,
              e: 'Escolhe palavras-chave específicas e relacionadas com aquilo que procuras para ajudar o motor de busca a encontrar exatamente o que precisas.'
            },
            {
              q: 'O que deves evitar ao escrever uma pesquisa no motor de busca?',
              opts: [
                'Escrever termos científicos e nomes próprios específicos',
                'Escrever frases conversacionais longas com saudações como "olá" e "por favor"',
                'Usar palavras em português correto',
                'Procurar por factos históricos'
              ],
              c: 1,
              e: 'Palavras conversacionais como "olá" e "por favor" não ajudam o motor de busca e baralham os resultados.'
            }
          ]
        }
      }
    },
    {
      id: 'desafio-misterio-aspas',
      themeId: 'navegar-internet',
      number: 2,
      title: { pt: '⚡ O Mistério das Aspas e Operadores', en: '⚡ The Search Operators Mystery' },
      shortDesc: {
        pt: 'Usa aspas "" e o sinal menos - para resolver enigmas e filtrar resultados indesejados!',
        en: 'Use quotes "" and minus signs - to solve riddles and filter unwanted results!',
      },
      icon: '⚡',
      durationMinutes: 4,
      points: 100,
      type: 'search_operators',
      gameData: {
        type: 'mc',
        title: 'O Mistério das Aspas e Operadores',
        icon: '⚡',
        xp: 100,
        desc: 'Domina os superpoderes dos motores de busca: aspas, sinal menos e filtros.',
        data: {
          questions: [
            {
              q: 'Se quiseres procurar a expressão exata "D. Afonso Henriques", o que deves usar?',
              opts: [
                'D. Afonso Henriques!!! (com pontos de exclamação)',
                'Escrever tudo em maiúsculas',
                '"D. Afonso Henriques" (entre aspas)',
                'Apagar o espaço entre as palavras'
              ],
              c: 2,
              e: 'As aspas forçam o motor de busca a procurar a expressão exata com as palavras todas juntas pela mesma ordem!'
            },
            {
              q: 'Queres pesquisar sobre o felino jaguar sem ver anúncios de automóveis da marca Jaguar. O que escreves?',
              opts: [
                'jaguar animal -carro',
                'jaguar +carro +automóvel',
                'jaguar sem ver carros por favor',
                'carro jaguar não quero'
              ],
              c: 0,
              e: 'O operador sinal menos colado à palavra (-carro) exclui todas as páginas que contenham esse termo indesejado!'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-net-match',
      themeId: 'navegar-internet',
      number: 3,
      title: { pt: '🔗 Sinais de Segurança e Navegação', en: '🔗 Web Safety & Browsing Signs' },
      shortDesc: {
        pt: 'Associa cada conceito digital (HTTPS, aspas, sinal menos, domínio .pt) ao seu significado correto.',
        en: 'Match each digital concept (HTTPS, quotes, minus sign, .pt domain) to its correct meaning.',
      },
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
            { left: 'Aspas " "', right: 'Procura a frase exata sem separar as palavras' },
            { left: 'Sinal de Menos -', right: 'Exclui palavras e temas indesejados da pesquisa' },
            { left: 'Cadeado HTTPS 🔒', right: 'Ligação cifrada (não garante que o conteúdo seja verdadeiro)' },
            { left: 'Domínio .pt', right: 'Domínio de topo associado a Portugal' },
            { left: 'Marcadores ⭐️', right: 'Guardam atalhos para páginas favoritas num só clique' },
            { left: 'Falso botão "DOWNLOAD"', right: 'Publicidade enganosa em sites de jogos' }
          ]
        }
      }
    },
    {
      id: 'jogo-net-tf',
      themeId: 'navegar-internet',
      number: 4,
      title: { pt: '🧭 Navegar e Pesquisar: Verdadeiro ou Falso?', en: '🧭 Browsing & Searching: True or False?' },
      shortDesc: {
        pt: 'Avalia se cada afirmação sobre pesquisas, palavras-chave e armadilhas é verdadeira ou falsa.',
        en: 'Evaluate whether statements about searches, keywords, and traps are true or false.',
      },
      icon: '🧭',
      durationMinutes: 4,
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Navegar e Pesquisar: Verdadeiro ou Falso?',
        icon: '🧭',
        xp: 100,
        desc: 'Classifica cada afirmação sobre a navegação, pesquisa e segurança online.',
        data: {
          items: [
            {
              s: 'Escrever "olá senhor google podes dizer-me por favor" é a forma mais eficaz de pesquisar para um trabalho escolar.',
              a: false,
              e: 'Falso! Deves usar 3 a 5 palavras-chave precisas e diretas, sem saudações nem conversas longas.'
            },
            {
              s: 'Colocar uma expressão entre aspas (ex.: "Batalha de São Mamede") faz o motor procurar a frase exata na mesma ordem.',
              a: true,
              e: 'Verdadeiro! As aspas trancam as palavras juntas na mesma sequência.'
            },
            {
              s: 'Se pesquisares "morcego -batman", o motor de busca elimina os resultados que falem sobre o Batman.',
              a: true,
              e: 'Verdadeiro! O sinal de menos (-) exclui temas que não queres ver nos resultados.'
            },
            {
              s: 'O primeiro resultado no topo da página do Google é sempre e obrigatoriamente a verdade absoluta.',
              a: false,
              e: 'Falso! Muitas vezes o topo tem anúncios patrocinados e a ordem depende de algoritmos, não de verificação de factos.'
            },
            {
              s: 'O cadeado HTTPS 🔒 no navegador garante que o site nunca mente nem publica notícias falsas.',
              a: false,
              e: 'Falso! O cadeado apenas cifra o transporte dos dados, não garante a verdade do que está escrito.'
            },
            {
              s: 'Os Marcadores ou Favoritos (⭐️) servem para guardar atalhos para páginas úteis para as abrir com um clique.',
              a: true,
              e: 'Verdadeiro! Os marcadores poupam tempo ao guardar atalhos como a página da escola.'
            }
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema6',
      themeId: 'navegar-internet',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Navegar na Internet (10 Questões)', en: '🏆 Learning Quiz: Internet Browsing (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas claras e práticas sobre o Tema 6.', en: 'Comprehensive final assessment with 10 clear questions on Topic 6.' },
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
        pt: 'Qual é a diferença principal entre a Barra de Endereços do navegador e a Caixa de Pesquisa de um motor de busca?',
        en: 'What is the main difference between the browser Address Bar and a search engine Search Box?',
      },
      options: {
        pt: [
          'A barra de endereços só funciona se o monitor estiver desligado',
          'Na barra de endereços escreves a morada exata (URL) para ir direto ao site; na caixa de pesquisa escreves palavras-chave para o motor procurar páginas',
          'Não existe qualquer diferença, ambas servem apenas para mudar a cor de fundo do computador',
          'A caixa de pesquisa serve apenas para jogar jogos de computador',
        ],
        en: [
          'The address bar only works if the monitor is powered off',
          'In the address bar you type the exact URL to go straight to a site; in the search box you type keywords to search pages',
          'There is no difference, both only change desktop wallpaper',
          'The search box is exclusively for playing computer games',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Se já sabes a morada (ex: https://area.escola.pt), escreves na barra de endereços para ir logo lá. Se queres pesquisar sobre um tema, usas palavras-chave na caixa de pesquisa.',
        en: 'If you know the URL, type it directly in the address bar. If you want to search a topic, type keywords in the search box.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. O monitor tem de estar ligado para veres a barra de endereços.',
          'Esta é a resposta correta! A barra de endereços recebe o URL exato e a caixa de pesquisa processa termos de pesquisa.',
          'Esta opção está errada. Ambas têm funções distintas e fundamentais na navegação.',
          'Esta opção está errada. A caixa de pesquisa procura informação em toda a Web.',
        ],
        en: [
          'Incorrect. The screen must be on to use the browser.',
          'Correct answer! The address bar accepts exact URLs while the search box indexes keywords.',
          'Incorrect. Both tools have distinct, vital purposes.',
          'Incorrect. The search box searches across the global Web.',
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
          'Que o site está avariado e ninguém pode escrever palavras',
          'Que o computador apanhou um vírus que bloqueou a janela',
          'Que a ligação entre o computador da Maria e o site é encriptada e protegida, mas a Maria deve continuar a avaliar se a informação do site é confiável',
          'Que todas as notícias e opiniões escritas no site são garantidamente 100% verdadeiras',
        ],
        en: [
          'That the site is broken and nobody can type words',
          'That the computer caught a virus locking the window',
          'That the connection between Maria’s computer and the site is encrypted and protected, but Maria must still evaluate if the site content is trustworthy',
          'That all news and opinions on the site are guaranteed to be 100% true',
        ],
      },
      correctIndex: 2,
      explanation: {
        pt: 'O HTTPS e o cadeado protegem o canal de comunicação contra espiões (cifragem), mas não garantem que o conteúdo ou as notícias do site sejam verdadeiras.',
        en: 'HTTPS and the padlock encrypt data in transit, but do not guarantee that the articles or facts on the site are true.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. O cadeado não bloqueia o utilizador, apenas protege a transmissão.',
          'Esta opção está errada. O cadeado é um indicador de segurança técnica, não um vírus.',
          'Esta é a resposta correta! O HTTPS cifra os dados transmitidos, mas o utilizador deve manter o espírito crítico.',
          'Esta opção está errada. Um site com cadeado pode ter notícias falsas ou ser uma burla.',
        ],
        en: [
          'Incorrect. The padlock does not lock users out; it secures transmission.',
          'Incorrect. The padlock is a technical security indicator, not malware.',
          'Correct answer! HTTPS encrypts traffic, but users must evaluate content critically.',
          'Incorrect. A secure connection site can still host misinformation or scams.',
        ],
      },
    },
    {
      id: 'net-q4',
      question: {
        pt: 'O Rodrigo está a preparar um trabalho de Estudo do Meio sobre o lince-ibérico. Qual destas pesquisas utiliza a melhor técnica de "Palavras-Chave Ninja"?',
        en: 'Rodrigo is preparing a project on the Iberian lynx. Which search query applies the best "Ninja Keyword" strategy?',
      },
      options: {
        pt: [
          'olá senhor google podes dizer-me por favor o que come o animal selvagem lince e onde vive ele obrigado',
          'lince iberico alimentacao habitat portugal',
          'coisas da floresta',
          'quero saber animais fofos com orelhas pontiagudas',
        ],
        en: [
          'hello mr google can you please tell me what the wild animal lynx eats and where it lives thanks',
          'iberian lynx diet habitat portugal',
          'forest things',
          'i want to know cute animals with pointy ears',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'A pesquisa ideal usa 3 a 5 palavras-chave precisas, específicas e sem saudações desnecessárias, indo direto ao assunto biológico.',
        en: 'The ideal query uses 3 to 5 precise keywords without conversational clutter, targeting biological facts.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Frases longas conversacionais baralham o algoritmo do motor de busca.',
          'Esta é a resposta correta! Inclui o nome da espécie, o tema exato e a localização geográfica de forma limpa.',
          'Esta opção está errada. "Coisas da floresta" é demasiado vago e trará milhões de páginas aleatórias.',
          'Esta opção está errada. Procurar por opiniões subjetivas como "fofos" não traz informação científica.',
        ],
        en: [
          'Incorrect. Chatty paragraphs confuse search engine indexing.',
          'Correct answer! Features exact species, biological topics, and geographic focus cleanly.',
          'Incorrect. "Forest things" is far too vague.',
          'Incorrect. Subjective terms like "cute" do not yield scientific results.',
        ],
      },
    },
    {
      id: 'net-q5',
      question: {
        pt: 'O Martim precisa de pesquisar no motor de busca o livro de leitura orientada "A Cavaleira da Dinamarca". O que acontece se ele colocar o título entre ASPAS `"A Cavaleira da Dinamarca"`?',
        en: 'Martim is searching for the assigned reading book "A Cavaleira da Dinamarca". What happens if he encloses the title in QUOTES `"A Cavaleira da Dinamarca"`?',
      },
      options: {
        pt: [
          'O computador bloqueia e fecha a janela do navegador',
          'O motor de busca procura obrigatoriamente aquela sequência exata de palavras juntas e pela mesma ordem',
          'O motor de busca traduz o título para dinamarquês',
          'O navegador apaga todos os livros guardados no computador',
        ],
        en: [
          'The computer freezes and closes the browser window',
          'The search engine strictly searches for that exact sequence of words together in order',
          'The search engine translates the title to Danish',
          'The browser deletes all books saved on the computer',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'As aspas forçam o motor de busca a encontrar a frase exata contínua, evitando que apareçam páginas soltas sobre cavaleiros ou sobre o país Dinamarca.',
        en: 'Quotes force the search engine to match the exact continuous phrase, preventing scattered pages about knights or Denmark.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. As aspas são um comando padrão de pesquisa e não causam bloqueios.',
          'Esta é a resposta correta! As aspas (" ") trancam a expressão exata na mesma ordem.',
          'Esta opção está errada. As aspas não traduzem idiomas.',
          'Esta opção está errada. Os operadores de pesquisa não apagam ficheiros.',
        ],
        en: [
          'Incorrect. Quotes are standard search commands and do not crash systems.',
          'Correct answer! Quotes (" ") enforce exact sequential phrase matching.',
          'Incorrect. Quotes do not translate languages.',
          'Incorrect. Search operators never delete local files.',
        ],
      },
    },
    {
      id: 'net-q6',
      question: {
        pt: 'A Joana quer pesquisar sobre o animal jaguar na selva amazónica, mas não quer ver resultados de automóveis da marca Jaguar. Como deve escrever a pesquisa usando o superpoder do SINAL DE MENOS?',
        en: 'Joana wants to research the wild jaguar animal in the rainforest, but wants to avoid Jaguar luxury car ads. How should she write the query using the MINUS SIGN superpower?',
      },
      options: {
        pt: [
          'jaguar animal -carro',
          'jaguar +carro +veiculo',
          'jaguar por favor não mostres carros',
          'carro -animal jaguar',
        ],
        en: [
          'jaguar mammal -car',
          'jaguar +car +vehicle',
          'jaguar please do not show cars',
          'car -animal jaguar',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O sinal de menos colado a uma palavra (-carro) manda o motor de busca apagar e ignorar todos os resultados que falem sobre esse assunto indesejado.',
        en: 'Attaching a minus sign to a word (-car) commands the search engine to omit any results containing that unwanted topic.',
      },
      optionExplanations: {
        pt: [
          'Esta é a resposta correta! O sinal de menos colado à palavra (-carro) exclui os automóveis da pesquisa.',
          'Esta opção está errada. O sinal de mais ou colocar carro iria aumentar os resultados de automóveis.',
          'Esta opção está errada. O motor de busca não entende pedidos de conversa como "por favor não mostres".',
          'Esta opção está errada. Essa ordem excluiria a palavra animal.',
        ],
        en: [
          'Correct answer! The minus sign attached to the term (-car) excludes vehicles.',
          'Incorrect. Adding car terms would increase automobile results.',
          'Incorrect. Search algorithms do not understand conversational pleas.',
          'Incorrect. That syntax would exclude the word animal.',
        ],
      },
    },
    {
      id: 'net-q7',
      question: {
        pt: 'A Sofia pesquisou no Google e o primeiro site no topo dos resultados afirma que "os coelhos vivem debaixo de água". Estar em 1.º lugar nos resultados do Google garante que a informação é verdadeira?',
        en: 'Sofia searched Google and the top result claims "rabbits live underwater". Does being ranked #1 on Google results guarantee the information is true?',
      },
      options: {
        pt: [
          'Sim, porque os computadores do Google analisam e aprovam cientificamente todas as páginas do mundo',
          'Não, pois a ordem dos resultados depende de algoritmos e anúncios; a Sofia deve avaliar a fonte e cruzar com outros sites fiáveis',
          'Sim, porque os conteúdos falsos são proibidos de aparecer nos motores de busca',
          'Não, porque as primeiras posições mostram sempre piadas de comédia',
        ],
        en: [
          'Yes, because Google computers scientifically verify and approve every webpage on Earth',
          'No, because ranking depends on algorithms and ads; Sofia must evaluate the source and compare facts',
          'Yes, because fake news is banned from appearing in search engines',
          'No, because top spots only display comedy jokes',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'A ordem dos resultados depende de algoritmos e por vezes de anúncios patrocinados. Estar em primeiro lugar não é garantia de verdade: é preciso comparar com livros e fontes fidedignas!',
        en: 'Search rankings depend on algorithms and sponsored ads. Being #1 does not guarantee truth: always verify across trusted encyclopedias!',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. O Google não valida cientificamente as afirmações de cada página.',
          'Esta é a resposta correta! A posição resulta de algoritmos e SEO; é indispensável pensamento crítico e confirmação.',
          'Esta opção está errada. Existem milhões de boatos e páginas falsas na Web.',
          'Esta opção está errada. O topo contém páginas populares, mas requer sempre avaliação.',
        ],
        en: [
          'Incorrect. Google does not scientifically fact-check every webpage.',
          'Correct answer! Rankings reflect algorithms and SEO; critical evaluation is vital.',
          'Incorrect. Millions of unverified claims exist across the Web.',
          'Incorrect. Top spots reflect relevance algorithms, not comedy exclusively.',
        ],
      },
    },
    {
      id: 'net-q8',
      question: {
        pt: 'Para fazer um trabalho rigoroso para a escola, como podes aplicar a regra dos "3 C\'s do Detetive" para saber se um site é de confiança?',
        en: 'To write an accurate school report, how do you apply the "3-C Detective Rule" to determine if a website is trustworthy?',
      },
      options: {
        pt: [
          'Verificar apenas se o site tem cores bonitas e muitos vídeos',
          'Avaliar o Criador/Autor (quem escreveu?), a Calma com a Data (está atualizado?) e Confirmar em 2 ou 3 fontes fiáveis',
          'Copiar tudo imediatamente sem ler para acabar o trabalho mais depressa',
          'Perguntar a um colega no jogo se ele gosta da imagem do site',
        ],
        en: [
          'Only check if the website has pretty colors and lots of videos',
          'Assess the Creator/Author (who wrote it?), Check the Date (is it recent?), and Cross-check across 2-3 reliable sources',
          'Copy everything without reading to finish homework faster',
          'Ask an online gamer if they like the website picture',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'A regra dos 3 C\'s (Criador, Calma com a Data e Confirmar com outras fontes) é a melhor técnica de fact-checking para jovens estudantes.',
        en: 'The 3-C rule (Creator, Check date, Cross-check sources) is the best fact-checking method for young students.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Cores bonitas não tornam uma mentira verdadeira.',
          'Esta é a resposta correta! Verificar autor reconhecido, data recente e cruzar com outras fontes garante trabalhos de qualidade.',
          'Esta opção está errada. Copiar sem verificar espalha erros graves no trabalho escolar.',
          'Esta opção está errada. Opiniões de jogos não avaliam rigor científico.',
        ],
        en: [
          'Incorrect. Attractive styling does not validate falsehoods.',
          'Correct answer! Verifying authors, recent dates, and cross-referencing ensures academic quality.',
          'Incorrect. Copying without checking leads to inaccurate homework.',
          'Incorrect. Gamer opinions do not assess scientific validity.',
        ],
      },
    },
    {
      id: 'net-q9',
      question: {
        pt: 'Enquanto o Diogo navegava num site de jogos, apareceu um botão verde gigante a dizer "DOWNLOAD AQUI!". Mais abaixo havia outro botão pequeno e cinzento a dizer "Descarregar ficheiro do jogo". Qual é a atitude prudente?',
        en: 'While Diogo was on a gaming site, a giant flashing green button appeared saying "DOWNLOAD HERE!". Below it was a smaller grey button saying "Download game file". What is the prudent action?',
      },
      options: {
        pt: [
          'Clicar logo no botão verde gigante porque o que é grande é sempre melhor',
          'Desconfiar do botão gigante verde porque costuma ser um anúncio falso disfarçado, verificar bem antes de clicar e pedir ajuda a um adulto se tiver dúvidas',
          'Descarregar ambos os botões e abrir todos os ficheiros com extensão .exe',
          'Desligar o monitor e nunca mais voltar à escola',
        ],
        en: [
          'Click the massive green button because bigger is always better',
          'Distrust the giant green button as it is typically a disguised third-party ad, inspect carefully, and ask an adult if unsure',
          'Download both and run all .exe files',
          'Turn off the monitor and never return to school',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Muitos sites colocam anúncios publicitários disfarçados de falsos botões de download. É preciso muita atenção aos detalhes para não instalar vírus.',
        en: 'Many sites place advertising banners designed to look like fake download buttons. Careful attention prevents malware downloads.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Botões gigantes chamativos em sites de jogos são quase sempre armadilhas publicitárias.',
          'Esta é a resposta correta! Botões gigantes disfarçados são uma das armadilhas mais comuns da Web.',
          'Esta opção está errada. Abrir ficheiros .exe desconhecidos infeta o computador com vírus.',
          'Esta opção está errada. Ter cuidado digital resolve a questão sem exageros.',
        ],
        en: [
          'Incorrect. Flashy giant buttons are usually advertising traps.',
          'Correct answer! Disguised download buttons are among the most common web traps.',
          'Incorrect. Running unknown .exe files installs malware.',
          'Incorrect. Practicing basic digital caution solves the issue.',
        ],
      },
    },
    {
      id: 'net-q10',
      question: {
        pt: 'A Matilde usa a página da biblioteca escolar todos os dias para consultar livros e requisitar leituras. Como pode ela guardar essa página no navegador para voltar a abri-la num só clique sem ter de pesquisar sempre?',
        en: 'Matilde uses her school library website every day to browse books. How can she save this page in her browser to reopen it in a single click without searching every time?',
      },
      options: {
        pt: [
          'Escrever o endereço num papel e colar com fita-cola no ecrã do computador',
          'Adicionar a página aos Marcadores ou Favoritos (Bookmarks ⭐️) do navegador',
          'Deixar o computador ligado a noite toda sem fechar a tampa',
          'Tirar uma fotografia com o telemóvel ao teclado do computador',
        ],
        en: [
          'Write the address on paper and tape it to the screen',
          'Add the page to the browser Bookmarks or Favorites (⭐️)',
          'Leave the computer running overnight without closing the lid',
          'Take a photo of the keyboard with a mobile phone',
        ],
      },
      correctIndex: 1,
      explanation: {
        pt: 'Os Marcadores (Favoritos ⭐️) criam atalhos diretos e organizados na barra do navegador, poupando tempo todos os dias.',
        en: 'Bookmarks (Favorites ⭐️) create organized one-click shortcuts in the browser bar, saving time every day.',
      },
      optionExplanations: {
        pt: [
          'Esta opção está errada. Papéis colados no ecrã estragam o monitor e não criam atalhos clicáveis.',
          'Esta é a resposta correta! Os Marcadores (Favoritos) servem exatamente para abrir páginas frequentes num único clique.',
          'Esta opção está errada. Deixar o computador sempre ligado gasta eletricidade e desgasta a bateria.',
          'Esta opção está errada. Fotografar o teclado não ajuda a abrir páginas na Web.',
        ],
        en: [
          'Incorrect. Paper taped to screens damages monitors and is not clickable.',
          'Correct answer! Bookmarks (Favorites) create single-click shortcuts for frequent pages.',
          'Incorrect. Leaving computers on overnight wastes electricity.',
          'Incorrect. Photos of keyboards do not open web links.',
        ],
      },
    },
  ],
};
