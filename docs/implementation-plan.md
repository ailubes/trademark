# TRADEMARK.COM.UA — Implementation Plan
## Complete Website Redesign with Tectonic Design System

**Version:** 2.0
**Date:** January 2026
**Status:** Ready for Implementation

---

## Executive Summary

This plan outlines the complete redesign of trademark.com.ua from an outdated WordPress site to a modern Next.js 14+ platform using the "Tectonic" design system. Key features include:

- **Blog Section** — Full content management with categories, tags, and SEO
- **Mobile-First Design** — Responsive from 320px to 2560px
- **Ukrainian Language** — 100% Ukrainian content and interface
- **SEO Optimized** — Structured data, metadata, Core Web Vitals
- **Multi-Agent Orchestration** — Efficient task distribution

---

## 1. Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 14+ (App Router) | SSR, ISR, routing |
| **Styling** | Tailwind CSS + Tectonic Design System | UI styling |
| **Components** | shadcn/ui | Base components |
| **Database** | PostgreSQL (Supabase) | Leads, content |
| **CMS** | Headless WordPress (WP REST API) | Blog management |
| **Search** | TMview API, WIPO API | Trademark search |
| **Email** | Resend | Transactional emails |
| **Analytics** | Plausible | Privacy-friendly |
| **Hosting** | Hetzner (Coolify, self-hosted) | Deployment |

---

## 2. Design System — Tectonic

### 2.1 Color Palette

```css
:root {
    --primary: #0D1B2A;      /* Deep blue - trust, authority */
    --secondary: #1B3A4B;    /* Lighter blue */
    --accent: #C9A227;       /* Gold - premium, success */
    --stone: #E5E5E5;        /* Light gray */
    --background: #FAFAFA;   /* Off-white */
}
```

### 2.2 Typography

| Usage | Font | Weight |
|-------|------|--------|
| Headings (h1-h3) | DM Serif Display | 400 |
| Body text | Source Sans 3 | 400, 600, 700 |
| Code/Data | JetBrains Mono | 400, 700 |

### 2.3 Core Components

**TectonicSlab** — Primary card component
```
Border: 1px solid #0D1B2A
Shadow: 8px 8px 0px 0px #0D1B2A
Hover: translate(-2px, -2px), shadow → gold
```

**Pillar** — Left-bordered section
```
Left border: 4px solid #0D1B2A
Top accent: 40px gold stripe
Padding-left: 1.5rem
```

**SearchInputGroup** — Hero search
```
Border: 3px solid #0D1B2A
Input: serif font, 1.5rem
Button: uppercase, letter-spacing 0.1em
```

---

## 3. Project Structure

```
trademark.com.ua/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Tectonic CSS
│   │
│   ├── search/
│   │   ├── page.tsx                  # Search interface
│   │   └── results/page.tsx          # Results
│   │
│   ├── services/
│   │   ├── page.tsx                  # Services overview
│   │   ├── trademark-registration/
│   │   │   ├── ukraine/page.tsx
│   │   │   ├── eu/page.tsx
│   │   │   └── international/page.tsx
│   │   ├── patents/page.tsx
│   │   └── copyright/page.tsx
│   │
│   ├── blog/                         # BLOG SECTION
│   │   ├── page.tsx                  # Blog listing
│   │   ├── [slug]/page.tsx           # Post detail
│   │   ├── category/[category]/page.tsx
│   │   └── tag/[tag]/page.tsx
│   │
│   ├── nice-classes/
│   │   ├── page.tsx                  # Classes browser
│   │   └── [classNumber]/page.tsx
│   │
│   ├── resources/
│   │   ├── faq/page.tsx
│   │   └── glossary/page.tsx
│   │
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── pricing/page.tsx
│   │
│   └── api/
│       ├── trademark-search/route.ts
│       ├── contact/route.ts
│       ├── lead/route.ts
│       └── newsletter/route.ts
│
├── components/
│   ├── tectonic/                     # Design system
│   │   ├── TectonicSlab.tsx
│   │   ├── Pillar.tsx
│   │   ├── MasonryGrid.tsx
│   │   ├── SearchInputGroup.tsx
│   │   └── StatusBadge.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── search/
│   │   ├── TrademarkSearch.tsx
│   │   ├── SearchResults.tsx
│   │   └── RiskIndicator.tsx
│   │
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx
│   │   ├── TableOfContents.tsx
│   │   └── RelatedPosts.tsx
│   │
│   └── forms/
│       ├── ContactForm.tsx
│       ├── LeadCaptureForm.tsx
│       └── NewsletterForm.tsx
│
├── lib/
│   ├── api/
│   │   ├── tmview.ts                 # EUIPO API
│   │   ├── wipo.ts                   # WIPO API
│   │   └── unified-search.ts
│   │
│   ├── cms/
│   │   └── payload.ts
│   │
│   └── seo/
│       ├── metadata.ts
│       └── structured-data.ts
│
└── content/
    └── nice-classes/                 # Static JSON data
```

