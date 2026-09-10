import json

months_data = [
    # Month 1: Jan (31 days) - Hardware e Software
    {
        "m_idx": 1, "m_pt": "Janeiro", "m_en": "January", "days": 31,
        "theme_id": "hardware-software", "theme_num": 1, "theme_pt": "Hardware e Software", "theme_en": "Hardware and Software",
        "badge": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300", "cat_pt": "Fundamentos de TIC", "cat_en": "ICT Fundamentals", "icon": "Monitor",
        "topics": [
            ("O Computador e as Suas Partes", "Entender como o computador combina componentes físicos e programas.", 
             "O computador é um sistema formado por partes físicas (hardware) e instruções virtuais (software) que trabalham juntas.", 
             "Sem hardware o computador não existe, e sem software o computador não sabe o que fazer!", 
             "A palavra 'computer' significava originalmente uma pessoa que fazia cálculos matemáticos à mão!",
             "O que distingue o hardware do software num computador?",
             "O hardware é a parte física tangível e o software são os programas e instruções.",
             "O hardware e o software são exatamente a mesma coisa.",
             "O hardware só funciona sem eletricidade.",
             "O software é a caixa de plástico exterior do monitor.",
             "O hardware refere-se a todos os componentes físicos (como o ecrã, teclado e circuitos) e o software aos programas que dão ordens ao sistema.",
             "Identifica no teu computador atual três exemplos de hardware e duas aplicações instaladas."),
            
            ("CPU: O Cérebro do Computador", "A Unidade Central de Processamento que executa todas as instruções.",
             "O processador (CPU) interpreta e executa as ordens de todos os programas instalados no sistema.",
             "Sem o processador, nenhum programa consegue funcionar no computador.",
             "A velocidade de funcionamento de um processador pode ser indicada em GHz. O número de operações que consegue realizar depende de vários fatores.",
             "Qual é a principal função da CPU (Processador) num computador?",
             "Interpretar e executar as instruções dos programas e do sistema operativo.",
             "Guardar fotografias mesmo quando o computador está desligado.",
             "Imprimir documentos em papel de forma colorida.",
             "Proporcionar som de alta qualidade nas colunas externas.",
             "A CPU é responsável por processar os dados e executar os comandos de todas as aplicações em funcionamento.",
             "Abre o gestor do teu sistema operativo para ver o nome e modelo do processador do teu equipamento."),

            ("Memória RAM: A Secretária de Trabalho", "A memória temporária de acesso rápido do computador.",
             "A memória RAM guarda as informações e programas que estás a utilizar exatamente no momento em que trabalhas.",
             "Quando o computador é desligado, o conteúdo da memória RAM é totalmente apagado.",
             "Quanto mais memória RAM tiveres, mais programas podes ter abertos ao mesmo tempo com fluidez.",
             "O que acontece à informação guardada na memória RAM quando desligas o computador?",
             "É completamente apagada porque a RAM é uma memória temporária.",
             "Fica gravada para sempre e nunca mais se pode apagar.",
             "É enviada automaticamente por correio postal para a escola.",
             "Transforma-se em ficheiros de vídeo de alta definição.",
             "A memória RAM é volátil, o que significa que necessita de eletricidade constante para manter os dados em curso.",
             "Verifica quanta memória RAM tem o computador ou tablet que estás a utilizar hoje.")
        ]
    }
]

print("Base setup ready.")
