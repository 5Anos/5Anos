import { ThemeDefinition } from '../types';

export const themeDireitosAutorData: ThemeDefinition = {
  id: 'direitos-autor',
  number: 7,
  title: {
    pt: 'Direitos de Autor e Referências',
    en: 'Copyright & References',
  },
  tagline: {
    pt: 'Aprende a proteger criações, evitar o plágio, usar licenças Creative Commons e construir referências APA (7.ª edição).',
    en: 'Learn to protect creations, avoid plagiarism, use Creative Commons licenses, and build APA 7th edition references.',
  },
  intro: {
    pt: 'Os Direitos de Autor são um Direito Fundamental consagrado na Constituição da República Portuguesa que protege as obras intelectuais. Aprende o que é o copyright, copyleft, royalty free, as 6 licenças Creative Commons, como citar e parafrasear, e como construir referências bibliográficas corretas de acordo com a norma APA (7.ª edição).',
    en: 'Copyright is a fundamental right protecting intellectual property. Learn copyright, copyleft, royalty free, the 6 Creative Commons licenses, citing vs paraphrasing, and APA 7th edition reference formatting.',
  },
  icon: '©️',
  illustrationKey: 'direitos-autor',
  accentColor: 'amber',
  badgeCount: 3,
  lessons: [
    {
      eyebrow: { pt: 'Vamos Descobrir', en: "Let's Discover" },
      h: { pt: 'O que são Direitos de Autor?', en: 'What are Copyrights?' },
      body: {
        pt: 'Já imaginaste se passasses horas a fazer um desenho incrível de artes, a escrever uma história divertida ou a criar um nível novo num jogo... e outro colega apagasse o teu nome e dissesse que foi ele que fez tudo?<br><br>Não seria nada justo! É exatamente para evitar isso que existem os <strong>Direitos de Autor</strong>.<br><br>Em Portugal, a lei e a <strong>Constituição da República Portuguesa (artigo 42.º)</strong> protegem quem cria obras originais através do <strong>Código do Direito de Autor (CDADC)</strong>. O direito de autor nasce com a própria criação da obra, independentemente de registo ou da presença do símbolo <strong>©</strong> (Copyright), que serve para identificar o titular e avisar que a obra está protegida.',
        en: 'Imagine creating an awesome drawing, story, or video game level, and someone copied it claiming it was theirs! That is why Copyright exists: to protect creators under the Portuguese Constitution and CDADC. Copyright protection exists upon creation, and the © symbol identifies the rights holder.',
      },
      icon: '📜',
    },
    {
      eyebrow: { pt: 'Imagens', en: 'Images' },
      h: { pt: 'Copyright, Copyleft e Royalty Free', en: 'Copyright, Copyleft & Royalty Free' },
      body: {
        pt: 'Quando estás a pesquisar na Internet para um trabalho da escola, repara sempre na classificação e nas regras dos conteúdos. Cada tipo de licença tem um símbolo oficial que te indica o que podes ou não fazer:',
        en: 'When searching online for school projects, always pay attention to content licensing and rules. Each type of license has an official symbol indicating what you can and cannot do:',
      },
      icon: '🖼️',
    },
    {
      eyebrow: { pt: 'Sê Original!', en: 'Be Original!' },
      h: { pt: 'O que é o Plágio e Como Evitar', en: 'What is Plagiarism & How to Avoid It' },
      body: {
        pt: '<strong>Plágio</strong> é fazer "batota" com as ideias dos outros: é copiar uma obra, texto ou imagem de outra pessoa e entregá-la como se tivesse sido feita por nós.<br><br><strong>Exemplos do que NUNCA deves fazer:</strong><ul><li>Copiar textos da Wikipédia ou da Internet e colar no teu trabalho sem dizer de quem é;</li><li>Pedir a outra pessoa para fazer o trabalho por ti e dizer ao professor que foste tu;</li><li>Entregar o mesmo trabalho em duas disciplinas diferentes para não teres esforço.</li></ul>Valoriza sempre as tuas próprias palavras e ideias!',
        en: '<strong>Plagiarism</strong> is passing off someone else’s work as your own. Never copy-paste without credit, have others do your homework, or recycle assignments across classes.',
      },
      icon: '🚫',
    },
    {
      eyebrow: { pt: 'Técnicas de Escrita', en: 'Writing Techniques' },
      h: { pt: 'Citar e Parafrasear (com José Saramago)', en: 'Citing & Paraphrasing' },
      body: {
        pt: 'Podes usar informações que pesquisaste nos teus trabalhos escolares! Para seres justo, usa estas duas técnicas:<ul><li><strong>Citar (com aspas « »):</strong> Escreves as palavras exatas do autor, pões entre aspas e dizes quem é o autor, ano e localização (quando aplicável).<br><em>Exemplo:</em> Como escreveu José Saramago (2008, p. 15): "Fisicamente, habitamos um espaço, mas, sentimentalmente, somos habitados por uma memória".</li><li><strong>Parafrasear (por palavras tuas):</strong> Explicas a ideia do autor com o teu próprio vocabulário (sem aspas), indicando na mesma o autor e o ano.<br><em>Exemplo:</em> Em 2008, Saramago explicou que vivemos num espaço físico, mas são as memórias do coração que vivem em nós.</li></ul>',
        en: '<strong>Citing:</strong> Quoting exact words in quotation marks with author credit and page number when applicable. <strong>Paraphrasing:</strong> Explaining an author’s idea in your own words without quotation marks.',
      },
      icon: '✍️',
    },
    {
      eyebrow: { pt: 'Norma APA (7º ed)', en: 'APA (7th ed)' },
      h: { pt: 'Como Construir Referências Bibliográficas', en: 'How to Build Bibliographical References' },
      body: {
        pt: 'No final do teu trabalho escolar, deves colocar uma lista com as <strong>Referências Bibliográficas</strong> por ordem alfabética do apelido do autor.<br><br><div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm font-sans space-y-2.5 text-slate-800 shadow-2xs"><div><strong class="text-indigo-900">🌐 Exemplo de Notícia / Página Web (Norma APA 7.ª ed.):</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Soares, R. (2021, dezembro 6). Portugal volta a ter duas escolas no top 30 europeu do Financial Times. <em>Público</em>. <a href="https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700 hover:text-indigo-900">https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488</a></div><div><strong class="text-indigo-900">📖 Exemplo de Livro:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900">Ribeiro, N. (2007). <em>Multimédia e Tecnologias Interactivas</em> (4.ª ed.). FCA - Editora de Informática. <span class="text-slate-500 font-sans">(A edição só se indica a partir da 2.ª edição; não se indica a cidade).</span></div><div><strong class="text-indigo-900">🖼️ Exemplo de Imagem ou Fotografia:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Coelho, J. (2021). <em>Gerações</em> [Fotografia]. Olhares. <a href="https://olhares.com/geracoes-foto10344803.html" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700 hover:text-indigo-900">https://olhares.com/geracoes-foto10344803.html</a></div><div><strong class="text-indigo-900">🎥 Exemplo de Vídeo Educativo:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Aceleração Digital com Fernando Tannure. (2017, abril 14). <em>Primeiros Passos Canva | Tutorial Canva em Português #01</em> [Vídeo]. YouTube. <a href="https://www.youtube.com/watch?v=3LVBzoaM2f8" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700 hover:text-indigo-900">https://www.youtube.com/watch?v=3LVBzoaM2f8</a></div></div><p class="pt-2 text-xs font-bold text-amber-900">👇 Experimenta agora mesmo construir e testar referências no nosso <strong>Simulador Interativo APA 7</strong> logo abaixo!</p>',
        en: 'References list sources alphabetically at the end. Try building citations in the simulator below!',
      },
      icon: '📚',
    },
  ],
  modules: [
    {
      id: 'copy-o-que-sao-direitos',
      themeId: 'direitos-autor',
      number: 1,
      title: {
        pt: 'O que são Direitos de Autor e Propriedade Intelectual',
        en: 'What are Copyright and Intellectual Property',
      },
      shortDesc: {
        pt: 'A Constituição Portuguesa, o CDADC e a proteção legal das criações.',
        en: 'The Portuguese Constitution, CDADC, and legal protection of creations.',
      },
      icon: '📜',
      explanation: {
        pt: [
          'Os Direitos de Autor são um Direito Fundamental consagrado na Constituição da República Portuguesa (artigo 42.º), que protege as obras ou criações intelectuais.',
          'Rege-se pelo Código do Direito de Autor e dos Direitos Conexos (CDADC), publicado pelo Decreto-Lei n.º 63/85, de 14 de março.',
          'A proteção é reconhecida em todos os países da União Europeia, na Convenção de Berna e nos países membros do Tratado OMPI (Organização Mundial da Propriedade Intelectual).',
          'O direito de autor nasce com a criação da obra, independentemente de formalidades. O símbolo © (Copyright) assinala a titularidade dos direitos, requerendo habitualmente autorização para utilização, com as exceções previstas na lei (como o direito de citação).',
        ],
        en: [
          'Copyright is a fundamental right in the Portuguese Constitution protecting intellectual works under CDADC.',
          'Recognized across the EU, Bern Convention, and WIPO.',
          'Copyright exists upon creation; the © symbol identifies the author, and use generally requires permission subject to statutory exceptions.',
        ],
      },
      example: {
        title: {
          pt: 'A lei que protege os autores',
          en: 'The law protecting creators',
        },
        scenario: {
          pt: 'Um aluno criou um jogo digital na escola. Por ser o criador, detém automaticamente os direitos morais e patrimoniais sobre essa criação.',
          en: 'A student coded a video game at school, automatically holding moral and economic authorship rights.',
        },
        tip: {
          pt: 'Mesmo na escola, devemos respeitar o esforço de quem cria!',
          en: 'Always respect creator effort!',
        },
      },
      funFact: {
        pt: 'Sabias que o Código do Direito de Autor português protege a literatura, música, artes plásticas, fotografia, software e criações multimédia?',
        en: 'Did you know Portuguese copyright law covers literature, music, art, photography, software, and multimedia?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é importante que a lei proteja os criadores de conteúdos?',
          en: 'Why is it crucial for law to protect creators?',
        },
        clue: {
          pt: 'Pensa se os artistas pudessem viver do seu trabalho.',
          en: 'Think if artists could make a living.',
        },
        reflection: {
          pt: 'Para que os autores sejam recompensados pelo seu talento e continuem a criar livros, músicas e jogos incríveis para todos nós.',
          en: 'So creators can sustain their craft and keep producing wonderful books, music, and games.',
        },
      },
      quizQuestions: [
        {
          id: 'q-copy-1',
          question: {
            pt: 'Onde está consagrado o direito de criação intelectual em Portugal?',
            en: 'Where is intellectual creation enshrined in Portugal?',
          },
          options: {
            pt: [
              'Na Constituição da República Portuguesa e no Código do Direito de Autor e dos Direitos Conexos (CDADC)',
              'Apenas nos contratos comerciais celebrados entre autores e editoras',
              'Exclusivamente nos termos de utilização dos motores de busca online',
              'Nos regulamentos municipais de arquivo e património local',
            ],
            en: [
              'In the Portuguese Constitution and the CDADC code',
              'Only in private commercial agreements between authors and publishers',
              'Exclusively within search engine terms of service',
              'In municipal archival and local heritage regulations',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! É um direito fundamental consagrado na Constituição e no CDADC (Decreto-Lei n.º 63/85).',
            en: 'Correct! A fundamental right established in the Constitution and CDADC.',
          },
        },
      ],
    },
    {
      id: 'copy-classificacao-imagens',
      themeId: 'direitos-autor',
      number: 2,
      title: {
        pt: 'Copyright, Copyleft, Royalty Free e Creative Commons',
        en: 'Copyright, Copyleft, Royalty Free, and Creative Commons',
      },
      shortDesc: {
        pt: 'As diferentes formas de classificar e partilhar imagens e obras online.',
        en: 'Different ways to classify and share online images and works.',
      },
      icon: '🏷️',
      explanation: {
        pt: [
          'Copyright: Protege a obra intelectual original. A sua utilização requer habitualmente autorização prévia do autor, salvo exceções legais (como o direito de citação para fins educativos).',
          'Copyleft: Princípio de licenciamento que permite utilizar, modificar e redistribuir a obra, exigindo que as obras derivadas sejam partilhadas sob os mesmos termos de licença.',
          'Royalty Free: Modalidade onde a obra pode ser utilizada sem necessidade de pagar direitos por cada utilização, mediante o cumprimento dos termos da licença.',
          'Creative Commons (CC): Entidade sem fins lucrativos que disponibiliza licenças padronizadas com condições modulares (Atribuição BY, Uso Não Comercial NC, Partilha com a Mesma Licença SA, Sem Derivações ND).',
        ],
        en: [
          'Copyright: Protects original works; use typically requires author permission subject to statutory exceptions.',
          'Copyleft: Allows using, modifying, and sharing provided derivative works retain the same license.',
          'Royalty Free: Usable without per-use royalty fees, subject to terms.',
          'Creative Commons: Open standardized licensing framework with conditions (BY, NC, SA, ND).',
        ],
      },
      example: {
        title: {
          pt: 'Escolher a imagem correta para o cartaz',
          en: 'Choosing the correct image for a poster',
        },
        scenario: {
          pt: 'A Ana precisava de uma ilustração para um trabalho escolar. Consultou um banco de imagens e escolheu uma com licença CC-BY-NC (Atribuição e Não Comercial).',
          en: 'Ana needed an illustration and selected a CC-BY-NC licensed graphic for school work.',
        },
        tip: {
          pt: 'Como o trabalho era escolar e sem fins lucrativos, a Ana pôde usá-la perfeitamente, desde que indicasse o autor!',
          en: 'Since it was non-commercial school work, Ana could use it by crediting the author!',
        },
      },
      funFact: {
        pt: 'As licenças Creative Commons permitem combinar os 4 símbolos (BY, NC, SA, ND) para criar exatamente 6 licenças oficiais diferentes!',
        en: 'Creative Commons combines the 4 conditions into exactly 6 official licenses!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Qual a diferença entre Copyright e Copyleft?',
          en: 'What is the difference between Copyright and Copyleft?',
        },
        clue: {
          pt: 'Pensa na liberdade de modificar e na regra de partilha sob a mesma licença.',
          en: 'Think of modification freedom and sharing under the same license terms.',
        },
        reflection: {
          pt: 'Enquanto o Copyright tradicional reserva habitualmente os direitos ao autor, o Copyleft autoriza a reutilização e modificação da obra, exigindo que as versões derivadas sejam partilhadas sob a mesma licença.',
          en: 'While traditional copyright typically reserves rights to the creator, Copyleft authorizes reuse and modification, requiring derivative works to be distributed under identical license terms.',
        },
      },
      quizQuestions: [
        {
          id: 'q-copy-2',
          question: {
            pt: 'O que significa a sigla NC numa licença Creative Commons?',
            en: 'What does NC stand for in a Creative Commons license?',
          },
          options: {
            pt: [
              'Não-Comercial (a obra não pode ser utilizada para fins comerciais)',
              'Nova Cópia (exige guardar sempre o ficheiro original intacto)',
              'Nível Central (indica licenciamento válido apenas no país de origem)',
              'Norma Comunitária (restringe o uso a instituições de solidariedade)',
            ],
            en: [
              'Non-Commercial (cannot be used for commercial purposes)',
              'New Copy (requires preserving the original unmodified file)',
              'Central Level (indicates licensing valid only in origin country)',
              'Community Standard (restricts use to charitable institutions)',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! NC significa Non-Commercial / Uso não-comercial.',
            en: 'Exact! NC stands for Non-Commercial usage.',
          },
        },
      ],
    },
    {
      id: 'copy-plagio-citar-parafra',
      themeId: 'direitos-autor',
      number: 3,
      title: {
        pt: 'Plágio, Citar e Parafrasear',
        en: 'Plagiarism, Citing, and Paraphrasing',
      },
      shortDesc: {
        pt: 'Evitar o plágio, regras de citação e paráfrase com exemplos de Saramago.',
        en: 'Avoiding plagiarism, citation rules, and paraphrasing with Saramago examples.',
      },
      icon: '✍️',
      explanation: {
        pt: [
          'Plágio é assumir a autoria de uma obra ou trabalho sem termos sido nós a realizar o mesmo (ex.: entregar trabalho feito por outro, copiar da net, entregar o mesmo trabalho em disciplinas diferentes).',
          'Citar: Utilizar as palavras/frases exatas do documento consultado, colocando-as entre aspas e indicando o autor, o ano e a localização (página). Exemplo: Como referido por Saramago (2008, p. 15): "Fisicamente, habitamos um espaço, mas, sentimentalmente, somos habitados por uma memória".',
          'Parafrasear: Utilizar a ideia do autor, mas escrevendo por palavras nossas, não sendo necessárias as aspas, mantendo a indicação do autor e ano. Exemplo: Em 2008, Saramago explicava que vivemos num espaço físico, mas sentimentalmente são as memórias que habitam em nós.',
        ],
        en: [
          'Plagiarism is passing off another’s work as your own.',
          'Citing: Exact words in quotes with author credit and page number.',
          'Paraphrasing: Expressing author ideas in your own words with citation.',
        ],
      },
      example: {
        title: {
          pt: 'A citação correta no ensaio',
          en: 'Correct citation in an essay',
        },
        scenario: {
          pt: 'O Tomás queria usar uma frase marcante de um autor num trabalho de Português.',
          en: 'Tomás wanted to use a striking quote in his Portuguese assignment.',
        },
        tip: {
          pt: 'Colocou a frase entre aspas e mencionou o autor logo a seguir. Exemplar!',
          en: 'He enclosed the sentence in quotes and attributed the author. Exemplary!',
        },
      },
      funFact: {
        pt: 'Na norma APA, quando parafraseias uma ideia, deves mencionar o apelido do autor e o ano de publicação para dar todo o crédito devido.',
        en: 'In APA style, paraphrasing requires mentioning the author surname and publication year.',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é errado entregar o mesmo trabalho a duas disciplinas diferentes?',
          en: 'Why is turning in the same assignment for two different classes considered plagiarism?',
        },
        clue: {
          pt: 'Cada trabalho deve ser um esforço de aprendizagem original para essa disciplina específica.',
          en: 'Each assignment should reflect original learning for that specific subject.',
        },
        reflection: {
          pt: 'Porque constitui auto-plágio: estás a apresentar um trabalho duplicado como se fosse novo para ambas as avaliações.',
          en: 'Because it is self-plagiarism: presenting duplicated work as fresh for both evaluations.',
        },
      },
      quizQuestions: [
        {
          id: 'q-copy-3',
          question: {
            pt: 'Qual é a principal diferença entre citar e parafrasear?',
            en: 'What is the main difference between citing and paraphrasing?',
          },
          options: {
            pt: [
              'Citar usa as palavras exatas entre aspas; parafrasear usa as ideias do autor por palavras nossas',
              'Citar aplica-se a fontes impressas; parafrasear aplica-se exclusivamente a fontes digitais',
              'Citar dispensa a menção ao autor; parafrasear obriga a pedir autorização escrita',
              'São dois nomes diferentes para a mesma técnica de cópia literal de parágrafos',
            ],
            en: [
              'Citing uses exact words in quotes; paraphrasing uses author ideas in our own words',
              'Citing applies to print sources; paraphrasing applies exclusively to digital sources',
              'Citing omits author credits; paraphrasing mandates formal written permission',
              'They are two alternative labels for verbatim copying of text blocks',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! Citação = palavras exatas entre aspas. Paráfrase = ideias por palavras nossas.',
            en: 'Perfect! Citation = exact words in quotes. Paraphrase = ideas in our words.',
          },
        },
      ],
    },
    {
      id: 'copy-norma-apa-referencias',
      themeId: 'direitos-autor',
      number: 4,
      title: {
        pt: 'Referências Bibliográficas — Norma APA (7.ª Edição)',
        en: 'Bibliographic References — APA 7th Edition',
      },
      shortDesc: {
        pt: 'Regras da APA 7.ª edição para livros, páginas web (sem "Consultado em"), vídeos e imagens.',
        en: 'APA 7th edition rules for books, web pages (without "Accessed on"), videos, and images.',
      },
      icon: '📚',
      explanation: {
        pt: [
          'A lista de referências bibliográficas fornece a informação completa sobre as obras consultadas no final do documento.',
          'Organiza-se por ordem alfabética do apelido do primeiro autor. A primeira linha alinha à esquerda e as restantes iniciam-se com avanço à direita.',
          'Livro (APA 7.ª ed.): Ribeiro, N. (2007). Multimédia e Tecnologias Interactivas (4.ª ed.). FCA - Editora de Informática. (Nota: Na APA 7.ª ed., omite-se a localização/cidade da editora; a edição só se indica a partir da 2.ª edição).',
          'Página Web (APA 7.ª ed.): Soares, R. (2021, dezembro 6). Portugal volta a ter duas escolas no top 30 europeu do Financial Times. Público. https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488 (Termina no link direto; data de consulta apenas é usada em conteúdos dinâmicos sem versão estável).',
          'Notas especiais: Sem autor (o título passa para primeiro); Sem data (n.d.); Mais de um autor (usam-se vírgulas e "&" antes do último).',
        ],
        en: [
          'References list works consulted at the end, alphabetically by author surname.',
          'Books (no publisher city in APA 7) and web pages (direct links without access dates unless volatile).',
        ],
      },
      example: {
        title: {
          pt: 'A referência web correta sem "Consultado em"',
          en: 'Correct web reference without "Accessed on"',
        },
        scenario: {
          pt: 'O grupo da Beatriz retirou dados estatísticos de um jornal online para o seu projeto de TIC.',
          en: 'Beatriz’s group used statistical data from an online newspaper for their ICT project.',
        },
        tip: {
          pt: 'Escreveram a referência no formato APA 7.ª ed. exato, terminando diretamente no URL, sem fórmulas antigas de consulta!',
          en: 'They formatted it in exact APA 7th ed style, ending directly at the URL without outdated access phrases!',
        },
      },
      funFact: {
        pt: 'Na norma APA 7.ª edição, a expressão "Consultado em" já não se utiliza para páginas web normais, sendo necessária apenas para páginas digitais que mudam com frequência ao longo do tempo (como na Wikipédia).',
        en: 'In APA 7th edition, "Accessed on" is no longer used for standard web pages, being reserved only for dynamic resources that frequently change over time (such as wikis).',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é importante organizar a bibliografia por ordem alfabética do apelido do autor?',
          en: 'Why is ordering the bibliography alphabetically by author surname important?',
        },
        clue: {
          pt: 'Facilita a consulta rápida por qualquer leitor ou professor.',
          en: 'It facilitates quick lookup by readers or teachers.',
        },
        reflection: {
          pt: 'Para que qualquer pessoa que leia o teu trabalho possa encontrar imediatamente a fonte original de qualquer citação.',
          en: 'So any reader can immediately locate the original source of any citation.',
        },
      },
      quizQuestions: [
        {
          id: 'q-ref-1',
          question: {
            pt: 'De acordo com a Norma APA (7.ª edição), qual destes elementos NUNCA deve ser incluído numa referência bibliográfica de uma página web?',
            en: 'According to APA 7th edition, which element should NEVER be included in a web reference?',
          },
          options: {
            pt: [
              'A expressão "Consultado em..." (já não se utiliza na norma APA 7.ª ed.)',
              'O nome do autor ou organização',
              'O título do artigo',
              'O endereço web (URL)',
            ],
            en: [
              'The phrase "Consultado em... / Accessed on" (removed in APA 7th ed)',
              'The author or organization name',
              'The article title',
              'The web URL',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! Na norma APA 7.ª edição as referências de páginas web terminam diretamente no URL, sem "Consultado em".',
            en: 'Spot on! APA 7th edition web references conclude directly with the URL without access dates.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-copy-match',
      themeId: 'direitos-autor',
      number: 1,
      title: { pt: '🃏 Correspondência de Licenças e Termos', en: '🃏 Licenses & Terms Match' },
      shortDesc: { pt: 'Liga cada símbolo de direitos de autor ao seu significado correto.', en: 'Match copyright symbols to their authentic meanings.' },
      icon: '🃏',
      durationMinutes: 4,
      points: 20,
      type: 'match_pairs',
      gameData: {
        type: 'pairs',
        title: 'Correspondência de Licenças e Termos',
        icon: '🃏',
        xp: 20,
        desc: 'Encontra os pares correspondentes entre símbolos e regras de utilização.',
        data: {
          pairs: [
            { left: 'Símbolo © (Copyright)', right: 'Assinala a titularidade dos direitos de autor' },
            { left: 'Copyleft', right: 'Obras derivadas devem ser partilhadas sob a mesma licença' },
            { left: 'Licença CC-BY', right: 'Uso livre com atribuição obrigatória do autor' },
            { left: 'Royalty Free', right: 'Uso sem pagamento de direitos por cada utilização' }
          ]
        }
      }
    },
    {
      id: 'jogo-copy-true-false',
      themeId: 'direitos-autor',
      number: 2,
      title: { pt: '⚖️ Detetive de Plágio & Citação APA', en: '⚖️ Plagiarism & APA Citation Detective' },
      shortDesc: { pt: 'Classifica situações escolares como Plágio ou Prática Correta.', en: 'Classify school situations as Plagiarism or Proper Practice.' },
      icon: '⚖️',
      durationMinutes: 5,
      points: 25,
      type: 'true_false',
      gameData: {
        type: 'true_false',
        title: 'Detetive de Plágio & Citação APA',
        icon: '⚖️',
        xp: 25,
        desc: 'Decide se a afirmação representa uma conduta correta ou uma infração.',
        data: {
          questions: [
            {
              statement: 'Na norma APA (7.ª edição), as referências de páginas web já não utilizam a expressão "Consultado em".',
              isTrue: true,
              explanation: 'Verdade! Terminam diretamente com o URL.'
            },
            {
              statement: 'Entregar o mesmo trabalho escolar em duas disciplinas diferentes é considerado uma forma de plágio (auto-plágio).',
              isTrue: true,
              explanation: 'Verdade! Cada avaliação requer esforço e trabalho original.'
            },
            {
              statement: 'Parafrasear consiste em copiar o texto exato de um livro e mudar apenas uma palavra.',
              isTrue: false,
              explanation: 'Falso! Parafrasear é explicar a ideia por palavras nossas, sem ser cópia exata.'
            },
            {
              statement: 'Escrever na bibliografia apenas "Fonte: Google" cumpre rigorosamente a norma APA.',
              isTrue: false,
              explanation: 'Falso! O Google é um motor de busca, deves citar o autor e a página web concreta.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-ref-classify',
      themeId: 'direitos-autor',
      number: 3,
      title: { pt: '🛡️ Classificador de Fiabilidade de Fontes', en: '🛡️ Source Credibility Classifier' },
      shortDesc: { pt: 'Separa sites e publicações fiáveis de fontes suspeitas.', en: 'Separate trustworthy portals from suspicious rumor sources.' },
      icon: '🛡️',
      durationMinutes: 5,
      points: 25,
      type: 'reliable_sources',
      gameData: {
        type: 'classify',
        title: 'Classificador de Fiabilidade de Fontes',
        icon: '🛡️',
        xp: 25,
        desc: 'Arrasta cada elemento para a categoria correta: Fiável ou Suspeito.',
        data: {
          categories: [
            { id: 'confiavel', label: 'Fonte Fiável / Credível' },
            { id: 'suspeito', label: 'Fonte Suspeita / Boato' }
          ],
          items: [
            { text: 'Artigo de jornal assinado no Público (.pt)', categoryId: 'confiavel' },
            { text: 'Portal oficial da República Portuguesa (.gov.pt)', categoryId: 'confiavel' },
            { text: 'Blogue anónimo sem autor nem data de publicação', categoryId: 'suspeito' },
            { text: 'Mensagem de WhatsApp viral alarmista sem fonte oficial', categoryId: 'suspeito' },
            { text: 'Estudo publicado por universidade reconhecida (.edu)', categoryId: 'confiavel' },
            { text: 'Site de cliques com títulos sensacionalistas em maiúsculas', categoryId: 'suspeito' }
          ]
        }
      }
    },
    {
      id: 'jogo-ref-order',
      themeId: 'direitos-autor',
      number: 4,
      title: { pt: '📦 Ordem da Referência Bibliográfica APA', en: '📦 APA Bibliographic Reference Order' },
      shortDesc: { pt: 'Ordena os elementos de uma referência de página web APA 7.ª ed.', en: 'Order the elements of an APA 7th ed web reference.' },
      icon: '📦',
      durationMinutes: 4,
      points: 20,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Ordem da Referência Bibliográfica APA',
        icon: '📦',
        xp: 20,
        desc: 'Organiza os elementos na sequência correta da norma APA.',
        data: {
          items: [
            'Apelido e iniciais do autor (ex.: Soares, R.)',
            'Data de publicação entre parênteses (ex.: 2021, dezembro 6).',
            'Título do artigo ou página web em letras normais',
            'Nome do jornal ou site em itálico (ex.: Público.)',
            'Endereço web URL completo no final'
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema7',
      themeId: 'direitos-autor',
      number: 5,
      title: { pt: '🏆 Quiz Final: Direitos de Autor e APA', en: '🏆 Final Quiz: Copyright & APA' },
      shortDesc: { pt: 'Avaliação final abrangente sobre Direitos de Autor, Plágio e Norma APA.', en: 'Comprehensive final assessment on Copyright, Plagiarism, and APA.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 50,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'copy-q1',
      question: {
        pt: 'O que protege o Código do Direito de Autor e dos Direitos Conexos (CDADC) em Portugal?',
        en: 'What does the CDADC code protect in Portugal?',
      },
      options: {
        pt: [
          'As obras e criações intelectuais, sendo um direito fundamental consagrado na Constituição',
          'Apenas o suporte físico onde os ficheiros digitais são guardados',
          'Exclusivamente os programas de computador desenvolvidos para uso militar',
          'A posse de marcas e patentes industriais de grandes empresas multinacionais',
        ],
        en: [
          'Intellectual creations, as a fundamental right in the Constitution',
          'Only physical storage media where digital files reside',
          'Exclusively software developed for military applications',
          'Trademarks and industrial patents belonging to multinational corporations',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Correto! O CDADC protege a propriedade intelectual e as criações artísticas e literárias.',
        en: 'Correct! CDADC safeguards intellectual property and artistic/literary works.',
      },
    },
    {
      id: 'copy-q2',
      question: {
        pt: 'De acordo com a norma APA (7.ª edição), como deve terminar uma referência bibliográfica de uma página web?',
        en: 'According to APA 7th edition, how should a web reference conclude?',
      },
      options: {
        pt: [
          'No endereço web (URL), sem incluir a data de consulta (salvo para páginas que mudem frequentemente)',
          'Obrigatoriamente com a data e a hora exatas em que o utilizador acedeu à página',
          'Com a indicação do endereço IP do servidor onde o site se encontra alojado',
          'Com o número de páginas impressas que o artigo digital ocuparia em papel',
        ],
        en: [
          'With the URL, without an access date (unless the page content is dynamic and changes frequently)',
          'Mandatorily with the exact date and hour when the user accessed the page',
          'With the IP address of the hosting web server',
          'With the estimated number of printed pages the digital article would occupy',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Excelente! Na norma APA 7.ª edição as referências de páginas web comuns terminam diretamente no URL, dispensando a data de consulta.',
        en: 'Spot on! In APA 7th edition, regular web references end directly with the URL without access dates.',
      },
    },
    {
      id: 'copy-q3',
      question: {
        pt: 'O que caracteriza a prática de "Parafrasear" num trabalho escolar?',
        en: 'What characterizes "Paraphrasing" in school work?',
      },
      options: {
        pt: [
          'Utilizar a ideia do autor, mas escrevendo por palavras nossas, sem ser necessária cópia exata nem aspas',
          'Copiar integralmente um parágrafo sem indicar a fonte ou o autor original',
          'Resumir um texto alterando apenas a ordem das frases sem citar a origem',
          'Traduzir um texto palavra por palavra de outra língua sem referenciar a publicação original',
        ],
        en: [
          'Using the author idea in our own words without exact copying or quotation marks',
          'Copying an entire paragraph without referencing the original source or author',
          'Summarizing text by rearranging sentences without citing origins',
          'Translating text word for word from another language without referencing the source',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Perfeito! Parafrasear é expressar a ideia com o nosso próprio vocabulário, citando sempre a fonte.',
        en: 'Perfect! Paraphrasing expresses concepts in your voice while citing sources.',
      },
    },
    {
      id: 'copy-q4',
      question: {
        pt: 'Qual é o princípio fundamental do Copyleft?',
        en: 'What is the core principle of Copyleft?',
      },
      options: {
        pt: [
          'Permite utilizar e modificar a obra, exigindo que as obras derivadas sejam partilhadas sob a mesma licença',
          'Autoriza qualquer utilização comercial sem necessidade de mencionar a autoria original',
          'Transfere automaticamente a posse e os direitos de autor para uma entidade governamental',
          'Exige o pagamento de uma licença anual renovável a cada utilização da obra',
        ],
        en: [
          'Allows using and modifying the work, requiring derivative works to be shared under the same license',
          'Authorizes unrestricted commercial use without crediting original authors',
          'Transfers copyright ownership automatically to a governmental entity',
          'Mandates an annually renewed royalty payment per reuse',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Correto! O princípio central do Copyleft é a reciprocidade de partilha (Share-Alike): quem modifica e redistribui a obra deve manter a mesma licença.',
        en: 'Correct! The core principle of Copyleft is share-alike reciprocity: derivative works must be distributed under the same license.',
      },
    },
    {
      id: 'copy-q5',
      question: {
        pt: 'O que é o Plágio?',
        en: 'What is Plagiarism?',
      },
      options: {
        pt: [
          'Assumir a autoria de uma obra ou trabalho sem termos sido nós a realizar o mesmo',
          'Citar corretamente um autor colocando a frase entre aspas e indicando o ano da publicação',
          'Pesquisar várias fontes diferentes para recolher dados antes de redigir um trabalho próprio',
          'Comprar um livro numa livraria ou biblioteca para ler em casa',
        ],
        en: [
          'Passing off another person’s work or creation as your own',
          'Correctly citing an author by placing text in quotation marks and stating the publication year',
          'Researching diverse sources to gather data prior to writing an original paper',
          'Purchasing a book at a bookstore or library to read at home',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Correto! Plágio é apropriar-se do trabalho alheio sem dar o devido crédito.',
        en: 'Correct! Plagiarism is misappropriating others work without proper attribution.',
      },
    },
  ],
};
