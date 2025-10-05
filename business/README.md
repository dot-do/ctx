# Business Repository

**Business & Organization Definitions as Code** - MDX files with Zod validation, synced to PostgreSQL

## Overview

This repository contains **business and organization definitions** for the .do ecosystem, organized into four categories:

```
business/
├── holding/          # 1 holding company - Dot Do Holdings
├── products/         # 6 product businesses - Platforms and services
├── agencies/         # 1 service agency - AI Tax Services
├── okrs/            # 2 OKR files - Q4 2025 objectives
└── ventures/        # Future ventures and experiments
```

**Total:** 8 business definitions + 2 OKR files

## Holding Company (1)

The parent organization for all .do properties:

| Business | Type | Description |
|----------|------|-------------|
| **[Dot Do Holdings](./holding/dot-do.mdx)** | Holding Company | AI-native platform enabling businesses-as-code |

### Key Objectives

**2025 North Star:** $1M ARR by December 2025

**O1:** Establish API.Services as definitive platform for discoverable, composable functions
- 1,000+ functions catalogued and executable
- 100% test coverage, zero type errors
- 10+ SDKs published to npm

**O2:** Launch Services.Delivery marketplace generating revenue
- $500K+ GMV with 15-20% take rate
- 200+ services listed, 100+ active providers
- 4.5+ average rating, <5% dispute rate

**O3:** Ship Services.Studio enabling creators to "Vibe-Code" agentic AI services
- Natural language → Function/Workflow generation (80%+ success)
- 100+ human-in-the-loop function configurations
- 50+ creators publishing profitable services

## Product Businesses (6)

Core platforms and services under Dot Do Holdings:

### Infrastructure & Platform

| Product | Focus | Status | Description |
|---------|-------|--------|-------------|
| **[do.industries](./products/do.industries.mdx)** | Platform | Active | Business-as-Code platform with $ runtime primitives |
| **[API.Services](./products/api.services.mdx)** | Functions | Active | 1,000+ executable functions via API/MCP/RPC |
| **[Agents.do](./products/agents.do.mdx)** | AI Agents | Active | 33 production agents with voice capabilities |

### Marketplace & Creator Tools

| Product | Focus | Status | Description |
|---------|-------|--------|-------------|
| **[Services.Studio](./products/services.studio.mdx)** | Creation | Development | "Vibe-Code" AI services from idea to profit |
| **[Services.Delivery](./products/services.delivery.mdx)** | Marketplace | Development | Professional services marketplace |
| **[Builder.Domains](./products/builder.domains.mdx)** | Domains | Active | Free *.do subdomains + domain registration |

### Platform Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    do.industries                         │
│              (Platform Foundation)                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │  $ Runtime Primitives                            │   │
│  │  db, ai, send, on, decide, every                 │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────┬──────────────────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
   ┌───▼────┐      ┌────▼────┐
   │API.Svc │      │Agents.do│
   │1K+ fns │      │33 agents│
   └───┬────┘      └────┬────┘
       │                │
       └────────┬───────┘
                │
        ┌───────▼────────┐
        │                │
   ┌────▼─────┐    ┌────▼──────┐
   │Services  │    │Services    │
   │.Studio   │───▶│.Delivery   │
   │(Create)  │    │(Marketplace)│
   └──────────┘    └────────────┘
