<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRADEMARK.COM.UA | IP Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0D1B2A;
            --secondary: #1B3A4B;
            --accent: #C9A227;
            --stone: #E5E5E5;
        }

        body {
            font-family: 'Source Sans 3', sans-serif;
            background-color: #FAFAFA;
            color: var(--primary);
            overflow-x: hidden;
        }

        h1, h2, h3, .serif {
            font-family: 'DM Serif Display', serif;
        }

        .mono {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            letter-spacing: -0.02em;
        }

        /* Tectonic Layout - Heavy Slabs */
        .tectonic-slab {
            background: white;
            border: 1px solid var(--primary);
            box-shadow: 8px 8px 0px 0px var(--primary);
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .tectonic-slab:hover {
            transform: translate(-2px, -2px);
            box-shadow: 12px 12px 0px 0px var(--accent);
        }

        /* Pillar Masonry Grid */
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 2rem;
            align-items: start;
        }

        .pillar {
            border-left: 4px solid var(--primary);
            padding-left: 1.5rem;
            position: relative;
        }

        .pillar::before {
            content: '';
            position: absolute;
            top: 0;
            left: -4px;
            width: 4px;
            height: 40px;
            background: var(--accent);
        }

        /* Subtle Motion */
        .reveal {
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Custom Search Component */
        .search-input-group {
            display: flex;
            background: white;
            border: 3px solid var(--primary);
            padding: 0.5rem;
            box-shadow: 15px 15px 0px 0px rgba(13, 27, 42, 0.05);
        }

        .search-input-group input {
            flex: 1;
            padding: 1.5rem;
            font-size: 1.5rem;
            outline: none;
            border: none;
        }

        .search-btn {
            background: var(--primary);
            color: white;
            padding: 0 3rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transition: background 0.2s;
        }

        .search-btn:hover {
            background: var(--accent);
        }

        .status-badge {
            padding: 2px 8px;
            text-transform: uppercase;
            font-size: 0.7rem;
            font-weight: 800;
            border: 1px solid currentColor;
        }

        /* Decorative Grid Background */
        .bg-grid {
            background-image: radial-gradient(var(--primary) 1px, transparent 0);
            background-size: 40px 40px;
            opacity: 0.03;
            position: fixed;
            inset: 0;
            z-index: -1;
        }
    </style>
</head>
<body>
    <div class="bg-grid"></div>

    <!-- Navigation -->
    <nav class="flex justify-between items-center p-8 max-w-[1400px] mx-auto relative z-10">
        <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold tracking-tighter uppercase serif">Trademark<span class="text-[#C9A227]">.</span>ua</span>
        </div>
        <div class="hidden md:flex gap-12 font-semibold uppercase text-xs tracking-widest">
            <a href="#" class="hover:text-[#C9A227] transition-colors">Послуги</a>
            <a href="#" class="hover:text-[#C9A227] transition-colors">Пошук</a>
            <a href="#" class="hover:text-[#C9A227] transition-colors">Ціни</a>
            <a href="#" class="hover:text-[#C9A227] transition-colors">Контакти</a>
        </div>
        <div class="flex items-center gap-6">
            <span class="mono text-xs opacity-50">UA | EN</span>
            <button class="bg-primary px-6 py-3 text-white text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all" style="background: var(--primary)">
                Консультація
            </button>
        </div>
    </nav>

    <main class="max-w-[1400px] mx-auto px-8 py-12">
        
        <!-- Hero Section: The Tectonic Foundation -->
        <header class="mb-32 reveal">
            <div class="max-w-4xl mb-16">
                <h1 class="text-7xl md:text-8xl leading-[0.9] mb-8">
                    Захистіть свій <br/> інтелектуальний <span class="text-accent italic">капітал.</span>
                </h1>
                <p class="text-xl text-secondary max-w-xl border-l-4 border-accent pl-6 py-2">
                    Професійна реєстрація торгових марок та патентів через пряму інтеграцію з реєстрами TMview, WIPO та NIPO.
                </p>
            </div>

            <!-- Search Slab -->
            <div class="search-input-group reveal" style="animation-delay: 0.2s">
                <input type="text" placeholder="Введіть назву вашої марки..." class="serif">
                <button class="search-btn">Перевірити</button>
            </div>
            <div class="flex gap-8 mt-6 mono text-[10px] uppercase opacity-60">
                <span class="flex items-center gap-2">● LIVE DATA CONNECTED</span>
                <span class="flex items-center gap-2">● 136M+ RECORDS</span>
                <span class="flex items-center gap-2">● UA NIPO SYNCED 2025</span>
            </div>
        </header>

        <!-- Results / Masonry Section -->
        <section class="mb-32">
            <div class="flex justify-between items-end mb-12 border-b-2 border-primary pb-4">
                <h2 class="text-4xl">Активні реєстри</h2>
                <div class="mono text-sm uppercase font-bold text-accent underline cursor-pointer">Переглянути всі бази</div>
            </div>

            <div class="masonry-grid">
                <!-- Pillar Card 1: UA Register -->
                <div class="col-span-12 md:col-span-4 tectonic-slab p-8 reveal" style="animation-delay: 0.3s">
                    <div class="flex justify-between mb-8">
                        <span class="mono text-xs text-secondary opacity-50">SOURCE_ID: UA_NIPO</span>
                        <div class="status-badge text-emerald-600">Active</div>
                    </div>
                    <h3 class="text-3xl mb-4">Національний реєстр</h3>
                    <p class="text-sm text-gray-600 mb-8 leading-relaxed">
                        Повна синхронізація з базою СІС (ДП "УКРНОІВІ"). Охоплює всі діючі свідоцтва та заявки на території України.
                    </p>
                    <div class="pt-6 border-t border-stone flex justify-between items-center">
                        <span class="mono font-bold text-lg italic">₴6,500<span class="text-[10px] not-italic opacity-50">/12М</span></span>
                        <div class="w-10 h-10 border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">→</div>
                    </div>
                </div>

                <!-- Pillar Card 2: International -->
                <div class="col-span-12 md:col-span-4 tectonic-slab p-8 bg-primary text-white reveal" style="animation-delay: 0.4s; background: var(--primary)">
                    <div class="flex justify-between mb-8">
                        <span class="mono text-xs text-accent">SOURCE_ID: WIPO_GBD</span>
                        <div class="status-badge text-accent">Global</div>
                    </div>
                    <h3 class="text-3xl mb-4 text-white">Мадридська система</h3>
                    <p class="text-sm text-blue-200/60 mb-8 leading-relaxed">
                        Міжнародна реєстрація у 130+ країнах світу через єдину заявку. Оптимізовано для експортерів та IT брендів.
                    </p>
                    <div class="pt-6 border-t border-secondary flex justify-between items-center">
                        <span class="mono font-bold text-lg text-accent">WIPO CONNECT</span>
                        <div class="w-10 h-10 border border-accent flex items-center justify-center hover:bg-accent hover:text-primary transition-all cursor-pointer">→</div>
                    </div>
                </div>

                <!-- Pillar Card 3: EU Intellectual Property -->
                <div class="col-span-12 md:col-span-4 tectonic-slab p-8 reveal" style="animation-delay: 0.5s">
                    <div class="flex justify-between mb-8">
                        <span class="mono text-xs text-secondary opacity-50">SOURCE_ID: EUIPO_TMVIEW</span>
                        <div class="status-badge text-blue-600">Europe</div>
                    </div>
                    <h3 class="text-3xl mb-4 text-primary">Реєстр Євросоюзу</h3>
                    <p class="text-sm text-gray-600 mb-8 leading-relaxed">
                        Доступ до бази TMview: 136 мільйонів запитів. Захист бренду в усіх 27 країнах ЄС одночасно.
                    </p>
                    <div class="pt-6 border-t border-stone flex justify-between items-center">
                        <span class="mono font-bold text-lg">€850<span class="text-[10px] opacity-50">/REG</span></span>
                        <div class="w-10 h-10 border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">→</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Pillar Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
            <div class="pillar">
                <span class="mono text-accent text-xs font-bold tracking-[0.3em] block mb-4">01 / ПЕРЕВІРКА</span>
                <h2 class="text-5xl mb-6">Пошук на тотожність та схожість</h2>
                <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                    Наш AI-алгоритм аналізує не лише прямі співпадіння, а й фонетичну схожість та ризики змішування (Confusion Likelihood), що критично для успішної реєстрації.
                </p>
                <ul class="space-y-4 mono text-xs uppercase font-bold text-secondary">
                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-accent"></span> Перевірка по 45 класам МКТУ</li>
                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-accent"></span> Виявлення прихованих ризиків</li>
                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-accent"></span> Офіційний звіт патентного повіреного</li>
                </ul>
            </div>
            <div class="relative">
                <div class="tectonic-slab p-12 relative z-10">
                    <div class="flex flex-col gap-6">
                        <div class="flex items-center justify-between border-b pb-4 border-stone">
                            <span class="mono text-xs">АНАЛІЗ РИЗИКІВ</span>
                            <span class="text-rose-600 font-bold">HIGH RISK</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                            <span class="text-5xl serif">92%</span>
                            <span class="mono text-xs opacity-50 italic">similarity score detected</span>
                        </div>
                        <div class="bg-stone/30 p-4 mono text-[10px]">
                            SYSTEM_LOG: Match found in Class 9 (Software). Existing TM "ACME TECH" registered by Acme Corp (US) in 2019. Conflict imminent.
                        </div>
                        <button class="w-full bg-accent py-4 text-primary font-bold uppercase tracking-widest hover:brightness-110 transition-all">
                            Отримати стратегію захисту
                        </button>
                    </div>
                </div>
                <!-- Decorative geometry -->
                <div class="absolute -bottom-8 -right-8 w-full h-full border-4 border-stone -z-10"></div>
            </div>
        </section>

        <!-- Stats Block -->
        <footer class="bg-secondary text-white p-12 md:p-24 masonry-grid reveal">
            <div class="col-span-12 md:col-span-6 border-b md:border-b-0 md:border-r border-white/10 pb-12 md:pb-0 md:pr-12">
                <h4 class="text-5xl serif mb-8 leading-tight">Ми будуємо фундамент для вашого бізнесу <span class="text-accent italic">15 років</span> поспіль.</h4>
                <div class="flex gap-12">
                    <div>
                        <div class="text-4xl font-bold text-accent mono">2.5k+</div>
                        <div class="mono text-[10px] uppercase tracking-widest opacity-50">TM Registered</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-accent mono">98%</div>
                        <div class="mono text-[10px] uppercase tracking-widest opacity-50">Success Rate</div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 md:pl-12 pt-12 md:pt-0">
                <p class="mono text-xs text-accent uppercase tracking-widest mb-6 font-bold">Зв'яжіться з нами</p>
                <div class="text-2xl mb-8 font-light">
                    м. Київ, Україна <br/>
                    +380 (68) 724-50-00 <br/>
                    info@trademark.com.ua
                </div>
                <div class="flex gap-6 mono text-[10px] opacity-40 uppercase">
                    <a href="#" class="hover:text-accent transition-colors">Privacy Policy</a>
                    <a href="#" class="hover:text-accent transition-colors">Terms of Service</a>
                    <span>© 2025 TRADEMARK.COM.UA</span>
                </div>
            </div>
        </footer>

    </main>

    <script>
        // Simple scroll reveal
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section, footer').forEach(el => {
            el.style.opacity = "0";
            observer.observe(el);
        });

        // Search interaction simulation
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.querySelector('.search-input-group input');

        searchBtn.addEventListener('click', () => {
            if(searchInput.value) {
                searchBtn.innerHTML = "Аналізуємо...";
                setTimeout(() => {
                    searchBtn.innerHTML = "Перевірити";
                    alert('Запит до баз WIPO/NIPO виконано. Система знайшла схожі результати.');
                }, 1500);
            }
        });
    </script>
</body>
</html>