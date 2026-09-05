export interface DailyTicFact {
  id: number;
  category: {
    pt: string;
    en: string;
  };
  icon: string;
  badgeColor: string; // Tailwind colors
  title: {
    pt: string;
    en: string;
  };
  teaser: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  whyItMatters: {
    pt: string;
    en: string;
  };
  funFact: {
    pt: string;
    en: string;
  };
}

export const DAILY_TIC_FACTS: DailyTicFact[] = [
  {
    id: 1,
    category: { pt: 'História do Hardware', en: 'Hardware History' },
    icon: '🖱️',
    badgeColor: 'amber',
    title: {
      pt: 'O primeiro rato de computador era de madeira!',
      en: 'The first computer mouse was made of wood!'
    },
    teaser: {
      pt: 'Sabias que o 1.º rato foi inventado em 1964 e era uma caixinha de madeira com uma roda?',
      en: 'Did you know the 1st mouse was invented in 1964 and made of wood?'
    },
    description: {
      pt: 'Em 1964, o cientista Douglas Engelbart construiu o primeiro protótipo de rato no Stanford Research Institute. Era um bloco retangular de madeira com apenas um botão vermelho no topo e duas rodas de metal na parte inferior para detetar o movimento.',
      en: 'In 1964, Douglas Engelbart built the first mouse prototype. It was a wooden box with a single red button and two wheels underneath.'
    },
    whyItMatters: {
      pt: 'Antes do rato, os utilizadores tinham de escrever comandos de texto difíceis para fazer qualquer coisa no computador.',
      en: 'Before the mouse, users had to type complex text commands to do anything on a computer.'
    },
    funFact: {
      pt: 'Chamaram-lhe "rato" porque o cabo que saía da parte traseira parecia a cauda de um ratinho de verdade!',
      en: 'It was called a "mouse" because the cord sticking out the back looked like a real mouse tail!'
    }
  },
  {
    id: 2,
    category: { pt: 'Pioneiros da Programação', en: 'Programming Pioneers' },
    icon: '👩‍💻',
    badgeColor: 'indigo',
    title: {
      pt: 'Ada Lovelace e as origens da programação',
      en: 'Ada Lovelace and the origins of programming'
    },
    teaser: {
      pt: 'Em 1843, Ada Lovelace escreveu um dos primeiros algoritmos destinados a ser processados por uma máquina.',
      en: 'In 1843, Ada Lovelace created an early algorithm designed for a machine.'
    },
    description: {
      pt: 'A matemática britânica Ada Lovelace colaborou com Charles Babbage no projeto da Máquina Analítica. Lovelace publicou notas detalhadas sobre o funcionamento da máquina e incluiu um algoritmo para calcular os números de Bernoulli, sendo amplamente reconhecida como pioneira na história da programação de computadores.',
      en: 'Ada Lovelace collaborated with Charles Babbage on the Analytical Engine, documenting an algorithm to compute Bernoulli numbers.'
    },
    whyItMatters: {
      pt: 'Ada Lovelace compreendeu que as máquinas podiam ir além dos simples cálculos matemáticos e manipular símbolos seguindo instruções lógicas.',
      en: 'Ada Lovelace realized that machines could manipulate symbols through logical step-by-step instructions.'
    },
    funFact: {
      pt: 'Existe uma linguagem de programação com o nome "Ada" criada em sua homenagem!',
      en: 'There is a programming language named "Ada" in her honor!'
    }
  },
  {
    id: 3,
    category: { pt: 'Curiosidades da Informática', en: 'Tech Trivia' },
    icon: '🐛',
    badgeColor: 'emerald',
    title: {
      pt: 'A história da traça encontrada num computador em 1947',
      en: 'The moth found inside a computer in 1947'
    },
    teaser: {
      pt: 'Em 1947, uma equipa encontrou uma traça presa num relé do computador Harvard Mark II.',
      en: 'In 1947, a team found a real moth trapped inside a Harvard Mark II relay.'
    },
    description: {
      pt: 'A palavra "bug" já era usada há muitos anos por engenheiros e inventores (como Thomas Edison) para descrever pequenas falhas mecânicas. Em 1947, a equipa onde trabalhava a cientista Grace Hopper encontrou uma traça física presa num relé eletromecânico e colou-a no diário de bordo com humor, o que ajudou a popularizar a palavra na informática.',
      en: 'Engineers already used the term "bug" for technical glitches. In 1947, Grace Hopper’s team documented a literal moth inside a computer.'
    },
    whyItMatters: {
      pt: 'Hoje chamamos "bug" a um erro ou falha num programa ou sistema informático, e "debugging" (depuração) à procura e correção desses erros.',
      en: 'Today, finding and fixing coding errors is called "debugging".'
    },
    funFact: {
      pt: 'A equipa colou a traça no diário com a anotação bem-humorada: "First actual case of bug being found" (Primeiro caso real de inseto/erro encontrado).',
      en: 'They taped the moth to the logbook with the note: "First actual case of bug being found".'
    }
  },
  {
    id: 4,
    category: { pt: 'Internet e Redes', en: 'Internet & Networks' },
    icon: '🌊',
    badgeColor: 'sky',
    title: {
      pt: 'A maior parte dos dados da Internet atravessa cabos submarinos',
      en: 'Most global Internet data travels through undersea cables'
    },
    teaser: {
      pt: 'Ao contrário do que muitos pensam, grande parte das comunicações internacionais passa por cabos no fundo dos oceanos.',
      en: 'Most international communications travel through undersea fiber-optic cables.'
    },
    description: {
      pt: 'Uma vasta rede de cabos submarinos de fibra ótica atravessa os oceanos e liga os diferentes continentes, permitindo a circulação rápida de dados a nível mundial. Portugal, pela sua posição geográfica estratégica, é um ponto de amarração relevante de cabos que ligam a Europa a outros continentes.',
      en: 'Extensive networks of undersea fiber cables cross the oceans connecting continents at high speed.'
    },
    whyItMatters: {
      pt: 'Os cabos de fibra ótica utilizam feixes de luz para transmitir grandes volumes de dados com grande rapidez e estabilidade.',
      en: 'Fiber optic cables transmit vast amounts of data quickly and reliably.'
    },
    funFact: {
      pt: 'Estes cabos possuem várias camadas de proteção reforçadas para resistir à pressão da água, a correntes marítimas e a impactos de âncoras.',
      en: 'Undersea cables have tough protective armor to withstand oceanic pressure, currents, and ship anchors.'
    }
  },
  {
    id: 5,
    category: { pt: 'Segurança e Passwords', en: 'Security & Passwords' },
    icon: '🔒',
    badgeColor: 'purple',
    title: {
      pt: 'Palavras-passe longas e difíceis de adivinhar protegem melhor as tuas contas',
      en: 'Long, unique passwords protect your accounts much better'
    },
    teaser: {
      pt: 'Combinações curtas ou previsíveis como "123456" são facilmente adivinhadas por programas automáticos.',
      en: 'Short or predictable passwords like "123456" are easily guessed by automated software.'
    },
    description: {
      pt: 'Os computadores conseguem testar milhares de combinações rapidamente. Uma palavra-passe forte deve ser longa, não conter dados pessoais óbvios e, idealmente, combinar diferentes tipos de carateres ou formar uma frase difícil de adivinhar. Lembra-te também de usar palavras-passe diferentes para contas diferentes.',
      en: 'Computers can test thousands of guesses quickly. A strong passphrase should be long, avoid personal details, and be unique across accounts.'
    },
    whyItMatters: {
      pt: 'A tua palavra-passe protege as tuas contas, as tuas conversas, os teus ficheiros escolares e a tua privacidade.',
      en: 'Your password protects your personal accounts and digital privacy.'
    },
    funFact: {
      pt: '"123456", "password" e sequências simples continuam infelizmente entre as escolhas mais comuns e menos seguras.',
      en: '"123456" and "password" remain among the most commonly used and least secure choices.'
    }
  },
  {
    id: 6,
    category: { pt: 'História da Web', en: 'Web History' },
    icon: '🌐',
    badgeColor: 'blue',
    title: {
      pt: 'O primeiro website da história ainda está online e funciona!',
      en: 'The very first website in history is still online today!'
    },
    teaser: {
      pt: 'Criado em 1991 por Tim Berners-Lee, o primeiro site ainda pode ser visitado no CERN.',
      en: 'Created in 1991 by Tim Berners-Lee, the first website is still accessible.'
    },
    description: {
      pt: 'A 6 de agosto de 1991, o cientista britânico Tim Berners-Lee colocou online a primeira página da World Wide Web no seu computador NeXT no laboratório CERN na Suíça. A página explicava o que era a Web e como criar hiperligações.',
      en: 'In 1991, Tim Berners-Lee published the first webpage explaining hypertext and the World Wide Web.'
    },
    whyItMatters: {
      pt: 'Tim Berners-Lee decidiu disponibilizar a Web gratuitamente para toda a humanidade, sem cobrar direitos.',
      en: 'Tim Berners-Lee gave the World Wide Web freely to all humanity.'
    },
    funFact: {
      pt: 'O computador original onde o site nasceu tinha um autocolante colado a dizer: "Esta máquina é um servidor. NÃO DESLIGAR!".',
      en: 'The server computer had a sticker: "This machine is a server. DO NOT POWER DOWN!".'
    }
  },
  {
    id: 7,
    category: { pt: 'Ergonomia e Saúde', en: 'Ergonomics & Health' },
    icon: '👀',
    badgeColor: 'emerald',
    title: {
      pt: 'Conheces a Regra 20-20-20 para proteger os teus olhos?',
      en: 'Do you know the 20-20-20 rule to protect your vision?'
    },
    teaser: {
      pt: 'A cada 20 minutos de ecrã, descansa os olhos olhando para longe durante 20 segundos.',
      en: 'Every 20 minutes, look at something 20 feet away for 20 seconds.'
    },
    description: {
      pt: 'Quando usamos ecrãs durante muito tempo, tendemos a piscar os olhos menos vezes, o que pode provocar cansaço ou secura ocular. Fazer pausas regulares ajuda a descansar a visão. Uma boa recomendação é a cada 20 minutos olhar para um objeto a cerca de 6 metros de distância durante 20 segundos.',
      en: 'When looking at screens for long periods, we tend to blink less frequently, which can cause eye strain. Regular pauses help rest your vision.'
    },
    whyItMatters: {
      pt: 'Relaxa os músculos oculares e ajuda a prevenir o cansaço após períodos de estudo ou utilização do computador.',
      en: 'It relieves eye strain and prevents fatigue during study and computer use.'
    },
    funFact: {
      pt: 'Fazer uma pausa rápida e alongar o pescoço e os ombros também ajuda o teu cérebro a aprender melhor!',
      en: 'Short stretching breaks also boost your focus and memory retention!'
    }
  },
  {
    id: 8,
    category: { pt: 'Origem das Tecnologias', en: 'Tech Origins' },
    icon: '👑',
    badgeColor: 'blue',
    title: {
      pt: 'O Bluetooth tem o nome de um Rei Viking que unia povos!',
      en: 'Bluetooth was named after a Viking King!'
    },
    teaser: {
      pt: 'O rei Harald Blåtand ("Dente Azul") inspirou a tecnologia que une dispositivos sem fios.',
      en: 'King Harald Bluetooth inspired wireless device connection.'
    },
    description: {
      pt: 'Nos anos 1990, engenheiros da Ericsson e Intel queriam criar um padrão de comunicação sem fios de curto alcance. Inspiraram-se no rei viking Harald Blåtand, famoso por unir tribos da Dinamarca e Noruega, tal como o Bluetooth une telemóveis, ratos e auriculares sem cabos.',
      en: 'Engineers named the tech after King Harald Bluetooth who united Nordic tribes, just as Bluetooth unites wireless devices.'
    },
    whyItMatters: {
      pt: 'Permitiu eliminar dezenas de cabos que antes eram obrigatórios para ligar qualquer acessório.',
      en: 'It eliminated messy cables for headphones, keyboards, and controllers.'
    },
    funFact: {
      pt: 'O logótipo do Bluetooth é a sobreposição de duas runas nórdicas antigas: ᚼ (Hagall) e ᛒ (Bjarkan), as iniciais H.B. do rei!',
      en: 'The Bluetooth logo is a combination of the Nordic runes H and B for Harald Bluetooth!'
    }
  },
  {
    id: 9,
    category: { pt: 'Hardware e Evolução', en: 'Hardware Evolution' },
    icon: '💾',
    badgeColor: 'amber',
    title: {
      pt: 'O primeiro disco rígido pesava mais de 1000 quilos!',
      en: 'The first hard drive weighed over 1,000 kilograms!'
    },
    teaser: {
      pt: 'Em 1956, o IBM 305 RAMAC era do tamanho de dois frigoríficos e guardava apenas 5 MB!',
      en: 'In 1956, a 5MB hard drive weighed over a ton and needed a forklift.'
    },
    description: {
      pt: 'O primeiro disco rígido comercial foi lançado pela IBM em 1956. Tinha 50 pratos de metal com 61 cm de diâmetro e precisava de uma sala com ar condicionado dedicada. Conseguia armazenar 5 Megabytes — o que hoje mal chega para uma fotografia de boa qualidade!',
      en: 'The 1956 IBM RAMAC stored only 5MB across 50 huge discs and weighed more than a ton.'
    },
    whyItMatters: {
      pt: 'Hoje, um cartão de memória MicroSD do tamanho da tua unha pode guardar 1 Terabyte (1.000.000 MB), ou seja, 200.000 vezes mais dados!',
      en: 'Today a tiny MicroSD card holds millions of times more data in fingernail size.'
    },
    funFact: {
      pt: 'Para transportar o disco da IBM na época era preciso alugar um avião de carga e um empilhador!',
      en: 'Transporting it required a dedicated cargo plane and a forklift!'
    }
  },
  {
    id: 10,
    category: { pt: 'Comunicação Digital', en: 'Digital Communication' },
    icon: '✉️',
    badgeColor: 'indigo',
    title: {
      pt: 'Porque usamos o símbolo @ no correio eletrónico?',
      en: 'Why do we use the @ symbol in email addresses?'
    },
    teaser: {
      pt: 'Em 1971, Ray Tomlinson escolheu o arroba porque significava "em" ou "no local de".',
      en: 'In 1971, Ray Tomlinson chose @ to mean "user at computer".'
    },
    description: {
      pt: 'Ray Tomlinson inventou o correio eletrónico na rede ARPANET. Ele precisava de um carater do teclado que nunca aparecesse nos nomes das pessoas para separar o "nome do utilizador" do "nome do computador". Escolheu o @ (que em inglês se lê "at", significando "em").',
      en: 'Ray Tomlinson needed a rarely used keyboard symbol to connect username "at" computer location.'
    },
    whyItMatters: {
      pt: 'Permitiu que uma mensagem fosse enviada diretamente para a caixa postal de uma pessoa específica num servidor remoto.',
      en: 'It standardizes how billions of emails find the exact recipient mailbox worldwide.'
    },
    funFact: {
      pt: 'Em Portugal chamamos "arroba", mas em Itália chamam-lhe "chiocciola" (caracol) e em hebraico chamam-lhe "strudel" (bolo enrolado)!',
      en: 'In Italy they call @ "little snail", in Sweden "elephant trunk", and in Hebrew "strudel"!'
    }
  },
  {
    id: 11,
    category: { pt: 'Direitos de Autor & Criatividade', en: 'Copyright & Creativity' },
    icon: '🎨',
    badgeColor: 'pink',
    title: {
      pt: 'Imagens no Google não são gratuitas: procura por Creative Commons!',
      en: 'Google images are not free by default: use Creative Commons!'
    },
    teaser: {
      pt: 'Tirar uma foto do Google para um trabalho pode violar a lei de Direitos de Autor.',
      en: 'Using copyrighted images without permission violates creator rights.'
    },
    description: {
      pt: 'Quando um artista, fotógrafo ou autor cria uma obra, ela fica automaticamente protegida por Direitos de Autor (Copyright). Para usar imagens legalmente em trabalhos escolares, devemos procurar conteúdos com licenças Creative Commons (CC) ou de Domínio Público, e sempre indicar a fonte!',
      en: 'Creators hold exclusive copyright rights. Always seek Creative Commons licenses and cite your sources.'
    },
    whyItMatters: {
      pt: 'Respeitar a autoria é uma regra fundamental de Cidadania Digital e honestidade académica.',
      en: 'Respecting authorship is key to ethical digital citizenship.'
    },
    funFact: {
      pt: 'A licença "CC-BY" significa que podes usar a imagem livremente, desde que escrevas o nome do autor original (dar atribuição)!',
      en: 'A CC-BY license lets you freely share and adapt work as long as you credit the original creator!'
    }
  },
  {
    id: 12,
    category: { pt: 'Teclados e Escrita', en: 'Keyboards & Typing' },
    icon: '⌨️',
    badgeColor: 'slate',
    title: {
      pt: 'A barra de espaço é a tecla mais utilizada num teclado',
      en: 'The Spacebar is the most frequently used key on a keyboard'
    },
    teaser: {
      pt: 'É habitualmente a tecla mais longa e mais premida em qualquer teclado.',
      en: 'The spacebar is typically the longest and most frequently pressed key.'
    },
    description: {
      pt: 'Como quase todas as palavras na escrita humana precisam de um espaço para serem separadas, a barra de espaço é a peça mais ativa do teclado. Foi desenhada com um formato grande para ser fácil de premir com qualquer um dos polegares.',
      en: 'Because written words need spaces to be separated, the spacebar is the most active key. It is designed wide to be easily pressed with either thumb.'
    },
    whyItMatters: {
      pt: 'Na escrita correta com as duas mãos (digitação), a barra de espaço é premida com os polegares, permitindo que os outros dedos fiquem livres para as restantes teclas.',
      en: 'Proper touch typing uses the thumbs on the spacebar while keeping other fingers positioned on the keys.'
    },
    funFact: {
      pt: 'Em muitos videojogos (como Roblox e Minecraft), a barra de espaço foi adotada como a tecla universal de Saltar!',
      en: 'In most PC video games like Minecraft and Roblox, Spacebar is the universal Jump key!'
    }
  },
  {
    id: 13,
    category: { pt: 'Segurança Online', en: 'Online Safety' },
    icon: '🕵️',
    badgeColor: 'rose',
    title: {
      pt: 'Cuidado com o Phishing: os bancos e jogos nunca te pedem a password!',
      en: 'Beware of Phishing: real services never ask for your password!'
    },
    teaser: {
      pt: '"Phishing" vem da palavra inglesa "pescar" (fishing): é uma armadilha para roubar contas.',
      en: 'Phishing tricks you into handing over credentials on fake lookalike sites.'
    },
    description: {
      pt: 'O Phishing acontece quando criminosos enviam mensagens falsas (por email, WhatsApp ou chat de jogos como Roblox ou Fortnite) fingindo ser empresas oficiais ou a oferecer "Robux / moedas grátis", com links para páginas clonadas que roubam a tua conta.',
      en: 'Scammers create counterfeit login screens promising free game items to steal account logins.'
    },
    whyItMatters: {
      pt: 'Nunca deves clicar em links estranhos nem introduzir as tuas credenciais sem verificar o endereço do site (URL).',
      en: 'Never enter your credentials on suspicious links or popups.'
    },
    funFact: {
      pt: 'Se uma mensagem disser "Ganhaste um prémio urgente! Clica já aqui!", 99.9% das vezes é uma tentativa de burla!',
      en: 'If a message claims "Urgent! Claim free prize now!", it is almost certainly a scam!'
    }
  },
  {
    id: 14,
    category: { pt: 'História dos Emojis', en: 'Emoji History' },
    icon: '😀',
    badgeColor: 'amber',
    title: {
      pt: 'Os primeiros emojis tinham apenas 12 por 12 píxeis!',
      en: 'The first emojis were tiny 12x12 pixel grids!'
    },
    teaser: {
      pt: 'Criados no Japão em 1999 por Shigetaka Kurita para mensagens rápidas em telemóveis.',
      en: 'Created in Japan in 1999, the first set contained 176 simple icons.'
    },
    description: {
      pt: 'A palavra japonesa "Emoji" junta "E" (imagem) + "Moji" (carater/letra). Shigetaka Kurita desenhou 176 ícones simples a preto e branco para ajudar as pessoas a expressar emoções em mensagens de texto curtas sem gastar muitos carateres.',
      en: 'Shigetaka Kurita created 176 emojis in Japan to express emotions in short SMS text messages.'
    },
    whyItMatters: {
      pt: 'Hoje existem mais de 3.600 emojis oficiais regulados pelo consórcio Unicode em todo o mundo.',
      en: 'Unicode now standardizes thousands of emojis seen on billions of screens.'
    },
    funFact: {
      pt: 'O conjunto original dos primeiros 176 emojis está em exposição permanente no famoso Museu de Arte Moderna (MoMA) de Nova Iorque!',
      en: 'The original 1999 emoji set is on display at the Museum of Modern Art (MoMA) in New York!'
    }
  },
  {
    id: 15,
    category: { pt: 'Inteligência Artificial', en: 'Artificial Intelligence' },
    icon: '🤖',
    badgeColor: 'violet',
    title: {
      pt: 'A IA não tem sentimentos nem pensa: ela prevê a próxima palavra!',
      en: 'AI doesn’t think like a human: it predicts the next most likely word!'
    },
    teaser: {
      pt: 'Modelos de linguagem como o Gemini usam matemática e probabilidades com base em milhões de textos.',
      en: 'Large language models use math and patterns from billions of text examples.'
    },
    description: {
      pt: 'Os computadores não compreendem o mundo como os seres humanos. Quando a IA gera uma resposta inteligente, ela usa redes neuronais artificiais para calcular qual é a palavra mais lógica e provável que deve vir a seguir com base no treino que recebeu.',
      en: 'AI uses mathematical neural networks to predict words and patterns based on its training data.'
    },
    whyItMatters: {
      pt: 'Por isso é tão importante que os alunos e professores revejam sempre os textos e verifiquem se as fontes são verdadeiras!',
      en: 'That’s why humans must always fact-check and verify AI-generated answers!'
    },
    funFact: {
      pt: 'O teste clássico para saber se uma máquina consegue conversar como um humano chama-se "Teste de Turing", proposto por Alan Turing em 1950!',
      en: 'Alan Turing created the famous "Turing Test" in 1950 to evaluate machine conversational intelligence!'
    }
  },
  {
    id: 16,
    category: { pt: 'Cidadania Digital & Segurança', en: 'Digital Citizenship & Safety' },
    icon: '🛡️',
    badgeColor: 'rose',
    title: {
      pt: 'Stop Cyberbullying: A Linha Internet Segura em Portugal!',
      en: 'Stop Cyberbullying: The Internet Segura Toll-Free Helpline in Portugal!'
    },
    teaser: {
      pt: 'Existe uma linha gratuita (800 21 90 90) para ajudar jovens e famílias em situações de cyberbullying.',
      en: 'There is a free confidential helpline (800 21 90 90) supporting youth with online harassment.'
    },
    description: {
      pt: 'O cyberbullying acontece quando alguém usa a Internet, telemóveis ou jogos para ameaçar, humilhar, gozar ou excluir intencionalmente outra pessoa. Em Portugal, a Linha Internet Segura (800 21 90 90) e a Linha SOS Criança (116 111) são gratuitas, confidenciais e estão sempre prontas para ajudar!',
      en: 'Cyberbullying happens when technology is used to harass, humiliate, or exclude peers. The Internet Segura helpline (800 21 90 90) and SOS Criança (116 111) offer free, confidential guidance.'
    },
    whyItMatters: {
      pt: 'Se fores vítima ou testemunha de cyberbullying: não respondas ao agressor, guarda provas (printscreen), bloqueia o contacto e pede ajuda a um adulto de confiança.',
      en: 'If you witness cyberbullying: do not retaliate, take screenshots as evidence, block the sender, and tell a trusted adult.'
    },
    funFact: {
      pt: 'A regra de ouro da cidadania digital é a empatia: nunca digas ou partilhes algo online que não dirias cara a cara com gentileza!',
      en: 'The golden rule of digital citizenship is empathy: never say or share anything online that you wouldn’t say kindly in person!'
    }
  },
  {
    id: 17,
    category: { pt: 'Bem-Estar & Saúde Digital', en: 'Well-being & Digital Health' },
    icon: '🌙',
    badgeColor: 'amber',
    title: {
      pt: 'Evita o uso de ecrãs antes de dormir para um descanso de qualidade',
      en: 'Avoid screens before bed for quality sleep'
    },
    teaser: {
      pt: 'A luminosidade dos dispositivos e a estimulação mental podem atrasar o sono.',
      en: 'Screen brightness and mental stimulation can delay sleep.'
    },
    description: {
      pt: 'A luz emitida pelos ecrãs, combinada com a estimulação mental de jogos, vídeos e conversas, pode atrasar a sensação de sono e dificultar o descanso noturno. Desligar os dispositivos algum tempo antes de deitar ajuda o corpo e a mente a relaxar.',
      en: 'Screen light combined with mental stimulation from games and videos can delay sleepiness. Turning off devices before bed helps body and mind relax.'
    },
    whyItMatters: {
      pt: 'Um sono de qualidade (cerca de 9 a 10 horas) é essencial para a concentração, para a memória e para o bem-estar durante as aulas no 5.º ano.',
      en: 'Quality sleep is essential for concentration, memory, and daytime well-being.'
    },
    funFact: {
      pt: 'Trocar o ecrã por um livro ou por uma conversa tranquila antes de deitar é uma excelente forma de preparar uma boa noite de sono.',
      en: 'Replacing screen time with reading a book or relaxing conversation prepares for a restful night.'
    }
  }
];

/**
 * Helper to get the curated fact of the day based on the current date
 */
export function getDailyTicFact(date = new Date()): DailyTicFact {
  // Day of year calculation (1 - 366)
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = Math.abs(dayOfYear) % DAILY_TIC_FACTS.length;
  return DAILY_TIC_FACTS[index];
}

export function getTodayDateString(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
