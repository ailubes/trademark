# Ukrainian NIPO API Integration Guide

## Офіційний API Спеціальної Інформаційної Системи (СІС) УКРНОІВІ

This document provides a complete integration guide for the official Ukrainian National Intellectual Property Office (NIPO/УКРНОІВІ) API for trademark and other IP searches.

---

## 1. API Overview

**Base URL**: `https://sis.nipo.gov.ua/api/v1/open-data/`

**Protocol**: HTTP/HTTPS REST API

**Response Format**: JSON

**Rate Limit**: **1 request per second** (important!)

**Database Size**: 1.2+ million documents (as of January 2026)

**Documentation**: https://sis.nipo.gov.ua/uk/services/api-description/

---

## 2. Available Databases

The SIS API contains information from the following State Registers:

| obj_type | Description (UA) | Description (EN) |
|----------|------------------|------------------|
| 1 | Винаходи | Inventions (Patents) |
| 2 | Корисні моделі | Utility Models |
| 3 | Компонування напівпровідникових виробів | Semiconductor Product Layouts |
| **4** | **Знаки для товарів і послуг** | **Trademarks** ⭐ |
| 5 | Географічні зазначення | Geographical Indications |
| 6 | Промислові зразки | Industrial Designs |
| 10 | Авторське право на твір | Copyright |
| 11 | Договір про передачу права на використання твору | License Agreements |
| 12 | Договір про передачу (відчуження) майнових прав на твір | Assignment Agreements |
| 13 | Авторське право на службовий твір | Copyright (Work for Hire) |

---

## 3. API Parameters

| Parameter | Description | Type | Required | Values |
|-----------|-------------|------|----------|--------|
| `obj_type` | IP object type | Integer | No | See table above |
| `obj_state` | Object state | Integer | No | 1 = Application, 2 = Registered |
| `app_date_from` | Filing date from | Date | No | Format: dd.mm.yyyy |
| `app_date_to` | Filing date to | Date | No | Format: dd.mm.yyyy |
| `reg_date_from` | Registration date from | Date | No | Format: dd.mm.yyyy |
| `reg_date_to` | Registration date to | Date | No | Format: dd.mm.yyyy |
| `last_update_from` | Last update from | Date | No | Format: dd.mm.yyyy |
| `last_update_to` | Last update to | Date | No | Format: dd.mm.yyyy |
| `app_number` | Application number | String | No | e.g., "m202011127" |

---

## 4. Example API Requests

### 4.1 Get Recent Trademark Applications

```
GET https://sis.nipo.gov.ua/api/v1/open-data/?obj_state=1&obj_type=4&app_date_from=01.01.2025&app_date_to=31.01.2025
```

Returns: List of trademark applications filed in January 2025

### 4.2 Get Registered Trademarks

```
GET https://sis.nipo.gov.ua/api/v1/open-data/?obj_state=2&obj_type=4&reg_date_from=01.01.2025
```

Returns: Registered trademarks issued since January 1, 2025

### 4.3 Get Single Record by Application Number

```
GET https://sis.nipo.gov.ua/api/v1/open-data/m202011127/
```

Returns: Details of application m202011127

### 4.4 Get Single Record by Registration Number

```
GET https://sis.nipo.gov.ua/api/v1/open-data/319040/?obj_type=4
```

Returns: Details of trademark certificate #319040

### 4.5 Get Recently Updated Records

```
GET https://sis.nipo.gov.ua/api/v1/open-data/?obj_type=4&last_update_from=01.01.2025&last_update_to=15.01.2025
```

Returns: Trademarks with status changes in the specified period

---

## 5. TypeScript/JavaScript Implementation

### 5.1 Types Definition