---

## 4. Page List

### Priority 0 (Must Have)

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, search, services, trust indicators |
| Trademark Search | `/search` | Interactive search tool |
| Search Results | `/search/results` | Results with risk assessment |
| Contact | `/contact` | Contact form, map, details |
| Pricing | `/pricing` | Service pricing cards |

### Priority 1 (Important)

| Page | Route | Description |
|------|-------|-------------|
| Blog Listing | `/blog` | All posts with filters |
| Blog Post | `/blog/[slug]` | Individual article |
| TM Registration UA | `/services/trademark-registration/ukraine` | Service detail |
| TM Registration EU | `/services/trademark-registration/eu` | Service detail |
| TM International | `/services/trademark-registration/international` | Madrid system |
| Nice Classes | `/nice-classes` | Interactive class browser |
| FAQ | `/resources/faq` | Frequently asked questions |
| About | `/about` | Company information |

### Priority 2 (Secondary)

| Page | Route | Description |
|------|-------|-------------|
| Blog Category | `/blog/category/[cat]` | Filtered posts |
| Blog Tag | `/blog/tag/[tag]` | Filtered posts |
| Patents | `/services/patents` | Patent services |
| Copyright | `/services/copyright` | Copyright services |
| Nice Class Detail | `/nice-classes/[num]` | Individual class |
| Glossary | `/resources/glossary` | IP terminology |

---

## 5. Blog Architecture

### 5.1 Content Model

```typescript
interface BlogPost {
  slug: string;
  title: string;           // Ukrainian
  excerpt: string;         // Ukrainian
  content: RichText;       // Portable Text
  featuredImage: Image;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt: Date;
  readingTime: number;
  seo: SEOData;
}
```

### 5.2 Categories (Ukrainian)

| Slug | Name | Description |
|------|------|-------------|
| `trademark-basics` | Основи торгових марок | Introductory content |
| `registration-guides` | Гайди з реєстрації | Step-by-step guides |
| `nice-classification` | Класифікація МКТУ | Nice class guides |
| `international-ip` | Міжнародний захист | Madrid, EU, WIPO |
| `legal-updates` | Правові новини | IP law news |
| `case-studies` | Кейси | Real examples |
| `business-tips` | Поради для бізнесу | Business strategy |

### 5.3 Blog Features

- Rich text editor with images, tables, code blocks
- Auto-generated Table of Contents
- Reading time calculation
- Related posts (by category/tags)
- Social sharing (Facebook, LinkedIn, Telegram)
- Newsletter CTA integration
- SEO: custom meta, OG images, Article schema

---

## 6. Mobile-First Strategy

### 6.1 Breakpoints

