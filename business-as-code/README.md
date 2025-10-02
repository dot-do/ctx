# Business-as-Code

Express entire businesses as executable specifications that AI agents can autonomously imagine, build, launch, grow, scale, manage, and operate.

## Overview

**Business-as-Code** enables programmatic definition and management of businesses - from holding companies to individual contributors. Using structured MDX files with type-safe schemas, businesses become composable, measurable, and automatable.

## Core Concepts

### What is Business-as-Code?

Traditional business management relies on:
- ❌ Documents (Word, Excel, PowerPoint)
- ❌ Tribal knowledge
- ❌ Manual processes
- ❌ Siloed systems

Business-as-Code provides:
- ✅ Executable specifications
- ✅ Version-controlled structure
- ✅ API-accessible data
- ✅ Automated operations

### Integration Points

**ONET Taxonomy:**
- Map roles to 1,016 occupations
- Structured knowledge, skills, abilities (KSA)
- 19,000+ task definitions
- Evidence-based job requirements

**GDPval Framework:**
- Measure economic value delivered
- 1,320 real-world tasks across 44 occupations
- Link offerings to GDP contribution
- Track AI automation readiness

**.do Platform:**
- Functions for business logic
- Workflows for process orchestration
- Agents for autonomous execution
- Metrics for performance tracking

## Directory Structure

```
business-as-code/
├── companies/          # Company and organization entities
│   ├── dot-do.mdx     # Example: Holding company
│   └── ai-tax-services.mdx  # Example: Operating company
├── objectives/         # OKRs at every level
├── roles/             # Organizational positions (ONET-aligned)
├── offerings/         # Products and services
├── operations/        # Business processes and workflows
├── metrics/           # KPIs and performance indicators
├── resources/         # Budget and resource allocation
├── governance/        # Policies and decision-making
├── types.ts           # TypeScript interface definitions
└── README.md          # This file
```

## Creating a Company

### Basic Structure

```mdx
---
title: Company Name
legalName: Legal Entity Name, Inc.
type: holding | operating | subsidiary | division
parent: parent-company-id  # optional
industry: Industry Name
vertical: Specific Vertical  # optional
description: Brief company description
mission: What we aim to achieve
vision: Future state we're building toward
values:
  - Core Value 1
  - Core Value 2
metadata:
  ns: company
  visibility: public | private | unlisted
tags:
  - tag1
  - tag2
---

# Company Name

Detailed company description and strategy...

## Objectives (OKRs)

### 2025 Goals

**O1**: Objective statement

- **KR1.1**: Key result 1
- **KR1.2**: Key result 2

## Organizational Structure

### Roles

### Products/Services

### Operations

## Financial Model

### Revenue Streams

### Unit Economics

## Metrics Dashboard
```

### Example: Holding Company

See [`companies/dot-do.mdx`](./companies/dot-do.mdx) for a complete example of a holding company with:
- Multiple operating companies
- Cascading OKRs
- Technology stack
- Financial projections
- Risk management

### Example: Operating Company

See [`companies/ai-tax-services.mdx`](./companies/ai-tax-services.mdx) for a service business with:
- Service delivery workflow
- Hybrid AI-human staffing
- Detailed financial model
- Competitive positioning

## OKR Management

### Cascading Objectives

```
Holding Company
└─ O1: $100M ARR by 2026
   ├─ Operating Co A
   │  └─ O1.1: $30M ARR
   │     ├─ Department 1
   │     │  └─ O1.1.1: $10M ARR
   │     │     └─ Team A: O1.1.1.1: $2.5M ARR
   │     │        └─ IC: O1.1.1.1.1: $500K quota
   └─ Operating Co B
      └─ O1.2: $70M ARR
```

### Programmatic Tracking

**Automated Progress:**
- API integrations pull real-time data
- Metrics auto-update key results
- Alerts trigger on at-risk objectives
- Dashboards aggregate across levels

**Example:**
```typescript
// Auto-sync from Stripe API
const revenue = await stripe.getARR()
await updateKeyResult('kr-1-1', revenue)
```

## Role Definitions

### ONET Integration

Each role can be mapped to ONET occupations:

```mdx
---
title: Tax Preparer
onetCode: "13-2082.00"
onetTitle: Tax Preparers
assignedTo: agent
agent: tax-prep.do
---

# Tax Preparer Role

## Responsibilities
- Prepare individual tax returns
- Review financial documents
- Compute taxes owed or refunds

## KSA Requirements
**Knowledge:**
- Tax law (Level 7 - Expert)
- Accounting (Level 6 - Advanced)

**Skills:**
- Mathematics (Level 6)
- Active listening (Level 5)

**Abilities:**
- Mathematical reasoning (Level 6)
- Deductive reasoning (Level 6)
```

### Human vs. AI Assignment

**Fully AI:**
- Well-defined processes
- Measurable outputs
- Low judgment required
- High volume tasks

**Hybrid (AI + Human):**
- Complex decision-making
- Customer relationships
- Quality oversight
- Exception handling

**Fully Human:**
- Strategic planning
- Creative work
- Relationship building
- Regulatory compliance

## Business Models

### Fully AI-Operated

**Characteristics:**
- Digital-only products/services
- Automated customer acquisition
- AI-driven operations
- Minimal human oversight

**Examples:**
- SaaS products
- Data processing services
- Content generation
- Analytics platforms

### Human-Supervised AI

**Characteristics:**
- AI handles routine work
- Humans review complex cases
- Defined escalation rules
- Hybrid customer interaction

