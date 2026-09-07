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
    pt: 'Os Direitos de Autor são um Direito Fundamental consagrado na Constituição da República Portuguesa que protege as obras intelectuais. Aprende o que é o copyright, copyleft, royalty free, as 6 licenças Creative Commons, como citar e parafrasear, e como construir referências bibliográficas corretas de acordo com a norma APA (7.ª edição), sem fórmulas antiquadas como "Consultado em".',
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
        pt: 'Já imaginaste se passasses horas a fazer um desenho incrível de artes, a escrever uma história divertida ou a criar um nível novo num jogo... e outro colega apagasse o teu nome e dissesse que foi ele que fez tudo?<br><br>Não seria nada justo! É exatamente para evitar isso que existem os <strong>Direitos de Autor</strong>.<br><br>Em Portugal, a lei e a <strong>Constituição da República Portuguesa (artigo 42.º)</strong> protegem quem cria obras originais através do <strong>Código do Direito de Autor (CDADC)</strong>. O símbolo <strong>©</strong> (Copyright) avisa que a criação tem dono e que todos os direitos estão reservados!',
        en: 'Imagine creating an awesome drawing, story, or video game level, and someone copied it claiming it was theirs! That is why Copyright exists: to protect creators under the Portuguese Constitution and CDADC. The © symbol means all rights reserved!',
      },
      icon: '📜',
    },
    {
      eyebrow: { pt: 'Imagens', en: 'Images' },
      h: { pt: 'Copyright, Copyleft e Royalty Free', en: 'Copyright, Copyleft & Royalty Free' },
      body: {
        pt: 'Quando estás a pesquisar na Internet para um trabalho da escola, repara na classificação dos conteúdos:<ul><li><strong>Copyright © (Todos os direitos reservados):</strong> É como uma porta fechada à chave! Não podes copiar nem utilizar sem pedires autorização prévia ao autor.</li><li><strong>Copyleft:</strong> É como uma porta aberta à partilha! Podes usar e partilhar a obra à vontade, desde que não seja para fins comerciais (não podes vender).</li><li><strong>Royalty Free:</strong> Obras que podes usar livremente depois de adquirir uma licença prévia.</li></ul>',
        en: 'When researching online for school projects, look at content licenses:<ul><li><strong>Copyright ©:</strong> All rights reserved. Needs prior permission.</li><li><strong>Copyleft:</strong> Free to use and share, strictly non-commercial.</li><li><strong>Royalty Free:</strong> Usable after getting a prior license.</li></ul>',
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
        pt: 'Podes usar informações que pesquisaste nos teus trabalhos escolares! Para seres justo, usa estas duas técnicas:<ul><li><strong>Citar (com aspas « »):</strong> Escreves as palavras exatas do autor, pões entre aspas e dizes quem é o autor.<br><em>Exemplo:</em> Como escreveu o autor José Saramago (2008): "Fisicamente, habitamos um espaço, mas, sentimentalmente, somos habitados por uma memória".</li><li><strong>Parafrasear (por palavras tuas):</strong> Expliques a ideia do autor com o teu próprio vocabulário (sem aspas), indicando na mesma o autor.<br><em>Exemplo:</em> Em 2008, Saramago explicou que vivemos num espaço físico, mas são as memórias do coração que vivem em nós.</li></ul>',
        en: '<strong>Citing:</strong> Quoting exact words in quotation marks with author credit. <strong>Paraphrasing:</strong> Explaining an author’s idea in your own words without quotation marks.',
      },
      icon: '✍️',
    },
    {
      eyebrow: { pt: 'Norma APA (7º ed)', en: 'APA (7th ed)' },
      h: { pt: 'Como Construir Referências Bibliográficas', en: 'How to Build Bibliographical References' },
      body: {
        pt: 'No final do teu trabalho escolar, deves colocar uma lista com as <strong>Referências Bibliográficas</strong> por ordem alfabética do apelido do autor.<br><br><div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm font-sans space-y-2.5 text-slate-800 shadow-2xs"><div><strong class="text-indigo-900">🌐 Exemplo de Notícia / Página Web (Norma APA 7.ª ed.):</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Soares, R. (2021, dezembro 6). Portugal volta a ter duas escolas no top 30 europeu do Financial Times. <em>Público</em>. https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488</div><div><strong class="text-indigo-900">📖 Exemplo de Livro:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900">Ribeiro, N. (2007). <em>Multimédia e Tecnologias Interactivas</em> (4.ª ed.). FCA - Editora de Informática. <span class="text-slate-500 font-sans">(A edição só se indica a partir da 2.ª edição).</span></div><div><strong class="text-indigo-900">🖼️ Exemplo de Imagem ou Fotografia:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Coelho, J. (2021). <em>Gerações</em> [Fotografia]. Olhares. https://olhares.com/geracoes-foto10344803.html</div><div><strong class="text-indigo-900">🎥 Exemplo de Vídeo Educativo:</strong></div><div class="pl-2 font-mono text-xs bg-white p-2 rounded-xl border border-amber-200/60 leading-relaxed text-slate-900 break-all">Aceleração Digital com Fernando Tannure. (2017, abril 14). <em>Primeiros Passos Canva | Tutorial Canva em Português #01</em> [Vídeo]. YouTube. https://www.youtube.com/watch?v=3LVBzoaM2f8</div></div><p class="pt-2 text-xs font-bold text-amber-900">👇 Experimenta agora mesmo construir e testar referências no nosso <strong>Simulador Interativo APA 7</strong> logo abaixo!</p>',
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
          'O símbolo © (Copyright) significa que todos os direitos estão reservados e exige autorização prévia do autor para qualquer cópia.',
        ],
        en: [
          'Copyright is a fundamental right in the Portuguese Constitution protecting intellectual works under CDADC.',
          'Recognized across the EU, Bern Convention, and WIPO.',
          'The © symbol denotes all rights reserved.',
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
              'No regulamento do recreio da escola',
              'Numa aplicação de mensagens instantâneas',
              'Nas regras de um videojogo offline',
            ],
            en: [
              'In the Portuguese Constitution and the CDADC code',
              'In school playground rules',
              'In a messaging app',
              'In offline game rules',
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
          'Copyright: Todos os direitos reservados. Necessidade de autorização prévia para utilização.',
          'Copyleft: Imagens e obras que podem ser utilizadas, desde que não o sejam para fins comerciais.',
          'Royalty Free: Imagens que podem ser utilizadas desde que seja adquirida previamente uma licença de utilização.',
          'Creative Commons (CC): Entidade sem fins lucrativos criada para promover a partilha de obras com regras claras (Atribuição BY, Uso não-comercial NC, Compartilhamento pela mesma licença SA, Não a obras derivadas ND).',
        ],
        en: [
          'Copyright: All rights reserved.',
          'Copyleft: Free usage except for commercial purposes.',
          'Royalty Free: Usable upon acquiring a prior license.',
          'Creative Commons: Open sharing framework with 4 conditions (BY, NC, SA, ND).',
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
          pt: 'Pensa nas restrições comerciais e de partilha.',
          en: 'Think of commercial restrictions and sharing.',
        },
        reflection: {
          pt: 'O Copyright reserva todos os direitos ao autor, enquanto o Copyleft permite a utilização livre desde que sem fins lucrativos.',
          en: 'Copyright reserves all rights, whereas Copyleft allows free use provided it is non-commercial.',
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
              'Não Congelado',
              'Navegação Contínua',
              'Número de Capítulos',
            ],
            en: [
              'Non-Commercial (cannot be used for commercial purposes)',
              'Not Chilled',
              'Navigational Control',
              'Number of Chapters',
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
          'Citar: Utilizar as palavras/frases exatas do documento consultado, colocando-as entre aspas e indicando o autor. Exemplo: Como referido por Saramago (2008) "Fisicamente, habitamos um espaço, mas, sentimentalmente, somos habitados por uma memória".',
          'Parafrasear: Utilizar a ideia do autor, mas escrevendo por palavras nossas, não sendo necessárias as aspas. Exemplo: Em 2008, Saramago dizia que vivemos num espaço físico, mas sentimentalmente são as memórias que habitam em nós.',
        ],
        en: [
          'Plagiarism is passing off another’s work as your own.',
          'Citing: Exact words in quotes with author credit.',
          'Paraphrasing: Expressing author ideas in your own words without quotes.',
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
              'Citar é copiar sem autorização; parafrasear é apagar o texto',
              'São exatamente a mesma coisa',
              'Citar só se usa em matemática',
            ],
            en: [
              'Citing uses exact words in quotes; paraphrasing uses author ideas in our own words',
              'Citing is stealing; paraphrasing is deleting',
              'They are identical',
              'Citing is only for math',
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
          'Livro: Ribeiro, N. (2007). Multimédia e Tecnologias Interactivas. (4.ª ed.). Lisboa: FCA - Editora de Informática. (A edição só se indica a partir da 2.ª edição).',
          'Página Web (Norma APA 7.ª ed.): Soares, R. (2021, dezembro 6). Portugal volta a ter duas escolas no top 30 europeu do Financial Times. Público. https://www.publico.pt/2021/12/06/economia/noticia/portugal-volta-duas-escolas-negocios-top-30-europeu-financial-times-1987488 (ATENÇÃO: Não se escreve "Consultado em...").',
          'Notas especiais: Sem autor (o título passa para primeiro); Sem data (n.d.); Mais de um autor (usam-se vírgulas e "&" antes do último).',
        ],
        en: [
          'References list works consulted at the end, alphabetically by author surname.',
          'Books, web pages (APA 7th edition without "Accessed on"), images, and videos formatted strictly.',
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
        pt: 'Na norma APA 7.ª edição, a menção "Consultado em" foi totalmente retirada das referências de páginas web porque os links permanentes (DOI / URL) dispensam essa indicação!',
        en: 'In APA 7th edition, "Accessed on" was completely dropped because persistent URLs make access dates redundant unless content is volatile!',
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
            { left: 'Símbolo © (Copyright)', right: 'Todos os direitos reservados ao autor' },
            { left: 'Copyleft', right: 'Uso livre desde que não seja para fins comerciais' },
            { left: 'Licença CC-BY', right: 'Uso livre com atribuição obrigatória do autor' },
            { left: 'Royalty Free', right: 'Uso mediante aquisição prévia de licença' }
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
          'Apenas os computadores portáteis da escola',
          'A velocidade da ligação à Internet',
          'O preço dos livros escolares',
        ],
        en: [
          'Intellectual creations, as a fundamental right in the Constitution',
          'Only school laptops',
          'Internet connection speed',
          'School book prices',
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
          'No endereço web (URL), sem nunca incluir a expressão "Consultado em..."',
          'Com a frase "Consultado em 2026"',
          'Com a assinatura do diretor da escola',
          'Com o símbolo de ponto final e cifrão',
        ],
        en: [
          'With the URL, without ever including "Consulted on / Accessed on"',
          'With the phrase "Accessed in 2026"',
          'With the school principal signature',
          'With a currency symbol',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Excelente! A norma APA 7.ª edição removeu completamente a expressão "Consultado em" para páginas web.',
        en: 'Spot on! APA 7th edition dropped access dates for web pages.',
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
          'Copiar o texto todo à letra',
          'Apagar todas as vogais do parágrafo',
          'Traduzir o texto para latim',
        ],
        en: [
          'Using the author idea in our own words without exact copying or quotation marks',
          'Copying text verbatim',
          'Deleting all vowels',
          'Translating to Latin',
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
        pt: 'Qual é a diferença entre Copyright e Copyleft?',
        en: 'What is the difference between Copyright and Copyleft?',
      },
      options: {
        pt: [
          'Copyright reserva todos os direitos; Copyleft permite a utilização livre desde que não seja para fins comerciais',
          'Copyleft é apenas para canhotos',
          'Copyright não protege livros',
          'São exatamente iguais',
        ],
        en: [
          'Copyright reserves all rights; Copyleft allows free use as long as non-commercial',
          'Copyleft is only for left-handed people',
          'Copyright does not protect books',
          'They are identical',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Exato! O Copyright restringe todas as cópias sem autorização, enquanto o Copyleft permite uso livre não comercial.',
        en: 'Exact! Copyright restricts unauthorized copies, whereas Copyleft allows free non-commercial use.',
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
          'Estudar matemática com um amigo',
          'Comprar material escolar numa papelaria',
          'Fazer um desenho original no caderno',
        ],
        en: [
          'Passing off another person’s work or creation as your own',
          'Studying math with a friend',
          'Buying school supplies',
          'Drawing an original picture',
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
