import * as fs from 'fs';
import * as path from 'path';
import { ALL_366_DAILY_TIPS, DailyTicTip, DailyTipOption } from '../src/data/dailyTipsData';

// Theme-specific humor distractor pools for 10-year-olds
const THEME_HUMOR_DISTRACTORS: Record<string, { pt: string; en: string }[]> = {
  'ergonomia': [
    { pt: "Trabalhar de cabeça para baixo pendurado no candeeiro do teto como um morcego.", en: "Work upside down hanging from the ceiling lamp like a bat." },
    { pt: "Colocar o monitor no chão e usar o computador deitado de barriga para baixo feito lagarto.", en: "Put the screen on the floor and lie down like a lizard." },
    { pt: "Ficar 8 horas seguidas sem pestanejar feito uma estátua do museu de cera.", en: "Stare for 8 straight hours without blinking like a wax museum statue." },
    { pt: "Mergulhar os olhos em chá quente para ver vídeos no YouTube mais depressa.", en: "Soak your eyes in hot tea to watch YouTube videos faster." },
    { pt: "Sentar em cima de 5 almofadas até bater com a cabeça no teto do quarto.", en: "Stack 5 pillows on the chair until your head hits the ceiling." },
    { pt: "Mover o rato com o pé esquerdo para dar descanso à mão direita.", en: "Move the mouse with your left foot to rest your right hand." },
    { pt: "Colocar o teclado a 2 metros de distância e tentar escrever com duas vassouras.", en: "Put the keyboard 2 meters away and type with two brooms." },
    { pt: "Dormir com o telemóvel colado na testa para sonhar com jogos online.", en: "Sleep with the phone glued to your forehead to dream about online games." },
    { pt: "Trabalhar às escuras com óculos de sol para parecer um agente secreto.", en: "Work in total darkness wearing sunglasses to look like a secret agent." },
    { pt: "Pedir ao gato da família para fazer as pausas ativas no teu lugar.", en: "Ask your pet cat to do the active break stretches for you." },
    { pt: "Usar o auscultador no volume máximo de concerto de rock até os tímpanos dançarem.", en: "Crank headphones to max rock concert volume until eardrums rattle." },
    { pt: "Encher a mochila da escola com tijolos para ficar mais forte nas aulas.", en: "Fill the school bag with bricks to get stronger during classes." },
  ],
  'palavras-passe': [
    { pt: "Usar a senha '123456' e colá-la com fita-cola na testa para não a esquecer.", en: "Use '123456' and tape it to your forehead so you never forget it." },
    { pt: "Partilhar a palavra-passe no grupo de WhatsApp da turma toda.", en: "Share the password in the whole class WhatsApp group." },
    { pt: "Escolher o nome do teu cão porque os hackers têm medo de animais de estimação.", en: "Pick your dog's name because hackers are afraid of pets." },
    { pt: "Escrever a senha na lousa da sala de aula com giz vermelho gigante.", en: "Write the password on the classroom chalkboard in giant red chalk." },
    { pt: "Dar a tua palavra-passe a um estranho na Internet em troca de 5 moedas virtuais.", en: "Give your password to an online stranger in exchange for 5 virtual coins." },
    { pt: "Usar a mesma senha 'chocolate' em todos os sites do planeta Terra.", en: "Use the same password 'chocolate' across every website on Earth." },
    { pt: "Gritar a senha bem alto pela janela para verificar se a memorizaste bem.", en: "Yell the password out the window to make sure you memorized it." },
    { pt: "Esconder a senha debaixo do tapete da entrada do quarto.", en: "Hide the password under the welcome mat in your room." },
    { pt: "Achar que os computadores são mágicos e adivinham quem tu és sem senha.", en: "Think computers are magic and guess who you are without passwords." },
    { pt: "Usar a palavra 'senha' como senha para ser super original.", en: "Use the word 'password' as your password to be super original." },
    { pt: "Colar 20 post-its amarelos à volta do monitor com todas as tuas senhas anotadas.", en: "Stick 20 yellow post-its around your screen with all your passwords." },
    { pt: "Deixar a sessão aberta no computador da biblioteca e ir embora para casa.", en: "Leave your account logged in at the school library and go home." },
  ],
  'seguranca': [
    { pt: "Clicar num anúncio a piscar a dizer: 'Parabéns, ganhaste 1 elefante voador grátis!'.", en: "Click a flashing ad that says: 'Congratulations, you won a free flying elephant!'." },
    { pt: "Dar a morada de tua casa e número de telefone a um desconhecido num jogo online.", en: "Give your home address and phone number to a stranger in an online game." },
    { pt: "Desativar o antivírus porque o ícone dele é demasiado aborrecido.", en: "Disable the antivirus because its icon looks too boring." },
    { pt: "Instalar um jogo pirata de um site suspeito que promete moedas infinitas.", en: "Download a pirated game from a shady website promising infinite gems." },
    { pt: "Publicar no TikTok a fotografia das chaves da tua casa e a matrícula do carro dos pais.", en: "Post a TikTok video of your house keys and your parents' car license plate." },
    { pt: "Convidar um jogador estranho da Internet para vir lanchar a tua casa amanhã.", en: "Invite a random gamer from the web to come over for a snack tomorrow." },
    { pt: "Acreditar num email que diz que o Príncipe de Marte quer dar-te uma fortuna.", en: "Believe an email saying the Prince of Mars wants to give you a fortune." },
    { pt: "Deixar a câmara do computador ligada 24 horas a apontar para a tua cama.", en: "Leave your computer webcam on 24 hours pointing at your bed." },
    { pt: "Lavar o teclado com detergente da louça para tirar os vírus informáticos.", en: "Wash the keyboard with dish soap to scrub away computer viruses." },
    { pt: "Ignorar todos os avisos de segurança porque achas que és invencível.", en: "Ignore all security alerts because you feel completely invincible." },
    { pt: "Partilhar a tua localização GPS exata em tempo real com toda a gente nas redes.", en: "Share your exact live GPS location publicly with everyone on social media." },
    { pt: "Dizer a toda a gente em que escola andas e em que sala tens aula agora.", en: "Tell everyone online which school and classroom you are in right now." },
  ],
  'correio-eletronico': [
    { pt: "Escrever o email todo em LETRAS MAIÚSCULAS aos berros para o carteiro correr mais.", en: "Write the whole email in ALL CAPS screaming so the digital mailman runs faster." },
    { pt: "Enviar uma mensagem sem assunto e com o texto: 'Olá prof, adivinhe quem sou eu!'.", en: "Send an email with no subject line saying: 'Hi teacher, guess who I am!'." },
    { pt: "Abrir um ficheiro misterioso chamado 'premio_gratis_virus.exe' enviado por um estranho.", en: "Open a mystery attachment named 'free_prize_virus.exe' from a stranger." },
    { pt: "Carregar em 'Responder a Todos' para dizer apenas 'OK' a 500 pessoas da escola.", en: "Click 'Reply to All' just to say 'OK' to 500 people in the school." },
    { pt: "Mandar correntes a dizer que se não reencaminhares o email um fantasma come o teu lanche.", en: "Forward chain emails saying a ghost will eat your lunch if you don't resend." },
    { pt: "Pedir a um pombo-correio para levar o computador portátil até à casa da professora.", en: "Ask a carrier pigeon to fly your laptop over to the teacher's house." },
    { pt: "Colocar o email dos teus colegas no campo 'Para' público para spammers verem.", en: "Put your classmates' private emails in the public 'To' field for spammers to see." },
    { pt: "Terminar o email à diretora da escola com: 'Fui, até logo mano fixe!'.", en: "Sign off an email to the school principal with: 'Peace out cool bro!'." },
    { pt: "Achar que um email urgente do banco a pedir senhas por SMS é verdadeiro.", en: "Think an urgent bank email asking for your password via SMS is legitimate." },
    { pt: "Escrever emails invisíveis com texto branco sobre fundo branco para ser secreto.", en: "Type invisible emails with white text on a white background to be super secret." },
  ],
  'navegar-internet': [
    { pt: "Acreditar logo no primeiro resultado da pesquisa sem verificar se o site é de confiança.", en: "Believe the very first search result without checking if the source is reliable." },
    { pt: "Escrever no motor de busca: 'Ó computador inteligente, dá-me nota 5 no teste!'.", en: "Type in the search engine: 'Oh wise computer, give me top marks on my test!'." },
    { pt: "Gritar com o ecrã para a página da Internet carregar mais depressa.", en: "Shout at the screen hoping the web page loads three times faster." },
    { pt: "Clicar num botão gigante que pisca a dizer: 'O seu computador tem 999 vírus!'.", en: "Click a giant blinking button that claims: 'Your PC has 999 viruses!'." },
    { pt: "Confundir o navegador (Google Chrome) com a própria rede mundial da Internet.", en: "Confuse the web browser with the entire global Internet infrastructure." },
    { pt: "Achar que o cadeado do HTTPS serve para trancar o computador com uma chave de metal.", en: "Think the HTTPS lock icon is for locking your computer with a physical key." },
    { pt: "Abrir 200 separadores ao mesmo tempo até o computador começar a deitar fumo imaginário.", en: "Open 200 browser tabs at once until the computer pretends to catch fire." },
    { pt: "Pesquisar no Google 'como teletransportar comida' e esperar que apareça uma piza no teclado.", en: "Search 'how to teleport food' and wait for a pizza to appear on the keyboard." },
    { pt: "Dar o teu nome e morada em todos os questionários pop-up que aparecem na web.", en: "Enter your real name and address in every pop-up quiz you see." },
    { pt: "Achar que tudo o que está escrito na Internet é 100% verdade comprovada pela ciência.", en: "Believe everything written on the Internet is 100% proven scientific truth." },
  ],
  'direitos-autor': [
    { pt: "Copiar o trabalho inteiro da Wikipédia e dizer que foste tu que o inventaste ontem.", en: "Copy the whole Wikipedia article and claim you invented it yesterday." },
    { pt: "Dizer que a pintura da Mona Lisa foi desenhada pelo teu primo no Paint.", en: "Claim that the Mona Lisa was drawn by your little cousin in MS Paint." },
    { pt: "Vender fotografias tiradas por outros fotógrafos no pátio da escola por 50 cêntimos.", en: "Sell photographs taken by professional photographers in the schoolyard for 50 cents." },
    { pt: "Publicar uma fotografia embaraçosa do teu colega na Internet sem a autorização dele.", en: "Post an embarrassing photo of your classmate online without their permission." },
    { pt: "Achar que o símbolo © de Copyright significa 'Copia O Que Quiseres'.", en: "Think the © Copyright symbol stands for 'Copy Whatever You Want'." },
    { pt: "Colocar música com direitos de autor num vídeo público sem dar crédito ao cantor.", en: "Use copyrighted pop music in a public video without giving any credit." },
    { pt: "Dizer que criaste o videojogo Minecraft no teu quarto antes do almoço.", en: "Claim that you personally created Minecraft in your bedroom before lunch." },
    { pt: "Apagar o nome do autor original e colar uma foto tua por cima.", en: "Erase the original author's signature and paste your own photo over it." },
    { pt: "Achar que tudo o que encontras no Google Imagens é teu por magia.", en: "Believe anything found on Google Images automatically belongs to you by magic." },
    { pt: "Assinar um livro famoso como se fosses o escritor secreto dele.", en: "Sign a famous fantasy book pretending you are its secret ghostwriter." },
  ],
  'tic-sociedade': [
    { pt: "Alimentar o rato do computador com fatias de queijo da serra para ele correr mais rápido.", en: "Feed the computer mouse slices of cheese so it runs faster across the desk." },
    { pt: "Meter o computador portátil no micro-ondas para carregar a bateria em 5 segundos.", en: "Put the laptop in the microwave to charge the battery in 5 seconds." },
    { pt: "Lavar a placa-mãe na máquina da roupa com detergente de morango e amaciador.", en: "Wash the motherboard in the laundry machine with strawberry-scented detergent." },
    { pt: "Achar que dentro da CPU mora um anãozinho minúsculo a fazer contas de somar.", en: "Believe a tiny little gnome lives inside the CPU doing math on a miniature blackboard." },
    { pt: "Deitar computadores e telemóveis velhos no caixote do lixo comum ou no mar.", en: "Throw old computers and smartphones into the regular trash or into the sea." },
    { pt: "Acreditar que os computadores funcionam através de pós mágicos de fadas.", en: "Believe computers run entirely on magical fairy dust." },
    { pt: "Tentar ligar a impressora ao frigorífico para imprimir gelados de chocolate.", en: "Try plugging the printer into the fridge to print chocolate ice creams." },
    { pt: "Achar que a memória RAM serve para guardar coisas mesmo quando o computador está desligado.", en: "Think RAM memory keeps your files saved even after turning off the computer." },
    { pt: "Falar com o router Wi-Fi aos gritos a pedir para ele ter mais simpatia.", en: "Yell at the Wi-Fi router politely begging it to be friendlier today." },
    { pt: "Pensar que o primeiro computador da história cabia no bolso das calças.", en: "Think the very first computer in history was small enough to fit in your pocket." },
  ],
};