```css
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### 6.2 Responsive Patterns

| Component | Mobile (<768px) | Desktop (768px+) |
|-----------|-----------------|------------------|
| Navigation | Hamburger drawer | Horizontal bar |
| TectonicSlab | Full width, stacked | 2-3 column grid |
| Search | Full width, filters accordion | Inline filters |
| Blog | Single column | Content + sidebar |
| Footer | Stacked sections | Multi-column |

### 6.3 Touch Optimization

- Minimum touch target: 44x44px
- Disable hover animations on touch devices
- Add active states for touch feedback
- Swipe gestures for mobile navigation

### 6.4 Performance Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Total Bundle Size | < 200KB (initial) |

---

## 7. SEO Implementation

### 7.1 Target Keywords (Ukrainian)

| Keyword | Volume | Priority |
|---------|--------|----------|
| реєстрація торгової марки | 1,300/mo | P0 |
| зареєструвати торгову марку | 720/mo | P0 |
| перевірка торгової марки | 480/mo | P0 |
| торгова марка ціна | 390/mo | P1 |
| класи МКТУ | 320/mo | P1 |
| патент на винахід | 590/mo | P1 |
| міжнародна реєстрація марки | 210/mo | P2 |

### 7.2 Metadata Template

```typescript
// Root metadata
export const metadata = {
  title: {
    default: 'TRADEMARK.COM.UA | Реєстрація торгових марок',
    template: '%s | TRADEMARK.COM.UA',
  },
  description: 'Професійна реєстрація торгових марок, патентів та авторських прав в Україні.',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'TRADEMARK.COM.UA',
  },
};
```

### 7.3 Structured Data

| Page Type | Schema |
|-----------|--------|
| Homepage | LocalBusiness, LegalService |
| Blog Post | Article |
| FAQ | FAQPage |
| Service | Service |
| Search | WebApplication |

### 7.4 Technical SEO Checklist

- [ ] HTTPS with valid SSL
- [ ] Mobile-responsive design
- [ ] XML sitemap auto-generated
- [ ] robots.txt configured
- [ ] Canonical URLs on all pages
- [ ] hreflang for UK/EN versions
- [ ] Open Graph tags on all pages
- [ ] JSON-LD structured data
- [ ] Image optimization with alt text
- [ ] 301 redirects from old WordPress URLs

---

## 8. Implementation Phases

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Project Setup**
| Task | Agent | Hours |
|------|-------|-------|
| Next.js 14 initialization | coder | 2 |
| Tailwind + Tectonic theme | coder | 4 |
| shadcn/ui installation | coder | 2 |
| Font configuration | coder | 1 |
| Supabase setup | supabase-db | 2 |
| Database schema | supabase-db | 4 |

**Week 2: Design System**
| Task | Agent | Hours |
|------|-------|-------|
| TectonicSlab component | frontend-design | 3 |
| Pillar component | frontend-design | 2 |
| MasonryGrid component | frontend-design | 2 |
| SearchInputGroup component | frontend-design | 3 |
| Header/Footer | frontend-design | 6 |
| MobileNav | frontend-design | 4 |

**Week 3: Homepage**
| Task | Agent | Hours |
|------|-------|-------|
| Hero section | frontend-design | 6 |
| Services grid | frontend-design | 4 |
| Registry cards | frontend-design | 4 |
| Trust indicators | frontend-design | 3 |
| CTA section | frontend-design | 3 |

**Week 4: Core Pages**
| Task | Agent | Hours |
|------|-------|-------|
| About page | frontend-design | 4 |
| Contact page + form | frontend-design | 4 |
| Contact API route | coder | 2 |
| Pricing page | frontend-design | 6 |

### Phase 2: Blog & Content (Weeks 5-8)

**Week 5: CMS Setup (Headless WordPress)**
| Task | Agent | Hours |
|------|-------|-------|
| WordPress installation on Hetzner | coder | 4 |
| WP REST API configuration | coder | 4 |
| Custom post types (Blog, FAQ, Glossary) | coder | 4 |
| ACF Pro for custom fields | coder | 3 |
| Ukrainian language setup (Polylang) | coder | 2 |

**Week 6: Blog Frontend**
| Task | Agent | Hours |
|------|-------|-------|
| Blog listing page | frontend-design | 6 |
| PostCard component | frontend-design | 3 |
| Blog post page | frontend-design | 8 |
| PostContent renderer | coder | 4 |
| TableOfContents | frontend-design | 3 |

**Week 7: Blog Features**
| Task | Agent | Hours |
|------|-------|-------|
| Category archives | coder | 3 |
| Tag archives | coder | 3 |
| RelatedPosts | coder | 3 |
| Social share buttons | frontend-design | 2 |
| Newsletter CTA | frontend-design | 2 |

**Week 8: Services Pages**
| Task | Agent | Hours |
|------|-------|-------|
| Services overview | frontend-design | 4 |
| TM Ukraine page | frontend-design | 6 |
| TM EU page | frontend-design | 4 |
| TM International page | frontend-design | 4 |
| FAQ page | frontend-design | 4 |
| Nice classes browser | frontend-design | 6 |

### Phase 3: Search & API (Weeks 9-10)

**Week 9: API Integration**
| Task | Agent | Hours |
|------|-------|-------|
| EUIPO API registration | Explore | 4 |
| TMview integration | coder | 8 |
| WIPO integration | coder | 6 |
| Unified search API | coder | 6 |
| Similarity scoring | coder | 4 |
| Rate limiting | coder | 2 |

**Week 10: Search UI**
| Task | Agent | Hours |
|------|-------|-------|
| TrademarkSearch component | frontend-design | 8 |
| SearchResults component | frontend-design | 6 |
| ResultCard + RiskIndicator | frontend-design | 4 |
| Nice class filters | frontend-design | 3 |
| Lead capture modal | frontend-design | 4 |

### Phase 4: SEO & Launch (Weeks 11-12)

**Week 11: SEO**
| Task | Agent | Hours |
|------|-------|-------|
| Metadata for all pages | coder | 6 |
| JSON-LD structured data | coder | 4 |
| XML sitemap | coder | 2 |
| robots.txt | coder | 1 |
| OG image generation | coder | 4 |
| 301 redirects | coder | 3 |

**Week 12: Launch**
| Task | Agent | Hours |
|------|-------|-------|
| Image optimization | coder | 3 |
| Core Web Vitals fix | coder | 6 |
| Accessibility audit | coder | 4 |
| Cross-browser testing | coder | 4 |
| Analytics setup | coder | 2 |
| Production deployment | coder | 4 |

---

## 9. Agent Orchestration

### Agent Assignments

| Agent | Role | Tasks |
|-------|------|-------|
| **coder** | Implementation | Next.js setup, API routes, integrations, TypeScript, deployment |
| **frontend-design** | UI/UX | Tectonic components, pages, responsive design, animations |
| **supabase-db** | Database | Schema, migrations, RLS policies, functions |
| **Explore** | Research | API docs, best practices, library evaluation |

### Parallel Execution

```
Week 1-2:
├── supabase-db: Database setup ─────────┐
│                                         ├── Parallel
├── frontend-design: Components ─────────┘
└── coder: Project setup