```typescript
// types/ukraine-nipo.ts

/**
 * Object types for Ukrainian IP Office API
 */
export enum UkraineObjectType {
  INVENTION = 1,
  UTILITY_MODEL = 2,
  SEMICONDUCTOR = 3,
  TRADEMARK = 4,
  GEOGRAPHICAL_INDICATION = 5,
  INDUSTRIAL_DESIGN = 6,
  COPYRIGHT = 10,
  LICENSE_AGREEMENT = 11,
  ASSIGNMENT_AGREEMENT = 12,
  WORK_FOR_HIRE_COPYRIGHT = 13,
}

/**
 * Object state
 */
export enum UkraineObjectState {
  APPLICATION = 1,
  REGISTERED = 2,
}

/**
 * Search parameters for NIPO API
 */
export interface NIPOSearchParams {
  objType?: UkraineObjectType;
  objState?: UkraineObjectState;
  appDateFrom?: string; // dd.mm.yyyy
  appDateTo?: string;
  regDateFrom?: string;
  regDateTo?: string;
  lastUpdateFrom?: string;
  lastUpdateTo?: string;
  appNumber?: string;
}

/**
 * Nice Classification class
 */
export interface NiceClass {
  classNumber: number;
  goodsServices: string;
}

/**
 * Applicant/Owner information
 */
export interface Applicant {
  name: string;
  address?: string;
  country?: string;
  countryCode?: string;
}

/**
 * Trademark record from NIPO API
 */
export interface NIPOTrademarkRecord {
  // Identifiers
  applicationNumber: string;
  registrationNumber?: string;
  
  // Dates
  applicationDate: string;
  registrationDate?: string;
  expiryDate?: string;
  publicationDate?: string;
  lastUpdate?: string;
  
  // Trademark details
  markName?: string;
  markDescription?: string;
  markType?: string;
  markImageUrl?: string;
  
  // Classification
  niceClasses: NiceClass[];
  viennaClasses?: string[];
  
  // Ownership
  applicants: Applicant[];
  representatives?: Applicant[];
  
  // Status
  status: string;
  statusCode?: string;
  
  // Additional
  priority?: {
    date: string;
    country: string;
    number: string;
  }[];
  colors?: string[];
  disclaimers?: string[];
}

/**
 * API Response structure
 */
export interface NIPOApiResponse {
  count: number;
  next?: string;
  previous?: string;
  results: NIPOTrademarkRecord[];
}
```

### 5.2 API Client Class