function cleanTitle(title: string): string {
  return title
    .replace(/^(Sabias também que:\s*|Dica de ouro:\s*|Facto curioso:\s*|Para as tuas aulas:\s*|Avançado:\s*)/i, '')
    .trim();
}

// Category-based curated QA definitions for 10-year-olds
const CATEGORY_QA: Record<string, {
  qPt: string;
  qEn: string;
  aPt: string;
  aEn: string;
  expPt: string;
  expEn: string;
}> = {
  'História das Telecomunicações': {
    qPt: "Quem foi a primeira monarca da História a enviar uma mensagem por correio eletrónico (email) em 1976?",
    qEn: "Who was the first monarch in history to send an email message back in 1976?",
    aPt: "A Rainha Isabel II da Grã-Bretanha, através da rede pioneira ARPANET!",
    aEn: "Queen Elizabeth II of Great Britain, using the pioneering ARPANET network!",
    expPt: "Foi um acontecimento marcante que ajudou a divulgar as redes de computadores em todo o mundo!",
    expEn: "It was a landmark moment that boosted computer network awareness worldwide!",
  },
  'Postura na Cadeira': {
    qPt: "Qual é a postura correta na cadeira de trabalho segundo as regras de ergonomia de TIC?",
    qEn: "What is the correct seated posture according to ICT ergonomics rules?",
    aPt: "Costas direitas apoiadas no encosto, joelhos e cotovelos a 90° e pés bem assentes no chão!",
    aEn: "Straight back against the chair, knees and elbows at 90°, and feet flat on the floor!",
    expPt: "A postura correta evita lesões na coluna, dores de costas e mantém-te com boa energia!",
    expEn: "Good posture prevents back and neck strain while keeping your energy up for studying!",
  },
  'Pegada Digital': {
    qPt: "Porque se diz que a tua 'Pegada Digital' é como uma marca deixada no cimento fresco?",
    qEn: "Why is your 'Digital Footprint' compared to a footprint in wet cement?",
    aPt: "Porque tudo o que publicas e pesquisas fica gravado e é quase impossível de apagar totalmente!",
    aEn: "Because whatever you post or search leaves a trace that is very difficult to fully erase!",
    expPt: "Constrói sempre uma pegada digital positiva, com respeito, gentileza e boas ações!",
    expEn: "Always build a positive digital footprint with respect, kindness, and smart choices!",
  },
  'Força de Senhas': {
    qPt: "Porque deves evitar palavras-passe fáceis como '123456', 'benfica' ou a tua data de nascimento?",
    qEn: "Why should you avoid simple passwords like '123456', your soccer club, or your birthdate?",
    aPt: "Porque programas automáticos de hackers conseguem adivinhá-las numa fração de segundo!",
    aEn: "Because automated hacker scripts can guess them in a tiny fraction of a second!",
    expPt: "Quanto mais longa e variada for a palavra-passe, mais segura e inviolável ela fica!",
    expEn: "The longer and more varied your password, the harder it is for anyone to break!",
  },
  'Campos do Email': {
    qPt: "Para que serve o campo secreto 'Cco' (Bcc) ao enviar um email para vários colegas da turma?",
    qEn: "What is the secret 'Bcc' (Cco) field used for when emailing multiple classmates?",
    aPt: "Para ocultar os emails dos destinatários e proteger a privacidade de toda a gente!",
    aEn: "To hide recipients' email addresses and protect everyone's privacy!",
    expPt: "Usar o campo Cco impede que estranhos tenham acesso aos contactos privados dos teus amigos!",
    expEn: "Using Bcc stops outside parties or spammers from harvesting classmates' emails!",
  },
  'Navegador vs Motor': {
    qPt: "Qual é a diferença fundamental entre um Navegador (Browser) e um Motor de Busca?",
    qEn: "What is the key difference between a Web Browser and a Search Engine?",
    aPt: "O Navegador abre os sites (como o Chrome ou Edge); o Motor de Busca localiza páginas na Web (como o Google)!",
    aEn: "The Browser opens websites (like Chrome or Edge); the Search Engine searches web pages (like Google)!",
    expPt: "Pensa no navegador como o teu carro e no motor de busca como o mapa GPS!",
    expEn: "Think of the browser as your car and the search engine as your navigation GPS!",
  },
  'Google Imagens': {
    qPt: "Podes usar qualquer foto do Google Imagens livremente num trabalho público da escola?",
    qEn: "Can you freely use any picture from Google Images in a public school project?",
    aPt: "Não! A maioria das fotos tem direitos de autor; deves procurar imagens com licenças livres (Creative Commons)!",
    aEn: "No! Most images are copyrighted; you must look for open-licensed (Creative Commons) images!",
    expPt: "Respeitar a autoria é sinal de cidadania digital e de honestidade escolar!",
    expEn: "Respecting authorship is a hallmark of digital citizenship and academic honesty!",
  },
  'Memória do Computador': {
    qPt: "Qual é a grande diferença entre a memória RAM e o Disco de Armazenamento (SSD/HD)?",
    qEn: "What is the big difference between RAM memory and Storage (SSD/HD)?",
    aPt: "A RAM é rápida e temporária (apaga-se ao desligar); o SSD guarda ficheiros em definitivo!",
    aEn: "RAM is fast and temporary (clears on shutdown); the SSD stores files permanently!",
    expPt: "A RAM é a tua secretária de trabalho; o disco SSD é o armário onde guardas os cadernos!",
    expEn: "RAM is like your study desk workspace; the SSD is the locker where books are kept!",
  },
  'Evolução do Hardware': {
    qPt: "Como evoluíram os computadores desde os pioneiros do século XX até aos smartphones de hoje?",
    qEn: "How did computers evolve from 20th-century room-sized giants to modern smartphones?",
    aPt: "Ficaram milhões de vezes mais pequenos, mais rápidos, mais potentes e muito mais baratos!",
    aEn: "They became millions of times smaller, faster, more powerful, and far more affordable!",
    expPt: "Hoje tens no bolso mais poder de cálculo do que a NASA tinha quando enviou astronautas à Lua!",
    expEn: "Today your pocket smartphone has more computing power than NASA used to land on the Moon!",
  },
  'Privacidade e Redes': {
    qPt: "Que informação NUNCA deves partilhar publicamente na Internet ou com estranhos em jogos?",
    qEn: "What info should you NEVER post publicly online or share with strangers in games?",
    aPt: "A tua morada de casa, número de telemóvel, nome da escola e palavras-passe!",
    aEn: "Your home address, phone number, school name, and account passwords!",
    expPt: "Guardar os teus dados privados em segurança protege-te a ti e à tua família!",
    expEn: "Keeping personal information confidential protects you and your entire household!",
  },
  'O Segredo da Frase-Passe': {
    qPt: "Como funciona a técnica ninja da 'Frase-Passe' recomendada nas aulas de TIC?",
    qEn: "How does the ninja 'Pass-Phrase' technique taught in ICT work?",
    aPt: "Inventas uma frase divertida com 4 ou 5 palavras, números e símbolos fáceis de memorizar!",
    aEn: "You invent a funny phrase with 4-5 words, numbers, and symbols that are easy to remember!",
    expPt: "Frases como 'O_Meu_Cao_Adora_99_Gelados!' são gigantes para hackers mas fáceis para ti!",
    expEn: "Phrases like 'My_Dog_Loves_99_IceCreams!' are tough for hackers yet effortless to recall!",
  },
  'O Símbolo Arroba': {
    qPt: "Para que serve o símbolo '@' (arroba) nos endereços de correio eletrónico?",
    qEn: "What does the '@' (at) symbol do in email addresses?",
    aPt: "Separa o nome do utilizador do nome do servidor ou domínio onde a conta está alojada!",
    aEn: "It separates the user's name from the domain server hosting the mailbox!",
    expPt: "Foi introduzido por Ray Tomlinson em 1971 e hoje é conhecido em todo o mundo!",
    expEn: "It was introduced by Ray Tomlinson in 1971 and is recognized worldwide today!",
  },
  'Truque das Aspas': {
    qPt: "O que acontece quando colocas uma frase de pesquisa entre aspas \"\" no motor de busca?",
    qEn: "What happens when you wrap search terms in quotation marks \"\"?",
    aPt: "O motor de busca pesquisa exatamente aquelas palavras juntas e pela mesma ordem!",
    aEn: "The search engine hunts for those exact words grouped in the precise sequence!",
    expPt: "É o truque favorito dos investigadores para encontrar trabalhos e citações sem perder tempo!",
    expEn: "It is the favorite trick of researchers to locate exact facts and quotes instantly!",
  },
  'O que é Plágio': {
    qPt: "O que é 'Plágio' e porque é considerado uma infração grave na escola e na sociedade?",
    qEn: "What is 'Plagiarism' and why is it considered a serious wrongdoing in school?",
    aPt: "É copiar o trabalho de outra pessoa e fingir que fomos nós que o fizemos!",
    aEn: "It is copying someone else's work and pretending we created it ourselves!",
    expPt: "Cita sempre o autor original! Usar as ideias dos outros dando-lhes crédito é honesto e louvável!",
    expEn: "Always credit original authors! Referencing other people's ideas correctly is true scholarship!",
  },
  'Placa Principal': {
    qPt: "Porque é que a Motherboard tem o nome carinhoso de 'Placa-mãe' no computador?",
    qEn: "Why is the Motherboard named 'Mother-board' in computers?",
    aPt: "Porque é a placa principal que acolhe, alimenta e comunica com todos os outros componentes!",
    aEn: "Because it is the central circuit board that houses, powers, and connects all components!",
    expPt: "Sem a placa-mãe, a CPU, a RAM e a placa gráfica não conseguiriam conversar entre si!",
    expEn: "Without the motherboard, the CPU, RAM, and graphics card could never communicate!",
  },
  'Sono e Tecnologia': {
    qPt: "Porque deves desligar os ecrãs de telemóveis e tablets pelo menos 30 minutos antes de dormir?",
    qEn: "Why should you turn off phone and tablet screens at least 30 minutes before bedtime?",
    aPt: "Porque a luz azul dos ecrãs engana o cérebro e impede a produção da hormona do sono!",
    aEn: "Because screen blue light tricks the brain into thinking it's daylight and halts melatonin!",
    expPt: "Dormir bem dá-te energia e boa disposição para teres excelentes notas na escola!",
    expEn: "Getting deep, restorative sleep gives you energy and focus for school success!",
  },
  'Apoio e Helplines': {
    qPt: "Em Portugal, a que linha telefónica gratuita e confidencial podes ligar se tiveres problemas na Internet?",
    qEn: "In Portugal, what free confidential helpline can you call for internet troubles?",
    aPt: "Linha Internet Segura: 800 21 90 90!",
    aEn: "Safe Internet Helpline: 800 21 90 90!",
    expPt: "Nunca guardes medos ou dúvidas para ti: podes sempre pedir ajuda à Linha e aos teus professores!",
    expEn: "Never suffer in silence: you can always seek advice from helplines, parents, or teachers!",
  },
  'Partilha de Senhas': {
    qPt: "Com quem deves partilhar as tuas palavras-passe secretas de jogos e contas?",
    qEn: "Who should you share your secret passwords for accounts and games with?",
    aPt: "Apenas com os teus pais ou encarregados de educação; nunca com amigos nem colegas!",
    aEn: "Only with your parents or guardians; never with friends or schoolmates!",
    expPt: "Mesmo o teu melhor amigo não deve ter a tua senha; uma amizade verdadeira respeita o segredo!",
    expEn: "Even best friends shouldn't know your password; genuine friendship respects privacy!",
  },
  'Netiqueta em Emails': {
    qPt: "Qual destas regras de Netiqueta deves seguir sempre ao enviar um email escolar à professora?",
    qEn: "Which of these Netiquette rules should you always follow when emailing a teacher?",
    aPt: "Colocar um assunto claro, fazer uma saudação educada e assinar com o teu nome e número!",
    aEn: "Include a clear subject line, greet politely, and sign with your name and student number!",
    expPt: "A boa educação e a cordialidade abrem portas em todo o lado, incluindo no mundo digital!",
    expEn: "Politeness and clarity create positive communication in every digital exchange!",
  },
  'Segurança HTTPS': {
    qPt: "O que significa a letra 'S' e o símbolo do cadeado num endereço da Web como 'https://'?",
    qEn: "What does the 'S' and lock icon mean in a web address like 'https://'?",
    aPt: "Significa 'Seguro' e que a ligação está encriptada para ninguém espiar as mensagens!",
    aEn: "It stands for 'Secure' and means communication is encrypted against eavesdroppers!",
    expPt: "Nunca introduzas palavras-passe ou dados pessoais em sites que comecem apenas por 'http://'!",
    expEn: "Never enter passwords or private info on plain, unencrypted 'http://' sites!",
  },
  'Creative Commons': {
    qPt: "Para que servem as licenças Creative Commons (CC) que aprendeste nas aulas de TIC?",
    qEn: "What are Creative Commons (CC) licenses used for in ICT class?",
    aPt: "Permitem aos autores partilhar as suas obras gratuitamente, indicando as condições de uso!",
    aEn: "They allow creators to share their work for free, specifying usage conditions!",
    expPt: "Com Creative Commons podes usar fotografias e músicas fantásticas respeitando os criadores!",
    expEn: "Creative Commons licenses give you legal access to amazing photos, sound clips, and art!",
  },
  'Linguagem dos Computadores': {
    qPt: "Qual é a linguagem secreta que os circuitos eletrónicos dos computadores entendem no fundo de tudo?",
    qEn: "What secret language do computer circuits fundamentally understand deep down?",
    aPt: "O Código Binário, formado apenas por zeros (0) e uns (1)!",
    aEn: "Binary Code, made up solely of zeroes (0) and ones (1)!",
    expPt: "Zero significa 'desligado' e um significa 'ligado'; é assim que os computadores pensam!",
    expEn: "Zero means 'off' and one means 'on'; that's the digital heartbeat of all computers!",
  },
  'Pescoço e Coluna': {
    qPt: "O que é o chamado 'Pescoço de Texto' (Text Neck) provocado pelo uso exagerado do telemóvel?",
    qEn: "What is 'Text Neck' caused by looking down at phones for too long?",
    aPt: "É a dor e sobrecarga na coluna provocada por inclinar a cabeça muito para a frente e para baixo!",
    aEn: "It is the strain and spinal pain caused by constantly tilting your head down forward!",
    expPt: "Levanta o telemóvel à altura dos teus olhos em vez de dobrares o pescoço!",
    expEn: "Lift your phone up to eye level instead of bowing your head down!",
  },
  'Netiqueta e Empatia': {
    qPt: "O que deves fazer se vires alguém a ser gozado ou vítima de cyberbullying num grupo escolar?",
    qEn: "What should you do if you see someone being bullied or harassed in a school group chat?",
    aPt: "Não participar no gozo, apoiar a vítima e avisar um adulto de confiança (pais ou professor)!",
    aEn: "Don't join in, comfort the target, and report it to a trusted adult or teacher!",
    expPt: "A verdadeira coragem e cidadania digital mostram-se protegendo quem precisa!",
    expEn: "True digital bravery means standing up for others and stopping online cruelty!",
  },
  'Autenticação de 2 Fatores': {
    qPt: "O que é a Autenticação em Dois Fatores (2FA) e porque é recomendada para as tuas contas?",
    qEn: "What is Two-Factor Authentication (2FA) and why is it recommended?",
    aPt: "É uma dupla proteção que pede a tua senha mais um código especial enviado por SMS ou app!",
    aEn: "It is a double lock requiring your password plus a temporary code from SMS or an app!",
    expPt: "Mesmo que um hacker descubra a tua senha, não consegue entrar sem o segundo código!",
    expEn: "Even if someone discovers your password, they can't log in without the second code!",
  },
  'Anexos Perigosos': {
    qPt: "Qual destas extensões de ficheiro anexado num email de remetente desconhecido é MUITO perigosa?",
    qEn: "Which of these file extensions in an email from an unknown sender is VERY dangerous?",
    aPt: ".exe (ficheiro executável que pode instalar vírus no computador)!",
    aEn: ".exe (executable file that can install malware on your machine)!",
    expPt: "Nunca abras ficheiros executáveis anexados em emails de estranhos!",
    expEn: "Never click or run executable attachments received from unfamiliar senders!",
  },
  'Combate a Fake News': {
    qPt: "Ao ler uma notícia espantosa e chocante nas redes sociais, qual deve ser a tua primeira atitude?",
    qEn: "When reading an unbelievable, sensational headline on social media, what should you do first?",
    aPt: "Desconfiar, verificar a fonte original e confirmar a informação em jornais credíveis!",
    aEn: "Be skeptical, check the original source, and verify with reputable news media!",
    expPt: "As fake news espalham-se quando as pessoas partilham sem pensar; sê um detetive da verdade!",
    expEn: "False information spreads when people share blindly; always be a fact detective!",
  },
  'Citação e Bibliografia': {
    qPt: "O que deve constar na Bibliografia ou Webgrafia no final do teu trabalho de TIC?",
    qEn: "What must be included in the Bibliography or Webography at the end of an ICT project?",
    aPt: "A lista de livros, sites, autores e datas de onde retiraste a informação utilizada!",
    aEn: "The list of books, websites, authors, and dates from which you gathered your facts!",
    expPt: "Uma boa bibliografia mostra que fizeste uma pesquisa séria e respeitaste o trabalho dos autores!",
    expEn: "A proper bibliography demonstrates honest research and academic integrity!",
  },
  'Periféricos de TIC': {
    qPt: "Qual destes periféricos é classificado como Periférico de ENTRADA de dados para o computador?",
    qEn: "Which of these peripherals is classified as an INPUT device for the computer?",
    aPt: "O Teclado e o Rato (enviam os teus comandos para dentro do computador)!",
    aEn: "The Keyboard and Mouse (send your input into the computer)!",
    expPt: "Entrada = envia para o computador; Saída = mostra-nos informação (como o monitor ou colunas)!",
    expEn: "Input = feeds the computer; Output = presents info to you (like monitor or speakers)!",
  },
  'Volume e Audição': {
    qPt: "Qual é a regra dos '60-60' recomendada para ouvires música com auscultadores em segurança?",
    qEn: "What is the '60-60' rule recommended for safe headphone listening?",
    aPt: "Não ultrapassar 60% do volume máximo e não ouvir mais de 60 minutos seguidos!",
    aEn: "Keep volume below 60% and listen for no more than 60 minutes continuously!",
    expPt: "Ouvidos saudáveis duram a vida inteira se os protegeres de ruídos excessivos desde já!",
    expEn: "Healthy hearing lasts a lifetime when protected from harsh sound levels early on!",
  },
  'Localização GPS': {
    qPt: "Porque deves desligar a partilha de localização (GPS) nas aplicações que não precisam dela?",
    qEn: "Why should you turn off GPS location sharing in apps that don't need it?",
    aPt: "Para proteger a tua privacidade e evitar que estranhos saibam exatamente onde tu estás!",
    aEn: "To protect your personal safety and prevent strangers from tracking your movements!",
    expPt: "Apenas apps de mapas e transportes precisam de localização; jogos e filtros não necessitam!",
    expEn: "Only navigation apps actually need GPS; simple games and photo filters do not!",
  },
  'Gestores de Senhas': {
    qPt: "O que é um 'Gestor de Palavras-passe' (Password Manager) e qual a sua grande vantagem?",
    qEn: "What is a 'Password Manager' and what is its main superpower?",
    aPt: "É um cofre digital seguro que guarda e cria senhas fortes para ti; só precisas de saber uma!",
    aEn: "It is an encrypted digital vault storing strong passwords so you only memorize one master key!",
    expPt: "Evita que uses a mesma senha em todo o lado ou que as anotes em papéis perdidos!",
    expEn: "It keeps you from reusing fragile passwords or writing them down on scrap paper!",
  },
  'Phishing por Email': {
    qPt: "O que é um ataque de 'Phishing' e porque é que os cibercriminosos o chamam de 'pesca'?",
    qEn: "What is a 'Phishing' scam and why is it compared to fishing?",
    aPt: "Porque lançam 'iscos' falsos (como prémios ou alertas falsos) para pescar senhas e dados!",
    aEn: "Because they cast fake bait (like fake prizes or urgent alarms) to hook passwords!",
    expPt: "Nunca mordas o isco de emails que prometem dinheiro fácil ou pedem dados confidenciais!",
    expEn: "Never take the bait on emails offering free loot or urgently requesting credentials!",
  },
  'Aranhas da Web': {
    qPt: "O que são os 'Web Crawlers' (também conhecidos como aranhas ou robôs da Web)?",
    qEn: "What are 'Web Crawlers' (also known as search spiders or bots)?",
    aPt: "Programas automáticos que exploram e catalogam páginas da Internet para o motor de busca!",
    aEn: "Automated scripts that crawl and index web pages for search engines like Google!",
    expPt: "Graças a estas 'aranhas' digitais, encontras respostas em milissegundos quando fazes uma pesquisa!",
    expEn: "Thanks to these search spiders, you get relevant results in fractions of a second!",
  },
  'Domínio Público': {
    qPt: "O que significa dizer que uma fotografia ou livro está no 'Domínio Público'?",
    qEn: "What does it mean when a picture, book, or music is in the 'Public Domain'?",
    aPt: "Significa que os direitos de autor já expiraram e qualquer pessoa pode usar livremente!",
    aEn: "It means copyright protection has expired and anyone can freely use, remix, and share it!",
    expPt: "Obras clássicas como os contos de Hans Christian Andersen estão em domínio público!",
    expEn: "Classic literary works like Hans Christian Andersen tales belong to the public domain!",
  },
  'História do Rato': {
    qPt: "De que material foi construído o primeiríssimo rato de computador do mundo por Douglas Engelbart em 1964?",
    qEn: "What material was the world's very first computer mouse made from by Douglas Engelbart in 1964?",
    aPt: "Feito de madeira com duas rodas metálicas por baixo!",
    aEn: "Carved from a block of wood with two metal wheels underneath!",
    expPt: "Hoje usamos ratos óticos e sem fios super avançados, mas tudo começou com um bloco de madeira!",
    expEn: "Today we enjoy wireless optical mice, but the journey began with a wooden prototype!",
  },
  'Mochila Escolar': {
    qPt: "Quanto deve pesar, no máximo, a tua mochila da escola para proteger as tuas costas?",
    qEn: "How much should your school backpack weigh at most to protect your back?",
    aPt: "Não mais do que 10% do teu peso corporal (ex: se pesas 35 kg, a mochila deve ter no máximo 3,5 kg)!",
    aEn: "No more than 10% of your body weight (e.g. if you weigh 35 kg, bag max is 3.5 kg)!",
    expPt: "Leva apenas os manuais do dia e ajusta as duas alças bem presas aos ombros!",
    expEn: "Carry only the books you need for the day and adjust both shoulder straps snugly!",
  },
  'Dia da Internet Mais Segura': {
    qPt: "Qual é a grande mensagem do Dia da Internet Mais Segura (Safer Internet Day)?",
    qEn: "What is the core message of Safer Internet Day celebrated worldwide?",
    aPt: "Juntos por uma Internet melhor, mais segura, gentil e cheia de respeito para todos!",
    aEn: "Together for a better, safer, kinder, and respectful internet for all users!",
    expPt: "Cada um de nós tem o poder de tornar a Internet um lugar mais positivo e acolhedor!",
    expEn: "Every single one of us has the power to make the online world welcoming and safe!",
  },
  'Post-its no Monitor': {
    qPt: "Porque é que colar post-its amarelos com as tuas palavras-passe à volta do ecrã é uma péssima ideia?",
    qEn: "Why is sticking sticky notes with passwords around your screen a terrible idea?",
    aPt: "Porque qualquer pessoa que passe perto do teu ecrã consegue ler a senha num segundo!",
    aEn: "Because anyone walking past your desk can read your secret password instantly!",
    expPt: "Mantém as palavras-passe na tua memória ou num gestor de senhas encriptado!",
    expEn: "Keep your passwords in your memory or safely locked inside an encrypted manager!",
  },
  'O Campo Assunto': {
    qPt: "Porque é que o 'Assunto' (Subject) de um email é tão importante nas tuas comunicações escolares?",
    qEn: "Why is the email 'Subject' line so vital in your school communications?",
    aPt: "Porque resume o tema da mensagem em poucas palavras para o destinatário saber logo do que se trata!",
    aEn: "Because it summarizes what the message is about so the recipient recognizes its purpose!",
    expPt: "Um assunto claro como 'Trabalho de TIC - 5.º A - João Silva' ajuda a professora a responder rápido!",
    expEn: "A clear subject line like 'ICT Project - Class 5A - John Doe' helps teachers respond fast!",
  },
  'Histórico e Cookies': {
    qPt: "O que são 'Cookies' da Internet e o que fazem quando visitas páginas Web?",
    qEn: "What are Internet 'Cookies' and what do they do when you browse?",
    aPt: "Pequenos ficheiros de texto guardados no computador que registam preferências e sessões!",
    aEn: "Small text files saved on your computer storing your preferences and active sessions!",
    expPt: "Os cookies guardam o teu idioma ou carrinho de compras, mas deves limpar o histórico periodicamente!",
    expEn: "Cookies remember preferences and shopping carts, but it's wise to clear history regularly!",
  },
  'Música e Sons Livres': {
    qPt: "Onde deves procurar músicas e efeitos sonoros para usar num vídeo ou apresentação escolar?",
    qEn: "Where should you source music and sound effects for school presentations and videos?",
    aPt: "Em bibliotecas de áudio com licenças Creative Commons ou sons sem direitos reservados (Royalty-Free)!",
    aEn: "In audio libraries offering Creative Commons or Royalty-Free licensed tracks!",
    expPt: "Músicas e sons com licenças abertas como Creative Commons enriquecem os teus projetos escolares com respeito pelo autor!",
    expEn: "Audio tracks with open licenses like Creative Commons enrich your school projects while respecting authors!",
  },
  'Robótica e Exploração': {
    qPt: "O que é um 'Sensor' num robô ou sistema automático inteligente?",
    qEn: "What is a 'Sensor' in a robot or smart automated system?",
    aPt: "É o órgão sensorial do robô (como olhos ou tato) que deteta luz, distância ou temperatura!",
    aEn: "It is the robot's sense organ (like eyes or touch) sensing light, distance, or temperature!",
    expPt: "Os sensores recolhem dados do mundo real para o robô poder tomar decisões inteligentes!",
    expEn: "Sensors gather physical world data so the robot's code can make smart navigation choices!",
  },
  'Iluminação do Espaço': {
    qPt: "Como deve ser a iluminação da tua secretária de estudo ao usar o computador?",
    qEn: "How should the lighting be arranged around your computer study desk?",
    aPt: "Boa luz ambiente sem reflexos diretos no ecrã e sem trabalhar no escuro total!",
    aEn: "Good ambient room light without direct glare on the monitor and never in total darkness!",
    expPt: "Trabalhar às escuras força os olhos e provoca dores de cabeça e cansaço visual!",
    expEn: "Working in pitch-black darkness strains eye muscles and causes headaches!",
  },
  'Engenharia Social': {
    qPt: "Em segurança digital, o que é um ataque de 'Engenharia Social'?",
    qEn: "In cybersecurity, what is a 'Social Engineering' trick?",
    aPt: "É tentar enganar as pessoas com simpatia ou mentiras para elas entregarem senhas ou dados!",
    aEn: "It is manipulating people through lies, false urgency, or pretend kindness to steal secrets!",
    expPt: "Os hackers atacam mais a ingenuidade das pessoas do que os computadores; desconfia sempre!",
    expEn: "Scammers target human trust rather than machine firewalls; always stay alert!",
  },
  'Bloqueio de Sessão': {
    qPt: "Qual é o atalho rápido de teclado para bloquear o teu ecrã no Windows antes de te levantares?",
    qEn: "What is the lightning-fast Windows keyboard shortcut to lock your screen before stepping away?",
    aPt: "Tecla Windows + L (bloqueia o computador instantaneamente)!",
    aEn: "Windows Key + L (locks the desktop instantly)!",
    expPt: "Bloquear o ecrã impede que colegas brincalhões mexam no teu trabalho enquanto vais beber água!",
    expEn: "Locking your screen stops pranksters from meddling with your assignments while you're away!",
  },
  'Spam e Cadeias': {
    qPt: "O que deves fazer quando recebes mensagens em cadeia ou 'Spam' a dizer para reencaminhar?",
    qEn: "What should you do when receiving spam or chain emails demanding you forward them?",
    aPt: "Apagar a mensagem imediatamente sem reencaminhar para ninguém!",
    aEn: "Delete the message right away without forwarding it to anyone!",
    expPt: "As correntes de email só servem para encher as caixas de correio de lixo; quebra a corrente!",
    expEn: "Chain letters merely clutter mailboxes with digital junk; break the chain!",
  },
  'Separadores e Janelas': {
    qPt: "O que acontece ao teu computador se tiveres 80 separadores abertos no navegador ao mesmo tempo?",
    qEn: "What happens to your computer when you keep 80 browser tabs open at the same time?",
    aPt: "Gasta imensa memória RAM e o computador pode ficar lento ou bloquear!",
    aEn: "It consumes huge amounts of RAM memory and may cause the browser to freeze!",
    expPt: "Fecha os separadores que já não precisas e guarda os importantes nos Marcadores (Favoritos)!",
    expEn: "Close tabs you're done with and save valuable ones into Bookmarks!",
  },
  'Software Livre vs Proprietário': {
    qPt: "O que é 'Software Livre' ou de 'Código Aberto' (Open Source) como o LibreOffice?",
    qEn: "What is 'Free / Open Source Software' like LibreOffice or Linux?",
    aPt: "Programas cujo código pode ser estudado, modificado e partilhado livremente por todos!",
    aEn: "Programs whose source code can be studied, modified, and freely shared by the community!",
    expPt: "O software livre promove a partilha do conhecimento científico e a colaboração global!",
    expEn: "Free software promotes community collaboration and democratizes digital tools!",
  },
  'Ambiente e Sustentabilidade': {
    qPt: "O que deves fazer com um computador velho, telemóvel ou pilhas gastas?",
    qEn: "What should you do with an old computer, discarded phone, or dead batteries?",
    aPt: "Entregá-los num ponto de recolha do Eletrão ou ecoponto de resíduos elétricos!",
    aEn: "Drop them off at an official E-Waste recycling center (Ponto Eletrão)!",
    expPt: "Os aparelhos eletrónicos contêm metais preciosos e materiais perigosos que devem ser reciclados!",
    expEn: "Electronics contain recyclable precious metals and toxic chemicals that must be treated safely!",
  },
  'Pausas Ativas': {
    qPt: "Porque são essenciais as 'Pausas Ativas' durante uma tarde de estudo no computador?",
    qEn: "Why are 'Active Breaks' essential during an afternoon of computer study?",
    aPt: "Para esticar os músculos, descansar a mente e melhorar a circulação sanguínea!",
    aEn: "To stretch tired muscles, reset mental focus, and boost healthy blood circulation!",
    expPt: "Levanta-te, bebe água e faz alongamentos simples a cada 45 minutos de estudo!",
    expEn: "Stand up, grab a glass of water, and do gentle stretches every 45 minutes!",
  },
  'Direito à Imagem': {
    qPt: "Podes publicar nas tuas redes uma foto divertida que tiraste ao teu colega na sala de aula?",
    qEn: "Can you post a funny picture of your classmate taken in class onto your social accounts?",
    aPt: "Não! Precisas sempre da autorização expressa do colega e dos pais dele antes de publicar!",
    aEn: "No! You always need explicit permission from that classmate and their parents first!",
    expPt: "Respeitar o direito à imagem dos outros é um princípio ético fundamental em TIC!",
    expEn: "Respecting other people's image rights and dignity is a cornerstone of digital ethics!",
  },
  'Biometria': {
    qPt: "O que é o reconhecimento biométrico (impressão digital ou Face ID) num telemóvel?",
    qEn: "What is biometric authentication (fingerprint or Face ID) on modern smartphones?",
    aPt: "É usar uma característica física única do teu corpo para desbloquear o dispositivo!",
    aEn: "It is using a unique physical body trait to unlock and secure the device!",
    expPt: "A tua impressão digital ou rosto são únicos no mundo inteiro, tornando o acesso seguro e rápido!",
    expEn: "Your fingerprint or facial geometry is unique worldwide, providing fast, strong protection!",
  },
  'Responder a Todos': {
    qPt: "Quando deves usar o botão 'Responder a Todos' (Reply to All) num email?",
    qEn: "When should you use the 'Reply to All' button in an email?",
    aPt: "Apenas quando a tua resposta for mesmo relevante para todas as pessoas da lista!",
    aEn: "Only when your reply is genuinely relevant and essential to every recipient on the thread!",
    expPt: "Enviar 'Obrigado' para 100 pessoas faz soar notificações no bolso de toda a gente sem necessidade!",
    expEn: "Sending 'Thanks' to 100 people dings everyone's notifications unnecessarily!",
  },
  'Domínios e Extensões': {
    qPt: "O que indica a terminação '.pt' no endereço de um website como www.seguranet.pt?",
    qEn: "What does the '.pt' extension tell you in a web address like www.seguranet.pt?",
    aPt: "Indica que o domínio pertence ao espaço geográfico e nacional de Portugal!",
    aEn: "It designates that the domain belongs to the national registry of Portugal!",
    expPt: "Extensões como .pt, .gov (governo) ou .edu (educação) ajudam a identificar a origem do site!",
    expEn: "TLDs like .pt, .gov, or .edu help identify the origin and category of web resources!",
  },
  'Citação Direta entre Aspas': {
    qPt: "Quando copias uma frase brilhante de um autor para o teu trabalho de TIC, como deves colocá-la?",
    qEn: "When quoting a brilliant phrase written by an author into your project, how should you format it?",
    aPt: "Entre aspas \"...\", indicando logo a seguir o nome do autor e a fonte de onde foi retirada!",
    aEn: "Enclosed in quotation marks \"...\", immediately naming the author and the original source!",
    expPt: "Citar entre aspas mostra rigor científico e valoriza o teu próprio trabalho escolar!",
    expEn: "Direct quotation shows true academic rigor and adds immense credibility to your writing!",
  },
  'Hardware Interno': {
    qPt: "Qual é o componente do computador que funciona como o seu 'cérebro' a fazer todos os cálculos?",
    qEn: "Which computer component acts as its 'brain' performing all calculations and instructions?",
    aPt: "A CPU (Processador Central de Processamento)!",
    aEn: "The CPU (Central Processing Unit)!",
    expPt: "A CPU executa milhares de milhões de instruções por segundo com precisão cirúrgica!",
    expEn: "The CPU crunches billions of operations per second with microscopic precision!",
  },
  'Curiosidade do Calendário e Código': {
    qPt: "Porque é que o Ano Bissexto (29 de Fevereiro) obrigou os programadores a escrever regras especiais de código?",
    qEn: "Why did Leap Years (February 29) require programmers to write special calendar code?",
    aPt: "Porque a Terra demora 365 dias e quase 6 horas a rodar o Sol, somando 1 dia extra de 4 em 4 anos!",
    aEn: "Because Earth takes 365 days and roughly 6 hours to orbit the Sun, adding a day every 4 years!",
    expPt: "Se os computadores ignorassem o dia 29 de fevereiro, os relógios do mundo ficariam desfasados!",
    expEn: "Without leap year logic, digital clocks and calendars would drift out of sync over time!",
  },
  'Cuidado com os Olhos': {
    qPt: "Qual é o truque de pestanejar com frequência enquanto estás a ler no ecrã do computador?",
    qEn: "Why should you make a conscious effort to blink frequently while reading on a screen?",
    aPt: "Para manter os olhos hidratados e evitar que fiquem secos, vermelhos e irritados!",
    aEn: "To keep the eye surface naturally moisturized and prevent burning, dry-eye irritation!",
    expPt: "Quando olhamos para ecrãs pestanejamos metade das vezes; lembra-te de piscar!",
    expEn: "We blink 50% less often when gazing at screens; blinking restores natural tears!",
  },
  'Dia Mundial do Backup': {
    qPt: "O que é fazer uma 'Cópia de Segurança' (Backup) dos teus ficheiros escolares importantes?",
    qEn: "What is doing a 'Backup' of your important school documents and photos?",
    aPt: "Guardar uma segunda cópia noutro sítio seguro (como numa pen drive ou na nuvem)! ",
    aEn: "Saving a duplicate copy in another secure location (like a flash drive or cloud storage)!",
    expPt: "Se o computador avariar ou cair água no teclado, o teu trabalho continua são e salvo no backup!",
    expEn: "If your device breaks or gets soaked, your files remain safe and sound in the backup!",
  },
  'Câmaras e Microfones': {
    qPt: "Porque deves verificar as permissões das aplicações que pedem acesso à tua câmara e microfone?",
    qEn: "Why should you check app permissions when they ask for camera and microphone access?",
    aPt: "Para garantir que apenas programas em que confias têm autorização para te ouvir ou ver!",
    aEn: "To ensure that only trusted programs have permission to access your audio and video!",
    expPt: "Um simples jogo de tabuleiro não precisa de ligar o teu microfone; rejeita permissões desnecessárias!",
    expEn: "A puzzle game has no need for your microphone; decline unnecessary permission prompts!",
  },
  'Dia Mundial do Livro e Direitos de Autor': {
    qPt: "O que celebramos no Dia Mundial do Livro e dos Direitos de Autor a 23 de Abril?",
    qEn: "What is celebrated on World Book and Copyright Day on April 23?",
    aPt: "A criatividade dos autores, a paixão pela leitura e a proteção legal das obras artísticas!",
    aEn: "The creativity of authors, the passion for reading, and legal protection of artistic works!",
    expPt: "Os criadores merecem reconhecimento pelo esforço e imaginação que colocam nos livros e obras!",
    expEn: "Creators deserve appreciation and protection for the imagination and effort they invest!",
  },
  'Dia Mundial da Senha': {
    qPt: "Qual é o desafio lançado a toda a gente no Dia Mundial da Senha (World Password Day)?",
    qEn: "What challenge is presented to all netizens on World Password Day?",
    aPt: "Rever as senhas antigas, torná-las mais longas e ativar a autenticação de 2 fatores!",
    aEn: "Audit old passwords, make them longer, and turn on two-factor authentication!",
    expPt: "Trocar senhas fracas por frases-passe protege a tua identidade e os teus jogos favoritos!",
    expEn: "Upgrading weak passwords to sturdy pass-phrases protects your identity and game saves!",
  },
  'Sociedade da Informação': {
    qPt: "O que caracteriza a 'Sociedade da Informação' em que vivemos hoje?",
    qEn: "What defines the 'Information Society' we live in today?",
    aPt: "A facilidade de comunicar, aprender e aceder a conhecimento global instantaneamente através das TIC!",
    aEn: "The ability to communicate, discover, and access global knowledge instantaneously via ICT!",
    expPt: "As TIC transformaram a medicina, a escola, os transportes e a forma como nos ligamos aos outros!",
    expEn: "ICT has revolutionized medicine, schools, sciences, and how humans connect across borders!",
  },
  'Pioneiros da Computação': {
    qPt: "Quem foi Ada Lovelace, considerada a primeiríssima programadora de computadores da História?",
    qEn: "Who was Ada Lovelace, celebrated as the world's very first computer programmer?",
    aPt: "Uma matemática genial que escreveu o primeiro algoritmo para a Máquina Analítica no século XIX!",
    aEn: "A brilliant mathematician who authored the first algorithm for the Analytical Engine in the 1800s!",
    expPt: "Ada Lovelace previu que os computadores poderiam criar música e gráficos mais de 100 anos antes!",
    expEn: "Ada envisioned that computers could create music and graphics over a century before it happened!",
  },
  'Exploração Espacial e TIC': {
    qPt: "Como ajudam as Tecnologias de Informação e Comunicação na exploração do Espaço e de Marte?",
    qEn: "How does Information Technology assist space missions and Mars exploration?",
    aPt: "Controlam os robôs sondas (como o Perseverance), calculam órbitas e transmitem fotos espaciais!",
    aEn: "They steer rover robots (like Perseverance), calculate trajectories, and beam back cosmic photos!",
    expPt: "Sem computadores e telecomunicações avançadas, nenhuma missão espacial conseguiria navegar!",
    expEn: "Without advanced computing and telecom telemetry, no spacecraft could navigate space!",
  },
  'História da Web': {
    qPt: "Quem foi Tim Berners-Lee e o que inventou ele no laboratório CERN em 1989?",
    qEn: "Who was Tim Berners-Lee and what did he invent at CERN in 1989?",
    aPt: "O criador da World Wide Web (WWW) que permitiu navegar em páginas com hiperligações!",
    aEn: "The creator of the World Wide Web (WWW) enabling browsing web pages via hyperlinks!",
    expPt: "E o mais generoso: ofereceu a invenção da Web ao mundo de forma gratuita para que todos a pudessem usar!",
    expEn: "And most generously: he gifted the World Wide Web free to humanity so everyone could participate!",
  },
  'História do Software': {
    qPt: "De onde vem a palavra informática 'Bug' (erro no programa de computador)?",
    qEn: "Where does the computing term 'Bug' (software glitch) famously originate from?",
    aPt: "De uma traça real (inseto) que ficou presa nos circuitos do computador Mark II em 1947!",
    aEn: "From an actual moth (insect) trapped inside the relays of the Mark II computer in 1947!",
    expPt: "A cientista Grace Hopper retirou o inseto e colou-o no caderno de notas como o primeiro 'bug'!",
    expEn: "Scientist Grace Hopper taped the bug into the logbook as the first actual debugging case!",
  },
  'Dia dos Programadores': {
    qPt: "Porque é que o Dia dos Programadores é comemorado no 256.º dia de cada ano?",
    qEn: "Why is Programmer's Day celebrated precisely on the 256th day of each year?",
    aPt: "Porque 256 é o número total de valores distintos que podem ser representados num Byte de 8 bits (2⁸)!",
    aEn: "Because 256 is the distinct number of values represented by an 8-bit Byte (2 to the power of 8)!",
    expPt: "É o número mais adorado pelos informáticos e cabe perfeitamente na base binária!",
    expEn: "It is the most beloved number among computer scientists and fits binary powers perfectly!",
  },
  'Mulheres nas TIC': {
    qPt: "Qual foi a contribuição fundamental de cientistas pioneiras como Margaret Hamilton na informática?",
    qEn: "What was the fundamental contribution of computing pioneers like Margaret Hamilton?",
    aPt: "Programaram o software de navegação da missão Apollo 11 que permitiu a chegada do Homem à Lua!",
    aEn: "They programmed the Apollo 11 guidance software that guided humans safely onto the Moon!",
    expPt: "As mulheres estiveram na vanguarda da criação da programação moderna desde os primeiros passos!",
    expEn: "Women were at the very cutting edge of modern software engineering from its inception!",
  },
  'Nascimento da Internet': {
    qPt: "Como se chamava a rede pioneira criada em 1969 que deu origem à Internet que usamos hoje?",
    qEn: "What was the pioneer network established in 1969 that gave birth to today's Internet?",
    aPt: "ARPANET (rede experimental que ligou as primeiras quatro universidades nos EUA)!",
    aEn: "ARPANET (experimental network connecting the first four universities in the USA)!",
    expPt: "A primeira mensagem enviada foi a palavra 'LO' antes do sistema ir temporariamente abaixo!",
    expEn: "The first message ever transmitted was 'LO' before the terminal temporarily froze!",
  },
  'Segurança da Informação': {
    qPt: "Quais são os três pilares fundamentais da Segurança da Informação (a chamada tríade CID)?",
    qEn: "What are the three pillars of Information Security (the CIA triad)?",
    aPt: "Confidencialidade, Integridade e Disponibilidade dos dados!",
    aEn: "Confidentiality, Integrity, and Availability of data!",
    expPt: "Significa que a tua informação só é vista por quem deve, está correta e pronta a usar!",
    expEn: "It ensures your data is only seen by authorized eyes, is unaltered, and readily accessible!",
  },
  'Invenções Geniais': {
    qPt: "Quem foi o cientista britânico Alan Turing e porque é considerado o pai da Ciência da Computação?",
    qEn: "Who was British scientist Alan Turing and why is he called the father of Computer Science?",
    aPt: "Criou o modelo teórico dos computadores modernos e decifrou códigos secretos na Segunda Guerra Mundial!",
    aEn: "He created the theoretical computer model and broke secret codes during World War II!",
    expPt: "O teste de Turing avalia se uma inteligência artificial consegue conversar como um ser humano!",
    expEn: "The famous Turing Test evaluates whether an AI can converse indistinguishably from a human!",
  },
  'Cidadania Digital': {
    qPt: "O que significa ser um verdadeiro e exemplar 'Cidadão Digital' no 5.º ano?",
    qEn: "What does being a stellar 'Digital Citizen' in 5th grade mean?",
    aPt: "Usar a tecnologia de forma crítica, segura, responsável, respeitando os direitos e sentimentos de todos!",
    aEn: "Using tech critically, securely, responsibly, and with profound respect for everyone online!",
    expPt: "O mundo digital torna-se melhor quando tratas os outros com a mesma simpatia da vida real!",
    expEn: "The digital world flourishes when we treat others online with real-world kindness and care!",
  },
  'Passagem de Ano e Computação': {
    qPt: "O que foi o famoso 'Bug do Milénio' (Y2K) que assustou o mundo no final de 1999?",
    qEn: "What was the famous 'Millennium Bug' (Y2K) that worried computer scientists in late 1999?",
    aPt: "O medo de que computadores antigos confundissem o ano 2000 com o ano 1900 por usarem só 2 dígitos!",
    aEn: "The concern that older software storing years with 2 digits would confuse 2000 with 1900!",
    expPt: "Graças ao trabalho árduo de milhares de programadores no mundo todo, a transição correu sem falhas!",
    expEn: "Thanks to diligent engineering teams worldwide, clocks rolled into the new century smoothly!",
  },
};

