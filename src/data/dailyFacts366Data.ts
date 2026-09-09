/**
 * COMPREHENSIVE 366-DAY TIC CURRICULUM DATABASE
 * Contains a unique, curated, fun, and educational fact for EVERY single day of the year (Days 1 to 366, including Feb 29 for leap years).
 * Thoroughly distributed across the 7 official themes of TIC (5th grade).
 */

export interface DailyTicFact366 {
  id: number;
  dayOfYear: number; // 1 to 366
  month: number;     // 1 to 12
  day: number;       // 1 to 31
  dateLabel: {
    pt: string;
    en: string;
  };
  themeId: string;
  themeNumber: number;
  themeTitle: {
    pt: string;
    en: string;
  };
  themeIcon: string;
  badgeColor: string;
  category: {
    pt: string;
    en: string;
  };
  icon: string;
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
  isSpecialMilestone?: boolean;
}

export const THEME_METADATA_366 = [
  {
    "id": "tic-sociedade",
    "number": 1,
    "title": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "icon": "🌍",
    "badgeColor": "indigo"
  },
  {
    "id": "ergonomia",
    "number": 2,
    "title": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "icon": "🧘‍♂️",
    "badgeColor": "emerald"
  },
  {
    "id": "seguranca",
    "number": 3,
    "title": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "icon": "🛡️",
    "badgeColor": "rose"
  },
  {
    "id": "palavras-passe",
    "number": 4,
    "title": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "icon": "🔑",
    "badgeColor": "amber"
  },
  {
    "id": "correio-eletronico",
    "number": 5,
    "title": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "icon": "✉️",
    "badgeColor": "sky"
  },
  {
    "id": "navegar-internet",
    "number": 6,
    "title": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "icon": "🌐",
    "badgeColor": "blue"
  },
  {
    "id": "direitos-autor",
    "number": 7,
    "title": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "icon": "⚖️",
    "badgeColor": "purple"
  }
];

