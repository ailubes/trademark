# TRADEMARK.COM.UA — Complete Website Redesign Plan

## Executive Summary

This document outlines a comprehensive redesign strategy for trademark.com.ua, transforming it from an outdated WordPress site into a modern, API-powered intellectual property registration platform. The new design will feature real-time trademark availability search, a streamlined user experience, and professional branding that positions the company as a leader in Ukrainian and international IP services.

---

## 1. CURRENT STATE ANALYSIS

### 1.1 Existing Website Assessment

**Current Platform**: WordPress with custom "MyTheme"  
**Primary Issues**:
- ❌ SSL certificate not working (security vulnerability)
- ❌ Mixed Ukrainian/Russian content inconsistency
- ❌ Outdated visual design (circa 2015)
- ❌ No interactive trademark search functionality
- ❌ Poor mobile responsiveness
- ❌ Slow page load times (heavy images, no optimization)
- ❌ No user portal or application tracking
- ❌ Contact form is the only conversion path

**Current Services Offered**:
1. Trademark registration (3 pricing tiers: 12/8/4 months)
2. International trademark registration (Madrid Protocol)
3. Patent registration (inventions, utility models)
4. Industrial design protection
5. Copyright registration
6. Business services (ISO certification, CE marking, company registration)

**Pricing Structure (Current)**:
- 6,500 UAH — 12 months, 1 class
- 43,400 UAH — 8 months, 1 class  
- 58,200 UAH — 4 months, 1 class

---

## 2. STRATEGIC OBJECTIVES

### 2.1 Primary Goals

1. **Lead Generation**: Convert visitors into qualified leads through interactive tools
2. **Trust Building**: Modern design that conveys professionalism and expertise
3. **Self-Service**: Enable preliminary trademark searches before consultation
4. **Education**: Position as thought leaders in Ukrainian IP law
5. **International Reach**: Support for Ukrainian, English, and potentially Polish/German

### 2.2 Key Performance Indicators (KPIs)

| Metric | Current (Est.) | Target (6 mo.) |
|--------|---------------|----------------|
| Monthly visitors | 500-1,000 | 5,000+ |
| Lead conversion rate | ~1% | 5-8% |
| Bounce rate | ~70% | <40% |
| Average session duration | 1-2 min | 4+ min |
| Mobile traffic | ~30% | 60%+ |

---

## 3. TRADEMARK SEARCH API INTEGRATION

### 3.1 API Strategy — Multi-Source Aggregation

The centerpiece of the redesign is a **real-time trademark availability checker** that queries multiple databases simultaneously.

#### Primary API Sources

| Database | Coverage | API Access | Cost |
|----------|----------|------------|------|
| **TMview (EUIPO)** | 136M+ trademarks, 80 countries, Ukraine included | Free API via EUIPO Developer Portal | Free |
| **WIPO Global Brand Database** | International registrations (Madrid) | API Catalog (apicatalog.wipo.int) | Free |
| **Ukrainian NIPO** | National Ukrainian trademarks | sis.nipo.gov.ua (scraping/unofficial) | Free |
| **USPTO (optional)** | US trademarks for clients expanding abroad | Open Data Portal API | Free |