function generateHumorousTip(tip: DailyTicTip, index: number): DailyTicTip {
  const cleanedTitlePt = cleanTitle(tip.title.pt);
  const cleanedTitleEn = cleanTitle(tip.title.en);

  const themeId = tip.themeId;
  const humorPool = THEME_HUMOR_DISTRACTORS[themeId] || THEME_HUMOR_DISTRACTORS['tic-sociedade'];

  const categoryName = tip.category.pt;
  const qaDef = CATEGORY_QA[categoryName];

  let questionPt = '';
  let questionEn = '';
  let correctPt = '';
  let correctEn = '';
  let explanationPt = '';
  let explanationEn = '';

  if (qaDef) {
    questionPt = qaDef.qPt;
    questionEn = qaDef.qEn;
    correctPt = qaDef.aPt;
    correctEn = qaDef.aEn;
    explanationPt = qaDef.expPt || "Aprender as regras de TIC ajuda-te a usar a tecnologia com sucesso e segurança!";
    explanationEn = qaDef.expEn || "Learning ICT guidelines helps you use digital tools successfully and safely!";
  } else {
    // Highly tailored fallback
    questionPt = `Na dica de hoje sobre "${cleanedTitlePt}", qual é a melhor atitude ou regra de TIC?`;
    questionEn = `In today's tip about "${cleanedTitleEn}", what is the recommended ICT practice?`;
    
    const descPt = tip.description.pt;
    const descEn = tip.description.en;

    const firstSentencePt = descPt.split(/[.!?]/)[0].trim();
    correctPt = firstSentencePt.length > 20 && firstSentencePt.length < 130 
      ? firstSentencePt + '!' 
      : descPt.slice(0, 110).trim() + '!';

    const firstSentenceEn = descEn.split(/[.!?]/)[0].trim();
    correctEn = firstSentenceEn.length > 20 && firstSentenceEn.length < 130 
      ? firstSentenceEn + '!' 
      : descEn.slice(0, 110).trim() + '!';

    explanationPt = "Excelente! Esta regra faz parte das boas práticas e competências digitais do 5.º ano!";
    explanationEn = "Well done! This rule is part of essential 5th-grade digital skills!";
  }

  // Pick 3 humorous distractors from the theme humor pool
  const poolCopy = [...humorPool];
  const chosenDistractors: { pt: string; en: string }[] = [];
  for (let i = 0; i < 3; i++) {
    const distractorIndex = (index * 3 + i * 2) % poolCopy.length;
    chosenDistractors.push(poolCopy[distractorIndex]);
    poolCopy.splice(distractorIndex, 1);
  }

  // Correct option letter: balanced across a, b, c, d
  const correctLetters = ['a', 'b', 'c', 'd'];
  const correctLetter = correctLetters[index % 4];

  // Assemble the 4 options
  const options: DailyTipOption[] = [];
  let distractorPointer = 0;

  for (const letter of correctLetters) {
    if (letter === correctLetter) {
      options.push({
        id: letter,
        pt: correctPt,
        en: correctEn,
      });
    } else {
      const d = chosenDistractors[distractorPointer++] || humorPool[0];
      options.push({
        id: letter,
        pt: d.pt,
        en: d.en,
      });
    }
  }

  return {
    ...tip,
    title: {
      pt: cleanedTitlePt,
      en: cleanedTitleEn,
    },
    question: {
      pt: questionPt,
      en: questionEn,
    },
    options,
    correctOptionId: correctLetter,
    explanation: {
      pt: explanationPt,
      en: explanationEn,
    },
  };
}

