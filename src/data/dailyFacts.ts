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
      pt: 'A primeira pessoa a programar foi uma mulher: Ada Lovelace!',
      en: 'The world’s first programmer was a woman: Ada Lovelace!'
    },
    teaser: {
      pt: 'Em 1843, Ada Lovelace escreveu o primeiro algoritmo para ser processado por uma máquina.',
      en: 'In 1843, Ada Lovelace created the first algorithm for a machine.'
    },
    description: {
      pt: 'A matemática britânica Ada Lovelace colaborou com Charles Babbage no projeto da "Máquina Analítica". Ela percebeu que a máquina podia não apenas fazer contas, mas manipular símbolos, música e textos através de instruções lógicas passo a passo.',
      en: 'Ada Lovelace realized that machines could manipulate symbols and music through logical instructions.'
    },
    whyItMatters: {
      pt: 'Ada Lovelace é considerada a mãe da programação e inspirou toda a ciência de computadores moderna.',
      en: 'Ada Lovelace is recognized as the mother of computer programming.'
    },
    funFact: {
      pt: 'Existe uma linguagem de programação militar e aeroespacial de topo chamada "Ada" em sua honra!',
      en: 'There is a renowned programming language named "Ada" in her honor!'
    }
  },
  {
    id: 3,
    category: { pt: 'Curiosidades da Informática', en: 'Tech Trivia' },
    icon: '🐛',
    badgeColor: 'emerald',
    title: {
      pt: 'O primeiro "Bug" informático era um inseto de verdade!',
      en: 'The very first computer "Bug" was a real moth!'
    },
    teaser: {
      pt: 'Em 1947, uma traça ficou presa num computador gigante e causou uma falha!',
      en: 'In 1947, a moth got trapped inside a giant computer relay!'
    },
    description: {
      pt: 'Quando a cientista pioneira Grace Hopper estava a trabalhar no computador Mark II da Universidade de Harvard, a máquina começou a dar erros. Ao abrirem os componentes, encontraram uma traça presa num relé eletromecânico.',
      en: 'Grace Hopper found a real moth trapped inside a Harvard Mark II relay causing errors.'
    },
    whyItMatters: {
      pt: 'Desde esse dia, procurar e corrigir erros no código de programação chama-se "Debugging" (desparasitar ou depurar).',
      en: 'Ever since, finding and fixing coding errors is called "Debugging".'
    },
    funFact: {
      pt: 'A equipa colou a traça no diário de bordo oficial com a nota: "First actual case of bug being found" (Primeiro caso real de inseto/erro encontrado).',
      en: 'They taped the moth to the logbook with the note: "First actual case of bug being found".'
    }
  },
  {
    id: 4,
    category: { pt: 'Internet e Redes', en: 'Internet & Networks' },
    icon: '🌊',
    badgeColor: 'sky',
    title: {
      pt: 'Mais de 95% da Internet mundial passa debaixo do mar!',
      en: 'Over 95% of global Internet travels through underwater cables!'
    },
    teaser: {
      pt: 'Não são satélites no espaço! São cabos de fibra ótica gigantes no fundo dos oceanos.',
      en: 'Not satellites! Deep undersea fiber-optic cables power global Internet.'
    },
    description: {
      pt: 'Milhões de quilómetros de cabos submarinos de fibra ótica cruzam todos os oceanos do planeta Terra. Portugal (especialmente Carcavelos e Sines) é um dos maiores pontos de amarração estratégica de cabos que ligam a Europa à América e África!',
      en: 'Millions of kilometers of undersea fiber cables cross the oceans connecting continents at the speed of light.'
    },
    whyItMatters: {
      pt: 'A luz laser dentro dos fios de vidro de fibra ótica transmite dados com velocidade ultrarrápida e quase sem atraso.',
      en: 'Fiber optic light transmits terabits of data per second with ultra-low latency.'
    },
    funFact: {
      pt: 'Os cabos submarinos têm várias camadas de aço e proteção para evitar que tubarões ou âncoras de navios os danifiquem!',
      en: 'Undersea cables have armor layers to protect against shark bites and ship anchors!'
    }
  },
  {
    id: 5,
    category: { pt: 'Segurança e Passwords', en: 'Security & Passwords' },
    icon: '🔒',
    badgeColor: 'purple',
    title: {
      pt: 'Uma palavra-passe curta de 6 números é decifrada em menos de 1 segundo!',
      en: 'A 6-digit password can be cracked in less than 1 second!'
    },
    teaser: {
      pt: 'Passwords como "123456" são um convite aberto para cibercriminosos.',
      en: 'Weak passwords like "123456" are cracked instantly by computers.'
    },
    description: {
      pt: 'Os computadores conseguem testar biliões de combinações num piscar de olhos. Uma password fraca é descoberta instantaneamente, mas se usares uma "Frase-passe" com mais de 12 carateres (letras maiúsculas, minúsculas, números e símbolos), um computador demoraria mais de 1000 anos a decifrar!',
      en: 'Computers test billions of combinations. A passphrase with 12+ characters can take centuries to crack.'
    },
    whyItMatters: {
      pt: 'A tua palavra-passe é a chave da tua identidade digital: protege os teus jogos, redes e trabalhos escolares.',
      en: 'Your password protects your personal accounts and digital privacy.'
    },
    funFact: {
      pt: '"123456", "password" e "admin" continuam no topo das passwords mais usadas no mundo!',
      en: '"123456" and "password" are still the most commonly leaked weak passwords worldwide!'
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
      pt: 'Quando olhamos para ecrãs de computadores ou telemóveis, piscamos os olhos metade das vezes normais, o que provoca cansaço e secura ocular. Os médicos recomendam: a cada 20 minutos de ecrã, olhar para um objeto a pelo menos 6 metros de distância durante 20 segundos.',
      en: 'We blink 50% less when looking at screens. Rest your eye muscles with the 20-20-20 rule (look 6 meters away for 20 seconds).'
    },
    whyItMatters: {
      pt: 'Relaxa os pequenos músculos oculares e evita dores de cabeça após o estudo ou jogos no computador.',
      en: 'It relieves eye strain and prevents headaches during study and gaming.'
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
      pt: 'A tecla de Espaço é premida 6 milhões de vezes por segundo no mundo!',
      en: 'The Spacebar is pressed 6 million times every second worldwide!'
    },
    teaser: {
      pt: 'É de longe a tecla mais longa e mais usada de todo o teclado do computador.',
      en: 'The spacebar is by far the most frequently used key on Earth.'
    },
    description: {
      pt: 'Como quase todas as palavras na escrita humana precisam de um espaço para serem separadas, a barra de espaço é a peça mais ativa do teclado. Foi desenhada com um formato grande para ser fácil de premir com qualquer um dos polegares.',
      en: 'Because human language separates words with spaces, the thumb spacebar is pressed constantly.'
    },
    whyItMatters: {
      pt: 'Na dactilografia correta com os 10 dedos, deves usar sempre o polegar da mão dominante para o espaço.',
      en: 'Proper touch typing uses the thumb on the spacebar while keeping hands rested on home row.'
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
      pt: 'Desliga os ecrãs 1 hora antes de dormir para um sono perfeito!',
      en: 'Turn off screens 1 hour before bed for restful sleep!'
    },
    teaser: {
      pt: 'A luz azul emitida por telemóveis e computadores confunde o cérebro e rouba energia.',
      en: 'Blue light from screens delays melatonin and impacts sleep quality.'
    },
    description: {
      pt: 'Os nossos olhos têm sensores sensíveis à luz azul que avisam o cérebro quando é dia. Quando olhamos para telemóveis ou tablets na cama à noite, o cérebro atrasa a produção de melatonina (a hormona do sono), dificultando o adormecer e deixando-nos cansados na escola no dia seguinte.',
      en: 'Our eyes perceive screen blue light as daylight. Using devices in bed blocks melatonin, disrupting restful sleep cycles.'
    },
    whyItMatters: {
      pt: 'Desligar os aparelhos 60 minutos antes de deitar e trocar por um livro ou conversa melhora a memória, a concentração e a boa disposição.',
      en: 'Switching off devices 60 minutes before bedtime and reading a book enhances memory, focus, and mood.'
    },
    funFact: {
      pt: 'Dormir entre 9 a 10 horas por noite é o superpoder dos alunos do 5.º ano para consolidar tudo o que aprenderam durante o dia!',
      en: 'Sleeping 9 to 10 hours a night is a superpower for 5th graders to consolidate everything learned during the day!'
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