#### 3.2 Technical Architecture for Search Feature

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js/React)                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Trademark Search Component                              │   │
│  │  - Text input (trademark name)                           │   │
│  │  - Nice class selector (1-45)                           │   │
│  │  - Country/region selector                               │   │
│  │  - Search type: exact / similar / phonetic               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Node.js/Python)                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  /api/trademark-search                                   │   │
│  │  - Rate limiting (100 req/min per IP)                    │   │
│  │  - Query normalization (transliteration UA↔EN)           │   │
│  │  - Parallel API calls to all sources                     │   │
│  │  - Result aggregation & deduplication                    │   │
│  │  - Similarity scoring (Levenshtein, phonetic)            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   TMview API  │    │   WIPO GBD    │    │  UA NIPO DB   │
│   (EUIPO)     │    │   API         │    │  (Scraper)    │
└───────────────┘    └───────────────┘    └───────────────┘
```

#### 3.3 API Integration Details

**EUIPO TMview API**
- Registration: https://dev.euipo.europa.eu
- Documentation: Full OpenAPI spec available
- Features: Text search, image search, Nice class filtering
- Rate limits: Varies by subscription tier

**WIPO Global Brand Database**
- Registration: https://apicatalog.wipo.int
- Features: Madrid System data, international registrations
- Includes Ukrainian international trademarks

**Ukrainian National Database**
- Source: https://sis.nipo.gov.ua
- Note: No official API — requires scraping solution or periodic data sync
- Alternative: Use TMview (Ukraine joined in Oct 2024)

#### 3.4 Search Results Display

```
┌─────────────────────────────────────────────────────────────────┐
│  Search Results for: "ACME"                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                 │
│  ⚠️  HIGH RISK — 12 similar trademarks found                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🔴 ACME CORP              Class 35, 42                   │   │
│  │    Status: Active | Owner: Acme Corporation (US)         │   │
│  │    Similarity: 95% | Risk: HIGH                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🟡 AKME                    Class 9, 42                   │   │
│  │    Status: Active | Owner: Akme LLC (Ukraine)            │   │
│  │    Similarity: 78% | Risk: MEDIUM                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📋 Get Professional Analysis                             │  │
│  │  Our experts will review your trademark and provide      │  │
│  │  a detailed risk assessment with recommendations.        │  │
│  │                                                          │  │
│  │  [Request Free Consultation] ──────────────────────────▶ │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. INFORMATION ARCHITECTURE

### 4.1 Sitemap

```
trademark.com.ua/
│
├── / (Homepage)
│   ├── Hero with trademark search tool
│   ├── Service cards
│   ├── Trust indicators
│   └── CTA sections
│
├── /search (Trademark Search Tool)
│   ├── Ukraine search
│   ├── EU (EUIPO) search
│   ├── International (WIPO) search
│   └── Bulk search (for agencies)
│
├── /services/
│   ├── /trademark-registration/
│   │   ├── /ukraine
│   │   ├── /eu
│   │   ├── /international
│   │   └── /pricing
│   ├── /patents/
│   │   ├── /inventions
│   │   ├── /utility-models
│   │   └── /industrial-designs
│   ├── /copyright/
│   └── /business-services/
│       ├── /iso-certification
│       ├── /ce-marking
│       └── /company-registration
│
├── /nice-classes/ (Interactive Nice Classification Guide)
│
├── /resources/
│   ├── /blog
│   ├── /faq
│   ├── /documents (Templates, forms)
│   └── /glossary
│
├── /about/
│   ├── /team
│   └── /testimonials
│
├── /contact/
│
└── /portal/ (Client Portal — Future Phase)
    ├── /applications
    ├── /documents
    └── /invoices
```

### 4.2 User Journeys

**Journey 1: First-Time Visitor (Business Owner)**
```
Homepage → Search Tool → Enter trademark → View results → 
See risk warning → Request consultation → Lead captured
```

**Journey 2: Informed Visitor (Already researched)**
```
Homepage → Services → Trademark Registration → Pricing → 
Compare packages → Select package → Contact form → Lead captured
```

**Journey 3: Education Seeker**
```
Blog article (via Google) → Related services CTA → 
Search tool → Results → Consultation request
```

---

## 5. DESIGN SYSTEM

### 5.1 Brand Identity Evolution

**Current Brand Issues**:
- Generic logo
- Inconsistent colors
- Dated typography

**New Brand Direction**: "Professional Authority meets Modern Simplicity"

#### Color Palette

```css
:root {
  /* Primary - Deep Blue (Trust, Authority) */
  --color-primary-900: #0D1B2A;
  --color-primary-700: #1B3A4B;
  --color-primary-500: #2C5F7C;
  --color-primary-300: #5C9EAD;
  
  /* Accent - Gold (Premium, Success) */
  --color-accent-500: #C9A227;
  --color-accent-400: #D4B84A;
  --color-accent-300: #E5D080;
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  
  /* Neutrals */
  --color-neutral-50: #FAFAFA;
  --color-neutral-100: #F5F5F5;
  --color-neutral-200: #E5E5E5;
  --color-neutral-700: #404040;
  --color-neutral-900: #171717;
}
```