```typescript
// lib/api/ukraine-nipo.ts

import {
  NIPOSearchParams,
  NIPOApiResponse,
  NIPOTrademarkRecord,
  UkraineObjectType,
  UkraineObjectState,
} from '@/types/ukraine-nipo';

/**
 * Rate limiter to respect 1 req/sec limit
 */
class RateLimiter {
  private lastRequest: number = 0;
  private readonly minInterval: number = 1100; // 1.1 seconds to be safe

  async wait(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastRequest;
    
    if (elapsed < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - elapsed)
      );
    }
    
    this.lastRequest = Date.now();
  }
}

/**
 * Ukrainian NIPO API Client
 */
export class UkraineNIPOClient {
  private readonly baseUrl = 'https://sis.nipo.gov.ua/api/v1/open-data';
  private readonly rateLimiter = new RateLimiter();

  /**
   * Format date to Ukrainian API format (dd.mm.yyyy)
   */
  private formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  /**
   * Build query string from parameters
   */
  private buildQueryString(params: NIPOSearchParams): string {
    const queryParts: string[] = [];

    if (params.objType !== undefined) {
      queryParts.push(`obj_type=${params.objType}`);
    }
    if (params.objState !== undefined) {
      queryParts.push(`obj_state=${params.objState}`);
    }
    if (params.appDateFrom) {
      queryParts.push(`app_date_from=${params.appDateFrom}`);
    }
    if (params.appDateTo) {
      queryParts.push(`app_date_to=${params.appDateTo}`);
    }
    if (params.regDateFrom) {
      queryParts.push(`reg_date_from=${params.regDateFrom}`);
    }
    if (params.regDateTo) {
      queryParts.push(`reg_date_to=${params.regDateTo}`);
    }
    if (params.lastUpdateFrom) {
      queryParts.push(`last_update_from=${params.lastUpdateFrom}`);
    }
    if (params.lastUpdateTo) {
      queryParts.push(`last_update_to=${params.lastUpdateTo}`);
    }
    if (params.appNumber) {
      queryParts.push(`app_number=${encodeURIComponent(params.appNumber)}`);
    }

    return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  }

  /**
   * Search trademarks with filtering
   */
  async searchTrademarks(params: NIPOSearchParams = {}): Promise<NIPOApiResponse> {
    await this.rateLimiter.wait();

    // Always search trademarks
    const searchParams: NIPOSearchParams = {
      ...params,
      objType: UkraineObjectType.TRADEMARK,
    };

    const queryString = this.buildQueryString(searchParams);
    const url = `${this.baseUrl}/${queryString}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Trademark-Search-App/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`NIPO API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get single trademark by application number
   */
  async getByApplicationNumber(appNumber: string): Promise<NIPOTrademarkRecord | null> {
    await this.rateLimiter.wait();

    const url = `${this.baseUrl}/${encodeURIComponent(appNumber)}/?obj_type=${UkraineObjectType.TRADEMARK}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Trademark-Search-App/1.0',
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`NIPO API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get single trademark by registration number
   */
  async getByRegistrationNumber(regNumber: string): Promise<NIPOTrademarkRecord | null> {
    await this.rateLimiter.wait();

    const url = `${this.baseUrl}/${encodeURIComponent(regNumber)}/?obj_type=${UkraineObjectType.TRADEMARK}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Trademark-Search-App/1.0',
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`NIPO API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get recently filed trademark applications
   */
  async getRecentApplications(days: number = 30): Promise<NIPOApiResponse> {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(fromDate.getDate() - days);

    return this.searchTrademarks({
      objState: UkraineObjectState.APPLICATION,
      appDateFrom: this.formatDate(fromDate),
      appDateTo: this.formatDate(today),
    });
  }

  /**
   * Get recently registered trademarks
   */
  async getRecentRegistrations(days: number = 30): Promise<NIPOApiResponse> {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(fromDate.getDate() - days);

    return this.searchTrademarks({
      objState: UkraineObjectState.REGISTERED,
      regDateFrom: this.formatDate(fromDate),
      regDateTo: this.formatDate(today),
    });
  }

  /**
   * Get trademarks updated in a specific period
   * Useful for syncing/caching
   */
  async getUpdatedRecords(fromDate: Date, toDate: Date): Promise<NIPOApiResponse> {
    return this.searchTrademarks({
      lastUpdateFrom: this.formatDate(fromDate),
      lastUpdateTo: this.formatDate(toDate),
    });
  }

  /**
   * Paginate through all results
   * Warning: Respects rate limiting, so this can be slow
   */
  async *paginateResults(params: NIPOSearchParams): AsyncGenerator<NIPOTrademarkRecord[]> {
    let nextUrl: string | null = null;
    let isFirstRequest = true;

    while (isFirstRequest || nextUrl) {
      await this.rateLimiter.wait();

      let url: string;
      if (isFirstRequest) {
        const queryString = this.buildQueryString({
          ...params,
          objType: UkraineObjectType.TRADEMARK,
        });
        url = `${this.baseUrl}/${queryString}`;
        isFirstRequest = false;
      } else {
        url = nextUrl!;
      }

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Trademark-Search-App/1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`NIPO API error: ${response.status}`);
      }

      const data: NIPOApiResponse = await response.json();
      yield data.results;

      nextUrl = data.next || null;
    }
  }
}

// Export singleton instance
export const ukraineNIPO = new UkraineNIPOClient();
```

### 5.3 Text Search Implementation

The NIPO API doesn't support direct text search, so we need to implement a local search strategy:

