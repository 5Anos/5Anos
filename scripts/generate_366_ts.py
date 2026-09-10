import json
import re

months_meta = [
    ("Janeiro", "January", 31, 1, "hardware-software", 1, "Hardware e Software", "Hardware and Software", "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300", "Fundamentos de TIC", "ICT Fundamentals", "Monitor"),
    ("Fevereiro", "February", 29, 2, "ergonomia", 2, "Ergonomia e Saúde Digital", "Ergonomics & Digital Health", "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", "Ergonomia e Postura", "Ergonomics & Posture", "Heart"),
    ("Março", "March", 31, 3, "palavras-passe", 3, "Palavras-passe e Autenticação", "Passwords & Authentication", "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300", "Segurança de Acessos", "Access Security", "KeyRound"),
    ("Abril", "April", 30, 4, "seguranca", 4, "Segurança e Privacidade Online", "Online Safety & Privacy", "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300", "Proteção Digital", "Digital Protection", "ShieldCheck"),
    ("Maio", "May", 31, 5, "correio-eletronico", 5, "Correio Eletrónico e Comunicação", "Email & Communication", "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300", "Comunicação Digital", "Digital Communication", "Mail"),
    ("Junho", "June", 30, 6, "navegar-internet", 6, "Navegar na Internet e Pesquisa", "Web Browsing & Research", "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300", "Pesquisa na Web", "Web Search", "Globe"),
    ("Julho", "July", 31, 7, "direitos-autor", 7, "Direitos de Autor e Licenciamento", "Copyright & Licensing", "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300", "Ética e Licenciamento", "Ethics & Licensing", "Copyright"),
    ("Agosto", "August", 31, 8, "ficheiros-nuvem", 8, "Ficheiros, Organização e Nuvem", "Files, Organization & Cloud", "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300", "Gestão de Ficheiros", "File Management", "Folder"),
    ("Setembro", "September", 30, 9, "cidadania-digital", 9, "Cidadania Digital e Netiqueta", "Digital Citizenship & Netiquette", "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300", "Cidadania Digital", "Digital Citizenship", "Users"),
    ("Outubro", "October", 31, 10, "redes-internet", 10, "Redes e Funcionamento da Internet", "Networks & Internet Mechanics", "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300", "Redes e Ligação", "Networks & Connectivity", "Wifi"),
    ("Novembro", "November", 30, 11, "programacao-logica", 11, "Algoritmos e Pensamento Computacional", "Algorithms & Computational Thinking", "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300", "Lógica e Algoritmos", "Logic & Algorithms", "Cpu"),
    ("Dezembro", "December", 31, 12, "ia-futuro", 12, "Inteligência Artificial e Tecnologias", "Artificial Intelligence & Tech", "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300", "Tecnologia e Futuro", "Technology & Future", "Sparkles")
]

print("Ready to construct month topics.")