#### Typography

```css
/* Headings - DM Serif Display (Elegant, Authoritative) */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

/* Body - Source Sans 3 (Clean, Readable) */
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, sans-serif;
}
```

### 5.2 Component Library

**Search Box Component**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     🔍  Перевірте доступність вашої торгової марки             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Введіть назву марки...                           [🔎]    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│     Класи МКТУ:  [Всі ▼]   Країна:  [🇺🇦 Україна ▼]            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Pricing Card Component**
```
┌─────────────────────────────────────────────────────────────────┐
│                        ⭐ ПОПУЛЯРНИЙ                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │     СТАНДАРТ                                            │   │
│  │     ━━━━━━━━━━                                          │   │
│  │                                                         │   │
│  │         ₴6,500                                          │   │
│  │         за 1 клас                                       │   │
│  │                                                         │   │
│  │     ⏱️  12 місяців                                      │   │
│  │                                                         │   │
│  │     ✓  Повна перевірка                                  │   │
│  │     ✓  Подання заявки                                   │   │
│  │     ✓  Супровід до реєстрації                          │   │
│  │     ✓  Отримання свідоцтва                             │   │
│  │                                                         │   │
│  │     [ Замовити ]                                        │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

---

## 6. TECHNICAL ARCHITECTURE

### 6.1 Recommended Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14+ (App Router) | SSR for SEO, React ecosystem, ISR for blog |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid development, consistent design |
| **Backend API** | Next.js API Routes or separate Node.js | Serverless-friendly, TypeScript |
| **Database** | PostgreSQL (Supabase or Neon) | Leads, applications, user data |
| **CMS** | Sanity or Payload CMS | Blog, services, multilingual content |
| **Search Engine** | Meilisearch or Algolia | Nice class lookup, blog search |
| **Hosting** | Vercel or Hetzner (via Coolify) | Your Lubes.dev deployment or Vercel |
| **SSL** | Let's Encrypt (auto via hosting) | ✅ Fix current SSL issue |
| **Analytics** | Plausible or Umami | Privacy-friendly, GDPR compliant |
| **Email** | Resend or Postmark | Transactional emails |

### 6.2 API Layer Architecture

```typescript
// /app/api/trademark-search/route.ts

import { NextRequest, NextResponse } from 'next/server';

interface SearchParams {
  query: string;
  niceClasses?: number[];
  countries?: string[];
  searchType?: 'exact' | 'similar' | 'phonetic';
}

interface TrademarkResult {
  id: string;
  name: string;
  owner: string;
  status: 'active' | 'pending' | 'expired';
  niceClasses: number[];
  country: string;
  registrationDate?: string;
  similarity: number;
  source: 'tmview' | 'wipo' | 'ukraine';
  risk: 'high' | 'medium' | 'low';
}

export async function POST(request: NextRequest) {
  const params: SearchParams = await request.json();
  
  // Parallel search across all databases
  const [tmviewResults, wipoResults, uaResults] = await Promise.all([
    searchTMView(params),
    searchWIPO(params),
    searchUkraine(params),
  ]);
  
  // Aggregate and deduplicate
  const results = aggregateResults([
    ...tmviewResults,
    ...wipoResults,
    ...uaResults,
  ]);
  
  // Calculate risk scores
  const scoredResults = calculateRiskScores(results, params.query);
  
  return NextResponse.json({
    query: params.query,
    totalResults: scoredResults.length,
    results: scoredResults,
    searchedDatabases: ['TMview', 'WIPO GBD', 'UA NIPO'],
  });
}
```

### 6.3 Database Schema (Core Tables)

```sql
-- Leads from search tool
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  name VARCHAR(255),
  company VARCHAR(255),
  searched_trademark VARCHAR(255),
  search_results JSONB,
  source VARCHAR(50) DEFAULT 'trademark-search',
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Service inquiries
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  service_type VARCHAR(100) NOT NULL,
  package_tier VARCHAR(50),
  nice_classes INTEGER[],
  message TEXT,
  preferred_contact VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts (if not using CMS)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_uk VARCHAR(500) NOT NULL,
  title_en VARCHAR(500),
  content_uk TEXT NOT NULL,
  content_en TEXT,
  excerpt_uk VARCHAR(500),
  excerpt_en VARCHAR(500),
  featured_image VARCHAR(500),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Nice Classification reference