```typescript
// lib/api/ukraine-trademark-search.ts

import { ukraineNIPO, UkraineNIPOClient } from './ukraine-nipo';
import {
  NIPOTrademarkRecord,
  UkraineObjectState,
} from '@/types/ukraine-nipo';
import Levenshtein from 'fast-levenshtein';

interface TrademarkSearchResult {
  record: NIPOTrademarkRecord;
  similarity: number;
  matchType: 'exact' | 'contains' | 'similar' | 'phonetic';
}

interface SearchOptions {
  query: string;
  niceClasses?: number[];
  includeApplications?: boolean;
  includeRegistered?: boolean;
  maxResults?: number;
  minSimilarity?: number;
}

/**
 * Transliterate Ukrainian to Latin for phonetic matching
 */
function transliterate(text: string): string {
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
    'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
    'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ь': '', 'ю': 'yu', 'я': 'ya', "'": '',
  };

  return text.toLowerCase().split('').map(char => map[char] || char).join('');
}

/**
 * Calculate similarity between two strings
 */
function calculateSimilarity(query: string, text: string): number {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase().trim();

  // Exact match
  if (q === t) return 100;

  // Contains match
  if (t.includes(q)) return 95;
  if (q.includes(t)) return 90;

  // Transliteration match
  const qTranslit = transliterate(q);
  const tTranslit = transliterate(t);
  
  if (qTranslit === tTranslit) return 92;
  if (tTranslit.includes(qTranslit)) return 88;

  // Levenshtein distance
  const distance = Levenshtein.get(q, t);
  const maxLen = Math.max(q.length, t.length);
  const similarity = Math.max(0, 100 - (distance / maxLen) * 100);

  return Math.round(similarity);
}

/**
 * Determine match type based on similarity and text comparison
 */
function getMatchType(
  query: string,
  text: string,
  similarity: number
): 'exact' | 'contains' | 'similar' | 'phonetic' {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase().trim();

  if (q === t) return 'exact';
  if (t.includes(q) || q.includes(t)) return 'contains';

  const qTranslit = transliterate(q);
  const tTranslit = transliterate(t);
  if (qTranslit === tTranslit || tTranslit.includes(qTranslit)) {
    return 'phonetic';
  }

  return 'similar';
}

/**
 * Search Ukrainian trademark database
 * 
 * Strategy: Since NIPO API doesn't support text search,
 * we fetch recent records and filter locally. For production,
 * consider building a local cache/index.
 */
export class UkraineTrademarkSearch {
  private client: UkraineNIPOClient;
  private cache: Map<string, NIPOTrademarkRecord[]> = new Map();

  constructor() {
    this.client = ukraineNIPO;
  }

  /**
   * Search trademarks by text query
   * 
   * Note: This is a simplified implementation.
   * For production, build a local Elasticsearch/Meilisearch index
   * that syncs with NIPO data periodically.
   */
  async search(options: SearchOptions): Promise<TrademarkSearchResult[]> {
    const {
      query,
      niceClasses,
      includeApplications = true,
      includeRegistered = true,
      maxResults = 50,
      minSimilarity = 60,
    } = options;

    const results: TrademarkSearchResult[] = [];
    const seenIds = new Set<string>();

    // Fetch records to search through
    // In production, this should query a local index instead
    const recordsToSearch: NIPOTrademarkRecord[] = [];

    if (includeRegistered) {
      try {
        const registered = await this.client.getRecentRegistrations(365);
        recordsToSearch.push(...registered.results);
      } catch (error) {
        console.error('Error fetching registered trademarks:', error);
      }
    }

    if (includeApplications) {
      try {
        // Wait for rate limit
        await new Promise(resolve => setTimeout(resolve, 1100));
        const applications = await this.client.getRecentApplications(180);
        recordsToSearch.push(...applications.results);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }

    // Search through records
    for (const record of recordsToSearch) {
      // Skip if already seen
      const id = record.registrationNumber || record.applicationNumber;
      if (seenIds.has(id)) continue;
      seenIds.add(id);

      // Get searchable text
      const markName = record.markName || '';
      if (!markName) continue;

      // Calculate similarity
      const similarity = calculateSimilarity(query, markName);

      // Skip if below threshold
      if (similarity < minSimilarity) continue;

      // Filter by Nice classes if specified
      if (niceClasses && niceClasses.length > 0) {
        const recordClasses = record.niceClasses.map(nc => nc.classNumber);
        const hasMatchingClass = niceClasses.some(nc => recordClasses.includes(nc));
        if (!hasMatchingClass) continue;
      }

      results.push({
        record,
        similarity,
        matchType: getMatchType(query, markName, similarity),
      });
    }

    // Sort by similarity (descending)
    results.sort((a, b) => b.similarity - a.similarity);

    // Return top results
    return results.slice(0, maxResults);
  }

  /**
   * Check if a specific trademark name is available
   */
  async checkAvailability(
    name: string,
    niceClasses: number[]
  ): Promise<{
    isAvailable: boolean;
    conflicts: TrademarkSearchResult[];
    recommendation: string;
  }> {
    const conflicts = await this.search({
      query: name,
      niceClasses,
      minSimilarity: 70,
      maxResults: 20,
    });

    const highRiskConflicts = conflicts.filter(c => c.similarity >= 85);
    const mediumRiskConflicts = conflicts.filter(
      c => c.similarity >= 70 && c.similarity < 85
    );

    const isAvailable = highRiskConflicts.length === 0;

    let recommendation: string;
    if (highRiskConflicts.length > 0) {
      recommendation = 
        'Високий ризик: знайдено схожі зареєстровані марки. ' +
        'Рекомендуємо консультацію з патентним повіреним.';
    } else if (mediumRiskConflicts.length > 0) {
      recommendation = 
        'Середній ризик: знайдено частково схожі марки. ' +
        'Реєстрація можлива, але рекомендуємо професійний аналіз.';
    } else {
      recommendation = 
        'Низький ризик: схожих марок не знайдено. ' +
        'Рекомендуємо подати заявку на реєстрацію.';
    }

    return {
      isAvailable,
      conflicts,
      recommendation,
    };
  }
}

// Export singleton
export const ukraineTrademarkSearch = new UkraineTrademarkSearch();
```