export const ALL_366_FACTS: DailyTicFact366[] = [
  {
    "id": 1,
    "dayOfYear": 1,
    "month": 1,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Janeiro",
      "en": "January 1"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História das Telecomunicações",
      "en": "Telecom History"
    },
    "icon": "👑",
    "title": {
      "pt": "A Rainha Isabel II foi a primeira monarca a enviar um email!",
      "en": "Queen Elizabeth II was the first monarch to send an email!"
    },
    "teaser": {
      "pt": "Em 1976, a Rainha da Grã-Bretanha enviou uma mensagem pela rede militar ARPANET.",
      "en": "In 1976, the Queen sent a message via the military ARPANET network."
    },
    "description": {
      "pt": "A 26 de março de 1976, a Rainha Isabel II visitou um centro de telecomunicações militares em Malvern e enviou um email oficial pela ARPANET com o nome de utilizador \"HME2\" (Her Majesty Elizabeth II).",
      "en": "Queen Elizabeth II sent an email via ARPANET in 1976 under username \"HME2\"."
    },
    "whyItMatters": {
      "pt": "No Tema 1 de TIC estudamos como as redes de computadores nasceram nos laboratórios científicos e militares antes de chegarem às nossas casas.",
      "en": "In ICT Topic 1 we learn how networks started in research labs before entering every home."
    },
    "funFact": {
      "pt": "Ela carregou apenas no botão \"Send\" num terminal militar após os engenheiros terem preparado a mensagem!",
      "en": "She just pressed the \"Send\" button on a military terminal after engineers set it up!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 2,
    "dayOfYear": 2,
    "month": 1,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Janeiro",
      "en": "January 2"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Postura na Cadeira",
      "en": "Postura na Cadeira"
    },
    "icon": "🪑",
    "title": {
      "pt": "A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!",
      "en": "A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!"
    },
    "teaser": {
      "pt": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?",
      "en": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?"
    },
    "description": {
      "pt": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares.",
      "en": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares."
    },
    "whyItMatters": {
      "pt": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito.",
      "en": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito."
    },
    "funFact": {
      "pt": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!",
      "en": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 3,
    "dayOfYear": 3,
    "month": 1,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Janeiro",
      "en": "January 3"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Pegada Digital",
      "en": "Pegada Digital"
    },
    "icon": "👣",
    "title": {
      "pt": "A tua Pegada Digital é como uma pegada no cimento fresco!",
      "en": "A tua Pegada Digital é como uma pegada no cimento fresco!"
    },
    "teaser": {
      "pt": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura.",
      "en": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura."
    },
    "description": {
      "pt": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes.",
      "en": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online.",
      "en": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online."
    },
    "funFact": {
      "pt": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!",
      "en": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 4,
    "dayOfYear": 4,
    "month": 1,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Janeiro",
      "en": "January 4"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Força de Senhas",
      "en": "Força de Senhas"
    },
    "icon": "⚡",
    "title": {
      "pt": "A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!",
      "en": "A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!"
    },
    "teaser": {
      "pt": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!",
      "en": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!"
    },
    "description": {
      "pt": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores.",
      "en": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores."
    },
    "whyItMatters": {
      "pt": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares.",
      "en": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares."
    },
    "funFact": {
      "pt": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!",
      "en": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 5,
    "dayOfYear": 5,
    "month": 1,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Janeiro",
      "en": "January 5"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Campos do Email",
      "en": "Campos do Email"
    },
    "icon": "🕶️",
    "title": {
      "pt": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!",
      "en": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!"
    },
    "teaser": {
      "pt": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!",
      "en": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!"
    },
    "description": {
      "pt": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados.",
      "en": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados."
    },
    "whyItMatters": {
      "pt": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD.",
      "en": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD."
    },
    "funFact": {
      "pt": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!",
      "en": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 6,
    "dayOfYear": 6,
    "month": 1,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Janeiro",
      "en": "January 6"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Navegador vs Motor",
      "en": "Navegador vs Motor"
    },
    "icon": "🚗",
    "title": {
      "pt": "O Navegador é o Automóvel, o Motor de Busca é o GPS!",
      "en": "O Navegador é o Automóvel, o Motor de Busca é o GPS!"
    },
    "teaser": {
      "pt": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?",
      "en": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?"
    },
    "description": {
      "pt": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas.",
      "en": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas."
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca.",
      "en": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca."
    },
    "funFact": {
      "pt": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!",
      "en": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 7,
    "dayOfYear": 7,
    "month": 1,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Janeiro",
      "en": "January 7"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Google Imagens",
      "en": "Google Imagens"
    },
    "icon": "🎨",
    "title": {
      "pt": "As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!",
      "en": "As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!"
    },
    "teaser": {
      "pt": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei.",
      "en": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei."
    },
    "description": {
      "pt": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público.",
      "en": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público."
    },
    "whyItMatters": {
      "pt": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas.",
      "en": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas."
    },
    "funFact": {
      "pt": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!",
      "en": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 8,
    "dayOfYear": 8,
    "month": 1,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Janeiro",
      "en": "January 8"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Memória do Computador",
      "en": "Memória do Computador"
    },
    "icon": "⚡",
    "title": {
      "pt": "Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!",
      "en": "Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?",
      "en": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?"
    },
    "description": {
      "pt": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!",
      "en": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!"
    },
    "whyItMatters": {
      "pt": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC.",
      "en": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC."
    },
    "funFact": {
      "pt": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!",
      "en": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 9,
    "dayOfYear": 9,
    "month": 1,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Janeiro",
      "en": "January 9"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Evolução do Hardware",
      "en": "Hardware Evolution"
    },
    "icon": "📱",
    "title": {
      "pt": "O dia em que o telemóvel virou computador de bolso!",
      "en": "The day phones turned into pocket computers!"
    },
    "teaser": {
      "pt": "A 9 de janeiro de 2007 foi apresentado o primeiro smartphone moderno com ecrã multitoque.",
      "en": "On Jan 9, 2007, the first modern multitouch smartphone was revealed."
    },
    "description": {
      "pt": "Antes de 2007, a maioria dos telemóveis tinha botões minúsculos de plástico e ecrãs pequenos. A chegada do ecrã de vidro multitoque revolucionou a forma como acedemos à Internet, jogos e trabalhos em qualquer lugar.",
      "en": "Multitouch screens revolutionized how we access the Web, games, and schoolwork everywhere."
    },
    "whyItMatters": {
      "pt": "Hoje o smartphone é um computador completo de bolso: tem CPU, memória RAM, câmara e sensores GPS.",
      "en": "Smartphones are complete computers with CPU, RAM, camera, and GPS."
    },
    "funFact": {
      "pt": "O primeiro iPhone não tinha sequer opção de \"Copiar e Colar\" texto! Essa função só chegou anos mais tarde!",
      "en": "The first iPhone did not even have a \"Copy and Paste\" feature!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 10,
    "dayOfYear": 10,
    "month": 1,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Janeiro",
      "en": "January 10"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Privacidade e Redes",
      "en": "Privacidade e Redes"
    },
    "icon": "🕵️‍♂️",
    "title": {
      "pt": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!",
      "en": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!"
    },
    "teaser": {
      "pt": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa.",
      "en": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa."
    },
    "description": {
      "pt": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online.",
      "en": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online."
    },
    "whyItMatters": {
      "pt": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital.",
      "en": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital."
    },
    "funFact": {
      "pt": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!",
      "en": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 11,
    "dayOfYear": 11,
    "month": 1,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Janeiro",
      "en": "January 11"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "O Segredo da Frase-Passe",
      "en": "O Segredo da Frase-Passe"
    },
    "icon": "🍕",
    "title": {
      "pt": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!",
      "en": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!"
    },
    "teaser": {
      "pt": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar.",
      "en": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar."
    },
    "description": {
      "pt": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!",
      "en": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!"
    },
    "whyItMatters": {
      "pt": "Construção de palavras-passe fortes com base em frases mnemónicas compridas.",
      "en": "Construção de palavras-passe fortes com base em frases mnemónicas compridas."
    },
    "funFact": {
      "pt": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!",
      "en": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 12,
    "dayOfYear": 12,
    "month": 1,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Janeiro",
      "en": "January 12"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Símbolo Arroba",
      "en": "O Símbolo Arroba"
    },
    "icon": "🐌",
    "title": {
      "pt": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!",
      "en": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!"
    },
    "teaser": {
      "pt": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino.",
      "en": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino."
    },
    "description": {
      "pt": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!",
      "en": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!"
    },
    "whyItMatters": {
      "pt": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao.",
      "en": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao."
    },
    "funFact": {
      "pt": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!",
      "en": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 13,
    "dayOfYear": 13,
    "month": 1,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Janeiro",
      "en": "January 13"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Truque das Aspas",
      "en": "Truque das Aspas"
    },
    "icon": "🔍",
    "title": {
      "pt": "Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!",
      "en": "Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!"
    },
    "teaser": {
      "pt": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?",
      "en": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?"
    },
    "description": {
      "pt": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!",
      "en": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!"
    },
    "whyItMatters": {
      "pt": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano.",
      "en": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano."
    },
    "funFact": {
      "pt": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!",
      "en": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 14,
    "dayOfYear": 14,
    "month": 1,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Janeiro",
      "en": "January 14"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "O que é Plágio",
      "en": "O que é Plágio"
    },
    "icon": "✂️",
    "title": {
      "pt": "Plágio: roubar a medalha de ouro de outra pessoa!",
      "en": "Plágio: roubar a medalha de ouro de outra pessoa!"
    },
    "teaser": {
      "pt": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica.",
      "en": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica."
    },
    "description": {
      "pt": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste.",
      "en": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste."
    },
    "whyItMatters": {
      "pt": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano.",
      "en": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano."
    },
    "funFact": {
      "pt": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!",
      "en": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 15,
    "dayOfYear": 15,
    "month": 1,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Janeiro",
      "en": "January 15"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Placa Principal",
      "en": "Placa Principal"
    },
    "icon": "🛣️",
    "title": {
      "pt": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!",
      "en": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!"
    },
    "teaser": {
      "pt": "Como é que a placa gráfica fala com o processador e com o disco rígido?",
      "en": "Como é que a placa gráfica fala com o processador e com o disco rígido?"
    },
    "description": {
      "pt": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI.",
      "en": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus).",
      "en": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus)."
    },
    "funFact": {
      "pt": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!",
      "en": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 16,
    "dayOfYear": 16,
    "month": 1,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Janeiro",
      "en": "January 16"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Sono e Tecnologia",
      "en": "Sono e Tecnologia"
    },
    "icon": "🌙",
    "title": {
      "pt": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\"",
      "en": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\""
    },
    "teaser": {
      "pt": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?",
      "en": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?"
    },
    "description": {
      "pt": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola.",
      "en": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola."
    },
    "whyItMatters": {
      "pt": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias.",
      "en": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias."
    },
    "funFact": {
      "pt": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!",
      "en": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 17,
    "dayOfYear": 17,
    "month": 1,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Janeiro",
      "en": "January 17"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Apoio e Helplines",
      "en": "Apoio e Helplines"
    },
    "icon": "📞",
    "title": {
      "pt": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!",
      "en": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!"
    },
    "teaser": {
      "pt": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar.",
      "en": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar."
    },
    "description": {
      "pt": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!",
      "en": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!"
    },
    "whyItMatters": {
      "pt": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental.",
      "en": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental."
    },
    "funFact": {
      "pt": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!",
      "en": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 18,
    "dayOfYear": 18,
    "month": 1,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Janeiro",
      "en": "January 18"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Partilha de Senhas",
      "en": "Partilha de Senhas"
    },
    "icon": "🪥",
    "title": {
      "pt": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!",
      "en": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!"
    },
    "teaser": {
      "pt": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital.",
      "en": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital."
    },
    "description": {
      "pt": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem.",
      "en": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem."
    },
    "whyItMatters": {
      "pt": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal.",
      "en": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal."
    },
    "funFact": {
      "pt": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!",
      "en": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 19,
    "dayOfYear": 19,
    "month": 1,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Janeiro",
      "en": "January 19"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Netiqueta em Emails",
      "en": "Netiqueta em Emails"
    },
    "icon": "📢",
    "title": {
      "pt": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!",
      "en": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!"
    },
    "teaser": {
      "pt": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais.",
      "en": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais."
    },
    "description": {
      "pt": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã.",
      "en": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã."
    },
    "whyItMatters": {
      "pt": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico.",
      "en": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico."
    },
    "funFact": {
      "pt": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!",
      "en": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 20,
    "dayOfYear": 20,
    "month": 1,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Janeiro",
      "en": "January 20"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Segurança HTTPS",
      "en": "Segurança HTTPS"
    },
    "icon": "🔒",
    "title": {
      "pt": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!",
      "en": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!"
    },
    "teaser": {
      "pt": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\".",
      "en": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\"."
    },
    "description": {
      "pt": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias.",
      "en": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias."
    },
    "whyItMatters": {
      "pt": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC.",
      "en": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC."
    },
    "funFact": {
      "pt": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!",
      "en": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 21,
    "dayOfYear": 21,
    "month": 1,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Janeiro",
      "en": "January 21"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Creative Commons",
      "en": "Creative Commons"
    },
    "icon": "🤝",
    "title": {
      "pt": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!",
      "en": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!"
    },
    "teaser": {
      "pt": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?",
      "en": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?"
    },
    "description": {
      "pt": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\".",
      "en": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\"."
    },
    "whyItMatters": {
      "pt": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7.",
      "en": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7."
    },
    "funFact": {
      "pt": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!",
      "en": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 22,
    "dayOfYear": 22,
    "month": 1,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Janeiro",
      "en": "January 22"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Linguagem dos Computadores",
      "en": "Linguagem dos Computadores"
    },
    "icon": "0️⃣",
    "title": {
      "pt": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!",
      "en": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!"
    },
    "teaser": {
      "pt": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?",
      "en": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?"
    },
    "description": {
      "pt": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!",
      "en": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!"
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte.",
      "en": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte."
    },
    "funFact": {
      "pt": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!",
      "en": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 23,
    "dayOfYear": 23,
    "month": 1,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Janeiro",
      "en": "January 23"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pescoço e Coluna",
      "en": "Pescoço e Coluna"
    },
    "icon": "🦒",
    "title": {
      "pt": "O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!",
      "en": "O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!"
    },
    "teaser": {
      "pt": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento.",
      "en": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento."
    },
    "description": {
      "pt": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!",
      "en": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!"
    },
    "whyItMatters": {
      "pt": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial.",
      "en": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial."
    },
    "funFact": {
      "pt": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!",
      "en": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 24,
    "dayOfYear": 24,
    "month": 1,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Janeiro",
      "en": "January 24"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Netiqueta e Empatia",
      "en": "Netiqueta e Empatia"
    },
    "icon": "💬",
    "title": {
      "pt": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!",
      "en": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!"
    },
    "teaser": {
      "pt": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?",
      "en": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?"
    },
    "description": {
      "pt": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa.",
      "en": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa."
    },
    "whyItMatters": {
      "pt": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano.",
      "en": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano."
    },
    "funFact": {
      "pt": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!",
      "en": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 25,
    "dayOfYear": 25,
    "month": 1,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Janeiro",
      "en": "January 25"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Autenticação de 2 Fatores",
      "en": "Autenticação de 2 Fatores"
    },
    "icon": "📲",
    "title": {
      "pt": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!",
      "en": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!"
    },
    "teaser": {
      "pt": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.",
      "en": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código."
    },
    "description": {
      "pt": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes.",
      "en": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes."
    },
    "whyItMatters": {
      "pt": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC.",
      "en": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC."
    },
    "funFact": {
      "pt": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!",
      "en": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 26,
    "dayOfYear": 26,
    "month": 1,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Janeiro",
      "en": "January 26"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Anexos Perigosos",
      "en": "Anexos Perigosos"
    },
    "icon": "📎",
    "title": {
      "pt": "Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!",
      "en": "Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!"
    },
    "teaser": {
      "pt": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos.",
      "en": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos."
    },
    "description": {
      "pt": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros.",
      "en": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros."
    },
    "whyItMatters": {
      "pt": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC.",
      "en": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC."
    },
    "funFact": {
      "pt": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!",
      "en": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 27,
    "dayOfYear": 27,
    "month": 1,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Janeiro",
      "en": "January 27"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Combate a Fake News",
      "en": "Combate a Fake News"
    },
    "icon": "🕵️‍♀️",
    "title": {
      "pt": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!",
      "en": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!"
    },
    "teaser": {
      "pt": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções.",
      "en": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções."
    },
    "description": {
      "pt": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?",
      "en": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?"
    },
    "whyItMatters": {
      "pt": "Literacia da informação e espírito crítico na avaliação de fontes da Web.",
      "en": "Literacia da informação e espírito crítico na avaliação de fontes da Web."
    },
    "funFact": {
      "pt": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!",
      "en": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 28,
    "dayOfYear": 28,
    "month": 1,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Janeiro",
      "en": "January 28"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação e Bibliografia",
      "en": "Citação e Bibliografia"
    },
    "icon": "📚",
    "title": {
      "pt": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!",
      "en": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!"
    },
    "teaser": {
      "pt": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!",
      "en": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!"
    },
    "description": {
      "pt": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso.",
      "en": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso."
    },
    "whyItMatters": {
      "pt": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC.",
      "en": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC."
    },
    "funFact": {
      "pt": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!",
      "en": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 29,
    "dayOfYear": 29,
    "month": 1,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Janeiro",
      "en": "January 29"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Periféricos de TIC",
      "en": "Periféricos de TIC"
    },
    "icon": "🖨️",
    "title": {
      "pt": "Periféricos: a ponte mágica entre o ser humano e a máquina!",
      "en": "Periféricos: a ponte mágica entre o ser humano e a máquina!"
    },
    "teaser": {
      "pt": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?",
      "en": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?"
    },
    "description": {
      "pt": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!",
      "en": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!"
    },
    "whyItMatters": {
      "pt": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1.",
      "en": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1."
    },
    "funFact": {
      "pt": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!",
      "en": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 30,
    "dayOfYear": 30,
    "month": 1,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Janeiro",
      "en": "January 30"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Volume e Audição",
      "en": "Volume e Audição"
    },
    "icon": "🎧",
    "title": {
      "pt": "A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!",
      "en": "A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!"
    },
    "teaser": {
      "pt": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição.",
      "en": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição."
    },
    "description": {
      "pt": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!",
      "en": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!"
    },
    "whyItMatters": {
      "pt": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC.",
      "en": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC."
    },
    "funFact": {
      "pt": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!",
      "en": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 31,
    "dayOfYear": 31,
    "month": 1,
    "day": 31,
    "dateLabel": {
      "pt": "31 de Janeiro",
      "en": "January 31"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Localização GPS",
      "en": "Localização GPS"
    },
    "icon": "📍",
    "title": {
      "pt": "Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!",
      "en": "Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!"
    },
    "teaser": {
      "pt": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?",
      "en": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?"
    },
    "description": {
      "pt": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives.",
      "en": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives."
    },
    "whyItMatters": {
      "pt": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros.",
      "en": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros."
    },
    "funFact": {
      "pt": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!",
      "en": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 32,
    "dayOfYear": 32,
    "month": 2,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Fevereiro",
      "en": "February 1"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Gestores de Senhas",
      "en": "Gestores de Senhas"
    },
    "icon": "🗄️",
    "title": {
      "pt": "Nunca repitas a mesma palavra-passe em todos os sites e aplicações!",
      "en": "Nunca repitas a mesma palavra-passe em todos os sites e aplicações!"
    },
    "teaser": {
      "pt": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco.",
      "en": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco."
    },
    "description": {
      "pt": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido.",
      "en": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido."
    },
    "whyItMatters": {
      "pt": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano.",
      "en": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano."
    },
    "funFact": {
      "pt": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!",
      "en": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 33,
    "dayOfYear": 33,
    "month": 2,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Fevereiro",
      "en": "February 2"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Phishing por Email",
      "en": "Phishing por Email"
    },
    "icon": "🎣",
    "title": {
      "pt": "Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!",
      "en": "Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!"
    },
    "teaser": {
      "pt": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!",
      "en": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!"
    },
    "description": {
      "pt": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!",
      "en": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!"
    },
    "whyItMatters": {
      "pt": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing.",
      "en": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing."
    },
    "funFact": {
      "pt": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!",
      "en": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 34,
    "dayOfYear": 34,
    "month": 2,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Fevereiro",
      "en": "February 3"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Aranhas da Web",
      "en": "Aranhas da Web"
    },
    "icon": "🕷️",
    "title": {
      "pt": "As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!",
      "en": "As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!"
    },
    "teaser": {
      "pt": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?",
      "en": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?"
    },
    "description": {
      "pt": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice.",
      "en": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice."
    },
    "whyItMatters": {
      "pt": "Compreender como a informação é indexada e recuperada nos motores de pesquisa.",
      "en": "Compreender como a informação é indexada e recuperada nos motores de pesquisa."
    },
    "funFact": {
      "pt": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!",
      "en": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 35,
    "dayOfYear": 35,
    "month": 2,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Fevereiro",
      "en": "February 4"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Domínio Público",
      "en": "Domínio Público"
    },
    "icon": "🏛️",
    "title": {
      "pt": "O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!",
      "en": "O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!"
    },
    "teaser": {
      "pt": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?",
      "en": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?"
    },
    "description": {
      "pt": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!",
      "en": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!"
    },
    "whyItMatters": {
      "pt": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum.",
      "en": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum."
    },
    "funFact": {
      "pt": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!",
      "en": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 36,
    "dayOfYear": 36,
    "month": 2,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Fevereiro",
      "en": "February 5"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História do Rato",
      "en": "História do Rato"
    },
    "icon": "🖱️",
    "title": {
      "pt": "O primeiro rato do mundo foi feito de madeira com rodas de metal!",
      "en": "O primeiro rato do mundo foi feito de madeira com rodas de metal!"
    },
    "teaser": {
      "pt": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo.",
      "en": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo."
    },
    "description": {
      "pt": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!",
      "en": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!"
    },
    "whyItMatters": {
      "pt": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC.",
      "en": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC."
    },
    "funFact": {
      "pt": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!",
      "en": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 37,
    "dayOfYear": 37,
    "month": 2,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Fevereiro",
      "en": "February 6"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Mochila Escolar",
      "en": "Mochila Escolar"
    },
    "icon": "🎒",
    "title": {
      "pt": "O peso da mochila não deve ultrapassar 10% do teu peso corporal!",
      "en": "O peso da mochila não deve ultrapassar 10% do teu peso corporal!"
    },
    "teaser": {
      "pt": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização.",
      "en": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização."
    },
    "description": {
      "pt": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só.",
      "en": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só."
    },
    "whyItMatters": {
      "pt": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis.",
      "en": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis."
    },
    "funFact": {
      "pt": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!",
      "en": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 38,
    "dayOfYear": 38,
    "month": 2,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Fevereiro",
      "en": "February 7"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Dia da Internet Mais Segura",
      "en": "Safer Internet Day"
    },
    "icon": "🛡️",
    "title": {
      "pt": "Dia da Internet Mais Segura: Juntos por uma Net Melhor!",
      "en": "Safer Internet Day: Together for a Better Internet!"
    },
    "teaser": {
      "pt": "Em fevereiro, mais de 180 países celebram a utilização segura, responsável e positiva da tecnologia.",
      "en": "Over 180 countries celebrate the safe and responsible use of tech."
    },
    "description": {
      "pt": "O Dia da Internet Mais Segura (Safer Internet Day) é uma iniciativa europeia que reúne escolas, professores e famílias para promover atitudes positivas online, combater o cyberbullying e defender a privacidade dos jovens.",
      "en": "Safer Internet Day unites schools and families to promote digital kindness and combat cyberbullying."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos que a segurança na Internet não é ter medo, mas sim saber usar com inteligência e respeito mútuo.",
      "en": "In Topic 3 we learn online safety is not about fear, but intelligent, respectful habits."
    },
    "funFact": {
      "pt": "Em Portugal, o consórcio do Centro Internet Segura organiza sessões e teatros especiais em centenas de escolas!",
      "en": "In Portugal, the Internet Segura consortium holds interactive plays and workshops in hundreds of schools!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 39,
    "dayOfYear": 39,
    "month": 2,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Fevereiro",
      "en": "February 8"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Post-its no Monitor",
      "en": "Post-its no Monitor"
    },
    "icon": "📝",
    "title": {
      "pt": "O erro clássico: colar papéis com a palavra-passe no ecrã do computador!",
      "en": "O erro clássico: colar papéis com a palavra-passe no ecrã do computador!"
    },
    "teaser": {
      "pt": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura.",
      "en": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura."
    },
    "description": {
      "pt": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas.",
      "en": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas."
    },
    "whyItMatters": {
      "pt": "Práticas de segurança física e lógica no manuseamento de acessos no computador.",
      "en": "Práticas de segurança física e lógica no manuseamento de acessos no computador."
    },
    "funFact": {
      "pt": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!",
      "en": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 40,
    "dayOfYear": 40,
    "month": 2,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Fevereiro",
      "en": "February 9"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Campo Assunto",
      "en": "O Campo Assunto"
    },
    "icon": "🏷️",
    "title": {
      "pt": "Nunca envies um email com o campo \"Assunto\" vazio!",
      "en": "Nunca envies um email com o campo \"Assunto\" vazio!"
    },
    "teaser": {
      "pt": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem.",
      "en": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem."
    },
    "description": {
      "pt": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\".",
      "en": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\"."
    },
    "whyItMatters": {
      "pt": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico.",
      "en": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico."
    },
    "funFact": {
      "pt": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!",
      "en": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 41,
    "dayOfYear": 41,
    "month": 2,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Fevereiro",
      "en": "February 10"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Histórico e Cookies",
      "en": "Histórico e Cookies"
    },
    "icon": "🍪",
    "title": {
      "pt": "Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!",
      "en": "Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!"
    },
    "teaser": {
      "pt": "Porque é que todos os sites perguntam se aceitas cookies?",
      "en": "Porque é que todos os sites perguntam se aceitas cookies?"
    },
    "description": {
      "pt": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites.",
      "en": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites."
    },
    "whyItMatters": {
      "pt": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC.",
      "en": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC."
    },
    "funFact": {
      "pt": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!",
      "en": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 42,
    "dayOfYear": 42,
    "month": 2,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Fevereiro",
      "en": "February 11"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Música e Sons Livres",
      "en": "Música e Sons Livres"
    },
    "icon": "🎵",
    "title": {
      "pt": "Bancos de som e música livre para os teus vídeos e jogos no Scratch!",
      "en": "Bancos de som e música livre para os teus vídeos e jogos no Scratch!"
    },
    "teaser": {
      "pt": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado.",
      "en": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado."
    },
    "description": {
      "pt": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público.",
      "en": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público."
    },
    "whyItMatters": {
      "pt": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares.",
      "en": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares."
    },
    "funFact": {
      "pt": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!",
      "en": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 43,
    "dayOfYear": 43,
    "month": 2,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Fevereiro",
      "en": "February 12"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Robótica e Exploração",
      "en": "Robótica e Exploração"
    },
    "icon": "🤖",
    "title": {
      "pt": "Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!",
      "en": "Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!"
    },
    "teaser": {
      "pt": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte.",
      "en": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte."
    },
    "description": {
      "pt": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas.",
      "en": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas."
    },
    "whyItMatters": {
      "pt": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna.",
      "en": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna."
    },
    "funFact": {
      "pt": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!",
      "en": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 44,
    "dayOfYear": 44,
    "month": 2,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Fevereiro",
      "en": "February 13"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Iluminação do Espaço",
      "en": "Iluminação do Espaço"
    },
    "icon": "💡",
    "title": {
      "pt": "Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!",
      "en": "Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!"
    },
    "teaser": {
      "pt": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?",
      "en": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?"
    },
    "description": {
      "pt": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho.",
      "en": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho."
    },
    "whyItMatters": {
      "pt": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado.",
      "en": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado."
    },
    "funFact": {
      "pt": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!",
      "en": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 45,
    "dayOfYear": 45,
    "month": 2,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Fevereiro",
      "en": "February 14"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Engenharia Social",
      "en": "Engenharia Social"
    },
    "icon": "🎣",
    "title": {
      "pt": "Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!",
      "en": "Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!"
    },
    "teaser": {
      "pt": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!",
      "en": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!"
    },
    "description": {
      "pt": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!",
      "en": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!"
    },
    "whyItMatters": {
      "pt": "Identificação de técnicas básicas de engenharia social e enganos virtuais.",
      "en": "Identificação de técnicas básicas de engenharia social e enganos virtuais."
    },
    "funFact": {
      "pt": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!",
      "en": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 46,
    "dayOfYear": 46,
    "month": 2,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Fevereiro",
      "en": "February 15"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Bloqueio de Sessão",
      "en": "Bloqueio de Sessão"
    },
    "icon": "🔒",
    "title": {
      "pt": "Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!",
      "en": "Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!"
    },
    "teaser": {
      "pt": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!",
      "en": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!"
    },
    "description": {
      "pt": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula.",
      "en": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula."
    },
    "whyItMatters": {
      "pt": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador.",
      "en": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador."
    },
    "funFact": {
      "pt": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!",
      "en": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 47,
    "dayOfYear": 47,
    "month": 2,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Fevereiro",
      "en": "February 16"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Spam e Cadeias",
      "en": "Spam e Cadeias"
    },
    "icon": "🗑️",
    "title": {
      "pt": "A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!",
      "en": "A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!"
    },
    "teaser": {
      "pt": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!",
      "en": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!"
    },
    "description": {
      "pt": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas.",
      "en": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas."
    },
    "whyItMatters": {
      "pt": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam.",
      "en": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam."
    },
    "funFact": {
      "pt": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!",
      "en": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 48,
    "dayOfYear": 48,
    "month": 2,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Fevereiro",
      "en": "February 17"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Separadores e Janelas",
      "en": "Separadores e Janelas"
    },
    "icon": "📑",
    "title": {
      "pt": "Atalhos de mestre no navegador: Control + T abre um novo separador!",
      "en": "Atalhos de mestre no navegador: Control + T abre um novo separador!"
    },
    "teaser": {
      "pt": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática.",
      "en": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática."
    },
    "description": {
      "pt": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!",
      "en": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!"
    },
    "whyItMatters": {
      "pt": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano.",
      "en": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano."
    },
    "funFact": {
      "pt": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!",
      "en": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 49,
    "dayOfYear": 49,
    "month": 2,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Fevereiro",
      "en": "February 18"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Software Livre vs Proprietário",
      "en": "Software Livre vs Proprietário"
    },
    "icon": "🐧",
    "title": {
      "pt": "Software Livre: o código aberto onde todos podem aprender e colaborar!",
      "en": "Software Livre: o código aberto onde todos podem aprender e colaborar!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?",
      "en": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?"
    },
    "description": {
      "pt": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade.",
      "en": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade."
    },
    "whyItMatters": {
      "pt": "Diferença entre licenças de software comercial, freeware, shareware e software livre.",
      "en": "Diferença entre licenças de software comercial, freeware, shareware e software livre."
    },
    "funFact": {
      "pt": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!",
      "en": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 50,
    "dayOfYear": 50,
    "month": 2,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Fevereiro",
      "en": "February 19"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Ambiente e Sustentabilidade",
      "en": "Ambiente e Sustentabilidade"
    },
    "icon": "♻️",
    "title": {
      "pt": "O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!",
      "en": "O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!"
    },
    "teaser": {
      "pt": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?",
      "en": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?"
    },
    "description": {
      "pt": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados.",
      "en": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados."
    },
    "whyItMatters": {
      "pt": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano.",
      "en": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano."
    },
    "funFact": {
      "pt": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!",
      "en": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 51,
    "dayOfYear": 51,
    "month": 2,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Fevereiro",
      "en": "February 20"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pausas Ativas",
      "en": "Pausas Ativas"
    },
    "icon": "🏃‍♂️",
    "title": {
      "pt": "Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!",
      "en": "Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!"
    },
    "teaser": {
      "pt": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas.",
      "en": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas."
    },
    "description": {
      "pt": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos.",
      "en": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos."
    },
    "whyItMatters": {
      "pt": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano.",
      "en": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano."
    },
    "funFact": {
      "pt": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!",
      "en": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 52,
    "dayOfYear": 52,
    "month": 2,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Fevereiro",
      "en": "February 21"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Direito à Imagem",
      "en": "Direito à Imagem"
    },
    "icon": "📸",
    "title": {
      "pt": "Pede sempre autorização antes de tirar ou partilhar fotos de amigos!",
      "en": "Pede sempre autorização antes de tirar ou partilhar fotos de amigos!"
    },
    "teaser": {
      "pt": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada.",
      "en": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada."
    },
    "description": {
      "pt": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares.",
      "en": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares."
    },
    "whyItMatters": {
      "pt": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade.",
      "en": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade."
    },
    "funFact": {
      "pt": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!",
      "en": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 53,
    "dayOfYear": 53,
    "month": 2,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Fevereiro",
      "en": "February 22"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Biometria",
      "en": "Biometria"
    },
    "icon": "👁️",
    "title": {
      "pt": "Impressão digital e reconhecimento facial: o teu corpo como senha!",
      "en": "Impressão digital e reconhecimento facial: o teu corpo como senha!"
    },
    "teaser": {
      "pt": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar.",
      "en": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar."
    },
    "description": {
      "pt": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos.",
      "en": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos."
    },
    "whyItMatters": {
      "pt": "Exploração das novas tecnologias de identificação e autenticação biométrica.",
      "en": "Exploração das novas tecnologias de identificação e autenticação biométrica."
    },
    "funFact": {
      "pt": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!",
      "en": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 54,
    "dayOfYear": 54,
    "month": 2,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Fevereiro",
      "en": "February 23"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Responder a Todos",
      "en": "Responder a Todos"
    },
    "icon": "👥",
    "title": {
      "pt": "Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!",
      "en": "Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!"
    },
    "teaser": {
      "pt": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\".",
      "en": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\"."
    },
    "description": {
      "pt": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!",
      "en": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!"
    },
    "whyItMatters": {
      "pt": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano.",
      "en": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano."
    },
    "funFact": {
      "pt": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!",
      "en": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 55,
    "dayOfYear": 55,
    "month": 2,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Fevereiro",
      "en": "February 24"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Domínios e Extensões",
      "en": "Domínios e Extensões"
    },
    "icon": "🌐",
    "title": {
      "pt": "O que significa .pt, .org, .edu e .gov no final dos sites?",
      "en": "O que significa .pt, .org, .edu e .gov no final dos sites?"
    },
    "teaser": {
      "pt": "A terminação do endereço da página Web revela muito sobre quem a criou.",
      "en": "A terminação do endereço da página Web revela muito sobre quem a criou."
    },
    "description": {
      "pt": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!",
      "en": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!"
    },
    "whyItMatters": {
      "pt": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional.",
      "en": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional."
    },
    "funFact": {
      "pt": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!",
      "en": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 56,
    "dayOfYear": 56,
    "month": 2,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Fevereiro",
      "en": "February 25"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação Direta entre Aspas",
      "en": "Citação Direta entre Aspas"
    },
    "icon": "💬",
    "title": {
      "pt": "Como citar uma frase de um livro no trabalho escolar sem cometer plágio?",
      "en": "Como citar uma frase de um livro no trabalho escolar sem cometer plágio?"
    },
    "teaser": {
      "pt": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!",
      "en": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!"
    },
    "description": {
      "pt": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!",
      "en": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!"
    },
    "whyItMatters": {
      "pt": "Normas de referenciação textual e integridade académica em produções escolares de TIC.",
      "en": "Normas de referenciação textual e integridade académica em produções escolares de TIC."
    },
    "funFact": {
      "pt": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\"",
      "en": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\""
    },
    "isSpecialMilestone": false
  },
  {
    "id": 57,
    "dayOfYear": 57,
    "month": 2,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Fevereiro",
      "en": "February 26"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Hardware Interno",
      "en": "Hardware Interno"
    },
    "icon": "🧠",
    "title": {
      "pt": "Em detalhe: A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!",
      "en": "A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!"
    },
    "teaser": {
      "pt": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?",
      "en": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?"
    },
    "description": {
      "pt": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!",
      "en": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!"
    },
    "whyItMatters": {
      "pt": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes.",
      "en": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes."
    },
    "funFact": {
      "pt": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!",
      "en": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 58,
    "dayOfYear": 58,
    "month": 2,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Fevereiro",
      "en": "February 27"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Postura na Cadeira",
      "en": "Postura na Cadeira"
    },
    "icon": "🪑",
    "title": {
      "pt": "Em detalhe: A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!",
      "en": "A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!"
    },
    "teaser": {
      "pt": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?",
      "en": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?"
    },
    "description": {
      "pt": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares.",
      "en": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares."
    },
    "whyItMatters": {
      "pt": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito.",
      "en": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito."
    },
    "funFact": {
      "pt": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!",
      "en": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 59,
    "dayOfYear": 59,
    "month": 2,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Fevereiro",
      "en": "February 28"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Pegada Digital",
      "en": "Pegada Digital"
    },
    "icon": "👣",
    "title": {
      "pt": "Em detalhe: A tua Pegada Digital é como uma pegada no cimento fresco!",
      "en": "A tua Pegada Digital é como uma pegada no cimento fresco!"
    },
    "teaser": {
      "pt": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura.",
      "en": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura."
    },
    "description": {
      "pt": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes.",
      "en": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online.",
      "en": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online."
    },
    "funFact": {
      "pt": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!",
      "en": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 60,
    "dayOfYear": 60,
    "month": 2,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Fevereiro",
      "en": "February 29"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Curiosidade do Calendário e Código",
      "en": "Leap Year Code Bug"
    },
    "icon": "🐸",
    "title": {
      "pt": "O Bug do Ano Bissexto: o dia que baralha computadores!",
      "en": "The Leap Year Bug: the day that confuses computers!"
    },
    "teaser": {
      "pt": "O dia 29 de fevereiro só existe de 4 em 4 anos e já causou encravamentos hilariantes em programas!",
      "en": "February 29 only happens every 4 years and has caused hilarious software glitches!"
    },
    "description": {
      "pt": "A Terra demora cerca de 365 dias e 6 horas a dar a volta ao Sol. Para acertar o calendário, adicionamos o dia 29 de fevereiro. Se um programador esquecer a regra bissexta no código, o sistema pode bloquear ao tentar marcar eventos para este dia inexistente noutros anos!",
      "en": "Earth takes 365 days and 6 hours to orbit the Sun. Coders who forget leap year math can crash systems."
    },
    "whyItMatters": {
      "pt": "Programação de computadores exige precisão matemática: nas aulas de TIC aprendemos que os algoritmos têm de prever todos os casos possíveis.",
      "en": "Coding requires mathematical rigor: algorithms must handle edge cases like Feb 29."
    },
    "funFact": {
      "pt": "Um ano é bissexto se for divisível por 4, mas não por 100, a menos que também seja divisível por 400! Uma regra tripla no código!",
      "en": "A year is leap if divisible by 4, but not 100, unless also divisible by 400!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 61,
    "dayOfYear": 61,
    "month": 3,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Março",
      "en": "March 1"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Campos do Email",
      "en": "Campos do Email"
    },
    "icon": "🕶️",
    "title": {
      "pt": "Em detalhe: O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!",
      "en": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!"
    },
    "teaser": {
      "pt": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!",
      "en": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!"
    },
    "description": {
      "pt": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados.",
      "en": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados."
    },
    "whyItMatters": {
      "pt": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD.",
      "en": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD."
    },
    "funFact": {
      "pt": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!",
      "en": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 62,
    "dayOfYear": 62,
    "month": 3,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Março",
      "en": "March 2"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Navegador vs Motor",
      "en": "Navegador vs Motor"
    },
    "icon": "🚗",
    "title": {
      "pt": "Em detalhe: O Navegador é o Automóvel, o Motor de Busca é o GPS!",
      "en": "O Navegador é o Automóvel, o Motor de Busca é o GPS!"
    },
    "teaser": {
      "pt": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?",
      "en": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?"
    },
    "description": {
      "pt": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas.",
      "en": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas."
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca.",
      "en": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca."
    },
    "funFact": {
      "pt": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!",
      "en": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 63,
    "dayOfYear": 63,
    "month": 3,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Março",
      "en": "March 3"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Google Imagens",
      "en": "Google Imagens"
    },
    "icon": "🎨",
    "title": {
      "pt": "Em detalhe: As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!",
      "en": "As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!"
    },
    "teaser": {
      "pt": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei.",
      "en": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei."
    },
    "description": {
      "pt": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público.",
      "en": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público."
    },
    "whyItMatters": {
      "pt": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas.",
      "en": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas."
    },
    "funFact": {
      "pt": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!",
      "en": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 64,
    "dayOfYear": 64,
    "month": 3,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Março",
      "en": "March 4"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Memória do Computador",
      "en": "Memória do Computador"
    },
    "icon": "⚡",
    "title": {
      "pt": "Em detalhe: Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!",
      "en": "Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?",
      "en": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?"
    },
    "description": {
      "pt": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!",
      "en": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!"
    },
    "whyItMatters": {
      "pt": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC.",
      "en": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC."
    },
    "funFact": {
      "pt": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!",
      "en": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 65,
    "dayOfYear": 65,
    "month": 3,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Março",
      "en": "March 5"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Cuidado com os Olhos",
      "en": "Cuidado com os Olhos"
    },
    "icon": "👀",
    "title": {
      "pt": "Em detalhe: A Regra 20-20-20: o descanso favorito dos teus olhos!",
      "en": "A Regra 20-20-20: o descanso favorito dos teus olhos!"
    },
    "teaser": {
      "pt": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?",
      "en": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?"
    },
    "description": {
      "pt": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!",
      "en": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!"
    },
    "whyItMatters": {
      "pt": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano.",
      "en": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano."
    },
    "funFact": {
      "pt": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!",
      "en": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 66,
    "dayOfYear": 66,
    "month": 3,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Março",
      "en": "March 6"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Privacidade e Redes",
      "en": "Privacidade e Redes"
    },
    "icon": "🕵️‍♂️",
    "title": {
      "pt": "Em detalhe: A regra do \"Estranho no Jardim\": nada de moradas em jogos online!",
      "en": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!"
    },
    "teaser": {
      "pt": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa.",
      "en": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa."
    },
    "description": {
      "pt": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online.",
      "en": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online."
    },
    "whyItMatters": {
      "pt": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital.",
      "en": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital."
    },
    "funFact": {
      "pt": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!",
      "en": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 67,
    "dayOfYear": 67,
    "month": 3,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Março",
      "en": "March 7"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "O Segredo da Frase-Passe",
      "en": "O Segredo da Frase-Passe"
    },
    "icon": "🍕",
    "title": {
      "pt": "Em detalhe: O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!",
      "en": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!"
    },
    "teaser": {
      "pt": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar.",
      "en": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar."
    },
    "description": {
      "pt": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!",
      "en": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!"
    },
    "whyItMatters": {
      "pt": "Construção de palavras-passe fortes com base em frases mnemónicas compridas.",
      "en": "Construção de palavras-passe fortes com base em frases mnemónicas compridas."
    },
    "funFact": {
      "pt": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!",
      "en": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 68,
    "dayOfYear": 68,
    "month": 3,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Março",
      "en": "March 8"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Símbolo Arroba",
      "en": "O Símbolo Arroba"
    },
    "icon": "🐌",
    "title": {
      "pt": "Em detalhe: O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!",
      "en": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!"
    },
    "teaser": {
      "pt": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino.",
      "en": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino."
    },
    "description": {
      "pt": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!",
      "en": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!"
    },
    "whyItMatters": {
      "pt": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao.",
      "en": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao."
    },
    "funFact": {
      "pt": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!",
      "en": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 69,
    "dayOfYear": 69,
    "month": 3,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Março",
      "en": "March 9"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Truque das Aspas",
      "en": "Truque das Aspas"
    },
    "icon": "🔍",
    "title": {
      "pt": "Em detalhe: Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!",
      "en": "Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!"
    },
    "teaser": {
      "pt": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?",
      "en": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?"
    },
    "description": {
      "pt": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!",
      "en": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!"
    },
    "whyItMatters": {
      "pt": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano.",
      "en": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano."
    },
    "funFact": {
      "pt": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!",
      "en": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 70,
    "dayOfYear": 70,
    "month": 3,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Março",
      "en": "March 10"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "O que é Plágio",
      "en": "O que é Plágio"
    },
    "icon": "✂️",
    "title": {
      "pt": "Em detalhe: Plágio: roubar a medalha de ouro de outra pessoa!",
      "en": "Plágio: roubar a medalha de ouro de outra pessoa!"
    },
    "teaser": {
      "pt": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica.",
      "en": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica."
    },
    "description": {
      "pt": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste.",
      "en": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste."
    },
    "whyItMatters": {
      "pt": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano.",
      "en": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano."
    },
    "funFact": {
      "pt": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!",
      "en": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 71,
    "dayOfYear": 71,
    "month": 3,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Março",
      "en": "March 11"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Placa Principal",
      "en": "Placa Principal"
    },
    "icon": "🛣️",
    "title": {
      "pt": "Em detalhe: A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!",
      "en": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!"
    },
    "teaser": {
      "pt": "Como é que a placa gráfica fala com o processador e com o disco rígido?",
      "en": "Como é que a placa gráfica fala com o processador e com o disco rígido?"
    },
    "description": {
      "pt": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI.",
      "en": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus).",
      "en": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus)."
    },
    "funFact": {
      "pt": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!",
      "en": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 72,
    "dayOfYear": 72,
    "month": 3,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Março",
      "en": "March 12"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Sono e Tecnologia",
      "en": "Sono e Tecnologia"
    },
    "icon": "🌙",
    "title": {
      "pt": "Em detalhe: A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\"",
      "en": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\""
    },
    "teaser": {
      "pt": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?",
      "en": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?"
    },
    "description": {
      "pt": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola.",
      "en": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola."
    },
    "whyItMatters": {
      "pt": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias.",
      "en": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias."
    },
    "funFact": {
      "pt": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!",
      "en": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 73,
    "dayOfYear": 73,
    "month": 3,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Março",
      "en": "March 13"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Apoio e Helplines",
      "en": "Apoio e Helplines"
    },
    "icon": "📞",
    "title": {
      "pt": "Em detalhe: Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!",
      "en": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!"
    },
    "teaser": {
      "pt": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar.",
      "en": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar."
    },
    "description": {
      "pt": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!",
      "en": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!"
    },
    "whyItMatters": {
      "pt": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental.",
      "en": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental."
    },
    "funFact": {
      "pt": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!",
      "en": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 74,
    "dayOfYear": 74,
    "month": 3,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Março",
      "en": "March 14"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Partilha de Senhas",
      "en": "Partilha de Senhas"
    },
    "icon": "🪥",
    "title": {
      "pt": "Em detalhe: Palavras-passe são como escovas de dentes: não se emprestam a ninguém!",
      "en": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!"
    },
    "teaser": {
      "pt": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital.",
      "en": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital."
    },
    "description": {
      "pt": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem.",
      "en": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem."
    },
    "whyItMatters": {
      "pt": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal.",
      "en": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal."
    },
    "funFact": {
      "pt": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!",
      "en": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 75,
    "dayOfYear": 75,
    "month": 3,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Março",
      "en": "March 15"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Netiqueta em Emails",
      "en": "Netiqueta em Emails"
    },
    "icon": "📢",
    "title": {
      "pt": "Em detalhe: Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!",
      "en": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!"
    },
    "teaser": {
      "pt": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais.",
      "en": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais."
    },
    "description": {
      "pt": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã.",
      "en": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã."
    },
    "whyItMatters": {
      "pt": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico.",
      "en": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico."
    },
    "funFact": {
      "pt": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!",
      "en": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 76,
    "dayOfYear": 76,
    "month": 3,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Março",
      "en": "March 16"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Segurança HTTPS",
      "en": "Segurança HTTPS"
    },
    "icon": "🔒",
    "title": {
      "pt": "Em detalhe: O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!",
      "en": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!"
    },
    "teaser": {
      "pt": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\".",
      "en": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\"."
    },
    "description": {
      "pt": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias.",
      "en": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias."
    },
    "whyItMatters": {
      "pt": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC.",
      "en": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC."
    },
    "funFact": {
      "pt": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!",
      "en": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 77,
    "dayOfYear": 77,
    "month": 3,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Março",
      "en": "March 17"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Creative Commons",
      "en": "Creative Commons"
    },
    "icon": "🤝",
    "title": {
      "pt": "Em detalhe: Creative Commons: o convite amigável para partilhar criatividade com o mundo!",
      "en": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!"
    },
    "teaser": {
      "pt": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?",
      "en": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?"
    },
    "description": {
      "pt": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\".",
      "en": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\"."
    },
    "whyItMatters": {
      "pt": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7.",
      "en": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7."
    },
    "funFact": {
      "pt": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!",
      "en": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 78,
    "dayOfYear": 78,
    "month": 3,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Março",
      "en": "March 18"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Linguagem dos Computadores",
      "en": "Linguagem dos Computadores"
    },
    "icon": "0️⃣",
    "title": {
      "pt": "Em detalhe: Tudo no computador são apenas ZEROS e UNS (0 e 1)!",
      "en": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!"
    },
    "teaser": {
      "pt": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?",
      "en": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?"
    },
    "description": {
      "pt": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!",
      "en": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!"
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte.",
      "en": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte."
    },
    "funFact": {
      "pt": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!",
      "en": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 79,
    "dayOfYear": 79,
    "month": 3,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Março",
      "en": "March 19"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pescoço e Coluna",
      "en": "Pescoço e Coluna"
    },
    "icon": "🦒",
    "title": {
      "pt": "Em detalhe: O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!",
      "en": "O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!"
    },
    "teaser": {
      "pt": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento.",
      "en": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento."
    },
    "description": {
      "pt": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!",
      "en": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!"
    },
    "whyItMatters": {
      "pt": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial.",
      "en": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial."
    },
    "funFact": {
      "pt": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!",
      "en": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 80,
    "dayOfYear": 80,
    "month": 3,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Março",
      "en": "March 20"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Netiqueta e Empatia",
      "en": "Netiqueta e Empatia"
    },
    "icon": "💬",
    "title": {
      "pt": "Em detalhe: Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!",
      "en": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!"
    },
    "teaser": {
      "pt": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?",
      "en": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?"
    },
    "description": {
      "pt": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa.",
      "en": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa."
    },
    "whyItMatters": {
      "pt": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano.",
      "en": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano."
    },
    "funFact": {
      "pt": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!",
      "en": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 81,
    "dayOfYear": 81,
    "month": 3,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Março",
      "en": "March 21"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Autenticação de 2 Fatores",
      "en": "Autenticação de 2 Fatores"
    },
    "icon": "📲",
    "title": {
      "pt": "Em detalhe: Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!",
      "en": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!"
    },
    "teaser": {
      "pt": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.",
      "en": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código."
    },
    "description": {
      "pt": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes.",
      "en": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes."
    },
    "whyItMatters": {
      "pt": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC.",
      "en": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC."
    },
    "funFact": {
      "pt": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!",
      "en": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 82,
    "dayOfYear": 82,
    "month": 3,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Março",
      "en": "March 22"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Anexos Perigosos",
      "en": "Anexos Perigosos"
    },
    "icon": "📎",
    "title": {
      "pt": "Em detalhe: Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!",
      "en": "Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!"
    },
    "teaser": {
      "pt": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos.",
      "en": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos."
    },
    "description": {
      "pt": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros.",
      "en": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros."
    },
    "whyItMatters": {
      "pt": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC.",
      "en": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC."
    },
    "funFact": {
      "pt": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!",
      "en": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 83,
    "dayOfYear": 83,
    "month": 3,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Março",
      "en": "March 23"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Combate a Fake News",
      "en": "Combate a Fake News"
    },
    "icon": "🕵️‍♀️",
    "title": {
      "pt": "Em detalhe: O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!",
      "en": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!"
    },
    "teaser": {
      "pt": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções.",
      "en": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções."
    },
    "description": {
      "pt": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?",
      "en": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?"
    },
    "whyItMatters": {
      "pt": "Literacia da informação e espírito crítico na avaliação de fontes da Web.",
      "en": "Literacia da informação e espírito crítico na avaliação de fontes da Web."
    },
    "funFact": {
      "pt": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!",
      "en": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 84,
    "dayOfYear": 84,
    "month": 3,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Março",
      "en": "March 24"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação e Bibliografia",
      "en": "Citação e Bibliografia"
    },
    "icon": "📚",
    "title": {
      "pt": "Em detalhe: Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!",
      "en": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!"
    },
    "teaser": {
      "pt": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!",
      "en": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!"
    },
    "description": {
      "pt": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso.",
      "en": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso."
    },
    "whyItMatters": {
      "pt": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC.",
      "en": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC."
    },
    "funFact": {
      "pt": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!",
      "en": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 85,
    "dayOfYear": 85,
    "month": 3,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Março",
      "en": "March 25"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Periféricos de TIC",
      "en": "Periféricos de TIC"
    },
    "icon": "🖨️",
    "title": {
      "pt": "Em detalhe: Periféricos: a ponte mágica entre o ser humano e a máquina!",
      "en": "Periféricos: a ponte mágica entre o ser humano e a máquina!"
    },
    "teaser": {
      "pt": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?",
      "en": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?"
    },
    "description": {
      "pt": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!",
      "en": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!"
    },
    "whyItMatters": {
      "pt": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1.",
      "en": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1."
    },
    "funFact": {
      "pt": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!",
      "en": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 86,
    "dayOfYear": 86,
    "month": 3,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Março",
      "en": "March 26"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Volume e Audição",
      "en": "Volume e Audição"
    },
    "icon": "🎧",
    "title": {
      "pt": "Em detalhe: A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!",
      "en": "A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!"
    },
    "teaser": {
      "pt": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição.",
      "en": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição."
    },
    "description": {
      "pt": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!",
      "en": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!"
    },
    "whyItMatters": {
      "pt": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC.",
      "en": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC."
    },
    "funFact": {
      "pt": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!",
      "en": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 87,
    "dayOfYear": 87,
    "month": 3,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Março",
      "en": "March 27"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Localização GPS",
      "en": "Localização GPS"
    },
    "icon": "📍",
    "title": {
      "pt": "Em detalhe: Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!",
      "en": "Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!"
    },
    "teaser": {
      "pt": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?",
      "en": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?"
    },
    "description": {
      "pt": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives.",
      "en": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives."
    },
    "whyItMatters": {
      "pt": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros.",
      "en": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros."
    },
    "funFact": {
      "pt": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!",
      "en": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 88,
    "dayOfYear": 88,
    "month": 3,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Março",
      "en": "March 28"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Gestores de Senhas",
      "en": "Gestores de Senhas"
    },
    "icon": "🗄️",
    "title": {
      "pt": "Em detalhe: Nunca repitas a mesma palavra-passe em todos os sites e aplicações!",
      "en": "Nunca repitas a mesma palavra-passe em todos os sites e aplicações!"
    },
    "teaser": {
      "pt": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco.",
      "en": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco."
    },
    "description": {
      "pt": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido.",
      "en": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido."
    },
    "whyItMatters": {
      "pt": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano.",
      "en": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano."
    },
    "funFact": {
      "pt": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!",
      "en": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 89,
    "dayOfYear": 89,
    "month": 3,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Março",
      "en": "March 29"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Phishing por Email",
      "en": "Phishing por Email"
    },
    "icon": "🎣",
    "title": {
      "pt": "Em detalhe: Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!",
      "en": "Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!"
    },
    "teaser": {
      "pt": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!",
      "en": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!"
    },
    "description": {
      "pt": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!",
      "en": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!"
    },
    "whyItMatters": {
      "pt": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing.",
      "en": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing."
    },
    "funFact": {
      "pt": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!",
      "en": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 90,
    "dayOfYear": 90,
    "month": 3,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Março",
      "en": "March 30"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Aranhas da Web",
      "en": "Aranhas da Web"
    },
    "icon": "🕷️",
    "title": {
      "pt": "Em detalhe: As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!",
      "en": "As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!"
    },
    "teaser": {
      "pt": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?",
      "en": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?"
    },
    "description": {
      "pt": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice.",
      "en": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice."
    },
    "whyItMatters": {
      "pt": "Compreender como a informação é indexada e recuperada nos motores de pesquisa.",
      "en": "Compreender como a informação é indexada e recuperada nos motores de pesquisa."
    },
    "funFact": {
      "pt": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!",
      "en": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 91,
    "dayOfYear": 91,
    "month": 3,
    "day": 31,
    "dateLabel": {
      "pt": "31 de Março",
      "en": "March 31"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Dia Mundial do Backup",
      "en": "World Backup Day"
    },
    "icon": "💾",
    "title": {
      "pt": "Dia Mundial do Backup: \"Não sejas um tolo de Abril!\"",
      "en": "World Backup Day: \"Don't be an April fool!\""
    },
    "teaser": {
      "pt": "Celebrado na véspera do Dia das Mentiras, lembra a todos para guardarem cópias dos ficheiros.",
      "en": "Celebrated on the eve of April Fools' Day, reminding everyone to save backups."
    },
    "description": {
      "pt": "O Dia Mundial do Backup (31 de março) serve para lembrar estudantes e profissionais da importância de fazer cópias de segurança de trabalhos escolares, fotografias e documentos importantes para uma pen drive ou para a Cloud.",
      "en": "World Backup Day reminds students to back up assignments, photos, and files to USB drives or the Cloud."
    },
    "whyItMatters": {
      "pt": "Computadores podem avariar, ser roubados ou apanhar vírus. Quem tem um backup nunca perde os seus trabalhos de TIC!",
      "en": "Hardware fails and viruses happen: having backups ensures you never lose homework."
    },
    "funFact": {
      "pt": "O lema oficial do dia é: \"Eu juro solenemente que vou fazer uma cópia de segurança dos meus dados importantes a 31 de março!\"",
      "en": "The official pledge is: \"I solemnly swear to back up my important documents on March 31!\""
    },
    "isSpecialMilestone": true
  },
  {
    "id": 92,
    "dayOfYear": 92,
    "month": 4,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Abril",
      "en": "April 1"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História do Rato",
      "en": "História do Rato"
    },
    "icon": "🖱️",
    "title": {
      "pt": "Em detalhe: O primeiro rato do mundo foi feito de madeira com rodas de metal!",
      "en": "O primeiro rato do mundo foi feito de madeira com rodas de metal!"
    },
    "teaser": {
      "pt": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo.",
      "en": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo."
    },
    "description": {
      "pt": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!",
      "en": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!"
    },
    "whyItMatters": {
      "pt": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC.",
      "en": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC."
    },
    "funFact": {
      "pt": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!",
      "en": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 93,
    "dayOfYear": 93,
    "month": 4,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Abril",
      "en": "April 2"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Mochila Escolar",
      "en": "Mochila Escolar"
    },
    "icon": "🎒",
    "title": {
      "pt": "Em detalhe: O peso da mochila não deve ultrapassar 10% do teu peso corporal!",
      "en": "O peso da mochila não deve ultrapassar 10% do teu peso corporal!"
    },
    "teaser": {
      "pt": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização.",
      "en": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização."
    },
    "description": {
      "pt": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só.",
      "en": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só."
    },
    "whyItMatters": {
      "pt": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis.",
      "en": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis."
    },
    "funFact": {
      "pt": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!",
      "en": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 94,
    "dayOfYear": 94,
    "month": 4,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Abril",
      "en": "April 3"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Câmaras e Microfones",
      "en": "Câmaras e Microfones"
    },
    "icon": "📹",
    "title": {
      "pt": "Em detalhe: Tapa a webcam quando não estiveres em videochamada escolar!",
      "en": "Tapa a webcam quando não estiveres em videochamada escolar!"
    },
    "teaser": {
      "pt": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara.",
      "en": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara."
    },
    "description": {
      "pt": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz.",
      "en": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz."
    },
    "whyItMatters": {
      "pt": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet.",
      "en": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet."
    },
    "funFact": {
      "pt": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!",
      "en": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 95,
    "dayOfYear": 95,
    "month": 4,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Abril",
      "en": "April 4"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Post-its no Monitor",
      "en": "Post-its no Monitor"
    },
    "icon": "📝",
    "title": {
      "pt": "Em detalhe: O erro clássico: colar papéis com a palavra-passe no ecrã do computador!",
      "en": "O erro clássico: colar papéis com a palavra-passe no ecrã do computador!"
    },
    "teaser": {
      "pt": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura.",
      "en": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura."
    },
    "description": {
      "pt": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas.",
      "en": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas."
    },
    "whyItMatters": {
      "pt": "Práticas de segurança física e lógica no manuseamento de acessos no computador.",
      "en": "Práticas de segurança física e lógica no manuseamento de acessos no computador."
    },
    "funFact": {
      "pt": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!",
      "en": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 96,
    "dayOfYear": 96,
    "month": 4,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Abril",
      "en": "April 5"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Campo Assunto",
      "en": "O Campo Assunto"
    },
    "icon": "🏷️",
    "title": {
      "pt": "Em detalhe: Nunca envies um email com o campo \"Assunto\" vazio!",
      "en": "Nunca envies um email com o campo \"Assunto\" vazio!"
    },
    "teaser": {
      "pt": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem.",
      "en": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem."
    },
    "description": {
      "pt": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\".",
      "en": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\"."
    },
    "whyItMatters": {
      "pt": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico.",
      "en": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico."
    },
    "funFact": {
      "pt": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!",
      "en": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 97,
    "dayOfYear": 97,
    "month": 4,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Abril",
      "en": "April 6"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Histórico e Cookies",
      "en": "Histórico e Cookies"
    },
    "icon": "🍪",
    "title": {
      "pt": "Em detalhe: Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!",
      "en": "Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!"
    },
    "teaser": {
      "pt": "Porque é que todos os sites perguntam se aceitas cookies?",
      "en": "Porque é que todos os sites perguntam se aceitas cookies?"
    },
    "description": {
      "pt": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites.",
      "en": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites."
    },
    "whyItMatters": {
      "pt": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC.",
      "en": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC."
    },
    "funFact": {
      "pt": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!",
      "en": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 98,
    "dayOfYear": 98,
    "month": 4,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Abril",
      "en": "April 7"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Música e Sons Livres",
      "en": "Música e Sons Livres"
    },
    "icon": "🎵",
    "title": {
      "pt": "Em detalhe: Bancos de som e música livre para os teus vídeos e jogos no Scratch!",
      "en": "Bancos de som e música livre para os teus vídeos e jogos no Scratch!"
    },
    "teaser": {
      "pt": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado.",
      "en": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado."
    },
    "description": {
      "pt": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público.",
      "en": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público."
    },
    "whyItMatters": {
      "pt": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares.",
      "en": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares."
    },
    "funFact": {
      "pt": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!",
      "en": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 99,
    "dayOfYear": 99,
    "month": 4,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Abril",
      "en": "April 8"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Robótica e Exploração",
      "en": "Robótica e Exploração"
    },
    "icon": "🤖",
    "title": {
      "pt": "Em detalhe: Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!",
      "en": "Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!"
    },
    "teaser": {
      "pt": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte.",
      "en": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte."
    },
    "description": {
      "pt": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas.",
      "en": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas."
    },
    "whyItMatters": {
      "pt": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna.",
      "en": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna."
    },
    "funFact": {
      "pt": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!",
      "en": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 100,
    "dayOfYear": 100,
    "month": 4,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Abril",
      "en": "April 9"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Iluminação do Espaço",
      "en": "Iluminação do Espaço"
    },
    "icon": "💡",
    "title": {
      "pt": "Em detalhe: Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!",
      "en": "Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!"
    },
    "teaser": {
      "pt": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?",
      "en": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?"
    },
    "description": {
      "pt": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho.",
      "en": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho."
    },
    "whyItMatters": {
      "pt": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado.",
      "en": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado."
    },
    "funFact": {
      "pt": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!",
      "en": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 101,
    "dayOfYear": 101,
    "month": 4,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Abril",
      "en": "April 10"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Engenharia Social",
      "en": "Engenharia Social"
    },
    "icon": "🎣",
    "title": {
      "pt": "Em detalhe: Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!",
      "en": "Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!"
    },
    "teaser": {
      "pt": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!",
      "en": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!"
    },
    "description": {
      "pt": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!",
      "en": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!"
    },
    "whyItMatters": {
      "pt": "Identificação de técnicas básicas de engenharia social e enganos virtuais.",
      "en": "Identificação de técnicas básicas de engenharia social e enganos virtuais."
    },
    "funFact": {
      "pt": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!",
      "en": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 102,
    "dayOfYear": 102,
    "month": 4,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Abril",
      "en": "April 11"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Bloqueio de Sessão",
      "en": "Bloqueio de Sessão"
    },
    "icon": "🔒",
    "title": {
      "pt": "Em detalhe: Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!",
      "en": "Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!"
    },
    "teaser": {
      "pt": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!",
      "en": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!"
    },
    "description": {
      "pt": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula.",
      "en": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula."
    },
    "whyItMatters": {
      "pt": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador.",
      "en": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador."
    },
    "funFact": {
      "pt": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!",
      "en": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 103,
    "dayOfYear": 103,
    "month": 4,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Abril",
      "en": "April 12"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Spam e Cadeias",
      "en": "Spam e Cadeias"
    },
    "icon": "🗑️",
    "title": {
      "pt": "Em detalhe: A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!",
      "en": "A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!"
    },
    "teaser": {
      "pt": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!",
      "en": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!"
    },
    "description": {
      "pt": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas.",
      "en": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas."
    },
    "whyItMatters": {
      "pt": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam.",
      "en": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam."
    },
    "funFact": {
      "pt": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!",
      "en": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 104,
    "dayOfYear": 104,
    "month": 4,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Abril",
      "en": "April 13"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Separadores e Janelas",
      "en": "Separadores e Janelas"
    },
    "icon": "📑",
    "title": {
      "pt": "Em detalhe: Atalhos de mestre no navegador: Control + T abre um novo separador!",
      "en": "Atalhos de mestre no navegador: Control + T abre um novo separador!"
    },
    "teaser": {
      "pt": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática.",
      "en": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática."
    },
    "description": {
      "pt": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!",
      "en": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!"
    },
    "whyItMatters": {
      "pt": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano.",
      "en": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano."
    },
    "funFact": {
      "pt": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!",
      "en": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 105,
    "dayOfYear": 105,
    "month": 4,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Abril",
      "en": "April 14"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Software Livre vs Proprietário",
      "en": "Software Livre vs Proprietário"
    },
    "icon": "🐧",
    "title": {
      "pt": "Em detalhe: Software Livre: o código aberto onde todos podem aprender e colaborar!",
      "en": "Software Livre: o código aberto onde todos podem aprender e colaborar!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?",
      "en": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?"
    },
    "description": {
      "pt": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade.",
      "en": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade."
    },
    "whyItMatters": {
      "pt": "Diferença entre licenças de software comercial, freeware, shareware e software livre.",
      "en": "Diferença entre licenças de software comercial, freeware, shareware e software livre."
    },
    "funFact": {
      "pt": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!",
      "en": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 106,
    "dayOfYear": 106,
    "month": 4,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Abril",
      "en": "April 15"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Ambiente e Sustentabilidade",
      "en": "Ambiente e Sustentabilidade"
    },
    "icon": "♻️",
    "title": {
      "pt": "Em detalhe: O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!",
      "en": "O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!"
    },
    "teaser": {
      "pt": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?",
      "en": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?"
    },
    "description": {
      "pt": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados.",
      "en": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados."
    },
    "whyItMatters": {
      "pt": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano.",
      "en": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano."
    },
    "funFact": {
      "pt": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!",
      "en": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 107,
    "dayOfYear": 107,
    "month": 4,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Abril",
      "en": "April 16"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pausas Ativas",
      "en": "Pausas Ativas"
    },
    "icon": "🏃‍♂️",
    "title": {
      "pt": "Em detalhe: Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!",
      "en": "Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!"
    },
    "teaser": {
      "pt": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas.",
      "en": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas."
    },
    "description": {
      "pt": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos.",
      "en": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos."
    },
    "whyItMatters": {
      "pt": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano.",
      "en": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano."
    },
    "funFact": {
      "pt": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!",
      "en": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 108,
    "dayOfYear": 108,
    "month": 4,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Abril",
      "en": "April 17"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Direito à Imagem",
      "en": "Direito à Imagem"
    },
    "icon": "📸",
    "title": {
      "pt": "Em detalhe: Pede sempre autorização antes de tirar ou partilhar fotos de amigos!",
      "en": "Pede sempre autorização antes de tirar ou partilhar fotos de amigos!"
    },
    "teaser": {
      "pt": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada.",
      "en": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada."
    },
    "description": {
      "pt": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares.",
      "en": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares."
    },
    "whyItMatters": {
      "pt": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade.",
      "en": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade."
    },
    "funFact": {
      "pt": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!",
      "en": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 109,
    "dayOfYear": 109,
    "month": 4,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Abril",
      "en": "April 18"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Biometria",
      "en": "Biometria"
    },
    "icon": "👁️",
    "title": {
      "pt": "Em detalhe: Impressão digital e reconhecimento facial: o teu corpo como senha!",
      "en": "Impressão digital e reconhecimento facial: o teu corpo como senha!"
    },
    "teaser": {
      "pt": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar.",
      "en": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar."
    },
    "description": {
      "pt": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos.",
      "en": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos."
    },
    "whyItMatters": {
      "pt": "Exploração das novas tecnologias de identificação e autenticação biométrica.",
      "en": "Exploração das novas tecnologias de identificação e autenticação biométrica."
    },
    "funFact": {
      "pt": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!",
      "en": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 110,
    "dayOfYear": 110,
    "month": 4,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Abril",
      "en": "April 19"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Responder a Todos",
      "en": "Responder a Todos"
    },
    "icon": "👥",
    "title": {
      "pt": "Em detalhe: Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!",
      "en": "Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!"
    },
    "teaser": {
      "pt": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\".",
      "en": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\"."
    },
    "description": {
      "pt": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!",
      "en": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!"
    },
    "whyItMatters": {
      "pt": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano.",
      "en": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano."
    },
    "funFact": {
      "pt": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!",
      "en": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 111,
    "dayOfYear": 111,
    "month": 4,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Abril",
      "en": "April 20"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Domínios e Extensões",
      "en": "Domínios e Extensões"
    },
    "icon": "🌐",
    "title": {
      "pt": "Em detalhe: O que significa .pt, .org, .edu e .gov no final dos sites?",
      "en": "O que significa .pt, .org, .edu e .gov no final dos sites?"
    },
    "teaser": {
      "pt": "A terminação do endereço da página Web revela muito sobre quem a criou.",
      "en": "A terminação do endereço da página Web revela muito sobre quem a criou."
    },
    "description": {
      "pt": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!",
      "en": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!"
    },
    "whyItMatters": {
      "pt": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional.",
      "en": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional."
    },
    "funFact": {
      "pt": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!",
      "en": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 112,
    "dayOfYear": 112,
    "month": 4,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Abril",
      "en": "April 21"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação Direta entre Aspas",
      "en": "Citação Direta entre Aspas"
    },
    "icon": "💬",
    "title": {
      "pt": "Em detalhe: Como citar uma frase de um livro no trabalho escolar sem cometer plágio?",
      "en": "Como citar uma frase de um livro no trabalho escolar sem cometer plágio?"
    },
    "teaser": {
      "pt": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!",
      "en": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!"
    },
    "description": {
      "pt": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!",
      "en": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!"
    },
    "whyItMatters": {
      "pt": "Normas de referenciação textual e integridade académica em produções escolares de TIC.",
      "en": "Normas de referenciação textual e integridade académica em produções escolares de TIC."
    },
    "funFact": {
      "pt": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\"",
      "en": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\""
    },
    "isSpecialMilestone": false
  },
  {
    "id": 113,
    "dayOfYear": 113,
    "month": 4,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Abril",
      "en": "April 22"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Hardware Interno",
      "en": "Hardware Interno"
    },
    "icon": "🧠",
    "title": {
      "pt": "Sabias também que: A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!",
      "en": "A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!"
    },
    "teaser": {
      "pt": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?",
      "en": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?"
    },
    "description": {
      "pt": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!",
      "en": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!"
    },
    "whyItMatters": {
      "pt": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes.",
      "en": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes."
    },
    "funFact": {
      "pt": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!",
      "en": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 114,
    "dayOfYear": 114,
    "month": 4,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Abril",
      "en": "April 23"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Dia Mundial do Livro e Direitos de Autor",
      "en": "World Book & Copyright Day"
    },
    "icon": "📚",
    "title": {
      "pt": "Dia Mundial do Livro e dos Direitos de Autor (UNESCO)",
      "en": "World Book and Copyright Day (UNESCO)"
    },
    "teaser": {
      "pt": "A 23 de abril celebra-se o respeito pelo trabalho de escritores, ilustradores e autores.",
      "en": "April 23 honors writers, illustrators, and digital creators worldwide."
    },
    "description": {
      "pt": "Instituído pela UNESCO, este dia celebra os livros e a propriedade intelectual. Lembra a todos que quando alguém escreve uma história, desenha uma banda desenhada ou cria um programa de computador, esse trabalho tem valor e merece ser protegido contra cópias ilegais.",
      "en": "UNESCO established this day to celebrate creative works and intellectual property protections."
    },
    "whyItMatters": {
      "pt": "No Tema 7 de TIC aprendemos que plágio e cópia não autorizada desrespeitam os criadores e prejudicam a cultura.",
      "en": "In Topic 7 we learn plagiarism hurts creators and undermines academic integrity."
    },
    "funFact": {
      "pt": "A data coincide com o dia em que morreram dois dos maiores génios da literatura: William Shakespeare e Miguel de Cervantes em 1616!",
      "en": "The date commemorates the deaths of William Shakespeare and Miguel de Cervantes in 1616!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 115,
    "dayOfYear": 115,
    "month": 4,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Abril",
      "en": "April 24"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Pegada Digital",
      "en": "Pegada Digital"
    },
    "icon": "👣",
    "title": {
      "pt": "Sabias também que: A tua Pegada Digital é como uma pegada no cimento fresco!",
      "en": "A tua Pegada Digital é como uma pegada no cimento fresco!"
    },
    "teaser": {
      "pt": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura.",
      "en": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura."
    },
    "description": {
      "pt": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes.",
      "en": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online.",
      "en": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online."
    },
    "funFact": {
      "pt": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!",
      "en": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 116,
    "dayOfYear": 116,
    "month": 4,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Abril",
      "en": "April 25"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Força de Senhas",
      "en": "Força de Senhas"
    },
    "icon": "⚡",
    "title": {
      "pt": "Sabias também que: A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!",
      "en": "A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!"
    },
    "teaser": {
      "pt": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!",
      "en": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!"
    },
    "description": {
      "pt": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores.",
      "en": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores."
    },
    "whyItMatters": {
      "pt": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares.",
      "en": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares."
    },
    "funFact": {
      "pt": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!",
      "en": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 117,
    "dayOfYear": 117,
    "month": 4,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Abril",
      "en": "April 26"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Campos do Email",
      "en": "Campos do Email"
    },
    "icon": "🕶️",
    "title": {
      "pt": "Sabias também que: O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!",
      "en": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!"
    },
    "teaser": {
      "pt": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!",
      "en": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!"
    },
    "description": {
      "pt": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados.",
      "en": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados."
    },
    "whyItMatters": {
      "pt": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD.",
      "en": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD."
    },
    "funFact": {
      "pt": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!",
      "en": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 118,
    "dayOfYear": 118,
    "month": 4,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Abril",
      "en": "April 27"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Navegador vs Motor",
      "en": "Navegador vs Motor"
    },
    "icon": "🚗",
    "title": {
      "pt": "Sabias também que: O Navegador é o Automóvel, o Motor de Busca é o GPS!",
      "en": "O Navegador é o Automóvel, o Motor de Busca é o GPS!"
    },
    "teaser": {
      "pt": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?",
      "en": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?"
    },
    "description": {
      "pt": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas.",
      "en": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas."
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca.",
      "en": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca."
    },
    "funFact": {
      "pt": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!",
      "en": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 119,
    "dayOfYear": 119,
    "month": 4,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Abril",
      "en": "April 28"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Google Imagens",
      "en": "Google Imagens"
    },
    "icon": "🎨",
    "title": {
      "pt": "Sabias também que: As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!",
      "en": "As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!"
    },
    "teaser": {
      "pt": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei.",
      "en": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei."
    },
    "description": {
      "pt": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público.",
      "en": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público."
    },
    "whyItMatters": {
      "pt": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas.",
      "en": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas."
    },
    "funFact": {
      "pt": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!",
      "en": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 120,
    "dayOfYear": 120,
    "month": 4,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Abril",
      "en": "April 29"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Memória do Computador",
      "en": "Memória do Computador"
    },
    "icon": "⚡",
    "title": {
      "pt": "Sabias também que: Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!",
      "en": "Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?",
      "en": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?"
    },
    "description": {
      "pt": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!",
      "en": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!"
    },
    "whyItMatters": {
      "pt": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC.",
      "en": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC."
    },
    "funFact": {
      "pt": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!",
      "en": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 121,
    "dayOfYear": 121,
    "month": 4,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Abril",
      "en": "April 30"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Cuidado com os Olhos",
      "en": "Cuidado com os Olhos"
    },
    "icon": "👀",
    "title": {
      "pt": "Sabias também que: A Regra 20-20-20: o descanso favorito dos teus olhos!",
      "en": "A Regra 20-20-20: o descanso favorito dos teus olhos!"
    },
    "teaser": {
      "pt": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?",
      "en": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?"
    },
    "description": {
      "pt": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!",
      "en": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!"
    },
    "whyItMatters": {
      "pt": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano.",
      "en": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano."
    },
    "funFact": {
      "pt": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!",
      "en": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 122,
    "dayOfYear": 122,
    "month": 5,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Maio",
      "en": "May 1"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Privacidade e Redes",
      "en": "Privacidade e Redes"
    },
    "icon": "🕵️‍♂️",
    "title": {
      "pt": "Sabias também que: A regra do \"Estranho no Jardim\": nada de moradas em jogos online!",
      "en": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!"
    },
    "teaser": {
      "pt": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa.",
      "en": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa."
    },
    "description": {
      "pt": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online.",
      "en": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online."
    },
    "whyItMatters": {
      "pt": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital.",
      "en": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital."
    },
    "funFact": {
      "pt": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!",
      "en": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 123,
    "dayOfYear": 123,
    "month": 5,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Maio",
      "en": "May 2"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "O Segredo da Frase-Passe",
      "en": "O Segredo da Frase-Passe"
    },
    "icon": "🍕",
    "title": {
      "pt": "Sabias também que: O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!",
      "en": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!"
    },
    "teaser": {
      "pt": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar.",
      "en": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar."
    },
    "description": {
      "pt": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!",
      "en": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!"
    },
    "whyItMatters": {
      "pt": "Construção de palavras-passe fortes com base em frases mnemónicas compridas.",
      "en": "Construção de palavras-passe fortes com base em frases mnemónicas compridas."
    },
    "funFact": {
      "pt": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!",
      "en": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 124,
    "dayOfYear": 124,
    "month": 5,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Maio",
      "en": "May 3"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Símbolo Arroba",
      "en": "O Símbolo Arroba"
    },
    "icon": "🐌",
    "title": {
      "pt": "Sabias também que: O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!",
      "en": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!"
    },
    "teaser": {
      "pt": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino.",
      "en": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino."
    },
    "description": {
      "pt": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!",
      "en": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!"
    },
    "whyItMatters": {
      "pt": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao.",
      "en": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao."
    },
    "funFact": {
      "pt": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!",
      "en": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 125,
    "dayOfYear": 125,
    "month": 5,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Maio",
      "en": "May 4"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Dia Mundial da Senha",
      "en": "World Password Day"
    },
    "icon": "🔑",
    "title": {
      "pt": "Dia Mundial da Palavra-passe: Muda a tua senha fraca!",
      "en": "World Password Day: Update your weak password!"
    },
    "teaser": {
      "pt": "Na primeira quinta-feira de maio, a comunidade digital alerta para a segurança das contas.",
      "en": "Celebrated in early May, alerting everyone to audit and strengthen their credentials."
    },
    "description": {
      "pt": "Criado pela Intel e especialistas de cibersegurança, o Dia Mundial da Palavra-passe incentiva todos a verificarem se usam senhas repetidas e a ativarem a autenticação em dois fatores (2FA) nas suas contas de jogos e redes.",
      "en": "World Password Day urges users to stop repeating passwords and turn on 2-factor authentication."
    },
    "whyItMatters": {
      "pt": "No Tema 4 de TIC aprendemos que uma palavra-passe forte deve ter pelo menos 12 carateres e misturar letras, números e símbolos.",
      "en": "In Topic 4 we learn strong passwords need at least 12 characters mixing letters, numbers, and symbols."
    },
    "funFact": {
      "pt": "Muitos fãs celebram também \"Star Wars Day\" a 4 de maio (\"May the 4th be with you\"), tornando este dia duplamente galáctico!",
      "en": "May 4 is also Star Wars Day (\"May the Fourth be with you\"), making it twice as fun!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 126,
    "dayOfYear": 126,
    "month": 5,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Maio",
      "en": "May 5"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "O que é Plágio",
      "en": "O que é Plágio"
    },
    "icon": "✂️",
    "title": {
      "pt": "Sabias também que: Plágio: roubar a medalha de ouro de outra pessoa!",
      "en": "Plágio: roubar a medalha de ouro de outra pessoa!"
    },
    "teaser": {
      "pt": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica.",
      "en": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica."
    },
    "description": {
      "pt": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste.",
      "en": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste."
    },
    "whyItMatters": {
      "pt": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano.",
      "en": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano."
    },
    "funFact": {
      "pt": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!",
      "en": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 127,
    "dayOfYear": 127,
    "month": 5,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Maio",
      "en": "May 6"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Placa Principal",
      "en": "Placa Principal"
    },
    "icon": "🛣️",
    "title": {
      "pt": "Sabias também que: A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!",
      "en": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!"
    },
    "teaser": {
      "pt": "Como é que a placa gráfica fala com o processador e com o disco rígido?",
      "en": "Como é que a placa gráfica fala com o processador e com o disco rígido?"
    },
    "description": {
      "pt": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI.",
      "en": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus).",
      "en": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus)."
    },
    "funFact": {
      "pt": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!",
      "en": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 128,
    "dayOfYear": 128,
    "month": 5,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Maio",
      "en": "May 7"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Sono e Tecnologia",
      "en": "Sono e Tecnologia"
    },
    "icon": "🌙",
    "title": {
      "pt": "Sabias também que: A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\"",
      "en": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\""
    },
    "teaser": {
      "pt": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?",
      "en": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?"
    },
    "description": {
      "pt": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola.",
      "en": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola."
    },
    "whyItMatters": {
      "pt": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias.",
      "en": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias."
    },
    "funFact": {
      "pt": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!",
      "en": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 129,
    "dayOfYear": 129,
    "month": 5,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Maio",
      "en": "May 8"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Apoio e Helplines",
      "en": "Apoio e Helplines"
    },
    "icon": "📞",
    "title": {
      "pt": "Sabias também que: Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!",
      "en": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!"
    },
    "teaser": {
      "pt": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar.",
      "en": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar."
    },
    "description": {
      "pt": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!",
      "en": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!"
    },
    "whyItMatters": {
      "pt": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental.",
      "en": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental."
    },
    "funFact": {
      "pt": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!",
      "en": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 130,
    "dayOfYear": 130,
    "month": 5,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Maio",
      "en": "May 9"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Partilha de Senhas",
      "en": "Partilha de Senhas"
    },
    "icon": "🪥",
    "title": {
      "pt": "Sabias também que: Palavras-passe são como escovas de dentes: não se emprestam a ninguém!",
      "en": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!"
    },
    "teaser": {
      "pt": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital.",
      "en": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital."
    },
    "description": {
      "pt": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem.",
      "en": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem."
    },
    "whyItMatters": {
      "pt": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal.",
      "en": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal."
    },
    "funFact": {
      "pt": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!",
      "en": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 131,
    "dayOfYear": 131,
    "month": 5,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Maio",
      "en": "May 10"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Netiqueta em Emails",
      "en": "Netiqueta em Emails"
    },
    "icon": "📢",
    "title": {
      "pt": "Sabias também que: Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!",
      "en": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!"
    },
    "teaser": {
      "pt": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais.",
      "en": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais."
    },
    "description": {
      "pt": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã.",
      "en": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã."
    },
    "whyItMatters": {
      "pt": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico.",
      "en": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico."
    },
    "funFact": {
      "pt": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!",
      "en": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 132,
    "dayOfYear": 132,
    "month": 5,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Maio",
      "en": "May 11"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Segurança HTTPS",
      "en": "Segurança HTTPS"
    },
    "icon": "🔒",
    "title": {
      "pt": "Sabias também que: O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!",
      "en": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!"
    },
    "teaser": {
      "pt": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\".",
      "en": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\"."
    },
    "description": {
      "pt": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias.",
      "en": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias."
    },
    "whyItMatters": {
      "pt": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC.",
      "en": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC."
    },
    "funFact": {
      "pt": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!",
      "en": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 133,
    "dayOfYear": 133,
    "month": 5,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Maio",
      "en": "May 12"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Creative Commons",
      "en": "Creative Commons"
    },
    "icon": "🤝",
    "title": {
      "pt": "Sabias também que: Creative Commons: o convite amigável para partilhar criatividade com o mundo!",
      "en": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!"
    },
    "teaser": {
      "pt": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?",
      "en": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?"
    },
    "description": {
      "pt": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\".",
      "en": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\"."
    },
    "whyItMatters": {
      "pt": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7.",
      "en": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7."
    },
    "funFact": {
      "pt": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!",
      "en": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 134,
    "dayOfYear": 134,
    "month": 5,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Maio",
      "en": "May 13"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Linguagem dos Computadores",
      "en": "Linguagem dos Computadores"
    },
    "icon": "0️⃣",
    "title": {
      "pt": "Sabias também que: Tudo no computador são apenas ZEROS e UNS (0 e 1)!",
      "en": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!"
    },
    "teaser": {
      "pt": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?",
      "en": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?"
    },
    "description": {
      "pt": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!",
      "en": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!"
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte.",
      "en": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte."
    },
    "funFact": {
      "pt": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!",
      "en": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 135,
    "dayOfYear": 135,
    "month": 5,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Maio",
      "en": "May 14"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pescoço e Coluna",
      "en": "Pescoço e Coluna"
    },
    "icon": "🦒",
    "title": {
      "pt": "Sabias também que: O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!",
      "en": "O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!"
    },
    "teaser": {
      "pt": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento.",
      "en": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento."
    },
    "description": {
      "pt": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!",
      "en": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!"
    },
    "whyItMatters": {
      "pt": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial.",
      "en": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial."
    },
    "funFact": {
      "pt": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!",
      "en": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 136,
    "dayOfYear": 136,
    "month": 5,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Maio",
      "en": "May 15"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Netiqueta e Empatia",
      "en": "Netiqueta e Empatia"
    },
    "icon": "💬",
    "title": {
      "pt": "Sabias também que: Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!",
      "en": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!"
    },
    "teaser": {
      "pt": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?",
      "en": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?"
    },
    "description": {
      "pt": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa.",
      "en": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa."
    },
    "whyItMatters": {
      "pt": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano.",
      "en": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano."
    },
    "funFact": {
      "pt": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!",
      "en": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 137,
    "dayOfYear": 137,
    "month": 5,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Maio",
      "en": "May 16"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Autenticação de 2 Fatores",
      "en": "Autenticação de 2 Fatores"
    },
    "icon": "📲",
    "title": {
      "pt": "Sabias também que: Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!",
      "en": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!"
    },
    "teaser": {
      "pt": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.",
      "en": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código."
    },
    "description": {
      "pt": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes.",
      "en": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes."
    },
    "whyItMatters": {
      "pt": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC.",
      "en": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC."
    },
    "funFact": {
      "pt": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!",
      "en": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 138,
    "dayOfYear": 138,
    "month": 5,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Maio",
      "en": "May 17"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Sociedade da Informação",
      "en": "Information Society Day"
    },
    "icon": "🌐",
    "title": {
      "pt": "Dia Mundial das Telecomunicações e Sociedade da Informação",
      "en": "World Telecommunication & Information Society Day"
    },
    "teaser": {
      "pt": "Celebrado desde 1969 pela União Internacional das Telecomunicações.",
      "en": "Celebrated since 1969 by the International Telecommunication Union."
    },
    "description": {
      "pt": "Este dia destaca como a Internet e a tecnologia digital ajudam a aproximar os povos, melhorar a educação escolar e reduzir as desigualdades sociais e económicas no mundo.",
      "en": "Highlights how the Internet and tech connect humanity, empower schools, and bridge gaps."
    },
    "whyItMatters": {
      "pt": "No Tema 1 estudamos a importância das TIC para a medicina, agricultura, meteorologia e sustentabilidade do planeta.",
      "en": "In Topic 1 we explore how ICT transforms healthcare, ecology, and climate forecasting."
    },
    "funFact": {
      "pt": "Em 1865, a primeira convenção de telecomunicações foi assinada para regular... o telégrafo com código Morse!",
      "en": "In 1865, the first telecom convention was signed to regulate Morse code telegraphs!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 139,
    "dayOfYear": 139,
    "month": 5,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Maio",
      "en": "May 18"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Combate a Fake News",
      "en": "Combate a Fake News"
    },
    "icon": "🕵️‍♀️",
    "title": {
      "pt": "Sabias também que: O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!",
      "en": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!"
    },
    "teaser": {
      "pt": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções.",
      "en": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções."
    },
    "description": {
      "pt": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?",
      "en": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?"
    },
    "whyItMatters": {
      "pt": "Literacia da informação e espírito crítico na avaliação de fontes da Web.",
      "en": "Literacia da informação e espírito crítico na avaliação de fontes da Web."
    },
    "funFact": {
      "pt": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!",
      "en": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 140,
    "dayOfYear": 140,
    "month": 5,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Maio",
      "en": "May 19"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação e Bibliografia",
      "en": "Citação e Bibliografia"
    },
    "icon": "📚",
    "title": {
      "pt": "Sabias também que: Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!",
      "en": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!"
    },
    "teaser": {
      "pt": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!",
      "en": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!"
    },
    "description": {
      "pt": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso.",
      "en": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso."
    },
    "whyItMatters": {
      "pt": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC.",
      "en": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC."
    },
    "funFact": {
      "pt": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!",
      "en": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 141,
    "dayOfYear": 141,
    "month": 5,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Maio",
      "en": "May 20"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Periféricos de TIC",
      "en": "Periféricos de TIC"
    },
    "icon": "🖨️",
    "title": {
      "pt": "Sabias também que: Periféricos: a ponte mágica entre o ser humano e a máquina!",
      "en": "Periféricos: a ponte mágica entre o ser humano e a máquina!"
    },
    "teaser": {
      "pt": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?",
      "en": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?"
    },
    "description": {
      "pt": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!",
      "en": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!"
    },
    "whyItMatters": {
      "pt": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1.",
      "en": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1."
    },
    "funFact": {
      "pt": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!",
      "en": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 142,
    "dayOfYear": 142,
    "month": 5,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Maio",
      "en": "May 21"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Volume e Audição",
      "en": "Volume e Audição"
    },
    "icon": "🎧",
    "title": {
      "pt": "Sabias também que: A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!",
      "en": "A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!"
    },
    "teaser": {
      "pt": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição.",
      "en": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição."
    },
    "description": {
      "pt": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!",
      "en": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!"
    },
    "whyItMatters": {
      "pt": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC.",
      "en": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC."
    },
    "funFact": {
      "pt": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!",
      "en": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 143,
    "dayOfYear": 143,
    "month": 5,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Maio",
      "en": "May 22"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Localização GPS",
      "en": "Localização GPS"
    },
    "icon": "📍",
    "title": {
      "pt": "Sabias também que: Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!",
      "en": "Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!"
    },
    "teaser": {
      "pt": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?",
      "en": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?"
    },
    "description": {
      "pt": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives.",
      "en": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives."
    },
    "whyItMatters": {
      "pt": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros.",
      "en": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros."
    },
    "funFact": {
      "pt": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!",
      "en": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 144,
    "dayOfYear": 144,
    "month": 5,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Maio",
      "en": "May 23"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Gestores de Senhas",
      "en": "Gestores de Senhas"
    },
    "icon": "🗄️",
    "title": {
      "pt": "Sabias também que: Nunca repitas a mesma palavra-passe em todos os sites e aplicações!",
      "en": "Nunca repitas a mesma palavra-passe em todos os sites e aplicações!"
    },
    "teaser": {
      "pt": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco.",
      "en": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco."
    },
    "description": {
      "pt": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido.",
      "en": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido."
    },
    "whyItMatters": {
      "pt": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano.",
      "en": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano."
    },
    "funFact": {
      "pt": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!",
      "en": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 145,
    "dayOfYear": 145,
    "month": 5,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Maio",
      "en": "May 24"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Phishing por Email",
      "en": "Phishing por Email"
    },
    "icon": "🎣",
    "title": {
      "pt": "Sabias também que: Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!",
      "en": "Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!"
    },
    "teaser": {
      "pt": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!",
      "en": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!"
    },
    "description": {
      "pt": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!",
      "en": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!"
    },
    "whyItMatters": {
      "pt": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing.",
      "en": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing."
    },
    "funFact": {
      "pt": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!",
      "en": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 146,
    "dayOfYear": 146,
    "month": 5,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Maio",
      "en": "May 25"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Aranhas da Web",
      "en": "Aranhas da Web"
    },
    "icon": "🕷️",
    "title": {
      "pt": "Sabias também que: As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!",
      "en": "As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!"
    },
    "teaser": {
      "pt": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?",
      "en": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?"
    },
    "description": {
      "pt": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice.",
      "en": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice."
    },
    "whyItMatters": {
      "pt": "Compreender como a informação é indexada e recuperada nos motores de pesquisa.",
      "en": "Compreender como a informação é indexada e recuperada nos motores de pesquisa."
    },
    "funFact": {
      "pt": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!",
      "en": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 147,
    "dayOfYear": 147,
    "month": 5,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Maio",
      "en": "May 26"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Domínio Público",
      "en": "Domínio Público"
    },
    "icon": "🏛️",
    "title": {
      "pt": "Sabias também que: O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!",
      "en": "O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!"
    },
    "teaser": {
      "pt": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?",
      "en": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?"
    },
    "description": {
      "pt": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!",
      "en": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!"
    },
    "whyItMatters": {
      "pt": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum.",
      "en": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum."
    },
    "funFact": {
      "pt": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!",
      "en": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 148,
    "dayOfYear": 148,
    "month": 5,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Maio",
      "en": "May 27"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História do Rato",
      "en": "História do Rato"
    },
    "icon": "🖱️",
    "title": {
      "pt": "Sabias também que: O primeiro rato do mundo foi feito de madeira com rodas de metal!",
      "en": "O primeiro rato do mundo foi feito de madeira com rodas de metal!"
    },
    "teaser": {
      "pt": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo.",
      "en": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo."
    },
    "description": {
      "pt": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!",
      "en": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!"
    },
    "whyItMatters": {
      "pt": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC.",
      "en": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC."
    },
    "funFact": {
      "pt": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!",
      "en": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 149,
    "dayOfYear": 149,
    "month": 5,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Maio",
      "en": "May 28"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Mochila Escolar",
      "en": "Mochila Escolar"
    },
    "icon": "🎒",
    "title": {
      "pt": "Sabias também que: O peso da mochila não deve ultrapassar 10% do teu peso corporal!",
      "en": "O peso da mochila não deve ultrapassar 10% do teu peso corporal!"
    },
    "teaser": {
      "pt": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização.",
      "en": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização."
    },
    "description": {
      "pt": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só.",
      "en": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só."
    },
    "whyItMatters": {
      "pt": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis.",
      "en": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis."
    },
    "funFact": {
      "pt": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!",
      "en": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 150,
    "dayOfYear": 150,
    "month": 5,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Maio",
      "en": "May 29"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Câmaras e Microfones",
      "en": "Câmaras e Microfones"
    },
    "icon": "📹",
    "title": {
      "pt": "Sabias também que: Tapa a webcam quando não estiveres em videochamada escolar!",
      "en": "Tapa a webcam quando não estiveres em videochamada escolar!"
    },
    "teaser": {
      "pt": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara.",
      "en": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara."
    },
    "description": {
      "pt": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz.",
      "en": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz."
    },
    "whyItMatters": {
      "pt": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet.",
      "en": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet."
    },
    "funFact": {
      "pt": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!",
      "en": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 151,
    "dayOfYear": 151,
    "month": 5,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Maio",
      "en": "May 30"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Post-its no Monitor",
      "en": "Post-its no Monitor"
    },
    "icon": "📝",
    "title": {
      "pt": "Sabias também que: O erro clássico: colar papéis com a palavra-passe no ecrã do computador!",
      "en": "O erro clássico: colar papéis com a palavra-passe no ecrã do computador!"
    },
    "teaser": {
      "pt": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura.",
      "en": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura."
    },
    "description": {
      "pt": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas.",
      "en": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas."
    },
    "whyItMatters": {
      "pt": "Práticas de segurança física e lógica no manuseamento de acessos no computador.",
      "en": "Práticas de segurança física e lógica no manuseamento de acessos no computador."
    },
    "funFact": {
      "pt": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!",
      "en": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 152,
    "dayOfYear": 152,
    "month": 5,
    "day": 31,
    "dateLabel": {
      "pt": "31 de Maio",
      "en": "May 31"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Campo Assunto",
      "en": "O Campo Assunto"
    },
    "icon": "🏷️",
    "title": {
      "pt": "Sabias também que: Nunca envies um email com o campo \"Assunto\" vazio!",
      "en": "Nunca envies um email com o campo \"Assunto\" vazio!"
    },
    "teaser": {
      "pt": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem.",
      "en": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem."
    },
    "description": {
      "pt": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\".",
      "en": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\"."
    },
    "whyItMatters": {
      "pt": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico.",
      "en": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico."
    },
    "funFact": {
      "pt": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!",
      "en": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 153,
    "dayOfYear": 153,
    "month": 6,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Junho",
      "en": "June 1"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Histórico e Cookies",
      "en": "Histórico e Cookies"
    },
    "icon": "🍪",
    "title": {
      "pt": "Sabias também que: Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!",
      "en": "Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!"
    },
    "teaser": {
      "pt": "Porque é que todos os sites perguntam se aceitas cookies?",
      "en": "Porque é que todos os sites perguntam se aceitas cookies?"
    },
    "description": {
      "pt": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites.",
      "en": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites."
    },
    "whyItMatters": {
      "pt": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC.",
      "en": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC."
    },
    "funFact": {
      "pt": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!",
      "en": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 154,
    "dayOfYear": 154,
    "month": 6,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Junho",
      "en": "June 2"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Música e Sons Livres",
      "en": "Música e Sons Livres"
    },
    "icon": "🎵",
    "title": {
      "pt": "Sabias também que: Bancos de som e música livre para os teus vídeos e jogos no Scratch!",
      "en": "Bancos de som e música livre para os teus vídeos e jogos no Scratch!"
    },
    "teaser": {
      "pt": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado.",
      "en": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado."
    },
    "description": {
      "pt": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público.",
      "en": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público."
    },
    "whyItMatters": {
      "pt": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares.",
      "en": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares."
    },
    "funFact": {
      "pt": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!",
      "en": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 155,
    "dayOfYear": 155,
    "month": 6,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Junho",
      "en": "June 3"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Robótica e Exploração",
      "en": "Robótica e Exploração"
    },
    "icon": "🤖",
    "title": {
      "pt": "Sabias também que: Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!",
      "en": "Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!"
    },
    "teaser": {
      "pt": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte.",
      "en": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte."
    },
    "description": {
      "pt": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas.",
      "en": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas."
    },
    "whyItMatters": {
      "pt": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna.",
      "en": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna."
    },
    "funFact": {
      "pt": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!",
      "en": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 156,
    "dayOfYear": 156,
    "month": 6,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Junho",
      "en": "June 4"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Iluminação do Espaço",
      "en": "Iluminação do Espaço"
    },
    "icon": "💡",
    "title": {
      "pt": "Sabias também que: Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!",
      "en": "Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!"
    },
    "teaser": {
      "pt": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?",
      "en": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?"
    },
    "description": {
      "pt": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho.",
      "en": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho."
    },
    "whyItMatters": {
      "pt": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado.",
      "en": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado."
    },
    "funFact": {
      "pt": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!",
      "en": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 157,
    "dayOfYear": 157,
    "month": 6,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Junho",
      "en": "June 5"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Engenharia Social",
      "en": "Engenharia Social"
    },
    "icon": "🎣",
    "title": {
      "pt": "Sabias também que: Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!",
      "en": "Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!"
    },
    "teaser": {
      "pt": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!",
      "en": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!"
    },
    "description": {
      "pt": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!",
      "en": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!"
    },
    "whyItMatters": {
      "pt": "Identificação de técnicas básicas de engenharia social e enganos virtuais.",
      "en": "Identificação de técnicas básicas de engenharia social e enganos virtuais."
    },
    "funFact": {
      "pt": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!",
      "en": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 158,
    "dayOfYear": 158,
    "month": 6,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Junho",
      "en": "June 6"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Bloqueio de Sessão",
      "en": "Bloqueio de Sessão"
    },
    "icon": "🔒",
    "title": {
      "pt": "Sabias também que: Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!",
      "en": "Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!"
    },
    "teaser": {
      "pt": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!",
      "en": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!"
    },
    "description": {
      "pt": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula.",
      "en": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula."
    },
    "whyItMatters": {
      "pt": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador.",
      "en": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador."
    },
    "funFact": {
      "pt": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!",
      "en": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 159,
    "dayOfYear": 159,
    "month": 6,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Junho",
      "en": "June 7"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Spam e Cadeias",
      "en": "Spam e Cadeias"
    },
    "icon": "🗑️",
    "title": {
      "pt": "Sabias também que: A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!",
      "en": "A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!"
    },
    "teaser": {
      "pt": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!",
      "en": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!"
    },
    "description": {
      "pt": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas.",
      "en": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas."
    },
    "whyItMatters": {
      "pt": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam.",
      "en": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam."
    },
    "funFact": {
      "pt": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!",
      "en": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 160,
    "dayOfYear": 160,
    "month": 6,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Junho",
      "en": "June 8"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Separadores e Janelas",
      "en": "Separadores e Janelas"
    },
    "icon": "📑",
    "title": {
      "pt": "Sabias também que: Atalhos de mestre no navegador: Control + T abre um novo separador!",
      "en": "Atalhos de mestre no navegador: Control + T abre um novo separador!"
    },
    "teaser": {
      "pt": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática.",
      "en": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática."
    },
    "description": {
      "pt": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!",
      "en": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!"
    },
    "whyItMatters": {
      "pt": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano.",
      "en": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano."
    },
    "funFact": {
      "pt": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!",
      "en": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 161,
    "dayOfYear": 161,
    "month": 6,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Junho",
      "en": "June 9"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Software Livre vs Proprietário",
      "en": "Software Livre vs Proprietário"
    },
    "icon": "🐧",
    "title": {
      "pt": "Sabias também que: Software Livre: o código aberto onde todos podem aprender e colaborar!",
      "en": "Software Livre: o código aberto onde todos podem aprender e colaborar!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?",
      "en": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?"
    },
    "description": {
      "pt": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade.",
      "en": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade."
    },
    "whyItMatters": {
      "pt": "Diferença entre licenças de software comercial, freeware, shareware e software livre.",
      "en": "Diferença entre licenças de software comercial, freeware, shareware e software livre."
    },
    "funFact": {
      "pt": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!",
      "en": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 162,
    "dayOfYear": 162,
    "month": 6,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Junho",
      "en": "June 10"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Ambiente e Sustentabilidade",
      "en": "Ambiente e Sustentabilidade"
    },
    "icon": "♻️",
    "title": {
      "pt": "Sabias também que: O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!",
      "en": "O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!"
    },
    "teaser": {
      "pt": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?",
      "en": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?"
    },
    "description": {
      "pt": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados.",
      "en": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados."
    },
    "whyItMatters": {
      "pt": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano.",
      "en": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano."
    },
    "funFact": {
      "pt": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!",
      "en": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 163,
    "dayOfYear": 163,
    "month": 6,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Junho",
      "en": "June 11"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pausas Ativas",
      "en": "Pausas Ativas"
    },
    "icon": "🏃‍♂️",
    "title": {
      "pt": "Sabias também que: Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!",
      "en": "Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!"
    },
    "teaser": {
      "pt": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas.",
      "en": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas."
    },
    "description": {
      "pt": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos.",
      "en": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos."
    },
    "whyItMatters": {
      "pt": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano.",
      "en": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano."
    },
    "funFact": {
      "pt": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!",
      "en": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 164,
    "dayOfYear": 164,
    "month": 6,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Junho",
      "en": "June 12"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Direito à Imagem",
      "en": "Direito à Imagem"
    },
    "icon": "📸",
    "title": {
      "pt": "Sabias também que: Pede sempre autorização antes de tirar ou partilhar fotos de amigos!",
      "en": "Pede sempre autorização antes de tirar ou partilhar fotos de amigos!"
    },
    "teaser": {
      "pt": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada.",
      "en": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada."
    },
    "description": {
      "pt": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares.",
      "en": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares."
    },
    "whyItMatters": {
      "pt": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade.",
      "en": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade."
    },
    "funFact": {
      "pt": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!",
      "en": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 165,
    "dayOfYear": 165,
    "month": 6,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Junho",
      "en": "June 13"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Biometria",
      "en": "Biometria"
    },
    "icon": "👁️",
    "title": {
      "pt": "Sabias também que: Impressão digital e reconhecimento facial: o teu corpo como senha!",
      "en": "Impressão digital e reconhecimento facial: o teu corpo como senha!"
    },
    "teaser": {
      "pt": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar.",
      "en": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar."
    },
    "description": {
      "pt": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos.",
      "en": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos."
    },
    "whyItMatters": {
      "pt": "Exploração das novas tecnologias de identificação e autenticação biométrica.",
      "en": "Exploração das novas tecnologias de identificação e autenticação biométrica."
    },
    "funFact": {
      "pt": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!",
      "en": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 166,
    "dayOfYear": 166,
    "month": 6,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Junho",
      "en": "June 14"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Responder a Todos",
      "en": "Responder a Todos"
    },
    "icon": "👥",
    "title": {
      "pt": "Sabias também que: Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!",
      "en": "Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!"
    },
    "teaser": {
      "pt": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\".",
      "en": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\"."
    },
    "description": {
      "pt": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!",
      "en": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!"
    },
    "whyItMatters": {
      "pt": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano.",
      "en": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano."
    },
    "funFact": {
      "pt": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!",
      "en": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 167,
    "dayOfYear": 167,
    "month": 6,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Junho",
      "en": "June 15"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Domínios e Extensões",
      "en": "Domínios e Extensões"
    },
    "icon": "🌐",
    "title": {
      "pt": "Sabias também que: O que significa .pt, .org, .edu e .gov no final dos sites?",
      "en": "O que significa .pt, .org, .edu e .gov no final dos sites?"
    },
    "teaser": {
      "pt": "A terminação do endereço da página Web revela muito sobre quem a criou.",
      "en": "A terminação do endereço da página Web revela muito sobre quem a criou."
    },
    "description": {
      "pt": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!",
      "en": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!"
    },
    "whyItMatters": {
      "pt": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional.",
      "en": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional."
    },
    "funFact": {
      "pt": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!",
      "en": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 168,
    "dayOfYear": 168,
    "month": 6,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Junho",
      "en": "June 16"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação Direta entre Aspas",
      "en": "Citação Direta entre Aspas"
    },
    "icon": "💬",
    "title": {
      "pt": "Sabias também que: Como citar uma frase de um livro no trabalho escolar sem cometer plágio?",
      "en": "Como citar uma frase de um livro no trabalho escolar sem cometer plágio?"
    },
    "teaser": {
      "pt": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!",
      "en": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!"
    },
    "description": {
      "pt": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!",
      "en": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!"
    },
    "whyItMatters": {
      "pt": "Normas de referenciação textual e integridade académica em produções escolares de TIC.",
      "en": "Normas de referenciação textual e integridade académica em produções escolares de TIC."
    },
    "funFact": {
      "pt": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\"",
      "en": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\""
    },
    "isSpecialMilestone": false
  },
  {
    "id": 169,
    "dayOfYear": 169,
    "month": 6,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Junho",
      "en": "June 17"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Hardware Interno",
      "en": "Hardware Interno"
    },
    "icon": "🧠",
    "title": {
      "pt": "Para as tuas aulas: A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!",
      "en": "A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!"
    },
    "teaser": {
      "pt": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?",
      "en": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?"
    },
    "description": {
      "pt": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!",
      "en": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!"
    },
    "whyItMatters": {
      "pt": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes.",
      "en": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes."
    },
    "funFact": {
      "pt": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!",
      "en": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 170,
    "dayOfYear": 170,
    "month": 6,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Junho",
      "en": "June 18"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Postura na Cadeira",
      "en": "Postura na Cadeira"
    },
    "icon": "🪑",
    "title": {
      "pt": "Para as tuas aulas: A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!",
      "en": "A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!"
    },
    "teaser": {
      "pt": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?",
      "en": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?"
    },
    "description": {
      "pt": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares.",
      "en": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares."
    },
    "whyItMatters": {
      "pt": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito.",
      "en": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito."
    },
    "funFact": {
      "pt": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!",
      "en": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 171,
    "dayOfYear": 171,
    "month": 6,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Junho",
      "en": "June 19"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Pegada Digital",
      "en": "Pegada Digital"
    },
    "icon": "👣",
    "title": {
      "pt": "Para as tuas aulas: A tua Pegada Digital é como uma pegada no cimento fresco!",
      "en": "A tua Pegada Digital é como uma pegada no cimento fresco!"
    },
    "teaser": {
      "pt": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura.",
      "en": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura."
    },
    "description": {
      "pt": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes.",
      "en": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online.",
      "en": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online."
    },
    "funFact": {
      "pt": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!",
      "en": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 172,
    "dayOfYear": 172,
    "month": 6,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Junho",
      "en": "June 20"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Força de Senhas",
      "en": "Força de Senhas"
    },
    "icon": "⚡",
    "title": {
      "pt": "Para as tuas aulas: A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!",
      "en": "A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!"
    },
    "teaser": {
      "pt": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!",
      "en": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!"
    },
    "description": {
      "pt": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores.",
      "en": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores."
    },
    "whyItMatters": {
      "pt": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares.",
      "en": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares."
    },
    "funFact": {
      "pt": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!",
      "en": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 173,
    "dayOfYear": 173,
    "month": 6,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Junho",
      "en": "June 21"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Campos do Email",
      "en": "Campos do Email"
    },
    "icon": "🕶️",
    "title": {
      "pt": "Para as tuas aulas: O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!",
      "en": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!"
    },
    "teaser": {
      "pt": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!",
      "en": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!"
    },
    "description": {
      "pt": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados.",
      "en": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados."
    },
    "whyItMatters": {
      "pt": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD.",
      "en": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD."
    },
    "funFact": {
      "pt": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!",
      "en": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 174,
    "dayOfYear": 174,
    "month": 6,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Junho",
      "en": "June 22"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Navegador vs Motor",
      "en": "Navegador vs Motor"
    },
    "icon": "🚗",
    "title": {
      "pt": "Para as tuas aulas: O Navegador é o Automóvel, o Motor de Busca é o GPS!",
      "en": "O Navegador é o Automóvel, o Motor de Busca é o GPS!"
    },
    "teaser": {
      "pt": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?",
      "en": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?"
    },
    "description": {
      "pt": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas.",
      "en": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas."
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca.",
      "en": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca."
    },
    "funFact": {
      "pt": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!",
      "en": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 175,
    "dayOfYear": 175,
    "month": 6,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Junho",
      "en": "June 23"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Pioneiros da Computação",
      "en": "Pioneers of Computing"
    },
    "icon": "🧠",
    "title": {
      "pt": "Aniversário de Alan Turing: O Pai da Inteligência Artificial!",
      "en": "Alan Turing's Birthday: Father of Artificial Intelligence!"
    },
    "teaser": {
      "pt": "Nascido a 23 de junho de 1912, Turing decifrou códigos secretos na Segunda Guerra Mundial.",
      "en": "Born June 23, 1912, Turing cracked secret Enigma codes in World War II."
    },
    "description": {
      "pt": "Alan Turing foi um matemático britânico genial. Ele inventou o conceito da máquina de Turing (a base de todos os computadores modernos) e criou o \"Teste de Turing\" para determinar se uma máquina exibe comportamento inteligente idêntico ao de um ser humano.",
      "en": "Alan Turing founded theoretical computer science and created the Turing Test for AI."
    },
    "whyItMatters": {
      "pt": "Graças a Turing, a ciência da computação nasceu formalmente, permitindo o desenvolvimento de todo o software e hardware atual.",
      "en": "Thanks to Turing, modern computer science was established, paving the way for all software."
    },
    "funFact": {
      "pt": "A máquina que ele construiu para quebrar os códigos dos submarinos alemães chamava-se \"Bombe\" e usava tambores giratórios eletromecânicos!",
      "en": "The machine he designed to break Enigma codes was called \"Bombe\" and used spinning electromechanical drums!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 176,
    "dayOfYear": 176,
    "month": 6,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Junho",
      "en": "June 24"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Memória do Computador",
      "en": "Memória do Computador"
    },
    "icon": "⚡",
    "title": {
      "pt": "Para as tuas aulas: Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!",
      "en": "Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?",
      "en": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?"
    },
    "description": {
      "pt": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!",
      "en": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!"
    },
    "whyItMatters": {
      "pt": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC.",
      "en": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC."
    },
    "funFact": {
      "pt": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!",
      "en": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 177,
    "dayOfYear": 177,
    "month": 6,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Junho",
      "en": "June 25"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Cuidado com os Olhos",
      "en": "Cuidado com os Olhos"
    },
    "icon": "👀",
    "title": {
      "pt": "Para as tuas aulas: A Regra 20-20-20: o descanso favorito dos teus olhos!",
      "en": "A Regra 20-20-20: o descanso favorito dos teus olhos!"
    },
    "teaser": {
      "pt": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?",
      "en": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?"
    },
    "description": {
      "pt": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!",
      "en": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!"
    },
    "whyItMatters": {
      "pt": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano.",
      "en": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano."
    },
    "funFact": {
      "pt": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!",
      "en": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 178,
    "dayOfYear": 178,
    "month": 6,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Junho",
      "en": "June 26"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Privacidade e Redes",
      "en": "Privacidade e Redes"
    },
    "icon": "🕵️‍♂️",
    "title": {
      "pt": "Para as tuas aulas: A regra do \"Estranho no Jardim\": nada de moradas em jogos online!",
      "en": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!"
    },
    "teaser": {
      "pt": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa.",
      "en": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa."
    },
    "description": {
      "pt": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online.",
      "en": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online."
    },
    "whyItMatters": {
      "pt": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital.",
      "en": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital."
    },
    "funFact": {
      "pt": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!",
      "en": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 179,
    "dayOfYear": 179,
    "month": 6,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Junho",
      "en": "June 27"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "O Segredo da Frase-Passe",
      "en": "O Segredo da Frase-Passe"
    },
    "icon": "🍕",
    "title": {
      "pt": "Para as tuas aulas: O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!",
      "en": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!"
    },
    "teaser": {
      "pt": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar.",
      "en": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar."
    },
    "description": {
      "pt": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!",
      "en": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!"
    },
    "whyItMatters": {
      "pt": "Construção de palavras-passe fortes com base em frases mnemónicas compridas.",
      "en": "Construção de palavras-passe fortes com base em frases mnemónicas compridas."
    },
    "funFact": {
      "pt": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!",
      "en": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 180,
    "dayOfYear": 180,
    "month": 6,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Junho",
      "en": "June 28"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Símbolo Arroba",
      "en": "O Símbolo Arroba"
    },
    "icon": "🐌",
    "title": {
      "pt": "Para as tuas aulas: O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!",
      "en": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!"
    },
    "teaser": {
      "pt": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino.",
      "en": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino."
    },
    "description": {
      "pt": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!",
      "en": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!"
    },
    "whyItMatters": {
      "pt": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao.",
      "en": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao."
    },
    "funFact": {
      "pt": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!",
      "en": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 181,
    "dayOfYear": 181,
    "month": 6,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Junho",
      "en": "June 29"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Truque das Aspas",
      "en": "Truque das Aspas"
    },
    "icon": "🔍",
    "title": {
      "pt": "Para as tuas aulas: Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!",
      "en": "Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!"
    },
    "teaser": {
      "pt": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?",
      "en": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?"
    },
    "description": {
      "pt": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!",
      "en": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!"
    },
    "whyItMatters": {
      "pt": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano.",
      "en": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano."
    },
    "funFact": {
      "pt": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!",
      "en": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 182,
    "dayOfYear": 182,
    "month": 6,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Junho",
      "en": "June 30"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "O que é Plágio",
      "en": "O que é Plágio"
    },
    "icon": "✂️",
    "title": {
      "pt": "Para as tuas aulas: Plágio: roubar a medalha de ouro de outra pessoa!",
      "en": "Plágio: roubar a medalha de ouro de outra pessoa!"
    },
    "teaser": {
      "pt": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica.",
      "en": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica."
    },
    "description": {
      "pt": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste.",
      "en": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste."
    },
    "whyItMatters": {
      "pt": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano.",
      "en": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano."
    },
    "funFact": {
      "pt": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!",
      "en": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 183,
    "dayOfYear": 183,
    "month": 7,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Julho",
      "en": "July 1"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Placa Principal",
      "en": "Placa Principal"
    },
    "icon": "🛣️",
    "title": {
      "pt": "Para as tuas aulas: A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!",
      "en": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!"
    },
    "teaser": {
      "pt": "Como é que a placa gráfica fala com o processador e com o disco rígido?",
      "en": "Como é que a placa gráfica fala com o processador e com o disco rígido?"
    },
    "description": {
      "pt": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI.",
      "en": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus).",
      "en": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus)."
    },
    "funFact": {
      "pt": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!",
      "en": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 184,
    "dayOfYear": 184,
    "month": 7,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Julho",
      "en": "July 2"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Sono e Tecnologia",
      "en": "Sono e Tecnologia"
    },
    "icon": "🌙",
    "title": {
      "pt": "Para as tuas aulas: A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\"",
      "en": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\""
    },
    "teaser": {
      "pt": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?",
      "en": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?"
    },
    "description": {
      "pt": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola.",
      "en": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola."
    },
    "whyItMatters": {
      "pt": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias.",
      "en": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias."
    },
    "funFact": {
      "pt": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!",
      "en": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 185,
    "dayOfYear": 185,
    "month": 7,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Julho",
      "en": "July 3"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Apoio e Helplines",
      "en": "Apoio e Helplines"
    },
    "icon": "📞",
    "title": {
      "pt": "Para as tuas aulas: Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!",
      "en": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!"
    },
    "teaser": {
      "pt": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar.",
      "en": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar."
    },
    "description": {
      "pt": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!",
      "en": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!"
    },
    "whyItMatters": {
      "pt": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental.",
      "en": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental."
    },
    "funFact": {
      "pt": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!",
      "en": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 186,
    "dayOfYear": 186,
    "month": 7,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Julho",
      "en": "July 4"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Partilha de Senhas",
      "en": "Partilha de Senhas"
    },
    "icon": "🪥",
    "title": {
      "pt": "Para as tuas aulas: Palavras-passe são como escovas de dentes: não se emprestam a ninguém!",
      "en": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!"
    },
    "teaser": {
      "pt": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital.",
      "en": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital."
    },
    "description": {
      "pt": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem.",
      "en": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem."
    },
    "whyItMatters": {
      "pt": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal.",
      "en": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal."
    },
    "funFact": {
      "pt": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!",
      "en": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 187,
    "dayOfYear": 187,
    "month": 7,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Julho",
      "en": "July 5"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Netiqueta em Emails",
      "en": "Netiqueta em Emails"
    },
    "icon": "📢",
    "title": {
      "pt": "Para as tuas aulas: Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!",
      "en": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!"
    },
    "teaser": {
      "pt": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais.",
      "en": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais."
    },
    "description": {
      "pt": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã.",
      "en": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã."
    },
    "whyItMatters": {
      "pt": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico.",
      "en": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico."
    },
    "funFact": {
      "pt": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!",
      "en": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 188,
    "dayOfYear": 188,
    "month": 7,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Julho",
      "en": "July 6"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Segurança HTTPS",
      "en": "Segurança HTTPS"
    },
    "icon": "🔒",
    "title": {
      "pt": "Para as tuas aulas: O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!",
      "en": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!"
    },
    "teaser": {
      "pt": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\".",
      "en": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\"."
    },
    "description": {
      "pt": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias.",
      "en": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias."
    },
    "whyItMatters": {
      "pt": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC.",
      "en": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC."
    },
    "funFact": {
      "pt": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!",
      "en": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 189,
    "dayOfYear": 189,
    "month": 7,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Julho",
      "en": "July 7"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Creative Commons",
      "en": "Creative Commons"
    },
    "icon": "🤝",
    "title": {
      "pt": "Para as tuas aulas: Creative Commons: o convite amigável para partilhar criatividade com o mundo!",
      "en": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!"
    },
    "teaser": {
      "pt": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?",
      "en": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?"
    },
    "description": {
      "pt": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\".",
      "en": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\"."
    },
    "whyItMatters": {
      "pt": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7.",
      "en": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7."
    },
    "funFact": {
      "pt": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!",
      "en": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 190,
    "dayOfYear": 190,
    "month": 7,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Julho",
      "en": "July 8"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Linguagem dos Computadores",
      "en": "Linguagem dos Computadores"
    },
    "icon": "0️⃣",
    "title": {
      "pt": "Para as tuas aulas: Tudo no computador são apenas ZEROS e UNS (0 e 1)!",
      "en": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!"
    },
    "teaser": {
      "pt": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?",
      "en": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?"
    },
    "description": {
      "pt": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!",
      "en": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!"
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte.",
      "en": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte."
    },
    "funFact": {
      "pt": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!",
      "en": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 191,
    "dayOfYear": 191,
    "month": 7,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Julho",
      "en": "July 9"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pescoço e Coluna",
      "en": "Pescoço e Coluna"
    },
    "icon": "🦒",
    "title": {
      "pt": "Para as tuas aulas: O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!",
      "en": "O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!"
    },
    "teaser": {
      "pt": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento.",
      "en": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento."
    },
    "description": {
      "pt": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!",
      "en": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!"
    },
    "whyItMatters": {
      "pt": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial.",
      "en": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial."
    },
    "funFact": {
      "pt": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!",
      "en": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 192,
    "dayOfYear": 192,
    "month": 7,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Julho",
      "en": "July 10"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Netiqueta e Empatia",
      "en": "Netiqueta e Empatia"
    },
    "icon": "💬",
    "title": {
      "pt": "Para as tuas aulas: Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!",
      "en": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!"
    },
    "teaser": {
      "pt": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?",
      "en": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?"
    },
    "description": {
      "pt": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa.",
      "en": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa."
    },
    "whyItMatters": {
      "pt": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano.",
      "en": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano."
    },
    "funFact": {
      "pt": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!",
      "en": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 193,
    "dayOfYear": 193,
    "month": 7,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Julho",
      "en": "July 11"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Autenticação de 2 Fatores",
      "en": "Autenticação de 2 Fatores"
    },
    "icon": "📲",
    "title": {
      "pt": "Para as tuas aulas: Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!",
      "en": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!"
    },
    "teaser": {
      "pt": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.",
      "en": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código."
    },
    "description": {
      "pt": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes.",
      "en": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes."
    },
    "whyItMatters": {
      "pt": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC.",
      "en": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC."
    },
    "funFact": {
      "pt": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!",
      "en": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 194,
    "dayOfYear": 194,
    "month": 7,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Julho",
      "en": "July 12"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Anexos Perigosos",
      "en": "Anexos Perigosos"
    },
    "icon": "📎",
    "title": {
      "pt": "Para as tuas aulas: Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!",
      "en": "Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!"
    },
    "teaser": {
      "pt": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos.",
      "en": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos."
    },
    "description": {
      "pt": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros.",
      "en": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros."
    },
    "whyItMatters": {
      "pt": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC.",
      "en": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC."
    },
    "funFact": {
      "pt": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!",
      "en": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 195,
    "dayOfYear": 195,
    "month": 7,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Julho",
      "en": "July 13"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Combate a Fake News",
      "en": "Combate a Fake News"
    },
    "icon": "🕵️‍♀️",
    "title": {
      "pt": "Para as tuas aulas: O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!",
      "en": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!"
    },
    "teaser": {
      "pt": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções.",
      "en": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções."
    },
    "description": {
      "pt": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?",
      "en": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?"
    },
    "whyItMatters": {
      "pt": "Literacia da informação e espírito crítico na avaliação de fontes da Web.",
      "en": "Literacia da informação e espírito crítico na avaliação de fontes da Web."
    },
    "funFact": {
      "pt": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!",
      "en": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 196,
    "dayOfYear": 196,
    "month": 7,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Julho",
      "en": "July 14"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação e Bibliografia",
      "en": "Citação e Bibliografia"
    },
    "icon": "📚",
    "title": {
      "pt": "Para as tuas aulas: Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!",
      "en": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!"
    },
    "teaser": {
      "pt": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!",
      "en": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!"
    },
    "description": {
      "pt": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso.",
      "en": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso."
    },
    "whyItMatters": {
      "pt": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC.",
      "en": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC."
    },
    "funFact": {
      "pt": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!",
      "en": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 197,
    "dayOfYear": 197,
    "month": 7,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Julho",
      "en": "July 15"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Periféricos de TIC",
      "en": "Periféricos de TIC"
    },
    "icon": "🖨️",
    "title": {
      "pt": "Para as tuas aulas: Periféricos: a ponte mágica entre o ser humano e a máquina!",
      "en": "Periféricos: a ponte mágica entre o ser humano e a máquina!"
    },
    "teaser": {
      "pt": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?",
      "en": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?"
    },
    "description": {
      "pt": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!",
      "en": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!"
    },
    "whyItMatters": {
      "pt": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1.",
      "en": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1."
    },
    "funFact": {
      "pt": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!",
      "en": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 198,
    "dayOfYear": 198,
    "month": 7,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Julho",
      "en": "July 16"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Volume e Audição",
      "en": "Volume e Audição"
    },
    "icon": "🎧",
    "title": {
      "pt": "Para as tuas aulas: A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!",
      "en": "A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!"
    },
    "teaser": {
      "pt": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição.",
      "en": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição."
    },
    "description": {
      "pt": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!",
      "en": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!"
    },
    "whyItMatters": {
      "pt": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC.",
      "en": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC."
    },
    "funFact": {
      "pt": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!",
      "en": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 199,
    "dayOfYear": 199,
    "month": 7,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Julho",
      "en": "July 17"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Localização GPS",
      "en": "Localização GPS"
    },
    "icon": "📍",
    "title": {
      "pt": "Para as tuas aulas: Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!",
      "en": "Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!"
    },
    "teaser": {
      "pt": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?",
      "en": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?"
    },
    "description": {
      "pt": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives.",
      "en": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives."
    },
    "whyItMatters": {
      "pt": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros.",
      "en": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros."
    },
    "funFact": {
      "pt": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!",
      "en": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 200,
    "dayOfYear": 200,
    "month": 7,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Julho",
      "en": "July 18"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Gestores de Senhas",
      "en": "Gestores de Senhas"
    },
    "icon": "🗄️",
    "title": {
      "pt": "Para as tuas aulas: Nunca repitas a mesma palavra-passe em todos os sites e aplicações!",
      "en": "Nunca repitas a mesma palavra-passe em todos os sites e aplicações!"
    },
    "teaser": {
      "pt": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco.",
      "en": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco."
    },
    "description": {
      "pt": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido.",
      "en": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido."
    },
    "whyItMatters": {
      "pt": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano.",
      "en": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano."
    },
    "funFact": {
      "pt": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!",
      "en": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 201,
    "dayOfYear": 201,
    "month": 7,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Julho",
      "en": "July 19"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Phishing por Email",
      "en": "Phishing por Email"
    },
    "icon": "🎣",
    "title": {
      "pt": "Para as tuas aulas: Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!",
      "en": "Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!"
    },
    "teaser": {
      "pt": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!",
      "en": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!"
    },
    "description": {
      "pt": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!",
      "en": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!"
    },
    "whyItMatters": {
      "pt": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing.",
      "en": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing."
    },
    "funFact": {
      "pt": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!",
      "en": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 202,
    "dayOfYear": 202,
    "month": 7,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Julho",
      "en": "July 20"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Exploração Espacial e TIC",
      "en": "Space Exploration & ICT"
    },
    "icon": "🚀",
    "title": {
      "pt": "O computador da Apollo 11 na Lua tinha menos memória que o teu relógio!",
      "en": "The Apollo 11 moon landing computer had less memory than your watch!"
    },
    "teaser": {
      "pt": "A 20 de julho de 1969, a humanidade pisou a Lua guiada pelo computador AGC com apenas 4 KB de RAM!",
      "en": "On July 20, 1969, Apollo 11 landed on the Moon guided by a computer with just 4 KB of RAM!"
    },
    "description": {
      "pt": "O Apollo Guidance Computer (AGC) tinha memória magnética com fios entrelaçados à mão por operárias. Um smartwatch simples de hoje tem milhões de vezes mais memória e velocidade de processamento do que o computador que levou Neil Armstrong à Lua!",
      "en": "The Apollo Guidance Computer had 4 KB of RAM woven by hand. Today's smartwatch is thousands of times more powerful!"
    },
    "whyItMatters": {
      "pt": "Demonstra a evolução espantosa do hardware de TIC: miniaturização, velocidade e fiabilidade.",
      "en": "Demonstrates the exponential evolution of computer hardware: miniaturization and power."
    },
    "funFact": {
      "pt": "A engenheira Margaret Hamilton liderou a equipa que programou o código da Apollo: a pilha de livros com o código impresso era mais alta do que ela!",
      "en": "Engineer Margaret Hamilton led the Apollo software team: the printout of the code was taller than she was!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 203,
    "dayOfYear": 203,
    "month": 7,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Julho",
      "en": "July 21"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Domínio Público",
      "en": "Domínio Público"
    },
    "icon": "🏛️",
    "title": {
      "pt": "Para as tuas aulas: O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!",
      "en": "O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!"
    },
    "teaser": {
      "pt": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?",
      "en": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?"
    },
    "description": {
      "pt": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!",
      "en": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!"
    },
    "whyItMatters": {
      "pt": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum.",
      "en": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum."
    },
    "funFact": {
      "pt": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!",
      "en": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 204,
    "dayOfYear": 204,
    "month": 7,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Julho",
      "en": "July 22"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História do Rato",
      "en": "História do Rato"
    },
    "icon": "🖱️",
    "title": {
      "pt": "Para as tuas aulas: O primeiro rato do mundo foi feito de madeira com rodas de metal!",
      "en": "O primeiro rato do mundo foi feito de madeira com rodas de metal!"
    },
    "teaser": {
      "pt": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo.",
      "en": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo."
    },
    "description": {
      "pt": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!",
      "en": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!"
    },
    "whyItMatters": {
      "pt": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC.",
      "en": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC."
    },
    "funFact": {
      "pt": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!",
      "en": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 205,
    "dayOfYear": 205,
    "month": 7,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Julho",
      "en": "July 23"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Mochila Escolar",
      "en": "Mochila Escolar"
    },
    "icon": "🎒",
    "title": {
      "pt": "Para as tuas aulas: O peso da mochila não deve ultrapassar 10% do teu peso corporal!",
      "en": "O peso da mochila não deve ultrapassar 10% do teu peso corporal!"
    },
    "teaser": {
      "pt": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização.",
      "en": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização."
    },
    "description": {
      "pt": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só.",
      "en": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só."
    },
    "whyItMatters": {
      "pt": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis.",
      "en": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis."
    },
    "funFact": {
      "pt": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!",
      "en": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 206,
    "dayOfYear": 206,
    "month": 7,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Julho",
      "en": "July 24"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Câmaras e Microfones",
      "en": "Câmaras e Microfones"
    },
    "icon": "📹",
    "title": {
      "pt": "Para as tuas aulas: Tapa a webcam quando não estiveres em videochamada escolar!",
      "en": "Tapa a webcam quando não estiveres em videochamada escolar!"
    },
    "teaser": {
      "pt": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara.",
      "en": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara."
    },
    "description": {
      "pt": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz.",
      "en": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz."
    },
    "whyItMatters": {
      "pt": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet.",
      "en": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet."
    },
    "funFact": {
      "pt": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!",
      "en": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 207,
    "dayOfYear": 207,
    "month": 7,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Julho",
      "en": "July 25"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Post-its no Monitor",
      "en": "Post-its no Monitor"
    },
    "icon": "📝",
    "title": {
      "pt": "Para as tuas aulas: O erro clássico: colar papéis com a palavra-passe no ecrã do computador!",
      "en": "O erro clássico: colar papéis com a palavra-passe no ecrã do computador!"
    },
    "teaser": {
      "pt": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura.",
      "en": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura."
    },
    "description": {
      "pt": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas.",
      "en": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas."
    },
    "whyItMatters": {
      "pt": "Práticas de segurança física e lógica no manuseamento de acessos no computador.",
      "en": "Práticas de segurança física e lógica no manuseamento de acessos no computador."
    },
    "funFact": {
      "pt": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!",
      "en": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 208,
    "dayOfYear": 208,
    "month": 7,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Julho",
      "en": "July 26"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Campo Assunto",
      "en": "O Campo Assunto"
    },
    "icon": "🏷️",
    "title": {
      "pt": "Para as tuas aulas: Nunca envies um email com o campo \"Assunto\" vazio!",
      "en": "Nunca envies um email com o campo \"Assunto\" vazio!"
    },
    "teaser": {
      "pt": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem.",
      "en": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem."
    },
    "description": {
      "pt": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\".",
      "en": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\"."
    },
    "whyItMatters": {
      "pt": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico.",
      "en": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico."
    },
    "funFact": {
      "pt": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!",
      "en": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 209,
    "dayOfYear": 209,
    "month": 7,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Julho",
      "en": "July 27"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Histórico e Cookies",
      "en": "Histórico e Cookies"
    },
    "icon": "🍪",
    "title": {
      "pt": "Para as tuas aulas: Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!",
      "en": "Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!"
    },
    "teaser": {
      "pt": "Porque é que todos os sites perguntam se aceitas cookies?",
      "en": "Porque é que todos os sites perguntam se aceitas cookies?"
    },
    "description": {
      "pt": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites.",
      "en": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites."
    },
    "whyItMatters": {
      "pt": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC.",
      "en": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC."
    },
    "funFact": {
      "pt": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!",
      "en": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 210,
    "dayOfYear": 210,
    "month": 7,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Julho",
      "en": "July 28"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Música e Sons Livres",
      "en": "Música e Sons Livres"
    },
    "icon": "🎵",
    "title": {
      "pt": "Para as tuas aulas: Bancos de som e música livre para os teus vídeos e jogos no Scratch!",
      "en": "Bancos de som e música livre para os teus vídeos e jogos no Scratch!"
    },
    "teaser": {
      "pt": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado.",
      "en": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado."
    },
    "description": {
      "pt": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público.",
      "en": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público."
    },
    "whyItMatters": {
      "pt": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares.",
      "en": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares."
    },
    "funFact": {
      "pt": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!",
      "en": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 211,
    "dayOfYear": 211,
    "month": 7,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Julho",
      "en": "July 29"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Robótica e Exploração",
      "en": "Robótica e Exploração"
    },
    "icon": "🤖",
    "title": {
      "pt": "Para as tuas aulas: Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!",
      "en": "Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!"
    },
    "teaser": {
      "pt": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte.",
      "en": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte."
    },
    "description": {
      "pt": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas.",
      "en": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas."
    },
    "whyItMatters": {
      "pt": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna.",
      "en": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna."
    },
    "funFact": {
      "pt": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!",
      "en": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 212,
    "dayOfYear": 212,
    "month": 7,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Julho",
      "en": "July 30"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Iluminação do Espaço",
      "en": "Iluminação do Espaço"
    },
    "icon": "💡",
    "title": {
      "pt": "Para as tuas aulas: Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!",
      "en": "Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!"
    },
    "teaser": {
      "pt": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?",
      "en": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?"
    },
    "description": {
      "pt": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho.",
      "en": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho."
    },
    "whyItMatters": {
      "pt": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado.",
      "en": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado."
    },
    "funFact": {
      "pt": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!",
      "en": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 213,
    "dayOfYear": 213,
    "month": 7,
    "day": 31,
    "dateLabel": {
      "pt": "31 de Julho",
      "en": "July 31"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Engenharia Social",
      "en": "Engenharia Social"
    },
    "icon": "🎣",
    "title": {
      "pt": "Para as tuas aulas: Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!",
      "en": "Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!"
    },
    "teaser": {
      "pt": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!",
      "en": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!"
    },
    "description": {
      "pt": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!",
      "en": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!"
    },
    "whyItMatters": {
      "pt": "Identificação de técnicas básicas de engenharia social e enganos virtuais.",
      "en": "Identificação de técnicas básicas de engenharia social e enganos virtuais."
    },
    "funFact": {
      "pt": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!",
      "en": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 214,
    "dayOfYear": 214,
    "month": 8,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Agosto",
      "en": "August 1"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Bloqueio de Sessão",
      "en": "Bloqueio de Sessão"
    },
    "icon": "🔒",
    "title": {
      "pt": "Para as tuas aulas: Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!",
      "en": "Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!"
    },
    "teaser": {
      "pt": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!",
      "en": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!"
    },
    "description": {
      "pt": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula.",
      "en": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula."
    },
    "whyItMatters": {
      "pt": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador.",
      "en": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador."
    },
    "funFact": {
      "pt": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!",
      "en": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 215,
    "dayOfYear": 215,
    "month": 8,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Agosto",
      "en": "August 2"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Spam e Cadeias",
      "en": "Spam e Cadeias"
    },
    "icon": "🗑️",
    "title": {
      "pt": "Para as tuas aulas: A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!",
      "en": "A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!"
    },
    "teaser": {
      "pt": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!",
      "en": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!"
    },
    "description": {
      "pt": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas.",
      "en": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas."
    },
    "whyItMatters": {
      "pt": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam.",
      "en": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam."
    },
    "funFact": {
      "pt": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!",
      "en": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 216,
    "dayOfYear": 216,
    "month": 8,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Agosto",
      "en": "August 3"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Separadores e Janelas",
      "en": "Separadores e Janelas"
    },
    "icon": "📑",
    "title": {
      "pt": "Para as tuas aulas: Atalhos de mestre no navegador: Control + T abre um novo separador!",
      "en": "Atalhos de mestre no navegador: Control + T abre um novo separador!"
    },
    "teaser": {
      "pt": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática.",
      "en": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática."
    },
    "description": {
      "pt": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!",
      "en": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!"
    },
    "whyItMatters": {
      "pt": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano.",
      "en": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano."
    },
    "funFact": {
      "pt": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!",
      "en": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 217,
    "dayOfYear": 217,
    "month": 8,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Agosto",
      "en": "August 4"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Software Livre vs Proprietário",
      "en": "Software Livre vs Proprietário"
    },
    "icon": "🐧",
    "title": {
      "pt": "Para as tuas aulas: Software Livre: o código aberto onde todos podem aprender e colaborar!",
      "en": "Software Livre: o código aberto onde todos podem aprender e colaborar!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?",
      "en": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?"
    },
    "description": {
      "pt": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade.",
      "en": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade."
    },
    "whyItMatters": {
      "pt": "Diferença entre licenças de software comercial, freeware, shareware e software livre.",
      "en": "Diferença entre licenças de software comercial, freeware, shareware e software livre."
    },
    "funFact": {
      "pt": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!",
      "en": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 218,
    "dayOfYear": 218,
    "month": 8,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Agosto",
      "en": "August 5"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Ambiente e Sustentabilidade",
      "en": "Ambiente e Sustentabilidade"
    },
    "icon": "♻️",
    "title": {
      "pt": "Para as tuas aulas: O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!",
      "en": "O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!"
    },
    "teaser": {
      "pt": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?",
      "en": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?"
    },
    "description": {
      "pt": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados.",
      "en": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados."
    },
    "whyItMatters": {
      "pt": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano.",
      "en": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano."
    },
    "funFact": {
      "pt": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!",
      "en": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 219,
    "dayOfYear": 219,
    "month": 8,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Agosto",
      "en": "August 6"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "História da Web",
      "en": "Web History"
    },
    "icon": "🌐",
    "title": {
      "pt": "Abertura da World Wide Web ao mundo inteiro!",
      "en": "The World Wide Web opens to the whole world!"
    },
    "teaser": {
      "pt": "A 6 de agosto de 1991, Tim Berners-Lee disponibilizou publicamente a primeira página Web da história.",
      "en": "On August 6, 1991, Tim Berners-Lee made the first website public worldwide."
    },
    "description": {
      "pt": "A primeira página Web foi criada no laboratório do CERN na Suíça num computador NeXT. Explicava o que era a World Wide Web, como criar hiperligações (links) e como navegar na rede. E o mais incrível: Tim Berners-Lee não cobrou nada, ofereceu a Web gratuitamente a toda a humanidade!",
      "en": "The first web page was made at CERN. Tim Berners-Lee gave the Web away for free to everyone!"
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos que a Web (WWW) funciona em cima da Internet e utiliza o protocolo HTTP para partilhar informação.",
      "en": "In Topic 6 we learn the Web runs on top of the Internet using HTTP protocol to share pages."
    },
    "funFact": {
      "pt": "O computador do criador da Web tinha um papel colado que dizia em letras vermelhas: \"Esta máquina é o servidor, NÃO DESLIGAR!\" 🔌😄",
      "en": "The original web server had a sticker reading: \"This machine is a server, DO NOT POWER DOWN!\" 🔌😄"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 220,
    "dayOfYear": 220,
    "month": 8,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Agosto",
      "en": "August 7"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Direito à Imagem",
      "en": "Direito à Imagem"
    },
    "icon": "📸",
    "title": {
      "pt": "Para as tuas aulas: Pede sempre autorização antes de tirar ou partilhar fotos de amigos!",
      "en": "Pede sempre autorização antes de tirar ou partilhar fotos de amigos!"
    },
    "teaser": {
      "pt": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada.",
      "en": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada."
    },
    "description": {
      "pt": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares.",
      "en": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares."
    },
    "whyItMatters": {
      "pt": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade.",
      "en": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade."
    },
    "funFact": {
      "pt": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!",
      "en": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 221,
    "dayOfYear": 221,
    "month": 8,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Agosto",
      "en": "August 8"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Biometria",
      "en": "Biometria"
    },
    "icon": "👁️",
    "title": {
      "pt": "Para as tuas aulas: Impressão digital e reconhecimento facial: o teu corpo como senha!",
      "en": "Impressão digital e reconhecimento facial: o teu corpo como senha!"
    },
    "teaser": {
      "pt": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar.",
      "en": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar."
    },
    "description": {
      "pt": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos.",
      "en": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos."
    },
    "whyItMatters": {
      "pt": "Exploração das novas tecnologias de identificação e autenticação biométrica.",
      "en": "Exploração das novas tecnologias de identificação e autenticação biométrica."
    },
    "funFact": {
      "pt": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!",
      "en": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 222,
    "dayOfYear": 222,
    "month": 8,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Agosto",
      "en": "August 9"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Responder a Todos",
      "en": "Responder a Todos"
    },
    "icon": "👥",
    "title": {
      "pt": "Para as tuas aulas: Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!",
      "en": "Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!"
    },
    "teaser": {
      "pt": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\".",
      "en": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\"."
    },
    "description": {
      "pt": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!",
      "en": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!"
    },
    "whyItMatters": {
      "pt": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano.",
      "en": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano."
    },
    "funFact": {
      "pt": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!",
      "en": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 223,
    "dayOfYear": 223,
    "month": 8,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Agosto",
      "en": "August 10"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Domínios e Extensões",
      "en": "Domínios e Extensões"
    },
    "icon": "🌐",
    "title": {
      "pt": "Para as tuas aulas: O que significa .pt, .org, .edu e .gov no final dos sites?",
      "en": "O que significa .pt, .org, .edu e .gov no final dos sites?"
    },
    "teaser": {
      "pt": "A terminação do endereço da página Web revela muito sobre quem a criou.",
      "en": "A terminação do endereço da página Web revela muito sobre quem a criou."
    },
    "description": {
      "pt": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!",
      "en": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!"
    },
    "whyItMatters": {
      "pt": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional.",
      "en": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional."
    },
    "funFact": {
      "pt": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!",
      "en": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 224,
    "dayOfYear": 224,
    "month": 8,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Agosto",
      "en": "August 11"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação Direta entre Aspas",
      "en": "Citação Direta entre Aspas"
    },
    "icon": "💬",
    "title": {
      "pt": "Para as tuas aulas: Como citar uma frase de um livro no trabalho escolar sem cometer plágio?",
      "en": "Como citar uma frase de um livro no trabalho escolar sem cometer plágio?"
    },
    "teaser": {
      "pt": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!",
      "en": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!"
    },
    "description": {
      "pt": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!",
      "en": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!"
    },
    "whyItMatters": {
      "pt": "Normas de referenciação textual e integridade académica em produções escolares de TIC.",
      "en": "Normas de referenciação textual e integridade académica em produções escolares de TIC."
    },
    "funFact": {
      "pt": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\"",
      "en": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\""
    },
    "isSpecialMilestone": false
  },
  {
    "id": 225,
    "dayOfYear": 225,
    "month": 8,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Agosto",
      "en": "August 12"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Hardware Interno",
      "en": "Hardware Interno"
    },
    "icon": "🧠",
    "title": {
      "pt": "Dica de ouro: A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!",
      "en": "A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!"
    },
    "teaser": {
      "pt": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?",
      "en": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?"
    },
    "description": {
      "pt": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!",
      "en": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!"
    },
    "whyItMatters": {
      "pt": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes.",
      "en": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes."
    },
    "funFact": {
      "pt": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!",
      "en": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 226,
    "dayOfYear": 226,
    "month": 8,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Agosto",
      "en": "August 13"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Postura na Cadeira",
      "en": "Postura na Cadeira"
    },
    "icon": "🪑",
    "title": {
      "pt": "Dica de ouro: A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!",
      "en": "A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!"
    },
    "teaser": {
      "pt": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?",
      "en": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?"
    },
    "description": {
      "pt": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares.",
      "en": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares."
    },
    "whyItMatters": {
      "pt": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito.",
      "en": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito."
    },
    "funFact": {
      "pt": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!",
      "en": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 227,
    "dayOfYear": 227,
    "month": 8,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Agosto",
      "en": "August 14"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Pegada Digital",
      "en": "Pegada Digital"
    },
    "icon": "👣",
    "title": {
      "pt": "Dica de ouro: A tua Pegada Digital é como uma pegada no cimento fresco!",
      "en": "A tua Pegada Digital é como uma pegada no cimento fresco!"
    },
    "teaser": {
      "pt": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura.",
      "en": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura."
    },
    "description": {
      "pt": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes.",
      "en": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online.",
      "en": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online."
    },
    "funFact": {
      "pt": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!",
      "en": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 228,
    "dayOfYear": 228,
    "month": 8,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Agosto",
      "en": "August 15"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Força de Senhas",
      "en": "Força de Senhas"
    },
    "icon": "⚡",
    "title": {
      "pt": "Dica de ouro: A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!",
      "en": "A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!"
    },
    "teaser": {
      "pt": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!",
      "en": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!"
    },
    "description": {
      "pt": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores.",
      "en": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores."
    },
    "whyItMatters": {
      "pt": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares.",
      "en": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares."
    },
    "funFact": {
      "pt": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!",
      "en": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 229,
    "dayOfYear": 229,
    "month": 8,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Agosto",
      "en": "August 16"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Campos do Email",
      "en": "Campos do Email"
    },
    "icon": "🕶️",
    "title": {
      "pt": "Dica de ouro: O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!",
      "en": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!"
    },
    "teaser": {
      "pt": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!",
      "en": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!"
    },
    "description": {
      "pt": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados.",
      "en": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados."
    },
    "whyItMatters": {
      "pt": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD.",
      "en": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD."
    },
    "funFact": {
      "pt": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!",
      "en": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 230,
    "dayOfYear": 230,
    "month": 8,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Agosto",
      "en": "August 17"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Navegador vs Motor",
      "en": "Navegador vs Motor"
    },
    "icon": "🚗",
    "title": {
      "pt": "Dica de ouro: O Navegador é o Automóvel, o Motor de Busca é o GPS!",
      "en": "O Navegador é o Automóvel, o Motor de Busca é o GPS!"
    },
    "teaser": {
      "pt": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?",
      "en": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?"
    },
    "description": {
      "pt": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas.",
      "en": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas."
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca.",
      "en": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca."
    },
    "funFact": {
      "pt": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!",
      "en": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 231,
    "dayOfYear": 231,
    "month": 8,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Agosto",
      "en": "August 18"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Google Imagens",
      "en": "Google Imagens"
    },
    "icon": "🎨",
    "title": {
      "pt": "Dica de ouro: As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!",
      "en": "As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!"
    },
    "teaser": {
      "pt": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei.",
      "en": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei."
    },
    "description": {
      "pt": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público.",
      "en": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público."
    },
    "whyItMatters": {
      "pt": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas.",
      "en": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas."
    },
    "funFact": {
      "pt": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!",
      "en": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 232,
    "dayOfYear": 232,
    "month": 8,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Agosto",
      "en": "August 19"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Memória do Computador",
      "en": "Memória do Computador"
    },
    "icon": "⚡",
    "title": {
      "pt": "Dica de ouro: Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!",
      "en": "Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?",
      "en": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?"
    },
    "description": {
      "pt": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!",
      "en": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!"
    },
    "whyItMatters": {
      "pt": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC.",
      "en": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC."
    },
    "funFact": {
      "pt": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!",
      "en": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 233,
    "dayOfYear": 233,
    "month": 8,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Agosto",
      "en": "August 20"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Cuidado com os Olhos",
      "en": "Cuidado com os Olhos"
    },
    "icon": "👀",
    "title": {
      "pt": "Dica de ouro: A Regra 20-20-20: o descanso favorito dos teus olhos!",
      "en": "A Regra 20-20-20: o descanso favorito dos teus olhos!"
    },
    "teaser": {
      "pt": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?",
      "en": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?"
    },
    "description": {
      "pt": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!",
      "en": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!"
    },
    "whyItMatters": {
      "pt": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano.",
      "en": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano."
    },
    "funFact": {
      "pt": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!",
      "en": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 234,
    "dayOfYear": 234,
    "month": 8,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Agosto",
      "en": "August 21"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Privacidade e Redes",
      "en": "Privacidade e Redes"
    },
    "icon": "🕵️‍♂️",
    "title": {
      "pt": "Dica de ouro: A regra do \"Estranho no Jardim\": nada de moradas em jogos online!",
      "en": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!"
    },
    "teaser": {
      "pt": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa.",
      "en": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa."
    },
    "description": {
      "pt": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online.",
      "en": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online."
    },
    "whyItMatters": {
      "pt": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital.",
      "en": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital."
    },
    "funFact": {
      "pt": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!",
      "en": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 235,
    "dayOfYear": 235,
    "month": 8,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Agosto",
      "en": "August 22"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "O Segredo da Frase-Passe",
      "en": "O Segredo da Frase-Passe"
    },
    "icon": "🍕",
    "title": {
      "pt": "Dica de ouro: O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!",
      "en": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!"
    },
    "teaser": {
      "pt": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar.",
      "en": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar."
    },
    "description": {
      "pt": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!",
      "en": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!"
    },
    "whyItMatters": {
      "pt": "Construção de palavras-passe fortes com base em frases mnemónicas compridas.",
      "en": "Construção de palavras-passe fortes com base em frases mnemónicas compridas."
    },
    "funFact": {
      "pt": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!",
      "en": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 236,
    "dayOfYear": 236,
    "month": 8,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Agosto",
      "en": "August 23"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Símbolo Arroba",
      "en": "O Símbolo Arroba"
    },
    "icon": "🐌",
    "title": {
      "pt": "Dica de ouro: O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!",
      "en": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!"
    },
    "teaser": {
      "pt": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino.",
      "en": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino."
    },
    "description": {
      "pt": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!",
      "en": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!"
    },
    "whyItMatters": {
      "pt": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao.",
      "en": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao."
    },
    "funFact": {
      "pt": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!",
      "en": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 237,
    "dayOfYear": 237,
    "month": 8,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Agosto",
      "en": "August 24"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Truque das Aspas",
      "en": "Truque das Aspas"
    },
    "icon": "🔍",
    "title": {
      "pt": "Dica de ouro: Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!",
      "en": "Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!"
    },
    "teaser": {
      "pt": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?",
      "en": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?"
    },
    "description": {
      "pt": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!",
      "en": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!"
    },
    "whyItMatters": {
      "pt": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano.",
      "en": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano."
    },
    "funFact": {
      "pt": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!",
      "en": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 238,
    "dayOfYear": 238,
    "month": 8,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Agosto",
      "en": "August 25"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "O que é Plágio",
      "en": "O que é Plágio"
    },
    "icon": "✂️",
    "title": {
      "pt": "Dica de ouro: Plágio: roubar a medalha de ouro de outra pessoa!",
      "en": "Plágio: roubar a medalha de ouro de outra pessoa!"
    },
    "teaser": {
      "pt": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica.",
      "en": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica."
    },
    "description": {
      "pt": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste.",
      "en": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste."
    },
    "whyItMatters": {
      "pt": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano.",
      "en": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano."
    },
    "funFact": {
      "pt": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!",
      "en": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 239,
    "dayOfYear": 239,
    "month": 8,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Agosto",
      "en": "August 26"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Placa Principal",
      "en": "Placa Principal"
    },
    "icon": "🛣️",
    "title": {
      "pt": "Dica de ouro: A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!",
      "en": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!"
    },
    "teaser": {
      "pt": "Como é que a placa gráfica fala com o processador e com o disco rígido?",
      "en": "Como é que a placa gráfica fala com o processador e com o disco rígido?"
    },
    "description": {
      "pt": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI.",
      "en": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus).",
      "en": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus)."
    },
    "funFact": {
      "pt": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!",
      "en": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 240,
    "dayOfYear": 240,
    "month": 8,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Agosto",
      "en": "August 27"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Sono e Tecnologia",
      "en": "Sono e Tecnologia"
    },
    "icon": "🌙",
    "title": {
      "pt": "Dica de ouro: A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\"",
      "en": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\""
    },
    "teaser": {
      "pt": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?",
      "en": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?"
    },
    "description": {
      "pt": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola.",
      "en": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola."
    },
    "whyItMatters": {
      "pt": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias.",
      "en": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias."
    },
    "funFact": {
      "pt": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!",
      "en": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 241,
    "dayOfYear": 241,
    "month": 8,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Agosto",
      "en": "August 28"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Apoio e Helplines",
      "en": "Apoio e Helplines"
    },
    "icon": "📞",
    "title": {
      "pt": "Dica de ouro: Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!",
      "en": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!"
    },
    "teaser": {
      "pt": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar.",
      "en": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar."
    },
    "description": {
      "pt": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!",
      "en": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!"
    },
    "whyItMatters": {
      "pt": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental.",
      "en": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental."
    },
    "funFact": {
      "pt": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!",
      "en": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 242,
    "dayOfYear": 242,
    "month": 8,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Agosto",
      "en": "August 29"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Partilha de Senhas",
      "en": "Partilha de Senhas"
    },
    "icon": "🪥",
    "title": {
      "pt": "Dica de ouro: Palavras-passe são como escovas de dentes: não se emprestam a ninguém!",
      "en": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!"
    },
    "teaser": {
      "pt": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital.",
      "en": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital."
    },
    "description": {
      "pt": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem.",
      "en": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem."
    },
    "whyItMatters": {
      "pt": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal.",
      "en": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal."
    },
    "funFact": {
      "pt": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!",
      "en": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 243,
    "dayOfYear": 243,
    "month": 8,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Agosto",
      "en": "August 30"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Netiqueta em Emails",
      "en": "Netiqueta em Emails"
    },
    "icon": "📢",
    "title": {
      "pt": "Dica de ouro: Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!",
      "en": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!"
    },
    "teaser": {
      "pt": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais.",
      "en": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais."
    },
    "description": {
      "pt": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã.",
      "en": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã."
    },
    "whyItMatters": {
      "pt": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico.",
      "en": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico."
    },
    "funFact": {
      "pt": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!",
      "en": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 244,
    "dayOfYear": 244,
    "month": 8,
    "day": 31,
    "dateLabel": {
      "pt": "31 de Agosto",
      "en": "August 31"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Segurança HTTPS",
      "en": "Segurança HTTPS"
    },
    "icon": "🔒",
    "title": {
      "pt": "Dica de ouro: O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!",
      "en": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!"
    },
    "teaser": {
      "pt": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\".",
      "en": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\"."
    },
    "description": {
      "pt": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias.",
      "en": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias."
    },
    "whyItMatters": {
      "pt": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC.",
      "en": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC."
    },
    "funFact": {
      "pt": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!",
      "en": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 245,
    "dayOfYear": 245,
    "month": 9,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Setembro",
      "en": "September 1"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Creative Commons",
      "en": "Creative Commons"
    },
    "icon": "🤝",
    "title": {
      "pt": "Dica de ouro: Creative Commons: o convite amigável para partilhar criatividade com o mundo!",
      "en": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!"
    },
    "teaser": {
      "pt": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?",
      "en": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?"
    },
    "description": {
      "pt": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\".",
      "en": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\"."
    },
    "whyItMatters": {
      "pt": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7.",
      "en": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7."
    },
    "funFact": {
      "pt": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!",
      "en": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 246,
    "dayOfYear": 246,
    "month": 9,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Setembro",
      "en": "September 2"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Linguagem dos Computadores",
      "en": "Linguagem dos Computadores"
    },
    "icon": "0️⃣",
    "title": {
      "pt": "Dica de ouro: Tudo no computador são apenas ZEROS e UNS (0 e 1)!",
      "en": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!"
    },
    "teaser": {
      "pt": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?",
      "en": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?"
    },
    "description": {
      "pt": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!",
      "en": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!"
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte.",
      "en": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte."
    },
    "funFact": {
      "pt": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!",
      "en": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 247,
    "dayOfYear": 247,
    "month": 9,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Setembro",
      "en": "September 3"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pescoço e Coluna",
      "en": "Pescoço e Coluna"
    },
    "icon": "🦒",
    "title": {
      "pt": "Dica de ouro: O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!",
      "en": "O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!"
    },
    "teaser": {
      "pt": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento.",
      "en": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento."
    },
    "description": {
      "pt": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!",
      "en": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!"
    },
    "whyItMatters": {
      "pt": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial.",
      "en": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial."
    },
    "funFact": {
      "pt": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!",
      "en": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 248,
    "dayOfYear": 248,
    "month": 9,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Setembro",
      "en": "September 4"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Netiqueta e Empatia",
      "en": "Netiqueta e Empatia"
    },
    "icon": "💬",
    "title": {
      "pt": "Dica de ouro: Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!",
      "en": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!"
    },
    "teaser": {
      "pt": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?",
      "en": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?"
    },
    "description": {
      "pt": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa.",
      "en": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa."
    },
    "whyItMatters": {
      "pt": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano.",
      "en": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano."
    },
    "funFact": {
      "pt": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!",
      "en": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 249,
    "dayOfYear": 249,
    "month": 9,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Setembro",
      "en": "September 5"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Autenticação de 2 Fatores",
      "en": "Autenticação de 2 Fatores"
    },
    "icon": "📲",
    "title": {
      "pt": "Dica de ouro: Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!",
      "en": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!"
    },
    "teaser": {
      "pt": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.",
      "en": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código."
    },
    "description": {
      "pt": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes.",
      "en": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes."
    },
    "whyItMatters": {
      "pt": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC.",
      "en": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC."
    },
    "funFact": {
      "pt": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!",
      "en": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 250,
    "dayOfYear": 250,
    "month": 9,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Setembro",
      "en": "September 6"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Anexos Perigosos",
      "en": "Anexos Perigosos"
    },
    "icon": "📎",
    "title": {
      "pt": "Dica de ouro: Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!",
      "en": "Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!"
    },
    "teaser": {
      "pt": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos.",
      "en": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos."
    },
    "description": {
      "pt": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros.",
      "en": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros."
    },
    "whyItMatters": {
      "pt": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC.",
      "en": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC."
    },
    "funFact": {
      "pt": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!",
      "en": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 251,
    "dayOfYear": 251,
    "month": 9,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Setembro",
      "en": "September 7"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Combate a Fake News",
      "en": "Combate a Fake News"
    },
    "icon": "🕵️‍♀️",
    "title": {
      "pt": "Dica de ouro: O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!",
      "en": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!"
    },
    "teaser": {
      "pt": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções.",
      "en": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções."
    },
    "description": {
      "pt": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?",
      "en": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?"
    },
    "whyItMatters": {
      "pt": "Literacia da informação e espírito crítico na avaliação de fontes da Web.",
      "en": "Literacia da informação e espírito crítico na avaliação de fontes da Web."
    },
    "funFact": {
      "pt": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!",
      "en": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 252,
    "dayOfYear": 252,
    "month": 9,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Setembro",
      "en": "September 8"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação e Bibliografia",
      "en": "Citação e Bibliografia"
    },
    "icon": "📚",
    "title": {
      "pt": "Dica de ouro: Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!",
      "en": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!"
    },
    "teaser": {
      "pt": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!",
      "en": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!"
    },
    "description": {
      "pt": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso.",
      "en": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso."
    },
    "whyItMatters": {
      "pt": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC.",
      "en": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC."
    },
    "funFact": {
      "pt": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!",
      "en": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 253,
    "dayOfYear": 253,
    "month": 9,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Setembro",
      "en": "September 9"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História do Software",
      "en": "Software History"
    },
    "icon": "🐛",
    "title": {
      "pt": "O Primeiro \"Bug\" da História da Computação: uma traça de verdade!",
      "en": "The First \"Bug\" in Computer History: a real live moth!"
    },
    "teaser": {
      "pt": "A 9 de setembro de 1947, a pioneira Grace Hopper encontrou um inseto que encravou o computador!",
      "en": "On Sept 9, 1947, pioneer Grace Hopper found an insect jamming the Harvard Mark II!"
    },
    "description": {
      "pt": "Os operadores do gigantesco computador Harvard Mark II estavam a tentar descobrir porque é que o computador dava erro. Ao abrir um relé elétrico, encontraram uma traça presa entre os contactos! Tiraram o inseto com uma pinça, colaram-no no caderno de anotações e escreveram: \"Primeiro caso real de bug (inseto) encontrado!\"",
      "en": "Operators troubleshooting the Mark II found a trapped moth between relay contacts and taped it into the logbook!"
    },
    "whyItMatters": {
      "pt": "Desde então, qualquer erro no código de um programa ou jogo passou a chamar-se \"Bug\", e a tarefa de o corrigir chama-se \"Debugging\"!",
      "en": "Ever since, any software defect is called a \"Bug\", and fixing it is known as \"Debugging\"!"
    },
    "funFact": {
      "pt": "A página original com a traça colada com fita adesiva ainda está guardada no Museu Nacional de História Americana em Washington!",
      "en": "The historic logbook page with the real moth taped to it is preserved in the Smithsonian Museum!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 254,
    "dayOfYear": 254,
    "month": 9,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Setembro",
      "en": "September 10"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Volume e Audição",
      "en": "Volume e Audição"
    },
    "icon": "🎧",
    "title": {
      "pt": "Dica de ouro: A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!",
      "en": "A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!"
    },
    "teaser": {
      "pt": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição.",
      "en": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição."
    },
    "description": {
      "pt": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!",
      "en": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!"
    },
    "whyItMatters": {
      "pt": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC.",
      "en": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC."
    },
    "funFact": {
      "pt": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!",
      "en": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 255,
    "dayOfYear": 255,
    "month": 9,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Setembro",
      "en": "September 11"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Localização GPS",
      "en": "Localização GPS"
    },
    "icon": "📍",
    "title": {
      "pt": "Dica de ouro: Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!",
      "en": "Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!"
    },
    "teaser": {
      "pt": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?",
      "en": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?"
    },
    "description": {
      "pt": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives.",
      "en": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives."
    },
    "whyItMatters": {
      "pt": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros.",
      "en": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros."
    },
    "funFact": {
      "pt": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!",
      "en": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 256,
    "dayOfYear": 256,
    "month": 9,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Setembro",
      "en": "September 12"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Dia dos Programadores",
      "en": "Programmers' Day"
    },
    "icon": "💻",
    "title": {
      "pt": "Dia Internacional do Programador (O 256.º dia do ano!)",
      "en": "International Programmers' Day (The 256th day of the year!)"
    },
    "teaser": {
      "pt": "Celebrado no 256.º dia do ano porque 256 é 2 elevado a 8 (o número de valores num byte!).",
      "en": "Celebrated on the 256th day because 256 is 2^8, the distinct values in a byte."
    },
    "description": {
      "pt": "Em anos normais calha a 13 de setembro e em anos bissextos a 12 de setembro. O número 256 é mágico na informática: é o número máximo de combinações possíveis com 8 bits (1 Byte). Com 1 byte podemos representar qualquer letra do alfabeto ou número de 0 a 255!",
      "en": "In leap years it falls on Sept 12. 256 is the number of distinct states of an 8-bit byte."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos que o Byte é a unidade de medida fundamental de informação digital.",
      "en": "In ICT we learn the Byte is the fundamental building block of digital measurement."
    },
    "funFact": {
      "pt": "Os programadores celebram este dia comendo pizza, partilhando piadas de código e vestindo t-shirts com mensagens em binário!",
      "en": "Programmers celebrate by eating pizza and wearing clothes printed with binary jokes!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 257,
    "dayOfYear": 257,
    "month": 9,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Setembro",
      "en": "September 13"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Phishing por Email",
      "en": "Phishing por Email"
    },
    "icon": "🎣",
    "title": {
      "pt": "Dica de ouro: Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!",
      "en": "Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!"
    },
    "teaser": {
      "pt": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!",
      "en": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!"
    },
    "description": {
      "pt": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!",
      "en": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!"
    },
    "whyItMatters": {
      "pt": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing.",
      "en": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing."
    },
    "funFact": {
      "pt": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!",
      "en": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 258,
    "dayOfYear": 258,
    "month": 9,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Setembro",
      "en": "September 14"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Aranhas da Web",
      "en": "Aranhas da Web"
    },
    "icon": "🕷️",
    "title": {
      "pt": "Dica de ouro: As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!",
      "en": "As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!"
    },
    "teaser": {
      "pt": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?",
      "en": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?"
    },
    "description": {
      "pt": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice.",
      "en": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice."
    },
    "whyItMatters": {
      "pt": "Compreender como a informação é indexada e recuperada nos motores de pesquisa.",
      "en": "Compreender como a informação é indexada e recuperada nos motores de pesquisa."
    },
    "funFact": {
      "pt": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!",
      "en": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 259,
    "dayOfYear": 259,
    "month": 9,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Setembro",
      "en": "September 15"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Domínio Público",
      "en": "Domínio Público"
    },
    "icon": "🏛️",
    "title": {
      "pt": "Dica de ouro: O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!",
      "en": "O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!"
    },
    "teaser": {
      "pt": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?",
      "en": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?"
    },
    "description": {
      "pt": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!",
      "en": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!"
    },
    "whyItMatters": {
      "pt": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum.",
      "en": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum."
    },
    "funFact": {
      "pt": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!",
      "en": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 260,
    "dayOfYear": 260,
    "month": 9,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Setembro",
      "en": "September 16"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História do Rato",
      "en": "História do Rato"
    },
    "icon": "🖱️",
    "title": {
      "pt": "Dica de ouro: O primeiro rato do mundo foi feito de madeira com rodas de metal!",
      "en": "O primeiro rato do mundo foi feito de madeira com rodas de metal!"
    },
    "teaser": {
      "pt": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo.",
      "en": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo."
    },
    "description": {
      "pt": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!",
      "en": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!"
    },
    "whyItMatters": {
      "pt": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC.",
      "en": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC."
    },
    "funFact": {
      "pt": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!",
      "en": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 261,
    "dayOfYear": 261,
    "month": 9,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Setembro",
      "en": "September 17"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Mochila Escolar",
      "en": "Mochila Escolar"
    },
    "icon": "🎒",
    "title": {
      "pt": "Dica de ouro: O peso da mochila não deve ultrapassar 10% do teu peso corporal!",
      "en": "O peso da mochila não deve ultrapassar 10% do teu peso corporal!"
    },
    "teaser": {
      "pt": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização.",
      "en": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização."
    },
    "description": {
      "pt": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só.",
      "en": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só."
    },
    "whyItMatters": {
      "pt": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis.",
      "en": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis."
    },
    "funFact": {
      "pt": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!",
      "en": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 262,
    "dayOfYear": 262,
    "month": 9,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Setembro",
      "en": "September 18"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Câmaras e Microfones",
      "en": "Câmaras e Microfones"
    },
    "icon": "📹",
    "title": {
      "pt": "Dica de ouro: Tapa a webcam quando não estiveres em videochamada escolar!",
      "en": "Tapa a webcam quando não estiveres em videochamada escolar!"
    },
    "teaser": {
      "pt": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara.",
      "en": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara."
    },
    "description": {
      "pt": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz.",
      "en": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz."
    },
    "whyItMatters": {
      "pt": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet.",
      "en": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet."
    },
    "funFact": {
      "pt": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!",
      "en": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 263,
    "dayOfYear": 263,
    "month": 9,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Setembro",
      "en": "September 19"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Post-its no Monitor",
      "en": "Post-its no Monitor"
    },
    "icon": "📝",
    "title": {
      "pt": "Dica de ouro: O erro clássico: colar papéis com a palavra-passe no ecrã do computador!",
      "en": "O erro clássico: colar papéis com a palavra-passe no ecrã do computador!"
    },
    "teaser": {
      "pt": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura.",
      "en": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura."
    },
    "description": {
      "pt": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas.",
      "en": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas."
    },
    "whyItMatters": {
      "pt": "Práticas de segurança física e lógica no manuseamento de acessos no computador.",
      "en": "Práticas de segurança física e lógica no manuseamento de acessos no computador."
    },
    "funFact": {
      "pt": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!",
      "en": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 264,
    "dayOfYear": 264,
    "month": 9,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Setembro",
      "en": "September 20"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Campo Assunto",
      "en": "O Campo Assunto"
    },
    "icon": "🏷️",
    "title": {
      "pt": "Dica de ouro: Nunca envies um email com o campo \"Assunto\" vazio!",
      "en": "Nunca envies um email com o campo \"Assunto\" vazio!"
    },
    "teaser": {
      "pt": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem.",
      "en": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem."
    },
    "description": {
      "pt": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\".",
      "en": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\"."
    },
    "whyItMatters": {
      "pt": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico.",
      "en": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico."
    },
    "funFact": {
      "pt": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!",
      "en": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 265,
    "dayOfYear": 265,
    "month": 9,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Setembro",
      "en": "September 21"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Histórico e Cookies",
      "en": "Histórico e Cookies"
    },
    "icon": "🍪",
    "title": {
      "pt": "Dica de ouro: Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!",
      "en": "Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!"
    },
    "teaser": {
      "pt": "Porque é que todos os sites perguntam se aceitas cookies?",
      "en": "Porque é que todos os sites perguntam se aceitas cookies?"
    },
    "description": {
      "pt": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites.",
      "en": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites."
    },
    "whyItMatters": {
      "pt": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC.",
      "en": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC."
    },
    "funFact": {
      "pt": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!",
      "en": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 266,
    "dayOfYear": 266,
    "month": 9,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Setembro",
      "en": "September 22"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Música e Sons Livres",
      "en": "Música e Sons Livres"
    },
    "icon": "🎵",
    "title": {
      "pt": "Dica de ouro: Bancos de som e música livre para os teus vídeos e jogos no Scratch!",
      "en": "Bancos de som e música livre para os teus vídeos e jogos no Scratch!"
    },
    "teaser": {
      "pt": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado.",
      "en": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado."
    },
    "description": {
      "pt": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público.",
      "en": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público."
    },
    "whyItMatters": {
      "pt": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares.",
      "en": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares."
    },
    "funFact": {
      "pt": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!",
      "en": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 267,
    "dayOfYear": 267,
    "month": 9,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Setembro",
      "en": "September 23"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Robótica e Exploração",
      "en": "Robótica e Exploração"
    },
    "icon": "🤖",
    "title": {
      "pt": "Dica de ouro: Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!",
      "en": "Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!"
    },
    "teaser": {
      "pt": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte.",
      "en": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte."
    },
    "description": {
      "pt": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas.",
      "en": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas."
    },
    "whyItMatters": {
      "pt": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna.",
      "en": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna."
    },
    "funFact": {
      "pt": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!",
      "en": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 268,
    "dayOfYear": 268,
    "month": 9,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Setembro",
      "en": "September 24"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Iluminação do Espaço",
      "en": "Iluminação do Espaço"
    },
    "icon": "💡",
    "title": {
      "pt": "Dica de ouro: Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!",
      "en": "Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!"
    },
    "teaser": {
      "pt": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?",
      "en": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?"
    },
    "description": {
      "pt": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho.",
      "en": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho."
    },
    "whyItMatters": {
      "pt": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado.",
      "en": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado."
    },
    "funFact": {
      "pt": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!",
      "en": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 269,
    "dayOfYear": 269,
    "month": 9,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Setembro",
      "en": "September 25"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Engenharia Social",
      "en": "Engenharia Social"
    },
    "icon": "🎣",
    "title": {
      "pt": "Dica de ouro: Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!",
      "en": "Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!"
    },
    "teaser": {
      "pt": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!",
      "en": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!"
    },
    "description": {
      "pt": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!",
      "en": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!"
    },
    "whyItMatters": {
      "pt": "Identificação de técnicas básicas de engenharia social e enganos virtuais.",
      "en": "Identificação de técnicas básicas de engenharia social e enganos virtuais."
    },
    "funFact": {
      "pt": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!",
      "en": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 270,
    "dayOfYear": 270,
    "month": 9,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Setembro",
      "en": "September 26"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Bloqueio de Sessão",
      "en": "Bloqueio de Sessão"
    },
    "icon": "🔒",
    "title": {
      "pt": "Dica de ouro: Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!",
      "en": "Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!"
    },
    "teaser": {
      "pt": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!",
      "en": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!"
    },
    "description": {
      "pt": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula.",
      "en": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula."
    },
    "whyItMatters": {
      "pt": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador.",
      "en": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador."
    },
    "funFact": {
      "pt": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!",
      "en": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 271,
    "dayOfYear": 271,
    "month": 9,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Setembro",
      "en": "September 27"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Spam e Cadeias",
      "en": "Spam e Cadeias"
    },
    "icon": "🗑️",
    "title": {
      "pt": "Dica de ouro: A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!",
      "en": "A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!"
    },
    "teaser": {
      "pt": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!",
      "en": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!"
    },
    "description": {
      "pt": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas.",
      "en": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas."
    },
    "whyItMatters": {
      "pt": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam.",
      "en": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam."
    },
    "funFact": {
      "pt": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!",
      "en": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 272,
    "dayOfYear": 272,
    "month": 9,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Setembro",
      "en": "September 28"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Separadores e Janelas",
      "en": "Separadores e Janelas"
    },
    "icon": "📑",
    "title": {
      "pt": "Dica de ouro: Atalhos de mestre no navegador: Control + T abre um novo separador!",
      "en": "Atalhos de mestre no navegador: Control + T abre um novo separador!"
    },
    "teaser": {
      "pt": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática.",
      "en": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática."
    },
    "description": {
      "pt": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!",
      "en": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!"
    },
    "whyItMatters": {
      "pt": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano.",
      "en": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano."
    },
    "funFact": {
      "pt": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!",
      "en": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 273,
    "dayOfYear": 273,
    "month": 9,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Setembro",
      "en": "September 29"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Software Livre vs Proprietário",
      "en": "Software Livre vs Proprietário"
    },
    "icon": "🐧",
    "title": {
      "pt": "Dica de ouro: Software Livre: o código aberto onde todos podem aprender e colaborar!",
      "en": "Software Livre: o código aberto onde todos podem aprender e colaborar!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?",
      "en": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?"
    },
    "description": {
      "pt": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade.",
      "en": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade."
    },
    "whyItMatters": {
      "pt": "Diferença entre licenças de software comercial, freeware, shareware e software livre.",
      "en": "Diferença entre licenças de software comercial, freeware, shareware e software livre."
    },
    "funFact": {
      "pt": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!",
      "en": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 274,
    "dayOfYear": 274,
    "month": 9,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Setembro",
      "en": "September 30"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Ambiente e Sustentabilidade",
      "en": "Ambiente e Sustentabilidade"
    },
    "icon": "♻️",
    "title": {
      "pt": "Dica de ouro: O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!",
      "en": "O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!"
    },
    "teaser": {
      "pt": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?",
      "en": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?"
    },
    "description": {
      "pt": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados.",
      "en": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados."
    },
    "whyItMatters": {
      "pt": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano.",
      "en": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano."
    },
    "funFact": {
      "pt": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!",
      "en": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 275,
    "dayOfYear": 275,
    "month": 10,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Outubro",
      "en": "October 1"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pausas Ativas",
      "en": "Pausas Ativas"
    },
    "icon": "🏃‍♂️",
    "title": {
      "pt": "Dica de ouro: Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!",
      "en": "Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!"
    },
    "teaser": {
      "pt": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas.",
      "en": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas."
    },
    "description": {
      "pt": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos.",
      "en": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos."
    },
    "whyItMatters": {
      "pt": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano.",
      "en": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano."
    },
    "funFact": {
      "pt": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!",
      "en": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 276,
    "dayOfYear": 276,
    "month": 10,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Outubro",
      "en": "October 2"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Direito à Imagem",
      "en": "Direito à Imagem"
    },
    "icon": "📸",
    "title": {
      "pt": "Dica de ouro: Pede sempre autorização antes de tirar ou partilhar fotos de amigos!",
      "en": "Pede sempre autorização antes de tirar ou partilhar fotos de amigos!"
    },
    "teaser": {
      "pt": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada.",
      "en": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada."
    },
    "description": {
      "pt": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares.",
      "en": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares."
    },
    "whyItMatters": {
      "pt": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade.",
      "en": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade."
    },
    "funFact": {
      "pt": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!",
      "en": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 277,
    "dayOfYear": 277,
    "month": 10,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Outubro",
      "en": "October 3"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Biometria",
      "en": "Biometria"
    },
    "icon": "👁️",
    "title": {
      "pt": "Dica de ouro: Impressão digital e reconhecimento facial: o teu corpo como senha!",
      "en": "Impressão digital e reconhecimento facial: o teu corpo como senha!"
    },
    "teaser": {
      "pt": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar.",
      "en": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar."
    },
    "description": {
      "pt": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos.",
      "en": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos."
    },
    "whyItMatters": {
      "pt": "Exploração das novas tecnologias de identificação e autenticação biométrica.",
      "en": "Exploração das novas tecnologias de identificação e autenticação biométrica."
    },
    "funFact": {
      "pt": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!",
      "en": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 278,
    "dayOfYear": 278,
    "month": 10,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Outubro",
      "en": "October 4"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Responder a Todos",
      "en": "Responder a Todos"
    },
    "icon": "👥",
    "title": {
      "pt": "Dica de ouro: Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!",
      "en": "Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!"
    },
    "teaser": {
      "pt": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\".",
      "en": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\"."
    },
    "description": {
      "pt": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!",
      "en": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!"
    },
    "whyItMatters": {
      "pt": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano.",
      "en": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano."
    },
    "funFact": {
      "pt": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!",
      "en": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 279,
    "dayOfYear": 279,
    "month": 10,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Outubro",
      "en": "October 5"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Domínios e Extensões",
      "en": "Domínios e Extensões"
    },
    "icon": "🌐",
    "title": {
      "pt": "Dica de ouro: O que significa .pt, .org, .edu e .gov no final dos sites?",
      "en": "O que significa .pt, .org, .edu e .gov no final dos sites?"
    },
    "teaser": {
      "pt": "A terminação do endereço da página Web revela muito sobre quem a criou.",
      "en": "A terminação do endereço da página Web revela muito sobre quem a criou."
    },
    "description": {
      "pt": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!",
      "en": "O domínio \".pt\" indica Portugal, \".gov\" pertence a organismos de governo oficial, \".edu\" a escolas e universidades, e \".org\" a organizações sem fins lucrativos. Sites educativos e governamentais são fontes muito mais fiáveis para trabalhos!"
    },
    "whyItMatters": {
      "pt": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional.",
      "en": "Estrutura de um URL (Localizador Padrão de Recursos) e avaliação da credibilidade institucional."
    },
    "funFact": {
      "pt": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!",
      "en": "Cada país tem a sua terminação de 2 letras: Espanha é .es, França é .fr e o Japão é .jp!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 280,
    "dayOfYear": 280,
    "month": 10,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Outubro",
      "en": "October 6"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação Direta entre Aspas",
      "en": "Citação Direta entre Aspas"
    },
    "icon": "💬",
    "title": {
      "pt": "Dica de ouro: Como citar uma frase de um livro no trabalho escolar sem cometer plágio?",
      "en": "Como citar uma frase de um livro no trabalho escolar sem cometer plágio?"
    },
    "teaser": {
      "pt": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!",
      "en": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!"
    },
    "description": {
      "pt": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!",
      "en": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!"
    },
    "whyItMatters": {
      "pt": "Normas de referenciação textual e integridade académica em produções escolares de TIC.",
      "en": "Normas de referenciação textual e integridade académica em produções escolares de TIC."
    },
    "funFact": {
      "pt": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\"",
      "en": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\""
    },
    "isSpecialMilestone": false
  },
  {
    "id": 281,
    "dayOfYear": 281,
    "month": 10,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Outubro",
      "en": "October 7"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Hardware Interno",
      "en": "Hardware Interno"
    },
    "icon": "🧠",
    "title": {
      "pt": "Avançado: A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!",
      "en": "A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!"
    },
    "teaser": {
      "pt": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?",
      "en": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?"
    },
    "description": {
      "pt": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!",
      "en": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!"
    },
    "whyItMatters": {
      "pt": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes.",
      "en": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes."
    },
    "funFact": {
      "pt": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!",
      "en": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 282,
    "dayOfYear": 282,
    "month": 10,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Outubro",
      "en": "October 8"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Postura na Cadeira",
      "en": "Postura na Cadeira"
    },
    "icon": "🪑",
    "title": {
      "pt": "Avançado: A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!",
      "en": "A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!"
    },
    "teaser": {
      "pt": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?",
      "en": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?"
    },
    "description": {
      "pt": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares.",
      "en": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares."
    },
    "whyItMatters": {
      "pt": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito.",
      "en": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito."
    },
    "funFact": {
      "pt": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!",
      "en": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 283,
    "dayOfYear": 283,
    "month": 10,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Outubro",
      "en": "October 9"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Pegada Digital",
      "en": "Pegada Digital"
    },
    "icon": "👣",
    "title": {
      "pt": "Avançado: A tua Pegada Digital é como uma pegada no cimento fresco!",
      "en": "A tua Pegada Digital é como uma pegada no cimento fresco!"
    },
    "teaser": {
      "pt": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura.",
      "en": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura."
    },
    "description": {
      "pt": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes.",
      "en": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online.",
      "en": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online."
    },
    "funFact": {
      "pt": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!",
      "en": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 284,
    "dayOfYear": 284,
    "month": 10,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Outubro",
      "en": "October 10"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Mulheres nas TIC",
      "en": "Women in Tech"
    },
    "icon": "👩‍💻",
    "title": {
      "pt": "Dia de Ada Lovelace: A Primeira Programadora do Mundo!",
      "en": "Ada Lovelace Day: The World's First Computer Programmer!"
    },
    "teaser": {
      "pt": "Em meados do século XIX, Ada percebeu que as máquinas podiam fazer mais do que simples contas.",
      "en": "In the 1840s, Ada realized machines could manipulate symbols, not just calculate numbers."
    },
    "description": {
      "pt": "Ada Lovelace trabalhou com Charles Babbage no projeto do Engenho Analítico. Em 1843, ela escreveu o primeiro algoritmo para ser processado por uma máquina, tornando-se a primeira programadora da história da humanidade, um século antes dos computadores eletrónicos!",
      "en": "Ada Lovelace wrote the world's first algorithm intended for execution on Babbage's Analytical Engine in 1843."
    },
    "whyItMatters": {
      "pt": "Mostra a importância histórica das mulheres na ciência e tecnologia e inspira raparigas e rapazes a aprender a programar.",
      "en": "Highlights the fundamental role of women in tech and inspires young students to explore coding."
    },
    "funFact": {
      "pt": "Ada era filha do famoso poeta romântico Lord Byron, mas a mãe incentivou-a a estudar matemática pura e geometria!",
      "en": "Ada was the daughter of poet Lord Byron, but her mother steered her towards mathematics and logic!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 285,
    "dayOfYear": 285,
    "month": 10,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Outubro",
      "en": "October 11"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Campos do Email",
      "en": "Campos do Email"
    },
    "icon": "🕶️",
    "title": {
      "pt": "Avançado: O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!",
      "en": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!"
    },
    "teaser": {
      "pt": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!",
      "en": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!"
    },
    "description": {
      "pt": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados.",
      "en": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados."
    },
    "whyItMatters": {
      "pt": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD.",
      "en": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD."
    },
    "funFact": {
      "pt": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!",
      "en": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 286,
    "dayOfYear": 286,
    "month": 10,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Outubro",
      "en": "October 12"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Navegador vs Motor",
      "en": "Navegador vs Motor"
    },
    "icon": "🚗",
    "title": {
      "pt": "Avançado: O Navegador é o Automóvel, o Motor de Busca é o GPS!",
      "en": "O Navegador é o Automóvel, o Motor de Busca é o GPS!"
    },
    "teaser": {
      "pt": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?",
      "en": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?"
    },
    "description": {
      "pt": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas.",
      "en": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas."
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca.",
      "en": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca."
    },
    "funFact": {
      "pt": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!",
      "en": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 287,
    "dayOfYear": 287,
    "month": 10,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Outubro",
      "en": "October 13"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Google Imagens",
      "en": "Google Imagens"
    },
    "icon": "🎨",
    "title": {
      "pt": "Avançado: As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!",
      "en": "As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!"
    },
    "teaser": {
      "pt": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei.",
      "en": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei."
    },
    "description": {
      "pt": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público.",
      "en": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público."
    },
    "whyItMatters": {
      "pt": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas.",
      "en": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas."
    },
    "funFact": {
      "pt": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!",
      "en": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 288,
    "dayOfYear": 288,
    "month": 10,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Outubro",
      "en": "October 14"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Memória do Computador",
      "en": "Memória do Computador"
    },
    "icon": "⚡",
    "title": {
      "pt": "Avançado: Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!",
      "en": "Memória RAM vs Disco SSD: a secretária de trabalho vs o armário!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?",
      "en": "Qual é a diferença entre a memória que apaga tudo quando desligas e a que guarda ficheiros?"
    },
    "description": {
      "pt": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!",
      "en": "Pensa na memória RAM como o espaço em cima da tua secretária de estudo: serve para as coisas que estás a usar agora mesmo. Quando desligas o computador, a secretária fica limpa (é volátil). O Disco SSD é o armário com gavetas: guarda os teus trabalhos para sempre!"
    },
    "whyItMatters": {
      "pt": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC.",
      "en": "Identificar a diferença entre memória primária (RAM) e armazenamento secundário (SSD/HDD) é uma competência essencial de TIC."
    },
    "funFact": {
      "pt": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!",
      "en": "Os novos discos SSD não têm peças móveis e usam chips de memória flash super rápidos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 289,
    "dayOfYear": 289,
    "month": 10,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Outubro",
      "en": "October 15"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Cuidado com os Olhos",
      "en": "Cuidado com os Olhos"
    },
    "icon": "👀",
    "title": {
      "pt": "Avançado: A Regra 20-20-20: o descanso favorito dos teus olhos!",
      "en": "A Regra 20-20-20: o descanso favorito dos teus olhos!"
    },
    "teaser": {
      "pt": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?",
      "en": "Como proteger a visão quando passas muito tempo a fazer trabalhos escolares ou a jogar?"
    },
    "description": {
      "pt": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!",
      "en": "A cada 20 minutos de ecrã, faz uma pausa de 20 segundos e olha para um ponto distante a pelo menos 6 metros (20 pés). Isto faz com que os pequenos músculos dos teus olhos relaxem completamente!"
    },
    "whyItMatters": {
      "pt": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano.",
      "en": "A prevenção da fadiga ocular digital é um dos pilares de saúde estudados no 5.º ano."
    },
    "funFact": {
      "pt": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!",
      "en": "Conscientemente pestaneja várias vezes durante a pausa para espalhar a lágrima natural nos olhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 290,
    "dayOfYear": 290,
    "month": 10,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Outubro",
      "en": "October 16"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Privacidade e Redes",
      "en": "Privacidade e Redes"
    },
    "icon": "🕵️‍♂️",
    "title": {
      "pt": "Avançado: A regra do \"Estranho no Jardim\": nada de moradas em jogos online!",
      "en": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!"
    },
    "teaser": {
      "pt": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa.",
      "en": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa."
    },
    "description": {
      "pt": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online.",
      "en": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online."
    },
    "whyItMatters": {
      "pt": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital.",
      "en": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital."
    },
    "funFact": {
      "pt": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!",
      "en": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 291,
    "dayOfYear": 291,
    "month": 10,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Outubro",
      "en": "October 17"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "O Segredo da Frase-Passe",
      "en": "O Segredo da Frase-Passe"
    },
    "icon": "🍕",
    "title": {
      "pt": "Avançado: O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!",
      "en": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!"
    },
    "teaser": {
      "pt": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar.",
      "en": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar."
    },
    "description": {
      "pt": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!",
      "en": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!"
    },
    "whyItMatters": {
      "pt": "Construção de palavras-passe fortes com base em frases mnemónicas compridas.",
      "en": "Construção de palavras-passe fortes com base em frases mnemónicas compridas."
    },
    "funFact": {
      "pt": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!",
      "en": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 292,
    "dayOfYear": 292,
    "month": 10,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Outubro",
      "en": "October 18"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Símbolo Arroba",
      "en": "O Símbolo Arroba"
    },
    "icon": "🐌",
    "title": {
      "pt": "Avançado: O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!",
      "en": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!"
    },
    "teaser": {
      "pt": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino.",
      "en": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino."
    },
    "description": {
      "pt": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!",
      "en": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!"
    },
    "whyItMatters": {
      "pt": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao.",
      "en": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao."
    },
    "funFact": {
      "pt": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!",
      "en": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 293,
    "dayOfYear": 293,
    "month": 10,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Outubro",
      "en": "October 19"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Truque das Aspas",
      "en": "Truque das Aspas"
    },
    "icon": "🔍",
    "title": {
      "pt": "Avançado: Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!",
      "en": "Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!"
    },
    "teaser": {
      "pt": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?",
      "en": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?"
    },
    "description": {
      "pt": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!",
      "en": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!"
    },
    "whyItMatters": {
      "pt": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano.",
      "en": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano."
    },
    "funFact": {
      "pt": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!",
      "en": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 294,
    "dayOfYear": 294,
    "month": 10,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Outubro",
      "en": "October 20"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "O que é Plágio",
      "en": "O que é Plágio"
    },
    "icon": "✂️",
    "title": {
      "pt": "Avançado: Plágio: roubar a medalha de ouro de outra pessoa!",
      "en": "Plágio: roubar a medalha de ouro de outra pessoa!"
    },
    "teaser": {
      "pt": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica.",
      "en": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica."
    },
    "description": {
      "pt": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste.",
      "en": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste."
    },
    "whyItMatters": {
      "pt": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano.",
      "en": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano."
    },
    "funFact": {
      "pt": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!",
      "en": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 295,
    "dayOfYear": 295,
    "month": 10,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Outubro",
      "en": "October 21"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Placa Principal",
      "en": "Placa Principal"
    },
    "icon": "🛣️",
    "title": {
      "pt": "Avançado: A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!",
      "en": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!"
    },
    "teaser": {
      "pt": "Como é que a placa gráfica fala com o processador e com o disco rígido?",
      "en": "Como é que a placa gráfica fala com o processador e com o disco rígido?"
    },
    "description": {
      "pt": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI.",
      "en": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus).",
      "en": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus)."
    },
    "funFact": {
      "pt": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!",
      "en": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 296,
    "dayOfYear": 296,
    "month": 10,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Outubro",
      "en": "October 22"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Sono e Tecnologia",
      "en": "Sono e Tecnologia"
    },
    "icon": "🌙",
    "title": {
      "pt": "Avançado: A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\"",
      "en": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\""
    },
    "teaser": {
      "pt": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?",
      "en": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?"
    },
    "description": {
      "pt": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola.",
      "en": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola."
    },
    "whyItMatters": {
      "pt": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias.",
      "en": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias."
    },
    "funFact": {
      "pt": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!",
      "en": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 297,
    "dayOfYear": 297,
    "month": 10,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Outubro",
      "en": "October 23"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Apoio e Helplines",
      "en": "Apoio e Helplines"
    },
    "icon": "📞",
    "title": {
      "pt": "Avançado: Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!",
      "en": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!"
    },
    "teaser": {
      "pt": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar.",
      "en": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar."
    },
    "description": {
      "pt": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!",
      "en": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!"
    },
    "whyItMatters": {
      "pt": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental.",
      "en": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental."
    },
    "funFact": {
      "pt": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!",
      "en": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 298,
    "dayOfYear": 298,
    "month": 10,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Outubro",
      "en": "October 24"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Partilha de Senhas",
      "en": "Partilha de Senhas"
    },
    "icon": "🪥",
    "title": {
      "pt": "Avançado: Palavras-passe são como escovas de dentes: não se emprestam a ninguém!",
      "en": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!"
    },
    "teaser": {
      "pt": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital.",
      "en": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital."
    },
    "description": {
      "pt": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem.",
      "en": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem."
    },
    "whyItMatters": {
      "pt": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal.",
      "en": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal."
    },
    "funFact": {
      "pt": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!",
      "en": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 299,
    "dayOfYear": 299,
    "month": 10,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Outubro",
      "en": "October 25"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Netiqueta em Emails",
      "en": "Netiqueta em Emails"
    },
    "icon": "📢",
    "title": {
      "pt": "Avançado: Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!",
      "en": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!"
    },
    "teaser": {
      "pt": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais.",
      "en": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais."
    },
    "description": {
      "pt": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã.",
      "en": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã."
    },
    "whyItMatters": {
      "pt": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico.",
      "en": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico."
    },
    "funFact": {
      "pt": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!",
      "en": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 300,
    "dayOfYear": 300,
    "month": 10,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Outubro",
      "en": "October 26"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Segurança HTTPS",
      "en": "Segurança HTTPS"
    },
    "icon": "🔒",
    "title": {
      "pt": "Avançado: O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!",
      "en": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!"
    },
    "teaser": {
      "pt": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\".",
      "en": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\"."
    },
    "description": {
      "pt": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias.",
      "en": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias."
    },
    "whyItMatters": {
      "pt": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC.",
      "en": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC."
    },
    "funFact": {
      "pt": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!",
      "en": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 301,
    "dayOfYear": 301,
    "month": 10,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Outubro",
      "en": "October 27"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Creative Commons",
      "en": "Creative Commons"
    },
    "icon": "🤝",
    "title": {
      "pt": "Avançado: Creative Commons: o convite amigável para partilhar criatividade com o mundo!",
      "en": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!"
    },
    "teaser": {
      "pt": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?",
      "en": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?"
    },
    "description": {
      "pt": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\".",
      "en": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\"."
    },
    "whyItMatters": {
      "pt": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7.",
      "en": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7."
    },
    "funFact": {
      "pt": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!",
      "en": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 302,
    "dayOfYear": 302,
    "month": 10,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Outubro",
      "en": "October 28"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Linguagem dos Computadores",
      "en": "Linguagem dos Computadores"
    },
    "icon": "0️⃣",
    "title": {
      "pt": "Avançado: Tudo no computador são apenas ZEROS e UNS (0 e 1)!",
      "en": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!"
    },
    "teaser": {
      "pt": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?",
      "en": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?"
    },
    "description": {
      "pt": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!",
      "en": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!"
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte.",
      "en": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte."
    },
    "funFact": {
      "pt": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!",
      "en": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 303,
    "dayOfYear": 303,
    "month": 10,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Outubro",
      "en": "October 29"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Nascimento da Internet",
      "en": "Birth of the Internet"
    },
    "icon": "🔌",
    "title": {
      "pt": "O Nascimento da Internet: a primeira mensagem \"LO\"!",
      "en": "The Birth of the Internet: the very first message \"LO\"!"
    },
    "teaser": {
      "pt": "A 29 de outubro de 1969, dois computadores comunicaram pela primeira vez a 500 km de distância.",
      "en": "On Oct 29, 1969, two distant computers connected for the first time on ARPANET."
    },
    "description": {
      "pt": "Estudantes da Universidade da Califórnia (UCLA) tentaram escrever \"LOGIN\" para um computador em Stanford. Escreveram a letra \"L\", o outro computador confirmou. Escreveram a letra \"O\"... e o sistema encravou! Assim, a primeira palavra transmitida pela Internet foi apenas \"LO\"!",
      "en": "Students tried typing \"LOGIN\" between UCLA and Stanford. It crashed after \"L\" and \"O\", making \"LO\" the first message!"
    },
    "whyItMatters": {
      "pt": "Essa primeira ligação da ARPANET foi o embrião da rede mundial de computadores que usamos hoje em dia.",
      "en": "That first ARPANET link was the direct ancestor of today's global Internet."
    },
    "funFact": {
      "pt": "Os cientistas acharam graça porque \"LO\" em inglês antigo significa \"Olha e contempla!\" 😄",
      "en": "Scientists laughed because \"LO\" is archaic English for \"Behold!\" 😄"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 304,
    "dayOfYear": 304,
    "month": 10,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Outubro",
      "en": "October 30"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Netiqueta e Empatia",
      "en": "Netiqueta e Empatia"
    },
    "icon": "💬",
    "title": {
      "pt": "Avançado: Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!",
      "en": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!"
    },
    "teaser": {
      "pt": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?",
      "en": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?"
    },
    "description": {
      "pt": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa.",
      "en": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa."
    },
    "whyItMatters": {
      "pt": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano.",
      "en": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano."
    },
    "funFact": {
      "pt": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!",
      "en": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 305,
    "dayOfYear": 305,
    "month": 10,
    "day": 31,
    "dateLabel": {
      "pt": "31 de Outubro",
      "en": "October 31"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Autenticação de 2 Fatores",
      "en": "Autenticação de 2 Fatores"
    },
    "icon": "📲",
    "title": {
      "pt": "Avançado: Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!",
      "en": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!"
    },
    "teaser": {
      "pt": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.",
      "en": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código."
    },
    "description": {
      "pt": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes.",
      "en": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes."
    },
    "whyItMatters": {
      "pt": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC.",
      "en": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC."
    },
    "funFact": {
      "pt": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!",
      "en": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 306,
    "dayOfYear": 306,
    "month": 11,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Novembro",
      "en": "November 1"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Anexos Perigosos",
      "en": "Anexos Perigosos"
    },
    "icon": "📎",
    "title": {
      "pt": "Avançado: Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!",
      "en": "Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!"
    },
    "teaser": {
      "pt": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos.",
      "en": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos."
    },
    "description": {
      "pt": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros.",
      "en": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros."
    },
    "whyItMatters": {
      "pt": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC.",
      "en": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC."
    },
    "funFact": {
      "pt": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!",
      "en": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 307,
    "dayOfYear": 307,
    "month": 11,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Novembro",
      "en": "November 2"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Combate a Fake News",
      "en": "Combate a Fake News"
    },
    "icon": "🕵️‍♀️",
    "title": {
      "pt": "Avançado: O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!",
      "en": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!"
    },
    "teaser": {
      "pt": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções.",
      "en": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções."
    },
    "description": {
      "pt": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?",
      "en": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?"
    },
    "whyItMatters": {
      "pt": "Literacia da informação e espírito crítico na avaliação de fontes da Web.",
      "en": "Literacia da informação e espírito crítico na avaliação de fontes da Web."
    },
    "funFact": {
      "pt": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!",
      "en": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 308,
    "dayOfYear": 308,
    "month": 11,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Novembro",
      "en": "November 3"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação e Bibliografia",
      "en": "Citação e Bibliografia"
    },
    "icon": "📚",
    "title": {
      "pt": "Avançado: Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!",
      "en": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!"
    },
    "teaser": {
      "pt": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!",
      "en": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!"
    },
    "description": {
      "pt": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso.",
      "en": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso."
    },
    "whyItMatters": {
      "pt": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC.",
      "en": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC."
    },
    "funFact": {
      "pt": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!",
      "en": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 309,
    "dayOfYear": 309,
    "month": 11,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Novembro",
      "en": "November 4"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Periféricos de TIC",
      "en": "Periféricos de TIC"
    },
    "icon": "🖨️",
    "title": {
      "pt": "Avançado: Periféricos: a ponte mágica entre o ser humano e a máquina!",
      "en": "Periféricos: a ponte mágica entre o ser humano e a máquina!"
    },
    "teaser": {
      "pt": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?",
      "en": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?"
    },
    "description": {
      "pt": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!",
      "en": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!"
    },
    "whyItMatters": {
      "pt": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1.",
      "en": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1."
    },
    "funFact": {
      "pt": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!",
      "en": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 310,
    "dayOfYear": 310,
    "month": 11,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Novembro",
      "en": "November 5"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Volume e Audição",
      "en": "Volume e Audição"
    },
    "icon": "🎧",
    "title": {
      "pt": "Avançado: A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!",
      "en": "A Regra 60/60 para auscultadores: protege os teus ouvidos para a vida!"
    },
    "teaser": {
      "pt": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição.",
      "en": "Ouvir música ou jogos aos berros nos fones pode causar danos irreversíveis na audição."
    },
    "description": {
      "pt": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!",
      "en": "Os médicos recomendam a regra dos 60/60: nunca usar auscultadores a mais de 60% do volume máximo, e fazer uma pausa a cada 60 minutos. Se a pessoa ao teu lado consegue ouvir o som dos teus fones, está alto demais!"
    },
    "whyItMatters": {
      "pt": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC.",
      "en": "O bem-estar e a saúde no uso de periféricos de som fazem parte do programa curricular de TIC."
    },
    "funFact": {
      "pt": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!",
      "en": "As pequenas células ciliadas do ouvido interno não se regeneram se forem destruídas por som estridente!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 311,
    "dayOfYear": 311,
    "month": 11,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Novembro",
      "en": "November 6"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Localização GPS",
      "en": "Localização GPS"
    },
    "icon": "📍",
    "title": {
      "pt": "Avançado: Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!",
      "en": "Cuidado com a Geolocalização: as tuas fotos contêm coordenadas secretas!"
    },
    "teaser": {
      "pt": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?",
      "en": "Sabias que as fotos do telemóvel podem guardar a latitude e longitude exatas de onde foram tiradas?"
    },
    "description": {
      "pt": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives.",
      "en": "Os metadados EXIF guardam a data, modelo da câmara e a localização GPS da foto. Antes de publicar fotos publicamente, é aconselhável desligar a geolocalização nas definições da câmara para ninguém descobrir onde vives."
    },
    "whyItMatters": {
      "pt": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros.",
      "en": "No Tema 3 aprendemos como funcionam os dados invisíveis que os dispositivos anexam aos ficheiros."
    },
    "funFact": {
      "pt": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!",
      "en": "Fotos tiradas dentro de casa nunca devem mostrar janelas com placas do nome da rua ou números de polícia!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 312,
    "dayOfYear": 312,
    "month": 11,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Novembro",
      "en": "November 7"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Gestores de Senhas",
      "en": "Gestores de Senhas"
    },
    "icon": "🗄️",
    "title": {
      "pt": "Avançado: Nunca repitas a mesma palavra-passe em todos os sites e aplicações!",
      "en": "Nunca repitas a mesma palavra-passe em todos os sites e aplicações!"
    },
    "teaser": {
      "pt": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco.",
      "en": "Se um site de jogos sofrer uma fuga de informação, a tua conta de email também fica em risco."
    },
    "description": {
      "pt": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido.",
      "en": "Quando usas a mesma senha em todo o lado, basta um site ter falhas de segurança para os criminosos tentarem entrar nas tuas restantes contas. Usa senhas diferentes ou um gestor de senhas protegido."
    },
    "whyItMatters": {
      "pt": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano.",
      "en": "Higiene e diversificação de credenciais em plataformas digitais no 5.º ano."
    },
    "funFact": {
      "pt": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!",
      "en": "Podes usar gestores de palavras-passe seguros integrados nos navegadores com a ajuda dos teus pais!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 313,
    "dayOfYear": 313,
    "month": 11,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Novembro",
      "en": "November 8"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Phishing por Email",
      "en": "Phishing por Email"
    },
    "icon": "🎣",
    "title": {
      "pt": "Avançado: Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!",
      "en": "Phishing: o \"pescador\" digital que tenta roubar a tua palavra-passe!"
    },
    "teaser": {
      "pt": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!",
      "en": "\"A sua conta vai ser apagada em 24 horas! Clique aqui urgente!\" — É Phishing!"
    },
    "description": {
      "pt": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!",
      "en": "O termo vem de \"fishing\" (pesca). Os burlões lançam um isco assustador para te fazer clicar num link falso que imita a tua escola ou banco. Repara com atenção no endereço do remetente: costuma ter erros estranhos!"
    },
    "whyItMatters": {
      "pt": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing.",
      "en": "Identificação de sinais de alerta em emails fraudulentos e mensagens de phishing."
    },
    "funFact": {
      "pt": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!",
      "en": "Nenhum serviço legítimo te ameaça com fecho imediato de conta sem contacto oficial prévio!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 314,
    "dayOfYear": 314,
    "month": 11,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Novembro",
      "en": "November 9"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Aranhas da Web",
      "en": "Aranhas da Web"
    },
    "icon": "🕷️",
    "title": {
      "pt": "Avançado: As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!",
      "en": "As \"Aranhas\" invisíveis da Internet que leem a rede enquanto dormes!"
    },
    "teaser": {
      "pt": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?",
      "en": "Como é que o motor de busca sabe o que existe em milhares de milhões de sites?"
    },
    "description": {
      "pt": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice.",
      "en": "Os motores de busca usam programas automáticos chamados rastreadores Web (web crawlers ou spiders). Elas viajam de link em link dia e noite, lendo o conteúdo das páginas e organizando uma biblioteca gigante chamada Índice."
    },
    "whyItMatters": {
      "pt": "Compreender como a informação é indexada e recuperada nos motores de pesquisa.",
      "en": "Compreender como a informação é indexada e recuperada nos motores de pesquisa."
    },
    "funFact": {
      "pt": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!",
      "en": "O Google começou com um robô de busca criado por dois estudantes de doutoramento em Stanford em 1996!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 315,
    "dayOfYear": 315,
    "month": 11,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Novembro",
      "en": "November 10"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Domínio Público",
      "en": "Domínio Público"
    },
    "icon": "🏛️",
    "title": {
      "pt": "Avançado: O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!",
      "en": "O que é o Domínio Público? O tesouro cultural que pertence a toda a humanidade!"
    },
    "teaser": {
      "pt": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?",
      "en": "Sabias que podes usar quadros de Leonardo da Vinci e músicas de Mozart sem pedir licença?"
    },
    "description": {
      "pt": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!",
      "en": "Quando os direitos de autor expiram (em Portugal, geralmente 70 anos após a morte do autor), a obra entra no Domínio Público. Qualquer pessoa pode ler, tocar, partilhar ou criar versões novas livremente!"
    },
    "whyItMatters": {
      "pt": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum.",
      "en": "Compreensão dos prazos de proteção de direitos de autor e acesso ao património comum."
    },
    "funFact": {
      "pt": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!",
      "en": "As primeiras versões do Rato Mickey dos anos 20 entraram recentemente no Domínio Público!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 316,
    "dayOfYear": 316,
    "month": 11,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Novembro",
      "en": "November 11"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "História do Rato",
      "en": "História do Rato"
    },
    "icon": "🖱️",
    "title": {
      "pt": "Avançado: O primeiro rato do mundo foi feito de madeira com rodas de metal!",
      "en": "O primeiro rato do mundo foi feito de madeira com rodas de metal!"
    },
    "teaser": {
      "pt": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo.",
      "en": "Inventado em 1964 por Douglas Engelbart, tinha apenas um botão vermelho no topo."
    },
    "description": {
      "pt": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!",
      "en": "Antes do rato, para abrir um ficheiro era preciso escrever linhas de código difíceis num teclado. Engelbart inventou uma caixinha de madeira com duas rodas em baixo para mover uma setinha no ecrã e facilitar o uso para qualquer pessoa!"
    },
    "whyItMatters": {
      "pt": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC.",
      "en": "Estudamos a evolução das interfaces gráficas (GUI) e periféricos no 1.º tema de TIC."
    },
    "funFact": {
      "pt": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!",
      "en": "Recebeu o nome de rato porque o cabo que saía da parte de trás parecia uma cauda!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 317,
    "dayOfYear": 317,
    "month": 11,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Novembro",
      "en": "November 12"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Mochila Escolar",
      "en": "Mochila Escolar"
    },
    "icon": "🎒",
    "title": {
      "pt": "Avançado: O peso da mochila não deve ultrapassar 10% do teu peso corporal!",
      "en": "O peso da mochila não deve ultrapassar 10% do teu peso corporal!"
    },
    "teaser": {
      "pt": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização.",
      "en": "Levar o computador portátil e cadernos pesados nas costas exige bons hábitos de organização."
    },
    "description": {
      "pt": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só.",
      "en": "Se pesas 40 kg, a tua mochila não devia pesar mais do que 4 kg! Coloca os objetos mais pesados colados às costas e usa sempre as duas alças bem ajustadas, nunca pendurada num ombro só."
    },
    "whyItMatters": {
      "pt": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis.",
      "en": "A ergonomia estende-se ao transporte de materiais escolares e tecnologias portáteis."
    },
    "funFact": {
      "pt": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!",
      "en": "Uma mochila desregulada pode causar desvios na coluna como a escoliose na adolescência!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 318,
    "dayOfYear": 318,
    "month": 11,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Novembro",
      "en": "November 13"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Câmaras e Microfones",
      "en": "Câmaras e Microfones"
    },
    "icon": "📹",
    "title": {
      "pt": "Avançado: Tapa a webcam quando não estiveres em videochamada escolar!",
      "en": "Tapa a webcam quando não estiveres em videochamada escolar!"
    },
    "teaser": {
      "pt": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara.",
      "en": "Até os maiores peritos de informática usam uma pequena tampa deslizante na câmara."
    },
    "description": {
      "pt": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz.",
      "en": "Para garantir privacidade total contra aplicações maliciosas, manter a câmara tapada com uma capa protetora deslizante quando não a usas é um hábito simples, prático e 100% eficaz."
    },
    "whyItMatters": {
      "pt": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet.",
      "en": "Controlo de permissões de hardware (microfone e câmara) nas aplicações do computador e tablet."
    },
    "funFact": {
      "pt": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!",
      "en": "Em 2016, uma foto mostrou que até o criador do Facebook tinha fita adesiva na câmara do seu portátil!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 319,
    "dayOfYear": 319,
    "month": 11,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Novembro",
      "en": "November 14"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Post-its no Monitor",
      "en": "Post-its no Monitor"
    },
    "icon": "📝",
    "title": {
      "pt": "Avançado: O erro clássico: colar papéis com a palavra-passe no ecrã do computador!",
      "en": "O erro clássico: colar papéis com a palavra-passe no ecrã do computador!"
    },
    "teaser": {
      "pt": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura.",
      "en": "Escrever a senha num post-it amarelo e colar no monitor é como deixar a chave na fechadura."
    },
    "description": {
      "pt": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas.",
      "en": "Qualquer colega ou pessoa que passe pela secretária consegue ver e anotar a tua senha num instante. Guarda as tuas credenciais de memória ou em ferramentas digitais encriptadas e protegidas."
    },
    "whyItMatters": {
      "pt": "Práticas de segurança física e lógica no manuseamento de acessos no computador.",
      "en": "Práticas de segurança física e lógica no manuseamento de acessos no computador."
    },
    "funFact": {
      "pt": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!",
      "en": "Nos escritórios e bancos, é estritamente proibido ter papéis com senhas à vista na secretária!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 320,
    "dayOfYear": 320,
    "month": 11,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Novembro",
      "en": "November 15"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Campo Assunto",
      "en": "O Campo Assunto"
    },
    "icon": "🏷️",
    "title": {
      "pt": "Avançado: Nunca envies um email com o campo \"Assunto\" vazio!",
      "en": "Nunca envies um email com o campo \"Assunto\" vazio!"
    },
    "teaser": {
      "pt": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem.",
      "en": "O Assunto deve resumir em poucas palavras o objetivo exato da mensagem."
    },
    "description": {
      "pt": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\".",
      "en": "Enviar um email sem assunto é como entregar uma carta dentro de um envelope completamente em branco. Escreve um assunto claro, por exemplo: \"Trabalho de TIC - Tema 5 - João Silva N.º 12 - 5.º B\"."
    },
    "whyItMatters": {
      "pt": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico.",
      "en": "Composição correta dos elementos essenciais de uma mensagem de correio eletrónico."
    },
    "funFact": {
      "pt": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!",
      "en": "Emails sem assunto vão frequentemente parar à pasta de Spam ou Lixo Eletrónico de forma automática!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 321,
    "dayOfYear": 321,
    "month": 11,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Novembro",
      "en": "November 16"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Histórico e Cookies",
      "en": "Histórico e Cookies"
    },
    "icon": "🍪",
    "title": {
      "pt": "Avançado: Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!",
      "en": "Cookies na Internet: não são bolachas de chocolate, são pequenas notas de texto!"
    },
    "teaser": {
      "pt": "Porque é que todos os sites perguntam se aceitas cookies?",
      "en": "Porque é que todos os sites perguntam se aceitas cookies?"
    },
    "description": {
      "pt": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites.",
      "en": "Um cookie é um pequeno ficheiro de texto que o site guarda no teu navegador para se lembrar de quem és, que língua preferes ou que itens tens no carrinho de compras. Cookies de terceiros podem seguir a tua navegação entre sites."
    },
    "whyItMatters": {
      "pt": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC.",
      "en": "Gestão de privacidade, cookies e limpeza de histórico de navegação no Tema 6 de TIC."
    },
    "funFact": {
      "pt": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!",
      "en": "O nome \"cookie\" foi inspirado nos \"biscoitos da sorte\" chineses que trazem uma mensagem secreta dentro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 322,
    "dayOfYear": 322,
    "month": 11,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Novembro",
      "en": "November 17"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Música e Sons Livres",
      "en": "Música e Sons Livres"
    },
    "icon": "🎵",
    "title": {
      "pt": "Avançado: Bancos de som e música livre para os teus vídeos e jogos no Scratch!",
      "en": "Bancos de som e música livre para os teus vídeos e jogos no Scratch!"
    },
    "teaser": {
      "pt": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado.",
      "en": "Usar músicas famosas da rádio no teu vídeo do YouTube pode fazer o vídeo ser bloqueado."
    },
    "description": {
      "pt": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público.",
      "en": "Plataformas de vídeo usam algoritmos automáticos de reconhecimento de áudio que bloqueiam músicas protegidas por direitos comerciais. Usa bancos de áudio livres como a YouTube Audio Library ou sons de Domínio Público."
    },
    "whyItMatters": {
      "pt": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares.",
      "en": "Pesquisa e integração ética de recursos multimédia em projetos digitais escolares."
    },
    "funFact": {
      "pt": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!",
      "en": "Muitos músicos famosos gravam canções e lançam-nas voluntariamente sob a licença livre CC0!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 323,
    "dayOfYear": 323,
    "month": 11,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Novembro",
      "en": "November 18"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Robótica e Exploração",
      "en": "Robótica e Exploração"
    },
    "icon": "🤖",
    "title": {
      "pt": "Avançado: Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!",
      "en": "Robôs em Marte: cientistas conduzem rovers a milhões de quilómetros da Terra!"
    },
    "teaser": {
      "pt": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte.",
      "en": "Os robôs Curiosity e Perseverance usam computadores de bordo para analisar rochas em Marte."
    },
    "description": {
      "pt": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas.",
      "en": "Os sinais de rádio demoram até 20 minutos a viajar da Terra até Marte! Por isso, os robôs marcianos têm de ter inteligência a bordo para evitar rochas e buracos sozinhos sem esperar pela resposta imediata dos cientistas."
    },
    "whyItMatters": {
      "pt": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna.",
      "en": "Exploramos como a robótica e a automação transformam a ciência e a sociedade moderna."
    },
    "funFact": {
      "pt": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!",
      "en": "O rover Perseverance tem um pequeno helicóptero chamado Ingenuity que voou na atmosfera rarefeita de Marte!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 324,
    "dayOfYear": 324,
    "month": 11,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Novembro",
      "en": "November 19"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Iluminação do Espaço",
      "en": "Iluminação do Espaço"
    },
    "icon": "💡",
    "title": {
      "pt": "Avançado: Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!",
      "en": "Evita reflexos no ecrã: a janela nunca deve ficar atrás de ti!"
    },
    "teaser": {
      "pt": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?",
      "en": "Como deves orientar a tua mesa de computador em relação à luz natural da janela?"
    },
    "description": {
      "pt": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho.",
      "en": "Se a janela ficar diretamente atrás de ti, o sol cria reflexos ofuscantes no ecrã. Se ficar mesmo atrás do monitor, ficas encandeado. O ideal é a luz natural entrar de lado em relação à mesa de trabalho."
    },
    "whyItMatters": {
      "pt": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado.",
      "en": "No Tema 2 aprendemos a organizar um posto de trabalho agradável, bem iluminado e arejado."
    },
    "funFact": {
      "pt": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!",
      "en": "Manter a sala arejada ajuda a renovar o oxigénio e melhora a tua concentração nas aulas de TIC!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 325,
    "dayOfYear": 325,
    "month": 11,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Novembro",
      "en": "November 20"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Engenharia Social",
      "en": "Engenharia Social"
    },
    "icon": "🎣",
    "title": {
      "pt": "Avançado: Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!",
      "en": "Cuidado com o Isco: ofertas de \"Moedas Grátis\" em jogos são quase sempre armadilhas!"
    },
    "teaser": {
      "pt": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!",
      "en": "\"Clica aqui para ganhares 10.000 Robux ou V-Bucks de graça!\" — Desconfia sempre!"
    },
    "description": {
      "pt": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!",
      "en": "Cibercriminosos usam sites falsos com promessas de moedas virtuais grátis para roubar senhas e contas. A regra é simples: se parece bom demais para ser verdade, é uma fraude de certeza absoluta!"
    },
    "whyItMatters": {
      "pt": "Identificação de técnicas básicas de engenharia social e enganos virtuais.",
      "en": "Identificação de técnicas básicas de engenharia social e enganos virtuais."
    },
    "funFact": {
      "pt": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!",
      "en": "As empresas oficiais dos jogos nunca pedem a tua palavra-passe para te darem prémios!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 326,
    "dayOfYear": 326,
    "month": 11,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Novembro",
      "en": "November 21"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Bloqueio de Sessão",
      "en": "Bloqueio de Sessão"
    },
    "icon": "🔒",
    "title": {
      "pt": "Avançado: Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!",
      "en": "Atalho ninja: Tecla Windows + L para bloquear o ecrã em 1 segundo!"
    },
    "teaser": {
      "pt": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!",
      "en": "Vais ao intervalo ou à casa de banho na sala de informática? Bloqueia a sessão!"
    },
    "description": {
      "pt": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula.",
      "en": "No Windows, pressionar a tecla Windows junto com a letra \"L\" bloqueia o ecrã instantaneamente. Assim ninguém mexe no teu trabalho escolar enquanto estás ausente da sala de aula."
    },
    "whyItMatters": {
      "pt": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador.",
      "en": "Utilização correta dos atalhos de sistema operativo para proteger sessões de utilizador."
    },
    "funFact": {
      "pt": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!",
      "en": "No computador Mac da Apple, o atalho equivalente é Control + Command + Q!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 327,
    "dayOfYear": 327,
    "month": 11,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Novembro",
      "en": "November 22"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Spam e Cadeias",
      "en": "Spam e Cadeias"
    },
    "icon": "🗑️",
    "title": {
      "pt": "Avançado: A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!",
      "en": "A origem da palavra \"SPAM\": uma lata de carne temperada dos anos 70!"
    },
    "teaser": {
      "pt": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!",
      "en": "Mensagens publicitárias não solicitadas receberam o nome de uma comida enlatada!"
    },
    "description": {
      "pt": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas.",
      "en": "O grupo de humor britânico Monty Python fez uma comédia em que os clientes num restaurante só podiam pedir \"Spam\" e cantavam a palavra sem parar. Os primeiros utilizadores da net usaram o termo para mensagens repetitivas e chatas."
    },
    "whyItMatters": {
      "pt": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam.",
      "en": "Gestão de pastas de correio: Caixa de Entrada, Itens Enviados, Rascunhos e Spam."
    },
    "funFact": {
      "pt": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!",
      "en": "Cartas em cadeia que dizem \"Reenvia a 10 amigos ou terás azar\" são mitos falsos: apaga-as logo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 328,
    "dayOfYear": 328,
    "month": 11,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Novembro",
      "en": "November 23"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Separadores e Janelas",
      "en": "Separadores e Janelas"
    },
    "icon": "📑",
    "title": {
      "pt": "Avançado: Atalhos de mestre no navegador: Control + T abre um novo separador!",
      "en": "Atalhos de mestre no navegador: Control + T abre um novo separador!"
    },
    "teaser": {
      "pt": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática.",
      "en": "Dominar o teclado faz-te navegar como um verdadeiro profissional de informática."
    },
    "description": {
      "pt": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!",
      "en": "Usa Control + T para abrir um novo separador, Control + W para fechar o separador atual, e se fechares sem querer a página onde estavas, Control + Shift + T reabre milagrosamente o último separador fechado!"
    },
    "whyItMatters": {
      "pt": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano.",
      "en": "Eficiência e atalhos de teclado na navegação Web nas aulas de TIC do 5.º ano."
    },
    "funFact": {
      "pt": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!",
      "en": "No computador Mac, substitui a tecla Control pela tecla Command nos mesmos atalhos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 329,
    "dayOfYear": 329,
    "month": 11,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Novembro",
      "en": "November 24"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Software Livre vs Proprietário",
      "en": "Software Livre vs Proprietário"
    },
    "icon": "🐧",
    "title": {
      "pt": "Avançado: Software Livre: o código aberto onde todos podem aprender e colaborar!",
      "en": "Software Livre: o código aberto onde todos podem aprender e colaborar!"
    },
    "teaser": {
      "pt": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?",
      "en": "Qual é a diferença entre programas comerciais fechados e aplicações como o Linux e o Scratch?"
    },
    "description": {
      "pt": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade.",
      "en": "Software Proprietário não permite ver como foi feito por dentro. O Software Livre e de Código Aberto (Open Source) partilha o código para que qualquer estudante ou programador possa estudar, melhorar e partilhar livremente com a comunidade."
    },
    "whyItMatters": {
      "pt": "Diferença entre licenças de software comercial, freeware, shareware e software livre.",
      "en": "Diferença entre licenças de software comercial, freeware, shareware e software livre."
    },
    "funFact": {
      "pt": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!",
      "en": "A mascote do sistema operativo livre Linux é um simpático pinguim chamado Tux!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 330,
    "dayOfYear": 330,
    "month": 11,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Novembro",
      "en": "November 25"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Ambiente e Sustentabilidade",
      "en": "Ambiente e Sustentabilidade"
    },
    "icon": "♻️",
    "title": {
      "pt": "Avançado: O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!",
      "en": "O Lixo Eletrónico (E-Waste): computadores velhos não vão para o lixo comum!"
    },
    "teaser": {
      "pt": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?",
      "en": "O que deves fazer quando um telemóvel, teclado ou comando de consola avaria de vez?"
    },
    "description": {
      "pt": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados.",
      "en": "Os equipamentos de TIC contêm metais preciosos (como ouro, prata e cobre) e substâncias químicas que não podem poluir a natureza. Devem ser entregues no Eletrão ou em lojas com contentores de reciclagem elétrica adequados."
    },
    "whyItMatters": {
      "pt": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano.",
      "en": "A cidadania ambiental e a pegada ecológica das TIC fazem parte das metas do 5.º ano."
    },
    "funFact": {
      "pt": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!",
      "en": "Com o circuito de 40 telemóveis reciclados consegue-se recuperar ouro suficiente para fazer uma aliança!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 331,
    "dayOfYear": 331,
    "month": 11,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Novembro",
      "en": "November 26"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pausas Ativas",
      "en": "Pausas Ativas"
    },
    "icon": "🏃‍♂️",
    "title": {
      "pt": "Avançado: Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!",
      "en": "Alongamentos rápidos: estica os braços e roda os pulsos a cada hora!"
    },
    "teaser": {
      "pt": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas.",
      "en": "Ficar sentado horas seguidas na mesma posição cansa o corpo mais do que pensas."
    },
    "description": {
      "pt": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos.",
      "en": "A cada 50 ou 60 minutos de aula ou estudo no computador, levanta-te, caminha até à janela, bebe um copo de água e roda suavemente os pulsos para prevenir dores nas mãos e dedos."
    },
    "whyItMatters": {
      "pt": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano.",
      "en": "A promoção de estilos de vida ativos e a quebra do sedentarismo são essenciais no 5.º ano."
    },
    "funFact": {
      "pt": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!",
      "en": "Beber água regularmente hidrata o cérebro e melhora o tempo de resposta em jogos e testes!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 332,
    "dayOfYear": 332,
    "month": 11,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Novembro",
      "en": "November 27"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Direito à Imagem",
      "en": "Direito à Imagem"
    },
    "icon": "📸",
    "title": {
      "pt": "Avançado: Pede sempre autorização antes de tirar ou partilhar fotos de amigos!",
      "en": "Pede sempre autorização antes de tirar ou partilhar fotos de amigos!"
    },
    "teaser": {
      "pt": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada.",
      "en": "Cada pessoa é dona da sua própria imagem e tem o direito de não querer ser fotografada."
    },
    "description": {
      "pt": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares.",
      "en": "Mesmo na escola, fotografar ou filmar um colega e colocar nas redes sociais sem o consentimento dele e dos encarregados de educação é uma violação grave de privacidade e das regras escolares."
    },
    "whyItMatters": {
      "pt": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade.",
      "en": "Compreender o direito à imagem e à reserva da intimidade da vida privada no 5.º ano de escolaridade."
    },
    "funFact": {
      "pt": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!",
      "en": "Perguntar \"Posso partilhar esta foto connosco?\" é uma demonstração de respeito e amizade verdadeira!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 333,
    "dayOfYear": 333,
    "month": 11,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Novembro",
      "en": "November 28"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Biometria",
      "en": "Biometria"
    },
    "icon": "👁️",
    "title": {
      "pt": "Avançado: Impressão digital e reconhecimento facial: o teu corpo como senha!",
      "en": "Impressão digital e reconhecimento facial: o teu corpo como senha!"
    },
    "teaser": {
      "pt": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar.",
      "en": "A biometria usa caraterísticas físicas únicas que ninguém consegue copiar."
    },
    "description": {
      "pt": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos.",
      "en": "Sensores biométricos leem as linhas do teu dedo ou a geometria do teu rosto para desbloquear tablets e telemóveis. É rápido, prático e muito mais difícil de adivinhar do que uma senha de 4 algarismos."
    },
    "whyItMatters": {
      "pt": "Exploração das novas tecnologias de identificação e autenticação biométrica.",
      "en": "Exploração das novas tecnologias de identificação e autenticação biométrica."
    },
    "funFact": {
      "pt": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!",
      "en": "Nem sequer gémeos verdadeiros têm impressões digitais exatamente idênticas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 334,
    "dayOfYear": 334,
    "month": 11,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Novembro",
      "en": "November 29"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Responder a Todos",
      "en": "Responder a Todos"
    },
    "icon": "👥",
    "title": {
      "pt": "Avançado: Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!",
      "en": "Cuidado com o botão \"Responder a Todos\": não enchas a caixa dos colegas!"
    },
    "teaser": {
      "pt": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\".",
      "en": "Se queres responder apenas à professora, clica em \"Responder\" e não em \"Responder a Todos\"."
    },
    "description": {
      "pt": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!",
      "en": "Se a professora enviar um trabalho para os 25 alunos da turma e tu responderes \"Obrigado!\" com \"Responder a Todos\", todos os 25 colegas vão receber uma notificação desnecessária!"
    },
    "whyItMatters": {
      "pt": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano.",
      "en": "Uso responsável e ponderado das ferramentas de comunicação coletiva no 5.º ano."
    },
    "funFact": {
      "pt": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!",
      "en": "Antes de carregar em enviar, relê sempre a mensagem com calma para corrigir erros de escrita!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 335,
    "dayOfYear": 335,
    "month": 11,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Novembro",
      "en": "November 30"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Segurança da Informação",
      "en": "Computer Security Day"
    },
    "icon": "🛡️",
    "title": {
      "pt": "Dia Internacional da Segurança da Informação",
      "en": "Computer Security Day"
    },
    "teaser": {
      "pt": "Desde 1988, o dia 30 de novembro lembra a necessidade de manter dispositivos protegidos.",
      "en": "Since 1988, Nov 30 raises awareness about securing computers and personal data."
    },
    "description": {
      "pt": "Criado após o primeiro grande ataque do \"Morris Worm\" que afetou a Internet antiga em 1988, este dia incentiva as pessoas a atualizar os antivírus, aplicar atualizações de segurança do sistema operativo e não clicar em links suspeitos.",
      "en": "Created after the 1988 Morris Worm to encourage antivirus updates and safe browsing habits."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos que manter o software atualizado fecha as portas aos cibercriminosos.",
      "en": "In Topic 3 we learn software updates patch security holes before hackers can exploit them."
    },
    "funFact": {
      "pt": "Muitos vírus antigos mostravam mensagens animadas e ambulâncias a passar no ecrã com som!",
      "en": "Some early computer viruses displayed dancing animations and sirens with speaker beeps!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 336,
    "dayOfYear": 336,
    "month": 12,
    "day": 1,
    "dateLabel": {
      "pt": "1 de Dezembro",
      "en": "December 1"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação Direta entre Aspas",
      "en": "Citação Direta entre Aspas"
    },
    "icon": "💬",
    "title": {
      "pt": "Avançado: Como citar uma frase de um livro no trabalho escolar sem cometer plágio?",
      "en": "Como citar uma frase de um livro no trabalho escolar sem cometer plágio?"
    },
    "teaser": {
      "pt": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!",
      "en": "Se copiares uma frase palavra por palavra, deves colocá-la entre aspas e dizer de quem é!"
    },
    "description": {
      "pt": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!",
      "en": "Não há problema nenhum em copiar uma frase brilhante de um escritor, desde que a coloques entre aspas \"\" e escrevas logo a seguir o nome do autor e o livro. Isso chama-se citação direta e enriquece o teu trabalho!"
    },
    "whyItMatters": {
      "pt": "Normas de referenciação textual e integridade académica em produções escolares de TIC.",
      "en": "Normas de referenciação textual e integridade académica em produções escolares de TIC."
    },
    "funFact": {
      "pt": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\"",
      "en": "Exemplo correto: Segundo Galileu Galilei, \"A matemática é o alfabeto com o qual Deus escreveu o universo.\""
    },
    "isSpecialMilestone": false
  },
  {
    "id": 337,
    "dayOfYear": 337,
    "month": 12,
    "day": 2,
    "dateLabel": {
      "pt": "2 de Dezembro",
      "en": "December 2"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Hardware Interno",
      "en": "Hardware Interno"
    },
    "icon": "🧠",
    "title": {
      "pt": "Facto curioso: A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!",
      "en": "A CPU (Processador) é o cérebro que faz milhares de milhões de cálculos por segundo!"
    },
    "teaser": {
      "pt": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?",
      "en": "Sabias que o processador do teu computador consegue resolver contas mais depressa do que um raio?"
    },
    "description": {
      "pt": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!",
      "en": "A CPU (Unidade Central de Processamento) é o chip principal do computador. Ela lê as instruções dos programas e executa cálculos a velocidades espantosas — até 4 ou 5 mil milhões de operações por segundo (medidas em Gigahertz)!"
    },
    "whyItMatters": {
      "pt": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes.",
      "en": "No Tema 1 de TIC aprendemos que a CPU é o coração do hardware que comanda todos os outros componentes."
    },
    "funFact": {
      "pt": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!",
      "en": "Dentro de uma CPU moderna existem milhares de milhões de minúsculos transístores microscópicos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 338,
    "dayOfYear": 338,
    "month": 12,
    "day": 3,
    "dateLabel": {
      "pt": "3 de Dezembro",
      "en": "December 3"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Postura na Cadeira",
      "en": "Postura na Cadeira"
    },
    "icon": "🪑",
    "title": {
      "pt": "Facto curioso: A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!",
      "en": "A Regra dos 90 Graus: a fórmula mágica para não doerem as costas!"
    },
    "teaser": {
      "pt": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?",
      "en": "Sabias que os teus cotovelos e joelhos devem formar um ângulo reto ao estudar no computador?"
    },
    "description": {
      "pt": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares.",
      "en": "Ao sentar em frente ao computador, apoia as costas no encosto da cadeira e mantém os pés bem assentes no chão. Os cotovelos e joelhos devem ficar num ângulo de cerca de 90 graus para evitar cansaço e lesões articulares."
    },
    "whyItMatters": {
      "pt": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito.",
      "en": "No Tema 2 de TIC aprendemos como regular a cadeira, secretária e ecrã para um bem-estar perfeito."
    },
    "funFact": {
      "pt": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!",
      "en": "Se os teus pés não chegarem ao chão na escola, pede um apoio de pés para manter a postura certa!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 339,
    "dayOfYear": 339,
    "month": 12,
    "day": 4,
    "dateLabel": {
      "pt": "4 de Dezembro",
      "en": "December 4"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Pegada Digital",
      "en": "Pegada Digital"
    },
    "icon": "👣",
    "title": {
      "pt": "Facto curioso: A tua Pegada Digital é como uma pegada no cimento fresco!",
      "en": "A tua Pegada Digital é como uma pegada no cimento fresco!"
    },
    "teaser": {
      "pt": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura.",
      "en": "Tudo o que pesquisas, partilhas e publicas na rede deixa uma marca duradoura."
    },
    "description": {
      "pt": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes.",
      "en": "Cada clique, vídeo assistido e comentário constrói a tua reputação online. Mesmo que apagues uma foto, alguém pode ter tirado uma captura de ecrã (printscreen). Por isso, cultiva uma pegada digital positiva, com partilhas generosas e inteligentes."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online.",
      "en": "No Tema 3 de TIC aprendemos a refletir criticamente sobre as consequências das nossas ações online."
    },
    "funFact": {
      "pt": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!",
      "en": "A regra de ouro: só deves publicar algo se não tiveres vergonha que a tua professora ou avó vejam!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 340,
    "dayOfYear": 340,
    "month": 12,
    "day": 5,
    "dateLabel": {
      "pt": "5 de Dezembro",
      "en": "December 5"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Força de Senhas",
      "en": "Força de Senhas"
    },
    "icon": "⚡",
    "title": {
      "pt": "Facto curioso: A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!",
      "en": "A senha \"123456\" é quebrada em menos de 0,0001 segundos por hackers!"
    },
    "teaser": {
      "pt": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!",
      "en": "Inacreditavelmente, continua a ser uma das senhas mais usadas no planeta!"
    },
    "description": {
      "pt": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores.",
      "en": "Programas automáticos usam listas de palavras comuns e sequências de teclado simples. Senhas como \"123456\", \"qwerty\", \"password\" ou a tua data de aniversário são adivinhadas instantaneamente por computadores."
    },
    "whyItMatters": {
      "pt": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares.",
      "en": "No Tema 4 de TIC aprendemos a criar senhas robustas que protegem as nossas contas escolares."
    },
    "funFact": {
      "pt": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!",
      "en": "Outra senha péssima muito usada é \"admin\" ou o nome do clube de futebol favorito!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 341,
    "dayOfYear": 341,
    "month": 12,
    "day": 6,
    "dateLabel": {
      "pt": "6 de Dezembro",
      "en": "December 6"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Campos do Email",
      "en": "Campos do Email"
    },
    "icon": "🕶️",
    "title": {
      "pt": "Facto curioso: O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!",
      "en": "O campo Cco (Bcc) é o \"Modo Secreto\" que protege o email dos teus colegas!"
    },
    "teaser": {
      "pt": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!",
      "en": "Vais convidar 25 colegas da turma para uma festa por email? Usa o Cco!"
    },
    "description": {
      "pt": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados.",
      "en": "No email tens: \"Para\" (destinatários principais), \"Cc\" (Com Cópia, visível a todos) e \"Cco\" (Com Cópia Oculta). Ao colocar os contactos em Cco, ninguém vê o endereço privado dos outros, evitando spam e fugas de dados."
    },
    "whyItMatters": {
      "pt": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD.",
      "en": "No Tema 5 de TIC aprendemos a usar os campos Para, Cc e Cco de acordo com as regras do RGPD."
    },
    "funFact": {
      "pt": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!",
      "en": "A sigla Cc vem do papel químico (\"Carbon Copy\") que se usava antigamente nas máquinas de escrever!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 342,
    "dayOfYear": 342,
    "month": 12,
    "day": 7,
    "dateLabel": {
      "pt": "7 de Dezembro",
      "en": "December 7"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Navegador vs Motor",
      "en": "Navegador vs Motor"
    },
    "icon": "🚗",
    "title": {
      "pt": "Facto curioso: O Navegador é o Automóvel, o Motor de Busca é o GPS!",
      "en": "O Navegador é o Automóvel, o Motor de Busca é o GPS!"
    },
    "teaser": {
      "pt": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?",
      "en": "Muitos alunos confundem o Chrome com o Google. Sabes qual é a diferença real?"
    },
    "description": {
      "pt": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas.",
      "en": "O Navegador (Browser, como Chrome, Edge, Firefox ou Safari) é a aplicação instalada que abre e desenha páginas Web. O Motor de Busca (Google, Bing, DuckDuckGo) é um site especial que cataloga a rede para responder a perguntas."
    },
    "whyItMatters": {
      "pt": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca.",
      "en": "No Tema 6 de TIC aprendemos a usar a barra de endereços (URL) diretamente sem passar pelo motor de busca."
    },
    "funFact": {
      "pt": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!",
      "en": "A primeira janela de navegação inventada em 1990 chamava-se \"WorldWideWeb\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 343,
    "dayOfYear": 343,
    "month": 12,
    "day": 8,
    "dateLabel": {
      "pt": "8 de Dezembro",
      "en": "December 8"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Google Imagens",
      "en": "Google Imagens"
    },
    "icon": "🎨",
    "title": {
      "pt": "Facto curioso: As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!",
      "en": "As fotos do Google Imagens NÃO são gratuitas para usar como quiseres!"
    },
    "teaser": {
      "pt": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei.",
      "en": "Copiar uma foto qualquer e colar num trabalho sem autorização pode violar a lei."
    },
    "description": {
      "pt": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público.",
      "en": "Quando um fotógrafo ou ilustrador cria uma imagem, ela fica logo protegida por Direitos de Autor (Copyright). Não a podes descarregar e reutilizar sem autorização. Para trabalhos escolares, usa imagens com licenças Creative Commons ou de Domínio Público."
    },
    "whyItMatters": {
      "pt": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas.",
      "en": "No Tema 7 de TIC aprendemos a respeitar a propriedade intelectual e o trabalho dos artistas."
    },
    "funFact": {
      "pt": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!",
      "en": "No próprio Google Imagens podes clicar em \"Ferramentas\" > \"Direitos de utilização\" > \"Licenças Creative Commons\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 344,
    "dayOfYear": 344,
    "month": 12,
    "day": 9,
    "dateLabel": {
      "pt": "9 de Dezembro",
      "en": "December 9"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Invenções Geniais",
      "en": "Inventions in Tech"
    },
    "icon": "🖱️",
    "title": {
      "pt": "A \"Mãe de Todas as Demonstrações\": Janelas, Rato e Hiperlinks!",
      "en": "The \"Mother of All Demos\": Windows, Mouse, and Hyperlinks!"
    },
    "teaser": {
      "pt": "A 9 de dezembro de 1968, Douglas Engelbart mostrou o futuro dos computadores pessoais.",
      "en": "On Dec 9, 1968, Douglas Engelbart demonstrated the foundation of personal computing."
    },
    "description": {
      "pt": "Numa conferência em São Francisco, Engelbart apresentou pela primeira vez o rato de computador, janelas que se abriam lado a lado, processamento de texto em tempo real e videoconferência. Foi uma das apresentações mais influentes da história da humanidade!",
      "en": "Engelbart showcased the mouse, graphical windows, collaborative hypertext, and video chat in 1968."
    },
    "whyItMatters": {
      "pt": "Antes disto, os computadores eram operados apenas por cartões perfurados ou comandos de texto complicados.",
      "en": "Before this demo, computers only operated via punched cards or cryptic terminal commands."
    },
    "funFact": {
      "pt": "Na altura, o público ficou em silêncio absoluto e depois desfez-se numa salva de palmas estrondosa de vários minutos!",
      "en": "The astonished audience stood up in a minutes-long ovation at what seemed like real magic!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 345,
    "dayOfYear": 345,
    "month": 12,
    "day": 10,
    "dateLabel": {
      "pt": "10 de Dezembro",
      "en": "December 10"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Cidadania Digital",
      "en": "Digital Human Rights"
    },
    "icon": "🤝",
    "title": {
      "pt": "Dia dos Direitos Humanos e Cidadania Digital",
      "en": "Human Rights & Digital Citizenship"
    },
    "teaser": {
      "pt": "A 10 de dezembro celebra-se a dignidade de todas as pessoas, também no mundo virtual.",
      "en": "December 10 honors human dignity, empathy, and safety across the digital sphere."
    },
    "description": {
      "pt": "Os direitos humanos também se aplicam na Internet: o direito à privacidade, o direito a aprender sem ser insultado, o direito a exprimir opiniões com respeito e a proteção contra o cyberbullying e discriminação.",
      "en": "Human rights extend online: the right to privacy, education, and protection from harassment."
    },
    "whyItMatters": {
      "pt": "No Tema 3 de TIC aprendemos a ser cidadãos digitais exemplares: ter empatia, proteger os amigos e denunciar abusos.",
      "en": "In Topic 3 we foster active digital citizenship: practicing empathy and supporting peers."
    },
    "funFact": {
      "pt": "A Netiqueta não é uma regra fria: é a garantia de que a Internet continua a ser um lugar acolhedor para crianças e jovens!",
      "en": "Netiquette is not just rules: it keeps the virtual world safe, welcoming, and fun!"
    },
    "isSpecialMilestone": true
  },
  {
    "id": 346,
    "dayOfYear": 346,
    "month": 12,
    "day": 11,
    "dateLabel": {
      "pt": "11 de Dezembro",
      "en": "December 11"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Privacidade e Redes",
      "en": "Privacidade e Redes"
    },
    "icon": "🕵️‍♂️",
    "title": {
      "pt": "Facto curioso: A regra do \"Estranho no Jardim\": nada de moradas em jogos online!",
      "en": "A regra do \"Estranho no Jardim\": nada de moradas em jogos online!"
    },
    "teaser": {
      "pt": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa.",
      "en": "Roblox, Fortnite, Brawl Stars... avatares simpáticos podem esconder qualquer pessoa."
    },
    "description": {
      "pt": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online.",
      "en": "Nunca partilhes o teu nome completo, número de telemóvel, nome da escola ou fotos onde se veja o emblema do teu clube ou a rua de tua casa com desconhecidos em salas de conversação ou jogos online."
    },
    "whyItMatters": {
      "pt": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital.",
      "en": "A proteção de dados pessoais e a defesa da privacidade individual são prioridades de Cidadania Digital."
    },
    "funFact": {
      "pt": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!",
      "en": "É por isso que nos jogos é muito mais seguro e divertido usar nomes de código como \"FalcãoVeloz_99\"!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 347,
    "dayOfYear": 347,
    "month": 12,
    "day": 12,
    "dateLabel": {
      "pt": "12 de Dezembro",
      "en": "December 12"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "O Segredo da Frase-Passe",
      "en": "O Segredo da Frase-Passe"
    },
    "icon": "🍕",
    "title": {
      "pt": "Facto curioso: O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!",
      "en": "O método da \"Frase-Passe\": O_Meu_Cao_Adora_Comer_99_Gelados!"
    },
    "teaser": {
      "pt": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar.",
      "en": "Uma frase longa com espaços ou travessões é fácil de decorar e quase impossível de quebrar."
    },
    "description": {
      "pt": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!",
      "en": "Em vez de uma senha curta e confusa que esqueces amanhã, inventa uma frase maluca com 4 ou 5 palavras e junta números e símbolos. Fica com mais de 20 carateres e demoraria séculos a ser decifrada!"
    },
    "whyItMatters": {
      "pt": "Construção de palavras-passe fortes com base em frases mnemónicas compridas.",
      "en": "Construção de palavras-passe fortes com base em frases mnemónicas compridas."
    },
    "funFact": {
      "pt": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!",
      "en": "Quanto mais comprida for a palavra-passe, mais combinações matemáticas o invasor tem de testar!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 348,
    "dayOfYear": 348,
    "month": 12,
    "day": 13,
    "dateLabel": {
      "pt": "13 de Dezembro",
      "en": "December 13"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "O Símbolo Arroba",
      "en": "O Símbolo Arroba"
    },
    "icon": "🐌",
    "title": {
      "pt": "Facto curioso: O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!",
      "en": "O símbolo @ chama-se \"caracol\" em Itália e \"tromba de elefante\" na Suécia!"
    },
    "teaser": {
      "pt": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino.",
      "en": "Inventado em 1971 por Ray Tomlinson para unir o utilizador ao computador de destino."
    },
    "description": {
      "pt": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!",
      "en": "Em inglês lê-se \"at\" (no local de). Em Portugal chamamos-lhe arroba, mas outros países dão-lhe nomes animais engraçados: os italianos dizem \"chiocciola\" (caracol) e os israelitas \"strudel\" (bolo enrolado)!"
    },
    "whyItMatters": {
      "pt": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao.",
      "en": "Estrutura padrão de um endereço de correio eletrónico: utilizador@dominio.extensao."
    },
    "funFact": {
      "pt": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!",
      "en": "Antigamente, a arroba era uma medida de peso usada no comércio que valia cerca de 15 quilogramas!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 349,
    "dayOfYear": 349,
    "month": 12,
    "day": 14,
    "dateLabel": {
      "pt": "14 de Dezembro",
      "en": "December 14"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Truque das Aspas",
      "en": "Truque das Aspas"
    },
    "icon": "🔍",
    "title": {
      "pt": "Facto curioso: Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!",
      "en": "Pesquisa como um detetive: o truque mágico das aspas \"\" no motor de busca!"
    },
    "teaser": {
      "pt": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?",
      "en": "Sabias que podes obrigar o motor de busca a encontrar exatamente a frase que queres?"
    },
    "description": {
      "pt": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!",
      "en": "Se colocares uma frase entre aspas (ex: \"energia eólica em Portugal\"), o motor de busca só mostra páginas que tenham essas palavras exatamente nessa ordem, filtrando milhares de páginas irrelevantes!"
    },
    "whyItMatters": {
      "pt": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano.",
      "en": "Técnicas de pesquisa avançada com operadores booleanos e delimitadores no 5.º ano."
    },
    "funFact": {
      "pt": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!",
      "en": "Se usares o sinal de menos (ex: jaguar -carro), ele procura o felino e elimina as páginas sobre automóveis!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 350,
    "dayOfYear": 350,
    "month": 12,
    "day": 15,
    "dateLabel": {
      "pt": "15 de Dezembro",
      "en": "December 15"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "O que é Plágio",
      "en": "O que é Plágio"
    },
    "icon": "✂️",
    "title": {
      "pt": "Facto curioso: Plágio: roubar a medalha de ouro de outra pessoa!",
      "en": "Plágio: roubar a medalha de ouro de outra pessoa!"
    },
    "teaser": {
      "pt": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica.",
      "en": "Fazer \"Copiar e Colar\" da Wikipédia e assinar com o teu nome é desonestidade académica."
    },
    "description": {
      "pt": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste.",
      "en": "Plágio é copiar textos, ideias, desenhos ou código de outra pessoa fingindo que foste tu a criar. É como alguém correr uma maratona e tu roubares a medalha para dizer que venceste. O correto é ler, explicar pelas tuas próprias palavras e citar a fonte de onde aprendeste."
    },
    "whyItMatters": {
      "pt": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano.",
      "en": "Compreensão de plágio vs autoria original e integridade académica no 5.º ano."
    },
    "funFact": {
      "pt": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!",
      "en": "Os professores têm ferramentas de software que detetam plágio em trabalhos escolares em segundos!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 351,
    "dayOfYear": 351,
    "month": 12,
    "day": 16,
    "dateLabel": {
      "pt": "16 de Dezembro",
      "en": "December 16"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Placa Principal",
      "en": "Placa Principal"
    },
    "icon": "🛣️",
    "title": {
      "pt": "Facto curioso: A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!",
      "en": "A Motherboard (Placa-mãe) é a autoestrada que liga todos os órgãos do computador!"
    },
    "teaser": {
      "pt": "Como é que a placa gráfica fala com o processador e com o disco rígido?",
      "en": "Como é que a placa gráfica fala com o processador e com o disco rígido?"
    },
    "description": {
      "pt": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI.",
      "en": "A Motherboard é uma grande placa de circuito verde ou preta cheia de pistas metálicas de cobre. É nela que encaixam a CPU, a RAM, a placa de som, a placa de rede e onde se ligam as portas USB e HDMI."
    },
    "whyItMatters": {
      "pt": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus).",
      "en": "Nas aulas de TIC aprendemos como os componentes físicos comunicam através do barramento de dados (Bus)."
    },
    "funFact": {
      "pt": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!",
      "en": "Chama-se \"motherboard\" (mãe) porque abriga e alimenta todas as placas filhas que ligamos ao sistema!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 352,
    "dayOfYear": 352,
    "month": 12,
    "day": 17,
    "dateLabel": {
      "pt": "17 de Dezembro",
      "en": "December 17"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Sono e Tecnologia",
      "en": "Sono e Tecnologia"
    },
    "icon": "🌙",
    "title": {
      "pt": "Facto curioso: A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\"",
      "en": "A Luz Azul do ecrã diz ao teu cérebro: \"Acorda, ainda é dia de praia!\""
    },
    "teaser": {
      "pt": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?",
      "en": "Porque deves desligar os ecrãs 30 a 60 minutos antes de dormir para acordares com energia?"
    },
    "description": {
      "pt": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola.",
      "en": "A luz azul emitida por ecrãs bloqueia a melatonina, a hormona que dá sono. Quando usas o telemóvel na cama, o teu cérebro fica confuso, demoras mais tempo a adormecer e acordas cansado para a escola."
    },
    "whyItMatters": {
      "pt": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias.",
      "en": "Estudamos o equilíbrio entre o tempo de ecrã e o descanso reparador de 9 a 10 horas diárias."
    },
    "funFact": {
      "pt": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!",
      "en": "Substituir o telemóvel antes de dormir por um livro em papel melhora as tuas notas escolares!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 353,
    "dayOfYear": 353,
    "month": 12,
    "day": 18,
    "dateLabel": {
      "pt": "18 de Dezembro",
      "en": "December 18"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Apoio e Helplines",
      "en": "Apoio e Helplines"
    },
    "icon": "📞",
    "title": {
      "pt": "Facto curioso: Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!",
      "en": "Linha Internet Segura em Portugal: 800 21 90 90 (grátis e confidencial)!"
    },
    "teaser": {
      "pt": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar.",
      "en": "Se algo correr mal online, existe uma equipa simpática pronta para te ajudar."
    },
    "description": {
      "pt": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!",
      "en": "Se vires conteúdos assustadores, sofreres cyberbullying ou tiveres dúvidas sobre a tua segurança, podes ligar gratuitamente para o 800 21 90 90 ou para o SOS Criança (116 111). Nunca guardes medos só para ti!"
    },
    "whyItMatters": {
      "pt": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental.",
      "en": "Conhecer as linhas de apoio e saber a quem recorrer perante incidentes digitais é fundamental."
    },
    "funFact": {
      "pt": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!",
      "en": "Lembra-te: falar com os pais ou professores de confiança é sempre o primeiro e melhor passo!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 354,
    "dayOfYear": 354,
    "month": 12,
    "day": 19,
    "dateLabel": {
      "pt": "19 de Dezembro",
      "en": "December 19"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Partilha de Senhas",
      "en": "Partilha de Senhas"
    },
    "icon": "🪥",
    "title": {
      "pt": "Facto curioso: Palavras-passe são como escovas de dentes: não se emprestam a ninguém!",
      "en": "Palavras-passe são como escovas de dentes: não se emprestam a ninguém!"
    },
    "teaser": {
      "pt": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital.",
      "en": "Nem ao melhor amigo da turma deves confiar a chave da tua vida digital."
    },
    "description": {
      "pt": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem.",
      "en": "A tua senha é pessoal e intransmissível. Se a emprestares, perdes o controlo sobre quem acede aos teus emails e notas. A única exceção são os teus pais ou encarregados de educação para te protegerem."
    },
    "whyItMatters": {
      "pt": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal.",
      "en": "Responsabilidade e sigilo de credenciais de acesso no ambiente escolar e pessoal."
    },
    "funFact": {
      "pt": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!",
      "en": "Se um dia tiveres de introduzir a tua senha à frente de alguém, tapa o teclado com a outra mão!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 355,
    "dayOfYear": 355,
    "month": 12,
    "day": 20,
    "dateLabel": {
      "pt": "20 de Dezembro",
      "en": "December 20"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Netiqueta em Emails",
      "en": "Netiqueta em Emails"
    },
    "icon": "📢",
    "title": {
      "pt": "Facto curioso: Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!",
      "en": "Escrever em MAIÚSCULAS no email equivale a GRITAR aos berros!"
    },
    "teaser": {
      "pt": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais.",
      "en": "Ao redigir mensagens para professores ou colegas, usa sempre letras maiúsculas e minúsculas normais."
    },
    "description": {
      "pt": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã.",
      "en": "Na etiqueta digital, escrever palavras ou frases inteiras em maiúsculas soa agressivo e irritado. Além disso, blocos de texto em maiúsculas são muito mais difíceis e cansativos de ler no ecrã."
    },
    "whyItMatters": {
      "pt": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico.",
      "en": "Regras de cortesia, pontuação e comunicação assertiva no correio eletrónico."
    },
    "funFact": {
      "pt": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!",
      "en": "Começa sempre com uma saudação formal (\"Bom dia, Professora\") e termina com assinatura e turma!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 356,
    "dayOfYear": 356,
    "month": 12,
    "day": 21,
    "dateLabel": {
      "pt": "21 de Dezembro",
      "en": "December 21"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Segurança HTTPS",
      "en": "Segurança HTTPS"
    },
    "icon": "🔒",
    "title": {
      "pt": "Facto curioso: O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!",
      "en": "O \"S\" do HTTPS é a caixa-forte invisível que codifica os teus dados!"
    },
    "teaser": {
      "pt": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\".",
      "en": "Nunca introduzas palavras-passe em páginas que comecem apenas por \"http://\" sem o \"s\"."
    },
    "description": {
      "pt": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias.",
      "en": "O \"S\" significa Seguro (Secure). Indica que a ligação entre o teu computador e o site é encriptada por um certificado digital: ninguém na rede Wi-Fi consegue espreitar as informações que envias."
    },
    "whyItMatters": {
      "pt": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC.",
      "en": "Verificação de certificados de segurança e protocolos de navegação segura nas aulas de TIC."
    },
    "funFact": {
      "pt": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!",
      "en": "Mais de 95% de todas as páginas da Internet moderna já utilizam o protocolo HTTPS!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 357,
    "dayOfYear": 357,
    "month": 12,
    "day": 22,
    "dateLabel": {
      "pt": "22 de Dezembro",
      "en": "December 22"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Creative Commons",
      "en": "Creative Commons"
    },
    "icon": "🤝",
    "title": {
      "pt": "Facto curioso: Creative Commons: o convite amigável para partilhar criatividade com o mundo!",
      "en": "Creative Commons: o convite amigável para partilhar criatividade com o mundo!"
    },
    "teaser": {
      "pt": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?",
      "en": "Conheces o símbolo com dois \"C\" (CC) que vês na Wikipédia, no Scratch e no YouTube?"
    },
    "description": {
      "pt": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\".",
      "en": "Em 2001, o professor Lawrence Lessig criou as licenças Creative Commons. Elas permitem que autores digam: \"Podes usar a minha música ou foto de graça para o teu trabalho escolar, desde que me dês o devido crédito (CC-BY)!\"."
    },
    "whyItMatters": {
      "pt": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7.",
      "en": "Identificação dos símbolos de partilha Creative Commons (BY, NC, ND, SA) no Tema 7."
    },
    "funFact": {
      "pt": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!",
      "en": "A enciclopédia Wikipédia e os projetos remixados no Scratch funcionam sob licenças Creative Commons!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 358,
    "dayOfYear": 358,
    "month": 12,
    "day": 23,
    "dateLabel": {
      "pt": "23 de Dezembro",
      "en": "December 23"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Linguagem dos Computadores",
      "en": "Linguagem dos Computadores"
    },
    "icon": "0️⃣",
    "title": {
      "pt": "Facto curioso: Tudo no computador são apenas ZEROS e UNS (0 e 1)!",
      "en": "Tudo no computador são apenas ZEROS e UNS (0 e 1)!"
    },
    "teaser": {
      "pt": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?",
      "en": "Fotos, músicas, jogos 3D e vídeos do YouTube... como é que cabem em apenas dois números?"
    },
    "description": {
      "pt": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!",
      "en": "Os circuitos do computador funcionam com eletricidade: ou passa corrente (1) ou não passa (0). A este sistema chamamos Código Binário. Combinando 8 zeros e uns (um Byte), o computador consegue representar qualquer letra, som ou cor de um píxel!"
    },
    "whyItMatters": {
      "pt": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte.",
      "en": "No 5.º ano de TIC compreendemos o conceito fundamental de bit (Binary Digit) e byte."
    },
    "funFact": {
      "pt": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!",
      "en": "A letra \"A\" maiúscula em binário escreve-se assim: 01000001!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 359,
    "dayOfYear": 359,
    "month": 12,
    "day": 24,
    "dateLabel": {
      "pt": "24 de Dezembro",
      "en": "December 24"
    },
    "themeId": "ergonomia",
    "themeNumber": 2,
    "themeTitle": {
      "pt": "Ergonomia e Bem-Estar",
      "en": "Ergonomics & Well-being"
    },
    "themeIcon": "🧘‍♂️",
    "badgeColor": "emerald",
    "category": {
      "pt": "Pescoço e Coluna",
      "en": "Pescoço e Coluna"
    },
    "icon": "🦒",
    "title": {
      "pt": "Facto curioso: O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!",
      "en": "O \"Pescoço de Texto\": carregar 27 kg na coluna vertebral!"
    },
    "teaser": {
      "pt": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento.",
      "en": "Inclinar a cabeça para baixo sobre o telemóvel esforça o pescoço como carregar um saco de cimento."
    },
    "description": {
      "pt": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!",
      "en": "Uma cabeça humana em posição direita pesa cerca de 5 kg. Mas quando a inclinas a 60 graus sobre um telemóvel ou tablet, a força exercida no pescoço sobe para 27 kg! Levanta os braços e traz o ecrã até aos olhos!"
    },
    "whyItMatters": {
      "pt": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial.",
      "en": "Aprender a posicionar o topo do monitor ao nível da linha dos olhos é uma regra ergonómica essencial."
    },
    "funFact": {
      "pt": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!",
      "en": "Fazer rotações suaves com a cabeça de vez em quando alivia a tensão acumulada nos ombros!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 360,
    "dayOfYear": 360,
    "month": 12,
    "day": 25,
    "dateLabel": {
      "pt": "25 de Dezembro",
      "en": "December 25"
    },
    "themeId": "seguranca",
    "themeNumber": 3,
    "themeTitle": {
      "pt": "Segurança e Cidadania Digital",
      "en": "Digital Safety & Citizenship"
    },
    "themeIcon": "🛡️",
    "badgeColor": "rose",
    "category": {
      "pt": "Netiqueta e Empatia",
      "en": "Netiqueta e Empatia"
    },
    "icon": "💬",
    "title": {
      "pt": "Facto curioso: Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!",
      "en": "Netiqueta: gentileza e respeito nas mensagens e salas de aula virtuais!"
    },
    "teaser": {
      "pt": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?",
      "en": "Como ser um colega cinco estrelas em grupos de WhatsApp e fóruns da turma?"
    },
    "description": {
      "pt": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa.",
      "en": "Netiqueta é a etiqueta da Net. Significa não insultar, não espalhar boatos, não partilhar fotos de colegas sem autorização expressa deles e respeitar as opiniões diferentes com cordialidade e espírito de equipa."
    },
    "whyItMatters": {
      "pt": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano.",
      "en": "Promover a convivência pacífica e combater todas as formas de cyberbullying no 5.º ano."
    },
    "funFact": {
      "pt": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!",
      "en": "Um emoji sorridente ajuda a demonstrar que a tua mensagem é amigável e sem má intenção!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 361,
    "dayOfYear": 361,
    "month": 12,
    "day": 26,
    "dateLabel": {
      "pt": "26 de Dezembro",
      "en": "December 26"
    },
    "themeId": "palavras-passe",
    "themeNumber": 4,
    "themeTitle": {
      "pt": "Palavras-passe Fortes",
      "en": "Strong Passwords"
    },
    "themeIcon": "🔑",
    "badgeColor": "amber",
    "category": {
      "pt": "Autenticação de 2 Fatores",
      "en": "Autenticação de 2 Fatores"
    },
    "icon": "📲",
    "title": {
      "pt": "Facto curioso: Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!",
      "en": "Autenticação em Dois Fatores (2FA): a fechadura dupla da tua porta digital!"
    },
    "teaser": {
      "pt": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.",
      "en": "Mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código."
    },
    "description": {
      "pt": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes.",
      "en": "O 2FA combina algo que sabes (a tua senha) com algo que tens (um código enviado por SMS ou gerado numa aplicação segura). É a proteção mais recomendada para contas de email e jogos importantes."
    },
    "whyItMatters": {
      "pt": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC.",
      "en": "Conhecer mecanismos modernos de autenticação multifator no Tema 4 de TIC."
    },
    "funFact": {
      "pt": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!",
      "en": "É exatamente como o cartão multibanco: precisas do cartão físico e do código PIN para levantar dinheiro!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 362,
    "dayOfYear": 362,
    "month": 12,
    "day": 27,
    "dateLabel": {
      "pt": "27 de Dezembro",
      "en": "December 27"
    },
    "themeId": "correio-eletronico",
    "themeNumber": 5,
    "themeTitle": {
      "pt": "Correio Eletrónico Seguro",
      "en": "Safe Email & Communication"
    },
    "themeIcon": "✉️",
    "badgeColor": "sky",
    "category": {
      "pt": "Anexos Perigosos",
      "en": "Anexos Perigosos"
    },
    "icon": "📎",
    "title": {
      "pt": "Facto curioso: Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!",
      "en": "Cuidado com os anexos: nunca abras ficheiros com extensões suspeitas!"
    },
    "teaser": {
      "pt": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos.",
      "en": "Ficheiros como .exe, .bat, .vbs ou ficheiros .zip desconhecidos podem esconder vírus perigosos."
    },
    "description": {
      "pt": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros.",
      "en": "Se receberes um email de alguém que não conheces com um anexo que diz \"fatura.exe\" ou \"fotos.zip\", não abras! Os criminosos usam anexos disfarçados para infetar o computador e roubar ficheiros."
    },
    "whyItMatters": {
      "pt": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC.",
      "en": "Reconhecimento de tipos de ficheiros e extensões seguras (.pdf, .docx, .png) no Tema 5 de TIC."
    },
    "funFact": {
      "pt": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!",
      "en": "Na dúvida, pede ao teu professor ou pais para analisarem o email com o programa antivírus!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 363,
    "dayOfYear": 363,
    "month": 12,
    "day": 28,
    "dateLabel": {
      "pt": "28 de Dezembro",
      "en": "December 28"
    },
    "themeId": "navegar-internet",
    "themeNumber": 6,
    "themeTitle": {
      "pt": "Navegar na Internet",
      "en": "Internet Browsing & Search"
    },
    "themeIcon": "🌐",
    "badgeColor": "blue",
    "category": {
      "pt": "Combate a Fake News",
      "en": "Combate a Fake News"
    },
    "icon": "🕵️‍♀️",
    "title": {
      "pt": "Facto curioso: O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!",
      "en": "O Teste do Detetive das 3 Perguntas contra Notícias Falsas (Fake News)!"
    },
    "teaser": {
      "pt": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções.",
      "en": "Nem tudo o que está na Internet é verdade! Qualquer pessoa pode publicar invenções."
    },
    "description": {
      "pt": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?",
      "en": "Antes de usar uma informação num trabalho escolar, pergunta: 1) QUEM escreveu? (É um especialista respeitado?); 2) QUANDO foi publicado? (É recente ou de há 10 anos?); 3) OUTROS jornais sérios e enciclopédias confirmam a mesma notícia?"
    },
    "whyItMatters": {
      "pt": "Literacia da informação e espírito crítico na avaliação de fontes da Web.",
      "en": "Literacia da informação e espírito crítico na avaliação de fontes da Web."
    },
    "funFact": {
      "pt": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!",
      "en": "Em 1998, um biólogo criou o site falso do \"Polvo das Árvores\" para provar como as pessoas acreditam em tudo online!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 364,
    "dayOfYear": 364,
    "month": 12,
    "day": 29,
    "dateLabel": {
      "pt": "29 de Dezembro",
      "en": "December 29"
    },
    "themeId": "direitos-autor",
    "themeNumber": 7,
    "themeTitle": {
      "pt": "Direitos de Autor e Plágio",
      "en": "Copyright & Plagiarism"
    },
    "themeIcon": "⚖️",
    "badgeColor": "purple",
    "category": {
      "pt": "Citação e Bibliografia",
      "en": "Citação e Bibliografia"
    },
    "icon": "📚",
    "title": {
      "pt": "Facto curioso: Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!",
      "en": "Citar as fontes não é fraqueza: é a marca dos verdadeiros cientistas!"
    },
    "teaser": {
      "pt": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!",
      "en": "Indicar os livros e sites consultados valoriza o teu trabalho e dá-te notas melhores!"
    },
    "description": {
      "pt": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso.",
      "en": "Alguns alunos têm vergonha de dizer de onde tiraram a informação, pensando que deviam saber tudo de cabeça. Pelo contrário! Cientistas e historiadores indicam sempre a \"Webgrafia\" no final com autor, título do artigo, link e data de acesso."
    },
    "whyItMatters": {
      "pt": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC.",
      "en": "Elaboração rigorosa de bibliografias e webgrafias de acordo com as normas escolares de TIC."
    },
    "funFact": {
      "pt": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!",
      "en": "Grandes cientistas como Einstein e Newton sempre agradeceram publicamente aos autores que leram!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 365,
    "dayOfYear": 365,
    "month": 12,
    "day": 30,
    "dateLabel": {
      "pt": "30 de Dezembro",
      "en": "December 30"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Periféricos de TIC",
      "en": "Periféricos de TIC"
    },
    "icon": "🖨️",
    "title": {
      "pt": "Facto curioso: Periféricos: a ponte mágica entre o ser humano e a máquina!",
      "en": "Periféricos: a ponte mágica entre o ser humano e a máquina!"
    },
    "teaser": {
      "pt": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?",
      "en": "Sabes dizer se os teus auscultadores são de entrada ou de saída de informação?"
    },
    "description": {
      "pt": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!",
      "en": "Periféricos de Entrada enviam dados para o computador (rato, teclado, microfone, câmara). Periféricos de Saída mostram o resultado (monitor, colunas de som, impressora). E periféricos Mistos fazem as duas coisas (ecrãs táteis e auscultadores com microfone integrado)!"
    },
    "whyItMatters": {
      "pt": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1.",
      "en": "Classificar periféricos em Entrada, Saída e Mistos é uma das matérias mais importantes do Tema 1."
    },
    "funFact": {
      "pt": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!",
      "en": "Os óculos de realidade virtual são periféricos mistos: mostram imagem e leem o movimento da cabeça!"
    },
    "isSpecialMilestone": false
  },
  {
    "id": 366,
    "dayOfYear": 366,
    "month": 12,
    "day": 31,
    "dateLabel": {
      "pt": "31 de Dezembro",
      "en": "December 31"
    },
    "themeId": "tic-sociedade",
    "themeNumber": 1,
    "themeTitle": {
      "pt": "TIC na Sociedade",
      "en": "ICT in Society"
    },
    "themeIcon": "🌍",
    "badgeColor": "indigo",
    "category": {
      "pt": "Passagem de Ano e Computação",
      "en": "New Year & Computing"
    },
    "icon": "🎆",
    "title": {
      "pt": "O Pânico do Bug do Milénio (Y2K) na noite de Ano Novo!",
      "en": "The Y2K Bug Panic on New Year's Eve!"
    },
    "teaser": {
      "pt": "A 31 de dezembro de 1999, o mundo temeu que os computadores parassem ao mudar para 2000.",
      "en": "On Dec 31, 1999, the world braced for computers to crash as the year flipped to 2000."
    },
    "description": {
      "pt": "Nos anos 60 e 70, para poupar memória preciosa, os programadores guardavam o ano apenas com 2 dígitos (ex: \"99\" para 1999). Temia-se que à meia-noite os computadores pensassem que era o ano \"00\" (1900) e falhassem centrais elétricas e aviões. Milhares de engenheiros trabalharam meses a corrigir o código e a noite correu em perfeita segurança!",
      "en": "Older software stored years as 2 digits (\"99\"). Coders fixed systems beforehand, so 2000 arrived safely!"
    },
    "whyItMatters": {
      "pt": "Mostra como a sociedade moderna depende intimamente dos sistemas de TIC para serviços essenciais.",
      "en": "Proves how modern civilization depends on reliable ICT infrastructure for critical utilities."
    },
    "funFact": {
      "pt": "A única falha famosa em Portugal foi um relógio de ponto num quartel que marcou o ano 1900 durante alguns minutos! 😄",
      "en": "One of the few recorded hiccups was a clock machine showing 1900 for a few minutes before being reset! 😄"
    },
    "isSpecialMilestone": true
  }
];

export const TOTAL_366_DAYS_COUNT = 366;