Week 5-6:
├── coder: CMS backend ───────────────────┐
│                                          ├── Parallel
└── frontend-design: Blog UI ─────────────┘

Week 9-10:
├── coder: API integration ───────────────┐
│                                          ├── Parallel
└── frontend-design: Search UI ───────────┘
```

---

## 10. Verification Plan

### Phase 1 Checklist
- [ ] Tectonic components match template.md design
- [ ] Navigation works on all breakpoints
- [ ] Homepage loads < 3s
- [ ] Contact form submits successfully
- [ ] No console errors

### Phase 2 Checklist
- [ ] Blog posts render rich content
- [ ] Category/tag filtering works
- [ ] TOC generates correctly
- [ ] CMS admin can manage posts

### Phase 3 Checklist
- [ ] TMview API returns results
- [ ] WIPO API returns results
- [ ] Similarity scoring accurate
- [ ] Risk levels display correctly
- [ ] Rate limiting prevents abuse

### Phase 4 Checklist
- [ ] Lighthouse SEO > 90
- [ ] Lighthouse Performance > 80
- [ ] Lighthouse Accessibility > 90
- [ ] Structured data validates
- [ ] SSL certificate valid
- [ ] 301 redirects work

---

## 11. Critical Files

| File | Purpose |
|------|---------|
| `docs/template.md` | Tectonic design reference |
| `docs/trademark-api-integration.md` | API code examples |
| `docs/trademark-redesign-plan.md` | Business requirements |
| `app/layout.tsx` | Root layout (to create) |
| `components/tectonic/*` | Design system (to create) |

---

## 12. Success Metrics

| Metric | Baseline | 30 Days | 90 Days |
|--------|----------|---------|---------|
| Organic Traffic | 500/mo | 1,000/mo | 3,000/mo |
| Search Usage | 0 | 500/mo | 2,000/mo |
| Lead Submissions | 10/mo | 50/mo | 150/mo |
| Bounce Rate | 70% | 50% | 40% |
| Lighthouse Score | - | > 85 | > 95 |

---

## 13. Initial Blog Content Plan

Priority content to create before launch:

### Registration Guides (5 articles)
1. "Як зареєструвати торгову марку в Україні: покрокова інструкція"
2. "Реєстрація торгової марки в ЄС: повний гайд"
3. "Мадридська система: міжнародна реєстрація марки"
4. "Скільки коштує реєстрація торгової марки в 2026 році"
5. "Документи для реєстрації торгової марки: чеклист"

### Nice Class Guides (5 articles)
1. "45 класів МКТУ: повний довідник з прикладами"
2. "Клас 9 МКТУ: програмне забезпечення та електроніка"
3. "Клас 35 МКТУ: реклама та бізнес-послуги"
4. "Клас 42 МКТУ: IT-послуги та розробка"
5. "Як правильно обрати клас МКТУ для вашого бренду"

### Legal News (3 articles)
1. "Зміни в законодавстві про торгові марки 2026"
2. "Україна в системі TMview: що це означає для бізнесу"
3. "ЄС vs Україна: порівняння систем захисту інтелектуальної власності"

---

## Next Steps

1. **Review and approve** this implementation plan
2. **Phase 1 kickoff**: Initialize Next.js project
3. **Create Tectonic components** based on template.md
4. **Build homepage** with search functionality
5. **Iterate** through remaining phases

---

**Document prepared by:** Claude Code
**Date:** January 2026
**Ready for implementation upon approval**