---

## 6. Next.js API Route Integration

```typescript
// app/api/ukraine-trademark-search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ukraineTrademarkSearch } from '@/lib/api/ukraine-trademark-search';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, niceClasses, checkAvailability } = body;

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (checkAvailability) {
      // Full availability check
      const result = await ukraineTrademarkSearch.checkAvailability(
        query,
        niceClasses || []
      );

      return NextResponse.json({
        query,
        database: 'NIPO Ukraine (СІС)',
        isAvailable: result.isAvailable,
        recommendation: result.recommendation,
        conflicts: result.conflicts.map(c => ({
          markName: c.record.markName,
          registrationNumber: c.record.registrationNumber,
          applicationNumber: c.record.applicationNumber,
          status: c.record.status,
          niceClasses: c.record.niceClasses.map(nc => nc.classNumber),
          applicants: c.record.applicants.map(a => a.name),
          similarity: c.similarity,
          matchType: c.matchType,
        })),
      });
    } else {
      // Simple search
      const results = await ukraineTrademarkSearch.search({
        query,
        niceClasses,
        maxResults: 50,
      });

      return NextResponse.json({
        query,
        database: 'NIPO Ukraine (СІС)',
        totalResults: results.length,
        results: results.map(r => ({
          markName: r.record.markName,
          registrationNumber: r.record.registrationNumber,
          applicationNumber: r.record.applicationNumber,
          status: r.record.status,
          niceClasses: r.record.niceClasses.map(nc => nc.classNumber),
          applicants: r.record.applicants.map(a => a.name),
          similarity: r.similarity,
          matchType: r.matchType,
          registrationDate: r.record.registrationDate,
          expiryDate: r.record.expiryDate,
        })),
      });
    }
  } catch (error) {
    console.error('Ukraine trademark search error:', error);
    return NextResponse.json(
      { error: 'Search failed. Please try again.' },
      { status: 500 }
    );
  }
}
```

---

## 7. Building a Local Search Index (Production Recommendation)

