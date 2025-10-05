# CLAUDE.md - business Repository

## Project Overview

The **business repository** stores **8 business and organization definitions** as MDX files with Zod schema validation via Velite, enabling bidirectional synchronization with the PostgreSQL database.

**Purpose**: Define and manage business entities as version-controlled MDX files that sync automatically to the database.

**Position**: 📝 **Content Layer** - Content source that syncs to db layer

## Repository Structure

```
business/
├── holding/              # 1 holding company
│   └── dot-do.mdx       # Dot Do Holdings (parent organization)
├── products/             # 6 product businesses
│   ├── do.industries.mdx        # Business-as-Code platform
│   ├── api.services.mdx         # Function catalog (1,000+ functions)
│   ├── services.studio.mdx      # Service creation platform
│   ├── services.delivery.mdx    # Service marketplace
│   ├── agents.do.mdx            # AI agents platform (33 agents)
│   └── builder.domains.mdx      # Domain services
├── agencies/             # 1 service agency
│   └── ai-tax-services.mdx      # AI-powered tax preparation
├── okrs/                 # 2 OKR files
│   ├── q4-2025-revenue.mdx      # Revenue objectives ($1M ARR)
│   └── q4-2025-product.mdx      # Product quality objectives
└── ventures/             # Future ventures (empty)
```

**Total:** 8 business definitions + 2 OKR files

## Business Categories

### Holding Company (1)

**Dot Do Holdings** - Parent organization for all .do properties

**Key Information:**
- Type: AI-native holding company
- Mission: Enable AI agents to autonomously build, launch, and operate businesses
- 2025 Goal: $1M ARR across all products
- Organizational structure: Holding + 6 operating companies

### Product Businesses (6)

**Infrastructure & Platform:**

**1. do.industries**
- Business-as-Code platform
- 121 SDK packages across 5 layers
- Runtime primitives: `db`, `ai`, `send`, `on`, `decide`, `every`
- Status: Active

**2. API.Services (functions.do)**
- 1,000+ executable functions
- Multi-protocol: REST, MCP, RPC, SDK
- OpenAPI documentation
- Status: Active
- OKR: O1 - Establish as definitive function platform

**3. Agents.do**
- 33 production AI agents
- Voice capabilities (7 named agents)
- 3 categories: named, roles, specialized
- Status: Active

**Marketplace & Creator Tools:**

**4. Services.Studio**
- "Vibe-Code" service creation
- Natural language → Working service
- One-click marketplace deployment
- Status: Development (Q4 2025 launch)
- OKR: O3 - Enable creators to build profitable services

**5. Services.Delivery**
- Professional services marketplace
- 200+ services target
- 15-20% take rate
- Status: Development (Q4 2025 launch)
- OKR: O2 - Generate $500K GMV

**6. Builder.Domains**
- Free *.do subdomains (10 per account)
- Domain registration
- DNS management
- Status: Active

### Service Agencies (1)

**AI Tax Services**
- AI-powered tax preparation
- Professional service delivery
- Status: Active

### OKRs (2)

**Q4 2025 Revenue Objective:**
- $1M ARR target
- 3 key results across O1/O2/O3
- Reinforcement learning framework
- Real business outcomes as reward signals

**Q4 2025 Product Objective:**
- 100% test coverage
- Zero type errors
- 10+ SDKs published
- Quality and reliability focus

## Schema

The Velite schema for business entities includes:

### Required Fields
- **title** (string): Business/organization name
- **type** (enum): `product`, `holding`, `agency`, `venture`
- **category** (string): Business category (Platform, Marketplace, etc.)
- **industry** (string): Industry sector
- **vertical** (string): Specific vertical
- **description** (string): One-line description

### Optional Fields
- **legalName** (string): Legal entity name
- **mission** (string): Mission statement
- **tagline** (string): Marketing tagline
- **website** (URL): Company website
- **status** (enum): `Active`, `Development`, `Planned`, `Archived`
- **launched** (string): Launch date (YYYY or YYYY-MM)
- **metadata**: Namespace and visibility
- **tags** (array): Categorization tags

## MDX File Example

```mdx
---
title: Example Product
legalName: Example Product, Inc.
type: product
category: Platform
industry: Technology
vertical: AI Infrastructure
description: AI-native platform for building applications
mission: Enable developers to build AI-native applications faster
tagline: "Build AI Apps in Minutes"
website: https://example.com
status: Active
launched: "2024"
metadata:
  ns: business
  visibility: public
tags:
  - platform
  - ai
  - developer-tools
---

# Example Product

**AI-native platform** for building intelligent applications.

## Overview

Detailed description of the business...

## Core Value Proposition

**For Developers:**
- Feature 1
- Feature 2
- Feature 3

## Business Model

### Revenue Streams
- Stream 1
- Stream 2

### Unit Economics
- Cost structure
- Pricing model
- Margins

## Metrics

### 2025 Targets
- Metric 1: Target value
- Metric 2: Target value

## Technology Stack

- Runtime: Cloudflare Workers
- Database: PostgreSQL
- AI: OpenAI, Anthropic

## Roadmap

### Q4 2025
- Milestone 1
- Milestone 2

### 2026
- Vision item 1
- Vision item 2

## Parent Organization

Part of **[Dot Do Holdings](../holding/dot-do.mdx)** portfolio.

## Related Products

- [Related Product 1](./related.mdx)
- [Related Product 2](./related2.mdx)
```

