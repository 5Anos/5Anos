import { Language } from '../types';
import { ALL_THEMES, THEMES_BY_ID } from '../data/allThemesData';

export interface ResolvedActivityInfo {
  activityId: string;
  themeId: string;
  themeNumber: number;
  themeTitle: string;
  themeIcon: string;
  themeAccentColor: string;
  title: string;
  shortDesc?: string;
  icon: string;
  typeLabel: string;
  type: 'module' | 'challenge' | 'quiz';
}

// Comprehensive dictionary for legacy, alias, and quick-lookup activity IDs
const KNOWN_ACTIVITY_MAPPINGS: Record<
  string,
  {
    themeId: string;
    title: { pt: string; en: string };
    shortDesc?: { pt: string; en: string };
    icon: string;
    type: 'module' | 'challenge' | 'quiz';
  }
> = {
  // Theme 1: TIC e Sociedade
  'tic-soc-o-que-sao': {
    themeId: 'tic-sociedade',
    title: { pt: 'O que são as TIC e a sua Importância', en: 'What is ICT and its Importance' },
    shortDesc: { pt: 'Módulo 1: Conceitos básicos e evolução das tecnologias', en: 'Module 1: Basics and evolution of tech' },
    icon: '🌐',
    type: 'module',
  },
  'tic-soc-setores': {
    themeId: 'tic-sociedade',
    title: { pt: 'As TIC nos Diferentes Setores da Sociedade', en: 'ICT Across Society Sectors' },
    shortDesc: { pt: 'Módulo 2: Saúde, educação, transportes e comunicação', en: 'Module 2: Health, education, transport and communication' },
    icon: '🏥',
    type: 'module',
  },
  'tic-soc-impacto-vantagens': {
    themeId: 'tic-sociedade',
    title: { pt: 'Impacto, Vantagens e Cuidados no Uso das TIC', en: 'Impact, Advantages & Responsible Use' },
    shortDesc: { pt: 'Módulo 3: Benefícios e equilíbrio na vida digital', en: 'Module 3: Benefits and digital balance' },
    icon: '💡',
    type: 'module',
  },
  'tic-soc-vantagens-desafios': {
    themeId: 'tic-sociedade',
    title: { pt: 'TIC: vantagens e desafios', en: 'ICT: Advantages & Challenges' },
    shortDesc: { pt: 'Módulo 4: Vantagens e desafios da tecnologia no dia a dia', en: 'Module 4: Tech advantages and challenges' },
    icon: '⚖️',
    type: 'module',
  },
  'tic-soc-tecnologia-ambiente': {
    themeId: 'tic-sociedade',
    title: { pt: 'Tecnologia e ambiente', en: 'Technology and Environment' },
    shortDesc: { pt: 'Módulo 5: Lixo eletrónico, reciclagem e consumo responsável', en: 'Module 5: E-waste, recycling, and responsible use' },
    icon: '🌱',
    type: 'module',
  },
  'jogo-tic-setor-match': {
    themeId: 'tic-sociedade',
    title: { pt: 'Correspondência de Setores TIC', en: 'ICT Sectors Match' },
    shortDesc: { pt: 'Ligar profissões e setores às tecnologias respetivas', en: 'Match jobs and sectors with tech' },
    icon: '🧩',
    type: 'challenge',
  },
  'jogo-tic-tf': {
    themeId: 'tic-sociedade',
    title: { pt: 'Verdadeiro ou Falso sobre as TIC', en: 'ICT True or False' },
    shortDesc: { pt: 'Testa mitos e factos sobre as tecnologias na sociedade', en: 'Test myths and facts about tech in society' },
    icon: '⚖️',
    type: 'challenge',
  },
  'jogo-tic-mc': {
    themeId: 'tic-sociedade',
    title: { pt: 'Desafio de Opção Múltipla TIC', en: 'ICT Multiple Choice' },
    shortDesc: { pt: 'Perguntas rápidas sobre a evolução e utilidade das TIC', en: 'Quick questions on ICT evolution' },
    icon: '🧠',
    type: 'challenge',
  },
  'jogo-tic-order': {
    themeId: 'tic-sociedade',
    title: { pt: 'Linha do Tempo e Evolução das TIC', en: 'ICT Timeline & Evolution' },
    shortDesc: { pt: 'Ordena as principais invenções da história digital', en: 'Order major inventions in digital history' },
    icon: '📦',
    type: 'challenge',
  },
  'quiz-final-tema1': {
    themeId: 'tic-sociedade',
    title: { pt: 'Quiz Final: As TIC e a Sociedade', en: 'Final Quiz: ICT and Society' },
    icon: '🏆',
    type: 'quiz',
  },

  // Theme 2: Ergonomia
  'ergo-postura': {
    themeId: 'ergonomia',
    title: { pt: 'Postura Correta ao Computador', en: 'Proper Computer Posture' },
    shortDesc: { pt: 'Módulo 1: Pés, costas e postura confortável (~90°)', en: 'Module 1: Feet, back and comfortable posture (~90°)' },
    icon: '🪑',
    type: 'module',
  },
  'ergo-ambiente': {
    themeId: 'ergonomia',
    title: { pt: 'Ambiente e Iluminação Adequados', en: 'Proper Environment & Lighting' },
    shortDesc: { pt: 'Módulo 2: Luz natural, reflexos e organização da secretária', en: 'Module 2: Natural light, reflections & desk setup' },
    icon: '💡',
    type: 'module',
  },
  'ergo-pausas': {
    themeId: 'ergonomia',
    title: { pt: 'Pausas Ativas e Exercícios Visuais (Regra 20-20-20)', en: 'Active Breaks & 20-20-20 Rule' },
    shortDesc: { pt: 'Módulo 3: Descanso dos olhos e alongamentos', en: 'Module 3: Eye rest and stretching' },
    icon: '🏃‍♂️',
    type: 'module',
  },
  'jogo-ergo-tf': {
    themeId: 'ergonomia',
    title: { pt: 'Postura e Saúde ao Computador (V/F)', en: 'Posture & Health (T/F)' },
    shortDesc: { pt: 'Avalia afirmações de postura e saúde visual', en: 'Evaluate posture and eye health statements' },
    icon: '🪑',
    type: 'challenge',
  },
  'jogo-ergo-mc': {
    themeId: 'ergonomia',
    title: { pt: 'Hábitos e Ergonomia Saudável', en: 'Healthy Ergonomics Habits' },
    shortDesc: { pt: 'Desafio de escolha múltipla sobre postura e bem-estar', en: 'Multiple choice on posture and wellness' },
    icon: '🏃‍♂️',
    type: 'challenge',
  },
  'jogo-ergo-order': {
    themeId: 'ergonomia',
    title: { pt: 'Passos da Postura Perfeita', en: 'Perfect Posture Steps' },
    shortDesc: { pt: 'Ordena o ajuste correto da cadeira e monitor', en: 'Order chair and monitor adjustment steps' },
    icon: '📏',
    type: 'challenge',
  },
  'quiz-final-tema2': {
    themeId: 'ergonomia',
    title: { pt: 'Quiz Final: Ergonomia e Bem-Estar', en: 'Final Quiz: Ergonomics & Well-being' },
    icon: '🏆',
    type: 'quiz',
  },

  // Theme 3: Segurança
  'seg-dados-pessoais': {
    themeId: 'seguranca',
    title: { pt: 'Proteção de Dados Pessoais na Internet', en: 'Personal Data Protection Online' },
    shortDesc: { pt: 'Módulo 1: O que partilhar e o que proteger em privado', en: 'Module 1: What to share vs keep private' },
    icon: '🔒',
    type: 'module',
  },
  'seg-pegada-digital': {
    themeId: 'seguranca',
    title: { pt: 'A Tua Pegada Digital e Reputação Online', en: 'Your Digital Footprint' },
    shortDesc: { pt: 'Módulo 2: O rasto que deixamos na Web', en: 'Module 2: The trail we leave on the web' },
    icon: '👣',
    type: 'module',
  },
  'seg-comunicacao-segura': {
    themeId: 'seguranca',
    title: { pt: 'Comunicação Segura e Respeitosa na Web', en: 'Safe & Respectful Online Communication' },
    shortDesc: { pt: 'Módulo 3: Prevenção do cyberbullying e respeito mútuo', en: 'Module 3: Cyberbullying prevention & respect' },
    icon: '🤝',
    type: 'module',
  },
  'jogo-seguranca-tf': {
    themeId: 'seguranca',
    title: { pt: 'Detetive de Segurança (Verdadeiro ou Falso)', en: 'Security Detective (T/F)' },
    shortDesc: { pt: 'Identifica o que é seguro e perigoso na Internet', en: 'Identify what is safe vs risky online' },
    icon: '🛡️',
    type: 'challenge',
  },
  'desafio-seguro-perigoso': {
    themeId: 'seguranca',
    title: { pt: 'Classificador Seguro vs. Perigoso', en: 'Safe vs Dangerous Classifier' },
    shortDesc: { pt: 'Arrasta os comportamentos para as categorias certas', en: 'Sort online behaviors into categories' },
    icon: '🛡️',
    type: 'challenge',
  },
  'desafio-detetive-phishing': {
    themeId: 'seguranca',
    title: { pt: 'Detetive de Phishing & Mensagens Suspeitas', en: 'Phishing Detective' },
    shortDesc: { pt: 'Analisa mensagens e emails fraudulentos', en: 'Analyze suspicious and fake messages' },
    icon: '🎣',
    type: 'challenge',
  },
  'desafio-phishing': {
    themeId: 'seguranca',
    title: { pt: 'Detetive de Phishing & Mensagens Suspeitas', en: 'Phishing Detective' },
    shortDesc: { pt: 'Analisa mensagens e emails fraudulentos', en: 'Analyze suspicious and fake messages' },
    icon: '🎣',
    type: 'challenge',
  },
  'desafio-o-que-farias': {
    themeId: 'seguranca',
    title: { pt: 'Cenários da Vida Real: O Que Farias?', en: 'Real Life Scenarios: What Would You Do?' },
    shortDesc: { pt: 'Toma as melhores decisões em situações do quotidiano', en: 'Make the safest choices in everyday situations' },
    icon: '🤔',
    type: 'challenge',
  },
  'desafio-tic-seguranca-cyberbullying': {
    themeId: 'seguranca',
    title: {
      pt: 'Guardião Digital: Cyberbullying (5 Passos) & Linha 800 21 90 90',
      en: 'Digital Guardian: Cyberbullying (5 Steps) & Helpline',
    },
    shortDesc: {
      pt: 'Aprende a agir perante situações desconfortáveis na Internet, explora o caso da Ana e memoriza os 5 passos essenciais de segurança.',
      en: 'Learn how to act against online harassment, explore Ana’s case, and master the 5 key safety steps.',
    },
    icon: '🛡️',
    type: 'challenge',
  },
  'desafio-tic-pegada-ecra-lixo': {
    themeId: 'seguranca',
    title: {
      pt: 'Publicarias Isto?',
      en: 'Would You Post This?',
    },
    shortDesc: {
      pt: 'Avalia o que é seguro publicar ou partilhar online: fotos, trabalhos escolares, dados pessoais e palavras-passe.',
      en: 'Evaluate what is safe to post or share online: photos, schoolwork, personal details, and passwords.',
    },
    icon: '🌍',
    type: 'challenge',
  },
  'quiz-final-tema3': {
    themeId: 'seguranca',
    title: { pt: 'Quiz Final: Segurança, Privacidade e Pegada', en: 'Final Quiz: Security & Privacy' },
    icon: '🏆',
    type: 'quiz',
  },

  // Theme 4: Palavras-passe
  'passe-anatomia': {
    themeId: 'palavras-passe',
    title: { pt: 'A Anatomia de uma Palavra-passe Forte', en: 'Anatomy of a Strong Password' },
    shortDesc: { pt: 'Módulo 1: Maiúsculas, números, símbolos e comprimento', en: 'Module 1: Uppercase, numbers, symbols & length' },
    icon: '🔐',
    type: 'module',
  },
  'passe-gestao-contas': {
    themeId: 'palavras-passe',
    title: { pt: 'Gestão e Cuidados com as Tuas Contas', en: 'Account Management & Safety' },
    shortDesc: { pt: 'Módulo 2: Não partilhar, mudar regularmente e fechar sessão', en: 'Module 2: Privacy, updating & logging out' },
    icon: '🛡️',
    type: 'module',
  },
  'passe-autenticacao-dois-fatores': {
    themeId: 'palavras-passe',
    title: { pt: 'Autenticação em Dois Passos (2FA)', en: 'Two-Factor Authentication (2FA)' },
    shortDesc: { pt: 'Módulo 3: A camada extra de proteção digital', en: 'Module 3: Extra digital protection layer' },
    icon: '📲',
    type: 'module',
  },
  'desafio-password-segura': {
    themeId: 'palavras-passe',
    title: { pt: 'Construtor de Palavras-passe Seguras', en: 'Secure Password Builder' },
    shortDesc: { pt: 'Cria combinações fortes e impenetráveis', en: 'Build strong and safe passwords' },
    icon: '🔑',
    type: 'challenge',
  },
  'jogo-passe-tf': {
    themeId: 'palavras-passe',
    title: { pt: 'Boas Práticas de Palavras-passe (V/F)', en: 'Password Good Practices (T/F)' },
    shortDesc: { pt: 'Verifica regras de ouro para proteger as tuas contas', en: 'Check golden rules to safeguard accounts' },
    icon: '🛡️',
    type: 'challenge',
  },
  'jogo-passe-mc': {
    themeId: 'palavras-passe',
    title: { pt: 'Escolha Múltipla: Palavras-passe & PIN', en: 'Multiple Choice: Passwords & PIN' },
    shortDesc: { pt: 'Responde a perguntas sobre cofres de palavras-passe e PINs', en: 'Answer questions on password vaults and PINs' },
    icon: '🔐',
    type: 'challenge',
  },
  'jogo-passe-match': {
    themeId: 'palavras-passe',
    title: { pt: 'Ligar Elementos de Segurança de Acesso', en: 'Match Access Security Elements' },
    shortDesc: { pt: 'Combina termos de segurança com as suas funções', en: 'Match security terms with their roles' },
    icon: '🧩',
    type: 'challenge',
  },
  'quiz-final-tema4': {
    themeId: 'palavras-passe',
    title: { pt: 'Quiz Final: Palavras-passe e Contas', en: 'Final Quiz: Passwords & Accounts' },
    icon: '🏆',
    type: 'quiz',
  },

  // Theme 5: Correio Eletrónico
  'email-fundamentos': {
    themeId: 'correio-eletronico',
    title: { pt: 'Fundamentos e Estrutura do Email', en: 'Email Basics and Structure' },
    shortDesc: { pt: 'Módulo 1: Para, Assunto, Saudação, Corpo e Anexos', en: 'Module 1: To, Subject, Greeting, Body & Attachments' },
    icon: '📬',
    type: 'module',
  },
  'email-etiqueta-seguranca': {
    themeId: 'correio-eletronico',
    title: { pt: 'Netiqueta e Segurança no Correio Eletrónico', en: 'Netiquette and Safe Email Practices' },
    shortDesc: { pt: 'Módulo 2: Respeito, clareza e prevenção de spam', en: 'Module 2: Respect, clarity & spam prevention' },
    icon: '🤝',
    type: 'module',
  },
  'desafio-escrever-email': {
    themeId: 'correio-eletronico',
    title: { pt: 'Laboratório de Redação de Email Escolar', en: 'School Email Writing Lab' },
    shortDesc: { pt: 'Escreve um email formal e correto ao teu professor', en: 'Write a formal email to a teacher' },
    icon: '✉️',
    type: 'challenge',
  },
  'desafio-email': {
    themeId: 'correio-eletronico',
    title: { pt: 'Laboratório de Redação de Email Escolar', en: 'School Email Writing Lab' },
    shortDesc: { pt: 'Escreve um email formal e correto ao teu professor', en: 'Write a formal email to a teacher' },
    icon: '✉️',
    type: 'challenge',
  },
  'desafio-organizar-inbox': {
    themeId: 'correio-eletronico',
    title: { pt: 'Organizador de Caixa de Entrada', en: 'Inbox Organizer' },
    shortDesc: { pt: 'Classifica mensagens por pastas e prioridades', en: 'Sort messages into folders and priorities' },
    icon: '📥',
    type: 'challenge',
  },
  'desafio-cc-bcc': {
    themeId: 'correio-eletronico',
    title: { pt: 'Mestre dos Destinatários (Para, Cc, Cco)', en: 'Recipient Master (To, CC, BCC)' },
    shortDesc: { pt: 'Aprende quando usar Cc e Cco para proteger privacidade', en: 'Learn when to use CC vs BCC for privacy' },
    icon: '👥',
    type: 'challenge',
  },
  'jogo-email-tf': {
    themeId: 'correio-eletronico',
    title: { pt: 'Regras de Netiqueta no Email (V/F)', en: 'Email Netiquette (T/F)' },
    shortDesc: { pt: 'Identifica o que é adequado e inadequado numa mensagem', en: 'Identify what is proper and improper in emails' },
    icon: '📧',
    type: 'challenge',
  },
  'jogo-email-mc': {
    themeId: 'correio-eletronico',
    title: { pt: 'Escolha Múltipla: Email Seguro e Eficaz', en: 'Multiple Choice: Safe & Effective Email' },
    shortDesc: { pt: 'Perguntas sobre anexos, vírus e saudações', en: 'Questions on attachments, virus safety and greetings' },
    icon: '📨',
    type: 'challenge',
  },
  'jogo-email-match': {
    themeId: 'correio-eletronico',
    title: { pt: 'Ligar Elementos de um Email', en: 'Match Email Components' },
    shortDesc: { pt: 'Associa cada parte do email à sua função', en: 'Match each email section to its role' },
    icon: '🔗',
    type: 'challenge',
  },
  'jogo-email-order': {
    themeId: 'correio-eletronico',
    title: { pt: 'Constrói um email', en: 'Constrói um email' },
    shortDesc: { pt: 'Arrasta as opções da direita para os locais corretos, para completares a mensagem de email.', en: 'Arrasta as opções da direita para os locais corretos, para completares a mensagem de email.' },
    icon: '✉️',
    type: 'challenge',
  },
  'quiz-final-tema5': {
    themeId: 'correio-eletronico',
    title: { pt: 'Quiz Final: Correio Eletrónico', en: 'Final Quiz: Email' },
    icon: '🏆',
    type: 'quiz',
  },

  // Theme 6: Navegar e Pesquisar na Internet
  'nav-como-funciona-web': {
    themeId: 'navegar-internet',
    title: { pt: 'Como Funciona a Web: URLs e Navegadores', en: 'How the Web Works: URLs & Browsers' },
    shortDesc: { pt: 'Módulo 1: O que é a Web, hiperligações e browsers', en: 'Module 1: The Web, hyperlinks & browsers' },
    icon: '🌍',
    type: 'module',
  },
  'nav-motores-pesquisa': {
    themeId: 'navegar-internet',
    title: { pt: 'Motores de Busca e Palavras-chave', en: 'Search Engines & Keywords' },
    shortDesc: { pt: 'Módulo 2: Como escolher os melhores termos de busca', en: 'Module 2: Picking the best search terms' },
    icon: '🔍',
    type: 'module',
  },
  'nav-operadores-pesquisa': {
    themeId: 'navegar-internet',
    title: { pt: 'Técnicas e Operadores de Pesquisa', en: 'Search Operators & Techniques' },
    shortDesc: { pt: 'Módulo 3: Usar aspas, sinais de menos e filtros avançados', en: 'Module 3: Using quotes, minus signs and filters' },
    icon: '⚙️',
    type: 'module',
  },
  'desafio-palavras-chave': {
    themeId: 'navegar-internet',
    title: { pt: 'Mestre das Palavras-chave', en: 'Keywords Master' },
    shortDesc: { pt: 'Transforma perguntas em termos de busca precisos', en: 'Turn questions into sharp search terms' },
    icon: '🔍',
    type: 'challenge',
  },
  'desafio-misterio-aspas': {
    themeId: 'navegar-internet',
    title: { pt: 'Operadores de Busca e Aspas', en: 'Search Operators & Quotes' },
    shortDesc: { pt: 'Usa "expressões exatas" e filtros para encontrar respostas', en: 'Use exact quotes and operators to find facts' },
    icon: '💡',
    type: 'challenge',
  },
  'jogo-nav-tf': {
    themeId: 'navegar-internet',
    title: { pt: 'Navegação Segura na Web (V/F)', en: 'Safe Web Browsing (T/F)' },
    shortDesc: { pt: 'Verifica cuidados essenciais ao navegar na Internet', en: 'Check essential habits when browsing the web' },
    icon: '🌐',
    type: 'challenge',
  },
  'jogo-navegar-tf': {
    themeId: 'navegar-internet',
    title: { pt: 'Navegação Segura na Web (V/F)', en: 'Safe Web Browsing (T/F)' },
    shortDesc: { pt: 'Verifica cuidados essenciais ao navegar na Internet', en: 'Check essential habits when browsing the web' },
    icon: '🌐',
    type: 'challenge',
  },
  'jogo-nav-mc': {
    themeId: 'navegar-internet',
    title: { pt: 'Estratégias de Pesquisa Eficaz', en: 'Effective Search Strategies' },
    shortDesc: { pt: 'Escolha múltipla sobre truques de pesquisa na Web', en: 'Multiple choice on smart web search tricks' },
    icon: '🔎',
    type: 'challenge',
  },
  'jogo-navegar-mc': {
    themeId: 'navegar-internet',
    title: { pt: 'Estratégias de Pesquisa Eficaz', en: 'Effective Search Strategies' },
    shortDesc: { pt: 'Escolha múltipla sobre truques de pesquisa na Web', en: 'Multiple choice on smart web search tricks' },
    icon: '🔎',
    type: 'challenge',
  },
  'jogo-nav-order': {
    themeId: 'navegar-internet',
    title: { pt: 'Passos de Pesquisa Estruturada', en: 'Structured Search Steps' },
    shortDesc: { pt: 'Coloca em ordem as etapas de uma boa pesquisa escolar', en: 'Order steps of a solid research process' },
    icon: '📦',
    type: 'challenge',
  },
  'quiz-final-tema6': {
    themeId: 'navegar-internet',
    title: { pt: 'Quiz Final: Navegação e Pesquisa na Web', en: 'Final Quiz: Web Browsing & Search' },
    icon: '🏆',
    type: 'quiz',
  },

  // Theme 7: Direitos de Autor e Fontes
  'copy-o-que-sao': {
    themeId: 'direitos-autor',
    title: { pt: 'O que são Direitos de Autor e Propriedade Intelectual', en: 'What is Copyright & Intellectual Property' },
    shortDesc: { pt: 'Módulo 1: Proteção legal e direitos sobre as obras originais', en: 'Module 1: Legal protection and rights over original works' },
    icon: '©️',
    type: 'module',
  },
  'copy-plagio-respeito': {
    themeId: 'direitos-autor',
    title: { pt: 'O que é o Plágio e Como Evitá-lo', en: 'What is Plagiarism & How to Avoid It' },
    shortDesc: { pt: 'Módulo 2: O risco do Copiar/Colar e como parafrasear', en: 'Module 2: Copy/Paste risks and paraphrasing' },
    icon: '✍️',
    type: 'module',
  },
  'copy-creative-commons': {
    themeId: 'direitos-autor',
    title: { pt: 'Licenças Livres e Creative Commons (CC)', en: 'Free Licenses & Creative Commons' },
    shortDesc: { pt: 'Módulo 3: Utilização legal de imagens e músicas livres', en: 'Module 3: Legal use of free images & audio' },
    icon: '🔓',
    type: 'module',
  },
  'ref-avaliar-fontes': {
    themeId: 'direitos-autor',
    title: { pt: 'Como Avaliar a Fiabilidade das Fontes', en: 'How to Evaluate Source Credibility' },
    shortDesc: { pt: 'Módulo 4: Autor, data, instituição e rigor dos factos', en: 'Module 4: Author, date, publisher and rigor' },
    icon: '🔍',
    type: 'module',
  },
  'ref-como-construir-referencias': {
    themeId: 'direitos-autor',
    title: { pt: 'Como Construir as Referências Bibliográficas', en: 'How to Build Bibliographic References' },
    shortDesc: { pt: 'Módulo 5: Autor, Título, Link e Data de Acesso', en: 'Module 5: Author, Title, Link and Access Date' },
    icon: '📝',
    type: 'module',
  },
  'ref-combater-desinformacao': {
    themeId: 'direitos-autor',
    title: { pt: 'Combater a Desinformação e Notícias Falsas', en: 'Fighting Misinformation & Fake News' },
    shortDesc: { pt: 'Módulo 6: Identificar boatos e cruzar fontes', en: 'Module 6: Spotting hoaxes & cross-checking' },
    icon: '📰',
    type: 'module',
  },
  'jogo-ref-match': {
    themeId: 'direitos-autor',
    title: { pt: 'Correspondência de Licenças e Termos', en: 'Licenses & Terms Match' },
    shortDesc: { pt: 'Combina símbolos (CC-BY, Domínio Público) com as suas regras', en: 'Match CC symbols with their usage rules' },
    icon: '🃏',
    type: 'challenge',
  },
  'jogo-ref-detective': {
    themeId: 'direitos-autor',
    title: { pt: 'Detetive de Plágio & Respeito', en: 'Plagiarism & Respect Detective' },
    shortDesc: { pt: 'Julga cenários de utilização de conteúdos e trabalhos', en: 'Judge content usage and school work scenarios' },
    icon: '⚖️',
    type: 'challenge',
  },
  'desafio-copiar-criar': {
    themeId: 'direitos-autor',
    title: { pt: 'Detetive de Plágio & Respeito', en: 'Plagiarism & Respect Detective' },
    shortDesc: { pt: 'Julga cenários de utilização de conteúdos e trabalhos', en: 'Judge content usage and school work scenarios' },
    icon: '⚖️',
    type: 'challenge',
  },
  'jogo-ref-classify': {
    themeId: 'direitos-autor',
    title: { pt: 'Classificador de Fiabilidade de Fontes', en: 'Source Credibility Classifier' },
    shortDesc: { pt: 'Separa sites e portais fiáveis de fontes suspeitas', en: 'Separate trustworthy portals from rumors' },
    icon: '🛡️',
    type: 'challenge',
  },
  'desafio-fontes-fiaveis': {
    themeId: 'direitos-autor',
    title: { pt: 'Classificador de Fiabilidade de Fontes', en: 'Source Credibility Classifier' },
    shortDesc: { pt: 'Separa sites e portais fiáveis de fontes suspeitas', en: 'Separate trustworthy portals from rumors' },
    icon: '🛡️',
    type: 'challenge',
  },
  'jogo-ref-order': {
    themeId: 'direitos-autor',
    title: { pt: 'Passos de Verificação de Factos e Citação', en: 'Fact-Checking & Citation Steps' },
    shortDesc: { pt: 'Ordena o processo de investigação e citação', en: 'Order research and citation process' },
    icon: '📦',
    type: 'challenge',
  },
  'quiz-final-tema7': {
    themeId: 'direitos-autor',
    title: { pt: 'Quiz Final: Direitos de Autor', en: 'Final Quiz: Copyright' },
    icon: '🏆',
    type: 'quiz',
  },
};