For production use, the NIPO API's rate limit (1 req/sec) makes real-time text search impractical. Here's a recommended approach:

### 7.1 Database Sync Worker

```typescript
// workers/nipo-sync.ts

import { ukraineNIPO } from '@/lib/api/ukraine-nipo';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Sync Ukrainian trademark database
 * Run this as a cron job (e.g., daily at 3 AM)
 */
export async function syncNIPODatabase() {
  console.log('Starting NIPO database sync...');

  // Get last sync timestamp
  const lastSync = await prisma.syncLog.findFirst({
    where: { source: 'nipo' },
    orderBy: { syncedAt: 'desc' },
  });

  const fromDate = lastSync?.syncedAt || new Date('2020-01-01');
  const toDate = new Date();

  console.log(`Syncing records from ${fromDate.toISOString()} to ${toDate.toISOString()}`);

  let totalSynced = 0;

  // Use pagination generator
  for await (const records of ukraineNIPO.paginateResults({
    lastUpdateFrom: formatDateUkraine(fromDate),
    lastUpdateTo: formatDateUkraine(toDate),
  })) {
    // Upsert records to local database
    for (const record of records) {
      await prisma.ukraineTrademark.upsert({
        where: {
          applicationNumber: record.applicationNumber,
        },
        update: {
          registrationNumber: record.registrationNumber,
          markName: record.markName,
          markNameNormalized: normalizeText(record.markName || ''),
          markNameTranslit: transliterate(record.markName || ''),
          status: record.status,
          niceClasses: record.niceClasses.map(nc => nc.classNumber),
          applicantNames: record.applicants.map(a => a.name),
          applicationDate: record.applicationDate ? new Date(record.applicationDate) : null,
          registrationDate: record.registrationDate ? new Date(record.registrationDate) : null,
          expiryDate: record.expiryDate ? new Date(record.expiryDate) : null,
          rawData: record,
          updatedAt: new Date(),
        },
        create: {
          applicationNumber: record.applicationNumber,
          registrationNumber: record.registrationNumber,
          markName: record.markName,
          markNameNormalized: normalizeText(record.markName || ''),
          markNameTranslit: transliterate(record.markName || ''),
          status: record.status,
          niceClasses: record.niceClasses.map(nc => nc.classNumber),
          applicantNames: record.applicants.map(a => a.name),
          applicationDate: record.applicationDate ? new Date(record.applicationDate) : null,
          registrationDate: record.registrationDate ? new Date(record.registrationDate) : null,
          expiryDate: record.expiryDate ? new Date(record.expiryDate) : null,
          rawData: record,
        },
      });
      totalSynced++;
    }

    console.log(`Synced ${totalSynced} records...`);
  }

  // Log sync completion
  await prisma.syncLog.create({
    data: {
      source: 'nipo',
      recordsProcessed: totalSynced,
      syncedAt: new Date(),
    },
  });

  console.log(`NIPO sync complete. Total records synced: ${totalSynced}`);
}

function formatDateUkraine(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

function transliterate(text: string): string {
  // Ukrainian to Latin transliteration (same as above)
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
    'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
    'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ь': '', 'ю': 'yu', 'я': 'ya', "'": '',
  };
  return text.toLowerCase().split('').map(char => map[char] || char).join('');
}
```

### 7.2 Prisma Schema

```prisma
// prisma/schema.prisma

model UkraineTrademark {
  id                 String   @id @default(cuid())
  applicationNumber  String   @unique
  registrationNumber String?
  
  markName           String?
  markNameNormalized String?
  markNameTranslit   String?
  
  status             String
  niceClasses        Int[]
  applicantNames     String[]
  
  applicationDate    DateTime?
  registrationDate   DateTime?
  expiryDate         DateTime?
  
  rawData            Json
  
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  
  @@index([markNameNormalized])
  @@index([markNameTranslit])
  @@index([niceClasses])
  @@index([status])
}

model SyncLog {
  id               String   @id @default(cuid())
  source           String
  recordsProcessed Int
  syncedAt         DateTime @default(now())
  
  @@index([source, syncedAt])
}
```