## Platform Architecture

The .do ecosystem architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    do.industries                         │
│              (Foundation Platform)                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Runtime Primitives                              │   │
│  │  • db      - Database operations                 │   │
│  │  • ai      - AI generation/embeddings            │   │
│  │  • send    - Communications (email, SMS)         │   │
│  │  • on      - Event handlers                      │   │
│  │  • decide  - Decision logic                      │   │
│  │  • every   - Scheduled tasks                     │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────┬──────────────────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
   ┌───▼────┐      ┌────▼────┐
   │API.Svc │      │Agents.do│
   │1K+ fns │      │33 agents│
   │MCP/RPC │      │Voice AI │
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
   │Vibe-Code │    │Buy/Sell    │
   └──────────┘    └────────────┘
```

## Business Model Summary

### Revenue Streams by Product

| Product | Revenue Model | 2025 Target | Margin |
|---------|---------------|-------------|---------|
| Services.Delivery | 15-20% take rate | $75K-$100K | 80%+ |
| API.Services | Usage-based + subs | $500K MRR | 98% |
| Services.Studio | Subscriptions | $108K ARR | 85% |
| Agents.do | Conversations + subs | $1.2M ARR | 45-78% |
| Builder.Domains | Domain margins | $250K/year | 40% |

**Total 2025 Target:** $1M+ ARR

### Unit Economics

**Best Margins:**
1. API.Services: 98% (infrastructure cost minimal)
2. Services.Delivery: 80%+ (marketplace model)
3. Services.Studio: 85% (software subscription)

**Strategic Focus:**
- Marketplace take rate (high margin, scalable)
- Usage-based pricing (aligns with value)
- Recurring revenue (predictable)

## Development Commands

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

## Examples

Business definitions are in production use. See the MDX files in each category folder for real examples:

- **Holding:** `holding/dot-do.mdx` - Complete holding company definition
- **Products:** `products/*.mdx` - 6 product business definitions
- **Agencies:** `agencies/ai-tax-services.mdx` - Service agency example
- **OKRs:** `okrs/*.mdx` - Quarterly objectives with RL framework

## Related Documentation

- **Parent**: [Root CLAUDE.md](../CLAUDE.md) - Multi-repo management
- **Database**: [db/CLAUDE.md](../db/CLAUDE.md) - Database schema and sync
- **API**: [api/CLAUDE.md](../api/CLAUDE.md) - Webhook handler
- **Brands**: [brands/CLAUDE.md](../brands/CLAUDE.md) - Brand identities
- **Apps**: [apps/CLAUDE.md](../apps/CLAUDE.md) - Application definitions

## Common Tasks

### Adding a New Product Business

1. **Create MDX file:**
```bash
touch products/new-product.mdx
```

2. **Define business (YAML + Markdown):**
```mdx
---
title: New Product
type: product
category: Platform
industry: Technology
vertical: Specific Vertical
description: One-line description
mission: Mission statement
tagline: Marketing tagline
website: https://newproduct.com
status: Development
launched: "2025"
metadata:
  ns: business
  visibility: public
tags:
  - tag1
  - tag2
---

# New Product

Full business definition with sections for:
- Overview
- Value Proposition
- Business Model
- Metrics
- Technology Stack
- Roadmap
- Parent Organization
- Related Products
```

3. **Build and validate:**
```bash
pnpm build
```

4. **Commit and push:**
```bash
git add products/new-product.mdx
git commit -m "Add new product: New Product"
git push
```

### Updating OKRs

1. **Edit OKR file:**
```bash
# Edit existing OKR
vim okrs/q4-2025-revenue.mdx
```

2. **Update key results:**
```mdx
### Key Result 1
- **Target:** New target value
- **Current:** Updated current value
- **Progress:** Recalculated percentage
```

3. **Rebuild:**
```bash
pnpm build
```

4. **Commit:**
```bash
git add okrs/q4-2025-revenue.mdx
git commit -m "Update Q4 2025 revenue OKR progress"
git push
```

## Quality Standards

### Business Definition Completeness

All product businesses should include:
- ✅ Clear value proposition (for customers and for AI agents)
- ✅ Business model with revenue streams
- ✅ Unit economics
- ✅ Target metrics (2025 and 2026)
- ✅ Technology stack
- ✅ Roadmap (Q4 2025 and 2026)
- ✅ Parent organization link
- ✅ Related products links

### Documentation Standards

- **Concise descriptions** - One-liners should be < 100 chars
- **Specific metrics** - Use actual numbers, not vague targets
- **Realistic timelines** - Based on actual development capacity
- **Clear positioning** - vs competitors and alternatives

---

**Last Updated**: 2025-10-04
**Maintained By**: Claude Code
**Repository**: https://github.com/dot-do/business