CREATE TABLE nice_classes (
  class_number INTEGER PRIMARY KEY,
  title_uk VARCHAR(500) NOT NULL,
  title_en VARCHAR(500) NOT NULL,
  description_uk TEXT,
  description_en TEXT,
  examples_uk TEXT[],
  examples_en TEXT[]
);
```

---

## 7. PAGE DESIGNS

### 7.1 Homepage Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  LOGO        Послуги  Пошук  Блог  Контакти      UA | EN  [☎️] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                                                                 │
│         Захистіть свій бренд в Україні та світі                │
│         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                │
│                                                                 │
│         Реєстрація торгових марок, патентів                    │
│         та об'єктів авторського права                          │
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │  🔍  Перевірити доступність марки...         [ШУКАТИ] │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
│         2,500+ зареєстрованих марок  •  25+ років досвіду      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    Як це працює                                                 │
│    ━━━━━━━━━━━━                                                │
│                                                                 │
│    ┌───────────┐    ┌───────────┐    ┌───────────┐             │
│    │    1.     │    │    2.     │    │    3.     │             │
│    │  Перевір  │ → │  Подай    │ →  │  Отримай  │             │
│    │   марку   │    │  заявку   │    │ свідоцтво │             │
│    └───────────┘    └───────────┘    └───────────┘             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    Наші послуги                                                 │
│    ━━━━━━━━━━━━                                                │
│                                                                 │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│    │  ™️      │  │  📜     │  │  🎨     │  │  ©️      │         │
│    │ Торгові │  │ Патенти │  │ Дизайн  │  │Авторське│         │
│    │  марки  │  │         │  │         │  │  право  │         │
│    │         │  │         │  │         │  │         │         │
│    │від 6500₴│  │від 8000₴│  │від 5000₴│  │від 3000₴│         │
│    └─────────┘  └─────────┘  └─────────┘  └─────────┘         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    Чому обирають нас                                           │
│    ━━━━━━━━━━━━━━━━                                            │
│                                                                 │
│    ✓ Офіційні представники                                     │
│    ✓ 25+ років досвіду                                         │
│    ✓ Фіксовані ціни                                            │
│    ✓ Безкоштовна консультація                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │                                                     │     │
│    │   Отримайте безкоштовну консультацію               │     │
│    │                                                     │     │
│    │   [Ім'я]  [Телефон]  [Email]  [НАДІСЛАТИ]          │     │
│    │                                                     │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   LOGO   Послуги | Блог | FAQ | Контакти                       │
│                                                                 │
│   📍 Київ, Україна                                             │
│   📞 +380 (68) 724-50-00                                       │
│   ✉️  info@trademark.com.ua                                    │
│                                                                 │
│   © 2025 Trademark.com.ua                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Search Results Page

```
┌─────────────────────────────────────────────────────────────────┐
│  LOGO        Послуги  Пошук  Блог  Контакти      UA | EN  [☎️] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ← Новий пошук                                                 │
│                                                                 │
│  Результати пошуку: "ACME TECHNOLOGIES"                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                        │
│                                                                 │
│  ┌────────────────────────────────────┐  ┌──────────────────┐  │
│  │                                    │  │                  │  │
│  │  Фільтри:                          │  │  ⚠️ УВАГА        │  │
│  │                                    │  │                  │  │
│  │  Країна:  [Україна ▼]              │  │  Знайдено 8      │  │
│  │                                    │  │  схожих марок    │  │
│  │  Класи:   [Всі класи ▼]            │  │                  │  │
│  │                                    │  │  Рекомендуємо    │  │
│  │  Статус:  [Всі ▼]                  │  │  консультацію    │  │
│  │                                    │  │                  │  │
│  │  База:    ☑️ TMview                 │  │  [Замовити →]   │  │
│  │           ☑️ WIPO                   │  │                  │  │
│  │           ☑️ Україна                │  └──────────────────┘  │
│  │                                    │                        │
│  └────────────────────────────────────┘                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🔴 ACME TECH                                           │   │
│  │     Клас: 9, 42 | Статус: Активна | Схожість: 92%       │   │
│  │     Власник: ACME Technologies Inc. (США)               │   │
│  │     Реєстрація: 15.03.2019 | Дія до: 15.03.2029        │   │
│  │                                              [Деталі →] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🟡 ACMI TECHNOLOGIES                                   │   │
│  │     Клас: 35, 42 | Статус: Активна | Схожість: 78%      │   │
│  │     Власник: ТОВ "АКМІ" (Україна)                       │   │
│  │     Реєстрація: 22.07.2021 | Дія до: 22.07.2031        │   │
│  │                                              [Деталі →] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🟢 AKME-TECH                                           │   │
│  │     Клас: 7, 11 | Статус: Прострочена | Схожість: 65%   │   │
│  │     Власник: AKME GmbH (Німеччина)                      │   │
│  │     Реєстрація: 10.01.2015 | Дія до: 10.01.2025 ⏰     │   │
│  │                                              [Деталі →] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Показати ще 5 результатів...]                                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📋 Хочете детальний аналіз?                            │   │
│  │                                                         │   │
│  │  Наші експерти підготують професійний звіт              │   │
│  │  з рекомендаціями щодо реєстрації вашої марки.         │   │
│  │                                                         │   │
│  │  [Замовити аналіз — безкоштовно]                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. SEO STRATEGY