export function runEnhancement() {
  console.log(`Enhancing all ${ALL_366_DAILY_TIPS.length} daily tips with category-level tailored humor, child-friendly questions, and complete options...`);
  
  const enhancedTips = ALL_366_DAILY_TIPS.map((tip, idx) => generateHumorousTip(tip, idx));

  // Sanity checks
  let truncatedCount = 0;
  let genericCount = 0;
  for (const t of enhancedTips) {
    if (t.question.pt.startsWith('Na dica de hoje')) genericCount++;
    for (const opt of t.options) {
      if (opt.pt.endsWith('...')) truncatedCount++;
    }
  }
  console.log(`Enhancement complete!`);
  console.log(`- Truncated options remaining: ${truncatedCount} (target: 0)`);
  console.log(`- Fallback questions: ${genericCount} out of ${enhancedTips.length}`);

  // Write file
  const outPath = path.resolve(process.cwd(), 'src/data/dailyTipsData.ts');
  
  const fileContent = `/**
 * 366 DAILY TIC TIPS & QUESTIONS (ONE FOR EVERY DAY OF THE YEAR)
 * Designed for 5th Grade Information and Communication Technologies (TIC).
 * Matches all 366 days (including Feb 29 for leap years).
 * Language is simple, engaging, creative, and humorous for 10-year-olds.
 */

export interface DailyTipOption {
  id: string; // 'a' | 'b' | 'c' | 'd'
  pt: string;
  en: string;
}

export interface DailyTicTip {
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
  teaser?: {
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
  question: {
    pt: string;
    en: string;
  };
  options: DailyTipOption[];
  correctOptionId: string; // 'a' | 'b' | 'c' | 'd'
  explanation: {
    pt: string;
    en: string;
  };
  isSpecialMilestone?: boolean;
}

export const ALL_366_DAILY_TIPS: DailyTicTip[] = ${JSON.stringify(enhancedTips, null, 2)};

export const TOTAL_366_TIPS_COUNT = ALL_366_DAILY_TIPS.length;

/**
 * Returns the exact Daily Tip for today's calendar date (Month & Day).
 */
export function getTodayDailyTip(date: Date = new Date()): DailyTicTip {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const match = ALL_366_DAILY_TIPS.find((t) => t.month === month && t.day === day);
  if (match) return match;

  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.max(1, Math.min(366, Math.floor(diff / oneDay)));

  return ALL_366_DAILY_TIPS[dayOfYear - 1] || ALL_366_DAILY_TIPS[0];
}

/**
 * Get tip by day of year (1 to 366)
 */
export function getDailyTipByDayOfYear(dayOfYear: number): DailyTicTip {
  const normalized = Math.max(1, Math.min(366, dayOfYear));
  return ALL_366_DAILY_TIPS[normalized - 1] || ALL_366_DAILY_TIPS[0];
}

/**
 * Get today's formatted string YYYY-MM-DD
 */
export function getTodayDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return \`\${y}-\${m}-\${d}\`;
}
`;

  fs.writeFileSync(outPath, fileContent, 'utf-8');
  console.log(`Saved enhanced tips to ${outPath}`);
}

runEnhancement();
