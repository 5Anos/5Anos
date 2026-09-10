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
        pt: 'Já imaginaste se passasses horas a fazer um desenho incrível de artes, a escrever uma história divertida ou a criar um nível novo num jogo... e outro colega apagasse o teu nome e dissesse que foi ele que fez tudo?<br><br>Não seria nada justo! É exatamente para evitar isso que existem os <strong>Direitos de Autor</strong>.<br><br>Em Portugal, a lei e a <strong>Constituição da República Portuguesa (artigo 42.º)</strong> protegem quem cria obras originais através do <strong>Código do Direito de Autor (CDADC)</strong>. O direito de autor nasce no momento em que a obra é criada, não dependendo de registo nem do símbolo <strong>©</strong>. O símbolo <strong>©</strong> indica apenas que a obra está protegida e ajuda a identificar quem detém esses direitos (que pode ser o autor ou uma entidade a quem os direitos foram transferidos).',
        en: 'Imagine creating an awesome drawing, story, or video game level, and someone copied it claiming it was theirs! That is why Copyright exists: to protect creators under the Portuguese Constitution and CDADC. Copyright protection exists upon creation, and the © symbol identifies the rights holder.',
      },
      icon: '📜',
    },
    {
      eyebrow: { pt: 'Licenças', en: 'Licenses' },
      h: { pt: 'Licenças: O que podes fazer?', en: 'Licenses: What can you do?' },
      body: {
        pt: 'Nem tudo o que encontras na Internet pode ser usado livremente. Observa o símbolo da licença e descobre o que é permitido no teu trabalho escolar:',
        en: 'Not everything you find on the Internet can be used freely. Look at the license symbol and discover what is allowed for your school project:',
      },
      icon: '⚖️',
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
        pt: 'A APA 7.ª edição é um conjunto de regras para apresentar citações e referências de forma organizada.<br><br>Quando utilizas informação de outra fonte, indica de onde veio. Uma referência pode incluir, por exemplo, o autor, o título e a fonte onde encontraste a informação.<br><br>No final do teu trabalho escolar, deves colocar uma lista com as <strong>Referências Bibliográficas</strong> por ordem alfabética do apelido do autor.<br><br><div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm font-sans space-y-2.5 text-slate-800 shadow-2xs"><div><strong class="text-indigo-900">🌐 Exemplo de Notícia / Página Web (Norma APA 7.ª ed.):</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Soares, R. (2021, dezembro 6). Portugal volta a ter duas escolas no top 30 europeu do Financial Times. <em>Público</em>. <a href="https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700 hover:text-indigo-900">https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488</a></div><div><strong class="text-indigo-900">📖 Exemplo de Livro:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900">Ribeiro, N. (2007). <em>Multimédia e Tecnologias Interactivas</em> (4.ª ed.). FCA - Editora de Informática. <span class="text-slate-500 font-sans">(A edição só se indica a partir da 2.ª edição; não se indica a cidade).</span></div><div><strong class="text-indigo-900">🖼️ Exemplo de Imagem ou Fotografia:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Coelho, J. (2021). <em>Gerações</em> [Fotografia]. Olhares. <a href="https://olhares.com/geracoes-foto10344803.html" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700 hover:text-indigo-900">https://olhares.com/geracoes-foto10344803.html</a></div><div><strong class="text-indigo-900">🎥 Exemplo de Vídeo Educativo:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Aceleração Digital com Fernando Tannure. (2017, abril 14). <em>Primeiros Passos Canva | Tutorial Canva em Português #01</em> [Vídeo]. YouTube. <a href="https://www.youtube.com/watch?v=3LVBzoaM2f8" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700 hover:text-indigo-900">https://www.youtube.com/watch?v=3LVBzoaM2f8</a></div></div><p class="pt-2 text-xs font-bold text-amber-900">👇 Experimenta agora mesmo construir e testar referências no nosso <strong>Simulador Interativo APA 7</strong> logo abaixo!</p>',
        en: 'APA 7th edition is a set of rules to present citations and references clearly. When you use information from another source, indicate where it came from. A reference can include the author, title, and source.',
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
          'O direito de autor nasce no momento em que a obra é criada, não dependendo de registo nem da presença do símbolo ©. O símbolo © assinala que a obra está protegida e identifica o titular dos direitos (o autor ou uma entidade a quem os direitos tenham sido cedidos).',
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
            pt: 'É um direito fundamental consagrado na Constituição e no CDADC (Decreto-Lei n.º 63/85).',
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
          'Copyright: Protege a obra intelectual original. O símbolo © não cria o direito e não significa necessariamente que o autor detenha pessoalmente todos os direitos. A utilização requer autorização prévia, salvo exceções legais.',
          'Copyleft: Princípio de licenciamento (um conjunto de regras e permissões dadas pelo autor) que permite usar, modificar e partilhar uma obra, desde que as novas versões sejam partilhadas com as mesmas regras e liberdades.',
          'Royalty Free: Modalidade onde a obra pode ser utilizada sem pagar por cada utilização, mediante o cumprimento dos termos da licença.',
          'Creative Commons (CC): Licenças que permitem partilhar e utilizar obras, mas o utilizador deve sempre respeitar as condições definidas pelo autor (como dar crédito BY, não uso comercial NC, partilha com mesma licença SA ou sem alterações ND).',
          'Domínio Público: Quando os direitos patrimoniais de uma obra expiram (normalmente muitos anos após a morte do autor), a obra passa ao Domínio Público e pode ser usada por todos, mantendo-se a obrigação de respeitar a autoria e o nome do autor original.',
        ],
        en: [
          'Copyright: Protects original works; rights exist upon creation. Use typically requires permission subject to statutory exceptions.',
          'Copyleft: Licensing principle that permits using, modifying, and sharing provided new versions retain the same terms and freedoms.',
          'Royalty Free: Usable without per-use royalty fees, subject to terms.',
          'Creative Commons: Allows sharing and using works while respecting conditions set by the author (BY, NC, SA, ND).',
          'Public Domain: When economic rights expire, works enter the Public Domain and can be used by anyone, while respecting the original author’s name and authorship.',
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
          pt: 'A licença permite determinados usos não comerciais. Antes de a utilizares, verifica as condições da licença e indica o autor.',
          en: 'The license allows certain non-commercial uses. Before using it, check the license terms and credit the author.',
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
              'Nível Central (indica que as permissões são válidas apenas no país de origem)',
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
            pt: 'Citação = palavras exatas entre aspas. Paráfrase = ideias por palavras nossas.',
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
          'A APA 7.ª edição é um conjunto de regras para apresentar citações e referências de forma organizada.',
          'Quando utilizas informação de outra fonte, indica de onde veio. Uma referência pode incluir, por exemplo, o autor, o título e a fonte onde encontraste a informação.',
          'A lista de referências bibliográficas fornece a informação completa sobre as obras consultadas no final do documento, organizada por ordem alfabética do apelido do primeiro autor.',
          'Livro (APA 7.ª ed.): Ribeiro, N. (2007). Multimédia e Tecnologias Interactivas (4.ª ed.). FCA - Editora de Informática.',
          'Página Web (APA 7.ª ed.): Soares, R. (2021, dezembro 6). Portugal volta a ter duas escolas no top 30 europeu do Financial Times. Público. https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488',
        ],
        en: [
          'APA 7th edition is a set of rules to present citations and references clearly.',
          'When using information from another source, indicate where it came from. A reference can include the author, title, and source.',
          'References list works consulted at the end, alphabetically by author surname.',
          'Books and web pages formatted according to APA 7th edition standards.',
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
        pt: 'Na APA 7.ª edição, a data de consulta só é indicada em alguns casos, sobretudo quando o conteúdo pode mudar ao longo do tempo.',
        en: 'In APA 7th edition, the retrieval date is only indicated in specific cases, mainly when the content is likely to change over time.',
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
            pt: 'Na norma APA 7.ª edição as referências de páginas web terminam diretamente no URL, sem "Consultado em".',
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
      points: 100,
      type: 'match_pairs',
      gameData: {
        type: 'pairs',
        title: 'Correspondência de Licenças e Termos',
        icon: '🃏',
        xp: 100,
        desc: 'Encontra os pares correspondentes entre símbolos e regras de utilização.',
        data: {
          pairs: [
            {
              left: 'Símbolo © (Copyright)',
              right: 'Identifica quem é o dono ou titular dos direitos de autor',
              icon: '©️',
              image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=160&q=80'
            },
            {
              left: 'Copyleft',
              right: 'Obras derivadas devem ser partilhadas sob a mesma licença',
              icon: '🄯',
              image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=160&q=80'
            },
            {
              left: 'Licença CC-BY',
              right: 'Permite determinados usos da obra, desde que seja dada atribuição ao autor e sejam respeitadas as condições da licença.',
              icon: '🅒🅒',
              image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80'
            },
            {
              left: 'Royalty Free',
              right: 'Uso sem pagamento de direitos por cada utilização',
              icon: '💎',
              image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=160&q=80'
            }
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
      points: 100,
      type: 'true_false',
      gameData: {
        type: 'true_false',
        title: 'Detetive de Plágio & Citação APA',
        icon: '⚖️',
        xp: 100,
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
      points: 100,
      type: 'reliable_sources',
      gameData: {
        type: 'classify',
        title: 'Classificador de Fiabilidade de Fontes',
        icon: '🛡️',
        xp: 100,
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
      points: 100,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Ordem da Referência Bibliográfica APA',
        icon: '📦',
        xp: 100,
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
      title: { pt: '🏆 Quiz de Aprendizagem: Direitos de Autor (10 Questões)', en: '🏆 Learning Quiz: Copyright & Licenses (10 Questions)' },
      shortDesc: { pt: 'Avaliação final abrangente com 10 perguntas sobre Direitos de Autor, Licenças e Plágio.', en: 'Comprehensive final assessment with 10 questions on Copyright, Licenses, and Plagiarism.' },
      icon: '🏆',
      durationMinutes: 10,
      points: 100,
      type: 'final_quiz',
    },
  ],
  finalQuiz: [
    {
      id: 'copy-q1',
      question: {
        pt: 'O que protege a lei dos Direitos de Autor?',
        en: 'What does Copyright law protect?',
      },
      options: {
        pt: [
          'As criações e obras dos autores (textos, músicas, desenhos, fotos e vídeos)',
          'Apenas o teclado e o rato do computador',
          'Exclusivamente a velocidade da ligação à Internet',
          'Apenas as faturas de compras no supermercado',
        ],
        en: [
          'The creations and works of authors (texts, music, drawings, photos, and videos)',
          'Only the physical computer keyboard and mouse',
          'Exclusively the Internet connection speed',
          'Only supermarket shopping receipts',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os Direitos de Autor protegem as obras intelectuais e artísticas criadas por uma pessoa.',
        en: 'Copyright protects original intellectual and creative works crafted by creators.',
      },
    },
    {
      id: 'copy-q2',
      question: {
        pt: 'O que deves fazer quando usas uma frase de um site ou livro num trabalho da escola?',
        en: 'What should you do when using a quote from a website or book in your school project?',
      },
      options: {
        pt: [
          'Colocar a frase entre aspas e indicar o nome do autor e a fonte consultada',
          'Fingir que a frase foi inventada por ti',
          'Apagar o nome do autor original para ninguém saber',
          'Mudar o tipo de letra para não se notar que copiaste',
        ],
        en: [
          'Put the quote in quotation marks and cite the author and source',
          'Pretend you invented the text yourself',
          'Delete the original author’s name so no one finds out',
          'Change the font style to hide that you copied it',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Citar a fonte e o autor demonstra honestidade intelectual e respeito pelo criador.',
        en: 'Citing the author and source shows academic honesty and respects original creators.',
      },
    },
    {
      id: 'copy-q3',
      question: {
        pt: 'O que significa quando uma obra, livro ou imagem está em "Domínio Público"?',
        en: 'What does it mean when a work, book, or image is in the "Public Domain"?',
      },
      options: {
        pt: [
          'Que os direitos de autor expiraram e a obra pode ser utilizada livremente por todos',
          'Que a obra pertence exclusivamente a uma empresa privada',
          'Que é obrigatório pagar uma mensalidade para ver a obra',
          'Que a obra foi apagada da Internet para sempre',
        ],
        en: [
          'That copyright has expired and the work can be freely used by everyone',
          'That the work belongs exclusively to a private company',
          'That you must pay a monthly fee to view the work',
          'That the work was erased from the Internet forever',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Em Portugal, as obras entram em domínio público 70 anos após o falecimento do autor e podem ser usadas por todos.',
        en: 'Works enter the public domain 70 years after the author’s death and can be freely used.',
      },
    },
    {
      id: 'copy-q4',
      question: {
        pt: 'O que significa o princípio da licença Copyleft?',
        en: 'What is the core principle of a Copyleft license?',
      },
      options: {
        pt: [
          'Permite usar e alterar a obra, desde que as alterações continuem partilhadas com a mesma licença livre',
          'Proíbe qualquer pessoa de ler ou ver o trabalho criado',
          'Exige o pagamento de uma quantia em dinheiro de cada vez que se abre o ficheiro',
          'Apaga automaticamente as obras que forem partilhadas na escola',
        ],
        en: [
          'Allows using and modifying the work, provided modifications remain shared under the same free license',
          'Prohibits anyone from reading or viewing the created work',
          'Requires a cash payment every time the file is opened',
          'Automatically deletes works shared at school',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O Copyleft garante que a liberdade de usar e partilhar a obra se mantém para todos os que a modificarem.',
        en: 'Copyleft ensures that the freedom to use and share the work continues for everyone modifying it.',
      },
    },
    {
      id: 'copy-q5',
      question: {
        pt: 'O João precisa de entregar um trabalho de História. Qual destas atitudes constitui plágio?',
        en: 'João needs to submit a History assignment. Which of these actions constitutes plagiarism?',
      },
      options: {
        pt: [
          'Copiar frases de um artigo da Internet e colá-las no trabalho apresentando-as como suas sem citar a fonte.',
          'Escrever um resumo do artigo pelas suas próprias palavras e indicar a fonte no final.',
          'Pedir ao professor para rever a bibliografia e ajudar a corrigir a formatação.',
          'Utilizar imagens de domínio público indicando a origem e o autor.',
        ],
        en: [
          'Copying sentences from an online article and pasting them into the assignment as his own without citing the source.',
          'Writing a summary of the article in his own words and citing the source at the end.',
          'Asking the teacher to review the bibliography and help format references.',
          'Using public domain images while properly attributing the origin and creator.',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Plágio é uma falta de respeito grave que consiste em utilizar as ideias ou palavras de outros apresentando-as como suas sem dar crédito.',
        en: 'Plagiarism is copying someone else’s work or words without credit and claiming ownership.',
      },
    },
    {
      id: 'copy-q6',
      question: {
        pt: 'O que são as licenças Creative Commons (CC)?',
        en: 'What are Creative Commons (CC) licenses?',
      },
      options: {
        pt: [
          'Licenças que permitem aos autores partilhar as suas obras e dizer claramente como podem ser usadas',
          'Contratos de compra e venda de computadores para as escolas',
          'Um vírus de computador que bloqueia o acesso a fotografias',
          'Um tipo de impressora rápida para trabalhos escolares',
        ],
        en: [
          'Licenses allowing authors to share their creations with clear usage permissions',
          'Sales contracts for buying school computers',
          'A computer virus blocking access to photographs',
          'A type of high-speed printer for school assignments',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As licenças Creative Commons facilitam a partilha legal de conteúdos criativos na Internet.',
        en: 'Creative Commons licenses enable legal sharing and reuse of creative works online.',
      },
    },
    {
      id: 'copy-q7',
      question: {
        pt: 'O que deves fazer quando precisas de uma imagem da Internet para um trabalho escolar?',
        en: 'What should you do when you need an image from the Internet for a school project?',
      },
      options: {
        pt: [
          'Escolher imagens com licença livre (ex.: Creative Commons) e indicar o autor e a fonte',
          'Copiar a primeira imagem protegida que encontrares e dizer que foste tu que desenhaste',
          'Tirar uma captura de ecrã e apagar a marca de água do autor',
          'Nunca usar imagens em nenhum trabalho escolar',
        ],
        en: [
          'Choose images with open licenses (e.g., Creative Commons) and credit the creator and source',
          'Copy the first copyrighted image found and claim you drew it',
          'Take a screenshot and erase the author’s watermark',
          'Never use images in any school assignment',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Usar imagens com licença livre e dar o devido crédito ao autor é a forma correta e respeitosa de trabalhar.',
        en: 'Using freely licensed images and attributing the author is ethical and correct.',
      },
    },
    {
      id: 'copy-q8',
      question: {
        pt: 'O que significa o símbolo © (Copyright)?',
        en: 'What does the © (Copyright) symbol mean?',
      },
      options: {
        pt: [
          'Significa "Todos os direitos reservados" e que a obra está protegida por lei',
          'Significa que a imagem é gratuita e pode ser vendida por qualquer pessoa',
          'Significa que o ficheiro contém um erro e não pode ser aberto',
          'Significa que o computador está sem ligação à Internet',
        ],
        en: [
          'It means "All rights reserved" and the work is legally protected',
          'It means the image is completely free and can be sold by anyone',
          'It means the file contains an error and cannot be opened',
          'It means the computer has no Internet connection',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'O símbolo © indica que o autor detém todos os direitos e é necessária autorização para utilizar a obra.',
        en: 'The © symbol means all rights are reserved by the original creator.',
      },
    },
    {
      id: 'copy-q9',
      question: {
        pt: 'Os desenhos, histórias e trabalhos que TU fazes na escola têm Direitos de Autor?',
        en: 'Do drawings, stories, and schoolwork created by YOU have Copyright?',
      },
      options: {
        pt: [
          'Sim, porque foste tu quem os criou e tu és o autor original da tua obra',
          'Não, porque as crianças não têm direitos sobre o que desenham ou escrevem',
          'Apenas se forem publicados num jornal nacional',
          'Não, porque os trabalhos escolares pertencem todos à fábrica dos computadores',
        ],
        en: [
          'Yes, because you created them and you are the original author',
          'No, because children have no rights to what they draw or write',
          'Only if published in a national newspaper',
          'No, because school projects belong to computer manufacturers',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Sim! Qualquer criação original tua é uma obra tua e tu és o autor dela com todos os direitos de autoria.',
        en: 'Yes! Any original work you create belongs to you as the creator.',
      },
    },
    {
      id: 'copy-q10',
      question: {
        pt: 'Onde podes encontrar fotografias, sons e músicas livres e legais para os teus projetos?',
        en: 'Where can you find free and legal photos, sounds, and music for your projects?',
      },
      options: {
        pt: [
          'Em bancos de recursos livres e de domínio público (como Wikimedia Commons, Pixabay, Unsplash ou Freesound)',
          'Em sites ilegais de pirataria que pedem para descarregar ficheiros desconhecidos',
          'Copiando fotografias privadas das redes sociais de pessoas que não conheces',
          'Gravando o ecrã de jogos pagos sem autorização',
        ],
        en: [
          'In open resource libraries and public domain repositories (such as Wikimedia Commons, Pixabay, Unsplash, or Freesound)',
          'On illegal piracy websites asking you to download suspicious files',
          'By copying private photos from social profiles of strangers',
          'By screen-recording commercial games without authorization',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Bancos de recursos livres como Wikimedia Commons, Pixabay e Freesound oferecem conteúdos seguros e autorizados para trabalhos escolares.',
        en: 'Free repositories like Wikimedia Commons, Pixabay, and Freesound provide legal and safe media assets.',
      },
    },
  ],
};
