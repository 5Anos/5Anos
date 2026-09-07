import { ThemeDefinition } from '../types';

export const themeDireitosAutorData: ThemeDefinition = {
  id: 'direitos-autor',
  number: 7,
  title: {
    pt: 'Direitos de Autor e Fontes',
    en: 'Copyright and Sources',
  },
  tagline: {
    pt: 'Aprende a respeitar os criadores, evitar o plágio, usar licenças livres e citar fontes corretamente.',
    en: 'Learn to respect creators, avoid plagiarism, use open licenses, and cite sources accurately.',
  },
  intro: {
    pt: 'Quando escreves um texto, tiras uma fotografia ou compões uma música, essa criação é tua e pertence-te por lei! Da mesma forma, tudo o que encontramos na Internet pertence a alguém. Aprende o que é o copyright ©, como funcionam as licenças Creative Commons, como evitar o plágio e como construir a lista de referências bibliográficas no final dos teus trabalhos escolares.',
    en: 'When you write an essay, take a photo, or compose music, that creation belongs to you by law! Similarly, everything on the web belongs to someone. Discover copyright ©, Creative Commons, how to avoid plagiarism, and how to build accurate bibliographic references.',
  },
  icon: '©️',
  illustrationKey: 'direitos-autor',
  accentColor: 'amber',
  badgeCount: 3,
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'O que são direitos de autor?', en: 'What is copyright?' },
      body: {
        pt: 'Os direitos de autor protegem o trabalho criado por uma pessoa — como textos, imagens, vídeos, músicas ou outros trabalhos digitais. Quem cria uma obra é o autor, e tem o direito moral e legal de decidir como ela pode ser usada por outras pessoas.<br><br>O símbolo universal <strong>©</strong> (Copyright) alerta para a proteção legal das obras criativas.',
        en: 'Copyright protects original creative works created by an individual—such as texts, photographs, videos, music, and digital artwork. The creator is the author and holds the legal right to decide how their creation can be utilized by others.<br><br>The universal <strong>©</strong> symbol alerts everyone to legal creative protection.',
      },
      icon: '©️',
    },
    {
      eyebrow: { pt: 'O que é o Plágio?', en: 'What is Plagiarism?' },
      h: { pt: 'Encontrar não é o mesmo que poder copiar', en: 'Finding is not the same as being allowed to copy' },
      body: {
        pt: 'Encontrar uma imagem, texto ou música na Internet não significa que sejas livre de copiar e apresentar como se fosse tua. <strong>Plágio</strong> é copiar a obra de outra pessoa sem indicar quem é o autor original.<br><br>Fazer apenas "Copiar e Colar" (Ctrl+C e Ctrl+V) num trabalho escolar é uma falta grave. O correto é ler, compreender e explicar a ideia <em>com as tuas próprias palavras</em> (parafrasear), indicando sempre a fonte.',
        en: 'Finding an image, article, or track online does not grant permission to copy and claim it as your own. <strong>Plagiarism</strong> is copying another person’s work without attributing the author.<br><br>Mindless "Copy & Paste" in school work is a serious breach of academic honesty. The right approach is to understand and synthesize in <em>your own words</em> while citing the source.',
      },
      icon: '🚫',
    },
    {
      eyebrow: { pt: 'Licenças Livres', en: 'Open Licenses' },
      h: { pt: 'Creative Commons e Domínio Público', en: 'Creative Commons and Public Domain' },
      body: {
        pt: 'Existem licenças que permitem aos autores partilhar as suas criações com regras claras para reutilização:<ul><li><strong>Creative Commons (CC):</strong> Permite usar imagens, textos ou músicas desde que cumpras as condições (ex.: indicar o nome do autor com a licença <em>CC-BY</em>).</li><li><strong>Domínio Público:</strong> Obras cujos direitos de autor já expiraram (geralmente 70 anos após a morte do autor) e que podem ser utilizadas livremente por todos.</li></ul>',
        en: 'Open licenses allow creators to share their work with transparent rules for reuse:<ul><li><strong>Creative Commons (CC):</strong> Allows using pictures, texts, or audio as long as you follow conditions (e.g. giving credit under <em>CC-BY</em>).</li><li><strong>Public Domain:</strong> Works whose copyright has expired (typically 70 years after the creator’s passing) and are free for everyone to use.</li></ul>',
      },
      icon: '⚖️',
    },
    {
      eyebrow: { pt: 'Citar e Referenciar', en: 'Citing & Referencing' },
      h: { pt: 'A fórmula da citação escolar', en: 'The student citation formula' },
      body: {
        pt: 'Dar crédito aos autores é essencial. Uma boa referência bibliográfica no 5.º ano deve conter os 4 elementos essenciais:<ul><li><strong>Autor ou Organização:</strong> Quem produziu a obra (ex.: <em>SeguraNet</em>, <em>DGE</em>, <em>José Saramago</em>).</li><li><strong>Título:</strong> O nome da página, artigo ou livro consultado.</li><li><strong>Endereço Web (URL):</strong> O link direto para a página na Internet.</li><li><strong>Data de Consulta:</strong> O dia em que acedeste à informação (ex.: <em>Consultado em 15/02/2026</em>).</li></ul>',
        en: 'Giving credit is essential. A solid 5th-grade bibliographic reference must include 4 core elements:<ul><li><strong>Author or Organization:</strong> Who created the work (e.g., <em>SeguraNet</em>, <em>DGE</em>).</li><li><strong>Title:</strong> Name of the visited page, article, or book.</li><li><strong>Web Address (URL):</strong> The direct link to the web page.</li><li><strong>Access Date:</strong> The date you accessed the information.</li></ul>',
      },
      icon: '📚',
    },
    {
      eyebrow: { pt: 'Exemplo Prático', en: 'Practical Example' },
      h: { pt: 'Como citar corretamente no teu trabalho', en: 'How to cite correctly in your project' },
      body: {
        pt: 'Vê como se organiza uma referência bibliográfica correta:<br><br><div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono space-y-1.5 text-slate-800 shadow-2xs"><div><strong class="text-amber-900">Exemplo de Site da Internet:</strong></div><div class="text-slate-700 font-sans pl-2">SeguraNet (2024). <em>Guia de Segurança Digital para Jovens</em>. Disponível em: https://www.seguranet.pt (Consultado em 10/02/2026).</div><div class="pt-2"><strong class="text-amber-900">Exemplo de Livro Escolar:</strong></div><div class="text-slate-700 font-sans pl-2">Silva, Ana (2023). <em>Descobrir as TIC 5</em>. Lisboa: Porto Editora.</div></div><br><strong>⚠️ Atenção:</strong> Nunca coloques apenas "Google" ou "Internet" na bibliografia! O Google é apenas o motor de busca, não o autor do conteúdo.',
        en: 'See how a proper citation is structured:<br><br><div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono space-y-1.5 text-slate-800 shadow-2xs"><div><strong class="text-amber-900">Website Reference Example:</strong></div><div class="text-slate-700 font-sans pl-2">SeguraNet (2024). <em>Digital Safety Guide for Youth</em>. Available at: https://www.seguranet.pt (Accessed Feb 10, 2026).</div><div class="pt-2"><strong class="text-amber-900">Book Reference Example:</strong></div><div class="text-slate-700 font-sans pl-2">Silva, Ana (2023). <em>Discovering ICT 5</em>. Lisbon: Porto Editora.</div></div><br><strong>⚠️ Note:</strong> Never write just "Google" or "Internet" in your bibliography! Google is only the search engine, not the author.',
      },
      icon: '💡',
    },
  ],
  modules: [
    {
      id: 'copy-o-que-sao-direitos',
      themeId: 'direitos-autor',
      number: 1,
      title: {
        pt: 'O que são Direitos de Autor e Propriedade Intelectual?',
        en: 'What is Copyright and Intellectual Property?',
      },
      shortDesc: {
        pt: 'O símbolo ©, a proteção dos criadores e a diferença entre criar e copiar.',
        en: 'The © symbol, creator legal protection, and creating vs. copying.',
      },
      icon: '📜',
      explanation: {
        pt: [
          'Os Direitos de Autor (Copyright, assinalado pelo símbolo ©) são um conjunto de direitos legais que protegem quem cria uma obra original (livros, pinturas, fotografias, músicas, vídeos, jogos ou textos).',
          'Direito Moral: o criador tem sempre o direito inalienável de ser reconhecido como o autor daquela obra (a autoria nunca se perde nem se apaga).',
          'Direito Patrimonial / de Utilização: ninguém pode copiar, vender, alterar ou publicar a obra de outra pessoa sem autorização ou uma licença adequada.',
          'Estar online NÃO significa estar livre de direitos de autor: é necessária autorização ou uma licença adequada para usar qualquer conteúdo.',
        ],
        en: [
          'Copyright (marked by ©) legally protects original creative works (books, art, photos, music, code, texts).',
          'Moral Rights: creators always retain the right to be recognized and credited as the authentic author.',
          'Usage Rights: nobody can copy, sell, alter, or re-publish someone else’s work without authorization or a suitable license.',
          'Being online DOES NOT mean it is free of copyright: authorization or an adequate license is required.',
        ],
      },
      example: {
        title: {
          pt: 'A fotografia do pássaro no rio',
          en: 'The river bird photo',
        },
        scenario: {
          pt: 'O Afonso tirou uma fotografia fantástica a um guarda-rios no rio Tejo e publicou-a no seu blogue escolar. Um colega copiou a foto e colocou-a num concurso dizendo que tinha sido ele a tirá-la.',
          en: 'Afonso took a breathtaking photograph of a kingfisher on the Tagus river and posted it to his school blog. A student submitted it to a photo contest claiming ownership.',
        },
        tip: {
          pt: 'Isto é uma infração aos Direitos de Autor. O colega devia ter pedido autorização ao Afonso e dado o devido crédito como fotógrafo!',
          en: 'This is a copyright violation. The student should have requested permission and credited Afonso as photographer!',
        },
      },
      funFact: {
        pt: 'Sabias que em Portugal e na União Europeia os direitos de autor protegem uma obra durante toda a vida do seu autor e até 70 anos após a sua morte? Só depois disso a obra entra em "Domínio Público"!',
        en: 'Did you know that in Portugal and the EU, copyright protects works for the entire life of the creator plus 70 years after their passing? Only then does it enter the "Public Domain"!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Como te sentirias se passasses duas semanas a desenhar uma banda desenhada e um colega colasse o nome dele por cima e ficasse com o prémio?',
          en: 'How would you feel if you spent two weeks drawing a comic book and a classmate slapped their name on it to win a prize?',
        },
        clue: {
          pt: 'Pensa no tempo, esforço e imaginação que dedicaste.',
          en: 'Think of the time, effort, and imagination you invested.',
        },
        reflection: {
          pt: 'Sentirias muita frustração e injustiça! É exatamente por isso que a lei protege os autores e exige que todos respeitem o trabalho alheio.',
          en: 'You would feel deep frustration and injustice! That is why the law protects authors and requires respect for creators.',
        },
      },
      quizQuestions: [
        {
          id: 'q-copy-1',
          question: {
            pt: 'O que significa o símbolo universal ©?',
            en: 'What does the universal © symbol mean?',
          },
          options: {
            pt: [
              'Copyright / Direitos de Autor — indica que a obra está protegida por lei',
              'Computador ligado à corrente',
              'Cópia livre e sem qualquer dono',
              'Comentário aprovado pelo professor',
            ],
            en: [
              'Copyright / All Rights Reserved — indicates legal protection of author rights',
              'Computer plugged into power',
              'Free copy without ownership',
              'Teacher-approved comment',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! O símbolo © representa Copyright e alerta para a proteção legal da obra.',
            en: 'Correct! The © symbol signifies Copyright and statutory creator protections.',
          },
        },
      ],
    },
    {
      id: 'copy-plagio-versus-inspiracao',
      themeId: 'direitos-autor',
      number: 2,
      title: {
        pt: 'O Que é o Plágio e Como Evitá-lo',
        en: 'What is Plagiarism and How to Avoid It',
      },
      shortDesc: {
        pt: 'O perigo do "Copiar e Colar", parafrasear com as tuas palavras e citar.',
        en: 'The danger of "Copy & Paste", paraphrasing in your own words, and citing.',
      },
      icon: '🕵️',
      explanation: {
        pt: [
          'Plágio é o ato de copiar o trabalho, texto, ideias ou palavras de outra pessoa e apresentá-los como se fossem teus, sem indicar quem é o verdadeiro autor.',
          'Fazer simplesmente "Copiar e Colar" (Ctrl+C e Ctrl+V) da Wikipédia ou de outro site para um trabalho da escola é plágio e é uma falta grave.',
          'Como fazer corretamente? Lê a informação com atenção, compreende o significado e escreve um resumo COM AS TUAS PRÓPRIAS PALAVRAS (isto chama-se parafrasear).',
          'Se quiseres copiar uma frase exata do autor, coloca-a entre aspas (" ") e indica logo a seguir o nome do autor e o livro ou site de onde a retiraste.',
        ],
        en: [
          'Plagiarism is presenting someone else’s work, text, or ideas as your own without giving credit.',
          'Doing a mindless "Copy & Paste" (Ctrl+C and Ctrl+V) into your assignment is plagiarism and unacceptable.',
          'The right way: read the text, understand the concept, and write explanations IN YOUR OWN WORDS (paraphrasing).',
          'If you use exact words, enclose them in quotation marks (" ") and credit the author and source immediately.',
        ],
      },
      example: {
        title: {
          pt: 'O trabalho de História da Inês',
          en: 'Inês’s History project',
        },
        scenario: {
          pt: 'A Inês estava a fazer um trabalho sobre D. Afonso Henriques. Encontrou um parágrafo interessante num livro. Leu-o com atenção e escreveu: "Segundo o historiador José Mattoso, o primeiro rei de Portugal enfrentou grandes batalhas para unir o território".',
          en: 'Inês was doing a project on King Afonso Henriques. She read an insightful paragraph, synthesized it, and credited: "According to historian José Mattoso, Portugal’s first king fought hard to unite territory".',
        },
        tip: {
          pt: 'A Inês utilizou as suas próprias palavras e indicou o historiador. Mostrou que estudou a sério e não cometeu plágio!',
          en: 'Inês explained in her own words and attributed the historian. True academic honesty!',
        },
      },
      funFact: {
        pt: 'Sabias que as escolas e universidades utilizam programas informáticos especiais anti-plágio que comparam os trabalhos dos alunos com milhões de páginas da Internet e detetam frases copiadas em frações de segundo?',
        en: 'Did you know schools and universities use anti-plagiarism software that compares student papers against millions of web pages in milliseconds?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que aprendemos muito mais quando explicamos uma matéria por palavras nossas do que quando fazemos "copiar e colar"?',
          en: 'Why do we learn far more by explaining concepts in our own words rather than copy-pasting?',
        },
        clue: {
          pt: 'Pensa no trabalho que o teu cérebro tem de fazer para resumir uma ideia.',
          en: 'Think of the mental processing your brain must do to summarize.',
        },
        reflection: {
          pt: 'Porque ao resumir com palavras tuas, o teu cérebro tem de ler, processar, compreender e memorizar a ideia. Se apenas fizeres Ctrl+C e Ctrl+V, o teu cérebro nem sequer leu o texto!',
          en: 'Because synthesizing forces your brain to comprehend and consolidate knowledge. Mindless copy-pasting skips learning completely!',
        },
      },
      quizQuestions: [
        {
          id: 'q-copy-2',
          question: {
            pt: 'O que deves fazer quando queres usar uma informação que leste num site para um trabalho escolar?',
            en: 'What should you do when you want to use information from a website in your school report?',
          },
          options: {
            pt: [
              'Ler, explicar o assunto por palavras tuas e indicar a fonte consultada no final',
              'Fazer "Copiar e Colar" de todo o texto sem ler e fingir que foste tu que escreveste',
              'Apagar o nome do autor original e colocar o teu nome em letras garrafais',
              'Copiar o texto em língua estrangeira para o professor não perceber',
            ],
            en: [
              'Read, explain in your own words, and cite the consulted source at the end',
              'Copy-paste the whole text without reading and pretend you wrote it',
              'Delete the original author’s name and put yours in bold caps',
              'Copy foreign language text hoping the teacher won’t notice',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Perfeito! Explicar por palavras tuas e citar a fonte é a atitude correta e responsável.',
            en: 'Spot on! Paraphrasing in your own words and citing sources is responsible scholarship.',
          },
        },
      ],
    },
    {
      id: 'copy-creative-commons',
      themeId: 'direitos-autor',
      number: 3,
      title: {
        pt: 'Licenças Livres e Creative Commons (CC)',
        en: 'Open Licenses and Creative Commons (CC)',
      },
      shortDesc: {
        pt: 'Como usar imagens, músicas e textos legalmente com licenças abertas.',
        en: 'How to use images, music, and text legally with open licenses.',
      },
      icon: '⚖️',
      explanation: {
        pt: [
          'Nem tudo na Internet tem todos os direitos reservados. Muitos autores querem partilhar as suas criações e usam Licenças Creative Commons (CC).',
          'CC-BY (Atribuição): Podes usar, modificar e partilhar a imagem ou música, desde que dês o CRÉDITO ao autor original.',
          'CC-NC (Não Comercial): Podes usar a obra livremente para estudar ou na escola, mas NUNCA para vender ou ganhar dinheiro.',
          'CC-SA (Partilha nos Mesmos Termos): Se alterares a obra, tens de partilhar o resultado final com a mesma licença livre.',
          'Domínio Público (CC0): Obras sem direitos patrimoniais (ou cujo autor abdicou deles), que qualquer pessoa pode usar livremente.',
        ],
        en: [
          'Not everything online has all rights reserved. Many authors wish to share creations under Creative Commons (CC) licenses.',
          'CC-BY (Attribution): You may use and adapt the work as long as you give credit to the original creator.',
          'CC-NC (Non-Commercial): You can use the creation for education, but never for commercial gain.',
          'CC-SA (Share-Alike): If you modify the work, you must share it under the exact same open license.',
          'Public Domain (CC0): Works without economic copyright that anyone can freely adapt and use.',
        ],
      },
      example: {
        title: {
          pt: 'A música para o vídeo de Ciências da Madalena',
          en: 'Madalena’s Science video background music',
        },
        scenario: {
          pt: 'A Madalena precisava de uma música de fundo para o vídeo sobre o Sistema Solar. Em vez de usar uma música protegida da rádio, foi a um banco de sons com licença CC-BY.',
          en: 'Madalena needed background music for her Solar System presentation. Instead of pirating radio hits, she downloaded CC-BY licensed audio.',
        },
        tip: {
          pt: 'A Madalena colocou nos créditos finais do vídeo: "Música: Solar Journey por Kevin MacLeod (Licença CC-BY)". Ficou perfeito e 100% legal!',
          en: 'Madalena included in the video credits: "Music: Solar Journey by Kevin MacLeod (Licensed under CC-BY)". Fully legal and credited!',
        },
      },
      funFact: {
        pt: 'Sabias que plataformas famosas como o Wikimedia Commons, o Unsplash e o Freesound têm milhões de fotografias, sons e ilustrações gratuitas prontas a usar em trabalhos escolares?',
        en: 'Did you know platforms like Wikimedia Commons, Unsplash, and Freesound offer millions of free assets ready for school projects?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que as licenças Creative Commons ajudam o mundo inteiro a partilhar conhecimento de forma mais rápida e justa?',
          en: 'Why do Creative Commons licenses help the entire world share knowledge faster and more fairly?',
        },
        clue: {
          pt: 'Pensa no tempo que poupas se não tiveres de enviar uma carta ao autor a pedir autorização.',
          en: 'Think of the time saved by not having to mail individual permission requests.',
        },
        reflection: {
          pt: 'Porque definem regras claras e automáticas de utilização! Quem precisa de uma imagem para estudar sabe logo o que pode e não pode fazer, sem burocracia.',
          en: 'Because they set immediate, transparent terms! Students know instantly what is permitted without red tape.',
        },
      },
      quizQuestions: [
        {
          id: 'q-copy-3',
          question: {
            pt: 'O que deves fazer quando utilizas uma fotografia com a licença Creative Commons "CC-BY"?',
            en: 'What must you do when using a photograph with a "CC-BY" Creative Commons license?',
          },
          options: {
            pt: [
              'Dar o devido crédito indicando o nome do autor original e a fonte',
              'Pagar 50 euros ao criador da fotografia',
              'Apagar a fotografia logo após 5 minutos',
              'Pedir autorização ao diretor da escola por escrito',
            ],
            en: [
              'Give proper credit by attributing the original author and source',
              'Pay 50 euros to the photographer',
              'Delete the photo after 5 minutes',
              'Ask the school principal in writing',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Exato! A sigla BY significa "Atribuição" — deves sempre creditar o autor original.',
            en: 'Exactly! BY stands for Attribution—you must always credit the author.',
          },
        },
      ],
    },
    {
      id: 'ref-avaliar-fiabilidade',
      themeId: 'direitos-autor',
      number: 4,
      title: {
        pt: 'Como Avaliar a Fiabilidade das Fontes',
        en: 'How to Evaluate Source Credibility and Trustworthiness',
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
          '4. Qual é o OBJETIVO? O artigo quer ensinar com factos neutros ou quer vender um produto ou espalhar boatos?',
        ],
        en: [
          'Anyone can launch a website or upload a video stating falsehoods. Before using facts in a school report, apply the 4-element test:',
          '1. Who is the AUTHOR? Is there an identified real author? Are they a teacher, scientist, or recognized institution?',
          '2. What is the DATE? Is the knowledge up to date or 15 years old and obsolete?',
          '3. What is the SOURCE? Does the domain belong to an official body (.gov.pt, .edu, .pt) or an anonymous ad-heavy blog?',
          '4. What is the PURPOSE? Does it educate neutrally or attempt to sell products and spread bias?',
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
          en: 'Tiago checked official maritime portals: zero reports! It was a fabricated hoax crafted for clickbait views.',
        },
      },
      funFact: {
        pt: 'Sabias que informação falsa ou enganadora pode espalhar-se rapidamente, especialmente quando provoca emoções fortes (como medo ou surpresa)? Pensar criticamente é o teu superpoder!',
        en: 'Did you know that false information spreads rapidly when it triggers strong emotions? Critical thinking is your digital superpower!',
      },
      thinkAboutIt: {
        question: {
          pt: 'Porque é que a Wikipédia pode ser um bom ponto de partida para pesquisar, mas não deves copiar o texto diretamente sem verificar as fontes?',
          en: 'Why can Wikipedia be a great starting point, but you shouldn’t cite it without checking original sources?',
        },
        clue: {
          pt: 'Pensa em quem pode editar artigos na Wikipédia e nas referências no fundo da página.',
          en: 'Think of who can edit Wikipedia articles and the references at the bottom.',
        },
        reflection: {
          pt: 'Porque qualquer voluntário pode editar artigos! O melhor da Wikipédia é a lista de fontes e referências no final de cada artigo, que te leva às páginas científicas e oficiais originais.',
          en: 'Because articles are community-edited. Use Wikipedia to find original authoritative links at the bottom!',
        },
      },
      quizQuestions: [
        {
          id: 'q-ref-1',
          question: {
            pt: 'Qual destes critérios NÃO é um bom indicador de que um site na Internet é fiável e seguro para pesquisares?',
            en: 'Which of these criteria is NOT a good indicator of web credibility?',
          },
          options: {
            pt: [
              'O site ter títulos sensacionalistas cheios de pontos de exclamação e não ter autor identificado',
              'Pertencer a uma universidade, museu, ministério ou centro de investigação conhecido',
              'Indicar claramente o nome e as qualificações do autor do artigo',
              'Apresentar a data recente em que o artigo foi escrito e revisto',
            ],
            en: [
              'The site displaying clickbait sensationalist headlines with no author identified',
              'Belonging to an accredited university, museum, ministry, or research center',
              'Clearly showing author credentials and full name',
              'Providing a recent date of publication and review',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Correto! Títulos exagerados e ausência de autor são sinais claros de que a fonte não é de confiança.',
            en: 'Correct! Exaggerated headlines and missing authors are red flags for unreliable information.',
          },
        },
      ],
    },
    {
      id: 'ref-como-construir-referencias',
      themeId: 'direitos-autor',
      number: 5,
      title: {
        pt: 'Como Construir as Referências Bibliográficas',
        en: 'How to Build Bibliographic Reference Lists',
      },
      shortDesc: {
        pt: 'A estrutura padrão: Autor, Título, Link e Data de Acesso.',
        en: 'Standard format: Author, Title, Link, and Access Date.',
      },
      icon: '📝',
      explanation: {
        pt: [
          'No final de qualquer trabalho escolar, deves incluir uma secção chamada "Referências Bibliográficas" ou "Bibliografia".',
          'Esta secção lista todas as fontes que leste e consultaste para elaborar o teu trabalho.',
          'Como citar uma página da Internet no 5.º ano? Usa a seguinte estrutura:',
          '• AUTOR ou ENTIDADE: Quem escreveu (ex.: Ciência Viva, DGE, SeguraNet)',
          '• (ANO / DATA): Ano de publicação (se existir)',
          '• TÍTULO: Nome do artigo ou página visitada',
          '• DISPONÍVEL EM: O endereço web (URL completo)',
          '• CONSULTADO EM: O dia, mês e ano em que visitaste a página',
        ],
        en: [
          'At the end of every school project, include a section named "Bibliographic References" or "Bibliography".',
          'This section lists all sources read and consulted to build your project.',
          'Standard 5th-grade citation formula: Author/Organization + (Year) + Title + Available at (URL) + Accessed on (Date).',
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
        pt: 'Sabias que existem normas internacionais rigorosas para escrever referências (como a norma APA ou a norma portuguesa NP 405) utilizadas por cientistas e investigadores do mundo inteiro?',
        en: 'Did you know there are strict international formatting standards (like APA or NP 405) used by scientists worldwide to maintain research rigor?',
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
          pt: 'O Google é apenas a ferramenta de pesquisa, como se fosse o autocarro que te leva à biblioteca! Quem escreveu o conteúdo foi o autor ou a entidade da página visitada.',
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
              'Porque é uma regra obrigatória apenas para quem usa óculos',
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
      themeId: 'direitos-autor',
      number: 6,
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
          'Cruzamento de Fontes: procura a mesma notícia em pelo menos mais dois sites sérios e conhecidos (ex.: jornais de referência, canais de notícias nacionais, páginas científicas).',
          'Se a notícia só existe naquele blogue estranho e em mais lado nenhum do mundo, é quase garantido que é FALSA.',
          'Imagens e Vídeos Manipulados: tem cuidado com imagens geradas por IA ou vídeos tirados fora de contexto.',
        ],
        en: [
          'Misinformation is the dissemination of false rumors to mislead or alarm.',
          'Golden Rule of Verification: when encountering shocking claims, NEVER share immediately!',
          'Source Triangulation: cross-reference the claim across at least two other reputable quality portals.',
          'If the story appears only on that strange blog, it is almost certainly FAKE.',
        ],
      },
      example: {
        title: {
          pt: 'O boato do fecho das escolas em Portugal',
          en: 'The school closure rumor in Portugal',
        },
        scenario: {
          pt: 'Circulou uma imagem de WhatsApp a dizer: "O Ministério da Educação cancelou as aulas durante todo o mês que vem!". Tinha erros ortográficos e letras maiúsculas gigantes.',
          en: 'A WhatsApp screenshot circulated: "Ministry of Education cancels classes all next month!". It was full of spelling typos and capital letters.',
        },
        tip: {
          pt: 'Os alunos foram ao site oficial da DGE (dge.mec.pt) e aos jornais diários: não havia nada! Era uma mentira inventada para criar confusão.',
          en: 'Students visited the official education portal: zero announcements! It was a hoax made to cause panic.',
        },
      },
      funFact: {
        pt: 'Sabias que existem agências profissionais de checagem de factos (como o Polígrafo em Portugal) dedicadas a investigar se as notícias virais na Internet são verdadeiras ou falsas?',
        en: 'Did you know fact-checking agencies dedicate full teams to investigating viral web claims?',
      },
      thinkAboutIt: {
        question: {
          pt: 'O que deves fazer quando recebes no telemóvel uma mensagem alarmista que diz "Partilha com todos os teus contactos antes que apaguem"?',
          en: 'What should you do when receiving an alarmist chain message saying "Share with everyone before it gets deleted"?',
        },
        clue: {
          pt: 'As mensagens em cadeia usam a urgência e o medo para enganar.',
          en: 'Chain messages exploit panic and urgency to deceive.',
        },
        reflection: {
          pt: 'PARAR e NÃO partilhar! Mensagens com pedidos de partilha em massa urgente são quase sempre esquemas, vírus ou boatos falsos.',
          en: 'STOP and DO NOT share! Urgent mass-sharing appeals are almost always scams, malware, or hoaxes.',
        },
      },
      quizQuestions: [
        {
          id: 'q-ref-3',
          question: {
            pt: 'O que significa a expressão "Cruzamento de Fontes"?',
            en: 'What does "Triangulating / Cross-referencing Sources" mean?',
          },
          options: {
            pt: [
              'Verificar se a mesma informação é confirmada por dois ou três sites independentes e credíveis',
              'Desenhar uma cruz com uma caneta vermelha em cima do ecrã',
              'Copiar o texto para quatro documentos diferentes',
              'Desligar o monitor do computador duas vezes',
            ],
            en: [
              'Verifying if the same fact is confirmed by two or three independent reputable websites',
              'Drawing a cross with a red pen on the monitor',
              'Copying text into four distinct documents',
              'Turning off the display twice',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! Se várias entidades sérias e independentes confirmam o mesmo facto, a informação é muito mais segura.',
            en: 'Spot on! Independent corroboration is the golden benchmark of factual verification.',
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
            { left: 'Símbolo ©', right: 'Todos os direitos reservados ao autor' },
            { left: 'Licença CC-BY', right: 'Uso livre com atribuição do autor' },
            { left: 'Licença CC-NC', right: 'Uso proibido para fins comerciais' },
            { left: 'Domínio Público', right: 'Obra livre de direitos patrimoniais' }
          ]
        }
      }
    },
    {
      id: 'jogo-copy-true-false',
      themeId: 'direitos-autor',
      number: 2,
      title: { pt: '⚖️ Detetive de Plágio & Respeito', en: '⚖️ Plagiarism & Respect Detective' },
      shortDesc: { pt: 'Classifica situações escolares como Plágio ou Utilização Correta.', en: 'Classify school scenarios as Plagiarism or Proper Attribution.' },
      icon: '⚖️',
      durationMinutes: 5,
      points: 25,
      type: 'true_false',
      gameData: {
        type: 'true_false',
        title: 'Detetive de Plágio & Respeito',
        icon: '⚖️',
        xp: 25,
        desc: 'Decide se a afirmação representa uma conduta correta ou uma infração de plágio.',
        data: {
          questions: [
            {
              statement: 'Fazer "Copiar e Colar" de um artigo da Wikipédia sem citar a fonte é plágio.',
              isTrue: true,
              explanation: 'Verdade! Copiar diretamente sem referenciar o autor é plágio e é incorreto.'
            },
            {
              statement: 'Ler um texto, resumi-lo por palavras próprias e indicar o autor no final é a forma correta de investigar.',
              isTrue: true,
              explanation: 'Verdade! Parafrasear e citar a fonte demonstra verdadeiro estudo e respeito.'
            },
            {
              statement: 'Se uma imagem aparecer no motor de busca Google, significa que não tem dono e posso usá-la como quiser.',
              isTrue: false,
              explanation: 'Falso! As imagens continuam protegidas por direitos de autor, deves verificar a licença.'
            },
            {
              statement: 'Escrever na bibliografia apenas "Fonte: Google" é uma referência completa e correta.',
              isTrue: false,
              explanation: 'Falso! O Google é apenas o motor de busca, deves citar a página e o autor real.'
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
            { text: 'Site oficial do Ministério da Educação (.gov.pt)', categoryId: 'confiavel' },
            { text: 'Portal de uma universidade reconhecida (.edu / .pt)', categoryId: 'confiavel' },
            { text: 'Blogue anónimo sem autor identificado e sem datas', categoryId: 'suspeito' },
            { text: 'Mensagem de WhatsApp urgente a dizer "Partilha já com todos!"', categoryId: 'suspeito' },
            { text: 'Artigo assinado por biólogo marinho do Oceanário de Lisboa', categoryId: 'confiavel' },
            { text: 'Site cheio de anúncios a piscar e títulos em maiúsculas gigantes', categoryId: 'suspeito' }
          ]
        }
      }
    },
    {
      id: 'jogo-ref-order',
      themeId: 'direitos-autor',
      number: 4,
      title: { pt: '📦 Passos de Verificação de Factos e Citação', en: '📦 Fact-Checking & Citing Steps Order' },
      shortDesc: { pt: 'Ordena os passos lógicos para investigar uma notícia e citá-la no teu trabalho.', en: 'Order steps to investigate information and cite it correctly.' },
      icon: '📦',
      durationMinutes: 4,
      points: 20,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Passos de Verificação de Factos e Citação',
        icon: '📦',
        xp: 20,
        desc: 'Coloca os passos de checagem e citação na ordem lógica ideal.',
        data: {
          items: [
            'Ler a notícia ou artigo inteiro e não ficar apenas pelo título chamativo',
            'Verificar quem é o autor, a data e se a instituição é credível',
            'Cruzar a informação com outros sites sérios e independentes',
            'Resumir com palavras próprias e registar a referência bibliográfica completa'
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema7',
      themeId: 'direitos-autor',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Direitos de Autor e Fontes', en: '🏆 Learning Quiz: Copyright & Sources' },
      shortDesc: { pt: 'Avaliação final abrangente sobre Direitos de Autor, Licenças e Referências.', en: 'Comprehensive final assessment on Copyright, Licenses, and Sources.' },
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
        pt: 'O que são Direitos de Autor (Copyright ©)?',
        en: 'What is Copyright ©?',
      },
      options: {
        pt: [
          'A proteção legal que garante ao criador o reconhecimento e o direito de decidir como a sua obra é usada',
          'Uma licença para poder copiar qualquer livro sem pagar',
          'Um vírus informático que apaga trabalhos escolares',
          'Um tipo de letra especial para escrever títulos',
        ],
        en: [
          'Statutory legal protection ensuring creators recognition and rights over how works are used',
          'A permission slip to copy books without payment',
          'A computer virus that erases school papers',
          'A special font designed for headings',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os Direitos de Autor protegem as obras originais e garantem o respeito pelo esforço de quem as criou.',
        en: 'Copyright safeguards creative endeavors and honors original author contributions.',
      },
    },
    {
      id: 'copy-q2',
      question: {
        pt: 'O que é o Plágio num trabalho escolar?',
        en: 'What is Plagiarism in school work?',
      },
      options: {
        pt: [
          'Apresentar o texto, ideias ou criação de outra pessoa como se fossem teus, sem indicar a autoria',
          'Escrever um trabalho excelente com ideias próprias',
          'Comprar uma caneta nova para escrever no caderno',
          'Estudar com um colega da turma para um teste',
        ],
        en: [
          'Presenting someone else’s text, ideas, or work as your own without crediting them',
          'Writing an outstanding original essay',
          'Buying a new pen for notebook notes',
          'Studying with a classmate for an exam',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Plágio é copiar a obra alheia sem atribuir o devido crédito ao autor original.',
        en: 'Plagiarism is misrepresenting another author’s work as your own creation.',
      },
    },
    {
      id: 'copy-q3',
      question: {
        pt: 'Só porque uma imagem está visível no Google Imagens, isso significa que podes usá-la livremente como quiseres?',
        en: 'Just because an image appears in Google Images, does that mean you can use it freely however you wish?',
      },
      options: {
        pt: [
          'NÃO! A imagem pode estar protegida por direitos de autor e deves verificar a licença e citar o autor',
          'SIM! Tudo o que está na Internet é grátis e não tem dono',
          'SIM! O Google é dono de todas as fotografias do mundo',
          'SIM! Ninguém se importa com as fotografias',
        ],
        en: [
          'NO! It may be copyrighted and you must verify license terms and credit the creator',
          'YES! Everything online is free and ownerless',
          'YES! Google owns every photo in the world',
          'YES! Nobody cares about photos',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Estar online não retira os direitos de autor. Deves sempre verificar a licença de utilização.',
        en: 'Being indexed online does not waive copyright. Always check usage licenses.',
      },
    },
    {
      id: 'copy-q4',
      question: {
        pt: 'O que significa fazer uma "paráfrase" correta de um texto para o teu trabalho?',
        en: 'What does correctly paraphrasing a source text mean?',
      },
      options: {
        pt: [
          'Ler a informação, compreendê-la e reescrevê-la com as tuas próprias palavras, indicando a fonte',
          'Copiar e colar o texto todo e mudar apenas uma vírgula de sítio',
          'Pôr o texto numa língua estrangeira e voltar a traduzir',
          'Copiar o texto e apagar o primeiro parágrafo',
        ],
        en: [
          'Read, synthesize the concept, and explain it in your own words while citing the source',
          'Copy-paste the entire text and change just one comma',
          'Translate text back and forth between languages',
          'Copy text while deleting the first paragraph',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Parafrasear é explicar a ideia com o teu vocabulário pessoal, demonstrando compreensão.',
        en: 'Paraphrasing synthesizes ideas in your unique voice while honoring the original concept.',
      },
    },
    {
      id: 'copy-q5',
      question: {
        pt: 'O que são as licenças Creative Commons (CC)?',
        en: 'What are Creative Commons (CC) licenses?',
      },
      options: {
        pt: [
          'Licenças que permitem aos autores partilhar as suas obras com regras claras para reutilização',
          'Uma multa aplicada a quem utiliza o computador sem permissão',
          'Um cartão de sócio para jogar videojogos',
          'Um antivírus para proteger imagens',
        ],
        en: [
          'Licenses that allow creators to share their work with explicit permissions for reuse',
          'A fine for unauthorized computer use',
          'A membership card for video games',
          'An antivirus to protect photos',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As licenças Creative Commons facilitam a partilha legal de conhecimento e arte.',
        en: 'Creative Commons provides a standardized legal framework for open content sharing.',
      },
    },
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
          '.gov.pt (governo/estado) ou .edu / .pt de universidades e centros científicos',
          '.xyz.biz',
          '.click.free',
          '.download-gratis.cc',
        ],
        en: [
          '.gov.pt (government/state) or accredited educational institutions',
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
  ],
};
