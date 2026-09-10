import json
import os

# Define the 12 themes for the 12 months
months_config = [
    {
        "month": 1, "name_pt": "Janeiro", "name_en": "January", "days": 31,
        "theme_id": "hardware-software", "theme_num": 1,
        "theme_title_pt": "Hardware e Software", "theme_title_en": "Hardware and Software",
        "badge": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
        "cat_pt": "Fundamentos de TIC", "cat_en": "ICT Fundamentals", "icon": "Monitor"
    },
    {
        "month": 2, "name_pt": "Fevereiro", "name_en": "February", "days": 29,
        "theme_id": "ergonomia", "theme_num": 2,
        "theme_title_pt": "Ergonomia e Saúde Digital", "theme_title_en": "Ergonomics & Digital Health",
        "badge": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
        "cat_pt": "Ergonomia e Postura", "cat_en": "Ergonomics & Posture", "icon": "Heart"
    },
    {
        "month": 3, "name_pt": "Março", "name_en": "March", "days": 31,
        "theme_id": "palavras-passe", "theme_num": 3,
        "theme_title_pt": "Palavras-passe e Autenticação", "theme_title_en": "Passwords & Authentication",
        "badge": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
        "cat_pt": "Segurança de Acessos", "cat_en": "Access Security", "icon": "KeyRound"
    },
    {
        "month": 4, "name_pt": "Abril", "name_en": "April", "days": 30,
        "theme_id": "seguranca", "theme_num": 4,
        "theme_title_pt": "Segurança e Privacidade Online", "theme_title_en": "Online Safety & Privacy",
        "badge": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
        "cat_pt": "Proteção Digital", "cat_en": "Digital Protection", "icon": "ShieldCheck"
    },
    {
        "month": 5, "name_pt": "Maio", "name_en": "May", "days": 31,
        "theme_id": "correio-eletronico", "theme_num": 5,
        "theme_title_pt": "Correio Eletrónico e Comunicação", "theme_title_en": "Email & Communication",
        "badge": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
        "cat_pt": "Comunicação Digital", "cat_en": "Digital Communication", "icon": "Mail"
    },
    {
        "month": 6, "name_pt": "Junho", "name_en": "June", "days": 30,
        "theme_id": "navegar-internet", "theme_num": 6,
        "theme_title_pt": "Navegar na Internet e Pesquisa", "theme_title_en": "Web Browsing & Research",
        "badge": "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
        "cat_pt": "Pesquisa na Web", "cat_en": "Web Search", "icon": "Globe"
    },
    {
        "month": 7, "name_pt": "Julho", "name_en": "July", "days": 31,
        "theme_id": "direitos-autor", "theme_num": 7,
        "theme_title_pt": "Direitos de Autor e Licenciamento", "theme_title_en": "Copyright & Licensing",
        "badge": "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
        "cat_pt": "Ética e Licenciamento", "cat_en": "Ethics & Licensing", "icon": "Copyright"
    },
    {
        "month": 8, "name_pt": "Agosto", "name_en": "August", "days": 31,
        "theme_id": "ficheiros-nuvem", "theme_num": 8,
        "theme_title_pt": "Ficheiros, Organização e Nuvem", "theme_title_en": "Files, Organization & Cloud",
        "badge": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
        "cat_pt": "Gestão de Ficheiros", "cat_en": "File Management", "icon": "Folder"
    },
    {
        "month": 9, "name_pt": "Setembro", "name_en": "September", "days": 30,
        "theme_id": "cidadania-digital", "theme_num": 9,
        "theme_title_pt": "Cidadania Digital e Netiqueta", "theme_title_en": "Digital Citizenship & Netiquette",
        "badge": "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
        "cat_pt": "Cidadania Digital", "cat_en": "Digital Citizenship", "icon": "Users"
    },
    {
        "month": 10, "name_pt": "Outubro", "name_en": "October", "days": 31,
        "theme_id": "redes-internet", "theme_num": 10,
        "theme_title_pt": "Redes e Funcionamento da Internet", "theme_title_en": "Networks & Internet Mechanics",
        "badge": "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
        "cat_pt": "Redes e Ligação", "cat_en": "Networks & Connectivity", "icon": "Wifi"
    },
    {
        "month": 11, "name_pt": "Novembro", "name_en": "November", "days": 30,
        "theme_id": "programacao-logica", "theme_num": 11,
        "theme_title_pt": "Algoritmos e Pensamento Computacional", "theme_title_en": "Algorithms & Computational Thinking",
        "badge": "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
        "cat_pt": "Lógica e Algoritmos", "cat_en": "Logic & Algorithms", "icon": "Cpu"
    },
    {
        "month": 12, "name_pt": "Dezembro", "name_en": "December", "days": 31,
        "theme_id": "ia-futuro", "theme_num": 12,
        "theme_title_pt": "Inteligência Artificial e Tecnologias", "theme_title_en": "Artificial Intelligence & Tech",
        "badge": "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
        "cat_pt": "Tecnologia e Futuro", "cat_en": "Technology & Future", "icon": "Sparkles"
    }
]

print("Python config initialized successfully.")