```

## Service Agencies (1)

Professional service businesses:

| Business | Focus | Description |
|----------|-------|-------------|
| **[AI Tax Services](./agencies/ai-tax-services.mdx)** | Tax Prep | AI-powered tax preparation services |

## OKRs (2)

Quarterly objectives and key results:

| File | Objective | Timeline |
|------|-----------|----------|
| **[Q4 2025 Revenue](./okrs/q4-2025-revenue.mdx)** | $1M ARR | Q4 2025 |
| **[Q4 2025 Product](./okrs/q4-2025-product.mdx)** | Quality & Reliability | Q4 2025 |

## Ventures

Future ventures and experimental businesses will be tracked here.

## Business Model Overview

### Revenue Streams

**1. Marketplace Take Rate (Services.Delivery)**
- 15-20% of GMV
- Target: $500K GMV → $75K-$100K revenue
- High margin (80%+)

**2. Function Execution Fees (API.Services)**
- Usage-based pricing
- $0.01 per function call (above free tier)
- Target: 50M calls/month = $500K MRR

**3. Subscription Revenue (All Products)**
- Pro plans: $29-$299/month
- Target: 1,000+ paying customers
- Recurring revenue

**4. Domain Services (Builder.Domains)**
- Domain registration margins
- Premium subdomain rentals
- API access subscriptions

### Unit Economics

**Services.Delivery:**
- Average service: $300
- Platform take (18%): $54
- Cost to deliver: $15
- Contribution margin: $39 (72%)

**API.Services:**
- Revenue: $0.01/call
- Cost: $0.0002/call
- Margin: 98%

**Agents.do:**
- Revenue: $0.20-$0.50/conversation
- Cost: $0.11/conversation
- Margin: 45-78%

## Technology Stack

### Infrastructure
- **Hosting:** Cloudflare (Workers, Pages, D1, R2)
- **Database:** PostgreSQL (Neon), SQLite (D1)
- **CDN:** Cloudflare global edge network
- **DNS:** Cloudflare DNS

### Core Technologies
- **Runtime:** Cloudflare Workers (V8 isolates)
- **Framework:** Hono (API), Next.js (web apps)
- **Language:** TypeScript
- **UI:** React, shadcn/ui, Tailwind CSS
- **Database ORM:** Drizzle
- **Validation:** Zod, Velite

### AI & ML
- **Models:** OpenAI GPT-4, Anthropic Claude, Workers AI
- **Voice:** VAPI + ElevenLabs
- **Embeddings:** OpenAI, Anthropic
- **Search:** Vector embeddings + PostgreSQL pgvector

## Development

### Commands

```bash
# Install dependencies
pnpm install

# Build and validate all MDX files
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm check-types
```

### MDX File Structure

Each business definition follows this pattern:

```mdx
---
title: Business Name
legalName: Legal Entity Name
type: product | holding | agency | venture
category: Platform | Marketplace | Service | etc.
industry: Technology
vertical: Specific vertical
description: One-line description
mission: Mission statement
tagline: Marketing tagline
website: https://example.com
status: Active | Development | Planned
launched: "YYYY" or "YYYY-MM"
metadata:
  ns: business
  visibility: public
tags:
  - tag1
  - tag2
---

# Business Name

Detailed description...

## Overview
## Key Features
## Business Model
## Metrics
## Roadmap
## Related Products
```

## Schema Validation

All business definitions are validated via Velite with Zod schemas:

```typescript
{
  title: z.string(),
  legalName: z.string().optional(),
  type: z.enum(['product', 'holding', 'agency', 'venture']),
  category: z.string(),
  industry: z.string(),
  vertical: z.string(),
  description: z.string(),
  mission: z.string().optional(),
  tagline: z.string().optional(),
  website: z.string().url().optional(),
  status: z.enum(['Active', 'Development', 'Planned', 'Archived']),
  launched: z.string().optional(),
  metadata: z.object({
    ns: z.string(),
    visibility: z.enum(['public', 'private'])
  }),
  tags: z.array(z.string()).optional()
}
```

## Database Synchronization

All business definitions sync bidirectionally with PostgreSQL via the [repo.do](https://repo.do) GitHub App webhook:

**Flow:**
1. **MDX → Database:** Push to GitHub → repo.do webhook → Validate with Velite → Sync to PostgreSQL
2. **Database → MDX:** Update in database → Generate MDX → Create PR → Review and merge

**Schema:**
```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY,
  ns TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  data JSONB NOT NULL,
  content TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  UNIQUE(ns, slug)
);
```

## Related Documentation

- **Parent:** [Root CLAUDE.md](../CLAUDE.md) - Multi-repo management
- **Database:** [db/CLAUDE.md](../db/CLAUDE.md) - Database schema and sync
- **API:** [api/CLAUDE.md](../api/CLAUDE.md) - Webhook handler
- **Brands:** [brands/CLAUDE.md](../brands/CLAUDE.md) - Brand identity definitions
- **Apps:** [apps/CLAUDE.md](../apps/CLAUDE.md) - Application definitions

## Quick Links

- **Documentation:** [index.mdx](./index.mdx)
- **Developer Guidelines:** [CLAUDE.md](./CLAUDE.md)
- **OKR Tracking:** [okrs/](./okrs/)
- **GitHub Repository:** https://github.com/dot-do/business

---

**Last Updated:** 2025-10-04
**Status:** Active - 8 business definitions + 2 OKR files
**Maintained By:** Claude Code
**Repository:** https://github.com/dot-do/business
