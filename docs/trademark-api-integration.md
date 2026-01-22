# Trademark Search API Integration — Code Examples

This document provides working code examples for integrating trademark search APIs into the redesigned trademark.com.ua website.

## 1. EUIPO TMview API Integration

### Register for API Access

1. Go to: https://dev.euipo.europa.eu
2. Create a developer account
3. Subscribe to "Trademark search" API product
4. Get your API credentials

### TypeScript Implementation

```typescript
// lib/api/tmview.ts

interface TMViewSearchParams {
  query: string;
  niceClasses?: number[];
  countries?: string[];
  status?: 'filed' | 'registered' | 'all';
  pageSize?: number;
  page?: number;
}

interface TMViewResult {
  applicationNumber: string;
  registrationNumber?: string;
  markName: string;
  markImageURI?: string;
  applicantName: string;
  niceClasses: number[];
  filingDate: string;
  registrationDate?: string;
  status: string;
  office: string;
  country: string;
}

interface TMViewResponse {
  totalCount: number;
  results: TMViewResult[];
  page: number;
  pageSize: number;
}

const TMVIEW_BASE_URL = 'https://api.euipo.europa.eu/trademark-search/v1';

export async function searchTMView(params: TMViewSearchParams): Promise<TMViewResponse> {
  const { query, niceClasses, countries, status = 'all', pageSize = 20, page = 1 } = params;

  const searchBody = {
    searchTerms: [
      {
        type: 'markName',
        value: query,
        operator: 'contains'
      }
    ],
    filters: {
      ...(niceClasses?.length && { niceClasses }),
      ...(countries?.length && { offices: countries }),
      ...(status !== 'all' && { status: [status] }),
    },
    pagination: {
      pageSize,
      pageNumber: page
    },
    sorting: {
      field: 'relevance',
      order: 'desc'
    }
  };

  const response = await fetch(`${TMVIEW_BASE_URL}/trademarks/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.EUIPO_API_KEY}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify(searchBody),
  });

  if (!response.ok) {
    throw new Error(`TMView API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    totalCount: data.totalCount,
    page: data.pageNumber,
    pageSize: data.pageSize,
    results: data.trademarks.map((tm: any) => ({
      applicationNumber: tm.applicationNumber,
      registrationNumber: tm.registrationNumber,
      markName: tm.markName || tm.wordElements?.join(' '),
      markImageURI: tm.markImageURI,
      applicantName: tm.applicantName,
      niceClasses: tm.niceClasses || [],
      filingDate: tm.filingDate,
      registrationDate: tm.registrationDate,
      status: tm.status,
      office: tm.office,
      country: tm.office, // EUIPO uses office code as country
    })),
  };
}
```

## 2. WIPO Global Brand Database Integration

### API Access

1. Visit: https://apicatalog.wipo.int
2. Register for API access
3. Review documentation for Madrid System data

### TypeScript Implementation

```typescript
// lib/api/wipo.ts

interface WIPOSearchParams {
  query: string;
  designations?: string[]; // Country codes where trademark is protected
  niceClasses?: number[];
  source?: 'madrid' | 'all';
}

interface WIPOResult {
  referenceNumber: string;
  markName: string;
  holderName: string;
  holderCountry: string;
  niceClasses: number[];
  designations: string[];
  registrationDate: string;
  expiryDate?: string;
  status: string;
  imageUrl?: string;
}

const WIPO_BASE_URL = 'https://www.wipo.int/branddb/api';

export async function searchWIPO(params: WIPOSearchParams): Promise<WIPOResult[]> {
  const { query, designations, niceClasses, source = 'all' } = params;

  // Build query string
  const queryParts: string[] = [];
  
  // Text search
  queryParts.push(`BRAND:(${encodeURIComponent(query)})`);
  
  // Filter by designation (countries)
  if (designations?.length) {
    queryParts.push(`DS:(${designations.join(' OR ')})`);
  }
  
  // Filter by Nice classes
  if (niceClasses?.length) {
    queryParts.push(`NC:(${niceClasses.join(' OR ')})`);
  }

  const searchUrl = new URL(`${WIPO_BASE_URL}/search`);
  searchUrl.searchParams.set('query', queryParts.join(' AND '));
  searchUrl.searchParams.set('rows', '50');
  searchUrl.searchParams.set('format', 'json');
  
  // Only search Madrid System if specified
  if (source === 'madrid') {
    searchUrl.searchParams.set('source', 'Madrid');
  }

  const response = await fetch(searchUrl.toString(), {
    headers: {
      'Accept': 'application/json',
      // WIPO may require API key depending on access level
      ...(process.env.WIPO_API_KEY && {
        'Authorization': `Bearer ${process.env.WIPO_API_KEY}`
      }),
    },
  });

  if (!response.ok) {
    throw new Error(`WIPO API error: ${response.status}`);
  }

  const data = await response.json();

  return data.response.docs.map((doc: any) => ({
    referenceNumber: doc.ID,
    markName: doc.BRAND || doc.BN,
    holderName: doc.HOLD,
    holderCountry: doc.HOC,
    niceClasses: doc.NC?.split(',').map(Number) || [],
    designations: doc.DS?.split(',') || [],
    registrationDate: doc.RD,
    expiryDate: doc.ED,
    status: doc.ST,
    imageUrl: doc.IMG ? `https://www.wipo.int${doc.IMG}` : undefined,
  }));
}
```

## 3. Ukrainian NIPO Database (Web Scraping Approach)

Since the Ukrainian IP office doesn't provide an official API, we need to either:
1. Use TMview (Ukraine joined in Oct 2024)
2. Scrape sis.nipo.gov.ua (with proper rate limiting)

### TMview Approach (Recommended)

```typescript
// Use the TMView API with Ukraine filter
const ukraineResults = await searchTMView({
  query: 'ACME',
  countries: ['UA'], // Ukraine office code
  niceClasses: [9, 42],
});
```

### Scraping Approach (Fallback)

```typescript
// lib/api/ukraine.ts
import * as cheerio from 'cheerio';