### 7.3 Fast Local Search

```typescript
// lib/api/ukraine-local-search.ts

import { PrismaClient } from '@prisma/client';
import Levenshtein from 'fast-levenshtein';

const prisma = new PrismaClient();

interface LocalSearchOptions {
  query: string;
  niceClasses?: number[];
  statusFilter?: 'active' | 'all';
  limit?: number;
}

export async function searchLocalDatabase(options: LocalSearchOptions) {
  const { query, niceClasses, statusFilter = 'all', limit = 50 } = options;

  const normalizedQuery = query.toLowerCase().trim();
  const translitQuery = transliterate(normalizedQuery);

  // Build where clause
  const where: any = {
    OR: [
      { markNameNormalized: { contains: normalizedQuery } },
      { markNameTranslit: { contains: translitQuery } },
    ],
  };

  if (niceClasses && niceClasses.length > 0) {
    where.niceClasses = { hasSome: niceClasses };
  }

  if (statusFilter === 'active') {
    where.status = { in: ['Діючий', 'Зареєстровано', 'Active', 'Registered'] };
  }

  // Query database
  const records = await prisma.ukraineTrademark.findMany({
    where,
    take: limit * 2, // Get more for similarity sorting
    orderBy: { registrationDate: 'desc' },
  });

  // Calculate similarity and sort
  const results = records
    .map(record => ({
      ...record,
      similarity: calculateSimilarity(normalizedQuery, record.markNameNormalized || ''),
    }))
    .filter(r => r.similarity >= 50)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return results;
}

function calculateSimilarity(query: string, text: string): number {
  if (!text) return 0;
  if (query === text) return 100;
  if (text.includes(query)) return 90;
  
  const distance = Levenshtein.get(query, text);
  const maxLen = Math.max(query.length, text.length);
  return Math.max(0, Math.round(100 - (distance / maxLen) * 100));
}

function transliterate(text: string): string {
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
    'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
    'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ь': '', 'ю': 'yu', 'я': 'ya', "'": '',
  };
  return text.toLowerCase().split('').map(char => map[char] || char).join('');
}
```

---

## 8. Error Handling

```typescript
// lib/api/nipo-errors.ts

export class NIPOApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = 'NIPOApiError';
  }
}

export class NIPORateLimitError extends NIPOApiError {
  constructor() {
    super('Rate limit exceeded. Maximum 1 request per second.', 429);
    this.name = 'NIPORateLimitError';
  }
}

export class NIPONotFoundError extends NIPOApiError {
  constructor(identifier: string) {
    super(`Record not found: ${identifier}`, 404);
    this.name = 'NIPONotFoundError';
  }
}

export function handleNIPOError(error: unknown): never {
  if (error instanceof NIPOApiError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new NIPOApiError(error.message, 500);
  }

  throw new NIPOApiError('Unknown error occurred', 500);
}
```

---

## 9. Summary

### Key Points

1. **Official API**: `https://sis.nipo.gov.ua/api/v1/open-data/`
2. **Rate Limit**: 1 request per second (CRITICAL!)
3. **No Text Search**: API only supports filtering by dates and type
4. **Production Strategy**: Build a local database/index that syncs with NIPO daily

### Recommended Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Request                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Your API Server                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Local PostgreSQL / Meilisearch              │   │
│  │              (Fast text search, no rate limit)           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    (Daily sync via cron)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NIPO API (sis.nipo.gov.ua)                   │
│                    Rate limit: 1 req/sec                        │
└─────────────────────────────────────────────────────────────────┘
```

### Links

- **API Endpoint**: https://sis.nipo.gov.ua/api/v1/open-data/
- **Documentation (UA)**: https://sis.nipo.gov.ua/uk/services/api-description/
- **Documentation (EN)**: https://sis.nipo.gov.ua/en/services/api-description/
- **Web Search**: https://sis.nipo.gov.ua/uk/search/simple/
- **Contact**: https://sis.nipo.gov.ua/uk/contacts/