**Examples:**
- Tax preparation (85% AI)
- Legal research (70% AI)
- Financial planning (60% AI)
- Customer support (75% AI)

### AI-Augmented Human

**Characteristics:**
- Humans make decisions
- AI provides insights
- Collaborative workflows
- Enhanced productivity

**Examples:**
- Executive roles (AI-assisted)
- Creative agencies (AI tools)
- Consulting (AI research)
- Sales (AI prospecting)

## Governance Models

### Decision Authority Matrix

```typescript
interface Authority {
  role: string
  scope: string
  limits: {
    financial?: number  // Max $$ authority
    hiring?: number     // Max headcount
    strategic?: boolean // Can make strategic decisions
  }
  escalation?: string  // Who to escalate to
}
```

### Automated Policies

**Example: Spending Authorization**
```mdx
---
policy: Spending Authorization
category: financial
automated: true
---

# Spending Authorization Policy

## Rules

**< $1,000**: Any team member (auto-approved)
**$1,000 - $10,000**: Manager approval (Slack workflow)
**$10,000 - $100,000**: Director approval + CFO notification
**> $100,000**: Board approval required

## Automation

Slack integration checks amount and routes to appropriate approver.
Auto-approved for recurring vendors below threshold.
```

## Capital Allocation

### Programmatic Budgeting

```typescript
interface Budget {
  total: number
  allocated: number
  spent: number
  remaining: number
  breakdown: {
    engineering: number
    sales: number
    marketing: number
    operations: number
  }
  alerts: {
    threshold: 0.9  // Alert at 90% spent
    recipient: 'cfo@company.com'
  }
}
```

### Resource Optimization

**AI-Driven Allocation:**
- Analyze ROI by department
- Recommend reallocation
- Simulate scenarios
- Optimize spend

## Metrics and KPIs

### North Star Metric

Every business should define its primary success metric:

```mdx
## North Star Metric

**Gross Marketplace Value (GMV)**: $500K by EOY 2025

Why GMV?
- Direct measure of value delivered to customers
- Leading indicator of revenue (15-20% take rate)
- Compound growth = healthy two-sided marketplace
```

### Automated Dashboards

**Real-time Tracking:**
- Revenue metrics (ARR, MRR, GMV)
- Growth metrics (MoM, QoQ, YoY)
- Efficiency (CAC, LTV, burn rate)
- Quality (NPS, CSAT, churn)

**Auto-Alerts:**
- Metric drops below threshold
- Trend reverses
- Anomaly detected
- Target at risk

## Integration with Services-as-Software

Companies often deliver services. Link to services repo:

```mdx
## Offerings

- [Tax Return Preparation](../../services-as-software/services/tax-return-preparation.mdx)
- [Customer Support](../../services-as-software/services/customer-support.mdx)
```

## Best Practices

### 1. Start Simple
- Define company structure first
- Add OKRs next
- Layer in metrics and processes
- Iterate based on learnings

### 2. Be Specific
- Quantify objectives and key results
- Define clear ownership
- Set measurable targets
- Include timeframes

### 3. Automate Tracking
- Connect to data sources
- Auto-update metrics
- Generate alerts
- Build dashboards

### 4. Version Control
- Commit changes regularly
- Document major pivots
- Review quarterly
- Archive deprecated strategies

### 5. Align with Reality
- Sync MDX to database
- Expose via APIs
- Integrate with tools
- Operate from specifications

## Examples

- [Dot Do Holdings](./companies/dot-do.mdx) - Holding company with multiple operating companies
- [AI Tax Services](./companies/ai-tax-services.mdx) - AI-powered service business

## API Access

All entities sync to database and are accessible via:

- **REST API**: `GET /api/companies/:id`
- **SDK**: `import { companies } from '@dot-do/business'`
- **GraphQL**: Query companies with related entities

## Tools and Workflows

### CLI Commands

```bash
# Create new company
do business create --type=operating --name="New Co"

# Add objective
do okr add --company=new-co --level=company --objective="$1M ARR"

# Track progress
do metrics update --kr=kr-1-1 --value=250000

# Generate report
do business report --company=new-co --period=Q4-2025
```

### Services.Studio Integration

Use Services.Studio to "vibe-code" entire businesses:

```
Prompt: "Create a B2B SaaS company for AI-powered invoice processing.
        Target customers: accounting firms.
        Pricing: $99/month + $0.50 per invoice.
        Goal: $500K ARR in year 1."

→ Generates:
  - Company entity
  - OKRs with key results
  - Service definitions
  - Pricing models
  - Revenue projections
```

## TypeScript Types

Full type definitions available in [`types.ts`](./types.ts).

Key interfaces:
- `Company` - Core company entity
- `Objective` - OKR definition
- `Role` - Organizational role
- `Offering` - Product/service
- `Operation` - Business process
- `Metric` - KPI tracking
- `Resource` - Budget/headcount
- `Governance` - Policies/authority

## Contributing

To add new entity types or enhance schemas:

1. Update [`types.ts`](./types.ts) with new interfaces
2. Update `velite.config.ts` in parent directory
3. Create example MDX files
4. Document in this README
5. Test validation: `pnpm build`

## Resources

- [ONET Database](https://www.onetonline.org/)
- [GDPval Framework](https://openai.com/index/gdpval/)
- [OKR Guide](https://www.whatmatters.com/get-started)
- [Business Model Canvas](https://www.strategyzer.com/canvas)

---

**Status**: Active - Framework ready for use
**Last Updated**: 2025-10-02
**Maintained By**: Dot Do Platform Team