interface UkraineSearchParams {
  query: string;
  niceClasses?: number[];
}

interface UkraineResult {
  registrationNumber: string;
  markName: string;
  applicantName: string;
  niceClasses: number[];
  filingDate: string;
  status: string;
}

const UKRAINE_SEARCH_URL = 'https://sis.nipo.gov.ua/en/search/simple/';

export async function searchUkraine(params: UkraineSearchParams): Promise<UkraineResult[]> {
  const { query, niceClasses } = params;

  // Build form data for search
  const formData = new URLSearchParams();
  formData.append('objectType', '2'); // Trademarks
  formData.append('searchField', 'wordElement');
  formData.append('searchValue', query);
  if (niceClasses?.length) {
    formData.append('niceClasses', niceClasses.join(','));
  }

  const response = await fetch(UKRAINE_SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    throw new Error(`Ukraine search error: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const results: UkraineResult[] = [];

  // Parse search results table
  $('table.search-results tbody tr').each((_, row) => {
    const $row = $(row);
    results.push({
      registrationNumber: $row.find('td:nth-child(1)').text().trim(),
      markName: $row.find('td:nth-child(2)').text().trim(),
      applicantName: $row.find('td:nth-child(3)').text().trim(),
      niceClasses: $row.find('td:nth-child(4)').text().trim().split(',').map(Number),
      filingDate: $row.find('td:nth-child(5)').text().trim(),
      status: $row.find('td:nth-child(6)').text().trim(),
    });
  });

  return results;
}
```

## 4. Unified Search API Route

```typescript
// app/api/trademark-search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { searchTMView } from '@/lib/api/tmview';
import { searchWIPO } from '@/lib/api/wipo';
import Levenshtein from 'fast-levenshtein';

interface SearchRequest {
  query: string;
  niceClasses?: number[];
  countries?: string[];
  includeWIPO?: boolean;
}

interface UnifiedResult {
  id: string;
  source: 'tmview' | 'wipo' | 'ukraine';
  markName: string;
  ownerName: string;
  ownerCountry: string;
  niceClasses: number[];
  status: string;
  filingDate?: string;
  registrationDate?: string;
  similarity: number;
  riskLevel: 'high' | 'medium' | 'low';
  imageUrl?: string;
}

// Calculate string similarity (0-100)
function calculateSimilarity(query: string, markName: string): number {
  const q = query.toLowerCase().trim();
  const m = markName.toLowerCase().trim();
  
  // Exact match
  if (q === m) return 100;
  
  // Contains check
  if (m.includes(q) || q.includes(m)) {
    return 90;
  }
  
  // Levenshtein distance
  const distance = Levenshtein.get(q, m);
  const maxLength = Math.max(q.length, m.length);
  const similarity = Math.max(0, 100 - (distance / maxLength) * 100);
  
  return Math.round(similarity);
}

// Determine risk level based on similarity and status
function determineRisk(similarity: number, status: string, niceClassOverlap: boolean): 'high' | 'medium' | 'low' {
  const isActive = ['active', 'registered', 'filed'].includes(status.toLowerCase());
  
  if (!isActive) return 'low';
  
  if (similarity >= 85 && niceClassOverlap) return 'high';
  if (similarity >= 70 && niceClassOverlap) return 'medium';
  if (similarity >= 85) return 'medium';
  
  return 'low';
}

// Deduplicate results from multiple sources
function deduplicateResults(results: UnifiedResult[]): UnifiedResult[] {
  const seen = new Map<string, UnifiedResult>();
  
  for (const result of results) {
    const key = `${result.markName.toLowerCase()}-${result.ownerName.toLowerCase()}`;
    const existing = seen.get(key);
    
    if (!existing || result.similarity > existing.similarity) {
      seen.set(key, result);
    }
  }
  
  return Array.from(seen.values());
}

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json();
    const { query, niceClasses = [], countries = ['UA'], includeWIPO = true } = body;

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Parallel search across all sources
    const searchPromises: Promise<UnifiedResult[]>[] = [];

    // TMView search (includes Ukraine since Oct 2024)
    searchPromises.push(
      searchTMView({ query, niceClasses, countries })
        .then(response => response.results.map(r => ({
          id: `tmview-${r.applicationNumber}`,
          source: 'tmview' as const,
          markName: r.markName,
          ownerName: r.applicantName,
          ownerCountry: r.country,
          niceClasses: r.niceClasses,
          status: r.status,
          filingDate: r.filingDate,
          registrationDate: r.registrationDate,
          similarity: calculateSimilarity(query, r.markName),
          riskLevel: 'medium' as const,
          imageUrl: r.markImageURI,
        })))
        .catch(err => {
          console.error('TMView search error:', err);
          return [];
        })
    );

    // WIPO search for international registrations
    if (includeWIPO) {
      searchPromises.push(
        searchWIPO({ query, designations: countries, niceClasses })
          .then(results => results.map(r => ({
            id: `wipo-${r.referenceNumber}`,
            source: 'wipo' as const,
            markName: r.markName,
            ownerName: r.holderName,
            ownerCountry: r.holderCountry,
            niceClasses: r.niceClasses,
            status: r.status,
            registrationDate: r.registrationDate,
            similarity: calculateSimilarity(query, r.markName),
            riskLevel: 'medium' as const,
            imageUrl: r.imageUrl,
          })))
          .catch(err => {
            console.error('WIPO search error:', err);
            return [];
          })
      );
    }

    // Wait for all searches
    const allResults = await Promise.all(searchPromises);
    const flatResults = allResults.flat();

    // Calculate risk levels
    const resultsWithRisk = flatResults.map(result => ({
      ...result,
      riskLevel: determineRisk(
        result.similarity,
        result.status,
        niceClasses.length === 0 || result.niceClasses.some(nc => niceClasses.includes(nc))
      ),
    }));

    // Deduplicate
    const uniqueResults = deduplicateResults(resultsWithRisk);

    // Sort by similarity (descending)
    uniqueResults.sort((a, b) => b.similarity - a.similarity);

    // Calculate summary stats
    const highRiskCount = uniqueResults.filter(r => r.riskLevel === 'high').length;
    const mediumRiskCount = uniqueResults.filter(r => r.riskLevel === 'medium').length;

    return NextResponse.json({
      query,
      searchedDatabases: ['TMview (includes Ukraine)', ...(includeWIPO ? ['WIPO GBD'] : [])],
      totalResults: uniqueResults.length,
      summary: {
        highRisk: highRiskCount,
        mediumRisk: mediumRiskCount,
        lowRisk: uniqueResults.length - highRiskCount - mediumRiskCount,
        recommendation: highRiskCount > 0 
          ? 'Professional review strongly recommended'
          : mediumRiskCount > 0
            ? 'Professional review recommended'
            : 'Trademark appears available, but professional verification advised',
      },
      results: uniqueResults.slice(0, 50), // Limit to 50 results
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed. Please try again.' },
      { status: 500 }
    );
  }
}
```

## 5. Frontend Search Component

```tsx
// components/TrademarkSearch.tsx

'use client';

import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';

interface SearchResult {
  id: string;
  source: string;
  markName: string;
  ownerName: string;
  ownerCountry: string;
  niceClasses: number[];
  status: string;
  similarity: number;
  riskLevel: 'high' | 'medium' | 'low';
  imageUrl?: string;
}

interface SearchResponse {
  query: string;
  totalResults: number;
  summary: {
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    recommendation: string;
  };
  results: SearchResult[];
}

const NICE_CLASSES = [
  { value: 9, label: 'Клас 9 — ПЗ, електроніка' },
  { value: 25, label: 'Клас 25 — Одяг' },
  { value: 35, label: 'Клас 35 — Реклама, бізнес' },
  { value: 41, label: 'Клас 41 — Освіта, розваги' },
  { value: 42, label: 'Клас 42 — IT-послуги' },
  { value: 43, label: 'Клас 43 — Ресторани, готелі' },
];

export function TrademarkSearch() {
  const [query, setQuery] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || query.length < 2) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trademark-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          niceClasses: selectedClasses,
          countries: ['UA'],
          includeWIPO: true,
        }),
      });

      if (!response.ok) throw new Error('Search failed');

      const data: SearchResponse = await response.json();
      setResults(data);
    } catch (err) {
      setError('Помилка пошуку. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Info className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getRiskBadge = (level: string) => {
    const classes = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-200',
      low: 'bg-green-100 text-green-800 border-green-200',
    };
    return classes[level as keyof typeof classes] || classes.low;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введіть назву торгової марки..."
            className="w-full px-6 py-4 pr-14 text-lg border-2 border-slate-200 rounded-xl 
                       focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                       transition-all duration-200"
          />
          <button
            type="submit"
            disabled={isLoading || query.length < 2}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 
                       text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 
                       disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Nice Class Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          {NICE_CLASSES.map((nc) => (
            <button
              key={nc.value}
              type="button"
              onClick={() => setSelectedClasses((prev) =>
                prev.includes(nc.value)
                  ? prev.filter((c) => c !== nc.value)
                  : [...prev, nc.value]
              )}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors
                ${selectedClasses.includes(nc.value)
                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
            >
              {nc.label}
            </button>
          ))}
        </div>
      </form>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className={`p-6 rounded-xl border-2 ${
            results.summary.highRisk > 0
              ? 'bg-red-50 border-red-200'
              : results.summary.mediumRisk > 0
                ? 'bg-amber-50 border-amber-200'
                : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start gap-4">
              {getRiskIcon(
                results.summary.highRisk > 0
                  ? 'high'
                  : results.summary.mediumRisk > 0
                    ? 'medium'
                    : 'low'
              )}
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Знайдено {results.totalResults} {results.totalResults === 1 ? 'марку' : 'марок'}
                </h3>
                <p className="text-slate-600">{results.summary.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {results.results.map((result) => (
              <div
                key={result.id}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getRiskIcon(result.riskLevel)}
                      <h4 className="font-semibold text-lg">{result.markName}</h4>
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${getRiskBadge(result.riskLevel)}`}>
                        {result.similarity}% схожість
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Власник: {result.ownerName} ({result.ownerCountry})
                    </p>
                    <p className="text-slate-500 text-sm">
                      Класи МКТУ: {result.niceClasses.join(', ')} | Статус: {result.status}
                    </p>
                  </div>
                  {result.imageUrl && (
                    <img
                      src={result.imageUrl}
                      alt={result.markName}
                      className="w-16 h-16 object-contain border rounded"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-center">
            <h3 className="text-xl font-semibold mb-2">
              Потрібен детальний аналіз?
            </h3>
            <p className="text-blue-100 mb-4">
              Наші експерти підготують професійний звіт з рекомендаціями
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Замовити консультацію — безкоштовно
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 6. Environment Variables

Create a `.env.local` file:

```env
# EUIPO TMview API
EUIPO_API_KEY=your_euipo_api_key_here

# WIPO API (if required)
WIPO_API_KEY=your_wipo_api_key_here

# Database
DATABASE_URL=postgresql://user:password@host:5432/trademark_db

# Email
RESEND_API_KEY=your_resend_api_key

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=trademark.com.ua
```

## 7. Rate Limiting Middleware

```typescript
// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT = 100; // requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/trademark-search')) {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    
    const rateLimit = rateLimitMap.get(ip);
    
    if (rateLimit) {
      if (now - rateLimit.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      } else if (rateLimit.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      } else {
        rateLimit.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## Summary

This code provides:

1. **TMview API integration** — Search 136M+ trademarks from 80 countries including Ukraine
2. **WIPO GBD integration** — Search international (Madrid) registrations
3. **Ukrainian database option** — Scraping fallback if needed
4. **Unified search API** — Aggregates results from all sources
5. **Risk assessment** — Calculates similarity and determines risk level
6. **React component** — Ready-to-use search UI

### Next Steps

1. Register for EUIPO API access at https://dev.euipo.europa.eu
2. Test API connectivity in development
3. Implement the search component
4. Set up lead capture after search results
5. Configure rate limiting for production