### 8.1 Technical SEO Requirements

1. **SSL Certificate** — ✅ Priority fix (Let's Encrypt)
2. **Site Speed** — Target <2s LCP (Next.js optimization)
3. **Mobile-First** — 100% responsive design
4. **Structured Data** — Schema.org for LocalBusiness, FAQPage, Service
5. **XML Sitemap** — Auto-generated via Next.js
6. **Canonical URLs** — Proper implementation for UA/EN versions
7. **hreflang Tags** — For multilingual content

### 8.2 Target Keywords (Ukrainian)

| Keyword | Monthly Volume | Difficulty | Priority |
|---------|---------------|------------|----------|
| реєстрація торгової марки | 1,300 | Medium | High |
| зареєструвати торгову марку | 720 | Medium | High |
| перевірка торгової марки | 480 | Low | High |
| патент на винахід | 590 | Medium | Medium |
| авторське право | 1,900 | High | Medium |
| МКТУ класи | 320 | Low | High |
| міжнародна реєстрація марки | 210 | Low | Medium |

### 8.3 Content Strategy

**Blog Topics** (Monthly Publishing Schedule):
1. "Як перевірити торгову марку перед реєстрацією" — Tutorial
2. "45 класів МКТУ: Повний гід з прикладами" — Comprehensive guide
3. "Скільки коштує реєстрація торгової марки в 2025" — Pricing guide
4. "Торгова марка vs Логотип: В чому різниця?" — Educational
5. IP news from Ukraine and EU — Monthly digest

---

## 9. CONVERSION OPTIMIZATION

### 9.1 Lead Capture Points

| Touchpoint | Trigger | Offer |
|------------|---------|-------|
| Homepage hero | Immediate | Free trademark search |
| Search results (high risk) | After search | Free professional analysis |
| Search results (low risk) | After search | Download PDF report |
| Service page | Scrolling | Free consultation booking |
| Blog sidebar | Content engagement | Newsletter + free guide |
| Exit intent | About to leave | 10% discount code |

### 9.2 Form Strategy

**Minimal Friction Form (Search Tool)**:
- Email (required)
- Phone (optional)
- Searched trademark (auto-filled)

**Detailed Form (Consultation Request)**:
- Name
- Email
- Phone
- Company name
- Trademark name
- Nice classes (multi-select)
- Preferred contact method
- Message

---

## 10. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Weeks 1-4)

| Week | Tasks |
|------|-------|
| 1 | SSL fix, domain setup, hosting configuration |
| 1 | Design system finalization (Figma) |
| 2 | Next.js project setup, component library |
| 2 | EUIPO API registration and testing |
| 3 | Homepage development |
| 3 | Trademark search UI (frontend) |
| 4 | Search API backend (TMview integration) |
| 4 | Results page, lead capture form |

### Phase 2: Content & Services (Weeks 5-8)

| Week | Tasks |
|------|-------|
| 5 | Service pages (Trademark, Patent, Copyright) |
| 5 | Nice classes interactive guide |
| 6 | Pricing pages |
| 6 | About/Contact pages |
| 7 | CMS setup, blog migration |
| 7 | FAQ section (accordion format) |
| 8 | Multilingual setup (UK/EN) |
| 8 | SEO implementation |

### Phase 3: Enhancement (Weeks 9-12)

| Week | Tasks |
|------|-------|
| 9 | WIPO API integration |
| 9 | Ukrainian database integration |
| 10 | Email automation (welcome series) |
| 10 | Analytics and tracking setup |
| 11 | Performance optimization |
| 11 | Accessibility audit (WCAG 2.1) |
| 12 | User testing and refinements |
| 12 | Launch preparation |

### Phase 4: Post-Launch (Months 4-6)

- A/B testing on conversion elements
- Client portal development (application tracking)
- Image-based trademark search
- Mobile app consideration

---

## 11. BUDGET ESTIMATE

### Development Costs (One-Time)

| Item | Estimate |
|------|----------|
| Design (Figma, Brand Guidelines) | $2,000 - $3,500 |
| Frontend Development | $5,000 - $8,000 |
| Backend API Development | $3,000 - $5,000 |
| CMS Integration | $1,500 - $2,500 |
| Content Migration | $500 - $1,000 |
| QA & Testing | $1,000 - $1,500 |
| **Total Development** | **$13,000 - $21,500** |

### Monthly Operating Costs

| Item | Monthly Cost |
|------|-------------|
| Hosting (Vercel Pro or Hetzner) | $20 - $50 |
| Database (Supabase/Neon) | $25 - $50 |
| CMS (Sanity/Payload) | $0 - $99 |
| Email Service (Resend) | $20 - $50 |
| Analytics (Plausible) | $9 - $19 |
| SSL | $0 (included) |
| **Total Monthly** | **$74 - $268** |

---

## 12. SUCCESS METRICS & MONITORING

### Launch Day Checklist

- [ ] SSL working (https://trademark.com.ua)
- [ ] All pages load <3s on mobile
- [ ] Trademark search returns results
- [ ] Contact forms submit successfully
- [ ] Analytics tracking firing
- [ ] 301 redirects from old URLs
- [ ] XML sitemap submitted to Google
- [ ] Google Business Profile updated

### 30/60/90 Day Review Metrics

| Metric | 30 Days | 60 Days | 90 Days |
|--------|---------|---------|---------|
| Organic traffic | +50% | +100% | +200% |
| Search tool usage | 500 | 1,500 | 3,000 |
| Lead form submissions | 50 | 150 | 300 |
| Average session duration | 2 min | 3 min | 4 min |

---

## 13. APPENDIX

### A. EUIPO API Registration Steps

1. Visit https://dev.euipo.europa.eu
2. Create developer account
3. Subscribe to "Trademark search" product
4. Obtain API key
5. Review rate limits and terms

### B. Nice Classification Quick Reference

| Class | Description |
|-------|-------------|
| 9 | Software, electronics, apps |
| 25 | Clothing, footwear |
| 35 | Advertising, business services |
| 41 | Education, entertainment |
| 42 | IT services, software development |
| 43 | Food services, restaurants |

### C. Competitor Analysis

| Competitor | Strengths | Weaknesses |
|------------|-----------|------------|
| craneip.com | SEO content, English | No search tool |
| pocketip.com | Search tool, modern | Expensive, generic |
| sis.nipo.gov.ua | Official data | Terrible UX, no guidance |

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Prepared for**: Trademark.com.ua Redesign Project

---

*This plan provides a comprehensive roadmap for transforming trademark.com.ua into a modern, API-powered intellectual property platform that generates leads through valuable self-service tools while maintaining the professional authority needed for legal services.*
