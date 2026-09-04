import { ThemeDefinition } from '../types';

export const themeDireitosAutorData: ThemeDefinition = {
  id: 'direitos-autor',
  number: 6,
  title: {
    pt: 'Direitos de Autor',
    en: 'Copyright',
  },
  tagline: {
    pt: 'Aprende a respeitar os autores e os conteúdos que encontras na Internet.',
    en: 'Learn to respect creators and the content you find online.',
  },
  intro: {
    pt: 'Quando escreves um texto, tiras uma fotografia ou compões uma música, essa criação é tua e pertence-te por lei! Da mesma forma, tudo o que encontramos na Internet pertence a alguém. Aprende o que é o copyright ©, como usar licenças livres (Creative Commons) e como evitar o plágio nos teus trabalhos.',
    en: 'When you write an essay, take a picture, or make music, it belongs to you by law! Similarly, everything online was made by someone. Discover copyright ©, Creative Commons, and how to avoid plagiarism in school work.',
  },
  icon: '©️',
  illustrationKey: 'direitos-autor',
  accentColor: 'amber',
  badgeCount: 2,
  lessons: [
    {
      eyebrow: { pt: 'Vamos descobrir', en: "Let's discover" },
      h: { pt: 'O que são direitos de autor?', en: 'What is copyright?' },
      body: {
        pt: 'Os direitos de autor protegem o trabalho criado por uma pessoa — como textos, imagens, vídeos, músicas ou outros trabalhos digitais. Quem cria uma obra é o autor, e tem o direito de decidir como ela pode ser usada por outras pessoas.',
        en: 'Copyright protects original creative works created by an individual—such as texts, photographs, videos, music, and digital artwork. The creator is the author and holds the legal right to decide how their creation can be utilized by others.',
      },
      icon: '©️',
    },
    {
      eyebrow: { pt: 'Atenção!', en: 'Attention!' },
      h: { pt: 'Encontrar não é o mesmo que poder copiar', en: 'Finding is not the same as being allowed to copy' },
      body: {
        pt: 'Encontrar uma imagem, texto ou música na Internet não significa que sejas livre de copiar e usar sem quaisquer regras. Muitos conteúdos só podem ser usados com autorização do autor ou indicando corretamente a fonte.',
        en: 'Locating a photo, article, or audio track on Google or social media does not grant automatic permission to copy and reuse it arbitrarily. Most online content requires author permission or explicit attribution.',
      },
      icon: '⚠️',
    },
    {
      eyebrow: { pt: 'Exemplo', en: 'Example' },
      h: { pt: 'Um trabalho escolar', en: 'A school assignment' },
      body: {
        pt: '<em>"Encontraste uma imagem na Internet para um trabalho. O que deves fazer?"</em> O correto é verificar se podes usá-la (por exemplo, se é de utilização livre) e, sempre que possível, indicar a fonte de onde a retiraste.',
        en: '<em>"You found a great picture online for your school presentation. What should you do?"</em> Always check its usage license (e.g. Creative Commons or free-to-use) and clearly cite the source where you retrieved it.',
      },
      icon: '📝',
    },
    {
      eyebrow: { pt: 'Vamos pensar', en: "Let's think" },
      h: { pt: 'O que é o plágio?', en: 'What is plagiarism?' },
      body: {
        pt: 'Plágio é copiar o trabalho de outra pessoa e apresentá-lo como se fosse teu, sem indicar o autor original. É uma falta de respeito pelo trabalho de quem criou o conteúdo e deve sempre ser evitado.',
        en: 'Plagiarism is copying someone else’s work and presenting it as your own creation without acknowledging the original author. It disrespects the creator’s hard work and is considered unethical.',
      },
      icon: '🚫',
    },
    {
      eyebrow: { pt: 'Sabias que...?', en: 'Did you know...?' },
      h: { pt: 'Indicar a fonte é um sinal de respeito', en: 'Citing sources shows digital citizenship' },
      body: {
        pt: 'Sempre que usares um texto, imagem ou ideia de outra pessoa num trabalho escolar, deves indicar de onde veio. Isso mostra respeito pelo autor e torna o teu trabalho mais correto e credível.',
        en: 'Whenever you reference another person’s writing, illustration, or concept in a school report, citing the author elevates your credibility and demonstrates authentic digital integrity.',
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
          'Direito Moral: o criador tem sempre o direito de ser reconhecido como o autor daquela obra (a autoria nunca se perde nem se apaga).',
          'Direito de Utilização: ninguém pode copiar, vender, alterar ou publicar a obra de outra pessoa sem a sua devida autorização expressa.',
          'Só porque uma imagem ou texto está na Internet de acesso público NÃO significa que seja grátis para usar ou que não tenha dono!',
        ],
        en: [
          'Copyright (marked by ©) legally protects original creative works (books, art, photos, music, code, texts).',
          'Moral Rights: creators always retain the right to be recognized and credited as the authentic author.',
          'Usage Rights: nobody can copy, sell, alter, or re-publish someone else’s work without permission.',
          'Just because an image or article is accessible online DOES NOT mean it lacks an owner or can be freely copied!',
        ],
      },
      example: {
        title: {
          pt: 'A fotografia do pássaro no jardim',
          en: 'The garden bird photo',
        },
        scenario: {
          pt: 'O Afonso tirou uma fotografia fantástica a um guarda-rios no rio Tejo e publicou-a no seu blogue escolar. Um colega de outra escola copiou a fotografia e colocou-a num concurso dizendo que tinha sido ele a tirá-la.',
          en: 'Afonso took a breathtaking photograph of a kingfisher on the Tagus river and posted it to his school blog. A student from another school submitted it to a photo contest claiming ownership.',
        },
        tip: {
          pt: 'Isto é uma infração grave aos Direitos de Autor. O colega devia ter pedido autorização ao Afonso e dado o devido crédito como fotógrafo!',
          en: 'This is a serious copyright violation. The student should have requested permission and credited Afonso as photographer!',
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
          'Fazer simplesmente "Copiar e Colar" (Ctrl+C e Ctrl+V) da Wikipédia para um trabalho da escola é plágio e é uma falta grave.',
          'Como fazer corretamente? Lê a informação com atenção, compreende o significado e escreve um resumo COM AS TUAS PRÓPRIAS PALAVRAS (isto chama-se parafrasear).',
          'Se quiseres copiar uma frase exata do autor, coloca-a entre aspas (" ") e indica logo a seguir o nome do autor e o livro ou site de onde a retiraste.',
        ],
        en: [
          'Plagiarism is presenting someone else’s work, text, or ideas as your own without giving credit.',
          'Doing a mindless "Copy & Paste" (Ctrl+C and Ctrl+V) from Wikipedia into your assignment is plagiarism and unacceptable.',
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
          en: 'Inês was doing a project on King Afonso Henriques. She read an insightful paragraph in a book, synthesized it, and credited: "According to historian José Mattoso, Portugal’s first king fought hard to unite territory".',
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
        pt: 'Licenças Creative Commons (CC) e Recursos Livres',
        en: 'Creative Commons (CC) Licenses and Open Resources',
      },
      shortDesc: {
        pt: 'Como encontrar imagens, sons e vídeos que os autores autorizam a usar.',
        en: 'How to find images, sounds, and videos that creators permit us to use.',
      },
      icon: '🎨',
      explanation: {
        pt: [
          'Existem muitos criadores que querem partilhar o seu trabalho com a comunidade educativa! Para isso utilizam licenças chamadas Creative Commons (CC).',
          'Símbolo CC-BY (Atribuição): podes usar a imagem, música ou texto livremente, desde que dês os créditos ao autor original.',
          'Símbolo CC-NC (Não Comercial): podes usar a obra para estudar ou em projetos escolares, mas ninguém pode usá-la para ganhar dinheiro.',
          'Domínio Público: obras cujos direitos já expiraram (por exemplo, pinturas históricas antigas) ou que foram oferecidas à humanidade.',
          'Bancos de Imagens Livres: plataformas como Wikimedia Commons, Pixabay ou Unsplash oferecem imagens gratuitas que podemos usar nos trabalhos escolares respeitando as regras.',
        ],
        en: [
          'Many creators gladly share their work with students using Creative Commons (CC) licenses.',
          'CC-BY (Attribution): you can use the material freely, as long as you give proper credit to the author.',
          'CC-NC (Non-Commercial): you can use it for study and school, but not for commercial profit.',
          'Public Domain: works whose copyright expired (like classical art) or dedicated freely to the public.',
          'Open Repositories: sites like Wikimedia Commons or Pixabay provide royalty-free media for school use.',
        ],
      },
      example: {
        title: {
          pt: 'A ilustração para o trabalho de Ciências',
          en: 'Illustration for Science homework',
        },
        scenario: {
          pt: 'O Vasco precisava de uma imagem do Sistema Solar para a capa do trabalho. Procurou no Wikimedia Commons e encontrou uma fotografia da NASA com licença pública.',
          en: 'Vasco needed a Solar System picture for his assignment cover. He looked on Wikimedia Commons and found a NASA photo in the public domain.',
        },
        tip: {
          pt: 'O Vasco colocou a imagem na capa e escreveu por baixo: "Imagem: NASA / Wikimedia Commons (Domínio Público)". Trabalho exemplar!',
          en: 'Vasco placed it on the cover with the caption: "Image: NASA / Wikimedia Commons (Public Domain)". Exemplary work!',
        },
      },
      funFact: {
        pt: 'Sabias que todas as fotografias espaciais e descobertas científicas tiradas pelos telescópios espaciais da NASA (como o Hubble e o James Webb) pertencem ao Domínio Público e podem ser usadas por qualquer estudante do mundo gratuitamente?',
        en: 'Did you know all space imagery taken by NASA telescopes (like Hubble and James Webb) is in the Public Domain and freely usable by students worldwide?',
      },
      thinkAboutIt: {
        question: {
          pt: 'Se uma fotografia não tiver escrito nenhum aviso nem nenhum símbolo, ela tem direitos de autor?',
          en: 'If a photograph online has no visible notice or symbol, is it copyrighted?',
        },
        clue: {
          pt: 'A proteção da lei é automática a partir do momento em que a obra é criada.',
          en: 'Legal copyright protection is automatic from the instant of creation.',
        },
        reflection: {
          pt: 'SIM! Por lei, toda a criação original está automaticamente protegida por Direitos de Autor, mesmo que o criador não tenha colocado o símbolo ©. Se tiveres dúvidas, deves sempre pedir autorização ou procurar uma alternativa com licença livre.',
          en: 'YES! All original creations are automatically protected by copyright upon creation, even without a visible © mark.',
        },
      },
      quizQuestions: [
        {
          id: 'q-copy-3',
          question: {
            pt: 'O que significa a licença Creative Commons com a sigla "BY" (Atribuição)?',
            en: 'What does a Creative Commons license with "BY" (Attribution) require?',
          },
          options: {
            pt: [
              'Podes utilizar a obra livremente, desde que dês o devido crédito ao autor original',
              'É proibido olhar para a imagem',
              'Tens de pagar mil euros cada vez que abres a página',
              'A obra só pode ser vista durante a noite',
            ],
            en: [
              'You may use the work freely, provided you give appropriate credit to the creator',
              'It is forbidden to look at the image',
              'You must pay a thousand euros per view',
              'The work can only be seen at night',
            ],
          },
          correctIndex: 0,
          explanation: {
            pt: 'Excelente! A licença CC-BY permite a reutilização com a condição obrigatória de citar o criador original.',
            en: 'Excellent! CC-BY allows reuse on the condition that creator attribution is provided.',
          },
        },
      ],
    },
  ],
  challenges: [
    {
      id: 'jogo-copy-tf',
      themeId: 'direitos-autor',
      number: 1,
      title: { pt: '⚡ Verdadeiro ou Falso: Direitos de Autor', en: '⚡ True or False: Copyright' },
      shortDesc: { pt: 'Distingue regras sobre cópia de imagens e textos na web.', en: 'Distinguish rules on copying images and texts on the web.' },
      icon: '⚡',
      durationMinutes: 3,
      points: 15,
      type: 'true_false',
      gameData: {
        type: 'tf',
        title: 'Verdadeiro ou Falso: Direitos de Autor',
        icon: '⚡',
        xp: 15,
        desc: 'Classifica as afirmações sobre autoria, plágio e licenças Creative Commons.',
        data: {
          items: [
            { s: 'Tudo o que aparece no Google Imagens pode ser copiado e usado livremente em trabalhos escolares.', a: false, e: 'Incorreto! A maioria das imagens tem direitos de autor protegidos.' },
            { s: 'O plágio consiste em apresentar o trabalho de outra pessoa como se fosse nosso.', a: true, e: 'Correto! Plágio é uma forma de roubo intelectual e é proibido.' },
            { s: 'As licenças Creative Commons permitem partilhar obras com regras claras definidas pelo autor.', a: true, e: 'Correto! Facilitam a reutilização legal e ética de conteúdos.' }
          ]
        }
      }
    },
    {
      id: 'jogo-copy-mc',
      themeId: 'direitos-autor',
      number: 2,
      title: { pt: '🖼️ Posso usar esta imagem?', en: '🖼️ Can I Use This Image?' },
      shortDesc: { pt: 'Identifica boas práticas ao utilizar conteúdos criados por terceiros.', en: 'Identify good practices when using content created by others.' },
      icon: '🖼️',
      durationMinutes: 4,
      points: 20,
      type: 'copy_or_create',
      gameData: {
        type: 'mc',
        title: 'Posso usar esta imagem?',
        icon: '🖼️',
        xp: 20,
        desc: 'Responde às perguntas sobre a utilização legítima de fotografias e textos.',
        data: {
          questions: [
            {
              q: 'O que deves fazer se quiseres incluir uma fotografia fantástica encontrada num site num trabalho escolar?',
              opts: [
                'Pedir autorização ao autor ou usar imagens com licença Creative Commons indicando a fonte',
                'Descarregar sem dizer nada e fingir que foste tu a tirar a foto',
                'Apagar a imagem e não colocar ilustrações no trabalho',
                'Mudar a cor da foto para ninguém reconhecer'
              ],
              c: 0,
              e: 'Citar sempre o autor e verificar a licença garante o respeito pelos direitos de criação.'
            },
            {
              q: 'O que significa a sigla CC-BY numa obra?',
              opts: [
                'Atribuição obrigatória do autor original ao reutilizar',
                'Proibição total de copiar',
                'Compra garantida',
                'Cópia clandestina'
              ],
              c: 0,
              e: 'BY significa "Attribution" (Atribuição) — podes usar se indicares o nome do criador.'
            }
          ]
        }
      }
    },
    {
      id: 'jogo-copy-match',
      themeId: 'direitos-autor',
      number: 3,
      title: { pt: '🔗 Tipo de Licença', en: '🔗 Copyright License Match' },
      shortDesc: { pt: 'Associa cada símbolo Creative Commons à respetiva regra.', en: 'Match each Creative Commons symbol to its rule.' },
      icon: '🔗',
      durationMinutes: 4,
      points: 20,
      type: 'match_pairs',
      gameData: {
        type: 'match',
        title: 'Tipo de Licença',
        icon: '🔗',
        xp: 20,
        desc: 'Associa cada símbolo de licença à sua permissão correta.',
        data: {
          pairs: [
            { left: 'BY (Atribuição)', right: 'Mencionar sempre o autor original' },
            { left: 'NC (Não Comercial)', right: 'Não pode ser usada para fins lucrativos' },
            { left: 'ND (Sem Obras Derivadas)', right: 'Não podes modificar ou alterar a obra' },
            { left: 'SA (Partilha Igual)', right: 'Novas obras devem ter a mesma licença' }
          ]
        }
      }
    },
    {
      id: 'jogo-copy-order',
      themeId: 'direitos-autor',
      number: 4,
      title: { pt: '📦 Como citar corretamente', en: '📦 Proper Citation Order' },
      shortDesc: { pt: 'Ordena os elementos de uma citação bibliográfica escolar.', en: 'Order the elements of a school bibliographic citation.' },
      icon: '📦',
      durationMinutes: 4,
      points: 20,
      type: 'order_sequence',
      gameData: {
        type: 'order',
        title: 'Como citar corretamente',
        icon: '📦',
        xp: 20,
        desc: 'Coloca os dados de uma referência bibliográfica na ordem padrão.',
        data: {
          items: [
            'Nome do autor (Apelido, Nome)',
            'Título da obra ou artigo em itálico',
            'Data de publicação ou consulta',
            'Endereço web (URL) ou editora'
          ]
        }
      }
    },
    {
      id: 'quiz-final-tema6',
      themeId: 'direitos-autor',
      number: 5,
      title: { pt: '🏆 Quiz de Aprendizagem: Direitos de Autor', en: '🏆 Learning Quiz: Copyright' },
      shortDesc: { pt: 'Avaliação final abrangente sobre o Tema 6.', en: 'Comprehensive final assessment on Topic 6.' },
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
        pt: 'O que são Direitos de Autor?',
        en: 'What is Copyright?',
      },
      options: {
        pt: [
          'A proteção legal garantida a quem cria uma obra original intelectual ou artística',
          'Um imposto especial para comprar computadores novos',
          'A permissão para copiar qualquer livro sem autorização',
          'Uma aplicação para editar fotografias no telemóvel',
        ],
        en: [
          'Legal protection granted to creators of original intellectual or artistic works',
          'A special tax on computer hardware',
          'Permission to copy any book freely without consent',
          'A mobile photo editing application',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Os direitos de autor protegem as obras originais e garantem que o esforço do criador é reconhecido.',
        en: 'Copyright protects creators’ intellectual and artistic creations and their right to attribution.',
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
      id: 'copy-q6',
      question: {
        pt: 'O que significa uma obra estar no "Domínio Público"?',
        en: 'What does it mean for a work to be in the "Public Domain"?',
      },
      options: {
        pt: [
          'Que os direitos de autor patrimoniais expiraram (ou foram cedidos) e a obra pode ser usada livremente',
          'Que a obra foi confiscada pela polícia',
          'Que a obra está trancada num museu subterrâneo',
          'Que a obra só pode ser lida em jardins públicos',
        ],
        en: [
          'That economic copyright has expired (or was waived) so the work is free for all to use',
          'That the work was seized by authorities',
          'That it is locked in an underground bunker',
          'That it can only be read in public parks',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Obras no domínio público (como os contos de Hans Christian Andersen ou pinturas de Da Vinci) são património comum.',
        en: 'Public domain works (e.g., Andersen’s fairy tales or Da Vinci paintings) are free cultural heritage.',
      },
    },
    {
      id: 'copy-q7',
      question: {
        pt: 'Qual é a regra quando queres citar uma frase EXATA de um autor no teu trabalho escolar?',
        en: 'What is the rule when you want to quote an author’s EXACT sentence in school work?',
      },
      options: {
        pt: [
          'Colocar a frase entre aspas (" ") e indicar o nome do autor e o livro ou site de onde foi retirada',
          'Escrever a frase em letras garrafais sem aspas dizendo que a inventaste',
          'Mudar a cor da letra para vermelho sem indicar o autor',
          'Não dizer nada a ninguém',
        ],
        en: [
          'Enclose the quote in quotation marks (" ") and cite the author and source details',
          'Write the sentence in all-caps pretending you created it',
          'Change text color to red without attributing the author',
          'Say nothing to anyone',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Usar aspas e identificar o autor é o método correto e respeitoso de fazer uma citação.',
        en: 'Using quotation marks and attributing the source is the accepted ethical standard.',
      },
    },
    {
      id: 'copy-q8',
      question: {
        pt: 'Se tirares uma fotografia com o teu telemóvel a uma paisagem bonita, quem é o dono dos direitos de autor dessa foto?',
        en: 'If you snap a photo of a beautiful landscape with your phone, who owns the copyright?',
      },
      options: {
        pt: [
          'Tu! Tu és o autor da fotografia e os direitos pertencem-te automaticamente',
          'A empresa que fabricou o telemóvel',
          'O dono da montanha fotografada',
          'O presidente da câmara municipal',
        ],
        en: [
          'You! You took the photo and copyright belongs to you automatically',
          'The smartphone manufacturer',
          'The owner of the photographed mountain',
          'The local city mayor',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Quem cria a obra é o seu autor original e titular dos direitos.',
        en: 'The creator of an original photograph automatically holds copyright ownership.',
      },
    },
    {
      id: 'copy-q9',
      question: {
        pt: 'O que significa a sigla "NC" numa licença Creative Commons?',
        en: 'What does the "NC" acronym indicate in a Creative Commons license?',
      },
      options: {
        pt: [
          'Não Comercial (Non-Commercial) — a obra não pode ser utilizada com fins lucrativos de venda',
          'Não Copiar nunca',
          'Novo Conteúdo escolar',
          'Número de Contacto obrigatório',
        ],
        en: [
          'Non-Commercial — the work cannot be used for commercial profit or sale',
          'Never Copy',
          'New Classroom Content',
          'Necessary Contact number',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A cláusula NC proíbe a exploração comercial da obra por terceiros.',
        en: 'The NC clause restricts commercial exploitation of the licensed work.',
      },
    },
    {
      id: 'copy-q10',
      question: {
        pt: 'Copiar um trabalho feito por um colega no ano anterior e entregá-lo com o teu nome é considerado:',
        en: 'Submitting a project made by an older peer as your own work is considered:',
      },
      options: {
        pt: [
          'Plágio e fraude académica, com direito a penalização na nota e processo disciplinar',
          'Uma atitude muito inteligente para poupar tempo',
          'Uma boa ideia recomendada pelos professores',
          'Trabalho de equipa à distância',
        ],
        en: [
          'Plagiarism and academic fraud, leading to grade penalties and disciplinary measures',
          'A clever time-saving technique',
          'A practice endorsed by teachers',
          'Remote asynchronous teamwork',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Entregar o trabalho de outro como se fosse teu constitui plágio e viola a integridade escolar.',
        en: 'Submitting another’s work constitutes severe academic dishonesty.',
      },
    },
    {
      id: 'copy-q11',
      question: {
        pt: 'Onde podes encontrar imagens gratuitas de utilização livre para os teus trabalhos da escola?',
        en: 'Where can you find free open-licensed images for your school assignments?',
      },
      options: {
        pt: [
          'Em bancos de imagens livres como Wikimedia Commons, Pixabay ou Unsplash',
          'Em sites piratas cheios de vírus e pop-ups',
          'Tirando capturas de ecrã das redes sociais de desconhecidos',
          'Comprando fotografias roubadas',
        ],
        en: [
          'In open repositories like Wikimedia Commons, Pixabay, or Unsplash',
          'On suspicious piracy portals full of viruses',
          'Taking screenshots of strangers’ personal social accounts',
          'Purchasing stolen photographs',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Repositórios como o Wikimedia Commons disponibilizam imagens com licenças abertas para educação.',
        en: 'Platforms like Wikimedia Commons curate media under permissive educational licenses.',
      },
    },
    {
      id: 'copy-q12',
      question: {
        pt: 'Porque é importante dar crédito aos autores quando usamos o seu trabalho?',
        en: 'Why is it important to credit creators when using their work?',
      },
      options: {
        pt: [
          'Porque valoriza o esforço do criador, cumpre a lei e demonstra honestidade e rigor no nosso trabalho',
          'Porque o computador bloqueia se não escreveres o nome do autor',
          'Para o trabalho ficar com mais páginas para imprimir',
          'Não tem qualquer importância real',
        ],
        en: [
          'Because it honors creator effort, respects the law, and proves academic honesty',
          'Because the computer crashes if author names are missing',
          'To inflate the page count for printing',
          'It has no genuine value',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Dar crédito demonstra respeito ético e valoriza o trabalho intelectual de quem criou.',
        en: 'Attribution reflects ethical digital citizenship and intellectual integrity.',
      },
    },
    {
      id: 'copy-q13',
      question: {
        pt: 'Se fizeres um desenho inspirado num estilo de um pintor famoso, isso é plágio?',
        en: 'If you draw an illustration inspired by a famous painter’s style, is that plagiarism?',
      },
      options: {
        pt: [
          'Não! Inspirar-se no estilo ou na técnica é perfeitamente legítimo, desde que a obra seja criada por ti',
          'Sim, é crime desenhar com cores parecidas',
          'Sim, tens de pagar ao pintor antes de pegar nos lápis',
          'Não podes fazer desenhos nenhuns',
        ],
        en: [
          'No! Being inspired by an artistic style or technique is legitimate, provided your artwork is original',
          'Yes, using similar colors is illegal',
          'Yes, you must pay royalties before holding colored pencils',
          'You are never allowed to make drawings',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'As ideias e estilos não são patenteados; a lei protege a expressão concreta e original da obra.',
        en: 'Ideas, concepts, and general styles are not monopolized; copyright protects concrete original expression.',
      },
    },
    {
      id: 'copy-q14',
      question: {
        pt: 'O que deves colocar por baixo de uma fotografia que utilizas no teu trabalho escolar?',
        en: 'What should you place beneath a photograph used in your school presentation?',
      },
      options: {
        pt: [
          'Uma legenda identificando o autor, o título da imagem e a fonte ou licença',
          'Uma declaração a dizer que a fotografia foi tirada por ti',
          'Uma piada inventada sobre a fotografia',
          'Deixar em branco para ninguém saber de onde veio',
        ],
        en: [
          'A caption identifying author, image title, and source repository or license',
          'A false claim stating you took the picture',
          'A joke about the picture',
          'Leave it blank so nobody knows the origin',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A legenda identifica a proveniência da imagem e cumpre os requisitos de atribuição.',
        en: 'A caption provides clear attribution and documents source provenance.',
      },
    },
    {
      id: 'copy-q15',
      question: {
        pt: 'Fazer o download de jogos ou filmes protegidos através de sites piratas é:',
        en: 'Downloading copyrighted games or movies from pirate sites is:',
      },
      options: {
        pt: [
          'Ilegal, viola os direitos de autor e coloca o teu computador em risco sério de vírus',
          'Um procedimento completamente seguro e incentivado pelas autoridades',
          'A forma correta de apoiar os criadores de jogos',
          'Obrigatório para todos os utilizadores da Internet',
        ],
        en: [
          'Illegal, violates copyright laws, and exposes your computer to serious malware',
          'A completely safe procedure encouraged by authorities',
          'The proper way to support video game studios',
          'Mandatory for all internet users',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'A pirataria prejudica os autores e os ficheiros distribuídos trazem frequentemente malware prejudicial.',
        en: 'Piracy harms content creators and frequently distributes malicious trojans and ransomware.',
      },
    },
    {
      id: 'copy-q16',
      question: {
        pt: 'Qual é o lema do bom cidadão digital em relação aos Direitos de Autor?',
        en: 'What is the motto of a good digital citizen regarding Copyright?',
      },
      options: {
        pt: [
          'Respeitar os criadores, usar recursos livres legalmente, parafrasear e citar sempre as fontes!',
          'Copiar tudo o que encontrar e assinar com o meu nome',
          'Apagar todos os créditos dos autores originais',
          'Nunca ler nenhum livro',
        ],
        en: [
          'Respect creators, use open resources legally, paraphrase, and always credit sources!',
          'Copy everything encountered and sign my own name',
          'Erase author credits everywhere',
          'Never read any book',
        ],
      },
      correctIndex: 0,
      explanation: {
        pt: 'Respeito, uso legal de licenças e citação de fontes são os pilares da cidadania digital.',
        en: 'Respect, lawful reuse, and proper citation are the cornerstones of digital citizenship.',
      },
    },
  ],
};