/**
 * Resolves full, human-friendly metadata for any activity ID,
 * associating it with its proper Theme, title, icon, and pedagogical type.
 */
export function resolveActivityInfo(
  activityId: string,
  providedThemeId?: string,
  activityType?: 'module' | 'quiz' | 'challenge',
  language: Language = 'pt'
): ResolvedActivityInfo {
  // 1. Direct dictionary lookup
  if (KNOWN_ACTIVITY_MAPPINGS[activityId]) {
    const item = KNOWN_ACTIVITY_MAPPINGS[activityId];
    const theme = THEMES_BY_ID[item.themeId] || ALL_THEMES[0];
    return {
      activityId,
      themeId: theme.id,
      themeNumber: theme.number,
      themeTitle: theme.title[language],
      themeIcon: theme.icon,
      themeAccentColor: theme.accentColor,
      title: item.title[language],
      shortDesc: item.shortDesc ? item.shortDesc[language] : undefined,
      icon: item.icon,
      typeLabel:
        item.type === 'module'
          ? language === 'pt'
            ? 'Conteúdo / Lição'
            : 'Lesson Content'
          : item.type === 'quiz'
          ? language === 'pt'
            ? 'Quiz Final'
            : 'Final Quiz'
          : language === 'pt'
          ? 'Desafio / Jogo'
          : 'Challenge Game',
      type: item.type,
    };
  }

  // 2. Search dynamic theme definitions across ALL_THEMES
  for (const theme of ALL_THEMES) {
    // Check modules
    const mod = theme.modules.find((m) => m.id === activityId);
    if (mod) {
      return {
        activityId,
        themeId: theme.id,
        themeNumber: theme.number,
        themeTitle: theme.title[language],
        themeIcon: theme.icon,
        themeAccentColor: theme.accentColor,
        title: mod.title[language],
        shortDesc: mod.shortDesc[language],
        icon: mod.icon || '📖',
        typeLabel: language === 'pt' ? 'Conteúdo / Lição' : 'Lesson Content',
        type: 'module',
      };
    }

    // Check challenges
    const chal = theme.challenges.find((c) => c.id === activityId);
    if (chal) {
      return {
        activityId,
        themeId: theme.id,
        themeNumber: theme.number,
        themeTitle: theme.title[language],
        themeIcon: theme.icon,
        themeAccentColor: theme.accentColor,
        title: chal.title[language],
        shortDesc: chal.shortDesc[language],
        icon: chal.icon || '🎮',
        typeLabel: language === 'pt' ? 'Desafio / Jogo' : 'Challenge Game',
        type: 'challenge',
      };
    }
  }

  // 3. Check for quiz indicators
  const normalizedId = activityId.toLowerCase();
  if (normalizedId.includes('quiz') || activityType === 'quiz') {
    let targetTheme = ALL_THEMES[0];
    if (providedThemeId && THEMES_BY_ID[providedThemeId]) {
      targetTheme = THEMES_BY_ID[providedThemeId];
    } else if (normalizedId.includes('email') || normalizedId.includes('correio')) {
      targetTheme = THEMES_BY_ID['correio-eletronico'] || ALL_THEMES[0];
    } else if (normalizedId.includes('tic') || normalizedId.includes('soc')) {
      targetTheme = THEMES_BY_ID['tic-sociedade'] || ALL_THEMES[1];
    } else if (normalizedId.includes('ergo')) {
      targetTheme = THEMES_BY_ID['ergonomia'] || ALL_THEMES[2];
    } else if (normalizedId.includes('seguran')) {
      targetTheme = THEMES_BY_ID['seguranca'] || ALL_THEMES[3];
    } else if (normalizedId.includes('passe') || normalizedId.includes('password')) {
      targetTheme = THEMES_BY_ID['palavras-passe'] || ALL_THEMES[4];
    } else if (normalizedId.includes('pesquisa') || normalizedId.includes('navegar')) {
      targetTheme = THEMES_BY_ID['navegar-internet'] || ALL_THEMES[5];
    } else if (normalizedId.includes('autor') || normalizedId.includes('referencia')) {
      targetTheme = THEMES_BY_ID['direitos-autor'] || ALL_THEMES[6];
    }

    return {
      activityId,
      themeId: targetTheme.id,
      themeNumber: targetTheme.number,
      themeTitle: targetTheme.title[language],
      themeIcon: targetTheme.icon,
      themeAccentColor: targetTheme.accentColor,
      title: language === 'pt' ? `Quiz Final: ${targetTheme.title.pt}` : `Final Quiz: ${targetTheme.title.en}`,
      icon: '🏆',
      typeLabel: language === 'pt' ? 'Quiz Final' : 'Final Quiz',
      type: 'quiz',
    };
  }

  // 4. Fallback: match by theme prefix or provided theme
  let fallbackTheme = ALL_THEMES[0];
  if (providedThemeId && THEMES_BY_ID[providedThemeId]) {
    fallbackTheme = THEMES_BY_ID[providedThemeId];
  } else if (normalizedId.startsWith('email-') || normalizedId.includes('inbox') || normalizedId.includes('correio')) {
    fallbackTheme = THEMES_BY_ID['correio-eletronico'] || ALL_THEMES[0];
  } else if (normalizedId.startsWith('tic-') || normalizedId.includes('soc')) {
    fallbackTheme = THEMES_BY_ID['tic-sociedade'] || ALL_THEMES[1];
  } else if (normalizedId.startsWith('ergo-')) {
    fallbackTheme = THEMES_BY_ID['ergonomia'] || ALL_THEMES[2];
  } else if (normalizedId.startsWith('seg-') || normalizedId.includes('seguranca')) {
    fallbackTheme = THEMES_BY_ID['seguranca'] || ALL_THEMES[3];
  } else if (normalizedId.startsWith('passe-') || normalizedId.includes('password')) {
    fallbackTheme = THEMES_BY_ID['palavras-passe'] || ALL_THEMES[4];
  } else if (normalizedId.startsWith('nav-') || normalizedId.includes('pesquisa') || normalizedId.includes('aspas')) {
    fallbackTheme = THEMES_BY_ID['navegar-internet'] || ALL_THEMES[5];
  } else if (normalizedId.startsWith('copy-') || normalizedId.startsWith('ref-') || normalizedId.includes('autor')) {
    fallbackTheme = THEMES_BY_ID['direitos-autor'] || ALL_THEMES[6];
  }

  // Humanize the raw activity id
  const readableName = activityId
    .replace(/^jogo-|^desafio-|^mod-|^quiz-/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    activityId,
    themeId: fallbackTheme.id,
    themeNumber: fallbackTheme.number,
    themeTitle: fallbackTheme.title[language],
    themeIcon: fallbackTheme.icon,
    themeAccentColor: fallbackTheme.accentColor,
    title: readableName,
    icon: activityType === 'module' ? '📖' : '🎮',
    typeLabel:
      activityType === 'module'
        ? language === 'pt'
          ? 'Conteúdo / Lição'
          : 'Lesson Content'
        : language === 'pt'
        ? 'Desafio / Jogo'
        : 'Challenge Game',
    type: activityType || 'challenge',
  };
}
