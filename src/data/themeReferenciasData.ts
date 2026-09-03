import { ThemeDefinition } from '../types';

export const themeReferenciasData: ThemeDefinition = {
  id: 'referencias-fontes',
  number: 7,
  title: {
    pt: 'Referências e Fontes',
    en: 'References and Sources',
  },
  tagline: {
    pt: 'Aprende a avaliar a fiabilidade da informação e a criar referências bibliográficas.',
    en: 'Learn to evaluate information credibility and format bibliographic references.',
  },
  intro: {
    pt: 'Nem tudo o que está na Internet é verdade! Para seres um investigador de topo no 5.º ano, precisas de aprender a separar factos comprovados de fake news e boatos, verificar quem é o autor de um artigo e saber construir a lista de referências bibliográficas no final dos teus trabalhos escolares.',
    en: 'Not everything on the Internet is true! To become a top 5th-grade researcher, you must distinguish verified facts from fake news, check who wrote an article, and build a bibliographic reference list at the end of your school work.',
  },
  icon: '📚',
  illustrationKey: 'referencias-fontes',
  accentColor: 'indigo',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'Como citar fontes num trabalho de TIC?', en: 'How to cite sources in an ICT report?' },
      body: {
        pt: 'Dar crédito aos autores é essencial. Uma boa referência deve identificar quem produziu a obra, qual é o título, onde foi encontrada e quando foi consultada.<br><br>Isto valoriza o teu trabalho escolar e permite ao professor e aos colegas verificar as fontes.',
        en: 'Giving credit to creators is essential. A good reference identifies who made the work, its title, where it was published, and the date it was accessed.<br><br>This elevates the quality of your school work and allows teachers and classmates to verify the sources.',
      },
      icon: '📚',
    },
    {
      eyebrow: { pt: 'Na prática', en: 'In practice' },
      h: { pt: 'A fórmula da citação escolar', en: 'The student citation formula' },
      body: {
        pt: 'Para referenciar uma fonte da Internet num trabalho do 5.º ano:<ul><li><strong>Autor ou Organização:</strong> Nome do autor ou entidade (ex.: <em>SeguraNet</em>, <em>DGE</em>).</li><li><strong>Título do Artigo / Página:</strong> Nome da página ou trabalho consultado.</li><li><strong>Endereço Web (URL):</strong> Link direto para o sítio da Internet.</li><li><strong>Data de Consulta:</strong> O dia, mês e ano em que consultaste a página.</li></ul>',
        en: 'To reference a web source in 5th grade:<ul><li><strong>Author or Organization:</strong> Name of author or entity (e.g., <em>SeguraNet</em>, <em>DGE</em>).</li><li><strong>Title of Article / Page:</strong> Name of the visited page.</li><li><strong>Web Address (URL):</strong> Direct link to the website.</li><li><strong>Access Date:</strong> The day, month, and year you consulted the page.</li></ul>',
      },
      icon: '📋',
    },
    {
      eyebrow: { pt: 'Exemplo', en: 'Example' },
      h: { pt: 'Exemplo de referência correta', en: 'Example of an accurate citation' },
      body: {
        pt: '<em>SeguraNet (2024). Guia de Segurança para Jovens. Disponível em https://www.seguranet.pt (Consultado em 15/10/2024).</em><br><br>Simples, claro e com todas as informações essenciais para dar crédito.',
        en: '<em>SeguraNet (2024). Youth Safety Guide. Available at https://www.seguranet.pt (Accessed October 15, 2024).</em><br><br>Simple, clear, and containing all essential details to give proper credit.',
      },
      icon: '💡',
    },
    {
      eyebrow: { pt: 'Atenção!', en: 'Attention!' },
      h: { pt: 'O que evitar nas referências', en: 'What to avoid in citations' },
      body: {
        pt: 'Evita colocar apenas "Google" ou "Internet" na bibliografia. O Google é um motor de busca, não o autor do conteúdo. Procura sempre o site original onde o artigo ou a imagem está alojada.',
        en: 'Never simply write "Google" or "Internet" in your bibliography. Google is a search engine, not the author. Always identify the original website where the article or image is hosted.',
      },
      icon: '⚠️',
    },
    {
      eyebrow: { pt: 'Vamos pensar', en: "Let's think" },
      h: { pt: 'Porque citamos as fontes?', en: 'Why do we cite sources?' },
      body: {
        pt: 'Citar fontes não serve apenas para cumprir regras: serve para sermos justos com quem trabalhou para criar a informação e para demonstrar que o nosso trabalho foi bem investigado e fundamentado.',
        en: 'Citing sources is not just about following rules—it is about fairness to those who created the knowledge and proving your research is thorough and truthful.',
      },
      icon: '🤔',
    },
  ],
  modules: [
    {
      id: 'ref-avaliar-fiabilidade',
      themeId: 'referencias-fontes',
      number: 1,
      title: {
        pt: 'Como Avaliar se um Site é de Confiança',
        en: 'How to Evaluate Website Credibility and Trustworthiness',
      },
      shortDesc: {
        pt: 'A regra dos 4 elementos: Autor, Data, Fonte e Objetivo.',
        en: 'The 4-element rule: Author, Date, Source, and Purpose.',
      },
      icon: '🔎',
      explanation: {
        pt: [
          'Qualquer pessoa pode criar um site ou publicar um vídeo na Internet a dizer disparates. Antes de usares uma informação num trabalho da escola, deves fazer o teste dos 4 elementos:',
          '1. Quem é o AUTOR? O autor está identificado com nome real? É um especialista, professor, cientista ou instituição reconhecida (ex.: universidade, ministério, museu)?',
          '2. Qual é a DATA? A informação é recente ou já tem 15 anos e está desatualizada?',
          '3. Qual é a FONTE? O site pertence a uma entidade oficial (.gov.pt, .edu, .pt) ou é um blogue anónimo com publicidade enganosa a piscar?',
          '4. Qual é o OBJETIVO? O artigo quer ensinar com factos neutros ou quer vender um produto ou espalhar ódio e opiniões exageradas?',
        ],
        en: [
          'Anyone can launch a website or upload a video stating falsehoods. Before using facts in a school report, apply the 4-element test:',
          '1. Who is the AUTHOR? Is there an identified real author? Are they a teacher, scientist, or recognized institution?',
          '2. What is the DATE? Is the knowledge up to date or 15 years old and obsolete?',
          '3. What is the SOURCE? Does the domain belong to an official body (.gov.pt, .edu, .pt) or an anonymous ad-heavy blog?',
          '4. What is the PURPOSE? Does it educate neutrally or attempt to sell products and spread sensational bias?',
        ],
      },
      example: {
        title: {
          pt: 'A notícia do tubarão no rio Douro',
          en: 'The shark in the Douro river rumor',
        },
        scenario: {
          pt: 'O Tiago viu numa rede social um vídeo a dizer que apareceu um tubarão branco gigante no rio Douro. O site chamava-se "noticias-bombasticas-loucas.xyz" e não tinha autor nem data.',
          en: 'Tiago saw a social media video claiming a great white shark was spotted in the Douro river. The site was called "crazy-explosive-news.xyz" with no author or date.',
        },
        tip: {
          pt: 'O Tiago pesquisou nos sites da Marinha Portuguesa e dos jornais de referência nacionais: não havia notícia nenhuma! Era uma fake news inventada para ganhar visualizações.',
          en: 'Tiago checked the Portuguese Navy and national quality news portals: zero reports! It was a fabricated hoax crafted for clickbait views.',
        },
      },
      funFact: {
        pt: 'Sabias que as chamadas "Fake News" (notícias falsas) espalham-se nas redes sociais cerca de 6 vezes mais depressa do que as notícias verdadeiras, porque usam títulos chocantes feitos para assustar ou revoltar as pessoas?',
        en: 'Did you know Fake News spreads across social platforms roughly 6 times faster than truthful stories, because sensational titles trigger shock and alarm?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que a Wikipédia pode ser um bom ponto de partida para pesquisar, mas não deves copiar o texto diretamente sem verificar as fontes?',
          en: 'Why can Wikipedia be a great starting point, but you shouldn’t cite it without checking original sources?',
        },
        clue: {
          pt: 'Pensa em como a Wikipédia é editada e nas notas que aparecem no fundo da página.',
          en: 'Think about how Wikipedia is crowd-edited and the footnote citations at the bottom.',
        },
        reflection: {
          pt: 'Porque a Wikipédia é uma enciclopédia colaborativa aberta onde qualquer pessoa pode editar. O truque dos bons estudantes é descer até ao fundo do artigo e consultar as ligações e referências oficiais que os autores utilizaram!',
          en: 'Because anyone can edit Wikipedia articles. Top researchers scroll to the bottom footnotes to read the primary sources directly!',
        },
      },
      quizQuestions: [
        {
          id: 'q-ref-1',
          question: {
            pt: 'Qual dos seguintes sites é, à partida, o MAIS FIÁVEL para pesquisar sobre a história dos Descobrimentos Portugueses?',
            en: 'Which of the following websites is generally the MOST CREDIBLE for researching Portuguese Discoveries?',
          },
          options: {
            pt: [
              'O portal oficial do Museu de Marinha ou da Direção-Geral da Educação (dge.mec.pt)',
              'Um comentário de um utilizador anónimo num fórum de videojogos',
              'Um blogue pessoal sem autor atualizado em 2004',
              'Um anúncio a vender réplicas de caravelas em plástico',
            ],
            en: [
              'The official portal of the Navy Museum or Ministry of Education (dge.mec.pt)',
              'An anonymous user comment in a video game forum',
              'An unauthored personal blog last updated in 2004',
              'An ad selling plastic replica caravels',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! Museus oficiais e instituições de ensino são fontes de prestígio e rigor científico.',
            en: 'Exactly! Official museums and educational institutions provide rigorous, verified data.',
          },
        },
      ],
    },
    {
      id: 'ref-construir-bibliografia',
      themeId: 'referencias-fontes',
      number: 2,
      title: {
        pt: 'Como Construir uma Referência Bibliográfica',
        en: 'How to Format a Bibliographic Reference',
      },
      shortDesc: {
        pt: 'Autor, Título, Fonte/Editora, Data e URL com data de acesso.',
        en: 'Author, Title, Publisher/Source, Date, and URL with retrieval date.',
      },
      icon: '📖',
      explanation: {
        pt: [
          'No final de qualquer trabalho de investigação escolar deves incluir uma secção chamada "Referências Bibliográficas" (ou Webgrafia).',
          'Para que serve? Permite ao professor e aos colegas verificar onde encontraste a informação e comprovar que fizeste uma pesquisa séria.',
          'Elementos essenciais de um site web:',
          '• AUTOR (Sobrenome, Nome) ou NOME DA ENTIDADE',
          '• TÍTULO DO ARTIGO OU PÁGINA (em itálico ou entre aspas)',
          '• NOME DO SITE OU INSTITUIÇÃO',
          '• DATA DE PUBLICAÇÃO (se existir)',
          '• ENDEREÇO URL COMPLETO (ex.: https://...)',
          '• DATA DE ACESSO (ex.: Consultado em 15 de janeiro de 2026). É fundamental porque as páginas da internet podem mudar!',
        ],
        en: [
          'At the end of every school research paper, you must provide a "Bibliographic References" section.',
          'Purpose: enables teachers and readers to verify where facts came from and validates your academic work.',
          'Core components for a website reference:',
          '• AUTHOR (Last name, First name) or INSTITUTION',
          '• TITLE OF ARTICLE OR PAGE',
          '• WEBSITE / PUBLISHER NAME',
          '• PUBLICATION DATE (if available)',
          '• FULL URL ADDRESS (e.g., https://...)',
          '• ACCESS DATE (e.g., Accessed Jan 15, 2026) because web content can change over time!',
        ],
      },
      example: {
        title: {
          pt: 'A referência perfeita da Sofia',
          en: 'Sofia’s model web reference',
        },
        scenario: {
          pt: 'A Sofia pesquisou sobre o clima no portal do IPMA para o trabalho de Geografia do 5.º ano.',
          en: 'Sofia researched climate on the IPMA portal for 5th-grade Geography.',
        },
        tip: {
          pt: 'Escreveu no final: "IPMA — Instituto Português do Mar e da Atmosfera. O Clima em Portugal Continental. Disponível em: https://www.ipma.pt. Consultado em 10 de fevereiro de 2026." Nota máxima dada pelo professor!',
          en: 'She formatted: "IPMA — Portuguese Institute for Sea and Atmosphere. Climate in Mainland Portugal. Available at: https://www.ipma.pt. Accessed Feb 10, 2026." Full marks from the teacher!',
        },
      },
      funFact: {
        pt: 'Sabias que existem normas internacionais rigorosas para escrever referências (como a norma APA ou a norma portuguesa NP 405) utilizadas por cientistas do mundo inteiro para que todos falem a mesma linguagem na ciência?',
        en: 'Did you know there are strict international formatting standards (like APA or Portuguese NP 405) used by scientists worldwide to maintain a universal research language?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que nunca deves colocar na bibliografia apenas a palavra "Google"?',
          en: 'Why should you never write just the word "Google" in your bibliography?',
        },
        clue: {
          pt: 'O Google é o motor de busca que te levou ao site, não foi quem escreveu o texto.',
          en: 'Google is the search engine that helped you find the site, not the author of the text.',
        },
        reflection: {
          pt: 'O Google é apenas a ferramenta de pesquisa, como se fosse o autocarro que te leva à biblioteca! Quem escreveu o conteúdo foi o autor ou a entidade que está dentro da página visitada. Deves citar sempre a página de destino real.',
          en: 'Google is just the vehicle driving you to the library! The content was authored by the host organization of the visited page.',
        },
      },
      quizQuestions: [
        {
          id: 'q-ref-2',
          question: {
            pt: 'Porque é fundamental indicar a "Data de Acesso" ou "Consultado em..." ao citar um site da Internet?',
            en: 'Why is it crucial to state the "Access Date" when referencing an online article?',
          },
          options: {
            pt: [
              'Porque as páginas da Internet podem ser alteradas, atualizadas ou apagadas com o passar do tempo',
              'Porque o computador precisa dessa data para acertar o relógio',
              'Porque é uma regra obrigatória apenas para os alunos que usam óculos',
              'Não tem qualquer utilidade real',
            ],
            en: [
              'Because online web pages can be modified, updated, or removed over time',
              'Because the computer needs it to synchronize system clocks',
              'Because it only applies to students wearing glasses',
              'It has zero actual utility',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! A data de acesso comprova como estava a página no dia exato em que realizaste a tua pesquisa.',
            en: 'Spot on! The access date establishes exactly what content existed on the day of research.',
          },
        },
      ],
    },
    {
      id: 'ref-fact-checking-fake-news',
      themeId: 'referencias-fontes',
      number: 3,
      title: {
        pt: 'Combater a Desinformação e Notícias Falsas',
        en: 'Combating Misinformation and Fake News',
      },
      shortDesc: {
        pt: 'Como cruzar informação entre 3 fontes diferentes e não cair em boatos.',
        en: 'How to cross-reference 3 different sources and stop rumors.',
      },
      icon: '📰',
      explanation: {
        pt: [
          'A Desinformação é a partilha deliberada de mentiras ou meias-verdades para enganar, assustar ou manipular as pessoas.',
          'Regra de Ouro da Confirmação: se leres uma notícia extraordinária ou chocante, NUNCA a partilhes de imediato!',
          'Cruzamento de Fontes: procura a mesma notícia em pelo menos mais dois sites sérios e conhecidos (ex.: canais de notícias nacionais, jornais reconhecidos, páginas científicas).',
          'Se a notícia só existe naquele blogue estranho e em mais lado nenhum do mundo, é quase garantido que é FALSA.',
          'Imagens e Vídeos Manipulados: hoje em dia existem imagens criadas por Inteligência Artificial ou vídeos editados fora de contexto. Olha com atenção para detalhes anómalos (mãos com seis dedos, texto ilegível ao fundo).',
        ],
        en: [
          'Misinformation is the deliberate or accidental dissemination of false rumors to mislead or alarm.',
          'Golden Rule of Verification: when encountering shocking claims, NEVER share immediately!',
          'Source Triangulation: cross-reference the claim across at least two other reputable quality portals.',
          'If the sensational story appears only on that strange blog, it is almost certainly FAKE.',
          'AI Media Manipulation: check for telltale signs in images or videos (6 fingers on hands, distorted background lettering).',
        ],
      },
      example: {
        title: {
          pt: 'O boato do fecho das escolas em Portugal',
          en: 'The school closure rumor in Portugal',
        },
        scenario: {
          pt: 'Circulou uma imagem de WhatsApp a dizer: "O Ministério da Educação cancelou as aulas durante todo o mês que vem!". Tinha erros ortográficos e letras maiúsculas gigantes.',
          en: 'A WhatsApp screenshot circulated: "Ministry of Education cancels classes all next month!". It was full of spelling typos and excessive capital letters.',
        },
        tip: {
          pt: 'A turma foi ao site oficial do Ministério (dge.mec.pt) e viu que as aulas decorriam normalmente. Era um boato inventado por alguém para pregar uma partida!',
          en: 'Students checked the official ministry portal (dge.mec.pt) and saw normal school calendars. It was a prank rumor!',
        },
      },
      funFact: {
        pt: 'Sabias que existem equipas de jornalistas profissionais chamados "Fact-Checkers" (verificadores de factos), como o Polígrafo em Portugal, cujo trabalho a tempo inteiro é investigar se o que circula na internet é Verdadeiro ou Falso?',
        en: 'Did you know professional fact-checking teams (like Polígrafo in Portugal) work full-time investigating whether viral online claims are True or False?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Que sinais visuais num texto ou notícia te devem fazer desconfiar de imediato da sua veracidade?',
          en: 'What visual clues in an article should trigger immediate suspicion?',
        },
        clue: {
          pt: 'Pensa nos pontos de exclamação, erros de português e pedidos para partilhar.',
          en: 'Think of exclamation marks, spelling errors, and urgent sharing demands.',
        },
        reflection: {
          pt: 'Títulos em maiúsculas a gritar ("URGENTE!!!"), múltiplos pontos de exclamação, erros de ortografia grosseiros e frases como "PARTILHA COM TODA A GENTE ANTES QUE APAGUEM!" são marcas clássicas de boatos e desinformação.',
          en: 'All-caps screaming titles, endless exclamation marks, spelling typos, and pleas like "SHARE BEFORE IT GETS DELETED!" are hallmarks of hoaxes.',
        },
      },
      quizQuestions: [
        {
          id: 'q-ref-3',
          question: {
            pt: 'O que deves fazer quando lês uma notícia inacreditável numa rede social antes de a partilhares?',
            en: 'What should you do before sharing an unbelievable story from social media?',
          },
          options: {
            pt: [
              'Cruzar a informação pesquisando em pelo menos dois órgãos de comunicação social sérios ou fontes oficiais',
              'Partilhar imediatamente com todos os teus contactos para seres o primeiro a dar a novidade',
              'Adicionar mais pontos de exclamação para ficar mais assustador',
              'Criar dez contas falsas para espalhar a história',
            ],
            en: [
              'Cross-check the claim across at least two established news sources or official portals',
              'Share it with all contacts immediately to be first with breaking news',
              'Add extra exclamation marks to heighten drama',
              'Create burner accounts to spread the rumor further',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! Cruzar fontes e verificar antes de partilhar é o dever de todo o cidadão digital informado.',
            en: 'Correct! Triangulating sources before broadcasting content is essential digital hygiene.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-ref-fonte-fiavel',
      themeId: 'referencias-fontes',
      number: 1,
      title: { pt: '🚦 Esta fonte é fiável?', en: '🚦 Is This Source Reliable?' },
      shortDesc: { pt: 'Analisa sites e decide se são de confiança ou duvidosos.', en: 'Evaluate sites and categorize them as trusted or suspicious.' },
      icon: '🚦',
      durationMinutes: 4,
      points: 20,
      type: 'safe_dangerous',
    },
    {
      id: 'jogo-ref-constroi-referencia',
      themeId: 'referencias-fontes',
      number: 2,
      title: { pt: '🧩 Constrói a referência', en: '🧩 Assemble the Citation' },
      shortDesc: { pt: 'Ordena os blocos: Autor, Título, Data, URL e Acesso.', en: 'Order blocks: Author, Title, Date, URL, and Access Date.' },
      icon: '🧩',
      durationMinutes: 5,
      points: 20,
      type: 'order_sequence',
    },
    {
      id: 'jogo-ref-deteta-erro',
      themeId: 'referencias-fontes',
      number: 3,
      title: { pt: '🔎 Deteta o erro na referência', en: '🔎 Spot the Citation Flaw' },
      shortDesc: { pt: 'Descobre o que está a faltar em bibliografias mal feitas.', en: 'Discover missing critical data in incomplete citations.' },
      icon: '🔎',
      durationMinutes: 4,
      points: 20,
      type: 'find_error',
    },
    {
      id: 'jogo-ref-verdadeira-fake-news',
      themeId: 'referencias-fontes',
      number: 4,
      title: { pt: '📰 Notícia real ou Fake News?', en: '📰 Fact or Fake News?' },
      shortDesc: { pt: 'Distingue factos reais de títulos enganadores e boatos.', en: 'Distinguish authentic journalism from deceptive hoaxes.' },
      icon: '📰',
      durationMinutes: 4,
      points: 15,
      type: 'true_false',
    },
    {
      id: 'jogo-ref-quem-escreveu',
      themeId: 'referencias-fontes',
      number: 5,
      title: { pt: '🔍 Quem escreveu isto?', en: '🔍 Who Authored This?' },
      shortDesc: { pt: 'Investiga perfis de autores e verifica a sua autoridade.', en: 'Inspect author credentials to evaluate domain authority.' },
      icon: '🔍',
      durationMinutes: 5,
      points: 20,
      type: 'detect_phishing',
    },
    {
      id: 'quiz-final-tema6',
      themeId: 'referencias-fontes',
      number: 6,
      title: { pt: '🎯 Quiz Referências e Fontes', en: '🎯 Sources and Citations Master Quiz' },
      shortDesc: { pt: '16 perguntas completas com feedback pedagógico instantâneo!', en: '16 comprehensive questions with instant feedback!' },
      icon: '🎯',
      durationMinutes: 10,
      points: 80,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'ref-q1',
      question: {
        pt: 'Porque deves incluir uma lista de Referências Bibliográficas no final dos teus trabalhos escolares?',
        en: 'Why should you include a list of Bibliographic References at the end of school projects?',
      },
      options: {
        pt: [
          'Para demonstrar que pesquisaste em fontes sérias, valorizar os autores e permitir ao professor verificar a informação',
          'Para o trabalho ter mais páginas e parecer mais pesado',
          'Porque a impressora só funciona se tiver essa folha',
          'Para gastar mais tinta e papel',
        ],
        en: [
          'To demonstrate research in reliable sources, credit authors, and allow teachers to verify facts',
          'To inflate page counts and make reports heavier',
          'Because printers refuse to print without that page',
          'To use more paper and ink',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A bibliografia comprova a seriedade da investigação e respeita os autores consultados.',
        en: 'Bibliographies validate scholarly rigor and honor original sources.',
      },
    },
    {
      id: 'ref-q2',
      question: {
        pt: 'Escrever apenas "Fonte: Google" ou "Fonte: Internet" no final do trabalho é considerado:',
        en: 'Writing merely "Source: Google" or "Source: Internet" at the end of a report is considered:',
      },
      options: {
        pt: [
          'Incorreto e insuficiente, porque o Google é apenas um motor de busca e não o autor do conteúdo',
          'A melhor forma possível de citar',
          'Um procedimento exemplar que merece nota 20',
          'Obrigatório pelas regras de todas as escolas',
        ],
        en: [
          'Incorrect and insufficient, because Google is merely a search engine, not the content creator',
          'The ideal way to cite sources',
          'An exemplary citation worthy of top grades',
          'Mandatory under school rules',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Deves citar o site e o autor da página concreta onde leste a informação, nunca o motor de busca.',
        en: 'Always cite the specific destination page and author, not the search engine.',
      },
    },
    {
      id: 'ref-q3',
      question: {
        pt: 'Qual destas extensões de domínio de site transmite habitualmente MAIOR fiabilidade institucional em Portugal?',
        en: 'Which website domain extension typically indicates HIGHEST institutional credibility in Portugal?',
      },
      options: {
        pt: [
          '.gov.pt (governo/estado) ou .edu / .uac.pt / .up.pt (universidades e educação)',
          '.xyz.biz',
          '.click.free',
          '.download-gratis.cc',
        ],
        en: [
          '.gov.pt (government/state) or .edu / universities and education institutions',
          '.xyz.biz',
          '.click.free',
          '.download-gratis.cc',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Domínios .gov e universitários são regulados e pertencem a entidades públicas e de investigação.',
        en: '.gov and educational domains are regulated and belong to accredited public institutions.',
      },
    },
    {
      id: 'ref-q4',
      question: {
        pt: 'O que deves fazer quando encontras uma página web que NÃO tem autor, NÃO tem data e está cheia de erros de ortografia?',
        en: 'What should you do when you find a web page with NO author, NO date, and filled with spelling mistakes?',
      },
      options: {
        pt: [
          'Desconfiar da sua fiabilidade e procurar outra fonte mais rigorosa e oficial',
          'Copiar tudo e colocar como verdade absoluta no trabalho',
          'Enviar uma mensagem a felicitar o criador da página',
          'Imprimir 50 cópias para distribuir na escola',
        ],
        en: [
          'Distrust its reliability and search for a more rigorous and official source',
          'Copy everything as absolute truth for your assignment',
          'Send a congratulatory note to the creator',
          'Print 50 copies to hand out at school',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A ausência de autor, data e o descuido na escrita são fortes indicadores de falta de fiabilidade.',
        en: 'Missing authorship, missing dates, and poor grammar are telltale flags of low credibility.',
      },
    },
    {
      id: 'ref-q5',
      question: {
        pt: 'O que significa a expressão "Cruzamento de Fontes"?',
        en: 'What does the term "Triangulating / Cross-referencing Sources" mean?',
      },
      options: {
        pt: [
          'Verificar se a mesma informação é confirmada por dois ou três sites independentes e credíveis',
          'Desenhar cruzes no caderno de TIC',
          'Colocar dois computadores um em frente ao outro',
          'Desligar e voltar a ligar o router da Internet',
        ],
        en: [
          'Checking if the same fact is corroborated by two or three independent, credible sources',
          'Drawing crosses in the ICT notebook',
          'Placing two computers facing each other',
          'Turning the Internet router off and on',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Cruzar fontes permite confirmar que um facto é verdadeiro e não uma invenção isolada.',
        en: 'Cross-referencing verifies whether a claim is factual and not an isolated fabrication.',
      },
    },
    {
      id: 'ref-q6',
      question: {
        pt: 'Qual é a ordem padrão mais comum para referenciar um artigo de um site da Internet?',
        en: 'What is the most standard order when citing an online web page?',
      },
      options: {
        pt: [
          'Autor/Entidade, Título do Artigo, Nome do Site, Ano/Data, Endereço URL e Data de Acesso',
          'Data de Acesso, cor do site, preço do computador e nome do aluno',
          'Apenas o endereço URL e mais nada',
          'O nome do presidente da câmara e a data de nascimento do aluno',
        ],
        en: [
          'Author/Organization, Article Title, Website Name, Year/Date, Full URL, and Access Date',
          'Access date, website color scheme, PC price, and student name',
          'Only the raw URL link and nothing else',
          'Mayor’s name and student birthday',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Esta sequência lógica identifica quem escreveu, o quê, quando e onde pode ser consultado.',
        en: 'This sequence methodically documents who authored the work, its title, origin, and retrieval timestamp.',
      },
    },
    {
      id: 'ref-q7',
      question: {
        pt: 'O que são "Fake News"?',
        en: 'What are "Fake News"?',
      },
      options: {
        pt: [
          'Notícias falsas criadas intencionalmente para enganar, gerar cliques ou manipular opiniões',
          'Notícias sobre festivais de música e cinema',
          'Programas de televisão sobre desporto escolar',
          'Trabalhos escolares com nota vinte',
        ],
        en: [
          'Fabricated stories intentionally created to deceive readers, generate clicks, or manipulate opinion',
          'News reports covering music and film festivals',
          'Television shows about school sports',
          'School assignments receiving perfect grades',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Fake News são desinformação propositada que imita a aparência de jornalismo sério.',
        en: 'Fake news is deliberate disinformation mimicking authentic journalistic styling.',
      },
    },
    {
      id: 'ref-q8',
      question: {
        pt: 'Porque é que os títulos sensacionalistas ("NÃO VAIS ACREDITAR NO QUE ACONTECEU!!!") são suspeitos?',
        en: 'Why are sensational clickbait headlines ("YOU WON’T BELIEVE WHAT HAPPENED!!!") suspicious?',
      },
      options: {
        pt: [
          'Porque utilizam o exagero emocional (clickbait) para atrair cliques e visualizações em vez de informar com rigor',
          'Porque a tecla de exclamação no teclado é proibida',
          'Porque os jornalistas a sério nunca sabem usar letras maiúsculas',
          'Não têm nada de suspeito',
        ],
        en: [
          'Because they exploit emotional clickbait to generate visits rather than factual reporting',
          'Because exclamation marks are illegal',
          'Because real journalists cannot type uppercase letters',
          'There is nothing suspicious about them',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O "clickbait" vive de promessas exageradas e quase sempre esconde conteúdos falsos ou de má qualidade.',
        en: 'Clickbait relies on hyperbolic framing to drive ad revenue and often masks unsubstantiated claims.',
      },
    },
    {
      id: 'ref-q9',
      question: {
        pt: 'Se encontrares uma fotografia estranha nas redes sociais que pareça inacreditável, como podes verificar se foi manipulada por Inteligência Artificial?',
        en: 'If you see an extraordinary photo on social media, how can you spot potential AI manipulation?',
      },
      options: {
        pt: [
          'Observar com atenção pormenores como mãos, dedos, dentes, reflexos de luz anómalos e textos distorcidos no fundo',
          'Acreditar de imediato porque as imagens nunca mentem',
          'Pedir uma fotografia impressa em papel',
          'Aumentar o volume das colunas do computador',
        ],
        en: [
          'Carefully inspect subtle details like hands, fingers, skin texture, reflections, and warped background text',
          'Believe it immediately because pictures never lie',
          'Ask for a printout on glossy paper',
          'Turn up speaker volume',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Imagens geradas por IA frequentemente apresentam deformações subtis nas mãos, olhos e simetria.',
        en: 'Generative AI imagery often reveals unnatural artifacts in anatomical details, text, and specular highlights.',
      },
    },
    {
      id: 'ref-q10',
      question: {
        pt: 'O que é a "Pesquisa Inversa de Imagens" no Google ou TinEye?',
        en: 'What is "Reverse Image Search" on Google or TinEye?',
      },
      options: {
        pt: [
          'Uma ferramenta onde carregas uma fotografia para descobrir onde ela apareceu pela primeira vez na Internet',
          'Um filtro para virar as fotografias de pernas para o ar',
          'Uma forma de apagar as fotografias do teu telemóvel',
          'Um comando para mudar a cor da máquina fotográfica',
        ],
        en: [
          'A tool where you upload an image to track its original publication date and historical web sources',
          'A filter to flip pictures upside down',
          'A technique to delete smartphone photos',
          'A setting to alter camera body colors',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A pesquisa inversa permite desmascarar fotos antigas reutilizadas fora de contexto em notícias falsas.',
        en: 'Reverse image search tracks image provenance to detect recycled or misrepresented visual assets.',
      },
    },
    {
      id: 'ref-q11',
      question: {
        pt: 'Qual é o papel de um projeto de Fact-Checking como o "Polígrafo"?',
        en: 'What is the mission of a Fact-Checking outlet like "Polígrafo"?',
      },
      options: {
        pt: [
          'Investigar declarações públicas e notícias virais para classificar se são Verdadeiras, Falsas ou Enganadoras',
          'Vender televisões e ecrãs digitais nas escolas',
          'Criar boatos engraçados para o Carnaval',
          'Bloquear as redes sociais de todas as pessoas',
        ],
        en: [
          'Investigate viral claims and public statements to classify them as True, False, or Misleading',
          'Sell television screens to schools',
          'Create playful prank rumors for Carnival',
          'Block everyone’s social media access',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O fact-checking analisa factos com rigor e documentos oficiais para esclarecer o público.',
        en: 'Fact-checking verifies statements against primary documents to inform democratic society.',
      },
    },
    {
      id: 'ref-q12',
      question: {
        pt: 'O que deves fazer se um amigo te enviar pelo WhatsApp um boato alarmante sobre a tua escola?',
        en: 'What should you do if a classmate sends you an alarming rumor about your school on WhatsApp?',
      },
      options: {
        pt: [
          'Alertar o colega de que a informação pode não ser verdadeira, não reencaminhar e confirmar junto do professor',
          'Reencaminhar para 20 grupos e dizer a todos para terem muito medo',
          'Ligar para a televisão a pedir para filmarem a escola',
          'Ficar em casa e nunca mais voltar às aulas',
        ],
        en: [
          'Advise your peer that the claim may be false, do not forward it, and verify with a teacher',
          'Forward it to 20 groups urging everyone to panic',
          'Call TV news to film the school building',
          'Stay home and never return to classes',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Travar a corrente de boatos e confirmar com fontes oficiais é a resposta responsável.',
        en: 'Halting rumors and consulting authoritative school staff prevents panic and misinformation.',
      },
    },
    {
      id: 'ref-q13',
      question: {
        pt: 'Se quiseres citar um livro em papel que leste na biblioteca da escola, que dados deves colocar na bibliografia?',
        en: 'If you want to cite a physical paper book read at the school library, what data must you include?',
      },
      options: {
        pt: [
          'Autor, Título do Livro, Editora, Ano de Publicação e Edição',
          'Apenas a cor da capa do livro',
          'O peso do livro em gramas',
          'O nome da funcionária da biblioteca que te entregou o livro',
        ],
        en: [
          'Author, Book Title, Publisher, Year of Publication, and Edition',
          'Only the color of the cover',
          'The book’s weight in grams',
          'The name of the librarian who handed you the book',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Estes elementos identificam qualquer livro impresso segundo as normas bibliográficas.',
        en: 'These data points uniquely identify printed books according to bibliographic standards.',
      },
    },
    {
      id: 'ref-q14',
      question: {
        pt: 'O que significa a palavra "Fiabilidade" no contexto da pesquisa digital?',
        en: 'What does "Reliability" mean in digital research?',
      },
      options: {
        pt: [
          'A garantia de que a informação é exata, verdadeira, comprovada e de fonte idónea',
          'A velocidade a que o rato se mexe no ecrã',
          'A quantidade de imagens coloridas que o site tem',
          'O preço que custou a assinatura de Internet',
        ],
        en: [
          'The degree to which information is accurate, verified, factual, and from a credible source',
          'The speed of mouse movements on screen',
          'The quantity of colorful illustrations on a web page',
          'The monthly broadband subscription price',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Fiabilidade mede o grau de confiança e exatidão dos dados encontrados.',
        en: 'Reliability measures trustworthiness, evidentiary support, and methodological precision.',
      },
    },
    {
      id: 'ref-q15',
      question: {
        pt: 'Porque é perigoso confiar em conselhos de saúde ou mezinhas caseiras partilhados por estranhos no TikTok ou YouTube?',
        en: 'Why is it dangerous to trust medical or health tips posted by random influencers on TikTok or YouTube?',
      },
      options: {
        pt: [
          'Porque não têm validação médica nem científica e podem causar problemas graves de saúde',
          'Porque os vídeos de saúde gastam mais bateria no telemóvel',
          'Porque a música de fundo é muito alta',
          'Não tem perigo nenhum',
        ],
        en: [
          'Because they lack clinical and scientific validation and can cause severe health hazards',
          'Because health videos consume more battery power',
          'Because background music is too loud',
          'It poses zero danger',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Informação médica deve vir sempre de médicos, hospitais e da Direção-Geral da Saúde (DGS).',
        en: 'Medical recommendations must strictly originate from qualified healthcare professionals and national health authorities (DGS).',
      },
    },
    {
      id: 'ref-q16',
      question: {
        pt: 'Qual é o perfil de um aluno com excelente Literacia da Informação?',
        en: 'What defines a student with outstanding Information Literacy?',
      },
      options: {
        pt: [
          'Sabe pesquisar com rigor, avalia criticamente as fontes, cruza factos e cita sempre as suas referências!',
          'Acredita em tudo o que lê e copia tudo sem citar',
          'Partilha todas as mensagens que recebe no telemóvel',
          'Nunca faz pesquisas na Internet',
        ],
        en: [
          'Searches methodically, critically evaluates sources, cross-checks facts, and always cites references!',
          'Believes everything read and copy-pastes without attribution',
          'Forwards every chain message received',
          'Never uses Internet resources',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A literacia da informação forma cidadãos pensadores, críticos e responsáveis no mundo digital.',
        en: 'Information literacy empowers students to be critical thinkers and ethical digital citizens.',
      },
    },
  ],
};
